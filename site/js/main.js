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

  /* ---------------- mobil menü paneli ---------------- */
  function initMobileMenu() {
    var burger = document.querySelector('.menu-burger');
    var panel = document.querySelector('.menu-panel');
    var closeBtn = document.querySelector('.menu-panel-close');
    if (!burger || !panel) return;

    function open() {
      panel.classList.add('is-open');
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
    }
    function close() {
      panel.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
    burger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    var collapsibles = panel.querySelectorAll('[data-toggle-sub]');
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
     ANA SAYFA HALKASI — eski GSAP + ScrollTrigger mekaniğinin taşınmış
     hâli (bkz. git geçmişi 4150e09, site/script.js "Showcase ring" ve
     "mobile ring" bölümleri). Masaüstü/tablet tarafı kavisli, dilimli
     kartlardan oluşan, sayfa kaydırıldıkça dönen bir halka; mobil
     tarafı dokunup sürükleyerek döndürülen düz kartlı küçük bir
     atlıkarınca. İkisi de aynı 6 kategoriyi (window.CORNICHE_CATEGORIES)
     kullanır; tıklanan/seçilen kart projeler/index.html?kategori=X'e
     götürür — kategori içinde proje listesine "girme" (eski koddaki
     categories→projects seviyesi) ana sayfada yok, o iş zaten
     projeler/ sayfasında yapılıyor.
     ================================================================ */

  var RING_DEG = Math.PI / 180;

  /* ---- masaüstü / tablet: kavisli, dilimli, ScrollTrigger'lı halka ---- */
  function initHeroRingDesktop(ring, categories) {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    var scene = ring.querySelector('.ring-scene');
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
    var HOVER_LIFT = 14, HOVER_SCALE = 1.05;
    var PARALLAX = 4;
    var ARC_STEPS = 1440;

    var isTabletNow = false;
    var showRx = 640, showRy = 190;
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
      isTabletNow = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      showRx = Math.min(vw * 0.39, 700);
      // Eski versiyonda merkezde sadece bir metin logosu vardı; burada gerçek
      // logo görseli + etiket cümlesi daha fazla dikey yer kaplıyor, o yüzden
      // kartların üst/alt noktalarının onunla çakışmaması için dikey yarıçap
      // eski orandan (vh*0.205) biraz büyütüldü.
      showRy = Math.min(vh * 0.27, 260);
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
        el.href = 'projeler/index.html?kategori=' + cat.id;
        el.style.width = w + 'px';
        el.style.height = h + 'px';

        var cardEl = document.createElement('div');
        cardEl.className = 'ring-card3d';

        var face = document.createElement('div');
        face.className = 'ring-face';
        face.style.transform = 'translateZ(' + (-CURVE_R) + 'px)';
        for (var s = 0; s < SEGMENTS; s++) {
          var seg = document.createElement('div');
          seg.className = 'ring-seg';
          seg.style.width = (segW + 1) + 'px';
          seg.style.marginLeft = (-(segW + 1) / 2) + 'px';
          seg.style.left = '50%';
          var segAngle = (s - (SEGMENTS - 1) / 2) * step;
          seg.style.transform = 'rotateY(' + segAngle + 'deg) translateZ(' + CURVE_R + 'px)';
          var shade = 0.9 + 0.1 * Math.cos(segAngle * RING_DEG);
          seg.style.filter = 'brightness(' + shade.toFixed(3) + ')';
          face.appendChild(seg);
        }
        cardEl.appendChild(face);

        var label = document.createElement('span');
        label.className = 'ring-label';
        label.textContent = (cat.tr || '').toLocaleUpperCase('en-US');

        el.appendChild(cardEl);
        el.appendChild(label);
        gallery.appendChild(el);

        items.push({ el: el, cardEl: cardEl, label: label, cat: cat, w: w, h: h });
      });
    }

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
      });
    }

    function setPreview(card) {
      if (!centerWrap) return;
      if (previewCat) previewCat.textContent = (card.cat.tr || '').toLocaleUpperCase('en-US');
      if (previewTitle) previewTitle.textContent = card.cat.tr;
      if (previewLink) previewLink.setAttribute('href', 'projeler/index.html?kategori=' + card.cat.id);
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
      hovered = card;
      place();
      if (card) setPreview(card); else clearPreview();
    });
    scene.addEventListener('pointerleave', function () {
      if (!hovered) return;
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

    function initScroll() {
      ScrollTrigger.create({
        trigger: ring,
        start: 'top top',
        end: '+=140%',
        pin: true,
        pinSpacing: true,
        scrub: 1.4,
        onUpdate: function (self) { ringRot = self.progress * 360; place(); }
      });
    }

    geometry();
    build();
    place();

    if (!prefersReducedMotion) {
      initScroll();
      initParallax();
    }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        geometry();
        build();
        place();
        if (window.ScrollTrigger) ScrollTrigger.refresh();
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
        a.href = 'projeler/index.html?kategori=' + cat.id;

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
      if (mrpView) mrpView.setAttribute('href', 'projeler/index.html?kategori=' + card.cat.id);
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
    if (!window.CORNICHE_CATEGORIES) return;
    var categories = window.CORNICHE_CATEGORIES;
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

        var small = document.createElement('span');
        small.className = 'small-label';
        small.textContent = p.category ? catLabel(p.category) : '[Kategori]';

        var h3 = document.createElement('h3');
        h3.className = 'card-title';
        h3.textContent = p.name;

        a.appendChild(photoWrap);
        a.appendChild(small);
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
