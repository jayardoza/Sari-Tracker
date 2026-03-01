export type Category =
  | "Biscuits"
  | "Bleach"
  | "Bodycare"
  | "Candies"
  | "Canned"
  | "Chips"
  | "Cigarettes"
  | "Condiments"
  | "Detergent"
  | "Fresh"
  | "Grains"
  | "Haircare"
  | "Hot_Cold"
  | "Liquor"
  | "Medicine"
  | "Miscellaneous"
  | "Noodles"
  | "Powdered"
  | "Refreshment";

export interface Product {
  id: string;
  name: string;
  category: Category;
  created_at: string;
  updated_at: string;
}

export interface Price {
  id: string;
  product_id: string;
  price: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface PriceHistory {
  id: string;
  product_id: string;
  price: number;
  effective_from: string;
  effective_to: string | null;
  created_at: string;
  product?: Product;
}

export interface DailySale {
  id: string;
  product_id: string;
  date: string;
  quantity_sold: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Stock {
  id: string;
  product_id: string;
  month_year: string;
  end_stock: number;
  partial_stock: number;
  additional_stock: number;
  sale: number;
  variance?: number;
  total_stock?: number;
  stock_amount?: number;
  stock_variance?: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface DailySalesRecord {
  id: string;
  date: string;
  total_sale: number;
  physical_count: number;
  variance: number;
  created_at: string;
  updated_at: string;
}

export interface MonthlySummary {
  id: string;
  month_year: string;
  category: Category;
  total_sale: number;
  total_stock_amount: number;
  total_stock_variance: number;
  created_at: string;
}

export interface YearlySummary {
  year: number;
  months: {
    month: number;
    categories: {
      category: Category;
      total_sale: number;
      total_stock_amount: number;
      total_stock_variance: number;
    }[];
    grand_total: number;
  }[];
  yearly_total: number;
}
