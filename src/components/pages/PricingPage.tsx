  "use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Category } from "@/types";
import { format } from "date-fns";
import { Save, Trash2, Plus, Edit2 } from "lucide-react";

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

interface PriceHistoryItem {
  id: string;
  product_id: string;
  price: number;
  effective_from: string;
  effective_to: string | null;
  created_at: string;
  product?: Product;
}

export default function PricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );
  
  // Modal state for adding/editing prices
  const [showModal, setShowModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState<PriceHistoryItem | null>(null);
  const [modalProductId, setModalProductId] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalDate, setModalDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [productsRes, priceHistoryRes] = await Promise.all([
        supabase.from("products").select("*").order("name"),
        supabase
          .from("price_history")
          .select("*, product:products(*)")
          .order("effective_from", { ascending: false })
          .order("created_at", { ascending: false })
      ]);

      if (productsRes.error) throw productsRes.error;
      if (priceHistoryRes.error) throw priceHistoryRes.error;

      setProducts(productsRes.data || []);
      setPriceHistory(priceHistoryRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddNew = () => {
    setEditingPrice(null);
    setModalProductId("");
    setModalPrice("");
    setModalDate(format(new Date(), "yyyy-MM-dd"));
    setShowModal(true);
  };

  const handleEdit = (price: PriceHistoryItem) => {
    setEditingPrice(price);
    setModalProductId(price.product_id);
    setModalPrice(price.price.toString());
    setModalDate(price.effective_from);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const newPrice = parseFloat(modalPrice) || 0;
      
      if (editingPrice) {
        // Update existing price history entry
        const { error } = await supabase
          .from("price_history")
          .update({ 
            price: newPrice,
            effective_from: modalDate
          })
          .eq("id", editingPrice.id);

        if (error) throw error;
      } else {
        // Check if there's already a price starting on this date for this product
        const existingOnDate = priceHistory.find(ph => 
          ph.product_id === modalProductId && 
          ph.effective_from === modalDate
        );

        if (existingOnDate) {
          // Update existing entry
          const { error } = await supabase
            .from("price_history")
            .update({ price: newPrice })
            .eq("id", existingOnDate.id);
          if (error) throw error;
        } else {
          // Find and close the previous price period
          const previousActive = priceHistory.find(ph => 
            ph.product_id === modalProductId && 
            ph.effective_from < modalDate &&
            (ph.effective_to === null || ph.effective_to >= modalDate)
          );

          if (previousActive) {
            // Close the previous period one day before the new effective date
            const newEffectiveDate = new Date(modalDate);
            newEffectiveDate.setDate(newEffectiveDate.getDate() - 1);
            const effectiveTo = format(newEffectiveDate, "yyyy-MM-dd");

            await supabase
              .from("price_history")
              .update({ effective_to: effectiveTo })
              .eq("id", previousActive.id);
          }

          // Insert new price history entry
          const { error } = await supabase
            .from("price_history")
            .insert([{
              product_id: modalProductId,
              price: newPrice,
              effective_from: modalDate,
            }]);

          if (error) throw error;
        }
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving price:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("price_history")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error deleting price:", error);
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

  // Get unique products that have price history
  const productsWithHistory = products.filter(p => 
    priceHistory.some(ph => ph.product_id === p.id)
  );

  const filteredProducts = CATEGORIES.reduce(
    (acc, cat) => {
      if (selectedCategories.has(cat)) {
        acc[cat] = productsWithHistory.filter((p) => p.category === cat);
      }
      return acc;
    },
    {} as Record<Category, Product[]>
  );

  // Get price for a product at a specific date
  const getPriceAtDate = (productId: string, date: string): number | null => {
    const relevantPrices = priceHistory
      .filter(ph => ph.product_id === productId && ph.effective_from <= date)
      .sort((a, b) => new Date(b.effective_from).getTime() - new Date(a.effective_from).getTime());
    
    if (relevantPrices.length > 0) {
      const price = relevantPrices[0];
      if (price.effective_to === null || price.effective_to >= date) {
        return price.price;
      }
    }
    return null;
  };

  // Group price history by product
  const groupedHistory = priceHistory.reduce(
    (acc, ph) => {
      if (!acc[ph.product_id]) {
        acc[ph.product_id] = [];
      }
      acc[ph.product_id].push(ph);
      return acc;
    },
    {} as Record<string, PriceHistoryItem[]>
  );

  return (
    <div className="space-y-6 bg-background text-foreground min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Pricing History</h1>
          <p className="text-muted-foreground mt-2">
            View and manage product price changes over time
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add New Price
        </button>
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
            const categoryProducts = filteredProducts[category];
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
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[160px]">Product</th>
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[100px]">Current Price</th>
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[200px]">History</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((product) => {
                        const history = groupedHistory[product.id] || [];
                        const todayPrice = getPriceAtDate(product.id, format(new Date(), "yyyy-MM-dd"));

                        return (
                          <tr
                            key={product.id}
                            className="border-b border-border hover:bg-secondary transition-colors align-middle"
                          >
                            <td className="px-4 py-2 align-middle">{product.name}</td>
                            <td className="px-4 py-2 align-middle font-medium">
                              {todayPrice !== null ? `₱${todayPrice.toFixed(2)}` : '-'}
                            </td>
                            <td className="px-4 py-2 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {history.slice(0, 3).map((ph, idx) => (
                                  <span 
                                    key={ph.id} 
                                    className="text-xs px-2 py-1 bg-muted rounded"
                                    title={`${ph.effective_from} - ${ph.effective_to || 'present'}: ₱${ph.price}`}
                                  >
                                    {format(new Date(ph.effective_from), "MMM d")}: ₱{ph.price}
                                  </span>
                                ))}
                                {history.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-muted rounded">
                                    +{history.length - 3} more
                                  </span>
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

      {/* Modal for adding/editing prices */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingPrice ? "Edit Price" : "Add New Price"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product</label>
                <select
                  value={modalProductId}
                  onChange={(e) => setModalProductId(e.target.value)}
                  disabled={!!editingPrice}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select product...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (₱)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={modalPrice}
                  onChange={(e) => setModalPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Effective From</label>
                <input
                  type="date"
                  value={modalDate}
                  onChange={(e) => setModalDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!modalProductId || !modalPrice}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
