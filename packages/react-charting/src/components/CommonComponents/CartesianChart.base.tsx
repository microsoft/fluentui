import * as React from 'react';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { Callout } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  IModifiedCartesianChartProps,
  IYValueHover,
} from '../../index';
import {
  ChartHoverCard,
  convertToLocaleString,
  createNumericXAxis,
  createStringXAxis,
  IAxisData,
  getAccessibleDataObject,
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
} from '../../utilities/index';
import { LegendShape, Shape } from '../Legends/index';

const getClassNames = classNamesFunction<ICartesianChartStyleProps, ICartesianChartStyles>();

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
  private margins: IMargins;
  private idForGraph: string;
  private _reqID: number;
  private _isRtl: boolean = getRTL();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xScale: any;

  constructor(props: IModifiedCartesianChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      _removalValueForTextTuncate: 0,
      isRemoveValCalculated: true,
    };
    this.idForGraph = getId('chart_');
    /**
     * In RTL mode, Only graph will be rendered left/right. We need to provide left and right margins manually.
     * So that, in RTL, left margins becomes right margins and viceversa.
     * As graph needs to be drawn perfecty, these values consider as default values.
     * Same margins using for all other cartesian charts. Can be accessible through 'getMargins' call back method.
     */
    this.margins = {
      top: this.props.margins?.top ?? 20,
      bottom: this.props.margins?.bottom ?? 35,
      right: this._isRtl ? this.props.margins?.left ?? 40 : this.props.margins?.right ?? 20,
      left: this._isRtl ? this.props.margins?.right ?? 20 : this.props.margins?.left ?? 40,
    };
  }

  public componentDidMount(): void {
    this._fitParentContainer();
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
    // Callback for margins to the chart
    this.props.getmargins && this.props.getmargins(this.margins);

    const XAxisParams = {
      domainNRangeValues: getDomainNRangeValues(
        points,
        this.margins,
        this.state.containerWidth,
        chartType,
        this._isRtl,
        this.props.xAxisType,
        this.props.barwidth!,
        this.props.tickValues!,
      ),
      xAxisElement: this.xAxisElement!,
      showRoundOffXTickValues: true,
      xAxisCount: this.props.xAxisTickCount,
      xAxistickSize: this.props.xAxistickSize,
      tickPadding: this.props.tickPadding || this.props.showXAxisLablesTooltip ? 5 : 10,
      xAxisPadding: this.props.xAxisPadding,
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
      yMinMaxValues: getMinMaxOfYAxis(points, chartType),
      yAxisPadding: this.props.yAxisPadding,
    };

    /**
     * These scales used for 2 purposes.
     * 1. To create x and y axis
     * 2. To draw the graph.
     * For area/line chart using same scales. For other charts, creating their own scales to draw the graph.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let xScale: any;
    switch (this.props.xAxisType!) {
      case XAxisTypes.NumericAxis:
        xScale = createNumericXAxis(XAxisParams, culture);
        break;
      case XAxisTypes.DateAxis:
        xScale = createDateXAxis(
          XAxisParams,
          this.props.tickParams!,
          culture,
          dateLocalizeOptions,
          timeFormatLocale,
          customDateTimeFormatter,
        );
        break;
      case XAxisTypes.StringAxis:
        xScale = createStringXAxis(XAxisParams, this.props.tickParams!, this.props.datasetForXAxisDomain!, culture);
        break;
      default:
        xScale = createNumericXAxis(XAxisParams, culture);
    }
    this._xScale = xScale;

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
    const axisData: IAxisData = { yAxisDomainValues: [] };
    if (this.props.yAxisType && this.props.yAxisType === YAxisType.StringAxis) {
      yScale = createStringYAxis(YAxisParams, this.props.stringDatasetForYAxisDomain!, this._isRtl);
    } else {
      yScale = createYAxis(YAxisParams, this._isRtl, axisData);
    }
    this.props.getAxisData && this.props.getAxisData(axisData);
    // Callback function for chart, returns axis
    this._getData(xScale, yScale);

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

    const children = this.props.children({
      ...this.state,
      xScale,
      yScale,
    });

    let focusDirection;
    if (this.props.focusZoneDirection === FocusZoneDirection.vertical) {
      focusDirection = this.props.focusZoneDirection;
    } else if (this.props.focusZoneDirection) {
      focusDirection = this.props.focusZoneDirection;
    } else {
      focusDirection = FocusZoneDirection.horizontal;
    }
    return (
      <div
        id={this.idForGraph}
        className={this._classNames.root}
        role={'presentation'}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        onMouseLeave={this.props.onChartMouseLeave}
      >
        <FocusZone direction={focusDirection} {...svgFocusZoneProps}>
          <svg
            width={svgDimensions.width}
            height={svgDimensions.height}
            aria-label={this.props.chartTitle}
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
            <g
              ref={(e: SVGElement | null) => {
                this.yAxisElement = e;
              }}
              id={`yAxisGElement${this.idForGraph}`}
              transform={`translate(${
                this._isRtl ? svgDimensions.width - this.margins.right! : this.margins.left!
              }, 0)`}
              className={this._classNames.yAxis}
            />
            {children}
          </svg>
        </FocusZone>
        {!this.props.hideLegend && (
          <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
            {this.props.legendBars}
          </div>
        )}
        {/** The callout is used for narration, so keep it mounted on the DOM */}
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
      </div>
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
                  xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y || xValue.data,
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
        const currentContainerWidth = container.getBoundingClientRect().width;
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
      );
  };
}
