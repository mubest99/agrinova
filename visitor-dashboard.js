/* AgriNova Visitor Dashboard JavaScript
   Weather: HTML5 Geolocation -> IP location fallback -> OpenWeather API.
   Add your OpenWeather API key below before testing live weather.
*/
(() => {
  "use strict";

  const OPENWEATHER_API_KEY = "3071bbd0200229216ad426baf5f7b73b";
  const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5";

  const translations = {
    en: {
      language:"Language", navigation:"Navigation", weatherInfo:"Weather Information", visitorArticles:"Visitor Articles",
      pestLibrary:"Pest and Diseases Library", fertilizerInfo:"Fertilizer Information", educationContent:"Education Content",
      cropNews:"Crop News", cropMap:"Crop Map", cropInfo:"Crop Information", agricultureNews:"Agricultural News",
      innovation:"Agricultural Innovation", marketplace:"Marketplace", simulation:"Farm Simulation",
      welcomeEyebrow:"AGRICULTURE • KNOWLEDGE • INNOVATION", welcomeTitle:"Welcome, Visitor",
      welcomeText:"Explore agricultural knowledge, local weather, and useful farming resources.",
      localWeather:"LOCAL WEATHER", weatherHeading:"Weather Information", detectingLocation:"Detecting your location…",
      loadingWeather:"Loading weather…", temperature:"Temperature", humidity:"Humidity", windSpeed:"Wind speed",
      rainProbability:"Rain probability", weatherPermission:"Allow location access to see weather for your area. If access is denied, AgriNova will try network-based location.",
      articlesDescription:"Read practical articles, farming guides, and agricultural research.",
      exploreArticles:"Explore Articles", fertilizerDescription:"Learn about fertilizer types, nutrients, and responsible application.",
      exploreFertilizers:"Explore Fertilizers", newsDescription:"Stay informed about agricultural developments and news.",
      exploreNews:"Explore News", cropDescription:"Discover crop varieties, growing conditions, and crop care.",
      exploreCrops:"Explore Crops", pestDescription:"Identify common crop pests and plant diseases and learn prevention methods.",
      explorePests:"Explore Pests", locationUnavailable:"Could not determine your location. Please check your connection and try again.",
      apiKeyMissing:"Add your OpenWeather API key in visitor-dashboard.js to load live weather.",
      weatherFailed:"Weather information could not be loaded. Please try again later.",
      permissionDenied:"Location permission was denied. Trying to find your area using your internet connection…",
      ipFallback:"Using your network location…", locationFound:"Weather for", weatherNow:"Current conditions",
      feelsLike:"Feels like", clear:"Clear", clouds:"Cloudy", rain:"Rain", drizzle:"Drizzle", thunderstorm:"Thunderstorm",
      snow:"Snow", mist:"Mist", smoke:"Smoke", haze:"Haze", dust:"Dust", fog:"Fog", sand:"Sand", ash:"Ash",
      squall:"Squalls", tornado:"Tornado", wind:"Wind", rainUnavailable:"—", locationDefault:"Location unavailable"
    },
    am: {
      language:"ቋንቋ", navigation:"ዳሰሳ", weatherInfo:"የአየር ሁኔታ መረጃ", visitorArticles:"የጎብኚዎች ጽሑፎች",
      pestLibrary:"የተባይና በሽታዎች ቤተ-መጽሐፍት", fertilizerInfo:"የማዳበሪያ መረጃ", educationContent:"የትምህርት ይዘት",
      cropNews:"የሰብል ዜና", cropMap:"የሰብል ካርታ", cropInfo:"የሰብል መረጃ", agricultureNews:"የግብርና ዜና",
      innovation:"የግብርና ፈጠራ", marketplace:"ገበያ", simulation:"የእርሻ ማስመሰያ",
      welcomeEyebrow:"ግብርና • እውቀት • ፈጠራ", welcomeTitle:"እንኳን ወደ አግሪኖቫ በደህና መጡ",
      welcomeText:"የግብርና እውቀትን፣ የአካባቢዎን የአየር ሁኔታና ጠቃሚ የእርሻ መረጃዎችን ያግኙ።",
      localWeather:"የአካባቢ የአየር ሁኔታ", weatherHeading:"የአየር ሁኔታ መረጃ", detectingLocation:"አካባቢዎን በመፈለግ ላይ…",
      loadingWeather:"የአየር ሁኔታን በመጫን ላይ…", temperature:"ሙቀት", humidity:"እርጥበት",
      windSpeed:"የንፋስ ፍጥነት", rainProbability:"የዝናብ ዕድል",
      weatherPermission:"የአካባቢዎን የአየር ሁኔታ ለማየት የአካባቢ ፈቃድ ይስጡ። ካልፈቀዱ በኢንተርኔት አድራሻ አካባቢዎን ለማግኘት እንሞክራለን።",
      articlesDescription:"ተግባራዊ ጽሑፎችን፣ የእርሻ መመሪያዎችንና የግብርና ምርምርን ያንብቡ።",
      exploreArticles:"ጽሑፎችን ይመልከቱ", fertilizerDescription:"ስለ ማዳበሪያ ዓይነቶች፣ ንጥረ ነገሮችና ትክክለኛ አጠቃቀም ይማሩ።",
      exploreFertilizers:"ማዳበሪያዎችን ይመልከቱ", newsDescription:"ስለ ግብርና እድገቶችና ዜናዎች ወቅታዊ መረጃ ያግኙ።",
      exploreNews:"ዜናዎችን ይመልከቱ", cropDescription:"ስለ ሰብል ዝርያዎች፣ የእድገት ሁኔታዎችና እንክብካቤ ይወቁ።",
      exploreCrops:"ሰብሎችን ይመልከቱ", pestDescription:"የሰብል ተባዮችንና የተክል በሽታዎችን ይለዩ፣ መከላከያ ዘዴዎችንም ይማሩ።",
      explorePests:"ተባዮችን ይመልከቱ", locationUnavailable:"አካባቢዎን ማግኘት አልተቻለም። የኢንተርኔት ግንኙነትዎን ይፈትሹ።",
      apiKeyMissing:"የቀጥታ የአየር ሁኔታን ለማግኘት በvisitor-dashboard.js ውስጥ OpenWeather API ቁልፍዎን ያስገቡ።",
      weatherFailed:"የአየር ሁኔታ መረጃን ማግኘት አልተቻለም።", permissionDenied:"የአካባቢ ፈቃድ አልተሰጠም። በኢንተርኔት ግንኙነትዎ አካባቢዎን ለማግኘት በመሞከር ላይ…",
      ipFallback:"የኔትወርክ አካባቢን በመጠቀም ላይ…", locationFound:"የአየር ሁኔታ ለ", weatherNow:"የአሁኑ ሁኔታ",
      feelsLike:"የሚሰማው", clear:"ፀሐያማ", clouds:"ደመናማ", rain:"ዝናብ", drizzle:"ቀላል ዝናብ",
      thunderstorm:"ነጎድጓድ", snow:"በረዶ", mist:"ጭጋግ", smoke:"ጭስ", haze:"ጉም", dust:"አቧራ", fog:"ጭጋግ",
      sand:"አሸዋ", ash:"አመድ", squall:"ኃይለኛ ንፋስ", tornado:"አውሎ ንፋስ", wind:"ንፋስ",
      rainUnavailable:"—", locationDefault:"አካባቢ አልተገኘም"
    },
    ti: {
      language:"ቋንቋ", navigation:"መርሓ ግብሪ", weatherInfo:"ሓበሬታ ኩነታት ኣየር", visitorArticles:"ጽሑፋት በጻሕቲ",
      pestLibrary:"ቤተ-መጻሕፍቲ ባልዕን ሕማማትን", fertilizerInfo:"ሓበሬታ ድኹዒ", educationContent:"ትምህርታዊ ትሕዝቶ",
      cropNews:"ዜና ዝራእቲ", cropMap:"ካርታ ዝራእቲ", cropInfo:"ሓበሬታ ዝራእቲ", agricultureNews:"ዜና ሕርሻ",
      innovation:"ሓድሽ ምህዞ ሕርሻ", marketplace:"ዕዳጋ", simulation:"ምስል ሕርሻ",
      welcomeEyebrow:"ሕርሻ • ፍልጠት • ምህዞ", welcomeTitle:"እንቋዕ ናብ ኣግሪኖቫ ብደሓን መጻእኩም",
      welcomeText:"ፍልጠት ሕርሻ፣ ናይ ከባቢኹም ኩነታት ኣየርን ጠቓሚ ሓበሬታ ሕርሻን ዳህስሱ።",
      localWeather:"ናይ ከባቢ ኩነታት ኣየር", weatherHeading:"ሓበሬታ ኩነታት ኣየር", detectingLocation:"ከባቢኹም ይድለ ኣሎ…",
      loadingWeather:"ኩነታት ኣየር ይጽዓን ኣሎ…", temperature:"ሙቐት", humidity:"ርጥበት",
      windSpeed:"ፍጥነት ንፋስ", rainProbability:"ተኽእሎ ዝናብ",
      weatherPermission:"ኩነታት ኣየር ከባቢኹም ንምርኣይ ፍቓድ ኣካባቢ ሃቡ። እንተ ኣቢኹም ብኢንተርነት ክንፍትን ኢና።",
      articlesDescription:"ጠቓሚ ጽሑፋት፣ መምርሒታት ሕርሻን ምርምር ሕርሻን ኣንብቡ።",
      exploreArticles:"ጽሑፋት ዳህስሱ", fertilizerDescription:"ብዛዕባ ዓይነታት ድኹዒ፣ ንጥረ ነገራትን ቅኑዕ ኣጠቓቕማን ተማሃሩ።",
      exploreFertilizers:"ድኹዒ ዳህስሱ", newsDescription:"ብዛዕባ ምዕባለታትን ዜናታትን ሕርሻ ሓበሬታ ርኸቡ።",
      exploreNews:"ዜና ዳህስሱ", cropDescription:"ዓይነታት ዝራእቲ፣ ኩነታት ዕብየትን ክንክንን ፍለጡ።",
      exploreCrops:"ዝራእቲ ዳህስሱ", pestDescription:"ባልዕን ሕማማት ተኽልን ፍለጡ፣ መከላኸሊ ሜላታት ተማሃሩ።",
      explorePests:"ባልዕ ዳህስሱ", locationUnavailable:"ከባቢኹም ክንረክብ ኣይከኣልናን። ኢንተርነትኩም ፈትሹ።",
      apiKeyMissing:"ቀጥታዊ ኩነታት ኣየር ንምርካብ OpenWeather API ቁልፊ ኣብ visitor-dashboard.js ኣእትዉ።",
      weatherFailed:"ሓበሬታ ኩነታት ኣየር ክንረክብ ኣይከኣልናን።", permissionDenied:"ፍቓድ ኣካባቢ ኣይተዋህበን። ብኢንተርነት ከባቢኹም ክንፍትን ኢና…",
      ipFallback:"ናይ ኔትወርክ ከባቢ ይጥቀም ኣሎ…", locationFound:"ኩነታት ኣየር ን", weatherNow:"ሕጂ ዘሎ ኩነታት",
      feelsLike:"ዝስምዖ", clear:"ጸሓያማ", clouds:"ደበናማ", rain:"ዝናብ", drizzle:"ቀሊል ዝናብ",
      thunderstorm:"ነጎድጓድ", snow:"በረድ", mist:"ጭጋግ", smoke:"ትኪ", haze:"ጉም", dust:"ሓመድ",
      fog:"ጭጋግ", sand:"ሑጻ", ash:"ሓምዅ", squall:"ብርቱዕ ንፋስ", tornado:"ህቦብላ", wind:"ንፋስ",
      rainUnavailable:"—", locationDefault:"ከባቢ ኣይተረኽበን"
    },
    om: {
      language:"Afaan", navigation:"Qajeelcha", weatherInfo:"Odeeffannoo Haala Qilleensaa", visitorArticles:"Barreeffamoota Daawwattootaa",
      pestLibrary:"Kuusaa Ilbiisotaa fi Dhukkubootaa", fertilizerInfo:"Odeeffannoo Xaa'oo", educationContent:"Qabiyyee Barnootaa",
      cropNews:"Oduu Midhaanii", cropMap:"Kaartaa Midhaanii", cropInfo:"Odeeffannoo Midhaanii", agricultureNews:"Oduu Qonnaa",
      innovation:"Kalaqa Qonnaa", marketplace:"Gabaa", simulation:"Qonna Fakkeessuu",
      welcomeEyebrow:"QONNAA • BEEKUMSA • KALAQA", welcomeTitle:"Baga Nagaan Dhuftan",
      welcomeText:"Beekumsa qonnaa, haala qilleensa naannoo keessanii fi odeeffannoo qonnaa barbaachisaa qoradhaa.",
      localWeather:"HAALA QILLEENSA NAANNOO", weatherHeading:"Odeeffannoo Haala Qilleensaa", detectingLocation:"Bakka keessan barbaadaa jira…",
      loadingWeather:"Haalli qilleensaa fe'amaa jira…", temperature:"Ho'a", humidity:"Jiidhina",
      windSpeed:"Saffisa bubbee", rainProbability:"Carraa roobaa",
      weatherPermission:"Haala qilleensa naannoo keessanii argachuuf hayyama bakka kennaa. Yoo diddan, bakka keessan karaa interneetii ni barbaanna.",
      articlesDescription:"Barreeffamoota hojii irra oolan, qajeelfamoota qonnaa fi qorannoo qonnaa dubbisaa.",
      exploreArticles:"Barreeffamoota Ilaalaa", fertilizerDescription:"Gosa xaa'oo, soorata biqiltuu fi itti fayyadama sirrii baradhaa.",
      exploreFertilizers:"Xaa'oo Ilaalaa", newsDescription:"Misooma qonnaa fi oduu haaraa hordofaa.",
      exploreNews:"Oduu Ilaalaa", cropDescription:"Gosa midhaanii, haala guddinaa fi kunuunsa isaanii baruuf.",
      exploreCrops:"Midhaan Ilaalaa", pestDescription:"Ilbiisota midhaanii fi dhukkuboota biqiltuu adda baasuun ittisa isaanii baradhaa.",
      explorePests:"Ilbiisota Ilaalaa", locationUnavailable:"Bakka keessan murteessuu hin dandeenye. Walitti dhufeenya interneetii keessan ilaalaa.",
      apiKeyMissing:"Haala qilleensaa yeroo ammaa argachuuf furtuu OpenWeather API visitor-dashboard.js keessatti galchaa.",
      weatherFailed:"Odeeffannoo haala qilleensaa fe'uun hin danda'amne.", permissionDenied:"Hayyamni bakka hin kennamne. Bakka keessan karaa interneetii barbaadaa jirra…",
      ipFallback:"Bakka interneetii keessanii fayyadamaa jirra…", locationFound:"Haala qilleensaa:", weatherNow:"Haala amma jiru",
      feelsLike:"Akkuma itti dhaga'amu", clear:"Qulqulluu", clouds:"Duumessa", rain:"Rooba", drizzle:"Rooba salphaa",
      thunderstorm:"Bakakkaa", snow:"Cabbi", mist:"Hurrii", smoke:"Aara", haze:"Duumessa xixiqqaa", dust:"Awwaara",
      fog:"Hurrii", sand:"Cirracha", ash:"Daaraa", squall:"Bubbee cimaa", tornado:"Bubbee marsaa", wind:"Bubbee",
      rainUnavailable:"—", locationDefault:"Bakka hin argamne"
    },
    so: {
      language:"Luqad", navigation:"Hagitaan", weatherInfo:"Macluumaadka Cimilada", visitorArticles:"Maqaallada Booqdaha",
      pestLibrary:"Maktabadda Cayayaanka iyo Cudurrada", fertilizerInfo:"Macluumaadka Bacriminta", educationContent:"Waxbarasho",
      cropNews:"Wararka Dalagga", cropMap:"Khariidadda Dalagga", cropInfo:"Macluumaadka Dalagga", agricultureNews:"Wararka Beeraha",
      innovation:"Hal-abuurka Beeraha", marketplace:"Suuqa", simulation:"Jilidda Beeraha",
      welcomeEyebrow:"BEERAHA • AQOONTA • HAL-ABUURKA", welcomeTitle:"Ku Soo Dhawoow AgriNova",
      welcomeText:"Baro aqoonta beeraha, cimilada deegaankaaga, iyo macluumaadka waxtarka leh ee beerashada.",
      localWeather:"CIMILADA DEEGAANKA", weatherHeading:"Macluumaadka Cimilada", detectingLocation:"Goobtaada ayaa la raadinayaa…",
      loadingWeather:"Cimilada ayaa la soo rarayaa…", temperature:"Heerkulka", humidity:"Qoyaanka",
      windSpeed:"Xawaaraha dabaysha", rainProbability:"Suurtagalnimada roobka",
      weatherPermission:"Oggolow goobtaada si aad u aragto cimilada deegaankaaga. Haddii aad diiddo, AgriNova waxay isku dayaysaa goobta internet-ka.",
      articlesDescription:"Akhri maqaallo waxtar leh, hagayaal beerasho, iyo cilmi-baarista beeraha.",
      exploreArticles:"Baadh Maqaallada", fertilizerDescription:"Baro noocyada bacriminta, nafaqooyinka, iyo isticmaalka habboon.",
      exploreFertilizers:"Baadh Bacriminta", newsDescription:"La soco horumarka iyo wararka beeraha.",
      exploreNews:"Baadh Wararka", cropDescription:"Baro noocyada dalagga, xaaladaha koritaanka, iyo daryeelkooda.",
      exploreCrops:"Baadh Dalagyada", pestDescription:"Aqoonso cayayaanka iyo cudurrada dhirta, barona hababka ka hortagga.",
      explorePests:"Baadh Cayayaanka", locationUnavailable:"Lama ogaan karin goobtaada. Hubi xiriirka internet-ka.",
      apiKeyMissing:"Geli furaha OpenWeather API gudaha visitor-dashboard.js si aad u hesho cimilada tooska ah.",
      weatherFailed:"Lama soo rari karin macluumaadka cimilada.", permissionDenied:"Oggolaanshaha goobta waa la diiday. Waxaan isku dayaynaa inaan goobtaada ka helno internet-ka…",
      ipFallback:"Goobta internet-ka ayaa la isticmaalayaa…", locationFound:"Cimilada:", weatherNow:"Xaaladda hadda",
      feelsLike:"Sida ay u dareemayso", clear:"Qorrax leh", clouds:"Daruur leh", rain:"Roob", drizzle:"Roob yar",
      thunderstorm:"Onkod", snow:"Baraf", mist:"Ceeryaamo", smoke:"Qiiq", haze:"Ceeryaamo khafiif ah", dust:"Boodh",
      fog:"Ceeryaamo", sand:"Ciid", ash:"Dambas", squall:"Dabayl xooggan", tornado:"Duufaan wareegta", wind:"Dabayl",
      rainUnavailable:"—", locationDefault:"Goob lama helin"
    }
  };

  const $ = (id) => document.getElementById(id);
  let currentLanguage = "en";

  function t(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  }

  function applyLanguage(language) {
    currentLanguage = translations[language] ? language : "en";
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[currentLanguage][key]) element.textContent = translations[currentLanguage][key];
    });
    const select = $("languageSelect");
    if (select && select.value !== currentLanguage) select.value = currentLanguage;
  }

  function weatherDescription(main) {
    const key = String(main || "").toLowerCase();
    const map = {
      clear:"clear", clouds:"clouds", rain:"rain", drizzle:"drizzle", thunderstorm:"thunderstorm",
      snow:"snow", mist:"mist", smoke:"smoke", haze:"haze", dust:"dust", fog:"fog",
      sand:"sand", ash:"ash", squall:"squall", tornado:"tornado"
    };
    return t(map[key] || "weatherNow");
  }

  function conditionClass(main, windSpeed) {
    const value = String(main || "").toLowerCase();
    if (value === "clear") return "weather-sunny";
    if (value === "clouds") return "weather-cloudy";
    if (["rain", "drizzle", "thunderstorm"].includes(value)) return "weather-rainy";
    if (value === "snow") return "weather-snowy";
    if (["mist", "fog", "haze", "smoke", "dust", "sand", "ash"].includes(value)) return "weather-foggy";
    if (windSpeed >= 30 || value === "squall" || value === "tornado") return "weather-windy";
    return "weather-default";
  }

  function conditionEmoji(main) {
    const value = String(main || "").toLowerCase();
    if (value === "clear") return "☀️";
    if (value === "clouds") return "☁️";
    if (["rain", "drizzle"].includes(value)) return "🌧️";
    if (value === "thunderstorm") return "⛈️";
    if (value === "snow") return "❄️";
    if (["mist", "fog", "haze", "smoke", "dust", "sand", "ash"].includes(value)) return "🌫️";
    return "💨";
  }

  function showWeatherMessage(message, isError = false) {
    $("weatherMessage").textContent = message;
    $("weatherError").textContent = isError ? message : "";
  }

  async function getNetworkLocation() {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Network location lookup failed.");
    const data = await response.json();
    const latitude = Number(data.latitude);
    const longitude = Number(data.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error("Network location did not return coordinates.");
    }
    return {
      latitude,
      longitude,
      label: [data.city, data.region, data.country_name].filter(Boolean).join(", ")
    };
  }

  function getBrowserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: ""
        }),
        reject,
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
    });
  }

  async function fetchOpenWeather(location) {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE") {
      throw new Error(t("apiKeyMissing"));
    }

    const query = `lat=${encodeURIComponent(location.latitude)}&lon=${encodeURIComponent(location.longitude)}&appid=${encodeURIComponent(OPENWEATHER_API_KEY)}&units=metric`;
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`${OPENWEATHER_BASE}/weather?${query}`),
      fetch(`${OPENWEATHER_BASE}/forecast?${query}`)
    ]);

    const currentData = await currentResponse.json();
    if (!currentResponse.ok) {
      const message = currentData?.message || "OpenWeather request failed.";
      throw new Error(message);
    }
    const forecastData = await forecastResponse.json();
    const rainProbability = forecastResponse.ok && Array.isArray(forecastData.list)
      ? Math.round((forecastData.list[0]?.pop || 0) * 100)
      : null;

    renderWeather(currentData, rainProbability, location.label);
  }

  function renderWeather(data, rainProbability, fallbackLabel) {
    const main = data.weather?.[0]?.main || "";
    const description = weatherDescription(main);
    const temp = Math.round(data.main?.temp);
    const humidity = Math.round(data.main?.humidity);
    const wind = Math.round((data.wind?.speed || 0) * 3.6);
    const city = data.name || fallbackLabel || t("locationDefault");

    $("weatherLocation").textContent = city;
    $("temperature").textContent = `${temp}°C`;
    $("weatherIcon").textContent = conditionEmoji(main);
    $("weatherCondition").textContent = description;
    $("metricTemperature").textContent = `${temp}°C`;
    $("metricHumidity").textContent = `${humidity}%`;
    $("metricWind").textContent = `${wind} km/h`;
    $("metricRain").textContent = rainProbability === null ? t("rainUnavailable") : `${rainProbability}%`;

    const card = $("weatherCard");
    card.classList.remove("weather-default", "weather-sunny", "weather-cloudy", "weather-rainy", "weather-snowy", "weather-foggy", "weather-windy");
    card.classList.add(conditionClass(main, wind));
    showWeatherMessage(`${t("weatherNow")}: ${description}${data.main?.feels_like != null ? ` · ${t("feelsLike")} ${Math.round(data.main.feels_like)}°C` : ""}`);
  }

  async function initWeather() {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE") {
      showWeatherMessage(t("apiKeyMissing"), true);
      return;
    }

    let location;
    try {
      location = await getBrowserLocation();
    } catch (error) {
      showWeatherMessage(t("permissionDenied"));
      try {
        location = await getNetworkLocation();
      } catch (networkError) {
        showWeatherMessage(t("locationUnavailable"), true);
        return;
      }
    }

    try {
      await fetchOpenWeather(location);
    } catch (error) {
      console.error("AgriNova weather error:", error);
      showWeatherMessage(`${t("weatherFailed")} ${error.message || ""}`, true);
    }
  }

  function init() {
    $("currentYear").textContent = new Date().getFullYear();
    const languageSelect = $("languageSelect");
    languageSelect.addEventListener("change", (event) => applyLanguage(event.target.value));
    applyLanguage(languageSelect.value || "en");
    initWeather();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
