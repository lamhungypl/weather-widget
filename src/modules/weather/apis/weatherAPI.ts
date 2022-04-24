import { environment } from '../../../core/environment';
import {
  GeocodingData,
  AirPollutionData,
  WeatherOneCallData,
} from '../schemas';

//FIXME: CORS error when using axios client
export const getGeocoding = async (
  city: string,
  limit?: number,
): Promise<GeocodingData[]> => {
  const response = await fetch(
    `${environment.endPoint.apiBaseUrl}/geo/1.0/direct?q=${city}&limit=${
      limit || 1
    }&appId=${environment.app.apiKey}`,
  );
  return (await response.json()) as GeocodingData[];
};
export const getWeatherOneCall = async (
  lat: number,
  lon: number,
  part?: string,
) => {
  const response = await fetch(
    `${environment.endPoint.apiBaseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${environment.app.apiKey}&units=metric`,
  );
  return (await response.json()) as WeatherOneCallData;
};

export const getAirPollution = async (lat: number, lon: number) => {
  const response = await fetch(
    `${environment.endPoint.apiBaseUrl}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.app.apiKey}`,
  );
  return (await response.json()) as AirPollutionData;
};
