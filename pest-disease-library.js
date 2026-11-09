/* =========================================================
   AgriNova Pest & Disease Library
   ========================================================= */

/* ---------- LANGUAGE BANNER ---------- */
const LANG_NAMES = { am:"Amharic", ti:"Tigrinya", en:"English", om:"Afaan Oromo", so:"Somali" };

const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");
const langLabel = document.getElementById("langLabel");
const banner = document.getElementById("langBanner");
const bannerMsg = document.getElementById("bannerMsg");
const bannerClose = document.getElementById("bannerClose");

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = langMenu.classList.toggle("open");
  langBtn.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", () => langMenu.classList.remove("open"));

langMenu.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", (e) => {
    e.stopPropagation();
    const lang = li.dataset.lang;
    const name = LANG_NAMES[lang];
    langLabel.textContent = name;
    langMenu.classList.remove("open");

    if (lang === "en") {
      banner.hidden = true;
      return;
    }
    bannerMsg.innerHTML =
      `To read this page in <strong>${name}</strong>, use your browser's built-in translation: ` +
      `click the translate icon in your address bar and choose <strong>${name}</strong>. ` +
      `If your browser doesn't offer it, open this page in Google Chrome.`;
    banner.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

bannerClose.addEventListener("click", () => { banner.hidden = true; });

/* ---------- DATA ---------- */
const entries = [
  /* ================= PESTS ================= */
  {id:"PEST-001",name:"Fall Armyworm",sci:"Spodoptera frugiperda",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Fall+Armyworm",
    desc:"A lepidopteran pest native to the Americas, first reported in Africa in 2016. The larva is the damaging stage and can destroy maize from seedling through ear development.",
    sym:["Window-pane feeding on young leaves","Ragged holes and moist sawdust-like frass in the whorl","'Dead heart' in young maize plants","Larvae with inverted white 'Y' on head and four dark spots in a square"],
    crops:["Maize (primary host)","Sorghum, rice, wheat, millet, sugarcane","Cowpea, cotton, tobacco (secondary)"],
    causes:"Polyphagous larval feeding; spread by moth flight and wind-assisted migration. No prolonged diapause, continuous maize cropping and poor field sanitation increase infestation.",
    prev:["Destroy crop residues and volunteer maize after harvest","Rotate maize with non-host legumes","Intercrop with cowpea or desmodium (push-pull)","Synchronise planting within the community","Scout fields from emergence"],
    ctrl:["Handpick and destroy egg masses and young larvae","Apply sand-ash mixture into whorls of young plants","Conserve natural enemies (parasitoid wasps, predatory bugs)","Use Bacillus thuringiensis where locally registered"],
    treat:["Registered insecticides targeting lepidopteran larvae, directed at the whorl","Rotate active ingredients to delay resistance","Follow label instructions and pre-harvest intervals"],
    life:"Eggs hatch in 3–5 days; six larval instars span 14–22 days; pupal stage 7–13 days; adults live up to 21 days. Females lay 100–200 eggs per mass (up to 2,000 per female). Full cycle 24–40 days at warm temperatures.",
    extra:"Endemic across Ethiopian maize-growing regions. Regionally monitored through DLCO-EA and FAO forecasting efforts."},

  {id:"PEST-002",name:"African Armyworm",sci:"Spodoptera exempta",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=African+Armyworm",
    desc:"A noctuid moth native to Africa, characterised by episodic outbreak dynamics. Larvae feed on grasses and cereals and can destroy entire fields within days during outbreak years.",
    sym:["'Window-pane' or skeletonised feeding on grass/cereal leaves","Ragged leaf margins and heavy defoliation","Complete defoliation of patches; fields appear grazed or mown","Larvae march in bands across roads and field boundaries"],
    crops:["Maize, sorghum, millet, rice, wheat","Sugarcane and pasture grasses (outbreak years)","Cowpea and legumes (when cereals are depleted)"],
    causes:"Rainfall-driven population build-up on flush grass growth; larvae become gregarious at high density and march. Moths migrate long distances on prevailing winds.",
    prev:["Follow armyworm forecasting and early warning systems","Reduce dense continuous grass stands around fields","Plant early and synchronise planting","Destroy crop residues and volunteer cereals","Scout after heavy rains and elevated forecasts"],
    ctrl:["Create physical barriers (trenches, ash lines) to redirect marching larvae","Handpick larvae in smallholder plots","Conserve parasitic wasps, predatory beetles, and birds","Bacillus thuringiensis against early-instar larvae"],
    treat:["Coordinated community or regional chemical control during outbreaks","Use only locally registered products","Rotate active ingredients; avoid sub-lethal applications"],
    life:"Life cycle completed in roughly four to six weeks under warm conditions; multiple generations per year. Outbreaks linked to rainfall patterns and grass availability.",
    extra:"A mandated target pest of DLCO-EA alongside desert locust and quelea birds. Damage is highly episodic, not annual."},

  {id:"PEST-003",name:"Desert Locust",sci:"Schistocerca gregaria",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Desert+Locust",
    desc:"Widely regarded as the most destructive transboundary agricultural pest globally. Under favourable conditions, solitary individuals transform into gregarious hopper bands and adult swarms.",
    sym:["Hopper bands in rangeland or fallow areas","Rapid and complete defoliation of cereals, pulses, vegetables","Fields appear stripped or 'mown' with little frass or webbing","Visible moving swarms and audible feeding"],
    crops:["Maize, sorghum, wheat, barley, millet, rice","Irrigated vegetables, orchards, and pulses","Cotton, sesame, pasture and rangeland vegetation"],
    causes:"Gregarious-phase feeding triggered by favourable rainfall in recession breeding areas, producing vegetation flush and population build-up. Wind-assisted migration carries swarms into crops.",
    prev:["Follow national plant protection and DLCO-EA advisories","Report unusual grasshopper concentrations immediately","Delay planting in active swarm corridors","Reduce dense grass cover in known breeding areas"],
    ctrl:["Report sightings immediately; do not attempt to control swarms alone","National locust control units use ground or aerial equipment","Biological: Metarhizium acridum (coordinated by specialised agencies)","Physical barriers in smallholder gardens"],
    treat:["Chemical control coordinated by government and regional bodies","Only registered insecticides via official channels","Strict adherence to safety and environmental precautions"],
    life:"Egg stage 10–65 days (temperature/moisture dependent), hopper stage (several moults), adult stage. Swarms travel tens to over 150 km per day on favourable winds.",
    extra:"The 2020 East Africa upsurge was described as unprecedented in decades. Cross-border coordination across Ethiopia, Kenya, Somalia, Eritrea, Djibouti, Sudan, and Uganda is essential."},

  {id:"PEST-004",name:"Aphids",sci:"Aphis spp.",cat:"Pest",sev:"Medium-High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Aphids",
    desc:"Small, soft-bodied insects (1–3 mm) in the family Aphididae. Damage arises both directly from feeding and, more importantly, from virus transmission.",
    sym:["Small clusters on leaf undersides, growing tips, flower buds","Dense colonies with sticky honeydew on upper leaf surfaces","Black sooty mould on honeydew-coated leaves","Leaf curling, yellowing, stunting; virus symptoms may appear"],
    crops:["Wheat, barley, maize (as virus vectors)","Tomato, pepper, eggplant, okra, cucumber","Faba bean, chickpea, lentil, cowpea, groundnut","Cotton, coffee, potato, citrus, mango"],
    causes:"Winged migrants colonise fields; rapid parthenogenetic reproduction allows explosive population growth. Warm dry conditions and excessive nitrogen favour build-up.",
    prev:["Conserve natural enemies (ladybirds, lacewings, hoverflies)","Rotate crops and avoid overlapping plantings","Balanced fertilisation; avoid excessive nitrogen","Remove alternate weed hosts","Use resistant or tolerant varieties"],
    ctrl:["Wash aphids off with a strong water jet","Remove and destroy heavily infested shoots","Encourage or release natural enemies","Insecticidal soap and neem-based products"],
    treat:["Registered aphicides only when scouting justifies intervention","Rotate active ingredients to delay resistance","Observe pre-harvest intervals; protect pollinators","Do not spray prophylactically"],
    life:"Reproduce parthenogenetically for much of the year; females give birth to live nymphs. Winged forms (alatae) produced when colonies become crowded.",
    extra:"In crops where aphids transmit devastating viruses (potato, cereals), severity is elevated regardless of direct feeding damage."},

  {id:"PEST-005",name:"Whiteflies",sci:"Bemisia tabaci",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Whiteflies",
    desc:"Small sap-sucking insects with white, powdery wings. Serious economic damage to vegetables, including tomato, arises from direct feeding, honeydew, and virus transmission.",
    sym:["Small white adults fly up when plants are disturbed","Eggs and scale-like nymphs on leaf undersides","Honeydew and black sooty mould on upper leaf surfaces","Yellowing, wilting, irregular ripening; virus symptoms"],
    crops:["Tomato (major host), pepper, eggplant, okra, cucumber","Cabbage and other brassicas","Cotton, tobacco, sweet potato, potato","Citrus, mango, papaya"],
    causes:"Feeding and virus transmission (begomoviruses); high reproductive rate under warm conditions; ability to develop insecticide resistance. Continuous cropping favours build-up.",
    prev:["Rotate with non-susceptible crops and remove residues","Control broadleaf alternate hosts","Use insect-proof nets in nurseries and screen houses","Conserve parasitoids (Encarsia spp.) and predators","Yellow sticky traps for monitoring"],
    ctrl:["Remove and destroy heavily infested older leaves","Yellow sticky traps to reduce adult numbers","Conserve local parasitoids in open-field systems","Neem-based products and insecticidal soaps"],
    treat:["Rotate among different mode-of-action groups (resistance management)","Use only locally registered products","Follow label instructions and pre-harvest intervals"],
    life:"Reproduces rapidly in warm conditions; populations build to high densities on leaf undersides. Cryptic species complex with multiple biotypes.",
    extra:"Rated High due to dual role as direct pest and efficient vector of destructive viruses (e.g., tomato leaf curl viruses)."},

  {id:"PEST-006",name:"Tomato Leafminer",sci:"Tuta absoluta",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Tomato+Leafminer",
    desc:"Small moth native to South America, first described in Ethiopia in 2013. One of the most destructive invasive pests of tomato in East Africa; can cause up to 100% crop loss.",
    sym:["Serpentine silvery mines on leaves; larvae visible when held to light","Multiple mines coalescing; leaves bloated, distorted, or necrotic","Frass at mine openings; larvae may mine stems and green fruits","Fruit entry holes with internal galleries; secondary rot; premature drop"],
    crops:["Tomato (primary host)","Eggplant, pepper, potato (secondary)","Solanaceous weeds such as Datura stramonium"],
    causes:"Larval mining inside plant tissues; spread by moth flight, wind, and human transport of infested material. Continuous tomato production and warm dry conditions favour outbreaks.",
    prev:["Rotate tomato with non-solanaceous crops","Sanitation: destroy infested plants and residues","Use insect-proof nurseries","Pheromone traps for early detection","Insect-proof nets in small-scale production"],
    ctrl:["Remove and destroy mined leaves and infested fruits","Pheromone mass trapping and mating disruption","Trichogramma parasitoids and predatory mirids in IPM programs","Soil solarisation to reduce pupae"],
    treat:["Systemic or translaminar products (registered) where extension guidance supports","Rotate active ingredients; resistance is documented","Bt formulations target young larvae before leaf entry","Follow label instructions and pre-harvest intervals"],
    life:"At 27°C, biological cycle takes 24–38 days; multiple overlapping generations per year. Adult moth 5–6 mm, wingspan 8–10 mm, greyish forewings with banded antennae.",
    extra:"Established across Ethiopian tomato-growing regions. Major impediment to production where sanitation and monitoring are inadequate."},

  {id:"PEST-007",name:"Maize Stem Borer",sci:"Busseola fusca",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Maize+Stem+Borer",
    desc:"A noctuid stem borer native to Africa; one of the dominant stem borer species in Ethiopian maize and sorghum, particularly at higher and mid-altitude agro-ecologies.",
    sym:["Small irregular 'shot-hole' damage on young leaves","Yellowing and wilting of central leaves; entry holes with frass","'Dead heart' — central growing point dies","Stem tunnelling; weakened stems may lodge; reduced cob formation"],
    crops:["Maize (primary)","Sorghum","Occasionally pearl and finger millet"],
    causes:"Larval feeding; overwinters in crop residues and stubble. Continuous maize cultivation without residue destruction allows populations to carry over.",
    prev:["Destroy or incorporate stubble after harvest","Rotate with non-host crops (legumes, root crops)","Use tolerant maize varieties","Plant early and synchronise within community","Remove volunteer maize and sorghum"],
    ctrl:["Handpick larvae from whorls in small plots","Apply dry sand-ash mixture into whorls","Conserve parasitoids (Cotesia spp.) and predatory ants","Bt formulations for early instars in whorl"],
    treat:["Foliar insecticides are less effective once larvae are in the stem","Target early-instar larvae in whorls with registered products","Avoid prophylactic spraying"],
    life:"Moths lay eggs on young maize leaves; hatching larvae move into the whorl then bore into the stem. Overwinters in crop residues.",
    extra:"Distribution overlaps with Chilo partellus; species-level confirmation requires larval identification or rearing."},

  {id:"PEST-008",name:"Spotted Stem Borer",sci:"Chilo partellus",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Spotted+Stem+Borer",
    desc:"A crambid stem borer often dominant in warmer, lower-altitude maize and sorghum areas of Ethiopia and East Africa. Part of the lepidopteran stem borer complex.",
    sym:["Window-pane feeding or small holes on young leaves in whorl","Frass in the whorl","Yellowing of central leaves and stunting","Dead heart; stem tunnelling; reduced cob size; lodging"],
    crops:["Maize, sorghum, rice, pearl and finger millet","Sugarcane","Wild grasses (alternate hosts)"],
    causes:"Larval feeding; carries over in crop residues and stubble. Distribution influenced by altitude and temperature; warmer areas favour this species over B. fusca.",
    prev:["Plough under or burn maize/sorghum stubble","Rotate cereals with non-host crops","Use tolerant varieties","Synchronise planting","Scout whorls from vegetative stage"],
    ctrl:["Handpick larvae from whorls in small plots","Apply sand-ash into whorls","Conserve Cotesia and Trichogramma parasitoids","Bt formulations against early instars"],
    treat:["Target early-instar larvae before they enter the stem","Use locally registered products; follow label instructions","Avoid spraying after larvae are protected inside the stem"],
    life:"Moths disperse to new fields; larvae feed in whorl then bore into stem. Overwinters in crop residues.",
    extra:"In Ethiopian surveys, sometimes comprises the majority of the stem borer population in specific agro-ecologies."},

  {id:"PEST-009",name:"Maize Weevil",sci:"Sitophilus zeamais",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Maize+Weevil",
    desc:"A small snout beetle (3–4 mm) that is a primary storage pest of maize and other grains. Adults and larvae feed inside kernels, hollowing them out.",
    sym:["A few adult weevils on the grain surface","Small round emergence holes on kernels","Grain heating and musty smell","Powdery frass accumulating at the bottom of containers"],
    crops:["Maize (primary)","Sorghum, wheat, rice, barley","Stored cassava chips"],
    causes:"Feeding and reproduction in stored grain; infestation begins in the field before harvest. Poor storage practices (high moisture, unsealed containers) favour rapid growth.",
    prev:["Harvest promptly; dry to below 13–14% moisture","Clean and repair storage structures before filling","Use hermetic bags, metal silos, or sealed containers","Mix with botanicals (neem, Ocimum) or inert dusts","Inspect stored grain monthly"],
    ctrl:["Re-dry infested grain; remove heavily infested portions","Solar heating in thin layers under plastic","Transfer to hermetic containers (oxygen depletion)","Never mix old and new grain"],
    treat:["Registered grain protectants only (e.g., approved malathion formulations)","Fumigation with phosphine by trained personnel in gas-tight enclosures","Do NOT use field insecticides on stored grain"],
    life:"Life cycle 4–6 weeks under warm conditions; multiple overlapping generations in stored grain. Females lay eggs inside kernels.",
    extra:"Major constraint on household food security and grain marketability in Ethiopia."},

  {id:"PEST-010",name:"Red Spider Mite",sci:"Tetranychus urticae",cat:"Pest",sev:"Medium-High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Red+Spider+Mite",
    desc:"A tiny arachnid (0.4–0.5 mm) with eight legs; particularly damaging in hot, dry conditions. Feeds by piercing plant cells, causing characteristic stippling.",
    sym:["Fine light-coloured stippling on upper leaf surfaces","Tiny mites and eggs on leaf undersides (hand lens)","Fine silk webbing on leaf undersides and growing tips","Leaves dry and drop prematurely"],
    crops:["Tomato (major host), pepper, eggplant, cucumber","Potato (foliage severely damaged)","Cotton, coffee, citrus, mango, ornamental plants"],
    causes:"Mite feeding; thrives in hot, dry weather and water-stressed conditions. Broad-spectrum insecticides kill predatory mites, causing resurgence.",
    prev:["Maintain adequate soil moisture; reduce dust on field edges","Conserve predatory mites (Phytoseiulus persimilis)","Remove alternate weed hosts","Weekly monitoring with hand lens","Rotate crops and remove residues"],
    ctrl:["Wash mites off with a strong water jet","Prune and destroy heavily infested leaves","Beauveria bassiana bio-insecticide (Ethiopian research)","Neem-based products and insecticidal soaps"],
    treat:["Registered acaricides only when scouting indicates damaging populations","Rotate active ingredients (rapid resistance development)","Avoid pyrethroids (they flare mite populations)","Follow pre-harvest intervals"],
    life:"Life cycle completed in as little as 5–10 days under hot dry conditions; rapid population explosions possible.",
    extra:"Drought stress and insecticide disruption of natural enemies strongly influence severity."},

  {id:"PEST-011",name:"Thrips",sci:"Thrips tabaci (onion thrips)",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Thrips",
    desc:"Minute, slender insects (1–2 mm) with fringed wings and rasping-sucking mouthparts. Onion thrips is a major constraint on Ethiopian onion productivity (26–57% yield loss documented).",
    sym:["Silvery or whitish speckling on leaves along veins","Tiny black faecal specks on leaf surfaces","Streaked, silvery, or bronzed leaves; curling of young leaves","Reduced bulb size in onion"],
    crops:["Onion (primary), garlic, cabbage, tomato, pepper, cucumber, lettuce","Cotton, ornamental plants","Sorghum, maize, citrus, mango, cowpea"],
    causes:"Feeding by T. tabaci and related species. Continuous or overlapping onion production and the dry irrigation season favour outbreaks. Broad-spectrum insecticides disrupt natural enemies.",
    prev:["Intercrop onion with carrots (reduced populations up to 71% in trials)","Variety selection (Nafis variety performed well)","Remove crop residues and volunteer alliums","Yellow water traps or sticky traps for monitoring","Balanced irrigation and nutrition"],
    ctrl:["Wash thrips off with strong water jet in small plots","Conserve predatory mites, minute pirate bugs","Neem-based products and insecticidal soaps","Thorough coverage of leaf whorls"],
    treat:["Spinetoram and imidacloprid increased onion yield 48.88% and 43.78% (Ethiopian trials)","Rotate active ingredients; pyrethroid resistance is indicated","Follow label instructions and pre-harvest intervals"],
    life:"Populations higher during vegetative growth; decline as plants mature. Rapid reproduction under warm, dry conditions.",
    extra:"Thrips tabaci accounted for over 91% of thrips collected in a Central Rift Valley study."},

  {id:"PEST-012",name:"Cutworms",sci:"Agrotis spp.",cat:"Pest",sev:"Medium-High",img:"https://placehold.co/800x500/1b6b4e/ffffff&text=Cutworms",
    desc:"Larvae of noctuid moths in the genus Agrotis. Soil-dwelling caterpillars that curl into a 'C' shape when disturbed and cut seedlings at the soil line.",
    sym:["Small patches of missing or wilting seedlings","Plants cut at the base, found lying on the soil surface","Gaps in plant stands","Large curled caterpillar found ~5 cm below soil near damage"],
    crops:["Maize, sorghum, wheat, barley seedlings","Pepper, tomato, cabbage","Chickpea (important host), lentil, faba bean","Potato, sweet potato, tobacco"],
    causes:"Larval feeding (nocturnal, soil-dwelling). Fields with high weed pressure or previous legume crops harbour higher populations.",
    prev:["Avoid planting in fields with cutworm history","Remove weeds before planting","Deep ploughing after harvest to expose larvae","Weed grasses at least two weeks before planting","Seed treatment with Apron Star 42 WS (chickpea)"],
    ctrl:["Handpick larvae early morning/evening","Dig around damaged plants to expose larvae to predators","Flood trenches around field to drown larvae","Conserve birds, ants, and predatory beetles"],
    treat:["For chickpea: seed treatment with Apron Star 42 WS (documented effective)","For pepper: check current national registration lists","Foliar sprays generally ineffective (nocturnal feeding)","Bait formulations where registered"],
    life:"Moths lay eggs on weeds, crop residues, or moist soil; larvae develop in soil and emerge to feed on seedlings.",
    extra:"Particularly problematic in chickpea and pepper seedling stages in Ethiopia."},

  {id:"PEST-013",name:"Fruit Fly",sci:"Bactrocera dorsalis (oriental fruit fly)",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Fruit+Fly",
    desc:"Tephritid fruit flies are among the most important horticultural pests worldwide. The invasive oriental fruit fly is dominant in Ethiopian mango, guava, and citrus systems.",
    sym:["Small puncture marks (oviposition stings) on fruit surface","Premature colour change or softening around puncture","Fruit rot; maggots visible inside cut fruit","Premature fruit drop; heavy drop can lead to near-total loss"],
    crops:["Mango (primary), guava, sweet orange","Other tropical/subtropical fruits","Some cucurbits"],
    causes:"Oviposition and larval development. Adults disperse several km; long-distance spread via infested fruit. Warm conditions and continuous ripening fruit favour outbreaks.",
    prev:["Collect and destroy fallen/infested fruit at least twice weekly","Harvest at maturity rather than over-ripening","Male annihilation technique (MAT) with methyl eugenol","Methyl eugenol or food-based attractant traps for monitoring","Area-wide community management"],
    ctrl:["Remove and destroy infested fruit immediately","Protein bait sprays (registered) targeted at adults","Conserve parasitoid wasps (Fopius arisanus)","Bag developing fruit where feasible"],
    treat:["Registered products with efficacy against adult fruit flies","Integrate with MAT and sanitation; avoid cover sprays alone","Hot water treatment or cold storage post-harvest"],
    life:"Females lay eggs in ripening fruit; hatching larvae tunnel through flesh. Adults are strong fliers dispersing several km.",
    extra:"B. dorsalis caused 97.9% of trap catches and 78.89% of reared adults in northeastern Ethiopia. Yield losses up to 90% documented."},

  {id:"PEST-014",name:"Tomato Fruitworm",sci:"Helicoverpa armigera",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Tomato+Fruitworm",
    desc:"Highly polyphagous noctuid moth (African bollworm, cotton bollworm). Major pest of tomato and chickpea in Ethiopia, known as fruit borer and pod borer respectively.",
    sym:["Small holes on leaves and flower buds","Circular entry holes on tomato fruits near stem end","Frass pushed out of entry hole; aborted flowers","Fruits hollowed out and decayed; secondary rots"],
    crops:["Tomato (major), pepper, okra, eggplant","Chickpea (pod borer), faba bean, field pea, lentil, cowpea","Maize, sorghum, cotton, tobacco"],
    causes:"Larval feeding; wide host range allows movement between crops. Insecticide resistance is a major constraint; reliance on broad-spectrum sprays disrupts natural enemies.",
    prev:["Rotate tomato with non-host crops","Avoid overlapping tomato and chickpea plantings","Remove and destroy crop residues after harvest","Pheromone traps for monitoring","Use tolerant varieties where available"],
    ctrl:["Handpick and destroy larvae and damaged fruits","Trichogramma egg parasitoids and predatory bugs","Bt formulations against early-instar larvae","Tobacco leaf extract (evaluated in Ethiopia)"],
    treat:["Registered insecticides against lepidopteran larvae","Rotate active ingredients (documented resistance history)","Target early-instar larvae","Follow pre-harvest intervals"],
    life:"Moths lay eggs on flowering and fruiting structures; larvae feed then pupate in the soil. Multiple overlapping generations per year under warm conditions.",
    extra:"On chickpea, larvae feed inside pods destroying developing seeds; a major constraint on Ethiopian chickpea production."},

  {id:"PEST-015",name:"Cabbage Aphid",sci:"Brevicoryne brassicae",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Cabbage+Aphid",
    desc:"A specialist aphid of brassicas; the main challenge for cabbage production in Ethiopia. Forms dense mealy colonies covered with greyish waxy powder.",
    sym:["Small clusters of greyish-green aphids on leaf undersides","Dense mealy colonies; honeydew and sooty mould","Leaf curling and stunting","Cabbage head contaminated with aphids, cast skins, honeydew"],
    crops:["Cabbage (primary), kale, cauliflower, broccoli","Other brassicas; oilseed rape"],
    causes:"Feeding and parthenogenetic reproduction. Continuous cabbage production in Ethiopia provides year-round food supply. Broad-spectrum insecticides have selected for resistance.",
    prev:["Conserve natural enemies; avoid unnecessary broad-spectrum sprays","Rotate brassicas with non-host crops","Control wild brassica weeds","Use tolerant varieties where available","Weekly monitoring of leaf undersides"],
    ctrl:["Remove and destroy heavily infested leaves","Melia azedarach and Allium sativum extracts (100% mortality within 3 days in trials)","Birbira (Millettia ferruginea) reduced populations 55–83%","Conserve Diaeretiella rapae parasitoids, ladybirds, hoverflies"],
    treat:["Registered aphicides (e.g., imidacloprid) rotating modes of action","Use only when botanical options are insufficient","Follow label instructions and pre-harvest intervals"],
    life:"Reproduces parthenogenetically for much of the year; winged migrants colonise new fields. Rapid population growth under favourable conditions.",
    extra:"In Ethiopia's Awi Zone, Birbira combined with tobacco achieved marketable yields up to 85.486 t/ha comparable to synthetic insecticide."},

  {id:"PEST-016",name:"Diamondback Moth",sci:"Plutella xylostella",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Diamondback+Moth",
    desc:"A small moth (10 mm wingspan) whose larvae feed on brassica foliage. Notorious for high reproductive rate, short generation time, and exceptional insecticide resistance.",
    sym:["'Window-pane' patches on leaves where young larvae fed","Irregular holes and skeletonized leaves","Larvae on leaf undersides, often near midrib","Severe defoliation with only leaf veins remaining"],
    crops:["Cabbage (major), kale, cauliflower, broccoli","Oilseed rape and other brassica crops"],
    causes:"Larval feeding; short life cycle allows rapid build-up. Insecticide resistance is a major driver of control failures with older broad-spectrum products.",
    prev:["Conserve natural enemies (Diadegma, Cotesia parasitoids)","Rotate brassicas with non-host crops","Remove crop residues and volunteer brassicas","Use tolerant varieties","Pheromone traps for monitoring"],
    ctrl:["Remove and destroy heavily infested leaves","Phytolacca dodecandra extract (reduced larvae to 0.13/plant in Ethiopian studies)","Bt formulations against young larvae","Novaluron (insect growth regulator) preserves parasitoids"],
    treat:["Rotate active ingredients; resistance is widespread","Avoid relying on pyrethroids or organophosphates alone","Follow label instructions and pre-harvest intervals"],
    life:"Short life cycle (a few weeks under warm conditions). Moths disperse widely and migrate long distances.",
    extra:"Particularly high damage in Arsi highland and Central Rift Valley brassica production areas where parasitism is low."},

  {id:"PEST-017",name:"Cabbage Webworm",sci:"Hellula undalis",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Cabbage+Webworm",
    desc:"Larvae bore into the growing point of brassicas, often protected by a loose silken web. Damage to growing point can abort head formation or kill seedlings.",
    sym:["Small mines on leaves near growing point","Damage to growing point; leaves webbed together","Seedlings killed or severely stunted","Aborted head formation, multiple shoots, or no marketable head"],
    crops:["Cabbage, kale, cauliflower, broccoli","Other cultivated Brassicaceae"],
    causes:"Larval feeding inside growing point and veins. Protected feeding habit makes contact insecticides less effective. Continuous brassica production and volunteer plants maintain populations.",
    prev:["Uproot and burn cabbage/kale stalks after harvest","Rotate brassicas with non-host crops","Remove volunteer brassica plants","Inspect growing points of young plants","Use vigorous-growing varieties"],
    ctrl:["Remove and destroy infested growing points","Conserve parasitoid wasps (ichneumonid, chalcidoid)","Bt var. aizawai and kurstaki (weekly intervals)","Azadirachtin (neem) recommended"],
    treat:["Methoxyfenozide, lambda-cyhalothrin, deltamethrin (where registered)","Target early-instar larvae before they enter the growing point","Rotate active ingredients; resistance reported"],
    life:"Moths lay eggs on leaves; larvae mine leaves then bore into growing point. Carries over on crop residues.",
    extra:"Damage to growing point is irreversible; early detection is critical."},

  {id:"PEST-018",name:"Bean Fly",sci:"Ophiomyia phaseoli",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Bean+Fly",
    desc:"A key pest of common bean in Ethiopia and East Africa, particularly damaging during the seedling stage. Maggots mine into stems disrupting vascular transport.",
    sym:["Wilting or yellowing of bean seedlings","Small puncture marks or mines on stems near soil line","Visible maggot mines in the stem; swollen or cracked stems","Seedling death; surviving plants have weakened stems and reduced pod set"],
    crops:["Common bean (primary), cowpea","Other Phaseolus and Vigna species"],
    causes:"Larval mining by O. phaseoli. Continuous bean cropping and volunteer plants favour the pest. Late planting increases exposure to peak adult activity.",
    prev:["Plant common bean early (June 10–30 in Ethiopian trials)","Rotate with non-host cereals","Remove and destroy bean residues and volunteer plants","Seed treatment with Apron Star 42 WS","Use tolerant bean varieties"],
    ctrl:["Remove and destroy severely infested seedlings","Split stems to confirm maggot presence","Conserve parasitoid wasps","Avoid broad-spectrum soil insecticides"],
    treat:["Confidor SL 200 (imidacloprid) + Apron Star + dimethoate significantly reduced numbers (West Hararghe)","Soil-applied systemic insecticides at planting more effective than foliar sprays","Follow label instructions and pre-harvest intervals"],
    life:"Adults emerge from puparia in soil or crop residues; females lay eggs on bean plants. Maggots tunnel into stems.",
    extra:"Often associated with root rot diseases, compounding damage. Early planting is one of the most effective cultural measures."},

  {id:"PEST-019",name:"Bean Beetle",sci:"Ootheca mutabilis",cat:"Pest",sev:"Medium-High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Bean+Beetle",
    desc:"A chrysomelid leaf beetle defoliating common bean, cowpea, and other legumes in eastern and southern Africa. Adults feed on foliage and flowers.",
    sym:["Small holes and notches on bean leaves, especially on seedlings","Increasing defoliation; damaged flowers","Stunting","Severe defoliation during early growth reduces plant stand and vigour"],
    crops:["Common bean (primary), cowpea","Other Phaseolus and Vigna species","Okra and hibiscus-family plants"],
    causes:"Adult and larval feeding. Continuous legume cropping and volunteer plants provide food bridge. Warm conditions favour the pest.",
    prev:["Late planting may avoid infestation to some extent","Rotate with non-host crops","Remove crop residues and volunteer legumes","Control alternate host weeds","Scout seedlings and flowering plants"],
    ctrl:["Handpick adult beetles in small plots","Conserve predatory bugs (Rhinocoris spp.)","Remove heavily infested shoots","Avoid broad-spectrum insecticides"],
    treat:["Several insecticides available; use locally registered products","Target adult beetles before extensive defoliation","Rotate active ingredients","Follow label instructions and pre-harvest intervals"],
    life:"Adults emerge from soil pupation; females lay clustered eggs near roots. Larvae develop in soil near host root zone.",
    extra:"Larvae are soil-dwelling and rarely seen. Adult defoliation is the visible damage."},

  {id:"PEST-020",name:"Bruchid Beetle",sci:"Callosobruchus maculatus",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Bruchid+Beetle",
    desc:"Small seed beetle (3–4 mm) that is a major storage pest of cowpea, chickpea, and other grain legumes. Larvae develop entirely inside seeds.",
    sym:["A few adult beetles on stored grain surface","Small round emergence holes on seeds","Seeds feel light and hollow","Powdery frass accumulating in containers; loss of germination"],
    crops:["Cowpea (primary), chickpea, soybean","Other stored grain legumes"],
    causes:"Feeding and reproduction in stored seeds. Poor storage practices (high moisture, unsealed containers) favour rapid growth.",
    prev:["Harvest promptly; dry seeds before storage","Clean and repair storage structures","Use hermetic bags, metal silos, or sealed containers","Botanical protectants (validated locally)","Monthly inspection of stored seeds"],
    ctrl:["Re-dry early-stage infested seed","Solar heating in thin layers under plastic","Hermetic containers (oxygen depletion)","Botanical treatments subject to local validation"],
    treat:["Fumigation with aluminum phosphine by trained personnel in gas-tight enclosures","Registered grain protectants only","Do NOT use field insecticides on stored seed"],
    life:"Life cycle 4–6 weeks under warm conditions; multiple overlapping generations in stored seed. Females lay eggs on seed surfaces.",
    extra:"Traditional storage in woven polypropylene bags without protection allows rapid population growth and substantial losses over six months."},

  {id:"PEST-021",name:"Pod Borer",sci:"Maruca vitrata",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Pod+Borer",
    desc:"Crambid moth whose larvae are among the most damaging pod-feeding pests of grain legumes in Africa. Larvae web together leaves, buds, and pods and feed inside.",
    sym:["Small larvae feeding inside flowers/buds; flowers wilt and drop","Webbed flower parts","Pods with irregular holes at contact points","Frass at entry points and inside damaged pods"],
    crops:["Cowpea, pigeon pea, field pea, faba bean, common bean","Other grain legumes"],
    causes:"Larval feeding within webs. Continuous or overlapping legume cropping provides year-round food supply. Protected feeding habit makes contact insecticides less effective.",
    prev:["Regular scouting of flowers and developing pods","Rotate legumes with non-host cereals","Remove and destroy crop residues","Bird perches above crop canopy","Conserve ants, parasitic wasps, pirate bugs"],
    ctrl:["Handpick and destroy larvae and infested pods","Bt or neem-based biopesticides (before larvae enter pods)","Tephrosia and chilli/garlic preparations","Trichogramma and Telenomus parasitoids (85% reduction in West Africa)"],
    treat:["Registered insecticides targeting early-instar larvae","Rotate active ingredients","Do not spray after larvae are protected inside pods"],
    life:"Adults have 15–30 mm wingspan; larvae whitish with black head and rows of brown-to-black spots; fully grown ~15 mm. Pupates in soil.",
    extra:"In North Shoa, pod borer infestation in field pea reached 40% in one district. Up to 80% yield loss reported in cowpea."},

  {id:"PEST-022",name:"Groundnut Aphid",sci:"Aphis craccivora",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Groundnut+Aphid",
    desc:"Small dark aphid that is the only efficient vector of groundnut rosette disease agents in a persistent manner. Direct feeding damage is moderate; virus transmission elevates severity.",
    sym:["Small colonies of dark aphids on leaf undersides and flowers","Slight leaf curling","Honeydew and sooty mould may develop","Subsequent rosette symptoms: mosaic, mottling, stunting, leaf distortion"],
    crops:["Groundnut (primary)","Cowpea and other Vigna/Phaseolus species"],
    causes:"Feeding and — critically — virus transmission. Early planting and closer spacing reduce aphid invasion and multiplication. Winged forms disperse aphid and virus.",
    prev:["Host-plant resistance (most sustainable approach)","Early planting and close spacing","Remove volunteer groundnut and legume plants","Conserve ladybirds, hoverflies, parasitoid wasps","Monitor growing tips and leaf undersides"],
    ctrl:["Wash aphids off with water jet","Prosopis juliflora extracts (83.33% mortality in 12 hours)","Cow urine as effective as garlic extract and imidacloprid in bioassays","Conserve natural enemies"],
    treat:["Registered aphicides where necessary; rotate modes of action","Virus transmission can occur before aphid mortality","Follow label instructions and pre-harvest intervals"],
    life:"Reproduces parthenogenetically; winged forms disperse between fields. Rapid population growth under warm, dry conditions.",
    extra:"Roguing rosette-infected plants reduces inoculum. Host resistance and early planting are the most reliable long-term strategies."},

  {id:"PEST-023",name:"Coffee Berry Borer",sci:"Hypothenemus hampei",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Coffee+Berry+Borer",
    desc:"Minute bark beetle (1.5–2.5 mm) that spends almost its entire life inside coffee berries. The most important insect pest of coffee worldwide and a threat to Ethiopia's Arabica economy.",
    sym:["Tiny circular entry holes on distal end of green berries","Small amount of brownish frass at the hole","Berries prematurely yellowing or reddening","Internal tunnelling and blackening of the bean; secondary fungal rot"],
    crops:["Coffee (Coffea arabica and C. canephora) — essentially exclusive economic host"],
    causes:"Reproduction and feeding inside berries. Rising temperatures are expanding suitable areas. Poor harvesting/sanitation allows carry-over.",
    prev:["Strip-harvest all remaining berries at end of season","Collect fallen berries from the ground","Regular monitoring for entry holes","Maintain shade and tree vigour","Climate-aware planning in newly affected areas"],
    ctrl:["Remove and destroy infested berries","Conserve local natural enemies","Beauveria bassiana (used in some countries)","Sanitation is cornerstone of management"],
    treat:["Chemical control is difficult (beetle protected inside berry)","Applications must target adults before entering berries","Follow label instructions and pre-harvest intervals"],
    life:"Females bore into berries and lay eggs inside; multiple overlapping generations can develop within a single berry. Survives between seasons in leftover berries.",
    extra:"Ethiopian Arabica germplasm evaluated for lower oviposition; some introductions show 32–55% reductions in field oviposition."},

  {id:"PEST-024",name:"Coffee Antestia Bug",sci:"Antestiopsis intricata",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Coffee+Antestia+Bug",
    desc:"A shield bug (stink bug) whose nymphs and adults feed on coffee shoots, flower buds, young berries, and leaves. One of the two most important insect pests of Arabica coffee in Ethiopia.",
    sym:["Feeding punctures on young shoots, flower buds, green berries","Flower discoloration and drop","Premature fall of young berries","Necrotic spots on beans; reduced bean weight"],
    crops:["Arabica coffee (Coffea arabica) — primary economic host"],
    causes:"Feeding by nymphs and adults. Populations build from March, peak in May/June coinciding with young berry development. Favoured by unshaded or poorly managed coffee.",
    prev:["Protect egg parasitoids (Asolcus suranus — 45–50% natural parasitism)","Scout from March onward","Maintain appropriate shade and tree vigour","Remove heavily infested shoots and berries"],
    ctrl:["Handpick and destroy nymphs/adults in smallholder plots","Conserve and augment egg parasitoids","Maintain balanced shade and nutrition","Avoid excessive nitrogen"],
    treat:["Locally registered insecticides against pentatomid bugs","Target nymphs and adults before extensive berry damage","Rotate active ingredients; avoid prophylactic spraying"],
    life:"Population build-up from March, peak May/June. Natural egg parasitism 45–50%, with Asolcus suranus the most important.",
    extra:"Infestation of 2–4 bugs/tree associated with 15–27% loss in total bean weight. Yield losses up to 96% reported in Africa."},

  {id:"PEST-025",name:"Citrus Leafminer",sci:"Phyllocnistis citrella",cat:"Pest",sev:"Medium-High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Citrus+Leafminer",
    desc:"A tiny moth whose larvae mine inside citrus leaves producing silvery serpentine mines. Particularly damaging to young flush and nursery stock in Ethiopia.",
    sym:["Fine silvery serpentine mines on young leaves near midrib or margin","Mines become broader; leaves curl and distort","Necrotic leaf margins","Severe distortion and stunting of young flush"],
    crops:["Citrus: sweet orange, mandarin, lemon, lime"],
    causes:"Larval mining between epidermal layers. Continuous young flush (nurseries, heavily pruned orchards) favours the pest. Broad-spectrum insecticides disrupt parasitoids.",
    prev:["Protect nursery seedlings with insect-proof nets","Avoid excessive nitrogen producing continuous flush","Conserve eulophid parasitoid wasps","Regular inspection of young flush","Staggered pruning reduces food supply"],
    ctrl:["Remove and destroy heavily mined leaves in nurseries","Neem seed extract (comparable to dimethoate in Tigray trials)","Conserve parasitoids","Avoid unnecessary broad-spectrum sprays"],
    treat:["Ethiodemethrin 2.5% EC or lambda-cyhalothrin (Karate 5% EC) gave 2 weeks' control in Metahara","Target young larvae before mines fully form","Rotate active ingredients; follow pre-harvest intervals"],
    life:"Moths lay eggs on young leaves; larvae mine between epidermal layers. Favoured by continuous young flush production.",
    extra:"Rated Medium in established orchards, High in nurseries and young orchards where establishment is delayed."},

  {id:"PEST-026",name:"Mango Mealybug",sci:"Drosicha mangiferae",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Mango+Mealybug",
    desc:"A large mealybug (giant mealybug) that feeds on mango sap and produces copious honeydew. Native to India but recently invaded East Africa (Rwanda 2019, then Uganda, Burundi).",
    sym:["Small white waxy mealybugs on shoots, leaf undersides, fruit stalks","Honeydew accumulation","Dense colonies with white waxy material; sooty mould","Yellowing leaf drop; reduced fruit set and size; unmarketable fruit"],
    crops:["Mango (primary)","Pumpkins and other crops (secondary)"],
    causes:"Feeding by D. mangiferae and related mealybugs. Spread via infested planting material and crawler dispersal. Dense canopies and absence of natural enemies favour the pest.",
    prev:["Report unusual infestations to national plant protection services","Avoid moving infested seedlings or fruit between areas","Prune and destroy heavily infested shoots","Conserve parasitoid wasps and predatory ladybirds","Maintain open canopies"],
    ctrl:["Remove and destroy infested shoots and fruit","Hoe under canopy to expose egg masses to sun and enemies","Augment parasitoids where available","Conserve natural enemies"],
    treat:["Registered products effective against mealybugs","Target crawlers (mobile first instar) for best results","Avoid broad-spectrum sprays that disrupt natural enemies"],
    life:"Females produce egg masses in soil under the canopy. Crawlers disperse to new growth; waxy coating protects older stages.",
    extra:"Regional threat requiring coordinated surveillance across East Africa (FAO awareness campaign)."},

  {id:"PEST-027",name:"Mango Fruit Fly",sci:"Bactrocera dorsalis",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Mango+Fruit+Fly",
    desc:"The invasive oriental fruit fly is the dominant and most damaging fruit fly species in Ethiopian mango systems. Highest trap catches at Kalu: 722.2 flies per trap per week.",
    sym:["Small puncture marks on mango fruit surface","Premature colour change or softening","Fruit rot; maggots visible when cut","Heavy fruit drop leading to severe yield loss"],
    crops:["Mango (primary), guava, sweet orange","Other fleshy fruits and cucurbits"],
    causes:"Oviposition and larval development. Adults disperse several km; long-distance spread via infested fruit. Continuous ripening fruit favours outbreaks.",
    prev:["Collect and destroy fallen/infested fruit at least twice weekly","Harvest at maturity","Male annihilation technique (MAT) with methyl eugenol","Monitoring traps","Area-wide community IPM"],
    ctrl:["Remove and destroy infested fruit immediately","Protein bait sprays (registered)","Conserve parasitoid wasps (Fopius arisanus)","Bag developing fruit where feasible"],
    treat:["Registered products integrated with MAT and sanitation","Follow label instructions and pre-harvest intervals","Hot water treatment or cold storage post-harvest"],
    life:"Females lay eggs in ripening fruit; maggots tunnel through flesh. Adults disperse several km.",
    extra:"Management should focus on guava and mango as reservoir hosts for the entire fruit fly complex."},

  {id:"PEST-028",name:"Papaya Mealybug",sci:"Paracoccus marginatus",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Papaya+Mealybug",
    desc:"Highly polyphagous invasive mealybug affecting at least 133 economically important crops globally. Serious threat to diversified smallholder farming systems.",
    sym:["Small white waxy mealybugs on leaf undersides, stems, fruit","Honeydew accumulation","Sooty mould; yellowing and distortion of leaves","Severe stunting, leaf drop, plant death in young papaya seedlings"],
    crops:["Papaya (primary)","Many vegetables","Cassava, cotton, ornamental plants (130+ crops)"],
    causes:"Feeding by P. marginatus. Spread via infested planting material and wind dispersal of crawlers. Extreme polyphagy allows persistence on alternate crops.",
    prev:["Use certified clean planting material","Introduce/conserve Acerophagus papayae and Anagyrus loecki parasitoids","Inspect leaf undersides, stems, fruit regularly","Prune and destroy infested shoots","Monitor all susceptible crops on farm"],
    ctrl:["Remove and destroy heavily infested shoots and fruit","Biological control is primary strategy (parasitoids)","Neem oil (1.5%) + 0.2% isopropyl alcohol","Citrus oil (1.5%) significantly controlled populations"],
    treat:["Chemical control generally NOT recommended (disrupts parasitoids)","Where unavoidable, use selective products with minimal natural enemy impact","Follow pre-harvest intervals"],
    life:"Crawlers disperse via wind and human movement. Wide host range allows persistence on alternate crops.",
    extra:"Climate suitability modelling shows East and Central Africa highly suitable. Potential mismatch if principal parasitoid not co-introduced."},

  {id:"PEST-029",name:"Potato Tuber Moth",sci:"Phthorimaea operculella",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Potato+Tuber+Moth",
    desc:"A gelechiid moth whose larvae mine potato leaves in the field and bore into tubers in storage. Difficult to control due to hidden behaviour in soil and tubers.",
    sym:["Serpentine mines on potato leaves near leaf margin","Small entry holes on tubers","Internal galleries filled with frass; secondary rot","Tubers unmarketable and unsuitable for seed"],
    crops:["Potato (primary host)","Tomato and eggplant (secondary)"],
    causes:"Larval mining. Carries over in infested tubers (field or storage) and volunteer potato plants. Hidden feeding makes chemical control unreliable.",
    prev:["Remove and destroy all infested tubers in field and storage","Rotate with non-host crops and include fallowing","Leave tubers in ground until skin hardens before harvest","Optimise planting depth and irrigation interval","Use clean seed; store in insect-proof structures"],
    ctrl:["Remove and destroy infested tubers and heavily mined leaves","Do not store infested tubers with healthy ones","Maize–potato intercropping and push-pull evaluated","Conserve natural enemies in intercropped systems"],
    treat:["Profenofos showed better control than untreated checks in Ethiopian trials","Bt against leaf-mining larvae where registered","Fumigation of storage facilities where approved","Follow label instructions and pre-harvest intervals"],
    life:"Moths lay eggs on leaves or near tubers; larvae mine leaves then bore into tubers. Carries over in infested tubers.",
    extra:"Entomopathogenic fungi tested against PTM on seed potato in West Showa, Ethiopia."},

  {id:"PEST-030",name:"Root-Knot Nematode",sci:"Meloidogyne spp. (M. incognita)",cat:"Pest",sev:"High",img:"https://placehold.co/800x500/1b6b4e/ffffff?text=Root-Knot+Nematode",
    desc:"Microscopic soil-dwelling roundworms that infect plant roots and induce characteristic galls (knots). Disrupt water and nutrient uptake.",
    sym:["Galls or knots on roots (diagnostic symptom)","Shortened, thickened, abnormally branched roots","Stunting, yellowing, wilting resembling nutrient/water stress","Plants may wilt during heat even with adequate moisture"],
    crops:["Tomato, pepper (hot and sweet), eggplant, okra, cucurbits","Cowpea and other legumes","Potato, sweet potato","Cotton, tobacco, ornamental plants"],
    causes:"Infection by Meloidogyne spp. Second-stage juveniles invade roots and induce gall formation. Continuous cropping of susceptible hosts and warm soil temperatures favour build-up.",
    prev:["Rotate with non-host or resistant crops (e.g., cereals)","Use resistant tomato/pepper varieties","Apply vermicompost (solid or extract)","Avoid moving infested soil between fields","Use nematode-free nursery media"],
    ctrl:["Remove and destroy severely infected plants; do not compost galled roots","Crop rotation and fallowing","Vermicompost (suppressive effects demonstrated)","Rhizobacteria integrated management (Ethiopia)"],
    treat:["Nematicides available but expensive, hazardous, and inconsistent for smallholders","Use only locally registered products","Integrate with cultural and organic measures"],
    life:"Second-stage juveniles invade roots, establish feeding sites, and induce gall formation. Survives in soil and infested plant debris for extended periods.",
    extra:"Frequently co-occurs with Fusarium wilt in hot pepper; integrated management strategies recommended for co-infested fields."},

  /* ================= DISEASES ================= */
  {id:"DISEASE-001",name:"Maize Leaf Blight",sci:"Exserohilum turcicum",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Maize+Leaf+Blight",
    desc:"Also known as Northern Leaf Blight (NLB) or Turcicum Leaf Blight. Major foliar disease in Ethiopia's mid-altitude and transitional-highland maize agro-ecologies.",
    sym:["Small water-soaked or chlorotic spots, typically on lower leaves","Lesions elongate into cigar- or boat-shaped necrotic areas","Lesions 3–15 cm with distinct parallel margins; may coalesce","Dark fuzzy sporulation on lesion surfaces in humid weather"],
    crops:["Maize (primary and most important)","Sorghum (less severe)"],
    causes:"Infection by E. turcicum. Pathogen overwinters in crop residue; extended leaf wetness and moderate temperatures favour infection. Continuous maize without residue destruction is a major driver.",
    prev:["Deep-plough or incorporate maize residue after harvest","Rotate maize with non-cereal crops for at least one season","Use varieties with documented NLB resistance (e.g., F-BH661)","Remove volunteer maize plants","Scout lower leaves from vegetative stage"],
    ctrl:["Combine host resistance, residue destruction, and rotation","Monitor severity to guide fungicide timing","Destroy infected residue by burning or burying"],
    treat:["Fungicide most effective before extensive lesion coalescence","Opera Max at tasselling (GS51) reduced AUDPC 49% and severity 59.5% in Ethiopian trials","Mancozeb also effective, especially combined with variety Bate","Follow label instructions and pre-harvest intervals"],
    life:"Polycyclic disease; multiple infection cycles per season. Conidia wind-borne. Survives between seasons in crop residue.",
    extra:"Documented yield losses 15–70% in Ethiopia. Each 1% increase in final severity reduces yield by ~28 kg/ha."},

  {id:"DISEASE-002",name:"Maize Rust",sci:"Puccinia sorghi",cat:"Disease",sev:"Medium-High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Maize+Rust",
    desc:"Also known as Common Leaf Rust (CLR) of maize. Amharic: 'ye bekelo wag'; Tigrinya: 'nay efun humodya'.",
    sym:["Small chlorotic areas or flecks developing into elongated pustules","Pustules reddish-brown to brownish-black; rupture epidermis","Pustules may coalesce with surrounding chlorotic tissue","Pustules also on husks, tassels, stalks"],
    crops:["Maize (primary host)","Some Oxalis species (alternate hosts for sexual cycle)"],
    causes:"Infection by P. sorghi. Requires humid conditions and wind for spore dispersal. Onset of rainy season influences timing and severity of epidemics.",
    prev:["Deep-plough maize residue after harvest","Use clean maize seed from reliable source","Orient rows to prevailing winds for air circulation","Rotate with non-cereal crops every 2–3 years","Remove alternate hosts (Oxalis spp.)"],
    ctrl:["Remove lower infested leaves to improve air circulation","Work from healthy to infected part of field","Destroy infected leaves by burning","Use moderately resistant varieties (Afranqalloo, Bate in Ethiopian trials)"],
    treat:["No chemical pesticides registered in Ethiopia for common rust on maize at time of Plantwise guide","Where Mancozeb is legally available: 4.5 kg/ha reduced progression (eastern Ethiopia)","Verify current registration before use","Follow label instructions and pre-harvest intervals"],
    life:"Biotrophic rust fungus; survives on alternate hosts (Oxalis spp.) and volunteer maize. Humid, windy conditions favour epidemics.",
    extra:"Yield reductions up to 45% reported in Ethiopia under conducive conditions."},

  {id:"DISEASE-003",name:"Maize Streak Virus",sci:"Maize streak virus (Mastrevirus)",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Maize+Streak+Virus",
    desc:"A geminivirus transmitted by brownish-white Cicadulina leafhoppers in a highly persistent manner. Very common in Ethiopia, found in almost all maize-growing areas.",
    sym:["Yellowish and light-green streaks on both leaf surfaces running parallel to veins","Streaks more pronounced on mature plants (whitish, yellow, light-green)","Severe stunting if infected at 4–5 leaf stage","Abnormal bunching of flowers and shoots; reddish pigmentation"],
    crops:["Maize (primary host)","Wild grasses (Eragrostis, Eleusine) as virus reservoirs"],
    causes:"MSV transmitted by Cicadulina leafhoppers. Virus highly persistent in vector. Late planting and susceptible genotypes increase risk. Higher incidence in Gambella, Benishangul-Gumuz, Oromia.",
    prev:["Use certified disease-free seed; plant at onset of rains","Plant large area uniformly to reduce exposure window","Inspect field regularly when maize is small","Uproot infected plants early (bag before removing)","Keep fields free from grassy weeds"],
    ctrl:["Rogue infected plants early (bag before removing)","Remove cereal crop residues","Feed removed plants to animals after bagging","Use MSV-resistant varieties"],
    treat:["No cure for virus-infected plants","Gaucho 70 WS (imidacloprid) at 125 g/ha cited for leafhopper vector control","Vector control must be applied before infection","Verify current registration and follow label instructions"],
    life:"Persistent transmission by Cicadulina leafhoppers. Erratic epidemics occur every 3–10 years.",
    extra:"Can cause up to 100% yield loss in highly susceptible late-sown genotypes."},

  {id:"DISEASE-004",name:"Wheat Stem Rust",sci:"Puccinia graminis f. sp. tritici",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Wheat+Stem+Rust",
    desc:"Also known as black rust of wheat. Race Ug99 (TTKSK) is the most notorious strain and a standing regional priority. Currently the most devastating known wheat disease worldwide.",
    sym:["Small chlorotic flecks or orange pustules surrounded by a halo","Elongated reddish-brown pustules on stems and both leaf sides","Pustules rupture epidermis releasing orange to blackish spores","Weakened stems; shrivelled lightweight grains"],
    crops:["Wheat (bread and durum), barley","Some grasses"],
    causes:"Infection by P. graminis f. sp. tritici. Survives on infected stubble and volunteer wheat. Wind-borne urediniospores travel long distances. Susceptibility of widely grown varieties drives epidemics.",
    prev:["Use high-yielding wheat varieties with Ug99 resistance","Deep-plough or bury infected stubble","Remove volunteer wheat","Diversify varieties or use variety mixtures","Participate in rust surveillance and early warning systems"],
    ctrl:["Remove and bury infected materials below 50 cm","Continuous monitoring of race changes","Use variety mixtures or spatial resistance gene deployment","Seed health: certified seed only"],
    treat:["WABE 300 EC at 0.5 L/ha with 200 L water was highly effective in Ethiopian trials","Fungicides are tactical; must be integrated with resistant varieties","Follow label instructions; some products are toxic to aquatic organisms"],
    life:"Wind-borne urediniospores travel long distances. Alternate hosts (barberry) may play a role in some regions.",
    extra:"Ug99 spread from Uganda to Kenya, Ethiopia, Sudan, Yemen, and Iran. Virulence to Sr13 detected in Ethiopian durum wheat. Ethiopia imported 28% of wheat 1990–2021."},

  {id:"DISEASE-005",name:"Wheat Yellow Rust",sci:"Puccinia striiformis f. sp. tritici",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Wheat+Yellow+Rust",
    desc:"Also known as stripe rust. Major disease of bread wheat in Ethiopian highlands. Epidemics develop rapidly under cool, humid conditions.",
    sym:["Small yellow to orange pustules on leaves, often in linear stripes between veins","Stripes become more conspicuous; pustules coalesce along veins","Leaf tissue may become necrotic","Extensive yellowing and necrosis; shrivelled grain; reduced thousand-kernel weight"],
    crops:["Bread wheat (Triticum aestivum), durum wheat","Barley (some formae speciales)"],
    causes:"Infection by P. striiformis. Survives on volunteer wheat and infected residue; wind-borne spores spread between fields. Cool humid highland environments are conducive. Widely grown susceptible cultivars drive epidemics.",
    prev:["Use varieties with documented yellow rust resistance (Kingbird showed lowest severity in trials)","Variety diversification and mixtures","Destroy volunteer wheat and infected residue","Balanced fertilisation; avoid excessive nitrogen","Scout from tillering onward"],
    ctrl:["Combine resistant varieties with variety diversification","Cultural practices: destroy volunteers, balanced fertilisation","Continuous monitoring of pathogen race changes"],
    treat:["JEBA 250 EC highest control (64.6% severity reduction in Picaflor) and max yield 3.5 t/ha","Kingbird + JEBA 250 EC recommended combination for East Gojjam","Rex®Duo up to 79.3% control in some studies","Follow label instructions and pre-harvest intervals"],
    life:"Survives on volunteer wheat and crop residue. Wind-borne spores spread between fields and regions.",
    extra:"Unsprayed losses up to 61.3% yield and 49.5% thousand-kernel weight in Picaflor (East Gojjam)."},

  {id:"DISEASE-006",name:"Wheat Septoria Leaf Blotch",sci:"Zymoseptoria tritici",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Wheat+Septoria",
    desc:"Also known as Septoria tritici blotch (STB) or speckled leaf blotch. Most prevalent foliar disease of wheat in Ethiopian Central Highlands (incidence 75–100%, severity 4–89%).",
    sym:["Small chlorotic patches or yellow flecks appearing soon after emergence","Irregular brown to reddish lesions with chlorotic halo","Speckled appearance due to pycnidia within lesions","Lesions coalesce causing extensive necrosis and premature leaf death"],
    crops:["Bread wheat (Triticum aestivum), durum wheat"],
    causes:"Infection by Z. tritici. Primary infection via airborne or rain-splashed spores from infested debris. Moisture required for all infection stages. Favoured by frequent rain, moderate temperatures, high altitudes, early planting, vertisol soils.",
    prev:["Use resistant cultivars (best economic and environmental approach)","Mix resistant and susceptible cultivars (most effective strategy)","Crop rotation and destruction of infected residue","Intercropping and adjusting planting dates","Scout from seedling stage focusing on lower leaves"],
    ctrl:["Resistant cultivars and cultivar mixtures","Rotation, residue destruction, planting date adjustment","Biological: Trichoderma and Lactobacillus strains in research","Integrated combined disease management approaches"],
    treat:["Shorima variety + Rivo 80% WDG at 7-day intervals most profitable in Ethiopian trials","Fungicides complement (not replace) host resistance and cultural measures","Rotate active ingredients; follow pre-harvest intervals"],
    life:"Primary infection from airborne or rain-splashed spores. Moisture required throughout infection cycle. Survives in infested crop debris.",
    extra:"25–82% wheat production losses reported in Ethiopia. Most high-yielding cultivars are susceptible; fully resistant variety not yet developed."},

  {id:"DISEASE-007",name:"Potato Late Blight",sci:"Phytophthora infestans",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Potato+Late+Blight",
    desc:"The most destructive disease of potato worldwide and a major constraint in Ethiopian highland production. Estimated yield losses of 72–100%.",
    sym:["Water-soaked, pale green to dark green lesions on leaves","Lesions with pale green halo; expand rapidly in humid conditions","White fuzzy sporulation on lesion underside","Brown to purplish-black necrotic tissue; stems collapse; tubers show sunken reddish-brown lesions"],
    crops:["Potato (primary host)","Tomato (highly susceptible, alternate host)"],
    causes:"Infection by P. infestans. Survives in infected seed tubers and crop debris. Cool temperatures (15–20°C) and high humidity essential for infection and epidemic development.",
    prev:["Use resistant varieties where available (Belete responded well)","Plant certified disease-free seed tubers","Rotate with non-host crops for 2–3 years","Intercrop with cereals","Early planting per local recommendations"],
    ctrl:["Destroy infected crop residue and volunteer plants","Avoid dumping cull tubers near fields","Intercropping with cereals reduces intensity","Destroy infected foliage before harvest"],
    treat:["Apply fungicide as soon as symptoms detected or weather favours blight","Greenzeb 80% WP reduced epidemics and increased yield in southern Ethiopia","Alternate systemic and contact products to delay resistance","Follow label instructions and pre-harvest intervals"],
    life:"Survives in infected seed tubers and crop debris. Sporangia dispersed by wind and rain. Cool, moist conditions drive rapid epidemics.",
    extra:"Highest disease severity 91.40% and lowest yield 10.63 t/ha in untreated local control plots (Lay-Armachiho)."},

  {id:"DISEASE-008",name:"Potato Early Blight",sci:"Alternaria solani",cat:"Disease",sev:"Medium-High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Potato+Early+Blight",
    desc:"A common foliar disease of potato and tomato caused by Alternaria solani (and A. alternata). A major bottleneck in potato production worldwide and in Ethiopia.",
    sym:["Small dark brown to black spots on older, lower leaves","Spots with yellow halo","Lesions develop concentric rings (target-spot appearance)","Affected leaves turn yellow and dry out; extensive defoliation"],
    crops:["Potato (major host)","Tomato, eggplant"],
    causes:"Infection by A. solani and related species. Survives in infected debris, volunteer plants, and seed tubers. Alternating wet-dry conditions and plant stress favour development.",
    prev:["Use disease-free seed tubers","Crop rotation (2+ seasons)","Remove and burn diseased crop debris","Avoid overhead irrigation","Maintain balanced nutrition (adequate nitrogen)"],
    ctrl:["Use resistant cultivars where available","Scout older leaves first","Combine with crop rotation and residue destruction","Prevent harvest damage to reduce tuber infection"],
    treat:["Mancozeb 0.25%, chlorothalonil 0.2%, or Zineb 0.25%","Spray intervals: weekly to 10–21 days depending on product and pressure","Mancozeb + urea solution also used","Use only locally registered products"],
    life:"Survives in infected debris, volunteer plants, and seed tubers. Spores spread by wind and rain splash.",
    extra:"Generally less explosive than late blight; favoured by alternating wet-dry conditions and plant stress."},

  {id:"DISEASE-009",name:"Tomato Bacterial Wilt",sci:"Ralstonia solanacearum (race 3 biovar 2)",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Bacterial+Wilt",
    desc:"The most destructive bacterial disease of tomato in Ethiopia for which no effective control measures are available. Soil-borne and water-borne pathogen.",
    sym:["Wilting of youngest leaves during hottest part of day, recovering at night","Wilting becomes permanent and spreads to older leaves","Brown discoloration of vascular tissue in cut stems","Milky-white bacterial ooze exuding from cut stems in water"],
    crops:["Tomato (major), pepper, eggplant, potato","Broad host range including many solanaceous and non-solanaceous plants"],
    causes:"Infection by R. solanacearum. Survives in soil, plant debris, weed hosts, irrigation water. Warm temperatures and high soil moisture favour. Continuous cropping and movement of infested soil contribute to spread.",
    prev:["Use tomato varieties with lowest disease index (variation 0.34–0.86 in Ethiopia)","Apply farmyard manure (5–10%) before planting","Rotate with non-host crops for several years","Remove and destroy infected plants promptly","Improve drainage; avoid waterlogging"],
    ctrl:["Remove and destroy infected plants immediately","Apply FYM at 5–10% before planting","Trichoderma and Pseudomonas formulations (isolated in Ziway/Meki)","Long rotations with non-host crops"],
    treat:["No effective chemical cure once plants are infected","Biological control via Trichoderma and Pseudomonas antagonists","Phytobeneficial rhizospheric bacteria under greenhouse conditions"],
    life:"Soil-borne and water-borne; persists in soil, debris, weed hosts, irrigation water for years. Enters roots through wounds or natural openings.",
    extra:"Second most important bacterial wilt pathogen in horticultural plants; widely distributed in Ethiopia."},

  {id:"DISEASE-010",name:"Tomato Fusarium Wilt",sci:"Fusarium oxysporum f. sp. lycopersici",cat:"Disease",sev:"Medium-High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Fusarium+Wilt",
    desc:"Soil-borne vascular wilt disease of tomato. Contributes to yield gap in Ethiopian smallholder tomato production.",
    sym:["Yellowing of lower leaves, often starting on one side of plant","Slight wilting during hottest part of day","One-sided wilt; brownish vascular discoloration in stem","Permanent wilting and plant death; brown root discoloration"],
    crops:["Tomato (primary host)"],
    causes:"Infection by F. oxysporum f. sp. lycopersici. Survives in soil and debris as chlamydospores for many years. Warm soil temperatures and continuous tomato cropping favour development.",
    prev:["Use resistant varieties where available","Improve soil health with compost and biochar","Apply Trichoderma harzianum and arbuscular mycorrhizal fungi","Rotate with non-host crops for 2–3 years","Remove and destroy infected plant debris"],
    ctrl:["Remove and destroy infected plants","Combine compost, biochar, AMF, and Trichoderma harzianum","Long rotations and sanitation","Prevent movement of infested soil"],
    treat:["No chemical cure once plants are infected","Bio-pesticides (AMF, T. harzianum) as integrated management","Select appropriate tomato varieties alongside biological treatments","Grafting onto resistant rootstocks where available"],
    life:"Survives in soil as chlamydospores for extended periods. Infection through roots; colonises xylem.",
    extra:"Hawassa University research evaluated compost, biochar, AMF, and Trichoderma harzianum for integrated management."},

  {id:"DISEASE-011",name:"Onion Purple Blotch",sci:"Alternaria porri",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Onion+Purple+Blotch",
    desc:"Major foliar disease of onion in Ethiopia, particularly in wet growing seasons. Can cause significant bulb yield reduction.",
    sym:["Small whitish to yellowish spots on leaves, often near leaf tip","Spots enlarge into purplish-brown lesions with chlorotic halo","Lesions develop concentric rings; may coalesce causing leaf blighting","Bulb necks may also be affected; secondary rot in bulbs"],
    crops:["Onion (primary), garlic, leek, other Allium species"],
    causes:"Infection by A. porri. Survives in infected residue, seed, bulbs. Spores spread by wind and rain splash. Wet seasons, frequent rainfall, and high humidity favour development.",
    prev:["Rotate with cereals; avoid continuous allium cropping","Use disease-free seed and bulbs","Treat seed/bulbs with Thiram 80% WP before planting","Early December transplanting (lower incidence than late October)","Ensure adequate land preparation (>3 ploughings)"],
    ctrl:["Combine fungicide application with crop rotation","Early December transplanting","Adequate land preparation","Well-drained field management"],
    treat:["RG applied 3–4 times on Bombay-Red variety — most effective (Arba Minch)","Three sprays recommended due to highest economic returns","Thiram 80% WP for seed and bulb treatment","≤6 sprays associated with lower incidence (northwestern Ethiopia); >6 may not be beneficial"],
    life:"Survives in infected crop residue, seed, and bulbs. Spores spread by wind and rain splash.",
    extra:"Late October transplanting, >6 sprays, and <4 land preparations associated with higher incidence in northwestern Ethiopia."},

  {id:"DISEASE-012",name:"Onion Downy Mildew",sci:"Peronospora destructor",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Onion+Downy+Mildew",
    desc:"Among the most important yield-reducing factors in onion production. Severely limits production in northwestern Ethiopia.",
    sym:["Pale green to yellowish elongated lesions on leaves, often extending from tip downward","Greyish to violet fuzzy sporulation on lesion undersides during humid weather","Lesions enlarge and coalesce; leaves distorted or die back from tip","Extensive leaf blighting; reduced bulb size"],
    crops:["Onion (primary), garlic, leek, other Allium species"],
    causes:"Infection by P. destructor. Survives in infected bulbs, seed, crop residue, volunteer alliums. Cool humid conditions with extended leaf wetness favour infection and sporulation.",
    prev:["Transplant in early December (lower disease than late October)","Frequent land preparation (>3 ploughings)","Plant after cereals (cereal rotation reduces disease)","Smaller fields (≤0.25 ha) had lower incidence","Use healthy seed and bulbs"],
    ctrl:["Good soil drainage and windbreaks","Use resistant cultivars where available","Combine early transplanting with cereal rotation","Good land preparation"],
    treat:[">4 fungicide sprays associated with lower incidence (northwestern Ethiopia)","≤4 sprays associated with higher disease","Use preventive spray schedule based on local extension guidance","Rotate active ingredients; follow pre-harvest intervals"],
    life:"Survives in infected bulbs, seed, residue, volunteer alliums. Spores spread by wind and rain splash.",
    extra:"Early December transplanting + cereal rotation + frequent ploughing + 4–6 fungicide applications recommended for northwestern Ethiopia."},

  {id:"DISEASE-013",name:"Bean Anthracnose",sci:"Colletotrichum lindemuthianum",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Bean+Anthracnose",
    desc:"The most important disease of common bean in Ethiopia. Can cause complete yield loss on susceptible cultivars when contaminated seed is planted.",
    sym:["Dark sunken lesions on lower stem and veins of leaves","Reddish-brown to black lesions; seedlings may damp-off or stunt","Elongated sunken stem lesions with dark border","Circular sunken pod lesions with reddish-brown border and grey centre; seed discoloration"],
    crops:["Common bean (Phaseolus vulgaris) — primary host","Other Phaseolus species and some Vigna species"],
    causes:"Infection by C. lindemuthianum. Seed-borne; survives in infected crop residue. Cool wet conditions favour development. Contaminated seed is the most important driver.",
    prev:["Use certified disease-free seed; test seed health","Seed treatment with Pseudomonas fluorescens or difenoconazole","Rotate with non-host cereals for 2–3 years","Incorporate or destroy infected residue","Manage weeds that harbour the pathogen"],
    ctrl:["Use pathogen-free seed as primary prevention","Seed treatment reduces relative yield loss (46.25% vs 69.67% in untreated)","Trichoderma viride most effective antagonist (90.34% inhibition)","Combine seed and foliar treatments"],
    treat:["Difenoconazole reduced severity 62% at Ambo; 31% at Bako","Seed treatment + difenoconazole gave yields 4× the control at Ambo","Mancolaxyl sprayed plots had 22.82% relative yield loss vs 69.67% control","Use only locally registered products"],
    life:"Seed-borne; survives in infected crop residue. Cool wet conditions favour disease development.",
    extra:"Yield losses 62.4% on-station and 67.2% on-farm in Ethiopian trials; severe cases exceed 80%."},

  {id:"DISEASE-014",name:"Common Bean Rust",sci:"Uromyces appendiculatus",cat:"Disease",sev:"Medium-High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Bean+Rust",
    desc:"Important foliar disease of Phaseolus beans in Ethiopia, particularly in southern production areas where environments are conducive to rust development.",
    sym:["Small yellowish or chlorotic spots on leaves","Raised rust-coloured pustules (uredinia) on lower leaf surface","Pustules rupture epidermis releasing rust-coloured spores","Pustules may coalesce; premature defoliation; reduced pod set"],
    crops:["Common bean (Phaseolus vulgaris) — primary host","Other Phaseolus species"],
    causes:"Infection by U. appendiculatus. Survives on infected residue and volunteer plants. Wind-borne urediniospores spread between fields. Humid conditions and moderate temperatures favour development.",
    prev:["Use resistant cultivars (Mexican 142, Black Dessie, Brown Speckled recommended in Ethiopia)","Rotate with non-host crops and manage residue","Remove volunteer bean plants","Scout lower leaf surfaces from vegetative stage","Balanced fertilisation; avoid excessive nitrogen"],
    ctrl:["Resistant cultivars as foundation","Crop rotation and residue management","Field sanitation","Integrated control program for southern Ethiopia"],
    treat:["Five spray frequencies of oxycarboxin-Plantavaz 0.1% reduced rust intensity (Ethiopian trials)","Multiple applications may be needed under high pressure","Rotate active ingredients; follow pre-harvest intervals"],
    life:"Survives on infected crop residue and volunteer bean plants. Wind-borne urediniospores spread between fields and regions.",
    extra:"Most favourable in southern Ethiopia where integrated control program should be established."},

  {id:"DISEASE-015",name:"Chickpea Ascochyta Blight",sci:"Ascochyta rabiei",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Chickpea+Ascochyta",
    desc:"A devastating disease that can cause up to 100% yield loss. Untreated plots in the Central Rift Valley of Ethiopia experienced 100% yield loss.",
    sym:["Small dark brown to black spots on leaves and stems","Spots with chlorotic halo; seedlings may damp-off or blight","Elongated sunken dark brown lesions on stems","Circular sunken pod lesions with dark borders; infected seed"],
    crops:["Chickpea (Cicer arietinum) — primary host; both desi and kabuli affected"],
    causes:"Infection by A. rabiei. Seed-borne; survives in infected residue. Cool wet weather with extended leaf wetness favours infection. Ploughing frequency and weeding practices influence disease intensity.",
    prev:["Use certified disease-free seed; test seed health","Rotate with non-host cereals for 2–3 years","Incorporate or destroy infected residue","Plough more than twice (>2 times)","Proper weeding throughout season"],
    ctrl:["Combine pathogen-free seed, rotation, residue destruction",">2 ploughings and proper weeding reduce disease","Plant kabuli types in Nitisol where appropriate","Resistance breeding is long-term priority"],
    treat:["Fungicide application at 7-day intervals under high pressure","14-day intervals may suffice under moderate pressure","Effective in reducing severity, incidence, and AUDPC in Central Rift Valley trials","Follow label instructions"],
    life:"Seed-borne; survives in infected crop residue. Primary infection from infected seed or airborne ascospores from residue.",
    extra:"Fields with >2 ploughings and proper weeding had lower disease. Kabuli chickpea in Nitisol had lower intensity in northwestern Ethiopia."},

  {id:"DISEASE-016",name:"Groundnut Leaf Spot",sci:"Nothopassalora personata",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Groundnut+Leaf+Spot",
    desc:"Also known as late leaf spot (LLS) or Cercospora leaf spot. One of the most widespread and damaging foliar diseases of groundnut. Advanced infections can cause >50% pod loss.",
    sym:["Small dark brown to black spots on upper leaf surface","Spots circular with yellow halo (early leaf spot); darker and more angular (late leaf spot)","Lesions enlarge and coalesce; dark velvety sporulation on underside","Extensive defoliation; pod loss; reduced seed filling"],
    crops:["Groundnut/peanut (Arachis hypogaea) — primary host"],
    causes:"Infection by N. personata (and C. arachidicola for early leaf spot). Requires high relative humidity (>90%), moderate temperatures (20–25°C), extended leaf wetness. Continuous groundnut cropping and insufficient fungicide programs drive epidemics.",
    prev:["Use resistant or tolerant varieties where available","Rotate with non-host cereals for 2–3 years","Incorporate or destroy infected residue","Remove volunteer groundnut plants","Appropriate spacing for air circulation"],
    ctrl:["Combine host resistance, rotation, residue management","Weekly chlorothalonil achieved high control at two eastern Ethiopian sites","Fungicides should not be relied on alone"],
    treat:["Chlorothalonil, strobilurins, triazoles, carboxamides are main fungicide groups","Weekly intervals under high pressure; longer under low pressure","Rotate active ingredients; resistance reported in other areas","Follow label instructions and pre-harvest intervals"],
    life:"Survives in infected crop residue and volunteer plants. Conidia spread by wind and rain splash.",
    extra:"Among most widespread groundnut diseases in Ethiopia. Pod loss can exceed 50% when insufficiently managed."},

  {id:"DISEASE-017",name:"Coffee Berry Disease",sci:"Colletotrichum kahawae",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Coffee+Berry+Disease",
    desc:"The most damaging fungal disease of Arabica coffee in Africa. A major threat to Ethiopia's coffee economy. Average national losses 24–30%; can reach 100% in susceptible cultivars.",
    sym:["Small dark brown to black spots on green berries","Sunken spots with defined margin","Lesions enlarge, blackening spreads over berry surface","Infected berries drop prematurely or remain as mummified black berries"],
    crops:["Arabica coffee (Coffea arabica) — essentially exclusive economic host"],
    causes:"Infection by C. kahawae. Survives in infected berries (including mummified berries). Heavy rainfall, high humidity, high altitudes are key environmental drivers.",
    prev:["Use resistant Arabica varieties — most practical and effective method","Remove and destroy mummified berries after harvest","Maintain appropriate shade and tree vigour","Regular monitoring from flowering onward","Climate-aware planning in high-risk areas"],
    ctrl:["Sanitation is primary farmer-level intervention","Resistant varieties (foundational)","Remove mummified berries from trees and ground","Sustainable long-term investment: replace susceptible trees"],
    treat:["De facto ban on synthetic fungicides against CBD in Ethiopia","Aspergillus terreus showed high in vitro mycelial growth inhibition (emerging biocontrol)","Field efficacy of biocontrol must be validated before recommending"],
    life:"Survives in infected berries including mummified berries on tree and ground. Pathogen's genetic diversity may complicate resistance durability.",
    extra:"Ethiopia is centre of origin of Arabica coffee — CBD directly threatens genetic resource base."},

  {id:"DISEASE-018",name:"Citrus Greening (HLB)",sci:"Candidatus Liberibacter spp.",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Citrus+Greening+HLB",
    desc:"Huanglongbing (HLB) or 'yellow dragon disease'. One of the most devastating citrus diseases worldwide; reported in Ethiopia. No economically effective cure exists.",
    sym:["Asymmetric yellowing (blotchy mottle) of leaves; yellow veins or vein corking","Small, upright leaves","Premature leaf drop; twig dieback; stunted growth","Lopsided, poorly coloured fruit with aborted seeds; severe tree decline"],
    crops:["Citrus species: sweet orange, mandarin, lemon, lime, grapefruit"],
    causes:"Infection by Candidatus Liberibacter species. Transmitted by psyllid vectors (Trioza erytreae, Diaphorina citri). Also spreads through infected budwood. Movement of infected nursery stock is major long-distance pathway.",
    prev:["Use certified disease-free seedlings from accredited nurseries","Avoid moving citrus plant material from HLB areas","Monitor psyllid populations","Remove and destroy infected trees (especially young trees)","Inspect trees regularly for blotchy mottle and psyllid presence"],
    ctrl:["Remove infected trees; prune affected branches and bury >60 cm deep","Conserve natural enemies of psyllids","Replant with disease-free material from certified nurseries","Area-wide coordination and quarantine"],
    treat:["No cure for HLB","No registered insecticides for psyllid management on citrus in Ethiopia","Farmers should focus on monitoring, reporting, and cultural measures","Vector control does not cure infected trees"],
    life:"Phloem-limited bacterium transmitted by psyllids. Once infected, pathogen spreads systemically and causes decline.",
    extra:"Both 'Ca. L. africanus' and 'Ca. L. asiaticus' associated with HLB in Ethiopia. Asian citrus psyllid and Las favour warm temperatures."},

  {id:"DISEASE-019",name:"Mango Anthracnose",sci:"Colletotrichum gloeosporioides",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Mango+Anthracnose",
    desc:"Major pre- and post-harvest disease of mango. In Ethiopia, yield losses range from 30% to 60%; monetary losses 0.23–0.32 USD/kg in market studies.",
    sym:["Small dark brown to black spots on leaves, stems, and young fruit","Spots with yellow halo","Sunken dark brown to black lesions; tear-stain pattern on fruit","Fruit rot with secondary pathogens; post-harvest lesions continue to expand"],
    crops:["Mango (Mangifera indica) — primary host","Other tropical fruits (related Colletotrichum species)"],
    causes:"Infection by C. gloeosporioides. Survives in infected twigs, leaves, mummified fruit. Conidia spread by rain splash and wind. Warm humid conditions favour infection.",
    prev:["Remove and destroy infected twigs, leaves, mummified fruit","Prune to improve air circulation","Use tolerant cultivars where available","Avoid overhead irrigation; handle fruit carefully","Improve packing and transportation practices"],
    ctrl:["Orchard sanitation as primary preventive","Tolerant cultivars","Pre-harvest bagging where feasible","Careful harvesting and post-harvest handling"],
    treat:["Postharvest plant extracts + hot water treatment (HWT) reduced severity (Assosa University)","Postharvest biological control kept severity <5% vs 29% in untreated (12-day trial)","Essential oil screening in vitro showed some inhibitory effects","Use only locally registered products; rotate active ingredients"],
    life:"Survives in infected twigs, leaves, mummified fruit. Conidia spread by rain splash and wind. Favoured by warm humid conditions.",
    extra:"Can reach 100% loss in unmanaged orchards. Inadequate post-harvest handling contributes to high market losses."},

  {id:"DISEASE-020",name:"Mango Anthracnose (Colletotrichum complex)",sci:"Colletotrichum spp.",cat:"Disease",sev:"High",img:"https://placehold.co/800x500/0f3d2e/ffffff?text=Mango+Anthracnose+2",
    desc:"Database record retained to preserve the original list structure. Same disease as DISEASE-019; the two entries should be cross-referenced in the AgriNova platform to avoid duplication.",
    sym:["Identical to DISEASE-019: sunken dark brown to black lesions on fruit","Tear-stain patterns","Leaf spots and post-harvest fruit rot"],
    crops:["Mango (primary host)","Other tropical fruits (related Colletotrichum species)"],
    causes:"Identical to DISEASE-019: Colletotrichum spp. infection favoured by warm humid conditions. Pathogen survives in infected twigs, leaves, mummified fruit.",
    prev:["Identical to DISEASE-019: orchard sanitation, tolerant cultivars","Careful harvesting and handling","Post-harvest treatments, monitoring, and bagging where feasible"],
    ctrl:["Identical to DISEASE-019: integrated management combining sanitation, resistant cultivars, post-harvest treatments"],
    treat:["Identical to DISEASE-019: combined plant extracts + HWT","Postharvest biological control","Essential oils and judicious fungicide use where registered"],
    life:"Identical to DISEASE-019.",
    extra:"Cross-reference record for DISEASE-019. Same regional evidence, yield-loss data, and management recommendations apply."}
];

/* ---------- STATE ---------- */
let currentFilters = { cat: "", crop: "", sev: "", search: "" };

/* ---------- HELPERS ---------- */
const $ = (id) => document.getElementById(id);

function sevClass(sev) {
  if (!sev) return "";
  const s = sev.toLowerCase();
  if (s.includes("high")) return "sev-high";
  if (s.includes("medium")) return "sev-medium";
  return "sev-low";
}

/* ---------- POPULATE FILTER DROPDOWNS ---------- */
function populateFilters() {
  const cats = new Set(), crops = new Set(), sevs = new Set();
  entries.forEach(e => {
    cats.add(e.cat);
    sevs.add(e.sev);
    e.crops.forEach(c => crops.add(c.split(" (")[0].split(",")[0].trim()));
  });

  const catSel = $("filterCategory");
  [...cats].sort().forEach(c => {
    const o = document.createElement("option"); o.value = c; o.textContent = c; catSel.appendChild(o);
  });

  const cropSel = $("filterCrop");
  [...crops].sort().forEach(c => {
    const o = document.createElement("option"); o.value = c; o.textContent = c; cropSel.appendChild(o);
  });

  const sevSel = $("filterSeverity");
  [...sevs].sort().forEach(s => {
    const o = document.createElement("option"); o.value = s; o.textContent = s; sevSel.appendChild(o);
  });
}

/* ---------- FILTER + RENDER CARDS ---------- */
function getFiltered() {
  return entries.filter(e => {
    if (currentFilters.cat && e.cat !== currentFilters.cat) return false;
    if (currentFilters.sev && e.sev !== currentFilters.sev) return false;
    if (currentFilters.crop) {
      const cropsStr = e.crops.join(" ").toLowerCase();
      if (!cropsStr.includes(currentFilters.crop.toLowerCase())) return false;
    }
    if (currentFilters.search) {
      const s = currentFilters.search.toLowerCase();
      const hay = (e.id + " " + e.name + " " + e.sci + " " + e.crops.join(" ")).toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });
}

function renderCards() {
  const list = getFiltered();
  const grid = $("cardGrid");
  grid.innerHTML = "";
  $("resultCount").textContent = `Showing ${list.length} of ${entries.length} entries`;

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:#666">No entries match your filters.</p>`;
    return;
  }

  list.forEach(e => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img class="card-img" src="${e.img}" alt="${e.name}" loading="lazy" />
      <div class="card-body">
        <p class="card-id">${e.id}</p>
        <h3 class="card-name">${e.name}</h3>
        <p class="card-sci">${e.sci}</p>
        <div class="card-tags">
          <span class="tag">${e.cat}</span>
          <span class="tag ${sevClass(e.sev)}">${e.sev}</span>
        </div>
      </div>`;
    card.addEventListener("click", () => openDetail(e));
    grid.appendChild(card);
  });
}

/* ---------- DETAIL VIEW ---------- */
function openDetail(e) {
  $("libraryView").hidden = true;
  $("detailView").hidden = false;
  window.scrollTo(0, 0);

  $("detailImage").src = e.img;
  $("detailImage").alt = e.name;
  $("detailId").textContent = e.id;
  $("detailName").textContent = e.name;
  $("detailSci").textContent = e.sci;
  $("detailCat").textContent = e.cat;
  const sevEl = $("detailSev");
  sevEl.textContent = "Severity: " + e.sev;
  sevEl.className = "badge " + sevClass(e.sev);

  $("sDesc").textContent = e.desc || "—";

  const fillList = (elId, arr) => {
    const el = $(elId);
    el.innerHTML = "";
    if (!arr || arr.length === 0) {
      const li = document.createElement("li"); li.textContent = "Not separately documented for this entry.";
      el.appendChild(li); return;
    }
    arr.forEach(item => {
      const li = document.createElement("li"); li.textContent = item; el.appendChild(li);
    });
  };

  fillList("sSym", e.sym);
  fillList("sCrops", e.crops);

  $("sCauses").textContent = e.causes || "—";
  fillList("sPrev", e.prev);
  fillList("sCtrl", e.ctrl);
  fillList("sTreat", e.treat);
  $("sLife").textContent = e.life || "Not separately documented for this entry.";
  $("sExtra").textContent = e.extra || "No additional information recorded for this entry.";
}

function closeDetail() {
  $("detailView").hidden = true;
  $("libraryView").hidden = false;
  window.scrollTo(0, 0);
}

/* ---------- EVENTS ---------- */
$("backBtn").addEventListener("click", closeDetail);
$("filterCategory").addEventListener("change", e => { currentFilters.cat = e.target.value; renderCards(); });
$("filterCrop").addEventListener("change", e => { currentFilters.crop = e.target.value; renderCards(); });
$("filterSeverity").addEventListener("change", e => { currentFilters.sev = e.target.value; renderCards(); });
$("filterSearch").addEventListener("input", e => { currentFilters.search = e.target.value; renderCards(); });
$("resetFilters").addEventListener("click", () => {
  currentFilters = { cat: "", crop: "", sev: "", search: "" };
  $("filterCategory").value = ""; $("filterCrop").value = "";
  $("filterSeverity").value = ""; $("filterSearch").value = "";
  renderCards();
});

/* ---------- INIT ---------- */
populateFilters();
renderCards();