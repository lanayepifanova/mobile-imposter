import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_STYLES, CategoryStyle } from "@/lib/game-data";

export function PlayScreen() {
  const { gameState, startVoting, goToRoleReveal } = useGame();
  const categoryStyle = gameState.category
    ? (CATEGORY_STYLES as Record<string, CategoryStyle>)[gameState.category]
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <NeonButton
        variant="ghost"
        size="sm"
        onClick={goToRoleReveal}
        className="fixed left-4 top-4 z-10"
      >
        Back
      </NeonButton>
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl font-playfair font-bold text-foreground">Discussion</h2>
        <p className="text-foreground/70 font-lato text-sm">
          Discuss and find the imposter among you.
        </p>
      </div>

      <GlassCard className="w-full p-4 space-y-6 bg-card shadow-xl border-border">
        <div className="flex flex-col items-center gap-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            categoryStyle?.bgClass ?? 'bg-background'
          }`}>
            <span className={`text-xs font-bold tracking-widest ${categoryStyle?.textClass ?? 'text-foreground/60'}`}>
              TALK
            </span>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-playfair font-bold text-foreground">Category: {gameState.category}</h3>
            <p className="text-xs text-foreground/60 font-lato">
              Crew members know the secret word.
            </p>
          </div>
        </div>

        <div className="bg-background rounded-xl p-4 border border-border">
          <h4 className="font-lato font-bold text-[11px] text-foreground/60 uppercase tracking-widest mb-3 text-center">Instructions</h4>
          <ul className="text-foreground/80 space-y-2 font-lato text-xs leading-relaxed text-center">
            <li>Take turns describing the word.</li>
            <li>Imposters must lie to blend in.</li>
            <li>Vote when you are ready to accuse.</li>
          </ul>
        </div>

        <NeonButton 
          variant="destructive" 
          fullWidth 
          onClick={startVoting}
          className="shadow-md hover:shadow-lg"
        >
          Start Voting
        </NeonButton>
      </GlassCard>
    </div>
  );
}
