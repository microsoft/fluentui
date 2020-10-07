import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class VerticalBarChartBasicExample extends React.Component<IVerticalBarChartProps, {}> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points = [
      {
        x: 0,
        y: 10000,
        legend: 'First',
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '10%',
      },
      {
        x: 10000,
        y: 50000,
        legend: 'Second',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
      },
      {
        x: 25000,
        y: 30000,
        legend: 'Third',
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '37%',
      },

      {
        x: 40000,
        y: 13000,
        legend: 'Fourth',
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '88%',
      },
      {
        x: 52000,
        y: 43000,
        legend: 'Fifth',
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '71%',
      },
      {
        x: 68000,
        y: 30000,
        legend: 'Sixth',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
      },
      {
        x: 80000,
        y: 20000,
        legend: 'Seventh',
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '87%',
      },
      {
        x: 92000,
        y: 45000,
        legend: 'Eighth',
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
    ];

    return (
      <div style={{ width: '650px', height: '400px' }}>
        <VerticalBarChart data={points} width={650} height={400} chartLabel={'Basic Chart with Numeric Axes'} />
      </div>
    );
  }
}
