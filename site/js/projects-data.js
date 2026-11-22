/* CORNICHE İSTANBUL — gerçek proje verisi
   Kaynak 1: assets/projeler/<klasör>/ (müşteriden gelen 10 proje klasörü, 2026-11-11)
   Kaynak 2 (2026-11-19 revizyon): Emel Hanım'ın gönderdiği "CORNICHE ISTANBUL SUNUM
   Finall.pdf" (39 sayfa, Türkçe) — hem metin (proje başlıkları, şehir) hem de PDF
   içine gömülü GERÇEK görseller pypdf ile birebir çıkarıldı (ekran görüntüsü değil).
   Görseller WebP'ye dönüştürüldü (max 2000px, kalite ~82) -> assets/projeler-web/.

   BAŞLIK KURALI GÜNCELLENDİ (2026-11-22): Eski kural (adres/site/semt adı
   kesinlikle yok, sadece "Daire Projesi" + şehir) altı farklı projenin aynı
   jenerik başlığı paylaşmasına yol açtı — ayırt edilemiyorlardı. Müşteri
   talimatı: TAM ADRES hâlâ yok ama PDF'teki her görselin altında zaten
   basılı duran ÜLKE/ŞEHİR/SEMT bilgisi (örn. "Azerbaycan – Bakü Villa",
   "İstanbul – Sarıyer, Salon-Bar Tasarımı", "Mildon Holding ... İstanbul-
   Ortaköy") artık "name" alanına ayırt edici olarak geri eklendi — bu bilgi
   zaten PDF'te açıkça basılıydı, uydurulmadı. "city" alanı yabancı
   şehirlerde PDF'teki gibi ülke+şehir olarak dolduruldu (örn. "Rusya –
   Moskova"). Sadece ham WhatsApp klasör ismi dışında HİÇBİR konum bilgisi
   bulunmayan (PDF'te sayfası yok, kimliği doğrulanamayan) 3 proje — dragos,
   proje-02, proje-h-a — generic "Daire Projesi" kaldı; bunlar için
   müşteriden kimlik teyidi hâlâ bekleniyor, folder adı veya uydurma bir
   semt adı KULLANILMADI.

   MÜKERRER KAYIT DÜZELTİLDİ: eski "dragos", "proje-a-b" ve "savoy-project" kayıtları
   AYNI 5 fotoğrafı içeriyordu (md5 ile doğrulanmıştı — müşteri tarafı kopyalama
   hatası). Üçü TEK projeye indirildi (slug: dragos), diğer ikisinin asset klasörleri
   silindi. Gerçek proje kimliği belirsiz olduğu için jenerik "Daire Projesi" verildi.

   subtitle alanı mümkün olduğunca PDF'teki birebir ifadeyle dolduruldu ("İç Mimari
   Konsept Proje ve Uygulaması" / sadece "...Konsept Proje" / "Perde Uygulaması" vb.
   — PDF sayfası hangisini yazıyorsa o kullanıldı, uydurulmadı). category/city artık
   DOLU (önceki turda "henüz yok" idi). Fotoğrafı/kaynağı sadece ham WhatsApp
   klasöründen gelen (PDF'te metni/sayfası olmayan) projelerde isim bire bir tahmin,
   kimlik teyidi müşteriden bekleniyor — ilgili projede not var. */
(function (global) {
  var PROJECTS = [
  {
    "id": "berkozan",
    "slug": "berkozan",
    "name": "Berkozan Ofis Projesi",
    "sourceFolder": "corniche istanbul berkozan — müşterinin kendi verdiği klasör ismi, PDF sayfası yok ama kimlik şüphesi de yok (dragos/proje-02/proje-h-a'dan farklı olarak)",
    "category": "ticari",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/berkozan/01-toplanti-odasi.webp",
      "label": "Toplantı odası"
    },
    "gallery": [
      { "src": "assets/projeler-web/berkozan/01-toplanti-odasi.webp", "label": "Toplantı odası" },
      { "src": "assets/projeler-web/berkozan/02-toplanti-odasi.webp", "label": "Toplantı odası" },
      { "src": "assets/projeler-web/berkozan/03-toplanti-odasi.webp", "label": "Toplantı odası" },
      { "src": "assets/projeler-web/berkozan/04-toplanti-odasi.webp", "label": "Toplantı odası" },
      { "src": "assets/projeler-web/berkozan/05-toplanti-odasi.webp", "label": "Toplantı odası" },
      { "src": "assets/projeler-web/berkozan/06-toplanti-odasi.webp", "label": "Toplantı odası" },
      { "src": "assets/projeler-web/berkozan/07-toplanti-odasi.webp", "label": "Toplantı odası" }
    ]
  },
  {
    "id": "dragos",
    "slug": "dragos",
    "name": "Daire Projesi",
    "sourceFolder": "MÜKERRER KAYIT DÜZELTMESİ: eski 'dragos' + 'proje-a-b' + 'savoy-project' aynı 5 fotoğrafı (md5 doğrulandı) taşıyordu, TEK projeye indirildi. Gerçek proje kimliği/konumu PDF'te yok, müşteriden teyit bekleniyor.",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/dragos/02-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      { "src": "assets/projeler-web/dragos/01-bebek-odasi.webp", "label": "Bebek Odası" },
      { "src": "assets/projeler-web/dragos/02-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/dragos/03-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/dragos/04-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/dragos/05-yemek-odasi.webp", "label": "Yemek Odası" }
    ]
  },
  {
    "id": "grel-maya-project",
    "slug": "grel-maya-project",
    "name": "Etiler Maya Sitesi Dairesi",
    "sourceFolder": "corniche istanbul grel maya project — PDF s.17-23 ile eşleşiyor (İstanbul Etiler Maya Sitesi Daire Projesi), PDF'teki semt+site adı geri eklendi",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/grel-maya-project/01-corniche-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      { "src": "assets/projeler-web/grel-maya-project/01-corniche-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/grel-maya-project/06-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/grel-maya-project/07-teras.webp", "label": "Teras" },
      { "src": "assets/projeler-web/grel-maya-project/02-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/grel-maya-project/03-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/grel-maya-project/04-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/grel-maya-project/08-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/grel-maya-project/05-yemek-odasi.webp", "label": "Yemek odası" },
      { "src": "assets/projeler-web/grel-maya-project/09-salon-uygulama.webp", "label": "Salon uygulama detayı" },
      { "src": "assets/projeler-web/grel-maya-project/10-yatak-odasi-uygulama.webp", "label": "Yatak odası uygulama detayı" }
    ]
  },
  {
    "id": "kemer-prive",
    "slug": "kemer-prive",
    "name": "Kemer Prive Daire Projesi",
    "sourceFolder": "corniche istanbul kemer prive — müşterinin kendi verdiği klasör ismi, PDF sayfası yok ama kimlik şüphesi yok",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/kemer-prive/01-merdiven-alti.webp",
      "label": "Merdiven altı"
    },
    "gallery": [
      { "src": "assets/projeler-web/kemer-prive/01-merdiven-alti.webp", "label": "Merdiven altı" },
      { "src": "assets/projeler-web/kemer-prive/02-merdiven-alti.webp", "label": "Merdiven altı" },
      { "src": "assets/projeler-web/kemer-prive/03-merdiven-alti.webp", "label": "Merdiven altı" }
    ]
  },
  {
    "id": "kozan",
    "slug": "kozan",
    "name": "Kozan Daire Projesi",
    "sourceFolder": "corniche istanbul kozan — müşterinin kendi verdiği klasör ismi, PDF sayfası yok ama kimlik şüphesi yok. Çocuk odası fotoğrafları BU projede kalıyor — Emel Hanım'ın ayrı 'Çocuk Odaları' talimatı sadece Etiler/Maya ve Arnavutköy içindi.",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/kozan/18-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      { "src": "assets/projeler-web/kozan/01-calisma-odasi.webp", "label": "Çalışma odası" },
      { "src": "assets/projeler-web/kozan/02-calisma-odasi.webp", "label": "Çalışma odası" },
      { "src": "assets/projeler-web/kozan/03-camasir-odasi.webp", "label": "Çamaşır odası" },
      { "src": "assets/projeler-web/kozan/04-cocuk-odasi.webp", "label": "Çocuk odası" },
      { "src": "assets/projeler-web/kozan/05-cocuk-odasi.webp", "label": "Çocuk odası" },
      { "src": "assets/projeler-web/kozan/06-cocuk-odasi.webp", "label": "Çocuk odası" },
      { "src": "assets/projeler-web/kozan/07-cocuk-odasi.webp", "label": "Çocuk odası" },
      { "src": "assets/projeler-web/kozan/08-ginme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/09-giris.webp", "label": "Giriş" },
      { "src": "assets/projeler-web/kozan/10-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/11-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/12-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/13-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/14-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/15-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/16-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/kozan/17-mutfak.webp", "label": "Mutfak" },
      { "src": "assets/projeler-web/kozan/18-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/kozan/19-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/kozan/20-salon.webp", "label": "Salon" }
    ]
  },
  {
    "id": "proje-02",
    "slug": "proje-02",
    "name": "Daire Projesi",
    "sourceFolder": "corniche istanbul proje 02 — kimliği PDF'te yok, müşteriden teyit bekleniyor",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/proje-02/06-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      { "src": "assets/projeler-web/proje-02/01-giris.webp", "label": "Giriş" },
      { "src": "assets/projeler-web/proje-02/02-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/proje-02/03-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/proje-02/04-mutfak.webp", "label": "Mutfak" },
      { "src": "assets/projeler-web/proje-02/05-mutfak.webp", "label": "Mutfak" },
      { "src": "assets/projeler-web/proje-02/06-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/proje-02/07-salon.webp", "label": "Salon" }
    ]
  },
  {
    "id": "proje-h-a",
    "slug": "proje-h-a",
    "name": "Daire Projesi",
    "sourceFolder": "corniche istanbul Proje H.A — kimliği PDF'te yok, müşteriden teyit bekleniyor",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/proje-h-a/04-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      { "src": "assets/projeler-web/proje-h-a/01-calisma-odasi.webp", "label": "Çalışma odası" },
      { "src": "assets/projeler-web/proje-h-a/02-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/proje-h-a/03-oturna-alani.webp", "label": "Oturma alanı" },
      { "src": "assets/projeler-web/proje-h-a/04-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/proje-h-a/05-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/proje-h-a/06-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/proje-h-a/07-yemek-odasi.webp", "label": "Yemek odası" },
      { "src": "assets/projeler-web/proje-h-a/08-yemek-odasi.webp", "label": "Yemek odası" }
    ]
  },
  {
    "id": "yenikoy-project",
    "slug": "yenikoy-project",
    "name": "Yeniköy Yalı Dairesi",
    "sourceFolder": "corniche istanbul0 yeniköy project — PDF s.12-16 ile eşleşiyor (İstanbul Yeniköy Yalı Dairesi), PDF'teki semt adı geri eklendi",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": {
      "src": "assets/projeler-web/yenikoy-project/08-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      { "src": "assets/projeler-web/yenikoy-project/01-banyo.webp", "label": "Banyo" },
      { "src": "assets/projeler-web/yenikoy-project/02-cati-kati-oturma-alani.webp", "label": "Çatı katı oturma alanı" },
      { "src": "assets/projeler-web/yenikoy-project/03-giris.webp", "label": "Giriş" },
      { "src": "assets/projeler-web/yenikoy-project/04-merdiven-alti.webp", "label": "Merdiven altı" },
      { "src": "assets/projeler-web/yenikoy-project/05-mutfak.webp", "label": "Mutfak" },
      { "src": "assets/projeler-web/yenikoy-project/06-mutfak.webp", "label": "Mutfak" },
      { "src": "assets/projeler-web/yenikoy-project/07-mutfak.webp", "label": "Mutfak" },
      { "src": "assets/projeler-web/yenikoy-project/08-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/yenikoy-project/09-soyunma-odasi.webp", "label": "Soyunma odası" },
      { "src": "assets/projeler-web/yenikoy-project/10-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/yenikoy-project/11-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/yenikoy-project/12-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/yenikoy-project/13-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/yenikoy-project/14-yatak-odasi.webp", "label": "Yatak odası" }
    ]
  },

  /* ============ 2026-11-19 eklenen yeni projeler (PDF kaynaklı) ============ */
  {
    "id": "baku-villa",
    "slug": "baku-villa",
    "name": "Bakü Villa Projesi",
    "sourceFolder": "PDF s.6-7 — 'Azerbaycan – Bakü Villa', PDF'teki ülke+şehir bilgisi geri eklendi",
    "category": "villa",
    "city": "Azerbaycan – Bakü",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": { "src": "assets/projeler-web/baku-villa/01-giris.webp", "label": "Giriş" },
    "gallery": [
      { "src": "assets/projeler-web/baku-villa/01-giris.webp", "label": "Giriş" },
      { "src": "assets/projeler-web/baku-villa/02-yemek-salonu.webp", "label": "Yemek salonu" },
      { "src": "assets/projeler-web/baku-villa/03-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/baku-villa/04-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/baku-villa/05-yatak-odasi.webp", "label": "Yatak odası" }
    ]
  },
  {
    "id": "mildon-holding",
    "slug": "mildon-holding",
    "name": "Mildon Holding Yönetim Binası (Ortaköy)",
    "sourceFolder": "PDF s.8-10 — 'Mildon Holding Yönetim Binası İstanbul-Ortaköy' (3B konsept render), PDF'teki şirket adı+semt geri eklendi",
    "category": "ticari",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": { "src": "assets/projeler-web/mildon-holding/01-lobi.webp", "label": "Lobi" },
    "gallery": [
      { "src": "assets/projeler-web/mildon-holding/01-lobi.webp", "label": "Lobi" },
      { "src": "assets/projeler-web/mildon-holding/02-karsilama.webp", "label": "Karşılama" },
      { "src": "assets/projeler-web/mildon-holding/03-yonetim-odasi.webp", "label": "Yönetim odası" },
      { "src": "assets/projeler-web/mildon-holding/04-ozel-ofis.webp", "label": "Özel ofis" },
      { "src": "assets/projeler-web/mildon-holding/05-ofis-alani.webp", "label": "Ofis alanı" },
      { "src": "assets/projeler-web/mildon-holding/06-ofis-kosesi.webp", "label": "Ofis köşesi" }
    ]
  },
  {
    "id": "rumelihisari-evi",
    "slug": "rumelihisari-evi",
    "name": "Rumelihisarı Evi",
    "sourceFolder": "PDF s.11 — 'Rumelihisarı Evi, Renovasyon', PDF'teki semt adı geri eklendi",
    "category": "yenileme",
    "city": "İstanbul",
    "subtitle": "Renovasyon, İç Mimari Konsept Proje ve Uygulaması",
    "cover": { "src": "assets/projeler-web/rumelihisari-evi/01-salon.webp", "label": "Salon" },
    "gallery": [
      { "src": "assets/projeler-web/rumelihisari-evi/01-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/rumelihisari-evi/02-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/rumelihisari-evi/03-salon.webp", "label": "Salon" }
    ]
  },
  {
    "id": "moskova-malikanesi",
    "slug": "moskova-malikanesi",
    "name": "Moskova Malikânesi",
    "sourceFolder": "PDF s.25-27 — 'Rusya – Moskova Malikane Tasarım' (s.25 'Salon' başlığı konum tekrarlamıyor ama sayfa sırasına göre aynı projeye bağlandı — teyit bekliyor). PDF'teki ülke+şehir bilgisi geri eklendi.",
    "category": "konut",
    "city": "Rusya – Moskova",
    "subtitle": "İç Mimari Konsept Proje",
    "cover": { "src": "assets/projeler-web/moskova-malikanesi/01-salon.webp", "label": "Salon" },
    "gallery": [
      { "src": "assets/projeler-web/moskova-malikanesi/01-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/moskova-malikanesi/02-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/moskova-malikanesi/03-yatak-odasi.webp", "label": "Yatak odası" },
      { "src": "assets/projeler-web/moskova-malikanesi/04-giyinme-odasi.webp", "label": "Giyinme odası" },
      { "src": "assets/projeler-web/moskova-malikanesi/05-misafir-yatak-odasi.webp", "label": "Misafir yatak odası" },
      { "src": "assets/projeler-web/moskova-malikanesi/06-banyo.webp", "label": "Banyo" }
    ]
  },
  {
    "id": "sariyer-salon-bar",
    "slug": "sariyer-salon-bar",
    "name": "Sarıyer Dairesi",
    "sourceFolder": "PDF s.28 — 'İstanbul – Sarıyer, Salon-Bar Tasarımı', PDF'teki semt adı geri eklendi",
    "category": "konut",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje",
    "cover": { "src": "assets/projeler-web/sariyer-salon-bar/01-salon.webp", "label": "Salon" },
    "gallery": [
      { "src": "assets/projeler-web/sariyer-salon-bar/01-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/sariyer-salon-bar/02-bar-dolabi.webp", "label": "Bar dolabı" },
      { "src": "assets/projeler-web/sariyer-salon-bar/03-bar-dolabi.webp", "label": "Bar dolabı" }
    ]
  },
  {
    "id": "bursa-bademli",
    "slug": "bursa-bademli",
    "name": "Bademli Dairesi",
    "sourceFolder": "PDF s.29 — 'Bursa – Bademli, Salon-Mutfak Tasarımı', PDF'teki semt adı geri eklendi",
    "category": "konut",
    "city": "Bursa",
    "subtitle": "İç Mimari Konsept Proje",
    "cover": { "src": "assets/projeler-web/bursa-bademli/01-salon.webp", "label": "Salon" },
    "gallery": [
      { "src": "assets/projeler-web/bursa-bademli/01-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/bursa-bademli/02-salon.webp", "label": "Salon" },
      { "src": "assets/projeler-web/bursa-bademli/03-mutfak.webp", "label": "Mutfak" }
    ]
  },
  {
    "id": "bilfen-genel-mudurluk",
    "slug": "bilfen-genel-mudurluk",
    "name": "Bilfen Genel Müdürlük Binası",
    "sourceFolder": "PDF s.32 — 'Bilfen Şirketler Topluluğu Genel Müdürlük Binası, Perde Uygulama' (ayrıca Referanslar listesinde), PDF'teki şirket adı geri eklendi",
    "category": "ticari",
    "city": "İstanbul",
    "subtitle": "Perde Uygulaması",
    "cover": { "src": "assets/projeler-web/bilfen-genel-mudurluk/01-perde-uygulamasi.webp", "label": "Perde uygulaması" },
    "gallery": [
      { "src": "assets/projeler-web/bilfen-genel-mudurluk/01-perde-uygulamasi.webp", "label": "Perde uygulaması" }
    ]
  },
  {
    "id": "tekirdag-corlu-evi",
    "slug": "tekirdag-corlu-evi",
    "name": "Çorlu Evi",
    "sourceFolder": "PDF s.33 — 'Tekirdağ - Çorlu Evi, Perde Uygulama', PDF'teki semt adı geri eklendi",
    "category": "konut",
    "city": "Tekirdağ",
    "subtitle": "Perde Uygulaması",
    "cover": { "src": "assets/projeler-web/tekirdag-corlu-evi/01-perde-uygulamasi.webp", "label": "Perde uygulaması" },
    "gallery": [
      { "src": "assets/projeler-web/tekirdag-corlu-evi/01-perde-uygulamasi.webp", "label": "Perde uygulaması" },
      { "src": "assets/projeler-web/tekirdag-corlu-evi/02-perde-uygulamasi.webp", "label": "Perde uygulaması" },
      { "src": "assets/projeler-web/tekirdag-corlu-evi/03-perde-uygulamasi.webp", "label": "Perde uygulaması" }
    ]
  },
  {
    "id": "kalender-kasri",
    "slug": "kalender-kasri",
    "name": "Kalender Kasrı",
    "sourceFolder": "PDF s.34 — 'İstanbul – Kalender Orduevi Kalender Kasrı, Perde Uygulama' (ayrıca Referanslar listesinde), PDF'teki özel adı geri eklendi",
    "category": "yenileme",
    "city": "İstanbul",
    "subtitle": "Perde Uygulaması",
    "cover": { "src": "assets/projeler-web/kalender-kasri/01-perde-uygulamasi.webp", "label": "Perde uygulaması" },
    "gallery": [
      { "src": "assets/projeler-web/kalender-kasri/01-perde-uygulamasi.webp", "label": "Perde uygulaması" },
      { "src": "assets/projeler-web/kalender-kasri/02-perde-uygulamasi.webp", "label": "Perde uygulaması" }
    ]
  },
  {
    "id": "fethiye-gocek-tekne",
    "slug": "fethiye-gocek-tekne",
    "name": "Göcek Tekne Projesi",
    "sourceFolder": "PDF s.35 — 'Fethiye – Göcek Tekne, İç Mimari Konsept Tasarım ve Uygulama', PDF'teki semt adı geri eklendi",
    "category": "yat",
    "city": "Fethiye",
    "subtitle": "İç Mimari Konsept Tasarım ve Uygulama",
    "cover": { "src": "assets/projeler-web/fethiye-gocek-tekne/01-ic-mekan.webp", "label": "İç mekân" },
    "gallery": [
      { "src": "assets/projeler-web/fethiye-gocek-tekne/01-ic-mekan.webp", "label": "İç mekân" },
      { "src": "assets/projeler-web/fethiye-gocek-tekne/02-ic-mekan.webp", "label": "İç mekân" }
    ]
  },
  {
    "id": "abant-kosk-otel",
    "slug": "abant-kosk-otel",
    "name": "Abant Köşk Otel",
    "sourceFolder": "PDF s.30-31 — 'Abant Köşk Otel' + 'Otel İç Mekan Konseptleri' (s.31 konum tekrarlamıyor, aynı spreade bağlı kabul edildi — teyit bekliyor). Ayrıca Referanslar listesinde 'Abant Köşk Otel' olarak geçiyor, PDF'teki özel adı geri eklendi.",
    "category": "otel",
    "city": "Bolu",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": { "src": "assets/projeler-web/abant-kosk-otel/01-lounge.webp", "label": "Lounge" },
    "gallery": [
      { "src": "assets/projeler-web/abant-kosk-otel/01-lounge.webp", "label": "Lounge" },
      { "src": "assets/projeler-web/abant-kosk-otel/02-lounge.webp", "label": "Lounge" },
      { "src": "assets/projeler-web/abant-kosk-otel/03-oda-konsepti.webp", "label": "Oda konsepti" },
      { "src": "assets/projeler-web/abant-kosk-otel/04-oda-konsepti.webp", "label": "Oda konsepti" }
    ]
  },
  {
    "id": "hazal-aslan-hukuk-burosu",
    "slug": "hazal-aslan-hukuk-burosu",
    "name": "Hazal Aslan Hukuk Bürosu",
    "sourceFolder": "'08_HAZAL ASLAN HUKUK BÜROSU' ham klasörü — PDF'te sayfası yok, sadece müşteri WhatsApp fotoğrafları. Şirket adı klasör isminden geri eklendi (bu bir site/semt adı değil, müşterinin kendi verdiği gerçek firma adı). Kategori/şehir tahmini hâlâ teyit bekliyor.",
    "category": "ticari",
    "city": "İstanbul",
    "subtitle": "İç Mimari Konsept Proje ve Uygulaması",
    "cover": { "src": "assets/projeler-web/hazal-aslan-hukuk-burosu/01-bekleme-alani.webp", "label": "Bekleme alanı" },
    "gallery": [
      { "src": "assets/projeler-web/hazal-aslan-hukuk-burosu/01-bekleme-alani.webp", "label": "Bekleme alanı" },
      { "src": "assets/projeler-web/hazal-aslan-hukuk-burosu/02-oturma-kosesi.webp", "label": "Oturma köşesi" },
      { "src": "assets/projeler-web/hazal-aslan-hukuk-burosu/03-ofis.webp", "label": "Ofis" }
    ]
  }
];
  global.CORNICHE_PROJECTS = PROJECTS;
})(window);
