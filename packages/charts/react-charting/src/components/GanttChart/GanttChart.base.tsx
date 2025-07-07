import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';
import { DirectionalHint, FocusZoneDirection, getId, getRTL } from '@fluentui/react';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import { IMargins, IChart, IImageExportOptions, IGanttChartDataPoint } from '../../types/IDataPoint';
import { CartesianChart, IChildProps } from '../CommonComponents/index';
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
} from '../../utilities/index';
import { toImage } from '../../utilities/image-export-utils';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';

type NumberScale = ScaleLinear<number, number>;
type StringScale = ScaleBand<string>;
type DateScale = ScaleTime<Date, number>;

export const GanttChartBase: React.FunctionComponent<IGanttChartProps> = React.forwardRef<
  HTMLDivElement,
  IGanttChartProps
>((props, forwardedRef) => {
  const _points = React.useRef<IGanttChartDataPoint[]>([]);
  const _barHeight = React.useRef<number>(0);
  const _calloutId = React.useRef<string>(getId('callout'));
  const margins = React.useRef<IMargins>({});
  const _isRtl: boolean = getRTL();
  const _bars = React.useRef<JSX.Element[]>([]);
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
        return toImage(_cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, _isRtl, opts);
      },
    }),
    [],
  );

  function _getDomainNRangeValues(
    points: IGanttChartDataPoint[],
    margins: IMargins,
    containerWidth: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | undefined,
    shiftX: number,
  ): IDomainNRange {
    const xValues: Date[] = [];
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
  }

  function _adjustProps(): void {
    _points.current = _addDefaultColors(props.data);
    _barHeight.current = Math.max(props.barHeight || 24, 1);

    if (props.data && props.data.length > 0) {
      _xAxisType.current = getTypeOfAxis(props.data[0].x.start, true) as XAxisTypes;
      _yAxisType.current = getTypeOfAxis(props.data[0].y, false) as YAxisType;
    }

    _yAxisPadding.current = getScalePadding(props.yAxisPadding, undefined, 1 / 2);
  }

  function _getMargins(_margins: IMargins) {
    margins.current = _margins;
  }

  function _renderContentForOnlyBars(point: IGanttChartDataPoint): JSX.Element {
    return (
      <ChartHoverCard
        XValue={point.yAxisCalloutData || point.y.toString()}
        Legend={point.legend}
        YValue={point.xAxisCalloutData || _getFormattedXValue(point)}
        color={point.color}
        culture={props.culture}
      />
    );
  }

  function _renderCallout(props?: IGanttChartDataPoint): JSX.Element | null {
    return props ? _renderContentForOnlyBars(props) : null;
  }

  function _getCustomizedCallout() {
    return props.onRenderCalloutPerDataPoint
      ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps, _renderCallout)
      : null;
  }

  function _getGraphData(
    xScale: DateScale,
    yScale: NumberScale | StringScale,
    containerHeight: number,
    containerWidth: number,
    xAxisElement: SVGElement | null,
    yAxisElement: SVGElement | null,
  ) {
    return (_bars.current = _createBars(xScale, yScale));
  }

  function _onBarHover(point: IGanttChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>): void {
    _showCallout(mouseEvent.currentTarget, point);
  }

  function _onBarLeave(): void {}

  function _handleChartMouseLeave(): void {
    _calloutAnchorPoint.current = null;
    setCalloutTarget(null);
    setCalloutVisible(false);
    setCalloutLegend('');
    setCalloutColor('');
    setXCalloutValue('');
    setYCalloutValue('');
    setDataPointCalloutProps(undefined);
  }

  function _onBarFocus(point: IGanttChartDataPoint, focusEvent: React.FocusEvent<SVGElement>): void {
    _showCallout(focusEvent.currentTarget, point);
  }

  function _closeCallout() {
    setCalloutVisible(false);
  }

  function _showCallout(target: SVGElement, point: IGanttChartDataPoint) {
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
  }

  function _createBars(xScale: DateScale, yScale: NumberScale | StringScale): JSX.Element[] {
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
  }

  function _onLegendHover(legend: string): void {
    setHoveredLegend(legend);
  }

  function _onLegendLeave(): void {
    setHoveredLegend('');
  }

  function _getLegendData(): JSX.Element {
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
  }

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  function _legendHighlighted(legend: string | undefined) {
    return _getHighlightedLegend().includes(`${legend}`);
  }

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  function _noLegendHighlighted() {
    return _getHighlightedLegend().length === 0;
  }

  function _getHighlightedLegend() {
    return selectedLegends.length > 0 ? selectedLegends : hoveredLegend ? [hoveredLegend] : [];
  }

  function _onLegendSelectionChange(
    _selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
  ): void {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(_selectedLegends);
    } else {
      setSelectedLegends(_selectedLegends.slice(-1));
    }
    if (props.legendProps?.onChange) {
      props.legendProps.onChange(_selectedLegends, event, currentLegend);
    }
  }

  function _getAriaLabel(point: IGanttChartDataPoint): string {
    const xValue = point.xAxisCalloutData || _getFormattedXValue(point);
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${yValue}. ` + `${xValue}.`;
  }

  function _getChartTitle(): string {
    const { chartTitle } = props;
    return (chartTitle ? `${chartTitle}. ` : '') + `Gantt chart with ${_points.current.length} bars. `;
  }

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  function _getYDomainMargins(containerHeight: number): IMargins {
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
  }

  function _getOrderedYAxisLabels() {
    return sortAxisCategories(_mapCategoryToValues(), props.yAxisCategoryOrder);
  }

  function _mapCategoryToValues() {
    const categoryToValues: Record<string, number[]> = {};
    _points.current.forEach(point => {
      if (!categoryToValues[point.y]) {
        categoryToValues[point.y] = [];
      }
      // FIXME
      // categoryToValues[point.y].push(point.x);
    });
    return categoryToValues;
  }

  function _addDefaultColors(data?: IGanttChartDataPoint[]): IGanttChartDataPoint[] {
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
  }

  function _getFormattedXValue(point: IGanttChartDataPoint): string {
    let formattedStartX: string;
    let formattedEndX: string;

    if (_xAxisType.current === XAxisTypes.DateAxis) {
      formattedStartX = formatDateToLocaleString(point.x.start, props.culture, props.useUTC);
      formattedEndX = formatDateToLocaleString(point.x.end, props.culture, props.useUTC);
    } else {
      formattedStartX = point.x.start.toString();
      formattedEndX = point.x.end.toString();
    }

    return `${formattedStartX} - ${formattedEndX}`;
  }

  if (!_isChartEmpty()) {
    _adjustProps();

    const yAxisLabels = _getOrderedYAxisLabels();
    const legendBars: JSX.Element = _getLegendData();
    const calloutProps = {
      isCalloutVisible: isCalloutVisible,
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
        children={(props: IChildProps) => {
          return (
            <>
              <g>{_bars.current}</g>
            </>
          );
        }}
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

GanttChartBase.defaultProps = {
  yAxisCategoryOrder: 'default',
};
