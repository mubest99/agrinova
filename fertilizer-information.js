/**
 * AgriNova — Fertilizer Information
 * Complete JavaScript functionality
 */

// ============================================================
// 1. FERTILIZER DATASET (VERIFIED DATA FROM AGRINOVA LIBRARY)
// ============================================================

const fertilizerData = [
    {
        id: "F001",
        name: "Urea",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer",
        tradeName: "Urea",
        manufacturer: "Various international and regional manufacturers",
        n: "46%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Amide nitrogen",
        suitableCrops: ["Teff", "Maize", "Wheat", "Barley", "Sorghum"],
        cropCategory: "Cereals",
        growthStage: "Vegetative growth",
        purpose: "Nitrogen supply, leaf growth, protein synthesis",
        applicationMethod: "Broadcasting, Side dressing",
        applicationTiming: "After crop establishment, during active vegetative growth",
        applicationStage: "Vegetative (tillering to stem elongation)",
        placementMethod: "Surface broadcast, soil incorporation",
        applicationFrequency: "Split application (1–2 top dressings)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range; best on soils with adequate P and K",
        soilPhConsiderations: "Performs best where pH is not strongly acidic; volatilization risk at high pH",
        relevantSoilConditions: "Not recommended on waterlogged soils; avoid application before heavy rain",
        deficienciesAddressed: "Nitrogen deficiency (chlorosis of older leaves, stunting)",
        ethiopianUse: "Widely used in Ethiopian cereal production",
        ethiopianDistribution: "Widely distributed through Ethiopian Agricultural Transformation Agency (ATA) and cooperative networks",
        ethiopianRecommendations: "Recommended in Ethiopian extension materials for cereal crops; rates vary by woreda",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "EIAR / Ethiopian Ministry of Agriculture / FAO",
        sourceReference: "General agronomic documentation; Ethiopian extension materials",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally documented nitrogen fertilizer. Ethiopian-specific rates require EIAR verification."
    },
    {
        id: "F002",
        name: "Diammonium Phosphate",
        localName: "DAP (widely recognized acronym in Ethiopia)",
        type: "Compound/Phosphorus fertilizer",
        tradeName: "DAP",
        manufacturer: "Various international and regional manufacturers",
        n: "18%",
        p: "46% (as P₂O₅)",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Ammonium nitrogen; water-soluble phosphate",
        suitableCrops: ["Teff", "Wheat", "Maize", "Barley", "Faba bean"],
        cropCategory: "Cereals, Pulses",
        growthStage: "Basal application, early growth",
        purpose: "Phosphorus supply for root development; nitrogen starter",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting / sowing",
        applicationStage: "Early growth, seedling",
        placementMethod: "Soil incorporation at planting",
        applicationFrequency: "Once per season (basal)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range; beneficial on P-deficient soils",
        soilPhConsiderations: "Best on slightly acidic to neutral soils; P availability lower in very acidic soils",
        relevantSoilConditions: "Avoid where soil P is already very high",
        deficienciesAddressed: "Phosphorus deficiency (purple/red leaves, poor root development)",
        ethiopianUse: "Widely used in Ethiopian cereal and pulse production",
        ethiopianDistribution: "Widely distributed; part of national fertilizer programs",
        ethiopianRecommendations: "Recommended in Ethiopian extension materials for P-deficient soils; verify current rates with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "EIAR / Ethiopian Ministry of Agriculture / FAO",
        sourceReference: "General agronomic documentation; Ethiopian extension materials",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product. N and P₂O₅ content is industry standard."
    },
    {
        id: "F003",
        name: "Triple Superphosphate",
        localName: "Not available from verified source",
        type: "Phosphorus fertilizer",
        tradeName: "TSP",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "46% (as P₂O₅)",
        k: "0%",
        s: "11–12% (as calcium sulfate)",
        otherNutrients: "Calcium (Ca) present",
        nutrientForm: "Monocalcium phosphate",
        suitableCrops: ["Wheat", "Maize", "Teff", "Pulses"],
        cropCategory: "Cereals, Pulses",
        growthStage: "Basal application, early growth",
        purpose: "Phosphorus supply for root development",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting / sowing",
        applicationStage: "Early growth, seedling",
        placementMethod: "Soil incorporation at planting",
        applicationFrequency: "Once per season (basal)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range; beneficial on P-deficient soils",
        soilPhConsiderations: "Best on neutral to slightly acidic soils",
        relevantSoilConditions: "Not recommended on highly acidic soils without prior liming",
        deficienciesAddressed: "Phosphorus deficiency",
        ethiopianUse: "Documented in some Ethiopian agricultural systems",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "TSP is a globally standard product with well-documented nutrient content."
    },
    {
        id: "F004",
        name: "Nitrogen Phosphorus Sulfur (NPS)",
        localName: "NPS (commonly referred to by acronym in Ethiopia)",
        type: "Blended fertilizer",
        tradeName: "NPS",
        manufacturer: "Blended in Ethiopia under national program",
        n: "19% (typical; verify specific blend)",
        p: "38% (as P₂O₅; verify specific blend)",
        k: "0%",
        s: "7% (typical; verify specific blend)",
        otherNutrients: "None documented",
        nutrientForm: "Ammonium nitrogen; water-soluble phosphate; sulfate",
        suitableCrops: ["Teff", "Wheat", "Maize", "Barley"],
        cropCategory: "Cereals",
        growthStage: "Basal application, early growth",
        purpose: "Balanced N, P, and S supply for crop establishment",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting / sowing",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation at planting",
        applicationFrequency: "Once per season (basal)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on soils deficient in P and S",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Particularly suited to Ethiopian soils with documented S deficiency",
        deficienciesAddressed: "Phosphorus and sulfur deficiencies",
        ethiopianUse: "Increasingly promoted under Ethiopian soil fertility programs",
        ethiopianDistribution: "Distributed through ATA and cooperative networks",
        ethiopianRecommendations: "Recommended for Ethiopian soils with known S deficiency; verify rates with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "Ethiopian Ministry of Agriculture / ATA / EIAR",
        sourceReference: "Ethiopian Soil Fertility Program documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "NPS formulations may vary by blending ratio. Verify exact N-P-S percentages with Ethiopian authorities."
    },
    {
        id: "F005",
        name: "Nitrogen Phosphorus Sulfur Boron (NPSB)",
        localName: "NPSB",
        type: "Blended fertilizer",
        tradeName: "NPSB",
        manufacturer: "Blended in Ethiopia under national program",
        n: "18–19% (typical; verify specific blend)",
        p: "38% (as P₂O₅; verify specific blend)",
        k: "0%",
        s: "7% (typical; verify specific blend)",
        otherNutrients: "Boron (B) 0.5–1% (verify specific blend)",
        nutrientForm: "Ammonium nitrogen; water-soluble phosphate; sulfate; borate",
        suitableCrops: ["Teff", "Wheat", "Maize", "Faba bean", "Chickpea"],
        cropCategory: "Cereals, Pulses",
        growthStage: "Basal application, early growth",
        purpose: "N, P, S, and B supply for crop establishment and boron deficiency correction",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting / sowing",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation at planting",
        applicationFrequency: "Once per season (basal)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on soils deficient in P, S, and B",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Particularly suited to Ethiopian soils with documented B deficiency",
        deficienciesAddressed: "Phosphorus, sulfur, and boron deficiencies",
        ethiopianUse: "Promoted under Ethiopian soil fertility programs for B-deficient soils",
        ethiopianDistribution: "Distributed through ATA and cooperative networks",
        ethiopianRecommendations: "Recommended for Ethiopian soils with B deficiency; verify rates with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "Ethiopian Ministry of Agriculture / ATA / EIAR",
        sourceReference: "Ethiopian Soil Fertility Program documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "NPSB formulations may vary. Boron content should be verified with Ethiopian authorities."
    },
    {
        id: "F006",
        name: "Potassium Chloride",
        localName: "Not available from verified source",
        type: "Potassium fertilizer",
        tradeName: "Muriate of Potash (MOP)",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "60% (as K₂O)",
        s: "0%",
        otherNutrients: "Chloride (Cl) present",
        nutrientForm: "Potassium chloride (KCl)",
        suitableCrops: ["Maize", "Wheat", "Barley", "Coffee", "Vegetables"],
        cropCategory: "Cereals, Vegetables, Coffee",
        growthStage: "Basal application or side dressing",
        purpose: "Potassium supply for water regulation, enzyme activation, and stress tolerance",
        applicationMethod: "Broadcasting, Band application, Side dressing",
        applicationTiming: "At planting or during vegetative growth",
        applicationStage: "Basal or early vegetative",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season or split depending on crop",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on K-deficient soils",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Avoid on chloride-sensitive crops or saline soils",
        deficienciesAddressed: "Potassium deficiency (leaf margin chlorosis, weak stems)",
        ethiopianUse: "Not widely used historically; increasingly recommended for K-deficient soils",
        ethiopianDistribution: "Limited; emerging distribution through ATA programs",
        ethiopianRecommendations: "Recommended for Ethiopian soils with K deficiency; verify with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC / EIAR",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product with 60% K₂O content."
    },
    {
        id: "F007",
        name: "Potassium Sulfate",
        localName: "Not available from verified source",
        type: "Potassium fertilizer",
        tradeName: "Sulfate of Potash (SOP)",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "50% (as K₂O)",
        s: "17–18%",
        otherNutrients: "None documented",
        nutrientForm: "Potassium sulfate (K₂SO₄)",
        suitableCrops: ["Coffee", "Vegetables", "Fruits", "Potato"],
        cropCategory: "Coffee, Vegetables, Fruits, Root and tuber crops",
        growthStage: "Basal application or side dressing",
        purpose: "Potassium and sulfur supply; preferred for chloride-sensitive crops",
        applicationMethod: "Broadcasting, Band application, Side dressing",
        applicationTiming: "At planting or during vegetative growth",
        applicationStage: "Basal or early vegetative",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season or split depending on crop",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on K and S deficient soils",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Preferred on chloride-sensitive crops and saline soils",
        deficienciesAddressed: "Potassium and sulfur deficiencies",
        ethiopianUse: "Documented for high-value crops; limited data on general use",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product with 50% K₂O and 17–18% S content."
    },
    {
        id: "F008",
        name: "Ammonium Nitrate",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer",
        tradeName: "Ammonium Nitrate",
        manufacturer: "Various international manufacturers",
        n: "33–34.5%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Ammonium and nitrate nitrogen (NH₄NO₃)",
        suitableCrops: ["Wheat", "Maize", "Barley", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Top dressing, vegetative growth",
        purpose: "Rapid nitrogen supply",
        applicationMethod: "Broadcasting, Side dressing",
        applicationTiming: "During vegetative growth",
        applicationStage: "Vegetative (tillering to stem elongation)",
        placementMethod: "Surface broadcast, soil incorporation",
        applicationFrequency: "Split application (1–2 top dressings)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range; nitrate leaching risk in wet conditions",
        relevantSoilConditions: "Avoid on waterlogged soils",
        deficienciesAddressed: "Nitrogen deficiency",
        ethiopianUse: "Less common than Urea; documented in some systems",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product with 33–34.5% N content."
    },
    {
        id: "F009",
        name: "Calcium Ammonium Nitrate",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer",
        tradeName: "CAN",
        manufacturer: "Various international manufacturers",
        n: "27%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Calcium (Ca) 8–10% (as CaO)",
        nutrientForm: "Ammonium and nitrate nitrogen; calcium carbonate",
        suitableCrops: ["Wheat", "Maize", "Barley", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Top dressing, vegetative growth",
        purpose: "Nitrogen supply with calcium for soil conditioning",
        applicationMethod: "Broadcasting, Side dressing",
        applicationTiming: "During vegetative growth",
        applicationStage: "Vegetative",
        placementMethod: "Surface broadcast, soil incorporation",
        applicationFrequency: "Split application",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range; beneficial on acidic soils",
        soilPhConsiderations: "Calcium content can help moderate soil acidity",
        relevantSoilConditions: "Preferred on acidic soils",
        deficienciesAddressed: "Nitrogen and calcium deficiencies",
        ethiopianUse: "Documented in some Ethiopian systems",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product. Calcium content varies by manufacturer."
    },
    {
        id: "F010",
        name: "Ammonium Sulfate",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer",
        tradeName: "Ammonium Sulfate",
        manufacturer: "Various international manufacturers",
        n: "21%",
        p: "0%",
        k: "0%",
        s: "24%",
        otherNutrients: "None documented",
        nutrientForm: "Ammonium nitrogen; sulfate",
        suitableCrops: ["Maize", "Wheat", "Teff", "Oilseeds"],
        cropCategory: "Cereals, Oilseeds",
        growthStage: "Basal or top dressing",
        purpose: "Nitrogen and sulfur supply; soil acidification where needed",
        applicationMethod: "Broadcasting, Side dressing",
        applicationTiming: "At planting or during vegetative growth",
        applicationStage: "Basal or early vegetative",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once or split",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on S-deficient soils; can acidify soil",
        soilPhConsiderations: "Acidifying effect; use with caution on already acidic soils",
        relevantSoilConditions: "Preferred on alkaline or S-deficient soils",
        deficienciesAddressed: "Nitrogen and sulfur deficiencies",
        ethiopianUse: "Documented in some Ethiopian systems; S supply increasingly recognized",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product with 21% N and 24% S."
    },
    {
        id: "F011",
        name: "Single Superphosphate",
        localName: "Not available from verified source",
        type: "Phosphorus fertilizer",
        tradeName: "SSP",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "16–20% (as P₂O₅)",
        k: "0%",
        s: "11–12%",
        otherNutrients: "Calcium (Ca) present",
        nutrientForm: "Monocalcium phosphate; gypsum",
        suitableCrops: ["Wheat", "Maize", "Teff", "Pulses"],
        cropCategory: "Cereals, Pulses",
        growthStage: "Basal application, early growth",
        purpose: "Phosphorus and sulfur supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season (basal)",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range; beneficial on P and S deficient soils",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Best where S is also deficient",
        deficienciesAddressed: "Phosphorus and sulfur deficiencies",
        ethiopianUse: "Not available from verified source",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product. P₂O₅ content varies by source (16–20%)."
    },
    {
        id: "F012",
        name: "NPK 15-15-15",
        localName: "Not available from verified source",
        type: "Compound fertilizer",
        tradeName: "NPK 15-15-15",
        manufacturer: "Various international manufacturers",
        n: "15%",
        p: "15% (as P₂O₅)",
        k: "15% (as K₂O)",
        s: "Varies by formulation",
        otherNutrients: "Varies by formulation",
        nutrientForm: "Mixed N, P, and K sources",
        suitableCrops: ["Maize", "Wheat", "Vegetables", "Fruits"],
        cropCategory: "Cereals, Vegetables, Fruits",
        growthStage: "Basal application",
        purpose: "Balanced N, P, K supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Best where all three macronutrients are deficient",
        deficienciesAddressed: "N, P, and K deficiencies",
        ethiopianUse: "Not widely documented; emerging for high-value crops",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N-P-K ratio is 1:1:1. Actual nutrient form varies by manufacturer."
    },
    {
        id: "F013",
        name: "NPK 20-20-20",
        localName: "Not available from verified source",
        type: "Compound fertilizer",
        tradeName: "NPK 20-20-20",
        manufacturer: "Various international manufacturers",
        n: "20%",
        p: "20% (as P₂O₅)",
        k: "20% (as K₂O)",
        s: "Varies by formulation",
        otherNutrients: "Varies by formulation",
        nutrientForm: "Mixed N, P, and K sources",
        suitableCrops: ["Vegetables", "Fruits", "Maize"],
        cropCategory: "Vegetables, Fruits, Cereals",
        growthStage: "Basal application or side dressing",
        purpose: "Balanced N, P, K supply",
        applicationMethod: "Broadcasting, Band application, Foliar (if soluble)",
        applicationTiming: "At planting or during growth",
        applicationStage: "Variable",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once or split",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Best where all three macronutrients are deficient",
        deficienciesAddressed: "N, P, and K deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N-P-K ratio is 1:1:1."
    },
    {
        id: "F014",
        name: "NPK 10-20-10",
        localName: "Not available from verified source",
        type: "Compound fertilizer",
        tradeName: "NPK 10-20-10",
        manufacturer: "Various international manufacturers",
        n: "10%",
        p: "20% (as P₂O₅)",
        k: "10% (as K₂O)",
        s: "Varies by formulation",
        otherNutrients: "Varies by formulation",
        nutrientForm: "Mixed N, P, and K sources",
        suitableCrops: ["Pulses", "Faba bean", "Chickpea"],
        cropCategory: "Pulses",
        growthStage: "Basal application",
        purpose: "High phosphorus supply with balanced N and K",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on P-deficient soils",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Best where P is the limiting nutrient",
        deficienciesAddressed: "Phosphorus deficiency primarily",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N-P-K ratio is 1:2:1."
    },
    {
        id: "F015",
        name: "Zinc Sulfate",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Zinc Sulfate",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "17–18%",
        otherNutrients: "Zinc (Zn) 22–36%",
        nutrientForm: "Zinc sulfate (ZnSO₄)",
        suitableCrops: ["Maize", "Wheat", "Teff", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Basal application or foliar",
        purpose: "Zinc deficiency correction",
        applicationMethod: "Soil application, Foliar application",
        applicationTiming: "At planting or when deficiency symptoms appear",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation or foliar spray",
        applicationFrequency: "Once per season or as needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (soil) or g/L (foliar)",
        soilType: "Best on Zn-deficient soils",
        soilPhConsiderations: "Zn availability decreases in alkaline soils",
        relevantSoilConditions: "Deficiency common in calcareous and high-pH soils",
        deficienciesAddressed: "Zinc deficiency (stunted growth, small leaves, interveinal chlorosis)",
        ethiopianUse: "Documented in some Ethiopian soils with Zn deficiency",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Zinc content varies by formulation (monohydrate vs heptahydrate)."
    },
    {
        id: "F016",
        name: "Borax (Sodium Borate)",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Borax (Sodium Borate)",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Boron (B) 11%",
        nutrientForm: "Sodium tetraborate (Na₂B₄O₇·10H₂O)",
        suitableCrops: ["Faba bean", "Chickpea", "Vegetables", "Fruits"],
        cropCategory: "Pulses, Vegetables, Fruits",
        growthStage: "Basal application or foliar",
        purpose: "Boron deficiency correction",
        applicationMethod: "Soil application, Foliar application",
        applicationTiming: "At planting or when deficiency symptoms appear",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation or foliar spray",
        applicationFrequency: "Once per season or as needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (soil) or g/L (foliar)",
        soilType: "Best on B-deficient soils",
        soilPhConsiderations: "B availability decreases in alkaline soils",
        relevantSoilConditions: "Deficiency common in sandy and calcareous soils",
        deficienciesAddressed: "Boron deficiency (poor flowering, fruit set, and root development)",
        ethiopianUse: "Documented in some Ethiopian soils with B deficiency",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Boron content is approximately 11% for standard borax."
    },
    {
        id: "F017",
        name: "Magnesium Sulfate",
        localName: "Not available from verified source",
        type: "Micronutrient/Secondary nutrient fertilizer",
        tradeName: "Epsom Salt",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "13%",
        otherNutrients: "Magnesium (Mg) 9.8%",
        nutrientForm: "Magnesium sulfate (MgSO₄·7H₂O)",
        suitableCrops: ["Vegetables", "Fruits", "Coffee", "Maize"],
        cropCategory: "Vegetables, Fruits, Coffee, Cereals",
        growthStage: "Foliar or soil application",
        purpose: "Magnesium and sulfur supply",
        applicationMethod: "Foliar application, Soil application",
        applicationTiming: "When deficiency symptoms appear or during growth",
        applicationStage: "Vegetative",
        placementMethod: "Foliar spray or soil incorporation",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (soil) or g/L (foliar)",
        soilType: "Best on Mg-deficient soils",
        soilPhConsiderations: "Mg availability decreases in acidic soils",
        relevantSoilConditions: "Deficiency common in sandy and acidic soils",
        deficienciesAddressed: "Magnesium deficiency (interveinal chlorosis on older leaves) and sulfur deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Standard Epsom salt contains approximately 9.8% Mg and 13% S."
    },
    {
        id: "F018",
        name: "Iron Sulfate",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Ferrous Sulfate",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "11–13%",
        otherNutrients: "Iron (Fe) 19–20%",
        nutrientForm: "Ferrous sulfate (FeSO₄·7H₂O)",
        suitableCrops: ["Vegetables", "Fruits", "Maize", "Sorghum"],
        cropCategory: "Vegetables, Fruits, Cereals",
        growthStage: "Foliar or soil application",
        purpose: "Iron deficiency correction",
        applicationMethod: "Foliar application, Soil application",
        applicationTiming: "When deficiency symptoms appear",
        applicationStage: "Vegetative",
        placementMethod: "Foliar spray or soil incorporation",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (soil) or g/L (foliar)",
        soilType: "Best on Fe-deficient soils",
        soilPhConsiderations: "Fe availability decreases in alkaline soils",
        relevantSoilConditions: "Deficiency common in calcareous and high-pH soils",
        deficienciesAddressed: "Iron deficiency (interveinal chlorosis on young leaves)",
        ethiopianUse: "Documented in some Ethiopian soils with Fe deficiency",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Standard heptahydrate contains approximately 19–20% Fe."
    },
    {
        id: "F019",
        name: "Manganese Sulfate",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Manganese Sulfate",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "17–19%",
        otherNutrients: "Manganese (Mn) 24–32%",
        nutrientForm: "Manganese sulfate (MnSO₄)",
        suitableCrops: ["Wheat", "Maize", "Vegetables", "Fruits"],
        cropCategory: "Cereals, Vegetables, Fruits",
        growthStage: "Foliar or soil application",
        purpose: "Manganese deficiency correction",
        applicationMethod: "Foliar application, Soil application",
        applicationTiming: "When deficiency symptoms appear",
        applicationStage: "Vegetative",
        placementMethod: "Foliar spray or soil incorporation",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (soil) or g/L (foliar)",
        soilType: "Best on Mn-deficient soils",
        soilPhConsiderations: "Mn availability decreases in alkaline soils",
        relevantSoilConditions: "Deficiency common in high-pH and organic soils",
        deficienciesAddressed: "Manganese deficiency (interveinal chlorosis)",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Mn content varies by formulation (monohydrate vs tetrahydrate)."
    },
    {
        id: "F020",
        name: "Copper Sulfate",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Copper Sulfate",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "12%",
        otherNutrients: "Copper (Cu) 25%",
        nutrientForm: "Copper sulfate (CuSO₄·5H₂O)",
        suitableCrops: ["Wheat", "Barley", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Foliar or soil application",
        purpose: "Copper deficiency correction",
        applicationMethod: "Foliar application, Soil application",
        applicationTiming: "When deficiency symptoms appear",
        applicationStage: "Vegetative",
        placementMethod: "Foliar spray or soil incorporation",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (soil) or g/L (foliar)",
        soilType: "Best on Cu-deficient soils",
        soilPhConsiderations: "Cu availability decreases in alkaline soils",
        relevantSoilConditions: "Deficiency common in sandy and organic soils",
        deficienciesAddressed: "Copper deficiency (wilting, dieback, poor grain fill)",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Standard pentahydrate contains approximately 25% Cu."
    },
    {
        id: "F021",
        name: "Diammonium Phosphate + Zinc",
        localName: "Not available from verified source",
        type: "Compound fertilizer with micronutrient",
        tradeName: "DAP+Zn",
        manufacturer: "Various international manufacturers",
        n: "18%",
        p: "46% (as P₂O₅)",
        k: "0%",
        s: "0%",
        otherNutrients: "Zinc (Zn) typically 1–2%",
        nutrientForm: "Ammonium nitrogen; water-soluble phosphate; zinc",
        suitableCrops: ["Maize", "Wheat", "Teff"],
        cropCategory: "Cereals",
        growthStage: "Basal application",
        purpose: "Phosphorus, nitrogen, and zinc supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on P and Zn deficient soils",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Particularly suited to soils with combined P and Zn deficiency",
        deficienciesAddressed: "Phosphorus and zinc deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Zinc content varies by manufacturer. Verify exact formulation."
    },
    {
        id: "F022",
        name: "Urea Ammonium Nitrate",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer (liquid)",
        tradeName: "UAN",
        manufacturer: "Various international manufacturers",
        n: "28–32%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Urea, ammonium nitrate, and water solution",
        suitableCrops: ["Maize", "Wheat", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Top dressing, vegetative growth",
        purpose: "Nitrogen supply",
        applicationMethod: "Foliar application, Soil injection, Broadcasting",
        applicationTiming: "During vegetative growth",
        applicationStage: "Vegetative",
        placementMethod: "Surface application or injection",
        applicationFrequency: "Split application",
        recommendedRate: "Not available from verified source",
        applicationUnit: "L/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Avoid application before heavy rain",
        deficienciesAddressed: "Nitrogen deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Liter",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N content typically 28–32% depending on formulation."
    },
    {
        id: "F023",
        name: "Calcium Nitrate",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer",
        tradeName: "Calcium Nitrate",
        manufacturer: "Various international manufacturers",
        n: "15.5%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Calcium (Ca) 19–26% (as CaO)",
        nutrientForm: "Calcium nitrate (Ca(NO₃)₂)",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Top dressing, vegetative growth",
        purpose: "Nitrogen and calcium supply",
        applicationMethod: "Foliar application, Soil application, Fertigation",
        applicationTiming: "During vegetative growth",
        applicationStage: "Vegetative",
        placementMethod: "Soil application or fertigation",
        applicationFrequency: "Split application",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Neutral to slightly alkaline effect",
        relevantSoilConditions: "Beneficial where calcium is deficient",
        deficienciesAddressed: "Nitrogen and calcium deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "25 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Standard product contains 15.5% N and variable Ca content."
    },
    {
        id: "F024",
        name: "Monoammonium Phosphate",
        localName: "Not available from verified source",
        type: "Compound/Phosphorus fertilizer",
        tradeName: "MAP",
        manufacturer: "Various international manufacturers",
        n: "11–12%",
        p: "52% (as P₂O₅)",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Ammonium phosphate (NH₄H₂PO₄)",
        suitableCrops: ["Maize", "Wheat", "Teff", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Basal application",
        purpose: "Phosphorus and nitrogen supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on P-deficient soils",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Best where P is the limiting nutrient",
        deficienciesAddressed: "Phosphorus deficiency",
        ethiopianUse: "Less common than DAP in Ethiopia",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Standard product contains 11–12% N and 52% P₂O₅."
    },
    {
        id: "F025",
        name: "Gypsum",
        localName: "Not available from verified source",
        type: "Soil amendment / Secondary nutrient fertilizer",
        tradeName: "Gypsum",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "18%",
        otherNutrients: "Calcium (Ca) 22–23%",
        nutrientForm: "Calcium sulfate (CaSO₄·2H₂O)",
        suitableCrops: ["Wheat", "Maize", "Teff", "Faba bean"],
        cropCategory: "Cereals, Pulses",
        growthStage: "Pre-planting soil amendment",
        purpose: "Calcium and sulfur supply; soil structure improvement",
        applicationMethod: "Broadcasting",
        applicationTiming: "Before planting",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season or as needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on S-deficient soils; can improve sodic soils",
        soilPhConsiderations: "Neutral effect on pH",
        relevantSoilConditions: "Beneficial on sodic and S-deficient soils",
        deficienciesAddressed: "Sulfur and calcium deficiencies",
        ethiopianUse: "Documented in some Ethiopian soil fertility programs",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Agricultural gypsum has variable purity. Ca and S content may vary."
    },
    {
        id: "F026",
        name: "Dolomitic Lime",
        localName: "Not available from verified source",
        type: "Soil amendment / Liming material",
        tradeName: "Dolomitic Lime",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Calcium (Ca) 20–30% (as CaO); Magnesium (Mg) 10–20% (as MgO)",
        nutrientForm: "Calcium magnesium carbonate (CaMg(CO₃)₂)",
        suitableCrops: ["All crops grown on acidic soils"],
        cropCategory: "Cereals, Pulses, Coffee, Vegetables",
        growthStage: "Pre-planting soil amendment",
        purpose: "Soil pH correction; calcium and magnesium supply",
        applicationMethod: "Broadcasting",
        applicationTiming: "Before planting (several weeks prior)",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Every 2–5 years depending on soil pH",
        recommendedRate: "Not available from verified source",
        applicationUnit: "t/ha (when documented)",
        soilType: "Acidic soils",
        soilPhConsiderations: "Raises soil pH",
        relevantSoilConditions: "Best applied to acidic soils",
        deficienciesAddressed: "Calcium and magnesium deficiencies; aluminum toxicity from low pH",
        ethiopianUse: "Documented for acidic soils in highland areas",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Recommended for acidic soils; verify rates with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / EIAR",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies by source."
    },
    {
        id: "F027",
        name: "Calcitic Lime",
        localName: "Not available from verified source",
        type: "Soil amendment / Liming material",
        tradeName: "Agricultural Lime",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Calcium (Ca) 30–40% (as CaO)",
        nutrientForm: "Calcium carbonate (CaCO₃)",
        suitableCrops: ["All crops grown on acidic soils"],
        cropCategory: "Cereals, Pulses, Coffee, Vegetables",
        growthStage: "Pre-planting soil amendment",
        purpose: "Soil pH correction; calcium supply",
        applicationMethod: "Broadcasting",
        applicationTiming: "Before planting (several weeks prior)",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Every 2–5 years depending on soil pH",
        recommendedRate: "Not available from verified source",
        applicationUnit: "t/ha (when documented)",
        soilType: "Acidic soils",
        soilPhConsiderations: "Raises soil pH",
        relevantSoilConditions: "Best applied to acidic soils",
        deficienciesAddressed: "Calcium deficiency; aluminum toxicity from low pH",
        ethiopianUse: "Documented for acidic soils in highland areas",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Recommended for acidic soils; verify rates with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / EIAR",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Calcium content varies by source purity."
    },
    {
        id: "F028",
        name: "Compost",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Farmyard Compost",
        manufacturer: "Farm-produced; no single manufacturer",
        n: "0.5–1.5% (varies widely)",
        p: "0.2–0.8% (as P₂O₅; varies)",
        k: "0.5–1.5% (as K₂O; varies)",
        s: "Varies",
        otherNutrients: "Contains micronutrients and organic matter",
        nutrientForm: "Organic forms of N, P, and K",
        suitableCrops: ["All crops"],
        cropCategory: "Cereals, Pulses, Vegetables, Coffee, Fruits",
        growthStage: "Pre-planting soil amendment",
        purpose: "Soil organic matter improvement; slow-release nutrient supply",
        applicationMethod: "Broadcasting",
        applicationTiming: "Before planting",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Annually or per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "t/ha (when documented)",
        soilType: "All soil types; especially degraded soils",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for low organic matter soils",
        deficienciesAddressed: "General soil fertility improvement",
        ethiopianUse: "Widely used where available",
        ethiopianDistribution: "Farm-produced; not commercially distributed",
        ethiopianRecommendations: "Recommended in integrated soil fertility management",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Not standardized",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / EIAR",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies widely depending on source materials and maturity."
    },
    {
        id: "F029",
        name: "Vermicompost",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Vermicompost",
        manufacturer: "Various producers",
        n: "1–2% (varies)",
        p: "0.5–1% (as P₂O₅; varies)",
        k: "1–2% (as K₂O; varies)",
        s: "Varies",
        otherNutrients: "Contains micronutrients and beneficial microbes",
        nutrientForm: "Organic forms of N, P, and K",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Pre-planting soil amendment",
        purpose: "Soil organic matter improvement; nutrient supply; microbial activity",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "Before planting",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Annually",
        recommendedRate: "Not available from verified source",
        applicationUnit: "t/ha (when documented)",
        soilType: "All soil types",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for degraded soils",
        deficienciesAddressed: "General soil fertility improvement",
        ethiopianUse: "Documented in some high-value crop systems",
        ethiopianDistribution: "Limited",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Not standardized",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies widely."
    },
    {
        id: "F030",
        name: "Bone Meal",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Bone Meal",
        manufacturer: "Various manufacturers",
        n: "3–4%",
        p: "15–20% (as P₂O₅)",
        k: "0%",
        s: "Varies",
        otherNutrients: "Calcium (Ca) 20–25%",
        nutrientForm: "Organic phosphorus; calcium phosphate",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Pre-planting or basal",
        purpose: "Slow-release phosphorus supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "Before planting",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on P-deficient soils",
        soilPhConsiderations: "P availability increases in slightly acidic soils",
        relevantSoilConditions: "Best where slow-release P is desired",
        deficienciesAddressed: "Phosphorus deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies by processing method."
    },
    {
        id: "F031",
        name: "Rhizobium Inoculant",
        localName: "Not available from verified source",
        type: "Biofertilizer",
        tradeName: "Rhizobium Biofertilizer",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "None (contains living bacteria)",
        nutrientForm: "Live Rhizobium bacteria culture",
        suitableCrops: ["Faba bean", "Chickpea", "Lentil", "Soybean"],
        cropCategory: "Pulses, Oilseeds",
        growthStage: "Seed treatment",
        purpose: "Biological nitrogen fixation",
        applicationMethod: "Seed coating",
        applicationTiming: "Before planting",
        applicationStage: "Seed treatment",
        placementMethod: "Seed coating",
        applicationFrequency: "Once per planting",
        recommendedRate: "Not available from verified source",
        applicationUnit: "g/kg seed (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Bacteria perform best in neutral pH",
        relevantSoilConditions: "Avoid soils with high mineral N",
        deficienciesAddressed: "Nitrogen supply through fixation",
        ethiopianUse: "Documented for pulse crops",
        ethiopianDistribution: "Available through research institutions",
        ethiopianRecommendations: "Recommended for pulse crops; verify with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Packet",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "EIAR / FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Specificity to host legume is critical."
    },
    {
        id: "F032",
        name: "Mycorrhizal Inoculant",
        localName: "Not available from verified source",
        type: "Biofertilizer",
        tradeName: "Mycorrhizal Biofertilizer",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "None (contains fungal spores)",
        nutrientForm: "Arbuscular mycorrhizal fungi spores",
        suitableCrops: ["Maize", "Wheat", "Teff", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Seed treatment or soil application",
        purpose: "Enhanced nutrient and water uptake",
        applicationMethod: "Seed coating, Soil application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Seed coating or soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "g/kg seed or kg/ha",
        soilType: "Wide range",
        soilPhConsiderations: "Best in neutral pH",
        relevantSoilConditions: "Beneficial in low-P soils",
        deficienciesAddressed: "Enhanced P uptake",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Packet",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Effectiveness depends on soil conditions and host crop."
    },
    {
        id: "F033",
        name: "NPK 19-38-7",
        localName: "Not available from verified source",
        type: "Blended fertilizer",
        tradeName: "NPK 19-38-7",
        manufacturer: "Blended in Ethiopia",
        n: "19%",
        p: "38% (as P₂O₅)",
        k: "7% (as K₂O)",
        s: "Varies",
        otherNutrients: "Varies",
        nutrientForm: "Mixed N, P, and K sources",
        suitableCrops: ["Teff", "Wheat", "Maize"],
        cropCategory: "Cereals",
        growthStage: "Basal application",
        purpose: "Balanced nutrient supply for cereals",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Best where N, P, and K are all deficient",
        deficienciesAddressed: "N, P, and K deficiencies",
        ethiopianUse: "Documented in Ethiopian fertilizer programs",
        ethiopianDistribution: "Distributed through ATA",
        ethiopianRecommendations: "Recommended for cereals; verify with EIAR",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "Ethiopian Ministry of Agriculture / ATA",
        sourceReference: "Ethiopian fertilizer program documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Verify exact formulation with Ethiopian authorities."
    },
    {
        id: "F034",
        name: "Potassium Nitrate",
        localName: "Not available from verified source",
        type: "Potassium fertilizer",
        tradeName: "Potassium Nitrate (Saltpeter)",
        manufacturer: "Various international manufacturers",
        n: "13%",
        p: "0%",
        k: "44–46% (as K₂O)",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Potassium nitrate (KNO₃)",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Top dressing, fruiting",
        purpose: "Potassium and nitrogen supply; preferred for chloride-sensitive crops",
        applicationMethod: "Foliar application, Fertigation, Side dressing",
        applicationTiming: "During fruiting and vegetative growth",
        applicationStage: "Vegetative and reproductive",
        placementMethod: "Foliar spray or soil application",
        applicationFrequency: "Split application",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on K-deficient soils",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Preferred on chloride-sensitive crops",
        deficienciesAddressed: "Potassium and nitrogen deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "25 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product with 13% N and 44–46% K₂O."
    },
    {
        id: "F035",
        name: "Mono-Potassium Phosphate",
        localName: "Not available from verified source",
        type: "Compound fertilizer",
        tradeName: "MKP",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "52% (as P₂O₅)",
        k: "34% (as K₂O)",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Monopotassium phosphate (KH₂PO₄)",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Fruiting and flowering",
        purpose: "Phosphorus and potassium supply; foliar application",
        applicationMethod: "Foliar application, Fertigation",
        applicationTiming: "During flowering and fruiting",
        applicationStage: "Reproductive",
        placementMethod: "Foliar spray or fertigation",
        applicationFrequency: "Split application",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha or g/L (foliar)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Best where P and K are deficient",
        deficienciesAddressed: "Phosphorus and potassium deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "25 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Globally standard product with 52% P₂O₅ and 34% K₂O."
    },
    {
        id: "F036",
        name: "Ammonium Polyphosphate",
        localName: "Not available from verified source",
        type: "Compound fertilizer (liquid)",
        tradeName: "APP (10-34-0)",
        manufacturer: "Various international manufacturers",
        n: "10%",
        p: "34% (as P₂O₅)",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Ammonium polyphosphate solution",
        suitableCrops: ["Maize", "Wheat", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Basal application",
        purpose: "Phosphorus and nitrogen supply",
        applicationMethod: "Band application, Fertigation",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil injection or band",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "L/ha (when documented)",
        soilType: "Best on P-deficient soils",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Best where P is limiting",
        deficienciesAddressed: "Phosphorus deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Liter",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Common liquid formulation is 10-34-0."
    },
    {
        id: "F037",
        name: "Sodium Molybdate",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Sodium Molybdate",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Molybdenum (Mo) 39–46%",
        nutrientForm: "Sodium molybdate (Na₂MoO₄·2H₂O)",
        suitableCrops: ["Pulses", "Faba bean", "Chickpea"],
        cropCategory: "Pulses",
        growthStage: "Seed treatment or foliar",
        purpose: "Molybdenum deficiency correction; essential for nitrogen fixation",
        applicationMethod: "Seed treatment, Foliar application",
        applicationTiming: "Before planting or during growth",
        applicationStage: "Seed treatment or vegetative",
        placementMethod: "Seed coating or foliar spray",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "g/kg seed or g/ha",
        soilType: "Best on Mo-deficient soils",
        soilPhConsiderations: "Mo availability decreases in acidic soils",
        relevantSoilConditions: "Deficiency common in acidic soils",
        deficienciesAddressed: "Molybdenum deficiency (poor nitrogen fixation in legumes)",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Mo content varies by formulation."
    },
    {
        id: "F038",
        name: "Chelated Iron",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Fe-EDTA",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Iron (Fe) 6–13% (chelated)",
        nutrientForm: "Iron EDTA chelate",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Foliar application",
        purpose: "Iron deficiency correction",
        applicationMethod: "Foliar application, Fertigation",
        applicationTiming: "When deficiency symptoms appear",
        applicationStage: "Vegetative",
        placementMethod: "Foliar spray or fertigation",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "g/L (foliar)",
        soilType: "Best on Fe-deficient soils",
        soilPhConsiderations: "Chelated form remains available in alkaline soils",
        relevantSoilConditions: "Preferred for alkaline and calcareous soils",
        deficienciesAddressed: "Iron deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Chelated forms remain available at higher pH than sulfate forms."
    },
    {
        id: "F039",
        name: "Chelated Zinc",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Zn-EDTA",
        manufacturer: "Various international manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Zinc (Zn) 9–15% (chelated)",
        nutrientForm: "Zinc EDTA chelate",
        suitableCrops: ["Maize", "Wheat", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Foliar or soil application",
        purpose: "Zinc deficiency correction",
        applicationMethod: "Foliar application, Fertigation, Soil application",
        applicationTiming: "When deficiency symptoms appear or at planting",
        applicationStage: "Early growth",
        placementMethod: "Foliar spray or soil incorporation",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "g/L (foliar) or kg/ha (soil)",
        soilType: "Best on Zn-deficient soils",
        soilPhConsiderations: "Chelated form remains available in alkaline soils",
        relevantSoilConditions: "Preferred for alkaline and calcareous soils",
        deficienciesAddressed: "Zinc deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Chelated forms remain available at higher pH than sulfate forms."
    },
    {
        id: "F040",
        name: "Humic Acid",
        localName: "Not available from verified source",
        type: "Organic soil amendment",
        tradeName: "Humic Acid",
        manufacturer: "Various manufacturers",
        n: "Varies",
        p: "Varies",
        k: "Varies",
        s: "Varies",
        otherNutrients: "Humic and fulvic acids",
        nutrientForm: "Humic substances",
        suitableCrops: ["All crops"],
        cropCategory: "Cereals, Vegetables, Fruits, Coffee",
        growthStage: "Pre-planting or during growth",
        purpose: "Soil organic matter improvement; nutrient chelation; microbial stimulation",
        applicationMethod: "Soil application, Foliar application",
        applicationTiming: "Before planting or during growth",
        applicationStage: "Variable",
        placementMethod: "Soil incorporation or foliar spray",
        applicationFrequency: "As needed",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha or L/ha",
        soilType: "All soil types; especially degraded soils",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for low organic matter soils",
        deficienciesAddressed: "General soil fertility improvement",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg or Liter",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Composition varies widely by source."
    },
    {
        id: "F041",
        name: "Neem Cake",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Neem Cake",
        manufacturer: "Various manufacturers",
        n: "5–6%",
        p: "1–2% (as P₂O₅)",
        k: "1–2% (as K₂O)",
        s: "Varies",
        otherNutrients: "Contains micronutrients and neem compounds",
        nutrientForm: "Organic forms of N, P, and K",
        suitableCrops: ["Vegetables", "Fruits", "Coffee"],
        cropCategory: "Vegetables, Fruits, Coffee",
        growthStage: "Pre-planting or basal",
        purpose: "Slow-release nutrient supply; pest deterrent",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "Before planting",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for organic systems",
        deficienciesAddressed: "General soil fertility improvement",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies by processing method."
    },
    {
        id: "F042",
        name: "Urea Supergranule",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer",
        tradeName: "USG",
        manufacturer: "Various manufacturers",
        n: "46%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "None documented",
        nutrientForm: "Amide nitrogen (large granules)",
        suitableCrops: ["Rice", "Maize"],
        cropCategory: "Cereals",
        growthStage: "Top dressing",
        purpose: "Slow-release nitrogen supply",
        applicationMethod: "Deep placement",
        applicationTiming: "After crop establishment",
        applicationStage: "Vegetative",
        placementMethod: "Deep placement into soil",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best in flooded or moist soils",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Best for flooded rice systems",
        deficienciesAddressed: "Nitrogen deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Larger granule size provides slower nitrogen release."
    },
    {
        id: "F043",
        name: "Sulfur-Coated Urea",
        localName: "Not available from verified source",
        type: "Nitrogen fertilizer (controlled release)",
        tradeName: "Sulfur-Coated Urea",
        manufacturer: "Various international manufacturers",
        n: "30–40% (varies by coating)",
        p: "0%",
        k: "0%",
        s: "10–20% (from coating)",
        otherNutrients: "None documented",
        nutrientForm: "Urea core with sulfur coating",
        suitableCrops: ["Maize", "Wheat", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Basal or top dressing",
        purpose: "Slow-release nitrogen and sulfur supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting or during growth",
        applicationStage: "Variable",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Beneficial where split applications are difficult",
        deficienciesAddressed: "Nitrogen and sulfur deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N and S content varies by coating thickness."
    },
    {
        id: "F044",
        name: "NPK 17-17-17",
        localName: "Not available from verified source",
        type: "Compound fertilizer",
        tradeName: "NPK 17-17-17",
        manufacturer: "Various international manufacturers",
        n: "17%",
        p: "17% (as P₂O₅)",
        k: "17% (as K₂O)",
        s: "Varies",
        otherNutrients: "Varies",
        nutrientForm: "Mixed N, P, and K sources",
        suitableCrops: ["Vegetables", "Fruits", "Maize"],
        cropCategory: "Vegetables, Fruits, Cereals",
        growthStage: "Basal application",
        purpose: "Balanced N, P, K supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Best where all macronutrients are deficient",
        deficienciesAddressed: "N, P, and K deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N-P-K ratio is 1:1:1."
    },
    {
        id: "F045",
        name: "Kieserite",
        localName: "Not available from verified source",
        type: "Secondary nutrient fertilizer",
        tradeName: "Kieserite",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "22–23%",
        otherNutrients: "Magnesium (Mg) 16–17%",
        nutrientForm: "Magnesium sulfate monohydrate (MgSO₄·H₂O)",
        suitableCrops: ["Coffee", "Vegetables", "Maize"],
        cropCategory: "Coffee, Vegetables, Cereals",
        growthStage: "Basal or side dressing",
        purpose: "Magnesium and sulfur supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting or during growth",
        applicationStage: "Variable",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on Mg and S deficient soils",
        soilPhConsiderations: "Suitable for wide pH range",
        relevantSoilConditions: "Beneficial on sandy and acidic soils",
        deficienciesAddressed: "Magnesium and sulfur deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Monohydrate form has higher nutrient concentration than heptahydrate."
    },
    {
        id: "F046",
        name: "Calcium Borate",
        localName: "Not available from verified source",
        type: "Micronutrient fertilizer",
        tradeName: "Calcium Borate",
        manufacturer: "Various manufacturers",
        n: "0%",
        p: "0%",
        k: "0%",
        s: "0%",
        otherNutrients: "Boron (B) 10–15%; Calcium (Ca) present",
        nutrientForm: "Calcium borate minerals",
        suitableCrops: ["Faba bean", "Chickpea", "Vegetables"],
        cropCategory: "Pulses, Vegetables",
        growthStage: "Basal application",
        purpose: "Boron deficiency correction",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on B-deficient soils",
        soilPhConsiderations: "B availability decreases in alkaline soils",
        relevantSoilConditions: "Deficiency common in sandy and calcareous soils",
        deficienciesAddressed: "Boron deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "B content varies by mineral source."
    },
    {
        id: "F047",
        name: "Fish Emulsion",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Fish Emulsion",
        manufacturer: "Various manufacturers",
        n: "4–5%",
        p: "1–2% (as P₂O₅)",
        k: "1–2% (as K₂O)",
        s: "Varies",
        otherNutrients: "Contains micronutrients",
        nutrientForm: "Organic forms of N, P, and K (liquid)",
        suitableCrops: ["Vegetables", "Fruits"],
        cropCategory: "Vegetables, Fruits",
        growthStage: "Vegetative",
        purpose: "Nitrogen supply; organic matter",
        applicationMethod: "Foliar application, Soil drench",
        applicationTiming: "During vegetative growth",
        applicationStage: "Vegetative",
        placementMethod: "Foliar spray or soil drench",
        applicationFrequency: "Every 2–4 weeks",
        recommendedRate: "Not available from verified source",
        applicationUnit: "L/ha or mL/L (diluted)",
        soilType: "Wide range",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for organic systems",
        deficienciesAddressed: "Nitrogen deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Liter",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies by manufacturer."
    },
    {
        id: "F048",
        name: "Blood Meal",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Blood Meal",
        manufacturer: "Various manufacturers",
        n: "12–13%",
        p: "1–2% (as P₂O₅)",
        k: "0–1% (as K₂O)",
        s: "Varies",
        otherNutrients: "Iron (Fe) present",
        nutrientForm: "Organic nitrogen (protein-based)",
        suitableCrops: ["Vegetables", "Maize"],
        cropCategory: "Vegetables, Cereals",
        growthStage: "Pre-planting or side dressing",
        purpose: "Slow-release nitrogen supply",
        applicationMethod: "Broadcasting, Side dressing",
        applicationTiming: "Before planting or during growth",
        applicationStage: "Variable",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Wide range",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for organic systems",
        deficienciesAddressed: "Nitrogen deficiency",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "High nitrogen organic fertilizer."
    },
    {
        id: "F049",
        name: "Poultry Litter",
        localName: "Not available from verified source",
        type: "Organic fertilizer",
        tradeName: "Chicken Manure",
        manufacturer: "Farm-produced",
        n: "2–4% (varies)",
        p: "1–3% (as P₂O₅; varies)",
        k: "1–3% (as K₂O; varies)",
        s: "Varies",
        otherNutrients: "Contains micronutrients",
        nutrientForm: "Organic forms of N, P, and K",
        suitableCrops: ["Vegetables", "Maize", "Coffee"],
        cropCategory: "Vegetables, Cereals, Coffee",
        growthStage: "Pre-planting soil amendment",
        purpose: "Soil organic matter improvement; nutrient supply",
        applicationMethod: "Broadcasting",
        applicationTiming: "Before planting",
        applicationStage: "Pre-planting",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Annually",
        recommendedRate: "Not available from verified source",
        applicationUnit: "t/ha (when documented)",
        soilType: "All soil types",
        soilPhConsiderations: "Generally neutral effect",
        relevantSoilConditions: "Beneficial for low organic matter soils",
        deficienciesAddressed: "General soil fertility improvement",
        ethiopianUse: "Used where poultry production exists",
        ethiopianDistribution: "Farm-produced",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "Not standardized",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "Nutrient content varies by bedding material and storage."
    },
    {
        id: "F050",
        name: "NPK 14-21-14",
        localName: "Not available from verified source",
        type: "Compound fertilizer",
        tradeName: "NPK 14-21-14",
        manufacturer: "Various international manufacturers",
        n: "14%",
        p: "21% (as P₂O₅)",
        k: "14% (as K₂O)",
        s: "Varies",
        otherNutrients: "Varies",
        nutrientForm: "Mixed N, P, and K sources",
        suitableCrops: ["Maize", "Wheat", "Vegetables"],
        cropCategory: "Cereals, Vegetables",
        growthStage: "Basal application",
        purpose: "Phosphorus-leaning balanced nutrient supply",
        applicationMethod: "Broadcasting, Band application",
        applicationTiming: "At planting",
        applicationStage: "Early growth",
        placementMethod: "Soil incorporation",
        applicationFrequency: "Once per season",
        recommendedRate: "Not available from verified source",
        applicationUnit: "kg/ha (when documented)",
        soilType: "Best on P-deficient soils",
        soilPhConsiderations: "Suitable for slightly acidic to neutral soils",
        relevantSoilConditions: "Best where P is the limiting nutrient",
        deficienciesAddressed: "Phosphorus, nitrogen, and potassium deficiencies",
        ethiopianUse: "Not widely documented",
        ethiopianDistribution: "Not available from verified source",
        ethiopianRecommendations: "Not available from verified source",
        currentPrice: "Not available from verified source",
        currency: "ETB",
        priceUnit: "50 kg bag",
        marketLocation: "Not available from verified source",
        priceDate: "Not available from verified source",
        imageUrl: null,
        imageSource: "Not available from verified source",
        sourceOrganization: "FAO / IFDC",
        sourceReference: "General agronomic documentation",
        sourceUrl: "Not available from verified source",
        publicationDate: "Not available from verified source",
        lastUpdated: "Not available from verified source",
        dateCollected: "Not available from verified source",
        notes: "N-P-K ratio emphasizes phosphorus."
    }
];

// ============================================================
// 2. APPLICATION STATE
// ============================================================

const state = {
    fertilizers: [...fertilizerData],
    filtered: [...fertilizerData],
    selectedId: null,
    searchTerm: '',
    activeFilters: {
        types: [],
        nutrients: [],
        crops: []
    },
    compareIds: [],
    detailOpen: false,
    compareOpen: false
};

// ============================================================
// 3. DOM REFERENCES
// ============================================================

const dom = {
    grid: document.getElementById('fertilizerGrid'),
    search: document.getElementById('searchInput'),
    resultsCount: document.getElementById('resultsCount'),
    filterToggle: document.getElementById('filterToggleBtn'),
    filterPanel: document.getElementById('filterPanel'),
    filterCount: document.getElementById('filterCount'),
    clearFilters: document.getElementById('clearFiltersBtn'),
    applyFilters: document.getElementById('applyFiltersBtn'),
    typeFilterOptions: document.getElementById('typeFilterOptions'),
    nutrientFilterOptions: document.getElementById('nutrientFilterOptions'),
    cropFilterOptions: document.getElementById('cropFilterOptions'),
    detailView: document.getElementById('detailView'),
    detailPanel: document.getElementById('detailPanel'),
    detailContent: document.getElementById('detailContent'),
    detailClose: document.getElementById('detailCloseBtn'),
    detailOverlay: document.getElementById('detailOverlay'),
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    emptyState: document.getElementById('emptyState'),
    retryBtn: document.getElementById('retryBtn'),
    compareToggle: document.getElementById('compareToggleBtn'),
    comparePanel: document.getElementById('comparePanel'),
    compareContainer: document.getElementById('compareContainer'),
    compareOverlay: document.getElementById('compareOverlay'),
    compareClose: document.getElementById('compareCloseBtn'),
    compareSelectA: document.getElementById('compareSelectA'),
    compareSelectB: document.getElementById('compareSelectB'),
    compareBody: document.getElementById('compareBody'),
    compareNameA: document.getElementById('compareNameA'),
    compareNameB: document.getElementById('compareNameB'),
    compareEmpty: document.getElementById('compareEmpty'),
    compareTableWrapper: document.getElementById('compareTableWrapper'),
    compareCount: document.getElementById('compareCount')
};

// ============================================================
// 4. UTILITY FUNCTIONS
// ============================================================

function getNutrientDisplay(fertilizer) {
    const parts = [];
    if (fertilizer.n && fertilizer.n !== '0%' && fertilizer.n !== 'Varies') parts.push(`N: ${fertilizer.n}`);
    if (fertilizer.p && fertilizer.p !== '0%' && fertilizer.p !== 'Varies') parts.push(`P₂O₅: ${fertilizer.p}`);
    if (fertilizer.k && fertilizer.k !== '0%' && fertilizer.k !== 'Varies') parts.push(`K₂O: ${fertilizer.k}`);
    if (fertilizer.s && fertilizer.s !== '0%' && fertilizer.s !== 'Varies') parts.push(`S: ${fertilizer.s}`);
    if (fertilizer.otherNutrients && fertilizer.otherNutrients !== 'None documented' && fertilizer.otherNutrients !== 'Varies') {
        parts.push(fertilizer.otherNutrients);
    }
    return parts.length > 0 ? parts.join(' · ') : 'Nutrient information unavailable';
}

function getCropsDisplay(fertilizer) {
    if (!fertilizer.suitableCrops || fertilizer.suitableCrops.length === 0) return 'No crop data available';
    if (fertilizer.suitableCrops[0] === 'All crops') return 'All crops';
    return fertilizer.suitableCrops.slice(0, 3).join(', ') + (fertilizer.suitableCrops.length > 3 ? '...' : '');
}

function getTypeCategory(type) {
    const lower = type.toLowerCase();
    if (lower.includes('nitrogen') && !lower.includes('compound')) return 'Nitrogen fertilizer';
    if (lower.includes('phosphorus') && !lower.includes('compound')) return 'Phosphorus fertilizer';
    if (lower.includes('potassium') && !lower.includes('compound')) return 'Potassium fertilizer';
    if (lower.includes('compound') || lower.includes('blended')) return 'Compound/Blended';
    if (lower.includes('organic') || lower.includes('compost') || lower.includes('manure') || 
        lower.includes('meal') || lower.includes('emulsion') || lower.includes('cake')) return 'Organic';
    if (lower.includes('bio') || lower.includes('inoculant') || lower.includes('mycorrhizal')) return 'Biofertilizer';
    if (lower.includes('micronutrient') || lower.includes('chelated')) return 'Micronutrient';
    if (lower.includes('soil amendment') || lower.includes('liming')) return 'Other';
    return 'Other';
}

function extractNutrients(fertilizer) {
    const nutrients = [];
    const nVal = parseFloat(fertilizer.n);
    const pVal = parseFloat(fertilizer.p);
    const kVal = parseFloat(fertilizer.k);
    const sVal = parseFloat(fertilizer.s);
    
    if (nVal > 0 || fertilizer.n.includes('%')) nutrients.push('Nitrogen');
    if (pVal > 0 || fertilizer.p.includes('%')) nutrients.push('Phosphorus');
    if (kVal > 0 || fertilizer.k.includes('%')) nutrients.push('Potassium');
    if (sVal > 0 || fertilizer.s.includes('%')) nutrients.push('Sulfur');
    if (fertilizer.otherNutrients && fertilizer.otherNutrients !== 'None documented' && fertilizer.otherNutrients !== 'Varies') {
        const lower = fertilizer.otherNutrients.toLowerCase();
        if (lower.includes('zinc') || lower.includes('zn')) nutrients.push('Micronutrients');
        else if (lower.includes('boron') || lower.includes('b')) nutrients.push('Micronutrients');
        else if (lower.includes('iron') || lower.includes('fe')) nutrients.push('Micronutrients');
        else if (lower.includes('manganese') || lower.includes('mn')) nutrients.push('Micronutrients');
        else if (lower.includes('copper') || lower.includes('cu')) nutrients.push('Micronutrients');
        else if (lower.includes('molybdenum') || lower.includes('mo')) nutrients.push('Micronutrients');
        else if (lower.includes('calcium') || lower.includes('ca')) nutrients.push('Secondary nutrients');
        else if (lower.includes('magnesium') || lower.includes('mg')) nutrients.push('Secondary nutrients');
        else nutrients.push('Other nutrients');
    }
    return nutrients;
}

// ============================================================
// 5. RENDER FUNCTIONS
// ============================================================

function renderCard(fertilizer) {
    const typeDisplay = getTypeCategory(fertilizer.type);
    const nutrientsDisplay = getNutrientDisplay(fertilizer);
    const cropsDisplay = getCropsDisplay(fertilizer);
    
    return `
        <div class="fertilizer-card" data-id="${fertilizer.id}">
            <div class="card-image">
                ${fertilizer.imageUrl ? 
                    `<img src="${fertilizer.imageUrl}" alt="${fertilizer.name}" loading="lazy">` :
                    `<span class="placeholder-text">Agricultural photograph<br>${fertilizer.name}</span>`
                }
            </div>
            <div class="card-body">
                <h3 class="card-name">${fertilizer.name}</h3>
                <div class="card-type">${typeDisplay}</div>
                <div class="card-nutrients">${nutrientsDisplay}</div>
                <div class="card-crops"><span class="card-crops-label">Crops:</span> ${cropsDisplay}</div>
                <button class="card-btn" data-id="${fertilizer.id}">View Details</button>
            </div>
        </div>
    `;
}

function renderGrid(fertilizers) {
    if (fertilizers.length === 0) {
        dom.grid.innerHTML = '';
        dom.emptyState.style.display = 'block';
        dom.loadingState.style.display = 'none';
        dom.errorState.style.display = 'none';
        dom.resultsCount.textContent = '0';
        return;
    }
    
    dom.emptyState.style.display = 'none';
    dom.loadingState.style.display = 'none';
    dom.errorState.style.display = 'none';
    dom.grid.innerHTML = fertilizers.map(f => renderCard(f)).join('');
    dom.resultsCount.textContent = fertilizers.length;
    
    // Attach click events to "View Details" buttons
    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            openDetail(id);
        });
    });
    
    // Click on card also opens detail
    document.querySelectorAll('.fertilizer-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            openDetail(id);
        });
    });
}

function renderFilterOptions() {
    // Extract unique types
    const types = new Set();
    const nutrients = new Set();
    const crops = new Set();
    
    state.fertilizers.forEach(f => {
        const type = getTypeCategory(f.type);
        types.add(type);
        
        extractNutrients(f).forEach(n => nutrients.add(n));
        
        if (f.suitableCrops && f.suitableCrops.length > 0 && f.suitableCrops[0] !== 'All crops') {
            f.suitableCrops.forEach(c => crops.add(c));
        }
    });
    
    // Sort for consistent display
    const sortedTypes = Array.from(types).sort();
    const sortedNutrients = Array.from(nutrients).sort();
    const sortedCrops = Array.from(crops).sort();
    
    // Render type filters
    dom.typeFilterOptions.innerHTML = sortedTypes.map(type => `
        <label class="filter-option ${state.activeFilters.types.includes(type) ? 'checked' : ''}">
            <input type="checkbox" value="${type}" ${state.activeFilters.types.includes(type) ? 'checked' : ''}>
            ${type}
        </label>
    `).join('');
    
    // Render nutrient filters
    dom.nutrientFilterOptions.innerHTML = sortedNutrients.map(nutrient => `
        <label class="filter-option ${state.activeFilters.nutrients.includes(nutrient) ? 'checked' : ''}">
            <input type="checkbox" value="${nutrient}" ${state.activeFilters.nutrients.includes(nutrient) ? 'checked' : ''}>
            ${nutrient}
        </label>
    `).join('');
    
    // Render crop filters
    dom.cropFilterOptions.innerHTML = sortedCrops.map(crop => `
        <label class="filter-option ${state.activeFilters.crops.includes(crop) ? 'checked' : ''}">
            <input type="checkbox" value="${crop}" ${state.activeFilters.crops.includes(crop) ? 'checked' : ''}>
            ${crop}
        </label>
    `).join('');
    
    // Update filter count
    const totalFilters = state.activeFilters.types.length + state.activeFilters.nutrients.length + state.activeFilters.crops.length;
    dom.filterCount.textContent = totalFilters;
    dom.filterCount.style.display = totalFilters > 0 ? 'inline' : 'none';
}

function renderDetail(fertilizer) {
    const typeDisplay = getTypeCategory(fertilizer.type);
    const cropsHtml = fertilizer.suitableCrops && fertilizer.suitableCrops.length > 0 && fertilizer.suitableCrops[0] !== 'All crops' ?
        fertilizer.suitableCrops.map(crop => `<span class="crop-tag">${crop}</span>`).join('') :
        (fertilizer.suitableCrops && fertilizer.suitableCrops[0] === 'All crops' ? '<span class="crop-tag">All crops</span>' : 'Information unavailable from verified sources');
    
    const nutrientHtml = `
        ${fertilizer.n && fertilizer.n !== '0%' && fertilizer.n !== 'Varies' ? `<div><span class="nutrient-value">N: ${fertilizer.n}</span></div>` : ''}
        ${fertilizer.p && fertilizer.p !== '0%' && fertilizer.p !== 'Varies' ? `<div><span class="nutrient-value">P₂O₅: ${fertilizer.p}</span></div>` : ''}
        ${fertilizer.k && fertilizer.k !== '0%' && fertilizer.k !== 'Varies' ? `<div><span class="nutrient-value">K₂O: ${fertilizer.k}</span></div>` : ''}
        ${fertilizer.s && fertilizer.s !== '0%' && fertilizer.s !== 'Varies' ? `<div><span class="nutrient-value">S: ${fertilizer.s}</span></div>` : ''}
        ${fertilizer.otherNutrients && fertilizer.otherNutrients !== 'None documented' && fertilizer.otherNutrients !== 'Varies' ? 
            `<div><span class="nutrient-value">${fertilizer.otherNutrients}</span></div>` : ''}
    `;
    
    const priceDisplay = fertilizer.currentPrice && fertilizer.currentPrice !== 'Not available from verified source' ?
        `<div><strong>${fertilizer.currentPrice}</strong> ${fertilizer.currency} / ${fertilizer.priceUnit}</div>
         ${fertilizer.marketLocation && fertilizer.marketLocation !== 'Not available from verified source' ? `<div>Market: ${fertilizer.marketLocation}</div>` : ''}
         ${fertilizer.priceDate && fertilizer.priceDate !== 'Not available from verified source' ? `<div>Last Updated: ${fertilizer.priceDate}</div>` : ''}` :
        'Current price information unavailable for this location.';
    
    dom.detailContent.innerHTML = `
        <div class="detail-image">
            ${fertilizer.imageUrl ? 
                `<img src="${fertilizer.imageUrl}" alt="${fertilizer.name}">` :
                `<span class="placeholder-text">Agricultural photograph<br>${fertilizer.name}</span>`
            }
        </div>
        
        <h2 class="detail-title">${fertilizer.name}</h2>
        <div class="detail-subtitle">${typeDisplay} ${fertilizer.localName && fertilizer.localName !== 'Not available from verified source' ? `· ${fertilizer.localName}` : ''}</div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">Nutrient Composition</h4>
            <div class="detail-section-content">
                ${nutrientHtml || 'Composition information unavailable from verified sources.'}
                ${fertilizer.nutrientForm && fertilizer.nutrientForm !== 'Not available from verified source' ? `<div style="margin-top:6px;font-size:14px;color:#5A6A5E;">Form: ${fertilizer.nutrientForm}</div>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">What Is It Used For?</h4>
            <div class="detail-section-content">
                <p><strong>Purpose:</strong> ${fertilizer.purpose}</p>
                ${fertilizer.deficienciesAddressed && fertilizer.deficienciesAddressed !== 'Not available from verified source' ? 
                    `<p><strong>Deficiencies addressed:</strong> ${fertilizer.deficienciesAddressed}</p>` : ''}
                ${fertilizer.notes && fertilizer.notes !== 'Not available from verified source' ? 
                    `<p style="margin-top:6px;font-size:14px;color:#5A6A5E;">${fertilizer.notes}</p>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">Suitable Crops</h4>
            <div class="detail-section-content">
                ${cropsHtml}
                ${fertilizer.cropCategory && fertilizer.cropCategory !== 'Not available from verified source' ? 
                    `<div style="margin-top:6px;font-size:14px;color:#5A6A5E;">Category: ${fertilizer.cropCategory}</div>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">Application Information</h4>
            <div class="detail-section-content">
                <p><strong>Method:</strong> ${fertilizer.applicationMethod}</p>
                <p><strong>Timing:</strong> ${fertilizer.applicationTiming}</p>
                <p><strong>Stage:</strong> ${fertilizer.applicationStage}</p>
                <p><strong>Frequency:</strong> ${fertilizer.applicationFrequency}</p>
                ${fertilizer.recommendedRate && fertilizer.recommendedRate !== 'Not available from verified source' ? 
                    `<p><strong>Recommended Rate:</strong> ${fertilizer.recommendedRate}</p>` : 
                    `<p><strong>Recommended Rate:</strong> Information unavailable from verified sources</p>`}
                ${fertilizer.placementMethod && fertilizer.placementMethod !== 'Not available from verified source' ? 
                    `<p><strong>Placement:</strong> ${fertilizer.placementMethod}</p>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">Soil Considerations</h4>
            <div class="detail-section-content">
                <p><strong>Soil Type:</strong> ${fertilizer.soilType}</p>
                ${fertilizer.soilPhConsiderations && fertilizer.soilPhConsiderations !== 'Not available from verified source' ? 
                    `<p><strong>pH Considerations:</strong> ${fertilizer.soilPhConsiderations}</p>` : ''}
                ${fertilizer.relevantSoilConditions && fertilizer.relevantSoilConditions !== 'Not available from verified source' ? 
                    `<p><strong>Relevant Conditions:</strong> ${fertilizer.relevantSoilConditions}</p>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">Price Information</h4>
            <div class="detail-section-content">
                ${priceDisplay}
                ${fertilizer.priceDate && fertilizer.priceDate !== 'Not available from verified source' ? 
                    `<div style="margin-top:4px;font-size:13px;color:#7A8A7E;">Data collected: ${fertilizer.dateCollected || 'Date not specified'}</div>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4 class="detail-section-title">Ethiopian Context</h4>
            <div class="detail-section-content">
                ${fertilizer.ethiopianUse && fertilizer.ethiopianUse !== 'Not available from verified source' ? 
                    `<p><strong>Use:</strong> ${fertilizer.ethiopianUse}</p>` : ''}
                ${fertilizer.ethiopianDistribution && fertilizer.ethiopianDistribution !== 'Not available from verified source' ? 
                    `<p><strong>Distribution:</strong> ${fertilizer.ethiopianDistribution}</p>` : ''}
                ${fertilizer.ethiopianRecommendations && fertilizer.ethiopianRecommendations !== 'Not available from verified source' ? 
                    `<p><strong>Recommendations:</strong> ${fertilizer.ethiopianRecommendations}</p>` : ''}
                ${!fertilizer.ethiopianUse || fertilizer.ethiopianUse === 'Not available from verified source' ? 
                    '<p>Ethiopian-specific information unavailable from verified sources.</p>' : ''}
            </div>
        </div>
        
        <div class="detail-source">
            <strong>Source:</strong> ${fertilizer.sourceOrganization}<br>
            <strong>Reference:</strong> ${fertilizer.sourceReference}<br>
            ${fertilizer.sourceUrl && fertilizer.sourceUrl !== 'Not available from verified source' ? 
                `<strong>URL:</strong> <a href="${fertilizer.sourceUrl}" target="_blank" style="color:#2E7D32;">${fertilizer.sourceUrl}</a><br>` : ''}
            ${fertilizer.publicationDate && fertilizer.publicationDate !== 'Not available from verified source' ? 
                `<strong>Publication:</strong> ${fertilizer.publicationDate}` : ''}
            ${fertilizer.lastUpdated && fertilizer.lastUpdated !== 'Not available from verified source' ? 
                `<strong>Last Updated:</strong> ${fertilizer.lastUpdated}` : ''}
        </div>
    `;
    
    // Make crop tags clickable (for future connection to Crop Information)
    document.querySelectorAll('.crop-tag').forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.title = 'Connect to Crop Information (coming soon)';
    });
}

function renderCompareSelects() {
    const options = state.fertilizers.map(f => 
        `<option value="${f.id}">${f.name} (${getTypeCategory(f.type)})</option>`
    ).join('');
    
    dom.compareSelectA.innerHTML = `<option value="">Select a fertilizer...</option>${options}`;
    dom.compareSelectB.innerHTML = `<option value="">Select a fertilizer...</option>${options}`;
    
    // Pre-select if any
    if (state.compareIds.length >= 1) {
        dom.compareSelectA.value = state.compareIds[0] || '';
    }
    if (state.compareIds.length >= 2) {
        dom.compareSelectB.value = state.compareIds[1] || '';
    }
}

function renderCompareTable() {
    const idA = dom.compareSelectA.value;
    const idB = dom.compareSelectB.value;
    
    if (!idA || !idB) {
        dom.compareEmpty.style.display = 'block';
        dom.compareTableWrapper.style.display = 'none';
        dom.compareNameA.textContent = idA ? 'Fertilizer A' : 'Fertilizer A';
        dom.compareNameB.textContent = idB ? 'Fertilizer B' : 'Fertilizer B';
        return;
    }
    
    const fA = state.fertilizers.find(f => f.id === idA);
    const fB = state.fertilizers.find(f => f.id === idB);
    
    if (!fA || !fB) {
        dom.compareEmpty.style.display = 'block';
        dom.compareTableWrapper.style.display = 'none';
        return;
    }
    
    dom.compareEmpty.style.display = 'none';
    dom.compareTableWrapper.style.display = 'block';
    dom.compareNameA.textContent = fA.name;
    dom.compareNameB.textContent = fB.name;
    
    const rows = [
        { label: 'Type', a: getTypeCategory(fA.type), b: getTypeCategory(fB.type) },
        { label: 'Nutrient Form', a: fA.nutrientForm || 'N/A', b: fB.nutrientForm || 'N/A' },
        { label: 'Nitrogen (N)', a: fA.n, b: fB.n },
        { label: 'Phosphorus (P₂O₅)', a: fA.p, b: fB.p },
        { label: 'Potassium (K₂O)', a: fA.k, b: fB.k },
        { label: 'Sulfur (S)', a: fA.s, b: fB.s },
        { label: 'Other Nutrients', a: fA.otherNutrients || 'N/A', b: fB.otherNutrients || 'N/A' },
        { label: 'Suitable Crops', a: fA.suitableCrops && fA.suitableCrops.length > 0 ? fA.suitableCrops.join(', ') : 'N/A', b: fB.suitableCrops && fB.suitableCrops.length > 0 ? fB.suitableCrops.join(', ') : 'N/A' },
        { label: 'Application Method', a: fA.applicationMethod, b: fB.applicationMethod },
        { label: 'Application Timing', a: fA.applicationTiming, b: fB.applicationTiming },
        { label: 'Application Frequency', a: fA.applicationFrequency, b: fB.applicationFrequency },
        { label: 'Recommended Rate', a: fA.recommendedRate || 'Not available', b: fB.recommendedRate || 'Not available' },
        { label: 'Soil Type', a: fA.soilType, b: fB.soilType },
        { label: 'Price', a: fA.currentPrice || 'Not available', b: fB.currentPrice || 'Not available' },
        { label: 'Ethiopian Use', a: fA.ethiopianUse || 'Not available', b: fB.ethiopianUse || 'Not available' }
    ];
    
    dom.compareBody.innerHTML = rows.map(row => {
        const isDiff = row.a !== row.b;
        return `
            <tr>
                <td>${row.label}</td>
                <td class="${isDiff ? 'highlight-diff' : ''}">${row.a}</td>
                <td class="${isDiff ? 'highlight-diff' : ''}">${row.b}</td>
            </tr>
        `;
    }).join('');
}

// ============================================================
// 6. FILTER & SEARCH FUNCTIONS
// ============================================================

function applyFilters() {
    const searchTerm = dom.search.value.toLowerCase().trim();
    const activeTypes = state.activeFilters.types;
    const activeNutrients = state.activeFilters.nutrients;
    const activeCrops = state.activeFilters.crops;
    
    let results = state.fertilizers.filter(f => {
        // Search filter
        if (searchTerm) {
            const searchFields = [
                f.name.toLowerCase(),
                f.type.toLowerCase(),
                f.tradeName.toLowerCase(),
                ...(f.suitableCrops || []).map(c => c.toLowerCase()),
                f.id.toLowerCase()
            ];
            const nutrientFields = extractNutrients(f).map(n => n.toLowerCase());
            const allSearchText = [...searchFields, ...nutrientFields].join(' ');
            if (!allSearchText.includes(searchTerm)) return false;
        }
        
        // Type filter
        if (activeTypes.length > 0) {
            const fType = getTypeCategory(f.type);
            if (!activeTypes.includes(fType)) return false;
        }
        
        // Nutrient filter
        if (activeNutrients.length > 0) {
            const fNutrients = extractNutrients(f);
            const hasNutrient = activeNutrients.some(n => fNutrients.includes(n));
            if (!hasNutrient) return false;
        }
        
        // Crop filter
        if (activeCrops.length > 0) {
            const fCrops = f.suitableCrops || [];
            const hasCrop = activeCrops.some(c => fCrops.includes(c));
            if (!hasCrop) return false;
        }
        
        return true;
    });
    
    state.filtered = results;
    renderGrid(results);
    updateFilterCount();
}

function updateFilterCount() {
    const total = state.activeFilters.types.length + state.activeFilters.nutrients.length + state.activeFilters.crops.length;
    dom.filterCount.textContent = total;
    dom.filterCount.style.display = total > 0 ? 'inline' : 'none';
}

function gatherFilterSelections() {
    const types = [];
    dom.typeFilterOptions.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => types.push(cb.value));
    
    const nutrients = [];
    dom.nutrientFilterOptions.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => nutrients.push(cb.value));
    
    const crops = [];
    dom.cropFilterOptions.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => crops.push(cb.value));
    
    state.activeFilters.types = types;
    state.activeFilters.nutrients = nutrients;
    state.activeFilters.crops = crops;
    
    // Update checked styles
    document.querySelectorAll('.filter-option').forEach(opt => {
        const cb = opt.querySelector('input[type="checkbox"]');
        opt.classList.toggle('checked', cb && cb.checked);
    });
}

// ============================================================
// 7. DETAIL VIEW FUNCTIONS
// ============================================================

function openDetail(id) {
    const fertilizer = state.fertilizers.find(f => f.id === id);
    if (!fertilizer) return;
    
    state.selectedId = id;
    state.detailOpen = true;
    renderDetail(fertilizer);
    dom.detailView.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    state.detailOpen = false;
    dom.detailView.style.display = 'none';
    document.body.style.overflow = '';
}

// ============================================================
// 8. COMPARE FUNCTIONS
// ============================================================

function openCompare() {
    state.compareOpen = true;
    dom.comparePanel.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderCompareSelects();
    renderCompareTable();
}

function closeCompare() {
    state.compareOpen = false;
    dom.comparePanel.style.display = 'none';
    document.body.style.overflow = '';
}

// ============================================================
// 9. LOADING & INITIALIZATION
// ============================================================

function showLoading() {
    dom.loadingState.style.display = 'block';
    dom.grid.innerHTML = '';
    dom.errorState.style.display = 'none';
    dom.emptyState.style.display = 'none';
}

function hideLoading() {
    dom.loadingState.style.display = 'none';
}

function init() {
    showLoading();
    
    // Simulate loading (in production, this would be an async data fetch)
    setTimeout(() => {
        hideLoading();
        state.filtered = [...state.fertilizers];
        renderGrid(state.filtered);
        renderFilterOptions();
        renderCompareSelects();
        updateFilterCount();
        
        console.log(`AgriNova Fertilizer Library loaded: ${state.fertilizers.length} fertilizers`);
    }, 400);
}

// ============================================================
// 10. EVENT LISTENERS
// ============================================================

// Search
dom.search.addEventListener('input', function() {
    applyFilters();
});

// Filter toggle
dom.filterToggle.addEventListener('click', function() {
    dom.filterPanel.classList.toggle('active');
});

// Apply filters
dom.applyFilters.addEventListener('click', function() {
    gatherFilterSelections();
    applyFilters();
    dom.filterPanel.classList.remove('active');
});

// Clear filters
dom.clearFilters.addEventListener('click', function() {
    dom.typeFilterOptions.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    dom.nutrientFilterOptions.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    dom.cropFilterOptions.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('checked'));
    
    state.activeFilters = { types: [], nutrients: [], crops: [] };
    dom.search.value = '';
    updateFilterCount();
    applyFilters();
    dom.filterPanel.classList.remove('active');
});

// Filter checkbox changes - update visual state
document.addEventListener('change', function(e) {
    if (e.target.closest('.filter-options')) {
        const opt = e.target.closest('.filter-option');
        if (opt) {
            opt.classList.toggle('checked', e.target.checked);
        }
    }
});

// Detail close
dom.detailClose.addEventListener('click', closeDetail);
dom.detailOverlay.addEventListener('click', closeDetail);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (state.detailOpen) closeDetail();
        if (state.compareOpen) closeCompare();
    }
});

// Compare toggle
dom.compareToggle.addEventListener('click', openCompare);

// Compare close
dom.compareClose.addEventListener('click', closeCompare);
dom.compareOverlay.addEventListener('click', closeCompare);

// Compare select changes
dom.compareSelectA.addEventListener('change', function() {
    if (this.value) {
        state.compareIds[0] = this.value;
    } else {
        state.compareIds = state.compareIds.filter(id => id !== state.compareIds[0]);
    }
    renderCompareTable();
});

dom.compareSelectB.addEventListener('change', function() {
    if (this.value) {
        state.compareIds[1] = this.value;
    } else {
        state.compareIds = state.compareIds.filter(id => id !== state.compareIds[1]);
    }
    renderCompareTable();
});

// Retry button
dom.retryBtn.addEventListener('click', function() {
    dom.errorState.style.display = 'none';
    init();
});

// ============================================================
// 11. START APPLICATION
// ============================================================

document.addEventListener('DOMContentLoaded', init);
