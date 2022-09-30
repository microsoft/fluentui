import * as React from 'react';
import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
//import { IPalette } from '@fluentui/react/lib/Styling';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartOnePercentExample extends React.Component<{}, ISankeyChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 912,
      height: 400,
    };
  }

  public render(): JSX.Element {
    return <div>{this._onePercentExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _onePercentExample(): JSX.Element {
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
            color: '#0078D4',
          },
          {
            nodeId: 2,
            name: 'node2',
            color: '#0078D4',
          },
          {
            nodeId: 3,
            name: 'node3',
            color: '#0078D4',
          },
          {
            nodeId: 4,
            name: 'node4',
            color: '#0078D4',
          },
          {
            nodeId: 5,
            name: 'node5',
            color: '#0078D4',
          },
          {
            nodeId: 6,
            name: 'node6',
            color: '#E3008C',
          },
          {
            nodeId: 7,
            name: 'node7',
            color: '#E3008C',
          },
        ],
        links: [
          {
            source: 0,
            target: 6,
            value: 5,
          },
          {
            source: 1,
            target: 6,
            value: 5,
          },
          {
            source: 2,
            target: 6,
            value: 5,
          },
          {
            source: 3,
            target: 6,
            value: 5,
          },
          {
            source: 4,
            target: 7,
            value: 900,
          },
          {
            source: 5,
            target: 7,
            value: 80,
          },
          // {
          //   source: 3,
          //   target: 4,
          //   value: 4,
          // },
          // {
          //   source: 3,
          //   target: 4,
          //   value: 4,
          // },
          // {
          //   source: 3,
          //   target: 5,
          //   value: 4,
          // },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={912} max={1600} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={312} max={800} onChange={this._onHeightChange} />
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
