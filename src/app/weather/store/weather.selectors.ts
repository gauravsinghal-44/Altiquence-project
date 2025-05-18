import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';


export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectRecentCities = createSelector(
  selectWeatherState,
  (state) => state.recentCities
);

export const selectTodayForecast = createSelector(
    selectWeatherState,
    (state) => state.todayForecast
  );
  
  export const selectFiveDayForecast = createSelector(
    selectWeatherState,
    (state) => state.fiveDayForecast
  );
  
  export const selectSelectedCity = createSelector(
    selectWeatherState,
    (state) => state.selectedCity
  );