import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';
import { ILegend, Legends } from '@uifabric/charting';
import * as scale from 'd3-scale';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { IChartDataPoint, IChartProps } from './index';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

export class DonutChartBase extends React.Component<IDonutChartProps, {}> {
  public static defaultProps: Partial<IDonutChartProps> = {
    width: 394,
    height: 196
  };
  public _colors: scale.ScaleOrdinal<string, {}>;
  private _classNames: IProcessedStyleSet<IDonutChartStyles>;

  public render(): JSX.Element {
    const { data, width, height } = this.props;

    const { theme, className, styles, innerRadius } = this.props;
    const { palette } = theme!;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width!,
      height: height!,
      className
    });
    const legendBars = this._createLegends(data!, palette);
    const radius = Math.min(width!, height!) / 2;
    const outerRadius = radius - 10;
    const chartData = data && data.chartData;
    return (
      <div className={this._classNames.root}>
        <svg className={this._classNames.chart}>
          <Pie
            width={height!}
            height={height! - 20}
            outerRadius={outerRadius}
            innerRadius={innerRadius!}
            data={chartData!}
          />
        </svg>
        <div className={this._classNames.legendContainer}>{legendBars}</div>
      </div>
    );
  }

  private _createLegends(data: IChartProps, palette: IPalette): JSX.Element {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const legendDataItems = data.chartData!.map((point: IChartDataPoint, index: number) => {
      const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: this._legendClickAction
      };
      return legend;
    });
    const legends = <Legends legends={legendDataItems} />;
    return legends;
  }

  private _legendClickAction(): void {
    alert('legend clicked');
  }
}
