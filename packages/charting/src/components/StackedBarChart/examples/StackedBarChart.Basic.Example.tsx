import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 3000000,
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
      },
      { legend: 'second', data: 1, color: DefaultPalette.green },
    ];

    const data0: IChartProps = {
      chartTitle: 'Stacked Bar chart example',
      chartData: points,
    };

    const data1: IChartProps = {
      chartTitle: 'Stacked Bar chart example with ignore fix style',
      chartData: points,
    };

    return (
      <>
        <StackedBarChart data={data0} href={'https://developer.microsoft.com/en-us/'} ignoreFixStyle={false} />
        <br />
        <StackedBarChart
          data={data1}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={true}
          hideTooltip={true}
        />
      </>
    );
  }
}
