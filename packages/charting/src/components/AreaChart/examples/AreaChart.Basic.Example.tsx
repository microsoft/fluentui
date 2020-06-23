import * as React from 'react';
import { AreaChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class AreaChartBasicExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const chart1Points = [
      {
        x: 20,
        y: 7000,
      },
      {
        x: 25,
        y: 9000,
      },
      {
        x: 30,
        y: 13000,
      },
      {
        x: 35,
        y: 15000,
      },
      {
        x: 40,
        y: 11000,
      },
      {
        x: 45,
        y: 8760,
      },
      {
        x: 50,
        y: 3500,
      },
      {
        x: 55,
        y: 20000,
      },
      {
        x: 60,
        y: 17000,
      },
      {
        x: 65,
        y: 1000,
      },
      {
        x: 70,
        y: 12000,
      },
      {
        x: 75,
        y: 6876,
      },
      {
        x: 80,
        y: 12000,
      },
      {
        x: 85,
        y: 7000,
      },
      {
        x: 90,
        y: 10000,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: DefaultPalette.accent,
      },
    ];

    const chartData = {
      chartTtitle: 'Area chart basic example',
      lineChartData: chartPoints,
    };

    const rootStyle: IRootStyles = { width: '650px', height: '400px' };

    return (
      <div className={mergeStyles(rootStyle)}>
        <AreaChart height={400} width={650} showYAxisGridLines={true} data={chartData} />
      </div>
    );
  }
}
