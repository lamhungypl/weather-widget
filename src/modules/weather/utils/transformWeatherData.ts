import { WeatherWidgetData } from '../components/WeatherWidget/WeatherWidget';
import {
  AirPollutionData,
  Current,
  Daily,
  GeocodingData,
  WeatherOneCallData,
} from '../schemas';

export enum DegreeDescription {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
  North_East = 'North East',
  North_West = 'North West',
  South_East = 'South East',
  South_West = 'North',
}

export const degreeToDescription = (degree: number) => {
  switch (degree) {
    default:
      return DegreeDescription.North_East;
  }
};

export const qualityIndexToQualitativeName = (index) => {
  switch (index) {
    case 1: {
      return 'Good';
    }
    case 2: {
      return 'Fair';
    }
    case 3: {
      return 'Moderate';
    }
    case 4: {
      return 'Poor';
    }
    case 5: {
      return 'Very Poor';
    }

    default:
      return 'Moderate';
  }
};

export const transformWeatherData = ({
  geocoding,
  weatherData,
  airPollution,
}: {
  geocoding: GeocodingData;
  weatherData: Current | Daily;
  airPollution: AirPollutionData;
}): WeatherWidgetData => {
  const { name, country } = geocoding;
  const { dt, weather, temp, humidity, wind_speed, wind_deg } = weatherData;
  const { list } = airPollution;
  const { description, icon } = weather[0];
  const {
    main: { aqi },
  } = list[0];

  return {
    dt: dt,
    name: name,
    country: country,
    description: description,
    icon: icon,
    temp: typeof temp === 'number' ? temp : temp.max,
    wind_speed: wind_speed,
    wind_deg: wind_deg,
    aqi: aqi,
    humidity: humidity,
  };
};
