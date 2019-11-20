import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import * as d3TimeFormat from 'd3-time-format';
import { ILegend, Legends } from '../Legends/index';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles, ILineChartDataPoint, ILineChartPoints } from './LineChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();

export class LineChartBase extends React.Component<
  ILineChartProps,
  {
    _width: number;
    _height: number;
    containerWidth: number;
    containerHeight: number;
    isCalloutVisible: boolean;
    hoverYValue: string | number | null;
    hoverXValue: string | number | null;
    activeLegend: string;
    lineColor: string;
    // tslint:disable-next-line:no-any
    refSelected: any;
    hoveredLineColor: string;
    selectedLegend: string;
  }
> {
  private _points: ILineChartPoints[];
  private _classNames: IProcessedStyleSet<ILineChartStyles>;
  private _reqID: number;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  // tslint:disable-next-line:no-any
  private _xAxisScale: any = '';
  // tslint:disable-next-line:no-any
  private _yAxisScale: any = '';
  private _uniqLineText: string;
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      containerHeight: 0,
      containerWidth: 0,
      isCalloutVisible: false,
      hoverYValue: '',
      hoverXValue: '',
      activeLegend: '',
      lineColor: '',
      refSelected: '',
      hoveredLineColor: '',
      selectedLegend: ''
    };
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    this._uniqLineText =
      '_line_' +
      Math.random()
        .toString(36)
        .substring(7);
    this._fitParentContainer = this._fitParentContainer.bind(this);
  }

  public componentDidMount(): void {
    this._fitParentContainer();
    window.addEventListener('resize', this._fitParentContainer);
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public render(): JSX.Element {
    const { theme, className, styles, tickValues, tickFormat } = this.props;
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    if (this.props.parentRef) {
      this._fitParentContainer();
    }
    let dataPresent = false;
    let dataType = false;
    if (this._points && this._points.length > 0) {
      this._points.map((chartData: ILineChartPoints) => {
        if (chartData.data.length > 0) {
          dataPresent = true;
          dataType = chartData.data[0].x instanceof Date;
          return;
        }
      });
    }
    let lines: JSX.Element[] = [];
    if (dataPresent) {
      dataType ? this._createDateXAxis(tickValues, tickFormat) : this._createNumericXAxis();
      const strokeWidth = this.props.strokeWidth ? this.props.strokeWidth : 4;
      this._createYAxis();
      lines = this._createLines(strokeWidth);
    }
    const legendBars = this._createLegends(this._points!);
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      color: this.state.lineColor,
      className
    });
    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight
    };
    return (
      <div ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)} className={this._classNames.root}>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <g
            ref={(e: SVGElement | null) => {
              this.xAxisElement = e;
            }}
            transform={`translate(0, ${svgDimensions.height - 35})`}
            className={this._classNames.xAxis}
          />
          <g
            ref={(e: SVGElement | null) => {
              this.yAxisElement = e;
            }}
            transform={`translate(40, 0)`}
            className={this._classNames.yAxis}
          />
          <g>{lines}</g>
        </svg>
        <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
          {legendBars}
        </div>
        {this.state.isCalloutVisible ? (
          <Callout target={this.state.refSelected} isBeakVisible={false} gapSpace={10} directionalHint={DirectionalHint.topAutoEdge}>
            <div className={this._classNames.calloutContentRoot}>
              <span className={this._classNames.calloutContentX}>{this.state.hoverXValue}</span>
              <span className={this._classNames.calloutContentY}>{this.state.hoverYValue}</span>
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        this.legendContainer.getBoundingClientRect().height +
        parseFloat(legendContainerComputedStyles.marginTop || '0') +
        parseFloat(legendContainerComputedStyles.marginBottom || '0');

      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight ? container.getBoundingClientRect().height : 350;
      const shouldResize = containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - legendContainerHeight
        });
      }
    });
  }

  private _createLegends(data: ILineChartPoints[]): JSX.Element {
    const legendDataItems = data.map((point: ILineChartPoints, index: number) => {
      const color: string = point.color;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          if (this.state.selectedLegend === point.legend) {
            this.setState({ selectedLegend: '' });
            this._handleLegendClick(point, null);
          } else {
            this.setState({ selectedLegend: point.legend });
            this._handleLegendClick(point, point.legend);
          }
          this.setState({ activeLegend: point.legend });
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
    const legends = <Legends legends={legendDataItems} enabledWrapLines={this.props.enabledLegendsWrapLines} />;
    return legends;
  }

  private _createNumericXAxis(): void {
    const xMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => {
        return item.x as number;
      });
    })!;
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    this._xAxisScale = xAxisScale;
    const xAxis = d3AxisBottom(xAxisScale)
      .tickSize(10)
      .tickPadding(12)
      .ticks(7)
      .tickSizeOuter(0);
    if (this.xAxisElement) {
      d3Select(this.xAxisElement)
        .call(xAxis)
        .selectAll('text')
        .style('font', '10px Segoe UI semibold');
    }
  }

  private _prepareDatapoints(minVal: number, maxVal: number, splitInto: number, includeZero: boolean): number[] {
    const val = Math.ceil(maxVal / splitInto);
    const dataPointsArray: number[] = minVal > 100 ? [100, val] : includeZero ? [0, val] : [val];
    while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
      dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
    }
    return dataPointsArray;
  }

  private _createDateXAxis = (tickValues?: Date[] | number[], tickFormat?: string) => {
    const xAxisData: Date[] = [];
    let sDate = new Date();
    // selecting least date and comparing it with data passed to get farthest Date for the range on X-axis
    let lDate = new Date(-8640000000000000);
    this._points.map((singleLineChartData: ILineChartPoints) => {
      singleLineChartData.data.map((point: ILineChartDataPoint) => {
        xAxisData.push(point.x as Date);
        if (point.x < sDate) {
          sDate = point.x as Date;
        }
        if (point.x > lDate) {
          lDate = point.x as Date;
        }
      });
    });
    const xAxisScale = d3ScaleTime()
      .domain([sDate, lDate])
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    this._xAxisScale = xAxisScale;
    const xAxis = d3AxisBottom(xAxisScale)
      .tickSize(10)
      .tickPadding(12);
    tickValues ? xAxis.tickValues(tickValues) : '';
    tickFormat ? xAxis.tickFormat(d3TimeFormat.timeFormat(tickFormat)) : '';
    if (this.xAxisElement) {
      d3Select(this.xAxisElement)
        .call(xAxis)
        .selectAll('text')
        .style('font', '10px Segoe UI Semibold');
    }
  };

  private _createYAxis = () => {
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const yMin = d3Min(this._points, (point: ILineChartPoints) => {
      return d3Min(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const domainValues = this._prepareDatapoints(yMin, yMax, 4, true);
    const yAxisScale = d3ScaleLinear()
      .domain([0, domainValues[domainValues.length - 1]])
      .range([this.state.containerHeight - this.margins.bottom, this.margins.top]);
    this._yAxisScale = yAxisScale;
    const yAxis = d3AxisLeft(yAxisScale)
      .tickSize(-(this.state.containerWidth - this.margins.left - this.margins.right))
      .tickPadding(12)
      .tickValues(domainValues);
    this.yAxisElement
      ? d3Select(this.yAxisElement)
          .call(yAxis)
          .selectAll('text')
          .style('font', '10px Segoe UI semibold')
      : '';
  };

  private _createLines(strokeWidth: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color;
      for (let j = 1; j < this._points[i].data.length; j++) {
        const keyVal = this._uniqLineText + i + '_' + j;
        const x1 = this._points[i].data[j - 1].x;
        const y1 = this._points[i].data[j - 1].y;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(this._points[i].data[j].x)}
              y2={this._yAxisScale(this._points[i].data[j].y)}
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap={'round'}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor)}
              onMouseOut={this._handleMouseOut}
              opacity={1}
            />
          );
        } else {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(this._points[i].data[j].x)}
              y2={this._yAxisScale(this._points[i].data[j].y)}
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={0.1}
            />
          );
        }
      }
    }
    return lines;
  }

  private _handleHover = (x: number | Date, y: number | string, lineColor: string, mouseEvent: React.MouseEvent<SVGPathElement>) => {
    mouseEvent.persist();
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    this.setState({
      isCalloutVisible: true,
      refSelected: mouseEvent,
      hoverXValue: '' + formattedData,
      hoverYValue: y,
      lineColor: lineColor
    });
  };

  private _handleMouseOut = () => {
    this.setState({
      isCalloutVisible: false
    });
  };

  private _handleLegendClick = (point: ILineChartPoints, selectedLegend: string | null): void => {
    if (point.onLegendClick) {
      point.onLegendClick(selectedLegend);
    }
  };
}
