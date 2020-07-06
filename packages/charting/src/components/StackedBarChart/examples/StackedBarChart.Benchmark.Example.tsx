import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartBenchmarkExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 10, color: DefaultPalette.redDark },
      { legend: 'second', data: 90, color: DefaultPalette.neutralTertiaryAlt, placeHolder: true },
    ];

    const data: IChartProps = {
      chartData: points,
    };

    return (
      <>
        <StackedBarChart data={data} ignoreFixStyle={true} />
        <br />
        <StackedBarChart data={data} ignoreFixStyle={true} />
      </>
    );
  }
}
