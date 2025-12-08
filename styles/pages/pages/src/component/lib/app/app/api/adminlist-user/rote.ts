import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServerClient";

/**
 * Contoh route admin yang memanggil Supabase Admin API.
 * Proteksi sederhana: wajib isi header x-admin-secret yang sama dengan ADMIN_SECRET env var.
 *
 * Pastikan:
 * - process.env.SUPABASE_SERVICE_ROLE_KEY ada (server-only)
 * - process.env.ADMIN_SECRET ada (server-only)
 */
export async function GET(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = request.headers.get("x-admin-secret");

  if (!adminSecret || provided !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Panggil admin API: list users
    // NOTE: fungsi admin API di supabase-js v2
    const { data, error } = await supabaseServer.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
