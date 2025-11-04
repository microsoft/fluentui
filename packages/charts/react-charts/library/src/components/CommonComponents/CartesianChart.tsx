'use client';

import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ModifiedCartesianChartProps } from '../../index';
import { useCartesianChartStyles } from './useCartesianChartStyles.styles';
import { select as d3Select } from 'd3-selection';
import {
  createNumericXAxis,
  createStringXAxis,
  IAxisData,
  createDateXAxis,
  IMargins,
  XAxisTypes,
  YAxisType,
  createWrapOfXLabels,
  rotateXAxisLabels,
  calculateLongestLabelWidth,
  createYAxisLabels,
  ChartTypes,
  wrapContent,
  useRtl,
  truncateString,
  tooltipOfAxislabels,
  getSecureProps,
  DEFAULT_WRAP_WIDTH,
} from '../../utilities/index';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { SVGTooltipText, SVGTooltipTextProps } from '../../utilities/SVGTooltipText';
import { ChartPopover } from './ChartPopover';
import { useFocusableGroup, useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Cartesian Chart component
 * {@docCategory CartesianChart}
 */
export const CartesianChart: React.FunctionComponent<ModifiedCartesianChartProps> = React.forwardRef<
  HTMLDivElement,
  ModifiedCartesianChartProps
>((props, forwardedRef) => {
  const chartContainer = React.useRef<HTMLDivElement>();
  let legendContainer: HTMLDivElement;
  const minLegendContainerHeight: number = 40;
  const xAxisElement = React.useRef<SVGSVGElement>();
  const yAxisElement = React.useRef<SVGSVGElement>();
  const yAxisElementSecondary = React.useRef<SVGSVGElement>();
  let margins: IMargins;
  const idForGraph: string = 'chart_';
  let _reqID: number | undefined;
  const _useRtl: boolean = useRtl();
  let _tickValues: (string | number)[];
  const titleMargin: number = 8;
  const _isFirstRender = React.useRef<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _xScale: any;
  const isIntegralDataset = React.useMemo(() => {
    return !props.points.some((point: { y: number }) => point.y % 1 !== 0);
  }, [props.points]);
  let _tooltipId: string = useId('tooltip_');
  /* Used for when WrapXAxisLabels props appeared.
   * To display the total word (space separated words), Need to have more space than usual.
   * This height will get total height need to disaply total word.
   * These value need to be removed from actual svg height/graph height.
   * Defalut value is 0. And this values calculted when 'wrapXAxisLables' or 'showXAxisLablesTooltip' is true.
   */
  let _removalValueForTextTuncate: number = 0;

  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [containerHeight, setContainerHeight] = React.useState<number>(0);
  const [startFromX, setStartFromX] = React.useState<number>(0);
  const [prevProps, setPrevProps] = React.useState<ModifiedCartesianChartProps | null>(null);

  const chartTypesWithStringYAxis = [
    ChartTypes.HorizontalBarChartWithAxis,
    ChartTypes.HeatMapChart,
    ChartTypes.VerticalStackedBarChart,
    ChartTypes.GanttChart,
    ChartTypes.ScatterChart,
  ];
  /**
   * In RTL mode, Only graph will be rendered left/right. We need to provide left and right margins manually.
   * So that, in RTL, left margins becomes right margins and viceversa.
   * As graph needs to be drawn perfecty, these values consider as default values.
   * Same margins using for all other cartesian charts. Can be accessible through 'getMargins' call back method.
   */
  // eslint-disable-next-line prefer-const
  margins = {
    top: props.margins?.top ?? 20,
    bottom: props.margins?.bottom ?? 35,
    right: _useRtl ? props.margins?.left ?? 40 : props.margins?.right ?? props?.secondaryYScaleOptions ? 40 : 20,
    left: _useRtl ? (props.margins?.right ?? props?.secondaryYScaleOptions ? 40 : 20) : props.margins?.left ?? 40,
  };
  const TITLE_MARGIN_HORIZONTAL = 24;
  const TITLE_MARGIN_VERTICAL = 20;
  if (props.xAxisTitle !== undefined && props.xAxisTitle !== '') {
    margins.bottom! = props.margins?.bottom ?? margins.bottom! + TITLE_MARGIN_VERTICAL;
  }
  if (props.yAxisTitle !== undefined && props.yAxisTitle !== '') {
    margins.left! = _useRtl
      ? props.margins?.right ?? props?.secondaryYAxistitle
        ? margins.right! + 2 * TITLE_MARGIN_HORIZONTAL
        : margins.right! + TITLE_MARGIN_HORIZONTAL
      : props.margins?.left ?? margins.left! + TITLE_MARGIN_HORIZONTAL;
    margins.right! = _useRtl
      ? props.margins?.left ?? margins.left! + TITLE_MARGIN_HORIZONTAL
      : props.margins?.right ?? props?.secondaryYAxistitle
      ? margins.right! + 2 * TITLE_MARGIN_HORIZONTAL
      : margins.right! + TITLE_MARGIN_HORIZONTAL;
  }
  if (props.xAxisAnnotation !== undefined && props.xAxisAnnotation !== '') {
    margins.top! = props.margins?.top ?? margins.top! + TITLE_MARGIN_VERTICAL;
  }
  if (
    props.yAxisAnnotation !== undefined &&
    props.yAxisAnnotation !== '' &&
    (props.secondaryYAxistitle === undefined || props.secondaryYAxistitle === '')
  ) {
    if (_useRtl) {
      margins.left! = props.margins?.right ?? margins.right! + TITLE_MARGIN_HORIZONTAL;
    } else {
      margins.right! = props.margins?.right ?? margins.right! + TITLE_MARGIN_HORIZONTAL;
    }
  }

  const classes = useCartesianChartStyles(props);
  const focusAttributes = useFocusableGroup();
  const arrowAttributes = useArrowNavigationGroup({ axis: 'horizontal' });
  // ComponentdidMount and Componentwillunmount logic
  React.useEffect(() => {
    _fitParentContainer();
    if (props !== null) {
      setPrevProps(props);
    }
    if (
      chartTypesWithStringYAxis.includes(props.chartType) &&
      props.showYAxisLables &&
      yAxisElement &&
      props.yAxisType === YAxisType.StringAxis
    ) {
      const maxYAxisLabelLength = calculateMaxYAxisLabelLength(classes.yAxis!);
      if (startFromX !== maxYAxisLabelLength) {
        setStartFromX(maxYAxisLabelLength);
      }
    } else if (startFromX !== 0) {
      setStartFromX(0);
    }
    return () => {
      if (_reqID !== undefined) {
        cancelAnimationFrame(_reqID);
      }
    };
  }, [props]);

  // ComponentDidUpdate logic
  React.useEffect(() => {
    if (prevProps) {
      if (prevProps.height !== props.height || prevProps.width !== props.width) {
        _fitParentContainer();
      }
    }
    if (
      chartTypesWithStringYAxis.includes(props.chartType) &&
      props.showYAxisLables &&
      yAxisElement &&
      props.yAxisType === YAxisType.StringAxis
    ) {
      const maxYAxisLabelLength = calculateMaxYAxisLabelLength(classes.yAxis!);
      if (startFromX !== maxYAxisLabelLength) {
        setStartFromX(maxYAxisLabelLength);
      }
    } else if (startFromX !== 0) {
      setStartFromX(0);
    }
  }, [props, prevProps]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      chartContainer: chartContainer.current ?? null,
    }),
    [],
  );

  /**
   * Dedicated function to return the Callout JSX Element , which can further be used to only call this when
   * only the calloutprops and charthover props changes.
   * @param calloutProps
   * @param chartHoverProps
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _generateCallout(calloutProps: any): JSXElement {
    return <ChartPopover {...calloutProps} />;
  }

  function calculateMaxYAxisLabelLength(className: string): number {
    const formatTickLabel = (str: string) => {
      if (props.showYAxisLablesTooltip) {
        return truncateString(str, props.noOfCharsToTruncate || 4);
      }

      return str;
    };
    return calculateLongestLabelWidth(
      props.stringDatasetForYAxisDomain!.map(label => formatTickLabel(label)),
      `.${className} text`,
    );
  }

  const {
    calloutProps,
    points,
    chartType,
    svgProps,
    culture,
    dateLocalizeOptions,
    timeFormatLocale,
    customDateTimeFormatter,
  } = props;
  if (props.parentRef) {
    _fitParentContainer();
  }
  const margin = { ...margins };
  // Note: This check is unnecessary since startFromX is only set for charts with string y-axis.
  if (chartTypesWithStringYAxis.includes(props.chartType)) {
    if (!_useRtl) {
      margin.left! += startFromX;
    } else {
      margin.right! += startFromX;
    }
  }
  // Callback for margins to the chart
  props.getmargins && props.getmargins(margin);

  let callout: JSXElement | null = null;

  let children = null;
  if ((props.enableFirstRenderOptimization && chartContainer.current) || !props.enableFirstRenderOptimization) {
    _isFirstRender.current = false;
    const XAxisParams = {
      domainNRangeValues: props.getDomainNRangeValues(
        points,
        props.getDomainMargins ? props.getDomainMargins(containerWidth) : margins,
        containerWidth,
        chartType,
        _useRtl,
        props.xAxisType,
        props.barwidth!,
        props.tickValues!,
        // This is only used for Horizontal Bar Chart with Axis for y as string axis
        startFromX,
      ),
      // FIXME: In XAxisParams, containerHeight is used by HBWA to generate vertical gridlines.
      // Since the x-axis in HBWA is numeric, it typically doesn't require transformation.
      // However, if transformation props are enabled, the updated _removalValueForTextTuncate
      // will only be available in the next render, as it's set after the axis is created.
      // Solution: Delay the creation of gridlines until after the transformation has been applied,
      // or precompute the required height for transformed labels (_removalValueForTextTuncate).
      containerHeight: containerHeight - _removalValueForTextTuncate,
      margins: margins,
      xAxisElement: xAxisElement.current!,
      showRoundOffXTickValues: props.showRoundOffXTickValues ?? true,
      xAxisCount: props.xAxisTickCount,
      xAxistickSize: props.xAxistickSize,
      tickPadding: props.tickPadding || props.showXAxisLablesTooltip ? 5 : 10,
      xAxisPadding: props.xAxisPadding,
      xAxisInnerPadding: props.xAxisInnerPadding,
      xAxisOuterPadding: props.xAxisOuterPadding,
      containerWidth: containerWidth,
      hideTickOverlap: props.rotateXAxisLables ? false : props.hideTickOverlap,
      calcMaxLabelWidth: _calcMaxLabelWidthWithTransform,
      ...props.xAxis,
    };

    /**
     * These scales used for 2 purposes.
     * 1. To create x and y axis
     * 2. To draw the graph.
     * For area/line chart using same scales. For other charts, creating their own scales to draw the graph.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let xScale: any;
    let tickValues: (string | number)[];
    switch (props.xAxisType!) {
      case XAxisTypes.NumericAxis:
        ({ xScale, tickValues } = createNumericXAxis(
          XAxisParams,
          props.tickParams!,
          props.chartType,
          culture,
          props.xScaleType,
          _useRtl,
        ));
        break;
      case XAxisTypes.DateAxis:
        ({ xScale, tickValues } = createDateXAxis(
          XAxisParams,
          props.tickParams!,
          culture,
          dateLocalizeOptions,
          timeFormatLocale,
          customDateTimeFormatter,
          props.useUTC,
          props.chartType,
        ));
        break;
      case XAxisTypes.StringAxis:
        ({ xScale, tickValues } = createStringXAxis(
          XAxisParams,
          props.tickParams!,
          props.datasetForXAxisDomain!,
          culture,
          _useRtl,
        ));
        break;
      default:
        ({ xScale, tickValues } = createNumericXAxis(
          XAxisParams,
          props.tickParams!,
          props.chartType,
          culture,
          props.xScaleType,
          _useRtl,
        ));
    }
    _xScale = xScale;
    _tickValues = tickValues;

    _transformXAxisLabels();

    const YAxisParams = {
      margins: props.getYDomainMargins ? props.getYDomainMargins(containerHeight) : margins,
      containerWidth: containerWidth,
      containerHeight: containerHeight - _removalValueForTextTuncate,
      yAxisElement: yAxisElement.current!,
      yAxisTickFormat: props.yAxisTickFormat!,
      yAxisTickCount: props.yAxisTickCount!,
      yMinValue: props.yMinValue || 0,
      yMaxValue: props.yMaxValue || 0,
      tickPadding: 10,
      maxOfYVal: props.maxOfYVal,
      yMinMaxValues: props.getMinMaxOfYAxis(points, props.yAxisType),
      // please note these padding default values must be consistent in here
      // and the parent chart(HBWA/Vertical etc..) for more details refer example
      // http://using-d3js.com/04_07_ordinal_scales.html
      yAxisPadding: props.yAxisPadding || 0,
      tickValues: props.yAxisTickValues,
      ...props.yAxis,
    };
    /**
     * These scales used for 2 purposes.
     * 1. To create x and y axis
     * 2. To draw the graph.
     * For area/line chart using same scales. For other charts, creating their own scales to draw the graph.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let yScalePrimary: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let yScaleSecondary: any;
    const axisData: IAxisData = { yAxisDomainValues: [] };
    if (props.yAxisType && props.yAxisType === YAxisType.StringAxis) {
      yScalePrimary = props.createStringYAxis(
        YAxisParams,
        props.stringDatasetForYAxisDomain!,
        _useRtl,
        props.barwidth,
        props.chartType,
      );
    } else {
      // TODO: Since the scale domain values are now computed independently for both the primary and
      // secondary y-axes, the yMinValue and yMaxValue props are no longer necessary for accurately
      // rendering the secondary y-axis. Therefore, rather than checking the secondaryYScaleOptions
      // prop to determine whether to create a secondary y-axis, it's more appropriate to check if any
      // data points are assigned to use the secondary y-scale.
      if (props?.secondaryYScaleOptions) {
        const YAxisParamsSecondary = {
          margins: margins,
          containerWidth: containerWidth,
          containerHeight: containerHeight - _removalValueForTextTuncate!,
          yAxisElement: yAxisElementSecondary.current,
          yAxisTickFormat: props.yAxisTickFormat!,
          yAxisTickCount: props.yAxisTickCount!,
          yMinValue: props.secondaryYScaleOptions?.yMinValue || 0,
          yMaxValue: props.secondaryYScaleOptions?.yMaxValue ?? 100,
          tickPadding: 10,
          yMinMaxValues: props.getMinMaxOfYAxis(points, props.yAxisType, true),
          yAxisPadding: props.yAxisPadding,
        };

        yScaleSecondary = props.createYAxis(
          YAxisParamsSecondary,
          _useRtl,
          axisData,
          isIntegralDataset,
          chartType,
          true,
          props.roundedTicks!,
          props.secondaryYScaleType,
          _useRtl,
        );
      }
      yScalePrimary = props.createYAxis(
        YAxisParams,
        _useRtl,
        axisData,
        isIntegralDataset,
        chartType,
        false,
        props.roundedTicks!,
        props.yScaleType,
        _useRtl,
      );
    }

    if (chartTypesWithStringYAxis.includes(props.chartType) && props.yAxisType === YAxisType.StringAxis) {
      // Removing un wanted tooltip div from DOM, when prop not provided, for proper cleanup
      // of unwanted DOM elements, to prevent flacky behaviour in tooltips , that might occur
      // in creating tooltips when tooltips are enabled( as we try to recreate a tspan with _tooltipId)
      if (!props.showYAxisLablesTooltip) {
        try {
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          //eslint-disable-next-line no-empty
        } catch (e) {}
      }
      // Used to display tooltip at y axis labels.
      if (props.showYAxisLablesTooltip) {
        // To create y axis tick values by if specified truncating the rest of the text
        // and showing elipsis or showing the whole string,
        yScalePrimary &&
          // Note: This function should be invoked within the showYAxisLablesTooltip check,
          // as its sole purpose is to truncate labels that exceed the noOfCharsToTruncate limit.
          createYAxisLabels(
            yAxisElement.current!,
            yScalePrimary,
            props.noOfCharsToTruncate || 4,
            props.showYAxisLablesTooltip || false,
            _useRtl,
          );
        const _yAxisElement = d3Select(yAxisElement.current!).call(yScalePrimary);
        try {
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          //eslint-disable-next-line no-empty
        } catch (e) {}
        const ytooltipProps = {
          tooltipCls: classes.tooltip!,
          id: _tooltipId,
          axis: _yAxisElement,
        };
        _yAxisElement && tooltipOfAxislabels(ytooltipProps);
      }
    }

    // Call back to the chart.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _getData = (xScale: any, yScalePrimary: any, yScaleSecondary: any) => {
      props.getGraphData &&
        props.getGraphData(
          xScale,
          yScalePrimary,
          containerHeight - _removalValueForTextTuncate!,
          containerWidth,
          xAxisElement.current,
          yAxisElement.current,
          yScaleSecondary,
        );
    };

    props.getAxisData && props.getAxisData(axisData);
    // Callback function for chart, returns axis
    _getData(xScale, yScalePrimary, yScaleSecondary);

    children = props.children({
      xScale,
      yScalePrimary,
      yScaleSecondary,
      containerHeight,
      containerWidth,
    });

    if (!props.hideTooltip && calloutProps!.isPopoverOpen) {
      callout = _generateCallout(calloutProps);
    }
  }
  const svgDimensions = {
    width: containerWidth,
    height: containerHeight,
  };

  const xAxisTitleMaximumAllowedWidth = svgDimensions.width - margins.left! - margins.right! - startFromX!;
  const yAxisTitleMaximumAllowedHeight =
    svgDimensions.height - margins.bottom! - margins.top! - _removalValueForTextTuncate! - titleMargin;

  const commonSvgToolTipProps: SVGTooltipTextProps = {
    wrapContent,
    showBackground: true,
    className: classes.svgTooltip,
    content: '',
  };
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
      const legendContainerComputedStyles = legendContainer && getComputedStyle(legendContainer);
      legendContainerHeight =
        ((legendContainer && legendContainer.getBoundingClientRect().height) || minLegendContainerHeight) +
        parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginTop) || '0') +
        parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginBottom) || '0');
    }
    if (props.parentRef || chartContainer.current) {
      const container = props.parentRef ? props.parentRef : chartContainer.current!;
      const currentContainerWidth =
        props.reflowProps?.mode === 'min-width' && !_isFirstRender.current
          ? Math.max(container.getBoundingClientRect().width, _calculateChartMinWidth())
          : container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        setContainerWidth(currentContainerWidth);
        setContainerHeight(currentContainerHeight - legendContainerHeight);
      }
    }
    //});
  }

  function _onChartLeave(): void {
    props.onChartMouseLeave && props.onChartMouseLeave();
  }

  function _calculateChartMinWidth(): number {
    // Adding 10px for padding on both sides
    const labelWidth = _calcMaxLabelWidthWithTransform(_tickValues) + 10;

    let minChartWidth = margins.left! + margins.right! + labelWidth * (_tickValues.length - 1);

    if (
      [ChartTypes.GroupedVerticalBarChart, ChartTypes.VerticalBarChart, ChartTypes.VerticalStackedBarChart].includes(
        props.chartType,
      )
    ) {
      const minDomainMargin = 8;
      minChartWidth += minDomainMargin * 2;
    }

    return minChartWidth;
  }

  function _calcMaxLabelWidthWithTransform(x: (string | number)[]) {
    // Case: rotated labels
    if (!props.wrapXAxisLables && props.rotateXAxisLables && props.xAxisType! === XAxisTypes.StringAxis) {
      const longestLabelWidth = calculateLongestLabelWidth(x, `.${classes.xAxis} text`);
      return Math.ceil(longestLabelWidth * Math.cos(Math.PI / 4));
    }

    // Case: truncated labels
    if (props.showXAxisLablesTooltip) {
      const tickValues = x.map(val => {
        const numChars = props.noOfCharsToTruncate || 4;
        return val.toString().length > numChars ? `${val.toString().slice(0, numChars)}...` : val;
      });

      const longestLabelWidth = calculateLongestLabelWidth(tickValues, `.${classes.xAxis} text`);
      return Math.ceil(longestLabelWidth);
    }

    // Case: wrapped labels
    if (props.wrapXAxisLables) {
      // FIXME: Calculate the max width of lines instead of words. This requires applying
      // the wrapping transformation earlier to obtain the actual rendered lines.
      const words: string[] = [];
      x.forEach((val: string) => {
        words.push(...val.toString().split(/\s+/));
      });

      // This approach works well in most cases, since overflow typically occurs only when
      // a single word exceeds the specified width — otherwise, the text will wrap as expected.
      const longestLabelWidth = calculateLongestLabelWidth(words, `.${classes.xAxis} text`);
      return Math.max(Math.ceil(longestLabelWidth), DEFAULT_WRAP_WIDTH);
    }

    // Default case
    const longestLabelWidth = calculateLongestLabelWidth(x, `.${classes.xAxis} text`);
    return Math.ceil(longestLabelWidth);
  }

  function _transformXAxisLabels() {
    _removalValueForTextTuncate = 0;

    /*
     * To enable wrapping of x axis tick values or to display complete x axis tick values,
     * we need to calculate how much space it needed to render the text.
     * No need to re-calculate every time the chart renders and same time need to get an update. So using setState.
     * Required space will be calculated first time chart rendering and if any width/height of chart updated.
     * */
    if (props.wrapXAxisLables || props.showXAxisLablesTooltip) {
      let maxXAxisLabelWidth: number | undefined;
      if (props.xAxisType === XAxisTypes.StringAxis) {
        if ((props.datasetForXAxisDomain?.length || 0) > 1) {
          maxXAxisLabelWidth = _xScale.step();
        } else {
          maxXAxisLabelWidth = containerWidth;
        }
      }

      const wrapLabelProps = {
        node: xAxisElement.current!,
        xAxis: _xScale,
        showXAxisLablesTooltip: props.showXAxisLablesTooltip || false,
        noOfCharsToTruncate: props.noOfCharsToTruncate || 4,
        width: maxXAxisLabelWidth,
      };
      _removalValueForTextTuncate = createWrapOfXLabels(wrapLabelProps) ?? 0;
    }

    if (!props.wrapXAxisLables && props.rotateXAxisLables && props.xAxisType! === XAxisTypes.StringAxis) {
      const rotateLabelProps = {
        node: xAxisElement.current!,
        xAxis: _xScale,
      };
      const rotatedHeight = rotateXAxisLabels(rotateLabelProps) ?? 0;
      // margins.bottom is used as padding here
      _removalValueForTextTuncate = rotatedHeight + margins.bottom!;
    }
  }

  /**
   * We have use the {@link defaultTabbableElement } to fix
   * the Focus not landing on chart while tabbing, instead  goes to legend.
   * This issue is observed in Area, line chart after performance optimization done in the PR {@link https://github.com/microsoft/fluentui/pull/27721 }
   * This issue is observed in Bar charts after the changes done by FocusZone team in the PR: {@link https://github.com/microsoft/fluentui/pull/24175 }
   * The issue in Bar Charts(VB and VSB) is due to a {@link FocusZone } update where previously an event listener was
   * attached on keydown to the window, so that whenever the tab key is pressed all outer FocusZone's
   * tab-indexes are updated (an outer FocusZone is a FocusZone that is not within another one).
   * But now after the above PR : they are attaching the
   * listeners to the FocusZone elements instead of the window. So in the first render cycle in Bar charts
   * bars are not created as in the first render cycle the size of the chart container is not known( or is 0)
   * which creates bars of height 0 so instead we do not create any bars  and instead return empty fragments.
   *
   * We have tried 2 Approaches to fix the issue:
   * 1. Using the {@link elementRef} property of FocusZone where we dispatch event for tab keydown
   *    after the second render cycle which triggers an update of the tab index in FocusZone.
   *    But this is a hacky solution and not a proper fix and also elementRef is deprecated.
   * 2. Using the default tabbable element to fix the issue.
   */

  return (
    <div
      id={idForGraph}
      className={classes.root}
      role={'presentation'}
      ref={(rootElem: HTMLDivElement) => (chartContainer.current = rootElem)}
      onMouseLeave={_onChartLeave}
    >
      <div className={classes.chartWrapper} {...focusAttributes} {...arrowAttributes}>
        {_isFirstRender.current}
        <svg
          width={svgDimensions.width}
          height={svgDimensions.height}
          aria-label={props.chartTitle}
          style={{ display: 'block' }}
          className={classes.chart}
          {...getSecureProps(svgProps)}
        >
          <g
            ref={(e: SVGSVGElement | null) => {
              xAxisElement.current = e!;
            }}
            id={`xAxisGElement${idForGraph}`}
            // To add wrap of x axis lables feature, need to remove word height from svg height.
            transform={`translate(0, ${svgDimensions.height - margins.bottom! - _removalValueForTextTuncate!})`}
            className={classes.xAxis}
          />
          {props.xAxisTitle !== undefined && props.xAxisTitle !== '' && (
            <SVGTooltipText
              {...commonSvgToolTipProps}
              content={props.xAxisTitle}
              textProps={{
                x: margins.left! + startFromX + xAxisTitleMaximumAllowedWidth / 2,
                y: svgDimensions.height - titleMargin,
                className: classes.axisTitle!,
                textAnchor: 'middle',
              }}
              maxWidth={xAxisTitleMaximumAllowedWidth}
            />
          )}
          {props.xAxisAnnotation !== undefined && props.xAxisAnnotation !== '' && (
            <SVGTooltipText
              {...commonSvgToolTipProps}
              content={props.xAxisAnnotation}
              textProps={{
                x: margins.left! + startFromX + xAxisTitleMaximumAllowedWidth / 2,
                y: titleMargin + 3,
                className: classes.axisAnnotation!,
                textAnchor: 'middle',
                'aria-hidden': true,
              }}
              maxWidth={xAxisTitleMaximumAllowedWidth}
            />
          )}
          <g
            ref={(e: SVGSVGElement | null) => {
              yAxisElement.current = e!;
            }}
            id={`yAxisGElement${idForGraph}`}
            transform={`translate(${
              _useRtl ? svgDimensions.width - margins.right! - startFromX : margins.left! + startFromX
            }, 0)`}
            className={classes.yAxis}
          />
          {props.secondaryYScaleOptions && (
            <g>
              <g
                ref={(e: SVGSVGElement | null) => {
                  yAxisElementSecondary.current = e!;
                }}
                id={`yAxisGElementSecondary${idForGraph}`}
                transform={`translate(${
                  _useRtl ? margins.left! + startFromX : svgDimensions.width - margins.right! - startFromX
                }, 0)`}
                className={classes.yAxis}
              />
              {props.secondaryYAxistitle !== undefined && props.secondaryYAxistitle !== '' && (
                <SVGTooltipText
                  {...commonSvgToolTipProps}
                  content={props.secondaryYAxistitle}
                  textProps={{
                    x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2 + _removalValueForTextTuncate!,
                    y: _useRtl ? startFromX - titleMargin : svgDimensions.width - margins.right!,
                    textAnchor: 'middle',
                    transform: `translate(${
                      _useRtl ? margins.right! / 2 - titleMargin : margins.right! / 2 + titleMargin
                    },
                 ${svgDimensions.height - margins.bottom! - margins.top! - titleMargin})rotate(-90)`,
                    className: classes.axisTitle!,
                  }}
                  maxWidth={yAxisTitleMaximumAllowedHeight}
                />
              )}
            </g>
          )}
          {children}
          {props.yAxisTitle !== undefined && props.yAxisTitle !== '' && (
            <SVGTooltipText
              {...commonSvgToolTipProps}
              content={props.yAxisTitle}
              textProps={{
                x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2 + _removalValueForTextTuncate!,
                y: _useRtl ? svgDimensions.width - margins.right! / 2 + titleMargin : margins.left! / 2 - titleMargin,
                textAnchor: 'middle',
                transform: `translate(0,
                 ${svgDimensions.height - margins.bottom! - margins.top! - titleMargin})rotate(-90)`,
                className: classes.axisTitle!,
              }}
              maxWidth={yAxisTitleMaximumAllowedHeight}
            />
          )}
          {props.yAxisAnnotation !== undefined &&
            props.yAxisAnnotation !== '' &&
            (props.secondaryYAxistitle === undefined || props.secondaryYAxistitle === '') && (
              <SVGTooltipText
                {...commonSvgToolTipProps}
                content={props.yAxisAnnotation}
                textProps={{
                  x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2 + _removalValueForTextTuncate!,
                  y: _useRtl ? startFromX - titleMargin : svgDimensions.width - margins.right!,
                  textAnchor: 'middle',
                  transform: `translate(${
                    _useRtl ? margins.right! / 2 - titleMargin : margins.right! / 2 + titleMargin
                  },
                   ${svgDimensions.height - margins.bottom! - margins.top! - titleMargin})rotate(-90)`,
                  className: classes.axisAnnotation!,
                  'aria-hidden': true,
                }}
                maxWidth={yAxisTitleMaximumAllowedHeight}
              />
            )}
        </svg>
      </div>

      {!props.hideLegend && (
        <div ref={(e: HTMLDivElement) => (legendContainer = e)} className={classes.legendContainer}>
          {props.legendBars}
        </div>
      )}
      {/** The callout is used for narration, so keep it mounted on the DOM */}
      {callout && <React.Suspense fallback={<div>Loading...</div>}>{callout}</React.Suspense>}
    </div>
  );
});
CartesianChart.displayName = 'CartesianChart';
CartesianChart.defaultProps = {
  hideTickOverlap: true,
};
