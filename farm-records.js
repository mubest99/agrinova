/* =========================================================
   AGRINOVA - FARM RECORDS
   Supabase data retrieval and five-language interface
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       1. CONFIGURATION
       ===================================================== */

    const CONFIG = {
        SUPABASE_URL: "https://iqxfusbouchrapfxonxe.supabase.co",
        SUPABASE_ANON_KEY: "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv",

        // Existing confirmed table from your Supabase project.
        FARM_RECORDS_TABLE: "farm_records",

        // Optional: change this if your existing crops table
        // has a different name.
        CROPS_TABLE: "my_crops",

        // Your existing crop management page.
        CROPS_SETTINGS_PAGE: "my-crops.html"
    };


    /* =====================================================
       2. SUPABASE INITIALIZATION
       ===================================================== */

    let supabaseClient = null;
    let currentUser = null;

    if (
        window.supabase &&
        CONFIG.SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
        CONFIG.SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY" &&
        CONFIG.SUPABASE_URL.trim() !== "" &&
        CONFIG.SUPABASE_ANON_KEY.trim() !== ""
    ) {
        supabaseClient = window.supabase.createClient(
            CONFIG.SUPABASE_URL,
            CONFIG.SUPABASE_ANON_KEY
        );
    }


    /* =====================================================
       3. TRANSLATIONS
       ===================================================== */

    const translations = {

        en: {
            platform: "Agricultural Platform",
            farmerDashboard: "Farmer Dashboard",
            dashboardHome: "Dashboard Home",
            myFarm: "My Farm",
            myCrops: "My Crops",
            dailyFarm: "Daily Farm",
            farmTasks: "Farm Tasks & Calendar",
            farmRecords: "Farm Records",
            farmCalculator: "Farm Calculator",
            farmFinance: "Farm Finance",
            aiAssistant: "AI Agricultural Assistant",
            farmAnalysis: "Farm Analysis & ID",
            community: "Farmer Community",
            marketplace: "Marketplace",
            resources: "AgriNova Resources",
            articles: "Agriculture Articles",
            cropInformation: "Crop Information",
            cropMap: "Ethiopian Crop Map",
            weather: "Weather",
            pestLibrary: "Pest & Disease Library",
            fertilizer: "Fertilizer Information",
            agricultureNews: "Agriculture News",
            cropNews: "Crop News",
            innovation: "Agriculture Innovation",
            education: "Educational Content",
            simulation: "Farm Simulation",

            searchPlaceholder: "Search all farm records...",
            notifications: "Notifications",
            noNotifications: "No new notifications.",
            connecting: "Connecting to Supabase...",
            connected: "Connected to Supabase",
            disconnected: "Not connected",

            farmManagement: "FARM MANAGEMENT",
            pageTitle: "Farm Records",
            pageDescription: "View and organize the information stored in your farm.",

            totalRecords: "Total Records",
            recordCategories: "Record Categories",
            latestUpdate: "Latest Update",

            historyTitle: "Farm History",
            historyDescription: "Your saved farm information, retrieved from Supabase.",
            refresh: "Refresh",

            filterByCategory: "Filter by category",
            allCategories: "All Categories",
            farmProfile: "Farm Profile",
            landSection: "Land Sections",
            water: "Water",
            farmLocation: "Farm Location",
            assets: "Assets",
            infrastructure: "Infrastructure",
            seasonalPlan: "Seasonal Plans",

            loadingRecords: "Loading your farm records...",
            errorTitle: "Unable to load records",
            tryAgain: "Try Again",
            emptyTitle: "No farm records found",
            emptyDescription: "Your saved farm information will appear here.",
            recordInformation: "RECORD INFORMATION",
            viewDetails: "View All Fields",
            what: "What",
            when: "When",
            where: "Where",
            recordId: "Record ID",
            createdAt: "Created At",
            updatedAt: "Updated At",
            recordType: "Record Type",
            payload: "Saved Information",
            noValue: "Not provided",
            fieldsFound: "fields",
            records: "records",

            myCropsTitle: "My Crops",
            myCropsDescription: "Open your crop information and available crop settings.",
            viewMyCrops: "View My Crops",
            cropManagement: "CROP MANAGEMENT",
            loadingCrops: "Loading crop information...",
            noCrops: "No crop information available",
            noCropsDescription: "Crop information will appear here when it is available.",
            openCropSettings: "Open Crop Settings",

            errorSupabaseConfig: "Please enter your Supabase URL and anon key in farm-records.js.",
            errorLogin: "You must sign in to view your farm records.",
            errorFetch: "Could not retrieve records from Supabase.",
            refreshSuccess: "Farm records refreshed.",
            cropTableError: "Crop information could not be loaded. Check the crop table name and its access policies.",
            cropTableMissing: "The configured crops table was not found or is not accessible.",

            allFields: "All Saved Fields",
            noMatchingRecords: "No records match your search.",
            unknownCategory: "Other Record",
            locationNotFound: "Location not specified",
            dateNotAvailable: "Date not available"
        },

        am: {
            platform: "የግብርና መድረክ",
            farmerDashboard: "የገበሬ ዳሽቦርድ",
            dashboardHome: "ዋና ገጽ",
            myFarm: "የእኔ እርሻ",
            myCrops: "የእኔ ሰብሎች",
            dailyFarm: "ዕለታዊ እርሻ",
            farmTasks: "የእርሻ ሥራዎች እና ቀን መቁጠሪያ",
            farmRecords: "የእርሻ መዝገቦች",
            farmCalculator: "የእርሻ ማስያ",
            farmFinance: "የእርሻ ፋይናንስ",
            aiAssistant: "የአርቴፊሻል ብልህነት የግብርና ረዳት",
            farmAnalysis: "የእርሻ ትንተና እና መለያ",
            community: "የገበሬዎች ማህበረሰብ",
            marketplace: "የገበያ ቦታ",
            resources: "የአግሪኖቫ ሀብቶች",
            articles: "የግብርና ጽሑፎች",
            cropInformation: "የሰብል መረጃ",
            cropMap: "የኢትዮጵያ ሰብል ካርታ",
            weather: "የአየር ሁኔታ",
            pestLibrary: "የተባይ እና በሽታ መረጃ",
            fertilizer: "የማዳበሪያ መረጃ",
            agricultureNews: "የግብርና ዜና",
            cropNews: "የሰብል ዜና",
            innovation: "የግብርና ፈጠራ",
            education: "የትምህርት ይዘት",
            simulation: "የእርሻ ማስመሰያ",

            searchPlaceholder: "ሁሉንም የእርሻ መዝገቦች ይፈልጉ...",
            notifications: "ማሳወቂያዎች",
            noNotifications: "አዲስ ማሳወቂያ የለም።",
            connecting: "ከSupabase ጋር በመገናኘት ላይ...",
            connected: "ከSupabase ጋር ተገናኝቷል",
            disconnected: "አልተገናኘም",

            farmManagement: "የእርሻ አስተዳደር",
            pageTitle: "የእርሻ መዝገቦች",
            pageDescription: "በእርሻዎ ውስጥ የተቀመጡ መረጃዎችን ይመልከቱ።",

            totalRecords: "ጠቅላላ መዝገቦች",
            recordCategories: "የመዝገብ ዓይነቶች",
            latestUpdate: "የቅርብ ጊዜ ማሻሻያ",

            historyTitle: "የእርሻ ታሪክ",
            historyDescription: "ከSupabase የተገኙ የተቀመጡ የእርሻ መረጃዎች።",
            refresh: "አድስ",

            filterByCategory: "በዓይነት ያጣሩ",
            allCategories: "ሁሉም ዓይነቶች",
            farmProfile: "የእርሻ መገለጫ",
            landSection: "የመሬት ክፍሎች",
            water: "ውሃ",
            farmLocation: "የእርሻ ቦታ",
            assets: "ንብረቶች",
            infrastructure: "መሠረተ ልማት",
            seasonalPlan: "የወቅት ዕቅዶች",

            loadingRecords: "የእርሻ መዝገቦችዎን በመጫን ላይ...",
            errorTitle: "መዝገቦችን መጫን አልተቻለም",
            tryAgain: "እንደገና ይሞክሩ",
            emptyTitle: "ምንም የእርሻ መዝገብ አልተገኘም",
            emptyDescription: "የተቀመጡ የእርሻ መረጃዎችዎ እዚህ ይታያሉ።",
            recordInformation: "የመዝገብ መረጃ",
            viewDetails: "ሁሉንም መስኮች ይመልከቱ",
            what: "ምን",
            when: "መቼ",
            where: "የት",
            recordId: "የመዝገብ መለያ",
            createdAt: "የተፈጠረበት ጊዜ",
            updatedAt: "የተሻሻለበት ጊዜ",
            recordType: "የመዝገብ ዓይነት",
            payload: "የተቀመጠ መረጃ",
            noValue: "አልተገለጸም",
            fieldsFound: "መስኮች",
            records: "መዝገቦች",

            myCropsTitle: "የእኔ ሰብሎች",
            myCropsDescription: "የሰብል መረጃዎን እና ቅንብሮችን ይመልከቱ።",
            viewMyCrops: "ሰብሎቼን ይመልከቱ",
            cropManagement: "የሰብል አስተዳደር",
            loadingCrops: "የሰብል መረጃን በመጫን ላይ...",
            noCrops: "የሰብል መረጃ አልተገኘም",
            noCropsDescription: "የሰብል መረጃ ሲኖር እዚህ ይታያል።",
            openCropSettings: "የሰብል ቅንብሮችን ይክፈቱ",

            errorSupabaseConfig: "በfarm-records.js ውስጥ የSupabase URL እና anon key ያስገቡ።",
            errorLogin: "የእርሻ መዝገቦችን ለማየት መግባት አለብዎት።",
            errorFetch: "መዝገቦችን ከSupabase ማግኘት አልተቻለም።",
            refreshSuccess: "የእርሻ መዝገቦች ታድሰዋል።",
            cropTableError: "የሰብል መረጃ አልተጫነም። የሰንጠረዡን ስም እና የመዳረሻ ፖሊሲዎችን ያረጋግጡ።",
            cropTableMissing: "የተጠቀሰው የሰብል ሰንጠረዥ አልተገኘም ወይም መዳረሻ የለዎትም።",

            allFields: "ሁሉም የተቀመጡ መስኮች",
            noMatchingRecords: "ከፍለጋዎ ጋር የሚዛመድ መዝገብ የለም።",
            unknownCategory: "ሌላ መዝገብ",
            locationNotFound: "ቦታ አልተገለጸም",
            dateNotAvailable: "ቀን አልተገኘም"
        },

        ti: {
            platform: "መድረኽ ሕርሻ",
            farmerDashboard: "ዳሽቦርድ ሓረስቶት",
            dashboardHome: "ቀንዲ ገጽ",
            myFarm: "ሕርሻይ",
            myCrops: "ኣህምልተይ",
            dailyFarm: "መዓልታዊ ሕርሻ",
            farmTasks: "ዕማማት ሕርሻን ካላንደርን",
            farmRecords: "መዝገባት ሕርሻ",
            farmCalculator: "መሕሰቢ ሕርሻ",
            farmFinance: "ፋይናንስ ሕርሻ",
            aiAssistant: "ሓጋዚ ሕርሻ ብAI",
            farmAnalysis: "ትንተና ሕርሻን መለለይን",
            community: "ማሕበረሰብ ሓረስቶት",
            marketplace: "ዕዳጋ",
            resources: "ጸጋታት ኣግሪኖቫ",
            articles: "ጽሑፋት ሕርሻ",
            cropInformation: "ሓበሬታ ኣህምልቲ",
            cropMap: "ካርታ ኣህምልቲ ኢትዮጵያ",
            weather: "ኩነታት ኣየር",
            pestLibrary: "ሓበሬታ ባልዕን ሕማማትን",
            fertilizer: "ሓበሬታ ድኹዒ",
            agricultureNews: "ዜና ሕርሻ",
            cropNews: "ዜና ኣህምልቲ",
            innovation: "ሓድሽ ምህዞ ሕርሻ",
            education: "ትምህርታዊ ትሕዝቶ",
            simulation: "ምስላ ሕርሻ",

            searchPlaceholder: "ኩሎም መዝገባት ሕርሻ ድለ...",
            notifications: "ምልክታታት",
            noNotifications: "ሓድሽ ምልክታ የለን።",
            connecting: "ምስ Supabase ይራኸብ ኣሎ...",
            connected: "ምስ Supabase ተራኺቡ",
            disconnected: "ኣይተራኸበን",

            farmManagement: "ምሕደራ ሕርሻ",
            pageTitle: "መዝገባት ሕርሻ",
            pageDescription: "ኣብ ሕርሻኻ ዝተቐመጠ ሓበሬታ ርአ።",

            totalRecords: "ጠቕላላ መዝገባት",
            recordCategories: "ዓይነታት መዝገብ",
            latestUpdate: "ናይ መወዳእታ ምምሕያሽ",

            historyTitle: "ታሪኽ ሕርሻ",
            historyDescription: "ካብ Supabase ዝተረኽበ ዝተቐመጠ ሓበሬታ ሕርሻኻ።",
            refresh: "ኣሐድስ",

            filterByCategory: "ብዓይነት ምረጽ",
            allCategories: "ኩሎም ዓይነታት",
            farmProfile: "መግለጺ ሕርሻ",
            landSection: "ክፍልታት መሬት",
            water: "ማይ",
            farmLocation: "ቦታ ሕርሻ",
            assets: "ንብረታት",
            infrastructure: "መሰረተ ልምዓት",
            seasonalPlan: "መደባት ወቕቲ",

            loadingRecords: "መዝገባት ሕርሻኻ ይጽዓን ኣሎ...",
            errorTitle: "መዝገባት ምጽዓን ኣይተኻእለን",
            tryAgain: "እንደገና ፈትን",
            emptyTitle: "መዝገባት ሕርሻ ኣይተረኽቡን",
            emptyDescription: "ዝተቐመጠ ሓበሬታ ሕርሻኻ ኣብዚ ክረአ እዩ።",
            recordInformation: "ሓበሬታ መዝገብ",
            viewDetails: "ኩሎም መስኮታት ርአ",
            what: "እንታይ",
            when: "መዓስ",
            where: "ኣበይ",
            recordId: "መለለይ መዝገብ",
            createdAt: "ዝተፈጥረሉ",
            updatedAt: "ዝተመሓየሸሉ",
            recordType: "ዓይነት መዝገብ",
            payload: "ዝተቐመጠ ሓበሬታ",
            noValue: "ኣይተገልጸን",
            fieldsFound: "መስኮታት",
            records: "መዝገባት",

            myCropsTitle: "ኣህምልተይ",
            myCropsDescription: "ሓበሬታ ኣህምልትኻን ቅንብራትን ርአ።",
            viewMyCrops: "ኣህምልተይ ርአ",
            cropManagement: "ምሕደራ ኣህምልቲ",
            loadingCrops: "ሓበሬታ ኣህምልቲ ይጽዓን ኣሎ...",
            noCrops: "ሓበሬታ ኣህምልቲ ኣይተረኽበን",
            noCropsDescription: "ሓበሬታ ኣህምልቲ ኣብዚ ክረአ እዩ።",
            openCropSettings: "ቅንብራት ኣህምልቲ ክፈት",

            errorSupabaseConfig: "ኣብ farm-records.js ውሽጢ Supabase URLን anon keyን ኣእቱ።",
            errorLogin: "መዝገባት ንምርኣይ ክትኣቱ ኣለካ።",
            errorFetch: "መዝገባት ካብ Supabase ምርካብ ኣይተኻእለን።",
            refreshSuccess: "መዝገባት ሕርሻ ተሓዲሶም።",
            cropTableError: "ሓበሬታ ኣህምልቲ ኣይተጻዕነን። ስም ሰንጠረዥን ፍቓድ መእተውን ኣረጋግጽ።",
            cropTableMissing: "ዝተመርጸ ሰንጠረዥ ኣህምልቲ ኣይተረኽበን።",

            allFields: "ኩሎም ዝተቐመጡ መስኮታት",
            noMatchingRecords: "ምስ ድለትካ ዝሰማማዕ መዝገብ የለን።",
            unknownCategory: "ካልእ መዝገብ",
            locationNotFound: "ቦታ ኣይተገልጸን",
            dateNotAvailable: "ዕለት ኣይተረኽበን"
        },

        om: {
            platform: "Waltajjii Qonnaa",
            farmerDashboard: "Daashboordii Qonnaan Bultootaa",
            dashboardHome: "Fuula Guddaa",
            myFarm: "Qonna Koo",
            myCrops: "Midhaan Koo",
            dailyFarm: "Qonna Guyyaa Guyyaa",
            farmTasks: "Hojii Qonnaa fi Kaalaandarii",
            farmRecords: "Galmee Qonnaa",
            farmCalculator: "Herregduu Qonnaa",
            farmFinance: "Faayinaansii Qonnaa",
            aiAssistant: "Gargaaraa Qonnaa AI",
            farmAnalysis: "Xiinxala Qonnaa fi ID",
            community: "Hawaasa Qonnaan Bultootaa",
            marketplace: "Gabaa",
            resources: "Qabeenya AgriNova",
            articles: "Barreeffamoota Qonnaa",
            cropInformation: "Odeeffannoo Midhaanii",
            cropMap: "Kaartaa Midhaan Itoophiyaa",
            weather: "Haala Qilleensaa",
            pestLibrary: "Odeeffannoo Ilbiisotaa fi Dhukkubootaa",
            fertilizer: "Odeeffannoo Xaa'oo",
            agricultureNews: "Oduu Qonnaa",
            cropNews: "Oduu Midhaanii",
            innovation: "Kalaqa Qonnaa",
            education: "Qabiyyee Barnootaa",
            simulation: "Simuleeshinii Qonnaa",

            searchPlaceholder: "Galmeewwan qonnaa hunda barbaadi...",
            notifications: "Beeksisawwan",
            noNotifications: "Beeksisni haaraan hin jiru.",
            connecting: "Supabase waliin wal qunnamaa jira...",
            connected: "Supabase waliin wal qabateera",
            disconnected: "Wal hin qabanne",

            farmManagement: "BULCHIINSA QONNAA",
            pageTitle: "Galmee Qonnaa",
            pageDescription: "Odeeffannoo qonna kee keessatti kuufame ilaali.",

            totalRecords: "Galmee Waliigalaa",
            recordCategories: "Ramaddii Galmee",
            latestUpdate: "Fooyya'iinsa Dhumaa",

            historyTitle: "Seenaa Qonnaa",
            historyDescription: "Odeeffannoo qonna kee Supabase irraa argame.",
            refresh: "Haaromsi",

            filterByCategory: "Ramaddii irratti calali",
            allCategories: "Ramaddii Hunda",
            farmProfile: "Ibsa Qonnaa",
            landSection: "Kutaa Lafaa",
            water: "Bishaan",
            farmLocation: "Iddoo Qonnaa",
            assets: "Qabeenya",
            infrastructure: "Bu'uuraalee Misoomaa",
            seasonalPlan: "Karoora Yeroo",

            loadingRecords: "Galmeewwan qonnaa kee fe'amaa jiru...",
            errorTitle: "Galmeewwan fe'uun hin danda'amne",
            tryAgain: "Irra Deebi'i",
            emptyTitle: "Galmeen qonnaa hin argamne",
            emptyDescription: "Odeeffannoon qonna kee asitti ni mul'ata.",
            recordInformation: "ODEEFFANNOO GALMEE",
            viewDetails: "Dirreewwan Hunda Ilaali",
            what: "Maal",
            when: "Yoom",
            where: "Eessa",
            recordId: "ID Galmee",
            createdAt: "Yeroo Uumame",
            updatedAt: "Yeroo Fooyya'e",
            recordType: "Gosa Galmee",
            payload: "Odeeffannoo Kuufame",
            noValue: "Hin ibsamne",
            fieldsFound: "dirreewwan",
            records: "galmeewwan",

            myCropsTitle: "Midhaan Koo",
            myCropsDescription: "Odeeffannoo midhaanii fi qindaa'ina isaa ilaali.",
            viewMyCrops: "Midhaan Koo Ilaali",
            cropManagement: "BULCHIINSA MIDHAANII",
            loadingCrops: "Odeeffannoon midhaanii fe'amaa jira...",
            noCrops: "Odeeffannoon midhaanii hin jiru",
            noCropsDescription: "Odeeffannoon midhaanii yeroo jiraatu asitti mul'ata.",
            openCropSettings: "Qindaa'ina Midhaanii Bani",

            errorSupabaseConfig: "farm-records.js keessatti Supabase URL fi anon key galchi.",
            errorLogin: "Galmee qonnaa ilaaluuf seenuu qabda.",
            errorFetch: "Galmeewwan Supabase irraa argachuun hin danda'amne.",
            refreshSuccess: "Galmeewwan qonnaa haaromfamaniiru.",
            cropTableError: "Odeeffannoon midhaanii hin fe'amne. Maqaa gabatee fi hayyama isaa mirkaneessi.",
            cropTableMissing: "Gabateen midhaanii filatame hin argamne ykn hin banamne.",

            allFields: "Dirreewwan Kuufaman Hunda",
            noMatchingRecords: "Galmeen barbaacha kee waliin walsimu hin jiru.",
            unknownCategory: "Galmee Biraa",
            locationNotFound: "Iddoon hin ibsamne",
            dateNotAvailable: "Guyyaan hin argamne"
        },

        so: {
            platform: "Madasha Beeraha",
            farmerDashboard: "Bogga Beeralayda",
            dashboardHome: "Bogga Hore",
            myFarm: "Beertayda",
            myCrops: "Dalagyadayda",
            dailyFarm: "Beeraha Maalinlaha ah",
            farmTasks: "Hawlaha Beeraha iyo Jadwalka",
            farmRecords: "Diiwaanka Beeraha",
            farmCalculator: "Xisaabiyaha Beeraha",
            farmFinance: "Maaliyadda Beeraha",
            aiAssistant: "Kaaliyaha Beeraha AI",
            farmAnalysis: "Falanqaynta Beeraha iyo Aqoonsiga",
            community: "Bulshada Beeralayda",
            marketplace: "Suuqa",
            resources: "Khayraadka AgriNova",
            articles: "Maqaallada Beeraha",
            cropInformation: "Macluumaadka Dalagyada",
            cropMap: "Khariidadda Dalagyada Itoobiya",
            weather: "Cimilada",
            pestLibrary: "Macluumaadka Cayayaanka iyo Cudurrada",
            fertilizer: "Macluumaadka Bacriminta",
            agricultureNews: "Wararka Beeraha",
            cropNews: "Wararka Dalagyada",
            innovation: "Hal-abuurka Beeraha",
            education: "Waxbarasho",
            simulation: "Jilitaanka Beeraha",

            searchPlaceholder: "Raadi dhammaan diiwaannada beeraha...",
            notifications: "Ogeysiisyada",
            noNotifications: "Ma jiraan ogeysiisyo cusub.",
            connecting: "Waxaa lagu xirmayaa Supabase...",
            connected: "Waxaa lagu xirmay Supabase",
            disconnected: "Lama xiriirin",

            farmManagement: "MAAMULKA BEERAHA",
            pageTitle: "Diiwaanka Beeraha",
            pageDescription: "Eeg macluumaadka ku kaydsan beertaada.",

            totalRecords: "Wadarta Diiwaannada",
            recordCategories: "Qaybaha Diiwaanka",
            latestUpdate: "Cusboonaysiintii Ugu Dambaysay",

            historyTitle: "Taariikhda Beeraha",
            historyDescription: "Macluumaadka beertaada ee laga helay Supabase.",
            refresh: "Cusboonaysii",

            filterByCategory: "Ku kala saar qayb",
            allCategories: "Dhammaan Qaybaha",
            farmProfile: "Faahfaahinta Beerta",
            landSection: "Qaybaha Dhulka",
            water: "Biyaha",
            farmLocation: "Goobta Beerta",
            assets: "Hantida",
            infrastructure: "Kaabayaasha",
            seasonalPlan: "Qorshayaasha Xilliyada",

            loadingRecords: "Waxaa la soo rarayaa diiwaannada beertaada...",
            errorTitle: "Lama soo rari karin diiwaannada",
            tryAgain: "Mar Kale Isku Day",
            emptyTitle: "Wax diiwaan beer ah lama helin",
            emptyDescription: "Macluumaadka beertaada ee la kaydiyey halkan ayuu ka muuqan doonaa.",
            recordInformation: "MACLUUMAADKA DIIWAANKA",
            viewDetails: "Eeg Dhammaan Meelaha",
            what: "Maxaa",
            when: "Goorma",
            where: "Xaggee",
            recordId: "Aqoonsiga Diiwaanka",
            createdAt: "Waqtigii La Abuuray",
            updatedAt: "Waqtigii La Cusboonaysiiyey",
            recordType: "Nooca Diiwaanka",
            payload: "Macluumaadka La Kaydiyey",
            noValue: "Lama sheegin",
            fieldsFound: "meelo",
            records: "diiwaanno",

            myCropsTitle: "Dalagyadayda",
            myCropsDescription: "Eeg macluumaadka dalagyadaada iyo dejimaha.",
            viewMyCrops: "Eeg Dalagyadayda",
            cropManagement: "MAAMULKA DALAGYADA",
            loadingCrops: "Waxaa la soo rarayaa macluumaadka dalagyada...",
            noCrops: "Macluumaad dalag lama hayo",
            noCropsDescription: "Macluumaadka dalagyada halkan ayuu ka muuqan doonaa marka la helo.",
            openCropSettings: "Fur Dejimaha Dalagyada",

            errorSupabaseConfig: "Geli Supabase URL iyo anon key gudaha farm-records.js.",
            errorLogin: "Waa inaad gashaa si aad u aragto diiwaannada beertaada.",
            errorFetch: "Lama soo heli karin diiwaannada Supabase.",
            refreshSuccess: "Diiwaannada beeraha waa la cusboonaysiiyey.",
            cropTableError: "Lama soo rari karin macluumaadka dalagyada. Hubi magaca jadwalka iyo oggolaanshaha.",
            cropTableMissing: "Jadwalka dalagyada lama helin ama lama geli karo.",

            allFields: "Dhammaan Meelaha La Kaydiyey",
            noMatchingRecords: "Ma jiro diiwaan ku habboon raadintaada.",
            unknownCategory: "Diiwaan Kale",
            locationNotFound: "Goob lama sheegin",
            dateNotAvailable: "Taariikh lama helin"
        }
    };


    /* =====================================================
       4. ELEMENT REFERENCES
       ===================================================== */

    const $ = id => document.getElementById(id);

    const elements = {
        languageButton: $("languageButton"),
        languageMenu: $("languageMenu"),
        currentLanguageLabel: $("currentLanguageLabel"),

        search: $("recordSearch"),
        filter: $("recordTypeFilter"),

        timeline: $("recordsTimeline"),
        loading: $("loadingState"),
        empty: $("emptyState"),
        error: $("errorState"),
        errorMessage: $("errorMessage"),

        totalRecords: $("totalRecords"),
        totalCategories: $("totalCategories"),
        latestUpdate: $("latestUpdate"),
        resultsCount: $("resultsCount"),

        connectionStatus: $("connectionStatus"),
        connectionStatusText: $("connectionStatusText"),

        recordModal: $("recordModal"),
        recordModalTitle: $("recordModalTitle"),
        recordModalBody: $("recordModalBody"),

        cropsModal: $("cropsModal"),
        cropsLoading: $("cropsLoading"),
        cropsError: $("cropsError"),
        cropsErrorMessage: $("cropsErrorMessage"),
        cropsEmpty: $("cropsEmpty"),
        cropsList: $("cropsList"),

        notificationButton: $("notificationButton"),
        notificationPanel: $("notificationPanel"),

        toast: $("toast")
    };


    /* =====================================================
       5. APPLICATION STATE
       ===================================================== */

    let currentLanguage = "en";
    let allRecords = [];
    let filteredRecords = [];
    let allCrops = [];


    /* =====================================================
       6. TRANSLATION HELPERS
       ===================================================== */

    function t(key) {
        return (
            translations[currentLanguage]?.[key] ||
            translations.en[key] ||
            key
        );
    }

    function applyTranslations() {

        document.documentElement.lang = currentLanguage;

        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = t(key);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            element.placeholder = t(key);
        });

        const languageNames = {
            en: "English",
            am: "አማርኛ",
            ti: "ትግርኛ",
            om: "Afaan Oromo",
            so: "Af Soomaali"
        };

        elements.currentLanguageLabel.textContent =
            languageNames[currentLanguage];

        updateConnectionStatus(
            supabaseClient && currentUser ? "connected" :
            supabaseClient ? "disconnected" : "disconnected"
        );

        renderRecords();
        updateSummary();
    }

    function setLanguage(language) {

        if (!translations[language]) return;

        currentLanguage = language;

        elements.languageMenu.classList.remove("show");

        applyTranslations();

        if (allCrops.length) {
            renderCrops();
        }
    }


    /* =====================================================
       7. SAFE DISPLAY HELPERS
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function prettyLabel(key) {

        const labels = {
            id: t("recordId"),
            farmer_id: "Farmer ID",
            record_type: t("recordType"),
            created_at: t("createdAt"),
            updated_at: t("updatedAt"),
            payload: t("payload")
        };

        if (labels[key]) return labels[key];

        return String(key)
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    function displayValue(value) {

        if (value === null || value === undefined || value === "") {
            return t("noValue");
        }

        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        if (Array.isArray(value)) {
            if (!value.length) return "[]";

            return value.map(item => {
                if (item && typeof item === "object") {
                    return JSON.stringify(item, null, 2);
                }

                return String(item);
            }).join("\n");
        }

        if (typeof value === "object") {
            return JSON.stringify(value, null, 2);
        }

        return String(value);
    }

    function formatDate(value) {

        if (!value) return t("dateNotAvailable");

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return new Intl.DateTimeFormat(
            currentLanguage === "en" ? "en-GB" : currentLanguage,
            {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(date);
    }

    function getCategoryLabel(recordType) {

        const categoryKeys = {
            farm_profile: "farmProfile",
            land_section: "landSection",
            water: "water",
            farm_location: "farmLocation",
            asset: "assets",
            infrastructure: "infrastructure",
            seasonal_plan: "seasonalPlan"
        };

        return categoryKeys[recordType]
            ? t(categoryKeys[recordType])
            : t("unknownCategory");
    }


    /* =====================================================
       8. READ ALL DATA INSIDE JSONB PAYLOAD
       ===================================================== */

    function flattenObject(value, prefix = "", output = []) {

        if (value === null || value === undefined) {
            output.push({
                key: prefix || "value",
                value: value
            });

            return output;
        }

        if (Array.isArray(value)) {

            if (!value.length) {
                output.push({
                    key: prefix || "value",
                    value: []
                });

                return output;
            }

            value.forEach((item, index) => {

                const newKey = prefix
                    ? `${prefix}[${index}]`
                    : `[${index}]`;

                if (item && typeof item === "object") {
                    flattenObject(item, newKey, output);
                } else {
                    output.push({
                        key: newKey,
                        value: item
                    });
                }
            });

            return output;
        }

        if (typeof value === "object") {

            const keys = Object.keys(value);

            if (!keys.length) {
                output.push({
                    key: prefix || "value",
                    value: {}
                });

                return output;
            }

            keys.forEach(key => {

                const newKey = prefix
                    ? `${prefix}.${key}`
                    : key;

                const child = value[key];

                if (child && typeof child === "object") {
                    flattenObject(child, newKey, output);
                } else {
                    output.push({
                        key: newKey,
                        value: child
                    });
                }
            });

            return output;
        }

        output.push({
            key: prefix || "value",
            value: value
        });

        return output;
    }


    /* =====================================================
       9. DETERMINE WHAT / WHEN / WHERE
       ===================================================== */

    function getRecordWhat(record) {

        const payload = record.payload || {};

        const preferredKeys = [
            "name",
            "farm_name",
            "section_name",
            "land_name",
            "asset_name",
            "infrastructure_name",
            "plan_name",
            "title",
            "description",
            "crop_name",
            "type"
        ];

        for (const key of preferredKeys) {
            if (payload[key] !== undefined && payload[key] !== null &&
                payload[key] !== "") {
                return displayValue(payload[key]);
            }
        }

        return getCategoryLabel(record.record_type);
    }

    function getRecordWhen(record) {

        return formatDate(
            record.updated_at ||
            record.created_at
        );
    }

    function getRecordWhere(record) {

        const payload = record.payload || {};

        const preferredKeys = [
            "location",
            "farm_location",
            "region",
            "zone",
            "woreda",
            "kebele",
            "city",
            "address",
            "place",
            "site"
        ];

        for (const key of preferredKeys) {

            if (payload[key] !== undefined &&
                payload[key] !== null &&
                payload[key] !== "") {

                return displayValue(payload[key]);
            }
        }

        // Check nested JSONB values for likely location fields.
        const flattened = flattenObject(payload);

        const locationField = flattened.find(field => {
            const key = field.key.toLowerCase();

            return (
                key.includes("location") ||
                key.includes("address") ||
                key.includes("region") ||
                key.includes("woreda") ||
                key.includes("kebele")
            ) && field.value !== null &&
                field.value !== undefined &&
                field.value !== "";
        });

        return locationField
            ? displayValue(locationField.value)
            : t("locationNotFound");
    }


    /* =====================================================
       10. CONNECTION STATUS
       ===================================================== */

    function updateConnectionStatus(status) {

        elements.connectionStatus.classList.remove(
            "connected",
            "disconnected"
        );

        if (status === "connected") {
            elements.connectionStatus.classList.add("connected");
            elements.connectionStatusText.textContent = t("connected");
        } else {
            elements.connectionStatus.classList.add("disconnected");
            elements.connectionStatusText.textContent = t("disconnected");
        }
    }


    /* =====================================================
       11. SUPABASE AUTHENTICATION
       ===================================================== */

    async function checkCurrentUser() {

        if (!supabaseClient) {
            throw new Error(t("errorSupabaseConfig"));
        }

        const { data, error } = await supabaseClient.auth.getUser();

        if (error) throw error;

        if (!data || !data.user) {
            throw new Error(t("errorLogin"));
        }

        currentUser = data.user;

        updateConnectionStatus("connected");

        return currentUser;
    }


    /* =====================================================
       12. FETCH FARM RECORDS
       ===================================================== */

    async function fetchFarmRecords() {

        showLoading();

        try {

            if (!supabaseClient) {
                throw new Error(t("errorSupabaseConfig"));
            }

            if (!currentUser) {
                await checkCurrentUser();
            }

            /*
             * IMPORTANT:
             * Reads every column from the EXISTING farm_records table.
             * The payload JSONB is also retrieved without selecting
             * individual field names.
             */

            const { data, error } = await supabaseClient
                .from(CONFIG.FARM_RECORDS_TABLE)
                .select("*")
                .eq("farmer_id", currentUser.id)
                .order("updated_at", { ascending: false });

            if (error) throw error;

            allRecords = Array.isArray(data) ? data : [];

            updateConnectionStatus("connected");

            updateSummary();
            renderRecords();

            elements.loading.classList.add("hidden");
            elements.error.classList.add("hidden");

            if (!allRecords.length) {
                elements.empty.classList.remove("hidden");
            } else {
                elements.empty.classList.add("hidden");
            }

        } catch (error) {

            console.error("Farm Records loading error:", error);

            updateConnectionStatus("disconnected");

            elements.loading.classList.add("hidden");
            elements.timeline.innerHTML = "";
            elements.empty.classList.add("hidden");
            elements.error.classList.remove("hidden");

            elements.errorMessage.textContent =
                error.message || t("errorFetch");
        }
    }


    /* =====================================================
       13. LOADING AND SUMMARY
       ===================================================== */

    function showLoading() {

        elements.loading.classList.remove("hidden");
        elements.error.classList.add("hidden");
        elements.empty.classList.add("hidden");
        elements.timeline.innerHTML = "";
    }

    function updateSummary() {

        elements.totalRecords.textContent = allRecords.length;

        const categories = new Set(
            allRecords.map(record => record.record_type)
                .filter(Boolean)
        );

        elements.totalCategories.textContent = categories.size;

        const latestRecord = allRecords
            .map(record => record.updated_at || record.created_at)
            .filter(Boolean)
            .sort((a, b) => new Date(b) - new Date(a))[0];

        elements.latestUpdate.textContent = latestRecord
            ? new Intl.DateTimeFormat(
                currentLanguage === "en" ? "en-GB" : currentLanguage,
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            ).format(new Date(latestRecord))
            : "—";
    }


    /* =====================================================
       14. SEARCH AND FILTER
       ===================================================== */

    function recordMatchesSearch(record, query) {

        if (!query) return true;

        const searchableText = JSON.stringify(record).toLowerCase();

        return searchableText.includes(query.toLowerCase());
    }

    function applyFilters() {

        const query = elements.search.value.trim();
        const category = elements.filter.value;

        filteredRecords = allRecords.filter(record => {

            const matchesCategory =
                category === "all" ||
                record.record_type === category;

            const matchesSearch =
                recordMatchesSearch(record, query);

            return matchesCategory && matchesSearch;
        });

        renderRecords();
    }


    /* =====================================================
       15. RENDER RECORD TIMELINE
       ===================================================== */

    function renderRecords() {

        if (!elements.timeline) return;

        const query = elements.search.value.trim();
        const category = elements.filter.value;

        const recordsToRender = allRecords.filter(record => {

            const matchesCategory =
                category === "all" ||
                record.record_type === category;

            const matchesSearch =
                recordMatchesSearch(record, query);

            return matchesCategory && matchesSearch;
        });

        filteredRecords = recordsToRender;

        elements.timeline.innerHTML = "";

        elements.resultsCount.textContent =
            `${recordsToRender.length} ${t("records")}`;

        elements.empty.classList.add("hidden");

        if (!recordsToRender.length) {

            if (allRecords.length) {
                elements.empty.classList.remove("hidden");

                const heading = elements.empty.querySelector("h3");
                const description = elements.empty.querySelector("p");

                if (heading) {
                    heading.textContent = t("noMatchingRecords");
                }

                if (description) {
                    description.textContent = "";
                }

            } else {
                elements.empty.classList.remove("hidden");
            }

            return;
        }

        recordsToRender.forEach(record => {

            const item = document.createElement("article");
            item.className = "timeline-item";

            const payloadFields = flattenObject(record.payload || {});

            const card = document.createElement("div");
            card.className = "record-card";

            const title = getRecordWhat(record);
            const when = getRecordWhen(record);
            const where = getRecordWhere(record);

            card.innerHTML = `
                <div class="record-card-top">
                    <div>
                        <h3>${escapeHTML(title)}</h3>
                        <span class="record-category">
                            ${escapeHTML(getCategoryLabel(record.record_type))}
                        </span>
                    </div>

                    <span class="record-id">
                        ${escapeHTML(String(record.id || ""))}
                    </span>
                </div>

                <div class="record-meta-grid">

                    <div class="record-meta">
                        <label>${escapeHTML(t("what"))}</label>
                        <span>${escapeHTML(title)}</span>
                    </div>

                    <div class="record-meta">
                        <label>${escapeHTML(t("when"))}</label>
                        <span>${escapeHTML(when)}</span>
                    </div>

                    <div class="record-meta">
                        <label>${escapeHTML(t("where"))}</label>
                        <span>${escapeHTML(where)}</span>
                    </div>

                </div>

                <div class="record-card-footer">

                    <span class="field-count">
                        ${payloadFields.length} ${escapeHTML(t("fieldsFound"))}
                    </span>

                    <button class="view-record-button" type="button">
                        ${escapeHTML(t("viewDetails"))}
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>
            `;

            const button = card.querySelector(".view-record-button");

            button.addEventListener("click", () => {
                openRecordDetails(record);
            });

            item.appendChild(document.createElement("span"));
            item.querySelector("span").className = "timeline-marker";

            item.appendChild(card);

            elements.timeline.appendChild(item);
        });
    }


    /* =====================================================
       16. DISPLAY EVERY FIELD IN A RECORD
       ===================================================== */

    function renderFieldRows(object, prefix = "") {

        const fields = flattenObject(object, prefix);

        if (!fields.length) {
            return `<p>${escapeHTML(t("noValue"))}</p>`;
        }

        return fields.map(field => `
            <div class="record-field">
                <strong>${escapeHTML(prettyLabel(field.key))}</strong>
                <span>${escapeHTML(displayValue(field.value))}</span>
            </div>
        `).join("");
    }

    function openRecordDetails(record) {

        const category = getCategoryLabel(record.record_type);

        elements.recordModalTitle.textContent = category;

        const generalFields = {
            id: record.id,
            farmer_id: record.farmer_id,
            record_type: record.record_type,
            created_at: record.created_at,
            updated_at: record.updated_at
        };

        const payload = record.payload || {};

        elements.recordModalBody.innerHTML = `

            <div class="record-field-group">
                <h3>${escapeHTML(t("recordInformation"))}</h3>

                ${renderFieldRows(generalFields)}
            </div>

            <div class="record-field-group">
                <h3>${escapeHTML(t("allFields"))}</h3>

                ${renderFieldRows(payload)}
            </div>

        `;

        elements.recordModal.classList.remove("hidden");
    }


    /* =====================================================
       17. MY CROPS POPUP
       ===================================================== */

    async function openCropsModal() {

        elements.cropsModal.classList.remove("hidden");

        elements.cropsLoading.classList.remove("hidden");
        elements.cropsError.classList.add("hidden");
        elements.cropsEmpty.classList.add("hidden");
        elements.cropsList.innerHTML = "";

        try {

            if (!supabaseClient) {
                throw new Error(t("errorSupabaseConfig"));
            }

            if (!currentUser) {
                await checkCurrentUser();
            }

            /*
             * This is an optional read from your existing crops table.
             * It does not create a table or assume particular columns.
             * select("*") retrieves every accessible field.
             */

            const { data, error } = await supabaseClient
                .from(CONFIG.CROPS_TABLE)
                .select("*");

            if (error) throw error;

            /*
             * Filter by farmer_id only if the returned rows have
             * that column. Otherwise, the table's RLS policy must
             * restrict the results to the signed-in farmer.
             */

            allCrops = Array.isArray(data)
                ? data.filter(crop => {
                    return !Object.prototype.hasOwnProperty.call(
                        crop,
                        "farmer_id"
                    ) || crop.farmer_id === currentUser.id;
                })
                : [];

            elements.cropsLoading.classList.add("hidden");

            if (!allCrops.length) {
                elements.cropsEmpty.classList.remove("hidden");
            } else {
                renderCrops();
            }

        } catch (error) {

            console.error("My Crops loading error:", error);

            elements.cropsLoading.classList.add("hidden");
            elements.cropsError.classList.remove("hidden");

            elements.cropsErrorMessage.textContent =
                error.message || t("cropTableError");
        }
    }


    /* =====================================================
       18. RENDER CROP INFORMATION DYNAMICALLY
       ===================================================== */

    function renderCrops() {

        elements.cropsList.innerHTML = "";

        if (!allCrops.length) {
            elements.cropsEmpty.classList.remove("hidden");
            return;
        }

        elements.cropsEmpty.classList.add("hidden");

        allCrops.forEach((crop, index) => {

            const cropCard = document.createElement("article");
            cropCard.className = "crop-card";

            const flattened = flattenObject(crop);

            const titleCandidates = [
                "crop_name",
                "name",
                "crop",
                "title",
                "variety"
            ];

            let cropTitle = `Crop ${index + 1}`;

            for (const key of titleCandidates) {

                if (
                    crop[key] !== undefined &&
                    crop[key] !== null &&
                    crop[key] !== ""
                ) {
                    cropTitle = displayValue(crop[key]);
                    break;
                }
            }

            const fieldsHTML = flattened.map(field => `
                <div class="crop-field">
                    <strong>${escapeHTML(prettyLabel(field.key))}</strong>
                    <span>${escapeHTML(displayValue(field.value))}</span>
                </div>
            `).join("");

            cropCard.innerHTML = `
                <h3>${escapeHTML(cropTitle)}</h3>

                <div class="crop-fields">
                    ${fieldsHTML}
                </div>

                <a href="${escapeHTML(CONFIG.CROPS_SETTINGS_PAGE)}"
                   class="crop-settings-link">
                    ${escapeHTML(t("openCropSettings"))}
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            `;

            elements.cropsList.appendChild(cropCard);
        });
    }


    /* =====================================================
       19. MODAL CONTROLS
       ===================================================== */

    function closeModal(modalId) {

        const modal = $(modalId);

        if (modal) {
            modal.classList.add("hidden");
        }
    }

    document.querySelectorAll("[data-close-modal]").forEach(button => {

        button.addEventListener("click", () => {
            closeModal(button.dataset.closeModal);
        });
    });

    [elements.recordModal, elements.cropsModal].forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                modal.classList.add("hidden");
            }
        });
    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal("recordModal");
            closeModal("cropsModal");
        }
    });


    /* =====================================================
       20. TOAST MESSAGE
       ===================================================== */

    let toastTimeout = null;

    function showToast(message) {

        elements.toast.textContent = message;
        elements.toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            elements.toast.classList.remove("show");
        }, 3000);
    }


    /* =====================================================
       21. HEADER INTERACTIONS
       ===================================================== */

    elements.languageButton.addEventListener("click", event => {

        event.stopPropagation();

        elements.languageMenu.classList.toggle("show");
    });

    elements.languageMenu.querySelectorAll("[data-language]").forEach(button => {

        button.addEventListener("click", () => {
            setLanguage(button.dataset.language);
        });
    });

    elements.notificationButton.addEventListener("click", event => {

        event.stopPropagation();

        elements.notificationPanel.classList.toggle("show");
    });

    document.addEventListener("click", event => {

        if (!event.target.closest(".language-wrapper")) {
            elements.languageMenu.classList.remove("show");
        }

        if (!event.target.closest(".notification-wrapper")) {
            elements.notificationPanel.classList.remove("show");
        }
    });


    /* =====================================================
       22. SEARCH AND FILTER EVENTS
       ===================================================== */

    elements.search.addEventListener("input", applyFilters);

    elements.filter.addEventListener("change", applyFilters);


    /* =====================================================
       23. BUTTON EVENTS
       ===================================================== */

    $("refreshButton").addEventListener("click", async () => {

        await fetchFarmRecords();

        if (!elements.error.classList.contains("hidden")) {
            return;
        }

        showToast(t("refreshSuccess"));
    });

    $("retryButton").addEventListener("click", fetchFarmRecords);

    $("openCropsButton").addEventListener("click", openCropsModal);


    /* =====================================================
       24. MOBILE SIDEBAR
       ===================================================== */

    $("mobileMenuButton").addEventListener("click", () => {

        $("sidebar").classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {
            if (window.innerWidth <= 850) {
                $("sidebar").classList.remove("open");
            }
        });
    });


    /* =====================================================
       25. INITIALIZE APPLICATION
       ===================================================== */

    async function initializeFarmRecords() {

        applyTranslations();

        if (!supabaseClient) {

            updateConnectionStatus("disconnected");

            elements.loading.classList.add("hidden");
            elements.error.classList.remove("hidden");
            elements.errorMessage.textContent =
                t("errorSupabaseConfig");

            return;
        }

        await fetchFarmRecords();
    }

    initializeFarmRecords();


})();