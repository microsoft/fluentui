import * as React from 'react';
import { classNamesFunction, find, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import {
  IAccessibilityProps,
  IChartProps,
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles,
  IChartDataPoint,
  IRefArrayData,
  HorizontalBarChartVariant,
} from './index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { convertToLocaleString } from '../../utilities/locale-util';
import { ChartHoverCard, formatValueWithSIPrefix, getAccessibleDataObject } from '../../utilities/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { FocusableTooltipText } from '../../utilities/FocusableTooltipText';

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
  barSpacingInPercent: number;
}

export class HorizontalBarChartBase extends React.Component<IHorizontalBarChartProps, IHorizontalBarChartState> {
  private _barHeight: number;
  private _classNames: IProcessedStyleSet<IHorizontalBarChartStyles>;
  private _uniqLineText: string;
  private _calloutId: string;
  private _refArray: IRefArrayData[];
  private _calloutAnchorPoint: IChartDataPoint | null;
  private _isRTL: boolean = getRTL();
  private barChartSvgRef: React.RefObject<SVGSVGElement>;
  private _emptyChartId: string;

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
      barSpacingInPercent: 0,
    };
    this._refArray = [];
    this._uniqLineText = '_HorizontalLine_' + Math.random().toString(36).substring(7);
    this._hoverOff = this._hoverOff.bind(this);
    this._calloutId = getId('callout');
    this._emptyChartId = getId('_HBC_empty');
    this.barChartSvgRef = React.createRef<SVGSVGElement>();
  }

  public componentDidMount(): void {
    const svgWidth = this.barChartSvgRef.current?.getBoundingClientRect().width || 0;
    const MARGIN_WIDTH_IN_PX = 3;
    if (svgWidth) {
      const currentBarSpacing = (MARGIN_WIDTH_IN_PX / svgWidth) * 100;
      this.setState({ barSpacingInPercent: currentBarSpacing });
    }
  }

  public render(): JSX.Element {
    const { data, theme } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    let datapoint: number | undefined = 0;
    return !this._isChartEmpty() ? (
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
            color: palette.neutralLight,
          };

          // Hide right side text of chart title for absolute-scale variant
          const chartDataText =
            this.props.variant === HorizontalBarChartVariant.AbsoluteScale ? null : this._getChartDataText(points!);
          const bars = this._createBars(points!, palette);
          const keyVal = this._uniqLineText + '_' + index;
          const classNames = getClassNames(this.props.styles!, {
            theme: this.props.theme!,
            width: this.props.width,
            showTriangle: !!points!.chartData![0].data,
            variant: this.props.variant,
          });

          return (
            <div key={index}>
              <div className={classNames.items}>
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <div className={this._classNames.chartTitle}>
                    {points!.chartTitle && (
                      <FocusableTooltipText
                        className={this._classNames.chartTitleLeft}
                        content={points!.chartTitle}
                        accessibilityData={points!.chartTitleAccessibilityData}
                      />
                    )}
                    {chartDataText}
                  </div>
                </FocusZone>
                {points!.chartData![0].data && this._createBenchmark(points!)}
                <FocusZone direction={FocusZoneDirection.horizontal} className={this._classNames.chartWrapper}>
                  <svg ref={this.barChartSvgRef} className={this._classNames.chart} aria-label={points!.chartTitle}>
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
    ) : (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
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
    this._barHeight = this.props.barHeight || 12;
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      width: this.props.width,
      className: this.props.className,
      barHeight: this._barHeight,
      color: this.state.lineColor,
      variant: this.props.variant,
      hideLabels: this.props.hideLabels,
    });
  };

  private _getChartDataText = (data: IChartProps) => {
    return this.props.barChartCustomData ? (
      <div role="text">{this.props.barChartCustomData(data)}</div>
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

    const accessibilityData = getAccessibleDataObject(data.chartDataAccessibilityData!, 'text', false);
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
            <span className={this._classNames.chartDataTextDenominator}>
              {' / ' + convertToLocaleString(y, culture)}
            </span>
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
      left: 'calc(' + benchmarkRatio + '% - 4px)',
    };

    return (
      <div className={this._classNames.benchmarkContainer}>
        <div className={this._classNames.triangle} style={benchmarkStyles} />
      </div>
    );
  }

  /**
   * This functions returns an array of <rect> elements, which form the bars
   * For each bar an x value, and a width needs to be specified
   * The computations are done based on percentages
   * Extra margin is also provided, in the x value to provide some spacing in between the bars
   */

  private _createBars(data: IChartProps, palette: IPalette): JSX.Element[] {
    const noOfBars =
      data.chartData?.reduce((count: number, point: IChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
      1;
    const totalMarginPercent = this.state.barSpacingInPercent * (noOfBars - 1);
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

    /**
     * The %age of the space occupied by the margin needs to subtracted
     * while computing the scaling ratio, since the margins are not being
     * scaled down, only the data is being scaled down from a higher percentage to lower percentage
     * Eg: 95% of the space is taken by the bars, 5% by the margins
     * Now if the sumOfPercent is 120% -> This needs to be scaled down to 95%, not 100%
     * since that's only space available to the bars
     */
    const scalingRatio = sumOfPercent !== 0 ? (sumOfPercent - totalMarginPercent) / 100 : 1;

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
      const placeholderIndex = 1;

      // Render bar label instead of placeholder bar for absolute-scale variant
      if (index === placeholderIndex && this.props.variant === HorizontalBarChartVariant.AbsoluteScale) {
        if (this.props.hideLabels) {
          return <text key={index} />;
        }

        const barValue = data.chartData![0].horizontalBarChartdata!.x;

        return (
          <text
            key={index}
            x={`${this._isRTL ? 100 - startingPoint[index] : startingPoint[index]}%`}
            y={this._barHeight / 2}
            dominantBaseline="central"
            transform={`translate(${this._isRTL ? -4 : 4})`}
            className={this._classNames.barLabel}
            aria-hidden={true}
          >
            {formatValueWithSIPrefix(barValue)}
          </text>
        );
      }

      return (
        <rect
          key={index}
          x={`${
            this._isRTL
              ? 100 - startingPoint[index] - value - index * this.state.barSpacingInPercent
              : startingPoint[index] + index * this.state.barSpacingInPercent
          }%`}
          y={0}
          data-is-focusable={point.legend !== '' ? true : false}
          width={value + '%'}
          height={this._barHeight}
          fill={color}
          onMouseOver={point.legend !== '' ? this._hoverOn.bind(this, xValue, point) : undefined}
          onFocus={point.legend !== '' ? this._hoverOn.bind(this, xValue, point) : undefined}
          role="img"
          aria-label={this._getAriaLabel(point)}
          onBlur={this._hoverOff}
          onMouseLeave={this._hoverOff}
          className={this._classNames.barWrapper}
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

  private _getAriaLabel = (point: IChartDataPoint): string => {
    const legend = point.xAxisCalloutData || point.legend;
    const benchMark = point.data;
    const yValue =
      point.yAxisCalloutData ||
      (point.horizontalBarChartdata ? `${point.horizontalBarChartdata.x}/${point.horizontalBarChartdata.y}` : 0);
    return (
      point.callOutAccessibilityData?.ariaLabel ||
      (legend ? `${legend}, ` : '') + `${yValue}.` + (benchMark ? 'with benchmark at ' + `${benchMark}, ` : '')
    );
  };

  private _isChartEmpty(): boolean {
    return !(this.props.data && this.props.data.length > 0);
  }
}
