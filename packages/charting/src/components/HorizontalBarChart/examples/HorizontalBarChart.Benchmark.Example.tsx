import * as React from 'react';
import { HorizontalBarChart, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const HorizontalBarChartBenchmarkExample: React.FunctionComponent<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [{ legend: 'one', data: 50, horizontalBarChartdata: { x: 10, y: 100 }, color: DefaultPalette.tealDark }]
    },
    {
      chartTitle: 'two',
      chartData: [{ legend: 'two', data: 30, horizontalBarChartdata: { x: 30, y: 200 }, color: DefaultPalette.purple }]
    },
    {
      chartTitle: 'three',
      chartData: [{ legend: 'three', data: 5, horizontalBarChartdata: { x: 15, y: 50 }, color: DefaultPalette.redDark }]
    }
  ];

  return <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} chartDataMode="fraction" />;
};
