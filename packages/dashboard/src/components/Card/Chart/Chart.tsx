import * as React from 'react';
import { IChartInternalProps, ChartType, ChartHeight, ChartWidth } from './Chart.types';
import { HorizontalBarChart } from '@uifabric/charting/lib/HorizontalBarChart';
import { LineChart } from '@uifabric/charting/lib/LineChart';
import { VerticalBarChart } from '@uifabric/charting/lib/VerticalBarChart';
import { DonutChart } from '@uifabric/charting/lib/DonutChart';
import { PieChart } from '@uifabric/charting/lib/PieChart';
import {
  StackedBarChart,
  IDataPoint,
  ILegendDataItem,
  MultiStackedBarChart
} from '@uifabric/charting/lib/StackedBarChart';

export class Chart extends React.Component<IChartInternalProps, {}> {
  public static defaultProps = {
    compactChartWidth: 250
  };

  private _chartLabel: string | undefined;
  private _isMultiBarChart = false;
  private _colors: string[] | undefined;
  private _singleChartDataPoints: IDataPoint[] | undefined;

  public constructor(props: IChartInternalProps) {
    super(props);

    if (props.chartLabels && props.chartLabels.length === 1) {
      this._chartLabel = props.chartLabels[0];
    }

    if (props.data) {
      this._isMultiBarChart = props.data.length > 1;
    }

    this._singleChartDataPoints = props.dataPoints;

    if (this._isMultiBarChart === false && props.data && props.data.length > 0) {
      this._singleChartDataPoints = props.data[0];
    }

    if (props.legendColors && props.legendColors.length > 0) {
      this._colors = props.legendColors.map((item: ILegendDataItem) => item.legendColor);
    }
  }

  public render(): JSX.Element {
    return this._getChartByType(this.props.chartType);
  }

  private _getChartByType = (chartType: ChartType): JSX.Element => {
    switch (chartType) {
      case ChartType.VerticalBarChart: {
        return (
          <VerticalBarChart
            data={this._singleChartDataPoints}
            width={this._getWidth()}
            height={this._getHeight()}
            barWidth={this.props.barWidth}
            chartLabel={this._chartLabel}
            colors={this._colors}
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
            chartLabel={this._chartLabel}
            colors={this._colors}
          />
        );
      }
      case ChartType.HorizontalBarChart: {
        return (
          <HorizontalBarChart
            data={this._singleChartDataPoints}
            width={this._getWidth()}
            height={this._getHeight()}
            barHeight={this.props.barHeight}
            chartLabel={this._chartLabel}
            colors={this._colors}
          />
        );
      }
      case ChartType.DonutChart: {
        return (
          <DonutChart
            data={this._singleChartDataPoints}
            colors={this._colors}
            width={this._getWidth()}
            height={this._getHeight()}
          />
        );
      }
      case ChartType.PieChart: {
        return (
          <PieChart
            data={this._singleChartDataPoints}
            chartTitle={this._chartLabel}
            colors={this._colors}
            width={this._getWidth()}
            height={this._getHeight()}
          />
        );
      }
      case ChartType.StackedBarChart: {
        return this._getStackedBarChart();
      }
    }
  };

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
        return this.props.compactChartWidth!;
      }
      case ChartWidth.wide: {
        return 500;
      }
    }
  }

  private _getStackedBarChart = (): JSX.Element => {
    if (this._isMultiBarChart === true) {
      return (
        <MultiStackedBarChart
          data={this.props.data!}
          chartTitles={this.props.chartLabels!}
          barHeight={this.props.barHeight}
          legendData={this.props.legendColors}
          width={this._getWidth()}
        />
      );
    }

    return (
      <StackedBarChart
        data={this._singleChartDataPoints}
        chartTitle={this._chartLabel}
        colors={this._colors}
        width={this._getWidth()}
        barHeight={this.props.barHeight}
      />
    );
  };
}
