(() => {
"use strict";

/* ============================================================
   CONFIGURATION — replace placeholders with your own credentials.
   Never put a Supabase service_role key or private AI key in browser JS.
   AI/market/weather requests should go through your secure backend.
============================================================ */
const CONFIG = {
  SUPABASE_URL: "https://iqxfusbouchrapfxonxe.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv",

  // Your server endpoints (do not put a private AI provider key here).
  OPENWEATHER_ENDPOINT: "https://api.openweathermap.org/data/2.5/weather",
  OPENWEATHER_API_KEY: "3071bbd0200229216ad426baf5f7b73b",
  MARKET_API_ENDPOINT: "",       // Example: https://your-domain/api/ethiopia-market-prices
  AI_INSIGHT_ENDPOINT: "",       // Secure backend endpoint for personalized farm insights
  FARM_HEALTH_ENDPOINT: "",      // Secure backend endpoint for local/regional/global alerts
  AI_ASSISTANT_PAGE: "ai-assistant.html",
  FARM_ANALYSIS_PAGE: "farm-analysis.html"
};

/* Data contracts currently used by this dashboard:
   localStorage keys: agrinova_crops, agrinova_tasks, agrinova_records,
   agrinova_finance. The pages that create these records should use these
   keys or be adapted to this dashboard's existing data helpers.
*/
const $ = (id) => document.getElementById(id);
const safeJson = (value, fallback) => { try { return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const readArray = (key) => {
  const value = safeJson(localStorage.getItem(key), []);
  return Array.isArray(value) ? value : [];
};
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[ch]));
const firstDefined = (...values) => values.find(v => v !== undefined && v !== null && v !== "");
const normalize = value => String(value || "").trim().toLowerCase();

const I18N = {
  en: {
    tagline:"Growing Smarter. Farming Better.",farmerDashboard:"Farmer Dashboard",dashboardHome:"Dashboard Home",myFarm:"My Farm",myCrops:"My Crops",dailyFarm:"Daily Farm",farmTasks:"Farm Tasks & Calendar",farmRecords:"Farm Records",farmCalculator:"Farm Calculator",farmFinance:"Farm Finance",documents:"Documents",aiAssistant:"AI Agricultural Assistant",farmAnalysis:"Farm Analysis & ID",community:"Farmer Community",marketplace:"Marketplace",resources:"AgriNova Resources",articles:"Agriculture Articles",cropInformation:"Crop Information",cropMap:"Ethiopian Crop Map",weather:"Weather",pestLibrary:"Pest & Disease Library",fertilizer:"Fertilizer Information",agricultureNews:"Agriculture News",
    searchPlaceholder:"Search anything in AgriNova...",uploadPhoto:"Upload photo",notifications:"Notifications",markRead:"Mark all read",noNotifications:"You have no new notifications.",localWeather:"Local weather",weatherAwaiting:"Weather data will appear here.",humidity:"Humidity",wind:"Wind",feelsLike:"Feels like",quickActions:"Quick Actions",addCrop:"Add New Crop",logActivity:"Log Daily Activity",marketPrices:"Market Prices",askAI:"AI Farm Assistant",totalArea:"Total Farm Area",activeCrops:"Active Crops",pendingTasks:"Pending Tasks",daysToHarvest:"Days to Nearest Harvest",activeTasks:"Active Tasks",recentRecords:"Recent Farm Records",noTasks:"No pending tasks.",noRecords:"No farm activities recorded yet.",marketPlaceholder:"Connect your market API to display verified prices.",aiInsight:"AI Agricultural Insight",viewAnalysis:"View analysis",aiPlaceholder:"Your personalized farm recommendation will appear here when the AI service is connected.",financeSummary:"Finance Summary",financePlaceholder:"No financial records available yet.",farmHealth:"Farm Health",healthPlaceholder:"Connect the farm-health service for verified regional and farm alerts.",resourceTitle:"Explore AgriNova Resources",aiMenuTitle:"How can I help your farm?",scanPests:"Scan for pests and diseases",askQuestions:"Ask any questions",analyzeFarm:"Analyze my farm",goodMorning:"Good morning",goodAfternoon:"Good afternoon",goodEvening:"Good evening",farmer:"Farmer",noName:"Farmer",region:"Region",city:"City",phone:"Phone",farmArea:"Farm area",uploadError:"Please select an image file.",taskDone:"Task marked as completed.",taskDismissed:"Task hidden from the dashboard. Its record is retained.",complete:"Mark task complete",dismiss:"Hide task",due:"Due",noHarvestDate:"No harvest date",days:"days",day:"day",revenue:"Income",expenses:"Expenses",profit:"Profit",loss:"Loss",otherFinance:"Other",notConfigured:"Not connected yet",weatherUnavailable:"Weather information is unavailable.",updated:"Updated",viewDetails:"Open detailed analysis",taskNotification:"Task due",emptyRecords:"No farm records yet.",marketUnavailable:"Market data is not connected. No prices are being fabricated.",financeZero:"No financial values recorded yet.",profileMissing:"Farmer profile could not be loaded."
  },
  am: {
    tagline:"በብልህነት እና በተሻለ እርሻ ማደግ።",farmerDashboard:"የገበሬ ዳሽቦርድ",dashboardHome:"ዋና ገጽ",myFarm:"እርሻዬ",myCrops:"ሰብሎቼ",dailyFarm:"ዕለታዊ እርሻ",farmTasks:"የእርሻ ተግባራት እና ቀን መቁጠሪያ",farmRecords:"የእርሻ መዝገቦች",farmCalculator:"የእርሻ ማስያ",farmFinance:"የእርሻ ፋይናንስ",documents:"ሰነዶች",aiAssistant:"የእርሻ ሰው ሰራሽ አስተዋይ",farmAnalysis:"የእርሻ ትንተና እና መለያ",community:"የገበሬዎች ማህበረሰብ",marketplace:"ገበያ",resources:"የአግሪኖቫ ምንጮች",articles:"የግብርና ጽሑፎች",cropInformation:"የሰብል መረጃ",cropMap:"የኢትዮጵያ ሰብል ካርታ",weather:"የአየር ሁኔታ",pestLibrary:"ተባዮች እና በሽታዎች",fertilizer:"የማዳበሪያ መረጃ",agricultureNews:"የግብርና ዜና",
    searchPlaceholder:"በአግሪኖቫ ውስጥ ይፈልጉ...",uploadPhoto:"ፎቶ ይጫኑ",notifications:"ማሳወቂያዎች",markRead:"ሁሉንም እንደተነበበ ምልክት ያድርጉ",noNotifications:"አዲስ ማሳወቂያ የለም።",localWeather:"የአካባቢ የአየር ሁኔታ",weatherAwaiting:"የአየር ሁኔታ መረጃ እዚህ ይታያል።",humidity:"እርጥበት",wind:"ነፋስ",feelsLike:"የሚሰማው",quickActions:"ፈጣን እርምጃዎች",addCrop:"አዲስ ሰብል ጨምር",logActivity:"ዕለታዊ እንቅስቃሴ መዝግብ",marketPrices:"የገበያ ዋጋዎች",askAI:"የእርሻ AI ረዳት",totalArea:"ጠቅላላ የእርሻ ስፋት",activeCrops:"ንቁ ሰብሎች",pendingTasks:"ያልተጠናቀቁ ተግባራት",daysToHarvest:"እስከ ቅርብ ምርት ቀናት",activeTasks:"ንቁ ተግባራት",recentRecords:"የቅርብ ጊዜ የእርሻ መዝገቦች",noTasks:"የሚጠባበቅ ተግባር የለም።",noRecords:"የተመዘገበ የእርሻ እንቅስቃሴ የለም።",marketPlaceholder:"የተረጋገጡ ዋጋዎችን ለማሳየት የገበያ API ያገናኙ።",aiInsight:"የAI የግብርና ምክር",viewAnalysis:"ትንተናውን ይመልከቱ",aiPlaceholder:"የAI አገልግሎቱ ሲገናኝ የግል የእርሻ ምክርዎ እዚህ ይታያል።",financeSummary:"የፋይናንስ ማጠቃለያ",financePlaceholder:"እስካሁን የፋይናንስ መዝገብ የለም።",farmHealth:"የእርሻ ጤና",healthPlaceholder:"የክልል እና የእርሻ ማስጠንቀቂያዎችን ለማግኘት የጤና አገልግሎቱን ያገናኙ።",resourceTitle:"የአግሪኖቫ ምንጮችን ይመልከቱ",aiMenuTitle:"ለእርሻዎ እንዴት ልርዳ?",scanPests:"ተባዮችን እና በሽታዎችን ይመርምሩ",askQuestions:"ማንኛውንም ጥያቄ ይጠይቁ",analyzeFarm:"እርሻዬን ተንትን",goodMorning:"እንደምን አደሩ",goodAfternoon:"እንደምን ዋሉ",goodEvening:"እንደምን አመሹ",farmer:"ገበሬ",noName:"ገበሬ",region:"ክልል",city:"ከተማ",phone:"ስልክ",farmArea:"የእርሻ ስፋት",uploadError:"እባክዎ የምስል ፋይል ይምረጡ።",taskDone:"ተግባሩ ተጠናቋል ተብሎ ተመዝግቧል።",taskDismissed:"ተግባሩ ከዳሽቦርዱ ተደብቋል፤ ታሪኩ ተጠብቋል።",complete:"ተግባሩን አጠናቅቅ",dismiss:"ተግባሩን ደብቅ",due:"የመጨረሻ ቀን",noHarvestDate:"የምርት ቀን የለም",days:"ቀናት",day:"ቀን",revenue:"ገቢ",expenses:"ወጪ",profit:"ትርፍ",loss:"ኪሳራ",otherFinance:"ሌላ",notConfigured:"ገና አልተገናኘም",weatherUnavailable:"የአየር ሁኔታ መረጃ አልተገኘም።",updated:"ተዘምኗል",viewDetails:"ዝርዝር ትንተና ክፈት",taskNotification:"የሚያበቃ ተግባር",emptyRecords:"ገና የእርሻ መዝገብ የለም።",marketUnavailable:"የገበያ መረጃ አልተገናኘም፤ ዋጋ አልተፈጠረም።",financeZero:"የፋይናንስ መረጃ አልተመዘገበም።",profileMissing:"የገበሬው መገለጫ ማግኘት አልተቻለም።"
  },
  ti: {
    tagline:"ብልሕ ኣገባብ ምሕራስ።",farmerDashboard:"ዳሽቦርድ ሓረስታይ",dashboardHome:"ቀንዲ ገጽ",myFarm:"ሕርሻይ",myCrops:"ዘራእተይ",dailyFarm:"መዓልታዊ ሕርሻ",farmTasks:"ዕማማት ሕርሻን ካላንደርን",farmRecords:"መዝገባት ሕርሻ",farmCalculator:"መሕለሊ ሕርሻ",farmFinance:"ፋይናንስ ሕርሻ",documents:"ሰነዳት",aiAssistant:"AI ሓጋዚ ሕርሻ",farmAnalysis:"ትንተና ሕርሻ",community:"ማሕበረሰብ ሓረስቶት",marketplace:"ዕዳጋ",resources:"ምንጭታት AgriNova",articles:"ጽሑፋት ሕርሻ",cropInformation:"ሓበሬታ ዘራእቲ",cropMap:"ካርታ ዘራእቲ ኢትዮጵያ",weather:"ኩነታት ኣየር",pestLibrary:"ባልዕን ሕማማትን",fertilizer:"ሓበሬታ ድኹዒ",agricultureNews:"ዜና ሕርሻ",
    searchPlaceholder:"ኣብ AgriNova ድለዩ...",uploadPhoto:"ስእሊ ጽዓን",notifications:"መልእኽታት",markRead:"ኩሉ ከም ዝተነበበ ምልክት ግበር",noNotifications:"ሓድሽ መልእኽቲ የለን።",localWeather:"ናይ ከባቢ ኩነታት ኣየር",weatherAwaiting:"ሓበሬታ ኣየር ኣብዚ ክርአ እዩ።",humidity:"ርጥበት",wind:"ንፋስ",feelsLike:"ከም ዝስምዖ",quickActions:"ቅልጡፍ ስጉምትታት",addCrop:"ሓድሽ ዘርኢ ወስኽ",logActivity:"ንጥፈት መዝግብ",marketPrices:"ዋጋ ዕዳጋ",askAI:"AI ሓጋዚ ሕርሻ",totalArea:"ጠቕላላ ስፍሓት ሕርሻ",activeCrops:"ንጡፋት ዘራእቲ",pendingTasks:"ዘይተዛዘሙ ዕማማት",daysToHarvest:"ክሳብ ቀረባ ምህርቲ መዓልታት",activeTasks:"ንጡፋት ዕማማት",recentRecords:"ናይ ቀረባ መዝገባት",noTasks:"ዝጽበ ዕማም የለን።",noRecords:"ዝተመዝገበ ንጥፈት የለን።",marketPlaceholder:"ዝተረጋገጸ ዋጋ ንምርኣይ API ዕዳጋ ኣራኽብ።",aiInsight:"AI ምኽሪ ሕርሻ",viewAnalysis:"ትንተና ርአ",aiPlaceholder:"AI ምስ ተራኸበ ናይ ሕርሻኻ ምኽሪ ኣብዚ ክርአ እዩ።",financeSummary:"ጽማቕ ፋይናንስ",financePlaceholder:"ገና መዝገብ ፋይናንስ የለን።",farmHealth:"ጥዕና ሕርሻ",healthPlaceholder:"ንሓበሬታ ጥዕና ከባቢ ኣገልግሎት ኣራኽብ።",resourceTitle:"ምንጭታት AgriNova ርአ",aiMenuTitle:"ንሕርሻኻ ብኸመይ ክሕግዘካ?",scanPests:"ባልዕን ሕማማትን መርምር",askQuestions:"ዝኾነ ሕቶ ሕተት",analyzeFarm:"ሕርሻይ ተንትን",goodMorning:"ከመይ ሓዲርካ",goodAfternoon:"ከመይ ውዒልካ",goodEvening:"ከመይ ኣምሲኻ",farmer:"ሓረስታይ",noName:"ሓረስታይ",region:"ክልል",city:"ከተማ",phone:"ተሌፎን",farmArea:"ስፍሓት ሕርሻ",uploadError:"በጃኻ ፋይል ስእሊ ምረጽ።",taskDone:"ዕማም ተዛዚሙ ተመዝጊቡ።",taskDismissed:"ዕማም ካብ ዳሽቦርድ ተሓቢኡ፤ ታሪኹ ተዓቂቡ።",complete:"ዕማም ዛዝም",dismiss:"ዕማም ሕባእ",due:"መወዳእታ ግዜ",noHarvestDate:"ዕለት ምህርቲ የለን",days:"መዓልታት",day:"መዓልቲ",revenue:"ኣታዊ",expenses:"ወጻኢ",profit:"ትርፊ",loss:"ክሳራ",otherFinance:"ካልእ",notConfigured:"ገና ኣይተራኸበን",weatherUnavailable:"ሓበሬታ ኣየር ኣይተረኽበን።",updated:"ተሓዲሱ",viewDetails:"ዝርዝር ትንተና ክፈት",taskNotification:"ዕማም ይውዳእ",emptyRecords:"ገና መዝገብ ሕርሻ የለን።",marketUnavailable:"ሓበሬታ ዕዳጋ ኣይተራኸበን።",financeZero:"ዋጋ ፋይናንስ ኣይተመዝገበን።",profileMissing:"መግለጺ ሓረስታይ ኣይተረኽበን።"
  },
  om: {
    tagline:"Ogeessummaan guddachuu. Qonna fooyya'aa.",farmerDashboard:"Daashboordii Qonnaan Bultootaa",dashboardHome:"Fuula Daashboordii",myFarm:"Qonna Koo",myCrops:"Midhaan Koo",dailyFarm:"Qonna Guyyaa",farmTasks:"Hojii Qonnaa fi Kaalaandarii",farmRecords:"Galmee Qonnaa",farmCalculator:"Herrega Qonnaa",farmFinance:"Maallaqa Qonnaa",documents:"Sanadoota",aiAssistant:"Gargaaraa AI Qonnaa",farmAnalysis:"Xiinxala Qonnaa",community:"Hawaasa Qonnaan Bultootaa",marketplace:"Gabaa",resources:"Madda AgriNova",articles:"Barreeffamoota Qonnaa",cropInformation:"Odeeffannoo Midhaanii",cropMap:"Kaartaa Midhaan Itoophiyaa",weather:"Haala Qilleensaa",pestLibrary:"Ilbiisotaa fi Dhukkuboota",fertilizer:"Odeeffannoo Xaa'oo",agricultureNews:"Oduu Qonnaa",
    searchPlaceholder:"AgriNova keessatti barbaadi...",uploadPhoto:"Suuraa olkaa'i",notifications:"Beeksisa",markRead:"Hunda dubbifame godhi",noNotifications:"Beeksisni haaraan hin jiru.",localWeather:"Haala qilleensaa naannoo",weatherAwaiting:"Odeeffannoon qilleensaa asitti mul'ata.",humidity:"Jiidhina",wind:"Bubbee",feelsLike:"Akka itti dhaga'amu",quickActions:"Tarkaanfii Ariifachiisaa",addCrop:"Midhaan Haaraa Dabali",logActivity:"Hojii Guyyaa Galmeessi",marketPrices:"Gatii Gabaa",askAI:"Gargaaraa AI Qonnaa",totalArea:"Bal'ina Qonnaa Waliigalaa",activeCrops:"Midhaan Jiru",pendingTasks:"Hojiiwwan Hin Xumuramne",daysToHarvest:"Guyyoota Hanga Haamaa Dhiyaatti",activeTasks:"Hojiiwwan Jiran",recentRecords:"Galmee Qonnaa Dhihoo",noTasks:"Hojiin eegaa jiru hin jiru.",noRecords:"Hojii qonnaa galmaa'e hin jiru.",marketPlaceholder:"Gatii mirkanaa'e agarsiisuuf API gabaa walqabsiisi.",aiInsight:"Gorsa Qonnaa AI",viewAnalysis:"Xiinxala ilaali",aiPlaceholder:"Tajaajilli AI yeroo walqabatu gorsi qonnaa dhuunfaa asitti mul'ata.",financeSummary:"Cuunfaa Maallaqaa",financePlaceholder:"Galmeen maallaqaa ammaaf hin jiru.",farmHealth:"Fayyaa Qonnaa",healthPlaceholder:"Odeeffannoo naannoo fi akeekkachiisa argachuuf tajaajila fayyaa walqabsiisi.",resourceTitle:"Madda AgriNova Ilaali",aiMenuTitle:"Qonna kee akkamittan gargaaruu?",scanPests:"Ilbiisotaa fi dhukkuboota sakatta'i",askQuestions:"Gaaffii kamiyyuu gaafadhu",analyzeFarm:"Qonna koo xiinxali",goodMorning:"Akkam bulte",goodAfternoon:"Akkam oolte",goodEvening:"Akkam ooltan",farmer:"Qonnaan bulaa",noName:"Qonnaan bulaa",region:"Naannoo",city:"Magaalaa",phone:"Bilbila",farmArea:"Bal'ina qonnaa",uploadError:"Maaloo faayila suuraa filadhu.",taskDone:"Hojiin xumurameera jedhamee galmaa'e.",taskDismissed:"Hojiin daashboordii irraa dhokate; seenaa isaa ni tura.",complete:"Hojii xumuri",dismiss:"Hojii dhoksi",due:"Guyyaa xumuraa",noHarvestDate:"Guyyaan haamaa hin jiru",days:"guyyaa",day:"guyyaa",revenue:"Galii",expenses:"Baasi",profit:"Bu'aa",loss:"Kasaaraa",otherFinance:"Kan biraa",notConfigured:"Ammaaf hin walqabanne",weatherUnavailable:"Odeeffannoon qilleensaa hin argamne.",updated:" haaromfame",viewDetails:"Xiinxala bal'aa bani",taskNotification:"Hojiin yeroo isaa ga'e",emptyRecords:"Galmeen qonnaa hin jiru.",marketUnavailable:"Odeeffannoon gabaa hin walqabne; gatiin hin uumamne.",financeZero:"Gatiin maallaqaa hin galmoofne.",profileMissing:"Profaayiliin qonnaan bulaa hin argamne."
  },
  so: {
    tagline:"Si caqli leh u kobci. Si ka wanaagsan u beero.",farmerDashboard:"Dashboard-ka Beeraleyda",dashboardHome:"Bogga Dashboard-ka",myFarm:"Beertayda",myCrops:"Dalagyadayda",dailyFarm:"Hawlaha Maalinlaha ah",farmTasks:"Hawlaha Beeraha iyo Jadwalka",farmRecords:"Diiwaanka Beeraha",farmCalculator:"Xisaabiyaha Beeraha",farmFinance:"Maaliyadda Beeraha",documents:"Dukumentiyada",aiAssistant:"Kaaliyaha AI ee Beeraha",farmAnalysis:"Falanqaynta Beeraha",community:"Bulshada Beeraleyda",marketplace:"Suuqa",resources:"Khayraadka AgriNova",articles:"Maqaallada Beeraha",cropInformation:"Macluumaadka Dalagyada",cropMap:"Khariidadda Dalagyada Itoobiya",weather:"Cimilada",pestLibrary:"Cayayaanka iyo Cudurrada",fertilizer:"Macluumaadka Bacriminta",agricultureNews:"Wararka Beeraha",
    searchPlaceholder:"Ka raadi AgriNova...",uploadPhoto:"Soo geli sawir",notifications:"Ogeysiisyada",markRead:"Dhammaan akhri",noNotifications:"Ma jiraan ogeysiisyo cusub.",localWeather:"Cimilada deegaanka",weatherAwaiting:"Macluumaadka cimiladu halkan ayuu ka muuqan doonaa.",humidity:"Qoyaanka",wind:"Dabayl",feelsLike:"Sida ay u dareemayso",quickActions:"Tallaabooyin Degdeg ah",addCrop:"Ku dar Dalag Cusub",logActivity:"Diiwaangeli Hawl Maalinle ah",marketPrices:"Qiimaha Suuqa",askAI:"Kaaliyaha AI ee Beeraha",totalArea:"Wadarta Baaxadda Beerta",activeCrops:"Dalagyada Firfircoon",pendingTasks:"Hawlaha Sugaya",daysToHarvest:"Maalmaha ilaa Goosashada Xigta",activeTasks:"Hawlaha Firfircoon",recentRecords:"Diiwaanada Beeraha ee Ugu Dambeeyay",noTasks:"Ma jiraan hawlo sugaya.",noRecords:"Weli lama diiwaangelin hawlo beer.",marketPlaceholder:"Ku xidh API-ga suuqa si loo muujiyo qiimayaal la xaqiijiyay.",aiInsight:"Talo Beeraha AI",viewAnalysis:"Eeg falanqaynta",aiPlaceholder:"Talada beertaada waxay halkan ka muuqan doontaa marka adeegga AI la xiro.",financeSummary:"Soo-koobidda Maaliyadda",financePlaceholder:"Weli ma jiraan diiwaanno maaliyadeed.",farmHealth:"Caafimaadka Beerta",healthPlaceholder:"Ku xidh adeegga caafimaadka beeraha si aad u hesho digniino la xaqiijiyay.",resourceTitle:"Baadh Khayraadka AgriNova",aiMenuTitle:"Sideen beertaada uga caawin karaa?",scanPests:"Baadh cayayaanka iyo cudurrada",askQuestions:"Weydii su'aal kasta",analyzeFarm:"Falanqee beertayda",goodMorning:"Subax wanaagsan",goodAfternoon:"Galab wanaagsan",goodEvening:"Fiid wanaagsan",farmer:"Beeraley",noName:"Beeraley",region:"Gobol",city:"Magaalo",phone:"Telefoon",farmArea:"Baaxadda beerta",uploadError:"Fadlan dooro fayl sawir ah.",taskDone:"Hawsha waxaa loo calaamadeeyay inay dhammaatay.",taskDismissed:"Hawsha dashboard-ka waa laga qariyay; diiwaankeeda waa la hayaa.",complete:"Dhammaystir hawsha",dismiss:"Qari hawsha",due:"Waqtiga kama dambaysta ah",noHarvestDate:"Taariikh goosasho ma jirto",days:"maalmood",day:"maalin",revenue:"Dakhli",expenses:"Kharash",profit:"Faa'iido",loss:"Khasaare",otherFinance:"Kale",notConfigured:"Weli lama xirin",weatherUnavailable:"Macluumaadka cimilada lama heli karo.",updated:"La cusboonaysiiyay",viewDetails:"Fur falanqayn faahfaahsan",taskNotification:"Hawl waqtigeedii la gaaray",emptyRecords:"Weli ma jiraan diiwaanno beer.",marketUnavailable:"Xogta suuqa lama xirin; qiimayaal lama samayn.",financeZero:"Qiimayaal maaliyadeed lama diiwaangelin.",profileMissing:"Lama helin xogta beeraleyga."
  }
};

let currentLanguage = localStorage.getItem("agrinova_language") || "en";
if (!I18N[currentLanguage]) currentLanguage = "en";
let supabase = null;
let farmerProfile = null;
let notifications = [];
let knownTaskSignature = "";
let notificationReadAt = Number(localStorage.getItem("agrinova_notifications_read_at") || 0);

const t = key => (I18N[currentLanguage] && I18N[currentLanguage][key]) || I18N.en[key] || key;
function translateStaticContent() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (el.dataset.keepIcon === "true") return;
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  updateGreeting();
  updateDate();
  renderTasks();
  renderRecords();
  renderMarketPrices();
  renderFinance();
  renderAIInsight();
  renderFarmHealth();
  renderNotifications();
}
function setLanguage(language) {
  if (!I18N[language]) return;
  currentLanguage = language;
  localStorage.setItem("agrinova_language", language);
  $("languageSelect").value = language;
  translateStaticContent();
}

function getLocalFarmer() {
  for (const key of ["agrinova_farmer","farmerData","farmer","user"]) {
    const parsed = safeJson(localStorage.getItem(key), null);
    if (parsed) return parsed;
  }
  return null;
}
function getCrops(){return readArray("agrinova_crops")}
function getTasks(){return readArray("agrinova_tasks")}
function getRecords(){return readArray("agrinova_records")}
function getFinance(){return safeJson(localStorage.getItem("agrinova_finance"),null)}
function farmerName() {
  const p = farmerProfile || getLocalFarmer() || {};
  const full = firstDefined(p.full_name,p.fullName,p.name,p.first_name,p.firstName,p.firstname,"");
  return String(full).trim().split(/\s+/)[0] || t("noName");
}
function getFullName() {
  const p = farmerProfile || getLocalFarmer() || {};
  return firstDefined(p.full_name,p.fullName,p.name,[p.first_name,p.middle_name,p.last_name].filter(Boolean).join(" "),farmerName());
}
function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("goodMorning") : hour < 17 ? t("goodAfternoon") : t("goodEvening");
  if ($("greetingText")) $("greetingText").textContent = `${greeting}, ${farmerName()}`;
  if ($("navName")) $("navName").textContent = farmerName();
}
function updateDate() {
  const locale = ({en:"en-ET",am:"am-ET",ti:"ti-ET",om:"om-ET",so:"so-ET"})[currentLanguage] || "en-ET";
  if ($("currentDate")) $("currentDate").textContent = new Intl.DateTimeFormat(locale,{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date());
}
function getRegion(){const p=farmerProfile||getLocalFarmer()||{};return firstDefined(p.region,p.state,"—")}
function getCity(){const p=farmerProfile||getLocalFarmer()||{};return firstDefined(p.city,p.location,"—")}
function hideCityForRegion(region){return ["addis ababa","greater addis ababa","harari"].includes(normalize(region))}
function getFarmHectares(){const p=farmerProfile||getLocalFarmer()||{};return firstDefined(p.farm_hectares,p.farmland,p.farmArea,p.farm_size,p.landSize,null)}
function updateProfile() {
  const p = farmerProfile || getLocalFarmer() || {};
  const full = getFullName();
  const region = getRegion();
  const city = getCity();
  $("pdName").textContent = full || t("noName");
  $("pdEmail").textContent = firstDefined(p.email,"—");
  $("pdRegion").textContent = `${t("region")}: ${region}`;
  $("pdCity").textContent = `${t("city")}: ${city}`;
  $("cityRow").hidden = hideCityForRegion(region) || city === "—";
  $("pdPhone").textContent = `${t("phone")}: ${firstDefined(p.phone,p.phone_number,p.phoneNumber,"—")}`;
  const area = getFarmHectares();
  $("pdFarmland").textContent = `${t("farmArea")}: ${area !== null ? `${area} ha` : "—"}`;
  $("farmerLocation").textContent = hideCityForRegion(region) ? `${region}, Ethiopia` : `${city}, ${region}, Ethiopia`;
  updateGreeting();
}
async function loadSupabaseProfile() {
  const local = getLocalFarmer();
  if (!window.supabase?.createClient || !CONFIG.SUPABASE_ANON_KEY || CONFIG.SUPABASE_ANON_KEY.includes("PASTE_")) {
    farmerProfile = local;
    updateProfile();
    return;
  }
  try {
    supabase = window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_ANON_KEY);
    const {data:{user},error:authError} = await supabase.auth.getUser();
    if (authError || !user) { farmerProfile=local; updateProfile(); return; }
    const {data,error} = await supabase.from("farmer_profiles").select("id,full_name,email,phone,region,city,farm_hectares").eq("id",user.id).maybeSingle();
    if (error) throw error;
    farmerProfile = data || local;
    updateProfile();
    // Profile updates can be reflected without reloading the dashboard.
    supabase.channel("farmer-profile-"+user.id)
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"farmer_profiles",filter:`id=eq.${user.id}`},payload=>{
        farmerProfile = {...(farmerProfile||{}),...(payload.new||{})}; updateProfile(); updateFarmOverview();
      }).subscribe();
  } catch (error) {
    console.error("Supabase profile load failed:",error);
    farmerProfile=local; updateProfile();
  }
}

const WEATHER_BACKGROUNDS = {
  clear:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop",
  clouds:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=600&fit=crop",
  rain:"https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&h=600&fit=crop",
  drizzle:"https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&h=600&fit=crop",
  thunderstorm:"https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1200&h=600&fit=crop",
  snow:"https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&h=600&fit=crop",
  mist:"https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1200&h=600&fit=crop"
};
function weatherConditionText(id) {
  if(id===800)return "clear";
  if(id===801||id===802)return "clouds";
  if(id===803||id===804)return "clouds";
  if(id>=200&&id<300)return "thunderstorm";
  if(id>=300&&id<400)return "drizzle";
  if(id>=500&&id<600)return "rain";
  if(id>=600&&id<700)return "snow";
  if(id>=700&&id<800)return "mist";
  return "clouds";
}
function weatherLabel(condition) {
  const labels={clear:{en:"Clear",am:"ጥርት ያለ",ti:"ጽሩይ",om:"Ifa qulqulluu",so:"Cir cad"},clouds:{en:"Cloudy",am:"ደመናማ",ti:"ደበና",om:"Duumessa",so:"Daruur"},rain:{en:"Rain",am:"ዝናብ",ti:"ዝናብ",om:"Rooba",so:"Roob"},drizzle:{en:"Drizzle",am:"ቀላል ዝናብ",ti:"ቀሊል ዝናብ",om:"Rooba xiqqaa",so:"Roob yar"},thunderstorm:{en:"Thunderstorm",am:"ነጎድጓድ",ti:"ነጎድጓድ",om:"Bakakkaa",so:"Onkod"},snow:{en:"Snow",am:"በረዶ",ti:"በረዶ",om:"Cabbi",so:"Baraf"},mist:{en:"Mist / fog",am:"ጭጋግ",ti:"ጭጋግ",om:"Hurrii",so:"Ceeryaamo"}};
  return labels[condition]?.[currentLanguage] || labels[condition]?.en || condition;
}
function weatherUnavailable() {
  $("weatherTemp").textContent="—";$("weatherCondition").textContent=t("weatherUnavailable");
}
async function fetchWeather(lat,lon) {
  if(!CONFIG.OPENWEATHER_API_KEY || CONFIG.OPENWEATHER_API_KEY.includes("PASTE_")) { weatherUnavailable(); return; }
  try {
    const url=new URL(CONFIG.OPENWEATHER_ENDPOINT);
    url.search=new URLSearchParams({lat,lon,appid:CONFIG.OPENWEATHER_API_KEY,units:"metric"}).toString();
    const response=await fetch(url);
    if(!response.ok) throw new Error(`OpenWeather returned ${response.status}`);
    const data=await response.json();
    const condition=weatherConditionText(data.weather?.[0]?.id);
    $("weatherTemp").textContent=`${Math.round(data.main.temp)}°C`;
    $("weatherCondition").textContent=weatherLabel(condition);
    $("weatherHumidity").textContent=`${data.main.humidity}%`;
    $("weatherWind").textContent=`${data.wind.speed} m/s`;
    $("weatherFeelsLike").textContent=`${Math.round(data.main.feels_like)}°C`;
    $("weatherUpdated").textContent=`${t("updated")}: ${new Date().toLocaleTimeString()}`;
    $("weatherCard").style.backgroundImage=`url("${WEATHER_BACKGROUNDS[condition]||WEATHER_BACKGROUNDS.clouds}")`;
  } catch(error) { console.error("OpenWeather error:",error);weatherUnavailable(); }
}
function loadWeather() {
  const useCoords=pos=>fetchWeather(pos.coords.latitude,pos.coords.longitude);
  const fallback=async()=>{
    const p=farmerProfile||getLocalFarmer()||{};
    const city=firstDefined(p.city,p.location);
    if(!city)return;
    try{
      const response=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(city+", Ethiopia")}`);
      const places=await response.json();
      if(places[0])await fetchWeather(Number(places[0].lat),Number(places[0].lon));
    }catch(e){console.warn("Location lookup failed",e)}
  };
  if(navigator.geolocation)navigator.geolocation.getCurrentPosition(useCoords,fallback,{timeout:8000,maximumAge:600000});
  else fallback();
}

function isHarvested(crop){return ["harvested","completed","complete","done"].includes(normalize(crop.status||crop.cropStatus))}
function isActiveCrop(crop){return !isHarvested(crop)&&!["inactive","archived","cancelled"].includes(normalize(crop.status||crop.cropStatus))}
function parseHarvestDate(crop) {
  const direct=firstDefined(crop.harvestDate,crop.expectedHarvestDate,crop.expected_harvest_date,crop.harvest_date);
  if(direct){const d=new Date(direct);if(!Number.isNaN(d.getTime()))return d;}
  const remaining=Number(firstDefined(crop.daysToHarvest,crop.days_to_harvest,crop.remainingDays,NaN));
  if(Number.isFinite(remaining)&&remaining>=0){const d=new Date();d.setDate(d.getDate()+remaining);return d;}
  const planted=firstDefined(crop.plantingDate,crop.datePlanted,crop.planted_at,crop.planting_date);
  const duration=Number(firstDefined(crop.growingPeriod,crop.growingDays,crop.maturityDays,crop.daysToMaturity,NaN));
  if(planted&&Number.isFinite(duration)){const d=new Date(planted);if(!Number.isNaN(d.getTime())){d.setDate(d.getDate()+duration);return d;}}
  return null;
}
function updateFarmOverview() {
  const crops=getCrops().filter(isActiveCrop),tasks=getTasks().filter(t=>!isCompleted(t)&&!isDismissed(t));
  const area=getFarmHectares();
  $("totalArea").textContent=area!==null?`${area} ha`:"—";
  $("activeCrops").textContent=crops.length;
  $("pendingTasks").textContent=tasks.length;
  const dates=crops.map(parseHarvestDate).filter(Boolean).map(d=>Math.ceil((d.setHours(0,0,0,0)-new Date().setHours(0,0,0,0))/86400000)).filter(n=>n>=0).sort((a,b)=>a-b);
  $("daysToHarvest").textContent=dates.length?dates[0]:"—";
}
function isCompleted(task){return ["completed","done"].includes(normalize(task.status))}
function isDismissed(task){return task.dashboardDismissed===true||task.dismissedFromDashboard===true||task.dashboard_status==="dismissed"}
function taskId(task,index){return String(firstDefined(task.id,task.taskId,task.uuid,`${task.title||task.name||"task"}-${index}`))}
function saveTasks(tasks){localStorage.setItem("agrinova_tasks",JSON.stringify(tasks))}
function renderTasks() {
  const tasks=getTasks().filter(t=>!isCompleted(t)&&!isDismissed(t));
  if(!tasks.length){$("taskList").innerHTML=`<div class="empty-state">${escapeHTML(t("noTasks"))}</div>`;return}
  const sorted=[...tasks].sort((a,b)=>new Date(firstDefined(a.date,a.dueDate,a.due_date,"9999-12-31"))-new Date(firstDefined(b.date,b.dueDate,b.due_date,"9999-12-31")));
  $("taskList").innerHTML=sorted.slice(0,7).map((task,index)=>{
    const name=escapeHTML(firstDefined(task.title,task.name,t("activeTasks")));
    const date=escapeHTML(firstDefined(task.date,task.dueDate,task.due_date,"—"));
    const id=escapeHTML(taskId(task,index));
    return `<div class="task-item" data-task-id="${id}"><div class="task-main"><span class="task-name">${name}</span><span class="task-date">${escapeHTML(t("due"))}: ${date}</span></div><div class="task-actions"><button class="task-action complete" data-task-action="complete" data-task-id="${id}" title="${escapeHTML(t("complete"))}" aria-label="${escapeHTML(t("complete"))}"><i class="fas fa-check"></i></button><button class="task-action dismiss" data-task-action="dismiss" data-task-id="${id}" title="${escapeHTML(t("dismiss"))}" aria-label="${escapeHTML(t("dismiss"))}"><i class="fas fa-xmark"></i></button></div></div>`;
  }).join("");
}
function addTaskRecord(task,action) {
  const records=getRecords();
  records.unshift({id:`dashboard-${Date.now()}`,activity:action==="complete"?`Completed: ${task.title||task.name||"Task"}`:`Dismissed from dashboard: ${task.title||task.name||"Task"}`,date:new Date().toISOString(),type:"task",source:"dashboard"});
  localStorage.setItem("agrinova_records",JSON.stringify(records));
}
function handleTaskAction(action,id) {
  const tasks=getTasks();const index=tasks.findIndex((task,i)=>taskId(task,i)===id);
  if(index<0)return;
  const task={...tasks[index]};
  if(action==="complete"){task.status="completed";task.completedAt=new Date().toISOString();addTaskRecord(task,"complete");}
  else{task.dashboardDismissed=true;task.dismissedAt=new Date().toISOString();addTaskRecord(task,"dismiss");}
  tasks[index]=task;saveTasks(tasks);refreshDashboardData();
}
function renderRecords() {
  const records=getRecords().slice().sort((a,b)=>new Date(firstDefined(b.date,b.createdAt,b.timestamp,0))-new Date(firstDefined(a.date,a.createdAt,a.timestamp,0)));
  if(!records.length){$("recordList").innerHTML=`<div class="empty-state">${escapeHTML(t("noRecords"))}</div>`;return}
  $("recordList").innerHTML=records.slice(0,7).map(r=>{
    const title=escapeHTML(firstDefined(r.activity,r.title,r.type,"Activity"));
    const date=escapeHTML(firstDefined(r.date,r.createdAt,"—"));
    return `<div class="record-item"><div class="record-main"><span class="record-act">${title}</span><span class="record-date">${date}</span></div></div>`;
  }).join("");
}
function renderFinance() {
  const data=getFinance();
  if(!data){$("financeSummary").innerHTML=`<div class="empty-state">${escapeHTML(t("financePlaceholder"))}</div>`;return}
  const income=Number(firstDefined(data.income,data.revenue,data.totalIncome,0))||0;
  const expenses=Number(firstDefined(data.expenses,data.totalExpenses,0))||0;
  const profit=income-expenses;
  const items=[[t("revenue"),income],[t("expenses"),expenses],[profit>=0?t("profit"):t("loss"),Math.abs(profit)],[t("otherFinance"),Number(firstDefined(data.other,data.otherExpenses,0))||0]];
  $("financeSummary").innerHTML=`<div class="finance-grid">${items.map(([label,value])=>`<div class="finance-item"><div class="finance-value">${value.toLocaleString()} ETB</div><div class="finance-label">${escapeHTML(label)}</div></div>`).join("")}</div>`;
}
async function renderMarketPrices() {
  const el=$("marketList");
  if(!CONFIG.MARKET_API_ENDPOINT){el.innerHTML=`<div class="empty-state">${escapeHTML(t("marketUnavailable"))}</div>`;return}
  try{
    const response=await fetch(CONFIG.MARKET_API_ENDPOINT);
    if(!response.ok)throw new Error("Market API request failed");
    const data=await response.json();
    const rows=Array.isArray(data)?data:(data.prices||[]);
    const wanted=["wheat","barley","teff","sorghum","maize","coffee"];
    const selected=wanted.map(name=>rows.find(row=>normalize(row.crop||row.name)===name)).filter(Boolean);
    el.innerHTML=selected.length?selected.map(row=>{
      const crop=escapeHTML(firstDefined(row.crop,row.name));
      const price=Number(row.price);
      const change=Number(firstDefined(row.changePercent,row.change_percent,0));
      const direction=change>0?"up":change<0?"down":"flat";
      const arrow=change>0?"▲":change<0?"▼":"—";
      return `<div class="market-item"><div><strong>${crop}</strong><div class="item-subtitle">${Number.isFinite(price)?price.toLocaleString()+" ETB": "—"} / ${escapeHTML(firstDefined(row.unit,"unit"))}</div></div><span class="market-change ${direction}">${arrow} ${Math.abs(change)}%</span></div>`;
    }).join(""):`<div class="empty-state">${escapeHTML(t("marketUnavailable"))}</div>`;
  }catch(e){console.error(e);el.innerHTML=`<div class="empty-state">${escapeHTML(t("marketUnavailable"))}</div>`}
}
async function requestJson(endpoint,payload) {
  if(!endpoint)return null;
  const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  if(!response.ok)throw new Error(`API request failed: ${response.status}`);
  return response.json();
}
function collectFarmContext() {
  const p=farmerProfile||getLocalFarmer()||{};
  return {farmer:{region:p.region||null,city:p.city||null,farm_hectares:getFarmHectares()},crops:getCrops(),tasks:getTasks(),records:getRecords(),finance:getFinance(),weather:{condition:$("weatherCondition").textContent,temperature:$("weatherTemp").textContent},language:currentLanguage};
}
async function renderAIInsight() {
  const el=$("aiInsight");
  if(!CONFIG.AI_INSIGHT_ENDPOINT){el.innerHTML=`<div class="ai-summary">${escapeHTML(t("aiPlaceholder"))}</div><div class="ai-meta">${escapeHTML(t("notConfigured"))}</div>`;return}
  el.innerHTML=`<div class="ai-summary">${escapeHTML(t("notConfigured"))}…</div>`;
  try{
    const result=await requestJson(CONFIG.AI_INSIGHT_ENDPOINT,collectFarmContext());
    const summary=firstDefined(result.summary,result.recommendation,result.message,"");
    el.innerHTML=summary?`<div class="ai-summary">${escapeHTML(summary)}</div><div class="ai-meta">${escapeHTML(firstDefined(result.updatedAt,t("updated")))}</div>`:`<div class="empty-state">${escapeHTML(t("aiPlaceholder"))}</div>`;
  }catch(e){console.error("AI insight error:",e);el.innerHTML=`<div class="empty-state">${escapeHTML(t("aiPlaceholder"))}</div>`}
}
async function renderFarmHealth() {
  const el=$("farmHealth");
  if(!CONFIG.FARM_HEALTH_ENDPOINT){el.innerHTML=`<div class="ai-summary">${escapeHTML(t("healthPlaceholder"))}</div><div class="ai-meta">${escapeHTML(t("notConfigured"))}</div>`;return}
  try{
    const result=await requestJson(CONFIG.FARM_HEALTH_ENDPOINT,collectFarmContext());
    const alerts=Array.isArray(result.alerts)?result.alerts:[];
    el.innerHTML=alerts.length?alerts.slice(0,5).map(a=>`<div class="health-alert"><strong>${escapeHTML(firstDefined(a.title,a.region,"Alert"))}</strong><div>${escapeHTML(firstDefined(a.description,a.message,""))}</div></div>`).join(""):`<div class="ai-summary">${escapeHTML(firstDefined(result.summary,t("healthPlaceholder")))}</div>`;
  }catch(e){console.error("Farm health error:",e);el.innerHTML=`<div class="empty-state">${escapeHTML(t("healthPlaceholder"))}</div>`}
}

function buildNotifications() {
  const tasks=getTasks().filter(task=>!isCompleted(task)&&!isDismissed(task));
  return tasks.filter(task=>{
    const due=new Date(firstDefined(task.date,task.dueDate,task.due_date,""));
    if(Number.isNaN(due.getTime()))return false;
    const delta=due.getTime()-Date.now();
    return delta<=7*86400000;
  }).map((task,index)=>({id:taskId(task,index),title:firstDefined(task.title,task.name,t("taskNotification")),date:firstDefined(task.date,task.dueDate,task.due_date,""),timestamp:new Date(firstDefined(task.date,task.dueDate,task.due_date)).getTime()||Date.now()}));
}
function renderNotifications() {
  notifications=buildNotifications();
  const unread=notifications.filter(n=>n.timestamp>notificationReadAt);
  $("notificationBadge").textContent=unread.length;
  $("notificationBadge").hidden=unread.length===0;
  if(!notifications.length){$("notificationList").innerHTML=`<div class="empty-state">${escapeHTML(t("noNotifications"))}</div>`;return}
  $("notificationList").innerHTML=notifications.slice(0,10).map(n=>`<div class="notification-item"><div><strong>${escapeHTML(n.title)}</strong><div class="item-subtitle">${escapeHTML(t("due"))}: ${escapeHTML(n.date)}</div></div></div>`).join("");
}
function markNotificationsRead(){notificationReadAt=Date.now();localStorage.setItem("agrinova_notifications_read_at",String(notificationReadAt));renderNotifications()}

function refreshDashboardData(){updateFarmOverview();renderTasks();renderRecords();renderFinance();renderNotifications();renderAIInsight();renderFarmHealth()}
function setupProfileDropdown(){
  $("profileTrigger").addEventListener("click",e=>{e.stopPropagation();const open=$("profileDropdown").hidden;$("profileDropdown").hidden=!open;$("profileTrigger").setAttribute("aria-expanded",String(open));});
  document.addEventListener("click",e=>{if(!$("profileDropdown").contains(e.target)&&!$("profileTrigger").contains(e.target)){$("profileDropdown").hidden=true;$("profileTrigger").setAttribute("aria-expanded","false")}});
}
function setupNotifications(){
  $("notifButton").addEventListener("click",e=>{e.stopPropagation();const open=$("notificationDropdown").hidden;$("notificationDropdown").hidden=!open;$("notifButton").setAttribute("aria-expanded",String(open));});
  $("notificationDropdown").addEventListener("click",e=>e.stopPropagation());
  $("markNotificationsRead").addEventListener("click",markNotificationsRead);
  document.addEventListener("click",()=>{$("notificationDropdown").hidden=true;$("notifButton").setAttribute("aria-expanded","false")});
}
function setupProfileImage(){
  $("uploadProfileBtn").addEventListener("click",()=>$("profileImageInput").click());
  $("profileImageInput").addEventListener("change",e=>{
    const file=e.target.files?.[0];if(!file)return;
    if(!file.type.startsWith("image/")){alert(t("uploadError"));return}
    if(file.size>3*1024*1024){alert("Please choose an image smaller than 3 MB.");return}
    const reader=new FileReader();
    reader.onload=()=>{localStorage.setItem("agrinova_profileImage",reader.result);applyProfileImage(reader.result)};
    reader.readAsDataURL(file);
  });
  const saved=localStorage.getItem("agrinova_profileImage");if(saved)applyProfileImage(saved);
}
function applyProfileImage(src){
  ["navAvatar","pdAvatar"].forEach(id=>$(id).innerHTML=`<img src="${src}" alt="Profile photo">`);
}
function setupTaskActions(){
  $("taskList").addEventListener("click",e=>{
    const button=e.target.closest("[data-task-action]");if(!button)return;
    handleTaskAction(button.dataset.taskAction,button.dataset.taskId);
  });
}
function setupLanguage(){
  $("languageSelect").value=currentLanguage;
  $("languageSelect").addEventListener("change",e=>setLanguage(e.target.value));
}
function setupAIButtons(){
  $("aiFloatButton").addEventListener("click",()=>$("aiFloatMenu").hidden=!$("aiFloatMenu").hidden);
  $("closeAiMenu").addEventListener("click",()=>$("aiFloatMenu").hidden=true);
  $("aiFloatMenu").addEventListener("click",e=>{
    const button=e.target.closest("[data-ai-mode]");if(!button)return;
    const mode=button.dataset.aiMode;
    const url=new URL(CONFIG.AI_ASSISTANT_PAGE,window.location.href);
    url.searchParams.set("mode",mode);
    if(mode==="scan")url.searchParams.set("capture","true");
    if(mode==="analyze")url.searchParams.set("source","dashboard");
    window.location.href=url.toString();
  });
  const openAnalysis=()=>window.location.href=CONFIG.FARM_ANALYSIS_PAGE+"?source=dashboard";
  $("aiCard").addEventListener("click",openAnalysis);
  $("aiCard").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openAnalysis()}});
}
function setupMobileMenu(){
  $("mobileMenu").addEventListener("click",()=> $("sidebar").classList.toggle("open"));
  document.addEventListener("click",e=>{if(window.innerWidth<=950&&!$("sidebar").contains(e.target)&&!$("mobileMenu").contains(e.target))$("sidebar").classList.remove("open")});
}
function setupSearch(){
  $("globalSearch").addEventListener("keydown",e=>{
    if(e.key!=="Enter")return;
    const query=e.currentTarget.value.trim().toLowerCase();if(!query)return;
    const links=[...document.querySelectorAll(".sidebar-nav a")];
    const match=links.find(a=>a.textContent.toLowerCase().includes(query));
    if(match)window.location.href=match.href;
    else{
      const cards=[...document.querySelectorAll(".card")];
      const card=cards.find(c=>c.textContent.toLowerCase().includes(query));
      if(card)card.scrollIntoView({behavior:"smooth",block:"center"});
    }
  });
}
function setupCrossTabUpdates(){
  window.addEventListener("storage",e=>{
    if(["agrinova_crops","agrinova_tasks","agrinova_records","agrinova_finance","agrinova_farmer","farmerData","farmer","user"].includes(e.key))refreshDashboardData();
  });
  // Local pages often update localStorage in the same tab; periodic refresh catches those updates.
  window.setInterval(()=>{refreshDashboardData()},15000);
  if(supabase){
    supabase.channel("agrinova-dashboard-updates")
      .on("postgres_changes",{event:"*",schema:"public",table:"farmer_profiles"},()=>loadSupabaseProfile())
      .subscribe();
  }
}
async function init(){
  setupLanguage();translateStaticContent();
  updateDate();updateGreeting();
  setupProfileDropdown();setupNotifications();setupProfileImage();setupTaskActions();setupAIButtons();setupMobileMenu();setupSearch();
  await loadSupabaseProfile();
  updateFarmOverview();renderTasks();renderRecords();renderFinance();renderNotifications();
  loadWeather();
  renderMarketPrices();renderAIInsight();renderFarmHealth();
  setupCrossTabUpdates();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();