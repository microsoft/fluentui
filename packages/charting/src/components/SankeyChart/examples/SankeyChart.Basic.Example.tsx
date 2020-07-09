import * as React from 'react';
import { IChartProps, ISankeyChartProps, SankeyChart } from '../index';

interface ILineChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartBasicExample extends React.Component<{}, ILineChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _basicExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          {
            nodeId: 0,
            name: 'node0',
            color: '#0078D4',
          },
          {
            nodeId: 1,
            name: 'node1',
            color: '#EF6950',
          },
          {
            nodeId: 2,
            name: 'node2',
            color: '#00188F',
          },
          {
            nodeId: 3,
            name: 'node3',
            color: '#022F22',
          },
          {
            nodeId: 4,
            name: 'node4',
            color: '#00A2AD',
          },
          {
            nodeId: 5,
            name: 'node5',
            color: '#E3008C',
          },
        ],
        links: [
          {
            source: 0,
            target: 2,
            value: 2,
          },
          {
            source: 1,
            target: 2,
            value: 2,
          },
          {
            source: 1,
            target: 3,
            value: 2,
          },
          {
            source: 0,
            target: 4,
            value: 2,
          },
          {
            source: 2,
            target: 3,
            value: 2,
          },
          {
            source: 2,
            target: 4,
            value: 2,
          },
          {
            source: 3,
            target: 4,
            value: 4,
          },
          {
            source: 3,
            target: 4,
            value: 4,
          },
          {
            source: 3,
            target: 5,
            value: 4,
          },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
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
