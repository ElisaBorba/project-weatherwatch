const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  try {
    const WEATHER_URL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`;
    const result = await fetch(WEATHER_URL);
    const data = await result.json();
    console.log(data);

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
  const { current } = info;

  return {
    temp: current.temp_c,
    condition: current.condition.text,
    icon: current.condition.icon,
  };
};
