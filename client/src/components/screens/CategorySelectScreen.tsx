import { CustomCategoryDialog } from "@/components/CustomCategoryDialog";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_DESCRIPTIONS, CATEGORIES } from "@/lib/game-data";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function CategorySelectScreen() {
  const { startGame, customCategories, goToSetup } = useGame();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-sm mx-auto w-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex flex-col items-center text-center space-y-3">
        {portalRoot &&
          createPortal(
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={goToSetup}
              className="fixed left-4 top-[env(safe-area-inset-top)] z-30"
            >
              Back
            </NeonButton>,
            portalRoot
          )}
        <h2 className="text-3xl font-playfair font-bold text-foreground">Select Discipline</h2>
        <p className="text-foreground/70 font-lato text-sm">Choose the field of study for this round.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 pb-16">
        {/* Standard Categories */}
        {CATEGORIES.map((cat) => {
          return (
          <GlassCard 
            key={cat}
            hoverEffect
            onClick={() => startGame(cat)}
            className="flex items-center gap-3 p-3 group border-transparent hover:border-foreground/40 ink-wash-card"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold font-playfair text-foreground">{cat}</h3>
              <p className="text-[11px] text-foreground/60 font-lato uppercase tracking-wider mt-1">
                {CATEGORY_DESCRIPTIONS[cat]}
              </p>
            </div>
          </GlassCard>
        )})}

        {/* Custom Categories */}
        {Object.keys(customCategories).map((cat) => (
          <GlassCard 
            key={cat}
            hoverEffect
            onClick={() => startGame(cat)}
            className="flex items-center gap-3 p-3 group border-transparent hover:border-foreground/40 ink-wash-card"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold font-playfair text-foreground">{cat}</h3>
              <p className="text-[11px] text-foreground/60 font-lato uppercase tracking-wider mt-1">
                Custom Category
              </p>
            </div>
          </GlassCard>
        ))}

        {/* Create New Button */}
        <button
          onClick={() => setIsCustomDialogOpen(true)}
          className="w-full p-3 rounded-2xl border border-dashed border-border text-foreground/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center font-bold font-lato uppercase tracking-wider text-xs pressable"
        >
          Create Custom Category
        </button>
      </div>

      <CustomCategoryDialog 
        isOpen={isCustomDialogOpen} 
        onClose={() => setIsCustomDialogOpen(false)} 
      />
    </div>
  );
}
