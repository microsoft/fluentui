import * as React from 'react';
import { HorizontalBarChart, IChartProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';

export const HorizontalBarChartBenchmarkExample: React.FunctionComponent<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          data: 50,
          horizontalBarChartdata: { x: 10, y: 100 },
          color: getColorFromToken(DataVizPalette.color25),
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          data: 30,
          horizontalBarChartdata: { x: 30, y: 200 },
          color: getColorFromToken(DataVizPalette.color26),
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          data: 5,
          horizontalBarChartdata: { x: 15, y: 50 },
          color: getColorFromToken(DataVizPalette.color27),
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart data={data} hideRatio={hideRatio} chartDataMode="fraction" />
    </div>
  );
};
