import * as React from 'react';
import { MultiStackedBarChart } from '@uifabric/charting/lib/StackedBarChart';
import { ILegendDataItem } from '@uifabric/charting/lib/components/Legend/Legend.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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
    { legendText: 'Debit card numbers (EU and USA)', legendColor: DefaultPalette.blueLight },
    { legendText: 'Passport numbers (USA)', legendColor: DefaultPalette.blue },
    { legendText: 'Social security numbers', legendColor: DefaultPalette.blueMid },
    { legendText: 'Credit card numbers', legendColor: DefaultPalette.red },
    { legendText: 'Tax identification numbers (USA)', legendColor: DefaultPalette.black }
  ];

  const chartTitles: string[] = ['Monitored', 'Unmonitored'];

  return <MultiStackedBarChart data={points} legendData={colors} chartTitles={chartTitles} width={394} />;
};
