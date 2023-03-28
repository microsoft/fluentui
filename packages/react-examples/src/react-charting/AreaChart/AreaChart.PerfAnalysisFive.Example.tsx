import * as React from 'react';
import { AreaChart, ICustomizedCalloutData } from '@fluentui/react-charting';
import { IAreaChartProps, ChartHoverCard } from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { getTheme } from '@fluentui/react/lib/Styling';

interface IAreaChartBasicState {
  width: number;
  height: number;
  isCalloutselected: boolean;
}

const options: IChoiceGroupOption[] = [
  { key: 'basicExample', text: 'Basic Example' },
  { key: 'calloutExample', text: 'Custom Callout Example' },
];

export class AreaChartPerfFiveExample extends React.Component<{}, IAreaChartBasicState> {
  private _palette = getTheme().palette;
  private _colors = [
    this._palette.yellow,
    this._palette.blue,
    this._palette.blueDark,
    this._palette.magenta,
    this._palette.red,
    this._palette.orange,
    this._palette.green,
    this._palette.purple,
    this._palette.purpleLight,
    this._palette.yellowDark,
  ];

  constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 200,
      isCalloutselected: false,
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

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    if (this.state.isCalloutselected) {
      this.setState({ isCalloutselected: false });
    } else {
      this.setState({ isCalloutselected: true });
    }
  };

  private _getData(increment: number): any {
    const data = [];
    let i = 1;
    for (i = 1; i < 101; i++) {
      const y = Math.random() * 1000 + increment;
      data.push({ x: increment * i, y });
    }
    return data;
  }

  private _getChartData(data: any, legend: string, title: string, color: string): any {
    const chartPoints = {
      legend,
      data,
      color,
    };

    return chartPoints;
  }

  private _basicExample(): JSX.Element {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const charts: JSX.Element[] = [];
    for (let i: number = 0; i < 20; i++) {
      const chartPoints = [];
      chartPoints.push(this._getChartData(this._getData(i + 1), 'Legend 1', 'Title', this._colors[i]));
      chartPoints.push(this._getChartData(this._getData(i + 1), 'Legend 2', 'Title', this._colors[8]));
      //chartPoints.push(this._getChartData(this._getData(i + 1), 'Legend 3', 'Title', this._colors[8]));

      const chartData = {
        chartTitle: '3-5 time series Chart',
        lineChartData: chartPoints,
      };
      charts.push(
        <AreaChart
          culture={window.navigator.language}
          height={this.state.height}
          width={this.state.width}
          data={chartData}
          calloutProps={{ hidden: true }}
          showYAxisGridLines={true}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
            props && this.state.isCalloutselected ? (
              <ChartHoverCard
                XValue={props.x.toString()}
                Legend={'Custom Legend'}
                YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                color={'red'}
              />
            ) : null
          }
        />,
      );
    }

    return (
      <>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={700}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={500}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <ChoiceGroup options={options} defaultSelectedKey="basicExample" onChange={this._onChange} label="Pick one" />
        <div style={rootStyle}>{charts}</div>
      </>
    );
  }
}
