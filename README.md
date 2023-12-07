# Project Title - WeatherToday
A weather web app built with Vanilla JavaScript.

This project is a weather web app that uses the OpenWeather API to fetch weather data. Users have the flexibility to search for locations around the world in two ways: they can enter a city name or a combination of a city name and a country code. Alternatively, users can click the ‘My Location’ button to automatically fetch weather data for their current location.

## Code Showcase
- **Local Time Display**: This project displays time according to the user’s local time zone. This is achieved using JavaScript’s built-in `Date` object and the `.getTimezoneOffset()` method, among other features. This ensures that the displayed time is always relevant to the user, no matter where they are located.
- **7-Day Forecast**: The `showForecast` function dynamically generates a 7-day weather forecast. It takes in a response object containing weather data and generates HTML to display the forecast.
- **Geolocation**: The `userCurrentLocation` function uses the Geolocation API to get the user’s current location. This allows the app to provide weather data for the user’s exact location.
- **Dynamic Icons**: In the `showIcon` function, the application dynamically assigns icons to the weather conditions based on the icon code provided by the OpenWeather API. The function evaluates the icon code and, based on this evaluation, selects an appropriate icon from a predefined set of icons.

## Built With
- **Bootstrap**: A popular HTML, CSS, and JS library for developing responsive projects on the web.
- **Font Awesome**: A toolkit for customizable vector icons and social logos.
- **Google Fonts**: A library of licensed fonts, an interactive web directory for browsing the library, and APIs for conveniently using the fonts.
- **Axios**: A promise-based HTTP client for the browser and Node.js; used for making API requests to the OpenWeather API.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- A modern web-browser like Chrome, Safari etc.
- A text editor like VS Code, Sublime Text etc.

### Installing
Follow these steps to get a development environment running:
1. Clone the repo: `git clone https://github.com/Lia-O1/WeatherProject.git`
2. Navigate to the project folder: `cd WeatherProject`
3. Open the `index.html` file in your browser

Since this project is built with Vanilla JavaScript, no special installation steps are required. You can run the project directly in your browser.

## Live Version
A live version of the project is hosted on Netlify and can be accessed [here](https://dainty-daifuku-27e9c3.netlify.app/)
