import * as React from 'react';
import { AreaChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as d3 from 'd3-format';

interface IRootStyles {
  height: string;
  width: string;
}

export class AreaChartMultipleExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const chart1Points = [
      {
        x: 20,
        y: 30,
      },
      {
        x: 25,
        y: 40,
      },
      {
        x: 30,
        y: 14,
      },
      {
        x: 35,
        y: 23,
      },
      {
        x: 40,
        y: 20,
      },
      {
        x: 45,
        y: 36,
      },
      {
        x: 50,
        y: 45,
      },
      {
        x: 55,
        y: 40,
      },
      {
        x: 60,
        y: 55,
      },
      {
        x: 65,
        y: 60,
      },
    ];

    const chart2Points = [
      {
        x: 20,
        y: 30,
      },
      {
        x: 25,
        y: 60,
      },
      {
        x: 30,
        y: 40,
      },
      {
        x: 35,
        y: 10,
      },
      {
        x: 40,
        y: 40,
      },
      {
        x: 45,
        y: 60,
      },
      {
        x: 50,
        y: 50,
      },
      {
        x: 55,
        y: 70,
      },
      {
        x: 60,
        y: 30,
      },
      {
        x: 65,
        y: 55,
      },
    ];

    const chart3Points = [
      {
        x: 20,
        y: 40,
      },
      {
        x: 25,
        y: 50,
      },
      {
        x: 30,
        y: 100,
      },
      {
        x: 35,
        y: 40,
      },
      {
        x: 40,
        y: 10,
      },
      {
        x: 45,
        y: 40,
      },
      {
        x: 50,
        y: 34,
      },
      {
        x: 55,
        y: 40,
      },
      {
        x: 60,
        y: 60,
      },
      {
        x: 65,
        y: 40,
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
      {
        legend: 'legend3',
        data: chart3Points,
        color: DefaultPalette.blueDark,
      },
    ];

    const chartData = {
      series: chartPoints,
    };

    const rootStyle: IRootStyles = { width: '650px', height: '400px' };

    return (
      <div className={mergeStyles(rootStyle)}>
        <AreaChart
          showXAxisPath={true}
          showYAxisPath={true}
          showXAxisGridLines={true}
          showYAxisGridLines={true}
          height={400}
          width={650}
          data={chartData}
          legendsOverflowText={'Overflow Items'}
          yAxisTickFormat={d3.format('$,')}
        />
      </div>
    );
  }
}
