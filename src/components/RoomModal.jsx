import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { PRIORITIES } from '../interfaces/roomModel'

const initialValues = { name: '', area: '', status: 'Messy', clutterScore: 50, priority: 'Orta', imageUrl: '' }

export default function RoomModal({ title, submitLabel, room, onClose, onSubmit }) {
  const [values, setValues] = useState(room ? { ...room } : initialValues)
  const [error, setError] = useState('')

  useEffect(() => {
    setValues(room ? { ...room } : initialValues)
  }, [room])

  const update = (field, value) => setValues((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!values.name.trim() || !values.area.trim()) {
      setError('Oda adı ve bölge bilgisi zorunludur.')
      return
    }
    if (values.imageUrl && !/^https?:\/\/.+/.test(values.imageUrl)) {
      setError('Görsel URL’i http:// veya https:// ile başlamalıdır.')
      return
    }
    onSubmit({ ...values, clutterScore: Number(values.clutterScore) })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Oda yönetimi</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{title}</h2></div>
          <button onClick={onClose} aria-label="Modalı kapat" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-ink"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Oda adı" value={values.name} onChange={(value) => update('name', value)} placeholder="Örn. Yatak Odası" />
            <Field label="Bölge / Kat" value={values.area} onChange={(value) => update('area', value)} placeholder="Örn. 2. Kat" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600">Durum</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['Messy', 'Clean'].map((status) => <button type="button" key={status} onClick={() => update('status', status)} className={`rounded-xl border py-2.5 text-sm font-bold transition ${values.status === status ? (status === 'Messy' ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-emerald-200 bg-emerald-50 text-emerald-600') : 'border-slate-200 text-slate-400'}`}>{status === 'Messy' ? 'Dağınık' : 'Temiz'}</button>)}
            </div>
          </div>
          <div>
            <div className="flex justify-between"><label htmlFor="clutterScore" className="text-xs font-bold text-slate-600">Dağınıklık skoru</label><span className="text-sm font-extrabold text-brand">%{values.clutterScore}</span></div>
            <input id="clutterScore" type="range" min="0" max="100" step="0.1" value={values.clutterScore} onChange={(event) => update('clutterScore', event.target.value)} className="mt-3 w-full accent-brand" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="priority" className="text-xs font-bold text-slate-600">Öncelik seviyesi</label><select id="priority" value={values.priority} onChange={(event) => update('priority', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand">{PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}</select></div>
            <Field label="Görsel URL'i" value={values.imageUrl} onChange={(value) => update('imageUrl', value)} placeholder="https://..." />
          </div>
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
          <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50">Vazgeç</button><button type="submit" className="flex-1 rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600">{submitLabel}</button></div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return <div><label className="text-xs font-bold text-slate-600">{label}</label><input required={label !== "Görsel URL'i"} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-300 focus:border-brand focus:ring-2 focus:ring-blue-100" /></div>
}
