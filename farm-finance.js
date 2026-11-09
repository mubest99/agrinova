(() => {
  "use strict";

  // =========================================================
  // SUPABASE CONFIGURATION — ENTER YOUR PROJECT DETAILS
  // =========================================================
  const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";

  const TABLES = {
    transactions: "finance_transactions",
    goals: "finance_goals",
    budgets: "finance_budgets",
    utilities: "finance_utilities"
  };

  const $ = (id) => document.getElementById(id);
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const money = (n) => new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(n || 0));

  const state = {
    db: null,
    farmerId: null,
    transactions: [],
    goals: [],
    budgets: [],
    utilities: [],
    range: "month",
    customStart: "",
    customEnd: "",
    timelinePeriod: "monthly",
    language: "en",
    charts: {
      timeline: null,
      expense: null,
      comparison: null
    }
  };

  // =========================================================
  // TRANSLATIONS
  // =========================================================
  const translations = {
    en: {
      tagline:"Growing Smarter. Farming Better.", farmerDashboard:"Farmer Dashboard",
      dashboardHome:"Dashboard Home",myFarm:"My Farm",myCrops:"My Crops",
      dailyFarm:"Daily Farm",tasksCalendar:"Farm Tasks & Calendar",
      farmRecords:"Farm Records",farmCalculator:"Farm Calculator",
      farmFinance:"Farm Finance",aiAssistant:"AI Agricultural Assistant",
      farmAnalysis:"Farm Analysis & ID",community:"Farmer Community",
      marketplace:"Marketplace",resources:"AgriNova Resources",
      articles:"Agriculture Articles",cropInformation:"Crop Information",
      cropMap:"Ethiopian Crop Map",weather:"Weather",pestLibrary:"Pest & Disease Library",
      fertilizer:"Fertilizer Information",agriNews:"Agriculture News",cropNews:"Crop News",
      innovation:"Agriculture Innovation",education:"Educational Content",
      simulation:"Farm Simulation",farmerProfile:"Farmer Profile",settings:"Settings",
      logout:"Logout",searchTransactions:"Search transactions...",
      financeSubtitle:"Manage your money. Strengthen your farm.",
      thisWeek:"This Week",thisMonth:"This Month",thisYear:"This Year",
      allTime:"All Time",customRange:"Custom Range",fromDate:"From",toDate:"To",
      apply:"Apply",totalIncome:"Total Income",totalExpenses:"Total Expenses",
      netProfit:"Net Profit",transactions:"Transactions",addIncome:"Add Income",
      addExpense:"Add Expense",transfer:"Transfer",financialTimeline:"Financial Timeline",
      daily:"Daily",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",
      noTimeline:"Your financial timeline will appear when you add transactions.",
      financialGoals:"Financial Goals",createGoal:"Create Goal",
      expenseDistribution:"Expense Distribution",incomeExpenseAnalysis:"Income vs Expense",
      cropPerformance:"Crop Financial Performance",
      cropPerformanceInfo:"Link transactions to crops to view crop-specific financial performance.",
      budgetTracker:"Budget Tracker",setBudget:"Set Budget",
      utilityPayments:"Utility Payments",addUtility:"Add Utility",
      utilityDescription:"Track recurring bills, unpaid payments, due dates and reminders.",
      transactionHistory:"Transaction History",allTypes:"All Types",
      income:"Income",expense:"Expense",export:"Export",
      connectedRecords:"Connected Records",marketPrices:"Market Prices",
      farmTasks:"Farm Tasks",addTransaction:"Add Transaction",type:"Type",
      category:"Category",description:"Description",relatedCrop:"Related Crop (optional)",
      paymentMethod:"Payment Method",amountETB:"Amount (ETB)",date:"Date",
      notes:"Notes",saveTransaction:"Save Transaction",goalType:"Goal Type",
      savingsGoal:"Savings Goal",equipmentGoal:"Equipment Goal",goalName:"Goal Name",
      targetAmount:"Target Amount (ETB)",currentAmount:"Current Amount (ETB)",
      targetDate:"Target Date",saveGoal:"Save Goal",createBudget:"Create Budget",
      budgetName:"Budget Name",startDate:"Start Date",endDate:"End Date",
      budgetAmount:"Total Budget Amount (ETB)",saveBudget:"Save Budget",
      utilityName:"Payment Name",nextDueDate:"Next Due Date",recurrence:"Recurrence",
      oneTime:"One time",customDays:"Every N days",intervalDays:"Repeat every (days)",
      remindMe:"Remind me",sevenDays:"7 days before",fiveDays:"5 days before",
      threeDays:"3 days before",oneDay:"1 day before",saveUtility:"Save Utility",
      noRecords:"No records found.",edit:"Edit",delete:"Delete",paid:"Mark Paid",
      unpaid:"Unpaid",overdue:"Overdue",dueIn:"Due in",days:"days",
      spent:"Spent",remaining:"Remaining",budget:"Budget",progress:"Progress",
      save:"Save",cancel:"Cancel",confirmDelete:"Are you sure you want to delete this record?",
      saved:"Saved successfully.",deleted:"Deleted successfully.",
      loginRequired:"Please sign in to your AgriNova account first.",
      configMissing:"Please enter your Supabase URL and anon key in farm-finance.js.",
      loadError:"Could not load your finance records. Check your connection and Supabase policies.",
      invalidAmount:"Please enter a valid amount greater than zero.",
      invalidDates:"Please check the selected dates.",
      utilityReminder:"Utility payment reminder",dueToday:"is due today.",
      dueSoon:"is due soon.",noExpenses:"No expenses recorded in this period.",
      noGoals:"You have not created any financial goals yet.",
      noBudgets:"You have not created any budgets yet.",
      noUtilities:"No utility payments added yet.",
      noTransactions:"No transactions recorded yet.",
      incomeCount:"income",expenseCount:"expenses",
      reminderDue:"Reminder",paidOn:"Paid on",repeat:"Repeats",
      once:"Once",custom:"Custom",categoryCrop:"Crop Sales",
      categoryLivestock:"Livestock Sales",categoryOtherIncome:"Other Income",
      categorySeeds:"Seeds",categoryFertilizer:"Fertilizer",categoryLabour:"Labour",
      categoryTransport:"Transport",categoryEquipment:"Equipment",
      categoryIrrigation:"Irrigation",categoryFuel:"Fuel",categoryOther:"Other",
      transferNote:"Transfer between accounts"
    },
    am: {
      tagline:"በብልህነት እናምርት፣ በተሻለ ሁኔታ እናርስ።",
      farmerDashboard:"የገበሬ ዳሽቦርድ",dashboardHome:"ዋና ገጽ",
      myFarm:"የእኔ እርሻ",myCrops:"የእኔ ሰብሎች",dailyFarm:"ዕለታዊ እርሻ",
      tasksCalendar:"የእርሻ ሥራዎች እና ቀን መቁጠሪያ",
      farmRecords:"የእርሻ መዝገቦች",farmCalculator:"የእርሻ ማስያ",
      farmFinance:"የእርሻ ፋይናንስ",aiAssistant:"የግብርና ረዳት",
      farmAnalysis:"የእርሻ ትንተና",community:"የገበሬዎች ማህበረሰብ",
      marketplace:"ገበያ",resources:"የAgriNova መረጃዎች",
      articles:"የግብርና ጽሑፎች",cropInformation:"የሰብል መረጃ",
      cropMap:"የኢትዮጵያ ሰብል ካርታ",weather:"የአየር ሁኔታ",
      pestLibrary:"የተባይ እና በሽታ መረጃ",
      fertilizer:"የማዳበሪያ መረጃ",agriNews:"የግብርና ዜና",
      cropNews:"የሰብል ዜና",innovation:"የግብርና ፈጠራ",
      education:"የትምህርት ይዘት",simulation:"የእርሻ ማስመሰያ",
      farmerProfile:"የገበሬ መገለጫ",settings:"ቅንብሮች",logout:"ውጣ",
      searchTransactions:"ግብይቶችን ፈልግ...",
      financeSubtitle:"ገንዘብዎን ያስተዳድሩ። እርሻዎን ያጠናክሩ።",
      thisWeek:"በዚህ ሳምንት",thisMonth:"በዚህ ወር",
      thisYear:"በዚህ ዓመት",allTime:"ሁሉም ጊዜ",
      customRange:"ብጁ ጊዜ",fromDate:"ከ",toDate:"እስከ",
      apply:"ተግብር",totalIncome:"ጠቅላላ ገቢ",
      totalExpenses:"ጠቅላላ ወጪ",netProfit:"ትርፍ",
      transactions:"ግብይቶች",addIncome:"ገቢ ጨምር",
      addExpense:"ወጪ ጨምር",transfer:"ዝውውር",
      financialTimeline:"የፋይናንስ ጊዜ ሰሌዳ",
      daily:"ዕለታዊ",weekly:"ሳምንታዊ",monthly:"ወርሃዊ",yearly:"ዓመታዊ",
      noTimeline:"ግብይቶችን ሲመዘግቡ የፋይናንስ ግራፉ ይታያል።",
      financialGoals:"የፋይናንስ ግቦች",createGoal:"ግብ ፍጠር",
      expenseDistribution:"የወጪ ክፍፍል",
      incomeExpenseAnalysis:"ገቢ እና ወጪ",
      cropPerformance:"የሰብል ፋይናንስ አፈጻጸም",
      cropPerformanceInfo:"የሰብል ፋይናንስን ለማየት ግብይቶችን ከሰብሎች ጋር ያገናኙ።",
      budgetTracker:"የበጀት ክትትል",setBudget:"በጀት አዘጋጅ",
      utilityPayments:"የመደበኛ ክፍያዎች",addUtility:"ክፍያ ጨምር",
      utilityDescription:"ተደጋጋሚ ክፍያዎችን፣ ዕዳዎችን፣ የመክፈያ ቀኖችን እና ማሳሰቢያዎችን ይከታተሉ።",
      transactionHistory:"የግብይት ታሪክ",allTypes:"ሁሉም ዓይነቶች",
      income:"ገቢ",expense:"ወጪ",export:"አውጣ",
      connectedRecords:"የተገናኙ መዝገቦች",marketPrices:"የገበያ ዋጋዎች",
      farmTasks:"የእርሻ ሥራዎች",addTransaction:"ግብይት ጨምር",
      type:"ዓይነት",category:"ምድብ",description:"መግለጫ",
      relatedCrop:"ተያያዥ ሰብል",paymentMethod:"የክፍያ ዘዴ",
      amountETB:"መጠን (ብር)",date:"ቀን",notes:"ማስታወሻ",
      saveTransaction:"ግብይት አስቀምጥ",goalType:"የግብ ዓይነት",
      savingsGoal:"የቁጠባ ግብ",equipmentGoal:"የመሣሪያ ግብ",
      goalName:"የግብ ስም",targetAmount:"የታለመ መጠን",
      currentAmount:"አሁን ያለ መጠን",targetDate:"የመጨረሻ ቀን",
      saveGoal:"ግብ አስቀምጥ",createBudget:"በጀት ፍጠር",
      budgetName:"የበጀት ስም",startDate:"የመጀመሪያ ቀን",
      endDate:"የመጨረሻ ቀን",budgetAmount:"ጠቅላላ በጀት",
      saveBudget:"በጀት አስቀምጥ",utilityName:"የክፍያ ስም",
      nextDueDate:"ቀጣይ የመክፈያ ቀን",recurrence:"የድግግሞሽ ዓይነት",
      oneTime:"አንድ ጊዜ",customDays:"በተመረጡ ቀናት",
      intervalDays:"በየስንት ቀኑ",remindMe:"አስታውሰኝ",
      sevenDays:"ከ7 ቀናት በፊት",fiveDays:"ከ5 ቀናት በፊት",
      threeDays:"ከ3 ቀናት በፊት",oneDay:"ከ1 ቀን በፊት",
      saveUtility:"ክፍያ አስቀምጥ",noRecords:"ምንም መዝገብ የለም።",
      edit:"አስተካክል",delete:"ሰርዝ",paid:"ተከፍሏል",
      unpaid:"ያልተከፈለ",overdue:"ጊዜው አልፏል",
      spent:"የወጣ",remaining:"የቀረ",budget:"በጀት",
      progress:"እድገት",save:"አስቀምጥ",cancel:"ሰርዝ",
      confirmDelete:"ይህን መዝገብ ማጥፋት ይፈልጋሉ?",
      saved:"በትክክል ተቀምጧል።",deleted:"ተሰርዟል።",
      loginRequired:"እባክዎ መጀመሪያ ወደ AgriNova ይግቡ።",
      configMissing:"በfarm-finance.js ውስጥ የSupabase መረጃዎን ያስገቡ።",
      loadError:"የፋይናንስ መዝገቦችን መጫን አልተቻለም።",
      invalidAmount:"ከዜሮ በላይ የሆነ ትክክለኛ መጠን ያስገቡ።",
      invalidDates:"እባክዎ ቀኖቹን ያረጋግጡ።",
      utilityReminder:"የክፍያ ማሳሰቢያ",
      dueToday:"ዛሬ መከፈል አለበት።",dueSoon:"በቅርቡ መከፈል አለበት።",
      noExpenses:"በዚህ ጊዜ ውስጥ ወጪ አልተመዘገበም።",
      noGoals:"እስካሁን የፋይናንስ ግብ አልፈጠሩም።",
      noBudgets:"እስካሁን በጀት አልፈጠሩም።",
      noUtilities:"እስካሁን ክፍያ አልጨመሩም።",
      noTransactions:"እስካሁን ግብይት አልተመዘገበም።",
      incomeCount:"ገቢ",expenseCount:"ወጪ",
      reminderDue:"ማሳሰቢያ",paidOn:"የተከፈለበት ቀን",
      repeat:"ይደገማል",once:"አንድ ጊዜ",custom:"ብጁ",
      categoryCrop:"የሰብል ሽያጭ",categoryLivestock:"የእንስሳት ሽያጭ",
      categoryOtherIncome:"ሌላ ገቢ",categorySeeds:"ዘር",
      categoryFertilizer:"ማዳበሪያ",categoryLabour:"ጉልበት",
      categoryTransport:"ትራንስፖርት",categoryEquipment:"መሣሪያ",
      categoryIrrigation:"መስኖ",categoryFuel:"ነዳጅ",categoryOther:"ሌላ",
      transferNote:"በሂሳቦች መካከል ዝውውር"
    },
    ti: {
      tagline:"ብብልሓት ንምርት፣ ብዝሓሸ ኣገባብ ንሕረስ።",
      farmerDashboard:"ዳሽቦርድ ሓረስታይ",dashboardHome:"ቀንዲ ገጽ",
      myFarm:"ሕርሻይ",myCrops:"ኣትክልተይ",dailyFarm:"መዓልታዊ ሕርሻ",
      tasksCalendar:"ዕማማትን ካላንደርን",farmRecords:"መዝገባት ሕርሻ",
      farmCalculator:"መሕለቢ ሕርሻ",farmFinance:"ፋይናንስ ሕርሻ",
      aiAssistant:"ሓጋዚ ሕርሻ",farmAnalysis:"ትንተና ሕርሻ",
      community:"ማሕበረሰብ ሓረስቶት",marketplace:"ዕዳጋ",
      resources:"ምንጭታት AgriNova",articles:"ጽሑፋት ሕርሻ",
      cropInformation:"ሓበሬታ ዘርኢ",cropMap:"ካርታ ዘርኢ ኢትዮጵያ",
      weather:"ኩነታት ኣየር",pestLibrary:"ሕማማትን ባልዕን",
      fertilizer:"ሓበሬታ ድኹዒ",agriNews:"ዜና ሕርሻ",
      cropNews:"ዜና ዘርኢ",innovation:"ሓድሽ ምህዞ ሕርሻ",
      education:"ትምህርታዊ ትሕዝቶ",simulation:"ምስላ ሕርሻ",
      farmerProfile:"መግለጺ ሓረስታይ",settings:"ቅንብራት",logout:"ውጻእ",
      searchTransactions:"ግብይታት ድለ...",
      financeSubtitle:"ገንዘብካ ኣመሓድር። ሕርሻኻ ኣጠናኽር።",
      thisWeek:"እዚ ሰሙን",thisMonth:"እዚ ወርሒ",thisYear:"እዚ ዓመት",
      allTime:"ኩሉ ግዜ",customRange:"ፍሉይ ግዜ",
      fromDate:"ካብ",toDate:"ክሳብ",apply:"ተግብር",
      totalIncome:"ጠቕላላ ኣታዊ",totalExpenses:"ጠቕላላ ወጻኢ",
      netProfit:"ንጹር ትርፊ",transactions:"ግብይታት",
      addIncome:"ኣታዊ ወስኽ",addExpense:"ወጻኢ ወስኽ",
      transfer:"ምትሕልላፍ",financialTimeline:"ናይ ፋይናንስ ግዜ",
      daily:"መዓልታዊ",weekly:"ሰሙናዊ",monthly:"ወርሓዊ",yearly:"ዓመታዊ",
      noTimeline:"ግብይታት ምስ ትምዝግብ ግራፍ ክርአ እዩ።",
      financialGoals:"ዕላማታት ፋይናንስ",createGoal:"ዕላማ ፍጠር",
      expenseDistribution:"ምክፍፋል ወጻኢ",
      incomeExpenseAnalysis:"ኣታዊ ኣንጻር ወጻኢ",
      cropPerformance:"ፋይናንሳዊ ኣፈጻጽማ ዘርኢ",
      cropPerformanceInfo:"ንፋይናንስ ዘርኢ ንምርኣይ ግብይታት ምስ ዘርኢ ኣራኽብ።",
      budgetTracker:"ምክትታል ባጀት",setBudget:"ባጀት ኣዳሉ",
      utilityPayments:"ተደጋጋሚ ክፍሊታት",addUtility:"ክፍሊት ወስኽ",
      utilityDescription:"ተደጋጋሚ ክፍሊታት፣ ዕዳ፣ ዕለታት ክፍሊትን መዘኻኸሪታትን ተኸታተል።",
      transactionHistory:"ታሪኽ ግብይት",allTypes:"ኩሉ ዓይነት",
      income:"ኣታዊ",expense:"ወጻኢ",export:"ኣውጽእ",
      connectedRecords:"ዝተኣሳሰሩ መዝገባት",marketPrices:"ዋጋ ዕዳጋ",
      farmTasks:"ዕማማት ሕርሻ",addTransaction:"ግብይት ወስኽ",
      type:"ዓይነት",category:"ምድብ",description:"መግለጺ",
      relatedCrop:"ዝተኣሳሰረ ዘርኢ",paymentMethod:"ኣገባብ ክፍሊት",
      amountETB:"መጠን (ብር)",date:"ዕለት",notes:"መዘኻኸሪ",
      saveTransaction:"ግብይት ኣቐምጥ",goalType:"ዓይነት ዕላማ",
      savingsGoal:"ዕላማ ዕቋር",equipmentGoal:"ዕላማ መሳርሒ",
      goalName:"ስም ዕላማ",targetAmount:"ዝተሓሰበ መጠን",
      currentAmount:"ሕጂ ዘሎ መጠን",targetDate:"ዕለት ዕላማ",
      saveGoal:"ዕላማ ኣቐምጥ",createBudget:"ባጀት ፍጠር",
      budgetName:"ስም ባጀት",startDate:"መጀመርታ ዕለት",
      endDate:"መወዳእታ ዕለት",budgetAmount:"ጠቕላላ ባጀት",
      saveBudget:"ባጀት ኣቐምጥ",utilityName:"ስም ክፍሊት",
      nextDueDate:"ቀጻሊ ዕለት ክፍሊት",recurrence:"ድግግሞሽ",
      oneTime:"ሓንሳብ",customDays:"ኣብ ዝተመርጹ መዓልታት",
      intervalDays:"ኣብ ክንደይ መዓልቲ",remindMe:"ኣዘኻኽረኒ",
      sevenDays:"7 መዓልቲ ቅድሚ",fiveDays:"5 መዓልቲ ቅድሚ",
      threeDays:"3 መዓልቲ ቅድሚ",oneDay:"1 መዓልቲ ቅድሚ",
      saveUtility:"ክፍሊት ኣቐምጥ",noRecords:"መዝገብ የለን።",
      edit:"ኣስተኻኽል",delete:"ሰርዝ",paid:"ተኸፊሉ",
      unpaid:"ዘይተኸፍለ",overdue:"ግዜኡ ሓሊፉ",
      spent:"ዝወጸ",remaining:"ዝተረፈ",budget:"ባጀት",
      progress:"ምዕባለ",save:"ኣቐምጥ",cancel:"ሰርዝ",
      confirmDelete:"ነዚ መዝገብ ክትስርዞ ትደሊ ዲኻ?",
      saved:"ብዓወት ተቐሚጡ።",deleted:"ተሰሪዙ።",
      loginRequired:"በጃኻ መጀመርታ ናብ AgriNova እቶ።",
      configMissing:"ኣድራሻ Supabaseን anon keyን ኣእቱ።",
      loadError:"መዝገባት ፋይናንስ ክጽዕን ኣይከኣለን።",
      invalidAmount:"ካብ ዜሮ ዝዓቢ ትኽክለኛ መጠን ኣእቱ።",
      invalidDates:"በጃኻ ዕለታት ኣረጋግጽ።",
      utilityReminder:"መዘኻኸሪ ክፍሊት",dueToday:"ሎሚ ክኽፈል ኣለዎ።",
      dueSoon:"ቀልጢፉ ክኽፈል ኣለዎ።",
      noExpenses:"ኣብዚ ግዜ ወጻኢ ኣይተመዝገበን።",
      noGoals:"ገና ዕላማ ኣይፈጠርካን።",
      noBudgets:"ገና ባጀት ኣይፈጠርካን።",
      noUtilities:"ገና ክፍሊት ኣይተወሰኸን።",
      noTransactions:"ገና ግብይት ኣይተመዝገበን።",
      incomeCount:"ኣታዊ",expenseCount:"ወጻኢ",
      reminderDue:"መዘኻኸሪ",paidOn:"ዝተኸፍለሉ ዕለት",
      repeat:"ይደጋገም",once:"ሓንሳብ",custom:"ፍሉይ",
      categoryCrop:"ሽያጥ ዘርኢ",categoryLivestock:"ሽያጥ እንስሳ",
      categoryOtherIncome:"ካልእ ኣታዊ",categorySeeds:"ዘርኢ",
      categoryFertilizer:"ድኹዒ",categoryLabour:"ጉልበት",
      categoryTransport:"መጓዓዝያ",categoryEquipment:"መሳርሒ",
      categoryIrrigation:"ማይ ምስታይ",categoryFuel:"ነዳዲ",
      categoryOther:"ካልእ",transferNote:"ምትሕልላፍ ሕሳብ"
    },
    om: {
      tagline:"Ogeessummaan haa oomishnu, fooyya'inaan haa qonnaanu.",
      farmerDashboard:"Daashboordii Qonnaan Bultootaa",
      dashboardHome:"Fuula Guddaa",myFarm:"Qonna Koo",myCrops:"Midhaan Koo",
      dailyFarm:"Qonna Guyyaa",tasksCalendar:"Hojiiwwan fi Kaalaandarii",
      farmRecords:"Galmee Qonnaa",farmCalculator:"Herregaa Qonnaa",
      farmFinance:"Maallaqa Qonnaa",aiAssistant:"Gargaaraa Qonnaa",
      farmAnalysis:"Xiinxala Qonnaa",community:"Hawaasa Qonnaan Bultootaa",
      marketplace:"Gabaa",resources:"Qabeenya AgriNova",
      articles:"Barreeffamoota Qonnaa",cropInformation:"Odeeffannoo Midhaanii",
      cropMap:"Kaartaa Midhaan Itoophiyaa",weather:"Haala Qilleensaa",
      pestLibrary:"Ilbiisota fi Dhukkuboota",fertilizer:"Odeeffannoo Xaa'oo",
      agriNews:"Oduu Qonnaa",cropNews:"Oduu Midhaanii",
      innovation:"Kalaqa Qonnaa",education:"Barnoota",
      simulation:"Qonna Fakkeessuu",farmerProfile:"Profaayila Qonnaan Bultootaa",
      settings:"Qindaa'ina",logout:"Ba'i",searchTransactions:"Daldala barbaadi...",
      financeSubtitle:"Maallaqa kee bulchi. Qonna kee cimsadhu.",
      thisWeek:"Torban Kana",thisMonth:"Ji'a Kana",thisYear:"Waggaa Kana",
      allTime:"Yeroo Hunda",customRange:"Yeroo Filatame",fromDate:"Irraa",
      toDate:"Hanga",apply:"Fayyadami",totalIncome:"Galii Waliigalaa",
      totalExpenses:"Baasii Waliigalaa",netProfit:"Bu'aa Qulqulluu",
      transactions:"Daldala",addIncome:"Galii Dabali",addExpense:"Baasii Dabali",
      transfer:"Maallaqa Dabarsi",financialTimeline:"Yeroo Maallaqaa",
      daily:"Guyyaa",weekly:"Torban",monthly:"Ji'a",yearly:"Waggaa",
      noTimeline:"Yeroo daldala galmeessitu chaartiin ni mul'ata.",
      financialGoals:"Kaayyoo Maallaqaa",createGoal:"Kaayyoo Uumi",
      expenseDistribution:"Raabsa Baasii",incomeExpenseAnalysis:"Galii fi Baasii",
      cropPerformance:"Raawwii Maallaqa Midhaanii",
      cropPerformanceInfo:"Raawwii maallaqa midhaanii arguuf daldala midhaan waliin walqabsiisi.",
      budgetTracker:"Hordoffii Baajataa",setBudget:"Baajata Qopheessi",
      utilityPayments:"Kaffaltiiwwan Yeroo Yeroo",addUtility:"Kaffaltii Dabali",
      utilityDescription:"Kaffaltiiwwan irra deddeebi'an, liqii, guyyaa kaffaltii fi yaadachiisa hordofi.",
      transactionHistory:"Seenaa Daldalaa",allTypes:"Gosa Hunda",
      income:"Galii",expense:"Baasii",export:"Baasi",
      connectedRecords:"Galmeewwan Walqabatan",marketPrices:"Gatii Gabaa",
      farmTasks:"Hojiiwwan Qonnaa",addTransaction:"Daldala Dabali",
      type:"Gosa",category:"Ramaddii",description:"Ibsa",
      relatedCrop:"Midhaan Walqabatu",paymentMethod:"Mala Kaffaltii",
      amountETB:"Hamma (ETB)",date:"Guyyaa",notes:"Yaadannoo",
      saveTransaction:"Daldala Olkaa'i",goalType:"Gosa Kaayyoo",
      savingsGoal:"Kaayyoo Qusannaa",equipmentGoal:"Kaayyoo Meeshaa",
      goalName:"Maqaa Kaayyoo",targetAmount:"Hamma Kaayyoo",
      currentAmount:"Hamma Amma Jiru",targetDate:"Guyyaa Kaayyoo",
      saveGoal:"Kaayyoo Olkaa'i",createBudget:"Baajata Uumi",
      budgetName:"Maqaa Baajataa",startDate:"Guyyaa Jalqabaa",
      endDate:"Guyyaa Xumuraa",budgetAmount:"Baajata Waliigalaa",
      saveBudget:"Baajata Olkaa'i",utilityName:"Maqaa Kaffaltii",
      nextDueDate:"Guyyaa Kaffaltii Itti Aanu",recurrence:"Irra Deddeebii",
      oneTime:"Yeroo Tokko",customDays:"Guyyaa Filatame",
      intervalDays:"Guyyaa meeqa keessatti",remindMe:"Na Yaadachiisi",
      sevenDays:"Guyyaa 7 dura",fiveDays:"Guyyaa 5 dura",
      threeDays:"Guyyaa 3 dura",oneDay:"Guyyaa 1 dura",
      saveUtility:"Kaffaltii Olkaa'i",noRecords:"Galmeen hin jiru.",
      edit:"Sirreessi",delete:"Haqi",paid:"Kaffalame",
      unpaid:"Hin kaffalamne",overdue:"Yeroon darbe",spent:"Baasame",
      remaining:"Hafe",budget:"Baajata",progress:"Adeemsa",
      save:"Olkaa'i",cancel:"Dhiisi",
      confirmDelete:"Galmee kana haquu barbaaddaa?",
      saved:"Milkaa'inaan olkaa'ame.",deleted:"Haqame.",
      loginRequired:"Maaloo jalqaba gara AgriNova seeni.",
      configMissing:"URL Supabase fi anon key galchi.",
      loadError:"Galmeewwan maallaqaa fe'uun hin danda'amne.",
      invalidAmount:"Maaloo hamma sirrii zeeroo caalu galchi.",
      invalidDates:"Maaloo guyyaa filatame mirkaneessi.",
      utilityReminder:"Yaadachiisa kaffaltii",dueToday:"Har'a kaffalamuu qaba.",
      dueSoon:"Yeroo dhiyootti kaffalamuu qaba.",
      noExpenses:"Yeroo kana keessatti baasii hin galmoofne.",
      noGoals:"Hanga ammaatti kaayyoon hin uumamne.",
      noBudgets:"Hanga ammaatti baajanni hin uumamne.",
      noUtilities:"Hanga ammaatti kaffaltiin hin dabalamin.",
      noTransactions:"Hanga ammaatti daldalli hin galmoofne.",
      incomeCount:"galii",expenseCount:"baasii",
      reminderDue:"Yaadachiisa",paidOn:"Guyyaa Kaffaltii",
      repeat:"Irra deebi'a",once:"Yeroo tokko",custom:"Filatame",
      categoryCrop:"Gurgurtaa Midhaanii",categoryLivestock:"Gurgurtaa Beeyladaa",
      categoryOtherIncome:"Galii Biraa",categorySeeds:"Sanyii",
      categoryFertilizer:"Xaa'oo",categoryLabour:"Humna Hojii",
      categoryTransport:"Geejjiba",categoryEquipment:"Meeshaa",
      categoryIrrigation:"Jallisii",categoryFuel:"Boba'aa",
      categoryOther:"Kan Biraa",transferNote:"Maallaqa herrega gidduutti dabarsuu"
    },
    so: {
      tagline:"Si caqli leh u beer, si wanaagsan u horumari.",
      farmerDashboard:"Bogga Beeraleyda",dashboardHome:"Bogga Hore",
      myFarm:"Beertayda",myCrops:"Dalagyadayda",dailyFarm:"Hawlaha Maalinlaha",
      tasksCalendar:"Hawlaha iyo Jadwalka",farmRecords:"Diiwaanka Beeraha",
      farmCalculator:"Xisaabiyaha Beeraha",farmFinance:"Maaliyadda Beeraha",
      aiAssistant:"Kaaliyaha Beeraha",farmAnalysis:"Falanqaynta Beeraha",
      community:"Bulshada Beeraleyda",marketplace:"Suuqa",
      resources:"Kheyraadka AgriNova",articles:"Maqaalada Beeraha",
      cropInformation:"Macluumaadka Dalagyada",cropMap:"Khariidadda Dalagyada Itoobiya",
      weather:"Cimilada",pestLibrary:"Cayayaanka iyo Cudurrada",
      fertilizer:"Macluumaadka Bacriminta",agriNews:"Wararka Beeraha",
      cropNews:"Wararka Dalagyada",innovation:"Hal-abuurka Beeraha",
      education:"Waxbarashada",simulation:"Jilitaanka Beeraha",
      farmerProfile:"Astaanta Beeraleyga",settings:"Dejinta",logout:"Ka bax",
      searchTransactions:"Raadi macaamillada...",
      financeSubtitle:"Maamul lacagtaada. Xooji beertaada.",
      thisWeek:"Toddobaadkan",thisMonth:"Bishan",thisYear:"Sannadkan",
      allTime:"Waqti kasta",customRange:"Waqti la doortay",
      fromDate:"Laga bilaabo",toDate:"Ilaa",apply:"Codso",
      totalIncome:"Wadarta Dakhliga",totalExpenses:"Wadarta Kharashka",
      netProfit:"Faa'iidada saafiga ah",transactions:"Macaamillo",
      addIncome:"Ku dar Dakhli",addExpense:"Ku dar Kharash",
      transfer:"Wareejin",financialTimeline:"Jadwalka Maaliyadda",
      daily:"Maalinle",weekly:"Toddobaadle",monthly:"Bille",yearly:"Sannadle",
      noTimeline:"Jaantuska maaliyaddu wuxuu muuqan doonaa markaad diiwaangeliso macaamillo.",
      financialGoals:"Yoolalka Maaliyadda",createGoal:"Samee Yool",
      expenseDistribution:"Qaybinta Kharashka",incomeExpenseAnalysis:"Dakhli iyo Kharash",
      cropPerformance:"Waxqabadka Maaliyadeed ee Dalagga",
      cropPerformanceInfo:"Ku xidh macaamillada dalagyada si aad u aragto waxqabadka dalag kasta.",
      budgetTracker:"La-socodka Miisaaniyadda",setBudget:"Deji Miisaaniyad",
      utilityPayments:"Lacag-bixinnada Joogtada ah",addUtility:"Ku dar Lacag-bixin",
      utilityDescription:"La soco biilasha soo noqnoqda, deymaha, taariikhaha bixinta iyo xusuusinta.",
      transactionHistory:"Taariikhda Macaamillada",allTypes:"Dhammaan Noocyada",
      income:"Dakhli",expense:"Kharash",export:"Dhoofin",
      connectedRecords:"Diiwaannada Isku Xiran",marketPrices:"Qiimaha Suuqa",
      farmTasks:"Hawlaha Beeraha",addTransaction:"Ku dar Macaamil",
      type:"Nooc",category:"Qayb",description:"Sharaxaad",
      relatedCrop:"Dalag La Xiriira",paymentMethod:"Habka Bixinta",
      amountETB:"Qaddar (ETB)",date:"Taariikh",notes:"Qoraallo",
      saveTransaction:"Kaydi Macaamilka",goalType:"Nooca Yoolka",
      savingsGoal:"Yoolka Kaydka",equipmentGoal:"Yoolka Qalabka",
      goalName:"Magaca Yoolka",targetAmount:"Qaddarka La Hiigsanayo",
      currentAmount:"Qaddarka Hadda",targetDate:"Taariikhda Yoolka",
      saveGoal:"Kaydi Yoolka",createBudget:"Samee Miisaaniyad",
      budgetName:"Magaca Miisaaniyadda",startDate:"Taariikhda Bilowga",
      endDate:"Taariikhda Dhammaadka",budgetAmount:"Wadarta Miisaaniyadda",
      saveBudget:"Kaydi Miisaaniyadda",utilityName:"Magaca Lacag-bixinta",
      nextDueDate:"Taariikhda Bixinta Xigta",recurrence:"Soo Noqnoqoshada",
      oneTime:"Hal mar",customDays:"Maalmo la doortay",
      intervalDays:"Ku celi maalin kasta oo tiradan ah",
      remindMe:"I xusuusi",sevenDays:"7 maalmood ka hor",
      fiveDays:"5 maalmood ka hor",threeDays:"3 maalmood ka hor",
      oneDay:"1 maalin ka hor",saveUtility:"Kaydi Lacag-bixinta",
      noRecords:"Wax diiwaan ah lama helin.",edit:"Wax ka beddel",
      delete:"Tirtir",paid:"La bixiyey",unpaid:"Aan la bixin",
      overdue:"Waqtigu wuu dhaafay",spent:"La isticmaalay",
      remaining:"Haray",budget:"Miisaaniyad",progress:"Horumar",
      save:"Kaydi",cancel:"Jooji",
      confirmDelete:"Ma hubtaa inaad tirtirayso diiwaankan?",
      saved:"Si guul leh ayaa loo kaydiyey.",deleted:"Waa la tirtiray.",
      loginRequired:"Fadlan marka hore gal akoonkaaga AgriNova.",
      configMissing:"Geli URL-ka Supabase iyo anon key-ga.",
      loadError:"Lama soo dejin karin diiwaannada maaliyadda.",
      invalidAmount:"Geli qaddar sax ah oo ka weyn eber.",
      invalidDates:"Fadlan hubi taariikhaha aad dooratay.",
      utilityReminder:"Xusuusin lacag-bixin",
      dueToday:"maanta ayaa la bixinayaa.",dueSoon:"dhawaan ayaa la bixinayaa.",
      noExpenses:"Kharash lama diiwaangelin muddadan.",
      noGoals:"Weli ma aadan samayn yool maaliyadeed.",
      noBudgets:"Weli ma aadan samayn miisaaniyad.",
      noUtilities:"Weli lacag-bixin lama darin.",
      noTransactions:"Weli macaamil lama diiwaangelin.",
      incomeCount:"dakhli",expenseCount:"kharash",
      reminderDue:"Xusuusin",paidOn:"La bixiyey taariikhda",
      repeat:"Wuu soo noqnoqdaa",once:"Hal mar",custom:"La doortay",
      categoryCrop:"Iibka Dalagga",categoryLivestock:"Iibka Xoolaha",
      categoryOtherIncome:"Dakhli Kale",categorySeeds:"Abuur",
      categoryFertilizer:"Bacriminta",categoryLabour:"Shaqaale",
      categoryTransport:"Gaadiid",categoryEquipment:"Qalab",
      categoryIrrigation:"Waraab",categoryFuel:"Shidaal",
      categoryOther:"Kale",transferNote:"Lacag u wareeji akoon kale"
    }
  };

  const t = (key) =>
    (translations[state.language] && translations[state.language][key]) ||
    translations.en[key] || key;

  function applyTranslations() {
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[state.language]?.[key] || translations.en[key]) {
        el.textContent = t(key);
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    const names = {
      en:"English",am:"አማርኛ",ti:"ትግርኛ",om:"Afaan Oromo",so:"Af Soomaali"
    };
    $("currentLanguage").textContent = names[state.language];
    renderAll();
  }

  // =========================================================
  // HELPERS
  // =========================================================
  function toast(message, type = "success") {
    const el = $("toast");
    el.textContent = message;
    el.className = `toast show ${type}`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 3500);
  }

  function safe(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    })[c]);
  }

  function etb(value) {
    return `ETB ${money(value)}`;
  }

  function dateObject(value) {
    if (!value) return null;
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function dayDifference(dateString) {
    const target = dateObject(dateString);
    const now = dateObject(todayISO());
    if (!target || !now) return null;
    return Math.round((target - now) / 86400000);
  }

  function openModal(id) {
    $(id)?.classList.add("show");
  }

  function closeModal(id) {
    $(id)?.classList.remove("show");
  }

  function setDefaultDates() {
    ["transDate","transferDate"].forEach((id) => {
      if ($(id)) $(id).value = todayISO();
    });
    $("dateDay").textContent = new Intl.DateTimeFormat(undefined, {
      weekday:"long"
    }).format(new Date());
    $("dateFull").textContent = new Intl.DateTimeFormat(undefined, {
      year:"numeric",month:"long",day:"numeric"
    }).format(new Date());
  }

  function getFilteredTransactions() {
    const now = new Date();
    let start = null;
    let end = null;

    if (state.range === "week") {
      start = new Date(now);
      const day = (now.getDay() + 6) % 7;
      start.setDate(now.getDate() - day);
      start.setHours(0,0,0,0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    } else if (state.range === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (state.range === "year") {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
    } else if (state.range === "custom") {
      start = dateObject(state.customStart);
      end = dateObject(state.customEnd);
    }

    return state.transactions.filter((row) => {
      const d = dateObject(row.transaction_date);
      if (!d) return false;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
  }

  function categoryOptions(type, selected = "") {
    const items = type === "income"
      ? [
          ["Crop Sales","categoryCrop"],
          ["Livestock Sales","categoryLivestock"],
          ["Other Income","categoryOtherIncome"]
        ]
      : [
          ["Seeds","categorySeeds"],["Fertilizer","categoryFertilizer"],
          ["Labour","categoryLabour"],["Transport","categoryTransport"],
          ["Equipment","categoryEquipment"],["Irrigation","categoryIrrigation"],
          ["Fuel","categoryFuel"],["Other","categoryOther"]
        ];

    $("transCategory").innerHTML = items.map(([value,key]) =>
      `<option value="${safe(value)}">${safe(t(key))}</option>`
    ).join("");

    if (selected) $("transCategory").value = selected;
  }

  function chartDestroy(name) {
    if (state.charts[name]) {
      state.charts[name].destroy();
      state.charts[name] = null;
    }
  }

  // =========================================================
  // SUPABASE AUTHENTICATION AND DATA LOADING
  // =========================================================
  async function initializeSupabase() {
    if (!SUPABASE_URL.startsWith("https://") ||
        SUPABASE_ANON_KEY.includes("YOUR_SUPABASE")) {
      throw new Error(t("configMissing"));
    }

    if (!window.supabase?.createClient) {
      throw new Error("Supabase library did not load. Check your internet connection.");
    }

    state.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await state.db.auth.getUser();
    if (error || !data?.user) throw new Error(t("loginRequired"));

    state.farmerId = data.user.id;
  }

  async function loadTable(table, orderColumn) {
    const { data, error } = await state.db
      .from(table)
      .select("*")
      .eq("farmer_id", state.farmerId)
      .order(orderColumn, { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async function loadAllData() {
    const [transactions, goals, budgets, utilities] = await Promise.all([
      loadTable(TABLES.transactions, "transaction_date"),
      loadTable(TABLES.goals, "created_at"),
      loadTable(TABLES.budgets, "start_date"),
      loadTable(TABLES.utilities, "next_due_date")
    ]);

    state.transactions = transactions;
    state.goals = goals;
    state.budgets = budgets;
    state.utilities = utilities;
    renderAll();
    checkUtilityReminders();
  }

  async function insertRecord(table, payload) {
    const { data, error } = await state.db
      .from(table)
      .insert({ ...payload, farmer_id: state.farmerId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async function updateRecord(table, id, payload) {
    const { data, error } = await state.db
      .from(table)
      .update(payload)
      .eq("id", id)
      .eq("farmer_id", state.farmerId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async function deleteRecord(table, id) {
    const { error } = await state.db
      .from(table)
      .delete()
      .eq("id", id)
      .eq("farmer_id", state.farmerId);

    if (error) throw error;
  }

  // =========================================================
  // TRANSACTIONS
  // =========================================================
  function openTransactionModal(type = "income", row = null) {
    $("transactionForm").reset();
    $("editTransactionId").value = row?.id || "";
    $("transTypeSelect").value = row?.type || type;
    categoryOptions(row?.type || type, row?.category || "");
    $("transDescription").value = row?.description || "";
    $("transCrop").value = row?.crop_name || "";
    $("transPayment").value = row?.payment_method || "Cash";
    $("transAmount").value = row?.amount ?? "";
    $("transDate").value = row?.transaction_date || todayISO();
    $("transNotes").value = row?.notes || "";
    $("transactionModalTitle").textContent = row ? t("edit") : t("addTransaction");
    openModal("transactionModal");
  }

  async function saveTransaction(event) {
    event.preventDefault();
    const amount = Number($("transAmount").value);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast(t("invalidAmount"), "error");
      return;
    }

    const id = $("editTransactionId").value;
    const payload = {
      type: $("transTypeSelect").value,
      category: $("transCategory").value,
      description: $("transDescription").value.trim(),
      crop_name: $("transCrop").value.trim() || null,
      payment_method: $("transPayment").value,
      amount,
      transaction_date: $("transDate").value,
      notes: $("transNotes").value.trim() || null
    };

    if (!payload.description || !payload.transaction_date) return;

    try {
      if (id) await updateRecord(TABLES.transactions, id, payload);
      else await insertRecord(TABLES.transactions, payload);
      closeModal("transactionModal");
      await loadAllData();
      toast(t("saved"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  async function removeTransaction(id) {
    if (!confirm(t("confirmDelete"))) return;
    try {
      await deleteRecord(TABLES.transactions, id);
      await loadAllData();
      toast(t("deleted"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  // =========================================================
  // FINANCIAL GOALS
  // =========================================================
  function openGoalModal(row = null) {
    $("goalForm").reset();
    $("editGoalId").value = row?.id || "";
    $("goalType").value = row?.goal_type || "savings";
    $("goalName").value = row?.name || "";
    $("goalTarget").value = row?.target_amount ?? "";
    $("goalCurrent").value = row?.current_amount ?? 0;
    $("goalDate").value = row?.target_date || "";
    $("goalNotes").value = row?.notes || "";
    $("goalModalTitle").textContent = row ? t("edit") : t("createGoal");
    openModal("goalModal");
  }

  async function saveGoal(event) {
    event.preventDefault();
    const target = Number($("goalTarget").value);
    const current = Number($("goalCurrent").value || 0);

    if (target <= 0 || current < 0 || !Number.isFinite(target + current)) {
      toast(t("invalidAmount"), "error");
      return;
    }

    const payload = {
      goal_type: $("goalType").value,
      name: $("goalName").value.trim(),
      target_amount: target,
      current_amount: current,
      target_date: $("goalDate").value || null,
      notes: $("goalNotes").value.trim() || null
    };

    try {
      const id = $("editGoalId").value;
      if (id) await updateRecord(TABLES.goals, id, payload);
      else await insertRecord(TABLES.goals, payload);
      closeModal("goalModal");
      await loadAllData();
      toast(t("saved"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  async function removeGoal(id) {
    if (!confirm(t("confirmDelete"))) return;
    try {
      await deleteRecord(TABLES.goals, id);
      await loadAllData();
      toast(t("deleted"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  // =========================================================
  // BUDGETS
  // =========================================================
  function openBudgetModal(row = null) {
    $("budgetForm").reset();
    $("editBudgetId").value = row?.id || "";
    $("budgetName").value = row?.name || "";
    $("budgetStart").value = row?.start_date || todayISO();
    $("budgetEnd").value = row?.end_date || todayISO();
    $("budgetAmount").value = row?.amount ?? "";
    $("budgetModalTitle").textContent = row ? t("edit") : t("createBudget");
    openModal("budgetModal");
  }

  async function saveBudget(event) {
    event.preventDefault();
    const start = $("budgetStart").value;
    const end = $("budgetEnd").value;
    const amount = Number($("budgetAmount").value);

    if (!start || !end || end < start) {
      toast(t("invalidDates"), "error");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      toast(t("invalidAmount"), "error");
      return;
    }

    const payload = {
      name: $("budgetName").value.trim(),
      start_date: start,
      end_date: end,
      amount
    };

    try {
      const id = $("editBudgetId").value;
      if (id) await updateRecord(TABLES.budgets, id, payload);
      else await insertRecord(TABLES.budgets, payload);
      closeModal("budgetModal");
      await loadAllData();
      toast(t("saved"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  async function removeBudget(id) {
    if (!confirm(t("confirmDelete"))) return;
    try {
      await deleteRecord(TABLES.budgets, id);
      await loadAllData();
      toast(t("deleted"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  // =========================================================
  // UTILITY PAYMENTS AND RECURRENCE
  // =========================================================
  function openUtilityModal(row = null) {
    $("utilityForm").reset();
    $("editUtilityId").value = row?.id || "";
    $("utilityName").value = row?.name || "";
    $("utilityCategory").value = row?.category || "Other";
    $("utilityAmount").value = row?.amount ?? "";
    $("utilityDueDate").value = row?.next_due_date || todayISO();
    $("utilityRecurrence").value = row?.recurrence || "monthly";
    $("utilityInterval").value = row?.interval_days || "";
    $("utilityReminder").value = String(row?.reminder_days || 3);
    $("utilityNotes").value = row?.notes || "";
    $("customIntervalGroup").hidden = $("utilityRecurrence").value !== "custom";
    $("utilityModalTitle").textContent = row ? t("edit") : t("addUtility");
    openModal("utilityModal");
  }

  async function saveUtility(event) {
    event.preventDefault();
    const amount = Number($("utilityAmount").value);
    const recurrence = $("utilityRecurrence").value;
    const interval = Number($("utilityInterval").value);

    if (!Number.isFinite(amount) || amount <= 0) {
      toast(t("invalidAmount"), "error");
      return;
    }
    if (recurrence === "custom" && (!Number.isInteger(interval) || interval < 1)) {
      toast(t("invalidDates"), "error");
      return;
    }

    const payload = {
      name: $("utilityName").value.trim(),
      category: $("utilityCategory").value,
      amount,
      next_due_date: $("utilityDueDate").value,
      recurrence,
      interval_days: recurrence === "custom" ? interval : null,
      reminder_days: Number($("utilityReminder").value),
      notes: $("utilityNotes").value.trim() || null,
      is_paid: false
    };

    if (!payload.name || !payload.next_due_date) return;

    try {
      const id = $("editUtilityId").value;
      if (id) {
        const existing = state.utilities.find(x => x.id === id);
        payload.is_paid = existing?.is_paid ?? false;
        await updateRecord(TABLES.utilities, id, payload);
      } else {
        await insertRecord(TABLES.utilities, payload);
      }
      closeModal("utilityModal");
      await loadAllData();
      toast(t("saved"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  function addDays(dateString, count) {
    const date = dateObject(dateString);
    date.setDate(date.getDate() + count);
    return date.toISOString().slice(0, 10);
  }

  function nextOccurrence(row) {
    switch (row.recurrence) {
      case "weekly": return addDays(row.next_due_date, 7);
      case "monthly": {
        const d = dateObject(row.next_due_date);
        const day = d.getDate();
        d.setDate(1);
        d.setMonth(d.getMonth() + 1);
        const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        d.setDate(Math.min(day, last));
        return d.toISOString().slice(0, 10);
      }
      case "yearly": {
        const d = dateObject(row.next_due_date);
        const month = d.getMonth();
        const day = d.getDate();
        d.setFullYear(d.getFullYear() + 1);
        if (d.getMonth() !== month) d.setDate(0);
        return d.toISOString().slice(0, 10);
      }
      case "custom": return addDays(row.next_due_date, Number(row.interval_days));
      default: return null;
    }
  }

  async function markUtilityPaid(id) {
    const row = state.utilities.find(x => x.id === id);
    if (!row || row.is_paid) return;

    try {
      if (row.recurrence === "once") {
        await updateRecord(TABLES.utilities, id, {
          is_paid: true,
          last_paid_date: todayISO()
        });
      } else {
        const nextDate = nextOccurrence(row);
        await updateRecord(TABLES.utilities, id, {
          next_due_date: nextDate,
          is_paid: false,
          last_paid_date: todayISO()
        });
      }

      // Record the utility payment as an expense transaction.
      await insertRecord(TABLES.transactions, {
        farmer_id: state.farmerId,
        type: "expense",
        category: row.category || "Other",
        description: `${row.name} - ${t("paid")}`,
        crop_name: null,
        payment_method: "Other",
        amount: Number(row.amount),
        transaction_date: todayISO(),
        notes: row.notes || null
      });

      await loadAllData();
      toast(t("saved"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  async function removeUtility(id) {
    if (!confirm(t("confirmDelete"))) return;
    try {
      await deleteRecord(TABLES.utilities, id);
      await loadAllData();
      toast(t("deleted"));
    } catch (error) {
      console.error(error);
      toast(error.message || t("loadError"), "error");
    }
  }

  function checkUtilityReminders() {
    const due = state.utilities.filter((row) => {
      if (row.is_paid) return false;
      const remaining = dayDifference(row.next_due_date);
      return remaining !== null &&
        remaining >= 0 &&
        remaining <= Number(row.reminder_days);
    });

    $("notifBadge").textContent = due.length;
    $("notifBadge").classList.toggle("show", due.length > 0);

    if (due.length && "Notification" in window &&
        Notification.permission === "granted") {
      due.forEach((row) => {
        const days = dayDifference(row.next_due_date);
        const title = `${t("utilityReminder")}: ${row.name}`;
        const body = days === 0 ? t("dueToday") : `${t("dueSoon")} ${days} ${t("days")}.`;
        // Notifications are shown while this page is open.
        // Persistent reminders while the page is closed need a server-side scheduler.
        if (!sessionStorage.getItem(`utility-reminder-${row.id}-${row.next_due_date}`)) {
          new Notification(title, { body: `${body} ${etb(row.amount)}` });
          sessionStorage.setItem(`utility-reminder-${row.id}-${row.next_due_date}`, "shown");
        }
      });
    }
  }

  // =========================================================
  // RENDER OVERVIEW AND CHARTS
  // =========================================================
  function renderOverview() {
    const rows = getFilteredTransactions();
    const income = rows.filter(x => x.type === "income").reduce((s,x) => s + Number(x.amount), 0);
    const expenses = rows.filter(x => x.type === "expense").reduce((s,x) => s + Number(x.amount), 0);
    const transfers = rows.filter(x => x.type === "transfer").length;

    $("totalIncome").textContent = etb(income);
    $("totalExpenses").textContent = etb(expenses);
    $("netProfit").textContent = etb(income - expenses);
    $("netProfit").classList.toggle("expense", income < expenses);
    $("totalTransactions").textContent = rows.length;
    $("incomeChange").textContent = `${rows.filter(x => x.type === "income").length} ${t("incomeCount")}`;
    $("expenseChange").textContent = `${rows.filter(x => x.type === "expense").length} ${t("expenseCount")}`;
    $("profitChange").textContent = transfers ? `${transfers} ${t("transfer")}` : "—";
    $("transactionDetail").textContent = `${rows.length} ${t("transactions")}`;
  }

  function groupTimeline(rows) {
    const groups = new Map();
    const now = new Date();

    rows.forEach((row) => {
      const d = dateObject(row.transaction_date);
      if (!d) return;

      let key, label;
      if (state.timelinePeriod === "daily") {
        key = row.transaction_date;
        label = d.toLocaleDateString(undefined, { month:"short", day:"numeric" });
      } else if (state.timelinePeriod === "weekly") {
        const weekStart = new Date(d);
        weekStart.setDate(d.getDate() - ((d.getDay() + 6) % 7));
        key = weekStart.toISOString().slice(0,10);
        label = weekStart.toLocaleDateString(undefined, { month:"short", day:"numeric" });
      } else if (state.timelinePeriod === "yearly") {
        key = String(d.getFullYear());
        label = key;
      } else {
        key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
        label = d.toLocaleDateString(undefined, { month:"short", year:"2-digit" });
      }

      if (!groups.has(key)) groups.set(key, { label, income:0, expense:0 });
      const group = groups.get(key);
      if (row.type === "income") group.income += Number(row.amount);
      if (row.type === "expense") group.expense += Number(row.amount);
    });

    return [...groups.entries()]
      .sort((a,b) => a[0].localeCompare(b[0]))
      .slice(-14)
      .map(([,value]) => value);
  }

  function renderTimelineChart() {
    chartDestroy("timeline");
    const rows = getFilteredTransactions();
    const grouped = groupTimeline(rows);
    $("timelineEmpty").hidden = grouped.length > 0;

    if (!grouped.length || !window.Chart) return;

    state.charts.timeline = new Chart($("timelineChart"), {
      type:"line",
      data:{
        labels:grouped.map(x => x.label),
        datasets:[
          {label:t("income"),data:grouped.map(x => x.income),borderColor:"#2F6B46",backgroundColor:"#2F6B4620",fill:true,tension:.3},
          {label:t("expense"),data:grouped.map(x => x.expense),borderColor:"#B94A48",backgroundColor:"#B94A4820",fill:true,tension:.3}
        ]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        interaction:{mode:"index",intersect:false},
        plugins:{legend:{position:"bottom"}},
        scales:{y:{beginAtZero:true}}
      }
    });
  }

  function renderExpenseChart() {
    chartDestroy("expense");
    const rows = getFilteredTransactions().filter(x => x.type === "expense");
    const categories = {};

    rows.forEach(row => {
      const key = row.category || "Other";
      categories[key] = (categories[key] || 0) + Number(row.amount);
    });

    const labels = Object.keys(categories);
    const values = Object.values(categories);

    $("expenseDistributionContainer").innerHTML = labels.length
      ? labels.map((label,index) => {
          const percent = values.reduce((a,b)=>a+b,0)
            ? values[index] / values.reduce((a,b)=>a+b,0) * 100 : 0;
          return `<div class="expense-item">
            <span>${safe(label)}</span>
            <div class="expense-track"><span style="width:${percent}%"></span></div>
            <strong>${money(values[index])}</strong>
          </div>`;
        }).join("")
      : `<div class="empty-state">${safe(t("noExpenses"))}</div>`;

    if (!labels.length || !window.Chart) return;

    state.charts.expense = new Chart($("expenseChart"), {
      type:"doughnut",
      data:{
        labels,
        datasets:[{
          data:values,
          backgroundColor:["#2F6B46","#B94A48","#B78A3C","#789B65","#6B8EAE","#9B789F","#D69B56","#8D9A8D"],
          borderWidth:2,
          borderColor:"#fff"
        }]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:"bottom"}}
      }
    });
  }

  function renderComparisonChart() {
    chartDestroy("comparison");
    const rows = getFilteredTransactions();
    const income = rows.filter(x => x.type === "income").reduce((s,x)=>s+Number(x.amount),0);
    const expense = rows.filter(x => x.type === "expense").reduce((s,x)=>s+Number(x.amount),0);

    if (!window.Chart) return;
    state.charts.comparison = new Chart($("incomeExpenseChart"), {
      type:"bar",
      data:{
        labels:[t("income"),t("expense")],
        datasets:[{
          label:"ETB",
          data:[income,expense],
          backgroundColor:["#2F6B46","#B94A48"],
          borderRadius:7
        }]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{y:{beginAtZero:true}}
      }
    });
  }

  // =========================================================
  // RENDER GOALS, BUDGETS, UTILITIES AND TRANSACTIONS
  // =========================================================
  function renderGoals() {
    const container = $("goalsContainer");
    if (!state.goals.length) {
      container.innerHTML = `<div class="empty-state">${safe(t("noGoals"))}</div>`;
      return;
    }

    container.innerHTML = state.goals.map(row => {
      const target = Number(row.target_amount);
      const current = Number(row.current_amount);
      const percent = target > 0 ? Math.min(100, current / target * 100) : 0;
      return `<div class="goal-item">
        <div class="goal-header">
          <span class="goal-name">${safe(row.name)}</span>
          <span class="goal-type">${safe(row.goal_type)}</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="progress-text"><span>${etb(current)} / ${etb(target)}</span><span>${percent.toFixed(0)}%</span></div>
        ${row.target_date ? `<div class="muted">${safe(row.target_date)}</div>` : ""}
        <div class="item-actions">
          <button data-action="edit-goal" data-id="${row.id}">${safe(t("edit"))}</button>
          <button class="delete" data-action="delete-goal" data-id="${row.id}">${safe(t("delete"))}</button>
        </div>
      </div>`;
    }).join("");
  }

  function renderBudgets() {
    const container = $("budgetContainer");
    if (!state.budgets.length) {
      container.innerHTML = `<div class="empty-state">${safe(t("noBudgets"))}</div>`;
      return;
    }

    container.innerHTML = state.budgets.map(row => {
      const spent = state.transactions
        .filter(tx => tx.type === "expense" &&
          tx.transaction_date >= row.start_date &&
          tx.transaction_date <= row.end_date)
        .reduce((sum,tx)=>sum+Number(tx.amount),0);
      const total = Number(row.amount);
      const percent = total > 0 ? spent / total * 100 : 0;
      const width = Math.min(100, percent);
      return `<div class="budget-item">
        <div>
          <div class="budget-name">${safe(row.name)}</div>
          <div class="budget-period">${safe(row.start_date)} – ${safe(row.end_date)}</div>
        </div>
        <div>
          <div class="progress-bar"><div class="progress-fill ${percent > 100 ? "over" : ""}" style="width:${width}%"></div></div>
          <div class="progress-text"><span>${safe(t("progress"))}: ${percent.toFixed(1)}%</span><span>${percent > 100 ? safe(t("overdue")) : safe(t("remaining"))}</span></div>
        </div>
        <div class="budget-amounts">
          <strong>${etb(spent)}</strong>
          <div class="budget-period">${safe(t("budget"))}: ${etb(total)}</div>
        </div>
        <div class="item-actions">
          <button data-action="edit-budget" data-id="${row.id}">${safe(t("edit"))}</button>
          <button class="delete" data-action="delete-budget" data-id="${row.id}">${safe(t("delete"))}</button>
        </div>
      </div>`;
    }).join("");
  }

  function renderUtilities() {
    const container = $("utilityContainer");
    const unpaid = state.utilities.filter(x => !x.is_paid);
    const debt = unpaid.reduce((sum,row)=>sum+Number(row.amount),0);
    const overdue = unpaid.filter(row => dayDifference(row.next_due_date) < 0);

    $("utilitySummary").innerHTML = `
      <div class="summary-chip">${safe(t("unpaid"))}: <strong>${unpaid.length}</strong></div>
      <div class="summary-chip">${safe(t("overdue"))}: <strong>${overdue.length}</strong></div>
      <div class="summary-chip">${safe(t("budget"))}: <strong>${etb(debt)}</strong></div>`;

    if (!state.utilities.length) {
      container.innerHTML = `<div class="empty-state">${safe(t("noUtilities"))}</div>`;
      return;
    }

    container.innerHTML = state.utilities.map(row => {
      const days = dayDifference(row.next_due_date);
      const status = row.is_paid ? "paid" : (days < 0 ? "overdue" : "unpaid");
      const statusText = row.is_paid ? t("paid") : (days < 0 ? t("overdue") : t("unpaid"));
      const recurrenceText = row.recurrence === "custom"
        ? `${t("custom")}: ${row.interval_days} ${t("days")}`
        : t(row.recurrence === "once" ? "once" : row.recurrence);

      return `<div class="utility-item">
        <div class="utility-top">
          <div>
            <div class="utility-name">${safe(row.name)}</div>
            <div class="muted">${safe(row.category || "")}</div>
          </div>
          <span class="status-pill ${status}">${safe(statusText)}</span>
        </div>
        <div class="utility-details">
          <span><strong>${etb(row.amount)}</strong></span>
          <span>${safe(t("nextDueDate"))}: ${safe(row.next_due_date)}</span>
          <span>${safe(t("repeat"))}: ${safe(recurrenceText)}</span>
          <span>${safe(t("remindMe"))}: ${safe(row.reminder_days)} ${safe(t("days"))}</span>
          ${row.notes ? `<span>${safe(row.notes)}</span>` : ""}
        </div>
        <div class="item-actions">
          ${!row.is_paid ? `<button data-action="paid-utility" data-id="${row.id}">${safe(t("paid"))}</button>` : ""}
          <button data-action="edit-utility" data-id="${row.id}">${safe(t("edit"))}</button>
          <button class="delete" data-action="delete-utility" data-id="${row.id}">${safe(t("delete"))}</button>
        </div>
      </div>`;
    }).join("");
  }

  function renderTransactions() {
    const container = $("transactionContainer");
    const query = ($("transactionSearch").value || $("globalSearch").value || "").trim().toLowerCase();
    const filter = $("transactionTypeFilter").value;

    const rows = getFilteredTransactions().filter(row => {
      const matchesType = filter === "all" || row.type === filter;
      const text = [row.description,row.category,row.crop_name,row.payment_method,row.notes]
        .join(" ").toLowerCase();
      return matchesType && (!query || text.includes(query));
    });

    if (!rows.length) {
      container.innerHTML = `<div class="empty-state">${safe(t("noTransactions"))}</div>`;
      return;
    }

    container.innerHTML = `<div class="table-wrap"><table class="transaction-table">
      <thead><tr>
        <th>${safe(t("date"))}</th><th>${safe(t("description"))}</th>
        <th>${safe(t("category"))}</th><th>${safe(t("type"))}</th>
        <th>${safe(t("amountETB"))}</th><th>${safe(t("paymentMethod"))}</th>
        <th>${safe(t("edit"))}</th>
      </tr></thead><tbody>
      ${rows.map(row => `<tr>
        <td>${safe(row.transaction_date)}</td>
        <td>${safe(row.description)}</td>
        <td>${safe(row.category || "—")}</td>
        <td><span class="type-badge ${safe(row.type)}">${safe(t(row.type))}</span></td>
        <td>${etb(row.amount)}</td>
        <td>${safe(row.payment_method || "—")}</td>
        <td><div class="row-actions">
          <button data-action="edit-transaction" data-id="${row.id}" title="${safe(t("edit"))}"><i class="fas fa-edit"></i></button>
          <button class="delete" data-action="delete-transaction" data-id="${row.id}" title="${safe(t("delete"))}"><i class="fas fa-trash"></i></button>
        </div></td>
      </tr>`).join("")}
      </tbody></table></div>`;
  }

  function renderAll() {
    if (!state.db) return;
    renderOverview();
    renderTimelineChart();
    renderExpenseChart();
    renderComparisonChart();
    renderGoals();
    renderBudgets();
    renderUtilities();
    renderTransactions();
  }

  // =========================================================
  // CSV EXPORT
  // =========================================================
  function exportTransactions() {
    const rows = getFilteredTransactions();
    if (!rows.length) {
      toast(t("noTransactions"), "warning");
      return;
    }

    const columns = [
      "transaction_date","type","category","description",
      "crop_name","payment_method","amount","notes"
    ];

    const csv = [
      columns.join(","),
      ...rows.map(row => columns.map(key =>
        `"${String(row[key] ?? "").replace(/"/g,'""')}"`
      ).join(","))
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], { type:"text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `agrinova-finance-${todayISO()}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  // =========================================================
  // EVENT HANDLERS
  // =========================================================
  function bindEvents() {
    $("languageButton").addEventListener("click", () => {
      $("languageMenu").classList.toggle("show");
    });

    $("languageMenu").addEventListener("click", (event) => {
      const button = event.target.closest("[data-language]");
      if (!button) return;
      state.language = button.dataset.language;
      $("languageMenu").classList.remove("show");
      applyTranslations();
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".language-wrap")) {
        $("languageMenu").classList.remove("show");
      }
    });

    $("mobileMenu").addEventListener("click", () => $("sidebar").classList.toggle("open"));

    $("dateRange").addEventListener("change", (event) => {
      state.range = event.target.value;
      $("customDatePanel").hidden = state.range !== "custom";
      renderAll();
    });

    $("applyCustomDate").addEventListener("click", () => {
      const start = $("customStartDate").value;
      const end = $("customEndDate").value;
      if (!start || !end || end < start) {
        toast(t("invalidDates"), "error");
        return;
      }
      state.customStart = start;
      state.customEnd = end;
      renderAll();
    });

    document.querySelectorAll(".timeline-btn").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".timeline-btn").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        state.timelinePeriod = button.dataset.period;
        renderTimelineChart();
      });
    });

    $("addIncomeButton").addEventListener("click", () => openTransactionModal("income"));
    $("addExpenseButton").addEventListener("click", () => openTransactionModal("expense"));
    $("addTransferButton").addEventListener("click", () => {
      toast(t("transferNote"), "warning");
    });
    $("createGoalButton").addEventListener("click", () => openGoalModal());
    $("createBudgetButton").addEventListener("click", () => openBudgetModal());
    $("addUtilityButton").addEventListener("click", () => openUtilityModal());

    $("transTypeSelect").addEventListener("change", () => categoryOptions($("transTypeSelect").value));
    $("utilityRecurrence").addEventListener("change", () => {
      $("customIntervalGroup").hidden = $("utilityRecurrence").value !== "custom";
    });

    $("transactionForm").addEventListener("submit", saveTransaction);
    $("goalForm").addEventListener("submit", saveGoal);
    $("budgetForm").addEventListener("submit", saveBudget);
    $("utilityForm").addEventListener("submit", saveUtility);

    $("transactionSearch").addEventListener("input", renderTransactions);
    $("transactionTypeFilter").addEventListener("change", renderTransactions);
    $("globalSearch").addEventListener("input", renderTransactions);
    $("exportButton").addEventListener("click", exportTransactions);

    document.querySelectorAll("[data-close]").forEach(button => {
      button.addEventListener("click", () => closeModal(button.dataset.close));
    });

    document.querySelectorAll(".modal").forEach(modal => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.classList.remove("show");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach(modal => modal.classList.remove("show"));
      }
    });

    document.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const { action, id } = button.dataset;

      const find = (items) => items.find(item => item.id === id);

      switch (action) {
        case "edit-transaction": openTransactionModal("income", find(state.transactions)); break;
        case "delete-transaction": await removeTransaction(id); break;
        case "edit-goal": openGoalModal(find(state.goals)); break;
        case "delete-goal": await removeGoal(id); break;
        case "edit-budget": openBudgetModal(find(state.budgets)); break;
        case "delete-budget": await removeBudget(id); break;
        case "edit-utility": openUtilityModal(find(state.utilities)); break;
        case "delete-utility": await removeUtility(id); break;
        case "paid-utility": await markUtilityPaid(id); break;
      }
    });

    $("notifIcon").addEventListener("click", () => {
      const due = state.utilities.filter(row => !row.is_paid &&
        dayDifference(row.next_due_date) >= 0 &&
        dayDifference(row.next_due_date) <= Number(row.reminder_days));

      if (!due.length) {
        toast(t("noUtilities"), "warning");
        return;
      }

      toast(due.map(row =>
        `${row.name}: ${row.next_due_date} (${etb(row.amount)})`
      ).join(" | "), "warning");
    });
  }

  // =========================================================
  // STARTUP
  // =========================================================
  async function init() {
    setDefaultDates();
    categoryOptions("income");
    bindEvents();

    try {
      await initializeSupabase();
      await loadAllData();

      if ("Notification" in window && Notification.permission === "default") {
        // Permission is requested only after the farmer interacts with the bell.
        $("notifIcon").addEventListener("click", async () => {
          if (Notification.permission === "default") {
            await Notification.requestPermission();
          }
        }, { once:true });
      }
    } catch (error) {
      console.error("AgriNova Finance initialization:", error);
      toast(error.message || t("loadError"), "error");
    }
  }

  init();
})();