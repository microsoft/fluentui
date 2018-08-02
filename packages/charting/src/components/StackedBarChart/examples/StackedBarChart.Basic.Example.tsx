import * as React from 'react';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';
export class StackedBarChartBasicExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = [{ x: 'first', y: 40 }, { x: 'second', y: 23 }];
    const colors = ['#581845', '#808000'];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} colors={colors} />;
  }
}
