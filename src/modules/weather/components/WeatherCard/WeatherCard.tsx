import { isSameDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMeasurementUnitValue } from '../../contexts';
import {
  WeatherOneCallData,
  AirPollutionData,
  GeocodingData,
  Current,
  Daily,
} from '../../schemas';
import { transformWeatherData } from '../../utils/transformWeatherData';
import WeatherWidget from '../WeatherWidget';
import { WeatherWidgetData } from '../WeatherWidget/WeatherWidget';
import WeekDayItem from '../WeekDayItem';

export interface WeatherCardProps {
  geocoding: GeocodingData;
  weatherCurrent: WeatherOneCallData;
  airPollution: AirPollutionData;
}

const WeatherCard = ({
  geocoding,
  weatherCurrent,
  airPollution,
}: WeatherCardProps) => {
  const measureUnit = useMeasurementUnitValue();
  const { daily } = weatherCurrent;

  const [selectedData, setSelectedData] = useState<Current | Daily>(
    weatherCurrent.current,
  );

  const data: WeatherWidgetData = transformWeatherData(
    {
      geocoding,
      weatherData: selectedData,
      airPollution,
    },
    measureUnit,
  );

  const checkSameDay = useMemo(() => {
    return isSameDay(
      new Date(weatherCurrent.current.dt * 1000),
      new Date(selectedData.dt * 1000),
    );
  }, [selectedData.dt, weatherCurrent]);

  const handleClickWeekdayItem = useCallback(
    (item: Daily) => {
      if (
        isSameDay(
          new Date(weatherCurrent.current.dt * 1000),
          new Date(item.dt * 1000),
        )
      ) {
        setSelectedData(weatherCurrent.current);
      } else {
        setSelectedData(item);
      }
    },
    [weatherCurrent],
  );

  useEffect(() => {
    setSelectedData(weatherCurrent.current);
  }, [weatherCurrent]);

  return (
    <div className="bg-white border border-[rgba(150_150_150_0.3)] shadow-[0px_2px_2px_rgba(0_0_0_0.25)] rounded-[4px]">
      <WeatherWidget data={data} isToday={checkSameDay} />
      <div className="flex items-stretch justify-between">
        {daily.map((dayItem, index) => {
          return (
            <WeekDayItem
              key={index}
              data={dayItem}
              onClickItem={handleClickWeekdayItem}
              isActive={isSameDay(
                new Date(selectedData.dt * 1000),
                new Date(dayItem.dt * 1000),
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeatherCard;
