import * as React from 'react';
import { lazy } from 'react';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { Callout } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  IModifiedCartesianChartProps,
  IYValueHover,
  IHorizontalBarChartWithAxisDataPoint,
} from '../../index';
import { convertToLocaleString } from '../../utilities/locale-util';
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
} from '../../utilities/index';
import { LegendShape, Shape } from '../Legends/index';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';

const getClassNames = classNamesFunction<ICartesianChartStyleProps, ICartesianChartStyles>();
const ChartHoverCard = lazy(() =>
  import('../../utilities/ChartHoverCard/ChartHoverCard').then(module => ({ default: module.ChartHoverCard })),
);

export interface ICartesianChartState {
  containerWidth: number;
  containerHeight: number;
  _width: number;
  _height: number;
  /* To update this values using setState in render method.
   * To avoid multiple re renders, Only first time setting the value.
   */
  isRemoveValCalculated?: boolean;
  /* Used for when WrapXAxisLabels props appeared.
   * To display the total word (space separated words), Need to have more space than usual.
   * This height will get total height need to disaply total word.
   * These value need to be removed from actual svg height/graph height.
   * Defalut value is 0. And this values calculted when 'wrapXAxisLables' or 'showXAxisLablesTooltip' is true.
   */
  _removalValueForTextTuncate?: number;
  startFromX: number;
}

/**
 * Cartesian chart used for
 * 1.draw X and Y axis of the chart
 * 2.Callout
 * 3.Fit parent Continer
 */
export class CartesianChartBase extends React.Component<IModifiedCartesianChartProps, ICartesianChartState> {
  private _classNames: IProcessedStyleSet<ICartesianChartStyles>;
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  private minLegendContainerHeight: number = 32;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  private yAxisElementSecondary: SVGElement | null;
  private margins: IMargins;
  private idForGraph: string;
  private idForDefaultTabbableElement: string;
  private _reqID: number;
  private _isRtl: boolean = getRTL();
  private _tickValues: (string | number)[];
  private titleMargin: number;
  private _isFirstRender: boolean = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xScale: any;
  private isIntegralDataset: boolean = true;

  constructor(props: IModifiedCartesianChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      _removalValueForTextTuncate: 0,
      isRemoveValCalculated: true,
      startFromX: 0,
    };
    this.idForGraph = getId('chart_');
    this.titleMargin = 8;
    this.idForDefaultTabbableElement = getId('defaultTabbableElement_');
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
    if (this.props.xAxisTitle !== undefined && this.props.xAxisTitle !== '') {
      this.margins.bottom! = this.props.margins?.bottom ?? 55;
    }
    if (this.props.yAxisTitle !== undefined && this.props.yAxisTitle !== '') {
      this.margins.left! = this._isRtl
        ? this.props.margins?.right ?? this.props?.secondaryYAxistitle
          ? 60
          : 40
        : this.props.margins?.left ?? 60;
      this.margins.right! = this._isRtl
        ? this.props.margins?.left ?? 60
        : this.props.margins?.right ?? this.props?.secondaryYAxistitle
        ? 60
        : 40;
    }
  }

  public componentDidMount(): void {
    this._fitParentContainer();
    if (
      this.props.chartType === ChartTypes.HorizontalBarChartWithAxis &&
      this.props.showYAxisLables &&
      this.yAxisElement
    ) {
      const maxYAxisLabelLength = calculateLongestLabelWidth(
        this.props.points.map((point: IHorizontalBarChartWithAxisDataPoint) => point.y),
        `.${this._classNames.yAxis} text`,
      );
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
      !this.props.wrapXAxisLables &&
      this.props.rotateXAxisLables &&
      this.props.xAxisType! === XAxisTypes.StringAxis
    ) {
      const rotateLabelProps = {
        node: this.xAxisElement,
        xAxis: this._xScale,
      };
      const rotatedHeight = rotateXAxisLabels(rotateLabelProps);
      if (
        this.state.isRemoveValCalculated &&
        this.state._removalValueForTextTuncate !== rotatedHeight! + this.margins.bottom! &&
        rotatedHeight! > 0
      ) {
        this.setState({
          _removalValueForTextTuncate: rotatedHeight! + this.margins.bottom!,
          isRemoveValCalculated: false,
        });
      }
    }
    if (
      this.props.chartType === ChartTypes.HorizontalBarChartWithAxis &&
      this.props.showYAxisLables &&
      this.yAxisElement
    ) {
      const maxYAxisLabelLength = calculateLongestLabelWidth(
        this.props.points.map((point: IHorizontalBarChartWithAxisDataPoint) => point.y),
        `.${this._classNames.yAxis} text`,
      );
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
    if (this.props.chartType === ChartTypes.HorizontalBarChartWithAxis) {
      if (!this._isRtl) {
        margin.left! += this.state.startFromX;
      } else {
        margin.right! += this.state.startFromX;
      }
    }
    // Callback for margins to the chart
    this.props.getmargins && this.props.getmargins(margin);

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
        containerHeight: this.state.containerHeight - this.state._removalValueForTextTuncate!,
        margins: this.margins,
        xAxisElement: this.xAxisElement!,
        showRoundOffXTickValues: true,
        xAxisCount: this.props.xAxisTickCount,
        xAxistickSize: this.props.xAxistickSize,
        tickPadding: this.props.tickPadding || this.props.showXAxisLablesTooltip ? 5 : 10,
        xAxisPadding: this.props.xAxisPadding,
        xAxisInnerPadding: this.props.xAxisInnerPadding,
        xAxisOuterPadding: this.props.xAxisOuterPadding,
      };

      const YAxisParams = {
        margins: this.margins,
        containerWidth: this.state.containerWidth,
        containerHeight: this.state.containerHeight - this.state._removalValueForTextTuncate!,
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
          ({ xScale, tickValues } = createNumericXAxis(XAxisParams, this.props.chartType, culture));
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
          ({ xScale, tickValues } = createNumericXAxis(XAxisParams, this.props.chartType, culture));
      }
      this._xScale = xScale;
      this._tickValues = tickValues;

      /*
       * To enable wrapping of x axis tick values or to display complete x axis tick values,
       * we need to calculate how much space it needed to render the text.
       * No need to re-calculate every time the chart renders and same time need to get an update. So using setState.
       * Required space will be calculated first time chart rendering and if any width/height of chart updated.
       * */
      if (this.props.wrapXAxisLables || this.props.showXAxisLablesTooltip) {
        const wrapLabelProps = {
          node: this.xAxisElement,
          xAxis: xScale,
          showXAxisLablesTooltip: this.props.showXAxisLablesTooltip || false,
          noOfCharsToTruncate: this.props.noOfCharsToTruncate || 4,
        };
        const temp = xScale && (createWrapOfXLabels(wrapLabelProps) as number);
        // this value need to be updated for draw graph updated. So instead of using private value, using set state.
        if (this.state.isRemoveValCalculated && this.state._removalValueForTextTuncate !== temp) {
          this.setState({ _removalValueForTextTuncate: temp, isRemoveValCalculated: false });
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
      if (this.props.yAxisType && this.props.yAxisType === YAxisType.StringAxis) {
        yScale = this.props.createStringYAxis(
          YAxisParams,
          this.props.stringDatasetForYAxisDomain!,
          this._isRtl,
          this.props.barwidth,
        );
      } else {
        if (this.props?.secondaryYScaleOptions) {
          const YAxisParamsSecondary = {
            margins: this.margins,
            containerWidth: this.state.containerWidth,
            containerHeight: this.state.containerHeight - this.state._removalValueForTextTuncate!,
            yAxisElement: this.yAxisElementSecondary,
            yAxisTickFormat: this.props.yAxisTickFormat!,
            yAxisTickCount: this.props.yAxisTickCount!,
            yMinValue: this.props.secondaryYScaleOptions?.yMinValue || 0,
            yMaxValue: this.props.secondaryYScaleOptions?.yMaxValue ?? 100,
            tickPadding: 10,
            maxOfYVal: this.props.secondaryYScaleOptions?.yMaxValue ?? 100,
            yMinMaxValues: this.props.getMinMaxOfYAxis(points, this.props.yAxisType),
            yAxisPadding: this.props.yAxisPadding,
          };

          yScaleSecondary = this.props.createYAxis(YAxisParamsSecondary, this._isRtl, axisData, this.isIntegralDataset);
        }
        yScale = this.props.createYAxis(YAxisParams, this._isRtl, axisData, this.isIntegralDataset);
      }

      /*
     * To create y axis tick values by if specified
    truncating the rest of the text and showing elipsis
    or showing the whole string,
     * */
      this.props.chartType === ChartTypes.HorizontalBarChartWithAxis &&
        yScale &&
        createYAxisLabels(
          this.yAxisElement,
          yScale,
          this.props.noOfCharsToTruncate || 4,
          this.props.showYAxisLablesTooltip || false,
          this._isRtl,
        );

      this.props.getAxisData && this.props.getAxisData(axisData);
      // Callback function for chart, returns axis
      this._getData(xScale, yScale);

      children = this.props.children({
        ...this.state,
        xScale,
        yScale,
        yScaleSecondary,
      });

      if (!this.props.hideTooltip && calloutProps!.isCalloutVisible) {
        callout = this._generateCallout(calloutProps, chartHoverProps);
      }
    }

    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      width: this.state._width,
      height: this.state._height,
      className: this.props.className,
      isRtl: this._isRtl,
    });

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
      this.state._removalValueForTextTuncate! -
      this.titleMargin;
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
            {...svgProps}
          >
            <g
              ref={(e: SVGElement | null) => {
                this.xAxisElement = e;
              }}
              id={`xAxisGElement${this.idForGraph}`}
              // To add wrap of x axis lables feature, need to remove word height from svg height.
              transform={`translate(0, ${
                svgDimensions.height - this.margins.bottom! - this.state._removalValueForTextTuncate!
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
                wrapContent={wrapContent}
              />
            )}
            <g
              ref={(e: SVGElement | null) => {
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
                  ref={(e: SVGElement | null) => {
                    this.yAxisElementSecondary = e;
                  }}
                  id={`yAxisGElementSecondary${this.idForGraph}`}
                  transform={`translate(${
                    this._isRtl ? this.margins.left! : svgDimensions.width - this.margins.right!
                  }, 0)`}
                  className={this._classNames.yAxis}
                />
                {this.props.secondaryYAxistitle !== undefined && this.props.secondaryYAxistitle !== '' && (
                  <SVGTooltipText
                    content={this.props.secondaryYAxistitle}
                    textProps={{
                      x:
                        (yAxisTitleMaximumAllowedHeight - this.margins.bottom!) / 2 +
                        this.state._removalValueForTextTuncate!,
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
                    wrapContent={wrapContent}
                  />
                )}
              </g>
            )}
            {children}
            {this.props.yAxisTitle !== undefined && this.props.yAxisTitle !== '' && (
              <SVGTooltipText
                content={this.props.yAxisTitle}
                textProps={{
                  x:
                    (yAxisTitleMaximumAllowedHeight - this.margins.bottom!) / 2 +
                    this.state._removalValueForTextTuncate!,
                  y: this._isRtl
                    ? svgDimensions.width - this.margins.right! / 2 + this.titleMargin
                    : this.margins.left! / 2 + this.state.startFromX - this.titleMargin,
                  textAnchor: 'middle',
                  transform: `translate(0,
                   ${svgDimensions.height - this.margins.bottom! - this.margins.top! - this.titleMargin})rotate(-90)`,
                  className: this._classNames.axisTitle!,
                  'aria-hidden': true,
                }}
                maxWidth={yAxisTitleMaximumAllowedHeight}
                wrapContent={wrapContent}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            {convertToLocaleString(calloutProps!.hoverXValue, this.props.culture)}
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

    const { culture } = this.props;
    const yValue = convertToLocaleString(xValue.y, culture);
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
              <div key={subcountName} className={_classNames.calloutBlockContainer}>
                <div className={_classNames.calloutlegendText}> {convertToLocaleString(subcountName, culture)}</div>
                <div className={_classNames.calloutContentY}>
                  {convertToLocaleString(subcounts[subcountName], culture)}
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
  private _getData = (xScale: any, yScale: any) => {
    this.props.getGraphData &&
      this.props.getGraphData(
        xScale,
        yScale,
        this.state.containerHeight - this.state._removalValueForTextTuncate!,
        this.state.containerWidth,
        this.xAxisElement,
        this.yAxisElement,
      );
  };

  private _onChartLeave = (): void => {
    this.props.onChartMouseLeave && this.props.onChartMouseLeave();
  };

  private _calculateChartMinWidth = (): number => {
    let labelWidth = 10; // Total padding on the left and right sides of the label

    // Case: rotated labels
    if (
      !this.props.wrapXAxisLables &&
      this.props.rotateXAxisLables &&
      this.props.xAxisType! === XAxisTypes.StringAxis
    ) {
      const longestLabelWidth = calculateLongestLabelWidth(this._tickValues, `.${this._classNames.xAxis} text`);
      labelWidth += Math.ceil(longestLabelWidth * Math.cos(Math.PI / 4));
    }
    // Case: truncated labels
    else if (this.props.showXAxisLablesTooltip) {
      const tickValues = this._tickValues.map(val => {
        const numChars = this.props.noOfCharsToTruncate || 4;
        return val.toString().length > numChars ? `${val.toString().slice(0, numChars)}...` : val;
      });

      const longestLabelWidth = calculateLongestLabelWidth(tickValues, `.${this._classNames.xAxis} text`);
      labelWidth += Math.ceil(longestLabelWidth);
    }
    // Case: wrapped labels
    else if (this.props.wrapXAxisLables) {
      const words: string[] = [];
      this._tickValues.forEach((val: string) => {
        words.push(...val.toString().split(/\s+/));
      });

      const longestLabelWidth = calculateLongestLabelWidth(words, `.${this._classNames.xAxis} text`);
      labelWidth += Math.max(Math.ceil(longestLabelWidth), 10);
    }
    // Default case
    else {
      const longestLabelWidth = calculateLongestLabelWidth(this._tickValues, `.${this._classNames.xAxis} text`);
      labelWidth += Math.ceil(longestLabelWidth);
    }

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
}
