import { createQueryString, logger } from '@src/utils';
import { API_METHODS } from './appServices.type';
import { ServicesEndPoints } from './appServicesEndPoints';
import {
  ForecastResponseDTO,
  GetForecastResponseAdapter,
  GetSearchResponseAdapter,
  GetWeatherResponseAdapter,
  SearchResponseDTO,
  WeatherResponseDTO,
} from './commercial';
import {
  ForecastParams,
  ForecastResult,
  SearchParams,
  SearchResult,
  WeatherParams,
  WeatherResult,
} from './models';
import serviceAdapter from './serviceAdapter';
import { OpenWeatherAPI, WeatherAPI } from './apiHandler';

export class AppServices {
  constructor() {}

  getWeather = async (weatherParams: WeatherParams): Promise<WeatherResult> => {
    const queryString = createQueryString(weatherParams);
    return new Promise((resolve, reject) => {
      serviceAdapter<WeatherResponseDTO, WeatherParams>(
        OpenWeatherAPI,
        API_METHODS.GET,
        `${ServicesEndPoints.WEATHER}${queryString}`
      )
        .then(res => {
          resolve(new GetWeatherResponseAdapter().service(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getForecast = async (
    forecastParams: ForecastParams
  ): Promise<ForecastResult> => {
    const queryString = createQueryString(forecastParams);
    return new Promise((resolve, reject) => {
      serviceAdapter<ForecastResponseDTO, ForecastParams>(
        WeatherAPI,
        API_METHODS.GET,
        `${ServicesEndPoints.FORECAST}${queryString}`
      )
        .then(res => {
          resolve(new GetForecastResponseAdapter().service(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  searchCity = async (SearchParams: SearchParams): Promise<SearchResult[]> => {
    const queryString = createQueryString(SearchParams);
    return new Promise((resolve, reject) => {
      serviceAdapter<SearchResponseDTO[], SearchParams>(
        WeatherAPI,
        API_METHODS.GET,
        `${ServicesEndPoints.SEARCH}${queryString}`
      )
        .then(res => {
          resolve(new GetSearchResponseAdapter().service(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export const appServices = new AppServices();
