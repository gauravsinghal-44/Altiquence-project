import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { initialWeatherState } from './weather.state';


export const weatherReducer = createReducer(
  initialWeatherState,
  on(WeatherActions.addCity, (state, { city }) => {
    const filtered = state.recentCities.filter(c => c.name.toLowerCase() !== city.name.toLowerCase());
    const updated = [city, ...filtered].slice(0, 8);
    return { ...state, recentCities: updated };
  }),
  on(WeatherActions.removeCity, (state, { cityName }) => ({
    ...state,
    recentCities: state.recentCities.filter(c => c.name !== cityName),
    selectedCity: state.selectedCity === cityName ? null : state.selectedCity
  })),
  on(WeatherActions.clearAllCities, (state) => ({
    ...state,
    recentCities: [],
    selectedCity: null
  })),

  on(WeatherActions.selectCityForForecast, (state, { cityName }) => ({
    ...state,
    selectedCity: cityName
  })),

  on(WeatherActions.loadForecastSuccess, (state, { cityName, todayForecast, fiveDayForecast }) => ({
    ...state,
    selectedCity: cityName,
    todayForecast,
    fiveDayForecast,
    error: ''
  })),

  on(WeatherActions.loadForecastFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(WeatherActions.refreshCitySuccess, (state, { city }) => ({
    ...state,
    recentCities: state.recentCities.map(c =>
      c.name.toLowerCase() === city.name.toLowerCase() ? city : c
    )
  })),

  
  on(WeatherActions.refreshCityFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
