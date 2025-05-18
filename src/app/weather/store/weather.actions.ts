import { createAction, props } from '@ngrx/store';
import { DayForecast, TodayForecast } from './weather.state';

export const addCity = createAction(
  '[Weather] Add City',
  props<{ city: { name: string; temp: number; icon: string; description: string } }>()
);

export const removeCity = createAction(
  '[Weather] Remove City',
  props<{ cityName: string }>()
);

export const clearAllCities = createAction('[Weather] Clear All Cities');

export const refreshCity = createAction(
  '[Weather] Refresh City',
  props<{ cityName: string }>()
);

export const loadForecast = createAction(
    '[Weather] Load Forecast',
    props<{ cityName: string }>()
  );
  
  export const loadForecastSuccess = createAction(
    '[Weather] Load Forecast Success',
    props<{ cityName: string; todayForecast: TodayForecast; fiveDayForecast: DayForecast[] }>()
  );
  
  export const loadForecastFailure = createAction(
    '[Weather] Load Forecast Failure',
    props<{ error: string }>()
  );
  
  export const selectCityForForecast = createAction(
    '[Weather] Select City For Forecast',
    props<{ cityName: string }>()
  );

//   export const fetchForecast = createAction(
//     '[Weather] Fetch Forecast',
//     props<{ cityName: string }>()
//   );

  export const refreshCitySuccess = createAction(
    '[Weather] Refresh City Success',
    props<{ city: { name: string; temp: number; icon: string; description: string; } }>()
  );
  
  export const refreshCityFailure = createAction(
    '[Weather] Refresh City Failure',
    props<{ error: any }>()
  );