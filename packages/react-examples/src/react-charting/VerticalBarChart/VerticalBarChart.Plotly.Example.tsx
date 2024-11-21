import * as React from 'react';
import { renderChartFromPlotlyJson } from '@fluentui/react-charting';

const plotlyJson = {
  data: [
    {
      x: [1, 2, 3, 4],
      y: [1, 3, 2, 6],
      type: 'bar',
      marker: {
        color: '#ab63fa',
      },
      name: 'Bar',
    },
    {
      x: [1, 2, 3, 4],
      y: [3, 2, 7, 4],
      type: 'line',
      marker: {
        color: '#19d3f3',
      },
      name: 'Line',
    },
  ],
  layout: {
    plotBackground: '#f3f6fa',
    margin: {
      t: 0,
      r: 0,
      l: 20,
      b: 30,
    },
  },
};

export class VerticalBarChartPlotlyExample extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return renderChartFromPlotlyJson(plotlyJson);
  }
}
