import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const GEMINI_API_KEY = Deno.env.get("Ai_assist") ?? "";
const GEMINI_MODEL = "gemini-3.8-flash";
const MAX_IMAGE_BASE64_CHARS = 11_200_000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function respond(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

const SYSTEM_INSTRUCTION = `
You are AgriNova AI, a careful and practical agricultural assistant for farmers,
especially in Ethiopia and East Africa.

Answer in the user's selected language: English, Amharic, Tigrinya, Afaan Oromo,
or Af Somali. Use natural, clear language and explain technical terms simply.

Help with crop selection, planting, crop growth, soil health, irrigation,
fertilizers, pests, plant diseases, harvesting, storage, livestock, and farm planning.

When an image is supplied, describe visible symptoms first. Give possible causes,
not a certain diagnosis from an image alone. Explain what additional information
(crop, location, growth stage, when symptoms began) would help confirm it.

Never invent pesticide or fertilizer application rates, product labels, local weather,
market prices, or real-time facts. Recommend following the product label and local
agricultural extension advice. Include safety precautions for pesticide use.
Do not recommend mixing chemicals unless the labels explicitly allow it.

Be practical, respectful, concise but sufficiently detailed. Use numbered steps
when that makes advice easier to follow. Ask a focused follow-up question when needed.
`;

function normalizeHistory(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(-12).flatMap((entry: any) => {
    if (!entry || typeof entry.content !== "string") return [];
    const role = entry.role === "assistant" || entry.role === "model" ? "model" : "user";
    return [{ role, parts: [{ text: entry.content.slice(0, 6000) }] }];
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return respond({ error: "Method not allowed." }, 405);

  try {
    if (!GEMINI_API_KEY) return respond({ error: "Server configuration error: Supabase secret Ai_assist is missing." }, 500);
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return respond({ error: "Supabase environment variables are missing." }, 500);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return respond({ error: "Please sign in to AgriNova again." }, 401);

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData.user) return respond({ error: "Your AgriNova session is invalid or expired. Please sign in again." }, 401);

    const body = await req.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const languageName = typeof body.languageName === "string" ? body.languageName : "English";
    if (!message && !body.image) return respond({ error: "Enter a question or attach a crop photograph." }, 400);
    if (message.length > 10000) return respond({ error: "Your message is too long. Please shorten it." }, 400);

    const parts: Array<Record<string, unknown>> = [];
    if (message) parts.push({ text: message });
    else parts.push({ text: "Analyze this agricultural photograph and give practical guidance." });

    if (body.image) {
      const image = body.image;
      if (typeof image.data !== "string" || typeof image.mimeType !== "string") {
        return respond({ error: "The image payload is invalid." }, 400);
      }
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(image.mimeType.toLowerCase())) return respond({ error: "Only JPG, PNG, and WEBP images are supported." }, 400);
      if (image.data.length > MAX_IMAGE_BASE64_CHARS) return respond({ error: "Image is too large. Please choose an image under 8 MB." }, 413);
      parts.push({ inline_data: { mime_type: image.mimeType, data: image.data } });
    }

    const contents = [
      ...normalizeHistory(body.conversation),
      { role: "user", parts },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 50000);
    let geminiResponse: Response;
    try {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
          signal: controller.signal,
          body: JSON.stringify({
            system_instruction: { parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nThe user's selected response language is ${languageName}. Respond in that language.` }] },
            contents,
            generationConfig: { temperature: 0.5, maxOutputTokens: 2048 },
          }),
        },
      );
    } finally {
      clearTimeout(timeout);
    }

    const result = await geminiResponse.json().catch(() => ({}));
    if (!geminiResponse.ok) {
      const status = geminiResponse.status === 429 ? 429 : 502;
      const detail = result?.error?.message || "Gemini could not process this request.";
      console.error("Gemini API error:", geminiResponse.status, detail);
      if (geminiResponse.status === 503) {
        return respond({ error: "The AI provider is temporarily busy. Please try again shortly." }, 503);
      }
      if (geminiResponse.status === 429) {
        return respond({ error: "Gemini's usage quota is currently exhausted. Check your Google AI Studio quota or billing, then try again." }, 429);
      }
      return respond({ error: detail }, status);
    }

    const answer = result?.candidates?.[0]?.content?.parts
      ?.map((part: any) => typeof part.text === "string" ? part.text : "")
      .join("\n").trim();

    if (!answer) {
      console.error("Gemini returned no text:", JSON.stringify(result).slice(0, 2000));
      return respond({ error: "Gemini returned an empty answer. Please try again." }, 502);
    }

    return respond({ answer, model: GEMINI_MODEL, language: body.language || "en" });
  } catch (error) {
    console.error("AgriNova AI function error:", error);
    if (error instanceof DOMException && error.name === "AbortError") {
      return respond({ error: "Gemini took too long to respond. Please try again." }, 504);
    }
    return respond({ error: error instanceof Error ? error.message : "Unexpected server error." }, 500);
  }
});
