import { useState, useRef } from "react";
import { Camera, X, Loader2, Image, Video, Play } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

interface Props {
  onPhotosChange: (urls: string[]) => void;
  max?: number;
}

export function PhotoUpload({ onPhotosChange, max = 3 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ url: string; isVideo: boolean }[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || previews.length >= max) return;
    setUploading(true);
    const newPreviews: { url: string; isVideo: boolean }[] = [];
    const filesToUpload: File[] = [];
    const remaining = max - previews.length - uploadedUrls.length;
    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const file = files[i];
      const isVideo = file.type.startsWith("video/");
      if (!file.type.startsWith("image/") && !isVideo) continue;
      newPreviews.push({ url: URL.createObjectURL(file), isVideo });
      filesToUpload.push(file);
    }
    setPreviews(p => [...p, ...newPreviews]);
    const urls: string[] = [];
    for (const file of filesToUpload) {
      try {
        const folder = file.type.startsWith("video/") ? "videos" : "photos";
        const storageRef = ref(storage, `reports/${folder}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        urls.push(await getDownloadURL(storageRef));
      } catch (e) { console.error("Upload failed:", e); }
    }
    const newUrls = [...uploadedUrls, ...urls];
    setUploadedUrls(newUrls);
    onPhotosChange(newUrls);
    setUploading(false);
  }

  function removePhoto(index: number) {
    setPreviews(p => p.filter((_, i) => i !== index));
    setUploadedUrls(u => u.filter((_, i) => i !== index));
    onPhotosChange(uploadedUrls.filter((_, i) => i !== index));
  }

  const canAdd = previews.length < max;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {previews.map((p, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 group">
            {p.isVideo ? (
              <>
                <video src={p.url} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <img src={p.url} alt="" className="w-full h-full object-cover" />
            )}
            <button type="button" onClick={() => removePhoto(i)}
              className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}
        {canAdd && (
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-white/10 hover:border-emerald-500/50 flex flex-col items-center justify-center gap-1 text-white/30 hover:text-emerald-400 transition-all disabled:opacity-50">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
            <span className="text-[9px]">{uploading ? "Uploading..." : "Add Photo"}</span>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*,video/*" multiple
        onChange={e => { handleFiles(e.target.files); e.target.value = ""; }}
        className="hidden" />
      <p className="text-[10px] text-white/30 flex items-center gap-1">
        {previews.some(p => p.isVideo) ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
        {previews.length}/{max} files • Photos & Video supported
      </p>
    </div>
  );
}
