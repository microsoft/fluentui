import * as React from 'react';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { Callout } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { select as d3Select } from 'd3-selection';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  IModifiedCartesianChartProps,
  IYValueHover,
} from '../../index';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import {
  createNumericXAxis,
  createStringXAxis,
  IAxisData,
  getAccessibleDataObject,
  createDateXAxis,
  IMargins,
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
  getSecureProps,
  truncateString,
  tooltipOfAxislabels,
  DEFAULT_WRAP_WIDTH,
} from '../../utilities/index';
import { LegendShape, Shape } from '../Legends/index';
import { SVGTooltipText, ISVGTooltipTextProps } from '../../utilities/SVGTooltipText';
import { IChart } from '../../types/index';

const getClassNames = classNamesFunction<ICartesianChartStyleProps, ICartesianChartStyles>();
const ChartHoverCard = React.lazy(() =>
  import('../../utilities/ChartHoverCard/ChartHoverCard').then(module => ({ default: module.ChartHoverCard })),
);
const chartTypesWithStringYAxis = [
  ChartTypes.HorizontalBarChartWithAxis,
  ChartTypes.HeatMapChart,
  ChartTypes.VerticalStackedBarChart,
  ChartTypes.GanttChart,
  ChartTypes.ScatterChart,
];

export interface ICartesianChartState {
  containerWidth: number;
  containerHeight: number;
  _width: number;
  _height: number;
  startFromX: number;
}

/**
 * Cartesian chart used for
 * 1.draw X and Y axis of the chart
 * 2.Callout
 * 3.Fit parent Continer
 */
export class CartesianChartBase
  extends React.Component<IModifiedCartesianChartProps, ICartesianChartState>
  implements IChart
{
  public chartContainer: HTMLDivElement;
  private _classNames: IProcessedStyleSet<ICartesianChartStyles>;
  private legendContainer: HTMLDivElement;
  private minLegendContainerHeight: number = 32;
  private xAxisElement: SVGSVGElement | null;
  private yAxisElement: SVGSVGElement | null;
  private yAxisElementSecondary: SVGSVGElement | null;
  private margins: IMargins;
  private idForGraph: string;
  private idForDefaultTabbableElement: string;
  private _reqID: number;
  private _isRtl: boolean = getRTL();
  private _tickValues: (string | number)[];
  private titleMargin: number;
  private _isFirstRender: boolean = true;
  /* Used for when WrapXAxisLabels props appeared.
   * To display the total word (space separated words), Need to have more space than usual.
   * This height will get total height need to disaply total word.
   * These value need to be removed from actual svg height/graph height.
   * Defalut value is 0. And this values calculted when 'wrapXAxisLables' or 'showXAxisLablesTooltip' is true.
   */
  private _removalValueForTextTuncate: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xScale: any;
  private isIntegralDataset: boolean = true;
  private _tooltipId: string;

  constructor(props: IModifiedCartesianChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      startFromX: 0,
    };
    this.idForGraph = getId('chart_');
    this.titleMargin = 8;
    this.idForDefaultTabbableElement = getId('defaultTabbableElement_');
    this._tooltipId = getId('tooltip_');
    /**
     * In RTL mode, Only graph will be rendered left/right. We need to provide left and right margins manually.
     * So that, in RTL, left margins becomes right margins and viceversa.
     * As graph needs to be drawn perfecty, these values consider as default values.
     * Same margins using for all other cartesian charts. Can be accessible through 'getMargins' call back method.
     */
    this.margins = {
      top: this.props.margins?.top ?? 20,
      bottom: this.props.margins?.bottom ?? 35,
      right: this._isRtl
        ? this.props.margins?.left ?? 40
        : this.props.margins?.right ?? this.props?.secondaryYScaleOptions
        ? 40
        : 20,
      left: this._isRtl
        ? this.props.margins?.right ?? this.props?.secondaryYScaleOptions
          ? 40
          : 20
        : this.props.margins?.left ?? 40,
    };
    const TITLE_MARGIN_HORIZONTAL = 24;
    const TITLE_MARGIN_VERTICAL = 20;
    if (this.props.xAxisTitle !== undefined && this.props.xAxisTitle !== '') {
      this.margins.bottom! = this.props.margins?.bottom ?? this.margins.bottom! + TITLE_MARGIN_VERTICAL;
    }
    if (this.props.yAxisTitle !== undefined && this.props.yAxisTitle !== '') {
      this.margins.left! = this._isRtl
        ? this.props.margins?.right ?? this.props?.secondaryYAxistitle
          ? this.margins.right! + 2 * TITLE_MARGIN_HORIZONTAL
          : this.margins.right! + TITLE_MARGIN_HORIZONTAL
        : this.props.margins?.left ?? this.margins.left! + TITLE_MARGIN_HORIZONTAL;
      this.margins.right! = this._isRtl
        ? this.props.margins?.left ?? this.margins.left! + TITLE_MARGIN_HORIZONTAL
        : this.props.margins?.right ?? this.props?.secondaryYAxistitle
        ? this.margins.right! + 2 * TITLE_MARGIN_HORIZONTAL
        : this.margins.right! + TITLE_MARGIN_HORIZONTAL;
    }
    if (this.props.xAxisAnnotation !== undefined && this.props.xAxisAnnotation !== '') {
      this.margins.top! = this.props.margins?.top ?? this.margins.top! + TITLE_MARGIN_VERTICAL;
    }
    if (
      this.props.yAxisAnnotation !== undefined &&
      this.props.yAxisAnnotation !== '' &&
      (this.props.secondaryYAxistitle === undefined || this.props.secondaryYAxistitle === '')
    ) {
      if (this._isRtl) {
        this.margins.left! = this.props.margins?.right ?? this.margins.right! + TITLE_MARGIN_HORIZONTAL;
      } else {
        this.margins.right! = this.props.margins?.right ?? this.margins.right! + TITLE_MARGIN_HORIZONTAL;
      }
    }
  }

  public componentDidMount(): void {
    this._fitParentContainer();
    if (
      chartTypesWithStringYAxis.includes(this.props.chartType) &&
      this.props.showYAxisLables &&
      this.yAxisElement &&
      this.props.yAxisType === YAxisType.StringAxis
    ) {
      const maxYAxisLabelLength = this.calculateMaxYAxisLabelLength(this._classNames.yAxis!);
      if (this.state.startFromX !== maxYAxisLabelLength) {
        this.setState({
          startFromX: maxYAxisLabelLength,
        });
      }
    } else if (this.state.startFromX !== 0) {
      this.setState({
        startFromX: 0,
      });
    }
    this.isIntegralDataset = !this.props.points.some((point: { y: number }) => {
      return point.y % 1 !== 0;
    });
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public componentDidUpdate(prevProps: IModifiedCartesianChartProps): void {
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
    }
    if (
      chartTypesWithStringYAxis.includes(this.props.chartType) &&
      this.props.showYAxisLables &&
      this.yAxisElement &&
      this.props.yAxisType === YAxisType.StringAxis
    ) {
      const maxYAxisLabelLength = this.calculateMaxYAxisLabelLength(this._classNames.yAxis!);
      if (this.state.startFromX !== maxYAxisLabelLength) {
        this.setState({
          startFromX: maxYAxisLabelLength,
        });
      }
    } else if (this.state.startFromX !== 0) {
      this.setState({
        startFromX: 0,
      });
    }
    if (prevProps.points !== this.props.points) {
      this.isIntegralDataset = !this.props.points.some((point: { y: number }) => {
        return point.y % 1 !== 0;
      });
    }
  }

  public calculateMaxYAxisLabelLength = (className: string): number => {
    const formatTickLabel = (str: string) => {
      if (this.props.showYAxisLablesTooltip) {
        return truncateString(str, this.props.noOfCharsToTruncate || 4);
      }

      return str;
    };

    return calculateLongestLabelWidth(
      this.props.stringDatasetForYAxisDomain!.map(label => formatTickLabel(label)),
      `.${className} text`,
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
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
    } = this.props;
    if (this.props.parentRef) {
      this._fitParentContainer();
    }

    const margin = { ...this.margins };
    // Note: This check is unnecessary since startFromX is only set for charts with string y-axis.
    if (chartTypesWithStringYAxis.includes(this.props.chartType)) {
      if (!this._isRtl) {
        margin.left! += this.state.startFromX;
      } else {
        margin.right! += this.state.startFromX;
      }
    }
    // Callback for margins to the chart
    this.props.getmargins && this.props.getmargins(margin);

    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      width: this.state._width,
      height: this.state._height,
      className: this.props.className,
      isRtl: this._isRtl,
      enableReflow: this.props.enableReflow,
    });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    let callout: JSX.Element | null = null;

    let children = null;
    if (
      (this.props.enableFirstRenderOptimization && this.chartContainer) ||
      !this.props.enableFirstRenderOptimization
    ) {
      this._isFirstRender = false;
      const XAxisParams = {
        domainNRangeValues: this.props.getDomainNRangeValues(
          points,
          this.props.getDomainMargins ? this.props.getDomainMargins(this.state.containerWidth) : this.margins,
          this.state.containerWidth,
          chartType,
          this._isRtl,
          this.props.xAxisType,
          this.props.barwidth!,
          this.props.tickValues!,
          // This is only used for Horizontal Bar Chart with Axis for y as string axis
          this.state.startFromX,
        ),
        // FIXME: In XAxisParams, containerHeight is used by HBWA to generate vertical gridlines.
        // Since the x-axis in HBWA is numeric, it typically doesn't require transformation.
        // However, if transformation props are enabled, the updated _removalValueForTextTuncate
        // will only be available in the next render, as it's set after the axis is created.
        // Solution: Delay the creation of gridlines until after the transformation has been applied,
        // or precompute the required height for transformed labels (_removalValueForTextTuncate).
        containerHeight: this.state.containerHeight - this._removalValueForTextTuncate,
        margins: this.margins,
        xAxisElement: this.xAxisElement!,
        showRoundOffXTickValues: this.props.showRoundOffXTickValues ?? true,
        xAxisCount: this.props.xAxisTickCount,
        xAxistickSize: this.props.xAxistickSize,
        tickPadding: this.props.tickPadding || this.props.showXAxisLablesTooltip ? 5 : 10,
        xAxisPadding: this.props.xAxisPadding,
        xAxisInnerPadding: this.props.xAxisInnerPadding,
        xAxisOuterPadding: this.props.xAxisOuterPadding,
        containerWidth: this.state.containerWidth,
        hideTickOverlap: this.props.hideTickOverlap,
        calcMaxLabelWidth: this._calcMaxLabelWidthWithTransform,
        tickStep: this.props.xAxis?.tickStep,
        tick0: this.props.xAxis?.tick0,
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
      switch (this.props.xAxisType!) {
        case XAxisTypes.NumericAxis:
          ({ xScale, tickValues } = createNumericXAxis(
            XAxisParams,
            this.props.tickParams!,
            this.props.chartType,
            culture,
            this.props.xScaleType,
          ));
          break;
        case XAxisTypes.DateAxis:
          ({ xScale, tickValues } = createDateXAxis(
            XAxisParams,
            this.props.tickParams!,
            culture,
            dateLocalizeOptions,
            timeFormatLocale,
            customDateTimeFormatter,
            this.props.useUTC,
            this.props.chartType,
          ));
          break;
        case XAxisTypes.StringAxis:
          ({ xScale, tickValues } = createStringXAxis(
            XAxisParams,
            this.props.tickParams!,
            this.props.datasetForXAxisDomain!,
            culture,
          ));
          break;
        default:
          ({ xScale, tickValues } = createNumericXAxis(
            XAxisParams,
            this.props.tickParams!,
            this.props.chartType,
            culture,
            this.props.xScaleType,
          ));
      }
      this._xScale = xScale;
      this._tickValues = tickValues;

      this._transformXAxisLabels();

      const YAxisParams = {
        margins: this.props.getYDomainMargins ? this.props.getYDomainMargins(this.state.containerHeight) : this.margins,
        containerWidth: this.state.containerWidth,
        containerHeight: this.state.containerHeight - this._removalValueForTextTuncate,
        yAxisElement: this.yAxisElement,
        yAxisTickFormat: this.props.yAxisTickFormat!,
        yAxisTickCount: this.props.yAxisTickCount!,
        yMinValue: this.props.yMinValue || 0,
        yMaxValue: this.props.yMaxValue || 0,
        tickPadding: 10,
        maxOfYVal: this.props.maxOfYVal,
        yMinMaxValues: this.props.getMinMaxOfYAxis(points, this.props.yAxisType),
        // please note these padding default values must be consistent in here
        // and the parent chart(HBWA/Vertical etc..) for more details refer example
        // http://using-d3js.com/04_07_ordinal_scales.html
        yAxisPadding: this.props.yAxisPadding || 0,
        tickValues: this.props.yAxisTickValues,
        tickStep: this.props.yAxis?.tickStep,
        tick0: this.props.yAxis?.tick0,
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
      if (this.props.yAxisType && this.props.yAxisType === YAxisType.StringAxis) {
        yScalePrimary = this.props.createStringYAxis(
          YAxisParams,
          this.props.stringDatasetForYAxisDomain!,
          this._isRtl,
          this.props.barwidth,
          this.props.chartType,
        );
      } else {
        // TODO: Since the scale domain values are now computed independently for both the primary and
        // secondary y-axes, the yMinValue and yMaxValue props are no longer necessary for accurately
        // rendering the secondary y-axis. Therefore, rather than checking the secondaryYScaleOptions
        // prop to determine whether to create a secondary y-axis, it's more appropriate to check if any
        // data points are assigned to use the secondary y-scale.
        if (this.props?.secondaryYScaleOptions) {
          const YAxisParamsSecondary = {
            margins: this.margins,
            containerWidth: this.state.containerWidth,
            containerHeight: this.state.containerHeight - this._removalValueForTextTuncate,
            yAxisElement: this.yAxisElementSecondary,
            yAxisTickFormat: this.props.yAxisTickFormat!,
            yAxisTickCount: this.props.yAxisTickCount!,
            yMinValue: this.props.secondaryYScaleOptions?.yMinValue || 0,
            yMaxValue: this.props.secondaryYScaleOptions?.yMaxValue ?? 100,
            tickPadding: 10,
            yMinMaxValues: this.props.getMinMaxOfYAxis(points, this.props.yAxisType, true),
            yAxisPadding: this.props.yAxisPadding,
          };

          yScaleSecondary = this.props.createYAxis(
            YAxisParamsSecondary,
            this._isRtl,
            axisData,
            this.isIntegralDataset,
            true,
            this.props.supportNegativeData!,
            this.props.roundedTicks!,
            this.props.secondaryYScaleType,
          );
        }
        yScalePrimary = this.props.createYAxis(
          YAxisParams,
          this._isRtl,
          axisData,
          this.isIntegralDataset,
          false,
          this.props.supportNegativeData!,
          this.props.roundedTicks!,
          this.props.yScaleType,
        );
      }

      if (chartTypesWithStringYAxis.includes(this.props.chartType) && this.props.yAxisType === YAxisType.StringAxis) {
        // Removing un wanted tooltip div from DOM, when prop not provided, for proper cleanup
        // of unwanted DOM elements, to prevent flacky behaviour in tooltips , that might occur
        // in creating tooltips when tooltips are enabled( as we try to recreate a tspan with this._tooltipId)
        if (!this.props.showYAxisLablesTooltip) {
          try {
            document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
            //eslint-disable-next-line no-empty
          } catch (e) {}
        }
        // Used to display tooltip at y axis labels.
        if (this.props.showYAxisLablesTooltip) {
          // To create y axis tick values by if specified truncating the rest of the text
          // and showing elipsis or showing the whole string,
          yScalePrimary &&
            // Note: This function should be invoked within the showYAxisLablesTooltip check,
            // as its sole purpose is to truncate labels that exceed the noOfCharsToTruncate limit.
            createYAxisLabels(
              this.yAxisElement,
              yScalePrimary,
              this.props.noOfCharsToTruncate || 4,
              this.props.showYAxisLablesTooltip || false,
              this._isRtl,
            );

          const yAxisElement = d3Select(this.yAxisElement).call(yScalePrimary);
          try {
            document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
            //eslint-disable-next-line no-empty
          } catch (e) {}
          const ytooltipProps = {
            tooltipCls: this._classNames.tooltip!,
            id: this._tooltipId,
            axis: yAxisElement,
          };
          yAxisElement && tooltipOfAxislabels(ytooltipProps);
        }
      }

      this.props.getAxisData && this.props.getAxisData(axisData);
      // Callback function for chart, returns axis
      this._getData(xScale, yScalePrimary, yScaleSecondary);

      children = this.props.children({
        ...this.state,
        xScale,
        yScalePrimary,
        yScaleSecondary,
      });

      if (!this.props.hideTooltip && calloutProps!.isCalloutVisible) {
        callout = this._generateCallout(calloutProps, chartHoverProps);
      }
    }

    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };

    let focusDirection;
    if (this.props.focusZoneDirection === FocusZoneDirection.vertical) {
      focusDirection = this.props.focusZoneDirection;
    } else if (this.props.focusZoneDirection) {
      focusDirection = this.props.focusZoneDirection;
    } else {
      focusDirection = FocusZoneDirection.horizontal;
    }

    const xAxisTitleMaximumAllowedWidth =
      svgDimensions.width - this.margins.left! - this.margins.right! - this.state.startFromX!;
    const yAxisTitleMaximumAllowedHeight =
      svgDimensions.height -
      this.margins.bottom! -
      this.margins.top! -
      this._removalValueForTextTuncate -
      this.titleMargin;

    const commonSvgToolTipProps: ISVGTooltipTextProps = {
      wrapContent,
      theme: this.props.theme,
      showBackground: true,
      className: this._classNames.svgTooltip,
    };
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
        id={this.idForGraph}
        className={this._classNames.root}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        onMouseLeave={this._onChartLeave}
      >
        {!this._isFirstRender && <div id={this.idForDefaultTabbableElement} />}
        <FocusZone
          direction={focusDirection}
          className={this._classNames.chartWrapper}
          defaultTabbableElement={`#${this.idForDefaultTabbableElement}`}
          {...svgFocusZoneProps}
        >
          {this._isFirstRender && <div id={this.idForDefaultTabbableElement} />}
          <svg
            width={svgDimensions.width}
            height={svgDimensions.height}
            role="region"
            aria-label={this._getChartDescription()}
            style={{ display: 'block' }}
            className={this._classNames.chart}
            {...getSecureProps(svgProps)}
          >
            <g
              ref={(e: SVGSVGElement | null) => {
                this.xAxisElement = e;
              }}
              id={`xAxisGElement${this.idForGraph}`}
              // To add wrap of x axis lables feature, need to remove word height from svg height.
              transform={`translate(0, ${
                svgDimensions.height - this.margins.bottom! - this._removalValueForTextTuncate
              })`}
              className={this._classNames.xAxis}
            />
            {this.props.xAxisTitle !== undefined && this.props.xAxisTitle !== '' && (
              <SVGTooltipText
                content={this.props.xAxisTitle}
                textProps={{
                  x: this.margins.left! + this.state.startFromX + xAxisTitleMaximumAllowedWidth / 2,
                  y: svgDimensions.height - this.titleMargin,
                  className: this._classNames.axisTitle!,
                  textAnchor: 'middle',
                  'aria-hidden': true,
                }}
                maxWidth={xAxisTitleMaximumAllowedWidth}
                {...commonSvgToolTipProps}
              />
            )}
            {this.props.xAxisAnnotation !== undefined && this.props.xAxisAnnotation !== '' && (
              <SVGTooltipText
                content={this.props.xAxisAnnotation}
                textProps={{
                  x: this.margins.left! + this.state.startFromX + xAxisTitleMaximumAllowedWidth / 2,
                  y: this.titleMargin + 3,
                  className: this._classNames.axisAnnotation!,
                  textAnchor: 'middle',
                  'aria-hidden': true,
                }}
                maxWidth={xAxisTitleMaximumAllowedWidth}
                {...commonSvgToolTipProps}
              />
            )}
            <g
              ref={(e: SVGSVGElement | null) => {
                this.yAxisElement = e;
              }}
              id={`yAxisGElement${this.idForGraph}`}
              transform={`translate(${
                this._isRtl
                  ? svgDimensions.width - this.margins.right! - this.state.startFromX
                  : this.margins.left! + this.state.startFromX
              }, 0)`}
              className={this._classNames.yAxis}
            />
            {this.props.secondaryYScaleOptions && (
              <g>
                <g
                  ref={(e: SVGSVGElement | null) => {
                    this.yAxisElementSecondary = e;
                  }}
                  id={`yAxisGElementSecondary${this.idForGraph}`}
                  transform={`translate(${
                    this._isRtl
                      ? this.margins.left! + this.state.startFromX
                      : svgDimensions.width - this.margins.right! - this.state.startFromX
                  }, 0)`}
                  className={this._classNames.yAxis}
                />
                {this.props.secondaryYAxistitle !== undefined && this.props.secondaryYAxistitle !== '' && (
                  <SVGTooltipText
                    content={this.props.secondaryYAxistitle}
                    textProps={{
                      x: (yAxisTitleMaximumAllowedHeight - this.margins.bottom!) / 2 + this._removalValueForTextTuncate,
                      y: this._isRtl
                        ? this.state.startFromX - this.titleMargin
                        : svgDimensions.width - this.margins.right!,
                      textAnchor: 'middle',
                      transform: `translate(${
                        this._isRtl
                          ? this.margins.right! / 2 - this.titleMargin
                          : this.margins.right! / 2 + this.titleMargin
                      },
                   ${svgDimensions.height - this.margins.bottom! - this.margins.top! - this.titleMargin})rotate(-90)`,
                      className: this._classNames.axisTitle!,
                      'aria-hidden': true,
                    }}
                    maxWidth={yAxisTitleMaximumAllowedHeight}
                    {...commonSvgToolTipProps}
                  />
                )}
              </g>
            )}
            {children}
            {this.props.yAxisTitle !== undefined && this.props.yAxisTitle !== '' && (
              <SVGTooltipText
                content={this.props.yAxisTitle}
                textProps={{
                  x: (yAxisTitleMaximumAllowedHeight - this.margins.bottom!) / 2 + this._removalValueForTextTuncate,
                  y: this._isRtl
                    ? svgDimensions.width - this.margins.right! / 2 + this.titleMargin
                    : this.margins.left! / 2 - this.titleMargin,
                  textAnchor: 'middle',
                  transform: `translate(0,
                   ${svgDimensions.height - this.margins.bottom! - this.margins.top! - this.titleMargin})rotate(-90)`,
                  className: this._classNames.axisTitle!,
                  'aria-hidden': true,
                }}
                maxWidth={yAxisTitleMaximumAllowedHeight}
                {...commonSvgToolTipProps}
              />
            )}
            {this.props.yAxisAnnotation !== undefined &&
              this.props.yAxisAnnotation !== '' &&
              (this.props.secondaryYAxistitle === undefined || this.props.secondaryYAxistitle === '') && (
                <SVGTooltipText
                  content={this.props.yAxisAnnotation}
                  textProps={{
                    x: (yAxisTitleMaximumAllowedHeight - this.margins.bottom!) / 2 + this._removalValueForTextTuncate,
                    y: this._isRtl
                      ? this.state.startFromX - this.titleMargin
                      : svgDimensions.width - this.margins.right!,
                    textAnchor: 'middle',
                    transform: `translate(${
                      this._isRtl
                        ? this.margins.right! / 2 - this.titleMargin
                        : this.margins.right! / 2 + this.titleMargin
                    },
                   ${svgDimensions.height - this.margins.bottom! - this.margins.top! - this.titleMargin})rotate(-90)`,
                    className: this._classNames.axisAnnotation!,
                    'aria-hidden': true,
                  }}
                  maxWidth={yAxisTitleMaximumAllowedHeight}
                  {...commonSvgToolTipProps}
                />
              )}
          </svg>
        </FocusZone>

        {!this.props.hideLegend && (
          <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
            {this.props.legendBars}
          </div>
        )}
        {/** The callout is used for narration, so keep it mounted on the DOM */}
        {callout && <React.Suspense fallback={<div>Loading...</div>}>{callout}</React.Suspense>}
      </div>
    );
  }

  /**
   * Dedicated function to return the Callout JSX Element , which can further be used to only call this when
   * only the calloutprops and charthover props changes.
   * @param calloutProps
   * @param chartHoverProps
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-deprecated
  private _generateCallout(calloutProps: any, chartHoverProps: any): JSX.Element {
    return (
      <Callout
        hidden={!(!this.props.hideTooltip && calloutProps!.isCalloutVisible)}
        /** Keep the callout updated with details of focused/hovered chart element */
        shouldUpdateWhenHidden={true}
        {...calloutProps}
      >
        {/** Given custom callout, then it will render */}
        {this.props.customizedCallout && this.props.customizedCallout}
        {/** single x point its corresponding y points of all the bars/lines in chart will render in callout */}
        {!this.props.customizedCallout && this.props.isCalloutForStack && this._multiValueCallout(calloutProps)}
        {/** single x point its corresponding y point of single line/bar in the chart will render in callout */}
        {!this.props.customizedCallout && !this.props.isCalloutForStack && (
          <ChartHoverCard
            XValue={calloutProps.XValue}
            Legend={calloutProps.legend!}
            YValue={calloutProps.YValue!}
            color={calloutProps.color!}
            culture={this.props.culture}
            {...chartHoverProps}
          />
        )}
      </Callout>
    );
  }

  // TO DO: Write a common functional component for Multi value callout and divide sub count method
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _multiValueCallout = (calloutProps: any) => {
    const yValueHoverSubCountsExists: boolean = this._yValueHoverSubCountsExists(calloutProps.YValueHover);
    return (
      <div className={this._classNames.calloutContentRoot}>
        <div
          className={this._classNames.calloutDateTimeContainer}
          style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
        >
          <div
            className={this._classNames.calloutContentX}
            {...getAccessibleDataObject(calloutProps!.xAxisCalloutAccessibilityData, 'text', false)}
          >
            {formatToLocaleString(calloutProps!.hoverXValue, this.props.culture, this.props.useUTC) as React.ReactNode}
          </div>
        </div>
        <div
          className={this._classNames.calloutInfoContainer}
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
                            borderBottom: `1px solid ${this.props.theme!.semanticColors.menuDivider}`,
                            paddingBottom: '10px',
                          }),
                        }
                      : {
                          ...(shouldDrawBorderBottom && {
                            borderBottom: `1px solid ${this.props.theme!.semanticColors.menuDivider}`,
                            paddingBottom: '10px',
                          }),
                        }
                  }
                >
                  {this._getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                </div>
              );
            })}
          {!!calloutProps.descriptionMessage && (
            <div className={this._classNames.descriptionMessage}>{calloutProps.descriptionMessage}</div>
          )}
        </div>
      </div>
    );
  };

  private _yValueHoverSubCountsExists(yValueHover?: IYValueHover[]) {
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

  private _getCalloutContent(
    xValue: IYValueHover,
    index: number,
    yValueHoverSubCountsExists: boolean,
    isLast: boolean,
  ): React.ReactNode {
    const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };
    const toDrawShape = xValue.index !== undefined && xValue.index !== -1;
    const _classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      width: this.state._width,
      height: this.state._height,
      className: this.props.className,
      isRtl: this._isRtl,
      lineColor: xValue.color,
      toDrawShape,
    });

    const { culture, useUTC } = this.props;
    const yValue = formatToLocaleString(xValue.y, culture, useUTC) as React.ReactNode;
    if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
      return (
        <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
          {yValueHoverSubCountsExists && (
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({yValue})
            </div>
          )}
          <div id={`${index}_${xValue.y}`} className={_classNames.calloutBlockContainer}>
            {toDrawShape && (
              <Shape
                svgProps={{
                  className: _classNames.shapeStyles,
                }}
                pathProps={{ fill: xValue.color }}
                shape={Points[xValue.index! % Object.keys(pointTypes).length] as LegendShape}
              />
            )}
            <div>
              <div className={_classNames.calloutlegendText}> {xValue.legend}</div>
              <div className={_classNames.calloutContentY}>
                {
                  formatToLocaleString(
                    xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y ?? xValue.data,
                    culture,
                    useUTC,
                  ) as React.ReactNode
                }
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
              <div key={subcountName} className={_classNames.calloutBlockContainer}>
                <div className={_classNames.calloutlegendText}>
                  {formatToLocaleString(subcountName, culture, useUTC) as React.ReactNode}
                </div>
                <div className={_classNames.calloutContentY}>
                  {formatToLocaleString(subcounts[subcountName], culture, useUTC) as React.ReactNode}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  /**
   * When screen resizes, along with screen, chart also auto adjusted.
   * This method used to adjust height and width of the charts.
   */
  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    this._reqID = requestAnimationFrame(() => {
      let legendContainerHeight;
      if (this.props.hideLegend) {
        // If there is no legend, need not to allocate some space from total chart space.
        legendContainerHeight = 0;
      } else {
        const legendContainerComputedStyles = this.legendContainer && getComputedStyle(this.legendContainer);
        legendContainerHeight =
          ((this.legendContainer && this.legendContainer.getBoundingClientRect().height) ||
            this.minLegendContainerHeight) +
          parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginTop) || '0') +
          parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginBottom) || '0');
      }
      if (this.props.parentRef || this.chartContainer) {
        const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
        const currentContainerWidth =
          this.props.enableReflow && !this._isFirstRender
            ? Math.max(container.getBoundingClientRect().width, this._calculateChartMinWidth())
            : container.getBoundingClientRect().width;
        const currentContainerHeight =
          container.getBoundingClientRect().height > legendContainerHeight
            ? container.getBoundingClientRect().height
            : 350;
        const shouldResize =
          containerWidth !== currentContainerWidth ||
          containerHeight !== currentContainerHeight - legendContainerHeight;
        if (shouldResize) {
          this.setState({
            containerWidth: currentContainerWidth,
            containerHeight: currentContainerHeight - legendContainerHeight,
          });
        }
      }
    });
  }

  // Call back to the chart.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getData = (xScale: any, yScalePrimary: any, yScaleSecondary: any) => {
    this.props.getGraphData &&
      this.props.getGraphData(
        xScale,
        yScalePrimary,
        this.state.containerHeight - this._removalValueForTextTuncate,
        this.state.containerWidth,
        this.xAxisElement,
        this.yAxisElement,
        yScaleSecondary,
      );
  };

  private _onChartLeave = (): void => {
    this.props.onChartMouseLeave && this.props.onChartMouseLeave();
  };

  private _calculateChartMinWidth = (): number => {
    // Adding 10px for padding on both sides
    const labelWidth = this._calcMaxLabelWidthWithTransform(this._tickValues) + 10;
    let minChartWidth = this.margins.left! + this.margins.right! + labelWidth * (this._tickValues.length - 1);

    if (
      [ChartTypes.GroupedVerticalBarChart, ChartTypes.VerticalBarChart, ChartTypes.VerticalStackedBarChart].includes(
        this.props.chartType,
      )
    ) {
      const minDomainMargin = 8;
      minChartWidth += minDomainMargin * 2;
    }

    return minChartWidth;
  };

  private _getChartDescription = (): string => {
    return (
      (this.props.chartTitle || 'Chart. ') +
      this._getAxisTitle('X', this.props.xAxisTitle, this.props.xAxisType) +
      this._getAxisTitle('Y', this.props.yAxisTitle, this.props.yAxisType || YAxisType.NumericAxis) +
      (this.props.secondaryYScaleOptions
        ? this._getAxisTitle('secondary Y', this.props.secondaryYAxistitle, YAxisType.NumericAxis)
        : '')
    );
  };

  private _getAxisTitle = (
    axisLabel: string,
    axisTitle: string | undefined,
    axisType: XAxisTypes | YAxisType,
  ): string => {
    return (
      `The ${axisLabel} axis displays ` +
      (axisTitle ||
        (axisType === XAxisTypes.StringAxis || axisType === YAxisType.StringAxis
          ? 'categories'
          : axisType === XAxisTypes.DateAxis || axisType === YAxisType.DateAxis
          ? 'time'
          : 'values')) +
      '. '
    );
  };

  private _calcMaxLabelWidthWithTransform = (x: (string | number)[]) => {
    // Case: rotated labels
    if (
      !this.props.wrapXAxisLables &&
      this.props.rotateXAxisLables &&
      this.props.xAxisType! === XAxisTypes.StringAxis
    ) {
      const longestLabelWidth = calculateLongestLabelWidth(x, `.${this._classNames.xAxis} text`);
      return Math.ceil(longestLabelWidth * Math.cos(Math.PI / 4));
    }

    // Case: truncated labels
    if (this.props.showXAxisLablesTooltip) {
      const tickValues = x.map(val => {
        const numChars = this.props.noOfCharsToTruncate || 4;
        return val.toString().length > numChars ? `${val.toString().slice(0, numChars)}...` : val;
      });

      const longestLabelWidth = calculateLongestLabelWidth(tickValues, `.${this._classNames.xAxis} text`);
      return Math.ceil(longestLabelWidth);
    }

    // Case: wrapped labels
    if (this.props.wrapXAxisLables) {
      // FIXME: Calculate the max width of lines instead of words. This requires applying
      // the wrapping transformation earlier to obtain the actual rendered lines.
      const words: string[] = [];
      x.forEach((val: string) => {
        words.push(...val.toString().split(/\s+/));
      });

      // This approach works well in most cases, since overflow typically occurs only when
      // a single word exceeds the specified width — otherwise, the text will wrap as expected.
      const longestLabelWidth = calculateLongestLabelWidth(words, `.${this._classNames.xAxis} text`);
      return Math.max(Math.ceil(longestLabelWidth), DEFAULT_WRAP_WIDTH);
    }

    // Default case
    const longestLabelWidth = calculateLongestLabelWidth(x, `.${this._classNames.xAxis} text`);
    return Math.ceil(longestLabelWidth);
  };

  private _transformXAxisLabels = () => {
    this._removalValueForTextTuncate = 0;

    /*
     * To enable wrapping of x axis tick values or to display complete x axis tick values,
     * we need to calculate how much space it needed to render the text.
     * No need to re-calculate every time the chart renders and same time need to get an update. So using setState.
     * Required space will be calculated first time chart rendering and if any width/height of chart updated.
     * */
    if (this.props.wrapXAxisLables || this.props.showXAxisLablesTooltip) {
      let maxXAxisLabelWidth: number | undefined;
      if (this.props.xAxisType === XAxisTypes.StringAxis) {
        if ((this.props.datasetForXAxisDomain?.length || 0) > 1) {
          maxXAxisLabelWidth = this._xScale.step();
        } else {
          maxXAxisLabelWidth = this.state.containerWidth;
        }
      }

      const wrapLabelProps = {
        node: this.xAxisElement,
        xAxis: this._xScale,
        showXAxisLablesTooltip: this.props.showXAxisLablesTooltip || false,
        noOfCharsToTruncate: this.props.noOfCharsToTruncate || 4,
        width: maxXAxisLabelWidth,
      };
      this._removalValueForTextTuncate = createWrapOfXLabels(wrapLabelProps) ?? 0;
    }

    if (
      !this.props.wrapXAxisLables &&
      this.props.rotateXAxisLables &&
      this.props.xAxisType! === XAxisTypes.StringAxis
    ) {
      const rotateLabelProps = {
        node: this.xAxisElement,
        xAxis: this._xScale,
      };
      const rotatedHeight = rotateXAxisLabels(rotateLabelProps) ?? 0;
      // this.margins.bottom is used as padding here
      this._removalValueForTextTuncate = rotatedHeight + this.margins.bottom!;
    }
  };
}
