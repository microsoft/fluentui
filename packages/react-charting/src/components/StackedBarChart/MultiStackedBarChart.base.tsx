import * as React from 'react';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { ILegend, Legends } from '../Legends/index';
import {
  IAccessibilityProps,
  IChartDataPoint,
  IChartProps,
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyles,
  IMultiStackedBarChartStyleProps,
  MultiStackedBarChartVariant,
} from './index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { convertToLocaleString } from '../../utilities/locale-util';
import { ChartHoverCard, formatValueWithSIPrefix, getAccessibleDataObject } from '../../utilities/index';
import { FocusableTooltipText } from '../../utilities/FocusableTooltipText';

const getClassNames = classNamesFunction<IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles>();

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export interface IMultiStackedBarChartState {
  isCalloutVisible: boolean;
  refArray: IRefArrayData[];
  selectedLegend: string;
  activeLegend: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected: any;
  dataForHoverCard: number;
  color: string;
  xCalloutValue?: string;
  yCalloutValue?: string;
  dataPointCalloutProps?: IChartDataPoint;
  callOutAccessibilityData?: IAccessibilityProps;
  calloutLegend: string;
  barSpacingInPercent: number;
}

export class MultiStackedBarChartBase extends React.Component<IMultiStackedBarChartProps, IMultiStackedBarChartState> {
  public static defaultProps: Partial<IMultiStackedBarChartProps> = {
    barHeight: 12,
    hideRatio: [],
    hideDenominator: [],
  };

  private _classNames: IProcessedStyleSet<IMultiStackedBarChartStyles>;
  private _calloutId: string;
  private _calloutAnchorPoint: IChartDataPoint | null;
  private _longestBarTotalValue: number;
  private _isRTL: boolean = getRTL();
  private barChartSvgRef: React.RefObject<SVGSVGElement>;
  private _emptyChartId: string;
  private _barId: string;
  private _barIdPlaceholderPartToWhole: string;
  private _barIdEmpty: string;

  public constructor(props: IMultiStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      refArray: [],
      selectedLegend: '',
      activeLegend: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: '',
      xCalloutValue: '',
      yCalloutValue: '',
      calloutLegend: '',
      barSpacingInPercent: 0,
    };
    this._onLeave = this._onLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
    this.barChartSvgRef = React.createRef<SVGSVGElement>();
    this._emptyChartId = getId('_MSBC_empty');
    this._barId = getId('_MSBC_rect_');
    this._barIdPlaceholderPartToWhole = getId('_MSBC_rect_partToWhole_');
    this._barIdEmpty = getId('_MSBC_rect_empty');
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
    if (!this._isChartEmpty()) {
      const { data, theme, culture } = this.props;
      this._adjustProps();
      const { palette } = theme!;
      const legends = this._getLegendData(data!, this.props.hideRatio!, palette);
      const { isCalloutVisible } = this.state;

      this._classNames = getClassNames(this.props.styles!, {
        legendColor: this.state.color,
        theme: theme!,
        variant: this.props.variant,
        hideLabels: this.props.hideLabels,
      });

      const legendName = this.state.xCalloutValue ? this.state.xCalloutValue : this.state.calloutLegend;
      const calloutYVal = this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard;

      this._longestBarTotalValue = this._computeLongestBarTotalValue();
      const bars: JSX.Element[] = data!.map((singleChartData: IChartProps, index: number) => {
        const singleChartBars = this._createBarsAndLegends(
          singleChartData!,
          this.props.barHeight!,
          palette,
          this.props.hideRatio![index],
          this.props.hideDenominator![index],
          this.props.href,
          index,
        );
        return (
          <div key={index} id={`_MSBC_bar-${index}`}>
            {singleChartBars}
          </div>
        );
      });

      return (
        <div className={this._classNames.root} onMouseLeave={this._handleChartMouseLeave}>
          {bars}
          {!this.props.hideLegend && <div className={this._classNames.legendContainer}>{legends}</div>}
          <Callout
            gapSpace={15}
            isBeakVisible={false}
            target={this.state.refSelected}
            setInitialFocus={true}
            hidden={!(!this.props.hideTooltip && isCalloutVisible)}
            directionalHint={DirectionalHint.topAutoEdge}
            id={this._calloutId}
            onDismiss={this._closeCallout}
            preventDismissOnLostFocus={true}
            /** Keep the callout updated with details of focused/hovered bar */
            shouldUpdateWhenHidden={true}
            {...this.props.calloutProps!}
            {...getAccessibleDataObject(this.state.callOutAccessibilityData, 'text', false)}
          >
            <>
              {this.props.onRenderCalloutPerDataPoint ? (
                this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
              ) : (
                <ChartHoverCard Legend={legendName} YValue={calloutYVal} color={this.state.color} culture={culture} />
              )}
            </>
          </Callout>
        </div>
      );
    }
    return (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  /**
   * The Create bar functions returns an array of <rect> elements, which form the bars
   * For each bar an x value, and a width needs to be specified
   * The computations are done based on percentages
   * Extra margin is also provided, in the x value to provide some spacing
   */

  private _createBarsAndLegends(
    data: IChartProps,
    barHeight: number,
    palette: IPalette,
    hideRatio: boolean,
    hideDenominator: boolean,
    href?: string,
    barNo?: number,
  ): JSX.Element {
    const noOfBars =
      data.chartData?.reduce((count: number, point: IChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
      1;
    const totalMarginPercent = this.state.barSpacingInPercent * (noOfBars - 1);
    const { culture } = this.props;
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const barTotalValue = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) => acc + (point.data ? point.data : 0),
      0,
    );
    const total =
      this.props.variant === MultiStackedBarChartVariant.AbsoluteScale ? this._longestBarTotalValue : barTotalValue;

    let sumOfPercent = 0;
    data.chartData!.map((point: IChartDataPoint, index: number) => {
      const pointData = point.data ? point.data : 0;
      const currValue = (pointData / total) * 100;
      let value = currValue ? currValue : 0;

      if (value < 1 && value !== 0) {
        value = 1;
      } else if (value > 99 && value !== 100) {
        value = 99;
      }
      sumOfPercent += value;

      return sumOfPercent;
    });

    // Include an imaginary placeholder bar with value equal to
    // the difference between longestBarTotalValue and barTotalValue
    // while calculating sumOfPercent to get correct scalingRatio for absolute-scale variant
    if (this.props.variant === MultiStackedBarChartVariant.AbsoluteScale) {
      let value = total === 0 ? 0 : ((total - barTotalValue) / total) * 100;
      if (value < 1 && value !== 0) {
        value = 1;
      } else if (value > 99 && value !== 100) {
        value = 99;
      }
      sumOfPercent += value;
    }

    /**
     * The %age of the space occupied by the margin needs to subtracted
     * while computing the scaling ratio, since the margins are not being
     * scaled down, only the data is being scaled down from a higher percentage to lower percentage
     * Eg: 95% of the space is taken by the bars, 5% by the margins
     * Now if the sumOfPercent is 120% -> This needs to be scaled down to 95%, not 100%
     * since that's only space available to the bars
     */

    const scalingRatio = sumOfPercent !== 0 ? sumOfPercent / (100 - totalMarginPercent) : 1;

    let prevPosition = 0;
    let value = 0;

    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color
        ? point.color
        : point.placeHolder
        ? palette.neutralLight
        : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.data ? point.data : 0;
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100 ? (pointData / total) * 100 : 0;
      if (value < 1 && value !== 0) {
        value = 1 / scalingRatio;
      } else if (value > 99 && value !== 100) {
        value = 99 / scalingRatio;
      } else {
        value = value / scalingRatio;
      }

      startingPoint.push(prevPosition);

      const styles = this.props.styles;
      const shouldHighlight = this._legendHighlighted(point.legend!) || this._noLegendHighlighted() ? true : false;
      const hoverCardYColor = point.placeHolder ? this.props.theme!.semanticColors.bodyText : color;

      this._classNames = getClassNames(styles!, {
        theme: this.props.theme!,
        shouldHighlight,
        href,
        variant: this.props.variant,
        hideLabels: this.props.hideLabels,
      });
      return (
        <g
          key={index}
          className={point.placeHolder ? this._classNames.placeHolderOnHover : this._classNames.opacityChangeOnHover}
          ref={(e: SVGGElement) => {
            this._refCallback(e, point.legend!);
          }}
          data-is-focusable={!this.props.hideTooltip && shouldHighlight}
          onFocus={this._onBarFocus.bind(this, pointData, hoverCardYColor, point)}
          onBlur={this._onBarLeave}
          role="img"
          aria-label={this._getAriaLabel(point)}
          onMouseOver={this._onBarHover.bind(this, pointData, hoverCardYColor, point)}
          onMouseMove={this._onBarHover.bind(this, pointData, hoverCardYColor, point)}
          onMouseLeave={this._onBarLeave}
          onClick={href ? (point.placeHolder ? undefined : this._redirectToUrl.bind(this, href)) : point.onClick}
        >
          <rect
            key={index}
            id={`${this._barId}-${barNo}-${index}`}
            x={`${
              this._isRTL
                ? 100 - startingPoint[index] - value - this.state.barSpacingInPercent * index
                : startingPoint[index] + this.state.barSpacingInPercent * index
            }%`}
            y={0}
            width={value + '%'}
            height={barHeight}
            fill={color}
          />
        </g>
      );
    });
    if (this.props.variant === MultiStackedBarChartVariant.AbsoluteScale && !this.props.hideLabels) {
      let showLabel = false;
      let barLabel = 0;
      if (this._noLegendHighlighted()) {
        showLabel = true;
        barLabel = barTotalValue;
      } else {
        data.chartData?.forEach(point => {
          if (this._legendHighlighted(point.legend!)) {
            showLabel = true;
            barLabel += point.data ? point.data : 0;
          }
        });
      }
      if (showLabel) {
        bars.push(
          <text
            key="text"
            x={`${
              this._isRTL
                ? 100 - (startingPoint[startingPoint.length - 1] || 0) - value - totalMarginPercent
                : (startingPoint[startingPoint.length - 1] || 0) + value + totalMarginPercent
            }%`}
            textAnchor={'start'}
            y={barHeight / 2}
            dominantBaseline="central"
            transform={`translate(${this._isRTL ? -4 : 4})`}
            className={this._classNames.barLabel}
            aria-label={`Total: ${barLabel}`}
            role="img"
          >
            {formatValueWithSIPrefix(barLabel)}
          </text>,
        );
      }
    } else {
      // Render placeholder bars only for part-to-whole variant
      if (data.chartData!.length === 0) {
        bars.push(
          <g key={0} className={this._classNames.noData} onClick={this._redirectToUrl.bind(this, href)}>
            <rect
              key={0}
              id={this._barIdPlaceholderPartToWhole}
              x={'0%'}
              y={0}
              width={'100%'}
              height={barHeight}
              fill={palette.neutralLight}
            />
          </g>,
        );
      }
      if (barTotalValue === 0) {
        bars.push(
          <g key={'empty'} className={this._classNames.noData} onClick={this._redirectToUrl.bind(this, href)}>
            <rect
              key={0}
              id={this._barIdEmpty}
              x={'0%'}
              y={0}
              width={'100%'}
              height={barHeight}
              fill={palette.neutralLight}
            />
          </g>,
        );
      }
    }
    const hideNumber = hideRatio === undefined ? false : hideRatio;

    // Hide right side text of chart title for absolute-scale variant
    const showRatio =
      this.props.variant !== MultiStackedBarChartVariant.AbsoluteScale && !hideNumber && data!.chartData!.length === 2;
    const showNumber =
      this.props.variant !== MultiStackedBarChartVariant.AbsoluteScale && !hideNumber && data!.chartData!.length === 1;

    const getChartData = () => convertToLocaleString(data!.chartData![0].data ? data!.chartData![0].data : 0, culture);
    return (
      <div className={this._classNames.singleChartRoot}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div className={this._classNames.chartTitle}>
            {data!.chartTitle && (
              <FocusableTooltipText
                className={this._classNames.chartTitleLeft}
                content={data!.chartTitle}
                accessibilityData={data!.chartTitleAccessibilityData}
              />
            )}
            {showRatio && (
              <div {...getAccessibleDataObject(data!.chartDataAccessibilityData, 'text', false)}>
                <span className={this._classNames.ratioNumerator}>{getChartData()}</span>
                {!hideDenominator && (
                  <span className={this._classNames.ratioDenominator}>
                    {' / ' + convertToLocaleString(barTotalValue, culture)}
                  </span>
                )}
              </div>
            )}
            {showNumber && (
              <div
                className={this._classNames.ratioNumerator}
                {...getAccessibleDataObject(data!.chartDataAccessibilityData, 'text', false)}
              >
                {getChartData()}
              </div>
            )}
          </div>
        </FocusZone>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div className={this._classNames.chartWrapper}>
            <svg ref={this.barChartSvgRef} className={this._classNames.chart} aria-label={data?.chartTitle}>
              {bars}
            </svg>
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onBarFocus(pointData: number, color: string, point: IChartDataPoint): void {
    this.state.refArray.forEach((obj: IRefArrayData) => {
      if (obj.legendText === point.legend!) {
        this.setState({
          refSelected: obj.refElement,
          /** Show the callout if highlighted bar is focused and Hide it if unhighlighted bar is focused */
          isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === point.legend!,
          calloutLegend: point.legend!,
          dataForHoverCard: pointData,
          color,
          xCalloutValue: point.xAxisCalloutData!,
          yCalloutValue: point.yAxisCalloutData!,
          dataPointCalloutProps: point,
          callOutAccessibilityData: point.callOutAccessibilityData!,
        });
      }
    });
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this.state.refArray.push({ legendText: legendTitle, refElement: element });
  }

  private _adjustProps = (): void => {
    const { theme, className, styles, width, barHeight } = this.props;
    this._classNames = getClassNames(styles!, {
      legendColor: this.state.color,
      theme: theme!,
      width,
      className,
      barHeight,
    });
  };

  private _onHover(legendTitle: string): void {
    this.setState({
      activeLegend: legendTitle,
    });
  }

  private _getLegendData = (data: IChartProps[], hideRatio: boolean[], palette: IPalette): JSX.Element => {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];
    data.forEach((singleChartData: IChartProps, index: number) => {
      const validChartData = singleChartData.chartData!.filter((_: IChartDataPoint) => !_.placeHolder);
      if (validChartData!.length < 3) {
        const hideNumber = hideRatio[index] === undefined ? false : hideRatio[index];
        if (hideNumber) {
          validChartData!.forEach((point: IChartDataPoint) => {
            const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
            const checkSimilarLegends = actions.filter(
              (leg: ILegend) => leg.title === point.legend! && leg.color === color,
            );
            if (checkSimilarLegends!.length > 0) {
              return;
            }
            const legend: ILegend = {
              title: point.legend!,
              color,
              action: () => {
                this._onClick(point.legend!);
              },
              hoverAction: () => {
                this._handleChartMouseLeave();
                this._onHover(point.legend!);
              },
              onMouseOutAction: () => {
                this._onLeave();
              },
            };
            actions.push(legend);
          });
        }
      } else {
        validChartData!.forEach((point: IChartDataPoint) => {
          const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
          const checkSimilarLegends = actions.filter(
            (leg: ILegend) => leg.title === point.legend! && leg.color === color,
          );
          if (checkSimilarLegends!.length > 0) {
            return;
          }
          const legend: ILegend = {
            title: point.legend!,
            color,
            action: () => {
              this._onClick(point.legend!);
            },
            hoverAction: () => {
              this._handleChartMouseLeave();
              this._onHover(point.legend!);
            },
            onMouseOutAction: () => {
              this._onLeave();
            },
          };
          actions.push(legend);
        });
      }
    });
    return (
      <Legends
        legends={actions}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
      />
    );
  };

  private _onClick(legendTitle: string): void {
    if (this.state.selectedLegend === legendTitle) {
      this.setState({
        selectedLegend: '',
      });
    } else {
      this.setState({
        selectedLegend: legendTitle,
      });
    }
  }

  private _onLeave(): void {
    this.setState({
      activeLegend: '',
    });
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
        isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === point.legend!,
        calloutLegend: point.legend!,
        dataForHoverCard: pointData,
        color,
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

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legendTitle: string) => {
    return (
      this.state.selectedLegend === legendTitle ||
      (this.state.selectedLegend === '' && this.state.activeLegend === legendTitle)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.activeLegend === '';
  };

  private _getAriaLabel = (point: IChartDataPoint): string => {
    const legend = point.xAxisCalloutData || point.legend;
    const yValue = point.yAxisCalloutData || point.data || 0;
    return (
      point.callOutAccessibilityData?.ariaLabel ||
      (legend ? `${legend}, ` : point.placeHolder ? 'Remaining, ' : '') + `${yValue}.`
    );
  };

  private _computeLongestBarTotalValue = () => {
    let longestBarTotalValue = 0;
    this.props.data!.forEach(({ chartData }) => {
      const barTotalValue = chartData!.reduce(
        (acc: number, point: IChartDataPoint) => acc + (point.data ? point.data : 0),
        0,
      );
      longestBarTotalValue = Math.max(longestBarTotalValue, barTotalValue);
    });
    return longestBarTotalValue;
  };

  private _isChartEmpty(): boolean {
    return !(
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.data.filter(
        item => item.chartData && item.chartData.length === 0 && (!item.chartTitle || item.chartTitle === ''),
      ).length === 0
    );
  }
}
