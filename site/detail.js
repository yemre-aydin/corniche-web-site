// Project detail pages.
//
// Each page is generated from projects.json and already carries both languages
// in the markup, so there is nothing to fetch and nothing to wait for. This only
// swaps which one is showing and remembers the choice, using the same key as the
// archive so the two stay in step.

(function () {
  const LANG_KEY = "corniche-lang";

  const STRINGS = {
    tr: {
      back: "Arşive dön",
      prev: "Önceki proje",
      next: "Sonraki proje",
    },
    en: {
      back: "Back to archive",
      prev: "Previous project",
      next: "Next project",
    },
  };

  let lang = "tr";

  function applyLang(next) {
    lang = next === "en" ? "en" : "tr";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.tr[key] || key;
    });

    // Content that was written into the page in both languages.
    document.querySelectorAll("[data-tr][data-en]").forEach((el) => {
      el.textContent = el.dataset[lang] || el.dataset.tr || "";
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const on = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });

    const heading = document.querySelector(".dp-title");
    if (heading) document.title = `${heading.textContent} — Corniche İstanbul`;

    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {
      /* private window, blocked storage: the page still reads correctly */
    }
  }

  function init() {
    let saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (_) {}

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.lang !== lang) applyLang(btn.dataset.lang);
      });
    });

    applyLang(saved === "en" ? "en" : "tr");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
