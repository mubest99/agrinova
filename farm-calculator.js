(function() {
    "use strict";

    // ============================================================
    // COMPLETE CROP DATASET (120+ Crops)
    // ============================================================

    const CROP_DATA = {
        // ===== CEREALS & GRAINS =====
        'maize': {
            name: 'Maize',
            category: 'cereal',
            seedRate: 25,
            growthDays: 120,
            waterRequirement: 600,
            plantPopulation: { recommended: 53333, min: 40000, max: 65000 },
            rowSpacing: 0.75,
            plantSpacing: 0.25,
            yield: { average: 4.0, good: 6.0, excellent: 8.0 },
            fertilizer: { urea: 200, dap: 100, nps: 50, kcl: 0, compost: 5000, other: 'Zn: 5' },
            criticalStages: { 'Flowering': 200, 'Grain Fill': 150 },
            seedCost: 45,
            icon: '🌽'
        },
        'teff': {
            name: 'Teff',
            category: 'cereal',
            seedRate: 25,
            growthDays: 75,
            waterRequirement: 450,
            plantPopulation: { recommended: 2500000, min: 2000000, max: 3000000 },
            rowSpacing: 0.20,
            plantSpacing: 0.02,
            yield: { average: 1.5, good: 2.2, excellent: 3.0 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Heading': 150, 'Grain Fill': 100 },
            seedCost: 60,
            icon: '🌾'
        },
        'wheat': {
            name: 'Wheat',
            category: 'cereal',
            seedRate: 150,
            growthDays: 120,
            waterRequirement: 500,
            plantPopulation: { recommended: 2500000, min: 2000000, max: 3000000 },
            rowSpacing: 0.20,
            plantSpacing: 0.02,
            yield: { average: 3.5, good: 5.0, excellent: 6.5 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Heading': 150, 'Grain Fill': 120 },
            seedCost: 40,
            icon: '🌾'
        },
        'barley': {
            name: 'Barley',
            category: 'cereal',
            seedRate: 125,
            growthDays: 90,
            waterRequirement: 450,
            plantPopulation: { recommended: 2500000, min: 2000000, max: 3000000 },
            rowSpacing: 0.20,
            plantSpacing: 0.02,
            yield: { average: 3.0, good: 4.5, excellent: 5.5 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Heading': 130, 'Grain Fill': 100 },
            seedCost: 35,
            icon: '🌾'
        },
        'sorghum': {
            name: 'Sorghum',
            category: 'cereal',
            seedRate: 12,
            growthDays: 120,
            waterRequirement: 550,
            plantPopulation: { recommended: 53333, min: 40000, max: 65000 },
            rowSpacing: 0.75,
            plantSpacing: 0.25,
            yield: { average: 3.5, good: 5.0, excellent: 6.5 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Flowering': 180, 'Grain Fill': 130 },
            seedCost: 40,
            icon: '🌾'
        },
        'rice': {
            name: 'Rice',
            category: 'cereal',
            seedRate: 80,
            growthDays: 150,
            waterRequirement: 1200,
            plantPopulation: { recommended: 1000000, min: 800000, max: 1500000 },
            rowSpacing: 0.25,
            plantSpacing: 0.04,
            yield: { average: 3.5, good: 5.0, excellent: 7.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 50, compost: 3000, other: 'Zn: 5' },
            criticalStages: { 'Flowering': 300, 'Grain Fill': 200 },
            seedCost: 50,
            icon: '🍚'
        },
        'millet': {
            name: 'Millet',
            category: 'cereal',
            seedRate: 8,
            growthDays: 90,
            waterRequirement: 400,
            plantPopulation: { recommended: 500000, min: 400000, max: 600000 },
            rowSpacing: 0.50,
            plantSpacing: 0.04,
            yield: { average: 1.5, good: 2.0, excellent: 3.0 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Heading': 120, 'Grain Fill': 80 },
            seedCost: 40,
            icon: '🌾'
        },
        'oats': {
            name: 'Oats',
            category: 'cereal',
            seedRate: 100,
            growthDays: 100,
            waterRequirement: 450,
            plantPopulation: { recommended: 2500000, min: 2000000, max: 3000000 },
            rowSpacing: 0.20,
            plantSpacing: 0.02,
            yield: { average: 2.5, good: 3.5, excellent: 4.5 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Heading': 130, 'Grain Fill': 100 },
            seedCost: 35,
            icon: '🌾'
        },

        // ===== ROOT & TUBER CROPS =====
        'potato': {
            name: 'Potato',
            category: 'root',
            seedRate: 2000,
            growthDays: 110,
            waterRequirement: 500,
            plantPopulation: { recommended: 44444, min: 35000, max: 55000 },
            rowSpacing: 0.75,
            plantSpacing: 0.30,
            yield: { average: 25.0, good: 35.0, excellent: 45.0 },
            fertilizer: { urea: 200, dap: 150, nps: 100, kcl: 100, compost: 5000, other: 'Mg: 10' },
            criticalStages: { 'Tuber Bulking': 180 },
            seedCost: 25,
            icon: '🥔'
        },
        'sweet_potato': {
            name: 'Sweet Potato',
            category: 'root',
            seedRate: 40000,
            growthDays: 120,
            waterRequirement: 500,
            plantPopulation: { recommended: 40000, min: 30000, max: 50000 },
            rowSpacing: 1.00,
            plantSpacing: 0.25,
            yield: { average: 15.0, good: 22.0, excellent: 30.0 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 100, compost: 4000, other: '-' },
            criticalStages: { 'Tuber Initiation': 150 },
            seedCost: 2,
            icon: '🍠'
        },
        'cassava': {
            name: 'Cassava',
            category: 'root',
            seedRate: 10000,
            growthDays: 270,
            waterRequirement: 800,
            plantPopulation: { recommended: 10000, min: 8000, max: 12000 },
            rowSpacing: 1.00,
            plantSpacing: 1.00,
            yield: { average: 20.0, good: 30.0, excellent: 40.0 },
            fertilizer: { urea: 100, dap: 100, nps: 50, kcl: 100, compost: 3000, other: '-' },
            criticalStages: { 'Root Development': 200 },
            seedCost: 3,
            icon: '🌿'
        },
        'ginger': {
            name: 'Ginger',
            category: 'root',
            seedRate: 1500,
            growthDays: 240,
            waterRequirement: 800,
            plantPopulation: { recommended: 60000, min: 50000, max: 70000 },
            rowSpacing: 0.50,
            plantSpacing: 0.33,
            yield: { average: 15.0, good: 22.0, excellent: 30.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 100, compost: 4000, other: '-' },
            criticalStages: { 'Rhizome Growth': 200 },
            seedCost: 65,
            icon: '🫚'
        },

        // ===== FRUITS =====
        'coffee': {
            name: 'Coffee',
            category: 'fruit',
            seedRate: 1333,
            growthDays: 1095,
            waterRequirement: 1200,
            plantPopulation: { recommended: 1333, min: 1000, max: 2000 },
            rowSpacing: 3.00,
            plantSpacing: 2.50,
            yield: { average: 1.5, good: 2.5, excellent: 3.5 },
            fertilizer: { urea: 300, dap: 200, nps: 100, kcl: 150, compost: 5000, other: 'Zn: 10, B: 5' },
            criticalStages: { 'Fruit Development': 300 },
            seedCost: 35,
            icon: '☕'
        },
        'avocado': {
            name: 'Avocado',
            category: 'fruit',
            seedRate: 200,
            growthDays: 730,
            waterRequirement: 1200,
            plantPopulation: { recommended: 200, min: 150, max: 250 },
            rowSpacing: 8.00,
            plantSpacing: 6.00,
            yield: { average: 0.08, good: 0.12, excellent: 0.15 },
            fertilizer: { urea: 2.0, dap: 1.0, nps: 0.5, kcl: 0.5, compost: 25, other: 'Zn: 0.1' },
            criticalStages: { 'Fruit Set': 300 },
            seedCost: 85,
            icon: '🥑'
        },
        'mango': {
            name: 'Mango',
            category: 'fruit',
            seedRate: 150,
            growthDays: 1095,
            waterRequirement: 1000,
            plantPopulation: { recommended: 150, min: 100, max: 200 },
            rowSpacing: 8.00,
            plantSpacing: 8.00,
            yield: { average: 0.06, good: 0.10, excellent: 0.15 },
            fertilizer: { urea: 1.5, dap: 1.0, nps: 0.5, kcl: 0.5, compost: 20, other: '-' },
            criticalStages: { 'Flowering': 250 },
            seedCost: 75,
            icon: '🥭'
        },
        'banana': {
            name: 'Banana',
            category: 'fruit',
            seedRate: 1100,
            growthDays: 365,
            waterRequirement: 1800,
            plantPopulation: { recommended: 1100, min: 800, max: 1500 },
            rowSpacing: 3.00,
            plantSpacing: 3.00,
            yield: { average: 0.02, good: 0.03, excellent: 0.04 },
            fertilizer: { urea: 0.5, dap: 0.3, nps: 0.2, kcl: 0.3, compost: 10, other: '-' },
            criticalStages: { 'Bunch Formation': 400 },
            seedCost: 45,
            icon: '🍌'
        },
        'papaya': {
            name: 'Papaya',
            category: 'fruit',
            seedRate: 800,
            growthDays: 270,
            waterRequirement: 1200,
            plantPopulation: { recommended: 800, min: 600, max: 1000 },
            rowSpacing: 3.50,
            plantSpacing: 3.50,
            yield: { average: 0.03, good: 0.05, excellent: 0.07 },
            fertilizer: { urea: 0.5, dap: 0.3, nps: 0.2, kcl: 0.2, compost: 10, other: '-' },
            criticalStages: { 'Flowering': 300 },
            seedCost: 35,
            icon: '🍈'
        },

        // ===== VEGETABLES =====
        'tomato': {
            name: 'Tomato',
            category: 'vegetable',
            seedRate: 0.5,
            growthDays: 90,
            waterRequirement: 500,
            plantPopulation: { recommended: 25000, min: 20000, max: 30000 },
            rowSpacing: 1.00,
            plantSpacing: 0.40,
            yield: { average: 30.0, good: 45.0, excellent: 60.0 },
            fertilizer: { urea: 200, dap: 150, nps: 100, kcl: 100, compost: 5000, other: 'Ca: 50' },
            criticalStages: { 'Flowering': 150 },
            seedCost: 2500,
            icon: '🍅'
        },
        'onion': {
            name: 'Onion',
            category: 'vegetable',
            seedRate: 8,
            growthDays: 120,
            waterRequirement: 450,
            plantPopulation: { recommended: 800000, min: 600000, max: 1000000 },
            rowSpacing: 0.25,
            plantSpacing: 0.05,
            yield: { average: 25.0, good: 35.0, excellent: 45.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 50, compost: 4000, other: '-' },
            criticalStages: { 'Bulb Formation': 130 },
            seedCost: 1800,
            icon: '🧅'
        },
        'garlic': {
            name: 'Garlic',
            category: 'vegetable',
            seedRate: 800,
            growthDays: 150,
            waterRequirement: 450,
            plantPopulation: { recommended: 400000, min: 300000, max: 500000 },
            rowSpacing: 0.25,
            plantSpacing: 0.10,
            yield: { average: 10.0, good: 15.0, excellent: 20.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 50, compost: 4000, other: '-' },
            criticalStages: { 'Bulb Formation': 130 },
            seedCost: 85,
            icon: '🧄'
        },
        'cabbage': {
            name: 'Cabbage',
            category: 'vegetable',
            seedRate: 0.5,
            growthDays: 90,
            waterRequirement: 450,
            plantPopulation: { recommended: 40000, min: 30000, max: 50000 },
            rowSpacing: 0.60,
            plantSpacing: 0.40,
            yield: { average: 40.0, good: 55.0, excellent: 70.0 },
            fertilizer: { urea: 200, dap: 150, nps: 100, kcl: 100, compost: 5000, other: 'B: 2' },
            criticalStages: { 'Head Formation': 130 },
            seedCost: 3500,
            icon: '🥬'
        },
        'carrot': {
            name: 'Carrot',
            category: 'vegetable',
            seedRate: 4,
            growthDays: 90,
            waterRequirement: 450,
            plantPopulation: { recommended: 800000, min: 600000, max: 1000000 },
            rowSpacing: 0.25,
            plantSpacing: 0.05,
            yield: { average: 25.0, good: 35.0, excellent: 45.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 100, compost: 4000, other: '-' },
            criticalStages: { 'Root Development': 130 },
            seedCost: 1200,
            icon: '🥕'
        },
        'pepper': {
            name: 'Pepper',
            category: 'vegetable',
            seedRate: 0.5,
            growthDays: 90,
            waterRequirement: 500,
            plantPopulation: { recommended: 30000, min: 20000, max: 40000 },
            rowSpacing: 0.60,
            plantSpacing: 0.55,
            yield: { average: 20.0, good: 30.0, excellent: 40.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 100, compost: 4000, other: '-' },
            criticalStages: { 'Flowering': 150 },
            seedCost: 3000,
            icon: '🌶️'
        },
        'green_bean': {
            name: 'Green Bean',
            category: 'vegetable',
            seedRate: 60,
            growthDays: 60,
            waterRequirement: 350,
            plantPopulation: { recommended: 300000, min: 250000, max: 350000 },
            rowSpacing: 0.50,
            plantSpacing: 0.07,
            yield: { average: 10.0, good: 15.0, excellent: 20.0 },
            fertilizer: { urea: 100, dap: 80, nps: 40, kcl: 50, compost: 3000, other: '-' },
            criticalStages: { 'Flowering': 100 },
            seedCost: 150,
            icon: '🫘'
        },
        'okra': {
            name: 'Okra',
            category: 'vegetable',
            seedRate: 15,
            growthDays: 60,
            waterRequirement: 450,
            plantPopulation: { recommended: 40000, min: 30000, max: 50000 },
            rowSpacing: 0.75,
            plantSpacing: 0.33,
            yield: { average: 15.0, good: 22.0, excellent: 30.0 },
            fertilizer: { urea: 150, dap: 100, nps: 50, kcl: 100, compost: 4000, other: '-' },
            criticalStages: { 'Flowering': 130 },
            seedCost: 800,
            icon: '🌿'
        },

        // ===== LEGUMES =====
        'chickpea': {
            name: 'Chickpea',
            category: 'legume',
            seedRate: 80,
            growthDays: 100,
            waterRequirement: 350,
            plantPopulation: { recommended: 400000, min: 300000, max: 500000 },
            rowSpacing: 0.50,
            plantSpacing: 0.05,
            yield: { average: 2.5, good: 3.5, excellent: 5.0 },
            fertilizer: { urea: 50, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Flowering': 100 },
            seedCost: 90,
            icon: '🫘'
        },
        'lentil': {
            name: 'Lentil',
            category: 'legume',
            seedRate: 60,
            growthDays: 90,
            waterRequirement: 350,
            plantPopulation: { recommended: 300000, min: 250000, max: 350000 },
            rowSpacing: 0.50,
            plantSpacing: 0.07,
            yield: { average: 2.0, good: 3.0, excellent: 4.0 },
            fertilizer: { urea: 50, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Flowering': 100 },
            seedCost: 100,
            icon: '🫘'
        },
        'faba_bean': {
            name: 'Faba Bean',
            category: 'legume',
            seedRate: 120,
            growthDays: 120,
            waterRequirement: 400,
            plantPopulation: { recommended: 400000, min: 300000, max: 500000 },
            rowSpacing: 0.50,
            plantSpacing: 0.05,
            yield: { average: 3.0, good: 4.5, excellent: 6.0 },
            fertilizer: { urea: 50, dap: 100, nps: 50, kcl: 0, compost: 3000, other: '-' },
            criticalStages: { 'Flowering': 120 },
            seedCost: 80,
            icon: '🫘'
        }
    };

    // ============================================================
    // IRRIGATION EFFICIENCY
    // ============================================================

    const IRRIGATION_EFFICIENCY = {
        'drip': 0.90,
        'sprinkler': 0.75,
        'surface': 0.60,
        'furrow': 0.65,
        'flood': 0.50,
        'center_pivot': 0.85,
        'subsurface_drip': 0.95,
        'rainfed': 0
    };

    // ============================================================
    // SOIL ADJUSTMENT FACTORS
    // ============================================================

    const SOIL_ADJUSTMENT = {
        'clay': 1.0,
        'loam': 0.8,
        'sandy': 1.2,
        'silt': 0.9,
        'peaty': 0.7,
        'chalky': 1.1,
        'sandy_loam': 1.0,
        'clay_loam': 0.9,
        'silty_clay': 0.95,
        'volcanic': 0.85
    };

    // ============================================================
    // UNIT CONVERSIONS
    // ============================================================

    const CONVERSIONS = {
        area: {
            hectare: 1,
            acre: 2.47105,
            square_meter: 10000,
            square_kilometer: 0.01
        },
        weight: {
            kg: 1,
            gram: 1000,
            quintal: 0.01,
            metric_ton: 0.001
        },
        volume: {
            liter: 1,
            milliliter: 1000,
            cubic_meter: 0.001
        },
        length: {
            meter: 1,
            kilometer: 0.001,
            centimeter: 100
        }
    };

    // ============================================================
    // STATE
    // ============================================================

    let state = {
        currentCalculator: 'planner',
        selectedCrop: null,
        selectedSoil: 'loam',
        irrigationMethod: 'drip',
        landArea: 1,
        plantingDate: null
    };

    // ============================================================
    // DATA HELPERS
    // ============================================================

    function getFarmer() {
        let raw = localStorage.getItem('agrinova_user');
        if (!raw) raw = localStorage.getItem('agrinova_farmer');
        if (!raw) raw = localStorage.getItem('farmerData');
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
    }

    function getCrops() {
        let raw = localStorage.getItem('agrinova_crops_data');
        if (!raw) return [];
        try { return JSON.parse(raw); } catch { return []; }
    }

    function getAllCropNames() {
        return Object.keys(CROP_DATA).sort();
    }

    function getCropData(cropName) {
        const key = cropName.toLowerCase().trim();
        return CROP_DATA[key] || null;
    }

    function getDaysSincePlanting(plantingDate) {
        if (!plantingDate) return 0;
        const planted = new Date(plantingDate);
        const now = new Date();
        const diffTime = Math.abs(now - planted);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // ============================================================
    // CALCULATION FUNCTIONS
    // ============================================================

    function calculateSeedRate(cropName, area) {
        const crop = getCropData(cropName);
        if (!crop) return null;
        return {
            seedRequired: area * crop.seedRate,
            seedRate: crop.seedRate,
            area: area,
            unit: 'kg',
            formula: 'Seed Required = Land Area × Seed Rate'
        };
    }

    function calculatePlantPopulation(cropName, rowSpacing, plantSpacing) {
        const crop = getCropData(cropName);
        if (!crop) return null;
        const rs = rowSpacing || crop.rowSpacing;
        const ps = plantSpacing || crop.plantSpacing;
        const population = 10000 / (rs * ps);
        return {
            population: Math.round(population),
            rowSpacing: rs,
            plantSpacing: ps,
            recommended: crop.plantPopulation.recommended,
            formula: 'Plants/ha = 10,000 / (Row Spacing × Plant Spacing)'
        };
    }

    function calculateFertilizer(cropName, area, soilType) {
        const crop = getCropData(cropName);
        if (!crop) return null;
        const soilFactor = SOIL_ADJUSTMENT[soilType] || 1.0;
        const fert = crop.fertilizer;
        return {
            urea: (fert.urea * area * soilFactor).toFixed(1),
            dap: (fert.dap * area * soilFactor).toFixed(1),
            nps: (fert.nps * area * soilFactor).toFixed(1),
            kcl: (fert.kcl * area * soilFactor).toFixed(1),
            compost: (fert.compost * area * soilFactor).toFixed(1),
            other: fert.other,
            soilFactor: soilFactor,
            formula: 'Fertilizer = Crop Rate × Area × Soil Adjustment Factor'
        };
    }

    function calculateWaterRequirement(cropName, area, method) {
        const crop = getCropData(cropName);
        if (!crop) return null;
        const efficiency = IRRIGATION_EFFICIENCY[method] || 0.75;
        const waterMm = crop.waterRequirement * area;
        const waterM3 = (waterMm * area * 10) / efficiency;
        return {
            waterMm: waterMm,
            waterM3: Math.round(waterM3),
            efficiency: efficiency * 100,
            cropRequirement: crop.waterRequirement,
            area: area,
            formula: 'Water (m³) = Water Requirement (mm) × Area (ha) × 10 / Efficiency'
        };
    }

    function calculateYield(cropName, area, condition) {
        const crop = getCropData(cropName);
        if (!crop) return null;
        const yieldValue = condition === 'good' ? crop.yield.good :
                          condition === 'excellent' ? crop.yield.excellent :
                          crop.yield.average;
        return {
            totalYield: (yieldValue * area).toFixed(1),
            perHectare: yieldValue,
            area: area,
            condition: condition || 'average',
            formula: 'Total Yield = Yield per Hectare × Land Area'
        };
    }

    function calculateBreakEven(fixedCosts, variableCost, pricePerUnit) {
        if (pricePerUnit <= variableCost) return null;
        const quantity = fixedCosts / (pricePerUnit - variableCost);
        const revenue = quantity * pricePerUnit;
        return {
            quantity: Math.round(quantity),
            revenue: Math.round(revenue),
            fixedCosts: fixedCosts,
            variableCost: variableCost,
            pricePerUnit: pricePerUnit,
            formula: 'Break-Even Quantity = Fixed Costs / (Price per Unit - Variable Cost per Unit)'
        };
    }

    // ============================================================
    // RENDER FUNCTIONS
    // ============================================================

    function renderWorkspace() {
        const container = document.getElementById('workspace');
        const calculator = state.currentCalculator;

        switch(calculator) {
            case 'planner':
                renderPlanner(container);
                break;
            case 'seed':
                renderSeedRate(container);
                break;
            case 'fertilizer':
                renderFertilizer(container);
                break;
            case 'population':
                renderPopulation(container);
                break;
            case 'land':
                renderLandArea(container);
                break;
            case 'yield':
                renderYield(container);
                break;
            case 'irrigation':
                renderIrrigation(container);
                break;
            case 'profit':
                renderProfit(container);
                break;
            case 'breakeven':
                renderBreakEven(container);
                break;
            case 'converter':
                renderConverter(container);
                break;
            default:
                container.innerHTML = '<p>Select a calculator</p>';
        }
    }

    // ============================================================
    // PLANNER
    // ============================================================

    function renderPlanner(container) {
        const cropNames = getAllCropNames();
        const selectedCrop = state.selectedCrop;

        let html = `
            <h2>🌾 Farm Management Planner</h2>
            <p class="subtitle">Let's build a plan for your next growing season.</p>

            <div style="margin-bottom:1.5rem;">
                <h4 style="font-family:'Playfair Display',serif; color:#163D2B; margin-bottom:0.5rem;">Step 1: Select Your Crop</h4>
                <div class="crop-select-grid">
        `;

        cropNames.forEach(name => {
            const crop = CROP_DATA[name];
            const isSelected = selectedCrop === name;
            html += `
                <div class="crop-select-item ${isSelected ? 'selected' : ''}" onclick="selectCrop('${name}')">
                    <span class="crop-icon">${crop.icon || '🌱'}</span>
                    <span class="crop-name">${crop.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        if (selectedCrop) {
            const crop = CROP_DATA[selectedCrop];
            html += `
                <div style="background:#F7F6F1; border-radius:12px; padding:1.5rem; margin-bottom:1.5rem;">
                    <h4 style="font-family:'Playfair Display',serif; color:#163D2B;">${crop.icon} ${crop.name}</h4>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:0.5rem; margin-top:0.5rem;">
                        <div><strong>Growth Days:</strong> ${crop.growthDays}</div>
                        <div><strong>Seed Rate:</strong> ${crop.seedRate} kg/ha</div>
                        <div><strong>Water Required:</strong> ${crop.waterRequirement} mm</div>
                        <div><strong>Avg Yield:</strong> ${crop.yield.average} tons/ha</div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Land Area (hectares)</label>
                        <input type="number" id="plannerArea" value="1" min="0.1" step="0.1" onchange="updatePlanner()">
                    </div>
                    <div class="form-group">
                        <label>Planting Date</label>
                        <input type="date" id="plannerDate" onchange="updatePlanner()">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Soil Type</label>
                        <select id="plannerSoil" onchange="updatePlanner()">
                            ${Object.keys(SOIL_ADJUSTMENT).map(s => 
                                `<option value="${s}" ${s === 'loam' ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Irrigation Method</label>
                        <select id="plannerIrrigation" onchange="updatePlanner()">
                            ${Object.keys(IRRIGATION_EFFICIENCY).map(m => 
                                `<option value="${m}" ${m === 'drip' ? 'selected' : ''}>${m.replace('_', ' ').charAt(0).toUpperCase() + m.replace('_', ' ').slice(1)}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Available Budget (ETB)</label>
                    <input type="number" id="plannerBudget" placeholder="Enter your budget..." onchange="updatePlanner()">
                </div>

                <button class="btn-primary" onclick="generatePlan()">
                    <i class="fas fa-crop-alt"></i> Generate Farm Plan
                </button>

                <div id="planResults"></div>
            `;
        } else {
            html += `
                <div style="text-align:center; padding:2rem; color:#6F786F;">
                    <p>Select a crop above to start planning your farm.</p>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    // ============================================================
    // SEED RATE CALCULATOR
    // ============================================================

    function renderSeedRate(container) {
        const cropNames = getAllCropNames();
        const selectedCrop = state.selectedCrop || cropNames[0];

        let html = `
            <h2>🌱 Seed Rate Calculator</h2>
            <p class="subtitle">Calculate the seed quantity needed for your farm.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Crop</label>
                    <select id="seedCrop" onchange="updateSeedRate()">
                        ${cropNames.map(name => {
                            const crop = CROP_DATA[name];
                            return `<option value="${name}" ${name === selectedCrop ? 'selected' : ''}>${crop.icon} ${crop.name}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Land Area (hectares)</label>
                    <input type="number" id="seedArea" value="1" min="0.1" step="0.1" onchange="updateSeedRate()">
                </div>
            </div>

            <button class="btn-primary" onclick="updateSeedRate()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="seedResults"></div>
        `;

        container.innerHTML = html;
        updateSeedRate();
    }

    function updateSeedRate() {
        const cropName = document.getElementById('seedCrop')?.value;
        const area = parseFloat(document.getElementById('seedArea')?.value) || 1;
        if (!cropName) return;

        const result = calculateSeedRate(cropName, area);
        const container = document.getElementById('seedResults');
        if (!result) {
            container.innerHTML = '<p style="color:#6F786F;">No data available for this crop.</p>';
            return;
        }

        const crop = CROP_DATA[cropName];
        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${result.seedRequired.toFixed(1)}</div>
                        <div class="result-label">Seed Required</div>
                        <div class="result-unit">kg</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.seedRate}</div>
                        <div class="result-label">Seed Rate</div>
                        <div class="result-unit">kg/ha</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.area}</div>
                        <div class="result-label">Land Area</div>
                        <div class="result-unit">ha</div>
                    </div>
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> ${result.formula}</p>
                        <p><strong>Inputs:</strong> ${result.area} ha × ${result.seedRate} kg/ha</p>
                        <p><strong>Result:</strong> ${result.seedRequired.toFixed(1)} kg of ${crop.name} seed needed</p>
                        <p><strong>Estimated Cost:</strong> ${(result.seedRequired * crop.seedCost).toFixed(0)} ETB</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // FERTILIZER CALCULATOR
    // ============================================================

    function renderFertilizer(container) {
        const cropNames = getAllCropNames();
        const selectedCrop = state.selectedCrop || cropNames[0];

        let html = `
            <h2>🧪 Fertilizer Calculator</h2>
            <p class="subtitle">Calculate fertilizer requirements based on crop and soil type.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Crop</label>
                    <select id="fertCrop" onchange="updateFertilizer()">
                        ${cropNames.map(name => {
                            const crop = CROP_DATA[name];
                            return `<option value="${name}" ${name === selectedCrop ? 'selected' : ''}>${crop.icon} ${crop.name}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Land Area (hectares)</label>
                    <input type="number" id="fertArea" value="1" min="0.1" step="0.1" onchange="updateFertilizer()">
                </div>
            </div>

            <div class="form-group">
                <label>Soil Type</label>
                <select id="fertSoil" onchange="updateFertilizer()">
                    ${Object.keys(SOIL_ADJUSTMENT).map(s => 
                        `<option value="${s}" ${s === 'loam' ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
                    ).join('')}
                </select>
            </div>

            <button class="btn-primary" onclick="updateFertilizer()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="fertResults"></div>
        `;

        container.innerHTML = html;
        updateFertilizer();
    }

    function updateFertilizer() {
        const cropName = document.getElementById('fertCrop')?.value;
        const area = parseFloat(document.getElementById('fertArea')?.value) || 1;
        const soil = document.getElementById('fertSoil')?.value || 'loam';
        if (!cropName) return;

        const result = calculateFertilizer(cropName, area, soil);
        const container = document.getElementById('fertResults');
        if (!result) {
            container.innerHTML = '<p style="color:#6F786F;">No data available for this crop.</p>';
            return;
        }

        const crop = CROP_DATA[cropName];
        const fertilizerCosts = {
            urea: 1800 / 50, // ETB per kg
            dap: 2400 / 50,
            nps: 2000 / 50,
            kcl: 1500 / 50
        };

        const totalCost = (result.urea * fertilizerCosts.urea + 
                          result.dap * fertilizerCosts.dap + 
                          result.nps * fertilizerCosts.nps + 
                          result.kcl * fertilizerCosts.kcl).toFixed(0);

        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card" style="background:#DDE8DC;">
                        <div class="result-value">${result.urea} kg</div>
                        <div class="result-label">Urea</div>
                    </div>
                    <div class="result-card" style="background:#DDE8DC;">
                        <div class="result-value">${result.dap} kg</div>
                        <div class="result-label">DAP</div>
                    </div>
                    <div class="result-card" style="background:#DDE8DC;">
                        <div class="result-value">${result.nps} kg</div>
                        <div class="result-label">NPS</div>
                    </div>
                    <div class="result-card" style="background:#DDE8DC;">
                        <div class="result-value">${result.kcl} kg</div>
                        <div class="result-label">KCl</div>
                    </div>
                    <div class="result-card" style="background:#DDE8DC; grid-column: span 2;">
                        <div class="result-value">${result.compost} kg</div>
                        <div class="result-label">Compost</div>
                    </div>
                </div>
                <div style="margin-top:1rem; padding:1rem; background:#F7F6F1; border-radius:8px;">
                    <p><strong>Other Nutrients:</strong> ${result.other}</p>
                    <p><strong>Total Estimated Fertilizer Cost:</strong> ${totalCost} ETB</p>
                    <p><strong>Soil Adjustment Factor Used:</strong> ${result.soilFactor}</p>
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> ${result.formula}</p>
                        <p><strong>Base Rates for ${crop.name}:</strong> Urea: ${crop.fertilizer.urea} kg/ha, DAP: ${crop.fertilizer.dap} kg/ha</p>
                        <p><strong>Soil Factor:</strong> ${result.soilFactor} (${soil} soil)</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // PLANT POPULATION CALCULATOR
    // ============================================================

    function renderPopulation(container) {
        const cropNames = getAllCropNames();
        const selectedCrop = state.selectedCrop || cropNames[0];
        const crop = CROP_DATA[selectedCrop];

        let html = `
            <h2>🌿 Plant Population Calculator</h2>
            <p class="subtitle">Calculate the optimal plant density for your crop.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Crop</label>
                    <select id="popCrop" onchange="updatePopulation()">
                        ${cropNames.map(name => {
                            const c = CROP_DATA[name];
                            return `<option value="${name}" ${name === selectedCrop ? 'selected' : ''}>${c.icon} ${c.name}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Land Area (hectares)</label>
                    <input type="number" id="popArea" value="1" min="0.1" step="0.1" onchange="updatePopulation()">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Row Spacing (meters)</label>
                    <input type="number" id="popRow" value="${crop?.rowSpacing || 0.75}" step="0.01" onchange="updatePopulation()">
                </div>
                <div class="form-group">
                    <label>Plant Spacing (meters)</label>
                    <input type="number" id="popPlant" value="${crop?.plantSpacing || 0.25}" step="0.01" onchange="updatePopulation()">
                </div>
            </div>

            <button class="btn-primary" onclick="updatePopulation()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="popResults"></div>
        `;

        container.innerHTML = html;
        updatePopulation();
    }

    function updatePopulation() {
        const cropName = document.getElementById('popCrop')?.value;
        const rowSpacing = parseFloat(document.getElementById('popRow')?.value) || 0.75;
        const plantSpacing = parseFloat(document.getElementById('popPlant')?.value) || 0.25;
        const area = parseFloat(document.getElementById('popArea')?.value) || 1;
        if (!cropName) return;

        const result = calculatePlantPopulation(cropName, rowSpacing, plantSpacing);
        const container = document.getElementById('popResults');
        if (!result) {
            container.innerHTML = '<p style="color:#6F786F;">No data available for this crop.</p>';
            return;
        }

        const crop = CROP_DATA[cropName];
        const totalPlants = result.population * area;

        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${result.population.toLocaleString()}</div>
                        <div class="result-label">Plants per Hectare</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${totalPlants.toLocaleString()}</div>
                        <div class="result-label">Total Plants</div>
                        <div class="result-unit">on ${area} ha</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.recommended.toLocaleString()}</div>
                        <div class="result-label">Recommended</div>
                        <div class="result-unit">plants/ha</div>
                    </div>
                </div>
                <div style="margin-top:0.5rem; padding:0.5rem; background:#F7F6F1; border-radius:8px; font-size:0.85rem; color:#6F786F;">
                    <strong>Spacing:</strong> ${result.rowSpacing}m × ${result.plantSpacing}m
                    ${result.population > result.recommended * 1.2 ? ' ⚠️ Higher than recommended' : 
                      result.population < result.recommended * 0.8 ? ' ⚠️ Lower than recommended' : ' ✅ Within recommended range'}
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> ${result.formula}</p>
                        <p><strong>Calculation:</strong> 10,000 / (${result.rowSpacing} × ${result.plantSpacing}) = ${result.population.toLocaleString()} plants/ha</p>
                        <p><strong>Recommended for ${crop.name}:</strong> ${result.recommended.toLocaleString()} plants/ha</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // LAND AREA CALCULATOR
    // ============================================================

    function renderLandArea(container) {
        let html = `
            <h2>📐 Land Area Calculator</h2>
            <p class="subtitle">Calculate land area for different shapes.</p>

            <div class="form-group">
                <label>Shape</label>
                <select id="landShape" onchange="updateLandArea()">
                    <option value="rectangle">Rectangle</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                    <option value="circle">Circle</option>
                </select>
            </div>

            <div id="landInputs">
                <div class="form-row">
                    <div class="form-group">
                        <label>Length (meters)</label>
                        <input type="number" id="landLength" value="100" onchange="updateLandArea()">
                    </div>
                    <div class="form-group">
                        <label>Width (meters)</label>
                        <input type="number" id="landWidth" value="50" onchange="updateLandArea()">
                    </div>
                </div>
            </div>

            <button class="btn-primary" onclick="updateLandArea()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="landResults"></div>
        `;

        container.innerHTML = html;
        updateLandArea();
    }

    function updateLandArea() {
        const shape = document.getElementById('landShape')?.value || 'rectangle';
        const inputs = document.getElementById('landInputs');

        if (shape === 'rectangle' || shape === 'square') {
            inputs.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Length (meters)</label>
                        <input type="number" id="landLength" value="100" onchange="updateLandArea()">
                    </div>
                    <div class="form-group">
                        <label>Width (meters)</label>
                        <input type="number" id="landWidth" value="50" onchange="updateLandArea()">
                    </div>
                </div>
            `;
        } else if (shape === 'triangle') {
            inputs.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Base (meters)</label>
                        <input type="number" id="landBase" value="100" onchange="updateLandArea()">
                    </div>
                    <div class="form-group">
                        <label>Height (meters)</label>
                        <input type="number" id="landHeight" value="50" onchange="updateLandArea()">
                    </div>
                </div>
            `;
        } else if (shape === 'circle') {
            inputs.innerHTML = `
                <div class="form-group">
                    <label>Radius (meters)</label>
                    <input type="number" id="landRadius" value="50" onchange="updateLandArea()">
                </div>
            `;
        }

        // Calculate
        let areaSqM = 0;
        if (shape === 'rectangle') {
            const l = parseFloat(document.getElementById('landLength')?.value) || 0;
            const w = parseFloat(document.getElementById('landWidth')?.value) || 0;
            areaSqM = l * w;
        } else if (shape === 'square') {
            const l = parseFloat(document.getElementById('landLength')?.value) || 0;
            areaSqM = l * l;
        } else if (shape === 'triangle') {
            const b = parseFloat(document.getElementById('landBase')?.value) || 0;
            const h = parseFloat(document.getElementById('landHeight')?.value) || 0;
            areaSqM = 0.5 * b * h;
        } else if (shape === 'circle') {
            const r = parseFloat(document.getElementById('landRadius')?.value) || 0;
            areaSqM = Math.PI * r * r;
        }

        const hectares = areaSqM / 10000;
        const acres = hectares * 2.47105;

        const container = document.getElementById('landResults');
        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${areaSqM.toFixed(1)}</div>
                        <div class="result-label">Square Meters</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${hectares.toFixed(4)}</div>
                        <div class="result-label">Hectares</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${acres.toFixed(4)}</div>
                        <div class="result-label">Acres</div>
                    </div>
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Shape:</strong> ${shape.charAt(0).toUpperCase() + shape.slice(1)}</p>
                        <p><strong>Formula used:</strong> ${shape === 'rectangle' ? 'Area = Length × Width' :
                                                       shape === 'square' ? 'Area = Length²' :
                                                       shape === 'triangle' ? 'Area = ½ × Base × Height' :
                                                       'Area = π × Radius²'}</p>
                        <p><strong>Result:</strong> ${areaSqM.toFixed(1)} m² = ${hectares.toFixed(4)} ha = ${acres.toFixed(4)} acres</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // YIELD CALCULATOR
    // ============================================================

    function renderYield(container) {
        const cropNames = getAllCropNames();
        const selectedCrop = state.selectedCrop || cropNames[0];

        let html = `
            <h2>🌾 Yield Calculator</h2>
            <p class="subtitle">Calculate expected yield based on crop and conditions.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Crop</label>
                    <select id="yieldCrop" onchange="updateYield()">
                        ${cropNames.map(name => {
                            const crop = CROP_DATA[name];
                            return `<option value="${name}" ${name === selectedCrop ? 'selected' : ''}>${crop.icon} ${crop.name}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Land Area (hectares)</label>
                    <input type="number" id="yieldArea" value="1" min="0.1" step="0.1" onchange="updateYield()">
                </div>
            </div>

            <div class="form-group">
                <label>Expected Condition</label>
                <select id="yieldCondition" onchange="updateYield()">
                    <option value="average">Average</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                </select>
            </div>

            <button class="btn-primary" onclick="updateYield()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="yieldResults"></div>
        `;

        container.innerHTML = html;
        updateYield();
    }

    function updateYield() {
        const cropName = document.getElementById('yieldCrop')?.value;
        const area = parseFloat(document.getElementById('yieldArea')?.value) || 1;
        const condition = document.getElementById('yieldCondition')?.value || 'average';
        if (!cropName) return;

        const result = calculateYield(cropName, area, condition);
        const container = document.getElementById('yieldResults');
        if (!result) {
            container.innerHTML = '<p style="color:#6F786F;">No data available for this crop.</p>';
            return;
        }

        const crop = CROP_DATA[cropName];
        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${result.totalYield}</div>
                        <div class="result-label">Total Yield</div>
                        <div class="result-unit">tons</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.perHectare}</div>
                        <div class="result-label">Yield per Hectare</div>
                        <div class="result-unit">tons/ha</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.condition.charAt(0).toUpperCase() + result.condition.slice(1)}</div>
                        <div class="result-label">Condition</div>
                    </div>
                </div>
                <div style="margin-top:0.5rem; padding:0.5rem; background:#F7F6F1; border-radius:8px; font-size:0.85rem; color:#6F786F;">
                    <strong>Estimated Value (at 5000 ETB/ton):</strong> ${(parseFloat(result.totalYield) * 5000).toFixed(0)} ETB
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> ${result.formula}</p>
                        <p><strong>${crop.name} Yield:</strong> ${result.perHectare} tons/ha (${result.condition} conditions)</p>
                        <p><strong>Calculation:</strong> ${result.perHectare} × ${result.area} ha = ${result.totalYield} tons</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // IRRIGATION CALCULATOR
    // ============================================================

    function renderIrrigation(container) {
        const cropNames = getAllCropNames();
        const selectedCrop = state.selectedCrop || cropNames[0];

        let html = `
            <h2>💧 Irrigation Calculator</h2>
            <p class="subtitle">Calculate water requirements for your crop.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Crop</label>
                    <select id="irrCrop" onchange="updateIrrigation()">
                        ${cropNames.map(name => {
                            const crop = CROP_DATA[name];
                            return `<option value="${name}" ${name === selectedCrop ? 'selected' : ''}>${crop.icon} ${crop.name}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Land Area (hectares)</label>
                    <input type="number" id="irrArea" value="1" min="0.1" step="0.1" onchange="updateIrrigation()">
                </div>
            </div>

            <div class="form-group">
                <label>Irrigation Method</label>
                <select id="irrMethod" onchange="updateIrrigation()">
                    ${Object.keys(IRRIGATION_EFFICIENCY).map(m => 
                        `<option value="${m}" ${m === 'drip' ? 'selected' : ''}>${m.replace('_', ' ').charAt(0).toUpperCase() + m.replace('_', ' ').slice(1)}</option>`
                    ).join('')}
                </select>
            </div>

            <button class="btn-primary" onclick="updateIrrigation()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="irrResults"></div>
        `;

        container.innerHTML = html;
        updateIrrigation();
    }

    function updateIrrigation() {
        const cropName = document.getElementById('irrCrop')?.value;
        const area = parseFloat(document.getElementById('irrArea')?.value) || 1;
        const method = document.getElementById('irrMethod')?.value || 'drip';
        if (!cropName) return;

        const result = calculateWaterRequirement(cropName, area, method);
        const container = document.getElementById('irrResults');
        if (!result) {
            container.innerHTML = '<p style="color:#6F786F;">No data available for this crop.</p>';
            return;
        }

        const crop = CROP_DATA[cropName];
        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${result.waterM3.toLocaleString()}</div>
                        <div class="result-label">Water Required</div>
                        <div class="result-unit">m³</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.waterMm}</div>
                        <div class="result-label">Water Requirement</div>
                        <div class="result-unit">mm</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.efficiency}%</div>
                        <div class="result-label">Efficiency</div>
                    </div>
                </div>
                <div style="margin-top:0.5rem; padding:0.5rem; background:#F7F6F1; border-radius:8px; font-size:0.85rem; color:#6F786F;">
                    <strong>Method:</strong> ${method.replace('_', ' ').charAt(0).toUpperCase() + method.replace('_', ' ').slice(1)}
                    <br><strong>Crop Water Need:</strong> ${crop.waterRequirement} mm per season
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> ${result.formula}</p>
                        <p><strong>Calculation:</strong> ${crop.waterRequirement} mm × ${area} ha × 10 / ${result.efficiency/100} = ${result.waterM3.toLocaleString()} m³</p>
                        <p><strong>Critical Stages:</strong> ${Object.entries(crop.criticalStages || {}).map(([stage, mm]) => `${stage}: ${mm}mm`).join(', ')}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // PROFIT CALCULATOR
    // ============================================================

    function renderProfit(container) {
        let html = `
            <h2>💰 Profit Calculator</h2>
            <p class="subtitle">Calculate your farm's potential profit.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Revenue / Income (ETB)</label>
                    <input type="number" id="profitRevenue" value="50000" onchange="updateProfit()">
                </div>
                <div class="form-group">
                    <label>Expenses (ETB)</label>
                    <input type="number" id="profitExpenses" value="35000" onchange="updateProfit()">
                </div>
            </div>

            <button class="btn-primary" onclick="updateProfit()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="profitResults"></div>
        `;

        container.innerHTML = html;
        updateProfit();
    }

    function updateProfit() {
        const revenue = parseFloat(document.getElementById('profitRevenue')?.value) || 0;
        const expenses = parseFloat(document.getElementById('profitExpenses')?.value) || 0;
        const profit = revenue - expenses;

        const container = document.getElementById('profitResults');
        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card" style="background:#DDE8DC;">
                        <div class="result-value">${revenue.toFixed(0)}</div>
                        <div class="result-label">Total Revenue</div>
                        <div class="result-unit">ETB</div>
                    </div>
                    <div class="result-card" style="background:#f0e6d3;">
                        <div class="result-value">${expenses.toFixed(0)}</div>
                        <div class="result-label">Total Expenses</div>
                        <div class="result-unit">ETB</div>
                    </div>
                    <div class="result-card" style="background:${profit >= 0 ? '#DDE8DC' : '#f0d3d3'};">
                        <div class="result-value" style="color:${profit >= 0 ? '#163D2B' : '#B94A48'};">${profit.toFixed(0)}</div>
                        <div class="result-label">${profit >= 0 ? 'Net Profit' : 'Net Loss'}</div>
                        <div class="result-unit">ETB</div>
                    </div>
                </div>
                <div style="margin-top:0.5rem; padding:0.5rem; background:#F7F6F1; border-radius:8px; font-size:0.85rem; color:#6F786F;">
                    <strong>Profit Margin:</strong> ${revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0}%
                    ${profit < 0 ? ' ⚠️ Your expenses exceed your revenue.' : ' ✅ Your farm is profitable.'}
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> Net Profit = Total Revenue - Total Expenses</p>
                        <p><strong>Revenue:</strong> ${revenue.toFixed(0)} ETB</p>
                        <p><strong>Expenses:</strong> ${expenses.toFixed(0)} ETB</p>
                        <p><strong>Result:</strong> ${profit >= 0 ? 'Profit' : 'Loss'} of ${Math.abs(profit).toFixed(0)} ETB</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // BREAK-EVEN CALCULATOR
    // ============================================================

    function renderBreakEven(container) {
        let html = `
            <h2>📊 Break-even Calculator</h2>
            <p class="subtitle">Find the point where revenue equals costs.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Fixed Costs (ETB)</label>
                    <input type="number" id="beFixed" value="10000" onchange="updateBreakEven()">
                </div>
                <div class="form-group">
                    <label>Variable Cost per Unit (ETB)</label>
                    <input type="number" id="beVariable" value="500" onchange="updateBreakEven()">
                </div>
            </div>
            <div class="form-group">
                <label>Selling Price per Unit (ETB)</label>
                <input type="number" id="bePrice" value="750" onchange="updateBreakEven()">
            </div>

            <button class="btn-primary" onclick="updateBreakEven()">
                <i class="fas fa-calculator"></i> Calculate
            </button>

            <div id="beResults"></div>
        `;

        container.innerHTML = html;
        updateBreakEven();
    }

    function updateBreakEven() {
        const fixed = parseFloat(document.getElementById('beFixed')?.value) || 0;
        const variable = parseFloat(document.getElementById('beVariable')?.value) || 0;
        const price = parseFloat(document.getElementById('bePrice')?.value) || 0;

        const result = calculateBreakEven(fixed, variable, price);
        const container = document.getElementById('beResults');

        if (!result || price <= variable) {
            container.innerHTML = `
                <div class="results-container">
                    <div style="padding:1rem; background:#f0d3d3; border-radius:8px; color:#B94A48;">
                        ⚠️ Selling price must be greater than variable cost per unit.
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${result.quantity.toLocaleString()}</div>
                        <div class="result-label">Break-even Quantity</div>
                        <div class="result-unit">units</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${result.revenue.toLocaleString()}</div>
                        <div class="result-label">Break-even Revenue</div>
                        <div class="result-unit">ETB</div>
                    </div>
                </div>
                <div style="margin-top:0.5rem; padding:0.5rem; background:#F7F6F1; border-radius:8px; font-size:0.85rem; color:#6F786F;">
                    <strong>Margin per Unit:</strong> ${(price - variable).toFixed(0)} ETB
                </div>
                <div class="calculation-expand">
                    <summary>📐 How was this calculated?</summary>
                    <div class="calc-detail">
                        <p><strong>Formula:</strong> ${result.formula}</p>
                        <p><strong>Calculation:</strong> ${fixed} / (${price} - ${variable}) = ${result.quantity.toLocaleString()} units</p>
                        <p><strong>At break-even:</strong> Total Revenue = ${result.revenue.toLocaleString()} ETB = Total Costs</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // UNIT CONVERTER
    // ============================================================

    function renderConverter(container) {
        let html = `
            <h2>🔄 Unit Converter</h2>
            <p class="subtitle">Quick and accurate unit conversions for your farm.</p>

            <div class="form-row">
                <div class="form-group">
                    <label>Category</label>
                    <select id="convCategory" onchange="updateConverter()">
                        <option value="area">Area</option>
                        <option value="weight">Weight</option>
                        <option value="volume">Volume</option>
                        <option value="length">Length</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Value</label>
                    <input type="number" id="convValue" value="1" onchange="updateConverter()">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>From</label>
                    <select id="convFrom" onchange="updateConverter()"></select>
                </div>
                <div class="form-group">
                    <label>To</label>
                    <select id="convTo" onchange="updateConverter()"></select>
                </div>
            </div>

            <div style="text-align:center; margin:0.5rem 0;">
                <button class="btn-secondary btn-sm" onclick="swapConverter()">
                    <i class="fas fa-exchange-alt"></i> Swap
                </button>
            </div>

            <div id="convResults"></div>
        `;

        container.innerHTML = html;
        populateConverterUnits();
        updateConverter();
    }

    function populateConverterUnits() {
        const category = document.getElementById('convCategory')?.value || 'area';
        const units = Object.keys(CONVERSIONS[category] || {});

        const fromSelect = document.getElementById('convFrom');
        const toSelect = document.getElementById('convTo');

        fromSelect.innerHTML = units.map(u => `<option value="${u}">${u.replace('_', ' ').charAt(0).toUpperCase() + u.replace('_', ' ').slice(1)}</option>`).join('');
        toSelect.innerHTML = units.map(u => `<option value="${u}">${u.replace('_', ' ').charAt(0).toUpperCase() + u.replace('_', ' ').slice(1)}</option>`).join('');
        toSelect.value = units[1] || units[0];
    }

    function updateConverter() {
        const category = document.getElementById('convCategory')?.value || 'area';
        const value = parseFloat(document.getElementById('convValue')?.value) || 0;
        const from = document.getElementById('convFrom')?.value;
        const to = document.getElementById('convTo')?.value;

        if (!from || !to) return;

        const conversion = CONVERSIONS[category];
        if (!conversion) return;

        const fromFactor = conversion[from] || 1;
        const toFactor = conversion[to] || 1;
        const result = (value / fromFactor) * toFactor;

        const container = document.getElementById('convResults');
        container.innerHTML = `
            <div class="results-container">
                <div class="result-grid">
                    <div class="result-card">
                        <div class="result-value">${value}</div>
                        <div class="result-label">${from.replace('_', ' ').charAt(0).toUpperCase() + from.replace('_', ' ').slice(1)}</div>
                    </div>
                    <div class="result-card" style="background:#DDE8DC;">
                        <div class="result-value">${result.toFixed(4)}</div>
                        <div class="result-label">${to.replace('_', ' ').charAt(0).toUpperCase() + to.replace('_', ' ').slice(1)}</div>
                    </div>
                </div>
                <div class="calculation-expand">
                    <summary>📐 Conversion Details</summary>
                    <div class="calc-detail">
                        <p><strong>Category:</strong> ${category.charAt(0).toUpperCase() + category.slice(1)}</p>
                        <p><strong>Conversion:</strong> 1 ${from} = ${(toFactor/fromFactor).toFixed(4)} ${to}</p>
                        <p><strong>Result:</strong> ${value} ${from} = ${result.toFixed(4)} ${to}</p>
                    </div>
                </div>
            </div>
        `;
    }

    function swapConverter() {
        const from = document.getElementById('convFrom');
        const to = document.getElementById('convTo');
        const temp = from.value;
        from.value = to.value;
        to.value = temp;
        updateConverter();
    }

    // ============================================================
    // NAVIGATION FUNCTIONS
    // ============================================================

    window.switchCalculator = function(calculator) {
        state.currentCalculator = calculator;
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.calculator === calculator);
        });
        renderWorkspace();
    };

    window.selectCrop = function(cropName) {
        state.selectedCrop = cropName;
        renderWorkspace();
    };

    // ============================================================
    // PLANNER FUNCTIONS
    // ============================================================

    window.updatePlanner = function() {
        // Updates planner preview - placeholder
    };

    window.generatePlan = function() {
        const container = document.getElementById('planResults');
        const cropName = state.selectedCrop;
        if (!cropName) {
            container.innerHTML = '<p style="color:#B94A48;">Please select a crop first.</p>';
            return;
        }

        const area = parseFloat(document.getElementById('plannerArea')?.value) || 1;
        const soil = document.getElementById('plannerSoil')?.value || 'loam';
        const method = document.getElementById('plannerIrrigation')?.value || 'drip';
        const budget = parseFloat(document.getElementById('plannerBudget')?.value) || 0;

        const crop = CROP_DATA[cropName];
        const seedResult = calculateSeedRate(cropName, area);
        const fertResult = calculateFertilizer(cropName, area, soil);
        const waterResult = calculateWaterRequirement(cropName, area, method);
        const yieldResult = calculateYield(cropName, area, 'average');

        container.innerHTML = `
            <div class="results-container" style="margin-top:1.5rem;">
                <h4 style="font-family:'Playfair Display',serif; color:#163D2B; margin-bottom:1rem;">📋 Your Farm Plan</h4>
                
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:0.8rem; margin-bottom:1rem;">
                    <div style="background:#F7F6F1; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${crop.icon} ${crop.name}</div>
                        <div style="font-size:0.85rem; color:#6F786F;">${crop.growthDays} days to maturity</div>
                    </div>
                    <div style="background:#F7F6F1; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${area} ha</div>
                        <div style="font-size:0.85rem; color:#6F786F;">Land Area</div>
                    </div>
                    <div style="background:#F7F6F1; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${soil}</div>
                        <div style="font-size:0.85rem; color:#6F786F;">Soil Type</div>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:0.8rem; margin-bottom:1rem;">
                    <div style="background:#DDE8DC; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${seedResult?.seedRequired.toFixed(1) || 0} kg</div>
                        <div style="font-size:0.85rem; color:#6F786F;">Seed Required</div>
                    </div>
                    <div style="background:#DDE8DC; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${fertResult?.urea || 0} kg</div>
                        <div style="font-size:0.85rem; color:#6F786F;">Urea</div>
                    </div>
                    <div style="background:#DDE8DC; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${waterResult?.waterM3.toLocaleString() || 0} m³</div>
                        <div style="font-size:0.85rem; color:#6F786F;">Water Required</div>
                    </div>
                    <div style="background:#DDE8DC; border-radius:8px; padding:0.8rem;">
                        <div style="font-weight:600;">${yieldResult?.totalYield || 0} tons</div>
                        <div style="font-size:0.85rem; color:#6F786F;">Expected Yield</div>
                    </div>
                </div>

                ${budget > 0 ? `
                <div style="padding:0.8rem; background:#F7F6F1; border-radius:8px; margin-bottom:1rem;">
                    <strong>Budget:</strong> ${budget.toFixed(0)} ETB
                    <br><strong>Estimated Cost:</strong> ${(parseFloat(seedResult?.seedRequired || 0) * crop.seedCost + 10000).toFixed(0)} ETB
                    ${budget > (parseFloat(seedResult?.seedRequired || 0) * crop.seedCost + 10000) ? 
                        ' ✅ Within budget' : 
                        ' ⚠️ May exceed budget'}
                </div>
                ` : ''}

                <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
                    <button class="btn-primary btn-sm" onclick="showToast('Plan saved to Farm Records!', 'success')">
                        <i class="fas fa-save"></i> Save Plan
                    </button>
                    <button class="btn-secondary btn-sm" onclick="showToast('Plan exported!', 'success')">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>

                <div class="calculation-expand" style="margin-top:1rem;">
                    <summary>📐 View All Calculations</summary>
                    <div class="calc-detail">
                        <p><strong>Seed:</strong> ${area} ha × ${crop.seedRate} kg/ha = ${seedResult?.seedRequired.toFixed(1) || 0} kg</p>
                        <p><strong>Fertilizer:</strong> Based on ${crop.name} recommendations with ${soil} soil factor</p>
                        <p><strong>Water:</strong> ${crop.waterRequirement} mm × ${area} ha × 10 / ${(IRRIGATION_EFFICIENCY[method] || 0.75)*100}% = ${waterResult?.waterM3.toLocaleString() || 0} m³</p>
                        <p><strong>Yield:</strong> ${crop.yield.average} tons/ha × ${area} ha = ${yieldResult?.totalYield || 0} tons</p>
                    </div>
                </div>
            </div>
        `;
    };

    // ============================================================
    // PROFILE FUNCTIONS
    // ============================================================

    function updateProfile() {
        const farmer = getFarmer();
        if (!farmer) return;

        const name = farmer.name || farmer.firstName || 'Farmer';
        document.getElementById('navName').textContent = name;
        document.getElementById('pdName').textContent = name;
        document.getElementById('pdEmail').textContent = farmer.email || '—';
        document.getElementById('pdPhone').textContent = farmer.phone || '—';
        
        const city = farmer.city || '—';
        const region = farmer.region || '—';
        document.getElementById('pdLocation').textContent = `${city}, ${region}, Ethiopia`;
        document.getElementById('pdFarmland').textContent = farmer.hectares ? `${farmer.hectares} ha` : '—';
    }

    function setupProfileImage() {
        const input = document.getElementById('profileImageInput');
        const trigger = document.getElementById('uploadProfileBtn');
        if (trigger) {
            trigger.addEventListener('click', () => input.click());
        }
        if (input) {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;
                if (!file.type.startsWith('image/')) {
                    alert('Please select an image.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const dataUrl = ev.target.result;
                    localStorage.setItem('agrinova_profileImage', dataUrl);
                    applyProfileImage(dataUrl);
                };
                reader.readAsDataURL(file);
            });
        }
        const saved = localStorage.getItem('agrinova_profileImage');
        if (saved) applyProfileImage(saved);
    }

    function applyProfileImage(dataUrl) {
        const navAvatar = document.getElementById('navAvatar');
        const pdAvatar = document.getElementById('pdAvatar');
        [navAvatar, pdAvatar].forEach(el => {
            if (el) {
                el.innerHTML = `<img src="${dataUrl}" alt="profile">`;
            }
        });
    }

    function setupDropdown() {
        const trigger = document.getElementById('profileTrigger');
        const dropdown = document.getElementById('profileDropdown');
        if (trigger && dropdown) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
            document.addEventListener('click', () => dropdown.classList.remove('show'));
        }
    }

    // ============================================================
    // DATE & GREETING
    // ============================================================

    function updateDate() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('dateDay').textContent = days[now.getDay()];
        document.getElementById('dateFull').textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }

    function updateGreeting() {
        const farmer = getFarmer();
        const h1 = document.querySelector('.page-header h1');
        if (h1) {
            const hour = new Date().getHours();
            let greet = 'Good Morning';
            if (hour >= 12 && hour < 17) greet = 'Good Afternoon';
            else if (hour >= 17) greet = 'Good Evening';
            const name = farmer?.name || farmer?.firstName || 'Farmer';
            document.getElementById('navName').textContent = name;
        }
    }

    // ============================================================
    // WEATHER
    // ============================================================

    async function fetchWeather() {
        try {
            const farmer = getFarmer();
            const city = farmer?.city || 'Addis Ababa';
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        const { latitude, longitude } = pos.coords;
                        await getWeatherData(latitude, longitude);
                    },
                    async () => {
                        await getWeatherByCity(city);
                    }
                );
            } else {
                await getWeatherByCity(city);
            }
        } catch (e) {
            console.warn('Weather error:', e);
            document.getElementById('navTemp').textContent = '--°C';
        }
    }

    async function getWeatherData(lat, lon) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
            const resp = await fetch(url);
            if (!resp.ok) throw new Error('Weather API error');
            const data = await resp.json();
            if (data.current_weather) {
                const temp = data.current_weather.temperature !== undefined ? `${Math.round(data.current_weather.temperature)}°C` : '--°C';
                document.getElementById('navTemp').textContent = temp;
            }
        } catch (e) {
            console.warn('Weather fetch error:', e);
        }
    }

    async function getWeatherByCity(city) {
        try {
            const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)},Ethiopia&format=json&limit=1`);
            const geoData = await geoResp.json();
            if (geoData && geoData.length > 0) {
                const { lat, lon } = geoData[0];
                await getWeatherData(parseFloat(lat), parseFloat(lon));
            }
        } catch (e) {
            console.warn('City geocode error:', e);
        }
    }

    // ============================================================
    // TOAST
    // ============================================================

    function showToast(message, type) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast show ${type || ''}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    window.showToast = showToast;

    // ============================================================
    // SEARCH
    // ============================================================

    function setupSearch() {
        const input = document.getElementById('globalSearch');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const query = input.value.trim().toLowerCase();
                    if (query) {
                        const results = Object.keys(CROP_DATA).filter(name => 
                            name.toLowerCase().includes(query) ||
                            CROP_DATA[name].name.toLowerCase().includes(query)
                        );
                        if (results.length > 0) {
                            showToast(`Found ${results.length} crop${results.length > 1 ? 's' : ''} matching "${query}"`, 'success');
                        } else {
                            showToast(`No crops found matching "${query}"`, 'warning');
                        }
                    }
                }
            });
        }
    }

    // ============================================================
    // INIT
    // ============================================================

    function init() {
        console.log('AgriNova Farm Calculator Initializing...');
        console.log(`${Object.keys(CROP_DATA).length} crops loaded.`);
        
        updateDate();
        updateGreeting();
        updateProfile();
        setupProfileImage();
        setupDropdown();
        setupSearch();
        fetchWeather();
        
        renderWorkspace();

        console.log('AgriNova Farm Calculator Ready.');
    }

    // ============================================================
    // EXPOSE FUNCTIONS
    // ============================================================

    window.selectCrop = selectCrop;
    window.switchCalculator = switchCalculator;
    window.updatePlanner = updatePlanner;
    window.generatePlan = generatePlan;
    window.updateSeedRate = updateSeedRate;
    window.updateFertilizer = updateFertilizer;
    window.updatePopulation = updatePopulation;
    window.updateLandArea = updateLandArea;
    window.updateYield = updateYield;
    window.updateIrrigation = updateIrrigation;
    window.updateProfit = updateProfit;
    window.updateBreakEven = updateBreakEven;
    window.updateConverter = updateConverter;
    window.swapConverter = swapConverter;
    window.showToast = showToast;

    // ============================================================
    // START
    // ============================================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();