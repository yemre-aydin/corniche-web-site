/* CORNICHE İSTANBUL — kategori verisi (Bölüm 5 tablosu)
   Yat & Marin teyit bekliyor (Corniche_Web_1_Bilgisayar.md Bölüm 14) —
   onay gelmezse bu kategori kaldırılıp kalan 5 tanesi 72° aralıkla dağıtılacak. */
(function (global) {
  var CATEGORIES = [
    { id: 'otel',    tr: 'Otel Projeleri',    en: 'Hospitality',       slug: 'otel-projeleri',    angle: -90, w: 220, h: 146, isHotel: true,  labelPos: 'above' },
    { id: 'villa',   tr: 'Villa',             en: 'Villa',             slug: 'villa',             angle: -30, w: 180, h: 120, isHotel: false, labelPos: 'above' },
    { id: 'konut',   tr: 'Konut',             en: 'Residential',      slug: 'konut',             angle: 30,  w: 180, h: 120, isHotel: false, labelPos: 'below' },
    { id: 'yat',     tr: 'Yat & Marin',       en: 'Yacht & Marine',    slug: 'yat-marin',         angle: 90,  w: 180, h: 120, isHotel: false, labelPos: 'below' },
    { id: 'ticari',  tr: 'Ticari Mekânlar',   en: 'Commercial Spaces', slug: 'ticari-mekanlar',   angle: 150, w: 180, h: 120, isHotel: false, labelPos: 'below' },
    { id: 'yenileme',tr: 'Yenileme',          en: 'Renovation',        slug: 'yenileme',          angle: 210, w: 180, h: 120, isHotel: false, labelPos: 'above' }
  ];

  global.CORNICHE_CATEGORIES = CATEGORIES;
})(window);
