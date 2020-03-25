import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IPieChartProps, IPieChartStyleProps, IPieChartStyles } from './PieChart.types';
import { Pie } from './Pie/Pie';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
const getClassNames = classNamesFunction<IPieChartStyleProps, IPieChartStyles>();

export class PieChartBase extends React.Component<IPieChartProps, {}> {
  public static defaultProps: Partial<IPieChartProps> = {
    data: [],
    width: 600,
    height: 350,
  };
  private _classNames: IProcessedStyleSet<IPieChartStyles>;

  public render(): JSX.Element {
    const { data, width, height, colors } = this.props;

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
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
