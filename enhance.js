/* Lost Ark Tools — optional progressive enhancement.
 *
 * The page is fully usable without this file: every card is visible and the
 * filter toolbar stays hidden. When JS runs, we reveal the toolbar and let
 * visitors filter cards by their data-kind. No dependencies, no tracking.
 */
(function () {
  "use strict";

  var toolbar = document.querySelector(".toolbar");
  var grid = document.querySelector(".card-grid");
  if (!toolbar || !grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var chips = Array.prototype.slice.call(toolbar.querySelectorAll(".chip[data-filter]"));
  var status = document.querySelector("[data-result-count]");
  if (!cards.length || !chips.length) return;

  // Reveal the control now that it can actually do something.
  toolbar.removeAttribute("hidden");

  function announce(visible, filter) {
    if (!status) return;
    var label = filter === "all" ? "all tools" : filter + " tools";
    status.textContent = "Showing " + visible + " " + label + ".";
  }

  function applyFilter(filter) {
    var visible = 0;
    cards.forEach(function (card) {
      var match = filter === "all" || card.getAttribute("data-kind") === filter;
      card.hidden = !match;
      if (match) visible++;
    });
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", chip.getAttribute("data-filter") === filter ? "true" : "false");
    });
    announce(visible, filter);
  }

  toolbar.addEventListener("click", function (event) {
    var chip = event.target.closest(".chip[data-filter]");
    if (!chip) return;
    applyFilter(chip.getAttribute("data-filter"));
  });
})();
