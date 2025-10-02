import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DonutChart, ChartProps, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';
import { makeStyles, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  customDonutChart: {
    border: `2px solid ${getColorFromToken(DataVizPalette.color11)}`,
    borderRadius: '50%',
    padding: '10px',
    backgroundColor: getColorFromToken(DataVizPalette.disabled),
  },
});

export const DonutChartStyled = (): JSXElement => {
  const classes = useStyles();

  const points = [
    { legend: 'first', data: 20000, color: getColorFromToken(DataVizPalette.color1), xAxisCalloutData: '2020/04/30' },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/20',
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Donut chart styled example',
    chartData: points,
  };

  return (
    <DonutChart
      culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
      data={data}
      innerRadius={55}
      href={'https://developer.microsoft.com/en-us/'}
      legendsOverflowText={'overflow Items'}
      hideLegend={false}
      height={220}
      valueInsideDonut={39000}
      className={mergeClasses(classes.customDonutChart)}
    />
  );
};

DonutChartStyled.parameters = {
  docs: {
    description: {},
  },
};
