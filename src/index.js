function showTemp(response) {
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
  currentWind.innerHTML = `${wind} m/s`;
}

function showPrecipitation(response) {
  let precipitation = response.data.rain;
  let currentPrecipitation = document.querySelector("#current-precipitation");
  if (precipitation === undefined) {
    currentPrecipitation.innerHTML = `0 mm`;
  } else {
    for (let prop in precipitation) {
      if (precipitation[prop] === undefined) {
        currentPrecipitation.innerHTML = `0 mm`;
      } else {
        let precipitationValue = precipitation[prop];
        currentPrecipitation.innerHTML = `${precipitationValue} mm`;
      }
    }
  }
}

function showFeelsLike(response) {
  let feelslike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#current-feelslike");
  currentFeelsLike.innerHTML = `${feelslike}°C`;
}

function showLocation(response) {
  let usersLocation = response.data.name;
  let currentUsersLocation = document.querySelector("#users-location");
  currentUsersLocation.innerHTML = `${usersLocation}`;
}

function showCountry(response) {
  let country = response.data.sys.country;
  let currentCountry = document.querySelector("#users-location-country");
  currentCountry.innerHTML = `${country}`;
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
    descriptionIcon === "04n"
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function forecastDescription(forecastDay) {
  let description = forecastDay.weather[0].description;
  let currentDescription = description[0].toUpperCase() + description.slice(1);
  return currentDescription;
}

function formatIcon(forecastDay) {
  let descriptionIcon = forecastDay.weather[0].icon;
  let iconElement = "";
  if (descriptionIcon === "01d") {
    iconElement = `<i class="myIconDays lni lni-sun"></i>`;
  }
  if (
    descriptionIcon === "03d" ||
    descriptionIcon === "03n" ||
    descriptionIcon === "04d" ||
    descriptionIcon === "04n"
  ) {
    iconElement = `<i class="myIconDays lni lni-cloud"></i>`;
  }
  if (descriptionIcon === "02d" || descriptionIcon === "02n") {
    iconElement = `<i class="myIconDays lni lni-cloudy-sun"> </i>`;
  }
  if (descriptionIcon === "11d") {
    iconElement = `<i class="myIconDays lni lni-thunder"></i>`;
  }
  if (
    descriptionIcon === "09d" ||
    descriptionIcon === "09n" ||
    descriptionIcon === "10d" ||
    descriptionIcon === "10n"
  ) {
    iconElement = `<i class="myIconDays lni lni-rain"></i>`;
  }
  if (descriptionIcon === "50d") {
    iconElement = `<i class="myIconDays fa-solid fa-bars-staggered"></i>`;
  }
  if (descriptionIcon === "13d") {
    iconElement = `<i class="myIconDays fa-regular fa-snowflake"></i>`;
  }
  return iconElement;
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row mx-auto">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-lg-2">
            <div class="card h-100">
              <div class="card-body days">
                <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <hr />
                <p class="card-text"> ${formatIcon(forecastDay)}
                  
                  <span class="weatherDescriptionCard">${forecastDescription(
                    forecastDay
                  )}</span>
                  <span class="maxMinTemp">${Math.round(
                    forecastDay.temp.max
                  )}° / ${Math.round(forecastDay.temp.min)}°</span>
                </p>
              </div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleForecast(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showForecast);
}

function showTime(response) {
  let currentDayTime = new Date();
  let timeShift = response.data.timezone;
  let offset = timeShift / 3600;
  let utcTime =
    currentDayTime.getTime() + currentDayTime.getTimezoneOffset() * 60000;
  let time = utcTime + 3600000 * offset;
  let cityTime = new Date(time);

  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var hours = cityTime.getHours();
  var minutes = cityTime.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var ampm = hours >= 12 ? "PM" : "AM";

  if (hours <= 12) {
    hours = hours;
  } else {
    hours = hours - 12;
  }
  var currentTime = `${hours}:${minutes}${ampm}`;
  var currentDay = weekday[cityTime.getDay()];
  var currentDate = cityTime.getDate();
  let theDay = document.querySelector("#current-day");
  theDay.innerHTML = currentDay;
  let theDate = document.querySelector("#current-date");
  theDate.innerHTML = currentDate;
  let theTime = document.querySelector("#current-time");
  theTime.innerHTML = currentTime;
}

function handleWeather(response) {
  showTemp(response);
  showHumidity(response);
  showDescription(response);
  showWind(response);
  showPrecipitation(response);
  showFeelsLike(response);
  showLocation(response);
  showCountry(response);
  showIcon(response);
  handleForecast(response);
  showTime(response);
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

function searchCity(city) {
  let apiKey = "cb9ed4dc19bec04ed529a19979e84dce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(handleWeather);
}

function searchCityCountry(city, country) {
  let apiKey = "cb9ed4dc19bec04ed529a19979e84dce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(handleWeather);
}

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#user-input");
  let userInput = `${searchInput.value}`;
  if (userInput.trim().indexOf(" ") != -1) {
    let words = userInput.split(" ");
    let city = words[0];
    let country = words[1];
    if (country.length < 3) {
      searchCityCountry(city, country);
    } else {
      searchCity(userInput);
    }
  } else {
    searchCity(userInput);
  }
}

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

let locationButton = document.querySelector("#current-location-main");
locationButton.addEventListener("click", userCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);
searchCity("London");
