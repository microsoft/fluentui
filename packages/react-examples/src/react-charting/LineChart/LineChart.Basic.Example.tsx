import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart, DataVizPalette } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface ILineChartBasicState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
  showAxisTitles: boolean;
  useUTC: boolean;
}

export class LineChartBasicExample extends React.Component<{}, ILineChartBasicState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      allowMultipleShapes: false,
      showAxisTitles: true,
      useUTC: true,
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
  private _onToggleAxisTitlesCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.forceUpdate();
    this.setState({ showAxisTitles: checked });
  };
  private _onCheckChange = (ev: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ useUTC: checked });
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
              y: 216000,
              onDataPointClick: () => alert('click on 217000'),
            },
            {
              x: new Date('2020-03-03T10:00:00.000Z'),
              y: 218123,
              onDataPointClick: () => alert('click on 217123'),
            },
            {
              x: new Date('2020-03-03T11:00:00.000Z'),
              y: 217124,
              onDataPointClick: () => alert('click on 217124'),
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 248000,
              onDataPointClick: () => alert('click on 248000'),
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 252000,
              onDataPointClick: () => alert('click on 252000'),
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 274000,
              onDataPointClick: () => alert('click on 274000'),
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 260000,
              onDataPointClick: () => alert('click on 260000'),
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 304000,
              onDataPointClick: () => alert('click on 300000'),
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 218000,
              onDataPointClick: () => alert('click on 218000'),
            },
          ],
          color: DataVizPalette.color3,
          lineOptions: {
            lineBorderWidth: '4',
          },
          onLineClick: () => console.log('From_Legacy_to_O365'),
        },
        {
          legend: 'All',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297000,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284000,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282000,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294000,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 224000,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298000,
            },
          ],
          color: DataVizPalette.color4,
          lineOptions: {
            lineBorderWidth: '4',
          },
        },
        {
          legend: 'single point',
          data: [
            {
              x: new Date('2020-03-05T12:00:00.000Z'),
              y: 232000,
            },
          ],
          color: DataVizPalette.color5,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

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
        <Toggle
          label="Toggle Axis titles"
          onText="Show axis titles"
          offText="Hide axis titles"
          checked={this.state.showAxisTitles}
          onChange={this._onToggleAxisTitlesCheckChange}
          styles={{ root: { marginTop: '10px' } }}
        />
        <Checkbox
          label="Use UTC time"
          checked={this.state.useUTC}
          onChange={this._onCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={rootStyle}>
          <LineChart
            // Force rerender when any of the following states change
            key={`${this.state.showAxisTitles}`}
            culture={window.navigator.language}
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            height={this.state.height}
            width={this.state.width}
            xAxisTickCount={10}
            allowMultipleShapesForPoints={this.state.allowMultipleShapes}
            enablePerfOptimization={true}
            yAxisTitle={this.state.showAxisTitles ? 'Different categories of mail flow' : undefined}
            xAxisTitle={this.state.showAxisTitles ? 'Values of each category' : undefined}
            useUTC={this.state.useUTC}
          />
        </div>
      </>
    );
  }
}
