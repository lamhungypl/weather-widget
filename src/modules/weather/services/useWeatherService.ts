import { useQuery } from 'react-query';

import {
  getAirPollution,
  getGeocoding,
  getWeatherOneCall,
} from '../apis/weatherAPI';

interface UseWeatherServiceProps {
  city: string;
}

const WEATHER = 'WEATHER';

export const useWeatherService = ({ city }: UseWeatherServiceProps) => {
  return useQuery(
    [WEATHER, city],
    async () => {
      const [geocodeData] = await getGeocoding(city);
      const { lat, lon } = geocodeData;
      const [weatherOneCallData, airPollutionData] = await Promise.all([
        getWeatherOneCall(lat, lon),
        getAirPollution(lat, lon),
      ]);
      return {
        geocoding: geocodeData,
        weatherOneCall: weatherOneCallData,
        airPollution: airPollutionData,
      };
    },
    { enabled: !!city, keepPreviousData: true },
  );
};
