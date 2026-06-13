import { motion } from "framer-motion";
import { ArrowLeft, Database, Users, Globe, Bird, Recycle, BookOpen, Satellite, Heart, Leaf, Cpu, Trophy, Shield, MessageSquare, Wind, TreePine, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

type StatusType = "live" | "building" | "planned";

const DB_TABLES: {
  id: string;
  icon: React.ElementType;
  title: string;
  emoji: string;
  color: string;
  border: string;
  status: StatusType;
  columns: string[];
  desc: string;
}[] = [
  {
    id: "ideas",
    icon: MessageSquare,
    emoji: "💡",
    title: "Ideas Board",
    color: "from-emerald-900/40 to-teal-900/20",
    border: "border-emerald-800/40",
    status: "live",
    desc: "Community environmental ideas with upvoting",
    columns: ["id", "title", "description", "category", "author_name", "upvotes", "created_at"],
  },
  {
    id: "reports",
    icon: Globe,
    emoji: "🚨",
    title: "Problem Reports",
    color: "from-red-900/40 to-orange-900/20",
    border: "border-red-800/40",
    status: "live",
    desc: "Ground-level environmental problems reported by users",
    columns: ["id", "type", "description", "location", "status", "reporter_name", "created_at"],
  },
  {
    id: "articles",
    icon: BookOpen,
    emoji: "📚",
    title: "Education Articles",
    color: "from-blue-900/40 to-indigo-900/20",
    border: "border-blue-800/40",
    status: "live",
    desc: "Educational content about environment and conservation",
    columns: ["id", "title", "summary", "content", "category", "reading_time_minutes", "image_url", "created_at"],
  },
  {
    id: "discussions",
    icon: MessageSquare,
    emoji: "🗣️",
    title: "Community Discussions",
    color: "from-violet-900/40 to-purple-900/20",
    border: "border-violet-800/40",
    status: "live",
    desc: "Open forum for community conversations about Earth",
    columns: ["id", "topic", "message", "author_name", "category", "upvotes", "created_at"],
  },
  {
    id: "air_quality",
    icon: Wind,
    emoji: "🌬️",
    title: "Air Quality Data",
    color: "from-cyan-900/40 to-teal-900/20",
    border: "border-cyan-800/40",
    status: "live",
    desc: "Real-time air quality index for cities worldwide",
    columns: ["id", "city", "country", "aqi", "pm25", "pm10", "no2", "o3", "status", "updated_at"],
  },
  {
    id: "animal_species",
    icon: Bird,
    emoji: "🦁",
    title: "Animal Species Database",
    color: "from-amber-900/40 to-orange-900/20",
    border: "border-amber-800/40",
    status: "live",
    desc: "Endangered and protected species tracking",
    columns: ["id", "species_name", "scientific_name", "status", "habitat", "population", "threats", "protection_methods", "country", "image_url"],
  },
  {
    id: "forest_data",
    icon: TreePine,
    emoji: "🌳",
    title: "Forest Data",
    color: "from-green-900/40 to-emerald-900/20",
    border: "border-green-800/40",
    status: "live",
    desc: "Country-level forest cover, loss and carbon data",
    columns: ["id", "country", "forest_area_mha", "forest_loss_mha", "tree_canopy_cover", "year", "carbon_stock_mt"],
  },
  {
    id: "users",
    icon: Users,
    emoji: "👤",
    title: "Users System",
    color: "from-slate-900/40 to-gray-900/20",
    border: "border-slate-700/40",
    status: "building",
    desc: "Full user accounts, profiles, activity tracking",
    columns: ["id", "name", "email", "password_hash", "country", "city", "language", "role", "profile_photo", "bio", "created_at"],
  },
  {
    id: "problems",
    icon: Globe,
    emoji: "🌍",
    title: "Earth Problems Database",
    color: "from-rose-900/40 to-pink-900/20",
    border: "border-rose-700/40",
    status: "building",
    desc: "Detailed problem + solution tracking with scientific references",
    columns: ["id", "title", "category", "country", "location", "description", "images", "videos", "severity", "created_by"],
  },
  {
    id: "books",
    icon: BookOpen,
    emoji: "📖",
    title: "Earth Library",
    color: "from-yellow-900/40 to-amber-900/20",
    border: "border-yellow-700/40",
    status: "building",
    desc: "Books, research papers, courses curated for Earth",
    columns: ["id (books)", "title", "author", "category", "language", "source_link", "summary", "id (papers)", "title", "authors", "journal", "doi"],
  },
  {
    id: "satellite",
    icon: Satellite,
    emoji: "🛰️",
    title: "Satellite & Live Data",
    color: "from-indigo-900/40 to-blue-900/20",
    border: "border-indigo-700/40",
    status: "building",
    desc: "Live satellite feeds, climate observations integrated",
    columns: ["id", "source_id", "location", "data_type", "value", "date", "satellite_sources (name, api_link, data_type, update_frequency)"],
  },
  {
    id: "health",
    icon: Heart,
    emoji: "🏥",
    title: "Health & Human Welfare",
    color: "from-red-900/40 to-rose-900/20",
    border: "border-red-700/40",
    status: "building",
    desc: "Disease-pollution correlation data by country",
    columns: ["id", "country", "disease", "pollution_relation", "report_link", "year"],
  },
  {
    id: "community",
    icon: Users,
    emoji: "🌎",
    title: "Global Community",
    color: "from-teal-900/40 to-cyan-900/20",
    border: "border-teal-700/40",
    status: "building",
    desc: "Projects, volunteers, events, and discussions",
    columns: ["id (projects)", "title", "country", "description", "goal", "progress", "id (volunteers)", "user_id", "skills", "availability", "location"],
  },
  {
    id: "ai",
    icon: Cpu,
    emoji: "🤖",
    title: "AI Earth Assistant",
    color: "from-purple-900/40 to-violet-900/20",
    border: "border-purple-700/40",
    status: "planned",
    desc: "Multilingual AI conversations about Earth problems",
    columns: ["id", "user_id", "question", "answer", "language", "date"],
  },
  {
    id: "challenges",
    icon: Trophy,
    emoji: "🏆",
    title: "Earth Challenges & Rewards",
    color: "from-orange-900/40 to-amber-900/20",
    border: "border-orange-700/40",
    status: "planned",
    desc: "Gamified challenges for environmental action",
    columns: ["id (challenges)", "title", "description", "points", "duration", "id (achievements)", "user_id", "challenge_id", "completion_date"],
  },
  {
    id: "admin",
    icon: Shield,
    emoji: "🔐",
    title: "Security & Admin",
    color: "from-gray-900/40 to-slate-900/20",
    border: "border-gray-700/40",
    status: "planned",
    desc: "Admin panel, audit logs, content moderation",
    columns: ["id (admins)", "name", "email", "role", "id (logs)", "action", "user_id", "timestamp"],
  },
];

const STATUS_CONFIG: Record<StatusType, { label: string; color: string; icon: React.ElementType }> = {
  live: { label: "Live", color: "bg-emerald-900/60 text-emerald-300 border-emerald-700/50", icon: CheckCircle },
  building: { label: "Building", color: "bg-amber-900/60 text-amber-300 border-amber-700/50", icon: Clock },
  planned: { label: "Planned", color: "bg-slate-900/60 text-slate-400 border-slate-600/50", icon: Clock },
};

const APIS = [
  {
    group: "🌍 Earth & Satellite",
    color: "text-emerald-400",
    items: [
      { name: "Google Earth Engine", use: "Satellite Data Analysis, Forest, Water, Climate Research", url: "https://earthengine.google.com" },
      { name: "NASA EarthData API", use: "Satellite Images, Climate, Atmosphere Data", url: "https://earthdata.nasa.gov/api" },
      { name: "NASA Worldview", use: "Daily Earth Satellite Images — live", url: "https://worldview.earthdata.nasa.gov" },
      { name: "Copernicus Data Space", use: "Sentinel Satellite Images, Land & Ocean Data", url: "https://dataspace.copernicus.eu" },
      { name: "USGS EarthExplorer", use: "Landsat Satellite Data Archive", url: "https://earthexplorer.usgs.gov" },
    ]
  },
  {
    group: "🌳 Forest & Biodiversity",
    color: "text-green-400",
    items: [
      { name: "Global Forest Watch API", use: "Forest Loss, Tree Cover, Fire Alerts", url: "https://www.globalforestwatch.org/developers" },
      { name: "GBIF API", use: "Animals, Plants, Species Database — 2.4B records", url: "https://www.gbif.org/developer/summary" },
      { name: "IUCN Red List API", use: "Threatened Species Information", url: "https://apiv3.iucnredlist.org" },
    ]
  },
  {
    group: "🌡️ Weather, Air & Climate",
    color: "text-cyan-400",
    items: [
      { name: "OpenWeather API", use: "Weather, Temperature, Rain Data", url: "https://openweathermap.org/api" },
      { name: "NOAA Climate Data API", use: "Historical Climate Records", url: "https://www.ncdc.noaa.gov/cdo-web/webservices/v2" },
      { name: "OpenAQ API", use: "Air Quality Data — 100+ countries", url: "https://openaq.org/#/community/api" },
      { name: "IQAir AirVisual API", use: "Global Pollution Map — Real-time", url: "https://www.iqair.com/air-pollution-data-api" },
    ]
  },
  {
    group: "🌊 Ocean & Water",
    color: "text-blue-400",
    items: [
      { name: "NOAA Ocean Data Portal", use: "Ocean Temperature, Currents, Sea Level", url: "https://oceandata.sci.gsfc.nasa.gov" },
      { name: "UNESCO Ocean Data Portal", use: "Global Ocean Observations", url: "https://odp.ocean.org" },
      { name: "Aqueduct Water Risk Atlas", use: "Water Scarcity Risk Maps worldwide", url: "https://www.wri.org/aqueduct" },
    ]
  },
  {
    group: "🔥 Disaster Monitoring",
    color: "text-red-400",
    items: [
      { name: "NASA FIRMS Fire API", use: "Wildfire Detection — Near Real-time", url: "https://firms.modaps.eosdis.nasa.gov/api" },
      { name: "ReliefWeb API", use: "Global Disaster Reports and Alerts", url: "https://reliefweb.int/about/api" },
      { name: "EM-DAT Disaster Database", use: "Historical Disaster Data since 1900", url: "https://www.emdat.be" },
    ]
  },
  {
    group: "🤖 AI & Earth Data",
    color: "text-purple-400",
    items: [
      { name: "Hugging Face Models API", use: "Earth AI — Image Classification, Analysis", url: "https://huggingface.co/inference-api" },
      { name: "TensorFlow Hub", use: "Pre-trained ML Models — Environmental Detection", url: "https://tfhub.dev" },
      { name: "OpenAI API", use: "Earth AI Assistant, Translation, Analysis", url: "https://platform.openai.com" },
      { name: "Google Maps Platform", use: "Interactive Maps, Location, Places API", url: "https://developers.google.com/maps" },
    ]
  },
];

const liveTables = DB_TABLES.filter(t => t.status === "live").length;
const buildingTables = DB_TABLES.filter(t => t.status === "building").length;
const plannedTables = DB_TABLES.filter(t => t.status === "planned").length;
const totalApiCount = APIS.reduce((s, g) => s + g.items.length, 0);

export default function Platform() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10)_0%,transparent_55%)] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>

          <div className="w-20 h-20 rounded-3xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            <Database className="w-10 h-10 text-indigo-400" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">Platform Blueprint</span>
          </h1>
          <p className="text-indigo-400/80 text-lg font-medium mb-4">🛰️ Full Architecture — Database + APIs + Vision</p>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Earth For All is being built as a Wikipedia + Social Media + AI + Google Maps level 
            platform. Yahan dekho — kya live hai, kya ban raha hai, aur kya planned hai.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
            {[
              { n: `${liveTables}`, l: "Live Tables", c: "text-emerald-400" },
              { n: `${buildingTables}`, l: "Building", c: "text-amber-400" },
              { n: `${plannedTables}`, l: "Planned", c: "text-slate-400" },
              { n: `${totalApiCount}+`, l: "APIs Mapped", c: "text-indigo-400" },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className={`text-xl font-bold ${s.c}`}>{s.n}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Database Tables */}
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Database Architecture</h2>
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40">PostgreSQL + Drizzle ORM</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DB_TABLES.map((table) => {
              const Icon = table.icon;
              const statusCfg = STATUS_CONFIG[table.status];
              const StatusIcon = statusCfg.icon;
              return (
                <motion.div key={table.id} variants={iv}
                  className={`bg-gradient-to-br ${table.color} border ${table.border} rounded-xl overflow-hidden`}>
                  <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{table.emoji}</span>
                      <div>
                        <div className="font-semibold text-white text-sm">{table.title}</div>
                        <div className="text-white/35 text-[11px]">{table.desc}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${statusCfg.color}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex flex-wrap gap-1">
                    {table.columns.map((col, ci) => (
                      <code key={`${table.id}-col-${ci}`} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-white/50 font-mono">{col}</code>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* APIs Integration Plan */}
      <div className="container mx-auto px-4 max-w-5xl py-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-6">
            <Satellite className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Satellite & Live Data APIs</h2>
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40">{totalApiCount} Planned Integrations</span>
          </motion.div>

          <div className="space-y-5">
            {APIS.map((group) => (
              <motion.div key={group.group} variants={iv} className="bg-white/[0.025] border border-white/8 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5">
                  <h3 className={`font-bold text-sm ${group.color}`}>{group.group}</h3>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {group.items.map((api) => (
                    <a key={api.url} href={api.url} target="_blank" rel="noopener noreferrer"
                      className="group flex flex-col gap-0.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 rounded-xl px-4 py-2.5 transition-all">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/80 font-semibold text-sm group-hover:text-white transition-colors">{api.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900/50 text-indigo-400 border border-indigo-700/30">API</span>
                      </div>
                      <p className="text-white/35 text-xs">{api.use}</p>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tech Stack */}
      <div className="container mx-auto px-4 max-w-5xl py-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-800/40 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Current Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { cat: "Frontend", items: ["React + Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Recharts"] },
                { cat: "Backend", items: ["Node.js 24", "Express 5", "PostgreSQL", "Drizzle ORM", "Zod Validation"] },
                { cat: "Architecture", items: ["pnpm Workspaces", "OpenAPI Contract", "Orval Codegen", "React Query", "Contract-First API"] },
                { cat: "Upcoming", items: ["AI Assistant", "Live Satellite API", "User Accounts", "Map Integration", "Mobile App"] },
              ].map((s) => (
                <div key={s.cat}>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">{s.cat}</div>
                  <div className="flex flex-col gap-1">
                    {s.items.map((item) => (
                      <div key={item} className="text-xs text-white/60 bg-white/5 rounded px-2 py-1 border border-white/5">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 max-w-2xl text-center py-12">
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-800/40 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">🚀 Contribute to the Platform</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Earth For All open platform hai — koi bhi data submit kar sakta hai, 
            ideas de sakta hai, aur problems report kar sakta hai. 
            Milke banate hain duniya ki sabse badi environment website!
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/ideas">
              <span className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all text-sm cursor-pointer">
                Submit Ideas →
              </span>
            </Link>
            <Link href="/report">
              <span className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all text-sm cursor-pointer border border-white/10">
                Report Problems
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
