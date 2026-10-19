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

- [ ] Logo dosyası (tercihen SVG; yoksa yüksek çözünürlüklü PNG)
- [ ] Yazı tipi tercihi — şu an sistem yazı tipi kullanılıyor, geçici
- [ ] Firma tanıtım cümlesi (masaüstünde halkanın ortasında çıkıyor) — Türkçe ve İngilizce

Şu an başlıkta kesikli çerçeve içinde "CORNICHE İSTANBUL" yazıyor; çerçeve gerçek logonun yerini
işaretliyor.

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

Menü sırası: Projeler · Hakkımızda · Hizmetlerimiz · Furniture · Accessories · Showroom · İletişim

- [ ] **Hakkımızda** sayfası metni (TR + EN)
- [ ] **Hizmetlerimiz / Nasıl Çalışıyoruz** sayfası metni (TR + EN)
- [ ] **Furniture** sayfası — ürün adları, fotoğraflar, malzeme/ölçü bilgileri
- [ ] **Accessories** sayfası — aynı yapı
- [ ] **Showroom** sayfası — Corniche'in kendi showroom'u; metin, fotoğraf, adres
- [ ] **İletişim** sayfası — form istenip istenmediği kararı
- [ ] Mobil menü paneli tasarımı (dil değiştirme de buraya girecek; şu an sadece masaüstünde var)
      — menü yedi satıra çıktığı için bu panel artık daha gerekli

## 6. Karar bekleyenler

- [x] **Collection** — karar verildi. "Collection" tek bir menü başlığı olmaktan çıktı:
      **Furniture** ve **Accessories** doğrudan menüye girdi, **Art** menüye girmiyor.
      Menü sırası artık: Projeler · Hakkımızda · Hizmetlerimiz · Furniture · Accessories ·
      Showroom · İletişim.
- [ ] **Art bölümü nereye?** "Aşağıda olmalı" dendi, iki türlü anlaşılabiliyor:
      ana sayfada halkanın altında bir bölüm mü, yoksa menünün en altında ayrı bir satır mı?
      Ana sayfada bölüm olacaksa dikkat: sayfada aşağı kaydırmak şu an halkayı döndürüyor,
      içerik akışı değil. Halkanın altına bölüm eklemek bu davranışı değiştirmeyi gerektirir.
- [ ] Furniture ve Accessories sayfalarının içeriği — ürün adı, fotoğraf, malzeme/ölçü gibi
      alanlar projelerden farklı; ayrı bir içerik yapısı kurulacak
- [ ] **Kategori etiketleri Türkçe olsun mu?** Şu an onaylanan tasarıma uygun olarak iki dilde de
      İngilizce duruyor (Hospitality, Residential…). Site haritasındaki Türkçe karşılıklar
      (Otel Projeleri, Konut / Daire, Yenileme, Ticari Mekânlar) istenirse her biri tek satırlık
      düzenlemeyle geçer.
- [ ] **Masaüstü yönü** — gelen tasarım mobil içindi. Masaüstünde yeni renkler uygulandı ama
      kategori satırı yok, halkanın çevresindeki etiketler duruyor.
- [ ] **"Izgara görünümü"** düğmesi şu an çalışmıyor. Yapılacaksa ayrı bir görünüm gerekiyor.
- [ ] **Öne çıkan proje davranışı** — kategori satırı halkayı filtreliyor ve sayfa Hospitality
      seçili açılıyor diye kuruldu. Üstteki bloğun halkadan bağımsız sabit bir vitrin olması
      isteniyorsa değişmesi gerekir.

## 7. Yayına almadan önce

- [ ] Tüm sayfalardaki `noindex` etiketlerinin kaldırılması (şu an site arama motorlarına kapalı)
- [ ] Gerçek alan adına bağlanması
- [ ] Hukuki metinlerin navigasyona ve footer'a eklenmesi
