const weather = document.querySelector(".js-weather");

const API_KEY = "762b77da626ebfbeee672006845cfa20";
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      // console.log(json);
      const temperature = json.main.temp; // 온도
      const place = json.name             // 위치정보
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;  // 위도
  const longitude = position.coords.longitude;  // 경도
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  // 위치정보를 불러올 수 없다.
  console.log("Cant access geo location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if ( loadedCords === null ) {
    askForCoords();
  } else {
    // getWeather
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();