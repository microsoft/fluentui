import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VerticalBarChart, VerticalBarChartDataPoint } from '@fluentui/react-charts';

export const VerticalBarRotateLabels = (): JSXElement => {
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 'This is a medium long label. ',
      y: 3500,
      color: '#627CEF',
    },
    {
      x: 'This is a long label This is a long label',
      y: 2500,
      color: '#C19C00',
    },
    {
      x: 'This label is as long as the previous one',
      y: 1900,
      color: '#E650AF',
    },
    {
      x: 'A short label',
      y: 2800,
      color: '#0E7878',
    },
  ];
  const rootStyle = { width: '650px', height: '500px' };
  return (
    <>
      <div style={rootStyle}>
        <VerticalBarChart
          chartTitle="Vertical bar chart rotated labels example "
          data={points}
          height={350}
          width={650}
          hideLegend={true}
          rotateXAxisLables={true}
        />
      </div>
    </>
  );
};
VerticalBarRotateLabels.parameters = {
  docs: {
    description: {},
  },
};
