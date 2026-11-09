/* AgriNova Daily Farm — Supabase-backed daily records. No localStorage is used. */
(() => {
  'use strict';

  const SUPABASE_URL = window.AGRINOVA_SUPABASE_URL || 'https://iqxfusbouchrapfxonxe.supabase.co';
  const SUPABASE_ANON_KEY = window.AGRINOVA_SUPABASE_ANON_KEY || 'sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv';
  const TABLE = 'daily_farm_records';
  const $ = id => document.getElementById(id);
  const state = { db: null, user: null, activities: [], observations: [], assessment: '', weather: {}, crops: [], language: 'en', saved: false, busy: false };

  const translations = {
    en: {
      eyebrow:'FARM MANAGEMENT',pageTitle:'Daily Farm',pageSubtitle:'Record your farm work, monitor field conditions, and assess your day.',today:'Today',notSaved:'Not saved yet',saved:'Saved to Supabase',dailyLogLabel:'YOUR DAILY RECORD',dailyLogTitle:'Daily Farm Log',dailyLogIntro:'Keep a clear record of the work done and what you noticed in your fields.',activitiesTitle:'Farm Activities',activitiesIntro:'Record the work performed on your farm today.',activityType:'Activity type *',chooseActivity:'Choose an activity',relatedCrop:'Related crop / field',noSpecificCrop:'Not crop-specific',activityDate:'Date',quantity:'Quantity / amount (optional)',activityDetails:'Activity details *',addActivity:'Add Activity',noActivities:'No activities added yet.',observationsTitle:'Crop & Field Observations',observationsIntro:'Record what you noticed about your crops, soil, water, and field conditions.',observationCategory:'Observation category *',chooseCategory:'Choose a category',observedCrop:'Crop / field',generalField:'General field observation',priority:'Priority',normal:'Normal',needsAttention:'Needs attention',urgent:'Urgent',observationDetails:'What did you notice? *',addObservation:'Add Observation',noObservations:'No observations added yet.',assessmentTitle:"Farmer's Daily Assessment",assessmentQuestion:'How would you assess your farm today?',excellent:'Excellent',good:'Good',moderate:'Moderate',poor:'Poor',weatherTitle:'Weather Context',weatherIntro:"Weather conditions can affect today's farm work.",localWeather:'LOCAL WEATHER',weatherLoading:'Loading weather…',weatherImpact:'How did weather affect your farm?',noImpact:'No noticeable impact',helpful:'Helpful',delayed:'Delayed farm work',cropDamage:'Damaged crops',waterShortage:'Water shortage',other:'Other',weatherNotes:'Weather impact details (optional)',saveHint:'Your record will be securely saved to your AgriNova Supabase account.',saveRecord:'Save Daily Record',saving:'Saving…',footer:'Your daily farm records, securely stored.',searchPlaceholder:'Search your daily farm log…',activityAdded:'Activity added.',observationAdded:'Observation added.',removed:'Entry removed.',savedMessage:'Daily farm record saved successfully.',loadError:'Could not load your daily record.',saveError:'Could not save your record.',loginRequired:'Please sign in to use Daily Farm.',configError:'Configure your Supabase publishable/anon key in the shared AgriNova configuration before using this page.',connectionError:'Could not connect to Supabase. Check your connection and project settings.',weatherUnavailable:'Weather information is unavailable.',noCropRecords:'No crop records found',confirmRemove:'Remove this entry?',emptySearch:'No matching entries found.',date:'Date',activity:'Activity',observation:'Observation',amount:'Amount',crop:'Crop / field',details:'Details',remove:'Remove',chooseCrop:'Choose a crop or field',noCrop:'No crop selected',searchResults:'Search results'
    },
    am: {
      eyebrow:'የእርሻ አስተዳደር',pageTitle:'ዕለታዊ እርሻ',pageSubtitle:'የእርሻ ሥራዎን ይመዝግቡ፣ የማሳውን ሁኔታ ይከታተሉ እና ቀኑን ይገምግሙ።',today:'ዛሬ',notSaved:'ገና አልተቀመጠም',saved:'በSupabase ተቀምጧል',dailyLogLabel:'የዕለት መዝገብዎ',dailyLogTitle:'ዕለታዊ የእርሻ መዝገብ',dailyLogIntro:'የተከናወኑ ሥራዎችንና በማሳዎ ያዩትን ነገር ይመዝግቡ።',activitiesTitle:'የእርሻ ሥራዎች',activitiesIntro:'ዛሬ በእርሻዎ የተከናወኑ ሥራዎችን ይመዝግቡ።',activityType:'የሥራ ዓይነት *',chooseActivity:'የሥራ ዓይነት ይምረጡ',relatedCrop:'ተዛማጅ ሰብል / ማሳ',noSpecificCrop:'ከተወሰነ ሰብል ጋር ያልተያያዘ',activityDate:'ቀን',quantity:'መጠን (አማራጭ)',activityDetails:'የሥራው ዝርዝር *',addActivity:'ሥራ ጨምር',noActivities:'እስካሁን ሥራ አልተጨመረም።',observationsTitle:'የሰብልና የማሳ ምልከታዎች',observationsIntro:'ስለ ሰብል፣ አፈር፣ ውሃና የማሳ ሁኔታ ያዩትን ይመዝግቡ።',observationCategory:'የምልከታ ምድብ *',chooseCategory:'ምድብ ይምረጡ',observedCrop:'ሰብል / ማሳ',generalField:'አጠቃላይ የማሳ ምልከታ',priority:'ቅድሚያ',normal:'መደበኛ',needsAttention:'ትኩረት ይፈልጋል',urgent:'አስቸኳይ',observationDetails:'ምን አስተዋሉ? *',addObservation:'ምልከታ ጨምር',noObservations:'እስካሁን ምልከታ አልተጨመረም።',assessmentTitle:'የአርሶ አደሩ ዕለታዊ ግምገማ',assessmentQuestion:'ዛሬ እርሻዎን እንዴት ይገመግማሉ?',excellent:'በጣም ጥሩ',good:'ጥሩ',moderate:'መካከለኛ',poor:'ደካማ',weatherTitle:'የአየር ሁኔታ',weatherIntro:'የአየር ሁኔታ የዛሬውን የእርሻ ሥራ ሊነካ ይችላል።',localWeather:'የአካባቢ አየር ሁኔታ',weatherLoading:'አየር ሁኔታ በመጫን ላይ…',weatherImpact:'አየር ሁኔታው እርሻዎን እንዴት ነካው?',noImpact:'የሚታይ ተፅዕኖ የለም',helpful:'ጠቃሚ ነበር',delayed:'የእርሻ ሥራን አዘገየ',cropDamage:'ሰብልን ጎዳ',waterShortage:'የውሃ እጥረት',other:'ሌላ',weatherNotes:'የአየር ተፅዕኖ ዝርዝር (አማራጭ)',saveHint:'መዝገብዎ በAgriNova Supabase መለያዎ በደህና ይቀመጣል።',saveRecord:'ዕለታዊ መዝገብ አስቀምጥ',saving:'በማስቀመጥ ላይ…',footer:'የዕለት የእርሻ መዝገቦችዎ በደህና ተቀምጠዋል።',searchPlaceholder:'በዕለታዊ መዝገብዎ ውስጥ ይፈልጉ…',activityAdded:'ሥራው ተጨምሯል።',observationAdded:'ምልከታው ተጨምሯል።',removed:'መዝገቡ ተወግዷል።',savedMessage:'ዕለታዊ የእርሻ መዝገብ ተቀምጧል።',loadError:'የዕለት መዝገብዎን መጫን አልተቻለም።',saveError:'መዝገብዎን ማስቀመጥ አልተቻለም።',loginRequired:'Daily Farm ለመጠቀም ይግቡ።',configError:'የSupabase anon/publishable key በAgriNova የጋራ ውቅር ውስጥ ያዘጋጁ።',connectionError:'ከSupabase ጋር መገናኘት አልተቻለም።',weatherUnavailable:'የአየር መረጃ አልተገኘም።',noCropRecords:'የሰብል መዝገብ አልተገኘም።',confirmRemove:'ይህን መዝገብ ያስወግዱ?',emptySearch:'የሚዛመድ መዝገብ አልተገኘም።',date:'ቀን',activity:'ሥራ',observation:'ምልከታ',amount:'መጠን',crop:'ሰብል / ማሳ',details:'ዝርዝር',remove:'አስወግድ',chooseCrop:'ሰብል ወይም ማሳ ይምረጡ',noCrop:'ሰብል አልተመረጠም',searchResults:'የፍለጋ ውጤቶች'
    },
    ti: {
      eyebrow:'ምሕደራ ሕርሻ',pageTitle:'መዓልታዊ ሕርሻ',pageSubtitle:'ስራሕ ሕርሻኹም መዝግቡ፣ ኩነታት ግራት ተኸታተሉ፣ መዓልትኹም ገምግሙ።',today:'ሎሚ',notSaved:'ገና ኣይተቐመጠን',saved:'ኣብ Supabase ተቐሚጡ',dailyLogLabel:'መዝገብ መዓልቲኹም',dailyLogTitle:'መዓልታዊ መዝገብ ሕርሻ',dailyLogIntro:'ዝተፈጸመ ስራሕን ኣብ ግራትኩም ዝረኣኹሞን መዝግቡ።',activitiesTitle:'ስራሓት ሕርሻ',activitiesIntro:'ሎሚ ኣብ ሕርሻኹም ዝተፈጸሙ ስራሓት መዝግቡ።',activityType:'ዓይነት ስራሕ *',chooseActivity:'ዓይነት ስራሕ ምረጹ',relatedCrop:'ዝምልከቶ ዓይነት ዘርኢ / ግራት',noSpecificCrop:'ምስ ፍሉይ ዘርኢ ዘይተኣሳሰረ',activityDate:'ዕለት',quantity:'መጠን (ኣማራጺ)',activityDetails:'ዝርዝር ስራሕ *',addActivity:'ስራሕ ወስኹ',noActivities:'ገና ስራሕ ኣይተወሰኸን።',observationsTitle:'ምልከታታት ዘርኢን ግራትን',observationsIntro:'ብዛዕባ ዘርኢ፣ ሓመድ፣ ማይን ኩነታት ግራትን ዝረኣኹሞ መዝግቡ።',observationCategory:'ምድብ ምልከታ *',chooseCategory:'ምድብ ምረጹ',observedCrop:'ዘርኢ / ግራት',generalField:'ሓፈሻዊ ምልከታ ግራት',priority:'ቀዳምነት',normal:'ልሙድ',needsAttention:'ትኹረት የድልዮ',urgent:'ህጹጽ',observationDetails:'እንታይ ተዓዚብኩም? *',addObservation:'ምልከታ ወስኹ',noObservations:'ገና ምልከታ ኣይተወሰኸን።',assessmentTitle:'መዓልታዊ ገምጋም ሓረስታይ',assessmentQuestion:'ሎሚ ሕርሻኹም ብኸመይ ትግምግምዎ?',excellent:'ኣዝዩ ጽቡቕ',good:'ጽቡቕ',moderate:'ማእከላይ',poor:'ድኹም',weatherTitle:'ኩነታት ኣየር',weatherIntro:'ኩነታት ኣየር ኣብ ስራሕ ሕርሻ ጽልዋ ክህልዎ ይኽእል።',localWeather:'ናይ ከባቢ ኣየር',weatherLoading:'ኣየር ይጽዓን ኣሎ…',weatherImpact:'ኣየር ኣብ ሕርሻኹም ከመይ ጸልዩ?',noImpact:'ዝረአ ጽልዋ የለን',helpful:'ሓጋዚ',delayed:'ስራሕ ሕርሻ ኣደንጒዩ',cropDamage:'ዘርኢ ጎዲኡ',waterShortage:'ሕጽረት ማይ',other:'ካልእ',weatherNotes:'ዝርዝር ጽልዋ ኣየር (ኣማራጺ)',saveHint:'መዝገብኩም ብውሑስ ኣብ መለያ AgriNova Supabase ይቕመጥ።',saveRecord:'መዝገብ ኣቐምጥ',saving:'ይቕመጥ ኣሎ…',footer:'መዝገባት ሕርሻኹም ብውሑስ ተቐሚጦም።',searchPlaceholder:'ኣብ መዝገብ ሕርሻ ድለዩ…',activityAdded:'ስራሕ ተወሲኹ።',observationAdded:'ምልከታ ተወሲኹ።',removed:'መዝገብ ተወጊዱ።',savedMessage:'መዝገብ ሕርሻ ተቐሚጡ።',loadError:'መዝገብኩም ምጽዓን ኣይተኻእለን።',saveError:'መዝገብኩም ምቕማጥ ኣይተኻእለን።',loginRequired:'ንDaily Farm ክትጥቀሙ ተኣተዉ።',configError:'Supabase anon/publishable key ኣብ ሓባራዊ ውቅር AgriNova ኣቐምጡ።',connectionError:'ምስ Supabase ምትእስሳር ኣይተኻእለን።',weatherUnavailable:'ሓበሬታ ኣየር ኣይተረኽበን።',noCropRecords:'መዝገብ ዘርኢ ኣይተረኽበን',confirmRemove:'ነዚ መዝገብ ክትድምስስዎ?',emptySearch:'ዝሰማማዕ መዝገብ ኣይተረኽበን።',date:'ዕለት',activity:'ስራሕ',observation:'ምልከታ',amount:'መጠን',crop:'ዘርኢ / ግራት',details:'ዝርዝር',remove:'ኣወግድ',chooseCrop:'ዘርኢ ወይ ግራት ምረጹ',noCrop:'ዘርኢ ኣይተመርጸን',searchResults:'ውጽኢት ድለያ'
    },
    om: {
      eyebrow:'BULCHIIN QONNAA',pageTitle:'Qonna Guyyaa Guyyaa',pageSubtitle:'Hojii qonnaa galmeessi, haala dirree hordofi, guyyaa kee madaali.',today:'Har’a',notSaved:'Amma iyyuu hin kuufamne',saved:'Supabase keessatti kuufame',dailyLogLabel:'GALMEE GUYYAA KEETII',dailyLogTitle:'Galmee Qonnaa Guyyaa Guyyaa',dailyLogIntro:'Hojii hojjetame fi wanta dirree kee irratti argite galmeessi.',activitiesTitle:'Hojiiwwan Qonnaa',activitiesIntro:'Hojii har’a qonna kee irratti hojjetame galmeessi.',activityType:'Gosa hojii *',chooseActivity:'Gosa hojii filadhu',relatedCrop:'Midhaan / lafa walqabatu',noSpecificCrop:'Midhaan murtaa’e hin qabu',activityDate:'Guyyaa',quantity:'Baay’ina (filannoo)',activityDetails:'Ibsa hojii *',addActivity:'Hojii dabali',noActivities:'Hojiiwwan hin dabalamin.',observationsTitle:'Hubannoo Midhaanii fi Dirree',observationsIntro:'Waa’ee midhaan, biyyee, bishaanii fi haala dirree irratti argite galmeessi.',observationCategory:'Ramaddii hubannoo *',chooseCategory:'Ramaddii filadhu',observedCrop:'Midhaan / dirree',generalField:'Hubannoo dirree waliigalaa',priority:'Dursa',normal:'Idilee',needsAttention:'Xiyyeeffannoo barbaada',urgent:'Ariifachiisaa',observationDetails:'Maal argite? *',addObservation:'Hubannoo dabali',noObservations:'Hubannoon hin dabalamin.',assessmentTitle:'Madaallii Guyyaa Qonnaan Bultootaa',assessmentQuestion:'Har’a qonna kee akkamitti madaalta?',excellent:'Baay’ee gaarii',good:'Gaarii',moderate:'Giddu galeessa',poor:'Hamaa',weatherTitle:'Haala Qilleensaa',weatherIntro:'Haalli qilleensaa hojii qonnaa har’aa irratti dhiibbaa qabaachuu danda’a.',localWeather:'QILLEENSA NAANNOO',weatherLoading:'Qilleensa fe’aa jira…',weatherImpact:'Qilleensi qonna kee irratti dhiibbaa akkamii qabaate?',noImpact:'Dhiibbaa mul’atu hin qabu',helpful:'Gargaare',delayed:'Hojii qonnaa tursiise',cropDamage:'Midhaan miidhe',waterShortage:'Hanqina bishaanii',other:'Kan biraa',weatherNotes:'Ibsa dhiibbaa qilleensaa (filannoo)',saveHint:'Galmeen kee nageenyaan herrega AgriNova Supabase keessatti kuufama.',saveRecord:'Galmee Guyyaa Kuusi',saving:'Kuusaa jira…',footer:'Galmeewwan qonnaa guyyaa kee nageenyaan kuufamu.',searchPlaceholder:'Galmee qonnaa kee keessatti barbaadi…',activityAdded:'Hojiin dabalameera.',observationAdded:'Hubannoon dabalameera.',removed:'Galmeen haqameera.',savedMessage:'Galmeen qonnaa guyyaa milkaa’inaan kuufameera.',loadError:'Galmee guyyaa fe’uun hin danda’amne.',saveError:'Galmee kuusuun hin danda’amne.',loginRequired:'Daily Farm fayyadamuuf seeni.',configError:'Furtuu anon/publishable Supabase qindaa’ina AgriNova keessatti galchi.',connectionError:'Supabase waliin wal qunnamuun hin danda’amne.',weatherUnavailable:'Odeeffannoon qilleensaa hin argamne.',noCropRecords:'Galmeen midhaanii hin argamne',confirmRemove:'Galmee kana haquu barbaaddaa?',emptySearch:'Galmeen walsimu hin argamne.',date:'Guyyaa',activity:'Hojii',observation:'Hubannoo',amount:'Baay’ina',crop:'Midhaan / dirree',details:'Ibsa',remove:'Haqi',chooseCrop:'Midhaan ykn dirree filadhu',noCrop:'Midhaan hin filatamne',searchResults:'Bu’aa barbaachisummaa'
    },
    so: {
      eyebrow:'MAAREYNTA BEERTA',pageTitle:'Beerta Maalinlaha ah',pageSubtitle:'Diiwaangeli shaqada beerta, la soco xaaladda beeraha, qiimeena maalintaada.',today:'Maanta',notSaved:'Weli lama kaydin',saved:'Supabase ayaa lagu kaydiyey',dailyLogLabel:'DIIWAANKAAGA MAALINLAHA AH',dailyLogTitle:'Diiwaanka Beerta Maalinlaha ah',dailyLogIntro:'Diiwaangeli shaqada la qabtay iyo waxa aad ku aragtay beerahaaga.',activitiesTitle:'Hawlaha Beerta',activitiesIntro:'Diiwaangeli shaqada maanta laga qabtay beertaada.',activityType:'Nooca hawsha *',chooseActivity:'Dooro hawsha',relatedCrop:'Dalagga / beer la xiriira',noSpecificCrop:'Dalag gaar ah ma leh',activityDate:'Taariikhda',quantity:'Qaddarka (ikhtiyaari)',activityDetails:'Faahfaahinta hawsha *',addActivity:'Ku dar Hawl',noActivities:'Weli hawlo lama darin.',observationsTitle:'Kormeerka Dalagga iyo Beeraha',observationsIntro:'Diiwaangeli waxa aad ka aragtay dalagga, ciidda, biyaha iyo xaaladda beeraha.',observationCategory:'Qaybta kormeerka *',chooseCategory:'Dooro qayb',observedCrop:'Dalag / beer',generalField:'Kormeer guud oo beeraha ah',priority:'Mudnaanta',normal:'Caadi',needsAttention:'Wuxuu u baahan yahay fiiro',urgent:'Degdeg',observationDetails:'Maxaad aragtay? *',addObservation:'Ku dar Kormeer',noObservations:'Weli kormeer lama darin.',assessmentTitle:'Qiimaynta Maalinlaha ah ee Beeraleyga',assessmentQuestion:'Sideed maanta u qiimaynaysaa beertaada?',excellent:'Aad u fiican',good:'Fiican',moderate:'Dhexdhexaad',poor:'Liita',weatherTitle:'Xaaladda Cimilada',weatherIntro:'Cimiladu waxay saamayn kartaa shaqada beerta maanta.',localWeather:'CIMILADA DEEGAANKA',weatherLoading:'Cimilada waa la soo rarayaa…',weatherImpact:'Sidee ayay cimiladu u saamaysay beertaada?',noImpact:'Saamayn muuqata ma jirto',helpful:'Way caawisay',delayed:'Waxay dib u dhigtay shaqada beerta',cropDamage:'Waxay dhaawacday dalagga',waterShortage:'Biyo yari',other:'Kale',weatherNotes:'Faahfaahinta saamaynta cimilada (ikhtiyaari)',saveHint:'Diiwaankaaga si ammaan ah ayaa loogu kaydin doonaa akoonkaaga AgriNova Supabase.',saveRecord:'Kaydi Diiwaanka Maalinta',saving:'Waa la kaydinayaa…',footer:'Diiwaannada beertaada si ammaan ah ayaa loo kaydiyaa.',searchPlaceholder:'Ka raadi diiwaanka beertaada…',activityAdded:'Hawsha waa lagu daray.',observationAdded:'Kormeerka waa lagu daray.',removed:'Diiwaanka waa la saaray.',savedMessage:'Diiwaanka beerta si guul leh ayaa loo kaydiyey.',loadError:'Lama soo rari karin diiwaankaaga maanta.',saveError:'Lama kaydin karin diiwaankaaga.',loginRequired:'Fadlan gal si aad u isticmaasho Daily Farm.',configError:'Ku dar furaha Supabase anon/publishable ee dejinta guud ee AgriNova.',connectionError:'Lama xiriiri karin Supabase.',weatherUnavailable:'Macluumaadka cimilada lama heli karo.',noCropRecords:'Diiwaanno dalag lama helin',confirmRemove:'Ma rabtaa inaad ka saarto diiwaankan?',emptySearch:'Wax diiwaan ah lama helin.',date:'Taariikh',activity:'Hawl',observation:'Kormeer',amount:'Qaddar',crop:'Dalag / beer',details:'Faahfaahin',remove:'Ka saar',chooseCrop:'Dooro dalag ama beer',noCrop:'Dalag lama dooran',searchResults:'Natiijooyinka raadinta'
    }
  };

  const activityLabels = {
    en:['Irrigation','Fertilizer application','Pest and disease treatment','Weeding','Planting','Soil management','Pruning','Harvesting','Inspection','Maintenance','Land preparation','Other'],
    am:['መስኖ','ማዳበሪያ መጠቀም','ተባይና በሽታ መከላከል','አረም ማረም','መዝራት','የአፈር አስተዳደር','ቅርንጫፍ መቁረጥ','መከር','ምርመራ','ጥገና','መሬት ማዘጋጀት','ሌላ'],
    ti:['መስኖ','ምውሳድ ድኹዒ','ምክልኻል ባልዕን ሕማምን','ምሕራስ ኣረም','ምዝራእ','ምሕደራ ሓመድ','ምቑራጽ ጨናፍር','ምሕፋስ','ምርመራ','ጽገና','ምድላው መሬት','ካልእ'],
    om:['Jallisuu','Xaa’oo dibuu','Ilbiisotaa fi dhukkuba ittisuu','Aramaa buqqisuu','Facaasuu','Bulchiinsa biyyee','Damee muruu','Haamuu','Sakatta’uu','Suphaa','Qopheessuu lafa','Kan biraa'],
    so:['Waraabinta','Bacriminta','Daaweynta cayayaanka iyo cudurrada','Jaridda haramaha','Beerista','Maareynta ciidda','Jarista laamaha','Goosashada','Kormeerka','Dayactirka','Diyaarinta dhulka','Kale']
  };
  const observationLabels = {
    en:['Crop growth and condition','Pest signs','Disease symptoms','Soil condition','Water and irrigation','Weather effects','Weed pressure','Other'],
    am:['የሰብል እድገትና ሁኔታ','የተባይ ምልክቶች','የበሽታ ምልክቶች','የአፈር ሁኔታ','ውሃና መስኖ','የአየር ተፅዕኖ','የአረም መጠን','ሌላ'],
    ti:['ዕብየትን ኩነታትን ዘርኢ','ምልክታት ባልዕ','ምልክታት ሕማም','ኩነታት ሓመድ','ማይን መስኖን','ጽልዋ ኣየር','ብዝሒ ኣረም','ካልእ'],
    om:['Guddina fi haala midhaanii','Mallattoolee ilbiisotaa','Mallattoolee dhukkubaa','Haala biyyee','Bishaanii fi jallisuu','Dhiibbaa qilleensaa','Baay’ina aramaa','Kan biraa'],
    so:['Koritaanka iyo xaaladda dalagga','Calaamadaha cayayaanka','Calaamadaha cudurka','Xaaladda ciidda','Biyaha iyo waraabinta','Saamaynta cimilada','Haramaha','Kale']
  };
  const t = key => (translations[state.language] || translations.en)[key] || translations.en[key] || key;
  const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function toast(message, error=false) { const el=$('toast'); el.textContent=message; el.className=`toast show${error?' error':''}`; window.clearTimeout(toast.timer); toast.timer=window.setTimeout(()=>el.className='toast',3500); }
  function notice(message,error=false) { const el=$('connectionNotice'); el.hidden=!message; el.textContent=message||''; el.classList.toggle('error',error); }
  function setSaved(value) { state.saved=value; $('recordStatus').textContent=value?t('saved'):t('notSaved'); }

  function applyLanguage(lang) {
    state.language = translations[lang] ? lang : 'en';
    document.documentElement.lang = state.language;
    $('languageSelect').value = state.language;
    document.querySelectorAll('[data-i18n]').forEach(el => { const key=el.dataset.i18n; el.textContent=t(key); });
    $('globalSearch').placeholder=t('searchPlaceholder');
    const a=$('activityType'), o=$('observationCategory'), p=$('observationPriority');
    [...a.options].forEach((opt,i)=>{ if(i===0) opt.textContent=t('chooseActivity'); else opt.textContent=(activityLabels[state.language]||activityLabels.en)[i-1]||opt.value; });
    [...o.options].forEach((opt,i)=>{ if(i===0) opt.textContent=t('chooseCategory'); else opt.textContent=(observationLabels[state.language]||observationLabels.en)[i-1]||opt.value; });
    [...p.options].forEach((opt,i)=>{opt.textContent=[t('normal'),t('needsAttention'),t('urgent')][i]||opt.value;});
    renderLists(); setSaved(state.saved);
  }

  async function initSupabase() {
    if (!window.supabase?.createClient) throw new Error('Supabase JavaScript library did not load.');
    if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('PASTE_YOUR')) throw new Error('CONFIG');
    state.db=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
    const {data:{session},error}=await state.db.auth.getSession();
    if(error) throw error;
    if(!session?.user) throw new Error('LOGIN');
    state.user=session.user;
    return state.user;
  }

  async function loadCrops() {
    const {data,error}=await state.db.from('my_crops').select('id,crop_name,field_name,status').eq('farmer_id',state.user.id).neq('status','removed').order('crop_name');
    if(error) { console.warn('Could not load crop list:',error.message); return; }
    state.crops=data||[];
    ['activityCrop','observationCrop'].forEach(id=>{
      const select=$(id), firstText=id==='activityCrop'?t('noSpecificCrop'):t('generalField');
      select.innerHTML=`<option value="">${escapeHTML(firstText)}</option>`+state.crops.map(c=>`<option value="${escapeHTML(c.id)}">${escapeHTML(c.crop_name||'Crop')}${c.field_name?` — ${escapeHTML(c.field_name)}`:''}</option>`).join('');
    });
  }

  async function loadToday() {
    const {data,error}=await state.db.from(TABLE).select('*').eq('farmer_id',state.user.id).eq('record_date',todayISO()).maybeSingle();
    if(error) throw error;
    if(!data) { state.activities=[];state.observations=[];state.assessment='';state.weather={};setSaved(false);renderLists();return; }
    state.activities=Array.isArray(data.activities)?data.activities:[];
    state.observations=Array.isArray(data.observations)?data.observations:[];
    state.assessment=data.assessment||'';
    state.weather=data.weather&&typeof data.weather==='object'?data.weather:{};
    if(state.assessment){const radio=document.querySelector(`input[name="assessment"][value="${CSS.escape(state.assessment)}"]`);if(radio)radio.checked=true;}
    $('weatherImpact').value=state.weather.impact||'No noticeable impact';
    $('weatherDetails').value=state.weather.details||'';
    setSaved(true);renderLists();
  }

  function cropName(id) { return state.crops.find(c=>String(c.id)===String(id))?.crop_name || ''; }
  function translatedActivity(value) { const i=activityLabels.en.indexOf(value); return i<0?value:(activityLabels[state.language]||activityLabels.en)[i]; }
  function translatedObservation(value) { const i=observationLabels.en.indexOf(value); return i<0?value:(observationLabels[state.language]||observationLabels.en)[i]; }
  function renderLists() {
    const query=($('globalSearch').value||'').trim().toLowerCase();
    const activities=state.activities.filter(x=>!query||[x.type,x.details,x.crop_name,x.amount].join(' ').toLowerCase().includes(query));
    const observations=state.observations.filter(x=>!query||[x.category,x.details,x.crop_name,x.priority].join(' ').toLowerCase().includes(query));
    $('activitiesList').innerHTML=activities.length?activities.map(x=>`<article class="entry-item"><div><strong>${escapeHTML(translatedActivity(x.type))}</strong><p>${escapeHTML(x.details)}</p><div class="entry-meta">${escapeHTML(x.date||'')} ${x.crop_name?' · '+escapeHTML(x.crop_name):''} ${x.amount?' · '+escapeHTML(x.amount):''}</div></div><button class="remove-entry" type="button" data-kind="activity" data-id="${escapeHTML(x.id)}" aria-label="${escapeHTML(t('remove'))}"><i class="fa fa-trash"></i></button></article>`).join(''):`<div class="empty">${escapeHTML(query?t('emptySearch'):t('noActivities'))}</div>`;
    $('observationsList').innerHTML=observations.length?observations.map(x=>`<article class="entry-item"><div><strong>${escapeHTML(translatedObservation(x.category))} <span class="priority ${x.priority==='Urgent'?'urgent':''}">${escapeHTML(x.priority||'Normal')}</span></strong><p>${escapeHTML(x.details)}</p><div class="entry-meta">${x.crop_name?escapeHTML(x.crop_name)+' · ':''}${escapeHTML(x.created_at_label||'')}</div></div><button class="remove-entry" type="button" data-kind="observation" data-id="${escapeHTML(x.id)}" aria-label="${escapeHTML(t('remove'))}"><i class="fa fa-trash"></i></button></article>`).join(''):`<div class="empty">${escapeHTML(query?t('emptySearch'):t('noObservations'))}</div>`;
  }

  function addActivity(event) {
    event.preventDefault();
    const type=$('activityType').value, details=$('activityDetails').value.trim();
    if(!type||!details) return;
    const cropId=$('activityCrop').value;
    state.activities.push({id:crypto.randomUUID(),type,crop_id:cropId||null,crop_name:cropName(cropId),date:$('activityDate').value||todayISO(),amount:$('activityAmount').value.trim(),details});
    $('activityForm').reset();$('activityDate').value=todayISO();setSaved(false);renderLists();toast(t('activityAdded'));
  }
  function addObservation(event) {
    event.preventDefault();
    const category=$('observationCategory').value, details=$('observationDetails').value.trim();
    if(!category||!details) return;
    const cropId=$('observationCrop').value;
    state.observations.push({id:crypto.randomUUID(),category,crop_id:cropId||null,crop_name:cropName(cropId),priority:$('observationPriority').value,details,created_at_label:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})});
    $('observationForm').reset();setSaved(false);renderLists();toast(t('observationAdded'));
  }
  function removeEntry(event) {
    const button=event.target.closest('[data-kind][data-id]');if(!button)return;
    if(!confirm(t('confirmRemove')))return;
    if(button.dataset.kind==='activity')state.activities=state.activities.filter(x=>x.id!==button.dataset.id);
    else state.observations=state.observations.filter(x=>x.id!==button.dataset.id);
    setSaved(false);renderLists();toast(t('removed'));
  }

  async function saveRecord() {
    if(state.busy)return;
    state.assessment=document.querySelector('input[name="assessment"]:checked')?.value||'';
    state.weather={...(state.weather||{}),impact:$('weatherImpact').value,details:$('weatherDetails').value.trim(),current:state.weather.current||null};
    const payload={farmer_id:state.user.id,record_date:todayISO(),activities:state.activities,observations:state.observations,assessment:state.assessment||null,weather:state.weather,updated_at:new Date().toISOString()};
    state.busy=true;$('saveRecordBtn').disabled=true;$('saveRecordBtn').querySelector('span').textContent=t('saving');
    try {
      const {error}=await state.db.from(TABLE).upsert(payload,{onConflict:'farmer_id,record_date'});
      if(error)throw error;
      setSaved(true);toast(t('savedMessage'));
    } catch(error) { console.error('Daily Farm save error:',error);toast(`${t('saveError')} ${error.message||''}`,true); }
    finally {state.busy=false;$('saveRecordBtn').disabled=false;$('saveRecordBtn').querySelector('span').textContent=t('saveRecord');}
  }

  function weatherCode(code) {
    if(code===0)return 'Clear sky'; if([1,2,3].includes(code))return 'Partly cloudy'; if([45,48].includes(code))return 'Fog'; if([51,53,55,56,57].includes(code))return 'Drizzle'; if([61,63,65,66,67,80,81,82].includes(code))return 'Rain'; if([71,73,75,77,85,86].includes(code))return 'Snow'; if([95,96,99].includes(code))return 'Thunderstorm'; return 'Current conditions';
  }
  async function loadWeather(lat,lon) {
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
    const response=await fetch(url);if(!response.ok)throw new Error('Weather request failed');const data=await response.json();const c=data.current;
    state.weather.current={temperature:c.temperature_2m,humidity:c.relative_humidity_2m,wind:c.wind_speed_10m,condition:weatherCode(c.weather_code),observed_at:c.time};
    $('weatherTemp').textContent=`${Math.round(c.temperature_2m)}°C`;$('weatherCondition').textContent=weatherCode(c.weather_code);$('weatherHumidity').textContent=`${Math.round(c.relative_humidity_2m)}%`;$('weatherWind').textContent=`${Math.round(c.wind_speed_10m)} km/h`;
  }
  async function initWeather() {
    try {
      if(navigator.geolocation){const position=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{timeout:7000,maximumAge:600000}));await loadWeather(position.coords.latitude,position.coords.longitude);}
      else await loadWeather(9.03,38.74);
    } catch(error) { try{await loadWeather(9.03,38.74);}catch(e){$('weatherCondition').textContent=t('weatherUnavailable');} }
  }

  async function init() {
    const date=todayISO();$('todayDate').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'});$('dateChip').textContent=date;$('activityDate').value=date;
    $('languageSelect').addEventListener('change',e=>applyLanguage(e.target.value));
    $('activityForm').addEventListener('submit',addActivity);$('observationForm').addEventListener('submit',addObservation);
    $('activitiesList').addEventListener('click',removeEntry);$('observationsList').addEventListener('click',removeEntry);
    $('globalSearch').addEventListener('input',renderLists);$('saveRecordBtn').addEventListener('click',saveRecord);
    $('assessmentOptions').addEventListener('change',()=>setSaved(false));$('weatherImpact').addEventListener('change',()=>setSaved(false));$('weatherDetails').addEventListener('input',()=>setSaved(false));
    $('notifButton').addEventListener('click',()=>toast(state.activities.length+state.observations.length?`${state.activities.length} ${t('activity').toLowerCase()} · ${state.observations.length} ${t('observation').toLowerCase()}`:t('noActivities')));
    applyLanguage('en');
    try {
      await initSupabase();notice('');
      await loadCrops();await loadToday();
    } catch(error) {
      console.error('Daily Farm initialization error:',error);
      if(error.message==='CONFIG')notice(t('configError'),true);
      else if(error.message==='LOGIN')notice(t('loginRequired'),true);
      else if(error.message?.includes('daily_farm_records')||error.code==='42P01')notice('Run the Daily Farm SQL setup in Supabase SQL Editor, then reload this page.',true);
      else notice(`${t('connectionError')} ${error.message||''}`,true);
      $('saveRecordBtn').disabled=true;
    }
    initWeather();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
