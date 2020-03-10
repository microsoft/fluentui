import * as React from 'react';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart';
import { IChartDataPoint, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart.types';
// '@uifabric/charting/lib/VerticalStackedBarChart';

export class VerticalStackedBarChartBasicExample extends React.Component<IVerticalStackedBarChartProps, {}> {
  constructor(props: IVerticalStackedBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const firstChartPoints: IChartDataPoint[] = [
      { legend: 'redDelicious', data: 40, color: DefaultPalette.accent },
      { legend: 'mcintosh', data: 10, color: DefaultPalette.blueMid },
      { legend: 'oranges', data: 80, color: DefaultPalette.blueLight }
    ];

    const secondChartPoints: IChartDataPoint[] = [
      { legend: 'redDelicious', data: 23, color: DefaultPalette.accent },
      { legend: 'mcintosh', data: 19, color: DefaultPalette.blueMid },
      { legend: 'oranges', data: 40, color: DefaultPalette.blueLight }
    ];

    const thirdChartPoints: IChartDataPoint[] = [
      { legend: 'redDelicious', data: 10, color: DefaultPalette.accent },
      { legend: 'mcintosh', data: 60, color: DefaultPalette.blueMid },
      { legend: 'oranges', data: 30, color: DefaultPalette.blueLight }
    ];

    const data: IChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'new' },
      // { chartData: secondChartPoints, xAxisPoint: 'hello222' },
      // { chartData: thirdChartPoints, xAxisPoint: 'al333' },
      { chartData: firstChartPoints, xAxisPoint: '4444' },
      { chartData: thirdChartPoints, xAxisPoint: '5555' },
      { chartData: firstChartPoints, xAxisPoint: 'number6' },
      { chartData: firstChartPoints, xAxisPoint: 'new77' },
      { chartData: secondChartPoints, xAxisPoint: 'hello88' },
      { chartData: firstChartPoints, xAxisPoint: 'new9' },
      { chartData: secondChartPoints, xAxisPoint: 'hello10' },
      { chartData: firstChartPoints, xAxisPoint: 'new11' },
      { chartData: secondChartPoints, xAxisPoint: 'hello1222' }
    ];

    // const date = [

    // ]

    return <VerticalStackedBarChart data={data} href={'www.google.com'} chartLabel="Card title" />;
  }
}
