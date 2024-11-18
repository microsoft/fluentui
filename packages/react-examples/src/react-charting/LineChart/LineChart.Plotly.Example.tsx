import * as React from 'react';
import { LineChart, DataVizPalette, ILineChartProps } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { convertPlotlyToILineChartProps } from './plotly-utils';

interface ILineChartBasicState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
  showAxisTitles: boolean;
  useUTC: boolean;
}

const plotlyData = {
  data: [
    {
      type: 'scatter',
      mode: 'lines+markers',
      name: 'From_Legacy_to_O365',
      x: [
        new Date('2020-03-03T00:00:00.000Z'),
        new Date('2020-03-03T10:00:00.000Z'),
        new Date('2020-03-03T11:00:00.000Z'),
        new Date('2020-03-04T00:00:00.000Z'),
        new Date('2020-03-05T00:00:00.000Z'),
        new Date('2020-03-06T00:00:00.000Z'),
        new Date('2020-03-07T00:00:00.000Z'),
        new Date('2020-03-08T00:00:00.000Z'),
        new Date('2020-03-09T00:00:00.000Z'),
      ],
      y: [216000, 218123, 217124, 248000, 252000, 274000, 260000, 304000, 218000],
      line: {
        color: DataVizPalette.color3,
        width: 4,
        dash: 'solid',
      },
      marker: {
        opacity: 1,
      },
      connectgaps: false,
    },
    {
      type: 'scatter',
      mode: 'lines+markers',
      name: 'All',
      x: [
        new Date('2020-03-03T00:00:00.000Z'),
        new Date('2020-03-04T00:00:00.000Z'),
        new Date('2020-03-05T00:00:00.000Z'),
        new Date('2020-03-06T00:00:00.000Z'),
        new Date('2020-03-07T00:00:00.000Z'),
        new Date('2020-03-08T00:00:00.000Z'),
        new Date('2020-03-09T00:00:00.000Z'),
      ],
      y: [297000, 284000, 282000, 294000, 224000, 300000, 298000],
      line: {
        color: DataVizPalette.color4,
        width: 4,
        dash: 'solid',
      },
      marker: {
        opacity: 1,
      },
      connectgaps: false,
    },
    {
      type: 'scatter',
      mode: 'lines+markers',
      name: 'single point',
      x: ['2020-03-05T12:00:00.000Z'],
      y: [232000],
      line: {
        color: DataVizPalette.color5,
        width: 4,
        dash: 'solid',
      },
      marker: {
        opacity: 1,
      },
      connectgaps: false,
    },
  ],
  layout: {
    title: 'Line Chart',
    xaxis: {
      title: 'Values of each category',
    },
    yaxis: {
      title: 'Different categories of mail flow',
    },
  },
};

export class LineChartPlotlyExample extends React.Component<{}, ILineChartBasicState> {
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
    const data: ILineChartProps = convertPlotlyToILineChartProps(plotlyData);

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
            data={data.data}
            styles={data.styles}
          />
        </div>
      </>
    );
  }
}
