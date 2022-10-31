import * as React from 'react';
import { IChartProps, ISankeyChartProps, SankeyChart } from '@fluentui/react-charting';
//import { IPalette } from '@fluentui/react/lib/Styling';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartInboxSparseDataExample extends React.Component<{}, ISankeyChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 912,
      height: 2000,
    };
  }

  public render(): JSX.Element {
    return <div>{this._inboxSparseExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _inboxSparseExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          {
            nodeId: 0,
            name: 'partner',
            color: '#8764B8',
          },
          {
            nodeId: 1,
            name: 'internet',
            color: '#8764B8',
          },
          {
            nodeId: 2,
            name: '1',
            color: '#0E7878',
          },
          {
            nodeId: 3,
            name: '2',
            color: '#0E7878',
          },
          {
            nodeId: 4,
            name: '4',
            color: '#0E7878',
          },
          {
            nodeId: 5,
            name: '5',
            color: '#0E7878',
          },
          {
            nodeId: 6,
            name: '6',
            color: '#0E7878',
          },
          {
            nodeId: 7,
            name: '7',
            color: '#0E7878',
          },
          {
            nodeId: 8,
            name: '8',
            color: '#0E7878',
          },
          {
            nodeId: 9,
            name: '9',
            color: '#0E7878',
          },
          {
            nodeId: 10,
            name: '10',
            color: '#0E7878',
          },
          {
            nodeId: 11,
            name: '11',
            color: '#0E7878',
          },
          {
            nodeId: 12,
            name: '12',
            color: '#0E7878',
          },
          {
            nodeId: 13,
            name: '13',
            color: '#0E7878',
          },
          {
            nodeId: 14,
            name: '14',
            color: '#0E7878',
          },
          {
            nodeId: 15,
            name: '15',
            color: '#0E7878',
          },
          {
            nodeId: 16,
            name: '16',
            color: '#0E7878',
          },
          {
            nodeId: 17,
            name: '17',
            color: '#0E7878',
          },
          {
            nodeId: 18,
            name: '18',
            color: '#0E7878',
          },
          {
            nodeId: 19,
            name: '19',
            color: '#0E7878',
          },
          {
            nodeId: 20,
            name: '20',
            color: '#0E7878',
          },
          {
            nodeId: 21,
            name: '21',
            color: '#0E7878',
          },
          {
            nodeId: 22,
            name: '22',
            color: '#0E7878',
          },
          {
            nodeId: 23,
            name: '23',
            color: '#0E7878',
          },
          {
            nodeId: 24,
            name: '24',
            color: '#0E7878',
          },
          {
            nodeId: 25,
            name: '25',
            color: '#0E7878',
          },
          {
            nodeId: 26,
            name: '26',
            color: '#0E7878',
          },
          {
            nodeId: 27,
            name: '27',
            color: '#0E7878',
          },
          {
            nodeId: 28,
            name: '28',
            color: '#0E7878',
          },
          {
            nodeId: 29,
            name: '29',
            color: '#0E7878',
          },
          {
            nodeId: 30,
            name: '30',
            color: '#0E7878',
          },
          {
            nodeId: 31,
            name: '31',
            color: '#0E7878',
          },
          {
            nodeId: 32,
            name: '32',
            color: '#0E7878',
          },
          {
            nodeId: 33,
            name: '33',
            color: '#0E7878',
          },
          {
            nodeId: 34,
            name: '34',
            color: '#0E7878',
          },
          {
            nodeId: 35,
            name: '35',
            color: '#0E7878',
          },
          {
            nodeId: 36,
            name: '36',
            color: '#0E7878',
          },
          {
            nodeId: 37,
            name: '37',
            color: '#0E7878',
          },
          {
            nodeId: 38,
            name: '38',
            color: '#0E7878',
          },
          {
            nodeId: 39,
            name: '39',
            color: '#0E7878',
          },
          {
            nodeId: 40,
            name: '40',
            color: '#0E7878',
          },
          {
            nodeId: 41,
            name: '41',
            color: '#0E7878',
          },
          {
            nodeId: 42,
            name: '42',
            color: '#0E7878',
          },
          {
            nodeId: 43,
            name: '43',
            color: '#0E7878',
          },
          {
            nodeId: 44,
            name: '44',
            color: '#0E7878',
          },
          {
            nodeId: 45,
            name: '45',
            color: '#0E7878',
          },
          {
            nodeId: 46,
            name: '46',
            color: '#0E7878',
          },
          {
            nodeId: 47,
            name: '47',
            color: '#0E7878',
          },
          {
            nodeId: 48,
            name: '48',
            color: '#0E7878',
          },
          {
            nodeId: 49,
            name: '49',
            color: '#0E7878',
          },
          {
            nodeId: 50,
            name: '50',
            color: '#0E7878',
          },
          {
            nodeId: 51,
            name: '51',
            color: '#0E7878',
          },
          {
            nodeId: 52,
            name: '52',
            color: '#0E7878',
          },
          {
            nodeId: 53,
            name: '53',
            color: '#0E7878',
          },
          {
            nodeId: 54,
            name: '54',
            color: '#0E7878',
          },
          {
            nodeId: 55,
            name: '55',
            color: '#0E7878',
          },
          {
            nodeId: 56,
            name: '56',
            color: '#0E7878',
          },
          {
            nodeId: 57,
            name: '57',
            color: '#0E7878',
          },
          {
            nodeId: 58,
            name: '58',
            color: '#0E7878',
          },
          {
            nodeId: 59,
            name: '59',
            color: '#0E7878',
          },
          {
            nodeId: 60,
            name: '60',
            color: '#0E7878',
          },
          {
            nodeId: 60,
            name: '39',
            color: '#0E7878',
          },
          {
            nodeId: 61,
            name: '61',
            color: '#0E7878',
          },
          {
            nodeId: 62,
            name: '62',
            color: '#0E7878',
          },
          {
            nodeId: 63,
            name: '63',
            color: '#0E7878',
          },
          {
            nodeId: 64,
            name: '64',
            color: '#0E7878',
          },
          {
            nodeId: 65,
            name: '65',
            color: '#0E7878',
          },
          {
            nodeId: 66,
            name: '66',
            color: '#0E7878',
          },
          {
            nodeId: 67,
            name: '67',
            color: '#0E7878',
          },
          {
            nodeId: 68,
            name: '68',
            color: '#0E7878',
          },
          {
            nodeId: 69,
            name: '69',
            color: '#0E7878',
          },
          {
            nodeId: 70,
            name: '70',
            color: '#0E7878',
          },
          {
            nodeId: 71,
            name: '71',
            color: '#0E7878',
          },
          {
            nodeId: 72,
            name: '72',
            color: '#0E7878',
          },
          {
            nodeId: 73,
            name: '73',
            color: '#0E7878',
          },
          {
            nodeId: 74,
            name: '74',
            color: '#0E7878',
          },
          {
            nodeId: 75,
            name: '75',
            color: '#0E7878',
          },
          {
            nodeId: 76,
            name: '76',
            color: '#0E7878',
          },
          {
            nodeId: 77,
            name: '77',
            color: '#0E7878',
          },
          {
            nodeId: 78,
            name: '78',
            color: '#0E7878',
          },
          {
            nodeId: 79,
            name: '79',
            color: '#0E7878',
          },
          {
            nodeId: 80,
            name: '80',
            color: '#0E7878',
          },
          {
            nodeId: 81,
            name: '81',
            color: '#0E7878',
          },
          {
            nodeId: 82,
            name: '82',
            color: '#0E7878',
          },
          {
            nodeId: 83,
            name: '83',
            color: '#0E7878',
          },
          {
            nodeId: 84,
            name: '84',
            color: '#0E7878',
          },
          {
            nodeId: 85,
            name: '85',
            color: '#0E7878',
          },
          {
            nodeId: 86,
            name: '86',
            color: '#0E7878',
          },
          {
            nodeId: 87,
            name: '87',
            color: '#0E7878',
          },
          {
            nodeId: 88,
            name: '88',
            color: '#0E7878',
          },
        ],
        links: [
          { source: 0, target: 2, value: 100 },
          { source: 0, target: 3, value: 50 },
          { source: 0, target: 4, value: 60 },
          { source: 0, target: 5, value: 5 },
          { source: 0, target: 6, value: 5 },
          { source: 0, target: 7, value: 5 },
          { source: 0, target: 8, value: 5 },
          { source: 0, target: 9, value: 5 },
          { source: 0, target: 10, value: 5 },
          { source: 0, target: 11, value: 5 },
          { source: 0, target: 12, value: 5 },
          { source: 0, target: 13, value: 5 },
          { source: 0, target: 14, value: 5 },
          { source: 0, target: 15, value: 5 },
          { source: 0, target: 16, value: 5 },
          { source: 0, target: 17, value: 5 },
          { source: 0, target: 18, value: 5 },
          { source: 0, target: 19, value: 5 },
          { source: 0, target: 20, value: 5 },
          { source: 0, target: 21, value: 5 },
          { source: 0, target: 22, value: 5 },
          { source: 0, target: 23, value: 5 },
          { source: 0, target: 24, value: 5 },
          { source: 0, target: 25, value: 5 },
          { source: 0, target: 26, value: 5 },
          { source: 0, target: 27, value: 5 },
          { source: 0, target: 28, value: 5 },
          { source: 0, target: 29, value: 5 },
          { source: 0, target: 30, value: 5 },
          { source: 0, target: 31, value: 5 },
          { source: 0, target: 32, value: 5 },
          { source: 0, target: 33, value: 5 },
          { source: 0, target: 34, value: 5 },
          { source: 0, target: 35, value: 5 },
          { source: 0, target: 36, value: 5 },
          { source: 0, target: 37, value: 5 },
          { source: 0, target: 38, value: 5 },
          { source: 0, target: 39, value: 5 },
          { source: 0, target: 40, value: 5 },
          { source: 0, target: 41, value: 5 },
          { source: 0, target: 42, value: 5 },
          { source: 0, target: 43, value: 5 },
          { source: 0, target: 44, value: 5 },
          { source: 0, target: 45, value: 5 },
          { source: 0, target: 46, value: 5 },
          { source: 0, target: 47, value: 5 },
          { source: 0, target: 48, value: 5 },
          { source: 0, target: 49, value: 5 },
          { source: 0, target: 50, value: 5 },
          { source: 0, target: 51, value: 5 },
          { source: 0, target: 52, value: 5 },
          { source: 0, target: 53, value: 5 },
          { source: 0, target: 54, value: 5 },
          { source: 0, target: 55, value: 5 },
          { source: 0, target: 56, value: 5 },
          { source: 0, target: 57, value: 5 },
          { source: 0, target: 58, value: 5 },
          { source: 0, target: 59, value: 5 },
          { source: 0, target: 60, value: 5 },
          { source: 0, target: 61, value: 5 },
          { source: 0, target: 62, value: 5 },
          { source: 0, target: 63, value: 5 },
          { source: 0, target: 64, value: 5 },
          { source: 0, target: 65, value: 5 },
          { source: 0, target: 66, value: 5 },
          { source: 0, target: 67, value: 5 },
          { source: 0, target: 68, value: 5 },
          { source: 0, target: 69, value: 5 },
          { source: 0, target: 70, value: 5 },
          { source: 0, target: 71, value: 5 },
          { source: 0, target: 72, value: 5 },
          { source: 0, target: 73, value: 5 },
          { source: 0, target: 74, value: 5 },
          { source: 0, target: 75, value: 5 },
          { source: 0, target: 76, value: 5 },
          { source: 0, target: 77, value: 5 },
          { source: 0, target: 78, value: 5 },
          { source: 0, target: 79, value: 5 },
          { source: 0, target: 80, value: 5 },
          { source: 0, target: 81, value: 5 },
          { source: 0, target: 82, value: 5 },
          { source: 0, target: 83, value: 5 },
          { source: 0, target: 84, value: 5 },
          { source: 0, target: 85, value: 5 },
          { source: 0, target: 86, value: 5 },
          { source: 0, target: 87, value: 5 },
          { source: 0, target: 88, value: 5 },
          //         { source: 0, target: 89, value: 5 },
          //         { source: 0, target: 90, value: 5 },
          { source: 1, target: 25, value: 10 },
          { source: 1, target: 26, value: 10 },
          { source: 1, target: 27, value: 10 },
          { source: 1, target: 28, value: 10 },
          { source: 1, target: 29, value: 10 },
          { source: 1, target: 30, value: 10 },
          { source: 1, target: 31, value: 10 },
          { source: 1, target: 32, value: 10 },
          { source: 1, target: 33, value: 10 },
          { source: 1, target: 34, value: 10 },
          { source: 1, target: 35, value: 10 },
          { source: 1, target: 36, value: 10 },
          { source: 1, target: 37, value: 10 },
          { source: 1, target: 38, value: 10 },
          { source: 1, target: 39, value: 10 },
          { source: 1, target: 40, value: 10 },
          { source: 1, target: 41, value: 10 },
          { source: 1, target: 42, value: 10 },
          { source: 1, target: 43, value: 10 },
          { source: 1, target: 44, value: 10 },
          { source: 1, target: 45, value: 10 },
          { source: 1, target: 46, value: 10 },
          { source: 1, target: 47, value: 10 },
          { source: 1, target: 48, value: 10 },
          { source: 1, target: 49, value: 10 },
          { source: 1, target: 50, value: 10 },
          { source: 1, target: 51, value: 10 },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={912} max={1600} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={412} max={800} onChange={this._onHeightChange} />
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
