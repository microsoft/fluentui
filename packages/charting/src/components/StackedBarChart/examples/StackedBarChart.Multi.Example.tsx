import * as React from 'react';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';
export class StackedBarChartMultiExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    return <div>{this._stackedExample()}</div>;
  }

  private _stackedExample(): JSX.Element {
    const points = [
      { x: 'first Lorem Ipsum is simply dummy text', y: 40 },
      { x: 'second', y: 23 },
      { x: 'third Lorem Ipsum is simply dummy text of the printing', y: 35 },
      { x: 'fourth', y: 87 }
    ];
    const colors = ['#581845', '#808000', '#00FF00', '#008000'];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} colors={colors} />;
  }
}
