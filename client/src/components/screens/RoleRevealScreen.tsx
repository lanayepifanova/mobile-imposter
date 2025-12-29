import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_STYLES, CategoryStyle } from "@/lib/game-data";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function RoleRevealScreen() {
  const { gameState, nextPlayer, prevPlayer } = useGame();
  const [isRevealed, setIsRevealed] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const currentPlayerRole = gameState.playerRoles[gameState.currentPlayerIndex];
  const isImposter = currentPlayerRole === 'imposter';
  const categoryStyle = gameState.category
    ? (CATEGORY_STYLES as Record<string, CategoryStyle>)[gameState.category]
    : undefined;
  const handleNext = () => {
    setIsRevealed(false);
    nextPlayer();
  };

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-sm mx-auto animate-in fade-in duration-500">
      {portalRoot &&
        createPortal(
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={prevPlayer}
            className="fixed left-4 top-[env(safe-area-inset-top)] z-30"
          >
            Back
          </NeonButton>,
          portalRoot
        )}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-playfair font-bold text-foreground">
          {gameState.playerNames[gameState.currentPlayerIndex]}
        </h2>
        <p className="text-foreground/70 font-lato text-sm">
          {isRevealed ? "Memorize your secret word" : "Tap the card to reveal your role"}
        </p>
      </div>

      <GlassCard className="w-full max-w-[260px] mx-auto aspect-[4/5] flex flex-col items-center justify-center relative overflow-hidden group bg-card shadow-xl border-border ink-wash-card">
        {!isRevealed ? (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-10 cursor-pointer transition-all hover:bg-background/30"
            onClick={() => setIsRevealed(true)}
          >
            <p className="font-lato text-sm font-bold tracking-widest text-foreground/60 uppercase">Tap to Reveal</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-6 p-4 animate-in zoom-in duration-500">
            {isImposter ? (
              <>
                <div>
                  <h3 className="text-3xl font-playfair font-bold text-accent mb-2">Imposter</h3>
                  <p className="text-foreground/70 font-lato text-sm italic">Blend in. Don't get caught.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-lato font-bold text-foreground/60 tracking-widest uppercase mb-4">Secret Word</h3>
                  <div className="relative">
                    <p className="text-3xl font-playfair font-bold text-foreground relative z-10">
                      {gameState.secretWord}
                    </p>
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
