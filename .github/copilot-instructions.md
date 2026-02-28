# POS System - Copilot Instructions

This is a Point of Sale system with inventory and sales tracking integrated with Supabase and Next.js.

## Setup Status

- [x] Project scaffolded with Next.js 15, TypeScript, Tailwind CSS
- [x] Supabase integration configured
- [x] Database schema created (products, prices, daily_sales, stock, daily_sales_records)
- [x] All UI components built and styled
- [x] Theme toggle (light/dark monochrome design)
- [x] Project compiled and type-checked successfully

## Configuration Required

Before running the application:

1. Create a Supabase project at https://supabase.com
2. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Run `database.sql` in Supabase SQL Editor to create tables

## Running the Application

Development:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/             # Next.js app router
├── components/      # React components
│   ├── layout/     # Sidebar, navigation
│   ├── pages/      # Dashboard pages
│   └── ui/         # Theme toggle
├── lib/            # Supabase client
├── providers/      # Theme provider
└── types/          # TypeScript types
```

## Key Features

- **Products**: CRUD management by category
- **Pricing**: Set product prices
- **Daily Sales**: Track daily quantities sold
- **Stock**: Monthly inventory tracking
- **Sales Reports**: Daily/monthly variance analysis
- **Summary**: Yearly overview

## Technologies

- Next.js 15, React 18, TypeScript
- Tailwind CSS (monochrome theme)
- Supabase (PostgreSQL)
- Lucide React (icons)

## Support

See SETUP.md for detailed setup instructions.
See README.md for feature documentation.
