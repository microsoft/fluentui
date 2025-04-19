import * as React from 'react';
import { ScatterChartProps } from './ScatterChart.types';
import { useScatterChartStyles_unstable } from './useScatterChartStyles.styles';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { Legend, Legends } from '../Legends/index';
import { max as d3Max, min as d3Min } from 'd3-array';
import { useId } from '@fluentui/react-utilities';
import { areArraysEqual, find } from '../../utilities/index';
import {
  AccessibilityProps,
  CartesianChart,
  ChildProps,
  LineChartPoints,
  CustomizedCalloutData,
  Margins,
  RefArrayData,
  ScatterChartDataPoint,
  Chart,
} from '../../index';
import { tokens } from '@fluentui/react-theme';
import {
  calloutData,
  ChartTypes,
  XAxisTypes,
  tooltipOfXAxislabels,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  formatDate,
} from '../../utilities/index';

type NumericAxis = D3Axis<number | { valueOf(): number }>;

type ScatterChartDataWithIndex = LineChartPoints & { index: number };

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
  let _points: ScatterChartDataWithIndex[] = _injectIndexPropertyInScatterChartData(props.data.lineChartData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _calloutPoints: any[] = calloutData(_points) || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _yAxisScale: any = '';
  let _uniqueCallOutID: string | null = '';
  let _refArray: RefArrayData[] = [];
  let margins: Margins;
  let renderSeries: JSX.Element[];
  let _xAxisLabels: string[] = [];
  let xAxisCalloutAccessibilityData: AccessibilityProps = {};
  let _xBandwidth = 0;
  const cartesianChartRef = React.useRef<Chart>(null);

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
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);
  const prevPropsRef = React.useRef<ScatterChartProps | null>(null);

  React.useEffect(() => {
    if (prevPropsRef.current) {
      const prevProps = prevPropsRef.current;
      if (!areArraysEqual(prevProps.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
        setSelectedLegends(props.legendProps?.selectedLegends || []);
      }
    }
    prevPropsRef.current = props;
  }, [props]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      chartContainer: cartesianChartRef.current?.chartContainer ?? null,
    }),
    [],
  );

  const _xAxisType: XAxisTypes =
    props.data.lineChartData! &&
    props.data.lineChartData!.length > 0 &&
    props.data.lineChartData![0].data &&
    props.data.lineChartData![0].data.length > 0
      ? (getTypeOfAxis(props.data.lineChartData![0].data[0].x, true) as XAxisTypes)
      : XAxisTypes.StringAxis;

  const pointsRef = React.useRef<ScatterChartDataWithIndex[] | []>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calloutPointsRef = React.useRef<any[]>([]);
  React.useEffect(() => {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */

    if (_points !== _injectIndexPropertyInScatterChartData(props.data.lineChartData) || props.data !== _points) {
      pointsRef.current = _injectIndexPropertyInScatterChartData(props.data.lineChartData);
      calloutPointsRef.current = calloutData(pointsRef.current);
    }
  }, [props.height, props.width, props.data, _points]);

  function _injectIndexPropertyInScatterChartData(
    scatterChartData?: LineChartPoints[],
  ): ScatterChartDataWithIndex[] | [] {
    return scatterChartData
      ? scatterChartData.map((item: LineChartPoints, index: number) => {
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

  function _createLegends(data: ScatterChartDataWithIndex[]): JSX.Element {
    const { legendProps } = props;
    const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
    const legendDataItems = data.map((point: ScatterChartDataWithIndex) => {
      const color: string = point.color!;
      // mapping data to the format Legends component needs
      const legend: Legend = {
        title: point.legend!,
        color,
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
        selectedLegends={selectedLegends}
        onChange={_onLegendSelectionChange}
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

  function _createPlot(xElement: SVGElement, containerHeight: number): JSX.Element[] {
    const series: JSX.Element[] = [];
    if (isSelectedLegend) {
      _points = selectedLegendPoints;
    } else {
      _points = _injectIndexPropertyInScatterChartData(props.data.lineChartData);
    }

    const yMax = d3Max(points, (point: LineChartPoints) => {
      return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.y)!;
    })!;
    const yMin = d3Min(points, (point: LineChartPoints) => {
      return d3Min(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.y)!;
    })!;
    const yPadding = (yMax - yMin) * 0.1;
    const yPaddingRange = Math.abs(_yAxisScale(yMin + yPadding) - _yAxisScale(yMin));

    let maxMarkerRange = 40;
    let xPaddingRange = 0;
    if (_xAxisType === XAxisTypes.StringAxis) {
      _xBandwidth = _xAxisScale.bandwidth() / 2;
      xPaddingRange = _xBandwidth;
    } else if (_xAxisType === XAxisTypes.DateAxis) {
      const xMin = d3Min(points, (point: LineChartPoints) => {
        return d3Min(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.x as Date)!;
      })!;

      const xMax = d3Max(points, (point: LineChartPoints) => {
        return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => {
          return item.x as Date;
        });
      })!;

      const xPadding = (xMax.getTime() - xMin.getTime()) * 0.1;
      xPaddingRange = Math.abs(_xAxisScale(new Date(xMin.getTime() + xPadding)) - _xAxisScale(xMin));
    } else {
      const xMin = d3Min(points, (point: LineChartPoints) => {
        return d3Min(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => item.x as number)!;
      })!;

      const xMax = d3Max(points, (point: LineChartPoints) => {
        return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => {
          return item.x as number;
        });
      })!;

      const xPadding = (xMax - xMin) * 0.1;
      xPaddingRange = Math.abs(_xAxisScale(xMin + xPadding) - _xAxisScale(xMin));
    }
    maxMarkerRange = Math.min(maxMarkerRange, Math.min(xPaddingRange, yPaddingRange));

    const maxMarkerSize = d3Max(_points, (point: LineChartPoints) => {
      return d3Max(point.data as ScatterChartDataPoint[], (item: ScatterChartDataPoint) => {
        return item.markerSize as number;
      });
    })!;

    for (let i = _points.length - 1; i >= 0; i--) {
      const pointsForSeries: JSX.Element[] = [];

      const legendVal: string = _points[i].legend;
      const seriesColor: string = _points[i].color!;
      const verticaLineHeight = containerHeight - margins.bottom! + 6;

      for (let j = 0; j < _points[i].data.length; j++) {
        const seriesId = `${_seriesId}_${i}_${j}`;
        const circleId = `${_circleId}_${i}_${j}`;
        const { x, y, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points[i].data[j];
        let circleRadius = 3.5;
        const pointMarkerSize = (_points[i].data[j] as ScatterChartDataPoint).markerSize;
        if ((pointMarkerSize as number) !== undefined) {
          circleRadius = Math.min((pointMarkerSize! * maxMarkerRange) / maxMarkerSize, pointMarkerSize!);
        }

        const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

        const currentPointHidden = _points[i].hideNonActiveDots && activePoint !== circleId;
        pointsForSeries.push(
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
            onFocus={() => _handleFocus(seriesId, x, xAxisCalloutData, circleId, xAxisCalloutAccessibilityData)}
            onBlur={_handleMouseOut}
            {..._getClickHandler(_points[i].data[j].onDataPointClick)}
            opacity={isLegendSelected && !currentPointHidden ? 1 : 0.1}
            fill={_getPointFill(seriesColor, circleId, j, false)}
            stroke={seriesColor}
            role="img"
            aria-label={_getAriaLabel(i, j)}
            tabIndex={_points[i].legend !== '' ? 0 : undefined}
          />,
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
    const classes = useScatterChartStyles_unstable(props);
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
    return series;
  }

  function _handleFocus(
    seriesId: string,
    x: number | Date | string,

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
    return selectedLegends.length === 0;
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
      props.data.lineChartData &&
      props.data.lineChartData.length > 0 &&
      props.data.lineChartData.filter((item: LineChartPoints) => item.data.length).length > 0
    );
  }

  const { legendProps, tickValues, tickFormat } = props;
  _points = _injectIndexPropertyInScatterChartData(props.data.lineChartData);

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
      onChartMouseLeave={_handleChartMouseLeave}
      enableFirstRenderOptimization={_firstRenderOptimization}
      datasetForXAxisDomain={_xAxisLabels}
      componentRef={cartesianChartRef}
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
