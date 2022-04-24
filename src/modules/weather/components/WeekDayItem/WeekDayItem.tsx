import clsx from 'clsx';
import { format } from 'date-fns';
import React from 'react';

import { useMeasurementUnitValue } from '../../contexts';
import { Daily } from '../../schemas';
import { temperatureToDescription } from '../../utils/transformWeatherData';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
interface WeekDayItemProps {
  isActive?: boolean;
  data: Daily;
  onClickItem: (item: Daily) => void;
}

const WeekDayItem = ({ isActive, data, onClickItem }: WeekDayItemProps) => {
  const unit = useMeasurementUnitValue();

  const {
    dt,
    temp: { max, min },
    weather,
  } = data;
  const { icon } = weather[0];

  const handleClickItem = () => {
    onClickItem(data);
  };

  return (
    <div
      onClick={handleClickItem}
      className={clsx(
        'flex flex-col items-center flex-grow cursor-pointer font-bold',
        'pt-5  pb-4 border border-[#969696] hover:bg-[#f7f7f7CC]',
        {
          'bg-[#F7F7F7]': isActive,
        },
      )}
    >
      <div>{format(new Date(dt * 1000), 'EEE')}</div>
      <WeatherIcon className="my-3" icon={icon} />
      <p className="font-bold text-[18px]">
        {temperatureToDescription(max, unit)}°
      </p>
      <p>{temperatureToDescription(min, unit)}°</p>
    </div>
  );
};

export default React.memo(WeekDayItem);
