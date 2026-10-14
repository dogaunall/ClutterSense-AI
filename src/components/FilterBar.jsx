import { ArrowDownUp, Search, SlidersHorizontal } from 'lucide-react'
import { ROOM_STATUS } from '../interfaces/roomModel'

export default function FilterBar({ filter, onFilterChange, search, onSearchChange, sort, onSortChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        {Object.values(ROOM_STATUS).map((item) => (
          <button key={item} onClick={() => onFilterChange(item)} className={`rounded-lg px-3 py-2 text-xs font-bold transition sm:px-4 ${filter === item ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-ink'}`}>
            {item === 'All' ? 'Tümü' : item === 'Messy' ? 'Dağınık' : 'Temiz'}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:w-56">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Oda ara..." className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-slate-400" />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-500">
          <ArrowDownUp size={16} />
          <select value={sort} onChange={(event) => onSortChange(event.target.value)} className="bg-transparent outline-none">
            <option value="priority">Önceliğe göre</option>
            <option value="score">Skora göre</option>
            <option value="name">İsme göre</option>
          </select>
        </label>
        <button aria-label="Filtreleri aç" className="hidden rounded-xl border border-slate-200 bg-white px-3 text-slate-500 transition hover:border-brand hover:text-brand sm:block"><SlidersHorizontal size={17} /></button>
      </div>
    </div>
  )
}
