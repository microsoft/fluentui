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
        name: 'India',
        series: [
          {
            key: 'series1',
            data: 90,
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
        name: 'Italy',
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
    ];

    const rootStyle: IRootStyles = { width: '650px', height: '400px' };

    return (
      <div className={mergeStyles(rootStyle)}>
        <GroupedVerticalBarChart data={data} showYAxisGridLines />
      </div>
    );
  }
}
