import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

const SOLUTIONS = [
  {
    id: "plastic",
    emoji: "♻️",
    problem: "Plastic Pollution",
    color: "from-teal-900/40 to-cyan-900/20",
    border: "border-teal-800/40",
    headColor: "text-teal-300",
    data: {
      evidence: ["430M tons plastic produced in 2023", "Only 9% actually recycled", "8M tons enters oceans every year", "Microplastics found in human blood, placenta, lungs"],
      causes: ["Single-use culture — convenience over sustainability", "Lack of recycling infrastructure in developing countries", "Extended Producer Responsibility (EPR) not enforced", "Cheap production costs with no pollution cost included"],
      impact: ["Marine animals: 100,000+ die from plastic entanglement yearly", "Food chain contamination — fish eat microplastics → humans eat fish", "Economic: $13B/year damage to marine ecosystem", "Health: microplastics linked to inflammation and potential cancer risk"],
      solutions: [
        { type: "Tech", text: "Precious Plastic machines — community-level recycling units, Open Source blueprints available", url: "https://preciousplastic.com" },
        { type: "Policy", text: "Extended Producer Responsibility — manufacturers pay for product end-of-life disposal" },
        { type: "Community", text: "Plastic-free zones in markets — Sikkim और Himachal Pradesh में successful model" },
        { type: "Innovation", text: "Pyrolysis technology — 1 kg plastic = 0.8 litre fuel (India ke 50+ startups doing this)" },
        { type: "Behavior", text: "5R principle: Refuse → Reduce → Reuse → Repurpose → Recycle — in that order" },
      ],
      research: [
        { name: "OECD Global Plastics Outlook 2022", url: "https://www.oecd.org/environment/plastics" },
        { name: "UNEP Plastic Pollution Report", url: "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution" },
      ],
      action: ["Refuse single-use plastic at shops", "Set up apartment-level plastic collection point", "Support local businesses using alternatives", "Join beach/river cleanup drives — report on this platform"],
      casestudy: "Rwanda — World's first near-complete plastic bag ban (2008). Kigali cleaner than Singapore. Economic boost from eco-tourism. Proves: policy + enforcement works.",
    }
  },
  {
    id: "deforestation",
    emoji: "🌳",
    problem: "Deforestation",
    color: "from-green-900/40 to-emerald-900/20",
    border: "border-green-800/40",
    headColor: "text-green-300",
    data: {
      evidence: ["15 billion trees cut every year", "Amazon lost area size of France since 1970", "India: 21% forest cover, target is 33%", "Every minute: 30 football fields of forest destroyed"],
      causes: ["Agriculture expansion — cattle, palm oil, soy", "Illegal logging — timber and charcoal trade", "Infrastructure: roads, dams fragment forests", "Mining: open-cast mining destroys entire ecosystems"],
      impact: ["80% of terrestrial species live in forests — habitat destruction = extinction", "Forests store 45% of land carbon — cutting = massive CO₂ release", "Water cycle disruption — rivers dry up near deforested areas", "Tribal communities: 300M+ people depend on forests for survival"],
      solutions: [
        { type: "Tech", text: "Miyawaki Method — dense native forest in 2 years on small urban plots", url: "https://earthforall.in" },
        { type: "Innovation", text: "Drone seeding: 40,000 seeds/day, reaching inaccessible terrain" },
        { type: "Policy", text: "REDD+ payments: developed countries pay developing nations to keep forests standing" },
        { type: "Community", text: "Joint Forest Management — tribal communities as forest guardians (India: successful in MP, Odisha)" },
        { type: "Behavior", text: "Reduce beef consumption — 80% of Amazon destruction is cattle ranching" },
      ],
      research: [
        { name: "Global Forest Watch Data", url: "https://www.globalforestwatch.org" },
        { name: "FAO State of World Forests", url: "https://www.fao.org/state-of-forests/en" },
      ],
      action: ["Plant 1 native tree — not imported species", "Support Miyawaki forests in your city", "Buy FSC-certified wood products", "Report illegal tree cutting on this platform"],
      casestudy: "Costa Rica — 1980s mein only 21% forest. Government paid farmers to protect trees. Today: 54% forest cover, thriving eco-tourism, carbon credits income.",
    }
  },
  {
    id: "air-pollution",
    emoji: "💨",
    problem: "Air Pollution",
    color: "from-cyan-900/40 to-slate-900/20",
    border: "border-cyan-800/40",
    headColor: "text-cyan-300",
    data: {
      evidence: ["7 million deaths annually from air pollution", "99% world population breathes unsafe air", "Delhi AQI regularly 400+ (hazardous)", "South Asia = world's most polluted region"],
      causes: ["Vehicle emissions: 30-40% of urban pollution", "Industrial emissions: factories, power plants", "Crop burning: Punjab-Haryana contribute 20% of Delhi winter smog", "Construction dust, garbage burning, firecrackers"],
      impact: ["1 in 4 deaths globally linked to environmental factors", "Children with stunted lung development in high-pollution areas", "₹2.6 lakh crore economic loss annually in India from air pollution", "2-5 year life expectancy reduction in Delhi"],
      solutions: [
        { type: "Policy", text: "BS6 emission standards — auto sector compliance (India: significant improvement post-2020)" },
        { type: "Tech", text: "Low-cost IoT air quality sensors — community monitoring (PurpleAir, AirNow)", url: "https://www.purpleair.com" },
        { type: "Community", text: "Happy Seeder technology — farmers can use crop residue instead of burning" },
        { type: "Innovation", text: "Smog Free Tower (Daan Roosegaarde) — cleans 30,000 m³/hr, creates smog jewelry" },
        { type: "Behavior", text: "Work from home on high AQI days, use air purifiers with HEPA filters" },
      ],
      research: [
        { name: "WHO Air Quality Guidelines 2021", url: "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health" },
        { name: "HEI Air Pollution Reports", url: "https://www.healtheffects.org/publication/global-burden-disease-attributable-ambient-air-pollution" },
      ],
      action: ["Monitor AQI daily using apps (IQAir, AQI India)", "Report garbage burning near you", "Advocate for EV buses in your city", "Plant pollution-absorbing trees: Neem, Peepal, Bamboo"],
      casestudy: "Beijing — 2013 mein 'Airpocalypse' — AQI 755. Government: ₹35 lakh crore investment, coal plant closures, EV mandate. Result: PM2.5 down 40% by 2022. Possible.",
    }
  },
  {
    id: "water",
    emoji: "🌊",
    problem: "Water Crisis",
    color: "from-blue-900/40 to-indigo-900/20",
    border: "border-blue-800/40",
    headColor: "text-blue-300",
    data: {
      evidence: ["2 billion people lack safe drinking water", "India: 21 cities facing groundwater depletion by 2025", "Bangalore groundwater 300m below surface", "70% of India's water is polluted"],
      causes: ["Over-extraction: agriculture uses 80% of India's water", "Groundwater depletion: free electricity → unchecked borewells", "River pollution: industrial discharge, sewage, religious offerings", "Climate change: erratic monsoons, longer droughts"],
      impact: ["Water wars: conflicts increasing between states, countries", "Agriculture collapse risk in Punjab, Haryana within decades", "Health: 200,000+ deaths from water-borne diseases in India annually", "Ecosystems: rivers like Ganga, Yamuna severely degraded"],
      solutions: [
        { type: "Tech", text: "Rainwater Harvesting (RWH) — Chennai मेंा mandatory, groundwater level recovered in 5 years" },
        { type: "Innovation", text: "Fog collectors — Chile में communities harvest water from fog (99L/day per collector)" },
        { type: "Community", text: "Johad revival — Rajasthan: Rajendra Singh (Waterman of India) revived 9 rivers using traditional johad technique", url: "https://www.tarun-bharat-sangh.org" },
        { type: "Policy", text: "Water pricing reform — currently too cheap → wastage. Israel model: tiered pricing saves 30% water" },
        { type: "Behavior", text: "Dual-Use Water Stations for humans and animals — ₹500 per station design" },
      ],
      research: [
        { name: "WRI Aqueduct Water Risk Atlas", url: "https://www.wri.org/aqueduct" },
        { name: "CGWB India Groundwater Report", url: "https://cgwb.gov.in/National-Aquifer-Mapping.html" },
      ],
      action: ["Install RWH system at home (₹5,000-₹50,000)", "Fix leaking taps — 1 drip/second = 1,000 litres wasted/year", "Reuse washing machine water for toilets", "Report river pollution using this platform"],
      casestudy: "Israel — world's driest country, self-sufficient in water. 90% wastewater recycled. Drip irrigation invented here. Desalination covers 80% needs. 0 groundwater crisis.",
    }
  },
  {
    id: "animals",
    emoji: "🐾",
    problem: "Wildlife & Animal Welfare",
    color: "from-amber-900/40 to-orange-900/20",
    border: "border-amber-800/40",
    headColor: "text-amber-300",
    data: {
      evidence: ["1 million species threatened with extinction", "68% wildlife population loss since 1970", "India: 30+ million stray dogs, millions of street animals", "Road kills: 50,000+ wildlife accidents yearly in India"],
      causes: ["Habitat loss: deforestation, urbanization, agriculture", "Poaching: illegal wildlife trade is $23B/year global industry", "Human-animal conflict: as habitats shrink, conflict increases", "Climate change: species cannot adapt fast enough"],
      impact: ["Ecosystem services collapse — pollination, seed dispersal, pest control", "Food security threat: bees 40% down, crop yields affected", "Cultural loss: tigers, elephants are part of India's identity", "Cascade effect: loss of predators → prey overpopulation → vegetation collapse"],
      solutions: [
        { type: "Tech", text: "AI camera traps — detect poachers before they reach animals, alert rangers", url: "https://www.wildme.org" },
        { type: "Community", text: "Dual-Use Water Stations — ₹500/station, designed for both humans and animals" },
        { type: "Policy", text: "Wildlife Corridors — connecting fragmented forest patches so animals can move" },
        { type: "Innovation", text: "GPS tracking collars + community apps — track animal movements, warn farmers" },
        { type: "Behavior", text: "Report injured animals immediately — maintain local rescue center numbers" },
      ],
      research: [
        { name: "IUCN Red List Data", url: "https://www.iucnredlist.org" },
        { name: "WWF Living Planet Report", url: "https://www.worldwildlife.org/pages/living-planet-report-2022" },
      ],
      action: ["Set up water bowl outside home in summer", "Report animal emergencies on this platform", "Support local animal shelters", "Never buy products made from wild animals"],
      casestudy: "Namibia Community Conservancies — communities protecting wildlife get tourism revenue. Poaching fell 80%, wildlife doubled. Economic incentive = conservation.",
    }
  },
  {
    id: "climate",
    emoji: "🌡️",
    problem: "Climate Change",
    color: "from-red-900/40 to-rose-900/20",
    border: "border-red-800/40",
    headColor: "text-red-300",
    data: {
      evidence: ["2023 hottest year in recorded history", "Arctic warming 4x faster than global average", "Himalayan glaciers retreating — India's water towers at risk", "Extreme weather events 5x more frequent since 1970"],
      causes: ["Fossil fuels: 75% of global greenhouse gas emissions", "Deforestation: 11% of emissions from land use change", "Agriculture: 10% from livestock, rice, fertilizers", "Industrial processes: cement, steel, chemicals"],
      impact: ["250 million climate refugees projected by 2050", "Agricultural zones shifting — traditional farming calendars disrupted", "India: GDP loss 2.8% per year by 2050 due to climate impacts", "Health: heat stress, new disease ranges, food insecurity"],
      solutions: [
        { type: "Tech", text: "Solar + Wind: costs fell 90% in 10 years — now cheapest electricity source worldwide", url: "https://www.irena.org/costs" },
        { type: "Policy", text: "Carbon Tax — Sweden: ₹10,000/tonne CO₂, emissions fell 27% while economy grew" },
        { type: "Community", text: "Urban forests — 1,000 cities program: Miyawaki forests in every city, meaningful carbon capture" },
        { type: "Innovation", text: "Direct Air Capture (DAC) — Climeworks: 4,000 tonnes CO₂/year removed directly from air" },
        { type: "Behavior", text: "Biggest personal impact: fly less, eat less beef, drive less, have fewer children" },
      ],
      research: [
        { name: "IPCC Sixth Assessment Report", url: "https://www.ipcc.ch/assessment-report/ar6" },
        { name: "Project Drawdown Solutions", url: "https://drawdown.org/solutions" },
      ],
      action: ["Calculate your carbon footprint (UN Carbon Footprint Calculator)", "Switch to renewable energy provider", "Plant 10 trees this year", "Vote for climate-aware leaders"],
      casestudy: "Denmark — 50% electricity from wind in 2023. Carbon emissions down 70% since 1990. Economy grew. 50,000+ green jobs created. 2050 target: carbon neutral. Roadmap clear.",
    }
  },
];

function SolutionCard({ sol }: { sol: typeof SOLUTIONS[0] }) {
  const [open, setOpen] = useState(false);
  const d = sol.data;

  return (
    <motion.div variants={iv} className={`bg-gradient-to-br ${sol.color} border ${sol.border} rounded-2xl overflow-hidden`}>
      {/* Summary Header */}
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{sol.emoji}</span>
          <div>
            <h2 className={`text-xl font-bold ${sol.headColor}`}>{sol.problem}</h2>
            <p className="text-white/40 text-sm">Problem → Evidence → Cause → Impact → Solutions → Action</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
          {/* 4-column mini stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {d.evidence.map((e, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white/60 leading-relaxed">{e}</div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Causes */}
            <div>
              <div className="text-xs font-bold text-red-400/80 uppercase tracking-wider mb-2">Root Causes</div>
              <ul className="space-y-1.5">
                {d.causes.map((c, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/55"><span className="text-red-500 shrink-0 mt-0.5">▸</span>{c}</li>
                ))}
              </ul>
            </div>
            {/* Impact */}
            <div>
              <div className="text-xs font-bold text-orange-400/80 uppercase tracking-wider mb-2">Impact</div>
              <ul className="space-y-1.5">
                {d.impact.map((c, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/55"><span className="text-orange-500 shrink-0 mt-0.5">▸</span>{c}</li>
                ))}
              </ul>
            </div>
            {/* Actions */}
            <div>
              <div className="text-xs font-bold text-emerald-400/80 uppercase tracking-wider mb-2">What You Can Do</div>
              <ul className="space-y-1.5">
                {d.action.map((c, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/55"><span className="text-emerald-500 shrink-0 mt-0.5">✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="text-xs font-bold text-white/35 uppercase tracking-wider mb-2">Solutions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {d.solutions.map((s, i) => (
                <div key={i} className="flex gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-700/30 px-1.5 py-0.5 rounded h-fit shrink-0">{s.type}</span>
                  <span className="text-xs text-white/60 leading-relaxed">{s.text}</span>
                  {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0"><ExternalLink className="w-3 h-3 text-white/25 hover:text-white/60 transition-colors" /></a>}
                </div>
              ))}
            </div>
          </div>

          {/* Case Study */}
          <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-xl p-4">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">✓ Success Story</div>
            <p className="text-sm text-white/65 leading-relaxed">{d.casestudy}</p>
          </div>

          {/* Research */}
          {d.research.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              <div className="text-xs font-bold text-white/25 uppercase tracking-wider w-full">Research Sources</div>
              {d.research.map(r => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/65 transition-colors group">
                  <ExternalLink className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
                  {r.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function SolutionBank() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(132,204,22,0.08)_0%,transparent_55%)] py-14">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>
          <div className="w-20 h-20 rounded-3xl bg-lime-900/60 border border-lime-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(132,204,22,0.12)]">
            <span className="text-4xl">🌱</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-emerald-300">Solution Bank</span>
          </h1>
          <p className="text-lime-400/80 text-lg font-medium mb-4">हर समस्या → सबूत → कारण → असर → समाधान → Action</p>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-8">
            6 major environmental problems — each with verified data, root causes, proven solutions, 
            success stories, and what YOU can do today. Click any problem to expand.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[{ n: "6", l: "Problems" }, { n: "30+", l: "Solutions" }, { n: "6", l: "Case Studies" }].map(s => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-lime-400">{s.n}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-8 space-y-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          {SOLUTIONS.map(sol => <SolutionCard key={sol.id} sol={sol} />)}
        </motion.div>
      </div>
    </div>
  );
}
