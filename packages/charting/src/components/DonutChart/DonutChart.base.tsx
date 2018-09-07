import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';
import { ILegend, Legends } from '../Legends/index';
import * as scale from 'd3-scale';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { IChartDataPoint, IChartProps } from './index';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

export class DonutChartBase extends React.Component<
  IDonutChartProps,
  {
    showHover: boolean;
    value: string | undefined;
    legend: string | undefined;
    _width: number | undefined;
    _height: number | undefined;
    activeLegend: string;
    color: string | undefined;
  }
> {
  public static defaultProps: Partial<IDonutChartProps> = {
    innerRadius: 0
  };
  public _colors: scale.ScaleOrdinal<string, {}>;
  private _classNames: IProcessedStyleSet<IDonutChartStyles>;
  private _rootElem: HTMLElement | null;
  private _uniqText: string;
  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      showHover: false,
      value: '',
      legend: '',
      _width: this.props.width || 200,
      _height: this.props.height || 200,
      activeLegend: '',
      color: ''
    };
    this._hoverCallback = this._hoverCallback.bind(this);
    this._hoverLeave = this._hoverLeave.bind(this);
    this._uniqText =
      '_Pie_' +
      Math.random()
        .toString(36)
        .substring(7);
  }
  public componentDidMount(): void {
    this.setState({
      _width: this._rootElem!.offsetWidth,
      _height: this._rootElem!.offsetHeight - 32
    });
  }
  public render(): JSX.Element {
    const { data } = this.props;
    const { _width, _height } = this.state;

    const { theme, className, styles, innerRadius } = this.props;
    const { palette } = theme!;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: _width!,
      height: _height!,
      color: this.state.color!,
      className
    });
    const legendBars = this._createLegends(data!, palette);
    const radius = Math.min(_width!, _height!) / 2;
    const outerRadius = radius;
    const chartData = data && data.chartData;
    return (
      <div className={this._classNames.root} ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)}>
        <svg className={this._classNames.chart} ref={(node: SVGElement | null) => this._setViewBox(node)}>
          <Pie
            width={_width!}
            height={_height!}
            outerRadius={outerRadius}
            innerRadius={innerRadius!}
            data={chartData!}
            hoverOnCallback={this._hoverCallback}
            hoverLeaveCallback={this._hoverLeave}
            uniqText={this._uniqText}
            activeArc={this.state.activeLegend}
          />
        </svg>
        {this.state.showHover ? (
          <Callout
            target={'#' + this._uniqText + this.state.legend!.replace(/\s+/, '') + this.state.value}
            coverTarget={true}
            isBeakVisible={false}
            directionalHint={DirectionalHint.bottomRightEdge}
            gapSpace={5}
          >
            <div className={this._classNames.hoverCardRoot}>
              <div className={this._classNames.hoverCardTextStyles}>{this.state.legend}</div>
              <div className={this._classNames.hoverCardDataStyles}>{this.state.value}</div>
            </div>
          </Callout>
        ) : null}
        <div className={this._classNames.legendContainer}>{legendBars}</div>
      </div>
    );
  }

  private _setViewBox(node: SVGElement | null): void {
    if (node === null) {
      return;
    }

    const widthVal = node.parentElement ? node.parentElement.clientWidth : this.state._width;

    const heightVal =
      node.parentElement && node.parentElement.offsetHeight > this.state._height!
        ? node.parentElement.offsetHeight
        : this.state._height;
    const viewbox = `0 0 ${widthVal!} ${heightVal!}`;
    node.setAttribute('viewBox', viewbox);
  }
  private _createLegends(data: IChartProps, palette: IPalette): JSX.Element {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const legendDataItems =
      data &&
      data!.chartData!.map((point: IChartDataPoint, index: number) => {
        const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        // mapping data to the format Legends component needs
        const legend: ILegend = {
          title: point.legend!,
          color: color,
          hoverAction: () => {
            if (this.state.activeLegend !== point.legend || this.state.activeLegend === '') {
              this.setState({ activeLegend: point.legend! });
            } else {
              this.setState({ activeLegend: point.legend });
            }
            this.setState({
              showHover: true,
              value: point.data!.toString(),
              legend: point.legend!,
              color: point.color!
            });
          },
          onMouseOutAction: () => {
            this.setState({
              showHover: false,
              activeLegend: ''
            });
          }
        };
        return legend;
      });
    const legends = <Legends legends={legendDataItems} />;
    return legends;
  }

  private _hoverCallback(data: IChartDataPoint): void {
    this.setState({
      showHover: true,
      value: data.data!.toString(),
      legend: data.legend,
      color: data.color!
    });
  }

  private _hoverLeave(): void {
    this.setState({ showHover: false });
  }
}
