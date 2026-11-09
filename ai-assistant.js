
(() => {
"use strict";

// =====================================================
// 1. SUPABASE CONFIGURATION
// =====================================================

const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";
const FUNCTION_NAME = "agrinova-ai";

// =====================================================
// 2. FIVE-LANGUAGE TRANSLATIONS
// =====================================================

const translations = {
en: {
newChat:"New chat", eyebrow:"YOUR FARMING COMPANION",
welcomeTitle:"What can I help you grow today?",
welcomeCopy:"Ask about crops, pests, soil, irrigation or upload a photo of a plant for guidance.",
cropPromptTitle:"Improve crop growth", cropPromptText:"Get practical growing recommendations",
diseasePromptTitle:"Identify a plant problem", diseasePromptText:"Understand visible crop symptoms",
soilPromptTitle:"Soil and fertilizer advice", soilPromptText:"Plan healthier soil nutrition",
waterPromptTitle:"Water and irrigation", waterPromptText:"Use water more efficiently",
thinking:"AgriNova is thinking…", inputPlaceholder:"Ask AgriNova anything about farming…",
attach:"Attach", camera:"Camera", voice:"Voice", imageReady:"Image ready to send",
disclaimer:"AgriNova AI can make mistakes. Confirm important crop-treatment decisions with a local agricultural expert.",
you:"You", assistant:"AgriNova AI", copied:"Copied", copy:"Copy",
speak:"Read aloud", stop:"Stop speaking", listening:"Listening… speak now",
voiceUnsupported:"Voice input is not supported by this browser.",
empty:"Please enter a question or attach a crop photo.",
failed:"The assistant could not complete your request.",
quota:"The AI service has reached its current usage limit. Please try again later.",
auth:"Please sign in to AgriNova again, then retry.",
imageTooLarge:"Please choose an image smaller than 8 MB.",
fileType:"Please choose a JPG, PNG or WEBP image.",
welcomePrompt:"Hello! I’m AgriNova AI. How can I help with your farm today?",
network:"Could not reach AgriNova. Check your connection and try again.",
providerBusy:"The AI provider is temporarily busy. Please wait a moment and try again."
},

am: {
newChat:"አዲስ ውይይት", eyebrow:"የእርሻ አጋርዎ",
welcomeTitle:"ዛሬ በምን ልርዳዎ?",
welcomeCopy:"ስለ ሰብሎች፣ ተባዮች፣ አፈርና መስኖ ይጠይቁ ወይም የተክል ፎቶ ይላኩ።",
cropPromptTitle:"የሰብል እድገትን ያሻሽሉ",
cropPromptText:"ተግባራዊ የእርሻ ምክሮችን ያግኙ",
diseasePromptTitle:"የተክል ችግርን ይለዩ",
diseasePromptText:"የሚታዩ ምልክቶችን ይረዱ",
soilPromptTitle:"ስለ አፈርና ማዳበሪያ",
soilPromptText:"የአፈር ጤናን ያቅዱ",
waterPromptTitle:"ውሃና መስኖ",
waterPromptText:"ውሃን በብቃት ይጠቀሙ",
thinking:"AgriNova እያሰበ ነው…",
inputPlaceholder:"ስለ እርሻ ማንኛውንም ጥያቄ ይጠይቁ…",
attach:"ፎቶ", camera:"ካሜራ", voice:"ድምፅ",
imageReady:"ፎቶው ለመላክ ዝግጁ ነው",
disclaimer:"AgriNova AI ስህተት ሊሠራ ይችላል። አስፈላጊ የሰብል ሕክምና ውሳኔዎችን ከአካባቢያዊ የግብርና ባለሙያ ጋር ያረጋግጡ።",
you:"እርስዎ", assistant:"AgriNova AI", copied:"ተቀድቷል",
copy:"ቅዳ", speak:"በድምፅ አንብብ", stop:"ድምፅን አቁም",
listening:"እያዳመጠ ነው…",
voiceUnsupported:"ይህ አሳሽ የድምፅ ግቤትን አይደግፍም።",
empty:"ጥያቄ ያስገቡ ወይም የሰብል ፎቶ ያያይዙ።",
failed:"ጥያቄዎን ማስኬድ አልተቻለም።",
quota:"የAI አገልግሎቱ የአጠቃቀም ገደቡን ደርሷል። ቆይተው ይሞክሩ።",
auth:"እባክዎ ወደ AgriNova እንደገና ይግቡ።",
imageTooLarge:"ከ8 MB ያነሰ ፎቶ ይምረጡ።",
fileType:"JPG፣ PNG ወይም WEBP ፎቶ ይምረጡ።",
welcomePrompt:"ሰላም! እኔ AgriNova AI ነኝ። በእርሻዎ እንዴት ልርዳዎ?",
network:"ከAgriNova ጋር መገናኘት አልተቻለም።",
providerBusy:"የAI አገልግሎቱ ለጊዜው ተጨናንቋል። እባክዎ ትንሽ ቆይተው እንደገና ይሞክሩ።"
},

ti: {
newChat:"ሓድሽ ዝርርብ", eyebrow:"መሻርኽትኹም ኣብ ሕርሻ",
welcomeTitle:"ሎሚ ኣብ ምንታይ ክሕግዘኩም?",
welcomeCopy:"ብዛዕባ ዝራእቲ፣ ባልዓት፣ ሓመድን መስኖን ሕተቱ ወይ ስእሊ ተኽሊ ስደዱ።",
cropPromptTitle:"ዕቤት ዝራእቲ ኣመሓይሹ",
cropPromptText:"ተግባራዊ ምኽሪ ሕርሻ ርኸቡ",
diseasePromptTitle:"ጸገም ተኽሊ ፍለዩ",
diseasePromptText:"ዝረኣዩ ምልክታት ተረድኡ",
soilPromptTitle:"ሓመድን ድኹዒን",
soilPromptText:"ጥዕና ሓመድ ኣቐድዱ",
waterPromptTitle:"ማይን መስኖን",
waterPromptText:"ማይ ብብቕዓት ተጠቐሙ",
thinking:"AgriNova ይሓስብ ኣሎ…",
inputPlaceholder:"ብዛዕባ ሕርሻ ዝኾነ ሕቶ ሕተቱ…",
attach:"ስእሊ", camera:"ካሜራ", voice:"ድምጺ",
imageReady:"ስእሊ ንምስዳድ ድሉው እዩ",
disclaimer:"AgriNova AI ጌጋ ክገብር ይኽእል። ኣገዳሲ ውሳነታት ምስ ናይ ከባቢ ክኢላ ሕርሻ ኣረጋግጹ።",
you:"ንስኹም", assistant:"AgriNova AI", copied:"ተቐዲሑ",
copy:"ቅዳሕ", speak:"ብድምጺ ኣንብብ", stop:"ድምጺ ኣቋርጽ",
listening:"ይሰምዕ ኣሎ…",
voiceUnsupported:"እዚ መርበብ ድምጺ ኣይድግፍን።",
empty:"ሕቶ ኣእትዉ ወይ ስእሊ ኣተሓሕዙ።",
failed:"ሕቶኹም ምስራሕ ኣይተኻእለን።",
quota:"ናይ AI ገደብ ኣጠቓቕማ ተወዲኡ። ድሕሪ ግዜ ፈትኑ።",
auth:"በጃኹም ናብ AgriNova እንደገና እተዉ።",
imageTooLarge:"ካብ 8 MB ዝነኣሰ ስእሊ ምረጹ።",
fileType:"JPG፣ PNG ወይ WEBP ስእሊ ምረጹ።",
welcomePrompt:"ሰላም! ኣነ AgriNova AI እየ። ብኸመይ ክሕግዘኩም?",
network:"ምስ AgriNova ምትእስሳር ኣይተኻእለን።",
providerBusy:"ኣገልግሎት AI ንግዚኡ ተጸሚዱ ኣሎ። በጃኹም ቁሩብ ተጸቢኹም እንደገና ፈትኑ።"
},

om: {
newChat:"Haasaawaa haaraa", eyebrow:"HIRIYAA QONNAA KEESSAN",
welcomeTitle:"Har'a maal akka isin gargaaru barbaaddu?",
welcomeCopy:"Waa'ee midhaan, raammoo, biyyee, jallisii gaafadhaa ykn suuraa biqiltuu ergaa.",
cropPromptTitle:"Guddina midhaanii fooyyessuu",
cropPromptText:"Gorsa qonnaa hojii irra oolu argadhaa",
diseasePromptTitle:"Rakkoo biqiltuu adda baasuu",
diseasePromptText:"Mallattoolee mul'atan hubadhaa",
soilPromptTitle:"Biyyee fi xaa'oo",
soilPromptText:"Nyaata biyyee fayya qabeessa karoorsaa",
waterPromptTitle:"Bishaanii fi jallisii",
waterPromptText:"Bishaan bu'a qabeessa fayyadamaa",
thinking:"AgriNova yaadaa jira…",
inputPlaceholder:"Waa'ee qonnaa waan kamiyyuu gaafadhaa…",
attach:"Suuraa", camera:"Kaameraa", voice:"Sagalee",
imageReady:"Suuraan erguuf qophaa'eera",
disclaimer:"AgriNova AI dogoggoruu danda'a. Murtii yaala midhaanii ogeessa qonnaa naannoo keessanii waliin mirkaneessaa.",
you:"Isin", assistant:"AgriNova AI", copied:"Garagalfame",
copy:"Garagalchi", speak:"Sagaleedhaan dubbisi", stop:"Sagalee dhaabi",
listening:"Dhaggeeffachaa jira…",
voiceUnsupported:"Sagaleen biraawzarii kana keessatti hin deeggaramu.",
empty:"Gaaffii galchaa ykn suuraa maxxansaa.",
failed:"Gaaffii keessan hojjechuun hin danda'amne.",
quota:"Daangaan tajaajila AI irra ga'ameera. Booda irra deebi'aa.",
auth:"Maaloo AgriNova keessa deebi'aa seenaa.",
imageTooLarge:"Suuraa 8 MB gadi ta'e filadhaa.",
fileType:"Suuraa JPG, PNG ykn WEBP filadhaa.",
welcomePrompt:"Akkam! Ani AgriNova AI dha. Qonna keessan irratti akkamitti isin gargaaruu?",
network:"AgriNova waliin walqunnamuun hin danda'amne.",
providerBusy:"Tajaajilli AI yeroo ammaa dhiphina keessa jira. Maaloo xiqqoo eegaa irra deebi'aa yaalaa."
},

so: {
newChat:"Sheeko cusub", eyebrow:"WEHELKAAGA BEERAHA",
welcomeTitle:"Maxaan maanta kaa caawin karaa?",
welcomeCopy:"Weydii dalagyada, cayayaanka, ciidda, waraabka ama soo geli sawirka geedka.",
cropPromptTitle:"Hagaaji koritaanka dalagga",
cropPromptText:"Hel talooyin wax ku ool ah",
diseasePromptTitle:"Aqoonso dhibaatada geedka",
diseasePromptText:"Faham calaamadaha muuqda",
soilPromptTitle:"Ciidda iyo bacriminta",
soilPromptText:"Qorshee nafaqada ciidda",
waterPromptTitle:"Biyaha iyo waraabka",
waterPromptText:"Biyaha si hufan u isticmaal",
thinking:"AgriNova wuu fikirayaa…",
inputPlaceholder:"Weydii AgriNova wax kasta oo beeraha ku saabsan…",
attach:"Sawir", camera:"Kaamiro", voice:"Cod",
imageReady:"Sawirku waa diyaar in la diro",
disclaimer:"AgriNova AI wuu khaldami karaa. Go'aannada daaweynta dalagga kala tasho khabiir beeraha deegaanka ah.",
you:"Adiga", assistant:"AgriNova AI", copied:"Waa la koobiyey",
copy:"Koobi", speak:"Cod ku akhri", stop:"Jooji codka",
listening:"Wuu dhageysanayaa…",
voiceUnsupported:"Cod gelinta browser-kan lama taageero.",
empty:"Geli su'aal ama ku lifaaq sawirka dalagga.",
failed:"Su'aashaada lama dhammaystiri karin.",
quota:"Adeegga AI wuxuu gaaray xadka isticmaalka. Mar kale isku day goor dambe.",
auth:"Fadlan mar kale ka gal AgriNova.",
imageTooLarge:"Dooro sawir ka yar 8 MB.",
fileType:"Dooro sawir JPG, PNG ama WEBP ah.",
welcomePrompt:"Salaan! Waxaan ahay AgriNova AI. Sideen kaaga caawin karaa beerahaaga?",
network:"Lama xiriiri karo AgriNova. Hubi internetka.",
providerBusy:"Adeegga AI-gu si ku-meel-gaar ah ayuu u mashquulsan yahay. Sug wax yar dabadeed mar kale isku day."
}
};

// =====================================================
// 3. APPLICATION STATE
// =====================================================

let currentLanguage = "en";
let selectedImage = null;
let history = [];
let isSending = false;
let recognition = null;
let supabase = null;

const $ = id => document.getElementById(id);

const t = key =>
  (translations[currentLanguage] && translations[currentLanguage][key]) ||
  translations.en[key] ||
  key;

// =====================================================
// 4. SUPABASE INITIALIZATION
// =====================================================

function initSupabase() {
  if (!window.supabase?.createClient) {
    throw new Error(
      "Supabase JavaScript library did not load. Check your HTML script tags."
    );
  }

  if (
    !SUPABASE_ANON_KEY ||
    SUPABASE_ANON_KEY.includes("PASTE_YOUR")
  ) {
    throw new Error(
      "Add your Supabase anon/publishable key in ai-assistant.js."
    );
  }

  if (!supabase) {
    supabase = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );
  }

  return supabase;
}

// =====================================================
// 5. LANGUAGE SYSTEM
// =====================================================

function applyLanguage(lang) {
  if (!translations[lang]) lang = "en";

  currentLanguage = lang;
  document.documentElement.lang = lang;

  const languageNames = {
    en: "English",
    am: "አማርኛ",
    ti: "ትግርኛ",
    om: "Afaan Oromo",
    so: "Soomaali"
  };

  $("currentLanguage").textContent = languageNames[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t(key)) el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Update existing conversation labels.
  document.querySelectorAll(".message-author[data-message-role]").forEach(el => {
    el.textContent =
      el.dataset.messageRole === "user" ? t("you") : t("assistant");
  });

  // Update existing message action buttons.
  document.querySelectorAll(".message-action[data-message-action]").forEach(el => {
    const action = el.dataset.messageAction;
    el.textContent =
      action === "copy" ? "▢ " + t("copy") : "🔊 " + t("speak");
  });

  $("languageDropdown").classList.add("hidden");
  $("languageButton").setAttribute("aria-expanded", "false");
}

// =====================================================
// 6. ERROR AND LOADING HANDLING
// =====================================================

function showError(message) {
  const el = $("errorBanner");
  el.textContent = message;
  el.classList.remove("hidden");
}

function clearError() {
  $("errorBanner").classList.add("hidden");
  $("errorBanner").textContent = "";
}

function setBusy(value) {
  isSending = value;
  $("sendButton").disabled = value;
  $("messageInput").disabled = value;
  $("typingIndicator").classList.toggle("hidden", !value);
}

function friendlyError(error) {
  const msg = String(error?.message || error || "");

  if (/429|quota|resource_exhausted/i.test(msg)) return t("quota");
  if (/503|high demand|temporarily busy|temporarily unavailable|overloaded|service unavailable/i.test(msg)) return t("providerBusy");
  if (/401|403|jwt|auth|session/i.test(msg)) return t("auth");
  if (/fetch|network|failed to send|load failed/i.test(msg)) return t("network");

  return msg || t("failed");
}

// =====================================================
// 7. CHAT MESSAGE DISPLAY
// =====================================================

function addMessage(role, text, imageUrl = null) {
  $("welcomeScreen").classList.add("hidden");

  const row = document.createElement("article");
  row.className =
    `chat-message ${role === "user" ? "user-message" : "assistant-message"}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "Y" : "A";

  const main = document.createElement("div");
  main.className = "message-main";

  const author = document.createElement("div");
  author.className = "message-author";
  author.dataset.messageRole = role;
  author.textContent = role === "user" ? t("you") : t("assistant");

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  if (imageUrl) {
    const img = document.createElement("img");
    img.className = "message-image";
    img.src = imageUrl;
    img.alt = "Uploaded crop photograph";
    bubble.appendChild(img);
  }

  if (text) {
    const content = document.createElement("div");
    content.textContent = text;
    bubble.appendChild(content);
  }

  main.append(author, bubble);

  if (role === "assistant" && text) {
    const actions = document.createElement("div");
    actions.className = "message-actions";

    const copy = document.createElement("button");
    copy.className = "message-action";
    copy.dataset.messageAction = "copy";
    copy.textContent = "▢ " + t("copy");

    copy.onclick = async () => {
      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = "✓ " + t("copied");
      } catch {
        showError("Could not copy this message.");
      }
    };

    const speak = document.createElement("button");
    speak.className = "message-action";
    speak.dataset.messageAction = "speak";
    speak.textContent = "🔊 " + t("speak");
    speak.onclick = () => speakText(text);

    actions.append(copy, speak);
    main.appendChild(actions);
  }

  if (role === "user") {
    row.append(main, avatar);
  } else {
    row.append(avatar, main);
  }

  $("conversationMessages").appendChild(row);
  row.scrollIntoView({ behavior: "smooth", block: "end" });
}

// =====================================================
// 8. VOICE OUTPUT
// =====================================================

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    showError("Speech output is not supported by this browser.");
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = {
    en: "en-US",
    am: "am-ET",
    ti: "ti-ET",
    om: "om-ET",
    so: "so-SO"
  }[currentLanguage] || "en-US";

  speechSynthesis.speak(utterance);
}

// =====================================================
// 9. IMAGE UPLOAD AND CAMERA
// =====================================================

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result).split(",")[1]);
    };

    reader.onerror = () => {
      reject(new Error("Could not read the selected image."));
    };

    reader.readAsDataURL(file);
  });
}

function setImage(file) {
  if (!file) return;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    showError(t("fileType"));
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    showError(t("imageTooLarge"));
    return;
  }

  clearError();

  selectedImage = file;

  $("previewImage").src = URL.createObjectURL(file);
  $("imageFileName").textContent = file.name;
  $("attachmentPreview").classList.remove("hidden");
}

function clearImage() {
  if ($("previewImage").src.startsWith("blob:")) {
    URL.revokeObjectURL($("previewImage").src);
  }

  selectedImage = null;
  $("imageUpload").value = "";
  $("cameraUpload").value = "";
  $("attachmentPreview").classList.add("hidden");
}

// =====================================================
// 10. SEND MESSAGE TO SUPABASE EDGE FUNCTION
// =====================================================

async function sendMessage(rawText) {
  if (isSending) return;

  const message = rawText.trim();

  if (!message && !selectedImage) {
    showError(t("empty"));
    return;
  }

  clearError();

  const imageFile = selectedImage;
  const imagePreview = imageFile
    ? URL.createObjectURL(imageFile)
    : null;

  addMessage("user", message, imagePreview);

  $("messageInput").value = "";
  $("messageInput").style.height = "auto";

  clearImage();
  setBusy(true);

  try {
    const client = initSupabase();

    const {
      data: { session },
      error: sessionError
    } = await client.auth.getSession();

    if (sessionError) throw sessionError;

    if (!session?.access_token) {
      throw new Error(t("auth"));
    }

    const image = imageFile
      ? {
          data: await fileToBase64(imageFile),
          mimeType: imageFile.type
        }
      : null;

    const conversation = history.slice(-12);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    let response;
    let payload;

    try {
      response = await fetch(
        `${SUPABASE_URL}/functions/v1/${FUNCTION_NAME}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${session.access_token}`
          },

          body: JSON.stringify({
            message,
            language: currentLanguage,

            languageName: {
              en: "English",
              am: "Amharic",
              ti: "Tigrinya",
              om: "Afaan Oromo",
              so: "Af Somali"
            }[currentLanguage],

            conversation,
            image
          }),

          signal: controller.signal
        }
      );

      payload = await response.json().catch(() => ({}));

    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(
        payload?.error ||
        payload?.message ||
        `AgriNova function returned HTTP ${response.status}.`
      );
    }

    // IMPORTANT: Read the answer returned by the Edge Function.
    const answer =
      payload?.answer ||
      payload?.response ||
      payload?.text;

    if (!answer) {
      throw new Error(payload?.error || t("failed"));
    }

    history.push(
      {
        role: "user",
        content: message || "Please analyze the attached crop image."
      },
      {
        role: "assistant",
        content: answer
      }
    );

    addMessage("assistant", answer);

  } catch (error) {
    console.error("AgriNova assistant request failed:", error);

    if (error.name === "AbortError") {
      showError("The request took longer than 60 seconds. Please try again.");
    } else {
      showError(friendlyError(error));
    }

  } finally {
    setBusy(false);
  }
}

// =====================================================
// 11. VOICE INPUT
// =====================================================

function startVoice() {
  const SR =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SR) {
    showError(t("voiceUnsupported"));
    return;
  }

  if (recognition) {
    recognition.stop();
    recognition = null;
    return;
  }

  recognition = new SR();

  recognition.lang = {
    en: "en-US",
    am: "am-ET",
    ti: "ti-ET",
    om: "om-ET",
    so: "so-SO"
  }[currentLanguage] || "en-US";

  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  $("voiceStatus").textContent = t("listening");
  $("voiceInputButton").classList.add("listening");

  recognition.onresult = event => {
    $("messageInput").value = event.results[0][0].transcript;
    $("messageInput").dispatchEvent(new Event("input"));
    $("messageInput").focus();
  };

  recognition.onerror = event => {
    showError("Voice input: " + event.error);
  };

  recognition.onend = () => {
    $("voiceStatus").textContent = "";
    $("voiceInputButton").classList.remove("listening");
    recognition = null;
  };

  try {
    recognition.start();
  } catch (error) {
    recognition = null;
    $("voiceStatus").textContent = "";
    $("voiceInputButton").classList.remove("listening");
    showError("Voice input: " + (error?.message || "Could not start microphone."));
  }
}

// =====================================================
// 12. NEW CHAT
// =====================================================

function newChat() {
  history = [];

  $("conversationMessages").innerHTML = "";
  $("welcomeScreen").classList.remove("hidden");

  clearImage();
  clearError();

  $("messageInput").value = "";

  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }
}

// =====================================================
// 13. INITIALIZE ALL INTERFACE CONTROLS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  applyLanguage("en");

  // Language dropdown
  $("languageButton").addEventListener("click", () => {
    $("languageDropdown").classList.toggle("hidden");

    $("languageButton").setAttribute(
      "aria-expanded",
      String(!$("languageDropdown").classList.contains("hidden"))
    );
  });

  $("languageDropdown")
    .querySelectorAll("[data-language]")
    .forEach(button => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.language);
      });
    });

  document.addEventListener("click", event => {
    if (!event.target.closest(".language-wrap")) {
      $("languageDropdown").classList.add("hidden");
    }
  });

  // New chat
  $("newChatButton").addEventListener("click", newChat);

  // Message submission
  $("chatForm").addEventListener("submit", event => {
    event.preventDefault();
    sendMessage($("messageInput").value);
  });

  // Textarea resizing
  $("messageInput").addEventListener("input", () => {
    const el = $("messageInput");
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 150) + "px";
  });

  // Enter sends; Shift + Enter creates a new line.
  $("messageInput").addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      $("chatForm").requestSubmit();
    }
  });

  // Image upload
  $("uploadImageButton").addEventListener("click", () => {
    $("imageUpload").click();
  });

  // Camera
  $("cameraButton").addEventListener("click", () => {
    $("cameraUpload").click();
  });

  $("imageUpload").addEventListener("change", event => {
    setImage(event.target.files[0]);
  });

  $("cameraUpload").addEventListener("change", event => {
    setImage(event.target.files[0]);
  });

  $("removeAttachment").addEventListener("click", clearImage);

  // Voice input
  $("voiceInputButton").addEventListener("click", startVoice);

  // Suggested prompts in five languages
  const prompts = {
    en: {
      cropPrompt: "How can I improve the growth and yield of my crops?",
      diseasePrompt: "Help me identify and manage a possible crop disease.",
      soilPrompt: "How can I improve my soil health and choose suitable fertilizer?",
      waterPrompt: "Help me plan efficient irrigation for my farm."
    },

    am: {
      cropPrompt: "የሰብሌን እድገትና ምርት እንዴት ማሻሻል እችላለሁ?",
      diseasePrompt: "የሰብሌን በሽታ ለመለየትና ለመቆጣጠር እርዳኝ።",
      soilPrompt: "የአፈር ጤናንና ተስማሚ ማዳበሪያን እንዴት ማሻሻል እችላለሁ?",
      waterPrompt: "ለእርሻዬ ቀልጣፋ የመስኖ እቅድ እርዳኝ።"
    },

    ti: {
      cropPrompt: "እቶትን ዕቤትን ምህርትን ብኸመይ ከመሓይሽ እኽእል?",
      diseasePrompt: "ናይ ዝራእቲ ሕማም ንምፍላጥን ንምቁጽጻርን ሓግዘኒ።",
      soilPrompt: "ጥዕና ሓመድን ዝሰማማዕ ድኹዒን ብኸመይ ከመሓይሽ እኽእል?",
      waterPrompt: "ንሕርሻይ ብቕዓታዊ መስኖ ኣቐድደለይ።"
    },

    om: {
      cropPrompt: "Akkamittan guddinaa fi oomisha midhaan koo fooyyessuu danda'a?",
      diseasePrompt: "Dhukkuba midhaanii adda baasuu fi to'achuuf na gargaari.",
      soilPrompt: "Fayyaa biyyee fi xaa'oo mijataa akkamittan fooyyessa?",
      waterPrompt: "Qonna kootiif karoora jallisii bu'a qabeessa naaf qopheessi."
    },

    so: {
      cropPrompt: "Sideen u hagaajin karaa koritaanka iyo wax-soo-saarka dalagyadayda?",
      diseasePrompt: "Iga caawi aqoonsiga iyo maaraynta cudur dalag.",
      soilPrompt: "Sideen u hagaajin karaa caafimaadka ciidda iyo doorashada bacriminta?",
      waterPrompt: "Ii qorshee waraab hufan oo ku habboon beertayda."
    }
  };

  document.querySelectorAll("[data-prompt-key]").forEach(button => {
    button.addEventListener("click", () => {
      const languagePrompts = prompts[currentLanguage] || prompts.en;

      $("messageInput").value =
        languagePrompts[button.dataset.promptKey] || "";

      $("messageInput").focus();
      $("messageInput").dispatchEvent(new Event("input"));
    });
  });

});

})();
