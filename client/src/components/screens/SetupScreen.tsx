import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { MAX_PLAYERS, MIN_PLAYERS } from "@/lib/game-data";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const savedNamesKey = "savedPlayerNames";

export function SetupScreen() {
  const { gameState, setPlayers, setPlayerNames, setImposters, goToCategorySelect } = useGame();
  const [showTutorial, setShowTutorial] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [activeNameIndex, setActiveNameIndex] = useState<number | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(savedNamesKey);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setSavedNames(parsed.filter((name) => typeof name === "string"));
      }
    } catch {
      // Ignore corrupted local storage entries.
    }
  }, []);

  const persistSavedNames = (names: string[]) => {
    setSavedNames(names);
    if (typeof window !== "undefined") {
      localStorage.setItem(savedNamesKey, JSON.stringify(names));
    }
  };

  const handleSaveName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const alreadySaved = savedNames.some(
      (saved) => saved.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadySaved) return;
    persistSavedNames([...savedNames, trimmed]);
  };

  const handleRemoveSavedName = (name: string) => {
    persistSavedNames(savedNames.filter((saved) => saved !== name));
  };

  const handleUseSavedName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newNames = [...gameState.playerNames];
    const isReplaceable = (currentName: string, index: number) => {
      const normalized = currentName.trim().toLowerCase();
      if (!normalized) return true;
      return normalized === `player ${index + 1}`;
    };
    const hasActiveIndex =
      activeNameIndex !== null && activeNameIndex >= 0 && activeNameIndex < newNames.length;
    const maxFillIndex = Math.min(4, newNames.length);
    const replaceableIndex = newNames
      .slice(0, maxFillIndex)
      .findIndex((entry, index) => isReplaceable(entry, index));
    const targetIndex =
      hasActiveIndex && isReplaceable(newNames[activeNameIndex], activeNameIndex)
        ? activeNameIndex
        : replaceableIndex;
    if (targetIndex === -1) return;
    newNames[targetIndex] = trimmed;
    setPlayerNames(newNames);
    if (error) setError(null);
  };

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
    <div className="flex flex-col gap-6 max-w-sm mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3 relative">
        {portalRoot &&
          createPortal(
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => setShowTutorial(true)}
              className="fixed left-4 top-[calc(env(safe-area-inset-top)+0.75rem)] md:top-[calc(env(safe-area-inset-top)+1.5rem)] z-30"
              aria-label="How to play"
            >
              How to play
            </NeonButton>,
            portalRoot
          )}
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground tracking-tight">
          Imposter
        </h1>
        <p className="text-foreground/70 font-lato tracking-widest uppercase text-[10px] font-bold">
          All Categories
        </p>
      </div>

      <GlassCard className="space-y-6">
        {/* Player Count Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-playfair text-foreground flex items-center gap-3">
              Players
            </label>
            <span className="text-2xl font-playfair font-bold text-foreground">{gameState.players}</span>
          </div>
          <div className="flex gap-4">
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-background hover:bg-foreground/10 !border !border-black"
              onClick={() => handlePlayerChange(-1)}
              disabled={gameState.players <= MIN_PLAYERS}
            >
              -
            </NeonButton>
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-background hover:bg-foreground/10 !border !border-black"
              onClick={() => handlePlayerChange(1)}
              disabled={gameState.players >= MAX_PLAYERS}
            >
              +
            </NeonButton>
          </div>

          {/* Player Name Inputs */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/60 uppercase tracking-wider flex items-center gap-2">
              Player Names
            </label>
            <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 fade-in duration-300">
              {gameState.playerNames.map((name, idx) => (
                <div key={idx} className="flex gap-2 items-stretch">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    onFocus={() => setActiveNameIndex(idx)}
                    list="saved-player-names"
                    className={`w-full p-2 rounded-lg bg-background border text-sm font-lato outline-none transition-colors ${
                      !name.trim() && error 
                        ? 'border-foreground focus:border-foreground focus:ring-1 focus:ring-foreground' 
                        : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                    placeholder={`Player ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveName(name)}
                    disabled={!name.trim()}
                    className="px-2 text-[10px] font-lato uppercase tracking-widest rounded-lg border border-border text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-colors disabled:opacity-40 disabled:hover:text-foreground/60 disabled:hover:border-border"
                  >
                    Save
                  </button>
                </div>
              ))}
            </div>
            {error && (
              <p className="text-xs text-foreground font-bold text-center animate-in slide-in-from-top-1 fade-in">
                {error}
              </p>
            )}
            {savedNames.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-lato uppercase tracking-widest text-foreground/50">
                  Saved Players (tap to add)
                </p>
                <div className="flex flex-wrap gap-2">
                  {savedNames.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-lato text-foreground/70"
                    >
                      <button
                        type="button"
                        onClick={() => handleUseSavedName(name)}
                        className="hover:text-foreground transition-colors"
                      >
                        {name}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSavedName(name)}
                        className="text-foreground/40 hover:text-foreground/80 transition-colors"
                        aria-label={`Remove ${name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-border"></div>

        {/* Imposter Count Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-playfair text-foreground flex items-center gap-3">
              Imposters
            </label>
            <span className="text-2xl font-playfair font-bold text-accent">{gameState.imposters}</span>
          </div>
          <div className="flex gap-4">
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-background hover:bg-foreground/10 text-accent hover:text-accent !border !border-black"
              onClick={() => handleImposterChange(-1)}
              disabled={gameState.imposters <= 1}
            >
              -
            </NeonButton>
            <NeonButton 
              variant="ghost" 
              className="flex-1 bg-background hover:bg-foreground/10 text-accent hover:text-accent !border !border-black"
              onClick={() => handleImposterChange(1)}
              disabled={gameState.imposters >= gameState.players - 1}
            >
              +
            </NeonButton>
          </div>
        </div>

        <NeonButton 
          fullWidth 
          onClick={handleNextStep}
          className="mt-2 shadow-md"
        >
          Next Step
        </NeonButton>
      </GlassCard>
      <datalist id="saved-player-names">
        {savedNames.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/70 animate-in fade-in duration-300">
          <div className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-5 relative animate-in zoom-in-95 duration-300 border border-border">
            <button 
              onClick={() => setShowTutorial(false)}
              className="absolute right-4 top-4 px-2 py-1 text-xs font-lato font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground/80 transition-colors pressable"
            >
              Close
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-playfair font-bold text-foreground">How to Play</h3>
            </div>

            <div className="space-y-5 font-lato text-foreground/80 text-sm">
              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 text-foreground font-bold">1</div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Setup</h4>
                  <p className="text-sm">Choose the number of players and imposters, then pick a category.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 text-foreground font-bold">2</div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Reveal Roles</h4>
                  <p className="text-sm">Pass the device around. Crewmates see a secret word; Imposters see nothing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 text-foreground font-bold">3</div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Discuss & Vote</h4>
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
