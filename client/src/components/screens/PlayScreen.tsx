import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_STYLES, CategoryStyle } from "@/lib/game-data";
import { MessageSquare, Vote } from "lucide-react";

export function PlayScreen() {
  const { gameState, startVoting } = useGame();
  const categoryStyle = gameState.category
    ? (CATEGORY_STYLES as Record<string, CategoryStyle>)[gameState.category]
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-4xl font-playfair font-bold text-stone-800">Discussion</h2>
        <p className="text-stone-500 font-lato">
          Discuss and find the imposter among you.
        </p>
      </div>

      <GlassCard className="w-full p-8 space-y-10 bg-white shadow-xl border-stone-100">
        <div className="flex flex-col items-center gap-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
            categoryStyle?.bgClass ?? 'bg-stone-100'
          }`}>
            <MessageSquare className={`w-10 h-10 ${
              categoryStyle?.textClass ?? 'text-stone-400'
            }`} />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-playfair font-bold text-stone-800">Category: {gameState.category}</h3>
            <p className="text-sm text-stone-400 font-lato">
              Crew members know the secret word.
            </p>
          </div>
        </div>

        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
          <h4 className="font-lato font-bold text-xs text-stone-400 uppercase tracking-widest mb-4 text-center">Instructions</h4>
          <ul className="text-stone-600 space-y-3 font-lato text-sm leading-relaxed text-center">
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
