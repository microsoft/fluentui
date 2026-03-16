import * as React from 'react';
import { HorizontalBarChart } from '@fluentui/react-charts-preview';

export const HorizontalBarCustomGradient = () => {
  const data = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          // custom gradient
          color: ['#8800FF', '#00D0FF'],
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
          // custom gradient
          color: ['#00D0FF', 'lightgreen'],
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
          // custom gradient
          color: ['green', 'yellow'],
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
          color: ['yellow', 'orange'],
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '106%',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: ['orange', 'red'],
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '76%',
        },
      ],
    },
  ];

  return (
    <>
      <HorizontalBarChart data={data} chartDataMode={'default'} className={'hbcbasic'} />
    </>
  );
};

HorizontalBarCustomGradient.parameters = {
  docs: {
    description: {},
  },
};
