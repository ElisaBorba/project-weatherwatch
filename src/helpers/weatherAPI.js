const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  try {
    const WEATHER_URL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`;
    const result = await fetch(WEATHER_URL);
    const data = await result.json();

    if (data.error || data.length === 0) throw new Error('Nenhuma cidade encontrada');
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const getWeatherByCity = (/* cityURL */) => {

};
