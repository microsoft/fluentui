import * as React from 'react';
import { IDataPoint } from './StackedBarChart.types';

import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, {}> {
  private _points: IDataPoint[];
  private _width: number;
  private _height: number;
  private _barHeight: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;

  public render(): JSX.Element {
    this._adjustProps();

    const bars = this._createBars();
    const legendBar = this._createLegendBars();

    if (this._points.length > 2) {
      return (
        <div className={this._classNames.root}>
          {this.props.chartTitle && <strong className={this._classNames.chartTitle}>{this.props.chartTitle}</strong>}
          <svg className={this._classNames.chart}>
            <g className={this._classNames.bars}>{bars}</g>
          </svg>
          <ul className={this._classNames.legend}>{legendBar}</ul>
        </div>
      );
    }

    const total = this._points.map((item: IDataPoint) => item.y).reduce((a: number, b: number) => a + b, 0);
    const { chartTitle } = this.props;
    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.chartTitle}>
          <div className={this._classNames.subTitle}>
            <strong>{chartTitle}</strong>
          </div>
          <div className={this._classNames.value}>
            <strong>{this._points[0].y}</strong>/{total}
          </div>
        </div>
        <svg className={this._classNames.chart}>
          <g className={this._classNames.bars}>{bars}</g>
        </svg>
      </div>
    );
  }

  private _adjustProps(): void {
    const { theme, className, styles, data, width, height, barHeight } = this.props;

    this._points = data || [];
    this._width = width || 500;
    this._height = height || 50;
    this._barHeight = barHeight || 35;

    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className,
      barHeight: this._barHeight
    });
  }

  private _createBars(): JSX.Element[] {
    let prevWidth = 0;
    const barWidths = [0];
    const total = this._points.map((item: IDataPoint) => item.y).reduce((a: number, b: number) => a + b, 0);
    const bars = this._points.map((point: IDataPoint, index: number) => {
      const value = (point.y / total) * this._width;
      prevWidth = prevWidth + value;
      barWidths.push(prevWidth);

      return (
        <rect
          key={index}
          x={barWidths[index]}
          y={0}
          width={value}
          height={this._barHeight}
          fill={this._colors[index % this._colors.length]}
        />
      );
    });
    return bars;
  }

  private _createLegendBars(): JSX.Element[] {
    const bars = this._points.map((point: IDataPoint, index: number) => {
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
