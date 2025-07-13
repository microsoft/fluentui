import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';
import { DirectionalHint, FocusZoneDirection, getId, getRTL } from '@fluentui/react';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import { IMargins, IChart, IImageExportOptions, IGanttChartDataPoint } from '../../types/IDataPoint';
import { CartesianChart } from '../CommonComponents/index';
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

export const GanttChartBase: React.FunctionComponent<IGanttChartProps> = React.forwardRef<
  HTMLDivElement,
  IGanttChartProps
>(({ useUTC = true, yAxisCategoryOrder = 'default', ...props }, forwardedRef) => {
  const _points = React.useRef<IGanttChartDataPoint[]>([]);
  const _barHeight = React.useRef<number>(0);
  const _calloutId = React.useRef<string>(getId('callout'));
  const margins = React.useRef<IMargins>({});
  const _bars = React.useRef<React.JSX.Element[]>([]);
  const _xAxisType = React.useRef<XAxisTypes>(XAxisTypes.DateAxis);
  const _yAxisType = React.useRef<YAxisType>(YAxisType.StringAxis);
  const _calloutAnchorPoint = React.useRef<IGanttChartDataPoint | null>(null);
  const _cartesianChartRef = React.useRef<IChart>(null);
  const _legendsRef = React.useRef<ILegendContainer>(null);
  const _domainMargin = React.useRef<number>(MIN_DOMAIN_MARGIN);
  const _yAxisPadding = React.useRef<number>(0);
  const _emptyChartId = React.useRef<string>(getId('Gantt_empty'));
  const _legendColorMap = React.useRef<Record<string, [string, string]>>({});
  const _gradientId = React.useRef<string>(getId('Gantt_gradient'));
  const prevProps = React.useRef<Partial<IGanttChartProps>>({});

  const [calloutColor, setCalloutColor] = React.useState<string>('');
  const [isCalloutVisible, setCalloutVisible] = React.useState<boolean>(false);
  const [hoveredLegend, setHoveredLegend] = React.useState<string>('');
  const [calloutTarget, setCalloutTarget] = React.useState<SVGElement | null>(null);
  const [calloutLegend, setCalloutLegend] = React.useState<string>('');
  const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<IGanttChartDataPoint>();

  React.useEffect(() => {
    if (!areArraysEqual(prevProps.current.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }
    prevProps.current = props;
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

  const _getDomainNRangeValues = React.useCallback(
    (
      points: IGanttChartDataPoint[],
      _margins: IMargins,
      containerWidth: number,
      chartType: ChartTypes,
      isRTL: boolean,
      xAxisType: XAxisTypes,
      barWidth: number,
      tickValues: Date[] | number[] | undefined,
      shiftX: number,
    ): IDomainNRange => {
      const xValues: Date[] = [];
      points.forEach(point => {
        xValues.push(point.x.start, point.x.end);
      });

      const xMin = d3Min(xValues) || 0;
      const xMax = d3Max(xValues) || 0;

      return {
        dStartValue: isRTL ? xMax : xMin,
        dEndValue: isRTL ? xMin : xMax,
        rStartValue: _margins.left! + (isRTL ? 0 : shiftX),
        rEndValue: containerWidth - _margins.right! - (isRTL ? shiftX : 0),
      };
    },
    [],
  );

  const _adjustProps = (): void => {
    _points.current = _addDefaultColors(props.data);
    _barHeight.current = Math.max(props.barHeight || 24, 1);

    if (props.data && props.data.length > 0) {
      _xAxisType.current = getTypeOfAxis(props.data[0].x.start, true) as XAxisTypes;
      _yAxisType.current = getTypeOfAxis(props.data[0].y, false) as YAxisType;
    }

    _yAxisPadding.current = getScalePadding(props.yAxisPadding, undefined, 1 / 2);
  };

  const _getMargins = React.useCallback((_margins: IMargins) => {
    margins.current = _margins;
  }, []);

  const _renderContentForOnlyBars = (point: IGanttChartDataPoint): React.JSX.Element => {
    return (
      <ChartHoverCard
        XValue={point.yAxisCalloutData || point.y.toString()}
        Legend={point.legend}
        YValue={point.xAxisCalloutData || _getFormattedXValue(point)}
        color={point.color}
        culture={props.culture}
      />
    );
  };

  const _renderCallout = (point?: IGanttChartDataPoint): React.JSX.Element | null => {
    return point ? _renderContentForOnlyBars(point) : null;
  };

  const _getCustomizedCallout = () => {
    return props.onRenderCalloutPerDataPoint
      ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps, _renderCallout)
      : null;
  };

  const _getFormattedXValue = React.useCallback(
    (point: IGanttChartDataPoint): string => {
      let formattedStartX: string;
      let formattedEndX: string;

      if (_xAxisType.current === XAxisTypes.DateAxis) {
        let lowestFormatLevel = 100;
        let highestFormatLevel = -1;
        _points.current.forEach(p => {
          const formatLevel1 = getDateFormatLevel(p.x.start, useUTC);
          const formatLevel2 = getDateFormatLevel(p.x.end, useUTC);
          const minFormatLevel = Math.min(formatLevel1, formatLevel2);
          const maxFormatLevel = Math.max(formatLevel1, formatLevel2);

          if (maxFormatLevel > highestFormatLevel) {
            highestFormatLevel = maxFormatLevel;
          }
          if (minFormatLevel < lowestFormatLevel) {
            lowestFormatLevel = minFormatLevel;
          }
        });

        const formatOptions = getMultiLevelDateTimeFormatOptions(lowestFormatLevel, highestFormatLevel);
        formattedStartX = formatDateToLocaleString(point.x.start, props.culture, useUTC, false, formatOptions);
        formattedEndX = formatDateToLocaleString(point.x.end, props.culture, useUTC, false, formatOptions);
      } else {
        formattedStartX = point.x.start.toString();
        formattedEndX = point.x.end.toString();
      }

      return `${formattedStartX} - ${formattedEndX}`;
    },
    [props.culture, useUTC],
  );

  const _getAriaLabel = React.useCallback(
    (point: IGanttChartDataPoint): string => {
      const xValue = point.xAxisCalloutData || _getFormattedXValue(point);
      const yValue = point.yAxisCalloutData || point.y;
      return point.callOutAccessibilityData?.ariaLabel || `${yValue}. ` + `${xValue}.`;
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
      setDataPointCalloutProps(point);
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

  const _createBars = React.useCallback(
    (xScale: DateScale, yScale: NumberScale | StringScale): React.JSX.Element[] => {
      const bars = _points.current.map((point: IGanttChartDataPoint, index: number) => {
        const shouldHighlight = _noLegendHighlighted() || _legendHighlighted(point.legend);

        let startColor = point.color!;
        let endColor = startColor;
        if (props.enableGradient) {
          startColor = point.gradient![0];
          endColor = point.gradient![1];
        }
        const gradientId = `${_gradientId.current}_${index}`;

        const startX = xScale(point.x.start);
        const endX = xScale(point.x.end);
        const y =
          (_yAxisType.current === YAxisType.StringAxis
            ? (yScale as StringScale)(point.y as string)! + (yScale as StringScale).bandwidth() / 2
            : (yScale as NumberScale)(point.y as number)) -
          _barHeight.current / 2;

        return (
          <React.Fragment key={index}>
            {props.enableGradient && (
              <defs>
                <linearGradient id={gradientId}>
                  <stop offset="0" stopColor={startColor} />
                  <stop offset="100%" stopColor={endColor} />
                </linearGradient>
              </defs>
            )}
            <rect
              x={Math.min(startX, endX)}
              y={y}
              width={Math.abs(endX - startX)}
              height={_barHeight.current}
              rx={props.roundCorners ? 3 : 0}
              fill={props.enableGradient ? `url(#${gradientId})` : startColor}
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
          </React.Fragment>
        );
      });
      return bars;
    },
    [
      _getAriaLabel,
      _legendHighlighted,
      _noLegendHighlighted,
      _onBarFocus,
      _onBarHover,
      props.enableGradient,
      props.roundCorners,
    ],
  );

  const _getGraphData = React.useCallback(
    (
      xScale: DateScale,
      yScale: NumberScale | StringScale,
      containerHeight: number,
      containerWidth: number,
      xAxisElement: SVGElement | null,
      yAxisElement: SVGElement | null,
    ) => {
      return (_bars.current = _createBars(xScale, yScale));
    },
    [_createBars],
  );

  const _onBarLeave = (): void => {
    // do nothing
  };

  const _handleChartMouseLeave = React.useCallback((): void => {
    _calloutAnchorPoint.current = null;
    setCalloutTarget(null);
    setCalloutVisible(false);
    setCalloutLegend('');
    setCalloutColor('');
    setXCalloutValue('');
    setYCalloutValue('');
    setDataPointCalloutProps(undefined);
  }, []);

  const _closeCallout = () => {
    setCalloutVisible(false);
  };

  const _onLegendHover = (legend: string): void => {
    setHoveredLegend(legend);
  };

  const _onLegendLeave = (): void => {
    setHoveredLegend('');
  };

  const _getLegendData = (): React.JSX.Element => {
    const actions: ILegend[] = [];

    Object.keys(_legendColorMap.current).forEach((legendTitle: string) => {
      const legend: ILegend = {
        title: legendTitle,
        color: _legendColorMap.current[legendTitle][0],
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
  };

  const _onLegendSelectionChange = (
    _selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
  ): void => {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(_selectedLegends);
    } else {
      setSelectedLegends(_selectedLegends.slice(-1));
    }
    if (props.legendProps?.onChange) {
      props.legendProps.onChange(_selectedLegends, event, currentLegend);
    }
  };

  const _getChartTitle = (): string => {
    const { chartTitle } = props;
    return (chartTitle ? `${chartTitle}. ` : '') + `Gantt chart with ${_points.current.length} bars. `;
  };

  const _isChartEmpty = (): boolean => {
    return !(props.data && props.data.length > 0);
  };

  const _getYDomainMargins = React.useCallback(
    (containerHeight: number): IMargins => {
      _domainMargin.current = MIN_DOMAIN_MARGIN;

      const ySet = new Set<string | number>();
      _points.current.forEach((point: IGanttChartDataPoint) => {
        ySet.add(point.y);
      });
      const uniqueY = Array.from(ySet);

      /** Total height available to render the bars */
      const totalHeight =
        containerHeight - (margins.current.top! + MIN_DOMAIN_MARGIN) - (margins.current.bottom! + MIN_DOMAIN_MARGIN);

      if (_yAxisType.current !== YAxisType.StringAxis) {
        _barHeight.current = Math.max(
          props.barHeight ||
            calculateAppropriateBarWidth(uniqueY as number[] | Date[], totalHeight, _yAxisPadding.current),
          1,
        );
        _domainMargin.current += _barHeight.current / 2;
      }

      return {
        ...margins.current,
        top: margins.current.top! + _domainMargin.current,
        bottom: margins.current.bottom! + _domainMargin.current,
      };
    },
    [props.barHeight],
  );

  const _getOrderedYAxisLabels = () => {
    return sortAxisCategories(_mapCategoryToValues(), yAxisCategoryOrder);
  };

  const _mapCategoryToValues = () => {
    const categoryToValues: Record<string, number[]> = {};
    _points.current.forEach(point => {
      if (!categoryToValues[point.y]) {
        categoryToValues[point.y] = [];
      }
      // FIXME
      // categoryToValues[point.y].push(point.x.end - point.x.start);
    });
    return categoryToValues;
  };

  const _addDefaultColors = (data?: IGanttChartDataPoint[]): IGanttChartDataPoint[] => {
    _legendColorMap.current = {};
    let colorIndex = 0;

    return (
      data?.map(point => {
        const legend = `${point.legend}`;
        if (!_legendColorMap.current[legend]) {
          let startColor = point.color
            ? getColorFromToken(point.color, props.theme?.isInverted)
            : getNextColor(colorIndex, 0, props.theme?.isInverted);
          let endColor = startColor;

          if (props.enableGradient) {
            const nextGradient = getNextGradient(colorIndex, 0, props.theme?.isInverted);
            startColor = point.gradient?.[0] || nextGradient[0];
            endColor = point.gradient?.[1] || nextGradient[1];
          }

          _legendColorMap.current[legend] = [startColor, endColor];
          colorIndex += 1;
        }

        return {
          ...point,
          color: _legendColorMap.current[legend][0],
          ...(props.enableGradient ? { gradient: _legendColorMap.current[legend] } : {}),
        };
      }) ?? []
    );
  };

  const _renderBars = React.useCallback(() => {
    return <g>{_bars.current}</g>;
  }, []);

  if (!_isChartEmpty()) {
    _adjustProps();

    const yAxisLabels = _getOrderedYAxisLabels();
    const legendBars: React.JSX.Element = _getLegendData();
    const calloutProps = {
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
    const tickParams = {
      tickValues: props.tickValues,
      tickFormat: props.tickFormat,
    };

    return (
      <CartesianChart
        {...props}
        yAxisPadding={_yAxisPadding.current}
        chartTitle={_getChartTitle()}
        points={_points.current}
        chartType={ChartTypes.GanttChart}
        xAxisType={_xAxisType.current}
        yAxisType={_yAxisType.current}
        stringDatasetForYAxisDomain={yAxisLabels}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        createYAxis={createYAxisForHorizontalBarChartWithAxis}
        getDomainNRangeValues={_getDomainNRangeValues}
        createStringYAxis={createStringYAxisForHorizontalBarChartWithAxis}
        getMinMaxOfYAxis={findHBCWANumericMinMaxOfY}
        focusZoneDirection={FocusZoneDirection.vertical}
        customizedCallout={_getCustomizedCallout()}
        getmargins={_getMargins}
        getYDomainMargins={_getYDomainMargins}
        getGraphData={_getGraphData}
        onChartMouseLeave={_handleChartMouseLeave}
        ref={_cartesianChartRef}
        useUTC={useUTC}
        children={_renderBars}
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
