import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ChartProps, ResponsiveContainer, SankeyChart } from '@fluentui/react-charts';

export const SankeyChartResponsive = (): JSXElement => {
  const data: ChartProps = {
    chartTitle: 'Sankey Chart',
    SankeyChartData: {
      nodes: [
        {
          nodeId: 0,
          name: 'node0',
          color: '#00758F',
          borderColor: '#002E39',
        },
        {
          nodeId: 1,
          name: 'node1',
          color: '#77004D',
          borderColor: '#43002C',
        },
        {
          nodeId: 2,
          name: 'node2',
          color: '#4F6BED',
          borderColor: '#3B52B4',
        },
        {
          nodeId: 3,
          name: 'node3',
          color: '#937600',
          borderColor: '#6D5700',
        },
        {
          nodeId: 4,
          name: 'node4',
          color: '#286EA8',
          borderColor: '#00457E',
        },
        {
          nodeId: 5,
          name: 'node5',
          color: '#A43FB1',
          borderColor: '#7C158A',
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
