const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  try {
    const WEATHER_URL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`;
    const result = await fetch(WEATHER_URL);
    const data = await result.json();
    // console.log(data);

    if (data.error || data.length === 0) throw new Error('Nenhuma cidade encontrada');
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const getWeatherByCity = async (cityURL) => {
  const CITY_URL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`;
  const result = await fetch(CITY_URL);
  const info = await result.json();
  const { current, location } = info;
  // console.log('getWeatherByCity', info);

  return {
    name: location.name,
    country: location.country,
    temp: current.temp_c,
    condition: current.condition.text,
    icon: current.condition.icon,
    url: cityURL,
  };
};

export const getForecast = async (cityURL) => {
  const FORECAST_URL = `http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${cityURL}&days=${7}`;
  const result = await fetch(FORECAST_URL);
  const data = await result.json();
  const { forecastday } = data.forecast;

  // forecastday.find(({ forecastday }) => date

  console.log('forecastday', forecastday);

  const searchData = forecastday.filter(({ day }) => {
    return (
      day.maxtemp_c
      && day.maxtemp_f
      && day.condition.text
      && day.condition.icon
    );
  }).map((infoDay) => ({
    maxTemp: infoDay.day.maxtemp_c,
    minTemp: infoDay.day.maxtemp_f,
    condition: infoDay.day.condition.text,
    icon: infoDay.day.condition.icon,
  }));

  console.log('searchData', searchData);

  // return um array:
  // [
  //   {
  //     date: '2023-02-23',
  //     maxTemp: 30.6, // temperatura em graus celsius
  //     minTemp: 20.3, // temperatura em graus celsius
  //     condition: 'Patchy rain possible',
  //     icon: '//cdn.weatherapi.com/weather/64x64/day/176.png'
  //   },
  //   {/*Informações do segundo dia*/},
  //   {/*Informações do terceiro dia*/},
  //   /* etc */
  // ]
};
