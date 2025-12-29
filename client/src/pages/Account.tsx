import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const [, setLocation] = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  return (
    <RequireAuth>
      <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-background">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute top-[-18%] left-[-12%] w-[55%] h-[55%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-18%] right-[-16%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute top-[35%] right-[25%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto">
          <GlassCard className="space-y-6 p-6">
            <div className="space-y-2">
              <p className="text-[11px] font-lato uppercase tracking-[0.2em] text-foreground/50">
                Account
              </p>
              <h1 className="text-3xl font-playfair font-bold text-foreground">
                {user?.email ?? "Signed in"}
              </h1>
              <p className="text-sm text-foreground/70 font-lato">
                Manage your profile, friends, and saved categories here soon.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <NeonButton fullWidth onClick={() => setLocation("/")}>
                Back to game
              </NeonButton>
              <NeonButton variant="ghost" fullWidth onClick={handleSignOut}>
                Sign out
              </NeonButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </RequireAuth>
  );
}
