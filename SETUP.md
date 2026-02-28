# POS System Setup Guide

## Overview

You now have a fully functional Point of Sale system with inventory and sales tracking. This guide will help you complete the setup and get the system running.

## Prerequisites

- ✅ Node.js 18+ and npm (already installed)
- Supabase project account (free tier available)

## Step 1: Set Up Supabase Database

### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project" 
4. Enter a project name (e.g., "pos-system")
5. Set a strong database password
6. Select your region
7. Click "Create new project"

### Get Your Credentials

1. Once the project is created, go to Settings > API
2. Copy the following:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Anon Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Configure Environment Variables

1. Create `.env.local` in the project root (it may already exist):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Replace with your actual values

### Create Database Tables

1. In Supabase, go to SQL Editor
2. Click "New Query"
3. Copy and paste the contents from `database.sql`
4. Click "Run"

This will create all necessary tables and indexes.

## Step 2: Verify Installation

```bash
# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Check for any errors - should see "✓ Compiled successfully"
```

## Step 3: Run Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Step 4: Initialize Sample Products (Optional)

To get started quickly, you can manually add some products:

1. Open the application in your browser
2. Go to **Products** page
3. Add products in each category
4. Go to **Pricing** and set prices for each product

## Default Categories

The system comes with 19 built-in categories:

- Biscuits, Bleach, Bodycare, Candies, Canned
- Chips, Cigarettes, Condiments, Detergent, Fresh
- Grains, Haircare, Hot_Cold, Liquor, Medicine
- Miscellaneous, Noodles, Powdered, Refreshment

## Using the System

### Products Page
- Add new products to your inventory
- Organize products by category
- Edit or delete products

### Pricing Page
- Set prices for each product
- Prices automatically sync to the database
- Update prices anytime

### Daily Sales Page
- Record daily sales quantities
- Select date to track
- System auto-calculates total sales (qty × price)
- See daily totals

### Stock Page
- Track monthly inventory
- Enter end stock from previous month
- Enter physical count (manual verification)
- System calculates variance and total stock
- Track restocking and sales impact

### Sales Page
- View daily sales breakdown
- Enter physical money count per day
- Compare system sales vs actual cash
- Track daily and monthly variance
- Identify discrepancies

### Summary Page
- View yearly overview
- See monthly sales trends
- Track annual variance
- Analyze year-to-date performance

## Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### Database Connection Error

1. Verify `.env.local` has correct credentials
2. Check Supabase project is active
3. Verify tables were created in Supabase
4. Run `database.sql` script again if tables are missing

### Hot Reload Not Working

Press Ctrl+C to stop the server, then:
```bash
npm run dev
```

### Build Errors

Clear the build cache:
```bash
rm -r .next
npm run build
```

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended for Next.js)

1. Push to GitHub: `git push origin main`
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

### Environment Variables for Production

Set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Development Tips

### Code Structure
- `/src/app` - Next.js app pages
- `/src/components` - React components
- `/src/lib` - Utilities (Supabase client)
- `/src/types` - TypeScript types
- `/src/providers` - Context providers

### Styling
- Uses Tailwind CSS
- Light/Dark monochrome theme
- CSS variables in `/src/app/globals.css`

### Database
- All operations use Supabase client (`/src/lib/supabase.ts`)
- Real-time updates available (can be added later)
- Row-level security enabled (modify policies in Supabase)

## Next Steps

1. ✅ Set up Supabase database
2. ✅ Configure environment variables
3. ✅ Run development server
4. Add initial products and prices
5. Start tracking sales
6. Monitor inventory trends
7. Deploy to production

## Support

For issues:
1. Check Supabase documentation: https://supabase.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Review error messages in browser console (F12)
4. Check terminal output while running `npm run dev`

## Customization

### Change Currency Symbol
Search for `₱` in all component files and replace with your currency symbol.

### Add Categories
Edit the `CATEGORIES` array in component files to match your needs.

### Modify Colors
Edit `/src/app/globals.css` CSS variables:
- Light mode: `:root` section
- Dark mode: `.dark` section

## Performance Notes

- Images are optimized with Next.js
- CSS is automatically purged for production
- Database queries are indexed
- Consider enabling Supabase real-time for live updates

## Security Considerations

⚠️ The current setup uses Row Level Security (RLS) policies that allow public access. For production:

1. Create proper authentication system
2. Implement user roles (admin, staff, viewer)
3. Restrict data access via RLS policies
4. Use environment variables for secrets
5. Enable HTTPS (automatic on Vercel)

## Contact & Credits

Built with:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Supabase
- Lucide React Icons

---

**Version**: 0.1.0  
**Last Updated**: February 28, 2026
