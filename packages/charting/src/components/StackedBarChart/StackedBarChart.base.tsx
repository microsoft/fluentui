import * as React from 'react';
import { IDataPoint } from './StackedBarChart.types';

import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, {}> {
  public static defaultProps: Partial<IStackedBarChartProps> = {
    data: [],
    width: 500,
    height: 50,
    barHeight: 35
  };
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;
  constructor(props: IStackedBarChartProps) {
    super(props);
    const { theme, className, styles, width, height, barHeight } = this.props;

    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
      barHeight
    });
  }
  public render(): JSX.Element {
    const { data, width, height, barHeight } = this.props;

    const bars = this._createBars(data!, height!, width!, barHeight!);

    const legendBar = this._createLegendBars(data!);

    if (data!.length > 2) {
      return (
        <div className={this._classNames.root}>
          {this.props.chartTitle && <p className={this._classNames.chartTitle}>{this.props.chartTitle}</p>}
          <svg className={this._classNames.chart}>
            <g className={this._classNames.bars}>{bars}</g>
          </svg>
          <ul className={this._classNames.legend}>{legendBar}</ul>
        </div>
      );
    } else {
      const total = data!.map((item: IDataPoint) => item.y).reduce((a: number, b: number) => a + b, 0);
      const { chartTitle } = this.props;
      return (
        <div className={this._classNames.root}>
          <div className={this._classNames.chartTitle}>
            <div className={this._classNames.subTitle}>
              <strong>{chartTitle}</strong>
            </div>
            <div className={this._classNames.value}>
              <strong>{data![0].y}</strong>/{total}
            </div>
          </div>
          <svg className={this._classNames.chart}>
            <g className={this._classNames.bars}>{bars}</g>
          </svg>
        </div>
      );
    }
  }

  private _createBars(data: IDataPoint[], height: number, width: number, barHeight: number): JSX.Element[] {
    let prevWidth = 0;
    const barWidths = [0];
    const total = data.map((item: IDataPoint) => item.y).reduce((a: number, b: number) => a + b, 0);
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

  private _createLegendBars(data: IDataPoint[]): JSX.Element[] {
    const bars = data.map((point: IDataPoint, index: number) => {
      const itemStyle = {
        backgroundColor: this._colors[index % this._colors.length],
        height: '0px',
        width: '0px',
        padding: '5px'
      };
      return (
        <li key={index} className={this._classNames.legendBar}>
          <span className={mergeStyles(itemStyle)} />
          <span className={this._classNames.legendText}>{point.x}</span>
        </li>
      );
    });
    return bars;
  }
}
