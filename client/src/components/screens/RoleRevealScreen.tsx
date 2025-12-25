import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_IMAGE_ICONS, CATEGORY_STYLES, Category, CategoryStyle } from "@/lib/game-data";
import { CATEGORY_ICON_COMPONENTS } from "@/lib/category-ui";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function RoleRevealScreen() {
  const { gameState, nextPlayer, goToCategorySelect } = useGame();
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayerRole = gameState.playerRoles[gameState.currentPlayerIndex];
  const isImposter = currentPlayerRole === 'imposter';
  const categoryStyle = gameState.category
    ? (CATEGORY_STYLES as Record<string, CategoryStyle>)[gameState.category]
    : undefined;
  const categoryImage = gameState.category
    ? (CATEGORY_IMAGE_ICONS as Record<string, string | undefined>)[gameState.category]
    : undefined;
  const CategoryIcon = gameState.category
    ? CATEGORY_ICON_COMPONENTS[gameState.category as Category]
    : undefined;

  const handleNext = () => {
    setIsRevealed(false);
    nextPlayer();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto animate-in fade-in duration-500">
      <NeonButton
        variant="ghost"
        size="sm"
        onClick={goToCategorySelect}
        className="self-start mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </NeonButton>
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-playfair font-bold text-stone-800">
          {gameState.playerNames[gameState.currentPlayerIndex]}
        </h2>
        <p className="text-stone-500 font-lato">
          {isRevealed ? "Memorize your secret word" : "Tap the card to reveal your role"}
        </p>
      </div>

      <GlassCard className="w-full aspect-[3/4] flex flex-col items-center justify-center relative overflow-hidden group bg-white shadow-xl border-stone-100">
        {!isRevealed ? (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50/50 backdrop-blur-sm z-10 cursor-pointer transition-all hover:bg-stone-50/30"
            onClick={() => setIsRevealed(true)}
          >
            <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
              <Eye className="w-8 h-8 text-stone-400" />
            </div>
            <p className="font-lato text-sm font-bold tracking-widest text-stone-400 uppercase">Tap to Reveal</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-8 p-4 animate-in zoom-in duration-500">
            {isImposter ? (
              <>
                <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center">
                  <EyeOff className="w-12 h-12 text-accent" />
                </div>
                <div>
                  <h3 className="text-4xl font-playfair font-bold text-accent mb-3">Imposter</h3>
                  <p className="text-stone-500 font-lato italic">Blend in. Don't get caught.</p>
                </div>
              </>
            ) : (
              <>
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  categoryStyle?.bgClass ?? 'bg-stone-100'
                }`}>
                  {categoryImage ? (
                    <img 
                      src={categoryImage} 
                      alt="Category"
                      className="w-16 h-16 object-contain opacity-90"
                    />
                  ) : CategoryIcon ? (
                    <CategoryIcon className={`w-16 h-16 ${categoryStyle?.textClass ?? 'text-stone-400'}`} />
                  ) : (
                    <span className="text-4xl font-bold text-stone-400">?</span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-lato font-bold text-stone-400 tracking-widest uppercase mb-4">Secret Word</h3>
                  <div className="relative">
                    <span className="absolute -top-4 -left-4 text-6xl text-stone-100 font-serif">"</span>
                    <p className="text-4xl font-playfair font-bold text-stone-800 relative z-10">
                      {gameState.secretWord}
                    </p>
                    <span className="absolute -bottom-8 -right-4 text-6xl text-stone-100 font-serif">"</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </GlassCard>

      {isRevealed && (
        <NeonButton 
          className="mt-10 w-full shadow-lg" 
          onClick={handleNext}
        >
          {gameState.currentPlayerIndex + 1 < gameState.players ? "Next Player" : "See Who Goes First"}
        </NeonButton>
      )}
    </div>
  );
}
