import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { ILegend, Legends } from '../Legends/index';
import {
  IChartDataPoint,
  IChartProps,
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyles,
  StackedBarChart
} from './index';

const getClassNames = classNamesFunction<{}, IMultiStackedBarChartStyles>();

export class MultiStackedBarChartBase extends React.Component<IMultiStackedBarChartProps, {}> {
  private _width: number;
  private _barHeight: number;
  private _renderLegend: boolean | undefined;
  private _classNames: IProcessedStyleSet<IMultiStackedBarChartStyles>;

  public render(): JSX.Element {
    const { data, theme, hideRatio } = this.props;
    this._adjustProps();
    const legends = this._getLegendData(data!, hideRatio!);
    this._renderLegend = data ? true : false;
    const { palette } = theme!;
    return (
      <div className={this._classNames.root}>
        {data!.map((points: IChartProps, index: number) => {
          let currentFlagShowRatio = hideRatio ? (hideRatio[index] !== undefined ? hideRatio[index] : false) : false;
          if (points.chartData!.length === 0) {
            points.chartData!.push({ legend: '', data: 100, color: palette.neutralTertiaryAlt });
            currentFlagShowRatio = true;
          }
          return (
            <div key={index} className={this._classNames.items}>
              <StackedBarChart
                barHeight={this._barHeight}
                width={this._width}
                theme={theme}
                data={points}
                hideLegend={true}
                hideNumberDisplay={currentFlagShowRatio}
                isMultiStackedBarChart={true}
              />
            </div>
          );
        })}
        {this._renderLegend && <Legends legends={legends} />}
      </div>
    );
  }

  private _getLegendData = (data: IChartProps[], hideRatio: boolean[]): ILegend[] => {
    const actions: ILegend[] = [];
    data.map((singleChartData: IChartProps, index: number) => {
      if (singleChartData.chartData!.length < 3) {
        if (hideRatio && hideRatio[index]) {
          singleChartData.chartData!.map((dataPoint: IChartDataPoint) => {
            const action: ILegend = {
              title: dataPoint.legend!,
              color: dataPoint.color!
            };
            actions.push(action);
          });
        }
      } else {
        singleChartData.chartData!.map((dataPoint: IChartDataPoint) => {
          const action: ILegend = {
            title: dataPoint.legend!,
            color: dataPoint.color!
          };
          actions.push(action);
        });
      }
    });
    return actions;
  };

  private _adjustProps = (): void => {
    const { theme, className, styles, width, barHeight } = this.props;
    this._barHeight = barHeight || 16;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width,
      className,
      barHeight: this._barHeight
    });
  };
}
