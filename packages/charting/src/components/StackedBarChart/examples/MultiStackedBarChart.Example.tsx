import * as React from 'react';
import { IChartDataPoint, MultiStackedBarChart, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const MultiStackedBarChartExample: React.FunctionComponent<{}> = () => {
  const firstChartPoints: IChartDataPoint[] = [
    { legend: 'Debit card numbers (EU and USA)', data: 40, color: DefaultPalette.red },
    { legend: 'Passport numbers (USA)', data: 23, color: DefaultPalette.green },
    { legend: 'Social security numbers', data: 35, color: DefaultPalette.yellow },
    { legend: 'Credit card numbers', data: 87, color: DefaultPalette.blueLight },
    { legend: 'Tax identification numbers (USA)', data: 87, color: DefaultPalette.black }
  ];
  const firstChartPoints1: IChartDataPoint[] = [
    { legend: 'Debit card numbers (EU and USA)', data: 40, color: DefaultPalette.red },
    { legend: 'Passport numbers (USA)', data: 56, color: DefaultPalette.green },
    { legend: 'Social security numbers', data: 35, color: DefaultPalette.yellow },
    { legend: 'Credit card numbers', data: 92, color: DefaultPalette.blueLight },
    { legend: 'Tax identification numbers (USA)', data: 87, color: DefaultPalette.black }
  ];

  const secondChartPoints: IChartDataPoint[] = [
    { legend: 'Phone Numbers', data: 40, color: DefaultPalette.blue },
    { legend: 'Credit card Numbers', data: 23, color: DefaultPalette.green }
  ];

  const hideRatio: boolean[] = [true, false];

  const hideDenominator: boolean[] = [true, true];

  const data: IChartProps[] = [
    {
      chartTitle: 'Monitored',
      chartData: firstChartPoints
    },
    {
      chartTitle: 'Monitored Second Chart',
      chartData: firstChartPoints1
    },
    {
      chartTitle: 'Unmonitored',
      chartData: secondChartPoints
    }
  ];

  return (
    <MultiStackedBarChart
      data={data}
      hideDenominator={hideDenominator}
      hideRatio={hideRatio}
      width={600}
      href={'https://developer.microsoft.com/en-us/'}
    />
  );
};
