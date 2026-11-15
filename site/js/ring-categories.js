/* CORNICHE İSTANBUL — ANA SAYFA HALKASI kategori verisi
   Kaynak: Emel Hanım'ın yeni ana sayfa konsept görseli (2026-11-15).
   NOT: Bu dosya BİLEREK js/categories-data.js (CORNICHE_CATEGORIES) içeriğinden
   AYRI tutuldu. CORNICHE_CATEGORIES hâlâ projeler/index.html'deki gerçek
   kategori sekmelerini ve proje detay sayfasındaki kategori etiketini besliyor;
   oraya dokunursak proje filtreleme bozulur. Bu halka ise müşterinin "kategori
   isimlerine sonra Emel Hanım'la karar verilecek" dediği, henüz taslak/onay
   bekleyen bir görünüm — o yüzden kendi ayrı veri kaynağı var.

   Alan notları:
   - "tr" alanı, kod tarafında (main.js initHeroRingDesktop/Mobile) olduğu gibi
     kullanılabilmesi için CORNICHE_CATEGORIES ile aynı isimde tutuldu, ama
     İÇERİĞİ TÜRKÇE DEĞİL — görseldeki gibi İNGİLİZCE kategori adı. Müşteri
     net talimat verdi: "şimdilik görseldeki kategori sayısı ve isimleri
     kalsın, isimlere sonra Emel Hanım'la karar verilecek."
   - "img" dolu olan 7 kategori gerçek proje/koleksiyon fotoğrafı kullanıyor
     (bkz. projects-data.js / products-data.js kaynakları). "img" boş olan
     3 kategoride (Art, Textiles, Kids' Rooms) gerçek fotoğraf yok — placeholder
     (--vizon) renk kullanılacak, görsel uydurulmadı.
   - "link": 6 proje-tipi kategori gerçek CORNICHE_CATEGORIES id'leriyle
     eşleştirildi (otel/villa/konut/yat/ticari/yenileme) — ileride project.category
     alanları doldurulduğunda bu halka kartları doğru filtreye düşsün diye.
     Bespoke Furniture / Textiles / Art ilgili Koleksiyon alt sayfasına gider.
     Kids' Rooms için gerçek bir hedef yok (kategori hiç var olmadı) — genel
     projeler sayfasına gider, kesinleşmedi.
   - Halkada artık "Otel Projeleri" gibi özel bronz-çerçeveli bir kart yok;
     görselde 10 kart da aynı stilde, o yüzden isHotel kaldırıldı. */
(function (global) {
  var RING_CATEGORIES = [
    { id: 'villa',       tr: 'Villa',             img: 'assets/projeler-web/savoy-project/02-salon.webp',       link: 'projeler/index.html?kategori=villa',  w: 180, h: 120 },
    { id: 'renovation',  tr: 'Renovation',        img: 'assets/projeler-web/proje-h-a/07-yemek-odasi.webp',     link: 'projeler/index.html?kategori=yenileme', w: 180, h: 120 },
    { id: 'residential', tr: 'Residential',       img: 'assets/projeler-web/yenikoy-project/08-salon.webp',     link: 'projeler/index.html?kategori=konut',   w: 180, h: 120 },
    { id: 'hospitality', tr: 'Hospitality',       img: 'assets/projeler-web/kemer-prive/01-merdiven-alti.webp', link: 'projeler/index.html?kategori=otel',    w: 180, h: 120 },
    { id: 'yacht-marine',tr: 'Yacht & Marine',    img: 'assets/projeler-web/yenikoy-project/01-banyo.webp',     link: 'projeler/index.html?kategori=yat',     w: 180, h: 120 },
    { id: 'commercial',  tr: 'Commercial Spaces', img: 'assets/projeler-web/berkozan/01-toplanti-odasi.webp',   link: 'projeler/index.html?kategori=ticari',  w: 180, h: 120 },
    { id: 'kids-rooms',  tr: "Kids' Rooms",       img: null,                                                     link: 'projeler/index.html',                  w: 180, h: 120 },
    { id: 'bespoke',     tr: 'Bespoke Furniture', img: 'assets/koleksiyon-web/mobilya/01.webp',                  link: 'koleksiyon/mobilya.html',              w: 180, h: 120 },
    { id: 'textiles',    tr: 'Textiles',          img: null,                                                     link: 'koleksiyon/tekstil.html',              w: 180, h: 120 },
    { id: 'art',         tr: 'Art',               img: null,                                                     link: 'koleksiyon/sanat.html',                w: 180, h: 120 }
  ];

  global.CORNICHE_RING_CATEGORIES = RING_CATEGORIES;
})(window);
