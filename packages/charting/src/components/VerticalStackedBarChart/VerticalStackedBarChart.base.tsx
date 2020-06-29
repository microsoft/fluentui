import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, Legends } from '../Legends/index';
import { ChartHoverCard } from '@uifabric/charting';

import {
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles,
} from './VerticalStackedBarChart.types';
import { IVerticalStackedChartProps, IDataPoint, IVSChartDataPoint } from '../../types/index';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;
type numericScale = D3ScaleLinear<number, number>;
type stringScale = D3ScaleLinear<string, string>;

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}
export interface IVerticalStackedBarChartState {
  color: string;
  dataForHoverCard: number;
  selectedLegendTitle: string;
  // tslint:disable-next-line:no-any
  refSelected: any;
  isCalloutVisible: boolean;
  isLegendSelected: boolean;
  isLegendHovered: boolean;
  xCalloutValue?: string;
  yCalloutValue?: string;
}

export class VerticalStackedBarChartBase extends React.Component<
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartState
> {
  private _points: IVerticalStackedChartProps[];
  private _width: number;
  private _height: number;
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _calloutId: string;
  private _classNames: IProcessedStyleSet<IVerticalStackedBarChartStyles>;
  private _refArray: IRefArrayData[];

  public constructor(props: IVerticalStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      selectedLegendTitle: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: '',
      xCalloutValue: '',
      yCalloutValue: '',
    };
    this._onLegendLeave = this._onLegendLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
    this._refArray = [];
    this._adjustProps();
  }

  public render(): React.ReactNode {
    const dataset: IDataPoint[] = this._createDataSetLayer();

    const isNumeric: boolean = dataset.length > 0 && typeof dataset[0].x === 'number';

    const xAxis: numericAxis | stringAxis = isNumeric
      ? this._createNumericXAxis(dataset)
      : this._createStringXAxis(dataset);
    const yAxis: numericAxis = this._createYAxis(dataset);
    const legends: JSX.Element = this._getLegendData(this._points, this.props.theme!.palette);
    const bars: JSX.Element[] = this._getBars(this._points, dataset, isNumeric);
    const { isCalloutVisible } = this.state;

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className,
      legendColor: this.state.color,
    });
    return (
      <div className={this._classNames.root}>
        {this.props.chartLabel && <p className={this._classNames.chartLabel}>{this.props.chartLabel}</p>}
        <FocusZone direction={FocusZoneDirection.vertical}>
          <svg className={this._classNames.chart}>
            <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} className={this._classNames.xAxis} />
            <g ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)} className={this._classNames.yAxis} />
            <g className={this._classNames.bars}>{bars}</g>
          </svg>
        </FocusZone>
        {<div className={this._classNames.legendContainer}>{legends}</div>}
        <Callout
          gapSpace={15}
          isBeakVisible={false}
          target={this.state.refSelected}
          setInitialFocus={true}
          hidden={!(!this.props.hideTooltip && isCalloutVisible)}
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

    this._width = this.props.width || 600;
    this._height = this.props.height || 350;
    this._barWidth = this.props.barWidth || 32;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;

    const { theme } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
  }

  private _createDataSetLayer(): IDataPoint[] {
    const dataset: IDataPoint[] = [];

    this._points.map((singlePointData: IVerticalStackedChartProps) => {
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IVSChartDataPoint) => {
        total = total + point.data;
      });
      const singleBarDataPoint: IDataPoint = {
        x: singlePointData.xAxisPoint,
        y: total,
      };
      dataset.push(singleBarDataPoint);
    });
    return dataset;
  }

  private _createNumericXAxis(dataset: IDataPoint[]): numericAxis {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      // barWIdth/2 = for showing tick exactly middle of the bar
      .range([this._barWidth / 2, this._width - this._barWidth / 2]);
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
    const interval = Math.ceil(yMax / this._yAxisTickCount);
    const domains: Array<number> = [0];
    while (domains[domains.length - 1] < yMax) {
      domains.push(domains[domains.length - 1] + interval);
    }
    const yAxisScale = d3ScaleLinear()
      .domain([0, domains[domains.length - 1]])
      .range([this._height, 0]);
    const yAxis = d3AxisLeft(yAxisScale)
      .tickSizeInner(-this._width)
      .tickPadding(10)
      .tickValues(domains);
    return yAxis;
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
        isLegendSelected: !!isLegendFocused ? false : this.state.isLegendSelected,
      });
    }
  }

  private _getLegendData = (data: IVerticalStackedChartProps[], palette: IPalette): JSX.Element => {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.map((singleChartData: IVerticalStackedChartProps) => {
      singleChartData.chartData.map((point: IVSChartDataPoint) => {
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
      />
    );
  };

  private _refCallback(element: SVGRectElement, legendTitle: string, index: number): void {
    this._refArray[index] = { legendText: legendTitle, refElement: element };
  }

  private _onBarHover(
    customMessage: string,
    xAxisPoint: string,
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
        selectedLegendTitle: customMessage,
        dataForHoverCard: pointData,
        color: color,
        xCalloutValue: xAxisCalloutData ? xAxisCalloutData : xAxisPoint,
        yCalloutValue: yAxisCalloutData,
      });
    }
  }

  private _onBarFocus(
    legendText: string,
    xAxisPoint: string,
    pointData: number,
    color: string,
    refArrayIndexNumber: number,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === legendText)
    ) {
      this._refArray.map((obj: IRefArrayData, index: number) => {
        if (obj.legendText === legendText && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: legendText,
            dataForHoverCard: pointData,
            color: color,
            xCalloutValue: xAxisCalloutData ? xAxisCalloutData : xAxisPoint,
            yCalloutValue: yAxisCalloutData,
          });
        }
      });
    }
  }

  private _onBarLeave = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private createBar = (
    singleChartData: IVerticalStackedChartProps,
    xBarScale: numericScale | stringScale,
    yBarScale: numericScale,
    indexNumber: number,
    href: string,
    isNumeric: boolean,
  ): JSX.Element => {
    let startingPointOfY = 0;
    const bar = singleChartData.chartData.map((point: IVSChartDataPoint, index: number) => {
      startingPointOfY = startingPointOfY + point.data;
      const color = point.color ? point.color : this._colors[index];
      const refArrayIndexNumber = indexNumber * singleChartData.chartData.length + index;

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
        legendColor: this.state.color,
      });
      let xPoint;
      if (isNumeric) {
        xPoint = xBarScale(singleChartData.xAxisPoint as number);
      } else {
        xPoint = xBarScale(indexNumber);
      }

      return (
        <rect
          key={index + indexNumber}
          className={this._classNames.opacityChangeOnHover}
          x={xPoint}
          y={this._height - yBarScale(startingPointOfY)}
          width={this._barWidth}
          height={yBarScale(point.data)}
          fill={color}
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend, refArrayIndexNumber);
          }}
          data-is-focusable={true}
          focusable={'true'}
          onMouseOver={this._onBarHover.bind(
            this,
            point.legend,
            singleChartData.xAxisPoint,
            point.data,
            color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onMouseMove={this._onBarHover.bind(
            this,
            point.legend,
            singleChartData.xAxisPoint,
            point.data,
            color,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          aria-labelledby={this._calloutId}
          onMouseLeave={this._onBarLeave}
          onFocus={this._onBarFocus.bind(
            this,
            point.legend,
            singleChartData.xAxisPoint,
            point.data,
            color,
            refArrayIndexNumber,
            point.xAxisCalloutData!,
            point.yAxisCalloutData!,
          )}
          onBlur={this._onBarLeave}
          onClick={this._redirectToUrl.bind(this, href)}
        />
      );
    });
    return <g>{bar}</g>;
  };

  private _createNumericBars = (
    singleChartData: IVerticalStackedChartProps,
    dataset: IDataPoint[],
    indexNumber: number,
    href: string,
  ): JSX.Element => {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;

    const xBarScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    return this.createBar(singleChartData, xBarScale, yBarScale, indexNumber, href, true);
  };

  private _createStringBars = (
    singleChartData: IVerticalStackedChartProps,
    dataset: IDataPoint[],
    indexNumber: number,
    href: string,
  ): JSX.Element => {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const endpointDistance = 0.5 * (this._width / dataset.length);
    const xBarScale = d3ScaleLinear()
      .domain([0, dataset.length - 1])
      .range([endpointDistance - 0.5 * this._barWidth, this._width - endpointDistance - 0.5 * this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    return this.createBar(singleChartData, xBarScale, yBarScale, indexNumber, href, false);
  };

  private _getBars = (
    _points: IVerticalStackedChartProps[],
    dataset: IDataPoint[],
    isNumeric: boolean,
  ): JSX.Element[] => {
    const bars: JSX.Element[] = [];
    _points.map((singleChartData: IVerticalStackedChartProps, index: number) => {
      const singleChartBar = isNumeric
        ? this._createNumericBars(singleChartData, dataset, index, this.props.href!)
        : this._createStringBars(singleChartData, dataset, index, this.props.href!);
      bars.push(singleChartBar);
    });

    return bars;
  };

  private _setXAxis(node: SVGGElement | null, xAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(xAxis);
    axisNode.selectAll('text').attr('class', this._classNames.xAxisText!);
  }

  private _setYAxis(node: SVGElement | null, yAxis: numericAxis): void {
    if (node === null) {
      return;
    }
    d3Select(node).call(yAxis);
  }
}
