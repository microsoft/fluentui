import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { ILegend, Legends } from '../Legends/index';
import {
  IChartDataPoint,
  IChartProps,
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyles,
  IMultiStackedBarChartStyleProps,
} from './index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ChartHoverCard } from '../../utilities/index';

const getClassNames = classNamesFunction<IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles>();

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export interface IIndexData {
  lengthOfChartData?: number;
  indexValOfRect?: number;
}

export interface IMultiStackedBarChartState {
  isCalloutVisible: boolean;
  refArray: IRefArrayData[];
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
  lengthOfChartData: number;
  indexValOfRect: number;
}

export class MultiStackedBarChartBase extends React.Component<IMultiStackedBarChartProps, IMultiStackedBarChartState> {
  public static defaultProps: Partial<IMultiStackedBarChartProps> = {
    barHeight: 16,
    hideRatio: [],
    hideDenominator: [],
  };

  private _classNames: IProcessedStyleSet<IMultiStackedBarChartStyles>;
  private _calloutId: string;

  public constructor(props: IMultiStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      refArray: [],
      selectedLegendTitle: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: '',
      isLegendHovered: false,
      isLegendSelected: false,
      xCalloutValue: '',
      yCalloutValue: '',
      lengthOfChartData: 1,
      indexValOfRect: 1,
    };
    this._onLeave = this._onLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
  }

  public render(): JSX.Element {
    const { data, theme } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    const legends = this._getLegendData(data!, this.props.hideRatio!, palette);
    const { isCalloutVisible } = this.state;

    this._classNames = getClassNames(this.props.styles!, {
      legendColor: this.state.color,
      theme: theme!,
    });

    const legendName = this.state.xCalloutValue ? this.state.xCalloutValue : this.state.selectedLegendTitle;
    const calloutYVal = this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard;

    const bars: JSX.Element[] = data!.map((singleChartData: IChartProps, index: number) => {
      const singleChartBars = this._createBarsAndLegends(
        singleChartData!,
        this.props.barHeight!,
        palette,
        this.props.hideRatio![index],
        this.props.hideDenominator![index],
        this.props.href,
      );
      return <div key={index}>{singleChartBars}</div>;
    });

    const barSeriesLabel: string = `Bar series ${this.state.indexValOfRect} of ${this.state.lengthOfChartData}`;
    return (
      <div className={this._classNames.root}>
        {bars}
        {!this.props.hideLegend && <div className={this._classNames.legendContainer}>{legends}</div>}
        <Callout
          gapSpace={15}
          isBeakVisible={false}
          target={this.state.refSelected}
          setInitialFocus={true}
          hidden={!(!this.props.hideTooltip && isCalloutVisible)}
          directionalHint={DirectionalHint.topRightEdge}
          id={this._calloutId}
          onDismiss={this._closeCallout}
          {...this.props.calloutProps!}
        >
          <>
            <div className={this._classNames.visuallyHidden}>{barSeriesLabel}</div>
            {this.props.onRenderCalloutPerDataPoint ? (
              this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
            ) : (
              <ChartHoverCard Legend={legendName} YValue={calloutYVal} color={this.state.color} />
            )}
          </>
        </Callout>
      </div>
    );
  }

  private _createBarsAndLegends(
    data: IChartProps,
    barHeight: number,
    palette: IPalette,
    hideRatio: boolean,
    hideDenominator: boolean,
    href?: string,
  ): JSX.Element {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const total = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) => acc + (point.data ? point.data : 0),
      0,
    );

    let prevPosition = 0;
    let value = 0;

    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color
        ? point.color
        : point.placeHolder
        ? palette.neutralTertiaryAlt
        : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.data ? point.data : 0;
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100 ? (pointData / total) * 100 : 0;

      startingPoint.push(prevPosition);

      const styles = this.props.styles;
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }

      this._classNames = getClassNames(styles!, {
        theme: this.props.theme!,
        shouldHighlight: shouldHighlight,
        href: href,
      });

      const indexDetails: IIndexData = {
        indexValOfRect: index,
        lengthOfChartData: data.chartData!.length!,
      };
      return (
        <g
          key={index}
          className={point.placeHolder ? this._classNames.placeHolderOnHover : this._classNames.opacityChangeOnHover}
          ref={(e: SVGGElement) => {
            this._refCallback(e, point.legend!);
          }}
          data-is-focusable={!this.props.hideTooltip}
          onFocus={this._onBarFocus.bind(this, pointData, color, point, indexDetails)}
          onBlur={this._onBarLeave}
          aria-labelledby={this._calloutId}
          role="img"
          aria-label="Multi stacked bar chart"
          onMouseOver={
            point.placeHolder ? undefined : this._onBarHover.bind(this, pointData, color, point, indexDetails)
          }
          onMouseMove={
            point.placeHolder ? undefined : this._onBarHover.bind(this, pointData, color, point, indexDetails)
          }
          onMouseLeave={point.placeHolder ? undefined : this._onBarLeave}
          onClick={href ? (point.placeHolder ? undefined : this._redirectToUrl.bind(this, href)) : point.onClick}
        >
          <rect key={index} x={startingPoint[index] + '%'} y={0} width={value + '%'} height={barHeight} fill={color} />
        </g>
      );
    });
    if (data.chartData!.length === 0) {
      bars.push(
        <g key={0} className={this._classNames.noData} onClick={this._redirectToUrl.bind(this, href)}>
          <rect key={0} x={'0%'} y={0} width={'100%'} height={barHeight} fill={palette.neutralTertiaryAlt} />
        </g>,
      );
    }
    if (total === 0) {
      bars.push(
        <g key={'empty'} className={this._classNames.noData} onClick={this._redirectToUrl.bind(this, href)}>
          <rect key={0} x={'0%'} y={0} width={'100%'} height={barHeight} fill={palette.neutralTertiaryAlt} />
        </g>,
      );
    }
    const hideNumber = hideRatio === undefined ? false : hideRatio;
    const showRatio = !hideNumber && data!.chartData!.length === 2;
    const showNumber = !hideNumber && data!.chartData!.length === 1;
    const titleAriaLabel = this.props.ariaLabel
      ? this.props.ariaLabel
      : `Bar chart depicting about ${data!.chartTitle}`;
    const chartDataVal: number = data!.chartData![0].data ? data!.chartData![0].data : 0;
    let numberAriaLabel: string = '';
    if (showRatio) {
      numberAriaLabel = !hideDenominator ? `number ${chartDataVal} of ${total}` : `number ${total}`;
    }
    if (showNumber) {
      numberAriaLabel = `number ${chartDataVal}`;
    }

    return (
      <div className={this._classNames.singleChartRoot}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div className={this._classNames.chartTitle}>
            {data!.chartTitle && (
              <div
                data-is-focusable={true}
                role="text"
                aria-label={titleAriaLabel}
                aria-labelledby={this.props.ariaLabelledBy}
                aria-describedby={this.props.ariaDescribedBy}
              >
                <strong>{data!.chartTitle}</strong>
              </div>
            )}
            {showRatio && (
              <div data-is-focusable={showRatio} role="text" aria-label={numberAriaLabel}>
                <strong>{chartDataVal}</strong>
                {!hideDenominator && <span>/{total}</span>}
              </div>
            )}
            {showNumber && (
              <div data-is-focusable={showNumber} role="text" aria-label={numberAriaLabel}>
                <strong>{data!.chartData![0].data}</strong>
              </div>
            )}
          </div>
        </FocusZone>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <svg className={this._classNames.chart}>{bars}</svg>
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onBarFocus(pointData: number, color: string, point: IChartDataPoint, indexDetails: IIndexData): void {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend!)
    ) {
      this.state.refArray.forEach((obj: IRefArrayData) => {
        if (obj.legendText === point.legend!) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: point.legend!,
            dataForHoverCard: pointData,
            color: color,
            xCalloutValue: point.xAxisCalloutData!,
            yCalloutValue: point.yAxisCalloutData!,
            dataPointCalloutProps: point,
            indexValOfRect: indexDetails.indexValOfRect! + 1,
            lengthOfChartData: indexDetails.lengthOfChartData!,
          });
        }
      });
    }
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this.state.refArray.push({ legendText: legendTitle, refElement: element });
  }

  private _adjustProps = (): void => {
    const { theme, className, styles, width, barHeight } = this.props;
    this._classNames = getClassNames(styles!, {
      legendColor: this.state.color,
      theme: theme!,
      width: width,
      className,
      barHeight: barHeight,
    });
  };

  private _onHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        selectedLegendTitle: customMessage,
      });
    }
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
              color: color,
              action: () => {
                this._onClick(point.legend!);
              },
              hoverAction: () => {
                this._onHover(point.legend!);
              },
              onMouseOutAction: (isLegendSelected?: boolean) => {
                this._onLeave(isLegendSelected);
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
            color: color,
            action: () => {
              this._onClick(point.legend!);
            },
            hoverAction: () => {
              this._onHover(point.legend!);
            },
            onMouseOutAction: (isLegendSelected?: boolean) => {
              this._onLeave(isLegendSelected);
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

  private _onClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.selectedLegendTitle === customMessage) {
        this.setState({
          isLegendSelected: false,
          selectedLegendTitle: customMessage,
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
    indexDetails: IIndexData,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ): void {
    mouseEvent.persist();

    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend!)
    ) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        selectedLegendTitle: point.legend!,
        dataForHoverCard: pointData,
        color: color,
        xCalloutValue: point.xAxisCalloutData!,
        yCalloutValue: point.yAxisCalloutData!,
        dataPointCalloutProps: point,
        indexValOfRect: indexDetails.indexValOfRect! + 1,
        lengthOfChartData: indexDetails.lengthOfChartData!,
      });
    }
  }

  private _onBarLeave(): void {
    this.setState({
      isCalloutVisible: false,
    });
  }

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };
}
