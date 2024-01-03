import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { IPieChartProps, IPieChartStyleProps, IPieChartStyles } from './PieChart.types';
import { Pie } from './Pie/Pie';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';

const getClassNames = classNamesFunction<IPieChartStyleProps, IPieChartStyles>();

export class PieChartBase extends React.Component<IPieChartProps, {}> {
  public static defaultProps: Partial<IPieChartProps> = {
    data: [],
    width: 600,
    height: 350,
  };
  private _classNames: IProcessedStyleSet<IPieChartStyles>;
  private _emptyChartId: string;

  public constructor(props: IPieChartProps) {
    super(props);
    this._emptyChartId = getId('_PieChart_empty');
  }

  public render(): JSX.Element {
    const { data, width, height, colors, chartTitle } = this.props;

    const { theme, className, styles, culture } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className,
    });

    const TEXT_MAX_WIDTH = 40;
    const TEXT_LINE_HEIGHT = 16;

    /**
     * The radius for the pie chart is computed based on the space available inside the svg
     * after subtracting the max amount of space that can be used by the text in pie chart
     */

    const radius = Math.min(width! - 2 * TEXT_MAX_WIDTH, height! - 2 * TEXT_LINE_HEIGHT) / 2;
    const outerRadius = radius;

    return !this._isChartEmpty() ? (
      <div className={this._classNames.root}>
        {this.props.chartTitle && <p className={this._classNames.chartTitle}>{this.props.chartTitle}</p>}
        <Pie
          culture={culture}
          width={width!}
          height={height!}
          outerRadius={outerRadius}
          innerRadius={1}
          data={data!}
          colors={colors!}
          chartTitle={chartTitle!}
          theme={theme}
        />
      </div>
    ) : (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  private _isChartEmpty(): boolean {
    return !(this.props.data && this.props.data.length > 0 && this.props.data.filter(item => item.y > 0).length > 0);
  }
}
