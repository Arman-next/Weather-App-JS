const input = document.querySelector("#city");
const button = document.querySelector(".ri-search-line");
const temparature = document.querySelector(".temparature");
const condition = document.querySelector(".condition");
const image = document.querySelector(".image img");
const humidity = document.querySelector(".Humidity");
const wind = document.querySelector(".wind-speed");
const details = document.querySelector(".details");
const notfound = document.querySelector(".notfound");

const showResult = function (data) {
  notfound.style.display = "none";
  details.style.display = "block";
  temparature.innerHTML = `${Math.floor(data.main.temp - 273.15)}<sup>°C</sup>`;
  condition.innerHTML = data.weather[0].main;
  humidity.innerHTML = `${data.main.humidity}<span>%</span>`;
  wind.innerHTML = `${data.wind.speed}<span>KM/H</span>`;

  switch (data.weather[0].main) {
    case "Clouds":
      image.src = "./cloudy.png";
      break;
    case "Mist":
      image.src = "./haze.png";
      break;
    case "Rain":
      image.src = "./storm.png";
      break;
    case "Snow":
      image.src = "./snow.png";
      break;
    case "Clear":
      image.src = "./sunny.png";
      break;
    default:
      break;
  }
};

const searchWeather = async function (city) {
  try {
    const API_KEY = ""; // Use your API key here
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    showResult(data);
  } catch (error) {
    notfound.style.display = "flex";
    details.style.display = "none";
    console.log(error);
  }
};

button.addEventListener("click", function () {
  const city = input.value;
  searchWeather(city);
});
