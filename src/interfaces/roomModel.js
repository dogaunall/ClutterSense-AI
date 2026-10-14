export const ROOM_STATUS = {
  ALL: 'All',
  MESSY: 'Messy',
  CLEAN: 'Clean',
}

export const PRIORITIES = ['Kritik', 'Yüksek', 'Orta', 'Düşük']

export const MESSY_LIVING_ROOM_IMAGE = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
export const MESSY_BEDROOM_IMAGE = 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
export const CLEAN_KITCHEN_IMAGE = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
export const CLEAN_OFFICE_IMAGE = 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
export const CLEAN_ROOM_IMAGE = CLEAN_OFFICE_IMAGE
export const MESSY_ROOM_IMAGE = MESSY_BEDROOM_IMAGE

export const INITIAL_ROOMS = [
  {
    id: 'room-living',
    name: 'Salon',
    cameraName: 'CAM-01 [Geniş Açı]',
    area: '1. Kat',
    status: 'Messy',
    clutterScore: 92.4,
    aiConfidence: 98,
    priority: 'Kritik',
    imageUrl: MESSY_LIVING_ROOM_IMAGE,
    gradcamUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80',
    lastChecked: '2026-10-14 17:30',
    detectionTime: '17:30:42',
    actionList: ['1. Koltuk üzerindeki eşyaları toplayın.', '2. Sehpa ve zemindeki dağınıklığı düzenleyin.', '3. Kullanılmayan eşyaları yerlerine kaldırın.'],
  },
  {
    id: 'room-bedroom',
    name: 'Yatak Odası',
    cameraName: 'CAM-02 [Geniş Açı]',
    area: '2. Kat',
    status: 'Messy',
    clutterScore: 84.7,
    aiConfidence: 97,
    priority: 'Kritik',
    imageUrl: MESSY_BEDROOM_IMAGE,
    lastChecked: '2026-10-14 16:45',
    detectionTime: '16:45:18',
    actionList: ['1. Yerdeki kıyafetleri toplayın.', '2. Yatak üzerindeki tekstilleri düzenleyin.', '3. Komodin üzerindeki eşyaları sınıflandırın.'],
  },
  {
    id: 'room-kitchen',
    name: 'Mutfak',
    cameraName: 'CAM-03 [Tezgâh Görüşü]',
    area: '1. Kat',
    status: 'Clean',
    clutterScore: 13.4,
    aiConfidence: 97,
    priority: 'Düşük',
    imageUrl: CLEAN_KITCHEN_IMAGE,
    lastChecked: '2026-10-14 15:20',
    detectionTime: '15:20:06',
    actionList: ['1. Tezgâh üzerindeki düzeni koruyun.', '2. Mutfak ekipmanlarını kullanım sonrası yerlerine kaldırın.'],
  },
  {
    id: 'room-office',
    name: 'Çalışma Odası',
    cameraName: 'CAM-04 [Masa Üstü]',
    area: '2. Kat',
    status: 'Clean',
    clutterScore: 24.9,
    aiConfidence: 96,
    priority: 'Orta',
    imageUrl: CLEAN_OFFICE_IMAGE,
    lastChecked: '2026-10-14 14:10',
    detectionTime: '14:10:33',
    actionList: ['1. Kitapları raflara göre sıralayın.', '2. Masa üzerindeki notları arşivleyin.'],
  },
]

export const DEFAULT_ROOMS = INITIAL_ROOMS

export const getPriorityFromScore = (clutterScore) => {
  if (clutterScore > 80) return 'Kritik'
  if (clutterScore > 60) return 'Yüksek'
  if (clutterScore < 40) return 'Düşük'
  return 'Orta'
}

export const createRoom = (values) => ({
  id: `room-${Date.now()}`,
  name: values.name.trim(),
  cameraName: values.cameraName.trim() || `CAM-${String(Date.now()).slice(-2)}`,
  area: values.area.trim(),
  status: values.status,
  clutterScore: Number(values.clutterScore),
  aiConfidence: Number(values.aiConfidence),
  priority: values.priority,
  imageUrl: values.imageUrl.trim(),
  gradcamUrl: values.gradcamUrl || '',
  lastChecked: new Date().toISOString().slice(0, 16).replace('T', ' '),
  detectionTime: new Date().toLocaleTimeString('tr-TR'),
  actionList: values.actionList || [],
})
