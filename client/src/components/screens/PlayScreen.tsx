import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_STYLES, CategoryStyle } from "@/lib/game-data";
import { ArrowLeft, MessageSquare, Vote } from "lucide-react";

export function PlayScreen() {
  const { gameState, startVoting, goToRoleReveal } = useGame();
  const categoryStyle = gameState.category
    ? (CATEGORY_STYLES as Record<string, CategoryStyle>)[gameState.category]
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <NeonButton
        variant="ghost"
        size="sm"
        onClick={goToRoleReveal}
        className="self-start mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </NeonButton>
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-4xl font-playfair font-bold text-foreground">Discussion</h2>
        <p className="text-foreground/70 font-lato">
          Discuss and find the imposter among you.
        </p>
      </div>

      <GlassCard className="w-full p-8 space-y-10 bg-card shadow-xl border-border">
        <div className="flex flex-col items-center gap-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
            categoryStyle?.bgClass ?? 'bg-background'
          }`}>
            <MessageSquare className={`w-10 h-10 ${
              categoryStyle?.textClass ?? 'text-foreground/60'
            }`} />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-playfair font-bold text-foreground">Category: {gameState.category}</h3>
            <p className="text-sm text-foreground/60 font-lato">
              Crew members know the secret word.
            </p>
          </div>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <h4 className="font-lato font-bold text-xs text-foreground/60 uppercase tracking-widest mb-4 text-center">Instructions</h4>
          <ul className="text-foreground/80 space-y-3 font-lato text-sm leading-relaxed text-center">
            <li>Take turns describing the word.</li>
            <li>Imposters must lie to blend in.</li>
            <li>Vote when you are ready to accuse.</li>
          </ul>
        </div>

        <NeonButton 
          variant="destructive" 
          fullWidth 
          onClick={startVoting}
          className="gap-3 shadow-md hover:shadow-lg"
        >
          <Vote className="w-4 h-4" />
          Start Voting
        </NeonButton>
      </GlassCard>
    </div>
  );
}
