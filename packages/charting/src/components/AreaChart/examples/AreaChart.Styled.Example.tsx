import * as React from 'react';
import { AreaChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class AreaChartStyledExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const chart1Points = [
      {
        x: 1591101349817, // jun 2- 7.45 PM
        y: 16,
      },
      {
        x: 1591207249647, // june 3 - 11.30PM
        y: 6,
      },
      {
        x: 1591307141817, // jun 5- 3.15 AM
        y: 32,
      },
      {
        x: 1591407549847, // jun 6 7.09 AM
        y: 10,
      },
      {
        x: 1591507549847, // jun 6 7.09 AM
        y: 20,
      },
    ];

    const chart2Points = [
      {
        x: 1591101349817,
        y: 10,
      },
      {
        x: 1591207249647,
        y: 71,
      },
      {
        x: 1591307141817,
        y: 5,
      },
      {
        x: 1591407549847,
        y: 22,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: DefaultPalette.accent,
      },
      // {
      //   legend: 'legend2',
      //   data: chart2Points,
      //   color: DefaultPalette.blueLight,
      // },
    ];

    const chartData = {
      series: chartPoints,
    };

    const rootStyle: IRootStyles = { width: '650px', height: '400px' };

    return (
      <div className={mergeStyles(rootStyle)}>
        <AreaChart isXAxisDateType height={400} width={650} showYAxisGridLines={true} data={chartData} />
      </div>
    );
  }
}
