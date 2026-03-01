"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Category } from "@/types";
import { Trash2, Edit2, Plus } from "lucide-react";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Biscuits" as Category,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from("products")
          .insert([formData]);

        if (error) throw error;
      }

      setFormData({ name: "", category: "Biscuits" });
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({ name: product.name, category: product.category });
    setEditingId(product.id);
    setShowForm(true);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog</p>
        </div>
        <button
          onClick={() => {
            setFormData({ name: "", category: "Biscuits" });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Product
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

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Category,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                {editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.map((category) => {
            const categoryProducts = groupedProducts[category];
            if (!categoryProducts || categoryProducts.length === 0) return null;

            return (
              <div key={category} className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {category.replace(/_/g, " ")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[160px]">Product</th>
                        <th className="text-left px-4 py-2 font-medium align-middle min-w-[120px]">Category</th>
                        <th className="text-right px-4 py-2 font-medium align-middle min-w-[100px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-border hover:bg-secondary transition-colors align-middle"
                        >
                          <td className="px-4 py-2 align-middle">{product.name}</td>
                          <td className="px-4 py-2 align-middle">{product.category.replace(/_/g, " ")}</td>
                          <td className="px-4 py-2 text-right align-middle">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 mr-2 hover:bg-muted rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
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
