import * as React from 'react';
import { GroupedVerticalBarChart } from '@uifabric/charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class GroupedVerticalBarChartStyledExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const data = [
      {
        name: '2000',
        series: [
          {
            key: 'series1',
            data: 66,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 13,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 34,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
        ],
      },
      {
        name: '2010',
        series: [
          {
            key: 'series1',
            data: 14,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 90,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 33,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
        ],
      },
      {
        name: '2020',
        series: [
          {
            key: 'series1',
            data: 54,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 72,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 18,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
        ],
      },
    ];

    return (
      <div style={{ width: '650px', height: '400px' }}>
        <GroupedVerticalBarChart
          data={data}
          width={650}
          height={400}
          showYAxisGridLines
          yAxisTickCount={10}
          barwidth={43}
        />
      </div>
    );
  }
}
