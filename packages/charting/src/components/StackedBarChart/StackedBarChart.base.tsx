import * as React from 'react';
import { IDataPoint } from './StackedBarChart.types';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';

const getClassNames = classNamesFunction<IStackedBarChartStyleProps, IStackedBarChartStyles>();

export class StackedBarChartBase extends React.Component<IStackedBarChartProps, {}> {
  public static defaultProps: Partial<IStackedBarChartProps> = {
    data: [],
    width: 500,
    height: 100,
    barHeight: 35
  };
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IStackedBarChartStyles>;
  constructor(props: IStackedBarChartProps) {
    super(props);

    const { theme } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
  }
  public render(): JSX.Element {
    const { data, width, height, barHeight } = this.props;

    const bars = this._createBars(data!, height!, width!, barHeight!);

    const legendBar = this._createLegendBars(data!, barHeight!);

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
      barHeight
    });

    return (
      <div className={this._classNames.root}>
        {this.props.chartTitle && <p className={this._classNames.chartTitle}>{this.props.chartTitle}</p>}
        <svg className={this._classNames.chart}>
          <g className={this._classNames.bars}>{bars}</g>
          <g className={this._classNames.legend}>{legendBar}</g>
        </svg>
      </div>
    );
  }

  private _createBars(data: IDataPoint[], height: number, width: number, barHeight: number): JSX.Element[] {
    let prevWidth = 0;
    const barWidths = [0];
    const total = data.map((item: IDataPoint) => item.value).reduce((a: number, b: number) => a + b, 0);
    const bars = data.map((point: IDataPoint, index: number) => {
      const value = (point.value / total) * width;
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

  private _createLegendBars(data: IDataPoint[], barHeight: number): JSX.Element[] {
    const bars = data.map((point: IDataPoint, index: number) => {
      return (
        <g key={index}>
          <rect x={index * 80} y={0} width={12} height={12} fill={this._colors[index % this._colors.length]} />
          <text x={15 + index * 80} y={12} fill={this._colors[index % this._colors.length]}>
            {point.label}
          </text>
        </g>
      );
    });
    return bars;
  }
}
