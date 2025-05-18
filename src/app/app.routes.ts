import { Routes } from '@angular/router';
import { CounterComponent } from './counter/components/counter/counter.component';
import { AppComponent } from './app.component';
import { WeatherWrapperComponent } from './weather/components/weather-wrapper/weather-wrapper.component';
import { provideState } from '@ngrx/store';
import { weatherReducer } from './weather/store/weather.reducer';
import { counterReducer } from './counter/store/counter.reducer';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './weather/store/weather.effects';
import { WeatherService } from './weather/services/weather.service';

export const routes: Routes = [
  { path: '', redirectTo: 'counter', pathMatch: 'full' },
    {
        path: 'counter',
        loadComponent: () =>
          import('./counter/components/counter/counter.component').then(m => m.CounterComponent),
        providers: [provideState('counter', counterReducer)]
      },
      {
        path: 'vatavaran',
        loadComponent: () =>
          import('./weather/components/weather-wrapper/weather-wrapper.component').then(m => m.WeatherWrapperComponent),
        providers: [provideState('weather', weatherReducer),provideEffects(WeatherEffects)]
      }
];
