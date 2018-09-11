import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { ILegend, Legends } from '../Legends/index';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import {
  ILineChartProps,
  ILineChartStyleProps,
  ILineChartStyles,
  IDataPoint,
  ILineChartPoints
} from './LineChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

export class LineChartBase extends React.Component<
  ILineChartProps,
  {
    _width: number;
    _height: number;
    isCalloutVisible: boolean;
    hoverYValue: string | number | null;
    hoverXValue: string | number | null;
    activeLine: string;
    activeLegend: string;
    lineColor: string;
  }
> {
  private _points: ILineChartPoints[];
  private _lineWidth: number;
  private _strokeWidth: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<ILineChartStyles>;
  private _lineRootElem: HTMLElement | null;
  private _uniqLineText: string;

  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      isCalloutVisible: false,
      hoverYValue: '',
      hoverXValue: '',
      activeLine: '',
      activeLegend: '',
      lineColor: ''
    };
    this._points = this.props.data!.lineChartData || [];
    this._lineWidth = 15;
    this._strokeWidth = this.props.strokeWidth || 4;
    this._uniqLineText =
      '_line_' +
      Math.random()
        .toString(36)
        .substring(7);

    const { theme } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
  }

  public componentDidMount(): void {
    this.setState({
      _width: this._lineRootElem!.offsetWidth,
      _height: this._lineRootElem!.offsetHeight
    });
  }

  public render(): JSX.Element {
    const isNumeric = typeof this._points[0] && this._points[0].data[0]!.x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis() : this._createStringXAxis();
    const yAxis = this._createYAxis();
    const lines = isNumeric ? this._createNumericLines() : this._createStringLines();

    const { theme, className, styles } = this.props;

    const { palette } = theme!;

    const legendBars = this._createLegends(this._points!, palette);

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      color: this.state.lineColor,
      className
    });

    return (
      <div ref={(rootElem: HTMLElement | null) => (this._lineRootElem = rootElem)} className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <svg ref={(node: SVGElement | null) => this._setViewBox(node)} className={this._classNames.chart}>
          <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} className={this._classNames.xAxis} />
          <g ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)} className={this._classNames.yAxis} />
          <g className={this._classNames.lines}>{lines}</g>
        </svg>
        <div className={this._classNames.legendContainer}>{legendBars}</div>
        {this.state.isCalloutVisible ? (
          <Callout
            target={`#${this.state.activeLine}`}
            coverTarget={true}
            isBeakVisible={false}
            gapSpace={30}
            className={this._classNames.calloutPadding}
            directionalHint={DirectionalHint.rightTopEdge}
          >
            <div className={this._classNames.calloutContentRoot}>
              <span className={this._classNames.calloutContentX}>{this.state.hoverXValue}</span>
              <span className={this._classNames.calloutContentY}>{this.state.hoverYValue}</span>
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _hoverOn(
    hoverYValue: string | number | null,
    hoverXValue: string | number | null,
    activeLine: string,
    lineColor: string,
    isHoverShow: boolean
  ): void {
    if (isHoverShow) {
      this.setState({
        isCalloutVisible: true,
        hoverYValue: hoverYValue,
        hoverXValue: hoverXValue,
        activeLine: activeLine,
        lineColor: lineColor
      });
    }
  }
  private _hoverOff(isHoverShow: boolean): void {
    if (isHoverShow) {
      this.setState({ isCalloutVisible: false, hoverYValue: '', hoverXValue: '', activeLine: '', lineColor: '' });
    }
  }

  private _createLegends(data: ILineChartPoints[], palette: IPalette): JSX.Element {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const legendDataItems = data.map((point: ILineChartPoints, index: number) => {
      const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          if (this.state.activeLegend !== point.legend || this.state.activeLegend === '') {
            this.setState({ activeLegend: point.legend });
          } else {
            this.setState({ activeLegend: point.legend });
          }
        },
        onMouseOutAction: () => {
          this.setState({ activeLegend: '' });
        },
        hoverAction: () => {
          this.setState({ activeLegend: point.legend });
        }
      };
      return legend;
    });
    const legends = <Legends legends={legendDataItems} />;
    return legends;
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

  private _setViewBox(node: SVGElement | null): void {
    if (node === null) {
      return;
    }

    const widthVal = node.parentElement ? node.parentElement.clientWidth : this.state._width;

    const heightVal =
      node.parentElement && node.parentElement.offsetHeight > this.state._height
        ? node.parentElement.offsetHeight
        : this.state._height;

    node.setAttribute('viewBox', `0 0 ${widthVal} ${heightVal}`);
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
    const xMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => item.x as number);
    })!;

    const domainValues = this._prepareDatapoints(xMax, 4, false);
    const xAxisScale = d3ScaleLinear()
      .domain([0, domainValues[domainValues.length - 1]])
      .range([0, this.state._width]);
    const xAxis = d3AxisBottom(xAxisScale).tickValues(domainValues);
    return xAxis;
  }

  private _prepareDatapoints(maxVal: number, splitInto: number, includeZero: boolean): number[] {
    const val = Math.ceil(maxVal / splitInto);
    const dataPointsArray: number[] = includeZero ? [0, val] : [val];
    while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
      dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
    }
    return dataPointsArray;
  }
  private _createStringXAxis(): stringAxis {
    const dataArray: string[] = this._points[0]!.data!.map((point: IDataPoint) => point.x as string);
    const indexRange = Math.ceil(dataArray.length / 4);

    const xAxisScale = d3ScaleBand()
      .domain(this._points[0]!.data!.map((point: IDataPoint) => point.x as string))
      .range([0, this.state._width]);
    const xAxis = d3AxisBottom(xAxisScale).tickValues([
      dataArray[0],
      dataArray[indexRange],
      dataArray[indexRange * 2],
      dataArray[dataArray.length - 1]
    ]);
    return xAxis;
  }

  private _createYAxis(): numericAxis {
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => item.y);
    })!;
    const domainValues = this._prepareDatapoints(yMax, 2, true);
    const yAxisScale = d3ScaleLinear()
      .domain([0, domainValues[domainValues.length - 1]])
      .range([this.state._height, 0]);
    const yAxis = d3AxisLeft(yAxisScale).tickValues(domainValues);
    return yAxis;
  }

  private _createNumericLines(): JSX.Element[] {
    const xMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => item.x as number);
    })!;
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => item.y);
    })!;

    const xLineScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this.state._width - this._lineWidth]);
    const yLineScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state._height]);

    const lines = [];

    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      let opacity = 0.1;
      let isHoverShow = false;
      if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
        opacity = 1;
        isHoverShow = true;
      }
      const lineColor: string = this._points[i].color;
      for (let j = 1; j < this._points[i].data.length; j++) {
        const keyVal = this._uniqLineText + i + '_' + j;
        lines.push(
          <line
            id={keyVal}
            key={keyVal}
            onMouseOver={this._hoverOn.bind(
              this,
              this._points[i].data[j - 1].y,
              this._points[i].data[j - 1].x,
              keyVal,
              lineColor,
              isHoverShow
            )}
            onMouseLeave={this._hoverOff.bind(this, isHoverShow)}
            x1={xLineScale(this._points[i].data[j - 1].x as number)}
            y1={this.state._height - yLineScale(this._points[i].data[j - 1].y)}
            x2={xLineScale(this._points[i].data[j].x as number)}
            y2={this.state._height - yLineScale(this._points[i].data[j].y)}
            strokeWidth={this._strokeWidth}
            stroke={this._points[i].color ? this._points[i].color : this._colors[i]}
            opacity={opacity}
          />
        );
      }
    }

    return lines;
  }

  private _createStringLines(): JSX.Element[] {
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => item.y);
    })!;

    const endpointDistance = 0.5 * (this.state._width / this._points[0]!.data!.length);
    const xLineScale = d3ScaleLinear()
      .domain([0, this._points[0]!.data!.length - 1])
      .range([endpointDistance - 0.5 * this._lineWidth, this.state._width - endpointDistance - 0.5 * this._lineWidth]);
    const yLineScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state._height]);

    const lines = [];

    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      let opacity = 0.1;
      let isHoverShow = false;
      if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
        opacity = 1;
        isHoverShow = true;
      }
      const lineColor: string = this._points[i].color;
      for (let j = 1; j < this._points[i].data.length; j++) {
        const keyVal = this._uniqLineText + i + '_' + j;
        lines.push(
          <line
            id={keyVal}
            key={keyVal}
            onMouseOver={this._hoverOn.bind(
              this,
              this._points[i].data[j - 1].y,
              this._points[i].data[j - 1].x,
              keyVal,
              lineColor,
              isHoverShow
            )}
            onMouseLeave={this._hoverOff.bind(this, isHoverShow)}
            x1={xLineScale(j - 1)}
            y1={this.state._height - yLineScale(this._points[i].data[j - 1].y)}
            x2={xLineScale(j)}
            y2={this.state._height - yLineScale(this._points[i].data[j].y)}
            strokeWidth={this._strokeWidth}
            stroke={this._points[i].color ? this._points[i].color : this._colors[i]}
            opacity={opacity}
          />
        );
      }
    }

    return lines;
  }
}
