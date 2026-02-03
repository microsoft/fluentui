import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  ChartProps,
  DataVizPalette,
  getColorFromToken,
  ResponsiveContainer,
  SankeyChart,
} from '@fluentui/react-charts';

export const SankeyChartResponsive = (): JSXElement => {
  const data: ChartProps = {
    chartTitle: 'Sankey Chart',
    SankeyChartData: {
      nodes: [
        {
          nodeId: 0,
          name: 'node0',
          color: getColorFromToken(DataVizPalette.color11),
          borderColor: getColorFromToken(DataVizPalette.color21),
        },
        {
          nodeId: 1,
          name: 'node1',
          color: getColorFromToken(DataVizPalette.color12),
          borderColor: getColorFromToken(DataVizPalette.color22),
        },
        {
          nodeId: 2,
          name: 'node2',
          color: getColorFromToken(DataVizPalette.color13),
          borderColor: getColorFromToken(DataVizPalette.color23),
        },
        {
          nodeId: 3,
          name: 'node3',
          color: getColorFromToken(DataVizPalette.color14),
          borderColor: getColorFromToken(DataVizPalette.color24),
        },
        {
          nodeId: 4,
          name: 'node4',
          color: getColorFromToken(DataVizPalette.color2),
          borderColor: getColorFromToken(DataVizPalette.color22),
        },
        {
          nodeId: 5,
          name: 'node5',
          color: getColorFromToken(DataVizPalette.color15),
          borderColor: getColorFromToken(DataVizPalette.color25),
        },
      ],
      links: [
        {
          source: 0,
          target: 2,
          value: 2,
        },
        {
          source: 1,
          target: 2,
          value: 2,
        },
        {
          source: 1,
          target: 3,
          value: 2,
        },
        {
          source: 0,
          target: 4,
          value: 2,
        },
        {
          source: 2,
          target: 3,
          value: 2,
        },
        {
          source: 2,
          target: 4,
          value: 2,
        },
        {
          source: 3,
          target: 4,
          value: 4,
        },
        {
          source: 3,
          target: 5,
          value: 4,
        },
      ],
    },
  };

  return (
    <ResponsiveContainer>
      <SankeyChart data={data} />
    </ResponsiveContainer>
  );
};
SankeyChartResponsive.parameters = {
  docs: {
    description: {},
  },
};
