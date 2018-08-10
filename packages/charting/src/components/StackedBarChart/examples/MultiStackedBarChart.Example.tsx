import * as React from 'react';
import { MultiStackedBarChart } from '@uifabric/charting/lib/StackedBarChart';
import { ILegendDataItem } from '@uifabric/charting/lib/components/Legend/Legend.types';

export const MultiStackedBarChartExample: React.SFC<{}> = () => {
  const points = [
    [
      { x: 'Debit card numbers (EU and USA)', y: 40 },
      { x: 'Passport numbers (USA)', y: 23 },
      { x: 'Social security numbers', y: 35 },
      { x: 'Credit card numbers', y: 87 },
      { x: 'Tax identification numbers (USA)', y: 87 }
    ],
    []
  ];

  const colors: ILegendDataItem[] = [
    { legendText: 'Debit card numbers (EU and USA)', legendColor: '#0078D7' },
    { legendText: 'Passport numbers (USA)', legendColor: '#038387' },
    { legendText: 'Social security numbers', legendColor: '#00AE56' },
    { legendText: 'Credit card numbers', legendColor: '#008000' },
    { legendText: 'Tax identification numbers (USA)', legendColor: '#008000' }
  ];

  const chartTitles: string[] = ['Monitored', 'Unmonitored'];

  return <MultiStackedBarChart data={points} legendData={colors} chartTitles={chartTitles} width={394} />;
};
