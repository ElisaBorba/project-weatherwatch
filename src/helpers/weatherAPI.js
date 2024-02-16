import Swal from 'sweetalert2';

const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  try {
    const WEATHER_URL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`;
    const result = await fetch(WEATHER_URL);
    const data = await result.json();

    if (data.error || data.length === 0) throw new Error('Nenhuma cidade encontrada');
    return data;
  } catch (error) {
    Swal.fire({
      background: '#fff',
      titleText: error.message });
  }
};

export const getWeatherByCity = async (cityURL) => {
  const CITY_URL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`;
  const result = await fetch(CITY_URL);
  const info = await result.json();
  const { current, location } = info;

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
  const FORECAST_URL = `http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${cityURL}&days=7`;
  const result = await fetch(FORECAST_URL);
  const data = await result.json();
  const { forecastday } = data.forecast;

  const dayData = forecastday.filter(({ day, date }) => {
    return (
      date
      && day.maxtemp_c
      && day.maxtemp_f
      && day.condition.text
      && day.condition.icon
    );
  }).map((infoDay) => ({
    date: infoDay.date,
    maxTemp: infoDay.day.maxtemp_c,
    minTemp: infoDay.day.mintemp_c,
    condition: infoDay.day.condition.text,
    icon: infoDay.day.condition.icon,
  }));
  return dayData;
};
