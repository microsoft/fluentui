import * as React from 'react';
import { BenchmarkBarChart, IChartingProps } from '@uifabric/charting';

export const BenchmarkBarChartBasicExample: React.SFC<{}> = () => {
  const data: IChartingProps = {
    chartTitle: 'Benchmark Bar chart example',
    data: 30,
    benchmarkData: 60,
    totalData: 100
  };

  return <BenchmarkBarChart data={data} />;
};
