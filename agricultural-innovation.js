/**
 * AgriNova — Agricultural Innovation
 * Complete JavaScript with sample data structure
 */

// ============================================================
// 1. SAMPLE DATA (Replace with API data later)
// ============================================================

const innovationsData = [
    {
        id: "AI001",
        title: "Solar-Powered Drip Irrigation System",
        category: "Irrigation",
        description: "A solar-powered drip irrigation system that delivers water directly to plant roots, reducing water waste by up to 60%.",
        fullDescription: "Solar-powered drip irrigation systems combine photovoltaic technology with precision irrigation to deliver water directly to plant roots. The system uses solar panels to power a pump that draws water from a source and delivers it through a network of tubes and emitters. This approach can reduce water waste by up to 60% compared to traditional irrigation methods. The system is particularly suitable for smallholder farmers in off-grid areas, providing a sustainable solution for water-scarce regions. The technology has been successfully implemented in Ethiopia, Kenya, and other African countries, with farmers reporting yield increases of 30-50%.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        source: "Ethiopian Institute of Agricultural Research",
        sourceUrl: "#",
        publicationDate: "2026-07-15",
        relatedCrops: ["Vegetables", "Fruits", "Maize"],
        benefits: ["Water efficiency up to 60%", "Reduced labor", "Solar-powered (off-grid)", "Increased yields 30-50%"],
        suitableFor: ["Smallholder farmers", "Water-scarce regions", "Off-grid areas"],
        featured: true
    },
    {
        id: "AI002",
        title: "Smart Soil Moisture Sensors",
        category: "Soil Technology",
        description: "Wireless soil moisture sensors that provide real-time data to farmers, enabling precise irrigation decisions.",
        fullDescription: "Smart soil moisture sensors are wireless devices placed in the soil at various depths to measure moisture content. The sensors transmit real-time data to a mobile application or web dashboard, allowing farmers to make informed decisions about when and how much to irrigate. This technology helps prevent both over-irrigation and under-irrigation, optimizing water use and improving crop health. The system also includes temperature sensors and can be integrated with weather data to provide comprehensive irrigation recommendations.",
        location: "Global",
        image: "https://images.unsplash.com/photo-1574726100531-e7dfd0ca80e6?w=800",
        source: "FAO",
        sourceUrl: "#",
        publicationDate: "2026-06-28",
        relatedCrops: ["All Crops"],
        benefits: ["Real-time data", "Optimized water use", "Reduced waste", "Improved crop health"],
        suitableFor: ["Commercial farmers", "Irrigation management"],
        featured: false
    },
    {
        id: "AI003",
        title: "Agricultural Drone for Crop Monitoring",
        category: "Crop Monitoring",
        description: "Drones equipped with multispectral cameras that monitor crop health, identify stress, and detect pests early.",
        fullDescription: "Agricultural drones equipped with multispectral cameras and sensors provide farmers with detailed aerial imagery of their fields. The technology can detect crop stress, nutrient deficiencies, pest infestations, and disease outbreaks before they become visible to the naked eye. Drones can cover large areas quickly, providing data that helps farmers make targeted interventions, reducing input costs and improving yields. The technology is increasingly being adopted in Ethiopia for monitoring coffee and cereal crops.",
        location: "Global",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800",
        source: "FAO",
        sourceUrl: "#",
        publicationDate: "2026-06-20",
        relatedCrops: ["Coffee", "Maize", "Wheat"],
        benefits: ["Early pest detection", "Efficient monitoring", "Reduced inputs", "Improved yields"],
        suitableFor: ["Large farms", "Cooperative farms", "Coffee plantations"],
        featured: false
    },
    {
        id: "AI004",
        title: "Greenhouse Climate Control System",
        category: "Greenhouse",
        description: "An automated climate control system for greenhouses that regulates temperature, humidity, and ventilation.",
        fullDescription: "Automated greenhouse climate control systems use sensors and actuators to maintain optimal growing conditions. The system monitors temperature, humidity, CO2 levels, and light intensity, automatically adjusting ventilation, heating, and shading to create the ideal environment for crops. This technology enables year-round production, protects crops from adverse weather, and can increase yields by up to 50%. The system can be powered by solar energy and controlled remotely via smartphone applications.",
        location: "Global",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800",
        source: "Agricultural Technology Journal",
        sourceUrl: "#",
        publicationDate: "2026-06-10",
        relatedCrops: ["Vegetables", "Fruits", "Herbs"],
        benefits: ["Year-round production", "Increased yields up to 50%", "Weather protection", "Resource efficiency"],
        suitableFor: ["Commercial growers", "Research stations", "Urban farming"],
        featured: false
    },
    {
        id: "AI005",
        title: "Solar Grain Dryer Technology",
        category: "Post-Harvest",
        description: "A solar-powered grain dryer that reduces post-harvest losses by drying crops efficiently and hygienically.",
        fullDescription: "Solar grain dryers use solar energy to dry harvested crops, reducing moisture content to safe storage levels. The technology prevents spoilage, mold growth, and insect infestation, significantly reducing post-harvest losses. The dryers are designed to be simple and affordable, making them accessible to smallholder farmers. In Ethiopia, solar grain dryers have been shown to reduce post-harvest losses by up to 80%, improving food security and farmer incomes.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800",
        source: "Ethiopian Agricultural Transformation Agency",
        sourceUrl: "#",
        publicationDate: "2026-06-05",
        relatedCrops: ["Maize", "Wheat", "Sorghum"],
        benefits: ["Reduced post-harvest losses up to 80%", "Improved grain quality", "Solar-powered", "Affordable"],
        suitableFor: ["Smallholder farmers", "Rural communities"],
        featured: false
    },
    {
        id: "AI006",
        title: "Precision Fertilizer Application Technology",
        category: "Smart Farming",
        description: "Technology that applies fertilizer precisely based on soil nutrient analysis and crop requirements.",
        fullDescription: "Precision fertilizer application technology uses soil sensors, GPS, and data analytics to apply fertilizer exactly where and when it is needed. This approach reduces fertilizer waste, lowers input costs, and minimizes environmental impact. The technology creates variable-rate application maps that account for soil variability across the field, ensuring each area receives the optimal nutrient mix. This approach can reduce fertilizer use by 20-40% while maintaining or increasing yields.",
        location: "Global",
        image: "https://images.unsplash.com/photo-1535431234501-4cfe3b88ed6e?w=800",
        source: "IFDC",
        sourceUrl: "#",
        publicationDate: "2026-05-28",
        relatedCrops: ["All Crops"],
        benefits: ["Reduced fertilizer waste 20-40%", "Lower input costs", "Environmental protection", "Maintained/increased yields"],
        suitableFor: ["Commercial farmers", "Large-scale farming"],
        featured: false
    },
    {
        id: "AI007",
        title: "Mobile App for Pest Identification",
        category: "Crop Monitoring",
        description: "A mobile application that uses AI to identify crop pests and diseases from photos taken by farmers.",
        fullDescription: "Mobile apps for pest identification use artificial intelligence and image recognition to help farmers identify crop pests and diseases. Farmers can take a photo of the affected plant using their smartphone, and the app provides an instant diagnosis along with recommended control measures. This technology is particularly valuable for smallholder farmers who may not have access to agricultural extension services. The app can work offline, making it useful in areas with limited internet connectivity.",
        location: "Africa",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        source: "CABI",
        sourceUrl: "#",
        publicationDate: "2026-05-20",
        relatedCrops: ["Maize", "Wheat", "Coffee", "Vegetables"],
        benefits: ["Instant diagnosis", "Accessible to smallholders", "Offline capability", "Reduced crop losses"],
        suitableFor: ["Smallholder farmers", "Rural communities"],
        featured: false
    },
    {
        id: "AI008",
        title: "Conservation Agriculture Techniques",
        category: "Climate-Smart",
        description: "Farming techniques that minimize soil disturbance, maintain soil cover, and promote crop diversity.",
        fullDescription: "Conservation agriculture is a farming approach based on three principles: minimum soil disturbance (no-till farming), permanent soil cover (using cover crops or crop residues), and crop diversity (rotating crops). This approach improves soil health, reduces erosion, conserves water, and increases resilience to climate change. Conservation agriculture has been successfully adopted by farmers in Ethiopia, with studies showing increased yields of 20-30% and reduced production costs.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        source: "Ethiopian Institute of Agricultural Research",
        sourceUrl: "#",
        publicationDate: "2026-05-15",
        relatedCrops: ["Teff", "Wheat", "Maize"],
        benefits: ["Improved soil health", "Reduced erosion", "Water conservation", "Climate resilience"],
        suitableFor: ["Smallholder farmers", "All farming systems"],
        featured: false
    },
    {
        id: "AI009",
        title: "Smart Greenhouse with IoT Sensors",
        category: "Greenhouse",
        description: "A greenhouse equipped with IoT sensors that monitor and control growing conditions automatically.",
        fullDescription: "Smart greenhouses use IoT (Internet of Things) technology to monitor and control environmental conditions automatically. Sensors measure temperature, humidity, light, soil moisture, and nutrient levels, with data transmitted to a central system that adjusts conditions as needed. This technology enables precision agriculture in controlled environments, optimizing plant growth and resource use. Smart greenhouses can be connected to weather stations to anticipate environmental changes and respond proactively.",
        location: "Global",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
        source: "Agricultural Technology Journal",
        sourceUrl: "#",
        publicationDate: "2026-05-10",
        relatedCrops: ["Vegetables", "Fruits", "Herbs"],
        benefits: ["Optimal growing conditions", "Resource efficiency", "Remote monitoring", "Proactive management"],
        suitableFor: ["Commercial growers", "Research stations"],
        featured: false
    },
    {
        id: "AI010",
        title: "Drip Irrigation Kits for Smallholders",
        category: "Irrigation",
        description: "Affordable drip irrigation kits designed specifically for smallholder farmers in developing countries.",
        fullDescription: "Affordable drip irrigation kits are designed specifically for smallholder farmers, providing a low-cost, easy-to-use irrigation solution. The kits include a water tank, filter, tubing, and drip emitters, all packaged for simple installation and maintenance. These systems can increase water efficiency by up to 70% compared to traditional irrigation methods and can double or triple crop yields. The kits are available in various sizes to suit different farm sizes and budgets.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1573995101240-cb37b974802c?w=800",
        source: "International Water Management Institute",
        sourceUrl: "#",
        publicationDate: "2026-05-05",
        relatedCrops: ["Vegetables", "Fruits", "Coffee"],
        benefits: ["70% water efficiency", "Affordable", "Easy to install", "Increased yields 2-3x"],
        suitableFor: ["Smallholder farmers", "Water-scarce regions"],
        featured: false
    },
    {
        id: "AI011",
        title: "Mobile-Based Market Information System",
        category: "Smart Farming",
        description: "A mobile platform that provides farmers with real-time market prices and agricultural information.",
        fullDescription: "Mobile-based market information systems provide farmers with real-time data on market prices, weather forecasts, and agricultural best practices. The platform connects farmers directly with buyers, reducing information asymmetry and enabling farmers to get better prices for their produce. The system also provides alerts on market trends, helping farmers make informed decisions about when and where to sell. In Ethiopia, similar platforms have helped farmers increase their incomes by 15-25%.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        source: "Ethiopian Agricultural Transformation Agency",
        sourceUrl: "#",
        publicationDate: "2026-04-28",
        relatedCrops: ["All Crops"],
        benefits: ["Better prices", "Market access", "Real-time data", "Informed decisions"],
        suitableFor: ["All farmers", "Smallholder farmers"],
        featured: false
    },
    {
        id: "AI012",
        title: "Solar Water Pump for Agriculture",
        category: "Renewable Energy",
        description: "Solar-powered water pumps that provide reliable irrigation for off-grid farming communities.",
        fullDescription: "Solar water pumps use photovoltaic panels to power pumps that lift water from wells, rivers, or reservoirs for irrigation. The technology provides a reliable, sustainable water source for off-grid farming communities, eliminating dependence on diesel or grid electricity. Solar pumps are cost-effective in the long term, requiring minimal maintenance and having no fuel costs. In Ethiopia, solar water pumps have been deployed in remote areas, enabling farmers to irrigate crops year-round.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        source: "World Bank",
        sourceUrl: "#",
        publicationDate: "2026-04-20",
        relatedCrops: ["All Crops"],
        benefits: ["Sustainable irrigation", "No fuel costs", "Low maintenance", "Year-round farming"],
        suitableFor: ["Off-grid communities", "Rural areas"],
        featured: false
    },
    {
        id: "AI013",
        title: "Biodegradable Mulch Film",
        category: "Research",
        description: "Biodegradable mulch film that suppresses weeds, retains soil moisture, and breaks down naturally.",
        fullDescription: "Biodegradable mulch films are made from plant-based materials that break down naturally in the soil after the growing season. The films suppress weed growth, retain soil moisture, and regulate soil temperature, improving crop performance. Unlike traditional plastic mulch films that need to be removed and can cause environmental pollution, biodegradable films decompose without leaving harmful residues. Research trials in Ethiopia have shown promising results for vegetable production.",
        location: "Global",
        image: "https://images.unsplash.com/photo-1535431234501-4cfe3b88ed6e?w=800",
        source: "Agricultural Research Institute",
        sourceUrl: "#",
        publicationDate: "2026-04-15",
        relatedCrops: ["Vegetables", "Fruits"],
        benefits: ["Weed suppression", "Moisture retention", "No residue", "Environmental friendly"],
        suitableFor: ["All farming systems", "Organic farming"],
        featured: false
    },
    {
        id: "AI014",
        title: "Cold Storage Technology for Perishable Crops",
        category: "Post-Harvest",
        description: "Affordable cold storage solutions that extend the shelf life of perishable crops and reduce waste.",
        fullDescription: "Cold storage technology provides affordable, efficient cooling for perishable crops, extending shelf life and reducing post-harvest losses. The technology includes solar-powered cold rooms and evaporative cooling systems that can be used in off-grid areas. These solutions are designed for smallholder farmers and cooperatives, enabling them to store produce longer and sell at better prices. In Ethiopia, cold storage has significantly reduced losses for fruit and vegetable farmers.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800",
        source: "International Food Policy Research Institute",
        sourceUrl: "#",
        publicationDate: "2026-04-10",
        relatedCrops: ["Fruits", "Vegetables"],
        benefits: ["Extended shelf life", "Reduced waste", "Better prices", "Solar-powered options"],
        suitableFor: ["Smallholder farmers", "Cooperatives"],
        featured: false
    },
    {
        id: "AI015",
        title: "Weather-Based Crop Advisory System",
        category: "Climate-Smart",
        description: "An agricultural advisory system that uses weather data to provide crop-specific recommendations to farmers.",
        fullDescription: "Weather-based crop advisory systems combine meteorological data with crop models to provide farmers with personalized recommendations. Farmers receive information on optimal planting dates, irrigation scheduling, fertilizer application timing, and pest management based on current and forecast weather conditions. The system helps farmers adapt to climate variability and reduce weather-related risks. The technology has been developed with support from CGIAR and is being tested in Ethiopia.",
        location: "Ethiopia",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
        source: "CGIAR",
        sourceUrl: "#",
        publicationDate: "2026-04-05",
        relatedCrops: ["Maize", "Wheat", "Teff"],
        benefits: ["Risk reduction", "Optimized decisions", "Climate adaptation", "Increased yields"],
        suitableFor: ["All farmers", "Climate-vulnerable regions"],
        featured: false
    }
];

// ============================================================
// 2. APPLICATION STATE
// ============================================================

const state = {
    allInnovations: [...innovationsData],
    filteredInnovations: [],
    currentCategory: 'all',
    currentLocation: 'all',
    searchTerm: '',
    currentPage: 1,
    itemsPerPage: 9,
    detailOpen: false
};

// ============================================================
// 3. DOM REFERENCES
// ============================================================

const dom = {
    grid: document.getElementById('innovationGrid'),
    search: document.getElementById('searchInput'),
    resultsCount: document.getElementById('resultsCount'),
    filterContainer: document.getElementById('filterContainer'),
    locationButtons: document.querySelectorAll('.location-btn'),
    featuredCard: document.getElementById('featuredCard'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    emptyState: document.getElementById('emptyState'),
    detailView: document.getElementById('detailView'),
    detailOverlay: document.getElementById('detailOverlay'),
    detailPanel: document.getElementById('detailPanel'),
    detailContent: document.getElementById('detailContent'),
    detailClose: document.getElementById('detailCloseBtn')
};

// ============================================================
// 4. HELPER FUNCTIONS
// ============================================================

function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function getTimeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return formatDate(dateString);
}

function getCategorySlug(category) {
    return category.toLowerCase().replace(/\s+/g, '-');
}

function getCategoryDisplay(category) {
    const map = {
        'smart-farming': 'Smart Farming',
        'irrigation': 'Irrigation',
        'machinery': 'Machinery',
        'soil-technology': 'Soil Technology',
        'crop-monitoring': 'Crop Monitoring',
        'renewable-energy': 'Renewable Energy',
        'climate-smart': 'Climate-Smart',
        'post-harvest': 'Post-Harvest',
        'greenhouse': 'Greenhouse',
        'research': 'Research'
    };
    return map[category] || category;
}

// ============================================================
// 5. RENDER FUNCTIONS
// ============================================================

function renderFeatured(innovations) {
    const featured = innovations.find(i => i.featured === true) || innovations[0];
    if (!featured) {
        dom.featuredCard.innerHTML = '';
        return;
    }
    
    dom.featuredCard.innerHTML = `
        <img class="featured-bg" src="${featured.image}" alt="${featured.title}" onerror="this.style.display='none'">
        <div class="featured-overlay"></div>
        <div class="featured-content">
            <span class="featured-tag">Featured Innovation</span>
            <h2 class="featured-title">${featured.title}</h2>
            <div class="featured-meta">${featured.location} • ${featured.category}</div>
            <p class="featured-summary">${featured.description}</p>
            <button class="featured-btn" data-id="${featured.id}">Explore Innovation</button>
        </div>
    `;
    
    dom.featuredCard.querySelector('.featured-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        openDetail(id);
    });
    
    dom.featuredCard.addEventListener('click', function() {
        const id = featured.id;
        openDetail(id);
    });
}

function renderCard(innovation) {
    const categoryDisplay = innovation.category;
    const date = getTimeAgo(innovation.publicationDate);
    const imageUrl = innovation.image || null;
    
    return `
        <div class="innovation-card" data-id="${innovation.id}">
            <div class="innovation-card-image">
                ${imageUrl ? 
                    `<img src="${imageUrl}" alt="${innovation.title}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\\'placeholder-text\\'>Agricultural innovation photograph</span>'">` :
                    `<span class="placeholder-text">Agricultural innovation photograph</span>`
                }
            </div>
            <div class="innovation-card-body">
                <div class="innovation-card-tags">
                    <span class="category-tag">${categoryDisplay}</span>
                    <span class="location-tag">${innovation.location}</span>
                </div>
                <h3 class="innovation-card-title">${innovation.title}</h3>
                <p class="innovation-card-summary">${innovation.description}</p>
                <div class="innovation-card-meta">
                    <span class="source">${innovation.source}</span>
                    <span class="date">${date}</span>
                </div>
                <button class="learn-more-btn" data-id="${innovation.id}">Learn More</button>
            </div>
        </div>
    `;
}

function renderGrid(innovations) {
    if (innovations.length === 0) {
        dom.grid.innerHTML = '';
        dom.emptyState.style.display = 'block';
        dom.resultsCount.textContent = 'Showing 0 innovations';
        dom.loadMoreContainer.style.display = 'none';
        return;
    }
    
    dom.emptyState.style.display = 'none';
    
    const start = 0;
    const end = state.currentPage * state.itemsPerPage;
    const visibleInnovations = innovations.slice(start, end);
    
    if (state.currentPage === 1) {
        dom.grid.innerHTML = visibleInnovations.map(i => renderCard(i)).join('');
    } else {
        const newCards = visibleInnovations.slice(-state.itemsPerPage).map(i => renderCard(i)).join('');
        dom.grid.insertAdjacentHTML('beforeend', newCards);
    }
    
    dom.resultsCount.textContent = `Showing ${visibleInnovations.length} of ${innovations.length} innovations`;
    
    if (innovations.length > visibleInnovations.length) {
        dom.loadMoreContainer.style.display = 'block';
        dom.loadMoreBtn.disabled = false;
    } else {
        dom.loadMoreContainer.style.display = 'none';
    }
    
    document.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            openDetail(id);
        });
    });
    
    document.querySelectorAll('.innovation-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            openDetail(id);
        });
    });
}

// ============================================================
// 6. FILTER & SEARCH FUNCTIONS
// ============================================================

function applyFilters() {
    const searchTerm = state.searchTerm.toLowerCase().trim();
    const category = state.currentCategory;
    const location = state.currentLocation;
    
    let results = state.allInnovations.filter(innovation => {
        // Search filter
        if (searchTerm) {
            const searchText = (innovation.title || '') + ' ' + 
                             (innovation.description || '') + ' ' +
                             (innovation.fullDescription || '') + ' ' +
                             (innovation.category || '') + ' ' +
                             (innovation.location || '') + ' ' +
                             (innovation.relatedCrops || []).join(' ') + ' ' +
                             (innovation.benefits || []).join(' ') + ' ' +
                             (innovation.suitableFor || []).join(' ');
            if (!searchText.toLowerCase().includes(searchTerm)) return false;
        }
        
        // Category filter
        if (category !== 'all') {
            const categorySlug = getCategorySlug(innovation.category);
            if (categorySlug !== category) return false;
        }
        
        // Location filter
        if (location !== 'all') {
            const innovationLocation = innovation.location.toLowerCase();
            if (location === 'ethiopia' && !innovationLocation.includes('ethiopia')) return false;
            if (location === 'africa' && !innovationLocation.includes('africa') && !innovationLocation.includes('ethiopia')) return false;
            if (location === 'global' && innovationLocation.includes('global')) {
                // Keep global ones
            } else if (location === 'global' && innovationLocation.includes('ethiopia')) {
                // Ethiopia is not global, but we want to keep it if it's relevant
                // For simplicity, only show items that specifically say 'Global' or have global scope
                if (!innovationLocation.includes('global') && !innovation.fullDescription.toLowerCase().includes('global')) {
                    // If it doesn't mention global, skip for global filter
                    return false;
                }
            }
        }
        
        return true;
    });
    
    state.filteredInnovations = results;
    state.currentPage = 1;
    renderGrid(results);
    renderFeatured(results);
}

function updateActiveFilter(selectedFilter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === selectedFilter);
    });
}

function updateActiveLocation(selectedLocation) {
    dom.locationButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-location') === selectedLocation);
    });
}

// ============================================================
// 7. DETAIL VIEW FUNCTIONS
// ============================================================

function openDetail(id) {
    const innovation = state.allInnovations.find(i => i.id === id);
    if (!innovation) return;
    
    state.detailOpen = true;
    
    const date = formatDate(innovation.publicationDate);
    const benefits = innovation.benefits || [];
    const suitableFor = innovation.suitableFor || [];
    const relatedCrops = innovation.relatedCrops || [];
    const imageUrl = innovation.image || null;
    
    dom.detailContent.innerHTML = `
        <div class="detail-image">
            ${imageUrl ? 
                `<img src="${imageUrl}" alt="${innovation.title}" onerror="this.parentElement.innerHTML='<span class=\\'placeholder-text\\'>Image not available</span>'">` :
                `<span class="placeholder-text">Image not available</span>`
            }
        </div>
        
        <div class="detail-meta">
            ${innovation.source ? `<span class="meta-source">${innovation.source}</span>` : ''}
            ${date ? `<span>${date}</span>` : ''}
            ${innovation.location ? `<span>${innovation.location}</span>` : ''}
            ${innovation.category ? `<span class="meta-category">${innovation.category}</span>` : ''}
            <span class="tech-indicator">Technology</span>
        </div>
        
        <h2 class="detail-title">${innovation.title}</h2>
        
        <div class="detail-section">
            <h4 class="detail-section-title">What is it?</h4>
            <div class="detail-section-content">
                <p>${innovation.fullDescription || innovation.description}</p>
            </div>
        </div>
        
        ${relatedCrops.length > 0 ? `
            <div class="detail-section">
                <h4 class="detail-section-title">Related Crops</h4>
                <div class="detail-section-content">
                    ${relatedCrops.map(crop => `<span class="tag highlight">${crop}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        
        ${benefits.length > 0 ? `
            <div class="detail-section">
                <h4 class="detail-section-title">Benefits</h4>
                <div class="detail-section-content">
                    ${benefits.map(benefit => `<span class="tag tech">${benefit}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        
        ${suitableFor.length > 0 ? `
            <div class="detail-section">
                <h4 class="detail-section-title">Suitable For</h4>
                <div class="detail-section-content">
                    ${suitableFor.map(suit => `<span class="tag">${suit}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        
        ${innovation.sourceUrl && innovation.sourceUrl !== '#' ? `
            <div class="detail-section">
                <h4 class="detail-section-title">Source</h4>
                <div class="detail-section-content">
                    <a href="${innovation.sourceUrl}" target="_blank" class="detail-source-link" style="color:#18A66A;font-weight:600;text-decoration:none;border-bottom:2px solid #18A66A;padding-bottom:2px;">
                        Visit source →
                    </a>
                </div>
            </div>
        ` : ''}
        
        <button class="detail-back-btn" id="detailBackBtn">← Back to Innovations</button>
    `;
    
    dom.detailView.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    document.getElementById('detailBackBtn').addEventListener('click', closeDetail);
}

function closeDetail() {
    state.detailOpen = false;
    dom.detailView.style.display = 'none';
    document.body.style.overflow = '';
}

// ============================================================
// 8. LOAD MORE FUNCTION
// ============================================================

function loadMore() {
    state.currentPage++;
    renderGrid(state.filteredInnovations);
}

// ============================================================
// 9. INITIALIZATION
// ============================================================

function init() {
    state.filteredInnovations = [...state.allInnovations];
    renderFeatured(state.filteredInnovations);
    renderGrid(state.filteredInnovations);
}

// ============================================================
// 10. EVENT LISTENERS
// ============================================================

// Search
dom.search.addEventListener('input', function() {
    state.searchTerm = this.value;
    applyFilters();
});

// Category filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        state.currentCategory = filter;
        updateActiveFilter(filter);
        applyFilters();
    });
});

// Location filter buttons
dom.locationButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        state.currentLocation = location;
        updateActiveLocation(location);
        applyFilters();
    });
});

// Load more
dom.loadMoreBtn.addEventListener('click', loadMore);

// Detail close
dom.detailClose.addEventListener('click', closeDetail);
dom.detailOverlay.addEventListener('click', closeDetail);

// Keyboard shortcut
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (state.detailOpen) closeDetail();
    }
});

// ============================================================
// 11. START APPLICATION
// ============================================================

document.addEventListener('DOMContentLoaded', init);