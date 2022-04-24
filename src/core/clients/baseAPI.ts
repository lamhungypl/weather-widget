import { createAPIClient } from '../createAPIClient';
import { environment } from '../environment';

export const baseAPI = createAPIClient(environment.endPoint.apiBaseUrl, true, {
  maxRedirects: 0,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Request-Headers': 'Content-Type',
  },
  params: {
    appid: environment.app.apiKey,
  },
});
