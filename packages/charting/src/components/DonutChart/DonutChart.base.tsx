import * as React from 'react';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { Pie } from './Pie/Pie';
import { ILegend, Legends } from '../Legends/index';
import * as scale from 'd3-scale';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { IChartDataPoint, IChartProps } from './index';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/index';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();

interface IDonutChartState {
  showHover?: boolean;
  value?: string | undefined;
  legend?: string | undefined;
  _width?: number | undefined;
  _height?: number | undefined;
  activeLegend?: string;
  color?: string | undefined;
  isLegendSelected?: boolean;
  xCalloutValue?: string;
  yCalloutValue?: string;
  focusedArcId?: string;
  selectedLegend: string;
}

export class DonutChartBase extends React.Component<IDonutChartProps, IDonutChartState> {
  public static defaultProps: Partial<IDonutChartProps> = {
    innerRadius: 0,
  };
  public _colors: scale.ScaleOrdinal<string, {}>;
  private _classNames: IProcessedStyleSet<IDonutChartStyles>;
  private _rootElem: HTMLElement | null;
  private _uniqText: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private _currentHoverElement: any;
  private _calloutId: string;

  public static getDerivedStateFromProps(
    nextProps: Readonly<IDonutChartProps>,
    prevState: Readonly<IDonutChartState>,
  ): Partial<IDonutChartState> | null {
    if (nextProps.height && nextProps.height !== prevState._height && nextProps.width !== prevState._width) {
      const reducedHeight = nextProps.height / 5;
      return { _width: nextProps.width, _height: nextProps.height - reducedHeight };
    }
    return null;
  }

  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      showHover: false,
      value: '',
      legend: '',
      _width: this.props.width || 200,
      _height: this.props.height || 200,
      activeLegend: '',
      color: '',
      isLegendSelected: false,
      xCalloutValue: '',
      yCalloutValue: '',
      selectedLegend: 'none',
    };
    this._hoverCallback = this._hoverCallback.bind(this);
    this._focusCallback = this._focusCallback.bind(this);
    this._hoverLeave = this._hoverLeave.bind(this);
    this._calloutId = getId('callout');
    this._uniqText =
      '_Pie_' +
      Math.random()
        .toString(36)
        .substring(7);
  }
  public componentDidMount(): void {
    /* 80% Height to the Chart
       20% Height to the Legends
    */
    const reducedHeight = this._rootElem!.offsetHeight / 5;
    this.setState({
      _width: this._rootElem!.offsetWidth,
      _height: this._rootElem!.offsetHeight - reducedHeight,
    });
  }
  public render(): JSX.Element {
    const { data, href, hideLegend = false } = this.props;
    const { _width, _height } = this.state;

    const { theme, className, styles, innerRadius, valueInsideDonut } = this.props;
    const { palette } = theme!;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: _width!,
      height: _height!,
      color: this.state.color!,
      className,
    });
    const legendBars = this._createLegends(data!, palette);
    const radius = Math.min(_width!, _height!) / 2;
    const outerRadius = radius;
    const chartData = data && data.chartData;
    return (
      <div className={this._classNames.root} ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)}>
        <FocusZone direction={FocusZoneDirection.horizontal} isCircularNavigation={true}>
          <div>
            <svg className={this._classNames.chart} ref={(node: SVGElement | null) => this._setViewBox(node)}>
              <Pie
                width={_width!}
                height={_height!}
                outerRadius={outerRadius}
                innerRadius={innerRadius!}
                data={chartData!}
                onFocusCallback={this._focusCallback}
                hoverOnCallback={this._hoverCallback}
                hoverLeaveCallback={this._hoverLeave}
                uniqText={this._uniqText}
                onBlurCallback={this._onBlur}
                activeArc={this.state.activeLegend}
                focusedArcId={this.state.focusedArcId || ''}
                href={href}
                calloutId={this._calloutId}
                valueInsideDonut={this._valueInsideDonut(valueInsideDonut!, chartData!)}
                theme={theme!}
              />
            </svg>
          </div>
        </FocusZone>
        <Callout
          target={this._currentHoverElement}
          alignTargetEdge={true}
          isBeakVisible={false}
          directionalHint={DirectionalHint.bottomRightEdge}
          gapSpace={15}
          hidden={!(!this.props.hideTooltip && this.state.showHover)}
          id={this._calloutId}
          onDismiss={this._closeCallout}
          preventDismissOnLostFocus={true}
        >
          <ChartHoverCard
            Legend={this.state.xCalloutValue ? this.state.xCalloutValue : this.state.legend}
            YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.value}
            color={this.state.color}
          />
        </Callout>
        <div className={this._classNames.legendContainer}>{!hideLegend && legendBars}</div>
      </div>
    );
  }

  private _closeCallout = () => {
    this.setState({
      showHover: false,
    });
  };

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
          action: () => {
            if (this.state.isLegendSelected) {
              if (this.state.activeLegend !== point.legend || this.state.activeLegend === '') {
                this.setState({ activeLegend: point.legend!, isLegendSelected: true });
              } else {
                this.setState({ activeLegend: point.legend });
              }
            } else {
              this.setState({ activeLegend: point.legend!, isLegendSelected: true });
            }
          },
          hoverAction: () => {
            if (this.state.activeLegend !== point.legend || this.state.activeLegend === '') {
              this.setState({ activeLegend: point.legend! });
            } else {
              this.setState({ activeLegend: point.legend });
            }
          },
          onMouseOutAction: () => {
            this.setState({
              showHover: false,
              activeLegend: '',
            });
          },
        };
        return legend;
      });
    const legends = (
      <Legends
        legends={legendDataItems}
        centerLegends
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        selectedLegend={this.state.selectedLegend}
      />
    );
    return legends;
  }

  private _focusCallback = (data: IChartDataPoint, id: string, element: SVGPathElement): void => {
    this._currentHoverElement = element;
    this.setState({
      showHover: true,
      value: data.data!.toString(),
      legend: data.legend,
      activeLegend: data.legend,
      color: data.color!,
      selectedLegend: data.legend!,
      xCalloutValue: data.xAxisCalloutData!,
      yCalloutValue: data.yAxisCalloutData!,
      focusedArcId: id,
    });
  };

  private _hoverCallback = (data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void => {
    this._currentHoverElement = e;
    this.setState({
      showHover: true,
      value: data.data!.toString(),
      selectedLegend: data.legend!,
      legend: data.legend,
      color: data.color!,
      xCalloutValue: data.xAxisCalloutData!,
      yCalloutValue: data.yAxisCalloutData!,
      activeLegend: data.legend,
    });
  };
  private _onBlur = (): void => {
    this.setState({ showHover: false, focusedArcId: '', activeLegend: '', selectedLegend: 'none' });
  };

  private _hoverLeave(): void {
    this.setState({ showHover: false, activeLegend: '', selectedLegend: 'none', focusedArcId: '' });
  }

  private _valueInsideDonut(valueInsideDonut: string | number | undefined, data: IChartDataPoint[]) {
    if (valueInsideDonut !== undefined && this.state.activeLegend !== '' && !this.state.showHover) {
      let legendValue = valueInsideDonut;
      data!.map((point: IChartDataPoint, index: number) => {
        if (point.legend === this.state.activeLegend) {
          legendValue = point.yAxisCalloutData ? point.yAxisCalloutData : point.data!;
        }
        return;
      });
      return legendValue;
    } else {
      return valueInsideDonut;
    }
  }
}
