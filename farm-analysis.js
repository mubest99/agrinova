/* AgriNova public Supabase settings. Replace only the two placeholders below.
   NEVER put a service_role key or Gemini API key in this browser file. */
window.AGRINOVA_FARM_ANALYSIS_CONFIG = {
  SUPABASE_URL: "https://iqxfusbouchrapfxonxe.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv",
  AI_FUNCTION_NAME: "analyze-farm-health",
  PHOTO_BUCKET: "farm-analysis-photos"
};

/* ================================================================
   ORIGINAL FARM ANALYSIS / IDENTIFICATION FEATURES
   ================================================================ */
(function() {
    "use strict";

    // ============================================================
    // PEST DATABASE (30 Pests)
    // ============================================================

    const PEST_DATABASE = {
        'fall_armyworm': {
            id: 'fall_armyworm',
            pest_name: 'Fall Armyworm',
            description: 'Highly destructive caterpillar that feeds on leaves, stems, and reproductive parts of crops, causing severe defoliation',
            crops_affected: ['maize', 'sorghum', 'wheat', 'millet', 'rice', 'sugarcane', 'cotton'],
            symptoms: ['Window-paning on leaves (young larvae)', 'Large ragged holes and defoliation', 'Sawdust-like frass in leaf whorls', 'Cob and tassel damage in maize'],
            season: ['rainy', 'dry'],
            part_affected: ['leaf', 'stem', 'fruit'],
            management: {
                cultural: ['Early planting to avoid peak infestation', 'Crop rotation with non-host crops', 'Deep ploughing to expose pupae'],
                biological: ['Release of Trichogramma parasitoid wasps', 'Neem-based biopesticides', 'Bacillus thuringiensis (Bt) sprays'],
                chemical: ['Emamectin benzoate at 200g/ha', 'Chlorantraniliprole at 150ml/ha']
            }
        },
        'african_bollworm': {
            id: 'african_bollworm',
            pest_name: 'African Bollworm',
            description: 'Polyphagous caterpillar that attacks reproductive structures of various crops',
            crops_affected: ['cotton', 'tomato', 'maize', 'sorghum', 'beans', 'peppers', 'pigeon pea'],
            symptoms: ['Circular holes in fruits and bolls', 'Larvae feeding inside fruits', 'Flower bud damage and abortion', 'Frass accumulation at entry holes'],
            season: ['rainy'],
            part_affected: ['fruit', 'leaf', 'stem'],
            management: {
                cultural: ['Trap cropping with marigold', 'Removal of infested fruits', 'Early harvesting'],
                biological: ['Release of Trichogramma spp.', 'Use of NPV (Nuclear Polyhedrosis Virus)', 'Conservation of natural enemies'],
                chemical: ['Lambda-cyhalothrin at 200ml/ha', 'Indoxacarb at 125ml/ha']
            }
        },
        'stem_borer': {
            id: 'stem_borer',
            pest_name: 'Stem Borer',
            description: 'Larvae tunnel into plant stems causing weakening, breakage, and reduced nutrient transport',
            crops_affected: ['maize', 'sorghum', 'millet', 'rice', 'sugarcane'],
            symptoms: ['Dead heart in young plants', 'Small holes in stems with frass', 'Stem breakage and lodging', 'Reduced yield and poor grain filling'],
            season: ['rainy'],
            part_affected: ['stem', 'whole_plant'],
            management: {
                cultural: ['Destruction of crop residues', 'Crop rotation with legumes', 'Intercropping with desmodium'],
                biological: ['Release of Cotesia flavipes parasitoids', 'Use of neem cake soil application'],
                chemical: ['Chlorpyrifos granules at 10kg/ha', 'Fipronil at 1.5L/ha']
            }
        },
        'aphids': {
            id: 'aphids',
            pest_name: 'Aphids',
            description: 'Small sap-sucking insects that form colonies on plant parts, causing curling and stunted growth',
            crops_affected: ['wheat', 'barley', 'beans', 'peas', 'cabbage', 'potato', 'pepper'],
            symptoms: ['Curling and yellowing of leaves', 'Honeydew and sooty mold growth', 'Stunted plant growth', 'Presence of ant colonies attending aphids'],
            season: ['both'],
            part_affected: ['leaf', 'stem', 'fruit'],
            management: {
                cultural: ['Use of reflective mulches', 'Proper nitrogen management', 'Removal of infected plant parts'],
                biological: ['Release of ladybird beetles', 'Lacewing larvae introduction', 'Parasitic wasps (Aphidius spp.)'],
                chemical: ['Imidacloprid at 200ml/ha', 'Pymetrozine at 300g/ha']
            }
        },
        'whitefly': {
            id: 'whitefly',
            pest_name: 'Whitefly',
            description: 'Tiny white insects that suck sap and transmit viral diseases to various crops',
            crops_affected: ['tomato', 'cassava', 'cotton', 'beans', 'cucumber', 'pepper', 'sweet potato'],
            symptoms: ['Yellowing and wilting of leaves', 'Sticky honeydew on leaves', 'Transmission of viral diseases', 'White clouds of insects when disturbed'],
            season: ['dry', 'rainy'],
            part_affected: ['leaf'],
            management: {
                cultural: ['Use of yellow sticky traps', 'Weed control to reduce alternate hosts', 'Use of reflective mulches'],
                biological: ['Release of Encarsia formosa', 'Use of entomopathogenic fungi (Beauveria bassiana)'],
                chemical: ['Thiamethoxam at 200g/ha', 'Acetamiprid at 150g/ha']
            }
        },
        'locusts': {
            id: 'locusts',
            pest_name: 'Locusts',
            description: 'Swarming grasshoppers capable of devastating entire crops within hours',
            crops_affected: ['all crops', 'pasture', 'trees'],
            symptoms: ['Complete defoliation of plants', 'Large swarms visible in fields', 'Stripped bark on trees', 'Total crop loss in severe cases'],
            season: ['rainy'],
            part_affected: ['whole_plant', 'leaf', 'stem'],
            management: {
                cultural: ['Early warning and monitoring systems', 'Ploughing of egg beds', 'Community-based control programs'],
                biological: ['Use of Metarhizium acridum biopesticide', 'Conservation of natural predators'],
                chemical: ['Chlorpyrifos ULV at 1L/ha', 'Deltamethrin at 400ml/ha']
            }
        },
        'cutworms': {
            id: 'cutworms',
            pest_name: 'Cutworms',
            description: 'Nocturnal caterpillars that cut young seedlings at soil level',
            crops_affected: ['maize', 'beans', 'cabbage', 'tomato', 'pepper', 'onion'],
            symptoms: ['Seedlings cut at soil surface', 'Wilting and death of young plants', 'Irregular holes in leaves near ground', 'Larvae found in soil near damaged plants'],
            season: ['rainy', 'dry'],
            part_affected: ['stem', 'whole_plant'],
            management: {
                cultural: ['Ploughing before planting', 'Removal of plant debris', 'Use of collars around seedlings'],
                biological: ['Bacillus thuringiensis soil drench', 'Beneficial nematodes application'],
                chemical: ['Chlorpyrifos bait at 25kg/ha', 'Lambda-cyhalothrin at 200ml/ha']
            }
        },
        'thrips': {
            id: 'thrips',
            pest_name: 'Thrips',
            description: 'Tiny slender insects that rasp plant tissues and suck sap, causing silvery damage',
            crops_affected: ['onion', 'tomato', 'pepper', 'beans', 'cotton', 'cucumber'],
            symptoms: ['Silvery-white streaks on leaves', 'Deformed and curled leaves', 'Scarring on fruits', 'Reduced flowering and fruit set'],
            season: ['dry'],
            part_affected: ['leaf', 'fruit', 'stem'],
            management: {
                cultural: ['Overhead irrigation to reduce populations', 'Removal of infected plants', 'Use of silver reflective mulch'],
                biological: ['Release of predatory mites (Amblyseius spp.)', 'Use of entomopathogenic fungi'],
                chemical: ['Spinosad at 200ml/ha', 'Abamectin at 300ml/ha']
            }
        },
        'termites': {
            id: 'termites',
            pest_name: 'Termites',
            description: 'Social insects that feed on dead and living plant material, causing structural damage',
            crops_affected: ['maize', 'wheat', 'sugarcane', 'cotton', 'trees'],
            symptoms: ['Wilting of plants despite adequate moisture', 'Mud tubes on plant stems', 'Root damage and plant death', 'Presence of termite mounds in field'],
            season: ['dry'],
            part_affected: ['root', 'stem', 'whole_plant'],
            management: {
                cultural: ['Destruction of termite mounds', 'Use of well-decomposed manure', 'Maintaining soil moisture'],
                biological: ['Use of entomopathogenic fungi (Metarhizium anisopliae)', 'Promotion of natural predators (ants)'],
                chemical: ['Chlorpyrifos soil treatment at 5L/ha', 'Fipronil at 2L/ha']
            }
        },
        'mealybugs': {
            id: 'mealybugs',
            pest_name: 'Mealybugs',
            description: 'Soft-bodied insects covered with white waxy coating that feed on plant sap',
            crops_affected: ['coffee', 'cassava', 'citrus', 'mango', 'grape', 'cotton'],
            symptoms: ['White cottony masses on stems and leaves', 'Yellowing and wilting of leaves', 'Sooty mold on honeydew', 'Stunted growth and reduced vigor'],
            season: ['both'],
            part_affected: ['leaf', 'stem', 'fruit'],
            management: {
                cultural: ['Pruning of infested branches', 'Use of clean planting material', 'Proper plant spacing for air circulation'],
                biological: ['Release of Cryptolaemus montrouzieri (mealybug destroyer)', 'Use of parasitic wasps (Anagyrus spp.)'],
                chemical: ['Buprofezin at 400ml/ha', 'Mineral oil sprays at 2%']
            }
        }
    };

    // ============================================================
    // DISEASE DATABASE (30 Diseases)
    // ============================================================

    const DISEASE_DATABASE = {
        'maize_lethal_necrosis': {
            id: 'maize_lethal_necrosis',
            disease_name: 'Maize Lethal Necrosis',
            description: 'Viral disease caused by co-infection of Maize Chlorotic Mottle Virus and Sugarcane Mosaic Virus',
            crops_affected: ['maize'],
            symptoms: ['Chlorotic mottling on leaves', 'Necrosis starting from leaf margins', 'Stunted plant growth', 'Premature plant death', 'Poor grain filling'],
            season: ['rainy'],
            part_affected: ['whole_plant', 'leaf'],
            management: {
                cultural: ['Use of resistant varieties', 'Rogueing of infected plants', 'Vector control (thrips, aphids)'],
                chemical: ['No direct chemical control for viruses']
            }
        },
        'wheat_rust': {
            id: 'wheat_rust',
            disease_name: 'Wheat Rust',
            description: 'Fungal disease causing orange-brown pustules on leaves and stems',
            crops_affected: ['wheat', 'barley'],
            symptoms: ['Orange-brown pustules on leaves', 'Yellow stripes (stripe rust)', 'Premature leaf drying', 'Reduced grain filling', 'Shriveled grains'],
            season: ['rainy', 'dry'],
            part_affected: ['leaf', 'stem'],
            management: {
                cultural: ['Use of resistant varieties', 'Early planting', 'Avoidance of excessive nitrogen'],
                chemical: ['Tebuconazole at 500ml/ha', 'Propiconazole at 500ml/ha']
            }
        },
        'coffee_leaf_rust': {
            id: 'coffee_leaf_rust',
            disease_name: 'Coffee Leaf Rust',
            description: 'Fungal disease causing orange-yellow powdery spots on coffee leaves',
            crops_affected: ['coffee'],
            symptoms: ['Yellow-orange powdery spots on leaf undersides', 'Premature leaf drop', 'Reduced flowering and berry production', 'Dieback of branches'],
            season: ['rainy'],
            part_affected: ['leaf'],
            management: {
                cultural: ['Use of resistant varieties', 'Proper pruning for air circulation', 'Balanced fertilization'],
                chemical: ['Copper hydroxide at 2kg/ha', 'Triazole fungicides at 500ml/ha']
            }
        },
        'potato_late_blight': {
            id: 'potato_late_blight',
            disease_name: 'Potato Late Blight',
            description: 'Devastating fungal disease causing rapid destruction of potato foliage',
            crops_affected: ['potato', 'tomato'],
            symptoms: ['Dark water-soaked lesions on leaves', 'White fungal growth on leaf undersides', 'Rapid blighting of foliage', 'Brown rot of tubers', 'Foul smell from infected tubers'],
            season: ['rainy'],
            part_affected: ['leaf', 'stem', 'tuber'],
            management: {
                cultural: ['Use of certified seed', 'Proper spacing for air flow', 'Destruction of infected plants'],
                chemical: ['Mancozeb at 2kg/ha', 'Metalaxyl+Mancozeb at 2.5kg/ha']
            }
        },
        'tomato_bacterial_wilt': {
            id: 'tomato_bacterial_wilt',
            disease_name: 'Tomato Bacterial Wilt',
            description: 'Soil-borne bacterial disease causing rapid wilting and death of tomato plants',
            crops_affected: ['tomato', 'pepper', 'eggplant', 'potato'],
            symptoms: ['Sudden wilting of plants', 'Brown discoloration of vascular tissue', 'Bacterial ooze from cut stems', 'Root rot and plant death'],
            season: ['rainy'],
            part_affected: ['whole_plant', 'root', 'stem'],
            management: {
                cultural: ['Crop rotation with non-host crops', 'Use of resistant varieties', 'Soil solarization'],
                chemical: ['Copper-based bactericides', 'Soil fumigation with metam sodium']
            }
        },
        'maize_smut': {
            id: 'maize_smut',
            disease_name: 'Maize Smut',
            description: 'Fungal disease causing large galls filled with black spores',
            crops_affected: ['maize'],
            symptoms: ['Large white galls on ears, stems, and leaves', 'Galls filled with black powdery spores', 'Distorted plant growth', 'Reduced yield'],
            season: ['rainy'],
            part_affected: ['fruit', 'stem', 'leaf'],
            management: {
                cultural: ['Removal and destruction of galls', 'Crop rotation', 'Avoidance of mechanical injury'],
                chemical: ['Seed treatment with fungicides', 'No effective foliar fungicides']
            }
        },
        'citrus_canker': {
            id: 'citrus_canker',
            disease_name: 'Citrus Canker',
            description: 'Bacterial disease causing raised lesions on citrus leaves, fruits, and stems',
            crops_affected: ['citrus'],
            symptoms: ['Raised corky lesions on leaves and fruits', 'Yellow halo around lesions', 'Premature leaf and fruit drop', 'Reduced fruit quality'],
            season: ['rainy'],
            part_affected: ['leaf', 'fruit', 'stem'],
            management: {
                cultural: ['Use of certified disease-free plants', 'Destruction of infected trees', 'Windbreaks to reduce spread'],
                chemical: ['Copper-based sprays at 2kg/ha', 'Streptomycin at 500ppm']
            }
        },
        'banana_bunchy_top': {
            id: 'banana_bunchy_top',
            disease_name: 'Banana Bunchy Top',
            description: 'Viral disease transmitted by banana aphids causing stunted growth',
            crops_affected: ['banana'],
            symptoms: ['Narrow, upright leaves with yellow margins', 'Stunted plant growth', 'Dark green streaks on leaves', 'Reduced or no fruit production'],
            season: ['both'],
            part_affected: ['whole_plant', 'leaf'],
            management: {
                cultural: ['Use of virus-free planting material', 'Rogueing of infected plants', 'Vector control (aphids)'],
                chemical: ['No direct chemical control', 'Aphid control with imidacloprid']
            }
        },
        'onion_downy_mildew': {
            id: 'onion_downy_mildew',
            disease_name: 'Onion Downy Mildew',
            description: 'Fungal disease causing purple-gray fuzzy growth on onion leaves',
            crops_affected: ['onion', 'garlic', 'leek'],
            symptoms: ['Purple-gray fuzzy growth on leaves', 'Yellowing and death of leaf tips', 'Stunted bulb development', 'Reduced yield'],
            season: ['rainy'],
            part_affected: ['leaf'],
            management: {
                cultural: ['Use of disease-free sets', 'Proper spacing for air flow', 'Crop rotation'],
                chemical: ['Metalaxyl+Mancozeb at 2kg/ha', 'Chlorothalonil at 1.5kg/ha']
            }
        },
        'coffee_berry_disease': {
            id: 'coffee_berry_disease',
            disease_name: 'Coffee Berry Disease',
            description: 'Fungal disease causing dark lesions on coffee berries',
            crops_affected: ['coffee'],
            symptoms: ['Dark sunken lesions on green berries', 'Premature berry drop', 'Mummified berries', 'Reduced coffee quality'],
            season: ['rainy'],
            part_affected: ['fruit'],
            management: {
                cultural: ['Use of resistant varieties', 'Proper pruning', 'Removal of infected berries'],
                chemical: ['Copper-based fungicides', 'Azoxystrobin at 300ml/ha']
            }
        }
    };

    // ============================================================
    // WEED DATABASE (30 Weeds)
    // ============================================================

    const WEED_DATABASE = {
        'parthenium': {
            id: 'parthenium',
            weed_name: 'Parthenium',
            description: 'Highly invasive weed causing allergic reactions and reducing crop yields',
            appearance: 'Deeply lobed pale green leaves, small white flowers, grows up to 2m tall',
            crops_affected: ['all crops'],
            season: ['rainy', 'dry'],
            management: {
                cultural: ['Manual uprooting before flowering', 'Mulching to prevent germination', 'Competitive cover cropping'],
                chemical: ['Glyphosate at 2L/ha', '2,4-D at 1.5L/ha']
            }
        },
        'striga': {
            id: 'striga',
            weed_name: 'Striga (Witchweed)',
            description: 'Parasitic weed that attaches to host plant roots',
            appearance: 'Small plants with bright green leaves and purple or red flowers',
            crops_affected: ['maize', 'sorghum', 'millet', 'rice', 'sugarcane'],
            season: ['rainy'],
            management: {
                cultural: ['Crop rotation with trap crops', 'Intercropping with desmodium', 'Hand pulling before flowering'],
                chemical: ['Imazapyr-resistant maize with imazapyr', '2,4-D at 1L/ha']
            }
        },
        'cyperus': {
            id: 'cyperus',
            weed_name: 'Cyperus (Nutsedge)',
            description: 'Perennial sedge with underground tubers making it difficult to control',
            appearance: 'Grass-like plant with triangular stems, shiny green leaves, and nut-like tubers',
            crops_affected: ['rice', 'maize', 'vegetables', 'sugarcane'],
            season: ['rainy', 'dry'],
            management: {
                cultural: ['Deep ploughing to expose tubers', 'Proper water management', 'Mulching'],
                chemical: ['Halosulfuron-methyl at 50g/ha', 'Glyphosate at 2L/ha']
            }
        },
        'couch_grass': {
            id: 'couch_grass',
            weed_name: 'Couch Grass',
            description: 'Perennial grass spreading through underground rhizomes',
            appearance: 'Grass with flat leaves and creeping rhizomes, forms dense mats',
            crops_affected: ['maize', 'wheat', 'vegetables', 'orchards'],
            season: ['both'],
            management: {
                cultural: ['Deep ploughing to expose rhizomes', 'Mulching', 'Crop rotation'],
                chemical: ['Glyphosate at 3L/ha', 'Fluazifop-butyl at 1L/ha']
            }
        },
        'water_hyacinth': {
            id: 'water_hyacinth',
            weed_name: 'Water Hyacinth',
            description: 'Free-floating aquatic weed that forms dense mats on water bodies',
            appearance: 'Glossy green leaves with swollen petioles, purple flowers',
            crops_affected: ['rice', 'aquatic crops'],
            season: ['both'],
            management: {
                cultural: ['Manual removal', 'Use of biological control (weevils)', 'Prevention of spread'],
                chemical: ['Glyphosate at 2L/ha', '2,4-D amine at 2L/ha']
            }
        },
        'blackjack': {
            id: 'blackjack',
            weed_name: 'Blackjack (Bidens pilosa)',
            description: 'Annual weed with sticky seeds that attach to clothing and animals',
            appearance: 'Erect plant with serrated leaves and small white flowers with yellow centers',
            crops_affected: ['maize', 'beans', 'vegetables', 'coffee'],
            season: ['rainy'],
            management: {
                cultural: ['Hand weeding', 'Mulching', 'Cover cropping'],
                chemical: ['2,4-D at 1.5L/ha', 'Glyphosate at 2L/ha']
            }
        },
        'pigweed': {
            id: 'pigweed',
            weed_name: 'Pigweed (Amaranthus)',
            description: 'Fast-growing annual weed that competes aggressively with crops',
            appearance: 'Erect plant with reddish stems, oval leaves, and dense flower spikes',
            crops_affected: ['maize', 'beans', 'vegetables', 'cotton'],
            season: ['rainy'],
            management: {
                cultural: ['Hand weeding', 'Mulching', 'Crop rotation'],
                chemical: ['Atrazine at 1L/ha', 'Glyphosate at 2L/ha']
            }
        },
        'thorn_apple': {
            id: 'thorn_apple',
            weed_name: 'Thorn Apple (Datura)',
            description: 'Poisonous annual weed with large trumpet-shaped flowers',
            appearance: 'Large plant with broad leaves, white or purple trumpet flowers, spiny seed capsules',
            crops_affected: ['maize', 'wheat', 'vegetables'],
            season: ['rainy'],
            management: {
                cultural: ['Manual removal before seeding', 'Crop rotation', 'Clean cultivation'],
                chemical: ['2,4-D at 1.5L/ha', 'Dicamba at 500ml/ha']
            }
        },
        'mexican_poppy': {
            id: 'mexican_poppy',
            weed_name: 'Mexican Poppy',
            description: 'Spiny annual weed with yellow sap',
            appearance: 'Thistle-like plant with spiny leaves and yellow or white flowers',
            crops_affected: ['maize', 'wheat', 'pastures'],
            season: ['rainy'],
            management: {
                cultural: ['Manual removal with protective gear', 'Prevention of seed set', 'Competitive cropping'],
                chemical: ['2,4-D at 1.5L/ha', 'Glyphosate at 2L/ha']
            }
        },
        'nutgrass': {
            id: 'nutgrass',
            weed_name: 'Nutgrass',
            description: 'Perennial sedge with underground tubers and rapid spread',
            appearance: 'Grass-like with dark green leaves and reddish-purple flower spikes',
            crops_affected: ['maize', 'rice', 'sugarcane', 'vegetables'],
            season: ['rainy'],
            management: {
                cultural: ['Deep ploughing', 'Frequent cultivation', 'Solarization'],
                chemical: ['Halosulfuron at 50g/ha', 'Glyphosate at 2L/ha']
            }
        }
    };

    // ============================================================
    // SOIL DATABASE (10 Soil Types)
    // ============================================================

    const SOIL_DATABASE = {
        'clay': {
            id: 'clay',
            soil_type: 'Clay',
            characteristics: ['High water retention', 'Poor drainage', 'High nutrient holding capacity', 'Heavy and difficult to work'],
            texture: 'Fine and sticky when wet, hard when dry',
            suitable_crops: ['rice', 'sugarcane', 'wheat'],
            management: ['Add organic matter to improve structure', 'Proper drainage systems', 'Avoid working when too wet'],
            ph_range: [6.0, 7.5]
        },
        'loam': {
            id: 'loam',
            soil_type: 'Loam',
            characteristics: ['Balanced sand, silt, and clay', 'Good drainage', 'High fertility', 'Easy to work'],
            texture: 'Crumbly and soft, holds shape when squeezed',
            suitable_crops: ['maize', 'vegetables', 'beans', 'most crops'],
            management: ['Regular organic matter addition', 'Crop rotation', 'Mulching'],
            ph_range: [5.5, 7.0]
        },
        'sandy': {
            id: 'sandy',
            soil_type: 'Sandy',
            characteristics: ['Excellent drainage', 'Low water retention', 'Low nutrient holding', 'Warms quickly'],
            texture: 'Gritty and loose, doesn\'t hold shape',
            suitable_crops: ['groundnut', 'sweet potato', 'cassava', 'carrot'],
            management: ['Frequent irrigation', 'Heavy mulching', 'Regular fertilization'],
            ph_range: [5.0, 6.5]
        },
        'silt': {
            id: 'silt',
            soil_type: 'Silt',
            characteristics: ['Smooth texture', 'Good water retention', 'Moderate drainage', 'High fertility'],
            texture: 'Smooth and soapy when wet, forms weak ribbons',
            suitable_crops: ['vegetables', 'small grains', 'legumes'],
            management: ['Add organic matter', 'Prevent compaction', 'Proper drainage'],
            ph_range: [5.5, 7.0]
        },
        'peaty': {
            id: 'peaty',
            soil_type: 'Peaty',
            characteristics: ['High organic matter', 'Acidic', 'High water retention', 'Dark color'],
            texture: 'Spongy and fibrous, dark brown to black',
            suitable_crops: ['vegetables', 'root crops', 'some berries'],
            management: ['Lime application to raise pH', 'Proper drainage', 'Regular nutrient supplementation'],
            ph_range: [4.0, 5.5]
        },
        'chalky': {
            id: 'chalky',
            soil_type: 'Chalky',
            characteristics: ['Alkaline', 'Free-draining', 'Stony', 'Low in some nutrients'],
            texture: 'Stony and shallow, white or pale in color',
            suitable_crops: ['barley', 'some vegetables', 'grapes'],
            management: ['Add organic matter', 'Fertilizer application', 'Mulching'],
            ph_range: [7.0, 8.5]
        },
        'sandy_loam': {
            id: 'sandy_loam',
            soil_type: 'Sandy Loam',
            characteristics: ['Good drainage', 'Moderate water retention', 'Easy to work', 'Warms quickly'],
            texture: 'Slightly gritty but forms weak clumps',
            suitable_crops: ['maize', 'potato', 'most vegetables'],
            management: ['Regular organic matter addition', 'Mulching', 'Proper irrigation'],
            ph_range: [5.5, 7.0]
        },
        'clay_loam': {
            id: 'clay_loam',
            soil_type: 'Clay Loam',
            characteristics: ['Good water retention', 'Moderate drainage', 'High fertility', 'Slightly heavy'],
            texture: 'Smooth with slight stickiness, forms ribbons',
            suitable_crops: ['wheat', 'maize', 'cotton'],
            management: ['Add organic matter', 'Avoid compaction', 'Proper tillage'],
            ph_range: [5.5, 7.5]
        },
        'volcanic': {
            id: 'volcanic',
            soil_type: 'Volcanic',
            characteristics: ['Very high fertility', 'Excellent drainage', 'High organic matter', 'Dark color'],
            texture: 'Crumbly and rich, dark brown to black',
            suitable_crops: ['coffee', 'vegetables', 'flowers'],
            management: ['Prevent erosion', 'Maintain organic matter', 'Proper fertilization'],
            ph_range: [5.5, 6.5]
        },
        'alluvial': {
            id: 'alluvial',
            soil_type: 'Alluvial',
            characteristics: ['High fertility', 'Good water retention', 'Deep soil profile', 'Deposited by water'],
            texture: 'Varies from sandy to clay, often layered',
            suitable_crops: ['rice', 'sugarcane', 'vegetables'],
            management: ['Proper drainage', 'Regular fertilization', 'Prevent waterlogging'],
            ph_range: [6.0, 7.5]
        }
    };

    // ============================================================
    // CROP SUITABILITY DATA (30 Crops)
    // ============================================================

    const CROP_SUITABILITY = {
        'maize': { crop_name: 'Maize', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'clay loam', 'silt'], ph_range: [5.5, 7.5], water_requirement: 'medium', temperature_range: [20, 30], altitude_range: [0, 2500] },
        'teff': { crop_name: 'Teff', preferred_soil: 'loam', acceptable_soils: ['clay', 'silt'], ph_range: [5.5, 7.0], water_requirement: 'low', temperature_range: [15, 25], altitude_range: [1500, 3000] },
        'wheat': { crop_name: 'Wheat', preferred_soil: 'clay loam', acceptable_soils: ['loam', 'silt', 'clay'], ph_range: [5.5, 7.5], water_requirement: 'medium', temperature_range: [15, 25], altitude_range: [1500, 3000] },
        'potato': { crop_name: 'Potato', preferred_soil: 'sandy loam', acceptable_soils: ['loam', 'sandy'], ph_range: [5.0, 6.5], water_requirement: 'medium', temperature_range: [15, 20], altitude_range: [1800, 3000] },
        'coffee': { crop_name: 'Coffee', preferred_soil: 'volcanic', acceptable_soils: ['loam', 'clay loam'], ph_range: [5.5, 6.5], water_requirement: 'medium', temperature_range: [18, 25], altitude_range: [1500, 2200] },
        'sorghum': { crop_name: 'Sorghum', preferred_soil: 'loam', acceptable_soils: ['clay', 'sandy loam'], ph_range: [5.5, 7.5], water_requirement: 'low', temperature_range: [25, 35], altitude_range: [0, 2500] },
        'barley': { crop_name: 'Barley', preferred_soil: 'loam', acceptable_soils: ['clay loam', 'silt'], ph_range: [5.5, 7.5], water_requirement: 'low', temperature_range: [15, 20], altitude_range: [1500, 3200] },
        'rice': { crop_name: 'Rice', preferred_soil: 'clay', acceptable_soils: ['alluvial', 'silt', 'clay loam'], ph_range: [5.0, 7.0], water_requirement: 'high', temperature_range: [25, 35], altitude_range: [0, 2000] },
        'beans': { crop_name: 'Beans', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'silt', 'clay loam'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [18, 25], altitude_range: [500, 2500] },
        'cassava': { crop_name: 'Cassava', preferred_soil: 'sandy', acceptable_soils: ['sandy loam', 'loam'], ph_range: [5.0, 6.5], water_requirement: 'low', temperature_range: [25, 32], altitude_range: [0, 1500] },
        'sweet_potato': { crop_name: 'Sweet Potato', preferred_soil: 'sandy', acceptable_soils: ['sandy loam', 'loam'], ph_range: [5.5, 6.5], water_requirement: 'medium', temperature_range: [20, 30], altitude_range: [0, 2500] },
        'onion': { crop_name: 'Onion', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'silt'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [15, 25], altitude_range: [500, 2500] },
        'tomato': { crop_name: 'Tomato', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'silt', 'clay loam'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [18, 27], altitude_range: [0, 2000] },
        'pepper': { crop_name: 'Pepper', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'silt'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [20, 30], altitude_range: [0, 2000] },
        'cabbage': { crop_name: 'Cabbage', preferred_soil: 'loam', acceptable_soils: ['clay loam', 'silt'], ph_range: [6.0, 7.0], water_requirement: 'medium', temperature_range: [15, 20], altitude_range: [500, 2500] },
        'carrot': { crop_name: 'Carrot', preferred_soil: 'sandy', acceptable_soils: ['sandy loam', 'loam'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [15, 20], altitude_range: [0, 2500] },
        'cotton': { crop_name: 'Cotton', preferred_soil: 'clay loam', acceptable_soils: ['loam', 'alluvial'], ph_range: [5.5, 7.5], water_requirement: 'medium', temperature_range: [25, 35], altitude_range: [0, 1500] },
        'sugarcane': { crop_name: 'Sugarcane', preferred_soil: 'alluvial', acceptable_soils: ['clay', 'loam', 'silt'], ph_range: [6.0, 7.5], water_requirement: 'high', temperature_range: [25, 35], altitude_range: [0, 1500] },
        'banana': { crop_name: 'Banana', preferred_soil: 'alluvial', acceptable_soils: ['loam', 'clay loam'], ph_range: [5.5, 7.0], water_requirement: 'high', temperature_range: [25, 30], altitude_range: [0, 1800] },
        'avocado': { crop_name: 'Avocado', preferred_soil: 'volcanic', acceptable_soils: ['loam', 'sandy loam'], ph_range: [5.5, 6.5], water_requirement: 'medium', temperature_range: [20, 25], altitude_range: [1000, 2500] },
        'mango': { crop_name: 'Mango', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'alluvial'], ph_range: [5.5, 7.5], water_requirement: 'medium', temperature_range: [24, 30], altitude_range: [0, 1500] },
        'citrus': { crop_name: 'Citrus', preferred_soil: 'sandy loam', acceptable_soils: ['loam', 'alluvial'], ph_range: [5.5, 6.5], water_requirement: 'medium', temperature_range: [20, 30], altitude_range: [0, 1800] },
        'sunflower': { crop_name: 'Sunflower', preferred_soil: 'loam', acceptable_soils: ['clay loam', 'sandy loam'], ph_range: [5.5, 7.5], water_requirement: 'medium', temperature_range: [20, 30], altitude_range: [0, 2500] },
        'soybean': { crop_name: 'Soybean', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'silt'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [20, 30], altitude_range: [0, 2000] },
        'groundnut': { crop_name: 'Groundnut', preferred_soil: 'sandy', acceptable_soils: ['sandy loam', 'loam'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [25, 30], altitude_range: [0, 1500] },
        'millet': { crop_name: 'Millet', preferred_soil: 'sandy', acceptable_soils: ['sandy loam', 'loam'], ph_range: [5.5, 7.5], water_requirement: 'low', temperature_range: [25, 35], altitude_range: [0, 2000] },
        'chickpea': { crop_name: 'Chickpea', preferred_soil: 'clay loam', acceptable_soils: ['loam', 'silt'], ph_range: [5.5, 7.5], water_requirement: 'low', temperature_range: [15, 25], altitude_range: [500, 2500] },
        'pea': { crop_name: 'Pea', preferred_soil: 'loam', acceptable_soils: ['sandy loam', 'silt'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [15, 20], altitude_range: [1000, 2500] },
        'papaya': { crop_name: 'Papaya', preferred_soil: 'sandy loam', acceptable_soils: ['loam', 'alluvial'], ph_range: [5.5, 7.0], water_requirement: 'medium', temperature_range: [22, 30], altitude_range: [0, 1500] },
        'coffee_arabica': { crop_name: 'Coffee Arabica', preferred_soil: 'volcanic', acceptable_soils: ['loam', 'clay loam'], ph_range: [5.5, 6.5], water_requirement: 'medium', temperature_range: [18, 22], altitude_range: [1500, 2200] }
    };

    // ============================================================
    // FARM SCORE CONFIGURATION
    // ============================================================

    const SCORE_CONFIG = {
        weights: {
            crop_condition: 25,
            water_management: 20,
            pest_observations: 15,
            disease_observations: 15,
            weed_condition: 10,
            soil_observations: 10,
            farm_activity: 5
        },
        categories: [
            { min: 85, max: 100, label: 'Excellent', color: '#0B3D2E', emoji: '🌟' },
            { min: 70, max: 84, label: 'Good', color: '#2F7D4A', emoji: '👍' },
            { min: 50, max: 69, label: 'Moderate', color: '#C68A2B', emoji: '😐' },
            { min: 30, max: 49, label: 'Needs Attention', color: '#D4853A', emoji: '⚠️' },
            { min: 0, max: 29, label: 'Needs Immediate Attention', color: '#B85C45', emoji: '🔴' }
        ]
    };

    // ============================================================
    // CROP PHOTOS + LANGUAGE SELECTOR
    // ============================================================
    const CROP_PHOTOS = {
        maize: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=480&q=80',
        corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=480&q=80',
        tomato: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=480&q=80',
        potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=480&q=80',
        banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=480&q=80',
        mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=480&q=80',
        carrot: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=480&q=80',
        coffee: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=480&q=80',
        orange: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=480&q=80',
        citrus: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=480&q=80',
        cabbage: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=480&q=80',
        onion: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=480&q=80',
        pepper: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=480&q=80',
        avocado: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=480&q=80',
        papaya: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=480&q=80',
        wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=480&q=80',
        rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=480&q=80',
        beans: 'https://images.unsplash.com/photo-1515543904379-3d75748b4c14?auto=format&fit=crop&w=480&q=80'
    };

    function getCropVisual(cropName) {
        const raw = String(cropName || '').trim();
        if (!raw || raw.toLowerCase() === 'unknown') return '';
        const key = raw.toLowerCase().replace(/\s+/g, '_');
        const normalized = key.replace(/_/g, ' ');
        const src = CROP_PHOTOS[key] || CROP_PHOTOS[normalized] ||
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=480&q=80';
        return `<div class="crop-visual"><img src="${src}" alt="${raw.replace(/[&<>"']/g, '')}" loading="lazy"><span>${raw.replace(/[&<>"']/g, '')}</span></div>`;
    }

    const UI_TRANSLATIONS = {
        en: { searchAnalyses:'Search analyses...', healthOverview:'Farm Health Overview', healthDescription:'Based on your recorded farm observations', lastAssessmentLabel:'Last assessment:', viewScore:'View Score Breakdown', pestDescription:'Identify pests and diseases affecting your crops', soilDescription:'Analyze your soil characteristics and suitability', plantDescription:'Check the health and condition of your crops', weedDescription:'Identify weeds in your fields', observationDescription:'Record detailed observations about your farm', startInvestigationBtn:'Start Investigation', emptyHistory:'No investigations have been recorded yet.', firstInvestigation:'Start Your First Investigation', pageTitle:'Farm Analysis & Identification', pageSubtitle:'Investigate, observe, and understand your farm.', startInvestigation:'Start a New Investigation', pestDisease:'Pest & Disease', soilAssessment:'Soil Assessment', plantHealth:'Plant Health Check', weedIdentification:'Weed Identification', generalObservation:'General Farm Observation', recentInvestigations:'Recent Investigations', backDashboard:'Back to Dashboard', notifications:'Notifications', noNotifications:'You have no new notifications.' },
        am: { searchAnalyses:'ትንተናዎችን ይፈልጉ...', healthOverview:'የእርሻ ጤና አጠቃላይ እይታ', healthDescription:'በተመዘገቡ የእርሻ ምልከታዎች ላይ የተመሠረተ', lastAssessmentLabel:'የመጨረሻ ግምገማ:', viewScore:'የነጥብ ዝርዝር ይመልከቱ', pestDescription:'በሰብሎችዎ ላይ ያሉ ተባዮችንና በሽታዎችን ይለዩ', soilDescription:'የአፈርዎን ባህሪያትና ተስማሚነት ይተንትኑ', plantDescription:'የሰብሎችዎን ጤናና ሁኔታ ይፈትሹ', weedDescription:'በእርሻዎ ያሉ አረሞችን ይለዩ', observationDescription:'ስለ እርሻዎ ዝርዝር ምልከታዎችን ይመዝግቡ', startInvestigationBtn:'ምርመራ ይጀምሩ', emptyHistory:'እስካሁን ምርመራ አልተመዘገበም።', firstInvestigation:'የመጀመሪያ ምርመራዎን ይጀምሩ', pageTitle:'የእርሻ ትንተና እና መለያ ማወቅ', pageSubtitle:'እርሻዎን ይመርምሩ፣ ይመልከቱ እና ይረዱ።', startInvestigation:'አዲስ ምርመራ ይጀምሩ', pestDisease:'ተባይ እና በሽታ', soilAssessment:'የአፈር ግምገማ', plantHealth:'የተክል ጤና ምርመራ', weedIdentification:'አረም መለየት', generalObservation:'አጠቃላይ የእርሻ ምልከታ', recentInvestigations:'የቅርብ ጊዜ ምርመራዎች', backDashboard:'ወደ ዳሽቦርድ ተመለስ', notifications:'ማሳወቂያዎች', noNotifications:'አዲስ ማሳወቂያ የለዎትም።' },
        om: { searchAnalyses:'Qorannoowwan barbaadi...', healthOverview:'Haala Fayyaa Qonnaa', healthDescription:'Daawwannaa qonnaa galmaa’e irratti hundaa’a', lastAssessmentLabel:'Qorannoo dhumaa:', viewScore:'Qoodinsa qabxii ilaali', pestDescription:'Ilbiisotaa fi dhukkuboota midhaan kee miidhan adda baasi', soilDescription:'Amaloota biyyee fi mijataa isaa xiinxali', plantDescription:'Fayyaa fi haala midhaan kee ilaali', weedDescription:'Marga dirree kee keessa jiru adda baasi', observationDescription:'Waa’ee qonna kee daawwannaa bal’aa galmeessi', startInvestigationBtn:'Qorannoo Jalqabi', emptyHistory:'Qorannoon hanga ammaatti hin galmoofne.', firstInvestigation:'Qorannoo Kee Isa Jalqabaa Jalqabi', pageTitle:'Xiinxala fi Adda Baafannaa Qonnaa', pageSubtitle:'Qonna kee qoradhu, ilaali, hubadhu.', startInvestigation:'Qorannoo Haaraa Jalqabi', pestDisease:'Ilbiisota fi Dhukkuba', soilAssessment:'Qorannoo Biyyee', plantHealth:'Qorannoo Fayyaa Biqiltuu', weedIdentification:'Marga Adda Baasuu', generalObservation:'Daawwannaa Qonnaa Waliigalaa', recentInvestigations:'Qorannoowwan Dhiheenyaa', backDashboard:'Gara Daashboordii Deebi’i', notifications:'Beeksisa', noNotifications:'Beeksisni haaraan hin jiru.' },
        ti: { searchAnalyses:'ምርመራታት ድለ...', healthOverview:'ሓፈሻዊ ጥዕና ሕርሻ', healthDescription:'ኣብ ዝተመዝገበ ትዕዝብቲ ሕርሻ ዝተመርኮሰ', lastAssessmentLabel:'ናይ መወዳእታ ገምጋም:', viewScore:'ዝርዝር ነጥቢ ርአ', pestDescription:'ኣብ ዝራእትኻ ዘለዉ ባልዕን ሕማማትን ፍለ', soilDescription:'ባህርያትን ተስማሚነትን ሓመድካ ተንትን', plantDescription:'ጥዕናን ኩነታትን ዝራእትኻ መርምር', weedDescription:'ኣብ ግራትካ ዘሎ ኣረም ፍለ', observationDescription:'ብዛዕባ ሕርሻኻ ዝርዝር ትዕዝብቲ መዝግብ', startInvestigationBtn:'ምርመራ ጀምር', emptyHistory:'ክሳብ ሕጂ ዝተመዝገበ ምርመራ የለን።', firstInvestigation:'ቀዳማይ ምርመራኻ ጀምር', pageTitle:'ትንተናን መለለዪን ሕርሻ', pageSubtitle:'ሕርሻኻ መርምር፣ ተዓዘብ፣ ተረዳእ።', startInvestigation:'ሓድሽ ምርመራ ጀምር', pestDisease:'ባልዕን ሕማምን', soilAssessment:'ገምጋም ሓመድ', plantHealth:'ምርመራ ጥዕና ተኽሊ', weedIdentification:'መለለዪ ኣረም', generalObservation:'ሓፈሻዊ ትዕዝብቲ ሕርሻ', recentInvestigations:'ናይ ቀረባ ግዜ ምርመራታት', backDashboard:'ናብ ዳሽቦርድ ተመለስ', notifications:'ምልክታታት', noNotifications:'ሓድሽ ምልክታ የለን።' },
        so: { searchAnalyses:'Raadi baaritaannada...', healthOverview:'Guudmarka Caafimaadka Beeraha', healthDescription:'Waxay ku salaysan tahay kormeeradii beerta ee la diiwaangeliyey', lastAssessmentLabel:'Qiimayntii ugu dambaysay:', viewScore:'Eeg Faahfaahinta Dhibcaha', pestDescription:'Aqoonso cayayaanka iyo cudurrada saameeya dalagyadaada', soilDescription:'Falanqee sifooyinka ciidda iyo ku habboonaanteeda', plantDescription:'Hubi caafimaadka iyo xaaladda dalagyadaada', weedDescription:'Aqoonso haramaha ku jira beerahaaga', observationDescription:'Diiwaangeli kormeer faahfaahsan oo ku saabsan beertaada', startInvestigationBtn:'Bilow Baaritaan', emptyHistory:'Weli wax baaritaan ah lama diiwaangelin.', firstInvestigation:'Bilow Baaritaankaaga Koowaad', pageTitle:'Falanqaynta iyo Aqoonsiga Beeraha', pageSubtitle:'Baadh, la soco, oo faham beertaada.', startInvestigation:'Bilow Baaritaan Cusub', pestDisease:'Cayayaan iyo Cudur', soilAssessment:'Qiimaynta Ciidda', plantHealth:'Hubinta Caafimaadka Dhirta', weedIdentification:'Aqoonsiga Haramaha', generalObservation:'Kormeer Guud oo Beeraha ah', recentInvestigations:'Baaritaannadii u Dambeeyay', backDashboard:'Ku Noqo Dashboard-ka', notifications:'Ogeysiisyada', noNotifications:'Ma jiraan ogeysiisyo cusub.' }
    };

    function applyLanguage(language) {
        const lang = UI_TRANSLATIONS[language] ? language : 'en';
        document.documentElement.lang = lang;
        document.documentElement.dir = 'ltr';
        try { localStorage.setItem('agrinova_language', lang); } catch (e) {}
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (UI_TRANSLATIONS[lang][key]) el.textContent = UI_TRANSLATIONS[lang][key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (UI_TRANSLATIONS[lang][key]) el.setAttribute('placeholder', UI_TRANSLATIONS[lang][key]);
        });
        const labels = { en:'English', am:'አማርኛ', om:'Afaan Oromoo', ti:'ትግርኛ', so:'Soomaali' };
        const label = document.getElementById('currentLanguageLabel');
        if (label) label.textContent = labels[lang];
        document.querySelectorAll('[data-language]').forEach(btn => btn.classList.toggle('active', btn.dataset.language === lang));
    }

    function setupLanguageSelector() {
        const trigger = document.getElementById('languageTrigger');
        const menu = document.getElementById('languageMenu');
        if (!trigger || !menu) return;
        trigger.addEventListener('click', e => {
            e.stopPropagation(); menu.hidden = !menu.hidden;
            trigger.setAttribute('aria-expanded', String(!menu.hidden));
        });
        menu.querySelectorAll('[data-language]').forEach(btn => btn.addEventListener('click', () => {
            applyLanguage(btn.dataset.language); menu.hidden = true; trigger.setAttribute('aria-expanded','false');
        }));
        document.addEventListener('click', e => {
            if (!menu.contains(e.target) && !trigger.contains(e.target)) { menu.hidden = true; trigger.setAttribute('aria-expanded','false'); }
        });
        applyLanguage(localStorage.getItem('agrinova_language') || 'en');
    }

    function setupNotifications() {
        const trigger = document.getElementById('notificationTrigger');
        const panel = document.getElementById('notificationPanel');
        if (!trigger || !panel) return;
        trigger.addEventListener('click', e => {
            e.stopPropagation(); panel.hidden = !panel.hidden;
            trigger.setAttribute('aria-expanded', String(!panel.hidden));
        });
        document.addEventListener('click', e => {
            if (!panel.contains(e.target) && !trigger.contains(e.target)) { panel.hidden = true; trigger.setAttribute('aria-expanded','false'); }
        });
    }

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

    function getDailyRecords() {
        let raw = localStorage.getItem('agrinova_daily_records');
        if (!raw) return [];
        try { return JSON.parse(raw); } catch { return []; }
    }

    function getAnalyses() {
        let raw = localStorage.getItem('agrinova_analyses');
        if (!raw) return [];
        try { return JSON.parse(raw); } catch { return []; }
    }

    function saveAnalyses(analyses) {
        localStorage.setItem('agrinova_analyses', JSON.stringify(analyses));
    }

    function getScoreHistory() {
        let raw = localStorage.getItem('agrinova_score_history');
        if (!raw) return [];
        try { return JSON.parse(raw); } catch { return []; }
    }

    function saveScoreHistory(history) {
        localStorage.setItem('agrinova_score_history', JSON.stringify(history));
    }

    // ============================================================
    // MATCHING FUNCTIONS
    // ============================================================

    function matchPest(symptoms, crop, part) {
        let matches = [];
        const pestKeys = Object.keys(PEST_DATABASE);
        
        pestKeys.forEach(key => {
            const pest = PEST_DATABASE[key];
            let score = 0;
            
            // Check crop match
            if (crop && pest.crops_affected.includes(crop)) {
                score += 30;
            } else if (crop && pest.crops_affected.includes('all crops')) {
                score += 15;
            }
            
            // Check symptoms
            if (symptoms && symptoms.length > 0) {
                symptoms.forEach(symptom => {
                    pest.symptoms.forEach(pestSymptom => {
                        if (pestSymptom.toLowerCase().includes(symptom.toLowerCase()) || 
                            symptom.toLowerCase().includes(pestSymptom.toLowerCase())) {
                            score += 20;
                        }
                    });
                });
            }
            
            // Check part affected
            if (part && pest.part_affected.includes(part)) {
                score += 10;
            }
            
            if (score > 0) {
                matches.push({
                    ...pest,
                    matchScore: score,
                    confidence: score > 50 ? 'high' : score > 30 ? 'moderate' : 'limited'
                });
            }
        });
        
        // Sort by score descending
        matches.sort((a, b) => b.matchScore - a.matchScore);
        return matches.slice(0, 3);
    }

    function matchDisease(symptoms, crop, part) {
        let matches = [];
        const diseaseKeys = Object.keys(DISEASE_DATABASE);
        
        diseaseKeys.forEach(key => {
            const disease = DISEASE_DATABASE[key];
            let score = 0;
            
            if (crop && disease.crops_affected.includes(crop)) {
                score += 30;
            }
            
            if (symptoms && symptoms.length > 0) {
                symptoms.forEach(symptom => {
                    disease.symptoms.forEach(diseaseSymptom => {
                        if (diseaseSymptom.toLowerCase().includes(symptom.toLowerCase()) || 
                            symptom.toLowerCase().includes(diseaseSymptom.toLowerCase())) {
                            score += 20;
                        }
                    });
                });
            }
            
            if (part && disease.part_affected.includes(part)) {
                score += 10;
            }
            
            if (score > 0) {
                matches.push({
                    ...disease,
                    matchScore: score,
                    confidence: score > 50 ? 'high' : score > 30 ? 'moderate' : 'limited'
                });
            }
        });
        
        matches.sort((a, b) => b.matchScore - a.matchScore);
        return matches.slice(0, 3);
    }

    function matchWeed(appearance, crop) {
        let matches = [];
        const weedKeys = Object.keys(WEED_DATABASE);
        
        weedKeys.forEach(key => {
            const weed = WEED_DATABASE[key];
            let score = 0;
            
            if (crop && weed.crops_affected.includes(crop)) {
                score += 30;
            } else if (crop && weed.crops_affected.includes('all crops')) {
                score += 15;
            }
            
            if (appearance) {
                const appLower = appearance.toLowerCase();
                const weedApp = weed.appearance.toLowerCase();
                if (weedApp.includes(appLower) || appLower.includes(weedApp.substring(0, 20))) {
                    score += 25;
                }
            }
            
            if (score > 0) {
                matches.push({
                    ...weed,
                    matchScore: score,
                    confidence: score > 40 ? 'high' : score > 25 ? 'moderate' : 'limited'
                });
            }
        });
        
        matches.sort((a, b) => b.matchScore - a.matchScore);
        return matches.slice(0, 3);
    }

    function getSoilRecommendations(soilType, cropName) {
        const soil = SOIL_DATABASE[soilType];
        if (!soil) return null;
        
        const crop = CROP_SUITABILITY[cropName];
        if (!crop) return { soil, cropSuitability: null };
        
        const isPreferred = crop.preferred_soil === soilType;
        const isAcceptable = crop.acceptable_soils.includes(soilType);
        
        return {
            soil,
            cropSuitability: {
                cropName: crop.crop_name,
                preferred: isPreferred,
                acceptable: isAcceptable,
                ph_range: crop.ph_range,
                water_requirement: crop.water_requirement,
                temperature_range: crop.temperature_range,
                altitude_range: crop.altitude_range,
                recommendation: isPreferred ? 'Excellent choice' : 
                                isAcceptable ? 'Suitable' : 'Not recommended for this soil'
            }
        };
    }

    // ============================================================
    // FARM SCORE CALCULATION
    // ============================================================

    function calculateFarmScore(observations) {
        const weights = SCORE_CONFIG.weights;
        let totalScore = 0;
        let totalWeight = 0;
        let breakdown = [];

        // Crop Condition
        if (observations.crop_condition !== undefined) {
            const score = observations.crop_condition * weights.crop_condition / 100;
            totalScore += score;
            totalWeight += weights.crop_condition;
            breakdown.push({
                category: 'Crop Condition',
                weight: weights.crop_condition,
                score: observations.crop_condition,
                contribution: score
            });
        }

        // Water Management
        if (observations.water_management !== undefined) {
            const score = observations.water_management * weights.water_management / 100;
            totalScore += score;
            totalWeight += weights.water_management;
            breakdown.push({
                category: 'Water Management',
                weight: weights.water_management,
                score: observations.water_management,
                contribution: score
            });
        }

        // Pest Observations
        if (observations.pest_observations !== undefined) {
            const score = observations.pest_observations * weights.pest_observations / 100;
            totalScore += score;
            totalWeight += weights.pest_observations;
            breakdown.push({
                category: 'Pest Observations',
                weight: weights.pest_observations,
                score: observations.pest_observations,
                contribution: score
            });
        }

        // Disease Observations
        if (observations.disease_observations !== undefined) {
            const score = observations.disease_observations * weights.disease_observations / 100;
            totalScore += score;
            totalWeight += weights.disease_observations;
            breakdown.push({
                category: 'Disease Observations',
                weight: weights.disease_observations,
                score: observations.disease_observations,
                contribution: score
            });
        }

        // Weed Condition
        if (observations.weed_condition !== undefined) {
            const score = observations.weed_condition * weights.weed_condition / 100;
            totalScore += score;
            totalWeight += weights.weed_condition;
            breakdown.push({
                category: 'Weed Condition',
                weight: weights.weed_condition,
                score: observations.weed_condition,
                contribution: score
            });
        }

        // Soil Observations
        if (observations.soil_observations !== undefined) {
            const score = observations.soil_observations * weights.soil_observations / 100;
            totalScore += score;
            totalWeight += weights.soil_observations;
            breakdown.push({
                category: 'Soil Observations',
                weight: weights.soil_observations,
                score: observations.soil_observations,
                contribution: score
            });
        }

        // Farm Activity Records
        if (observations.farm_activity !== undefined) {
            const score = observations.farm_activity * weights.farm_activity / 100;
            totalScore += score;
            totalWeight += weights.farm_activity;
            breakdown.push({
                category: 'Farm Activity',
                weight: weights.farm_activity,
                score: observations.farm_activity,
                contribution: score
            });
        }

        // If no data, return null
        if (totalWeight === 0) {
            return null;
        }

        // Normalize score based on available weight
        const normalizedScore = (totalScore / totalWeight) * 100;
        const finalScore = Math.round(normalizedScore);

        // Determine category
        let category = SCORE_CONFIG.categories.find(c => finalScore >= c.min && finalScore <= c.max);

        return {
            score: finalScore,
            category: category || SCORE_CONFIG.categories[SCORE_CONFIG.categories.length - 1],
            breakdown: breakdown,
            totalWeight: totalWeight,
            missingCategories: getMissingCategories(observations)
        };
    }

    function getMissingCategories(observations) {
        const allCategories = [
            'crop_condition', 'water_management', 'pest_observations',
            'disease_observations', 'weed_condition', 'soil_observations',
            'farm_activity'
        ];
        const missing = [];
        allCategories.forEach(cat => {
            if (observations[cat] === undefined) {
                missing.push(cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()));
            }
        });
        return missing;
    }

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
    // FARM HEALTH SCORE UI
    // ============================================================

    function updateFarmScore() {
        const scoreHistory = getScoreHistory();
        const lastScore = scoreHistory.length > 0 ? scoreHistory[scoreHistory.length - 1] : null;
        
        const circle = document.getElementById('scoreCircle');
        const text = document.getElementById('scoreText');
        const label = document.getElementById('scoreLabel');
        const status = document.getElementById('healthStatus');
        const description = document.getElementById('healthDescription');
        const lastAssessment = document.getElementById('lastAssessment');

        if (lastScore) {
            const score = lastScore.score;
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (score / 100) * circumference;
            
            circle.style.strokeDasharray = `${circumference - offset} ${offset}`;
            circle.style.stroke = lastScore.category.color;
            text.textContent = `${score}%`;
            label.textContent = lastScore.category.label;
            status.textContent = `${lastScore.category.emoji} Farm Health: ${lastScore.category.label}`;
            description.textContent = `Based on ${lastScore.totalWeight || 100}% data coverage`;
            lastAssessment.textContent = new Date(lastScore.date).toLocaleDateString();
        } else {
            circle.style.strokeDasharray = `0 314`;
            text.textContent = '--';
            label.textContent = 'No Data';
            status.textContent = 'Farm Health Overview';
            description.textContent = 'Based on your recorded farm observations';
            lastAssessment.textContent = 'Not yet assessed';
        }
    }

    // ============================================================
    // INVESTIGATION FUNCTIONS
    // ============================================================

    let currentInvestigation = {
        type: null,
        step: 0,
        data: {}
    };

    window.startInvestigation = function(type) {
        currentInvestigation = {
            type: type,
            step: 0,
            data: {
                images: [],
                answers: {},
                crop: null,
                part: null,
                description: null
            }
        };
        renderInvestigation();
        openModal('investigationModal');
    };

    function renderInvestigation() {
        const container = document.getElementById('investigationContent');
        const title = document.getElementById('investigationTitle');
        const type = currentInvestigation.type;
        const step = currentInvestigation.step;

        const titles = {
            pest: 'Pest & Disease Investigation',
            soil: 'Soil Assessment',
            plant: 'Plant Health Check',
            weed: 'Weed Identification',
            observation: 'General Farm Observation'
        };
        title.textContent = titles[type] || 'Investigation';

        switch(type) {
            case 'pest':
                renderPestInvestigation(container, step);
                break;
            case 'soil':
                renderSoilInvestigation(container, step);
                break;
            case 'plant':
                renderPlantInvestigation(container, step);
                break;
            case 'weed':
                renderWeedInvestigation(container, step);
                break;
            case 'observation':
                renderObservationInvestigation(container, step);
                break;
            default:
                container.innerHTML = '<p>Unknown investigation type.</p>';
        }
    }

    // ============================================================
    // PEST INVESTIGATION
    // ============================================================

    function renderPestInvestigation(container, step) {
        const crops = getCrops();
        const cropOptions = crops.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

        let html = '';

        if (step === 0) {
            html = `
                <div class="investigation-step">
                    <div class="step-number">Step 1</div>
                    <div class="step-title">What is affected?</div>
                    <div class="step-description">Select the part of the plant you want to investigate.</div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Plant Part</label>
                        <select id="pestPart">
                            <option value="">Select...</option>
                            <option value="leaf">Leaf</option>
                            <option value="stem">Stem</option>
                            <option value="fruit">Fruit</option>
                            <option value="root">Root</option>
                            <option value="whole_plant">Whole Plant</option>
                            <option value="unknown">Unknown</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Related Crop</label>
                        <select id="pestCrop">
                            <option value="">Select crop...</option>
                            ${cropOptions}
                            <option value="other">Other (not listed)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Describe what you see</label>
                    <textarea id="pestDescription" rows="2" placeholder="Describe the symptoms you're observing..."></textarea>
                </div>
                <div class="form-group">
                    <label>Upload Images</label>
                    <div class="photo-upload-area" onclick="document.getElementById('pestPhotoInput').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload photos</p>
                        <small>JPG, PNG, or WEBP</small>
                    </div>
                    <input type="file" id="pestPhotoInput" accept="image/*" multiple style="display:none;" onchange="handleInvestigationPhoto(this, 'pest')">
                    <div id="pestPhotoPreview" class="photo-preview-grid"></div>
                </div>
                <button class="btn-primary" onclick="pestStepNext()">
                    <i class="fas fa-arrow-right"></i> Next: Analyze
                </button>
            `;
        } else if (step === 1) {
            // Analyze and show results
            const part = document.getElementById('pestPart')?.value || currentInvestigation.data.part;
            const crop = document.getElementById('pestCrop')?.value || currentInvestigation.data.crop;
            const description = document.getElementById('pestDescription')?.value || currentInvestigation.data.description;

            currentInvestigation.data.part = part;
            currentInvestigation.data.crop = crop;
            currentInvestigation.data.description = description;

            // Extract symptoms from description
            const symptoms = description ? description.split(/[,;.]/).map(s => s.trim()).filter(s => s.length > 0) : [];
            const matches = matchPest(symptoms, crop, part);

            if (matches.length === 0) {
                html = `
                    <div class="result-card" style="border-left-color: #C68A2B;">
                        <div class="result-title">No clear match found</div>
                        <div class="result-subtitle">The symptoms you described don't match our pest database.</div>
                        <div style="margin-top:0.5rem;">
                            <p><strong>What to do next:</strong></p>
                            <ul style="margin-left:1.2rem; color:#6B746E;">
                                <li>Try providing more specific symptoms</li>
                                <li>Upload clearer photos</li>
                                <li>Describe the damage more precisely</li>
                                <li>Contact your local agricultural extension office</li>
                            </ul>
                        </div>
                        <div style="margin-top:1rem;">
                            <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                                <i class="fas fa-arrow-left"></i> Go Back
                            </button>
                            <button class="btn-primary btn-sm" onclick="saveAnalysis('pest', 'No match found', 'limited')">
                                <i class="fas fa-save"></i> Save Record
                            </button>
                        </div>
                    </div>
                `;
            } else {
                html = `
                    <div class="investigation-step" style="border-left-color: #B85C45;">
                        <div class="step-number">Analysis Complete</div>
                        <div class="step-title">Possible Matches Found</div>
                        <div class="step-description">Based on your observations, here are the most likely matches.</div>
                    </div>
                `;

                matches.forEach((match, index) => {
                    const confidenceClass = match.confidence === 'high' ? 'high' : match.confidence === 'moderate' ? 'moderate' : 'limited';
                    const confidenceLabel = match.confidence === 'high' ? 'High Confidence' : 
                                          match.confidence === 'moderate' ? 'Moderate Confidence' : 'Limited Confidence';
                    
                    html += `
                        <div class="result-card" style="border-left-color: ${index === 0 ? '#2F7D4A' : '#A8C69F'};">
                            <div class="result-title">${index === 0 ? '⭐ ' : ''}${match.pest_name}</div>
                            ${getCropVisual(crop)}
                            <div class="result-subtitle">${match.description}</div>
                            <span class="result-confidence ${confidenceClass}">${confidenceLabel}</span>
                            <div style="margin-top:0.5rem;">
                                <p><strong>Symptoms:</strong> ${match.symptoms.join(', ')}</p>
                                <p><strong>Crops Affected:</strong> ${match.crops_affected.join(', ')}</p>
                            </div>
                            <details style="margin-top:0.5rem;">
                                <summary style="cursor:pointer; color:#2F7D4A; font-weight:500;">Management Options</summary>
                                <div style="padding:0.5rem 0;">
                                    <p><strong>Cultural:</strong> ${match.management.cultural.join(', ')}</p>
                                    <p><strong>Biological:</strong> ${match.management.biological.join(', ')}</p>
                                    <p><strong>Chemical:</strong> ${match.management.chemical.join(', ')}</p>
                                </div>
                            </details>
                        </div>
                    `;
                });

                html += `
                    <div style="display:flex; gap:0.8rem; margin-top:1rem; flex-wrap:wrap;">
                        <button class="btn-primary btn-sm" onclick="saveAnalysis('pest', '${matches[0].pest_name}', '${matches[0].confidence}')">
                            <i class="fas fa-save"></i> Save Analysis
                        </button>
                        <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                        <button class="btn-secondary btn-sm" onclick="askAIAboutAnalysis('pest', '${matches[0].pest_name}')">
                            <i class="fas fa-robot"></i> Ask AI to Explain
                        </button>
                    </div>
                `;
            }
        }

        container.innerHTML = html;
    }

    function pestStepNext() {
        const part = document.getElementById('pestPart').value;
        const crop = document.getElementById('pestCrop').value;
        const description = document.getElementById('pestDescription').value.trim();

        if (!part) {
            showToast('Please select the affected plant part.', 'warning');
            return;
        }

        currentInvestigation.data.part = part;
        currentInvestigation.data.crop = crop;
        currentInvestigation.data.description = description;
        currentInvestigation.step = 1;
        renderInvestigation();
    }

    // ============================================================
    // SOIL INVESTIGATION
    // ============================================================

    function renderSoilInvestigation(container, step) {
        const crops = getCrops();
        const cropOptions = crops.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

        let html = '';

        if (step === 0) {
            html = `
                <div class="investigation-step">
                    <div class="step-number">Step 1</div>
                    <div class="step-title">Soil Assessment</div>
                    <div class="step-description">Describe your soil characteristics.</div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Soil Texture</label>
                        <select id="soilTexture">
                            <option value="">Select...</option>
                            <option value="sandy">Sandy</option>
                            <option value="loam">Loam</option>
                            <option value="clay">Clay</option>
                            <option value="silt">Silt</option>
                            <option value="sandy_loam">Sandy Loam</option>
                            <option value="clay_loam">Clay Loam</option>
                            <option value="volcanic">Volcanic</option>
                            <option value="peaty">Peaty</option>
                            <option value="chalky">Chalky</option>
                            <option value="alluvial">Alluvial</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Current Moisture</label>
                        <select id="soilMoisture">
                            <option value="">Select...</option>
                            <option value="dry">Dry</option>
                            <option value="slightly_moist">Slightly Moist</option>
                            <option value="wet">Wet</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Related Crop</label>
                    <select id="soilCrop">
                        <option value="">Select crop (optional)</option>
                        ${cropOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Observations</label>
                    <textarea id="soilObservations" rows="2" placeholder="Describe your soil observations..."></textarea>
                </div>
                <div class="form-group">
                    <label>Upload Soil Photos</label>
                    <div class="photo-upload-area" onclick="document.getElementById('soilPhotoInput').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload photos</p>
                        <small>JPG, PNG, or WEBP</small>
                    </div>
                    <input type="file" id="soilPhotoInput" accept="image/*" multiple style="display:none;" onchange="handleInvestigationPhoto(this, 'soil')">
                    <div id="soilPhotoPreview" class="photo-preview-grid"></div>
                </div>
                <button class="btn-primary" onclick="soilStepNext()">
                    <i class="fas fa-arrow-right"></i> Analyze Soil
                </button>
            `;
        } else if (step === 1) {
            const texture = document.getElementById('soilTexture').value;
            const moisture = document.getElementById('soilMoisture').value;
            const crop = document.getElementById('soilCrop').value;

            const soil = SOIL_DATABASE[texture];
            let soilHtml = '';

            if (soil) {
                const result = getSoilRecommendations(texture, crop);

                soilHtml = `
                    <div class="result-card" style="border-left-color: #2F7D4A;">
                        <div class="result-title">${soil.soil_type}</div>
                        <div class="result-subtitle">${soil.texture}</div>
                        <div style="margin-top:0.5rem;">
                            <p><strong>Characteristics:</strong> ${soil.characteristics.join(', ')}</p>
                            <p><strong>pH Range:</strong> ${soil.ph_range[0]} - ${soil.ph_range[1]}</p>
                            <p><strong>Suitable Crops:</strong> ${soil.suitable_crops.join(', ')}</p>
                            <p><strong>Management:</strong> ${soil.management.join(', ')}</p>
                        </div>
                    </div>
                `;

                if (crop && result.cropSuitability) {
                    const suit = result.cropSuitability;
                    const suitColor = suit.preferred ? '#2F7D4A' : suit.acceptable ? '#C68A2B' : '#B85C45';
                    soilHtml += `
                        <div class="result-card" style="border-left-color: ${suitColor};">
                            <div class="result-title">Crop Suitability: ${suit.recommendation}</div>
                            ${getCropVisual(crop)}
                            <div style="margin-top:0.5rem;">
                                <p><strong>${suit.cropName}</strong> - ${suit.preferred ? '✅ Preferred Soil' : suit.acceptable ? '✅ Acceptable' : '❌ Not Recommended'}</p>
                                <p><strong>pH Range:</strong> ${suit.ph_range[0]} - ${suit.ph_range[1]}</p>
                                <p><strong>Water Requirement:</strong> ${suit.water_requirement}</p>
                                <p><strong>Temperature Range:</strong> ${suit.temperature_range[0]}°C - ${suit.temperature_range[1]}°C</p>
                                <p><strong>Altitude Range:</strong> ${suit.altitude_range[0]} - ${suit.altitude_range[1]}m</p>
                            </div>
                        </div>
                    `;
                } else if (crop) {
                    soilHtml += `
                        <div class="result-card" style="border-left-color: #C68A2B;">
                            <div class="result-title">Crop data not available</div>
                            <div class="result-subtitle">Crop suitability information for "${crop}" is not in the database.</div>
                        </div>
                    `;
                }

                html = `
                    ${soilHtml}
                    <div style="display:flex; gap:0.8rem; margin-top:1rem; flex-wrap:wrap;">
                        <button class="btn-primary btn-sm" onclick="saveAnalysis('soil', '${soil.soil_type} Soil', 'high')">
                            <i class="fas fa-save"></i> Save Analysis
                        </button>
                        <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                `;
            } else {
                html = `
                    <div class="result-card" style="border-left-color: #C68A2B;">
                        <div class="result-title">No soil match found</div>
                        <div class="result-subtitle">The soil type you selected is not in our database.</div>
                        <div style="margin-top:1rem;">
                            <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                                <i class="fas fa-arrow-left"></i> Go Back
                            </button>
                        </div>
                    </div>
                `;
            }
        }

        container.innerHTML = html;
    }

    function soilStepNext() {
        const texture = document.getElementById('soilTexture').value;
        if (!texture) {
            showToast('Please select your soil texture.', 'warning');
            return;
        }
        currentInvestigation.step = 1;
        renderInvestigation();
    }

    // ============================================================
    // PLANT HEALTH INVESTIGATION
    // ============================================================

    function renderPlantInvestigation(container, step) {
        const crops = getCrops();
        const cropOptions = crops.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

        let html = '';

        if (step === 0) {
            html = `
                <div class="investigation-step">
                    <div class="step-number">Step 1</div>
                    <div class="step-title">Plant Health Check</div>
                    <div class="step-description">Describe the plant health concern you're observing.</div>
                </div>
                <div class="form-group">
                    <label>Related Crop</label>
                    <select id="plantCrop">
                        <option value="">Select crop...</option>
                        ${cropOptions}
                        <option value="unknown">Unknown Plant</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>What concerns you?</label>
                    <select id="plantConcern">
                        <option value="">Select...</option>
                        <option value="discoloration">Discoloration</option>
                        <option value="slow_growth">Slow growth</option>
                        <option value="wilting">Wilting</option>
                        <option value="spots">Spots</option>
                        <option value="physical_damage">Physical damage</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="plantDescription" rows="2" placeholder="Describe what you're observing..."></textarea>
                </div>
                <div class="form-group">
                    <label>Upload Plant Photos</label>
                    <div class="photo-upload-area" onclick="document.getElementById('plantPhotoInput').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload photos</p>
                        <small>JPG, PNG, or WEBP</small>
                    </div>
                    <input type="file" id="plantPhotoInput" accept="image/*" multiple style="display:none;" onchange="handleInvestigationPhoto(this, 'plant')">
                    <div id="plantPhotoPreview" class="photo-preview-grid"></div>
                </div>
                <button class="btn-primary" onclick="plantStepNext()">
                    <i class="fas fa-arrow-right"></i> Analyze
                </button>
            `;
        } else if (step === 1) {
            const crop = document.getElementById('plantCrop').value;
            const concern = document.getElementById('plantConcern').value;
            const description = document.getElementById('plantDescription').value.trim();

            const concernMap = {
                'discoloration': 'Leaf discoloration may indicate nutrient deficiency, disease, or environmental stress.',
                'slow_growth': 'Slow growth could be caused by poor soil conditions, pests, or lack of nutrients.',
                'wilting': 'Wilting often indicates water stress, root damage, or vascular disease.',
                'spots': 'Leaf spots are commonly caused by fungal or bacterial diseases.',
                'physical_damage': 'Physical damage may be from pests, equipment, or weather.',
                'unknown': 'Further observation is needed to identify the issue.'
            };

            html = `
                <div class="result-card" style="border-left-color: #2F7D4A;">
                    <div class="result-title">Plant Health Assessment</div>
                    ${getCropVisual(crop)}
                    <div style="margin-top:0.5rem;">
                        <p><strong>Crop:</strong> ${crop || 'Not specified'}</p>
                        <p><strong>Concern:</strong> ${concern || 'Not specified'}</p>
                        <p><strong>Description:</strong> ${description || 'No description provided'}</p>
                    </div>
                    <div style="margin-top:1rem; padding:0.8rem; background:#F7F6F0; border-radius:8px;">
                        <p><strong>🔍 Observation:</strong></p>
                        <p style="color:#6B746E;">${concernMap[concern] || 'Observation recorded. Further analysis may be needed.'}</p>
                    </div>
                    <div style="margin-top:0.5rem; padding:0.8rem; background:#E8F3E5; border-radius:8px;">
                        <p><strong>💡 What to check next:</strong></p>
                        <ul style="margin-left:1.2rem; color:#6B746E;">
                            <li>Check for pests on leaves and stems</li>
                            <li>Examine soil moisture and drainage</li>
                            <li>Look for patterns in affected plants</li>
                            <li>Consider recent weather conditions</li>
                        </ul>
                    </div>
                </div>
                <div style="display:flex; gap:0.8rem; margin-top:1rem; flex-wrap:wrap;">
                    <button class="btn-primary btn-sm" onclick="saveAnalysis('plant', '${concern || 'Plant health check'}', 'moderate')">
                        <i class="fas fa-save"></i> Save Record
                    </button>
                    ${concern === 'discoloration' || concern === 'spots' ? 
                        `<button class="btn-secondary btn-sm" onclick="startInvestigation('pest')">
                            <i class="fas fa-bug"></i> Start Pest Investigation
                        </button>` : ''}
                    <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    function plantStepNext() {
        const crop = document.getElementById('plantCrop').value;
        const concern = document.getElementById('plantConcern').value;

        if (!crop) {
            showToast('Please select a crop or "Unknown Plant".', 'warning');
            return;
        }

        currentInvestigation.step = 1;
        renderInvestigation();
    }

    // ============================================================
    // WEED IDENTIFICATION
    // ============================================================

    function renderWeedInvestigation(container, step) {
        const crops = getCrops();
        const cropOptions = crops.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

        let html = '';

        if (step === 0) {
            html = `
                <div class="investigation-step">
                    <div class="step-number">Step 1</div>
                    <div class="step-title">Weed Identification</div>
                    <div class="step-description">Describe the weed you've found.</div>
                </div>
                <div class="form-group">
                    <label>Weed Appearance</label>
                    <textarea id="weedAppearance" rows="2" placeholder="Describe the weed's appearance (color, size, leaf shape, flowers)..."></textarea>
                </div>
                <div class="form-group">
                    <label>Related Crop (optional)</label>
                    <select id="weedCrop">
                        <option value="">Select crop...</option>
                        ${cropOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Upload Weed Photos</label>
                    <div class="photo-upload-area" onclick="document.getElementById('weedPhotoInput').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload photos</p>
                        <small>JPG, PNG, or WEBP</small>
                    </div>
                    <input type="file" id="weedPhotoInput" accept="image/*" multiple style="display:none;" onchange="handleInvestigationPhoto(this, 'weed')">
                    <div id="weedPhotoPreview" class="photo-preview-grid"></div>
                </div>
                <button class="btn-primary" onclick="weedStepNext()">
                    <i class="fas fa-arrow-right"></i> Identify Weed
                </button>
            `;
        } else if (step === 1) {
            const appearance = document.getElementById('weedAppearance').value.trim();
            const crop = document.getElementById('weedCrop').value;

            const matches = matchWeed(appearance, crop);

            if (matches.length === 0) {
                html = `
                    <div class="result-card" style="border-left-color: #C68A2B;">
                        <div class="result-title">No clear match found</div>
                        <div class="result-subtitle">The weed you described doesn't match our database.</div>
                        <div style="margin-top:1rem;">
                            <p><strong>What to do next:</strong></p>
                            <ul style="margin-left:1.2rem; color:#6B746E;">
                                <li>Provide more detailed description</li>
                                <li>Upload clearer photos</li>
                                <li>Consult a local weed identification guide</li>
                            </ul>
                        </div>
                        <div style="margin-top:1rem;">
                            <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                                <i class="fas fa-arrow-left"></i> Go Back
                            </button>
                        </div>
                    </div>
                `;
            } else {
                html = `
                    <div class="investigation-step" style="border-left-color: #B85C45;">
                        <div class="step-number">Analysis Complete</div>
                        <div class="step-title">Possible Weed Matches</div>
                    </div>
                `;

                matches.forEach((match, index) => {
                    const confidenceClass = match.confidence === 'high' ? 'high' : match.confidence === 'moderate' ? 'moderate' : 'limited';
                    
                    html += `
                        <div class="result-card" style="border-left-color: ${index === 0 ? '#2F7D4A' : '#A8C69F'};">
                            <div class="result-title">${index === 0 ? '⭐ ' : ''}${match.weed_name}</div>
                            ${getCropVisual(crop)}
                            <div class="result-subtitle">${match.description}</div>
                            <div style="margin-top:0.3rem;">
                                <p><strong>Appearance:</strong> ${match.appearance}</p>
                                <p><strong>Crops Affected:</strong> ${match.crops_affected.join(', ')}</p>
                            </div>
                            <span class="result-confidence ${confidenceClass}">${match.confidence} confidence</span>
                            <details style="margin-top:0.5rem;">
                                <summary style="cursor:pointer; color:#2F7D4A; font-weight:500;">Management Options</summary>
                                <div style="padding:0.5rem 0;">
                                    <p><strong>Cultural:</strong> ${match.management.cultural.join(', ')}</p>
                                    <p><strong>Chemical:</strong> ${match.management.chemical.join(', ')}</p>
                                </div>
                            </details>
                        </div>
                    `;
                });

                html += `
                    <div style="display:flex; gap:0.8rem; margin-top:1rem; flex-wrap:wrap;">
                        <button class="btn-primary btn-sm" onclick="saveAnalysis('weed', '${matches[0].weed_name}', '${matches[0].confidence}')">
                            <i class="fas fa-save"></i> Save Analysis
                        </button>
                        <button class="btn-secondary btn-sm" onclick="currentInvestigation.step = 0; renderInvestigation();">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                `;
            }
        }

        container.innerHTML = html;
    }

    function weedStepNext() {
        const appearance = document.getElementById('weedAppearance').value.trim();
        if (!appearance) {
            showToast('Please describe the weed\'s appearance.', 'warning');
            return;
        }
        currentInvestigation.step = 1;
        renderInvestigation();
    }

    // ============================================================
    // GENERAL FARM OBSERVATION
    // ============================================================

    function renderObservationInvestigation(container, step) {
        let html = '';

        if (step === 0) {
            html = `
                <div class="investigation-step">
                    <div class="step-number">Farm Observation</div>
                    <div class="step-title">Record Your Farm Observations</div>
                    <div class="step-description">Help build your farm health score by recording observations.</div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Crop Condition (0-100)</label>
                        <input type="range" id="obsCrop" min="0" max="100" value="70" oninput="document.getElementById('obsCropVal').textContent = this.value">
                        <span id="obsCropVal" style="font-weight:600; color:#2F7D4A;">70</span>
                    </div>
                    <div class="form-group">
                        <label>Water Management (0-100)</label>
                        <input type="range" id="obsWater" min="0" max="100" value="70" oninput="document.getElementById('obsWaterVal').textContent = this.value">
                        <span id="obsWaterVal" style="font-weight:600; color:#2F7D4A;">70</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Pest Observations (0-100)</label>
                        <input type="range" id="obsPest" min="0" max="100" value="70" oninput="document.getElementById('obsPestVal').textContent = this.value">
                        <span id="obsPestVal" style="font-weight:600; color:#2F7D4A;">70</span>
                    </div>
                    <div class="form-group">
                        <label>Disease Observations (0-100)</label>
                        <input type="range" id="obsDisease" min="0" max="100" value="70" oninput="document.getElementById('obsDiseaseVal').textContent = this.value">
                        <span id="obsDiseaseVal" style="font-weight:600; color:#2F7D4A;">70</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Weed Condition (0-100)</label>
                        <input type="range" id="obsWeed" min="0" max="100" value="70" oninput="document.getElementById('obsWeedVal').textContent = this.value">
                        <span id="obsWeedVal" style="font-weight:600; color:#2F7D4A;">70</span>
                    </div>
                    <div class="form-group">
                        <label>Soil Observations (0-100)</label>
                        <input type="range" id="obsSoil" min="0" max="100" value="70" oninput="document.getElementById('obsSoilVal').textContent = this.value">
                        <span id="obsSoilVal" style="font-weight:600; color:#2F7D4A;">70</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Farm Activity Records (0-100)</label>
                    <input type="range" id="obsActivity" min="0" max="100" value="70" oninput="document.getElementById('obsActivityVal').textContent = this.value">
                    <span id="obsActivityVal" style="font-weight:600; color:#2F7D4A;">70</span>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="obsNotes" rows="2" placeholder="Any additional observations..."></textarea>
                </div>
                <button class="btn-primary" onclick="saveObservation()">
                    <i class="fas fa-save"></i> Save Observation
                </button>
            `;
        }

        container.innerHTML = html;
    }

    // ============================================================
    // SAVE FUNCTIONS
    // ============================================================

    function saveObservation() {
        const observations = {
            crop_condition: parseInt(document.getElementById('obsCrop').value),
            water_management: parseInt(document.getElementById('obsWater').value),
            pest_observations: parseInt(document.getElementById('obsPest').value),
            disease_observations: parseInt(document.getElementById('obsDisease').value),
            weed_condition: parseInt(document.getElementById('obsWeed').value),
            soil_observations: parseInt(document.getElementById('obsSoil').value),
            farm_activity: parseInt(document.getElementById('obsActivity').value),
            notes: document.getElementById('obsNotes').value.trim()
        };

        const result = calculateFarmScore(observations);
        
        if (result) {
            const scoreHistory = getScoreHistory();
            scoreHistory.push({
                date: new Date().toISOString(),
                score: result.score,
                category: result.category,
                breakdown: result.breakdown,
                missingCategories: result.missingCategories
            });
            saveScoreHistory(scoreHistory);
            updateFarmScore();
            
            // Save as analysis
            saveAnalysis('observation', `Farm Score: ${result.score}% - ${result.category.label}`, 'high');
            showToast(`✅ Farm Score: ${result.score}% (${result.category.label})`, 'success');
        } else {
            showToast('Please provide at least one observation.', 'warning');
        }
    }

    window.saveAnalysis = function(type, result, confidence) {
        const farmer = getFarmer();
        const analysis = {
            id: 'analysis_' + Date.now(),
            type: type,
            result: result,
            confidence: confidence || 'moderate',
            data: currentInvestigation.data,
            farmerName: farmer?.name || 'Farmer',
            date: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        const analyses = getAnalyses();
        analyses.unshift(analysis);
        saveAnalyses(analyses);
        renderHistory();
        
        if (type !== 'observation') {
            closeModal('investigationModal');
            showToast(`✅ Analysis saved: ${result}`, 'success');
        }
    };

    // ============================================================
    // HISTORY
    // ============================================================

    function renderHistory() {
        const container = document.getElementById('historyContainer');
        const filter = document.getElementById('analysisFilter').value;
        let analyses = getAnalyses();

        if (filter !== 'all') {
            analyses = analyses.filter(a => a.type === filter);
        }

        if (analyses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>No investigations have been recorded yet.</p>
                    <button class="btn-primary btn-sm" onclick="document.querySelector('.investigation-card').click()">
                        <i class="fas fa-plus"></i> Start Your First Investigation
                    </button>
                </div>
            `;
            return;
        }

        const typeLabels = {
            pest: '🐛 Pest & Disease',
            soil: '🌍 Soil Assessment',
            plant: '🌱 Plant Health',
            weed: '🌿 Weed ID',
            observation: '📋 Farm Observation'
        };

        let html = '';
        analyses.slice(0, 10).forEach(analysis => {
            const confidenceClass = analysis.confidence === 'high' ? 'high' : analysis.confidence === 'moderate' ? 'moderate' : 'limited';
            html += `
                <div class="result-card" style="border-left-color: ${analysis.confidence === 'high' ? '#2F7D4A' : '#C68A2B'}; cursor:pointer;" onclick="viewAnalysis('${analysis.id}')">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.3rem;">
                        <div>
                            <div class="result-title">${typeLabels[analysis.type] || analysis.type}</div>
                            <div class="result-subtitle">${analysis.result}</div>
                        </div>
                        <span class="result-confidence ${confidenceClass}">${analysis.confidence}</span>
                    </div>
                    <div style="font-size:0.75rem; color:#6B746E; margin-top:0.3rem;">
                        ${new Date(analysis.date).toLocaleDateString()} · ${analysis.farmerName}
                    </div>
                </div>
            `;
        });

        if (analyses.length > 10) {
            html += `<div style="text-align:center; color:#6B746E; padding:0.5rem;">Showing 10 of ${analyses.length} analyses</div>`;
        }

        container.innerHTML = html;
    }

    window.viewAnalysis = function(id) {
        const analyses = getAnalyses();
        const analysis = analyses.find(a => a.id === id);
        if (!analysis) return;

        let details = `📋 **${analysis.type.toUpperCase()} Analysis**\n\n`;
        details += `Result: ${analysis.result}\n`;
        details += `Confidence: ${analysis.confidence}\n`;
        details += `Date: ${new Date(analysis.date).toLocaleString()}\n`;
        
        if (analysis.data) {
            if (analysis.data.description) {
                details += `Description: ${analysis.data.description}\n`;
            }
            if (analysis.data.crop) {
                details += `Crop: ${analysis.data.crop}\n`;
            }
            if (analysis.data.part) {
                details += `Part affected: ${analysis.data.part}\n`;
            }
        }
        
        alert(details);
    };

    // ============================================================
    // SCORE BREAKDOWN
    // ============================================================

    window.showScoreBreakdown = function() {
        const scoreHistory = getScoreHistory();
        const container = document.getElementById('scoreContent');

        if (scoreHistory.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-chart-bar"></i>
                    <p>No farm score data available yet.</p>
                    <p style="font-size:0.8rem;">Record farm observations to build your score.</p>
                </div>
            `;
            openModal('scoreModal');
            return;
        }

        const lastScore = scoreHistory[scoreHistory.length - 1];
        let html = `
            <div style="text-align:center; margin-bottom:1rem;">
                <div style="font-size:2.5rem; font-weight:600; color:${lastScore.category.color};">
                    ${lastScore.score}%
                </div>
                <div style="font-size:1.2rem; color:${lastScore.category.color};">
                    ${lastScore.category.emoji} ${lastScore.category.label}
                </div>
                <div style="font-size:0.85rem; color:#6B746E;">
                    Based on ${lastScore.totalWeight || 100}% data coverage
                </div>
                ${lastScore.missingCategories && lastScore.missingCategories.length > 0 ? 
                    `<div style="margin-top:0.5rem; padding:0.5rem; background:#FDF0E5; border-radius:8px; font-size:0.8rem; color:#C68A2B;">
                        ⚠️ Missing: ${lastScore.missingCategories.join(', ')}
                    </div>` : ''}
            </div>
            <div style="margin-top:1rem;">
                <h4 style="font-family:'Playfair Display',serif; color:#0B3D2E; margin-bottom:0.5rem;">Score Breakdown</h4>
        `;

        if (lastScore.breakdown && lastScore.breakdown.length > 0) {
            lastScore.breakdown.forEach(item => {
                const percentage = item.weight > 0 ? (item.weight / 100 * 100) : 0;
                html += `
                    <div style="display:flex; justify-content:space-between; padding:0.3rem 0; border-bottom:1px solid #EAE7DE;">
                        <span>${item.category}</span>
                        <span style="font-weight:500; color:#2F7D4A;">${Math.round(item.contribution)}%</span>
                    </div>
                `;
            });
        }

        html += `
            </div>
            <div style="margin-top:1rem; padding-top:1rem; border-top:1px solid #EAE7DE;">
                <button class="btn-secondary btn-sm" onclick="closeModal('scoreModal')">Close</button>
                <button class="btn-primary btn-sm" onclick="closeModal('scoreModal'); startInvestigation('observation')">
                    <i class="fas fa-plus"></i> Add More Observations
                </button>
            </div>
        `;

        container.innerHTML = html;
        openModal('scoreModal');
    };

    // ============================================================
    // PHOTO HANDLING
    // ============================================================

    window.handleInvestigationPhoto = function(input, type) {
        const files = input.files;
        if (!files.length) return;

        const previewContainer = document.getElementById(`${type}PhotoPreview`);
        if (!previewContainer) return;

        const currentInvestigationData = currentInvestigation.data;
        if (!currentInvestigationData.images) currentInvestigationData.images = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;

            const reader = new FileReader();
            reader.onload = function(ev) {
                const dataUrl = ev.target.result;
                currentInvestigationData.images.push(dataUrl);
                
                const div = document.createElement('div');
                div.className = 'photo-preview-item';
                div.innerHTML = `
                    <img src="${dataUrl}" alt="Uploaded photo">
                    <div class="remove-photo" onclick="this.parentElement.remove();">
                        <i class="fas fa-times"></i>
                    </div>
                `;
                previewContainer.appendChild(div);
                previewContainer.style.display = 'grid';
            };
            reader.readAsDataURL(file);
        }
        input.value = '';
    };

    // ============================================================
    // ASK AI TO EXPLAIN
    // ============================================================

    window.askAIAboutAnalysis = function(type, result) {
        const message = `Can you explain this ${type} analysis result: "${result}"`;
        localStorage.setItem('agrinova_ai_analysis_context', JSON.stringify({
            type: type,
            result: result,
            timestamp: new Date().toISOString()
        }));
        window.location.href = 'ai-assistant.html?q=' + encodeURIComponent(message);
    };

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
                        const analyses = getAnalyses();
                        const results = analyses.filter(a => 
                            a.result.toLowerCase().includes(query) ||
                            a.type.toLowerCase().includes(query) ||
                            (a.data?.crop && a.data.crop.toLowerCase().includes(query))
                        );
                        if (results.length > 0) {
                            showToast(`Found ${results.length} analysis${results.length > 1 ? 's' : ''} matching "${query}"`, 'success');
                        } else {
                            showToast(`No analyses found matching "${query}"`, 'warning');
                        }
                    }
                }
            });
        }
    }

    // ============================================================
    // MODAL HELPERS
    // ============================================================

    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    };

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ============================================================
    // DATE
    // ============================================================

    function updateDate() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('dateDay').textContent = days[now.getDay()];
        document.getElementById('dateFull').textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }

    // ============================================================
    // INIT
    // ============================================================

    function init() {
        console.log('AgriNova Farm Analysis & Identification Initializing...');
        console.log(`Pests: ${Object.keys(PEST_DATABASE).length}, Diseases: ${Object.keys(DISEASE_DATABASE).length}, Weeds: ${Object.keys(WEED_DATABASE).length}`);
        console.log(`Soils: ${Object.keys(SOIL_DATABASE).length}, Crops: ${Object.keys(CROP_SUITABILITY).length}`);
        
        updateDate();
        updateProfile();
        setupProfileImage();
        setupDropdown();
        setupSearch();
        setupLanguageSelector();
        setupNotifications();
        fetchWeather();
        
        updateFarmScore();
        renderHistory();

        // Auto-generate a score if observations exist
        const dailyRecords = getDailyRecords();
        if (dailyRecords.length > 0) {
            // Check if we have a recent score
            const scoreHistory = getScoreHistory();
            const lastScore = scoreHistory.length > 0 ? scoreHistory[scoreHistory.length - 1] : null;
            if (!lastScore || new Date() - new Date(lastScore.date) > 7 * 24 * 60 * 60 * 1000) {
                // Generate score from daily records
                generateScoreFromDailyRecords(dailyRecords);
            }
        }

        console.log('AgriNova Farm Analysis & Identification Ready.');
    }

    function generateScoreFromDailyRecords(dailyRecords) {
        // Simple score generation from daily records
        // This is a placeholder - actual scoring will use the full SCORE_CONFIG
        const activities = dailyRecords.flatMap(r => r.activities || []);
        const observations = dailyRecords.flatMap(r => r.observations || []);
        
        let cropScore = 70;
        let waterScore = 70;
        let pestScore = 70;
        let diseaseScore = 70;
        let weedScore = 70;
        let soilScore = 70;
        let activityScore = Math.min(100, activities.length * 10 + 50);
        
        const farmObservations = {
            crop_condition: cropScore,
            water_management: waterScore,
            pest_observations: pestScore,
            disease_observations: diseaseScore,
            weed_condition: weedScore,
            soil_observations: soilScore,
            farm_activity: activityScore
        };
        
        const result = calculateFarmScore(farmObservations);
        if (result) {
            const scoreHistory = getScoreHistory();
            scoreHistory.push({
                date: new Date().toISOString(),
                score: result.score,
                category: result.category,
                breakdown: result.breakdown,
                missingCategories: result.missingCategories,
                source: 'auto_generated'
            });
            saveScoreHistory(scoreHistory);
            updateFarmScore();
        }
    }

    // ============================================================
    // EXPOSE FUNCTIONS
    // ============================================================

    window.startInvestigation = startInvestigation;
    window.showScoreBreakdown = showScoreBreakdown;
    window.saveAnalysis = saveAnalysis;
    window.viewAnalysis = viewAnalysis;
    window.askAIAboutAnalysis = askAIAboutAnalysis;
    window.handleInvestigationPhoto = handleInvestigationPhoto;
    window.closeModal = closeModal;
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


/* ================================================================
   SUPABASE + GEMINI AI INTEGRATION
   ================================================================ */
(function () {
  "use strict";

  const cfg = window.AGRINOVA_FARM_ANALYSIS_CONFIG || {};
  const langNames = { en: "English", am: "Amharic", ti: "Tigrinya", om: "Afaan Oromo", so: "Somali" };
  let client = null;
  let user = null;
  let farmContext = { profile: null, crops: [], dailyFarm: [], dailyCrops: [] };
  let activeType = "pest";
  let selectedPhotos = [];
  let latestAiScore = null;

  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const currentLanguage = () => localStorage.getItem("agrinova_language") || "en";

  function status(message, state = "") {
    const el = $("dataConnectionStatus");
    if (!el) return;
    el.className = `data-connection-status ${state}`;
    el.innerHTML = `<span class="status-dot"></span><span>${esc(message)}</span>`;
  }

  function configured() {
    return !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
      !String(cfg.SUPABASE_URL).includes("YOUR_") && !String(cfg.SUPABASE_ANON_KEY).includes("YOUR_"));
  }

  async function initSupabase() {
    if (!configured()) {
      status("Supabase is not configured yet. Add your Supabase Project URL and anon key at the top of farm-analysis.js.", "error");
      return;
    }
    if (!window.supabase?.createClient) {
      status("Supabase client library did not load. Check your internet connection.", "error");
      return;
    }
    try {
      client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
      const { data: { session }, error } = await client.auth.getSession();
      if (error) throw error;
      if (!session?.user) {
        status("Sign in to AgriNova to load your private farm records.", "error");
        return;
      }
      user = session.user;
      await loadFarmContext();
      await loadLatestScore();
      await loadAnalysisHistory();
      if (!latestAiScore && (farmContext.profile || farmContext.crops.length || farmContext.dailyFarm.length || farmContext.dailyCrops.length)) {
        // First-use assessment: populate the circular score automatically when real farm data exists.
        await runAiScore();
      }
    } catch (error) {
      console.error("Farm Analysis Supabase initialization:", error);
      status(`Could not connect to Supabase: ${error.message || "Unknown error"}`, "error");
    }
  }

  async function loadFarmContext() {
    if (!client || !user) return;
    status("Loading your farm profile, crops and daily records…");
    const [profileRes, cropsRes, dailyFarmRes, dailyCropsRes] = await Promise.all([
      client.from("farmer_profiles").select("*").eq("id", user.id).maybeSingle(),
      client.from("my_crops").select("*").eq("farmer_id", user.id).order("planting_date", { ascending: false }),
      client.from("daily_farm_records").select("*").eq("farmer_id", user.id).order("record_date", { ascending: false }).limit(100),
      client.from("crop_checkpoints").select("*").eq("farmer_id", user.id).limit(100)
    ]);
    const errors = [profileRes, cropsRes, dailyFarmRes, dailyCropsRes].filter(r => r.error).map(r => r.error.message);
    if (profileRes.error && !/created_at|column/i.test(profileRes.error.message)) console.warn("farmer_profiles:", profileRes.error);
    farmContext = {
      profile: profileRes.data || null,
      crops: cropsRes.data || [],
      dailyFarm: dailyFarmRes.data || [],
      dailyCrops: dailyCropsRes.data || []
    };
    $("farmDataCount").textContent = farmContext.profile ? "Profile connected" : "Profile not found";
    $("cropsDataCount").textContent = `${farmContext.crops.length} crop record${farmContext.crops.length === 1 ? "" : "s"}`;
    $("dailyFarmDataCount").textContent = `${farmContext.dailyFarm.length} daily record${farmContext.dailyFarm.length === 1 ? "" : "s"}`;
    $("dailyCropsDataCount").textContent = `${farmContext.dailyCrops.length} checkpoint${farmContext.dailyCrops.length === 1 ? "" : "s"}`;
    if (errors.length) {
      status(`Connected with some data-source issues: ${errors.join(" · ")}`, "error");
    } else {
      status("Connected · all four Supabase data sources loaded for your signed-in account.", "connected");
    }
    populateCropSelect();
    const phone = farmContext.profile?.phone;
    if (phone && $("smartPhone") && !$("smartPhone").value) $("smartPhone").value = phone;
  }

  async function loadLatestScore() {
    if (!client || !user) return;
    const { data, error } = await client.from("farm_analysis_scores").select("*").eq("farmer_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (error) {
      console.warn("Latest farm score could not be loaded:", error.message);
      return;
    }
    if (data) renderScore(data.score, data.category, data.coverage, data.created_at, data.summary, data);
  }

  function populateCropSelect() {
    const select = $("smartCrop");
    if (!select) return;
    const keep = select.value;
    select.innerHTML = '<option value="">Choose crop (or describe below)</option>' + farmContext.crops.map(c => {
      const name = c.crop_name || c.name || "Unnamed crop";
      return `<option value="${esc(name)}">${esc(name)}${c.field_name ? ` · ${esc(c.field_name)}` : ""}</option>`;
    }).join("");
    if (keep) select.value = keep;
  }

  async function loadAnalysisHistory() {
    if (!client || !user) return;
    const container = $("historyContainer");
    if (!container) return;
    const { data, error } = await client.from("farm_analysis_results").select("*").eq("farmer_id", user.id).order("created_at", { ascending: false }).limit(20);
    if (error) { console.warn("AI analysis history unavailable:", error.message); return; }
    if (!data?.length) return;
    container.querySelector(".supabase-ai-history")?.remove();
    const section = document.createElement("section");
    section.className = "supabase-ai-history";
    section.innerHTML = `<h4 style="margin:1.2rem 0 .7rem;color:#16452e">Saved AI investigations</h4><div class="data-record-list">${data.map(row => {
      const ai = row.ai_result || {};
      return `<article class="data-record-item"><div style="display:flex;justify-content:space-between;gap:.6rem;flex-wrap:wrap"><strong>${esc(ai.identification || row.result_type || "AI analysis")}</strong><small>${row.created_at ? new Date(row.created_at).toLocaleString() : ""}</small></div><p>${esc(row.crop_name || "Crop not specified")} · ${esc(ai.confidence || "Confidence unavailable")}</p><p>${esc(ai.explanation || "")}</p><details><summary>View protection advice</summary><ul>${(Array.isArray(ai.protection_steps) ? ai.protection_steps : []).map(x => `<li>${esc(x)}</li>`).join("")}</ul></details></article>`;
    }).join("")}</div>`;
    container.appendChild(section);
  }

  const sourceConfig = {
    farm: { title: "My Farm · Supabase profile", data: () => farmContext.profile ? [farmContext.profile] : [] },
    crops: { title: "My Crops · Supabase crop records", data: () => farmContext.crops },
    dailyFarm: { title: "Daily Farm · Activities and observations", data: () => farmContext.dailyFarm },
    dailyCrops: { title: "Daily Crops · Crop checkpoints", data: () => farmContext.dailyCrops }
  };

  window.openFarmDataSource = function (key) {
    const source = sourceConfig[key];
    if (!source) return;
    const rows = source.data();
    $("farmDataModalTitle").textContent = source.title;
    $("farmDataModalContent").innerHTML = rows.length
      ? `<div class="data-record-list">${rows.map((row, i) => `<article class="data-record-item"><strong>Record ${i + 1}</strong><pre>${esc(JSON.stringify(row, null, 2))}</pre></article>`).join("")}</div>`
      : '<div class="empty-state"><p>No records were found in this source yet.</p><p>When you add records in the corresponding AgriNova page, they will appear here after refresh.</p></div>';
    if (typeof window.openModal === "function") window.openModal("farmDataModal");
  };

  window.openSmartInvestigation = function (type = "pest") {
    activeType = type;
    selectedPhotos = [];
    const titleMap = { pest: "Pest & Disease Investigation", soil: "Soil Assessment", plant: "Plant Health Check", weed: "Weed Identification", observation: "General Farm Observation" };
    $("smartInvestigationTitle").textContent = titleMap[type] || "Farm Investigation";
    const concern = type === "pest" ? "pest" : type === "soil" ? "soil" : type === "plant" ? "plant_health" : type === "weed" ? "weed" : "other";
    $("smartConcern").value = concern;
    $("smartDescription").value = "";
    $("smartField").value = farmContext.profile ? [farmContext.profile.city, farmContext.profile.region].filter(Boolean).join(", ") : "";
    $("smartPhotos").value = "";
    $("smartPhotoPreview").innerHTML = "";
    $("smartDiagnosisResult").hidden = true;
    $("smartInvestigationForm").hidden = false;
    $("smartInvestigationModal").classList.add("show");
    document.body.style.overflow = "hidden";
  };

  window.closeSmartInvestigation = function () {
    $("smartInvestigationModal").classList.remove("show");
    document.body.style.overflow = "auto";
  };

  async function compressImage(file) {
    if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
      reader.readAsDataURL(file);
    });
    const img = await new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = dataUrl;
    });
    const scale = Math.min(1, 1400 / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", .82));
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(",")[1]); reader.onerror = reject; reader.readAsDataURL(blob);
    });
    return { blob, base64, mime_type: "image/jpeg", original_name: file.name };
  }

  async function savePhotosForUser(images) {
    const storedPaths = [];
    for (const img of images) {
      const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
      const { error } = await client.storage.from(cfg.PHOTO_BUCKET || "farm-analysis-photos").upload(path, img.blob, { contentType: "image/jpeg", upsert: false });
      if (error) throw new Error(`Photo upload failed: ${error.message}`);
      storedPaths.push(path);
    }
    return storedPaths;
  }

  function showDiagnosis(result, savedPaths) {
    const data = result.analysis || result.result || result;
    const actions = Array.isArray(data.protection_steps) ? data.protection_steps : Array.isArray(data.recommended_actions) ? data.recommended_actions : [];
    const symptoms = Array.isArray(data.observed_signs) ? data.observed_signs : [];
    const confidence = data.confidence || "Needs field verification";
    const html = `<div class="ai-result-meta"><span class="ai-result-chip">AI analysis</span><span class="ai-result-chip">${esc(confidence)} confidence</span>${data.urgency ? `<span class="ai-result-chip">${esc(data.urgency)} priority</span>` : ""}</div>
      <h4>${esc(data.identification || data.likely_issue || "Analysis completed")}</h4>
      <p>${esc(data.explanation || data.summary || "No explanation was returned.")}</p>
      ${symptoms.length ? `<p><strong>Signs considered</strong></p><ul>${symptoms.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      ${actions.length ? `<p><strong>What to do to protect your crop</strong></p><ol>${actions.map(x => `<li>${esc(typeof x === "string" ? x : x.action || x.step || JSON.stringify(x))}</li>`).join("")}</ol>` : ""}
      ${data.when_to_seek_help ? `<p><strong>When to seek help:</strong> ${esc(data.when_to_seek_help)}</p>` : ""}
      <p class="ai-disclaimer"><small>${esc(data.caution || "AI identification is an advisory assessment, not a laboratory diagnosis. Confirm serious or spreading problems with a local agricultural extension officer before applying treatments.")}</small></p>
      ${savedPaths?.length ? `<p><small>${savedPaths.length} photo(s) saved securely to your farm analysis records.</small></p>` : ""}`;
    $("smartDiagnosisResult").innerHTML = html;
    $("smartDiagnosisResult").hidden = false;
    $("smartInvestigationForm").hidden = true;
  }

  async function submitDiagnosis(event) {
    event.preventDefault();
    if (!client || !user) {
      alert("Please sign in and connect this page to your Supabase project before running AI analysis.");
      return;
    }
    const description = $("smartDescription").value.trim();
    if (!description) return alert("Please describe what you see so the AI has enough context.");
    const button = $("runSmartDiagnosis");
    button.disabled = true; button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing…';
    $("smartDiagnosisResult").hidden = false;
    $("smartDiagnosisResult").innerHTML = '<div class="ai-loading"><i class="fas fa-spinner fa-spin"></i> Uploading photos and asking the AgriNova AI agronomist…</div>';
    try {
      const allFiles = Array.from($("smartPhotos").files || []);
      if (allFiles.length > 5) throw new Error("Please choose no more than five photos for one AI investigation.");
      const files = allFiles;
      const images = await Promise.all(files.map(compressImage));
      const savedPaths = images.length ? await savePhotosForUser(images) : [];
      const payload = {
        action: "diagnose", language: currentLanguage(), type: $("smartConcern").value,
        crop: $("smartCrop").value || null, plant_part: $("smartPlantPart").value || null,
        field_location: $("smartField").value.trim() || null, contact_phone: $("smartPhone").value.trim() || null,
        severity: $("smartSeverity").value, description, photo_paths: savedPaths,
        images: images.map(({ base64, mime_type, original_name }) => ({ data_base64: base64, mime_type, original_name }))
      };
      const { data, error } = await client.functions.invoke(cfg.AI_FUNCTION_NAME || "analyze-farm-health", { body: payload });
      if (error) throw new Error(error.message || "AI function request failed");
      if (data?.error) throw new Error(data.error);
      showDiagnosis(data, savedPaths);
      await loadAnalysisHistory();
      if (typeof window.showToast === "function") window.showToast("AI analysis completed and saved.", "success");
    } catch (error) {
      console.error("AI diagnosis error:", error);
      $("smartDiagnosisResult").innerHTML = `<p><strong>AI analysis could not complete.</strong></p><p>${esc(error.message || "Unknown error")}</p><p>Check the Edge Function deployment, Gemini secret, Supabase Storage policies and browser console. No offline guess has been presented as an AI diagnosis.</p>`;
    } finally {
      button.disabled = false; button.innerHTML = '<i class="fas fa-robot"></i> Analyze with AI';
    }
  }

  function renderScore(score, category, coverage, createdAt, summary, fullRecord = null) {
    if (score === null || score === undefined) return;
    latestAiScore = fullRecord || { score, category, coverage, created_at: createdAt, summary };
    const value = Math.max(0, Math.min(100, Number(score)));
    const circle = $("scoreCircle"), text = $("scoreText"), label = $("scoreLabel");
    const circumference = 2 * Math.PI * 50;
    circle.style.strokeDasharray = `${circumference * value / 100} ${circumference}`;
    circle.style.stroke = value >= 75 ? "#2F7D4A" : value >= 50 ? "#C68A2B" : "#B85C45";
    text.textContent = `${Math.round(value)}%`;
    label.textContent = "out of 100";
    $("healthStatus").textContent = `AI Farm Health: ${category || "Assessment"}`;
    $("healthDescription").textContent = `${summary || "AI assessment of your four connected farm data sources."} · Data coverage ${coverage ?? "—"}%`;
    $("lastAssessment").textContent = createdAt ? new Date(createdAt).toLocaleString() : "Just now";
  }

  async function runAiScore() {
    if (!client || !user) return alert("Please sign in and configure Supabase first.");
    const button = $("runAiScore");
    button.disabled = true; button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI is reviewing your farm…';
    status("AI is reviewing My Farm, My Crops, Daily Farm and Daily Crops…");
    try {
      const { data, error } = await client.functions.invoke(cfg.AI_FUNCTION_NAME || "analyze-farm-health", { body: { action: "score", language: currentLanguage() } });
      if (error) throw new Error(error.message || "AI score request failed");
      if (data?.error) throw new Error(data.error);
      const score = data.score;
      renderScore(score, data.category, data.coverage, data.created_at || new Date().toISOString(), data.summary, data);
      status("AI farm health assessment saved to Supabase.", "connected");
      if (typeof window.showToast === "function") window.showToast("Farm health score updated from your four data sources.", "success");
    } catch (error) {
      console.error("AI farm score error:", error);
      status(`AI score failed: ${error.message}`, "error");
      alert(`The AI farm score could not be generated. ${error.message}`);
    } finally {
      button.disabled = false; button.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Analyze all 4 data sources with AI';
    }
  }

  window.showScoreBreakdown = function () {
    if (!latestAiScore) {
      if (typeof window.openModal === "function") window.openModal("scoreModal");
      $("scoreContent").innerHTML = '<div class="empty-state"><p>No AI farm score is saved yet.</p><p>Choose “Analyze all 4 data sources with AI” to generate one.</p></div>';
      return;
    }
    const s = latestAiScore;
    const breakdown = Array.isArray(s.breakdown) ? s.breakdown : [];
    const list = (items) => (Array.isArray(items) ? items : []).map(x => `<li>${esc(x)}</li>`).join("");
    $("scoreContent").innerHTML = `<div class="score-breakdown-ai"><div style="text-align:center;padding:.8rem"><strong style="font-size:2.4rem;color:#2F7D4A">${esc(s.score)}%</strong><p>out of 100 · ${esc(s.category || "AI assessment")}</p><small>Data coverage: ${esc(s.coverage ?? "—")}%</small></div><p>${esc(s.summary || "")}</p><h4>Four-source breakdown</h4>${breakdown.map(item => `<div class="data-record-item"><strong>${esc(item.source || "Farm data")}: ${esc(item.score ?? "—")}/100</strong><p>${esc(item.reason || "")}</p></div>`).join("")}<h4>Priority actions</h4><ul>${list(s.priority_actions)}</ul><h4>Missing information</h4><ul>${list(s.missing_information)}</ul></div>`;
    if (typeof window.openModal === "function") window.openModal("scoreModal");
  };

  function bindUI() {
    document.querySelectorAll(".farm-data-card").forEach(button => button.addEventListener("click", () => window.openFarmDataSource(button.dataset.source)));
    $("refreshFarmData")?.addEventListener("click", async () => { await loadFarmContext(); await runAiScore(); });
    $("runAiScore")?.addEventListener("click", runAiScore);
    $("smartInvestigationForm")?.addEventListener("submit", submitDiagnosis);
    $("smartPhotos")?.addEventListener("change", () => {
      const allFiles = Array.from($("smartPhotos").files || []);
      if (allFiles.length > 5) throw new Error("Please choose no more than five photos for one AI investigation.");
      const files = allFiles;
      $("smartPhotoPreview").innerHTML = "";
      files.forEach(file => {
        const url = URL.createObjectURL(file);
        const img = document.createElement("img"); img.src = url; img.alt = "Selected farm photo";
        img.onload = () => URL.revokeObjectURL(url);
        $("smartPhotoPreview").appendChild(img);
      });
    });
    $("smartInvestigationModal")?.addEventListener("click", e => { if (e.target.id === "smartInvestigationModal") window.closeSmartInvestigation(); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindUI();
    initSupabase();
  });
})();
