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
}

export class VerticalBarChartTooltipExample extends React.Component<{}, IVerticalBarState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
      barWidthEnabled: false,
      xAxisInnerPaddingEnabled: false,
      xAxisOuterPaddingEnabled: false,
      barWidth: 16,
      maxBarWidth: 100,
      xAxisInnerPadding: 0.67,
      xAxisOuterPadding: 0.33,
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ barWidthEnabled: checked });
  };
  private _onBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ barWidth: parseInt(newValue, 10) });
  };
  private _onMaxBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ maxBarWidth: parseInt(newValue, 10) });
  };
  private _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisInnerPaddingEnabled: checked });
  };
  private _onInnerPaddingChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ xAxisInnerPadding: parseFloat(newValue) });
  };
  private _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisOuterPaddingEnabled: checked });
  };
  private _onOuterPaddingChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ xAxisOuterPadding: parseFloat(newValue) });
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

    const rootStyle = { width: '650px', height: '350px' };
    return (
      <>
        <Stack horizontal wrap tokens={{ childrenGap: 30 }}>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="barWidth:&nbsp;"
              checked={this.state.barWidthEnabled}
              onChange={this._onBarWidthCheckChange}
            />
            <TextField
              type="number"
              value={this.state.barWidth.toString()}
              min={1}
              max={300}
              onChange={this._onBarWidthChange}
              disabled={!this.state.barWidthEnabled}
            />
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
            <TextField
              type="number"
              value={this.state.xAxisInnerPadding.toString()}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onInnerPaddingChange}
              disabled={!this.state.xAxisInnerPaddingEnabled}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisOuterPadding:&nbsp;"
              checked={this.state.xAxisOuterPaddingEnabled}
              onChange={this._onOuterPaddingCheckChange}
            />
            <TextField
              type="number"
              value={this.state.xAxisOuterPadding.toString()}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onOuterPaddingChange}
              disabled={!this.state.xAxisOuterPaddingEnabled}
            />
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
            height={350}
            width={650}
            hideLegend={true}
            hideTooltip={false}
            showXAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            wrapXAxisLables={this.state.selectedCallout === 'WrapTickValues' ? true : false}
            enableReflow={true}
            barWidth={this.state.barWidthEnabled ? this.state.barWidth : undefined}
            maxBarWidth={this.state.maxBarWidth}
            xAxisInnerPadding={this.state.xAxisInnerPaddingEnabled ? this.state.xAxisInnerPadding : undefined}
            xAxisOuterPadding={this.state.xAxisOuterPaddingEnabled ? this.state.xAxisOuterPadding : undefined}
          />
        </div>
      </>
    );
  }
}
