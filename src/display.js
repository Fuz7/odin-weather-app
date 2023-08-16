import { format } from 'date-fns';
import { getLocation } from './api';

const form = document.getElementById('form');
const searchBox = document.getElementById('searchBox');

const currentWeatherHeader = document.getElementById('currentWeatherHeader');
const currentWeather = document.getElementById('currentWeather');
const currentImage = document.getElementById('currentWeatherImage');
const currentDate = document.getElementById('currentDate');
const currentTemp = document.getElementById('currentTemp');
const currentFeel = document.getElementById('currentFeel')


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

  // if(toggler.classList.contains('toggled')){
  //   metric.innerText = convertToFahrenheit(temp)
  //   tempType.innerText = 'F'
  // } else{
  //   metric.innerText = temp
  //   temptType.innerText = 'C'
  // }
      
  degree.innerText = '°';
  metric.innerText = temp;
  tempType.innerText = 'C'
    
  container.append(metric)
  container.append(degree)
  container.append(tempType)
}

function updateCurrentCard(location) {
  currentWeatherHeader.innerText = location.name;
  const currentWeatherContent = location.weather['0'].description;
  currentWeather.innerText = currentWeatherContent
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  toggleImage(location.weather[0].icon);
  currentDate.innerText = format(new Date(), 'eeee, LLLL dd');
  currentTemp.innerHTML = ''
  setTempInnerHtml(currentTemp,Math.round(location.main.temp))  
  currentFeel.innerHTML = 'Feels like '
  setTempInnerHtml(currentFeel,Math.round(location.main.feels_like))

}

form.addEventListener('submit', async (e) => {
  if (searchBox.value !== '') {
    e.preventDefault();
    const location = await getLocation(searchBox.value);
    if (location !== false) {
      console.log(location);
      updateCurrentCard(location);
    }
  }
});
