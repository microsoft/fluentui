import * as React from 'react';
import { IChartProps, IScatterChartProps, ScatterChart, DataVizPalette } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IScatterChartDateState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
  showAxisTitles: boolean;
  useUTC: boolean;
}

export class ScatterChartDateExample extends React.Component<{}, IScatterChartDateState> {
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
    return <div>{this._dateExample()}</div>;
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

  private _dateExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Website Traffic and Sales Performance',
      scatterChartData: [
        {
          legend: 'Website Traffic',
          data: [
            {
              x: new Date('2023-03-01T00:00:00.000Z'),
              y: 5000, // Number of visitors
              markerSize: 15, // Number of transactions
            },
            {
              x: new Date('2023-03-02T00:00:00.000Z'),
              y: 7000,
              markerSize: 20,
            },
            {
              x: new Date('2023-03-03T00:00:00.000Z'),
              y: 6500,
              markerSize: 18,
            },
            {
              x: new Date('2023-03-04T00:00:00.000Z'),
              y: 8000,
              markerSize: 25,
            },
            {
              x: new Date('2023-03-05T00:00:00.000Z'),
              y: 9000,
              markerSize: 30,
            },
            {
              x: new Date('2023-03-06T00:00:00.000Z'),
              y: 8500,
              markerSize: 28,
            },
            {
              x: new Date('2023-03-07T00:00:00.000Z'),
              y: 9500,
              markerSize: 35,
            },
          ],
          color: DataVizPalette.color3,
        },
        {
          legend: 'Sales Performance',
          data: [
            {
              x: new Date('2023-03-01T00:00:00.000Z'),
              y: 2000, // Revenue in dollars
              markerSize: 10, // Number of transactions
            },
            {
              x: new Date('2023-03-02T00:00:00.000Z'),
              y: 3000,
              markerSize: 15,
            },
            {
              x: new Date('2023-03-03T00:00:00.000Z'),
              y: 2500,
              markerSize: 12,
            },
            {
              x: new Date('2023-03-04T00:00:00.000Z'),
              y: 4000,
              markerSize: 20,
            },
            {
              x: new Date('2023-03-05T00:00:00.000Z'),
              y: 4500,
              markerSize: 22,
            },
            {
              x: new Date('2023-03-06T00:00:00.000Z'),
              y: 4200,
              markerSize: 18,
            },
            {
              x: new Date('2023-03-07T00:00:00.000Z'),
              y: 5000,
              markerSize: 25,
            },
          ],
          color: DataVizPalette.color4,
        },
        {
          legend: 'Promotional Campaign',
          data: [
            {
              x: new Date('2023-03-05T12:00:00.000Z'),
              y: 6000, // Revenue spike due to promotion
              markerSize: 40, // Number of transactions
            },
          ],
          color: DataVizPalette.color5,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <label htmlFor="changeWidth_Date">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Date"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Date">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Date"
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
            xAxisTitle={'Date'}
            yAxisTitle={'Number of visitors'}
          />
        </div>
      </div>
    );
  }
}
