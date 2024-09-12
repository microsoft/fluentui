import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '@fluentui/react-charts-preview';

const points: IVerticalBarChartDataPoint[] = [
  {
    x: 0,
    y: 10000,
    legend: 'Oranges',
    color: 'dodgerblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '4%',
    lineData: {
      y: 7000,
      yAxisCalloutData: '3%',
    },
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Dogs',
    color: 'midnightblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '21%',
    lineData: {
      y: 30000,
      yAxisCalloutData: '12%',
    },
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: 'darkblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '12%',
    lineData: {
      y: 3000,
      yAxisCalloutData: '1%',
    },
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: 'blue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '5%',
  },
  {
    x: 52000,
    y: 43000,
    legend: 'Giraffes',
    color: 'darkslateblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '18%',
    lineData: {
      y: 30000,
      yAxisCalloutData: '12%',
    },
  },
  {
    x: 68000,
    y: 30000,
    legend: 'Cats',
    color: 'royalblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '12%',
    lineData: {
      y: 5000,
      yAxisCalloutData: '2%',
    },
  },
  {
    x: 80000,
    y: 20000,
    legend: 'Elephants',
    color: 'slateblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '8%',
    lineData: {
      y: 16000,
      yAxisCalloutData: '7%',
    },
  },
  {
    x: 92000,
    y: 45000,
    legend: 'Monkeys',
    color: 'steelblue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '19%',
    lineData: {
      y: 40000,
      yAxisCalloutData: '16%',
    },
  },
];

export const VCResponsive = () => {
  const [sizes, setSizes] = React.useState<{ width?: number; height?: number }>({});

  const onResize = React.useCallback((width: number, height: number) => {
    const roundedWidth = Math.floor(width);
    const roundedHeight = Math.floor(height);
    setSizes({ width: roundedWidth, height: roundedHeight });
  }, []);

  return (
    <>
      <div>
        Width: <strong>{sizes.width}</strong> px
      </div>
      <div>
        Height: <strong>{sizes.height}</strong> px
      </div>
      <div style={{ width: '100%', height: 350 }}>
        <VerticalBarChart
          chartTitle="Vertical bar chart responsive example "
          data={points}
          lineLegendText="just line"
          lineLegendColor="brown"
          lineOptions={{ lineBorderWidth: 2 }}
          responsive
          onResize={onResize}
        />
      </div>
    </>
  );
};
VCResponsive.parameters = {
  docs: {
    description: {
      story: 'Vertical Bar Chart Story.',
    },
  },
};
