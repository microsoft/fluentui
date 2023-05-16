import * as React from 'react';
import { ILineChartProps, LineChart } from '@fluentui/react-charting';
import { getTheme } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface ILineChartBasicState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
}

export class LineChartPerfTwoExample extends React.Component<{}, ILineChartBasicState> {
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
    this._palette.magentaDark,
  ];
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      allowMultipleShapes: false,
    };
  }

  public render(): JSX.Element {
    return <div>{this._perfTwoExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onShapeChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ allowMultipleShapes: checked });
  };

  private _getData(increment: number): any {
    const data = [];

    let i = 1;
    for (i = 1; i < 101; i++) {
      const date = new Date('2020-03-03T00:00:00.000Z');
      const y = Math.random() * 1000 + increment;
      data.push({ x: this._addDays(date, increment * i), y });
    }
    return data;
  }

  private _addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
  private _getChartData(data: any, legend: string, title: string, color: string): any {
    const chartPoints = {
      legend,
      data,
      color,
      onLineClick: () => console.log('From_Legacy_to_O365'),
    };
    return chartPoints;
  }

  private _perfTwoExample(): JSX.Element {
    // const data: IChartProps = {
    //   chartTitle: 'Line Chart',
    //   lineChartData: [
    //     {
    //       legend: 'From_Legacy_to_O365',
    //       data: [
    //         {
    //           x: new Date('2020-03-03T00:00:00.000Z'),
    //           y: 216000,
    //           onDataPointClick: () => alert('click on 217000'),
    //         },
    //         {
    //           x: new Date('2020-03-03T10:00:00.000Z'),
    //           y: 218123,
    //           onDataPointClick: () => alert('click on 217123'),
    //         },
    //         {
    //           x: new Date('2020-03-03T11:00:00.000Z'),
    //           y: 217124,
    //           onDataPointClick: () => alert('click on 217124'),
    //         },
    //         {
    //           x: new Date('2020-03-04T00:00:00.000Z'),
    //           y: 248000,
    //           onDataPointClick: () => alert('click on 248000'),
    //         },
    //         {
    //           x: new Date('2020-03-05T00:00:00.000Z'),
    //           y: 252000,
    //           onDataPointClick: () => alert('click on 252000'),
    //         },
    //         {
    //           x: new Date('2020-03-06T00:00:00.000Z'),
    //           y: 274000,
    //           onDataPointClick: () => alert('click on 274000'),
    //         },
    //         {
    //           x: new Date('2020-03-07T00:00:00.000Z'),
    //           y: 260000,
    //           onDataPointClick: () => alert('click on 260000'),
    //         },
    //         {
    //           x: new Date('2020-03-08T00:00:00.000Z'),
    //           y: 304000,
    //           onDataPointClick: () => alert('click on 300000'),
    //         },
    //         {
    //           x: new Date('2020-03-09T00:00:00.000Z'),
    //           y: 218000,
    //           onDataPointClick: () => alert('click on 218000'),
    //         },
    //       ],
    //       color: DefaultPalette.blue,
    //       lineOptions: {
    //         lineBorderWidth: '4',
    //       },
    //       onLineClick: () => console.log('From_Legacy_to_O365'),
    //     },
    //     {
    //       legend: 'All',
    //       data: [
    //         {
    //           x: new Date('2020-03-03T00:00:00.000Z'),
    //           y: 297000,
    //         },
    //         {
    //           x: new Date('2020-03-04T00:00:00.000Z'),
    //           y: 284000,
    //         },
    //         {
    //           x: new Date('2020-03-05T00:00:00.000Z'),
    //           y: 282000,
    //         },
    //         {
    //           x: new Date('2020-03-06T00:00:00.000Z'),
    //           y: 294000,
    //         },
    //         {
    //           x: new Date('2020-03-07T00:00:00.000Z'),
    //           y: 224000,
    //         },
    //         {
    //           x: new Date('2020-03-08T00:00:00.000Z'),
    //           y: 300000,
    //         },
    //         {
    //           x: new Date('2020-03-09T00:00:00.000Z'),
    //           y: 298000,
    //         },
    //       ],
    //       color: DefaultPalette.green,
    //       lineOptions: {
    //         lineBorderWidth: '4',
    //       },
    //     },
    //     {
    //       legend: 'single point',
    //       data: [
    //         {
    //           x: new Date('2020-03-05T00:00:00.000Z'),
    //           y: 282000,
    //         },
    //       ],
    //       color: DefaultPalette.yellow,
    //     },
    //   ],
    // };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const margins = { left: 35, top: 20, bottom: 35, right: 20 };

    const charts: JSX.Element[] = [];
    for (let i: number = 0; i < 6; i++) {
      const data = [];
      data.push(this._getData(i + 1));
      //data.push(this._getData(i + 1));
      const chartPoints = [];
      chartPoints.push(this._getChartData(data[0], 'Legend 1', 'Title', this._colors[i]));
      //chartPoints.push(this._getChartData(data[1], 'Legend 2', 'Title', this._colors[10]));
      const chartData = {
        chartTitle: 'Title test',
        lineChartData: chartPoints,
      };
      charts.push(
        <LineChart
          culture={window.navigator.language}
          data={chartData}
          legendsOverflowText={'Overflow Items'}
          yMinValue={200}
          yMaxValue={301}
          height={this.state.height}
          width={this.state.width}
          margins={margins}
          xAxisTickCount={10}
          allowMultipleShapesForPoints={this.state.allowMultipleShapes}
          optimizeLargeData={true}
        />,
      );
    }

    return (
      <>
        <label htmlFor="changeWidth_basic">Change Width:</label>
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
        <Toggle
          label="Enabled  multiple shapes for each line"
          onText="On"
          offText="Off"
          onChange={this._onShapeChange}
          checked={this.state.allowMultipleShapes}
        />
        <div style={rootStyle}>{charts}</div>
      </>
    );
  }
}
