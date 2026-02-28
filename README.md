# POS System - Inventory & Sales Tracking

A modern, minimalist Point of Sale system built with Next.js, React, TypeScript, Tailwind CSS, and Supabase. Perfect for tracking inventory, daily sales, stock levels, and generating comprehensive reports.

## Features

- **Products**: CRUD management for items organized by 19 categories
- **Pricing**: Set and update product prices with automatic database sync
- **Daily Sales**: Track daily quantity sold and calculate total sales
- **Stock Management**: Monthly stock tracking with end stock, partial stock, variance, and calculations
- **Sales Reports**: Daily and monthly sales tracking with physical count variance
- **Summary**: Yearly overview with monthly breakdowns and financial variance analysis
- **Theme Toggle**: Light/Dark monochrome design for comfortable viewing
- **Real-time Updates**: Supabase integration for instant data synchronization

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, responsive design
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Date Utils**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase project account

### Installation

1. **Clone the repository** (or extract the project files)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Supabase**:
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create `.env.local` file and add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

4. **Create Database Tables** (see [Database Schema](#database-schema) below)

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   ```
   http://localhost:3000
   ```

## Database Schema

Create the following tables in your Supabase project:

### Products Table
```sql
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name varchar(255) NOT NULL,
  category varchar(50) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### Prices Table
```sql
CREATE TABLE prices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price decimal(10, 2) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### Daily Sales Table
```sql
CREATE TABLE daily_sales (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  date date NOT NULL,
  quantity_sold integer NOT NULL,
  total_amount decimal(12, 2) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(product_id, date)
);
```

### Stock Table
```sql
CREATE TABLE stock (
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
```

### Daily Sales Records Table
```sql
CREATE TABLE daily_sales_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL UNIQUE,
  total_sale decimal(12, 2) NOT NULL,
  physical_count decimal(12, 2) NOT NULL,
  variance decimal(12, 2) NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

## Product Categories

The system comes with 19 pre-defined categories:

- Biscuits
- Bleach
- Bodycare
- Candies
- Canned
- Chips
- Cigarettes
- Condiments
- Detergent
- Fresh
- Grains
- Haircare
- Hot_Cold
- Liquor
- Medicine
- Miscellaneous
- Noodles
- Powdered
- Refreshment

## Usage

### Adding Products
1. Go to **Products** page
2. Click **Add Product**
3. Enter product name and select category
4. Click **Create**

### Setting Prices
1. Go to **Pricing** page
2. Products grouped by category are displayed
3. Enter price for each product
4. Click **Save**

### Recording Daily Sales
1. Go to **Daily Sales** page
2. Select the date
3. Enter quantity sold for each product
4. System automatically calculates total (qty × price)
5. Click **Save**

### Managing Stock
1. Go to **Stock** page
2. Select month
3. Enter:
   - **End Stock**: Previous month's ending stock
   - **Partial Stock**: Current physical count
   - **Additional Stock**: New restocking quantity
4. System calculates:
   - Variance = Partial - End Stock
   - Total Stock = Partial + Additional - Sale
   - Stock Amount = Total Stock × Price
   - Stock Variance = Variance × Price

### Viewing Sales Reports
1. Go to **Sales** page
2. Select month to view daily breakdown
3. Enter physical count for each day
4. System calculates daily and monthly variance
5. Compare total calculated sales vs physical count

### Annual Summary
1. Go to **Summary** page
2. Select year
3. View:
   - Monthly sales totals
   - Monthly variance
   - Yearly aggregate data
   - Average calculations

## Theme

Toggle between light and dark themes using the theme button in the sidebar. Your preference is saved locally.

## Build and Deploy

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx     # Navigation sidebar
│   ├── pages/
│   │   ├── Dashboard.tsx   # Layout router
│   │   ├── DashboardPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── PricingPage.tsx
│   │   ├── DailyPage.tsx
│   │   ├── StockPage.tsx
│   │   ├── SalesPage.tsx
│   │   └── SummaryPage.tsx
│   └── ui/
│       └── ThemeToggle.tsx # Theme switcher
├── lib/
│   └── supabase.ts         # Supabase client
├── providers/
│   └── ThemeProvider.tsx   # Theme context
└── types/
    └── index.ts            # TypeScript definitions
```

## Customization

### Colors
Edit the color variables in [tailwind.config.ts](tailwind.config.ts) and [src/app/globals.css](src/app/globals.css)

### Categories
Modify the `CATEGORIES` array in component files to add or remove product categories

### Currency
Replace `₱` with your preferred currency symbol in component files

## Performance Optimizations

- Image optimization with Next.js
- Server-side rendering for better SEO
- Tailwind CSS purging for minimal CSS
- Efficient database queries with Supabase

## Troubleshooting

### Supabase Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Verify table names match exactly

### Database Errors
- Ensure all tables are created with correct schema
- Check primary key constraints
- Verify foreign key relationships

### Port Already in Use
```bash
# Use alternative port
npm run dev -- -p 3001
```

## License

MIT

## Support

For issues and feature requests, please create an issue in the project repository.
