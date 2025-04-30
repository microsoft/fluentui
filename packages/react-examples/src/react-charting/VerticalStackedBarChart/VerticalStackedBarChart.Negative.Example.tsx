import * as React from 'react';
import {
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  VerticalStackedBarChart,
  ILineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IVerticalStackedBarState {
  width: number;
  height: number;
  barGapMax: number;
  showLine: boolean;
  hideLabels: boolean;
  showAxisTitles: boolean;
  margins: {};
  enableGradient: boolean;
  roundCorners: boolean;
  legendMultiSelect: boolean;
}

export class VerticalStackedBarChartNegativeExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      showLine: true,
      barGapMax: 2,
      hideLabels: false,
      showAxisTitles: true,
      margins: {
        top: 20,
        bottom: 55,
        right: 40,
        left: 60,
      },
      enableGradient: false,
      roundCorners: false,
      legendMultiSelect: false,
    };
  }

  public componentDidMount(): void {
    const style = document.createElement('style');
    const focusStylingCSS = `
    .containerDiv [contentEditable=true]:focus,
    .containerDiv [tabindex]:focus,
    .containerDiv area[href]:focus,
    .containerDiv button:focus,
    .containerDiv iframe:focus,
    .containerDiv input:focus,
    .containerDiv select:focus,
    .containerDiv textarea:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
  }

  public render(): JSX.Element {
    return <div key={'id_VBC'}>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _onShowLineChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ showLine: checked });
  };
  private _onHideLabelsCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideLabels: checked });
  };
  private _onToggleAxisTitlesCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({
      showAxisTitles: checked,
    });
    if (checked) {
      this.setState({
        margins: {
          top: 20,
          bottom: 55,
          right: 40,
          left: 60,
        },
      });
    } else {
      this.setState({
        margins: {
          top: 20,
          bottom: 35,
          right: 20,
          left: 40,
        },
      });
    }
  };

  private _onEnableGradientChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onRoundCornersChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _onToggleLegendMultiSelect = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ legendMultiSelect: checked });
  };

  private _basicExample(): JSX.Element {
    const { showLine } = this.state;
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: getColorFromToken(DataVizPalette.color1),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '68%',
      },
      {
        legend: 'Metadata2',
        data: 5,
        color: getColorFromToken(DataVizPalette.color2),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '8.5%',
      },
      {
        legend: 'Metadata3',
        data: -20,
        color: getColorFromToken(DataVizPalette.color3),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '34%',
      },
      {
        legend: 'Metadata4',
        data: 10,
        color: getColorFromToken(DataVizPalette.color4),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '17%',
      },
      {
        legend: 'Metadata5',
        data: 23,
        color: getColorFromToken(DataVizPalette.color5),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '39%',
      },
      {
        legend: 'Metadata6',
        data: 0.4,
        color: getColorFromToken(DataVizPalette.color6),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '0.7%',
      },
      {
        legend: 'Metadata7',
        data: -0.5,
        color: getColorFromToken(DataVizPalette.color7),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '0.85%',
      },
      {
        legend: 'Metadata8',
        data: -0.3,
        color: getColorFromToken(DataVizPalette.color8),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '0.5%',
      },
      {
        legend: 'Metadata9',
        data: 0.7,
        color: getColorFromToken(DataVizPalette.color9),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '1.2%',
      },
      {
        legend: 'Metadata10',
        data: 0.1,
        color: getColorFromToken(DataVizPalette.color10),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '0.2%',
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: -30,
        color: getColorFromToken(DataVizPalette.color1),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
      {
        legend: 'Metadata2',
        data: -20,
        color: getColorFromToken(DataVizPalette.color2),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '22%',
      },
      {
        legend: 'Metadata3',
        data: -40,
        color: getColorFromToken(DataVizPalette.color3),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '45%',
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 44,
        color: getColorFromToken(DataVizPalette.color1),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '43%',
      },
      {
        legend: 'Metadata2',
        data: 28,
        color: getColorFromToken(DataVizPalette.color2),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '27%',
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: getColorFromToken(DataVizPalette.color3),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
      },
    ];

    const fourthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 88,
        color: getColorFromToken(DataVizPalette.color1),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '63%',
      },
      {
        legend: 'Metadata2',
        data: 22,
        color: getColorFromToken(DataVizPalette.color2),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '16%',
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: getColorFromToken(DataVizPalette.color3),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '21%',
      },
    ];

    const data: IVerticalStackedChartProps[] = [
      {
        chartData: firstChartPoints,
        xAxisPoint: 0,

        ...(showLine && {
          lineData: [
            { y: 42, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) },
            { y: 10, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color9) },
          ],
        }),
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: 20,
        ...(showLine && {
          lineData: [{ y: 33, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) }],
        }),
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: 40,
        ...(showLine && {
          lineData: [
            { y: 60, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) },
            { y: 20, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color9) },
          ],
        }),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 60,
        ...(showLine && {
          lineData: [
            { y: 41, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) },
            { y: 10, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color9) },
          ],
        }),
      },
      {
        chartData: fourthChartPoints,
        xAxisPoint: 80,
        ...(showLine && {
          lineData: [
            { y: 100, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) },
            { y: 70, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color9) },
          ],
        }),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 100,
      },
    ];

    const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <label htmlFor="changeBarGapMax_Basic">BarGapMax:</label>
        <input
          type="range"
          value={this.state.barGapMax}
          min={0}
          max={10}
          id="changeBarGapMax_Basic"
          onChange={e => this.setState({ barGapMax: +e.target.value })}
          aria-valuetext={`ChangebarGapMaxSlider${this.state.barGapMax}`}
        />
        <Checkbox
          label="show the lines (hide or show the lines)"
          checked={this.state.showLine}
          onChange={this._onShowLineChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <Checkbox
          label="Hide labels"
          checked={this.state.hideLabels}
          onChange={this._onHideLabelsCheckChange}
          styles={{ root: { marginTop: '10px' } }}
        />
        <div style={{ display: 'flex' }}>
          <Toggle
            label="Toggle Axis titles"
            onText="Show axis titles"
            offText="Hide axis titles"
            checked={this.state.showAxisTitles}
            onChange={this._onToggleAxisTitlesCheckChange}
          />
          &nbsp;&nbsp;
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onEnableGradientChange} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onRoundCornersChange} />
          &nbsp;&nbsp;
          <Toggle
            label="Select Multiple Legends"
            onText="ON"
            offText="OFF"
            onChange={this._onToggleLegendMultiSelect}
          />
        </div>
        {this.state.showAxisTitles && (
          <div style={rootStyle}>
            <VerticalStackedBarChart
              culture={window.navigator.language}
              chartTitle="Vertical stacked bar chart basic example"
              barGapMax={this.state.barGapMax}
              data={data}
              height={this.state.height}
              width={this.state.width}
              margins={this.state.margins}
              lineOptions={lineOptions}
              legendProps={{
                allowFocusOnLegends: true,
                canSelectMultipleLegends: this.state.legendMultiSelect,
              }}
              hideLabels={this.state.hideLabels}
              enableReflow={true}
              yAxisTitle={this.state.showAxisTitles ? 'Variation of number of sales' : undefined}
              xAxisTitle={this.state.showAxisTitles ? 'Number of days' : undefined}
              enableGradient={this.state.enableGradient}
              roundCorners={this.state.roundCorners}
              roundedTicks={true}
              supportNegativeData={true}
            />
          </div>
        )}
        {!this.state.showAxisTitles && (
          <div style={rootStyle}>
            <VerticalStackedBarChart
              culture={window.navigator.language}
              chartTitle="Vertical stacked bar chart basic example"
              barGapMax={this.state.barGapMax}
              data={data}
              height={this.state.height}
              width={this.state.width}
              margins={this.state.margins}
              lineOptions={lineOptions}
              legendProps={{
                allowFocusOnLegends: true,
                canSelectMultipleLegends: this.state.legendMultiSelect,
              }}
              hideLabels={this.state.hideLabels}
              enableReflow={true}
              enableGradient={this.state.enableGradient}
              roundCorners={this.state.roundCorners}
              roundedTicks={true}
              supportNegativeData={true}
            />
          </div>
        )}
      </div>
    );
  }
}
