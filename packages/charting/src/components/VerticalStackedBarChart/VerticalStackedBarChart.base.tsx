import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, Legends } from '../Legends/index';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/index';

import {
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles,
} from './VerticalStackedBarChart.types';
import { IVerticalStackedChartProps, IDataPoint, IVSChartDataPoint } from '../../types/index';
import { createYAxis } from '../../utilities/utilities';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type NumericAxis = D3Axis<number | { valueOf(): number }>;
type StringAxis = D3Axis<string>;
type NumericScale = D3ScaleLinear<number, number>;
type StringScale = D3ScaleLinear<string, string>;

interface IRefArrayData {
  refElement?: SVGGElement | null;
}
interface IVerticalStackedBarChartState {
  containerWidth: number;
  containerHeight: number;
  selectedLegendTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected: any;
  isCalloutVisible: boolean;
  dataPointCalloutProps?: IVSChartDataPoint;
  stackCalloutProps?: IVerticalStackedChartProps;
  isLegendSelected: boolean;
  isLegendHovered: boolean;
}

export class VerticalStackedBarChartBase extends React.Component<
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartState>
{
  private _points: IVerticalStackedChartProps[];
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _calloutId: string;
  private _reqID: number;
  private _classNames: IProcessedStyleSet<IVerticalStackedBarChartStyles>;
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };
  private minLegendContainerHeight: number = 32;
  private _isRtl: boolean = getRTL();

  public constructor(props: IVerticalStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      selectedLegendTitle: '',
      refSelected: null,
      containerHeight: 0,
      containerWidth: 0,
    };
    this._onLegendLeave = this._onLegendLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
  }

  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public componentDidUpdate(prevProps: IVerticalStackedBarChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
    }
  }

  public render(): React.ReactNode {
    this._adjustProps();
    const dataset: IDataPoint[] = this._createDataSetLayer();

    const isNumeric: boolean = dataset.length > 0 && typeof dataset[0].x === 'number';

    const xAxis: NumericAxis | StringAxis = isNumeric
      ? this._createNumericXAxis(dataset)
      : this._createStringXAxis(dataset);
    const legends: JSX.Element = this._getLegendData(this._points, this.props.theme!.palette);
    const bars: JSX.Element[] = this._getBars(this._points, dataset, isNumeric);
    const { isCalloutVisible } = this.state;

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isRtl: this._isRtl,
    });

    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };

    return (
      <div className={this._classNames.root} ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <g
              ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)}
              transform={`translate(0, ${svgDimensions.height - this.margins.bottom})`}
              className={this._classNames.xAxis}
            />
            <g
              ref={(node: SVGGElement | null) => this._createYAxis(dataset, node)}
              transform={`translate(${this._isRtl ? svgDimensions.width - this.margins.right : this.margins.left}, 0)`}
              className={this._classNames.yAxis}
            />
            <g>{bars}</g>
          </svg>
        </FocusZone>
        {
          <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
            {legends}
          </div>
        }
        <Callout
          gapSpace={15}
          isBeakVisible={false}
          target={this.state.refSelected}
          setInitialFocus={true}
          hidden={!(!this.props.hideTooltip && isCalloutVisible)}
          directionalHint={DirectionalHint.topRightEdge}
          id={this._calloutId}
          {...this.props.calloutProps}
        >
          {
            this.props.onRenderCalloutPerStack
              ? this.props.onRenderCalloutPerStack(this.state.stackCalloutProps)
              : this.props.onRenderCalloutPerDataPoint
                ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps, this._renderCallout)
                : this._renderCallout(this.state.dataPointCalloutProps)
          }
        </Callout>
      </div>
    );
  }

  private _renderCallout(props?: IVSChartDataPoint): JSX.Element | null {
    return props ? (
      <ChartHoverCard
        XValue={props.xAxisCalloutData}
        Legend={props.legend}
        YValue={props.yAxisCalloutData}
        color={props.color}
      />
    ) : null;
  }

  private _adjustProps(): void {
    this.margins = { ...this.margins, ...this.props.margins };
    this._points = this.props.data || [];
    this._barWidth = this.props.barWidth || 32;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;
    const { theme } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        (this.legendContainer.getBoundingClientRect().height || this.minLegendContainerHeight) +
        parseFloat(legendContainerComputedStyles.marginTop || '0') +
        parseFloat(legendContainerComputedStyles.marginBottom || '0');

      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - legendContainerHeight,
        });
      }
    });
  }

  private _createDataSetLayer(): IDataPoint[] {
    const dataset: IDataPoint[] = this._points.map(singlePointData => {
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IVSChartDataPoint) => {
        total = total + point.data;
      });
      return {
        x: singlePointData.xAxisPoint,
        y: total,
      };
    });
    return dataset;
  }

  private _createNumericXAxis(dataset: IDataPoint[]): NumericAxis {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    const xAxisScale = d3ScaleLinear()
      .domain(this._isRtl ? [xMax, 0] : [0, xMax])
      .nice()
      // barWIdth/2 = for showing tick exactly middle of the bar
      .range([
        this.margins.left + this._barWidth / 2,
        this.state.containerWidth - this.margins.right - this._barWidth / 2,
      ]);
    const xAxis = d3AxisBottom(xAxisScale)
      .ticks(10)
      .tickSize(10)
      .tickSizeOuter(0)
      .tickPadding(10);
    return xAxis;
  }

  private _createStringXAxis(dataset: IDataPoint[]): StringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(dataset.map((point: IDataPoint) => point.x as string))
      .range(
        this._isRtl
          ? [this.state.containerWidth - this.margins.right, this.margins.left]
          : [this.margins.left, this.state.containerWidth - this.margins.right],
      )
      .padding(0.1);
    const xAxis = d3AxisBottom(xAxisScale)
      .tickFormat((x: string, index: number) => dataset[index].x as string)
      .tickPadding(10);
    return xAxis;
  }

  private _createYAxis(dataset: IDataPoint[], node?: SVGElement | null) {
    const yMax = this._getYMax(dataset);

    return createYAxis({
      margins: this.margins,
      containerWidth: this.state.containerWidth,
      containerHeight: this.state.containerHeight,
      yAxisElement: node,
      yAxisTickFormat: this.props.yAxisTickFormat,
      yAxisTickCount: this._yAxisTickCount,
      maxOfYVal: yMax,
      tickPadding: 10,
    }, this._isRtl)
  }

  private _onLegendClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.selectedLegendTitle === customMessage) {
        this.setState({
          isLegendSelected: false,
          selectedLegendTitle: customMessage,
        });
      } else {
        this.setState({
          selectedLegendTitle: customMessage,
        });
      }
    } else {
      this.setState({
        isLegendSelected: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        selectedLegendTitle: '',
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
    }
  }

  private _getLegendData(data: IVerticalStackedChartProps[], palette: IPalette): JSX.Element {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.forEach((singleChartData: IVerticalStackedChartProps) => {
      singleChartData.chartData.forEach((point: IVSChartDataPoint) => {
        const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        const checkSimilarLegends = actions.filter((leg: ILegend) => leg.title === point.legend && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }

        const legend: ILegend = {
          title: point.legend,
          color: color,
          action: () => {
            this._onLegendClick(point.legend);
          },
          hoverAction: () => {
            this._onLegendHover(point.legend);
          },
          onMouseOutAction: (isLegendSelected?: boolean) => {
            this._onLegendLeave(isLegendSelected);
          },
        };

        actions.push(legend);
      });
    });
    return (
      <Legends
        legends={actions}
        overflowProps={this.props.legendsOverflowProps}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        {...this.props.legendProps}
      />
    );
  }

  private _onStackHover(calloutData: IVerticalStackedChartProps, mouseEvent: React.MouseEvent<SVGGElement>): void {
    mouseEvent.persist();
    this.setState({
      refSelected: mouseEvent,
      isCalloutVisible: true,
      stackCalloutProps: calloutData
    });
  }

  private _onStackFocus(ref: IRefArrayData, calloutData: IVerticalStackedChartProps): void {
    this.setState({
      refSelected: ref.refElement,
      isCalloutVisible: true,
      stackCalloutProps: calloutData
    });
  }

  private _onBarHover(calloutData: IVSChartDataPoint, mouseEvent: React.MouseEvent<SVGGElement>): void {
    mouseEvent.persist();
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === calloutData.legend)
    ) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        dataPointCalloutProps: calloutData
      });
    }
  }

  private _onBarFocus(ref: IRefArrayData, calloutData: IVSChartDataPoint): void {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === calloutData.legend)
    ) {
      this.setState({
        refSelected: ref.refElement,
        isCalloutVisible: true,
        dataPointCalloutProps: calloutData
      });
    }
  }

  private _onBarLeave(): void {
    this.setState({
      isCalloutVisible: false,
    });
  }

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private _createBar(
    singleChartData: IVerticalStackedChartProps,
    xBarScale: NumericScale | StringScale,
    yBarScale: NumericScale,
    indexNumber: number,
    href: string,
    isNumeric: boolean,
  ): JSX.Element {
    let startingPointOfY = 0;
    const nonZeroBars = singleChartData.chartData.filter(point => point.data > 0);
    const xPoint = xBarScale(isNumeric ? singleChartData.xAxisPoint as number : indexNumber);
    const usingPointCallout = !this.props.onRenderCalloutPerStack;
    const stackCalloutData: IVSChartDataPoint[] = [];
    const xAxisCalloutData = singleChartData.xAxisCalloutData || singleChartData.xAxisPoint.toString();

    const bars = nonZeroBars.map((point: IVSChartDataPoint, index: number) => {
      startingPointOfY = startingPointOfY + point.data;
      const color = point.color ? point.color : this._colors[index];
      const ref: IRefArrayData = {};

      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }

      const { theme, styles, className } = this.props;
      this._classNames = getClassNames(styles!, {
        theme: theme!,
        className: className,
        shouldHighlight: shouldHighlight,
        href: href,
      });

      const calloutData: IVSChartDataPoint = {
        xAxisCalloutData: point.xAxisCalloutData || xAxisCalloutData,
        yAxisCalloutData: point.yAxisCalloutData || point.data.toString(),
        color: color,
        data: point.data,
        legend: point.legend
      };

      let focusProps: React.SVGAttributes<SVGRectElement> = {};
      if (usingPointCallout) {
        focusProps = {
          focusable: 'true',
          onMouseOver: this._onBarHover.bind(this, calloutData),
          onMouseMove: this._onBarHover.bind(this, calloutData),
          'aria-labelledby': this._calloutId,
          onMouseLeave: this._onBarLeave,
          onFocus: this._onBarFocus.bind(this, ref, calloutData),
          onBlur: this._onBarLeave,
        };
      } else {
        stackCalloutData.push(calloutData);
      }

      return (
        <rect
          key={index + indexNumber}
          className={this._classNames.opacityChangeOnHover}
          x={xPoint}
          y={this.state.containerHeight - this.margins.bottom - yBarScale(startingPointOfY)}
          width={this._barWidth}
          height={Math.max(yBarScale(point.data), 0)}
          fill={color}
          ref={e => ref.refElement = e}
          data-is-focusable={usingPointCallout || undefined}
          {...focusProps}
          onClick={this._redirectToUrl.bind(this, href)}
        />
      );
    });

    if (!bars.length) {
      return <g key={indexNumber} />;
    }

    let stackFocusProps: React.SVGProps<SVGGElement> = {};
    const groupRef: IRefArrayData = {};
    if (!usingPointCallout) {
      const calloutData: IVerticalStackedChartProps = {
        chartData: stackCalloutData,
        xAxisPoint: singleChartData.xAxisPoint,
        xAxisCalloutData,
      };
      stackFocusProps = {
        focusable: 'true',
        onMouseOver: this._onStackHover.bind(this, calloutData),
        onMouseMove: this._onStackHover.bind(this, calloutData),
        'aria-labelledby': this._calloutId,
        onMouseLeave: this._onBarLeave,
        onFocus: this._onStackFocus.bind(this, groupRef, calloutData),
        onBlur: this._onBarLeave,
      };
    }

    return (
      <g
        key={indexNumber}
        data-is-focusable={!usingPointCallout || undefined}
        {...stackFocusProps}
        ref={e => groupRef.refElement = e}
      >
        {bars}
      </g>
    );
  }

  private _createNumericBars(
    singleChartData: IVerticalStackedChartProps,
    dataset: IDataPoint[],
    indexNumber: number,
    href: string,
  ): JSX.Element {
    const yMax = this._getYMax(dataset);
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;

    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [xMax, 0] : [0, xMax])
      .nice()
      .range([this.margins.left, this.state.containerWidth - this.margins.right - this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state.containerHeight - this.margins.bottom - this.margins.top]);

    return this._createBar(singleChartData, xBarScale, yBarScale, indexNumber, href, true);
  }

  private _createStringBars(
    singleChartData: IVerticalStackedChartProps,
    dataset: IDataPoint[],
    indexNumber: number,
    href: string,
  ): JSX.Element {
    const yMax = this._getYMax(dataset);

    const endpointDistance = 0.5 * ((this.state.containerWidth - this.margins.right) / dataset.length);
    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [dataset.length - 1, 0] : [0, dataset.length - 1])
      .range([
        this.margins.left + endpointDistance - 0.5 * this._barWidth,
        this.state.containerWidth - this.margins.right - endpointDistance - 0.5 * this._barWidth,
      ]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state.containerHeight - this.margins.bottom - this.margins.top]);

    return this._createBar(singleChartData, xBarScale, yBarScale, indexNumber, href, false);
  }

  private _getBars(
    _points: IVerticalStackedChartProps[],
    dataset: IDataPoint[],
    isNumeric: boolean,
  ): JSX.Element[] {
    const bars: JSX.Element[] = _points.map((singleChartData: IVerticalStackedChartProps, index: number) => {
      return isNumeric
        ? this._createNumericBars(singleChartData, dataset, index, this.props.href!)
        : this._createStringBars(singleChartData, dataset, index, this.props.href!);
    });

    return bars;
  }

  private _setXAxis(node: SVGGElement | null, xAxis: NumericAxis | StringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(xAxis);
    axisNode.selectAll('text').attr('class', this._classNames.xAxisText!);
  }

  private _getYMax(dataset: IDataPoint[]) {
    return Math.max(d3Max(dataset, (point: IDataPoint) => point.y)!, this.props.yMaxValue || 0);
  }
}
