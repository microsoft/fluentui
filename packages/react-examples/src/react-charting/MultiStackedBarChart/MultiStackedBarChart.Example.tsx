import * as React from 'react';
import {
  IChartDataPoint,
  MultiStackedBarChart,
  IChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';

export const MultiStackedBarChartBasicExample: React.FunctionComponent = () => {
  const firstChartPoints: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: getColorFromToken(DataVizPalette.color1),
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 13 Debit card numbers (EU and USA) 40' },
    },
    {
      legend: 'Passport numbers (USA)',
      data: 23,
      color: getColorFromToken(DataVizPalette.color2),
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 13 Passport numbers (USA) 23' },
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: getColorFromToken(DataVizPalette.color3),
      callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 13 Social security numbers 35' },
    },
    {
      legend: 'Credit card numbers',
      data: 87,
      color: getColorFromToken(DataVizPalette.color4),
      callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 13 Credit card numbers 87' },
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: getColorFromToken(DataVizPalette.color5),
      callOutAccessibilityData: { ariaLabel: 'Bar series 5 of 13 Tax identification numbers (USA) 87' },
    },
    {
      legend: "Driver's license numbers (USA)",
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color6),
      callOutAccessibilityData: { ariaLabel: "Bar series 6 of 13 Driver's license numbers (USA) 0.5" },
    },
    {
      legend: 'Email addresses',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color7),
      callOutAccessibilityData: { ariaLabel: 'Bar series 7 of 13 Email addresses 0.5' },
    },
    {
      legend: 'Phone numbers',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color8),
      callOutAccessibilityData: { ariaLabel: 'Bar series 8 of 13 Phone numbers 0.5' },
    },
    {
      legend: 'Health insurance numbers',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color9),
      callOutAccessibilityData: { ariaLabel: 'Bar series 9 of 13 Health insurance numbers 0.5' },
    },
    {
      legend: 'Bank account numbers',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color10),
      callOutAccessibilityData: { ariaLabel: 'Bar series 10 of 13 Bank account numbers 0.5' },
    },
    {
      legend: 'Employee identification numbers',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color11),
      callOutAccessibilityData: { ariaLabel: 'Bar series 11 of 13 Employee identification numbers 0.5' },
    },
    {
      legend: 'Vehicle registration numbers',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color12),
      callOutAccessibilityData: { ariaLabel: 'Bar series 12 of 13 Vehicle registration numbers 0.5' },
    },
    {
      legend: 'Student identification numbers',
      data: 0.5,
      color: getColorFromToken(DataVizPalette.color13),
      callOutAccessibilityData: { ariaLabel: 'Bar series 13 of 13 Student identification numbers 0.5' },
    },
  ];
  const firstChartPoints1: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: getColorFromToken(DataVizPalette.color1),
      callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 5 Debit card numbers (EU and USA) 40' },
    },
    {
      legend: 'Passport numbers (USA)',
      data: 56,
      color: getColorFromToken(DataVizPalette.color2),
      callOutAccessibilityData: { ariaLabel: 'Bar series 2 of 5 Passport numbers (USA) 56' },
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: getColorFromToken(DataVizPalette.color3),
      callOutAccessibilityData: { ariaLabel: 'Bar series 3 of 5 Social security numbers 35' },
    },
    {
      legend: 'Credit card numbers',
      data: 92,
      color: getColorFromToken(DataVizPalette.color4),
      callOutAccessibilityData: { ariaLabel: 'Bar series 4 of 5 Credit card numbers 92' },
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: getColorFromToken(DataVizPalette.color5),
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
