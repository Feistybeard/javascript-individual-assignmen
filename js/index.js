import { allEl, allPlanetsEl, showMoreInfo } from "./modules/helpers.js";

allEl.overlay.closeBtn.addEventListener('click', () => {
  allEl.overlay.root.classList.toggle('show');
});

for (const planetEl of allPlanetsEl) {
  planetEl.addEventListener('click', showMoreInfo);
}

