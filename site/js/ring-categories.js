/* CORNICHE İSTANBUL — ANA SAYFA HALKASI kategori verisi
   Kaynak: Emel Hanım'ın yeni ana sayfa konsept görseli (2026-11-15, ilk tur)
   + aynı gün ikinci tur talimatı (halka 10 kategoriden 6'ya düşürüldü).
   NOT: Bu dosya BİLEREK js/categories-data.js (CORNICHE_CATEGORIES) içeriğinden
   AYRI tutuldu. CORNICHE_CATEGORIES hâlâ projeler/index.html'deki gerçek
   kategori sekmelerini ve proje detay sayfasındaki kategori etiketini besliyor;
   oraya dokunursak proje filtreleme bozulur.

   İKİNCİ TUR DEĞİŞİKLİĞİ (2026-11-15): Halkada sadece 6 kategori kalıyor —
   Otel Projeleri (Hospitality), Villa, Konut (Residential), Yat & Marin
   (Yacht & Marine), Ticari Mekânlar (Commercial Spaces), Yenileme
   (Renovation). Çıkarılanlar: Art, Textiles, Kids' Rooms, Bespoke Furniture
   — bunlar artık halkada GÖRÜNMÜYOR, "Koleksiyon" menüsüne ait sayılıyor:
     - Bespoke Furniture → koleksiyon/mobilya.html (zaten var, dokunulmadı)
     - Textiles          → koleksiyon/tekstil.html (zaten var, dokunulmadı)
     - Art               → koleksiyon/sanat.html (zaten var, dokunulmadı)
     - Kids' Rooms       → Koleksiyon'da EŞLEŞEN BİR SAYFA YOK (koleksiyon/
       altında mobilya/aydinlatma/tekstil/aksesuar/sanat var, "çocuk odası"
       kategorisi hiç yok) — yeni sayfa UYDURULMADI, bu boşluk orkestrasyon
       oturumuna raporlandı; müşteriye sorulacak.
   isHotel alanı da kaldırıldı — "Otel Projeleri" kartının çerçeve rengi artık
   diğerleriyle aynı (gümüş), ayrım kavramı geçersiz (bkz. main.js / style.css).

   DÜZELTME (2026-11-15, üçüncü tur): "tr" alanı yanlışlıkla İngilizce
   kategori adlarıyla doldurulmuştu (Emel Hanım'ın referans görseli İngilizce
   etiketli olduğu için) — ama sitede gerçek bir EN sürümü henüz yok (TR/EN
   butonu main.js'te sadece "hazırlanıyor" uyarısı veriyor, içerik hiç
   değişmiyor), yani TR tek çalışan sürümdü ve İngilizce isimler TR sayfasında
   görünüyordu. "tr" alanı artık CORNICHE_CATEGORIES ile birebir aynı Türkçe
   isimleri kullanıyor (Otel Projeleri/Villa/Konut/Yat & Marin/Ticari
   Mekânlar/Yenileme), "en" alanı ileride gerçek EN sürümü kodlanınca
   kullanılmak üzere eklendi.
   - "link": CORNICHE_CATEGORIES id'leriyle eşleştirildi (otel/villa/konut/
     yat/ticari/yenileme) — ileride project.category alanları doldurulduğunda
     bu halka kartları doğru filtreye düşsün diye.
   - main.js'teki yerleşim matematiği (place/geometry/resolveCenterOverlap)
     kart sayısını items.length üzerinden okuyor (360°/n açı aralığı dahil) —
     6 karta otomatik uyarlanıyor, main.js'te ayrıca sabit bir "10" değeri
     yoktu. */
(function (global) {
  var RING_CATEGORIES = [
    { id: 'villa',       tr: 'Villa',             en: 'Villa',             img: 'assets/projeler-web/savoy-project/02-salon.webp',       link: 'projeler/index.html?kategori=villa',  w: 180, h: 120 },
    { id: 'renovation',  tr: 'Yenileme',          en: 'Renovation',        img: 'assets/projeler-web/proje-h-a/07-yemek-odasi.webp',     link: 'projeler/index.html?kategori=yenileme', w: 180, h: 120 },
    { id: 'residential', tr: 'Konut',             en: 'Residential',       img: 'assets/projeler-web/yenikoy-project/08-salon.webp',     link: 'projeler/index.html?kategori=konut',   w: 180, h: 120 },
    { id: 'hospitality', tr: 'Otel Projeleri',    en: 'Hospitality',       img: 'assets/projeler-web/kemer-prive/01-merdiven-alti.webp', link: 'projeler/index.html?kategori=otel',    w: 180, h: 120 },
    { id: 'yacht-marine',tr: 'Yat & Marin',       en: 'Yacht & Marine',    img: 'assets/projeler-web/yenikoy-project/01-banyo.webp',     link: 'projeler/index.html?kategori=yat',     w: 180, h: 120 },
    { id: 'commercial',  tr: 'Ticari Mekânlar',   en: 'Commercial Spaces', img: 'assets/projeler-web/berkozan/01-toplanti-odasi.webp',   link: 'projeler/index.html?kategori=ticari',  w: 180, h: 120 }
  ];

  global.CORNICHE_RING_CATEGORIES = RING_CATEGORIES;
})(window);
