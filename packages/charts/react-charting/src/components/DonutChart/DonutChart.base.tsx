import * as React from 'react';
import { classNamesFunction, getId, getRTL, initializeComponentRef } from '@fluentui/react/lib/Utilities';
import { ScaleOrdinal } from 'd3-scale';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '@fluentui/react-focus';
import { IAccessibilityProps, ChartHoverCard, ILegend, Legends } from '../../index';
import { Pie } from './Pie/index';
import { IChartDataPoint, IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './index';
import {
  getAccessibleDataObject,
  getColorFromToken,
  getNextColor,
  getNextGradient,
  areArraysEqual,
  MIN_DONUT_RADIUS,
} from '../../utilities/index';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { IChart, IImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';
import { ILegendContainer } from '../Legends/index';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();
const LEGEND_CONTAINER_HEIGHT = 40;

export interface IDonutChartState {
  showHover?: boolean;
  value?: string | undefined;
  legend?: string | undefined;
  _width?: number | undefined;
  _height?: number | undefined;
  activeLegend?: string;
  color?: string | undefined;
  xCalloutValue?: string;
  yCalloutValue?: string;
  focusedArcId?: string;
  dataPointCalloutProps?: IChartDataPoint;
  callOutAccessibilityData?: IAccessibilityProps;
  selectedLegends: string[];
}

export class DonutChartBase extends React.Component<IDonutChartProps, IDonutChartState> implements IChart {
  public static defaultProps: Partial<IDonutChartProps> = {
    innerRadius: 0,
    hideLabels: true,
  };
  public _colors: ScaleOrdinal<string, {}>;
  private _classNames: IProcessedStyleSet<IDonutChartStyles>;
  private _rootElem: HTMLElement | null;
  private _uniqText: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private _currentHoverElement: any;
  private _calloutId: string;
  private _calloutAnchorPoint: IChartDataPoint | null;
  private _emptyChartId: string | null;
  private _legendsRef: React.RefObject<ILegendContainer>;

  public static getDerivedStateFromProps(
    nextProps: Readonly<IDonutChartProps>,
    prevState: Readonly<IDonutChartState>,
  ): Partial<IDonutChartState> | null {
    let widthState: { _width: number } | undefined;
    if (nextProps.width && nextProps.width !== prevState._width) {
      widthState = { _width: nextProps.width };
    }

    let heightState: { _height: number } | undefined;
    if (nextProps.height && nextProps.height !== prevState._height) {
      heightState = { _height: nextProps.height - LEGEND_CONTAINER_HEIGHT };
    }

    return { ...widthState, ...heightState };
  }

  constructor(props: IDonutChartProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      showHover: false,
      value: '',
      legend: '',
      _width: this.props.width || 200,
      _height: this.props.height || 200,
      activeLegend: undefined,
      color: '',
      xCalloutValue: '',
      yCalloutValue: '',
      focusedArcId: '',
      selectedLegends: props.legendProps?.selectedLegends || [],
    };
    this._hoverCallback = this._hoverCallback.bind(this);
    this._focusCallback = this._focusCallback.bind(this);
    this._hoverLeave = this._hoverLeave.bind(this);
    this._calloutId = getId('callout');
    this._uniqText = getId('_Pie_');
    this._emptyChartId = getId('_DonutChart_empty');
    this._legendsRef = React.createRef();
  }

  public componentDidMount(): void {
    if (this._rootElem) {
      this.setState({
        _width: this._rootElem.offsetWidth,
        _height: this._rootElem.offsetHeight - LEGEND_CONTAINER_HEIGHT,
      });
    }
  }

  public componentDidUpdate(prevProps: IDonutChartProps): void {
    if (!areArraysEqual(prevProps.legendProps?.selectedLegends, this.props.legendProps?.selectedLegends)) {
      this.setState({
        selectedLegends: this.props.legendProps?.selectedLegends || [],
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    const { data, hideLegend = false } = this.props;
    const points = this._addDefaultColors(data?.chartData);

    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      color: this.state.color!,
      className: this.props.className!,
    });

    const legendBars = this._createLegends(points.filter(d => d.data! >= 0));
    const donutMarginHorizontal = this.props.hideLabels ? 0 : 80;
    const donutMarginVertical = this.props.hideLabels ? 0 : 40;
    const outerRadius =
      Math.min(this.state._width! - donutMarginHorizontal, this.state._height! - donutMarginVertical) / 2;
    const chartData = this._elevateToMinimums(points);
    const valueInsideDonut =
      this.props.innerRadius! > MIN_DONUT_RADIUS
        ? this._valueInsideDonut(this.props.valueInsideDonut!, chartData!)
        : '';
    return !this._isChartEmpty() ? (
      <div
        className={this._classNames.root}
        ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)}
        onMouseLeave={this._handleChartMouseLeave}
      >
        {this.props.xAxisAnnotation && (
          <text
            className={this._classNames.axisAnnotation}
            x={this.state._width! / 2}
            y={this.state._height! - 10}
            textAnchor="middle"
          >
            {this.props.xAxisAnnotation}
          </text>
        )}
        <FocusZone
          direction={FocusZoneDirection.horizontal}
          handleTabKey={FocusZoneTabbableElements.all}
          className={this._classNames.chartWrapper}
        >
          <svg
            className={this._classNames.chart}
            aria-label={data?.chartTitle}
            ref={(node: SVGElement | null) => this._setViewBox(node)}
            width={this.state._width}
            height={this.state._height}
          >
            <Pie
              width={this.state._width!}
              height={this.state._height!}
              outerRadius={outerRadius}
              innerRadius={this.props.innerRadius!}
              data={chartData!}
              enableGradient={this.props.enableGradient}
              roundCorners={this.props.roundCorners}
              onFocusCallback={this._focusCallback}
              hoverOnCallback={this._hoverCallback}
              hoverLeaveCallback={this._hoverLeave}
              uniqText={this._uniqText}
              onBlurCallback={this._onBlur}
              activeArc={this._getHighlightedLegend()}
              focusedArcId={this.state.focusedArcId || ''}
              href={this.props.href!}
              calloutId={this._calloutId}
              valueInsideDonut={this._toLocaleString(valueInsideDonut)}
              theme={this.props.theme!}
              showLabelsInPercent={this.props.showLabelsInPercent}
              hideLabels={this.props.hideLabels}
            />
          </svg>
        </FocusZone>
        <Callout
          target={this._currentHoverElement}
          alignTargetEdge={true}
          isBeakVisible={false}
          directionalHint={DirectionalHint.topAutoEdge}
          gapSpace={15}
          hidden={!(!this.props.hideTooltip && this.state.showHover)}
          id={this._calloutId}
          onDismiss={this._closeCallout}
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          preventDismissOnLostFocus={true}
          /** Keep the callout updated with details of focused/hovered arc */
          shouldUpdateWhenHidden={true}
          {...this.props.calloutProps!}
          {...getAccessibleDataObject(this.state.callOutAccessibilityData, 'text', false)}
        >
          {this.props.onRenderCalloutPerDataPoint ? (
            this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps!)
          ) : (
            <ChartHoverCard
              Legend={this.state.xCalloutValue ? this.state.xCalloutValue : this.state.legend}
              YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.value}
              color={this.state.color}
              culture={this.props.culture}
            />
          )}
        </Callout>
        {!hideLegend && <div className={this._classNames.legendContainer}>{legendBars}</div>}
      </div>
    ) : (
      <div
        id={this._emptyChartId!}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  public get chartContainer(): HTMLElement | null {
    return this._rootElem;
  }

  public toImage = (opts?: IImageExportOptions): Promise<string> => {
    return toImage(this._rootElem, this._legendsRef.current?.toSVG, getRTL(), opts);
  };

  private _closeCallout = () => {
    this.setState({
      showHover: false,
    });
  };

  private _elevateToMinimums(data: IChartDataPoint[]) {
    let sumOfData = 0;
    const minPercent = 0.01;
    const elevatedData: IChartDataPoint[] = [];
    data.forEach(item => {
      sumOfData += item.data!;
    });
    data.forEach(item => {
      elevatedData.push(
        minPercent * sumOfData > item.data! && item.data! > 0
          ? {
              ...item,
              data: minPercent * sumOfData,
              yAxisCalloutData:
                item.yAxisCalloutData === undefined ? item.data!.toLocaleString() : item.yAxisCalloutData,
            }
          : item,
      );
    });
    return elevatedData;
  }
  private _setViewBox(node: SVGElement | null): void {
    if (node === null) {
      return;
    }

    const widthVal = node.parentElement ? node.parentElement.clientWidth : this.state._width;

    const heightVal =
      node.parentElement && node.parentElement?.offsetHeight > this.state._height!
        ? node.parentElement?.offsetHeight
        : this.state._height;
    const viewbox = `0 0 ${widthVal!} ${heightVal!}`;
    node.setAttribute('viewBox', viewbox);
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _createLegends(chartData: IChartDataPoint[]): JSX.Element {
    if (this.props.order === 'sorted') {
      chartData.sort((a: IChartDataPoint, b: IChartDataPoint) => {
        return b.data! - a.data!;
      });
    }
    const legendDataItems = chartData.map((point: IChartDataPoint, index: number) => {
      const color: string = this.props.enableGradient
        ? point.gradient?.[0] || getNextGradient(index, 0, this.props.theme?.isInverted)[0]
        : point.color!;

      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color,
        hoverAction: () => {
          this._handleChartMouseLeave();
          this.setState({ activeLegend: point.legend! });
        },
        onMouseOutAction: () => {
          this.setState({ activeLegend: undefined });
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
        {...this.props.legendProps}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={this._onLegendSelectionChange.bind(this)}
        ref={this._legendsRef}
      />
    );
    return legends;
  }

  private _onLegendSelectionChange(
    selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
  ): void {
    if (this.props.legendProps && this.props.legendProps?.canSelectMultipleLegends) {
      this.setState({ selectedLegends });
    } else {
      this.setState({ selectedLegends: selectedLegends.slice(-1) });
    }
    if (this.props.legendProps?.onChange) {
      this.props.legendProps.onChange(selectedLegends, event, currentLegend);
    }
  }

  private _focusCallback = (data: IChartDataPoint, id: string, element: SVGPathElement): void => {
    this._currentHoverElement = element;
    this.setState({
      /** Show the callout if highlighted arc is focused and Hide it if unhighlighted arc is focused */
      showHover: this._noLegendsHighlighted() || this._isLegendHighlighted(data.legend),
      value: data.data!.toString(),
      legend: data.legend,
      color: data.color!,
      xCalloutValue: data.xAxisCalloutData!,
      yCalloutValue: data.yAxisCalloutData!,
      focusedArcId: id,
      dataPointCalloutProps: data,
      callOutAccessibilityData: data.callOutAccessibilityData!,
    });
  };

  private _hoverCallback = (data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void => {
    if (this._calloutAnchorPoint !== data) {
      this._calloutAnchorPoint = data;
      this._currentHoverElement = e;
      let color: string = data.color!;

      if (this.props.enableGradient) {
        const pointIndex = Math.max(this.props.data?.chartData?.findIndex(item => item.legend === data.legend) || 0, 0);
        color = data.gradient?.[0] || getNextGradient(pointIndex, 0, this.props.theme?.isInverted)[0];
      }

      this.setState({
        /** Show the callout if highlighted arc is hovered and Hide it if unhighlighted arc is hovered */
        showHover: this._noLegendsHighlighted() || this._isLegendHighlighted(data.legend),
        value: data.data!.toString(),
        legend: data.legend,
        color,
        xCalloutValue: data.xAxisCalloutData!,
        yCalloutValue: data.yAxisCalloutData!,
        dataPointCalloutProps: data,
        callOutAccessibilityData: data.callOutAccessibilityData!,
      });
    }
  };
  private _onBlur = (): void => {
    this.setState({ focusedArcId: '' });
  };

  private _hoverLeave(): void {
    /**/
  }

  private _handleChartMouseLeave = () => {
    this._calloutAnchorPoint = null;
    this.setState({ showHover: false });
  };

  private _valueInsideDonut(valueInsideDonut: string | number | undefined, data: IChartDataPoint[]) {
    const highlightedLegends = this._getHighlightedLegend();
    if (valueInsideDonut !== undefined && (highlightedLegends.length === 1 || this.state.showHover)) {
      const pointValue = data.find(point => this._isLegendHighlighted(point.legend));
      return pointValue
        ? pointValue.yAxisCalloutData
          ? pointValue.yAxisCalloutData
          : pointValue.data!
        : valueInsideDonut;
    } else if (highlightedLegends.length > 0) {
      let totalValue = 0;
      data.forEach(point => {
        if (highlightedLegends.includes(point.legend!)) {
          totalValue += point.data!;
        }
      });
      return totalValue;
    } else {
      return valueInsideDonut;
    }
  }

  private _toLocaleString(data: string | number | undefined) {
    const localeString = formatToLocaleString(data, this.props.culture, this.props.useUTC);
    if (!localeString) {
      return data;
    }
    return localeString?.toString();
  }

  /**
   * This function returns
   * the selected legend if there is one
   * or the hovered legend if none of the legends is selected.
   */
  private _getHighlightedLegend() {
    return this.state.selectedLegends.length > 0
      ? this.state.selectedLegends
      : this.state.activeLegend
      ? [this.state.activeLegend]
      : [];
  }

  private _isLegendHighlighted = (legend: string | undefined): boolean => {
    return this._getHighlightedLegend().includes(legend!);
  };

  private _noLegendsHighlighted = (): boolean => {
    return this._getHighlightedLegend().length === 0;
  };

  private _isChartEmpty(): boolean {
    return !(
      this.props.data &&
      this.props.data.chartData &&
      this.props.data.chartData!.filter((d: IChartDataPoint) => d.data! > 0).length > 0
    );
  }

  private _addDefaultColors = (donutChartDataPoint?: IChartDataPoint[]): IChartDataPoint[] => {
    return donutChartDataPoint
      ? donutChartDataPoint.map((item, index) => {
          let color: string;
          // isInverted property is applicable to v8 themes only
          if (typeof item.color === 'undefined') {
            color = getNextColor(index, 0, this.props.theme?.isInverted);
          } else {
            color = getColorFromToken(item.color, this.props.theme?.isInverted);
          }

          return { ...item, color };
        })
      : [];
  };
}
