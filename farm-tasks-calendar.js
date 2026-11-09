(() => {
  "use strict";

  const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";

  // Paste your Supabase anon/public or publishable key here.
  // NEVER paste the service_role key here.
  const SUPABASE_ANON_KEY = "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";

  const FUNCTION_NAME = "generate-weekly-farm-plan";
  const $ = id => document.getElementById(id);

  const todayISO = () => new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Addis_Ababa",
    year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date());

  const state = {
    db: null, user: null, profile: null,
    crops: [], tasks: [], events: [], holidays: [],
    language: "en", month: new Date(),
    selectedDate: todayISO(), search: ""
  };

  const translations = {
    en: {
      workspace:"FARM WORKSPACE",title:"Farm Tasks & Calendar",
      subtitle:"Plan your work, follow your crops, and stay one step ahead.",
      addTask:"+ Add task",todayTasks:"Tasks today",todayCaption:"Scheduled for today",
      pending:"Pending tasks",pendingCaption:"Awaiting completion",
      crops:"Active crops",cropsCaption:"In your farm",completed:"Completed",
      completedCaption:"Tasks completed",priorityEyebrow:"PRIORITY FARM WORK",
      priorityTitle:"Your priority tasks",priorityText:"Overdue and urgent work appears here first.",
      schedule:"YOUR SCHEDULE",calendar:"Farm calendar",today:"Today",
      harvest:"Harvest",fertilizer:"Fertilizer",protection:"Crop protection",
      holiday:"Holiday",general:"General",selectedDay:"SELECTED DAY",
      addEvent:"+ Add event",stayOnTrack:"STAY ON TRACK",upcoming:"Upcoming tasks",
      growing:"GROWING NOW",myCrops:"My crops",assistant:"SMART FARM ASSISTANT",
      aiTitle:"AI weekly farm plan",aiDescription:"Generate a seven-day farm plan using your crops and farm records.",
      weekStarting:"Week starting",generate:"Generate weekly plan",
      planPlaceholder:"Your personalized weekly plan will appear here.",
      footer:"Your farm, thoughtfully planned.",newTask:"New task",
      taskTitle:"Task title",taskType:"Task type",crop:"Crop",dueDate:"Due date",
      priority:"Priority",description:"Description / notes",cancel:"Cancel",
      saveTask:"Save task",newEvent:"New calendar event",eventTitle:"Event title",
      eventType:"Event type",startDate:"Start date",endDate:"End date",
      saveEvent:"Save event",noItems:"No tasks or events for this date.",
      noTasks:"No upcoming tasks.",noCrops:"No crops found.",
      noPriority:"No urgent or overdue tasks.",noSearch:"No matching tasks.",
      noCrop:"No specific crop",low:"Low",medium:"Medium",high:"High",
      urgent:"Urgent",generalType:"General",planting:"Planting",watering:"Watering",
      weeding:"Weeding",pesticide:"Pesticide",herbicide:"Herbicide",
      inspection:"Inspection",other:"Other",special_date:"Special date",
      pendingStatus:"Pending",completedStatus:"Completed",overdue:"Overdue",
      dueToday:"Due today",complete:"Complete",edit:"Edit",delete:"Delete",
      taskSaved:"Task saved.",taskUpdated:"Task updated.",taskCompleted:"Task completed.",
      taskDeleted:"Task deleted.",eventSaved:"Event saved.",eventDeleted:"Event deleted.",
      languageChanged:"Language changed.",connecting:"Connecting to Supabase…",
      connected:"Connected",notConfigured:"Supabase key is missing",
      noSession:"No active sign-in session. Open this page from your signed-in app.",
      loadError:"Could not load farm data.",saveError:"Could not save. Check the database and RLS policies.",
      aiGenerating:"Preparing your seven-day farm plan…",
      aiError:"AI plan generation failed.",aiSaved:"Your weekly plan was generated and saved.",
      searchPlaceholder:"Search tasks, crops and events"
    },
    am: {
      workspace:"የእርሻ ሥራ ቦታ",title:"የእርሻ ተግባራት እና ቀን መቁጠሪያ",
      subtitle:"ሥራዎን ያቅዱ፣ ሰብሎችዎን ይከታተሉ።",addTask:"+ ተግባር ጨምር",
      todayTasks:"የዛሬ ተግባራት",todayCaption:"ለዛሬ የተያዙ",
      pending:"ያልተጠናቀቁ ተግባራት",pendingCaption:"መጠናቀቅ የሚጠብቁ",
      crops:"ንቁ ሰብሎች",cropsCaption:"በእርሻዎ",completed:"የተጠናቀቁ",
      completedCaption:"የተጠናቀቁ ተግባራት",priorityEyebrow:"ቅድሚያ የሚሰጣቸው የእርሻ ሥራዎች",
      priorityTitle:"ቅድሚያ የሚሰጣቸው ተግባራት",
      priorityText:"ያለፉ እና አስቸኳይ ሥራዎች መጀመሪያ ይታያሉ።",
      schedule:"የእርስዎ መርሃ ግብር",calendar:"የእርሻ ቀን መቁጠሪያ",
      today:"ዛሬ",harvest:"ምርት መሰብሰብ",fertilizer:"ማዳበሪያ",
      protection:"የሰብል ጥበቃ",holiday:"በዓል",general:"አጠቃላይ",
      selectedDay:"የተመረጠው ቀን",addEvent:"+ ክስተት ጨምር",
      stayOnTrack:"በመርሃ ግብር ይቆዩ",upcoming:"ቀጣይ ተግባራት",
      growing:"አሁን የሚበቅሉ",myCrops:"ሰብሎቼ",
      assistant:"ብልህ የእርሻ ረዳት",aiTitle:"AI ሳምንታዊ የእርሻ ዕቅድ",
      aiDescription:"ሰብሎችዎንና የእርሻ መዝገቦችዎን በመጠቀም የሰባት ቀን ዕቅድ ያዘጋጁ።",
      weekStarting:"ሳምንቱ የሚጀምርበት",generate:"ሳምንታዊ ዕቅድ ፍጠር",
      planPlaceholder:"የግል ሳምንታዊ ዕቅድዎ እዚህ ይታያል።",
      footer:"እርሻዎ፣ በጥንቃቄ የታቀደ።",newTask:"አዲስ ተግባር",
      taskTitle:"የተግባር ርዕስ",taskType:"የተግባር ዓይነት",
      crop:"ሰብል",dueDate:"የመጨረሻ ቀን",priority:"ቅድሚያ",
      description:"መግለጫ / ማስታወሻ",cancel:"ሰርዝ",saveTask:"ተግባር አስቀምጥ",
      newEvent:"አዲስ የቀን መቁጠሪያ ክስተት",eventTitle:"የክስተት ርዕስ",
      eventType:"የክስተት ዓይነት",startDate:"መጀመሪያ ቀን",
      endDate:"መጨረሻ ቀን",saveEvent:"ክስተት አስቀምጥ",
      noItems:"ለዚህ ቀን ተግባር ወይም ክስተት የለም።",
      noTasks:"ቀጣይ ተግባር የለም።",noCrops:"ሰብል አልተገኘም።",
      noPriority:"አስቸኳይ ወይም ያለፈ ተግባር የለም።",
      noSearch:"ተዛማጅ ተግባር የለም።",noCrop:"የተለየ ሰብል የለም",
      low:"ዝቅተኛ",medium:"መካከለኛ",high:"ከፍተኛ",urgent:"አስቸኳይ",
      generalType:"አጠቃላይ",planting:"መትከል",watering:"ማጠጣት",
      weeding:"አረም ማረም",pesticide:"ፀረ-ተባይ",herbicide:"ፀረ-አረም",
      inspection:"ምርመራ",other:"ሌላ",special_date:"ልዩ ቀን",
      pendingStatus:"በመጠባበቅ ላይ",completedStatus:"ተጠናቋል",
      overdue:"ጊዜው ያለፈ",dueToday:"ዛሬ የሚያስፈልግ",
      complete:"ጨርሷል",edit:"አርም",delete:"ሰርዝ",
      taskSaved:"ተግባሩ ተቀምጧል።",taskUpdated:"ተግባሩ ተሻሽሏል።",
      taskCompleted:"ተግባሩ ተጠናቋል።",taskDeleted:"ተግባሩ ተሰርዟል።",
      eventSaved:"ክስተቱ ተቀምጧል።",eventDeleted:"ክስተቱ ተሰርዟል።",
      languageChanged:"ቋንቋው ተቀይሯል።",connecting:"ከSupabase ጋር በመገናኘት ላይ…",
      connected:"ተገናኝቷል",notConfigured:"የSupabase ቁልፍ የለም",
      noSession:"የመግቢያ ክፍለ ጊዜ የለም። ከገቡበት መተግበሪያ ይክፈቱ።",
      loadError:"የእርሻ መረጃ መጫን አልተቻለም።",
      saveError:"ማስቀመጥ አልተቻለም። የዳታቤዝ ፖሊሲዎችን ይመልከቱ።",
      aiGenerating:"የሰባት ቀን ዕቅድ በማዘጋጀት ላይ…",
      aiError:"የAI ዕቅድ ማመንጨት አልተቻለም።",
      aiSaved:"ሳምንታዊ ዕቅድ ተፈጥሯል እና ተቀምጧል።",
      searchPlaceholder:"ተግባራትን፣ ሰብሎችን እና ክስተቶችን ፈልግ"
    },
    ti: {
      workspace:"ቦታ ስራሕ ሕርሻ",title:"ስራሕቲ ሕርሻን ካላንደርን",
      subtitle:"ስራሕካ ኣቐድም፣ ዓሌታትካ ተኸታተል።",addTask:"+ ስራሕ ወስኽ",
      todayTasks:"ሎሚ ዘለዉ ስራሕቲ",todayCaption:"ንሎሚ ዝተመደቡ",
      pending:"ዘይተዛዘሙ ስራሕቲ",pendingCaption:"ምዝዛም ይጽበዩ",
      crops:"ንጡፋት ዓሌታት",cropsCaption:"ኣብ ሕርሻኻ",
      completed:"ዝተዛዘሙ",completedCaption:"ዝተዛዘሙ ስራሕቲ",
      priorityEyebrow:"ቀዳምነት ዝወሃቦም ስራሕቲ ሕርሻ",
      priorityTitle:"ቀዳምነት ዘለዎም ስራሕቲ",
      priorityText:"ቅድሚ ኩሉ ዝደንጎዩን ህጹጻትን ስራሕቲ ይርኣዩ።",
      schedule:"መደብካ",calendar:"ካላንደር ሕርሻ",today:"ሎሚ",
      harvest:"ምእካብ",fertilizer:"ድኹዒ",protection:"ምክልኻል ዓሌት",
      holiday:"በዓል",general:"ሓፈሻዊ",selectedDay:"ዝተመርጸ መዓልቲ",
      addEvent:"+ ፍጻመ ወስኽ",stayOnTrack:"ብመደብ ቀጽል",
      upcoming:"ዝመጽኡ ስራሕቲ",growing:"ሕጂ ዝበቝሉ",myCrops:"ዓሌታተይ",
      assistant:"ብልሒ ሓጋዚ ሕርሻ",aiTitle:"AI ሰሙናዊ መደብ ሕርሻ",
      aiDescription:"ብዓሌታትካን መዝገባት ሕርሻኻን ዝተመርኮሰ ሸውዓተ መዓልቲ መደብ ፍጠር።",
      weekStarting:"ሰሙን ዝጅምረሉ",generate:"ሰሙናዊ መደብ ፍጠር",
      planPlaceholder:"ውልቃዊ መደብካ ኣብዚ ክረአ እዩ።",
      footer:"ሕርሻኻ፣ ብጥንቃቐ ዝተመደበ።",newTask:"ሓድሽ ስራሕ",
      taskTitle:"ኣርእስቲ ስራሕ",taskType:"ዓይነት ስራሕ",crop:"ዓሌት",
      dueDate:"ዕለት መወዳእታ",priority:"ቀዳምነት",
      description:"መግለጺ / ማስታወሻ",cancel:"ሰርዝ",saveTask:"ስራሕ ዓቅብ",
      newEvent:"ሓድሽ ፍጻመ ካላንደር",eventTitle:"ኣርእስቲ ፍጻመ",
      eventType:"ዓይነት ፍጻመ",startDate:"መጀመርታ ዕለት",
      endDate:"መወዳእታ ዕለት",saveEvent:"ፍጻመ ዓቅብ",
      noItems:"ንዚ ዕለት ስራሕ ወይ ፍጻመ የለን።",
      noTasks:"ዝመጽእ ስራሕ የለን።",noCrops:"ዓሌት ኣይተረኽበን።",
      noPriority:"ህጹጽ ወይ ዝደንጎየ ስራሕ የለን።",noSearch:"ዝሰማማዕ ስራሕ የለን።",
      noCrop:"ፍሉይ ዓሌት የለን",low:"ትሑት",medium:"ማእከላይ",
      high:"ልዑል",urgent:"ህጹጽ",generalType:"ሓፈሻዊ",
      planting:"ምትካል",watering:"ማይ ምሃብ",weeding:"ሳዕሪ ምእላይ",
      pesticide:"ፀረ-ባልዕ",herbicide:"ፀረ-ሳዕሪ",inspection:"ምርመራ",
      other:"ካልእ",special_date:"ፍሉይ ዕለት",
      pendingStatus:"ይጽበ",completedStatus:"ተዛዚሙ",overdue:"ዝሓለፈ ግዜ",
      dueToday:"ሎሚ ዝድለ",complete:"ዛዚም",edit:"ኣርም",delete:"ሰርዝ",
      taskSaved:"ስራሕ ተዓቂቡ።",taskUpdated:"ስራሕ ተመሓይሹ።",
      taskCompleted:"ስራሕ ተዛዚሙ።",taskDeleted:"ስራሕ ተሰሪዙ።",
      eventSaved:"ፍጻመ ተዓቂቡ።",eventDeleted:"ፍጻመ ተሰሪዙ።",
      languageChanged:"ቋንቋ ተቐይሩ።",connecting:"ይራኸብ…",connected:"ተራኺቡ",
      notConfigured:"ቁልፊ Supabase የለን",
      noSession:"ናይ ምእታው ክፍለ ግዜ የለን። ካብ ዝኣተኻሉ መተግበሪ ክፈት።",
      loadError:"ሓበሬታ ሕርሻ ምጽዓን ኣይተኻእለን።",
      saveError:"ምዕቃብ ኣይተኻእለን።",aiGenerating:"መደብ ይዳሎ…",
      aiError:"መደብ AI ምፍጣር ኣይተኻእለን።",
      aiSaved:"መደብ ተፈጢሩን ተዓቂቡን።",
      searchPlaceholder:"ስራሕቲ፣ ዓሌታትን ፍጻመታትን ድለ"
    },
    om: {
      workspace:"IDDOO HOJII QONNAA",title:"Hojii Qonnaa fi Kaalaandarii",
      subtitle:"Hojii kee karoorfadhu, midhaan kee hordofi.",addTask:"+ Hojii dabali",
      todayTasks:"Hojii har'aa",todayCaption:"Har'aaf karoorfame",
      pending:"Hojii hafan",pendingCaption:"Xumuramuu eeggata",
      crops:"Midhaan jiru",cropsCaption:"Qonna kee keessatti",
      completed:"Xumurame",completedCaption:"Hojii xumurame",
      priorityEyebrow:"HOJIIWWAN QONNAA DURSAA",priorityTitle:"Hojiiwwan dursa qaban",
      priorityText:"Jalqaba hojiiwwan yeroo darban fi ariifachiisoo ilaali.",
      schedule:"KAROORA KEE",calendar:"Kaalaandarii qonnaa",today:"Har'a",
      harvest:"Sassaabuu",fertilizer:"Xaa'oo",protection:"Eegumsa midhaanii",
      holiday:"Ayyaana",general:"Waliigalaa",selectedDay:"GUYYAA FILATAME",
      addEvent:"+ Taatee dabali",stayOnTrack:"KAROORA EEGI",upcoming:"Hojiiwwan dhufan",
      growing:"AMMA BIQILAA JIRU",myCrops:"Midhaan koo",
      assistant:"GARGAARAA QONNAA OGEESSA",aiTitle:"Karoora qonnaa torbanii AI",
      aiDescription:"Midhaan kee fi galmee qonnaa kee fayyadamuun karoora guyyaa torbaa uumi.",
      weekStarting:"Torban jalqabu",generate:"Karoora torbanii uumi",
      planPlaceholder:"Karoora dhuunfaa kee asitti argita.",
      footer:"Qonna kee, sirriitti karoorfame.",newTask:"Hojii haaraa",
      taskTitle:"Mata-duree hojii",taskType:"Gosa hojii",crop:"Midhaan",
      dueDate:"Guyyaa xumuraa",priority:"Dursa",description:"Ibsa / yaadannoo",
      cancel:"Dhiisi",saveTask:"Hojii olkaa'i",newEvent:"Taatee kaalaandarii haaraa",
      eventTitle:"Mata-duree taatee",eventType:"Gosa taatee",
      startDate:"Guyyaa jalqabaa",endDate:"Guyyaa dhumaa",saveEvent:"Taatee olkaa'i",
      noItems:"Guyyaa kanaaf hojii ykn taateen hin jiru.",noTasks:"Hojii dhufu hin jiru.",
      noCrops:"Midhaan hin argamne.",noPriority:"Hojii ariifachiisaa ykn yeroo darbe hin jiru.",
      noSearch:"Hojii walsimu hin jiru.",noCrop:"Midhaan addaa hin jiru",
      low:"Xiqqaa",medium:"Giddu galeessa",high:"Ol'aanaa",urgent:"Ariifachiisaa",
      generalType:"Waliigalaa",planting:"Dhaabuu",watering:"Obaasuu",
      weeding:"Arama baasuu",pesticide:"Qoricha ilbiisotaa",
      herbicide:"Qoricha aramaa",inspection:"Sakatta'iinsa",other:"Kan biraa",
      special_date:"Guyyaa addaa",pendingStatus:"Eegaa jira",
      completedStatus:"Xumurame",overdue:"Yeroon darbe",dueToday:"Har'a raawwadhu",
      complete:"Xumuri",edit:"Gulaali",delete:"Haqi",
      taskSaved:"Hojiin olkaa'ameera.",taskUpdated:"Hojiin fooyya'eera.",
      taskCompleted:"Hojiin xumurameera.",taskDeleted:"Hojiin haqameera.",
      eventSaved:"Taateen olkaa'ameera.",eventDeleted:"Taateen haqameera.",
      languageChanged:"Afaan jijjiirameera.",connecting:"Wal qunnamaa jira…",
      connected:"Wal qabateera",notConfigured:"Furtuun Supabase hin jiru",
      noSession:"Seensa hin argamne. Appii seente keessaa fuula kana bani.",
      loadError:"Odeeffannoo qonnaa fe'uun hin danda'amne.",
      saveError:"Olkaa'uun hin danda'amne.",aiGenerating:"Karoora qopheessaa jira…",
      aiError:"Karoora AI uumuu hin dandeenye.",aiSaved:"Karoora torbanii uumameera.",
      searchPlaceholder:"Hojii, midhaan fi taateewwan barbaadi"
    },
    so: {
      workspace:"GOOBTA SHAQADA BEERTA",title:"Hawlaha Beerta iyo Jadwalka",
      subtitle:"Qorshee shaqadaada oo la soco dalagyadaada.",addTask:"+ Ku dar hawl",
      todayTasks:"Hawlaha maanta",todayCaption:"Maanta loo qorsheeyay",
      pending:"Hawlaha sugaya",pendingCaption:"Sugaya in la dhammeeyo",
      crops:"Dalagyada firfircoon",cropsCaption:"Beertaada",
      completed:"La dhammeeyay",completedCaption:"Hawlaha dhammaaday",
      priorityEyebrow:"HAWLAHA BEERTA EE MUHIIMKA AH",
      priorityTitle:"Hawlaha mudnaanta leh",
      priorityText:"Marka hore qabso hawlaha dhacay iyo kuwa degdegga ah.",
      schedule:"JADWALKAAGA",calendar:"Jadwalka beerta",today:"Maanta",
      harvest:"Goosasho",fertilizer:"Bacrimin",protection:"Ilaalinta dalagga",
      holiday:"Fasax",general:"Guud",selectedDay:"MAALINTA LA DOORTAY",
      addEvent:"+ Ku dar dhacdo",stayOnTrack:"JADWALKA RAAC",
      upcoming:"Hawlaha soo socda",growing:"HADDA KORAYA",myCrops:"Dalagyadayda",
      assistant:"CAAWIYAHA BEERTA EE CAQLIGA LEH",
      aiTitle:"Qorshaha beerta toddobaadlaha AI",
      aiDescription:"Samee qorshe toddoba maalmood ah oo ku salaysan dalagyadaada iyo diiwaannada beerta.",
      weekStarting:"Toddobaadka bilaabmaya",generate:"Samee qorshe toddobaadle",
      planPlaceholder:"Qorshahaaga gaarka ah halkan ayuu ka muuqan doonaa.",
      footer:"Beertaada, si wanaagsan loo qorsheeyay.",newTask:"Hawl cusub",
      taskTitle:"Cinwaanka hawsha",taskType:"Nooca hawsha",crop:"Dalag",
      dueDate:"Taariikhda kama dambaysta",priority:"Mudnaan",
      description:"Faahfaahin / qoraal",cancel:"Jooji",saveTask:"Kaydi hawsha",
      newEvent:"Dhacdo jadwal cusub",eventTitle:"Cinwaanka dhacdada",
      eventType:"Nooca dhacdada",startDate:"Taariikhda bilowga",
      endDate:"Taariikhda dhammaadka",saveEvent:"Kaydi dhacdada",
      noItems:"Ma jiraan hawlo ama dhacdooyin maalintan.",noTasks:"Hawl soo socota ma jirto.",
      noCrops:"Dalag lama helin.",noPriority:"Ma jiraan hawlo degdeg ah ama dhacay.",
      noSearch:"Hawl ku habboon lama helin.",noCrop:"Dalag gaar ah ma jiro",
      low:"Hoose",medium:"Dhexdhexaad",high:"Sare",urgent:"Degdeg",
      generalType:"Guud",planting:"Beerid",watering:"Waraabin",
      weeding:"Jaridda haramaha",pesticide:"Daawo cayayaan",
      herbicide:"Daawo haramaha",inspection:"Kormeer",other:"Kale",
      special_date:"Maalin gaar ah",pendingStatus:"Sugaya",
      completedStatus:"Dhammaaday",overdue:"Waqtigii dhaafay",
      dueToday:"Maanta la qabanayo",complete:"Dhammaystir",
      edit:"Wax ka beddel",delete:"Tirtir",taskSaved:"Hawsha waa la kaydiyay.",
      taskUpdated:"Hawsha waa la cusboonaysiiyay.",
      taskCompleted:"Hawsha waa la dhammeeyay.",taskDeleted:"Hawsha waa la tirtiray.",
      eventSaved:"Dhacdada waa la kaydiyay.",eventDeleted:"Dhacdada waa la tirtiray.",
      languageChanged:"Luqadda waa la beddelay.",connecting:"Waa la xiriirayaa…",
      connected:"Waa la xiriiray",notConfigured:"Furaha Supabase ma jiro",
      noSession:"Ma jiro galitaan firfircoon. Ka fur app-ka aad ku gashay.",
      loadError:"Xogta beerta lama soo rari karin.",saveError:"Lama kaydin karin.",
      aiGenerating:"Qorshaha toddobaadka waa la diyaarinayaa…",
      aiError:"Qorshaha AI lama samayn karin.",aiSaved:"Qorshaha toddobaadka waa la sameeyay oo la kaydiyay.",
      searchPlaceholder:"Raadi hawlo, dalagyo iyo dhacdooyin"
    }
  };

  const t = key => translations[state.language]?.[key] || translations.en[key] || key;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])
  );

  const addDays = (iso, n) => {
    const d = new Date(iso + "T12:00:00");
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };

  const categoryColor = type => ({
    harvest:"#26945b", fertilizer:"#d69a2b",
    pesticide:"#8b6ac8", herbicide:"#8b6ac8",
    holiday:"#df6f70", special_date:"#df6f70",
    general:"#6b9bbd", planting:"#4b9d86",
    watering:"#4385c5", inspection:"#8b9a72"
  })[type] || "#6b9bbd";

  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 3500);
  }

  function setConnection(message, good=false) {
    $("connectionStatus").textContent = message;
    $("connectionStatus").style.color = good ? "#d8eaa4" : "#ffd1a8";
  }

  function setLanguage(language) {
    state.language = translations[language] ? language : "en";
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    $("globalSearch").placeholder = t("searchPlaceholder");
    $("languageSelect").value = state.language;
    translateOptions();
    renderAll();
  }

  function translateOptions() {
    const ids = ["taskType","eventType","taskPriority"];
    ids.forEach(id => {
      const el = $(id);
      [...el.options].forEach(o => {
        const key = o.value === "general" ? "generalType" : o.value;
        o.textContent = t(key);
      });
    });
    ["taskCrop","eventCrop"].forEach(id => {
      if ($(id).options[0]) $(id).options[0].textContent = t("noCrop");
    });
  }

  function setGreeting() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    $("greetingText").textContent = greeting;
    const name = state.profile?.full_name || "Farmer";
    $("farmerName").textContent = name;
    $("farmerEmail").textContent = state.user?.email || "";
    $("avatarInitials").textContent = name.trim().charAt(0).toUpperCase();
  }

  function allItemsForDate(date) {
    const tasks = state.tasks.filter(x => x.scheduled_date === date && x.status !== "cancelled")
      .map(x => ({...x,_kind:"task",_date:x.scheduled_date}));
    const events = state.events.filter(x => {
      const end = x.end_date || x.start_date;
      return date >= x.start_date && date <= end;
    }).map(x => ({...x,_kind:"event",_date:x.start_date}));
    const holidays = state.holidays.filter(x => x.holiday_date === date)
      .map(x => ({...x,title:x.title_en || "Public holiday",event_type:"holiday",_kind:"holiday",_date:date}));
    return [...tasks,...events,...holidays];
  }

  function renderCalendar() {
    const year = state.month.getFullYear();
    const month = state.month.getMonth();
    const first = new Date(year,month,1);
    const offset = (first.getDay()+6)%7;
    const start = new Date(year,month,1-offset);
    const today = todayISO();

    $("monthLabel").textContent = first.toLocaleDateString(state.language,{
      month:"long",year:"numeric"
    });

    $("weekdayLabels").innerHTML = Array.from({length:7},(_,i) => {
      const d = new Date(2024,0,1+i);
      return `<span>${esc(d.toLocaleDateString(state.language,{weekday:"short"}))}</span>`;
    }).join("");

    $("calendarDays").innerHTML = Array.from({length:42},(_,i) => {
      const d = new Date(start);
      d.setDate(start.getDate()+i);
      const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
      const items = allItemsForDate(iso);
      const classes = [
        "calendar-day",
        d.getMonth()!==month ? "other-month" : "",
        iso===today ? "today" : "",
        iso===state.selectedDate ? "selected" : ""
      ].join(" ");

      const dots = items.slice(0,4).map(x =>
        `<i style="background:${categoryColor(x.event_type || x.task_type)}"></i>`
      ).join("");

      return `<button type="button" class="${classes}" data-date="${iso}">
        <span class="day-number">${d.getDate()}</span>
        <span class="day-dots">${dots}${items.length>4?`<b class="more-dots">+${items.length-4}</b>`:""}</span>
      </button>`;
    }).join("");

    $("calendarDays").querySelectorAll("[data-date]").forEach(button => {
      button.addEventListener("click",() => {
        state.selectedDate = button.dataset.date;
        renderCalendar();
        renderSelectedDate();
      });
    });
    renderSelectedDate();
  }

  function renderSelectedDate() {
    $("selectedDateLabel").textContent = new Date(state.selectedDate+"T12:00:00")
      .toLocaleDateString(state.language,{weekday:"long",month:"long",day:"numeric",year:"numeric"});

    const items = allItemsForDate(state.selectedDate);
    if (!items.length) {
      $("selectedDateItems").innerHTML = `<p class="empty">${esc(t("noItems"))}</p>`;
      return;
    }

    $("selectedDateItems").innerHTML = items.map(x => {
      const isTask = x._kind === "task";
      const type = x.task_type || x.event_type || "general";
      return `<article class="day-item">
        <strong>${esc(x.title)}</strong>
        <small>${esc(t(type))}${x.description ? " · "+esc(x.description) : ""}</small>
        ${isTask ? `<div class="item-actions">
          ${x.status!=="completed"?`<button data-complete="${x.id}">${esc(t("complete"))}</button>`:""}
          <button data-edit="${x.id}">${esc(t("edit"))}</button>
          <button class="danger" data-delete-task="${x.id}">${esc(t("delete"))}</button>
        </div>` : x._kind==="event" ? `<div class="item-actions"><button class="danger" data-delete-event="${x.id}">${esc(t("delete"))}</button></div>` : ""}
      </article>`;
    }).join("");

    $("selectedDateItems").querySelectorAll("[data-complete]").forEach(b => b.onclick=()=>completeTask(b.dataset.complete));
    $("selectedDateItems").querySelectorAll("[data-edit]").forEach(b => b.onclick=()=>editTask(b.dataset.edit));
    $("selectedDateItems").querySelectorAll("[data-delete-task]").forEach(b => b.onclick=()=>deleteTask(b.dataset.deleteTask));
    $("selectedDateItems").querySelectorAll("[data-delete-event]").forEach(b => b.onclick=()=>deleteEvent(b.dataset.deleteEvent));
  }

  function renderStats() {
    const today = todayISO();
    $("statToday").textContent = state.tasks.filter(x=>x.scheduled_date===today && x.status!=="completed").length;
    $("statPending").textContent = state.tasks.filter(x=>x.status!=="completed" && x.status!=="cancelled").length;
    $("statCrops").textContent = state.crops.length;
    $("statCompleted").textContent = state.tasks.filter(x=>x.status==="completed").length;
  }

  function renderUpcoming() {
    const today = todayISO();
    const search = state.search.toLowerCase();
    const list = state.tasks
      .filter(x=>x.status!=="completed" && x.status!=="cancelled")
      .filter(x=>(x.title||"").toLowerCase().includes(search) || (x.description||"").toLowerCase().includes(search))
      .sort((a,b)=>a.scheduled_date.localeCompare(b.scheduled_date))
      .slice(0,12);

    $("upcomingTasks").innerHTML = list.length ? list.map(x=>`
      <article class="task-row">
        <strong>${esc(x.title)}</strong>
        <small>${esc(x.scheduled_date)} · ${esc(t(x.priority||"medium"))}</small>
        <div class="item-actions">
          <button data-upcoming-complete="${x.id}">${esc(t("complete"))}</button>
          <button data-upcoming-edit="${x.id}">${esc(t("edit"))}</button>
        </div>
      </article>`).join("") : `<p class="empty">${esc(search?t("noSearch"):t("noTasks"))}</p>`;

    $("upcomingTasks").querySelectorAll("[data-upcoming-complete]").forEach(b=>b.onclick=()=>completeTask(b.dataset.upcomingComplete));
    $("upcomingTasks").querySelectorAll("[data-upcoming-edit]").forEach(b=>b.onclick=()=>editTask(b.dataset.upcomingEdit));
  }

  function renderPriority() {
    const today = todayISO();
    const list = state.tasks.filter(x=>x.status!=="completed" && x.status!=="cancelled")
      .filter(x=>x.scheduled_date<today || ["urgent","high"].includes(x.priority))
      .sort((a,b)=>a.scheduled_date.localeCompare(b.scheduled_date))
      .slice(0,5);

    $("priorityTasks").innerHTML = list.length ? list.map(x=>`
      <article class="priority-item">
        <div><strong>${esc(x.title)}</strong>
        <small>${esc(x.scheduled_date)} · ${esc(t(x.priority||"medium"))}</small></div>
        <div class="priority-actions"><span class="priority-tag">${esc(x.scheduled_date<today?t("overdue"):t("dueToday"))}</span>
        <button data-priority-complete="${x.id}">${esc(t("complete"))}</button></div>
      </article>`).join("") : `<p class="empty">${esc(t("noPriority"))}</p>`;

    $("priorityTasks").querySelectorAll("[data-priority-complete]").forEach(b=>b.onclick=()=>completeTask(b.dataset.priorityComplete));
  }

  function renderCrops() {
    $("cropList").innerHTML = state.crops.length ? state.crops.slice(0,10).map((c,i)=>`
      <div class="crop-row">
        <span class="crop-avatar">${["🌽","🌾","🥬","☕","🫘","🍅"][i%6]}</span>
        <div><strong>${esc(c.crop_name||c.name||"Crop")}</strong>
        <small>${esc(c.variety||c.status||"")}</small></div>
      </div>`).join("") : `<p class="empty">${esc(t("noCrops"))}</p>`;
  }

  function populateCropSelects() {
    ["taskCrop","eventCrop"].forEach(id=>{
      const el=$(id), current=el.value;
      el.innerHTML=`<option value="">${esc(t("noCrop"))}</option>`+
        state.crops.map(c=>`<option value="${esc(c.id)}">${esc(c.crop_name||c.name||"Crop")}</option>`).join("");
      el.value=current;
    });
  }

  function renderAll() {
    setGreeting();
    renderStats();
    renderCalendar();
    renderUpcoming();
    renderPriority();
    renderCrops();
    populateCropSelects();
  }

  async function refreshData() {
    const uid=state.user.id;
    const [profile,crops,tasks,events]=await Promise.all([
      state.db.from("farmer_profiles").select("*").eq("id",uid).maybeSingle(),
      state.db.from("my_crops").select("*").eq("farmer_id",uid),
      state.db.from("farm_tasks").select("*").eq("farmer_id",uid).order("scheduled_date"),
      state.db.from("farm_calendar_events").select("*").eq("farmer_id",uid).order("start_date")
    ]);

    for (const r of [profile,crops,tasks,events]) {
      if(r.error) throw r.error;
    }

    state.profile=profile.data||{};
    state.crops=crops.data||[];
    state.tasks=tasks.data||[];
    state.events=events.data||[];

    const holidayResult=await state.db.from("public_holidays").select("*")
      .gte("holiday_date",`${state.month.getFullYear()-1}-01-01`)
      .lte("holiday_date",`${state.month.getFullYear()+2}-12-31`);
    state.holidays=holidayResult.error?[]:(holidayResult.data||[]);

    renderAll();

    const saved=await state.db.from("farm_weekly_plans")
      .select("plan_title,plan_summary,plan_data,week_start,language")
      .eq("farmer_id",uid).order("week_start",{ascending:false}).limit(1).maybeSingle();

    if(!saved.error && saved.data) {
      if(saved.data.language && translations[saved.data.language]) setLanguage(saved.data.language);
      renderPlan({
        title:saved.data.plan_title,
        summary:saved.data.plan_summary,
        days:saved.data.plan_data
      });
    }
  }

  function taskPayload() {
    return {
      farmer_id:state.user.id,
      crop_id:$("taskCrop").value||null,
      title:$("taskTitle").value.trim(),
      description:$("taskDescription").value.trim()||null,
      task_type:$("taskType").value,
      priority:$("taskPriority").value,
      status:"pending",
      scheduled_date:$("taskDate").value
    };
  }

  async function saveTask(e) {
    e.preventDefault();
    if(!state.user) return toast(t("noSession"));

    const id=$("taskId").value;
    const payload=taskPayload();
    const result=id
      ? await state.db.from("farm_tasks").update(payload).eq("id",id).eq("farmer_id",state.user.id)
      : await state.db.from("farm_tasks").insert(payload);

    if(result.error) {
      console.error("Task save error:",result.error);
      return toast(t("saveError")+" "+result.error.message);
    }

    $("taskDialog").close();
    $("taskForm").reset();
    $("taskId").value="";
    await refreshData();
    toast(t(id?"taskUpdated":"taskSaved"));
  }

  function editTask(id) {
    const x=state.tasks.find(t=>t.id===id);
    if(!x) return;
    $("taskId").value=x.id;
    $("taskTitle").value=x.title;
    $("taskType").value=x.task_type||"general";
    $("taskCrop").value=x.crop_id||"";
    $("taskDate").value=x.scheduled_date;
    $("taskPriority").value=x.priority||"medium";
    $("taskDescription").value=x.description||"";
    $("taskDialogTitle").textContent=t("edit");
    $("taskDialog").showModal();
  }

  async function completeTask(id) {
    const {error}=await state.db.from("farm_tasks")
      .update({status:"completed",completed_at:new Date().toISOString()})
      .eq("id",id).eq("farmer_id",state.user.id);
    if(error) return toast(t("saveError")+" "+error.message);
    await refreshData();
    toast(t("taskCompleted"));
  }

  async function deleteTask(id) {
    if(!confirm(t("delete")+"?")) return;
    const {error}=await state.db.from("farm_tasks").delete()
      .eq("id",id).eq("farmer_id",state.user.id);
    if(error) return toast(t("saveError")+" "+error.message);
    await refreshData();
    toast(t("taskDeleted"));
  }

  async function saveEvent(e) {
    e.preventDefault();
    if(!state.user) return toast(t("noSession"));

    const payload={
      farmer_id:state.user.id,
      crop_id:$("eventCrop").value||null,
      title:$("eventTitle").value.trim(),
      description:$("eventDescription").value.trim()||null,
      event_type:$("eventType").value,
      start_date:$("eventStart").value,
      end_date:$("eventEnd").value||null,
      all_day:true
    };

    const {error}=await state.db.from("farm_calendar_events").insert(payload);
    if(error) {
      console.error("Event save error:",error);
      return toast(t("saveError")+" "+error.message);
    }
    $("eventDialog").close();
    $("eventForm").reset();
    await refreshData();
    toast(t("eventSaved"));
  }

  async function deleteEvent(id) {
    if(!confirm(t("delete")+"?")) return;
    const {error}=await state.db.from("farm_calendar_events").delete()
      .eq("id",id).eq("farmer_id",state.user.id);
    if(error) return toast(t("saveError")+" "+error.message);
    await refreshData();
    toast(t("eventDeleted"));
  }

  function renderPlan(plan) {
    const root=$("weeklyPlanResult");
    const days=Array.isArray(plan)?plan:(plan?.days||[]);
    if(!days.length) {
      root.innerHTML=`<p class="empty">${esc(t("planPlaceholder"))}</p>`;
      return;
    }

    root.innerHTML=
      (plan.summary?`<p class="plan-summary">${esc(plan.summary)}</p>`:"")+
      (plan.title?`<h3 class="plan-title">${esc(plan.title)}</h3>`:"")+
      `<div class="plan-days">`+
      days.map(day=>{
        const actions=day.actions||day.tasks||day.recommendations||[];
        return `<article class="plan-day">
          <h3>${esc(day.day_name||day.day||day.date||"Daily plan")}</h3>
          <ul>${actions.map(a=>{
            if(typeof a==="string") return `<li>${esc(a)}</li>`;
            return `<li><strong>${esc(a.action||a.task||a.title||a.activity||"Farm activity")}</strong>
              ${a.crop?`<small>${esc(a.crop)}</small>`:""}
              ${a.reason?`<small>${esc(a.reason)}</small>`:""}
              ${a.estimated_time?`<small>${esc(a.estimated_time)}</small>`:""}
            </li>`;
          }).join("")}</ul>
        </article>`;
      }).join("")+
      `</div>`;
  }

  async function generatePlan() {
    if(!state.user) return toast(t("noSession"));

    const button=$("generatePlanBtn");
    const root=$("weeklyPlanResult");
    const weekStart=$("weekStart").value||todayISO();

    button.disabled=true;
    root.innerHTML=`<p class="empty">${esc(t("aiGenerating"))}</p>`;

    try {
      const {data,error}=await state.db.functions.invoke(FUNCTION_NAME,{
        body:{language:state.language,week_start:weekStart}
      });

      if(error) {
        let detail=error.message||"Edge Function request failed";
        if(error.context && typeof error.context.json==="function") {
          const body=await error.context.json().catch(()=>null);
          if(body?.error) detail=body.error;
        }
        throw new Error(detail);
      }

      if(data?.error) throw new Error(data.error);
      if(!data?.plan) throw new Error("The AI function returned no plan.");

      renderPlan(data.plan);
      toast(t("aiSaved"));
    } catch(error) {
      console.error("AI weekly plan error:",error);
      root.innerHTML=`<p class="empty">${esc(t("aiError"))}<br><br>${esc(error.message)}</p>`;
      toast(error.message||t("aiError"));
    } finally {
      button.disabled=false;
      button.textContent=t("generate");
    }
  }

  function bindUI() {
    $("languageSelect").addEventListener("change",e=>{
      setLanguage(e.target.value);
      toast(t("languageChanged"));
    });

    $("globalSearch").addEventListener("input",e=>{
      state.search=e.target.value.toLowerCase();
      renderUpcoming();
    });

    const openTask=()=>{
      $("taskForm").reset();
      $("taskId").value="";
      $("taskDate").value=state.selectedDate;
      $("taskDialogTitle").textContent=t("newTask");
      populateCropSelects();
      $("taskDialog").showModal();
    };

    $("addTaskTop").addEventListener("click",openTask);
    $("addPriorityTask").addEventListener("click",openTask);

    $("addEventBtn").addEventListener("click",()=>{
      $("eventForm").reset();
      $("eventStart").value=state.selectedDate;
      populateCropSelects();
      $("eventDialog").showModal();
    });

    $("taskForm").addEventListener("submit",saveTask);
    $("eventForm").addEventListener("submit",saveEvent);

    document.querySelectorAll("[data-close]").forEach(b=>{
      b.addEventListener("click",()=>$(b.dataset.close).close());
    });

    $("prevMonth").addEventListener("click",()=>{
      state.month.setMonth(state.month.getMonth()-1);
      renderCalendar();
    });

    $("nextMonth").addEventListener("click",()=>{
      state.month.setMonth(state.month.getMonth()+1);
      renderCalendar();
    });

    $("todayBtn").addEventListener("click",()=>{
      state.month=new Date();
      state.selectedDate=todayISO();
      renderCalendar();
    });

    $("generatePlanBtn").addEventListener("click",generatePlan);
  }

  async function init() {
    // IMPORTANT: render the page before checking Supabase.
    // A missing key or login session must never hide the calendar.
    bindUI();
    $("weekStart").value=todayISO();
    $("taskDate").value=todayISO();
    $("eventStart").value=todayISO();
    setLanguage("en");
    setConnection(t("connecting"));

    if(!window.supabase?.createClient) {
      setConnection("Supabase library failed to load");
      toast("Supabase CDN did not load. Check your internet connection.");
      return;
    }

    if(!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes("PASTE_YOUR")) {
      setConnection(t("notConfigured"));
      toast(t("notConfigured")+" — calendar is visible, but database features need the public key.");
      return;
    }

    try {
      state.db=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
      const {data,error}=await state.db.auth.getSession();
      if(error) throw error;

      if(!data.session) {
        setConnection(t("noSession"));
        toast(t("noSession"));
        return;
      }

      state.user=data.session.user;
      await refreshData();
      setConnection(t("connected"),true);

      state.db.auth.onAuthStateChange((_event,session)=>{
        state.user=session?.user||null;
        if(state.user) {
          refreshData().catch(error=>{
            console.error("Data refresh failed:",error);
            setConnection(t("loadError"));
          });
        } else {
          state.profile=null;
          state.crops=[];
          state.tasks=[];
          state.events=[];
          state.holidays=[];
          renderAll();
          setConnection(t("noSession"));
        }
      });
    } catch(error) {
      console.error("AgriNova startup error:",error);
      setConnection(t("loadError"));
      toast(t("loadError")+" "+error.message);
    }
  }

  document.addEventListener("DOMContentLoaded",init);
})();