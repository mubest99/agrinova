/* ==========================================================
   AGRINOVA MARKETPLACE — CONNECTED TO EXISTING SUPABASE TABLES
   Uses marketplace_listings, marketplace_profiles,
   marketplace_listing_images and marketplace_favorites.
   Checkout and phone contact are intentionally not enabled yet.
========================================================== */

const AGRINOVA_MARKET_CONFIG = {
    supabaseUrl: "https://iqxfusbouchrapfxonxe.supabase.co",
    // This is a publishable/anon key. Never put a service-role key in browser code.
    supabaseAnonKey: "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv",
    productsTable: "marketplace_listings",
    sellersTable: "marketplace_profiles",
    imagesTable: "marketplace_listing_images",
    // Set this to the exact Supabase Storage bucket name used for listing images.
    // Product browsing still works when this is blank; image placeholders are shown.
    imageBucket: "",
    productsPerPage: 9
};

let marketplaceSupabase = null;

const marketplaceState = {
    products: [],
    filteredProducts: [],
    currentPage: 1,
    currentCategory: "all",
    searchTerm: "",
    region: "all",
    minPrice: "",
    maxPrice: "",
    availability: "all",
    sort: "newest",
    language: "en",
    selectedProduct: null,
    loading: false
};

const languageNames = {
    en: "English",
    am: "አማርኛ",
    ti: "ትግርኛ",
    om: "Afaan Oromo",
    so: "Af Soomaali"
};

const translations = {

    en: {
        workspace: "WORKSPACE",
        dashboard: "Dashboard",
        weather: "Weather",
        education: "Education",
        agricultureNews: "Agriculture News",
        marketplace: "Marketplace",
        needHelp: "Need help?",
        helpDescription: "Explore agricultural resources and discover opportunities.",
        getSupport: "Get support →",
        platformStatus: "AgriNova Marketplace",
        home: "Home",
        marketEyebrow: "ETHIOPIAN AGRICULTURE MARKETPLACE",
        heroTitle: "Fresh from the farm.",
        heroDescription: "Discover agricultural products from Ethiopian farmers. Explore quality produce and connect directly with sellers.",
        searchPlaceholder: "What are you looking for?",
        search: "Search",
        farmerDirect: "Direct connections with registered farmers",
        explore: "EXPLORE",
        shopCategories: "Shop by category",
        viewAll: "View all →",
        allProducts: "All products",
        grains: "Grains",
        fruits: "Fruits",
        vegetables: "Vegetables",
        legumes: "Legumes",
        coffee: "Coffee",
        livestock: "Livestock",
        other: "Other",
        handpicked: "DISCOVER AGRINOVA",
        featuredProducts: "Featured products",
        loadingProducts: "Loading products...",
        marketCollection: "MARKET COLLECTION",
        browseProducts: "Browse products",
        sortBy: "Sort by",
        newest: "Newest first",
        priceLow: "Price: low to high",
        priceHigh: "Price: high to low",
        nameAZ: "Name A–Z",
        filters: "Filters",
        reset: "Reset",
        searchProducts: "Search products",
        productSearchPlaceholder: "Product name...",
        category: "Category",
        allCategories: "All categories",
        region: "Region",
        allRegions: "All regions",
        priceRange: "Price range (ETB)",
        availability: "Availability",
        allAvailability: "All",
        available: "Available",
        applyFilters: "Apply filters",
        ourPurpose: "OUR PURPOSE",
        bannerTitle: "Supporting Ethiopian farmers. Connecting agricultural markets.",
        bannerDescription: "Discover agricultural opportunities and connect with farmers across Ethiopia.",
        footerText: "Agricultural technology for all.",
        noProducts: "No products found",
        noProductsDescription: "There are no published products matching your search. Try changing your filters.",
        details: "View details",
        product: "Product",
        location: "Location",
        quantity: "Available quantity",
        price: "Price",
        minimumOrder: "Minimum order",
        quality: "Quality / Grade",
        harvestDate: "Harvest date",
        description: "Description",
        seller: "Farmer / Seller",
        callFarmer: "Contact Farmer",
        phoneUnavailable: "Phone contact unavailable",
        noPhone: "This farmer has not enabled public phone contact.",
        noLocation: "Location not provided",
        perUnit: "per",
        page: "Page",
        of: "of",
        results: "products found",
        loadingError: "Unable to load marketplace products.",
        retry: "Try again",
        priceNotSet: "Price not specified",
        unavailable: "Unavailable",
        limited: "Limited availability",
        availableStatus: "Available",
        searchFailed: "Search could not be completed.",
        unknownFarmer: "AgriNova Farmer",
        close: "Close",
        phoneInvalid: "The published phone number is invalid.",
        phoneCalling: "Opening your phone application...",
        kg: "kg",
        piece: "piece",
        quintal: "quintal",
        bag: "bag",
        litre: "litre",
        ton: "ton",
        dateUnknown: "Not specified"
    },

    am: {
        workspace: "የሥራ ክፍል",
        dashboard: "ዳሽቦርድ",
        weather: "የአየር ሁኔታ",
        education: "ትምህርት",
        agricultureNews: "የግብርና ዜና",
        marketplace: "የገበያ ማዕከል",
        needHelp: "እገዛ ይፈልጋሉ?",
        helpDescription: "የግብርና መረጃዎችን ያግኙ።",
        getSupport: "እገዛ ያግኙ →",
        platformStatus: "አግሪኖቫ ገበያ",
        home: "መነሻ",
        marketEyebrow: "የኢትዮጵያ የግብርና ገበያ",
        heroTitle: "ከእርሻ ቦታ በቀጥታ ወደ እርስዎ።",
        heroDescription: "ከኢትዮጵያ አርሶ አደሮች የግብርና ምርቶችን ያግኙ።",
        searchPlaceholder: "ምን ይፈልጋሉ?",
        search: "ፈልግ",
        farmerDirect: "ከተመዘገቡ አርሶ አደሮች ጋር በቀጥታ ይገናኙ",
        explore: "ያስሱ",
        shopCategories: "በምድብ ይፈልጉ",
        viewAll: "ሁሉንም ይመልከቱ →",
        allProducts: "ሁሉም ምርቶች",
        grains: "እህሎች",
        fruits: "ፍራፍሬዎች",
        vegetables: "አትክልቶች",
        legumes: "ጥራጥሬዎች",
        coffee: "ቡና",
        livestock: "እንስሳት",
        other: "ሌሎች",
        handpicked: "አግሪኖቫን ያግኙ",
        featuredProducts: "ተለይተው የቀረቡ ምርቶች",
        loadingProducts: "ምርቶችን በመጫን ላይ...",
        marketCollection: "የገበያ ምርቶች",
        browseProducts: "ምርቶችን ያስሱ",
        sortBy: "ደረጃ",
        newest: "አዲስ መጀመሪያ",
        priceLow: "ዋጋ፦ ከዝቅተኛ ወደ ከፍተኛ",
        priceHigh: "ዋጋ፦ ከፍተኛ ወደ ዝቅተኛ",
        nameAZ: "በስም",
        filters: "ማጣሪያዎች",
        reset: "አጽዳ",
        searchProducts: "ምርቶችን ፈልግ",
        productSearchPlaceholder: "የምርት ስም...",
        category: "ምድብ",
        allCategories: "ሁሉም ምድቦች",
        region: "ክልል",
        allRegions: "ሁሉም ክልሎች",
        priceRange: "የዋጋ ክልል (ብር)",
        availability: "መገኘት",
        allAvailability: "ሁሉም",
        available: "ይገኛል",
        applyFilters: "ማጣሪያዎችን ተግብር",
        ourPurpose: "ዓላማችን",
        bannerTitle: "ኢትዮጵያዊያንን አርሶ አደሮች መደገፍ።",
        bannerDescription: "በመላው ኢትዮጵያ ካሉ አርሶ አደሮች ጋር ይገናኙ።",
        footerText: "የግብርና ቴክኖሎጂ ለሁሉም።",
        noProducts: "ምርቶች አልተገኙም",
        noProductsDescription: "ከፍለጋዎ ጋር የሚዛመዱ ምርቶች የሉም።",
        details: "ዝርዝር ይመልከቱ",
        product: "ምርት",
        location: "አካባቢ",
        quantity: "ያለው መጠን",
        price: "ዋጋ",
        minimumOrder: "ዝቅተኛ ትዕዛዝ",
        quality: "ጥራት",
        harvestDate: "የመከር ቀን",
        description: "መግለጫ",
        seller: "አርሶ አደር / ሻጭ",
        callFarmer: "አርሶ አደሩን ያግኙ",
        phoneUnavailable: "የስልክ አገልግሎት አይገኝም",
        noPhone: "ይህ አርሶ አደር የስልክ ቁጥሩን ይፋ አላደረገም።",
        noLocation: "አካባቢ አልተገለጸም",
        perUnit: "በ",
        kg: "ኪ.ግ",
        piece: "ቁራጭ",
        quintal: "ኩንታል",
        bag: "ከረጢት",
        litre: "ሊትር",
        ton: "ቶን",
        dateUnknown: "አልተገለጸም"
    },

    ti: {
        workspace: "ክፍሊ ስራ",
        dashboard: "ዳሽቦርድ",
        weather: "ኩነታት ኣየር",
        education: "ትምህርቲ",
        agricultureNews: "ዜና ሕርሻ",
        marketplace: "ዕዳጋ",
        needHelp: "ሓገዝ የድልየካ?",
        helpDescription: "ሓበሬታ ሕርሻ ድለዩ።",
        getSupport: "ሓገዝ ርኸቡ →",
        platformStatus: "ኣግሪኖቫ ዕዳጋ",
        home: "መበገሲ",
        marketEyebrow: "ዕዳጋ ሕርሻ ኢትዮጵያ",
        heroTitle: "ካብ ሕርሻ ብቐጥታ ናባኹም።",
        heroDescription: "ካብ ኢትዮጵያውያን ሓረስቶት ፍርያት ሕርሻ ርኸቡ።",
        searchPlaceholder: "እንታይ ትደልዩ?",
        search: "ድለ",
        farmerDirect: "ምስ ዝተመዝገቡ ሓረስቶት ብቐጥታ ተራኸቡ",
        explore: "ዳህስሱ",
        shopCategories: "ብዓይነት ድለዩ",
        viewAll: "ኩሉ ርአዩ →",
        allProducts: "ኩሎም ፍርያት",
        grains: "እኽሊ",
        fruits: "ፍረታት",
        vegetables: "ኣሕምልቲ",
        legumes: "ጥራጥረ",
        coffee: "ቡን",
        livestock: "እንስሳት",
        other: "ካልእ",
        handpicked: "ኣግሪኖቫ ዳህስሱ",
        featuredProducts: "ፍሉያት ፍርያት",
        loadingProducts: "ፍርያት ይጽዕን ኣሎ...",
        marketCollection: "ፍርያት ዕዳጋ",
        browseProducts: "ፍርያት ዳህስሱ",
        sortBy: "ብ",
        newest: "ሓደስቲ ቅድሚ",
        priceLow: "ዋጋ፦ ትሑት ክሳብ ልዑል",
        priceHigh: "ዋጋ፦ ልዑል ክሳብ ትሑት",
        nameAZ: "ብስም",
        filters: "መጻረዪታት",
        reset: "ኣጽርዩ",
        searchProducts: "ፍርያት ድለዩ",
        productSearchPlaceholder: "ስም ፍርያት...",
        category: "ዓይነት",
        allCategories: "ኩሎም ዓይነታት",
        region: "ክልል",
        allRegions: "ኩሎም ክልላት",
        priceRange: "ደረጃ ዋጋ (ብር)",
        availability: "ምህላው",
        allAvailability: "ኩሉ",
        available: "ይርከብ",
        applyFilters: "መጻረዪታት ተግብሩ",
        ourPurpose: "ዕላማና",
        bannerTitle: "ሓረስቶት ኢትዮጵያ ምድጋፍ።",
        bannerDescription: "ምስ ሓረስቶት ኣብ ኩሉ ኢትዮጵያ ተራኸቡ።",
        footerText: "ቴክኖሎጂ ሕርሻ ንኹሉ።",
        noProducts: "ፍርያት ኣይተረኽበን",
        noProductsDescription: "ምስ ድለትኩም ዝሰማማዕ ፍርያት የለን።",
        details: "ዝርዝር ርአዩ",
        product: "ፍርያት",
        location: "ቦታ",
        quantity: "ዘሎ መጠን",
        price: "ዋጋ",
        minimumOrder: "ዝተሓተ ትእዛዝ",
        quality: "ጽሬት",
        harvestDate: "ዕለት ቀውዒ",
        description: "መግለጺ",
        seller: "ሓረስታይ / ሸያጢ",
        callFarmer: "ሓረስታይ ርኸቡ",
        phoneUnavailable: "ስልኪ ኣይርከብን",
        noPhone: "እዚ ሓረስታይ ቁጽሪ ስልኩ ኣይዘርግሐን።",
        noLocation: "ቦታ ኣይተገልጸን",
        perUnit: "ብ",
        kg: "ኪ.ግ",
        piece: "ቁራጽ",
        quintal: "ኩንታል",
        bag: "ማሕረስ",
        litre: "ሊትር",
        ton: "ቶን",
        dateUnknown: "ኣይተገልጸን"
    },
        om: {
        workspace: "IDDOO HOJII",
        dashboard: "Daashboordii",
        weather: "Haala Qilleensaa",
        education: "Barnoota",
        agricultureNews: "Oduu Qonnaa",
        marketplace: "Gabaa",
        needHelp: "Gargaarsa barbaaddaa?",
        helpDescription: "Odeeffannoo qonnaa fi carraawwan qoradhu.",
        getSupport: "Gargaarsa argadhu →",
        platformStatus: "Gabaa AgriNova",
        home: "Mana",
        marketEyebrow: "GABAA QONNAA ITOOPHIYAA",
        heroTitle: "Qonna irraa kallattiin gara keetti.",
        heroDescription: "Oomisha qonnaa qonnaan bultoota Itoophiyaa irraa argadhu. Oomisha qulqullina qabu qoradhu.",
        searchPlaceholder: "Maal barbaadda?",
        search: "Barbaadi",
        farmerDirect: "Qonnaan bultoota galmaa'an waliin kallattiin wal qunnami",
        explore: "Qoradhu",
        shopCategories: "Gosa oomishaatiin barbaadi",
        viewAll: "Hunda ilaali →",
        allProducts: "Oomisha hunda",
        grains: "Midhaan",
        fruits: "Fuduraalee",
        vegetables: "Kuduraalee",
        legumes: "Baala fi atara",
        coffee: "Buna",
        livestock: "Beeyladaa",
        other: "Kan biraa",
        handpicked: "AGRINOVA QORADHU",
        featuredProducts: "Oomisha filataman",
        loadingProducts: "Oomisha fe'aa jira...",
        marketCollection: "Oomisha gabaa",
        browseProducts: "Oomisha qoradhu",
        sortBy: "Tartiibessi",
        newest: "Haaraa dursee",
        priceLow: "Gatii: xiqqaa irraa guddaatti",
        priceHigh: "Gatii: guddaa irraa xiqqaatti",
        nameAZ: "Maqaa",
        filters: "Calaltuu",
        reset: "Haqi",
        searchProducts: "Oomisha barbaadi",
        productSearchPlaceholder: "Maqaa oomishaa...",
        category: "Gosa",
        allCategories: "Gosa hunda",
        region: "Naannoo",
        allRegions: "Naannoo hunda",
        priceRange: "Daangaa gatii (ETB)",
        availability: "Argamuu",
        allAvailability: "Hunda",
        available: "Ni argama",
        applyFilters: "Calaltuu hojii irra oolchi",
        ourPurpose: "KAAYYOO KEENYA",
        bannerTitle: "Qonnaan bultoota Itoophiyaa deeggaruu.",
        bannerDescription: "Qonnaan bultoota Itoophiyaa guutuu waliin wal qunnami.",
        footerText: "Teeknooloojii qonnaa nama hundaaf.",
        noProducts: "Oomishni hin argamne",
        noProductsDescription: "Oomishni barbaacha kee wajjin walsimu hin jiru.",
        details: "Bal'ina ilaali",
        product: "Oomisha",
        location: "Bakka",
        quantity: "Hamma jiru",
        price: "Gatii",
        minimumOrder: "Ajaja xiqqaa",
        quality: "Qulqullina",
        harvestDate: "Guyyaa haamaa",
        description: "Ibsa",
        seller: "Qonnaan bulaa / Gurguraa",
        callFarmer: "Qonnaan bulaa qunnami",
        phoneUnavailable: "Lakkoofsi bilbilaa hin jiru",
        noPhone: "Qonnaan bulaan kun lakkoofsa bilbilaa isaa hin maxxansine.",
        noLocation: "Bakki hin ibsamne",
        perUnit: "tokkoon",
        kg: "kg",
        piece: "meeshaa",
        quintal: "kuuntaala",
        bag: "boorsaa",
        litre: "liitira",
        ton: "toonii",
        dateUnknown: "Hin ibsamne"
    },

    so: {
        workspace: "GOOBTA SHAQADA",
        dashboard: "Bogga guud",
        weather: "Cimilada",
        education: "Waxbarasho",
        agricultureNews: "Wararka Beeraha",
        marketplace: "Suuqa",
        needHelp: "Caawimo ma u baahan tahay?",
        helpDescription: "Baadh macluumaadka beeraha iyo fursadaha.",
        getSupport: "Hel taageero →",
        platformStatus: "Suuqa AgriNova",
        home: "Bogga hore",
        marketEyebrow: "SUUQA BEERAHA ITOOBIYA",
        heroTitle: "Beerta si toos ah adiga kuugu timaadda.",
        heroDescription: "Soo hel wax soo saarka beeraha ee beeralayda Itoobiya. La xiriir iibiyeyaasha si toos ah.",
        searchPlaceholder: "Maxaad raadineysaa?",
        search: "Raadi",
        farmerDirect: "Si toos ah ula xiriir beeralayda diiwaangashan",
        explore: "Baadh",
        shopCategories: "Ku raadi qaybaha",
        viewAll: "Dhammaan eeg →",
        allProducts: "Dhammaan badeecooyinka",
        grains: "Badar",
        fruits: "Miraha",
        vegetables: "Khudaarta",
        legumes: "Digirta",
        coffee: "Bunka",
        livestock: "Xoolaha",
        other: "Kale",
        handpicked: "BAADH AGRINOVA",
        featuredProducts: "Badeecooyinka la soo bandhigay",
        loadingProducts: "Badeecooyinka waa la soo rarayaa...",
        marketCollection: "Badeecooyinka suuqa",
        browseProducts: "Baadh badeecooyinka",
        sortBy: "Kala saar",
        newest: "Kuwa ugu cusub",
        priceLow: "Qiimaha: hoose ilaa sare",
        priceHigh: "Qiimaha: sare ilaa hoose",
        nameAZ: "Magaca",
        filters: "Shaandheeyayaasha",
        reset: "Dib u deji",
        searchProducts: "Raadi badeecooyinka",
        productSearchPlaceholder: "Magaca badeecada...",
        category: "Qaybta",
        allCategories: "Dhammaan qaybaha",
        region: "Gobolka",
        allRegions: "Dhammaan gobollada",
        priceRange: "Heerka qiimaha (ETB)",
        availability: "Helitaanka",
        allAvailability: "Dhammaan",
        available: "Waa la heli karaa",
        applyFilters: "Adeegso shaandheeyayaasha",
        ourPurpose: "UJEEDDADA",
        bannerTitle: "Taageeridda beeralayda Itoobiya.",
        bannerDescription: "La xiriir beeralayda ku kala sugan Itoobiya.",
        footerText: "Tiknoolajiyada beeraha qof walba.",
        noProducts: "Badeeco lama helin",
        noProductsDescription: "Ma jiraan badeecooyin ku habboon raadintaada.",
        details: "Faahfaahin eeg",
        product: "Badeecad",
        location: "Goobta",
        quantity: "Tirada la heli karo",
        price: "Qiimaha",
        minimumOrder: "Dalabka ugu yar",
        quality: "Tayada",
        harvestDate: "Taariikhda goosashada",
        description: "Sharaxaad",
        seller: "Beeraley / Iibiye",
        callFarmer: "La xiriir beeraleyda",
        phoneUnavailable: "Telefoon lama heli karo",
        noPhone: "Beeraleydan ma aysan oggolaan in lambarkooda la muujiyo.",
        noLocation: "Goob lama sheegin",
        perUnit: "halkii",
        kg: "kg",
        piece: "xabbo",
        quintal: "kiintaal",
        bag: "kiish",
        litre: "litir",
        ton: "tan",
        dateUnknown: "Lama sheegin"
    }
};


/* HELPERS */

function translate(key) {
    return translations[marketplaceState.language]?.[key]
        || translations.en[key]
        || key;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
}

function safeImageUrl(value) {
    if (!value) return "";
    try {
        const url = new URL(value, window.location.origin);
        return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

function formatPrice(value) {
    const number = Number(value);
    if (value === null || value === undefined || value === "" || !Number.isFinite(number)) {
        return translate("priceNotSet");
    }
    return new Intl.NumberFormat("en-ET", { maximumFractionDigits: 2 }).format(number) + " ETB";
}

function formatDate(value) {
    if (!value) return translate("dateUnknown");
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return translate("dateUnknown");
    return new Intl.DateTimeFormat("en-ET", { dateStyle: "medium" }).format(date);
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

function initializeMarketplaceSupabase() {
    if (window.agrinovaSupabase) {
        marketplaceSupabase = window.agrinovaSupabase;
        return marketplaceSupabase;
    }
    if (window.supabaseClient) {
        marketplaceSupabase = window.supabaseClient;
        return marketplaceSupabase;
    }
    if (!window.supabase?.createClient) {
        throw new Error("Supabase library could not be loaded. Check your internet connection.");
    }
    if (!AGRINOVA_MARKET_CONFIG.supabaseUrl.startsWith("https://") ||
        !AGRINOVA_MARKET_CONFIG.supabaseAnonKey) {
        throw new Error("Supabase URL or publishable key is missing.");
    }

    marketplaceSupabase = window.supabase.createClient(
        AGRINOVA_MARKET_CONFIG.supabaseUrl,
        AGRINOVA_MARKET_CONFIG.supabaseAnonKey,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );
    window.agrinovaSupabase = marketplaceSupabase;
    return marketplaceSupabase;
}

/* LANGUAGE */

function applyLanguage(language) {
    if (!translations[language]) language = "en";
    marketplaceState.language = language;

    try {
        localStorage.setItem("agrinova_language", language);
    } catch (error) {
        console.warn("Could not save language preference.", error);
    }

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const translated = translate(key);
        if (translated !== key) element.textContent = translated;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = translate(element.dataset.i18nPlaceholder);
    });

    const label = document.getElementById("currentLanguageLabel");
    if (label) label.textContent = languageNames[language];

    if (marketplaceState.products.length) {
        renderFeaturedProducts();
        renderProducts();
        updatePagination();
        if (marketplaceState.selectedProduct) {
            openProductDetails(marketplaceState.selectedProduct.id);
        }
    }
}

function initializeLanguage() {
    let saved = "en";
    try {
        saved = localStorage.getItem("agrinova_language") || "en";
    } catch (error) {
        console.warn("Could not read language preference.", error);
    }
    applyLanguage(saved);

    const languageButton = document.getElementById("languageButton");
    const dropdown = document.getElementById("languageDropdown");

    languageButton?.addEventListener("click", () => {
        const isOpen = dropdown.classList.toggle("show");
        languageButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll("[data-language]").forEach(button => {
        button.addEventListener("click", () => {
            applyLanguage(button.dataset.language);
            dropdown.classList.remove("show");
            languageButton?.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".language-wrapper")) {
            dropdown?.classList.remove("show");
            languageButton?.setAttribute("aria-expanded", "false");
        }
    });
}

/* IMAGE URLS
   storage_path is a storage object path, not automatically a public URL.
   Configure imageBucket above to resolve paths from your actual bucket.
*/

function resolveListingImage(storagePath) {
    const directUrl = safeImageUrl(storagePath);
    if (directUrl) return directUrl;

    if (!storagePath || !AGRINOVA_MARKET_CONFIG.imageBucket || !marketplaceSupabase) {
        return "";
    }

    const cleanPath = String(storagePath).replace(/^\/+/, "");
    const { data } = marketplaceSupabase.storage
        .from(AGRINOVA_MARKET_CONFIG.imageBucket)
        .getPublicUrl(cleanPath);

    return safeImageUrl(data?.publicUrl);
}

function normalizeListing(listing, seller, images) {
    const sortedImages = (images || [])
        .slice()
        .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));

    return {
        ...listing,
        seller: seller || null,
        images: sortedImages,
        imageUrl: sortedImages.length
            ? resolveListingImage(sortedImages[0].storage_path)
            : ""
    };
}

/* LOAD LISTINGS FROM THE EXISTING TABLES */

async function loadMarketplaceProducts() {
    if (!marketplaceSupabase) {
        displayError("Supabase is not initialized.");
        return;
    }

    marketplaceState.loading = true;
    const grid = document.getElementById("productGrid");
    const featured = document.getElementById("featuredGrid");

    if (grid) {
        grid.innerHTML = `<div class="loading-state"><div class="loader"></div><p>${escapeHTML(translate("loadingProducts"))}</p></div>`;
    }
    if (featured) {
        featured.innerHTML = `<div class="loading-state"><div class="loader"></div><p>${escapeHTML(translate("loadingProducts"))}</p></div>`;
    }

    try {
        // The actual schema uses title/category/unit/min_order/seller_id and status='active'.
        const { data: listings, error: listingError } = await marketplaceSupabase
            .from(AGRINOVA_MARKET_CONFIG.productsTable)
            .select("id, seller_id, title, category, unit, quantity, price, min_order, description, location, status, created_at, updated_at")
            .eq("status", "active")
            .order("created_at", { ascending: false })
            .limit(500);

        if (listingError) throw listingError;

        const rows = listings || [];
        if (!rows.length) {
            marketplaceState.products = [];
            marketplaceState.filteredProducts = [];
            marketplaceState.loading = false;
            renderFeaturedProducts();
            applyFilters();
            return;
        }

        const sellerIds = [...new Set(rows.map(row => row.seller_id).filter(Boolean))];
        const listingIds = rows.map(row => row.id);

        const [sellerResult, imageResult] = await Promise.all([
            sellerIds.length
                ? marketplaceSupabase
                    .from(AGRINOVA_MARKET_CONFIG.sellersTable)
                    .select("user_id, display_name, region, city, phone, avatar_url")
                    .in("user_id", sellerIds)
                : Promise.resolve({ data: [], error: null }),

            listingIds.length
                ? marketplaceSupabase
                    .from(AGRINOVA_MARKET_CONFIG.imagesTable)
                    .select("id, listing_id, storage_path, sort_order, created_at")
                    .in("listing_id", listingIds)
                    .order("sort_order", { ascending: true })
                : Promise.resolve({ data: [], error: null })
        ]);

        if (sellerResult.error) throw sellerResult.error;
        if (imageResult.error) throw imageResult.error;

        const sellersById = new Map((sellerResult.data || []).map(seller => [seller.user_id, seller]));
        const imagesByListing = new Map();

        (imageResult.data || []).forEach(image => {
            if (!imagesByListing.has(image.listing_id)) imagesByListing.set(image.listing_id, []);
            imagesByListing.get(image.listing_id).push(image);
        });

        marketplaceState.products = rows.map(listing =>
            normalizeListing(
                listing,
                sellersById.get(listing.seller_id),
                imagesByListing.get(listing.id) || []
            )
        );

        marketplaceState.loading = false;
        marketplaceState.currentPage = 1;

        renderFeaturedProducts();
        applyFilters();

    } catch (error) {
        console.error("Marketplace loading error:", error);
        marketplaceState.loading = false;
        displayError(error.message || "An unknown error occurred.");
    }
}

/* ERROR / EMPTY STATES */

function displayError(message) {
    const container = document.getElementById("productGrid");
    if (!container) return;

    container.innerHTML = `
        <div class="error-state">
            <div class="empty-icon">!</div>
            <h3>${escapeHTML(translate("loadingError"))}</h3>
            <p>${escapeHTML(message)}</p>
            <button class="retry-button" id="retryProducts">${escapeHTML(translate("retry"))}</button>
        </div>`;

    document.getElementById("retryProducts")?.addEventListener("click", loadMarketplaceProducts);

    const featured = document.getElementById("featuredGrid");
    if (featured) featured.innerHTML = "";
}

/* FILTERS AND SORTING */

function normalizeCategory(value) {
    return String(value || "").trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function applyFilters() {
    const category = document.getElementById("categoryFilter")?.value || "all";
    const region = document.getElementById("regionFilter")?.value || "all";
    const minPrice = document.getElementById("minPrice")?.value || "";
    const maxPrice = document.getElementById("maxPrice")?.value || "";
    const availability = document.getElementById("availabilityFilter")?.value || "all";
    const sidebarSearch = document.getElementById("filterSearch")?.value.trim().toLowerCase() || "";
    const heroSearch = document.getElementById("heroSearch")?.value.trim().toLowerCase() || "";
    const search = heroSearch || sidebarSearch;

    marketplaceState.searchTerm = search;
    marketplaceState.region = region;
    marketplaceState.currentCategory = category;
    marketplaceState.minPrice = minPrice;
    marketplaceState.maxPrice = maxPrice;
    marketplaceState.availability = availability;

    marketplaceState.filteredProducts = marketplaceState.products.filter(product => {
        const seller = product.seller || {};
        const productCategory = normalizeCategory(product.category);
        const selectedCategory = normalizeCategory(category);

        const matchesCategory = category === "all" || productCategory === selectedCategory;
        const matchesRegion = region === "all" ||
            String(product.location || "").toLowerCase().includes(region.toLowerCase()) ||
            String(seller.region || "").toLowerCase() === region.toLowerCase() ||
            String(seller.city || "").toLowerCase() === region.toLowerCase();

        const matchesSearch = !search || [
            product.title, product.description, product.category, product.location,
            seller.display_name, seller.region, seller.city
        ].some(value => String(value || "").toLowerCase().includes(search));

        const price = Number(product.price);
        const matchesMin = minPrice === "" || (Number.isFinite(price) && price >= Number(minPrice));
        const matchesMax = maxPrice === "" || (Number.isFinite(price) && price <= Number(maxPrice));
        const matchesAvailability = availability === "all" || Number(product.quantity) > 0;

        return matchesCategory && matchesRegion && matchesSearch &&
            matchesMin && matchesMax && matchesAvailability;
    });
        sortProducts();
    marketplaceState.currentPage = 1;
    renderProducts();
    updatePagination();
}

function sortProducts() {
    const sort = document.getElementById("sortSelect")?.value || "newest";
    marketplaceState.sort = sort;

    marketplaceState.filteredProducts.sort((a, b) => {
        if (sort === "price-low") return Number(a.price) - Number(b.price);
        if (sort === "price-high") return Number(b.price) - Number(a.price);
        if (sort === "name") return String(a.title || "").localeCompare(String(b.title || ""));
        return new Date(b.created_at) - new Date(a.created_at);
    });
}

/* PRODUCT CARDS */

function getUnitLabel(unit) {
    const units = {
        kg: "kg", kilogram: "kg", kilograms: "kg",
        piece: "piece", pieces: "pieces",
        quintal: "quintal", bag: "bag", litre: "litre", liter: "litre",
        ton: "ton", tonne: "ton"
    };
    const key = String(unit || "").toLowerCase();
    return units[key] || unit || "";
}

function productLocation(product) {
    const seller = product.seller || {};
    return product.location || [seller.city, seller.region].filter(Boolean).join(", ") || translate("noLocation");
}

function createProductCard(product) {
    const image = product.imageUrl;
    const unit = getUnitLabel(product.unit);
    const categoryLabel = translate(String(product.category || "other").toLowerCase());

    return `
        <article class="product-card">
            <div class="product-image-wrap" data-product-id="${escapeHTML(product.id)}">
                ${image
                    ? `<img class="product-image" src="${escapeHTML(image)}" alt="${escapeHTML(product.title)}" loading="lazy">`
                    : `<div class="empty-icon">✳</div>`}
                <span class="product-tag">${escapeHTML(categoryLabel)}</span>
            </div>
            <div class="product-card-body">
                <span class="product-category">${escapeHTML(categoryLabel)}</span>
                <h3 class="product-name">${escapeHTML(product.title)}</h3>
                <div class="product-location"><span>⌖</span><span>${escapeHTML(productLocation(product))}</span></div>
                <hr class="product-divider">
                <div class="product-card-bottom">
                    <div>
                        <div class="product-price">${escapeHTML(formatPrice(product.price))}</div>
                        <div class="product-unit">${unit ? `${escapeHTML(translate("perUnit"))} ${escapeHTML(unit)}` : ""}</div>
                    </div>
                    <button class="details-button" type="button" data-product-id="${escapeHTML(product.id)}">${escapeHTML(translate("details"))}</button>
                </div>
            </div>
        </article>`;
}

function attachProductCardEvents(container) {
    container.querySelectorAll("[data-product-id]").forEach(element => {
        element.addEventListener("click", () => openProductDetails(element.dataset.productId));
    });
}

function renderFeaturedProducts() {
    const container = document.getElementById("featuredGrid");
    if (!container) return;

    const featured = marketplaceState.products.slice(0, 3);
    if (!featured.length) {
        container.innerHTML = `<div class="empty-state"><h3>${escapeHTML(translate("noProducts"))}</h3><p>${escapeHTML(translate("noProductsDescription"))}</p></div>`;
        return;
    }

    container.innerHTML = featured.map(createProductCard).join("");
    attachProductCardEvents(container);
}

function renderProducts() {
    const container = document.getElementById("productGrid");
    if (!container) return;

    const start = (marketplaceState.currentPage - 1) * AGRINOVA_MARKET_CONFIG.productsPerPage;
    const visible = marketplaceState.filteredProducts.slice(start, start + AGRINOVA_MARKET_CONFIG.productsPerPage);
    const count = document.getElementById("resultsCount");
    if (count) count.textContent = `${marketplaceState.filteredProducts.length} ${translate("results")}`;

    if (!visible.length) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon">⌕</div><h3>${escapeHTML(translate("noProducts"))}</h3><p>${escapeHTML(translate("noProductsDescription"))}</p></div>`;
        return;
    }

    container.innerHTML = visible.map(createProductCard).join("");
    attachProductCardEvents(container);
}

/* PRODUCT DETAILS — browsing only; checkout/contact are not enabled yet */

function openProductDetails(productId) {
    const product = marketplaceState.products.find(item => String(item.id) === String(productId));
    if (!product) return;

    marketplaceState.selectedProduct = product;
    const seller = product.seller || {};
    const unit = getUnitLabel(product.unit);
    const image = product.imageUrl;
    const content = document.getElementById("productDetailsContent");
    if (!content) return;

    content.innerHTML = `
        <div class="modal-product-layout">
            <div>
                ${image
                    ? `<img class="modal-product-image" src="${escapeHTML(image)}" alt="${escapeHTML(product.title)}">`
                    : `<div class="modal-product-image"></div>`}
            </div>
            <div class="modal-product-info">
                <span class="product-category">${escapeHTML(translate(String(product.category || "other").toLowerCase()))}</span>
                <h2>${escapeHTML(product.title)}</h2>
                <div class="modal-price">
                    ${escapeHTML(formatPrice(product.price))}
                    <span class="product-unit">${unit ? `${escapeHTML(translate("perUnit"))} ${escapeHTML(unit)}` : ""}</span>
                </div>
                <div class="product-location">⌖ ${escapeHTML(productLocation(product))}</div>
                <p class="modal-description">${escapeHTML(product.description || "")}</p>
                <div class="detail-list">
                    <div class="detail-item"><span>${escapeHTML(translate("quantity"))}</span><strong>${escapeHTML(product.quantity)} ${escapeHTML(unit)}</strong></div>
                    <div class="detail-item"><span>${escapeHTML(translate("minimumOrder"))}</span><strong>${escapeHTML(product.min_order)} ${escapeHTML(unit)}</strong></div>
                </div>
                <div class="seller-panel">
                    <div class="seller-heading">
                        <div class="seller-avatar">${escapeHTML((seller.display_name || "A").trim().charAt(0).toUpperCase())}</div>
                        <div>
                            <strong>${escapeHTML(seller.display_name || translate("unknownFarmer"))}</strong>
                            <span>${escapeHTML(translate("seller"))}</span>
                        </div>
                    </div>
                    <p class="modal-description">Product browsing is available. Online ordering and phone contact will be added after the checkout and contact settings are configured.</p>
                </div>
            </div>
        </div>`;

    const modal = document.getElementById("productModal");
    modal?.classList.add("show");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    const modal = document.getElementById("productModal");
    modal?.classList.remove("show");
    modal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    marketplaceState.selectedProduct = null;
}

/* PAGINATION */

function updatePagination() {
    const container = document.getElementById("pagination");
    if (!container) return;

    const totalPages = Math.ceil(marketplaceState.filteredProducts.length / AGRINOVA_MARKET_CONFIG.productsPerPage);
    if (totalPages <= 1) {
        container.innerHTML = "";
        return;
    }

    let html = `
        <button class="page-button" data-page="${marketplaceState.currentPage - 1}" ${marketplaceState.currentPage === 1 ? "disabled" : ""}>‹</button>`;

    for (let page = 1; page <= totalPages; page++) {
        html += `<button class="page-button ${page === marketplaceState.currentPage ? "active" : ""}" data-page="${page}">${page}</button>`;
    }

    html += `<button class="page-button" data-page="${marketplaceState.currentPage + 1}" ${marketplaceState.currentPage === totalPages ? "disabled" : ""}>›</button>`;
    container.innerHTML = html;

    container.querySelectorAll("[data-page]").forEach(button => {
        button.addEventListener("click", () => {
            const page = Number(button.dataset.page);
            if (page < 1 || page > totalPages) return;
            marketplaceState.currentPage = page;
            renderProducts();
            updatePagination();
            document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
        });
    });
}

/* EVENTS */

function initializeMarketplaceEvents() {
    document.getElementById("heroSearchButton")?.addEventListener("click", applyFilters);

    document.getElementById("heroSearch")?.addEventListener("keydown", event => {
        if (event.key === "Enter") applyFilters();
    });

    document.getElementById("filterSearch")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            document.getElementById("heroSearch").value = document.getElementById("filterSearch").value;
            applyFilters();
        }
    });

    document.getElementById("applyFilters")?.addEventListener("click", () => {
        document.getElementById("heroSearch").value = "";
        applyFilters();
    });

    document.getElementById("sortSelect")?.addEventListener("change", () => {
        sortProducts();
        marketplaceState.currentPage = 1;
        renderProducts();
        updatePagination();
    });

    document.querySelectorAll(".category-card[data-category]").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".category-card").forEach(card => card.classList.remove("active"));
            button.classList.add("active");
            document.getElementById("categoryFilter").value = button.dataset.category;
            applyFilters();
            document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
        });
    });

    document.getElementById("clearCategory")?.addEventListener("click", () => {
        document.querySelectorAll(".category-card").forEach(card => card.classList.remove("active"));
        document.querySelector('.category-card[data-category="all"]')?.classList.add("active");
        document.getElementById("categoryFilter").value = "all";
        applyFilters();
    });

    document.getElementById("resetFilters")?.addEventListener("click", () => {
        ["filterSearch", "heroSearch", "minPrice", "maxPrice"].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = "";
        });
        document.getElementById("categoryFilter").value = "all";
        document.getElementById("regionFilter").value = "all";
        document.getElementById("availabilityFilter").value = "all";
        document.getElementById("sortSelect").value = "newest";
        document.querySelectorAll(".category-card").forEach(card => card.classList.remove("active"));
        document.querySelector('.category-card[data-category="all"]')?.classList.add("active");
        applyFilters();
    });

    document.getElementById("closeProductModal")?.addEventListener("click", closeProductModal);
    document.getElementById("productModal")?.addEventListener("click", event => {
        if (event.target.id === "productModal") closeProductModal();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeProductModal();
    });

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const closeSidebar = () => {
        sidebar?.classList.remove("open");
        overlay?.classList.remove("show");
    };

    document.getElementById("mobileMenu")?.addEventListener("click", () => {
        sidebar?.classList.toggle("open");
        overlay?.classList.toggle("show");
    });
    overlay?.addEventListener("click", closeSidebar);
    sidebar?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeSidebar));
}

/* START */

async function initializeMarketplace() {
    const year = document.getElementById("currentYear");
    if (year) year.textContent = new Date().getFullYear();

    initializeLanguage();
    initializeMarketplaceEvents();

    try {
        initializeMarketplaceSupabase();
        await loadMarketplaceProducts();
    } catch (error) {
        console.error("Marketplace initialization error:", error);
        displayError(error.message || "Marketplace could not be initialized.");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMarketplace);
} else {
    initializeMarketplace();
}