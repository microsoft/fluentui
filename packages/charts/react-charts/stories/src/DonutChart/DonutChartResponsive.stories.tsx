import * as React from 'react';
import {
  DonutChart,
  ChartProps,
  ChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  ResponsiveContainer,
} from '@fluentui/react-charts';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  resizableArea: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',

    minWidth: '100px',
    maxWidth: '800px',
    border: `2px solid ${getColorFromToken(DataVizPalette.color16)}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      letterSpacing: '1px',
      color: tokens.colorNeutralBackground1,
      backgroundColor: getColorFromToken(DataVizPalette.color16),
    },
  },
});

export const DonutChartResponsive = () => {
  const classes = useStyles();
  const points: ChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
    },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'third',
      data: 12000,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'fourth',
      data: 2000,
      color: getColorFromToken(DataVizPalette.color4),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'fifth',
      data: 5000,
      color: getColorFromToken(DataVizPalette.color5),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 6000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'seventh',
      data: 7000,
      color: getColorFromToken(DataVizPalette.color7),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'eighth',
      data: 8000,
      color: getColorFromToken(DataVizPalette.color8),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'ninth',
      data: 9000,
      color: getColorFromToken(DataVizPalette.color9),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'tenth',
      data: 10000,
      color: getColorFromToken(DataVizPalette.color10),
      xAxisCalloutData: '2020/04/20',
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };

  return (
    <div className={mergeClasses(classes.resizableArea)}>
      <ResponsiveContainer>
        <DonutChart data={data} innerRadius={55} valueInsideDonut={39000} />
      </ResponsiveContainer>
    </div>
  );
};
DonutChartResponsive.parameters = {
  docs: {
    description: {},
  },
};
