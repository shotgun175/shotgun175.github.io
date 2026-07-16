/* Lost Ark Tools — optional progressive enhancement: scroll-reveal.
 *
 * Loaded as a small parser-blocking <head> script so the class stamp below
 * lands before first paint. The page is fully usable without this file:
 * styles.css only pre-hides [data-reveal] elements under `.reveal-ready` (plus
 * no reduced-motion preference), and that class exists only if this script
 * executed. So with JS disabled, this file blocked or failed, or reduced
 * motion requested, nothing is ever hidden. No dependencies, no tracking.
 */
(function () {
  "use strict";

  // The contract with styles.css: pre-hiding is earned, not assumed. Stamping
  // this class (before first paint) proves the reveal code is present.
  document.documentElement.classList.add("reveal-ready");

  function init() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    function revealAll() {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }

    // Respect reduced motion and older browsers: just show everything at once.
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  // Running in <head>, the DOM is not parsed yet; the readyState guard keeps
  // this correct even if the script tag is ever moved or deferred.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
