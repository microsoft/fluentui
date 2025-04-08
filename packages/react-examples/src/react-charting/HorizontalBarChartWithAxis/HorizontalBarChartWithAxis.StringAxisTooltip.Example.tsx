import * as React from 'react';
import {
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

const options: IChoiceGroupOption[] = [
  { key: 'expandYAxisLabels', text: 'Expand Y Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at Y Axis Ticks' },
];

interface IHorizontalBarChartWithAxisState {
  selectedCallout: string;
  enableGradient: boolean;
  roundCorners: boolean;
}

export class HorizontalBarChartWithAxisStringAxisTooltipExample extends React.Component<
  {},
  IHorizontalBarChartWithAxisState
> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
      enableGradient: false,
      roundCorners: false,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicStringAxisExample()}</div>;
  }

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _basicStringAxisExample(): JSX.Element {
    const points: IHorizontalBarChartWithAxisDataPoint[] = [
      {
        y: 'String One',
        x: 1000,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        y: 'String Two',
        x: 5000,
        color: getColorFromToken(DataVizPalette.color2),
      },
      {
        y: 'String Three',
        x: 3000,
        color: getColorFromToken(DataVizPalette.color3),
      },
      {
        y: 'String Four',
        x: 2000,
        color: getColorFromToken(DataVizPalette.color4),
      },
    ];

    const rootStyle = { width: '650px', height: '350px' };
    return (
      <div className="containerDiv">
        <div>
          <ChoiceGroup
            options={options}
            defaultSelectedKey="showTooltip"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(_ev, option) => option && this.setState({ selectedCallout: option.key })}
            label="Pick one"
          />
          <div style={{ display: 'flex' }}>
            <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
            &nbsp;&nbsp;
            <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundedCorners} />
          </div>
        </div>

        <div style={rootStyle}>
          <HorizontalBarChartWithAxis
            chartTitle="Horizontal bar chart axis tooltip example "
            data={points}
            height={350}
            width={650}
            hideLegend={true}
            hideTooltip={false}
            showYAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            showYAxisLables={this.state.selectedCallout === 'expandYAxisLabels' ? true : false}
            enableReflow={true}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
          />
        </div>
      </div>
    );
  }
}
