import * as React from 'react';
import { LineChartProps } from './LineChart.types';
import { useLineChartStyles } from './useLineChartStyles.styles';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select, pointer } from 'd3-selection';
import { bisector } from 'd3-array';
import { Legend, Legends, LegendContainer } from '../Legends/index';
import { line as d3Line } from 'd3-shape';
import { max as d3Max } from 'd3-array';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { find, YAxisType } from '../../utilities/index';
import {
  AccessibilityProps,
  CartesianChart,
  ChildProps,
  LineChartPoints,
  CustomizedCalloutData,
  CustomizedCalloutDataPoint,
  Margins,
  RefArrayData,
  ColorFillBarsProps,
  LineChartGap,
  LineChartDataPoint,
  Chart,
  ImageExportOptions,
} from '../../index';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';
import { tokens } from '@fluentui/react-theme';
import {
  calloutData,
  ChartTypes,
  getXAxisType,
  XAxisTypes,
  tooltipOfAxislabels,
  Points,
  pointTypes,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  findNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfDateForAreaLineScatterVerticalBarCharts,
  domainRangeOfNumericForAreaLineScatterCharts,
  createStringYAxis,
  useRtl,
  getCurveFactory,
  isScatterPolarSeries,
  getDomainPaddingForMarkers,
  isPlottable,
  getRangeForScatterMarkerSize,
} from '../../utilities/index';
import { ScaleLinear } from 'd3-scale';
import { toImage } from '../../utilities/image-export-utils';
import { renderScatterPolarCategoryLabels } from '../../utilities/scatterpolar-utils';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';

type NumericAxis = D3Axis<number | { valueOf(): number }>;
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

type LineChartDataWithIndex = LineChartPoints & { index: number };

// Create a LineChart variant which uses these default styles and this styled subcomponent.
/**
 * Linechart component
 * {@docCategory LineChart}
 */
export const LineChart: React.FunctionComponent<LineChartProps> = React.forwardRef<HTMLDivElement, LineChartProps>(
  (props, forwardedRef) => {
    let _hasMarkersMode: boolean = false;
    let _isXAxisDateType: boolean = false;
    let _isScatterPolar: boolean = false;
    let _points: LineChartDataWithIndex[] = _injectIndexPropertyInLineChartData(props.data.lineChartData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _calloutPoints: any[] = calloutData(_points) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _xAxisScale: any = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _yScalePrimary: any = '';
    let _circleId: string = useId('circle');
    let _lineId: string = useId('lineID');
    let _borderId: string = useId('borderID');
    let _verticalLine: string = useId('verticalLine');
    let _colorFillBarPatternId: string = useId('colorFillBarPattern');
    let _uniqueCallOutID: string | null = '';
    let _refArray: RefArrayData[] = [];
    let margins: Margins;
    let eventLabelHeight: number = 36;
    let lines: JSXElement[];
    let _renderedColorFillBars: JSXElement[];
    const _colorFillBars = React.useRef<ColorFillBarsProps[]>([]);
    let _tooltipId: string = useId('LineChartTooltipId_');
    let _rectId: string = useId('containerRectLD');
    let _staticHighlightCircle: string = useId('staticHighlightCircle');
    let _firstRenderOptimization = true;
    let _emptyChartId: string = useId('_LineChart_empty');
    const _colorFillBarId = useId('_colorFillBarId');
    const _isRTL: boolean = useRtl();
    let xAxisCalloutAccessibilityData: AccessibilityProps = {};
    const cartesianChartRef = React.useRef<Chart>(null);
    let _yScaleSecondary: ScaleLinear<number, number> | undefined;
    const _legendsRef = React.useRef<LegendContainer>(null);

    props.eventAnnotationProps &&
      props.eventAnnotationProps.labelHeight &&
      (eventLabelHeight = props.eventAnnotationProps.labelHeight);

    const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
    const [activeLegend, setActiveLegend] = React.useState<string>('');
    const [YValueHover, setYValueHover] = React.useState<[]>([]);
    const [selectedLegend, setSelectedLegend] = React.useState<string>('');
    const [selectedLegendPoints, setSelectedLegendPoints] = React.useState<any[]>(
      _injectIndexPropertyInLineChartData(props.data.lineChartData, true),
    );
    const [selectedColorBarLegend, setSelectedColorBarLegend] = React.useState<any[]>([]);
    const [isSelectedLegend, setIsSelectedLegend] = React.useState<boolean>(
      (props.legendProps?.selectedLegends?.length ?? 0) > 0,
    );
    const [activePoint, setActivePoint] = React.useState<string>('');
    const [nearestCircleToHighlight, setNearestCircleToHighlight] = React.useState<LineChartDataPoint | null>(null);
    const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<CustomizedCalloutData>();
    const [stackCalloutProps, setStackCalloutProps] = React.useState<CustomizedCalloutData>();
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);
    const [YValue, setYValue] = React.useState<number | string>('');
    const [legendVal, setLegendVal] = React.useState<string>('');
    const [lineColor, setLineColor] = React.useState<string>('');

    const pointsRef = React.useRef<LineChartDataWithIndex[] | []>([]);
    const calloutPointsRef = React.useRef<any[]>([]);
    const classes = useLineChartStyles(props);
    React.useEffect(() => {
      /** note that height and width are not used to resize or set as dimesions of the chart,
       * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
       */

      if (_points !== _injectIndexPropertyInLineChartData(props.data.lineChartData) || props.data !== _points) {
        pointsRef.current = _injectIndexPropertyInLineChartData(props.data.lineChartData);
        calloutPointsRef.current = calloutData(pointsRef.current);
      }
    }, [props.height, props.width, props.data]);

    React.useImperativeHandle(
      props.componentRef,
      () => ({
        chartContainer: cartesianChartRef.current?.chartContainer ?? null,
        toImage: (opts?: ImageExportOptions): Promise<string> => {
          return toImage(cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, _isRTL, opts);
        },
      }),
      [],
    );

    function _getDomainNRangeValues(
      points: LineChartPoints[],
      margins: Margins,
      width: number,
      chartType: ChartTypes,
      isRTL: boolean,
      xAxisType: XAxisTypes,
      barWidth: number,
      tickValues: Date[] | number[] | undefined,
      shiftX: number,
    ) {
      let domainNRangeValue: IDomainNRange;
      if (xAxisType === XAxisTypes.NumericAxis) {
        domainNRangeValue = domainRangeOfNumericForAreaLineScatterCharts(
          points,
          margins,
          width,
          isRTL,
          props.xScaleType,
          _hasMarkersMode,
        );
      } else if (xAxisType === XAxisTypes.DateAxis) {
        domainNRangeValue = domainRangeOfDateForAreaLineScatterVerticalBarCharts(
          points,
          margins,
          width,
          isRTL,
          tickValues! as Date[],
          chartType,
          barWidth,
          _hasMarkersMode,
        );
      } else {
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
      }
      return domainNRangeValue;
    }

    function _injectIndexPropertyInLineChartData(
      lineChartData?: LineChartPoints[],
      isFilterSelectedLegends: boolean = false,
    ): LineChartDataWithIndex[] | [] {
      const { allowMultipleShapesForPoints = false } = props;
      // Apply filter only if isPropChange is true
      const filteredData = isFilterSelectedLegends
        ? lineChartData?.filter(
            (item: LineChartPoints) =>
              props.legendProps?.selectedLegends?.includes(item.legend) ||
              props.legendProps?.selectedLegend === item.legend,
          )
        : lineChartData;
      _hasMarkersMode =
        filteredData?.some((item: LineChartPoints) => item.lineOptions?.mode?.includes?.('markers')) ?? false;
      _isScatterPolar = isScatterPolarSeries(filteredData!);
      return filteredData
        ? filteredData.map((item: LineChartPoints, index: number) => {
            let color: string;
            if (typeof item.color === 'undefined') {
              color = getNextColor(index, 0);
            } else {
              color = getColorFromToken(item.color);
            }
            return {
              ...item,
              index: allowMultipleShapesForPoints ? index : -1,
              color,
            };
          })
        : [];
    }

    function updatePosition(newX: number, newY: number) {
      const threshold = 1; // Set a threshold for movement
      const { x, y } = clickPosition;
      // Calculate the distance moved
      const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
      // Update the position only if the distance moved is greater than the threshold
      if (distance > threshold) {
        setClickPosition({ x: newX, y: newY });
        setPopoverOpen(true);
      }
    }

    function _getCustomizedCallout() {
      return props.onRenderCalloutPerStack
        ? props.onRenderCalloutPerStack(stackCalloutProps)
        : props.onRenderCalloutPerDataPoint
        ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps)
        : null;
    }

    function _getNumericMinMaxOfY(
      points: LineChartPoints[],
      yAxisType?: YAxisType,
      useSecondaryYScale?: boolean,
    ): { startValue: number; endValue: number } {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { startValue, endValue } = findNumericMinMaxOfY(
        points,
        yAxisType,
        useSecondaryYScale,
        useSecondaryYScale ? props.secondaryYScaleType : props.yScaleType,
      );
      let yPadding = { start: 0, end: 0 };
      if (_hasMarkersMode) {
        yPadding = getDomainPaddingForMarkers(
          startValue,
          endValue,
          useSecondaryYScale ? props.secondaryYScaleType : props.yScaleType,
        );
      }
      return {
        startValue: startValue - yPadding.start,
        endValue: endValue + yPadding.end,
      };
    }

    function _getMargins(_margins: Margins) {
      margins = _margins;
    }

    function _initializeLineChartData(
      xScale: NumericAxis,
      yScalePrimary: NumericAxis,
      containerHeight: number,
      containerWidth: number,
      xElement: SVGElement | null,
      yAxisElement?: SVGElement | null,
      yScaleSecondary?: ScaleLinear<number, number>,
    ) {
      _xAxisScale = xScale;
      _yScalePrimary = yScalePrimary;
      _yScaleSecondary = yScaleSecondary;
      _renderedColorFillBars = props.colorFillBars ? _createColorFillBars(containerHeight) : [];
      lines = _createLines(xElement!, containerHeight!);
    }

    function _handleSingleLegendSelectionAction(lineChartItem: LineChartDataWithIndex | ColorFillBarsProps) {
      if (selectedLegend === lineChartItem.legend) {
        setSelectedLegend('');
        _handleLegendClick(lineChartItem, null);
      } else {
        setSelectedLegend(lineChartItem.legend);
        _handleLegendClick(lineChartItem, lineChartItem.legend);
      }
    }

    function _onHoverCardHide() {
      setSelectedLegendPoints([]);
      setSelectedColorBarLegend([]);
      setIsSelectedLegend(false);
    }

    function _handleLegendClick(
      lineChartItem: LineChartDataWithIndex | ColorFillBarsProps,
      selectedLegend: string | null | string[],
    ): void {
      if (lineChartItem.onLegendClick) {
        lineChartItem.onLegendClick(selectedLegend);
      }
    }

    function _createLegends(data: LineChartDataWithIndex[]): JSXElement {
      const { legendProps, allowMultipleShapesForPoints = false } = props;
      const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
      const mapLegendToPoints: Record<string, LineChartDataWithIndex[]> = {};
      data.forEach((point: LineChartDataWithIndex) => {
        if (point.legend) {
          if (!mapLegendToPoints[point.legend]) {
            mapLegendToPoints[point.legend] = [];
          }
          mapLegendToPoints[point.legend].push(point);
        }
      });
      const legendDataItems: Legend[] = Object.entries(mapLegendToPoints).map(([legendTitle, points]) => {
        const representativePoint = points[0];
        // mapping data to the format Legends component needs
        const legend: Legend = {
          title: legendTitle,
          color: representativePoint.color!,
          action: () => {
            if (isLegendMultiSelectEnabled) {
              points.forEach(p => _handleMultipleLineLegendSelectionAction(p));
            } else {
              points.forEach(p => _handleSingleLegendSelectionAction(p));
            }
          },
          onMouseOutAction: () => {
            setActiveLegend('');
          },
          hoverAction: () => {
            _handleChartMouseLeave();
            setActiveLegend(legendTitle);
          },
          ...(representativePoint.legendShape && {
            shape: representativePoint.legendShape,
          }),
          ...(allowMultipleShapesForPoints && {
            shape: Points[representativePoint.index % Object.keys(pointTypes).length] as Legend['shape'],
          }),
        };
        return legend;
      });

      const colorFillBarsLegendDataItems = props.colorFillBars
        ? props.colorFillBars.map((colorFillBar: ColorFillBarsProps, index: number) => {
            const title = colorFillBar.legend;
            const color = getColorFromToken(colorFillBar.color);
            const legend: Legend = {
              title,
              color,
              action: () => {
                if (isLegendMultiSelectEnabled) {
                  _handleMultipleColorFillBarLegendSelectionAction(colorFillBar);
                } else {
                  _handleSingleLegendSelectionAction(colorFillBar);
                }
              },
              onMouseOutAction: () => {
                setActiveLegend('');
              },
              hoverAction: () => {
                _handleChartMouseLeave();
                setActiveLegend(title);
              },
              opacity: _getColorFillBarOpacity(colorFillBar),
              stripePattern: colorFillBar.applyPattern,
            };
            return legend;
          })
        : [];

      return (
        <Legends
          legends={[...legendDataItems, ...colorFillBarsLegendDataItems]}
          enabledWrapLines={props.enabledLegendsWrapLines}
          overflowText={props.legendsOverflowText}
          {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: _onHoverCardHide })}
          {...props.legendProps}
          legendRef={_legendsRef}
        />
      );
    }

    function _getBoxWidthOfShape(pointId: string, pointIndex: number, isLastPoint: boolean) {
      const { allowMultipleShapesForPoints = false, strokeWidth = DEFAULT_LINE_STROKE_SIZE } = props;
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
    }

    function _getPath(
      xPos: number,
      yPos: number,
      pointId: string,
      pointIndex: number,
      isLastPoint: boolean,
      pointOftheLine: number,
    ): string {
      const { allowMultipleShapesForPoints = false } = props;
      let w = _getBoxWidthOfShape(pointId, pointIndex, isLastPoint);
      const index: number = allowMultipleShapesForPoints ? pointOftheLine % Object.keys(pointTypes).length : 0;
      const widthRatio = pointTypes[index].widthRatio;
      w = widthRatio > 1 ? w / widthRatio : w;

      return _getPointPath(xPos, yPos, w, index);
    }
    function _getPointFill(lineColor: string, pointId: string, pointIndex: number, isLastPoint: boolean) {
      const { allowMultipleShapesForPoints = false } = props;
      if (allowMultipleShapesForPoints) {
        if (pointIndex === 1 || isLastPoint) {
          if (activePoint === pointId) {
            return tokens.colorNeutralBackground1;
          } else {
            return lineColor;
          }
        } else {
          if (activePoint === pointId) {
            return tokens.colorNeutralBackground1;
          } else {
            return lineColor;
          }
        }
      } else {
        if (activePoint === pointId) {
          return tokens.colorNeutralBackground1;
        } else {
          return lineColor;
        }
      }
    }

    function _createLines(xElement: SVGElement, containerHeight: number): JSXElement[] {
      const lines: JSXElement[] = [];
      if (isSelectedLegend) {
        _points = selectedLegendPoints;
      } else {
        _points = _injectIndexPropertyInLineChartData(props.data.lineChartData);
      }
      const maxMarkerSize = d3Max(_points, (point: LineChartPoints) => {
        return d3Max(point.data, (item: LineChartDataPoint) => {
          return item.markerSize as number;
        });
      })!;
      for (let i = _points.length - 1; i >= 0; i--) {
        const linesForLine: JSXElement[] = [];
        const bordersForLine: JSXElement[] = [];
        const pointsForLine: JSXElement[] = [];

        const legendVal: string = _points[i].legend;
        const lineColor: string = _points[i].color!;
        const verticaLineHeight = containerHeight - margins.bottom! + 6;
        const useSecondaryYScale = !!(_points[i].useSecondaryYScale && _yScaleSecondary);
        const yScale = useSecondaryYScale ? _yScaleSecondary : _yScalePrimary;
        const extraMaxPixels = _hasMarkersMode
          ? getRangeForScatterMarkerSize({
              data: _points,
              xScale: _xAxisScale,
              yScalePrimary: _yScalePrimary,
              yScaleSecondary: _yScaleSecondary,
              useSecondaryYScale,
              xScaleType: props.xScaleType,
              yScaleType: props.yScaleType,
              secondaryYScaleType: props.secondaryYScaleType,
            })
          : 0;
        if (_points[i].data.length === 1) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const {
            x: x1,
            y: y1,
            xAxisCalloutData,
            xAxisCalloutAccessibilityData,
          } = _points[i].data[0] as LineChartDataPoint;
          const xPoint = _xAxisScale(x1);
          const yPoint = yScale(y1);
          if (isPlottable(xPoint, yPoint)) {
            const circleId = `${_circleId}_${i}`;
            const isLegendSelected: boolean =
              _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;
            const currentMarkerSize = _points[i].data[0].markerSize!;
            const supportsTextMode = _points[i].lineOptions?.mode?.includes('text');
            const text = _points[i].data[0].text;
            pointsForLine.push(
              <>
                <React.Fragment key={`${circleId}_fragment`}>
                  <circle
                    id={circleId}
                    key={circleId}
                    r={
                      currentMarkerSize
                        ? (currentMarkerSize! * extraMaxPixels) / maxMarkerSize
                        : activePoint === circleId
                        ? 5.5
                        : 3.5
                    }
                    cx={xPoint}
                    cy={yPoint}
                    fill={activePoint === circleId ? tokens.colorNeutralBackground1 : lineColor}
                    opacity={isLegendSelected ? 1 : 0.1}
                    tabIndex={isLegendSelected ? 0 : undefined}
                    onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                      _handleHover(
                        x1,
                        y1,
                        verticaLineHeight,
                        xAxisCalloutData,
                        circleId,
                        xAxisCalloutAccessibilityData,
                        event,
                        yScale,
                        legendVal,
                        lineColor,
                      )
                    }
                    onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                      _handleHover(
                        x1,
                        y1,
                        verticaLineHeight,
                        xAxisCalloutData,
                        circleId,
                        xAxisCalloutAccessibilityData,
                        event,
                        yScale,
                        legendVal,
                        lineColor,
                      )
                    }
                    onMouseOut={_handleMouseOut}
                    strokeWidth={activePoint === circleId ? DEFAULT_LINE_STROKE_SIZE : 0}
                    stroke={activePoint === circleId ? lineColor : ''}
                    role="img"
                    aria-label={_points[i].data[0].text ?? _getAriaLabel(i, 0)}
                    data-is-focusable={isLegendSelected}
                    ref={(e: SVGCircleElement | null) => {
                      _refCallback(e!, circleId);
                    }}
                    onFocus={event =>
                      _handleFocus(event, circleId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)
                    }
                    onBlur={_handleMouseOut}
                    {..._getClickHandler(_points[i].data[0].onDataPointClick)}
                  />
                  {!_isScatterPolar && supportsTextMode && text && (
                    <text
                      key={`${circleId}-label`}
                      x={xPoint}
                      y={
                        yPoint +
                        Math.max(currentMarkerSize ? (currentMarkerSize * extraMaxPixels) / maxMarkerSize : 3.5, 4) +
                        12
                      }
                      className={classes.markerLabel}
                      opacity={isLegendSelected ? 1 : 0.1}
                    >
                      {text}
                    </text>
                  )}
                </React.Fragment>
              </>,
            );
          }
        }

        let gapIndex = 0;
        const gaps = _points[i].gaps?.sort((a, b) => a.startIndex - b.startIndex) ?? [];
        const lineCurve = _points[i].lineOptions?.curve;

        // Use path rendering technique for larger datasets to optimize performance.
        if ((props.optimizeLargeData || lineCurve) && _points[i].data.length > 1) {
          const line = d3Line()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .x((d: any) => _xAxisScale(d[0]))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .y((d: any) => yScale(d[1]))
            .curve(getCurveFactory(lineCurve))
            .defined(d => isPlottable(_xAxisScale(d[0]), yScale(d[1])));

          const lineId = `${_lineId}_${i}`;
          const borderId = `${_borderId}_${i}`;
          const strokeWidth = _points[i].lineOptions?.strokeWidth || props.strokeWidth || DEFAULT_LINE_STROKE_SIZE;

          const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

          const lineData: [number, number][] = [];
          for (let k = 0; k < _points[i].data.length; k++) {
            lineData.push([
              _points[i].data[k].x instanceof Date
                ? (_points[i].data[k].x as Date).getTime()
                : (_points[i].data[k].x as number),
              _points[i].data[k].y,
            ]);
          }

          if (isLegendSelected) {
            const lineBorderWidth = _points[i].lineOptions?.lineBorderWidth
              ? Number.parseFloat(_points[i].lineOptions!.lineBorderWidth!.toString())
              : 0;
            if (lineBorderWidth > 0) {
              bordersForLine.push(
                <path
                  id={borderId}
                  key={borderId}
                  d={line(lineData)!}
                  fill="transparent"
                  strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                  strokeWidth={Number.parseFloat(strokeWidth.toString()) + lineBorderWidth}
                  stroke={_points[i].lineOptions?.lineBorderColor || tokens.colorNeutralBackground1}
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
                strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                strokeDasharray={_points[i].lineOptions?.strokeDasharray}
                onMouseMove={event => _onMouseOverLargeDataset(i, verticaLineHeight, event, yScale)}
                onMouseOver={event => _onMouseOverLargeDataset(i, verticaLineHeight, event, yScale)}
                onMouseOut={_handleMouseOut}
                {..._getClickHandler(_points[i].onLineClick)}
                opacity={1}
                tabIndex={isLegendSelected ? 0 : undefined}
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
                strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                strokeDasharray={_points[i].lineOptions?.strokeDasharray}
                opacity={0.1}
              />,
            );
          }
          pointsForLine.push(
            <circle
              id={`${_staticHighlightCircle}_${i}`}
              key={`${_staticHighlightCircle}_${i}`}
              r={5.5}
              cx={0}
              cy={0}
              fill={tokens.colorNeutralBackground1}
              strokeWidth={DEFAULT_LINE_STROKE_SIZE}
              stroke={lineColor}
              visibility={'hidden'}
              onMouseMove={event => _onMouseOverLargeDataset(i, verticaLineHeight, event, yScale)}
              onMouseOver={event => _onMouseOverLargeDataset(i, verticaLineHeight, event, yScale)}
              onMouseOut={_handleMouseOut}
            />,
          );
        } else if (!props.optimizeLargeData) {
          for (let j = 1; j < _points[i].data.length; j++) {
            const gapResult = _checkInGap(j, gaps, gapIndex);
            const isInGap = gapResult.isInGap;
            gapIndex = gapResult.gapIndex;

            const lineId = `${_lineId}_${i}_${j}`;
            const borderId = `${_borderId}_${i}_${j}`;
            const circleId = `${_circleId}_${i}_${j}`;
            const {
              x: x1,
              y: y1,
              xAxisCalloutData,
              xAxisCalloutAccessibilityData,
            } = _points[i].data[j - 1] as LineChartDataPoint;
            const { x: x2, y: y2 } = _points[i].data[j] as LineChartDataPoint;
            const xPoint1 = _xAxisScale(x1);
            const yPoint1 = yScale(y1);
            const xPoint2 = _xAxisScale(x2);
            const yPoint2 = yScale(y2);
            const strokeWidth = _points[i].lineOptions?.strokeWidth || props.strokeWidth || DEFAULT_LINE_STROKE_SIZE;

            const isLegendSelected: boolean =
              _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

            const currentPointHidden = _points[i].hideNonActiveDots && activePoint !== circleId;
            const supportsTextMode = _points[i].lineOptions?.mode?.includes('text');
            const text = _points[i].data[j - 1].text;
            let currentMarkerSize = _points[i].data[j - 1].markerSize!;
            if (isPlottable(xPoint1, yPoint1)) {
              const path = _getPath(xPoint1, yPoint1, circleId, j, false, _points[i].index);
              pointsForLine.push(
                _points[i].lineOptions?.mode?.includes('markers') || supportsTextMode ? (
                  <>
                    <circle
                      id={circleId}
                      key={circleId}
                      r={currentMarkerSize ? (currentMarkerSize! * extraMaxPixels) / maxMarkerSize : 4}
                      cx={xPoint1}
                      cy={yPoint1}
                      data-is-focusable={isLegendSelected}
                      onMouseOver={event =>
                        _handleHover(
                          x1,
                          y1,
                          verticaLineHeight,
                          xAxisCalloutData,
                          circleId,
                          xAxisCalloutAccessibilityData,
                          event,
                          yScale,
                          legendVal,
                          lineColor,
                        )
                      }
                      onMouseMove={event =>
                        _handleHover(
                          x1,
                          y1,
                          verticaLineHeight,
                          xAxisCalloutData,
                          circleId,
                          xAxisCalloutAccessibilityData,
                          event,
                          yScale,
                          legendVal,
                          lineColor,
                        )
                      }
                      onMouseOut={_handleMouseOut}
                      onFocus={event =>
                        _handleFocus(event, lineId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)
                      }
                      onBlur={_handleMouseOut}
                      {..._getClickHandler(_points[i].data[j - 1].onDataPointClick)}
                      opacity={isLegendSelected && !currentPointHidden ? 1 : 0.01}
                      fill={_getPointFill(lineColor, circleId, j, false)}
                      stroke={lineColor}
                      strokeWidth={strokeWidth}
                      role="img"
                      aria-label={_points[i].data[j - 1].text ?? _getAriaLabel(i, j - 1)}
                    />
                    {!_isScatterPolar && supportsTextMode && text && (
                      <text
                        key={`${circleId}-label`}
                        x={xPoint1}
                        y={
                          yPoint1 +
                          Math.max(currentMarkerSize ? (currentMarkerSize * extraMaxPixels) / maxMarkerSize : 4, 4) +
                          12
                        }
                        className={classes.markerLabel}
                        opacity={isLegendSelected && !currentPointHidden ? 1 : 0.01}
                      >
                        {text}
                      </text>
                    )}
                  </>
                ) : (
                  <path
                    id={circleId}
                    key={circleId}
                    d={path}
                    data-is-focusable={isLegendSelected}
                    onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                      _handleHover(
                        x1,
                        y1,
                        verticaLineHeight,
                        xAxisCalloutData,
                        circleId,
                        xAxisCalloutAccessibilityData,
                        event,
                        yScale,
                        legendVal,
                        lineColor,
                      )
                    }
                    onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                      _handleHover(
                        x1,
                        y1,
                        verticaLineHeight,
                        xAxisCalloutData,
                        circleId,
                        xAxisCalloutAccessibilityData,
                        event,
                        yScale,
                        legendVal,
                        lineColor,
                      )
                    }
                    onMouseOut={_handleMouseOut}
                    onFocus={event =>
                      _handleFocus(event, lineId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)
                    }
                    onBlur={_handleMouseOut}
                    {..._getClickHandler(_points[i].data[j - 1].onDataPointClick)}
                    opacity={isLegendSelected && !currentPointHidden ? 1 : 0.01}
                    fill={_getPointFill(lineColor, circleId, j, false)}
                    stroke={lineColor}
                    strokeWidth={strokeWidth}
                    role="img"
                    aria-label={_getAriaLabel(i, j - 1)}
                    tabIndex={isLegendSelected ? 0 : undefined}
                  />
                ),
              );
            }
            if (j + 1 === _points[i].data.length) {
              // If this is last point of the line segment.
              const lastCircleId = `${circleId}${j}L`;
              const hiddenHoverCircleId = `${circleId}${j}D`;
              const lastPointHidden = _points[i].hideNonActiveDots && activePoint !== lastCircleId;
              const {
                xAxisCalloutData: lastCirlceXCallout,
                xAxisCalloutAccessibilityData: lastCirlceXCalloutAccessibilityData,
              } = _points[i].data[j];
              currentMarkerSize = _points[i].data[j].markerSize!;
              const lastSupportsTextMode = _points[i].lineOptions?.mode?.includes('text');
              const lastText = _points[i].data[j].text;
              if (isPlottable(xPoint2, yPoint2)) {
                const path = _getPath(xPoint2, yPoint2, lastCircleId, j, true, _points[i].index);
                pointsForLine.push(
                  <React.Fragment key={`${lastCircleId}_container`}>
                    {_points[i].lineOptions?.mode?.includes('markers') || lastSupportsTextMode ? (
                      <>
                        <circle
                          id={lastCircleId}
                          key={lastCircleId}
                          r={currentMarkerSize ? (currentMarkerSize! * extraMaxPixels) / maxMarkerSize : 4}
                          cx={xPoint2}
                          cy={yPoint2}
                          data-is-focusable={isLegendSelected}
                          onMouseOver={event =>
                            _handleHover(
                              x2,
                              y2,
                              verticaLineHeight,
                              lastCirlceXCallout,
                              lastCircleId,
                              lastCirlceXCalloutAccessibilityData,
                              event,
                              yScale,
                              legendVal,
                              lineColor,
                            )
                          }
                          onMouseMove={event =>
                            _handleHover(
                              x2,
                              y2,
                              verticaLineHeight,
                              lastCirlceXCallout,
                              lastCircleId,
                              lastCirlceXCalloutAccessibilityData,
                              event,
                              yScale,
                              legendVal,
                              lineColor,
                            )
                          }
                          onMouseOut={_handleMouseOut}
                          onFocus={event =>
                            _handleFocus(
                              event,
                              lineId,
                              x2,
                              lastCirlceXCallout,
                              lastCircleId,
                              lastCirlceXCalloutAccessibilityData,
                            )
                          }
                          onBlur={_handleMouseOut}
                          {..._getClickHandler(_points[i].data[j].onDataPointClick)}
                          opacity={isLegendSelected && !lastPointHidden ? 1 : 0.01}
                          fill={_getPointFill(lineColor, lastCircleId, j, true)}
                          stroke={lineColor}
                          strokeWidth={strokeWidth}
                          role="img"
                          aria-label={_points[i].data[j].text ?? _getAriaLabel(i, j)}
                        />
                        {!_isScatterPolar && lastSupportsTextMode && lastText && (
                          <text
                            key={`${lastCircleId}-label`}
                            x={xPoint2}
                            y={
                              yPoint2 +
                              Math.max(
                                currentMarkerSize ? (currentMarkerSize * extraMaxPixels) / maxMarkerSize : 4,
                                4,
                              ) +
                              12
                            }
                            className={classes.markerLabel}
                          >
                            {text}
                          </text>
                        )}
                      </>
                    ) : (
                      <path
                        id={lastCircleId}
                        key={lastCircleId}
                        d={path}
                        data-is-focusable={isLegendSelected}
                        onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                          _handleHover(
                            x2,
                            y2,
                            verticaLineHeight,
                            lastCirlceXCallout,
                            lastCircleId,
                            lastCirlceXCalloutAccessibilityData,
                            event,
                            yScale,
                            legendVal,
                            lineColor,
                          )
                        }
                        onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                          _handleHover(
                            x2,
                            y2,
                            verticaLineHeight,
                            lastCirlceXCallout,
                            lastCircleId,
                            lastCirlceXCalloutAccessibilityData,
                            event,
                            yScale,
                            legendVal,
                            lineColor,
                          )
                        }
                        onMouseOut={_handleMouseOut}
                        onFocus={event =>
                          _handleFocus(
                            event,
                            lineId,
                            x2,
                            lastCirlceXCallout,
                            lastCircleId,
                            lastCirlceXCalloutAccessibilityData,
                          )
                        }
                        onBlur={_handleMouseOut}
                        {..._getClickHandler(_points[i].data[j].onDataPointClick)}
                        opacity={isLegendSelected && !lastPointHidden ? 1 : 0.01}
                        fill={_getPointFill(lineColor, lastCircleId, j, true)}
                        stroke={lineColor}
                        strokeWidth={strokeWidth}
                        role="img"
                        aria-label={_getAriaLabel(i, j)}
                        tabIndex={isLegendSelected ? 0 : undefined}
                      />
                    )}
                    {/* Dummy circle acting as magnetic latch for last callout point */}
                    <circle
                      id={hiddenHoverCircleId}
                      key={hiddenHoverCircleId}
                      r={8}
                      cx={xPoint2}
                      cy={yPoint2}
                      opacity={0}
                      width={0}
                      onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                        _handleHover(
                          x2,
                          y2,
                          verticaLineHeight,
                          lastCirlceXCallout,
                          lastCircleId,
                          lastCirlceXCalloutAccessibilityData,
                          event,
                          yScale,
                          legendVal,
                          lineColor,
                        )
                      }
                      onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                        _handleHover(
                          x2,
                          y2,
                          verticaLineHeight,
                          lastCirlceXCallout,
                          lastCircleId,
                          lastCirlceXCalloutAccessibilityData,
                          event,
                          yScale,
                          legendVal,
                          lineColor,
                        )
                      }
                      onMouseOut={_handleMouseOut}
                      strokeWidth={0}
                      focusable={false}
                      onBlur={_handleMouseOut}
                    />
                  </React.Fragment>,
                );
              }
            }

            if (
              isPlottable(xPoint1, yPoint1) &&
              isPlottable(xPoint2, yPoint2) &&
              (!_hasMarkersMode || _points[i].lineOptions?.mode?.includes('lines'))
            ) {
              if (isLegendSelected) {
                // don't draw line if it is in a gap
                if (!isInGap) {
                  const lineBorderWidth = _points[i].lineOptions?.lineBorderWidth
                    ? Number.parseFloat(_points[i].lineOptions!.lineBorderWidth!.toString())
                    : 0;
                  if (lineBorderWidth > 0) {
                    bordersForLine.push(
                      <line
                        id={borderId}
                        key={borderId}
                        x1={xPoint1}
                        y1={yPoint1}
                        x2={xPoint2}
                        y2={yPoint2}
                        strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                        strokeWidth={Number.parseFloat(strokeWidth.toString()) + lineBorderWidth}
                        stroke={_points[i].lineOptions?.lineBorderColor || tokens.colorNeutralBackground1}
                        opacity={1}
                      />,
                    );
                  }

                  linesForLine.push(
                    <line
                      id={lineId}
                      key={lineId}
                      x1={xPoint1}
                      y1={yPoint1}
                      x2={xPoint2}
                      y2={yPoint2}
                      strokeWidth={strokeWidth}
                      ref={(e: SVGLineElement | null) => {
                        _refCallback(e!, lineId);
                      }}
                      onMouseOver={event =>
                        _handleHover(
                          x1,
                          y1,
                          verticaLineHeight,
                          xAxisCalloutData,
                          circleId,
                          xAxisCalloutAccessibilityData,
                          event,
                          yScale,
                          legendVal,
                          lineColor,
                        )
                      }
                      onMouseMove={event =>
                        _handleHover(
                          x1,
                          y1,
                          verticaLineHeight,
                          xAxisCalloutData,
                          circleId,
                          xAxisCalloutAccessibilityData,
                          event,
                          yScale,
                          legendVal,
                          lineColor,
                        )
                      }
                      onMouseOut={_handleMouseOut}
                      stroke={lineColor}
                      strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                      strokeDasharray={_points[i].lineOptions?.strokeDasharray}
                      strokeDashoffset={_points[i].lineOptions?.strokeDashoffset}
                      opacity={1}
                      {..._getClickHandler(_points[i].onLineClick)}
                    />,
                  );
                }
              } else {
                if (!isInGap) {
                  linesForLine.push(
                    <line
                      id={lineId}
                      key={lineId}
                      x1={xPoint1}
                      y1={yPoint1}
                      x2={xPoint2}
                      y2={yPoint2}
                      strokeWidth={strokeWidth}
                      stroke={lineColor}
                      strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                      strokeDasharray={_points[i].lineOptions?.strokeDasharray}
                      strokeDashoffset={_points[i].lineOptions?.strokeDashoffset}
                      opacity={0.1}
                    />,
                  );
                }
              }
            }
          }
        }

        if (_isScatterPolar) {
          pointsForLine.push(
            ...renderScatterPolarCategoryLabels({
              xAxisScale: _xAxisScale,
              yAxisScale: yScale,
              className: classes.markerLabel || '',
              lineOptions: (_points[i] as Partial<LineChartPoints>)?.lineOptions,
            }),
          );
        }

        lines.push(
          <g
            key={`line_${i}`}
            role="region"
            aria-label={`${legendVal}, line ${i + 1} of ${_points.length} with ${_points[i].data.length} data points.`}
          >
            {bordersForLine}
            {linesForLine}
            {pointsForLine}
          </g>,
        );
      }
      // Removing un wanted tooltip div from DOM, when prop not provided.
      if (!props.showXAxisLablesTooltip) {
        try {
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      // Used to display tooltip at x axis labels.
      if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
        const xAxisElement = d3Select(xElement).call(_xAxisScale);
        try {
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          // eslint-disable-next-line no-empty
        } catch (e) {}
        const tooltipProps = {
          tooltipCls: classes.tooltip!,
          id: _tooltipId,
          axis: xAxisElement,
        };
        xAxisElement && tooltipOfAxislabels(tooltipProps);
      }
      return lines;
    }

    function _createColorFillBars(containerHeight: number) {
      const colorFillBars: JSXElement[] = [];
      if (isSelectedLegend) {
        _colorFillBars.current = selectedColorBarLegend;
      } else {
        _colorFillBars.current = props.colorFillBars!;
      }

      const yMinMaxValues = findNumericMinMaxOfY(_points);
      const FILL_Y_PADDING = 3;
      for (let i = 0; i < _colorFillBars.current.length; i++) {
        const colorFillBar = _colorFillBars.current[i];
        const colorFillBarId = `${_colorFillBarId}-${i}`;
        const color = getColorFromToken(colorFillBar.color);

        if (colorFillBar.applyPattern) {
          // Using a pattern element because CSS was unable to render diagonal stripes for rect elements
          colorFillBars.push(_getStripePattern(color, i));
        }

        for (let j = 0; j < colorFillBar.data.length; j++) {
          const startX = colorFillBar.data[j].startX;
          const endX = colorFillBar.data[j].endX;
          const opacity =
            _legendHighlighted(colorFillBar.legend) || _noLegendHighlighted() || isSelectedLegend
              ? _getColorFillBarOpacity(colorFillBar)
              : 0.1;
          colorFillBars.push(
            <rect
              fill={colorFillBar.applyPattern ? `url(#${_colorFillBarPatternId}_${i})` : color}
              fillOpacity={opacity}
              x={_isRTL ? _xAxisScale(endX) : _xAxisScale(startX)}
              y={_yScalePrimary(yMinMaxValues.endValue) - FILL_Y_PADDING}
              width={Math.abs(_xAxisScale(endX) - _xAxisScale(startX))}
              height={_yScalePrimary(props.yMinValue || 0) - _yScalePrimary(yMinMaxValues.endValue) + FILL_Y_PADDING}
              key={`${colorFillBarId}${j}`}
            />,
          );
        }
      }
      return colorFillBars;
    }

    function _getStripePattern(color: string, id: number) {
      // This describes a tile pattern that resembles diagonal stripes
      // For more information: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
      const stripePath = 'M-4,4 l8,-8 M0,16 l16,-16 M12,20 l8,-8';
      return (
        <pattern
          id={`${_colorFillBarPatternId}_${id}`}
          width={16}
          height={16}
          key={`${_colorFillBarPatternId}_${id}`}
          patternUnits={'userSpaceOnUse'}
        >
          <path d={stripePath} stroke={color} strokeWidth={1.25} />
        </pattern>
      );
    }

    function _checkInGap(pointIndex: number, gaps: LineChartGap[], currentGapIndex: number) {
      let gapIndex = currentGapIndex;
      let isInGap = false;

      while (gapIndex < gaps.length && pointIndex > gaps[gapIndex].endIndex) {
        gapIndex++;
      }

      if (gapIndex < gaps.length && pointIndex > gaps[gapIndex].startIndex && pointIndex <= gaps[gapIndex].endIndex) {
        isInGap = true;
      }
      return { isInGap, gapIndex };
    }

    function _refCallback(element: SVGGElement, legendTitle: string): void {
      _refArray.push({ index: legendTitle, refElement: element });
    }

    const _onMouseOverLargeDataset = (
      linenumber: number,
      lineHeight: number,
      mouseEvent: React.MouseEvent<SVGRectElement | SVGPathElement | SVGCircleElement>,
      yScale: ScaleLinear<number, number>,
    ) => {
      mouseEvent.persist();
      const { data } = props;
      const { lineChartData } = data;

      // This will get the value of the X when mouse is on the chart
      const xOffset = _xAxisScale.invert(pointer(mouseEvent)[0], document.getElementById(_rectId)!);
      const i = bisect(lineChartData![linenumber].data, xOffset);
      const d0 = lineChartData![linenumber].data[i - 1] as LineChartDataPoint;
      const d1 = lineChartData![linenumber].data[i] as LineChartDataPoint;
      let axisType: XAxisTypes | null = null;
      let xPointToHighlight: string | Date | number = 0;
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

      const { xAxisCalloutData } = lineChartData![linenumber].data[index as number];
      const formattedDate =
        xPointToHighlight instanceof Date
          ? formatDateToLocaleString(xPointToHighlight, props.culture, props.useUTC as boolean)
          : xPointToHighlight;
      const modifiedXVal = xPointToHighlight instanceof Date ? xPointToHighlight.getTime() : xPointToHighlight;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const found: any = find(_calloutPoints, (element: { x: string | number }) => {
        return element.x === modifiedXVal;
      });
      const pointToHighlight: LineChartDataPoint = lineChartData![linenumber].data[index!] as LineChartDataPoint;
      const pointToHighlightUpdated =
        nearestCircleToHighlight === null ||
        (nearestCircleToHighlight !== null &&
          pointToHighlight !== null &&
          (nearestCircleToHighlight.x !== pointToHighlight.x || nearestCircleToHighlight.y !== pointToHighlight.y));
      // if no points need to be called out then don't show vertical line and callout card
      if (found && pointToHighlightUpdated) {
        _uniqueCallOutID = `#${_staticHighlightCircle}_${linenumber}`;

        d3Select(`#${_staticHighlightCircle}_${linenumber}`)
          .attr('cx', `${_xAxisScale(pointToHighlight.x)}`)
          .attr('cy', `${yScale(pointToHighlight.y)}`)
          .attr('visibility', 'visibility');

        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale(pointToHighlight.x)}, ${yScale(pointToHighlight.y)})`)
          .attr('visibility', 'visibility')
          .attr('y2', `${lineHeight - 5 - yScale(pointToHighlight.y)}`);

        setNearestCircleToHighlight(pointToHighlight);
        updatePosition(mouseEvent.clientX, mouseEvent.clientY);
        setStackCalloutProps(found!);
        setYValueHover(found.values);
        setDataPointCalloutProps(found!);
        xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue(formattedDate);
        setActivePoint('');
      }

      if (!found) {
        setPopoverOpen(false);
        setNearestCircleToHighlight(pointToHighlight);
        setActivePoint('');
      }
    };

    function _handleFocus(
      event: React.FocusEvent<SVGCircleElement | SVGPathElement, Element>,
      lineId: string,
      x: number | Date,

      xAxisCalloutData: string | undefined,
      circleId: string,
      xAxisCalloutAccessibilityData?: AccessibilityProps,
    ) {
      let cx = 0;
      let cy = 0;

      const targetRect = (event.target as SVGCircleElement | SVGPathElement).getBoundingClientRect();
      cx = targetRect.left + targetRect.width / 2;
      cy = targetRect.top + targetRect.height / 2;
      updatePosition(cx, cy);
      _uniqueCallOutID = circleId;
      const formattedData = x instanceof Date ? formatDateToLocaleString(x, props.culture, props.useUTC as boolean) : x;
      const xVal = x instanceof Date ? x.getTime() : x;
      const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal);
      // if no points need to be called out then don't show vertical line and callout card

      if (found) {
        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale(x)}, 0)`)
          .attr('visibility', 'visibility');
        _refArray.forEach((obj: RefArrayData) => {
          if (obj.index === lineId) {
            setPopoverOpen(true);
            xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
            setYValueHover(found.values);
            setStackCalloutProps(found!);
            setDataPointCalloutProps(found!);
            setActivePoint(circleId);
          }
        });
      } else {
        setActivePoint(circleId);
      }
    }

    function _handleHover(
      x: number | Date,
      y: number | Date,
      lineHeight: number,
      xAxisCalloutData: string | undefined,
      circleId: string,
      xAxisCalloutAccessibilityData: AccessibilityProps | undefined,
      mouseEvent: React.MouseEvent<SVGElement>,
      yScale: ScaleLinear<number, number>,
      legendVal: string,
      lineColor: string,
    ) {
      mouseEvent?.persist();
      const formattedData = x instanceof Date ? formatDateToLocaleString(x, props.culture, props.useUTC as boolean) : x;
      const xVal = x instanceof Date ? x.getTime() : x;
      const yVal = y instanceof Date ? y.getTime() : y;
      const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal);
      let hoverDp: CustomizedCalloutData | undefined = undefined;

      if (props.isCalloutForStack === false && found?.values) {
        const dp = find(found.values, (val: CustomizedCalloutDataPoint) => val?.y === yVal);
        if (dp) {
          hoverDp = {
            x: xVal,
            values: [dp],
          };
        }
      }
      // if no points need to be called out then don't show vertical line and callout card

      if (found) {
        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale(x)}, ${yScale(y)})`)
          .attr('visibility', 'visibility')
          .attr('y2', `${lineHeight - 5 - yScale(y)}`);

        if (_uniqueCallOutID !== circleId) {
          _uniqueCallOutID = circleId;
          updatePosition(mouseEvent.clientX, mouseEvent.clientY);
          xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
          setYValueHover(found.values);
          setYValue(yVal);
          setLegendVal(legendVal);
          setLineColor(lineColor);
          setStackCalloutProps(found!);
          setDataPointCalloutProps(hoverDp);
          setActivePoint(circleId);
          setNearestCircleToHighlight(null);
        }
      } else {
        setActivePoint(circleId);
        setNearestCircleToHighlight(null);
      }
    }

    /**
     * Screen readers announce an element as clickable if the onClick attribute is set.
     * This function sets the attribute only when a click event handler is provided.*/

    function _getClickHandler(func?: () => void): { onClick?: () => void } {
      if (func) {
        return {
          onClick: func,
        };
      }

      return {};
    }

    function _handleMouseOut() {
      d3Select(`#${_verticalLine}`).attr('visibility', 'hidden');
    }

    function _handleChartMouseLeave() {
      _uniqueCallOutID = null;
      setActivePoint('');
      if (isPopoverOpen) {
        setPopoverOpen(false);
      }
    }

    function _handleMultipleLineLegendSelectionAction(selectedLine: LineChartDataWithIndex) {
      const selectedLineIndex = selectedLegendPoints.reduce((acc, line, index) => {
        if (acc > -1 || line.legend !== selectedLine.legend) {
          return acc;
        } else {
          return index;
        }
      }, -1);

      let selectedLines: LineChartDataWithIndex[];
      if (selectedLineIndex === -1) {
        selectedLines = [...selectedLegendPoints, selectedLine];
      } else {
        selectedLines = selectedLegendPoints
          .slice(0, selectedLineIndex)
          .concat(selectedLegendPoints.slice(selectedLineIndex + 1));
      }

      const areAllLineLegendsSelected = props.data && selectedLines.length === props.data.lineChartData!.length;

      if (
        areAllLineLegendsSelected &&
        ((props.colorFillBars && props.colorFillBars.length === selectedColorBarLegend.length) || !props.colorFillBars)
      ) {
        // Clear all legends if all legends including color fill bar legends are selected
        // Or clear all legends if all legends are selected and there are no color fill bars
        _clearMultipleLegendSelections();
      } else if (!selectedLines.length && !selectedColorBarLegend.length) {
        // Clear all legends if no legends including color fill bar legends are selected
        _clearMultipleLegendSelections();
      } else {
        // Otherwise, set state when one or more legends are selected, including color fill bar legends
        setSelectedLegendPoints(selectedLines);
        setIsSelectedLegend(true);
      }

      const selectedLegendTitlesToPass = selectedLines.map((line: LineChartDataWithIndex) => line.legend);
      _handleLegendClick(selectedLine, selectedLegendTitlesToPass);
    }

    function _handleMultipleColorFillBarLegendSelectionAction(selectedColorFillBar: ColorFillBarsProps) {
      const selectedColorFillBarIndex = selectedColorBarLegend.reduce((acc, colorFillBar, index) => {
        if (acc > -1 || colorFillBar.legend !== selectedColorFillBar.legend) {
          return acc;
        } else {
          return index;
        }
      }, -1);

      let selectedColorFillBars: ColorFillBarsProps[];
      if (selectedColorFillBarIndex === -1) {
        selectedColorFillBars = [...selectedColorBarLegend, selectedColorFillBar];
      } else {
        selectedColorFillBars = selectedColorBarLegend
          .slice(0, selectedColorFillBarIndex)
          .concat(selectedColorBarLegend.slice(selectedColorFillBarIndex + 1));
      }

      const areAllColorFillBarLegendsSelected =
        selectedColorFillBars.length === (props.colorFillBars && props.colorFillBars!.length);

      if (
        areAllColorFillBarLegendsSelected &&
        ((props.data && props.data.lineChartData!.length === selectedLegendPoints.length) || !props.data)
      ) {
        // Clear all legends if all legends, including line legends, are selected
        // Or clear all legends if all legends are selected and there is no line data
        _clearMultipleLegendSelections();
      } else if (!selectedColorFillBars.length && !selectedLegendPoints.length) {
        // Clear all legends if no legends are selected, including line legends
        _clearMultipleLegendSelections();
      } else {
        // set state when one or more legends are selected, including line legends
        setSelectedColorBarLegend(selectedColorFillBars);
        setIsSelectedLegend(true);
      }

      const selectedLegendTitlesToPass = selectedColorFillBars.map(
        (colorFillBar: ColorFillBarsProps) => colorFillBar.legend,
      );
      _handleLegendClick(selectedColorFillBar, selectedLegendTitlesToPass);
    }

    function _clearMultipleLegendSelections() {
      setSelectedColorBarLegend([]);
      setSelectedLegendPoints([]);
      setIsSelectedLegend(false);
    }

    /**
     * This function checks if the given legend is highlighted or not.
     * A legend can be highlighted in 2 ways:
     * 1. selection: if the user clicks on it
     * 2. hovering: if there is no selected legend and the user hovers over it*/

    function _legendHighlighted(legend: string) {
      return selectedLegend === legend || (selectedLegend === '' && activeLegend === legend);
    }

    /**
     * This function checks if none of the legends is selected or hovered.*/

    function _noLegendHighlighted() {
      return selectedLegend === '' && activeLegend === '';
    }

    function _getColorFillBarOpacity(colorFillBar: ColorFillBarsProps) {
      return colorFillBar.applyPattern ? 1 : 0.4;
    }

    function _getAriaLabel(lineIndex: number, pointIndex: number): string {
      const line = _points[lineIndex];
      const point = line.data[pointIndex];
      const formattedDate =
        point.x instanceof Date ? formatDateToLocaleString(point.x, props.culture, props.useUTC as boolean) : point.x;
      const xValue = point.xAxisCalloutData || formattedDate;
      const legend = line.legend;
      const yValue = point.yAxisCalloutData || point.y;
      return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
    }

    function _isChartEmpty(): boolean {
      return !(
        props.data &&
        props.data.lineChartData &&
        props.data.lineChartData.length > 0 &&
        props.data.lineChartData.filter((item: LineChartPoints) => item.data.length).length > 0
      );
    }

    const { legendProps, tickValues, tickFormat, eventAnnotationProps } = props;
    _points = _injectIndexPropertyInLineChartData(props.data.lineChartData);

    _isXAxisDateType = getXAxisType(_points);
    let points = _points;
    if (legendProps && !!legendProps.canSelectMultipleLegends) {
      points = selectedLegendPoints.length >= 1 ? selectedLegendPoints : _points;
      _calloutPoints = calloutData(points);
    }

    let legendBars = null;
    // reduce computation cost by only creating legendBars
    // if when hideLegend is false.
    // NOTE: they are rendered only when hideLegend is false in CartesianChart.
    if (!props.hideLegend) {
      legendBars = _createLegends(_points!); // ToDo: Memoize legends to improve performance.
    }
    const calloutProps = {
      YValueHover: YValueHover,
      hoverXValue: hoverXValue,
      YValue: YValue,
      legend: legendVal,
      color: lineColor,
      XValue: hoverXValue! as string,
      descriptionMessage:
        props.getCalloutDescriptionMessage && stackCalloutProps
          ? props.getCalloutDescriptionMessage(stackCalloutProps)
          : undefined,
      'data-is-focusable': true,
      xAxisCalloutAccessibilityData: xAxisCalloutAccessibilityData,
      ...props.calloutProps,
      clickPosition: clickPosition,
      isPopoverOpen: isPopoverOpen,
      isCalloutForStack: props.isCalloutForStack,
      culture: props.culture,
      isCartesian: true,
      customCallout: {
        customizedCallout: _getCustomizedCallout() !== null ? _getCustomizedCallout()! : undefined,
        customCalloutProps: props.calloutPropsPerDataPoint
          ? props.calloutPropsPerDataPoint(dataPointCalloutProps!)
          : undefined,
      },
    };
    const tickParams = {
      tickValues,
      tickFormat,
    };

    return !_isChartEmpty() ? (
      <CartesianChart
        {...props}
        chartTitle={props.data.chartTitle}
        points={points}
        chartType={ChartTypes.LineChart}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        createYAxis={createNumericYAxis}
        getmargins={_getMargins}
        getMinMaxOfYAxis={_getNumericMinMaxOfY}
        getGraphData={_initializeLineChartData}
        xAxisType={_isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
        {...(_isScatterPolar ? { yMaxValue: 1, yMinValue: -1 } : {})}
        getDomainNRangeValues={_getDomainNRangeValues}
        createStringYAxis={createStringYAxis}
        onChartMouseLeave={_handleChartMouseLeave}
        enableFirstRenderOptimization={props.enablePerfOptimization && _firstRenderOptimization}
        componentRef={cartesianChartRef}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: ChildProps) => {
          _xAxisScale = props.xScale!;
          _yScalePrimary = props.yScalePrimary!;
          _yScaleSecondary = props.yScaleSecondary;
          return (
            <>
              <g>
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={props.containerHeight}
                  stroke={'#323130'}
                  id={_verticalLine}
                  visibility={'hidden'}
                  strokeDasharray={'5,5'}
                />
                {props.optimizeLargeData ? (
                  <rect id={_rectId} width={props.containerWidth} height={props.containerHeight} fill={'transparent'} />
                ) : (
                  <></>
                )}
                <g>
                  {_renderedColorFillBars}
                  {lines}
                </g>
                {eventAnnotationProps && (
                  <EventsAnnotation
                    {...eventAnnotationProps}
                    scale={props.xScale!}
                    chartYTop={margins.top! + eventLabelHeight}
                    chartYBottom={props.containerHeight! - 35}
                  />
                )}
              </g>
            </>
          );
        }}
      />
    ) : (
      <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);
LineChart.displayName = 'LineChart';
LineChart.defaultProps = {
  isCalloutForStack: true,
};
