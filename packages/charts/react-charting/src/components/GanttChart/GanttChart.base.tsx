import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';
import { DirectionalHint, FocusZoneDirection, getId, getRTL } from '@fluentui/react';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import { IMargins, IChart, IImageExportOptions, IGanttChartDataPoint } from '../../types/IDataPoint';
import { CartesianChart, IModifiedCartesianChartProps } from '../CommonComponents/index';
import { IGanttChartProps } from './GanttChart.types';
import {
  ChartHoverCard,
  ChartTypes,
  YAxisType,
  XAxisTypes,
  getTypeOfAxis,
  getNextColor,
  findHBCWANumericMinMaxOfY,
  createYAxisForHorizontalBarChartWithAxis,
  IDomainNRange,
  createStringYAxisForHorizontalBarChartWithAxis,
  getNextGradient,
  areArraysEqual,
  MIN_DOMAIN_MARGIN,
  sortAxisCategories,
  calculateAppropriateBarWidth,
  getColorFromToken,
  getScalePadding,
  getDateFormatLevel,
} from '../../utilities/index';
import { toImage } from '../../utilities/image-export-utils';
import { formatDateToLocaleString, getMultiLevelDateTimeFormatOptions } from '@fluentui/chart-utilities';

type NumberScale = ScaleLinear<number, number>;
type StringScale = ScaleBand<string>;
type DateScale = ScaleTime<Date, number>;

const DEFAULT_BAR_HEIGHT = 24;
const MIN_BAR_HEIGHT = 1;

export const GanttChartBase: React.FunctionComponent<IGanttChartProps> = React.forwardRef<
  HTMLDivElement,
  IGanttChartProps
>(({ useUTC = true, yAxisCategoryOrder = 'default', maxBarHeight = 24, ...props }, forwardedRef) => {
  const _barHeight = React.useRef<number>(DEFAULT_BAR_HEIGHT);
  const _calloutId = React.useRef<string>(getId('callout'));
  const _margins = React.useRef<IMargins>({});
  const _calloutAnchorPoint = React.useRef<IGanttChartDataPoint | null>(null);
  const _cartesianChartRef = React.useRef<IChart>(null);
  const _legendsRef = React.useRef<ILegendContainer>(null);
  const _emptyChartId = React.useRef<string>(getId('Gantt_empty'));
  const _legendMap = React.useRef<Record<string, { id: string; startColor: string; endColor: string }>>({});
  const _prevProps = React.useRef<Partial<IGanttChartProps>>({});

  const [calloutColor, setCalloutColor] = React.useState<string>('');
  const [isCalloutVisible, setCalloutVisible] = React.useState<boolean>(false);
  const [hoveredLegend, setHoveredLegend] = React.useState<string>('');
  const [calloutTarget, setCalloutTarget] = React.useState<SVGElement | null>(null);
  const [calloutLegend, setCalloutLegend] = React.useState<string>('');
  const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const [calloutDataPoint, setCalloutDataPoint] = React.useState<IGanttChartDataPoint>();

  React.useEffect(() => {
    if (!areArraysEqual(_prevProps.current.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }
    _prevProps.current = props;
  }, [props]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      chartContainer: _cartesianChartRef.current?.chartContainer ?? null,
      toImage: (opts?: IImageExportOptions): Promise<string> => {
        return toImage(_cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, getRTL(), opts);
      },
    }),
    [],
  );

  const _points = React.useMemo(() => {
    _legendMap.current = {};
    let colorIndex = 0;

    return (
      props.data?.map(point => {
        const legend = `${point.legend}`;
        if (!_legendMap.current[legend]) {
          let startColor = point.color
            ? getColorFromToken(point.color, props.theme?.isInverted)
            : getNextColor(colorIndex, 0, props.theme?.isInverted);
          let endColor = startColor;

          if (props.enableGradient) {
            const nextGradient = getNextGradient(colorIndex, 0, props.theme?.isInverted);
            startColor = point.gradient?.[0] || nextGradient[0];
            endColor = point.gradient?.[1] || nextGradient[1];
          }

          _legendMap.current[legend] = { id: getId('legend'), startColor, endColor };
          colorIndex += 1;
        }

        const { startColor, endColor } = _legendMap.current[legend];
        return {
          ...point,
          color: startColor,
          ...(props.enableGradient ? { gradient: [startColor, endColor] as [string, string] } : {}),
        };
      }) ?? []
    );
  }, [props.data, props.theme?.isInverted, props.enableGradient]);

  const _xAxisType = React.useMemo(() => {
    if (_points.length > 0) {
      return getTypeOfAxis(_points[0].x.start, true) as XAxisTypes;
    }
    return XAxisTypes.DateAxis;
  }, [_points]);

  const _yAxisType = React.useMemo(() => {
    if (_points.length > 0) {
      return getTypeOfAxis(_points[0].y, false) as YAxisType;
    }
    return YAxisType.StringAxis;
  }, [_points]);

  const _yAxisPadding = React.useMemo(() => {
    return getScalePadding(props.yAxisPadding, undefined, 1 / 2);
  }, [props.yAxisPadding]);

  const _dateFormatOptions = React.useMemo(() => {
    if (_xAxisType !== XAxisTypes.DateAxis) {
      return undefined;
    }

    let lowestFormatLevel = 100;
    let highestFormatLevel = -1;
    _points.forEach(p => {
      const startFormatLevel = getDateFormatLevel(p.x.start as Date, useUTC);
      const endFormatLevel = getDateFormatLevel(p.x.end as Date, useUTC);
      lowestFormatLevel = Math.min(lowestFormatLevel, startFormatLevel, endFormatLevel);
      highestFormatLevel = Math.max(highestFormatLevel, startFormatLevel, endFormatLevel);
    });

    return getMultiLevelDateTimeFormatOptions(lowestFormatLevel, highestFormatLevel);
  }, [useUTC, _points, _xAxisType]);

  const _mapYValueToXValues = React.useCallback(() => {
    const yValueToXValues: Record<string, number[]> = {};
    _points.forEach(point => {
      if (!yValueToXValues[point.y]) {
        yValueToXValues[point.y] = [];
      }
      yValueToXValues[point.y].push(+point.x.end - +point.x.start);
    });
    return yValueToXValues;
  }, [_points]);

  const _getOrderedYAxisLabels = React.useCallback(() => {
    const yValueToXValues = _mapYValueToXValues();

    if (_yAxisType !== YAxisType.StringAxis) {
      return Object.keys(yValueToXValues).sort((a, b) => +a - +b);
    }

    if (yAxisCategoryOrder === 'default') {
      return Object.keys(yValueToXValues).reverse();
    }
    return sortAxisCategories(yValueToXValues, yAxisCategoryOrder);
  }, [_mapYValueToXValues, _yAxisType, yAxisCategoryOrder]);

  const _yAxisLabels = React.useMemo(() => _getOrderedYAxisLabels(), [_getOrderedYAxisLabels]);

  const _getDomainNRangeValues = React.useCallback(
    (
      points: IGanttChartDataPoint[],
      margins: IMargins,
      containerWidth: number,
      chartType: ChartTypes,
      isRTL: boolean,
      xAxisType: XAxisTypes,
      barWidth: number,
      tickValues: Date[] | number[] | undefined,
      shiftX: number,
    ): IDomainNRange => {
      const xValues: (Date | number)[] = [];
      points.forEach(point => {
        xValues.push(point.x.start, point.x.end);
      });

      const xMin = d3Min(xValues) || 0;
      const xMax = d3Max(xValues) || 0;

      return {
        dStartValue: isRTL ? xMax : xMin,
        dEndValue: isRTL ? xMin : xMax,
        rStartValue: margins.left! + (isRTL ? 0 : shiftX),
        rEndValue: containerWidth - margins.right! - (isRTL ? shiftX : 0),
      };
    },
    [],
  );

  const _getMargins = React.useCallback((margins: IMargins) => {
    _margins.current = margins;
  }, []);

  const _getFormattedXValue = React.useCallback(
    (point: IGanttChartDataPoint): string => {
      let formattedStartX: string;
      let formattedEndX: string;

      if (_xAxisType === XAxisTypes.DateAxis) {
        formattedStartX = formatDateToLocaleString(
          point.x.start as Date,
          props.culture,
          useUTC,
          false,
          _dateFormatOptions,
        );
        formattedEndX = formatDateToLocaleString(point.x.end as Date, props.culture, useUTC, false, _dateFormatOptions);
      } else {
        formattedStartX = point.x.start.toString();
        formattedEndX = point.x.end.toString();
      }

      return `${formattedStartX} - ${formattedEndX}`;
    },
    [props.culture, useUTC, _dateFormatOptions, _xAxisType],
  );

  const _getCustomizedCallout = React.useCallback(() => {
    const defaultRender = (point?: IGanttChartDataPoint): React.JSX.Element | null => {
      return point ? (
        <ChartHoverCard
          XValue={point.yAxisCalloutData || point.y.toString()}
          Legend={point.legend}
          YValue={point.xAxisCalloutData || _getFormattedXValue(point)}
          color={point.color}
          culture={props.culture}
        />
      ) : null;
    };

    return props.onRenderCalloutPerDataPoint
      ? props.onRenderCalloutPerDataPoint(calloutDataPoint, defaultRender)
      : null;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_getFormattedXValue, calloutDataPoint, props.culture, props.onRenderCalloutPerDataPoint]);

  const _getAriaLabel = React.useCallback(
    (point: IGanttChartDataPoint): string => {
      const xValue = point.xAxisCalloutData || _getFormattedXValue(point);
      const yValue = point.yAxisCalloutData || point.y;
      return (
        point.callOutAccessibilityData?.ariaLabel ||
        `${yValue}. ` + (point.legend ? `${point.legend}, ` : '') + `${xValue}.`
      );
    },
    [_getFormattedXValue],
  );

  const _getHighlightedLegend = React.useCallback(() => {
    return selectedLegends.length > 0 ? selectedLegends : hoveredLegend ? [hoveredLegend] : [];
  }, [hoveredLegend, selectedLegends]);

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  const _legendHighlighted = React.useCallback(
    (legend: string | undefined) => {
      return _getHighlightedLegend().includes(`${legend}`);
    },
    [_getHighlightedLegend],
  );

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  const _noLegendHighlighted = React.useCallback(() => {
    return _getHighlightedLegend().length === 0;
  }, [_getHighlightedLegend]);

  const _showCallout = React.useCallback(
    (target: SVGElement, point: IGanttChartDataPoint) => {
      if (!(_noLegendHighlighted() || _legendHighlighted(point.legend)) || _calloutAnchorPoint.current === point) {
        return;
      }

      _calloutAnchorPoint.current = point;
      setCalloutTarget(target);
      setCalloutVisible(true);
      setCalloutLegend(point.legend!);
      setCalloutColor(point.color!);
      setXCalloutValue(point.yAxisCalloutData || point.y.toString());
      setYCalloutValue(point.xAxisCalloutData! || _getFormattedXValue(point));
      setCalloutDataPoint(point);
    },
    [_getFormattedXValue, _legendHighlighted, _noLegendHighlighted],
  );

  const _onBarFocus = React.useCallback(
    (point: IGanttChartDataPoint, focusEvent: React.FocusEvent<SVGElement>): void => {
      _showCallout(focusEvent.currentTarget, point);
    },
    [_showCallout],
  );

  const _onBarHover = React.useCallback(
    (point: IGanttChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>): void => {
      _showCallout(mouseEvent.currentTarget, point);
    },
    [_showCallout],
  );

  const _onBarLeave = React.useCallback((): void => {
    // do nothing
  }, []);

  const _handleChartMouseLeave = React.useCallback((): void => {
    _calloutAnchorPoint.current = null;
    setCalloutTarget(null);
    setCalloutVisible(false);
    setCalloutLegend('');
    setCalloutColor('');
    setXCalloutValue('');
    setYCalloutValue('');
    setCalloutDataPoint(undefined);
  }, []);

  const _closeCallout = React.useCallback(() => {
    setCalloutVisible(false);
  }, []);

  const _getBarHeight = React.useCallback(
    (adjustedValue: number): number => {
      let barHeight: number;
      if (typeof props.barHeight === 'number') {
        barHeight = props.barHeight;
      } else {
        barHeight = adjustedValue;
      }
      if (typeof maxBarHeight === 'number') {
        barHeight = Math.min(barHeight, maxBarHeight);
      }
      barHeight = Math.max(barHeight, MIN_BAR_HEIGHT);
      return barHeight;
    },
    [maxBarHeight, props.barHeight],
  );

  const _getOrderedDataPoints = React.useCallback(() => {
    const result: IGanttChartDataPoint[] = [];

    const yValueToPoints: Record<string, IGanttChartDataPoint[]> = {};
    _points.forEach(point => {
      if (!yValueToPoints[point.y]) {
        yValueToPoints[point.y] = [];
      }
      yValueToPoints[point.y].push(point);
    });

    for (let i = _yAxisLabels.length - 1; i >= 0; i--) {
      const yValue = _yAxisLabels[i];
      if (yValueToPoints[yValue]) {
        result.push(...yValueToPoints[yValue].sort((a, b) => +a.x.start - +b.x.start));
      }
    }

    return result;
  }, [_points, _yAxisLabels]);

  const _createBars = React.useCallback(
    ({
      xScale,
      yScalePrimary: yScale,
    }: {
      xScale: DateScale | NumberScale;
      yScalePrimary: NumberScale | StringScale;
    }): React.JSX.Element => {
      const getGradientId = (legend: string | undefined) => {
        const legendId = _legendMap.current[`${legend}`].id;
        return `${legendId}_gradient`;
      };

      const gradientDefs: React.JSX.Element[] = [];
      if (props.enableGradient) {
        Object.keys(_legendMap.current).forEach((legend: string, index: number) => {
          const { startColor, endColor } = _legendMap.current[legend];
          gradientDefs.push(
            <linearGradient key={index} id={getGradientId(legend)}>
              <stop offset="0" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>,
          );
        });
      }

      let scaleBandwidth = 0;
      if (_yAxisType === YAxisType.StringAxis) {
        scaleBandwidth = (yScale as StringScale).bandwidth();
        _barHeight.current = _getBarHeight(scaleBandwidth);
      }

      const points = _getOrderedDataPoints();
      const bars = points.map((point: IGanttChartDataPoint, index: number) => {
        const rectStartX = xScale(point.x.start);
        const rectEndX = xScale(point.x.end);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rectY = yScale(point.y as any)! + (scaleBandwidth - _barHeight.current) / 2;

        const shouldHighlight = _noLegendHighlighted() || _legendHighlighted(point.legend);

        return (
          <rect
            key={index}
            x={Math.min(rectStartX, rectEndX)}
            y={rectY}
            width={Math.abs(rectEndX - rectStartX)}
            height={_barHeight.current}
            rx={props.roundCorners ? 3 : 0}
            fill={props.enableGradient ? `url(#${getGradientId(point.legend)})` : point.color}
            opacity={shouldHighlight ? 1 : 0.1}
            onClick={point.onClick}
            onMouseOver={event => _onBarHover(point, event)}
            onMouseLeave={_onBarLeave}
            onFocus={event => _onBarFocus(point, event)}
            onBlur={_onBarLeave}
            data-is-focusable={shouldHighlight}
            role="img"
            aria-label={_getAriaLabel(point)}
          />
        );
      });
      return (
        <g>
          {gradientDefs.length > 0 ? <defs>{gradientDefs}</defs> : null}
          {bars}
        </g>
      );
    },
    [
      _getAriaLabel,
      _getBarHeight,
      _getOrderedDataPoints,
      _legendHighlighted,
      _noLegendHighlighted,
      _onBarFocus,
      _onBarHover,
      _onBarLeave,
      _yAxisType,
      props.enableGradient,
      props.roundCorners,
    ],
  );

  const _onLegendHover = React.useCallback((legend: string): void => {
    setHoveredLegend(legend);
  }, []);

  const _onLegendLeave = React.useCallback((): void => {
    setHoveredLegend('');
  }, []);

  const _onLegendSelectionChange = React.useCallback(
    (_selectedLegends: string[], event: React.MouseEvent<HTMLButtonElement>, currentLegend?: ILegend): void => {
      if (props.legendProps?.canSelectMultipleLegends) {
        setSelectedLegends(_selectedLegends);
      } else {
        setSelectedLegends(_selectedLegends.slice(-1));
      }
      if (props.legendProps?.onChange) {
        props.legendProps.onChange(_selectedLegends, event, currentLegend);
      }
    },
    [props.legendProps],
  );

  const _getLegendData = React.useCallback((): React.JSX.Element => {
    const actions: ILegend[] = [];

    Object.keys(_legendMap.current).forEach((legendTitle: string) => {
      const legend: ILegend = {
        title: legendTitle,
        color: _legendMap.current[legendTitle].startColor,
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(legendTitle);
        },
        onMouseOutAction: () => {
          _onLegendLeave();
        },
      };

      actions.push(legend);
    });

    const legends = (
      <Legends
        legends={actions}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowProps={props.legendsOverflowProps}
        focusZonePropsInHoverCard={props.focusZonePropsForLegendsInHoverCard}
        overflowText={props.legendsOverflowText}
        onChange={_onLegendSelectionChange}
        ref={_legendsRef}
        {...props.legendProps}
      />
    );
    return legends;
  }, [
    _handleChartMouseLeave,
    _onLegendHover,
    _onLegendLeave,
    _onLegendSelectionChange,
    props.enabledLegendsWrapLines,
    props.focusZonePropsForLegendsInHoverCard,
    props.legendProps,
    props.legendsOverflowProps,
    props.legendsOverflowText,
  ]);

  const _getChartTitle = React.useCallback((): string => {
    return (props.chartTitle ? `${props.chartTitle}. ` : '') + `Gantt chart with ${_points.length} data points. `;
  }, [_points.length, props.chartTitle]);

  const _isChartEmpty = React.useCallback((): boolean => {
    return _points.length === 0;
  }, [_points.length]);

  const _getYDomainMargins = React.useCallback(
    (containerHeight: number): IMargins => {
      let domainMargin = MIN_DOMAIN_MARGIN;

      const ySet = new Set<string | number>();
      _points.forEach((point: IGanttChartDataPoint) => {
        ySet.add(point.y);
      });
      const uniqueY = Array.from(ySet);

      /** Total height available to render the bars */
      const totalHeight =
        containerHeight - (_margins.current.top! + MIN_DOMAIN_MARGIN) - (_margins.current.bottom! + MIN_DOMAIN_MARGIN);

      if (_yAxisType !== YAxisType.StringAxis) {
        _barHeight.current = _getBarHeight(
          calculateAppropriateBarWidth(uniqueY as number[] | Date[], totalHeight, _yAxisPadding),
        );
        domainMargin += _barHeight.current / 2;
      }

      return {
        ..._margins.current,
        top: _margins.current.top! + domainMargin,
        bottom: _margins.current.bottom! + domainMargin,
      };
    },
    [_getBarHeight, _points, _yAxisPadding, _yAxisType],
  );

  if (!_isChartEmpty()) {
    _barHeight.current = _getBarHeight(DEFAULT_BAR_HEIGHT);

    const calloutProps: IModifiedCartesianChartProps['calloutProps'] = {
      isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      id: `toolTip${_calloutId.current}`,
      target: calloutTarget,
      isBeakVisible: false,
      gapSpace: 15,
      color: calloutColor,
      legend: calloutLegend,
      XValue: xCalloutValue,
      YValue: yCalloutValue,
      onDismiss: _closeCallout,
      preventDismissOnLostFocus: true,
      ...props.calloutProps,
    };
    const tickParams: IModifiedCartesianChartProps['tickParams'] = {
      tickValues: props.tickValues,
      tickFormat: props.tickFormat,
    };

    return (
      <CartesianChart
        {...props}
        yAxisPadding={_yAxisPadding}
        chartTitle={_getChartTitle()}
        points={_points}
        chartType={ChartTypes.GanttChart}
        xAxisType={_xAxisType}
        yAxisType={_yAxisType}
        stringDatasetForYAxisDomain={_yAxisLabels}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={_getLegendData()}
        createYAxis={createYAxisForHorizontalBarChartWithAxis}
        getDomainNRangeValues={_getDomainNRangeValues}
        createStringYAxis={createStringYAxisForHorizontalBarChartWithAxis}
        getMinMaxOfYAxis={findHBCWANumericMinMaxOfY}
        focusZoneDirection={FocusZoneDirection.bidirectional}
        customizedCallout={_getCustomizedCallout()}
        getmargins={_getMargins}
        getYDomainMargins={_getYDomainMargins}
        onChartMouseLeave={_handleChartMouseLeave}
        ref={_cartesianChartRef}
        useUTC={useUTC}
        children={_createBars}
      />
    );
  } else {
    return (
      <div
        id={_emptyChartId.current}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }
});

GanttChartBase.displayName = 'GanttChart';
