import { db } from "@workspace/db";
import { articlesTable, ideasTable, reportsTable, discussionsTable, airQualityTable, animalSpeciesTable, forestDataTable } from "@workspace/db";

const articles = [
  // === CLEAN EARTH (15 articles) ===
  { title: "प्लास्टिक प्रदूषण — एक Global Emergency", summary: "हर साल 8 million tons plastic समुद्र में जाता है। यह केवल environmental issue नहीं, यह हर जीव का संकट है।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 7 },
  { title: "Zero Waste Life कैसे शुरू करें? — 30-Day Guide", summary: "एक महीने में अपने घर का कचरा 80% तक कैसे कम करें — practical steps जो India में काम करते हैं।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 10 },
  { title: "Microplastic — आपके खून में है यह जहर", summary: "Scientists ने human blood, breast milk, और Arctic ice में microplastics पाए हैं। यह कहाँ से आता है और कैसे रोकें।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 8 },
  { title: "घर पर Composting शुरू करें — Step by Step", summary: "रसोई के कचरे से rich fertilizer बनाएं। No smell, no mess — simply follow this Indian kitchen composting guide।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 6 },
  { title: "Kamikatsu — दुनिया का पहला Zero Waste गाँव", summary: "Japan के इस गाँव ने 45 categories में waste sort करके near-zero landfill achieve किया। India के लिए सबक।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 5 },
  { title: "Smart Dustbin Technology — AI से Waste Management", summary: "Computer vision bins जो waste automatically sort करते हैं और eco-points reward करते हैं — India के शहरों के लिए blueprint।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 7 },
  { title: "Plastic to Fuel — कचरे से ऊर्जा", summary: "Pyrolysis technology 1 kg plastic को 1 litre fuel में बदलती है। India के startups यह already कर रहे हैं।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 6 },
  { title: "Indore — India का Cleanest City कैसे बना?", summary: "Indore ने 7 साल में India's #1 cleanest city का title कैसे जीता? Leadership, citizen participation, और tech का combination।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 8 },
  { title: "E-Waste — Silent Poison", summary: "India हर साल 3.2 million tons electronic waste पैदा करता है जिसका 95% informal sector handle करता है — at great health cost।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 7 },
  { title: "Circular Economy — भविष्य की अर्थव्यवस्था", summary: "Linear economy (make-use-dispose) की जगह circular model में हर material एक नए product में वापस आता है।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 9 },
  { title: "Ocean Plastic Cleanup — Great Pacific Garbage Patch", summary: "The Ocean Cleanup project ने 200,000 kg plastic समुद्र से निकाला। New systems और India's coastal cleanup movement।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 6 },
  { title: "Single-Use Plastic Ban — India की Progress", summary: "2022 में India ने single-use plastic ban किया। क्या हुआ? Implementation challenges, successes, और अगले कदम।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 5 },
  { title: "Swachh Bharat Mission — 9 साल, क्या बदला?", summary: "2014 में शुरू हुई इस mission की real impact क्या है? Data, successes, और remaining challenges।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 8 },
  { title: "Repair Café Movement — Fix, Don't Throw", summary: "Netherlands में शुरू हुई Repair Café movement अब 2,500+ cities में है। Fix your broken things instead of buying new।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 5 },
  { title: "Green Chemistry — Safe Cleaning Products", summary: "Traditional cleaning products की chemicals drains में जाकर water bodies को pollute करती हैं। Plant-based alternatives guide।", content: "Full article content here.", category: "clean-earth", readingTimeMinutes: 6 },

  // === ANIMAL WELFARE (15 articles) ===
  { title: "गर्मी में सड़क जानवरों को कैसे बचाएं?", summary: "May-June में temperatures 45°C तक पहुँचते हैं। Street animals की प्यास और heat stroke से बचाने के practical steps।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 5 },
  { title: "AI Animal Detection — Tech जो जान बचाती है", summary: "Camera systems जो injured animals automatically detect करते हैं और rescue alerts भेजते हैं — under 30 seconds response।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 7 },
  { title: "Dual-Use Water Station — Design and Implementation", summary: "एक ही water station जो इंसान और जानवर दोनों use करें। Design, cost (₹500/station), and mass deployment plan।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 6 },
  { title: "Road Kill Prevention — Animal Crossing Technology", summary: "India में हर साल 50,000+ wildlife road accidents होते हैं। Wildlife crossing bridges और warning systems कैसे solve करते हैं।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 7 },
  { title: "Plastic और जानवर — Silent Killer", summary: "गायें, dogs, birds — सब plastic खाते हैं। 50,000+ animal deaths annually सिर्फ plastic ingestion से। Prevention guide।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 6 },
  { title: "Bird-Friendly Buildings — Architecture जो नहीं मारती", summary: "India में हर साल millions of birds glass buildings से टकराकर मरते हैं। Bird-safe glass और architectural solutions।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 5 },
  { title: "Solar Feeding Stations — Technology for Street Animals", summary: "Solar-powered automatic feeding और watering systems जो volunteers की need 80% कम कर देते हैं। Design और deployment।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 6 },
  { title: "मधुमक्खियाँ खत्म हो रही हैं — और हम क्यों डरें?", summary: "Bee population 40% decline हुई है। Bees pollinate 70% crops। No bees = no food. What's killing them और what we can do।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 8 },
  { title: "Urban Wildlife Corridors — Cities में जानवरों के रास्ते", summary: "जब forests fragmented हों तो animals isolated हो जाते हैं। Green corridors कैसे reconnect करते हैं urban ecosystems।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 7 },
  { title: "Stray Dog Problem — Compassionate Solutions", summary: "India में 30+ million stray dogs हैं। Culling काम नहीं करता। ABC (Animal Birth Control) program की success story।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 8 },
  { title: "Bird Watching — Citizen Science for Conservation", summary: "India में 1,300+ bird species हैं। eBird जैसे platforms पर citizen observations से conservation decisions बनती हैं।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 5 },
  { title: "Animal Rescue First Aid — Aapko Kya Pata Hona Chahiye", summary: "Injured animal मिले तो क्या करें, क्या न करें। Species-specific first aid और nearest rescue centers कैसे ढूंढें।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 6 },
  { title: "Marine Mammals — India's Dolphins and Whales in Crisis", summary: "India's coasts पर dolphins, whales और sea turtles nets में फंसकर मर रही हैं। Fishing communities के साथ solutions।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 7 },
  { title: "बच्चों में Animal Empathy कैसे बढ़ाएं?", summary: "Research shows children with animal empathy grow into compassionate adults। Age-by-age guide for parents and teachers।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 6 },
  { title: "Vulture Crisis — India's Ecosystem Cleaners Are Dying", summary: "India में 99.9% vultures खत्म हो गए — diclofenac drug से। Cattle carcasses बढ़ गए, disease बढ़ी। Recovery story।", content: "Full article content here.", category: "animal-welfare", readingTimeMinutes: 9 },

  // === FOREST (10 articles) ===
  { title: "Miyawaki Method — 2 साल में जंगल उगाओ", summary: "Japanese botanist की technique से parking lot size में 2 years में dense forest। Delhi, Mumbai, Bengaluru में already proven।", content: "Full article content here.", category: "forest", readingTimeMinutes: 7 },
  { title: "पुराने पेड़ों की रक्षा — एक Legal Framework", summary: "100 साल पुराना पेड़ 100 नए पेड़ों की value है। France, Italy, Australia में old tree protection laws — India के लिए model।", content: "Full article content here.", category: "forest", readingTimeMinutes: 6 },
  { title: "Urban Forest — शहरों में जंगल कैसे बनाएं?", summary: "Hyderabad, Bengaluru, Delhi में urban forests। Design principles, species selection, maintenance — complete guide।", content: "Full article content here.", category: "forest", readingTimeMinutes: 8 },
  { title: "Amazon Burning — दुनिया के फेफड़े खतरे में", summary: "2024 में Amazon में record deforestation। Brazil, India, Indonesia — tropical forests की global crisis और solutions।", content: "Full article content here.", category: "forest", readingTimeMinutes: 8 },
  { title: "Western Ghats — India's Most Threatened Biodiversity Hotspot", summary: "Western Ghats में 4,000+ endemic species हैं — Earth पर कहीं और नहीं मिलते। Threats, protection efforts, और citizen action।", content: "Full article content here.", category: "forest", readingTimeMinutes: 9 },
  { title: "Vertical Forest Buildings — Nature Meets Architecture", summary: "Milan's Bosco Verticale, Singapore's Gardens by the Bay — buildings जो जंगल हैं। India में similar projects।", content: "Full article content here.", category: "forest", readingTimeMinutes: 6 },
  { title: "Community Forest Rights — Tribal Communities as Forest Guardians", summary: "India का Forest Rights Act 2006 और tribal communities जो centuries से forests protect कर रही हैं।", content: "Full article content here.", category: "forest", readingTimeMinutes: 8 },
  { title: "Tree Planting vs. Forest Restoration — What's the Difference?", summary: "सिर्फ trees लगाना enough नहीं है। Monoculture plantations harmful हो सकते हैं। True forest restoration क्या है?", content: "Full article content here.", category: "forest", readingTimeMinutes: 7 },
  { title: "Carbon Sequestration — जंगल कैसे Climate Change रोकते हैं", summary: "Forests 2.6 billion tonnes CO₂/year absorb करते हैं। Carbon credits, REDD+, और India's Forest Carbon Market।", content: "Full article content here.", category: "forest", readingTimeMinutes: 8 },
  { title: "School Forest Program — Bhopal, Indore Model", summary: "Madhya Pradesh के 500 schools में small forests planted। Students who grow trees become adults who protect them।", content: "Full article content here.", category: "forest", readingTimeMinutes: 5 },

  // === WATER (8 articles) ===
  { title: "India का Water Crisis — 2030 तक क्या होगा?", summary: "21 major cities 2030 तक groundwater खो देंगे। Chennai near-collapse 2019 — what happened और what can save us।", content: "Full article content here.", category: "water", readingTimeMinutes: 8 },
  { title: "Rainwater Harvesting — घर पर कैसे शुरू करें?", summary: "एक घर में 1 lakh litre rainwater/year collect हो सकता है। Cost ₹15,000 — payback in 2 years। Complete how-to guide।", content: "Full article content here.", category: "water", readingTimeMinutes: 7 },
  { title: "Ganga Cleaning — 30 साल बाद कहाँ हैं?", summary: "Namami Gange, Ganga Action Plan — billions spent, लेकिन Ganga abhi bhi critically polluted। Real issues और real solutions।", content: "Full article content here.", category: "water", readingTimeMinutes: 9 },
  { title: "Sponge City Model — Flood और Drought दोनों से बचाव", summary: "China में 30+ Sponge Cities built हैं। Permeable surfaces, underground reservoirs — cities जो rainwater absorb करती हैं।", content: "Full article content here.", category: "water", readingTimeMinutes: 7 },
  { title: "AI Water Leak Detection — Smart Pipes", summary: "India में 30% पानी pipeline leaks में खोता है — invisibly। New AI systems leaks real-time detect करते हैं। Smart metering।", content: "Full article content here.", category: "water", readingTimeMinutes: 6 },
  { title: "Drip Irrigation Revolution — 50% Less Water, Same Crops", summary: "Israel ने desert में farming को revolutionize किया drip irrigation से। India's adoption story और challenges।", content: "Full article content here.", category: "water", readingTimeMinutes: 7 },
  { title: "Water ATMs — Last Mile Access Innovation", summary: "India में 15,000+ Water ATMs poor communities को affordable, clean water देते हैं। Business model और social impact।", content: "Full article content here.", category: "water", readingTimeMinutes: 6 },
  { title: "Ocean Desalination — Sea Water को Drinking Water", summary: "Israel, Saudi Arabia, Chennai में desalination plants। Technology improving, costs falling। India's coastal potential।", content: "Full article content here.", category: "water", readingTimeMinutes: 7 },

  // === TECHNOLOGY (7 articles) ===
  { title: "Earth Operating System — एक Vision", summary: "एक digital platform जहाँ पूरी Earth की problems, solutions, AI, लोग और institutions एक साथ जुड़ें। Architecture और roadmap।", content: "Full article content here.", category: "technology", readingTimeMinutes: 10 },
  { title: "Green AI — Technology जो कम Power Use करे", summary: "ChatGPT एक query में 10x Google search की energy use करता है। Green AI और energy-efficient computing का भविष्य।", content: "Full article content here.", category: "technology", readingTimeMinutes: 7 },
  { title: "Drone Surveillance for Anti-Poaching", summary: "Kenya, India में anti-poaching drones real-time wildlife monitoring कर रहे हैं। AI से poacher detection। Success stories।", content: "Full article content here.", category: "technology", readingTimeMinutes: 6 },
  { title: "Satellite Forest Monitoring — ISRO और NASA का काम", summary: "Daily satellite images से deforestation instantly detect होती है। Global Forest Watch और India's forest monitoring system।", content: "Full article content here.", category: "technology", readingTimeMinutes: 7 },
  { title: "IoT Pollution Sensors — Citizen Science Network", summary: "₹5,000 में एक pollution sensor पूरे मोहल्ले का AQI monitor कर सकता है। PurpleAir, Safecast networks की story।", content: "Full article content here.", category: "technology", readingTimeMinutes: 6 },
  { title: "Blockchain for Carbon Credits — Transparent Climate Finance", summary: "Verra, Gold Standard carbon markets में fraud problems। Blockchain-based transparent carbon credit systems।", content: "Full article content here.", category: "technology", readingTimeMinutes: 8 },
  { title: "Electric Vehicles और Clean Energy — India's Transition", summary: "India 2030 तक 30% EVs का target। Battery technology, charging infrastructure, और what it means for air quality।", content: "Full article content here.", category: "technology", readingTimeMinutes: 8 },
];

const ideas = [
  // Clean Earth
  { title: "हर गली में Smart Dustbin — AI Waste Sorter", description: "Computer vision से equipped dustbins जो automatically wet/dry/hazardous waste sort करें और fill होने पर municipal को alert भेजें। Eco-points system से citizens को reward करें।", category: "clean-earth", authorName: "Priya Sharma", upvotes: 234 },
  { title: "School Rooftop Recycling Centers", description: "हर school में एक small recycling center — students manage करें। Plastic bottles → benches, paper → notebooks, metal → sell। Eco-curriculum + real income।", category: "clean-earth", authorName: "Rahul Mishra", upvotes: 189 },
  { title: "Plastic Credit System for Fishermen", description: "Coastal fishermen को हर kilogram of ocean plastic collect करने पर cash pay करें। Clean ocean + income for fishermen। Kerala में pilot already successful।", category: "clean-earth", authorName: "Anitha Nair", upvotes: 312 },
  { title: "Zero Waste Market — Bulk Shopping Stations", description: "Malls में bulk stations जहाँ customers अपने containers लाएं — grains, oils, cleaning products। Zero packaging। Model: Pune's Bhoomi stores।", category: "clean-earth", authorName: "Deepak Joshi", upvotes: 156 },
  { title: "Plastic to Road Material", description: "India already मिलाता है plastic waste को road tar में। Scale करो — 1 km road = 1 ton plastic waste। Less potholes + clean environment।", category: "clean-earth", authorName: "Mohammed Ali", upvotes: 201 },
  { title: "Community Composting Pods in Apartments", description: "हर housing society में एक centralized composting pod — residents का organic waste → compost → society garden। Zero organic waste to landfill।", category: "clean-earth", authorName: "Sunita Patel", upvotes: 267 },
  { title: "Clean-Up App with GPS Gamification", description: "App जो garbage spots map करे, cleanup drives organize करे, and participants को points दे जो discount coupons बनें। Like Pokemon Go लेकिन Earth के लिए।", category: "clean-earth", authorName: "Arjun Singh", upvotes: 445 },
  { title: "Corporate Cleanathon — CSR for Streets", description: "Companies को quarterly street cleaning drives legally require करना चाहिए as CSR activity। Report publicly। Competition for cleanest corporate area।", category: "clean-earth", authorName: "Neha Gupta", upvotes: 178 },

  // Animal Welfare
  { title: "Dual-Use Water Station Network — Pan India", description: "हर city के हर park, bus stop, और temple के पास dual-use water station: इंसानों के लिए tap ऊपर, जानवरों के लिए bowl नीचे। Solar powered। ₹500 per station।", category: "animal-welfare", authorName: "Kavya Reddy", upvotes: 567 },
  { title: "Animal Emergency App — 24/7 Rescue Network", description: "Injured animal photograph करो, GPS automatically attach हो, nearest volunteer को instant notification। 15-minute response guarantee। Already working in Chennai।", category: "animal-welfare", authorName: "Rohan Verma", upvotes: 489 },
  { title: "AI Camera Network for Street Animal Health", description: "City CCTV cameras पर animal detection AI — injured, sick, trapped animals automatic detect करके rescue team को alert। No need for manual monitoring।", category: "animal-welfare", authorName: "Dr. Meera Iyer", upvotes: 334 },
  { title: "Bird Cafes on Office Buildings", description: "हर commercial building की roof पर bird feeding station और birdbath। Architects को design में include करना चाहिए। ₹2,000 setup — hundreds of birds served daily।", category: "animal-welfare", authorName: "Pavan Kumar", upvotes: 223 },
  { title: "Animal-Friendly Street Lighting", description: "Warm amber LEDs (2700K) बजाय white/blue LEDs के — जो bats, moths, birds disoriented नहीं करते। Netherlands में proven। City-wide switch = 60% less insect deaths।", category: "animal-welfare", authorName: "Dr. Sita Menon", upvotes: 301 },
  { title: "Highway Animal Crossing Bridges", description: "NH-7 जैसे busy highways पर wildlife crossing bridges — ecoducts। Bandipur में already built। Scale to all tiger reserves। Roadkill 90% कम हो जाता है।", category: "animal-welfare", authorName: "Forest Officer Rajan", upvotes: 412 },
  { title: "Smart Solar Feeding Station Network", description: "Solar powered automated feeding + watering systems in city parks। AI monitors animal health, flags sick animals, automatic refills। Volunteer time 80% reduce।", category: "animal-welfare", authorName: "Ananya Krishnan", upvotes: 289 },
  { title: "Bee Hotel Network in Cities", description: "Small wooden structures with hollow tubes = homes for solitary bees। Place them in parks, schools, rooftops। Bee population बढ़े = better pollination = more food।", category: "animal-welfare", authorName: "Priti Sharma", upvotes: 198 },

  // Forest
  { title: "Miyawaki Forest in Every School Campus", description: "हर school के unused corner में Miyawaki method से mini-forest। 2 years में ready। Students tend it। 100 cities × 100 schools × 500 sqm = 5,000 urban forests।", category: "forest", authorName: "Teacher Ramesh", upvotes: 378 },
  { title: "Free Sapling Sunday — Municipal Program", description: "हर Sunday municipal parks में free native saplings। Residents लाएं — take, plant, photograph, track on app। Annual contest for most trees planted per ward।", category: "forest", authorName: "Vijay Nair", upvotes: 256 },
  { title: "Old Tree Heritage Registry", description: "100+ साल पुराने सभी trees को GPS tag करके public registry में डालो। Legal protection। Community tree guardians assign करो। Fine for cutting — ₹10 lakh minimum।", category: "forest", authorName: "Dr. Aruna Devi", upvotes: 334 },
  { title: "Vertical Garden Mandates for New Buildings", description: "100+ unit apartments को legally require करो that 10% of exterior wall space be vertical garden। Green building rating में mandatory points।", category: "forest", authorName: "Architect Pradeep", upvotes: 189 },
  { title: "River Riparian Forest Restoration", description: "हर river के दोनों sides पर 50m green corridor — native trees only। Buffer against floods, habitat for wildlife, natural water filtration। MP में Narmada model।", category: "forest", authorName: "Water Activist Geetha", upvotes: 267 },
  { title: "Corporate Adopt-a-Forest Program", description: "IT companies, banks, MNCs को 1 acre+ degraded forest adopt करने का option — with monitoring, reporting, carbon credit benefits। Mandatory disclosure।", category: "forest", authorName: "Sustainability Lead Ajay", upvotes: 223 },

  // Water
  { title: "Mandatory Rainwater Harvesting — All New Construction", description: "सभी नई buildings में rainwater harvesting mandatory करो। Rooftop → underground tank → pump। Average home saves 1 lakh litre/year। Maharashtra model expand करो।", category: "water", authorName: "Civil Engineer Prem", upvotes: 398 },
  { title: "AI Pipe Leak Detection — Smart Water Grid", description: "City water pipes में flow sensors + AI analysis। Leaks detect होते हैं before they become major। India 30% पानी leaks में खोता है — fix this first।", category: "water", authorName: "Water Engineer Ramya", upvotes: 312 },
  { title: "Community Pond Restoration Program", description: "India के 24 lakh ponds में से most neglected हैं। Community groups को funding दो restoration के लिए। Each pond = 10 million litre water storage + biodiversity।", category: "water", authorName: "Village Leader Gopal", upvotes: 445 },
  { title: "Grey Water Recycling in Apartments", description: "Bathroom water (minus toilet) को filter करके garden, car washing, toilet flushing के लिए reuse। 40% household water saved। Simple plumbing change।", category: "water", authorName: "Eco Architect Divya", upvotes: 234 },
  { title: "Water Budget App for Families", description: "App जो family का daily water use track करे, compare करे with city average, suggest savings, और monthly water score दे। Gamification + education।", category: "water", authorName: "App Developer Kiran", upvotes: 178 },
  { title: "Fog Collection Nets for Dry Areas", description: "Coastal और hilly areas में fog collection nets से पानी collect होता है। No energy needed। Rajasthan, Ladakh जैसी dry areas के लिए perfect solution।", category: "water", authorName: "Rural Development Officer", upvotes: 156 },

  // Technology
  { title: "Pollution Sensor Network on School Rooftops", description: "हर school की roof पर ₹5,000 का air quality sensor। City-wide open data network। Students learn to read the data। Real-time pollution map।", category: "technology", authorName: "Science Teacher Arun", upvotes: 289 },
  { title: "Animal-Friendly LED Street Lights Nationwide", description: "Replace harsh white LEDs with warm amber (2700K). Insects, bats, birds ka navigation disrupted नहीं होगा। Netherlands में proven। India-wide campaign।", category: "technology", authorName: "Entomologist Dr. Maya", upvotes: 356 },
  { title: "Open Source Environmental Data Platform", description: "Government को air, water, forest, animal data open source करना चाहिए। Public APIs। Then researchers, startups, citizens build solutions on top।", category: "technology", authorName: "Developer Saurabh", upvotes: 423 },
  { title: "Earth Dashboard — Real-Time City Environmental Score", description: "हर city का daily environmental score — air, water, green cover, animal reports, waste। Public LED display at Collector office। Politicians accountable।", category: "technology", authorName: "Policy Analyst Tara", upvotes: 512 },
  { title: "AI Idea Generator for Environmental Problems", description: "Local problem input करो — AI suggest करे 100 solutions using global best practices। Scale from village to city. Free for NGOs और municipal bodies।", category: "technology", authorName: "AI Researcher Rohan", upvotes: 234 },
  { title: "GPS-Tagged Tree Network — Save India's Trees", description: "Volunteer-tagged trees with QR codes. Scan = tree's history, health data, carbon contribution. Illegal cutting = instant alert। 10 lakh trees campaign।", category: "technology", authorName: "Tree Activist Pooja", upvotes: 378 },

  // Cities
  { title: "No-Idling Law for Vehicles near Schools", description: "Schools के 200m radius में vehicle idling ban। Sensors detect violations, automatic fine via Fastag। Protects 100 million children from exhaust pollution।", category: "cities", authorName: "Parent Meena", upvotes: 267 },
  { title: "Green Rooftop Mandate for Government Buildings", description: "सभी government buildings की flat rooftops पर solar + green roof mandatory। Sets example, reduces heat island, generates power, collects water।", category: "cities", authorName: "Urban Planner Aditya", upvotes: 189 },
  { title: "Animal Zones in City Master Plans", description: "Future city planning में dedicated Animal Zones — shelters, water points, feeding stations, vet clinics। Just like parks and roads, animals deserve infrastructure।", category: "cities", authorName: "Urban Designer Lakshmi", upvotes: 334 },
  { title: "Pedestrian-Only Sundays in City Centers", description: "हर Sunday 8am-2pm city center car-free। Walking, cycling, street markets। Air quality instantly better। Community bonding। European cities में proven।", category: "cities", authorName: "Town Planner Ravi", upvotes: 445 },
  { title: "Urban Biodiversity Index — Track City Life", description: "हर city का annual biodiversity index — birds spotted, insects counted, trees logged. Municipal budget allocation based on score. Competition for greenest city।", category: "cities", authorName: "Ecologist Dr. Nisha", upvotes: 312 },
];

const reports = [
  { type: "pollution", description: "Yamuna river के पास एक factory से गाढ़ा काला धुंआ निकल रहा है। हर सुबह 6-8 बजे visible है। पास के गाँव में breathing problems बढ़ रही हैं।", location: "Wazirabad, Delhi", status: "in-progress", reporterName: "Anonymous" },
  { type: "animal-emergency", description: "NH-48 पर एक घायल कुत्ता 2 दिनों से बैठा है, back legs से चल नहीं पा रहा। गाड़ियां उसे ignore कर रही हैं। तुरंत मदद चाहिए।", location: "Sector 15, Gurugram", status: "pending", reporterName: "Ritu Sharma" },
  { type: "tree-cutting", description: "5 पुराने पीपल के पेड़ जो 50+ साल पुराने हैं, बिना permission काटे जा रहे हैं। Builder ने रात को काम शुरू किया। FIR दर्ज करने की request।", location: "Banjara Hills, Hyderabad", status: "pending", reporterName: "Suresh Kumar" },
  { type: "water-pollution", description: "नाला में industrial effluents छोड़े जा रहे हैं जो Mula river में मिल रहे हैं। Foam और smell clearly visible। Fish marne लगी हैं।", location: "Pimpri-Chinchwad, Pune", status: "in-progress", reporterName: "Environmental Group Pune" },
  { type: "garbage", description: "Sector 9 park के पास कूड़े का पहाड़ बन गया है। Municipal truck 3 हफ्ते से नहीं आई। Stray animals कचरे में खाना ढूंढ रहे हैं। Disease का खतरा।", location: "Chandigarh, Sector 9", status: "pending", reporterName: "Park Committee" },
  { type: "animal-emergency", description: "एक owl घायल होकर terrace पर गिरी है — wing से blood आ रहा है। Wildlife rescue को call किया लेकिन response नहीं। Help needed urgently।", location: "Koramangala, Bengaluru", status: "resolved", reporterName: "Kavitha P" },
  { type: "pollution", description: "Construction site की dust से पूरे मोहल्ले में visibility शून्य हो जाती है। Anti-smog screen नहीं है, water sprinkling नहीं। AQI 400+ हो जाता है।", location: "Dwarka Phase 2, Delhi", status: "pending", reporterName: "RWA Secretary" },
  { type: "water-pollution", description: "Municipal tanker water गंदला और बदबूदार आ रहा है। 3 बच्चों को stomach infection हुई। Sample test करवाया — bacteria detected।", location: "Dharavi, Mumbai", status: "in-progress", reporterName: "Community Leader" },
  { type: "tree-cutting", description: "Metro project के नाम पर 200+ trees काटे जा रहे हैं बिना transplantation के। HC order के बावजूद काम जारी है। PIL file करने की जरूरत है।", location: "Anna Nagar, Chennai", status: "pending", reporterName: "Green Brigade Chennai" },
  { type: "garbage", description: "River bank पर marriage party का पूरा कचरा छोड़ा गया है — thermocol, plastic, food waste। River में जा रहा है। Organizer identify होना चाहिए।", location: "Sabarmati Riverfront, Ahmedabad", status: "pending", reporterName: "Ramesh Patel" },
];

const discussions = [
  { topic: "शहरों में solar panels अनिवार्य करना चाहिए?", message: "मेरा मानना है कि नए buildings पर solar panels लगाना mandatory होना चाहिए। Germany और Spain में यह already है। India में 300+ sunny days हैं — हम इसका फायदा क्यों नहीं उठाते? इससे both electricity और environment दोनों save होंगे।", authorName: "Rohan Sharma", category: "technology", upvotes: 47 },
  { topic: "Plastic ban effective क्यों नहीं हो रहा India में?", message: "2022 से single-use plastic ban है, लेकिन आज भी shops में मिलता है। Problem enforcement में है। Local NGOs और citizens को इसे seriously लेना होगा। क्या solutions हो सकते हैं? Education? Fines? Alternatives?", authorName: "Priya Nair", category: "clean-earth", upvotes: 89 },
  { topic: "Electric Vehicles vs Public Transport — क्या better है environment के लिए?", message: "हर कोई EV खरीदने की बात करता है, लेकिन क्या personally एक EV खरीदना उतना effective है जितना कि robust public transport system? Battery production में भी resources जाते हैं। आपका क्या view है?", authorName: "Arjun Mehta", category: "technology", upvotes: 134 },
  { topic: "Miyawaki forests — क्या urban areas में काम करते हैं?", message: "मैंने Pune में एक Miyawaki forest visit किया — 3 साल में amazing results! 600 plants, insects वापस आए, birds वापस आए। क्या हमारे city में भी यह project शुरू हो सकता है? कौन साथ देगा?", authorName: "Sneha Kulkarni", category: "forest", upvotes: 73 },
  { topic: "Street dogs problem का compassionate solution क्या है?", message: "Municipalities कुत्तों को मारती हैं जो न ethical है न effective। ABC (Animal Birth Control) program proven है — sterilization + vaccination से population control। लेकिन funding की कमी है। हम community level पर क्या कर सकते हैं?", authorName: "Deepa Krishnan", category: "animal-welfare", upvotes: 156 },
  { topic: "Rainwater Harvesting — Mandatory होना चाहिए?", message: "Bangalore में groundwater 300 meters नीचे चला गया। RWH (Rainwater Harvesting) को mandatory करने से significant difference पड़ सकता है। कुछ states में यह है, कुछ में नहीं। National level policy क्यों नहीं है?", authorName: "Suresh Kumar", category: "water", upvotes: 92 },
  { topic: "Air Quality monitoring — हर school में होना चाहिए", message: "बच्चे 6-8 घंटे school में रहते हैं जब AQI 400+ होता है। Parents को पता नहीं। अगर हर school में low-cost sensor लगे तो parents real-time decisions ले सकते हैं। ₹5000 में PurpleAir sensor मिलता है — school budget में afford होता है।", authorName: "Kavitha Rao", category: "clean-earth", upvotes: 211 },
  { topic: "Coral reefs India में — कितने बचे हैं?", message: "India में Lakshadweep, Andaman और Gulf of Mannar में coral reefs हैं। Climate change से bleaching हो रहा है। Lakshadweep में 40% coral already dead है। Tourists और fishermen दोनों impact कर रहे हैं। Awareness बढ़ानी होगी।", authorName: "Marine Biologist Ananya", category: "water", upvotes: 68 },
  { topic: "Climate anxiety — young generation में बढ़ रहा है", message: "Gen Z में climate anxiety real problem बन रही है। WHO reports increase in eco-grief। हमें सिर्फ problems नहीं बतानी — solutions और hope भी देनी है। Earth For All जैसे platforms इसी लिए important हैं।", authorName: "Psychology Student Riya", category: "clean-earth", upvotes: 178 },
  { topic: "India में Organic farming कितनी scalable है?", message: "Sikkim 100% organic state है। क्या यह national level पर possible है? Transition period में yield drop होता है जो farmers afford नहीं कर सकते। Government support क्या होनी चाहिए? Subsidy? Insurance?", authorName: "Farmer Kiran Patil", category: "technology", upvotes: 45 },
];

const airQualityData = [
  { city: "Delhi", country: "India", aqi: 312, pm25: 187.2, pm10: 298.5, no2: 45.3, o3: 28.1, status: "Hazardous" },
  { city: "Lahore", country: "Pakistan", aqi: 289, pm25: 171.0, pm10: 245.2, no2: 52.1, o3: 18.4, status: "Hazardous" },
  { city: "Dhaka", country: "Bangladesh", aqi: 268, pm25: 158.3, pm10: 234.1, no2: 41.2, o3: 22.0, status: "Hazardous" },
  { city: "Kolkata", country: "India", aqi: 198, pm25: 112.4, pm10: 189.3, no2: 38.5, o3: 31.2, status: "Very Unhealthy" },
  { city: "Beijing", country: "China", aqi: 176, pm25: 98.7, pm10: 165.4, no2: 64.3, o3: 42.1, status: "Unhealthy" },
  { city: "Mumbai", country: "India", aqi: 164, pm25: 89.2, pm10: 142.8, no2: 35.4, o3: 28.9, status: "Unhealthy" },
  { city: "Chennai", country: "India", aqi: 142, pm25: 75.6, pm10: 128.3, no2: 28.1, o3: 35.4, status: "Unhealthy" },
  { city: "Hyderabad", country: "India", aqi: 118, pm25: 62.4, pm10: 108.7, no2: 24.5, o3: 38.2, status: "Unhealthy for Sensitive Groups" },
  { city: "Bengaluru", country: "India", aqi: 98, pm25: 48.3, pm10: 88.1, no2: 21.3, o3: 41.5, status: "Moderate" },
  { city: "Pune", country: "India", aqi: 87, pm25: 42.1, pm10: 78.6, no2: 18.4, o3: 43.2, status: "Moderate" },
  { city: "London", country: "UK", aqi: 45, pm25: 12.4, pm10: 28.3, no2: 35.6, o3: 52.1, status: "Good" },
  { city: "Paris", country: "France", aqi: 52, pm25: 14.8, pm10: 31.2, no2: 38.4, o3: 48.7, status: "Moderate" },
  { city: "New York", country: "USA", aqi: 48, pm25: 11.2, pm10: 22.4, no2: 28.3, o3: 58.2, status: "Good" },
  { city: "Sydney", country: "Australia", aqi: 28, pm25: 5.8, pm10: 14.2, no2: 12.1, o3: 38.4, status: "Good" },
  { city: "Tokyo", country: "Japan", aqi: 55, pm25: 15.2, pm10: 34.1, no2: 42.3, o3: 61.4, status: "Moderate" },
  { city: "Singapore", country: "Singapore", aqi: 42, pm25: 10.4, pm10: 23.5, no2: 18.6, o3: 44.2, status: "Good" },
  { city: "Dubai", country: "UAE", aqi: 78, pm25: 28.4, pm10: 62.8, no2: 15.2, o3: 35.8, status: "Moderate" },
  { city: "Nairobi", country: "Kenya", aqi: 67, pm25: 22.1, pm10: 48.3, no2: 12.4, o3: 32.1, status: "Moderate" },
  { city: "São Paulo", country: "Brazil", aqi: 82, pm25: 34.6, pm10: 71.2, no2: 44.8, o3: 68.3, status: "Moderate" },
  { city: "Jakarta", country: "Indonesia", aqi: 152, pm25: 82.3, pm10: 138.1, no2: 31.4, o3: 24.2, status: "Unhealthy" },
];

const animalSpeciesData = [
  { speciesName: "Bengal Tiger", scientificName: "Panthera tigris tigris", status: "Endangered", habitat: "Tropical and subtropical moist broadleaf forests", population: "~3,000 in wild", threats: "Poaching, habitat loss, human-wildlife conflict", protectionMethods: "Project Tiger, national parks, anti-poaching units", country: "India" },
  { speciesName: "Snow Leopard", scientificName: "Panthera uncia", status: "Vulnerable", habitat: "High mountain ranges of Central and South Asia", population: "~4,000-6,500", threats: "Poaching for fur and bones, habitat degradation, prey depletion", protectionMethods: "GSLEP (Global Snow Leopard Program), community conservation", country: "India/Nepal/China" },
  { speciesName: "Asian Elephant", scientificName: "Elephas maximus", status: "Endangered", habitat: "Forests of South and Southeast Asia", population: "~40,000-50,000", threats: "Habitat loss, human-elephant conflict, ivory poaching", protectionMethods: "Project Elephant, wildlife corridors, community coexistence", country: "India/Sri Lanka/Thailand" },
  { speciesName: "Indian One-Horned Rhinoceros", scientificName: "Rhinoceros unicornis", status: "Vulnerable", habitat: "Grasslands and forests of Nepal and India", population: "~3,700", threats: "Poaching for horn, habitat loss, flooding", protectionMethods: "Kaziranga National Park, armed guards, translocation programs", country: "India" },
  { speciesName: "Gangetic River Dolphin", scientificName: "Platanista gangetica", status: "Endangered", habitat: "Ganges-Brahmaputra river system", population: "~3,000", threats: "River pollution, fishing nets, dam construction", protectionMethods: "National Aquatic Animal status, pollution control", country: "India/Bangladesh" },
  { speciesName: "Indian Lion", scientificName: "Panthera leo persica", status: "Endangered", habitat: "Gir Forest, Gujarat", population: "~674 (only wild population)", threats: "Disease, single habitat dependence, human conflict", protectionMethods: "Gir National Park, disease monitoring, habitat expansion", country: "India" },
  { speciesName: "Olive Ridley Sea Turtle", scientificName: "Lepidochelys olivacea", status: "Vulnerable", habitat: "Tropical and subtropical oceans", population: "Millions (but declining)", threats: "Fishing nets, beach development, plastic ingestion, poaching", protectionMethods: "Beach monitoring, fishing net modifications, nesting protection", country: "India/Global" },
  { speciesName: "Vulture (White-rumped)", scientificName: "Gyps bengalensis", status: "Critically Endangered", habitat: "South and Southeast Asia", population: "~6,000 (99.9% decline from millions)", threats: "Diclofenac drug in cattle, lead poisoning", protectionMethods: "Diclofenac ban, vulture restaurants, captive breeding", country: "India" },
  { speciesName: "African Elephant", scientificName: "Loxodonta africana", status: "Vulnerable", habitat: "Sub-Saharan Africa savannas and forests", population: "~415,000", threats: "Ivory poaching, habitat loss, human conflict", protectionMethods: "CITES ban, national parks, anti-poaching patrols", country: "Africa" },
  { speciesName: "Amur Leopard", scientificName: "Panthera pardus orientalis", status: "Critically Endangered", habitat: "Russian Far East and China", population: "~100 in wild", threats: "Poaching, habitat loss, prey depletion", protectionMethods: "Land of the Leopard National Park, breeding programs", country: "Russia/China" },
  { speciesName: "Vaquita Porpoise", scientificName: "Phocoena sinus", status: "Critically Endangered", habitat: "Northern Gulf of California", population: "~10 individuals", threats: "Bycatch in gillnets, illegal fishing", protectionMethods: "Fishing net ban, military patrols, captive refuge", country: "Mexico" },
  { speciesName: "Javan Rhino", scientificName: "Rhinoceros sondaicus", status: "Critically Endangered", habitat: "Ujung Kulon National Park, Java", population: "~72", threats: "Invasive plant species, tsunamis, disease, inbreeding", protectionMethods: "Intense monitoring, habitat management, no captive population", country: "Indonesia" },
];

const forestDataEntries = [
  { country: "Russia", forestAreaMha: 814.9, forestLossMha: 4.1, treeCanopyCover: 47.2, year: 2023, carbonStockMt: 246800 },
  { country: "Brazil", forestAreaMha: 496.6, forestLossMha: 11.4, treeCanopyCover: 58.5, year: 2023, carbonStockMt: 148000 },
  { country: "Canada", forestAreaMha: 346.9, forestLossMha: 2.1, treeCanopyCover: 34.1, year: 2023, carbonStockMt: 54100 },
  { country: "USA", forestAreaMha: 309.8, forestLossMha: 4.8, treeCanopyCover: 33.9, year: 2023, carbonStockMt: 47100 },
  { country: "China", forestAreaMha: 219.9, forestLossMha: 0.8, treeCanopyCover: 23.4, year: 2023, carbonStockMt: 46400 },
  { country: "Australia", forestAreaMha: 134.0, forestLossMha: 5.3, treeCanopyCover: 17.4, year: 2023, carbonStockMt: 20900 },
  { country: "Democratic Republic of Congo", forestAreaMha: 126.2, forestLossMha: 6.8, treeCanopyCover: 55.1, year: 2023, carbonStockMt: 47300 },
  { country: "Indonesia", forestAreaMha: 92.1, forestLossMha: 3.6, treeCanopyCover: 50.5, year: 2023, carbonStockMt: 25600 },
  { country: "Peru", forestAreaMha: 73.3, forestLossMha: 1.7, treeCanopyCover: 57.3, year: 2023, carbonStockMt: 24200 },
  { country: "India", forestAreaMha: 72.6, forestLossMha: 0.2, treeCanopyCover: 24.6, year: 2023, carbonStockMt: 7083 },
  { country: "Bolivia", forestAreaMha: 68.6, forestLossMha: 2.3, treeCanopyCover: 62.4, year: 2023, carbonStockMt: 19600 },
  { country: "Mexico", forestAreaMha: 65.5, forestLossMha: 1.9, treeCanopyCover: 33.2, year: 2023, carbonStockMt: 11000 },
  { country: "Colombia", forestAreaMha: 59.1, forestLossMha: 1.9, treeCanopyCover: 52.7, year: 2023, carbonStockMt: 15800 },
  { country: "Angola", forestAreaMha: 53.6, forestLossMha: 0.5, treeCanopyCover: 43.7, year: 2023, carbonStockMt: 10400 },
  { country: "Sudan/South Sudan", forestAreaMha: 42.5, forestLossMha: 0.8, treeCanopyCover: 17.2, year: 2023, carbonStockMt: 3800 },
];

async function seed() {
  console.log("🌍 Seeding Earth For All database...");

  // Clear existing data
  await db.delete(articlesTable);
  await db.delete(ideasTable);
  await db.delete(reportsTable);
  await db.delete(discussionsTable);
  await db.delete(airQualityTable);
  await db.delete(animalSpeciesTable);
  await db.delete(forestDataTable);
  console.log("✅ Cleared existing data");

  // Insert articles
  for (const article of articles) {
    await db.insert(articlesTable).values(article);
  }
  console.log(`✅ Inserted ${articles.length} articles`);

  // Insert ideas
  for (const idea of ideas) {
    await db.insert(ideasTable).values(idea);
  }
  console.log(`✅ Inserted ${ideas.length} ideas`);

  // Insert reports
  for (const report of reports) {
    await db.insert(reportsTable).values(report);
  }
  console.log(`✅ Inserted ${reports.length} reports`);

  // Insert discussions
  for (const d of discussions) {
    await db.insert(discussionsTable).values(d);
  }
  console.log(`✅ Inserted ${discussions.length} discussions`);

  // Insert air quality
  for (const aq of airQualityData) {
    await db.insert(airQualityTable).values(aq);
  }
  console.log(`✅ Inserted ${airQualityData.length} air quality records`);

  // Insert animal species
  for (const sp of animalSpeciesData) {
    await db.insert(animalSpeciesTable).values(sp);
  }
  console.log(`✅ Inserted ${animalSpeciesData.length} animal species`);

  // Insert forest data
  for (const fd of forestDataEntries) {
    await db.insert(forestDataTable).values(fd);
  }
  console.log(`✅ Inserted ${forestDataEntries.length} forest data entries`);

  console.log("🌱 Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
