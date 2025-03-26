import * as React from 'react';
import { ScatterChartProps } from './ScatterChart.types';
import { useLineChartStyles_unstable } from './useScatterChartStyles.styles';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select, pointer } from 'd3-selection';
import { bisector } from 'd3-array';
import { Legend, Legends } from '../Legends/index';
import { line as d3Line, curveLinear as d3curveLinear } from 'd3-shape';
import { useId } from '@fluentui/react-utilities';
import { find } from '../../utilities/index';
import {
  AccessibilityProps,
  CartesianChart,
  ChildProps,
  LineChartPoints,
  CustomizedCalloutData,
  Margins,
  RefArrayData,
  ColorFillBarsProps,
  LineChartGap,
  LineChartDataPoint,
} from '../../index';
import { tokens } from '@fluentui/react-theme';
import {
  calloutData,
  ChartTypes,
  getXAxisType,
  XAxisTypes,
  tooltipOfXAxislabels,
  pointTypes,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  useRtl,
  formatDate,
} from '../../utilities/index';

type NumericAxis = D3Axis<number | { valueOf(): number }>;
enum PointSize {
  hoverSize = 11,
  invisibleSize = 1,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bisect = bisector((d: any) => d.x).left;

const DEFAULT_LINE_STROKE_SIZE = 4;

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
export const ScatterChart: React.FunctionComponent<ScatterChartProps> = React.forwardRef<
  HTMLDivElement,
  ScatterChartProps
>((props, forwardedRef) => {
  let _points: LineChartDataWithIndex[] = _injectIndexPropertyInLineChartData(props.data.lineChartData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _calloutPoints: any[] = calloutData(_points) || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _yAxisScale: any = '';
  let _circleId: string = useId('circle');
  let _lineId: string = useId('lineID');
  let _borderId: string = useId('borderID');
  let _verticalLine: string = useId('verticalLine');
  let _uniqueCallOutID: string | null = '';
  let _refArray: RefArrayData[] = [];
  let margins: Margins;
  let lines: JSX.Element[];
  let _renderedColorFillBars: JSX.Element[];
  let _tooltipId: string = useId('LineChartTooltipId_');
  let _rectId: string = useId('containerRectLD');
  let _staticHighlightCircle: string = useId('staticHighlightCircle');
  let _firstRenderOptimization = true;
  let _emptyChartId: string = useId('_LineChart_empty');
  const _isRTL: boolean = useRtl();
  let xAxisCalloutAccessibilityData: AccessibilityProps = {};

  const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [YValueHover, setYValueHover] = React.useState<[]>([]);
  const [selectedLegend, setSelectedLegend] = React.useState<string>('');
  const [selectedLegendPoints, setSelectedLegendPoints] = React.useState<any[]>([]);
  const [selectedColorBarLegend, setSelectedColorBarLegend] = React.useState<any[]>([]);
  const [isSelectedLegend, setIsSelectedLegend] = React.useState<boolean>(false);
  const [activePoint, setActivePoint] = React.useState<string>('');
  const [nearestCircleToHighlight, setNearestCircleToHighlight] = React.useState<LineChartDataPoint | null>(null);
  const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<CustomizedCalloutData>();
  const [stackCalloutProps, setStackCalloutProps] = React.useState<CustomizedCalloutData>();
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  const pointsRef = React.useRef<LineChartDataWithIndex[] | []>([]);
  const calloutPointsRef = React.useRef<any[]>([]);
  React.useEffect(() => {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */

    if (_points !== _injectIndexPropertyInLineChartData(props.data.lineChartData) || props.data !== _points) {
      pointsRef.current = _injectIndexPropertyInLineChartData(props.data.lineChartData);
      calloutPointsRef.current = calloutData(pointsRef.current);
    }
  }, [props.height, props.width, props.data]);

  function _injectIndexPropertyInLineChartData(lineChartData?: LineChartPoints[]): LineChartDataWithIndex[] | [] {
    return lineChartData
      ? lineChartData.map((item: LineChartPoints, index: number) => {
          let color: string;
          if (typeof item.color === 'undefined') {
            color = getNextColor(index, 0);
          } else {
            color = getColorFromToken(item.color);
          }
          return {
            ...item,
            index: -1,
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

  function _getMargins(_margins: Margins) {
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
    _renderedColorFillBars = [];
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

  function _createLegends(data: LineChartDataWithIndex[]): JSX.Element {
    const { legendProps } = props;
    const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
    const legendDataItems = data.map((point: LineChartDataWithIndex) => {
      const color: string = point.color!;
      // mapping data to the format Legends component needs
      const legend: Legend = {
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
      };
      return legend;
    });

    return (
      <Legends
        legends={[...legendDataItems]}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowText={props.legendsOverflowText}
        {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: _onHoverCardHide })}
        {...props.legendProps}
      />
    );
  }

  function _getBoxWidthOfShape(pointId: string, pointIndex: number, isLastPoint: boolean) {
    if (activePoint === pointId) {
      return PointSize.hoverSize;
    } else {
      return PointSize.invisibleSize;
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
    let w = _getBoxWidthOfShape(pointId, pointIndex, isLastPoint);
    const index: number = 0;
    const widthRatio = pointTypes[index].widthRatio;
    w = widthRatio > 1 ? w / widthRatio : w;

    return _getPointPath(xPos, yPos, w, index);
  }
  function _getPointFill(lineColor: string, pointId: string, pointIndex: number, isLastPoint: boolean) {
    if (activePoint === pointId) {
      return tokens.colorNeutralBackground1;
    } else {
      return lineColor;
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
            fill={activePoint === circleId ? tokens.colorNeutralBackground1 : lineColor}
            opacity={isLegendSelected ? 1 : 0.1}
            tabIndex={_points[i].legend !== '' ? 0 : undefined}
            onMouseOver={(event: React.MouseEvent<SVGElement>) =>
              _handleHover(x1, y1, verticaLineHeight, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData, event)
            }
            onMouseMove={(event: React.MouseEvent<SVGElement>) =>
              _handleHover(x1, y1, verticaLineHeight, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData, event)
            }
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
      if (true && _points[i].data.length > 1) {
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
          linesForLine.push(
            <circle
              id={lineId}
              key={lineId}
              r={3.5}
              cx={0}
              cy={0}
              fill="transparent"
              data-is-focusable={true}
              stroke={lineColor}
              strokeWidth={strokeWidth}
              strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
              onMouseMove={event => _onMouseOverLargeDataset.bind(i, verticaLineHeight, event)}
              onMouseOver={event => _onMouseOverLargeDataset.bind(i, verticaLineHeight, event)}
              onMouseOut={_handleMouseOut}
              {..._getClickHandler(_points[i].onLineClick)}
              opacity={1}
              tabIndex={_points[i].legend !== '' ? 0 : undefined}
            />,
          );
        } else {
          linesForLine.push(
            <circle
              id={lineId}
              key={lineId}
              r={3.5}
              cx={0}
              cy={0}
              fill="transparent"
              data-is-focusable={false}
              stroke={lineColor}
              strokeWidth={strokeWidth}
              strokeLinecap={_points[i].lineOptions?.strokeLinecap ?? 'round'}
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
            onMouseMove={event => _onMouseOverLargeDataset.bind(i, verticaLineHeight, event)}
            onMouseOver={event => _onMouseOverLargeDataset.bind(i, verticaLineHeight, event)}
            onMouseOut={_handleMouseOut}
          />,
        );
      }

      lines.push(
        <g
          key={`line_${i}`}
          role="region"
          aria-label={`${legendVal}, line ${i + 1} of ${_points.length} with ${_points[i].data.length} data points.`}
        >
          {linesForLine}
          {pointsForLine}
        </g>,
      );
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
      xPointToHighlight instanceof Date ? formatDate(xPointToHighlight, props.useUTC) : xPointToHighlight;
    const modifiedXVal = xPointToHighlight instanceof Date ? xPointToHighlight.getTime() : xPointToHighlight;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(_calloutPoints, (element: { x: string | number }) => {
      return element.x === modifiedXVal;
    });
    const pointToHighlight: LineChartDataPoint = lineChartData![linenumber].data[index!];
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
    lineId: string,
    x: number | Date,

    xAxisCalloutData: string | undefined,
    circleId: string,
    xAxisCalloutAccessibilityData?: AccessibilityProps,
  ) {
    _uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? formatDate(x, props.useUTC) : x;
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
  ) {
    mouseEvent?.persist();
    const formattedData = x instanceof Date ? formatDate(x, props.useUTC) : x;
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
        updatePosition(mouseEvent.clientX, mouseEvent.clientY);
        xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
        setYValueHover(found.values);
        setStackCalloutProps(found!);
        setDataPointCalloutProps(found!);
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

    if (areAllLineLegendsSelected && false) {
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

  function _getAriaLabel(lineIndex: number, pointIndex: number): string {
    const line = _points[lineIndex];
    const point = line.data[pointIndex];
    const formattedDate = point.x instanceof Date ? formatDate(point.x, props.useUTC) : point.x;
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

  const { legendProps, tickValues, tickFormat } = props;
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
    legendBars = _createLegends(_points!); // ToDo: Memoize legends to improve performance.
  }
  const calloutProps = {
    YValueHover: YValueHover,
    hoverXValue: hoverXValue,
    descriptionMessage:
      props.getCalloutDescriptionMessage && stackCalloutProps
        ? props.getCalloutDescriptionMessage(stackCalloutProps)
        : undefined,
    'data-is-focusable': true,
    xAxisCalloutAccessibilityData: xAxisCalloutAccessibilityData,
    ...props.calloutProps,
    clickPosition: clickPosition,
    isPopoverOpen: isPopoverOpen,
    isCalloutForStack: true,
    culture: props.culture ?? 'en-us',
    isCartesian: true,
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
      getmargins={_getMargins}
      getGraphData={_initializeLineChartData}
      xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
      onChartMouseLeave={_handleChartMouseLeave}
      enableFirstRenderOptimization={true && _firstRenderOptimization}
      /* eslint-disable react/jsx-no-bind */
      // eslint-disable-next-line react/no-children-prop
      children={(props: ChildProps) => {
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
              {props.optimizeLargeData ? (
                <rect id={_rectId} width={props.containerWidth} height={props.containerHeight} fill={'transparent'} />
              ) : (
                <></>
              )}
              <g>
                {_renderedColorFillBars}
                {lines}
              </g>
            </g>
          </>
        );
      }}
    />
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
ScatterChart.displayName = 'ScatterChart';
