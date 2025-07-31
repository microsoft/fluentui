import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { Legend, Legends, LegendContainer } from '../Legends/index';
import { Margins, GanttChartDataPoint } from '../../types/DataPoint';
import { CartesianChart, ModifiedCartesianChartProps } from '../CommonComponents/index';
import { GanttChartProps } from './GanttChart.types';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { ChartPopoverProps, ImageExportOptions, Chart } from '../../index';
import {
  ChartTypes,
  YAxisType,
  XAxisTypes,
  getTypeOfAxis,
  getNextColor,
  findHBCWANumericMinMaxOfY,
  createYAxisForHorizontalBarChartWithAxis,
  IDomainNRange,
  createStringYAxisForHorizontalBarChartWithAxis,
  areArraysEqual,
  MIN_DOMAIN_MARGIN,
  sortAxisCategories,
  calculateAppropriateBarWidth,
  getColorFromToken,
  getScalePadding,
  getDateFormatLevel,
  useRtl,
} from '../../utilities/index';
import { formatDateToLocaleString, getMultiLevelDateTimeFormatOptions } from '@fluentui/chart-utilities';
import { toImage } from '../../utilities/image-export-utils';

type NumberScale = ScaleLinear<number, number>;
type StringScale = ScaleBand<string>;
type DateScale = ScaleTime<Date, number>;

const DEFAULT_BAR_HEIGHT = 24;
const MIN_BAR_HEIGHT = 1;

export const GanttChart: React.FunctionComponent<GanttChartProps> = React.forwardRef<HTMLDivElement, GanttChartProps>(
  ({ useUTC = true, yAxisCategoryOrder = 'default', maxBarHeight = 24, ...props }, forwardedRef) => {
    const _barHeight = React.useRef<number>(DEFAULT_BAR_HEIGHT);
    const _margins = React.useRef<Margins>({});
    const _calloutAnchorPoint = React.useRef<GanttChartDataPoint | null>(null);
    const _emptyChartId = useId('Gantt_empty');
    const _legendId = useId('gantt_legend');
    const _legendMap = React.useRef<Record<string, { id: string; startColor: string; endColor: string }>>({});
    const _prevProps = React.useRef<Partial<GanttChartProps>>({});

    const [calloutColor, setCalloutColor] = React.useState<string>('');
    const [hoveredLegend, setHoveredLegend] = React.useState<string>('');
    const [calloutLegend, setCalloutLegend] = React.useState<string>('');
    const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
    const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
    const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
    const [calloutDataPoint, setCalloutDataPoint] = React.useState<GanttChartDataPoint>();
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);
    const cartesianChartRef = React.useRef<Chart>(null);
    const _legendsRef = React.useRef<LegendContainer>(null);
    const _isRTL = useRtl();

    React.useEffect(() => {
      if (!areArraysEqual(_prevProps.current.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
        setSelectedLegends(props.legendProps?.selectedLegends || []);
      }
      _prevProps.current = props;
    }, [props]);

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

    const _points = React.useMemo(() => {
      _legendMap.current = {};
      let colorIndex = 0;

      return (
        props.data?.map(point => {
          const legend = `${point.legend}`;
          if (!_legendMap.current[legend]) {
            let startColor = point.color ? getColorFromToken(point.color) : getNextColor(colorIndex, 0);
            let endColor = startColor;

            if (props.enableGradient) {
              startColor = point.gradient?.[0]!;
              endColor = point.gradient?.[1]!;
            }

            _legendMap.current[legend] = { id: `${_legendId}_${colorIndex}`, startColor, endColor };
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
    }, [props.data, props.enableGradient]);

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
        const startFormatLevel = getDateFormatLevel(p.x.start as Date, useUTC as boolean);
        const endFormatLevel = getDateFormatLevel(p.x.end as Date, useUTC as boolean);
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
        points: GanttChartDataPoint[],
        margins: Margins,
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

    const _getMargins = React.useCallback((margins: Margins) => {
      _margins.current = margins;
    }, []);

    const _getFormattedXValue = React.useCallback(
      (point: GanttChartDataPoint): string => {
        let formattedStartX: string;
        let formattedEndX: string;

        if (_xAxisType === XAxisTypes.DateAxis) {
          formattedStartX = formatDateToLocaleString(
            point.x.start as Date,
            props.culture,
            useUTC as boolean,
            false,
            _dateFormatOptions,
          );
          formattedEndX = formatDateToLocaleString(
            point.x.end as Date,
            props.culture,
            useUTC as boolean,
            false,
            _dateFormatOptions,
          );
        } else {
          formattedStartX = point.x.start.toString();
          formattedEndX = point.x.end.toString();
        }

        return `${formattedStartX} - ${formattedEndX}`;
      },
      [props.culture, useUTC, _dateFormatOptions, _xAxisType],
    );

    const _getCustomizedCallout = React.useCallback(() => {
      const defaultRender = (point?: GanttChartDataPoint): JSXElement | null => {
        return point ? (
          <ChartPopover
            isPopoverOpen={isPopoverOpen}
            clickPosition={clickPosition}
            XValue={point.yAxisCalloutData || point.y.toString()}
            legend={point.legend}
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
      (point: GanttChartDataPoint): string => {
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
      (target: React.MouseEvent<SVGElement> | React.FocusEvent<SVGElement>, point: GanttChartDataPoint) => {
        if (!(_noLegendHighlighted() || _legendHighlighted(point.legend)) || _calloutAnchorPoint.current === point) {
          return;
        }
        if ('clientX' in target && 'clientY' in target) {
          updatePosition(target.clientX, target.clientY);
        } else {
          const rect = (target.target as SVGElement).getBoundingClientRect();
          updatePosition(rect.left, rect.top);
        }
        _calloutAnchorPoint.current = point;
        setPopoverOpen(true);
        setCalloutLegend(point.legend!);
        setCalloutColor(point.color!);
        setXCalloutValue(point.yAxisCalloutData || point.y.toString());
        setYCalloutValue(point.xAxisCalloutData! || _getFormattedXValue(point));
        setCalloutDataPoint(point);
      },
      [_getFormattedXValue, _legendHighlighted, _noLegendHighlighted],
    );

    const _onBarFocus = React.useCallback(
      (point: GanttChartDataPoint, focusEvent: React.FocusEvent<SVGElement>): void => {
        _showCallout(focusEvent, point);
      },
      [_showCallout],
    );

    const _onBarHover = React.useCallback(
      (point: GanttChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>): void => {
        _showCallout(mouseEvent, point);
      },
      [_showCallout],
    );

    const _onBarLeave = React.useCallback((): void => {
      // do nothing
    }, []);

    const _handleChartMouseLeave = React.useCallback((): void => {
      _calloutAnchorPoint.current = null;
      setPopoverOpen(false);
      setCalloutLegend('');
      setCalloutColor('');
      setXCalloutValue('');
      setYCalloutValue('');
      setCalloutDataPoint(undefined);
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
      const result: GanttChartDataPoint[] = [];

      const yValueToPoints: Record<string, GanttChartDataPoint[]> = {};
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
      }): JSXElement => {
        const getGradientId = (legend: string | undefined) => {
          const legendId = _legendMap.current[`${legend}`].id;
          return `${legendId}_gradient`;
        };

        const gradientDefs: JSXElement[] = [];
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
        const bars = points.map((point: GanttChartDataPoint, index: number) => {
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
              onMouseOver={(event: React.MouseEvent<SVGElement>) => _onBarHover(point, event)}
              onMouseLeave={_onBarLeave}
              onFocus={(event: React.FocusEvent<SVGElement>) => _onBarFocus(point, event)}
              onBlur={_onBarLeave}
              tabIndex={shouldHighlight ? 0 : -1}
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
      (_selectedLegends: string[], event: React.MouseEvent<HTMLButtonElement>, currentLegend?: Legend): void => {
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

    const _getLegendData = React.useCallback((): JSXElement => {
      const actions: Legend[] = [];

      Object.keys(_legendMap.current).forEach((legendTitle: string) => {
        const legend: Legend = {
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
          overflowText={props.legendsOverflowText}
          onChange={_onLegendSelectionChange}
          {...props.legendProps}
          legendRef={_legendsRef}
        />
      );
      return legends;
    }, [
      _handleChartMouseLeave,
      _onLegendHover,
      _onLegendLeave,
      _onLegendSelectionChange,
      props.enabledLegendsWrapLines,
      props.legendProps,
      props.legendsOverflowText,
    ]);

    const _getChartTitle = React.useCallback((): string => {
      return (props.chartTitle ? `${props.chartTitle}. ` : '') + `Gantt chart with ${_points.length} data points. `;
    }, [_points.length, props.chartTitle]);

    const _isChartEmpty = React.useCallback((): boolean => {
      return _points.length === 0;
    }, [_points.length]);

    const _getYDomainMargins = React.useCallback(
      (containerHeight: number): Margins => {
        let domainMargin = MIN_DOMAIN_MARGIN;

        const ySet = new Set<string | number>();
        _points.forEach((point: GanttChartDataPoint) => {
          ySet.add(point.y);
        });
        const uniqueY = Array.from(ySet);

        /** Total height available to render the bars */
        const totalHeight =
          containerHeight -
          (_margins.current.top! + MIN_DOMAIN_MARGIN) -
          (_margins.current.bottom! + MIN_DOMAIN_MARGIN);

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

    if (!_isChartEmpty()) {
      _barHeight.current = _getBarHeight(DEFAULT_BAR_HEIGHT);

      const calloutProps: ChartPopoverProps = {
        isPopoverOpen,
        clickPosition,
        color: calloutColor,
        legend: calloutLegend,
        XValue: xCalloutValue,
        YValue: yCalloutValue,
        ...props.calloutProps,
      };
      const tickParams: ModifiedCartesianChartProps['tickParams'] = {
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
          componentRef={cartesianChartRef}
          stringDatasetForYAxisDomain={_yAxisLabels}
          calloutProps={calloutProps}
          tickParams={tickParams}
          legendBars={_getLegendData()}
          createYAxis={createYAxisForHorizontalBarChartWithAxis}
          getDomainNRangeValues={_getDomainNRangeValues}
          createStringYAxis={createStringYAxisForHorizontalBarChartWithAxis}
          getMinMaxOfYAxis={findHBCWANumericMinMaxOfY}
          customizedCallout={_getCustomizedCallout()}
          getmargins={_getMargins}
          getYDomainMargins={_getYDomainMargins}
          onChartMouseLeave={_handleChartMouseLeave}
          useUTC={useUTC}
          children={_createBars}
        />
      );
    } else {
      return (
        <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
      );
    }
  },
);

GanttChart.displayName = 'GanttChart';
