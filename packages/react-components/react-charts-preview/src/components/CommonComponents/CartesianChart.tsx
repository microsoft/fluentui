import * as React from 'react';
// import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { IModifiedCartesianChartProps, IYValueHover, IHorizontalBarChartWithAxisDataPoint } from '../../index';
import { useCartesianChartStyles_unstable } from './useCartesianChartStyles.styles';
import { convertToLocaleString } from '../../utilities/locale-util';
import {
  createNumericXAxis,
  createStringXAxis,
  IAxisData,
  //getAccessibleDataObject,
  getDomainNRangeValues,
  createDateXAxis,
  createYAxis,
  createStringYAxis,
  IMargins,
  getMinMaxOfYAxis,
  XAxisTypes,
  YAxisType,
  createWrapOfXLabels,
  rotateXAxisLabels,
  Points,
  pointTypes,
  calculateLongestLabelWidth,
  createYAxisLabels,
  ChartTypes,
  wrapContent,
  isRtl,
} from '../../utilities/index';
import { LegendShape, Shape } from '../Legends/index';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';
/**
 * Cartesian Chart component
 * {@docCategory CartesianChart}
 */
export const CartesianChart: React.FunctionComponent<IModifiedCartesianChartProps> = React.forwardRef<
  HTMLDivElement,
  IModifiedCartesianChartProps
>((props, forwardedRef) => {
  const chartContainer = React.useRef<HTMLDivElement>(null);
  let legendContainer: HTMLDivElement;
  const minLegendContainerHeight: number = 40;
  const xAxisElement = React.useRef<SVGElement | null>(null);
  const yAxisElement = React.useRef<SVGElement | null>(null);
  let yAxisElementSecondary: SVGElement | null;
  let margins: IMargins;
  const idForGraph: string = 'chart_';
  const idForDefaultTabbableElement: string = 'defaultTabbableElement_';
  let _reqID: number;
  const _isRtl: boolean = isRtl();
  let _tickValues: (string | number)[];
  const titleMargin: number = 8;
  const _isFirstRender = React.useRef<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _xScale: any;
  let isIntegralDataset: boolean = true;

  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [containerHeight, setContainerHeight] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(props.width || 600);
  const [height, setHeight] = React.useState<number>(props.height || 350);
  const [isRemoveValCalculated, setIsRemoveValCalculated] = React.useState<boolean>(true);
  const [removalValueForTextTuncate, setRemovalValueForTextTuncate] = React.useState<number>(0);
  const [startFromX, setStartFromX] = React.useState<number>(0);
  const [prevProps, setPrevProps] = React.useState<IModifiedCartesianChartProps>(null);

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
    right: _isRtl ? props.margins?.left ?? 40 : props.margins?.right ?? props?.secondaryYScaleOptions ? 40 : 20,
    left: _isRtl ? (props.margins?.right ?? props?.secondaryYScaleOptions ? 40 : 20) : props.margins?.left ?? 40,
  };
  if (props.xAxisTitle !== undefined && props.xAxisTitle !== '') {
    margins.bottom! = props.margins?.bottom ?? 55;
  }
  if (props.yAxisTitle !== undefined && props.yAxisTitle !== '') {
    margins.left! = _isRtl ? (props.margins?.right ?? props?.secondaryYAxistitle ? 60 : 40) : props.margins?.left ?? 60;
    margins.right! = _isRtl ? props.margins?.left ?? 60 : props.margins?.right ?? props?.secondaryYAxistitle ? 60 : 40;
  }

  const classes = useCartesianChartStyles_unstable(props);
  // ComponentdidMount and Componentwillunmount logic
  React.useEffect(() => {
    _fitParentContainer();
    if (props !== null) {
      setPrevProps(props);
    }
    if (props.chartType === ChartTypes.HorizontalBarChartWithAxis && props.showYAxisLables && yAxisElement.current) {
      const maxYAxisLabelLength = calculateLongestLabelWidth(
        props.points.map((point: IHorizontalBarChartWithAxisDataPoint) => point.y),
        `.${classes.yAxis} text`,
      );
      if (startFromX !== maxYAxisLabelLength) {
        setStartFromX(maxYAxisLabelLength);
      }
    } else if (startFromX !== 0) {
      setStartFromX(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isIntegralDataset = !props.points.some((point: { y: number }) => point.y % 1 !== 0);
    return () => {
      cancelAnimationFrame(_reqID);
    };
  }, [props]);

  // ComponentDidUpdate logic
  React.useEffect(() => {
    if (prevProps) {
      if (prevProps.height !== props.height || prevProps.width !== props.width) {
        _fitParentContainer();
      }
    }
    if (!props.wrapXAxisLables && props.rotateXAxisLables && props.xAxisType! === XAxisTypes.StringAxis) {
      const rotateLabelProps = {
        node: xAxisElement,
        xAxis: _xScale,
      };
      const rotatedHeight = rotateXAxisLabels(rotateLabelProps);
      if (
        isRemoveValCalculated &&
        removalValueForTextTuncate !== rotatedHeight! + margins.bottom! &&
        rotatedHeight! > 0
      ) {
        setRemovalValueForTextTuncate(rotatedHeight! + margins.bottom!);
        setIsRemoveValCalculated(false);
      }
    }
    if (props.chartType === ChartTypes.HorizontalBarChartWithAxis && props.showYAxisLables && yAxisElement.current) {
      const maxYAxisLabelLength = calculateLongestLabelWidth(
        props.points.map((point: IHorizontalBarChartWithAxisDataPoint) => point.y),
        `.${classes.yAxis} text`,
      );
      if (startFromX !== maxYAxisLabelLength) {
        setStartFromX(maxYAxisLabelLength);
      }
    } else if (startFromX !== 0) {
      setStartFromX(0);
    }
    if (prevProps !== null && prevProps.points !== props.points) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isIntegralDataset = !props.points.some((point: { y: number }) => point.y % 1 !== 0);
    }
  }, [props, prevProps]);

  /**
   * Dedicated function to return the Callout JSX Element , which can further be used to only call this when
   * only the calloutprops and charthover props changes.
   * @param calloutProps
   * @param chartHoverProps
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _generateCallout(calloutProps: any, chartHoverProps: any): JSX.Element {
    return (
      // <Callout
      //   hidden={!(!props.hideTooltip && calloutProps!.isCalloutVisible)}
      //   /** Keep the callout updated with details of focused/hovered chart element */
      //   shouldUpdateWhenHidden={true}
      //   {...calloutProps}
      // >
      //   {/** Given custom callout, then it will render */}
      //   {props.customizedCallout && props.customizedCallout}
      //   {/** single x point its corresponding y points of all the bars/lines in chart will render in callout */}
      //   {!props.customizedCallout && props.isCalloutForStack && _multiValueCallout(calloutProps)}
      //   {/** single x point its corresponding y point of single line/bar in the chart will render in callout */}
      //   {!props.customizedCallout && !props.isCalloutForStack && (
      //     <ChartHoverCard
      //       XValue={calloutProps.XValue}
      //       Legend={calloutProps.legend!}
      //       YValue={calloutProps.YValue!}
      //       color={calloutProps.color!}
      //       culture={props.culture}
      //       {...chartHoverProps}
      //     />
      //   )}
      // </Callout>
      <></>
    );
  }

  // TO DO: Write a common functional component for Multi value callout and divide sub count method
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /*   private _multiValueCallout = (calloutProps: any) => {
    const yValueHoverSubCountsExists: boolean = _yValueHoverSubCountsExists(calloutProps.YValueHover);
    return (
      <div className={classes.calloutContentRoot}>
        <div
          className={classes.calloutDateTimeContainer}
          style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
        >
          <div
            className={classes.calloutContentX}
            {...getAccessibleDataObject(calloutProps!.xAxisCalloutAccessibilityData, 'text', false)}
          >
            {convertToLocaleString(calloutProps!.hoverXValue, props.culture)}
          </div>
        </div>
        <div
          className={classes.calloutInfoContainer}
          style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}
        >
          {calloutProps!.YValueHover &&
            calloutProps!.YValueHover.map((yValue: IYValueHover, index: number, yValues: IYValueHover[]) => {
              const isLast: boolean = index + 1 === yValues.length;
              const { shouldDrawBorderBottom = false } = yValue;
              return (
                <div
                  {...getAccessibleDataObject(yValue.callOutAccessibilityData, 'text', false)}
                  key={`callout-content-${index}`}
                  style={
                    yValueHoverSubCountsExists
                      ? {
                          display: 'inline-block',
                          ...(shouldDrawBorderBottom && {
                            borderBottom: `1px solid ${props.theme!.semanticColors.menuDivider}`,
                            paddingBottom: '10px',
                          }),
                        }
                      : {
                          ...(shouldDrawBorderBottom && {
                            borderBottom: `1px solid ${props.theme!.semanticColors.menuDivider}`,
                            paddingBottom: '10px',
                          }),
                        }
                  }
                >
                  {_getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                </div>
              );
            })}
          {!!calloutProps.descriptionMessage && (
            <div className={classes.descriptionMessage}>{calloutProps.descriptionMessage}</div>
          )}
        </div>
      </div>
    );
  }; */

  /*   private _yValueHoverSubCountsExists(yValueHover?: IYValueHover[]) {
    if (yValueHover) {
      return yValueHover.some(
        (yValue: {
          legend?: string;
          y?: number;
          color?: string;
          yAxisCalloutData?: string | { [id: string]: number };
        }) => yValue.yAxisCalloutData && typeof yValue.yAxisCalloutData !== 'string',
      );
    }
    return false;
  }
 */
  /*   private _getCalloutContent(
    xValue: IYValueHover,
    index: number,
    yValueHoverSubCountsExists: boolean,
    isLast: boolean,
  ): React.ReactNode {
    const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };
    const toDrawShape = xValue.index !== undefined && xValue.index !== -1;
    const classes = getClassNames(props.styles!, {
      theme: props.theme!,
      width: width,
      height: height,
      className: props.className,
      isRtl: _isRtl,
      lineColor: xValue.color,
      toDrawShape,
    });
    const { culture } = props;
    const yValue = convertToLocaleString(xValue.y, culture);
    if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
      return (
        <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
          {yValueHoverSubCountsExists && (
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({yValue})
            </div>
          )}
          <div id={`${index}_${xValue.y}`} className={classes.calloutBlockContainer}>
            {toDrawShape && (
              <Shape
                svgProps={{
                  className: classes.shapeStyles,
                }}
                pathProps={{ fill: xValue.color }}
                shape={Points[xValue.index! % Object.keys(pointTypes).length] as LegendShape}
              />
            )}
            <div>
              <div className={classes.calloutlegendText}> {xValue.legend}</div>
              <div className={classes.calloutContentY}>
                {convertToLocaleString(
                  xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y ?? xValue.data,
                  culture,
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const subcounts: { [id: string]: number } = xValue.yAxisCalloutData as { [id: string]: number };
      return (
        <div style={marginStyle}>
          <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
            {xValue.legend!} ({yValue})
          </div>
          {Object.keys(subcounts).map((subcountName: string) => {
            return (
              <div key={subcountName} className={classes.calloutBlockContainer}>
                <div className={classes.calloutlegendText}> {convertToLocaleString(subcountName, culture)}</div>
                <div className={classes.calloutContentY}>
                  {convertToLocaleString(subcounts[subcountName], culture)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  } */

  const {
    calloutProps,
    points,
    chartType,
    chartHoverProps,
    svgFocusZoneProps,
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
  if (props.chartType === ChartTypes.HorizontalBarChartWithAxis) {
    if (!_isRtl) {
      margin.left! += startFromX;
    } else {
      margin.right! += startFromX;
    }
  }
  // Callback for margins to the chart
  props.getmargins && props.getmargins(margin);

  let callout: JSX.Element | null = null;

  let children = null;
  if ((props.enableFirstRenderOptimization && chartContainer.current) || !props.enableFirstRenderOptimization) {
    _isFirstRender.current = false;
    const XAxisParams = {
      domainNRangeValues: getDomainNRangeValues(
        points,
        props.getDomainMargins ? props.getDomainMargins(containerWidth) : margins,
        containerWidth,
        chartType,
        _isRtl,
        props.xAxisType,
        props.barwidth!,
        props.tickValues!,
        // This is only used for Horizontal Bar Chart with Axis for y as string axis
        startFromX,
      ),
      containerHeight: containerHeight - removalValueForTextTuncate!,
      margins: margins,
      xAxisElement: xAxisElement.current!,
      showRoundOffXTickValues: true,
      xAxisCount: props.xAxisTickCount,
      xAxistickSize: props.xAxistickSize,
      tickPadding: props.tickPadding || props.showXAxisLablesTooltip ? 5 : 10,
      xAxisPadding: props.xAxisPadding,
      xAxisInnerPadding: props.xAxisInnerPadding,
      xAxisOuterPadding: props.xAxisOuterPadding,
    };

    const YAxisParams = {
      margins: margins,
      containerWidth: containerWidth,
      containerHeight: containerHeight - removalValueForTextTuncate!,
      yAxisElement: yAxisElement.current,
      yAxisTickFormat: props.yAxisTickFormat!,
      yAxisTickCount: props.yAxisTickCount!,
      yMinValue: props.yMinValue || 0,
      yMaxValue: props.yMaxValue || 0,
      tickPadding: 10,
      maxOfYVal: props.maxOfYVal,
      yMinMaxValues: getMinMaxOfYAxis(points, chartType, props.yAxisType),
      // please note these padding default values must be consistent in here
      // and the parent chart(HBWA/Vertical etc..) for more details refer example
      // http://using-d3js.com/04_07_ordinal_scales.html
      yAxisPadding: props.yAxisPadding || 0,
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
        ({ xScale, tickValues } = createNumericXAxis(XAxisParams, props.chartType, culture));
        break;
      case XAxisTypes.DateAxis:
        ({ xScale, tickValues } = createDateXAxis(
          XAxisParams,
          props.tickParams!,
          culture,
          dateLocalizeOptions,
          timeFormatLocale,
          customDateTimeFormatter,
        ));
        break;
      case XAxisTypes.StringAxis:
        ({ xScale, tickValues } = createStringXAxis(
          XAxisParams,
          props.tickParams!,
          props.datasetForXAxisDomain!,
          culture,
        ));
        break;
      default:
        ({ xScale, tickValues } = createNumericXAxis(XAxisParams, props.chartType, culture));
    }
    _xScale = xScale;
    _tickValues = tickValues;

    /*
     * To enable wrapping of x axis tick values or to display complete x axis tick values,
     * we need to calculate how much space it needed to render the text.
     * No need to re-calculate every time the chart renders and same time need to get an update. So using set
     * Required space will be calculated first time chart rendering and if any width/height of chart updated.
     * */
    if (props.wrapXAxisLables || props.showXAxisLablesTooltip) {
      const wrapLabelProps = {
        node: xAxisElement.current,
        xAxis: xScale,
        showXAxisLablesTooltip: props.showXAxisLablesTooltip || false,
        noOfCharsToTruncate: props.noOfCharsToTruncate || 4,
      };
      const temp = xScale && (createWrapOfXLabels(wrapLabelProps) as number);
      // this value need to be updated for draw graph updated. So instead of using private value, using set
      if (isRemoveValCalculated && removalValueForTextTuncate !== temp) {
        setRemovalValueForTextTuncate(temp);
        setIsRemoveValCalculated(false);
      }
    }
    /**
     * These scales used for 2 purposes.
     * 1. To create x and y axis
     * 2. To draw the graph.
     * For area/line chart using same scales. For other charts, creating their own scales to draw the graph.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let yScale: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let yScaleSecondary: any;
    const axisData: IAxisData = { yAxisDomainValues: [] };
    if (props.yAxisType && props.yAxisType === YAxisType.StringAxis) {
      yScale = createStringYAxis(
        YAxisParams,
        props.stringDatasetForYAxisDomain!,
        _isRtl,
        props.chartType,
        props.barwidth,
        culture,
      );
    } else {
      if (props?.secondaryYScaleOptions) {
        const YAxisParamsSecondary = {
          margins: margins,
          containerWidth: containerWidth,
          containerHeight: containerHeight - removalValueForTextTuncate!,
          yAxisElement: yAxisElementSecondary,
          yAxisTickFormat: props.yAxisTickFormat!,
          yAxisTickCount: props.yAxisTickCount!,
          yMinValue: props.secondaryYScaleOptions?.yMinValue || 0,
          yMaxValue: props.secondaryYScaleOptions?.yMaxValue ?? 100,
          tickPadding: 10,
          maxOfYVal: props.secondaryYScaleOptions?.yMaxValue ?? 100,
          yMinMaxValues: getMinMaxOfYAxis(points, chartType),
          yAxisPadding: props.yAxisPadding,
        };

        yScaleSecondary = createYAxis(
          YAxisParamsSecondary,
          _isRtl,
          axisData,
          chartType,
          props.barwidth!,
          isIntegralDataset,
          true,
        );
      }
      yScale = createYAxis(YAxisParams, _isRtl, axisData, chartType, props.barwidth!, isIntegralDataset);
    }

    /*
     * To create y axis tick values by if specified
    truncating the rest of the text and showing elipsis
    or showing the whole string,
     * */
    props.chartType === ChartTypes.HorizontalBarChartWithAxis &&
      yScale &&
      createYAxisLabels(
        yAxisElement.current,
        yScale,
        props.noOfCharsToTruncate || 4,
        props.showYAxisLablesTooltip || false,
        startFromX,
        _isRtl,
      );

    // Call back to the chart.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _getData = (xScale: any, yScale: any) => {
      props.getGraphData &&
        props.getGraphData(
          xScale,
          yScale,
          containerHeight - removalValueForTextTuncate!,
          containerWidth,
          xAxisElement.current,
          yAxisElement.current,
        );
    };

    props.getAxisData && props.getAxisData(axisData);
    // Callback function for chart, returns axis
    _getData(xScale, yScale);

    children = props.children({
      xScale,
      yScale,
      yScaleSecondary,
    });

    if (!props.hideTooltip && calloutProps!.isCalloutVisible) {
      callout = _generateCallout(calloutProps, chartHoverProps);
    }
  }
  const svgDimensions = {
    width: containerWidth,
    height: containerHeight,
  };

  let focusDirection;
  if (props.focusZoneDirection === FocusZoneDirection.vertical) {
    focusDirection = props.focusZoneDirection;
  } else if (props.focusZoneDirection) {
    focusDirection = props.focusZoneDirection;
  } else {
    focusDirection = FocusZoneDirection.horizontal;
  }

  const xAxisTitleMaximumAllowedWidth = svgDimensions.width - margins.left! - margins.right! - startFromX!;
  const yAxisTitleMaximumAllowedHeight =
    svgDimensions.height - margins.bottom! - margins.top! - removalValueForTextTuncate! - titleMargin;
  /**
   * When screen resizes, along with screen, chart also auto adjusted.
   * This method used to adjust height and width of the charts.
   */
  function _fitParentContainer(): void {
    _reqID = requestAnimationFrame(() => {
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
        const container = props.parentRef ? props.parentRef : chartContainer.current;
        const currentContainerWidth =
          props.enableReflow && !_isFirstRender.current
            ? Math.max(container.getBoundingClientRect().width, _calculateChartMinWidth())
            : container.getBoundingClientRect().width;
        const currentContainerHeight =
          container.getBoundingClientRect().height > legendContainerHeight
            ? container.getBoundingClientRect().height
            : 350;
        const shouldResize =
          containerWidth !== currentContainerWidth ||
          containerHeight !== currentContainerHeight - legendContainerHeight;
        if (shouldResize) {
          setContainerWidth(currentContainerWidth);
          setContainerHeight(currentContainerHeight - legendContainerHeight);
        }
      }
    });
  }

  function _onChartLeave(): void {
    props.onChartMouseLeave && props.onChartMouseLeave();
  }

  function _calculateChartMinWidth(): number {
    let labelWidth = 10; // Total padding on the left and right sides of the label

    // Case: rotated labels
    if (!props.wrapXAxisLables && props.rotateXAxisLables && props.xAxisType! === XAxisTypes.StringAxis) {
      const longestLabelWidth = calculateLongestLabelWidth(_tickValues, `.${classes.xAxis} text`);
      labelWidth += Math.ceil(longestLabelWidth * Math.cos(Math.PI / 4));
    }
    // Case: truncated labels
    else if (props.showXAxisLablesTooltip) {
      const tickValues = _tickValues.map(val => {
        const numChars = props.noOfCharsToTruncate || 4;
        return val.toString().length > numChars ? `${val.toString().slice(0, numChars)}...` : val;
      });

      const longestLabelWidth = calculateLongestLabelWidth(tickValues, `.${classes.xAxis} text`);
      labelWidth += Math.ceil(longestLabelWidth);
    }
    // Case: wrapped labels
    else if (props.wrapXAxisLables) {
      const words: string[] = [];
      _tickValues.forEach((val: string) => {
        words.push(...val.toString().split(/\s+/));
      });

      const longestLabelWidth = calculateLongestLabelWidth(words, `.${classes.xAxis} text`);
      labelWidth += Math.max(Math.ceil(longestLabelWidth), 10);
    }
    // Default case
    else {
      const longestLabelWidth = calculateLongestLabelWidth(_tickValues, `.${classes.xAxis} text`);
      labelWidth += Math.ceil(longestLabelWidth);
    }

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
      {!_isFirstRender.current && <div id={idForDefaultTabbableElement} />}
      <FocusZone
        direction={focusDirection}
        className={classes.chartWrapper}
        defaultTabbableElement={`#${idForDefaultTabbableElement}`}
        {...svgFocusZoneProps}
      >
        {_isFirstRender.current && <div id={idForDefaultTabbableElement} />}
        <svg
          width={svgDimensions.width}
          height={svgDimensions.height}
          aria-label={props.chartTitle}
          style={{ display: 'block' }}
          {...svgProps}
        >
          <g
            ref={(e: SVGElement | null) => {
              xAxisElement.current = e;
            }}
            id={`xAxisGElement${idForGraph}`}
            // To add wrap of x axis lables feature, need to remove word height from svg height.
            transform={`translate(0, ${svgDimensions.height - margins.bottom! - removalValueForTextTuncate!})`}
            className={classes.xAxis}
          />
          {props.xAxisTitle !== undefined && props.xAxisTitle !== '' && (
            <SVGTooltipText
              content={props.xAxisTitle}
              textProps={{
                x: margins.left! + startFromX + xAxisTitleMaximumAllowedWidth / 2,
                y: svgDimensions.height - titleMargin,
                className: classes.axisTitle!,
                textAnchor: 'middle',
              }}
              maxWidth={xAxisTitleMaximumAllowedWidth}
              wrapContent={wrapContent}
            />
          )}
          <g
            ref={(e: SVGElement | null) => {
              yAxisElement.current = e;
            }}
            id={`yAxisGElement${idForGraph}`}
            transform={`translate(${
              _isRtl ? svgDimensions.width - margins.right! - startFromX : margins.left! + startFromX
            }, 0)`}
            className={classes.yAxis}
          />
          {props.secondaryYScaleOptions && (
            <g>
              <g
                ref={(e: SVGElement | null) => {
                  yAxisElementSecondary = e;
                }}
                id={`yAxisGElementSecondary${idForGraph}`}
                transform={`translate(${_isRtl ? margins.left! : svgDimensions.width - margins.right!}, 0)`}
                className={classes.yAxis}
              />
              {props.secondaryYAxistitle !== undefined && props.secondaryYAxistitle !== '' && (
                <SVGTooltipText
                  content={props.secondaryYAxistitle}
                  textProps={{
                    x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2 + removalValueForTextTuncate!,
                    y: _isRtl ? startFromX - titleMargin : svgDimensions.width - margins.right!,
                    textAnchor: 'middle',
                    transform: `translate(${
                      _isRtl ? margins.right! / 2 - titleMargin : margins.right! / 2 + titleMargin
                    },
                 ${svgDimensions.height - margins.bottom! - margins.top! - titleMargin})rotate(-90)`,
                    className: classes.axisTitle!,
                  }}
                  maxWidth={yAxisTitleMaximumAllowedHeight}
                  wrapContent={wrapContent}
                />
              )}
            </g>
          )}
          {children}
          {props.yAxisTitle !== undefined && props.yAxisTitle !== '' && (
            <SVGTooltipText
              content={props.yAxisTitle}
              textProps={{
                x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2 + removalValueForTextTuncate!,
                y: _isRtl
                  ? svgDimensions.width - margins.right! / 2 + titleMargin
                  : margins.left! / 2 + startFromX - titleMargin,
                textAnchor: 'middle',
                transform: `translate(0,
                 ${svgDimensions.height - margins.bottom! - margins.top! - titleMargin})rotate(-90)`,
                className: classes.axisTitle!,
              }}
              maxWidth={yAxisTitleMaximumAllowedHeight}
              wrapContent={wrapContent}
            />
          )}
        </svg>
      </FocusZone>

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
