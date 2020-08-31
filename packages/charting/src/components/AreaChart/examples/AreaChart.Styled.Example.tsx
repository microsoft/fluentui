import * as React from 'react';
import { AreaChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class AreaChartStyledExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const chart1Points = [
      {
        x: new Date('2018/01/06'),
        y: 5,
      },
      {
        x: new Date('2018/01/08'),
        y: 16,
      },
      {
        x: new Date('2018/01/16'),
        y: 6,
      },
      {
        x: new Date('2018/02/06'),
        y: 30,
      },
      {
        x: new Date('2018/02/16'),
        y: 10,
      },
    ];

    const chart2Points = [
      {
        x: new Date('2018/01/06'),
        y: 10,
      },
      {
        x: new Date('2018/01/08'),
        y: 33,
      },
      {
        x: new Date('2018/01/16'),
        y: 21,
      },
      {
        x: new Date('2018/02/06'),
        y: 44,
      },
      {
        x: new Date('2018/02/16'),
        y: 22,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: DefaultPalette.accent,
      },
      {
        legend: 'legend2',
        data: chart2Points,
        color: DefaultPalette.blueLight,
      },
    ];

    const chartData = {
      chartTtitle: 'Area chart styled example',
      lineChartData: chartPoints,
    };

    const rootStyle = mergeStyles({ width: '650px', height: '400px' });

    return (
      <div className={rootStyle}>
        <AreaChart height={400} width={650} data={chartData} />
      </div>
    );
  }
}
