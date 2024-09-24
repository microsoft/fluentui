import * as React from 'react';
import { DonutChart, IChartProps, getColorFromToken, DataVizPalette } from '@fluentui/react-charts-preview';

export const DonutBasic = () => {
  const points = [
    { legend: 'first', data: 20000, color: getColorFromToken(DataVizPalette.color1), xAxisCalloutData: '2020/04/30' },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/20',
    },
  ];

  const data: IChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };
  return (
    <div style={{ width: '100%', height: 220 }}>
      <DonutChart
        culture={window.navigator.language}
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        valueInsideDonut={39000}
      />
    </div>
  );
};

DonutBasic.parameters = {
  docs: {
    description: {
      story: 'Donut Chart Story.',
    },
  },
};
