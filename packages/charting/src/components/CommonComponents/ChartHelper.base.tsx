import * as React from 'react';
import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { IChartHelperStyles, IChartHelperStyleProps, IChartHelperProps, IYValueHover } from './ChartHelper.types';

import {
  createNumericXAxis,
  createDateXAxis,
  createYAxis,
  fitContainer,
  IMargins,
  IXAxisParams,
  IYAxisParams,
  additionalMarginRight,
} from '../../utilities/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

const getClassNames = classNamesFunction<IChartHelperStyleProps, IChartHelperStyles>();
export interface IContainerValues {
  width: number;
  height: number;
  shouldResize: boolean;
  reqID: number;
}
export interface IWrapperState {
  containerWidth: number;
  containerHeight: number;
  _width: number;
  _height: number;
}

export class ChartHelperBaseComponent extends React.Component<IChartHelperProps, IWrapperState> {
  private _classNames: IProcessedStyleSet<IChartHelperStyles>;
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  private containerParams: IContainerValues;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  private margins: IMargins;
  private idForGraph: string;
  private _isRtl: boolean = getRTL();

  constructor(props: IChartHelperProps) {
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
    cancelAnimationFrame(this.containerParams.reqID);
  }

  public componentDidUpdate(prevProps: IChartHelperProps): void {
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
    }
  }

  public render(): JSX.Element {
    const { theme, className, styles, points, maxOfYVal, calloutProps, yAxisTickFormat } = this.props;
    if (this.props.parentRef) {
      this._fitParentContainer();
    }
    const XAxisParams = {
      margins: this.margins,
      containerWidth: this.state.containerWidth,
      xAxisElement: this.xAxisElement!,
      showRoundOffXTickValues: true,
      points: points,
    };

    const YAxisParams = {
      margins: this.margins,
      containerWidth: this.state.containerWidth,
      containerHeight: this.state.containerHeight,
      yAxisElement: this.yAxisElement,
      yAxisTickFormat: yAxisTickFormat!,
      yAxisTickCount: this.props.yAxisTickCount!,
      yMinValue: this.props.yMinValue!,
      yMaxValue: this.props.yMaxValue!,
      finalYMaxVal: maxOfYVal,
      finalYMinVal: 0,
      tickPadding: 10,
      showYAxisGridLines: true,
      points,
    };

    this._getData(XAxisParams, YAxisParams);

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      className,
      isRtl: this._isRtl,
    });
    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };
    const children = this.props.children({
      ...this.state,
      xScale: this.props.isXAxisDateType
        ? createDateXAxis(XAxisParams, this.props.tickParams!, this._isRtl)
        : createNumericXAxis(XAxisParams, this._isRtl),
      yScale: createYAxis(YAxisParams, this._isRtl),
    });
    const yValueHoverSubCountsExists: boolean = this._yValueHoverSubCountsExists(calloutProps.YValueHover);
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
              id="xAxisGElement"
              transform={`translate(0, ${svgDimensions.height - 35})`}
              className={this._classNames.xAxis}
            />
            <g
              ref={(e: SVGElement | null) => {
                this.yAxisElement = e;
              }}
              id="yAxisGElement"
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
        {!this.props.hideTooltip && calloutProps!.isCalloutVisible && (
          <Callout {...calloutProps}>
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
          </Callout>
        )}
      </div>
    );
  }

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
              {xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y}
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
    const reqParams = {
      containerWidth: this.state.containerWidth,
      containerHeight: this.state.containerHeight,
      hideLegend: this.props.hideLegend!,
      legendContainer: this.legendContainer,
      container: this.props.parentRef ? this.props.parentRef : this.chartContainer,
    };
    this.containerParams = fitContainer(reqParams);
    if (this.containerParams.shouldResize) {
      this.setState({
        containerWidth: this.containerParams.width,
        containerHeight: this.containerParams.height,
      });
    }
  }

  private _getData = (XAxisParams: IXAxisParams, YAxisParams: IYAxisParams) => {
    const axis = this.props.isXAxisDateType
      ? createDateXAxis(XAxisParams, this.props.tickParams!, this._isRtl)
      : createNumericXAxis(XAxisParams, this._isRtl);
    this.props.getGraphData &&
      this.props.getGraphData(
        axis,
        createYAxis(YAxisParams, this._isRtl),
        this.state.containerHeight,
        this.state.containerWidth,
      );
  };
}
