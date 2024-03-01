import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '@fluentui/react-charting';

interface IVerticalBarState {
  barWidth: number;
  maxBarWidth: number;
}

export class VerticalBarChartDateAxisExample extends React.Component<{}, IVerticalBarState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      barWidth: 16,
      maxBarWidth: 100,
    };
  }
  public render(): JSX.Element {
    return <div>{this._rotateLabelExample()}</div>;
  }

  private _onBarWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ barWidth: Number(e.target.value) });
  };
  private _onMaxBarWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ maxBarWidth: Number(e.target.value) });
  };

  private _rotateLabelExample(): JSX.Element {
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: new Date('2018/01/01'),
        y: 3500,
        color: '#627CEF',
      },
      {
        x: new Date('2018/03/01'),
        y: 2500,
        color: '#C19C00',
      },
      {
        x: new Date('2018/07/01'),
        y: 1900,
        color: '#E650AF',
      },
      {
        x: new Date('2018/10/01'),
        y: 2800,
        color: '#0E7878',
      },
      {
        x: new Date('2019/01/01'),
        y: 3800,
        color: '#0E7878',
      },
    ];
    const timeFormat = '%m/%d';
    const tickValues: Date[] = [
      new Date('01-01-2018'),
      new Date('03-01-2018'),
      new Date('07-01-2018'),
      new Date('10-01-2018'),
      new Date('01-01-2019'),
    ];
    const rootStyle = { width: '650px', height: '500px' };
    return (
      <>
        <label htmlFor="input-barWidth">barWidth:</label>
        <input type="number" value={this.state.barWidth} id="input-barWidth" onChange={this._onBarWidthChange} />
        <label htmlFor="input-maxBarWidth">maxBarWidth:</label>
        <input
          type="number"
          value={this.state.maxBarWidth}
          id="input-maxBarWidth"
          onChange={this._onMaxBarWidthChange}
        />
        <div style={rootStyle}>
          <VerticalBarChart
            chartTitle="Vertical bar chart rotated labels example "
            culture={window.navigator.language}
            data={points}
            height={350}
            tickFormat={timeFormat}
            tickValues={tickValues}
            width={650}
            hideLegend={true}
            //rotateXAxisLables={true}
            enableReflow={true}
            barWidth={this.state.barWidth}
            maxBarWidth={this.state.maxBarWidth}
          />
        </div>
      </>
    );
  }
}
