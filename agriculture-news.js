/* ============================================================
   AGRINOVA — AGRICULTURE NEWS
   NewsAPI.org integration + filtering + multilingual interface
   ============================================================ */

(() => {
  "use strict";

  /*
   * AgriNova news is fetched through the Supabase Edge Function.
   * Keep the NewsAPI secret in Supabase Function Secrets, never in this file.
   */
  const CONFIG = {
    NEWS_EDGE_FUNCTION_URL: "https://iqxfusbouchrapfxonxe.supabase.co/functions/v1/agriculture-news",
    PAGE_SIZE: 30,
    MAX_PAGES_PER_SESSION: 5,
    REQUEST_TIMEOUT_MS: 20000,
    TRANSLATION_API_URL: "",
    TRANSLATION_API_KEY: ""
  };

  const SEARCH_QUERY =
    '(agriculture OR farming OR crop OR crops OR agritech OR "farm technology" OR ' +
    '"agricultural innovation" OR "crop science" OR "plant breeding" OR "food production" OR ' +
    '"precision agriculture" OR irrigation OR "genetically modified" OR GMO OR livestock)';

  const I18N = {
    en: {
      breadcrumbHome:"Home", breadcrumbNews:"Agriculture News", eyebrow:"GLOBAL AGRICULTURE UPDATE",
      pageHeading:"Agriculture News & Innovations",
      introDescription:"Discover the latest developments in farming, crop science, agricultural research, and technologies shaping food production around the world.",
      filters:"Filters", articlesFound:"articles found", language:"Language", refresh:"Refresh news",
      searchPlaceholder:"Search crops, farming, research, or innovations...", filterByTopic:"Filter by topic",
      crops:"Crop news", farming:"Farming", innovation:"Innovation & technology", research:"Research & science",
      climate:"Climate & sustainability", livestock:"Livestock", sortBy:"Sort by", newest:"Newest first",
      oldest:"Oldest first", relevance:"Most relevant", clearFilters:"Clear filters", applyFilters:"Apply filters",
      loading:"Loading agriculture news…", loadMore:"Load more news", footerNote:"News articles are provided by external publishers. Select an article to view its details and visit the original source.",
      noResults:"No matching agriculture news found", noResultsSub:"Try another search or clear some filters.",
      apiMissing:"Connect the AgriNova news service to load live agriculture news",
      apiMissingSub:"Add your Supabase agriculture-news Edge Function URL to NEWS_EDGE_FUNCTION_URL in this file.",
      apiError:"We couldn't load news right now", apiErrorSub:"Check your internet connection and Supabase Edge Function settings, then try again.",
      retry:"Try again", backToNews:"← Back to agriculture news", articleLimit:"The news provider supplies a short preview. Open the publisher's website for the complete report.",
      readOriginal:"Read the full article at the original publisher →", source:"Source", published:"Published",
      openArticle:"Open article", translationUnavailable:"Article text is shown in its original language. Configure a translation service to translate article content.",
      taglineCrop:"New developments shaping the future of crops", taglineFarming:"Ideas and progress changing the way farms work",
      taglineInnovation:"Technology creating new possibilities for agriculture", taglineResearch:"Discoveries advancing agricultural knowledge",
      taglineClimate:"Building resilient and sustainable food systems", taglineLivestock:"New developments in animal agriculture",
      categoryCrops:"Crop news", categoryFarming:"Farming", categoryInnovation:"Innovation", categoryResearch:"Research",
      categoryClimate:"Climate & sustainability", categoryLivestock:"Livestock", categoryAgriculture:"Agriculture"
    },
    am: {
      breadcrumbHome:"መነሻ", breadcrumbNews:"የግብርና ዜና", eyebrow:"ዓለም አቀፍ የግብርና ዝመና",
      pageHeading:"የግብርና ዜናዎች እና ፈጠራዎች",
      introDescription:"በእርሻ፣ በሰብል ሳይንስ፣ በግብርና ምርምር እና በዓለም የምግብ ምርትን በሚቀይሩ ቴክኖሎጂዎች ላይ የቅርብ ጊዜ ዜናዎችን ይከታተሉ።",
      filters:"ማጣሪያዎች", articlesFound:"ዜናዎች ተገኝተዋል", language:"ቋንቋ", refresh:"ዜናዎችን አድስ",
      searchPlaceholder:"ሰብሎችን፣ እርሻን፣ ምርምርን ወይም ፈጠራዎችን ይፈልጉ…", filterByTopic:"በርዕስ አጣራ",
      crops:"የሰብል ዜና", farming:"እርሻ", innovation:"ፈጠራ እና ቴክኖሎጂ", research:"ምርምር እና ሳይንስ",
      climate:"የአየር ንብረት እና ዘላቂነት", livestock:"እንስሳት እርባታ", sortBy:"አደራደር", newest:"አዲሶቹ መጀመሪያ",
      oldest:"አሮጌዎቹ መጀመሪያ", relevance:"በተዛማጅነት", clearFilters:"ማጣሪያዎችን አጽዳ", applyFilters:"ማጣሪያዎችን ተግብር",
      loading:"የግብርና ዜናዎች በመጫን ላይ…", loadMore:"ተጨማሪ ዜናዎች", footerNote:"ዜናዎቹ ከውጭ አታሚዎች የቀረቡ ናቸው። ዝርዝሩን ለማየት ዜናውን ይምረጡ።",
      noResults:"የሚዛመድ የግብርና ዜና አልተገኘም", noResultsSub:"ሌላ ቃል ይፈልጉ ወይም አንዳንድ ማጣሪያዎችን ያጽዱ።",
      apiMissing:"ቀጥታ የግብርና ዜናዎችን ለማግኘት የAgriNova የዜና አገልግሎትን ያገናኙ",
      apiMissingSub:"በዚህ ፋይል NEWS_EDGE_FUNCTION_URL ውስጥ የSupabase Edge Function URL ያስገቡ።",
      apiError:"ዜናዎችን አሁን መጫን አልቻልንም", apiErrorSub:"የኢንተርኔት ግንኙነትዎንና የSupabase Edge Function ቅንብሮችን ያረጋግጡ።",
      retry:"እንደገና ሞክር", backToNews:"← ወደ ግብርና ዜና ተመለስ", articleLimit:"የዜና አቅራቢው አጭር ማጠቃለያ ብቻ ያቀርባል። ሙሉውን ዘገባ በአታሚው ድረ-ገጽ ይመልከቱ።",
      readOriginal:"ሙሉውን ዜና በዋናው አታሚ ያንብቡ →", source:"ምንጭ", published:"የታተመበት ቀን",
      openArticle:"ዜናውን ክፈት", translationUnavailable:"የዜናው ጽሑፍ በመጀመሪያው ቋንቋ ይታያል። የዜና ጽሑፉን ለመተርጎም የትርጉም አገልግሎት ያዋቅሩ።",
      taglineCrop:"የሰብል ዘርፍን የሚቀይሩ አዳዲስ እድገቶች", taglineFarming:"የእርሻ ሥራን የሚቀይሩ ሐሳቦችና እድገቶች",
      taglineInnovation:"ለግብርና አዳዲስ እድሎችን የሚፈጥር ቴክኖሎጂ", taglineResearch:"የግብርና እውቀትን የሚያሳድጉ ግኝቶች",
      taglineClimate:"ጠንካራና ዘላቂ የምግብ ሥርዓቶችን መገንባት", taglineLivestock:"በእንስሳት እርባታ ዘርፍ አዳዲስ እድገቶች",
      categoryCrops:"የሰብል ዜና", categoryFarming:"እርሻ", categoryInnovation:"ፈጠራ", categoryResearch:"ምርምር",
      categoryClimate:"የአየር ንብረት እና ዘላቂነት", categoryLivestock:"እንስሳት እርባታ", categoryAgriculture:"ግብርና"
    },
    ti: {
      breadcrumbHome:"መበገሲ", breadcrumbNews:"ዜና ሕርሻ", eyebrow:"ዓለም ለኻዊ ሓበሬታ ሕርሻ",
      pageHeading:"ዜናታት ሕርሻን ሓደስቲ ፈጠራታትን",
      introDescription:"ኣብ ሕርሻ፣ ስነፍልጠት ዓዝሚ፣ ምርምር ሕርሻን ኣብ ዓለም ምህርቲ መግቢ ዝቕይሩ ቴክኖሎጂታትን ዝምልከቱ ሓደስቲ ዜናታት ርኸቡ።",
      filters:"መጣረዪታት", articlesFound:"ዜናታት ተረኺቦም", language:"ቋንቋ", refresh:"ዜና ኣሐድስ",
      searchPlaceholder:"ዓዝሚ፣ ሕርሻ፣ ምርምር ወይ ፈጠራ ድለዩ…", filterByTopic:"ብዛዕባ ኣርእስቲ ኣጣርዩ",
      crops:"ዜና ዓዝሚ", farming:"ሕርሻ", innovation:"ፈጠራን ቴክኖሎጂን", research:"ምርምርን ስነፍልጠትን",
      climate:"ክሊማን ዘላቕነትን", livestock:"ምርባሕ እንስሳት", sortBy:"ብ", newest:"ሓደስቲ ቅድሚ",
      oldest:"ኣረጊት ቅድሚ", relevance:"ብተዛማድነት", clearFilters:"መጣረዪታት ኣጽርዩ", applyFilters:"መጣረዪታት ተግብሩ",
      loading:"ዜናታት ሕርሻ ይጽዓኑ ኣለዉ…", loadMore:"ተወሳኺ ዜናታት", footerNote:"እዞም ዜናታት ካብ ወጻኢ ኣታሚታት ዝመጹ እዮም። ዝርዝር ንምርኣይ ዜና ምረጹ።",
      noResults:"ዝሰማማዕ ዜና ሕርሻ ኣይተረኽበን", noResultsSub:"ካልእ ቃል ድለዩ ወይ ገለ መጣረዪታት ኣጽርዩ።",
      apiMissing:"ቀጥታዊ ዜና ሕርሻ ንምርካብ ኣገልግሎት ዜና AgriNova ኣራኽቡ",
      apiMissingSub:"ኣብዚ ፋይል NEWS_EDGE_FUNCTION_URL ውሽጢ ናይ Supabase Edge Function URL ኣእትዉ።",
      apiError:"ሕጂ ዜና ምጽዓን ኣይከኣልናን", apiErrorSub:"ኢንተርነትኩምን API ቁልፍኩምን ኣረጋግጹ።",
      retry:"እንደገና ፈትኑ", backToNews:"← ናብ ዜና ሕርሻ ተመለሱ", articleLimit:"ኣቕራቢ ዜና ሓጺር ትሕዝቶ ጥራይ ይህብ። ምሉእ ጸብጻብ ኣብ ወብሳይት ኣታሚ ርኣዩ።",
      readOriginal:"ምሉእ ዜና ኣብ መበቆላዊ ኣታሚ ኣንብቡ →", source:"ምንጪ", published:"ዝተሓትመሉ",
      openArticle:"ዜና ክፈት", translationUnavailable:"ጽሑፍ ዜና ብመበቆላዊ ቋንቋኡ ይርአ። ንትርጉም ጽሑፍ ዜና ኣገልግሎት ትርጉም ኣዳልዉ።",
      taglineCrop:"መጻኢ ዓዝሚ ዝቕይሩ ሓደስቲ ምዕባለታት", taglineFarming:"ኣገባብ ስራሕ ሕርሻ ዝቕይሩ ሓሳባትን ምዕባለታትን",
      taglineInnovation:"ንሕርሻ ሓደስቲ ዕድላት ዝፈጥር ቴክኖሎጂ", taglineResearch:"ፍልጠት ሕርሻ ዘዕብዩ ርኽበታት",
      taglineClimate:"ጽኑዕን ዘላቕን ስርዓት መግቢ ምህናጽ", taglineLivestock:"ኣብ ምርባሕ እንስሳት ሓደስቲ ምዕባለታት",
      categoryCrops:"ዜና ዓዝሚ", categoryFarming:"ሕርሻ", categoryInnovation:"ፈጠራ", categoryResearch:"ምርምር",
      categoryClimate:"ክሊማን ዘላቕነትን", categoryLivestock:"ምርባሕ እንስሳት", categoryAgriculture:"ሕርሻ"
    },
    om: {
      breadcrumbHome:"Mana", breadcrumbNews:"Oduu Qonnaa", eyebrow:"ODEEFFANNOO QONNAA ADDUNYAA",
      pageHeading:"Oduu Qonnaa fi Kalaqa Haaraa",
      introDescription:"Misooma qonnaa, saayinsii midhaanii, qorannoo qonnaa fi teeknooloojii oomisha nyaataa addunyaa jijjiiran haaraa argadhaa.",
      filters:"Calaltuu", articlesFound:"oduu argame", language:"Afaan", refresh:"Oduu haaromsi",
      searchPlaceholder:"Midhaan, qonna, qorannoo ykn kalaqa barbaadi…", filterByTopic:"Mata dureedhaan calali",
      crops:"Oduu midhaanii", farming:"Qonna", innovation:"Kalaqa fi teeknooloojii", research:"Qorannoo fi saayinsii",
      climate:"Haala qilleensaa fi itti fufiinsa", livestock:"Beellada", sortBy:"Tartiibsi", newest:"Haaraa dursee",
      oldest:"Moofaa dursee", relevance:"Walqabsiisummaa", clearFilters:"Calaltuu qulqulleessi", applyFilters:"Calaltuu hojii irra oolchi",
      loading:"Oduun qonnaa fe'amaa jira…", loadMore:"Oduu dabalataa", footerNote:"Oduun kun maxxansitoota alaa irraa dhiyaata. Bal'ina isaa ilaaluuf oduu filadhu.",
      noResults:"Oduun qonnaa wal simatu hin argamne", noResultsSub:"Jechoota biraa barbaadi ykn calaltuu muraasa haqi.",
      apiMissing:"Oduu qonnaa yeroo ammaa argachuuf tajaajila oduu AgriNova walqabsiisi",
      apiMissingSub:"URL Supabase agriculture-news Edge Function kee bakka NEWS_EDGE_FUNCTION_URL jiru galchi.",
      apiError:"Amma oduu fe'uu hin dandeenye", apiErrorSub:"Walitti hidhamiinsa interneetii fi furtuu API kee mirkaneessi.",
      retry:"Irra deebi'i yaali", backToNews:"← Gara oduu qonnaatti deebi'i", articleLimit:"Tajaajilli oduu gabaabduu qofa kenna. Gabaasa guutuu argachuuf marsariitii maxxansaa bani.",
      readOriginal:"Oduu guutuu maxxansaa jalqabaa irratti dubbisi →", source:"Madda", published:"Guyyaa maxxanfame",
      openArticle:"Oduu bani", translationUnavailable:"Barreeffamni oduu afaan jalqabaa isaatiin mul'ata. Barreeffama oduu hiikuuf tajaajila hiikkaa qindeessi.",
      taglineCrop:"Misooma haaraa gara fuuldura midhaanii jijjiiru", taglineFarming:"Yaada fi guddina hojii qonnaa jijjiiru",
      taglineInnovation:"Teeknooloojii carraa haaraa qonnaaf uumu", taglineResearch:"Argannoo beekumsa qonnaa guddisu",
      taglineClimate:"Sirna nyaataa dandamatuu fi itti fufiinsa qabu ijaaruu", taglineLivestock:"Misooma haaraa horsiisa beelladaa keessatti",
      categoryCrops:"Oduu midhaanii", categoryFarming:"Qonna", categoryInnovation:"Kalaqa", categoryResearch:"Qorannoo",
      categoryClimate:"Haala qilleensaa fi itti fufiinsa", categoryLivestock:"Beellada", categoryAgriculture:"Qonna"
    },
    so: {
      breadcrumbHome:"Hoy", breadcrumbNews:"Wararka Beeraha", eyebrow:"CUSBOONAYSIINTA BEERAHA ADDUUNKA",
      pageHeading:"Wararka Beeraha iyo Hal-abuurka",
      introDescription:"La soco horumarradii ugu dambeeyay ee beeraha, cilmiga dalagyada, cilmi-baarista beeraha iyo teknoolojiyada beddelaysa wax-soo-saarka cuntada adduunka.",
      filters:"Shaandhooyin", articlesFound:"war ayaa la helay", language:"Luqad", refresh:"Cusboonaysii wararka",
      searchPlaceholder:"Raadi dalagyo, beerasho, cilmi-baaris ama hal-abuur…", filterByTopic:"Ku shaandhee mawduuc",
      crops:"Wararka dalagyada", farming:"Beerasho", innovation:"Hal-abuur iyo teknooloji", research:"Cilmi-baaris iyo saynis",
      climate:"Cimilada iyo waaritaanka", livestock:"Xoolaha", sortBy:"Kala hormari", newest:"Kuwa ugu cusub",
      oldest:"Kuwa ugu horreeyay", relevance:"Kuwa ugu habboon", clearFilters:"Nadiifi shaandhooyinka", applyFilters:"Dhaqan geli shaandhooyinka",
      loading:"Wararka beeraha ayaa la soo rarayaa…", loadMore:"Soo rar warar dheeraad ah", footerNote:"Wararkan waxaa bixiya daabacayaal dibadeed. Dooro maqaal si aad u aragto faahfaahinta oo aad u booqato isha asalka ah.",
      noResults:"Lama helin warar beeraha la xiriira", noResultsSub:"Isku day raadis kale ama nadiifi shaandhooyinka qaarkood.",
      apiMissing:"Ku xidh adeegga wararka AgriNova si aad u hesho wararka beeraha ee tooska ah",
      apiMissingSub:"Geli URL-ka Supabase agriculture-news Edge Function gudaha NEWS_EDGE_FUNCTION_URL ee faylkan.",
      apiError:"Hadda ma soo rari karno wararka", apiErrorSub:"Hubi internetkaaga iyo furaha API-ga, dabadeed mar kale isku day.",
      retry:"Mar kale isku day", backToNews:"← Ku noqo wararka beeraha", articleLimit:"Adeegga wararku wuxuu bixiyaa hordhac kooban. Ka fur bogga daabacaha si aad u akhrido warbixinta oo dhan.",
      readOriginal:"Ka akhri maqaalka oo dhan daabacaha asalka ah →", source:"Isha", published:"La daabacay",
      openArticle:"Fur maqaalka", translationUnavailable:"Qoraalka warka waxaa lagu muujinayaa luqaddiisii asalka ahayd. Habee adeeg turjumaad si loo turjumo qoraalka.",
      taglineCrop:"Horumarro cusub oo qaabaynaya mustaqbalka dalagyada", taglineFarming:"Fikrado iyo horumar beddelaya habka beeruhu u shaqeeyaan",
      taglineInnovation:"Teknooloji abuuraysa fursado cusub oo beeraha ah", taglineResearch:"Daahfurro kobcinaya aqoonta beeraha",
      taglineClimate:"Dhisidda nidaamyo cunto oo adkaysi leh oo waara", taglineLivestock:"Horumarro cusub oo ku saabsan xannaanada xoolaha",
      categoryCrops:"Wararka dalagyada", categoryFarming:"Beerasho", categoryInnovation:"Hal-abuur", categoryResearch:"Cilmi-baaris",
      categoryClimate:"Cimilada iyo waaritaanka", categoryLivestock:"Xoolaha", categoryAgriculture:"Beeraha"
    }
  };

  const CATEGORY_RULES = {
    crops: /\b(crop|crops|seed|seeds|maize|corn|wheat|rice|teff|sorghum|soybean|soy|barley|cassava|potato|tomato|fruit|vegetable|plant breeding|genetically modified|gmo|biotech|variety|cultivar)\b/i,
    farming: /\b(farm|farmer|farming|agriculture|agricultural|harvest|irrigation|soil|fertili[sz]er|pesticide|agronom|farmers)\b/i,
    innovation: /\b(innovation|technology|agtech|agri.?tech|drone|robot|precision agriculture|artificial intelligence| AI |automation|machine learning|sensor|smart farm|vertical farm)\b/i,
    research: /\b(research|study|scientist|science|university|trial|discovery|genetic|genome|breeding|laboratory)\b/i,
    climate: /\b(climate|drought|flood|weather|sustainable|sustainability|regenerative|carbon|soil health|resilien)\b/i,
    livestock: /\b(livestock|cattle|cow|dairy|poultry|chicken|sheep|goat|animal health|veterinary|herd)\b/i
  };

  const state = {
    articles: [], page: 1, totalResults: 0, hasMore: false, loading: false,
    selectedCategories: [], searchTerm: "", sort: "newest", language: "en",
    filtered: [], error: null, translationCache: new Map()
  };

  const $ = (id) => document.getElementById(id);
  const newsGrid = $("newsGrid");
  const filterPanel = $("filterPanel");
  const languageSelect = $("languageSelect");

  const t = (key) => (I18N[state.language] && I18N[state.language][key]) || I18N.en[key] || key;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
  const safeUrl = (value) => {
    try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; }
    catch { return ""; }
  };

  function applyTranslations() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = "ltr";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (t(key)) node.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.getAttribute("data-i18n-placeholder"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });
    renderGrid();
    if (new URLSearchParams(location.search).has("article")) renderArticlePage();
  }

  function detectCategories(article) {
    const text = `${article.title || ""} ${article.description || ""} ${article.content || ""}`;
    const found = Object.entries(CATEGORY_RULES).filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
    return found.length ? found : ["farming"];
  }

  function categoryLabel(category) {
    const keys = {
      crops:"categoryCrops", farming:"categoryFarming", innovation:"categoryInnovation",
      research:"categoryResearch", climate:"categoryClimate", livestock:"categoryLivestock"
    };
    return t(keys[category] || "categoryAgriculture");
  }

  function taglineFor(article) {
    const category = article.categories[0];
    const key = {
      crops:"taglineCrop", farming:"taglineFarming", innovation:"taglineInnovation",
      research:"taglineResearch", climate:"taglineClimate", livestock:"taglineLivestock"
    }[category] || "taglineFarming";
    return t(key);
  }

  function normalizeArticle(article) {
    const title = article.title || "";
    const description = article.description || "";
    const content = article.content || "";
    const source = article.source && article.source.name ? article.source.name : "News publisher";
    const url = safeUrl(article.url);
    const image = safeUrl(article.urlToImage);
    const publishedAt = article.publishedAt || "";
    const id = `${url || title}-${publishedAt}`.slice(0, 500);
    const normalized = { id, title, description, content, source, url, image, publishedAt };
    normalized.categories = detectCategories(normalized);
    return normalized;
  }

  function articleIsRelevant(article) {
    const text = `${article.title} ${article.description} ${article.content}`;
    const broad = /(agricultur|farm|crop|seed|harvest|irrigat|soil|livestock|agritech|agri-tech|plant breed|food production|fertili[sz]er|pesticide|genetically modified|gmo|drought|precision agriculture)/i;
    return broad.test(text) && Boolean(article.title) && Boolean(article.url);
  }

  function showNotice(title, message, actionLabel, action) {
    newsGrid.innerHTML = `<div class="news-notice"><h3>${esc(title)}</h3><p>${esc(message)}</p>${actionLabel ? `<button class="retry-btn" id="noticeAction" type="button">${esc(actionLabel)}</button>` : ""}</div>`;
    const button = $("noticeAction");
    if (button && action) button.addEventListener("click", action);
    $("resultCount").textContent = "0";
    $("loadMoreContainer").hidden = true;
  }

  function showLoading() {
    newsGrid.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>${esc(t("loading"))}</p></div>`;
  }
    async function fetchNews({ append = false } = {}) {
    if (state.loading) return;

    const edgeFunctionUrl = String(CONFIG.NEWS_EDGE_FUNCTION_URL || "").trim();
    if (
      !edgeFunctionUrl ||
      edgeFunctionUrl.includes("PASTE_YOUR_SUPABASE") ||
      !/^https:\/\//i.test(edgeFunctionUrl)
    ) {
      showNotice(t("apiMissing"), t("apiMissingSub"));
      return;
    }

    state.loading = true;
    state.error = null;
    if (!append) showLoading();

    const refreshButton = $("refreshBtn");
    const loadMoreButton = $("loadMoreBtn");
    if (refreshButton) refreshButton.disabled = true;
    if (loadMoreButton) loadMoreButton.disabled = true;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      CONFIG.REQUEST_TIMEOUT_MS
    );

    try {
      const response = await fetch(edgeFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          page: state.page,
          pageSize: CONFIG.PAGE_SIZE
        }),
        signal: controller.signal
      });

      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new Error(
          `The Supabase function returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok || !payload || payload.status !== "ok") {
        const message = payload && payload.message
          ? payload.message
          : `Supabase news request failed (${response.status}).`;
        throw new Error(message);
      }

      const articles = Array.isArray(payload.articles) ? payload.articles : [];
      const incoming = articles
        .map(normalizeArticle)
        .filter(articleIsRelevant);

      const known = new Set(state.articles.map(article => article.id));
      const unique = incoming.filter(article => !known.has(article.id));

      state.articles = append ? [...state.articles, ...unique] : unique;
      state.totalResults = Number(payload.totalResults || 0);
      state.hasMore =
        state.page < Math.ceil(state.totalResults / CONFIG.PAGE_SIZE) &&
        state.page < CONFIG.MAX_PAGES_PER_SESSION &&
        articles.length === CONFIG.PAGE_SIZE;

      applyFiltersAndRender();

      if (!state.articles.length) {
        showNotice(t("noResults"), t("noResultsSub"));
      }
    } catch (error) {
      console.error("AgriNova Supabase news error:", error);
      state.error = error;

      const message = error && error.name === "AbortError"
        ? "The news request timed out. Please try again."
        : (error.message || "Unknown connection error.");

      if (append && state.articles.length) {
        if (loadMoreButton) loadMoreButton.textContent = t("retry");
        showNotice(t("apiError"), `${t("apiErrorSub")} ${message}`, t("retry"), () => {
          fetchNews({ append: true });
        });
      } else {
        showNotice(
          t("apiError"),
          `${t("apiErrorSub")} ${message}`,
          t("retry"),
          () => fetchNews()
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      state.loading = false;
      if (refreshButton) refreshButton.disabled = false;
      if (loadMoreButton) loadMoreButton.disabled = false;
      if (state.hasMore && loadMoreButton) {
        loadMoreButton.textContent = t("loadMore");
      }
      if (state.hasMore && $("loadMoreContainer")) {
        $("loadMoreContainer").hidden = false;
      }
    }
  }

  function applyFiltersAndRender() {
    const term = state.searchTerm.trim().toLocaleLowerCase();
    let list = state.articles.filter(article => {
      const matchesCategory = !state.selectedCategories.length ||
        state.selectedCategories.some(category => article.categories.includes(category));
      const searchable = `${article.title} ${article.description} ${article.content} ${article.source}`.toLocaleLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      return matchesCategory && matchesSearch;
    });

    if (state.sort === "newest") list.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    if (state.sort === "oldest") list.sort((a,b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    state.filtered = list;
    renderGrid();
  }

  function fallbackSymbol(article) {
    if (article.categories.includes("crops")) return "🌱";
    if (article.categories.includes("livestock")) return "🐄";
    if (article.categories.includes("innovation")) return "⚙";
    if (article.categories.includes("research")) return "🔬";
    if (article.categories.includes("climate")) return "🌍";
    return "🌾";
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(state.language === "en" ? "en" : state.language, {
      year:"numeric", month:"short", day:"numeric"
    }).format(date);
  }

  function renderGrid() {
    if (!newsGrid) return;
    $("resultCount").textContent = String(state.filtered.length);
    const activeCount = state.selectedCategories.length;
    $("filterCount").textContent = String(activeCount);
    $("filterCount").hidden = activeCount === 0;
    $("loadMoreContainer").hidden = !state.hasMore || state.loading;

    if (!state.filtered.length) {
      if (state.articles.length) {
        newsGrid.innerHTML = `<div class="empty-state"><p>${esc(t("noResults"))}</p><p class="empty-sub">${esc(t("noResultsSub"))}</p></div>`;
      }
      return;
    }

    newsGrid.innerHTML = state.filtered.map(article => {
      const category = article.categories[0] || "farming";
      const imageMarkup = article.image
        ? `<img src="${esc(article.image)}" alt="${esc(article.title)}" loading="lazy" referrerpolicy="no-referrer">`
        : `<div class="image-fallback"><span class="fallback-symbol">${fallbackSymbol(article)}</span><span>${esc(categoryLabel(category))}</span></div>`;
      return `
        <article class="news-card" tabindex="0" role="link" data-article-id="${esc(article.id)}" aria-label="${esc(t("openArticle"))}: ${esc(article.title)}">
          <div class="news-card-image">${imageMarkup}</div>
          <div class="news-card-body">
            <span class="news-card-category">${esc(categoryLabel(category))}</span>
            <p class="news-card-tagline">${esc(taglineFor(article))}</p>
            <h3 class="news-card-title">${esc(article.title)}</h3>
            <p class="news-card-summary">${esc(article.description || article.content || "")}</p>
            <div class="news-card-meta">
              <span class="source">${esc(article.source)}</span>
              <span class="date">${esc(formatDate(article.publishedAt))}</span>
            </div>
            <a class="read-more-btn" href="${esc(article.url)}" target="_blank" rel="noopener noreferrer" data-source-link>${esc(t("openArticle"))} →</a>
          </div>
        </article>`;
    }).join("");

    newsGrid.querySelectorAll(".news-card-image img").forEach(img => {
      img.addEventListener("error", () => {
        const article = state.filtered.find(item => item.title === img.alt);
        const box = document.createElement("div");
        box.className = "image-fallback";
        const symbol = document.createElement("span");
        symbol.className = "fallback-symbol";
        symbol.textContent = article ? fallbackSymbol(article) : "🌱";
        const label = document.createElement("span");
        label.textContent = article ? categoryLabel(article.categories[0]) : "Agriculture";
        box.append(symbol, label);
        img.replaceWith(box);
      }, { once: true });
    });

    newsGrid.querySelectorAll(".news-card").forEach(card => {
      const open = () => openArticle(card.dataset.articleId);
      card.addEventListener("click", (event) => {
        if (event.target.closest("[data-source-link]")) return;
        open();
      });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          if (event.target === card) { event.preventDefault(); open(); }
        }
      });
    });
  }
    function openArticle(id) {
    const article = state.articles.find(item => item.id === id);
    if (!article) return;
    try { localStorage.setItem("agrinova_selected_news_article", JSON.stringify(article)); }
    catch (error) { console.warn("Could not save selected article:", error); }
    const target = `${location.pathname}?article=${encodeURIComponent(id)}`;
    const opened = window.open(target, "_blank", "noopener");
    if (!opened) location.href = target;
  }

  async function translateText(text, targetLanguage) {
    if (!text || targetLanguage === "en" || !CONFIG.TRANSLATION_API_URL) return text;
    const cacheKey = `${targetLanguage}:${text}`;
    if (state.translationCache.has(cacheKey)) return state.translationCache.get(cacheKey);
    try {
      const response = await fetch(CONFIG.TRANSLATION_API_URL, {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          ...(CONFIG.TRANSLATION_API_KEY ? { "Authorization": `Bearer ${CONFIG.TRANSLATION_API_KEY}` } : {})
        },
        body:JSON.stringify({ q:text, source:"auto", target:targetLanguage, format:"text" })
      });
      if (!response.ok) throw new Error("Translation request failed");
      const result = await response.json();
      const translated = result.translatedText || result.translation || text;
      state.translationCache.set(cacheKey, translated);
      return translated;
    } catch (error) {
      console.warn("Article translation unavailable:", error);
      return text;
    }
  }

  async function renderArticlePage() {
    const id = new URLSearchParams(location.search).get("article");
    if (!id) return;
    let article = state.articles.find(item => item.id === id);
    if (!article) {
      try {
        const stored = JSON.parse(localStorage.getItem("agrinova_selected_news_article") || "null");
        if (stored && stored.id === id) article = stored;
      } catch {}
    }
    if (!article) {
      document.querySelector(".dashboard-page").hidden = true;
      showNotice(t("apiError"), t("apiErrorSub"), t("backToNews"), () => location.assign(location.pathname));
      return;
    }

    document.title = `${article.title} | AgriNova`;
    document.querySelector(".dashboard-page").hidden = true;
    let page = $("articleDetail");
    if (!page) {
      const template = $("articlePageTemplate");
      document.body.appendChild(template.content.cloneNode(true));
      page = $("articleDetail");
    }

    const image = $("detailImage");
    if (article.image) {
      const img = document.createElement("img");
      img.src = article.image;
      img.alt = article.title;
      img.referrerPolicy = "no-referrer";
      img.onerror = () => { image.innerHTML = `<div class="image-fallback">🌱</div>`; };
      image.replaceChildren(img);
    } else {
      image.innerHTML = `<div class="image-fallback">${fallbackSymbol(article)}</div>`;
    }
    $("detailCategory").textContent = categoryLabel(article.categories[0]);
    $("detailTitle").textContent = await translateText(article.title, state.language);
    $("detailTagline").textContent = taglineFor(article);
    $("detailMeta").textContent = `${t("source")}: ${article.source}  •  ${t("published")}: ${formatDate(article.publishedAt)}`;
    const bodyText = article.description || article.content || "";
    $("detailContent").textContent = await translateText(bodyText, state.language);
    $("detailSourceLink").href = article.url;
    applyTranslationsToArticle(page);
  }

  function applyTranslationsToArticle(page) {
    page.querySelectorAll("[data-i18n]").forEach(node => {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(key);
    });
  }

  function bindEvents() {
    $("filterToggle").addEventListener("click", () => {
      const active = filterPanel.classList.toggle("active");
      $("filterToggle").setAttribute("aria-expanded", String(active));
    });
    $("applyFilters").addEventListener("click", () => {
      state.selectedCategories = [...document.querySelectorAll("#categoryFilters input:checked")].map(input => input.value);
      applyFiltersAndRender();
      filterPanel.classList.remove("active");
      $("filterToggle").setAttribute("aria-expanded", "false");
    });
    $("clearFilters").addEventListener("click", () => {
      document.querySelectorAll("#categoryFilters input").forEach(input => { input.checked = false; });
      state.selectedCategories = [];
      applyFiltersAndRender();
    });
    $("searchInput").addEventListener("input", (event) => {
      state.searchTerm = event.target.value;
      $("clearSearch").hidden = !state.searchTerm;
      applyFiltersAndRender();
    });
    $("clearSearch").addEventListener("click", () => {
      $("searchInput").value = "";
      state.searchTerm = "";
      $("clearSearch").hidden = true;
      applyFiltersAndRender();
      $("searchInput").focus();
    });
    $("sortSelect").addEventListener("change", (event) => {
      state.sort = event.target.value;
      applyFiltersAndRender();
    });
    $("refreshBtn").addEventListener("click", () => {
      state.page = 1;
      state.articles = [];
      fetchNews();
    });
    $("loadMoreBtn").addEventListener("click", () => {
      if (!state.hasMore || state.loading) return;
      state.page += 1;
      fetchNews({ append:true });
    });
    languageSelect.addEventListener("change", (event) => {
      state.language = event.target.value;
      try { localStorage.setItem("agrinova_news_language", state.language); } catch {}
      applyTranslations();
    });
  }
    async function init() {
    try {
      const savedLanguage = localStorage.getItem("agrinova_news_language");
      if (savedLanguage && I18N[savedLanguage]) state.language = savedLanguage;
    } catch {}
    languageSelect.value = state.language;
    bindEvents();
    applyTranslations();

    if (new URLSearchParams(location.search).has("article")) {
      await renderArticlePage();
      return;
    }
    await fetchNews();
  }

  document.addEventListener("DOMContentLoaded", init);
})();