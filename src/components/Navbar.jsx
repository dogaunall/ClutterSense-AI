import { Bell, ChevronDown, Sparkles } from 'lucide-react'

export default function Navbar({ onAddRoom }) {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-blue-200">
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-ink sm:text-lg">ClutterSense <span className="text-brand">AI</span></h1>
            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">Smart home intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
            AI System Online
          </div>
          <button aria-label="Bildirimler" className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-ink">
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
          </button>
          <button className="hidden items-center gap-2 border-l border-slate-200 pl-5 text-sm font-bold text-ink md:flex">
            Evim <ChevronDown size={16} className="text-slate-400" />
          </button>
          <button onClick={onAddRoom} className="rounded-xl bg-brand px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-600 sm:px-5 sm:text-sm">
            + Yeni Oda Ekle
          </button>
        </div>
      </div>
    </header>
  )
}
