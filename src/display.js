import { format } from 'date-fns';
import { getCurrentLocation, getForecastData } from './api';
import { convertToCelcius, convertToFahrenheit } from './helpers';

const form = document.getElementById('form');
const searchBox = document.getElementById('searchBox');
const loader = document.getElementById('loader');
const currentWeatherHeader = document.getElementById('currentWeatherHeader');
const currentWeather = document.getElementById('currentWeather');
const currentImage = document.getElementById('currentWeatherImage');
const currentDate = document.getElementById('currentDate');
const currentTemp = document.getElementById('currentTemp');
const currentFeel = document.getElementById('currentFeel');
const currentHumidity = document.getElementById('humidityText');
const currentWindspeed = document.getElementById('windspeedText');
const currentChanceOfRain = document.getElementById('chanceofrainText');
const currentSunrise = document.getElementById('sunriseText');
const currentPressure = document.getElementById('pressureText');
const currentSunset = document.getElementById('sunsetText');
const toggler = document.getElementById('toggleButton');

function convertAllMetric() {
  const degree = Array.from(document.getElementsByClassName('metric'));

  if (toggler.classList.contains('toggled')) {
    degree.forEach((item, index) => {
      const element = document.getElementsByClassName('metric')[index];
      const value = Number(element.textContent);
      element.innerText = convertToFahrenheit(value);
      const tempType = document.getElementsByClassName('tempType')[index];
      tempType.innerText = 'F';
    });
  } else {
    degree.forEach((item, index) => {
      const element = document.getElementsByClassName('metric')[index];
      const value = Number(element.textContent);
      element.innerText = convertToCelcius(value);
      const tempType = document.getElementsByClassName('tempType')[index];
      tempType.innerText = 'C';
    });
  }
}

toggler.addEventListener('click', () => {
  toggler.classList.toggle('toggled');
  convertAllMetric();
});

function toggleImage(icon) {
  currentImage.className = 'currentWeatherImage';
  switch (icon) {
    case '01d':
      currentImage.classList.add('oned');
      break;
    case '01n':
      currentImage.classList.add('onen');
      break;
    case '02d':
      currentImage.classList.add('twod');
      break;
    case '02n':
      currentImage.classList.add('twon');
      break;
    case '03d':
      currentImage.classList.add('threed');
      break;
    case '03n':
      currentImage.classList.add('threed');
      break;
    case '04d':
      currentImage.classList.add('fourd');
      break;
    case '04n':
      currentImage.classList.add('fourd');
      break;
    case '09d':
      currentImage.classList.add('nined');
      break;
    case '09n':
      currentImage.classList.add('nined');
      break;
    case '10d':
      currentImage.classList.add('tend');
      break;
    case '10n':
      currentImage.classList.add('tenn');
      break;
    case '11d':
      currentImage.classList.add('elevend');
      break;
    case '11n':
      currentImage.classList.add('elevend');
      break;
    case '12d':
      currentImage.classList.add('twelved');
      break;
    case '12n':
      currentImage.classList.add('twelved');
      break;
    case '50d':
      currentImage.classList.add('fiftyd');
      break;
    case '50n':
      currentImage.classList.add('fiftyd');
      break;

    default:
  }
}

function setTempInnerHtml(container, temp) {
  const metric = document.createElement('span');
  metric.classList.add('metric');

  const degree = document.createElement('span');
  degree.classList.add('degree');

  const tempType = document.createElement('span');
  tempType.classList.add('tempType');

  if (toggler.classList.contains('toggled')) {
    metric.innerText = convertToFahrenheit(temp);
    tempType.innerText = 'F';
  } else {
    metric.innerText = temp;
    tempType.innerText = 'C';
  }

  degree.innerText = '°';

  container.append(metric);
  container.append(degree);
  container.append(tempType);
}

function setListInnerHtml(container, data) {
  const br = document.createElement('br');
  const span = document.createElement('span');
  span.innerText = `${data}`;
  span.classList.add('listData');
  container.append(br);
  container.append(span);
}

function setForecastWeatherTypeHtml(container, icon) {
  switch (icon) {
    case 'rain':
      container.classList.add('rain');
      break;

    case 'snow':
      container.classList.add('snow');
      break;

    case 'cloudy':
      container.classList.add('cloudy');
      break;

    case 'clear-day':
      container.classList.add('clear-day');
      break;

    case 'clear-night':
      container.classList.add('clear-night');
      break;

    case 'partly-cloudy-night':
      container.classList.add('partly-cloudynight');
      break;

    default:
      break;
  }
}

function setActiveCard(dayType) {
  const weekWeatherCard = Array.from(
    document.getElementsByClassName('weekWeatherCard'),
  );
  weekWeatherCard.forEach((item) => {
    const element = item;
    element.className = 'weekWeatherCard';
  });
  switch (dayType) {
    case 'Sunday':
      weekWeatherCard[0].classList.add('active');
      break;

    case 'Monday':
      weekWeatherCard[1].classList.add('active');
      break;

    case 'Tuesday':
      weekWeatherCard[2].classList.add('active');
      break;

    case 'Wednesday':
      weekWeatherCard[3].classList.add('active');
      break;

    case 'Thursday':
      weekWeatherCard[4].classList.add('active');
      break;

    case 'Friday':
      weekWeatherCard[5].classList.add('active');
      break;

    case 'Saturday':
      weekWeatherCard[6].classList.add('active');
      break;

    default:
      break;
  }
}

function updateForecastCard(forecastData) {
  const formattedData = Array.from(forecastData);
  const dayType = format(new Date(), 'EEEE');
  setActiveCard(dayType);
  console.log(formattedData);
  formattedData.forEach((data, index) => {
    const imageContainer =
      document.getElementsByClassName('weatherType')[index];
    imageContainer.className = 'weatherType';
    setForecastWeatherTypeHtml(imageContainer, data.icon);
    const weatherTemp =
      document.getElementsByClassName('weekWeatherTemp')[index];
    weatherTemp.innerHTML = '';
    setTempInnerHtml(weatherTemp, convertToCelcius(data.temp));
    const weekRainPerc = document.getElementsByClassName('weekRainPerc')[index];
    weekRainPerc.innerText = `${Math.round(data.precipprob)}%`;
  });
}

function updateCurrentCard(location) {
  const headerData =
    location.city !== location.country && location.country !== ''
      ? `${location.city}, ${location.country}`
      : location.city;
  currentWeatherHeader.innerText = headerData;
  currentWeather.innerText = location.description;
  toggleImage(location.icon);
  currentDate.innerText = format(new Date(), 'eeee, LLLL dd');
  currentTemp.innerHTML = '';
  setTempInnerHtml(currentTemp, Math.round(location.temp));
  currentFeel.innerHTML = 'Feels like ';
  setTempInnerHtml(currentFeel, Math.round(location.feels_like));
  currentHumidity.innerText = 'Humidity';
  const humidityData = `${location.humidity}%`;
  setListInnerHtml(currentHumidity, humidityData);
  currentWindspeed.innerText = 'Wind Speed';
  const windspeedData = `${Math.round(location.windspeed)} m/s`;
  setListInnerHtml(currentWindspeed, windspeedData);
  currentChanceOfRain.innerText = 'Chance Of Rain';
  const chanceofrainData = `${Math.round(location.chance_of_rain * 100)}%`;
  setListInnerHtml(currentChanceOfRain, chanceofrainData);
  currentSunrise.innerText = 'Sunrise';
  const sunriseData = format(location.sunrise, 'hh:mm a');
  setListInnerHtml(currentSunrise, sunriseData);
  currentPressure.innerText = 'Pressure';
  const pressureData = `${location.pressure} hPa`;
  setListInnerHtml(currentPressure, pressureData);
  currentSunset.innerText = 'Sunset';
  const sunsetData = format(location.sunset, 'hh:mm a');
  setListInnerHtml(currentSunset, sunsetData);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (searchBox.value !== '') {
    const location = await getCurrentLocation(searchBox.value);
    if (location !== false) {
      const forecastData = await getForecastData(location.lat, location.lon);
      console.log(location);
      updateCurrentCard(location);
      updateForecastCard(forecastData);
      searchBox.value = '';
    }
  }
});

async function initiatePhilippinesLocation() {
  const location = await getCurrentLocation('Philippines');
  const forecastData = await getForecastData(location.lat, location.lon);
  updateCurrentCard(location);
  updateForecastCard(forecastData);
  searchBox.value = '';
  loader.classList.remove('active');
}

export default initiatePhilippinesLocation;
