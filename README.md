# ubmqi — Aplikasi Usaha Bersama (Scaffold)

Repository scaffold: Next.js + TypeScript + Tailwind CSS + Prisma + Postgres (Products CRUD API)

Quick start
1. Install dependencies
   npm install

2. Copy env
   cp .env.example .env
   Set DATABASE_URL in .env

3. Generate Prisma client & migrate
   npx prisma generate
   npx prisma migrate dev --name init

4. Run dev
   npm run dev

API endpoints
- GET /api/products
- POST /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id

Notes
- This commit adds Prisma schema and basic products CRUD API. Next steps: auth, products UI, tests.
