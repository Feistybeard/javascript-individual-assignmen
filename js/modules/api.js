// Här finns all kod som har med själva API:et att göra. Hämtar api-nyckel och sedan hämtar den
// all data som sedan exporteras ut från modulen.

const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
const API_KEY = await getApiKey();
const planetsData = await getAllPlanets();

async function getApiKey() {
  try {
    const res = await fetch(`${BASE_URL}/keys`, {
      method: 'POST'
    });
    const data = await res.json();
    
    return data.key;
  } catch (error) {
    console.log('Could not retrive an API key');
  }
}

async function getAllPlanets() {
  try {
    const res = await fetch(`${BASE_URL}/bodies`, {
      headers: {
        'x-zocom': API_KEY
      }
    });
    const data = await res.json();
    // console.log(data.bodies);
    return data.bodies;
  } catch (error) {
    console.log('Could not retrive information from the API', error);
  }
}

export { planetsData }