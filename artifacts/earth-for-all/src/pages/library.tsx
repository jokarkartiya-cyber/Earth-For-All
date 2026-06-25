import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, BookOpen, Search, Download } from "lucide-react";
import { Link } from "wouter";

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

const LIBRARY_SECTIONS = [
  {
    id: "digital",
    emoji: "🌐",
    title: "Digital Libraries — करोड़ों Free Books",
    color: "from-indigo-900/40 to-blue-900/20",
    border: "border-indigo-800/40",
    badge: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50",
    resources: [
      { name: "Internet Archive", url: "https://archive.org/details/texts", desc: "35M+ books, magazines, videos, audio — सब free. History, science, environment, Hindi books.", extra: "35M+ items" },
      { name: "Project Gutenberg", url: "https://www.gutenberg.org", desc: "70,000+ free public domain books. Classic literature, science, history. Download EPUB/PDF.", extra: "70K+ books" },
      { name: "Open Library", url: "https://openlibrary.org", desc: "Millions of book records. Borrow books digitally — 1 copy per book, 14 days free.", extra: "Borrow free" },
      { name: "UPLOpen (University Press)", url: "https://www.doabooks.org", desc: "11,000+ peer-reviewed open access academic books from top universities worldwide.", extra: "11K+ academic" },
      { name: "Z-Library", url: "https://z-lib.org", desc: "Large collection of books and research papers. Find almost any book.", extra: "100M+ files" },
      { name: "ManyBooks", url: "https://manybooks.net", desc: "50,000+ free ebooks across all genres including science and environment.", extra: "50K+ books" },
    ]
  },
  {
    id: "environment",
    emoji: "🌱",
    title: "Environment, Ecology & Earth Books",
    color: "from-green-900/40 to-emerald-900/20",
    border: "border-green-800/40",
    badge: "bg-green-900/60 text-green-300 border-green-700/50",
    resources: [
      { name: "Environment & Society Multimedia Library", url: "https://www.environmentandsociety.org/tools", desc: "Environment history, books, images, research collections — visual and text archives.", extra: "Multimedia" },
      { name: "LibreTexts Environment Books", url: "https://chem.libretexts.org/Courses/Environmental_Science", desc: "Free textbooks: Ecology, Green Chemistry, Energy Conservation, Environmental Science.", extra: "Free textbooks" },
      { name: "Open Textbook Library (Environment)", url: "https://open.umn.edu/opentextbooks/subjects/environment", desc: "Peer-reviewed, openly licensed environmental science textbooks.", extra: "Peer-reviewed" },
      { name: "UNEP Publication Library", url: "https://wedocs.unep.org", desc: "All UN Environment Programme reports, assessments, and publications — free to download.", extra: "Official UN" },
      { name: "FAO Open Access Books", url: "https://www.fao.org/publications/en", desc: "Food, agriculture, forest, fisheries, and climate publications from UN FAO.", extra: "FAO official" },
      { name: "World Bank Open Knowledge Repository", url: "https://openknowledge.worldbank.org", desc: "Development, environment, climate, poverty research from World Bank.", extra: "15K+ reports" },
    ]
  },
  {
    id: "india",
    emoji: "🇮🇳",
    title: "India Environment & Climate Books",
    color: "from-orange-900/40 to-amber-900/20",
    border: "border-orange-800/40",
    badge: "bg-orange-900/60 text-orange-300 border-orange-700/50",
    resources: [
      { name: "MoES Climate Assessment Report (India)", url: "https://link.springer.com/book/10.1007/978-981-15-4327-2", desc: "Assessment of Climate Change over the Indian Region — Official government science report, free PDF/EPUB.", extra: "Official report" },
      { name: "India Environment Portal", url: "https://www.indiaenvironmentportal.org.in", desc: "India's largest environment resource platform — reports, laws, news, data.", extra: "India focused" },
      { name: "MoEFCC Publications", url: "https://moef.gov.in/en/publications/", desc: "Ministry of Environment, Forest & Climate Change — all official publications free.", extra: "Government" },
      { name: "IARI Publications (Agriculture)", url: "https://www.iari.res.in/publications.html", desc: "Indian Agricultural Research Institute — Crop science, soil, climate impact on agriculture.", extra: "Research" },
      { name: "Central Pollution Control Board", url: "https://cpcb.nic.in/publication.php", desc: "CPCB reports — air quality, water pollution, solid waste in India.", extra: "India Data" },
      { name: "National Mission for Green India", url: "https://nmis.nic.in", desc: "Forest restoration mission reports, project data, India forest policy.", extra: "Forest India" },
    ]
  },
  {
    id: "biodiversity",
    emoji: "🧬",
    title: "Biodiversity, Plants & Animals",
    color: "from-amber-900/40 to-yellow-900/20",
    border: "border-amber-800/40",
    badge: "bg-amber-900/60 text-amber-300 border-amber-700/50",
    resources: [
      { name: "Biodiversity Heritage Library", url: "https://www.biodiversitylibrary.org", desc: "Historical books on nature, plants, animals from 1400s onwards. 5M+ pages scanned.", extra: "5M+ pages" },
      { name: "GBIF Data Portal", url: "https://www.gbif.org/occurrence/search", desc: "2.4 billion occurrence records for animals and plants worldwide — download free.", extra: "2.4B records" },
      { name: "IUCN Red List", url: "https://www.iucnredlist.org", desc: "Full database of threatened species — assessments, populations, ranges, threats.", extra: "147K species" },
      { name: "eBird Data (Cornell)", url: "https://ebird.org/data/download", desc: "700M+ bird observations from citizen scientists — free research dataset.", extra: "700M+ obs" },
      { name: "iNaturalist Data Export", url: "https://www.inaturalist.org/observations/export", desc: "Community biodiversity observations — 150M+ records exportable for research.", extra: "150M+ records" },
      { name: "Encyclopedia of Life", url: "https://eol.org", desc: "Comprehensive data for every species on Earth — scientific + community knowledge.", extra: "All species" },
    ]
  },
  {
    id: "research",
    emoji: "🧪",
    title: "Research Papers & Scientific Knowledge",
    color: "from-violet-900/40 to-purple-900/20",
    border: "border-violet-800/40",
    badge: "bg-violet-900/60 text-violet-300 border-violet-700/50",
    resources: [
      { name: "Google Scholar", url: "https://scholar.google.com", desc: "Largest academic search engine — find any research paper. Filter by year, citations.", extra: "200M+ papers" },
      { name: "PubMed (Medical + Environmental)", url: "https://pubmed.ncbi.nlm.nih.gov", desc: "34M+ biomedical literature records. Search health + environment + pollution links.", extra: "34M+ articles" },
      { name: "arXiv Scientific Preprints", url: "https://arxiv.org", desc: "Free scientific papers in physics, biology, climate, AI — before journal publication.", extra: "2.2M+ papers" },
      { name: "CORE Open Research Papers", url: "https://core.ac.uk", desc: "200M+ open access research outputs from universities worldwide.", extra: "200M+ papers" },
      { name: "Directory of Open Access Journals", url: "https://doaj.org", desc: "8,000+ peer-reviewed, open access journals — no paywall, no subscription.", extra: "8K+ journals" },
      { name: "Semantic Scholar AI Search", url: "https://www.semanticscholar.org", desc: "AI-powered research paper discovery — find connected papers on any topic.", extra: "AI powered" },
      { name: "Unpaywall", url: "https://unpaywall.org", desc: "Browser extension — finds free legal PDF versions of paywalled papers.", extra: "Browser ext" },
    ]
  },
  {
    id: "museums",
    emoji: "🏛️",
    title: "Museums, History & Human Civilization",
    color: "from-rose-900/40 to-pink-900/20",
    border: "border-rose-800/40",
    badge: "bg-rose-900/60 text-rose-300 border-rose-700/50",
    resources: [
      { name: "Google Arts & Culture", url: "https://artsandculture.google.com", desc: "Virtual museum tours, historical photos, art, cultures from 2,000+ institutions.", extra: "2000+ museums" },
      { name: "UNESCO World Heritage", url: "https://whc.unesco.org", desc: "World's cultural and natural heritage — 1,150+ sites, detailed documentation.", extra: "1150+ sites" },
      { name: "Smithsonian Open Access", url: "https://www.si.edu/openaccess", desc: "4.7 million images and media files from Smithsonian collections — free download.", extra: "4.7M images" },
      { name: "British Library Digital", url: "https://www.bl.uk/collection-items", desc: "Digitized manuscripts, maps, photographs — Indian history well represented.", extra: "Manuscripts" },
      { name: "Europeana", url: "https://www.europeana.eu", desc: "50M+ cultural heritage items from European museums and libraries.", extra: "50M+ items" },
      { name: "Digital Public Library of America", url: "https://dp.la", desc: "50M+ items from US libraries, archives, museums — history, photos, documents.", extra: "50M+ items" },
    ]
  },
  {
    id: "data",
    emoji: "🌍",
    title: "Earth Data & Statistics",
    color: "from-cyan-900/40 to-teal-900/20",
    border: "border-cyan-800/40",
    badge: "bg-cyan-900/60 text-cyan-300 border-cyan-700/50",
    resources: [
      { name: "Our World in Data", url: "https://ourworldindata.org", desc: "Data-driven research on the world's biggest problems — charts, datasets, articles all free.", extra: "Interactive data" },
      { name: "World Bank Open Data", url: "https://data.worldbank.org", desc: "Free access to global development data — 200+ countries, 1,000+ indicators.", extra: "1000+ indicators" },
      { name: "United Nations Data", url: "https://data.un.org", desc: "UN statistical databases across all sustainable development topics.", extra: "UN official" },
      { name: "Gapminder", url: "https://www.gapminder.org/data", desc: "Free datasets for 800 global indicators — interactive visualization tools included.", extra: "800 indicators" },
      { name: "India Data.gov.in", url: "https://data.gov.in", desc: "India's official open government data platform — 10,000+ datasets.", extra: "10K+ datasets" },
      { name: "NOAA Climate Data Online", url: "https://www.ncei.noaa.gov/cdo-web", desc: "Historical climate records for every weather station worldwide — free download.", extra: "Raw climate data" },
    ]
  },
  {
    id: "philosophy",
    emoji: "🧠",
    title: "Philosophy, Humanity & Earth Ethics",
    color: "from-slate-900/40 to-gray-900/20",
    border: "border-slate-700/40",
    badge: "bg-slate-900/60 text-slate-300 border-slate-600/50",
    resources: [
      { name: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/ethics-environmental", desc: "Environmental Ethics — comprehensive free article. Nature rights, animal rights, intergenerational justice.", extra: "Academic free" },
      { name: "UNESCO Knowledge Resources", url: "https://en.unesco.org/themes/education-sustainable-development/resources", desc: "Education for Sustainable Development — indigenous knowledge, cultural diversity, philosophy.", extra: "UNESCO" },
      { name: "Internet Archive Philosophy", url: "https://archive.org/details/philosophy", desc: "Classic philosophy books — from Aristotle to Gandhi on nature, humanity, ethics.", extra: "Classics free" },
      { name: "Arvind Gupta Toys — Hindi Science", url: "https://www.arvindguptatoys.com/books.html", desc: "1000+ free science books in Hindi, Marathi, Gujarati — India's education hero.", extra: "Hindi books" },
      { name: "IGNCA Digital Heritage (India)", url: "https://ignca.gov.in/online-digital-library", desc: "Indira Gandhi National Centre for Arts — Indian cultural knowledge, ancient texts, manuscripts.", extra: "Ancient texts" },
      { name: "Academic Earth", url: "https://academicearth.org", desc: "Free online courses from top universities — ethics, philosophy, environment, society.", extra: "Free courses" },
    ]
  },
  {
    id: "future",
    emoji: "🚀",
    title: "🌌 Earth For All — Future Mega Sections",
    color: "from-indigo-900/40 to-violet-900/20",
    border: "border-indigo-700/40",
    badge: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50",
    comingSoon: true,
    resources: [
      { name: "Universal Knowledge Vault", url: "#", desc: "📖 1 crore+ books index — every book ever written, organized by topic", extra: "Planned" },
      { name: "Scientific Data Archive", url: "#", desc: "🧬 100 crore+ scientific data points — from every research field", extra: "Planned" },
      { name: "Species Knowledge Pages", url: "#", desc: "🌳 Individual pages for every tree and species — lifecycle, distribution, conservation", extra: "Planned" },
      { name: "River & Ocean History", url: "#", desc: "🌊 Every river, ocean, and mountain — history, changes, current status", extra: "Planned" },
      { name: "Civilization Archive", url: "#", desc: "🏛️ Every human civilization's story — from Indus Valley to modern day", extra: "Planned" },
      { name: "Invention History", url: "#", desc: "🧠 Every major human invention archive — from fire to quantum computing", extra: "Planned" },
      { name: "Satellite Time Machine", url: "#", desc: "📸 Historical photos + satellite imagery — see how any place changed over decades", extra: "Planned" },
      { name: "Digital Knowledge Map", url: "#", desc: "🌐 Every country and region — interactive digital knowledge map", extra: "Planned" },
    ]
  },
];

function ResourceItem({ res, badge, comingSoon }: { res: { name: string; url: string; desc: string; extra: string }; badge: string; comingSoon?: boolean }) {
  return comingSoon ? (
    <div className="flex items-start gap-3 bg-white/[0.015] border border-white/5 rounded-xl px-4 py-3 opacity-60">
      <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 mt-0.5 ${badge}`}>{res.extra}</div>
      <div className="flex-1">
        <div className="text-white/50 font-semibold text-sm">{res.name}</div>
        <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{res.desc}</p>
      </div>
    </div>
  ) : (
    <a href={res.url} target="_blank" rel="noopener noreferrer"
      className="group flex items-start gap-3 bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 transition-all">
      <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 mt-0.5 ${badge}`}>{res.extra}</div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-white/105 font-semibold text-sm group-hover:text-white transition-colors">{res.name}</span>
          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100" />
        </div>
        <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{res.desc}</p>
      </div>
    </a>
  );
}

const totalResources = LIBRARY_SECTIONS.reduce((s, sec) => s + sec.resources.length, 0);

export default function Library() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10)_0%,transparent_55%)] py-14">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>
          <div className="w-20 h-20 rounded-3xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            <BookOpen className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-300">Earth Library</span>
          </h1>
          <p className="text-indigo-400/80 text-lg font-medium mb-4">📚 करोड़ों किताबें, शोध पत्र, और ज्ञान — बिल्कुल मुफ्त</p>
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            Digital libraries से ancient manuscripts तक — सब free, सब open, 
            सब आपके लिए। Environment books, research papers, India-specific resources, 
            और future vision — सब एक जगह।
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[{ n: LIBRARY_SECTIONS.length, l: "Categories" }, { n: totalResources, l: "Resources" }, { n: "∞", l: "Books Access" }].map(s => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-indigo-400">{s.n}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Jump */}
      <div className="container mx-auto px-4 max-w-4xl py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {LIBRARY_SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/45 hover:text-white hover:border-white/30 transition-all">
              {s.emoji} {s.title.split(" ").slice(0, 3).join(" ")}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="container mx-auto px-4 max-w-4xl space-y-8 pb-4">
        {LIBRARY_SECTIONS.map(sec => (
          <motion.section key={sec.id} id={sec.id}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={cv}>
            <motion.div variants={iv} className={`bg-gradient-to-br ${sec.color} border ${sec.border} rounded-2xl overflow-hidden`}>
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-white text-lg">{sec.title}</h2>
                  <p className="text-white/35 text-xs">{sec.resources.length} resources</p>
                </div>
                {sec.comingSoon && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full border bg-indigo-900/50 text-indigo-300 border-indigo-700/50">Coming Soon</span>
                )}
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                {sec.resources.map(res => (
                  <ResourceItem key={res.name} res={res} badge={sec.badge} comingSoon={sec.comingSoon} />
                ))}
              </div>
            </motion.div>
          </motion.section>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-4 max-w-2xl text-center py-12">
        <div className="bg-gradient-to-br from-indigo-900/30 to-violet-900/20 border border-indigo-800/40 rounded-3xl p-10">
          <Search className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-3">कोई Resource missing है?</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            कोई महत्वपूर्ण book, journal, या database है जो यहाँ add होना चाहिए? 
            Ideas board पर suggest करें।
          </p>
          <Link href="/ideas">
            <span className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold transition-all text-sm cursor-pointer">
              Resource Suggest करें →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
