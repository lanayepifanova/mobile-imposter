import { Category } from "@/lib/game-data";
import { Flag, Globe, GraduationCap, Heart, PawPrint } from "lucide-react";
import { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string }>;

export const CATEGORY_ICON_COMPONENTS: Partial<Record<Category, IconComponent>> = {
  Emotions: Heart,
  'College Majors': GraduationCap,
  'Red Flags': Flag,
  Animals: PawPrint,
  Geography: Globe
};
