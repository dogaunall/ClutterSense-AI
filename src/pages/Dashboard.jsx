import { useEffect, useMemo, useState } from 'react'
import { Activity, ChevronRight, Lightbulb } from 'lucide-react'
import Navbar from '../components/Navbar'
import StatsHeader from '../components/StatsHeader'
import FilterBar from '../components/FilterBar'
import RoomCard from '../components/RoomCard'
import AddRoomModal from '../components/AddRoomModal'
import { CLEAN_ROOM_IMAGE, createRoom, ROOM_STATUS } from '../interfaces/roomModel'
import { readRooms, writeRooms } from '../utils/storage'

export default function Dashboard() {
  const [rooms, setRooms] = useState(readRooms)
  const [filter, setFilter] = useState(ROOM_STATUS.ALL)
  const [search, setSearch] = useState(() => '')
  const [sort, setSort] = useState('priority')
  const [modal, setModal] = useState(null)

  useEffect(() => { writeRooms(rooms) }, [rooms])

  const visibleRooms = useMemo(() => {
    const priorityOrder = { Kritik: 0, Yüksek: 1, Orta: 2, Düşük: 3 }
    return rooms.filter((room) => {
      const matchesStatus = filter === ROOM_STATUS.ALL || room.status === filter
      return matchesStatus && room.name.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR'))
    }).sort((a, b) => sort === 'score' ? b.clutterScore - a.clutterScore : sort === 'name' ? a.name.localeCompare(b.name, 'tr') : priorityOrder[a.priority] - priorityOrder[b.priority])
  }, [rooms, filter, search, sort])

  const addRoom = (values) => { setRooms((current) => [createRoom(values), ...current]); setModal(null) }
  const editRoom = (values) => { setRooms((current) => current.map((room) => room.id === values.id ? { ...room, ...values } : room)); setModal(null) }
  const toggleStatus = (id) => setRooms((current) => current.map((room) => room.id === id ? { ...room, status: 'Clean', clutterScore: 3.5, aiConfidence: 96.5, priority: 'Düşük', imageUrl: CLEAN_ROOM_IMAGE, lastChecked: new Date().toISOString().slice(0, 16).replace('T', ' '), detectionTime: new Date().toLocaleTimeString('tr-TR'), actionList: ['1. Mevcut düzeni koruyun.', '2. Odayı düzenli aralıklarla yeniden tarayın.'] } : room))
  const deleteRoom = (id) => { if (window.confirm('Bu odayı silmek istediğinize emin misiniz?')) setRooms((current) => current.filter((room) => room.id !== id)) }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-ink">
      <Navbar onAddRoom={() => setModal('add')} />
      <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Genel bakış</p><h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ev düzeni paneli</h2><p className="mt-2 text-sm font-medium text-slate-400">Yapay zekâ destekli oda analizlerinizi tek yerden yönetin.</p></div><div className="flex items-center gap-2 text-xs font-semibold text-slate-400"><Activity size={15} className="text-emerald-500" /> Son senkronizasyon: şimdi</div></div>
        <StatsHeader rooms={rooms} />
        <div className="mt-10 flex flex-col gap-5"><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold tracking-tight">Oda analizleri <span className="ml-1 text-sm font-bold text-slate-400">({visibleRooms.length})</span></h2><button className="hidden items-center gap-1 text-xs font-bold text-brand sm:flex">Tüm geçmişi gör <ChevronRight size={15} /></button></div><FilterBar filter={filter} onFilterChange={setFilter} search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} /></div>
        {visibleRooms.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleRooms.map((room) => <RoomCard key={room.id} room={room} onToggleStatus={toggleStatus} onEdit={(item) => setModal({ type: 'edit', room: item })} onDelete={deleteRoom} />)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><Lightbulb className="mx-auto text-slate-300" size={32} /><p className="mt-3 font-bold text-slate-500">Bu filtreyle eşleşen oda bulunamadı.</p><p className="mt-1 text-sm text-slate-400">Arama veya filtre seçimini değiştirmeyi deneyin.</p></div>}
      </main>
      {modal === 'add' && <AddRoomModal onClose={() => setModal(null)} onSubmit={addRoom} />}
      {modal?.type === 'edit' && <AddRoomModal room={modal.room} onClose={() => setModal(null)} onSubmit={editRoom} />}
    </div>
  )
}
