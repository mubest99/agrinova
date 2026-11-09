(() => {
"use strict";

const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";
const IMAGE_BUCKET = "marketplace-images";
const PROOF_BUCKET = "marketplace-payment-proofs";

const $ = id => document.getElementById(id);
const clientReady = !!(window.supabase && SUPABASE_URL.startsWith("https://") && !SUPABASE_ANON_KEY.includes("PASTE_YOUR"));
const db = clientReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const state = {
  user:null,
  profile:null,
  products:[],
  tab:"shop",
  category:"all",
  search:"",
  editingId:null,
  photos:[],
  cart:[],
  language:"en"
};

const translations = {
en:{searchPlaceholder:"Search crops, seeds, fertilizers and supplies…",eyebrow:"GROW TOGETHER. TRADE BETTER.",headline:"Your farm. Your marketplace.",intro:"Buy quality farm inputs and fresh produce directly from fellow farmers.",sellProduct:"Sell a product",farmerToFarmer:"Farmer-to-farmer trading",discover:"DISCOVER",marketTitle:"Marketplace",marketSubtitle:"Everything your farm needs, all in one place.",createListing:"Create listing",shop:"Shop products",myListings:"My listings",myOrders:"My orders",mySales:"My sales",saved:"Saved",findProducts:"Find what you need",filterIntro:"Browse produce, agricultural inputs, tools and equipment.",clearFilters:"Clear filters",category:"Category",allCategories:"All categories",location:"Location",allLocations:"All locations",sortBy:"Sort by",newest:"Newest first",priceLow:"Price: low to high",priceHigh:"Price: high to low",all:"All",grains:"Grains",seeds:"Seeds",fertilizers:"Fertilizers",pesticides:"Pesticides",herbicides:"Herbicides",tools:"Tools",productsFound:"products found",secureTrading:"Secure account-based marketplace",footerText:"Connecting farmers. Growing opportunity.",sellerCorner:"SELLER CORNER",productName:"Product name *",unit:"Unit *",quantity:"Available quantity *",price:"Price per unit (ETB) *",minimumOrder:"Minimum order",region:"Region / city",description:"Description",photos:"Product photos (up to 5, 2 MB each)",photoHint:"Images are uploaded to AgriNova Supabase Storage.",cancel:"Cancel",publish:"Publish listing",yourCart:"Your cart",checkout:"Checkout",deliveryLocation:"Delivery / collection location *",paymentMethod:"Payment method",phone:"Contact phone *",paymentNote:"For bank or mobile payments, the seller will confirm payment after reviewing the proof.",placeOrder:"Place order",addCart:"Add to cart",viewDetails:"View details",perUnit:"per",noProducts:"No products match these filters.",loginRequired:"Please sign in to your AgriNova account to use the marketplace.",configMissing:"Add your Supabase publishable/anon key in farmer-marketplace.js before using the marketplace.",loading:"Loading marketplace…",noListings:"You have not published any listings yet.",noOrders:"No orders found.",noSaved:"You have not saved any products yet.",seller:"Seller",stock:"Available",min:"Minimum",locationLabel:"Location",descriptionLabel:"About this product",edit:"Edit",delete:"Delete",remove:"Remove",subtotal:"Subtotal",total:"Total",emptyCart:"Your cart is empty.",orderSuccess:"Your order has been placed.",listingSuccess:"Your listing has been published.",listingUpdated:"Your listing has been updated.",deleteConfirm:"Delete this listing?",uploadError:"One or more images could not be uploaded.",noPermission:"You do not have permission to perform this action.",status:"Status",buyer:"Buyer",orderDate:"Order date",items:"items",order:"Order",noDescription:"No description provided.",photoLimit:"Select no more than five images, each 2 MB or smaller.",selectCategory:"Choose category"},

am:{searchPlaceholder:"ሰብሎችን፣ ዘሮችን፣ ማዳበሪያዎችን እና እቃዎችን ይፈልጉ…",eyebrow:"አብረን እናድግ። በተሻለ ሁኔታ እንነግድ።",headline:"የእርሻዎ። የእርስዎ ገበያ።",intro:"ጥራት ያላቸውን የእርሻ ግብዓቶችና ትኩስ ምርቶችን ከሌሎች አርሶ አደሮች በቀጥታ ይግዙ።",sellProduct:"ምርት ይሽጡ",farmerToFarmer:"ከአርሶ አደር ለአርሶ አደር",discover:"ያስሱ",marketTitle:"የገበያ ቦታ",marketSubtitle:"እርሻዎ የሚፈልገው ሁሉ በአንድ ቦታ።",createListing:"ምርት ያስገቡ",shop:"ምርቶችን ይግዙ",myListings:"የእኔ ምርቶች",myOrders:"የእኔ ትዕዛዞች",mySales:"የእኔ ሽያጮች",saved:"የተቀመጡ",findProducts:"የሚፈልጉትን ያግኙ",filterIntro:"ምርቶችን፣ የእርሻ ግብዓቶችን፣ መሳሪያዎችን ያስሱ።",clearFilters:"ማጣሪያዎችን አጽዳ",category:"ምድብ",allCategories:"ሁሉም ምድቦች",location:"አካባቢ",allLocations:"ሁሉም አካባቢዎች",sortBy:"ደርድር",newest:"አዲሶቹ መጀመሪያ",priceLow:"ዋጋ፦ ከዝቅተኛ ወደ ከፍተኛ",priceHigh:"ዋጋ፦ ከፍተኛ ወደ ዝቅተኛ",all:"ሁሉም",grains:"እህሎች",seeds:"ዘሮች",fertilizers:"ማዳበሪያዎች",pesticides:"ፀረ-ተባይ",herbicides:"ፀረ-አረም",tools:"መሳሪያዎች",productsFound:"ምርቶች ተገኝተዋል",secureTrading:"በመለያ የተጠበቀ ገበያ",footerText:"አርሶ አደሮችን እናገናኛለን። እድልን እናሳድጋለን።",sellerCorner:"የሻጭ ክፍል",productName:"የምርት ስም *",unit:"መለኪያ *",quantity:"ያለው መጠን *",price:"የአንዱ ዋጋ (ብር) *",minimumOrder:"ዝቅተኛ ትዕዛዝ",region:"ክልል / ከተማ",description:"መግለጫ",photos:"የምርት ፎቶዎች (እስከ 5፣ እያንዳንዱ 2 MB)",photoHint:"ፎቶዎች ወደ Supabase Storage ይጫናሉ።",cancel:"ሰርዝ",publish:"ምርትን አትም",yourCart:"የግዢ ቅርጫት",checkout:"ክፍያ",deliveryLocation:"የማድረሻ / መቀበያ ቦታ *",paymentMethod:"የክፍያ ዘዴ",phone:"ስልክ *",paymentNote:"በባንክ ወይም በሞባይል ክፍያ ሻጩ ክፍያውን ያረጋግጣል።",placeOrder:"ትዕዛዝ ይላኩ",addCart:"ወደ ቅርጫት ጨምር",viewDetails:"ዝርዝር ይመልከቱ",perUnit:"በ",noProducts:"ከዚህ ማጣሪያ ጋር የሚስማማ ምርት የለም።",loginRequired:"ገበያውን ለመጠቀም ወደ AgriNova ይግቡ።",configMissing:"በ farmer-marketplace.js ውስጥ የ Supabase ቁልፍዎን ያስገቡ።",loading:"ገበያው በመጫን ላይ…",noListings:"እስካሁን ምርት አላስገቡም።",noOrders:"ትዕዛዝ አልተገኘም።",noSaved:"የተቀመጠ ምርት የለም።",seller:"ሻጭ",stock:"ያለው",min:"ዝቅተኛ",locationLabel:"አካባቢ",descriptionLabel:"ስለ ምርቱ",edit:"አርም",delete:"ሰርዝ",remove:"አስወግድ",subtotal:"ንዑስ ድምር",total:"ጠቅላላ",emptyCart:"ቅርጫቱ ባዶ ነው።",orderSuccess:"ትዕዛዝዎ ተልኳል።",listingSuccess:"ምርትዎ ታትሟል።",listingUpdated:"ምርትዎ ተዘምኗል።",deleteConfirm:"ይህን ምርት ይሰርዙ?",uploadError:"አንዳንድ ፎቶዎች መጫን አልቻሉም።",noPermission:"ይህን ለማድረግ ፈቃድ የለዎትም።",status:"ሁኔታ",buyer:"ገዢ",orderDate:"የትዕዛዝ ቀን",items:"እቃዎች",order:"ትዕዛዝ",noDescription:"መግለጫ የለም።",photoLimit:"እስከ 5 ፎቶዎች ብቻ፣ እያንዳንዱ 2 MB ወይም ከዚያ በታች ይምረጡ።",selectCategory:"ምድብ ይምረጡ"},

ti:{searchPlaceholder:"ሰብልታት፣ ዘርን፣ ድኹዒን ኣቕሑን ድለዩ…",eyebrow:"ብሓባር ንዕበ። ብዝሓሸ ንነግድ።",headline:"ሕርሻኻ። ዕዳጋኻ።",intro:"ጽሬት ዘለዎም ናይ ሕርሻ ኣቕሑን ሓደሽቲ ፍርያትን ብቐጥታ ካብ ካልኦት ሓረስቶት ይግዝኡ።",sellProduct:"ፍርያት ሽጡ",farmerToFarmer:"ካብ ሓረስታይ ንሓረስታይ",discover:"ድለዩ",marketTitle:"ዕዳጋ",marketSubtitle:"ኩሉ ንሕርሻኻ ዘድሊ ኣብ ሓደ ቦታ።",createListing:"ፍርያት ኣቕርብ",shop:"ፍርያት ይግዝኡ",myListings:"ፍርያተይ",myOrders:"ትእዛዛተይ",mySales:"መሸጣይ",saved:"ዝተዓቀቡ",findProducts:"ዘድልየኩም ርኸቡ",filterIntro:"ፍርያት፣ ኣቕሑ ሕርሻ፣ መሳርሒታትን መሳርሒ ስራሕን ድለዩ።",clearFilters:"መጣርያታት ኣጽርዩ",category:"ዓይነት",allCategories:"ኩሎም ዓይነታት",location:"ቦታ",allLocations:"ኩሉ ቦታታት",sortBy:"ብቅደም ተኸተል",newest:"ሓደሽቲ ቀዳምነት",priceLow:"ዋጋ፦ ካብ ዝተሓተ ናብ ዝለዓለ",priceHigh:"ዋጋ፦ ካብ ዝለዓለ ናብ ዝተሓተ",all:"ኩሉ",grains:"እኽሊ",seeds:"ዘርኢ",fertilizers:"ድኹዒ",pesticides:"ፀረ-ባልዕ",herbicides:"ፀረ-ሓሰር",tools:"መሳርሒታት",productsFound:"ፍርያት ተረኺቦም",secureTrading:"ብመለያ ዝተሓለወ ዕዳጋ",footerText:"ሓረስቶት ነራኽብ። ዕድል ነዕቢ።",sellerCorner:"ክፍሊ ሸያጢ",productName:"ስም ፍርያት *",unit:"መለክዒ *",quantity:"ዘሎ ብዝሒ *",price:"ዋጋ ንሓደ (ብር) *",minimumOrder:"ዝተሓተ ትእዛዝ",region:"ክልል / ከተማ",description:"መግለጺ",photos:"ስእሊ ፍርያት (ክሳብ 5፣ ነፍሲ ወከፍ 2 MB)",photoHint:"ስእልታት ናብ Supabase Storage ይልኣኹ።",cancel:"ሰርዝ",publish:"ፍርያት ኣቕርብ",yourCart:"ዓረብያ ዕድጊ",checkout:"ክፍሊት",deliveryLocation:"ቦታ ምብጻሕ / ምቕባል *",paymentMethod:"ኣገባብ ክፍሊት",phone:"ስልኪ *",paymentNote:"ንክፍሊት ባንክ ወይ ሞባይል፣ ሸያጢ ድሕሪ ምርግጋጽ ክፍሊት የረጋግጽ።",placeOrder:"ትእዛዝ ስደዱ",addCart:"ናብ ዓረብያ ወስኽ",viewDetails:"ዝርዝር ርአ",perUnit:"ን",noProducts:"ምስዚ መጣርያ ዝሰማማዕ ፍርያት የለን።",loginRequired:"ንዕዳጋ ንምጥቃም ናብ AgriNova እቶ።",configMissing:"ኣብ farmer-marketplace.js ቁልፊ Supabase ኣእትዉ።",loading:"ዕዳጋ ይጽዕን ኣሎ…",noListings:"ገና ፍርያት ኣየቕረብካን።",noOrders:"ትእዛዝ ኣይተረኽበን።",noSaved:"ዝተዓቀበ ፍርያት የለን።",seller:"ሸያጢ",stock:"ዘሎ",min:"ዝተሓተ",locationLabel:"ቦታ",descriptionLabel:"ብዛዕባ እዚ ፍርያት",edit:"ኣርም",delete:"ሰርዝ",remove:"ኣልግስ",subtotal:"ንኡስ ድምር",total:"ጠቕላላ",emptyCart:"ዓረብያኻ ባዶ እያ።",orderSuccess:"ትእዛዝካ ተላኢኹ።",listingSuccess:"ፍርያትካ ተሓቲሙ።",listingUpdated:"ፍርያትካ ተሓዲሱ።",deleteConfirm:"ነዚ ፍርያት ትሰርዞ?",uploadError:"ገለ ስእልታት ክልኣኹ ኣይከኣሉን።",noPermission:"ነዚ ክትገብር ፍቓድ የብልካን።",status:"ኩነታት",buyer:"ዓዳጊ",orderDate:"ዕለት ትእዛዝ",items:"ኣቕሑ",order:"ትእዛዝ",noDescription:"መግለጺ የለን።",photoLimit:"ክሳብ 5 ስእልታት ጥራይ፣ ነፍሲ ወከፍ 2 MB ወይ ትሕቲኡ ምረጹ።",selectCategory:"ዓይነት ምረጹ"},

om:{searchPlaceholder:"Midhaan, sanyii, xaa’oo fi meeshaalee barbaadi…",eyebrow:"WALIIN HAA GUDDANU. HAALA GAARIIN HAA Daldallu.",headline:"Qonna kee. Gabaa kee.",intro:"Galteewwan qonnaa fi oomisha haaraa qonnaan bultoota biroo irraa kallattiin bitadhu.",sellProduct:"Oomisha gurguri",farmerToFarmer:"Qonnaan bulaa irraa gara qonnaan bulaatti",discover:"BARBAADI",marketTitle:"Gabaa",marketSubtitle:"Wanti qonna keef barbaachisu hundi bakka tokkotti.",createListing:"Oomisha galchi",shop:"Oomisha bitadhu",myListings:"Oomisha koo",myOrders:"Ajaja koo",mySales:"Gurgurtaa koo",saved:"Kan olkaa’ame",findProducts:"Wanta barbaaddu argadhu",filterIntro:"Oomisha, galteewwan qonnaa, meeshaalee fi mi’a hojii qonnaa ilaali.",clearFilters:"Filannoo qulqulleessi",category:"Ramaddii",allCategories:"Ramaddii hunda",location:"Bakka",allLocations:"Bakka hunda",sortBy:"Tartiibessi",newest:"Haaraa dura",priceLow:"Gatii: xiqqaa irraa gara guddaatti",priceHigh:"Gatii: guddaa irraa gara xiqqaatti",all:"Hunda",grains:"Midhaan",seeds:"Sanyii",fertilizers:"Xaa’oo",pesticides:"Qoricha ilbiisotaa",herbicides:"Qoricha aramaa",tools:"Meeshaalee",productsFound:"oomisha argame",secureTrading:"Gabaa herrega irratti hundaa’e",footerText:"Qonnaan bultoota wal qunnamsiisna. Carraa guddifna.",sellerCorner:"KUTAA GURGURTAA",productName:"Maqaa oomishaa *",unit:"Safartuu *",quantity:"Baay’ina jiru *",price:"Gatii tokkoof (ETB) *",minimumOrder:"Ajaja xiqqaa",region:"Naannoo / magaalaa",description:"Ibsa",photos:"Suuraa oomishaa (hanga 5, tokkoon tokkoon 2 MB)",photoHint:"Suuraaleen Supabase Storage keessa olkaa’amu.",cancel:"Dhiisi",publish:"Oomisha maxxansi",yourCart:"Gaarii bittaa",checkout:"Kaffaltii",deliveryLocation:"Bakka geessuu / fudhachuu *",paymentMethod:"Mala kaffaltii",phone:"Bilbila quunnamtii *",paymentNote:"Kaffaltii baankii ykn moobaayilii irratti gurgurtaan kaffaltii ni mirkaneessa.",placeOrder:"Ajaja ergi",addCart:"Gara gaarii bittaatti dabali",viewDetails:"Bal’ina ilaali",perUnit:"tokkoof",noProducts:"Oomishni filannoo kanaan wal simu hin jiru.",loginRequired:"Gabaa fayyadamuuf gara herrega AgriNova seeni.",configMissing:"Furtuu Supabase kee farmer-marketplace.js keessatti galchi.",loading:"Gabaan fe’amaa jira…",noListings:"Ammaaf oomisha hin galchine.",noOrders:"Ajajni hin argamne.",noSaved:"Oomishni olkaa’ame hin jiru.",seller:"Gurguraa",stock:"Kan jiru",min:"Xiqqaa",locationLabel:"Bakka",descriptionLabel:"Waa’ee oomisha kanaa",edit:"Sirreessi",delete:"Haqi",remove:"Balleessi",subtotal:"Ida’ama xiqqaa",total:"Waliigala",emptyCart:"Gaariin bittaa kee duwwaadha.",orderSuccess:"Ajajni kee ergameera.",listingSuccess:"Oomishni kee maxxanfameera.",listingUpdated:"Oomishni kee haaromfameera.",deleteConfirm:"Oomisha kana haquu barbaaddaa?",uploadError:"Suuraaleen tokko tokko olkaa’amuu hin dandeenye.",noPermission:"Kana raawwachuuf hayyamni siif hin jiru.",status:"Haala",buyer:"Bitaa",orderDate:"Guyyaa ajajaa",items:"meeshaalee",order:"Ajaja",noDescription:"Ibsi hin jiru.",photoLimit:"Suuraa shan qofa filadhu; tokkoon tokkoon isaanii 2 MB ykn isaa gadi.",selectCategory:"Ramaddii filadhu"},

so:{searchPlaceholder:"Raadi dalag, abuur, bacrimin iyo agab…",eyebrow:"WADA KOR. SI FIICAN U GANACSA.",headline:"Beertaada. Suuqaaga.",intro:"Si toos ah uga iibso agabka beeraha iyo dalagga cusub beeraleyda kale.",sellProduct:"Iibi badeecad",farmerToFarmer:"Beeraley ilaa beeraley",discover:"BAADH",marketTitle:"Suuqa",marketSubtitle:"Wax kasta oo beertaadu u baahan tahay hal meel.",createListing:"Ku dar badeecad",shop:"Iibso badeecooyin",myListings:"Badeecooyinkayga",myOrders:"Dalabyadayda",mySales:"Iibkayga",saved:"La kaydiyey",findProducts:"Raadi waxaad u baahan tahay",filterIntro:"Eeg dalagyada, agabka beeraha, qalabka iyo sahayda.",clearFilters:"Nadiifi shaandhaynta",category:"Qaybta",allCategories:"Dhammaan qaybaha",location:"Goobta",allLocations:"Dhammaan goobaha",sortBy:"Kala saar",newest:"Kuwa cusub marka hore",priceLow:"Qiime: hoose ilaa sare",priceHigh:"Qiime: sare ilaa hoose",all:"Dhammaan",grains:"Badar",seeds:"Abuur",fertilizers:"Bacrimin",pesticides:"Sunta cayayaanka",herbicides:"Sunta haramaha",tools:"Qalab",productsFound:"badeecooyin la helay",secureTrading:"Suuq ammaan ah oo akoon ku salaysan",footerText:"Waxaan isku xirnaa beeraleyda. Fursad ayaan kobcinaa.",sellerCorner:"QAYBTA IIBIYAHA",productName:"Magaca badeecadda *",unit:"Halbeegga *",quantity:"Tirada la heli karo *",price:"Qiimaha halkii halbeeg (ETB) *",minimumOrder:"Dalabka ugu yar",region:"Gobol / magaalo",description:"Sharaxaad",photos:"Sawirrada badeecadda (ugu badnaan 5, midkiiba 2 MB)",photoHint:"Sawirrada waxaa lagu kaydinayaa Supabase Storage.",cancel:"Jooji",publish:"Daabac badeecadda",yourCart:"Gaadhiga wax iibsiga",checkout:"Bixinta",deliveryLocation:"Goobta keenista / qaadashada *",paymentMethod:"Habka lacag bixinta",phone:"Telefoonka xiriirka *",paymentNote:"Lacag-bixinta bangiga ama moobilka, iibiyuhu wuu xaqiijinayaa.",placeOrder:"Dir dalabka",addCart:"Ku dar gaadhiga",viewDetails:"Eeg faahfaahinta",perUnit:"halkii",noProducts:"Badeeco ku habboon shaandhayntan lama helin.",loginRequired:"Gal akoonkaaga AgriNova si aad suuqa u isticmaasho.",configMissing:"Geli furaha Supabase gudaha farmer-marketplace.js.",loading:"Suuqa waa la soo rarayaa…",noListings:"Weli wax badeeco ah ma aadan gelin.",noOrders:"Dalab lama helin.",noSaved:"Ma jiraan badeecooyin la kaydiyey.",seller:"Iibiye",stock:"La heli karo",min:"Ugu yar",locationLabel:"Goobta",descriptionLabel:"Ku saabsan badeecaddan",edit:"Wax ka beddel",delete:"Tirtir",remove:"Ka saar",subtotal:"Wadarta qaybta",total:"Wadarta",emptyCart:"Gaadhigaagu waa madhan yahay.",orderSuccess:"Dalabkaaga waa la diray.",listingSuccess:"Badeecaddaada waa la daabacay.",listingUpdated:"Badeecaddaada waa la cusboonaysiiyey.",deleteConfirm:"Ma tirtiraysaa badeecaddan?",uploadError:"Qaar ka mid ah sawirrada lama soo gelin karin.",noPermission:"Ma lihid oggolaansho aad tan ku samayso.",status:"Xaaladda",buyer:"Iibsade",orderDate:"Taariikhda dalabka",items:"alaab",order:"Dalab",noDescription:"Sharaxaad lama bixin.",photoLimit:"Dooro ugu badnaan shan sawir, midkiiba 2 MB ama ka yar.",selectCategory:"Dooro qaybta"}
};
function t(k){return (translations[state.language]||translations.en)[k]||translations.en[k]||k}

function applyLanguage(lang){
  state.language=lang;
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-language-select]").forEach(s=>s.value=lang);
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(translations[lang]?.[key])el.textContent=translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key=el.dataset.i18nPlaceholder;
    if(translations[lang]?.[key])el.placeholder=translations[lang][key];
  });
  renderProducts();
}

function showMessage(msg){
  $("toastMessage").textContent=msg;
  $("toastDialog").showModal();
}

function escapeHTML(v){
  return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function money(v){
  return Number(v||0).toLocaleString(undefined,{maximumFractionDigits:2});
}

function categoryName(c){
  const map={
    grains:"Grains & cereals",vegetables:"Vegetables",fruits:"Fruits",
    legumes:"Legumes",root_crops:"Root crops",coffee:"Coffee & cash crops",
    seeds:"Seeds & seedlings",fertilizers:"Fertilizers & soil nutrients",
    pesticides:"Pesticides & insect control",herbicides:"Herbicides & weed control",
    fungicides:"Fungicides",irrigation:"Irrigation supplies",
    tools:"Farm tools & equipment",livestock:"Livestock supplies",other:"Other farm supplies"
  };
  return map[c]||c||"";
}

async function requireUser(){
  if(!db){showMessage(t("configMissing"));return false}
  const {data,error}=await db.auth.getUser();
  if(error||!data.user){showMessage(t("loginRequired"));return false}
  state.user=data.user;
  return true;
}

async function loadProfile(){
  const {data}=await db.from("marketplace_profiles")
    .select("display_name,region,city,phone,avatar_url")
    .eq("user_id",state.user.id).maybeSingle();
  state.profile=data||{};
  const name=state.profile.display_name||state.user.user_metadata?.full_name||state.user.email?.split("@")[0]||"Farmer";
  $("userName").textContent=name;
  $("userAvatar").textContent=name.charAt(0).toUpperCase();
}

async function loadProducts(){
  const {data,error}=await db.from("marketplace_listings")
    .select("id,seller_id,title,category,unit,quantity,price,min_order,description,location,created_at,status,marketplace_listing_images(storage_path,sort_order),marketplace_profiles(display_name,region,city)")
    .eq("status","active")
    .gt("quantity",0)
    .order("created_at",{ascending:false});
  if(error){console.error(error);showMessage(error.message);return}
  state.products=data||[];
  await renderProducts();
}

function imageURL(product){
  const path=product.marketplace_listing_images?.sort((a,b)=>a.sort_order-b.sort_order)[0]?.storage_path;
  if(!path)return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800";
  const {data}=db.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function getSavedIds(){
  const {data,error}=await db.from("marketplace_favorites")
    .select("listing_id").eq("user_id",state.user.id);
  if(error)return [];
  return (data||[]).map(x=>x.listing_id);
}

async function renderProducts(){
  if(!db||!state.user)return;
  const grid=$("productGrid");
  if(state.tab!=="shop"&&state.tab!=="myListings"&&state.tab!=="saved"){
    grid.classList.add("hidden");
    return;
  }
  grid.classList.remove("hidden");
  $("contentView").classList.add("hidden");
  let list=[...state.products];
  if(state.tab==="myListings")list=list.filter(p=>p.seller_id===state.user.id);
  if(state.tab==="saved"){
    const ids=await getSavedIds();
    list=list.filter(p=>ids.includes(p.id));
  }
  if(state.category!=="all")list=list.filter(p=>p.category===state.category);
  const location=$("locationFilter").value;
  if(location!=="all")list=list.filter(p=>(p.location||"").toLowerCase().includes(location.toLowerCase()));
  const q=state.search.trim().toLowerCase();
  if(q)list=list.filter(p=>(p.title+" "+p.description+" "+p.category+" "+(p.marketplace_profiles?.display_name||"")).toLowerCase().includes(q));
  const sort=$("sortFilter").value;
  if(sort==="price_low")list.sort((a,b)=>a.price-b.price);
  if(sort==="price_high")list.sort((a,b)=>b.price-a.price);
  if(sort==="newest")list.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  $("resultCount").textContent=list.length;
  if(!list.length){
    const message=state.tab==="myListings"?t("noListings"):state.tab==="saved"?t("noSaved"):t("noProducts");
    grid.innerHTML=`<div class="empty-state"><i class="fa-solid fa-leaf"></i>${escapeHTML(message)}</div>`;
    return;
  }
  const saved=await getSavedIds();
  grid.innerHTML=list.map(p=>{
    const seller=p.marketplace_profiles?.display_name||"Farmer";
    const loc=p.location||p.marketplace_profiles?.city||p.marketplace_profiles?.region||"Ethiopia";
    return `<article class="product-card">
      <div class="product-image">
        <img src="${escapeHTML(imageURL(p))}" alt="${escapeHTML(p.title)}" loading="lazy">
        <span class="product-tag">${escapeHTML(categoryName(p.category))}</span>
        <button class="save-btn ${saved.includes(p.id)?"saved":""}" data-save="${p.id}" aria-label="Save product"><i class="fa-solid fa-heart"></i></button>
      </div>
      <div class="product-info">
        <div class="seller-line"><span>${escapeHTML(t("seller"))}: ${escapeHTML(seller)}</span><span>${escapeHTML(loc)}</span></div>
        <h3>${escapeHTML(p.title)}</h3>
        <div class="product-location"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(loc)}</div>
        <div class="product-bottom">
          <div class="price">${money(p.price)} ETB <small>/ ${escapeHTML(p.unit)}</small></div>
          <button class="add-btn" data-view="${p.id}" aria-label="${escapeHTML(t("viewDetails"))}"><i class="fa-solid fa-eye"></i></button>
        </div>
      </div>
    </article>`;
  }).join("");
  grid.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>viewProduct(b.dataset.view)));
  grid.querySelectorAll("[data-save]").forEach(b=>b.addEventListener("click",()=>toggleSaved(b.dataset.save)));
}

async function viewProduct(id){
  const p=state.products.find(x=>x.id===id);
  if(!p)return;
  const seller=p.marketplace_profiles?.display_name||"Farmer";
  const location=p.location||p.marketplace_profiles?.city||p.marketplace_profiles?.region||"Ethiopia";
  $("productDetail").innerHTML=`
    <div class="detail-layout">
      <div><img src="${escapeHTML(imageURL(p))}" alt="${escapeHTML(p.title)}"></div>
      <div>
        <span class="product-tag">${escapeHTML(categoryName(p.category))}</span>
        <h2>${escapeHTML(p.title)}</h2>
        <div class="detail-price">${money(p.price)} ETB <small>/ ${escapeHTML(p.unit)}</small></div>
        <p class="detail-description">${escapeHTML(p.description||t("noDescription"))}</p>
        <p class="detail-description"><strong>${escapeHTML(t("seller"))}:</strong> ${escapeHTML(seller)}</p>
        <p class="detail-description"><strong>${escapeHTML(t("locationLabel"))}:</strong> ${escapeHTML(location)}</p>
        <p class="detail-description"><strong>${escapeHTML(t("stock"))}:</strong> ${money(p.quantity)} ${escapeHTML(p.unit)}</p>
        <p class="detail-description"><strong>${escapeHTML(t("min"))}:</strong> ${money(p.min_order||1)} ${escapeHTML(p.unit)}</p>
        ${p.seller_id===state.user.id?`<button class="btn btn-primary" id="editProduct">${escapeHTML(t("edit"))}</button>`:`
        <div class="quantity-control"><label>${escapeHTML(t("quantity"))}</label><input id="buyQuantity" type="number" min="${p.min_order||1}" max="${p.quantity}" step="0.01" value="${p.min_order||1}"></div>
        <button class="btn btn-primary" id="addProductToCart"><i class="fa-solid fa-basket-shopping"></i>${escapeHTML(t("addCart"))}</button>`}
      </div>
    </div>`;
  if(p.seller_id===state.user.id){
    $("editProduct").addEventListener("click",()=>{ $("productDialog").close();openListing(p); });
  }else{
    $("addProductToCart").addEventListener("click",()=>addToCart(p.id,Number($("buyQuantity").value)));
  }
  $("productDialog").showModal();
}

async function toggleSaved(id){
  const {data}=await db.from("marketplace_favorites").select("id")
    .eq("user_id",state.user.id).eq("listing_id",id).maybeSingle();
  if(data){
    const {error}=await db.from("marketplace_favorites").delete().eq("id",data.id);
    if(error){showMessage(error.message);return}
  }else{
    const {error}=await db.from("marketplace_favorites").insert({user_id:state.user.id,listing_id:id});
    if(error){showMessage(error.message);return}
  }
  await renderProducts();
}

function openListing(p=null){
  state.editingId=p?.id||null;
  state.photos=[];
  $("listingForm").reset();
  $("listingId").value=p?.id||"";
  $("listingDialogTitle").textContent=p?"Edit listing":t("createListing");
  $("productName").value=p?.title||"";
  $("listingCategory").value=p?.category||"";
  $("productUnit").value=p?.unit||"kg";
  $("productQuantity").value=p?.quantity??"";
  $("productPrice").value=p?.price??"";
  $("minimumOrder").value=p?.min_order??1;
  $("sellerLocation").value=p?.location||[state.profile?.region,state.profile?.city].filter(Boolean).join(", ");
  $("productDescription").value=p?.description||"";
  $("photoPreview").innerHTML="";
  $("listingDialog").showModal();
}

async function uploadPhotos(files,listingId){
  const uploaded=[];
  for(const file of files){
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>2*1024*1024)throw new Error(t("photoLimit"));
    const ext=file.name.split(".").pop().toLowerCase();
    const path=`${state.user.id}/${listingId}/${crypto.randomUUID()}.${ext}`;
    const {error}=await db.storage.from(IMAGE_BUCKET).upload(path,file,{contentType:file.type,upsert:false});
    if(error)throw error;
    uploaded.push({listing_id:listingId,storage_path:path,sort_order:uploaded.length});
  }
  return uploaded;
}

async function submitListing(e){
  e.preventDefault();
  const btn=$("publishBtn");
  btn.disabled=true;
  try{
    const payload={
      seller_id:state.user.id,
      title:$("productName").value.trim(),
      category:$("listingCategory").value,
      unit:$("productUnit").value,
      quantity:Number($("productQuantity").value),
      price:Number($("productPrice").value),
      min_order:Number($("minimumOrder").value)||1,
      location:$("sellerLocation").value.trim()||null,
      description:$("productDescription").value.trim()||null,
      status:"active"
    };
    if(payload.price<=0||payload.quantity<=0||payload.min_order<=0)throw new Error("Quantity, price and minimum order must be greater than zero.");
    let id=state.editingId;
    if(id){
      const {error}=await db.from("marketplace_listings").update(payload).eq("id",id).eq("seller_id",state.user.id);
      if(error)throw error;
      const files=$("productPhotos").files;
      if(files.length){
        const {data:old}=await db.from("marketplace_listing_images").select("storage_path").eq("listing_id",id);
        if(old?.length){
          await db.storage.from(IMAGE_BUCKET).remove(old.map(x=>x.storage_path));
          await db.from("marketplace_listing_images").delete().eq("listing_id",id);
        }
        const imgs=await uploadPhotos(files,id);
        if(imgs.length){
          const {error:ie}=await db.from("marketplace_listing_images").insert(imgs);
          if(ie)throw ie;
        }
      }
      showMessage(t("listingUpdated"));
    }else{
      const {data,error}=await db.from("marketplace_listings").insert(payload).select("id").single();
      if(error)throw error;
      id=data.id;
      const files=[...$("productPhotos").files];
      if(files.length){
        if(files.length>5)throw new Error(t("photoLimit"));
        const imgs=await uploadPhotos(files,id);
        const {error:ie}=await db.from("marketplace_listing_images").insert(imgs);
        if(ie)throw ie;
      }
      showMessage(t("listingSuccess"));
    }
    $("listingDialog").close();
    await loadProducts();
  }catch(err){
    console.error(err);
    showMessage(err.message||"Could not save listing.");
  }finally{
    btn.disabled=false;
  }
}

async function addToCart(id,qty){
  const p=state.products.find(x=>x.id===id);
  if(!p)return;
  if(p.seller_id===state.user.id){showMessage("You cannot buy your own listing.");return}
  if(!Number.isFinite(qty)||qty<(p.min_order||1)||qty>p.quantity){
    showMessage(`Enter a quantity from ${p.min_order||1} to ${p.quantity}.`);
    return;
  }
  const found=state.cart.find(x=>x.id===id);
  if(found)found.qty+=qty;
  else state.cart.push({id,qty});
  $("cartCount").textContent=state.cart.reduce((s,x)=>s+x.qty,0);
  $("productDialog").close();
  showMessage("Added to cart.");
}

function cartRows(){
  return state.cart.map(item=>({item,p:state.products.find(p=>p.id===item.id)})).filter(x=>x.p);
}

function showCart(){
  const rows=cartRows();
  if(!rows.length){
    $("cartContent").innerHTML=`<div class="empty-state">${escapeHTML(t("emptyCart"))}</div>`;
    $("cartDialog").showModal();
    return;
  }
  const total=rows.reduce((s,x)=>s+x.item.qty*x.p.price,0);
  $("cartContent").innerHTML=`
    <div class="record-list">
      ${rows.map(({item,p})=>`
        <div class="record-card">
          <div><h4>${escapeHTML(p.title)}</h4><p>${money(item.qty)} ${escapeHTML(p.unit)} × ${money(p.price)} ETB</p></div>
          <div><strong class="record-total">${money(item.qty*p.price)} ETB</strong><button class="text-btn" data-remove="${p.id}">${escapeHTML(t("remove"))}</button></div>
        </div>`).join("")}
    </div>
    <div class="record-card"><strong>${escapeHTML(t("total"))}</strong><strong class="record-total">${money(total)} ETB</strong></div>
    <div class="modal-actions"><button class="btn btn-primary" id="goCheckout">${escapeHTML(t("checkout"))}</button></div>`;
  $("cartContent").querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{
    state.cart=state.cart.filter(x=>x.id!==b.dataset.remove);
    $("cartCount").textContent=state.cart.reduce((s,x)=>s+x.qty,0);
    showCart();
  }));
  $("goCheckout").addEventListener("click",()=>{
    if(rows.some(x=>x.item.qty>x.p.quantity)){
      showMessage("A product quantity is no longer available. Refresh your cart.");
      return;
    }
    $("cartDialog").close();
    $("checkoutSummary").innerHTML=`<p><strong>${rows.length}</strong> product line(s) · <strong>${money(total)} ETB</strong></p>`;
    $("checkoutDialog").showModal();
  });
  $("cartDialog").showModal();
}

async function placeOrder(e){
  e.preventDefault();
  const rows=cartRows();
  if(!rows.length)return;
  try{
    for(const {item,p} of rows){
      const {data,error}=await db.rpc("marketplace_place_order_item",{
        p_listing_id:p.id,
        p_quantity:item.qty,
        p_delivery_location:$("deliveryLocation").value.trim(),
        p_payment_method:$("paymentMethod").value,
        p_buyer_phone:$("buyerPhone").value.trim()
      });
      if(error)throw error;
    }
    state.cart=[];
    $("cartCount").textContent="0";
    $("checkoutDialog").close();
    showMessage(t("orderSuccess"));
    await loadProducts();
  }catch(err){
    console.error(err);
    showMessage(err.message||"Order could not be placed.");
  }
}

async function renderTab(){
  const view=$("contentView");
  view.classList.remove("hidden");
  $("productGrid").classList.add("hidden");
  if(state.tab==="myOrders"||state.tab==="sales"){
    const buyer=state.tab==="myOrders";
    let q=db.from("marketplace_orders")
      .select("id,buyer_id,seller_id,status,total_amount,payment_method,delivery_location,created_at,marketplace_order_items(quantity,unit_price,marketplace_listings(title,unit))")
      .order("created_at",{ascending:false});
    q=q.eq(buyer?"buyer_id":"seller_id",state.user.id);
    const {data,error}=await q;
    if(error){view.innerHTML=`<p>${escapeHTML(error.message)}</p>`;return}
    view.innerHTML=`
      <div class="content-heading"><h3>${escapeHTML(buyer?t("myOrders"):t("mySales"))}</h3></div>
      <div class="record-list">
      ${(data||[]).length?(data||[]).map(o=>`
        <article class="record-card">
          <div>
            <h4>Order #${escapeHTML(o.id.slice(0,8))}</h4>
            <p>${new Date(o.created_at).toLocaleString()} · ${escapeHTML(o.payment_method.replaceAll("_"," "))}</p>
            <span class="status-pill">${escapeHTML(o.status)}</span>
            <p>${(o.marketplace_order_items||[]).map(i=>`${money(i.quantity)} ${escapeHTML(i.marketplace_listings?.unit||"")} ${escapeHTML(i.marketplace_listings?.title||"item")}`).join(" · ")}</p>
          </div>
          <strong class="record-total">${money(o.total_amount)} ETB</strong>
        </article>`).join(""):`<div class="empty-state"><i class="fa-solid fa-receipt"></i>${escapeHTML(t("noOrders"))}</div>`}
      </div>`;
    return;
  }
  renderProducts();
}

function switchTab(tab){
  state.tab=tab;
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
  if(tab==="shop"||tab==="myListings"||tab==="saved")renderProducts();
  else renderTab();
}

function setup(){
  document.querySelectorAll("[data-language-select]").forEach(s=>s.addEventListener("change",()=>applyLanguage(s.value)));
  document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));
  $("sellBtn").addEventListener("click",()=>openListing());
  $("sellTopBtn").addEventListener("click",()=>openListing());
  $("listingForm").addEventListener("submit",submitListing);
  $("checkoutForm").addEventListener("submit",placeOrder);
  $("cartBtn").addEventListener("click",showCart);
  $("searchInput").addEventListener("input",e=>{state.search=e.target.value;renderProducts()});
  $("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")renderProducts()});
  $("categoryFilter").addEventListener("change",e=>{
    state.category=e.target.value;
    document.querySelectorAll(".quick-chip").forEach(b=>b.classList.toggle("selected",b.dataset.category===state.category));
    renderProducts();
  });
  $("locationFilter").addEventListener("change",renderProducts);
  $("sortFilter").addEventListener("change",renderProducts);
  $("clearFilters").addEventListener("click",()=>{
    $("categoryFilter").value="all";
    $("locationFilter").value="all";
    $("sortFilter").value="newest";
    $("searchInput").value="";
    state.search="";
    state.category="all";
    document.querySelectorAll(".quick-chip").forEach(b=>b.classList.toggle("selected",b.dataset.category==="all"));
    renderProducts();
  });
  $("quickCategories").addEventListener("click",e=>{
    const b=e.target.closest("[data-category]");
    if(!b)return;
    state.category=b.dataset.category;
    $("categoryFilter").value=state.category;
    document.querySelectorAll(".quick-chip").forEach(x=>x.classList.toggle("selected",x===b));
    renderProducts();
  });
  $("productPhotos").addEventListener("change",e=>{
    const files=[...e.target.files];
    if(files.length>5||files.some(f=>f.size>2*1024*1024)){
      showMessage(t("photoLimit"));
      e.target.value="";
      return;
    }
    $("photoPreview").innerHTML=files.map(f=>`<img src="${URL.createObjectURL(f)}" alt="Preview">`).join("");
  });
  document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>$(b.dataset.close).close()));
  $("notificationsBtn").addEventListener("click",()=>showMessage("Marketplace notifications will appear here when orders or listing updates are available."));
  $("year").textContent=new Date().getFullYear();
}

async function init(){
  setup();
  if(!db){showMessage(t("configMissing"));return}
  const {data,error}=await db.auth.getUser();
  if(error||!data.user){showMessage(t("loginRequired"));return}
  state.user=data.user;
  await loadProfile();
  applyLanguage("en");
  await loadProducts();
  $("cartCount").textContent="0";
}

document.addEventListener("DOMContentLoaded",init);
})();
