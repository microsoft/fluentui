import * as React from 'react';
import { HorizontalBarChart, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '150%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '80%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '88%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '10%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '50%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '89%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '70%',
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
          xAxisCalloutData: '2020/04/29',
          yAxisCalloutData: '66%',
        },
      ],
    },
  ];

  return <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} />;
};
