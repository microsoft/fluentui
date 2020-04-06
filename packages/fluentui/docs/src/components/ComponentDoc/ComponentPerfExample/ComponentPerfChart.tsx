import * as React from 'react';
import { PerfChart, usePerfData, ComponentChart } from '../PerfChart';

export const ComponentPerfChart = ({ perfTestName }) => {
  const data = usePerfData(perfTestName);
  return <ComponentChart chartData={data} Chart={PerfChart} />;
};
