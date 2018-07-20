import * as React from 'react';
import { IProcessedStyleSet } from '../../Styling';
import { classNamesFunction } from '../../Utilities';
import { IProgressBarChartProps, IProgressBarChartStyleProps, IProgressBarChartStyles } from './ProgressBarChart.types';

const getClassNames = classNamesFunction<IProgressBarChartStyleProps, IProgressBarChartStyles>();

export class ProgressBarChartBase extends React.Component<IProgressBarChartProps, {}> {
  public static defaultProps: Partial<IProgressBarChartProps> = {
    width: 400,
    height: 50,
    barHeight: 20
  };
  private _classNames: IProcessedStyleSet<IProgressBarChartStyles>;
  constructor(props: IProgressBarChartProps) {
    super(props);
  }
  public render(): JSX.Element {
    const { data, width, height, barHeight, chartTitle, theme, className, styles, colors } = this.props;
    const persentage = (data.value / data.total) * 100;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
      barHeight,
      colors,
      persentage
    });

    return (
      <div className={this._classNames.root}>
        <div>
          <span className={this._classNames.value}>
            <strong>{chartTitle}</strong>
          </span>
          <span className={this._classNames.chartTitle}>
            <strong>{data!.value}</strong>/
            {data!.total}
          </span>
        </div>
        <div className={this._classNames.chart}>
          <div className={this._classNames.bar} />
        </div>
      </div>
    );
  }
}
