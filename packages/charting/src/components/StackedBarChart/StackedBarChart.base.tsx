import * as React from 'react';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ILegend, Legends } from '../Legends/index';
import { IChartDataPoint, IChartProps } from './index';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, {}> {
  public static defaultProps: Partial<IStackedBarChartProps> = {
    barHeight: 16,
    hideNumberDisplay: false,
    hideLegend: false,
    isMultiStackedBarChart: false
  };
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;

  public render(): JSX.Element {
    this._adjustProps();
    const { data, barHeight, hideNumberDisplay, hideLegend, theme } = this.props;
    const { palette } = theme!;
    const bars = this._createBarsAndLegends(data!, barHeight!, palette);
    const showRatio = hideNumberDisplay === false && data!.chartData!.length === 2;
    const showNumber = hideNumberDisplay === false && data!.chartData!.length === 1;
    let total = 0;
    if (showRatio === true) {
      total = data!.chartData!.reduce((acc: number, value: IChartDataPoint) => acc + (value.data ? value.data : 0), 0);
    }

    const showLegend = hideLegend === false && data!.chartData!.length > 2;
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
              <strong>{data!.chartData![0].data}</strong>/{total}
            </div>
          )}
          {showNumber && (
            <div>
              <strong>{data!.chartData![0].data}</strong>
            </div>
          )}
        </div>

        <svg className={this._classNames.chart}>
          <g>{bars[0]}</g>
        </svg>
        {showLegend && <div className={this._classNames.legendContainer}>{bars[1]}</div>}
      </div>
    );
  }

  private _adjustProps(): void {
    const { theme, className, styles, width, barHeight, isMultiStackedBarChart } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      barHeight: barHeight!,
      isMultiStackedBarChart: isMultiStackedBarChart,
      className
    });
  }

  private _createBarsAndLegends(data: IChartProps, barHeight: number, palette: IPalette): [JSX.Element[], JSX.Element] {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const legendDataItems: ILegend[] = [];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const total = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) => acc + (point.data ? point.data : 0),
      0
    );
    let prevPosition = 0;
    let value = 0;
    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.data ? point.data : 0;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color
      };
      legendDataItems.push(legend);
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100;
      startingPoint.push(prevPosition);
      return (
        <rect key={index} x={startingPoint[index] + '%'} y={0} width={value + '%'} height={barHeight} fill={color} />
      );
    });
    const legends = <Legends legends={legendDataItems} />;
    return [bars, legends];
  }
}
