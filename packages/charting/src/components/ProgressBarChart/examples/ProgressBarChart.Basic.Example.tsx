import * as React from 'react';

import { customizable } from '../../../Utilities';
import { ProgressBarChart, IProgressBarChartProps } from '../../ProgressBarChart';

@customizable('ProgressBarChartBasicExample', ['theme', 'styles'])
export class ProgressBarChartBasicExample extends React.Component<IProgressBarChartProps, {}> {
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = { value: 888, total: 1000 };
    const colors = ['red', 'gray'];

    return <ProgressBarChart data={points} chartTitle={'Sub Heading'} colors={colors} />;
  }
}
