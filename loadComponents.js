// loadComponents.js
// Loads header/footer/theme toggle and wires the navigation.
// Safe to include once per page; every handler is bound exactly once.
(function () {
  "use strict";
  if (window.__alsaniaComponents) return;
  window.__alsaniaComponents = true;

  var MOBILE_MAX = 960; // keep in sync with assets/css/components.css
  var THEME_KEY = "alsania-theme";

  // Fallback copies of components/header.html and components/footer.html
  // (used when /components/* cannot be fetched, e.g. file:// previews).
  var INLINE_COMPONENTS = {
  "header": "<header class=\"alsania-header\">\n  <div class=\"nav-container\">\n    <a href=\"/\" class=\"alsania-logo\">\n      <div class=\"logo-container\">\n        <span class=\"logo-text\">ALSANIA I/O</span>\n      </div>\n    </a>\n    <nav class=\"alsania-nav\">\n      <ul>\n        <li><a href=\"/\" class=\"nav-link\">Home</a></li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"nav-link dropdown-toggle\">Products <span class=\"arrow\">▾</span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"/tools/nyx/\">Nyx Extension</a></li>\n            <li><a href=\"/tools/nyx-mobile/\">Nyx Mobile</a></li>\n            <li><a href=\"/tools/devconx/\">DevConX (VSCode)</a></li>\n            <li><a href=\"/tools/scrypgen/\">ScrypGen</a></li>\n            <li><a href=\"/tools/nyx-unified/\">Nyx Unified</a></li>\n          </ul>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"nav-link dropdown-toggle\">Ecosystem <span class=\"arrow\">▾</span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"/rep/\">Agent Registry</a></li>\n            <li><a href=\"/rating/\">Rate Agents</a></li>\n            <li><a href=\"/claim/\">Alsa Faucet</a></li>\n            <li><a href=\"/hilo/\">Hi-Lo Game</a></li>\n            <li><a href=\"/crash/\">Crash</a></li>\n            <li><a href=\"/dreamai/\">DreamAI Mint</a></li>\n            <li><a href=\"/character-chat/\">Character Chats</a></li>\n            <li><a href=\"/aed/\">AED</a></li>\n          </ul>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"nav-link dropdown-toggle\">Community <span class=\"arrow\">▾</span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"/about/\">About</a></li>\n            <li><a href=\"/story/\">Book of Alsania</a></li>\n            <li><a href=\"/blog/\">Blog</a></li>\n            <li><a href=\"/contribute/\">Contribute</a></li>\n            <li><a href=\"/donate/\">Donate</a></li>\n          </ul>\n        </li>\n        <li><a href=\"/shop/\" class=\"nav-link\">Merch</a></li>\n        <li><a href=\"/services/\" class=\"nav-link\">Services</a></li>\n        <li><a href=\"/contact/\" class=\"nav-link\">Contact</a></li>\n      </ul>\n    </nav>\n    <div class=\"header-right\">\n      <div id=\"theme-toggle-container\"></div>\n      <button class=\"mobile-menu\" type=\"button\" aria-label=\"Menu\" aria-expanded=\"false\"><span></span><span></span><span></span></button>\n    </div>\n  </div>\n</header>",
  "footer": "<footer class=\"footer\">\n  <div class=\"footer-container\">\n    <div class=\"footer-grid\">\n      <div class=\"footer-section\">\n        <h3>Alsania I/O</h3>\n        <p>\n          Sovereign technology ecosystem. Built for creators, owned by no one,\n          open to everyone.\n        </p>\n        <div class=\"social-links\">\n          <a href=\"https://github.com/alsania-io\" title=\"GitHub\" target=\"_blank\" rel=\"noopener\"><img\n              src=\"/assets/img/web-icons/github-icon.svg\" alt=\"GitHub\" /></a>\n          <a href=\"https://x.com/sigmasauer07\" title=\"X\" target=\"_blank\" rel=\"noopener\"><img\n              src=\"/assets/img/web-icons/x-icon.svg\" alt=\"X\" /></a>\n          <a href=\"https://t.me/Alsania_io\" title=\"Telegram\" target=\"_blank\" rel=\"noopener\"><img\n              src=\"/assets/img/web-icons/telegram-icon.svg\" alt=\"Telegram\" /></a>\n          <a href=\"https://discord.gg/SaCTgSHqdv\" title=\"Discord\" target=\"_blank\" rel=\"noopener\"><img\n              src=\"/assets/img/web-icons/discord-icon.svg\" alt=\"Discord\" /></a>\n        </div>\n      </div>\n      <div class=\"footer-section\">\n        <h3>Live Projects</h3>\n        <ul>\n          <li><a href=\"/tools/nyx/\">Nyx Extension</a></li>\n          <li><a href=\"/tools/nyx-mobile/\">Nyx Mobile</a></li>\n          <li><a href=\"/character-chat/\">Character Chats</a></li>\n          <li><a href=\"/shop/\">Official Merch</a></li>\n          <li><a href=\"/story\">Book of Alsania</a></li>\n          <li><a href=\"/claim\">Faucet</a></li>\n          <li><a href=\"/hilo/\">Hi-Lo Game</a></li>\n          <li><a href=\"/crash/\">Crash</a></li>\n        </ul>\n      </div>\n      <div class=\"footer-section\">\n        <h3>Coming Soon</h3>\n        <ul>\n          <li><a href=\"/tools/devconx/\">DevConX (VSCode)</a></li>\n          <li><a href=\"/tools/scrypgen/\">ScrypGen</a></li>\n          <li><a href=\"/tools/nyx-unified/\">Nyx Unified</a></li>\n          <li><a href=\"/services/\">Services</a></li>\n          <li><a href=\"/aed/\">AED</a></li>\n        </ul>\n      </div>\n      <div class=\"footer-section\">\n        <h3>Legal</h3>\n        <ul>\n          <li><a href=\"/legal/privacy-policy.html\">Privacy Policy</a></li>\n          <li><a href=\"/legal/cookie-policy.html\">Cookie Policy</a></li>\n          <li><a href=\"/legal/terms.html\">Terms of Service</a></li>\n          <li><a href=\"/legal/disclaimer.html\">Disclaimer</a></li>\n          <li><a href=\"/legal/refund-policy.html\">Refund Policy</a></li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"footer-bottom\">\n      <p>© 2026 Alsania I/O. All rights reserved. Built with purpose.</p>\n    </div>\n  </div>\n</footer>"
};

  function qs(sel) { return document.querySelector(sel); }

  function fetchComponent(name) {
    return fetch("/components/" + name + ".html", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); });
  }

  function loadComponent(containerId, name) {
    var el = document.getElementById(containerId);
    if (!el) return Promise.resolve(null);
    return fetchComponent(name)
      .catch(function () { return INLINE_COMPONENTS[name] || ""; })
      .then(function (html) { el.innerHTML = html; return el; });
  }
  window.loadComponent = loadComponent;

  /* ---------- theme ---------- */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function applyTheme(t) { document.documentElement.setAttribute("data-theme", t); }
  try { var saved = localStorage.getItem(THEME_KEY); if (saved === "light" || saved === "dark") applyTheme(saved); } catch (e) {}

  function initThemeToggle() {
    var holder = document.getElementById("theme-toggle-container");
    if (!holder || holder.firstElementChild) return Promise.resolve();
    return fetchComponent("theme-toggle").then(function (html) {
      holder.innerHTML = html;
      var cb = document.getElementById("theme-toggle");
      if (!cb) return;
      cb.checked = currentTheme() === "light";
      cb.addEventListener("change", function () {
        var t = cb.checked ? "light" : "dark";
        applyTheme(t);
        try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
      });
    }).catch(function () { /* toggle is optional */ });
  }

  /* ---------- navigation (event delegation: bound once, works whenever the header appears) ---------- */
  function nav() { return qs(".alsania-nav"); }
  function burger() { return qs(".mobile-menu"); }

  function closeDropdowns(except) {
    var open = document.querySelectorAll(".alsania-nav .dropdown-menu.open");
    for (var i = 0; i < open.length; i++) {
      if (open[i] === except) continue;
      open[i].classList.remove("open");
      var t = open[i].parentElement && open[i].parentElement.querySelector(".dropdown-toggle");
      if (t) t.setAttribute("aria-expanded", "false");
    }
  }

  function setMenu(isOpen) {
    var n = nav(), b = burger();
    if (n) n.classList.toggle("active", isOpen);
    if (b) { b.classList.toggle("active", isOpen); b.setAttribute("aria-expanded", isOpen ? "true" : "false"); }
    if (!isOpen) closeDropdowns();
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var b = t.closest(".mobile-menu");
    if (b) {
      e.preventDefault();
      var n = nav();
      setMenu(!(n && n.classList.contains("active")));
      return;
    }

    var toggle = t.closest(".alsania-nav .dropdown-toggle");
    if (toggle) {
      e.preventDefault(); // href="#" must never jump the page to the top
      var li = toggle.closest(".dropdown");
      var menu = li && li.querySelector(".dropdown-menu");
      if (!menu) return;
      var willOpen = !menu.classList.contains("open");
      closeDropdowns(menu);
      menu.classList.toggle("open", willOpen);
      toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
      return;
    }

    if (t.closest(".alsania-nav a[href]")) { setMenu(false); return; }
    if (!t.closest(".alsania-nav")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > MOBILE_MAX) setMenu(false);
  });

  /* ---------- boot ---------- */
  function init() {
    loadComponent("header-container", "header")
      .then(initThemeToggle)
      .then(function () { return loadComponent("footer-container", "footer"); })
      .catch(function (err) { console.error("[Components]", err); });
    // Pages with a hard-coded header (index.html) still get the toggle.
    if (!document.getElementById("header-container")) initThemeToggle();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
