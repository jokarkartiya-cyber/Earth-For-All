import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Globe, Smartphone, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function PhoneLogin() {
  const [, navigate] = useLocation();
  const { loginWithPhone, verifyPhoneOtp } = useAuth();
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const confirmationRef = useRef<any>(null);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const confirmation = await loginWithPhone(phone, "recaptcha-container");
      confirmationRef.current = confirmation;
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyPhoneOtp(confirmationRef.current, otp);
      navigate("/");
    } catch (err: any) {
      setError("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/60 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">{step === "phone" ? "Phone Sign In" : "Verify OTP"}</h1>
          <p className="text-white/50 text-sm mt-1">
            {step === "phone" ? "Enter your phone number" : "Enter the code sent to your phone"}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 font-medium mb-1.5 block">Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="+91 98765 43210" />
              </div>
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <div id="recaptcha-container" />
            <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11 rounded-xl text-sm">
              {loading ? "Sending OTP..." : "Send OTP"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 font-medium mb-1.5 block">OTP Code</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors text-center tracking-widest"
                  placeholder="• • • • • •" maxLength={6} />
              </div>
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <div id="recaptcha-container" />
            <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11 rounded-xl text-sm">
              {loading ? "Verifying..." : "Verify & Sign In"}
            </Button>
            <button type="button" onClick={() => { setStep("phone"); setError(""); }}
              className="w-full text-xs text-white/40 hover:text-white/60 transition-colors">
              Change phone number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
