# Shivam Collection — Frontend v1.5

Mobile-first Next.js frontend for Shivam's farmer crate collection workflow.

## Included in this version
- Username/password login
- Maximum 2 users, same access role
- 1-hour session expiry / auto logout
- English / Marathi language switch
- Dashboard Overall / Today toggle (Overall is default)
- Give crates → automatically creates pending pickup workload
- Pick Up page with Pending / Picked up tabs
- Farmer creation with name, mobile, WhatsApp, village and optional notes
- Farmer detail with overall crate analytics
- Expandable activity rows showing only pickup quantity and sorted crate types when applicable
- Sorted / unsorted pickup flow with automatic totals and remaining crates
- Wholesaler destination selection
- WhatsApp preview/open flow
- Reports & Analytics with scalable charts, searchable farmer table, pagination and CSV export
- Season management with start/end dates and season-wise analytics filtering
- Active season selector in the navbar (All seasons or a defined season)
- Season-aware given, collected, pending and farmer/wholesaler analytics
- Data persists in browser localStorage for demo purposes

## Demo login
- Username: `admin`
- Password: `shivam123`

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Important
This is still a frontend-only demo. Authentication and data are stored in browser localStorage and are **not production-secure**. The next phase should move users, sessions, farmers, collections and RLS to Supabase Auth/Postgres. The Supabase schema folder is retained for that phase, but there is no Supabase client dependency in this build.


v1.4 workflow change: destination wholesaler is selected during Pick Up/collection, not when empty crates are given to the farmer.


v1.5: Added season setup and season-wise filtering across dashboard, farmer analytics and reports. Given-crate entries are also stored against the selected season so pending analysis remains meaningful.
