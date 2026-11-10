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
      start: new Date('2017-01-01'),
      end: new Date('2017-02-02'),
    },
    y: 'Job-1',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: getGradientFromToken(DataVizGradientPalette.success),
  },
  {
    x: {
      start: new Date('2017-01-17'),
      end: new Date('2017-02-17'),
    },
    y: 'Job-2',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: getGradientFromToken(DataVizGradientPalette.success),
  },
  {
    x: {
      start: new Date('2017-01-14'),
      end: new Date('2017-03-14'),
    },
    y: 'Job-4',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: getGradientFromToken(DataVizGradientPalette.success),
  },
  {
    x: {
      start: new Date('2017-02-15'),
      end: new Date('2017-03-15'),
    },
    y: 'Job-1',
    legend: 'Incomplete',
    color: DataVizPalette.warning,
    gradient: getGradientFromToken(DataVizGradientPalette.warning),
  },
  {
    x: {
      start: new Date('2017-01-17'),
      end: new Date('2017-02-17'),
    },
    y: 'Job-2',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: getGradientFromToken(DataVizGradientPalette.error),
  },
  {
    x: {
      start: new Date('2017-03-10'),
      end: new Date('2017-03-20'),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: getGradientFromToken(DataVizGradientPalette.error),
  },
  {
    x: {
      start: new Date('2017-04-01'),
      end: new Date('2017-04-20'),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: getGradientFromToken(DataVizGradientPalette.error),
  },
  {
    x: {
      start: new Date('2017-05-18'),
      end: new Date(new Date('2017-06-18')),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: getGradientFromToken(DataVizGradientPalette.error),
  },
];

interface IGCGroupedExampleState {
  width: number;
  height: number;
  enableGradient: boolean;
  roundedCorners: boolean;
  legendMultiSelect: boolean;
}

export class GanttChartGroupedExample extends React.Component<{}, IGCGroupedExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      width: 600,
      height: 350,
      enableGradient: false,
      roundedCorners: false,
      legendMultiSelect: false,
    };
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
          <StackItem>
            <Toggle
              label="Select Multiple Legends"
              onText="ON"
              offText="OFF"
              checked={this.state.legendMultiSelect}
              onChange={this._onToggleLegendMultiSelect}
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
            legendProps={{
              canSelectMultipleLegends: this.state.legendMultiSelect,
            }}
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

  private _onToggleLegendMultiSelect = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ legendMultiSelect: checked });
  };
}
