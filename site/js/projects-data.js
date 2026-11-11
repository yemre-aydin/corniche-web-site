/* CORNICHE İSTANBUL — gerçek proje verisi
   Kaynak: assets/projeler/<klasör>/ (müşteriden gelen 10 proje klasörü, 2026-11-11)
   Görseller WebP'ye dönüştürüldü (max genişlik 2000px, kalite 80) -> assets/projeler-web/
   category / location / year / scope ALANLARI HENÜZ YOK — kullanıcı bu bilgilerin sonra geleceğini söyledi.
   null oldukları sürece: kart/detay sayfasında küçük etiket "[Kategori]" gösterilir,
   konum/yıl/kapsam satırları spec kuralına göre (bilgi yoksa satır gösterilmez) gizlenir.
   NOT: "Proje A. B", "dragos" ve "savoy project" klasörleri BİREBİR AYNI 5 fotoğrafı içeriyor
   (md5 ile doğrulandı) — muhtemelen kopyalama hatası, kullanıcıya ayrıca bildirildi. */
(function (global) {
  var PROJECTS = [
  {
    "id": "berkozan",
    "slug": "berkozan",
    "name": "Berkozan",
    "sourceFolder": "corniche istanbul berkozan",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/berkozan/01-toplanti-odasi.webp",
      "label": "Toplantı odası"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/berkozan/01-toplanti-odasi.webp",
        "label": "Toplantı odası"
      },
      {
        "src": "assets/projeler-web/berkozan/02-toplanti-odasi.webp",
        "label": "Toplantı odası"
      },
      {
        "src": "assets/projeler-web/berkozan/03-toplanti-odasi.webp",
        "label": "Toplantı odası"
      },
      {
        "src": "assets/projeler-web/berkozan/04-toplanti-odasi.webp",
        "label": "Toplantı odası"
      },
      {
        "src": "assets/projeler-web/berkozan/05-toplanti-odasi.webp",
        "label": "Toplantı odası"
      },
      {
        "src": "assets/projeler-web/berkozan/06-toplanti-odasi.webp",
        "label": "Toplantı odası"
      },
      {
        "src": "assets/projeler-web/berkozan/07-toplanti-odasi.webp",
        "label": "Toplantı odası"
      }
    ]
  },
  {
    "id": "dragos",
    "slug": "dragos",
    "name": "Dragos",
    "sourceFolder": "corniche istanbul dragos",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/dragos/02-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/dragos/01-bebek-odasi.webp",
        "label": "Bebek Odası"
      },
      {
        "src": "assets/projeler-web/dragos/02-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/dragos/03-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/dragos/04-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/dragos/05-yemek-odasi.webp",
        "label": "Yemek Odası"
      }
    ]
  },
  {
    "id": "grel-maya-project",
    "slug": "grel-maya-project",
    "name": "Grel Maya Project",
    "sourceFolder": "corniche istanbul grel maya project",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/grel-maya-project/01-corniche-salon.webp",
      "label": "Corniche salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/grel-maya-project/01-corniche-salon.webp",
        "label": "Corniche salon"
      },
      {
        "src": "assets/projeler-web/grel-maya-project/02-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/grel-maya-project/03-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/grel-maya-project/04-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/grel-maya-project/05-yemek-odasi.webp",
        "label": "Yemek odası"
      }
    ]
  },
  {
    "id": "kemer-prive",
    "slug": "kemer-prive",
    "name": "Kemer Prive",
    "sourceFolder": "corniche istanbul kemer prive",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/kemer-prive/01-merdiven-alti.webp",
      "label": "Merdiven altı"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/kemer-prive/01-merdiven-alti.webp",
        "label": "Merdiven altı"
      },
      {
        "src": "assets/projeler-web/kemer-prive/02-merdiven-alti.webp",
        "label": "Merdiven altı"
      },
      {
        "src": "assets/projeler-web/kemer-prive/03-merdiven-alti.webp",
        "label": "Merdiven altı"
      }
    ]
  },
  {
    "id": "kozan",
    "slug": "kozan",
    "name": "Kozan",
    "sourceFolder": "corniche istanbul kozan",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/kozan/18-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/kozan/01-calisma-odasi.webp",
        "label": "Çalışma odası"
      },
      {
        "src": "assets/projeler-web/kozan/02-calisma-odasi.webp",
        "label": "Çalışma odası"
      },
      {
        "src": "assets/projeler-web/kozan/03-camasir-odasi.webp",
        "label": "Çamaşır odası"
      },
      {
        "src": "assets/projeler-web/kozan/04-cocuk-odasi.webp",
        "label": "Çocuk odası"
      },
      {
        "src": "assets/projeler-web/kozan/05-cocuk-odasi.webp",
        "label": "Çocuk odası"
      },
      {
        "src": "assets/projeler-web/kozan/06-cocuk-odasi.webp",
        "label": "Çocuk odası"
      },
      {
        "src": "assets/projeler-web/kozan/07-cocuk-odasi.webp",
        "label": "Çocuk odası"
      },
      {
        "src": "assets/projeler-web/kozan/08-ginme-odasi.webp",
        "label": "Ginme odası"
      },
      {
        "src": "assets/projeler-web/kozan/09-giris.webp",
        "label": "Giriş"
      },
      {
        "src": "assets/projeler-web/kozan/10-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/11-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/12-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/13-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/14-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/15-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/16-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/kozan/17-mutfak.webp",
        "label": "Mutfak"
      },
      {
        "src": "assets/projeler-web/kozan/18-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/kozan/19-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/kozan/20-salon.webp",
        "label": "Salon"
      }
    ]
  },
  {
    "id": "proje-02",
    "slug": "proje-02",
    "name": "Proje 02",
    "sourceFolder": "corniche istanbul proje 02",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/proje-02/06-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/proje-02/01-giris.webp",
        "label": "Giriş"
      },
      {
        "src": "assets/projeler-web/proje-02/02-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/proje-02/03-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/proje-02/04-mutfak.webp",
        "label": "Mutfak"
      },
      {
        "src": "assets/projeler-web/proje-02/05-mutfak.webp",
        "label": "Mutfak"
      },
      {
        "src": "assets/projeler-web/proje-02/06-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/proje-02/07-salon.webp",
        "label": "Salon"
      }
    ]
  },
  {
    "id": "proje-a-b",
    "slug": "proje-a-b",
    "name": "Proje A. B",
    "sourceFolder": "corniche istanbul Proje A. B",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/proje-a-b/02-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/proje-a-b/01-bebek-odasi.webp",
        "label": "Bebek Odası"
      },
      {
        "src": "assets/projeler-web/proje-a-b/02-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/proje-a-b/03-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/proje-a-b/04-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/proje-a-b/05-yemek-odasi.webp",
        "label": "Yemek Odası"
      }
    ]
  },
  {
    "id": "proje-h-a",
    "slug": "proje-h-a",
    "name": "Proje H.A",
    "sourceFolder": "corniche istanbul Proje H.A",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/proje-h-a/04-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/proje-h-a/01-calisma-odasi.webp",
        "label": "Çalışma odası"
      },
      {
        "src": "assets/projeler-web/proje-h-a/02-giyinme-odasi.webp",
        "label": "Giyinme odası"
      },
      {
        "src": "assets/projeler-web/proje-h-a/03-oturna-alani.webp",
        "label": "Oturna alanı"
      },
      {
        "src": "assets/projeler-web/proje-h-a/04-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/proje-h-a/05-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/proje-h-a/06-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/proje-h-a/07-yemek-odasi.webp",
        "label": "Yemek odası"
      },
      {
        "src": "assets/projeler-web/proje-h-a/08-yemek-odasi.webp",
        "label": "Yemek odası"
      }
    ]
  },
  {
    "id": "savoy-project",
    "slug": "savoy-project",
    "name": "Savoy Project",
    "sourceFolder": "corniche istanbul savoy project",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/savoy-project/02-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/savoy-project/01-bebek-odasi.webp",
        "label": "Bebek Odası"
      },
      {
        "src": "assets/projeler-web/savoy-project/02-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/savoy-project/03-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/savoy-project/04-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/savoy-project/05-yemek-odasi.webp",
        "label": "Yemek Odası"
      }
    ]
  },
  {
    "id": "yenikoy-project",
    "slug": "yenikoy-project",
    "name": "Yeniköy Project",
    "sourceFolder": "corniche istanbul0 yeniköy project",
    "category": null,
    "location": null,
    "year": null,
    "scope": null,
    "cover": {
      "src": "assets/projeler-web/yenikoy-project/08-salon.webp",
      "label": "Salon"
    },
    "gallery": [
      {
        "src": "assets/projeler-web/yenikoy-project/01-banyo.webp",
        "label": "Banyo"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/02-cati-kati-oturma-alani.webp",
        "label": "Çatı katı oturma alanı"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/03-giris.webp",
        "label": "Giriş"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/04-merdiven-alti.webp",
        "label": "Merdiven altı"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/05-mutfak.webp",
        "label": "Mutfak"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/06-mutfak.webp",
        "label": "Mutfak"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/07-mutfak.webp",
        "label": "Mutfak"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/08-salon.webp",
        "label": "Salon"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/09-soyunma-odasi.webp",
        "label": "Soyunma odası"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/10-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/11-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/12-yatak-odasi.webp",
        "label": "Yatak odası"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/13-yatak-odasi.webp",
        "label": "yatak odası"
      },
      {
        "src": "assets/projeler-web/yenikoy-project/14-yatak-odasi.webp",
        "label": "Yatak odası"
      }
    ]
  }
];
  global.CORNICHE_PROJECTS = PROJECTS;
})(window);
