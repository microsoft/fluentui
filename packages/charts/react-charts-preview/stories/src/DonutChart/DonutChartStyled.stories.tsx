import * as React from 'react';
import {
  DonutChart,
  ChartProps,
  getColorFromToken,
  DataVizPalette,
  ChartDataPoint,
  DataVizGradientPalette,
  getGradientFromToken,
} from '@fluentui/react-charts-preview';
import { makeStyles, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  customDonutChart: {
    border: `2px solid ${getColorFromToken(DataVizPalette.color11)}`,
    borderRadius: '50%',
    padding: '10px',
    backgroundColor: getColorFromToken(DataVizPalette.disabled),
  },
});

export const DonutChartStyled = () => {
  const classes = useStyles();

  const points: ChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getGradientFromToken(DataVizGradientPalette.gradient1),
      xAxisCalloutData: '2020/04/30',
    },
    {
      legend: 'second',
      data: 39000,
      color: getGradientFromToken(DataVizGradientPalette.gradient2),
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
