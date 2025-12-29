import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function VoteScreen() {
  const { gameState, resetGame, goToStartPlayer } = useGame();
  const [revealedRoles, setRevealedRoles] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-sm mx-auto animate-in fade-in duration-700">
      {portalRoot &&
        createPortal(
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={goToStartPlayer}
            className="fixed left-4 top-[env(safe-area-inset-top)] z-30"
            disabled={revealedRoles}
          >
            Back
          </NeonButton>,
          portalRoot
        )}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
          {revealedRoles ? "The Truth" : "Who is it?"}
        </h2>
        <p className="text-foreground/70 font-lato text-sm">
          {revealedRoles ? "Game Over" : "Tap a player to reveal their role."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full mb-8">
        {gameState.playerRoles.map((role, index) => (
          <GlassCard 
            key={index}
            className={`flex flex-col items-center justify-center p-3 transition-all duration-500 border ${
              revealedRoles 
                ? role === 'imposter' 
                  ? 'border-accent bg-accent/5' 
                  : 'border-primary bg-primary/5'
                : 'border-transparent hover:border-foreground/40 hover:shadow-md cursor-pointer bg-card ink-wash-card'
            }`}
            onClick={() => setRevealedRoles(true)}
          >
            <div className="text-sm font-playfair font-bold mb-1 text-foreground text-center">
              {gameState.playerNames[index]}
            </div>
            {revealedRoles ? (
              <span className={`font-bold font-lato uppercase text-xs tracking-widest ${
                role === 'imposter' ? 'text-accent' : 'text-primary'
              }`}>
                {role}
              </span>
            ) : (
              <span className="text-foreground/50 text-xs font-lato">Hidden</span>
            )}
          </GlassCard>
        ))}
      </div>

      {revealedRoles && (
        <div className="w-full space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <GlassCard className="text-center p-4 border-border bg-card shadow-xl ink-wash-card">
            <p className="text-[11px] text-foreground/60 uppercase tracking-widest mb-3 font-bold">The Secret Word Was</p>
            <p className="text-2xl font-playfair font-bold text-foreground">{gameState.secretWord}</p>
          </GlassCard>
          
          <NeonButton fullWidth onClick={resetGame} className="shadow-lg">
            Play Again
          </NeonButton>
        </div>
      )}
    </div>
  );
}
