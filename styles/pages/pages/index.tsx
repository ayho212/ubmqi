import Head from 'next/head'
import Header from '../src/components/Header'

export default function Home() {
  const user = { name: 'Admin', avatarUrl: 'https://ui-avatars.com/api/?name=Admin' }

  return (
    <>
      <Head>
        <title>UBMQI — Dashboard</title>
        <meta name="description" content="Aplikasi Usaha Bersama (scaffold)" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header title="Aplikasi Usaha" user={user} />
        <main className="flex-1 max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Selamat datang di Aplikasi Usaha</h1>
          <p className="text-gray-600">Ini adalah scaffold awal. Lanjutkan dengan fitur: auth, produk, POS, laporan.</p>
        </main>
      </div>
    </>
  )
}
