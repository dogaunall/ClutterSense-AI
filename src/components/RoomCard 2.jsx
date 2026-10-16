import { Check, Clock3, Edit3, MoreVertical, Trash2 } from 'lucide-react'

const priorityStyles = {
  Kritik: 'bg-rose-100 text-rose-600',
  Yüksek: 'bg-amber-100 text-amber-700',
  Orta: 'bg-blue-100 text-blue-600',
  Düşük: 'bg-emerald-100 text-emerald-600',
}

export default function RoomCard({ room, onToggleStatus, onEdit, onDelete }) {
  const isMessy = room.status === 'Messy'
  const fallback = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative h-48 overflow-hidden">
        <img src={room.imageUrl || fallback} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallback }} alt={room.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-900/45 to-transparent p-4">
          <span className={`rounded-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${isMessy ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>{isMessy ? 'Messy' : 'Clean'}</span>
          <button aria-label="Oda seçenekleri" className="rounded-lg bg-white/20 p-1.5 text-white backdrop-blur transition hover:bg-white/40"><MoreVertical size={17} /></button>
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-slate-900/60 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> AI Güveni %{Math.round(isMessy ? room.clutterScore : 100 - room.clutterScore)}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-ink">{room.name}</h3>
            <p className="mt-1 text-xs font-semibold text-slate-400">{room.area}</p>
          </div>
          <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-extrabold uppercase ${priorityStyles[room.priority] || priorityStyles.Orta}`}>{room.priority}</span>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
          <span className="text-xs font-bold text-slate-500">Dağınıklık skoru</span>
          <span className={`text-sm font-extrabold ${room.clutterScore > 60 ? 'text-rose-500' : 'text-emerald-500'}`}>%{room.clutterScore}</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span className="flex items-center gap-1.5"><Clock3 size={14} /> Son kontrol: {room.lastChecked.split(' ')[1]}</span>
          <span>{room.recommendations?.length || 0} öneri</span>
        </div>
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
          <button onClick={() => onToggleStatus(room.id)} className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${isMessy ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            <Check size={15} /> {isMessy ? 'Toparlandı' : 'Dağınık işaretle'}
          </button>
          <button onClick={() => onEdit(room)} aria-label="Odayı düzenle" className="rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:border-brand hover:text-brand"><Edit3 size={16} /></button>
          <button onClick={() => onDelete(room.id)} aria-label="Odayı sil" className="rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"><Trash2 size={16} /></button>
        </div>
      </div>
    </article>
  )
}
