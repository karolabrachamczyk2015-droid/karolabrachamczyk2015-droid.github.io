(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !nav.classList.contains("is-open");
      setNavOpen(open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNavOpen(false);
    });

    document.addEventListener(
      "click",
      function (e) {
        if (!document.body.classList.contains("nav-open")) return;
        if (nav.contains(e.target) || toggle.contains(e.target)) return;
        setNavOpen(false);
      },
      true
    );
  }

  function pathKey(url) {
    var p = url.pathname;
    if (!p || p === "/") return "/";
    var lower = p.toLowerCase();
    if (lower === "/index.html" || lower.endsWith("/index.html")) {
      var base = p.slice(0, -10);
      return !base || base === "/" ? "/" : base.replace(/\/$/, "") || "/";
    }
    return p.replace(/\/$/, "") || "/";
  }

  function sameDocumentUrl(dest, here) {
    if (dest.origin !== here.origin) return false;
    return pathKey(dest) === pathKey(here) && dest.search === here.search;
  }

  /* Fade-in on scroll */
  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Page transition before internal navigation */
  if (!prefersReduced) {
    document.querySelectorAll('a[href$=".html"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = anchor.getAttribute("href");
        if (!href || href.indexOf("#") === 0) return;
        if (anchor.target && anchor.target !== "_self") return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

        var dest;
        var here;
        try {
          dest = new URL(href, window.location.href);
          here = new URL(window.location.href);
        } catch (err) {
          return;
        }

        if (dest.origin !== here.origin) return;
        if (sameDocumentUrl(dest, here)) return;

        e.preventDefault();
        document.body.classList.remove("page-enter");
        document.body.classList.add("page-exit");

        window.setTimeout(function () {
          window.location.href = href;
        }, 300);
      });
    });
  }
})();
