-- Price History Table Migration
-- Run this in Supabase SQL Editor to add price history tracking

CREATE TABLE IF NOT EXISTS price_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price decimal(10, 2) NOT NULL,
  effective_from date NOT NULL,
  effective_to date,
  created_at timestamp DEFAULT now(),
  UNIQUE(product_id, effective_from)
);

CREATE INDEX IF NOT EXISTS idx_price_history_product_id ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_effective_from ON price_history(effective_from);

-- Add RLS
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "price_history_all" ON price_history
  FOR ALL USING (true) WITH CHECK (true);
