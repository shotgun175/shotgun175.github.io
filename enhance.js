/* Lost Ark Tools — optional progressive enhancement: scroll-reveal.
 *
 * The page is fully usable without this file. Every tile is visible by default;
 * an inline <head> script flips <html> from .no-js to .js before first paint, and
 * the stylesheet only pre-hides [data-reveal] elements under `.js` + no
 * reduced-motion preference. So with JS disabled — or reduced motion requested —
 * nothing is ever hidden. No dependencies, no tracking.
 */
(function () {
  "use strict";

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
})();
