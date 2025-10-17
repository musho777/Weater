import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import WeatherService from '../../services/weather/WeatherService';

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (city) => {
    const response = await WeatherService.getCurrentWeather(city);
    return response;
  }
);

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city) => {
    const response = await WeatherService.getForecast(city);
    return response;
  }
);

export const fetchWeatherByLocation = createAsyncThunk(
  'weather/fetchByLocation',
  async ({lat, lon}) => {
    const response = await WeatherService.getWeatherByCoordinates(lat, lon);
    return response;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: null,
    forecast: null,
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.favorites.includes(city)) {
        state.favorites.push(city);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(city => city !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeatherByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {addFavorite, removeFavorite, clearError} = weatherSlice.actions;

export default weatherSlice.reducer;