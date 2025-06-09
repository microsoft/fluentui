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

export class HorizontalBarChartWithAxisNegativeExample extends React.Component<{}, IHorizontalBarChartWithAxisState> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
      enableGradient: false,
      roundCorners: false,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicNegativeXAxisExample()}</div>;
  }

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _generateData = (): IHorizontalBarChartWithAxisDataPoint[] => {
    const data: IHorizontalBarChartWithAxisDataPoint[] = [];
    const categories = ['A', 'B', 'C', 'D', 'E'];
    const series = ['Series 1', 'Series 2', 'Series 3', 'Series 4'];
    const colors = [
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color2),
      getColorFromToken(DataVizPalette.color3),
      getColorFromToken(DataVizPalette.color4),
    ];
    const negativeData1 = [-10, -20, -30, -40, -50];
    const positiveData1 = [10, 20, 30, 40, 50];
    const positiveData2 = [20, 30, 40, 50, 60];
    const negativeData2 = [-20, -30, -40, -50, -60];

    const positiveData3 = [30, 40, 50, 60, 70];
    const negativeData3 = [-30, -40, -50, -60, -70];

    const positiveData4 = [40, 50, 60, 70, 80];
    const negativeData4 = [-40, -50, -60, -70, -80];

    return data.concat(
      categories.map((category, index) => ({
        x: positiveData1[index],
        y: category,
        legend: series[0],
        color: colors[0],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData1[index],
        y: category,
        legend: series[0],
        color: colors[0],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: positiveData2[index],
        y: category,
        legend: series[1],
        color: colors[1],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData2[index],
        y: category,
        legend: series[1],
        color: colors[1],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: positiveData3[index],
        y: category,
        legend: series[2],
        color: colors[2],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData3[index],
        y: category,
        legend: series[2],
        color: colors[2],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: positiveData4[index],
        y: category,
        legend: series[3],
        color: colors[3],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData4[index],
        y: category,
        legend: series[3],
        color: colors[3],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
    );
  };

  private _basicNegativeXAxisExample(): JSX.Element {
    const points: IHorizontalBarChartWithAxisDataPoint[] = this._generateData();

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
