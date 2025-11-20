import { DataVizPalette, Sparkline, getColorFromToken } from '@fluentui/react-charts';
import type { JSXElement } from '@fluentui/react-components';
import * as React from 'react';

export const SparklineDimensions = (): JSXElement => {
  const sampleData = {
    chartTitle: '89.7',
    lineChartData: [
      {
        legend: '89.7',
        color: getColorFromToken(DataVizPalette.color1),
        data: [
          { x: 1, y: 58.13 },
          { x: 2, y: 140.98 },
          { x: 3, y: 20 },
          { x: 4, y: 89.7 },
          { x: 5, y: 99 },
          { x: 6, y: 13.28 },
          { x: 7, y: 31.32 },
          { x: 8, y: 89.7 },
        ],
      },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ minWidth: '140px' }}>Default (80x20):</span>
        <Sparkline data={sampleData} showLegend={true} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ minWidth: '140px' }}>Custom width={150}:</span>
        <Sparkline data={sampleData} width={150} showLegend={true} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ minWidth: '140px' }}>Custom height={40}:</span>
        <Sparkline data={sampleData} height={40} showLegend={true} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ minWidth: '140px' }}>Both (200x60):</span>
        <Sparkline data={sampleData} width={200} height={60} showLegend={true} />
      </div>
    </div>
  );
};

SparklineDimensions.parameters = {
  docs: {
    description: {
      story: 'Customize Sparkline dimensions using width and height props. Default: width=80px, height=20px.',
    },
  },
};
