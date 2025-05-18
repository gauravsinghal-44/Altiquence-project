import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DayForecast, TodayForecast } from '../../store/weather.state';
import { Store } from '@ngrx/store';
import { selectTodayForecast, selectFiveDayForecast, selectSelectedCity } from '../../store/weather.selectors';
import { CommonModule } from '@angular/common';
import { refreshCity } from '../../store/weather.actions';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css',
  standalone:true
})
export class RightPanelComponent {
  selectedCity$: Observable<string | null>;
  todayForecast$: Observable<TodayForecast | undefined | null>;
  fiveDayForecast$: Observable<DayForecast[]>;

  constructor(private store: Store) {
    this.selectedCity$ = this.store.select(selectSelectedCity);
    this.todayForecast$ = this.store.select(selectTodayForecast);
    this.fiveDayForecast$ = this.store.select(selectFiveDayForecast);
  }

  getIconUrl(iconCode: string): string {
    return `https://www.amcharts.com/wp-content/themes/amcharts4/css/img/weather/${iconCode}.svg`;
  }

  refreshCity(cityName:string) {
      this.store.dispatch(refreshCity({  cityName }));
    }
}
