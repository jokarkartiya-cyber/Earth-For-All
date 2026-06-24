import { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, Crosshair, MapPin, Loader2, Navigation, GripVertical } from "lucide-react";

interface Props {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const INDIA_CENTER: [number, number] = [20.5937, 78.9629];

function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onClick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function MapCenterUpdater({ pos }: { pos: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(pos, Math.max(map.getZoom(), 12), { animate: true }); }, [pos[0], pos[1]]);
  return null;
}

function DraggableMarker({ pos, onMove }: { pos: [number, number]; onMove: (lat: number, lng: number) => void }) {
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = {
    dragend() {
      const m = markerRef.current;
      if (m) {
        const p = m.getLatLng();
        onMove(p.lat, p.lng);
      }
    },
  };
  return (
    <Marker ref={markerRef} position={pos} draggable={true} eventHandlers={eventHandlers}>
      <Popup>📍 Selected location</Popup>
    </Marker>
  );
}

interface Suggestion {
  lat: string;
  lon: string;
  display_name: string;
}

export function LocationPicker({ onLocationSelect, initialLat, initialLng }: Props) {
  const [markerPos, setMarkerPos] = useState<[number, number]>([initialLat || INDIA_CENTER[0], initialLng || INDIA_CENTER[1]]);
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [selectedBySearch, setSelectedBySearch] = useState(false);
  const debounceRef = useRef<any>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // On mount, geocode initial location if provided
  useEffect(() => {
    if (initialLat && initialLng && !initializedRef.current) {
      initializedRef.current = true;
      setMarkerPos([initialLat, initialLng]);
      reverseGeocode(initialLat, initialLng).then((a) => {
        setAddress(a);
        setSearchQuery(a.split(",")[0]);
        onLocationSelect(initialLat, initialLng, a);
      });
    }
  }, [initialLat, initialLng]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced search for suggestions
  function handleSearchInput(val: string) {
    setSearchQuery(val);
    setSelectedBySearch(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 3) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=5&countrycodes=IN`
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch { /* ignore */ }
    }, 400);
  }

  function selectSuggestion(s: Suggestion) {
    const newLat = parseFloat(s.lat);
    const newLng = parseFloat(s.lon);
    setMarkerPos([newLat, newLng]);
    setAddress(s.display_name);
    setSearchQuery(s.display_name.split(",")[0]);
    setShowSuggestions(false);
    setSelectedBySearch(true);
    onLocationSelect(newLat, newLng, s.display_name);
  }

  async function handleMapClick(lat: number, lng: number) {
    setMarkerPos([lat, lng]);
    setLoading(true);
    const addr = await reverseGeocode(lat, lng);
    setAddress(addr);
    setSearchQuery(addr.split(",")[0]);
    setSelectedBySearch(false);
    onLocationSelect(lat, lng, addr);
    setLoading(false);
  }

  async function handleMarkerDrag(lat: number, lng: number) {
    setMarkerPos([lat, lng]);
    const addr = await reverseGeocode(lat, lng);
    setAddress(addr);
    setSearchQuery(addr.split(",")[0]);
    onLocationSelect(lat, lng, addr);
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newLat = pos.coords.latitude;
        const newLng = pos.coords.longitude;
        setMarkerPos([newLat, newLng]);
        const addr = await reverseGeocode(newLat, newLng);
        setAddress(addr);
        setSearchQuery(addr.split(",")[0]);
        onLocationSelect(newLat, newLng, addr);
        setGeoLoading(false);
      },
      () => setGeoLoading(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className="space-y-2">
      {/* Search + Current Location */}
      <div className="relative flex gap-2" ref={suggestionsRef}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
          <input
            type="text" value={searchQuery}
            onChange={e => handleSearchInput(e.target.value)}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
            placeholder="Search city, area, landmark..."
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-white text-xs placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d1f17] border border-white/10 rounded-xl overflow-hidden z-[9999] shadow-2xl backdrop-blur-xl">
              {suggestions.map((s, i) => (
                <button key={i} type="button" onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-3.5 py-2.5 text-xs text-white/70 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                  <span className="line-clamp-2 leading-relaxed">{s.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="button" onClick={handleUseCurrentLocation} disabled={geoLoading}
          className="shrink-0 px-3.5 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 rounded-lg text-white/60 hover:text-emerald-400 transition-all text-xs flex items-center gap-1.5 group">
          <Navigation className={`w-3.5 h-3.5 ${geoLoading ? "animate-pulse" : "group-hover:text-emerald-400"}`} />
          <span className="hidden sm:inline">{geoLoading ? "Getting..." : "My Location"}</span>
        </button>
      </div>

      {/* Map */}
      <div className="h-72 rounded-xl overflow-hidden border border-white/10 relative z-0">
        <MapContainer center={markerPos} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onClick={handleMapClick} />
          <MapCenterUpdater pos={markerPos} />
          <DraggableMarker pos={markerPos} onMove={handleMarkerDrag} />
        </MapContainer>

        {/* Map overlay instructions */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-black/60 backdrop-blur-sm text-white/50 text-[10px] px-3 py-1.5 rounded-full border border-white/10 pointer-events-none flex items-center gap-1.5">
          <GripVertical className="w-3 h-3" /> Click or drag marker to set location
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-[1000] bg-black/20 flex items-center justify-center pointer-events-none">
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Selected address */}
      {address && (
        <div className="flex items-start gap-2.5 text-xs text-white/50 bg-emerald-900/10 border border-emerald-900/20 rounded-lg p-3">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
          <div className="min-w-0">
            <p className="text-emerald-300 text-[10px] font-medium uppercase tracking-wider mb-0.5">Selected Location</p>
            <span className="text-white/60 line-clamp-2 leading-relaxed">{address}</span>
          </div>
        </div>
      )}
    </div>
  );
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await res.json();
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}
