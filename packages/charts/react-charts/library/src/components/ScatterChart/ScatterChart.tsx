import * as React from 'react';
import { ScatterChartProps } from './ScatterChart.types';
import { useScatterChartStyles } from './useScatterChartStyles.styles';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { Legend, Legends } from '../Legends/index';
import { max as d3Max, min as d3Min } from 'd3-array';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  areArraysEqual,
  createNumericYAxis,
  createStringYAxis,
  domainRangeOfDateForScatterChart,
  domainRangeOfNumericForScatterChart,
  domainRangeOfXStringAxis,
  find,
  findNumericMinMaxOfY,
  IDomainNRange,
  YAxisType,
  useRtl,
} from '../../utilities/index';
import {
  AccessibilityProps,
  CartesianChart,
  ChildProps,
  CustomizedCalloutData,
  Margins,
  RefArrayData,
  ScatterChartDataPoint,
  Chart,
  ImageExportOptions,
  LegendContainer,
  ScatterChartPoints,
} from '../../index';
import { tokens } from '@fluentui/react-theme';
import {
  calloutData,
  ChartTypes,
  XAxisTypes,
  tooltipOfAxislabels,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  formatDate,
} from '../../utilities/index';
import { toImage } from '../../utilities/image-export-utils';
import { ScaleLinear } from 'd3-scale';

type NumericAxis = D3Axis<number | { valueOf(): number }>;

type ScatterChartDataWithIndex = ScatterChartPoints & { index: number };

// Create a ScatterChart variant which uses these default styles and this styled subcomponent.
/**
 * ScatterChart component
 * {@docCategory ScatterChart}
 */
export const ScatterChart: React.FunctionComponent<ScatterChartProps> = React.forwardRef<
  HTMLDivElement,
  ScatterChartProps
>((props, forwardedRef) => {
  const _circleId: string = useId('circle');
  const _seriesId: string = useId('seriesID');
  const _verticalLine: string = useId('verticalLine');
  const _tooltipId: string = useId('ScatterChartTooltipId_');
  const _firstRenderOptimization = true;
  const _emptyChartId: string = useId('_ScatterChart_empty');
  let _points: ScatterChartDataWithIndex[] = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _calloutPoints: any[] = calloutData(_points) || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _yAxisScale: any = '';
  let _uniqueCallOutID: string | null = '';
  let _refArray: RefArrayData[] = [];
  let margins: Margins;
  let renderSeries: JSXElement[];
  let _xAxisLabels: string[] = [];
  let xAxisCalloutAccessibilityData: AccessibilityProps = {};
  let _xBandwidth = 0;
  const cartesianChartRef = React.useRef<Chart>(null);
  const classes = useScatterChartStyles(props);
  const _legendsRef = React.useRef<LegendContainer>(null);
  const _isRTL: boolean = useRtl();

  const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [YValueHover, setYValueHover] = React.useState<[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedLegendPoints, setSelectedLegendPoints] = React.useState<any[]>([]);
  const [isSelectedLegend, setIsSelectedLegend] = React.useState<boolean>(false);
  const [activePoint, setActivePoint] = React.useState<string>('');
  const [stackCalloutProps, setStackCalloutProps] = React.useState<CustomizedCalloutData>();
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const prevSelectedLegendsRef = React.useRef<string[] | undefined>(undefined);

  React.useEffect(() => {
    if (
      prevSelectedLegendsRef.current &&
      !areArraysEqual(prevSelectedLegendsRef.current, props.legendProps?.selectedLegends)
    ) {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }
    prevSelectedLegendsRef.current = props.legendProps?.selectedLegends;
  }, [props.legendProps?.selectedLegends]);

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

  const _xAxisType: XAxisTypes =
    props.data.scatterChartData! &&
    props.data.scatterChartData!.length > 0 &&
    props.data.scatterChartData![0].data &&
    props.data.scatterChartData![0].data.length > 0
      ? (getTypeOfAxis(props.data.scatterChartData![0].data[0].x, true) as XAxisTypes)
      : XAxisTypes.StringAxis;

  const pointsRef = React.useRef<ScatterChartDataWithIndex[] | []>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calloutPointsRef = React.useRef<any[]>([]);
  React.useEffect(() => {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */

    if (_points !== _injectIndexPropertyInScatterChartData(props.data.scatterChartData) || props.data !== _points) {
      pointsRef.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
      calloutPointsRef.current = calloutData(pointsRef.current);
    }
  }, [props.height, props.width, props.data, _points]);

  function _injectIndexPropertyInScatterChartData(
    scatterChartData?: ScatterChartPoints[],
  ): ScatterChartDataWithIndex[] | [] {
    return scatterChartData
      ? scatterChartData.map((item: ScatterChartPoints, index: number) => {
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

  function _getNumericMinMaxOfY(
    points: ScatterChartPoints[],
    yAxisType?: YAxisType,
  ): { startValue: number; endValue: number } {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { startValue, endValue } = findNumericMinMaxOfY(points, yAxisType);
    let yPadding = 0;
    yPadding = (endValue - startValue) * 0.1;

    return {
      startValue: startValue - yPadding,
      endValue: endValue + yPadding,
    };
  }

  function _getDomainNRangeValues(
    points: any,
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
      domainNRangeValue = domainRangeOfNumericForScatterChart(points, margins, width, isRTL);
    } else if (xAxisType === XAxisTypes.DateAxis) {
      domainNRangeValue = domainRangeOfDateForScatterChart(points, margins, width, isRTL, tickValues! as Date[]);
    } else {
      domainNRangeValue = domainRangeOfXStringAxis(margins, width, isRTL);
    }
    return domainNRangeValue;
  }

  function _getMargins(_margins: Margins) {
    margins = _margins;
  }

  function _initializeScatterChartData(
    xScale: NumericAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ) {
    _xAxisScale = xScale;
    _yAxisScale = yScale;
    renderSeries = _createPlot(xElement!, containerHeight!);
  }

  function _onHoverCardHide() {
    setSelectedLegendPoints([]);
    setIsSelectedLegend(false);
  }

  function _createLegends(data: ScatterChartDataWithIndex[]): JSXElement {
    const { legendProps } = props;
    const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
    const mapLegendToPoints: Record<string, ScatterChartDataWithIndex[]> = {};
    data.forEach((point: ScatterChartDataWithIndex) => {
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
        selectedLegends={selectedLegends}
        onChange={_onLegendSelectionChange}
        legendRef={_legendsRef}
      />
    );
  }

  function _onLegendSelectionChange(
    legendsSelected: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: Legend,
  ): void {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(legendsSelected);
    } else {
      setSelectedLegends(legendsSelected.slice(-1));
    }

    if (props.legendProps?.onChange) {
      props.legendProps.onChange(legendsSelected, event, currentLegend);
    }
  }

  function _getPointFill(seriesColor: string, pointId: string, pointIndex: number, isLastPoint: boolean) {
    if (activePoint === pointId) {
      return tokens.colorNeutralBackground1;
    } else {
      return seriesColor;
    }
  }

  function _getRangeForScatterMarkerSize(
    yScale: ScaleLinear<number, number>,
    yPadding: number,
    xMin: number,
    xMax: number,
    xPadding: number,
  ): number {
    const extraXPixels = _isRTL
      ? _xAxisScale(xMax - xPadding) - _xAxisScale(xMax)
      : _xAxisScale(xMin + xPadding) - _xAxisScale(xMin);

    const yMin = yScale.domain()[0];
    const extraYPixels = yScale(yMin) - yScale(yMin + yPadding);
    return Math.min(extraXPixels, extraYPixels);
  }

  function _createPlot(xElement: SVGElement, containerHeight: number): JSXElement[] {
    const series: JSXElement[] = [];
    if (isSelectedLegend) {
      _points = selectedLegendPoints;
    } else {
      _points = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
    }

    const yMax = d3Max(points, (point: ScatterChartPoints) => {
      return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.y)!;
    })!;
    const yMin = d3Min(points, (point: ScatterChartPoints) => {
      return d3Min(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.y)!;
    })!;
    const yPadding = (yMax - yMin) * 0.1;

    let xPadding = 0;
    let xMin: number = 0;
    let xMax: number = 0;
    if (_xAxisType === XAxisTypes.StringAxis) {
      _xBandwidth = _xAxisScale.bandwidth() / 2;
    } else if (_xAxisType === XAxisTypes.DateAxis) {
      xMin = d3Min(_points, (point: ScatterChartPoints) => {
        return d3Min(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.x as Date)!;
      })!.getTime();

      xMax = d3Max(_points, (point: ScatterChartPoints) => {
        return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => {
          return item.x as Date;
        });
      })!.getTime();

      xPadding = (xMax - xMin) * 0.1;
    } else {
      xMin = d3Min(_points, (point: ScatterChartPoints) => {
        return d3Min(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.x as number)!;
      })!;

      xMax = d3Max(_points, (point: ScatterChartPoints) => {
        return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => {
          return item.x as number;
        });
      })!;

      xPadding = (xMax - xMin) * 0.1;
    }

    const maxMarkerSize = d3Max(_points, (point: ScatterChartPoints) => {
      return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => {
        return item.markerSize as number;
      });
    })!;

    for (let i = _points.length - 1; i >= 0; i--) {
      const pointsForSeries: JSXElement[] = [];

      const legendVal: string = _points[i].legend;
      const seriesColor: string = _points[i].color!;
      const verticaLineHeight = containerHeight - margins.bottom! + 6;

      for (let j = 0; j < _points[i].data.length; j++) {
        const seriesId = `${_seriesId}_${i}_${j}`;
        const circleId = `${_circleId}_${i}_${j}`;
        const { x, y, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points[i].data[j];
        const pointMarkerSize = (_points[i].data[j] as ScatterChartDataPoint).markerSize;
        const extraMaxPixels =
          _xAxisType !== XAxisTypes.StringAxis
            ? _getRangeForScatterMarkerSize(_yAxisScale, yPadding, xMin, xMax, xPadding)
            : 0;
        const circleRadius = pointMarkerSize
          ? (pointMarkerSize! * extraMaxPixels) / maxMarkerSize
          : activePoint === circleId
          ? 6
          : 4;

        const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

        const currentPointHidden = _points[i].hideNonActiveDots && activePoint !== circleId;
        const text = _points?.[i].data[j]?.text;
        pointsForSeries.push(
          <>
            <circle
              id={circleId}
              key={circleId}
              r={circleRadius}
              cx={_xAxisScale(x) + _xBandwidth}
              cy={_yAxisScale(y)}
              data-is-focusable={isLegendSelected}
              onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                _handleHover(x, y, verticaLineHeight, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData, event)
              }
              onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                _handleHover(x, y, verticaLineHeight, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData, event)
              }
              onMouseOut={_handleMouseOut}
              onFocus={event =>
                _handleFocus(event, seriesId, x, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)
              }
              onBlur={_handleMouseOut}
              {..._getClickHandler(_points[i].data[j].onDataPointClick)}
              opacity={isLegendSelected && !currentPointHidden ? 1 : 0.1}
              fill={_getPointFill(seriesColor, circleId, j, false)}
              stroke={seriesColor}
              role="img"
              aria-label={_getAriaLabel(i, j)}
              tabIndex={isLegendSelected ? 0 : undefined}
            />
            ,
            {text && (
              <text
                key={`${circleId}-label`}
                x={_xAxisScale(x) + _xBandwidth}
                y={_yAxisScale(y) + Math.max(circleRadius + 8, 16)}
                className={classes.markerLabel}
              >
                {text}
              </text>
            )}
          </>,
        );
      }

      series.push(
        <g
          key={`series_${i}`}
          role="region"
          aria-label={`${legendVal}, series ${i + 1} of ${_points.length} with ${_points[i].data.length} data points.`}
        >
          {pointsForSeries}
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
    return series;
  }

  function _handleFocus(
    event: React.FocusEvent<SVGCircleElement, Element>,
    seriesId: string,
    x: number | Date | string,
    xAxisCalloutData: string | undefined,
    circleId: string,
    xAxisCalloutAccessibilityData?: AccessibilityProps,
  ) {
    let cx = 0;
    let cy = 0;

    const targetRect = (event.target as SVGCircleElement).getBoundingClientRect();
    cx = targetRect.left + targetRect.width / 2;
    cy = targetRect.top + targetRect.height / 2;
    updatePosition(cx, cy);
    _uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? formatDate(x, props.useUTC) : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal);
    // if no points need to be called out then don't show vertical line and callout card

    if (found) {
      d3Select(`#${_verticalLine}`)
        .attr('transform', () => `translate(${_xAxisScale(x) + _xBandwidth}, 0)`)
        .attr('visibility', 'visibility');
      _refArray.forEach((obj: RefArrayData) => {
        if (obj.index === seriesId) {
          setPopoverOpen(true);
          xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
          setYValueHover(found.values);
          setStackCalloutProps(found!);
          setActivePoint(circleId);
        }
      });
    } else {
      setActivePoint(circleId);
    }
  }

  function _handleHover(
    x: number | Date | string,
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
        .attr('transform', () => `translate(${_xAxisScale(x) + _xBandwidth}, ${_yAxisScale(y)})`)
        .attr('visibility', 'visibility')
        .attr('y2', `${lineHeight - _yAxisScale(y)}`);

      if (_uniqueCallOutID !== circleId) {
        _uniqueCallOutID = circleId;
        updatePosition(mouseEvent.clientX, mouseEvent.clientY);
        xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
        setYValueHover(found.values);
        setStackCalloutProps(found!);
        setActivePoint(circleId);
      }
    } else {
      setActivePoint(circleId);
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

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it*/

  function _legendHighlighted(legend: string): boolean {
    return _getHighlightedLegend().includes(legend);
  }

  /**
   * This function checks if none of the legends is selected or hovered.*/

  function _noLegendHighlighted(): boolean {
    return _getHighlightedLegend().length === 0;
  }

  function _getHighlightedLegend(): string[] {
    return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
  }

  function _getAriaLabel(seriesIndex: number, pointIndex: number): string {
    const series = _points[seriesIndex];
    const point = series.data[pointIndex];
    const formattedDate = point.x instanceof Date ? formatDate(point.x, props.useUTC) : point.x;
    const xValue = point.xAxisCalloutData || formattedDate;
    const legend = series.legend;
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
  }

  function _isChartEmpty(): boolean {
    return !(
      props.data &&
      props.data.scatterChartData &&
      props.data.scatterChartData.length > 0 &&
      props.data.scatterChartData.filter((item: ScatterChartPoints) => item.data.length).length > 0
    );
  }

  const _getMinMaxofXAxis = React.useCallback(
    (points: ScatterChartPoints[], yAxisType: YAxisType | undefined) =>
      _getNumericMinMaxOfY(points as ScatterChartPoints[], yAxisType),
    [],
  );

  const { legendProps, tickValues, tickFormat } = props;
  _points = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);

  let points = _points as ScatterChartPoints[];
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
    YValueHover,
    hoverXValue,
    descriptionMessage:
      props.getCalloutDescriptionMessage && stackCalloutProps
        ? props.getCalloutDescriptionMessage(stackCalloutProps)
        : undefined,
    'data-is-focusable': true,
    xAxisCalloutAccessibilityData,
    ...props.calloutProps,
    clickPosition,
    isPopoverOpen,
    isCalloutForStack: true,
    culture: props.culture ?? 'en-us',
    isCartesian: true,
  };
  const tickParams = {
    tickValues,
    tickFormat,
  };

  const xAxisLabels: string[] = _points
    .map((point: ScatterChartDataWithIndex) => point.data.map((dp: ScatterChartDataPoint) => dp.x as string))
    .flat();

  _xAxisLabels = [...new Set(xAxisLabels)];

  return !_isChartEmpty() ? (
    <CartesianChart
      {...props}
      chartTitle={props.data.chartTitle}
      points={points}
      chartType={ChartTypes.ScatterChart}
      calloutProps={calloutProps}
      tickParams={tickParams}
      legendBars={legendBars}
      getmargins={_getMargins}
      getGraphData={_initializeScatterChartData}
      xAxisType={_xAxisType}
      getMinMaxOfYAxis={_getMinMaxofXAxis}
      getDomainNRangeValues={_getDomainNRangeValues}
      createYAxis={createNumericYAxis}
      createStringYAxis={createStringYAxis}
      onChartMouseLeave={_handleChartMouseLeave}
      enableFirstRenderOptimization={_firstRenderOptimization}
      datasetForXAxisDomain={_xAxisLabels}
      componentRef={cartesianChartRef}
      /* eslint-disable react/jsx-no-bind */
      // eslint-disable-next-line react/no-children-prop
      children={(props: ChildProps) => {
        _xAxisScale = props.xScale!;
        _yAxisScale = props.yScalePrimary!;
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
              <g>{renderSeries}</g>
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
