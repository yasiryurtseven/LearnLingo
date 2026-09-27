# 🌍 LearnLingo — Online Language Learning Platform

LearnLingo, kullanıcıların dünya çapındaki profesyonel dil eğitmenlerini inceleyebileceği, ihtiyaçlarına göre filtreleyebileceği ve deneme dersi randevusu alabileceği modern bir çevrim içi dil öğrenim platformudur.

---

## 🚀 Canlı Demo & Dağıtım

- **Canlı Site:** [LearnLingo Live Demo](https://learn-lingo-xi-lyart.vercel.app/)
- **Figma Tasarımı:** [LearnLingo Figma Maketi](https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=44-540&t=1WVclQKSHYYZyAPW-0)

---

## 🛠️ Kullanılan Teknolojiler

- **Frontend Kütüphanesi:** React 18+
- **Geliştirme Ortamı & Bundler:** Vite
- **Yönlendirme (Routing):** React Router DOM v6
- **Stil Yönetimi:** CSS Modules
- **Yetkilendirme & Veritabanı:** Firebase Authentication & Firebase Realtime Database
- **Form & Validasyon Yönetimi:** React Hook Form & Yup
- **Bildirimler:** React Hot Toast
- **İkonlar:** React Icons

---

## 📋 Teknik Özellikler ve İşlevler

### 1. Kimlik Doğrulama (Firebase Auth)
- Kullanıcı kaydı (Registration) ve girişi (Log In).
- Güçlü form doğrulamaları (zorunlu alanlar, geçerli e-posta, minimum şifre uzunluğu).
- Escape tuşu, backdrop tıklaması ve kapatma butonuyla kapanabilen modallar.
- Oturum durumunun dinlenmesi, dinamik Header ve oturum kapatıldığında güvenli yönlendirme.

### 2. Öğretmenler & Sayfalama (Teachers Page & Load More)
- Firebase Realtime Database üzerinden dinamik olarak çekilen öğretmen koleksiyonu.
- Başlangıçta 4 öğretmen kartı gösterimi ve **"Load more"** butonuyla sonraki kartların yüklenmesi.
- **Read more** seçeneği ile öğretmenin detaylı deneyimi ve öğrenci değerlendirmelerine erişim.

### 3. Favori Yönetimi & Korumalı Rota (Favorites & PrivateRoute)
- Giriş yapmış kullanıcılar için Firebase üzerinde kullanıcıya özel `favorites` senkronizasyonu.
- Sayfa yenilendiğinde korunan favori durumları ve anlık güncellenen kalp butonları.
- Yetkisiz kullanıcılar için bilgilendirme bildirimleri.
- Oturum açmamış kullanıcıların `/favorites` sayfasına doğrudan erişimini engelleyen **PrivateRoute** mimarisi.

### 4. Filtreleme Sistemi 
- Öğretim dili (Languages), bilgi seviyesi (Level of knowledge) ve saatlik ücret (Price) bazında anlık filtreleme.
- Filtreleme yapıldığında otomatik sıfırlanan ve listeyi yeniden düzenleyen yapı.
- Filtreleri tek tıkla temizleme olanağı sağlayan sıfırlama butonu.

### 5. Deneme Dersi Rezervasyonu (Book Trial Lesson Modal)
- Seçilen öğretmen bilgileriyle açılan rezervasyon formu.
- Öğrenme amacını seçmeye yarayan dinamik radio buton grubu.
- Validasyonlu isim, e-posta ve telefon numarası alanları.

---

## 💻 Kurulum ve Yerel Geliştirme

Projeyi yerel makinenizde çalıştırmak için:

```bash
# 1. Depoyu klonlayın
git clone https://github.com/yasiryurtseven/LearnLingo.git

# 2. Proje dizinine gidin
cd LearnLingo

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirici sunucusunu başlatın
npm run dev

src/
├── assets/          # Statik görseller ve ikonlar
├── components/      # Yeniden kullanılabilir bileşenler (Header, TeacherCard, Filters, Modals...)
├── Context/         # AuthContext ve FavoritesContext sağlayıcıları ve hook'ları
├── firebase/        # Firebase konfigürasyon dosyaları
├── pages/           # HomePage, TeachersPage, FavoritesPage
├── App.jsx          # Rota tanımları ve ana uygulama iskeleti
└── main.jsx         # Context sağlayıcıları ve DOM render girişi