import * as React from 'react';
import { IChartInternalProps, ChartType, ChartHeight, ChartWidth } from './Chart.types';
import { VerticalBarChart } from '@uifabric/charting/src/VerticalBarChart';
import { LineChart } from '@uifabric/charting/src/LineChart';

export class Chart extends React.Component<IChartInternalProps, {}> {
  public render(): JSX.Element {
    switch (this.props.chartType) {
      case ChartType.VerticalBarChart: {
        return (
          <VerticalBarChart
            data={this.props.data}
            width={this._getWidth()}
            height={this._getHeight()}
            barWidth={this.props.barWidth}
            chartLabel={this.props.chartLabel}
            colors={this.props.colors}
          />
        );
      }
      case ChartType.LineChart: {
        return (
          <LineChart
            data={this.props.data}
            width={this._getWidth()}
            height={this._getHeight()}
            strokeWidth={this.props.strokeWidth}
            chartLabel={this.props.chartLabel}
            color={this.props.colors && this.props.colors.length > 0 ? this.props.colors[0] : undefined}
          />
        );
      }
    }
  }

  private _getHeight(): number {
    switch (this.props.height) {
      case ChartHeight.short: {
        return 200;
      }
      case ChartHeight.tall: {
        return 300;
      }
    }
  }

  private _getWidth(): number {
    switch (this.props.width) {
      case ChartWidth.compact: {
        return 250;
      }
      case ChartWidth.wide: {
        return 500;
      }
    }
  }
}
