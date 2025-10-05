// ForecastParams
export interface ForecastParams {
  q: string;
  days: number;
  aqi: string;
  alerts: string;
  key: string;
}

// ForecastResult

export interface ForecastLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface ForecastDay {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

export interface ForecastDayItem {
  date: string;
  date_epoch: number;
  day: ForecastDay;
}

export interface ForecastResult {
  location: ForecastLocation;
  forecast: {
    forecastday: ForecastDayItem[];
  };
}
