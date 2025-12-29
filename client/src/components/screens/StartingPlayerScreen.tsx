import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { Sparkles } from "lucide-react";

export function StartingPlayerScreen() {
  const { gameState, goToPlay } = useGame();
  const startingIndex = gameState.startingPlayerIndex ?? 0;
  const startingName = gameState.playerNames[startingIndex] ?? "Player 1";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-4xl font-playfair font-bold text-foreground">First Speaker</h2>
        <p className="text-foreground/70 font-lato">
          Randomly selected to start describing the word.
        </p>
      </div>

      <GlassCard className="w-full p-10 text-center space-y-6 bg-card shadow-xl border-border">
        <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-foreground/70" />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-foreground/60 uppercase tracking-widest font-lato">You go first</p>
          <p className="text-4xl font-playfair font-bold text-foreground">{startingName}</p>
        </div>
      </GlassCard>

      <NeonButton className="mt-10 w-full shadow-lg" onClick={goToPlay}>
        Begin Discussion
      </NeonButton>
    </div>
  );
}
