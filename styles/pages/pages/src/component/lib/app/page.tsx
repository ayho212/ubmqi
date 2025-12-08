"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Page() {
  const [session, setSession] = useState<any>(null);
  const [adminResult, setAdminResult] = useState<string | null>(null);

  useEffect(() => {
    // Ambil session awal
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Subscribe perubahan session (opsional)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        // Supabase akan redirect kembali ke domain Anda
        // redirectTo: window.location.origin
      }
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const callAdmin = async () => {
    setAdminResult("loading...");
    try {
      const res = await fetch("/api/admin/list-users", {
        method: "GET",
        headers: {
          "x-admin-secret": process.env.NEXT_PUBLIC_CLIENT_ADMIN_SECRET || "" // contoh: jangan pakai ini di produksi
        }
      });
      const j = await res.json();
      setAdminResult(JSON.stringify(j, null, 2));
    } catch (e: any) {
      setAdminResult(String(e));
    }
  };

  return (
    <div>
      <section style={{ marginBottom: 24 }}>
        <h2>Authentication</h2>
        {session ? (
          <div>
            <p>Signed in as: {session.user?.email || session.user?.id}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <div>
            <button onClick={signInGitHub}>Sign in with GitHub</button>
            <p style={{ color: "#666" }}>
              Setelah login, Supabase akan redirect kembali ke aplikasi.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2>Contoh API (server-only)</h2>
        <p>
          Tombol berikut memanggil endpoint server yang menggunakan SUPABASE_SERVICE_ROLE_KEY.
          Endpoint ini memerlukan ADMIN_SECRET server-side.
        </p>
        <button onClick={callAdmin}>Panggil /api/admin/list-users</button>
        <pre style={{ background: "#f5f5f5", padding: 12, marginTop: 12 }}>
          {adminResult ?? "Tekan tombol untuk memanggil API"}
        </pre>
      </section>
    </div>
  );
}
