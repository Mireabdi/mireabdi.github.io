// Shared behavior for all pages: theme toggle + footer copyright year.
// The anti-flash theme bootstrap (reading localStorage and setting
// data-theme before first paint) stays as a tiny inline <script> in
// each page's <head> on purpose -- it must run synchronously before
// CSS paints, before this deferred file has a chance to load.
(function () {
  "use strict";

  function setCopyrightYear() {
    var yearEl = document.getElementById("copyright-year");
    if (!yearEl) return;
    yearEl.textContent = "© " + new Date().getFullYear() + " Abdi Mire";
  }

  function initThemeToggle() {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);

      try {
        localStorage.setItem("mireSite.theme", next);
      } catch (e) {
        /* localStorage unavailable (private mode, etc.) -- ignore */
      }

      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "dark" ? "#15181d" : "#f1f2f4");
    });
  }

  setCopyrightYear();
  initThemeToggle();
})();
