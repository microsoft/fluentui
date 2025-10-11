import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { HorizontalBarChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

export const HorizontalBarBasic = (): JSXElement => {
  const data = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, total: 15000 },
          color: getColorFromToken(DataVizPalette.color1),
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
          horizontalBarChartdata: { x: 800, total: 15000 },
          color: getColorFromToken(DataVizPalette.color2),
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
          horizontalBarChartdata: { x: 8888, total: 15000 },
          color: getColorFromToken(DataVizPalette.color3),
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
          horizontalBarChartdata: { x: 15888, total: 15000 },
          color: getColorFromToken(DataVizPalette.color4),
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
          horizontalBarChartdata: { x: 11444, total: 15000 },
          color: getColorFromToken(DataVizPalette.color5),
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
          horizontalBarChartdata: { x: 14000, total: 15000 },
          color: getColorFromToken(DataVizPalette.color6),
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
          horizontalBarChartdata: { x: 9855, total: 15000 },
          color: getColorFromToken(DataVizPalette.color7),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '66%',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, total: 15000 },
          color: getColorFromToken(DataVizPalette.color8),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '28%',
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart data={data} chartDataMode={'default'} className={'hbcbasic'} />
    </div>
  );
};

HorizontalBarBasic.parameters = {
  docs: {
    description: {},
  },
};
