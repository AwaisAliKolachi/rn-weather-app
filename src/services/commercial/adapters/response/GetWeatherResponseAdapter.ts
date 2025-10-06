import { WeatherResult } from '@src/services/models';
import { WeatherResponseDTO } from '../../dtos';

export class GetWeatherResponseAdapter {
  constructor() {}

  service(dto: WeatherResponseDTO): WeatherResult {
    return {
      coord: {
        lon: dto.coord.lon,
        lat: dto.coord.lat,
      },
      weather: dto.weather,
      main: dto.main,
      visibility: dto.visibility,
      wind: dto.wind,
      dt: dto.dt,
      sys: dto.sys,
      timezone: dto.timezone,
      id: dto.id,
      name: dto.name,
      cod: dto.cod,
    };
  }
}
