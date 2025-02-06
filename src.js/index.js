function refreshWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureKelvin = response.data.main.temp;
  let temperatureCelsius = Math.round(temperatureKelvin - 273.15);
  let humidityDisplay = document.querySelector("#humidity-percentage");
  let windDisplay = document.querySelector("#wind-speed");
  let windSpeedSpm = response.data.wind.speed;
  let windSpeedMph = Math.round(windSpeedSpm * 2.23694);
  let farenheitElement = document.querySelector("#farenheit-temp");
  let temperatureKel = response.data.main.temp;
  let temperatureFarenheit = Math.round(
    (temperatureKel - 273.15) * (9 / 5) + 32
  );

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = temperatureCelsius;
  humidityDisplay.innerHTML = `${response.data.main.humidity}%`;
  windDisplay.innerHTML = `${windSpeedMph} m/h`;
  farenheitElement.innerHTML = `${temperatureFarenheit}°F`;

  console.log(response.data);

  //fix %, m/h, °F bug//
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
