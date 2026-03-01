"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Price, Category } from "@/types";
import { format } from "date-fns";
import { Save } from "lucide-react";

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

interface PriceData extends Price {
  product?: Product;
}

export default function PricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [priceMap, setPriceMap] = useState<Map<string, PriceData>>(new Map());
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, pricesRes] = await Promise.all([
        supabase.from("products").select("*").order("name"),
        supabase
          .from("prices")
          .select("*, product:products(*)")
      ]);

      if (productsRes.error) throw productsRes.error;
      if (pricesRes.error) throw pricesRes.error;

      setProducts(productsRes.data || []);

      const pricesByProduct = new Map<string, number>();
      const priceDataMap = new Map<string, PriceData>();

      (pricesRes.data || []).forEach((price) => {
        pricesByProduct.set(price.product_id, price.price);
        priceDataMap.set(price.product_id, price);
      });

      setPrices(pricesByProduct);
      setPriceMap(priceDataMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (productId: string, value: string) => {
    const newPrices = new Map(prices);
    const numValue = parseFloat(value) || 0;
    newPrices.set(productId, numValue);
    setPrices(newPrices);
  };

  const handleSave = async (productId: string) => {
    try {
      const price = prices.get(productId) || 0;
      const existingPrice = priceMap.get(productId);

      if (existingPrice) {
        const { error } = await supabase
          .from("prices")
          .update({ price })
          .eq("id", existingPrice.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("prices")
          .insert([{ product_id: productId, price }]);

        if (error) throw error;
      }

      fetchData();
    } catch (error) {
      console.error("Error saving price:", error);
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

  return (
    <div className="space-y-6 bg-background text-foreground min-h-screen">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
        <p className="text-muted-foreground mt-2">
          Set and manage product prices
        </p>
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
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[160px]">Product Name</th>
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[120px]">Price (₱)</th>
                        <th className="text-right px-4 py-2 font-medium align-middle min-w-[100px]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-border hover:bg-secondary transition-colors align-middle"
                        >
                          <td className="px-4 py-2 align-middle">{product.name}</td>
                          <td className="px-4 py-2 align-middle">
                            <div className="flex items-center gap-1">
                              <span>₱</span>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={prices.get(product.id) || ""}
                                onChange={(e) =>
                                  handlePriceChange(product.id, e.target.value)
                                }
                                placeholder="0.00"
                                className="w-24 px-3 py-1 border border-border rounded bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right align-middle">
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleSave(product.id)}
                                className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm"
                              >
                                <Save size={16} />
                                Save
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
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
