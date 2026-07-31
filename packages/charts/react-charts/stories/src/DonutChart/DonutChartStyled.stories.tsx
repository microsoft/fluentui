import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { ChartProps } from '@fluentui/react-charts';
import { DonutChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

import styles from './DonutChartStyled.module.css';

const useStyles = () => styles;

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
      className={classes.customDonutChart}
    />
  );
};

DonutChartStyled.parameters = {
  docs: {
    description: {},
  },
};
