import * as React from 'react';
import {
  ChartHoverCard,
  VerticalStackedBarChart,
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  IVerticalStackedBarChartProps,
} from '@uifabric/charting';
import { DefaultPalette, IStyle, DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';
import { DirectionalHint } from 'office-ui-fabric-react';

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
      { legend: 'Metadata3', data: 0, color: DefaultPalette.blueLight },
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

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    const textStyle: IStyle = {
      fill: DefaultPalette.black,
      fontSize: '10px',
      lineHeight: '14px',
    };

    const customStyles: IVerticalStackedBarChartProps['styles'] = () => {
      return {
        xAxis: {
          selectors: {
            text: { fill: 'black', fontSize: '8px' },
          },
        },
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
            // Just test link
            href={'www.google.com'}
            // eslint-disable-next-line react/jsx-no-bind
            styles={customStyles}
            yMaxValue={120}
            yMinValue={10}
            calloutProps={{
              directionalHint: DirectionalHint.topCenter,
            }}
            // eslint-disable-next-line react/jsx-no-bind
            yAxisTickFormat={(x: number | string) => `${x} h`}
            margins={{
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
            }}
            legendProps={{
              allowFocusOnLegends: true,
              styles: {
                rect: {
                  borderRadius: '3px',
                },
              },
            }}
            // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-explicit-any
            onRenderCalloutPerDataPoint={(props: any) =>
              props ? (
                <ChartHoverCard
                  XValue={props.xAxisCalloutData}
                  Legend={props.legend}
                  YValue={`${props.yAxisCalloutData || props.data} h`}
                  color={props.color}
                />
              ) : null
            }
          />
        </div>
      </>
    );
  }
}
