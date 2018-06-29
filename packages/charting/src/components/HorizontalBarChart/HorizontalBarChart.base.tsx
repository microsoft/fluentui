import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction, IClassNames } from '../../Utilities';
import {
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles,
  IDataPoint
} from './HorizontalBarChart.types';

const getClassNames = classNamesFunction<IHorizontalBarChartStyleProps, IHorizontalBarChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

export class HorizontalBarChartBase extends React.Component<IHorizontalBarChartProps, {}> {
  private _colors: string[];
  private _classNames: IClassNames<IHorizontalBarChartStyles>;

  public static defaultProps: IHorizontalBarChartProps = {
    data: [],
    width: 600,
    height: 350,
    barHeight: 15,
    yAxisTickCount: 10
  };
  constructor(props: IHorizontalBarChartProps) {
    super(props);

    const { theme } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
  }

  public render(): JSX.Element {
    const points = this.props.data || [];
    const width = this.props.width || 600;
    const height = this.props.height || 350;
    const barHeight = this.props.barHeight || 15;
    const yAxisTickCount = this.props.yAxisTickCount || 10;
    const isNumeric = typeof points[0].x === 'number';
    const xAxis = this._createNumericXAxis(isNumeric, points, width);
    const yAxis = isNumeric
      ? this._createYAxis(points, height, yAxisTickCount)
      : this._createStringYAxis(points, height);
    const bars = isNumeric
      ? this._createNumericBars(points, height, width, barHeight)
      : this._createStringBars(points, height, width, barHeight);

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width,
      height: height,
      className
    });

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

  private _setXAxis(node: SVGGElement | null, xAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(xAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.xAxisDomain);
    axisNode.selectAll('line').attr('class', this._classNames.xAxisTicks);
    axisNode.selectAll('text').attr('class', this._classNames.xAxisText);
  }

  private _setYAxis(node: SVGElement | null, yAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(yAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.yAxisDomain);
    axisNode.selectAll('line').attr('class', this._classNames.yAxisTicks);
    axisNode.selectAll('text').attr('class', this._classNames.yAxisText);
  }

  private _createNumericXAxis(isNumeric: boolean, points: IDataPoint[], width: number): numericAxis {
    let xMax;
    if (isNumeric) {
      xMax = d3Max(points, (point: IDataPoint) => point.x as number)!;
    } else {
      xMax = d3Max(points, (point: IDataPoint) => point.y as number)!;
    }
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, width]);
    const xAxis = d3AxisBottom(xAxisScale).ticks(10);
    return xAxis;
  }

  private _createStringYAxis(points: IDataPoint[], height: number): stringAxis {
    const yAxisScale = d3ScaleBand()
      .domain(points.map((point: IDataPoint) => point.x as string))
      .range([height, 0]);
    const yAxis = d3AxisLeft(yAxisScale).tickFormat((x: string, index: number) => points[index].x as string);
    return yAxis;
  }

  private _createYAxis(points: IDataPoint[], height: number, yAxisTickCount: number): numericAxis {
    const yMax = d3Max(points, (point: IDataPoint) => point.y)!;
    const yAxisScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([height, 0]);
    const yAxis = d3AxisLeft(yAxisScale).ticks(yAxisTickCount);
    return yAxis;
  }

  private _createNumericBars(points: IDataPoint[], height: number, width: number, barHeight: number): JSX.Element[] {
    const xMax = d3Max(points, (point: IDataPoint) => point.x as number)!;
    const yMax = d3Max(points, (point: IDataPoint) => point.y)!;

    const xBarScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, width - barHeight]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, height - barHeight]);

    const colorScale = this._createColors(yMax);

    const bars = points.map((point: IDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={0}
          y={height - yBarScale(point.y)}
          width={xBarScale(point.x as number)}
          height={barHeight}
          fill={colorScale(point.y)}
        />
      );
    });

    return bars;
  }

  private _createStringBars(points: IDataPoint[], height: number, width: number, barHeight: number): JSX.Element[] {
    const yMax = d3Max(points, (point: IDataPoint) => point.y)!;
    const xBarScale = d3ScaleLinear()
      .domain([0, points.length])
      .range([0, height]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, width]);
    const colorScale = this._createColors(yMax);

    const bars = points.map((point: IDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={0}
          y={height - xBarScale(index)}
          width={yBarScale(point.y)}
          height={barHeight}
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
