import * as React from 'react';
import { VerticalStackedBarChart, IVerticalStackedBarChartProps } from '@uifabric/charting';
import { IVSChartDataPoint, IVerticalStackedChartProps } from '@uifabric/charting';
import { DefaultPalette, DefaultFontStyles, IStyle } from 'office-ui-fabric-react/lib/Styling';

interface IVerticalStackedBarState {
  width: number;
  height: number;
}

export class VerticalStackedBarChartStyledExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
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
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 15, color: DefaultPalette.blueLight },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 30, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 3, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'Jan' },
      { chartData: secondChartPoints, xAxisPoint: 'Feb' },
      { chartData: thirdChartPoints, xAxisPoint: 'March' },
      { chartData: firstChartPoints, xAxisPoint: 'April' },
      { chartData: thirdChartPoints, xAxisPoint: 'May' },
      { chartData: firstChartPoints, xAxisPoint: 'June' },
      { chartData: secondChartPoints, xAxisPoint: 'July' },
      { chartData: thirdChartPoints, xAxisPoint: 'August' },
      { chartData: firstChartPoints, xAxisPoint: 'September' },
    ];

    const textStyle: IStyle = {
      fill: DefaultPalette.black,
      fontSize: '10px',
      lineHeight: '14px',
    };

    const customStyles: IVerticalStackedBarChartProps['styles'] = () => {
      return {
        chart: {
          paddingBottom: '45px',
        },
        chartLabel: {
          color: DefaultPalette.blueMid,
          ...DefaultFontStyles.large,
        },
        xAxisText: {
          ...textStyle,
        },
      };
    };
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <VerticalStackedBarChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            yAxisTickCount={10}
            href={'www.google.com'}
            // eslint-disable-next-line react/jsx-no-bind
            styles={customStyles}
            chartLabel="Card title"
            isMultiStackCallout
            yMaxValue={120}
            yMinValue={10}
            // eslint-disable-next-line react/jsx-no-bind
            yAxisTickFormat={(x: number | string) => `${x} h`}
            margins={{ left: 50 }}
          />
        </div>
      </>
    );
  }
}
