import * as React from 'react';
import { BundleSizeChart, useBundleSizeData, ComponentChart } from '../PerfChart';

export const ComponentBundleSizeChart = ({ bundleSizeTestName }) => {
  const data = useBundleSizeData(bundleSizeTestName);
  return <ComponentChart chartData={data} Chart={BundleSizeChart} />;
};
