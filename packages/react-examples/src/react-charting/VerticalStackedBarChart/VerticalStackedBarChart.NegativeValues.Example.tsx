import * as React from 'react';
import { IVSChartDataPoint, IVerticalStackedChartProps, VerticalStackedBarChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface IVerticalStackedBarState {
  width: number;
  height: number;
  barGapMax: number;
}

export class VerticalStackedBarChartNegativeValuesExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      barGapMax: 2,
    };
  }

  public render(): JSX.Element {
    return <div key={'id_VSBC'}>{this._negativeValues()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _negativeValues(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: DefaultPalette.blue,
      },
      {
        legend: 'Metadata2',
        data: 5,
        color: DefaultPalette.blueMid,
      },
      {
        legend: 'Metadata3',
        data: 20,
        color: DefaultPalette.blueLight,
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: -30,
        color: DefaultPalette.blue,
      },
      {
        legend: 'Metadata2',
        data: -20,
        color: DefaultPalette.blueMid,
      },
      {
        legend: 'Metadata3',
        data: -40,
        color: DefaultPalette.blueLight,
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 44,
        color: DefaultPalette.blue,
      },
      {
        legend: 'Metadata2',
        data: 28,
        color: DefaultPalette.blueMid,
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: DefaultPalette.blueLight,
      },
    ];

    const fourthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: -88,
        color: DefaultPalette.blue,
      },
      {
        legend: 'Metadata2',
        data: -22,
        color: DefaultPalette.blueMid,
      },
      {
        legend: 'Metadata3',
        data: -30,
        color: DefaultPalette.blueLight,
      },
    ];

    const data: IVerticalStackedChartProps[] = [
      {
        chartData: firstChartPoints,
        xAxisPoint: 0,
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: 20,
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: 40,
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 60,
      },
      {
        chartData: fourthChartPoints,
        xAxisPoint: 80,
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 100,
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_NegativeValues">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_NegativeValues"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_NegativeValues">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_NegativeValues"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <label htmlFor="changeBarGapMax_NegativeValues">BarGapMax:</label>
        <input
          type="range"
          value={this.state.barGapMax}
          min={0}
          max={10}
          id="changeBarGapMax_NegativeValues"
          onChange={e => this.setState({ barGapMax: +e.target.value })}
          aria-valuetext={`ChangebarGapMaxSlider${this.state.barGapMax}`}
        />
        <div style={rootStyle}>
          <VerticalStackedBarChart
            culture={window.navigator.language}
            chartTitle="Vertical stacked bar chart negative values example"
            barGapMax={this.state.barGapMax}
            data={data}
            height={this.state.height}
            width={this.state.width}
            legendProps={{
              allowFocusOnLegends: true,
            }}
            enableReflow={true}
            supportNegativeValues={true}
          />
        </div>
      </>
    );
  }
}
