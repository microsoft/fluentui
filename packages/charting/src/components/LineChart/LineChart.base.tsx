import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles, IDataPoint } from './LineChart.types';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

export class LineChartBase extends React.Component<ILineChartProps, {}> {
  private _points: IDataPoint[];
  private _width: number;
  private _height: number;
  private _lineWidth: number;
  private _strokeWidth: number;
  private _yAxisTickCount: number;
  private _color: string;
  private _classNames: IProcessedStyleSet<ILineChartStyles>;

  constructor(props: ILineChartProps) {
    super(props);

    this._points = this.props.data || [];

    this._width = this.props.width || 600;
    this._height = this.props.height || 350;
    this._lineWidth = 15;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;
    this._strokeWidth = this.props.strokeWidth || 2;

    const { theme } = this.props;
    const { palette } = theme!;
    this._color = this.props.color || palette.blue;
  }

  public render(): JSX.Element {
    const isNumeric = typeof this._points[0].x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis() : this._createStringXAxis();
    const yAxis = this._createYAxis();
    const lines = isNumeric ? this._createNumericLines() : this._createStringLines();

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className
    });

    return (
      <div className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <svg className={this._classNames.chart}>
          <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} className={this._classNames.xAxis} />
          <g ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)} className={this._classNames.yAxis} />
          <g className={this._classNames.lines}>{lines}</g>
        </svg>
      </div>
    );
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
      .range([this._height, 0]);
    const yAxis = d3AxisLeft(yAxisScale).ticks(this._yAxisTickCount);
    return yAxis;
  }

  private _createNumericLines(): JSX.Element[] {
    const xMax = d3Max(this._points, (point: IDataPoint) => point.x as number)!;
    const yMax = d3Max(this._points, (point: IDataPoint) => point.y)!;

    const xLineScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._lineWidth]);
    const yLineScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    const lines = [];
    for (let i = 1; i < this._points.length; i++) {
      lines.push(
        <line
          x1={xLineScale(this._points[i - 1].x as number)}
          y1={this._height - yLineScale(this._points[i - 1].y)}
          x2={xLineScale(this._points[i].x as number)}
          y2={this._height - yLineScale(this._points[i].y)}
          strokeWidth={this._strokeWidth}
          stroke={this._color}
        />
      );
    }

    return lines;
  }

  private _createStringLines(): JSX.Element[] {
    const yMax = d3Max(this._points, (point: IDataPoint) => point.y)!;

    const endpointDistance = 0.5 * (this._width / this._points.length);
    const xLineScale = d3ScaleLinear()
      .domain([0, this._points.length - 1])
      .range([endpointDistance - 0.5 * this._lineWidth, this._width - endpointDistance - 0.5 * this._lineWidth]);
    const yLineScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    const lines = [];
    for (let i = 1; i < this._points.length; i++) {
      lines.push(
        <line
          x1={xLineScale(i - 1)}
          y1={this._height - yLineScale(this._points[i - 1].y)}
          x2={xLineScale(i)}
          y2={this._height - yLineScale(this._points[i].y)}
          strokeWidth={this._strokeWidth}
          stroke={this._color}
        />
      );
    }

    return lines;
  }
}
