import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { MAX_PLAYERS, MIN_PLAYERS } from "@/lib/game-data";
import { ArrowRight, Edit2, HelpCircle, Minus, Plus, Users, UserX, X } from "lucide-react";
import { useState } from "react";

export function SetupScreen() {
  const { gameState, setPlayers, setPlayerNames, setImposters, goToCategorySelect } = useGame();
  const [showTutorial, setShowTutorial] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlayerChange = (delta: number) => {
    const newCount = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, gameState.players + delta));
    setPlayers(newCount);
    if (gameState.imposters >= newCount) {
      setImposters(Math.max(1, newCount - 1));
    }
  };

  const handleImposterChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(gameState.players - 1, gameState.imposters + delta));
    setImposters(newCount);
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...gameState.playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
    if (error) setError(null);
  };

  const handleNextStep = () => {
    // Validate names
    const emptyNames = gameState.playerNames.some(name => !name.trim());
    if (emptyNames) {
      setError("All players must have a name!");
      return;
    }
    goToCategorySelect();
  };

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3 relative">
        <button 
          onClick={() => setShowTutorial(true)}
          className="absolute right-0 top-0 p-2 text-stone-400 hover:text-primary transition-colors"
          aria-label="How to play"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-stone-800 tracking-tight">
          Imposter
        </h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full opacity-50"></div>
        <p className="text-stone-500 font-lato tracking-widest uppercase text-xs font-bold">
          All Categories
        </p>
      </div>

      <GlassCard className="space-y-8">
        {/* Player Count Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-playfair text-stone-700 flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full text-primary-foreground">
                <Users className="w-4 h-4 text-primary" />
              </div>
              Players
            </label>
            <span className="text-3xl font-playfair font-bold text-stone-800">{gameState.players}</span>
          </div>
          <div className="flex gap-4">
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-stone-50 hover:bg-stone-100"
              onClick={() => handlePlayerChange(-1)}
              disabled={gameState.players <= MIN_PLAYERS}
            >
              <Minus className="w-5 h-5" />
            </NeonButton>
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-stone-50 hover:bg-stone-100"
              onClick={() => handlePlayerChange(1)}
              disabled={gameState.players >= MAX_PLAYERS}
            >
              <Plus className="w-5 h-5" />
            </NeonButton>
          </div>

          {/* Player Name Inputs */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <Edit2 className="w-3 h-3" />
              Player Names
            </label>
            <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 fade-in duration-300">
              {gameState.playerNames.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  className={`w-full p-2 rounded-lg bg-stone-50 border text-sm font-lato outline-none transition-colors ${
                    !name.trim() && error 
                      ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                  placeholder={`Player ${idx + 1}`}
                />
              ))}
            </div>
            {error && (
              <p className="text-xs text-red-500 font-bold text-center animate-in slide-in-from-top-1 fade-in">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-stone-100"></div>

        {/* Imposter Count Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-playfair text-stone-700 flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-full text-accent-foreground">
                <UserX className="w-4 h-4 text-accent" />
              </div>
              Imposters
            </label>
            <span className="text-3xl font-playfair font-bold text-accent">{gameState.imposters}</span>
          </div>
          <div className="flex gap-4">
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-stone-50 hover:bg-stone-100 text-accent hover:text-accent"
              onClick={() => handleImposterChange(-1)}
              disabled={gameState.imposters <= 1}
            >
              <Minus className="w-5 h-5" />
            </NeonButton>
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-stone-50 hover:bg-stone-100 text-accent hover:text-accent"
              onClick={() => handleImposterChange(1)}
              disabled={gameState.imposters >= gameState.players - 1}
            >
              <Plus className="w-5 h-5" />
            </NeonButton>
          </div>
        </div>

        <NeonButton 
          fullWidth 
          onClick={handleNextStep}
          className="mt-4 gap-2 shadow-md"
        >
          Next Step <ArrowRight className="w-4 h-4" />
        </NeonButton>
      </GlassCard>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-300 border border-stone-100">
            <button 
              onClick={() => setShowTutorial(false)}
              className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-playfair font-bold text-stone-800">How to Play</h3>
              <div className="h-1 w-12 bg-primary mx-auto rounded-full mt-2 opacity-50"></div>
            </div>

            <div className="space-y-6 font-lato text-stone-600">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-1">Setup</h4>
                  <p className="text-sm">Choose the number of players and imposters, then pick a category.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary font-bold">2</div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-1">Reveal Roles</h4>
                  <p className="text-sm">Pass the device around. Crewmates see a secret word; Imposters see nothing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold">3</div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-1">Discuss & Vote</h4>
                  <p className="text-sm">Describe the word without giving it away. Vote to eliminate the imposter!</p>
                </div>
              </div>
            </div>

            <NeonButton 
              fullWidth 
              onClick={() => setShowTutorial(false)}
              className="mt-8"
            >
              Got it!
            </NeonButton>
          </div>
        </div>
      )}
    </div>
  );
}
