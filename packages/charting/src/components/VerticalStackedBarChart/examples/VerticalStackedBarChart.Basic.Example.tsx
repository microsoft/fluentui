import * as React from 'react';
import { IVSChartDataPoint, IVerticalStackedChartProps, VerticalStackedBarChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackedBarChartBasicExample extends React.Component<Readonly<{}>, {}> {
  public render(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
      },
      {
        legend: 'Metadata2',
        data: 5,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '5%',
      },
      {
        legend: 'Metadata3',
        data: 20,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 30,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
      },
      {
        legend: 'Metadata2',
        data: 20,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
      },
      {
        legend: 'Metadata3',
        data: 40,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 44,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
      },
      {
        legend: 'Metadata2',
        data: 28,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '28%',
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
      },
    ];

    const fourthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 88,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '88%',
      },
      {
        legend: 'Metadata2',
        data: 22,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '22%',
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
      },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 0 },
      { chartData: secondChartPoints, xAxisPoint: 40 },
      { chartData: thirdChartPoints, xAxisPoint: 62 },
      { chartData: firstChartPoints, xAxisPoint: 83 },
      { chartData: fourthChartPoints, xAxisPoint: 18 },
      { chartData: firstChartPoints, xAxisPoint: 100 },
    ];

    return <VerticalStackedBarChart data={data} chartLabel="Card title" />;
  }
}
