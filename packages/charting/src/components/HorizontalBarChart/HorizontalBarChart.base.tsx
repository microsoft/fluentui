import * as React from 'react';
import { classNamesFunction, find, getId } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import {
  IChartProps,
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles,
  IChartDataPoint,
} from './index';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

const getClassNames = classNamesFunction<IHorizontalBarChartStyleProps, IHorizontalBarChartStyles>();

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export interface IHorizontalBarChartState {
  isCalloutVisible: boolean;
  refArray: IRefArrayData[];
  refSelected: SVGGElement | null | undefined;
  color: string;
  hoverValue: string | number | Date | null;
  lineColor: string;
  legend: string | null;
  xCalloutValue?: string;
  yCalloutValue?: string;
}

export class HorizontalBarChartBase extends React.Component<IHorizontalBarChartProps, IHorizontalBarChartState> {
  private _barHeight: number;
  private _classNames: IProcessedStyleSet<IHorizontalBarChartStyles>;
  private _uniqLineText: string;
  private _calloutId: string;

  constructor(props: IHorizontalBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      hoverValue: '',
      lineColor: '',
      legend: '',
      refArray: [],
      refSelected: null,
      // eslint-disable-next-line react/no-unused-state
      color: '',
      xCalloutValue: '',
      yCalloutValue: '',
    };
    this._uniqLineText =
      '_HorizontalLine_' +
      Math.random()
        .toString(36)
        .substring(7);
    this._hoverOff = this._hoverOff.bind(this);
    this._calloutId = getId('callout');
  }

  public render(): JSX.Element {
    const { data, theme } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    let datapoint: number | undefined = 0;
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className={this._classNames.root}>
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
                  <div className={this._classNames.chartTitle}>
                    {points!.chartTitle && <div className={this._classNames.chartDataText}>{points!.chartTitle}</div>}
                    {chartDataText}
                  </div>
                  {points!.chartData![0].data && this._createBenchmark(points!)}
                  <svg className={this._classNames.chart}>
                    <g
                      id={keyVal}
                      key={keyVal}
                      ref={(e: SVGGElement) => {
                        this._refCallback(e, points!.chartData![0].legend);
                      }}
                      className={this._classNames.barWrapper}
                      onMouseOver={this._hoverOn.bind(
                        this,
                        points!
                          .chartData![0].horizontalBarChartdata!.x.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        points!.chartData![0].color,
                        points!.chartData![0].legend,
                        points!.chartData![0].xAxisCalloutData!,
                        points!.chartData![0].yAxisCalloutData!,
                      )}
                      onFocus={this._hoverOn.bind(
                        this,
                        points!
                          .chartData![0].horizontalBarChartdata!.x.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        points!.chartData![0].color,
                        points!.chartData![0].legend,
                        points!.chartData![0].xAxisCalloutData!,
                        points!.chartData![0].yAxisCalloutData!,
                      )}
                      aria-labelledby={this._calloutId}
                      data-is-focusable={true}
                      onBlur={this._hoverOff}
                      onMouseLeave={this._hoverOff}
                    >
                      {bars}
                    </g>
                  </svg>
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
            directionalHint={DirectionalHint.rightTopEdge}
            id={this._calloutId}
          >
            <ChartHoverCard
              Legend={this.state.xCalloutValue ? this.state.xCalloutValue : this.state.legend!}
              YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.hoverValue!}
              color={this.state.lineColor}
            />
          </Callout>
        </div>
      </FocusZone>
    );
  }

  private _refCallback(element: SVGGElement, legendTitle: string | undefined): void {
    this.state.refArray.push({ legendText: legendTitle, refElement: element });
  }

  private _hoverOn(
    hoverValue: string | number | Date | null,
    lineColor: string,
    legend: string,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void {
    if (!this.state.isCalloutVisible || this.state.legend !== legend) {
      const refArray = this.state.refArray;
      const currentHoveredElement = find(
        refArray,
        (currentElement: IRefArrayData) => currentElement.legendText === legend,
      );
      this.setState({
        isCalloutVisible: true,
        hoverValue: hoverValue,
        lineColor: lineColor,
        legend: legend,
        refSelected: currentHoveredElement!.refElement,
        xCalloutValue: xAxisCalloutData,
        yCalloutValue: yAxisCalloutData,
      });
    }
  }

  private _hoverOff(): void {
    if (this.state.isCalloutVisible) {
      this.setState({
        isCalloutVisible: false,
        hoverValue: '',
        refSelected: null,
        lineColor: '',
        legend: '',
      });
    }
  }

  private _adjustProps = (): void => {
    const { theme, className, styles, width, barHeight } = this.props;
    this._barHeight = barHeight || 8;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width,
      className,
      barHeight: this._barHeight,
      color: this.state.lineColor,
    });
  };

  private _getChartDataText(data: IChartProps): JSX.Element {
    const chartDataMode = this.props.chartDataMode || 'default';
    const x = data!.chartData![0].horizontalBarChartdata!.x;
    const y = data!.chartData![0].horizontalBarChartdata!.y;

    switch (chartDataMode) {
      case 'default':
        return (
          <div className={this._classNames.chartDataText}>{x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
        );
      case 'fraction':
        return (
          <div>
            <span className={this._classNames.chartDataText}>{x}</span>
            <span className={this._classNames.chartDataTextDenominator}>{'/' + y}</span>
          </div>
        );
      case 'percentage':
        const dataRatio = Math.round((x / y) * 100);
        return <div className={this._classNames.chartDataText}>{dataRatio + '%'}</div>;
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
    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0;
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100;
      if (value < 0) {
        value = 0;
      }
      startingPoint.push(prevPosition);
      return (
        <rect
          key={index}
          x={startingPoint[index] + '%'}
          y={0}
          width={value + '%'}
          height={this._barHeight}
          fill={color}
        />
      );
    });
    return bars;
  }
}
