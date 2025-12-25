import { Category } from "@/lib/game-data";
import { Atom, PawPrint } from "lucide-react";
import { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string }>;

export const CATEGORY_ICON_COMPONENTS: Partial<Record<Category, IconComponent>> = {
  Science: Atom,
  Animals: PawPrint
};
