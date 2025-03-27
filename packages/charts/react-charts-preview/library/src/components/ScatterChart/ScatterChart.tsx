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

const DEFAULT_LINE_STROKE_SIZE = 4;

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

      for (let j = 0; j < _points[i].data.length; j++) {
        const gapResult = _checkInGap(j, gaps, gapIndex);
        gapIndex = gapResult.gapIndex;

        const lineId = `${_lineId}_${i}_${j}`;
        const circleId = `${_circleId}_${i}_${j}`;
        const { x, y, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points[i].data[j];

        const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

        const currentPointHidden = _points[i].hideNonActiveDots && activePoint !== circleId;
        pointsForLine.push(
          <circle
            id={circleId}
            key={circleId}
            r={50}
            cx={_xAxisScale(x)}
            cy={_yAxisScale(y)}
            data-is-focusable={isLegendSelected}
            onMouseOver={(event: React.MouseEvent<SVGElement>) =>
              _handleHover(x, y, verticaLineHeight, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData, event)
            }
            onMouseMove={(event: React.MouseEvent<SVGElement>) =>
              _handleHover(x, y, verticaLineHeight, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData, event)
            }
            onMouseOut={_handleMouseOut}
            onFocus={() => _handleFocus(lineId, x, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)}
            onBlur={_handleMouseOut}
            {..._getClickHandler(_points[i].data[j].onDataPointClick)}
            opacity={isLegendSelected && !currentPointHidden ? 1 : 0.01}
            fill={_getPointFill(lineColor, circleId, j, false)}
            stroke={lineColor}
            role="img"
            aria-label={_getAriaLabel(i, j)}
            tabIndex={_points[i].legend !== '' ? 0 : undefined}
          />,
        );
      }

      lines.push(
        <g
          key={`line_${i}`}
          role="region"
          aria-label={`${legendVal}, line ${i + 1} of ${_points.length} with ${_points[i].data.length} data points.`}
        >
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
