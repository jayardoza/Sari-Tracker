"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Stock, DailySale } from "@/types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SummaryPage() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [salesData, setSalesData] = useState<DailySale[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const yearPrefix = selectedYear.toString();
      const startDate = `${yearPrefix}-01-01`;
      const endDate = `${yearPrefix}-12-31`;

      const [stockRes, salesRes] = await Promise.all([
        supabase
          .from("stock")
          .select("*")
          .like("month_year", `${yearPrefix}-%`),
        supabase
          .from("daily_sales")
          .select("*")
          .gte("date", startDate)
          .lte("date", endDate),
      ]);

      if (stockRes.error) throw stockRes.error;
      if (salesRes.error) throw salesRes.error;

      setStockData(stockRes.data || []);
      setSalesData(salesRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchData();
  }, [selectedYear, fetchData]);

  const getMonthlySales = (month: number) => {
    const monthStr = String(month).padStart(2, "0");
    return salesData
      .filter((sale) => sale.date.startsWith(`${selectedYear}-${monthStr}`))
      .reduce((sum, sale) => sum + (sale.total_amount || 0), 0);
  };

  const getMonthlyVariance = (month: number) => {
    // Variance would need to come from stock data, not daily sales
    // For now, returning 0 as we don't have variance in daily_sales
    return 0;
  };

  const getMonthlyStockValue = (month: number) => {
    const monthStr = String(month).padStart(2, "0");
    const monthStock = stockData.filter((s) => s.month_year === `${selectedYear}-${monthStr}`);
    return monthStock.reduce((sum, s) => {
      const totalStock = (s.partial_stock || 0) + (s.additional_stock || 0) - (s.sale || 0);
      return sum + (totalStock * 0); // Would need price lookup
    }, 0);
  };

  const yearlyTotalSales = MONTHS.reduce(
    (sum, _, i) => sum + getMonthlySales(i + 1),
    0
  );
  const yearlyTotalVariance = MONTHS.reduce(
    (sum, _, i) => sum + getMonthlyVariance(i + 1),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Summary</h1>
          <p className="text-muted-foreground mt-2">
            Yearly overview and analysis
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Sales Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Sales Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 font-medium">Month</th>
                    <th className="text-right py-3 font-medium">Total Sale</th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHS.map((month, i) => {
                    const monthSales = getMonthlySales(i + 1);
                    return (
                      <tr
                        key={i}
                        className="border-b border-border hover:bg-secondary transition-colors"
                      >
                        <td className="py-3">{month}</td>
                        <td className="text-right py-3 font-medium">
                          ₱{monthSales.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Yearly Total</span>
                <span className="text-2xl font-bold">
                  ₱{yearlyTotalSales.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                Average Monthly Sale
              </p>
              <p className="text-3xl font-bold mt-2">
                ₱{(yearlyTotalSales / 12).toFixed(2)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                Total Year Sales
              </p>
              <p className="text-3xl font-bold mt-2">
                ₱{yearlyTotalSales.toFixed(2)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                Total Transactions
              </p>
              <p className="text-3xl font-bold mt-2">
                {salesData.length}
              </p>
            </div>
          </div>

          {/* Stock Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Stock Data</h2>
            <p className="text-muted-foreground">
              Total Stock Records: {stockData.length}
            </p>
            <div className="mt-4 text-sm">
              <p className="text-muted-foreground">
                Stock data is organized by month and category. Use the Stock
                page to view detailed information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
