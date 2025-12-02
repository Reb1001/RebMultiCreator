# Multi Project Creator

Modern ve kullanıcı dostu bir Electron uygulaması ile projelerinizi hızlıca oluşturun!

## 🚀 Özellikler

- ✅ **Responsive Grid Layout**: Şablonlar 3 sütunlu grid düzeninde görüntülenir
- ✅ **Adaptif Tasarım**: Pencere boyutu değiştikçe kartlar otomatik olarak yeniden düzenlenir
  - Büyük ekranlar: 3 sütun
  - Orta ekranlar (< 1100px): 2 sütun  
  - Küçük ekranlar (< 700px): 1 sütun
- ✅ **Windows Desteği**: NSIS installer ile kolay kurulum
- ✅ **Linux Desteği**: AppImage ve .deb paketleri
- ✅ **Modern UI**: Gradient renkler ve smooth animasyonlar
- ✅ **TypeScript + React**: Tip güvenli ve modern kod yapısı

## 📦 Kurulum

### Geliştirme Ortamı

```bash
npm install
npm run dev
```

### Production Build

```bash
# Windows için
npm run dist:win

# Linux için (Linux ortamında)
npm run dist:linux
```

## 🎨 Responsive Grid Sistemi

Grid yapılandırması `src/renderer/styles.css` dosyasında tanımlıdır ve pencere boyutuna göre otomatik adapte olur.

## 🛠️ Teknolojiler

- Electron 28 + React 18 + TypeScript 5
- Webpack 5 + electron-builder

## 📝 Lisans

MIT
