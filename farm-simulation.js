/* ============================================
   AGRINOVA FARM SIMULATION
   farm-simulation.js
   Complete game logic with 2D visual farm
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       1. GAME STATE
       ============================================ */
    const defaultGameState = {
        // Player resources
        money: 10000,
        startingMoney: 10000,
        totalExpenses: 0,
        totalRevenue: 0,
        profit: 0,

        // Farm identity
        farmName: '',
        land: null,
        farmLevel: 1,
        reputation: 0,

        // Inventory
        inventory: {
            seeds: {},
            fertilizer: 0,
            pesticide: 0,
            herbicide: 0,
            tools: 0,
            harvested: 0,
            cleaned: 0,
            packed: 0,
            packaging: 0
        },

        // Crop management
        crop: {
            type: null,
            stage: null,
            daysPlanted: 0,
            growthProgress: 0,
            health: 100,
            waterStatus: 'optimal',
            nutrientStatus: 'adequate',
            pestRisk: 0,
            diseaseRisk: 0,
            weedPressure: 0,
            expectedHarvest: 0,
            plantedCycle: 0
        },

        // Land status
        landPrepared: false,
        landPreparationMethod: null,

        // Market state
        market: {
            currentBuyer: null,
            currentOffer: 0,
            negotiatedOffer: 0,
            finalPrice: 0,
            productQuality: 'fair',
            quantityForSale: 0,
            demand: 0.5,
            lastTransaction: null
        },

        // Time
        day: 1,
        season: 1,
        isPaused: false,

        // Weather
        weather: {
            temperature: 22,
            condition: 'clear',
            rainProbability: 0.1,
            humidity: 55,
            windSpeed: 8
        },

        // Farm expansion
        expansion: {
            landArea: 1,
            availableFields: 1,
            irrigationLevel: 0,
            storageLevel: 0,
            equipmentLevel: 0
        },

        // Events
        currentEvent: 'No current events',
        notifications: [],

        // History
        history: []
    };

    let gameState = null;
    let farmCanvas = null;
    let farmCtx = null;
    let farmerX = 400;
    let farmerY = 300;
    let farmerTargetX = 400;
    let farmerTargetY = 300;
    let farmerMoving = false;

    /* ============================================
       2. DOM REFERENCES
       ============================================ */
    const dom = {};

    function cacheDom() {
        // Setup
        dom.farmSetup = document.getElementById('farm-setup');
        dom.farmNameInput = document.getElementById('farm-name');
        dom.startFarmButton = document.getElementById('start-farm');
        dom.landOptions = document.querySelectorAll('.land-option');
        dom.sizeOptions = document.querySelectorAll('.size-option');
        dom.soilOptions = document.querySelectorAll('.soil-option');
        dom.startingBudget = document.getElementById('starting-budget');

        // Simulation stage
        dom.simulationStage = document.getElementById('simulation-stage');
        dom.farmWorld = document.getElementById('farm-world');
        dom.farmLoading = document.getElementById('farm-loading');

        // HUD
        dom.currentDay = document.getElementById('current-day');
        dom.currentSeason = document.getElementById('current-season');
        dom.playerMoney = document.getElementById('player-money');

        // Weather
        dom.temperature = document.getElementById('temperature');
        dom.weatherCondition = document.getElementById('weather-condition');
        dom.rainProbability = document.getElementById('rain-probability');
        dom.humidity = document.getElementById('humidity');
        dom.windSpeed = document.getElementById('wind-speed');

        // Farm info
        dom.infoFarmName = document.getElementById('info-farm-name');
        dom.infoLandType = document.getElementById('info-land-type');
        dom.infoSoilType = document.getElementById('info-soil-type');
        dom.infoCurrentCrop = document.getElementById('info-current-crop');
        dom.infoGrowthStage = document.getElementById('info-growth-stage');
        dom.infoCropHealth = document.getElementById('info-crop-health');
        dom.infoSoilMoisture = document.getElementById('info-soil-moisture');

        // Farmer
        dom.farmerStatus = document.getElementById('farmer-status');
        dom.farmerContainer = document.getElementById('farmer-container');

        // Interaction panel
        dom.interactionPanel = document.getElementById('interaction-panel');
        dom.prepareLandBtn = document.getElementById('prepare-land');
        dom.sowCropBtn = document.getElementById('sow-crop');
        dom.waterCropBtn = document.getElementById('water-crop');
        dom.fertilizeCropBtn = document.getElementById('fertilize-crop');
        dom.weedFieldBtn = document.getElementById('weed-field');
        dom.inspectCropBtn = document.getElementById('inspect-crop');
        dom.applyPesticideBtn = document.getElementById('apply-pesticide');
        dom.applyHerbicideBtn = document.getElementById('apply-herbicide');
        dom.harvestCropBtn = document.getElementById('harvest-crop');
        dom.washCropBtn = document.getElementById('wash-crop');
        dom.packCropBtn = document.getElementById('pack-crop');
        dom.transportCropBtn = document.getElementById('transport-crop');

        // Land preparation
        dom.landPrepPanel = document.getElementById('land-preparation-panel');
        dom.manualPrepBtn = document.getElementById('manual-preparation');
        dom.oxPloughBtn = document.getElementById('ox-plough');
        dom.tractorPrepBtn = document.getElementById('tractor-preparation');

        // Seed shop
        dom.seedShop = document.getElementById('seed-shop');
        dom.seedItems = document.querySelectorAll('#seed-shop .seed-list li');
        dom.buySeedButtons = document.querySelectorAll('.buy-seed');
        dom.negotiateSeedButtons = document.querySelectorAll('.negotiate-seed');

        // Negotiation panel
        dom.negotiationPanel = document.getElementById('negotiation-panel');
        dom.negotiationParty = document.getElementById('negotiation-party');
        dom.negotiationProduct = document.getElementById('negotiation-product');
        dom.negotiationOffer = document.getElementById('negotiation-offer');
        dom.negotiationQty = document.getElementById('negotiation-qty');
        dom.acceptOfferBtn = document.getElementById('accept-offer');
        dom.counterOfferBtn = document.getElementById('counter-offer');
        dom.declineOfferBtn = document.getElementById('decline-offer');
        dom.anotherOfferBtn = document.getElementById('another-offer');

        // Inventory
        dom.inventoryPanel = document.getElementById('inventory-panel');
        dom.invSeeds = document.getElementById('inv-seeds');
        dom.invFertilizer = document.getElementById('inv-fertilizer');
        dom.invPesticide = document.getElementById('inv-pesticide');
        dom.invHerbicide = document.getElementById('inv-herbicide');
        dom.invTools = document.getElementById('inv-tools');
        dom.invHarvested = document.getElementById('inv-harvested');
        dom.invPackaging = document.getElementById('inv-packaging');

        // Crop status
        dom.cropStatusPanel = document.getElementById('crop-status-panel');
        dom.cropName = document.getElementById('crop-name');
        dom.cropStage = document.getElementById('crop-stage');
        dom.cropDays = document.getElementById('crop-days');
        dom.cropHealth = document.getElementById('crop-health');
        dom.cropWater = document.getElementById('crop-water');
        dom.cropNutrient = document.getElementById('crop-nutrient');
        dom.cropPest = document.getElementById('crop-pest');
        dom.cropDisease = document.getElementById('crop-disease');
        dom.cropHarvestStatus = document.getElementById('crop-harvest-status');

        // Post-harvest
        dom.postHarvestPanel = document.getElementById('post-harvest-panel');
        dom.actionHarvest = document.getElementById('action-harvest');
        dom.actionWash = document.getElementById('action-wash');
        dom.actionGrade = document.getElementById('action-grade');
        dom.actionPack = document.getElementById('action-pack');
        dom.actionStore = document.getElementById('action-store');
        dom.actionTransport = document.getElementById('action-transport');
        dom.actionSell = document.getElementById('action-sell');

        // Market
        dom.marketPanel = document.getElementById('market-panel');
        dom.marketCrop = document.getElementById('market-crop');
        dom.marketQty = document.getElementById('market-qty');
        dom.marketQuality = document.getElementById('market-quality');
        dom.marketOffer = document.getElementById('market-offer');
        dom.marketNegotiated = document.getElementById('market-negotiated');
        dom.marketFinal = document.getElementById('market-final');
        dom.marketRevenue = document.getElementById('market-revenue');
        dom.marketSellBtn = document.getElementById('market-sell');
        dom.marketNegotiateBtn = document.getElementById('market-negotiate');
        dom.marketFindBuyerBtn = document.getElementById('market-find-buyer');

        // Financial
        dom.financialPanel = document.getElementById('financial-panel');
        dom.finStarting = document.getElementById('fin-starting');
        dom.finExpenses = document.getElementById('fin-expenses');
        dom.finRevenue = document.getElementById('fin-revenue');
        dom.finBalance = document.getElementById('fin-balance');
        dom.finProfit = document.getElementById('fin-profit');

        // Time controls
        dom.timeControls = document.getElementById('time-controls');
        dom.advance1Day = document.getElementById('advance-1-day');
        dom.advance3Days = document.getElementById('advance-3-days');
        dom.advance7Days = document.getElementById('advance-7-days');
        dom.pauseSimBtn = document.getElementById('pause-sim');

        // Farm progression
        dom.farmProgression = document.getElementById('farm-progression');
        dom.progressLevel = document.getElementById('progress-level');
        dom.progressLand = document.getElementById('progress-land');
        dom.progressFields = document.getElementById('progress-fields');
        dom.progressIrrigation = document.getElementById('progress-irrigation');
        dom.progressStorage = document.getElementById('progress-storage');
        dom.progressEquipment = document.getElementById('progress-equipment');
        dom.expandFarmBtn = document.getElementById('expand-farm');

        // Events
        dom.eventNotification = document.getElementById('event-notification');
        dom.eventMessage = document.getElementById('event-message');

        // Learning
        dom.learningPanel = document.getElementById('learning-panel');
        dom.learningContent = document.getElementById('learning-content');
        dom.learnMoreBtn = document.getElementById('learn-more');

        // Save/Load
        dom.saveLoadControls = document.getElementById('save-load-controls');
        dom.saveFarmBtn = document.getElementById('save-farm');
        dom.loadFarmBtn = document.getElementById('load-farm');
        dom.resetFarmBtn = document.getElementById('reset-farm');
    }

    /* ============================================
       3. LAND DEFINITIONS
       ============================================ */
    const landTypes = {
        highland: {
            id: 'highland',
            name: 'Highland',
            baseFertility: 70,
            baseMoisture: 60,
            waterAvailability: 0.7,
            cropSuitability: ['wheat', 'barley', 'potato'],
            cost: 0,
            description: 'Cool climate highland area with moderate fertility.',
            color: '#4a7c59'
        },
        lowland: {
            id: 'lowland',
            name: 'Lowland',
            baseFertility: 60,
            baseMoisture: 75,
            waterAvailability: 0.9,
            cropSuitability: ['maize', 'sorghum', 'teff'],
            cost: 0,
            description: 'Warm lowland area with good water access.',
            color: '#5a8c5a'
        },
        dryland: {
            id: 'dryland',
            name: 'Dryland',
            baseFertility: 50,
            baseMoisture: 30,
            waterAvailability: 0.3,
            cropSuitability: ['sorghum', 'teff'],
            cost: 0,
            description: 'Arid dryland area requiring careful water management.',
            color: '#8b7355'
        }
    };

    const soilTypes = {
        loam: { id: 'loam', name: 'Loam', fertilityBonus: 10, moistureRetention: 0.8, color: '#3d2b1f' },
        clay: { id: 'clay', name: 'Clay', fertilityBonus: 5, moistureRetention: 0.9, color: '#4a3728' },
        sandy: { id: 'sandy', name: 'Sandy', fertilityBonus: 0, moistureRetention: 0.4, color: '#c2b280' }
    };

    const farmSizes = {
        small: { id: 'small', name: 'Small', area: 1, cost: 0, seedMultiplier: 1 },
        medium: { id: 'medium', name: 'Medium', area: 2, cost: 2000, seedMultiplier: 2 },
        large: { id: 'large', name: 'Large', area: 3, cost: 5000, seedMultiplier: 3 }
    };

    /* ============================================
       4. CROP DEFINITIONS
       ============================================ */
    const cropTypes = {
        maize: {
            id: 'maize',
            name: 'Maize',
            pricePerSeed: 8,
            growthDuration: 28,
            waterRequirement: 0.6,
            fertilityRequirement: 0.5,
            baseYield: 120,
            basePrice: 15,
            stages: ['sown', 'germination', 'seedling', 'vegetative', 'flowering', 'grain_fill', 'mature'],
            color: '#90ee90'
        },
        wheat: {
            id: 'wheat',
            name: 'Wheat',
            pricePerSeed: 6,
            growthDuration: 24,
            waterRequirement: 0.5,
            fertilityRequirement: 0.6,
            baseYield: 100,
            basePrice: 18,
            stages: ['sown', 'germination', 'seedling', 'vegetative', 'flowering', 'grain_fill', 'mature'],
            color: '#daa520'
        },
        teff: {
            id: 'teff',
            name: 'Teff',
            pricePerSeed: 5,
            growthDuration: 21,
            waterRequirement: 0.4,
            fertilityRequirement: 0.4,
            baseYield: 80,
            basePrice: 22,
            stages: ['sown', 'germination', 'seedling', 'vegetative', 'flowering', 'mature'],
            color: '#8fbc8f'
        },
        barley: {
            id: 'barley',
            name: 'Barley',
            pricePerSeed: 5,
            growthDuration: 22,
            waterRequirement: 0.5,
            fertilityRequirement: 0.5,
            baseYield: 90,
            basePrice: 20,
            stages: ['sown', 'germination', 'seedling', 'vegetative', 'flowering', 'grain_fill', 'mature'],
            color: '#f0e68c'
        },
        sorghum: {
            id: 'sorghum',
            name: 'Sorghum',
            pricePerSeed: 4,
            growthDuration: 20,
            waterRequirement: 0.3,
            fertilityRequirement: 0.4,
            baseYield: 110,
            basePrice: 14,
            stages: ['sown', 'germination', 'seedling', 'vegetative', 'flowering', 'mature'],
            color: '#b8860b'
        },
        potato: {
            id: 'potato',
            name: 'Potato',
            pricePerSeed: 12,
            growthDuration: 30,
            waterRequirement: 0.7,
            fertilityRequirement: 0.7,
            baseYield: 150,
            basePrice: 12,
            stages: ['sown', 'germination', 'seedling', 'vegetative', 'flowering', 'mature'],
            color: '#d2b48c'
        }
    };

    /* ============================================
       5. FARM VISUALIZATION (2D Canvas)
       ============================================ */
    function initFarmVisualization() {
        // Create canvas for farm visualization
        farmCanvas = document.createElement('canvas');
        farmCanvas.id = 'farm-canvas';
        farmCanvas.style.position = 'absolute';
        farmCanvas.style.top = '0';
        farmCanvas.style.left = '0';
        farmCanvas.style.width = '100%';
        farmCanvas.style.height = '100%';
        farmCanvas.style.zIndex = '1';
        
        dom.farmWorld.appendChild(farmCanvas);
        farmCtx = farmCanvas.getContext('2d');
        
        // Set canvas size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Start animation loop
        animateFarm();
    }

    function resizeCanvas() {
        if (farmCanvas) {
            farmCanvas.width = dom.farmWorld.clientWidth;
            farmCanvas.height = dom.farmWorld.clientHeight;
        }
    }

    function animateFarm() {
        if (!farmCtx || !farmCanvas) return;
        
        // Move farmer
        if (farmerMoving) {
            const dx = farmerTargetX - farmerX;
            const dy = farmerTargetY - farmerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 5) {
                farmerX += dx * 0.05;
                farmerY += dy * 0.05;
            } else {
                farmerMoving = false;
                farmerX = farmerTargetX;
                farmerY = farmerTargetY;
            }
        }
        
        drawFarm();
        requestAnimationFrame(animateFarm);
    }

    function drawFarm() {
        if (!farmCtx || !gameState || !gameState.land) return;
        
        const ctx = farmCtx;
        const width = farmCanvas.width;
        const height = farmCanvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw sky based on weather
        drawSky(ctx, width, height);
        
        // Draw ground/field
        drawField(ctx, width, height);
        
        // Draw crops
        drawCrops(ctx, width, height);
        
        // Draw farmer
        drawFarmer(ctx);
        
        // Draw farm name
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(gameState.farmName, width / 2, 50);
    }

    function drawSky(ctx, width, height) {
        let skyColor = '#87ceeb'; // Clear sky
        if (gameState.weather.condition === 'cloudy') {
            skyColor = '#708090';
        } else if (gameState.weather.condition === 'rainy') {
            skyColor = '#4682b4';
        } else if (gameState.weather.condition === 'light_rain') {
            skyColor = '#5f9ea0';
        } else if (gameState.weather.condition === 'windy') {
            skyColor = '#b0c4de';
        }
        
        ctx.fillStyle = skyColor;
        ctx.fillRect(0, 0, width, height * 0.3);
        
        // Draw sun or clouds
        if (gameState.weather.condition === 'clear') {
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(width * 0.8, height * 0.1, 30, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawField(ctx, width, height) {
        const soilColor = soilTypes[gameState.land.soilType.toLowerCase()]?.color || '#3d2b1f';
        
        // Draw field
        ctx.fillStyle = soilColor;
        ctx.fillRect(width * 0.1, height * 0.3, width * 0.8, height * 0.6);
        
        // Draw rows if land is prepared
        if (gameState.landPrepared) {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 10; i++) {
                const y = height * 0.35 + i * (height * 0.5 / 10);
                ctx.beginPath();
                ctx.moveTo(width * 0.15, y);
                ctx.lineTo(width * 0.85, y);
                ctx.stroke();
            }
        }
    }

    function drawCrops(ctx, width, height) {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') return;
        
        const crop = cropTypes[gameState.crop.type];
        const stageIndex = crop.stages.indexOf(gameState.crop.stage);
        const stageProgress = stageIndex / (crop.stages.length - 1);
        
        // Draw crops based on stage
        const cropColor = crop.color;
        const cropHeight = 20 + stageProgress * 80;
        
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 8; col++) {
                const x = width * 0.2 + col * (width * 0.6 / 8);
                const y = height * 0.4 + row * (height * 0.4 / 5);
                
                ctx.fillStyle = cropColor;
                ctx.fillRect(x, y - cropHeight, 5, cropHeight);
                
                // Draw leaves for more mature crops
                if (stageProgress > 0.3) {
                    ctx.fillStyle = '#228b22';
                    ctx.beginPath();
                    ctx.ellipse(x + 2.5, y - cropHeight * 0.5, 8, 3, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }

    function drawFarmer(ctx) {
        // Draw farmer character
        ctx.fillStyle = '#0000ff';
        ctx.beginPath();
        ctx.arc(farmerX, farmerY, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw farmer body
        ctx.fillStyle = '#654321';
        ctx.fillRect(farmerX - 4, farmerY - 2, 8, 15);
        
        // Draw hat
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.arc(farmerX, farmerY - 8, 6, Math.PI, 0);
        ctx.fill();
    }

    function moveFarmerTo(x, y) {
        farmerTargetX = x;
        farmerTargetY = y;
        farmerMoving = true;
    }

    /* ============================================
       6. INITIALIZATION
       ============================================ */
    function init() {
        cacheDom();
        loadGameState();
        bindEvents();
        
        if (gameState && gameState.land) {
            dom.farmSetup.style.display = 'none';
            dom.simulationStage.hidden = false;
            hideLoading();
            initFarmVisualization();
        } else {
            dom.simulationStage.hidden = true;
        }
        
        updateUI();
    }

    function bindEvents() {
        // Setup
        dom.startFarmButton.addEventListener('click', handleStartFarm);
        dom.landOptions.forEach(btn => btn.addEventListener('click', handleLandSelection));
        dom.sizeOptions.forEach(btn => btn.addEventListener('click', handleSizeSelection));
        dom.soilOptions.forEach(btn => btn.addEventListener('click', handleSoilSelection));

        // Time controls
        dom.advance1Day.addEventListener('click', () => advanceTime(1));
        dom.advance3Days.addEventListener('click', () => advanceTime(3));
        dom.advance7Days.addEventListener('click', () => advanceTime(7));
        dom.pauseSimBtn.addEventListener('click', togglePause);

        // Actions
        dom.prepareLandBtn.addEventListener('click', () => showLandPrepPanel());
        dom.sowCropBtn.addEventListener('click', handleSow);
        dom.waterCropBtn.addEventListener('click', handleWater);
        dom.fertilizeCropBtn.addEventListener('click', handleFertilize);
        dom.weedFieldBtn.addEventListener('click', handleWeed);
        dom.inspectCropBtn.addEventListener('click', handleInspect);
        dom.applyPesticideBtn.addEventListener('click', handlePesticide);
        dom.applyHerbicideBtn.addEventListener('click', handleHerbicide);
        dom.harvestCropBtn.addEventListener('click', handleHarvest);
        dom.washCropBtn.addEventListener('click', handleWash);
        dom.packCropBtn.addEventListener('click', handlePack);
        dom.transportCropBtn.addEventListener('click', handleTransport);

        // Land preparation methods
        dom.manualPrepBtn.addEventListener('click', () => handleLandPreparation('manual'));
        dom.oxPloughBtn.addEventListener('click', () => handleLandPreparation('ox'));
        dom.tractorPrepBtn.addEventListener('click', () => handleLandPreparation('tractor'));

        // Seed shop
        dom.buySeedButtons.forEach(btn => btn.addEventListener('click', handleBuySeed));
        dom.negotiateSeedButtons.forEach(btn => btn.addEventListener('click', handleNegotiateSeed));

        // Negotiation panel
        dom.acceptOfferBtn.addEventListener('click', handleAcceptOffer);
        dom.counterOfferBtn.addEventListener('click', handleCounterOffer);
        dom.declineOfferBtn.addEventListener('click', handleDeclineOffer);
        dom.anotherOfferBtn.addEventListener('click', handleAnotherOffer);

        // Market
        dom.marketSellBtn.addEventListener('click', handleMarketSell);
        dom.marketNegotiateBtn.addEventListener('click', handleMarketNegotiate);
        dom.marketFindBuyerBtn.addEventListener('click', handleFindBuyer);

        // Post-harvest actions
        dom.actionHarvest.addEventListener('click', handleHarvest);
        dom.actionWash.addEventListener('click', handleWash);
        dom.actionGrade.addEventListener('click', handleGrade);
        dom.actionPack.addEventListener('click', handlePack);
        dom.actionStore.addEventListener('click', handleStore);
        dom.actionTransport.addEventListener('click', handleTransport);
        dom.actionSell.addEventListener('click', handleTransport);

        // Progression
        dom.expandFarmBtn.addEventListener('click', handleExpandFarm);

        // Learning
        dom.learnMoreBtn.addEventListener('click', handleLearnMore);

        // Save/Load
        dom.saveFarmBtn.addEventListener('click', saveGame);
        dom.loadFarmBtn.addEventListener('click', loadGame);
        dom.resetFarmBtn.addEventListener('click', resetGame);
    }

    /* ============================================
       7. LAND SELECTION
       ============================================ */
    let selectedLand = null;
    let selectedSize = 'small';
    let selectedSoil = 'loam';

    function handleLandSelection(e) {
        const btn = e.currentTarget;
        const landId = btn.dataset.landType;
        
        dom.landOptions.forEach(b => b.setAttribute('aria-checked', 'false'));
        btn.setAttribute('aria-checked', 'true');
        
        selectedLand = landId;
        updateSetupInfo();
    }

    function handleSizeSelection(e) {
        const btn = e.currentTarget;
        selectedSize = btn.dataset.farmSize;
        
        dom.sizeOptions.forEach(b => b.setAttribute('aria-checked', 'false'));
        btn.setAttribute('aria-checked', 'true');
        
        updateSetupInfo();
    }

    function handleSoilSelection(e) {
        const btn = e.currentTarget;
        selectedSoil = btn.dataset.soilType;
        
        dom.soilOptions.forEach(b => b.setAttribute('aria-checked', 'false'));
        btn.setAttribute('aria-checked', 'true');
        
        updateSetupInfo();
    }

    function updateSetupInfo() {
        // Just update the budget display for now
        dom.startingBudget.textContent = '10,000';
    }

    function handleStartFarm() {
        const farmName = dom.farmNameInput.value.trim() || 'My Farm';
        
        if (!selectedLand) {
            showNotification('Please select a land type first.');
            return;
        }
        
        const size = farmSizes[selectedSize];
        const soil = soilTypes[selectedSoil];
        const land = landTypes[selectedLand];
        
        if (size.cost > gameState.money) {
            showNotification('Insufficient funds to purchase this land size.');
            return;
        }
        
        gameState.farmName = farmName;
        gameState.land = {
            id: land.id,
            name: land.name,
            size: size.name,
            area: size.area,
            soilType: soil.name,
            soilQuality: land.baseFertility + soil.fertilityBonus,
            waterAvailability: land.waterAvailability,
            fertility: land.baseFertility + soil.fertilityBonus,
            moisture: land.baseMoisture * soil.moistureRetention,
            cropSuitability: land.cropSuitability,
            cost: size.cost
        };
        
        gameState.money -= size.cost;
        gameState.totalExpenses += size.cost;
        
        dom.farmSetup.style.display = 'none';
        dom.simulationStage.hidden = false;
        hideLoading();
        
        // Initialize farm visualization
        initFarmVisualization();
        
        // Set farmer position
        farmerX = farmCanvas ? farmCanvas.width * 0.5 : 400;
        farmerY = farmCanvas ? farmCanvas.height * 0.6 : 300;
        
        updateUI();
        showNotification(`Farm "${farmName}" started on ${land.name} land.`);
        saveGame();
    }

    /* ============================================
       8. SEED SHOP & NEGOTIATION
       ============================================ */
    let negotiationState = null;

    function handleBuySeed(e) {
        const li = e.currentTarget.closest('li');
        const cropId = li.dataset.crop;
        const crop = cropTypes[cropId];
        
        if (!crop) return;
        
        const price = crop.pricePerSeed;
        const quantity = 10;
        
        if (gameState.money < price * quantity) {
            showNotification('Insufficient funds to buy seeds.');
            return;
        }
        
        gameState.money -= price * quantity;
        gameState.totalExpenses += price * quantity;
        
        if (!gameState.inventory.seeds[cropId]) {
            gameState.inventory.seeds[cropId] = 0;
        }
        gameState.inventory.seeds[cropId] += quantity;
        
        showNotification(`Purchased ${quantity} ${crop.name} seeds.`);
        updateUI();
        saveGame();
    }

    function handleNegotiateSeed(e) {
        const li = e.currentTarget.closest('li');
        const cropId = li.dataset.crop;
        const crop = cropTypes[cropId];
        
        if (!crop) return;
        
        negotiationState = {
            type: 'buy',
            cropId: cropId,
            cropName: crop.name,
            price: crop.pricePerSeed,
            quantity: 10,
            seller: 'Seed Vendor',
            attempts: 0,
            maxAttempts: 3
        };
        
        dom.negotiationParty.textContent = negotiationState.seller;
        dom.negotiationProduct.textContent = `${crop.name} seeds`;
        dom.negotiationOffer.textContent = `${negotiationState.price} ETB per seed`;
        dom.negotiationQty.textContent = negotiationState.quantity;
        
        dom.negotiationPanel.hidden = false;
    }

    function handleAcceptOffer() {
        if (!negotiationState) return;
        
        const totalCost = negotiationState.price * negotiationState.quantity;
        
        if (gameState.money < totalCost) {
            showNotification('Insufficient funds.');
            dom.negotiationPanel.hidden = true;
            negotiationState = null;
            return;
        }
        
        gameState.money -= totalCost;
        gameState.totalExpenses += totalCost;
        
        if (!gameState.inventory.seeds[negotiationState.cropId]) {
            gameState.inventory.seeds[negotiationState.cropId] = 0;
        }
        gameState.inventory.seeds[negotiationState.cropId] += negotiationState.quantity;
        
        showNotification(`Negotiation accepted. Purchased ${negotiationState.quantity} ${negotiationState.cropName} seeds.`);
        dom.negotiationPanel.hidden = true;
        negotiationState = null;
        updateUI();
        saveGame();
    }

    function handleCounterOffer() {
        if (!negotiationState) return;
        
        negotiationState.attempts++;
        
        if (negotiationState.attempts >= negotiationState.maxAttempts) {
            showNotification('Seller refuses further negotiation.');
            dom.negotiationPanel.hidden = true;
            negotiationState = null;
            return;
        }
        
        const discount = 0.9 - (negotiationState.attempts * 0.03) - (gameState.reputation * 0.001);
        negotiationState.price = Math.max(1, Math.floor(negotiationState.price * Math.max(0.7, discount)));
        
        dom.negotiationOffer.textContent = `${negotiationState.price} ETB per seed`;
        showNotification(`Seller counter-offers: ${negotiationState.price} ETB per seed.`);
    }

    function handleDeclineOffer() {
        showNotification('Negotiation declined.');
        dom.negotiationPanel.hidden = true;
        negotiationState = null;
    }

    function handleAnotherOffer() {
        if (!negotiationState) return;
        
        negotiationState.attempts++;
        
        if (negotiationState.attempts >= negotiationState.maxAttempts) {
            showNotification('No other offers available.');
            dom.negotiationPanel.hidden = true;
            negotiationState = null;
            return;
        }
        
        negotiationState.price = Math.floor(negotiationState.price * (1.05 + Math.random() * 0.1));
        dom.negotiationOffer.textContent = `${negotiationState.price} ETB per seed`;
        showNotification(`Another offer: ${negotiationState.price} ETB per seed.`);
    }

    /* ============================================
       9. LAND PREPARATION
       ============================================ */
    function showLandPrepPanel() {
        if (!gameState.land) {
            showNotification('No land selected.');
            return;
        }
        
        if (gameState.landPrepared) {
            showNotification('Land is already prepared.');
            return;
        }
        
        dom.landPrepPanel.hidden = false;
    }

    function handleLandPreparation(method) {
        if (!gameState.land) {
            showNotification('No land selected.');
            return;
        }
        
        if (gameState.landPrepared) {
            showNotification('Land is already prepared.');
            dom.landPrepPanel.hidden = true;
            return;
        }
        
        let cost = 0;
        let time = 0;
        
        switch(method) {
            case 'manual':
                cost = 100;
                time = 2;
                gameState.landPreparationMethod = 'manual';
                break;
            case 'ox':
                cost = 300;
                time = 1;
                gameState.landPreparationMethod = 'ox';
                break;
            case 'tractor':
                cost = 800;
                time = 0.5;
                gameState.landPreparationMethod = 'tractor';
                break;
            default:
                return;
        }
        
        if (gameState.money < cost) {
            showNotification('Insufficient funds for land preparation.');
            return;
        }
        
        gameState.money -= cost;
        gameState.totalExpenses += cost;
        
        gameState.landPrepared = true;
        gameState.land.fertility += 5;
        
        // Move farmer to field
        if (farmCanvas) {
            moveFarmerTo(farmCanvas.width * 0.3, farmCanvas.height * 0.5);
        }
        
        advanceTime(time);
        
        dom.landPrepPanel.hidden = true;
        showNotification(`Land prepared using ${method} method.`);
        updateUI();
        saveGame();
    }

    /* ============================================
       10. SOWING / PLANTING
       ============================================ */
    function handleSow() {
        if (!gameState.land) {
            showNotification('No land selected.');
            return;
        }
        
        if (!gameState.landPrepared) {
            showNotification('Prepare the land before sowing.');
            return;
        }
        
        if (gameState.crop.type && gameState.crop.stage && gameState.crop.stage !== 'harvested') {
            showNotification('Crop is already growing.');
            return;
        }
        
        const availableSeeds = Object.keys(gameState.inventory.seeds).filter(cropId => 
            gameState.inventory.seeds[cropId] > 0 && 
            gameState.land.cropSuitability.includes(cropId)
        );
        
        if (availableSeeds.length === 0) {
            showNotification('No suitable seeds available. Visit the seed shop.');
            return;
        }
        
        const cropId = availableSeeds[0];
        const crop = cropTypes[cropId];
        
        gameState.inventory.seeds[cropId]--;
        
        gameState.crop.type = cropId;
        gameState.crop.stage = 'sown';
        gameState.crop.daysPlanted = 0;
        gameState.crop.growthProgress = 0;
        gameState.crop.health = 100;
        gameState.crop.pestRisk = 0;
        gameState.crop.diseaseRisk = 0;
        gameState.crop.weedPressure = 0;
        gameState.crop.plantedCycle++;
        
        // Move farmer to field
        if (farmCanvas) {
            moveFarmerTo(farmCanvas.width * 0.4, farmCanvas.height * 0.5);
        }
        
        advanceTime(1);
        
        updateUI();
        showNotification(`${crop.name} seeds sown successfully.`);
        saveGame();
    }

    /* ============================================
       11. TIME SYSTEM
       ============================================ */
    function advanceTime(days) {
        if (gameState.isPaused) {
            showNotification('Simulation is paused.');
            return;
        }
        
        for (let i = 0; i < days; i++) {
            gameState.day++;
            
            if (gameState.day > 30) {
                gameState.day = 1;
                gameState.season++;
                if (gameState.season > 4) gameState.season = 1;
            }
            
            if (gameState.crop.type && gameState.crop.stage && gameState.crop.stage !== 'harvested') {
                growCrop();
            }
            
            updateWeather();
            
            if (gameState.land) {
                gameState.land.moisture = Math.max(0, gameState.land.moisture - 3);
                
                if (gameState.crop.type && gameState.crop.stage && gameState.crop.stage !== 'harvested') {
                    if (gameState.land.moisture < 20) {
                        gameState.crop.health -= 5;
                        gameState.crop.waterStatus = 'dry';
                    } else if (gameState.land.moisture > 80) {
                        gameState.crop.health -= 2;
                        gameState.crop.waterStatus = 'wet';
                    } else {
                        gameState.crop.waterStatus = 'optimal';
                    }
                }
            }
            
            if (gameState.crop.type && gameState.crop.stage && gameState.crop.stage !== 'harvested') {
                if (Math.random() < 0.08 && gameState.crop.pestRisk < 50) {
                    gameState.crop.pestRisk += 10 + Math.floor(Math.random() * 20);
                    showNotification('Pest pressure increasing. Consider inspection.');
                }
                if (Math.random() < 0.06 && gameState.crop.diseaseRisk < 50) {
                    gameState.crop.diseaseRisk += 8 + Math.floor(Math.random() * 15);
                    showNotification('Disease risk detected. Consider inspection.');
                }
                if (Math.random() < 0.1) {
                    gameState.crop.weedPressure += 5;
                }
            }
            
            updateCropHealth();
        }
        
        updateUI();
        saveGame();
    }

    function togglePause() {
        gameState.isPaused = !gameState.isPaused;
        dom.pauseSimBtn.textContent = gameState.isPaused ? 'Resume' : 'Pause';
        showNotification(gameState.isPaused ? 'Simulation paused.' : 'Simulation resumed.');
    }

    /* ============================================
       12. CROP GROWTH SYSTEM
       ============================================ */
    function growCrop() {
        const cropId = gameState.crop.type;
        const crop = cropTypes[cropId];
        
        if (!crop) return;
        
        gameState.crop.daysPlanted++;
        
        let growthRate = 1;
        
        if (gameState.land.moisture < 30) {
            growthRate *= 0.5;
        } else if (gameState.land.moisture > 70) {
            growthRate *= 0.8;
        }
        
        if (gameState.land.fertility < 30) {
            growthRate *= 0.6;
        } else if (gameState.land.fertility > 70) {
            growthRate *= 1.2;
        }
        
        if (gameState.crop.health < 50) {
            growthRate *= 0.5;
        } else if (gameState.crop.health > 80) {
            growthRate *= 1.1;
        }
        
        if (gameState.crop.pestRisk > 40) growthRate *= 0.7;
        if (gameState.crop.diseaseRisk > 40) growthRate *= 0.7;
        
        gameState.crop.growthProgress += growthRate * (100 / crop.growthDuration);
        
        const progress = gameState.crop.growthProgress;
        const stages = crop.stages;
        const stageIndex = Math.min(
            Math.floor((progress / 100) * stages.length),
            stages.length - 1
        );
        
        gameState.crop.stage = stages[stageIndex];
        
        if (progress >= 100) {
            gameState.crop.stage = 'mature';
            gameState.crop.expectedHarvest = Math.floor(
                crop.baseYield * 
                (gameState.crop.health / 100) * 
                (gameState.land.fertility / 50) *
                (gameState.land.area || 1)
            );
        }
    }

    function updateCropHealth() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') return;
        
        gameState.crop.health = Math.max(0, Math.min(100, gameState.crop.health + 0.5));
        
        if (gameState.land.moisture < 20) gameState.crop.health -= 3;
        if (gameState.land.moisture > 80) gameState.crop.health -= 1;
        if (gameState.land.fertility < 30) gameState.crop.health -= 1;
        if (gameState.crop.pestRisk > 50) gameState.crop.health -= 3;
        if (gameState.crop.diseaseRisk > 50) gameState.crop.health -= 3;
        if (gameState.crop.weedPressure > 60) gameState.crop.health -= 2;
        
        gameState.crop.health = Math.max(0, Math.min(100, gameState.crop.health));
    }

    /* ============================================
       13. WATER & FERTILIZER
       ============================================ */
    function handleWater() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') {
            showNotification('No growing crop to water.');
            return;
        }
        
        if (gameState.land.moisture >= 90) {
            showNotification('Soil moisture is already adequate.');
            return;
        }
        
        gameState.land.moisture = Math.min(100, gameState.land.moisture + 25);
        
        gameState.money -= 20;
        gameState.totalExpenses += 20;
        
        // Move farmer
        if (farmCanvas) {
            moveFarmerTo(farmCanvas.width * 0.5, farmCanvas.height * 0.5);
        }
        
        advanceTime(0);
        showNotification('Crop watered.');
        updateUI();
    }

    function handleFertilize() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') {
            showNotification('No growing crop to fertilize.');
            return;
        }
        
        if (gameState.inventory.fertilizer <= 0) {
            showNotification('No fertilizer available. Buy some from the market.');
            return;
        }
        
        gameState.inventory.fertilizer--;
        gameState.land.fertility = Math.min(100, gameState.land.fertility + 15);
        
        gameState.money -= 50;
        gameState.totalExpenses += 50;
        
        advanceTime(0);
        showNotification('Fertilizer applied. Soil fertility improved.');
        updateUI();
    }

    function handleWeed() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') {
            showNotification('No growing crop to weed.');
            return;
        }
        
        gameState.crop.weedPressure = Math.max(0, gameState.crop.weedPressure - 30);
        gameState.crop.health = Math.min(100, gameState.crop.health + 3);
        
        advanceTime(0);
        showNotification('Field weeded.');
        updateUI();
    }

    /* ============================================
       14. PEST & DISEASE MANAGEMENT
       ============================================ */
    function handlePesticide() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') {
            showNotification('No growing crop to treat.');
            return;
        }
        
        if (gameState.inventory.pesticide <= 0) {
            showNotification('No pesticide available.');
            return;
        }
        
        if (gameState.crop.pestRisk < 10) {
            showNotification('Pest risk is already low.');
            return;
        }
        
        gameState.inventory.pesticide--;
        gameState.crop.pestRisk = Math.max(0, gameState.crop.pestRisk - 25);
        
        gameState.money -= 80;
        gameState.totalExpenses += 80;
        
        advanceTime(0);
        showNotification('Pesticide applied. Pest risk reduced.');
        updateUI();
    }

    function handleHerbicide() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') {
            showNotification('No growing crop to treat.');
            return;
        }
        
        if (gameState.inventory.herbicide <= 0) {
            showNotification('No herbicide available.');
            return;
        }
        
        if (gameState.crop.weedPressure < 10) {
            showNotification('Weed pressure is already low.');
            return;
        }
        
        gameState.inventory.herbicide--;
        gameState.crop.weedPressure = Math.max(0, gameState.crop.weedPressure - 35);
        
        gameState.money -= 60;
        gameState.totalExpenses += 60;
        
        advanceTime(0);
        showNotification('Herbicide applied. Weed pressure reduced.');
        updateUI();
    }

    /* ============================================
       15. INSPECTION
       ============================================ */
    function handleInspect() {
        if (!gameState.crop.type || !gameState.crop.stage || gameState.crop.stage === 'harvested') {
            showNotification('No growing crop to inspect.');
            return;
        }
        
        const crop = cropTypes[gameState.crop.type];
        const stage = gameState.crop.stage;
        const health = gameState.crop.health;
        const moisture = gameState.land.moisture;
        const fertility = gameState.land.fertility;
        
        let inspectionReport = `${crop.name} - ${stage}\n`;
        inspectionReport += `Health: ${health.toFixed(0)}%\n`;
        inspectionReport += `Soil moisture: ${moisture.toFixed(0)}%\n`;
        inspectionReport += `Soil fertility: ${fertility.toFixed(0)}%\n`;
        
        if (gameState.crop.pestRisk > 40) {
            inspectionReport += 'Warning: High pest risk detected.\n';
        }
        if (gameState.crop.diseaseRisk > 40) {
            inspectionReport += 'Warning: Disease risk detected.\n';
        }
        if (gameState.crop.weedPressure > 60) {
            inspectionReport += 'Warning: Heavy weed pressure.\n';
        }
        
        showNotification(inspectionReport);
        
        dom.learningPanel.hidden = false;
        dom.learningContent.textContent = `Inspection complete. Crop is in ${stage} stage.`;
    }

    /* ============================================
       16. HARVESTING
       ============================================ */
    function handleHarvest() {
        if (!gameState.crop.type || !gameState.crop.stage) {
            showNotification('No crop to harvest.');
            return;
        }
        
        if (gameState.crop.stage !== 'mature') {
            showNotification('Crop is not ready for harvest.');
            return;
        }
        
        const crop = cropTypes[gameState.crop.type];
        const yield_amount = gameState.crop.expectedHarvest || 
            Math.floor(crop.baseYield * (gameState.crop.health / 100) * (gameState.land.fertility / 50));
        
        gameState.inventory.harvested += yield_amount;
        gameState.crop.stage = 'harvested';
        
        gameState.money -= 150;
        gameState.totalExpenses += 150;
        
        // Move farmer
        if (farmCanvas) {
            moveFarmerTo(farmCanvas.width * 0.5, farmCanvas.height * 0.5);
        }
        
        advanceTime(0);
        showNotification(`Harvested ${yield_amount} units of ${crop.name}.`);
        updateUI();
        saveGame();
    }

    /* ============================================
       17. WASHING / CLEANING
       ============================================ */
    function handleWash() {
        if (gameState.inventory.harvested <= 0) {
            showNotification('No harvested crop to wash.');
            return;
        }
        
        gameState.inventory.cleaned = gameState.inventory.harvested;
        gameState.inventory.harvested = 0;
        
        gameState.money -= 50;
        gameState.totalExpenses += 50;
        
        advanceTime(0);
        showNotification('Harvest washed and cleaned.');
        updateUI();
    }

    function handleGrade() {
        if (gameState.inventory.cleaned <= 0) {
            showNotification('No cleaned crop to grade.');
            return;
        }
        
        const qualityScore = gameState.crop.health + (gameState.land.fertility * 0.3);
        let quality = 'fair';
        if (qualityScore > 90) quality = 'excellent';
        else if (qualityScore > 75) quality = 'good';
        else if (qualityScore > 55) quality = 'very good';
        else if (qualityScore > 35) quality = 'fair';
        else quality = 'poor';
        
        gameState.market.productQuality = quality;
        
        showNotification(`Product graded as ${quality} quality.`);
        updateUI();
    }

    /* ============================================
       18. PACKING
       ============================================ */
    function handlePack() {
        if (gameState.inventory.cleaned <= 0) {
            showNotification('No cleaned crop to pack.');
            return;
        }
        
        if (gameState.inventory.packaging <= 0) {
            showNotification('No packaging materials available. Buy some from the market.');
            return;
        }
        
        const packAmount = Math.min(gameState.inventory.cleaned, gameState.inventory.packaging * 10);
        
        gameState.inventory.cleaned -= packAmount;
        gameState.inventory.packed += packAmount;
        gameState.inventory.packaging -= Math.ceil(packAmount / 10);
        
        gameState.money -= 30;
        gameState.totalExpenses += 30;
        
        advanceTime(0);
        showNotification(`Packed ${packAmount} units of product.`);
        updateUI();
    }

    function handleStore() {
        if (gameState.inventory.packed <= 0 && gameState.inventory.cleaned <= 0) {
            showNotification('Nothing to store.');
            return;
        }
        
        showNotification('Products stored safely.');
        updateUI();
    }

    /* ============================================
       19. TRANSPORT & MARKET
       ============================================ */
    function handleTransport() {
        if (gameState.inventory.packed <= 0 && gameState.inventory.cleaned <= 0) {
            showNotification('No packed products to transport.');
            return;
        }
        
        gameState.market.quantityForSale = gameState.inventory.packed + gameState.inventory.cleaned;
        
        generateBuyer();
        
        dom.marketPanel.hidden = false;
        showNotification('Products transported to market.');
        updateUI();
    }

    function generateBuyer() {
        const buyers = [
            'Local Market',
            'Grain Trader',
            'Cooperative Buyer',
            'Export Company',
            'Food Processor'
        ];
        
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        const demand = 0.5 + Math.random() * 0.5;
        const cropId = gameState.crop.type;
        const crop = cropTypes[cropId];
        
        const qualityMultiplier = {
            'poor': 0.6,
            'fair': 0.8,
            'good': 1.0,
            'very good': 1.2,
            'excellent': 1.5
        };
        
        const quality = gameState.market.productQuality || 'fair';
        const basePrice = crop ? crop.basePrice : 15;
        const price = Math.floor(basePrice * qualityMultiplier[quality] * demand);
        
        gameState.market.currentBuyer = buyer;
        gameState.market.currentOffer = price;
        gameState.market.negotiatedOffer = price;
        gameState.market.finalPrice = price;
        gameState.market.demand = demand;
        
        updateMarketUI();
    }

    function handleFindBuyer() {
        generateBuyer();
        showNotification('Looking for another buyer...');
    }

    function handleMarketNegotiate() {
        if (!gameState.market.currentBuyer) {
            showNotification('No buyer to negotiate with.');
            return;
        }
        
        const quality = gameState.market.productQuality || 'fair';
        const reputationBonus = gameState.reputation * 0.01;
        const demandFactor = gameState.market.demand;
        
        const priceMultiplier = 1 + (reputationBonus * 0.2) + (demandFactor * 0.1);
        const newPrice = Math.floor(gameState.market.negotiatedOffer * priceMultiplier);
        
        gameState.market.negotiatedOffer = newPrice;
        
        showNotification(`Buyer negotiates: ${newPrice} ETB per unit.`);
        updateMarketUI();
    }

    function handleMarketSell() {
        if (gameState.market.quantityForSale <= 0) {
            showNotification('No products to sell.');
            return;
        }
        
        const quantity = gameState.market.quantityForSale;
        const price = gameState.market.negotiatedOffer || gameState.market.currentOffer;
        const revenue = quantity * price;
        
        gameState.money += revenue;
        gameState.totalRevenue += revenue;
        gameState.profit = gameState.totalRevenue - gameState.totalExpenses;
        
        gameState.inventory.packed = 0;
        gameState.inventory.cleaned = 0;
        gameState.market.quantityForSale = 0;
        
        gameState.reputation += Math.floor(quantity / 10);
        
        gameState.market.lastTransaction = {
            crop: gameState.crop.type,
            quantity: quantity,
            price: price,
            revenue: revenue,
            buyer: gameState.market.currentBuyer
        };
        
        showNotification(`Sold ${quantity} units for ${revenue} ETB! Profit: ${gameState.profit} ETB.`);
        
        dom.marketPanel.hidden = true;
        updateUI();
        saveGame();
    }

    /* ============================================
       20. FARM PROGRESSION
       ============================================ */
    function handleExpandFarm() {
        const expansionCost = 5000 * gameState.expansion.landArea;
        
        if (gameState.money < expansionCost) {
            showNotification(`Insufficient funds. Need ${expansionCost} ETB to expand.`);
            return;
        }
        
        gameState.money -= expansionCost;
        gameState.totalExpenses += expansionCost;
        
        gameState.expansion.landArea++;
        gameState.expansion.availableFields++;
        gameState.farmLevel++;
        
        if (gameState.land) {
            gameState.land.area++;
        }
        
        showNotification('Farm expanded!');
        updateUI();
        saveGame();
    }

    /* ============================================
       21. LEARNING PANEL
       ============================================ */
    function handleLearnMore() {
        const topics = [
            'Crops need water to transport nutrients and maintain cell structure.',
            'Fertilizer provides essential nutrients like nitrogen, phosphorus, and potassium.',
            'Pests can reduce yield by eating leaves, stems, and developing grains.',
            'Weeds compete with crops for water, nutrients, and sunlight.',
            'Crop quality affects market price because higher quality products fetch better prices.',
            'Crop rotation helps maintain soil health and reduce pest buildup.'
        ];
        
        const topic = topics[Math.floor(Math.random() * topics.length)];
        dom.learningContent.textContent = topic;
        showNotification('Learning information updated.');
    }

    /* ============================================
       22. WEATHER SYSTEM
       ============================================ */
    function updateWeather() {
        const tempChange = (Math.random() - 0.5) * 4;
        gameState.weather.temperature = Math.max(5, Math.min(35, gameState.weather.temperature + tempChange));
        
        const conditions = ['clear', 'cloudy', 'light_rain', 'rainy', 'windy'];
        gameState.weather.condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        gameState.weather.rainProbability = Math.random() * 0.5;
        gameState.weather.humidity = Math.max(20, Math.min(90, gameState.weather.humidity + (Math.random() - 0.5) * 10));
        gameState.weather.windSpeed = Math.max(0, Math.min(30, gameState.weather.windSpeed + (Math.random() - 0.5) * 6));
        
        if (gameState.weather.condition === 'rainy' || gameState.weather.condition === 'light_rain') {
            if (gameState.land) {
                gameState.land.moisture = Math.min(100, gameState.land.moisture + 10);
            }
        }
    }

    /* ============================================
       23. UI UPDATE SYSTEM
       ============================================ */
    function updateUI() {
        if (!gameState || !gameState.land) {
            return;
        }
        
        // HUD
        dom.currentDay.textContent = gameState.day;
        dom.currentSeason.textContent = gameState.season;
        dom.playerMoney.textContent = Math.floor(gameState.money);
        
        // Weather
        dom.temperature.textContent = gameState.weather.temperature.toFixed(1);
        dom.weatherCondition.textContent = gameState.weather.condition;
        dom.rainProbability.textContent = (gameState.weather.rainProbability * 100).toFixed(0) + '%';
        dom.humidity.textContent = gameState.weather.humidity.toFixed(0) + '%';
        dom.windSpeed.textContent = gameState.weather.windSpeed.toFixed(1);
        
        // Farm info
        dom.infoFarmName.textContent = gameState.farmName || '--';
        dom.infoLandType.textContent = gameState.land.name;
        dom.infoSoilType.textContent = gameState.land.soilType;
        dom.infoCurrentCrop.textContent = gameState.crop.type ? cropTypes[gameState.crop.type].name : '--';
        dom.infoGrowthStage.textContent = gameState.crop.stage || '--';
        dom.infoCropHealth.textContent = gameState.crop.health ? gameState.crop.health.toFixed(0) + '%' : '--';
        dom.infoSoilMoisture.textContent = gameState.land.moisture.toFixed(0) + '%';
        
        // Inventory
        const seedCount = Object.values(gameState.inventory.seeds).reduce((sum, val) => sum + val, 0);
        dom.invSeeds.textContent = seedCount;
        dom.invFertilizer.textContent = gameState.inventory.fertilizer;
        dom.invPesticide.textContent = gameState.inventory.pesticide;
        dom.invHerbicide.textContent = gameState.inventory.herbicide;
        dom.invTools.textContent = gameState.inventory.tools;
        dom.invHarvested.textContent = gameState.inventory.harvested + gameState.inventory.cleaned + gameState.inventory.packed;
        dom.invPackaging.textContent = gameState.inventory.packaging;
        
        // Crop status
        if (gameState.crop.type) {
            const crop = cropTypes[gameState.crop.type];
            dom.cropName.textContent = crop.name;
            dom.cropStage.textContent = gameState.crop.stage || '--';
            dom.cropDays.textContent = gameState.crop.daysPlanted;
            dom.cropHealth.textContent = gameState.crop.health.toFixed(0) + '%';
            dom.cropWater.textContent = gameState.crop.waterStatus;
            dom.cropNutrient.textContent = gameState.crop.nutrientStatus;
            dom.cropPest.textContent = gameState.crop.pestRisk.toFixed(0) + '%';
            dom.cropDisease.textContent = gameState.crop.diseaseRisk.toFixed(0) + '%';
            dom.cropHarvestStatus.textContent = gameState.crop.stage === 'mature' ? 'Ready' : '--';
        }
        
        // Financial
        dom.finStarting.textContent = Math.floor(gameState.startingMoney);
        dom.finExpenses.textContent = Math.floor(gameState.totalExpenses);
        dom.finRevenue.textContent = Math.floor(gameState.totalRevenue);
        dom.finBalance.textContent = Math.floor(gameState.money);
        dom.finProfit.textContent = Math.floor(gameState.profit);
        
        // Progression
        dom.progressLevel.textContent = gameState.farmLevel;
        dom.progressLand.textContent = gameState.expansion.landArea;
        dom.progressFields.textContent = gameState.expansion.availableFields;
        dom.progressIrrigation.textContent = gameState.expansion.irrigationLevel;
        dom.progressStorage.textContent = gameState.expansion.storageLevel;
        dom.progressEquipment.textContent = gameState.expansion.equipmentLevel;
        
        // Market
        updateMarketUI();
        
        // Farmer status
        dom.farmerStatus.textContent = 'Farmer - ' + (gameState.crop.stage || 'Idle');
        
        // Event message
        dom.eventMessage.textContent = gameState.currentEvent || 'No current events';
        
        // Enable/disable action buttons
        updateActionButtons();
    }

    function updateActionButtons() {
        const hasLand = !!gameState.land;
        const hasCrop = !!gameState.crop.type;
        const isGrowing = hasCrop && gameState.crop.stage && gameState.crop.stage !== 'harvested';
        const isMature = hasCrop && gameState.crop.stage === 'mature';
        const hasHarvest = gameState.inventory.harvested > 0;
        const hasCleaned = gameState.inventory.cleaned > 0;
        const hasPacked = gameState.inventory.packed > 0;
        
        dom.prepareLandBtn.disabled = !hasLand || gameState.landPrepared;
        dom.sowCropBtn.disabled = !hasLand || !gameState.landPrepared || isGrowing;
        dom.waterCropBtn.disabled = !isGrowing;
        dom.fertilizeCropBtn.disabled = !isGrowing || gameState.inventory.fertilizer <= 0;
        dom.weedFieldBtn.disabled = !isGrowing;
        dom.inspectCropBtn.disabled = !isGrowing;
        dom.applyPesticideBtn.disabled = !isGrowing || gameState.inventory.pesticide <= 0;
        dom.applyHerbicideBtn.disabled = !isGrowing || gameState.inventory.herbicide <= 0;
        dom.harvestCropBtn.disabled = !isMature;
        dom.washCropBtn.disabled = !hasHarvest;
        dom.packCropBtn.disabled = !hasCleaned;
        dom.transportCropBtn.disabled = !hasPacked && !hasCleaned;
    }

    function updateMarketUI() {
        if (!gameState.market.currentBuyer) {
            return;
        }
        
        dom.marketCrop.textContent = gameState.crop.type ? cropTypes[gameState.crop.type].name : '--';
        dom.marketQty.textContent = gameState.market.quantityForSale;
        dom.marketQuality.textContent = gameState.market.productQuality || 'fair';
        dom.marketOffer.textContent = gameState.market.currentOffer || '--';
        dom.marketNegotiated.textContent = gameState.market.negotiatedOffer || '--';
        dom.marketFinal.textContent = gameState.market.finalPrice || '--';
        dom.marketRevenue.textContent = gameState.market.quantityForSale * (gameState.market.negotiatedOffer || gameState.market.currentOffer || 0);
    }

    function showNotification(message) {
        gameState.currentEvent = message;
        dom.eventMessage.textContent = message;
        
        if (window.notificationTimeout) {
            clearTimeout(window.notificationTimeout);
        }
        
        window.notificationTimeout = setTimeout(() => {
            gameState.currentEvent = 'No current events';
            dom.eventMessage.textContent = gameState.currentEvent;
        }, 5000);
    }

    function hideLoading() {
        if (dom.farmLoading) {
            dom.farmLoading.style.display = 'none';
        }
    }

    /* ============================================
       24. SAVE / LOAD / RESET
       ============================================ */
    function saveGame() {
        try {
            const serialized = JSON.stringify(gameState);
            localStorage.setItem('agrinova_farm_save', serialized);
            showNotification('Game saved.');
        } catch (e) {
            console.error('Failed to save game:', e);
            showNotification('Failed to save game.');
        }
    }

    function loadGame() {
        try {
            const saved = localStorage.getItem('agrinova_farm_save');
            if (saved) {
                gameState = JSON.parse(saved);
                showNotification('Game loaded.');
                
                if (gameState.land) {
                    dom.farmSetup.style.display = 'none';
                    dom.simulationStage.hidden = false;
                    hideLoading();
                    
                    // Initialize visualization if not already done
                    if (!farmCanvas) {
                        initFarmVisualization();
                    }
                }
                
                updateUI();
            } else {
                showNotification('No saved game found.');
            }
        } catch (e) {
            console.error('Failed to load game:', e);
            showNotification('Failed to load game.');
        }
    }

    function loadGameState() {
        try {
            const saved = localStorage.getItem('agrinova_farm_save');
            if (saved) {
                gameState = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load game state:', e);
        }
        
        if (!gameState) {
            gameState = JSON.parse(JSON.stringify(defaultGameState));
        }
    }

    function resetGame() {
        if (confirm('Are you sure you want to reset the farm? This will delete all progress.')) {
            localStorage.removeItem('agrinova_farm_save');
            gameState = JSON.parse(JSON.stringify(defaultGameState));
            
            dom.farmSetup.style.display = '';
            dom.simulationStage.hidden = true;
            
            // Remove canvas if it exists
            if (farmCanvas && farmCanvas.parentNode) {
                farmCanvas.parentNode.removeChild(farmCanvas);
                farmCanvas = null;
                farmCtx = null;
            }
            
            selectedLand = null;
            selectedSize = 'small';
            selectedSoil = 'loam';
            
            dom.landOptions.forEach(b => b.setAttribute('aria-checked', 'false'));
            dom.sizeOptions.forEach(b => b.setAttribute('aria-checked', 'false'));
            dom.soilOptions.forEach(b => b.setAttribute('aria-checked', 'false'));
            
            dom.farmNameInput.value = '';
            dom.startingBudget.textContent = '10,000';
            
            updateUI();
            showNotification('Farm reset. Start fresh!');
        }
    }

    /* ============================================
       25. INITIALIZATION
       ============================================ */
    document.addEventListener('DOMContentLoaded', init);

})();