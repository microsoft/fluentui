import * as React from 'react';
import {
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption, Toggle, getId, Label, Stack } from '@fluentui/react';

const data: IGroupedVerticalBarChartProps['dataV2'] = [
  {
    type: 'bar',
    legend: '2022',
    data: [
      {
        x: 'Jan - Mar',
        y: 33000,
      },
      {
        x: 'Apr - Jun',
        y: 33000,
      },
      {
        x: 'Jul - Sep',
        y: 14000,
      },
      {
        x: 'Oct - Dec',
        y: -33000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    type: 'bar',
    legend: '2023',
    data: [
      {
        x: 'Jan - Mar',
        y: -44000,
      },
      {
        x: 'Apr - Jun',
        y: -3000,
      },
      {
        x: 'Jul - Sep',
        y: 50000,
      },
      {
        x: 'Oct - Dec',
        y: 3000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    type: 'bar',
    legend: '2024',
    data: [
      {
        x: 'Jan - Mar',
        y: -54000,
      },
      {
        x: 'Apr - Jun',
        y: 9000,
      },
      {
        x: 'Jul - Sep',
        y: -60000,
      },
      {
        x: 'Oct - Dec',
        y: -6000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color5),
  },
  {
    type: 'bar',
    legend: '2021',
    data: [
      {
        x: 'Jan - Mar',
        y: 24000,
      },
      {
        x: 'Apr - Jun',
        y: -12000,
      },
      {
        x: 'Jul - Sep',
        y: -10000,
      },
      {
        x: 'Oct - Dec',
        y: -15000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color6),
  },
  {
    type: 'line',
    legend: 'From_Legacy_to_O365',
    data: [
      {
        x: 'Jan - Mar',
        y: -21600,
      },
      {
        x: 'Apr - Jun',
        y: 21812,
      },
      {
        x: 'Jul - Sep',
        y: -21712,
      },
      {
        x: 'Oct - Dec',
        y: 24800,
      },
    ],
    color: DataVizPalette.color1,
    lineOptions: {
      lineBorderWidth: 2,
    },
  },
  {
    type: 'line',
    legend: 'All',
    data: [
      {
        x: 'Jan - Mar',
        y: 29700,
      },
      {
        x: 'Apr - Jun',
        y: -28400,
      },
      {
        x: 'Jul - Sep',
        y: 28200,
      },
      {
        x: 'Oct - Dec',
        y: -29400,
      },
    ],
    color: DataVizPalette.color2,
    lineOptions: {
      lineBorderWidth: 2,
    },
  },
];

const calloutVariants: IChoiceGroupOption[] = [
  { key: 'SingleCallout', text: 'Single callout' },
  { key: 'StackCallout', text: 'Stack callout' },
];

interface IGVBCExampleState {
  width: number;
  height: number;
  barwidth: number;
  calloutVariant: 'SingleCallout' | 'StackCallout';
  hideLabels: boolean;
  enableGradient: boolean;
  roundCorners: boolean;
  selectMultipleLegends: boolean;
}

export class GroupedVerticalBarChartLineExample extends React.Component<{}, IGVBCExampleState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');
  private _barwidthSliderId = getId('barwidth-slider-');

  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
      barwidth: 16,
      calloutVariant: 'SingleCallout',
      hideLabels: false,
      enableGradient: false,
      roundCorners: false,
      selectMultipleLegends: false,
    };
  }

  public render(): JSX.Element {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: '10 20' }}>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor={this._widthSliderId}>Change width:</Label>
            <input
              type="range"
              value={this.state.width}
              min={200}
              max={1000}
              id={this._widthSliderId}
              onChange={this._onWidthChange}
              aria-valuetext={`Width slider: ${this.state.width}`}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor={this._heightSliderId}>Change height:</Label>
            <input
              type="range"
              value={this.state.height}
              min={200}
              max={1000}
              id={this._heightSliderId}
              onChange={this._onHeightChange}
              aria-valuetext={`Height slider: ${this.state.height}`}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor={this._barwidthSliderId}>Change barwidth:</Label>
            <input
              type="range"
              value={this.state.barwidth}
              min={1}
              max={50}
              id={this._barwidthSliderId}
              onChange={this._onBarwidthChange}
              aria-valuetext={`Barwidth slider: ${this.state.barwidth}`}
            />
          </Stack>
        </Stack>
        <ChoiceGroup
          options={calloutVariants}
          selectedKey={this.state.calloutVariant}
          onChange={this._onCalloutVariantChange}
          label="Pick a callout variant:"
          styles={{ root: { marginTop: '20px' } }}
        />
        <Stack horizontal wrap tokens={{ childrenGap: '10 20' }} styles={{ root: { marginTop: '20px' } }}>
          <Stack horizontal verticalAlign="center">
            <Toggle label="Hide labels:" onText="ON" offText="OFF" onChange={this._onHideLabelsChange} />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Toggle label="Enable Gradient:" onText="ON" offText="OFF" onChange={this._onEnableGradientChange} />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Toggle label="Rounded Corners:" onText="ON" offText="OFF" onChange={this._onRoundCornersChange} />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Toggle
              label="Select Multiple Legends:"
              onText="ON"
              offText="OFF"
              onChange={this._onLegendMultiSelectChange}
            />
          </Stack>
        </Stack>
        <div style={rootStyle}>
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart line example"
            dataV2={data}
            height={this.state.height}
            width={this.state.width}
            isCalloutForStack={this.state.calloutVariant === 'StackCallout'}
            barwidth={this.state.barwidth}
            hideLabels={this.state.hideLabels}
            enableReflow={true}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
            legendProps={{
              canSelectMultipleLegends: this.state.selectMultipleLegends,
            }}
            supportNegativeData={true}
          />
        </div>
      </div>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onBarwidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ barwidth: parseInt(e.target.value, 10) });
  };
  private _onCalloutVariantChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    this.setState({ calloutVariant: option.key as IGVBCExampleState['calloutVariant'] });
  };
  private _onHideLabelsChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideLabels: checked });
  };
  private _onEnableGradientChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };
  private _onRoundCornersChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };
  private _onLegendMultiSelectChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ selectMultipleLegends: checked });
  };
}
