import * as React from 'react';
import { IVSChartDataPoint, IVerticalStackedChartProps, VerticalStackedBarChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IVerticalStackedBarState {
  width: number;
  height: number;
  barGapMax: number;
  showLine: boolean;
}

export class VerticalStackedBarChartCustomAccessibilityExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      showLine: true,
      barGapMax: 2,
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

  private _onShowLineChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ showLine: checked });
  };

  private _basicExample(): JSX.Element {
    const { showLine } = this.state;
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 1-1 of 4, 2020/04/30 40%' },
      },
      {
        legend: 'Metadata2',
        data: 5,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '5%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 1-2 of 4, 2020/04/30 5%' },
      },
      {
        legend: 'Metadata3',
        data: 20,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 1-3 of 4, 2020/04/30 20%' },
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 30,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 2-1 of 4, 2020/04/30 30%' },
      },
      {
        legend: 'Metadata2',
        data: 20,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 2-2 of 4, 2020/04/30 20%' },
      },
      {
        legend: 'Metadata3',
        data: 40,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 2-3 of 4, 2020/04/30 40%' },
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 44,
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 3-1 of 4, 2020/04/30 44%' },
      },
      {
        legend: 'Metadata2',
        data: 28,
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '28%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 3-2 of 4, 2020/04/30 28%' },
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '30%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 3-3 of 4, 2020/04/30 30%' },
      },
    ];

    const data: IVerticalStackedChartProps[] = [
      {
        chartData: firstChartPoints,
        xAxisPoint: 0,

        ...(showLine && {
          lineData: [
            { y: 42, legend: 'Supported Builds', color: DefaultPalette.magenta },
            { y: 10, legend: 'Recommended Builds', color: DefaultPalette.redDark },
          ],
        }),
        stackCallOutAccessibilityData: { ariaLabel: 'Bar stack series 1 of 6' },
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: 20,
        ...(showLine && {
          lineData: [{ y: 33, legend: 'Supported Builds', color: DefaultPalette.magenta }],
        }),
        stackCallOutAccessibilityData: { ariaLabel: 'Bar stack series 2 of 6' },
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: 40,
        ...(showLine && {
          lineData: [
            { y: 60, legend: 'Supported Builds', color: DefaultPalette.magenta },
            { y: 20, legend: 'Recommended Builds', color: DefaultPalette.redDark },
          ],
        }),
        stackCallOutAccessibilityData: { ariaLabel: 'Bar stack series 3 of 6' },
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Custom">change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Custom"
          onChange={this._onWidthChange}
        />
        <label htmlFor="changeHeight_Custom">change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Custom"
          onChange={this._onHeightChange}
        />
        <label htmlFor="ChangeBarGapMax_Custom">BarGapMax:</label>
        <input
          type="range"
          value={this.state.barGapMax}
          min={0}
          max={10}
          id="ChangeBarGapMax_Custom"
          onChange={e => this.setState({ barGapMax: +e.target.value })}
        />
        <Checkbox
          label="show the lines (hide or show the lines)"
          checked={this.state.showLine}
          onChange={this._onShowLineChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={rootStyle}>
          <VerticalStackedBarChart
            chartTitle="Vertical stacked bar chart custom accessibility example"
            barGapMax={this.state.barGapMax}
            data={data}
            height={this.state.height}
            width={this.state.width}
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      </>
    );
  }
}
