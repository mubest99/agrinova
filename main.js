
// =============================================
// AGRINOVA - MAIN JAVASCRIPT
// Supabase + Five Languages + Page Navigation
// =============================================


// =============================================
// 1. SUPABASE CONFIGURATION
// =============================================

// =============================================
// SUPABASE CONFIGURATION
// =============================================

const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";

let supabaseClient = null;

if (
  window.supabase &&
  SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_PUBLISHABLE_KEY"
) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
} else {
  console.warn(
    "Supabase is not configured. Navigation and translations can still work."
  );
}


// =============================================
// 2. TRANSLATIONS
// =============================================

const translations = {

  en: {
    title: "AgriNova · farm platform",
    tagline: "Growing Smarter, Farming Better",
    start: "Start Your Farming Journey",

    farmerTitle: "I am a farmer",
    farmerDesc: "Access tools designed to help you understand your farm, plan your crops, monitor weather conditions, analyze your resources, follow market prices, manage your farming activities, and make better agricultural decisions.",

    visitorTitle: "I'm not a farmer",
    visitorDesc: "Explore the world of agriculture through interactive learning, real agricultural information, weather, Ethiopia's crop map, farming articles, the Farm Simulator, and other educational experiences.",

    registerSubtitle: "Create your farmer account",
    loginSubtitle: "Login to your farmer account",

    fullName: "Full name",
    namePlaceholder: "e.g. Tadesse Ayele",
    email: "Email",
    emailPlaceholder: "farmer@agrinova.et",
    phone: "Phone number",
    phonePlaceholder: "+251 9XX XXX XXX",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    region: "Region",
    city: "City",
    cityPlaceholder: "e.g. Adama",
    hectares: "Farm hectares",
    hectaresPlaceholder: "e.g. 5.5",
    nationalId: "National ID (upload photo)",

    oromia: "Oromia",
    amhara: "Amhara",
    tigray: "Tigray",
    snnpr: "SNNPR",
    somali: "Somali",
    benishangul: "Benishangul-Gumuz",
    harari: "Harari",
    gambela: "Gambela",
    addis: "Addis Ababa",
    direDawa: "Dire Dawa",

    createAccount: "Create account",
    login: "Login",
    alreadyAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    createOne: "Create one",
    logout: "Logout",
    welcomeDashboard: "Welcome to your Dashboard",
    loggedIn: "You are now logged in to AgriNova.",

    required: "Please fill in all required fields.",
    invalidEmail: "Please enter a valid email address.",
    shortPassword: "Password must contain at least 6 characters.",
    accountCreated: "Account created successfully! Please login.",
    accountCreatedNoSession: "Account created, but no login session was returned. Check your Supabase email confirmation settings.",
    registrationError: "Registration failed: ",
    profileError: "Your account was created, but saving your farmer profile failed: ",
    noAccountFound: "No account found. Please create an account first.",
    invalidLogin: "Invalid email or password. Please try again.",
    loginError: "Login failed: ",
    uploadError: "Your account was created, but your National ID upload failed: ",
    fileTooLarge: "National ID image must be 50 MB or smaller.",
    invalidFile: "Please upload a JPG, PNG or WebP image.",
    visitorMessage: "You are entering AgriNova as a visitor. Enjoy exploring!",
    logoutSuccess: "You have logged out successfully.",
    unexpectedError: "Something went wrong. Please try again."
  },

  am: {
    title: "አግሪኖቫ · የእርሻ መድረክ",
    tagline: "በብልህነት ማሳደግ፣ በተሻለ መንገድ ማረስ",
    start: "የእርሻ ጉዞዎን ይጀምሩ",

    farmerTitle: "እኔ ገበሬ ነኝ",
    farmerDesc: "እርሻዎን ለመረዳት፣ ሰብሎችዎን ለማቀድ፣ የአየር ሁኔታን ለመከታተል፣ ሀብቶችዎን ለመተንተን፣ የገበያ ዋጋዎችን ለማወቅ እና የእርሻ ሥራዎን ለማስተዳደር የሚረዱ መሣሪያዎችን ያግኙ።",

    visitorTitle: "እኔ ገበሬ አይደለሁም",
    visitorDesc: "በተግባራዊ ትምህርት፣ በግብርና መረጃዎች፣ በአየር ሁኔታ፣ በኢትዮጵያ የሰብል ካርታ፣ በእርሻ ጽሑፎች እና በእርሻ ማስመሰያ ዓለምን ያስሱ።",

    registerSubtitle: "የገበሬ መለያዎን ይፍጠሩ",
    loginSubtitle: "ወደ የገበሬ መለያዎ ይግቡ",

    fullName: "ሙሉ ስም",
    namePlaceholder: "ለምሳሌ ታደሰ አየለ",
    email: "ኢሜይል",
    emailPlaceholder: "farmer@agrinova.et",
    phone: "ስልክ ቁጥር",
    phonePlaceholder: "+251 9XX XXX XXX",
    password: "የይለፍ ቃል",
    passwordPlaceholder: "የይለፍ ቃልዎን ያስገቡ",
    region: "ክልል",
    city: "ከተማ",
    cityPlaceholder: "ለምሳሌ አዳማ",
    hectares: "የእርሻ መሬት በሄክታር",
    hectaresPlaceholder: "ለምሳሌ 5.5",
    nationalId: "ብሔራዊ መታወቂያ (ፎቶ ይጫኑ)",

    oromia: "ኦሮሚያ",
    amhara: "አማራ",
    tigray: "ትግራይ",
    snnpr: "ደቡብ ኢትዮጵያ",
    somali: "ሶማሌ",
    benishangul: "ቤንሻንጉል ጉሙዝ",
    harari: "ሐረሪ",
    gambela: "ጋምቤላ",
    addis: "አዲስ አበባ",
    direDawa: "ድሬዳዋ",

    createAccount: "መለያ ይፍጠሩ",
    login: "ግባ",
    alreadyAccount: "አስቀድመው መለያ አለዎት?",
    noAccount: "መለያ የለዎትም?",
    createOne: "አዲስ መለያ ይፍጠሩ",
    logout: "ውጣ",
    welcomeDashboard: "ወደ ዳሽቦርድዎ እንኳን በደህና መጡ",
    loggedIn: "አሁን ወደ AgriNova ገብተዋል።",

    required: "እባክዎ ሁሉንም አስፈላጊ መረጃዎች ያስገቡ።",
    invalidEmail: "ትክክለኛ የኢሜይል አድራሻ ያስገቡ።",
    shortPassword: "የይለፍ ቃሉ ቢያንስ 6 ቁምፊዎች ሊኖሩት ይገባል።",
    accountCreated: "መለያዎ በተሳካ ሁኔታ ተፈጥሯል! እባክዎ ይግቡ።",
    accountCreatedNoSession: "መለያው ተፈጥሯል፣ ግን የመግቢያ ፈቃድ አልተገኘም። የኢሜይል ማረጋገጫ ቅንብርን ይፈትሹ።",
    registrationError: "ምዝገባው አልተሳካም፦ ",
    profileError: "መለያዎ ተፈጥሯል፣ ግን የገበሬ መረጃዎን ማስቀመጥ አልተሳካም፦ ",
    noAccountFound: "መለያ አልተገኘም። እባክዎ መጀመሪያ ይመዝገቡ።",
    invalidLogin: "ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።",
    loginError: "መግባት አልተሳካም፦ ",
    uploadError: "መለያዎ ተፈጥሯል፣ ግን መታወቂያውን መጫን አልተሳካም፦ ",
    fileTooLarge: "የመታወቂያ ፎቶው ከ50 ሜባ መብለጥ የለበትም።",
    invalidFile: "እባክዎ JPG፣ PNG ወይም WebP ፎቶ ይጫኑ።",
    visitorMessage: "እንደ ጎብኚ ወደ AgriNova ገብተዋል።",
    logoutSuccess: "በተሳካ ሁኔታ ወጥተዋል።",
    unexpectedError: "ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።"
  },

  ti: {
    title: "AgriNova · መድረኽ ሕርሻ",
    tagline: "ብዝሓሸ ፍልጠት ምምራት፣ ብዝሓሸ መገዲ ምሕራስ",
    start: "ጉዕዞ ሕርሻኹም ጀምሩ",

    farmerTitle: "ኣነ ሓረስታይ እየ",
    farmerDesc: "ንሕርሻኹም ንምርዳእ፣ ዝራእትኹም ንምውጣን፣ ኩነታት ኣየር ንምክትታል፣ ሃብትኹም ንምትንታን፣ ዋጋታት ዕዳጋ ንምፍላጥን ስራሕ ሕርሻኹም ንምምሕዳርን ዝሕግዙ መሳርሒታት ርኸቡ።",

    visitorTitle: "ኣነ ሓረስታይ ኣይኮንኩን",
    visitorDesc: "ብተግባራዊ ትምህርቲ፣ ብሓቀኛ ሓበሬታ ሕርሻ፣ ብኩነታት ኣየር፣ ብካርታ ዝራእቲ ኢትዮጵያ፣ ብጽሑፋት ሕርሻን ብFarm Simulatorን ዓለም ሕርሻ ዳህስሱ።",

    registerSubtitle: "ናይ ሓረስታይ ሕሳብኩም ፍጠሩ",
    loginSubtitle: "ናብ ሕሳብኩም እተዉ",

    fullName: "ምሉእ ስም",
    namePlaceholder: "ንኣብነት ታደሰ ኣየለ",
    email: "ኢመይል",
    emailPlaceholder: "farmer@agrinova.et",
    phone: "ቁጽሪ ተሌፎን",
    phonePlaceholder: "+251 9XX XXX XXX",
    password: "ምስጢራዊ ቃል",
    passwordPlaceholder: "ምስጢራዊ ቃልኩም ኣእትዉ",
    region: "ክልል",
    city: "ከተማ",
    cityPlaceholder: "ንኣብነት ኣዳማ",
    hectares: "ስፍሓት ሕርሻ ብሄክታር",
    hectaresPlaceholder: "ንኣብነት 5.5",
    nationalId: "ብሄራዊ መንነት (ስእሊ ጽዓኑ)",

    oromia: "ኦሮሚያ",
    amhara: "ኣምሓራ",
    tigray: "ትግራይ",
    snnpr: "ደቡብ ኢትዮጵያ",
    somali: "ሶማሌ",
    benishangul: "ቤንሻንጉል ጉሙዝ",
    harari: "ሓረሪ",
    gambela: "ጋምቤላ",
    addis: "ኣዲስ ኣበባ",
    direDawa: "ድሬዳዋ",

    createAccount: "ሕሳብ ፍጠሩ",
    login: "እቶ",
    alreadyAccount: "ድሮ ሕሳብ ኣለኩም?",
    noAccount: "ሕሳብ የብልኩምን?",
    createOne: "ሓድሽ ሕሳብ ፍጠሩ",
    logout: "ውጽኡ",
    welcomeDashboard: "ናብ ዳሽቦርድኩም እንቋዕ ብደሓን መጻእኩም",
    loggedIn: "ሕጂ ናብ AgriNova ኣቲኹም ኣለኹም።",

    required: "በጃኹም ኩሉ ኣድላዪ ሓበሬታ ኣእትዉ።",
    invalidEmail: "ትኽክለኛ ኣድራሻ ኢመይል ኣእትዉ።",
    shortPassword: "ምስጢራዊ ቃል ብውሑዱ 6 ፊደላት ክህልዎ ኣለዎ።",
    accountCreated: "ሕሳብኩም ብዓወት ተፈጢሩ! በጃኹም እተዉ።",
    accountCreatedNoSession: "ሕሳብ ተፈጢሩ፣ ግን ናይ መእተዊ ፍቓድ ኣይተረኽበን። ቅንብር ምርግጋጽ ኢመይል መርምሩ።",
    registrationError: "ምዝገባ ኣይተዓወተን፦ ",
    profileError: "ሕሳብኩም ተፈጢሩ፣ ግን መረዳእታ ሓረስታይ ምቕማጥ ኣይተዓወተን፦ ",
    noAccountFound: "ሕሳብ ኣይተረኽበን። በጃኹም መጀመርታ ተመዝገቡ።",
    invalidLogin: "ኢመይል ወይ ምስጢራዊ ቃል ጌጋ እዩ።",
    loginError: "ምእታው ኣይተዓወተን፦ ",
    uploadError: "ሕሳብኩም ተፈጢሩ፣ ግን ስእሊ መንነት ምጽዓን ኣይተዓወተን፦ ",
    fileTooLarge: "ስእሊ መንነት ካብ 50 ሜጋባይት ክበልጽ የብሉን።",
    invalidFile: "በጃኹም JPG፣ PNG ወይ WebP ስእሊ ጽዓኑ።",
    visitorMessage: "ከም በጻሒ ናብ AgriNova ኣቲኹም ኣለኹም።",
    logoutSuccess: "ብዓወት ወጺእኩም ኣለኹም።",
    unexpectedError: "ጸገም ተፈጢሩ። በጃኹም እንደገና ፈትኑ።"
  },

  om: {
    title: "AgriNova · waltajjii qonnaa",
    tagline: "Ogummaan Guddachuu, Caalaatti Qonnaan Buluu",
    start: "Imala Qonnaa Keessan Eegalaa",

    farmerTitle: "Ani qonnaan bulaadha",
    farmerDesc: "Meeshaalee qonna keessan hubachuuf, midhaan keessan karoorfachuuf, haala qilleensaa hordofuuf, qabeenya keessan xiinxaluuf, gatii gabaa beekuuf, hojii qonnaa bulchuuf fi murtoo qonnaa gaarii gochuuf isin gargaaran argadhaa.",

    visitorTitle: "Ani qonnaan bulaa miti",
    visitorDesc: "Barnoota wal-qunnamtii qabu, odeeffannoo qonnaa dhugaa, haala qilleensaa, kaartaa midhaan Itoophiyaa, barruulee qonnaa fi Farm Simulator fayyadamuun addunyaa qonnaa qoradhaa.",

    registerSubtitle: "Herrega qonnaan bulaa keessan uumaa",
    loginSubtitle: "Herrega qonnaan bulaa keessan seenaa",

    fullName: "Maqaa guutuu",
    namePlaceholder: "Fakkeenyaaf Tadesse Ayele",
    email: "Imeelii",
    emailPlaceholder: "farmer@agrinova.et",
    phone: "Lakkoofsa bilbilaa",
    phonePlaceholder: "+251 9XX XXX XXX",
    password: "Jecha iccitii",
    passwordPlaceholder: "Jecha iccitii keessan galchaa",
    region: "Naannoo",
    city: "Magaalaa",
    cityPlaceholder: "Fakkeenyaaf Adaamaa",
    hectares: "Bal'ina qonnaa hektaaraan",
    hectaresPlaceholder: "Fakkeenyaaf 5.5",
    nationalId: "Waraqaa eenyummaa biyyaalessaa (suuraa olkaa'aa)",

    oromia: "Oromiyaa",
    amhara: "Amaaraa",
    tigray: "Tigraay",
    snnpr: "Itoophiyaa Kibbaa",
    somali: "Somaalee",
    benishangul: "Beenishaangul-Gumuz",
    harari: "Hararii",
    gambela: "Gaambeellaa",
    addis: "Finfinnee",
    direDawa: "Dirree Dhawaa",

    createAccount: "Herrega uumaa",
    login: "Seenaa",
    alreadyAccount: "Duraan herrega qabduu?",
    noAccount: "Herrega hin qabduu?",
    createOne: "Herrega haaraa uumaa",
    logout: "Ba'i",
    welcomeDashboard: "Gara Daashboordii keessaniitti baga nagaan dhuftan",
    loggedIn: "Amma AgriNova keessa seentaniittu.",

    required: "Maaloo odeeffannoo barbaachisaa hunda guutaa.",
    invalidEmail: "Maaloo teessoo imeelii sirrii galchaa.",
    shortPassword: "Jechi iccitii yoo xiqqaate arfiilee 6 qabaachuu qaba.",
    accountCreated: "Herregni keessan milkaa'inaan uumameera! Maaloo seenaa.",
    accountCreatedNoSession: "Herregni uumameera, garuu seensi hin banamne. Qindaa'ina mirkaneessa imeelii Supabase ilaalaa.",
    registrationError: "Galmeen hin milkoofne: ",
    profileError: "Herregni uumameera, garuu odeeffannoo qonnaan bulaa olkaa'uun hin milkoofne: ",
    noAccountFound: "Herregni hin argamne. Maaloo jalqaba galmaa'aa.",
    invalidLogin: "Imeeliin yookaan jechi iccitii sirrii miti.",
    loginError: "Seenuun hin milkoofne: ",
    uploadError: "Herregni uumameera, garuu suuraa eenyummaa olkaa'uun hin milkoofne: ",
    fileTooLarge: "Suuraan eenyummaa MB 50 caaluu hin qabu.",
    invalidFile: "Maaloo suuraa JPG, PNG yookaan WebP olkaa'aa.",
    visitorMessage: "Akka daawwattootaatti gara AgriNova dhuftaniittu. Baga nagaan dhuftan!",
    logoutSuccess: "Milkaa'inaan keessaa baataniittu.",
    unexpectedError: "Rakkoon uumameera. Maaloo irra deebi'aa yaalaa."
  },

  so: {
    title: "AgriNova · madal beeraha",
    tagline: "Si Wanaagsan u Kor, Si Wanaagsan u Beero",
    start: "Bilow Safarkaaga Beeraha",

    farmerTitle: "Anigu waxaan ahay beeraley",
    farmerDesc: "Hel qalab kaa caawinaya inaad fahanto beertaada, qorshayso dalagyadaada, la socoto cimilada, falanqayso khayraadkaaga, ogaato qiimaha suuqa, maamusho hawlaha beeraha, isla markaana gaadho go'aanno wanaagsan.",

    visitorTitle: "Anigu beeraley ma ihi",
    visitorDesc: "Sahami beeraha adigoo adeegsanaya waxbarasho isdhexgal ah, xog dhab ah oo beeraha ku saabsan, cimilada, khariidadda dalagyada Itoobiya, maqaallada beeraha iyo Farm Simulator.",

    registerSubtitle: "Samee akoonkaaga beeraleyda",
    loginSubtitle: "Gal akoonkaaga beeraleyda",

    fullName: "Magaca oo buuxa",
    namePlaceholder: "Tusaale Tadesse Ayele",
    email: "Iimayl",
    emailPlaceholder: "farmer@agrinova.et",
    phone: "Lambarka telefoonka",
    phonePlaceholder: "+251 9XX XXX XXX",
    password: "Furaha sirta ah",
    passwordPlaceholder: "Geli furahaaga sirta ah",
    region: "Gobolka",
    city: "Magaalada",
    cityPlaceholder: "Tusaale Adama",
    hectares: "Baaxadda beerta (hektar)",
    hectaresPlaceholder: "Tusaale 5.5",
    nationalId: "Aqoonsiga qaranka (soo geli sawir)",

    oromia: "Oromiya",
    amhara: "Amxaarada",
    tigray: "Tigray",
    snnpr: "Koonfurta Itoobiya",
    somali: "Soomaali",
    benishangul: "Beni Shangul-Gumuz",
    harari: "Harari",
    gambela: "Gambela",
    addis: "Addis Ababa",
    direDawa: "Diridhaba",

    createAccount: "Samee akoon",
    login: "Gal",
    alreadyAccount: "Akoon hore ma u leedahay?",
    noAccount: "Akoon ma lihid?",
    createOne: "Samee akoon cusub",
    logout: "Ka bax",
    welcomeDashboard: "Ku soo dhawoow Dashboard-kaaga",
    loggedIn: "Hadda waxaad gashay AgriNova.",

    required: "Fadlan buuxi dhammaan meelaha loo baahan yahay.",
    invalidEmail: "Fadlan geli iimayl sax ah.",
    shortPassword: "Furaha sirta ahi waa inuu ka koobnaadaa ugu yaraan 6 xaraf.",
    accountCreated: "Akoonka si guul leh ayaa loo sameeyay! Fadlan gal.",
    accountCreatedNoSession: "Akoonka waa la sameeyay, laakiin gelitaanka lama helin. Hubi dejinta xaqiijinta iimaylka.",
    registrationError: "Diiwaangelintu way fashilantay: ",
    profileError: "Akoonka waa la sameeyay, laakiin kaydinta xogta beeraleyda way fashilantay: ",
    noAccountFound: "Akoon lama helin. Fadlan marka hore isdiiwaangeli.",
    invalidLogin: "Iimaylka ama furaha sirta ahi waa khalad.",
    loginError: "Gelitaanku wuu fashilmay: ",
    uploadError: "Akoonka waa la sameeyay, laakiin sawirka aqoonsiga lama soo gelin: ",
    fileTooLarge: "Sawirka aqoonsigu waa inuusan ka weynaan 50 MB.",
    invalidFile: "Fadlan soo geli sawir JPG, PNG ama WebP ah.",
    visitorMessage: "Waxaad AgriNova u soo gashay booqde ahaan. Ku raaxayso sahaminta!",
    logoutSuccess: "Si guul leh ayaad uga baxday.",
    unexpectedError: "Waxbaa khaldamay. Fadlan mar kale isku day."
  }
};


// =============================================
// 3. LANGUAGE SYSTEM
// =============================================

let currentLanguage = "en";

function translatePage(language) {

  if (!translations[language]) {
    language = "en";
  }

  currentLanguage = language;

  const dictionary = translations[language];

  document.documentElement.lang = language;
  document.title = dictionary.title;

  // Translate normal text
  document.querySelectorAll("[data-i18n]").forEach(element => {

    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }

  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

    const key = element.dataset.i18nPlaceholder;

    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }

  });

  // Synchronize all three language selectors
  document.querySelectorAll(".language-select").forEach(select => {
    select.value = language;
  });

}

document.querySelectorAll(".language-select").forEach(select => {

  select.addEventListener("change", function() {
    translatePage(this.value);
  });

});


// =============================================
// 4. DOM ELEMENTS
// =============================================

const landingPage = document.getElementById("page-landing");
const selectionPage = document.getElementById("page-selection");
const authPage = document.getElementById("page-auth");

const btnStart = document.getElementById("btnStartJourney");

const farmerSelect = document.getElementById("farmerSelect");
const visitorSelect = document.getElementById("visitorSelect");

const registerSection = document.getElementById("registerSection");
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

const goToLoginLink = document.getElementById("goToLoginLink");
const goToRegisterLink = document.getElementById("goToRegisterLink");

const farmerForm = document.getElementById("farmerForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");


// =============================================
// 5. TRANSLATED ALERT HELPER
// =============================================

function message(key, extra = "") {

  const dictionary = translations[currentLanguage];

  return (dictionary[key] || translations.en[key] || key) + extra;

}


// =============================================
// 6. PAGE NAVIGATION
// =============================================

function showPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);

  if (target) {
    target.classList.add("active");
  }

}


function showAuthSection(section) {

  registerSection.style.display = "none";
  loginSection.style.display = "none";
  dashboardSection.style.display = "none";

  if (section === "register") {
    registerSection.style.display = "block";
  }

  if (section === "login") {
    loginSection.style.display = "block";
  }

  if (section === "dashboard") {
    dashboardSection.style.display = "block";
  }

}


// =============================================
// 7. LANDING PAGE
// =============================================

btnStart.addEventListener("click", () => {

  showPage("page-selection");

});


// =============================================
// 8. FARMER AND VISITOR SELECTION
// =============================================

farmerSelect.addEventListener("click", () => {

  showPage("page-auth");
  showAuthSection("register");

});


visitorSelect.addEventListener("click", () => {

  window.location.href = "visitor-dashboard.html";

});


// =============================================
// 9. REGISTER / LOGIN NAVIGATION
// =============================================

goToLoginLink.addEventListener("click", event => {

  event.preventDefault();

  showAuthSection("login");

});


goToRegisterLink.addEventListener("click", event => {

  event.preventDefault();

  showAuthSection("register");

});


// =============================================
// 10. FARMER REGISTRATION WITH SUPABASE
// =============================================

farmerForm.addEventListener("submit", async event => {

  event.preventDefault();
  if (!supabaseClient) {
  alert("Please configure Supabase before creating an account or logging in.");
  return;
}

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  const phone = document.getElementById("regPhone").value.trim();
  const region = document.getElementById("regRegion").value;
  const city = document.getElementById("regCity").value.trim();

  const hectaresInput = document.getElementById("regHectares").value;

  const hectares = hectaresInput === ""
    ? null
    : Number(hectaresInput);

  const nationalIdFile = document.getElementById("regNationalId").files[0];


  // Required fields
  if (!name || !email || !password) {
    alert(message("required"));
    return;
  }

  // Password validation
  if (password.length < 6) {
    alert(message("shortPassword"));
    return;
  }

  // Farm size validation
  if (hectares !== null && (!Number.isFinite(hectares) || hectares < 0)) {
    alert(message("required"));
    return;
  }

  // National ID validation
  if (nationalIdFile) {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(nationalIdFile.type)) {
      alert(message("invalidFile"));
      return;
    }

    if (nationalIdFile.size > 50 * 1024 * 1024) {
      alert(message("fileTooLarge"));
      return;
    }

  }


  const submitButton = farmerForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;

  const originalButtonText = submitButton.textContent;

  submitButton.textContent = "...";


  try {

    // CREATE SUPABASE AUTH USER
    const { data, error } = await supabaseClient.auth.signUp({

      email: email,
      password: password,

      options: {
        data: {
          full_name: name
        }
      }

    });


    if (error) {
      throw new Error(error.message);
    }

    const user = data.user;

    if (!user) {
      throw new Error(message("unexpectedError"));
    }

    // Email confirmation is expected to be disabled.
    // Without a session, RLS prevents the profile insert.
    if (!data.session) {
      alert(message("accountCreatedNoSession"));
      return;
    }


    // SAVE FARMER PROFILE IN SUPABASE DATABASE
    const { error: profileError } = await supabaseClient
      .from("farmer_profiles")
      .insert({

        id: user.id,
        full_name: name,
        email: email,
        phone: phone || null,
        region: region,
        city: city || null,
        farm_hectares: hectares

      });


    if (profileError) {

      console.error("Profile error:", profileError);

      await supabaseClient.auth.signOut();

      alert(message("profileError", profileError.message));

      return;

    }


    // UPLOAD NATIONAL ID TO PRIVATE SUPABASE STORAGE
    if (nationalIdFile) {

      const extension = nationalIdFile.name.split(".").pop().toLowerCase();

      const filePath = `${user.id}/national-id.${extension}`;

      const { error: uploadError } = await supabaseClient
        .storage
        .from("farmer-documents")
        .upload(filePath, nationalIdFile, {

          contentType: nationalIdFile.type,
          upsert: false

        });


      if (uploadError) {

        console.error("Upload error:", uploadError);

        alert(message("uploadError", uploadError.message));

        return;

      }


      // SAVE FILE PATH IN FARMER PROFILE
      const { error: updateError } = await supabaseClient
        .from("farmer_profiles")
        .update({
          national_id_path: filePath
        })
        .eq("id", user.id);


      if (updateError) {

        console.error("File path update error:", updateError);

        alert(message("uploadError", updateError.message));

        return;

      }

    }


    // REGISTRATION SUCCESS
    alert(message("accountCreated"));

    await supabaseClient.auth.signOut();

    showAuthSection("login");

    document.getElementById("loginEmail").value = email;

    document.getElementById("loginPassword").value = "";

    farmerForm.reset();

  } catch (error) {

    console.error("Registration error:", error);

    alert(message("registrationError", error.message));

  } finally {

    submitButton.disabled = false;

    submitButton.textContent = originalButtonText;

  }

});


// =============================================
// 11. FARMER LOGIN WITH SUPABASE
// =============================================

loginForm.addEventListener("submit", async event => {

  event.preventDefault();
  if (!supabaseClient) {
  alert("Please configure Supabase before creating an account or logging in.");
  return;
}

  const email = document.getElementById("loginEmail").value.trim();

  const password = document.getElementById("loginPassword").value;


  if (!email || !password) {

    alert(message("required"));

    return;

  }


  const submitButton = loginForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;

  const originalButtonText = submitButton.textContent;


  try {

    const { data, error } = await supabaseClient.auth.signInWithPassword({

      email: email,
      password: password

    });


    if (error) {

      if (error.message.toLowerCase().includes("invalid login credentials")) {
        alert(message("invalidLogin"));
      } else {
        alert(message("loginError", error.message));
      }

      return;

    }


    if (data.user) {

      // User is authenticated.
      // Supabase maintains the login session securely.
      window.location.href = "farmer-dashboard.html";

    }

  } catch (error) {

    console.error("Login error:", error);

    alert(message("unexpectedError"));

  } finally {

    submitButton.disabled = false;

    submitButton.textContent = originalButtonText;

  }

});


// =============================================
// 12. LOGOUT
// =============================================

logoutBtn.addEventListener("click", async () => {

  const { error } = await supabaseClient.auth.signOut();

  if (error) {

    console.error("Logout error:", error);

    alert(message("unexpectedError"));

    return;

  }

  loginForm.reset();

  farmerForm.reset();

  showAuthSection("register");

  alert(message("logoutSuccess"));

});


// =============================================
// 13. INITIALIZATION
// =============================================

// Default language
translatePage("en");

// Start on landing page
showPage("page-landing");

