import { WEATHER_API_KEY, WEATHER_API_URL } from '../../core/constants';

class WeatherService {
  async getCurrentWeather(city) {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}`,
      );
      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new WeatherService();
