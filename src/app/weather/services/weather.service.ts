import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly API_KEY = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  // Fetch current weather for city
  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric`;
    return this.http.get(url);
  }

  // Fetch 5-day forecast for selected city
  getForecast(city: string): Observable<any> {
    const url = `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=metric`;
    return this.http.get(url);
  }
}
