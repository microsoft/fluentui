import * as React from 'react';
import { IChildProps, IScatterChartStyleProps, IScatterChartStyles, IScatterChartProps } from './ScatterChart.types';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import { max as d3Max } from 'd3-array';
import {
  areArraysEqual,
  createNumericYAxis,
  createStringYAxis,
  domainRangeOfXStringAxis,
  findNumericMinMaxOfY,
  getDomainPaddingForMarkers,
  isScatterPolarSeries,
  isTextMode,
  YAxisType,
  isPlottable,
  getRangeForScatterMarkerSize,
  domainRangeOfDateForAreaLineScatterVerticalBarCharts,
  domainRangeOfNumericForAreaLineScatterCharts,
  findCalloutPoints,
} from '../../utilities/index';
import {
  IAccessibilityProps,
  CartesianChart,
  ICustomizedCalloutData,
  IMargins,
  IRefArrayData,
  IChart,
  IYValueHover,
} from '../../index';
import {
  calloutData,
  ChartTypes,
  XAxisTypes,
  tooltipOfAxislabels,
  getTypeOfAxis,
  getNextColor,
  getColorFromToken,
  sortAxisCategories,
} from '../../utilities/index';
import { classNamesFunction, DirectionalHint, getId, getRTL } from '@fluentui/react';
import { IImageExportOptions, IScatterChartDataPoint, IScatterChartPoints } from '../../types/index';
import { ILineChartPoints } from '../../types/IDataPoint';
import { toImage as convertToImage } from '../../utilities/image-export-utils';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';
import { renderScatterPolarCategoryLabels } from '../../utilities/scatterpolar-utils';

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
  let _calloutPoints = React.useMemo(() => calloutData(_points.current) || {}, [_points]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _xAxisScale: any = React.useRef<any>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _yAxisScale: any = React.useRef<any>('');
  const _uniqueCallOutID = React.useRef<string | null>(null);
  const _refArray = React.useMemo(() => [], []);
  const margins = React.useRef<IMargins | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const renderSeries = React.useRef<JSX.Element[]>([]);
  let _xAxisLabels: string[] = [];
  const _xAxisCalloutAccessibilityData: IAccessibilityProps = {};
  const _xBandwidth = React.useRef<number>(0);
  const cartesianChartRef = React.useRef<IChart>(null);
  const legendsRef = React.useRef<ILegendContainer>(null);

  const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [YValueHover, setYValueHover] = React.useState<IYValueHover[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedLegendPoints, setSelectedLegendPoints] = React.useState<any[]>([]);
  const [isSelectedLegend, setIsSelectedLegend] = React.useState<boolean>(false);
  const [activePoint, setActivePoint] = React.useState<string>('');
  const [stackCalloutProps, setStackCalloutProps] = React.useState<ICustomizedCalloutData>();
  const [isCalloutVisible, setCalloutVisible] = React.useState(false);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const [refSelected, setRefSelected] = React.useState<string>('');
  const prevSelectedLegendsRef = React.useRef<string[] | undefined>(undefined);
  const _isScatterPolarRef = React.useRef(false);
  const _isTextMode = React.useRef(false);

  const classNames = getClassNames(props.styles!, {
    theme: props.theme!,
  });

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

  // Detect y axis type (numeric or string)
  const _yAxisType: YAxisType =
    props.data.scatterChartData &&
    props.data.scatterChartData.length > 0 &&
    props.data.scatterChartData[0].data &&
    props.data.scatterChartData[0].data.length > 0
      ? typeof props.data.scatterChartData[0].data[0].y === 'string'
        ? YAxisType.StringAxis
        : YAxisType.NumericAxis
      : YAxisType.NumericAxis;

  const pointsRef = React.useRef<ScatterChartDataWithIndex[] | []>([]);
  React.useEffect(() => {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */

    if (
      _points.current !== _injectIndexPropertyInScatterChartData(props.data.scatterChartData) ||
      props.data !== _points.current
    ) {
      pointsRef.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
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

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  function _createLegends(data: ScatterChartDataWithIndex[]): JSX.Element {
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
    const legendDataItems: ILegend[] = Object.entries(mapLegendToPoints).map(([legendTitle, points]) => {
      const representativePoint = points[0];
      // mapping data to the format Legends component needs
      const legend: ILegend = {
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
        overflowProps={props.legendsOverflowProps}
        focusZonePropsInHoverCard={props.focusZonePropsForLegendsInHoverCard}
        overflowText={props.legendsOverflowText}
        {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: _onHoverCardHide })}
        onChange={_onLegendSelectionChange}
        {...props.legendProps}
      />
    );
  }

  function _getOrderedYAxisLabels() {
    const shouldOrderYAxisLabelsByCategoryOrder =
      _yAxisType === YAxisType.StringAxis && props.yAxisCategoryOrder !== 'default';
    if (!shouldOrderYAxisLabelsByCategoryOrder) {
      // Collect all unique string y values from all data points in all series, in reverse order
      const yLabelsSet = new Set<string>();
      for (let i = _points.current.length - 1; i >= 0; i--) {
        const point = _points.current[i];
        if (point.data && Array.isArray(point.data)) {
          for (const d of point.data) {
            if (typeof d.y === 'string') {
              yLabelsSet.add(d.y);
            }
          }
        }
      }
      return Array.from(yLabelsSet);
    }

    return sortAxisCategories(_mapCategoryToValues(), props.yAxisCategoryOrder);
  }

  function _mapCategoryToValues() {
    const categoryToValues: Record<string, number[]> = {};
    _points.current.forEach(point => {
      if (point.data && Array.isArray(point.data)) {
        point.data.forEach(d => {
          if (typeof d.y === 'string') {
            if (!categoryToValues[d.y]) {
              categoryToValues[d.y] = [];
            }
            if (typeof d.x === 'number') {
              categoryToValues[d.y].push(d.x);
            }
          }
        });
      }
    });
    return categoryToValues;
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
        return domainRangeOfNumericForAreaLineScatterCharts(
          points,
          domainMargins,
          width,
          isRTL,
          props.xScaleType,
          true,
        );
      } else if (xAxisType === XAxisTypes.DateAxis) {
        return domainRangeOfDateForAreaLineScatterVerticalBarCharts(
          points,
          domainMargins,
          width,
          isRTL,
          tickValues! as Date[],
          _chartType,
        );
      }
      // String Axis type
      return domainRangeOfXStringAxis(domainMargins, width, isRTL);
    },
    [props.xScaleType],
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
      const found = findCalloutPoints(_calloutPoints, x);
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
      y: number,
      lineHeight: number,
      xAxisCalloutData: string | undefined,
      circleId: string,
      xAxisCalloutAccessibilityData: IAccessibilityProps | undefined,
      mouseEvent: React.MouseEvent<SVGElement>,
    ) => {
      mouseEvent?.persist();
      const formattedData = x instanceof Date ? formatDateToLocaleString(x, props.culture, props.useUTC) : x;
      const found = findCalloutPoints(_calloutPoints, x) as ICustomizedCalloutData | undefined;
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

  const _getHighlightedLegend = React.useCallback((): string[] => {
    return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
  }, [selectedLegends, activeLegend]);

  /**
   * This function checks if none of the legends is selected or hovered.*/
  const _noLegendHighlighted = React.useCallback((): boolean => {
    return _getHighlightedLegend().length === 0;
  }, [_getHighlightedLegend]);

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
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    (xElement: SVGElement, containerHeight: number): JSX.Element[] => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const series: JSX.Element[] = [];
      if (isSelectedLegend) {
        _points.current = selectedLegendPoints;
      } else {
        _points.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);
      }

      if (_xAxisType === XAxisTypes.StringAxis) {
        _xBandwidth.current = _xAxisScale.current?.bandwidth() / 2;
      }

      const maxMarkerSize = d3Max(_points.current, (point: IScatterChartPoints) => {
        return d3Max(point.data as IScatterChartDataPoint[], (item: IScatterChartDataPoint) => {
          return item.markerSize as number;
        });
      })!;
      const extraMaxPixels =
        _xAxisType !== XAxisTypes.StringAxis && _yAxisType !== YAxisType.StringAxis
          ? getRangeForScatterMarkerSize({
              data: _points.current,
              xScale: _xAxisScale.current,
              yScalePrimary: _yAxisScale.current,
              xScaleType: props.xScaleType,
              yScaleType: props.yScaleType,
            })
          : 0;

      for (let i = _points.current?.length - 1; i >= 0; i--) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        const pointsForSeries: JSX.Element[] = [];

        const legendVal: string = _points.current?.[i]?.legend;
        const seriesColor: string = _points.current?.[i]?.color!;
        const verticaLineHeight = containerHeight - (margins.current?.bottom ?? 0) + 6;

        for (let j = 0; j < _points.current?.[i]?.data?.length; j++) {
          const { x, y, xAxisCalloutData, xAxisCalloutAccessibilityData } = _points.current?.[i]?.data[j];
          const xPoint = _xAxisScale.current?.(x);
          // Use string y axis scale if needed
          const yPoint =
            _yAxisType === YAxisType.StringAxis
              ? _yAxisScale.current?.(y) + (_yAxisScale.current?.bandwidth ? _yAxisScale.current.bandwidth() / 2 : 0)
              : _yAxisScale.current?.(y);
          if (!isPlottable(xPoint, yPoint)) {
            continue;
          }

          const seriesId = `${_seriesId}_${i}_${j}`;
          const circleId = `${_circleId}_${i}_${j}`;
          const pointMarkerSize = (_points.current?.[i]?.data[j] as IScatterChartDataPoint).markerSize;
          const minPixel = 4;
          const maxPixel = 16;
          const circleRadius =
            pointMarkerSize && maxMarkerSize !== 0
              ? _xAxisType !== XAxisTypes.StringAxis
                ? (pointMarkerSize * extraMaxPixels) / maxMarkerSize
                : minPixel + ((pointMarkerSize - minPixel) / (maxMarkerSize - minPixel)) * (maxPixel - minPixel)
              : activePoint === circleId
              ? 6
              : 4;

          const isLegendSelected: boolean = _legendHighlighted(legendVal) || _noLegendHighlighted() || isSelectedLegend;

          const currentPointHidden = _points.current?.[i]?.hideNonActiveDots && activePoint !== circleId;
          const text = _points.current?.[i].data[j]?.text;
          if (!_isTextMode.current) {
            pointsForSeries.push(
              <>
                <circle
                  id={circleId}
                  key={circleId}
                  r={Math.max(circleRadius, 4)}
                  cx={xPoint + _xBandwidth.current}
                  cy={yPoint}
                  data-is-focusable={isLegendSelected}
                  onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                    _handleHover(
                      x,
                      y,
                      verticaLineHeight,
                      xAxisCalloutData,
                      circleId,
                      xAxisCalloutAccessibilityData,
                      event,
                    )
                  }
                  onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                    _handleHover(
                      x,
                      y,
                      verticaLineHeight,
                      xAxisCalloutData,
                      circleId,
                      xAxisCalloutAccessibilityData,
                      event,
                    )
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
                />
              </>,
            );
          }
          if (_isTextMode && text) {
            pointsForSeries.push(
              <text
                key={`${circleId}-label`}
                x={xPoint + _xBandwidth.current}
                y={yPoint + Math.max(circleRadius + 12, 16)}
                className={classNames.markerLabel}
              >
                {text}
              </text>,
            );
          }
        }

        if (_isScatterPolarRef.current) {
          pointsForSeries.push(
            ...renderScatterPolarCategoryLabels({
              xAxisScale: _xAxisScale.current,
              yAxisScale: _yAxisScale.current,
              className: classNames.markerLabel || '',
              lineOptions: (_points.current?.[i] as Partial<ILineChartPoints>)?.lineOptions,
            }),
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
      _yAxisType,
      activePoint,
      isSelectedLegend,
      selectedLegendPoints,
      classNames,
      props.xScaleType,
      props.yScaleType,
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
      _isScatterPolarRef.current = isScatterPolarSeries(_points.current);
      _isTextMode.current = isTextMode(_points.current);
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

  const _getNumericMinMaxOfY = React.useCallback(
    (points: IScatterChartPoints[], yAxisType?: YAxisType): { startValue: number; endValue: number } => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { startValue, endValue } = findNumericMinMaxOfY(points, yAxisType, undefined, props.yScaleType);
      const yPadding = getDomainPaddingForMarkers(startValue, endValue, props.yScaleType);

      return {
        startValue: startValue - yPadding.start,
        endValue: endValue + yPadding.end,
      };
    },
    [props.yScaleType],
  );

  const { legendProps, tickValues, tickFormat } = props;
  _points.current = _injectIndexPropertyInScatterChartData(props.data.scatterChartData);

  let points = _points.current as IScatterChartPoints[];
  if (legendProps && !!legendProps.canSelectMultipleLegends) {
    points = selectedLegendPoints.length >= 1 ? selectedLegendPoints : _points.current;
    _calloutPoints = calloutData(points);
  }

  let legendBars = null;
  // reduce computation cost by only creating legendBars
  // if when hideLegend is false.
  // NOTE: they are rendered only when hideLegend is false in CartesianChart.
  if (!props.hideLegend && !_isTextMode.current) {
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

  // Compute unique y axis labels for string y axis
  const _yAxisLabels: string[] = _getOrderedYAxisLabels();

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
      getMinMaxOfYAxis={_getNumericMinMaxOfY}
      getDomainNRangeValues={getDomainNRangeValuesScatterChart}
      createYAxis={createNumericYAxis}
      createStringYAxis={createStringYAxis}
      getGraphData={_initializeScatterChartData}
      xAxisType={_xAxisType}
      yAxisType={_yAxisType}
      // Pass stringDatasetForYAxisDomain only if y axis is string
      {...(_yAxisType === YAxisType.StringAxis ? { stringDatasetForYAxisDomain: _yAxisLabels } : {})}
      onChartMouseLeave={_handleChartMouseLeave}
      enableFirstRenderOptimization={_firstRenderOptimization}
      datasetForXAxisDomain={_xAxisLabels}
      componentRef={cartesianChartRef}
      {...(_isScatterPolarRef.current ? { yMaxValue: 1, yMinValue: -1 } : {})}
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
