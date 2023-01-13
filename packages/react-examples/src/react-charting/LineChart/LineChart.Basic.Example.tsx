import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface ILineChartBasicState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
}

export class LineChartBasicExample extends React.Component<{}, ILineChartBasicState> {
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
          legend: 'single point',
          data: [],
          color: DefaultPalette.yellow,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const margins = { left: 35, top: 20, bottom: 35, right: 20 };

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
        <div style={rootStyle}>
          <LineChart
            culture={window.navigator.language}
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            height={this.state.height}
            width={this.state.width}
            margins={margins}
            xAxisTickCount={10}
            allowMultipleShapesForPoints={this.state.allowMultipleShapes}
          />
        </div>
      </>
    );
  }
}
