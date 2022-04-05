import * as React from 'react';
import ResourcesChartTooltip from './ResourcesChartTooltip';
import { PerfData } from './PerfDataContext';
import Chart, { ChartDataSeries } from './Chart';
import { ResourcesChartValues } from './ResourcesChartValues';

export type ResourcesChartProps = {
  perfData: PerfData;
  filter: ResourcesChartValues[];
};

function hashCode(str) {
  // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}

const ResourcesChart: React.FC<ResourcesChartProps> = ({ perfData, filter = [] }) => {
  const dataSeries: ChartDataSeries[] = filter.map(d => ({
    name: d,
    data: `flamegrill.profile.metrics.${d}`,
    color: intToRGB(hashCode(d)),
  }));

  return <Chart perfData={perfData} group="performance" Tooltip={ResourcesChartTooltip} dataSeries={dataSeries} />;
};

export default ResourcesChart;
