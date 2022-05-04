import * as React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import { ILineChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface IAreaChartBasicState {
  width: number;
  height: number;
}

export class AreaChartStyledExample extends React.Component<{}, IAreaChartBasicState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('height change');
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _basicExample(): JSX.Element {
    const chart1Points = [
      {
        x: new Date('2018/01/06'),
        y: 5,
      },
      {
        x: new Date('2018/01/08'),
        y: 16,
      },
      {
        x: new Date('2018/01/16'),
        y: 6,
      },
      {
        x: new Date('2018/02/06'),
        y: 30,
      },
      {
        x: new Date('2018/02/16'),
        y: 10,
      },
    ];

    const chart2Points = [
      {
        x: new Date('2018/01/06'),
        y: 10,
      },
      {
        x: new Date('2018/01/08'),
        y: 33,
      },
      {
        x: new Date('2018/01/16'),
        y: 21,
      },
      {
        x: new Date('2018/02/06'),
        y: 44,
      },
      {
        x: new Date('2018/02/16'),
        y: 22,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: '#0099BC',
        opacity: 0.7,
        lineOptions: {
          strokeWidth: 2,
          strokeDasharray: '5 5',
        },
      },
      {
        legend: 'legend2',
        data: chart2Points,
        color: '#77004D',
        opacity: 0.8,
        lineOptions: {
          strokeWidth: 5,
          stroke: DefaultPalette.blueDark,
        },
      },
    ];

    const chartData = {
      chartTitle: 'Area chart styled example',
      lineChartData: chartPoints,
      pointOptions: { r: 10, strokeWidth: 3, opacity: 1, stroke: DefaultPalette.blueDark },
      pointLineOptions: { strokeWidth: 2, strokeDasharray: '10 10', stroke: DefaultPalette.blueDark },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Styled">change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Styled"
          onChange={this._onWidthChange}
        />
        <label htmlFor="changeHeight_Styled">change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Styled"
          onChange={this._onHeightChange}
        />
        <div style={rootStyle}>
          <AreaChart
            showXAxisLablesTooltip
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            showYAxisGridLines={false}
          />
        </div>
      </>
    );
  }
}
