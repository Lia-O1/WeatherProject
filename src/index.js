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
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  console.log(response);
}

function showHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;
}

function showDescription(response) {
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector(
    "#current-weather-desctiption"
  );
  currentDescription.innerHTML = `${description}`;
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
function handleWeather(response) {
  showTemp(response);
  showHumidity(response);
  showDescription(response);
  showWind(response);
  showPrecipitation(response);
  showFeelsLike(response);
  showLocation(response);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
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
  temp.innerHTML = 20;
}
function convertToF(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = 64;
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", convertToC);
fahrenheitLink.addEventListener("click", convertToF);

searchLocation("Melbourne");
