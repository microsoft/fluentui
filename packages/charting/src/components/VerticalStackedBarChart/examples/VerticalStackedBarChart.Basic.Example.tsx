import * as React from 'react';
import { IVSChartDataPoint, IVerticalStackedChartProps, VerticalStackedBarChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackedBarChartBasicExample extends React.Component<Readonly<{}>, {}> {
  public render(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 10,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '10%',
      },
      {
        legend: 'Metadata2',
        data: 35,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '35%',
      },
      {
        legend: 'Metadata3',
        data: 150,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '15%',
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '40%',
      },
      {
        legend: 'Metadata2',
        data: 22,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '22%',
      },
      {
        legend: 'Metadata3',
        data: 39,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '39%',
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 45,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '45%',
      },
      {
        legend: 'Metadata2',
        data: 43,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '43%',
      },
      {
        legend: 'Metadata3',
        data: 27,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '27%',
      },
    ];

    const fourthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 15,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '15%',
      },
      {
        legend: 'Metadata2',
        data: 33,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '33%',
      },
      {
        legend: 'Metadata3',
        data: 22,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '22%',
      },
    ];

    const fifthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 25,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '25%',
      },
      {
        legend: 'Metadata2',
        data: 33,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '33%',
      },
      {
        legend: 'Metadata3',
        data: 42,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/29/04',
        yAxisCalloutData: '42%',
      },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: fourthChartPoints, xAxisPoint: 0 },
      { chartData: secondChartPoints, xAxisPoint: 20 },
      { chartData: thirdChartPoints, xAxisPoint: 39 },
      { chartData: firstChartPoints, xAxisPoint: 66 },
      { chartData: fourthChartPoints, xAxisPoint: 80 },
      { chartData: fifthChartPoints, xAxisPoint: 50 },
      { chartData: fifthChartPoints, xAxisPoint: 100 },
    ];

    return <VerticalStackedBarChart data={data} chartLabel="Card title" />;
  }
}
