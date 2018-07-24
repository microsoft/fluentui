import * as React from 'react';

import { customizable } from '../../../Utilities';
import { DonutChart, IDonutChartProps } from '@uifabric/charting/lib/DonutChart';

@customizable('DonutChartBasicExample', ['theme', 'styles'])
export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = [{ value: 50, label: 'A' }, { value: 25, label: 'B' }, { value: 25, label: 'C' }];
    const colors = ['#FF5733', '#176213', '#193BBD'];
    return <DonutChart data={points} colors={colors} />;
  }
}
