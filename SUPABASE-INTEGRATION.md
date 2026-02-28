# Supabase Data Integration Guide

You can insert data directly into Supabase without using the app interface. Here are several methods:

## Method 1: SQL Editor (Fastest for Initial Setup) ⭐ Recommended

### Step-by-step:

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Go to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the seed data script**
   - Open `seed-data.sql` from your project root
   - Copy all the content
   - Paste it into the SQL Editor
   - Click "Run"

This will insert:
- ✅ 70+ sample products across all 19 categories
- ✅ Sample prices for each product category

**Customize prices**: Edit the CASE statement in `seed-data.sql` to adjust default prices before running.

---

## Method 2: Supabase UI (Manual but Visual)

### Insert Products:

1. Go to "Table Editor" in Supabase
2. Select "products" table
3. Click "Insert row"
4. Fill in:
   - **name**: Product name
   - **category**: Select from dropdown
5. Click "Save"

### Insert Prices:

1. Select "prices" table
2. Click "Insert row"
3. Fill in:
   - **product_id**: Select the product you created
   - **price**: Enter price
4. Click "Save"

---

## Method 3: API with cURL

Insert a single product via API:

```bash
curl -X POST https://your-project.supabase.co/rest/v1/products \
  -H "apikey: your-anon-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "category": "Biscuits"
  }'
```

Insert price:

```bash
curl -X POST https://your-project.supabase.co/rest/v1/prices \
  -H "apikey: your-anon-key" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "uuid-from-products-table",
    "price": 25.00
  }'
```

Replace:
- `your-project`: Your Supabase project name
- `your-anon-key`: Your NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## Method 4: CSV Import (For Large Datasets)

### Prepare CSV File:

**products.csv:**
```
name,category
Marie Biscuit,Biscuits
Clorox Bleach,Bleach
Dove Soap,Bodycare
...
```

**prices.csv:**
```
product_id,price
[uuid-1],25.00
[uuid-2],40.00
...
```

### Import to Supabase:

1. Go to Table Editor → products table
2. Click "Upload file" button (usually in menu)
3. Select products.csv
4. Map columns
5. Click "Import"
6. Repeat for prices table

---

## Method 5: Node.js Script (Programmatic)

Create `seed.js` in your project:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const products = [
  { name: "Marie Biscuit", category: "Biscuits" },
  { name: "Clorox Bleach", category: "Bleach" },
  // Add all products...
];

async function seedDatabase() {
  try {
    // Insert products
    const { data: insertedProducts, error: productError } = await supabase
      .from("products")
      .insert(products)
      .select();

    if (productError) throw productError;
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Insert prices
    const prices = insertedProducts.map((product) => ({
      product_id: product.id,
      price: 50.00, // Adjust per category
    }));

    const { error: priceError } = await supabase
      .from("prices")
      .insert(prices);

    if (priceError) throw priceError;
    console.log(`✅ Inserted ${prices.length} prices`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

seedDatabase();
```

Run with:
```bash
node seed.js
```

---

## Data Structure Reference

### Products Table

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| id | UUID | Auto | Primary key |
| name | Text | Yes | Product name |
| category | Text | Yes | Must match category list |
| created_at | Timestamp | Auto | Creation time |
| updated_at | Timestamp | Auto | Last updated |

### Prices Table

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| id | UUID | Auto | Primary key |
| product_id | UUID | Yes | Foreign key to products |
| price | Decimal | Yes | Product price |
| created_at | Timestamp | Auto | Creation time |
| updated_at | Timestamp | Auto | Last updated |

### Valid Categories

```
Biscuits, Bleach, Bodycare, Candies, Canned, Chips, Cigarettes,
Condiments, Detergent, Fresh, Grains, Haircare, Hot_Cold, Liquor,
Medicine, Miscellaneous, Noodles, Powdered, Refreshment
```

---

## Quick Start (Recommended)

1. **Fastest way to get started:**
   ```
   1. Open Supabase SQL Editor
   2. Copy all content from: seed-data.sql
   3. Run the script
   4. Done! All products and prices loaded
   ```

2. **Then update `.env.local`:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. Navigate to any page and all your products will be there! ✨

---

## Daily Sales & Stock Data

You can also pre-populate historical data:

**Daily Sales:**
```sql
INSERT INTO daily_sales (product_id, date, quantity_sold, total_amount) VALUES
  ('product-uuid', '2026-02-28', 10, 250.00),
  ('product-uuid', '2026-02-28', 5, 200.00);
```

**Stock:**
```sql
INSERT INTO stock (product_id, month_year, end_stock, partial_stock) VALUES
  ('product-uuid', '2026-02', 50, 48);
```

---

## Troubleshooting

### "Column not found" error
- Make sure you created all tables using `database.sql`
- Run database schema setup first

### UUID errors
- Use the actual UUID from the products table
- Get it from Supabase UI under products > id column

### Permission errors
- Verify Row Level Security (RLS) policies allow inserts
- Policies are set to allow public access in `database.sql`

### Decimal/Price format
- Use numbers: `25.00` not `"25.00"`
- Prices stored as NUMERIC(10,2)

---

## Next Steps

After seeding:
1. ✅ Your products are in Supabase
2. ✅ Your prices are set
3. Connect app to database
4. Start recording daily sales
5. Monitor inventory trends

Happy selling! 🛒
