/* CORNICHE İSTANBUL — main.js (vanilla JS, ES5 uyumlu) */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- header scroll state ---------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 4) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- mobil menü paneli (+ masaüstü hamburger paneli) ----------------
     Aynı hamburger düğmesi, genişliğe göre iki farklı panelden birini açar:
     - .menu-panel          : mevcut mobil panel (tüm sayfalar, <1024px, Koleksiyon
       dahil) — DOKUNULMADI, aynen çalışmaya devam ediyor.
     - .menu-panel-home     : Emel Hanım'ın konsept görseliyle aynı iki dilli panel;
       önce sadece ana sayfadaydı, artık >=1024px'te TÜM sayfalarda kullanılıyor.
     Hangisinin açılacağı tıklama anındaki genişliğe göre seçilir, böylece pencere
     mobil/masaüstü eşiğini geçerse de doğru panel açılır. */
  function initMobileMenu() {
    var burger = document.querySelector('.menu-burger');
    var panel = document.querySelector('.menu-panel');
    var closeBtn = panel && panel.querySelector('.menu-panel-close');
    var homePanel = document.querySelector('.menu-panel-home');
    var homeCloseBtn = homePanel && homePanel.querySelector('.menu-panel-home-close');
    if (!burger) return;

    function isDesktop() {
      return window.matchMedia('(min-width: 1024px)').matches;
    }
    function open(p) {
      if (!p) return;
      p.classList.add('is-open');
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
    }
    function close(p) {
      if (!p) return;
      p.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
    burger.addEventListener('click', function () {
      open(isDesktop() && homePanel ? homePanel : panel);
    });
    if (closeBtn) closeBtn.addEventListener('click', function () { close(panel); });
    if (homeCloseBtn) homeCloseBtn.addEventListener('click', function () { close(homePanel); });

    // [data-toggle-sub] aç/kapa mekaniği hem mobil .menu-panel'deki (Koleksiyon)
    // hem masaüstü .menu-panel-home'daki (Projeler) alt menülerde aynı — tek
    // bir fonksiyonla ikisine de bağlanıyor.
    function wireCollapsibles(root) {
      if (!root) return;
      var collapsibles = root.querySelectorAll('[data-toggle-sub]');
      for (var i = 0; i < collapsibles.length; i++) {
        (function (btn) {
          btn.addEventListener('click', function () {
            var subId = btn.getAttribute('data-toggle-sub');
            var sub = document.getElementById(subId);
            var sign = btn.querySelector('.toggle-sign');
            if (!sub) return;
            var isOpen = sub.classList.toggle('is-open');
            if (sign) sign.textContent = isOpen ? '−' : '+';
          });
        })(collapsibles[i]);
      }
    }
    wireCollapsibles(panel);
    wireCollapsibles(homePanel);
  }

  /* ---------------- aktif menü öğesi ---------------- */
  function initActiveNav() {
    var page = document.body.getAttribute('data-page');
    if (!page) return;
    var links = document.querySelectorAll('[data-nav-page]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('data-nav-page') === page) {
        links[i].classList.add('is-active');
      }
    }
  }

  /* ---------------- dil (TR/EN) ---------------- */
  function initLangSwitch() {
    var enButtons = document.querySelectorAll('[data-lang="en"]');
    for (var i = 0; i < enButtons.length; i++) {
      enButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        alert('İngilizce sürüm hazırlanıyor. İçerikler onaylandıktan sonra eklenecek.');
      });
    }
  }

  /* ================================================================
     ANA SAYFA HALKASI — GSAP tabanlı (bkz. git geçmişi 4150e09, site/script.js
     "Showcase ring" ve "mobile ring" bölümleri; ScrollTrigger pin/scrub
     mekaniği 2026-11-15'te kaldırıldı — müşteri geri bildirimi: dönüş sayfa
     scroll'una bağlıyken bir "limiti" oluyordu ve ikisi birbirine karışıyordu).
     Masaüstü/tablet tarafı kavisli, dilimli kartlardan oluşan bir halka; imleç
     halka alanındayken fare tekerleği halkayı döndürür (initWheelRotate),
     dışarıdayken sayfa normal kayar. Mobil tarafı dokunup sürükleyerek
     döndürülen düz kartlı küçük bir atlıkarınca (dokunulmadı). Masaüstü halka
     ayrıca viewport'a otomatik sığdırılır (fitToViewport) — kartlar+etiketler
     hiçbir ekran yüksekliğinde taşmaz/scroll gerektirmez. İkisi de aynı
     kategori verisini (window.CORNICHE_RING_CATEGORIES, yoksa
     window.CORNICHE_CATEGORIES) kullanır; tıklanan/seçilen kart kendi `link`
     alanına (veya projeler/index.html?kategori=X'e) götürür.
     ================================================================ */

  var RING_DEG = Math.PI / 180;

  /* ---- masaüstü / tablet: kavisli, dilimli halka (dönüş artık fare tekerleğiyle) ---- */
  function initHeroRingDesktop(ring, categories) {
    if (!window.gsap) return;

    var scene = ring.querySelector('.ring-scene');
    var scaleWrap = ring.querySelector('.ring-scale');
    var gallery = ring.querySelector('.ring-gallery');
    var ellipseLine = ring.querySelector('.ring-ellipse');
    var centerWrap = ring.querySelector('.ring-center');
    var previewCat = ring.querySelector('.ring-preview-cat');
    var previewTitle = ring.querySelector('.ring-preview-title');
    var previewLink = ring.querySelector('.ring-preview-link');
    if (!scene || !gallery) return;

    var SEGMENTS = 8;
    var CURVE_R = 620;     // kartın sarıldığı silindirin yarıçapı
    var DEPTH = 330;       // halkanın arka tarafı ne kadar geride durur
    var TURN = 22;         // halkanın yanlarındaki kart dönüş açısı
    var LABEL_GAP = 30;
    var HOVER_LIFT = 14, HOVER_SCALE = 1.08;
    var PARALLAX = 4;
    var ARC_STEPS = 1440;
    // Header altı / köşe linkleri üstü güvenli payları — geometry() (merkezi
    // dengelemek için) ve fitToViewport() (taşmayı önlemek için) AYNI
    // değerleri kullanıyor, bkz. her ikisindeki yorumlar.
    var HEADER_H = 88; // bkz. --header-h (masaüstü)
    var TOP_PAD = 24;
    var BOTTOM_PAD = 64; // alt köşe linkleri için pay
    var SIDE_PAD = 32;    // sol/sağ kenar güvenlik payı (yatay taşma kontrolü)

    var isTabletNow = false;
    var showRx = 640, showRy = 190;
    var centerYFrac = 0.55; // geometry() tarafından her yüklemede/resize'da yeniden hesaplanır
    var arcTable = null, arcTotal = 0, arcTop = 0;
    var items = [];
    var hovered = null;
    var ringRot = 0;

    function buildArcTable() {
      arcTable = new Float64Array(ARC_STEPS + 1);
      var prevX = showRx, prevY = 0, total = 0;
      for (var s = 1; s <= ARC_STEPS; s++) {
        var a = (s / ARC_STEPS) * Math.PI * 2;
        var x = Math.cos(a) * showRx, y = Math.sin(a) * showRy;
        total += Math.hypot(x - prevX, y - prevY);
        arcTable[s] = total;
        prevX = x; prevY = y;
      }
      arcTotal = total;
      arcTop = arcTable[Math.round((270 / 360) * ARC_STEPS)] / arcTotal;
    }

    function angleAtArc(t) {
      if (!arcTable || !arcTotal) return t * 360;
      var want = ((((t % 1) + 1) % 1)) * arcTotal;
      var lo = 0, hi = ARC_STEPS;
      while (lo < hi) {
        var mid = (lo + hi) >> 1;
        if (arcTable[mid] < want) lo = mid + 1; else hi = mid;
      }
      return (lo / ARC_STEPS) * 360;
    }

    function geometry() {
      var vw = window.innerWidth, vh = window.innerHeight;
      // Bölüm artık sabit min/max px'e değil, doğrudan gerçek viewport
      // yüksekliğine eşitleniyor — "1440/1280/1024'te halka sığmıyor" sorunu,
      // eski min-height:760px'in kısa pencerelerde viewport'tan uzun bir
      // section'a zorlamasından kaynaklanıyordu (bkz. fitToViewport, aşağıda).
      var vhSafe = Math.max(vh, 480);
      ring.style.height = vhSafe + 'px';
      isTabletNow = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      // Yarıçaplar büyütüldü (eski: vw*.39/700, vh*.27/260) — halka artık
      // viewport'u daha agresif dolduruyor; taşma riski fitToViewport()'un
      // hem dikey hem yatay sınırlara göre küçültmesiyle karşılanıyor (bkz.
      // aşağıda), o yüzden burada büyük tutmak güvenli.
      showRx = Math.min(vw * 0.46, 860);
      var CENTER_HALF_H = 150;  // logo (~220) + boşluk (20) + etiket cümlesi, yaklaşık yarısı
      var CARD_HALF_H = 65;     // en yakın kartın (h=120, ~1.08 ölçek) yaklaşık yarı yüksekliği
      var CENTER_CARD_GAP = 24;
      var showRyMin = CENTER_HALF_H + CARD_HALF_H + CENTER_CARD_GAP;
      showRy = Math.max(showRyMin, Math.min(vh * 0.38, 370));

      // Halkanın düşey merkezi (--ring-cy) artık sabit %55 DEĞİL — header
      // altındaki güvenli alan (HEADER_H+TOP_PAD) ile köşe linklerinin
      // üstündeki güvenli alan (BOTTOM_PAD) arasındaki bandın tam ortası.
      // Sabit %55'te üst pay (112px) alt paydan (64px) büyük olduğu için
      // üstte hep kullanılmayan bir boşluk kalıyordu; ortalama alınca iki
      // taraf da eşit kullanılabilir alana sahip oluyor (fitToViewport bu
      // SIFIR fazlalık ilkesini koruyarak küçültüyor/büyütüyor).
      var topLimitPx = HEADER_H + TOP_PAD;
      var bottomLimitPx = vhSafe - BOTTOM_PAD;
      centerYFrac = ((topLimitPx + bottomLimitPx) / 2) / vhSafe;
      ring.style.setProperty('--ring-cy', (centerYFrac * 100).toFixed(2) + '%');

      if (ellipseLine) {
        ellipseLine.style.width = (showRx * 2) + 'px';
        ellipseLine.style.height = (showRy * 2) + 'px';
      }
      buildArcTable();
    }

    function build() {
      gallery.innerHTML = '';
      items.length = 0;
      categories.forEach(function (cat) {
        var w = cat.w, h = cat.h;
        if (isTabletNow) {
          w = cat.isHotel ? 170 : 140;
          h = cat.isHotel ? 113 : 93;
        }
        var segW = w / SEGMENTS;
        var step = (segW / CURVE_R) * (180 / Math.PI);

        var el = document.createElement('a');
        el.className = 'ring-item' + (cat.isHotel ? ' is-hotel' : '');
        el.href = cat.link || ('projeler/index.html?kategori=' + cat.id);
        el.style.width = w + 'px';
        el.style.height = h + 'px';

        var cardEl = document.createElement('div');
        cardEl.className = 'ring-card3d';

        var face = document.createElement('div');
        face.className = 'ring-face';
        face.style.transform = 'translateZ(' + (-CURVE_R) + 'px)';
        var segs = [];
        for (var s = 0; s < SEGMENTS; s++) {
          var seg = document.createElement('div');
          seg.className = 'ring-seg';
          seg.style.width = (segW + 1) + 'px';
          seg.style.marginLeft = (-(segW + 1) / 2) + 'px';
          seg.style.left = '50%';
          var segAngle = (s - (SEGMENTS - 1) / 2) * step;
          seg.style.transform = 'rotateY(' + segAngle + 'deg) translateZ(' + CURVE_R + 'px)';
          // "shade" dilimin 3B ışık alma değeri (açıya göre); varsayılan/hover
          // soluklaştırma çarpanı bununla çarpılıp place()'te uygulanıyor
          // (bkz. DIM_DEFAULT/DIM_ACTIVE, aşağıda) — ikisi birden tek filter'da.
          var shade = 0.9 + 0.1 * Math.cos(segAngle * RING_DEG);
          segs.push({ el: seg, shade: shade });
          if (cat.img) {
            // Kartın tam fotoğrafı (w x h), her dilimde sadece kendi dikey
            // şeridi görünecek şekilde kaydırılıyor — dilimler silindire
            // sarılınca fotoğraf kavisli kartın üstünde bütün görünür.
            seg.style.backgroundImage = 'url(' + cat.img + ')';
            seg.style.backgroundSize = w + 'px ' + h + 'px';
            seg.style.backgroundPosition = (-(s * segW)) + 'px 0';
            seg.style.backgroundRepeat = 'no-repeat';
          } else {
            // Gerçek fotoğrafı olmayan kategoriler (Art, Textiles, Kids' Rooms):
            // spec'teki "görsel yer tutucu kutu" rengi (--vizon), görsel icat edilmedi.
            seg.style.backgroundColor = 'var(--vizon)';
          }
          face.appendChild(seg);
        }
        cardEl.appendChild(face);

        var label = document.createElement('span');
        label.className = 'ring-label';
        label.textContent = (cat.tr || '').toLocaleUpperCase('en-US');

        el.appendChild(cardEl);
        el.appendChild(label);
        gallery.appendChild(el);

        items.push({ el: el, cardEl: cardEl, label: label, cat: cat, w: w, h: h, segs: segs });
      });
    }

    // Kart görsellerinin parlaklığı: varsayılan hepsi eşit oranda hafif soluk
    // (DIM_DEFAULT), hover/aktifte tam parlaklık (DIM_ACTIVE) — bkz. place().
    var DIM_DEFAULT = 0.8, SAT_DEFAULT = 0.9;
    var DIM_ACTIVE = 1, SAT_ACTIVE = 1;

    function place() {
      var n = items.length || 1;
      items.forEach(function (card, i) {
        var angle = angleAtArc(arcTop + i / n + ringRot / 360);
        var rad = angle * RING_DEG;
        var sin = Math.sin(rad), cos = Math.cos(rad);
        var z = sin * DEPTH;          // elipsin üst yarısı daha geride durur
        var near = (sin + 1) / 2;     // 0 uzak, 1 yakın
        var lifted = card === hovered;

        gsap.set(card.el, {
          xPercent: -50, yPercent: -50,
          x: cos * showRx,
          y: sin * showRy - (lifted ? HOVER_LIFT : 0),
          z: z,
          opacity: 0.42 + near * 0.58
        });
        gsap.set(card.cardEl, {
          rotationY: cos * TURN,
          scale: (0.74 + near * 0.34) * (lifted ? HOVER_SCALE : 1)
        });
        card.label.style.top = sin < 0
          ? (-LABEL_GAP) + 'px'
          : (card.h + LABEL_GAP - 14) + 'px';

        var dim = lifted ? DIM_ACTIVE : DIM_DEFAULT;
        var sat = lifted ? SAT_ACTIVE : SAT_DEFAULT;
        if (card.segs) {
          for (var si = 0; si < card.segs.length; si++) {
            var sg = card.segs[si];
            sg.el.style.filter = 'brightness(' + (sg.shade * dim).toFixed(3) + ') saturate(' + sat + ')';
          }
        }
      });
    }

    function setPreview(card) {
      if (!centerWrap) return;
      if (previewCat) previewCat.textContent = (card.cat.tr || '').toLocaleUpperCase('en-US');
      if (previewTitle) previewTitle.textContent = card.cat.tr;
      if (previewLink) previewLink.setAttribute('href', card.cat.link || ('projeler/index.html?kategori=' + card.cat.id));
      centerWrap.classList.add('show-preview');
    }
    function clearPreview() {
      if (centerWrap) centerWrap.classList.remove('show-preview');
    }

    scene.addEventListener('pointermove', function (e) {
      var under = document.elementFromPoint(e.clientX, e.clientY);
      var hit = under && under.closest('.ring-item');
      var card = null;
      if (hit) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].el === hit) { card = items[i]; break; }
        }
      }
      if (card === hovered) return;
      if (hovered) hovered.el.classList.remove('is-active');
      hovered = card;
      if (hovered) hovered.el.classList.add('is-active');
      place();
      if (card) setPreview(card); else clearPreview();
    });
    scene.addEventListener('pointerleave', function () {
      if (!hovered) return;
      hovered.el.classList.remove('is-active');
      hovered = null;
      place();
      clearPreview();
    });

    function initParallax() {
      window.addEventListener('mousemove', function (e) {
        var px = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        var py = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        gsap.to(gallery, { rotationX: py * PARALLAX, rotationY: -px * PARALLAX, duration: 1, ease: 'power2.out', overwrite: 'auto' });
      });
    }

    /* ---- fare tekerleği ile döndürme ----
       Önceki ScrollTrigger (pin + scrub) dönüşü sayfa scroll pozisyonuna
       bağlıyordu: dönüşün bir "sonu" vardı ve sayfa kaydırma ile halka dönüşü
       birbirine karışıyordu. Artık tamamen bağımsız: imleç halka alanının
       (bu .hero-ring section'ı — ellipse, kartlar, köşe linkleri dahil)
       SINIRLARI İÇİNDEYKEN wheel olayı sayfayı kaydırmaz, halkayı döndürür
       (360° sınırsız, place() zaten % ile sarıyor). İmleç dışarıdayken normal
       sayfa scroll'u hiç etkilenmez — listener sadece ring elemanına bağlı,
       başka hiçbir şeye dokunulmuyor. */
    var WHEEL_SENS = 0.12;
    function initWheelRotate() {
      var pending = 0, raf = null;
      ring.addEventListener('wheel', function (e) {
        e.preventDefault();
        pending += (e.deltaY || e.deltaX);
        if (raf) return;
        raf = requestAnimationFrame(function () {
          ringRot += pending * WHEEL_SENS;
          pending = 0;
          raf = null;
          place();
        });
      }, { passive: false });
    }

    /* ---- viewport'a sığdırma ----
       Halkanın tamamı (en üstteki/alttaki kart + etiketi dahil) her zaman tek
       ekranda, scroll'suz görünmeli. Kartları+etiketleri gerçek konumlarından
       ölçüp (getBoundingClientRect) header ile alt köşe linkleri arasındaki
       kullanılabilir alana sığmıyorsa .ring-scale'i merkezden (%55, CSS
       transform-origin ile aynı nokta) küçültür. Doğal boyutta zaten
       sığıyorsa scale 1'de kalır — büyütme yapılmaz. */
    function fitToViewport() {
      if (!scaleWrap) return;
      scaleWrap.style.transform = 'scale(1)';
      var minTop = Infinity, maxBottom = -Infinity, minLeft = Infinity, maxRight = -Infinity;
      items.forEach(function (card) {
        var r1 = card.el.getBoundingClientRect();
        var r2 = card.label.getBoundingClientRect();
        if (r1.height) {
          minTop = Math.min(minTop, r1.top); maxBottom = Math.max(maxBottom, r1.bottom);
          minLeft = Math.min(minLeft, r1.left); maxRight = Math.max(maxRight, r1.right);
        }
        if (r2.height) {
          minTop = Math.min(minTop, r2.top); maxBottom = Math.max(maxBottom, r2.bottom);
          minLeft = Math.min(minLeft, r2.left); maxRight = Math.max(maxRight, r2.right);
        }
      });
      if (!isFinite(minTop)) return;

      var heroRect = ring.getBoundingClientRect();
      var topLimit = heroRect.top + HEADER_H + TOP_PAD;
      var bottomLimit = heroRect.bottom - BOTTOM_PAD;
      // geometry() ile AYNI dengelenmiş merkez (centerYFrac) kullanılıyor —
      // böylece üstte/altta kullanılabilir pay birbirine eşit, "üstte
      // kullanılmayan fazla boşluk" yapısal olarak oluşmuyor.
      var centerY = heroRect.top + heroRect.height * centerYFrac;

      var neededHalfV = Math.max(centerY - minTop, maxBottom - centerY);
      var availableHalfV = Math.min(centerY - topLimit, bottomLimit - centerY);
      if (availableHalfV <= 20) availableHalfV = 20; // aşırı kısa pencerede son çare
      var scaleV = Math.min(1, availableHalfV / neededHalfV);

      // Yatay taşma kontrolü: showRx büyütüldüğü için (bkz. geometry()) dar
      // pencerelerde kartlar viewport kenarlarını aşabilir — dikey skalaya
      // ek olarak yatay bir skala da hesaplanıp ikisinin küçüğü uygulanıyor.
      var centerX = heroRect.left + heroRect.width / 2;
      var neededHalfH = Math.max(centerX - minLeft, maxRight - centerX);
      var availableHalfH = Math.max(40, heroRect.width / 2 - SIDE_PAD);
      var scaleH = Math.min(1, availableHalfH / neededHalfH);

      var scale = Math.min(scaleV, scaleH);
      scaleWrap.style.transform = 'scale(' + scale.toFixed(4) + ')';
    }

    /* ---- merkez logo bloğuyla çakışmayı çöz ----
       showRy'yi merkezin/kartın yaklaşık yarı yükseklikleriyle sınırlamak
       sadece TAM üstteki/alttaki kartı (sin≈±1, x≈0) merkezden uzak tutuyor;
       10 kart eşit açıyla dağıldığı için üst/alt komşu kartlar (ör. Yacht &
       Marine, Kids' Rooms, Renovation, Art — ~54°/126° açıda) hem x hem y'de
       orta değerler alıyor ve küçük elipslerde (dar viewport) merkez kutusunun
       köşelerine giriyor. Analitik olarak çözmek yerine gerçek konumları
       ölçüp (getBoundingClientRect) merkezle kesişen en küçük eksendeki
       girişim miktarınca elipsi büyüterek birkaç adımda çakışmayı sıfırlıyor
       — büyüyen elips daha sonra fitToViewport() tarafından viewport'a
       orantılı küçültülüyor (çakışmasızlık oran olarak korunuyor). */
    function resolveCenterOverlap() {
      var centerBox = centerWrap && centerWrap.querySelector('.ring-center-default');
      if (!centerBox) return;
      for (var iter = 0; iter < 16; iter++) {
        var c = centerBox.getBoundingClientRect();
        var worst = 0;
        items.forEach(function (card) {
          var r = card.el.getBoundingClientRect();
          var ox = Math.min(r.right, c.right) - Math.max(r.left, c.left);
          var oy = Math.min(r.bottom, c.bottom) - Math.max(r.top, c.top);
          if (ox > 0 && oy > 0) worst = Math.max(worst, Math.min(ox, oy));
        });
        if (worst <= 0.5) break;
        showRx += worst * 0.6;
        showRy += worst * 0.6;
        if (ellipseLine) {
          ellipseLine.style.width = (showRx * 2) + 'px';
          ellipseLine.style.height = (showRy * 2) + 'px';
        }
        buildArcTable();
        place();
      }
    }

    geometry();
    build();
    place();
    resolveCenterOverlap();
    fitToViewport();

    if (!prefersReducedMotion) {
      initWheelRotate();
      initParallax();
    }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        geometry();
        build();
        place();
        resolveCenterOverlap();
        fitToViewport();
      }, 150);
    });
  }

  /* ---- mobil: dokunup sürükle-döndür halkası ---- */
  function initHeroRingMobile(section, categories) {
    if (!window.gsap) return;

    var wrap = section.querySelector('.mobile-ring-wrap');
    var hitbox = section.querySelector('.mobile-ring-hitbox');
    var cardsWrap = section.querySelector('.mobile-ring');
    var mrpCat = section.querySelector('.mrp-cat');
    var mrpTitle = section.querySelector('.mrp-title');
    var mrpImgSpan = section.querySelector('.mrp-img span');
    var mrpImgWrap = section.querySelector('.mrp-img');
    var mrpView = section.querySelector('.mrp-view');
    if (!wrap || !hitbox || !cardsWrap) return;

    // Eski mobil halka ("item"/"item-card") devasa, çoğu ekranın dışında
    // duran bir çarktı — tam ekranlık bir sahnede bu normaldi, önden sadece
    // bir dilim görünürdü. Burada halka, sayfanın normal akışındaki küçük
    // bir kutuya (mobile-ring-wrap) sığmak zorunda; o yüzden aynı "pivot
    // etrafında döndür" tekniği yerine, masaüstü halkasında zaten kanıtlanmış
    // sınırlı-elips tekniğinin yatay/coverflow biçimi kullanılıyor: kartlar
    // ringRot'a göre bir elips üstünde dizilir, öndeki (ringRot'a en yakın)
    // kart en büyük/en net olanıdır. Sürükleme + eylemsizlik fiziği eski
    // koddan birebir taşındı.
    var TURN = 26;           // yan kartların hafif dönmesi (desktop'taki SHOW_TURN'ün küçük hali)
    var DEPTH = 120;
    var DRAG_SPEED = 0.6;

    var INC = 360 / categories.length;
    var ellRx = 120, ringRot = 0, currentRotation = 0, targetRotation = 0, velocity = 0, dragging = false;
    var items = [];
    var selected = null;

    function build() {
      cardsWrap.innerHTML = '';
      items.length = 0;
      categories.forEach(function (cat, i) {
        var w = cat.isHotel ? 104 : 84;
        var h = cat.isHotel ? 70 : 56;

        var el = document.createElement('div');
        el.className = 'mr-item';

        var a = document.createElement('a');
        a.href = cat.link || ('projeler/index.html?kategori=' + cat.id);

        var card = document.createElement('div');
        card.className = 'mr-card' + (cat.isHotel ? ' is-hotel-card' : '');
        card.style.width = w + 'px';
        card.style.height = h + 'px';

        var ph = document.createElement('div');
        ph.className = 'img-ph mr-card-img';
        ph.setAttribute('role', 'img');
        ph.setAttribute('aria-label', 'Corniche İstanbul ' + cat.tr + ' fotoğrafı (yakında)');
        ph.innerHTML = '<span>' + cat.tr + '</span>';

        card.appendChild(ph);
        a.appendChild(card);
        el.appendChild(a);
        cardsWrap.appendChild(el);

        items.push({ el: el, card: card, cat: cat, index: i });
      });
    }

    function geometry() {
      ellRx = Math.max(90, wrap.clientWidth * 0.34);
      items.forEach(function (card) {
        gsap.set(card.el, { xPercent: -50, yPercent: -50 });
      });
    }

    function place() {
      var n = items.length || 1;
      items.forEach(function (card) {
        var angle = card.index * INC + ringRot;
        var rad = angle * RING_DEG;
        var sin = Math.sin(rad), cos = Math.cos(rad);
        var near = (cos + 1) / 2;          // 1 = tam önde, 0 = tam arkada
        gsap.set(card.el, {
          x: sin * ellRx,
          z: (cos - 1) * DEPTH,
          opacity: 0.35 + near * 0.65
        });
        gsap.set(card.card, {
          rotationY: -sin * TURN,
          scale: 0.66 + near * 0.5
        });
      });
    }

    function nearest() {
      var n = items.length || 1;
      var idx = Math.round(-ringRot / INC);
      idx = ((idx % n) + n) % n;
      return items[idx];
    }

    function updatePreview(card) {
      if (mrpCat) mrpCat.textContent = (card.cat.tr || '').toLocaleUpperCase('en-US');
      if (mrpTitle) mrpTitle.textContent = card.cat.tr;
      if (mrpImgSpan) mrpImgSpan.textContent = card.cat.tr;
      if (mrpImgWrap) mrpImgWrap.setAttribute('aria-label', 'Corniche İstanbul ' + card.cat.tr + ' fotoğrafı (yakında)');
      if (mrpView) mrpView.setAttribute('href', card.cat.link || ('projeler/index.html?kategori=' + card.cat.id));
    }

    function updateSelection() {
      var card = nearest();
      if (card === selected) return;
      if (selected) selected.card.classList.remove('is-selected');
      selected = card;
      selected.card.classList.add('is-selected');
      updatePreview(card);
    }

    function tick() {
      if (!dragging) {
        targetRotation += velocity;
        velocity *= 0.92;
        if (Math.abs(velocity) < 0.01) velocity = 0;
      }
      currentRotation += (targetRotation - currentRotation) * 0.18;
      ringRot = currentRotation;
      place();
      updateSelection();
      requestAnimationFrame(tick);
    }

    function initDrag() {
      var lastX = 0;
      hitbox.addEventListener('pointerdown', function (e) {
        dragging = true; velocity = 0; lastX = e.clientX;
        try { hitbox.setPointerCapture(e.pointerId); } catch (err) {}
      });
      hitbox.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        e.preventDefault();
        var dx = e.clientX - lastX; lastX = e.clientX;
        var delta = dx * DRAG_SPEED;
        targetRotation += delta;
        velocity = delta;
      }, { passive: false });
      function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        try { if (hitbox.hasPointerCapture(e.pointerId)) hitbox.releasePointerCapture(e.pointerId); } catch (err) {}
      }
      hitbox.addEventListener('pointerup', endDrag);
      hitbox.addEventListener('pointercancel', endDrag);
    }

    build();
    geometry();
    place();
    initDrag();
    updateSelection();
    requestAnimationFrame(tick);

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { geometry(); place(); }, 150);
    });
  }

  function initHeroRing() {
    // Ana sayfa halkası artık kendi ayrı veri kaynağını kullanıyor (bkz.
    // js/ring-categories.js) — CORNICHE_CATEGORIES'e (projeler sayfası
    // filtrelerini besleyen gerçek taksonomi) dokunulmadı.
    var categories = window.CORNICHE_RING_CATEGORIES || window.CORNICHE_CATEGORIES;
    if (!categories) return;
    var ring = document.querySelector('.hero-ring');
    var mobileSection = document.querySelector('.home-mobile');
    var isMobileNow = window.matchMedia('(max-width: 767px)').matches;

    if (!isMobileNow && ring) {
      initHeroRingDesktop(ring, categories);
    }
    if (isMobileNow && mobileSection && !prefersReducedMotion) {
      initHeroRingMobile(mobileSection, categories);
    }

    // Masaüstü/mobil eşiğini geçen bir pencere boyutu değişikliğinde (nadir,
    // ör. tablet döndürme değil gerçek genişlik sıçraması) sayfayı yeniden
    // yükle — iki ayrı halka motorunu canlı canlı birbirine çevirmek yerine
    // eski koddaki aynı kısayol (location.reload) kullanılıyor.
    var mq = window.matchMedia('(max-width: 767px)');
    var onBreakpointChange = function () { location.reload(); };
    if (mq.addEventListener) mq.addEventListener('change', onBreakpointChange);
    else if (mq.addListener) mq.addListener(onBreakpointChange);
  }

  /* ---------------- proje kategori sekmeleri / ızgara ---------------- */
  function categoryParam() {
    var m = /[?&]kategori=([^&]+)/.exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : 'tumu';
  }

  function initProjectGrid() {
    var grid = document.querySelector('[data-project-grid]');
    if (!grid || !window.CORNICHE_PROJECTS) return;

    var tabs = document.querySelector('.cat-tabs');
    var heading = document.querySelector('[data-grid-heading]');
    var projects = window.CORNICHE_PROJECTS;
    var categories = window.CORNICHE_CATEGORIES || [];

    function catLabel(id) {
      if (id === 'tumu') return 'Tüm Projeler';
      var c = categories.filter(function (x) { return x.id === id; })[0];
      return c ? c.tr : id;
    }

    function render(activeCat) {
      grid.innerHTML = '';
      var list = projects.filter(function (p) {
        if (activeCat === 'tumu') return true;
        return p.category === activeCat;
      });
      if (list.length === 0) {
        var empty = document.createElement('p');
        empty.textContent = activeCat === 'tumu'
          ? 'Henüz proje eklenmedi.'
          : 'Bu kategoriye henüz proje atanmadı. (Kategori bilgisi eklendiğinde burada listelenecek.)';
        grid.appendChild(empty);
        return;
      }
      list.forEach(function (p) {
        var card = document.createElement('article');
        card.className = 'project-card';
        var a = document.createElement('a');
        a.href = 'proje-detay.html?id=' + p.id;

        var photoWrap = document.createElement('div');
        photoWrap.className = 'card-photo ratio-3-2';
        var img = document.createElement('img');
        img.src = '../' + p.cover.src;
        img.alt = 'Corniche İstanbul ' + p.name + ' projesi, ' + p.cover.label;
        img.loading = 'lazy';
        img.width = 800; img.height = 533;
        photoWrap.appendChild(img);

        // "[Kategori]" placeholder satırı kaldırıldı (müşteri geri bildirimi) —
        // kategori verisi henüz atanmadığı için her kartta aynı uydurma metin
        // görünüyordu. Proje adı (h3) tek etiket olarak kalıyor.
        var h3 = document.createElement('h3');
        h3.className = 'card-title';
        h3.textContent = p.name;

        a.appendChild(photoWrap);
        a.appendChild(h3);
        card.appendChild(a);
        grid.appendChild(card);
      });
    }

    var active = categoryParam();
    if (heading) heading.textContent = catLabel(active);

    if (tabs) {
      tabs.querySelectorAll('button').forEach(function (btn) {
        if (btn.getAttribute('data-cat') === active) btn.classList.add('is-active');
        btn.addEventListener('click', function () {
          tabs.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          active = btn.getAttribute('data-cat');
          if (heading) heading.textContent = catLabel(active);
          render(active);
          var url = new URL(window.location.href);
          url.searchParams.set('kategori', active);
          window.history.replaceState(null, '', url);
        });
      });
    }

    render(active);
  }

  /* ---------------- proje detay sayfası ---------------- */
  function qParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function initProjectDetail() {
    var root = document.querySelector('[data-project-detail]');
    if (!root || !window.CORNICHE_PROJECTS) return;
    var id = qParam('id');
    var projects = window.CORNICHE_PROJECTS;
    var project = projects.filter(function (p) { return p.id === id; })[0] || projects[0];
    if (!project) return;

    document.title = 'Corniche İstanbul — ' + project.name;

    var catLabelEl = root.querySelector('[data-f-category]');
    var titleEl = root.querySelector('[data-f-title]');
    var storyEl = root.querySelector('[data-f-story]');
    var heroEl = root.querySelector('[data-f-hero]');
    var categories = window.CORNICHE_CATEGORIES || [];
    var catObj = categories.filter(function (c) { return c.id === project.category; })[0];

    if (catLabelEl) catLabelEl.textContent = catObj ? catObj.tr.toUpperCase() : '[Kategori]';
    if (titleEl) titleEl.textContent = project.name;
    if (storyEl) storyEl.textContent = '[Proje hikâyesi — ihtiyaç, çözüm ve sonuç metni eklenecek]';

    if (heroEl) {
      heroEl.innerHTML = '<img src="../' + project.cover.src + '" alt="Corniche İstanbul ' + project.name + ' projesi, ' + project.cover.label + '" loading="eager" fetchpriority="high" width="1280" height="600" style="width:100%;height:100%;object-fit:cover;">';
    }

    var rows = [
      { key: 'location', label: 'Konum', val: project.location },
      { key: 'year', label: 'Yıl', val: project.year },
      { key: 'scope', label: 'Kapsam', val: project.scope }
    ];
    var infoRowsWrap = root.querySelector('[data-f-inforows]');
    if (infoRowsWrap) {
      rows.forEach(function (r) {
        if (!r.val) return; // bilgi yoksa satır gösterilmez
        var row = document.createElement('div');
        row.className = 'info-row';
        row.innerHTML = '<span class="label">' + r.label + '</span><span class="value">' + r.val + '</span>';
        infoRowsWrap.appendChild(row);
      });
    }

    // galeri
    var galleryGrid = root.querySelector('[data-f-gallery]');
    var lightboxImgs = [];
    if (galleryGrid) {
      project.gallery.forEach(function (g, idx) {
        var fig = document.createElement('div');
        fig.className = 'img-ph-wrap';
        var img = document.createElement('img');
        img.src = '../' + g.src;
        img.alt = 'Corniche İstanbul ' + project.name + ' projesi, ' + g.label;
        img.loading = idx < 2 ? 'eager' : 'lazy';
        img.setAttribute('data-lightbox-idx', idx);
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;cursor:zoom-in;aspect-ratio:3/2;';
        fig.appendChild(img);
        galleryGrid.appendChild(fig);
        lightboxImgs.push('../' + g.src);
      });
    }

    // süreç / öncesi-sonrası
    var processWrap = root.querySelector('[data-f-process]');
    if (processWrap) {
      if (project.category === 'yenileme') {
        processWrap.closest('.detail-process').querySelector('h2').textContent = 'Öncesi / Sonrası';
        processWrap.className = 'before-after';
        processWrap.innerHTML =
          '<figure><figcaption>Öncesi</figcaption><div class="img-ph ratio-3-2" role="img" aria-label="Öncesi fotoğrafı (yakında)"></div></figure>' +
          '<figure><figcaption>Sonrası</figcaption><div class="img-ph ratio-3-2" role="img" aria-label="Sonrası fotoğrafı (yakında)"></div></figure>';
      } else {
        processWrap.innerHTML = '<p>[Şantiye / yapım aşaması fotoğrafları eklenecek]</p>';
      }
    }

    // diğer projeler (aynı kategoriden, kategori henüz atanmadıysa boş liste)
    var relatedWrap = root.querySelector('[data-f-related]');
    if (relatedWrap) {
      var related = projects.filter(function (p) {
        return p.id !== project.id && project.category && p.category === project.category;
      }).slice(0, 3);
      if (related.length === 0) {
        relatedWrap.closest('.detail-related').style.display = 'none';
      } else {
        related.forEach(function (p) {
          var card = document.createElement('article');
          card.className = 'project-card';
          card.innerHTML = '<a href="proje-detay.html?id=' + p.id + '">' +
            '<div class="card-photo ratio-3-2"><img src="../' + p.cover.src + '" alt="Corniche İstanbul ' + p.name + ' projesi" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div>' +
            '<span class="small-label">' + (catObj ? catObj.tr : '[Kategori]') + '</span>' +
            '<h3 class="card-title">' + p.name + '</h3></a>';
          relatedWrap.appendChild(card);
        });
      }
    }

    // lightbox
    var lightbox = document.querySelector('.lightbox');
    if (lightbox && lightboxImgs.length) {
      var lbImg = lightbox.querySelector('img');
      var curIdx = 0;
      function show(i) {
        curIdx = (i + lightboxImgs.length) % lightboxImgs.length;
        lbImg.src = lightboxImgs[curIdx];
      }
      galleryGrid.addEventListener('click', function (e) {
        var t = e.target;
        if (t.tagName === 'IMG') {
          show(parseInt(t.getAttribute('data-lightbox-idx'), 10));
          lightbox.classList.add('is-open');
        }
      });
      lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
        lightbox.classList.remove('is-open');
      });
      lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(curIdx - 1); });
      lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(curIdx + 1); });
      document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') lightbox.classList.remove('is-open');
        if (e.key === 'ArrowLeft') show(curIdx - 1);
        if (e.key === 'ArrowRight') show(curIdx + 1);
      });
    }
  }

  /* ---------------- koleksiyon alt sayfa ürün ızgarası ---------------- */
  function initProductGrid() {
    var grid = document.querySelector('[data-product-grid]');
    if (!grid || !window.CORNICHE_COLLECTION) return;
    var catId = grid.getAttribute('data-product-grid');
    var cat = window.CORNICHE_COLLECTION.filter(function (c) { return c.id === catId; })[0];
    if (!cat) return;

    if (!cat.hasPhotos || cat.products.length === 0) {
      for (var i = 0; i < 6; i++) {
        var card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = '<div class="img-ph ratio-4-5" role="img" aria-label="Ürün fotoğrafı (yakında)"></div>' +
          '<h3 class="product-name">[Ürün adı]</h3>' +
          '<a class="product-info-link" href="https://wa.me/905452822609" target="_blank" rel="noopener">Bilgi al</a>';
        grid.appendChild(card);
      }
      return;
    }

    cat.products.forEach(function (p) {
      var card = document.createElement('article');
      card.className = 'product-card';
      var imgWrap = document.createElement('div');
      imgWrap.className = 'ratio-4-5';
      var img = document.createElement('img');
      img.src = '../' + p.src;
      img.alt = 'Corniche İstanbul Koleksiyon, ' + cat.tr + ' ürünü';
      img.loading = 'lazy';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      imgWrap.appendChild(img);

      var h3 = document.createElement('h3');
      h3.className = 'product-name';
      h3.textContent = p.name;

      var a = document.createElement('a');
      a.className = 'product-info-link';
      a.href = p.whatsapp;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Bilgi al';

      card.appendChild(imgWrap);
      card.appendChild(h3);
      card.appendChild(a);
      grid.appendChild(card);
    });
  }

  function initCollectionHome() {
    var wrap = document.querySelector('[data-collection-home]');
    if (!wrap || !window.CORNICHE_COLLECTION) return;
    window.CORNICHE_COLLECTION.forEach(function (cat) {
      var cardImg = wrap.querySelector('[data-cover="' + cat.id + '"]');
      if (!cardImg) return;
      if (cat.hasPhotos && cat.products.length) {
        cardImg.innerHTML = '<img src="../' + cat.products[0].src + '" alt="Corniche İstanbul Koleksiyon, ' + cat.tr + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;">';
      }
    });
  }

  /* ---------------- iletişim formu ---------------- */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var kvkk = form.querySelector('input[type="checkbox"]');
      if (kvkk && !kvkk.checked) {
        alert('Devam etmek için KVKK Aydınlatma Metni onayı gerekiyor.');
        return;
      }
      alert('Mesajınız alındı. En kısa sürede dönüş yapacağız.\n\n(Not: form gönderimi şu an bir sunucuya bağlı değil — backend/CRM entegrasyonu sonraki aşamada eklenecek.)');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileMenu();
    initActiveNav();
    initLangSwitch();
    initHeroRing();
    initCollectionHome();
    initProductGrid();
    initProjectGrid();
    initProjectDetail();
    initContactForm();
  });
})();
