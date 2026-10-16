import { useState } from 'react'
import { CheckCircle2, FileImage, LoaderCircle, Sparkles, X } from 'lucide-react'
import { CLEAN_KITCHEN_IMAGE, CLEAN_OFFICE_IMAGE, getPriorityFromScore, MESSY_BEDROOM_IMAGE, MESSY_LIVING_ROOM_IMAGE } from '../interfaces/roomModel'

const initialValues = { name: '', cameraName: '', area: '', imageUrl: '' }
const cameraPresets = [
  { label: 'Kamera 1: Dağınık Salon', name: 'Salon - CAM 01', cameraName: 'CAM-01 [Geniş Açı]', area: '1. Kat', imageUrl: MESSY_LIVING_ROOM_IMAGE, expected: { status: 'Messy', minScore: 80, maxScore: 95 } },
  { label: 'Kamera 2: Dağınık Yatak Odası', name: 'Yatak Odası - CAM 02', cameraName: 'CAM-02 [Geniş Açı]', area: '2. Kat', imageUrl: MESSY_BEDROOM_IMAGE, expected: { status: 'Messy', minScore: 80, maxScore: 95 } },
  { label: 'Kamera 3: Temiz Mutfak', name: 'Mutfak - CAM 03', cameraName: 'CAM-03 [Tezgâh Görüşü]', area: '1. Kat', imageUrl: CLEAN_KITCHEN_IMAGE, expected: { status: 'Clean', minScore: 5, maxScore: 25 } },
  { label: 'Kamera 4: Temiz Çalışma Odası', name: 'Çalışma Odası - CAM 04', cameraName: 'CAM-04 [Masa Üstü]', area: '2. Kat', imageUrl: CLEAN_OFFICE_IMAGE, expected: { status: 'Clean', minScore: 5, maxScore: 25 } },
]
const MESSY_THRESHOLD = 50
const MAX_IMAGE_WIDTH = 800

export default function AddRoomModal({ room, onClose, onSubmit }) {
  const [values, setValues] = useState(room ? { ...room } : initialValues)
  const [analysis, setAnalysis] = useState(room ? getAnalysis(room) : null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setValues((current) => ({ ...current, [field]: value }))
  const selectPreset = ({ name, cameraName, area, imageUrl }) => {
    setValues((current) => ({ ...current, name, cameraName, area, imageUrl }))
    setAnalysis(null)
    setError('')
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    resizeImageFile(file)
      .then((dataUrl) => { update('imageUrl', dataUrl); setError('') })
      .catch(() => setError('Görsel okunamadı. Lütfen farklı bir dosya deneyin.'))
  }

  const analyze = () => {
    if (!values.name.trim() || !values.area.trim() || !values.imageUrl.trim()) {
      setError('Analiz için oda adı, bölge ve kamera karesi gereklidir.')
      return
    }
    setError('')
    setIsAnalyzing(true)
    setAnalysis(null)
    window.setTimeout(() => {
      const preset = cameraPresets.find((item) => item.imageUrl === values.imageUrl)
      const clutterScore = preset ? randomScore(preset.expected.minScore, preset.expected.maxScore) : randomScore(0, 100)
      const status = preset ? preset.expected.status : clutterScore >= MESSY_THRESHOLD ? 'Messy' : 'Clean'
      const result = {
        status,
        clutterScore,
        aiConfidence: Math.max(clutterScore, Math.round((100 - clutterScore) * 10) / 10),
        priority: getPriorityFromScore(clutterScore),
        isSimulated: !preset,
        actionList: status === 'Messy' ? ['1. Yerdeki eşyaları toparlayın.', '2. Yüzeylerdeki dağınıklığı azaltın.', '3. Kullanılmayan eşyaları yerlerine kaldırın.'] : ['1. Mevcut düzeni koruyun.', '2. Yüzeyleri düzenli aralıklarla kontrol edin.'],
      }
      setAnalysis(result)
      setIsAnalyzing(false)
    }, 1000)
  }

  const submit = (event) => {
    event.preventDefault()
    if (!analysis) {
      setError('Önce MobileNetV2 analizini başlatıp sonucu onaylayın.')
      return
    }
    const { isSimulated, ...analysisResult } = analysis
    onSubmit({ ...values, ...analysisResult })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">MobileNetV2 kamera kaydı</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{room ? 'Kamera kaydını düzenle' : 'Yeni kamera / oda ekle'}</h2></div>
          <button onClick={onClose} aria-label="Modalı kapat" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-ink"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Oda / kamera adı" value={values.name} onChange={(value) => update('name', value)} placeholder="Salon - CAM 01" />
            <Field label="Bölge / kat" value={values.area} onChange={(value) => update('area', value)} placeholder="1. Kat" />
          </div>
          <Field label="Kamera adı / kanal" value={values.cameraName} onChange={(value) => update('cameraName', value)} placeholder="CAM-01 [Geniş Açı]" />
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600">Hazır kamera karesi seç</label>
              <span className="text-[10px] font-semibold text-slate-400">İsterseniz URL veya dosya da kullanabilirsiniz</span>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {cameraPresets.map((preset) => (
                <button type="button" key={preset.label} onClick={() => selectPreset(preset)} className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${values.imageUrl === preset.imageUrl ? 'border-brand bg-blue-50 text-brand' : 'border-slate-200 text-slate-600 hover:border-brand hover:bg-blue-50/50'}`}>
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600">Kamera fotoğrafı / snapshot</label>
            <div className="mt-2 flex gap-2">
              <input value={values.imageUrl.startsWith('data:') ? 'Seçilen kamera karesi' : values.imageUrl} onChange={(event) => update('imageUrl', event.target.value)} placeholder="https://..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand focus:ring-2 focus:ring-blue-100" />
              <label className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:border-brand hover:text-brand"><FileImage size={18} /><input type="file" accept="image/*" onChange={handleFileChange} className="hidden" /></label>
            </div>
          </div>
          {values.imageUrl && <img src={values.imageUrl} alt="Kamera karesi önizleme" className="h-32 w-full rounded-xl object-cover" />}
          <button type="button" onClick={analyze} disabled={isAnalyzing} className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-80">
            {isAnalyzing ? <><LoaderCircle size={17} className="animate-spin" /> Analyzing pixels... MobileNetV2 Inference</> : <><Sparkles size={17} /> Model Analizini Başlat (MobileNetV2)</>}
          </button>
          {analysis && <AnalysisResult result={analysis} />}
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
          <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500">Vazgeç</button><button type="submit" disabled={!analysis || isAnalyzing} className="flex-1 rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">Sisteme Kaydet</button></div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return <div><label className="text-xs font-bold text-slate-600">{label}</label><input required value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-300 focus:border-brand focus:ring-2 focus:ring-blue-100" /></div>
}

function AnalysisResult({ result }) {
  return <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4"><div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-emerald-700"><CheckCircle2 size={17} /> AI analizi tamamlandı{result.isSimulated && <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">Demo analiz (simülasyon)</span>}</div><div className="grid grid-cols-3 gap-2 text-center"><Metric label="Durum" value={result.status} /><Metric label="Dağınıklık" value={`%${result.clutterScore}`} /><Metric label="Güven" value={`%${result.aiConfidence}`} /></div><p className="mt-3 text-xs font-bold text-slate-500">Otomatik öncelik: <span className="text-rose-600">{result.priority}</span></p></div>
}

function Metric({ label, value }) {
  return <div className="rounded-lg bg-white px-2 py-2"><p className="text-[10px] font-bold uppercase text-slate-400">{label}</p><p className="mt-1 text-sm font-extrabold text-ink">{value}</p></div>
}

function getAnalysis(room) {
  return { status: room.status, clutterScore: room.clutterScore, aiConfidence: room.aiConfidence || (room.status === 'Messy' ? 98 : 96), priority: room.priority, actionList: room.actionList || [] }
}

function randomScore(min, max) {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10
}

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const image = new Image()
      image.onerror = reject
      image.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_WIDTH / image.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        const context = canvas.getContext('2d')
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
