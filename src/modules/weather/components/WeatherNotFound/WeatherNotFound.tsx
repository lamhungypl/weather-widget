import clsx from 'clsx';

import NotFoundIcon from '../WeatherIcon/NotFoundIcon';

type Props = {};

const WeatherNotFound = (props: Props) => {
  return (
    <div
      className={clsx(
        'bg-white flex flex-col items-center p-8',
        'border border-[rgba(150_150_150_0.3)] shadow-[0px_2px_2px_rgba(0_0_0_0.25)] rounded-[4px]',
      )}
    >
      <NotFoundIcon className="w-40 h-40" />
      <p className="text-center mt-4">
        We could not find weather information for the location above
      </p>
    </div>
  );
};

export default WeatherNotFound;
