// WeatherParams

export enum WeatherUnits {
  METRIC = 'metric',
  IMPERIAL = 'imperial',
  STANDARD = 'standard',
}

export interface WeatherParams {
  lat: number;
  lon: number;
  units: WeatherUnits;
  appId: string;
}

export interface WeatherResult {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional as it might not always be present
    grnd_level?: number; // Optional as it might not always be present
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number; // Optional
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
