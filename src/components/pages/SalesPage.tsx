"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { DailySale, DailySalesRecord } from "@/types";
import { format, parse, getDaysInMonth } from "date-fns";
import { Save, Trash2 } from "lucide-react";

export default function SalesPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const [dailySales, setDailySales] = useState<DailySale[]>([]);
  const [salesRecords, setSalesRecords] = useState<Map<string, DailySalesRecord>>(
    new Map()
  );
  const [physicalCount, setPhysicalCount] = useState<Map<string, number>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [year, month] = selectedMonth.split("-");
      const startDate = `${year}-${month}-01`;
      const endDate = new Date(
        parseInt(year),
        parseInt(month),
        0
      );
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const [salesRes, recordsRes] = await Promise.all([
        supabase
          .from("daily_sales")
          .select("*")
          .gte("date", startDate)
          .lte("date", formattedEndDate)
          .order("date"),
        supabase
          .from("daily_sales_records")
          .select("*")
          .gte("date", startDate)
          .lte("date", formattedEndDate),
      ]);

      if (salesRes.error) throw salesRes.error;
      if (recordsRes.error) throw recordsRes.error;

      setDailySales(salesRes.data || []);

      const recordsMap = new Map<string, DailySalesRecord>();
      const countMap = new Map<string, number>();
      (recordsRes.data || []).forEach((record: DailySalesRecord) => {
        recordsMap.set(record.date, record);
        countMap.set(record.date, record.physical_count);
      });
      setSalesRecords(recordsMap);
      setPhysicalCount(countMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, fetchData]);

  const getDatesInMonth = () => {
    const [year, month] = selectedMonth.split("-");
    const daysInMonth = getDaysInMonth(
      parse(selectedMonth, "yyyy-MM", new Date())
    );
    const dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(
        format(new Date(parseInt(year), parseInt(month) - 1, day), "yyyy-MM-dd")
      );
    }
    return dates;
  };

  const getDailySalesTotal = (date: string) => {
    return dailySales
      .filter((sale) => sale.date === date)
      .reduce((sum, sale) => sum + sale.total_amount, 0);
  };

  const handlePhysicalCountChange = (date: string, value: string) => {
    const newCount = new Map(physicalCount);
    const numValue = parseFloat(value) || 0;
    newCount.set(date, numValue);
    setPhysicalCount(newCount);
  };

  const handleSave = async (date: string) => {
    try {
      const totalSale = getDailySalesTotal(date);
      const count = physicalCount.get(date) || 0;
      const variance = count - totalSale;
      const existing = salesRecords.get(date);

      if (existing) {
        const { error } = await supabase
          .from("daily_sales_records")
          .update({ physical_count: count, variance })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("daily_sales_records")
          .insert([
            {
              date,
              total_sale: totalSale,
              physical_count: count,
              variance,
            },
          ]);

        if (error) throw error;
      }

      fetchData();
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleDelete = async (date: string) => {
    try {
      const existing = salesRecords.get(date);
      if (!existing) return;

      const { error } = await supabase
        .from("daily_sales_records")
        .delete()
        .eq("id", existing.id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const dates = getDatesInMonth();
  const monthlyTotal = dates.reduce((sum, date) => sum + getDailySalesTotal(date), 0);
  const monthlyPhysical = Array.from(physicalCount.values()).reduce(
    (sum, val) => sum + val,
    0
  );
  const monthlyVariance = monthlyPhysical - monthlyTotal;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Sales</h1>
          <p className="text-muted-foreground mt-2">
            Daily and monthly sales tracking
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Month
          </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-right py-3 px-4 font-medium">
                    Total Sale
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Physical Count
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Variance
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dates.map((date) => {
                  const totalSale = getDailySalesTotal(date);
                  const count = physicalCount.get(date) || 0;
                  const variance = count - totalSale;

                  return (
                    <tr
                      key={date}
                      className="border-b border-border hover:bg-secondary transition-colors"
                    >
                      <td className="py-3 px-4">{format(parse(date, "yyyy-MM-dd", new Date()), "MMM dd, yyyy")}</td>
                      <td className="text-right py-3 px-4 font-medium">
                        ₱{totalSale.toFixed(2)}
                      </td>
                      <td className="text-right py-3 px-4">
                        <input
                          type="number"
                          step="0.01"
                          value={count || ""}
                          onChange={(e) =>
                            handlePhysicalCountChange(date, e.target.value)
                          }
                          placeholder="0.00"
                          className="w-28 px-2 py-1 border border-border rounded bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                        />
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        ₱{variance.toFixed(2)}
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSave(date)}
                            className="p-2 hover:bg-primary/10 rounded transition-colors text-primary"
                          >
                            <Save size={16} />
                          </button>
                          {salesRecords.has(date) && (
                            <button
                              onClick={() => handleDelete(date)}
                              className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">Monthly Total Sale</p>
              <p className="text-3xl font-bold mt-2">
                ₱{monthlyTotal.toFixed(2)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                Physical Count Total
              </p>
              <p className="text-3xl font-bold mt-2">
                ₱{monthlyPhysical.toFixed(2)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">Monthly Variance</p>
              <p className={`text-3xl font-bold mt-2 ${monthlyVariance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ₱{monthlyVariance.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
