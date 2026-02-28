"use client";

import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  Package,
  Tag,
  Calendar,
  Boxes,
  BarChart3,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "daily", label: "Daily Sales", icon: Calendar },
  { id: "stock", label: "Stock", icon: Boxes },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "summary", label: "Summary", icon: BarChart3 },
];

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative w-64 h-screen bg-card border-r border-border transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight">Sari-Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Inventory & Sales
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActivePage(item.id);
                      // Only close sidebar on mobile
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activePage === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
