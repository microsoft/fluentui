import * as React from 'react';
import { classNamesFunction, find, getId } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import {
  IAccessibilityProps,
  IChartProps,
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles,
  IChartDataPoint,
  IRefArrayData,
} from './index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { ChartHoverCard, convertToLocaleString, getAccessibleDataObject } from '../../utilities/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { TooltipHost, TooltipOverflowMode } from '@fluentui/react';

const getClassNames = classNamesFunction<IHorizontalBarChartStyleProps, IHorizontalBarChartStyles>();

export interface IHorizontalBarChartState {
  isCalloutVisible: boolean;
  refSelected: SVGGElement | null | undefined;
  color: string;
  hoverValue: string | number | Date | null;
  lineColor: string;
  legend: string | null;
  xCalloutValue?: string;
  yCalloutValue?: string;
  barCalloutProps?: IChartDataPoint;
  callOutAccessibilityData?: IAccessibilityProps;
}

export class HorizontalBarChartBase extends React.Component<IHorizontalBarChartProps, IHorizontalBarChartState> {
  private _barHeight: number;
  private _classNames: IProcessedStyleSet<IHorizontalBarChartStyles>;
  private _uniqLineText: string;
  private _calloutId: string;
  private _refArray: IRefArrayData[];
  private _calloutAnchorPoint: IChartDataPoint | null;

  constructor(props: IHorizontalBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      hoverValue: '',
      lineColor: '',
      legend: '',
      refSelected: null,
      // eslint-disable-next-line react/no-unused-state
      color: '',
      xCalloutValue: '',
      yCalloutValue: '',
    };
    this._refArray = [];
    this._uniqLineText = '_HorizontalLine_' + Math.random().toString(36).substring(7);
    this._hoverOff = this._hoverOff.bind(this);
    this._calloutId = getId('callout');
  }

  public render(): JSX.Element {
    const { data, theme } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    let datapoint: number | undefined = 0;
    return (
      <div className={this._classNames.root} onMouseLeave={this._handleChartMouseLeave}>
        {data!.map((points: IChartProps, index: number) => {
          if (points.chartData && points.chartData![0] && points.chartData![0].horizontalBarChartdata!.x) {
            datapoint = points.chartData![0].horizontalBarChartdata!.x;
          } else {
            datapoint = 0;
          }
          points.chartData![1] = {
            legend: '',
            horizontalBarChartdata: {
              x: points.chartData![0].horizontalBarChartdata!.y - datapoint!,
              y: points.chartData![0].horizontalBarChartdata!.y,
            },
            color: palette.neutralTertiaryAlt,
          };

          const chartDataText = this._getChartDataText(points!);
          const bars = this._createBars(points!, palette);
          const keyVal = this._uniqLineText + '_' + index;

          return (
            <div key={index} className={this._classNames.items}>
              <div className={this._classNames.items}>
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <div className={this._classNames.chartTitle}>
                    {points!.chartTitle && (
                      <TooltipHost
                        overflowMode={TooltipOverflowMode.Self}
                        hostClassName={this._classNames.chartTitleLeft}
                        content={points!.chartTitle}
                      >
                        <span {...getAccessibleDataObject(points!.chartTitleAccessibilityData)}>
                          {points!.chartTitle}
                        </span>
                      </TooltipHost>
                    )}
                    {chartDataText}
                  </div>
                </FocusZone>
                {points!.chartData![0].data && this._createBenchmark(points!)}
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <svg className={this._classNames.chart} aria-label={points!.chartTitle}>
                    <g
                      id={keyVal}
                      key={keyVal}
                      ref={(e: SVGGElement) => {
                        this._refCallback(e, points!.chartData![0].legend);
                      }}
                      // NOTE: points.chartData![0] contains current data value
                      onClick={() => {
                        const p = points!.chartData![0];
                        if (p && p.onClick) {
                          p.onClick();
                        }
                      }}
                      className={this._classNames.barWrapper}
                    >
                      {bars}
                    </g>
                  </svg>
                </FocusZone>
              </div>
            </div>
          );
        })}
        <Callout
          target={this.state.refSelected}
          coverTarget={true}
          isBeakVisible={false}
          gapSpace={30}
          hidden={!(!this.props.hideTooltip && this.state.isCalloutVisible)}
          directionalHint={DirectionalHint.topAutoEdge}
          id={this._calloutId}
          onDismiss={this._closeCallout}
          preventDismissOnLostFocus={true}
          {...this.props.calloutProps!}
          {...getAccessibleDataObject(this.state.callOutAccessibilityData)}
        >
          <>
            {this.props.onRenderCalloutPerHorizontalBar ? (
              this.props.onRenderCalloutPerHorizontalBar(this.state.barCalloutProps)
            ) : (
              <ChartHoverCard
                Legend={this.state.xCalloutValue ? this.state.xCalloutValue : this.state.legend!}
                YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.hoverValue!}
                color={this.state.lineColor}
                culture={this.props.culture}
              />
            )}
          </>
        </Callout>
      </div>
    );
  }

  private _refCallback(element: SVGGElement, legendTitle: string | undefined): void {
    this._refArray.push({ index: legendTitle, refElement: element });
  }

  private _hoverOn(hoverValue: string | number | Date | null, point: IChartDataPoint): void {
    if ((!this.state.isCalloutVisible || this.state.legend !== point.legend!) && this._calloutAnchorPoint !== point) {
      const currentHoveredElement = find(
        this._refArray,
        (currentElement: IRefArrayData) => currentElement.index === point.legend,
      );
      this._calloutAnchorPoint = point;
      this.setState({
        isCalloutVisible: true,
        hoverValue: hoverValue,
        lineColor: point.color!,
        legend: point.legend!,
        refSelected: currentHoveredElement!.refElement,
        xCalloutValue: point.xAxisCalloutData!,
        yCalloutValue: point.yAxisCalloutData!,
        barCalloutProps: point,
        callOutAccessibilityData: point.callOutAccessibilityData,
      });
    }
  }

  private _hoverOff(): void {
    /**/
  }

  private _handleChartMouseLeave = () => {
    this._calloutAnchorPoint = null;
    if (this.state.isCalloutVisible) {
      this.setState({
        isCalloutVisible: false,
        hoverValue: '',
        refSelected: null,
        lineColor: '',
        legend: '',
      });
    }
  };

  private _adjustProps = (): void => {
    this._barHeight = this.props.barHeight || 8;
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      width: this.props.width,
      className: this.props.className,
      barHeight: this._barHeight,
      color: this.state.lineColor,
    });
  };

  private _getChartDataText = (data: IChartProps) => {
    return this.props.barChartCustomData ? (
      <div data-is-focusable={true} role="text">
        {this.props.barChartCustomData(data)}
      </div>
    ) : (
      this._getDefaultTextData(data)
    );
  };

  private _getDefaultTextData(data: IChartProps): JSX.Element {
    const { culture } = this.props;
    const chartDataMode = this.props.chartDataMode || 'default';
    const chartData: IChartDataPoint = data!.chartData![0];
    const x = chartData.horizontalBarChartdata!.x;
    const y = chartData.horizontalBarChartdata!.y;

    const accessibilityData = getAccessibleDataObject(data.chartDataAccessibilityData!);
    switch (chartDataMode) {
      case 'default':
        return (
          <div className={this._classNames.chartTitleRight} {...accessibilityData}>
            {convertToLocaleString(x, culture)}
          </div>
        );
      case 'fraction':
        return (
          <div {...accessibilityData}>
            <span className={this._classNames.chartTitleRight}>{convertToLocaleString(x, culture)}</span>
            <span className={this._classNames.chartDataTextDenominator}>{'/' + convertToLocaleString(y, culture)}</span>
          </div>
        );
      case 'percentage':
        const dataRatioPercentage = `${convertToLocaleString(Math.round((x / y) * 100), culture)}%`;
        return (
          <div className={this._classNames.chartTitleRight} {...accessibilityData}>
            {dataRatioPercentage}
          </div>
        );
    }
  }

  private _createBenchmark(data: IChartProps): JSX.Element {
    const totalData = data.chartData![0].horizontalBarChartdata!.y;
    const benchmarkData = data.chartData![0].data;
    const benchmarkRatio = Math.round(((benchmarkData ? benchmarkData : 0) / totalData) * 100);

    const benchmarkStyles = {
      marginLeft: 'calc(' + benchmarkRatio + '% - 4px)',
      marginRight: 'calc(' + (100 - benchmarkRatio) + '% - 4px)',
    };

    return <div className={this._classNames.triangle} style={benchmarkStyles} />;
  }

  private _createBars(data: IChartProps, palette: IPalette): JSX.Element[] {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const total = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) =>
        acc + (point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0),
      0,
    );
    let prevPosition = 0;
    let value = 0;

    let sumOfPercent = 0;
    data.chartData!.map((point: IChartDataPoint, index: number) => {
      const pointData = point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0;
      value = (pointData / total) * 100;
      if (value < 0) {
        value = 0;
      } else if (value < 1 && value !== 0) {
        value = 1;
      }
      sumOfPercent += value;

      return sumOfPercent;
    });

    const scalingRatio = sumOfPercent !== 0 ? sumOfPercent / 100 : 1;

    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0;
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100;
      if (value < 0) {
        value = 0;
      } else if (value < 1 && value !== 0) {
        value = 1 / scalingRatio;
      } else {
        value = value / scalingRatio;
      }
      startingPoint.push(prevPosition);

      const xValue = point.horizontalBarChartdata!.x;
      return (
        <rect
          key={index}
          x={startingPoint[index] + '%'}
          y={0}
          data-is-focusable={point.legend !== '' ? true : false}
          width={value + '%'}
          height={this._barHeight}
          fill={color}
          onMouseOver={point.legend !== '' ? this._hoverOn.bind(this, xValue, point) : undefined}
          onFocus={point.legend !== '' ? this._hoverOn.bind(this, xValue, point) : undefined}
          aria-labelledby={this._calloutId}
          role="img"
          aria-label="Horizontal bar chart"
          onBlur={this._hoverOff}
          onMouseLeave={this._hoverOff}
        />
      );
    });
    return bars;
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };
}
