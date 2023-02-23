import * as React from 'react';
import { AreaChartLite } from '@fluentui/react-charting';
import { IAreaChartProps } from '@fluentui/react-charting';
//import {  IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { getTheme } from '@fluentui/react/lib/Styling';

interface IAreaChartBasicState {
  width: number;
  height: number;
  isCalloutselected: boolean;
}

// const options: IChoiceGroupOption[] = [
//   { key: 'basicExample', text: 'Basic Example' },
//   { key: 'calloutExample', text: 'Custom Callout Example' },
// ];

export class AreaChartPerfElevenExample extends React.Component<{}, IAreaChartBasicState> {
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
      height: 300,
      isCalloutselected: false,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  // private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({ width: parseInt(e.target.value, 10) });
  // };
  // private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({ height: parseInt(e.target.value, 10) });
  // };

  // private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
  //   if (this.state.isCalloutselected) {
  //     this.setState({ isCalloutselected: false });
  //   } else {
  //     this.setState({ isCalloutselected: true });
  //   }
  // };

  // private _getData(increment: number): any {
  //   const data = [];
  //   let i = 1;
  //   for (i = 1; i < 30000; i++) {
  //     const y = i + increment;
  //     data.push({ x: increment * i, y });
  //   }
  //   return data;
  // }

  private _getdata2 = (increament: number) => {
    const data = [];
    //const startdate = new Date('2020-03-01T00:00:00.000Z');
    for (let i = 1; i < 30000; i++) {
      data.push({ x: i * increament, y: this._getY(i) });
    }

    return data;
  };

  private _getY = (i: number) => {
    let res: number = 0;
    const newN = i % 1000;
    if (newN < 500) {
      res = newN * newN;
    } else {
      res = 1000000 - newN * newN;
    }

    return res;
  };

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
    for (let i: number = 0; i < 1; i++) {
      const chartPoints = [];
      chartPoints.push(this._getChartData(this._getdata2(i + 1), 'Legend 1', 'Title', this._colors[i]));
      //chartPoints.push(this._getChartData(this._getData(i + 1), 'Legend 2', 'Title', this._colors[9]));
      //chartPoints.push(this._getChartData(this._getData(i + 1), 'Legend 3', 'Title', this._colors[8]));

      const chartData = {
        chartTitle: '3-5 time series Chart',
        lineChartData: chartPoints,
      };
      charts.push(
        <AreaChartLite
          //culture={window.navigator.language}
          height={300}
          width={700}
          data={chartData}
          //showYAxisGridLines={true}
          //calloutProps={{ hidden: true }}
          // eslint-disable-next-line react/jsx-no-bind
        />,
      );
    }

    return (
      <>
        <div style={rootStyle}>{charts}</div>
      </>
    );
  }
}
