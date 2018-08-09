import * as React from 'react';
import { IMultiStackedBarChartProps } from '@uifabric/charting/lib/components/StackedBarChart/MultiStackedBarChart.types';

export class MultiStackedBarChart extends React.Component<IMultiStackedBarChartProps, {}> {
  constructor(props: IMultiStackedBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>Multi Stacked BarChart </div>;
  }
}
