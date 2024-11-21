/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DonutChart, IDonutChartProps } from '../components/DonutChart/index';
import { IChartProps, IVerticalStackedChartProps } from '../types/IDataPoint';
import { getNextColor } from './colors';
import { IVerticalStackedBarChartProps, VerticalStackedBarChart } from '../components/VerticalStackedBarChart/index';

const transformPlotlyJsonToDonutProps = (obj: any): IDonutChartProps => {
  const donutData: IChartProps = {
    chartTitle: obj.layout.title,
    chartData: obj.data[0].labels.map((label: string, index: number) => {
      return {
        legend: label,
        data: obj.data[0].values[index],
        color: obj.data[0].marker?.color || getNextColor(index),
      };
    }),
  };

  // const width: number = obj.layout.width;
  // const height: number = obj.layout.height;
  // const innerRadius: number = (Math.min(width, height) * obj.data[0].hole) / 2;

  return {
    data: donutData,
    hideLegend: !obj.layout.showlegend,
    // width,
    // height,
    // innerRadius,
  };
};

const transformPlotlyJsonToColumnProps = (obj: any): IVerticalStackedBarChartProps => {
  const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
  let yMaxValue = 0;

  obj.data.forEach((series: any, index1: number) => {
    series.x.forEach((x: string | number, index2: number) => {
      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { xAxisPoint: x, chartData: [], lineData: [] };
      }
      if (series.type === 'bar') {
        mapXToDataPoints[x].chartData.push({
          legend: series.name,
          data: series.y[index2],
          color: series.marker?.color || getNextColor(index1),
        });
      } else if (series.type === 'line') {
        mapXToDataPoints[x].lineData!.push({
          legend: series.name,
          y: series.y[index2],
          color: series.marker?.color || getNextColor(index1),
        });
      }
      yMaxValue = Math.max(yMaxValue, series.y[index2]);
    });
  });

  return {
    data: Object.values(mapXToDataPoints),
    chartTitle: obj.layout.title,
    // width: obj.layout.width,
    // height: obj.layout.height,
    barWidth: 'auto',
    yMaxValue,
  };
};

export const renderChartFromPlotlyJson = (obj: any): React.ReactNode => {
  switch (obj.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(obj)} />;
    case 'bar':
      return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(obj)} />;
    default:
      return null;
  }
};
