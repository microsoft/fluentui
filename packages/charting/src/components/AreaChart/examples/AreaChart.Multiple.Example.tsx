import * as React from 'react';
import { AreaChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as d3 from 'd3-format';

export class AreaChartMultipleExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const chart1Points = [
      {
        x: 20,
        y: 9,
      },
      {
        x: 25,
        y: 14,
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
        y: 31,
      },
      {
        x: 50,
        y: 29,
      },
      {
        x: 55,
        y: 27,
      },
      {
        x: 60,
        y: 37,
      },
      {
        x: 65,
        y: 51,
      },
    ];

    const chart2Points = [
      {
        x: 20,
        y: 21,
      },
      {
        x: 25,
        y: 25,
      },
      {
        x: 30,
        y: 10,
      },
      {
        x: 35,
        y: 10,
      },
      {
        x: 40,
        y: 14,
      },
      {
        x: 45,
        y: 18,
      },
      {
        x: 50,
        y: 9,
      },
      {
        x: 55,
        y: 23,
      },
      {
        x: 60,
        y: 7,
      },
      {
        x: 65,
        y: 55,
      },
    ];

    const chart3Points = [
      {
        x: 20,
        y: 30,
      },
      {
        x: 25,
        y: 35,
      },
      {
        x: 30,
        y: 33,
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
      chartTtitle: 'Area chart multiple example',
      lineChartData: chartPoints,
    };

    const rootStyle = mergeStyles({ width: '650px', height: '400px' });

    return (
      <div className={rootStyle}>
        <AreaChart
          height={400}
          width={650}
          data={chartData}
          legendsOverflowText={'Overflow Items'}
          yAxisTickFormat={d3.format('$,')}
          legendProps={{
            overflowProps: {
              focusZoneProps: {
                'aria-label': 'Legends container',
              },
            },
            allowFocusOnLegends: true,
          }}
        />
      </div>
    );
  }
}
