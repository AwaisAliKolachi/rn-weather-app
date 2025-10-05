import { isNetworkConnected } from '@src/utils';
import { APIhandler } from './apiHandler';
import { API_METHODS } from './appServices.type';

export default async function serviceAdapter<T, reqParams>(
  apiHandler: APIhandler,
  method: API_METHODS,
  url: string,
  requestParam?: reqParams
): Promise<T> {
  const status = await isNetworkConnected();
  if (status) {
    if (method.toString() === API_METHODS.GET) {
      return apiHandler.getAPIService(url);
    } else if (method.toString() === API_METHODS.DELETE) {
      return apiHandler.deleteAPIService(url, requestParam);
    } else if (method.toString() === API_METHODS.PUT) {
      return apiHandler.putAPIService(url, requestParam);
    } else if (method.toString() === API_METHODS.POST) {
      return apiHandler.postAPIService(url, requestParam);
    } else {
      return Promise.reject(new Error('REST METHOD DOES NOT EXIST'));
    }
  } else {
    return Promise.reject(new Error("You're offline!"));
  }
}
