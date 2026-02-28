"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/components/pages/Dashboard";

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto">
        <Dashboard activePage={activePage} />
      </main>
    </div>
  );
}
