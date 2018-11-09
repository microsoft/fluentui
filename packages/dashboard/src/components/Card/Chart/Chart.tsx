import * as React from 'react';
import { IChartInternalProps, IChartProps, IChartStyles, ChartType, ChartHeight, ChartWidth } from './Chart.types';
import {
  DonutChart,
  HorizontalBarChart,
  IDataPoint,
  ILegendDataItem,
  ILineChartPoints,
  LineChart,
  MultiStackedBarChart,
  StackedBarChart,
  VerticalBarChart,
  ILineChartDataPoint
} from '@uifabric/charting';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Chart.styles';

export class Chart extends React.Component<IChartInternalProps, { _width: number; _height: number }> {
  public static defaultProps = {
    compactChartWidth: 250
  };

  private _chartLabel: string | undefined;
  private _isMultiBarChart = false;
  private _colors: string[] | undefined;
  private _singleChartDataPoints: IDataPoint[] | undefined;
  private _rootElem: HTMLElement | null;

  private getClassNames = classNamesFunction<IChartProps, IChartStyles>();
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
    return this._getChartByType(this.props.chartType);
  }

  private _getChartByType = (chartType: ChartType): JSX.Element => {
    const classNames = this.getClassNames(getStyles);
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
        return (
          <div className={classNames.donutWrapper}>
            <div className={mergeStyles({ width: 300, height: 250 })}>
              <DonutChart data={this.props.chartData![0]} innerRadius={88} />
            </div>
          </div>
        );
      }
      case ChartType.PieChart: {
        return (
          <div className={classNames.donutWrapper}>
            <div className={mergeStyles({ width: 300, height: 250 })}>
              <DonutChart data={this.props.chartData![0]} innerRadius={0} />
            </div>
          </div>
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
    if (this.props.chartData!.length > 1) {
      return (
        <MultiStackedBarChart
          data={this.props.chartData!}
          barHeight={this.props.barHeight}
          hideRatio={this.props.hideRatio}
          hideDenominator={this.props.hideDenominator}
        />
      );
    }

    return (
      <StackedBarChart
        hideDenominator={this.props.hideDenominator ? this.props.hideDenominator[0] : false}
        data={this.props.chartData![0]}
        barHeight={this.props.barHeight}
        ignoreFixStyle={this.props.ignoreStackBarChartDefaultStyle}
      />
    );
  };

  private _getLineChart = (): JSX.Element => {
    const { chartData, timeRange } = this.props;
    let dateDataType = false;
    const classNames = this.getClassNames(getStyles);
    if (chartData && chartData[0] && chartData[0].lineChartData) {
      chartData[0].lineChartData!.forEach((lineData: ILineChartPoints) => {
        if (lineData.data.length > 0) {
          dateDataType = lineData.data[0].x instanceof Date;
          return;
        }
      });
    }
    if (dateDataType) {
      let sDate = new Date();
      // selecting least possible date. Using this to compute the farthest date among the data passed to render on x-axis
      let lDate = new Date(-8640000000000000);
      chartData![0].lineChartData!.map((singleChartData: ILineChartPoints) => {
        singleChartData.data.map((dataPoint: ILineChartDataPoint) => {
          if (dataPoint.x < sDate) {
            sDate = dataPoint.x as Date;
          }
          if (dataPoint.x > lDate) {
            lDate = dataPoint.x as Date;
          }
        });
      });
      const tickValues: Date[] = [sDate];
      // comparing prop with string union type 7Days | 30Days | 90Days | 180Days
      if (timeRange === '7Days') {
        for (let i = 0; i < 6; i++) {
          const nextDate = new Date(sDate);
          nextDate.setDate(sDate.getDate() + 1);
          sDate = nextDate;
          tickValues.push(nextDate);
        }
      } else if (timeRange === '30Days') {
        for (let i = 0; i < 5; i++) {
          const nextDate = new Date(sDate);
          nextDate.setDate(sDate.getDate() + 5);
          sDate = nextDate;
          tickValues.push(nextDate);
        }
      } else if (timeRange === '90Days') {
        for (let i = 0; i < 5; i++) {
          const nextDate = new Date(sDate);
          nextDate.setDate(sDate.getDate() + 15);
          sDate = nextDate;
          tickValues.push(nextDate);
        }
      } else {
        for (let i = 0; i < 5; i++) {
          const nextDate = new Date(sDate);
          nextDate.setMonth(sDate.getMonth() + 1);
          sDate = nextDate;
          tickValues.push(nextDate);
        }
      }
      const parentElement = this._rootElem ? this._rootElem.parentElement : null;
      return (
        <div
          ref={(e: HTMLElement | null) => {
            this._rootElem = e;
          }}
          className={classNames.chartWrapper}
        >
          <LineChart
            parentRef={parentElement}
            data={this.props.chartData![0]}
            strokeWidth={this.props.strokeWidth}
            tickValues={tickValues}
            tickFormat={'%m/%d'}
          />
        </div>
      );
    } else {
      const parentElement = this._rootElem ? this._rootElem.parentElement : null;
      return (
        <div
          ref={(e: HTMLElement | null) => {
            this._rootElem = e;
          }}
          className={classNames.chartWrapper}
        >
          <LineChart parentRef={parentElement} data={this.props.chartData![0]} strokeWidth={this.props.strokeWidth} />
        </div>
      );
    }
  };
}
