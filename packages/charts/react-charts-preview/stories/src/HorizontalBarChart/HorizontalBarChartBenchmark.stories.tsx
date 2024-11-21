import * as React from 'react';
import {
  HorizontalBarChart,
  ChartProps,
  DataVizGradientPalette,
  getGradientFromToken,
} from '@fluentui/react-charts-preview';

export const HorizontalBarBenchmark = () => {
  const hideRatio: boolean[] = [true, false];
  const data: ChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          data: 50,
          horizontalBarChartdata: { x: 10, y: 100 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient8Ext),
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
          gradient: getGradientFromToken(DataVizGradientPalette.gradient9Ext),
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
          gradient: getGradientFromToken(DataVizGradientPalette.gradient10Ext),
        },
      ],
    },
  ];

  return (
    <>
      <div style={{ maxWidth: 600 }}>
        <HorizontalBarChart data={data} hideRatio={hideRatio} chartDataMode="fraction" />
      </div>
    </>
  );
};

HorizontalBarBenchmark.parameters = {
  docs: {
    description: {},
  },
};
