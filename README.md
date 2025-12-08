# Next.js + Supabase (Contoh untuk deploy ke Vercel)

Ringkasan:
- Frontend: Next.js (app router).
- Auth & DB: Supabase (supabase-js).
- Hosting: Vercel (deploy dari GitHub repo).

Apa yang ada di contoh:
- Autentikasi OAuth (GitHub) via supabase-js (client).
- Contoh API server-side yang menggunakan SUPABASE_SERVICE_ROLE_KEY (hanya untuk operasi admin/server).
- Panduan env vars dan setting OAuth redirect di Supabase & Vercel.

Langkah cepat (lokal)
1. Clone repo ini.
2. Buat project di Supabase → catat:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY (public)
   - SUPABASE_SERVICE_ROLE_KEY (rahasia! jangan commit)
3. Di Supabase Auth → Settings → Redirect URLs tambahkan:
   - http://localhost:3000
   - https://your-vercel-domain.vercel.app
   (tambahkan juga callback path jika perlu)
4. Salin .env.local.example → .env.local dan isi variabel dengan nilai Anda.
5. Install & jalankan:
   - npm install
   - npm run dev
6. Buka http://localhost:3000, login dengan "Sign in with GitHub" (atau provider yang Anda konfigurasikan di Supabase).

Env vars (local & Vercel)
- NEXT_PUBLIC_SUPABASE_URL (public)
- NEXT_PUBLIC_SUPABASE_ANON_KEY (public)
- SUPABASE_SERVICE_ROLE_KEY (server-only, jangan di-expose)
- ADMIN_SECRET (server-only, dipakai oleh contoh API untuk proteksi sederhana)

Di Vercel:
- Connect GitHub repo → Projects → Deploy.
- Di Settings → Environment Variables, tambahkan variabel di atas:
  - untuk NEXT_PUBLIC_*: set pada Preview & Production
  - untuk SUPABASE_SERVICE_ROLE_KEY & ADMIN_SECRET: hanya set pada Production & Preview, jangan beri prefix NEXT_PUBLIC

Ringkasan best practices yang dicontohkan:
- Kunci service role hanya digunakan di server (API routes / server components).
- Gunakan RLS di Supabase dan policies; contoh ini hanya demo saja.
- Untuk produksi, jangan gunakan header sederhana sebagai auth — gunakan cookies / JWT / verifikasi session.

File penting di contoh:
- lib/supabaseClient.ts — client supabase (NEXT_PUBLIC keys)
- lib/supabaseServerClient.ts — server supabase (SERVICE_ROLE_KEY)
- app/page.tsx — UI untuk sign in / sign out, dan panggil API admin contoh
- app/layout.tsx — layout dasar
- app/api/admin/list-users/route.ts — contoh route yang memanggil Supabase Admin API (membutuhkan ADMIN_SECRET + SERVICE_ROLE_KEY)

Butuh saya tambahkan:
- contoh lengkap RLS + policy SQL,
- integrasi session di server (cookie-based) menggunakan @supabase/auth-helpers,
- atau deploy langsung ke Vercel dan konfigurasi domain?
Beritahu mana yang mau ditambahkan selanjutnya.
