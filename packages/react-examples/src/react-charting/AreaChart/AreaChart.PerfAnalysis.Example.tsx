import * as React from 'react';
import { Stack, IStackTokens, SpinButton, ISpinButtonStyles, PrimaryButton, DefaultButton } from '@fluentui/react';
import { AreaChart, ILineChartDataPoint, ILineChartPoints } from '@fluentui/react-charting';
import { scaleSequential as d3ScaleSequential, ScaleSequential } from 'd3-scale';
import { interpolateTurbo as d3interpolateTurbo } from 'd3-scale-chromatic';

const stackTokens: IStackTokens = { childrenGap: 10 };
const spinButtonStyles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 100 } };

interface IACPerfAnalysisExampleState {
  numCharts: string;
  numSeries: string;
  numPoints: string;
  dimensions: number[];
}

export class AreaChartPerfAnalysisExample extends React.Component<{}, IACPerfAnalysisExampleState> {
  private _colorScale: ScaleSequential<string, never>;

  constructor(props = {}) {
    super(props);

    this.state = {
      numCharts: '0',
      numSeries: '0',
      numPoints: '0',
      dimensions: [0, 0, 0],
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <Stack tokens={stackTokens}>
          <SpinButton
            label="Number of charts"
            min={0}
            value={this.state.numCharts}
            onChange={this._onNumChartsChange}
            styles={spinButtonStyles}
          />
          <SpinButton
            label="Number of series"
            min={0}
            value={this.state.numSeries}
            onChange={this._onNumSeriesChange}
            styles={spinButtonStyles}
          />
          <SpinButton
            label="Number of points"
            min={0}
            value={this.state.numPoints}
            onChange={this._onNumPointsChange}
            styles={spinButtonStyles}
          />
          <Stack horizontal tokens={stackTokens}>
            <PrimaryButton text="Render charts" onClick={this._onRenderClick} />
            <DefaultButton text="Clear" onClick={this._onClearClick} />
          </Stack>
        </Stack>
        {this._renderCharts()}
      </>
    );
  }

  private _onNumChartsChange = (e: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    this.setState({ numCharts: newValue || '0' });
  };
  private _onNumSeriesChange = (e: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    this.setState({ numSeries: newValue || '0' });
  };
  private _onNumPointsChange = (e: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
    this.setState({ numPoints: newValue || '0' });
  };
  private _onRenderClick = () => {
    this._colorScale = d3ScaleSequential()
      .domain([0, Number(this.state.numSeries) - 1])
      .interpolator(d3interpolateTurbo);
    this.setState({
      dimensions: [Number(this.state.numCharts), Number(this.state.numSeries), Number(this.state.numPoints)],
    });
  };
  private _onClearClick = () => {
    this.setState({ dimensions: [0, 0, 0] });
  };

  private _renderCharts = (): JSX.Element[] => {
    const [numCharts, numSeries, numPoints] = this.state.dimensions;

    const charts: JSX.Element[] = [];
    for (let i = 0; i < numCharts; i++) {
      const series: ILineChartPoints[] = [];
      for (let j = 0; j < numSeries; j++) {
        const points: ILineChartDataPoint[] = [];
        for (let k = 0; k < numPoints; k++) {
          points.push({
            x: k,
            y: Math.random() * 1000 + j,
          });
        }

        series.push({
          legend: j.toString(),
          data: points,
          color: this._colorScale(j),
        });
      }

      charts.push(
        <AreaChart
          key={i}
          data={{
            lineChartData: series,
          }}
          calloutProps={{ hidden: true }}
        />,
      );
    }

    return charts;
  };
}
