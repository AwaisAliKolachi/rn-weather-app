import { AppConfig } from '@src/constants';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class APIhandler {
  private readonly axiosInstance: AxiosInstance;
  private readonly axiosHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: this.axiosHeaders,
      timeout: 10000,
      timeoutErrorMessage: 'Slow Network',
      validateStatus(status) {
        return (
          (status >= 200 && status < 300) || status === 400 || status === 401
        );
      },
    });
    // ***** Uncomment lines for debugging Request *****
    // this.axiosInstance.interceptors.request.use(req => {
    //   if (__DEV__) {
    //     // eslint-disable-next-line no-console
    //     console.log(
    //       '⛔️⛔️⛔️ this.axiosInstance.interceptors.request: ',
    //       JSON.stringify(req, null, ' ')
    //     );
    //   }
    //   return req;
    // });

    //***** Uncomment lines for debugging Response  *****
    // this.axiosInstance.interceptors.response.use(res => {
    //   if (__DEV__) {
    //     // eslint-disable-next-line no-console
    //     console.log(
    //       '🚀🚀🚀🚀 this.axiosInstance.interceptors.response: ',
    //       JSON.stringify(res, null, ' ')
    //     );
    //   }
    //   return res;
    // });
  }

  requestHeader = () => {
    return {
      // Authorization: `Bearer `,
    };
  };

  handleBodyResponse = async (response: AxiosResponse): Promise<any> => {
    if (response.status === 200) {
      return Promise.resolve(JSON.parse(JSON.stringify(response.data)));
    } else if (response.status === 400) {
      return Promise.reject({
        cause: response.status.toString(),
        message: response.data.message,
      } as Error);
    } else if (response.status === 401) {
      return Promise.reject({
        cause: response.status.toString(),
        message: 'Your session has been expired..!!! please login again...',
      } as Error);
    } else {
      return Promise.reject({
        cause: response.status.toString(),
        message: response.statusText,
      } as Error);
    }
  };

  postAPIService = async (api: string, reqParams: any): Promise<any> => {
    try {
      const response = await this.axiosInstance.post<any>(api, reqParams, {
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  async getAPIService(api: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(api, {
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  deleteAPIService = async (api: string, reqParams: any = {}): Promise<any> => {
    try {
      const response = await this.axiosInstance.delete<any>(api, {
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
        params: reqParams,
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  putAPIService = async (api: string, reqParams: any = {}): Promise<any> => {
    try {
      const response = await this.axiosInstance<any>({
        data: reqParams,
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
        method: 'PUT',
        url: api,
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

const OpenWeatherAPI = new APIhandler(AppConfig.OPEN_WEATHER_API_URL);
const WeatherAPI = new APIhandler(AppConfig.WEATHER_API_URL);

export { APIhandler, OpenWeatherAPI, WeatherAPI };
