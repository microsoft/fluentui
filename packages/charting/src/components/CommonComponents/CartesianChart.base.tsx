import * as React from 'react';
import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  IModifiedCartesianChartProps,
  IYValueHover,
} from '@uifabric/charting';
import {
  createNumericXAxis,
  createStringXAxis,
  getDomainNRangeValues,
  createDateXAxis,
  createYAxis,
  additionalMarginRight,
  IMargins,
  getMinMaxOfYAxis,
  XAxisTypes,
} from '../../utilities/index';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

const getClassNames = classNamesFunction<ICartesianChartStyleProps, ICartesianChartStyles>();

export interface ICartesianChartState {
  containerWidth: number;
  containerHeight: number;
  _width: number;
  _height: number;
}

/**
 * Cartesian chart used for
 * 1.draw X and Y axis of the chart
 * 2.Callout
 * 3.Fit parent Continer
 *
 * To draw the graph, we need Axis scales. For line chart and area chart, sending scales from here.
 * Vertical stacked bar chart creating it's own scales to draw the graph.
 *
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

  constructor(props: IModifiedCartesianChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      _width: this.props.width || 600,
      _height: this.props.height || 350,
    };
    this.idForGraph = getId('chart_');
    this.margins = {
      top: this.props.margins?.top || 20,
      right: this.props.margins?.right || 20,
      bottom: this.props.margins?.bottom || 35,
      left: this.props.margins?.left || 40,
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
  }

  public render(): JSX.Element {
    const { calloutProps, points, chartType } = this.props;
    if (this.props.parentRef) {
      this._fitParentContainer();
    }
    // Callback for margins to the chart
    this.props.getmargins && this.props.getmargins(this.margins);

    // TO DO: need to send xAxis types based on condition
    const XAxisParams = {
      domainNRangeValues: getDomainNRangeValues(
        points,
        this.margins,
        this.state.containerWidth,
        chartType,
        this._isRtl,
        this.props.xAxisType,
        this.props.barwidth!,
      ),
      xAxisElement: this.xAxisElement!,
      showRoundOffXTickValues: true,
    };

    const YAxisParams = {
      margins: this.margins,
      containerWidth: this.state.containerWidth,
      containerHeight: this.state.containerHeight,
      yAxisElement: this.yAxisElement,
      yAxisTickFormat: this.props.yAxisTickFormat!,
      yAxisTickCount: this.props.yAxisTickCount!,
      yMinValue: this.props.yMinValue || 0,
      yMaxValue: this.props.yMaxValue || 0,
      tickPadding: 10,
      maxOfYVal: this.props.maxOfYVal,
      yMinMaxValues: getMinMaxOfYAxis(points, chartType),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let xScale: any;
    switch (this.props.xAxisType!) {
      case XAxisTypes.NumericAxis:
        xScale = createNumericXAxis(XAxisParams, this._isRtl);
        break;
      case XAxisTypes.DateAxis:
        xScale = createDateXAxis(XAxisParams, this.props.tickParams!, this._isRtl);
        break;
      case XAxisTypes.StringAxis:
        xScale = createStringXAxis(XAxisParams, this.props.tickParams!, this._isRtl, points);
        break;
      default:
        xScale = createNumericXAxis(XAxisParams, this._isRtl);
    }

    const yScale = createYAxis(YAxisParams, this._isRtl);

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
    return (
      <div
        id={this.idForGraph}
        className={this._classNames.root}
        role={'presentation'}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <g
              ref={(e: SVGElement | null) => {
                this.xAxisElement = e;
              }}
              id={`xAxisGElement${this.idForGraph}`}
              transform={`translate(0, ${svgDimensions.height - 35})`}
              className={this._classNames.xAxis}
            />
            <g
              ref={(e: SVGElement | null) => {
                this.yAxisElement = e;
              }}
              id={`yAxisGElement${this.idForGraph}`}
              transform={`translate(${
                this._isRtl ? svgDimensions.width - this.margins.right! - additionalMarginRight : 40
              }, 0)`}
              className={this._classNames.yAxis}
            />
            {children}
          </svg>
        </FocusZone>
        <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
          {this.props.legendBars}
        </div>
        {/* {console.log(this.props.isCalloutForStack, this.props.customizedCallout, 'iiiiiiiiii')} */}
        {!this.props.hideTooltip && calloutProps!.isCalloutVisible && (
          <Callout {...calloutProps}>
            {/** Given callout will render. Other conditions will negligable  */}
            {this.props.customizedCallout!}
            {/** Stack callout - all y points will shown at individual x points. */}
            {!this.props.customizedCallout && this.props.isCalloutForStack && this._multiValueCallout(calloutProps)}
            {/** Default callout - single y point will display at individual x points */}
            {!this.props.customizedCallout && !this.props.isCalloutForStack && (
              <ChartHoverCard
                XValue={calloutProps.XValue}
                Legend={calloutProps.legend!}
                YValue={calloutProps.YValue!}
                color={calloutProps.color!}
              />
            )}
          </Callout>
        )}
      </div>
    );
  }

  // TO DO: Write a common funtional component for Multi value callout and divide sub count method
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _multiValueCallout = (calloutProps: any) => {
    const yValueHoverSubCountsExists: boolean = this._yValueHoverSubCountsExists(calloutProps.YValueHover);
    return (
      <div className={this._classNames.calloutContentRoot}>
        <div
          className={this._classNames.calloutDateTimeContainer}
          style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
        >
          <div className={this._classNames.calloutContentX}>{calloutProps!.hoverXValue} </div>
        </div>
        <div
          className={this._classNames.calloutInfoContainer}
          style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}
        >
          {calloutProps!.YValueHover &&
            calloutProps!.YValueHover.map((yValue: IYValueHover, index: number, yValues: IYValueHover[]) => {
              const isLast: boolean = index + 1 === yValues.length;
              return (
                <div
                  key={`callout-content-${index}`}
                  style={yValueHoverSubCountsExists ? { display: 'inline-block' } : {}}
                >
                  {this._getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                </div>
              );
            })}
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
    xValue: {
      legend?: string;
      y?: number;
      color?: string;
      yAxisCalloutData?: string | { [id: string]: number };
      data?: string | number;
    },
    index: number,
    yValueHoverSubCountsExists: boolean,
    isLast: boolean,
  ): React.ReactNode {
    const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };

    if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
      return (
        <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
          {yValueHoverSubCountsExists && (
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({xValue.y})
            </div>
          )}
          <div
            id={`${index}_${xValue.y}`}
            className={mergeStyles(this._classNames.calloutBlockContainer, {
              borderLeft: `4px solid ${xValue.color}`,
            })}
          >
            <div className={this._classNames.calloutlegendText}> {xValue.legend}</div>
            <div className={this._classNames.calloutContentY}>
              {xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y || xValue.data}
            </div>
          </div>
        </div>
      );
    } else {
      const subcounts: { [id: string]: number } = xValue.yAxisCalloutData as { [id: string]: number };
      return (
        <div style={marginStyle}>
          <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
            {xValue.legend!} ({xValue.y})
          </div>
          {Object.keys(subcounts).map((subcountName: string) => {
            return (
              <div
                key={subcountName}
                className={mergeStyles(this._classNames.calloutBlockContainer, {
                  borderLeft: `4px solid ${xValue.color}`,
                })}
              >
                <div className={this._classNames.calloutlegendText}> {subcountName}</div>
                <div className={this._classNames.calloutContentY}>{subcounts[subcountName]}</div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        (this.legendContainer.getBoundingClientRect().height || this.minLegendContainerHeight) +
        parseFloat(legendContainerComputedStyles.marginTop || '0') +
        parseFloat(legendContainerComputedStyles.marginBottom || '0');

      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - legendContainerHeight,
        });
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getData = (xScale: any, yScale: any) => {
    this.props.getGraphData &&
      this.props.getGraphData(xScale, yScale, this.state.containerHeight, this.state.containerWidth);
  };
}
