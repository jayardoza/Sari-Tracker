"use client";

import DashboardPage from "@/components/pages/DashboardPage";
import ProductsPage from "@/components/pages/ProductsPage";
import PricingPage from "@/components/pages/PricingPage";
import DailyPage from "@/components/pages/DailyPage";
import StockPage from "@/components/pages/StockPage";
import SalesPage from "@/components/pages/SalesPage";
import SummaryPage from "@/components/pages/SummaryPage";

interface DashboardProps {
  activePage: string;
}

export default function Dashboard({ activePage }: DashboardProps) {
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "products":
        return <ProductsPage />;
      case "pricing":
        return <PricingPage />;
      case "daily":
        return <DailyPage />;
      case "stock":
        return <StockPage />;
      case "sales":
        return <SalesPage />;
      case "summary":
        return <SummaryPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="h-full p-8 pt-20 lg:pt-8">
      {renderPage()}
    </div>
  );
}
