# Corniche — GitHub ve Supabase Hesap Kurulumu

Bu doküman, Corniche web sitesi ve ileride eklenecek altyapılar (veritabanı, form/rezervasyon sistemi vb.) için gereken iki hesabı açma ve teknik danışmanı yönetici (admin) olarak ekleme adımlarını anlatır.

Bu iki hesap **Corniche'e ait** olmalı — kişisel hesaplarla karıştırılmamalı. İleride başka bir danışmanla çalışırsanız veya içeriden biri yönetmek isterse, hesap sizde kalır.

---

## 1. GitHub Hesabı (kod ve site dosyaları için)

GitHub, web sitesinin kodunun saklandığı ve değişiklik geçmişinin tutulduğu platformdur.

### Hesap açma
1. https://github.com/signup adresine gidin.
2. Corniche'e ait bir e-posta adresi girin (örnek: info@corniche... veya işletme sahibinin kurumsal e-postası).
3. Şifre belirleyin, kullanıcı adı seçin (örnek: `corniche-istanbul`).
4. E-posta doğrulama adımlarını tamamlayın.
5. Ücretsiz plan yeterlidir, ödeme bilgisi gerekmez.

### Beni yönetici (admin) yapma
1. Giriş yaptıktan sonra sağ üstteki profil fotoğrafına tıklayın.
2. **Your organizations** (Kuruluşlarınız) bölümüne girin. Eğer bir organizasyon yoksa önce bir tane oluşturun: sağ üstte **+** işaretine tıklayın → **New organization** → ücretsiz planı seçin → organizasyon adını girin (örnek: `Corniche-Istanbul`).
3. Organizasyon sayfasında **People** (Kişiler) sekmesine girin.
4. **Invite member** butonuna tıklayın.
5. Kullanıcı adı olarak **`yemre-aydin`** yazın ve listeden seçin.
6. Rol olarak **Owner** (Sahip) seçin — bu, tam yönetici yetkisi verir.
7. Daveti gönderin.
8. Bana (yeaydin.digital@gmail.com adresime) davet e-postası gelecek, kabul ettiğimde erişim tamamlanmış olur.

> Not: Eğer organizasyon oluşturmak istemezseniz, doğrudan kod deposunu (repository) oluşturduktan sonra o deponun **Settings → Collaborators** kısmından da beni `yemre-aydin` kullanıcı adıyla **Admin** yetkisiyle ekleyebilirsiniz. Ancak ileride birden fazla proje/depo olacaksa organizasyon kurmak daha düzenli olur.

---

## 2. Supabase Hesabı (veritabanı ve backend için)

Supabase, site üzerinden toplanacak verilerin (form, rezervasyon, müşteri kaydı vb.) saklandığı veritabanı altyapısıdır.

### Hesap açma
1. https://supabase.com adresine gidin, sağ üstten **Start your project**'e tıklayın.
2. Kurumsal e-posta ile kayıt olun, veya "Continue with GitHub" seçeneğiyle az önce oluşturduğunuz GitHub hesabıyla giriş yapın (önerilir — tek şifre yönetmek daha kolay olur).
3. E-posta doğrulamasını tamamlayın.
4. İlk organizasyonu oluşturması istendiğinde adı **Corniche** olarak girin.
5. Ücretsiz (Free) plan ilk aşama için yeterlidir.

### Beni yönetici (admin) yapma
1. Sol menüden organizasyon adına tıklayın, üstte **Team** (Takım) sekmesine girin.
2. **Invite a member** (Üye davet et) butonuna tıklayın.
3. E-posta adresi olarak **yeaydin.digital@gmail.com** yazın.
4. Rol olarak **Admin** (veya sistem "Owner" gösteriyorsa bunu) seçin.
5. Daveti gönderin.
6. Bana gelen davet e-postasını kabul ettiğimde erişim tamamlanmış olur.

---

## Özet — İki Adres

| Platform | Davet edilecek kullanıcı adı / e-posta | Yetki |
|---|---|---|
| GitHub | `yemre-aydin` | Owner / Admin |
| Supabase | `yeaydin.digital@gmail.com` | Admin / Owner |

Her iki daveti gönderdikten sonra bana haber verin, kabul edip kurulumun geri kalanına (site + gerekirse veritabanı) başlayayım.
