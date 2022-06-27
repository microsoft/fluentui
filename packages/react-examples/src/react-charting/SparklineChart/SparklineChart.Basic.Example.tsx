import * as React from 'react';
import { Sparkline, ISparklineProps } from '@fluentui/react-charting';
import { IChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface ISparklineState {}

export class SparklineChartBasicExample extends React.Component<{}, ISparklineState> {
  constructor(props: ISparklineProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createSparklineTable()}</div>;
  }

  private _createSparklineTable(): JSX.Element {
    const sl_1: IChartProps = {
      chartTitle: '10.21',
      lineChartData: [
        {
          legend: '19.64',
          data: [
            {
              x: 1,
              y: 58.13,
            },
            {
              x: 2,
              y: 140.98,
            },
            {
              x: 3,
              y: 20,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 99,
            },
            {
              x: 6,
              y: 13.28,
            },
            {
              x: 7,
              y: 31.32,
            },
            {
              x: 8,
              y: 10.21,
            },
          ],
        },
      ],
    };
    const sl_2: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '19.64',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 19,
            },
            {
              x: 6,
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl_3: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '19.64',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 19,
            },
            {
              x: 6,
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl_4: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '464.64',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 19,
            },
            {
              x: 6,
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl_5: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '46.49',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 19,
            },
            {
              x: 6,
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl_6: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '49.44',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 19,
            },
            {
              x: 6,
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl_7: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '49.44',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 19,
            },
            {
              x: 6,
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl_8: IChartProps = {
      chartTitle: '541.44',
      lineChartData: [
        {
          legend: '541.44',
          data: [
            {
              x: 1,
              y: 29.13,
            },
            {
              x: 2,
              y: 70.98,
            },
            {
              x: 3,
              y: 60,
            },
            {
              x: 4,
              y: 89.7,
            },
            {
              x: 5,
              y: 664,
            },
            {
              x: 6,
              y: 66.44,
            },
            {
              x: 7,
              y: 541.44,
            },
            {
              x: 8,
              y: 32.44,
            },
          ],
        },
      ],
    };

    return (
      <table>
        <tbody>
          <tr style={{ borderBottom: '1pt solid black' }}>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 1</td>
            <td>
              <Sparkline data={sl_1} color={'#627CEF'}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 2</td>
            <td>
              <Sparkline data={sl_2} color={DefaultPalette.green}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 3</td>
            <td>
              <Sparkline data={sl_3} color={'#00A2AD'}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 4</td>
            <td>
              <Sparkline data={sl_4} color={DefaultPalette.red}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 5</td>
            <td>
              <Sparkline data={sl_5} color={'#E3008C'}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 6</td>
            <td>
              <Sparkline data={sl_6} color={'#627CEF'}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 7</td>
            <td>
              <Sparkline data={sl_7} color={'#627CEF'}></Sparkline>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 8</td>
            <td>
              <Sparkline data={sl_8} color={'#627CEF'}></Sparkline>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
