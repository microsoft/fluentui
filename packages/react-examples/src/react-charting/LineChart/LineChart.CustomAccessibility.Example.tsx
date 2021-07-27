import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface ILineChartCustomAccessibilityState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
}

export class LineChartCustomAccessibilityExample extends React.Component<{}, ILineChartCustomAccessibilityState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      allowMultipleShapes: false,
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
  private _onShapeChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ allowMultipleShapes: checked });
  };

  private _basicExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'From_Legacy_to_O365',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 156000,
              onDataPointClick: () => alert('click on 217000'),
              callOutAccessibilityData: { ariaLabel: 'Line 1 point 1 of 5 156000 ' },
            },
            {
              x: new Date('2020-03-03T10:00:00.000Z'),
              y: 258123,
              onDataPointClick: () => alert('click on 217123'),
              callOutAccessibilityData: { ariaLabel: 'Point 2 of 5 258123 ' },
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 180000,
              onDataPointClick: () => alert('click on 260000'),
              callOutAccessibilityData: { ariaLabel: 'Point 3 of 5 180000 ' },
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
              onDataPointClick: () => alert('click on 300000'),
              callOutAccessibilityData: { ariaLabel: 'Point 4 of 5 180000 ' },
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 218000,
              onDataPointClick: () => alert('click on 218000'),
              callOutAccessibilityData: { ariaLabel: 'Point 5 of 5 180000 ' },
            },
          ],
          color: DefaultPalette.blue,
          onLineClick: () => console.log('From_Legacy_to_O365'),
        },
        {
          legend: 'All',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 226000,
              callOutAccessibilityData: { ariaLabel: 'Line 2 point 1 of 3 226000 ' },
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
              callOutAccessibilityData: { ariaLabel: 'Point 2 of 3 300000 ' },
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 278000,
              callOutAccessibilityData: { ariaLabel: 'Point 3 of 3 278000 ' },
            },
          ],
          color: DefaultPalette.green,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const margins = { left: 35, top: 20, bottom: 35, right: 20 };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <Toggle
          label="Enabled  multiple shapes for each line"
          onText="On"
          offText="Off"
          onChange={this._onShapeChange}
          checked={this.state.allowMultipleShapes}
        />
        <div style={rootStyle}>
          <LineChart
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            height={this.state.height}
            width={this.state.width}
            margins={margins}
            allowMultipleShapesForPoints={this.state.allowMultipleShapes}
          />
        </div>
      </>
    );
  }
}
