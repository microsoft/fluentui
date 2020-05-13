import * as React from 'react';
import { PerfChart, usePerfData, ComponentChart } from '../PerfChart';
import { Checkbox } from '@fluentui/react-northstar';

const ExtremesFilter = ({ onChange }) => (
  <Checkbox label="Show extremes" onChange={(e, { checked }) => onChange({ extremes: checked })} />
);

export const ComponentPerfChart = ({ perfTestName }) => {
  const data = usePerfData(perfTestName);
  return <ComponentChart chartData={data} Chart={PerfChart} Filter={ExtremesFilter} />;
};
