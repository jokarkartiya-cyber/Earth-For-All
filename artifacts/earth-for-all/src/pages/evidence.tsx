import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Thermometer, TreePine, Bird, Waves, Recycle, Heart, BookOpen, Scale, Cpu, Satellite, Lightbulb, Globe2 } from "lucide-react";
import { Link } from "wouter";

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

const EVIDENCE_SECTIONS = [
  {
    id: "climate",
    icon: Thermometer,
    emoji: "🌡️",
    title: "Climate Change Data",
    subtitle: "तापमान बदलाव के सबूत",
    color: "from-red-900/50 to-orange-900/30",
    border: "border-red-800/50",
    badge: "bg-red-900/60 text-red-300 border-red-700/50",
    stats: [
      { n: "+1.2°C", l: "Global Temp Rise since 1850" },
      { n: "420 ppm", l: "CO₂ Concentration (2024)" },
      { n: "3.3mm/yr", l: "Sea Level Rise Rate" },
      { n: "13%/decade", l: "Arctic Sea Ice Loss" },
    ],
    points: [
      "Last 10 years (2014–2023) — recorded hottest decade in history",
      "Himalayan glaciers melting 10x faster than historical average",
      "India में extreme heat days 1.5 weeks बढ़ गए हैं per year",
      "2023 — hottest year ever recorded on Earth",
      "Atlantic Ocean circulation slowing — can trigger cold snap in Europe",
    ],
    sources: [
      { name: "NASA Climate Change Evidence", url: "https://climate.nasa.gov/evidence" },
      { name: "IPCC Sixth Assessment Report", url: "https://www.ipcc.ch/report/ar6/wg1" },
      { name: "NOAA Global Climate Data", url: "https://www.ncei.noaa.gov/access/monitoring/global-temperature-anomalies" },
      { name: "Copernicus Climate Change Service", url: "https://climate.copernicus.eu" },
    ],
  },
  {
    id: "forest",
    icon: TreePine,
    emoji: "🌳",
    title: "Forest Loss & Nature Evidence",
    subtitle: "जंगलों के बदलाव के सबूत",
    color: "from-green-900/50 to-emerald-900/30",
    border: "border-green-800/50",
    badge: "bg-green-900/60 text-green-300 border-green-700/50",
    stats: [
      { n: "15B", l: "Trees cut every year globally" },
      { n: "10M ha", l: "Tropical forest lost annually" },
      { n: "46%", l: "Forests lost since humans appeared" },
      { n: "1 football field/sec", l: "Amazon deforestation rate" },
    ],
    points: [
      "Amazon rainforest जल्द ही 'dieback threshold' पार कर सकता है",
      "Congo Basin में logging और farming से 0.5M ha/year loss",
      "Indonesia में palm oil के लिए पीट swamps drain हो रहे हैं",
      "India में net forest gain हो रहा है — but quality forests reducing",
      "Reforestation के बाद भी biodiversity original forest जितनी नहीं",
    ],
    sources: [
      { name: "Global Forest Watch Live Data", url: "https://www.globalforestwatch.org" },
      { name: "FAO Forest Resources Assessment", url: "https://www.fao.org/forest-resources-assessment" },
      { name: "Hansen/UMD Forest Cover Data", url: "https://earthenginepartners.appspot.com/science-2013-global-forest" },
    ],
  },
  {
    id: "animals",
    icon: Bird,
    emoji: "🐘",
    title: "Animal Extinction Evidence",
    subtitle: "प्रजातियों के विलुप्त होने के सबूत",
    color: "from-amber-900/50 to-yellow-900/30",
    border: "border-amber-800/50",
    badge: "bg-amber-900/60 text-amber-300 border-amber-700/50",
    stats: [
      { n: "1M+", l: "Species threatened with extinction" },
      { n: "68%", l: "Wildlife population decline since 1970" },
      { n: "1000x", l: "Current extinction rate vs natural" },
      { n: "41%", l: "Amphibian species threatened" },
    ],
    points: [
      "6th Mass Extinction underway — driven entirely by human activity",
      "Insect populations 75% down in Germany in 27 years (monitoring stations)",
      "Shark और Ray species में 71% decline since 1970",
      "Freshwater species particularly vulnerable — 83% population loss",
      "India में vulture 99.9% खत्म — diclofenac से ecosystem collapse",
    ],
    sources: [
      { name: "IUCN Red List of Threatened Species", url: "https://www.iucnredlist.org" },
      { name: "GBIF Global Biodiversity Data", url: "https://www.gbif.org" },
      { name: "WWF Living Planet Report", url: "https://www.worldwildlife.org/pages/living-planet-report-2022" },
      { name: "Convention on Biological Diversity", url: "https://www.cbd.int/gbo/gbo5/publication" },
    ],
  },
  {
    id: "ocean",
    icon: Waves,
    emoji: "🌊",
    title: "Ocean & Water Evidence",
    subtitle: "समुद्र और पानी के संकट के सबूत",
    color: "from-blue-900/50 to-indigo-900/30",
    border: "border-blue-800/50",
    badge: "bg-blue-900/60 text-blue-300 border-blue-700/50",
    stats: [
      { n: "30%", l: "Ocean absorbed extra CO₂" },
      { n: "50%", l: "Coral reefs lost since 1950" },
      { n: "8M tons", l: "Plastic enters ocean every year" },
      { n: "+0.9°C", l: "Ocean temp rise since 1900" },
    ],
    points: [
      "Great Barrier Reef ने 2016–2022 में 5 mass bleaching events देखे",
      "Ocean acidification — pH 8.2 से 8.1 — 26% more acidic",
      "Dead zones 700+ — oxygen नहीं, जीव नहीं जी सकते",
      "Microplastics अब Mariana Trench (11km deep) में भी मिले",
      "Arctic Ocean 2040 तक summer में completely ice-free हो सकता है",
    ],
    sources: [
      { name: "NOAA Ocean Service Data", url: "https://oceanservice.noaa.gov/hazards/coral" },
      { name: "UNESCO Ocean Science Reports", url: "https://oceandecade.org/resources" },
      { name: "Ocean Health Index", url: "https://oceanhealthindex.org" },
    ],
  },
  {
    id: "plastic",
    icon: Recycle,
    emoji: "♻️",
    title: "Plastic & Waste Reality",
    subtitle: "प्लास्टिक प्रदूषण के असली आंकड़े",
    color: "from-teal-900/50 to-cyan-900/30",
    border: "border-teal-800/50",
    badge: "bg-teal-900/60 text-teal-300 border-teal-700/50",
    stats: [
      { n: "430M tons", l: "Plastic produced in 2023" },
      { n: "9%", l: "Plastic actually recycled globally" },
      { n: "1950–2050", l: "8.3B tons total plastic ever made" },
      { n: "500 years", l: "Plastic bag lifetime" },
    ],
    points: [
      "91% plastic ever made has NOT been recycled — it's somewhere on Earth",
      "Plastic burning releases dioxins — India में 40% waste is burned",
      "Microplastics in human blood, lungs, placenta — confirmed 2022",
      "Recycling rates: Germany 66%, US 9%, India ~30% (informal sector)",
      "Ellen MacArthur Foundation: if no action, more plastic than fish by 2050",
    ],
    sources: [
      { name: "UNEP Global Plastics Outlook", url: "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution" },
      { name: "OECD Global Plastics Outlook", url: "https://www.oecd.org/environment/plastics" },
      { name: "Plastic Pollution Coalition", url: "https://www.plasticpollutioncoalition.org/science" },
    ],
  },
  {
    id: "health",
    icon: Heart,
    emoji: "🏥",
    title: "Human Health & Environment",
    subtitle: "पर्यावरण का मानव स्वास्थ्य पर असर",
    color: "from-rose-900/50 to-pink-900/30",
    border: "border-rose-800/50",
    badge: "bg-rose-900/60 text-rose-300 border-rose-700/50",
    stats: [
      { n: "7M", l: "Deaths from air pollution annually" },
      { n: "2M", l: "Deaths from unsafe water yearly" },
      { n: "1 in 4", l: "Deaths related to environment" },
      { n: "99%", l: "World population breathes unsafe air" },
    ],
    points: [
      "Delhi में AQI 300+ — every breath = smoking 40 cigarettes",
      "Lead poisoning affects 800M children — IQ permanently reduced",
      "Cancer rates highest in industrial zones near rivers",
      "Pesticide exposure → Parkinson's, birth defects, child development issues",
      "Climate change will cause 250,000 extra deaths/year by 2030 (WHO)",
    ],
    sources: [
      { name: "WHO Environment & Health Data", url: "https://www.who.int/data/gho/data/themes/environment" },
      { name: "The Lancet Planetary Health", url: "https://www.thelancet.com/journals/lanpla/home" },
      { name: "PubMed Environmental Health", url: "https://pubmed.ncbi.nlm.nih.gov/?term=environmental+health" },
      { name: "Health Effects Institute Reports", url: "https://www.healtheffects.org/resources/publications" },
    ],
  },
  {
    id: "knowledge",
    icon: BookOpen,
    emoji: "📚",
    title: "Human Knowledge Library",
    subtitle: "ज्ञान का महासागर — Free & Open",
    color: "from-violet-900/50 to-purple-900/30",
    border: "border-violet-800/50",
    badge: "bg-violet-900/60 text-violet-300 border-violet-700/50",
    stats: [
      { n: "35M+", l: "Books at Internet Archive" },
      { n: "70,000+", l: "Free books at Project Gutenberg" },
      { n: "100M+", l: "Research papers indexed" },
      { n: "8,000+", l: "Open Access Journals (DOAJ)" },
    ],
    points: [
      "1600s se environment books available on Biodiversity Heritage Library",
      "Ancient Indian texts on water conservation — Valmiki Ramayan में rivers का description",
      "Indigenous knowledge — traditional forest management systems",
      "Stanford Encyclopedia of Philosophy — environmental ethics fully free",
      "All NASA research papers freely available — just search",
    ],
    sources: [
      { name: "Internet Archive (30M+ Books)", url: "https://archive.org/details/texts" },
      { name: "Project Gutenberg", url: "https://www.gutenberg.org" },
      { name: "Biodiversity Heritage Library", url: "https://www.biodiversitylibrary.org" },
      { name: "CORE Open Research Papers", url: "https://core.ac.uk" },
    ],
    internalLink: "/library",
    internalLabel: "→ Full Library Page",
  },
  {
    id: "laws",
    icon: Scale,
    emoji: "🏛️",
    title: "Laws & Global Agreements",
    subtitle: "पर्यावरण कानून और अंतर्राष्ट्रीय संधियाँ",
    color: "from-slate-900/50 to-gray-900/30",
    border: "border-slate-700/50",
    badge: "bg-slate-900/60 text-slate-300 border-slate-600/50",
    stats: [
      { n: "1992", l: "Earth Summit — Rio de Janeiro" },
      { n: "2015", l: "Paris Agreement signed" },
      { n: "196", l: "Countries in Paris Agreement" },
      { n: "30x30", l: "Protect 30% land & ocean by 2030" },
    ],
    points: [
      "India Environment Protection Act 1986 — लेकिन enforcement weak",
      "CITES — 35,000 species को international trade से protect करती है",
      "Montreal Protocol ने ozone layer बचाया — most successful env treaty",
      "Kunming-Montreal Biodiversity Framework — 2022, 23 biodiversity targets",
      "UN Plastics Treaty 2024 — negotiations जारी, India एक key player",
    ],
    sources: [
      { name: "UN Treaty Collection", url: "https://treaties.un.org" },
      { name: "UNEP Environmental Law", url: "https://www.unep.org/resources/policy-and-strategy/environmental-law" },
      { name: "India Ministry of Environment Laws", url: "https://moef.gov.in/en/act-rules-and-regulations/acts/" },
      { name: "CITES Species Database", url: "https://cites.org/eng/disc/species.php" },
    ],
  },
  {
    id: "innovation",
    icon: Cpu,
    emoji: "🧪",
    title: "Earth Innovation Database",
    subtitle: "नई खोजें जो दुनिया बदल सकती हैं",
    color: "from-indigo-900/50 to-blue-900/30",
    border: "border-indigo-800/50",
    badge: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50",
    stats: [
      { n: "100,000+", l: "Clean tech patents filed in 2023" },
      { n: "$1.8T", l: "Clean energy investment globally 2023" },
      { n: "500+", l: "Carbon capture startups worldwide" },
      { n: "4.5B", l: "People reached by mobile solar by 2030" },
    ],
    points: [
      "Mycelium (mushroom) packaging — fully biodegradable in 30 days",
      "Solar paint — walls generate electricity, efficiency improving",
      "CRISPR gene editing being used to save endangered species",
      "Vertical farms — 95% less water, 100x more yield per land area",
      "Air-to-water machines — extract drinking water from humidity",
    ],
    sources: [
      { name: "WIPO Green Patent Database", url: "https://www.wipo.int/wipo-green/en" },
      { name: "Google Patents Clean Tech", url: "https://patents.google.com/?q=clean+technology" },
      { name: "IEA Innovation Tracker", url: "https://www.iea.org/data-and-statistics/data-tools/innovation-tracker" },
      { name: "Breakthrough Energy", url: "https://breakthroughenergy.org/our-work/innovation" },
    ],
  },
  {
    id: "live-earth",
    icon: Satellite,
    emoji: "🛰️",
    title: "Live Earth Command Center",
    subtitle: "Real-time पृथ्वी की निगरानी",
    color: "from-emerald-900/50 to-teal-900/30",
    border: "border-emerald-800/50",
    badge: "bg-emerald-900/60 text-emerald-300 border-emerald-700/50",
    stats: [
      { n: "Live", l: "NASA Fire Alerts (FIRMS)" },
      { n: "Real-time", l: "Global Air Quality (OpenAQ)" },
      { n: "Daily", l: "Satellite Forest Changes" },
      { n: "24/7", l: "Disaster Monitoring (GDACS)" },
    ],
    points: [
      "NASA FIRMS — wildfire detection within 3 hours of occurrence",
      "OpenAQ — 14,000+ sensors in 100+ countries, open data",
      "Copernicus — Free satellite images every 5 days for any location",
      "GDACS — Global Disaster Alerting Coordination System",
      "NOAA — Extreme weather alerts for every country",
    ],
    sources: [
      { name: "NASA Worldview Live Satellite", url: "https://worldview.earthdata.nasa.gov" },
      { name: "NASA FIRMS Fire Map", url: "https://firms.modaps.eosdis.nasa.gov/map" },
      { name: "OpenAQ Real-time Air Quality", url: "https://explore.openaq.org" },
      { name: "GDACS Disaster Alerts", url: "https://www.gdacs.org" },
    ],
    internalLink: "/live-earth",
    internalLabel: "→ Open Live Dashboard",
  },
  {
    id: "solutions",
    icon: Lightbulb,
    emoji: "🌱",
    title: "Solution Bank",
    subtitle: "हर समस्या का समाधान",
    color: "from-lime-900/50 to-green-900/30",
    border: "border-lime-800/50",
    badge: "bg-lime-900/60 text-lime-300 border-lime-700/50",
    stats: [
      { n: "100+", l: "Proven Solutions Documented" },
      { n: "6", l: "Problem Categories Covered" },
      { n: "Evidence", l: "Based Approaches Only" },
      { n: "India", l: "Context Solutions Included" },
    ],
    points: [
      "Problem → Evidence → Root Cause → Solutions → Community Action",
      "Each solution has scientific reference and real-world case study",
      "Technology solutions + Community solutions + Policy solutions",
      "Cost estimate and implementation guide included",
      "Success stories from countries that solved similar problems",
    ],
    sources: [],
    internalLink: "/solution-bank",
    internalLabel: "→ Open Solution Bank",
  },
  {
    id: "memory",
    icon: Globe2,
    emoji: "🌎",
    title: "One Earth Memory Project",
    subtitle: "बुजुर्गों की यादें — पृथ्वी की कहानी",
    color: "from-orange-900/50 to-amber-900/30",
    border: "border-orange-800/50",
    badge: "bg-orange-900/60 text-orange-300 border-orange-700/50",
    stats: [
      { n: "Oral", l: "History Archives" },
      { n: "Local", l: "Environmental Knowledge" },
      { n: "River", l: "Change Stories" },
      { n: "Forest", l: "Memory Preservation" },
    ],
    points: [
      "गाँवों में बुजुर्गों की पर्यावरण memories — oral history archive",
      "\"पहले यहाँ नदी थी\" — नदियों के सूखने की कहानियाँ",
      "Traditional water conservation — johads, stepwells, khadins",
      "Indigenous forest management — tribal communities की knowledge",
      "Children के लिए: दादा-नानी से सुनो पर्यावरण की कहानियाँ",
    ],
    sources: [
      { name: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org" },
      { name: "Digital Public Library of America", url: "https://dp.la" },
      { name: "Oral History Association", url: "https://www.oralhistory.org" },
    ],
    internalLink: "/memory-project",
    internalLabel: "→ Explore Memory Project",
  },
];

function SourceLink({ name, url }: { name: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors group">
      <ExternalLink className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
      {name}
    </a>
  );
}

export default function Evidence() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08)_0%,transparent_55%)] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>
          <div className="w-20 h-20 rounded-3xl bg-red-900/60 border border-red-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
            <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-300">Evidence Center</span>
          </h1>
          <p className="text-orange-400/80 text-lg font-medium mb-4">सबूतों के साथ सच्चाई — Data-Driven Environmental Truth</p>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-8">
            12 sections में दुनिया की सबसे बड़ी environmental problems के असली data, sources, 
            और evidence। हर claim के साथ reference। No opinions — only verified facts.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {[{ n: "12", l: "Topics" }, { n: "50+", l: "Data Points" }, { n: "40+", l: "Sources" }].map(s => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-red-400">{s.n}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-8 space-y-8">
        {EVIDENCE_SECTIONS.map((sec, si) => {
          const Icon = sec.icon;
          return (
            <motion.section key={sec.id}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={cv}>
              <motion.div variants={iv} className={`bg-gradient-to-br ${sec.color} border ${sec.border} rounded-2xl overflow-hidden`}>
                {/* Header */}
                <div className="px-6 py-5 border-b border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl">{sec.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-bold text-white">{sec.title}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sec.badge}`}>#{si + 1}</span>
                    </div>
                    <p className="text-white/45 text-sm mt-0.5">{sec.subtitle}</p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sec.stats.map(stat => (
                      <div key={stat.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold text-white">{stat.n}</div>
                        <div className="text-xs text-white/40 mt-0.5 leading-tight">{stat.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Evidence Points */}
                  <div>
                    <div className="text-xs font-bold text-white/35 uppercase tracking-wider mb-2">Key Evidence</div>
                    <ul className="space-y-1.5">
                      {sec.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-2 text-sm text-white/65 leading-relaxed">
                          <span className="text-emerald-500 mt-0.5 shrink-0">▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sources */}
                  {sec.sources.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-white/35 uppercase tracking-wider mb-2">Sources & Data</div>
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                        {sec.sources.map(src => <SourceLink key={src.url} name={src.name} url={src.url} />)}
                      </div>
                    </div>
                  )}

                  {/* Internal Link */}
                  {"internalLink" in sec && sec.internalLink && (
                    <Link href={sec.internalLink}>
                      <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-xl border cursor-pointer transition-all hover:scale-105 ${sec.badge} border-opacity-50`}>
                        {sec.internalLabel}
                      </span>
                    </Link>
                  )}
                </div>
              </motion.div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
