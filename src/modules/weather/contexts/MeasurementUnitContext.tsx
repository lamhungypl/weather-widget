import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { environment } from '../../../core/environment';

export enum MeasurementUnit {
  Standard = 'Standard', // Kelvin and meter/sec
  Metric = 'Metric', // Celsius and meter/sec
  Imperial = 'Imperial', // Fahrenheit and miles/hour
}

export type MeasurementUnitDispatch = (value: MeasurementUnit) => void;

const MeasurementUnitValueContext = createContext<MeasurementUnit>(
  MeasurementUnit.Metric,
);

export const MeasurementUnitDispatchCtx =
  createContext<MeasurementUnitDispatch>(() => {});

interface Props {
  children?: ReactNode;
}

export const MeasurementUnitProvider: FC<Props> = ({ children }) => {
  const [unit, setUnit] = useState<MeasurementUnit>(MeasurementUnit.Metric);
  return (
    <MeasurementUnitValueContext.Provider value={unit}>
      <MeasurementUnitDispatchCtx.Provider value={setUnit}>
        {children}
      </MeasurementUnitDispatchCtx.Provider>
    </MeasurementUnitValueContext.Provider>
  );
};

export const useMeasurementUnitValue = () => {
  const value = useContext<MeasurementUnit>(MeasurementUnitValueContext);
  if (!value && environment.app.mode === 'development') {
    throw Error('useContext must be used within a Provider');
  }
  return value;
};
export const useMeasurementUnitDispatch = () => {
  const dispatch = useContext<MeasurementUnitDispatch>(
    MeasurementUnitDispatchCtx,
  );
  if (!dispatch && environment.app.mode === 'development') {
    throw Error('useContext must be used within a Provider');
  }
  return dispatch;
};
