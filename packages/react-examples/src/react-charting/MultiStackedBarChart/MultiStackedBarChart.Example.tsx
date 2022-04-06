import * as React from 'react';
import { IChartDataPoint, MultiStackedBarChart, IChartProps } from '@fluentui/react-charting';

export const MultiStackedBarChartExample: React.FunctionComponent = () => {
  const firstChartPoints: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: '#0099BC',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 5 Debit card numbers (EU and USA) 40' },
    },
    {
      legend: 'Passport numbers (USA)',
      data: 23,
      color: '#77004D',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 5 Passport numbers (USA) 23' },
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: '#4F68ED',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 5 Social security numbers 35' },
    },
    {
      legend: 'Credit card numbers',
      data: 87,
      color: '#AE8C00',
      callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 5 Credit card numbers 87' },
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: '#004E8C',
      callOutAccessibilityData: { ariaLabel: 'Bar series 5 of 5 Tax identification numbers (USA) 87' },
    },
  ];
  const firstChartPoints1: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: '#0099BC',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 5 Debit card numbers (EU and USA) 40' },
    },
    {
      legend: 'Passport numbers (USA)',
      data: 56,
      color: '#77004D',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 5 Passport numbers (USA) 56' },
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: '#4F68ED',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 5 Social security numbers 35' },
    },
    {
      legend: 'Credit card numbers',
      data: 92,
      color: '#AE8C00',
      callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 5 Credit card numbers 92' },
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: '#004E8C',
      callOutAccessibilityData: { ariaLabel: 'Bar series 5 of 5 Tax identification numbers (USA) 87' },
    },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    {
      legend: 'Phone Numbers',
      data: 40,
      color: '#881798',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 2 Phone Numbers 40' },
    },
    {
      legend: 'Credit card Numbers',
      data: 23,
      color: '#AE8C00',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 2 Credit card Numbers 23' },
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
