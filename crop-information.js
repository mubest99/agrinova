// ===== CROP INFORMATION — JAVASCRIPT =====

(function() {

    // ----- 1. CROP DATA (Real crops with real photos) -----
    const crops = [

        // ---- CEREALS ----
        {
            id: 1,
            name: "Maize",
            category: "cereals",
            categoryLabel: "Cereals",
            image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
            overview: "Maize is one of the world's most important cereal crops, serving as a staple food for millions of people.",
            climate: "Maize grows best in warm temperatures between 20-30°C. It requires adequate rainfall during the growing season.",
            soil: "Maize prefers well-drained loamy soils with good organic matter content and a pH between 5.5 and 7.0.",
            planting: "Maize is typically planted at the beginning of the rainy season. Seeds should be planted 3-5 cm deep.",
            water: "Maize requires approximately 500-800 mm of water during the growing season, with critical water needs during flowering.",
            nutrients: "Maize requires balanced nutrition with emphasis on nitrogen for vegetative growth and phosphorus for root development.",
            growthStages: ["Seed", "Germination", "Seedling", "Vegetative", "Flowering", "Maturity", "Harvest"],
            pests: "Common maize pests include Fall Armyworm, Stem Borer, and Aphids.",
            harvest: "Maize is typically harvested 3-4 months after planting when the kernels are dry and hard."
        },
        {
            id: 2,
            name: "Wheat",
            category: "cereals",
            categoryLabel: "Cereals",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
            overview: "Wheat is a widely cultivated cereal grain used for human consumption and animal feed.",
            climate: "Wheat grows best in temperate climates with temperatures between 15-25°C.",
            soil: "Wheat prefers well-drained loamy soils with a pH between 6.0 and 7.5.",
            planting: "Wheat can be planted in spring or winter depending on the variety and region.",
            water: "Wheat requires approximately 400-600 mm of water during the growing season.",
            nutrients: "Wheat requires nitrogen, phosphorus, and potassium for optimal growth and grain quality.",
            growthStages: ["Seed", "Germination", "Tillering", "Stem Elongation", "Booting", "Heading", "Maturity", "Harvest"],
            pests: "Common wheat pests include Aphids, Hessian Fly, and Wheat Stem Sawfly.",
            harvest: "Wheat is harvested when the grain is mature and dry, typically 4-5 months after planting."
        },
        {
            id: 3,
            name: "Teff",
            category: "cereals",
            categoryLabel: "Cereals",
            image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
            overview: "Teff is Ethiopia's most important staple grain, known for its tiny seeds and nutritional value.",
            climate: "Teff grows well in warm temperatures between 15-30°C and is adapted to various climatic conditions.",
            soil: "Teff can grow in a wide range of soil types but prefers well-drained soils with pH 5.5-7.5.",
            planting: "Teff is typically broadcast-seeded at the beginning of the rainy season.",
            water: "Teff requires approximately 400-600 mm of water during the growing season.",
            nutrients: "Teff responds well to nitrogen fertilizer for improved grain yield.",
            growthStages: ["Seed", "Germination", "Tillering", "Stem Elongation", "Booting", "Heading", "Maturity", "Harvest"],
            pests: "Common teff pests include Aphids, Grasshoppers, and Cutworms.",
            harvest: "Teff is harvested when the plants turn yellow-gold, typically 3-4 months after planting."
        },
        {
            id: 4,
            name: "Barley",
            category: "cereals",
            categoryLabel: "Cereals",
            image: "https://images.unsplash.com/photo-1586771107445-d3ca8881290d?w=800&q=80",
            overview: "Barley is a versatile cereal grain used for human consumption, animal feed, and malting.",
            climate: "Barley grows best in cool, dry climates with temperatures between 15-25°C.",
            soil: "Barley prefers well-drained soils with a pH between 6.0 and 7.5.",
            planting: "Barley is typically planted in spring or winter depending on the variety.",
            water: "Barley requires approximately 350-450 mm of water during the growing season.",
            nutrients: "Barley requires balanced nutrition with emphasis on nitrogen and phosphorus.",
            growthStages: ["Seed", "Germination", "Tillering", "Stem Elongation", "Booting", "Heading", "Maturity", "Harvest"],
            pests: "Common barley pests include Aphids, Hessian Fly, and Barley Yellow Dwarf Virus.",
            harvest: "Barley is harvested when the grain is mature and dry, typically 3-4 months after planting."
        },
        {
            id: 5,
            name: "Sorghum",
            category: "cereals",
            categoryLabel: "Cereals",
            image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=800&q=80",
            overview: "Sorghum is an important cereal grain grown for human consumption, animal feed, and fodder.",
            climate: "Sorghum grows well in warm climates with temperatures between 25-35°C and is drought-tolerant.",
            soil: "Sorghum prefers well-drained soils with a pH between 5.5 and 7.5.",
            planting: "Sorghum is planted when soil temperatures reach at least 15°C.",
            water: "Sorghum requires approximately 400-600 mm of water during the growing season.",
            nutrients: "Sorghum requires nitrogen, phosphorus, and potassium for optimal growth.",
            growthStages: ["Seed", "Germination", "Tillering", "Stem Elongation", "Booting", "Heading", "Maturity", "Harvest"],
            pests: "Common sorghum pests include Shoot Fly, Stem Borer, and Headworms.",
            harvest: "Sorghum is harvested when the grain is mature and dry, typically 3-4 months after planting."
        },

        // ---- VEGETABLES ----
        {
            id: 6,
            name: "Tomato",
            category: "vegetables",
            categoryLabel: "Vegetables",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
            overview: "Tomato is one of the most widely cultivated vegetables in the world.",
            climate: "Tomatoes grow best in warm temperatures between 20-28°C.",
            soil: "Tomatoes prefer well-drained loamy soils with pH between 6.0 and 7.0.",
            planting: "Tomatoes are typically planted from seedlings or transplants.",
            water: "Tomatoes require regular watering, approximately 400-600 mm during the growing season.",
            nutrients: "Tomatoes require balanced nutrition with emphasis on potassium for fruit development.",
            growthStages: ["Seed", "Germination", "Seedling", "Vegetative", "Flowering", "Fruit Development", "Maturity", "Harvest"],
            pests: "Common tomato pests include Aphids, Whiteflies, and Tomato Hornworm.",
            harvest: "Tomatoes are harvested when fruits are fully colored and firm, typically 2-3 months after transplanting."
        },
        {
            id: 7,
            name: "Potato",
            category: "vegetables",
            categoryLabel: "Vegetables",
            image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80",
            overview: "Potato is a versatile vegetable and one of the most important food crops globally.",
            climate: "Potatoes grow best in cool temperatures between 15-20°C.",
            soil: "Potatoes prefer well-drained loamy soils with pH between 5.0 and 6.5.",
            planting: "Potatoes are planted from seed tubers, typically in spring.",
            water: "Potatoes require regular watering, approximately 300-500 mm during the growing season.",
            nutrients: "Potatoes require balanced nutrition with emphasis on potassium and phosphorus.",
            growthStages: ["Seed Tuber", "Sprouting", "Vegetative", "Tuber Initiation", "Tuber Bulking", "Maturity"],
            pests: "Common potato pests include Colorado Potato Beetle and Potato Aphids.",
            harvest: "Potatoes are harvested when the plants mature and tubers are fully developed, typically 3-4 months after planting."
        },
        {
            id: 8,
            name: "Onion",
            category: "vegetables",
            categoryLabel: "Vegetables",
            image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?w=800&q=80",
            overview: "Onion is an essential vegetable used worldwide for culinary purposes.",
            climate: "Onions grow best in temperatures between 15-25°C.",
            soil: "Onions prefer well-drained loamy soils with pH between 6.0 and 7.5.",
            planting: "Onions are typically planted from seeds or sets.",
            water: "Onions require consistent moisture, approximately 350-500 mm during the growing season.",
            nutrients: "Onions require nitrogen and phosphorus for bulb development.",
            growthStages: ["Seed", "Germination", "Seedling", "Bulbing", "Maturity"],
            pests: "Common onion pests include Thrips and Onion Maggots.",
            harvest: "Onions are harvested when the tops fall over and bulbs are mature, typically 3-4 months after planting."
        },
        {
            id: 9,
            name: "Cabbage",
            category: "vegetables",
            categoryLabel: "Vegetables",
            image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&q=80",
            overview: "Cabbage is a leafy vegetable widely cultivated for its edible heads.",
            climate: "Cabbage grows best in cool temperatures between 15-20°C.",
            soil: "Cabbage prefers well-drained soils with pH between 6.0 and 7.5.",
            planting: "Cabbage is typically planted from seedlings or transplants.",
            water: "Cabbage requires regular watering, approximately 380-500 mm during the growing season.",
            nutrients: "Cabbage requires nitrogen for leafy growth and potassium for head development.",
            growthStages: ["Seed", "Germination", "Seedling", "Leaf Growth", "Heading", "Maturity"],
            pests: "Common cabbage pests include Cabbage Worms, Aphids, and Diamondback Moths.",
            harvest: "Cabbage is harvested when heads are firm and mature, typically 3-4 months after planting."
        },

        // ---- FRUITS ----
        {
            id: 10,
            name: "Banana",
            category: "fruits",
            categoryLabel: "Fruits",
            image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80",
            overview: "Banana is one of the most important fruit crops globally, serving as a staple food in many regions.",
            climate: "Bananas grow best in tropical climates with temperatures between 25-30°C.",
            soil: "Bananas prefer well-drained loamy soils with pH between 5.5 and 7.0.",
            planting: "Bananas are typically planted from suckers or tissue culture plants.",
            water: "Bananas require abundant water, approximately 1000-1500 mm during the growing season.",
            nutrients: "Bananas require potassium and nitrogen for optimal growth and fruit development.",
            growthStages: ["Planting", "Vegetative", "Flowering", "Bunch Development", "Maturity", "Harvest"],
            pests: "Common banana pests include Nematodes, Weevils, and Thrips.",
            harvest: "Bananas are harvested when fruits are mature green, typically 9-12 months after planting."
        },
        {
            id: 11,
            name: "Mango",
            category: "fruits",
            categoryLabel: "Fruits",
            image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
            overview: "Mango is a widely cultivated tropical fruit known for its sweet flavor and nutritional value.",
            climate: "Mangoes grow best in tropical and subtropical climates with temperatures between 25-35°C.",
            soil: "Mangoes prefer well-drained soils with pH between 5.5 and 7.5.",
            planting: "Mangoes are typically planted from grafted seedlings.",
            water: "Mangoes require moderate watering, approximately 800-1000 mm annually.",
            nutrients: "Mangoes require nitrogen and potassium for optimal fruit production.",
            growthStages: ["Planting", "Vegetative", "Flowering", "Fruit Set", "Fruit Development", "Maturity", "Harvest"],
            pests: "Common mango pests include Fruit Flies, Mango Weevils, and Thrips.",
            harvest: "Mangoes are harvested when fruits are mature and begin to color, typically 4-5 months after flowering."
        },
        {
            id: 12,
            name: "Avocado",
            category: "fruits",
            categoryLabel: "Fruits",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
            overview: "Avocado is a nutrient-dense fruit valued for its healthy fats and versatility.",
            climate: "Avocados grow best in subtropical to tropical climates with temperatures between 20-30°C.",
            soil: "Avocados prefer well-drained soils with pH between 5.5 and 7.0.",
            planting: "Avocados are typically planted from grafted seedlings.",
            water: "Avocados require consistent moisture, approximately 800-1000 mm annually.",
            nutrients: "Avocados require nitrogen and zinc for optimal growth and fruit development.",
            growthStages: ["Planting", "Vegetative", "Flowering", "Fruit Set", "Fruit Development", "Maturity", "Harvest"],
            pests: "Common avocado pests include Thrips, Mites, and Scale Insects.",
            harvest: "Avocados are harvested when fruits reach mature size, typically 8-12 months after flowering."
        },

        // ---- LEGUMES ----
        {
            id: 13,
            name: "Chickpea",
            category: "legumes",
            categoryLabel: "Legumes",
            image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80",
            overview: "Chickpea is an important legume crop valued for its high protein content and nitrogen-fixing ability.",
            climate: "Chickpeas grow best in cool climates with temperatures between 20-25°C.",
            soil: "Chickpeas prefer well-drained loamy soils with pH between 6.0 and 7.5.",
            planting: "Chickpeas are typically planted in spring or early summer.",
            water: "Chickpeas require approximately 300-400 mm of water during the growing season.",
            nutrients: "Chickpeas benefit from phosphorus fertilizer for root development.",
            growthStages: ["Seed", "Germination", "Vegetative", "Flowering", "Pod Development", "Maturity", "Harvest"],
            pests: "Common chickpea pests include Pod Borers and Aphids.",
            harvest: "Chickpeas are harvested when pods are dry and mature, typically 3-4 months after planting."
        },
        {
            id: 14,
            name: "Lentil",
            category: "legumes",
            categoryLabel: "Legumes",
            image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
            overview: "Lentil is a highly nutritious legume crop grown for its edible seeds.",
            climate: "Lentils grow best in cool, dry climates with temperatures between 18-25°C.",
            soil: "Lentils prefer well-drained sandy loam soils with pH between 6.0 and 7.0.",
            planting: "Lentils are typically planted in early spring.",
            water: "Lentils require approximately 300-400 mm of water during the growing season.",
            nutrients: "Lentils benefit from phosphorus and potassium fertilization.",
            growthStages: ["Seed", "Germination", "Vegetative", "Flowering", "Pod Development", "Maturity", "Harvest"],
            pests: "Common lentil pests include Aphids and Pod Borers.",
            harvest: "Lentils are harvested when pods are dry and plants turn brown, typically 3-4 months after planting."
        },
        {
            id: 15,
            name: "Common Bean",
            category: "legumes",
            categoryLabel: "Legumes",
            image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80",
            overview: "Common bean is a versatile legume crop valued for its protein-rich seeds.",
            climate: "Beans grow best in warm climates with temperatures between 20-30°C.",
            soil: "Beans prefer well-drained soils with pH between 6.0 and 7.0.",
            planting: "Beans are typically planted in spring after the last frost.",
            water: "Beans require regular watering, approximately 300-500 mm during the growing season.",
            nutrients: "Beans benefit from phosphorus fertilizer for root development.",
            growthStages: ["Seed", "Germination", "Vegetative", "Flowering", "Pod Development", "Maturity", "Harvest"],
            pests: "Common bean pests include Aphids, Bean Beetles, and Spider Mites.",
            harvest: "Beans are harvested when pods are mature and dry, typically 2-3 months after planting."
        },

        // ---- CASH CROPS ----
        {
            id: 16,
            name: "Coffee",
            category: "cash-crops",
            categoryLabel: "Cash Crops",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
            overview: "Coffee is one of the world's most important cash crops, with a rich history in Ethiopia.",
            climate: "Coffee grows best in tropical highlands with temperatures between 18-25°C.",
            soil: "Coffee prefers well-drained volcanic soils with pH between 5.5 and 6.5.",
            planting: "Coffee is typically planted from seedlings in well-prepared nursery beds.",
            water: "Coffee requires 1500-2000 mm of rainfall annually.",
            nutrients: "Coffee requires nitrogen and potassium for bean development and quality.",
            growthStages: ["Nursery", "Planting", "Vegetative", "Flowering", "Berry Development", "Maturity", "Harvest"],
            pests: "Common coffee pests include Coffee Borer and Leaf Rust.",
            harvest: "Coffee cherries are typically harvested 2-3 years after planting."
        },
        {
            id: 17,
            name: "Sesame",
            category: "cash-crops",
            categoryLabel: "Cash Crops",
            image: "https://images.unsplash.com/photo-1586771107445-d3ca8881290d?w=800&q=80",
            overview: "Sesame is an important cash crop valued for its oil-rich seeds.",
            climate: "Sesame grows best in warm, tropical climates with temperatures between 25-35°C.",
            soil: "Sesame prefers well-drained sandy loam soils with pH between 5.5 and 7.0.",
            planting: "Sesame is typically planted during the rainy season.",
            water: "Sesame requires approximately 400-600 mm of water during the growing season.",
            nutrients: "Sesame benefits from balanced fertilization for optimal yield.",
            growthStages: ["Seed", "Germination", "Vegetative", "Flowering", "Capsule Development", "Maturity", "Harvest"],
            pests: "Common sesame pests include Aphids, Leafhoppers, and Capsule Borers.",
            harvest: "Sesame is harvested when capsules turn yellow-brown, typically 3-4 months after planting."
        },

        // ---- ETHIOPIAN CROPS ----
        {
            id: 18,
            name: "Teff (Ethiopian)",
            category: "ethiopian-crops",
            categoryLabel: "Ethiopian Crops",
            image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
            overview: "Teff is Ethiopia's most important traditional crop, central to Ethiopian cuisine and culture.",
            climate: "Teff is adapted to Ethiopia's diverse climate from 15-30°C.",
            soil: "Teff can grow in various soils but prefers well-drained conditions.",
            planting: "Teff is traditionally broadcast-seeded during the main rainy season (Kiremt).",
            water: "Teff requires 400-600 mm of water during the growing season.",
            nutrients: "Teff responds well to nitrogen fertilizer for improved yield.",
            growthStages: ["Seed", "Germination", "Tillering", "Stem Elongation", "Booting", "Heading", "Maturity", "Harvest"],
            pests: "Common teff pests include Aphids and Grasshoppers.",
            harvest: "Teff is harvested when plants turn yellow-gold, typically 3-4 months after planting."
        },
        {
            id: 19,
            name: "Ethiopian Coffee",
            category: "ethiopian-crops",
            categoryLabel: "Ethiopian Crops",
            image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
            overview: "Ethiopia is the birthplace of coffee, with unique Arabica varieties and traditional production systems.",
            climate: "Ethiopian coffee grows best in tropical highlands at 1500-2200m altitude.",
            soil: "Coffee prefers well-drained volcanic soils typical of Ethiopian highlands.",
            planting: "Coffee is typically planted under shade trees in traditional forest coffee systems.",
            water: "Coffee requires 1500-2000 mm of rainfall annually.",
            nutrients: "Coffee requires nitrogen and potassium for bean quality.",
            growthStages: ["Nursery", "Planting", "Vegetative", "Flowering", "Berry Development", "Maturity", "Harvest"],
            pests: "Common coffee pests include Coffee Berry Borer and Leaf Rust.",
            harvest: "Coffee is harvested annually during the main production season."
        }
    ];

    // ----- 2. STATE -----
    let currentCategory = 'all';
    let searchQuery = '';
    let selectedCrop = null;

    // ----- 3. DOM REFS -----
    const grid = document.getElementById('cropGrid');
    const collection = document.getElementById('cropCollection');
    const detailView = document.getElementById('cropDetail');
    const detailContent = document.getElementById('cropDetailContent');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterTags = document.querySelectorAll('.filter-tag');
    const backBtn = document.getElementById('backToCrops');

    // ----- 4. RENDER CROP CARDS -----
    function renderCrops() {
        let filtered = crops;

        if (currentCategory !== 'all') {
            filtered = filtered.filter(c => c.category === currentCategory);
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.categoryLabel.toLowerCase().includes(query)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }
        emptyState.style.display = 'none';

        grid.innerHTML = '';
        filtered.forEach(crop => {
            const card = document.createElement('div');
            card.className = 'crop-card';
            card.style.backgroundImage = `url('${crop.image}')`;
            card.innerHTML = `
                <span class="category-tag">${crop.categoryLabel}</span>
                <div class="crop-name">${crop.name}</div>
                <div class="view-crop">View Crop Information →</div>
            `;
            card.dataset.id = crop.id;
            card.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                showCropDetail(id);
            });
            grid.appendChild(card);
        });
    }

    // ----- 5. SHOW CROP DETAIL -----
    function showCropDetail(id) {
        const crop = crops.find(c => c.id === id);
        if (!crop) return;

        selectedCrop = crop;
        collection.style.display = 'none';
        detailView.style.display = 'block';
        detailView.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Build growth stages HTML
        let stagesHTML = '';
        crop.growthStages.forEach((stage, index) => {
            stagesHTML += `<span class="growth-stage">${stage}</span>`;
            if (index < crop.growthStages.length - 1) {
                stagesHTML += `<span class="growth-arrow">→</span>`;
            }
        });

        detailContent.innerHTML = `
            <div class="crop-detail-image" style="background-image: url('${crop.image}');">
                <div class="detail-title">${crop.name}</div>
            </div>
            <div class="crop-detail-body">
                <div class="detail-section">
                    <h3>Overview</h3>
                    <p>${crop.overview}</p>
                </div>
                <div class="detail-section">
                    <h3>Climate Requirements</h3>
                    <p>${crop.climate}</p>
                </div>
                <div class="detail-section">
                    <h3>Soil Requirements</h3>
                    <p>${crop.soil}</p>
                </div>
                <div class="detail-section">
                    <h3>Planting</h3>
                    <p>${crop.planting}</p>
                </div>
                <div class="detail-section">
                    <h3>Water Requirements</h3>
                    <p>${crop.water}</p>
                </div>
                <div class="detail-section">
                    <h3>Nutrient Requirements</h3>
                    <p>${crop.nutrients}</p>
                </div>
                <div class="detail-section">
                    <h3>Growth Stages</h3>
                    <div class="growth-stages">${stagesHTML}</div>
                </div>
                <div class="detail-section">
                    <h3>Pests & Diseases</h3>
                    <p>${crop.pests}</p>
                </div>
                <div class="detail-section">
                    <h3>Harvest</h3>
                    <p>${crop.harvest}</p>
                </div>
            </div>
        `;
    }

    // ----- 6. BACK TO CROPS -----
    function backToCrops() {
        detailView.style.display = 'none';
        collection.style.display = 'block';
        selectedCrop = null;
        collection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    backBtn.addEventListener('click', backToCrops);

    // ----- 7. FILTER TAGS -----
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            // If in detail view, go back to crops
            if (selectedCrop) backToCrops();
            renderCrops();
        });
    });

    // ----- 8. SEARCH -----
    function performSearch() {
        searchQuery = searchInput.value;
        if (selectedCrop) backToCrops();
        renderCrops();
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            searchQuery = '';
            if (selectedCrop) backToCrops();
            renderCrops();
            this.blur();
        }
    });

    // ----- 9. INITIALIZE -----
    renderCrops();

    console.log('🌾 Crop Information loaded successfully!');
    console.log(`📄 Total crops: ${crops.length}`);
    console.log(`📂 Categories: ${new Set(crops.map(c => c.categoryLabel)).size}`);

})();