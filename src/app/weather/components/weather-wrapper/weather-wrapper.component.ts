import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';

@Component({
  selector: 'app-weather-wrapper',
  imports: [SidebarComponent,RightPanelComponent],
  templateUrl: './weather-wrapper.component.html',
  styleUrl: './weather-wrapper.component.css'
})
export class WeatherWrapperComponent {

}
