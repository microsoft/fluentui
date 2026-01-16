'use client';

/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Pie } from './Pie/index';
import { DonutChartProps } from './DonutChart.types';
import { useDonutChartStyles } from './useDonutChartStyles.styles';
import { ChartDataPoint } from '../../DonutChart';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import {
  areArraysEqual,
  getColorFromToken,
  getNextColor,
  MIN_DONUT_RADIUS,
  useRtl,
  ChartTitle,
} from '../../utilities/index';
import { Legend, Legends } from '../../index';
import type { LegendContainer } from '../../index';
import { useId, useMergedRefs } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { ChartAnnotationLayer, ChartPopover } from '../CommonComponents';
import { useImageExport } from '../../utilities/hooks';
import {
  useDonutAnnotationLayout,
  computeAnnotationViewportPadding,
  resolveDonutViewportLayout,
} from './useDonutAnnotationLayout';

const MIN_LEGEND_CONTAINER_HEIGHT = 40;

// Create a DonutChart variant which uses these default styles and this styled subcomponent.
/**
 * Donutchart component.
 * {@docCategory DonutChart}
 */
export const DonutChart: React.FunctionComponent<DonutChartProps> = React.forwardRef<HTMLDivElement, DonutChartProps>(
  ({ innerRadius = 0, hideLabels = true, ...restProps }, forwardedRef) => {
    const props = { innerRadius, hideLabels, ...restProps };
    const { chartContainerRef: _rootElem, legendsRef: _legendsRef } = useImageExport(
      props.componentRef,
      props.hideLegend,
      false,
    );
    const rootRef = useMergedRefs(_rootElem, forwardedRef);
    const _uniqText: string = useId('_Pie_');
    const _emptyChartId: string = useId('_DonutChart_empty');
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let _calloutAnchorPoint: ChartDataPoint | null;
    const legendContainer = React.useRef<HTMLDivElement | null>(null);
    const prevSize = React.useRef<{ width?: number; height?: number }>({});

    const [value, setValue] = React.useState<string | undefined>('');
    const [legend, setLegend] = React.useState<string | undefined>('');
    const [_width, setWidth] = React.useState<number | undefined>(props.width || 200);
    const [_height, setHeight] = React.useState<number | undefined>(props.height || 200);
    const [activeLegend, setActiveLegend] = React.useState<string | undefined>(undefined);
    const [color, setColor] = React.useState<string | undefined>('');
    const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
    const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
    const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
    const [focusedArcId, setFocusedArcId] = React.useState<string>('');
    const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<ChartDataPoint | undefined>();
    const [refSelected, setRefSelected] = React.useState<HTMLElement | null>(null);
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);
    const prevPropsRef = React.useRef<DonutChartProps | null>(null);
    const _isRTL: boolean = useRtl();

    React.useEffect(() => {
      _fitParentContainer();
    }, []);

    React.useEffect(() => {
      if (prevPropsRef.current) {
        const prevProps = prevPropsRef.current;
        if (!areArraysEqual(prevProps.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
          setSelectedLegends(props.legendProps?.selectedLegends || []);
        }
      }
      prevPropsRef.current = props;
    }, [props]);

    React.useEffect(() => {
      if (prevSize.current.height !== props.height || prevSize.current.width !== props.width) {
        _fitParentContainer();
      }
      prevSize.current.height = props.height;
      prevSize.current.width = props.width;
    }, [props.width, props.height]);

    function _createLegends(chartData: ChartDataPoint[]): JSXElement | undefined {
      if (!chartData || chartData.length === 0) {
        return undefined;
      }

      const dataForLegend =
        props.order === 'sorted' ? [...chartData].sort((a, b) => (b.data ?? 0) - (a.data ?? 0)) : chartData;

      const legendDataItems: Legend[] = dataForLegend.map((point, index) => {
        const legendTitle = point.legend ?? '';
        const resolvedColor =
          typeof point.color === 'string' && point.color.length > 0 ? point.color : getNextColor(index, 0);

        return {
          title: legendTitle,
          color: resolvedColor,
          hoverAction: () => {
            _handleChartMouseLeave();
            setActiveLegend(legendTitle);
          },
          onMouseOutAction: () => {
            setActiveLegend(undefined);
          },
        };
      });

      return (
        <Legends
          legends={legendDataItems}
          centerLegends
          overflowText={props.legendsOverflowText}
          {...props.legendProps}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={_onLegendSelectionChange}
          legendRef={_legendsRef as React.RefObject<LegendContainer>}
        />
      );
    }
    function _onLegendSelectionChange(
      selectedLegends: string[],
      event: React.MouseEvent<HTMLButtonElement>,
      currentLegend?: Legend,
    ): void {
      if (props.legendProps && props.legendProps?.canSelectMultipleLegends) {
        setSelectedLegends(selectedLegends);
      } else {
        setSelectedLegends(selectedLegends.slice(-1));
      }
      if (props.legendProps?.onChange) {
        props.legendProps.onChange(selectedLegends, event, currentLegend);
      }
    }

    function _focusCallback(
      data: ChartDataPoint,
      id: string,
      e: React.FocusEvent<SVGPathElement>,
      targetElement?: HTMLElement | null,
    ): void {
      setPopoverOpen(_noLegendsHighlighted() || _isLegendHighlighted(data.legend));
      setValue(data.data!.toString());
      setLegend(data.legend);
      setColor(data.color!);
      setXCalloutValue(data.xAxisCalloutData!);
      setYCalloutValue(data.yAxisCalloutData!);
      setFocusedArcId(id);
      setDataPointCalloutProps(data);
      setRefSelected(targetElement!);
    }

    function _hoverCallback(
      data: ChartDataPoint,
      e: React.MouseEvent<SVGPathElement>,
      targetElement?: HTMLElement | null,
    ): void {
      if (_calloutAnchorPoint !== data) {
        _calloutAnchorPoint = data;
        setPopoverOpen(_noLegendsHighlighted() || _isLegendHighlighted(data.legend));
        setValue(data.data!.toString());
        setLegend(data.legend);
        setColor(data.color!);
        setXCalloutValue(data.xAxisCalloutData!);
        setYCalloutValue(data.yAxisCalloutData!);
        setDataPointCalloutProps(data);
        setRefSelected(targetElement!);
      }
    }
    function _onBlur(): void {
      setFocusedArcId('');
    }

    function _hoverLeave(): void {
      /**/
    }

    function _handleChartMouseLeave() {
      _calloutAnchorPoint = null;
      setPopoverOpen(false);
    }

    function _valueInsideDonut(valueInsideDonut: string | number | undefined, data: ChartDataPoint[]) {
      const highlightedLegends = _getHighlightedLegend();
      if (valueInsideDonut !== undefined && (highlightedLegends.length === 1 || isPopoverOpen)) {
        const pointValue = data.find(point => _isLegendHighlighted(point.legend));
        return pointValue
          ? pointValue.yAxisCalloutData
            ? pointValue.yAxisCalloutData
            : pointValue.data!
          : valueInsideDonut;
      } else if (highlightedLegends.length > 0) {
        let totalValue = 0;
        data.forEach(point => {
          if (highlightedLegends.includes(point.legend!)) {
            totalValue += point.data!;
          }
        });
        return totalValue;
      } else {
        return valueInsideDonut;
      }
    }

    function _toLocaleString(data: string | number | undefined) {
      const localeString = formatToLocaleString(data, props.culture);
      if (!localeString) {
        return data;
      }
      return localeString?.toString();
    }

    /**
     * This function returns
     * the selected legend if there is one
     * or the hovered legend if none of the legends is selected.
     */
    function _getHighlightedLegend() {
      return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
    }

    function _isLegendHighlighted(legend: string | undefined): boolean {
      return _getHighlightedLegend().includes(legend!);
    }

    function _noLegendsHighlighted(): boolean {
      return _getHighlightedLegend().length === 0;
    }

    function _isChartEmpty(): boolean {
      return !(
        props.data &&
        props.data.chartData &&
        props.data.chartData!.filter((d: ChartDataPoint) => d.data! > 0).length > 0
      );
    }

    function _addDefaultColors(donutChartDataPoint?: ChartDataPoint[]): ChartDataPoint[] {
      if (!donutChartDataPoint || donutChartDataPoint.length === 0) {
        return [];
      }

      return donutChartDataPoint.map((item, index) => {
        const resolvedColor =
          typeof item.color === 'string' && item.color.length > 0
            ? getColorFromToken(item.color)
            : getNextColor(index, 0);

        return { ...item, color: resolvedColor };
      });
    }

    function _elevateToMinimums(data: ChartDataPoint[]): ChartDataPoint[] {
      if (!data || data.length === 0) {
        return [];
      }

      const minPercent = 0.01;
      const sumOfData = data.reduce((sum, point) => sum + (point.data ?? 0), 0);

      if (sumOfData <= 0) {
        return data;
      }

      const minimumValue = minPercent * sumOfData;

      return data.map(point => {
        const value = point.data ?? 0;

        if (value > 0 && value < minimumValue) {
          return {
            ...point,
            data: minimumValue,
            yAxisCalloutData: point.yAxisCalloutData === undefined ? value.toLocaleString() : point.yAxisCalloutData,
          };
        }

        return point;
      });
    }

    /**
     * When screen resizes, along with screen, chart also auto adjusted.
     * This method used to adjust height and width of the charts.
     */
    function _fitParentContainer(): void {
      //_reqID = requestAnimationFrame(() => {
      let legendContainerHeight;
      if (props.hideLegend) {
        // If there is no legend, need not to allocate some space from total chart space.
        legendContainerHeight = 0;
      } else {
        const legendContainerComputedStyles = legendContainer.current && getComputedStyle(legendContainer.current);
        legendContainerHeight =
          ((legendContainer.current && legendContainer.current.getBoundingClientRect().height) ||
            MIN_LEGEND_CONTAINER_HEIGHT) +
          parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginTop) || '0') +
          parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginBottom) || '0');
      }
      if (props.parentRef || _rootElem.current) {
        const container = props.parentRef ? props.parentRef : _rootElem.current!;
        const containerRect = container.getBoundingClientRect();
        const measuredWidth = containerRect.width;
        const measuredHeight = containerRect.height;

        const nextWidth = measuredWidth > 0 ? measuredWidth : _width ?? 200;

        const measuredAvailableHeight = measuredHeight - legendContainerHeight;
        const nextHeightCandidate = measuredAvailableHeight > 0 ? measuredAvailableHeight : undefined;
        const fallbackHeight =
          _height ?? Math.max((_width ?? 200) - legendContainerHeight, 200 - legendContainerHeight);
        const nextHeight = nextHeightCandidate ?? fallbackHeight;

        if (typeof nextWidth === 'number' && nextWidth !== _width) {
          setWidth(nextWidth);
        }

        if (typeof nextHeight === 'number' && nextHeight !== _height) {
          setHeight(nextHeight);
        }
      }
      //});
    }

    const { data, hideLegend = false } = props;
    const points = _addDefaultColors(data?.chartData);
    const annotations = props.annotations ?? [];
    const hasAnnotations = annotations.length > 0;

    const classes = useDonutChartStyles(props);

    const legendBars = _createLegends(points.filter(d => d.data! >= 0));

    const {
      annotationContext,
      plotContainerStyle,
      outerRadius: resolvedOuterRadius,
      resolvedSvgWidth,
      resolvedSvgHeight,
      svgStyle: svgPositionStyle,
    } = useDonutAnnotationLayout({
      annotations,
      width: _width,
      height: _height,
      hideLabels: props.hideLabels,
      isRtl: _isRTL,
    });
    const chartData = _elevateToMinimums(points);
    const valueInsideDonut =
      props.innerRadius! > MIN_DONUT_RADIUS ? _valueInsideDonut(props.valueInsideDonut!, chartData!) : '';
    const arrowAttributes = useArrowNavigationGroup({ circular: true, axis: 'horizontal' });
    return !_isChartEmpty() ? (
      <div className={classes.root} ref={rootRef} onMouseLeave={_handleChartMouseLeave}>
        {props.xAxisAnnotation && (
          <text className={classes.axisAnnotation} x={_width! / 2} y={_height! - 10} textAnchor="middle">
            {props.xAxisAnnotation}
          </text>
        )}
        <div className={classes.chartWrapper} {...arrowAttributes}>
          <div className={classes.plotContainer} style={plotContainerStyle}>
            <svg
              className={classes.chart}
              aria-label={data?.chartTitle}
              width={resolvedSvgWidth}
              height={resolvedSvgHeight}
              style={svgPositionStyle}
            >
              {!hideLegend && data?.chartTitle && (
                <ChartTitle
                  title={data.chartTitle}
                  x={resolvedSvgWidth! / 2}
                  maxWidth={resolvedSvgWidth! - 20}
                  className={classes.chartTitle}
                  titleStyles={props.titleStyles}
                  tooltipClassName={classes.svgTooltip}
                />
              )}
              <Pie
                width={resolvedSvgWidth}
                height={resolvedSvgHeight}
                outerRadius={resolvedOuterRadius}
                innerRadius={props.innerRadius!}
                data={chartData!}
                onFocusCallback={_focusCallback}
                hoverOnCallback={_hoverCallback}
                hoverLeaveCallback={_hoverLeave}
                uniqText={_uniqText}
                onBlurCallback={_onBlur}
                activeArc={_getHighlightedLegend()}
                focusedArcId={focusedArcId || ''}
                href={props.href!}
                valueInsideDonut={_toLocaleString(valueInsideDonut)}
                showLabelsInPercent={props.showLabelsInPercent}
                hideLabels={props.hideLabels}
              />
            </svg>
            {hasAnnotations && annotationContext ? (
              <ChartAnnotationLayer
                annotations={annotations}
                context={annotationContext}
                className={classes.annotationLayer}
              />
            ) : null}
          </div>
        </div>
        <ChartPopover
          xCalloutValue={xCalloutValue}
          yCalloutValue={yCalloutValue}
          culture={props.culture}
          positioning={{
            target: refSelected,
          }}
          isPopoverOpen={
            !props.hideTooltip && isPopoverOpen && (_noLegendsHighlighted() || _isLegendHighlighted(legend))
          }
          legend={legend!}
          YValue={value!}
          color={color}
          isCalloutForStack={false}
          customCallout={{
            customizedCallout: props.onRenderCalloutPerDataPoint
              ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps!)
              : undefined,
            customCalloutProps: props.calloutPropsPerDataPoint
              ? props.calloutPropsPerDataPoint(dataPointCalloutProps!)
              : undefined,
          }}
          isCartesian={false}
        />
        {!hideLegend && (
          <div
            ref={(e: HTMLDivElement) => {
              legendContainer.current = e;
            }}
            className={classes.legendContainer}
          >
            {legendBars}
          </div>
        )}
      </div>
    ) : (
      <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);

/** @internal Testing utilities for verifying donut layout behaviour */
export const __donutChartInternals = {
  computeAnnotationViewportPadding,
  resolveDonutViewportLayout,
};

DonutChart.displayName = 'DonutChart';
