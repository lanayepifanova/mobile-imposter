import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export function VoteScreen() {
  const { gameState, resetGame, goToPlay } = useGame();
  const [revealedRoles, setRevealedRoles] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto animate-in fade-in duration-700">
      <NeonButton
        variant="ghost"
        size="sm"
        onClick={goToPlay}
        className="self-start mb-6 gap-2"
        disabled={revealedRoles}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </NeonButton>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-playfair font-bold text-stone-800 mb-3">
          {revealedRoles ? "The Truth" : "Who is it?"}
        </h2>
        <p className="text-stone-500 font-lato">
          {revealedRoles ? "Game Over" : "Tap a player to reveal their role."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-10">
        {gameState.playerRoles.map((role, index) => (
          <GlassCard 
            key={index}
            className={`flex flex-col items-center justify-center p-6 transition-all duration-500 border-2 ${
              revealedRoles 
                ? role === 'imposter' 
                  ? 'border-accent bg-accent/5' 
                  : 'border-primary bg-primary/5'
                : 'border-transparent hover:border-stone-200 hover:shadow-md cursor-pointer bg-white'
            }`}
            onClick={() => setRevealedRoles(true)}
          >
            <div className="text-xl font-playfair font-bold mb-2 text-stone-800 text-center">
              {gameState.playerNames[index]}
            </div>
            {revealedRoles ? (
              <span className={`font-bold font-lato uppercase text-xs tracking-widest ${
                role === 'imposter' ? 'text-accent' : 'text-primary'
              }`}>
                {role}
              </span>
            ) : (
              <span className="text-stone-300 text-xs font-lato">???</span>
            )}
          </GlassCard>
        ))}
      </div>

      {revealedRoles && (
        <div className="w-full space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <GlassCard className="text-center p-8 border-stone-100 bg-white shadow-xl">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-4 font-bold">The Secret Word Was</p>
            <p className="text-4xl font-playfair font-bold text-stone-800">{gameState.secretWord}</p>
          </GlassCard>
          
          <NeonButton fullWidth onClick={resetGame} className="shadow-lg">
            Play Again
          </NeonButton>
        </div>
      )}
    </div>
  );
}
