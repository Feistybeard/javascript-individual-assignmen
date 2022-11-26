import { planetsData } from "../modules/api.js";
const allEl = {
  mainSection: document.querySelector('.main'),
  planetsList: document.querySelector('.main__planets'),
  overlay: {
    root: document.querySelector('.overlay'),
    overlayContent: document.querySelector('.overlay__content'),
    closeBtn: document.querySelector('.overlay__close-btn'),
    planetName: document.querySelector('.planet-name'),
    planetLatinName: document.querySelector('.planet-latin-name'),
    planetDescription: document.querySelector('.planet-description'),
  }
}

function htmlFromTemplate(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

function createPlanets(planets) {
	for (const planet of planets) {
    createPlanet(planet);
	};
  
  const allPlanetsEl = document.querySelectorAll('.main__planet');
  return allPlanetsEl;
}

function createPlanet(planet) {
  const planetEl = htmlFromTemplate(`
    <li class='main__planet' data-id=${planet.id}>
      <h2 class='main__planet-name'>${planet.name}</h2>
    </li>
  `);
  
  allEl.planetsList.appendChild(planetEl);
}

function showMoreInfo(planet) {
  const id = planet.currentTarget.dataset.id;
  console.log(planetsData[id]);
  allEl.overlay.planetName.innerText = planetsData[id].name
  allEl.overlay.planetLatinName.innerText = planetsData[id].latinName;
  allEl.overlay.planetDescription.innerText = planetsData[id].desc;

  allEl.overlay.root.classList.toggle('show');
}

const allPlanetsEl = createPlanets(planetsData);

export { allEl, showMoreInfo, allPlanetsEl }