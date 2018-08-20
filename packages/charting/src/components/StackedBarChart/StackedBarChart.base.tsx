import * as React from 'react';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { Legend } from '../Legend/Legend';

import { IDataPoint, ILegendDataItem } from './StackedBarChart.types';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, {}> {
  public static defaultProps: Partial<IStackedBarChartProps> = {
    data: [],
    width: 394,
    barHeight: 16,
    hideNumberDisplay: false,
    hideLegend: false
  };
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;

  public render(): JSX.Element {
    this._adjustProps();
    const { data, width, barHeight, chartTitle, hideNumberDisplay, hideLegend } = this.props;

    const bars = this._createBars(data!, width!, barHeight!);
    const legendBar = this._createLegendBars(data!);

    const showRatio = hideNumberDisplay === false && data!.length === 2;
    const showNumber = hideNumberDisplay === false && data!.length === 1;
    let total = 0;
    if (showRatio === true) {
      total = data!.reduce((acc: number, value: IDataPoint) => acc + value.y, 0);
    }

    const showLegend = hideLegend === false && data!.length > 2;

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.chartTitle}>
          {chartTitle && (
            <div>
              <strong>{this.props.chartTitle}</strong>
            </div>
          )}
          {showRatio && (
            <div>
              <strong>{data![0].y}</strong>/{total}
            </div>
          )}
          {showNumber && (
            <div>
              <strong>{data![0].y}</strong>
            </div>
          )}
        </div>

        <svg className={this._classNames.chart}>
          <g>{bars}</g>
        </svg>
        {showLegend && <div className={this._classNames.legendContainer}>{legendBar}</div>}
      </div>
    );
  }

  private _adjustProps(): void {
    const { theme, className, styles, width, barHeight } = this.props;

    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      barHeight: barHeight!,
      className
    });
  }

  private _createBars(data: IDataPoint[], width: number, barHeight: number): JSX.Element[] {
    let prevWidth = 0;
    const barWidths = [0];
    const total = data.reduce((acc: number, point: IDataPoint) => acc + point.y, 0);
    const bars = data.map((point: IDataPoint, index: number) => {
      const value = (point.y / total) * width;
      prevWidth = prevWidth + value;
      barWidths.push(prevWidth);

      return (
        <rect
          key={index}
          x={barWidths[index]}
          y={0}
          width={value}
          height={barHeight}
          fill={this._colors[index % this._colors.length]}
        />
      );
    });
    return bars;
  }

  private _createLegendBars(data: IDataPoint[]): JSX.Element {
    const legendDataItems: ILegendDataItem[] = data.map((point: IDataPoint, index: number) => {
      return {
        legendText: point.x,
        legendColor: this._colors[index % this._colors.length]
      };
    });

    return <Legend renderData={legendDataItems} />;
  }
}
