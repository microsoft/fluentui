import * as React from 'react';

import { DonutChart, IDonutChartProps } from '@uifabric/charting/lib/DonutChart';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points = [{ y: 50, x: 'A' }, { y: 25, x: 'B' }, { y: 25, x: 'C' }];
    const colors = ['#FF5733', '#176213', '#193BBD'];
    return <DonutChart data={points} colors={colors} />;
  }
}
