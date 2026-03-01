"use client";


import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-secondary text-foreground hover:bg-muted transition-colors"
    >
      <span className="font-medium text-sm">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
      {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
