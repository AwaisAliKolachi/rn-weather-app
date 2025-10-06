import { ForecastDay, ForecastLocation } from '@src/services/models';

export interface ForecastResponseDTO {
  location: ForecastLocation;
  forecast: {
    forecastday: {
      date: string;
      date_epoch: number;
      day: ForecastDay;
    }[];
  };
}
