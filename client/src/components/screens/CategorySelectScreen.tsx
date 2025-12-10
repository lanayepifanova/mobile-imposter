import { CustomCategoryDialog } from "@/components/CustomCategoryDialog";
import { GlassCard } from "@/components/GlassCard";
import { useGame } from "@/contexts/GameContext";
import { CATEGORIES } from "@/lib/game-data";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CategorySelectScreen() {
  const { startGame, customCategories } = useGame();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto w-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-playfair font-bold text-stone-800">Select Discipline</h2>
        <p className="text-stone-500 font-lato">Choose the field of study for this round.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-20">
        {/* Standard Categories */}
        {CATEGORIES.map((cat) => (
          <GlassCard 
            key={cat}
            hoverEffect
            onClick={() => startGame(cat)}
            className="flex items-center gap-6 p-5 group border-transparent hover:border-stone-200"
          >
            <div className={`w-16 h-16 rounded-2xl p-3 transition-colors duration-300 ${
              cat === 'Math' ? 'bg-primary/10 group-hover:bg-primary/20' :
              cat === 'Physics' ? 'bg-secondary/10 group-hover:bg-secondary/20' :
              cat === 'Chemistry' ? 'bg-accent/10 group-hover:bg-accent/20' :
              'bg-[var(--category-objects)]/10 group-hover:bg-[var(--category-objects)]/20'
            }`}>
              <img 
                src={`/images/icon_${cat.toLowerCase()}_pastel.png`} 
                alt={cat}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-playfair text-stone-800">{cat}</h3>
              <p className="text-xs text-stone-400 font-lato uppercase tracking-wider mt-1">
                {cat === 'Math' && 'Calculus • Geometry • Algebra'}
                {cat === 'Physics' && 'Quantum • Gravity • Forces'}
                {cat === 'Chemistry' && 'Elements • Reactions • Bonds'}
                {cat === 'Objects' && 'Everyday Items • Tools • Furniture'}
              </p>
            </div>
            <div className="text-stone-300 group-hover:text-stone-800 transition-colors">
              &rarr;
            </div>
          </GlassCard>
        ))}

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
