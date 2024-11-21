import * as React from 'react';
import { renderChartFromPlotlyJson } from '@fluentui/react-charting';

const plotlyJson = {
  data: [
    {
      hole: 0.6,
      type: 'pie',
      frame: null,
      marker: {
        line: {
          color: 'transparent',
        },
        color: 'rgba(31,119,180,1)',
        fillcolor: 'rgba(31,119,180,1)',
      },
      labelssrc: 'koolio:2:346057',
      labels: ['Rural', 'Suburban', 'Urban'],
      valuessrc: 'koolio:2:95d156',
      values: [125, 625, 1625],
    },
  ],
  layout: {
    title: 'Donut w Ply',
    xaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
    },
    margin: {
      b: 40,
      l: 60,
      r: 10,
      t: 25,
    },
    hovermode: 'closest',
    showlegend: true,
  },
  frames: [],
};

export class DonutChartPlotlyExample extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return renderChartFromPlotlyJson(plotlyJson);
  }
}
