import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis } from 'd3-shape';
import { getId, find } from 'office-ui-fabric-react/lib/Utilities';
import { IPalette } from 'office-ui-fabric-react/lib/Styling';
import { ILineChartProps, IBasestate, IChildProps } from '../LineChart/index';
import { ILegend, Legends } from '../Legends/index';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { ILineChartDataPoint, ILineChartPoints } from '../../types/index';
import { calloutData, createYAxis } from '../../utilities/index';
import { ChartHelper } from '../CommonComponents/ChartHelper';

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}
export interface IAreaChartAreaPoint {
  xVal: string | number;
  values: IAreaChartDataSetPoint;
}
export interface IAreaChartDataSetPoint {
  [key: string]: number | string;
}
export interface IDPointType {
  index: number;
  point: {
    values: { 0: number; 1: number; data: {} };
    xVal: number;
  };
}
export interface IContainerValues {
  width: number;
  height: number;
  shouldResize: boolean;
  reqID: number;
}
export interface IAreaChartState extends IBasestate {}

export class AreaChartBase extends React.Component<ILineChartProps, IAreaChartState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any;
  private _points: ILineChartPoints[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private dataSet: any;
  private _colors: string[];
  private _keys: string[];
  private _refArray: IRefArrayData[];
  private _isGraphDraw: boolean = true;
  private _uniqueIdForGraph: string;
  private _verticalLineId: string;
  private _circleId: string;
  private _uniqueCallOutID: string;
  private containerHeight: number;
  private containerWidth: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any;
  private yAxisElement: SVGElement | null;
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };

  public constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      activeLegend: '',
      hoverXValue: '',
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      YValueHover: [],
    };
    this._refArray = [];
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    this._uniqueIdForGraph = getId('areaChart_');
    this._verticalLineId = getId('verticalLine_');
    this._circleId = getId('circle');
    this._calloutPoints = this.props.data.lineChartData ? calloutData(this.props.data.lineChartData!) : [];
    this.dataSet = this._createDataSet();
  }

  public componentDidUpdate(prevProps: ILineChartProps): void {
    if (
      prevProps.data !== this.props.data ||
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      this._isGraphDraw
    ) {
      this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
      this.dataSet = this._createDataSet();
      this._calloutPoints = this.props.data.lineChartData ? calloutData(this.props.data.lineChartData!) : [];
      this._drawGraph(this.containerHeight, this.containerWidth);
      this._isGraphDraw = false;
    }
  }

  public componentWillUnmount(): void {
    d3Select(`#firstGElementForChart123_${this._uniqueIdForGraph}`).remove();
  }

  public render(): JSX.Element {
    let isDateType = false;
    if (this._points && this._points.length > 0) {
      this._points.forEach((chartData: ILineChartPoints) => {
        if (chartData.data.length > 0) {
          isDateType = chartData.data[0].x instanceof Date;
          return;
        }
      });
    }

    this._keys = this._createKeys();
    const legends: JSX.Element = this._getLegendData(this.props.theme!.palette);
    const tickParams = {
      tickValues: this.props.tickValues,
      tickFormat: this.props.tickFormat,
    };
    const calloutProps = {
      target: this.state.refSelected,
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topRightEdge,
      YValueHover: this.state.YValueHover,
      hoverXValue: this.state.hoverXValue,
      id: `toolTip${this._uniqueCallOutID}`,
      gapSpace: 15,
      isBeakVisible: false,
      setInitialFocus: true,
    };
    return (
      <ChartHelper
        {...this.props}
        points={this._points}
        tickParams={tickParams}
        getGraphData={this._isGraphDraw && this._getGraphData}
        calloutProps={calloutProps}
        legendBars={legends}
        isXAxisDateType={isDateType}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this.containerHeight = props.containerHeight!;
          this.containerWidth = props.containerWidth!;
          return <g id={`graphGElement_${this._uniqueIdForGraph}`} />;
        }}
      />
    );
  }

  private _createDataSet = () => {
    const allChartPoints: ILineChartDataPoint[] = [];
    const dataSet: IAreaChartDataSetPoint[] = [];
    this._points.length &&
      this._points.forEach((singleChartPoint: ILineChartPoints) => {
        allChartPoints.push(...singleChartPoint.data);
      });

    let tempArr = allChartPoints;
    while (tempArr.length) {
      const valToCheck = tempArr[0].x instanceof Date ? tempArr[0].x.toLocaleDateString() : tempArr[0].x;
      const filteredChartPoints: ILineChartDataPoint[] = tempArr.filter(
        (point: ILineChartDataPoint) =>
          (point.x instanceof Date ? point.x.toLocaleDateString() : point.x) === valToCheck,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const singleDataset: any = {};
      filteredChartPoints.forEach((singleDataPoint: ILineChartDataPoint, index: number) => {
        singleDataset.xVal = singleDataPoint.x;
        singleDataset[`chart${index}`] = singleDataPoint.y;
      });
      dataSet.push(singleDataset);
      // removing compared objects from array
      const val = tempArr[0].x instanceof Date ? tempArr[0].x.toLocaleDateString() : tempArr[0].x;
      tempArr = tempArr.filter(
        (point: ILineChartDataPoint) => (point.x instanceof Date ? point.x.toLocaleDateString() : point.x) !== val,
      );
    }
    return dataSet;
  };

  private _getColors = (): string[] => {
    return this._points.map((singlePoint: ILineChartPoints) => singlePoint.color);
  };

  private _createKeys = (): string[] => {
    const keysLength: number = Object.keys(this.dataSet[0]).length;
    const keys: string[] = [];
    for (let i = 0; i < keysLength - 1; i++) {
      const keyVal = `chart${i}`;
      keys.push(keyVal);
    }
    return keys;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getGraphData = (xAxis: any, yAxis: any, containerHeight: number, containerWidth: number) => {
    this._xAxisScale = xAxis;
    this._drawGraph(containerHeight, containerWidth);
  };

  private _onLegendClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.activeLegend === customMessage) {
        this.setState({
          isLegendSelected: false,
          activeLegend: '',
        });
      } else {
        this.setState({
          activeLegend: customMessage,
        });
      }
    } else {
      this.setState({
        activeLegend: customMessage,
      });
    }
    this._isGraphDraw = true;
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        activeLegend: customMessage,
        isLegendHovered: true,
      });
      this._isGraphDraw = true;
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        activeLegend: '',
        isLegendHovered: false,
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
      this._isGraphDraw = true;
    }
  }

  private _getLegendData = (palette: IPalette): JSX.Element => {
    const data = this._points;
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.forEach((singleChartData: ILineChartPoints) => {
      const color: string = singleChartData.color
        ? singleChartData.color
        : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const checkSimilarLegends = actions.filter(
        (leg: ILegend) => leg.title === singleChartData.legend && leg.color === color,
      );
      if (checkSimilarLegends!.length > 0) {
        return;
      }

      const legend: ILegend = {
        title: singleChartData.legend,
        color: color,
        action: () => {
          this._onLegendClick(singleChartData.legend);
        },
        hoverAction: () => {
          this._onLegendHover(singleChartData.legend);
        },
        onMouseOutAction: (isLegendSelected?: boolean) => {
          this._onLegendLeave(isLegendSelected);
        },
      };

      actions.push(legend);
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

  private _updateVerticalLine = (xLineVal: number, visibilityStatus: string) => {
    d3Select(`#${this._verticalLineId}`).attr('x1', xLineVal);
    d3Select(`#${this._verticalLineId}`).attr('x2', xLineVal);
    d3Select(`#${this._verticalLineId}`).attr('visibility', visibilityStatus);
  };

  private _onMouseHover = (target: SVGCircleElement, x: number | Date, xAxisCalloutData: string) => {
    const formattedDate = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    const presentData = found.values[0];
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.activeLegend === presentData.legend)
    ) {
      this.setState({
        refSelected: target,
        isCalloutVisible: true,
        activeLegend: presentData.legend,
        hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
        YValueHover: found.values,
      });
    }
  };

  private _handleMouseAction = (xLineVal: number, x: number | Date, circleId: string, xAxisCalloutData: string) => {
    this._uniqueCallOutID = circleId;
    d3Select('#' + circleId)
      .attr('fill', '#fff')
      .attr('r', 8)
      .attr('aria-labelledby', `toolTip${this._uniqueCallOutID}`);
    this._updateVerticalLine(xLineVal, 'visibility');
    this._onMouseHover(d3Event.target, x, xAxisCalloutData);
  };

  private _mouseOutAction = (circleId: string, color: string) => {
    this._updateVerticalLine(0, 'hidden');
    d3Select('#' + circleId)
      .attr('fill', color)
      .attr('r', 0.01);
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onChartFocus = (
    target: SVGCircleElement,
    refArrayIndex: string,
    x: number | Date,
    xAxisCalloutData: string,
  ) => {
    const formattedDate = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => element.x === xVal);
    const presentData = found.values[0];
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.activeLegend === presentData.legend)
    ) {
      this._refArray.forEach((obj: IRefArrayData) => {
        if (obj.legendText === refArrayIndex) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            activeLegend: presentData.legend,
            hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
            YValueHover: found.values,
          });
        }
      });
    }
  };

  private _handleFocusAction = (
    xLineVal: number,
    x: number | Date,
    legendTitle: string,
    circleId: string,
    xAxisCalloutData: string,
  ) => {
    this._uniqueCallOutID = circleId;
    this._refArray.push({ legendText: circleId, refElement: d3Event.target });
    d3Select('#' + circleId)
      .attr('fill', '#fff')
      .attr('r', 8)
      .attr('aria-labelledby', circleId);
    this._updateVerticalLine(xLineVal, 'visibility');
    this._onChartFocus(d3Event.target, circleId, x, xAxisCalloutData);
  };

  private _onDataPointClick = (func: (() => void) | undefined, circleId: string, color: string) => {
    d3Select('#' + circleId)
      .attr('fill', color)
      .attr('r', 8);
    if (func) {
      func();
    }
  };

  private _getOpacity = (selectedArea: string) => {
    let shouldHighlight = true;
    if (this.state.isLegendHovered || this.state.isLegendSelected) {
      shouldHighlight = this.state.activeLegend === selectedArea;
    }
    return shouldHighlight ? '1' : '0.1';
  };

  private _getOpacityOfCircle = (selectedArea: string) => {
    let shouldHighlight = true;
    if (this.state.isLegendHovered || this.state.isLegendSelected) {
      shouldHighlight = this.state.activeLegend === selectedArea;
    }
    this._isGraphDraw = true;
    return shouldHighlight ? 'visibility' : 'hidden';
  };

  private _drawGraph = (containerHeight: number, containerWidth: number): void => {
    d3Select(`#firstGElementForChart123_${this._uniqueIdForGraph}`).remove();
    const { showYAxisGridLines, yAxisTickCount, yAxisTickFormat } = this.props;
    const that = this;
    const xScale = this._xAxisScale;
    const chartContainer = d3Select(`#graphGElement_${this._uniqueIdForGraph}`)
      .append('g')
      .attr('id', `firstGElementForChart123_${this._uniqueIdForGraph}`);

    this._colors = this._getColors();
    const stackedValues = d3Stack().keys(this._keys)(this.dataSet);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stackedData: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stackedValues.forEach((layer: any) => {
      const currentStack: IAreaChartDataSetPoint[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      layer.forEach((d: any) => {
        currentStack.push({
          values: d,
          xVal: d.data.xVal,
        });
      });
      stackedData.push(currentStack);
    });

    const maxOfYVal = d3Max(stackedValues[stackedValues.length - 1], dp => dp[1])!;
    const yAxisParams = {
      margins: this.margins,
      containerWidth: containerWidth,
      containerHeight: containerHeight,
      yAxisElement: this.yAxisElement,
      yAxisTickFormat: yAxisTickFormat!,
      yAxisTickCount: yAxisTickCount ? yAxisTickCount : 4,
      finalYMaxVal: maxOfYVal,
      finalYMinVal: 0,
      tickPadding: 10,
      showYAxisGridLines: showYAxisGridLines!,
      data: this._points,
    };
    createYAxis(yAxisParams);

    const yScale = d3ScaleLinear()
      .range([containerHeight - this.margins.bottom, this.margins.top])
      .domain([0, maxOfYVal]);

    const area = d3Area()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((d: any) => xScale(d.xVal))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y0((d: any) => yScale(d.values[0]))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y1((d: any) => yScale(d.values[1]))
      .curve(d3CurveBasis);

    const series = chartContainer
      .selectAll('.series')
      .data(stackedData)
      .enter();

    series
      .append('path')
      .style('fill', (d: string, i: number) => this._colors[i])
      .attr('stroke-width', 3)
      .attr('d', area)
      .attr('fill-opacity', (d: IDPointType, index: number) => {
        return that._getOpacity(this._points[index].legend);
      });

    const points = chartContainer
      .selectAll('.dots')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('class', 'dots')
      .attr('d', area)
      .attr('clip-path', 'url(#clip)');

    points
      .selectAll('.dot')
      .data((point: [], index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return point.map((subPoint: IDPointType): any => ({ point: subPoint, index: index }));
      })
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('id', (d: IDPointType, index: number) => `${this._circleId}_${d.index * stackedData[0].length + index}`)
      .attr('focusable', true)
      .attr('data-is-focusable', true)
      .attr('cx', (d: IDPointType) => xScale(d.point.xVal))
      .attr('cy', (d: IDPointType) => yScale(d.point.values[1]))
      .attr('r', 0.01)
      .attr('stroke', (d: IDPointType, index: number) => this._points[d.index].color)
      .attr('stroke-width', 3)
      .attr('visibility', (d: IDPointType, index: number) => {
        return that._getOpacityOfCircle(this._points[d.index].legend);
      })
      .attr('fill', (d: IDPointType, index: number) => this._points[d.index].color)
      .on('mouseover', (d: IDPointType, index: number) =>
        that._handleMouseAction(
          xScale(d.point.xVal),
          d.point.xVal,
          `${this._circleId}_${d.index * stackedData[0].length + index}`,
          this._points[d.index].data[index].xAxisCalloutData!,
        ),
      )
      .on('mouseout', (d: IDPointType, index: number) =>
        that._mouseOutAction(
          `${this._circleId}_${d.index * stackedData[0].length + index}`,
          this._points[d.index].color,
        ),
      )
      .on('focus', (d: IDPointType, index: number) => {
        const refArrayIndex = `${this._circleId}_${d.index * stackedData[0].length + index}`;
        return that._handleFocusAction(
          xScale(d.point.xVal),
          d.point.xVal,
          this._points[d.index].legend,
          refArrayIndex,
          this._points[d.index].data[index].xAxisCalloutData!,
        );
      })
      .on('blur', (d: IDPointType, index: number) =>
        that._mouseOutAction(
          `${this._circleId}_${d.index * stackedData[0].length + index}`,
          this._points[d.index].color,
        ),
      )
      .on('click', (d: IDPointType, index: number) =>
        that._onDataPointClick(
          this._points[d.index].data[index].onDataPointClick!,
          `${this._circleId}_${d.index * stackedData[0].length + index}`,
          this._points[d.index].color,
        ),
      );

    chartContainer
      .append('line')
      .attr('class', 'verticalLine')
      .attr('id', this._verticalLineId)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', containerHeight)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('visibility', 'hidden')
      .attr('stroke-dasharray', '5,5');
  };
}
