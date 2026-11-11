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

  /* ---------------- ANA SAYFA HALKASI (desktop + tablet) ---------------- */
  function initHeroRing() {
    var ring = document.querySelector('.hero-ring');
    if (!ring || !window.CORNICHE_CATEGORIES) return;

    var cardsWrap = ring.querySelector('.ring-cards');
    var categories = window.CORNICHE_CATEGORIES;
    var cards = [];

    categories.forEach(function (cat) {
      var card = document.createElement('div');
      card.className = 'ring-card ' + (cat.isHotel ? 'is-hotel ' : '') +
        (cat.labelPos === 'above' ? 'label-above' : 'label-below');
      card.setAttribute('data-cat', cat.id);

      var a = document.createElement('a');
      a.href = 'projeler/index.html?kategori=' + cat.id;

      var inner = document.createElement('div');
      inner.className = 'ring-card-inner';

      var img = document.createElement('div');
      img.className = 'img-ph ring-card-img';
      img.setAttribute('role', 'img');
      img.setAttribute('aria-label', 'Corniche İstanbul ' + cat.tr + ' fotoğrafı (yakında)');
      img.innerHTML = '<span>' + cat.tr + '</span>';

      inner.appendChild(img);
      a.appendChild(inner);
      card.appendChild(a);

      var label = document.createElement('span');
      label.className = 'ring-card-label';
      label.textContent = cat.tr;
      card.appendChild(label);

      cardsWrap.appendChild(card);
      cards.push({ el: card, inner: inner, cat: cat });
    });

    var isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;

    function applySizes() {
      isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      cards.forEach(function (c) {
        var w = c.cat.w, h = c.cat.h;
        if (isTablet) {
          w = c.cat.isHotel ? 170 : 140;
          h = c.cat.isHotel ? 113 : 93;
        }
        c.inner.style.width = w + 'px';
        c.inner.style.height = h + 'px';
      });
    }
    applySizes();

    var ellipse = ring.querySelector('.ring-ellipse');

    function layout(offsetDeg) {
      var rect = ellipse.getBoundingClientRect();
      var rx = rect.width / 2;
      var ry = rect.height / 2;
      cards.forEach(function (c) {
        var rad = (c.cat.angle + offsetDeg) * Math.PI / 180;
        var dx = rx * Math.cos(rad);
        var dy = ry * Math.sin(rad);
        c.el.style.left = 'calc(50% + ' + dx.toFixed(1) + 'px)';
        c.el.style.top = 'calc(55% + ' + dy.toFixed(1) + 'px)';
        c.el.style.transform = 'translate(-50%, -50%)';
      });
    }

    window.addEventListener('resize', function () {
      applySizes();
      layout(currentOffset);
    });

    var currentOffset = 0;
    layout(0);

    if (prefersReducedMotion) return;

    var isPaused = false;
    ring.addEventListener('mouseenter', function () { isPaused = true; });
    ring.addEventListener('mouseleave', function () { isPaused = false; });

    var lastTs = null;
    var DURATION = 60000; // 60s tam tur
    function tick(ts) {
      if (lastTs === null) lastTs = ts;
      var delta = ts - lastTs;
      lastTs = ts;
      if (!isPaused) {
        currentOffset = (currentOffset + (delta / DURATION) * 360) % 360;
        layout(currentOffset);
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- ANA SAYFA — mobil kategori satırı ---------------- */
  function initMobileFeatured() {
    var row = document.querySelector('.category-row');
    if (!row || !window.CORNICHE_CATEGORIES) return;
    var categories = window.CORNICHE_CATEGORIES;
    var label = document.querySelector('.featured-project .small-label');
    var title = document.querySelector('.featured-project .featured-title');
    var photo = document.querySelector('.featured-project .featured-photo');
    var exploreLink = document.querySelector('.featured-project .explore-link');

    row.querySelectorAll('button[data-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        row.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var catId = btn.getAttribute('data-cat');
        var cat = categories.filter(function (c) { return c.id === catId; })[0];
        if (!cat) return;
        if (photo) photo.style.opacity = '0';
        setTimeout(function () {
          if (label) label.textContent = (cat.tr + ' PROJESİ').toUpperCase();
          if (title) title.textContent = '[' + cat.tr + ' örnek proje adı]';
          if (exploreLink) exploreLink.setAttribute('href', 'projeler/index.html?kategori=' + cat.id);
          if (photo) {
            photo.innerHTML = '<div class="img-ph ratio-16-10" role="img" aria-label="Corniche İstanbul ' + cat.tr + ' öne çıkan proje fotoğrafı (yakında)"><span>' + cat.tr + '</span></div>';
            photo.style.opacity = '1';
          }
        }, 250);
      });
    });
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
    initMobileFeatured();
    initCollectionHome();
    initProductGrid();
    initProjectGrid();
    initProjectDetail();
    initContactForm();
  });
})();
