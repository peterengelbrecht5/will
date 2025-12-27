import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, children, variant = "primary", isLoading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "relative px-8 py-4 font-display font-bold uppercase tracking-widest text-sm transition-all duration-300 clip-path-polygon group overflow-hidden",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          
          variant === "primary" && "bg-primary text-white hover:bg-primary/80 shadow-[0_0_20px_-5px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.8)]",
          variant === "secondary" && "bg-secondary text-black hover:bg-secondary/80 shadow-[0_0_20px_-5px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.8)]",
          variant === "outline" && "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-primary/50",
          
          className
        )}
        style={{
          clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
        }}
        {...props}
      >
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:animate-scan" />
        
        <span className="relative flex items-center justify-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {children}
        </span>
      </button>
    );
  }
);
CyberButton.displayName = "CyberButton";
