import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { StackedBarChart } from '@uifabric/charting';
import { IChartProps, IHorizontalBarChartProps, IHorizontalBarChartStyles } from './index';

const getClassNames = classNamesFunction<{}, IHorizontalBarChartStyles>();

export class HorizontalBarChartBase extends React.Component<IHorizontalBarChartProps, {}> {
  private _width: number;
  private _barHeight: number;
  private _classNames: IProcessedStyleSet<IHorizontalBarChartStyles>;

  public render(): JSX.Element {
    const { data, theme, total } = this.props;
    this._adjustProps();
    const { palette } = theme!;
    let datapoint: number | undefined = 0;
    return (
      <div className={this._classNames.root}>
        {data!.map((points: IChartProps, index: number) => {
          if (points.chartData && points.chartData![0] && points.chartData![0].data) {
            datapoint = points.chartData![0].data;
          } else {
            points.chartData!.push({ legend: '', data: 0, color: palette.neutralTertiaryAlt });
            datapoint = 0;
          }
          points.chartData!.push({ legend: '', data: total! - datapoint!, color: palette.neutralTertiaryAlt });
          return (
            <div key={index} className={this._classNames.items}>
              <StackedBarChart
                barHeight={this._barHeight}
                width={this._width}
                theme={theme}
                data={points}
                hideLegend={true}
                hideNumberDisplay={false}
                isHorizontalBarChart={true}
              />
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
}
