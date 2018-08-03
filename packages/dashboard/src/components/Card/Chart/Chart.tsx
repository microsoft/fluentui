import * as React from 'react';
import { IChartInternalProps, ChartType, ChartHeight, ChartWidth } from './Chart.types';
import { HorizontalBarChart } from '@uifabric/charting/lib/HorizontalBarChart';
import { LineChart } from '@uifabric/charting/lib/LineChart';
import { VerticalBarChart } from '@uifabric/charting/lib/VerticalBarChart';
import { DonutChart } from '@uifabric/charting/lib/DonutChart';
import { PieChart } from '@uifabric/charting/lib/PieChart';
import { StackedBarChart } from '@uifabric/charting/lib/StackedBarChart';

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
      case ChartType.HorizontalBarChart: {
        return (
          <HorizontalBarChart
            data={this.props.data}
            width={this._getWidth()}
            height={this._getHeight()}
            barHeight={this.props.barHeight}
            chartLabel={this.props.chartLabel}
            colors={this.props.colors}
          />
        );
      }
      case ChartType.DonutChart: {
        return <DonutChart data={this.props.data} colors={this.props.colors} />;
      }
      case ChartType.PieChart: {
        return <PieChart data={this.props.data} chartTitle={this.props.chartLabel} colors={this.props.colors} />;
      }
      case ChartType.StackedBarChart: {
        return <StackedBarChart data={this.props.data} chartTitle={this.props.chartLabel} colors={this.props.colors} />;
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
