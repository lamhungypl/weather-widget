import { mod } from '../../@shared/utils/math';
import { WeatherWidgetData } from '../components/WeatherWidget/WeatherWidget';
import { MeasurementUnit } from '../contexts';
import { AirPollutionData, Current, Daily, GeocodingData } from '../schemas';

import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  mpsToKph,
  mpsToMph,
} from './conversions';

export const degreeToDescription = (degree: number) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const dirIndex = mod(Math.round(degree / (360 / 8)), 8);

  return dirs[dirIndex];
};

export const speedToDescription = (speed: number, unit: MeasurementUnit) => {
  if (unit === MeasurementUnit.Imperial) {
    return mpsToMph(speed);
  }
  return mpsToKph(speed);
};

export const temperatureToDescription = (
  temp: number,
  unit: MeasurementUnit = MeasurementUnit.Metric,
) => {
  if (unit === MeasurementUnit.Imperial) {
    return celsiusToFahrenheit(temp);
  }
  if (unit === MeasurementUnit.Standard) {
    return celsiusToKelvin(temp);
  }
  return Math.round(temp);
};

export const qualityIndexToQualitativeName = (index: number) => {
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

export const transformWeatherData = (
  {
    geocoding,
    weatherData,
    airPollution,
  }: {
    geocoding: GeocodingData;
    weatherData: Current | Daily;
    airPollution: AirPollutionData;
  },
  unit?: MeasurementUnit,
): WeatherWidgetData => {
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
