import * as React from 'react';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { ILegend, Legends } from '../Legends/index';
import { getId, find } from 'office-ui-fabric-react/lib/Utilities';
import { ILineChartProps } from './LineChart.types';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';
import { ILineChartPoints, IMargins, IBasestate, IChildProps } from '../../types/index';
import { calloutData, getMinMaxOfXAxis, getMinMaxOfYAxis, getXAxisType } from '../../utilities/index';
import { ChartHelper } from '../CommonComponents/ChartHelper';

type NumericAxis = D3Axis<number | { valueOf(): number }>;

export interface IRefArrayData {
  index?: string;
  refElement?: SVGGElement;
}
export interface IContainerValues {
  width: number;
  height: number;
  shouldResize: boolean;
  reqID: number;
}
export interface ILineChartState extends IBasestate {}

export class LineChartBase extends React.Component<ILineChartProps, ILineChartState> {
  private _points: ILineChartPoints[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _yAxisScale: any = '';
  private _circleId: string;
  private _lineId: string;
  private _verticalLine: string;
  private _uniqueCallOutID: string;
  private _refArray: IRefArrayData[];
  private margins: IMargins;
  private eventLabelHeight: number = 36;
  private lines: JSX.Element[];

  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      hoverXValue: '',
      activeLegend: '',
      YValueHover: [],
      refSelected: '',
      selectedLegend: '',
      isCalloutVisible: false,
    };
    this._refArray = [];
    this._points = this.props.data.lineChartData || [];
    this._calloutPoints = calloutData(this._points) || [];
    this._circleId = getId('circle');
    this._lineId = getId('lineID');
    this._verticalLine = getId('verticalLine');
    this.margins = {
      top: this.props.margins?.top || 20,
      right: this.props.margins?.right || 20,
      bottom: this.props.margins?.bottom || 35,
      left: this.props.margins?.left || 35,
    };
    props.eventAnnotationProps &&
      props.eventAnnotationProps.labelHeight &&
      (this.eventLabelHeight = props.eventAnnotationProps.labelHeight);
  }

  public componentDidUpdate(prevProps: ILineChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      prevProps.data !== this.props.data
    ) {
      this._points = this.props.data.lineChartData || [];
      this._calloutPoints = calloutData(this._points) || [];
    }
  }

  public render(): JSX.Element {
    const { tickValues, tickFormat, eventAnnotationProps } = this.props;
    this._points = this.props.data.lineChartData || [];

    const isXAxisDateType = getXAxisType(this._points);

    const legendBars = this._createLegends(this._points!);
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      YValueHover: this.state.YValueHover,
      hoverXValue: this.state.hoverXValue,
      id: `toolTip${this._uniqueCallOutID}`,
      target: this.state.refSelected,
      isBeakVisible: false,
      gapSpace: 15,
    };
    const tickParams = {
      tickValues: tickValues,
      tickFormat: tickFormat,
    };

    return (
      <ChartHelper
        {...this.props}
        yMinMaxValues={getMinMaxOfYAxis(this._points)}
        xMinMaxValues={getMinMaxOfXAxis(isXAxisDateType, this._points)}
        getGraphData={this._getLinesData}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        isXAxisDateType={isXAxisDateType}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this._xAxisScale = props.xScale!;
          this._yAxisScale = props.yScale!;
          return (
            <>
              <g>
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={props.containerHeight}
                  stroke={'steelblue'}
                  id={this._verticalLine}
                  visibility={'hidden'}
                  strokeDasharray={'5,5'}
                />
                <g>{this.lines}</g>
                {eventAnnotationProps && (
                  <EventsAnnotation
                    {...eventAnnotationProps}
                    scale={props.xScale!}
                    chartYTop={this.margins.top! + this.eventLabelHeight}
                    chartYBottom={props.containerHeight! - 35}
                  />
                )}
              </g>
            </>
          );
        }}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getLinesData = (xScale: any, yScale: NumericAxis, containerHeight: number, containerWidth: number) => {
    this._xAxisScale = xScale;
    this._yAxisScale = yScale;
    return (this.lines = this._createLines());
  };

  private _createLegends(data: ILineChartPoints[]): JSX.Element {
    const legendDataItems = data.map((point: ILineChartPoints, index: number) => {
      const color: string = point.color;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          if (this.state.selectedLegend === point.legend) {
            this.setState({ selectedLegend: '' });
            this._handleLegendClick(point, null);
          } else {
            this.setState({ selectedLegend: point.legend });
            this._handleLegendClick(point, point.legend);
          }
          this.setState({ activeLegend: point.legend });
        },
        onMouseOutAction: () => {
          this.setState({ activeLegend: '' });
        },
        hoverAction: () => {
          this.setState({ activeLegend: point.legend });
        },
      };
      return legend;
    });
    const legends = (
      <Legends
        legends={legendDataItems}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
      />
    );
    return legends;
  }

  private _createLines(): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color;
      if (this._points[i].data.length === 1) {
        const x1 = this._points[i].data[0].x;
        const y1 = this._points[i].data[0].y;
        lines.push(
          <circle
            id={`${this._circleId}${i}`}
            key={`${this._circleId}${i}`}
            r={3.5}
            cx={this._xAxisScale(x1)}
            cy={this._yAxisScale(y1)}
            fill={lineColor}
          />,
        );
      }
      for (let j = 1; j < this._points[i].data.length; j++) {
        const lineId = `${this._lineId}${i}${j}`;
        const circleId = `${this._circleId}${i}${j}`;
        const x1 = this._points[i].data[j - 1].x;
        const y1 = this._points[i].data[j - 1].y;
        const x2 = this._points[i].data[j].x;
        const y2 = this._points[i].data[j].y;
        const xAxisCalloutData = this._points[i].data[j - 1].xAxisCalloutData;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
          lines.push(
            <line
              id={lineId}
              key={lineId}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              strokeWidth={this.props.strokeWidth || 4}
              ref={(e: SVGLineElement | null) => {
                this._refCallback(e!, lineId);
              }}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseOut={this._handleMouseOut.bind(this, circleId, lineColor)}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={1}
              onClick={this._onLineClick.bind(this, this._points[i].onLineClick)}
            />,
          );
          lines.push(
            <circle
              id={circleId}
              key={circleId}
              r={0.2}
              cx={this._xAxisScale(x1)}
              cy={this._yAxisScale(y1)}
              data-is-focusable={i === 0 ? true : false}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onMouseOut={this._handleMouseOut.bind(this, circleId, lineColor)}
              onFocus={this._handleFocus.bind(this, lineId, x1, y1, lineColor, xAxisCalloutData, circleId)}
              onBlur={this._handleMouseOut.bind(this, circleId, lineColor)}
              onClick={this._onDataPointClick.bind(
                this,
                this._points[i].data[j - 1].onDataPointClick,
                circleId,
                lineColor,
              )}
              opacity={1}
              fill={lineColor}
              stroke={lineColor}
              strokeWidth={3}
            />,
          );
          if (j + 1 === this._points[i].data.length) {
            const lastCircleId = `${circleId}${j}L`;
            lines.push(
              <circle
                id={lastCircleId}
                key={lastCircleId}
                r={0.2}
                cx={this._xAxisScale(x2)}
                cy={this._yAxisScale(y2)}
                data-is-focusable={i === 0 ? true : false}
                onMouseOver={this._handleHover.bind(this, x2, y2, lineColor, xAxisCalloutData, lastCircleId)}
                onMouseMove={this._handleHover.bind(this, x2, y2, lineColor, xAxisCalloutData, lastCircleId)}
                onMouseOut={this._handleMouseOut.bind(this, lastCircleId, lineColor)}
                onFocus={this._handleFocus.bind(this, lineId, x2, y2, lineColor, xAxisCalloutData, lastCircleId)}
                onBlur={this._handleMouseOut.bind(this, lastCircleId, lineColor)}
                onClick={this._onDataPointClick.bind(
                  this,
                  this._points[i].data[j].onDataPointClick,
                  lastCircleId,
                  lineColor,
                )}
                opacity={1}
                fill={lineColor}
                stroke={lineColor}
                strokeWidth={3}
              />,
            );
          }
        } else {
          lines.push(
            <line
              id={lineId}
              key={lineId}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              strokeWidth={this.props.strokeWidth || 4}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={0.1}
            />,
          );
        }
      }
    }
    return lines;
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this._refArray.push({ index: legendTitle, refElement: element });
  }

  private _handleFocus = (
    lineId: string,
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
    circleId: string,
  ) => {
    this._uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    const _this = this;
    d3Select('#' + circleId)
      .attr('fill', '#fff')
      .attr('r', 8)
      .attr('aria-labelledby', `toolTip${this._uniqueCallOutID}`);
    d3Select(`#${this._verticalLine}`)
      .attr('transform', () => `translate(${_this._xAxisScale(x)}, 0)`)
      .attr('visibility', 'visibility');
    this._refArray.forEach((obj: IRefArrayData) => {
      if (obj.index === lineId) {
        this.setState({
          isCalloutVisible: true,
          refSelected: obj.refElement,
          hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
          YValueHover: found.values,
        });
      }
    });
  };

  private _handleHover = (
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
    circleId: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ) => {
    mouseEvent.persist();
    this._uniqueCallOutID = circleId;
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    const _this = this;
    d3Select(`#${circleId}`)
      .attr('fill', '#fff')
      .attr('r', 8);
    d3Select(`#${this._verticalLine}`)
      .attr('transform', () => `translate(${_this._xAxisScale(x)}, 0)`)
      .attr('visibility', 'visibility');
    const found = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    this.setState({
      isCalloutVisible: true,
      refSelected: mouseEvent,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
      YValueHover: found.values,
    });
  };

  private _onLineClick = (func: () => void) => {
    if (func) {
      func();
    }
  };

  private _onDataPointClick = (func: () => void, circleId: string, color: string) => {
    d3Select('#' + circleId)
      .attr('fill', color)
      .attr('r', 8);
    if (func) {
      func();
    }
  };

  private _handleMouseOut = (circleId: string, lineColor: string) => {
    d3Select('#' + circleId)
      .attr('fill', lineColor)
      .attr('r', 0.2);
    d3Select(`#${this._verticalLine}`).attr('visibility', 'hidden');
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _handleLegendClick = (point: ILineChartPoints, selectedLegend: string | null): void => {
    if (point.onLegendClick) {
      point.onLegendClick(selectedLegend);
    }
  };
}
