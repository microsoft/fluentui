import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
import * as React from 'react';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartHoverExample extends React.Component<{}, ISankeyChartBasicState> {
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
          { nodeId: 0, name: 'Loc 01' },
          { nodeId: 1, name: 'Loc 02' },
          { nodeId: 2, name: 'Loc 03' },
          { nodeId: 3, name: 'Loc 04' },
          { nodeId: 4, name: 'Loc 05' },
          { nodeId: 5, name: 'Loc 06' },
          { nodeId: 6, name: 'Loc 07' },
          { nodeId: 7, name: 'Loc 08' },
          { nodeId: 8, name: 'Other' },
          { nodeId: 9, name: 'Loc 09' },
          { nodeId: 10, name: 'Loc 10' },
          { nodeId: 11, name: 'Device 01' },
          { nodeId: 12, name: 'Device 02' },
          { nodeId: 13, name: 'Device 03' },
          { nodeId: 14, name: 'Device 04' },
          { nodeId: 15, name: 'Other' },
          { nodeId: 16, name: 'Device 05' },
          { nodeId: 17, name: 'Device 06' },
          { nodeId: 18, name: 'Device 07' },
          { nodeId: 19, name: 'Device 08' },
          { nodeId: 20, name: 'Application 01 (Some long application sub-title)' },
          { nodeId: 21, name: 'Application 02 (Some long application sub-title)' },
          { nodeId: 22, name: 'Application 03 (Some long application sub-title)' },
          { nodeId: 23, name: 'Application 04 (Some long application sub-title)' },
          { nodeId: 24, name: 'Application 05 (Some long application sub-title)' },
          { nodeId: 25, name: 'Other' },
          { nodeId: 26, name: 'Application 06 (Some long application sub-title)' },
          { nodeId: 27, name: 'Application 07 (Some long application sub-title)' },
          { nodeId: 28, name: 'Application 08 (Some long application sub-title)' },
          { nodeId: 29, name: 'Application 09 (Some long application sub-title)' },
          { nodeId: 30, name: 'Application 10 (Some long application sub-title)' },
          { nodeId: 31, name: 'Conditional access not applied' },
          { nodeId: 32, name: 'All conditional access controls not satisfied' },
          { nodeId: 33, name: 'All conditional access controls satisfied' },
        ],
        links: [
          { source: 0, target: 11, value: 26 },
          { source: 0, target: 12, value: 5 },
          { source: 0, target: 14, value: 43 },
          { source: 0, target: 17, value: 390 },
          { source: 0, target: 18, value: 6 },
          { source: 1, target: 11, value: 265 },
          { source: 1, target: 12, value: 151 },
          { source: 1, target: 13, value: 48 },
          { source: 1, target: 14, value: 107 },
          { source: 1, target: 15, value: 12 },
          { source: 1, target: 16, value: 14 },
          { source: 1, target: 17, value: 1030 },
          { source: 1, target: 18, value: 28 },
          { source: 2, target: 11, value: 286 },
          { source: 2, target: 12, value: 151 },
          { source: 2, target: 14, value: 66 },
          { source: 2, target: 15, value: 20 },
          { source: 2, target: 16, value: 88 },
          { source: 2, target: 17, value: 1492 },
          { source: 3, target: 11, value: 577 },
          { source: 3, target: 12, value: 72 },
          { source: 3, target: 13, value: 63 },
          { source: 3, target: 14, value: 19 },
          { source: 3, target: 15, value: 3 },
          { source: 3, target: 16, value: 8 },
          { source: 3, target: 17, value: 1232 },
          { source: 3, target: 18, value: 33 },
          { source: 3, target: 19, value: 8 },
          { source: 4, target: 11, value: 182 },
          { source: 4, target: 12, value: 94 },
          { source: 4, target: 14, value: 209 },
          { source: 4, target: 15, value: 14 },
          { source: 4, target: 16, value: 6 },
          { source: 4, target: 17, value: 5056 },
          { source: 5, target: 11, value: 43 },
          { source: 5, target: 12, value: 17 },
          { source: 5, target: 14, value: 49 },
          { source: 5, target: 17, value: 367 },
          { source: 6, target: 11, value: 47 },
          { source: 6, target: 12, value: 4 },
          { source: 6, target: 14, value: 11 },
          { source: 6, target: 17, value: 952 },
          { source: 7, target: 11, value: 101 },
          { source: 7, target: 12, value: 16 },
          { source: 7, target: 14, value: 49 },
          { source: 7, target: 15, value: 8 },
          { source: 7, target: 16, value: 9 },
          { source: 7, target: 17, value: 723 },
          { source: 8, target: 11, value: 207 },
          { source: 8, target: 12, value: 116 },
          { source: 8, target: 13, value: 12 },
          { source: 8, target: 14, value: 171 },
          { source: 8, target: 15, value: 8 },
          { source: 8, target: 16, value: 8 },
          { source: 8, target: 17, value: 2040 },
          { source: 8, target: 18, value: 1 },
          { source: 8, target: 19, value: 4 },
          { source: 9, target: 11, value: 103 },
          { source: 9, target: 12, value: 22 },
          { source: 9, target: 14, value: 44 },
          { source: 9, target: 15, value: 7 },
          { source: 9, target: 16, value: 1 },
          { source: 9, target: 17, value: 829 },
          { source: 9, target: 18, value: 2 },
          { source: 10, target: 11, value: 36 },
          { source: 10, target: 12, value: 54 },
          { source: 10, target: 13, value: 1 },
          { source: 10, target: 14, value: 52 },
          { source: 10, target: 16, value: 2 },
          { source: 10, target: 17, value: 1468 },
          { source: 10, target: 18, value: 3 },
          { source: 11, target: 20, value: 13 },
          { source: 11, target: 21, value: 58 },
          { source: 11, target: 22, value: 115 },
          { source: 11, target: 23, value: 20 },
          { source: 11, target: 25, value: 1193 },
          { source: 11, target: 30, value: 474 },
          { source: 12, target: 20, value: 10 },
          { source: 12, target: 21, value: 39 },
          { source: 12, target: 22, value: 42 },
          { source: 12, target: 23, value: 5 },
          { source: 12, target: 25, value: 546 },
          { source: 12, target: 30, value: 60 },
          { source: 13, target: 20, value: 5 },
          { source: 13, target: 23, value: 2 },
          { source: 13, target: 24, value: 23 },
          { source: 13, target: 25, value: 54 },
          { source: 13, target: 30, value: 40 },
          { source: 14, target: 20, value: 165 },
          { source: 14, target: 21, value: 39 },
          { source: 14, target: 22, value: 51 },
          { source: 14, target: 23, value: 29 },
          { source: 14, target: 24, value: 5 },
          { source: 14, target: 25, value: 466 },
          { source: 14, target: 27, value: 65 },
          { source: 15, target: 20, value: 4 },
          { source: 15, target: 25, value: 68 },
          { source: 16, target: 20, value: 8 },
          { source: 16, target: 23, value: 3 },
          { source: 16, target: 24, value: 12 },
          { source: 16, target: 25, value: 113 },
          { source: 17, target: 20, value: 627 },
          { source: 17, target: 21, value: 419 },
          { source: 17, target: 22, value: 424 },
          { source: 17, target: 23, value: 334 },
          { source: 17, target: 24, value: 441 },
          { source: 17, target: 25, value: 5226 },
          { source: 17, target: 26, value: 2742 },
          { source: 17, target: 27, value: 3830 },
          { source: 17, target: 28, value: 978 },
          { source: 17, target: 29, value: 469 },
          { source: 17, target: 30, value: 89 },
          { source: 18, target: 20, value: 26 },
          { source: 18, target: 21, value: 4 },
          { source: 18, target: 22, value: 1 },
          { source: 18, target: 25, value: 42 },
          { source: 19, target: 20, value: 2 },
          { source: 19, target: 25, value: 10 },
          { source: 20, target: 31, value: 70 },
          { source: 20, target: 32, value: 126 },
          { source: 20, target: 33, value: 664 },
          { source: 21, target: 31, value: 31 },
          { source: 21, target: 32, value: 59 },
          { source: 21, target: 33, value: 469 },
          { source: 22, target: 31, value: 62 },
          { source: 22, target: 32, value: 270 },
          { source: 22, target: 33, value: 301 },
          { source: 23, target: 31, value: 10 },
          { source: 23, target: 32, value: 21 },
          { source: 23, target: 33, value: 362 },
          { source: 24, target: 31, value: 18 },
          { source: 24, target: 32, value: 126 },
          { source: 24, target: 33, value: 337 },
          { source: 25, target: 31, value: 893 },
          { source: 25, target: 32, value: 1067 },
          { source: 25, target: 33, value: 5758 },
          { source: 26, target: 31, value: 9 },
          { source: 26, target: 33, value: 2733 },
          { source: 27, target: 31, value: 43 },
          { source: 27, target: 32, value: 1765 },
          { source: 27, target: 33, value: 2087 },
          { source: 28, target: 31, value: 4 },
          { source: 28, target: 32, value: 47 },
          { source: 28, target: 33, value: 927 },
          { source: 29, target: 31, value: 1 },
          { source: 29, target: 33, value: 468 },
          { source: 30, target: 31, value: 131 },
          { source: 30, target: 32, value: 235 },
          { source: 30, target: 33, value: 297 },
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
