import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { HorizontalBarChartWithAxisDataPoint } from '@fluentui/react-charts';
import { HorizontalBarChartWithAxis, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

export const HorizontalBarWithAxisFunctionTickFormat = (): JSXElement => {
  const points: HorizontalBarChartWithAxisDataPoint[] = [
    { x: 10, y: 'Q1', legend: 'Completion', color: getColorFromToken(DataVizPalette.color1) },
    { x: 45, y: 'Q2', legend: 'Completion', color: getColorFromToken(DataVizPalette.color2) },
    { x: 72, y: 'Q3', legend: 'Completion', color: getColorFromToken(DataVizPalette.color3) },
    { x: 95, y: 'Q4', legend: 'Completion', color: getColorFromToken(DataVizPalette.color4) },
  ];

  return (
    <div style={{ width: '500px', height: '250px' }}>
      <HorizontalBarChartWithAxis
        chartTitle="Function tickFormat — literal % on a 0–100 axis"
        data={points}
        width={500}
        height={250}
        tickFormat={(value: number | Date) => `${value as number}%`}
      />
    </div>
  );
};

HorizontalBarWithAxisFunctionTickFormat.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates passing a function to `tickFormat`. A d3-format `%` string would multiply the value by 100, ' +
        'double-scaling an already-0–100 axis. A function formats the tick directly, appending a literal `%`.',
    },
  },
};
