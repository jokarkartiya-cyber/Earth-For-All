import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft, Globe, Leaf, Recycle, FlaskConical, GraduationCap, BookOpen, Cpu, Database, Heart, Sprout, Users } from "lucide-react";
import { Link } from "wouter";

const RESOURCE_CATEGORIES = [
  {
    id: "earth-map",
    icon: Globe,
    title: "🌐 Global Earth Map & Satellite Data",
    color: "from-emerald-900/40 to-teal-900/20",
    border: "border-emerald-800/40",
    badge: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
    links: [
      { name: "Google Earth", url: "https://earth.google.com", desc: "पृथ्वी के 3D Maps और Satellite Images — any location explore करें" },
      { name: "NASA Earth Observatory", url: "https://earthobservatory.nasa.gov", desc: "पृथ्वी में होने वाले बदलावों की Images और Reports" },
      { name: "NASA Earth Data", url: "https://earthdata.nasa.gov", desc: "Satellite Data और Climate Information — Free Download" },
      { name: "Copernicus Earth Observation", url: "https://www.copernicus.eu", desc: "Europe का Satellite Earth Monitoring System" },
      { name: "Global Forest Watch", url: "https://www.globalforestwatch.org", desc: "Forest Loss और Tree Cover Real-time Data" },
      { name: "Our World in Data — Environment", url: "https://ourworldindata.org/environment", desc: "Global Environment Statistics — Interactive Charts" },
      { name: "United Nations Environment (UNEP)", url: "https://www.unep.org", desc: "UN's global environmental authority" },
      { name: "UN Sustainable Development Goals", url: "https://sdgs.un.org", desc: "2030 तक पूरे करने वाले 17 Global Goals" },
      { name: "World Wildlife Fund (WWF)", url: "https://www.worldwildlife.org", desc: "Wildlife Conservation — Global Leader" },
      { name: "World Resources Institute (WRI)", url: "https://www.wri.org", desc: "Data-driven solutions for environment and people" },
      { name: "Global Footprint Network", url: "https://www.footprintnetwork.org", desc: "Earth Overshoot Day और ecological footprint data" },
    ]
  },
  {
    id: "animals",
    icon: Leaf,
    title: "🐾 Animal Protection & Biodiversity",
    color: "from-amber-900/40 to-orange-900/20",
    border: "border-amber-800/40",
    badge: "bg-amber-900/50 text-amber-300 border-amber-700/50",
    links: [
      { name: "IUCN Red List", url: "https://www.iucnredlist.org", desc: "खतरे में मौजूद जीवों की जानकारी — Official Database" },
      { name: "World Wildlife Fund (WWF)", url: "https://www.worldwildlife.org/species", desc: "Wildlife Conservation — Species Profiles" },
      { name: "National Geographic Animals", url: "https://www.nationalgeographic.com/animals", desc: "Animals Knowledge — Photos, Videos, Facts" },
      { name: "eBird by Cornell Lab", url: "https://ebird.org", desc: "Birds Data और Bird Tracking — Citizen Science" },
      { name: "Animal Diversity Web", url: "https://animaldiversity.org", desc: "World's largest online animal database — Free" },
      { name: "Convention on Biological Diversity", url: "https://www.cbd.int", desc: "Global treaty for biodiversity protection" },
      { name: "Wildlife Conservation Society", url: "https://www.wcs.org", desc: "Protecting wildlife and wild places worldwide" },
      { name: "IUCN — International Conservation", url: "https://www.iucn.org", desc: "Nature's data — conservation status worldwide" },
    ]
  },
  {
    id: "plastic",
    icon: Recycle,
    title: "♻️ Plastic, Recycling & Waste Innovation",
    color: "from-teal-900/40 to-cyan-900/20",
    border: "border-teal-800/40",
    badge: "bg-teal-900/50 text-teal-300 border-teal-700/50",
    links: [
      { name: "Precious Plastic Community", url: "https://preciousplastic.com", desc: "Plastic Recycling Machines और DIY Ideas — Open Source" },
      { name: "Ellen MacArthur Foundation", url: "https://www.ellenmacarthurfoundation.org", desc: "Circular Economy — Waste-Free Future Design" },
      { name: "UNEP Plastic Pollution Resources", url: "https://www.unep.org/plastic-pollution", desc: "Plastic Pollution Information — Official UN Data" },
      { name: "Earth911 Recycling Directory", url: "https://earth911.com", desc: "Recycling center locator — Find near you" },
      { name: "Break Free From Plastic", url: "https://www.breakfreefromplastic.org", desc: "Global movement against plastic pollution" },
      { name: "Ocean Conservancy", url: "https://oceanconservancy.org", desc: "Ocean cleanup और marine plastic data" },
    ]
  },
  {
    id: "climate",
    icon: Globe,
    title: "🌊 Climate, Water & Pollution Research",
    color: "from-blue-900/40 to-indigo-900/20",
    border: "border-blue-800/40",
    badge: "bg-blue-900/50 text-blue-300 border-blue-700/50",
    links: [
      { name: "IPCC Reports", url: "https://www.ipcc.ch/reports", desc: "Intergovernmental Panel on Climate Change — Official Reports" },
      { name: "NASA Climate", url: "https://climate.nasa.gov", desc: "NASA's climate change evidence और data" },
      { name: "NOAA Climate", url: "https://www.climate.gov", desc: "Ocean और Atmosphere Climate Data — US" },
      { name: "European Environment Agency", url: "https://www.eea.europa.eu", desc: "European climate और environment data" },
      { name: "US EPA", url: "https://www.epa.gov/climate-change", desc: "US Environmental Protection Agency — Climate Data" },
      { name: "UNESCO Ocean Science", url: "https://oceandecade.org", desc: "Ocean Science for Sustainable Development" },
      { name: "World Resources Institute — Water", url: "https://www.wri.org/water", desc: "Global water scarcity maps और data" },
    ]
  },
  {
    id: "science",
    icon: FlaskConical,
    title: "🧪 Science, Research & Innovation",
    color: "from-violet-900/40 to-purple-900/20",
    border: "border-violet-800/40",
    badge: "bg-violet-900/50 text-violet-300 border-violet-700/50",
    links: [
      { name: "Google Scholar", url: "https://scholar.google.com", desc: "Research Papers Search — Free Access" },
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov", desc: "Medical और Environmental Research Papers" },
      { name: "ResearchGate", url: "https://www.researchgate.net", desc: "Researchers और Publications Network" },
      { name: "arXiv", url: "https://arxiv.org", desc: "Free Scientific Papers — Physics, Biology, CS" },
      { name: "Directory of Open Access Journals", url: "https://doaj.org", desc: "Free Research Journals — Peer Reviewed" },
      { name: "Semantic Scholar", url: "https://www.semanticscholar.org", desc: "AI-powered research paper search" },
    ]
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "🎓 Free Education — Courses & Universities",
    color: "from-green-900/40 to-emerald-900/20",
    border: "border-green-800/40",
    badge: "bg-green-900/50 text-green-300 border-green-700/50",
    links: [
      { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", desc: "MIT के सभी courses — बिल्कुल मुफ्त — 2,500+ courses" },
      { name: "Harvard Online Learning", url: "https://online-learning.harvard.edu", desc: "Harvard University के free और paid courses" },
      { name: "Stanford Online", url: "https://online.stanford.edu", desc: "Stanford के courses — Environment, AI, Medicine" },
      { name: "Coursera", url: "https://www.coursera.org", desc: "Top universities के courses — Certificate with financial aid" },
      { name: "edX", url: "https://www.edx.org", desc: "MIT, Harvard, Berkeley — Free audit option" },
      { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Free learning for everyone — Science, Math, Environment" },
      { name: "FutureLearn", url: "https://www.futurelearn.com", desc: "UK universities ke courses — sustainability focus" },
      { name: "SWAYAM (India)", url: "https://swayam.gov.in", desc: "India का free online learning platform — Hindi courses" },
    ]
  },
  {
    id: "books",
    icon: BookOpen,
    title: "📚 Free Books, Research & Libraries",
    color: "from-rose-900/40 to-pink-900/20",
    border: "border-rose-800/40",
    badge: "bg-rose-900/50 text-rose-300 border-rose-700/50",
    links: [
      { name: "Google Books", url: "https://books.google.com", desc: "Millions of books — preview और full text" },
      { name: "Project Gutenberg", url: "https://www.gutenberg.org", desc: "70,000+ Free Books — copyright expired classics" },
      { name: "Internet Archive", url: "https://archive.org", desc: "Digital Library — Books, Movies, Music, Websites" },
      { name: "Google Scholar", url: "https://scholar.google.com", desc: "Research Papers Search — across all subjects" },
      { name: "PubMed Medical Research", url: "https://pubmed.ncbi.nlm.nih.gov", desc: "Medical और Life Sciences research papers" },
      { name: "Directory of Open Access Books", url: "https://www.doabooks.org", desc: "Free peer-reviewed academic books" },
      { name: "Open Library", url: "https://openlibrary.org", desc: "1 book from every book ever published — borrow free" },
      { name: "Z-Library Environmental", url: "https://z-lib.org", desc: "Large collection of environmental research" },
    ]
  },
  {
    id: "tech",
    icon: Cpu,
    title: "🤖 AI, Technology & Open Source",
    color: "from-indigo-900/40 to-blue-900/20",
    border: "border-indigo-800/40",
    badge: "bg-indigo-900/50 text-indigo-300 border-indigo-700/50",
    links: [
      { name: "OpenAI Research", url: "https://openai.com/research", desc: "AI Research Papers और Models" },
      { name: "GitHub Open Source", url: "https://github.com/explore", desc: "Open Source Projects — Environmental Tech" },
      { name: "Hugging Face", url: "https://huggingface.co", desc: "AI Models — Free to use and explore" },
      { name: "TensorFlow", url: "https://www.tensorflow.org", desc: "Google का AI framework — Open Source" },
      { name: "W3C Web Standards", url: "https://www.w3.org", desc: "World Wide Web Consortium — Open Web Standards" },
      { name: "Papers With Code", url: "https://paperswithcode.com", desc: "AI Research papers + implementation code" },
    ]
  },
  {
    id: "data",
    icon: Database,
    title: "🌎 Global Data & Government Sources",
    color: "from-cyan-900/40 to-teal-900/20",
    border: "border-cyan-800/40",
    badge: "bg-cyan-900/50 text-cyan-300 border-cyan-700/50",
    links: [
      { name: "World Bank Open Data", url: "https://data.worldbank.org", desc: "Global development data — 200+ countries" },
      { name: "United Nations Data", url: "https://data.un.org", desc: "UN Statistical Databases — Free Access" },
      { name: "Our World in Data", url: "https://ourworldindata.org", desc: "Data-driven research on world's biggest problems" },
      { name: "Data.gov (US)", url: "https://www.data.gov", desc: "US Government open datasets — Environment focus" },
      { name: "India Data Portal", url: "https://data.gov.in", desc: "India Government Open Data Platform" },
      { name: "UN Environment Statistics", url: "https://unstats.un.org/unsd/envstats", desc: "UN Environment Statistics Database" },
      { name: "Gapminder", url: "https://www.gapminder.org/data", desc: "Global statistics with interactive visualizations" },
    ]
  },
  {
    id: "health",
    icon: Heart,
    title: "🏥 Health, Human Welfare & Well-being",
    color: "from-red-900/40 to-rose-900/20",
    border: "border-red-800/40",
    badge: "bg-red-900/50 text-red-300 border-red-700/50",
    links: [
      { name: "World Health Organization (WHO)", url: "https://www.who.int", desc: "Global health data — environment और health link" },
      { name: "CDC (US)", url: "https://www.cdc.gov/climateandhealth", desc: "Climate change और human health data" },
      { name: "World Bank Health Data", url: "https://data.worldbank.org/topic/health", desc: "Global health indicators और data" },
      { name: "The Lancet Planetary Health", url: "https://www.thelancet.com/journals/lanpla/home", desc: "Scientific journal — Planet और Human Health link" },
      { name: "Health Effects Institute", url: "https://www.healtheffects.org", desc: "Air pollution और health research" },
    ]
  },
  {
    id: "agriculture",
    icon: Sprout,
    title: "🌱 Agriculture, Soil & Food Security",
    color: "from-lime-900/40 to-green-900/20",
    border: "border-lime-800/40",
    badge: "bg-lime-900/50 text-lime-300 border-lime-700/50",
    links: [
      { name: "FAO (Food & Agriculture Org)", url: "https://www.fao.org", desc: "UN Food and Agriculture Organization — Global food data" },
      { name: "CGIAR Research", url: "https://www.cgiar.org", desc: "Global agricultural research — food security" },
      { name: "USDA Agricultural Research", url: "https://www.ars.usda.gov", desc: "US Agricultural Research Service" },
      { name: "Soil Science Society", url: "https://www.soils.org", desc: "Soil health research और resources" },
      { name: "Global Food Security Index", url: "https://impact.economist.com/sustainability/project/food-security-index", desc: "113 countries food security ranking" },
    ]
  },
  {
    id: "community",
    icon: Users,
    title: "🌎 Community, Volunteers & Global Action",
    color: "from-orange-900/40 to-amber-900/20",
    border: "border-orange-800/40",
    badge: "bg-orange-900/50 text-orange-300 border-orange-700/50",
    links: [
      { name: "United Nations Volunteers", url: "https://www.unv.org", desc: "Global volunteering opportunities — 170+ countries" },
      { name: "Earth Day Network", url: "https://www.earthday.org", desc: "Global environmental movement — April 22" },
      { name: "Citizen Science Association", url: "https://www.citizenscience.org", desc: "Citizen science projects और community" },
      { name: "Zooniverse", url: "https://www.zooniverse.org", desc: "Citizen Science Projects — Animals, Climate, Space" },
      { name: "Greenpeace", url: "https://www.greenpeace.org", desc: "Environmental activism और campaigns" },
      { name: "350.org", url: "https://350.org", desc: "Climate activism movement — global network" },
      { name: "iNaturalist", url: "https://www.inaturalist.org", desc: "Record nature observations — contribute to science" },
      { name: "Avaaz", url: "https://www.avaaz.org", desc: "Global civic movement — petition platform" },
    ]
  },
];

const iv = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

function ResourceCard({ link, badge }: { link: { name: string; url: string; desc: string }; badge: string }) {
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer"
      className="group flex items-start gap-3 bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 transition-all duration-200">
      <div className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 mt-0.5 ${badge}`}>
        <ExternalLink className="w-2.5 h-2.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-white/90 font-semibold text-sm group-hover:text-white transition-colors">{link.name}</span>
          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
        </div>
        <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{link.desc}</p>
      </div>
    </a>
  );
}

export default function Resources() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10)_0%,transparent_55%)] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <Database className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Resources Hub</span>
            </h1>
            <p className="text-emerald-400/80 text-lg font-medium mb-4">🌍 Knowledge is Power — ज्ञान ही शक्ति है</p>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Handpicked links to the world's best environmental organizations, free education, 
              research papers, open data, and citizen science platforms. Sab free, sab open.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-8">
              {[
                { n: RESOURCE_CATEGORIES.length, l: "Categories" },
                { n: RESOURCE_CATEGORIES.reduce((s, c) => s + c.links.length, 0), l: "Resources" },
                { n: "100%", l: "Free Access" },
              ].map((s) => (
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">{s.n}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Quick Jump */}
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {RESOURCE_CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
              {cat.title.split(" ").slice(0, 3).join(" ")}
            </a>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 max-w-5xl space-y-10 py-4">
        {RESOURCE_CATEGORIES.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <motion.section key={cat.id} id={cat.id}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={cv}>
              <motion.div variants={iv} className={`bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl overflow-hidden`}>
                {/* Category Header */}
                <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg">{cat.title}</h2>
                    <p className="text-white/35 text-xs">{cat.links.length} resources — all free &amp; open</p>
                  </div>
                </div>

                {/* Links Grid */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cat.links.map((link) => (
                    <ResourceCard key={link.url} link={link} badge={cat.badge} />
                  ))}
                </div>
              </motion.div>
            </motion.section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-4 max-w-2xl text-center py-16">
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-800/40 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">💡 और Resources जानते हैं?</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            कोई important organization, tool, या website missing है? Ideas board पर submit करें — 
            हम इसे यहाँ add करेंगे।
          </p>
          <Link href="/ideas">
            <span className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold transition-all text-sm cursor-pointer">
              Suggest a Resource →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
