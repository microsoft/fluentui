/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { ILineChartProps } from './LineChart.types';
import { useLineChartStyles_unstable } from './useLineChartStyles.styles';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select, pointer } from 'd3-selection';
import { bisector } from 'd3-array';
import { ILegend, Legends } from '../Legends/index';
import { line as d3Line, curveLinear as d3curveLinear } from 'd3-shape';
import { getId, find, memoizeFunction } from '@fluentui/react/lib/Utilities';
import {
  IAccessibilityProps,
  CartesianChart,
  IBasestate,
  IChildProps,
  ILineChartPoints,
  ICustomizedCalloutData,
  IMargins,
  IRefArrayData,
  IColorFillBarsProps,
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
  getMinMaxOfYAxis,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  isRtl,
} from '../../utilities/index';
import { ForwardRefRenderFunction, ForwardedRef, PropsWithChildren } from 'react';

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

type LineChartDataWithIndex = ILineChartPoints & { index: number };

// Create a LineChart variant which uses these default styles and this styled subcomponent.
/**
 * Linechart component
 * {@docCategory LineChart}
 */
export const LineChart: React.FunctionComponent<ILineChartProps> = React.forwardRef<HTMLDivElement, ILineChartProps>(
  (props, forwardedRef) => {
    let _points: LineChartDataWithIndex[] = _injectIndexPropertyInLineChartData(props.data.lineChartData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _calloutPoints: any[] = calloutData(_points) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _xAxisScale: any = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _yAxisScale: any = '';
    let _circleId: string = getId('circle');
    let _lineId: string = getId('lineID');
    let _borderId: string = getId('borderID');
    let _verticalLine: string = getId('verticalLine');
    let _colorFillBarPatternId: string = getId('colorFillBarPattern');
    let _uniqueCallOutID: string | null = '';
    let _refArray: IRefArrayData[] = [];
    let margins: IMargins;
    let eventLabelHeight: number = 36;
    let lines: JSX.Element[];
    let _renderedColorFillBars: JSX.Element[];
    let _colorFillBars: IColorFillBarsProps[] = [];
    let _tooltipId: string = getId('LineChartTooltipId_');
    let _rectId: string = getId('containerRectLD');
    let _staticHighlightCircle: string = getId('staticHighlightCircle');
    let _createLegendsMemoized: (data: LineChartDataWithIndex[]) => JSX.Element = memoizeFunction(
      (data: LineChartDataWithIndex[]) => _createLegends(data),
    );
    let _firstRenderOptimization: boolean = true;
    let _emptyChartId: string = getId('_LineChart_empty');
    const _isRTL: boolean = isRtl();
    let xAxisCalloutAccessibilityData: IAccessibilityProps;

    const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
    const [activeLegend, setActiveLegend] = React.useState<string>('');
    const [YValueHover, setYValueHover] = React.useState<[]>([]);
    const [refSelected, setRefSelected] = React.useState<SVGGElement | null | string | undefined>(null);
    const [selectedLegend, setSelectedLegend] = React.useState<string>('');
    const [isCalloutVisible, setIsCalloutVisible] = React.useState<boolean>(false);
    const [selectedLegendPoints, setSelectedLegendPoints] = React.useState<any[]>([]);
    const [selectedColorBarLegend, setSelectedColorBarLegend] = React.useState<any[]>([]);
    const [isSelectedLegend, setIsSelectedLegend] = React.useState<boolean>(false);
    const [activePoint, setActivePoint] = React.useState<string>('');
    const [nearestCircleToHighlight, setNearestCircleToHighlight] = React.useState<ILineChartDataPoint | null>(null);
    const [activeLine, setActiveLine] = React.useState<number>(0);
    const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<ICustomizedCalloutData>();
    const [stackCalloutProps, setStackCalloutProps] = React.useState<ICustomizedCalloutData>();

    const pointsRef = React.useRef([]);
    const calloutPointsRef = React.useRef([]);
    React.useEffect(() => {
      /** note that height and width are not used to resize or set as dimesions of the chart,
       * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
       */
      if (_points !== _injectIndexPropertyInLineChartData(props.data.lineChartData) || props.data !== _points) {
        pointsRef.current = _injectIndexPropertyInLineChartData(props.data.lineChartData);
        calloutPointsRef.current = calloutData(pointsRef.current);
      }
    });

    function _injectIndexPropertyInLineChartData(lineChartData?: ILineChartPoints[]): LineChartDataWithIndex[] | [] {
      const { allowMultipleShapesForPoints = false } = props;
      return lineChartData
        ? lineChartData.map((item: ILineChartPoints, index: number) => {
            let color: string;
            // isInverted property is applicable to v8 themes only
            if (typeof item.color === 'undefined') {
              color = getNextColor(index, 0, props.theme?.isInverted);
            } else {
              color = getColorFromToken(item.color, props.theme?.isInverted);
            }
            return {
              ...item,
              index: allowMultipleShapesForPoints ? index : -1,
              color,
            };
          })
        : [];
    }

    function _getCustomizedCallout() {
      return props.onRenderCalloutPerStack
        ? props.onRenderCalloutPerStack(stackCalloutProps)
        : props.onRenderCalloutPerDataPoint
        ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps)
        : null;
    }

    function _getMargins(_margins: IMargins) {
      margins = _margins;
    }

    function _initializeLineChartData(
      xScale: NumericAxis,
      yScale: NumericAxis,
      containerHeight: number,
      containerWidth: number,
      xElement: SVGElement | null,
    ) {
      _xAxisScale = xScale;
      _yAxisScale = yScale;
      _renderedColorFillBars = props.colorFillBars ? _createColorFillBars(containerHeight) : [];
      lines = _createLines(xElement!, containerHeight!);
    }

    function _handleSingleLegendSelectionAction(lineChartItem: LineChartDataWithIndex | IColorFillBarsProps) {
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
      lineChartItem: LineChartDataWithIndex | IColorFillBarsProps,
      selectedLegend: string | null | string[],
    ): void {
      if (lineChartItem.onLegendClick) {
        lineChartItem.onLegendClick(selectedLegend);
      }
    }

    function _createLegends(data: LineChartDataWithIndex[]): JSX.Element {
      const { legendProps, allowMultipleShapesForPoints = false } = props;
      const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
      const legendDataItems = data.map((point: LineChartDataWithIndex) => {
        const color: string = point.color!;
        // mapping data to the format Legends component needs
        const legend: ILegend = {
          title: point.legend!,
          color,
          action: () => {
            if (isLegendMultiSelectEnabled) {
              _handleMultipleLineLegendSelectionAction(point);
            } else {
              _handleSingleLegendSelectionAction(point);
            }
          },
          onMouseOutAction: () => {
            setActiveLegend('');
          },
          hoverAction: () => {
            _handleChartMouseLeave();
            setActiveLegend(point.legend);
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

      const colorFillBarsLegendDataItems = props.colorFillBars
        ? props.colorFillBars.map((colorFillBar: IColorFillBarsProps, index: number) => {
            const title = colorFillBar.legend;
            // isInverted property is applicable to v8 themes only
            const color = getColorFromToken(colorFillBar.color, props.theme?.isInverted);
            const legend: ILegend = {
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
          overflowProps={props.legendsOverflowProps}
          focusZonePropsInHoverCard={props.focusZonePropsForLegendsInHoverCard}
          overflowText={props.legendsOverflowText}
          {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: _onHoverCardHide })}
          {...props.legendProps}
        />
      );
    }

    function _closeCallout() {
      setIsCalloutVisible(false);
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
      const { theme, allowMultipleShapesForPoints = false } = props;
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
    }

    function _createLines(xElement: SVGElement, containerHeight: number): JSX.Element[] {
      const lines: JSX.Element[] = [];
      if (isSelectedLegend) {
        _points = selectedLegendPoints;
      } else {
        _points = _injectIndexPropertyInLineChartData(props.data.lineChartData);
      }
      for (let i = _points.length - 1; i >= 0; i--) {
        const linesForLine: JSX.Element[] = [];
        const bordersForLine: JSX.Element[] = [];
        const pointsForLine: JSX.Element[] = [];

        const legendVal: string = _points[i].legend;
        const lineColor: string = _points[i].color!;
        const { theme } = props;
        const verticaLineHeight = containerHeight - margins.bottom! + 6;
        if (_points[i].data.length === 1) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { x: x1, y: y1, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points[i].data[0];
          const circleId = `${_circleId}_${i}`;
          const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;
          pointsForLine.push(
            <circle
              id={circleId}
              key={circleId}
              r={activePoint === circleId ? 5.5 : 3.5}
              cx={_xAxisScale(x1)}
              cy={_yAxisScale(y1)}
              fill={activePoint === circleId ? theme!.semanticColors.bodyBackground : lineColor}
              opacity={isLegendSelected ? 1 : 0.1}
              onMouseOver={_handleHover.bind(
                x1,
                y1,
                verticaLineHeight,
                xAxisCalloutData,
                circleId,
                xAxisCalloutAccessibilityData,
              )}
              onMouseMove={_handleHover.bind(
                x1,
                y1,
                verticaLineHeight,
                xAxisCalloutData,
                circleId,
                xAxisCalloutAccessibilityData,
              )}
              onMouseOut={_handleMouseOut}
              strokeWidth={activePoint === circleId ? DEFAULT_LINE_STROKE_SIZE : 0}
              stroke={activePoint === circleId ? lineColor : ''}
              role="img"
              aria-label={_getAriaLabel(i, 0)}
              data-is-focusable={isLegendSelected}
              ref={(e: SVGCircleElement | null) => {
                _refCallback(e!, circleId);
              }}
              onFocus={() => _handleFocus(circleId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)}
              onBlur={_handleMouseOut}
              {..._getClickHandler(_points[i].data[0].onDataPointClick)}
            />,
          );
        }

        let gapIndex = 0;
        const gaps = _points[i].gaps?.sort((a, b) => a.startIndex - b.startIndex) ?? [];

        // Use path rendering technique for larger datasets to optimize performance.
        if (props.optimizeLargeData && _points[i].data.length > 1) {
          const line = d3Line()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .x((d: any) => _xAxisScale(d[0]))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .y((d: any) => _yAxisScale(d[1]))
            .curve(d3curveLinear);

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
                  stroke={_points[i].lineOptions?.lineBorderColor || theme!.semanticColors.bodyBackground}
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
                onMouseMove={_onMouseOverLargeDataset.bind(i, verticaLineHeight)}
                onMouseOver={_onMouseOverLargeDataset.bind(i, verticaLineHeight)}
                onMouseOut={_handleMouseOut}
                {..._getClickHandler(_points[i].onLineClick)}
                opacity={1}
                role="img"
                aria-label={`${legendVal}, series ${i + 1} of ${_points.length} with ${
                  _points[i].data.length
                } data points.`}
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
                opacity={0.1}
                role="img"
                aria-label={`${legendVal}, series ${i + 1} of ${_points.length} with ${
                  _points[i].data.length
                } data points.`}
              />,
            );
          }

          const isPointHighlighted = activeLine !== null && activeLine === i;

          pointsForLine.push(
            <circle
              id={`${_staticHighlightCircle}_${i}`}
              key={`${_staticHighlightCircle}_${i}`}
              r={5.5}
              cx={0}
              cy={0}
              fill={theme!.semanticColors.bodyBackground}
              strokeWidth={DEFAULT_LINE_STROKE_SIZE}
              stroke={lineColor}
              visibility={isPointHighlighted ? 'visibility' : 'hidden'}
              onMouseMove={_onMouseOverLargeDataset.bind(i, verticaLineHeight)}
              onMouseOver={_onMouseOverLargeDataset.bind(i, verticaLineHeight)}
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
            const { x: x1, y: y1, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points[i].data[j - 1];
            const { x: x2, y: y2 } = _points[i].data[j];
            let path = _getPath(_xAxisScale(x1), _yAxisScale(y1), circleId, j, false, _points[i].index);
            const strokeWidth = _points[i].lineOptions?.strokeWidth || props.strokeWidth || DEFAULT_LINE_STROKE_SIZE;

            const isLegendSelected: boolean =
              _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

            const currentPointHidden = _points[i].hideNonActiveDots && activePoint !== circleId;
            pointsForLine.push(
              <path
                id={circleId}
                key={circleId}
                d={path}
                data-is-focusable={isLegendSelected}
                onMouseOver={_handleHover.bind(
                  x1,
                  y1,
                  verticaLineHeight,
                  xAxisCalloutData,
                  circleId,
                  xAxisCalloutAccessibilityData,
                )}
                onMouseMove={_handleHover.bind(
                  x1,
                  y1,
                  verticaLineHeight,
                  xAxisCalloutData,
                  circleId,
                  xAxisCalloutAccessibilityData,
                )}
                onMouseOut={_handleMouseOut}
                onFocus={() => _handleFocus(lineId, x1, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)}
                onBlur={_handleMouseOut}
                {..._getClickHandler(_points[i].data[j - 1].onDataPointClick)}
                opacity={isLegendSelected && !currentPointHidden ? 1 : 0.01}
                fill={_getPointFill(lineColor, circleId, j, false)}
                stroke={lineColor}
                strokeWidth={strokeWidth}
                role="img"
                aria-label={_getAriaLabel(i, j - 1)}
              />,
            );
            if (j + 1 === _points[i].data.length) {
              // If this is last point of the line segment.
              const lastCircleId = `${circleId}${j}L`;
              const hiddenHoverCircleId = `${circleId}${j}D`;
              const lastPointHidden = _points[i].hideNonActiveDots && activePoint !== lastCircleId;
              path = _getPath(_xAxisScale(x2), _yAxisScale(y2), lastCircleId, j, true, _points[i].index);
              const {
                xAxisCalloutData: lastCirlceXCallout,
                xAxisCalloutAccessibilityData: lastCirlceXCalloutAccessibilityData,
              } = _points[i].data[j];
              pointsForLine.push(
                <React.Fragment key={`${lastCircleId}_container`}>
                  <path
                    id={lastCircleId}
                    key={lastCircleId}
                    d={path}
                    data-is-focusable={isLegendSelected}
                    onMouseOver={_handleHover.bind(
                      x2,
                      y2,
                      verticaLineHeight,
                      lastCirlceXCallout,
                      lastCircleId,
                      lastCirlceXCalloutAccessibilityData,
                    )}
                    onMouseMove={_handleHover.bind(
                      x2,
                      y2,
                      verticaLineHeight,
                      lastCirlceXCallout,
                      lastCircleId,
                      lastCirlceXCalloutAccessibilityData,
                    )}
                    onMouseOut={_handleMouseOut}
                    onFocus={() =>
                      _handleFocus(lineId, x2, lastCirlceXCallout, lastCircleId, lastCirlceXCalloutAccessibilityData)
                    }
                    onBlur={_handleMouseOut}
                    {..._getClickHandler(_points[i].data[j].onDataPointClick)}
                    opacity={isLegendSelected && !lastPointHidden ? 1 : 0.01}
                    fill={_getPointFill(lineColor, lastCircleId, j, true)}
                    stroke={lineColor}
                    strokeWidth={strokeWidth}
                    role="img"
                    aria-label={_getAriaLabel(i, j)}
                  />
                  {/* Dummy circle acting as magnetic latch for last callout point */}
                  <circle
                    id={hiddenHoverCircleId}
                    key={hiddenHoverCircleId}
                    r={8}
                    cx={_xAxisScale(x2)}
                    cy={_yAxisScale(y2)}
                    opacity={0}
                    width={0}
                    onMouseOver={_handleHover.bind(
                      x2,
                      y2,
                      verticaLineHeight,
                      lastCirlceXCallout,
                      lastCircleId,
                      lastCirlceXCalloutAccessibilityData,
                    )}
                    onMouseMove={_handleHover.bind(
                      x2,
                      y2,
                      verticaLineHeight,
                      lastCirlceXCallout,
                      lastCircleId,
                      lastCirlceXCalloutAccessibilityData,
                    )}
                    onMouseOut={_handleMouseOut}
                    strokeWidth={0}
                    focusable={false}
                    onBlur={_handleMouseOut}
                  />
                </React.Fragment>,
              );
              /* eslint-enable react/jsx-no-bind */
            }

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
                      x1={_xAxisScale(x1)}
                      y1={_yAxisScale(y1)}
                      x2={_xAxisScale(x2)}
                      y2={_yAxisScale(y2)}
                      strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
                      strokeWidth={Number.parseFloat(strokeWidth.toString()) + lineBorderWidth}
                      stroke={_points[i].lineOptions?.lineBorderColor || theme!.semanticColors.bodyBackground}
                      opacity={1}
                    />,
                  );
                }

                linesForLine.push(
                  <line
                    id={lineId}
                    key={lineId}
                    x1={_xAxisScale(x1)}
                    y1={_yAxisScale(y1)}
                    x2={_xAxisScale(x2)}
                    y2={_yAxisScale(y2)}
                    strokeWidth={strokeWidth}
                    ref={(e: SVGLineElement | null) => {
                      _refCallback(e!, lineId);
                    }}
                    onMouseOver={_handleHover.bind(
                      x1,
                      y1,
                      verticaLineHeight,
                      xAxisCalloutData,
                      circleId,
                      xAxisCalloutAccessibilityData,
                    )}
                    onMouseMove={_handleHover.bind(
                      x1,
                      y1,
                      verticaLineHeight,
                      xAxisCalloutData,
                      circleId,
                      xAxisCalloutAccessibilityData,
                    )}
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
                    x1={_xAxisScale(x1)}
                    y1={_yAxisScale(y1)}
                    x2={_xAxisScale(x2)}
                    y2={_yAxisScale(y2)}
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

        lines.push(...bordersForLine, ...linesForLine, ...pointsForLine);
      }
      const classes = useLineChartStyles_unstable(props);
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
          xAxis: xAxisElement,
        };
        xAxisElement && tooltipOfXAxislabels(tooltipProps);
      }
      return lines;
    }

    function _createColorFillBars(containerHeight: number) {
      const colorFillBars: JSX.Element[] = [];
      if (isSelectedLegend) {
        _colorFillBars = selectedColorBarLegend;
      } else {
        _colorFillBars = props.colorFillBars!;
      }

      const yMinMaxValues = getMinMaxOfYAxis(_points, ChartTypes.LineChart);
      const FILL_Y_PADDING = 3;
      for (let i = 0; i < _colorFillBars.length; i++) {
        const colorFillBar = _colorFillBars[i];
        const colorFillBarId = getId(colorFillBar.legend.replace(/\W/g, ''));
        // isInverted property is applicable to v8 themes only
        const color = getColorFromToken(colorFillBar.color, props.theme?.isInverted);

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
              y={_yAxisScale(yMinMaxValues.endValue) - FILL_Y_PADDING}
              width={Math.abs(_xAxisScale(endX) - _xAxisScale(startX))}
              height={_yAxisScale(props.yMinValue || 0) - _yAxisScale(yMinMaxValues.endValue) + FILL_Y_PADDING}
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

    function _checkInGap(pointIndex: number, gaps: ILineChartGap[], currentGapIndex: number) {
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
    ) => {
      mouseEvent.persist();
      const { data } = props;
      const { lineChartData } = data;

      // This will get the value of the X when mouse is on the chart
      const xOffset = _xAxisScale.invert(pointer(mouseEvent)[0], document.getElementById(_rectId)!);
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
      const formattedDate = xPointToHighlight instanceof Date ? xPointToHighlight.toLocaleString() : xPointToHighlight;
      const modifiedXVal = xPointToHighlight instanceof Date ? xPointToHighlight.getTime() : xPointToHighlight;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const found: any = find(_calloutPoints, (element: { x: string | number }) => {
        return element.x === modifiedXVal;
      });
      const pointToHighlight: ILineChartDataPoint = lineChartData![linenumber].data[index!];
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
          .attr('cy', `${_yAxisScale(pointToHighlight.y)}`)
          .attr('visibility', 'visibility');

        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale(pointToHighlight.x)}, ${_yAxisScale(pointToHighlight.y)})`)
          .attr('visibility', 'visibility')
          .attr('y2', `${lineHeight - _yAxisScale(pointToHighlight.y)}`);

        setNearestCircleToHighlight(pointToHighlight);
        setIsCalloutVisible(true);
        setRefSelected(`#${_staticHighlightCircle}_${linenumber}`);
        setStackCalloutProps(found!);
        setYValueHover(found.values);
        setDataPointCalloutProps(found!);
        xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue(formattedDate);
        setActivePoint('');
        setActiveLine(linenumber);
      }

      if (!found) {
        setIsCalloutVisible(false);
        setNearestCircleToHighlight(pointToHighlight);
        setActivePoint('');
        setActiveLine(linenumber);
      }
    };

    function _handleFocus(
      lineId: string,
      x: number | Date,

      xAxisCalloutData: string | undefined,
      circleId: string,
      xAxisCalloutAccessibilityData?: IAccessibilityProps,
    ) {
      _uniqueCallOutID = circleId;
      const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
      const xVal = x instanceof Date ? x.getTime() : x;
      const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal);
      // if no points need to be called out then don't show vertical line and callout card

      if (found) {
        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale(x)}, 0)`)
          .attr('visibility', 'visibility');
        _refArray.forEach((obj: IRefArrayData) => {
          if (obj.index === lineId) {
            setIsCalloutVisible(true);
            setRefSelected(obj.refElement);
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
      xAxisCalloutAccessibilityData: IAccessibilityProps | undefined,
      mouseEvent: React.MouseEvent<SVGElement>,
    ) {
      mouseEvent.persist();
      const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
      const xVal = x instanceof Date ? x.getTime() : x;
      const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal);
      // if no points need to be called out then don't show vertical line and callout card

      if (found) {
        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale(x)}, ${_yAxisScale(y)})`)
          .attr('visibility', 'visibility')
          .attr('y2', `${lineHeight - _yAxisScale(y)}`);
        if (_uniqueCallOutID !== circleId) {
          _uniqueCallOutID = circleId;
          setIsCalloutVisible(true);
          setRefSelected(`#${circleId}`);
          xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
          setYValueHover(found.values);
          setStackCalloutProps(found!);
          setDataPointCalloutProps(found!);
          setActivePoint(circleId);
          setNearestCircleToHighlight(null);
          setActiveLine(null);
        }
      } else {
        setActivePoint(circleId);
        setNearestCircleToHighlight(null);
        setActiveLine(null);
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
      setIsCalloutVisible(false);
      setActivePoint('');
      setActiveLine(null);
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

    function _handleMultipleColorFillBarLegendSelectionAction(selectedColorFillBar: IColorFillBarsProps) {
      const selectedColorFillBarIndex = selectedColorBarLegend.reduce((acc, colorFillBar, index) => {
        if (acc > -1 || colorFillBar.legend !== selectedColorFillBar.legend) {
          return acc;
        } else {
          return index;
        }
      }, -1);

      let selectedColorFillBars: IColorFillBarsProps[];
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
        (colorFillBar: IColorFillBarsProps) => colorFillBar.legend,
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

    function _getColorFillBarOpacity(colorFillBar: IColorFillBarsProps) {
      return colorFillBar.applyPattern ? 1 : 0.4;
    }

    function _getAriaLabel(lineIndex: number, pointIndex: number): string {
      const line = _points[lineIndex];
      const point = line.data[pointIndex];
      const formattedDate = point.x instanceof Date ? point.x.toLocaleString() : point.x;
      const xValue = point.xAxisCalloutData || formattedDate;
      const legend = line.legend;
      const yValue = point.yAxisCalloutData || point.y;
      return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
    }

    function _isChartEmpty(): boolean {
      /*return !(
        props.data &&
        props.data.lineChartData &&
        props.data.lineChartData.length > 0 &&
        props.data.lineChartData.filter((item: ILineChartPoints) => item.data.length).length > 0
      );*/
      return false;
    }

    const { legendProps, tickValues, tickFormat, eventAnnotationProps } = props;
    _points = _injectIndexPropertyInLineChartData(props.data.lineChartData);

    const isXAxisDateType = getXAxisType(_points);
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
      legendBars = _createLegendsMemoized(_points!);
    }
    const calloutProps = {
      isCalloutVisible: isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      YValueHover: YValueHover,
      hoverXValue: hoverXValue,
      id: `toolTip${_uniqueCallOutID}`,
      target: refSelected,
      isBeakVisible: false,
      gapSpace: 15,
      onDismiss: _closeCallout,
      preventDismissOnEvent: () => true,
      hidden: !(!props.hideTooltip && isCalloutVisible),
      descriptionMessage:
        props.getCalloutDescriptionMessage && stackCalloutProps
          ? props.getCalloutDescriptionMessage(stackCalloutProps)
          : undefined,
      'data-is-focusable': true,
      xAxisCalloutAccessibilityData: xAxisCalloutAccessibilityData,
      ...props.calloutProps,
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
        isCalloutForStack
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        getmargins={_getMargins}
        getGraphData={_initializeLineChartData}
        xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
        customizedCallout={_getCustomizedCallout()}
        onChartMouseLeave={_handleChartMouseLeave}
        enableFirstRenderOptimization={props.enablePerfOptimization && _firstRenderOptimization}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          _xAxisScale = props.xScale!;
          _yAxisScale = props.yScale!;
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
                {/*{props.optimizeLargeData ? (
                  <rect id={_rectId} width={props.containerWidth} height={props.containerHeight} fill={'transparent'} />
                ) : (
                  <></>
                )}*/}
                <g>
                  {_renderedColorFillBars}
                  {lines}
                </g>
                {/*{eventAnnotationProps && (
                  <EventsAnnotation
                    theme={props.theme}
                    {...eventAnnotationProps}
                    scale={props.xScale!}
                    chartYTop={margins.top! + eventLabelHeight}
                    chartYBottom={props.containerHeight! - 35}
                  />
                )} */}
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
