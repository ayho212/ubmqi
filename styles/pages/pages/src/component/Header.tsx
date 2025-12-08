import React from 'react'

type Props = {
  title?: string
  onToggleTheme?: () => void
  user?: { name?: string; avatarUrl?: string }
}

export default function Header({ title = 'Aplikasi Usaha', onToggleTheme, user }: Props) {
  return (
    <header className="w-full bg-white/60 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md hover:bg-gray-100 transition" aria-label="menu">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">{title}</span>
              <span className="text-xs text-gray-500">Dashboard Usaha — cepat & responsif</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title="Toggle Theme"
            >
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 3v1M12 20v1M4.2 4.2l.7.7M18.1 18.1l.7.7M1 12h1M22 12h1M4.2 19.8l.7-.7M18.1 5.9l.7-.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{user?.name ?? 'Guest'}</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <img
                src={user?.avatarUrl ?? 'https://ui-avatars.com/api/?name=U+A&background=4c51bf&color=fff'}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
