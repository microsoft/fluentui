import * as React from 'react';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { ILegend, Legends } from '../Legends/index';
import { IChartDataPoint, IChartProps } from './index';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ChartHoverCard } from '../../utilities/index';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export interface IStackedBarChartState {
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

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, IStackedBarChartState> {
  public static defaultProps: Partial<IStackedBarChartProps> = {
    barHeight: 16,
    hideNumberDisplay: false,
    hideLegend: false,
    ignoreFixStyle: false,
  };
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;
  private _calloutId: string;

  public constructor(props: IStackedBarChartProps) {
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
    this._refCallback = this._refCallback.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
  }

  public render(): JSX.Element {
    this._adjustProps();
    const {
      data,
      benchmarkData,
      targetData,
      hideNumberDisplay,
      hideLegend,
      theme,
      styles,
      barBackgroundColor,
      href,
      ignoreFixStyle,
      hideDenominator,
      hideTooltip,
    } = this.props;
    const { palette } = theme!;
    const barHeight = ignoreFixStyle || data!.chartData!.length > 2 ? this.props.barHeight : 8;
    if (benchmarkData) {
      // benchmark color is used to render color for benchmark triangle and benchmark legend
      benchmarkData.color = benchmarkData.color || palette.neutralTertiary;
    }
    if (targetData) {
      // target color is used to render color for target triangle and target legend
      targetData.color = targetData.color || palette.neutralSecondary;
    }
    const bars = this._createBarsAndLegends(
      data!,
      barHeight!,
      palette,
      barBackgroundColor,
      href,
      benchmarkData,
      targetData,
    );
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
    const showLegend = hideLegend === false && (ignoreFixStyle || data!.chartData!.length > 2);
    const { isCalloutVisible } = this.state;
    this._classNames = getClassNames(styles!, {
      legendColor: this.state.color,
      theme: theme!,
      benchmarkColor: benchmarkData ? benchmarkData.color : '',
      benchmarkRatio,
      targetColor: targetData ? targetData.color : '',
      targetRatio,
    });
    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.chartTitle}>
          {data!.chartTitle && (
            <div>
              <strong>{data!.chartTitle}</strong>
            </div>
          )}
          {showRatio && (
            <div>
              <span className={this._classNames.ratioNumerator}>
                {data!.chartData![0].data ? data!.chartData![0].data : 0}
              </span>
              {!hideDenominator && (
                <span>
                  /<span className={this._classNames.ratioDenominator}>{total}</span>
                </span>
              )}
            </div>
          )}
          {showNumber && (
            <div>
              <strong>{data!.chartData![0].data}</strong>
            </div>
          )}
        </div>
        {(benchmarkData || targetData) && (
          <div className={this._classNames.benchmarkContainer}>
            {benchmarkData && <div className={this._classNames.benchmark} />}
            {targetData && <div className={this._classNames.target} />}
          </div>
        )}
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <svg className={this._classNames.chart}>
              <g>{bars[0]}</g>
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
            </svg>
          </div>
        </FocusZone>
        {showLegend && <div className={this._classNames.legendContainer}>{bars[1]}</div>}
      </div>
    );
  }

  private _adjustProps(): void {
    const { theme, className, styles, width, barHeight } = this.props;
    this._classNames = getClassNames(styles!, {
      legendColor: this.state.color,
      theme: theme!,
      width: width!,
      barHeight: barHeight!,
      className,
    });
  }

  private _createBarsAndLegends(
    data: IChartProps,
    barHeight: number,
    palette: IPalette,
    barBackgroundColor?: string,
    href?: string,
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
        value = 1;
      } else if (value > 99 && value !== 100) {
        value = 99;
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
        href: href,
      });
      return (
        <g
          key={index}
          className={this._classNames.opacityChangeOnHover}
          ref={(e: SVGGElement) => {
            this._refCallback(e, legend.title);
          }}
          data-is-focusable={true}
          focusable={'true'}
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
          onMouseOver={this._onBarHover.bind(
            this,
            point.legend!,
            pointData,
            color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onMouseMove={this._onBarHover.bind(
            this,
            point.legend!,
            pointData,
            color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onMouseLeave={this._onBarLeave}
          pointerEvents="all"
          onClick={this._redirectToUrl.bind(this, href)}
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
        ? [this._generateEmptyBar(barHeight, barBackgroundColor ? barBackgroundColor : palette.neutralTertiary)]
        : bars,
      legends,
    ];
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
    this.state.refArray.push({ legendText: legendTitle, refElement: element });
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
