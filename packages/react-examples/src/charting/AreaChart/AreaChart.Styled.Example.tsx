import * as React from 'react';
import { AreaChart } from '@uifabric/charting';
import { ILineChartProps } from '@uifabric/charting';
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
        color: DefaultPalette.accent,
      },
      {
        legend: 'legend2',
        data: chart2Points,
        color: DefaultPalette.blueLight,
      },
    ];

    const chartData = {
      chartTitle: 'Area chart styled example',
      lineChartData: chartPoints,
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <AreaChart height={this.state.height} width={this.state.width} data={chartData} showYAxisGridLines={false} />
        </div>
      </>
    );
  }
}
