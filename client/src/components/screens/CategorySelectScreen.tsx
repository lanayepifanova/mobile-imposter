import { CustomCategoryDialog } from "@/components/CustomCategoryDialog";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useGame } from "@/contexts/GameContext";
import { CATEGORY_DESCRIPTIONS, CATEGORY_IMAGE_ICONS, CATEGORY_STYLES, CATEGORIES } from "@/lib/game-data";
import { CATEGORY_ICON_COMPONENTS } from "@/lib/category-ui";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

export function CategorySelectScreen() {
  const { startGame, customCategories, goToSetup } = useGame();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto w-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex flex-col items-center text-center space-y-3">
        <NeonButton
          variant="ghost"
          size="sm"
          onClick={goToSetup}
          className="self-start gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </NeonButton>
        <h2 className="text-4xl font-playfair font-bold text-stone-800">Select Discipline</h2>
        <p className="text-stone-500 font-lato">Choose the field of study for this round.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-20">
        {/* Standard Categories */}
        {CATEGORIES.map((cat) => {
          const categoryStyle = CATEGORY_STYLES[cat];
          const categoryImage = CATEGORY_IMAGE_ICONS[cat];
          const CategoryIcon = CATEGORY_ICON_COMPONENTS[cat];

          return (
          <GlassCard 
            key={cat}
            hoverEffect
            onClick={() => startGame(cat)}
            className="flex items-center gap-6 p-5 group border-transparent hover:border-stone-200"
          >
            <div className={`w-16 h-16 rounded-2xl p-3 transition-colors duration-300 ${categoryStyle.bgClass} ${categoryStyle.bgHoverClass}`}>
              {categoryImage ? (
                <img 
                  src={categoryImage} 
                  alt={cat}
                  className="w-full h-full object-contain"
                />
              ) : CategoryIcon ? (
                <CategoryIcon className={`w-full h-full ${categoryStyle.textClass}`} />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-2xl font-bold text-stone-400">?</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-playfair text-stone-800">{cat}</h3>
              <p className="text-xs text-stone-400 font-lato uppercase tracking-wider mt-1">
                {CATEGORY_DESCRIPTIONS[cat]}
              </p>
            </div>
            <div className="text-stone-300 group-hover:text-stone-800 transition-colors">
              &rarr;
            </div>
          </GlassCard>
        )})}

        {/* Custom Categories */}
        {Object.keys(customCategories).map((cat) => (
          <GlassCard 
            key={cat}
            hoverEffect
            onClick={() => startGame(cat)}
            className="flex items-center gap-6 p-5 group border-transparent hover:border-stone-200"
          >
            <div className="w-16 h-16 rounded-2xl p-3 transition-colors duration-300 bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-stone-400 group-hover:text-stone-600">?</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-playfair text-stone-800">{cat}</h3>
              <p className="text-xs text-stone-400 font-lato uppercase tracking-wider mt-1">
                Custom Category
              </p>
            </div>
            <div className="text-stone-300 group-hover:text-stone-800 transition-colors">
              &rarr;
            </div>
          </GlassCard>
        ))}

        {/* Create New Button */}
        <button
          onClick={() => setIsCustomDialogOpen(true)}
          className="w-full p-4 rounded-3xl border-2 border-dashed border-stone-300 text-stone-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 font-bold font-lato uppercase tracking-wider"
        >
          <Plus className="w-5 h-5" />
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
