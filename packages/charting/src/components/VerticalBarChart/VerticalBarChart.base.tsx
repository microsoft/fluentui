import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisRight as d3AxisRight, axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { format as d3Format } from 'd3-format';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, Legends } from '../Legends/index';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/index';

import {
  IVerticalBarChartProps,
  IVerticalBarChartStyleProps,
  IVerticalBarChartStyles,
  IVerticalBarChartDataPoint,
} from './VerticalBarChart.types';

const getClassNames = classNamesFunction<IVerticalBarChartStyleProps, IVerticalBarChartStyles>();
type NumericAxis = D3Axis<number | { valueOf(): number }>;
type StringAxis = D3Axis<string>;

export interface IVerticalBarChartState {
  color: string;
  containerWidth: number;
  containerHeight: number;
  dataForHoverCard: number;
  isCalloutVisible: boolean;
  isLegendSelected: boolean;
  isLegendHovered: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected: any;
  selectedLegendTitle: string;
  xCalloutValue?: string;
  yCalloutValue?: string;
  _width?: number;
  _height?: number;
}

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export class VerticalBarChartBase extends React.Component<IVerticalBarChartProps, IVerticalBarChartState> {
  private _points: IVerticalBarChartDataPoint[];
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalBarChartStyles>;
  private _refArray: IRefArrayData[];
  private _reqID: number;
  private _calloutId: string;
  private legendContainer: HTMLDivElement;
  private chartContainer: HTMLDivElement;
  private minLegendContainerHeight: number = 32;
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };
  private _isRtl: boolean = getRTL();

  public constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      color: '',
      containerWidth: 0,
      containerHeight: 0,
      dataForHoverCard: 0,
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      selectedLegendTitle: '',
      xCalloutValue: '',
      yCalloutValue: '',
      _width: this.props.width || 600,
      _height: this.props.height || 350,
    };
    this._calloutId = getId('callout');
    this._refArray = [];
  }

  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentDidUpdate(prevProps: IVerticalBarChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
    }
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public render(): JSX.Element {
    this._adjustProps();
    const { theme, className, styles, hideLegend = false } = this.props;

    const isNumeric = this._points.length > 0 && typeof this._points[0].x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis() : this._createStringXAxis();
    const yAxis = this._createYAxis();
    const bars = isNumeric ? this._createNumericBars() : this._createStringBars();
    let legends: JSX.Element;
    if (!hideLegend) {
      legends = this._getLegendData(this._points, this.props.theme!.palette);
    }

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      width: this.state._width,
      height: this.state._height,
      legendColor: this.state.color,
      isRtl: this._isRtl,
    });

    const svgDimensions = {
      width: this.state.containerWidth || 600,
      height: this.state.containerHeight || 350,
    };

    return (
      <div
        id="VerticalBarChart"
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        className={this._classNames.root}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg width={svgDimensions.width} height={svgDimensions.height} style={{display: "block" }}>
            <g
              id="xAxisGElement"
              ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)}
              className={this._classNames.xAxis}
              transform={`translate(0, ${svgDimensions.height - this.margins.bottom})`}
            />
            <g
              id="yAxisGElement"
              ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)}
              className={this._classNames.yAxis}
              transform={`translate(${this._isRtl ? svgDimensions.width - this.margins.right - 10 : 40}, 0)`}
            />
            <g id="barGElement">{bars}</g>
          </svg>
        </FocusZone>
        {!hideLegend && (
          <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
            {legends!}
          </div>
        )}
        <Callout
          gapSpace={10}
          isBeakVisible={false}
          target={this.state.refSelected}
          setInitialFocus={true}
          hidden={!(!this.props.hideTooltip && this.state.isCalloutVisible)}
          directionalHint={DirectionalHint.topRightEdge}
          id={this._calloutId}
        >
          <ChartHoverCard
            XValue={this.state.xCalloutValue}
            Legend={this.state.selectedLegendTitle}
            YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard}
            color={this.state.color}
          />
        </Callout>
      </div>
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barWidth = this.props.barWidth || 32;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;
    const { palette } = this.props.theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    const { hideLegend = false } = this.props;

    this._reqID = requestAnimationFrame(() => {
      let legendContainerHeight;
      if (hideLegend) {
        legendContainerHeight = 32;
      } else {
        const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
        legendContainerHeight =
          (this.legendContainer.getBoundingClientRect().height || (!hideLegend ? this.minLegendContainerHeight : 0)) +
          parseFloat(legendContainerComputedStyles.marginTop || '0') +
          parseFloat(legendContainerComputedStyles.marginBottom || '0');
      }

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

  private _createNumericXAxis(): NumericAxis {
    const xMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
    const xAxisScale = d3ScaleLinear()
      .domain(this._isRtl ? [xMax, 0] : [0, xMax])
      .nice()
      .range([this.margins.left + this._barWidth, this.state.containerWidth - this.margins.right - this._barWidth]);
    const xAxis = d3AxisBottom(xAxisScale).tickPadding(10);
    return xAxis;
  }

  private _createStringXAxis(): StringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(this._points.map((point: IVerticalBarChartDataPoint) => point.x as string))
      .range(
        this._isRtl
          ? [this.state.containerWidth - this.margins.right, this.margins.left]
          : [this.margins.left, this.state.containerWidth - this.margins.right],
      );
    const xAxis = d3AxisBottom(xAxisScale)
      .tickFormat((x: string, index: number) => this._points[index].x as string)
      .tickPadding(10);
    return xAxis;
  }

  private _createYAxis(): NumericAxis {
    const yMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.y)!;
    const interval = Math.ceil(yMax / this._yAxisTickCount);
    const domains: Array<number> = [0];
    while (domains[domains.length - 1] < yMax) {
      domains.push(domains[domains.length - 1] + interval);
    }
    const yAxisScale = d3ScaleLinear()
      .domain([0, domains[domains.length - 1]])
      .range([this.state.containerHeight - this.margins.bottom, this.margins.top]);
    const axis = this._isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
    const yAxis = axis
      .tickPadding(5)
      .tickValues(domains)
      .tickFormat(d3Format('.2~s'))
      .tickSizeInner(-(this.state.containerWidth - this.margins.left - this.margins.right));
    return yAxis;
  }

  private _createColors(yMax: number): D3ScaleLinear<string, string> {
    const increment = this._colors.length <= 1 ? 1 : 1 / (this._colors.length - 1);
    const domainValues = [];
    for (let i = 0; i < this._colors.length; i++) {
      domainValues.push(increment * i * yMax);
    }
    const colorScale = d3ScaleLinear<string>()
      .domain(domainValues)
      .range(this._colors);
    return colorScale;
  }

  private _refCallback = (element: SVGRectElement, legendTitle: string, index: number): void => {
    const refArray = { legendText: legendTitle, refElement: element };
    this._refArray.push(refArray);
  };

  private _onBarHover(
    customMessage: string,
    xVal: string,
    pointData: number,
    color: string,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ): void {
    mouseEvent.persist();
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === customMessage)
    ) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        dataForHoverCard: pointData,
        selectedLegendTitle: customMessage,
        color: color,
        xCalloutValue: xAxisCalloutData ? xAxisCalloutData : xVal,
        yCalloutValue: yAxisCalloutData,
      });
    }
  }

  private _onBarLeave = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onBarFocus = (
    legendText: string,
    xVal: string,
    pointData: number,
    color: string,
    refArrayIndexNumber: number,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void => {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === legendText)
    ) {
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (obj.legendText === legendText && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: legendText,
            dataForHoverCard: pointData,
            color: color,
            xCalloutValue: xAxisCalloutData ? xAxisCalloutData : xVal,
            yCalloutValue: yAxisCalloutData,
          });
        }
      });
    }
  };

  private _createNumericBars(): JSX.Element[] {
    const xMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
    const yMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.y)!;
    const { theme, className, styles } = this.props;

    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [xMax, 0] : [0, xMax])
      .nice()
      .range([
        this.margins.left + this._barWidth / 2,
        this.state.containerWidth - this.margins.right - this._barWidth - this._barWidth / 2,
      ]);

    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state.containerHeight - this.margins.bottom - this.margins.top]);

    const colorScale = this._createColors(yMax);
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }
      const refArrayIndexNumber = index;

      this._classNames = getClassNames(styles!, {
        theme: theme!,
        width: this.state._width,
        height: this.state._height,
        className: className,
        shouldHighlight: shouldHighlight,
        legendColor: this.state.color,
      });
      return (
        <rect
          key={point.x}
          x={xBarScale(point.x as number)}
          className={this._classNames.opacityChangeOnHover}
          y={this.state.containerHeight - this.margins.bottom - yBarScale(point.y)}
          width={this._barWidth}
          data-is-focusable={true}
          height={yBarScale(point.y) > 0 ? yBarScale(point.y) : 0}
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend!, refArrayIndexNumber);
          }}
          onMouseOver={this._onBarHover.bind(
            this,
            point.legend,
            point.x,
            point.y,
            point.color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          aria-labelledby={this._calloutId}
          onMouseLeave={this._onBarLeave}
          onFocus={this._onBarFocus.bind(
            this,
            point.legend,
            point.x,
            point.y,
            point.color,
            refArrayIndexNumber,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onBlur={this._onBarLeave}
          fill={point.color ? point.color : colorScale(point.y)}
        />
      );
    });

    return bars;
  }

  private _createStringBars(): JSX.Element[] {
    const yMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.y)!;

    const endpointDistance = 0.5 * ((this.state.containerWidth - this.margins.right) / this._points.length);
    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [this._points.length - 1, 0] : [0, this._points.length - 1])
      .range([
        this.margins.left + endpointDistance - 0.5 * this._barWidth,
        this.state.containerWidth - this.margins.right - endpointDistance - 0.5 * this._barWidth,
      ]);

    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state.containerHeight - this.margins.bottom - this.margins.top]);

    const colorScale = this._createColors(yMax);

    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={xBarScale(index)}
          y={this.state.containerHeight - this.margins.bottom - yBarScale(point.y)}
          width={this._barWidth}
          height={yBarScale(point.y) > 0 ? yBarScale(point.y) : 0}
          aria-labelledby={this._calloutId}
          onMouseOver={this._onBarHover.bind(
            this,
            point.legend!,
            point.x,
            point.y,
            point.color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onMouseLeave={this._onBarLeave}
          onBlur={this._onBarLeave}
          fill={point.color ? point.color : colorScale(point.y)}
        />
      );
    });

    return bars;
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

  private _getLegendData(data: IVerticalBarChartDataPoint[], palette: IPalette): JSX.Element {
    const actions: ILegend[] = [];
    data.forEach((point: IVerticalBarChartDataPoint, _index: number) => {
      const color: string = point.color!;
      // mapping data to the format Legends component needs

      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          this._onLegendClick(point.legend!);
        },
        hoverAction: () => {
          this._onLegendHover(point.legend!);
        },
        onMouseOutAction: (isLegendSelected?: boolean) => {
          this._onLegendLeave(isLegendSelected);
        },
      };
      actions.push(legend);
    });
    const legends = (
      <Legends
        legends={actions}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
      />
    );
    return legends;
  }

  private _setXAxis(node: SVGGElement | null, xAxis: NumericAxis | StringAxis): void {
    if (node === null) {
      return;
    }
    d3Select(node).call(xAxis);
  }

  private _setYAxis(node: SVGElement | null, yAxis: NumericAxis | StringAxis): void {
    if (node === null) {
      return;
    }
    d3Select(node).call(yAxis);
  }
}
