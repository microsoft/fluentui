import * as React from 'react';

import { customizable } from 'office-ui-fabric-react/lib/Utilities';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';

@customizable('StackedBarChartBasicExample', ['theme', 'styles'])
export class StackedBarChartBasicExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = [
      { label: 'first', value: 40 },
      { label: 'second', value: 23 },
      { label: 'third', value: 35 },
      { label: 'fourth', value: 87 }
    ];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} />;
  }
}
