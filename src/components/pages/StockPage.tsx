"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Price, Category, Stock, DailySale } from "@/types";
import { format } from "date-fns";
import { Save, Trash2 } from "lucide-react";

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

interface StockRow extends Stock {
  variance: number;
  total_stock: number;
  stock_amount: number;
  stock_variance: number;
}

export default function StockPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Map<string, number>>(new Map());
  const [stockData, setStockData] = useState<Map<string, Stock>>(new Map());
  const [formData, setFormData] = useState<
    Map<string, Partial<Stock>>
  >(new Map());
  const [loading, setLoading] = useState(true);
  const [dailySales, setDailySales] = useState<Map<string, number>>(
    new Map()
  );
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [productsRes, pricesRes, stockRes] = await Promise.all([
        supabase.from("products").select("*").order("name"),
        supabase.from("prices").select("*"),
        supabase
          .from("stock")
          .select("*")
          .eq("month_year", selectedMonth),
      ]);

      if (productsRes.error) throw productsRes.error;
      if (pricesRes.error) throw pricesRes.error;
      if (stockRes.error) throw stockRes.error;

      setProducts(productsRes.data || []);

      const priceMap = new Map<string, number>();
      (pricesRes.data || []).forEach((price: Price) => {
        priceMap.set(price.product_id, price.price);
      });
      setPrices(priceMap);

      const stockMap = new Map<string, Stock>();
      (stockRes.data || []).forEach((stock: Stock) => {
        stockMap.set(stock.product_id, stock);
      });
      setStockData(stockMap);

      // Calculate sales for the month
      const [year, month] = selectedMonth.split("-");
      const startDate = `${year}-${month}-01`;
      const endDate = new Date(
        parseInt(year),
        parseInt(month),
        0
      );
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const salesRes = await supabase
        .from("daily_sales")
        .select("*")
        .gte("date", startDate)
        .lte("date", formattedEndDate);

      if (salesRes.error) throw salesRes.error;

      const salesMap = new Map<string, number>();
      (salesRes.data || []).forEach((sale: DailySale) => {
        const current = salesMap.get(sale.product_id) || 0;
        salesMap.set(sale.product_id, current + sale.quantity_sold);
      });
      setDailySales(salesMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, fetchData]);

  const handleFieldChange = (
    productId: string,
    field: string,
    value: string
  ) => {
    const current = formData.get(productId) || {};
    const updated = {
      ...current,
      [field]: field === "end_stock" || field === "partial_stock" || field === "additional_stock" ? parseInt(value) || 0 : value,
    };
    const newFormData = new Map(formData);
    newFormData.set(productId, updated);
    setFormData(newFormData);
  };

  const handleSave = async (productId: string) => {
    try {
      const data = formData.get(productId);
      if (!data) return;

      const existingStock = stockData.get(productId);

      if (existingStock) {
        const { error } = await supabase
          .from("stock")
          .update(data)
          .eq("id", existingStock.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("stock")
          .insert([
            {
              product_id: productId,
              month_year: selectedMonth,
              ...data,
            },
          ]);

        if (error) throw error;
      }

      fetchData();
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const existing = stockData.get(productId);
      if (!existing) return;

      const { error } = await supabase
        .from("stock")
        .delete()
        .eq("id", existing.id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const getComputedValues = (productId: string): StockRow => {
    const stock = stockData.get(productId);
    const endStock = stock?.end_stock || 0;
    const partialStock =
      (formData.get(productId)?.partial_stock as number) || stock?.partial_stock || 0;
    const additionalStock =
      (formData.get(productId)?.additional_stock as number) || stock?.additional_stock || 0;
    const sale = dailySales.get(productId) || stock?.sale || 0;
    const price = prices.get(productId) || 0;

    const variance = partialStock - endStock;
    const totalStock = partialStock + additionalStock - sale;
    const stockAmount = totalStock * price;
    const stockVariance = variance * price;

    return {
      id: stock?.id || "",
      product_id: productId,
      month_year: selectedMonth,
      end_stock: endStock,
      partial_stock: partialStock,
      additional_stock: additionalStock,
      sale,
      variance,
      total_stock: totalStock,
      stock_amount: stockAmount,
      stock_variance: stockVariance,
      created_at: stock?.created_at || "",
      updated_at: stock?.updated_at || "",
    };
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Stock</h1>
          <p className="text-muted-foreground mt-2">Manage monthly stock</p>
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
                  <table className="w-full text-xs">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-2 px-2 font-medium">
                          Product
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          End Stock
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Partial
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Variance
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Add Stock
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Sale
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Total
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Amount
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          Variance $
                        </th>
                        <th className="text-right py-2 px-2 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((product) => {
                        const stock = stockData.get(product.id);
                        const computed = getComputedValues(product.id);

                        return (
                          <tr
                            key={product.id}
                            className="border-b border-border hover:bg-secondary transition-colors"
                          >
                            <td className="py-2 px-2">{product.name}</td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                min="0"
                                value={stock?.end_stock || ""}
                                disabled
                                className="w-16 px-2 py-1 border border-border rounded bg-muted text-muted-foreground"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                min="0"
                                value={
                                  (formData.get(product.id)
                                    ?.partial_stock as number) ||
                                  stock?.partial_stock ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleFieldChange(
                                    product.id,
                                    "partial_stock",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-border rounded bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </td>
                            <td className="py-2 px-2 text-center">
                              {computed.variance}
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                min="0"
                                value={
                                  (formData.get(product.id)
                                    ?.additional_stock as number) ||
                                  stock?.additional_stock ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleFieldChange(
                                    product.id,
                                    "additional_stock",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-border rounded bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </td>
                            <td className="py-2 px-2 text-center">
                              {computed.sale}
                            </td>
                            <td className="py-2 px-2 font-medium">
                              {computed.total_stock}
                            </td>
                            <td className="py-2 px-2 font-medium">
                              ₱{computed.stock_amount.toFixed(2)}
                            </td>
                            <td className="py-2 px-2 font-medium">
                              ₱{computed.stock_variance.toFixed(2)}
                            </td>
                            <td className="text-right py-2 px-2">
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => handleSave(product.id)}
                                  className="p-1 hover:bg-primary/10 rounded transition-colors text-primary"
                                >
                                  <Save size={14} />
                                </button>
                                {stock && (
                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-1 hover:bg-destructive/10 rounded transition-colors text-destructive"
                                  >
                                    <Trash2 size={14} />
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
