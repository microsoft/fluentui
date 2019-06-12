import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

import { IVerticalBarChartProps, IVerticalBarChartStyleProps, IVerticalBarChartStyles, IDataPoint } from './VerticalBarChart.types';

const getClassNames = classNamesFunction<IVerticalBarChartStyleProps, IVerticalBarChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

export class VerticalBarChartBase extends React.Component<IVerticalBarChartProps, {}> {
  private _points: IDataPoint[];
  private _width: number;
  private _height: number;
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalBarChartStyles>;

  public render(): JSX.Element {
    this._adjustProps();

    const isNumeric = this._points.length > 0 && typeof this._points[0].x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis() : this._createStringXAxis();
    const yAxis = this._createYAxis();
    const bars = isNumeric ? this._createNumericBars() : this._createStringBars();

    return (
      <div className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <svg className={this._classNames.chart}>
          <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} className={this._classNames.xAxis} />
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
    this._barWidth = this.props.barWidth || 15;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;

    const { theme, className, styles } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className
    });
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

  private _setYAxis(node: SVGElement | null, yAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(yAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.yAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.yAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.yAxisText!);
  }

  private _createNumericXAxis(): numericAxis {
    const xMax = d3Max(this._points, (point: IDataPoint) => point.x as number)!;
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width]);
    const xAxis = d3AxisBottom(xAxisScale).ticks(10);
    return xAxis;
  }

  private _createStringXAxis(): stringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(this._points.map((point: IDataPoint) => point.x as string))
      .range([0, this._width]);
    const xAxis = d3AxisBottom(xAxisScale).tickFormat((x: string, index: number) => this._points[index].x as string);
    return xAxis;
  }

  private _createYAxis(): numericAxis {
    const yMax = d3Max(this._points, (point: IDataPoint) => point.y)!;
    const yAxisScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([this._height, 10]);
    const yAxis = d3AxisLeft(yAxisScale).ticks(this._yAxisTickCount);
    return yAxis;
  }

  private _createNumericBars(): JSX.Element[] {
    const xMax = d3Max(this._points, (point: IDataPoint) => point.x as number)!;
    const yMax = d3Max(this._points, (point: IDataPoint) => point.y)!;

    const xBarScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height - 10]);

    const colorScale = this._createColors(yMax);

    const bars = this._points.map((point: IDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={xBarScale(point.x as number)}
          y={this._height - yBarScale(point.y)}
          width={this._barWidth}
          height={yBarScale(point.y)}
          fill={colorScale(point.y)}
        />
      );
    });

    return bars;
  }

  private _createStringBars(): JSX.Element[] {
    const yMax = d3Max(this._points, (point: IDataPoint) => point.y)!;

    const endpointDistance = 0.5 * (this._width / this._points.length);
    const xBarScale = d3ScaleLinear()
      .domain([0, this._points.length - 1])
      .range([endpointDistance - 0.5 * this._barWidth, this._width - endpointDistance - 0.5 * this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    const colorScale = this._createColors(yMax);

    const bars = this._points.map((point: IDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={xBarScale(index)}
          y={this._height - yBarScale(point.y)}
          width={this._barWidth}
          height={yBarScale(point.y)}
          fill={colorScale(point.y)}
        />
      );
    });

    return bars;
  }

  private _createColors(yMax: number): D3ScaleLinear<string, string> {
    const increment = this._colors.length <= 1 ? 1 : 1 / (this._colors.length - 1);
    const domainValues = [];
    for (let i = 0; i < this._colors.length; i++) {
      domainValues.push(increment * i * yMax);
    }
    const colorScale = d3ScaleLinear<string>()
      .domain(domainValues)
      .range(this._colors);
    return colorScale;
  }
}
