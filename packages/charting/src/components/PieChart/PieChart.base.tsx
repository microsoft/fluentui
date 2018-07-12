import * as React from 'react';
import { classNamesFunction, IClassNames } from '../../Utilities';
import { IPieChartProps, IPieChartStyleProps, IPieChartStyles } from './PieChart.types';
import { Pie } from './Pie/Pie';

const getClassNames = classNamesFunction<IPieChartStyleProps, IPieChartStyles>();

export class PieChartBase extends React.Component<IPieChartProps, {}> {
  public static defaultProps: Partial<IPieChartProps> = {
    data: [],
    width: 600,
    height: 350
  };
  private _classNames: IClassNames<IPieChartStyles>;
  constructor(props: IPieChartProps) {
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
    const radius = Math.min(width!, height!) / 2;
    const outerRadius = radius - 10;

    return (
      <div className={this._classNames.root}>
        {this.props.chartTitle && <p className={this._classNames.chartTitle}>{this.props.chartTitle}</p>}
        <Pie width={width!} height={height!} outerRadius={outerRadius} innerRadius={0} data={data!} colors={colors!} />
      </div>
    );
  }
}
