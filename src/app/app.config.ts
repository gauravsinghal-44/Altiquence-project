import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/store/counter.reducer';
import { provideHttpClient } from '@angular/common/http';
import { weatherReducer } from './weather/store/weather.reducer';
import { provideEffects } from '@ngrx/effects';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore({
        counter: counterReducer,
        weather: weatherReducer
    }),
    // importProvidersFrom(
    //   StoreModule.forRoot({ weather: weatherReducer })),
    provideHttpClient(), provideEffects()]
};

//importProvidersFrom(
  // StoreModule.forRoot({ counter: counterReducer })
