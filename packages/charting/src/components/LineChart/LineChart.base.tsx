import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import * as d3TimeFormat from 'd3-time-format';
import { ILegend, Legends } from '../Legends/index';
import { classNamesFunction, getId, find } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import {
  ILineChartProps,
  ILineChartStyleProps,
  ILineChartStyles,
  ILineChartDataPoint,
  ILineChartPoints,
} from './LineChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();

export interface IRefArrayData {
  index?: string;
  refElement?: SVGGElement;
}

export class LineChartBase extends React.Component<
  ILineChartProps,
  {
    _width: number;
    _height: number;
    containerWidth: number;
    containerHeight: number;
    isCalloutVisible: boolean;
    YValueHover: { legend?: string; y?: number; color?: string }[];
    hoverYValue: string | number | null;
    hoverXValue: string | number | null;
    refArray: IRefArrayData[];
    activeLegend: string;
    lineColor: string;
    // tslint:disable-next-line:no-any
    refSelected: any;
    hoveredLineColor: string;
    selectedLegend: string;
  }
> {
  private _points: ILineChartPoints[];
  // tslint:disable-next-line:no-any
  private _calloutPoints: any[];
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
  private _calloutId: string;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 20, bottom: 35, left: 65 };
  private minLegendContainerHeight: number = 32;
  private eventLabelHeight: number = 36;
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      containerHeight: 0,
      containerWidth: 0,
      isCalloutVisible: false,
      hoverYValue: '',
      refArray: [],
      hoverXValue: '',
      activeLegend: '',
      YValueHover: [],
      lineColor: '',
      refSelected: '',
      hoveredLineColor: '',
      selectedLegend: '',
    };
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    this._calloutPoints = this.CalloutData(this._points) ? this.CalloutData(this._points) : [];
    this._calloutId = getId('callout');
    this._uniqLineText =
      '_line_' +
      Math.random()
        .toString(36)
        .substring(7);
    this._fitParentContainer = this._fitParentContainer.bind(this);
    props.eventAnnotationProps &&
      props.eventAnnotationProps.labelHeight &&
      (this.eventLabelHeight = props.eventAnnotationProps.labelHeight);
  }

  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public componentDidUpdate(prevProps: ILineChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
    }
  }

  public render(): JSX.Element {
    const {
      theme,
      className,
      styles,
      tickValues,
      tickFormat,
      yAxisTickFormat,
      hideLegend = false,
      eventAnnotationProps,
    } = this.props;
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
      this._createYAxis(yAxisTickFormat);
      lines = this._createLines(strokeWidth);
    }
    const legendBars = this._createLegends(this._points!);
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      color: this.state.lineColor,
      className,
    });
    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };
    return (
      <div
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        className={this._classNames.root}
        role={'presentation'}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
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
              transform={`translate(65, 0)`}
              className={this._classNames.yAxis}
            />
            <g>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={svgDimensions.height}
                stroke={'steelblue'}
                className={'verticalLine'}
                visibility={'hidden'}
                strokeDasharray={'5,5'}
              />
            </g>
            <g>{lines}</g>
            {eventAnnotationProps && (
              <EventsAnnotation
                {...eventAnnotationProps}
                scale={this._xAxisScale}
                chartYTop={this.margins.top + this.eventLabelHeight}
                chartYBottom={svgDimensions.height - 35}
              />
            )}
          </svg>
        </FocusZone>
        <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
          {!hideLegend && legendBars}
        </div>
        <Callout
          target={this.state.refSelected}
          isBeakVisible={false}
          gapSpace={15}
          hidden={!(!this.props.hideTooltip && this.state.isCalloutVisible)}
          directionalHint={DirectionalHint.topAutoEdge}
          id={this._calloutId}
        >
          <div className={this._classNames.calloutContentRoot}>
            <div className={this._classNames.calloutDateTimeContainer}>
              <div className={this._classNames.calloutContentX}>{this.state.hoverXValue} </div>
              {/*TO DO  if we add time for callout then will use this */}
              {/* <div className={this._classNames.calloutContentX}>07:00am</div> */}
            </div>
            <div className={this._classNames.calloutInfoContainer}>
              {this.state.YValueHover &&
                this.state.YValueHover.map(
                  (
                    xValue: {
                      legend?: string;
                      y?: number;
                      color?: string;
                      yAxisCalloutData?: string;
                    },
                    index: number,
                  ) => (
                    <div
                      className={mergeStyles(this._classNames.calloutBlockContainer, {
                        borderLeft: `4px solid ${xValue.color}`,
                      })}
                    >
                      <div className={this._classNames.calloutlegendText}> {xValue.legend}</div>
                      <div className={this._classNames.calloutContentY}>
                        {xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y}
                      </div>
                    </div>
                  ),
                )}
            </div>
          </div>
        </Callout>
      </div>
    );
  }

  private CalloutData = (values: ILineChartPoints[]) => {
    let combinedResult: {
      legend: string;
      y: number;
      x: number | Date | string;
      color: string;
      yAxisCalloutData?: string;
    }[] = [];

    values.forEach((element: { data: ILineChartDataPoint[]; legend: string; color: string }) => {
      const elements = element.data.map((ele: ILineChartDataPoint) => {
        return { legend: element.legend, ...ele, color: element.color };
      });
      combinedResult = combinedResult.concat(elements);
    });

    const result: { x: number | Date | string; values: { legend: string; y: number }[] }[] = [];
    combinedResult.forEach(
      (
        e1: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string },
        index: number,
      ) => {
        e1.x = e1.x instanceof Date ? e1.x.toLocaleDateString() : e1.x;
        const filteredValues = [{ legend: e1.legend, y: e1.y, color: e1.color, yAxisCalloutData: e1.yAxisCalloutData }];
        combinedResult
          .slice(index + 1)
          .forEach(
            (e2: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string }) => {
              e2.x = e2.x instanceof Date ? e2.x.toLocaleDateString() : e2.x;
              if (e1.x === e2.x) {
                filteredValues.push({
                  legend: e2.legend,
                  y: e2.y,
                  color: e2.color,
                  yAxisCalloutData: e2.yAxisCalloutData,
                });
              }
            },
          );
        result.push({ x: e1.x, values: filteredValues });
      },
    );
    return this.getUnique(result, 'x');
  };

  private getUnique = (
    arr: { x: number | Date | string; values: { legend: string; y: number }[] }[],
    comp: string | number,
  ) => {
    const unique = arr
      // tslint:disable-next-line:no-any
      .map((e: { [x: string]: any }) => e[comp])
      // store the keys of the unique objects
      .map((e: string, i: number, final: string[]) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter((e: number) => arr[e])
      .map((e: number) => arr[e]);

    return unique;
  };

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    const { hideLegend = false } = this.props;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        (this.legendContainer.getBoundingClientRect().height || (!hideLegend ? this.minLegendContainerHeight : 0)) +
        parseFloat(legendContainerComputedStyles.marginTop || '0') +
        parseFloat(legendContainerComputedStyles.marginBottom || '0');

      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - legendContainerHeight,
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
        },
      };
      return legend;
    });
    const legends = (
      <Legends
        legends={legendDataItems}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
      />
    );
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
        .selectAll('text');
    }
  }

  private _prepareDatapoints(maxVal: number, minVal: number, splitInto: number): number[] {
    const val = Math.ceil((maxVal - minVal) / splitInto);
    const dataPointsArray: number[] = [minVal, minVal + val];
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
        .selectAll('text');
    }
  };

  // tslint:disable-next-line: no-any
  private _createYAxis = (yAxisTickFormat: any) => {
    const { yMaxValue = 0, yMinValue = 0 } = this.props;
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const yMin = d3Min(this._points, (point: ILineChartPoints) => {
      return d3Min(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const finalYmax = yMax > yMaxValue ? yMax : yMaxValue;
    const finalYmin = yMin < yMinValue ? 0 : yMinValue;
    const domainValues = this._prepareDatapoints(finalYmax, finalYmin, 4);
    const yAxisScale = d3ScaleLinear()
      .domain([finalYmin, domainValues[domainValues.length - 1]])
      .range([
        this.state.containerHeight - this.margins.bottom,
        this.margins.top + (this.props.eventAnnotationProps ? this.eventLabelHeight : 0),
      ]);
    this._yAxisScale = yAxisScale;
    const yAxis = d3AxisLeft(yAxisScale)
      .tickSize(-(this.state.containerWidth - this.margins.left - this.margins.right))
      .tickPadding(12)
      .tickValues(domainValues)
      .tickFormat(yAxisTickFormat);
    this.yAxisElement
      ? d3Select(this.yAxisElement)
          .call(yAxis)
          .selectAll('text')
      : '';
  };

  private _createLines(strokeWidth: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color;
      if (this._points[i].data.length === 1) {
        const keyVal = this._uniqLineText + i;
        const x1 = this._points[i].data[0].x;
        const y1 = this._points[i].data[0].y;
        lines.push(
          <circle
            id={keyVal}
            key={keyVal}
            r={3.5}
            cx={this._xAxisScale(x1)}
            cy={this._yAxisScale(y1)}
            fill={lineColor}
          />,
        );
      }
      for (let j = 1; j < this._points[i].data.length; j++) {
        const keyVal = this._uniqLineText + i + '_' + j;
        const x1 = this._points[i].data[j - 1].x;
        const y1 = this._points[i].data[j - 1].y;
        const x2 = this._points[i].data[j].x;
        const y2 = this._points[i].data[j].y;
        const xAxisCalloutData = this._points[i].data[j - 1].xAxisCalloutData;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              strokeWidth={strokeWidth}
              ref={(e: SVGLineElement | null) => {
                this._refCallback(e!, keyVal);
              }}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={1}
              onClick={this._onLineClick.bind(this, this._points[i].onLineClick)}
            />,
          );
          lines.push(
            <circle
              id={keyVal + 1}
              key={keyVal + 1}
              r={0.2}
              cx={this._xAxisScale(x1)}
              cy={this._yAxisScale(y1)}
              aria-labelledby={this._calloutId}
              data-is-focusable={i === 0 ? true : false}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, keyVal + 1)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, keyVal + 1)}
              onMouseOut={this._handleMouseOut.bind(this, keyVal + 1, lineColor)}
              onFocus={this._handleFocus.bind(this, keyVal, x1, y1, lineColor, xAxisCalloutData, keyVal + 1)}
              onBlur={this._handleMouseOut.bind(this, keyVal + 1, lineColor)}
              onClick={this._onDataPointClick.bind(
                this,
                this._points[i].data[j - 1].onDataPointClick,
                keyVal + 1,
                lineColor,
              )}
              opacity={1}
              fill={lineColor}
              stroke={lineColor}
              strokeWidth={3}
            />,
          );
          if (j + 1 === this._points[i].data.length) {
            lines.push(
              <circle
                id={keyVal + 2}
                key={keyVal + 2}
                r={0.2}
                cx={this._xAxisScale(x2)}
                cy={this._yAxisScale(y2)}
                aria-labelledby={this._calloutId}
                data-is-focusable={i === 0 ? true : false}
                onMouseOver={this._handleHover.bind(this, x2, y2, lineColor, xAxisCalloutData, keyVal + 2)}
                onMouseMove={this._handleHover.bind(this, x2, y2, lineColor, xAxisCalloutData, keyVal + 2)}
                onMouseOut={this._handleMouseOut.bind(this, keyVal + 2, lineColor)}
                onFocus={this._handleFocus.bind(this, keyVal, x2, y2, lineColor, xAxisCalloutData, keyVal + 2)}
                onBlur={this._handleMouseOut.bind(this, keyVal + 2, lineColor)}
                onClick={this._onDataPointClick.bind(
                  this,
                  this._points[i].data[j].onDataPointClick,
                  keyVal + 2,
                  lineColor,
                )}
                opacity={1}
                fill={lineColor}
                stroke={lineColor}
                strokeWidth={3}
              />,
            );
          }
        } else {
          lines.push(
            <circle
              id={keyVal + 1}
              key={keyVal + 1}
              r={5}
              cx={this._xAxisScale(x1)}
              cy={this._yAxisScale(y1)}
              opacity={0.1}
              fill={lineColor}
            />,
          );
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={0.1}
            />,
          );
          if (j + 1 === this._points[i].data.length) {
            lines.push(
              <circle
                id={keyVal + 2}
                key={keyVal + 2}
                r={5}
                cx={this._xAxisScale(x2)}
                cy={this._yAxisScale(y2)}
                fill={lineColor}
                opacity={0.1}
              />,
            );
          }
        }
      }
    }
    return lines;
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this.state.refArray.push({ index: legendTitle, refElement: element });
  }

  private _handleFocus = (
    keyVal: string,
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
    circleId: string,
  ) => {
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === formattedData);
    const _this = this;
    d3Select('#' + circleId)
      .attr('fill', '#fff')
      .attr('r', 8);
    d3Select('.verticalLine')
      .attr('transform', () => `translate(${_this._xAxisScale(x)}, 0)`)
      .attr('visibility', 'visibility');
    this.state.refArray.map((obj: IRefArrayData) => {
      if (obj.index === keyVal) {
        this.setState({
          isCalloutVisible: true,
          refSelected: obj.refElement,
          hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
          hoverYValue: y,
          YValueHover: found.values,
          lineColor: lineColor,
        });
      }
    });
  };

  private _handleHover = (
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
    keyVal: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ) => {
    mouseEvent.persist();
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const _this = this;
    d3Select('#' + keyVal)
      .attr('fill', '#fff')
      .attr('r', 8);
    d3Select('.verticalLine')
      .attr('transform', () => `translate(${_this._xAxisScale(x)}, 0)`)
      .attr('visibility', 'visibility');
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === formattedData);
    this.setState({
      isCalloutVisible: true,
      refSelected: mouseEvent,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
      hoverYValue: y,
      YValueHover: found.values,
      lineColor: lineColor,
    });
  };

  private _onLineClick = (func: () => void) => {
    if (!!func) {
      func();
    }
  };

  private _onDataPointClick = (func: () => void, keyVal: string, color: string) => {
    d3Select('#' + keyVal)
      .attr('fill', color)
      .attr('r', 8);
    if (!!func) {
      func();
    }
  };

  private _handleMouseOut = (keyVal: string, lineColor: string) => {
    d3Select('#' + keyVal)
      .attr('fill', lineColor)
      .attr('r', 0.2);
    d3Select('.verticalLine').attr('visibility', 'hidden');
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _handleLegendClick = (point: ILineChartPoints, selectedLegend: string | null): void => {
    if (point.onLegendClick) {
      point.onLegendClick(selectedLegend);
    }
  };
}
