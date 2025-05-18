import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {selectRecentCities} from '../../store/weather.selectors';
import { addCity, clearAllCities, loadForecast, refreshCity, removeCity, selectCityForForecast } from '../../store/weather.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  cityName = '';
  errorMessage = '';
  recentCities$: Observable<{ name: string; temp: number; icon: string; description: string }[]>;
  isDataNotEmpty:Boolean = false;

  constructor(
    private weatherService: WeatherService,
    private store: Store
  ) {
    this.recentCities$ = this.store.select(selectRecentCities);
  }

  addCity() {
    const city = this.cityName.trim();
    if (!city) return;

    this.weatherService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.errorMessage = '';
        const cityData = {
          name: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          description: data.weather[0].description
        };
        this.store.dispatch(addCity({ city: cityData }));
        this.cityName = '';
      },
      error: () => {
        this.errorMessage = 'City not found. Please try again.';
      }
    });
  }

  refreshCity(cityName:string) {
    this.store.dispatch(refreshCity({  cityName }));
  }

  removeCity(cityName: string) {
    this.store.dispatch(removeCity({ cityName }));
  }

  clearAll() {
    this.store.dispatch(clearAllCities());
  }

  selectCity(cityName: string) {
    this.store.dispatch(selectCityForForecast({ cityName }));
    this.store.dispatch(loadForecast({ cityName }));
  }
}

