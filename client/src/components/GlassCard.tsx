import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

// Renamed internally to PaperCard logic but keeping filename to avoid refactoring imports everywhere for now
export function GlassCard({ children, className, hoverEffect = false, onClick }: GlassCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white shadow-sm border border-stone-100 rounded-3xl p-8 transition-all duration-500",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1 cursor-pointer hover:border-stone-200",
        className
      )}
    >
      {children}
    </div>
  );
}
