import * as React from 'react';
import { ChartDataMode, HorizontalBarChart, IHorizontalBarChartProps } from '@fluentui/react-charting';

interface IHorizontalBarChartState {
  chartMode: ChartDataMode;
}

export class HorizontalBarChartErrorExample extends React.Component<
  IHorizontalBarChartProps,
  IHorizontalBarChartState
> {
  constructor(props: IHorizontalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample() {
    return (
      <>
        <div style={{ maxWidth: 600 }}>
          <HorizontalBarChart culture={window.navigator.language} data={[]} />
        </div>
      </>
    );
  }
}
