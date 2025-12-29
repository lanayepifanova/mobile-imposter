import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  fullWidth?: boolean;
}

// Renamed logic to ElegantButton
export function NeonButton({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'default',
  fullWidth = false,
  ...props 
}: NeonButtonProps) {
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
    ghost: "bg-transparent hover:bg-foreground/10 text-foreground/80 hover:text-foreground",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-xs rounded-full",
    default: "h-12 px-8 py-2 rounded-full",
    lg: "h-16 px-10 text-lg rounded-full",
    icon: "h-10 w-10 rounded-full",
  };

  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 font-lato font-bold tracking-wide uppercase border-none",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
