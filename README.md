# ClutterSense AI

ClutterSense AI, ev içi kamera görüntülerini MobileNetV2 analiz akışını simüle ederek oda düzeni, dağınıklık skoru ve temizlik önceliğine dönüştüren React dashboard uygulamasıdır.

## Özellikler

- React + Vite ile modern frontend kurulumu
- Tailwind CSS ile responsive dashboard arayüzü
- Lucide React ikonları
- LocalStorage ile oda verisi kalıcılığı
- Boş LocalStorage için otomatik başlangıç verisi
- Clean / Messy durum filtreleri ve oda arama
- Oda ve kamera CRUD işlemleri
- Kamera URL'i veya dosya yükleme
- Hazır kamera karesi seçenekleri
- MobileNetV2 analiz yükleme simülasyonu
- AI güveni, dağınıklık skoru ve öncelik hesabı
- Karar destek aksiyonları ve yeniden tarama akışı
- Görsel yükleme fallback'i
- Netlify deployment yapılandırması

## Kurulum

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Proje yapısı

```text
src/
├── interfaces/
│   └── roomModel.js
├── components/
│   ├── AddRoomModal.jsx
│   ├── EditRoomModal.jsx
│   ├── FilterBar.jsx
│   ├── Navbar.jsx
│   ├── RoomCard.jsx
│   └── StatsHeader.jsx
├── pages/
│   └── Dashboard.jsx
├── utils/
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## Eğitim yönergesi karşılığı

- HTML temelleri: `index.html` ve JSX bileşenleri
- CSS temelleri: Tailwind CSS ve responsive utility sınıfları
- JavaScript temelleri: state, filtreleme, form validasyonu ve LocalStorage
- React temelleri: component yapısı, props, hooks ve CRUD akışları
- GitHub: Repository kökü public GitHub repository'sine bağlanmaya hazırdır
- Netlify: `netlify.toml` ile `npm run build` ve `dist` yayın ayarları tanımlıdır

## Teslim öncesi

1. Uygulama ekran görüntüsünü README'ye ekleyin.
2. Değişiklikleri GitHub public repository'sine push edin.
3. Netlify'da repository'yi bağlayıp deploy edin.
4. GitHub ve Netlify linklerini teslim formuna ekleyin.
