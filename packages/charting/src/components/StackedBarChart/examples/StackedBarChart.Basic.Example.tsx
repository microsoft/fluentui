import * as React from 'react';

import { customizable } from '../../../Utilities';
import { StackedBarChart, IStackedBarChartProps } from '../../StackedBarChart';

@customizable('StackedBarChartBasicExample', ['theme', 'styles'])
export class StackedBarChartBasicExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = [40, 25, 53, 87];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar Chart'} />;
  }
}
