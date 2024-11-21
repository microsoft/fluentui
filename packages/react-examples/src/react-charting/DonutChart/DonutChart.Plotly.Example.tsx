import * as React from 'react';
import { renderChartFromPlotlyJson } from '@fluentui/react-charting';

const plotlyJson = {
  data: [
    {
      hole: 0.6,
      type: 'pie',
      labels: ['Rural', 'Suburban', 'Urban'],
      values: [125, 625, 1625],
    },
  ],
  layout: {
    title: 'Donut w Ply',
    showlegend: false,
  },
};

export class DonutChartPlotlyExample extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return renderChartFromPlotlyJson(plotlyJson);
  }
}
