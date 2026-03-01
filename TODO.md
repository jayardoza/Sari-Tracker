# TODO - Date-Based Pricing System

## Tasks:
- [x] Create price_history table migration for Supabase
- [x] Add PriceHistory type to types/index.ts
- [x] Update PricingPage to set prices with effective_from dates and close previous periods
- [x] Update DailyPage to query prices based on each specific date from price_history
- [x] Unify calendar format across Pricing, Stock, and Sales pages
