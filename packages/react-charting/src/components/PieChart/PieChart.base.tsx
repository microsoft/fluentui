import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { IPieChartProps, IPieChartStyleProps, IPieChartStyles } from './PieChart.types';
import { Pie } from './Pie/Pie';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { getColorFromToken, getNextColor } from '../../utilities/colors';

const getClassNames = classNamesFunction<IPieChartStyleProps, IPieChartStyles>();
export interface IPieChartState {
  emptyChart?: boolean;
}

export class PieChartBase extends React.Component<IPieChartProps, IPieChartState> {
  public static defaultProps: Partial<IPieChartProps> = {
    data: [],
    width: 600,
    height: 350,
  };
  private _classNames: IProcessedStyleSet<IPieChartStyles>;

  public constructor(props: IPieChartProps) {
    super(props);
    this.state = {
      emptyChart: false,
    };
  }

  public componentDidMount(): void {
    const isChartEmpty = !(
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.data.filter(item => item.y > 0).length > 0
    );
    if (this.state.emptyChart !== isChartEmpty) {
      this.setState({ emptyChart: isChartEmpty });
    }
  }

  public render(): JSX.Element {
    const { data, width, height, colors, chartTitle } = this.props;

    const finalColors = [];
    const { theme, className, styles, culture } = this.props;

    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (colors && i < colors?.length && typeof colors[i] !== 'undefined') {
          finalColors.push(getColorFromToken(colors[i]));
        } else {
          finalColors.push(getNextColor(i, 0, theme?.isInverted));
        }
      }
    }

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

    return !this.state.emptyChart ? (
      <div className={this._classNames.root}>
        {this.props.chartTitle && <p className={this._classNames.chartTitle}>{this.props.chartTitle}</p>}
        <Pie
          culture={culture}
          width={width!}
          height={height!}
          outerRadius={outerRadius}
          innerRadius={1}
          data={data!}
          colors={finalColors}
          chartTitle={chartTitle!}
          theme={theme}
        />
      </div>
    ) : (
      <div
        id={getId('_PieChart_')}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }
}
