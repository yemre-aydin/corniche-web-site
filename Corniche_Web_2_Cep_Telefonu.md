# CORNICHE İSTANBUL – WEB SİTESİ TEKNİK TASARIM TALİMATI
## BÖLÜM 2: CEP TELEFONU VE TABLET (1024 px altı)

Bu belge, Bölüm 1 (Bilgisayar) ile birlikte kullanılacak. Renkler, yazı tipleri ve içerik kuralları aynıdır; burada sadece telefona ve tablete özel farklar yazılıdır. Belgede yazmayan hiçbir renk, boyut, efekt veya içerik eklenmeyecek. Bir konu belgede yoksa uygulamadan önce sorulacak.

Ekler: `Corniche_anasayfa_mobil.png`, `Corniche_menu_mobil.png`

---

## 0. GENEL KURALLAR

- Tasarım 390 px genişlikte (iPhone) hazırlanacak; 360 px (Android) ve 430 px'te ayrıca kontrol edilecek.
- Tablet aralığı: 768–1023 px.
- Gerçek telefonda, mobil veriyle (Wi-Fi değil) test edilecek.
- Sayfa hiçbir ekranda yana kaymayacak (yatay kaydırma çubuğu çıkmayacak). Tek istisna: kategori satırı (Bölüm 5).
- Yakınlaştırmadan okunamayan hiçbir yazı olmayacak.
- Her dokunulan öğenin (buton, link, menü, ikon) dokunma alanı en az 44 × 44 px.
- Fare "hover" efektleri telefonda yok; yerine dokununca kısa bir geri bildirim (opaklık 0.7, 100 ms).

---

## 1. RENKLER

Bölüm 1 ile birebir aynı. Hatırlatma:

```css
:root {
  --kum:   #E9DFD0;
  --bej:   #D4BEA5;
  --vizon: #A18D7B;
  --taupe: #796A60;
  --kahve: #48382F;
  --bronz: #A47C52;
  --siyah: #171717;
  --beyaz: #FFFFFF;
}
```

- Açık sayfalar: zemin `--kum`, metin `--kahve`, başlık `--siyah`
- Koyu sayfalar (proje detay, menü paneli, footer): zemin `--kahve`, metin `--kum`, başlık `--beyaz`
- `--bronz` sadece çizgi ve çerçevede; asla yazı veya zemin rengi değil.
- Telefonun üst durum çubuğu rengi: `<meta name="theme-color" content="#E9DFD0">` (proje detay sayfasında `#48382F`).

---

## 2. YAZI BOYUTLARI (telefon)

| Kullanım | Yazı tipi | Boyut | Satır aralığı | Harf aralığı |
|---|---|---|---|---|
| H1 | Cormorant 500 | 36 px | 1.1 | 0 |
| H2 | Cormorant 500 | 28 px | 1.15 | 0 |
| H3 | Cormorant 500 | 22 px | 1.25 | 0 |
| Öne çıkan proje adı | Cormorant 500 | 32 px | 1.1 | 0 |
| Gövde metni | Jost 400 | 16 px | 1.65 | 0 |
| Menü panel öğeleri | Jost 400, BÜYÜK HARF | 20 px | 1 | 0.1em |
| Buton / link | Jost 400 | 15 px | 1 | 0.04em |
| Kategori satırı | Jost 400 (aktif 500) | 15 px | 1 | 0 |
| Küçük etiket | Jost 400, BÜYÜK HARF | 12 px | 1.4 | 0.16em |

- Gövde metni hiçbir yerde 16 px'in altına inmeyecek (iPhone, 16 px altındaki form alanlarında otomatik yakınlaştırma yapar).

---

## 3. GENEL ÖLÇÜLER (telefon)

| Öğe | Değer |
|---|---|
| Sağ/sol kenar boşluğu | 20 px |
| Bölümler arası dikey boşluk | 72 px |
| Başlık ile metin arası | 16 px |
| Izgara boşluğu | 12 px |

Tablette kenar boşluğu 40 px, bölümler arası 96 px.

---

## 4. ÜST MENÜ (HEADER) – telefon ve tablet

- Yükseklik: 64 px. Sayfa kaydırılınca üstte sabit kalır, zemin `--kum`, altında 1 px `--bej` çizgi.
- Sol: logo, yükseklik 32 px. (Küçük boyutta alt satırları okunmuyorsa amblem + CORNICHE versiyonu kullanılacak; logo dosyası gelince karar verilecek.)
- Sağ: üç çizgi ikonu
  - 2 yatay çizgi, 30 px uzunluk, 2 px kalınlık, aralarında 10 px, renk `--siyah`
  - Dokunma alanı 44 × 44 px

### Menü paneli (üç çizgiye basınca)
(Bkz. `Corniche_menu_mobil.png`)

- Sağdan kayarak açılır, 300 ms, ease-out. Tam ekran.
- Zemin `--kahve`.
- Üst satır: solda beyaz logo, sağda kapatma (X) ikonu: 22 px, 2 px çizgi, `--beyaz`, dokunma alanı 44 × 44 px.
- Menü öğeleri, X'in 44 px altından başlar, alt alta:
  - **PROJELER**
  - **HAKKIMIZDA**
  - **HİZMETLERİMİZ**
  - **KOLEKSİYON** (sağında `+` / `−`, `--bronz`)
  - **SHOWROOM**
  - **İLETİŞİM**
- Her öğe: Jost 20 px büyük harf, harf aralığı 0.1em, renk `--kum`; aktif sayfa `--beyaz`. Dikey iç boşluk 16 px, altında 1 px `--taupe` çizgi.
- **Koleksiyon**'a dokununca alt başlıklar açılır (250 ms):
  - Özel Tasarım Mobilya · Aydınlatma · Tekstil · Aksesuar · Sanat
  - Jost 15 px, `--bej`, soldan 16 px içeride, aralarında 10 px
- Öğelerin altında, 28 px boşlukla:
  - **0212 282 26 09** (tıklayınca arar), Jost 14 px, `--bej`
  - **Levent, İstanbul**, Jost 14 px, `--bej`
- En altta: **TR / EN** — aktif dil `--beyaz` + bronz alt çizgi, pasif `--kum`.
- Menü başlıklarının altında İngilizce karşılık **olmayacak**.
- Panel açıkken arkadaki sayfa kaymayacak.

---

## 5. ANA SAYFA – telefon
(Bkz. `Corniche_anasayfa_mobil.png`)

Yukarıdan aşağıya:

### 5.1 Filtre satırı
- Header'ın 24 px altında, iki uçta:
  - Sol: **Projeleri filtrele +**
  - Sağ: **Izgara görünümü +**
- Jost 15 px, `--siyah`, 1.5 px `--kahve` alt çizgi (yazının 5 px altında).

### 5.2 Kategori satırı
- Filtre satırının 18 px altında.
- Yatay kaydırılabilir tek satır, kaydırma çubuğu gizli. Sağa doğru kesilen son öğe, kaydırılabileceğini belli eder.
- Sıra: **Otel · Villa · Konut · Yat & Marin* · Ticari · Yenileme**
- Aralarında 20 px. Jost 15 px, `--kahve`.
- Seçili kategori: `--siyah`, Jost 500, altında 2 px `--bronz` çizgi (6 px aşağıda).
- Açılışta **Otel** seçili.
- Dokununca altındaki öne çıkan proje o kategorinin projesiyle değişir (geçiş: opaklık, 250 ms).

\* Yat & Marin teyit bekliyor.

### 5.3 Öne çıkan proje
- Kategori satırının 24 px altında:
  - Küçük etiket: **OTEL PROJESİ**, `--kahve`
  - 6 px altında proje adı: Cormorant 32 px, `--siyah`
  - 12 px altında fotoğraf: tam genişlik (kenar boşlukları içinde), oran 16:10, `object-fit: cover`. Bitmiş proje fotoğrafı.
  - 16 px altında **Projeyi incele +**: Jost 16 px 500, `--siyah`, 1.5 px `--bronz` alt çizgi.
- Açılışta her zaman bir **otel projesi** gösterilecek.

### 5.4 Halka
- Öne çıkan projenin 32 px altında.
- Mevcut demodaki kavis korunacak: ekranın sağ altından taşan, ince dikey fotoğraf şeritlerinden oluşan yay.
- Şeritlerde sadece bitmiş proje fotoğrafları.
- Dönüş: bir tam tur 60 saniye. Parmakla kaydırılabilir.
- `prefers-reduced-motion: reduce`: halka gösterilmez, yerine proje ızgarası (Bölüm 6) açılır.

### 5.5 Ortadaki logo
Telefonda ana sayfa ortasında büyük logo **olmayacak**; logo header'da. Tanıtım cümlesi (`[Firma tanıtım cümlesi]`) öne çıkan projenin üstüne, Cormorant italik 18 px, `--kahve`, ortalı, kategori satırından 20 px sonra eklenecek.

### Tablet (768–1023 px)
- Masaüstü halka yerleşimi küçültülerek kullanılır (Bölüm 1, Madde 5), menü üç çizgi olarak kalır.
- Kart boyutları: Otel 170 × 113 px, diğerleri 140 × 93 px.
- Kategori adları yine kesilmeyecek; sığmıyorsa telefon yerleşimine geçilecek.

---

## 6. PROJE LİSTESİ / IZGARA – telefon

- H1 kategori adı.
- Altında kategori satırı (5.2 ile aynı).
- Izgara: **1 sütun**, kartlar arası 32 px. (Tablette 2 sütun, 20 px.)
- Kart: görsel 3:2 tam genişlik → 12 px altında küçük etiket → 4 px altında proje adı (Cormorant 22 px).

---

## 7. PROJE DETAY – telefon (koyu tema)

- Zemin `--kahve`, header da `--kahve`, ikon ve logo beyaz.

1. **Geri linki:** "← Tüm projeler", header'ın 20 px altında, Jost 15 px, `--kum`, bronz alt çizgi.
2. **Ana fotoğraf:** kenarlara kadar tam genişlik (kenar boşluğu yok), yükseklik 300 px, `object-fit: cover`.
3. **Bilgi alanı** (28 px altında, kenar boşlukları 20 px):
   - Küçük etiket (kategori), `--bej`
   - 10 px altında H1 proje adı, `--beyaz`
   - 16 px altında 48 × 1 px `--bronz` çizgi
   - 16 px altında proje hikâyesi, 16 px, `--kum`
   - 28 px altında bilgi satırları: Konum · Yıl · Kapsam (etiket solda `--bej`, değer sağda `--kum`, alt çizgi 1 px `--taupe`, dikey iç boşluk 12 px). Bilgi yoksa satır gösterilmez.
4. **Galeri** (72 px altında): H2 "Proje", **tek sütun**, fotoğraflar arası 12 px, tam genişlik. Dokununca tam ekran açılır, parmakla kaydırılır.
5. **Süreç** (72 px altında): H2 "Süreç". Fotoğraflar 2 sütun, 8 px boşluk.
   - Yenileme projelerinde **Öncesi / Sonrası** alt alta (yan yana değil), üstlerinde etiketler.
6. **Buton** (56 px altında): **PROJENİZİ KONUŞALIM**
   - Tam genişlik, yükseklik 52 px, 1 px `--bronz` çerçeve, yazı `--beyaz` Jost 15 px, harf aralığı 0.1em
   - Dokununca: WhatsApp açılır (`https://wa.me/905452822609`)
7. **Diğer projeler:** yatay kaydırılan kartlar, her kart ekranın %75'i genişliğinde.

---

## 8. KOLEKSİYON – telefon

- Koleksiyon ana sayfası: 5 kart alt alta (Özel Tasarım Mobilya · Aydınlatma · Tekstil · Aksesuar · Sanat), görsel 4:5 tam genişlik, altında H3.
- Alt sayfalar: ürün ızgarası **2 sütun**, boşluk 12 px, görsel 4:5.
  - Ürün adı Cormorant 17 px, `--siyah`
  - **Bilgi al** linki Jost 14 px, bronz alt çizgi → WhatsApp
- Sepet, fiyat, satın al butonu yok.
- Aydınlatma sayfası (avize, lambader, aplik) diğer Koleksiyon alt sayfalarıyla birebir aynı yapıda. Açılışta ürün sayısı azsa sayfa menüden geçici gizlenebilir, ürünler eklenince açılır.

---

## 9. DİĞER SAYFALAR – telefon

### Hakkımızda
- H1, altında fotoğraf (tam genişlik, 4:5), altında metin. İki sütun yok, her şey alt alta.

### Hizmetlerimiz
- Her hizmet: H3 başlık, 8 px altında açıklama, altında 1 px `--bej` çizgi, dikey iç boşluk 24 px.
- "Nasıl Çalışıyoruz" adımları alt alta; numara Cormorant 32 px `--siyah`.

### Showroom
- Fotoğraf → adres ve saatler → harita (yükseklik 280 px), alt alta.

### İletişim
- Bilgiler alt alta (telefon, WhatsApp, e-posta, adres, saatler), her biri tek dokunuşla çalışır.
- Telefon ve WhatsApp için iki büyük buton, yan yana, her biri yükseklik 52 px:
  - **Ara** → `tel:+902122822609`
  - **WhatsApp** → `https://wa.me/905452822609`
  - Stil: 1 px `--bronz` çerçeve, yazı `--siyah`, zemin şeffaf
- Form alanları tam genişlik, yükseklik 52 px, yazı 16 px.
  - Telefon alanı: `type="tel"` (sayı klavyesi açılır)
  - E-posta alanı: `type="email"`
- KVKK onay kutusu: dokunma alanı 44 × 44 px.
- Harita: tam genişlik, yükseklik 300 px.

---

## 10. SABİT WHATSAPP BUTONU (sadece telefonda)

- Tüm sayfalarda sağ altta, kenardan 16 px, alttan 20 px.
- 56 × 56 px daire, zemin `--kahve`, ortada beyaz WhatsApp simgesi (24 px), çerçeve 1 px `--bronz`.
- Dokununca: `https://wa.me/905452822609`
- Proje detay sayfasında (zemin zaten koyu) zemin `--kum`, simge `--kahve`.
- Menü paneli açıkken gizlenir.
- Yeşil WhatsApp rengi **kullanılmayacak**; paletle uyumlu kalacak.

---

## 11. FOOTER – telefon

- Zemin `--kahve`, iç boşluk 56 px üst / 32 px alt, kenar 20 px.
- Her şey alt alta, ortalı değil, sola hizalı:
  1. Beyaz logo (yükseklik 44 px)
  2. Adres + çalışma saatleri
  3. Telefon, WhatsApp, e-posta (tıklanabilir, her satır 44 px yüksekliğinde dokunma alanı)
  4. Sosyal medya simgeleri yan yana, aralarında 20 px, dokunma alanı 44 × 44 px
- En altta: © 2026 Corniche İstanbul / KVKK / Çerez Politikası / TR · EN — 13 px `--bej`, alt alta.

---

## 12. GÖRSEL KALİTESİ – telefon

| Kullanım | Telefona gönderilen genişlik | Format | En büyük dosya |
|---|---|---|---|
| Proje detay ana fotoğraf | 1200 px | WebP, kalite 78 | 180 KB |
| Galeri | 1000 px | WebP, kalite 78 | 140 KB |
| Öne çıkan proje | 1000 px | WebP, kalite 78 | 140 KB |
| Halka şeritleri | 300 px | WebP, kalite 70 | 30 KB |
| Koleksiyon ürünleri | 600 px | WebP, kalite 78 | 80 KB |

- `srcset` ve `sizes` ile telefona bilgisayar boyutunda görsel gönderilmeyecek.
- Ana sayfada ilk ekranda görünen öne çıkan proje fotoğrafı `loading="eager"` ve `fetchpriority="high"`; diğer her şey `loading="lazy"`.
- Halka şeritleri öne çıkan projeden sonra yüklenecek.

---

## 13. HIZ HEDEFLERİ – telefon

- Google Lighthouse (mobil) performans puanı en az 85.
- İlk anlamlı içerik (öne çıkan proje fotoğrafı) mobil veride 2.5 saniyenin altında görünecek (LCP < 2.5 s).
- Sayfa yüklenirken içerik zıplamayacak (CLS < 0.1): her görselin `width` ve `height` değeri veya oranı tanımlı olacak.
- Yazı tipleri `font-display: swap` ile yüklenecek.

---

## 14. TESLİM ÖNCESİ KONTROL LİSTESİ (telefon)

Gerçek telefonda, mobil veriyle:

- [ ] 360 / 390 / 430 px'te hiçbir yazı ve görsel üst üste binmiyor, sayfa yana kaymıyor
- [ ] Menü paneli açılıyor, Koleksiyon alt başlıkları açılıp kapanıyor
- [ ] Menüde çift dilli başlık yok
- [ ] Kategori satırı parmakla kayıyor, Otel ilk sırada ve seçili
- [ ] Öne çıkan proje bir otel projesi
- [ ] Tüm butonlar 44 × 44 px'ten büyük, parmakla rahat basılıyor
- [ ] Telefon numarasına dokununca arama ekranı açılıyor
- [ ] WhatsApp butonları doğru numaraya sohbet açıyor
- [ ] Sabit WhatsApp butonu yeşil değil, paletle uyumlu
- [ ] Form alanlarına dokununca sayfa yakınlaşmıyor (yazı 16 px)
- [ ] TR modunda İngilizce kelime yok
- [ ] Ana sayfada şantiye fotoğrafı yok
- [ ] Bronz hiçbir yerde yazı veya zemin rengi değil
- [ ] Lighthouse mobil ≥ 85, LCP < 2.5 s
