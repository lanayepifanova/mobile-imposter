import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";

export function StartingPlayerScreen() {
  const { gameState, startVoting } = useGame();
  const startingIndex = gameState.startingPlayerIndex ?? 0;
  const startingName = gameState.playerNames[startingIndex] ?? "Player 1";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl font-playfair font-bold text-foreground">First Speaker</h2>
        <p className="text-foreground/70 font-lato text-sm">
          Randomly selected to start describing the word.
        </p>
      </div>

      <GlassCard className="w-full p-4 text-center space-y-4 bg-card shadow-xl border-border">
        <p className="text-[11px] text-foreground/60 uppercase tracking-widest font-lato">You go first</p>
        <p className="text-2xl font-playfair font-bold text-foreground">{startingName}</p>
        {gameState.category && (
          <p className="text-xs font-lato font-bold uppercase tracking-widest text-foreground/60">
            Category: {gameState.category}
          </p>
        )}
      </GlassCard>

      <NeonButton className="mt-6 w-full shadow-lg" onClick={startVoting}>
        Start Voting
      </NeonButton>
    </div>
  );
}
