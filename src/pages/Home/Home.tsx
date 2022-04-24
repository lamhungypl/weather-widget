import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Input from '../../modules/@shared/components/Input';
import WeatherCard from '../../modules/weather/components/WeatherCard';
import WeatherNotFound from '../../modules/weather/components/WeatherNotFound';
import { useWeatherService } from '../../modules/weather/services/useWeatherService';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParams = searchParams.get('city') || '';
  const [count, setCount] = useState(cityParams);
  const { data } = useWeatherService({
    city: cityParams,
  });
  const handleEnter = () => {
    setSearchParams({ city: count });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-20">
        <div className="mb-3">
          <Input
            placeholder="City name"
            value={count}
            onChange={(value) => setCount(value)}
            onEnterPress={handleEnter}
            clearable
          />
        </div>
        {!!data ? (
          <WeatherCard
            geocoding={data.geocoding}
            weatherCurrent={data.weatherOneCall}
            airPollution={data.airPollution}
          />
        ) : (
          <WeatherNotFound />
        )}
      </div>
    </div>
  );
};

export default Home;
