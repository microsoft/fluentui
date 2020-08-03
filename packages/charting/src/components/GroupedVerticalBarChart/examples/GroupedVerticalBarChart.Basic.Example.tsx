import * as React from 'react';
import { GroupedVerticalBarChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class GroupedVerticalBarChartBasicExample extends React.Component<Readonly<{}>, {}> {
  public render(): React.ReactNode {
    const data = [
      {
        name: 'Hello ',
        series: [
          {
            key: 'series1',
            data: 90000,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '9%',
          },
          {
            key: 'series2',
            data: 85000,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '85%',
          },
        ],
      },
      {
        name: 'Second Graphj',
        series: [
          {
            key: 'series1',
            data: 36000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '36%',
          },
          {
            key: 'series2',
            data: 66000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '66%',
          },
        ],
      },
      {
        name: 'IamALLLincluded will test how much it can effort ',
        series: [
          {
            key: 'series1',
            data: 14000,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '14%',
          },
          {
            key: 'series2',
            data: 50000,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '50%',
          },
        ],
      },
      {
        name: 'third Graph',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 44000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '44%',
          },
        ],
      },
      {
        name: 'Ju St',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 3000,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
          },
        ],
      },
      {
        name: '1 2',
        series: [
          {
            key: 'series1',
            data: 75000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '75%',
          },
          {
            key: 'series2',
            data: 29000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '29%',
          },
        ],
      },
      // {
      //   name: 'SecondONe IamALLL ',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 14000,
      //       color: DefaultPalette.accent,
      //       legend: 'MetaData1',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '14%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 50000,
      //       color: DefaultPalette.blueMid,
      //       legend: 'MetaData2',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '50%',
      //     },
      //   ],
      // },
      // {
      //   name: 'testing',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 7000,
      //       color: DefaultPalette.blueLight,
      //       legend: 'MetaData3',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '75%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 56000,
      //       color: DefaultPalette.blue,
      //       legend: 'MetaData4',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '29%',
      //     },
      //   ],
      // },
      // {
      //   name: 'last onee',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 75000,
      //       color: DefaultPalette.blueLight,
      //       legend: 'MetaData3',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '75%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 29000,
      //       color: DefaultPalette.blue,
      //       legend: 'MetaData4',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '29%',
      //     },
      //   ],
      // },
      // {
      //   name: 'single',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 90000,
      //       color: DefaultPalette.accent,
      //       legend: 'MetaData1',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '9%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 85000,
      //       color: DefaultPalette.blueMid,
      //       legend: 'MetaData2',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '85%',
      //     },
      //   ],
      // },
      {
        name: 'JuSt TeSt',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.accent,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 3000,
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
          },
        ],
      },
      // {
      //   name: 'yes Graph',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 33000,
      //       color: DefaultPalette.blueLight,
      //       legend: 'MetaData3',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '33%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 44000,
      //       color: DefaultPalette.blue,
      //       legend: 'MetaData4',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '44%',
      //     },
      //   ],
      // },
      // {
      //   name: 'small text',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 14000,
      //       color: DefaultPalette.accent,
      //       legend: 'MetaData1',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '14%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 50000,
      //       color: DefaultPalette.blueMid,
      //       legend: 'MetaData2',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '50%',
      //     },
      //   ],
      // },
      // {
      //   name: 'xyz',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 90000,
      //       color: DefaultPalette.accent,
      //       legend: 'MetaData1',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '9%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 85000,
      //       color: DefaultPalette.blueMid,
      //       legend: 'MetaData2',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '85%',
      //     },
      //   ],
      // },
      // {
      //   name: 'kowsar shaik',
      //   series: [
      //     {
      //       key: 'series1',
      //       data: 33000,
      //       color: DefaultPalette.accent,
      //       legend: 'MetaData1',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '33%',
      //     },
      //     {
      //       key: 'series2',
      //       data: 3000,
      //       color: DefaultPalette.blueMid,
      //       legend: 'MetaData2',
      //       xAxisCalloutData: '2020/04/30',
      //       yAxisCalloutData: '3%',
      //     },
      //   ],
      // },
    ];

    const rootStyle = mergeStyles({ width: '650px', height: '400px' });

    return (
      <div className={rootStyle}>
        <GroupedVerticalBarChart data={data} height={400} width={650} showYAxisGridLines showTooltipOnAxisLables />
        {/* <GroupedVerticalBarChart data={data} height={400} width={650} showYAxisGridLines /> */}
      </div>
    );
  }
}
