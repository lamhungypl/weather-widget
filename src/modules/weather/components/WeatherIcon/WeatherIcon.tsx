import React from 'react';

type NativeImageProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLImageElement> &
  React.ImgHTMLAttributes<HTMLImageElement>;

interface WeatherIconProps extends NativeImageProps {
  icon: string;
  size?: '1x' | '2x';
}

const WeatherIcon = ({ icon, size = '1x', ...rest }: WeatherIconProps) => {
  const iconUrl = size === '1x' ? icon : `${icon}@${size}`;
  const imgSrc = `http://openweathermap.org/img/wn/${iconUrl}.png`;
  return <img alt="weather-icon" src={imgSrc} {...rest} />;
};

export default React.memo(WeatherIcon);
