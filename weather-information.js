/* AgriNova Weather Information
   Weather source: Open-Meteo (no API key required).
   Location: browser geolocation -> IP geolocation -> Addis Ababa fallback.

   OPENAI INTEGRATION PLACEHOLDER:
   Never put a real OpenAI secret key in browser JavaScript. Browser code is public.
   Store the key on your server as OPENAI_API_KEY and implement POST /api/agri-weather-advice.
   The page will use that endpoint when available and fall back to local recommendations.
*/
(() => {
  'use strict';

  // Requested placeholder. Keep this empty/placeholder in frontend code.
  const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Configure securely on backend; do not paste a real key here.
  const OPENAI_ADVICE_ENDPOINT = 'https://iqxfusbouchrapfxonxe.supabase.co/functions/v1/agri-weather-advice';
  const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
  const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search';

  const $ = id => document.getElementById(id);
  const els = {
    language: $('languageSelect'), search: $('locationSearch'), searchBtn: $('searchBtn'),
    hero: $('weatherHero'), heroBg: $('heroBackground'), heroLocation: $('heroLocation'), heroTemp: $('heroTemp'),
    heroCondition: $('heroCondition'), heroFeels: $('heroFeels'), heroRain: $('heroRain'), heroHumidity: $('heroHumidity'), heroWind: $('heroWind'),
    message: $('weatherMessage'), messageText: $('messageText'), retry: $('retryBtn'), recommendation: $('recommendationText'),
    detailTemp: $('detailTemp'), detailFeels: $('detailFeels'), detailRain: $('detailRain'), detailHumidity: $('detailHumidity'),
    detailWind: $('detailWind'), detailDirection: $('detailDirection'), detailPressure: $('detailPressure'), detailVisibility: $('detailVisibility'),
    alerts: $('alertsContainer'), hourly: $('hourlyForecast'), daily: $('dailyForecast'), rainfallStats: $('rainfallStats'),
    rainfallChart: $('rainfallChart'), temperatureChart: $('temperatureChart'), map: $('weatherMap'), legend: $('mapLegendContent'),
    sourceUpdated: $('sourceUpdated'), sourceLocation: $('sourceLocation'), sourcePeriod: $('sourcePeriod'), sourceName: $('sourceName')
  };

  const languages = {
    en: {back:'Back to Dashboard', brand:'Weather Information', search:'Search city or location...', searchBtn:'Search',
      feels:'Feels Like', rain:'Rain', humidity:'Humidity', wind:'Wind', recommendation:'Farming Recommendation',
      details:'Current Weather Details', temperature:'Temperature', rainProb:'Rain Probability', windSpeed:'Wind Speed',
      windDir:'Wind Direction', pressure:'Air Pressure', visibility:'Visibility', alerts:'Agricultural Weather Alerts',
      today:'Today’s Forecast', seven:'7-Day Forecast', rainfall:'Rainfall Forecast', tempForecast:'Temperature Forecast',
      mapTitle:'Ethiopian Weather Map', tempLayer:'Temperature', rainLayer:'Rainfall', windLayer:'Wind', humidityLayer:'Humidity',
      legend:'Legend', source:'Weather Data Source', updated:'Last Updated', period:'Forecast Period', location:'Location',
      loading:'Finding your location and loading the latest forecast…', locating:'Using your location…', ip:'Using approximate location from your internet connection…',
      failed:'Weather data could not be loaded. Check your connection and try again.', retry:'Try Again', noAlerts:'No major agricultural weather risks detected in the next 7 days.',
      adviceLoading:'Preparing weather-based farming guidance…', adviceFallback:'General guidance based on the forecast. Adjust decisions to your crop stage, soil moisture, and local conditions.',
      veryHot:'Extreme heat', hot:'High temperature', heavyRain:'Heavy rainfall / flood risk', dry:'Dry spell', frost:'Cold / frost risk', strongWind:'Strong wind',
      high:'High', medium:'Moderate', low:'Low', mm:'mm', max:'High', min:'Low', rainChance:'Rain chance',
      mapNote:'Regional overview from forecast samples at major Ethiopian locations. Colored circles show local forecast values; this is not an official administrative-boundary map.',
      noSearch:'Enter a city or place name.', searchFailed:'Location not found. Try another city or spelling.',
      recommendationTitle:'Field guidance', irrigate:'Irrigation', fieldwork:'Field work', spraying:'Spraying', harvest:'Harvest and storage',
      temperatureRisk:'Heat stress may affect crops and livestock. Irrigate early in the morning, mulch where possible, and provide shade and water for animals.',
      rainRisk:'Heavy rain may cause waterlogging, erosion, or flash flooding. Clear drainage channels, avoid working on saturated soil, and protect stored inputs.',
      dryRisk:'A dry spell is expected. Prioritize water for sensitive growth stages, reduce water loss with mulch, and monitor soil moisture.',
      windRisk:'Strong winds may damage tall crops and temporary structures. Secure shade nets and supports; postpone pesticide spraying in gusty conditions.',
      normalRisk:'Conditions look broadly suitable for routine field work. Check soil moisture before irrigation, scout for pests, and follow crop-specific guidance.' },
    am: {back:'ወደ ዳሽቦርድ ተመለስ',brand:'የአየር ሁኔታ መረጃ',search:'ከተማ ወይም ቦታ ፈልግ...',searchBtn:'ፈልግ',feels:'የሚሰማው',rain:'ዝናብ',humidity:'እርጥበት',wind:'ነፋስ',recommendation:'የእርሻ ምክር',details:'የአሁኑ የአየር ሁኔታ ዝርዝር',temperature:'ሙቀት',rainProb:'የዝናብ ዕድል',windSpeed:'የነፋስ ፍጥነት',windDir:'የነፋስ አቅጣጫ',pressure:'የአየር ግፊት',visibility:'የእይታ ርቀት',alerts:'የግብርና የአየር ማስጠንቀቂያዎች',today:'የዛሬ ትንበያ',seven:'የ7 ቀን ትንበያ',rainfall:'የዝናብ ትንበያ',tempForecast:'የሙቀት ትንበያ',mapTitle:'የኢትዮጵያ የአየር ካርታ',tempLayer:'ሙቀት',rainLayer:'ዝናብ',windLayer:'ነፋስ',humidityLayer:'እርጥበት',legend:'መግለጫ',source:'የመረጃ ምንጭ',updated:'የተዘመነበት',period:'የትንበያ ጊዜ',location:'ቦታ',loading:'ቦታዎን በማግኘት ትንበያውን በመጫን ላይ…',locating:'የእርስዎን ቦታ በመጠቀም ላይ…',ip:'ከኢንተርኔት ግንኙነትዎ ግምታዊ ቦታ በመጠቀም ላይ…',failed:'የአየር መረጃ መጫን አልተቻለም። ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።',retry:'እንደገና ሞክር',noAlerts:'በሚቀጥሉት 7 ቀናት ውስጥ ከባድ የግብርና አደጋ አልተገኘም።',adviceFallback:'በትንበያው ላይ የተመሠረተ አጠቃላይ ምክር። ውሳኔዎን ከሰብል ደረጃ፣ ከአፈር እርጥበትና ከአካባቢዎ ሁኔታ ጋር ያስተካክሉ።',veryHot:'ከፍተኛ ሙቀት',hot:'ከፍተኛ የሙቀት መጠን',heavyRain:'ከባድ ዝናብ / የጎርፍ አደጋ',dry:'ደረቅ ጊዜ',frost:'ብርድ / በረዶ አደጋ',strongWind:'ኃይለኛ ነፋስ',high:'ከፍተኛ',medium:'መካከለኛ',low:'ዝቅተኛ',mm:'ሚ.ሜ',max:'ከፍተኛ',min:'ዝቅተኛ',rainChance:'የዝናብ ዕድል',mapNote:'በዋና የኢትዮጵያ ከተሞች የትንበያ ናሙና ላይ የተመሠረተ የክልል አጠቃላይ እይታ ነው።',noSearch:'የከተማ ወይም የቦታ ስም ያስገቡ።',searchFailed:'ቦታው አልተገኘም። ሌላ ስም ይሞክሩ።',normalRisk:'ሁኔታዎቹ ለመደበኛ የእርሻ ሥራ በአጠቃላይ ተስማሚ ይመስላሉ። ከመስኖ በፊት የአፈር እርጥበትን ይፈትሹ።'},
    ti: {back:'ናብ ዳሽቦርድ ተመለስ',brand:'ሓበሬታ ኩነታት ኣየር',search:'ከተማ ወይ ቦታ ድለ...',searchBtn:'ድለ',feels:'ዝስምዖ',rain:'ዝናብ',humidity:'ርስሓት',wind:'ንፋስ',recommendation:'ምኽሪ ሕርሻ',details:'ዝርዝር ኩነታት ኣየር',temperature:'ሙቐት',rainProb:'ዕድል ዝናብ',windSpeed:'ፍጥነት ንፋስ',windDir:'ኣንፈት ንፋስ',pressure:'ጸቕጢ ኣየር',visibility:'ርእየት',alerts:'መጠንቀቕታ ኣየር ንሕርሻ',today:'ትንበያ ሎሚ',seven:'ትንበያ 7 መዓልቲ',rainfall:'ትንበያ ዝናብ',tempForecast:'ትንበያ ሙቐት',mapTitle:'ካርታ ኣየር ኢትዮጵያ',tempLayer:'ሙቐት',rainLayer:'ዝናብ',windLayer:'ንፋስ',humidityLayer:'ርስሓት',legend:'መግለጺ',source:'ምንጪ ሓበሬታ',updated:'ዝተሓደሰሉ',period:'ግዜ ትንበያ',location:'ቦታ',loading:'ቦታኻ እናደለና ትንበያ እናጽዓንና…',locating:'ቦታኻ እናጠቐምና…',ip:'ግምታዊ ቦታ ካብ ኢንተርነትካ እናጠቐምና…',failed:'ሓበሬታ ኣየር ኣይተጻዕነን። እንደገና ፈትን።',retry:'እንደገና ፈትን',noAlerts:'ኣብ ዝቕጽሉ 7 መዓልታት ዓቢ ሓደጋ ኣየር ኣይተረኽበን።',veryHot:'ኣዝዩ ልዑል ሙቐት',heavyRain:'ብርቱዕ ዝናብ / ሓደጋ ውሕጅ',dry:'ደረቕ ግዜ',frost:'ቁሪ / በረዶ',strongWind:'ብርቱዕ ንፋስ',high:'ልዑል',medium:'ማእከላይ',low:'ትሑት',max:'ልዑል',min:'ትሑት',rainChance:'ዕድል ዝናብ',mapNote:'ኣብ ዓበይቲ ከተማታት ኢትዮጵያ ዝተመርኮሰ ናይ ክልል ሓፈሻዊ ርእይቶ።',noSearch:'ስም ከተማ ኣእቱ።',searchFailed:'ቦታ ኣይተረኽበን።',normalRisk:'ኩነታት ንልሙድ ስራሕ ሕርሻ ብሓፈሻ ይምችእ።'},
    om: {back:'Gara Daashboordii Deebi’i',brand:'Odeeffannoo Haala Qilleensaa',search:'Magaalaa ykn bakka barbaadi...',searchBtn:'Barbaadi',feels:'Akka itti dhaga’amu',rain:'Rooba',humidity:'Jiidhina',wind:'Bubbee',recommendation:'Gorsa Qonnaa',details:'Odeeffannoo Haala Qilleensaa Amma',temperature:'Ho’a',rainProb:'Carraa Roobaa',windSpeed:'Saffisa Bubbee',windDir:'Kallattii Bubbee',pressure:'Dhiibbaa Qilleensaa',visibility:'Mul’achuu',alerts:'Akeekkachiisa Haala Qilleensaa Qonnaa',today:'Tilmaama Har’aa',seven:'Tilmaama Guyyaa 7',rainfall:'Tilmaama Roobaa',tempForecast:'Tilmaama Ho’aa',mapTitle:'Kaartaa Haala Qilleensaa Itoophiyaa',tempLayer:'Ho’a',rainLayer:'Rooba',windLayer:'Bubbee',humidityLayer:'Jiidhina',legend:'Hiika Mallattoo',source:'Madda Odeeffannoo',updated:'Yoom Haaromfame',period:'Yeroo Tilmaamaa',location:'Bakka',loading:'Bakka kee argachaa fi tilmaama fe’aa jirra…',locating:'Bakka kee fayyadamaa jirra…',ip:'Bakka tilmaamaa interneetii kee irraa fayyadamaa jirra…',failed:'Odeeffannoo haala qilleensaa fe’uun hin danda’amne. Irra deebi’ii yaali.',retry:'Irra deebi’ii yaali',noAlerts:'Guyyaa 7 dhufan keessatti balaa qonnaa cimaa hin argamne.',veryHot:'Ho’a garmalee',heavyRain:'Rooba cimaa / balaa lolaa',dry:'Yeroo gogaa',frost:'Qorra / cabbii',strongWind:'Bubbee cimaa',high:'Ol’aanaa',medium:'Giddu galeessa',low:'Gadi aanaa',max:'Ol’aanaa',min:'Gadi aanaa',rainChance:'Carraa roobaa',mapNote:'Mul’ata waliigalaa naannolee; tilmaama magaalota gurguddoo Itoophiyaa irraa fudhatame.',noSearch:'Maqaa magaalaa ykn bakka galchi.',searchFailed:'Bakka hin argamne. Maqaa biraa yaali.',normalRisk:'Haalli qilleensaa hojii qonnaa idileef waliigalaan mijataa fakkaata.'},
    so: {back:'Ku Noqo Dashboard-ka',brand:'Macluumaadka Cimilada',search:'Raadi magaalo ama goob...',searchBtn:'Raadi',feels:'Sida uu dareemayo',rain:'Roob',humidity:'Qoyaan',wind:'Dabayl',recommendation:'Talooyinka Beeraha',details:'Faahfaahinta Cimilada Hadda',temperature:'Heerkul',rainProb:'Fursadda Roobka',windSpeed:'Xawaaraha Dabaylaha',windDir:'Jihada Dabaylaha',pressure:'Cadaadiska Hawada',visibility:'Aragtida',alerts:'Digniinaha Cimilada Beeraha',today:'Saadaasha Maanta',seven:'Saadaasha 7 Maalmood',rainfall:'Saadaasha Roobka',tempForecast:'Saadaasha Heerkulka',mapTitle:'Khariidadda Cimilada Itoobiya',tempLayer:'Heerkul',rainLayer:'Roob',windLayer:'Dabayl',humidityLayer:'Qoyaan',legend:'Furaha Khariidadda',source:'Isha Xogta Cimilada',updated:'Markii Ugu Dambaysay',period:'Muddada Saadaasha',location:'Goobta',loading:'Goobtaada ayaa la raadinayaa, saadaashana waa la soo rarayaa…',locating:'Goobtaada ayaa la isticmaalayaa…',ip:'Goob qiyaas ah oo laga helay internet-kaaga ayaa la isticmaalayaa…',failed:'Xogta cimilada lama soo rari karin. Hubi xiriirka oo isku day mar kale.',retry:'Mar kale isku day',noAlerts:'Toddobada maalmood ee soo socda khatar beeraha oo weyn lama helin.',veryHot:'Kulayl daran',heavyRain:'Roob xooggan / khatar fatahaad',dry:'Xilli qalalan',frost:'Qabow / dhaxan',strongWind:'Dabayl xooggan',high:'Sare',medium:'Dhexdhexaad',low:'Hoose',max:'Ugu sarreeya',min:'Ugu hooseeya',rainChance:'Fursadda roobka',mapNote:'Aragti goboleed laga soo ururiyey saadaasha magaalooyinka waaweyn ee Itoobiya.',noSearch:'Geli magaca magaalo ama goob.',searchFailed:'Goobta lama helin. Isku day magac kale.',normalRisk:'Xaaladuhu guud ahaan way ku habboon yihiin hawlaha beeraha ee caadiga ah.'}
  };

  Object.assign(languages.ti, {
    adviceFallback:'ሓፈሻዊ ምኽሪ ብመሰረት ትንበያ ኣየር። ውሳነኻ ምስ ደረጃ ዕብየት ዝራእቲን ርስሓት ሓመድን ኣመዓራርዮ።',
    temperatureRisk:'ልዑል ሙቐት ንዝራእቲን እንስሳታትን ጸቕጢ ክፈጥር ይኽእል። ኣብ ንግሆ ማይ ስትንክሩ፣ ሓመድ ብምሽፋን ርስሓት ዓቅቡ።',
    rainRisk:'ብርቱዕ ዝናብ ማይ ክእከብን ሓመድ ክሕጸብን ይኽእል። መውረዲ ማይ ኣጽርዩ፣ ኣብ ጽቡቕ ዘይኮነ ሓመድ ስራሕ ኣይትግበሩ።',
    dryRisk:'ደረቕ ግዜ ይጽበየና ኣሎ። ኣብ ኣገዳሲ ደረጃ ዕብየት ዝራእቲ ማይ ቀዳምነት ሃቡ።',
    windRisk:'ብርቱዕ ንፋስ ዝራእቲን ግዝያዊ ህንጻታትን ክጎድእ ይኽእል። መደገፊታት ኣጽንዑ፣ ኣብ ንፋስ ፀረ-ባልዕ ኣይትንጸጉ።',
    normalRisk:'ኩነታት ኣየር ንልሙድ ስራሕ ሕርሻ ብሓፈሻ ይምችእ። ቅድሚ መስኖ ርስሓት ሓመድ ፈትሹ።',
    noSearch:'ስም ከተማ ወይ ቦታ ኣእቱ።', searchFailed:'ቦታ ኣይተረኽበን። ካልእ ስም ፈትን።'
  });
  Object.assign(languages.om, {
    adviceFallback:'Gorsa waliigalaa tilmaama qilleensaa irratti hundaa’e. Murtoo kee sadarkaa guddina midhaanii fi jiidhina biyyee waliin madaali.',
    temperatureRisk:'Ho’i cimaa midhaanii fi beeyladoota miidhuu danda’a. Ganama bishaan obaasii, biyyee haguugi, beeyladootaaf gaaddisa fi bishaan kenni.',
    rainRisk:'Roobni guddaan bishaan dhaabbachuu, biyyee dhiqamuu ykn lolaa fiduu danda’a. Daandii bishaanii qulqulleessi; biyyee jiidhaa irratti hin hojjetin.',
    dryRisk:'Yeroon gogaa ni eegama. Bishaan sadarkaa guddina midhaanii murteessaadhaaf dursa kenni; jiidhina biyyee hordofi.',
    windRisk:'Bubbeen cimaa midhaanii fi ijaarsa yeroo gabaabaa miidhuu danda’a. Deeggarsa cimsii; bubbee cimaa keessatti qoricha biifuu dhiisi.',
    normalRisk:'Haalli qilleensaa hojii qonnaa idileef waliigalaan mijataa fakkaata. Osoo hin obaasiin jiidhina biyyee ilaali; raammoo hordofi.',
    noSearch:'Maqaa magaalaa ykn bakka galchi.', searchFailed:'Bakka hin argamne. Maqaa biraa yaali.'
  });
  Object.assign(languages.so, {
    adviceFallback:'Talo guud oo ku salaysan saadaasha. Go’aamada ku salee marxaladda dalagga iyo qoyaanka ciidda.',
    temperatureRisk:'Kulaylka daran wuxuu dhaawici karaa dalagyada iyo xoolaha. Waraabi aroortii, ciidda dabool, xoolahana sii hadh iyo biyo.',
    rainRisk:'Roob xooggan wuxuu keeni karaa biyo fadhiya, nabaad-guur ama fatahaad. Nadiifi marin-biyoodka kana fogow beerista ciidda qoyan.',
    dryRisk:'Xilli qalalan ayaa la filayaa. Biyaha mudnaanta sii dalagyada marxaladaha xasaasiga ah, lana soco qoyaanka ciidda.',
    windRisk:'Dabayl xooggan waxay dhaawici kartaa dalagyada dhaadheer iyo dhismayaasha ku-meelgaarka ah. Adkee tiirarka, hana buufin sunta marka dabayshu xooggan tahay.',
    normalRisk:'Xaaladuhu guud ahaan way ku habboon yihiin hawlaha beeraha ee caadiga ah. Hubi qoyaanka ciidda ka hor waraabinta, kana baar cayayaanka.',
    noSearch:'Geli magaca magaalo ama goob.', searchFailed:'Goobta lama helin. Isku day magac kale.'
  });

  let lang = 'en', latest = null, currentLocation = {lat:9.03, lon:38.74, name:'Addis Ababa, Ethiopia'}, lastMapLayer = 'temperature';
  const tr = key => (languages[lang] && languages[lang][key]) || languages.en[key] || key;
  const conditionText = code => { const en=code===0?'Clear':([1,2,3].includes(code)?'Partly cloudy':([45,48].includes(code)?'Fog':([51,53,55,56,57].includes(code)?'Drizzle':([61,63,65,66,67].includes(code)?'Rain':([71,73,75,77,85,86].includes(code)?'Snow':([80,81,82].includes(code)?'Rain showers':([95,96,99].includes(code)?'Thunderstorm':'Variable'))))))); const words={am:{Clear:'ፀሐያማ', 'Partly cloudy':'ከፊል ደመና',Fog:'ጉም',Drizzle:'ቀላል ዝናብ',Rain:'ዝናብ',Snow:'በረዶ','Rain showers':'ዝናብ',Thunderstorm:'ነጎድጓድ',Variable:'ተለዋዋጭ'},ti:{Clear:'ጸሓያዊ','Partly cloudy':'ብኽፋል ደበና',Fog:'ግመ',Drizzle:'ቀሊል ዝናብ',Rain:'ዝናብ',Snow:'በረድ','Rain showers':'ዝናብ',Thunderstorm:'ነጎድጓድ',Variable:'ዝተፈላለየ'},om:{Clear:'Qilleensa ifaa','Partly cloudy':'Duumessa muraasa',Fog:'Hurrii',Drizzle:'Rooba xiqqaa',Rain:'Rooba',Snow:'Cabbii','Rain showers':'Rooba',Thunderstorm:'Konkolaataa',Variable:'Jijjiiramaa'},so:{Clear:'Qorrax leh','Partly cloudy':'Daruur qayb ah',Fog:'Ceeryaamo',Drizzle:'Roob yar',Rain:'Roob',Snow:'Baraf','Rain showers':'Roob goos-goos ah',Thunderstorm:'Onkod',Variable:'Isbeddelaya'}};return (words[lang]&&words[lang][en])||en; };
  const conditionIcon = code => code===0?'☀️':([1,2,3].includes(code)?'🌤️':([45,48].includes(code)?'🌫️':([51,53,55,56,57].includes(code)?'🌦️':([61,63,65,66,67,80,81,82].includes(code)?'🌧️':([71,73,75,77,85,86].includes(code)?'🌨️':([95,96,99].includes(code)?'⛈️':'🌥️'))))));
  const direction = deg => { if (!Number.isFinite(deg)) return '—'; return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8]; };
  const safe = (v, digits=0) => Number.isFinite(Number(v)) ? Number(v).toFixed(digits) : '—';
  const showMessage = (message, error=false) => { if (!els.message) return; els.message.style.display='block'; els.messageText.textContent=message; els.retry.style.display=error?'inline-flex':'none'; };
  const hideMessage = () => { if (els.message) els.message.style.display='none'; };

  function translateStatic() {
    const map = {
      '.brand-sub':'brand', '#searchBtn':'searchBtn',
      '.hero-detail:nth-child(1) .detail-label':'feels', '.hero-detail:nth-child(2) .detail-label':'rain',
      '.hero-detail:nth-child(3) .detail-label':'humidity', '.hero-detail:nth-child(4) .detail-label':'wind',
      '#headingRecommendation':'recommendation', '#headingDetails':'details',
      '#headingAlerts':'alerts', '#headingToday':'today', '#headingSeven':'seven',
      '#headingRainfall':'rainfall', '#headingTempForecast':'tempForecast',
      '#headingMap':'mapTitle', '.legend-header':'legend'
    };
    Object.entries(map).forEach(([selector,key]) => { const el=document.querySelector(selector); if(el) el.textContent=tr(key); });
    const backLink=document.querySelector('.back-link'); if(backLink){const textNode=[...backLink.childNodes].find(n=>n.nodeType===3);if(textNode)textNode.textContent=' '+tr('back');}
    const labels = document.querySelectorAll('#detailsGrid .detail-card .detail-label');
    ['temperature','feels','rainProb','humidity','windSpeed','windDir','pressure','visibility'].forEach((k,i)=>{if(labels[i]) labels[i].textContent=tr(k);});
    const srcLabels=document.querySelectorAll('.data-source .source-label');
    ['source','updated','period','location'].forEach((k,i)=>{if(srcLabels[i])srcLabels[i].textContent=tr(k);});
    els.search.placeholder=tr('search');
    document.querySelectorAll('.map-layer-btn').forEach(b=>{const k={temperature:'tempLayer',rainfall:'rainLayer',wind:'windLayer',humidity:'humidityLayer'}[b.dataset.layer];b.textContent=tr(k);});
    document.documentElement.lang=lang;
  }

  async function fetchForecast(lat, lon) {
    const params = new URLSearchParams({latitude:lat,longitude:lon,current:'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',hourly:'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m,visibility',daily:'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max',timezone:'auto',forecast_days:'7'});
    const response=await fetch(`${WEATHER_API}?${params}`); if(!response.ok) throw new Error('Weather service error'); return response.json();
  }

  async function loadWeather(lat,lon,name) {
    showMessage(tr('loading'));
    try {
      const data=await fetchForecast(lat,lon); latest=data; currentLocation={lat,lon,name}; renderAll(data,name); hideMessage();
      els.sourceUpdated.textContent=new Date().toLocaleString(); els.sourceLocation.textContent=name; els.sourcePeriod.textContent='7 days'; els.sourceName.textContent='Open-Meteo';
      renderMap(lastMapLayer);
      return true;
    } catch(err) { console.error(err); showMessage(tr('failed'),true); return false; }
  }

  function currentValues(d) {
    const c=d.current||{}, h=d.hourly||{}, now=Date.now();
    let idx=0; if(h.time?.length){ let best=Infinity; h.time.forEach((t,i)=>{const delta=Math.abs(new Date(t).getTime()-now);if(delta<best){best=delta;idx=i;}}); }
    const at=(key)=>h[key]?.[idx];
    return {temp:c.temperature_2m, feels:c.apparent_temperature, humidity:c.relative_humidity_2m, rain:at('precipitation_probability') ?? 0,
      wind:c.wind_speed_10m, dir:c.wind_direction_10m, pressure:c.surface_pressure ?? c.pressure_msl,
      visibility:at('visibility'), code:c.weather_code ?? 0, idx};
  }

  function renderAll(d,name) {
    const v=currentValues(d), daily=d.daily||{}, hourly=d.hourly||{};
    els.heroLocation.textContent=name; els.heroTemp.textContent=`${safe(v.temp)}°C`; els.heroCondition.textContent=`${conditionIcon(v.code)} ${conditionText(v.code)}`;
    els.heroFeels.textContent=`${safe(v.feels)}°C`; els.heroRain.textContent=`${safe(v.rain)}%`; els.heroHumidity.textContent=`${safe(v.humidity)}%`; els.heroWind.textContent=`${safe(v.wind)} km/h`;
    els.detailTemp.textContent=`${safe(v.temp)} °C`; els.detailFeels.textContent=`${safe(v.feels)} °C`; els.detailRain.textContent=`${safe(v.rain)}%`;
    els.detailHumidity.textContent=`${safe(v.humidity)}%`; els.detailWind.textContent=`${safe(v.wind)} km/h`; els.detailDirection.textContent=`${direction(v.dir)} (${safe(v.dir)}°)`;
    els.detailPressure.textContent=v.pressure?`${safe(v.pressure)} hPa`:'—'; els.detailVisibility.textContent=v.visibility?`${(v.visibility/1000).toFixed(1)} km`:'—';
    setHeroBackground(v.code, v.temp);
    renderRecommendation(d,v,name); renderAlerts(d); renderHourly(hourly); renderDaily(daily); renderCharts(daily); renderMap(lastMapLayer);
  }

  function setHeroBackground(code,temp) {
    let gradient='linear-gradient(120deg,rgba(24,64,42,.76),rgba(34,92,67,.28))';
    if([95,96,99].includes(code)) gradient='linear-gradient(120deg,rgba(23,34,57,.86),rgba(61,79,104,.35))';
    else if([61,63,65,80,81,82,66,67].includes(code)) gradient='linear-gradient(120deg,rgba(32,59,75,.82),rgba(70,115,130,.32))';
    else if([45,48].includes(code)) gradient='linear-gradient(120deg,rgba(80,91,88,.78),rgba(160,170,162,.35))';
    else if(temp>=32) gradient='linear-gradient(120deg,rgba(126,66,26,.82),rgba(226,145,53,.28))';
    else if(temp<=8) gradient='linear-gradient(120deg,rgba(35,70,104,.82),rgba(120,165,195,.3))';
    else if(code===0) gradient='linear-gradient(120deg,rgba(40,91,69,.72),rgba(221,166,72,.28))';
    if(els.heroBg) { els.heroBg.style.backgroundImage=gradient; els.heroBg.style.backgroundColor='#426c51'; }
  }

  function localRecommendation(d,v) {
    const daily=d.daily||{}, max=Math.max(...(daily.temperature_2m_max||[v.temp])), rain=Math.max(...(daily.precipitation_probability_max||[v.rain])), total=(daily.precipitation_sum||[]).reduce((a,b)=>a+(b||0),0), wind=Math.max(...(daily.wind_speed_10m_max||[v.wind]));
    const lines=[];
    if(max>=35) lines.push(tr('temperatureRisk'));
    if(rain>=75 || total>=70) lines.push(tr('rainRisk'));
    else if(total<5 && rain<25) lines.push(tr('dryRisk'));
    if(wind>=45) lines.push(tr('windRisk'));
    if(!lines.length) lines.push(tr('normalRisk'));
    return `${lines.join(' ')}\n\n${tr('adviceFallback')}`;
  }

  async function renderRecommendation(d,v,name) {
    const fallback=localRecommendation(d,v); els.recommendation.textContent=fallback;
    // Optional server-side OpenAI integration. The browser never receives the secret key.
    try {
      const response=await fetch(OPENAI_ADVICE_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:name,language:lang,current:{temperature:v.temp,feelsLike:v.feels,humidity:v.humidity,rainProbability:v.rain,windSpeed:v.wind},daily:d.daily,forecast:d.hourly})});
      if(response.ok){const result=await response.json(); if(result.advice) els.recommendation.textContent=result.advice;}
    } catch(_) { /* Backend is optional; deterministic local advice remains visible. */ }
  }

  function renderAlerts(d) {
    const daily=d.daily||{}, dates=daily.time||[], highs=daily.temperature_2m_max||[], lows=daily.temperature_2m_min||[], rain=daily.precipitation_probability_max||[], sums=daily.precipitation_sum||[], winds=daily.wind_speed_10m_max||[], gusts=daily.wind_gusts_10m_max||[];
    const found=[];
    dates.forEach((date,i)=>{
      const day=new Date(`${date}T12:00:00`).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
      if(highs[i]>=38) found.push({severity:'high',icon:'🔥',title:tr('veryHot'),day,detail:`${safe(highs[i])}°C forecast. ${tr('temperatureRisk')}`});
      else if(highs[i]>=34) found.push({severity:'medium',icon:'🌡️',title:tr('hot'),day,detail:`${safe(highs[i])}°C forecast. ${tr('temperatureRisk')}`});
      if((rain[i]>=80 && (sums[i]||0)>=25)||(sums[i]||0)>=60) found.push({severity:'high',icon:'🌊',title:tr('heavyRain'),day,detail:`${safe(sums[i])} mm expected; rain probability ${safe(rain[i])}%. ${tr('rainRisk')}`});
      if((sums[i]||0)<1 && (rain[i]||0)<15) found.push({severity:'medium',icon:'🏜️',title:tr('dry'),day,detail:tr('dryRisk')});
      if(lows[i]<=2) found.push({severity:'high',icon:'❄️',title:tr('frost'),day,detail:`Minimum ${safe(lows[i])}°C. Protect sensitive seedlings and crops from cold.`});
      if(Math.max(winds[i]||0,gusts[i]||0)>=50) found.push({severity:'medium',icon:'💨',title:tr('strongWind'),day,detail:`Wind up to ${safe(Math.max(winds[i]||0,gusts[i]||0))} km/h. ${tr('windRisk')}`});
    });
    const unique=found.filter((x,i)=>found.findIndex(y=>y.title===x.title&&y.day===x.day)===i);
    els.alerts.innerHTML=unique.length?unique.map(a=>`<article class="alert-card severity-${a.severity}"><span class="alert-icon">${a.icon}</span><div><strong>${a.title} · ${a.day}</strong><p>${a.detail}</p></div></article>`).join(''):`<p>${tr('noAlerts')}</p>`;
  }

  function renderHourly(h) {
    if(!h.time){els.hourly.innerHTML='';return;} const now=new Date(); let start=h.time.findIndex(t=>new Date(t)>=new Date(now.getTime()-60*60*1000)); if(start<0)start=0;
    els.hourly.innerHTML=Array.from({length:24},(_,n)=>start+n).filter(i=>i<h.time.length).map(i=>{
      const time=new Date(h.time[i]).toLocaleTimeString([], {hour:'numeric'}), code=h.weather_code?.[i]??0;
      return `<div class="hour-card"><div>${time}</div><div class="forecast-icon">${conditionIcon(code)}</div><strong>${safe(h.temperature_2m?.[i])}°</strong><small>💧 ${safe(h.precipitation_probability?.[i])}%</small><small>💨 ${safe(h.wind_speed_10m?.[i])}</small></div>`;
    }).join('');
  }

  function renderDaily(d) {
    els.daily.innerHTML=(d.time||[]).map((date,i)=>`<div class="forecast-card"><div>${new Date(`${date}T12:00:00`).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</div><div class="forecast-icon">${conditionIcon(d.weather_code?.[i]??0)}</div><strong>${safe(d.temperature_2m_max?.[i])}° / ${safe(d.temperature_2m_min?.[i])}°</strong><small>💧 ${safe(d.precipitation_probability_max?.[i])}%</small><small>🌧 ${safe(d.precipitation_sum?.[i],1)} mm</small><small>💨 ${safe(d.wind_speed_10m_max?.[i])} km/h</small></div>`).join('');
  }

  function drawChart(canvas, labels, values, title, suffix='') {
    if(!canvas) return; const rect=canvas.getBoundingClientRect(), width=Math.max(320,rect.width||700), height=260, dpr=window.devicePixelRatio||1;
    canvas.width=width*dpr; canvas.height=height*dpr; canvas.style.height=height+'px'; const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr);
    const pad={l:42,r:18,t:25,b:42}, w=width-pad.l-pad.r, h=height-pad.t-pad.b, valid=values.map(v=>Number(v)||0), min=Math.min(0,...valid), max=Math.max(1,...valid), span=max-min||1;
    ctx.clearRect(0,0,width,height); ctx.font='12px Inter, sans-serif'; ctx.fillStyle='#718174'; ctx.strokeStyle='#e4ebe3';
    for(let n=0;n<=4;n++){const y=pad.t+h*n/4;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(width-pad.r,y);ctx.stroke();ctx.fillText((max-(span*n/4)).toFixed(0)+suffix,4,y+4);}
    const pts=valid.map((v,i)=>({x:pad.l+(valid.length<=1?w/2:i*w/(valid.length-1)),y:pad.t+h-(v-min)/span*h}));
    if(pts.length){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle='#3c8a5b';ctx.lineWidth=3;ctx.stroke();ctx.lineTo(pts[pts.length-1].x,pad.t+h);ctx.lineTo(pts[0].x,pad.t+h);ctx.closePath();ctx.fillStyle='rgba(76,150,99,.12)';ctx.fill();
      pts.forEach((p,i)=>{ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fillStyle='#347d50';ctx.fill();if(i%Math.ceil(pts.length/7)===0){ctx.fillStyle='#718174';ctx.fillText(labels[i]||'',p.x-17,height-13);}});}
  }
  function renderCharts(d) {
    const dates=d.time||[], labels=dates.map(x=>new Date(`${x}T12:00:00`).toLocaleDateString(undefined,{weekday:'short'}));
    drawChart(els.rainfallChart,labels,d.precipitation_sum||[],'Rainfall',' mm');
    drawChart(els.temperatureChart,labels,d.temperature_2m_max||[],'Temperature','°C');
    const total=(d.precipitation_sum||[]).reduce((a,b)=>a+(b||0),0), max=Math.max(...(d.precipitation_sum||[0]));
    els.rainfallStats.innerHTML=`<div><strong>${safe(total,1)} mm</strong><span>7-day total rainfall</span></div><div><strong>${safe(max,1)} mm</strong><span>Highest daily rainfall</span></div>`;
  }

  const mapPlaces=[
    {name:'Mekelle',lat:13.4967,lon:39.4753,x:58,y:16},{name:'Bahir Dar',lat:11.5942,lon:37.3908,x:40,y:32},
    {name:'Gondar',lat:12.6030,lon:37.4521,x:38,y:21},{name:'Addis Ababa',lat:9.03,lon:38.74,x:54,y:51},
    {name:'Dire Dawa',lat:9.60,lon:41.85,x:78,y:48},{name:'Jimma',lat:7.67,lon:36.83,x:38,y:62},
    {name:'Hawassa',lat:7.06,lon:38.48,x:53,y:68},{name:'Jijiga',lat:9.35,lon:42.80,x:87,y:38},
    {name:'Gambela',lat:8.25,lon:34.59,x:20,y:57},{name:'Semera',lat:11.79,lon:41.00,x:72,y:26}
  ];
  let mapData=[];
  async function loadMapSamples() {
    // Open-Meteo accepts comma-separated coordinates, so all map samples use one request.
    try {
      const latitudes=mapPlaces.map(p=>p.lat).join(','), longitudes=mapPlaces.map(p=>p.lon).join(',');
      const params=new URLSearchParams({latitude:latitudes,longitude:longitudes,current:'temperature_2m,relative_humidity_2m,wind_speed_10m',daily:'precipitation_sum',timezone:'auto',forecast_days:'7'});
      const response=await fetch(`${WEATHER_API}?${params}`); if(!response.ok) throw new Error('Map weather request failed');
      const payload=await response.json(); const results=Array.isArray(payload)?payload:[payload];
      mapData=mapPlaces.map((p,i)=>{const data=results[i];if(!data)return null;const c=data.current||{},d=data.daily||{};return {...p,temp:c.temperature_2m,rain:(d.precipitation_sum||[]).reduce((a,b)=>a+(b||0),0),wind:c.wind_speed_10m,humidity:c.relative_humidity_2m};}).filter(Boolean);
    } catch(error) { console.warn('Regional map data unavailable:',error); mapData=[]; }
    renderMap(lastMapLayer);
  }
  function mapMetric(place,layer){return layer==='temperature'?place.temp:layer==='rainfall'?place.rain:layer==='wind'?place.wind:place.humidity;}
  function mapColor(value,layer){
    const ranges=layer==='temperature'?[-2,10,20,30,40]:layer==='rainfall'?[0,10,30,60,100]:layer==='wind'?[0,10,20,35,60]:[0,30,50,70,100];
    const colors=['#3978b8','#77b9d5','#8fbd78','#efb44f','#d95745']; let i=value<ranges[1]?0:value<ranges[2]?1:value<ranges[3]?2:value<ranges[4]?3:4;return colors[i];
  }
  function renderMap(layer) {
    lastMapLayer=layer; if(!els.map)return;
    const metricLabel={temperature:'°C',rainfall:'mm / 7 days',wind:'km/h',humidity:'%'}[layer];
    const nodes=mapData.map(p=>{const value=mapMetric(p,layer);return `<circle class="map-point" cx="${p.x}%" cy="${p.y}%" r="13" fill="${mapColor(value,layer)}"><title>${p.name}: ${safe(value,1)} ${metricLabel}</title></circle><text class="map-point-label" x="${p.x}%" y="${p.y+5}%" text-anchor="middle">${p.name}</text>`;}).join('');
    els.map.innerHTML=`<p class="map-caption">${tr('mapTitle')} · ${({temperature:tr('tempLayer'),rainfall:tr('rainLayer'),wind:tr('windLayer'),humidity:tr('humidityLayer')})[layer]}</p><svg class="ethiopia-map" viewBox="0 0 100 100" role="img" aria-label="Stylized Ethiopia weather map"><path class="map-land" d="M24 5 L42 8 L53 3 L68 13 L78 10 L90 23 L84 34 L95 44 L83 57 L76 76 L62 89 L49 84 L39 94 L28 83 L18 70 L8 58 L14 43 L6 31 L16 20 Z"/><path class="map-region-line" d="M16 25 L42 32 L68 23 M12 49 L40 48 L76 40 M20 69 L48 61 L75 72 M42 8 L40 32 L48 61 L39 94 M68 13 L68 43 L62 89"/>${nodes}</svg><p class="map-note">${tr('mapNote')}</p>`;
    const legends=layer==='temperature'?[['#3978b8','<10°C'],['#77b9d5','10–19°C'],['#8fbd78','20–29°C'],['#efb44f','30–39°C'],['#d95745','40°C+']]:layer==='rainfall'?[['#3978b8','<10 mm'],['#77b9d5','10–29 mm'],['#8fbd78','30–59 mm'],['#efb44f','60–99 mm'],['#d95745','100 mm+']]:layer==='wind'?[['#3978b8','<10 km/h'],['#77b9d5','10–19'],['#8fbd78','20–34'],['#efb44f','35–59'],['#d95745','60+']]:[['#3978b8','<30%'],['#77b9d5','30–49%'],['#8fbd78','50–69%'],['#efb44f','70–89%'],['#d95745','90%+']];
    els.legend.innerHTML=legends.map(([color,label])=>`<div class="legend-item"><span class="legend-color" style="background:${color}"></span>${label}</div>`).join('');
  }

  async function locateAndLoad() {
    showMessage(tr('locating'));
    if(navigator.geolocation) {
      try { const pos=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:false,timeout:7000,maximumAge:900000}));
        const {latitude,longitude}=pos.coords; const name=await reverseName(latitude,longitude); await loadWeather(latitude,longitude,name); return;
      } catch(e) { console.info('Browser location unavailable; trying IP location.'); }
    }
    showMessage(tr('ip'));
    try { const r=await fetch('https://ipapi.co/json/'); if(!r.ok)throw new Error('IP lookup failed'); const j=await r.json(); if(j.latitude&&j.longitude){await loadWeather(j.latitude,j.longitude,[j.city,j.region,j.country_name].filter(Boolean).join(', '));return;} } catch(e){console.info('IP location unavailable; using default.');}
    await loadWeather(9.03,38.74,'Addis Ababa, Ethiopia');
  }
  async function reverseName(lat,lon){try{const r=await fetch(`${GEO_API}?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`);const j=await r.json();const x=j.results?.[0];return x?[x.name,x.admin1,x.country].filter(Boolean).join(', '):'Your location';}catch(_){return 'Your location';}}
  async function searchLocation(){const q=els.search.value.trim();if(!q){showMessage(tr('noSearch'),true);return;}showMessage(tr('loading'));try{const r=await fetch(`${GEO_API}?name=${encodeURIComponent(q)}&count=1&language=en&format=json`);const j=await r.json();const x=j.results?.[0];if(!x)throw new Error('Not found');await loadWeather(x.latitude,x.longitude,[x.name,x.admin1,x.country].filter(Boolean).join(', '));}catch(_){showMessage(tr('searchFailed'),true);}}

  els.language.addEventListener('change',()=>{lang=els.language.value;translateStatic();if(latest)renderAll(latest,currentLocation.name);else showMessage(tr('loading'));renderMap(lastMapLayer);});
  els.searchBtn.addEventListener('click',searchLocation); els.search.addEventListener('keydown',e=>{if(e.key==='Enter')searchLocation();});
  els.retry.addEventListener('click',locateAndLoad);
  document.querySelectorAll('.map-layer-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.map-layer-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderMap(btn.dataset.layer);}));
  window.addEventListener('resize',()=>{if(latest)renderCharts(latest.daily||{});});
  translateStatic(); locateAndLoad(); loadMapSamples();
})();
