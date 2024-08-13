import * as React from 'react';
import { Sparkline, ISparklineProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { IChartProps } from '@fluentui/react-charting';

interface ISparklineState {}

export class SparklineChartBasicExample extends React.Component<{}, ISparklineState> {
  constructor(props: ISparklineProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createSparklineTable()}</div>;
  }

  private _createSparklineTable(): JSX.Element {
    const sl1: IChartProps = {
      chartTitle: '10.21',
      lineChartData: [
        {
          legend: '19.64',
          color: getColorFromToken(DataVizPalette.color1),
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
    const sl2: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '19.64',
          color: getColorFromToken(DataVizPalette.color2),
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
    const sl3: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '19.64',
          color: getColorFromToken(DataVizPalette.color3),
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
    const sl4: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '464.64',
          color: getColorFromToken(DataVizPalette.color4),
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
    const sl5: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '46.49',
          color: getColorFromToken(DataVizPalette.color5),
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
    const sl6: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '49.44',
          color: getColorFromToken(DataVizPalette.color6),
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 29.13,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 70.98,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 60,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 89.7,
            },
            {
              x: new Date('2020-03-12T00:00:00.000Z'),
              y: 19,
            },
            {
              x: new Date('2020-03-15T00:00:00.000Z'),
              y: 49.44,
            },
          ],
        },
      ],
    };
    const sl7: IChartProps = {
      chartTitle: '49.44',
      lineChartData: [
        {
          legend: '49.44',
          color: getColorFromToken(DataVizPalette.color7),
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
    const sl8: IChartProps = {
      chartTitle: '541.44',
      lineChartData: [
        {
          legend: '541.44',
          color: getColorFromToken(DataVizPalette.color8),
          data: [
            {
              x: 1,
              y: 291.13,
            },
            {
              x: 2,
              y: 170.98,
            },
            {
              x: 3,
              y: 260,
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
            {
              x: 9,
              y: 499.14,
            },
            {
              x: 10,
              y: 350.48,
            },
            {
              x: 11,
              y: 32.44,
            },
            {
              x: 12,
              y: 400.44,
            },
          ],
        },
      ],
    };

    return (
      <>
        <div style={{ display: 'inline' }}>
          A sparkline <Sparkline data={sl1} showLegend={true} /> - is a very small line chart, drawn without axes or
          coordinates. It presents the general shape of the variation (like over time) in some measurement,
          <Sparkline data={sl2} /> - such as temperature or stock market price, in a simple and highly condensed way.
          <br />
          <br />
          Below table shows sparklines in one of its columns.
          <br />
          <br />
        </div>
        <table role="grid">
          <tbody>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 1</td>
              <td>
                <Sparkline data={sl1} showLegend={true} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 2</td>
              <td>
                <Sparkline data={sl2} showLegend={true} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 3</td>
              <td>
                <Sparkline data={sl3} showLegend={false} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 4</td>
              <td>
                <Sparkline data={sl4} showLegend={false} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 5</td>
              <td>
                <Sparkline data={sl5} showLegend={false} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 6</td>
              <td>
                <Sparkline data={sl6} showLegend={true} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 7</td>
              <td>
                <Sparkline data={sl7} showLegend={true} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '15px', paddingBottom: '5px', paddingTop: '5px' }}>Row 8</td>
              <td>
                <Sparkline data={sl8} showLegend={true} />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
