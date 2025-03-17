function updateDateTime(timezoneOffset) {
  let now = new Date();

  let utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  let localTime = new Date(utcTime + timezoneOffset * 1000);

  let hours = localTime.getHours().toString().padStart(2, "0");
  let minutes = localTime.getMinutes().toString().padStart(2, "0");
  let formattedTime = `${hours}:${minutes}`;

  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = localTime.getDate();
  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) daySuffix = "st";
  else if (day === 2 || day === 22) daySuffix = "nd";
  else if (day === 3 || day === 23) daySuffix = "rd";

  let formattedDate = `${dayNames[localTime.getDay()]} ${day}${daySuffix}`;

  document.querySelector("#local-time").innerHTML = formattedTime;
  document.querySelector("#date").innerHTML = formattedDate;
}
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

  updateDateTime(response.data.timezone);
  updateLottieAnimation(temperatureCelsius);
  console.log(response.data);
}
function updateLottieAnimation(temp) {
  let lottieContainer = document.querySelector("#lottie-container");

  if (!lottieContainer) {
    lottieContainer = document.createElement("div");
    lottieContainer.id = "lottie-container";
    document.querySelector("header").prepend(lottieContainer);
  }

  lottieContainer.innerHTML = "";

  let lottieSrc;
  if (temp > 17) {
    lottieSrc =
      "https://lottie.host/de906e4c-5d3b-4185-a33a-3cf3a3af1c72/kopk9gEQQt.lottie"; // Warm icon
  } else {
    lottieSrc =
      "https://lottie.host/c2038e32-5c7e-4746-b389-f93f60261f1d/b2GsH7cm7d.lottie"; // Cold icon
  }

  let lottiePlayer = document.createElement("dotlottie-player");
  lottiePlayer.setAttribute("src", lottieSrc);
  lottiePlayer.setAttribute("background", "transparent");
  lottiePlayer.setAttribute("speed", "0.7");
  lottiePlayer.style.width = "350px";
  lottiePlayer.style.height = "350px";
  lottiePlayer.setAttribute("loop", "true");
  lottiePlayer.setAttribute("autoplay", "true");

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
