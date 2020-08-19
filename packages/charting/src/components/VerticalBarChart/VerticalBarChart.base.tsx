import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, Legends } from '../Legends/index';
import { createWrapOfXLabels } from '../../utilities/index';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxis: any;
  private _tickPadding: number;
  private _calloutId: string;
  private _removalValue: number = 0;
  private _noOfCharsToTruncate: number;
  private legendContainer: HTMLDivElement;
  private chartContainer: HTMLDivElement;
  private minLegendContainerHeight: number = 32;
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };

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
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <g
              id="xAxisGElement"
              ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)}
              className={this._classNames.xAxis}
              transform={`translate(0, ${svgDimensions.height - this._removalValue - this.margins.bottom})`}
            />
            <g
              id="yAxisGElement"
              ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)}
              className={this._classNames.yAxis}
              transform={`translate(40, 0)`}
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
    this._noOfCharsToTruncate = this.props.noOfCharsToTruncate || 4;
    this._tickPadding = this.props.tickPadding || 10;
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
      .domain([0, xMax])
      .nice()
      .range([this.margins.left + this._barWidth, this.state.containerWidth - this.margins.right - this._barWidth]);
    const xAxis = d3AxisBottom(xAxisScale).tickPadding(this._tickPadding);
    return xAxis;
  }

  private _createStringXAxis(): StringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(this._points.map((point: IVerticalBarChartDataPoint) => point.x as string))
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    const xAxis = d3AxisBottom(xAxisScale)
      .tickFormat((x: string, index: number) => this._points[index].x as string)
      .tickPadding(this._tickPadding);
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
      .range([this.state.containerHeight - this._removalValue - this.margins.bottom, this.margins.top]);
    const yAxis = d3AxisLeft(yAxisScale)
      .tickPadding(5)
      .tickValues(domains)
      .ticks(this._yAxisTickCount, 's')
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
      .domain([0, xMax])
      .nice()
      .range([
        this.margins.left + this._barWidth / 2,
        this.state.containerWidth - this.margins.right - this._barWidth - this._barWidth / 2,
      ]);

    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state.containerHeight - this._removalValue - this.margins.bottom - this.margins.top]);

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
          y={this.state.containerHeight - this._removalValue - this.margins.bottom - yBarScale(point.y)}
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
      .domain([0, this._points.length - 1])
      .range([
        this.margins.left + endpointDistance - 0.5 * this._barWidth,
        this.state.containerWidth - this.margins.right - endpointDistance - 0.5 * this._barWidth,
      ]);

    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this.state.containerHeight - this._removalValue - this.margins.bottom - this.margins.top]);

    const colorScale = this._createColors(yMax);

    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={xBarScale(index)}
          y={this.state.containerHeight - this._removalValue - this.margins.bottom - yBarScale(point.y)}
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
      />
    );
    return legends;
  }

  private _tooltipHandle = () => {
    const that = this;
    if (!this.props.wrapXAxisLables) {
      const temp = document.getElementsByClassName('tooltip-47');
      while (temp[0]) {
        // removing multiple elemnts
        temp[0].remove();
      }
      const div = d3Select('body')
        .append('div')
        .attr('id', 'tooltipId')
        .attr('class', that._classNames.tooltip)
        .style('opacity', 0);
      const tickObject = that._xAxis!.selectAll('.tick')._groups[0];
      const tickObjectLength = Object.keys(tickObject).length;
      for (let i = 0; i < tickObjectLength; i++) {
        const d1 = tickObject[i];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = d3Select(d1).data();
        d3Select(d1)
          .on('mouseover', d => {
            div.style('opacity', 0.9);
            div
              .html(data)
              .style('left', d3Event.pageX + 'px')
              .style('top', d3Event.pageY - 28 + 'px');
          })
          .on('mouseout', d => {
            div.style('opacity', 0);
          });
      }
    }
  };

  private _setXAxis(node: SVGGElement | null, xAxis: NumericAxis | StringAxis): void {
    if (node === null) {
      return;
    }
    this._xAxis = d3Select(node).call(xAxis);

    const wrapLabelProps = {
      node: node,
      xAxis: xAxis,
      showXAxisLablesTooltip: this.props.showXAxisLablesTooltip,
      noOfCharsToTruncate: this._noOfCharsToTruncate,
    };
    let temp = 0;
    if (this.props.showXAxisLablesTooltip || this.props.wrapXAxisLables) {
      temp = createWrapOfXLabels(wrapLabelProps) as number;
    }
    this._removalValue = temp;
    !this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip && this._tooltipHandle();
  }

  private _setYAxis(node: SVGElement | null, yAxis: NumericAxis | StringAxis): void {
    if (node === null) {
      return;
    }
    d3Select(node).call(yAxis);
  }
}
