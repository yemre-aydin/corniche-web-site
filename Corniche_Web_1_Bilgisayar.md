# CORNICHE İSTANBUL – WEB SİTESİ TEKNİK TASARIM TALİMATI
## BÖLÜM 1: BİLGİSAYAR (1024 px ve üzeri)

Bu belge, tasarım kararlarının tamamını içerir. Belgede yazmayan hiçbir renk, yazı tipi, boyut, efekt veya içerik eklenmeyecek. Bir konu belgede yoksa uygulamadan önce sorulacak.

Ekler: `Corniche_anasayfa_masaustu.png` (ana sayfa yerleşimi)

---

## 0. GENEL KURALLAR

- Referans sitenin (STUDIO) hiçbir içeriği, metni, proje adı veya görseli kalmayacak.
- Gerçekte olmayan proje, müşteri, ödül, rakam veya hizmet eklenmeyecek. Bilgi yoksa köşeli parantezli yer tutucu bırakılacak: `[Proje adı]`.
- Hiçbir yazı ve görsel birbirinin üzerine binmeyecek.
- Gölge (box-shadow), gradyan, parlama, bulanıklık efekti kullanılmayacak.
- Köşeler düz olacak (border-radius: 0). Yuvarlak köşe yok.
- Tasarım 1440 px genişlikte hazırlanacak; 1280 px ve 1024 px'te ayrıca kontrol edilecek.

---

## 1. RENKLER

CSS değişkenleri olarak tanımlanacak, başka renk kodu kullanılmayacak:

```css
:root {
  --kum:   #E9DFD0;  /* Sıcak Kum   */
  --bej:   #D4BEA5;  /* Doğal Bej   */
  --vizon: #A18D7B;  /* Vizon       */
  --taupe: #796A60;  /* Taupe       */
  --kahve: #48382F;  /* Koyu Kahve  */
  --bronz: #A47C52;  /* Bronz       */
  --siyah: #171717;  /* Siyah       */
  --beyaz: #FFFFFF;  /* Beyaz       */
}
```

### Açık sayfalar
(Ana sayfa, Hakkımızda, Hizmetlerimiz, Koleksiyon, Showroom, İletişim)

| Öğe | Renk |
|---|---|
| Sayfa zemini | `--kum` |
| Gövde metni | `--kahve` |
| Başlıklar | `--siyah` |
| Ayırıcı çizgiler | `--bej` |
| Görsel yer tutucu kutular | `--vizon` |

### Koyu sayfalar
(Proje detay sayfaları, footer)

| Öğe | Renk |
|---|---|
| Sayfa zemini | `--kahve` |
| Gövde metni | `--kum` |
| Başlıklar | `--beyaz` |
| Küçük etiketler (Konum, Yıl vb.) | `--bej` |
| Ayırıcı çizgiler | `--taupe` |

### Bronz kullanım kuralı
`--bronz` SADECE şu yerlerde kullanılacak:
- Link ve butonların alt çizgisi
- Aktif menü öğesinin alt çizgisi
- Seçili kategorinin alt çizgisi / çerçevesi
- Buton çerçeveleri
- Ana sayfa halkasındaki elips çizgisi

`--bronz` hiçbir yerde **yazı rengi** veya **dolgu (arka plan) rengi** olarak kullanılmayacak. (Kontrast: kum zeminde 2.9:1, kahve zeminde 3.0:1 — okunmuyor.)

### Yasaklar
- `--taupe` ve `--vizon` sayfa zemini olarak kullanılmayacak.
- `--taupe` açık zeminde yazı rengi olarak kullanılmayacak.
- Palet dışında renk yok (bordo, yeşil, mavi link rengi, turuncu vb.).
- Tarayıcının varsayılan mavi link rengi ve mavi seçim (focus) çerçevesi kalmayacak; focus çerçevesi `outline: 1px solid var(--bronz); outline-offset: 4px;` olacak.

---

## 2. YAZI TİPLERİ

Google Fonts'tan yüklenecek:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500&display=swap" rel="stylesheet">
```

- **Başlıklar:** Cormorant Garamond, 500
- **Gövde, menü, buton, etiket:** Jost, 400 (vurgu için 500)
- Başka yazı tipi kullanılmayacak.

### Yazı boyutları (bilgisayar)

| Kullanım | Yazı tipi | Boyut | Satır aralığı | Harf aralığı | Büyük harf |
|---|---|---|---|---|---|
| H1 (sayfa başlığı) | Cormorant 500 | 56 px | 1.05 | 0 | Hayır |
| H2 (bölüm başlığı) | Cormorant 500 | 40 px | 1.1 | 0 | Hayır |
| H3 (alt başlık) | Cormorant 500 | 28 px | 1.2 | 0 | Hayır |
| Tanıtım cümlesi | Cormorant italik 400 | 22 px | 1.4 | 0 | Hayır |
| Gövde metni | Jost 400 | 17 px | 1.7 | 0 | Hayır |
| Menü | Jost 400 | 14 px | 1 | 0.08em | Hayır |
| Buton / link | Jost 400 | 14 px | 1 | 0.06em | Hayır |
| Kategori adı (halka) | Jost 500 | 13 px | 1 | 0.18em | Evet |
| Küçük etiket | Jost 400 | 12 px | 1.4 | 0.16em | Evet |

- Metin satırının genişliği en fazla 640 px.
- Türkçe karakterler (İ, ı, ş, ğ, ç, ö, ü) doğru görünecek. Büyük harfe çevirirken `İ` doğru çıksın diye `<html lang="tr">` kullanılacak (İngilizce sayfada `lang="en"`).

---

## 3. GENEL ÖLÇÜLER

| Öğe | Değer |
|---|---|
| İçerik maksimum genişliği | 1280 px, ortada |
| Sağ/sol kenar boşluğu | 56 px |
| Bölümler arası dikey boşluk | 120 px |
| Başlık ile metin arası | 24 px |
| Izgara boşluğu (gap) | 32 px |
| Görsel köşeleri | Düz (0) |

Ana sayfa halkası bu maksimum genişliğe uymaz, ekranın tamamını kullanır.

---

## 4. ÜST MENÜ (HEADER)

- Yükseklik: 88 px
- Zemin: şeffaf (sayfa zemini görünür). Sayfa aşağı kaydırılınca zemin `--kum` olur, altında 1 px `--bej` çizgi belirir. Geçiş 200 ms.
- Sol: Ana sayfa dışındaki sayfalarda küçük logo (yükseklik 40 px). Ana sayfada logo ortada olduğu için solda logo yok.
- Sağ: menü öğeleri, aralarında 36 px boşluk:

  **Projeler · Hakkımızda · Hizmetlerimiz · Koleksiyon · Showroom · İletişim**

- En sağda, menüden 48 px sonra: `TR / EN`
  - Aktif dil: `--siyah`, Jost 500
  - Pasif dil: `--kahve`, Jost 400
  - Ayraç "/": `--kahve`

### Menü durumları
| Durum | Renk | Alt çizgi |
|---|---|---|
| Normal | `--kahve` | yok |
| Üzerine gelince (hover) | `--siyah` | 1.5 px `--bronz`, yazının 6 px altında |
| Aktif sayfa | `--siyah` | 1.5 px `--bronz`, kalıcı |

Geçiş süresi: 200 ms, ease.

### Koleksiyon açılır menüsü
- "Koleksiyon" üzerine gelince altında açılır kutu:
  - Zemin `--kum`, 1 px `--bej` çerçeve, iç boşluk 20 px 24 px
  - Öğeler alt alta, aralarında 14 px: **Özel Tasarım Mobilya · Aydınlatma · Tekstil · Aksesuar · Sanat**
  - Öğeler Jost 14 px, `--kahve`; hover'da `--siyah` + bronz alt çizgi
- Menü başlıklarının altında İngilizce karşılık (Projects, About us vb.) **olmayacak**.

---

## 5. ANA SAYFA – PROJE HALKASI

### Alan
- Yükseklik: ekran yüksekliği (100vh), en az 760 px, en fazla 900 px.
- Zemin: `--kum`

### Elips
- Merkez: yatayda ekranın ortası, dikeyde alanın %55'i.
- Yatay yarıçap: ekran genişliğinin %36'sı (1440 px'te 520 px).
- Dikey yarıçap: 270 px.
- Çizgi: 1 px, `--bronz`, opaklık 0.5.

### Kategoriler ve yerleri
Saat yönünde, elips üzerinde (açılar: 0° = sağ, -90° = üst):

| Sıra | Kategori (TR) | Kategori (EN) | Açı | Kart boyutu |
|---|---|---|---|---|
| 1 | Otel Projeleri | Hospitality | -90° (üst orta) | 220 × 146 px |
| 2 | Villa | Villa | -30° | 180 × 120 px |
| 3 | Konut | Residential | 30° | 180 × 120 px |
| 4 | Yat & Marin* | Yacht & Marine | 90° (alt orta) | 180 × 120 px |
| 5 | Ticari Mekânlar | Commercial Spaces | 150° | 180 × 120 px |
| 6 | Yenileme | Renovation | 210° | 180 × 120 px |

\* Yat & Marin teyit bekliyor. Kaldırılırsa kalan 5 kategori elips üzerine eşit aralıkla (72°) dağıtılacak, Otel Projeleri yine -90°'de kalacak.

**Halkadan çıkarılacaklar:** Textiles, Art, Bespoke Furniture (Koleksiyon menüsüne gidiyor), Kids' Rooms (çocuk odası görselleri Villa/Konut projelerinin içinde gösterilecek).

### Kart kuralları
- Görsel: `object-fit: cover`, köşeler düz.
- Otel Projeleri kartı: `outline: 2px solid var(--bronz); outline-offset: 4px;`
- Kategori adı kartın DIŞINDA:
  - Üst yarıdaki kartlarda (-90°, -30°, 210°) kartın 10 px üstünde
  - Alt yarıdaki kartlarda (30°, 90°, 150°) kartın 10 px altında
  - Ortalanmış, tek satır, kesilmeyecek
- Kategori adı rengi `--kahve`; Otel Projeleri `--siyah`.
- Hiçbir kart ortadaki logo alanına girmeyecek, birbirine değmeyecek. En küçük boşluk 40 px.

### Görsel seçimi
- Her kartta o kategorinin **en iyi bitmiş proje fotoğrafı**.
- Şantiye, yapım aşaması, insan, dağınıklık içeren fotoğraf kullanılmayacak.
- Yatay fotoğraf kullanılacak (3:2 oran).

### Etkileşim
| Olay | Davranış |
|---|---|
| Karta gelince | Kart `scale(1.04)`, diğer kartlar `opacity: 0.55`, kategori adının altında 1.5 px bronz çizgi. Süre 300 ms, ease-out |
| Karta tıklayınca | O kategorinin proje listesi sayfası açılır |
| Halka dönüşü (3D sürüm korunursa) | Bir tam tur 60 saniye; fare halkanın üzerindeyken durur |
| `prefers-reduced-motion: reduce` | Dönüş yok, hover büyümesi yok |

### Ortadaki alan
- Orijinal logo (dosya gelecek), genişlik 340 px. Logo yeniden çizilmeyecek, yazı tipiyle taklit edilmeyecek.
- Logo gelene kadar: 340 × 220 px, 1 px kesik çizgili `--taupe` çerçeveli boş kutu.
- Logonun 20 px altında: `[Firma tanıtım cümlesi]` — Cormorant italik 22 px, `--kahve`. (Cümle sonra gelecek.)
- "SEÇİLİ İŞLER" yazısı kaldırılacak.
- Üst ortadaki siyah nokta kaldırılacak.

### Alt köşeler
- Sol alt, kenardan 56 px, alttan 32 px: **Projeleri filtrele +**
- Sağ alt, kenardan 56 px, alttan 32 px: **Izgara görünümü +**
- Jost 14 px, `--siyah`, 1.5 px `--bronz` alt çizgi (yazının 6 px altında).

---

## 6. PROJE LİSTESİ / IZGARA GÖRÜNÜMÜ

- Zemin `--kum`.
- Üstte sayfa başlığı (H1): kategori adı, örn. "Otel Projeleri".
- Altında kategori sekmeleri: Tümü · Otel Projeleri · Villa · Konut · Yat & Marin · Ticari Mekânlar · Yenileme
  - Jost 14 px, aralarında 32 px; aktif sekme `--siyah` + bronz alt çizgi.
- Izgara: 3 sütun, boşluk 32 px.
- Her kart:
  - Görsel 3:2, bitmiş proje fotoğrafı
  - 16 px altında küçük etiket (kategori), `--kahve`
  - 6 px altında proje adı, Cormorant 24 px, `--siyah`
  - Hover: görsel `scale(1.03)` (taşma gizli), 300 ms

---

## 7. PROJE DETAY SAYFASI (koyu tema)

- Zemin `--kahve`. Header bu sayfada da `--kahve` zeminli; menü yazıları `--kum`, aktif/hover `--beyaz`, logo beyaz versiyon.

Yukarıdan aşağıya:

1. **Geri linki:** "← Tüm projeler", Jost 14 px, `--kum`, bronz alt çizgi. Üstten 32 px.
2. **Ana fotoğraf:** içerik genişliğinde (1280 px), yükseklik 600 px, `object-fit: cover`. Bitmiş hal.
3. **Bilgi alanı** (fotoğrafın 64 px altında), 12 sütunlu ızgara:
   - Sol (7 sütun):
     - Küçük etiket: kategori (örn. OTEL PROJESİ), `--bej`
     - 12 px altında H1: proje adı, `--beyaz`
     - 20 px altında 64 × 1 px `--bronz` çizgi
     - 20 px altında proje hikâyesi (2–3 cümle: ihtiyaç, çözüm, sonuç), 17 px, `--kum`
   - Sağ (4 sütun, 1 sütun boşluktan sonra): bilgi satırları
     - Konum · Yıl · Kapsam
     - Her satır: solda etiket (`--bej`, 14 px), sağda değer (`--kum`, 14 px), altında 1 px `--taupe` çizgi, dikey iç boşluk 12 px
     - Bilgi yoksa o satır hiç gösterilmeyecek
4. **Galeri** (120 px altında): H2 "Proje", 2 sütun, boşluk 16 px, görseller 3:2. Tıklayınca tam ekran açılır (koyu zemin, ok tuşlarıyla gezinme).
5. **Süreç** (120 px altında): H2 "Süreç". Şantiye ve yapım aşaması fotoğrafları burada, 3 sütun, boşluk 16 px.
   - Yenileme projelerinde bunun yerine **Öncesi / Sonrası**: iki fotoğraf yan yana, üstlerinde "ÖNCESİ" ve "SONRASI" etiketleri (`--bej`).
6. **Buton** (120 px altında, ortada): **PROJENİZİ KONUŞALIM**
   - 280 × 56 px, 1 px `--bronz` çerçeve, zemin şeffaf
   - Yazı Jost 14 px, harf aralığı 0.1em, `--beyaz`
   - Hover: zemin `--kum`, yazı `--kahve`, 200 ms
   - Tıklayınca: İletişim sayfası
7. **Diğer projeler:** aynı kategoriden 3 proje kartı (Bölüm 6 kart yapısı, renkler koyu temaya göre).

---

## 8. KOLEKSİYON SAYFALARI (açık tema)

- Koleksiyon ana sayfası: 5 büyük kart; üstte 2, altta 3, boşluk 32 px, görsel 4:5. Altlarında H3 başlık, sıra:
  Özel Tasarım Mobilya · Aydınlatma · Tekstil · Aksesuar · Sanat
- Alt sayfalar: H1 başlık, altında 2–3 cümlelik açıklama yer tutucusu, sonra ürün ızgarası:
  - 3 sütun, boşluk 32 px, görsel 4:5
  - 14 px altında ürün adı, Cormorant 22 px, `--siyah`
  - 8 px altında **Bilgi al** linki: Jost 14 px, `--kahve`, bronz alt çizgi → WhatsApp
- Sepet, fiyat, satın al butonu **olmayacak**.
- Aydınlatma sayfası (avize, lambader, aplik) diğer Koleksiyon alt sayfalarıyla birebir aynı yapıda. Açılışta ürün sayısı azsa sayfa menüden geçici gizlenebilir, ürünler eklenince açılır.

---

## 9. DİĞER SAYFALAR (açık tema)

### Hakkımızda
- H1 "Hakkımızda"
- İki sütun: solda metin (7 sütun), sağda showroom/ekip fotoğrafı (5 sütun, 4:5).
- Metin yer tutucu: `[Firma hikâyesi – metin gelecek]`

### Hizmetlerimiz
- H1 "Hizmetlerimiz"
- Hizmetler alt alta liste, her biri: solda H3 başlık (4 sütun), sağda 1–2 cümle açıklama (7 sütun), altında 1 px `--bej` çizgi, dikey iç boşluk 32 px:
  1. İç Mimarlık
  2. Anahtar Teslim Projeler
  3. Mobilya
  4. Perde
  5. Aydınlatma
  6. Dekorasyon
  7. Sanat Seçkisi
- Altında H2 "Nasıl Çalışıyoruz": 4 adım yan yana, her birinde büyük numara (Cormorant 40 px, `--bronz` DEĞİL, `--siyah`), başlık ve açıklama yer tutucusu.

### Showroom (teyit bekliyor)
- H1 "Showroom"
- Üstte büyük showroom fotoğrafı (1280 × 600)
- Altında iki sütun: solda adres + çalışma saatleri, sağda Google Haritalar (yükseklik 400 px, gri tonlu değil, standart).

### İletişim
- H1 "İletişim"
- Sol sütun (5 sütun):
  - Telefon: **0212 282 26 09** → `tel:+902122822609`
  - WhatsApp: **0545 282 26 09** → `https://wa.me/905452822609`
  - E-posta: **info@corniche.com.tr** → `mailto:`
  - Adres: **Levent Mah. Ebulula Mardin Cad. No:99, Beşiktaş/İstanbul 34330**
  - Çalışma saatleri: **Hafta içi 09:00–19:00 · Cumartesi 09:00–18:30 · Pazar kapalı**
  - Her bilgi: küçük etiket (`--kahve`, 12 px büyük harf) + değer (17 px `--siyah`), aralarında 28 px
- Sağ sütun (6 sütun): form
  - Alanlar: Ad Soyad · Telefon · E-posta · Mesaj
  - Alan stili: zemin şeffaf, sadece alt çizgi 1 px `--taupe`, yükseklik 48 px; odaklanınca alt çizgi `--bronz`
  - Etiketler alanın üstünde, 12 px büyük harf `--kahve`
  - KVKK onay kutusu (zorunlu): "KVKK Aydınlatma Metni'ni okudum, onaylıyorum." (metin linkli)
  - Gönder butonu: Bölüm 7'deki buton stili, açık zemin versiyonu: çerçeve `--bronz`, yazı `--siyah`, hover'da zemin `--kahve` yazı `--kum`
- Altta tam genişlikte Google Haritalar, yükseklik 420 px.

---

## 10. FOOTER (koyu tema)

- Zemin `--kahve`, üst/alt iç boşluk 80 px / 32 px.
- 4 sütun:
  1. Beyaz logo (yükseklik 56 px)
  2. Adres + çalışma saatleri
  3. Telefon, WhatsApp, e-posta (tıklanabilir)
  4. Sosyal medya: Instagram (instagram.com/cornicheistanbul), Facebook. Simgeler 20 px, `--kum`, hover `--beyaz`. TikTok ve LinkedIn içerik hazır olunca eklenecek.
- En altta, 1 px `--taupe` çizginin altında: © 2026 Corniche İstanbul · KVKK Aydınlatma Metni · Çerez Politikası · TR / EN — Jost 13 px, `--bej`.

---

## 11. DİL (TR / EN)

- TR seçiliyken sitede İngilizce kelime kalmayacak; EN seçiliyken Türkçe kelime kalmayacak.
- Adresler: `/tr/...` ve `/en/...` (örn. `/tr/projeler/villa`, `/en/projects/villa`).
- Dil değişince aynı sayfanın diğer dildeki karşılığı açılacak (ana sayfaya atmayacak).

---

## 12. GÖRSEL KALİTESİ

| Kullanım | Kaynak genişliği (en az) | Yayın formatı | En büyük dosya |
|---|---|---|---|
| Proje detay ana fotoğraf | 2400 px | WebP, kalite 80 | 350 KB |
| Galeri | 1600 px | WebP, kalite 80 | 200 KB |
| Halka kartları / ızgara | 800 px | WebP, kalite 78 | 100 KB |
| Koleksiyon ürünleri | 1200 px | WebP, kalite 80 | 150 KB |

- Kaynak çözünürlüğü bu değerlerin altında olan fotoğraf **büyütülerek kullanılmayacak**; bulanık görünür. Böyle fotoğraflar ayrıca bildirilecek.
- `srcset` ile ekran boyutuna göre doğru boyut yüklenecek.
- Ekran dışındaki görseller `loading="lazy"`.
- Her görselde açıklayıcı `alt` metni: örn. "Corniche İstanbul villa projesi, salon".
- Renk düzeltmesi: fotoğraflar arasında beyaz dengesi tutarlı, hafif sıcak ton. Aşırı filtre yok.

---

## 13. HIZ, GOOGLE, BAKIM

- Her projenin kendi sayfası ve kalıcı linki olacak.
- Her sayfada ayrı `title` ve `meta description`.
- Google Lighthouse (bilgisayar) performans puanı en az 90.
- Corniche ekibi yeni proje, fotoğraf ve ürünü kod bilmeden ekleyebilecek (yönetim paneli / CMS).
- Google Analytics için ayrı ölçülecek olaylar: WhatsApp tıklaması, telefon tıklaması, e-posta tıklaması, form gönderimi.

---

## 14. BEKLEYEN BİLGİLER (yer tutucu kalacak)

- Orijinal logo dosyası (açık ve koyu zemin versiyonu)
- Firma tanıtım cümlesi
- Yat & Marin: gerçek proje var mı?
- Showroom: Corniche'in kendisine mi ait?
- Proje listesi: ad, kategori, konum, yıl, açıklama, fotoğraflar
- Hakkımızda, Hizmetler, Nasıl Çalışıyoruz metinleri
- KVKK ve Çerez metinleri

---

## 15. TESLİM ÖNCESİ KONTROL LİSTESİ (bilgisayar)

- [ ] Referans siteden hiçbir içerik kalmadı
- [ ] 1440 / 1280 / 1024 px'te hiçbir yazı ve görsel üst üste binmiyor
- [ ] Otel Projeleri halkanın en üstünde, bronz çerçeveli
- [ ] Halkada 6 (veya 5) kategori var; Textiles, Art, Bespoke, Kids' Rooms yok
- [ ] Bronz hiçbir yerde yazı veya zemin rengi değil
- [ ] Palet dışında renk yok; mavi link/seçim rengi yok
- [ ] Sadece Cormorant Garamond ve Jost kullanılıyor
- [ ] TR modunda İngilizce kelime yok
- [ ] Menüde Koleksiyon var, çift dilli başlıklar yok
- [ ] Her proje kendi linkinde açılıyor
- [ ] Ana sayfada şantiye fotoğrafı yok
- [ ] Telefon, WhatsApp, e-posta linkleri çalışıyor
- [ ] Lighthouse performans ≥ 90
