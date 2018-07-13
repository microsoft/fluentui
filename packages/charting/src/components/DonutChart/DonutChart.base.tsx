import * as React from 'react';
import { classNamesFunction, IClassNames } from '../../Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';
import { IDataPoint } from './DonutChart.types';
import * as scale from 'd3-scale';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

export class DonutChartBase extends React.Component<IDonutChartProps, {}> {
  public static defaultProps: Partial<IDonutChartProps> = {
    data: [],
    width: 394,
    height: 196,
    LegendX: 27.81,
    LegendY: 182
  };
  private _classNames: IClassNames<IDonutChartStyles>;
  private colors: scale.ScaleOrdinal<string | number, {}>;
  public render(): JSX.Element {
    const { data, width, height, colors } = this.props;
    this.colors = scale.scaleOrdinal().range(this.props.colors!);

    const { theme, className, styles, LegendX, LegendY } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
      LegendX: LegendX,
      LegendY: LegendY
    });
    const legendBar = this._createLegendBars(data!);
    const radius = Math.min(width!, height!) / 2;
    const outerRadius = radius - 10;
    const innerRadius = 40;

    return (
      <div className={this._classNames.root}>
        <svg className={this._classNames.chart}>
          <Pie
            width={height!}
            height={height! - 20}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            data={data!}
            colors={colors!}
          />
          <g className={this._classNames.Legend}>{legendBar}</g>
        </svg>
      </div>
    );
  }
  private _createLegendBars(data: IDataPoint[]): JSX.Element[] {
    console.log(data);
    const bars = data.map((point: IDataPoint, index: number) => {
      console.log(index);
      return (
        <g key={index}>
          <rect x={index * 61} y={0} width={12} height={12} fill={`${this.colors(index)}`} />
          <text x={15 + index * 61} width={61} height={16} y={12} fill={`${this.colors(index)}`}>
            {point.label}
          </text>
        </g>
      );
    });
    return bars;
  }
}
