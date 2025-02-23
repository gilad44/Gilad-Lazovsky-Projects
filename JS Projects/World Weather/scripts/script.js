const API_KEY = "01d2cd3432ef562958d7949400ba4960";
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

const q = document.getElementById("inputCity");
const button = document.querySelector("button");
const h1 = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");
const defaultCity = "Tel Aviv";

async function getWeather(city) {
  const response = await fetch(URL + city);
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(weatherData) {
  if (weatherData.cod === 200) {
    errorMessage.innerText = "";
    h1.innerText = weatherData.name;
    temp.innerText = weatherData.main.temp + "C";
    description.innerText = weatherData.weather[0].description;

    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weatherIcon.alt = weatherData.name;

  } else {
    h1.innerText = "";
    temp.innerText = "";
    description.innerText = "";
    weatherIcon.src = "";
    weatherIcon.alt = "";
    errorMessage.innerText = "City not found";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  getWeather(defaultCity);
});
button.addEventListener("click", () => {
  getWeather(q.value);
});
