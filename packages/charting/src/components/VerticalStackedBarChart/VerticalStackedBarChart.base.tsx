import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { IChartProps, IChartDataPoint, IDataPoint } from '@uifabric/charting';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { ILegend, Legends } from '../Legends/index';

import {
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles
} from './VerticalStackedBarChart.types';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}
export interface IVerticalStackedBarChartState {
  isCalloutVisible: boolean;
  isLegendSelected: boolean;
  isLegendHovered: boolean;
  selectedLegendTitle: string;
  refSelected: any;
  dataForHoverCard: number;
  color: string;
}

export class VerticalStackedBarChartBase extends React.Component<IVerticalStackedBarChartProps, IVerticalStackedBarChartState> {
  private _points: IChartProps[];
  private _width: number;
  private _height: number;
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalStackedBarChartStyles>;
  private _refArray: any;

  public constructor(props: IVerticalStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      selectedLegendTitle: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: ''
    };
    this._onLegendLeave = this._onLegendLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._refArray = [];
  }

  public render(): JSX.Element {
    this._adjustProps();

    const dataset: IDataPoint[] = this._createDataSetLayer();

    const isNumeric: boolean = dataset.length > 0 && typeof dataset[0].x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis(dataset) : this._createStringXAxis(dataset);
    // const xAxis = this._createDateXAxis();
    const yAxis = this._createYAxis(dataset);
    const bars: JSX.Element[] = [];
    const legends = this._getLegendData(this._points!, this.props.theme!.palette);
    this._points.map((singleChartData: IChartProps, index: number) => {
      const singleChartBar = isNumeric
        ? this._createBars(singleChartData, dataset)
        : this._createStringBars(singleChartData, dataset, index, this.props.href!);
      bars.push(singleChartBar);
    });
    const { isCalloutVisible } = this.state;
    return (
      <div className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <FocusZone direction={FocusZoneDirection.vertical}>
          <svg className={this._classNames.chart}>
            {/** transform: (0, height-margin.bottom) X-axis*/}
            <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} className={this._classNames.xAxis} />
            {/**transform:  (margin.left, 0) Y-Axis*/}
            <g ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)} className={this._classNames.yAxis} />
            <g className={this._classNames.bars}>{bars}</g>
          </svg>
        </FocusZone>
        {<div className={this._classNames.legendContainer}>{legends}</div>}
        {isCalloutVisible ? (
          <Callout
            gapSpace={10}
            isBeakVisible={false}
            target={this.state.refSelected}
            setInitialFocus={true}
            directionalHint={DirectionalHint.topRightEdge}
          >
            <div className={this._classNames.hoverCardRoot}>
              <div className={this._classNames.hoverCardTextStyles}>{this.state.selectedLegendTitle}</div>
              <div className={this._classNames.hoverCardDataStyles}>{this.state.dataForHoverCard}</div>
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];

    this._width = this.props.width || 600;
    this._height = this.props.height || 350;
    this._barWidth = this.props.barWidth || 32;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;

    const { theme, className, styles } = this.props;
    const { palette } = theme!;
    // need to change based on length
    this._colors = this.props.colors || [palette.accent, palette.blueMid, palette.blueLight, palette.red, palette.black];

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className,
      legendColor: this.state.color
    });
  }

  private _createDataSetLayer(): IDataPoint[] {
    const dataset: IDataPoint[] = [];

    this._points!.map((singlePointData: IChartProps) => {
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IChartDataPoint) => {
        total = total + point.data!;
      });
      const singleChartData: IDataPoint = {
        y: total,
        x: singlePointData.xAxisPoint!
      };
      dataset.push(singleChartData);
    });
    return dataset;
  }

  private _createNumericXAxis(dataset: IDataPoint[]): numericAxis {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    // need to calculate min and draw axis from min to max
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width]); // (margins.left, _width - margins.right)
    const xAxis = d3AxisBottom(xAxisScale)
      .ticks(10)
      .tickSize(10)
      .tickSizeOuter(0)
      .tickPadding(10);
    return xAxis;
  }

  private _createStringXAxis(dataset: IDataPoint[]): stringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(dataset.map((point: IDataPoint) => point.x as string))
      .range([0, this._width])
      .padding(0.1);
    const xAxis = d3AxisBottom(xAxisScale)
      .tickFormat((x: string, index: number) => dataset[index].x as string)
      .tickPadding(10);
    return xAxis;
  }

  private _createYAxis(dataset: IDataPoint[]): numericAxis {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;
    const yAxisScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([this._height, 0]); // (_height-margin.bottom, margin.top)
    const yAxis = d3AxisLeft(yAxisScale)
      .ticks(this._yAxisTickCount)
      .tickSizeInner(-this._width)
      .tickPadding(10);
    return yAxis;
  }

  private _onLegendClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.selectedLegendTitle === customMessage) {
        this.setState({
          isLegendSelected: false,
          selectedLegendTitle: customMessage
        });
      } else {
        this.setState({
          selectedLegendTitle: customMessage
        });
      }
    } else {
      this.setState({
        isLegendSelected: true,
        selectedLegendTitle: customMessage
      });
    }
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        selectedLegendTitle: customMessage
      });
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        selectedLegendTitle: '',
        isLegendSelected: !!isLegendFocused ? false : this.state.isLegendSelected
      });
    }
  }

  private _getLegendData = (data: IChartProps[], palette: IPalette): JSX.Element => {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.map((singleChartData: IChartProps, index: number) => {
      const validChartData = singleChartData.chartData!.filter((_: IChartDataPoint) => !_.placeHolder);

      validChartData!.map((point: IChartDataPoint) => {
        const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        const checkSimilarLegends = actions.filter((leg: ILegend) => leg.title === point.legend! && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }
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
          }
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
      />
    );
  };

  private _refCallback(element: SVGRectElement, legendTitle: string, index: number): void {
    this._refArray[index] = { legendText: legendTitle, refElement: element };
  }

  private _onBarHover(customMessage: string, pointData: number, color: string, mouseEvent: React.MouseEvent<SVGPathElement>): void {
    mouseEvent.persist();
    console.log('Bar Hover');
    if (this.state.isLegendSelected === false || (this.state.isLegendSelected && this.state.selectedLegendTitle === customMessage)) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        selectedLegendTitle: customMessage,
        dataForHoverCard: pointData,
        color: color
      });
    }
  }

  private _onBarFocus(legendText: string, pointData: number, color: string, refArrayIndexNumber: number): void {
    if (this.state.isLegendSelected === false || (this.state.isLegendSelected && this.state.selectedLegendTitle === legendText)) {
      this._refArray.map((obj: IRefArrayData, index: number) => {
        if (obj.legendText === legendText && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: legendText,
            dataForHoverCard: pointData,
            color: color
          });
        }
      });
    }
  }

  private _onBarLeave(): void {
    console.log('On Bar leave');
    // this.state.isCalloutVisible &&
    this.setState({
      isCalloutVisible: false
    });
  }

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private _createStringBars(singleChartData: IChartProps, dataset: IDataPoint[], indexNumber: number, href: string): JSX.Element {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const endpointDistance = 0.5 * (this._width / dataset.length);
    const xBarScale = d3ScaleLinear()
      .domain([0, dataset.length - 1])
      .range([endpointDistance - 0.5 * this._barWidth + 5, this._width - endpointDistance - 0.5 * this._barWidth - 5]); // added 5 here
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    let startingPointOfY = 0;
    // single bar chart
    const bar = singleChartData.chartData!.map((point: IChartDataPoint, index: number) => {
      const gap = index >= 1 ? 1 : 0;
      startingPointOfY = startingPointOfY + point.data! + gap;
      const color = point.color ? point.color : this._colors[index];
      const refArrayIndexNumber = indexNumber * singleChartData.chartData!.length + index;

      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }

      const { theme, styles, className } = this.props;
      this._classNames = getClassNames(styles!, {
        theme: theme!,
        width: this._width,
        height: this._height,
        className: className,
        shouldHighlight: shouldHighlight,
        href: href,
        legendColor: this.state.color
      });

      return (
        <rect
          key={index} // change key value
          className={point.placeHolder ? this._classNames.placeHolderOnHover : this._classNames.opacityChangeOnHover}
          x={xBarScale(indexNumber)}
          y={this._height - yBarScale(startingPointOfY)}
          width={this._barWidth}
          height={yBarScale(point.data!)}
          fill={color}
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend!, refArrayIndexNumber);
          }}
          data-is-focusable={true}
          focusable={'true'}
          onMouseOver={point.placeHolder ? undefined : this._onBarHover.bind(this, point.legend!, point.data, color)}
          onMouseMove={point.placeHolder ? undefined : this._onBarHover.bind(this, point.legend!, point.data, color)}
          onMouseLeave={point.placeHolder ? undefined : this._onBarLeave}
          onFocus={this._onBarFocus.bind(this, point.legend!, point.data, color, refArrayIndexNumber)} // chech point.data = null case also
          onBlur={this._onBarLeave}
          onClick={point.placeHolder ? undefined : this._redirectToUrl.bind(this, href)}
        />
      );
    });
    return <g>{bar}</g>;
  }

  private _createBars(singleChartData: IChartProps, dataset: IDataPoint[]): JSX.Element[] {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const xBarScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    let startingPointOfY: number = 0;
    const bar = singleChartData.chartData!.map((point: IChartDataPoint, index: number) => {
      startingPointOfY = startingPointOfY + point.data!;
      const color = point.color!;
      return (
        <rect
          key={index} // check key valeu again
          x={xBarScale(singleChartData.xAxisPoint as number)}
          y={this._height - yBarScale(startingPointOfY)} // startingPoint[index]
          width={this._barWidth}
          height={yBarScale(point.data!)}
          fill={color}
        />
      );
    });
    return bar;
  }

  private _setXAxis(node: SVGGElement | null, xAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(xAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.xAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.xAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.xAxisText!);
  }

  private _setYAxis(node: SVGElement | null, yAxis: numericAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(yAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.yAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.yAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.yAxisText!);
  }

  // private _createDateXAxis = () => {
  //   const xAxisData: Date[] = [];
  //   let sDate = new Date();
  //   let lDate = new Date(-8640000000000000);
  // };
}
