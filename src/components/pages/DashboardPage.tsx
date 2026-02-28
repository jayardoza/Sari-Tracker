"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Price, Stock } from "@/types";
import { format } from "date-fns";

export default function DashboardPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [stockValue, setStockValue] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [itemsSoldToday, setItemsSoldToday] = useState(0);
  const [stockVariance, setStockVariance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const currentMonth = format(new Date(), "yyyy-MM");
      const today = format(new Date(), "yyyy-MM-dd");

      // Get current month date range
      const [year, month] = currentMonth.split("-");
      const startDate = `${year}-${month}-01`;
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const [
        productsRes,
        pricesRes,
        stockRes,
        dailySalesRes,
        monthlySalesRes,
      ] = await Promise.all([
        supabase.from("products").select("id"),
        supabase.from("prices").select("*"),
        supabase.from("stock").select("*").eq("month_year", currentMonth),
        supabase
          .from("daily_sales")
          .select("*")
          .eq("date", today),
        supabase
          .from("daily_sales")
          .select("*")
          .gte("date", startDate)
          .lte("date", formattedEndDate),
      ]);

      // Total products
      setTotalProducts(productsRes.data?.length || 0);

      // Calculate stock value and variance
      const priceMap = new Map<string, number>();
      (pricesRes.data || []).forEach((price: Price) => {
        priceMap.set(price.product_id, price.price);
      });

      let totalValue = 0;
      let totalVariance = 0;
      (stockRes.data || []).forEach((stock: Stock) => {
        const price = priceMap.get(stock.product_id) || 0;
        const totalStock = (stock.partial_stock || 0) + (stock.additional_stock || 0) - (stock.sale || 0);
        totalValue += totalStock * price;
        totalVariance += (stock.variance || 0) * price;
      });
      setStockValue(totalValue);
      setStockVariance(totalVariance);

      // Today's sales
      let todayTotal = 0;
      let todayItems = 0;
      (dailySalesRes.data || []).forEach((sale) => {
        todayTotal += sale.total_amount || 0;
        todayItems += sale.quantity_sold || 0;
      });
      setTodaySales(todayTotal);
      setItemsSoldToday(todayItems);

      // Monthly sales
      let monthTotal = 0;
      (monthlySalesRes.data || []).forEach((sale) => {
        monthTotal += sale.total_amount || 0;
      });
      setMonthlySales(monthTotal);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to Sari-Tracker
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={loading ? "..." : totalProducts.toString()}
          change="Products"
        />
        <StatCard
          title="Monthly Sales"
          value={loading ? "..." : `₱${monthlySales.toFixed(2)}`}
          change="This Month"
        />
        <StatCard
          title="Stock Value"
          value={loading ? "..." : `₱${stockValue.toFixed(2)}`}
          change="Current Value"
        />
        <StatCard
          title="Categories"
          value="19"
          change="Complete"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Today&apos;s Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Today&apos;s Sales</span>
              <span className="font-medium">₱{todaySales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Items Sold Today
              </span>
              <span className="font-medium">{itemsSoldToday}</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock Value</span>
              <span className="font-medium">₱{stockValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Stock Variance
              </span>
              <span className={`font-medium ${stockVariance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ₱{stockVariance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-2">{change}</p>
    </div>
  );
}
