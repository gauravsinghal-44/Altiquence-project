export interface City {
    name: string;
    temp: number;
    icon: string;
    description: string;
  }
  

  export interface TodayForecast {
    icon: string;
    temp: number;
    description: string;
    windSpeed: number;
    windDeg: number;
    pressure: number;
  }
  
  export interface DayForecast {
    date: string;       
    weekday: string;    
    icon: string;
    temp: number;
  }
  
  export interface WeatherState {
    recentCities: City[];
    selectedCity: string | null;
    todayForecast?: TodayForecast | null;
    fiveDayForecast: DayForecast[];
    error?: string;
  }
  
  export const initialWeatherState: WeatherState = {
    recentCities: [],
    selectedCity: null,
    todayForecast: null,
    fiveDayForecast: [],
    error: ''
  };
  