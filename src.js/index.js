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

  updateLottieAnimation(temperatureCelsius);

  console.log(response.data);
}
function updateLottieAnimation(temp) {
  let lottieContainer = document.querySelector("#lottie-container");

  // If the container doesn't exist, create it inside the header
  if (!lottieContainer) {
    lottieContainer = document.createElement("div");
    lottieContainer.id = "lottie-container";
    document.querySelector("header").prepend(lottieContainer);
  }

  // Clear any previous Lottie animation
  lottieContainer.innerHTML = "";

  // Choose the correct Lottie animation based on temperature
  let lottieSrc;
  if (temp > 17) {
    lottieSrc =
      "https://lottie.host/de906e4c-5d3b-4185-a33a-3cf3a3af1c72/kopk9gEQQt.lottie"; // Warm icon
  } else {
    lottieSrc =
      "https://lottie.host/c2038e32-5c7e-4746-b389-f93f60261f1d/b2GsH7cm7d.lottie"; // Cold icon
  }

  // Create the Lottie player element
  let lottiePlayer = document.createElement("dotlottie-player");
  lottiePlayer.setAttribute("src", lottieSrc);
  lottiePlayer.setAttribute("background", "transparent");
  lottiePlayer.setAttribute("speed", "1");
  lottiePlayer.style.width = "300px";
  lottiePlayer.style.height = "300px";
  lottiePlayer.setAttribute("loop", "true");
  lottiePlayer.setAttribute("autoplay", "true");

  // Add the Lottie animation to the container
  lottieContainer.appendChild(lottiePlayer);
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
