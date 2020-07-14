import * as React from 'react';
import PerfChartTooltip from './PerfChartTooltip';
import { PerfData } from './PerfDataContext';
import Chart, { ChartDataSeries } from './Chart';
// This is a dependency of react-vis which we don't want to add separately
// eslint-disable-next-line import/no-extraneous-dependencies
import { curveBundle } from 'd3-shape';

export type PerfChartProps = { perfData: PerfData; filter: { extremes: boolean } };

/**
 * Draws a performance chart for all items in perfData.performance.
 * Shows tooltip with details for selected build on mouse hover.
 * x-axis is a build number
 * y-axis is a render time
 */

const maxColor = '#ff8080';
const medColor = '#555555';
const tpiColor = '#387fc2';
const minColor = '#59b359';

const PerfChart: React.FC<PerfChartProps> = ({ perfData, filter }) => {
  const dataSeries: ChartDataSeries[] = [
    filter?.extremes && {
      name: 'max',
      data: 'actualTime.max',
      color: maxColor,
      props: {
        opacity: 0.5,
        strokeStyle: 'dashed',
        curve: curveBundle.beta(0.5),
      },
    },
    {
      name: 'median',
      data: 'actualTime.median',
      color: medColor,
      props: {
        opacity: 0.8,
        strokeWidth: '2px',
      },
    },
    filter?.extremes && {
      name: 'min',
      data: 'actualTime.min',
      color: minColor,
      props: {
        opacity: 0.5,
        strokeStyle: 'dashed',
        curve: curveBundle.beta(1),
      },
    },
    {
      name: 'tpi',
      data: 'flamegrill.extended.tpi',
      color: tpiColor,
      props: {
        opacity: 0.8,
        strokeWidth: '2px',
      },
    },
  ].filter(Boolean);

  return (
    <Chart perfData={perfData} group="performance" Tooltip={PerfChartTooltip} dataSeries={dataSeries} yAxisLabel="ms" />
  );
};

export default PerfChart;
