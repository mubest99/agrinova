(() => {
  "use strict";

  const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";
  const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE";
  const TABLE = "farmer_documents", BUCKET = "farmer-documents", MAX_FILE_SIZE = 50 * 1024 * 1024;
  const $ = id => document.getElementById(id);

  let db = window.supabaseClient || null, user = null, docs = [], chosenFile = null, activeCategory = "ownership", activeFilter = "all", activeDoc = null;
  let lang = localStorage.getItem("agrinova_language") || "en";

  const categoryKeys = ["ownership","finance","equipment","government","emergency"];

  const categoryNames = {
    ownership:["National identification document","Land ownership certificate","Land lease or rental agreement","Farm registration certificate","Cooperative membership certificate","Agricultural permit or license","Other personal or ownership document"],
    finance:["Purchase receipt","Sales invoice","Farm expense record","Farm income record","Loan agreement","Bank statement","Insurance policy","Tax document","Outstanding debt record","Profit and loss statement","Other financial document"],
    equipment:["Equipment purchase receipt","Machinery warranty","Equipment registration document","Maintenance record","Repair invoice","Fuel purchase receipt or record","Spare parts receipt","Equipment rental agreement","Other equipment document"],
    government:["Agricultural support document","Subsidy application","Fertilizer distribution record","Seed distribution record","Cooperative membership or agreement","Agricultural training certificate","Extension officer report","Agricultural advisory or research report","Government permit or approval","Other government or cooperative document"],
    emergency:["Emergency contact list","Farm location or boundary document","Insurance claim document","Damage or loss evidence","Supplier contact list","Buyer or customer contact list","Backup copy of important document","Other emergency or backup document"]
  };

  const typeNames = {
    en:{},
    am:{
      ownership:["የብሔራዊ መታወቂያ ሰነድ","የመሬት ባለቤትነት ሰርተፍኬት","የመሬት ኪራይ ስምምነት","የእርሻ ምዝገባ ሰርተፍኬት","የህብረት ሥራ አባልነት ሰርተፍኬት","የግብርና ፈቃድ","ሌላ የግል ወይም የባለቤትነት ሰነድ"],
      finance:["የግዢ ደረሰኝ","የሽያጭ ደረሰኝ","የእርሻ ወጪ መዝገብ","የእርሻ ገቢ መዝገብ","የብድር ስምምነት","የባንክ መግለጫ","የኢንሹራንስ ፖሊሲ","የግብር ሰነድ","ያልተከፈለ ዕዳ መዝገብ","የትርፍና ኪሳራ መግለጫ","ሌላ የገንዘብ ሰነድ"],
      equipment:["የመሳሪያ ግዢ ደረሰኝ","የማሽን ዋስትና","የመሳሪያ ምዝገባ ሰነድ","የጥገና መዝገብ","የጥገና ደረሰኝ","የነዳጅ ግዢ ደረሰኝ","የመለዋወጫ ዕቃ ደረሰኝ","የመሳሪያ ኪራይ ስምምነት","ሌላ የመሳሪያ ሰነድ"],
      government:["የግብርና ድጋፍ ሰነድ","የድጎማ ማመልከቻ","የማዳበሪያ ስርጭት መዝገብ","የዘር ስርጭት መዝገብ","የህብረት ሥራ አባልነት ወይም ስምምነት","የግብርና ስልጠና ሰርተፍኬት","የእርሻ አማካሪ ሪፖርት","የግብርና ምክር ወይም ምርምር ሪፖርት","የመንግስት ፈቃድ","ሌላ የመንግስት ወይም የህብረት ሰነድ"],
      emergency:["የድንገተኛ ጊዜ አድራሻ ዝርዝር","የእርሻ ቦታ ወይም ድንበር ሰነድ","የኢንሹራንስ ጥያቄ ሰነድ","የጉዳት ወይም ኪሳራ ማስረጃ","የአቅራቢ አድራሻ ዝርዝር","የገዢ ወይም ደንበኛ አድራሻ ዝርዝር","የአስፈላጊ ሰነድ ምትኬ","ሌላ የድንገተኛ ወይም ምትኬ ሰነድ"]
    },
    ti:{
      ownership:["ሃገራዊ መለለዪ ሰነድ","ናይ መሬት ዋንነት ምስክር ወረቐት","ናይ መሬት ክራይ ስምምዕ","ናይ ሕርሻ ምዝገባ ምስክር ወረቐት","ናይ ሕብረት ስራሕ ኣባልነት ሰነድ","ናይ ሕርሻ ፍቓድ","ካልእ ውልቃዊ ወይ ዋንነት ሰነድ"],
      finance:["ደረሰኝ ዕድጊ","ደረሰኝ ሽያጥ","መዝገብ ወጻኢ ሕርሻ","መዝገብ እቶት ሕርሻ","ስምምዕ ልቓሕ","መግለጺ ባንክ","ፖሊሲ መድሕን","ሰነድ ግብሪ","ዘይተኸፍለ ዕዳ","መግለጺ ትርፊን ክሳራን","ካልእ ሰነድ ገንዘብ"]
    },
    om:{
      ownership:["Waraqaa eenyummaa biyyaalessaa","Ragaa abbummaa lafaa","Waliigaltee kiraa lafaa","Ragaa galmee qonnaa","Ragaa miseensummaa waldaa","Hayyama qonnaa","Sanada dhuunfaa ykn abbummaa biraa"],
      finance:["Nagahee bittaa","Nagahee gurgurtaa","Galmee baasii qonnaa","Galmee galii qonnaa","Waliigaltee liqii","Ibsa baankii","Poolisii inshuraansii","Sanada gibiraa","Galmee liqii hin kaffalamne","Ibsa bu'aa fi kasaaraa","Sanada maallaqaa biraa"],
      equipment:["Nagahee bittaa meeshaa","Wabiinsa maashinii","Sanada galmee meeshaa","Galmee suphaa","Nagahee suphaa","Nagahee bittaa boba'aa","Nagahee qaama bakka bu'aa","Waliigaltee kiraa meeshaa","Sanada meeshaa biraa"]
    },
    so:{
      ownership:["Dukumentiga aqoonsiga qaranka","Shahaadada lahaanshaha dhulka","Heshiiska kirada dhulka","Shahaadada diiwaangelinta beerta","Shahaadada xubinnimada iskaashatada","Ruqsadda beeraha","Dukumenti kale oo lahaansho ama shakhsiyeed"],
      finance:["Rasiidka iibka","Qaansheegta iibinta","Diiwaanka kharashka beerta","Diiwaanka dakhliga beerta","Heshiiska amaahda","Warbixinta bangiga","Caymiska","Dukumentiga canshuurta","Deyn aan la bixin","Warbixinta faa'iido iyo khasaaro","Dukumenti maaliyadeed kale"],
      equipment:["Rasiidka qalabka","Dammaanadda mashiinka","Dukumentiga diiwaangelinta qalabka","Diiwaanka dayactirka","Qaansheegta dayactirka","Rasiidka shidaalka","Rasiidka qaybaha beddelka","Heshiiska kirada qalabka","Dukumenti qalab kale"]
    }
  };

  // Localized document type labels for all five supported languages.
  typeNames.ti.equipment=["ደረሰኝ ዕድጊ መሳርሒ","ውሕስነት ማሽን","ሰነድ ምዝገባ መሳርሒ","መዝገብ ጽገና","ደረሰኝ ጽገና","ደረሰኝ ዕድጊ ነዳዲ","ደረሰኝ መተካእታ ኣቕሑ","ስምምዕ ክራይ መሳርሒ","ካልእ ሰነድ መሳርሒ"];
  typeNames.ti.government=["ሰነድ ደገፍ ሕርሻ","መመልከቲ ድጎማ","መዝገብ ምክፍፋል ድኹዒ","መዝገብ ምክፍፋል ዘርኢ","ኣባልነት ወይ ስምምዕ ሕብረት ስራሕ","ምስክር ወረቐት ስልጠና ሕርሻ","ጸብጻብ ኣበል ሕርሻ","ጸብጻብ ምኽሪ ወይ ምርምር ሕርሻ","ፍቓድ መንግስቲ","ካልእ ሰነድ መንግስቲ ወይ ሕብረት"];
  typeNames.ti.emergency=["ዝርዝር ርክብ ህጹጽ ግዜ","ሰነድ ቦታ ወይ ዶብ ሕርሻ","ሰነድ ጥርዓን መድሕን","መርትዖ ጉድኣት ወይ ክሳራ","ዝርዝር ኣቕረብቲ","ዝርዝር ዓደግቲ ወይ ዓማዊል","ባክኣፕ ኣገዳሲ ሰነድ","ካልእ ህጹጽ ወይ ባክኣፕ ሰነድ"];
  typeNames.om.government=["Sanada deeggarsa qonnaa","Iyyata deeggarsa maallaqaa","Galmee raabsa xaa'oo","Galmee raabsa sanyii","Miseensummaa ykn waliigaltee waldaa","Ragaa leenjii qonnaa","Gabaasa ogeessa qonnaa","Gorsa ykn qorannoo qonnaa","Hayyama mootummaa","Sanada mootummaa ykn waldaa biraa"];
  typeNames.om.emergency=["Tarree quunnamtii yeroo balaa","Sanada bakka ykn daangaa qonnaa","Sanada gaafii inshuraansii","Ragaa miidhaa ykn kasaaraa","Tarree dhiyeessitootaa","Tarree bitattootaa","Garagalcha sanada barbaachisaa","Sanada balaa ykn kuusaa duubaa biraa"];
  typeNames.so.government=["Dukumentiga taageerada beeraha","Codsiga kabka","Diiwaanka qaybinta bacriminta","Diiwaanka qaybinta abuurka","Heshiiska iskaashatada","Shahaadada tababarka beeraha","Warbixinta sarkaalka fidinta","Warbixinta talo ama cilmi-baaris beeraha","Ogolaanshaha dowladda","Dukumenti kale oo dowladeed ama iskaashato"];
  typeNames.so.emergency=["Liiska xiriirrada degdegga ah","Dukumentiga goobta ama xuduudda beerta","Dukumentiga sheegashada caymiska","Caddeynta dhaawac ama khasaaro","Liiska alaab-qeybiyeyaasha","Liiska iibsadayaasha ama macaamiisha","Nuqul kayd ah oo dukumenti muhiim ah","Dukumenti kale oo degdeg ama kayd ah"];
    const T={
    en:{tagline:"Local and Growing Smarter Farming Company",search:"Search documents...",notifications:"Notifications",notificationText:"Your documents are private. Keep a backup of important files.",eyebrow:"YOUR SECURE DOCUMENT LIBRARY",title:"Documents & Records",subtitle:"Keep your important farm and personal documents organized in one secure place.",upload:"Upload document",connecting:"Connecting to your secure storage…",retry:"Retry",total:"Total documents",used:"Storage used",recent:"Recent uploads",categories:"Categories",chooseCategory:"Choose a document group",all:"All documents",ownership:"Personal & land ownership",finance:"Financial records",equipment:"Equipment & machinery",government:"Government & cooperative",emergency:"Emergency & backup",tipTitle:"Keep everything easy to find",tipText:"Choose a document type, give it a clear name, and add a note when useful.",librarySubtitle:"Your saved files appear here.",newest:"Newest first",oldest:"Oldest first",az:"Name A–Z",filter:"Filter",shortcuts:"Document shortcuts",shortcutHelp:"Choose what you want to save",allFiles:"All files",images:"Images",office:"Office files",loading:"Loading your documents…",private:"Private to your account",footer:"Local and Growing Smarter Farming Company",secureUpload:"SECURE DOCUMENT UPLOAD",drop:"Choose a file or drag it here",fileLimit:"PDF, images, Word, Excel or text · Up to 50 MB",browse:"Browse files",docName:"Document name",category:"Category",docType:"Document type",notes:"Notes / land or item details",notesPlaceholder:"For land documents, identify the plot, location, size or parcel number. For equipment, add the machine name or repair details.",notesHint:"Example: Kebele 04, Plot 18, 2 hectares — or tractor repair invoice, 2026.",cancel:"Cancel",save:"Save document",details:"DOCUMENT DETAILS",close:"Close",download:"Download",view:"View",delete:"Delete",confirmDelete:"Permanently delete this document?",chooseFile:"Please choose a file first.",nameRequired:"Please enter a document name.",uploading:"Uploading…",uploadSuccess:"Document saved successfully.",uploadFailed:"Upload failed. Check your Supabase setup and policies.",loadingFailed:"Could not load documents. Check the table, bucket and RLS policies.",connected:"Secure storage connected.",notSignedIn:"Please sign in to AgriNova to access your private documents.",keyMissing:"Add your Supabase publishable/anon key in documents.js.",tooLarge:"This file is larger than the 50 MB limit.",unsupported:"This file type is not supported.",noDocs:"No documents in this category yet.",noDocsText:"Choose one of the document shortcuts above to upload a file.",noResults:"No matching documents",noResultsText:"Try a different search term or filter.",document:"document",documents:"documents",uploaded:"Uploaded",size:"File size",file:"File",notesLabel:"Notes",noNotes:"No notes added",deleteSuccess:"Document deleted.",deleteFailed:"Could not delete document.",downloadFailed:"Could not download this document."},

    am:{tagline:"አካባቢያዊ እና ዘመናዊ እርሻን ማሳደግ",search:"ሰነዶችን ፈልግ...",notifications:"ማሳወቂያዎች",notificationText:"ሰነዶችዎ የግል ናቸው። አስፈላጊ ፋይሎችን ምትኬ ያስቀምጡ።",eyebrow:"ደህንነቱ የተጠበቀ የሰነድ ቤተ-መዝገብ",title:"ሰነዶችና መዝገቦች",subtitle:"አስፈላጊ የእርሻና የግል ሰነዶችዎን በአንድ ደህንነቱ በተጠበቀ ቦታ ያደራጁ።",upload:"ሰነድ ጫን",connecting:"ከደህንነቱ የተጠበቀ ማከማቻ ጋር በመገናኘት ላይ…",retry:"እንደገና ሞክር",total:"ጠቅላላ ሰነዶች",used:"የተጠቀመ ቦታ",recent:"የቅርብ ጊዜ ጭነቶች",categories:"ምድቦች",chooseCategory:"የሰነድ ቡድን ይምረጡ",all:"ሁሉም ሰነዶች",ownership:"የግልና የመሬት ባለቤትነት",finance:"የገንዘብ መዝገቦች",equipment:"መሳሪያና ማሽነሪ",government:"መንግስትና ህብረት ሥራ",emergency:"ድንገተኛና ምትኬ",tipTitle:"ሁሉንም በቀላሉ ያግኙ",tipText:"የሰነድ አይነት ይምረጡ፣ ግልጽ ስም ይስጡ እና አስፈላጊ ሲሆን ማስታወሻ ያክሉ።",librarySubtitle:"ያስቀመጧቸው ፋይሎች እዚህ ይታያሉ።",newest:"አዲስ መጀመሪያ",oldest:"አሮጌ መጀመሪያ",az:"ስም A–Z",filter:"አጣራ",shortcuts:"የሰነድ አቋራጮች",shortcutHelp:"ማስቀመጥ የሚፈልጉትን ይምረጡ",allFiles:"ሁሉም ፋይሎች",images:"ምስሎች",office:"የቢሮ ፋይሎች",loading:"ሰነዶችዎን በመጫን ላይ…",private:"ለመለያዎ ብቻ የግል",footer:"አካባቢያዊ እና ዘመናዊ እርሻን ማሳደግ",secureUpload:"ደህንነቱ የተጠበቀ ሰነድ ጭነት",drop:"ፋይል ይምረጡ ወይም እዚህ ይጣሉ",fileLimit:"PDF፣ ምስሎች፣ Word፣ Excel ወይም ጽሑፍ · እስከ 50 MB",browse:"ፋይሎችን ይምረጡ",docName:"የሰነድ ስም",category:"ምድብ",docType:"የሰነድ አይነት",notes:"ማስታወሻ / የመሬት ወይም የእቃ ዝርዝር",notesPlaceholder:"ለመሬት ሰነዶች የመሬቱን ቦታ፣ መጠን ወይም የፓርሴል ቁጥር ይጻፉ። ለመሳሪያ የማሽኑን ስም ወይም የጥገና ዝርዝር ያክሉ።",notesHint:"ምሳሌ፦ ቀበሌ 04፣ ፕሎት 18፣ 2 ሄክታር።",cancel:"ሰርዝ",save:"ሰነድ አስቀምጥ",details:"የሰነድ ዝርዝር",close:"ዝጋ",download:"አውርድ",view:"ክፈት",delete:"ሰርዝ",confirmDelete:"ይህን ሰነድ በቋሚነት ይሰርዙ?",chooseFile:"መጀመሪያ ፋይል ይምረጡ።",nameRequired:"የሰነድ ስም ያስገቡ።",uploading:"በመጫን ላይ…",uploadSuccess:"ሰነዱ በተሳካ ሁኔታ ተቀምጧል።",uploadFailed:"መጫን አልተሳካም። የSupabase ቅንብርንና ፖሊሲዎችን ያረጋግጡ።",loadingFailed:"ሰነዶችን መጫን አልተቻለም።",connected:"ደህንነቱ የተጠበቀ ማከማቻ ተገናኝቷል።",notSignedIn:"የግል ሰነዶችዎን ለማየት ወደ AgriNova ይግቡ።",keyMissing:"በdocuments.js ውስጥ የSupabase ቁልፍ ያስገቡ።",tooLarge:"ፋይሉ ከ50 MB ገደብ በላይ ነው።",unsupported:"ይህ የፋይል አይነት አይደገፍም።",noDocs:"በዚህ ምድብ ውስጥ ገና ሰነድ የለም።",noDocsText:"ፋይል ለመጫን ከላይ ካሉት አቋራጮች አንዱን ይምረጡ።",noResults:"የሚዛመድ ሰነድ የለም",noResultsText:"ሌላ የፍለጋ ቃል ወይም ማጣሪያ ይሞክሩ።",document:"ሰነድ",documents:"ሰነዶች",uploaded:"የተጫነበት",size:"የፋይል መጠን",file:"ፋይል",notesLabel:"ማስታወሻ",noNotes:"ማስታወሻ የለም",deleteSuccess:"ሰነዱ ተሰርዟል።",deleteFailed:"ሰነዱን መሰረዝ አልተቻለም።",downloadFailed:"ሰነዱን ማውረድ አልተቻለም።"},

    ti:{tagline:"ኣካባቢያዊ እና ዘመናዊ ሕርሻ ምዕባለ",search:"ሰነዳት ድለ...",notifications:"ምልክታታት",notificationText:"ሰነዳትካ ብሕታዊ እዮም። ኣገደስቲ ፋይላት ባክኣፕ ኣቐምጥ።",eyebrow:"ውሑስ ቤተ-መዝገብ ሰነዳትካ",title:"ሰነዳትን መዝገባትን",subtitle:"ኣገደስቲ ሰነዳት ሕርሻን ውልቃዊን ኣብ ሓደ ውሑስ ቦታ ኣዳሉ።",upload:"ሰነድ ጽዓን",connecting:"ምስ ውሑስ መኽዘን ይራኸብ ኣሎ…",retry:"እንደገና ፈትን",total:"ጠቕላላ ሰነዳት",used:"ዝተጠቕመ ቦታ",recent:"ናይ ቀረባ ግዜ ጽዕነት",categories:"ምድባት",chooseCategory:"ጉጅለ ሰነድ ምረጽ",all:"ኩሎም ሰነዳት",ownership:"ውልቃውን ዋንነት መሬትን",finance:"መዝገባት ገንዘብ",equipment:"መሳርሒን ማሽነሪን",government:"መንግስትን ሕብረት ስራሕን",emergency:"ህጹጽን ባክኣፕን",tipTitle:"ኩሉ ብቐሊሉ ርኸቦ",tipText:"ዓይነት ሰነድ ምረጽ፣ ግሉጽ ስም ሃቦ፣ ኣድላዪ እንተኾይኑ መዘኻኸሪ ወስኽ።",librarySubtitle:"ዝዓቀብካዮም ፋይላት ኣብዚ ይርኣዩ።",newest:"ሓድሽ ቀዳማይ",oldest:"ኣረጊት ቀዳማይ",az:"ስም A–Z",filter:"ኣጣርይ",shortcuts:"ቅልጡፍ ምርጫ ሰነድ",shortcutHelp:"ክትዕቅቦ እትደሊ ምረጽ",allFiles:"ኩሎም ፋይላት",images:"ስእልታት",office:"ናይ ቤት ጽሕፈት ፋይላት",loading:"ሰነዳትካ ይጽዓኑ ኣለዉ…",private:"ንሕሳብካ ጥራይ ብሕታዊ",footer:"ኣካባቢያዊ እና ዘመናዊ ሕርሻ ምዕባለ",secureUpload:"ውሑስ ምጽዓን ሰነድ",drop:"ፋይል ምረጽ ወይ ኣብዚ ጣል",fileLimit:"PDF፣ ስእሊ፣ Word፣ Excel ወይ ጽሑፍ · ክሳብ 50 MB",browse:"ፋይላት ምረጽ",docName:"ስም ሰነድ",category:"ምድብ",docType:"ዓይነት ሰነድ",notes:"መዘኻኸሪ / ዝርዝር መሬት ወይ ንብረት",notesPlaceholder:"ንሰነዳት መሬት ቦታ፣ ዓቐን ወይ ቁጽሪ ፓርሰል ጽሓፍ። ንመሳርሒ ስም ማሽን ወይ ዝርዝር ጽገና ወስኽ።",notesHint:"ኣብነት፦ ቀበሌ 04፣ ፕሎት 18፣ 2 ሄክታር።",cancel:"ሰርዝ",save:"ሰነድ ዓቅብ",details:"ዝርዝር ሰነድ",close:"ዕጸ",download:"ኣውርድ",view:"ርአ",delete:"ሰርዝ",confirmDelete:"እዚ ሰነድ ብቐዋሚነት ክስረዝ?",chooseFile:"በጃኻ መጀመርታ ፋይል ምረጽ።",nameRequired:"ስም ሰነድ ኣእቱ።",uploading:"ይጽዓን ኣሎ…",uploadSuccess:"ሰነድ ብዓወት ተዓቂቡ።",uploadFailed:"ምጽዓን ኣይተኻእለን።",loadingFailed:"ሰነዳት ምጽዓን ኣይተኻእለን።",connected:"ውሑስ መኽዘን ተራኺቡ።",notSignedIn:"ንሰነዳትካ ንምርኣይ ናብ AgriNova እቶ።",keyMissing:"ኣብ documents.js ቁልፊ Supabase ኣእቱ።",tooLarge:"ፋይል ካብ 50 MB ይዓቢ።",unsupported:"እዚ ዓይነት ፋይል ኣይድገፍን።",noDocs:"ኣብዚ ምድብ ገና ሰነድ የለን።",noDocsText:"ፋይል ንምጽዓን ካብ ላዕሊ ሓደ ምረጽ።",noResults:"ዝሰማማዕ ሰነድ የለን",noResultsText:"ካልእ ቃል ወይ ማጣርያ ፈትን።",document:"ሰነድ",documents:"ሰነዳት",uploaded:"ዝተጸዓነ",size:"ዓቐን ፋይል",file:"ፋይል",notesLabel:"መዘኻኸሪ",noNotes:"መዘኻኸሪ የለን",deleteSuccess:"ሰነድ ተሰሪዙ።",deleteFailed:"ሰነድ ምስራዝ ኣይተኻእለን።",downloadFailed:"ሰነድ ምውራድ ኣይተኻእለን።"},

    om:{tagline:"Qonna Naannoo fi Guddina Qonnaa Ismaartii",search:"Sanadoota barbaadi...",notifications:"Beeksisoota",notificationText:"Sanadoonni kee dhuunfaa dha. Faayilota barbaachisoo duubatti kuusi.",eyebrow:"KUUSAA SANADAA NAGEENYA QABU",title:"Sanadootaa fi Galmeewwan",subtitle:"Sanadoota qonnaa fi dhuunfaa barbaachisoo bakka nageenya qabu tokko keessatti qindeessi.",upload:"Sanada olkaa'i",connecting:"Kuusaa nageenya qabu waliin wal qunnamaa jira…",retry:"Irra deebi'i",total:"Sanadoota waliigalaa",used:"Bakka fayyadame",recent:"Sanadoota dhiheenya olkaa'aman",categories:"Ramaddiiwwan",chooseCategory:"Garee sanadaa filadhu",all:"Sanadoota hunda",ownership:"Eenyummaa fi abbummaa lafaa",finance:"Galmeewwan maallaqaa",equipment:"Meeshaalee fi maashinoota",government:"Mootummaa fi waldaa hojii gamtaa",emergency:"Yeroo balaa fi kuusaa duubaa",tipTitle:"Waan hunda salphaatti argadhu",tipText:"Gosa sanadaa filadhu, maqaa ifa ta'e kenni, yeroo barbaachisutti yaadannoo dabali.",librarySubtitle:"Faayiloonni kee asitti mul'atu.",newest:"Haaraa dursee",oldest:"Moofoo dursee",az:"Maqaa A–Z",filter:"Calali",shortcuts:"Filannoo saffisaa sanadaa",shortcutHelp:"Waan kuusuu barbaaddu filadhu",allFiles:"Faayilota hunda",images:"Suuraalee",office:"Faayilota waajjiraa",loading:"Sanadoota kee fe'aa jira…",private:"Herrega keetiif qofa",footer:"Qonna Naannoo fi Guddina Qonnaa Ismaartii",secureUpload:"SANADA NAGEENYAAN OLKAA'I",drop:"Faayila filadhu ykn asitti harkisi",fileLimit:"PDF, suuraa, Word, Excel ykn barruu · Hanga 50 MB",browse:"Faayilota filadhu",docName:"Maqaa sanadaa",category:"Ramaddii",docType:"Gosa sanadaa",notes:"Yaadannoo / odeeffannoo lafaa ykn meeshaa",notesPlaceholder:"Sanada lafaa irratti iddoo, bal'ina ykn lakkoofsa lafa barreessi. Meeshaaf maqaa maashinaa ykn odeeffannoo suphaa dabali.",notesHint:"Fakkeenya: Kebele 04, Plot 18, hektaara 2.",cancel:"Dhiisi",save:"Sanada kuusi",details:"ODEEFFANNOO SANADAA",close:"Cufi",download:"Buusi",view:"Bani",delete:"Haqi",confirmDelete:"Sanada kana guutummaatti haquu barbaaddaa?",chooseFile:"Jalqaba faayila filadhu.",nameRequired:"Maqaa sanadaa galchi.",uploading:"Olkaa'aa jira…",uploadSuccess:"Sanadni milkaa'inaan kuufameera.",uploadFailed:"Olkaa'uun hin milkoofne. Supabase fi imaammata isaa mirkaneessi.",loadingFailed:"Sanadoota fe'uun hin danda'amne.",connected:"Kuusaan nageenya qabu walitti hidhameera.",notSignedIn:"Sanadoota dhuunfaa argachuuf AgriNova seeni.",keyMissing:"documents.js keessatti furtuu Supabase galchi.",tooLarge:"Faayilli daangaa 50 MB caala.",unsupported:"Gosti faayila kanaa hin deeggaramu.",noDocs:"Ramaddii kana keessatti sanadi hin jiru.",noDocsText:"Faayila olkaa'uuf filannoo armaan olii keessaa tokko filadhu.",noResults:"Sanada walsimu hin argamne",noResultsText:"Jechoota barbaacha ykn calallii biraa yaali.",document:"sanada",documents:"sanadoota",uploaded:"Olkaa'ame",size:"Hammamtaa faayilaa",file:"Faayila",notesLabel:"Yaadannoo",noNotes:"Yaadannoon hin jiru",deleteSuccess:"Sanadni haqameera.",deleteFailed:"Sanada haquun hin danda'amne.",downloadFailed:"Sanada buusuun hin danda'amne."},

    so:{tagline:"Beeraha Maxalliga ah iyo Kobcinta Beeraha Casriga ah",search:"Raadi dukumentiyada...",notifications:"Ogeysiisyada",notificationText:"Dukumentiyadaadu waa gaar. Nuqul kayd ah ka samee faylasha muhiimka ah.",eyebrow:"MAKTABADDA DUKUMENTIYADAADA EE AMMAANKA AH",title:"Dukumentiyo iyo Diiwaanno",subtitle:"Dukumentiyada muhiimka ah ee beerta iyo kuwa gaarka ah ku kaydi hal meel oo ammaan ah.",upload:"Soo geli dukumenti",connecting:"Waxa lala xiriirayaa kaydkaaga ammaan ah…",retry:"Mar kale isku day",total:"Wadarta dukumentiyada",used:"Kaydka la isticmaalay",recent:"Dukumentiyada dhowaan la geliyey",categories:"Qaybaha",chooseCategory:"Dooro kooxda dukumentiga",all:"Dhammaan dukumentiyada",ownership:"Aqoonsi iyo lahaanshaha dhulka",finance:"Diiwaannada maaliyadda",equipment:"Qalabka iyo mashiinnada",government:"Dowladda iyo iskaashatada",emergency:"Xaaladaha degdegga ah iyo kaydka",tipTitle:"Wax walba si fudud u hel",tipText:"Dooro nooca dukumentiga, magac cad sii, kuna dar qoraal marka loo baahdo.",librarySubtitle:"Faylasha aad kaydisay halkan ayay ka muuqanayaan.",newest:"Kuwa cusub marka hore",oldest:"Kuwa hore marka hore",az:"Magaca A–Z",filter:"Shaandhee",shortcuts:"Noocyada dukumentiga",shortcutHelp:"Dooro waxa aad rabto inaad kaydiso",allFiles:"Dhammaan faylasha",images:"Sawirro",office:"Faylasha xafiiska",loading:"Dukumentiyadaada waa la soo rarayaa…",private:"Akoonkaaga oo keliya",footer:"Beeraha Maxalliga ah iyo Kobcinta Beeraha Casriga ah",secureUpload:"SOO GELIN DUKUMENTI AMMAAN AH",drop:"Dooro fayl ama halkan ku jiid",fileLimit:"PDF, sawirro, Word, Excel ama qoraal · Ilaa 50 MB",browse:"Baadh faylasha",docName:"Magaca dukumentiga",category:"Qaybta",docType:"Nooca dukumentiga",notes:"Qoraal / faahfaahinta dhulka ama qalabka",notesPlaceholder:"Dukumentiyada dhulka ku qor goobta, cabbirka ama lambarka qaybta. Qalabka ku dar magaca mashiinka ama faahfaahinta dayactirka.",notesHint:"Tusaale: Kebele 04, Plot 18, 2 hektar.",cancel:"Jooji",save:"Kaydi dukumentiga",details:"FAAHFAAHINTA DUKUMENTIGA",close:"Xir",download:"Soo dejiso",view:"Fur",delete:"Tirtir",confirmDelete:"Si joogto ah ma u tirtiraysaa dukumentigan?",chooseFile:"Fadlan marka hore dooro fayl.",nameRequired:"Geli magaca dukumentiga.",uploading:"Waa la soo gelinayaa…",uploadSuccess:"Dukumentiga si guul leh ayaa loo kaydiyey.",uploadFailed:"Soo gelintu way fashilantay. Hubi dejinta Supabase iyo siyaasadaha.",loadingFailed:"Dukumentiyada lama soo rari karin.",connected:"Kaydka ammaanka ah waa ku xiran yahay.",notSignedIn:"Gal AgriNova si aad u hesho dukumentiyadaada gaarka ah.",keyMissing:"Ku dar furaha Supabase ee documents.js.",tooLarge:"Faylkani wuxuu ka weyn yahay 50 MB.",unsupported:"Nooca faylkan lama taageero.",noDocs:"Qaybtan weli dukumenti kuma jiro.",noDocsText:"Dooro mid ka mid ah noocyada kore si aad fayl u soo geliso.",noResults:"Dukumenti ku habboon lama helin",noResultsText:"Isku day eray kale ama shaandho kale.",document:"dukumenti",documents:"dukumentiyo",uploaded:"La soo geliyey",size:"Cabbirka faylka",file:"Faylka",notesLabel:"Qoraal",noNotes:"Qoraal lama darin",deleteSuccess:"Dukumentiga waa la tirtiray.",deleteFailed:"Dukumentiga lama tirtiri karin.",downloadFailed:"Dukumentiga lama soo dejin karin."}
  };

  const t=k => (T[lang]&&T[lang][k])||T.en[k]||k;
  const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ext=n=>String(n||"").split(".").pop().toLowerCase();
  const size=n=>{n=Number(n)||0;if(!n)return "0 B";const u=["B","KB","MB","GB"];let i=0;while(n>=1024&&i<u.length-1){n/=1024;i++;}return `${n.toFixed(i?1:0)} ${u[i]}`;};
  const date=v=>new Date(v).toLocaleDateString(lang==="am"?"am-ET":lang==="so"?"so-SO":lang==="om"?"om-ET":lang==="ti"?"ti-ET":"en-GB",{day:"numeric",month:"short",year:"numeric"});

  function translate(){
    document.documentElement.lang=lang;
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const k=el.dataset.i18n;
      if(t(k))el.textContent=t(k);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
    $("languageLabel").textContent=({en:"English",am:"አማርኛ",ti:"ትግርኛ",om:"Afaan Oromo",so:"Af Soomaali"})[lang];
    renderShortcuts();
    renderDocs();
  }

  function categoryName(k){return t(k);}
  function displayDocType(cat,value){const i=categoryNames[cat]?.indexOf(value);return i>=0?typeLabel(cat,i):(value||"—");}
  function typeLabel(cat,index){return (typeNames[lang]&&typeNames[lang][cat]&&typeNames[lang][cat][index])||categoryNames[cat][index];}

  function setupDB(){
    if(db)return;
    if(window.supabaseClient){db=window.supabaseClient;return;}
    if(!window.supabase||!SUPABASE_ANON_KEY||SUPABASE_ANON_KEY.includes("PASTE_YOUR"))return;
    db=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
  }
    function banner(msg,state=""){
    const el=$("connectionBanner");
    $("connectionMessage").textContent=msg;
    el.classList.remove("success","error");
    if(state)el.classList.add(state);
  }

  function toast(msg,error=false){
    const el=document.createElement("div");
    el.className="toast"+(error?" error":"");
    el.textContent=msg;
    $("toastContainer").appendChild(el);
    setTimeout(()=>el.remove(),4200);
  }

  function renderShortcuts(){
    const grid=$("shortcutGrid");
    if(!grid)return;
    let keys=activeCategory==="all"?categoryKeys:[activeCategory];
    grid.innerHTML=keys.flatMap(cat=>categoryNames[cat].map((name,i)=>`
      <button class="shortcut-card" type="button"
        data-shortcut-category="${cat}"
        data-shortcut-index="${i}"
        title="${safe(typeLabel(cat,i))}">
        <i class="fa-regular fa-file-lines"></i>
        <span>${safe(typeLabel(cat,i))}</span>
      </button>`)).join("");

    grid.querySelectorAll("[data-shortcut-category]").forEach(b=>
      b.addEventListener("click",()=>openUpload(b.dataset.shortcutCategory,Number(b.dataset.shortcutIndex)))
    );
  }

  function updateTypeOptions(preferredIndex=0){
    const cat=$("documentCategory").value;
    $("documentType").innerHTML=categoryNames[cat].map((name,i)=>
      `<option value="${safe(name)}">${safe(typeLabel(cat,i))}</option>`
    ).join("");
    if(Number.isInteger(preferredIndex)&&preferredIndex<categoryNames[cat].length){
      $("documentType").selectedIndex=preferredIndex;
    }
  }

  function fileKind(d){
    const e=ext(d.file_name);
    if(e==="pdf")return "pdf";
    if(["png","jpg","jpeg","webp","gif"].includes(e))return "image";
    if(["doc","docx","xls","xlsx","csv","txt"].includes(e))return "office";
    return "file";
  }

  function updateStats(){
    const shown=docs.filter(d=>categoryKeys.includes(d.category));
    $("totalDocuments").textContent=shown.length;
    $("storageUsed").textContent=size(shown.reduce((s,d)=>s+(Number(d.file_size)||0),0));
    const since=Date.now()-30*86400000;
    $("recentUploads").textContent=shown.filter(d=>new Date(d.created_at).getTime()>=since).length;
    $("categoryTotal").textContent=categoryKeys.length;
    $("count-all").textContent=shown.length;
    categoryKeys.forEach(k=>$("count-"+k).textContent=shown.filter(d=>d.category===k).length);
  }

  function filtered(){
    const q=$("globalSearch").value.trim().toLowerCase();
    return docs.filter(d=>
      categoryKeys.includes(d.category)&&
      (activeCategory==="all"||d.category===activeCategory)&&
      (!q||[d.name,d.document_type,d.file_name,d.notes,d.category].join(" ").toLowerCase().includes(q))&&
      (activeFilter==="all"||
        (activeFilter==="pdf"&&fileKind(d)==="pdf")||
        (activeFilter==="image"&&fileKind(d)==="image")||
        (activeFilter==="office"&&fileKind(d)==="office"))
    ).sort((a,b)=>
      $("sortSelect").value==="oldest"?new Date(a.created_at)-new Date(b.created_at):
      $("sortSelect").value==="name"?a.name.localeCompare(b.name):
      new Date(b.created_at)-new Date(a.created_at)
    );
  }

  function renderDocs(){
    const grid=$("documentGrid");
    if(!grid)return;

    const list=filtered();
    $("currentCategoryTitle").textContent=activeCategory==="all"?t("all"):t(activeCategory);
    $("resultsDescription").textContent=activeCategory==="all"
      ?t("librarySubtitle")
      :`${list.length} ${list.length===1?t("document"):t("documents")}`;
    $("listCount").textContent=`${list.length} ${list.length===1?t("document"):t("documents")}`;

    updateStats();

    if(!list.length){
      const searching=$("globalSearch").value.trim()||activeFilter!=="all";
      grid.innerHTML=`
        <div class="empty-state">
          <i class="fa-regular fa-folder-open" style="font-size:26px;color:#8ca47e"></i>
          <strong>${searching?t("noResults"):t("noDocs")}</strong>
          <p>${searching?t("noResultsText"):t("noDocsText")}</p>
        </div>`;
      return;
    }

    grid.innerHTML=list.map(d=>{
      const kind=fileKind(d);
      const icon=kind==="pdf"?"fa-file-pdf":kind==="image"?"fa-file-image":kind==="office"?"fa-file-lines":"fa-file";

      return `
        <article class="document-card">
          <div class="file-top">
            <span class="file-icon ${kind}"><i class="fa-regular ${icon}"></i></span>
            <button class="more-button" data-action="details" data-id="${safe(d.id)}" aria-label="Details">
              <i class="fa-solid fa-ellipsis"></i>
            </button>
          </div>
          <div class="file-name" title="${safe(d.name)}">${safe(d.name)}</div>
          <div class="file-type">${safe(displayDocType(d.category,d.document_type)||d.file_name||"")}</div>
          <div class="file-meta">
            <span class="file-category">${safe(categoryName(d.category))}</span>
            <span>${size(d.file_size)}</span>
          </div>
          <div class="file-meta">
            <span>${date(d.created_at)}</span>
            <span>${ext(d.file_name).toUpperCase()}</span>
          </div>
          <div class="card-actions">
            <button data-action="view" data-id="${safe(d.id)}"><i class="fa-regular fa-eye"></i> ${t("view")}</button>
            <button data-action="download" data-id="${safe(d.id)}"><i class="fa-solid fa-download"></i> ${t("download")}</button>
          </div>
        </article>`;
    }).join("");
  }

  async function loadDocs(){
    setupDB();
    if(!db){
      banner(t("keyMissing"),"error");
      return;
    }

    try{
      const {data:{user:u},error:authError}=await db.auth.getUser();

      if(authError||!u){
        user=null;
        banner(t("notSignedIn"),"error");
        $("documentGrid").innerHTML=`
          <div class="empty-state">
            <i class="fa-solid fa-lock"></i>
            <strong>${t("notSignedIn")}</strong>
          </div>`;
        return;
      }

      user=u;

      const {data,error}=await db.from(TABLE)
        .select("*")
        .eq("farmer_id",u.id)
        .order("created_at",{ascending:false});

      if(error)throw error;

      docs=data||[];
      banner(t("connected"),"success");
      renderDocs();

    }catch(e){
      console.error(e);
      banner(`${t("loadingFailed")} ${e.message||""}`,"error");
    }
  }

  function openUpload(cat=activeCategory==="all"?"ownership":activeCategory,index=0){
    if(!user){
      toast(t("notSignedIn"),true);
      return;
    }

    $("uploadForm").reset();
    chosenFile=null;
    $("selectedFile").classList.add("hidden");
    $("uploadMessage").textContent="";
    $("documentCategory").value=categoryKeys.includes(cat)?cat:"ownership";
    updateTypeOptions(index);
    $("uploadModal").classList.remove("hidden");
  }

  function chooseFile(f){
    if(!f)return;

    if(f.size>MAX_FILE_SIZE){
      toast(t("tooLarge"),true);
      return;
    }

    if(!["pdf","png","jpg","jpeg","webp","doc","docx","xls","xlsx","csv","txt"].includes(ext(f.name))){
      toast(t("unsupported"),true);
      return;
    }

    chosenFile=f;
    $("selectedFile").textContent=`${f.name} · ${size(f.size)}`;
    $("selectedFile").classList.remove("hidden");

    if(!$("documentName").value){
      $("documentName").value=f.name.replace(/\.[^.]+$/,"");
    }
  }

  async function upload(event){
    event.preventDefault();

    if(!chosenFile){
      $("uploadMessage").textContent=t("chooseFile");
      return;
    }

    const name=$("documentName").value.trim();

    if(!name){
      $("uploadMessage").textContent=t("nameRequired");
      return;
    }

    if(!user||!db){
      $("uploadMessage").textContent=t("notSignedIn");
      return;
    }

    const btn=$("saveDocumentButton");
    btn.disabled=true;
    btn.textContent=t("uploading");
    $("uploadMessage").textContent="";

    const safeName=chosenFile.name.normalize("NFKD").replace(/[^\w.-]+/g,"_");
    const uid=crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const path=`${user.id}/${Date.now()}-${uid}-${safeName}`;

    try{
      const {error:upErr}=await db.storage.from(BUCKET).upload(
        path,
        chosenFile,
        {upsert:false,contentType:chosenFile.type||"application/octet-stream"}
      );

      if(upErr)throw upErr;

      const payload={
        farmer_id:user.id,
        name,
        category:$("documentCategory").value,
        document_type:$("documentType").value,
        file_name:chosenFile.name,
        storage_path:path,
        mime_type:chosenFile.type||null,
        file_size:chosenFile.size,
        notes:$("documentNotes").value.trim()||null
      };

      const {error:insertErr}=await db.from(TABLE).insert(payload);

      if(insertErr){
        await db.storage.from(BUCKET).remove([path]);
        throw insertErr;
      }

      $("uploadModal").classList.add("hidden");
      toast(t("uploadSuccess"));
      await loadDocs();

    }catch(e){
      console.error(e);
      $("uploadMessage").textContent=`${t("uploadFailed")} ${e.message||""}`;

    }finally{
      btn.disabled=false;
      btn.innerHTML=`<i class="fa-solid fa-cloud-arrow-up"></i><span>${t("save")}</span>`;
    }
  }

  async function getBlob(d){
    const {data,error}=await db.storage.from(BUCKET).download(d.storage_path);
    if(error)throw error;
    return data;
  }

  async function download(d){
    try{
      const blob=await getBlob(d);
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;
      a.download=d.file_name||d.name;
      a.click();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
    }catch(e){
      toast(`${t("downloadFailed")} ${e.message||""}`,true);
    }
  }

  async function view(d){
    try{
      const blob=await getBlob(d);
      const url=URL.createObjectURL(blob);
      window.open(url,"_blank","noopener");
      setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch(e){
      toast(`${t("downloadFailed")} ${e.message||""}`,true);
    }
  }

  function details(d){
    activeDoc=d;
    $("detailName").textContent=d.name;

    $("detailBody").innerHTML=`
      <div class="detail-row"><span>${t("category")}</span><strong>${safe(categoryName(d.category))}</strong></div>
      <div class="detail-row"><span>${t("docType")}</span><strong>${safe(displayDocType(d.category,d.document_type)||"—")}</strong></div>
      <div class="detail-row"><span>${t("file")}</span><strong>${safe(d.file_name)}</strong></div>
      <div class="detail-row"><span>${t("size")}</span><strong>${size(d.file_size)}</strong></div>
      <div class="detail-row"><span>${t("uploaded")}</span><strong>${date(d.created_at)}</strong></div>
      <div class="detail-notes"><strong>${t("notesLabel")}</strong><br>${safe(d.notes||t("noNotes"))}</div>
      <div class="modal-actions" style="justify-content:flex-start">
        <button class="secondary-button" id="deleteDocumentButton" style="color:#a4614d">
          <i class="fa-regular fa-trash-can"></i> ${t("delete")}
        </button>
      </div>`;

    $("detailsModal").classList.remove("hidden");
    $("deleteDocumentButton").addEventListener("click",()=>removeDoc(d));
  }

  async function removeDoc(d){
    if(!confirm(t("confirmDelete")))return;

    try{
      const {error:e1}=await db.from(TABLE)
        .delete()
        .eq("id",d.id)
        .eq("farmer_id",user.id);

      if(e1)throw e1;

      const {error:e2}=await db.storage.from(BUCKET).remove([d.storage_path]);
      if(e2)console.warn("Storage cleanup failed:",e2.message);

      $("detailsModal").classList.add("hidden");
      toast(t("deleteSuccess"));
      await loadDocs();

    }catch(e){
      console.error(e);
      toast(`${t("deleteFailed")} ${e.message||""}`,true);
    }
  }

  function init(){
    translate();

    $("languageButton").addEventListener("click",()=>$("languageMenu").classList.toggle("hidden"));

    $("languageMenu").querySelectorAll("[data-lang]").forEach(b=>
      b.addEventListener("click",()=>{
        lang=b.dataset.lang;
        localStorage.setItem("agrinova_language",lang);
        $("languageMenu").classList.add("hidden");
        translate();
      })
    );

    $("notificationButton").addEventListener("click",()=>$("notificationPanel").classList.toggle("hidden"));

    document.addEventListener("click",e=>{
      if(!e.target.closest(".language-wrap"))$("languageMenu").classList.add("hidden");
      if(!e.target.closest(".notification-wrap"))$("notificationPanel").classList.add("hidden");
    });

    $("uploadTopButton").addEventListener("click",()=>openUpload());
    $("retryConnection").addEventListener("click",loadDocs);
    $("globalSearch").addEventListener("input",renderDocs);
    $("sortSelect").addEventListener("change",renderDocs);
    $("documentCategory").addEventListener("change",()=>updateTypeOptions(0));
    $("uploadForm").addEventListener("submit",upload);
    $("browseFiles").addEventListener("click",()=>$("modalFileInput").click());

    $("modalFileInput").addEventListener("change",e=>chooseFile(e.target.files[0]));
    $("fileInput").addEventListener("change",e=>chooseFile(e.target.files[0]));

    $("dropZone").addEventListener("dragover",e=>{
      e.preventDefault();
      $("dropZone").classList.add("dragging");
    });

    $("dropZone").addEventListener("dragleave",()=>$("dropZone").classList.remove("dragging"));

    $("dropZone").addEventListener("drop",e=>{
      e.preventDefault();
      $("dropZone").classList.remove("dragging");
      chooseFile(e.dataTransfer.files[0]);
    });

    document.querySelectorAll("[data-close]").forEach(b=>
      b.addEventListener("click",()=>$(b.dataset.close).classList.add("hidden"))
    );

    document.querySelectorAll(".modal-backdrop").forEach(m=>
      m.addEventListener("click",e=>{
        if(e.target===m)m.classList.add("hidden");
      })
    );

    document.querySelectorAll(".category-link").forEach(b=>
      b.addEventListener("click",()=>{
        activeCategory=b.dataset.category;
        document.querySelectorAll(".category-link").forEach(x=>x.classList.toggle("active",x===b));
        renderShortcuts();
        renderDocs();
      })
    );

    document.querySelectorAll(".filter-chip").forEach(b=>
      b.addEventListener("click",()=>{
        activeFilter=b.dataset.filter;
        document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));
        renderDocs();
      })
    );

    $("documentGrid").addEventListener("click",e=>{
      const b=e.target.closest("[data-action]");
      if(!b)return;

      const d=docs.find(x=>String(x.id)===b.dataset.id);
      if(!d)return;

      if(b.dataset.action==="details")details(d);
      if(b.dataset.action==="view")view(d);
      if(b.dataset.action==="download")download(d);
    });

    $("detailDownload").addEventListener("click",()=>{
      if(activeDoc)download(activeDoc);
    });

    $("typeFilterButton").addEventListener("click",()=>$("quickFilters").classList.toggle("hidden"));

    document.addEventListener("keydown",e=>{
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
        e.preventDefault();
        $("globalSearch").focus();
      }
      if(e.key==="Escape"){
        document.querySelectorAll(".modal-backdrop").forEach(m=>m.classList.add("hidden"));
      }
    });

    renderShortcuts();
    loadDocs();
  }

  document.addEventListener("DOMContentLoaded",init);
})();