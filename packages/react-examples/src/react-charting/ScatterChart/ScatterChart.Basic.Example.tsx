import * as React from 'react';
import { IChartProps, IScatterChartProps, ScatterChart, DataVizPalette } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IScatterChartBasicState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
  showAxisTitles: boolean;
  useUTC: boolean;
}

export class ScatterChartBasicExample extends React.Component<{}, IScatterChartBasicState> {
  constructor(props: IScatterChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      allowMultipleShapes: false,
      showAxisTitles: true,
      useUTC: true,
    };
  }

  public componentDidMount(): void {
    const style = document.createElement('style');
    const focusStylingCSS = `
    .containerDiv [contentEditable=true]:focus,
    .containerDiv [tabindex]:focus,
    .containerDiv area[href]:focus,
    .containerDiv button:focus,
    .containerDiv iframe:focus,
    .containerDiv input:focus,
    .containerDiv select:focus,
    .containerDiv textarea:focus {
      outScatter: -webkit-focus-ring-color auto 5px;
    }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
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
      chartTitle: 'Project Revenue and Transactions Over Time',
      scatterChartData: [
        {
          legend: 'Phase 1',
          data: [
            {
              x: 10,
              y: 50000,
              markerSize: 12, // Number of transactions
            },
            {
              x: 20,
              y: 75000,
              markerSize: 15,
            },
            {
              x: 30,
              y: 90000,
              markerSize: 18,
            },
            {
              x: 40,
              y: 120000,
              markerSize: 22,
            },
            {
              x: 50,
              y: 150000,
              markerSize: 25,
            },
          ],
          color: DataVizPalette.color3,
        },
        {
          legend: 'Phase 2',
          data: [
            {
              x: 60,
              y: 180000,
              markerSize: 28,
            },
            {
              x: 70,
              y: 200000,
              markerSize: 30,
            },
            {
              x: 80,
              y: 220000,
              markerSize: 32,
            },
            {
              x: 90,
              y: 250000,
              markerSize: 35,
            },
            {
              x: 100,
              y: 300000,
              markerSize: 40,
            },
          ],
          color: DataVizPalette.color4,
        },
        {
          legend: 'Milestone',
          data: [
            {
              x: 75,
              y: 250000,
              markerSize: 50, // Large number of transactions
            },
          ],
          color: DataVizPalette.color5,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
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
          label="Enabled  multiple shapes for each Scatter"
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
          <ScatterChart
            culture={window.navigator.language}
            data={data}
            // height={height}
            // width={width}
            xAxisTitle={'Days since project start'}
            yAxisTitle={'Revenue in dollars'}
            // legendProps={{
            //   canSelectMultipleLegends: selectMultipleLegends,
            // }}
          />
        </div>
      </div>
    );
  }
}
