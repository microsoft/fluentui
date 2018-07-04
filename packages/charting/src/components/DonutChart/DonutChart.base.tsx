import * as React from 'react';
import { classNamesFunction, IClassNames } from '../../Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

export class DonutChartBase extends React.Component<IDonutChartProps, {}> {
  public static defaultProps: Partial<IDonutChartProps> = {
    data: [],
    width: 600,
    height: 350
  };
  private _classNames: IClassNames<IDonutChartStyles>;
  constructor(props: IDonutChartProps) {
    super(props);
  }
  public render(): JSX.Element {
    const { data, width, height, colors } = this.props;

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className
    });
    console.log(' this._classNames');
    const radius = Math.min(width!, height!) / 2;
    const outerRadius = radius - 10;
    const innerRadius = 80;

    return (
      <div className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <Pie
          width={width!}
          height={height!}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          data={data!}
          colors={colors!}
        />
      </div>
    );
  }
}
