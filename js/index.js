// Här skapas alla eventlisteners för alla planeter och stäng knappen för overlay:n
// samt 'kickar' igång sidan när import av helpers modulen sker
import { allEl, showMoreInfo } from "./modules/helpers.js";

allEl.overlay.closeBtn.addEventListener('click', () => {
  allEl.overlay.root.classList.toggle('show');
});

for (const planetEl of allEl.getAllPlanets()) {
  planetEl.addEventListener('click', showMoreInfo);
}