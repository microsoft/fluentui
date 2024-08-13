import * as React from 'react';
import {
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  VerticalStackedBarChart,
  ILineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
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
}

export class VerticalStackedBarChartBasicExample extends React.Component<{}, IVerticalStackedBarState> {
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
    };
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

  private _basicExample(): JSX.Element {
    const { showLine } = this.state;
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: getColorFromToken(DataVizPalette.color11),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '61%',
      },
      {
        legend: 'Metadata2',
        data: 5,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '8%',
      },
      {
        legend: 'Metadata3',
        data: 20,
        color: getColorFromToken(DataVizPalette.color6),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '31%',
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 30,
        color: getColorFromToken(DataVizPalette.color11),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
      {
        legend: 'Metadata2',
        data: 20,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '22%',
      },
      {
        legend: 'Metadata3',
        data: 40,
        color: getColorFromToken(DataVizPalette.color6),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '45%',
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 44,
        color: getColorFromToken(DataVizPalette.color11),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '43%',
      },
      {
        legend: 'Metadata2',
        data: 28,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '27%',
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: getColorFromToken(DataVizPalette.color6),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
      },
    ];

    const fourthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 88,
        color: getColorFromToken(DataVizPalette.color11),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '63%',
      },
      {
        legend: 'Metadata2',
        data: 22,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '16%',
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: getColorFromToken(DataVizPalette.color6),
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
            { y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight },
            { y: 10, legend: 'Recommended Builds', color: DefaultPalette.redDark },
          ],
        }),
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: 20,
        ...(showLine && {
          lineData: [{ y: 33, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
        }),
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: 40,
        ...(showLine && {
          lineData: [
            { y: 60, legend: 'Supported Builds', color: DefaultPalette.magentaLight },
            { y: 20, legend: 'Recommended Builds', color: DefaultPalette.redDark },
          ],
        }),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 60,
        ...(showLine && {
          lineData: [
            { y: 41, legend: 'Supported Builds', color: DefaultPalette.magentaLight },
            { y: 10, legend: 'Recommended Builds', color: DefaultPalette.redDark },
          ],
        }),
      },
      {
        chartData: fourthChartPoints,
        xAxisPoint: 80,
        ...(showLine && {
          lineData: [
            { y: 100, legend: 'Supported Builds', color: DefaultPalette.magentaLight },
            { y: 70, legend: 'Recommended Builds', color: DefaultPalette.redDark },
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
      <>
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
        <Toggle
          label="Toggle Axis titles"
          onText="Show axis titles"
          offText="Hide axis titles"
          checked={this.state.showAxisTitles}
          onChange={this._onToggleAxisTitlesCheckChange}
          styles={{ root: { marginTop: '10px' } }}
        />
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
              }}
              hideLabels={this.state.hideLabels}
              enableReflow={true}
              yAxisTitle={this.state.showAxisTitles ? 'Variation of number of sales' : undefined}
              xAxisTitle={this.state.showAxisTitles ? 'Number of days' : undefined}
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
              }}
              hideLabels={this.state.hideLabels}
              enableReflow={true}
            />
          </div>
        )}
      </>
    );
  }
}
