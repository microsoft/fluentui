import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { HorizontalBarChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

export const HorizontalBarStacked = (): JSXElement => {
  const data = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'One.One',
          horizontalBarChartdata: { x: 1543 },
          color: getColorFromToken(DataVizPalette.color1),
        },
        {
          legend: 'One.Two',
          horizontalBarChartdata: { x: 1000 },
          color: getColorFromToken(DataVizPalette.color2),
        },
        {
          legend: 'One.Three',
          horizontalBarChartdata: { x: 547 },
          color: getColorFromToken(DataVizPalette.color3),
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'Two.One',
          horizontalBarChartdata: { x: 987 },
          color: getColorFromToken(DataVizPalette.color4),
        },
        {
          legend: 'Two.Two',
          horizontalBarChartdata: { x: 1987 },
          color: getColorFromToken(DataVizPalette.color5),
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'Three.One',
          horizontalBarChartdata: { x: 872 },
          color: getColorFromToken(DataVizPalette.color6),
        },
        {
          legend: 'Three.Two',
          horizontalBarChartdata: { x: 128 },
          color: getColorFromToken(DataVizPalette.color7),
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart data={data} chartDataMode={'default'} className={'hbcstacked'} />
    </div>
  );
};

HorizontalBarStacked.parameters = {
  docs: {
    description: {},
  },
};
