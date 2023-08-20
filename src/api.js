import { addSeconds, format, fromUnixTime, addDays  } from 'date-fns';

const appId = 'b283ddd7c208ddaf3208ae4e8ea96309';

const forecastAppid = 'C8DRLB89LZRZ6TS2YKSSUCF97'

async function getChanceOfRain(location){
  let days = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coord.lat}&lon=${location.coord.lon}&appid=${appId}`
  )
  days = await days.json()

  const chanceOfRain = days.list[0].pop
  
  return chanceOfRain
}

async function getCurrentLocation(name) {
  try{
  const formattedName = name.replace(/,\s+/g, ',');
    let location = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${formattedName}&appid=${appId}&units=metric`,
    );
    
    if (!location.ok){
      return false
    }

    location = await location.json();

    console.log(location)

    const regionNamesInEnglish = new Intl.DisplayNames(['en'],{
      type: 'region',
    })


    // Get timezone offset for sunrinse & sunset
    const currenDate = new Date()
    const timezone = location.timezone + (currenDate.getTimezoneOffset() * 60)


    const object = {
      'city': location.name,
      'country': (location.sys.country !== undefined) ? regionNamesInEnglish.of(location.sys.country) : '' ,
      'description': location.weather[0].description
              .toLowerCase()
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
      'icon': location.weather[0].icon,
      'temp': location.main.temp,
      'feels_like': location.main.feels_like,
      'humidity':  location.main.humidity,
      'windspeed': location.wind.speed,
      'chance_of_rain': await getChanceOfRain(location),
      'pressure': location.main.pressure,
      'sunrise': addSeconds(fromUnixTime(location.sys.sunrise),
                  timezone),           
      'sunset': addSeconds(fromUnixTime(location.sys.sunset),
                timezone),
      'lat': location.coord.lat,
      'lon': location.coord.lon,

    }


    return object;
  }catch(error){
    console.log('Error has occured', error)
    return false
  }
}

async function getForecastData(latitude,longitude){
  let forecastData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${format(new Date(), 'yyyy-MM-dd-hh')}/${format(addDays(new Date(), 6),'yyyy-MM-dd-hh')}/?key=${forecastAppid}`)
  forecastData = await forecastData.json()
  const forecastDays = Array.from(forecastData.days)
  const currentHour = format(new Date(), 'HH:00:00')
  console.log(forecastData)
  const filteredForecast = forecastDays.map(day => {
    const hours = Array.from(day.hours)
    const correctHour = hours.find(hour => hour.datetime === currentHour)
    return correctHour
  })
  return filteredForecast
}




export { getCurrentLocation, getForecastData }
