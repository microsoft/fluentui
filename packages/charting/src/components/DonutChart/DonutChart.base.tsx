import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';
import { ILegend, Legends } from '../Legends/index';
import * as scale from 'd3-scale';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { IChartDataPoint, IChartProps } from './index';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

export class DonutChartBase extends React.Component<
  IDonutChartProps,
  { showHover: boolean; value: string | undefined; legend: string | undefined }
> {
  public static defaultProps: Partial<IDonutChartProps> = {
    width: 394,
    height: 196
  };
  public _colors: scale.ScaleOrdinal<string, {}>;
  private _classNames: IProcessedStyleSet<IDonutChartStyles>;
  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      showHover: false,
      value: '',
      legend: ''
    };
    this._legendClickAction = this._legendClickAction.bind(this);
    this._hoverCallback = this._hoverCallback.bind(this);
    this._hoverLeave = this._hoverLeave.bind(this);
    this._onHover = this._onHover.bind(this);
    this._hoverLeave = this._hoverLeave.bind(this);
  }
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
            hoverOnCallback={this._hoverCallback}
            hoverLeaveCallback={this._hoverLeave}
          />
        </svg>
        {this.state.showHover ? (
          <Callout
            target={'#donutchart' + this.state.legend + this.state.value}
            className="ms-CalloutExample-callout"
            coverTarget={true}
            isBeakVisible={false}
            gapSpace={0}
          >
            <div className={this._classNames.hover}>
              <p className="ms-CalloutExample-title">{this.state.value}</p>
            </div>
            <div className="ms-CalloutExample-inner">
              <div className="ms-CalloutExample-content" />
            </div>
          </Callout>
        ) : null}
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
    const legends = <Legends legends={legendDataItems} onHover={this._onHover} onHoverLeave={this._hoverLeave} />;
    return legends;
  }

  private _legendClickAction(): void {
    console.log('hello legend clicked');
  }

  private _hoverCallback(data: IChartDataPoint): void {
    this.setState({
      showHover: true,
      value: data.data!.toString(),
      legend: data.legend
    });
  }

  private _onHover(title: string): void {
    // tslint:disable:no-any
    const itemData =
      this.props.data &&
      this.props.data.chartData!.find((item: any) => {
        if (item.legend === title) {
          return item;
        }
      });
    const value: string | undefined = `${itemData!.data}`;
    this.setState({ showHover: true, value: value, legend: title });
  }

  private _hoverLeave(): void {
    this.setState({ showHover: false });
  }
}
