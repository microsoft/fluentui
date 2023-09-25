import * as React from 'react';
import { ChartHoverCard, IChartDataPoint, MultiStackedBarChart, IChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export const MultiStackedBarChartExample: React.FunctionComponent<{}> = () => {
  const firstChartPoints: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: DefaultPalette.red,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
    },
    {
      legend: 'Passport numbers (USA)',
      data: 23,
      color: DefaultPalette.green,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '23%',
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: DefaultPalette.yellow,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '35%',
    },
    {
      legend: 'Credit card numbers',
      data: 87,
      color: DefaultPalette.blueLight,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: DefaultPalette.black,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
  ];
  const firstChartPoints1: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: DefaultPalette.red,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
    },
    {
      legend: 'Passport numbers (USA)',
      data: 56,
      color: DefaultPalette.green,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '56%',
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: DefaultPalette.yellow,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '35%',
    },
    {
      legend: 'Credit card numbers',
      data: 92,
      color: DefaultPalette.blueLight,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '92%',
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: DefaultPalette.black,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    {
      legend: 'Phone Numbers',
      data: 40,
      color: DefaultPalette.blue,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
    {
      legend: 'Credit card Numbers',
      data: 23,
      color: DefaultPalette.green,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
  ];

  const hideRatio: boolean[] = [false, true, false];

  const hideDenominator: boolean[] = [true, true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'Monitored',
      chartData: firstChartPoints,
    },
    {
      chartTitle: 'Monitored Second Chart',
      chartData: firstChartPoints1,
    },
    {
      chartTitle: 'Unmonitored',
      chartData: secondChartPoints,
    },
  ];

  return (
    <MultiStackedBarChart
      culture={window.navigator.language}
      data={data}
      hideDenominator={hideDenominator}
      hideRatio={hideRatio}
      width={600}
      href={'https://developer.microsoft.com/en-us/'}
      focusZonePropsForLegendsInHoverCard={{ 'aria-label': 'legends Container' }}
      legendsOverflowText={'OverFlow Items'}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
        props ? (
          <ChartHoverCard Legend={props.legend} YValue={props.yAxisCalloutData || props.data} color={props.color} />
        ) : null
      }
    />
  );
};
