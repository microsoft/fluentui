import * as React from 'react';
import { MultiStackedBarChart } from '@uifabric/charting/lib/StackedBarChart';
import { ILegendDataItem } from '@uifabric/charting/lib/components/Legend/Legend.types';

export const MultiStackedBarChartExample: React.SFC<{}> = () => {
  const points = [
    [
      { x: 'first Lorem Ipsum is simply dummy text', y: 40 },
      { x: 'second', y: 23 },
      { x: 'third Lorem Ipsum is simply dummy text of the printing', y: 35 },
      { x: 'fourth', y: 87 }
    ],
    [
      { x: 'first Lorem Ipsum is simply dummy text', y: 40 },
      { x: 'second', y: 23 },
      { x: 'third Lorem Ipsum is simply dummy text of the printing', y: 35 },
      { x: 'fourth', y: 87 }
    ]
  ];

  const colors: ILegendDataItem[] = [
    { legendText: 'first Lorem Ipsum is simply dummy text', legendColor: '#581845' },
    { legendText: 'second', legendColor: '#808000' },
    { legendText: 'third Lorem Ipsum is simply dummy text of the printing', legendColor: '#00FF00' },
    { legendText: 'second', legendColor: '#008000' }
  ];

  const chartTitles: string[] = ['StackedBarChart1', 'StackedBarChart2'];

  return <MultiStackedBarChart data={points} legendData={colors} chartTitle={chartTitles} />;
};
