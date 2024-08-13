import * as React from 'react';
import {
  ChartHoverCard,
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  IGVBarChartSeriesPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Checkbox, Label, Stack, TextField } from '@fluentui/react';

interface IGroupedBarChartState {
  width: number;
  height: number;
  barWidthEnabled: boolean;
  xAxisInnerPaddingEnabled: boolean;
  xAxisOuterPaddingEnabled: boolean;
  barWidth: number;
  maxBarWidth: number;
  xAxisInnerPadding: number;
  xAxisOuterPadding: number;
}

export class GroupedVerticalBarChartTruncatedExample extends React.Component<{}, IGroupedBarChartState> {
  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
      barWidthEnabled: true,
      xAxisInnerPaddingEnabled: false,
      xAxisOuterPaddingEnabled: false,
      barWidth: 16,
      maxBarWidth: 100,
      xAxisInnerPadding: 0.49,
      xAxisOuterPadding: 0,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: Number(e.target.value) });
  };
  private _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ barWidthEnabled: checked });
  };
  private _onBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ barWidth: Number(newValue) });
  };
  private _onMaxBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ maxBarWidth: Number(newValue) });
  };
  private _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisInnerPaddingEnabled: checked });
  };
  private _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ xAxisInnerPadding: Number(e.target.value) });
  };
  private _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisOuterPaddingEnabled: checked });
  };
  private _onOuterPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ xAxisOuterPadding: Number(e.target.value) });
  };

  private _basicExample(): JSX.Element {
    const data = [
      {
        name: 'Data (Text that exceeds the maximum number of characters is truncated)',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color8),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 44000,
            color: getColorFromToken(DataVizPalette.color9),
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '44%',
          },
        ],
      },
      {
        name: 'Data',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color8),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 3000,
            color: getColorFromToken(DataVizPalette.color9),
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
          },
        ],
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <>
        <Stack horizontal wrap tokens={{ childrenGap: 30 }}>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-width" style={{ fontWeight: 400 }}>
              width:&nbsp;
            </Label>
            <input
              type="range"
              value={this.state.width}
              min={200}
              max={1000}
              onChange={this._onWidthChange}
              id="input-width"
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-height" style={{ fontWeight: 400 }}>
              height:&nbsp;
            </Label>
            <input
              type="range"
              value={this.state.height}
              min={200}
              max={1000}
              id="input-height"
              onChange={this._onHeightChange}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="barWidth:&nbsp;"
              checked={this.state.barWidthEnabled}
              onChange={this._onBarWidthCheckChange}
            />
            {this.state.barWidthEnabled ? (
              <TextField
                type="number"
                value={this.state.barWidth.toString()}
                min={1}
                max={300}
                onChange={this._onBarWidthChange}
                disabled={!this.state.barWidthEnabled}
              />
            ) : (
              <code>'auto'</code>
            )}
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
              maxBarWidth:&nbsp;
            </Label>
            <TextField
              type="number"
              value={this.state.maxBarWidth.toString()}
              min={1}
              max={300}
              id="input-maxbarwidth"
              onChange={this._onMaxBarWidthChange}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisInnerPadding:&nbsp;"
              checked={this.state.xAxisInnerPaddingEnabled}
              onChange={this._onInnerPaddingCheckChange}
            />
            <input
              type="range"
              value={this.state.xAxisInnerPadding}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onInnerPaddingChange}
              disabled={!this.state.xAxisInnerPaddingEnabled}
            />
            <span>&nbsp;{this.state.xAxisInnerPadding}</span>
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisOuterPadding:&nbsp;"
              checked={this.state.xAxisOuterPaddingEnabled}
              onChange={this._onOuterPaddingCheckChange}
            />
            <input
              type="range"
              value={this.state.xAxisOuterPadding}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onOuterPaddingChange}
              disabled={!this.state.xAxisOuterPaddingEnabled}
            />
            <span>&nbsp;{this.state.xAxisOuterPadding}</span>
          </Stack>
        </Stack>
        <div style={rootStyle}>
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart truncated example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            showYAxisGridLines
            showXAxisLablesTooltip
            noOfCharsToTruncate={6}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={(props: IGVBarChartSeriesPoint) =>
              props ? (
                <ChartHoverCard
                  XValue={props.xAxisCalloutData}
                  Legend={'Custom legend'}
                  YValue={`${props.data} h`}
                  color={'red'}
                />
              ) : null
            }
            enableReflow={true}
            barwidth={this.state.barWidthEnabled ? this.state.barWidth : 'auto'}
            maxBarWidth={this.state.maxBarWidth}
            xAxisInnerPadding={this.state.xAxisInnerPaddingEnabled ? this.state.xAxisInnerPadding : undefined}
            xAxisOuterPadding={this.state.xAxisOuterPaddingEnabled ? this.state.xAxisOuterPadding : undefined}
          />
        </div>
      </>
    );
  }
}
