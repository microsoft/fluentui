import * as React from 'react';
import { HorizontalBarChartWithAxis, IHorizontalBarChartWithAxisProps } from '@fluentui/react-charting';

interface IHorizontalBarChartWithAxisState {
  width: number;
  height: number;
  isCalloutselected: boolean;
  useSingleColor: boolean;
}

export class HorizontalBarChartWithAxisErrorExample extends React.Component<
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisState
> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    return (
      <>
        <div style={{ maxWidth: 600 }}>
          <HorizontalBarChartWithAxis
            culture={window.navigator.language}
            chartTitle="Horizontal bar chart error example "
            data={[]}
          />
        </div>
      </>
    );
  }
}
