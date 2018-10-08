import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { IChartProps, IHorizontalBarChartProps, IHorizontalBarChartStyles, IChartDataPoint } from './index';

const getClassNames = classNamesFunction<{}, IHorizontalBarChartStyles>();

export class HorizontalBarChartBase extends React.Component<IHorizontalBarChartProps, {}> {
  private _barHeight: number;
  private _classNames: IProcessedStyleSet<IHorizontalBarChartStyles>;

  public render(): JSX.Element {
    const { data, theme } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    let datapoint: number | undefined = 0;
    return (
      <div className={this._classNames.root}>
        {data!.map((points: IChartProps, index: number) => {
          if (points.chartData && points.chartData![0] && points.chartData![0].horizontalBarChartdata!.x) {
            datapoint = points.chartData![0].horizontalBarChartdata!.x;
          } else {
            points.chartData!.push({
              legend: '',
              horizontalBarChartdata: { x: 0, y: 0 },
              color: palette.neutralTertiaryAlt
            });
            datapoint = 0;
          }
          points.chartData!.push({
            legend: '',
            horizontalBarChartdata: {
              x: points.chartData![0].horizontalBarChartdata!.y - datapoint!,
              y: points.chartData![0].horizontalBarChartdata!.y
            },
            color: palette.neutralTertiaryAlt
          });
          const bars = this._createBars(points!, palette);
          return (
            <div key={index} className={this._classNames.items}>
              <div className={this._classNames.items}>
                <div className={this._classNames.chartTitle}>
                  {points!.chartTitle && (
                    <div>
                      <strong>{points!.chartTitle}</strong>
                    </div>
                  )}
                  <div>
                    <strong>{points!.chartData![0].horizontalBarChartdata!.x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                  </div>
                </div>
                <svg className={this._classNames.chart}>
                  <g>{bars}</g>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  private _adjustProps = (): void => {
    const { theme, className, styles, width, barHeight } = this.props;
    this._barHeight = barHeight || 8;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width,
      className,
      barHeight: this._barHeight
    });
  };

  private _createBars(data: IChartProps, palette: IPalette): JSX.Element[] {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const total = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) => acc + (point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0),
      0
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
      value >= 0 ? (value = value) : (value = 0);
      startingPoint.push(prevPosition);
      return <rect key={index} x={startingPoint[index] + '%'} y={0} width={value + '%'} height={this._barHeight} fill={color} />;
    });
    return bars;
  }
}
