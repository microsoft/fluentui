import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';
import { IDataPoint } from './DonutChart.types';
import * as scale from 'd3-scale';
import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

export class DonutChartBase extends React.Component<IDonutChartProps, {}> {
  public static defaultProps: Partial<IDonutChartProps> = {
    data: [],
    width: 394,
    height: 196
  };
  private _classNames: IProcessedStyleSet<IDonutChartStyles>;
  private _colors: scale.ScaleOrdinal<string | number, {}>;

  public render(): JSX.Element {
    const { data, width, height, colors } = this.props;
    this._colors = scale.scaleOrdinal().range(this.props.colors!);

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className
    });
    const legendBars = this._createLegendBars(data!);
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
        </svg>
        <div className={this._classNames.legend}>{legendBars}</div>
      </div>
    );
  }

  private _createLegendBars(data: IDataPoint[]): JSX.Element[] {
    const bars = data.map((point: IDataPoint, index: number) => {
      const color = this._colors(index) as string;

      const boxClass = mergeStyles(this._classNames.legendBox, {
        background: color
      });

      const textClass = mergeStyles({
        color: color
      });

      return (
        <div key={index} className={this._classNames.legendItem}>
          <div className={boxClass} />
          <span className={textClass}>{point.x}</span>
        </div>
      );
    });
    return bars;
  }
}
