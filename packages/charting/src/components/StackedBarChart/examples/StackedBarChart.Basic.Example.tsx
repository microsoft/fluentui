import * as React from 'react';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';
import { customizable } from 'office-ui-fabric-react/lib/Utilities';
@customizable('StackedBarChartBasicExample', ['theme', 'styles'])

export class StackedBarChartBasicExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        {this._basicExample()}
        <hr />
        {this._stackedExample()}
      </div>
    );
  }

  private _basicExample(): JSX.Element {
    const points = [{ x: 'first', y: 40 }, { x: 'second', y: 23 }];
    const colors = ['#581845', '#808000'];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} colors={colors} />;
  }
  private _stackedExample(): JSX.Element {
    const points = [
      { x: 'first greihfsd 3gref ds34refsd 43feds43 feds', y: 40 },
      { x: 'second', y: 23 },
      { x: 'third rgedifohj5 redg5 uhdft5udhf', y: 35 },
      { x: 'fourth', y: 87 }
    ];
    const colors = ['#581845', '#808000', '#00FF00', '#008000'];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} colors={colors} />;
  }
}
