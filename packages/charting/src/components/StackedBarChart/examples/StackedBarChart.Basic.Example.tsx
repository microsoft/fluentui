import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 40, color: DefaultPalette.blue },
      { legend: 'second', color: DefaultPalette.green }
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points
    };

    return <StackedBarChart data={data} href={'https://developer.microsoft.com/en-us/'} />;
  }
}
