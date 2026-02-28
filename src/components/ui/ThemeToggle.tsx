"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-secondary text-foreground">
        <span className="font-medium text-sm">Light</span>
        <Sun size={18} />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-secondary text-foreground hover:bg-muted transition-colors"
    >
      <span className="font-medium text-sm">
        {isDark ? "Dark" : "Light"}
      </span>
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
