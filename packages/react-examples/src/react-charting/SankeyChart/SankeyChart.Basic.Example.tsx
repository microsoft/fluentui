import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
import * as React from 'react';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartBasicExample extends React.Component<{}, ISankeyChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 820,
      height: 412,
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
            color: '#00758F',
            borderColor: '#002E39',
          },
          {
            nodeId: 1,
            name: 'node1',
            color: '#77004D',
            borderColor: '#43002C',
          },
          {
            nodeId: 2,
            name: 'node2',
            color: '#4F6BED',
            borderColor: '#3B52B4',
          },
          {
            nodeId: 3,
            name: 'node3',
            color: '#937600',
            borderColor: '#6D5700',
          },
          {
            nodeId: 4,
            name: 'node4',
            color: '#286EA8',
            borderColor: '#00457E',
          },
          {
            nodeId: 5,
            name: 'node5',
            color: '#A43FB1',
            borderColor: '#7C158A',
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
            target: 5,
            value: 4,
          },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={400}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={312}
          max={400}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
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
