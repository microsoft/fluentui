import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
import * as React from 'react';
//import { IPalette } from '@fluentui/react/lib/Styling';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartInboxExample extends React.Component<{}, ISankeyChartBasicState> {
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
            name: '192.168.42.72',
            color: '#8764B8',
            borderColor: '#4B3867',
          },
          {
            nodeId: 1,
            name: '172.152.48.13',
            color: '#8764B8',
            borderColor: '#4B3867',
          },
          {
            nodeId: 2,
            name: '124.360.55.1',
            color: '#8764B8',
            borderColor: '#4B3867',
          },
          {
            nodeId: 3,
            name: '192.564.10.2',
            color: '#8764B8',
            borderColor: '#4B3867',
          },
          {
            nodeId: 4,
            name: '124.124.50.1',
            color: '#8764B8',
            borderColor: '#4B3867',
          },
          {
            nodeId: 5,
            name: '172.630.89.4',
            color: '#8764B8',
            borderColor: '#4B3867',
          },
          {
            nodeId: 6,
            name: 'inbox',
            color: '#0E7878',
            borderColor: '#004E4E',
          },
          {
            nodeId: 7,
            name: 'Junk Folder',
            color: '#0E7878',
            borderColor: '#004E4E',
          },
          {
            nodeId: 8,
            name: 'Deleted Folder',
            color: '#0E7878',
            borderColor: '#004E4E',
          },
          {
            nodeId: 9,
            name: 'Clicked',
            color: '#4F6BED',
            borderColor: '#3B52B4',
          },
          {
            nodeId: 10,
            name: 'Opened',
            color: '#4F6BED',
            borderColor: '#3B52B4',
          },
          {
            nodeId: 11,
            name: ' No further action  required',
            color: '#4F6BED',
            borderColor: '#3B52B4',
          },
        ],
        links: [
          {
            source: 0,
            target: 6,
            value: 80,
          },
          {
            source: 1,
            target: 6,
            value: 50,
          },
          {
            source: 1,
            target: 7,
            value: 28,
          },
          {
            source: 2,
            target: 7,
            value: 14,
          },
          {
            source: 3,
            target: 7,
            value: 7,
          },
          {
            source: 3,
            target: 8,
            value: 20,
          },
          {
            source: 4,
            target: 7,
            value: 10,
          },
          {
            source: 5,
            target: 7,
            value: 10,
          },

          {
            source: 6,
            target: 9,
            value: 30,
          },
          {
            source: 6,
            target: 10,
            value: 55,
          },
          {
            source: 7,
            target: 11,
            value: 60,
          },
          {
            source: 8,
            target: 11,
            value: 2,
          },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={400} max={1600} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={312} max={400} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <SankeyChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            shouldResize={this.state.width + this.state.height}
            strings={{
              linkFrom: 'from category {0}',
            }}
            accessibility={{
              emptyAriaLabel: 'Graph has no data to display',
              nodeAriaLabel: 'Category {0} with email count {1}',
              linkAriaLabel: '{2} items moved from category {0} to {1}',
            }}
          />
        </div>
      </>
    );
  }
}
