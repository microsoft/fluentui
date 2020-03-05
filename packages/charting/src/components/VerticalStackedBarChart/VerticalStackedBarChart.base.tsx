import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IChartProps, IChartDataPoint, IDataPoint } from '@uifabric/charting';

import {
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles
} from './VerticalStackedBarChart.types';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

export class VerticalStackedBarChartBase extends React.Component<IVerticalStackedBarChartProps, {}> {
  private _points: IChartProps[];
  private _width: number;
  private _height: number;
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalStackedBarChartStyles>;

  public render(): JSX.Element {
    this._adjustProps();

    const dataset: IDataPoint[] = this._createDataSetLayer();

    const isNumeric: boolean = dataset.length > 0 && typeof dataset[0].x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis(dataset) : this._createStringXAxis(dataset);
    // const xAxis = this._createDateXAxis();
    const yAxis = this._createYAxis(dataset);
    const bars: JSX.Element[] = [];
    this._points.map((singleChartData: IChartProps, index: number) => {
      const singleChartBar = isNumeric
        ? this._createBars(singleChartData, dataset)
        : this._createStringBars(singleChartData, dataset, index);
      bars.push(singleChartBar);
    });
    return (
      <div className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <svg className={this._classNames.chart}>
          {/** transform: (0, height-margin.bottom) X-axis*/}
          <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} className={this._classNames.xAxis} />
          {/**transform:  (margin.left, 0) Y-Axis*/}
          <g ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)} className={this._classNames.yAxis} />
          <g className={this._classNames.bars}>{bars}</g>
        </svg>
      </div>
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];

    this._width = this.props.width || 600;
    this._height = this.props.height || 350;
    this._barWidth = this.props.barWidth || 32;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;

    const { theme, className, styles } = this.props;
    const { palette } = theme!;
    // need to change based on length
    this._colors = this.props.colors || [palette.accent, palette.blueMid, palette.blueLight, palette.red, palette.black];

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className
    });
  }

  private _createDataSetLayer(): IDataPoint[] {
    const dataset: IDataPoint[] = [];

    this._points!.map((singlePointData: IChartProps) => {
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IChartDataPoint) => {
        total = total + point.data!;
      });
      const singleChartData: IDataPoint = {
        y: total,
        x: singlePointData.xAxisPoint!
      };
      dataset.push(singleChartData);
    });
    return dataset;
  }

  private _createNumericXAxis(dataset: IDataPoint[]): numericAxis {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    // need to calculate min and draw axis from min to max
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width]); // (margins.left, _width - margins.right)
    const xAxis = d3AxisBottom(xAxisScale)
      .ticks(10)
      .tickSize(10)
      .tickSizeOuter(0)
      .tickPadding(10);
    return xAxis;
  }

  private _createStringXAxis(dataset: IDataPoint[]): stringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(dataset.map((point: IDataPoint) => point.x as string))
      .range([0, this._width])
      .padding(0.1);
    const xAxis = d3AxisBottom(xAxisScale)
      .tickFormat((x: string, index: number) => dataset[index].x as string)
      .tickPadding(10);
    return xAxis;
  }

  private _createYAxis(dataset: IDataPoint[]): numericAxis {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;
    const yAxisScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([this._height, 0]); // (_height-margin.bottom, margin.top)
    const yAxis = d3AxisLeft(yAxisScale)
      .ticks(this._yAxisTickCount)
      .tickSizeInner(-this._width)
      .tickPadding(10);
    return yAxis;
  }

  private _createBars(singleChartData: IChartProps, dataset: IDataPoint[]): JSX.Element[] {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const xBarScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    let startingPointOfY: number = 0;
    const bar = singleChartData.chartData!.map((point: IChartDataPoint, index: number) => {
      startingPointOfY = startingPointOfY + point.data!;
      const color = point.color!;
      return (
        <rect
          key={index} // check key valeu again
          x={xBarScale(singleChartData.xAxisPoint as number)}
          y={this._height - yBarScale(startingPointOfY)} // startingPoint[index]
          width={this._barWidth}
          height={yBarScale(point.data!)}
          fill={color}
        />
      );
    });
    return bar;
  }

  private _createStringBars(singleChartData: IChartProps, dataset: IDataPoint[], indexNumber: number): JSX.Element[] {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const endpointDistance = 0.5 * (this._width / dataset.length);
    const xBarScale = d3ScaleLinear()
      .domain([0, dataset.length - 1])
      .range([endpointDistance - 0.5 * this._barWidth, this._width - endpointDistance - 0.5 * this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    let startingPointOfY = 0;
    const bar = singleChartData.chartData!.map((point: IChartDataPoint, index: number) => {
      const gap = index >= 1 ? 1 : 0;
      startingPointOfY = startingPointOfY + point.data! + gap;
      const color = point.color ? point.color : this._colors[index];
      return (
        <rect
          key={index} // change key value
          x={xBarScale(indexNumber)}
          y={this._height - yBarScale(startingPointOfY)}
          width={this._barWidth}
          height={yBarScale(point.data!)}
          fill={color}
        />
      );
    });
    return bar;
  }

  private _setXAxis(node: SVGGElement | null, xAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(xAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.xAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.xAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.xAxisText!);
  }

  private _setYAxis(node: SVGElement | null, yAxis: numericAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(yAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.yAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.yAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.yAxisText!);
  }

  private _createDateXAxis = () => {
    const xAxisData: Date[] = [];
    let sDate = new Date();
  };
}
