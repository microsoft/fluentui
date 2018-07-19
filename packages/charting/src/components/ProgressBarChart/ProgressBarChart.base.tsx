import * as React from 'react';

import { classNamesFunction, IClassNames } from '../../Utilities';
import { IProgressBarChartProps, IProgressBarChartStyleProps, IProgressBarChartStyles } from './ProgressBarChart.types';

const getClassNames = classNamesFunction<IProgressBarChartStyleProps, IProgressBarChartStyles>();

export class ProgressBarChartBase extends React.Component<IProgressBarChartProps, {}> {
  public static defaultProps: Partial<IProgressBarChartProps> = {
    width: 400,
    height: 50,
    barHeight: 30
  };
  // private _colors: string[];
  private _classNames: IClassNames<IProgressBarChartStyles>;
  constructor(props: IProgressBarChartProps) {
    super(props);
  }
  public render(): JSX.Element {
    const { data, width, height, barHeight, chartTitle } = this.props;

    const { theme, className, styles, colors } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
      barHeight,
      colors
    });

    return (
      <div className={this._classNames.root}>
        <div>
          <span className={this._classNames.value}>
            <strong>{chartTitle}</strong>
          </span>
          <span className={this._classNames.subHeading}>
            <strong>{data!.value}</strong>/
            {data!.total}
          </span>
        </div>
        <progress className={this._classNames.chart} max={data!.total} value={data!.value} />
      </div>
    );
  }
}
