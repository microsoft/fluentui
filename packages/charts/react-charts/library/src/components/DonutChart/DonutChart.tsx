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
  ChartTitle,
  CHART_TITLE_PADDING,
} from '../../utilities/index';
import { Legend, Legends } from '../../index';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { useImageExport } from '../../utilities/hooks';

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
    const _uniqText: string = useId('_Pie_');
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let _calloutAnchorPoint: ChartDataPoint | null;
    let _emptyChartId: string | null;
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

    function _elevateToMinimums(data: ChartDataPoint[]) {
      let sumOfData = 0;
      const minPercent = 0.01;
      const elevatedData: ChartDataPoint[] = [];
      data.forEach(item => {
        sumOfData += item.data!;
      });
      data.forEach(item => {
        elevatedData.push(
          minPercent * sumOfData > item.data! && item.data! > 0
            ? {
                ...item,
                data: minPercent * sumOfData,
                yAxisCalloutData:
                  item.yAxisCalloutData === undefined ? item.data!.toLocaleString() : item.yAxisCalloutData,
              }
            : item,
        );
      });
      return elevatedData;
    }
    function _createLegends(chartData: ChartDataPoint[]): JSXElement {
      if (props.order === 'sorted') {
        chartData.sort((a: ChartDataPoint, b: ChartDataPoint) => {
          return b.data! - a.data!;
        });
      }
      const legendDataItems = chartData.map((point: ChartDataPoint, index: number) => {
        const color: string = point.color!;
        // mapping data to the format Legends component needs
        const legend: Legend = {
          title: point.legend!,
          color,
          hoverAction: () => {
            _handleChartMouseLeave();
            setActiveLegend(point.legend!);
          },
          onMouseOutAction: () => {
            setActiveLegend(undefined);
          },
        };
        return legend;
      });
      const legends = (
        <Legends
          legends={legendDataItems}
          centerLegends
          overflowText={props.legendsOverflowText}
          {...props.legendProps}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={_onLegendSelectionChange}
          legendRef={_legendsRef}
        />
      );
      return legends;
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
      return donutChartDataPoint
        ? donutChartDataPoint.map((item, index) => {
            let defaultColor: string;
            if (typeof item.color === 'undefined') {
              defaultColor = getNextColor(index, 0);
            } else {
              defaultColor = getColorFromToken(item.color);
            }
            return { ...item, defaultColor };
          })
        : [];
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
        const currentContainerWidth = container.getBoundingClientRect().width;
        const currentContainerHeight =
          container.getBoundingClientRect().height > legendContainerHeight
            ? container.getBoundingClientRect().height
            : 200;
        const shouldResize =
          _width !== currentContainerWidth || _height !== currentContainerHeight - legendContainerHeight;
        if (shouldResize) {
          setWidth(currentContainerWidth);
          setHeight(currentContainerHeight - legendContainerHeight);
        }
      }
      //});
    }

    const { data, hideLegend = false } = props;
    const points = _addDefaultColors(data?.chartData);

    const classes = useDonutChartStyles(props);

    const legendBars = _createLegends(points.filter(d => d.data! >= 0));
    const donutMarginHorizontal = props.hideLabels ? 0 : 80;
    const donutMarginVertical = props.hideLabels ? 0 : 40;
    const titleHeight = data?.chartTitle
      ? Math.max(
          (typeof props.titleStyles?.titleFont?.size === 'number' ? props.titleStyles.titleFont.size : 13) +
            CHART_TITLE_PADDING,
          36,
        )
      : 0;
    const outerRadius = Math.min(_width! - donutMarginHorizontal, _height! - donutMarginVertical - titleHeight) / 2;
    const chartData = _elevateToMinimums(points);
    const valueInsideDonut =
      props.innerRadius! > MIN_DONUT_RADIUS ? _valueInsideDonut(props.valueInsideDonut!, chartData!) : '';
    const arrowAttributes = useArrowNavigationGroup({ circular: true, axis: 'horizontal' });
    return !_isChartEmpty() ? (
      <div
        className={classes.root}
        ref={(rootElem: HTMLDivElement | null) => {
          _rootElem.current = rootElem;
        }}
        onMouseLeave={_handleChartMouseLeave}
      >
        {props.xAxisAnnotation && (
          <text className={classes.axisAnnotation} x={_width! / 2} y={_height! - 10} textAnchor="middle">
            {props.xAxisAnnotation}
          </text>
        )}
        <div className={classes.chartWrapper} {...arrowAttributes}>
          <svg className={classes.chart} aria-label={data?.chartTitle} width={_width} height={_height}>
            {!hideLegend && data?.chartTitle && (
              <ChartTitle
                title={data.chartTitle}
                x={_width! / 2}
                maxWidth={_width! - 20}
                className={classes.chartTitle}
                titleStyles={props.titleStyles}
                tooltipClassName={classes.svgTooltip}
              />
            )}
            <Pie
              width={_width!}
              height={_height!}
              outerRadius={outerRadius}
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
      <div id={_emptyChartId!} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);

DonutChart.displayName = 'DonutChart';
