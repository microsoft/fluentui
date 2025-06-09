import * as React from 'react';
import {
  createNumericXAxis as originalCreateNumericXAxis,
  createStringXAxis as originalCreateStringXAxis,
  createDateXAxis as originalCreateDateXAxis,
} from '../../../utilities/utilities';

export const useAxis = () => {
  const xAxisElement = React.useRef<SVGSVGElement | null>(null);
  const yAxisElement = React.useRef<SVGSVGElement | null>(null);
  const yAxisElementSecondary = React.useRef<SVGSVGElement | null>(null);

  const createNumericXAxis = (xAxisParams, chartType, culture) => {
    return originalCreateNumericXAxis({ ...xAxisParams, xAxisElement: xAxisElement.current }, chartType, culture);
  };

  const createStringXAxis = (xAxisParams, tickParams, dataset, culture) => {
    return originalCreateStringXAxis(
      { ...xAxisParams, xAxisElement: xAxisElement.current },
      tickParams,
      dataset,
      culture,
    );
  };

  const createDateXAxis = (
    xAxisParams,
    tickParams,
    culture,
    options,
    timeFormatLocale,
    customDateTimeFormatter,
    useUTC,
  ) => {
    return originalCreateDateXAxis(
      { ...xAxisParams, xAxisElement: xAxisElement.current },
      tickParams,
      culture,
      options,
      timeFormatLocale,
      customDateTimeFormatter,
      useUTC,
    );
  };

  return {
    xAxisElement,
    yAxisElement,
    yAxisElementSecondary,
    createNumericXAxis,
    createStringXAxis,
    createDateXAxis,
  };
};
