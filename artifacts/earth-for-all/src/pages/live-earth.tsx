import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Wind, TreePine, Flame, Activity, Satellite, AlertTriangle, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useListAirQuality, useListForestData } from "@workspace/api-client-react";

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

const AQI_COLOR = (aqi: number) => {
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#eab308";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  if (aqi <= 300) return "#a855f7";
  return "#7f1d1d";
};

const STATUS_COLOR: Record<string, string> = {
  "Good": "text-green-400 bg-green-900/40 border-green-700/50",
  "Moderate": "text-yellow-400 bg-yellow-900/40 border-yellow-700/50",
  "Unhealthy for Sensitive Groups": "text-orange-400 bg-orange-900/40 border-orange-700/50",
  "Unhealthy": "text-red-400 bg-red-900/40 border-red-700/50",
  "Very Unhealthy": "text-purple-400 bg-purple-900/40 border-purple-700/50",
  "Hazardous": "text-red-300 bg-red-950/60 border-red-800/70",
};

const LIVE_FEEDS = [
  { title: "🛰️ NASA Worldview", desc: "Live satellite images — any location, any date", url: "https://worldview.earthdata.nasa.gov", color: "border-blue-800/40 hover:border-blue-600/60" },
  { title: "🔥 NASA FIRMS Fire Map", desc: "Active wildfires detected within 3 hours", url: "https://firms.modaps.eosdis.nasa.gov/map", color: "border-red-800/40 hover:border-red-600/60" },
  { title: "💨 OpenAQ Live Air Quality", desc: "14,000+ sensors — real-time global pollution data", url: "https://explore.openaq.org", color: "border-cyan-800/40 hover:border-cyan-600/60" },
  { title: "🌪️ GDACS Disaster Monitor", desc: "Global disaster alerts — earthquakes, floods, cyclones", url: "https://www.gdacs.org/alerts.aspx", color: "border-orange-800/40 hover:border-orange-600/60" },
  { title: "🌳 Global Forest Watch Live", desc: "Near-real-time tree cover loss & fire alerts", url: "https://www.globalforestwatch.org", color: "border-green-800/40 hover:border-green-600/60" },
  { title: "🌊 NOAA Ocean Monitor", desc: "Sea surface temperature, currents, sea level", url: "https://oceanservice.noaa.gov/maps", color: "border-blue-800/40 hover:border-blue-600/60" },
  { title: "🌡️ Copernicus Climate C3S", desc: "Europe's climate change real-time service", url: "https://climate.copernicus.eu/charts/packages/cams", color: "border-violet-800/40 hover:border-violet-600/60" },
  { title: "🌐 Earth Nullschool Wind", desc: "Beautiful live global wind, ocean, and pollution map", url: "https://earth.nullschool.net", color: "border-teal-800/40 hover:border-teal-600/60" },
];

function CustomTooltipAQ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/20 rounded-xl px-4 py-3 text-sm">
        <div className="font-bold text-white mb-1">{label}</div>
        <div style={{ color: AQI_COLOR(payload[0].value) }} className="font-mono font-bold text-lg">AQI {payload[0].value}</div>
      </div>
    );
  }
  return null;
}

export default function LiveEarth() {
  const { data: airQuality, isLoading: aqLoading } = useListAirQuality({ country: undefined, limit: 20 });
  const { data: forestData, isLoading: forestLoading } = useListForestData({ limit: 15 });

  const aqChartData = Array.isArray(airQuality) ? airQuality.slice(0, 12).map(d => ({ name: d.city, aqi: d.aqi, status: d.status })) : [];
  const forestChartData = Array.isArray(forestData) ? forestData.slice(0, 10).map(d => ({ name: d.country, area: Math.round(d.forestAreaMha), loss: d.forestLossMha ? Math.round(d.forestLossMha * 10) / 10 : 0 })) : [];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_55%)] py-14">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-sm font-bold text-red-400 uppercase tracking-widest">LIVE DATA</span>
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-300">Live Earth</span>
            <span className="text-white"> Dashboard</span>
          </h1>
          <p className="text-emerald-400/80 text-lg font-medium mb-2">🛰️ Real-time पृथ्वी की निगरानी — Earth Command Center</p>
          <p className="text-white/45 text-sm max-w-xl mx-auto">
            Our database ka live data + NASA, OpenAQ, GDACS ke live feeds। 
            Sab kuch real-time, sab kuch verified sources se.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl space-y-8 py-6">

        {/* Live Feeds Grid */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <Satellite className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Live External Feeds</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/50 text-red-300 border border-red-700/40 animate-pulse">● LIVE</span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LIVE_FEEDS.map(feed => (
              <motion.a key={feed.url} variants={iv} href={feed.url} target="_blank" rel="noopener noreferrer"
                className={`group bg-white/[0.03] border ${feed.color} rounded-xl p-4 transition-all hover:bg-white/[0.06] hover:scale-[1.02]`}>
                <div className="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{feed.title}</div>
                <div className="text-xs text-white/40 leading-relaxed">{feed.desc}</div>
                <div className="mt-3 flex items-center gap-1 text-xs text-white/25 group-hover:text-white/50">
                  <ExternalLink className="w-3 h-3" />
                  Open live feed
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Air Quality Chart */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-800/40 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wind className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white">Air Quality Index — Global Cities</h3>
                  <p className="text-white/35 text-xs">Our database · 20 cities · AQI values</p>
                </div>
              </div>
              {aqLoading && <RefreshCw className="w-4 h-4 text-white/30 animate-spin" />}
            </div>
            <div className="p-6">
              {aqLoading ? (
                <div className="h-64 flex items-center justify-center text-white/30 text-sm">Loading air quality data...</div>
              ) : (
                <>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aqChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltipAQ />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                        <Bar dataKey="aqi" radius={[4, 4, 0, 0]}>
                          {aqChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={AQI_COLOR(entry.aqi)} opacity={0.9} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  {/* AQI Legend */}
                  <div className="flex flex-wrap gap-3 mt-3 justify-center">
                    {[["Good", "#22c55e", "0-50"], ["Moderate", "#eab308", "51-100"], ["Unhealthy", "#ef4444", "151-200"], ["Hazardous", "#7f1d1d", "300+"]].map(([l, c, r]) => (
                      <div key={l} className="flex items-center gap-1.5 text-xs text-white/50">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c as string }} />
                        <span>{l} ({r})</span>
                      </div>
                    ))}
                  </div>
                  {/* City Cards */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {Array.isArray(airQuality) && airQuality.slice(0, 12).map(aq => (
                      <div key={aq.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-center">
                        <div className="text-xs text-white/50 mb-1">{aq.city}</div>
                        <div className="text-xl font-bold font-mono" style={{ color: AQI_COLOR(aq.aqi) }}>{aq.aqi}</div>
                        <div className={`text-[9px] mt-1 px-1.5 py-0.5 rounded-full border inline-block ${STATUS_COLOR[aq.status] ?? "text-white/40 border-white/10"}`}>{aq.status}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Forest Data Chart */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-800/40 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <TreePine className="w-5 h-5 text-green-400" />
              <div>
                <h3 className="font-bold text-white">Forest Cover by Country (Million Hectares)</h3>
                <p className="text-white/35 text-xs">Our database · 2023 data · Top 10 countries</p>
              </div>
            </div>
            <div className="p-6">
              {forestLoading ? (
                <div className="h-64 flex items-center justify-center text-white/30 text-sm">Loading forest data...</div>
              ) : (
                <>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={forestChartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0a1a10", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px" }}
                          labelStyle={{ color: "white", fontWeight: "bold" }}
                          itemStyle={{ color: "#86efac" }}
                        />
                        <Bar dataKey="area" name="Forest Area (Mha)" fill="#22c55e" opacity={0.8} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {Array.isArray(forestData) && forestData.slice(0, 10).map(fd => (
                      <div key={fd.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-center">
                        <div className="text-[10px] text-white/40 mb-1 truncate">{fd.country}</div>
                        <div className="text-base font-bold text-green-400">{fd.forestAreaMha}M</div>
                        <div className="text-[9px] text-white/30">hectares</div>
                        {fd.forestLossMha && (
                          <div className="text-[9px] text-red-400 mt-0.5">-{fd.forestLossMha}M loss</div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Alert Status */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-800/40 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white">Active Monitoring Centers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: "🔥", title: "Fire Alerts", desc: "NASA FIRMS detects active fires within 3hrs globally", url: "https://firms.modaps.eosdis.nasa.gov/map", status: "MONITORING" },
                { icon: "🌪️", title: "Disaster Alerts", desc: "GDACS tracks earthquakes, floods, cyclones worldwide", url: "https://www.gdacs.org", status: "ACTIVE" },
                { icon: "📡", title: "Climate Anomalies", desc: "Copernicus Climate tracks temperature anomalies daily", url: "https://climate.copernicus.eu", status: "LIVE" },
              ].map(item => (
                <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="group bg-white/[0.03] border border-red-900/40 hover:border-red-600/50 rounded-xl p-4 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[10px] font-bold text-red-400 bg-red-900/40 border border-red-700/40 px-2 py-0.5 rounded-full animate-pulse">{item.status}</span>
                  </div>
                  <div className="font-semibold text-white text-sm group-hover:text-red-300 transition-colors">{item.title}</div>
                  <div className="text-xs text-white/40 mt-1 leading-relaxed">{item.desc}</div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
