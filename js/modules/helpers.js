// Denna modul innehåller allt som behövs för att bygga sidan genom html och css injektering i 
// DOM:en, allt ifrån queryselectors till att skapa planeterna osv.
// Datan för planeterna hämtas från api modulen och sedan exporteras allEl och showMoreInfo() för att dem behövs i index.js

import { planetsData } from "../modules/api.js";
const planetProps = {
  colors: ['#FFD029', '#888888', '#E7CDCD', '#428ED5', '#EF5F5F', '#E29468', '#C7AA72', '#C9D4F1', '#7A91A7'],
  size: ['600px', '14px', '26px', '28px', '14px', '188px', '144px', '66px', '66px']
};
const allEl = {
  loading: document.querySelector('.loading'),
  mainSection: document.querySelector('.wrapper'),
  planetsList: document.querySelector('.main__planets'),
  getAllPlanets: getAllPlanetsEl => { return document.querySelectorAll('.main__planet'); },
  overlay: {
    root: document.querySelector('.overlay'),
    closeBtn: document.querySelector('.overlay__close-btn'),
    // overlayContent: document.querySelector('.overlay__content'),
    planetName: document.querySelector('.overlay__planet-name'),
    planetLatinName: document.querySelector('.overlay__planet-latin-name'),
    planetDescription: document.querySelector('.overlay__planet-description'),
    planetCircumference: document.querySelector('.overlay__planet-circumference'),
    planetDistance: document.querySelector('.overlay__planet-distance'),
    planetMaxTemp: document.querySelector('.overlay__planet-max-temperature'),
    planetMinTemp: document.querySelector('.overlay__planet-min-temperature'),
    planetMoons: document.querySelector('.overlay__planet-moons'),
    planetGfx: document.querySelector('.overlay__planet'),
    planetGfxSaturnRing: document.querySelector('.overlay__planet--saturn'),
  },
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
}

function createPlanet(planet) {
  const planetEl = htmlFromTemplate(`
    <li class='main__planet' data-id=${planet.id}>
      ${planet.id == 6 ? '<div class=\'main__planet-gfx\'><div class=\'main_planet-gfx--saturn\'></div></div>' : '<div class=\'main__planet-gfx\'></div>'}
    </li>
  `);
  // margin-left: ${planet.id == 1 ? '150px' : '0'};
  // padding: 0;
  const css = `
    background-color: ${planetProps.colors[planet.id]};
    height: ${planetProps.size[planet.id]};
    width: ${planetProps.size[planet.id]};
    border-radius: 50%;
    translate: ${planet.id == 0 ? '-190%' : '0'};
    position: ${planet.id == 0 ? 'absolute' : 'auto'};

 
    cursor: pointer;
    box-shadow: 0px 0px 250px rgba(255, 208, 41, 0.2);
  `;
  planetEl.style.cssText = css;

  allEl.planetsList.appendChild(planetEl);
}

function showMoreInfo(planet) {
  const id = planet.currentTarget.dataset.id;

  allEl.overlay.planetName.innerText = planetsData[id].name.toUpperCase();
  allEl.overlay.planetLatinName.innerText = planetsData[id].latinName.toUpperCase();
  allEl.overlay.planetDescription.innerText = planetsData[id].desc;
  allEl.overlay.planetCircumference.innerText = Intl.NumberFormat().format(planetsData[id].circumference) + ' km';
  allEl.overlay.planetDistance.innerText = Intl.NumberFormat().format(planetsData[id].distance) + ' km';
  allEl.overlay.planetMaxTemp.innerText = planetsData[id].temp.day + ' °C';
  allEl.overlay.planetMinTemp.innerText = planetsData[id].temp.night + ' °C';
  allEl.overlay.planetMoons.innerHTML = planetsData[id].moons.join(', ');
  allEl.overlay.planetGfx.style.background =  planetProps.colors[id];
  id == 6 ? allEl.overlay.planetGfxSaturnRing.classList.remove('hide') : allEl.overlay.planetGfxSaturnRing.classList.add('hide');

  allEl.overlay.root.classList.toggle('show');
}

function createBackgroundStars() {
  const totalStars = 100;

  for (let index = 0; index < totalStars; index++) {
    const starStrength = Math.floor(Math.random() * 3);
    const starPositionX = Math.floor(Math.random() * document.defaultView.innerWidth);
    const starPositionY = Math.floor(Math.random() * document.defaultView.innerHeight);
    let star = htmlFromTemplate(`
      <div class='star'></div>
    `);
    
    let css = `
      background-color: #fff;
      opacity: ${starStrength == 0 ? 0.25 : starStrength == 1 ? 0.50 : 1};
      position: fixed;
      left: ${starPositionX}px;
      top: ${starPositionY}px;
      border-radius: 50%;
      height: ${starStrength+2}px;
      width: ${starStrength+2}px;
      z-index: 1;
    `;
    star.style.cssText = css;
    allEl.overlay.root.appendChild(star);
  }
}

function createSaturnRing() {
	const cssSaturnRing = `
	  background: rgba(255, 255, 255, 0.4);
	  height: 8px;
	  width: 200px;
	  border-radius: 50%;
	  transform: rotate(-32deg) translateX(-30%) translateY(530%);
	`;

	document.querySelector('.main_planet-gfx--saturn').style.cssText = cssSaturnRing;
}

createPlanets(planetsData);
createBackgroundStars();
createSaturnRing();
setTimeout(() => {
  allEl.loading.classList.add('hide');
  allEl.loading.childNodes[1].classList.add('disable');
  allEl.loading.childNodes[1].nextElementSibling.classList.add('disable');
}, 1000);

export { allEl, showMoreInfo }