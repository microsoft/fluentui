import * as React from 'react';
import { GroupedVerticalBarChart } from '@uifabric/charting/lib/GroupedVerticalBarChart';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class GroupedVerticalBarChartBasicExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const data = [
      {
        name: '2000',
        series: [
          {
            key: 'series1',
            data: 9,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 85,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 36,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
          {
            key: 'series4',
            data: 66,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
          },
          {
            key: 'series5',
            data: 34,
            color: DefaultPalette.blueDark,
            legend: 'MetaData5',
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
            data: 50,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 33,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
          {
            key: 'series4',
            data: 44,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
          },
          {
            key: 'series5',
            data: 72,
            color: DefaultPalette.blueDark,
            legend: 'MetaData5',
          },
        ],
      },
      {
        name: '2020',
        series: [
          {
            key: 'series1',
            data: 33,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 3,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 75,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
          {
            key: 'series4',
            data: 29,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
          },
          {
            key: 'series5',
            data: 90,
            color: DefaultPalette.blueDark,
            legend: 'MetaData5',
          },
        ],
      },
    ];

    const rootStyle: IRootStyles = { width: '650px', height: '400px' };

    return (
      <div className={mergeStyles(rootStyle)}>
        <GroupedVerticalBarChart data={data} showYAxisGridLines />
      </div>
    );
  }
}
