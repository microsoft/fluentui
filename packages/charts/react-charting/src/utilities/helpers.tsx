import * as React from 'react';
import { DonutChart, IDonutChartProps } from '../components/DonutChart/index';
import { IChartProps } from '../types/IDataPoint';
import { getNextColor } from './colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformPlotlyJsonToDonutProps = (obj: any): IDonutChartProps => {
  const donutData: IChartProps = {
    chartTitle: obj.layout.title,
    chartData: (obj.data[0].labels as string[]).map((label, index) => {
      return {
        legend: label,
        data: obj.data[0].values[index] as number,
        color: getNextColor(index),
      };
    }),
  };

  return {
    data: donutData,
    hideLegend: !obj.layout.showlegend,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderChartFromPlotlyJson = (obj: any): React.ReactNode => {
  switch (obj.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(obj)} />;
    default:
      return null;
  }
};
