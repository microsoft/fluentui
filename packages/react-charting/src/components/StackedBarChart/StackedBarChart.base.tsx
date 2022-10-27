import * as React from 'react';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { ILegend, Legends } from '../Legends/index';
import { IAccessibilityProps, IChartDataPoint, IChartProps } from './index';
import { IRefArrayData, IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from '../../index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ChartHoverCard, convertToLocaleString, getAccessibleDataObject } from '../../utilities/index';
import { TooltipHost, TooltipOverflowMode } from '@fluentui/react';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();
export interface IStackedBarChartState {
  isCalloutVisible: boolean;
  selectedLegendTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected: any;
  dataForHoverCard: number;
  color: string;
  isLegendHovered: boolean;
  isLegendSelected: boolean;
  xCalloutValue?: string;
  yCalloutValue?: string;
  dataPointCalloutProps?: IChartDataPoint;
  callOutAccessibilityData?: IAccessibilityProps;
  calloutLegend: string;
}

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, IStackedBarChartState> {
  public static defaultProps: Partial<IStackedBarChartProps> = {
    barHeight: 16,
    hideNumberDisplay: false,
    hideLegend: false,
    ignoreFixStyle: false,
  };
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;
  private _calloutId: string;
  private _refArray: IRefArrayData[];
  private _calloutAnchorPoint: IChartDataPoint | null;

  public constructor(props: IStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      selectedLegendTitle: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: '',
      isLegendHovered: false,
      isLegendSelected: false,
      xCalloutValue: '',
      yCalloutValue: '',
      calloutLegend: '',
    };
    this._refArray = [];
    this._onLeave = this._onLeave.bind(this);
    this._refCallback = this._refCallback.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
  }

  public render(): JSX.Element {
    this._adjustProps();
    const { data, benchmarkData, targetData, hideNumberDisplay, ignoreFixStyle, culture } = this.props;
    const { palette } = this.props.theme!;
    const barHeight = ignoreFixStyle || data!.chartData!.length > 2 ? this.props.barHeight : 8;

    if (benchmarkData) {
      // benchmark color is used to render color for benchmark triangle and benchmark legend
      benchmarkData.color = benchmarkData.color || palette.neutralTertiary;
    }

    if (targetData) {
      // target color is used to render color for target triangle and target legend
      targetData.color = targetData.color || palette.neutralSecondary;
    }

    const bars = this._createBarsAndLegends(data!, barHeight!, palette, benchmarkData, targetData);

    const showRatio = hideNumberDisplay === false && !ignoreFixStyle && data!.chartData!.length === 2;
    const showNumber = hideNumberDisplay === false && !ignoreFixStyle && data!.chartData!.length === 1;
    const total = data!.chartData!.reduce(
      (acc: number, value: IChartDataPoint) => acc + (value.data ? value.data : 0),
      0,
    );

    let benchmarkRatio = 0;
    if (benchmarkData && total) {
      benchmarkRatio = (benchmarkData.data! / total) * 100;
    }
    let targetRatio = 0;
    if (targetData && total) {
      targetRatio = (targetData.data! / total) * 100;
    }

    const showLegend = this.props.hideLegend === false && (ignoreFixStyle || data!.chartData!.length > 2);
    this._classNames = getClassNames(this.props.styles!, {
      legendColor: this.state.color,
      theme: this.props.theme!,
      benchmarkColor: benchmarkData ? benchmarkData.color : '',
      benchmarkRatio,
      targetColor: targetData ? targetData.color : '',
      targetRatio,
    });
    const getChartData = () => convertToLocaleString(data!.chartData![0].data ? data!.chartData![0].data : 0, culture);
    return (
      <div className={this._classNames.root} onMouseLeave={this._handleChartMouseLeave}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div className={this._classNames.chartTitle}>
            {data!.chartTitle && (
              <TooltipHost
                overflowMode={TooltipOverflowMode.Self}
                hostClassName={this._classNames.chartTitleLeft}
                content={data!.chartTitle}
              >
                <span {...getAccessibleDataObject(data!.chartTitleAccessibilityData)}>{data!.chartTitle}</span>
              </TooltipHost>
            )}
            {showRatio && (
              <div {...getAccessibleDataObject(data!.chartDataAccessibilityData)}>
                <span className={this._classNames.ratioNumerator}>{getChartData()}</span>
                {!this.props.hideDenominator && (
                  <span>
                    /<span className={this._classNames.ratioDenominator}>{convertToLocaleString(total, culture)}</span>
                  </span>
                )}
              </div>
            )}
            {showNumber && (
              <div {...getAccessibleDataObject(data!.chartDataAccessibilityData)}>
                <strong>{getChartData()}</strong>
              </div>
            )}
          </div>
          {(benchmarkData || targetData) && (
            <div className={this._classNames.benchmarkContainer}>
              {benchmarkData && <div className={this._classNames.benchmark} role="text" />}
              {targetData && <div className={this._classNames.target} role="text" />}
            </div>
          )}
        </FocusZone>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <svg className={this._classNames.chart} aria-label={data?.chartTitle}>
              <g>{bars[0]}</g>
              <Callout
                gapSpace={15}
                isBeakVisible={false}
                target={this.state.refSelected}
                setInitialFocus={true}
                hidden={!(!this.props.hideTooltip && this.state.isCalloutVisible)}
                directionalHint={DirectionalHint.topAutoEdge}
                id={this._calloutId}
                onDismiss={this._closeCallout}
                preventDismissOnLostFocus={true}
                /** Keep the callout updated with details of focused/hovered bar */
                shouldUpdateWhenHidden={true}
                {...this.props.calloutProps}
                {...getAccessibleDataObject(this.state.callOutAccessibilityData, 'text', false)}
              >
                <>
                  {this.props.onRenderCalloutPerDataPoint ? (
                    this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
                  ) : (
                    <ChartHoverCard
                      Legend={this.state.xCalloutValue ? this.state.xCalloutValue : this.state.calloutLegend}
                      YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard}
                      color={this.state.color}
                      culture={culture}
                    />
                  )}
                </>
              </Callout>
            </svg>
          </div>
        </FocusZone>
        {showLegend && <div className={this._classNames.legendContainer}>{bars[1]}</div>}
      </div>
    );
  }

  private _adjustProps(): void {
    this._classNames = getClassNames(this.props.styles!, {
      legendColor: this.state.color,
      theme: this.props.theme!,
      width: this.props.width!,
      barHeight: this.props.barHeight!,
      className: this.props.className!,
    });
  }

  private _createBarsAndLegends(
    data: IChartProps,
    barHeight: number,
    palette: IPalette,
    benchmarkData?: IChartDataPoint,
    targetData?: IChartDataPoint,
  ): [JSX.Element[], JSX.Element] {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const legendDataItems: ILegend[] = [];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const total = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) => acc + (point.data ? point.data : 0),
      0,
    );
    let prevPosition = 0;
    let value = 0;

    let sumOfPercent = 0;
    data.chartData!.map((point: IChartDataPoint, index: number) => {
      const pointData = point.data ? point.data : 0;
      value = (pointData / total) * 100;
      if (value < 1 && value !== 0) {
        value = 1;
      } else if (value > 99 && value !== 100) {
        value = 99;
      }
      sumOfPercent += value;

      return sumOfPercent;
    });

    const scalingRatio = sumOfPercent !== 0 ? sumOfPercent / 100 : 1;

    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.data ? point.data : 0;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action:
          total > 0
            ? () => {
                this._onClick(point.legend!);
              }
            : undefined,
        hoverAction:
          total > 0
            ? () => {
                this._onHover(point.legend!);
              }
            : undefined,
        onMouseOutAction:
          total > 0
            ? (isLegendFocused?: boolean) => {
                this._onLeave(isLegendFocused);
              }
            : undefined,
      };
      if (!point.placeHolder) {
        legendDataItems.push(legend);
      }
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100;
      if (value < 1 && value !== 0) {
        value = 1 / scalingRatio;
      } else if (value > 99 && value !== 100) {
        value = 99 / scalingRatio;
      } else {
        value = value / scalingRatio;
      }
      startingPoint.push(prevPosition);
      const styles = this.props.styles;
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }
      this._classNames = getClassNames(styles!, {
        theme: this.props.theme!,
        shouldHighlight: shouldHighlight,
        href: this.props.href!,
      });

      return (
        <g
          key={index}
          className={this._classNames.opacityChangeOnHover}
          ref={(e: SVGGElement) => {
            this._refCallback(e, legend.title);
          }}
          data-is-focusable={!this.props.hideTooltip}
          onFocus={this._onBarFocus.bind(this, pointData, color, point)}
          onBlur={this._onBarLeave}
          aria-label="Stacked bar chart"
          role="img"
          aria-labelledby={this._calloutId}
          onMouseOver={this._onBarHover.bind(this, pointData, color, point)}
          onMouseMove={this._onBarHover.bind(this, pointData, color, point)}
          onMouseLeave={this._onBarLeave}
          pointerEvents="all"
          onClick={this.props.href ? this._redirectToUrl.bind(this, this.props.href!) : point.onClick}
        >
          <rect key={index} x={startingPoint[index] + '%'} y={0} width={value + '%'} height={barHeight} fill={color} />
        </g>
      );
    });

    // add benchmark legends
    this._addLegend(legendDataItems, benchmarkData);
    this._addLegend(legendDataItems, targetData);
    const legends = (
      <Legends
        legends={legendDataItems}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
      />
    );
    return [
      total === 0
        ? [
            this._generateEmptyBar(
              barHeight,
              this.props.barBackgroundColor ? this.props.barBackgroundColor : palette.neutralTertiary,
            ),
          ]
        : bars,
      legends,
    ];
  }

  private _onBarFocus(pointData: number, color: string, point: IChartDataPoint): void {
    this._refArray.forEach((obj: IRefArrayData) => {
      if (obj.index === point.legend!) {
        this.setState({
          refSelected: obj.refElement,
          /** Show the callout if highlighted bar is focused and Hide it if unhighlighted bar is focused */
          isCalloutVisible:
            this.state.isLegendSelected === false ||
            (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend!),
          calloutLegend: point.legend!,
          dataForHoverCard: pointData,
          color: color,
          xCalloutValue: point.xAxisCalloutData!,
          yCalloutValue: point.yAxisCalloutData!,
          dataPointCalloutProps: point,
          callOutAccessibilityData: point.callOutAccessibilityData!,
        });
      }
    });
  }

  private _addLegend(legendDataItems: ILegend[], data?: IChartDataPoint): void {
    if (data) {
      const legend: ILegend = {
        title: data.legend!,
        color: data.color!,
        shape: 'triangle',
      };
      legendDataItems.push(legend);
    }
  }

  private _generateEmptyBar(barHeight: number, color: string): JSX.Element {
    return (
      <g key={0} className={this._classNames.opacityChangeOnHover}>
        <rect key={0} x={'0%'} y={0} width={'100%'} height={barHeight} fill={color} />
      </g>
    );
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this._refArray.push({ index: legendTitle, refElement: element });
  }

  private _onClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.selectedLegendTitle === customMessage) {
        this.setState({
          isLegendSelected: false,
          selectedLegendTitle: customMessage,
          isLegendHovered: true,
        });
      } else {
        this.setState({
          selectedLegendTitle: customMessage,
        });
      }
    } else {
      this.setState({
        isLegendSelected: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        selectedLegendTitle: '',
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
    }
  }

  private _onBarHover(
    pointData: number,
    color: string,
    point: IChartDataPoint,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ): void {
    mouseEvent.persist();
    if (this._calloutAnchorPoint !== point) {
      this._calloutAnchorPoint = point;
      this.setState({
        refSelected: mouseEvent,
        /** Show the callout if highlighted bar is hovered and Hide it if unhighlighted bar is hovered */
        isCalloutVisible:
          this.state.isLegendSelected === false ||
          (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend!),
        calloutLegend: point.legend!,
        dataForHoverCard: pointData,
        color: color,
        xCalloutValue: point.xAxisCalloutData!,
        yCalloutValue: point.yAxisCalloutData!,
        dataPointCalloutProps: point,
        callOutAccessibilityData: point.callOutAccessibilityData!,
      });
    }
  }

  private _onBarLeave(): void {
    /**/
  }

  private _handleChartMouseLeave = () => {
    this._calloutAnchorPoint = null;
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };
}
