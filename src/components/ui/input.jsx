import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard Input Component for FinDash.
 * Optimized for high-contrast visibility in both light and dark modes.
 */
function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 1. Layout & Typography
        "h-10 w-full min-w-0 rounded-xl border border-input bg-transparent px-4 py-2 transition-all outline-none",
        "text-base md:text-sm", 
        
        // 2. Color Logic (CRITICAL: Fixes the 'hidden' text in dark mode)
        "text-foreground placeholder:text-muted-foreground",
        
        // 3. States & Focus (Cinematic Glow)
        "focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        
        // 4. Dark Mode Specifics (Glassy feel)
        "dark:bg-white/5 dark:hover:bg-white/10 dark:focus:bg-white/10",
        "dark:border-white/10 dark:focus-visible:border-indigo-500/50",
        
        // 5. File Input Handling
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        
        // 6. Error States
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50",
        
        className
      )}
      {...props}
    />
  );
}

export { Input };