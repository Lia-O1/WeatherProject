function getCurrentDayTime() {
  let currentDayTime = new Date();
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var hours = currentDayTime.getHours();
  var minutes = currentDayTime.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var ampm = hours >= 12 ? "PM" : "AM";

  if (hours <= 12) {
    hours = hours;
  } else {
    hours = hours - 12;
  }
  var currentTime = `${hours}:${minutes}${ampm}`;
  var currentDay = weekday[currentDayTime.getDay()];
  var currentDate = currentDayTime.getDate();
  let theDay = document.querySelector("#current-day");
  theDay.innerHTML = currentDay;
  let theDate = document.querySelector("#current-date");
  theDate.innerHTML = currentDate;
  let theTime = document.querySelector("#current-time");
  theTime.innerHTML = currentTime;
  setTimeout(getCurrentDayTime, 500);
}
getCurrentDayTime();

function showTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
}

function showHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;
}

function showDescription(response) {
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector(
    "#current-weather-description"
  );
  currentDescription.innerHTML =
    description[0].toUpperCase() + description.slice(1);
}
function showWind(response) {
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${wind}m/s`;
}

function showPrecipitation(response) {
  var precipitation;
  let currentPrecip = document.querySelector("#current-precipitation");
  if (precipitation === undefined) {
    currentPrecip.innerHTML = `0mm`;
  } else {
    let precipitation = response.data.rain[0];
    currentPrecip.innerHTML = `${precipitation}mm`;
  }
}

function showFeelsLike(response) {
  let feelslike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#current-feelslike");
  currentFeelsLike.innerHTML = `${feelslike}`;
}

function showLocation(response) {
  let usersLocation = response.data.name;
  let currentUsersLocation = document.querySelectorAll("#users-location");
  currentUsersLocation.forEach(function (userLocation) {
    userLocation.innerHTML = `${usersLocation}`;
  });
}

function showIcon(response) {
  let descriptionIcon = response.data.weather[0].icon;
  let iconElement = document.querySelector(".myIconMain");
  iconElement.classList = "myIconMain";
  if (descriptionIcon === "01d") {
    iconElement.classList.add("lni");
    iconElement.classList.add("lni-sun");
  }
  if (
    descriptionIcon === "03d" ||
    descriptionIcon === "03n" ||
    descriptionIcon === "04d" ||
    descriptionIcon === "03n"
  ) {
    iconElement.classList.add("lni");
    iconElement.classList.add("lni-cloud");
  }
  if (descriptionIcon === "02d" || descriptionIcon === "02n") {
    iconElement.classList.add("lni");
    iconElement.classList.add("lni-cloudy-sun");
  }
  if (descriptionIcon === "11d") {
    iconElement.classList.add("lni");
    iconElement.classList.add("lni-thunder");
  }
  if (
    descriptionIcon === "09d" ||
    descriptionIcon === "09n" ||
    descriptionIcon === "10d" ||
    descriptionIcon === "10n"
  ) {
    iconElement.classList.add("lni");
    iconElement.classList.add("lni-rain");
  }
  if (descriptionIcon === "50d") {
    iconElement.classList.add("fa-solid");
    iconElement.classList.add("fa-bars-staggered");
  }
  if (descriptionIcon === "13d") {
    iconElement.classList.add("fa-regular");
    iconElement.classList.add("fa-snowflake");
  }
}

function handleWeather(response) {
  showTemp(response);
  showHumidity(response);
  showDescription(response);
  showWind(response);
  showPrecipitation(response);
  showFeelsLike(response);
  showLocation(response);
  showIcon(response);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cb9ed4dc19bec04ed529a19979e84dce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(handleWeather);
}

function userCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-location-main");
locationButton.addEventListener("click", userCurrentLocation);

function searchLocation(city) {
  let apiKey = "cb9ed4dc19bec04ed529a19979e84dce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(handleWeather);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#user-input");
  let city = `${searchInput.value}`;
  searchLocation(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function convertToC(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temp.innerHTML = Math.round(celsiusTemp);
}
function convertToF(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  let fTemp = celsiusTemp * (9 / 5) + 32;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temp.innerHTML = Math.round(fTemp);
}

let celsiusTemp = null;
let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", convertToC);
fahrenheitLink.addEventListener("click", convertToF);

searchLocation("Melbourne");
