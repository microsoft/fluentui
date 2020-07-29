import * as React from 'react';
import { select as d3Select } from 'd3-selection';
import { ILegend, Legends } from '../Legends/index';
import { classNamesFunction, getId, find } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles, ILineChartPoints } from './LineChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';
import {
  calloutData,
  createNumericXAxis,
  createDateXAxis,
  createYAxis,
  fitContainer,
  IMargins,
} from '../../utilities/index';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();

export interface IRefArrayData {
  index?: string;
  refElement?: SVGGElement;
}

export interface IContainerValues {
  width: number;
  height: number;
  shouldResize: boolean;
  reqID: number;
}

interface IYValueHover {
  legend?: string;
  y?: number;
  color?: string;
}

export class LineChartBase extends React.Component<
  ILineChartProps,
  {
    _width: number;
    _height: number;
    containerWidth: number;
    containerHeight: number;
    isCalloutVisible: boolean;
    YValueHover: IYValueHover[];
    hoverYValue: string | number | null;
    hoverXValue: string | number | null;
    refArray: IRefArrayData[];
    activeLegend: string;
    lineColor: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refSelected: any;
    hoveredLineColor: string;
    selectedLegend: string;
  }
> {
  private _points: ILineChartPoints[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any[];
  private _classNames: IProcessedStyleSet<ILineChartStyles>;
  private containerParams: IContainerValues;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _yAxisScale: any = '';
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  private _circleId: string;
  private _verticalLine: string;
  private _uniqueCallOutID: string;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins: IMargins;
  private eventLabelHeight: number = 36;
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      containerHeight: 0,
      containerWidth: 0,
      isCalloutVisible: false,
      // eslint-disable-next-line react/no-unused-state
      hoverYValue: '',
      refArray: [],
      hoverXValue: '',
      activeLegend: '',
      YValueHover: [],
      lineColor: '',
      refSelected: '',
      // eslint-disable-next-line react/no-unused-state
      hoveredLineColor: '',
      selectedLegend: '',
    };
    this._points = this.props.data.lineChartData || [];
    this._calloutPoints = calloutData(this._points) || [];
    this._circleId = getId('circle');
    this._verticalLine = getId('verticalLine');
    this.margins = {
      top: this.props.margins?.top || 20,
      right: this.props.margins?.right || 20,
      bottom: this.props.margins?.bottom || 35,
      left: this.props.margins?.left || 35,
    };
    this._fitParentContainer = this._fitParentContainer.bind(this);
    props.eventAnnotationProps &&
      props.eventAnnotationProps.labelHeight &&
      (this.eventLabelHeight = props.eventAnnotationProps.labelHeight);
  }

  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this.containerParams.reqID);
  }

  public componentDidUpdate(prevProps: ILineChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      prevProps.data !== this.props.data
    ) {
      this._fitParentContainer();
      this._points = this.props.data.lineChartData || [];
      this._calloutPoints = calloutData(this._points) || [];
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
    this._points = this.props.data.lineChartData || [];
    if (this.props.parentRef) {
      this._fitParentContainer();
    }
    let dataPresent = false;
    let dataType = false;
    if (this._points && this._points.length > 0) {
      this._points.forEach((chartData: ILineChartPoints) => {
        if (chartData.data.length > 0) {
          dataPresent = true;
          dataType = chartData.data[0].x instanceof Date;
          return;
        }
      });
    }
    let lines: JSX.Element[] = [];
    if (dataPresent) {
      const XAxisParams = {
        margins: this.margins as IMargins,
        containerWidth: this.state.containerWidth,
        xAxisElement: this.xAxisElement!,
      };
      const tickParams = {
        tickValues: tickValues,
        tickFormat: tickFormat,
      };
      dataType
        ? (this._xAxisScale = createDateXAxis(this._points, XAxisParams, tickParams))
        : (this._xAxisScale = createNumericXAxis(this._points, XAxisParams));
      const strokeWidth = this.props.strokeWidth ? this.props.strokeWidth : 4;
      const { yMaxValue = 0, yMinValue = 0 } = this.props;
      const yAxisParams = {
        margins: this.margins,
        containerWidth: this.state.containerWidth,
        containerHeight: this.state.containerHeight,
        yAxisTickFormat: yAxisTickFormat,
        yAxisTickCount: 4,
        yMaxValue: yMaxValue,
        yMinValue: yMinValue,
        showYAxisGridLines: true,
        yAxisElement: this.yAxisElement,
        eventAnnotationProps: this.props.eventAnnotationProps,
        eventLabelHeight: this.eventLabelHeight,
      };

      this._yAxisScale = createYAxis(this._points, yAxisParams);
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
    const yValueHoverSubCountsExists: boolean = this._yValueHoverSubCountsExists();
    return (
      <div
        // eslint-disable-next-line react/jsx-no-bind
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        className={this._classNames.root}
        role={'presentation'}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <g
              // eslint-disable-next-line react/jsx-no-bind
              ref={(e: SVGElement | null) => {
                this.xAxisElement = e;
              }}
              transform={`translate(0, ${svgDimensions.height - this.margins.bottom!})`}
              className={this._classNames.xAxis}
            />
            <g
              // eslint-disable-next-line react/jsx-no-bind
              ref={(e: SVGElement | null) => {
                this.yAxisElement = e;
              }}
              transform={`translate(${this.margins.left}, 0)`}
              className={this._classNames.yAxis}
            />
            <g>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={svgDimensions.height}
                stroke={'steelblue'}
                id={this._verticalLine}
                visibility={'hidden'}
                strokeDasharray={'5,5'}
              />
            </g>
            <g>{lines}</g>
            {dataPresent && eventAnnotationProps && (
              <EventsAnnotation
                {...eventAnnotationProps}
                scale={this._xAxisScale}
                chartYTop={this.margins.top! + this.eventLabelHeight}
                chartYBottom={svgDimensions.height - 35}
              />
            )}
          </svg>
        </FocusZone>
        <div
          // eslint-disable-next-line react/jsx-no-bind
          ref={(e: HTMLDivElement) => (this.legendContainer = e)}
          className={this._classNames.legendContainer}
        >
          {!hideLegend && legendBars}
        </div>
        {!this.props.hideTooltip && this.state.isCalloutVisible && (
          <Callout
            target={this.state.refSelected}
            isBeakVisible={false}
            gapSpace={15}
            directionalHint={DirectionalHint.topAutoEdge}
            id={`toolTip${this._uniqueCallOutID}`}
          >
            <div className={this._classNames.calloutContentRoot}>
              <div
                className={this._classNames.calloutDateTimeContainer}
                style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
              >
                <div className={this._classNames.calloutContentX}>{this.state.hoverXValue} </div>
                {/*TO DO  if we add time for callout then will use this */}
                {/* <div className={this._classNames.calloutContentX}>07:00am</div> */}
              </div>
              <div
                className={this._classNames.calloutInfoContainer}
                style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}
              >
                {this.state.YValueHover &&
                  this.state.YValueHover.map((yValue: IYValueHover, index: number, yValues: IYValueHover[]) => {
                    const isLast: boolean = index + 1 === yValues.length;
                    return (
                      <div
                        key={`callout-content-${index}`}
                        style={yValueHoverSubCountsExists ? { display: 'inline-block' } : {}}
                      >
                        {this._getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                      </div>
                    );
                  })}
              </div>
            </div>
          </Callout>
        )}
      </div>
    );
  }

  private _yValueHoverSubCountsExists() {
    const { YValueHover } = this.state;
    if (YValueHover) {
      return YValueHover.some(
        (yValue: {
          legend?: string;
          y?: number;
          color?: string;
          yAxisCalloutData?: string | { [id: string]: number };
        }) => yValue.yAxisCalloutData && typeof yValue.yAxisCalloutData !== 'string',
      );
    }
    return false;
  }

  private _getCalloutContent(
    xValue: {
      legend?: string;
      y?: number;
      color?: string;
      yAxisCalloutData?: string | { [id: string]: number };
    },
    index: number,
    yValueHoverSubCountsExists: boolean,
    isLast: boolean,
  ): React.ReactNode {
    const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };

    if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
      return (
        <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
          {yValueHoverSubCountsExists && (
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({xValue.y})
            </div>
          )}
          <div
            id={`${index}_${xValue.y}`}
            className={mergeStyles(this._classNames.calloutBlockContainer, {
              borderLeft: `4px solid ${xValue.color}`,
            })}
          >
            <div className={this._classNames.calloutlegendText}> {xValue.legend}</div>
            <div className={this._classNames.calloutContentY}>
              {xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y}
            </div>
          </div>
        </div>
      );
    } else {
      const subcounts: { [id: string]: number } = xValue.yAxisCalloutData as { [id: string]: number };
      return (
        <div style={marginStyle}>
          <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
            {xValue.legend!} ({xValue.y})
          </div>
          {Object.keys(subcounts).map((subcountName: string) => {
            return (
              <div
                key={subcountName}
                className={mergeStyles(this._classNames.calloutBlockContainer, {
                  borderLeft: `4px solid ${xValue.color}`,
                })}
              >
                <div className={this._classNames.calloutlegendText}> {subcountName}</div>
                <div className={this._classNames.calloutContentY}>{subcounts[subcountName]}</div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  private _fitParentContainer(): void {
    const reqParams = {
      containerWidth: this.state.containerWidth,
      containerHeight: this.state.containerHeight,
      hideLegend: this.props.hideLegend!,
      legendContainer: this.legendContainer,
      container: this.props.parentRef ? this.props.parentRef : this.chartContainer,
    };
    this.containerParams = fitContainer(reqParams);
    if (this.containerParams.shouldResize) {
      this.setState({
        containerWidth: this.containerParams.width,
        containerHeight: this.containerParams.height,
      });
    }
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

  private _createLines(strokeWidth: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color;
      if (this._points[i].data.length === 1) {
        const x1 = this._points[i].data[0].x;
        const y1 = this._points[i].data[0].y;
        lines.push(
          <circle
            id={`${this._circleId}${i}`}
            key={`${this._circleId}${i}`}
            r={3.5}
            cx={this._xAxisScale(x1)}
            cy={this._yAxisScale(y1)}
            fill={lineColor}
          />,
        );
      }
      for (let j = 1; j < this._points[i].data.length; j++) {
        const lineId = `${i}${j}`;
        const circleId = `${this._circleId}${i}${j}`;
        const x1 = this._points[i].data[j - 1].x;
        const y1 = this._points[i].data[j - 1].y;
        const x2 = this._points[i].data[j].x;
        const y2 = this._points[i].data[j].y;
        const xAxisCalloutData = this._points[i].data[j - 1].xAxisCalloutData;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
          /* eslint-disable react/jsx-no-bind */
          lines.push(
            <line
              id={lineId}
              key={lineId}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              strokeWidth={strokeWidth}
              ref={(e: SVGLineElement | null) => {
                this._refCallback(e!, lineId);
              }}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseOut={this._handleMouseOut.bind(this, circleId, lineColor)}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={1}
              onClick={this._onLineClick.bind(this, this._points[i].onLineClick)}
            />,
          );
          lines.push(
            <circle
              id={circleId}
              key={circleId}
              r={0.2}
              cx={this._xAxisScale(x1)}
              cy={this._yAxisScale(y1)}
              data-is-focusable={i === 0 ? true : false}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseOut={this._handleMouseOut.bind(this, circleId, lineColor)}
              onFocus={this._handleFocus.bind(this, lineId, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onBlur={this._handleMouseOut.bind(this, circleId, lineColor)}
              onClick={this._onDataPointClick.bind(
                this,
                this._points[i].data[j - 1].onDataPointClick,
                circleId,
                lineColor,
              )}
              opacity={1}
              fill={lineColor}
              stroke={lineColor}
              strokeWidth={3}
            />,
          );
          if (j + 1 === this._points[i].data.length) {
            const lastCircleId = `${circleId}${j}L`;
            lines.push(
              <circle
                id={lastCircleId}
                key={lastCircleId}
                r={0.2}
                cx={this._xAxisScale(x2)}
                cy={this._yAxisScale(y2)}
                data-is-focusable={i === 0 ? true : false}
                onMouseOver={this._handleHover.bind(this, x2, y2, lineColor, xAxisCalloutData, lastCircleId)}
                onMouseMove={this._handleHover.bind(this, x2, y2, lineColor, xAxisCalloutData, lastCircleId)}
                onMouseOut={this._handleMouseOut.bind(this, lastCircleId, lineColor)}
                onFocus={this._handleFocus.bind(this, lineId, x2, y2, lineColor, xAxisCalloutData, lastCircleId)}
                onBlur={this._handleMouseOut.bind(this, lastCircleId, lineColor)}
                onClick={this._onDataPointClick.bind(
                  this,
                  this._points[i].data[j].onDataPointClick,
                  lastCircleId,
                  lineColor,
                )}
                opacity={1}
                fill={lineColor}
                stroke={lineColor}
                strokeWidth={3}
              />,
            );
            /* eslint-enable react/jsx-no-bind */
          }
        } else {
          lines.push(
            <line
              id={lineId}
              key={lineId}
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
        }
      }
    }
    return lines;
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this.state.refArray.push({ index: legendTitle, refElement: element });
  }

  private _handleFocus = (
    lineId: string,
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
    circleId: string,
  ) => {
    this._uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    d3Select('#' + circleId)
      .attr('fill', '#fff')
      .attr('r', 8)
      .attr('aria-labelledby', `toolTip${this._uniqueCallOutID}`);
    d3Select(`#${this._verticalLine}`)
      .attr('transform', () => `translate(${this._xAxisScale(x)}, 0)`)
      .attr('visibility', 'visibility');
    this.state.refArray.forEach((obj: IRefArrayData) => {
      if (obj.index === lineId) {
        this.setState({
          isCalloutVisible: true,
          refSelected: obj.refElement,
          hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
          // eslint-disable-next-line react/no-unused-state
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
    circleId: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ) => {
    mouseEvent.persist();
    this._uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const _this = this;
    d3Select(`#${circleId}`)
      .attr('fill', '#fff')
      .attr('r', 8);
    d3Select(`#${this._verticalLine}`)
      .attr('transform', () => `translate(${_this._xAxisScale(x)}, 0)`)
      .attr('visibility', 'visibility');
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    this.setState({
      isCalloutVisible: true,
      refSelected: mouseEvent,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
      // eslint-disable-next-line react/no-unused-state
      hoverYValue: y,
      YValueHover: found.values,
      lineColor: lineColor,
    });
  };

  private _onLineClick = (func: () => void) => {
    if (func) {
      func();
    }
  };

  private _onDataPointClick = (func: () => void, circleId: string, color: string) => {
    d3Select('#' + circleId)
      .attr('fill', color)
      .attr('r', 8);
    if (func) {
      func();
    }
  };

  private _handleMouseOut = (circleId: string, lineColor: string) => {
    d3Select('#' + circleId)
      .attr('fill', lineColor)
      .attr('r', 0.2);
    d3Select(`#${this._verticalLine}`).attr('visibility', 'hidden');
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
