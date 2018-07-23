import * as React from 'react';

import { customizable } from '@uifabric/charting/lib/Utilities';
import { ProgressBarChart, IProgressBarChartProps } from '@uifabric/charting/lib/ProgressBarChart';

@customizable('ProgressBarChartBasicExample', ['theme', 'styles'])
export class ProgressBarChartBasicExample extends React.Component<IProgressBarChartProps, {}> {
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = { value: 500, total: 1000 };
    const colors = { backgroundColor: 'grey', barColor: 'blue' };

    return <ProgressBarChart data={points} chartTitle={'Sub Heading'} colors={colors} />;
  }
}
