interface Temp {
  morn: string;
  day: string;
  eve: string;
  night: string;
  min: number;
  max: number;
}
interface FeelsLike {
  morn: string;
  day: string;
  eve: string;
  night: string;
  min: string;
  max: string;
}

interface Rain {
  '1h': string;
}
interface Snow {
  '1h': string;
}

interface Weather {
  id: string;
  main: string;
  description: string;
  icon: string;
}

interface DataBlock {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number | Temp;
  feels_like: number | FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  uvi: number;
  rain: string | Rain;
  snow: string | Snow;
}

interface Minutely {
  dt: string;
  precipitation: string;
}

interface Hourly extends DataBlock {
  feels_like: number;
  visibility: string;
  pop: string;
  rain: Rain;
  snow: Snow;
}

export interface Daily extends DataBlock {
  moonrise: string;
  moonset: string;
  moon_phase: string;
  temp: Temp;
  feels_like: FeelsLike;
  pop: string;
  rain: string;
  snow: string;
}

export interface Current extends DataBlock {
  temp: number;
  feels_like: number;
  visibility: number;
  rain: Rain;
  snow: Snow;
}
interface Alerts {
  sender_name: string;
  event: string;
  start: string;
  end: string;
  description: string;
  tags: string;
}
export interface WeatherOneCallData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: string;
  current: Current;
  minutely: Minutely;
  hourly: Hourly[];
  daily: Daily[];
  alerts: Alerts;
}
