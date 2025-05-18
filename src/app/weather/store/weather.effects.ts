import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { addCity, loadForecast, loadForecastFailure, loadForecastSuccess, refreshCity, refreshCityFailure, refreshCitySuccess } from './weather.actions';
import { DayForecast, TodayForecast } from './weather.state';

@Injectable()
export class WeatherEffects {

private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);

  fetchForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForecast),
      mergeMap(({ cityName }) =>
        this.weatherService.getForecast(cityName).pipe(
          map((response: any) => {
            const todayData = response.list[0];
  
            const todayForecast: TodayForecast = {
              icon: todayData.weather[0].icon,
              temp: Math.round(todayData.main.temp),
              description: todayData.weather[0].description,
              windSpeed: todayData.wind.speed,
              windDeg: todayData.wind.deg,
              pressure: todayData.main.pressure
            };

            const fiveDayForecast: DayForecast[] = [];
            const addedDates = new Set<string>();
  
            for (const item of response.list) {
              const dateStr = item.dt_txt.split(' ')[0]; // 'YYYY-MM-DD'
  
              if (!addedDates.has(dateStr)) {
                addedDates.add(dateStr);
  
                const dateObj = new Date(dateStr);
                const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  
                fiveDayForecast.push({
                  date: dateStr,
                  weekday,
                  icon: item.weather[0].icon,
                  temp: Math.round(item.main.temp)
                });
  
                if (fiveDayForecast.length === 5) break; // we only want next 5 days
              }
            }
  
            return loadForecastSuccess({
              cityName: response.city.name,
              todayForecast,
              fiveDayForecast
            });
          }),
          catchError((error) =>
            of(loadForecastFailure({ error: error.message || 'Failed to load forecast' }))
          )
        )
      )
    )
  );

  refreshCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshCity),
      mergeMap(({cityName}) =>
        this.weatherService.getCurrentWeather(cityName).pipe(
          map(data =>{
            const updatedCity = {
                name: data.name,
                temp: Math.round(data.main.temp),
                icon: data.weather[0].icon,
                description: data.weather[0].description
              };
              return refreshCitySuccess({ city: updatedCity });
            }),
          catchError(() => of(refreshCityFailure({ error: 'Failed to refresh city' }))
        )
        )
    )
      )
    );
}
