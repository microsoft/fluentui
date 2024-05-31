import * as React from 'react';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select, pointer } from 'd3-selection';
import { bisector } from 'd3-array';
import { ILegend, Legends } from '../Legends/index';
import { line as d3Line, curveLinear as d3curveLinear } from 'd3-shape';
import { classNamesFunction, getId, find, memoizeFunction, getRTL } from '@fluentui/react/lib/Utilities';
import {
  IAccessibilityProps,
  CartesianChart,
  IBasestate,
  IChildProps,
  ILineChartProps,
  ILineChartPoints,
  ICustomizedCalloutData,
  IMargins,
  IRefArrayData,
  IColorFillBarsProps,
  ILineChartStyleProps,
  ILineChartStyles,
  ILineChartGap,
  ILineChartDataPoint,
} from '../../index';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';
import {
  calloutData,
  ChartTypes,
  getXAxisType,
  XAxisTypes,
  tooltipOfXAxislabels,
  Points,
  pointTypes,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  findNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfDateForAreaLineVerticalBarChart,
  domainRangeOfNumericForAreaChart,
  createStringYAxis,
  formatDate,
} from '../../utilities/index';

type NumericAxis = D3Axis<number | { valueOf(): number }>;
const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();

enum PointSize {
  hoverSize = 11,
  invisibleSize = 1,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bisect = bisector((d: any) => d.x).left;

const DEFAULT_LINE_STROKE_SIZE = 4;
// The given shape of a icon must be 2.5 times bigger than line width (known as stroke width)
const PATH_MULTIPLY_SIZE = 2.5;

/**
 *
 * @param x units from origin
 * @param y units from origin
 * @param w is the legnth of the each side of a shape
 * @param index index to get the shape path
 */
const _getPointPath = (x: number, y: number, w: number, index: number): string => {
  const allPointPaths = [
    // circle path
    `M${x - w / 2} ${y}
     A${w / 2} ${w / 2} 0 1 0 ${x + w / 2} ${y}
     M${x - w / 2} ${y}
     A ${w / 2} ${w / 2} 0 1 1 ${x + w / 2} ${y}
     `,
    //square
    `M${x - w / 2} ${y - w / 2}
     L${x + w / 2} ${y - w / 2}
     L${x + w / 2} ${y + w / 2}
     L${x - w / 2} ${y + w / 2}
     Z`,
    //triangle
    `M${x - w / 2} ${y - 0.2886 * w}
     H ${x + w / 2}
     L${x} ${y + 0.5774 * w} Z`,
    //diamond
    `M${x} ${y - w / 2}
     L${x + w / 2} ${y}
     L${x} ${y + w / 2}
     L${x - w / 2} ${y}
     Z`,
    //pyramid
    `M${x} ${y - 0.5774 * w}
     L${x + w / 2} ${y + 0.2886 * w}
     L${x - w / 2} ${y + 0.2886 * w} Z`,
    //hexagon
    `M${x - 0.5 * w} ${y - 0.866 * w}
     L${x + 0.5 * w} ${y - 0.866 * w}
     L${x + w} ${y}
     L${x + 0.5 * w} ${y + 0.866 * w}
     L${x - 0.5 * w} ${y + 0.866 * w}
     L${x - w} ${y}
     Z`,
    //pentagon
    `M${x} ${y - 0.851 * w}
     L${x + 0.6884 * w} ${y - 0.2633 * w}
     L${x + 0.5001 * w} ${y + 0.6884 * w}
     L${x - 0.5001 * w} ${y + 0.6884 * w}
     L${x - 0.6884 * w} ${y - 0.2633 * w}
     Z`,
    //octagon
    `M${x - 0.5001 * w} ${y - 1.207 * w}
     L${x + 0.5001 * w} ${y - 1.207 * w}
     L${x + 1.207 * w} ${y - 0.5001 * w}
     L${x + 1.207 * w} ${y + 0.5001 * w}
     L${x + 0.5001 * w} ${y + 1.207 * w}
     L${x - 0.5001 * w} ${y + 1.207 * w}
     L${x - 1.207 * w} ${y + 0.5001 * w}
     L${x - 1.207 * w} ${y - 0.5001 * w}
     Z`,
  ];
  return allPointPaths[index];
};

type LineChartDataWithIndex = ILineChartPoints & { index: number };

export interface ILineChartState extends IBasestate {
  // This array contains data of selected legends for points
  selectedLegendPoints: LineChartDataWithIndex[];
  // This array contains data of selected legends for color bars
  selectedColorBarLegend: IColorFillBarsProps[];
  // This is a boolean value which is set to true
  // when at least one legend is selected
  isSelectedLegend: boolean;
  // This value will be used as customized callout props - point callout.
  dataPointCalloutProps?: ICustomizedCalloutData;
  // This value will be used as Customized callout props - For stack callout.
  stackCalloutProps?: ICustomizedCalloutData;
  // active or hovered point
  activePoint?: string;
  // x-axis callout accessibility data
  xAxisCalloutAccessibilityData?: IAccessibilityProps;

  nearestCircleToHighlight: ILineChartDataPoint | null;

  activeLine: number | null;
}

export class LineChartBase extends React.Component<ILineChartProps, ILineChartState> {
  public static defaultProps: Partial<ILineChartProps> = {
    enableReflow: true,
    useUTC: true,
  };

  private _points: LineChartDataWithIndex[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _yAxisScale: any = '';
  private _circleId: string;
  private _lineId: string;
  private _borderId: string;
  private _verticalLine: string;
  private _colorFillBarPatternId: string;
  private _uniqueCallOutID: string | null;
  private _refArray: IRefArrayData[];
  private margins: IMargins;
  private eventLabelHeight: number = 36;
  private lines: JSX.Element[];
  private _renderedColorFillBars: JSX.Element[];
  private _colorFillBars: IColorFillBarsProps[];
  private _tooltipId: string;
  private _rectId: string;
  private _staticHighlightCircle: string;
  private _createLegendsMemoized: (data: LineChartDataWithIndex[]) => JSX.Element;
  private _firstRenderOptimization: boolean;
  private _emptyChartId: string;
  private _isRTL: boolean = getRTL();

  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      hoverXValue: '',
      activeLegend: '',
      YValueHover: [],
      refSelected: '',
      selectedLegend: '',
      isCalloutVisible: false,
      selectedLegendPoints: [],
      selectedColorBarLegend: [],
      isSelectedLegend: false,
      activePoint: '',
      nearestCircleToHighlight: null,
      activeLine: null,
    };
    this._refArray = [];
    this._points = this._injectIndexPropertyInLineChartData(this.props.data.lineChartData);
    this._colorFillBars = [];
    this._calloutPoints = calloutData(this._points) || [];
    this._circleId = getId('circle');
    this._lineId = getId('lineID');
    this._borderId = getId('borderID');
    this._verticalLine = getId('verticalLine');
    this._colorFillBarPatternId = getId('colorFillBarPattern');
    this._tooltipId = getId('LineChartTooltipId_');
    this._rectId = getId('containerRectLD');
    this._staticHighlightCircle = getId('staticHighlightCircle');
    this._createLegendsMemoized = memoizeFunction((data: LineChartDataWithIndex[]) => this._createLegends(data));
    this._firstRenderOptimization = true;
    this._emptyChartId = getId('_LineChart_empty');

    props.eventAnnotationProps &&
      props.eventAnnotationProps.labelHeight &&
      (this.eventLabelHeight = props.eventAnnotationProps.labelHeight);
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
      this._points = this._injectIndexPropertyInLineChartData(this.props.data.lineChartData);
      this._calloutPoints = calloutData(this._points) || [];
    }
  }

  public render(): JSX.Element {
    const { tickValues, tickFormat, eventAnnotationProps, legendProps, data } = this.props;
    this._points = this._injectIndexPropertyInLineChartData(data.lineChartData);

    const isXAxisDateType = getXAxisType(this._points);
    let points = this._points;
    if (legendProps && !!legendProps.canSelectMultipleLegends) {
      points = this.state.selectedLegendPoints.length >= 1 ? this.state.selectedLegendPoints : this._points;
      this._calloutPoints = calloutData(points);
    }

    let legendBars = null;
    // reduce computation cost by only creating legendBars
    // if when hideLegend is false.
    // NOTE: they are rendered only when hideLegend is false in CartesianChart.
    if (!this.props.hideLegend) {
      legendBars = this._createLegendsMemoized(this._points!);
    }
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      YValueHover: this.state.YValueHover,
      hoverXValue: this.state.hoverXValue,
      id: `toolTip${this._uniqueCallOutID}`,
      target: this.state.refSelected,
      isBeakVisible: false,
      gapSpace: 15,
      onDismiss: this._closeCallout,
      preventDismissOnEvent: () => true,
      hidden: !(!this.props.hideTooltip && this.state.isCalloutVisible),
      descriptionMessage:
        this.props.getCalloutDescriptionMessage && this.state.stackCalloutProps
          ? this.props.getCalloutDescriptionMessage(this.state.stackCalloutProps)
          : undefined,
      'data-is-focusable': true,
      xAxisCalloutAccessibilityData: this.state.xAxisCalloutAccessibilityData,
      ...this.props.calloutProps,
    };
    const tickParams = {
      tickValues,
      tickFormat,
    };

    return !this._isChartEmpty() ? (
      <CartesianChart
        {...this.props}
        chartTitle={this._getChartTitle()}
        points={points}
        chartType={ChartTypes.LineChart}
        isCalloutForStack
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        createYAxis={createNumericYAxis}
        getmargins={this._getMargins}
        getMinMaxOfYAxis={findNumericMinMaxOfY}
        getGraphData={this._initializeLineChartData}
        xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
        customizedCallout={this._getCustomizedCallout()}
        getDomainNRangeValues={this._getDomainNRangeValues}
        createStringYAxis={createStringYAxis}
        onChartMouseLeave={this._handleChartMouseLeave}
        enableFirstRenderOptimization={this.props.enablePerfOptimization && this._firstRenderOptimization}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this._xAxisScale = props.xScale!;
          this._yAxisScale = props.yScale!;
          return (
            <>
              <g>
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={props.containerHeight}
                  stroke={'#323130'}
                  id={this._verticalLine}
                  visibility={'hidden'}
                  strokeDasharray={'5,5'}
                />
                {this.props.optimizeLargeData ? (
                  <rect
                    id={this._rectId}
                    width={props.containerWidth}
                    height={props.containerHeight}
                    fill={'transparent'}
                  />
                ) : (
                  <></>
                )}
                <g>
                  {this._renderedColorFillBars}
                  {this.lines}
                </g>
                {eventAnnotationProps && (
                  <EventsAnnotation
                    theme={this.props.theme}
                    {...eventAnnotationProps}
                    scale={props.xScale!}
                    chartYTop={this.margins.top! + this.eventLabelHeight}
                    chartYBottom={props.containerHeight! - 35}
                  />
                )}
              </g>
            </>
          );
        }}
      />
    ) : (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  private _getDomainNRangeValues = (
    points: ILineChartPoints[],
    margins: IMargins,
    width: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | undefined,
    shiftX: number,
  ) => {
    let domainNRangeValue: IDomainNRange;
    if (xAxisType === XAxisTypes.NumericAxis) {
      domainNRangeValue = domainRangeOfNumericForAreaChart(points, margins, width, isRTL);
    } else if (xAxisType === XAxisTypes.DateAxis) {
      domainNRangeValue = domainRangeOfDateForAreaLineVerticalBarChart(
        points,
        margins,
        width,
        isRTL,
        tickValues! as Date[],
        chartType,
        barWidth,
      );
    } else {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
    return domainNRangeValue;
  };

  private _injectIndexPropertyInLineChartData = (lineChartData?: ILineChartPoints[]): LineChartDataWithIndex[] | [] => {
    const { allowMultipleShapesForPoints = false } = this.props;
    return lineChartData
      ? lineChartData.map((item: ILineChartPoints, index: number) => {
          let color: string;
          // isInverted property is applicable to v8 themes only
          if (typeof item.color === 'undefined') {
            color = getNextColor(index, 0, this.props.theme?.isInverted);
          } else {
            color = getColorFromToken(item.color, this.props.theme?.isInverted);
          }

          return {
            ...item,
            index: allowMultipleShapesForPoints ? index : -1,
            color,
          };
        })
      : [];
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerStack
      ? this.props.onRenderCalloutPerStack(this.state.stackCalloutProps)
      : this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
      : null;
  };

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _initializeLineChartData = (
    xScale: NumericAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ) => {
    this._xAxisScale = xScale;
    this._yAxisScale = yScale;
    this._renderedColorFillBars = this.props.colorFillBars ? this._createColorFillBars(containerHeight) : [];
    this.lines = this._createLines(xElement!, containerHeight!);
  };

  private _handleSingleLegendSelectionAction = (lineChartItem: LineChartDataWithIndex | IColorFillBarsProps) => {
    if (this.state.selectedLegend === lineChartItem.legend) {
      this.setState({ selectedLegend: '' });
      this._handleLegendClick(lineChartItem, null);
    } else {
      this.setState({ selectedLegend: lineChartItem.legend });
      this._handleLegendClick(lineChartItem, lineChartItem.legend);
    }
  };

  private _onHoverCardHide = () => {
    this.setState({
      selectedLegendPoints: [],
      selectedColorBarLegend: [],
      isSelectedLegend: false,
    });
  };

  private _createLegends(data: LineChartDataWithIndex[]): JSX.Element {
    const { legendProps, allowMultipleShapesForPoints = false } = this.props;
    const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
    const legendDataItems = data.map((point: LineChartDataWithIndex) => {
      const color: string = point.color!;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color,
        action: () => {
          if (isLegendMultiSelectEnabled) {
            this._handleMultipleLineLegendSelectionAction(point);
          } else {
            this._handleSingleLegendSelectionAction(point);
          }
        },
        onMouseOutAction: () => {
          this.setState({ activeLegend: '' });
        },
        hoverAction: () => {
          this._handleChartMouseLeave();
          this.setState({ activeLegend: point.legend });
        },
        ...(point.legendShape && {
          shape: point.legendShape,
        }),
        ...(allowMultipleShapesForPoints && {
          shape: Points[point.index % Object.keys(pointTypes).length] as ILegend['shape'],
        }),
      };
      return legend;
    });

    const colorFillBarsLegendDataItems = this.props.colorFillBars
      ? this.props.colorFillBars.map((colorFillBar: IColorFillBarsProps, index: number) => {
          const title = colorFillBar.legend;
          // isInverted property is applicable to v8 themes only
          const color = getColorFromToken(colorFillBar.color, this.props.theme?.isInverted);
          const legend: ILegend = {
            title,
            color,
            action: () => {
              if (isLegendMultiSelectEnabled) {
                this._handleMultipleColorFillBarLegendSelectionAction(colorFillBar);
              } else {
                this._handleSingleLegendSelectionAction(colorFillBar);
              }
            },
            onMouseOutAction: () => {
              this.setState({ activeLegend: '' });
            },
            hoverAction: () => {
              this._handleChartMouseLeave();
              this.setState({ activeLegend: title });
            },
            opacity: this._getColorFillBarOpacity(colorFillBar),
            stripePattern: colorFillBar.applyPattern,
          };
          return legend;
        })
      : [];

    return (
      <Legends
        legends={[...legendDataItems, ...colorFillBarsLegendDataItems]}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: this._onHoverCardHide })}
        {...this.props.legendProps}
      />
    );
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _getBoxWidthOfShape = (pointId: string, pointIndex: number, isLastPoint: boolean) => {
    const { allowMultipleShapesForPoints = false, strokeWidth = DEFAULT_LINE_STROKE_SIZE } = this.props;
    const { activePoint } = this.state;
    if (allowMultipleShapesForPoints) {
      if (activePoint === pointId) {
        return PointSize.hoverSize;
      } else if (pointIndex === 1 || isLastPoint) {
        return strokeWidth * PATH_MULTIPLY_SIZE;
      } else {
        return PointSize.invisibleSize;
      }
    } else {
      if (activePoint === pointId) {
        return PointSize.hoverSize;
      } else {
        return PointSize.invisibleSize;
      }
    }
  };

  private _getPath = (
    xPos: number,
    yPos: number,
    pointId: string,
    pointIndex: number,
    isLastPoint: boolean,
    pointOftheLine: number,
  ): string => {
    const { allowMultipleShapesForPoints = false } = this.props;
    let w = this._getBoxWidthOfShape(pointId, pointIndex, isLastPoint);
    const index: number = allowMultipleShapesForPoints ? pointOftheLine % Object.keys(pointTypes).length : 0;
    const widthRatio = pointTypes[index].widthRatio;
    w = widthRatio > 1 ? w / widthRatio : w;

    return _getPointPath(xPos, yPos, w, index);
  };
  private _getPointFill = (lineColor: string, pointId: string, pointIndex: number, isLastPoint: boolean) => {
    const { activePoint } = this.state;
    const { theme, allowMultipleShapesForPoints = false } = this.props;
    if (allowMultipleShapesForPoints) {
      if (pointIndex === 1 || isLastPoint) {
        if (activePoint === pointId) {
          return theme!.semanticColors.bodyBackground;
        } else {
          return lineColor;
        }
      } else {
        if (activePoint === pointId) {
          return theme!.semanticColors.bodyBackground;
        } else {
          return lineColor;
        }
      }
    } else {
      if (activePoint === pointId) {
        return theme!.semanticColors.bodyBackground;
      } else {
        return lineColor;
      }
    }
  };
  private _createLines(xElement: SVGElement, containerHeight: number): JSX.Element[] {
    const lines: JSX.Element[] = [];
    if (this.state.isSelectedLegend) {
      this._points = this.state.selectedLegendPoints;
    } else {
      this._points = this._injectIndexPropertyInLineChartData(this.props.data.lineChartData);
    }
    for (let i = this._points.length - 1; i >= 0; i--) {
      const linesForLine: JSX.Element[] = [];
      const bordersForLine: JSX.Element[] = [];
      const pointsForLine: JSX.Element[] = [];

      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color!;
      const { activePoint } = this.state;
      const { theme } = this.props;
      const verticaLineHeight = containerHeight - this.margins.bottom! + 6;
      if (this._points[i].data.length === 1) {
        const { x: x1, y: y1, xAxisCalloutData, xAxisCalloutAccessibilityData } = this._points[i].data[0];
        const circleId = `${this._circleId}_${i}`;
        const isLegendSelected: boolean =
          this._legendHighlighted(legendVal) || this._noLegendHighlighted() || this.state.isSelectedLegend;
        pointsForLine.push(
          <circle
            id={circleId}
            key={circleId}
            r={activePoint === circleId ? 5.5 : 3.5}
            cx={this._xAxisScale(x1)}
            cy={this._yAxisScale(y1)}
            fill={activePoint === circleId ? theme!.semanticColors.bodyBackground : lineColor}
            opacity={isLegendSelected ? 1 : 0.1}
            onMouseOver={this._handleHover.bind(
              this,
              x1,
              y1,
              verticaLineHeight,
              xAxisCalloutData,
              circleId,
              xAxisCalloutAccessibilityData,
            )}
            onMouseMove={this._handleHover.bind(
              this,
              x1,
              y1,
              verticaLineHeight,
              xAxisCalloutData,
              circleId,
              xAxisCalloutAccessibilityData,
            )}
            onMouseOut={this._handleMouseOut}
            strokeWidth={activePoint === circleId ? DEFAULT_LINE_STROKE_SIZE : 0}
            stroke={activePoint === circleId ? lineColor : ''}
            role="img"
            aria-label={this._getAriaLabel(i, 0)}
            data-is-focusable={isLegendSelected}
            ref={(e: SVGCircleElement | null) => {
              this._refCallback(e!, circleId);
            }}
            onFocus={() => this._handleFocus(circleId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)}
            onBlur={this._handleMouseOut}
            {...this._getClickHandler(this._points[i].data[0].onDataPointClick)}
          />,
        );
      }

      let gapIndex = 0;
      const gaps = this._points[i].gaps?.sort((a, b) => a.startIndex - b.startIndex) ?? [];

      // Use path rendering technique for larger datasets to optimize performance.
      if (this.props.optimizeLargeData && this._points[i].data.length > 1) {
        const line = d3Line()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .x((d: any) => this._xAxisScale(d[0]))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .y((d: any) => this._yAxisScale(d[1]))
          .curve(d3curveLinear);

        const lineId = `${this._lineId}_${i}`;
        const borderId = `${this._borderId}_${i}`;
        const strokeWidth =
          this._points[i].lineOptions?.strokeWidth || this.props.strokeWidth || DEFAULT_LINE_STROKE_SIZE;

        const isLegendSelected: boolean =
          this._legendHighlighted(legendVal) || this._noLegendHighlighted() || this.state.isSelectedLegend;

        const lineData: [number, number][] = [];
        for (let k = 0; k < this._points[i].data.length; k++) {
          lineData.push([
            this._points[i].data[k].x instanceof Date
              ? (this._points[i].data[k].x as Date).getTime()
              : (this._points[i].data[k].x as number),
            this._points[i].data[k].y,
          ]);
        }

        if (isLegendSelected) {
          const lineBorderWidth = this._points[i].lineOptions?.lineBorderWidth
            ? Number.parseFloat(this._points[i].lineOptions!.lineBorderWidth!.toString())
            : 0;
          if (lineBorderWidth > 0) {
            bordersForLine.push(
              <path
                id={borderId}
                key={borderId}
                d={line(lineData)!}
                fill="transparent"
                strokeLinecap={this._points[i].lineOptions?.strokeLinecap ?? 'round'}
                strokeWidth={Number.parseFloat(strokeWidth.toString()) + lineBorderWidth}
                stroke={this._points[i].lineOptions?.lineBorderColor || theme!.semanticColors.bodyBackground}
                opacity={1}
              />,
            );
          }

          linesForLine.push(
            <path
              id={lineId}
              key={lineId}
              d={line(lineData)!}
              fill="transparent"
              data-is-focusable={true}
              stroke={lineColor}
              strokeWidth={strokeWidth}
              strokeLinecap={this._points[i].lineOptions?.strokeLinecap ?? 'round'}
              onMouseMove={this._onMouseOverLargeDataset.bind(this, i, verticaLineHeight)}
              onMouseOver={this._onMouseOverLargeDataset.bind(this, i, verticaLineHeight)}
              onMouseOut={this._handleMouseOut}
              {...this._getClickHandler(this._points[i].onLineClick)}
              opacity={1}
            />,
          );
        } else {
          linesForLine.push(
            <path
              id={lineId}
              key={lineId}
              d={line(lineData)!}
              fill="transparent"
              data-is-focusable={false}
              stroke={lineColor}
              strokeWidth={strokeWidth}
              strokeLinecap={this._points[i].lineOptions?.strokeLinecap ?? 'round'}
              opacity={0.1}
            />,
          );
        }

        const isPointHighlighted = this.state.activeLine !== null && this.state.activeLine === i;

        pointsForLine.push(
          <circle
            id={`${this._staticHighlightCircle}_${i}`}
            key={`${this._staticHighlightCircle}_${i}`}
            r={5.5}
            cx={0}
            cy={0}
            fill={theme!.semanticColors.bodyBackground}
            strokeWidth={DEFAULT_LINE_STROKE_SIZE}
            stroke={lineColor}
            visibility={isPointHighlighted ? 'visibility' : 'hidden'}
            onMouseMove={this._onMouseOverLargeDataset.bind(this, i, verticaLineHeight)}
            onMouseOver={this._onMouseOverLargeDataset.bind(this, i, verticaLineHeight)}
            onMouseOut={this._handleMouseOut}
          />,
        );
      } else if (!this.props.optimizeLargeData) {
        for (let j = 1; j < this._points[i].data.length; j++) {
          const gapResult = this._checkInGap(j, gaps, gapIndex);
          const isInGap = gapResult.isInGap;
          gapIndex = gapResult.gapIndex;

          const lineId = `${this._lineId}_${i}_${j}`;
          const borderId = `${this._borderId}_${i}_${j}`;
          const circleId = `${this._circleId}_${i}_${j}`;
          const { x: x1, y: y1, xAxisCalloutData, xAxisCalloutAccessibilityData } = this._points[i].data[j - 1];
          const { x: x2, y: y2 } = this._points[i].data[j];
          let path = this._getPath(
            this._xAxisScale(x1),
            this._yAxisScale(y1),
            circleId,
            j,
            false,
            this._points[i].index,
          );
          const strokeWidth =
            this._points[i].lineOptions?.strokeWidth || this.props.strokeWidth || DEFAULT_LINE_STROKE_SIZE;

          const isLegendSelected: boolean =
            this._legendHighlighted(legendVal) || this._noLegendHighlighted() || this.state.isSelectedLegend;

          const currentPointHidden = this._points[i].hideNonActiveDots && activePoint !== circleId;
          pointsForLine.push(
            <path
              id={circleId}
              key={circleId}
              d={path}
              data-is-focusable={isLegendSelected}
              onMouseOver={this._handleHover.bind(
                this,
                x1,
                y1,
                verticaLineHeight,
                xAxisCalloutData,
                circleId,
                xAxisCalloutAccessibilityData,
              )}
              onMouseMove={this._handleHover.bind(
                this,
                x1,
                y1,
                verticaLineHeight,
                xAxisCalloutData,
                circleId,
                xAxisCalloutAccessibilityData,
              )}
              onMouseOut={this._handleMouseOut}
              onFocus={() => this._handleFocus(lineId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)}
              onBlur={this._handleMouseOut}
              {...this._getClickHandler(this._points[i].data[j - 1].onDataPointClick)}
              opacity={isLegendSelected && !currentPointHidden ? 1 : 0.01}
              fill={this._getPointFill(lineColor, circleId, j, false)}
              stroke={lineColor}
              strokeWidth={strokeWidth}
              role="img"
              aria-label={this._getAriaLabel(i, j - 1)}
            />,
          );
          if (j + 1 === this._points[i].data.length) {
            // If this is last point of the line segment.
            const lastCircleId = `${circleId}${j}L`;
            const hiddenHoverCircleId = `${circleId}${j}D`;
            const lastPointHidden = this._points[i].hideNonActiveDots && activePoint !== lastCircleId;
            path = this._getPath(
              this._xAxisScale(x2),
              this._yAxisScale(y2),
              lastCircleId,
              j,
              true,
              this._points[i].index,
            );
            const {
              xAxisCalloutData: lastCirlceXCallout,
              xAxisCalloutAccessibilityData: lastCirlceXCalloutAccessibilityData,
            } = this._points[i].data[j];
            pointsForLine.push(
              <React.Fragment key={`${lastCircleId}_container`}>
                <path
                  id={lastCircleId}
                  key={lastCircleId}
                  d={path}
                  data-is-focusable={isLegendSelected}
                  onMouseOver={this._handleHover.bind(
                    this,
                    x2,
                    y2,
                    verticaLineHeight,
                    lastCirlceXCallout,
                    lastCircleId,
                    lastCirlceXCalloutAccessibilityData,
                  )}
                  onMouseMove={this._handleHover.bind(
                    this,
                    x2,
                    y2,
                    verticaLineHeight,
                    lastCirlceXCallout,
                    lastCircleId,
                    lastCirlceXCalloutAccessibilityData,
                  )}
                  onMouseOut={this._handleMouseOut}
                  onFocus={() =>
                    this._handleFocus(lineId, x2, lastCirlceXCallout, lastCircleId, lastCirlceXCalloutAccessibilityData)
                  }
                  onBlur={this._handleMouseOut}
                  {...this._getClickHandler(this._points[i].data[j].onDataPointClick)}
                  opacity={isLegendSelected && !lastPointHidden ? 1 : 0.01}
                  fill={this._getPointFill(lineColor, lastCircleId, j, true)}
                  stroke={lineColor}
                  strokeWidth={strokeWidth}
                  role="img"
                  aria-label={this._getAriaLabel(i, j)}
                />
                {/* Dummy circle acting as magnetic latch for last callout point */}
                <circle
                  id={hiddenHoverCircleId}
                  key={hiddenHoverCircleId}
                  r={8}
                  cx={this._xAxisScale(x2)}
                  cy={this._yAxisScale(y2)}
                  opacity={0}
                  width={0}
                  onMouseOver={this._handleHover.bind(
                    this,
                    x2,
                    y2,
                    verticaLineHeight,
                    lastCirlceXCallout,
                    lastCircleId,
                    lastCirlceXCalloutAccessibilityData,
                  )}
                  onMouseMove={this._handleHover.bind(
                    this,
                    x2,
                    y2,
                    verticaLineHeight,
                    lastCirlceXCallout,
                    lastCircleId,
                    lastCirlceXCalloutAccessibilityData,
                  )}
                  onMouseOut={this._handleMouseOut}
                  strokeWidth={0}
                  focusable={false}
                  onBlur={this._handleMouseOut}
                />
              </React.Fragment>,
            );
            /* eslint-enable react/jsx-no-bind */
          }

          if (isLegendSelected) {
            // don't draw line if it is in a gap
            if (!isInGap) {
              const lineBorderWidth = this._points[i].lineOptions?.lineBorderWidth
                ? Number.parseFloat(this._points[i].lineOptions!.lineBorderWidth!.toString())
                : 0;
              if (lineBorderWidth > 0) {
                bordersForLine.push(
                  <line
                    id={borderId}
                    key={borderId}
                    x1={this._xAxisScale(x1)}
                    y1={this._yAxisScale(y1)}
                    x2={this._xAxisScale(x2)}
                    y2={this._yAxisScale(y2)}
                    strokeLinecap={this._points[i].lineOptions?.strokeLinecap ?? 'round'}
                    strokeWidth={Number.parseFloat(strokeWidth.toString()) + lineBorderWidth}
                    stroke={this._points[i].lineOptions?.lineBorderColor || theme!.semanticColors.bodyBackground}
                    opacity={1}
                  />,
                );
              }

              linesForLine.push(
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
                  onMouseOver={this._handleHover.bind(
                    this,
                    x1,
                    y1,
                    verticaLineHeight,
                    xAxisCalloutData,
                    circleId,
                    xAxisCalloutAccessibilityData,
                  )}
                  onMouseMove={this._handleHover.bind(
                    this,
                    x1,
                    y1,
                    verticaLineHeight,
                    xAxisCalloutData,
                    circleId,
                    xAxisCalloutAccessibilityData,
                  )}
                  onMouseOut={this._handleMouseOut}
                  stroke={lineColor}
                  strokeLinecap={this._points[i].lineOptions?.strokeLinecap ?? 'round'}
                  strokeDasharray={this._points[i].lineOptions?.strokeDasharray}
                  strokeDashoffset={this._points[i].lineOptions?.strokeDashoffset}
                  opacity={1}
                  {...this._getClickHandler(this._points[i].onLineClick)}
                />,
              );
            }
          } else {
            if (!isInGap) {
              linesForLine.push(
                <line
                  id={lineId}
                  key={lineId}
                  x1={this._xAxisScale(x1)}
                  y1={this._yAxisScale(y1)}
                  x2={this._xAxisScale(x2)}
                  y2={this._yAxisScale(y2)}
                  strokeWidth={strokeWidth}
                  stroke={lineColor}
                  strokeLinecap={this._points[i].lineOptions?.strokeLinecap ?? 'round'}
                  strokeDasharray={this._points[i].lineOptions?.strokeDasharray}
                  strokeDashoffset={this._points[i].lineOptions?.strokeDashoffset}
                  opacity={0.1}
                />,
              );
            }
          }
        }
      }

      lines.push(
        <g
          key={`line_${i}`}
          role="region"
          aria-label={`${legendVal}, line ${i + 1} of ${this._points.length} with ${
            this._points[i].data.length
          } data points.`}
        >
          {bordersForLine}
          {linesForLine}
          {pointsForLine}
        </g>,
      );
    }
    const classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
    });
    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!this.props.showXAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(this._xAxisScale);
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: classNames.tooltip!,
        id: this._tooltipId,
        xAxis: xAxisElement,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return lines;
  }

  private _createColorFillBars = (containerHeight: number) => {
    const colorFillBars: JSX.Element[] = [];
    if (this.state.isSelectedLegend) {
      this._colorFillBars = this.state.selectedColorBarLegend;
    } else {
      this._colorFillBars = this.props.colorFillBars!;
    }

    const yMinMaxValues = findNumericMinMaxOfY(this._points);
    const FILL_Y_PADDING = 3;
    for (let i = 0; i < this._colorFillBars.length; i++) {
      const colorFillBar = this._colorFillBars[i];
      const colorFillBarId = getId(colorFillBar.legend.replace(/\W/g, ''));
      // isInverted property is applicable to v8 themes only
      const color = getColorFromToken(colorFillBar.color, this.props.theme?.isInverted);

      if (colorFillBar.applyPattern) {
        // Using a pattern element because CSS was unable to render diagonal stripes for rect elements
        colorFillBars.push(this._getStripePattern(color, i));
      }

      for (let j = 0; j < colorFillBar.data.length; j++) {
        const startX = colorFillBar.data[j].startX;
        const endX = colorFillBar.data[j].endX;
        const opacity =
          this._legendHighlighted(colorFillBar.legend) || this._noLegendHighlighted() || this.state.isSelectedLegend
            ? this._getColorFillBarOpacity(colorFillBar)
            : 0.1;
        colorFillBars.push(
          <rect
            fill={colorFillBar.applyPattern ? `url(#${this._colorFillBarPatternId}_${i})` : color}
            fillOpacity={opacity}
            x={this._isRTL ? this._xAxisScale(endX) : this._xAxisScale(startX)}
            y={this._yAxisScale(yMinMaxValues.endValue) - FILL_Y_PADDING}
            width={Math.abs(this._xAxisScale(endX) - this._xAxisScale(startX))}
            height={
              this._yAxisScale(this.props.yMinValue || 0) - this._yAxisScale(yMinMaxValues.endValue) + FILL_Y_PADDING
            }
            key={`${colorFillBarId}${j}`}
          />,
        );
      }
    }
    return colorFillBars;
  };

  private _getStripePattern = (color: string, id: number) => {
    // This describes a tile pattern that resembles diagonal stripes
    // For more information: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
    const stripePath = 'M-4,4 l8,-8 M0,16 l16,-16 M12,20 l8,-8';
    return (
      <pattern
        id={`${this._colorFillBarPatternId}_${id}`}
        width={16}
        height={16}
        key={`${this._colorFillBarPatternId}_${id}`}
        patternUnits={'userSpaceOnUse'}
      >
        <path d={stripePath} stroke={color} strokeWidth={1.25} />
      </pattern>
    );
  };

  private _checkInGap = (pointIndex: number, gaps: ILineChartGap[], currentGapIndex: number) => {
    let gapIndex = currentGapIndex;
    let isInGap = false;

    while (gapIndex < gaps.length && pointIndex > gaps[gapIndex].endIndex) {
      gapIndex++;
    }

    if (gapIndex < gaps.length && pointIndex > gaps[gapIndex].startIndex && pointIndex <= gaps[gapIndex].endIndex) {
      isInGap = true;
    }
    return { isInGap, gapIndex };
  };

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this._refArray.push({ index: legendTitle, refElement: element });
  }

  private _onMouseOverLargeDataset = (
    linenumber: number,
    lineHeight: number,
    mouseEvent: React.MouseEvent<SVGRectElement | SVGPathElement | SVGCircleElement>,
  ) => {
    mouseEvent.persist();
    const { data } = this.props;
    const { lineChartData } = data;

    // This will get the value of the X when mouse is on the chart
    const xOffset = this._xAxisScale.invert(pointer(mouseEvent)[0], document.getElementById(this._rectId)!);
    const i = bisect(lineChartData![linenumber].data, xOffset);
    const d0 = lineChartData![linenumber].data[i - 1] as ILineChartDataPoint;
    const d1 = lineChartData![linenumber].data[i] as ILineChartDataPoint;
    let axisType: XAxisTypes | null = null;
    let xPointToHighlight: string | Date | number | null = null;
    let index: null | number = null;
    if (d0 === undefined && d1 !== undefined) {
      xPointToHighlight = d1.x;
      index = i;
    } else if (d0 !== undefined && d1 === undefined) {
      xPointToHighlight = d0.x;
      index = i - 1;
    } else {
      axisType = getTypeOfAxis(lineChartData![linenumber].data[0].x, true) as XAxisTypes;
      let x0;
      let point0;
      let point1;
      switch (axisType) {
        case XAxisTypes.DateAxis:
          x0 = new Date(xOffset).getTime();
          point0 = (d0.x as Date).getTime();
          point1 = (d1.x as Date).getTime();
          xPointToHighlight = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? d1.x : d0.x;
          index = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? i : i - 1;
          break;
        case XAxisTypes.NumericAxis:
          x0 = xOffset as number;
          point0 = d0.x as number;
          point1 = d1.x as number;
          xPointToHighlight = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? d1.x : d0.x;
          index = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? i : i - 1;
          break;
        default:
          break;
      }
    }

    const { xAxisCalloutData, xAxisCalloutAccessibilityData } = lineChartData![linenumber].data[index as number];
    const formattedDate =
      xPointToHighlight instanceof Date ? formatDate(xPointToHighlight, this.props.useUTC) : xPointToHighlight;
    const modifiedXVal = xPointToHighlight instanceof Date ? xPointToHighlight.getTime() : xPointToHighlight;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => {
      return element.x === modifiedXVal;
    });
    const pointToHighlight: ILineChartDataPoint = lineChartData![linenumber].data[index!];
    const pointToHighlightUpdated =
      this.state.nearestCircleToHighlight === null ||
      (this.state.nearestCircleToHighlight !== null &&
        pointToHighlight !== null &&
        (this.state.nearestCircleToHighlight.x !== pointToHighlight.x ||
          this.state.nearestCircleToHighlight.y !== pointToHighlight.y));
    // if no points need to be called out then don't show vertical line and callout card
    if (found && pointToHighlightUpdated) {
      this._uniqueCallOutID = `#${this._staticHighlightCircle}_${linenumber}`;

      d3Select(`#${this._staticHighlightCircle}_${linenumber}`)
        .attr('cx', `${this._xAxisScale(pointToHighlight.x)}`)
        .attr('cy', `${this._yAxisScale(pointToHighlight.y)}`)
        .attr('visibility', 'visibility');

      d3Select(`#${this._verticalLine}`)
        .attr(
          'transform',
          () => `translate(${this._xAxisScale(pointToHighlight.x)}, ${this._yAxisScale(pointToHighlight.y)})`,
        )
        .attr('visibility', 'visibility')
        .attr('y2', `${lineHeight - this._yAxisScale(pointToHighlight.y)}`);

      this.setState({
        nearestCircleToHighlight: pointToHighlight,
        isCalloutVisible: true,
        refSelected: `#${this._staticHighlightCircle}_${linenumber}`,
        stackCalloutProps: found!,
        YValueHover: found.values,
        dataPointCalloutProps: found!,
        hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
        xAxisCalloutAccessibilityData,
        activePoint: '',
        activeLine: linenumber,
      });
    }

    if (!found) {
      this.setState({
        isCalloutVisible: false,
        nearestCircleToHighlight: pointToHighlight,
        activePoint: '',
        activeLine: linenumber,
      });
    }
  };

  private _handleFocus = (
    lineId: string,
    x: number | Date,

    xAxisCalloutData: string | undefined,
    circleId: string,
    xAxisCalloutAccessibilityData?: IAccessibilityProps,
  ) => {
    this._uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? formatDate(x, this.props.useUTC) : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    // if no points need to be called out then don't show vertical line and callout card

    if (found) {
      const _this = this;
      d3Select(`#${this._verticalLine}`)
        .attr('transform', () => `translate(${_this._xAxisScale(x)}, 0)`)
        .attr('visibility', 'visibility');
      this._refArray.forEach((obj: IRefArrayData) => {
        if (obj.index === lineId) {
          this.setState({
            isCalloutVisible: true,
            refSelected: obj.refElement,
            hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
            YValueHover: found.values,
            stackCalloutProps: found!,
            dataPointCalloutProps: found!,
            activePoint: circleId,
            xAxisCalloutAccessibilityData,
          });
        }
      });
    } else {
      this.setState({
        activePoint: circleId,
      });
    }
  };

  private _handleHover = (
    x: number | Date,
    y: number | Date,
    lineHeight: number,
    xAxisCalloutData: string | undefined,
    circleId: string,
    xAxisCalloutAccessibilityData: IAccessibilityProps | undefined,
    mouseEvent: React.MouseEvent<SVGElement>,
  ) => {
    mouseEvent.persist();
    const formattedData = x instanceof Date ? formatDate(x, this.props.useUTC) : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const _this = this;
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    // if no points need to be called out then don't show vertical line and callout card

    if (found) {
      d3Select(`#${this._verticalLine}`)
        .attr('transform', () => `translate(${_this._xAxisScale(x)}, ${_this._yAxisScale(y)})`)
        .attr('visibility', 'visibility')
        .attr('y2', `${lineHeight - _this._yAxisScale(y)}`);
      if (this._uniqueCallOutID !== circleId) {
        this._uniqueCallOutID = circleId;
        this.setState({
          isCalloutVisible: true,
          refSelected: `#${circleId}`,
          hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
          YValueHover: found.values,
          stackCalloutProps: found!,
          dataPointCalloutProps: found!,
          activePoint: circleId,
          xAxisCalloutAccessibilityData,
          nearestCircleToHighlight: null,
          activeLine: null,
        });
      }
    } else {
      this.setState({
        activePoint: circleId,
        nearestCircleToHighlight: null,
        activeLine: null,
      });
    }
  };

  /**
   * Screen readers announce an element as clickable if the onClick attribute is set.
   * This function sets the attribute only when a click event handler is provided.
   */
  private _getClickHandler = (func?: () => void): { onClick?: () => void } => {
    if (func) {
      return {
        onClick: func,
      };
    }

    return {};
  };

  private _handleMouseOut = () => {
    d3Select(`#${this._verticalLine}`).attr('visibility', 'hidden');
  };

  private _handleChartMouseLeave = () => {
    this._uniqueCallOutID = null;
    this.setState({
      isCalloutVisible: false,
      activePoint: '',
      activeLine: null,
    });
  };

  private _handleLegendClick = (
    lineChartItem: LineChartDataWithIndex | IColorFillBarsProps,
    selectedLegend: string | null | string[],
  ): void => {
    if (lineChartItem.onLegendClick) {
      lineChartItem.onLegendClick(selectedLegend);
    }
  };

  private _handleMultipleLineLegendSelectionAction = (selectedLine: LineChartDataWithIndex) => {
    const selectedLineIndex = this.state.selectedLegendPoints.reduce((acc, line, index) => {
      if (acc > -1 || line.legend !== selectedLine.legend) {
        return acc;
      } else {
        return index;
      }
    }, -1);

    let selectedLines: LineChartDataWithIndex[];
    if (selectedLineIndex === -1) {
      selectedLines = [...this.state.selectedLegendPoints, selectedLine];
    } else {
      selectedLines = this.state.selectedLegendPoints
        .slice(0, selectedLineIndex)
        .concat(this.state.selectedLegendPoints.slice(selectedLineIndex + 1));
    }

    const areAllLineLegendsSelected = this.props.data && selectedLines.length === this.props.data.lineChartData!.length;

    if (
      areAllLineLegendsSelected &&
      ((this.props.colorFillBars && this.props.colorFillBars.length === this.state.selectedColorBarLegend.length) ||
        !this.props.colorFillBars)
    ) {
      // Clear all legends if all legends including color fill bar legends are selected
      // Or clear all legends if all legends are selected and there are no color fill bars
      this._clearMultipleLegendSelections();
    } else if (!selectedLines.length && !this.state.selectedColorBarLegend.length) {
      // Clear all legends if no legends including color fill bar legends are selected
      this._clearMultipleLegendSelections();
    } else {
      // Otherwise, set state when one or more legends are selected, including color fill bar legends
      this.setState({
        selectedLegendPoints: selectedLines,
        isSelectedLegend: true,
      });
    }

    const selectedLegendTitlesToPass = selectedLines.map((line: LineChartDataWithIndex) => line.legend);
    this._handleLegendClick(selectedLine, selectedLegendTitlesToPass);
  };

  private _handleMultipleColorFillBarLegendSelectionAction = (selectedColorFillBar: IColorFillBarsProps) => {
    const selectedColorFillBarIndex = this.state.selectedColorBarLegend.reduce((acc, colorFillBar, index) => {
      if (acc > -1 || colorFillBar.legend !== selectedColorFillBar.legend) {
        return acc;
      } else {
        return index;
      }
    }, -1);

    let selectedColorFillBars: IColorFillBarsProps[];
    if (selectedColorFillBarIndex === -1) {
      selectedColorFillBars = [...this.state.selectedColorBarLegend, selectedColorFillBar];
    } else {
      selectedColorFillBars = this.state.selectedColorBarLegend
        .slice(0, selectedColorFillBarIndex)
        .concat(this.state.selectedColorBarLegend.slice(selectedColorFillBarIndex + 1));
    }

    const areAllColorFillBarLegendsSelected =
      selectedColorFillBars.length === (this.props.colorFillBars && this.props.colorFillBars!.length);

    if (
      areAllColorFillBarLegendsSelected &&
      ((this.props.data && this.props.data.lineChartData!.length === this.state.selectedLegendPoints.length) ||
        !this.props.data)
    ) {
      // Clear all legends if all legends, including line legends, are selected
      // Or clear all legends if all legends are selected and there is no line data
      this._clearMultipleLegendSelections();
    } else if (!selectedColorFillBars.length && !this.state.selectedLegendPoints.length) {
      // Clear all legends if no legends are selected, including line legends
      this._clearMultipleLegendSelections();
    } else {
      // set state when one or more legends are selected, including line legends
      this.setState({
        selectedColorBarLegend: selectedColorFillBars,
        isSelectedLegend: true,
      });
    }

    const selectedLegendTitlesToPass = selectedColorFillBars.map(
      (colorFillBar: IColorFillBarsProps) => colorFillBar.legend,
    );
    this._handleLegendClick(selectedColorFillBar, selectedLegendTitlesToPass);
  };

  private _clearMultipleLegendSelections = () => {
    this.setState({
      selectedColorBarLegend: [],
      selectedLegendPoints: [],
      isSelectedLegend: false,
    });
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legend: string) => {
    return (
      this.state.selectedLegend === legend || (this.state.selectedLegend === '' && this.state.activeLegend === legend)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.activeLegend === '';
  };

  private _getColorFillBarOpacity = (colorFillBar: IColorFillBarsProps) => {
    return colorFillBar.applyPattern ? 1 : 0.4;
  };

  private _getAriaLabel = (lineIndex: number, pointIndex: number): string => {
    const line = this._points[lineIndex];
    const point = line.data[pointIndex];
    const formattedDate = point.x instanceof Date ? formatDate(point.x, this.props.useUTC) : point.x;
    const xValue = point.xAxisCalloutData || formattedDate;
    const legend = line.legend;
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
  };

  private _isChartEmpty(): boolean {
    return !(
      this.props.data &&
      this.props.data.lineChartData &&
      this.props.data.lineChartData.length > 0 &&
      this.props.data.lineChartData.filter((item: ILineChartPoints) => item.data.length).length > 0
    );
  }

  private _getChartTitle = (): string => {
    const { chartTitle, lineChartData } = this.props.data;
    return (chartTitle ? `${chartTitle}. ` : '') + `Line chart with ${lineChartData?.length || 0} lines. `;
  };
}
