import * as React from 'react';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { ILegend, Legends } from '../Legends/index';
import {
  IChartDataPoint,
  IChartProps,
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyles,
  IMultiStackedBarChartStyleProps,
} from './index';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ChartHoverCard } from '../../utilities/index';

const getClassNames = classNamesFunction<IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles>();

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
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
    };
    this._onLeave = this._onLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
  }

  public render(): JSX.Element {
    const { barHeight, data, theme, hideRatio, hideLegend, styles, href, hideDenominator, hideTooltip } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    const legends = this._getLegendData(data!, hideRatio!, palette);
    const bars: JSX.Element[] = data!.map((singleChartData: IChartProps, index: number) => {
      const singleChartBars = this._createBarsAndLegends(
        singleChartData!,
        barHeight!,
        palette,
        hideRatio![index],
        hideDenominator![index],
        href,
      );
      return <div key={index}>{singleChartBars}</div>;
    });
    this._classNames = getClassNames(styles!, {
      legendColor: this.state.color,
      theme: theme!,
    });
    const { isCalloutVisible } = this.state;
    return (
      <div className={this._classNames.root}>
        {bars}
        {!hideLegend && <div className={this._classNames.legendContainer}>{legends}</div>}
        <Callout
          gapSpace={15}
          isBeakVisible={false}
          target={this.state.refSelected}
          setInitialFocus={true}
          hidden={!(!hideTooltip && isCalloutVisible)}
          directionalHint={DirectionalHint.topRightEdge}
          id={this._calloutId}
        >
          <ChartHoverCard
            Legend={this.state.xCalloutValue ? this.state.xCalloutValue : this.state.selectedLegendTitle}
            YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard}
            color={this.state.color}
          />
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
      return (
        <g
          key={index}
          className={point.placeHolder ? this._classNames.placeHolderOnHover : this._classNames.opacityChangeOnHover}
          ref={(e: SVGGElement) => {
            this._refCallback(e, point.legend!);
          }}
          data-is-focusable={true}
          onFocus={this._onBarFocus.bind(
            this,
            point.legend!,
            pointData,
            color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onBlur={this._onBarLeave}
          aria-labelledby={this._calloutId}
          onMouseOver={
            point.placeHolder
              ? undefined
              : this._onBarHover.bind(
                  this,
                  point.legend!,
                  pointData,
                  color,
                  point.xAxisCalloutData!,
                  point.yAxisCalloutData!,
                )
          }
          onMouseMove={
            point.placeHolder
              ? undefined
              : this._onBarHover.bind(
                  this,
                  point.legend!,
                  pointData,
                  color,
                  point.xAxisCalloutData!,
                  point.yAxisCalloutData!,
                )
          }
          onMouseLeave={point.placeHolder ? undefined : this._onBarLeave}
          onClick={point.placeHolder ? undefined : this._redirectToUrl.bind(this, href)}
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
    return (
      <div className={this._classNames.singleChartRoot}>
        <div className={this._classNames.chartTitle}>
          {data!.chartTitle && (
            <div>
              <strong>{data!.chartTitle}</strong>
            </div>
          )}
          {showRatio && (
            <div>
              <strong>{data!.chartData![0].data ? data!.chartData![0].data : 0}</strong>
              {!hideDenominator && <span>/{total}</span>}
            </div>
          )}
          {showNumber && (
            <div>
              <strong>{data!.chartData![0].data}</strong>
            </div>
          )}
        </div>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <svg className={this._classNames.chart}>{bars}</svg>
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onBarFocus(
    legendText: string,
    pointData: number,
    color: string,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === legendText)
    ) {
      this.state.refArray.forEach((obj: IRefArrayData) => {
        if (obj.legendText === legendText) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: legendText,
            dataForHoverCard: pointData,
            color: color,
            xCalloutValue: xAxisCalloutData,
            yCalloutValue: yAxisCalloutData,
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
    customMessage: string,
    pointData: number,
    color: string,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ): void {
    mouseEvent.persist();

    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === customMessage)
    ) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        selectedLegendTitle: customMessage,
        dataForHoverCard: pointData,
        color: color,
        xCalloutValue: xAxisCalloutData,
        yCalloutValue: yAxisCalloutData,
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
}
