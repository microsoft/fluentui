import * as React from 'react';

import { customizable } from '../../../Utilities';
import { PieChart, IPieChartProps } from '@uifabric/charting/lib/PieChart';

@customizable('PieChartBasicExample', ['theme', 'styles'])
export class PieChartBasicExample extends React.Component<IPieChartProps, {}> {
  constructor(props: IPieChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = [{ value: 50, label: 'A' }, { value: 25, label: 'B' }, { value: 25, label: 'C' }];
    const colors = ['#FF5733', '#176213', '#193BBD'];
    return <PieChart data={points} chartTitle={'Pie Chart'} colors={colors} />;
  }
}
