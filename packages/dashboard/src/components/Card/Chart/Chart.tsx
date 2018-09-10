import * as React from 'react';
import { IChartInternalProps, ChartType, ChartHeight, ChartWidth } from './Chart.types';
import {
  DonutChart,
  HorizontalBarChart,
  IDataPoint,
  ILegendDataItem,
  LineChart,
  MultiStackedBarChart,
  StackedBarChart,
  VerticalBarChart
} from '@uifabric/charting';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class Chart extends React.Component<IChartInternalProps, { _width: number; _height: number }> {
  public static defaultProps = {
    compactChartWidth: 250
  };

  private _chartLabel: string | undefined;
  private _isMultiBarChart = false;
  private _colors: string[] | undefined;
  private _singleChartDataPoints: IDataPoint[] | undefined;
  private _rootElem: HTMLElement | null;

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
    this.state = {
      _width: this._getWidth(),
      _height: this._getHeight()
    };
    this._getLineChart = this._getLineChart.bind(this);
  }

  public componentDidMount(): void {
    if (this._rootElem) {
      this.setState({
        _width: this._rootElem!.offsetWidth,
        _height: this._rootElem!.offsetHeight
      });
    }
  }

  public render(): JSX.Element {
    const rootStyle = {
      width: '100%',
      height: '100%'
    };
    return (
      <div ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)} className={mergeStyles(rootStyle)}>
        {this._getChartByType(this.props.chartType)}
      </div>
    );
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
        return this._getLineChart();
      }
      case ChartType.HorizontalBarChart: {
        return <HorizontalBarChart data={this.props.chartData!} barHeight={this.props.barHeight} />;
      }
      case ChartType.DonutChart: {
        return <DonutChart data={this.props.chartData![0]} innerRadius={40} />;
      }
      case ChartType.PieChart: {
        return <DonutChart data={this.props.chartData![0]} innerRadius={0} />;
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
    if (this.props.chartData!.length > 1) {
      return (
        <MultiStackedBarChart
          data={this.props.chartData!}
          barHeight={this.props.barHeight}
          hideRatio={this.props.hideRatio}
        />
      );
    }

    return <StackedBarChart data={this.props.chartData![0]} barHeight={this.props.barHeight} />;
  };

  private _getLineChart = (): JSX.Element => {
    return (
      <div className={mergeStyles({ width: this.state._width, height: this.state._height })}>
        <LineChart
          data={this.props.chartData![0]}
          strokeWidth={this.props.strokeWidth}
          width={this._getWidth()}
          height={this._getHeight()}
        />
      </div>
    );
  };
}
