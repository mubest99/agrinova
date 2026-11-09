/* =============================================================
   AGRINOVA — Visitor Articles Page
   Single JS file: translations (5 languages) + all logic
   ============================================================= */

/* ============================================================
   1. UI TRANSLATIONS (nav, hero, filters, labels, footer)
   ============================================================ */
const UI = {
  en: {
    brandTagline: "Growing Smarter. Farming Better.",
    navHome: "Home", navExplore: "Explore", navArticles: "Articles",
    navSolutions: "Agricultural Solutions", navAbout: "About",
    heroHeading: "Knowledge That Helps Agriculture Grow",
    heroDesc: "Discover practical agricultural knowledge, scientific research, farming techniques, innovations, and expert insights to support a more productive and sustainable agricultural future.",
    searchPlaceholder: "Search agricultural articles...",
    articleCountLabel: "articles available",
    featuredLabel: "Featured Article",
    readArticle: "Read Article",
    articlesHeading: "Agricultural Articles",
    articlesSubheading: "Explore expert knowledge across every field of agriculture.",
    sortBy: "Sort by", sortLatest: "Latest", sortOldest: "Oldest", sortRelevant: "Most Relevant",
    readingTime: "Reading time", rtAll: "All", rtUnder5: "Under 5 minutes", rt5to10: "5–10 minutes", rtAbove10: "Above 10 minutes",
    readMore: "Read More",
    noResultsTitle: "No articles found",
    noResultsDesc: "Try adjusting your search or filters.",
    resultsFound: "articles found",
    backToArticles: "Back to Articles",
    relatedArticles: "Related Articles",
    minRead: "min read",
    by: "By",
    footerDesc: "A modern agricultural knowledge platform sharing practical, scientific, and sustainable farming insights for farmers, students, and researchers.",
    footerQuickLinks: "Quick Links", footerSupport: "Support",
    footerContact: "Contact", footerPrivacy: "Privacy Policy",
    footerSloganTitle: "Our Slogan", footerSlogan: "Agricultural Technology for All.",
    footerCopyright: "© 2025 AgriNova. All rights reserved.",
    catAll: "All Articles", catCrop: "Crop Production", catSoil: "Soil Management",
    catIrrigation: "Irrigation and Water", catPest: "Pest and Disease Management",
    catTech: "Agricultural Technology", catClimate: "Climate-Smart Agriculture",
    catLivestock: "Livestock and Farming", catSustainable: "Sustainable Agriculture",
    catResearch: "Agricultural Research"
  },
  am: {
    brandTagline: "በጥበብ ማምረት። በተሻለ ማርሻ።",
    navHome: "መነሻ", navExplore: "ያስሱ", navArticles: "ጽሑፎች",
    navSolutions: "የግብርና መፍትሄዎች", navAbout: "ስለ እኛ",
    heroHeading: "ግብርና እንዲያድግ የሚረዳ ዕውቀት",
    heroDesc: "ተግባራዊ የግብርና ዕውቀት፣ ሳይንሳዊ ምርምር፣ የእርሻ ቴክኒኮች፣ ፈጠራዎች እና የባለሙያዎች ግንዛቤዎችን ያግኙ።",
    searchPlaceholder: "የግብርና ጽሑፎችን ይፈልጉ...",
    articleCountLabel: "ጽሑፎች ይገኛሉ",
    featuredLabel: "የተመረጠ ጽሑፍ",
    readArticle: "ጽሑፉን ያንብቡ",
    articlesHeading: "የግብርና ጽሑፎች",
    articlesSubheading: "በእያንዳንዱ የግብርና ዘርፍ የባለሙያ ዕውቀትን ያስሱ።",
    sortBy: "ደረጃ አሰጣጥ", sortLatest: "አዲስ", sortOldest: "ቀዳሚ", sortRelevant: "በጣም ተገቢ",
    readingTime: "የንባብ ጊዜ", rtAll: "ሁሉም", rtUnder5: "ከ5 ደቂቃ በታች", rt5to10: "5–10 ደቂቃ", rtAbove10: "ከ10 ደቂቃ በላይ",
    readMore: "ተጨማሪ ያንብቡ",
    noResultsTitle: "ጽሑፎች አልተገኙም",
    noResultsDesc: "ፍለጋዎን ወይም ማጣሪያዎን ያስተካክሉ።",
    resultsFound: "ጽሑፎች ተገኝተዋል",
    backToArticles: "ወደ ጽሑፎች ተመለስ",
    relatedArticles: "ተዛማጅ ጽሑፎች",
    minRead: "ደቂቃ ንባብ",
    by: "በ",
    footerDesc: "ዘመናዊ የግብርና ዕውቀት መድረክ — ለገበሬዎች፣ ለተማሪዎች እና ለተመራማሪዎች ተግባራዊ እና ዘላቂ የግብርና ግንዛቤ።",
    footerQuickLinks: "ፈጣን አገናኞች", footerSupport: "ድጋፍ",
    footerContact: "አግኙን", footerPrivacy: "የግላዊነት ፖሊሲ",
    footerSloganTitle: "መሪ ቃላችን", footerSlogan: "የግብርና ቴክኖሎጂ ለሁሉም።",
    footerCopyright: "© 2025 AgriNova. መብቱ በሕግ የተጠበቀ ነው።",
    catAll: "ሁሉም ጽሑፎች", catCrop: "የሰብል ምርት", catSoil: "የአፈር አስተዳደር",
    catIrrigation: "መስኖና ውሃ", catPest: "ተባይና በሽታ ቁጥጥር",
    catTech: "የግብርና ቴክኖሎጂ", catClimate: "የአየር ንብረት ብልህ ግብርና",
    catLivestock: "እንስሳትና እርሻ", catSustainable: "ዘላቂ ግብርና",
    catResearch: "የግብርና ምርምር"
  },
  om: {
    brandTagline: "Beekumsaan Oomishuu. Caalaatti Qonnaan Bulaa.",
    navHome: "Mana", navExplore: "Sakatta'i", navArticles: "Barruulee",
    navSolutions: "Furmaata Qonnaa", navAbout: "Waa'ee Keenya",
    heroHeading: "Beekumsi Qonnaan Akka Guddatu Gargaaru",
    heroDesc: "Beekumsa qonnaa hojii irra ooluu danda'u, qorannoo saayinsii, mala qonnaa, kalaqaa fi hubannoo ogeessotaa argadhaa.",
    searchPlaceholder: "Barruulee qonnaa barbaadi...",
    articleCountLabel: "barruulee argamu",
    featuredLabel: "Barruu Filatamaa",
    readArticle: "Barruu Dubbisi",
    articlesHeading: "Barruulee Qonnaa",
    articlesSubheading: "Beekumsa ogeessotaa damee qonnaa hunda keessatti sakatta'i.",
    sortBy: "Tartiiba", sortLatest: "Haaraa", sortOldest: "Moofaa", sortRelevant: "Baay'ee Mijataa",
    readingTime: "Yeroo dubbisuu", rtAll: "Hunda", rtUnder5: "Daqiiqaa 5 gadi", rt5to10: "Daqiiqaa 5–10", rtAbove10: "Daqiiqaa 10 ol",
    readMore: "Dabalataan Dubbisi",
    noResultsTitle: "Barruulee hin argamne",
    noResultsDesc: "Barbaacha ykn filtarii kee sirreessi.",
    resultsFound: "barruulee argaman",
    backToArticles: "Gara Barruuleetti Deebi'i",
    relatedArticles: "Barruulee Walqabatan",
    minRead: "daqiiqaa dubbisa",
    by: "Barreessaa",
    footerDesc: "Waltajjii beekumsa qonnaa ammayyaa — qonnaan bultoota, barattoota fi qorattootaaf beekumsa qonnaa hojii irra ooluu danda'u.",
    footerQuickLinks: "Geessituu Saffisaa", footerSupport: "Deeggarsa",
    footerContact: "Nu Qunnamaa", footerPrivacy: "Imaammata Dhuunfaa",
    footerSloganTitle: "Jecha Durtii Keenya", footerSlogan: "Teeknoolojii Qonnaa Hundaaf.",
    footerCopyright: "© 2025 AgriNova. Mirgi seeraan eegame.",
    catAll: "Barruulee Hunda", catCrop: "Oomisha Midhaanii", catSoil: "Bulchiinsa Biyyee",
    catIrrigation: "Jallisii fi Bishaan", catPest: "To'annoo Ilbisaafi Dhukkubaa",
    catTech: "Teeknoolojii Qonnaa", catClimate: "Qonnaa Haala Qilleensaaf Mijataa",
    catLivestock: "Beeyladaafi Qonnaa", catSustainable: "Qonnaa Itti Fufiinsa Qabu",
    catResearch: "Qorannoo Qonnaa"
  },
  so: {
    brandTagline: "Si Caqli Badan Ku Beer. Si Wanaagsan Ku Beerta.",
    navHome: "Bogga Hore", navExplore: "Sahmi", navArticles: "Maqaallo",
    navSolutions: "Xalal Beeraha", navAbout: "Nagu Saabsan",
    heroHeading: "Aqoon Ka Caawisa Beeraha Inay Koraan",
    heroDesc: "Baro aqoon beeraha oo wax ku ool ah, cilmi baaris, farsamooyin beeraha, hal-abuur iyo aragtiyo khubaro si loo taageero mustaqbal beeraha oo wax soo saar leh.",
    searchPlaceholder: "Raadi maqaallo beeraha...",
    articleCountLabel: "maqaallo la heli karo",
    featuredLabel: "Maqaal La Doortay",
    readArticle: "Akhri Maqaalka",
    articlesHeading: "Maqaallada Beeraha",
    articlesSubheading: "Sahmi aqoonta khubarada ee dhinac kasta oo beeraha.",
    sortBy: "Kala saar", sortLatest: "Ugu Dambeeyay", sortOldest: "Ugu Horeeyay", sortRelevant: "Ugu Habboon",
    readingTime: "Waqtiga akhriska", rtAll: "Dhammaan", rtUnder5: "Ka yar 5 daqiiqo", rt5to10: "5–10 daqiiqo", rtAbove10: "Ka badan 10 daqiiqo",
    readMore: "Akhri Wax Dheeraad Ah",
    noResultsTitle: "Maqaallo lama helin",
    noResultsDesc: "Isku day inaad hagaajiso raadinta ama shaandhaynta.",
    resultsFound: "maqaallo la helay",
    backToArticles: "Ku Noqo Maqaallada",
    relatedArticles: "Maqaallo La Xiriira",
    minRead: "daqiiqo akhris",
    by: "Waxaa qoray",
    footerDesc: "Madal aqoon beeraha oo casri ah — beeraley, arday iyo cilmi baarayaal.",
    footerQuickLinks: "Xiriiriyeyaasha Degdegga", footerSupport: "Taageero",
    footerContact: "Nala Soo Xiriir", footerPrivacy: "Siyaasadda Asturnaanta",
    footerSloganTitle: "Hal-ku-dheggeena", footerSlogan: "Tignoolajiyada Beeraha Qof Walba.",
    footerCopyright: "© 2025 AgriNova. Xuquuqda oo dhan way dhowran tahay.",
    catAll: "Dhammaan Maqaallada", catCrop: "Wax-soo-saarka Dalagga", catSoil: "Maaraynta Ciidda",
    catIrrigation: "Waraabka iyo Biyaha", catPest: "Maaraynta Cayayaanka iyo Cudurrada",
    catTech: "Tignoolajiyada Beeraha", catClimate: "Beeraha Cimilada Caqliga Leh",
    catLivestock: "Xoolaha iyo Beeraha", catSustainable: "Beeraha Waara",
    catResearch: "Cilmi Baarista Beeraha"
  },
  ti: {
    brandTagline: "ብጥበብ ምፍራይ። ብዝሓሸ ምሕራስ።",
    navHome: "መእተዊ", navExplore: "ኣብርህ", navArticles: "ጽሑፋት",
    navSolutions: "ናይ ሕርሻ ፍታሕ", navAbout: "ብዛዕባና",
    heroHeading: "ሕርሻ ክዓብይ ዝሕግዝ ፍልጠት",
    heroDesc: "ተግባራዊ ናይ ሕርሻ ፍልጠት፣ ሳይንሳዊ ምርምር፣ ናይ ሕርሻ ቴክኒክ፣ ፈጠራን ናይ ምሁራን ርዕዮታትን ርኸቡ።",
    searchPlaceholder: "ናይ ሕርሻ ጽሑፋት ድለዩ...",
    articleCountLabel: "ጽሑፋት ይርከቡ",
    featuredLabel: "ተመሪጹ ጽሑፍ",
    readArticle: "ጽሑፍ ኣንብብ",
    articlesHeading: "ናይ ሕርሻ ጽሑፋት",
    articlesSubheading: "ኣብ ነፍሲ ወከፍ ዓውዲ ሕርሻ ናይ ምሁራን ፍልጠት ኣብርሁ።",
    sortBy: "ስርዓት", sortLatest: "ሓድሽ", sortOldest: "ቀዳማይ", sortRelevant: "ኣዝዩ ግቡእ",
    readingTime: "ናይ ንባብ ግዜ", rtAll: "ኩሉ", rtUnder5: "ትሕቲ 5 ደቒቕ", rt5to10: "5–10 ደቒቕ", rtAbove10: "ልዕሊ 10 ደቒቕ",
    readMore: "ተወሳኺ ኣንብብ",
    noResultsTitle: "ጽሑፋት ኣይተረኽቡን",
    noResultsDesc: "ድሌትካ ወይ ማጻርያኻ ኣስተኻኽል።",
    resultsFound: "ጽሑፋት ተረኺቦም",
    backToArticles: "ናብ ጽሑፋት ተመለስ",
    relatedArticles: "ተዛማዲ ጽሑፋት",
    minRead: "ደቒቕ ንባብ",
    by: "ብ",
    footerDesc: "ዘመናዊ ናይ ሕርሻ ፍልጠት መድረኽ — ንሓረስቶት፣ ንተምሃሮን ንመራመርትን።",
    footerQuickLinks: "ቅልጡፍ መላግቦ", footerSupport: "ደገፍ",
    footerContact: "ተራኸቡና", footerPrivacy: "ናይ ብሕትውና ፖሊሲ",
    footerSloganTitle: "ርእሰ መስርሕና", footerSlogan: "ናይ ሕርሻ ቴክኖሎጂ ንኹሉ።",
    footerCopyright: "© 2025 AgriNova. ኩሉ መሰላት ዝተሓለወ እዩ።",
    catAll: "ኩሉ ጽሑፋት", catCrop: "ምፍራይ ሰብሊ", catSoil: "ኣስተዳደር መሬት",
    catIrrigation: "መስኖን ማይን", catPest: "ቁጽጽር ተባዕን ሕማምን",
    catTech: "ናይ ሕርሻ ቴክኖሎጂ", catClimate: "ናይ ኣየር ንብረት ብልሂ ሕርሻ",
    catLivestock: "ጥሪትን ሕርሻን", catSustainable: "ዘላቒ ሕርሻ",
    catResearch: "ናይ ሕርሻ ምርምር"
  }
};

/* ============================================================
   2. CATEGORIES (keys → labels per language, resolved via UI)
   ============================================================ */
const CATEGORIES = [
  { key: "all",        labelKey: "catAll" },
  { key: "crop",       labelKey: "catCrop" },
  { key: "soil",       labelKey: "catSoil" },
  { key: "irrigation", labelKey: "catIrrigation" },
  { key: "pest",       labelKey: "catPest" },
  { key: "tech",       labelKey: "catTech" },
  { key: "climate",    labelKey: "catClimate" },
  { key: "livestock",  labelKey: "catLivestock" },
  { key: "sustainable",labelKey: "catSustainable" },
  { key: "research",   labelKey: "catResearch" }
];

/* ============================================================
   3. ARTICLES — metadata (5 languages) + body content
   ============================================================ */
/* Helper: image URLs from Unsplash (stable, agriculture-focused) */
const IMG = {
  a1: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
  a2: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop&sat=-20",
  a3: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop",
  a4: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop&hue=40",
  a5: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop&sat=-30",
  a6: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
  a7: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80&auto=format&fit=crop",
  a8: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80&auto=format&fit=crop",
  a9: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&q=80&auto=format&fit=crop",
  a10:"https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80&auto=format&fit=crop&sat=-15",
  a11:"https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop&sat=-40",
  a12:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop&hue=100",
  a13:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop&sat=-25",
  a14:"https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1200&q=80&auto=format&fit=crop",
  a15:"https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80&auto=format&fit=crop&hue=20",
  a16:"https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80&auto=format&fit=crop",
  a17:"https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop&hue=30",
  a18:"https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80&auto=format&fit=crop",
  a19:"https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&q=80&auto=format&fit=crop&hue=60",
  a20:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop&hue=15"
};

/* Each article: id, cat, image, date, readingMin, and translations for {en,am,om,so,ti} with {title, desc, body(HTML)} */
const ARTICLES = [
  {
    id: 1, cat: "soil", image: IMG.a1, date: "2025-01-12", readingMin: 8,
    tr: {
      en: {
        title: "Understanding Soil Health and Its Importance",
        desc: "Soil is the foundation of agriculture. Learn how fertility, organic matter, and microorganisms work together to support productive farming.",
        body: `
          <p>Soil is far more than the ground beneath our feet — it is a living system that sustains plant growth, stores water, cycles nutrients, and supports the biodiversity on which agriculture depends. Understanding soil health is the first step toward any successful and sustainable farming operation.</p>
          <h2>What Makes Soil Healthy?</h2>
          <p>Healthy soil is characterized by good structure, adequate organic matter, balanced nutrients, active microbial life, and appropriate pH. These elements interact constantly, and a weakness in any one of them limits the productivity of the whole system.</p>
          <h3>Soil Fertility</h3>
          <p>Fertility refers to the soil's ability to supply essential nutrients — nitrogen, phosphorus, potassium, calcium, magnesium, and micronutrients — in forms plants can absorb. Fertility is not only about nutrient quantity but also about availability, which depends on pH, moisture, and organic matter.</p>
          <h3>Organic Matter</h3>
          <p>Organic matter — decomposed plant and animal residues — improves structure, increases water-holding capacity, feeds soil organisms, and slowly releases nutrients. A soil rich in organic matter is more resilient to drought and erosion.</p>
          <h3>Soil Structure and Microorganisms</h3>
          <p>Well-structured soil forms aggregates with pore spaces that allow air, water, and roots to move freely. This structure is built largely by microorganisms — bacteria, fungi, and earthworms — that bind particles and decompose organic material.</p>
          <div class="info-box">Healthy soil is not just fertile soil — it is a balanced living ecosystem. Protecting soil life is protecting future harvests.</div>
          <h2>Practical Steps to Improve Soil Health</h2>
          <ul>
            <li>Add compost or well-rotted manure regularly.</li>
            <li>Rotate crops to prevent nutrient depletion.</li>
            <li>Minimize tillage to protect structure and soil life.</li>
            <li>Keep the soil covered with mulches or cover crops.</li>
            <li>Test soil periodically to monitor pH and nutrient levels.</li>
          </ul>
          <p>Soil health is a long-term investment. Each season of care builds a foundation that benefits every crop that follows.</p>`
      },
      am: {
        title: "የአፈር ጤና እና ጠቀሜታውን መረዳት",
        desc: "አፈር የግብርና መሰረት ነው። ለምነት፣ ኦርጋኒክ ቁስ እና ጥቃቅን ፍጥረታት አንድ ላይ ሆነው ምርታማ እርሻን እንዴት እንደሚደግፉ ይማሩ።",
        body: `<p>አፈር ከእግራችን በታች ያለው መሬት ብቻ አይደለም — የዕፅዋት እድገትን የሚደግፍ፣ ውሃ የሚያከማች፣ ንጥረ ነገሮችን የሚያሽከረክር ሕያው ስርዓት ነው።</p>
        <h2>ጤናማ አፈርን ምን ያደርገዋል?</h2>
        <p>ጤናማ አፈር ጥሩ አወቃቀር፣ በቂ ኦርጋኒክ ቁስ፣ የተመጣጠነ ንጥረ ነገር እና ንቁ ህይወት ያለው ጥቃቅን ፍጥረት አለው።</p>
        <h3>የአፈር ለምነት</h3>
        <p>ለምነት አስፈላጊ ንጥረ ነገሮችን በዕፅዋት ሊወሰድ በሚችል መልኩ የማቅረብ ችሎታ ነው።</p>
        <h3>ኦርጋኒክ ቁስ</h3>
        <p>ኦርጋኒክ ቁስ አወቃቀርን ያሻሽላል፣ የውሃ መያዝ አቅምን ይጨምራል፣ እና ንጥረ ነገሮችን ቀስ በቀስ ይለቃል።</p>
        <div class="info-box">ጤናማ አፈር ለም አፈር ብቻ አይደለም — ሚዛናዊ ሕያው ስርዓት ነው።</div>
        <h2>የአፈር ጤናን ለማሻሻል ተግባራዊ እርምጃዎች</h2>
        <ul><li>ኮምፖስት ወይም የበሰለ ፍግ በየጊዜው ይጨምሩ።</li><li>የንጥረ ነገር መመናመንን ለመከላከል ሰብሎችን ይቀያይሩ።</li><li>አፈሩን በሽፋን ይሸፍኑ።</li></ul>`
      },
      om: {
        title: "Fayyaa Biyyee fi Barbaachisummaa Isaa Hubachuu",
        desc: "Biyyeen bu'uura qonnaa ti. Oomishtummaa, orgaankiifi lubbu qabeeyyii xixiqqaan akkamitti waliin hojjetanii qonnaa oomishaa deeggaran baradhu.",
        body: `<p>Biyyeen lafa miilkeen keenya jala jiru qofa miti — sirna lubbu qabuu kan biqiltuu guddina, bishaan kuusaa fi soorata naanna'u deeggaruudha.</p>
        <h2>Biyyee Fayyaa Qabu Maal Ijaara?</h2>
        <p>Biyyeen fayyaa qabu caasaa gaarii, orgaankii gahaa, soorata walqixxee fi lubbu qabeeyyii xixiqqaa sochii qaban qabaata.</p>
        <h3>Oomishtummaa Biyyee</h3>
        <p>Oomishtummaa jechuun dandeettii biyyee soorata barbaachisaa biqiltuun fudhachuu danda'u dhiyeessuu ti.</p>
        <h3>Orgaankii</h3>
        <p>Orgaankiin caasaa fooyyessa, dandeettii bishaan kuusuu dabala, soorata suuta gadihiisa.</p>
        <div class="info-box">Biyyeen fayyaa qabu biyyee oomishtummaa qabu qofa miti — sirna lubbu qabuu walqixxee dha.</div>
        <h2>Tarkaanfiiwwan Hojii Irra Oolan</h2>
        <ul><li>Kompoostii ykn kosii gaarii yeroo yeroon dabali.</li><li>Soorata hir'achuu danda'uuf midhaan waljijjiiri.</li><li>Biyyee uwwisaan haguugi.</li></ul>`
      },
      so: {
        title: "Fahanka Caafimaadka Ciidda iyo Muhiimaddiisa",
        desc: "Ciiddu waa aasaaska beeraha. Baro sida bacrinta, walxaha organic-ka iyo noolaha yaryar ay wada shaqeeyaan.",
        body: `<p>Ciiddu wax ka badan tahay dhulka lugaha hoostooda — waa nidaam nool oo taageera koritaanka dhirta, kaydinta biyaha iyo wareegga nafaqooyinka.</p>
        <h2>Maxaa Ciid Caafimaad Leh Sameeya?</h2>
        <p>Ciid caafimaad leh waxay leedahay qaab-dhismeed wanaagsan, walxo organic ku filan, nafaqooyin dheellitiran iyo nolol yar oo firfircoon.</p>
        <h3>Bacrinta Ciidda</h3>
        <p>Bacrintu waa awoodda ciiddu siiso nafaqooyinka muhiimka ah ee dhirta ay nuugto.</p>
        <h3>Walxaha Organic-ka</h3>
        <p>Walxaha organic-ka waxay hagaajiyaan qaab-dhismeedka, kordhiyaan awoodda biyo-qabadka oo si tartiib ah u sii daayaan nafaqooyinka.</p>
        <div class="info-box">Ciid caafimaad leh ma aha oo kaliya ciid bacrin leh — waa nidaam nool oo dheellitiran.</div>
        <h2>Tallaabooyin Wax Ku Ool Ah</h2>
        <ul><li>Ku dar compost ama digo wanaagsan si joogto ah.</li><li>Beddel dalagyada si aad uga hortagto nafaqo-dhimis.</li><li>Daboosho ciidda daqan ama dalag dabool ah.</li></ul>`
      },
      ti: {
        title: "ጥዕና መሬትን ኣገዳስነቱን ምርዳእ",
        desc: "መሬት መሰረት ሕርሻ እዩ። ለምነት፣ ኦርጋኒክ ንጥረ ነገርን ጥቑቓን ፍጡራትን ብሓባር ከመይ ከም ዝዓይኑ ተማሃሩ።",
        body: `<p>መሬት ካብቲ ኣብ ትሕቲ እግርና ዘሎ ጥራይ ኣይኮነን — ንዕብላት ዕቤት ዝድግፍ፣ ማይ ዝኸዝን፣ ንጥረ ነገር ዘዘውር ህያው ስርዓት እዩ።</p>
        <h2>ጥዑይ መሬት እንታይ ይገብሮ?</h2>
        <p>ጥዑይ መሬት ጽቡቕ ኣቀማምጣ፣ እኹል ኦርጋኒክ ንጥረ ነገር፣ ሚዛናዊ ንጥረ ነገርን ህያው ጥቑቓን ፍጡራትን ኣለዎ።</p>
        <h3>ለምነት መሬት</h3>
        <p>ለምነት ኣገደስቲ ንጥረ ነገራት ንዕብላት ክትወስዶ ብዝኽእል መንገዲ ናይ ምቕራብ ክእለት እዩ።</p>
        <h3>ኦርጋኒክ ንጥረ ነገር</h3>
        <p>ኦርጋኒክ ንጥረ ነገር ኣቀማምጣ የመሓይሽ፣ ናይ ማይ ምሓዝ ክእለት ይውስኽ፣ ንጥረ ነገር ቀስ ኢሉ ይለቅቕ።</p>
        <div class="info-box">ጥዑይ መሬት ለም መሬት ጥራይ ኣይኮነን — ሚዛናዊ ህያው ስርዓት እዩ።</div>
        <h2>ተግባራዊ ስጉምትታት</h2>
        <ul><li>ኮምፖስት ወይ ዝበሰለ ፍግ ብቐጻሊ ወስኹ።</li><li>ንጥረ ነገር ምንካይ ንምዕቃብ ሰብልታት ተለዋውጡ።</li><li>መሬት ብሽፋን ሸፍኑ።</li></ul>`
      }
    }
  },
  {
    id: 2, cat: "irrigation", image: IMG.a2, date: "2025-01-18", readingMin: 7,
    tr: {
      en: {
        title: "Modern Irrigation Techniques for Ethiopian Farmers",
        desc: "From drip systems to efficient water scheduling, discover practical irrigation methods that save water and boost yields.",
        body: `
          <p>Water is one of the most limiting factors in Ethiopian agriculture, yet efficient irrigation can transform productivity even in dry seasons. Modern irrigation techniques help farmers deliver the right amount of water at the right time, minimizing waste and maximizing crop performance.</p>
          <h2>Drip Irrigation</h2>
          <p>Drip irrigation delivers water directly to the root zone through a network of tubes and emitters. It reduces evaporation, prevents waterlogging, and can save significant amounts of water compared to surface irrigation. Drip systems are especially valuable for vegetables, fruits, and high-value crops.</p>
          <h2>Sprinkler Irrigation</h2>
          <p>Sprinklers distribute water over the field like rainfall. They suit a wide range of crops and are easier to install on larger or uneven fields. Careful scheduling avoids excessive evaporation and disease pressure from prolonged leaf wetness.</p>
          <h2>Traditional and Improved Surface Irrigation</h2>
          <p>Traditional furrow and basin irrigation remain widely used. Simple improvements — such as land leveling, shorter furrows, and controlled flow — can dramatically reduce water loss and improve uniformity.</p>
          <div class="info-box">The best irrigation system is the one that matches your soil, crop, water source, and budget. Efficiency comes from careful design and disciplined scheduling, not from technology alone.</div>
          <h2>Efficient Water Management Practices</h2>
          <ul>
            <li>Irrigate early morning or late afternoon to reduce evaporation.</li>
            <li>Monitor soil moisture before irrigating.</li>
            <li>Maintain and clean irrigation equipment regularly.</li>
            <li>Combine irrigation with mulching to conserve moisture.</li>
            <li>Train farm workers on correct system use.</li>
          </ul>
          <p>Adopting the right combination of techniques allows farmers to grow more with less water — a critical advantage in a changing climate.</p>`
      },
      am: {
        title: "ለኢትዮጵያ ገበሬዎች ዘመናዊ የመስኖ ቴክኒኮች",
        desc: "ከጠብታ መስኖ እስከ ቀልጣፋ የውሃ አጠቃቀም — ውሃን የሚቆጥቡ እና ምርትን የሚጨምሩ ተግባራዊ ዘዴዎች።",
        body: `<p>ውሃ በኢትዮጵያ ግብርና ውስጥ ከሚገድቡ ምክንያቶች አንዱ ነው፣ ቀልጣፋ መስኖ ግን ምርታማነትን ሊለውጥ ይችላል።</p>
        <h2>ጠብታ መስኖ</h2>
        <p>ጠብታ መስኖ ውሃን በቀጥታ ወደ ስር አካባቢ ያደርሳል፣ ትነትን ይቀንሳል፣ ውሃ ይቆጥባል።</p>
        <h2>ረጭ መስኖ</h2>
        <p>ረጭ መስኖ ውሃን እንደ ዝናብ ያሰራጫል፣ ለብዙ ሰብሎች ተስማሚ ነው።</p>
        <h2>ባህላዊና የተሻሻለ መስኖ</h2>
        <p>ባህላዊ መስኖ በስፋት ጥቅም ላይ ይውላል፤ መሬት ማስተካከልና የውሃ ፍሰት መቆጣጠር ውጤታማነትን ይጨምራሉ።</p>
        <div class="info-box">ምርጥ የመስኖ ስርዓት ከአፈርዎ፣ ከሰብልዎና ከበጀትዎ ጋር የሚስማማው ነው።</div>
        <h2>ቀልጣፋ የውሃ አስተዳደር</h2>
        <ul><li>በማለዳ ወይም ምሽት መስኖ ይስጡ።</li><li>ከመስኖ በፊት የአፈር እርጥበት ይመልከቱ።</li><li>መሳሪያዎችን በየጊዜው ያጽዱ።</li></ul>`
      },
      om: {
        title: "Mala Jallisii Ammayyaa Qonnaan Bultoota Itoophiyaaf",
        desc: "Jallisii dropii irraa kaasee hanga karoora bishaan qusatuu — mala hojii irra ooluu danda'u baradhu.",
        body: `<p>Bishaan qonnaa Itoophiyaa keessatti daangaa cimaadha, garuu jallisiin gahaan oomisha jijjiira.</p>
        <h2>Jallisii Dropii</h2><p>Jallisiin dropii bishaan kallattiin hidda biqiltuu bira geessa, huriinsa hir'isa, bishaan qusata.</p>
        <h2>Jallisii Afuuraa</h2><p>Jallisiin afuuraa akkuma roobaa bishaan facaasa, midhaan baay'ee mijata.</p>
        <div class="info-box">Sirni jallisii gaariin kan biyyee, midhaan fi baajata kee wajjin walsimuudha.</div>
        <h2>Bulchiinsa Bishaan Gaarii</h2>
        <ul><li>Ganama ykn galgala jallisi.</li><li>Duraan jiidha biyyee ilaali.</li><li>Meeshaalee yeroo yeroon qulqulleessi.</li></ul>`
      },
      so: {
        title: "Farsamooyinka Waraabka Casriga ah ee Beeraleyda Itoobiya",
        desc: "Laga bilaabo nidaamka dhibic-dhibic ilaa jadwalka biyaha hufan — baro habab wax ku ool ah.",
        body: `<p>Biyuhu waa mid ka mid ah xaddidaadaha ugu waaweyn beeraha Itoobiya, laakiin waraab hufan ayaa wax soo saarka beddeli kara.</p>
        <h2>Waraabka Dhibic-dhibic</h2><p>Waraabka dhibic-dhibic wuxuu biyaha si toos ah ugu dhiibaa xididka, wuxuu yareeyaa uumiga oo kaydiyaa biyaha.</p>
        <h2>Waraabka Rusha</h2><p>Waraabka rusha wuxuu biyaha u qaybiyaa sida roobka, wuxuuna ku habboon yahay dalagyo badan.</p>
        <div class="info-box">Nidaamka waraabka ugu fiican waa kan ku habboon ciiddaada, dalaggaaga iyo miisaaniyaddaada.</div>
        <h2>Maaraynta Biyaha Hufan</h2>
        <ul><li>Waraabi subax hore ama galab dambe.</li><li>Kahor waraabka hubi qoyaanka ciidda.</li><li>Nadiifi qalabka si joogto ah.</li></ul>`
      },
      ti: {
        title: "ዘመናዊ ሜላታት መስኖ ንሓረስቶት ኢትዮጵያ",
        desc: "ካብ ጠብታ መስኖ ክሳብ ቀልጣፋ ምሕደራ ማይ — ተግባራዊ ሜላታት ተማሃሩ።",
        body: `<p>ማይ ኣብ ሕርሻ ኢትዮጵያ ካብ ዝዓግቱ ረቛሒታት እዩ፣ ቀልጣፋ መስኖ ግን ምርታማነት ክለውጥ ይኽእል።</p>
        <h2>ጠብታ መስኖ</h2><p>ጠብታ መስኖ ማይ ብቐጥታ ናብ ሱር ዕብላት የብጽሕ፣ ትነት ይንክፍ፣ ማይ ይቑጥብ።</p>
        <h2>ረጭ መስኖ</h2><p>ረጭ መስኖ ማይ ከም ዝናብ ይዘርግ፣ ንብዙሕ ሰብልታት ይምጸእ።</p>
        <div class="info-box">ዝበለጸ ስርዓት መስኖ ምስ መሬትካ፣ ሰብልካን በጀትካን ዝሰማማዕ እዩ።</div>
        <h2>ቀልጣፋ ምሕደራ ማይ</h2>
        <ul><li>ብንግሆ ወይ ምሸት መስኖ ግበሩ።</li><li>ቅድሚ መስኖ ጠልሓ መሬት ተዓዘቡ።</li><li>መሳርሒታት ብቐጻሊ ኣጽርዩ።</li></ul>`
      }
    }
  },
  {
    id: 3, cat: "crop", image: IMG.a3, date: "2025-01-22", readingMin: 6,
    tr: {
      en: {
        title: "Understanding Crop Rotation and Its Benefits",
        desc: "Crop rotation is a proven practice that improves soil, reduces pests, and stabilizes yields across seasons.",
        body: `<p>Crop rotation is the practice of growing different types of crops in sequence on the same land. It is one of the oldest and most effective tools in agriculture, offering both economic and ecological benefits.</p>
        <h2>Why Crop Rotation Matters</h2>
        <p>Continuous cropping of the same plant depletes specific nutrients, encourages pest and disease buildup, and degrades soil structure. Rotating crops interrupts these cycles.</p>
        <h3>Nutrient Management</h3>
        <p>Legumes such as beans and peas fix atmospheric nitrogen, enriching the soil for subsequent crops. Deep-rooted crops bring up nutrients from lower layers, while shallow-rooted crops use nutrients near the surface.</p>
        <h3>Pest and Disease Reduction</h3>
        <p>Many pests and pathogens are host-specific. Rotating to a non-host crop breaks their life cycle and reduces populations naturally.</p>
        <h3>Soil Improvement</h3>
        <p>Different crops contribute different amounts and types of organic matter. Rotations that include cover crops or green manures can substantially improve soil structure and biological activity.</p>
        <div class="info-box">A simple three- or four-year rotation can deliver clear benefits: better soil, fewer pests, and more stable yields.</div>
        <h2>Designing a Rotation</h2>
        <ul>
          <li>Alternate between heavy feeders and light feeders.</li>
          <li>Include legumes regularly.</li>
          <li>Avoid planting the same family twice in a row.</li>
          <li>Consider local market demand and climate.</li>
        </ul>`
      },
      am: {
        title: "የሰብል ሽግግር እና ጥቅሞቹን መረዳት",
        desc: "የሰብል ሽግግር አፈርን የሚያሻሽል፣ ተባዮችን የሚቀንስ እና ምርትን የሚያረጋጋ የተረጋገጠ ልምምድ ነው።",
        body: `<p>የሰብል ሽግግር በአንድ መሬት ላይ የተለያዩ ሰብሎችን በቅደም ተከተል ማምረት ነው።</p>
        <h2>ለምን አስፈላጊ ነው</h2><p>ተመሳሳይ ሰብልን ደጋግሞ ማምረት ንጥረ ነገርን ያሟጥጣል፣ ተባዮችን ያበራክታል።</p>
        <h3>የንጥረ ነገር አስተዳደር</h3><p>ጥራጥሬዎች ናይትሮጅንን ያስተካክላሉ።</p>
        <h3>ተባይና በሽታ ቅነሳ</h3><p>ተባዮች የተለየ አስተናጋጅ ስለሚፈልጉ ሽግግር ዑደታቸውን ይሰብራል።</p>
        <div class="info-box">ቀላል የሶስት ወይም የአራት ዓመት ሽግግር ግልጽ ጥቅሞችን ያመጣል።</div>
        <h2>ሽግግርን ማቀድ</h2>
        <ul><li>ከባድ እና ቀላል ተመጋቢዎችን ይቀያይሩ።</li><li>ጥራጥሬዎችን ያካትቱ።</li><li>ተመሳሳይ ቤተሰብ በተከታታይ አይዘሩ።</li></ul>`
      },
      om: {
        title: "Waljijjiirraa Midhaanii fi Faayidaa Isaa Hubachuu",
        desc: "Waljijjiirraa midhaanii biyyee fooyyessa, ilbisa hir'isa, oomisha tasgabbeessa.",
        body: `<p>Waljijjiirraa midhaanii jechuun lafa tokkitti midhaan adda addaa tartiibaan oomishuudha.</p>
        <h2>Maaliif Barbaachisa</h2><p>Midhaan tokko irra deddeebi'anii oomishuun soorata hir'isa, ilbisa dabala.</p>
        <h3>Bulchiinsa Soorataa</h3><p>Midhaan akka baaqelaa nayitroojiinii qilleensa irraa fudhatanii biyyee badhaasu.</p>
        <h3>Ilbisa Hir'isuu</h3><p>Waljijjiirraan marsaa jireenya ilbisaa addaan cita.</p>
        <div class="info-box">Waljijjiirraan salphaan waggaa sadii ykn afurii faayidaa guddaa fida.</div>
        <h2>Karoora Waljijjiirraa</h2>
        <ul><li>Soorata cimaa fi salphaa waljijjiiri.</li><li>Baaqelaa dabalii.</li><li>Maatiin tokko lama walduraa duubaan hin facaasin.</li></ul>`
      },
      so: {
        title: "Fahanka Wareegga Dalagga iyo Faa'iidooyinkiisa",
        desc: "Wareegga dalaggu waa dhaqan la caddeeyay oo hagaajiya ciidda, yareeya cayayaanka.",
        body: `<p>Wareegga dalaggu waa beerashada noocyo kala duwan oo dalagyo ah isku xigxiga isla dhulka.</p>
        <h2>Sababta Ay Muhiim u Tahay</h2><p>Dalag isku mid ah si joogto ah beerta ayaa yareeya nafaqooyinka, kordhiya cayayaanka.</p>
        <h3>Maaraynta Nafaqooyinka</h3><p>Digirta waxay xajisaa naytrojiin, ciidda qanigeysa.</p>
        <h3>Yaraynta Cayayaanka</h3><p>Wareeggu wuxuu jebiyaa wareegga nolosha cayayaanka.</p>
        <div class="info-box">Wareeg fudud oo saddex ama afar sano ah faa'iidooyin cad leh.</div>
        <h2>Qorsheynta Wareegga</h2>
        <ul><li>Isku beddel cuntada culus iyo tan fudud.</li><li>Ku dar digir.</li><li>Ha beerin qoys isku mid ah laba jeer isku xigta.</li></ul>`
      },
      ti: {
        title: "ምልዋጥ ሰብልን ጥቕሚታቱን ምርዳእ",
        desc: "ምልዋጥ ሰብል መሬት የመሓይሽ፣ ተባዕ ይንክፍ፣ ምርቲ የረጋግጽ ዝተረጋገጸ ልምዲ እዩ።",
        body: `<p>ምልዋጥ ሰብል ኣብ ሓደ መሬት ዝተፈላለዩ ሰብልታት ብተኸታታሊ ምምራይ እዩ።</p>
        <h2>ስለምንታይ ኣገዳሲ</h2><p>ተመሳሳሊ ሰብሊ ብተደጋጋሚ ምምራይ ንጥረ ነገር ይውዕይ፣ ተባዕ ይብዝሕ።</p>
        <h3>ምሕደራ ንጥረ ነገር</h3><p>ጥራጥሬታት ናይትሮጅን ይጥዕሙ።</p>
        <h3>ተባዕ ምንካይ</h3><p>ምልዋጥ ዑደት ህይወት ተባዕ ይሰብር።</p>
        <div class="info-box">ቀሊል ሰለስተ ወይ ኣርባዕተ ዓመት ምልዋጥ ጥቕሚ ዘለዎ እዩ።</div>
        <h2>ምድራሻ ምልዋጥ</h2>
        <ul><li>ከቢድን ቀሊልን መመገቢ ተለዋውጡ።</li><li>ጥራጥሬታት ኣካትቱ።</li><li>ተመሳሳሊ ስድራ ብተኸታታሊ ኣይትዝርኡ።</li></ul>`
      }
    }
  },
  /* Articles 4–20 follow the same structure; add them here */
  /* For brevity, remaining articles are appended below in the article array builder */
];

/* ============================================================
   ARTICLES 4–20 — appended
   To keep this file readable, each article below follows the
   exact same schema as articles 1–3. Full translation objects
   for en/am/om/so/ti are included.
   ============================================================ */
const ARTICLES_REST = [
  {
    id: 4, cat: "pest", image: IMG.a4, date: "2025-01-26", readingMin: 7,
    tr: {
      en: { title: "Identifying and Managing Common Crop Pests", desc: "Early detection and integrated pest management protect yields and reduce losses.", body: `<p>Crop pests cause substantial losses every season, but proactive identification and integrated management can keep damage below economic thresholds.</p><h2>Common Pest Groups</h2><p>Insects, mites, nematodes, and mollusks are the main invertebrate pests. Each group has its own behavior, life cycle, and susceptibility to control methods.</p><h2>Early Identification</h2><p>Regular field scouting is essential. Look for chewing damage, sucking damage, discoloration, wilting, and presence of insects or their excrement on leaves and stems.</p><h3>Monitoring</h3><p>Use visual inspections, sticky traps, and pheromone traps. Keep records of pest pressure over time to inform decisions.</p><h2>Integrated Pest Management (IPM)</h2><ul><li><strong>Cultural:</strong> rotation, resistant varieties, sanitation.</li><li><strong>Biological:</strong> natural enemies, predators, parasitoids.</li><li><strong>Mechanical:</strong> traps, barriers, hand removal.</li><li><strong>Chemical:</strong> as a last resort with careful, targeted use.</li></ul><div class="info-box">IPM combines methods rather than relying on a single tool, keeping pests below damaging levels while protecting beneficial insects.</div><p>Train field workers to recognize pests and symptoms, and respond quickly when populations begin to rise.</p>` },
      am: { title: "የተለመዱ የሰብል ተባዮችን መለየትና ማስተዳደር", desc: "ቀደምት ማወቅ እና የተቀናጀ ተባይ አስተዳደር ምርትን ይጠብቃል።", body: `<p>የሰብል ተባዮች በየወቅቱ ከፍተኛ ኪሳራ ያስከትላሉ፣ ቀደምት ማወቅና የተቀናጀ አስተዳደር ግን ጉዳቱን ይቀንሳል።</p><h2>የተለመዱ የተባይ ቡድኖች</h2><p>ነፍሳት፣ ሚት፣ ኔማቶድና ሞለስኮች ዋና ተባዮች ናቸው።</p><h2>ቀደምት ማወቅ</h2><p>መደበኛ የእርሻ ምርመራ አስፈላጊ ነው።</p><h2>የተቀናጀ ተባይ አስተዳደር</h2><ul><li>ባህላዊ ዘዴዎች</li><li>ባዮሎጂያዊ ዘዴዎች</li><li>ሜካኒካል ዘዴዎች</li><li>ኬሚካል እንደ መጨረሻ አማራጭ</li></ul><div class="info-box">IPM ዘዴዎችን ያጣምራል፣ ጠቃሚ ነፍሳትን ይጠብቃል።</div>` },
      om: { title: "Ilbisa Midhaanii Beekuu fi To'achuu", desc: "Beekumsi yeroo jalqabaa fi to'annoon walsimsiisaa oomisha eega.", body: `<p>Ilbisi midhaanii waqtii hunda miidhaa guddaa fida, garuu beekuun fi to'annoon walsimsiisaa miidhaa hir'isa.</p><h2>Gareewwan Ilbisaa</h2><p>Ilbiisonni, mites, nematodes fi mollusks gareewwan ijoo ti.</p><h2>Beekuu Yeroo Jalqabaa</h2><p>Sakatta'iinsi dirree yeroo hunda barbaachisa.</p><h2>To'annoo Walsimsiisaa (IPM)</h2><ul><li>Aadaa</li><li>Lubbuu</li><li>Meeshaa</li><li>Qorichaa akka dhumaa</li></ul><div class="info-box">IPM mala adda addaa walitti fida.</div>` },
      so: { title: "Aqoonsiga iyo Maaraynta Cayayaanka Dalagga", desc: "Ogaanshaha hore iyo maaraynta isku dhafan waxay ilaalisaa wax soo saarka.", body: `<p>Cayayaanku khasaare weyn keenaan xilli kasta, laakiin aqoonsi firfircoon iyo maarayn isku dhafan wuu yareeyaa.</p><h2>Kooxaha Cayayaanka</h2><p>Xasharaadka, mites, nematodes iyo mollusks waa kuwa ugu waaweyn.</p><h2>Aqoonsi Hore</h2><p>Kormeer joogto ah oo beerta ayaa muhiim ah.</p><h2>Maaraynta Isku Dhafan (IPM)</h2><ul><li>Dhaqan</li><li>Bayooloji</li><li>Farsamo</li><li>Kiimiko oo ugu dambayn</li></ul><div class="info-box">IPM waxay isku darsataa habab badan.</div>` },
      ti: { title: "ተባዕ ሰብሊ ምልላይን ምሕደራን", desc: "ቀዳምነት ምልላይን ውሁድ ምሕደራን ምርቲ ይሕሉ።", body: `<p>ተባዕ ሰብሊ ኣብ ነፍሲ ወከፍ ወቕቲ ዓቢ ጉድኣት የስዕብ፣ ቀዳምነት ምልላይን ውሁድ ምሕደራን ግን ይንክፎ።</p><h2>ቡጽራት ተባዕ</h2><p>ጥንብታት፣ ሚት፣ ኔማቶድን ሞለስኮትን ቀንዲ ተባዕ እዮም።</p><h2>ቀዳምነት ምልላይ</h2><p>ስሩዕ ምርመራ ሕርሻ ኣገዳሲ እዩ።</p><h2>ውሁድ ምሕደራ ተባዕ (IPM)</h2><ul><li>ባህላዊ</li><li>ባዮሎጂያዊ</li><li>ሜካኒካል</li><li>ኬሚካል ከም መወዳእታ</li></ul><div class="info-box">IPM ሜላታት የሕውስ።</div>` }
    }
  },
  {
    id: 5, cat: "tech", image: IMG.a5, date: "2025-02-02", readingMin: 8,
    tr: {
      en: { title: "The Role of Agricultural Technology in Modern Farming", desc: "Digital tools, sensors, and smart systems are reshaping how farmers monitor fields and make decisions.", body: `<p>Agricultural technology — often called agritech — is transforming farming from a largely experience-based practice into a data-informed profession. Digital tools help farmers monitor crops, manage resources, and respond to problems faster.</p><h2>Digital Agriculture</h2><p>Smartphones, tablets, and web platforms put information in farmers' hands: weather forecasts, market prices, agronomic advice, and pest alerts.</p><h2>Smart Farming</h2><p>Sensors in soil and weather stations collect real-time data. Automated irrigation, drones for field mapping, and GPS-guided equipment reduce waste and improve precision.</p><h2>Farm Monitoring</h2><p>Remote sensing and satellite imagery can detect crop stress, moisture deficits, and pest outbreaks across large areas. Early warning saves crops.</p><div class="info-box">Technology is most effective when paired with local knowledge. Tools support decisions — they don't replace the farmer's judgment.</div><h2>Adoption Challenges</h2><ul><li>Cost and access to equipment.</li><li>Digital literacy and training.</li><li>Connectivity and electricity in rural areas.</li><li>Local language and usability of tools.</li></ul><p>Overcoming these requires investment in training, affordable devices, and locally relevant content.</p>` },
      am: { title: "የግብርና ቴክኖሎጂ ሚና በዘመናዊ እርሻ", desc: "ዲጂታል መሳሪያዎች፣ ሴንሰሮችና ብልህ ስርዓቶች የገበሬዎችን ውሳኔ ይለውጣሉ።", body: `<p>የግብርና ቴክኖሎጂ እርሻን ከልምድ ላይ የተመሰረተ ወደ መረጃ ላይ የተመሰረተ ሙያ ይለውጣል።</p><h2>ዲጂታል ግብርና</h2><p>ስማርትፎኖችና መድረኮች መረጃን ለገበሬዎች ያደርሳሉ።</p><h2>ብልህ እርሻ</h2><p>ሴንሰሮች የጊዜ መረጃ ይሰበስባሉ፣ ራስ-ሰር መስኖ ብክነትን ይቀንሳል።</p><h2>የእርሻ ክትትል</h2><p>ሳተላይት ምስል የሰብል ጫናን ያውቃል።</p><div class="info-box">ቴክኖሎጂ ከአካባቢ ዕውቀት ጋር ሲዋሃድ የተሻለ ይሰራል።</div><h2>ተግዳሮቶች</h2><ul><li>ወጪና ተደራሽነት</li><li>ዲጂታል ክህሎት</li><li>ግንኙነት</li><li>የአካባቢ ቋንቋ</li></ul>` },
      om: { title: "Gahee Teeknoolojii Qonnaa Qonnaa Ammayyaa Keessatti", desc: "Meeshaaleen dijitaalaa fi sirni beekaa akkaataa qonnaan bulaan itti hordofu jijjiira.", body: `<p>Teeknoolojiin qonnaa qonnaa muuxannoo irratti hundaa'e gara ogummaa odeeffannoo irratti hundaa'e jijjiira.</p><h2>Qonnaa Dijitaalaa</h2><p>Bilbila qabataa fi waltajjiin odeeffannoo qonnaan bultootaaf dhiyeessa.</p><h2>Qonnaa Beekaa</h2><p>Sensoroonni odeeffannoo yeroo qabu funaanu, jallisiin ofiin socho'u bishaan qusata.</p><h2>Hordoffii Qonnaa</h2><p>Suuraan saatalaayitii dhiibbaa midhaanii adda baasa.</p><div class="info-box">Teeknoolojiin beekumsa naannoo wajjin yoo walitti makame caalaatti hojjeta.</div><h2>Rakkoolee</h2><ul><li>Baasii</li><li>Dandeettii dijitaalaa</li><li>Qunnamtii</li><li>Afaan naannoo</li></ul>` },
      so: { title: "Doorka Tignoolajiyada Beeraha ee Beeraha Casriga ah", desc: "Qalabka dijitaalka ah, sensors iyo nidaamyada caqliga leh ayaa beddela sida beeraleyda.", body: `<p>Tignoolajiyada beeruhu waxay beerashada u beddeshaa xirfad ku salaysan xogta.</p><h2>Beeraha Dijitaalka</h2><p>Taleefannada iyo madallada ayaa xogta gacanta beeraleyda geliya.</p><h2>Beeraha Caqliga Leh</h2><p>Sensor-yadu xogta waqtiga dhabta ah ururiyaan.</p><h2>Kormeerka Beeraha</h2><p>Sawirrada dayax-gacmeedku waxay ogaadaan culeyska dalagga.</p><div class="info-box">Tignoolajiyadu waxay si fiican u shaqaysaa marka lala xidhiidho aqoonta maxalliga.</div><h2>Caqabadaha</h2><ul><li>Kharashka</li><li>Aqoonta dijitaalka</li><li>Xidhiidhka</li><li>Luqadda maxalliga</li></ul>` },
      ti: { title: "ግደ ቴክኖሎጂ ሕርሻ ኣብ ዘመናዊ ሕርሻ", desc: "ዲጂታል መሳርሒታት፣ ሴንሰራትን ብልሂ ስርዓታትን ኣገባብ ሓረስቶት ይለውጡ።", body: `<p>ቴክኖሎጂ ሕርሻ ንሕርሻ ካብ ተመክሮ ናብ ብመረዳእታ ዝተመርኮሰ ሞያ ይለውጥ።</p><h2>ዲጂታል ሕርሻ</h2><p>ስማርትፎናትን መድረኻትን መረዳእታ ናብ ሓረስቶት የብጽሑ።</p><h2>ብልሂ ሕርሻ</h2><p>ሴንሰራት ናይ ግዜ መረዳእታ ይእክቡ።</p><h2>ክትትል ሕርሻ</h2><p>ሳተላይት ምስሊ ጸቕጢ ሰብሊ ይለልይ።</p><div class="info-box">ቴክኖሎጂ ምስ ከባቢያዊ ፍልጠት ምስ ተሓወሰ ዝሓሸ ይሰርሕ።</div><h2>ብጽሕታት</h2><ul><li>ወጻኢ</li><li>ዲጂታል ክእለት</li><li>ምትእስሳር</li><li>ከባቢያዊ ቋንቋ</li></ul>` }
    }
  },
  {
    id: 6, cat: "climate", image: IMG.a6, date: "2025-02-08", readingMin: 7,
    tr: {
      en: { title: "Climate-Smart Agriculture and Food Security", desc: "Adapting farming to a changing climate is essential for resilient food systems.", body: `<p>Climate change brings unpredictable rainfall, higher temperatures, and more frequent extreme events. Climate-smart agriculture (CSA) aims to increase productivity, build resilience, and reduce emissions where possible.</p><h2>Three Pillars of CSA</h2><ul><li><strong>Productivity:</strong> sustainably increasing yields and incomes.</li><li><strong>Adaptation:</strong> reducing vulnerability to climate shocks.</li><li><strong>Mitigation:</strong> reducing greenhouse gas emissions where feasible.</li></ul><h2>Practices</h2><p>Drought-tolerant varieties, water harvesting, conservation agriculture, agroforestry, and diversified cropping all contribute to climate resilience.</p><div class="info-box">Food security depends not just on producing more, but on producing reliably under uncertain conditions.</div><h2>Community Approaches</h2><p>Early warning systems, farmer field schools, and shared water infrastructure strengthen local capacity to respond to climate risks.</p>` },
      am: { title: "የአየር ንብረት ብልህ ግብርናና የምግብ ዋስትና", desc: "እርሻን ከሚለዋወጥ አየር ንብረት ጋር ማስማማት አስፈላጊ ነው።", body: `<p>የአየር ንብረት ለውጥ ያልተጠበቀ ዝናብና ከፍተኛ ሙቀት ያመጣል።</p><h2>ሶስት ምሰሶዎች</h2><ul><li>ምርታማነት</li><li>መላመድ</li><li>ቅነሳ</li></ul><h2>ልምምዶች</h2><p>ድርቅን የሚቋቋሙ ዝርያዎች፣ የውሃ አካባቢ፣ አግሮፎረስትሪ።</p><div class="info-box">የምግብ ዋስትና ብቻ መጨመር አይደለም — በእርግጠኝነት ማምረት ነው።</div>` },
      om: { title: "Qonnaa Haala Qilleensaaf Mijataa fi Nageenya Nyataa", desc: "Qonnaa haala qilleensa jijjiiramaa wajjin walsimsiisuun barbaachisa.", body: `<p>Jijjiiramni haala qilleensaa rooba hin tilmaamamne fi ho'a dabala fida.</p><h2>Utubaa Sadii</h2><ul><li>Oomishummaa</li><li>Mijachuu</li><li>Hir'isuu</li></ul><h2>Mala</h2><p>Sanyii gogaa danda'u, kuusaa bishaan, agroforestry.</p><div class="info-box">Nageenyi nyataa oomisha dabaluu qofa miti — amanamummaan oomishuudha.</div>` },
      so: { title: "Beeraha Cimilada Caqliga Leh iyo Amniga Cuntada", desc: "La qabsashada beeraha cimilada beddelaya ayaa muhiim ah.", body: `<p>Isbeddelka cimiladu wuxuu keenaa roob aan la saadaalin karin iyo heerkul sare.</p><h2>Saddexda Tiir</h2><ul><li>Wax soo saar</li><li>La qabsasho</li><li>Dhimis</li></ul><h2>Hababka</h2><p>Noocyo u adkaysta abaaraha, kaydinta biyaha, agroforestry.</p><div class="info-box">Amniga cuntadu ma aha oo kaliya in wax badan la soo saaro.</div>` },
      ti: { title: "ናይ ኣየር ንብረት ብልሂ ሕርሻን ድሕንነት መግብን", desc: "ሕርሻ ምስ ዝልወጥ ኣየር ንብረት ምስምማዕ ኣገዳሲ እዩ።", body: `<p>ለውጢ ኣየር ንብረት ዘይተጸበየ ዝናብን ልዑል ሙቀትን የምጽእ።</p><h2>ሰለስተ ዓንድታት</h2><ul><li>ምርታማነት</li><li>ምምጣን</li><li>ምንካይ</li></ul><h2>ልምድታት</h2><p>ድርቂ ዝጻሕሉ ዓይነታት፣ ምኽዛን ማይ፣ ኣግሮፎረስትሪ።</p><div class="info-box">ድሕንነት መግቢ ምርቲ ምውሳኽ ጥራይ ኣይኮነን።</div>` }
    }
  },
  {
    id: 7, cat: "soil", image: IMG.a7, date: "2025-02-12", readingMin: 6,
    tr: {
      en: { title: "Organic Fertilizers and Their Benefits", desc: "Compost and manure build soil health and provide slow-release nutrients.", body: `<p>Organic fertilizers — including compost, animal manure, and green manures — are central to sustainable soil management. They improve soil structure, feed beneficial organisms, and provide nutrients gradually.</p><h2>Types of Organic Fertilizers</h2><h3>Compost</h3><p>Decomposed plant and kitchen waste, rich in humus and beneficial microbes.</p><h3>Animal Manure</h3><p>Cattle, poultry, and sheep manure supply nitrogen, phosphorus, and organic matter. Must be properly aged to avoid pathogens and excess ammonia.</p><h3>Green Manure</h3><p>Cover crops grown specifically to be incorporated into the soil, adding organic matter and nutrients.</p><div class="info-box">Organic fertilizers work slowly but build long-term soil fertility. Combine them with sound rotations and minimal tillage for best results.</div><h2>Applying Organic Fertilizers</h2><ul><li>Apply compost before planting and incorporate lightly.</li><li>Use well-rotted manure to avoid burning young plants.</li><li>Combine with crop residues and cover crops.</li><li>Monitor soil tests to fine-tune quantities.</li></ul>` },
      am: { title: "ኦርጋኒክ ማዳበሪያዎችና ጥቅሞቻቸው", desc: "ኮምፖስትና ፍግ የአፈር ጤናን ይገነባሉ፣ ንጥረ ነገርን ቀስ በቀስ ይለቃሉ።", body: `<p>ኦርጋኒክ ማዳበሪያዎች — ኮምፖስት፣ ፍግና አረንጓዴ ማዳበሪያ — ዘላቂ የአፈር አስተዳደር መሰረት ናቸው።</p><h2>ዓይነቶች</h2><h3>ኮምፖስት</h3><p>የበሰለ የዕፅዋትና የኩሽና ቆሻሻ።</p><h3>የእንስሳት ፍግ</h3><p>ናይትሮጅን፣ ፎስፈረስና ኦርጋኒክ ቁስ ያቀርባል።</p><h3>አረንጓዴ ማዳበሪያ</h3><p>ለአፈር መሻሻል የሚበቅል ሽፋን ሰብል።</p><div class="info-box">ኦርጋኒክ ማዳበሪያ ቀስ ብሎ ይሰራል፣ ግን ዘላቂ ለምነትን ይገነባል።</div><h2>አተገባበር</h2><ul><li>ከመዝራት በፊት ኮምፖስት ይጨምሩ።</li><li>የበሰለ ፍግ ይጠቀሙ።</li><li>ከሰብል ቅሪት ጋር ያዋህዱ።</li></ul>` },
      om: { title: "Xaa'oo Orgaankii fi Faayidaa Isaa", desc: "Kompoostiifi kosii fayyaa biyyee ijaaru, soorata suuta gadhiisu.", body: `<p>Xaa'oon orgaankii — kompoostii, kosii beeyladaa fi xaa'oo magariisa — bu'uura bulchiinsa biyyee itti fufiinsa qabu.</p><h2>Gosaalee</h2><h3>Kompoostii</h3><p>Haftee biqiltuu fi mana keessaa bosonaa.</p><h3>Kosii Beeyladaa</h3><p>Nayitroojiinii, fosfoorasii fi orgaankii dhiyeessa.</p><h3>Xaa'oo Magariisa</h3><p>Midhaan biyyee fooyyessuuf oofamu.</p><div class="info-box">Xaa'oon orgaankii suuta hojjeta garuu oomishtummaa yeroo dheeraa ijaara.</div><h2>Itti Fayyadama</h2><ul><li>Duraan facaasuu kompoostii dabalii.</li><li>Kosii gaarii fayyadami.</li><li>Haftee midhaanii wajjin walitti fidi.</li></ul>` },
      so: { title: "Bacrimaha Dabiiciga ah iyo Faa'iidooyinkooda", desc: "Compost iyo digo waxay dhistaan caafimaadka ciidda.", body: `<p>Bacrimaha dabiiciga ah — compost, digo xoolaha iyo digo cagaaran — waa udub dhexaadka maaraynta ciidda waarta.</p><h2>Noocyada</h2><h3>Compost</h3><p>Qashinka dhirta iyo jikada oo qudhunsan.</p><h3>Digo Xoolaha</h3><p>Wuxuu bixiyaa naytrojiin, fosfooras iyo walxo organic.</p><h3>Digo Cagaaran</h3><p>Dalag dabool ah oo loo beero ciidda.</p><div class="info-box">Bacrimaha dabiicigu si tartiib ah ayay u shaqeeyaan laakiin waxay dhistaan bacrin muddo dheer.</div><h2>Isticmaalka</h2><ul><li>Compost ku dar kahor beerista.</li><li>Isticmaal digo si fiican u qudhunsan.</li><li>Ku dar hadhaaga dalagga.</li></ul>` },
      ti: { title: "ኦርጋኒክ ማዳበሪያታትን ጥቕሚታቶምን", desc: "ኮምፖስትን ፍግን ጥዕና መሬት ይሃንጹ።", body: `<p>ኦርጋኒክ ማዳበሪያታት — ኮምፖስት፣ ፍግ እንስሳን ቀጠልያ ማዳበሪያን — መሰረት ዘላቒ ምሕደራ መሬት እዮም።</p><h2>ዓይነታት</h2><h3>ኮምፖስት</h3><p>ዝበሰለ ቆሻሻ ዕብላትን ክሽነን።</p><h3>ፍግ እንስሳ</h3><p>ናይትሮጅን፣ ፎስፎረስን ኦርጋኒክ ንጥረ ነገርን የቕርብ።</p><h3>ቀጠልያ ማዳበሪያ</h3><p>ንመሬት ዝዝራእ ሽፋን ሰብሊ።</p><div class="info-box">ኦርጋኒክ ማዳበሪያ ቀስ ኢሉ ይሰርሕ ግን ዘላቒ ለምነት ይሃንጽ።</div><h2>ኣተገባብራ</h2><ul><li>ቅድሚ ምዝራእ ኮምፖስት ወስኹ።</li><li>ዝበሰለ ፍግ ተጠቐሙ።</li><li>ምስ ተረፍ ሰብሊ ኣሓውሱ።</li></ul>` }
    }
  },
  {
    id: 8, cat: "pest", image: IMG.a8, date: "2025-02-15", readingMin: 8,
    tr: {
      en: { title: "Understanding Plant Diseases and Their Prevention", desc: "Recognize symptoms early and apply preventive practices to protect crops from disease.", body: `<p>Plant diseases caused by fungi, bacteria, viruses, and nematodes can devastate crops if not managed. Prevention is always more effective than cure.</p><h2>Major Disease Groups</h2><h3>Fungal Diseases</h3><p>Rusts, mildews, blights, and wilts are common. They thrive in humid conditions and spread through spores.</p><h3>Bacterial Diseases</h3><p>Bacterial wilts, spots, and blights spread through water, tools, and infected seed.</p><h3>Viral Diseases</h3><p>Often spread by insect vectors such as aphids and whiteflies. Symptoms include mosaic patterns, stunting, and distortion.</p><h2>Prevention Strategies</h2><ul><li>Use certified, disease-free seed and planting material.</li><li>Rotate crops to break disease cycles.</li><li>Remove and destroy infected plants promptly.</li><li>Sanitize tools and equipment.</li><li>Choose resistant varieties where available.</li><li>Ensure good airflow through proper spacing.</li></ul><div class="info-box">Scouting fields regularly helps identify disease early, when intervention is most effective and least costly.</div><h2>Integrated Management</h2><p>Combine cultural, biological, and — only when necessary — chemical controls. Always follow label instructions and safety guidelines when using pesticides.</p>` },
      am: { title: "የዕፅዋት በሽታዎችንና መከላከያቸውን መረዳት", desc: "ምልክቶችን ቀደም ብለው ይለዩ፣ መከላከያ ልምምዶችን ይተግብሩ።", body: `<p>በፈንገስ፣ በባክቴሪያ፣ በቫይረስና በኔማቶድ የሚመጡ በሽታዎች ሰብልን ሊያጠፉ ይችላሉ። መከላከል ሁልጊዜ ከማከም ይሻላል።</p><h2>ዋና ቡድኖች</h2><h3>ፈንገሳዊ በሽታዎች</h3><p>ዝገብ፣ ሚልዲው፣ ብላይት።</p><h3>ባክቴሪያዊ በሽታዎች</h3><p>በውሃና በመሳሪያ ይሰራጫሉ።</p><h3>ቫይራል በሽታዎች</h3><p>በነፍሳት ተሸካሚዎች ይተላለፋሉ።</p><h2>የመከላከያ ስልቶች</h2><ul><li>የተረጋገጠ ዘር ይጠቀሙ።</li><li>ሰብሎችን ይቀያይሩ።</li><li>የተጠቁ ዕፅዋትን ያስወግዱ።</li><li>መሳሪያዎችን ያጽዱ።</li></ul><div class="info-box">መደበኛ ምርመራ በሽታን ቀድሞ ለመለየት ይረዳል።</div>` },
      om: { title: "Dhukkuboota Biqiltuu fi Ittisa Isaa Hubachuu", desc: "Mallattoo duraan beeki, mala ittisa hoji irra oolchi.", body: `<p>Dhukkuboonni fangasii, baakteeriyaa, vaayirasii fi nematoodiin dhufan midhaan balleessu. Ittisiin caalaa gaarii.</p><h2>Gareewwan Guddaa</h2><h3>Dhukkuba Fangasii</h3><p>Rust, mildew, blight.</p><h3>Dhukkuba Baakteeriyaa</h3><p>Bishaan fi meeshaan faca'a.</p><h3>Dhukkuba Vaayirasii</h3><p>Ilbiisaan daddarba.</p><h2>Mala Ittisaa</h2><ul><li>Sanyii qulqulluu fayyadami.</li><li>Midhaan waljijjiiri.</li><li>Biqiltuu dhukkubsate balleessi.</li><li>Meeshaa qulqulleessi.</li></ul><div class="info-box">Sakatta'iinsi yeroo hunda dhukkuba duraan beekuuf gargaara.</div>` },
      so: { title: "Fahanka Cudurrada Dhirta iyo Ka-hortagga", desc: "Calaamadaha goor hore aqoonsado oo ka-hortagga codso.", body: `<p>Cudurrada fangas, bakteeriya, fayras iyo nematodes waxay baabi'in karaan dalagyada. Ka-hortaggu waa ka wanaagsan yahay daaweynta.</p><h2>Kooxaha Waaweyn</h2><h3>Cudurrada Fangas</h3><p>Rust, mildew, blight.</p><h3>Cudurrada Bakteeriya</h3><p>Biyo iyo qalab ayay ku faafaan.</p><h3>Cudurrada Fayras</h3><p>Xasharaadka ayaa qaada.</p><h2>Istaraatijiyadaha Ka-hortagga</h2><ul><li>Isticmaal abuur la hubsaday.</li><li>Beddel dalagyada.</li><li>Ka saar dhirta cudurka qabta.</li><li>Nadiifi qalabka.</li></ul><div class="info-box">Kormeerka beerta wuxuu gargaaraa aqoonsiga hore.</div>` },
      ti: { title: "ሕማማት ዕብላትን መከላከያኦምን ምርዳእ", desc: "ምልክታት ቀዲምካ ለልኡ፣ ናይ መከላከያ ልምድታት ተግብሩ።", body: `<p>ሕማማት ብፈንገስ፣ ባክተርያ፣ ቫይረስን ኔማቶድን ዝመጹ ሰብሊ ከጥፍኡ ይኽእሉ። ምክልኻል ካብ ምሕካም ይሓይሽ።</p><h2>ቀንዲ ቡጽራት</h2><h3>ሕማም ፈንገስ</h3><p>ራስት፣ ሚልዲው፣ ብላይት።</p><h3>ሕማም ባክተርያ</h3><p>ብማይን መሳርሒን ይዝራእ።</p><h3>ሕማም ቫይረስ</h3><p>ብጥንብታት ይመሓላለፍ።</p><h2>ስትራተጂታት ምክልኻል</h2><ul><li>ዝተረጋገጸ ዘርኢ ተጠቐሙ።</li><li>ሰብልታት ተለዋውጡ።</li><li>ዝተጠቕዐ ዕብላት ኣወግዱ።</li><li>መሳርሒታት ኣጽርዩ።</li></ul><div class="info-box">ስሩዕ ምርመራ ሕማም ቀዲምካ ንምልላይ ይሕግዝ።</div>` }
    }
  },
  {
    id: 9, cat: "crop", image: IMG.a9, date: "2025-02-20", readingMin: 5,
    tr: {
      en: { title: "The Importance of Quality Seeds in Crop Production", desc: "Quality seed is the foundation of a good harvest — learn how to select, store, and use it.", body: `<p>The seed you plant determines much of your harvest's potential. Quality seed offers high germination, genetic purity, vigor, and freedom from pests and diseases.</p><h2>Selecting Quality Seed</h2><ul><li>Buy from certified or trusted seed sources.</li><li>Choose varieties adapted to your local conditions.</li><li>Check for uniform size, color, and absence of damage.</li><li>Confirm germination percentage where possible.</li></ul><h2>Seed Storage</h2><p>Store seed in cool, dry, dark conditions. Use airtight containers and control humidity. Avoid mixing seed from different lots or years without labeling.</p><h2>Seed Testing</h2><p>A simple germination test at home helps verify viability before planting. Count germinated seeds from a sample of 100 to estimate percentage.</p><div class="info-box">Good seed is a small investment with a large return. Using low-quality seed can waste an entire season of labor.</div>` },
      am: { title: "በሰብል ምርት ውስጥ ጥራት ያለው ዘር ጠቀሜታ", desc: "ጥራት ያለው ዘር የጥሩ ምርት መሰረት ነው።", body: `<p>የሚዘሩት ዘር የምርትዎን አቅም ይወስናል። ጥራት ያለው ዘር ከፍተኛ ቡቃያ፣ ንጽህናና ከተባይና በሽታ ነፃነት ይሰጣል።</p><h2>ጥራት ያለው ዘር መምረጥ</h2><ul><li>ከተረጋገጠ ምንጭ ይግዙ።</li><li>ከአካባቢዎ የተላመዱ ዝርያዎች ይምረጡ።</li><li>አንድ ዓይነት መጠንና ቀለም ይፈትሹ።</li></ul><h2>የዘር ማከማቻ</h2><p>በቀዝቃዛ፣ ደረቅና ጨለማ ቦታ ያከማቹ።</p><h2>የዘር ምርመራ</h2><p>ቀላል የቡቃያ ምርመራ በቤት ውስጥ ይደረጋል።</p><div class="info-box">ጥሩ ዘር ትንሽ ኢንቨስትመንት ከትልቅ ተመላሽ ጋር ነው።</div>` },
      om: { title: "Barbaachisummaa Sanyii Qulqulluu Oomisha Midhaanii Keessatti", desc: "Sanyiin qulqulluun bu'uura oomisha gaarii ti.", body: `<p>Sanyiin ati facaaltu dandeettii oomisha kee murteessa.</p><h2>Sanyii Filachuu</h2><ul><li>Madda amanamaa irraa bitadhu.</li><li>Sanyii naannoo keetiif mijatu filadhu.</li><li>Hamma fi halluu tokkummaa mirkaneessi.</li></ul><h2>Kuusaa Sanyii</h2><p>Bakka qabbanaawaa, goggogaa fi dukkanaa keessa kuusi.</p><h2>Qorannoo Sanyii</h2><p>Qorannoo biqilinsaa salphaa mana keessatti godhi.</p><div class="info-box">Sanyiin gaariin baasii xinnaa faayidaa guddaa qaba.</div>` },
      so: { title: "Muhiimadda Abuurka Tayada Leh ee Wax-soo-saarka Dalagga", desc: "Abuurka tayada leh waa aasaaska goosashada wanaagsan.", body: `<p>Abuurka aad beertaa ayaa go'aamiya awoodda goosashadaada.</p><h2>Doorashada Abuurka Tayada</h2><ul><li>Ka iibso ilo la hubiyay.</li><li>Dooro noocyo ku habboon deegaankaaga.</li><li>Hubi cabbirka iyo midabka isku mid ah.</li></ul><h2>Kaydinta Abuurka</h2><p>Ku kaydi meel qabow, qalalan oo mugdi ah.</p><h2>Baaritaanka Abuurka</h2><p>Baaritaan biqitaan fudud guriga ku samee.</p><div class="info-box">Abuur wanaagsani waa maalgashi yar oo soo celin weyn leh.</div>` },
      ti: { title: "ኣገዳስነት ዘርኢ ዓቐን ኣብ ምፍራይ ሰብሊ", desc: "ዓቐን ዘርኢ መሰረት ጽቡቕ ምርቲ እዩ።", body: `<p>ዝዘርእካዮ ዘርኢ ናይ ምርትኻ ኣቅምቲ ይወስን።</p><h2>ዓቐን ዘርኢ ምምራጽ</h2><ul><li>ካብ ዝተረጋገጸ ምንጪ ግዘኡ።</li><li>ምስ ከባቢኻ ዝሰማማዕ ዓይነት ምረጽ።</li><li>ሓደ ዓይነት ዓቐንን ሕብርን ተዓዘብ።</li></ul><h2>ምኽዛን ዘርኢ</h2><p>ኣብ ዝሑል፣ ንቑጽን ጸልማትን ቦታ ኣኽዝን።</p><h2>ምርመራ ዘርኢ</h2><p>ቀሊል ምርመራ ብቑጽሊ ኣብ ገዛ ግበር።</p><div class="info-box">ጽቡቕ ዘርኢ ንእሽቶ ወጻኢ ምስ ዓቢ ተመላሽ እዩ።</div>` }
    }
  },
  {
    id: 10, cat: "irrigation", image: IMG.a10, date: "2025-02-25", readingMin: 6,
    tr: {
      en: { title: "Sustainable Water Management in Agriculture", desc: "Conserve water through harvesting, efficient irrigation, and responsible use.", body: `<p>Water scarcity affects millions of farmers. Sustainable water management combines conservation, efficient use, and protection of water sources.</p><h2>Rainwater Harvesting</h2><p>Small ponds, roof catchment, and check dams capture rainfall for later use. This reduces pressure on groundwater and surface water during dry periods.</p><h2>Efficient Irrigation</h2><p>Drip, micro-sprinkler, and improved furrow systems deliver water where it is needed most. Scheduling irrigation based on soil moisture avoids waste.</p><h2>Protecting Water Sources</h2><ul><li>Avoid pollution from fertilizers and pesticides.</li><li>Maintain buffer vegetation along streams.</li><li>Prevent soil erosion into water bodies.</li></ul><div class="info-box">Every drop saved today is a drop available for tomorrow's harvest.</div><h2>Community Water Management</h2><p>Shared infrastructure, clear rules, and cooperative management ensure fair and sustainable access to water for all users.</p>` },
      am: { title: "በግብርና ውስጥ ዘላቂ የውሃ አስተዳደር", desc: "በመሰብሰብ፣ ቀልጣፋ መስኖና ኃላፊነት ያለው አጠቃቀም ውሃን ይቆጥቡ።", body: `<p>የውሃ እጥረት በሚሊዮን የሚቆጠሩ ገበሬዎችን ይጎዳል።</p><h2>የዝናብ ውሃ መሰብሰብ</h2><p>ትናንሽ ገንዳዎች፣ ጣሪያ መያዣ፣ ግድቦች።</p><h2>ቀልጣፋ መስኖ</h2><p>ጠብታ፣ ማይክሮ-ስፕሪንክለር።</p><h2>የውሃ ምንጮችን መጠበቅ</h2><ul><li>ብክለትን ያስወግዱ።</li><li>የዳርቻ ዕፅዋትን ይጠብቁ።</li><li>የአፈር መሸርሸርን ይከላከሉ።</li></ul><div class="info-box">ዛሬ የተቆጠበ ጠብታ ለነገ ምርት ይገኛል።</div>` },
      om: { title: "Bulchiinsa Bishaan Itti Fufiinsa Qabu Qonnaa Keessatti", desc: "Bishaan qusachuun walitti qabuu, jallisii gahaa fi itti fayyadama gaarii.", body: `<p>Hanqinni bishaanii qonnaan bultoota miliyoonaan lakkaa'aman miidha.</p><h2>Walitti Qabuu Bishaan Roobaa</h2><p>Haroo xixiqqaa fi boolla bishaanii.</p><h2>Jallisii Gahaa</h2><p>Dropii fi micro-sprinkler.</p><h2>Maddoota Bishaanii Eeguu</h2><ul><li>Faalama dhiisi.</li><li>Biqiltuu qarqara laga eegi.</li><li>Dhiqamuu biyyee ittisi.</li></ul><div class="info-box">Bishaan har'a qusatame boruuf ni jiraata.</div>` },
      so: { title: "Maaraynta Biyaha Waarta ee Beeraha", desc: "Kaydi biyaha iyada oo loo marayo soo ururin iyo waraab hufan.", body: `<p>Yaraanta biyuhu waxay saameysaa malaayiin beeraley ah.</p><h2>Soo Ururinta Biyaha Roobka</h2><p>Ballooyin yaryar iyo harooyin.</p><h2>Waraab Hufan</h2><p>Dhibic-dhibic iyo micro-sprinkler.</p><h2>Ilaalinta Ilaha Biyaha</h2><ul><li>Ka fogow wasakheynta.</li><li>Ilaali dhirta hareeraha durdurrada.</li><li>Ka hortag nabaad-guurka ciidda.</li></ul><div class="info-box">Dhibic kasta oo maanta la kaydiyo waa mid berri loo heli karo.</div>` },
      ti: { title: "ዘላቒ ምሕደራ ማይ ኣብ ሕርሻ", desc: "ማይ ብምእካብ፣ ቀልጣፋ መስኖን ተሓታቲ ኣጠቓቕማን ቑጥቡ።", body: `<p>ሕጽረት ማይ ንሚልዮናት ሓረስቶት ይጸልዎም።</p><h2>ምእካብ ማይ ዝናብ</h2><p>ንኣሽቱ ጋሻታትን መእካቢ ናሕስን።</p><h2>ቀልጣፋ መስኖ</h2><p>ጠብታን ማይክሮ-ስፕሪንክለርን።</p><h2>ምሕላው ምንጪ ማይ</h2><ul><li>ብክለት ኣወግዱ።</li><li>ዕብላት ገምገም ጎርፍ ሓልዉ።</li><li>ምሕዳግ መሬት ኣቑጽሉ።</li></ul><div class="info-box">ነፍሲ ወከፍ ሎሚ ዝተቐጥቐ ጠብታ ንጽባሕ ይርከብ።</div>` }
    }
  },
  {
    id: 11, cat: "tech", image: IMG.a11, date: "2025-03-02", readingMin: 8,
    tr: {
      en: { title: "How Artificial Intelligence Is Transforming Agriculture", desc: "AI supports crop monitoring, prediction, and better farm planning.", body: `<p>Artificial intelligence (AI) is beginning to play a meaningful role in agriculture. From image-based crop diagnosis to yield forecasting and market analysis, AI tools help farmers and researchers make better-informed decisions.</p><h2>AI Applications in Agriculture</h2><h3>Crop Monitoring</h3><p>Computer vision analyzes drone and satellite images to detect stress, disease, and weed pressure across large areas.</p><h3>Predictive Analytics</h3><p>Machine learning models use weather, soil, and historical data to forecast yields, pest outbreaks, and irrigation needs.</p><h3>Farm Planning</h3><p>AI-powered platforms recommend planting dates, input quantities, and crop choices based on local conditions.</p><h3>Decision Support</h3><p>Mobile chatbots and advisory systems deliver localized recommendations in farmers' preferred languages.</p><div class="info-box">AI does not replace farmers — it augments their judgment with timely information and pattern recognition beyond human scale.</div><h2>Responsible Adoption</h2><p>AI tools must be trained on local data, validated by agronomists, and deployed in ways that are accessible and affordable. Protecting farmer data and ensuring transparency are essential.</p>` },
      am: { title: "አርቴፊሻል ኢንተለጀንስ ግብርናን እንዴት እየለወጠ ነው", desc: "AI የሰብል ክትትልን፣ ትንበያንና የእርሻ እቅድን ይደግፋል።", body: `<p>AI በግብርና ውስጥ ትርጉም ያለው ሚና መጫወት ጀምሯል።</p><h2>አፕሊኬሽኖች</h2><h3>የሰብል ክትትል</h3><p>የኮምፒውተር ራዕይ የድሮንና ሳተላይት ምስሎችን ይተነትናል።</p><h3>ትንበያ</h3><p>ማሽን ለርኒንግ ሞዴሎች ምርትን ይተነብያሉ።</p><h3>የእርሻ እቅድ</h3><p>AI መድረኮች የመዝራት ቀንና ምርጫዎችን ይመክራሉ።</p><div class="info-box">AI ገበሬዎችን አይተካም — ውሳኔአቸውን ያጠናክራል።</div><h2>ኃላፊነት ያለው አጠቃቀም</h2><p>በአካባቢ መረጃ ላይ የተሰለጠነ፣ በባለሙያዎች የተረጋገጠ መሆን አለበት።</p>` },
      om: { title: "AI Akkamitti Qonnaa Jijjiiraa Jirti", desc: "AI hordoffii midhaanii, tilmaama fi karoora qonnaa deeggarti.", body: `<p>AI qonnaa keessatti gahee guddaa taphachaa jirti.</p><h2>Itti Fayyadama</h2><h3>Hordoffii Midhaanii</h3><p>Suuraa droonii fi saatalaayitii xiinxalti.</p><h3>Tilmaama</h3><p>Moodeelonni machine learning oomisha tilmaamu.</p><h3>Karoora Qonnaa</h3><p>Guyyaa facaasuu fi filannoo gorfu.</p><div class="info-box">AI qonnaan bulaa hin bakka bu'u — murtii isaa cimsa.</div><h2>Itti Fayyadama Itti Gaafatamummaa Qabu</h2><p>Odeeffannoo naannoo irratti leenjifamuu qaba.</p>` },
      so: { title: "Sida AI ay U Beddesho Beeraha", desc: "AI waxay taageertaa kormeerka dalagga iyo qorsheynta beerta.", body: `<p>AI waxay door muhiim ah ka ciyaartaa beeraha.</p><h2>Isticmaalka</h2><h3>Kormeerka Dalagga</h3><p>Aragtida kombuyuutarku waxay falanqaysaa sawirrada drone iyo dayax-gacmeedka.</p><h3>Saadaasha</h3><p>Moodoollada machine learning waxay saadaaliyaan wax soo saarka.</p><h3>Qorsheynta Beerta</h3><p>Madallada AI waxay ku taliyaan taariikhda beerista.</p><div class="info-box">AI ma beddelo beeraleyda — waxay xoojisaa go'aankooda.</div><h2>Isticmaal Mas'uuliyad Leh</h2><p>Waa in lagu tababaraa xogta maxalliga.</p>` },
      ti: { title: "AI ከመይ ገይራ ሕርሻ ተለውጥ", desc: "AI ክትትል ሰብሊ፣ ትንበያን ምድራሻ ሕርሻን ትድግፍ።", body: `<p>AI ኣብ ሕርሻ ትርጉም ዘለዎ ግደ ትጻወት ጀሚራ።</p><h2>ኣፕሊኬሽናት</h2><h3>ክትትል ሰብሊ</h3><p>ራእይ ኮምፒውተር ምስሊ ድሮንን ሳተላይትን ይትንትን።</p><h3>ትንበያ</h3><p>ሞዴላት machine learning ምርቲ ይትንብዩ።</p><h3>ምድራሻ ሕርሻ</h3><p>መድረኻት AI መዓልቲ ምዝራእ ይመኽሩ።</p><div class="info-box">AI ንሓረስቶት ኣይትትክኦምን — ፍርዶም ተሓጽሽ።</div><h2>ተሓታቲ ኣጠቓቕማ</h2><p>ብከባቢያዊ መረዳእታ ክልሰን ኣለዎ።</p>` }
    }
  },
  {
    id: 12, cat: "tech", image: IMG.a12, date: "2025-03-08", readingMin: 6,
    tr: {
      en: { title: "Understanding Greenhouse Farming", desc: "Greenhouses enable controlled cultivation, extending seasons and protecting crops.", body: `<p>Greenhouse farming allows farmers to control temperature, humidity, and light, protecting crops from adverse weather and enabling year-round production.</p><h2>Greenhouse Structures</h2><p>Greenhouses range from simple plastic tunnels to sophisticated glass structures. The choice depends on climate, crop, and budget.</p><h2>Managing the Environment</h2><h3>Temperature</h3><p>Ventilation, shading, and heating maintain optimal temperatures for crop growth.</p><h3>Humidity</h3><p>Proper ventilation prevents excessive humidity, which encourages fungal diseases.</p><h3>Light</h3><p>Greenhouse glazing and shading materials control light intensity and duration.</p><h2>Crop Selection</h2><p>High-value crops such as tomatoes, peppers, cucumbers, herbs, and flowers thrive in greenhouses.</p><div class="info-box">Greenhouses are investments in climate resilience. Their success depends on careful management, not just construction.</div>` },
      am: { title: "የግሪንሃውስ እርሻን መረዳት", desc: "ግሪንሃውሶች ቁጥጥር የተደረገበት እርሻን ያስችላሉ።", body: `<p>ግሪንሃውስ እርሻ የሙቀት፣ እርጥበትና ብርሃን ቁጥጥር ያስችላል።</p><h2>መዋቅሮች</h2><p>ከቀላል ፕላስቲክ ዋሻ እስከ ብርጭቆ መዋቅር።</p><h2>አካባቢን ማስተዳደር</h2><h3>ሙቀት</h3><p>አየር ማስወጫ፣ ጥላ፣ ማሞቂያ።</p><h3>እርጥበት</h3><p>ጥሩ አየር ማስወጫ ፈንገሳዊ በሽታን ይከላከላል።</p><h3>ብርሃን</h3><p>የብርሃን ጥንካሬ ቁጥጥር።</p><h2>የሰብል ምርጫ</h2><p>ቲማቲም፣ ቃሪያ፣ ኪያር፣ አበቦች።</p><div class="info-box">ግሪንሃውስ በአየር ንብረት መቋቋም ላይ ኢንቨስትመንት ነው።</div>` },
      om: { title: "Qonnaa Mana Qilleensaa Hubachuu", desc: "Mana qilleensaan qonnaa to'atamaa dandeessisa.", body: `<p>Qonnaan mana qilleensaa ho'a, jiidha fi ifa to'achuu dandeessisa.</p><h2>Caasaa</h2><p>Ujummoo plastikii irraa hanga caasaa fullee.</p><h2>Bulchiinsa Naannoo</h2><h3>Ho'a</h3><p>Qilleensa baasuu, gaaddisa, ho'isuu.</p><h3>Jiidha</h3><p>Qilleensi gaariin dhukkuba fangasii dhoowwa.</p><h3>Ifa</h3><p>Humna ifaa to'achuu.</p><h2>Filannoo Midhaanii</h2><p>Timaatimii, qaaraa, kukumba, daraaraa.</p><div class="info-box">Manni qilleensaa invastimentii jijjiirama qilleensaaf.</div>` },
      so: { title: "Fahanka Beeraha Guryaha Cagaaran", desc: "Guryaha cagaaran waxay awood u yeelaan beerasho la xakameeyay.", body: `<p>Beeraha guryaha cagaaran waxay xakameeyaan heerkulka, qoyaanka iyo iftiinka.</p><h2>Qaab-dhismeedka</h2><p>Laga bilaabo tunnel balaastiig ah ilaa qaab-dhismeed quraarad ah.</p><h2>Maaraynta Deegaanka</h2><h3>Heerkulka</h3><p>Hawo-bixinta, hadhka, kuleylinta.</p><h3>Qoyaanka</h3><p>Hawo-bixin wanaagsan waxay ka hortagtaa cudurrada fangas.</p><h3>Iftiinka</h3><p>Xakamaynta xoogga iftiinka.</p><h2>Doorashada Dalagga</h2><p>Yaanyo, basbaas, qajaar, ubax.</p><div class="info-box">Guryaha cagaaran waa maalgashi adkaysiga cimilada.</div>` },
      ti: { title: "ሕርሻ ግሪንሃውስ ምርዳእ", desc: "ግሪንሃውስ ቁጽጽር ዝተገብረሉ ሕርሻ የሕልፍ።", body: `<p>ግሪንሃውስ ሙቀት፣ ጠልሓን ብርሃንን ክትትገብር የሕልፍ።</p><h2>ቅርጽታት</h2><p>ካብ ቀሊል ፕላስቲክ ዋሕዲ ክሳብ ብርጭቆ ቅርጺ።</p><h2>ምሕደራ ከባቢ</h2><h3>ሙቀት</h3><p>ኣየር ምውጻእ፣ ጽላል፣ ምውዓይ።</p><h3>ጠልሓ</h3><p>ጽቡቕ ኣየር ምውጻእ ሕማም ፈንገስ ይከላኸል።</p><h3>ብርሃን</h3><p>ቁጽጽር ብርሃን።</p><h2>ምምራጽ ሰብሊ</h2><p>ቲማቲም፣ ቃሪያ፣ ኪያር፣ ዕምባባታት።</p><div class="info-box">ግሪንሃውስ ወፍሪ ኣብ ምጽናዕ ኣየር ንብረት።</div>` }
    }
  },
  {
    id: 13, cat: "soil", image: IMG.a13, date: "2025-03-12", readingMin: 7,
    tr: {
      en: { title: "Preventing Soil Erosion on Agricultural Land", desc: "Terraces, vegetation cover, and conservation practices protect soil from erosion.", body: `<p>Soil erosion removes the most fertile layer of soil, reducing productivity and polluting waterways. On sloping land, erosion can be severe unless protective measures are in place.</p><h2>Causes of Erosion</h2><p>Water and wind are the main agents. Steep slopes, bare soil, poor structure, and heavy rainfall accelerate loss.</p><h2>Prevention Practices</h2><h3>Terraces</h3><p>Stone or soil terraces slow water flow and trap soil on slopes.</p><h3>Vegetation Cover</h3><p>Cover crops, mulches, and grasses protect the soil surface from raindrop impact and runoff.</p><h3>Conservation Tillage</h3><p>Reducing tillage preserves soil structure and residue cover.</p><h3>Contour Farming</h3><p>Plowing and planting along contours reduce water velocity.</p><div class="info-box">Losing soil is far costlier than protecting it. Every centimeter of topsoil takes centuries to form.</div><h2>Community Action</h2><p>Watershed-level planning, tree planting, and shared infrastructure magnify the impact of individual farm practices.</p>` },
      am: { title: "በግብርና መሬት ላይ የአፈር መሸርሸርን መከላከል", desc: "እርከኖች፣ የዕፅዋት ሽፋንና ጥበቃ ልምምዶች አፈርን ይጠብቃሉ።", body: `<p>የአፈር መሸርሸር ለም የሆነውን ንብርብር ያስወግዳል።</p><h2>መንስኤዎች</h2><p>ውሃና ንፋስ ዋና ምክንያቶች ናቸው።</p><h2>የመከላከያ ልምምዶች</h2><h3>እርከኖች</h3><p>የድንጋይና የአፈር እርከኖች የውሃ ፍሰትን ይቀንሳሉ።</p><h3>የዕፅዋት ሽፋን</h3><p>ሽፋን ሰብሎችና ሣር አፈርን ይጠብቃሉ።</p><h3>ጥበቃ እርሻ</h3><p>አፈርን ማልማት መቀነስ።</p><div class="info-box">አፈር ማጣት ከመጠበቅ የበለጠ ውድ ነው።</div>` },
      om: { title: "Dhiqamuu Biyyee Lafa Qonnaa Irraa Ittisuu", desc: "Terasoonni, uwwisa biqiltuu fi mala eeguu biyyee eegu.", body: `<p>Dhiqamuu biyyee kutaalee gabbataa balleessa.</p><h2>Sababoota</h2><p>Bishaan fi qilleensa.</p><h2>Mala Ittisaa</h2><h3>Terasii</h3><p>Dhagaa fi biyyee dhiqamuu hir'isa.</p><h3>Uwwisa Biqiltuu</h3><p>Midhaan uwwisaa fi marga biyyee eegu.</p><h3>Qonnaa Eeguu</h3><p>Qonnaa hir'isuu.</p><div class="info-box">Biyyee dhabuun eeguu caalaa baasii qaba.</div>` },
      so: { title: "Ka-hortagga Nabaad-guurka Ciidda ee Dhulka Beeraha", desc: "Terraces, daboolka dhirta iyo dhaqamada ilaalintu waxay ilaaliyaan ciidda.", body: `<p>Nabaad-guurka ciiddu wuxuu qaadaa lakabka ugu bacrinta badan.</p><h2>Sababaha</h2><p>Biyo iyo dabayl.</p><h2>Hababka Ka-hortagga</h2><h3>Terraces</h3><p>Dhagax iyo ciid ayaa yareeya socodka biyaha.</p><h3>Daboolka Dhirta</h3><p>Dalag dabool iyo caws ayaa ilaaliya ciidda.</p><h3>Beerasho Ilaalin</h3><p>Yaraynta qodista.</p><div class="info-box">Luminta ciiddu way ka qaalisan tahay ilaalinteeda.</div>` },
      ti: { title: "ምሕዳግ መሬት ኣብ ሕርሻ ምክልኻል", desc: "እርከናት፣ ሽፋን ዕብላትን ልምድታት ሓለዋን መሬት ይሕልዉ።", body: `<p>ምሕዳግ መሬት ነቲ ዝለም ንጣፍ የወግድ።</p><h2>ምኽንያታት</h2><p>ማይን ንፋስን።</p><h2>ልምድታት ምክልኻል</h2><h3>እርከናት</h3><p>እምን መሬትን ፍሰት ማይ ይንክፉ።</p><h3>ሽፋን ዕብላት</h3><p>ሰብልታት ሽፋንን ሳዕርን መሬት ይሕልዉ።</p><h3>ሓለዋ ሕርሻ</h3><p>ምንካይ ምልማዕ።</p><div class="info-box">ምጥፋእ መሬት ካብ ምሕላው ዝበለጸ ውዱእ እዩ።</div>` }
    }
  },
  {
    id: 14, cat: "sustainable", image: IMG.a14, date: "2025-03-18", readingMin: 7,
    tr: {
      en: { title: "Post-Harvest Management and Food Loss Reduction", desc: "Careful handling, storage, and transport reduce losses between harvest and market.", body: `<p>Post-harvest losses — from harvest through storage, transport, and marketing — can reach significant levels. Reducing them is one of the most effective ways to increase food availability.</p><h2>Harvesting Practices</h2><p>Harvest at the right maturity, use clean and appropriate tools, and avoid damaging produce. Timely harvesting prevents overripening and pest attack.</p><h2>Storage</h2><h3>Grain Storage</h3><p>Dry grain thoroughly, store in clean, airtight containers, and monitor for pests. Use hermetic bags where available.</p><h3>Perishable Crops</h3><p>Fruits and vegetables need cool storage, proper ventilation, and careful handling to minimize spoilage.</p><h2>Transport</h2><p>Use clean, covered vehicles. Avoid overloading. Transport during cooler parts of the day for perishables.</p><h2>Handling and Sorting</h2><p>Sort at harvest to remove damaged items. Clean and grade for better market access.</p><div class="info-box">Post-harvest losses represent wasted water, labor, and inputs. Reducing them is a sustainability win.</div>` },
      am: { title: "ከመኸር በኋላ አስተዳደርና የምግብ ኪሳራ ቅነሳ", desc: "ጥንቃቄ ያለው አያያዝ፣ ማከማቻና ትራንስፖርት ኪሳራን ይቀንሳሉ።", body: `<p>ከመኸር በኋላ የሚደርስ ኪሳራ ከፍተኛ ሊሆን ይችላል።</p><h2>የመኸር ልምምዶች</h2><p>በትክክለኛ የብስለት ደረጃ ይምረሩ።</p><h2>ማከማቻ</h2><h3>የእህል ማከማቻ</h3><p>በደረቅ፣ ንጹህ፣ አየር የማያስገባ መሳሪያ ያከማቹ።</p><h3>ተበላሽ ሰብሎች</h3><p>ቀዝቃዛ ማከማቻ፣ አየር ማስገቢያ።</p><h2>ትራንስፖርት</h2><p>ንጹህ፣ የተሸፈነ ተሽከርካሪ።</p><h2>ማያያዝና መለያየት</h2><p>የተበላሹትን ያስወግዱ።</p><div class="info-box">ከመኸር በኋላ ኪሳራ የተባከነ ውሃና ጉልበት ነው።</div>` },
      om: { title: "Bulchiinsa Erga Makaraa fi Hir'isuu Badhaadhina Nyataa", desc: "Qabinsa gaarii, kuusaa fi geejjibni badhaadhina hir'isa.", body: `<p>Badhaadhiinni erga makaraa jiru guddaa ta'uu danda'a.</p><h2>Mala Makaraa</h2><p>Yeroo bilchaatu makari.</p><h2>Kuusaa</h2><h3>Kuusaa Midhaanii</h3><p>Goggogsi, qulqulleessi, kuusi.</p><h3>Midhaan Balleessitu</h3><p>Kuusaa qabbanaawaa.</p><h2>Geejjiba</h2><p>Konkolaataa qulqulluu.</p><h2>Qabinsa fi Filannoo</h2><p>Kan balleesse adda baasi.</p><div class="info-box">Badhaadhiin erga makaraa bishaan fi humna hojii dhoksaa ti.</div>` },
      so: { title: "Maaraynta Xilliga Goosashada iyo Dhimista Luminta Cuntada", desc: "Qabasho taxaddar leh, kaydin iyo gaadiid waxay yareeyaan luminta.", body: `<p>Luminta goosashada kadib waxay gaari kartaa heer sare.</p><h2>Hababka Goosashada</h2><p>Gooso bisaylka saxda ah.</p><h2>Kaydinta</h2><h3>Kaydinta Hadhuudhka</h3><p>Qalajiso, nadiifi, ku kaydi weelasha.</p><h3>Dalagyada Dhaqso u Halakha</h3><p>Kaydin qabow.</p><h2>Gaadiidka</h2><p>Baabuur nadiif ah.</p><h2>Qabasho iyo Kala-saarid</h2><p>Ka saar kuwa xumaaday.</p><div class="info-box">Luminta goosashadu waa biyo iyo shaqo lumay.</div>` },
      ti: { title: "ምሕደራ ድሕሪ ዓመጻን ምንካይ ጥፍኣት መግብን", desc: "ጥንቃቐ ምሓዝ፣ ምኽዛንን መጓዓዝያን ጥፍኣት ይንክፉ።", body: `<p>ጥፍኣት ድሕሪ ዓመጻ ዓቢ ክኸውን ይኽእል።</p><h2>ልምድታት ዓመጻ</h2><p>ብትኽክለኛ ደረጃ ብስለት ኣመጽኡ።</p><h2>ምኽዛን</h2><h3>ምኽዛን እህል</h3><p>ደረቕ፣ ጹሩይ፣ ኣየር ዘይኣቱ።</p><h3>ተበላሽ ሰብልታት</h3><p>ቀዝቃዛ ምኽዛን።</p><h2>መጓዓዝያ</h2><p>ጹሩይ መኪና።</p><h2>ምሓዝን ምፍላይን</h2><p>ዝተበላሸወ ኣወግዱ።</p><div class="info-box">ጥፍኣት ድሕሪ ዓመጻ ዝተባኸነ ማይን ጻሕምን እዩ።</div>` }
    }
  },
  {
    id: 15, cat: "research", image: IMG.a15, date: "2025-03-24", readingMin: 7,
    tr: {
      en: { title: "The Importance of Agricultural Research and Innovation", desc: "Research drives improved varieties, better practices, and resilient food systems.", body: `<p>Agricultural research generates the knowledge, technologies, and improved varieties that underpin modern farming. Innovation ensures that agriculture can meet growing food demand sustainably.</p><h2>Types of Agricultural Research</h2><ul><li><strong>Basic research:</strong> understanding plant biology, soil processes, and pest ecology.</li><li><strong>Applied research:</strong> developing practical solutions for farmers.</li><li><strong>Adaptive research:</strong> testing technologies in local conditions.</li></ul><h2>Improved Crop Varieties</h2><p>Plant breeding has delivered higher-yielding, drought-tolerant, and disease-resistant varieties. These are critical to food security.</p><h2>Research Institutions</h2><p>National agricultural research systems, universities, and international centers collaborate to solve shared challenges.</p><h2>Innovation</h2><p>Innovation extends beyond technology to include new practices, market models, and farmer organizations.</p><div class="info-box">Research only delivers value when its results reach farmers. Extension, training, and farmer participation are essential.</div>` },
      am: { title: "የግብርና ምርምርና ፈጠራ ጠቀሜታ", desc: "ምርምር የተሻሻሉ ዝርያዎችንና የተሻሉ ልምምዶችን ያመጣል።", body: `<p>የግብርና ምርምር ለዘመናዊ እርሻ መሰረት የሆነ ዕውቀትና ቴክኖሎጂ ያመነጫል።</p><h2>የምርምር ዓይነቶች</h2><ul><li>መሰረታዊ ምርምር</li><li>ተግባራዊ ምርምር</li><li>መላመድ ምርምር</li></ul><h2>የተሻሻሉ ዝርያዎች</h2><p>ከፍተኛ ምርት፣ ድርቅን የሚቋቋሙ፣ በሽታን የሚቋቋሙ።</p><h2>የምርምር ተቋማት</h2><p>ብሔራዊ ስርዓቶች፣ ዩኒቨርሲቲዎች፣ ዓለም አቀፍ ማዕከላት።</p><h2>ፈጠራ</h2><p>ከቴክኖሎጂ በላይ — አዲስ ልምምዶች፣ የገበያ ሞዴሎች።</p><div class="info-box">ምርምር ወደ ገበሬው ሲደርስ ብቻ ጠቀሜታ ይኖረዋል።</div>` },
      om: { title: "Barbaachisummaa Qorannoo fi Kalaqaa Qonnaa", desc: "Qorannoon sanyii fooyya'aa fi mala gaarii fida.", body: `<p>Qorannoon qonnaa beekumsa fi teeknoolojii qonnaa ammayyaaf bu'uura ta'e dhalcha.</p><h2>Gosaalee Qorannoo</h2><ul><li>Bu'uuraa</li><li>Hojii irra ooluu</li><li>Mijachuu</li></ul><h2>Sanyii Fooyya'aa</h2><p>Oomisha ol'aanaa, gogaa dandau, dhukkuba dandau.</p><h2>Dhaabbilee Qorannoo</h2><p>Sirna biyyooleessaa, yuunivarsiitii fi giddugala idil-addunyaa.</p><h2>Kalaqaa</h2><p>Teeknoolojii caalaa — mala haaraa fi moodeela gabaa.</p><div class="info-box">Qorannoon yeroo bu'aan isaa qonnaan bulaa bira gahe qofa faayidaa qaba.</div>` },
      so: { title: "Muhiimadda Cilmi-baadhista iyo Hal-abuurka Beeraha", desc: "Cilmi-baadhistu waxay keentaa noocyo hagaagsan iyo habab wanaagsan.", body: `<p>Cilmi-baadhista beertu waxay soo saartaa aqoon iyo tignoolajiyo.</p><h2>Noocyada Cilmi-baadhista</h2><ul><li>Aasaasi</li><li>Wax ku ool</li><li>La qabsasho</li></ul><h2>Noocyada Dalagga Hagaagsan</h2><p>Wax soo saar sare, u adkaysta abaaraha iyo cudurrada.</p><h2>Machadyada Cilmi-baadhista</h2><p>Nidaamyada qaranka, jaamacadaha iyo xarumaha caalamiga.</p><h2>Hal-abuur</h2><p>Ka baxsan tignoolajiyada — habab cusub iyo moodoallo suuq.</p><div class="info-box">Cilmi-baadhistu waxay qiimo leedahay marka natiijooyinku gaaraan beeraleyda.</div>` },
      ti: { title: "ኣገዳስነት ምርምርን ፈጠራን ሕርሻ", desc: "ምርምር ዝተመሓየሸ ዓይነትን ዝሓሸ ልምድን የምጽእ።", body: `<p>ምርምር ሕርሻ ንዘመናዊ ሕርሻ መሰረት ዝኾነ ፍልጠትን ቴክኖሎጂን ይፈጥር።</p><h2>ዓይነታት ምርምር</h2><ul><li>መሰረታዊ</li><li>ተግባራዊ</li><li>ምምጣን</li></ul><h2>ዝተመሓየሸ ዓይነት</h2><p>ልዑል ምርቲ፣ ድርቂ ዝጻሕል፣ ሕማም ዝጻሕል።</p><h2>ትካላት ምርምር</h2><p>ሃገራዊ ስርዓታት፣ ዩኒቨርሲቲታት፣ ዓለምለኻዊ ማእከላት።</p><h2>ፈጠራ</h2><p>ልዕሊ ቴክኖሎጂ — ሓድሽ ልምድታትን ሞዴላት ዕዳጋን።</p><div class="info-box">ምርምር ናብ ሓረስታይ ምስ በጽሐ ጥራይ ጥቕሚ ኣለዎ።</div>` }
    }
  },
  {
    id: 16, cat: "livestock", image: IMG.a16, date: "2025-03-28", readingMin: 6,
    tr: {
      en: { title: "Understanding Livestock Integration in Crop Farming", desc: "Mixed farming combines crops and livestock for stronger, more resilient farms.", body: `<p>Integrating livestock with crop farming — mixed farming — is a time-tested strategy that improves resource use, diversifies income, and builds soil fertility.</p><h2>Benefits of Integration</h2><h3>Manure and Soil Fertility</h3><p>Animal manure provides organic matter and nutrients, reducing the need for synthetic fertilizers.</p><h3>Draft Power</h3><p>Oxen and other animals provide traction for plowing and transport.</p><h3>Income Diversification</h3><p>Milk, meat, eggs, and hides add income streams and reduce risk.</p><h3>Feed from Crop Residues</h3><p>Crop residues — straw, stover, and haulms — feed animals, closing the nutrient loop.</p><div class="info-box">A well-integrated farm recycles nutrients within the system, reducing external inputs and improving resilience.</div><h2>Management Considerations</h2><ul><li>Balance stocking rates to available feed.</li><li>Manage manure properly to avoid nutrient loss.</li><li>Protect crops from animal damage.</li><li>Plan grazing and crop cycles together.</li></ul>` },
      am: { title: "በሰብል እርሻ ውስጥ የእንስሳት ውህደትን መረዳት", desc: "ቅልቅል እርሻ ሰብልና እንስሳትን ያጣምራል።", body: `<p>እንስሳትን ከሰብል እርሻ ጋር ማዋሃድ የተረጋገጠ ስልት ነው።</p><h2>ጥቅሞች</h2><h3>ፍግና የአፈር ለምነት</h3><p>የእንስሳት ፍግ ኦርጋኒክ ቁስና ንጥረ ነገር ያቀርባል።</p><h3>የጉልበት ኃይል</h3><p>በሬዎች ለማረስና ለመጓጓዣ።</p><h3>የገቢ ልዩነት</h3><p>ወተት፣ ሥጋ፣ እንቁላል፣ ቆዳ።</p><h3>ከሰብል ቅሪት መኖ</h3><p>ገለባ፣ ቅሪት ለእንስሳት።</p><div class="info-box">በደንብ የተዋሃደ እርሻ ንጥረ ነገርን ይመላለሳል።</div><h2>የአስተዳደር ጉዳዮች</h2><ul><li>የእንስሳት ብዛትና መኖ ሚዛን።</li><li>ፍግን በአግባቡ ማስተዳደር።</li><li>ሰብልን ከእንስሳት ጉዳት መጠበቅ።</li></ul>` },
      om: { title: "Walitti Makamuu Beeyladaa Qonnaa Midhaanii Keessatti Hubachuu", desc: "Qonnaan walmakaa midhaanii fi beeylada walitti fida.", body: `<p>Beeylada midhaanii wajjin walitti makuun mala durii fi gaarii ti.</p><h2>Faayidaa</h2><h3>Kosii fi Oomishtummaa</h3><p>Kosiin beeyladaa orgaankii fi soorata dhiyeessa.</p><h3>Humna Hojii</h3><p>Qotiyyoonni qotuuf geejjibuuf.</p><h3>Galii Addaddaa</h3><p>Aannan, foon, killee, gogaa.</p><h3>Nyaata Haftee Midhaanii</h3><p>Hafteen midhaanii beeyladoota nyaachisa.</p><div class="info-box">Qonnaan gaariin walitti makame soorata naanna'a.</div><h2>Bulchiinsa</h2><ul><li>Baay'ina beeyladaa fi nyaata walqixxeessi.</li><li>Kosii gaarii bulchi.</li><li>Midhaan beeyladarraa eegi.</li></ul>` },
      so: { title: "Fahanka Isku-dhafka Xoolaha ee Beeraha Dalagga", desc: "Beeraha isku dhafan waxay isku daraan dalagyo iyo xoolo.", body: `<p>Isku-darka xoolaha iyo beeraha dalaggu waa istaraatijiyad la tijaabiyay.</p><h2>Faa'iidooyinka</h2><h3>Digo iyo Bacrinta Ciidda</h3><p>Digada xooluhu waxay bixisaa walxo organic iyo nafaqooyin.</p><h3>Awoodda Shaqada</h3><p>Dibiyada ayaa loo isticmaalaa beerashada iyo gaadiidka.</p><h3>Kala-duwanaanta Dakhliga</h3><p>Caano, hilib, ukun, harag.</p><h3>Cunto ka timaadda Hadhaaga Dalagga</h3><p>Hadhaaga dalagga ayaa xoolaha quudiya.</p><div class="info-box">Beer isku dhafan oo wanaagsan waxay dib u warshadeysaa nafaqooyinka.</div><h2>Tixgelinta Maaraynta</h2><ul><li>Isku dheelli tir tirada xoolaha iyo cuntada.</li><li>Si wanaagsan u maaree digada.</li><li>Ka ilaali dalagyada waxyeellada xoolaha.</li></ul>` },
      ti: { title: "ውህደት ጥሪት ኣብ ሕርሻ ሰብሊ ምርዳእ", desc: "ቅልቅል ሕርሻ ሰብልን ጥሪትን የሕውስ።", body: `<p>ጥሪት ምስ ሕርሻ ሰብሊ ምሕዋስ ዝተረጋገጸ ስልቲ እዩ።</p><h2>ጥቕሚታት</h2><h3>ፍግን ለምነት መሬትን</h3><p>ፍግ ጥሪት ኦርጋኒክ ንጥረ ነገር የቕርብ።</p><h3>ሓይሊ ስራሕ</h3><p>ብራን ንምሕራስን ምጓዓዝን።</p><h3>ልዩነት እቶት</h3><p>ጸባ፣ ስጋ፣ እንቋቑሖ፣ ቈርበት።</p><h3>መግቢ ካብ ተረፍ ሰብሊ</h3><p>ሓረር፣ ተረፍ ንጥሪት።</p><div class="info-box">ብጽቡቕ ዝተዋሃሰ ሕርሻ ንጥረ ነገር ይዘውር።</div><h2>ምሕደራ</h2><ul><li>ብዝሒ ጥሪትን መግብን ሚዛን።</li><li>ፍግ ብግቡእ ምሕደራ።</li><li>ሰብሊ ካብ ጉድኣት ጥሪት ምሕላው።</li></ul>` }
    }
  },
  {
    id: 17, cat: "crop", image: IMG.a17, date: "2025-04-02", readingMin: 6,
    tr: {
      en: { title: "How to Improve Crop Productivity Through Proper Farm Management", desc: "Good planning, timely operations, and monitoring raise yields.", body: `<p>Productivity gains often come not from new technology but from better management — timely planting, proper field preparation, and careful monitoring throughout the season.</p><h2>Farm Planning</h2><p>Plan crop choices, rotations, and input requirements before the season begins. Align planting with expected rainfall and market demand.</p><h2>Field Preparation</h2><p>Prepare land properly — appropriate tillage, leveling, and residue management create a good seedbed.</p><h2>Planting</h2><p>Use quality seed, correct spacing, and proper depth. Plant at the right time to match rains.</p><h2>Crop Monitoring</h2><p>Scout regularly for weeds, pests, diseases, and nutrient deficiencies. Early action prevents major losses.</p><h2>Weed Management</h2><p>Weeds compete for water, light, and nutrients. Timely weeding — especially early in the season — protects yields.</p><div class="info-box">Consistent attention to detail across the season is often what separates good yields from average ones.</div>` },
      am: { title: "በትክክለኛ የእርሻ አስተዳደር የሰብል ምርታማነትን እንዴት ማሻሻል ይቻላል", desc: "ጥሩ እቅድ፣ ወቅታዊ ስራና ክትትል ምርትን ይጨምራሉ።", body: `<p>የምርታማነት ጭማሪ ብዙውን ጊዜ ከአዲስ ቴክኖሎጂ ሳይሆን ከተሻለ አስተዳደር ይመጣል።</p><h2>የእርሻ እቅድ</h2><p>ከወቅቱ በፊት ሰብል፣ ሽግግርና ግብዓት ያቅዱ።</p><h2>የመሬት ዝግጅት</h2><p>ተገቢ ማረስ፣ ማስተካከል።</p><h2>መዝራት</h2><p>ጥራት ያለው ዘር፣ ትክክለኛ ርቀት፣ ትክክለኛ ጥልቀት።</p><h2>የሰብል ክትትል</h2><p>አረም፣ ተባይ፣ በሽታ ይከታተሉ።</p><h2>የአረም አስተዳደር</h2><p>ወቅታዊ አረም ማረም።</p><div class="info-box">በወቅቱ የተደረገ ትኩረት ጥሩ ምርትን ከመካከለኛ ይለያል።</div>` },
      om: { title: "Bulchiinsa Qonnaa Gaariin Oomisha Midhaanii Akkamitti Fooyyessuu", desc: "Karoora gaarii, hojii yeroo fi hordoffiin oomisha dabalu.", body: `<p>Oomishni caalaatti bulchiinsa gaarii irraa dhufa.</p><h2>Karoora Qonnaa</h2><p>Duraan midhaan, waljijjiirraa fi galtee karoorfadhu.</p><h2>Qophii Lafa</h2><p>Qotii gaarii, walqixxeessuu.</p><h2>Facaasuu</h2><p>Sanyii gaarii, fageenya sirrii.</p><h2>Hordoffii Midhaanii</h2><p>Aramaa, ilbisa, dhukkuba hordofi.</p><h2>Bulchiinsa Aramaa</h2><p>Aramaa yeroo irratti haqi.</p><div class="info-box">Xiyyeeffannaan yeroo hunda oomisha gaarii adda baasa.</div>` },
      so: { title: "Sida Wax-soo-saarka Dalagga Loogu Hagaajin karo Maaraynta Beerta", desc: "Qorshe wanaagsan iyo kormeer joogto ah ayaa kordhiya wax soo saarka.", body: `<p>Kororka wax soo saarku inta badan wuxuu ka yimaadaa maarayn wanaagsan.</p><h2>Qorsheynta Beerta</h2><p>Kahor xilliga qorshee dalagyada iyo wareegga.</p><h2>Diyaarinta Dhulka</h2><p>Qodis ku habboon iyo simid.</p><h2>Beerista</h2><p>Abuur tayo leh, masaafo sax ah.</p><h2>Kormeerka Dalagga</h2><p>Kormeer haramaha, cayayaanka iyo cudurrada.</p><h2>Maaraynta Haramaha</h2><p>Goynta haramaha waqtigeeda.</p><div class="info-box">Feejignaan joogto ah ayaa kala soocda goosashada wanaagsan.</div>` },
      ti: { title: "ብትኽክለኛ ምሕደራ ሕርሻ ምርታማነት ሰብሊ ከመይ ገይርካ ተመሓይሽ", desc: "ጽቡቕ ምድራሻ፣ ወቕታዊ ስራሕን ክትትልን ምርቲ ይውስኹ።", body: `<p>ውሳኸ ምርታማነት መብዛሕትኡ ካብ ሓድሽ ቴክኖሎጂ ዘይኮነ ካብ ዝሓሸ ምሕደራ ይመጽእ።</p><h2>ምድራሻ ሕርሻ</h2><p>ቅድሚ ወቕቲ ሰብሊ፣ ምልዋጥን ግብዓትን መድርሹ።</p><h2>ምድላው መሬት</h2><p>ተገቢ ምሕራስን ምስትኽኻንን።</p><h2>ምዝራእ</h2><p>ዓቐን ዘርኢ፣ ትኽክለኛ ርሕቀት።</p><h2>ክትትል ሰብሊ</h2><p>ሓረር፣ ተባዕ፣ ሕማም ተኸታተሉ።</p><h2>ምሕደራ ሓረር</h2><p>ወቕታዊ ምሕራስ ሓረር።</p><div class="info-box">ወቕታዊ ቆልፍነት ጽቡቕ ምርቲ ይፈልይ።</div>` }
    }
  },
  {
    id: 18, cat: "sustainable", image: IMG.a18, date: "2025-04-08", readingMin: 5,
    tr: {
      en: { title: "The Role of Bees and Pollinators in Agriculture", desc: "Pollinators are essential for many crops — protecting them protects harvests.", body: `<p>Pollinators — bees, butterflies, birds, and other animals — transfer pollen between flowers, enabling fertilization and fruit production. Many crops depend partly or entirely on pollinators.</p><h2>Why Pollinators Matter</h2><p>Crops like coffee, fruit trees, vegetables, and oilseeds benefit from pollination. Pollinator-dependent crops often have higher quality and yield.</p><h2>Threats to Pollinators</h2><ul><li>Pesticide exposure, especially during flowering.</li><li>Loss of flowering plants and habitat.</li><li>Monoculture and reduced biodiversity.</li><li>Climate change affecting flowering times.</li></ul><h2>Protecting Pollinators</h2><ul><li>Reduce pesticide use and time applications to avoid bloom.</li><li>Plant flowering borders and hedgerows.</li><li>Provide nesting sites — bare ground, wood, and stems.</li><li>Preserve natural habitat around farms.</li></ul><div class="info-box">Bees and other pollinators are farm workers. Protecting them is protecting productivity and biodiversity together.</div>` },
      am: { title: "የንብና አበን ሚና በግብርና", desc: "አበኖች ለብዙ ሰብሎች አስፈላጊ ናቸው።", body: `<p>አበኖች — ንቦች፣ ቢራቢሮዎች፣ ወፎች — የአበባ ዱቄትን ያስተላልፋሉ።</p><h2>ለምን አስፈላጊ ናቸው</h2><p>ቡና፣ ፍራፍሬ፣ አትክልት፣ ዘይት ዘር።</p><h2>ስጋቶች</h2><ul><li>ፀረ-ተባይ መድኃኒት</li><li>የአበባ ዕፅዋት መጥፋት</li><li>ሞኖካልቸር</li><li>የአየር ንብረት ለውጥ</li></ul><h2>መጠበቅ</h2><ul><li>ፀረ-ተባይ አጠቃቀምን ይቀንሱ።</li><li>የአበባ ዕፅዋት ይትከሉ።</li><li>የጎጆ ቦታ ያቅርቡ።</li><li>ተፈጥሮን ይጠብቁ።</li></ul><div class="info-box">ንቦች የእርሻ ሰራተኞች ናቸው።</div>` },
      om: { title: "Gahee Kannisaaniifi Abbaa Dammaa Qonnaa Keessatti", desc: "Abbaan dammaa midhaan baay'ee barbaachisaa ti.", body: `<p>Abbaan dammaa — kannisaa, billaacha, simbira — daakuu daraaraa dabarsu.</p><h2>Maaliif Barbaachisu</h2><p>Buna, fuduraa, kuduraa, sanyii zaytii.</p><h2>Balaawwan</h2><ul><li>Qoricha ilbisaa</li><li>Dhabamuu biqiltuu daraaraa</li><li>Monokaltii</li><li>Jijjiirama qilleensaa</li></ul><h2>Eeguu</h2><ul><li>Qoricha hir'isi.</li><li>Biqiltuu daraaraa facaasi.</li><li>Bakka manaa dhiyeessi.</li><li>Naannoo eegi.</li></ul><div class="info-box">Kannisoonni hojjettoota qonnaa ti.</div>` },
      so: { title: "Doorka Shinnida iyo Wax-ka-beddelayaasha ee Beeraha", desc: "Wax-ka-beddelayaashu waxay muhiim u yihiin dalagyo badan.", body: `<p>Wax-ka-beddelayaasha — shinni, balanbaalis, shimbiraha — waxay gudbiyaan manka ubaxa.</p><h2>Sababta Ay Muhiim u Yihiin</h2><p>Qaxwo, miraha, khudaarta, iniinaha saliidda.</p><h2>Khataraha</h2><ul><li>Sunta cayayaanka</li><li>Luminta dhirta ubaxa</li><li>Hal-dalag</li><li>Isbeddelka cimilada</li></ul><h2>Ilaalinta</h2><ul><li>Yaree sunta cayayaanka.</li><li>Beer dhirta ubaxa.</li><li>Bixi goobo buulal.</li><li>Ilaali deegaanka.</li></ul><div class="info-box">Shinnidu waa shaqaale beereed.</div>` },
      ti: { title: "ግደ ንህብን ኣበንን ኣብ ሕርሻ", desc: "ኣበናት ንብዙሕ ሰብሊ ኣገደስቲ እዮም።", body: `<p>ኣበናት — ንህብ፣ ጽምብላሊዕ፣ ኣዕዋፍ — ዱቄት ዕምባባ የመሓላልፉ።</p><h2>ስለምንታይ ኣገደስቲ</h2><p>ቡን፣ ፍረ፣ ኣሕምልቲ፣ ዘይቲ ዘርኢ።</p><h2>ስጋታት</h2><ul><li>መድሃኒት ተባዕ</li><li>ምጥፋእ ዕብላት ዕምባባ</li><li>ሞኖካልቸር</li><li>ለውጢ ኣየር ንብረት</li></ul><h2>ምሕላው</h2><ul><li>ኣጠቓቕማ መድሃኒት ተባዕ ንንክፉ።</li><li>ዕብላት ዕምባባ ተኽሉ።</li><li>ቦታ ጎጆ ኣዘጋጅቡ።</li><li>ተፈጥሮ ሓልዉ።</li></ul><div class="info-box">ንህቢ ሰራሕቲ ሕርሻ እዮም።</div>` }
    }
  },
  {
    id: 19, cat: "tech", image: IMG.a19, date: "2025-04-14", readingMin: 6,
    tr: {
      en: { title: "Agricultural Digital Platforms and Market Access", desc: "Digital platforms connect farmers to buyers, information, and better prices.", body: `<p>Digital platforms are reshaping how farmers access markets, information, and financial services. From SMS market price alerts to full online marketplaces, digital tools reduce information gaps and transaction costs.</p><h2>Types of Platforms</h2><h3>Market Information</h3><p>SMS and apps provide real-time prices, demand trends, and buyer contacts.</p><h3>Online Marketplaces</h3><p>Farmers can list produce, negotiate, and arrange delivery directly with buyers.</p><h3>Advisory Services</h3><p>Extension apps, chat bots, and video content deliver agronomic advice.</p><h3>Financial Services</h3><p>Mobile payments, savings, insurance, and credit are increasingly accessible.</p><div class="info-box">Digital platforms work best when combined with trust, quality assurance, and reliable logistics.</div><h2>Challenges</h2><ul><li>Digital literacy and language.</li><li>Network coverage and electricity.</li><li>Trust in online transactions.</li><li>Affordability of devices and data.</li></ul><p>Addressing these barriers requires partnership among governments, cooperatives, private companies, and development organizations.</p>` },
      am: { title: "የግብርና ዲጂታል መድረኮችና የገበያ ተደራሽነት", desc: "ዲጂታል መድረኮች ገበሬዎችን ከገዢዎችና መረጃ ጋር ያገናኛሉ።", body: `<p>ዲጂታል መድረኮች የገበሬዎችን የገበያ ተደራሽነት ይለውጣሉ።</p><h2>ዓይነቶች</h2><h3>የገበያ መረጃ</h3><p>SMSና አፕሊኬሽኖች የዋጋ መረጃ ያቀርባሉ።</p><h3>የመስመር ላይ ገበያ</h3><p>ገበሬዎች ምርታቸውን ይዘረዝራሉ።</p><h3>የምክር አገልግሎቶች</h3><p>የኤክስቴንሽን አፕሊኬሽኖች።</p><h3>የፋይናንስ አገልግሎቶች</h3><p>ሞባይል ክፍያ፣ ቁጠባ፣ ዋስትና።</p><div class="info-box">ዲጂታል መድረኮች ከእምነትና ጥራት ጋር ሲዋሃዱ ይሰራሉ።</div><h2>ተግዳሮቶች</h2><ul><li>ዲጂታል ክህሎት</li><li>የኔትወርክ ሽፋን</li><li>በመስመር ላይ ግብይት እምነት</li><li>የመሳሪያ ወጪ</li></ul>` },
      om: { title: "Waltajjii Dijitaalaa Qonnaa fi Argannoo Gabaa", desc: "Waltajjiin dijitaalaa qonnaan bultoota bitattootaa fi odeeffannoo wajjin walqunnamsiisa.", body: `<p>Waltajjiin dijitaalaa akkaataa qonnaan bulaan gabaa akka argatu jijjiira.</p><h2>Gosaalee</h2><h3>Odeeffannoo Gabaa</h3><p>SMS fi appilikeeshinii gatii dhiyeessu.</p><h3>Gabaa Onlaayinii</h3><p>Qonnaan bulaan oomisha isaa galmeessa.</p><h3>Tajaajila Gorsaa</h3><p>Appilikeeshinii ekisteenshinii.</p><h3>Tajaajila Faayinaansii</h3><p>Kaffaltii mobaayilaa, qusannoo, inshuraansii.</p><div class="info-box">Waltajjiin dijitaalaa amanamummaa wajjin yoo makame hojjeta.</div><h2>Rakkoolee</h2><ul><li>Dandeettii dijitaalaa</li><li>Qunnamtii neetwoorkii</li><li>Amanamummaa</li><li>Baasii meeshaa</li></ul>` },
      so: { title: "Madallada Dijitaalka Beeraha iyo Helitaanka Suuqa", desc: "Madallada dijitaalku waxay beeraleyda ku xiraan iibsadayaal iyo macluumaad.", body: `<p>Madallada dijitaalku waxay beddelaan sida beeraleydu u helaan suuqyada.</p><h2>Noocyada</h2><h3>Macluumaadka Suuqa</h3><p>SMS iyo apps waxay bixiyaan qiimaha.</p><h3>Suuqyada Online</h3><p>Beeraleydu waxay ku qoraan wax soo saarkooda.</p><h3>Adeegyada Talo</h3><p>Apps-ka fidinta.</p><h3>Adeegyada Maaliyadeed</h3><p>Lacag-bixin mobil, kaydin, caymis.</p><div class="info-box">Madallada dijitaalku waxay si fiican u shaqeeyaan marka la isku daro kalsoonida.</div><h2>Caqabadaha</h2><ul><li>Aqoonta dijitaalka</li><li>Daboolka shabakadda</li><li>Kalsoonida</li><li>Qiimaha qalabka</li></ul>` },
      ti: { title: "ዲጂታል መድረኻት ሕርሻን ተበጻሕነት ዕዳጋን", desc: "ዲጂታል መድረኻት ሓረስቶት ምስ ዓደግትን መረዳእታን የራኽቡ።", body: `<p>ዲጂታል መድረኻት ኣገባብ ሓረስቶት ዕዳጋ የለውጡ።</p><h2>ዓይነታት</h2><h3>መረዳእታ ዕዳጋ</h3><p>SMSን ኣፕሊኬሽናትን ዋጋ የቕርቡ።</p><h3>ኦንላይን ዕዳጋ</h3><p>ሓረስቶት ምርቶም ይመዝግቡ።</p><h3>ኣገልግሎት ምኽሪ</h3><p>ኣፕሊኬሽናት ኤክስቴንሽን።</p><h3>ኣገልግሎት ፋይናንስ</h3><p>ክፍሊት ሞባይል፣ ቁጠባ፣ ዋስትና።</p><div class="info-box">ዲጂታል መድረኻት ምስ እምነትን ዓቐንን ምስ ተሓወሱ ይሰርሑ።</div><h2>ብጽሕታት</h2><ul><li>ዲጂታል ክእለት</li><li>ሽፋን ኔትወርክ</li><li>እምነት</li><li>ወጻኢ መሳርሒ</li></ul>` }
    }
  },
  {
    id: 20, cat: "research", image: IMG.a20, date: "2025-04-20", readingMin: 8,
    tr: {
      en: { title: "The Future of Agriculture in Ethiopia", desc: "Modernization, youth participation, and technology shape the future of Ethiopian farming.", body: `<p>Ethiopia's agricultural future depends on how well the sector modernizes, engages its youth, and adopts technology while preserving its natural resources.</p><h2>Modernization</h2><p>Modernization includes improved inputs, mechanization where appropriate, better infrastructure, and stronger market linkages. It does not mean abandoning traditional knowledge — it means building on it.</p><h2>Youth Participation</h2><p>Young people are key to agricultural renewal. Access to land, credit, training, and digital tools can make farming an attractive and profitable career.</p><h2>Technology</h2><p>Digital advisory services, mobile payments, and precision tools are expanding. Their value grows when combined with training and local content.</p><h2>Sustainable Development</h2><p>Long-term success requires soil conservation, efficient water use, and protection of biodiversity — the natural capital on which agriculture depends.</p><h2>Food Security</h2><p>Investing in research, extension, infrastructure, and climate resilience will strengthen food security and rural livelihoods.</p><div class="info-box">The future of Ethiopian agriculture is not a single innovation — it is the combination of many improvements, applied consistently.</div><p>Farmers, researchers, policymakers, and the private sector each have a role. Collaboration will determine how fast and how far agriculture can grow.</p>` },
      am: { title: "የኢትዮጵያ ግብርና የወደፊት ሁኔታ", desc: "ዘመናዊነት፣ የወጣቶች ተሳትፎና ቴክኖሎጂ የኢትዮጵያን እርሻ ወደፊት ይቀርጻሉ።", body: `<p>የኢትዮጵያ ግብርና ወደፊት ዘመናዊነት፣ የወጣቶች ተሳትፎና ቴክኖሎጂ ላይ የተመሰረተ ነው።</p><h2>ዘመናዊነት</h2><p>የተሻሻሉ ግብዓቶች፣ ሜካናይዜሽን፣ መሠረተ ልማት።</p><h2>የወጣቶች ተሳትፎ</h2><p>መሬት፣ ብድር፣ ስልጠና፣ ዲጂታል መሳሪያ።</p><h2>ቴክኖሎጂ</h2><p>ዲጂታል ምክር፣ ሞባይል ክፍያ፣ ትክክለኛ መሳሪያ።</p><h2>ዘላቂ ልማት</h2><p>የአፈር ጥበቃ፣ ቀልጣፋ የውሃ አጠቃቀም፣ ብዝሃ ሕይወት ጥበቃ።</p><h2>የምግብ ዋስትና</h2><p>በምርምር፣ በኤክስቴንሽን፣ በመሠረተ ልማት ኢንቨስት ማድረግ።</p><div class="info-box">የኢትዮጵያ ግብርና ወደፊት አንድ ፈጠራ አይደለም — ብዙ ማሻሻዎች ጥምረት ነው።</div>` },
      om: { title: "Fuuldura Qonnaa Itoophiyaa", desc: "Ammayyummaan, hirmaannaan dargaggootaa fi teeknoolojiin fuuldura qonnaa Itoophiyaa bocu.", body: `<p>Fuuldura qonnaa Itoophiyaa ammayyummaa, hirmaannaa dargaggootaa fi teeknoolojii irratti hundaa'a.</p><h2>Ammayyummaa</h2><p>Galtee fooyya'aa, meeshaastummaa, bu'uura misoomaa.</p><h2>Hirmaannaa Dargaggootaa</h2><p>Lafa, liqii, leenjii, meeshaa dijitaalaa.</p><h2>Teeknoolojii</h2><p>Gorsa dijitaalaa, kaffaltii mobaayilaa.</p><h2>Misooma Itti Fufiinsa Qabu</h2><p>Eeguu biyyee, bishaan gaarii, baay'ina lubbu qabeeyyii.</p><h2>Nageenya Nyataa</h2><p>Qorannoo, ekisteenshinii, bu'uura misoomaa irratti invastimentii.</p><div class="info-box">Fuuldura qonnaa Itoophiyaa kalaqa tokko miti — fooyya'iinsa baay'ee walitti fida.</div>` },
      so: { title: "Mustaqbalka Beeraha Itoobiya", desc: "Casriyeyn, ka-qaybgalka dhalinyarada iyo tignoolajiyadu waxay qaabeeyaan mustaqbalka.", body: `<p>Mustaqbalka beeraha Itoobiya wuxuu ku xiran yahay casriyeyn, ka-qaybgalka dhalinyarada iyo tignoolajiyada.</p><h2>Casriyeyn</h2><p>Agab hagaagsan, mishiinad, kaabayaasha.</p><h2>Ka-qaybgalka Dhalinyarada</h2><p>Dhul, deyn, tababar, qalab dijitaal ah.</p><h2>Tignoolajiyad</h2><p>Talo dijitaal ah, lacag-bixin mobil.</p><h2>Horumar Waara</h2><p>Ilaalinta ciidda, isticmaalka biyaha hufan, kala-duwanaanta noolaha.</p><h2>Amniga Cuntada</h2><p>Maalgashi cilmi-baadhis, fidin, kaabayaal.</p><div class="info-box">Mustaqbalka beeraha Itoobiya ma aha hal hal-abuur — waa isku-dhafnaan horumarro badan.</div>` },
      ti: { title: "መጻኢ ሕርሻ ኢትዮጵያ", desc: "ዘመናውነት፣ ተሳትፎ መንእሰያትን ቴክኖሎጂን መጻኢ ሕርሻ ኢትዮጵያ ይቕርጹ።", body: `<p>መጻኢ ሕርሻ ኢትዮጵያ ኣብ ዘመናውነት፣ ተሳትፎ መንእሰያትን ቴክኖሎጂን ይምርኮስ።</p><h2>ዘመናውነት</h2><p>ዝተመሓየሸ ግብዓት፣ ሜካናይዜሽን፣ መሰረተ ልማት።</p><h2>ተሳትፎ መንእሰያት</h2><p>መሬት፣ ልቓሕ፣ ስልጠና፣ ዲጂታል መሳርሒ።</p><h2>ቴክኖሎጂ</h2><p>ዲጂታል ምኽሪ፣ ክፍሊት ሞባይል።</p><h2>ዘላቒ ልማት</h2><p>ምሕላው መሬት፣ ቀልጣፋ ማይ፣ ብዝሒ ህይወት።</p><h2>ድሕንነት መግቢ</h2><p>ወፍሪ ኣብ ምርምር፣ ኤክስቴንሽን፣ መሰረተ ልማት።</p><div class="info-box">መጻኢ ሕርሻ ኢትዮጵያ ሓደ ፈጠራ ኣይኮነን — ሓያሎ መሕየሻታት ሓባር እዩ።</div>` }
    }
  }
];

const ALL_ARTICLES = [...ARTICLES, ...ARTICLES_REST];

/* ============================================================
   4. APP STATE
   ============================================================ */
const state = {
  lang: "en",
  category: "all",
  sort: "latest",
  reading: "all",
  search: ""
};

/* ============================================================
   5. HELPERS
   ============================================================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

function t(key) {
  return (UI[state.lang] && UI[state.lang][key]) || UI.en[key] || key;
}

function art(a) {
  return a.tr[state.lang] || a.tr.en;
}

function categoryLabel(catKey) {
  const c = CATEGORIES.find(c => c.key === catKey);
  return c ? t(c.labelKey) : catKey;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  try {
    return d.toLocaleDateString(state.lang === "am" ? "am-ET" :
      state.lang === "om" ? "om-ET" :
      state.lang === "so" ? "so-SO" :
      state.lang === "ti" ? "ti-ET" : "en-US",
      { year: "numeric", month: "long", day: "numeric" });
  } catch (e) {
    return iso;
  }
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ============================================================
   6. FILTER / SORT / SEARCH
   ============================================================ */
function getVisibleArticles() {
  let list = ALL_ARTICLES.slice();

  if (state.category !== "all") {
    list = list.filter(a => a.cat === state.category);
  }

  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    list = list.filter(a => {
      const tr = art(a);
      return (
        tr.title.toLowerCase().includes(q) ||
        tr.desc.toLowerCase().includes(q) ||
        tr.body.toLowerCase().includes(q)
      );
    });
  }

  if (state.reading !== "all") {
    list = list.filter(a => {
      if (state.reading === "under5") return a.readingMin < 5;
      if (state.reading === "5to10") return a.readingMin >= 5 && a.readingMin <= 10;
      if (state.reading === "above10") return a.readingMin > 10;
      return true;
    });
  }

  if (state.sort === "latest") {
    list.sort((x, y) => new Date(y.date) - new Date(x.date));
  } else if (state.sort === "oldest") {
    list.sort((x, y) => new Date(x.date) - new Date(y.date));
  } else if (state.sort === "relevant") {
    // Simple relevance: shorter reading time first within same category
    list.sort((x, y) => x.readingMin - y.readingMin);
  }

  return list;
}

/* ============================================================
   7. RENDERERS
   ============================================================ */
function renderCategoryChips() {
  const wrap = $("#categoryChips");
  wrap.innerHTML = "";
  CATEGORIES.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "chip" + (state.category === c.key ? " active" : "");
    btn.textContent = t(c.labelKey);
    btn.onclick = () => {
      state.category = c.key;
      renderAll();
    };
    wrap.appendChild(btn);
  });
}

function renderFeatured() {
  // Choose latest article as featured
  const featured = ALL_ARTICLES.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const tr = art(featured);
  const card = $("#featuredCard");
  card.innerHTML = `
    <div class="featured-image">
      <img src="${featured.image}" alt="${escapeHTML(tr.title)}" loading="lazy" />
      <span class="featured-label">${escapeHTML(t("featuredLabel"))}</span>
    </div>
    <div class="featured-body">
      <span class="cat-badge">${escapeHTML(categoryLabel(featured.cat))}</span>
      <h2>${escapeHTML(tr.title)}</h2>
      <p class="intro">${escapeHTML(tr.desc)}</p>
      <div class="featured-meta">
        <span>${escapeHTML(formatDate(featured.date))}</span>
        <span>·</span>
        <span>${featured.readingMin} ${escapeHTML(t("minRead"))}</span>
      </div>
      <button class="btn-primary" onclick="openArticle(${featured.id})">
        ${escapeHTML(t("readArticle"))}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;
}

function articleCardHTML(a) {
  const tr = art(a);
  return `
    <article class="article-card">
      <div class="card-image">
        <img src="${a.image}" alt="${escapeHTML(tr.title)}" loading="lazy" />
        <span class="cat-badge">${escapeHTML(categoryLabel(a.cat))}</span>
      </div>
      <div class="card-body">
        <h3><a href="#" onclick="openArticle(${a.id});return false;">${escapeHTML(tr.title)}</a></h3>
        <p class="card-desc">${escapeHTML(tr.desc)}</p>
        <div class="card-meta">
          <span>${escapeHTML(formatDate(a.date))}</span>
          <span>·</span>
          <span>${a.readingMin} ${escapeHTML(t("minRead"))}</span>
        </div>
        <a href="#" class="read-more" onclick="openArticle(${a.id});return false;">
          ${escapeHTML(t("readMore"))}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `;
}

function renderArticles() {
  const list = getVisibleArticles();
  const grid = $("#articleGrid");
  const empty = $("#emptyState");
  const resultsCount = $("#resultsCount");

  resultsCount.textContent = `${list.length} ${t("resultsFound")}`;

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = list.map(articleCardHTML).join("");
  }
}

function renderAll() {
  renderCategoryChips();
  renderFeatured();
  renderArticles();
  applyStaticTranslations();
}

/* ============================================================
   8. STATIC TRANSLATIONS
   ============================================================ */
function applyStaticTranslations() {
  $$("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    const val = t(k);
    if (val) el.textContent = val;
  });
  $$("[data-i18n-placeholder]").forEach(el => {
    const k = el.getAttribute("data-i18n-placeholder");
    const val = t(k);
    if (val) el.setAttribute("placeholder", val);
  });
  // Refresh select labels (they use <option data-i18n>)
  ["sortSelect", "readingSelect"].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const currentVal = sel.value;
    // Values persist; text nodes update via data-i18n above
    sel.value = currentVal;
  });
}

/* ============================================================
   9. ROUTING / VIEWS
   ============================================================ */
function showListing() {
  $("#listingView").style.display = "block";
  $("#readingView").style.display = "none";
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showReading() {
  $("#listingView").style.display = "none";
  $("#readingView").style.display = "block";
  window.scrollTo({ top: 0, behavior: "instant" });
}

function goHome(e) {
  if (e) e.preventDefault();
  showListing();
}

function goBackToArticles(e) {
  if (e) e.preventDefault();
  showListing();
}

let currentArticleId = null;

function openArticle(id) {
  currentArticleId = id;
  const a = ALL_ARTICLES.find(x => x.id === id);
  if (!a) return;
  const tr = art(a);

  $("#readImage").src = a.image;
  $("#readImage").alt = tr.title;
  $("#readCategory").textContent = categoryLabel(a.cat);
  $("#readDate").textContent = formatDate(a.date);
  $("#readTime").textContent = `${a.readingMin} ${t("minRead")}`;
  $("#readTitle").textContent = tr.title;
  $("#readAuthor").textContent = `${t("by")} AgriNova Editorial`;
  $("#readBody").innerHTML = tr.body;

  // Related articles: same category, excluding current
  let related = ALL_ARTICLES.filter(x => x.cat === a.cat && x.id !== a.id).slice(0, 3);
  if (related.length < 3) {
    const extra = ALL_ARTICLES.filter(x => x.id !== a.id && !related.includes(x)).slice(0, 3 - related.length);
    related = related.concat(extra);
  }

  $("#relatedGrid").innerHTML = related.map(r => {
    const rtr = art(r);
    return `
      <article class="article-card" onclick="openArticle(${r.id});return false;" style="cursor:pointer;">
        <div class="card-image">
          <img src="${r.image}" alt="${escapeHTML(rtr.title)}" loading="lazy" />
          <span class="cat-badge">${escapeHTML(categoryLabel(r.cat))}</span>
        </div>
        <div class="card-body">
          <h3>${escapeHTML(rtr.title)}</h3>
          <p class="card-desc">${escapeHTML(rtr.desc)}</p>
          <div class="card-meta">
            <span>${r.readingMin} ${escapeHTML(t("minRead"))}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  showReading();
}

/* ============================================================
   10. LANGUAGE SWITCHING
   ============================================================ */
function setLanguage(lang) {
  if (!UI[lang]) return;
  state.lang = lang;
  document.documentElement.lang = lang;
  document.getElementById("languageSelect").value = lang;

  // Preserve selected category & search automatically (they're in state)
  renderAll();

  if (currentArticleId && $("#readingView").style.display !== "none") {
    openArticle(currentArticleId);
  }
}

/* ============================================================
   11. EVENT WIRING
   ============================================================ */
function handleSearchSubmit(e) {
  e.preventDefault();
  const input = $("#searchInput");
  state.search = input.value;
  renderArticles();
  const target = document.getElementById("articlesSection");
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

function init() {
  // Bind selects
  $("#sortSelect").addEventListener("change", e => {
    state.sort = e.target.value;
    renderArticles();
  });
  $("#readingSelect").addEventListener("change", e => {
    state.reading = e.target.value;
    renderArticles();
  });
  $("#languageSelect").addEventListener("change", e => {
    setLanguage(e.target.value);
  });

  // Live search on typing
  let searchTimer;
  $("#searchInput").addEventListener("input", e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = e.target.value;
      renderArticles();
    }, 250);
  });

  // Hamburger menu
  $("#hamburger").addEventListener("click", () => {
    $("#mainNav").classList.toggle("open");
  });

  // Close nav on link click (mobile)
  $$("#mainNav a").forEach(a => a.addEventListener("click", () => {
    $("#mainNav").classList.remove("open");
  }));

  // Expose globals for inline handlers
  window.goHome = goHome;
  window.goBackToArticles = goBackToArticles;
  window.openArticle = openArticle;
  window.handleSearchSubmit = handleSearchSubmit;

  renderAll();
}

document.addEventListener("DOMContentLoaded", init);