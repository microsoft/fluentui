import * as React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import { ILineChartProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IAreaChartBasicState {
  width: number;
  height: number;
  useUTC: boolean;
}

export class AreaChartStyledExample extends React.Component<{}, IAreaChartBasicState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      useUTC: true,
    };
  }

  public render(): JSX.Element {
    return <div className="containerDiv">{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('height change');
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onCheckChange = (ev: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ useUTC: checked });
  };

  private _basicExample(): JSX.Element {
    const chart1Points = [
      {
        x: new Date('2018-01-06'),
        y: 5,
      },
      {
        x: new Date('2018-01-08'),
        y: 16,
      },
      {
        x: new Date('2018-01-16'),
        y: 6,
      },
      {
        x: new Date('2018-02-06'),
        y: 30,
      },
      {
        x: new Date('2018-02-16'),
        y: 10,
      },
    ];

    const chart2Points = [
      {
        x: new Date('2018-01-06'),
        y: 10,
      },
      {
        x: new Date('2018-01-08'),
        y: 33,
      },
      {
        x: new Date('2018-01-16'),
        y: 21,
      },
      {
        x: new Date('2018-02-06'),
        y: 44,
      },
      {
        x: new Date('2018-02-16'),
        y: 22,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: DataVizPalette.color2,
        opacity: 0.7,
        lineOptions: {
          strokeWidth: 2,
          strokeDasharray: '5 5',
        },
      },
      {
        legend: 'legend2',
        data: chart2Points,
        color: DataVizPalette.color3,
        opacity: 0.8,
        lineOptions: {
          strokeWidth: 5,
          stroke: getColorFromToken(DataVizPalette.color13),
        },
      },
    ];

    const chartData = {
      chartTitle: 'Area chart styled example',
      lineChartData: chartPoints,
      pointOptions: { r: 10, strokeWidth: 3, opacity: 1, stroke: getColorFromToken(DataVizPalette.color13) },
      pointLineOptions: { strokeWidth: 2, strokeDasharray: '10 10', stroke: getColorFromToken(DataVizPalette.color13) },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Styled">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Styled"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Styled">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Styled"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <Checkbox
          label="Use UTC time"
          checked={this.state.useUTC}
          onChange={this._onCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={rootStyle}>
          <AreaChart
            showXAxisLablesTooltip
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            showYAxisGridLines={false}
            enablePerfOptimization={true}
            enableReflow={true}
            useUTC={this.state.useUTC}
          />
        </div>
      </>
    );
  }
}
