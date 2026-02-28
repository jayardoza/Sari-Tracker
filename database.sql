-- POS System Database Schema
-- Run this script in your Supabase SQL Editor to set up the database

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name varchar(255) NOT NULL,
  category varchar(50) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Prices Table
CREATE TABLE IF NOT EXISTS prices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price decimal(10, 2) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(product_id)
);

-- Daily Sales Table
CREATE TABLE IF NOT EXISTS daily_sales (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  date date NOT NULL,
  quantity_sold integer NOT NULL,
  total_amount decimal(12, 2) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(product_id, date)
);

-- Stock Table (Monthly)
CREATE TABLE IF NOT EXISTS stock (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  month_year varchar(7) NOT NULL,
  end_stock integer NOT NULL DEFAULT 0,
  partial_stock integer NOT NULL DEFAULT 0,
  additional_stock integer NOT NULL DEFAULT 0,
  sale integer NOT NULL DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(product_id, month_year)
);

-- Daily Sales Records Table (Physical count vs System total)
CREATE TABLE IF NOT EXISTS daily_sales_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL UNIQUE,
  total_sale decimal(12, 2) NOT NULL,
  physical_count decimal(12, 2) NOT NULL,
  variance decimal(12, 2) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_prices_product_id ON prices(product_id);
CREATE INDEX IF NOT EXISTS idx_daily_sales_product_id ON daily_sales(product_id);
CREATE INDEX IF NOT EXISTS idx_daily_sales_date ON daily_sales(date);
CREATE INDEX IF NOT EXISTS idx_stock_product_id ON stock(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_month_year ON stock(month_year);
CREATE INDEX IF NOT EXISTS idx_daily_sales_records_date ON daily_sales_records(date);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_sales_records ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (modify based on your auth requirements)
-- This allows anyone to read/write from these tables. Consider restricting in production!

CREATE POLICY "products_all" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "prices_all" ON prices
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "daily_sales_all" ON daily_sales
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "stock_all" ON stock
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "daily_sales_records_all" ON daily_sales_records
  FOR ALL USING (true) WITH CHECK (true);
