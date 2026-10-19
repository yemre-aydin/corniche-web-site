# Bekleyen bilgiler

Sitede şu an yer tutucu olan her şeyin listesi. Bilgiler parça parça gelecek; bir madde geldiğinde
yalnızca o madde doldurulur, sitenin geri kalanına dokunulmaz.

İşaretleme: `[ ]` bekliyor, `[x]` tamamlandı.

---

## 1. Fotoğraflar ve proje adları

Sitenin görünümünü en çok değiştirecek madde. Bu geldiğinde site bir anda Corniche'in sitesi gibi
görünür.

- [ ] Proje fotoğrafları (kategori başına en az 4-5 tanesi iyi olur; şu an 2-3 yer tutucu olduğu için
      halka aynı fotoğrafları tekrarlıyor)
- [ ] Her fotoğrafın hangi projeye ait olduğu
- [ ] Proje adları — Türkçe ve İngilizce
- [ ] Her projenin kategorisi: Hospitality / Residential / Villa / Renovation / Commercial Spaces

Geldiğinde: örnek fotoğraflar tamamen silinir, `site/projects.json` gerçek projelerle doldurulur,
köşeli parantezli başlıklar kalkar.

> Repo herkese açık olduğu için örnek fotoğraflar şu an internette duruyor. Bunları geçmişten de
> tamamen silmek istersen ayrıca söyle — bu repo geçmişini yeniden yazmayı gerektirir.

## 2. Marka

Logo tek parçadır: C amblemi, CORNICHE, ISTANBUL ve INTERIOR & LIFE STYLE birlikte kullanılır,
ayrı ayrı yeniden dizilmez. Ekran görüntüsünden kırpılmış logo kullanılmayacak.

Dar alanlarda alt satırlar okunmadığı için kompakt bir kilit gerekiyor. **Bu kısa hâli biz
üretmeyeceğiz** — tam logoyu kırpmak, kaçınmak istediğimiz sorunun vektördeki karşılığı olur.
Logoyu hazırlayan kişiden kendi dosyası olarak gelmeli.

- [ ] **Tam kilit** (C + CORNICHE + ISTANBUL + INTERIOR & LIFE STYLE) — ana sayfada çemberin ortası
- [ ] **Kompakt kilit** (C + CORNICHE) — mobil başlık, ~40 piksel yükseklik
- [ ] **Yalnız C amblemi** — tarayıcı sekmesi simgesi, sosyal medya paylaşım görseli
- [ ] Hepsi SVG, **yazılar şekle çevrilmiş** (yazı tipi olarak kalırsa o font kurulu olmayan
      cihazda logo yanlış görünür)
- [ ] Açık zemin (#E9DFD0) ve koyu zemin (#48382F menü paneli) için ayrı versiyonlar
- [ ] Yazı tipi tercihi — şu an sistem yazı tipi kullanılıyor, geçici
- [ ] Firma tanıtım cümlesi (masaüstünde halkanın ortasında çıkıyor) — Türkçe ve İngilizce

"Interior & Life Style" ifadesi sitenin başka yerlerinde (sayfa başlığı, açıklama) kullanılırsa
yazımı logodaki gibi olacak; vektör gelince büyük/küçük harf kullanımı teyit edilecek.

Yer tutucular şu an kilitlerin yapısını taklit ediyor, böylece vektörler gelince yerleri hazır olacak:

| Yer | Şu an duran |
| --- | --- |
| Ana sayfa ortası | CORNICHE / ISTANBUL / INTERIOR & LIFE STYLE — tam kilidin üç satırı |
| Izgara görünümü başı | CORNICHE / ISTANBUL, daha küçük |
| Mobil başlık | CORNICHE — kompakt kilidin karşılığı, kesikli çerçeve içinde |
| Yükleme ekranı | CORNICHE İSTANBUL, tek satır (henüz hizalanmadı) |

Hepsi sistem yazı tipiyle dizilmiş düz metin, gerçek logo değil. Mobil başlıktaki kesikli çerçeve
gerçek logonun yerini işaretliyor.

## 3. İletişim bilgileri

Sayfa altı (footer) ve iletişim sayfası için gerekli.

- [ ] Açık adres
- [ ] Telefon
- [ ] E-posta
- [ ] WhatsApp numarası
- [ ] Instagram adresi
- [ ] Facebook adresi
- [ ] TikTok adresi
- [ ] LinkedIn adresi

## 4. Hukuki metinler

`site/kvkk.html` ve `site/cerez-politikasi.html` şu an **taslak** ve navigasyona bağlı değil.
İçlerinde görünür bir "yürürlükte değil" bandı var.

- [ ] Şirketin ticari unvanı (veri sorumlusu olarak)
- [ ] KVKK başvuruları için adres ve e-posta
- [ ] Barındırma sağlayıcısının adı
- [ ] Metinlerin hukuk danışmanı onayı

Metinler bugün sitenin gerçekte ne yaptığını anlatıyor: form yok, analitik yok, dil tercihi dışında
çerez yok. **Supabase + WhatsApp + Meta Piksel + GA4 yapısı kurulduğunda** her iki metin de
yenilenmeli; bu yapı ikisinde de "planlanan, henüz aktif değil" olarak zaten listelendi, böylece o
gün yeniden yazmak yerine doldurmak yeterli olacak.

Bu yapı kurulduğunda ayrıca şunlar gerekir:

- [ ] Çerez onay bandı (ölçümleme çerezleri yalnızca onaydan sonra yüklenmeli)
- [ ] Yurt dışına aktarım bölümünün hukuk danışmanıyla kesinleştirilmesi (KVKK m. 9)

## 5. Menü sayfaları

Başlıktaki menü linkleri şu an çalışmıyor, mobilde hamburger bir panel açmıyor.

Menü sırası: Projeler · Hakkımızda · Hizmetlerimiz · Showroom · İletişim

- [x] Sağdan açılan menü paneli **yapıldı** — başlıklar artık sayfada sürekli durmuyor, sağ üstteki
      üç çizgiye basınca açılıyor. TR/EN hem üst kutuda hem panelin altında; mobilde de dil
      değiştirilebiliyor artık.
- [ ] **Hakkımızda** sayfası metni (TR + EN)
- [ ] **Hizmetlerimiz / Nasıl Çalışıyoruz** sayfası metni (TR + EN)
- [ ] **Showroom** sayfası — Corniche'in kendi showroom'u; metin, fotoğraf, adres
- [ ] **İletişim** sayfası — form istenip istenmediği kararı

Menü başlıkları şu an hiçbir yere gitmiyor; sayfalar yapılınca bağlanacak.

## 6. Karar bekleyenler

- [x] **Collection** — çözüldü. Bespoke Furniture, Textiles ve Art menüye değil **çembere** girdi;
      on kategoriden üçü oldular. Menü beş başlıkta kaldı.
- [x] **Çember kurgusu** — B şıkkı seçildi. Açılışta kategori başına bir büyük kart, kartlar dışa
      bakıyor. Bir kategoriye tıklanınca **aynı çember** o kategorinin fotoğraflarıyla yeniden
      doluyor; yeni bir çember kurulmuyor.
- [x] **Geri dönüş** — görünür bir kontrol olacak, tarayıcının geri tuşuna güvenilmeyecek.
      Kategori açıkken sol üstte (menü kutusunun simetriğinde) `← Tüm kategoriler` beliriyor,
      yanında hangi kategoride olunduğu yazıyor. Yedekler: Esc, ortadaki logoya tıklama, ve
      kategoriye kendi adresi verildiği için tarayıcı geri tuşu. Mobilde konumu başparmakla
      ulaşılabilir olacak şekilde ayrıca belirlenecek.
- [ ] **Kategori etiketleri Türkçe olsun mu?** Şu an iki dilde de İngilizce duruyor
      (Hospitality, Residential…). Türkçe karşılıklar (Otel Projeleri, Konut / Daire, Yenileme,
      Ticari Mekânlar, Çocuk Odaları, Özel Üretim Mobilya, Tekstil, Sanat) istenirse her biri
      tek satırlık düzenlemeyle geçer.
- [ ] **"Izgara görünümü"** düğmesi şu an çalışmıyor. Animasyonu kapatan kullanıcı için bu
      görünüm yapılacak.
- [ ] **Az fotoğraflı kategoride ne olacak?** Villa'da 15, Art'ta 3 fotoğraf varsa, Art açılınca
      üç kartlık çember seyrek görünür. Kategori başına fotoğraf sayısı belli olunca kart
      büyüklüğü / yarıçap kuralı buna göre konacak.

## 7. Yayına almadan önce

- [ ] Tüm sayfalardaki `noindex` etiketlerinin kaldırılması (şu an site arama motorlarına kapalı)
- [ ] Gerçek alan adına bağlanması
- [ ] Hukuki metinlerin navigasyona ve footer'a eklenmesi
