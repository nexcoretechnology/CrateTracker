# Shivam Collection — Frontend First

This version is intentionally frontend-only. No Supabase, Firebase, API, authentication, or backend is required to run it.

## Start
```bash
npm install
npm run dev
```
Open http://localhost:3000

## What works now
- Responsive mobile-first website
- Bottom navigation is clickable
- Desktop sidebar navigation
- Farmers list + farmer detail
- Add farmer (demo in-memory state)
- Give crates
- Collect crates
- Sorted/unsorted collection flow
- Automatic sorted total
- Automatic remaining calculation
- Wholesaler selection
- Collection history + detail
- Pending collections
- Crate types add/remove (demo state)
- WhatsApp message preview + opens WhatsApp
- Reports & analytics charts
- Settings
- No database connection yet

## Important
Data is demo/in-memory only and resets when the browser refreshes. After the UI/flows are approved, connect Supabase and replace the local arrays/state with database queries.

## Suggested next phase
1. Supabase Auth
2. Supabase PostgreSQL
3. RLS policies
4. Persist farmers, givings, collections, wholesalers and crate types
5. Real WhatsApp Business API
