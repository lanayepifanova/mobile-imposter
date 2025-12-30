import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useLocation } from "wouter";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (mode === "signup" && !displayName.trim()) {
      setError("Please add a name for your profile.");
      return;
    }

    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName.trim());
      }
      setLocation("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-background">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-18%] left-[-12%] w-[55%] h-[55%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-16%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[35%] right-[25%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] items-stretch">
          <GlassCard className="space-y-6 p-6">
            <div className="space-y-2">
              <p className="text-[11px] font-lato uppercase tracking-[0.2em] text-foreground/50">
                Imposter Profiles
              </p>
              <h1 className="text-4xl font-playfair font-bold text-foreground">
                Keep your words fresh.
              </h1>
              <p className="text-sm text-foreground/70 font-lato">
                Sign in to save your custom categories, friends list, and past games across devices.
              </p>
            </div>

            <div className="space-y-3 text-sm font-lato text-foreground/70">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                <p>Track used words so categories stay fresh.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                <p>Save friends and player lists for faster setup.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                <p>Publish custom categories to the community.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-xs font-lato uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setLocation("/")}
              >
                Continue as guest
              </button>
              <span className="text-foreground/30">•</span>
              <button
                type="button"
                className="text-xs font-lato uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Create an account" : "I already have an account"}
              </button>
            </div>
          </GlassCard>

          <GlassCard className="space-y-6 p-6 bg-card shadow-xl border-border ink-wash-card">
            <div className="space-y-1">
              <h2 className="text-2xl font-playfair font-bold text-foreground">
                {mode === "signin" ? "Welcome back" : "Create your profile"}
              </h2>
              <p className="text-xs font-lato text-foreground/60">
                {mode === "signin"
                  ? "Sign in to sync your saved data."
                  : "Start with email + password. Google sign-in can be added later."}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!supabase && (
                <p className="text-xs text-foreground font-bold text-center">
                  Supabase env vars are missing. Add VITE_SUPABASE_URL and
                  VITE_SUPABASE_ANON_KEY to continue.
                </p>
              )}
              <div className="space-y-2">
                <label className="text-[11px] font-lato uppercase tracking-widest text-foreground/60">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-lato outline-none transition-colors focus:border-foreground"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-lato uppercase tracking-widest text-foreground/60">
                  Password
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-lato outline-none transition-colors focus:border-foreground"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="text-[11px] font-lato uppercase tracking-widest text-foreground/60">
                    Name
                  </label>
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-lato outline-none transition-colors focus:border-foreground"
                    type="text"
                    autoComplete="name"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    required
                  />
                </div>
              )}

              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="text-[11px] font-lato uppercase tracking-widest text-foreground/60">
                    Confirm password
                  </label>
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-lato outline-none transition-colors focus:border-foreground"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    required
                  />
                </div>
              )}

              {error && (
                <p className="text-xs text-foreground font-bold text-center">{error}</p>
              )}

              <NeonButton fullWidth className="shadow-md" disabled={loading}>
                {loading ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
              </NeonButton>
            </form>

            <div className="relative text-center text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              <span className="bg-card px-3">or</span>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border/60 -z-10" />
            </div>

            <NeonButton
              variant="ghost"
              fullWidth
              className="border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              disabled
            >
              Google sign-in (soon)
            </NeonButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
