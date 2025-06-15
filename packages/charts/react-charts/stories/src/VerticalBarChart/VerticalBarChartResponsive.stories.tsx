import * as React from 'react';
import {
  VerticalBarChart,
  VerticalBarChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  LineChartLineOptions,
  ResponsiveContainer,
} from '@fluentui/react-charts';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  resizableArea: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',

    minWidth: '200px',
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

export const VerticalBarChartResponsive = () => {
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 0,
      y: 10000,
      legend: 'Oranges',
      color: getColorFromToken(DataVizPalette.color1),
      lineData: {
        y: 7000,
      },
    },
    {
      x: 10000,
      y: 50000,
      legend: 'Dogs',
      color: getColorFromToken(DataVizPalette.color2),
      lineData: {
        y: 30000,
      },
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: getColorFromToken(DataVizPalette.color3),
      lineData: {
        y: 3000,
      },
    },
    {
      x: 40000,
      y: 13000,
      legend: 'Bananas',
      color: getColorFromToken(DataVizPalette.color6),
    },
    {
      x: 52000,
      y: 43000,
      legend: 'Giraffes',
      color: getColorFromToken(DataVizPalette.color11),
      lineData: {
        y: 30000,
      },
    },
    {
      x: 68000,
      y: 30000,
      legend: 'Cats',
      color: getColorFromToken(DataVizPalette.color2),
      lineData: {
        y: 5000,
      },
    },
    {
      x: 80000,
      y: 20000,
      legend: 'Elephants',
      color: getColorFromToken(DataVizPalette.color11),
      lineData: {
        y: 16000,
      },
    },
    {
      x: 92000,
      y: 45000,
      legend: 'Monkeys',
      color: getColorFromToken(DataVizPalette.color6),
      lineData: {
        y: 40000,
      },
    },
  ];
  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };
  const classes = useStyles();
  return (
    <div className={mergeClasses(classes.resizableArea)}>
      <ResponsiveContainer>
        <VerticalBarChart
          data={points}
          lineLegendText={'Line'}
          lineLegendColor={'brown'}
          lineOptions={lineOptions}
          enableReflow={true}
        />
      </ResponsiveContainer>
    </div>
  );
};
VerticalBarChartResponsive.parameters = {
  docs: {
    description: {},
  },
};
