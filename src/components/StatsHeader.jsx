import { BarChart3, CheckCircle2, Home, Sparkles } from 'lucide-react'

const cards = [
  { key: 'total', label: 'Toplam Oda', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
  { key: 'messy', label: 'Dağınık Oda', icon: BarChart3, color: 'text-rose-500', bg: 'bg-rose-50' },
  { key: 'clean', label: 'Temiz Oda', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { key: 'score', label: 'Ort. Düzen Skoru', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-50' },
]

export default function StatsHeader({ rooms }) {
  const stats = {
    total: rooms.length,
    messy: rooms.filter((room) => room.status === 'Messy').length,
    clean: rooms.filter((room) => room.status === 'Clean').length,
    score: rooms.length ? Math.round(rooms.reduce((sum, room) => sum + (100 - room.clutterScore), 0) / rooms.length) : 0,
  }

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <div key={key} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 sm:p-5">
          <div className="flex items-start justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}><Icon size={19} /></div>
          </div>
          <p className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{key === 'score' ? `%${stats[key]}` : stats[key]}</p>
          <p className="mt-1 text-xs font-semibold text-slate-400 sm:text-sm">{label}</p>
        </div>
      ))}
    </section>
  )
}
