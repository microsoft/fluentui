import * as React from 'react';
import {
  DataVizPalette,
  GanttChart,
  getGradientFromToken,
  DataVizGradientPalette,
  IGanttChartDataPoint,
} from '@fluentui/react-charting';
import { Stack, StackItem } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

const data: IGanttChartDataPoint[] = [
  {
    x: {
      start: new Date('2009-01-01'),
      end: new Date('2009-02-28'),
    },
    y: 'Job A',
    legend: 'Alex',
    color: DataVizPalette.color1,
    gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
  },
  {
    x: {
      start: new Date('2009-03-05'),
      end: new Date('2009-04-15'),
    },
    y: 'Job B',
    legend: 'Alex',
    color: DataVizPalette.color1,
    gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
  },
  {
    x: {
      start: new Date('2009-02-20'),
      end: new Date('2009-05-30'),
    },
    y: 'Job C',
    legend: 'Max',
    color: DataVizPalette.color2,
    gradient: getGradientFromToken(DataVizGradientPalette.gradient7),
  },
];

interface IGCBasicExampleState {
  width: number;
  height: number;
  enableGradient: boolean;
  roundedCorners: boolean;
}

export class GanttChartBasicExample extends React.Component<{}, IGCBasicExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      width: 600,
      height: 350,
      enableGradient: false,
      roundedCorners: false,
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
      outline: -webkit-focus-ring-color auto 5px;
    }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
  }

  public render(): React.ReactNode {
    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <StackItem>
            <label htmlFor="width-slider">Width:</label>
            <input
              type="range"
              value={this.state.width}
              min={0}
              max={1000}
              id="width-slider"
              onChange={this._onWidthChange}
              aria-valuetext={`Width: ${this.state.width}`}
            />
            <span>{this.state.width}</span>
          </StackItem>
          <StackItem>
            <label htmlFor="height-slider">Height:</label>
            <input
              type="range"
              value={this.state.height}
              min={0}
              max={1000}
              id="height-slider"
              onChange={this._onHeightChange}
              aria-valuetext={`Height: ${this.state.height}`}
            />
            <span>{this.state.height}</span>
          </StackItem>
        </Stack>
        <Stack horizontal wrap tokens={{ childrenGap: 20 }} style={{ marginTop: 10 }}>
          <StackItem>
            <Toggle
              label="Enable Gradient"
              onText="ON"
              offText="OFF"
              checked={this.state.enableGradient}
              onChange={this._onToggleGradient}
              inlineLabel
            />
          </StackItem>
          <StackItem>
            <Toggle
              label="Rounded Corners"
              onText="ON"
              offText="OFF"
              checked={this.state.roundedCorners}
              onChange={this._onToggleRoundedCorners}
              inlineLabel
            />
          </StackItem>
        </Stack>

        <div style={{ width: this.state.width, height: this.state.height, marginTop: 10 }}>
          <GanttChart
            data={data}
            showYAxisLables
            width={this.state.width}
            height={this.state.height}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundedCorners}
          />
        </div>
      </div>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };

  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundedCorners: checked });
  };
}
