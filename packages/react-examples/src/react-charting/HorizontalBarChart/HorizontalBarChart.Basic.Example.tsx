import * as React from 'react';
import { HorizontalBarChart, IChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export const HorizontalBarChartBasicExample: React.FunctionComponent<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: DefaultPalette.tealDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '10%',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          color: DefaultPalette.purple,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '5%',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          color: DefaultPalette.redDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '59%',
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          color: DefaultPalette.themeDarkAlt,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '105%',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: DefaultPalette.themePrimary,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '76%',
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          color: DefaultPalette.greenDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '93%',
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          color: DefaultPalette.accent,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '65%',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          color: DefaultPalette.blueLight,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '28%',
        },
      ],
    },
  ];

  return <HorizontalBarChart culture={window.navigator.language} data={data} hideRatio={hideRatio} width={600} />;
};
