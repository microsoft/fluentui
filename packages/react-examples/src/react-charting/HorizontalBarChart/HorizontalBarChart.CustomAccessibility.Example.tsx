import * as React from 'react';
import { HorizontalBarChart, IChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export const HorizontalBarChartCustomAccessibilityExample: React.FunctionComponent<{}> = () => {
  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about one' },
      chartDataAccessibilityData: { ariaLabel: 'Data 1543 of 15000' },
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: DefaultPalette.tealDark,
          xAxisCalloutData: '2021/06/10',
          yAxisCalloutData: '41%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart one 2021/06/10 41%' },
        },
      ],
    },
    {
      chartTitle: 'two',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about two' },
      chartDataAccessibilityData: { ariaLabel: 'Data 800 of 15000' },
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          color: DefaultPalette.purple,
          xAxisCalloutData: '2021/06/11',
          yAxisCalloutData: '52%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart two 2021/06/11 52%' },
        },
      ],
    },
    {
      chartTitle: 'three',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about three' },
      chartDataAccessibilityData: { ariaLabel: 'Data 8888 of 15000' },
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          color: DefaultPalette.redDark,
          xAxisCalloutData: '2021/06/12',
          yAxisCalloutData: '63%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart three 2021/06/12 63%' },
        },
      ],
    },
    {
      chartTitle: 'four',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about four' },
      chartDataAccessibilityData: { ariaLabel: 'Data 15888 of 15000' },
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          color: DefaultPalette.themeDarkAlt,
          xAxisCalloutData: '2021/06/13',
          yAxisCalloutData: '74%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart four 2021/06/13 74%' },
        },
      ],
    },
    {
      chartTitle: 'five',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about five' },
      chartDataAccessibilityData: { ariaLabel: 'Data 11444 of 15000' },
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: DefaultPalette.themePrimary,
          xAxisCalloutData: '2021/06/14',
          yAxisCalloutData: '85%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart five 2021/06/14 85%' },
        },
      ],
    },
    {
      chartTitle: 'six',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about six' },
      chartDataAccessibilityData: { ariaLabel: 'Data 14000 of 15000' },
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          color: DefaultPalette.greenDark,
          xAxisCalloutData: '2021/06/15',
          yAxisCalloutData: '96%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart six 2021/06/15 96%' },
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about seven' },
      chartDataAccessibilityData: { ariaLabel: 'Data 9855 of 15000' },
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          color: DefaultPalette.accent,
          xAxisCalloutData: '2021/06/16',
          yAxisCalloutData: '98%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart seven 2021/06/16 98%' },
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about eight' },
      chartDataAccessibilityData: { ariaLabel: 'Data 4250 of 15000' },
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          color: DefaultPalette.blueLight,
          xAxisCalloutData: '2021/06/17',
          yAxisCalloutData: '99%',
          callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart eight 2021/06/17 99%' },
        },
      ],
    },
  ];

  return <HorizontalBarChart data={data} width={600} />;
};
