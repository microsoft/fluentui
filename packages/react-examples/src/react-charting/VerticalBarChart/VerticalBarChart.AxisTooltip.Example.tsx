import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, Label, Stack, TextField } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'WrapTickValues', text: 'Wrap X Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at X axis ticks' },
];

interface IVerticalBarState {
  selectedCallout: string;
  barWidthEnabled: boolean;
  xAxisInnerPaddingEnabled: boolean;
  xAxisOuterPaddingEnabled: boolean;
  barWidth: number;
  maxBarWidth: number;
  xAxisInnerPadding: number;
  xAxisOuterPadding: number;
  width: number;
  height: number;
}

export class VerticalBarChartTooltipExample extends React.Component<{}, IVerticalBarState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
      barWidthEnabled: true,
      xAxisInnerPaddingEnabled: false,
      xAxisOuterPaddingEnabled: false,
      barWidth: 16,
      maxBarWidth: 100,
      xAxisInnerPadding: 0.67,
      xAxisOuterPadding: 0,
      width: 650,
      height: 350,
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

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
  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: Number(e.target.value) });
  };

  private _basicExample(): JSX.Element {
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: 'Simple Text',
        y: 1000,
        color: DefaultPalette.accent,
      },
      {
        x: 'Showing all text here',
        y: 5000,
        color: DefaultPalette.blueDark,
      },
      {
        x: 'Large data, showing all text by tooltip',
        y: 3000,
        color: DefaultPalette.blueMid,
      },
      {
        x: 'Data',
        y: 2000,
        color: DefaultPalette.blue,
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
        <div>
          <ChoiceGroup
            options={options}
            defaultSelectedKey="showTooltip"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(_ev, option) => option && this.setState({ selectedCallout: option.key })}
            label="Pick one"
          />
        </div>
        <div style={rootStyle}>
          <VerticalBarChart
            chartTitle="Vertical bar chart axis tooltip example "
            data={points}
            height={this.state.height}
            width={this.state.width}
            hideLegend={true}
            hideTooltip={false}
            showXAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            wrapXAxisLables={this.state.selectedCallout === 'WrapTickValues' ? true : false}
            enableReflow={true}
            barWidth={this.state.barWidthEnabled ? this.state.barWidth : 'auto'}
            maxBarWidth={this.state.maxBarWidth}
            xAxisInnerPadding={this.state.xAxisInnerPaddingEnabled ? this.state.xAxisInnerPadding : undefined}
            xAxisOuterPadding={this.state.xAxisOuterPaddingEnabled ? this.state.xAxisOuterPadding : undefined}
          />
        </div>
      </>
    );
  }
}
