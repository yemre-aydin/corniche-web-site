/* CORNICHE İSTANBUL — ANA SAYFA HALKASI kategori verisi
   Kaynak: Emel Hanım'ın yeni ana sayfa konsept görseli (2026-11-15, ilk tur)
   + aynı gün ikinci tur talimatı (halka 10 kategoriden 6'ya düşürüldü).
   NOT: Bu dosya BİLEREK js/categories-data.js (CORNICHE_CATEGORIES) içeriğinden
   AYRI tutuldu. CORNICHE_CATEGORIES hâlâ projeler/index.html'deki gerçek
   kategori sekmelerini ve proje detay sayfasındaki kategori etiketini besliyor;
   oraya dokunursak proje filtreleme bozulur.

   ÜÇÜNCÜ TUR DEĞİŞİKLİĞİ (2026-11-21): Müşteri halka MEKANİZMASINI bozmadan
   kategori sayısını eskiden olduğu gibi 10'a çıkarmak istedi. main.js'teki
   yerleşim matematiği (place/geometry/resolveCenterOverlap, 360°/items.length
   açı hesabı) zaten items.length'e göre otomatik ayarlanıyor — kodda sabit
   bir "6" veya "10" değeri yok, bu yüzden sadece veri dizisine 4 eleman
   eklemek yeterli oldu (CDP ile görsel doğrulandı, bkz. proje notları).
   Eklenen 4 kategori — aynı gün ikinci turda çıkarılmıştı, şimdi geri geldi:
     - Çocuk Odaları (Kids' Rooms) → ARTIK GERÇEK BİR HEDEFİ VAR:
       projeler/cocuk-odalari.html (ikinci tur sırasında bu sayfa yoktu,
       genel projeler sayfasına gidiyordu — sonradan oluşturuldu, link
       düzeltildi). img: gerçek konsept/render görseli, uydurulmadı.
     - Özel Mobilya (Bespoke Furniture) → koleksiyon/mobilya.html, gerçek
       ürün fotoğrafı kullanılıyor.
     - Tekstil (Textiles) → koleksiyon/tekstil.html. Bu sayfada hâlâ gerçek
       ürün fotoğrafı YOK (sadece logo) — img: null bırakıldı, main.js'teki
       placeholder (--vizon renk kutusu) fallback'i kullanılıyor, görsel
       İCAT EDİLMEDİ.
     - Sanat (Art) → koleksiyon/sanat.html. Aynı sebeple img: null — bu
       sayfada da hâlâ gerçek fotoğraf yok, placeholder kullanılıyor.
   Otel Projeleri, Konut, Yat & Marin, Ticari Mekânlar, Yenileme (ilk 6'nın
   5'i) aynı kaldı, dokunulmadı. isHotel alanı hâlâ yok — tüm 10 kart aynı
   stilde (gümüş çerçeve), ayrım kavramı geçersiz.

   AYRICA BU TURDA DÜZELTİLDİ: Villa kartının görseli 404 veriyordu —
   `savoy-project` klasörü 32a011e'deki mükerrer-kayıt temizliğinde silinmişti
   (dragos/proje-a-b/savoy-project aynı 5 fotoğrafı taşıyordu, tek projeye
   indirildi) ama ring-categories.js buraya hâlâ eski yolu gösteriyordu.
   Gerçek Villa kategorisindeki proje artık "baku-villa" (bkz. projects-data.js)
   — görsel path'i oraya güncellendi.

   Alan notları (önceki turdan, hâlâ geçerli):
   - "tr" ve "en" alanları ayrı tutuluyor — "en" alanı ileride gerçek EN
     sitesi kodlanınca kullanılacak, şu an main.js'teki TR/EN butonu sadece
     "hazırlanıyor" uyarısı veriyor, içerik hiç değişmiyor.
   - "link": ilk 6 kategori CORNICHE_CATEGORIES id'leriyle eşleştirildi
     (otel/villa/konut/yat/ticari/yenileme) — project.category alanları
     doldurulduğunda bu halka kartları doğru filtreye düşsün diye. Son 4
     kategori (Kids' Rooms/Bespoke/Textiles/Art) kendi gerçek sayfalarına
     gidiyor, projeler/index.html filtresine değil.
   - main.js'teki yerleşim matematiği kart sayısını items.length üzerinden
     okuyor (360°/n açı aralığı dahil) — 10 karta otomatik uyarlanıyor,
     main.js'te sabit bir "6" veya "10" değeri yok. */
(function (global) {
  var RING_CATEGORIES = [
    { id: 'villa',       tr: 'Villa',             en: 'Villa',             img: 'assets/projeler-web/baku-villa/01-giris.webp',          link: 'projeler/index.html?kategori=villa',  w: 180, h: 120 },
    { id: 'renovation',  tr: 'Yenileme',          en: 'Renovation',        img: 'assets/projeler-web/proje-h-a/07-yemek-odasi.webp',     link: 'projeler/index.html?kategori=yenileme', w: 180, h: 120 },
    { id: 'residential', tr: 'Konut',             en: 'Residential',       img: 'assets/projeler-web/yenikoy-project/08-salon.webp',     link: 'projeler/index.html?kategori=konut',   w: 180, h: 120 },
    { id: 'hospitality', tr: 'Otel Projeleri',    en: 'Hospitality',       img: 'assets/projeler-web/kemer-prive/01-merdiven-alti.webp', link: 'projeler/index.html?kategori=otel',    w: 180, h: 120 },
    { id: 'yacht-marine',tr: 'Yat & Marin',       en: 'Yacht & Marine',    img: 'assets/projeler-web/yenikoy-project/01-banyo.webp',     link: 'projeler/index.html?kategori=yat',     w: 180, h: 120 },
    { id: 'commercial',  tr: 'Ticari Mekânlar',   en: 'Commercial Spaces', img: 'assets/projeler-web/berkozan/01-toplanti-odasi.webp',   link: 'projeler/index.html?kategori=ticari',  w: 180, h: 120 },
    { id: 'kids-rooms',  tr: 'Çocuk Odaları',     en: "Kids' Rooms",       img: 'assets/cocuk-odalari/maya/01-concept.webp',             link: 'projeler/cocuk-odalari.html',          w: 180, h: 120 },
    { id: 'bespoke',     tr: 'Özel Mobilya',      en: 'Bespoke Furniture', img: 'assets/koleksiyon-web/mobilya/01.webp',                 link: 'koleksiyon/mobilya.html',              w: 180, h: 120 },
    { id: 'textiles',    tr: 'Tekstil',           en: 'Textiles',          img: null,                                                     link: 'koleksiyon/tekstil.html',              w: 180, h: 120 },
    { id: 'art',         tr: 'Sanat',             en: 'Art',               img: null,                                                     link: 'koleksiyon/sanat.html',                w: 180, h: 120 }
  ];

  global.CORNICHE_RING_CATEGORIES = RING_CATEGORIES;
})(window);
