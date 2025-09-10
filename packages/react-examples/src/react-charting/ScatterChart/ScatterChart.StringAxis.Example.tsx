import * as React from 'react';
import { IChartProps, IScatterChartProps, ScatterChart, DataVizPalette } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IScatterChartStringState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
  showAxisTitles: boolean;
  useUTC: boolean;
}

export class ScatterChartStringExample extends React.Component<{}, IScatterChartStringState> {
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
    return <div>{this._stringExample()}</div>;
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

  private _stringExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Sales Performance by Category',
      scatterChartData: [
        {
          legend: 'Region 1',
          data: [
            {
              x: 'Electronics',
              y: 50000, // Revenue in dollars
              markerSize: 25, // Units sold
            },
            {
              x: 'Furniture',
              y: 30000,
              markerSize: 20,
            },
            {
              x: 'Clothing',
              y: 20000,
              markerSize: 15,
            },
            {
              x: 'Toys',
              y: 15000,
              markerSize: 10,
            },
            {
              x: 'Books',
              y: 10000,
              markerSize: 8,
            },
          ],
          color: DataVizPalette.color3,
        },
        {
          legend: 'Region 2',
          data: [
            {
              x: 'Electronics',
              y: 60000,
              markerSize: 30,
            },
            {
              x: 'Furniture',
              y: 25000,
              markerSize: 18,
            },
            {
              x: 'Clothing',
              y: 22000,
              markerSize: 16,
            },
            {
              x: 'Toys',
              y: 12000,
              markerSize: 12,
            },
            {
              x: 'Books',
              y: 8000,
              markerSize: 6,
            },
          ],
          color: DataVizPalette.color4,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <label htmlFor="changeWidth_String">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_String"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_String">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_String"
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
            height={this.state.height}
            width={this.state.width}
            xAxisTitle={'Product Category'}
            yAxisTitle={'Revenue in dollars'}
          />
        </div>
      </div>
    );
  }
}
