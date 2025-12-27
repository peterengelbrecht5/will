import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2 group">
        <Label className={cn(
          "text-sm uppercase tracking-widest text-muted-foreground transition-colors group-focus-within:text-primary",
          error && "text-destructive group-focus-within:text-destructive"
        )}>
          {label}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            className={cn(
              "bg-background/50 border-white/10 h-12 rounded-none border-l-2 focus-visible:ring-0 focus-visible:border-l-primary transition-all duration-300",
              "placeholder:text-muted-foreground/30 font-mono",
              error && "border-destructive/50 focus-visible:border-l-destructive",
              icon && "pl-10",
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-focus-within:border-primary transition-colors" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-focus-within:border-primary transition-colors" />
        </div>
        {error && (
          <p className="text-xs text-destructive font-mono animate-in slide-in-from-left-1">
            ⚠ {error}
          </p>
        )}
      </div>
    );
  }
);
CyberInput.displayName = "CyberInput";
