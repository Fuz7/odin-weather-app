const appId = 'b283ddd7c208ddaf3208ae4e8ea96309';

async function getLocation(name) {
  try{
  const formattedName = name.replace(/,\s+/g, ',');
    let location = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${formattedName}&appid=${appId}&units=metric`,
    );

    if (!location.ok){
      return false
    }

    location = location.json();



    return location;
  }catch(error){
    console.log('Error has occured', error)
    return false
  }
}

function getCurrentWeather(){}

export { getLocation, getCurrentWeather};
