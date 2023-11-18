import * as React from 'react';
import { PieChart, IPieChartProps } from '@fluentui/react-charting';
import { Stack, StackItem } from '@fluentui/react';

export class PieChartBasicExample extends React.Component<IPieChartProps, { width: number; height: number }> {
  constructor(props: IPieChartProps) {
    super(props);
    this.state = {
      height: 350,
      width: 600,
    };
  }

  public render(): JSX.Element {
    const points = [
      { y: 50, x: 'ABCD' },
      { y: 25, x: 'EFGH' },
      { y: 25, x: 'IJKL' },
    ];
    return (
      <React.Fragment>
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <StackItem>
            <label htmlFor="width-slider">Width:</label>
            <input
              type="range"
              value={this.state.width}
              min={0}
              max={1000}
              id="width-slider"
              onChange={this._onWidthChange}
              aria-valuetext={`Width: ${this.state.width}`}
            />
          </StackItem>
          <StackItem>
            <label htmlFor="height-slider">Height:</label>
            <input
              type="range"
              value={this.state.height}
              min={0}
              max={1000}
              id="height-slider"
              onChange={this._onHeightChange}
              aria-valuetext={`height: ${this.state.height}`}
            />
          </StackItem>
        </Stack>
        <PieChart
          width={this.state.width}
          height={this.state.height}
          culture={window.navigator.language}
          data={points}
          chartTitle="Pie Chart basic example"
        />
      </React.Fragment>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}
