import * as React from 'react';
import { IChildProps, IScatterChartStyleProps, IScatterChartStyles, IScatterChartProps } from './ScatterChart.types';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import { max as d3Max, min as d3Min } from 'd3-array';
import {
  areArraysEqual,
  createStringYAxis,
  createYAxisForScatterChart,
  domainRangeOfDateForScatterChart,
  domainRangeOfNumericForScatterChart,
  domainRangeOfXStringAxis,
  findNumericMinMaxOfY,
} from '../../utilities/index';
import {
  IAccessibilityProps,
  CartesianChart,
  ICustomizedCalloutData,
  IMargins,
  IRefArrayData,
  IChart,
} from '../../index';
import {
  calloutData,
  ChartTypes,
  XAxisTypes,
  tooltipOfAxislabels,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
} from '../../utilities/index';
import { classNamesFunction, DirectionalHint, find, getId, getRTL } from '@fluentui/react';
import { IImageExportOptions, IScatterChartDataPoint, IScatterChartPoints } from '../../types/index';
import { toImage as convertToImage } from '../../utilities/image-export-utils';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';

type NumericAxis = D3Axis<number | { valueOf(): number }>;

type ScatterChartDataWithIndex = IScatterChartPoints & { index: number };
const getClassNames = classNamesFunction<IScatterChartStyleProps, IScatterChartStyles>();

// Create a ScatterChart variant which uses these default styles and this styled subcomponent.
/**
 * ScatterChart component
 * {@docCategory ScatterChart}
 */
export const ScatterChartBase: React.FunctionComponent<IScatterChartProps> = React.forwardRef<
  HTMLDivElement,
  IScatterChartProps
>((props, forwardedRef) => {
  const _circleId = React.useMemo(() => getId('circle'), []);
  const _seriesId: string = React.useMemo(() => getId('seriesID'), []);
  const _verticalLine: string = React.useMemo(() => getId('verticalLine'), []);
  const _tooltipId: string = React.useMemo(() => getId('ScatterChartTooltipId_'), []);
  const _firstRenderOptimization = true;
  const _emptyChartId: string = React.useMemo(() => getId('_ScatterChart_empty'), []);
  const _points = React.useRef<ScatterChartDataWithIndex[]>(
    _injectIndexPropertyInScatterChartData(props.data.scatterChartData),
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _calloutPoints = React.useMemo(() => calloutData(_points.current as any) || [], [_points]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _xAxisScale: any = React.useRef<any>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _yAxisScale: any = React.useRef<any>('');
  const _uniqueCallOutID = React.useRef<string | null>(null);
  const _refArray = React.useMemo(() => [], []);
  const margins = React.useRef<IMargins | null>(null);
  const renderSeries = React.useRef<JSX.Element[]>([]);
  let _xAxisLabels: string[] = [];
  const _xAxisCalloutAccessibilityData: IAccessibilityProps = {};
  const _xBandwidth = React.useRef<number>(0);
  const cartesianChartRef = React.useRef<IChart>(null);
  const legendsRef = React.useRef<ILegendContainer>(null);

  const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [YValueHover, setYValueHover] = React.useState<[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedLegendPoints, setSelectedLegendPoints] = React.useState<any[]>([]);
  const [isSelectedLegend, setIsSelectedLegend] = React.useState<boolean>(false);
  const [activePoint, setActivePoint] = React.useState<string>('');
  const [stackCalloutProps, setStackCalloutProps] = React.useState<ICustomizedCalloutData>();
  const [isCalloutVisible, setCalloutVisible] = React.useState(false);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);
  const [refSelected, setRefSelected] = React.useState<string>('');
  const prevPropsRef = React.useRef<IScatterChartProps | null>(null);

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
      toImage: (opts?: IImageExportOptions): Promise<string> => {
        return convertToImage(cartesianChartRef.current?.chartContainer, legendsRef.current?.toSVG, getRTL(), opts);
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

    if (
      _points.current !== _injectIndexPropertyInScatterChartData(props.data.scatterChartData) ||
      props.data !== _points.current
    ) {
      pointsRef.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
      calloutPointsRef.current = calloutData(pointsRef.current);
    }
  }, [props.height, props.width, props.data, _points]);

  function _injectIndexPropertyInScatterChartData(
    scatterChartData?: IScatterChartPoints[],
  ): ScatterChartDataWithIndex[] | [] {
    return scatterChartData
      ? scatterChartData.map((item: IScatterChartPoints, index: number) => {
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

  const _getMargins = React.useCallback((_margins: IMargins) => {
    margins.current = _margins;
  }, []);

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
      const legend: ILegend = {
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
        overflowProps={props.legendsOverflowProps}
        focusZonePropsInHoverCard={props.focusZonePropsForLegendsInHoverCard}
        overflowText={props.legendsOverflowText}
        {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: _onHoverCardHide })}
        onChange={_onLegendSelectionChange}
        {...props.legendProps}
      />
    );
  }

  function _onLegendSelectionChange(
    legendsSelected: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
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

  const _getPointFill = React.useCallback(
    (lineColor: string, pointId: string) => {
      const { theme } = props;
      if (activePoint === pointId) {
        return theme!.semanticColors.bodyBackground;
      } else {
        return lineColor;
      }
    },
    [activePoint, props],
  );

  const getDomainNRangeValuesScatterChart = React.useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      points: any,
      domainMargins: IMargins,
      width: number,
      _chartType: ChartTypes,
      isRTL: boolean,
      xAxisType: XAxisTypes,
      _barWidth: number,
      tickValues: number[] | Date[] | string[] | undefined,
    ) => {
      if (xAxisType === XAxisTypes.NumericAxis) {
        return domainRangeOfNumericForScatterChart(points, domainMargins, width, isRTL);
      } else if (xAxisType === XAxisTypes.DateAxis) {
        return domainRangeOfDateForScatterChart(points, domainMargins, width, isRTL, tickValues! as Date[]);
      }
      // String Axis type
      return domainRangeOfXStringAxis(domainMargins, width, isRTL);
    },
    [],
  );

  const _handleFocus = React.useCallback(
    (
      seriesId: string,
      x: number | Date | string,
      xAxisCalloutData: string | undefined,
      circleId: string,
      xAxisCalloutAccessibilityData?: IAccessibilityProps,
    ) => {
      _uniqueCallOutID.current = circleId;
      const formattedData = x instanceof Date ? formatDateToLocaleString(x, props.culture, props.useUTC) : x;
      const xVal = x instanceof Date ? x.getTime() : x;
      const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal) as
        | { x: string | number; values: [] }
        | undefined;
      // if no points need to be called out then don't show vertical line and callout card
      if (found) {
        d3Select(`#${_verticalLine}`)
          .attr('transform', () => `translate(${_xAxisScale.current?.(x) + _xBandwidth.current}, 0)`)
          .attr('visibility', 'visibility');
        _refArray.forEach((obj: IRefArrayData) => {
          if (obj.index === seriesId) {
            setCalloutVisible(true);
            xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
            setRefSelected(`#${circleId}`);
            setYValueHover(found!.values);
            setActivePoint(circleId);
          }
        });
      } else {
        setActivePoint(circleId);
      }
    },
    [_verticalLine, _xAxisScale, _xBandwidth, _calloutPoints, _refArray, props.culture, props.useUTC],
  );

  const _handleHover = React.useCallback(
    (
      x: number | Date | string,
      y: number | Date,
      lineHeight: number,
      xAxisCalloutData: string | undefined,
      circleId: string,
      xAxisCalloutAccessibilityData: IAccessibilityProps | undefined,
      mouseEvent: React.MouseEvent<SVGElement>,
    ) => {
      mouseEvent?.persist();
      const formattedData = x instanceof Date ? formatDateToLocaleString(x, props.culture, props.useUTC) : x;
      const xVal = x instanceof Date ? x.getTime() : x;
      const found = find(_calloutPoints, (element: { x: string | number }) => element.x === xVal) as
        | { x: string | number; values: [] }
        | undefined;
      // if no points need to be called out then don't show vertical line and callout card
      if (found) {
        d3Select(`#${_verticalLine}`)
          .attr(
            'transform',
            () => `translate(${_xAxisScale.current?.(x) + _xBandwidth.current}, ${_yAxisScale.current?.(y)})`,
          )
          .attr('visibility', 'visibility')
          .attr('y2', `${lineHeight - _yAxisScale.current?.(y)}`);

        if (_uniqueCallOutID.current !== circleId) {
          _uniqueCallOutID.current = circleId;
          setCalloutVisible(true);
          xAxisCalloutData ? setHoverXValue(xAxisCalloutData) : setHoverXValue('' + formattedData);
          setRefSelected(`#${circleId}`);
          setYValueHover(found.values);
          setStackCalloutProps(found!);
          setActivePoint(circleId);
        }
      } else {
        setActivePoint(circleId);
      }
    },
    [_verticalLine, _xAxisScale, _xBandwidth, _calloutPoints, props.culture, props.useUTC],
  );

  const _handleMouseOut = React.useCallback(() => {
    d3Select(`#${_verticalLine}`).attr('visibility', 'hidden');
  }, [_verticalLine]);

  const _handleChartMouseLeave = React.useCallback(() => {
    _uniqueCallOutID.current = null;
    setActivePoint('');
    if (isCalloutVisible) {
      setCalloutVisible(false);
    }
  }, [_uniqueCallOutID, isCalloutVisible, setActivePoint, setCalloutVisible]);

  /**
   * This function checks if none of the legends is selected or hovered.*/

  const _noLegendHighlighted = React.useCallback((): boolean => {
    return selectedLegends.length === 0;
  }, [selectedLegends]);

  const _getHighlightedLegend = React.useCallback((): string[] => {
    return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
  }, [selectedLegends, activeLegend]);

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it*/

  const _legendHighlighted = React.useCallback(
    (legend: string): boolean => {
      return _getHighlightedLegend().includes(legend);
    },
    [_getHighlightedLegend],
  );

  const _getAriaLabel = React.useCallback(
    (seriesIndex: number, pointIndex: number): string => {
      const series = _points.current?.[seriesIndex];
      const point = series.data[pointIndex];
      const formattedDate =
        point.x instanceof Date ? formatDateToLocaleString(point.x, props.culture, props.useUTC) : point.x;
      const xValue = point.xAxisCalloutData || formattedDate;
      const legend = series.legend;
      const yValue = point.yAxisCalloutData || point.y;
      return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
    },
    [_points, props.culture, props.useUTC],
  );

  const _createPlot = React.useCallback(
    (xElement: SVGElement, containerHeight: number): JSX.Element[] => {
      const series: JSX.Element[] = [];
      if (isSelectedLegend) {
        _points.current = selectedLegendPoints;
      } else {
        _points.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
      }

      const yMax = d3Max(_points.current, (point: IScatterChartPoints) => {
        return d3Max(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => item.y)!;
      })!;
      const yMin = d3Min(_points.current, (point: IScatterChartPoints) => {
        return d3Min(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => item.y)!;
      })!;
      const yPadding = (yMax - yMin) * 0.1;
      const yPaddingRange = Math.abs(_yAxisScale.current?.(yMin + yPadding) - _yAxisScale.current?.(yMin));

      let maxMarkerRange = 40;
      let xPaddingRange = 0;
      if (_xAxisType === XAxisTypes.StringAxis) {
        _xBandwidth.current = _xAxisScale.current?.bandwidth() / 2;
        xPaddingRange = _xBandwidth.current;
      } else if (_xAxisType === XAxisTypes.DateAxis) {
        const xMin = d3Min(_points.current, (point: IScatterChartPoints) => {
          return d3Min(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => item.x as Date)!;
        })!;

        const xMax = d3Max(_points.current, (point: IScatterChartPoints) => {
          return d3Max(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => {
            return item.x as Date;
          });
        })!;

        const xPadding = (xMax.getTime() - xMin.getTime()) * 0.1;
        xPaddingRange = Math.abs(
          _xAxisScale.current?.(new Date(xMin.getTime() + xPadding)) - _xAxisScale.current?.(xMin),
        );
      } else {
        const xMin = d3Min(_points.current, (point: IScatterChartPoints) => {
          return d3Min(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => item.x as number)!;
        })!;

        const xMax = d3Max(_points.current, (point: IScatterChartPoints) => {
          return d3Max(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => {
            return item.x as number;
          });
        })!;

        const xPadding = (xMax - xMin) * 0.1;
        xPaddingRange = Math.abs(_xAxisScale.current?.(xMin + xPadding) - _xAxisScale.current?.(xMin));
      }
      maxMarkerRange = Math.min(maxMarkerRange, Math.min(xPaddingRange, yPaddingRange));

      const maxMarkerSize = d3Max(_points.current, (point: IScatterChartPoints) => {
        return d3Max(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => {
          return item.markerSize as number;
        });
      })!;

      for (let i = _points.current?.length - 1; i >= 0; i--) {
        const pointsForSeries: JSX.Element[] = [];

        const legendVal: string = _points.current?.[i]?.legend;
        const seriesColor: string = _points.current?.[i]?.color!;
        const verticaLineHeight = containerHeight - (margins.current?.bottom ?? 0) + 6;

        for (let j = 0; j < _points.current?.[i]?.data?.length; j++) {
          const seriesId = `${_seriesId}_${i}_${j}`;
          const circleId = `${_circleId}_${i}_${j}`;
          const { x, y, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points.current?.[i]?.data[j];
          let circleRadius = 3.5;
          const pointMarkerSize = (_points.current?.[i]?.data[j] as IScatterChartDataPoint).markerSize;
          if ((pointMarkerSize as number) !== undefined) {
            circleRadius = Math.min((pointMarkerSize! * maxMarkerRange) / maxMarkerSize, pointMarkerSize!);
          }

          const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

          const currentPointHidden = _points.current?.[i]?.hideNonActiveDots && activePoint !== circleId;
          pointsForSeries.push(
            <circle
              id={circleId}
              key={circleId}
              r={circleRadius}
              cx={_xAxisScale.current?.(x) + _xBandwidth.current}
              cy={_yAxisScale.current?.(y)}
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
              {..._getClickHandler(_points.current?.[i]?.data[j]?.onDataPointClick)}
              opacity={isLegendSelected && !currentPointHidden ? 1 : 0.1}
              fill={_getPointFill(seriesColor, circleId)}
              stroke={seriesColor}
              role="img"
              aria-label={_getAriaLabel(i, j)}
              tabIndex={_points.current?.[i]?.legend !== '' ? 0 : undefined}
            />,
          );
        }

        series.push(
          <g
            key={`series_${i}`}
            role="region"
            aria-label={`${legendVal}, series ${i + 1} of ${_points.current?.length} with ${
              _points.current?.[i]?.data?.length
            } data points.`}
          >
            {pointsForSeries}
          </g>,
        );
      }
      const classNames = getClassNames(props.styles!, {
        theme: props.theme!,
      });
      // Removing un wanted tooltip div from DOM, when prop not provided.
      if (!props.showXAxisLablesTooltip) {
        try {
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      // Used to display tooltip at x axis labels.
      if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
        const xAxisElement = d3Select(xElement).call(_xAxisScale.current);
        try {
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          // eslint-disable-next-line no-empty
        } catch (e) {}
        const tooltipProps = {
          tooltipCls: classNames.tooltip!,
          id: _tooltipId,
          xAxis: xAxisElement,
        };
        xAxisElement && tooltipOfAxislabels(tooltipProps);
      }
      return series;
    },
    [
      _xAxisScale,
      _yAxisScale,
      props.data.scatterChartData,
      props.theme,
      props.styles,
      props.showXAxisLablesTooltip,
      props.wrapXAxisLables,
      _circleId,
      _getAriaLabel,
      _getPointFill,
      _handleFocus,
      _handleHover,
      _handleMouseOut,
      _legendHighlighted,
      _noLegendHighlighted,
      _seriesId,
      _tooltipId,
      _xAxisType,
      activePoint,
      isSelectedLegend,
      selectedLegendPoints,
    ],
  );

  const _initializeScatterChartData = React.useCallback(
    (
      xScale: NumericAxis,
      yScale: NumericAxis,
      containerHeight: number,
      containerWidth: number,
      xElement: SVGElement | null,
    ) => {
      _xAxisScale.current = xScale;
      _yAxisScale.current = yScale;
      renderSeries.current = _createPlot(xElement!, containerHeight!);
    },
    [renderSeries, _xAxisScale, _yAxisScale, _createPlot],
  );

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

  function _isChartEmpty(): boolean {
    return !(
      props.data &&
      props.data.scatterChartData &&
      props.data.scatterChartData.length > 0 &&
      props.data.scatterChartData.filter((item: IScatterChartPoints) => item.data.length).length > 0
    );
  }

  function _closeCallout() {
    setCalloutVisible(false);
  }

  const _createStringYAxis = React.useCallback((...createStringAxisprops: Parameters<typeof createStringYAxis>) => {
    return createStringYAxis(...createStringAxisprops);
  }, []);

  const { legendProps, tickValues, tickFormat } = props;
  _points.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);

  let points = _points.current;
  if (legendProps && !!legendProps.canSelectMultipleLegends) {
    points = selectedLegendPoints.length >= 1 ? selectedLegendPoints : _points.current;
    _calloutPoints = calloutData(points);
  }

  let legendBars = null;
  // reduce computation cost by only creating legendBars
  // if when hideLegend is false.
  // NOTE: they are rendered only when hideLegend is false in CartesianChart.
  if (!props.hideLegend) {
    legendBars = _createLegends(_points.current!); // ToDo: Memoize legends to improve performance.
  }
  const calloutProps = {
    isCalloutVisible,
    directionalHint: DirectionalHint.topAutoEdge,
    YValueHover,
    hoverXValue,
    id: `toolTip${_uniqueCallOutID.current}`,
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
    xAxisCalloutAccessibilityData: _xAxisCalloutAccessibilityData,
    ...props.calloutProps,
  };
  const tickParams = {
    tickValues,
    tickFormat,
  };

  const xAxisLabels: string[] = _points.current
    .map((point: ScatterChartDataWithIndex) => point.data.map((dp: IScatterChartDataPoint) => dp.x as string))
    .flat();

  _xAxisLabels = Array.from(new Set(xAxisLabels));

  return !_isChartEmpty() ? (
    <CartesianChart
      {...props}
      ref={cartesianChartRef}
      chartTitle={props.data.chartTitle}
      isCalloutForStack
      points={points}
      chartType={ChartTypes.ScatterChart}
      calloutProps={calloutProps}
      tickParams={tickParams}
      legendBars={legendBars}
      getmargins={_getMargins}
      getMinMaxOfYAxis={findNumericMinMaxOfY}
      getDomainNRangeValues={getDomainNRangeValuesScatterChart}
      createYAxis={createYAxisForScatterChart}
      createStringYAxis={_createStringYAxis}
      getGraphData={_initializeScatterChartData}
      xAxisType={_xAxisType}
      onChartMouseLeave={_handleChartMouseLeave}
      enableFirstRenderOptimization={_firstRenderOptimization}
      datasetForXAxisDomain={_xAxisLabels}
      componentRef={cartesianChartRef}
      /* eslint-disable react/jsx-no-bind */
      // eslint-disable-next-line react/no-children-prop
      children={(childProps: IChildProps) => {
        _xAxisScale.current = childProps.xScale!;
        _yAxisScale.current = childProps.yScalePrimary!;
        return (
          <>
            <g>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={childProps.containerHeight}
                stroke={'#323130'}
                id={_verticalLine}
                visibility={'hidden'}
                strokeDasharray={'5,5'}
              />
              <g>{renderSeries.current}</g>
            </g>
          </>
        );
      }}
    />
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
ScatterChartBase.displayName = 'ScatterChart';
