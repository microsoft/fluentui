import * as React from 'react';
import { IChartProps } from '@uifabric/charting';
import { HorizontalBarChart } from '@uifabric/charting';

export const HorizontalBarChartBasicExample: React.SFC<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [{ legend: 'one', data: 13888, color: '#0078D4' }]
    },
    {
      chartTitle: 'two',
      chartData: [{ legend: 'two', data: 800, color: '#13A89E' }]
    },
    {
      chartTitle: 'three',
      chartData: [{ legend: 'three', data: 8888, color: '#9D02D7' }]
    },
    {
      chartTitle: 'four',
      chartData: [{ legend: 'four', data: 15888, color: '#79B3DC' }]
    },
    {
      chartTitle: 'five',
      chartData: [{ legend: 'five', data: 11444, color: '#9198C2' }]
    },
    {
      chartTitle: 'six',
      chartData: [{ legend: 'six', data: 14000, color: '#00AE56' }]
    },
    {
      chartTitle: 'seven',
      chartData: [{ legend: 'seven', data: 9855, color: '#0078D7' }]
    },
    {
      chartTitle: 'eight',
      chartData: [{ legend: 'eight', data: 4250, color: '#0B6A0B' }]
    }
  ];

  return <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} total={15000} />;
};
