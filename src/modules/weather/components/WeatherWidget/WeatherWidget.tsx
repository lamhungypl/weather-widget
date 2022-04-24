import clsx from 'clsx';
import { format } from 'date-fns';
import React from 'react';

import {
  MeasurementUnit,
  useMeasurementUnitDispatch,
  useMeasurementUnitValue,
} from '../../contexts';
import { temperatureRounded } from '../../utils/conversions';
import {
  degreeToDescription,
  qualityIndexToQualitativeName,
} from '../../utils/transformWeatherData';
import WeatherIcon from '../WeatherIcon';

export interface WeatherWidgetData {
  dt: number;
  name: string;
  country: string;
  description: string;
  icon: string;
  temp: number;
  wind_speed: number;
  wind_deg: number;
  aqi: number;
  humidity: number;
}
interface WeatherWidgetProps {
  data: WeatherWidgetData;
  isCurrent: boolean;
}
const WeatherWidget = ({ data, isCurrent }: WeatherWidgetProps) => {
  const unit = useMeasurementUnitValue();
  const changeUnit = useMeasurementUnitDispatch();

  const {
    dt,
    name,
    country,
    description,
    icon,
    temp,
    wind_speed,
    wind_deg,
    aqi,
    humidity,
  } = data;

  const handleChangeUnitImperial = () => {
    changeUnit(MeasurementUnit.Imperial);
  };
  const handleChangeUnitMetric = () => {
    changeUnit(MeasurementUnit.Metric);
  };
  return (
    <div>
      <div className="p-5">
        <div className="font-bold">{`${name}, ${country}`}</div>
        <div className="text-[#666]">
          {`${format(new Date(dt * 1000), 'EEEE ha')} • ${description}`}
        </div>
      </div>
      <div className="flex px-5 pt-2 pb-4">
        <div className="flex-grow">
          <div className="flex items-center space-x-4">
            <div>
              <WeatherIcon className="w-16 h-16" icon={icon} size="2x" />
            </div>
            <div className="flex items-start">
              <div className="font-bold text-[44px]">
                {temperatureRounded(temp)}°
              </div>
              <div className="font-bold flex items-center">
                <div
                  className={clsx('cursor-pointer', {
                    'text-[#888888]': unit !== MeasurementUnit.Imperial,
                  })}
                  onClick={handleChangeUnitImperial}
                >
                  F
                </div>
                <span className="mx-2">{'/'}</span>
                <div
                  className={clsx('cursor-pointer', {
                    'text-[#888888]': unit !== MeasurementUnit.Metric,
                  })}
                  onClick={handleChangeUnitMetric}
                >
                  C
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-end items-start">
          <div>Humidity: {humidity}%</div>
          <div>
            Wind: {wind_speed} M/S {degreeToDescription(wind_deg)}
          </div>
          {isCurrent && (
            <div>Air Quality: {qualityIndexToQualitativeName(aqi)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
