"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Price, Category, DailySale } from "@/types";
import { format } from "date-fns";
import { Save, RotateCcw, Trash2 } from "lucide-react";

const CATEGORIES: Category[] = [
  "Biscuits",
  "Bleach",
  "Bodycare",
  "Candies",
  "Canned",
  "Chips",
  "Cigarettes",
  "Condiments",
  "Detergent",
  "Fresh",
  "Grains",
  "Haircare",
  "Hot_Cold",
  "Liquor",
  "Medicine",
  "Miscellaneous",
  "Noodles",
  "Powdered",
  "Refreshment",
];

export default function DailyPage() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Map<string, number>>(new Map());
  const [dailySales, setDailySales] = useState<Map<string, DailySale>>(
    new Map()
  );
  const [quantities, setQuantities] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [productsRes, pricesRes, salesRes] = await Promise.all([
        supabase.from("products").select("*").order("name"),
        supabase.from("prices").select("*"),
        supabase
          .from("daily_sales")
          .select("*")
          .eq("date", selectedDate),
      ]);

      if (productsRes.error) throw productsRes.error;
      if (pricesRes.error) throw pricesRes.error;
      if (salesRes.error) throw salesRes.error;

      setProducts(productsRes.data || []);

      const priceMap = new Map<string, number>();
      (pricesRes.data || []).forEach((price: Price) => {
        priceMap.set(price.product_id, price.price);
      });
      setPrices(priceMap);

      const salesMap = new Map<string, DailySale>();
      const quantitiesMap = new Map<string, number>();
      (salesRes.data || []).forEach((sale: DailySale) => {
        salesMap.set(sale.product_id, sale);
        quantitiesMap.set(sale.product_id, sale.quantity_sold);
      });
      setDailySales(salesMap);
      setQuantities(quantitiesMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [selectedDate, fetchData]);

  const handleQuantityChange = (productId: string, value: string) => {
    const newQuantities = new Map(quantities);
    const numValue = parseInt(value) || 0;
    newQuantities.set(productId, numValue);
    setQuantities(newQuantities);
  };

  const handleSaveAll = async () => {
    try {
      // Get all products that have quantity > 0
      const productsToSave = Array.from(quantities.entries()).filter(
        ([_, qty]) => qty > 0
      );

      if (productsToSave.length === 0) return;

      // Save each product with quantity
      for (const [productId, quantity] of productsToSave) {
        const price = prices.get(productId) || 0;
        const totalAmount = quantity * price;
        const existingSale = dailySales.get(productId);

        if (existingSale) {
          const { error } = await supabase
            .from("daily_sales")
            .update({ quantity_sold: quantity, total_amount: totalAmount })
            .eq("id", existingSale.id);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("daily_sales")
            .insert([
              {
                product_id: productId,
                date: selectedDate,
                quantity_sold: quantity,
                total_amount: totalAmount,
              },
            ]);

          if (error) throw error;
        }
      }

      fetchData();
    } catch (error) {
      console.error("Error saving all sales:", error);
    }
  };

  const handleReset = async () => {
    try {
      // Delete all sales for the selected date
      const { error } = await supabase
        .from("daily_sales")
        .delete()
        .eq("date", selectedDate);

      if (error) throw error;
      
      // Reset quantities to 0
      setQuantities(new Map());
      fetchData();
    } catch (error) {
      console.error("Error resetting sales:", error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const existingSale = dailySales.get(productId);
      if (!existingSale) return;

      const { error } = await supabase
        .from("daily_sales")
        .delete()
        .eq("id", existingSale.id);

      if (error) throw error;

      // Remove from local state
      const newQuantities = new Map(quantities);
      newQuantities.delete(productId);
      setQuantities(newQuantities);
      
      fetchData();
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  const toggleCategory = (category: Category) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const groupedProducts = CATEGORIES.reduce(
    (acc, cat) => {
      if (selectedCategories.has(cat)) {
        acc[cat] = products.filter((p) => p.category === cat);
      }
      return acc;
    },
    {} as Record<Category, Product[]>
  );

  const dailyTotal = Array.from(quantities.entries()).reduce((sum, [productId]) => {
    const qty = quantities.get(productId) || 0;
    const price = prices.get(productId) || 0;
    return sum + qty * price;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Daily Sales</h1>
          <p className="text-muted-foreground mt-2">
            Track daily quantities sold
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setFilterExpanded(!filterExpanded)}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-muted transition-colors"
        >
          <h2 className="font-semibold">Category Filter</h2>
          <span className="text-2xl leading-none">
            {filterExpanded ? "−" : "+"}
          </span>
        </button>
        {filterExpanded && (
          <div className="border-t border-border px-6 py-4 space-y-4">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSelectedCategories(new Set(CATEGORIES))}
                className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedCategories(new Set())}
                className="flex-1 px-3 py-2 text-sm bg-secondary text-foreground rounded hover:bg-muted transition-colors"
              >
                Deselect All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.map((category) => {
            const categoryProducts = groupedProducts[category];
            if (!categoryProducts || categoryProducts.length === 0) return null;

            return (
              <div
                key={category}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-4">
                  {category.replace(/_/g, " ")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 font-medium">
                          Product
                        </th>
                        <th className="text-left py-3 font-medium">Price</th>
                        <th className="text-left py-3 font-medium">Qty</th>
                        <th className="text-left py-3 font-medium">Total</th>
                        <th className="text-right py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((product) => {
                        const qty = quantities.get(product.id) || 0;
                        const price = prices.get(product.id) || 0;
                        const total = qty * price;
                        const hasExistingSale = dailySales.has(product.id);

                        return (
                          <tr
                            key={product.id}
                            className="border-b border-border hover:bg-secondary transition-colors"
                          >
                            <td className="py-3">{product.name}</td>
                            <td className="py-3">
                              ₱{price.toFixed(2)}
                            </td>
                            <td className="py-3">
                              <input
                                type="number"
                                min="0"
                                value={qty || ""}
                                onChange={(e) =>
                                  handleQuantityChange(product.id, e.target.value)
                                }
                                placeholder="0"
                                className="w-24 px-3 py-1 border border-border rounded bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </td>
                            <td className="py-3 font-medium">
                              ₱{total.toFixed(2)}
                            </td>
                            <td className="text-right py-3">
                              {hasExistingSale && (
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                                  title="Delete this item"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Daily Total</span>
              <span className="text-2xl font-bold">₱{dailyTotal.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <RotateCcw size={18} />
                Reset All
              </button>
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Save size={18} />
                Save All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
