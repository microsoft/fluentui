import * as React from 'react';
import {
  StackedBarChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class StackedBarChartBenchmarkExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 10, color: getColorFromToken(DataVizPalette.color7) },
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
