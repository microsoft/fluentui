import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
import * as React from 'react';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartRebalanceExample extends React.Component<{}, ISankeyChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 820,
      height: 400,
    };
  }

  public render(): JSX.Element {
    return <div>{this._inboxExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _inboxExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          {
            nodeId: 0,
            name: 'Large Source',
          },
          {
            nodeId: 1,
            name: 'Tiny Source',
          },
          {
            nodeId: 2,
            name: 'Large Target',
          },
          {
            nodeId: 3,
            name: 'Tiny Target',
          },
        ],
        links: [
          {
            source: 0,
            target: 2,
            value: 10000,
          },
          {
            source: 1,
            target: 2,
            value: 1,
          },
          {
            source: 0,
            target: 3,
            value: 1,
          },
          {
            source: 1,
            target: 3,
            value: 1,
          },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={912} max={1600} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={312} max={400} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <SankeyChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            shouldResize={this.state.width + this.state.height}
          />
        </div>
      </>
    );
  }
}
