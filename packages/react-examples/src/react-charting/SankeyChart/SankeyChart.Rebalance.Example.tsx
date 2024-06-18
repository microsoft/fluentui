import { Toggle } from '@fluentui/react';
import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
import * as React from 'react';

const enum DataSouce {
  Simple,
  Complex,
}

interface ISankeyChartBasicState {
  width: number;
  height: number;
  dataSource: DataSouce;
}

const dataSimple: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: 'Large Source' },
      { nodeId: 1, name: 'Tiny Source' },
      { nodeId: 2, name: 'Large Target' },
      { nodeId: 3, name: 'Tiny Target' },
    ],
    links: [
      { source: 0, target: 2, value: 10000 },
      { source: 1, target: 2, value: 1 },
      { source: 0, target: 3, value: 1 },
      { source: 1, target: 3, value: 1 },
    ],
  },
};

const dataComplex: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: 'Location 1' },
      { nodeId: 1, name: 'Location 2' },
      { nodeId: 2, name: 'Location 3' },
      { nodeId: 3, name: 'Location 4' },
      { nodeId: 4, name: 'Location 5' },
      { nodeId: 5, name: 'Location 6' },
      { nodeId: 6, name: 'Location 7' },
      { nodeId: 7, name: 'Location 8' },
      { nodeId: 8, name: 'Other' },
      { nodeId: 9, name: 'Location 9' },
      { nodeId: 10, name: 'Location 10' },
      { nodeId: 11, name: 'Location 11' },
      { nodeId: 12, name: 'Location 12' },
      { nodeId: 13, name: 'Location 13' },
      { nodeId: 14, name: 'Location 14' },
      { nodeId: 15, name: 'Device 1' },
      { nodeId: 16, name: 'Device 2' },
      { nodeId: 17, name: 'Device 3' },
      { nodeId: 18, name: 'Device 4' },
      { nodeId: 19, name: 'Other' },
      { nodeId: 20, name: 'Device 5' },
      { nodeId: 21, name: 'Device 6' },
      { nodeId: 22, name: 'Device 7' },
      { nodeId: 23, name: 'Device 8' },
      { nodeId: 24, name: 'Device 9' },
      { nodeId: 25, name: 'Application 1 (00000000-0000-0000-0000-000000000001)' },
      { nodeId: 26, name: 'Application 2 (00000000-0000-0000-0000-000000000002)' },
      { nodeId: 27, name: 'Application 3' },
      { nodeId: 28, name: 'Application 4 with a long trimmed name' },
      { nodeId: 29, name: 'Application 5' },
      { nodeId: 30, name: 'Other' },
      { nodeId: 31, name: 'Application 6' },
      { nodeId: 32, name: 'Application 7 with an even longer trimmed name' },
      { nodeId: 33, name: 'Application 8' },
      { nodeId: 34, name: 'Application 9' },
      { nodeId: 35, name: 'Application 10 with some extraneous text' },
      { nodeId: 36, name: 'Application 11 which is also trimmed' },
      { nodeId: 37, name: 'Application 12' },
      { nodeId: 38, name: 'Application 13 and which is longer than any other title' },
      { nodeId: 39, name: 'Application 14' },
      { nodeId: 40, name: 'Conditional access not applied' },
      { nodeId: 41, name: 'All conditional access controls not satisfied' },
      { nodeId: 42, name: 'All conditional access controls satisfied' },
    ],
    links: [
      { source: 0, target: 15, value: 26 },
      { source: 0, target: 16, value: 5 },
      { source: 0, target: 18, value: 43 },
      { source: 0, target: 21, value: 390 },
      { source: 0, target: 22, value: 6 },
      { source: 1, target: 15, value: 5739 },
      { source: 1, target: 16, value: 2642 },
      { source: 1, target: 17, value: 2818 },
      { source: 1, target: 18, value: 5177 },
      { source: 1, target: 19, value: 937 },
      { source: 1, target: 20, value: 481 },
      { source: 1, target: 21, value: 116477 },
      { source: 1, target: 22, value: 7180 },
      { source: 1, target: 23, value: 69 },
      { source: 2, target: 15, value: 2792 },
      { source: 2, target: 16, value: 1866 },
      { source: 2, target: 18, value: 1711 },
      { source: 2, target: 19, value: 517 },
      { source: 2, target: 20, value: 1270 },
      { source: 2, target: 21, value: 53190 },
      { source: 2, target: 17, value: 66 },
      { source: 3, target: 15, value: 42472 },
      { source: 3, target: 16, value: 2656 },
      { source: 3, target: 17, value: 1409 },
      { source: 3, target: 18, value: 2881 },
      { source: 3, target: 19, value: 595 },
      { source: 3, target: 20, value: 188 },
      { source: 3, target: 21, value: 93512 },
      { source: 3, target: 22, value: 8979 },
      { source: 3, target: 23, value: 329 },
      { source: 4, target: 15, value: 2860 },
      { source: 4, target: 16, value: 1871 },
      { source: 4, target: 18, value: 6179 },
      { source: 4, target: 19, value: 423 },
      { source: 4, target: 20, value: 377 },
      { source: 4, target: 21, value: 243939 },
      { source: 4, target: 17, value: 169 },
      { source: 4, target: 22, value: 5 },
      { source: 4, target: 23, value: 15 },
      { source: 5, target: 15, value: 662 },
      { source: 5, target: 16, value: 455 },
      { source: 5, target: 18, value: 520 },
      { source: 5, target: 21, value: 22372 },
      { source: 5, target: 17, value: 7 },
      { source: 5, target: 19, value: 14 },
      { source: 5, target: 20, value: 4 },
      { source: 5, target: 23, value: 8 },
      { source: 6, target: 15, value: 4151 },
      { source: 6, target: 16, value: 1119 },
      { source: 6, target: 18, value: 1428 },
      { source: 6, target: 21, value: 139402 },
      { source: 6, target: 17, value: 109 },
      { source: 6, target: 19, value: 141 },
      { source: 6, target: 20, value: 365 },
      { source: 6, target: 22, value: 3 },
      { source: 7, target: 15, value: 1819 },
      { source: 7, target: 16, value: 655 },
      { source: 7, target: 18, value: 2120 },
      { source: 7, target: 19, value: 304 },
      { source: 7, target: 20, value: 215 },
      { source: 7, target: 21, value: 64271 },
      { source: 7, target: 17, value: 119 },
      { source: 7, target: 22, value: 18 },
      { source: 8, target: 15, value: 4132 },
      { source: 8, target: 16, value: 2530 },
      { source: 8, target: 17, value: 917 },
      { source: 8, target: 18, value: 4972 },
      { source: 8, target: 19, value: 333 },
      { source: 8, target: 20, value: 168 },
      { source: 8, target: 21, value: 107869 },
      { source: 8, target: 22, value: 119 },
      { source: 8, target: 23, value: 1007 },
      { source: 8, target: 24, value: 13 },
      { source: 9, target: 15, value: 807 },
      { source: 9, target: 16, value: 101 },
      { source: 9, target: 18, value: 138 },
      { source: 9, target: 19, value: 9 },
      { source: 9, target: 20, value: 8 },
      { source: 9, target: 21, value: 6467 },
      { source: 9, target: 22, value: 4 },
      { source: 10, target: 15, value: 1360 },
      { source: 10, target: 16, value: 4616 },
      { source: 10, target: 17, value: 132 },
      { source: 10, target: 18, value: 1042 },
      { source: 10, target: 20, value: 99 },
      { source: 10, target: 21, value: 41812 },
      { source: 10, target: 22, value: 76 },
      { source: 10, target: 19, value: 72 },
      { source: 11, target: 15, value: 2215 },
      { source: 11, target: 16, value: 546 },
      { source: 11, target: 17, value: 165 },
      { source: 11, target: 18, value: 327 },
      { source: 11, target: 19, value: 19 },
      { source: 11, target: 20, value: 37 },
      { source: 11, target: 21, value: 19043 },
      { source: 11, target: 22, value: 7 },
      { source: 11, target: 23, value: 2455 },
      { source: 12, target: 15, value: 1041 },
      { source: 12, target: 16, value: 450 },
      { source: 12, target: 17, value: 6 },
      { source: 12, target: 18, value: 945 },
      { source: 12, target: 19, value: 41 },
      { source: 12, target: 20, value: 41 },
      { source: 12, target: 21, value: 19337 },
      { source: 12, target: 22, value: 6 },
      { source: 13, target: 15, value: 204 },
      { source: 13, target: 16, value: 71 },
      { source: 13, target: 17, value: 29 },
      { source: 13, target: 18, value: 58 },
      { source: 13, target: 21, value: 5171 },
      { source: 13, target: 22, value: 51 },
      { source: 13, target: 23, value: 12 },
      { source: 14, target: 15, value: 103 },
      { source: 14, target: 16, value: 40 },
      { source: 14, target: 18, value: 4 },
      { source: 14, target: 20, value: 5 },
      { source: 14, target: 21, value: 4958 },
      { source: 15, target: 25, value: 387 },
      { source: 15, target: 26, value: 752 },
      { source: 15, target: 27, value: 3750 },
      { source: 15, target: 28, value: 20 },
      { source: 15, target: 30, value: 28987 },
      { source: 15, target: 35, value: 35959 },
      { source: 15, target: 36, value: 229 },
      { source: 15, target: 37, value: 37 },
      { source: 15, target: 38, value: 242 },
      { source: 15, target: 32, value: 17 },
      { source: 15, target: 39, value: 3 },
      { source: 16, target: 25, value: 223 },
      { source: 16, target: 26, value: 816 },
      { source: 16, target: 27, value: 3527 },
      { source: 16, target: 28, value: 5 },
      { source: 16, target: 30, value: 12394 },
      { source: 16, target: 35, value: 2210 },
      { source: 16, target: 36, value: 185 },
      { source: 16, target: 37, value: 36 },
      { source: 16, target: 38, value: 218 },
      { source: 16, target: 39, value: 9 },
      { source: 17, target: 25, value: 16 },
      { source: 17, target: 28, value: 2 },
      { source: 17, target: 29, value: 23 },
      { source: 17, target: 30, value: 4858 },
      { source: 17, target: 35, value: 981 },
      { source: 17, target: 26, value: 15 },
      { source: 17, target: 36, value: 5 },
      { source: 17, target: 37, value: 40 },
      { source: 17, target: 38, value: 6 },
      { source: 18, target: 25, value: 4131 },
      { source: 18, target: 26, value: 1163 },
      { source: 18, target: 27, value: 1080 },
      { source: 18, target: 28, value: 29 },
      { source: 18, target: 29, value: 5 },
      { source: 18, target: 30, value: 15157 },
      { source: 18, target: 32, value: 3445 },
      { source: 18, target: 36, value: 248 },
      { source: 18, target: 37, value: 1768 },
      { source: 18, target: 38, value: 471 },
      { source: 18, target: 35, value: 48 },
      { source: 19, target: 25, value: 63 },
      { source: 19, target: 30, value: 3331 },
      { source: 19, target: 26, value: 11 },
      { source: 20, target: 25, value: 218 },
      { source: 20, target: 28, value: 3 },
      { source: 20, target: 29, value: 12 },
      { source: 20, target: 30, value: 2989 },
      { source: 20, target: 26, value: 7 },
      { source: 20, target: 27, value: 16 },
      { source: 20, target: 36, value: 10 },
      { source: 20, target: 31, value: 3 },
      { source: 21, target: 25, value: 57044 },
      { source: 21, target: 26, value: 32830 },
      { source: 21, target: 27, value: 21688 },
      { source: 21, target: 28, value: 334 },
      { source: 21, target: 29, value: 441 },
      { source: 21, target: 30, value: 382230 },
      { source: 21, target: 31, value: 96755 },
      { source: 21, target: 32, value: 224816 },
      { source: 21, target: 33, value: 7449 },
      { source: 21, target: 34, value: 26682 },
      { source: 21, target: 35, value: 22242 },
      { source: 21, target: 36, value: 25911 },
      { source: 21, target: 37, value: 17637 },
      { source: 21, target: 38, value: 17163 },
      { source: 21, target: 39, value: 4988 },
      { source: 22, target: 25, value: 5825 },
      { source: 22, target: 26, value: 3232 },
      { source: 22, target: 27, value: 22 },
      { source: 22, target: 30, value: 6278 },
      { source: 22, target: 36, value: 22 },
      { source: 22, target: 37, value: 850 },
      { source: 22, target: 38, value: 36 },
      { source: 22, target: 35, value: 187 },
      { source: 22, target: 39, value: 2 },
      { source: 23, target: 25, value: 851 },
      { source: 23, target: 30, value: 2916 },
      { source: 23, target: 26, value: 66 },
      { source: 23, target: 27, value: 2 },
      { source: 23, target: 36, value: 7 },
      { source: 23, target: 37, value: 23 },
      { source: 23, target: 38, value: 23 },
      { source: 23, target: 35, value: 7 },
      { source: 24, target: 37, value: 1 },
      { source: 24, target: 30, value: 12 },
      { source: 25, target: 40, value: 3584 },
      { source: 25, target: 41, value: 9118 },
      { source: 25, target: 42, value: 56056 },
      { source: 26, target: 40, value: 1070 },
      { source: 26, target: 41, value: 2326 },
      { source: 26, target: 42, value: 35496 },
      { source: 27, target: 40, value: 2644 },
      { source: 27, target: 41, value: 12690 },
      { source: 27, target: 42, value: 14751 },
      { source: 28, target: 40, value: 10 },
      { source: 28, target: 41, value: 21 },
      { source: 28, target: 42, value: 362 },
      { source: 29, target: 40, value: 18 },
      { source: 29, target: 41, value: 126 },
      { source: 29, target: 42, value: 337 },
      { source: 30, target: 40, value: 32459 },
      { source: 30, target: 41, value: 46566 },
      { source: 30, target: 42, value: 380127 },
      { source: 31, target: 40, value: 3012 },
      { source: 31, target: 42, value: 93746 },
      { source: 32, target: 40, value: 1675 },
      { source: 32, target: 41, value: 106838 },
      { source: 32, target: 42, value: 119765 },
      { source: 33, target: 40, value: 17 },
      { source: 33, target: 41, value: 306 },
      { source: 33, target: 42, value: 7126 },
      { source: 34, target: 40, value: 209 },
      { source: 34, target: 42, value: 26471 },
      { source: 34, target: 41, value: 2 },
      { source: 35, target: 40, value: 10112 },
      { source: 35, target: 41, value: 19924 },
      { source: 35, target: 42, value: 31598 },
      { source: 36, target: 40, value: 519 },
      { source: 36, target: 41, value: 1024 },
      { source: 36, target: 42, value: 25074 },
      { source: 37, target: 40, value: 720 },
      { source: 37, target: 41, value: 3592 },
      { source: 37, target: 42, value: 16080 },
      { source: 38, target: 40, value: 194 },
      { source: 38, target: 41, value: 508 },
      { source: 38, target: 42, value: 17457 },
      { source: 39, target: 40, value: 285 },
      { source: 39, target: 41, value: 3 },
      { source: 39, target: 42, value: 4714 },
    ],
  },
};

export class SankeyChartRebalanceExample extends React.Component<{}, ISankeyChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = { width: 820, height: 400, dataSource: DataSouce.Simple };
  }

  public render(): JSX.Element {
    return <div>{this._rebalanceExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _onDataSourceChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    this.setState({ dataSource: checked ? DataSouce.Simple : DataSouce.Complex });
  };

  private _rebalanceExample(): JSX.Element {
    const data: IChartProps = this.state.dataSource === DataSouce.Simple ? dataSimple : dataComplex;

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <Toggle
          label="Data Source"
          onText="simple"
          offText="complex"
          checked={this.state.dataSource === DataSouce.Simple}
          onChange={this._onDataSourceChange}
        />
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
              linkFrom: 'from {0}',
            }}
            accessibility={{
              emptyAriaLabel: 'Graph has no data to display',
              nodeAriaLabel: '{0} with {1} sign-ins',
              linkAriaLabel: '{2} sign-ins from {0} and {1}',
            }}
          />
        </div>
      </>
    );
  }
}
