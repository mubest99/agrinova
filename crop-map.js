/**
 * AgriNova · Ethiopian Crop Map
 * Complete interactive map functionality
 * Data sources: ESS, EthioNSIS, EMI, MoA, ECX
 */

(function() {
    'use strict';

    // ================================================================
    //  DATA — from the provided catalog
    // ================================================================

    const REGIONS_DATA = [{
        id: 'ET-AF',
        name: 'Afar Region',
        capital: 'Semera',
        elevation: '150 – 1,000 m',
        climate: 'Hyper-Arid / Semi-Arid',
        coords: '11.7559° N, 40.9587° E',
        primaryCrop: 'Sorghum (Irrigated)',
        cultivatedArea: '22,000 ha',
        production: '48,000 t',
        yield: '2.18 t/ha',
        season: 'Irrigation / Meher',
        soil: 'Fluvisols / Calcisols',
        soilChars: 'Saline, alluvial along Awash River; coarse texture',
        soilSuitability: 'Irrigated Cotton, Sugarcane, Sorghum',
        temp: '29°C – 42°C',
        rainfall: '200 – 400 mm',
        humidity: '25% – 40%',
        droughtRisk: 'High Extreme Heat / Drought',
        marketHubs: 'Semera Market Hub',
        targetMarkets: 'Local / Rift Valley corridor',
        tradeVolume: 'Quintals'
    }, {
        id: 'ET-AM',
        name: 'Amhara Region',
        capital: 'Bahir Dar',
        elevation: '1,200 – 4,533 m',
        climate: 'Highland / Temperate (Dega/Weyna Dega)',
        coords: '11.3494° N, 37.9785° E',
        primaryCrop: 'Teff',
        cultivatedArea: '1,150,000 ha',
        production: '2,100,000 t',
        yield: '1.83 t/ha',
        season: 'Meher Season',
        soil: 'Vertisols / Luvisols',
        soilChars: 'Heavy dark clay ("black soils"), waterlogging risk',
        soilSuitability: 'High suitability for Teff, Wheat, Chickpea',
        temp: '14°C – 23°C',
        rainfall: '1,300 – 1,700 mm',
        humidity: '70% – 80%',
        droughtRisk: 'Low / Moderate Risk',
        marketHubs: 'Bahir Dar / Gondar / Humera',
        targetMarkets: 'Addis Ababa / Export Market',
        tradeVolume: 'Quintals / Metric Tonnes'
    }, {
        id: 'ET-BE',
        name: 'Benishangul-Gumuz Region',
        capital: 'Asosa',
        elevation: '600 – 1,500 m',
        climate: 'Tropical / Humid Savanna',
        coords: '10.0652° N, 34.5322° E',
        primaryCrop: 'Sesame',
        cultivatedArea: '180,000 ha',
        production: '195,000 t',
        yield: '1.08 t/ha',
        season: 'Meher Season',
        soil: 'Nitisols / Cambisols',
        soilChars: 'Deep red, moderately acidic, high clay content',
        soilSuitability: 'Excellent for Sesame, Sorghum, Soybean',
        temp: '20°C – 31°C',
        rainfall: '1,200 – 1,600 mm',
        humidity: '65% – 80%',
        droughtRisk: 'Low Risk',
        marketHubs: 'Asosa Market / Metekel Hub',
        targetMarkets: 'Central Processing / Export',
        tradeVolume: 'Metric Tonnes'
    }, {
        id: 'ET-CE',
        name: 'Central Ethiopia Regional State',
        capital: 'Hosaena / Wolkite',
        elevation: '1,600 – 2,900 m',
        climate: 'Weyna Dega (Midland Highland)',
        coords: '7.6667° N, 38.0000° E',
        primaryCrop: 'Enset / Wheat',
        cultivatedArea: '280,000 ha',
        production: '920,000 t',
        yield: '3.28 t/ha',
        season: 'Meher Season',
        soil: 'Vertisols / Nitisols',
        soilChars: 'High organic matter, clay-rich, variable drainage',
        soilSuitability: 'Wheat, Enset, Pulses, Teff',
        temp: '13°C – 22°C',
        rainfall: '1,200 – 1,600 mm',
        humidity: '65% – 80%',
        droughtRisk: 'Moderate Risk',
        marketHubs: 'Hosaena / Wolkite Markets',
        targetMarkets: 'Addis Ababa / Local Processing',
        tradeVolume: 'Quintals'
    }, {
        id: 'ET-GA',
        name: 'Gambela Region',
        capital: 'Gambela',
        elevation: '300 – 800 m',
        climate: 'Hot Humid Lowland',
        coords: '7.9220° N, 34.5888° E',
        primaryCrop: 'Maize',
        cultivatedArea: '45,000 ha',
        production: '110,000 t',
        yield: '2.44 t/ha',
        season: 'Meher Season',
        soil: 'Fluvisols / Gleysols',
        soilChars: 'Deep, fertile alluvial sediments along Baro-Akobo',
        soilSuitability: 'Rice, Maize, Commercial Cash Crops',
        temp: '24°C – 38°C',
        rainfall: '1,000 – 1,300 mm',
        humidity: '60% – 75%',
        droughtRisk: 'Moderate Heat / Flood Risk',
        marketHubs: 'Gambela Town Market',
        targetMarkets: 'Local / South Sudan Border',
        tradeVolume: 'Quintals'
    }, {
        id: 'ET-HA',
        name: 'Harari Region',
        capital: 'Harar',
        elevation: '1,800 – 2,200 m',
        climate: 'Semi-Arid Highland',
        coords: '9.3149° N, 42.1224° E',
        primaryCrop: 'Sorghum / Khat',
        cultivatedArea: '18,000 ha',
        production: '28,000 t',
        yield: '1.55 t/ha',
        season: 'Annual Harvest',
        soil: 'Regosols / Cambisols',
        soilChars: 'Shallow, well-drained, sandy-clay loam',
        soilSuitability: 'Sorghum, Groundnut, Khat',
        temp: '16°C – 28°C',
        rainfall: '700 – 900 mm',
        humidity: '45% – 60%',
        droughtRisk: 'Moderate / High Risk',
        marketHubs: 'Harar / Erer Markets',
        targetMarkets: 'Dire Dawa / Somali Region / Export',
        tradeVolume: 'Bundles / Quintals'
    }, {
        id: 'ET-OR',
        name: 'Oromia Region',
        capital: 'Addis Ababa',
        elevation: '1,500 – 3,000 m',
        climate: 'Sub-humid to Humid',
        coords: '7.5460° N, 40.6347° E',
        primaryCrop: 'Maize',
        cultivatedArea: '1,050,000 ha',
        production: '4,200,000 t',
        yield: '4.00 t/ha',
        season: 'Meher Season',
        soil: 'Nitisols / Vertisols',
        soilChars: 'Deep red soils, high organic fertility in highlands',
        soilSuitability: 'Ideal for Maize, Wheat, Coffee, Teff',
        temp: '15°C – 28°C',
        rainfall: '1,200 – 1,900 mm',
        humidity: '60% – 80%',
        droughtRisk: 'Moderate / Low Risk',
        marketHubs: 'Adama / Jimma / Shashamane',
        targetMarkets: 'ECX / Addis Ababa / Export',
        tradeVolume: 'Tonnes / ECX Bags'
    }, {
        id: 'ET-SI',
        name: 'Sidama Region',
        capital: 'Hawassa',
        elevation: '1,500 – 2,500 m',
        climate: 'Sub-humid Midland (Weyna Dega)',
        coords: '6.8160° N, 38.4824° E',
        primaryCrop: 'Coffee',
        cultivatedArea: '110,000 ha',
        production: '85,000 t',
        yield: '0.77 t/ha',
        season: 'Annual Harvest',
        soil: 'Nitisols / Luvisols',
        soilChars: 'Fertile, well-structured, reddish-brown clay',
        soilSuitability: 'High potential for Coffee, Enset, Fruits',
        temp: '15°C – 27°C',
        rainfall: '1,000 – 1,400 mm',
        humidity: '60% – 75%',
        droughtRisk: 'Low / Moderate Risk',
        marketHubs: 'Hawassa / Yirgalem (IAIP)',
        targetMarkets: 'Addis Ababa ECX / Export',
        tradeVolume: 'Bags (60kg) / Tonnes'
    }, {
        id: 'ET-SO',
        name: 'Somali Region',
        capital: 'Jijiga',
        elevation: '500 – 1,500 m',
        climate: 'Arid / Pastoral Lowland',
        coords: '6.6612° N, 43.7908° E',
        primaryCrop: 'Sorghum',
        cultivatedArea: '85,000 ha',
        production: '135,000 t',
        yield: '1.58 t/ha',
        season: 'Gu / Deyr Seasons',
        soil: 'Yermosols / Gypsisols',
        soilChars: 'Sandy, dry, saline, low organic content',
        soilSuitability: 'Pastoral grazing; limited irrigated Sorghum',
        temp: '22°C – 34°C',
        rainfall: '400 – 600 mm',
        humidity: '35% – 50%',
        droughtRisk: 'High Drought Vulnerability',
        marketHubs: 'Jijiga / Tog Wajale',
        targetMarkets: 'Somaliland / Gulf Export',
        tradeVolume: 'Heads / Quintals'
    }, {
        id: 'ET-SE',
        name: 'South Ethiopia Regional State',
        capital: 'Wolaita Sodo',
        elevation: '1,200 – 2,800 m',
        climate: 'Agroforestry / Highland',
        coords: '6.8550° N, 37.7808° E',
        primaryCrop: 'Maize',
        cultivatedArea: '310,000 ha',
        production: '890,000 t',
        yield: '2.87 t/ha',
        season: 'Belg / Meher Season',
        soil: 'Nitisols / Acrisols',
        soilChars: 'Fertile, acidic, high organic carbon content',
        soilSuitability: 'Agroforestry, Coffee, Root crops, Maize',
        temp: '16°C – 26°C',
        rainfall: '1,100 – 1,500 mm',
        humidity: '60% – 75%',
        droughtRisk: 'Moderate Risk',
        marketHubs: 'Sodo / Dilla Markets',
        targetMarkets: 'Central Rift Valley Hubs',
        tradeVolume: 'Quintals'
    }, {
        id: 'ET-SW',
        name: 'South West Ethiopia Peoples\' Region',
        capital: 'Bonga',
        elevation: '1,000 – 2,700 m',
        climate: 'Dense Rainforest / Tropical Humid',
        coords: '7.2719° N, 36.2428° E',
        primaryCrop: 'Coffee',
        cultivatedArea: '220,000 ha',
        production: '185,000 t',
        yield: '0.84 t/ha',
        season: 'Annual Harvest',
        soil: 'Nitisols',
        soilChars: 'Deep, humic-rich red soils under forest cover',
        soilSuitability: 'Ideal for Rainforest Coffee, Tea, Spices',
        temp: '15°C – 24°C',
        rainfall: '1,800 – 2,200 mm',
        humidity: '80% – 92%',
        droughtRisk: 'Low Risk / High Rainfall',
        marketHubs: 'Bonga / Mizan Teferi',
        targetMarkets: 'Addis Ababa ECX / Export',
        tradeVolume: 'Metric Tonnes'
    }, {
        id: 'ET-TI',
        name: 'Tigray Region',
        capital: 'Mekelle',
        elevation: '1,500 – 3,900 m',
        climate: 'Semi-arid to Sub-humid',
        coords: '14.0323° N, 38.3166° E',
        primaryCrop: 'Sorghum',
        cultivatedArea: '380,000 ha',
        production: '910,000 t',
        yield: '2.39 t/ha',
        season: 'Meher Season',
        soil: 'Leptosols / Cambisols',
        soilChars: 'Shallow, stony, prone to soil erosion',
        soilSuitability: 'Requires terracing; Sorghum, Teff',
        temp: '16°C – 27°C',
        rainfall: '500 – 750 mm',
        humidity: '45% – 60%',
        droughtRisk: 'Moderate / High Drought Risk',
        marketHubs: 'Mekelle / Shire Markets',
        targetMarkets: 'Central Highlands',
        tradeVolume: 'Quintals'
    }, {
        id: 'ET-AA',
        name: 'Addis Ababa (Chartered City)',
        capital: 'Addis Ababa',
        elevation: '2,200 – 2,500 m',
        climate: 'Cool Highland',
        coords: '9.0300° N, 38.7400° E',
        primaryCrop: 'Urban Horticulture',
        cultivatedArea: '1,200 ha',
        production: '18,000 t',
        yield: '15.00 t/ha',
        season: 'Year-round',
        soil: 'Vertisols',
        soilChars: 'High clay, swelling properties',
        soilSuitability: 'Urban gardening, Peri-urban dairy/feed',
        temp: '12°C – 21°C',
        rainfall: '1,100 – 1,300 mm',
        humidity: '70% – 85%',
        droughtRisk: 'Low Risk',
        marketHubs: 'Merkato / Jan Meda Markets',
        targetMarkets: 'Local Metropolitan Demand',
        tradeVolume: 'Metric Tonnes'
    }, {
        id: 'ET-DD',
        name: 'Dire Dawa (Chartered City)',
        capital: 'Dire Dawa',
        elevation: '1,200 m',
        climate: 'Arid / Semi-Arid Lowland',
        coords: '9.6009° N, 41.8501° E',
        primaryCrop: 'Sorghum / Vegetables',
        cultivatedArea: '8,500 ha',
        production: '16,000 t',
        yield: '1.88 t/ha',
        season: 'Seasonal',
        soil: 'Regosols / Leptosols',
        soilChars: 'Coarse, gravelly, low moisture retention',
        soilSuitability: 'Drought-tolerant Sorghum, Vegetables',
        temp: '22°C – 35°C',
        rainfall: '500 – 700 mm',
        humidity: '35% – 50%',
        droughtRisk: 'High Aridity Risk',
        marketHubs: 'Sabian Market',
        targetMarkets: 'Eastern Corridor / Export',
        tradeVolume: 'Quintals'
    }];

    // Crop list for search
    const CROP_LIST = [
        'Teff', 'Maize', 'Sorghum', 'Wheat', 'Coffee', 'Sesame',
        'Barley', 'Enset', 'Khat', 'Horticulture', 'Pulses', 'Vegetables'
    ];

    // Map from region ID to data
    const regionMap = {};
    REGIONS_DATA.forEach(d => { regionMap[d.id] = d; });

    // Dominant crop per region (from primaryCrop)
    const dominantCropMap = {};
    REGIONS_DATA.forEach(d => {
        let crop = d.primaryCrop.split(' / ')[0].split(' (')[0];
        dominantCropMap[d.id] = crop;
    });

    // ================================================================
    //  ETHIOPIA GEOJSON — simplified boundaries
    //  In production, load this from an external GeoJSON file
    // ================================================================

    function buildEthiopiaGeoJSON() {
        function makeFeature(id, name, coords) {
            return {
                type: 'Feature',
                id: id,
                properties: { name: name, regionId: id },
                geometry: {
                    type: 'Polygon',
                    coordinates: [coords]
                }
            };
        }

        const features = [];

        // Afar
        features.push(makeFeature('ET-AF', 'Afar', [
            [40.5, 14.5],
            [42.5, 14.0],
            [43.0, 12.5],
            [42.5, 11.0],
            [41.0, 10.5],
            [40.0, 11.0],
            [39.5, 12.0],
            [40.0, 13.5],
            [40.5, 14.5]
        ]));

        // Tigray
        features.push(makeFeature('ET-TI', 'Tigray', [
            [38.0, 14.8],
            [39.5, 14.8],
            [40.5, 14.5],
            [40.0, 13.5],
            [39.5, 12.0],
            [38.5, 12.0],
            [37.5, 12.5],
            [37.0, 13.5],
            [38.0, 14.8]
        ]));

        // Amhara
        features.push(makeFeature('ET-AM', 'Amhara', [
            [36.5, 13.5],
            [37.5, 14.0],
            [38.5, 14.0],
            [39.5, 12.0],
            [39.0, 11.0],
            [38.5, 10.5],
            [37.5, 10.5],
            [36.5, 11.0],
            [36.0, 12.0],
            [36.5, 13.5]
        ]));

        // Benishangul-Gumuz
        features.push(makeFeature('ET-BE', 'Benishangul-Gumuz', [
            [34.0, 11.5],
            [35.0, 11.8],
            [36.0, 11.5],
            [36.5, 11.0],
            [35.5, 10.0],
            [34.5, 9.5],
            [34.0, 10.0],
            [33.5, 10.8],
            [34.0, 11.5]
        ]));

        // Gambela
        features.push(makeFeature('ET-GA', 'Gambela', [
            [33.5, 8.5],
            [34.5, 8.8],
            [35.0, 8.5],
            [34.5, 7.5],
            [33.8, 7.0],
            [33.0, 7.5],
            [33.5, 8.5]
        ]));

        // South West Ethiopia
        features.push(makeFeature('ET-SW', 'South West Ethiopia', [
            [35.0, 8.5],
            [36.0, 8.8],
            [37.0, 8.5],
            [36.8, 7.5],
            [36.0, 7.0],
            [35.0, 7.2],
            [34.5, 7.5],
            [35.0, 8.5]
        ]));

        // Central Ethiopia
        features.push(makeFeature('ET-CE', 'Central Ethiopia', [
            [37.0, 9.0],
            [38.0, 9.2],
            [39.0, 8.8],
            [38.8, 8.0],
            [38.0, 7.5],
            [37.0, 7.8],
            [36.8, 8.5],
            [37.0, 9.0]
        ]));

        // Oromia
        features.push(makeFeature('ET-OR', 'Oromia', [
            [37.5, 10.5],
            [39.0, 10.8],
            [41.0, 10.0],
            [42.0, 9.0],
            [41.5, 8.0],
            [40.5, 7.0],
            [39.5, 6.5],
            [38.5, 6.0],
            [37.5, 6.5],
            [36.5, 7.0],
            [36.0, 8.0],
            [36.5, 9.0],
            [37.5, 10.5]
        ]));

        // Sidama
        features.push(makeFeature('ET-SI', 'Sidama', [
            [38.0, 7.5],
            [38.8, 7.5],
            [39.0, 7.0],
            [38.8, 6.5],
            [38.0, 6.3],
            [37.5, 6.5],
            [37.5, 7.0],
            [38.0, 7.5]
        ]));

        // South Ethiopia
        features.push(makeFeature('ET-SE', 'South Ethiopia', [
            [37.0, 7.0],
            [37.8, 7.2],
            [38.0, 6.8],
            [37.8, 6.0],
            [37.0, 5.8],
            [36.5, 6.0],
            [36.5, 6.5],
            [37.0, 7.0]
        ]));

        // Somali
        features.push(makeFeature('ET-SO', 'Somali', [
            [42.0, 10.0],
            [43.5, 10.5],
            [44.5, 9.5],
            [44.0, 8.0],
            [43.0, 7.5],
            [42.5, 8.0],
            [42.0, 9.0],
            [42.0, 10.0]
        ]));

        // Harari
        features.push(makeFeature('ET-HA', 'Harari', [
            [42.0, 9.5],
            [42.3, 9.5],
            [42.4, 9.3],
            [42.2, 9.1],
            [42.0, 9.2],
            [42.0, 9.5]
        ]));

        // Addis Ababa
        features.push(makeFeature('ET-AA', 'Addis Ababa', [
            [38.6, 9.1],
            [38.8, 9.1],
            [38.9, 9.0],
            [38.8, 8.9],
            [38.6, 8.9],
            [38.6, 9.1]
        ]));

        // Dire Dawa
        features.push(makeFeature('ET-DD', 'Dire Dawa', [
            [41.7, 9.7],
            [42.0, 9.7],
            [42.1, 9.5],
            [42.0, 9.4],
            [41.7, 9.4],
            [41.7, 9.7]
        ]));

        return {
            type: 'FeatureCollection',
            features: features
        };
    }

    // ================================================================
    //  MAP CONTROLLER
    // ================================================================

    function EthiopianCropMap(containerId) {
        var self = this;

        // State
        this.currentLayer = 'default';
        this.selectedRegionId = null;
        this.currentCrop = null;
        this.geoLayer = null;
        this.overlayLayer = null;
        this.regionDataById = {};
        this.dominantCropMap = {};

        // Build lookups
        REGIONS_DATA.forEach(function(d) {
            self.regionDataById[d.id] = d;
            var crop = d.primaryCrop.split(' / ')[0].split(' (')[0];
            self.dominantCropMap[d.id] = crop;
        });

        // Initialize map
        this.map = L.map(containerId, {
            center: [8.5, 39.0],
            zoom: 6,
            minZoom: 5,
            maxZoom: 9,
            zoomControl: false
        });

        L.control.zoom({ position: 'topright' }).addTo(this.map);

        // Base tile
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap, &copy; CartoDB',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // GeoJSON data
        this.geoJSONData = buildEthiopiaGeoJSON();

        // Fit to Ethiopia
        this.map.fitBounds([
            [3.0, 33.0],
            [15.0, 48.0]
        ]);

        // Render initial map
        this.renderMap('default');

        // Set up UI bindings
        this.setupUI();

        // Handle resize
        var selfRef = this;
        window.addEventListener('resize', function() {
            selfRef.map.invalidateSize();
        });

        console.log('AgriNova Ethiopian Crop Map initialized.');
        console.log('Loaded ' + REGIONS_DATA.length + ' regions.');
        console.log('Data sources: ESS, EthioNSIS, EMI, MoA, ECX');
    }

    // ================================================================
    //  STYLES
    // ================================================================

    EthiopianCropMap.prototype.defaultStyle = function(feature) {
        return {
            fillColor: '#c6d9c0',
            weight: 2,
            opacity: 0.9,
            color: '#2E7D32',
            fillOpacity: 0.55,
            dashArray: null
        };
    };

    EthiopianCropMap.prototype.highlightStyle = function(feature) {
        return {
            fillColor: '#66BB6A',
            weight: 3,
            opacity: 1,
            color: '#164A2A',
            fillOpacity: 0.75,
            dashArray: null
        };
    };

    EthiopianCropMap.prototype.getRegionStyle = function(feature) {
        var id = feature.id || feature.properties.regionId;
        if (this.selectedRegionId === id) {
            return this.highlightStyle(feature);
        }
        return this.defaultStyle(feature);
    };

    // ================================================================
    //  RENDER MAP
    // ================================================================

    EthiopianCropMap.prototype.renderMap = function(layerType) {
        var self = this;

        // Remove existing layers
        if (this.geoLayer) {
            this.map.removeLayer(this.geoLayer);
            this.geoLayer = null;
        }
        if (this.overlayLayer) {
            this.map.removeLayer(this.overlayLayer);
            this.overlayLayer = null;
        }

        // Reset layer meta
        var metaEl = document.getElementById('layerMeta');
        if (metaEl) metaEl.textContent = '';

        // Base layer with regions
        this.geoLayer = L.geoJSON(this.geoJSONData, {
            style: function(feature) {
                return self.getRegionStyle(feature);
            },
            onEachFeature: function(feature, layer) {
                var id = feature.id || feature.properties.regionId;
                var data = self.regionDataById[id];
                if (data) {
                    layer.bindPopup(
                        '<strong>' + data.name + '</strong><br />' +
                        'Capital: ' + data.capital + '<br />' +
                        'Primary Crop: ' + data.primaryCrop + '<br />' +
                        'Production: ' + data.production + '<br />' +
                        'Click for details'
                    );
                    layer.on('click', function() {
                        self.selectRegion(id);
                    });
                    layer.on('mouseover', function() {
                        layer.setStyle({ fillOpacity: 0.8, weight: 3, color: '#164A2A' });
                        layer.bringToFront();
                    });
                    layer.on('mouseout', function() {
                        if (self.selectedRegionId !== id) {
                            layer.setStyle(self.defaultStyle(feature));
                        } else {
                            layer.setStyle(self.highlightStyle(feature));
                        }
                    });
                }
            }
        }).addTo(this.map);

        // Apply layer-specific overlays
        if (layerType === 'dominant') {
            this.applyDominantLayer();
        } else if (layerType === 'soil') {
            this.applySoilLayer();
        } else if (layerType === 'weather') {
            this.applyWeatherLayer();
        }

        // Re-highlight selected region
        if (this.selectedRegionId) {
            this.highlightRegion(this.selectedRegionId);
        }

        // Update legend
        this.updateLegend(layerType);

        // Update info panel
        if (this.selectedRegionId && !this.currentCrop) {
            this.showRegionInfo(this.selectedRegionId);
        } else if (this.currentCrop) {
            this.showCropInfo(this.currentCrop);
        } else {
            this.showEmptyPanel();
        }
    };

    // ================================================================
    //  DOMINANT PRODUCTION LAYER
    // ================================================================

    EthiopianCropMap.prototype.applyDominantLayer = function() {
        var self = this;
        var cropColors = {
            'Teff': '#D9A441',
            'Maize': '#F5C842',
            'Sorghum': '#C49A6C',
            'Wheat': '#E8C87A',
            'Coffee': '#6F4E37',
            'Sesame': '#F0E0B0',
            'Enset': '#8CB87A',
            'Khat': '#7BA05B',
            'Horticulture': '#66BB6A',
            'Urban Horticulture': '#66BB6A',
            'Vegetables': '#7CB87A'
        };
        var defaultCropColor = '#A8B5A0';

        var overlayFeatures = [];

        this.geoJSONData.features.forEach(function(f) {
            var id = f.id || f.properties.regionId;
            var data = self.regionDataById[id];
            if (!data) return;
            var crop = self.dominantCropMap[id] || 'Unknown';
            var color = cropColors[crop] || defaultCropColor;
            var coords = f.geometry.coordinates[0];
            var latSum = 0,
                lngSum = 0,
                count = 0;
            coords.forEach(function(c) {
                lngSum += c[0];
                latSum += c[1];
                count++;
            });
            overlayFeatures.push({
                lat: latSum / count,
                lng: lngSum / count,
                crop: crop,
                color: color,
                regionId: id
            });
        });

        var symbolGroup = L.layerGroup();

        overlayFeatures.forEach(function(f) {
            var circle = L.circleMarker([f.lat, f.lng], {
                radius: 18,
                fillColor: f.color,
                color: '#26332A',
                weight: 1.5,
                opacity: 0.9,
                fillOpacity: 0.85
            }).addTo(symbolGroup);

            var label = L.marker([f.lat, f.lng], {
                icon: L.divIcon({
                    className: 'dominant-label',
                    html: '<div style="font-size:10px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.5);text-align:center;line-height:1.2;pointer-events:none;width:30px;">' +
                        f.crop.substring(0, 3) + '</div>',
                    iconSize: [30, 20],
                    iconAnchor: [15, 10]
                }),
                interactive: false
            }).addTo(symbolGroup);

            var data = self.regionDataById[f.regionId];
            if (data) {
                circle.bindPopup(
                    '<strong>' + data.name + '</strong><br />' +
                    '<span style="color:' + f.color + ';font-weight:600;">●</span> Dominant: ' + f.crop + '<br />' +
                    'Production: ' + data.production + '<br />' +
                    'Area: ' + data.cultivatedArea
                );
            }
        });

        this.overlayLayer = symbolGroup;
        this.overlayLayer.addTo(this.map);

        // Color polygons
        this.geoLayer.eachLayer(function(layer) {
            var id = layer.feature.id || layer.feature.properties.regionId;
            var crop = self.dominantCropMap[id] || 'Unknown';
            var color = cropColors[crop] || defaultCropColor;
            layer.setStyle({
                fillColor: color,
                fillOpacity: 0.35,
                weight: 1.5,
                color: '#26332A',
                opacity: 0.7
            });
            if (self.selectedRegionId === id) {
                layer.setStyle({
                    fillOpacity: 0.6,
                    weight: 3,
                    color: '#164A2A'
                });
            }
        });

        var metaEl = document.getElementById('layerMeta');
        if (metaEl) metaEl.textContent = 'Dominant production • data: ESS 2025';
    };

    // ================================================================
    //  SOIL LAYER
    // ================================================================

    EthiopianCropMap.prototype.applySoilLayer = function() {
        var self = this;
        var soilColors = {
            'Fluvisols': '#A8C4A0',
            'Calcisols': '#D4C8A0',
            'Vertisols': '#8B7D6B',
            'Luvisols': '#C4B0A0',
            'Nitisols': '#B85232',
            'Cambisols': '#C8B898',
            'Regosols': '#D4C8B0',
            'Yermosols': '#E8DCC8',
            'Gypsisols': '#E0D4C0',
            'Leptosols': '#B8A898',
            'Acrisols': '#C4A080',
            'Gleysols': '#80A8B0'
        };
        var defaultSoilColor = '#C0C8B8';

        this.geoLayer.eachLayer(function(layer) {
            var id = layer.feature.id || layer.feature.properties.regionId;
            var data = self.regionDataById[id];
            if (!data) return;
            var soilKey = data.soil.split(' / ')[0];
            var color = soilColors[soilKey] || defaultSoilColor;
            layer.setStyle({
                fillColor: color,
                fillOpacity: 0.7,
                weight: 1.5,
                color: '#26332A',
                opacity: 0.6
            });
            if (self.selectedRegionId === id) {
                layer.setStyle({
                    fillOpacity: 0.85,
                    weight: 3,
                    color: '#164A2A'
                });
            }
        });

        var metaEl = document.getElementById('layerMeta');
        if (metaEl) metaEl.textContent = 'Soil types • data: EthioNSIS Database';
    };

    // ================================================================
    //  WEATHER LAYER
    // ================================================================

    EthiopianCropMap.prototype.applyWeatherLayer = function() {
        var self = this;
        var tempColors = {
            'low': '#4A90D9',
            'med': '#66BB6A',
            'high': '#D9A441',
            'veryHigh': '#D9534F'
        };

        this.geoLayer.eachLayer(function(layer) {
            var id = layer.feature.id || layer.feature.properties.regionId;
            var data = self.regionDataById[id];
            if (!data) return;
            var color = tempColors.med;
            if (data.temp) {
                var temps = data.temp.match(/\d+/g);
                if (temps) {
                    var avg = (parseInt(temps[0]) + parseInt(temps[1])) / 2;
                    if (avg < 18) color = tempColors.low;
                    else if (avg < 25) color = tempColors.med;
                    else if (avg < 30) color = tempColors.high;
                    else color = tempColors.veryHigh;
                }
            }
            layer.setStyle({
                fillColor: color,
                fillOpacity: 0.65,
                weight: 1.5,
                color: '#26332A',
                opacity: 0.6
            });
            if (self.selectedRegionId === id) {
                layer.setStyle({
                    fillOpacity: 0.85,
                    weight: 3,
                    color: '#164A2A'
                });
            }
        });

        var metaEl = document.getElementById('layerMeta');
        if (metaEl) metaEl.textContent = 'Temperature • data: EMI 2025';
    };

    // ================================================================
    //  LEGEND
    // ================================================================

    EthiopianCropMap.prototype.updateLegend = function(layerType) {
        var panel = document.getElementById('infoPanel');
        var legendHtml = '';

        if (layerType === 'dominant') {
            var crops = {};
            REGIONS_DATA.forEach(function(d) {
                var c = dominantCropMap[d.id] || 'Unknown';
                crops[c] = (crops[c] || 0) + 1;
            });
            var cropColors = {
                'Teff': '#D9A441',
                'Maize': '#F5C842',
                'Sorghum': '#C49A6C',
                'Wheat': '#E8C87A',
                'Coffee': '#6F4E37',
                'Sesame': '#F0E0B0',
                'Enset': '#8CB87A',
                'Khat': '#7BA05B',
                'Horticulture': '#66BB6A',
                'Urban Horticulture': '#66BB6A',
                'Vegetables': '#7CB87A'
            };
            legendHtml = '<div class="legend-box"><h4>Dominant Production</h4>';
            Object.keys(crops).sort().forEach(function(c) {
                var color = cropColors[c] || '#A8B5A0';
                legendHtml += '<div class="legend-item"><span class="legend-color" style="background:' +
                    color + ';"></span> ' + c + '</div>';
            });
            legendHtml +=
                '<div style="font-size:0.7rem;color:#6f8a7c;margin-top:0.4rem;">Data: ESS 2025</div></div>';
        } else if (layerType === 'soil') {
            var soilTypes = {};
            REGIONS_DATA.forEach(function(d) {
                var s = d.soil.split(' / ')[0];
                soilTypes[s] = (soilTypes[s] || 0) + 1;
            });
            var soilColors = {
                'Fluvisols': '#A8C4A0',
                'Calcisols': '#D4C8A0',
                'Vertisols': '#8B7D6B',
                'Luvisols': '#C4B0A0',
                'Nitisols': '#B85232',
                'Cambisols': '#C8B898',
                'Regosols': '#D4C8B0',
                'Yermosols': '#E8DCC8',
                'Gypsisols': '#E0D4C0',
                'Leptosols': '#B8A898',
                'Acrisols': '#C4A080',
                'Gleysols': '#80A8B0'
            };
            legendHtml = '<div class="legend-box"><h4>Soil Types</h4>';
            Object.keys(soilTypes).sort().forEach(function(s) {
                var color = soilColors[s] || '#C0C8B8';
                legendHtml += '<div class="legend-item"><span class="legend-color" style="background:' +
                    color + ';"></span> ' + s + '</div>';
            });
            legendHtml +=
                '<div style="font-size:0.7rem;color:#6f8a7c;margin-top:0.4rem;">Data: EthioNSIS</div></div>';
        } else if (layerType === 'weather') {
            legendHtml =
                '<div class="legend-box"><h4>Temperature</h4>' +
                '<div class="legend-item"><span class="legend-color" style="background:#4A90D9;"></span> Cool (&lt;18°C)</div>' +
                '<div class="legend-item"><span class="legend-color" style="background:#66BB6A;"></span> Moderate (18-25°C)</div>' +
                '<div class="legend-item"><span class="legend-color" style="background:#D9A441;"></span> Warm (25-30°C)</div>' +
                '<div class="legend-item"><span class="legend-color" style="background:#D9534F;"></span> Hot (&gt;30°C)</div>' +
                '<div style="font-size:0.7rem;color:#6f8a7c;margin-top:0.4rem;">Data: EMI 2025</div></div>';
        } else {
            legendHtml =
                '<div class="legend-box"><h4>Ethiopia Regions</h4>' +
                '<div style="font-size:0.85rem;color:#4a5a4e;">Click any region to explore agricultural data.</div>' +
                '<div style="font-size:0.7rem;color:#6f8a7c;margin-top:0.4rem;">Boundaries: ESS • Data: MoA/ESS/EMI/ECX</div></div>';
        }

        // Insert legend into panel
        var panelContent = document.getElementById('panelContent');
        var panelEmpty = document.getElementById('panelEmpty');

        if (panelContent.style.display === 'none') {
            panelEmpty.innerHTML =
                '<div style="font-size:1.4rem;margin-bottom:0.5rem;">&#128220;</div>' +
                '<p><strong>Select a region or search for a crop</strong></p>' +
                '<div style="font-size:0.85rem;color:#6f8a7c;">Current layer: ' +
                layerType.charAt(0).toUpperCase() + layerType.slice(1) + '</div>' +
                legendHtml;
            panelEmpty.style.display = 'block';
        } else {
            var existing = panelContent.innerHTML;
            if (existing.indexOf('legend-box') === -1) {
                panelContent.innerHTML = existing + legendHtml;
            }
        }
    };

    // ================================================================
    //  REGION SELECTION
    // ================================================================

    EthiopianCropMap.prototype.selectRegion = function(regionId) {
        var self = this;
        this.selectedRegionId = regionId;
        this.currentCrop = null;
        this.showRegionInfo(regionId);
        this.highlightRegion(regionId);

        if (this.geoLayer) {
            this.geoLayer.eachLayer(function(layer) {
                var id = layer.feature.id || layer.feature.properties.regionId;
                if (id === regionId) {
                    layer.setStyle(self.highlightStyle(layer.feature));
                } else {
                    layer.setStyle(self.defaultStyle(layer.feature));
                }
            });
        }

        // Fit to region
        if (this.geoLayer) {
            var targetLayer = null;
            this.geoLayer.eachLayer(function(layer) {
                var id = layer.feature.id || layer.feature.properties.regionId;
                if (id === regionId) targetLayer = layer;
            });
            if (targetLayer) {
                this.map.fitBounds(targetLayer.getBounds(), { padding: [40, 40], maxZoom: 7 });
            }
        }

        var data = this.regionDataById[regionId];
        if (data) {
            var searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = data.name;
        }
    };

    EthiopianCropMap.prototype.highlightRegion = function(regionId) {
        // Handled in selectRegion
    };

    // ================================================================
    //  INFO PANEL
    // ================================================================

    EthiopianCropMap.prototype.showRegionInfo = function(regionId) {
        var data = this.regionDataById[regionId];
        if (!data) return;

        var panelEmpty = document.getElementById('panelEmpty');
        var panelContent = document.getElementById('panelContent');
        panelEmpty.style.display = 'none';
        panelContent.style.display = 'block';

        var html =
            '<h2>' + data.name + '</h2>' +
            '<div style="font-size:0.85rem;color:#4a5a4e;margin-bottom:0.5rem;">Capital: ' + data.capital + '</div>' +
            '<div class="data-row"><span class="label">Elevation</span><span class="value">' + data.elevation +
            '</span></div>' +
            '<div class="data-row"><span class="label">Climate</span><span class="value">' + data.climate +
            '</span></div>' +
            '<div class="data-row"><span class="label">Coordinates</span><span class="value">' + data.coords +
            '</span></div>' +
            '<h3>Soil</h3>' +
            '<div class="data-row"><span class="label">Type</span><span class="value">' + data.soil + '</span></div>' +
            '<div class="data-row"><span class="label">Characteristics</span><span class="value">' + data.soilChars +
            '</span></div>' +
            '<div class="data-row"><span class="label">Suitability</span><span class="value">' + data.soilSuitability +
            '</span></div>' +
            '<h3>Agriculture</h3>' +
            '<div class="data-row"><span class="label">Primary Crop</span><span class="value">' + data.primaryCrop +
            '</span></div>' +
            '<div class="data-row"><span class="label">Cultivated Area</span><span class="value">' + data.cultivatedArea +
            '</span></div>' +
            '<div class="data-row"><span class="label">Production</span><span class="value">' + data.production +
            '</span></div>' +
            '<div class="data-row"><span class="label">Yield</span><span class="value">' + data.yield + '</span></div>' +
            '<div class="data-row"><span class="label">Season</span><span class="value">' + data.season +
            '</span></div>' +
            '<h3>Weather</h3>' +
            '<div class="data-row"><span class="label">Temperature</span><span class="value">' + data.temp +
            '</span></div>' +
            '<div class="data-row"><span class="label">Rainfall</span><span class="value">' + data.rainfall +
            '</span></div>' +
            '<div class="data-row"><span class="label">Humidity</span><span class="value">' + data.humidity +
            '</span></div>' +
            '<div class="data-row"><span class="label">Drought Risk</span><span class="value">' + data.droughtRisk +
            '</span></div>' +
            '<h3>Market</h3>' +
            '<div class="data-row"><span class="label">Trading Hubs</span><span class="value">' + data.marketHubs +
            '</span></div>' +
            '<div class="data-row"><span class="label">Target Markets</span><span class="value">' + data.targetMarkets +
            '</span></div>' +
            '<div class="data-row"><span class="label">Trade Volume</span><span class="value">' + data.tradeVolume +
            '</span></div>';

        var dominant = this.dominantCropMap[regionId] || 'Data unavailable';
        html +=
            '<h3>Dominant Production</h3>' +
            '<div class="data-row"><span class="label">Primary Product</span><span class="value" style="font-weight:700;color:#164A2A;">' +
            dominant + '</span></div>';

        html +=
            '<div class="source-note">' +
            '<strong>Data Sources:</strong> ESS, EthioNSIS, EMI, MoA, ECX<br />' +
            'Period: 2025 (various)' +
            '</div>';

        panelContent.innerHTML = html;
    };

    EthiopianCropMap.prototype.showCropInfo = function(cropName) {
        var self = this;
        var panelEmpty = document.getElementById('panelEmpty');
        var panelContent = document.getElementById('panelContent');
        panelEmpty.style.display = 'none';
        panelContent.style.display = 'block';

        var regions = REGIONS_DATA.filter(function(d) {
            return d.primaryCrop.toLowerCase().includes(cropName.toLowerCase());
        });

        var html = '<h2>' + cropName + '</h2>' +
            '<div style="font-size:0.9rem;color:#4a5a4e;margin-bottom:0.75rem;">' +
            'Found in ' + regions.length + ' region' + (regions.length > 1 ? 's' : '') +
            '</div>';

        if (regions.length === 0) {
            html += '<div class="data-row"><span class="value unavailable">No documented production areas found.</span></div>';
        } else {
            regions.forEach(function(d) {
                html +=
                    '<div style="background:#F7F4EA;padding:0.5rem 0.75rem;border-radius:6px;margin-bottom:0.5rem;border-left:3px solid #D9A441;">' +
                    '<strong style="color:#164A2A;">' + d.name + '</strong>' +
                    '<div class="data-row" style="border:none;padding:0.1rem 0;"><span class="label">Production</span><span class="value">' +
                    d.production + '</span></div>' +
                    '<div class="data-row" style="border:none;padding:0.1rem 0;"><span class="label">Area</span><span class="value">' +
                    d.cultivatedArea + '</span></div>' +
                    '<div class="data-row" style="border:none;padding:0.1rem 0;"><span class="label">Yield</span><span class="value">' +
                    d.yield + '</span></div>' +
                    '<div class="data-row" style="border:none;padding:0.1rem 0;"><span class="label">Season</span><span class="value">' +
                    d.season + '</span></div>' +
                    '<div style="font-size:0.8rem;color:#6f8a7c;margin-top:0.2rem;">' +
                    'Markets: ' + d.marketHubs + ' → ' + d.targetMarkets +
                    '</div></div>';
            });
        }

        html +=
            '<div class="source-note">' +
            '<strong>Data Sources:</strong> ESS Agricultural Sample Survey, MoA<br />' +
            'Period: 2025' +
            '</div>';

        panelContent.innerHTML = html;
    };

    EthiopianCropMap.prototype.showEmptyPanel = function() {
        var panelEmpty = document.getElementById('panelEmpty');
        var panelContent = document.getElementById('panelContent');
        panelEmpty.style.display = 'block';
        panelContent.style.display = 'none';
        panelEmpty.innerHTML =
            '<div style="font-size:1.4rem;margin-bottom:0.5rem;">&#127758;</div>' +
            '<p><strong>Select a region</strong><br />' +
            'Search for a crop, or choose a map layer below.</p>' +
            '<div style="margin-top:1rem;font-size:0.85rem;color:#889e92;">' +
            '&#9654; Click any region on the map<br />' +
            '&#9654; Use the layer buttons to explore' +
            '</div>';
    };

    // ================================================================
    //  SEARCH
    // ================================================================

    EthiopianCropMap.prototype.setupSearch = function() {
        var self = this;
        var searchInput = document.getElementById('searchInput');
        var suggestionsContainer = document.getElementById('suggestionsContainer');

        if (!searchInput) return;

        searchInput.addEventListener('input', function() {
            var query = this.value.trim().toLowerCase();
            if (query.length < 1) {
                if (suggestionsContainer) suggestionsContainer.innerHTML = '';
                return;
            }

            var results = [];
            var seen = new Set();

            REGIONS_DATA.forEach(function(d) {
                if (d.name.toLowerCase().includes(query) ||
                    d.primaryCrop.toLowerCase().includes(query) ||
                    d.capital.toLowerCase().includes(query)) {
                    if (!seen.has(d.id)) {
                        seen.add(d.id);
                        results.push({ type: 'region', label: d.name, id: d.id });
                    }
                }
            });

            CROP_LIST.forEach(function(c) {
                if (c.toLowerCase().includes(query) && !seen.has(c)) {
                    seen.add(c);
                    results.push({ type: 'crop', label: c, id: c });
                }
            });

            if (results.length === 0 || !suggestionsContainer) {
                suggestionsContainer.innerHTML = '';
                return;
            }

            var html =
                '<div class="suggestions-dropdown">';
            results.forEach(function(r) {
                var icon = r.type === 'region' ? '📍' : '🌱';
                html +=
                    '<div class="suggestion-item" data-type="' + r.type + '" data-id="' + r.id + '">' +
                    '<span class="suggestion-icon">' + icon + '</span>' +
                    '<span>' + r.label + '</span>' +
                    '<span class="suggestion-type">' + r.type + '</span>' +
                    '</div>';
            });
            html += '</div>';

            suggestionsContainer.innerHTML = html;

            // Add click handlers
            suggestionsContainer.querySelectorAll('.suggestion-item').forEach(function(el) {
                el.addEventListener('click', function() {
                    var type = this.dataset.type;
                    var id = this.dataset.id;
                    self.selectSearchResult(type, id);
                });
            });
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                var query = this.value.trim();
                if (query.length > 0) {
                    var regionMatch = REGIONS_DATA.find(function(d) {
                        return d.name.toLowerCase() === query.toLowerCase() ||
                            d.primaryCrop.toLowerCase().includes(query.toLowerCase());
                    });
                    if (regionMatch) {
                        self.selectSearchResult('region', regionMatch.id);
                        return;
                    }
                    var cropMatch = CROP_LIST.find(function(c) {
                        return c.toLowerCase() === query.toLowerCase();
                    });
                    if (cropMatch) {
                        self.selectSearchResult('crop', cropMatch);
                        return;
                    }
                    var partialRegion = REGIONS_DATA.find(function(d) {
                        return d.name.toLowerCase().includes(query.toLowerCase()) ||
                            d.primaryCrop.toLowerCase().includes(query.toLowerCase());
                    });
                    if (partialRegion) {
                        self.selectSearchResult('region', partialRegion.id);
                    }
                }
                if (suggestionsContainer) suggestionsContainer.innerHTML = '';
            }
        });

        // Click outside to close suggestions
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-wrap') && !e.target.closest('#suggestionsContainer')) {
                if (suggestionsContainer) suggestionsContainer.innerHTML = '';
            }
        });
    };

    EthiopianCropMap.prototype.selectSearchResult = function(type, id) {
        var self = this;
        var suggestionsContainer = document.getElementById('suggestionsContainer');
        if (suggestionsContainer) suggestionsContainer.innerHTML = '';
        var searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.blur();

        if (type === 'region') {
            this.selectRegion(id);
        } else if (type === 'crop') {
            this.currentCrop = id;
            this.selectedRegionId = null;
            this.showCropInfo(id);

            var regions = REGIONS_DATA.filter(function(d) {
                return d.primaryCrop.toLowerCase().includes(id.toLowerCase());
            });

            if (this.geoLayer) {
                this.geoLayer.eachLayer(function(layer) {
                    var rid = layer.feature.id || layer.feature.properties.regionId;
                    var isMatch = regions.some(function(d) { return d.id === rid; });
                    if (isMatch) {
                        layer.setStyle({
                            fillColor: '#D9A441',
                            fillOpacity: 0.7,
                            weight: 3,
                            color: '#164A2A'
                        });
                        layer.bringToFront();
                    } else {
                        layer.setStyle(self.defaultStyle(layer.feature));
                    }
                });
            }

            if (this.geoLayer) {
                var bounds = L.latLngBounds();
                var hasBounds = false;
                this.geoLayer.eachLayer(function(layer) {
                    var rid = layer.feature.id || layer.feature.properties.regionId;
                    if (regions.some(function(d) { return d.id === rid; })) {
                        bounds.extend(layer.getBounds());
                        hasBounds = true;
                    }
                });
                if (hasBounds) {
                    this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
                }
            }

            if (searchInput) searchInput.value = id;
        }
    };

    // ================================================================
    //  UI BINDINGS
    // ================================================================

    EthiopianCropMap.prototype.setupUI = function() {
        var self = this;

        // Layer switcher
        document.querySelectorAll('[data-layer]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var layer = this.dataset.layer;
                self.currentLayer = layer;
                document.querySelectorAll('[data-layer]').forEach(function(b) {
                    b.classList.remove('active-layer');
                });
                this.classList.add('active-layer');

                if (layer !== 'default' && self.currentCrop) {
                    self.currentCrop = null;
                }

                self.renderMap(layer);

                if (layer === 'default' && self.selectedRegionId) {
                    self.selectRegion(self.selectedRegionId);
                } else if (layer === 'default') {
                    self.showEmptyPanel();
                }
            });
        });

        // Explore Regions button
        var exploreBtn = document.getElementById('exploreRegionsBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function() {
                document.querySelector('[data-layer="default"]').click();
                self.map.fitBounds([
                    [3.0, 33.0],
                    [15.0, 48.0]
                ]);
                var searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = '';
                self.currentCrop = null;
                self.selectedRegionId = null;
                self.showEmptyPanel();
                if (self.geoLayer) {
                    self.geoLayer.eachLayer(function(layer) {
                        layer.setStyle(self.defaultStyle(layer.feature));
                    });
                }
            });
        }

        // Crop Search button
        var cropSearchBtn = document.getElementById('cropSearchBtn');
        if (cropSearchBtn) {
            cropSearchBtn.addEventListener('click', function() {
                var searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.placeholder = 'Type a crop name...';
                    setTimeout(function() {
                        searchInput.placeholder = 'Search crops, regions, or locations...';
                    }, 3000);
                }
            });
        }

        // Reset Map button
        var resetBtn = document.getElementById('resetMapBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                document.querySelector('[data-layer="default"]').click();
                self.map.fitBounds([
                    [3.0, 33.0],
                    [15.0, 48.0]
                ]);
                var searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = '';
                self.currentCrop = null;
                self.selectedRegionId = null;
                self.showEmptyPanel();
                if (self.geoLayer) {
                    self.geoLayer.eachLayer(function(layer) {
                        layer.setStyle(self.defaultStyle(layer.feature));
                    });
                }
                if (self.overlayLayer) {
                    self.map.removeLayer(self.overlayLayer);
                    self.overlayLayer = null;
                }
                self.renderMap('default');
                var metaEl = document.getElementById('layerMeta');
                if (metaEl) metaEl.textContent = '';
            });
        }

        // Setup search
        this.setupSearch();
    };

    // ================================================================
    //  INITIALIZE
    // ================================================================

    document.addEventListener('DOMContentLoaded', function() {
        var mapContainer = document.getElementById('ethiopiaMap');
        if (mapContainer) {
            window.ethiopianCropMap = new EthiopianCropMap('ethiopiaMap');
        }
    });

})();