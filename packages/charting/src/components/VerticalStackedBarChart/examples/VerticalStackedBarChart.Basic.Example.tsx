import * as React from 'react';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart';
import { IChartDataPoint, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

import { IVerticalStackedBarChartProps } from '@uifabric/charting/lib/VerticalStackedBarChart';
// '../VerticalStackedBarChart.types';
// '@uifabric/charting/lib/VerticalStackedBarChart';

export class VerticalStackedBarChartBasicExample extends React.Component<IVerticalStackedBarChartProps, {}> {
  constructor(props: IVerticalStackedBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const firstChartPoints: IChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 50, color: DefaultPalette.blueLight }
      // { legend: 'redDelicious2', data: 40, color: DefaultPalette.accent },
      // { legend: 'mcintosh2', data: 10, color: DefaultPalette.blueMid },
      // { legend: 'oranges2', data: 80, color: DefaultPalette.blueLight },
      // { legend: 'redDelicious3', data: 40, color: DefaultPalette.accent },
      // { legend: 'mcintosh3', data: 10, color: DefaultPalette.blueMid },
      // { legend: 'oranges3', data: 80, color: DefaultPalette.blueLight },
      // { legend: 'redDelicious4', data: 40, color: DefaultPalette.accent },
      // { legend: 'mcintosh4', data: 10, color: DefaultPalette.blueMid },
      // { legend: 'oranges4', data: 80, color: DefaultPalette.blueLight }
    ];

    const secondChartPoints: IChartDataPoint[] = [
      { legend: 'Metadata1', data: 23, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 19, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight }
    ];

    const thirdChartPoints: IChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight }
    ];

    const data: IChartProps[] = [
      // { chartData: firstChartPoints, xAxisPoint: 'new' },
      // { chartData: secondChartPoints, xAxisPoint: 'hello222' },
      // { chartData: thirdChartPoints, xAxisPoint: 'al333' },
      // { chartData: firstChartPoints, xAxisPoint: '4444' }
      // { chartData: thirdChartPoints, xAxisPoint: '5555' },
      // { chartData: firstChartPoints, xAxisPoint: 'number6' },
      // { chartData: firstChartPoints, xAxisPoint: 'new77' },
      // { chartData: secondChartPoints, xAxisPoint: 'hello88' },
      // { chartData: firstChartPoints, xAxisPoint: 'new9' },
      // { chartData: secondChartPoints, xAxisPoint: 'hello10' },
      // { chartData: firstChartPoints, xAxisPoint: 'new11' },
      // { chartData: secondChartPoints, xAxisPoint: 'hello1222' }
      { chartData: firstChartPoints, xAxisPoint: 0 },
      { chartData: secondChartPoints, xAxisPoint: 45 },
      { chartData: thirdChartPoints, xAxisPoint: 80 },
      { chartData: firstChartPoints, xAxisPoint: 100 }
    ];

    // const date = [

    // ]

    return <VerticalStackedBarChart data={data} yAxisTickCount={10} href={'www.google.com'} chartLabel="Card title" />;
  }
}
