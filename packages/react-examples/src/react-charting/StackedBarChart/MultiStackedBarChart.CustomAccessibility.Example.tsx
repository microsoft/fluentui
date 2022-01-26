import * as React from 'react';
import { IChartDataPoint, MultiStackedBarChart, IChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export const MultiStackedBarChartCustomAccessibilityExample: React.FunctionComponent<{}> = () => {
  const firstChartPoints: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: DefaultPalette.red,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 5 2020/04/30 40%' },
    },
    {
      legend: 'Passport numbers (USA)',
      data: 23,
      color: DefaultPalette.green,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '23%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 5 2020/04/30 23%' },
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: DefaultPalette.yellow,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '35%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 5 2020/04/30 35%' },
    },
    {
      legend: 'Credit card numbers',
      data: 87,
      color: DefaultPalette.blueLight,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 5 2020/04/30 87%' },
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: DefaultPalette.black,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 5 of 5 2020/04/30 87%' },
    },
  ];
  const firstChartPoints1: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: DefaultPalette.red,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 5 2020/04/30 40%' },
    },
    {
      legend: 'Passport numbers (USA)',
      data: 56,
      color: DefaultPalette.green,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '56%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 5 2020/04/30 56%' },
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: DefaultPalette.yellow,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '35%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 5 2020/04/30 35%' },
    },
    {
      legend: 'Credit card numbers',
      data: 92,
      color: DefaultPalette.blueLight,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '92%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 5 2020/04/30 92%' },
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: DefaultPalette.black,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 5 of 5 2020/04/30 87%' },
    },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    {
      legend: 'Phone Numbers',
      data: 40,
      color: DefaultPalette.blue,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 2 2020/04/30 87%' },
    },
    {
      legend: 'Credit card Numbers',
      data: 23,
      color: DefaultPalette.green,
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 2 2020/04/30 87%' },
    },
  ];

  const hideRatio: boolean[] = [true, false];

  const hideDenominator: boolean[] = [true, true];

  const data: IChartProps[] = [
    {
      chartTitle: 'Monitored',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about Monitored' },
      chartData: firstChartPoints,
    },
    {
      chartTitle: 'Monitored Second Chart',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about Monitored Second Chart' },
      chartData: firstChartPoints1,
    },
    {
      chartTitle: 'Unmonitored',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about Unmonitored' },
      chartDataAccessibilityData: { ariaLabel: 'number 40 out of 63' },
      chartData: secondChartPoints,
    },
  ];

  return (
    <MultiStackedBarChart
      data={data}
      hideDenominator={hideDenominator}
      hideRatio={hideRatio}
      width={600}
      href={'https://developer.microsoft.com/en-us/'}
      focusZonePropsForLegendsInHoverCard={{ 'aria-label': 'legends Container' }}
      legendsOverflowText={'OverFlow Items'}
    />
  );
};
