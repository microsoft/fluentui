import * as React from 'react';
import { IChartProps, ICustomizedCalloutData, ILineChartProps, LineChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

interface ILineChartGapsState {
  width: number;
  height: number;
}

export class LineChartGapsExample extends React.Component<{}, ILineChartGapsState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 1200,
      height: 400,
    };
  }

  public render(): JSX.Element {
    return <div>{this._gapsExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _calculateCalloutDescription = (calloutDataProps: ICustomizedCalloutData): string | undefined => {
    if (calloutDataProps.values.filter(value => value.legend === 'Low Confidence Data*').length > 0) {
      return '* This data was below our confidence threshold.';
    }
    return undefined;
  };

  private _gapsExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'Confidence Level',
          legendShape: 'dottedLine',
          hideNonActiveDots: true,
          lineOptions: {
            strokeDasharray: '5',
            strokeLinecap: 'butt',
            strokeWidth: '2',
          },
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 250000,
              hideCallout: true,
            },
            {
              x: new Date('2020-03-10T00:00:00.000Z'),
              y: 250000,
              hideCallout: true,
            },
          ],
          color: DefaultPalette.black,
        },
        {
          legend: 'Normal Data',
          gaps: [
            {
              startIndex: 3,
              endIndex: 4,
            },
            {
              startIndex: 6,
              endIndex: 7,
            },
            {
              startIndex: 1,
              endIndex: 2,
            },
          ],
          hideNonActiveDots: true,
          lineOptions: {
            lineBorderWidth: '4',
          },
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 216000,
            },
            {
              x: new Date('2020-03-03T10:30:00.000Z'),
              y: 218123,
              hideCallout: true,
            },
            // gap here
            {
              x: new Date('2020-03-03T11:00:00.000Z'),
              y: 219000,
              hideCallout: true,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 248000,
              hideCallout: true,
            },
            // gap here
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 252000,
              hideCallout: true,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 274000,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 260000,
              hideCallout: true,
            },
            // gap here
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
              hideCallout: true,
            },
            {
              x: new Date('2020-03-08T12:00:00.000Z'),
              y: 218000,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 218000,
            },
            {
              x: new Date('2020-03-10T00:00:00.000Z'),
              y: 269000,
            },
          ],
          color: DefaultPalette.blue,
        },
        {
          legend: 'Low Confidence Data*',
          legendShape: 'dottedLine',
          hideNonActiveDots: true,
          lineOptions: {
            strokeDasharray: '2',
            strokeDashoffset: '-1',
            strokeLinecap: 'butt',
            lineBorderWidth: '4',
          },
          gaps: [
            {
              startIndex: 3,
              endIndex: 4,
            },
            {
              startIndex: 1,
              endIndex: 2,
            },
          ],
          data: [
            {
              x: new Date('2020-03-03T10:30:00.000Z'),
              y: 218123,
            },
            {
              x: new Date('2020-03-03T11:00:00.000Z'),
              y: 219000,
            },
            // gap here
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 248000,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 252000,
            },
            // gap here
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 260000,
            },
            {
              x: new Date('2020-03-07T00:30:00.000Z'),
              y: 270000,
            },
            {
              x: new Date('2020-03-07T01:00:00.000Z'),
              y: 270000,
            },
            {
              x: new Date('2020-03-07T01:30:00.000Z'),
              y: 270000,
            },
            {
              x: new Date('2020-03-07T02:00:00.000Z'),
              y: 280000,
            },
            {
              x: new Date('2020-03-07T02:30:00.000Z'),
              y: 270000,
            },
            {
              x: new Date('2020-03-07T03:00:00.000Z'),
              y: 290000,
            },
            {
              x: new Date('2020-03-07T03:30:00.000Z'),
              y: 270000,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
            },
          ],
          color: DefaultPalette.blue,
        },
        {
          legend: 'Green Data',
          lineOptions: {
            lineBorderWidth: '4',
          },
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297000,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284000,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282000,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294000,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 224000,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298000,
            },
            {
              x: new Date('2020-03-10T00:00:00.000Z'),
              y: 299000,
            },
          ],
          color: DefaultPalette.green,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const margins = { left: 35, top: 20, bottom: 35, right: 20 };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={500} max={1500} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <LineChart
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={150000}
            yMaxValue={400000}
            height={this.state.height}
            width={this.state.width}
            margins={margins}
            calloutProps={{
              calloutMaxWidth: 200,
            }}
            getCalloutDescriptionMessage={this._calculateCalloutDescription}
          />
        </div>
      </>
    );
  }
}
