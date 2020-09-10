import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis } from 'd3-shape';
import { getId, find } from 'office-ui-fabric-react/lib/Utilities';
import { IPalette } from 'office-ui-fabric-react/lib/Styling';
import {
  IAreaChartProps,
  IChildProps,
  IRefArrayData,
  IBasestate,
  ILineChartDataPoint,
  ILineChartPoints,
} from '../AreaChart/index';
import { ILegend, Legends } from '../Legends/index';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { warnDeprecations } from 'office-ui-fabric-react/lib/Utilities';
import { calloutData, getXAxisType, ChartTypes, XAxisTypes } from '../../utilities/index';
import { CartesianChart } from '../CommonComponents/CartesianChart';

const COMPONENT_NAME = 'AREA CHART';
export interface IAreaChartAreaPoint {
  xVal: string | number;
  values: IAreaChartDataSetPoint;
}
export interface IAreaChartDataSetPoint {
  [key: string]: number | string;
}
export interface IDPointType {
  values: { 0: number; 1: number; data: {} };
  xVal: number;
}

export interface IAreaChartState extends IBasestate {
  lineXValue: number;
  displayOfLine: string;
  activeCircleId: string;
  isCircleClicked: boolean;
}

export class AreaChartBase extends React.Component<IAreaChartProps, IAreaChartState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any;
  private _points: ILineChartPoints[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private dataSet: any;
  private _colors: string[];
  private _keys: string[];
  private _refArray: IRefArrayData[];
  private _uniqueIdForGraph: string;
  private _verticalLineId: string;
  private _circleId: string;
  private _uniqueCallOutID: string;
  private containerHeight: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _stackedData: any;
  private _chart: JSX.Element[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _yAxisScale: any;

  public constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      activeLegend: '',
      hoverXValue: '',
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      YValueHover: [],
      lineXValue: 0,
      displayOfLine: 'hidden',
      activeCircleId: '',
      isCircleClicked: false,
    };
    warnDeprecations(COMPONENT_NAME, props, {
      showYAxisGridLines: 'Dont use this property. Lines are drawn by default',
    });
    this._refArray = [];
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    this._uniqueIdForGraph = getId('areaChart_');
    this._verticalLineId = getId('verticalLine_');
    this._circleId = getId('circle');
    this._calloutPoints = this.props.data.lineChartData ? calloutData(this.props.data.lineChartData!) : [];
    this.dataSet = this._createDataSet();
  }

  public componentDidUpdate(prevProps: IAreaChartProps): void {
    if (
      prevProps.data !== this.props.data ||
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width
    ) {
      this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
      this.dataSet = this._createDataSet();
      this._calloutPoints = this.props.data.lineChartData ? calloutData(this.props.data.lineChartData!) : [];
      this._drawGraph(this.containerHeight, this._xAxisScale, this._yAxisScale);
    }
  }

  public render(): JSX.Element {
    const isXAxisDateType = getXAxisType(this._points);
    this._keys = this._createKeys();
    this._colors = this._getColors();
    const stackedInfo = this._getStackedData();
    this._stackedData = stackedInfo.stackedData;
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
      ...this.props.calloutProps,
    };
    return (
      <CartesianChart
        {...this.props}
        points={this._points}
        chartType={ChartTypes.AreaChart}
        calloutProps={calloutProps}
        legendBars={legends}
        isMultiStackCallout
        tickParams={tickParams}
        maxOfYVal={stackedInfo.maxOfYVal}
        getGraphData={this._getGraphData}
        xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this.containerHeight = props.containerHeight!;
          this._xAxisScale = props.xScale!;
          this._yAxisScale = props.yScale!;
          return <g>{this._chart}</g>;
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

  private _getStackedData = () => {
    const stackedValues = d3Stack().keys(this._keys)(this.dataSet);
    const maxOfYVal = d3Max(stackedValues[stackedValues.length - 1], dp => dp[1])!;
    const stackedData: Array<IAreaChartDataSetPoint[]> = [];
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
    return {
      stackedData,
      maxOfYVal,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getGraphData = (xAxis: any, yAxis: any, containerHeight: number, containerWidth: number) => {
    this._chart = this._drawGraph(containerHeight, xAxis, yAxis);
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
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        activeLegend: customMessage,
        isLegendHovered: true,
      });
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        activeLegend: '',
        isLegendHovered: false,
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
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
        {...this.props.legendProps}
      />
    );
  };

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this._refArray.push({ index: legendTitle, refElement: element });
  }

  private _handleMouseHover = (
    xLineVal: number,
    xVal: number | Date,
    circleId: string,
    xAxisCalloutData: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ) => {
    mouseEvent.persist();
    this._uniqueCallOutID = circleId;
    d3Select('#' + circleId).attr('aria-labelledby', `toolTip${this._uniqueCallOutID}`);
    const formattedDate = xVal instanceof Date ? xVal.toLocaleDateString() : xVal;
    const modifiedXVal = xVal instanceof Date ? xVal.getTime() : xVal;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => {
      return element.x === modifiedXVal;
    });
    this.setState({
      refSelected: mouseEvent,
      isCalloutVisible: true,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
      YValueHover: found.values,
      lineXValue: xLineVal,
      displayOfLine: 'visibility',
      activeCircleId: circleId,
      isCircleClicked: false,
    });
  };

  private _mouseOutAction = (): void => {
    this.setState({
      isCalloutVisible: false,
      lineXValue: 0,
      displayOfLine: 'hidden',
      activeCircleId: '',
      isCircleClicked: false,
    });
  };

  private _handleOnFocus = (xLineVal: number, x: number | Date, circleId: string, xAxisCalloutData: string) => {
    this._uniqueCallOutID = circleId;
    d3Select('#' + circleId).attr('aria-labelledby', `toolTip${this._uniqueCallOutID}`);
    const formattedDate = x instanceof Date ? x.toLocaleDateString() : x;
    const xVal = x instanceof Date ? x.getTime() : x;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => {
      return element.x === xVal;
    });
    this._refArray.forEach((obj: IRefArrayData) => {
      if (obj.index === circleId) {
        this.setState({
          refSelected: obj.refElement,
          isCalloutVisible: true,
          hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
          YValueHover: found.values,
          lineXValue: xLineVal,
          displayOfLine: 'visibility',
          activeCircleId: circleId,
          isCircleClicked: false,
        });
      }
    });
  };

  private _onDataPointClick = (func: (() => void) | undefined, circleId: string, color: string) => {
    if (func) {
      func();
    }
    this.setState({ isCircleClicked: true, activeCircleId: circleId });
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
    return shouldHighlight ? 'visibility' : 'hidden';
  };

  private _updateCircleFillColor = (circleId: string, lineColor: string): string => {
    if (this.state.isCircleClicked && this.state.activeCircleId === circleId) {
      return lineColor;
    } else {
      return this.state.activeCircleId === circleId ? this.props.theme!.palette.white : lineColor;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _drawGraph = (containerHeight: number, xScale: any, yScale: any): JSX.Element[] => {
    const area = d3Area()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((d: any) => xScale(d.xVal))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y0((d: any) => yScale(d.values[0]))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y1((d: any) => yScale(d.values[1]))
      .curve(d3CurveBasis);

    const graph: JSX.Element[] = [];
    let lineColor: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._stackedData.forEach((singleStackedData: Array<any>, index: number) => {
      graph.push(
        <path
          id={`${index}-graph-${this._uniqueIdForGraph}`}
          key={`${index}-graph-${this._uniqueIdForGraph}`}
          d={area(singleStackedData)!}
          fill={this._colors[index]}
          fillOpacity={this._getOpacity(this._points[index].legend)}
          strokeWidth={3}
        />,
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._stackedData.forEach((singleStackedData: Array<any>, index: number) => {
      graph.push(
        <g key={`${index}-dots-${this._uniqueIdForGraph}`} d={area(singleStackedData)!} clipPath="url(#clip)">
          {singleStackedData.map((singlePoint: IDPointType, pointIndex: number) => {
            const circleId = `${this._circleId}_${index * this._stackedData[0].length + pointIndex}`;
            const xLineVal = xScale(singlePoint.xVal);
            const xAxisCalloutData = this._points[index].data[index].xAxisCalloutData!;
            lineColor = this._points[index].color;
            return (
              <circle
                key={circleId}
                id={circleId}
                data-is-focusable={true}
                cx={xScale(singlePoint.xVal)}
                cy={yScale(singlePoint.values[1])}
                r={this.state.activeCircleId === circleId ? 8 : 0.01}
                stroke={lineColor}
                strokeWidth={3}
                visibility={this._getOpacityOfCircle(this._points[index].legend)}
                fill={this._updateCircleFillColor(circleId, lineColor)}
                ref={(e: SVGCircleElement | null) => {
                  this._refCallback(e!, circleId);
                }}
                onMouseOver={this._handleMouseHover.bind(this, xLineVal, singlePoint.xVal, circleId, xAxisCalloutData)}
                onMouseOut={this._mouseOutAction}
                onFocus={this._handleOnFocus.bind(this, xLineVal, singlePoint.xVal, circleId, xAxisCalloutData)}
                onBlur={this._mouseOutAction}
                onClick={this._onDataPointClick.bind(
                  this,
                  this._points[index].data[pointIndex].onDataPointClick!,
                  circleId,
                  lineColor,
                )}
              />
            );
          })}
        </g>,
      );
    });
    graph.push(
      <line
        id={this._verticalLineId}
        key={this._verticalLineId}
        x1={this.state.lineXValue}
        y1={0}
        x2={this.state.lineXValue}
        y2={containerHeight}
        strokeWidth={1}
        strokeDasharray={5.5}
        stroke={lineColor!}
        opacity={0.5}
        visibility={this.state.displayOfLine}
      />,
    );
    return graph;
  };
}
