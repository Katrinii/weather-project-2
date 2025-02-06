function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureKelvin = response.data.main.temp;
  let temperatureCelsius = Math.round(temperatureKelvin - 273.15);
  let cityElement = document.querySelector("#city-name");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = temperatureCelsius;
}

function searchCity(city) {
  let apiKey = "c604480ce674e3d8788909bde87f5fda";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchAndSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchAndSubmit);

searchCity("London");
