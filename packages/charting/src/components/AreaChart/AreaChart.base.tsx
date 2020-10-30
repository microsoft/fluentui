import * as React from 'react';
import { max as d3Max, bisector } from 'd3-array';
import { clientPoint } from 'd3-selection';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis, line as d3Line } from 'd3-shape';
import { getId, find } from 'office-ui-fabric-react/lib/Utilities';
import { IPalette } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  CartesianChart,
  IChartProps,
  ICustomizedCalloutData,
  IAreaChartProps,
  IBasestate,
  ILineChartDataPoint,
  ILineChartPoints,
  IChildProps,
  IMargins,
} from '../../index';
import { warnDeprecations } from 'office-ui-fabric-react/lib/Utilities';
import { calloutData, getXAxisType, ChartTypes, XAxisTypes, getTypeOfAxis } from '../../utilities/index';
import { ILegend, Legends } from '../Legends/index';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bisect = bisector((d: any) => d.x).left;
const COMPONENT_NAME = 'AREA CHART';

enum InterceptVisibility {
  show = 'visibility',
  hide = 'hidden',
}
export interface IAreaChartAreaPoint {
  xVal: string | number;
  values: IAreaChartDataSetPoint;
}
export interface IAreaChartDataSetPoint {
  [key: string]: number | string;
}
export interface IDPointType {
  values: { 0: number; 1: number; data: {} };
  xVal: number | Date;
}

export interface IAreaChartState extends IBasestate {
  lineXValue: number;
  displayOfLine: InterceptVisibility;
  isCircleClicked: boolean;
  dataPointCalloutProps?: ICustomizedCalloutData;
  stackCalloutProps?: ICustomizedCalloutData;
  nearestCircleToHighlight: number | string | Date | null;
}

export class AreaChartBase extends React.Component<IAreaChartProps, IAreaChartState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createSet: (data: IChartProps) => { colors: string[]; stackedInfo: any; calloutPoints: any };
  private _colors: string[];
  private _uniqueIdForGraph: string;
  private _verticalLineId: string;
  private _circleId: string;
  private _uniqueCallOutID: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _stackedData: any;
  private _chart: JSX.Element[];
  private margins: IMargins;
  private _rectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisRectScale: any;
  // determines if the given area chart has multiple stacked bar charts
  private _isMultiStackChart: boolean;

  public constructor(props: IAreaChartProps) {
    super(props);
    this._createSet = memoizeFunction((data: IChartProps) => this._createDataSet(data.lineChartData!));
    this.state = {
      activeLegend: '',
      hoverXValue: '',
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      YValueHover: [],
      lineXValue: 0,
      displayOfLine: InterceptVisibility.hide,
      isCircleClicked: false,
      nearestCircleToHighlight: null,
    };
    warnDeprecations(COMPONENT_NAME, props, {
      showYAxisGridLines: 'Dont use this property. Lines are drawn by default',
    });
    this._uniqueIdForGraph = getId('areaChart_');
    this._verticalLineId = getId('verticalLine_');
    this._circleId = getId('circle');
    this._rectId = getId('rectangle');
  }

  public render(): JSX.Element {
    const { colors, stackedInfo, calloutPoints } = this._createSet(this.props.data);
    this._calloutPoints = calloutPoints;
    const isXAxisDateType = getXAxisType(this.props.data.lineChartData!);
    this._colors = colors;
    this._stackedData = stackedInfo.stackedData;
    const legends: JSX.Element = this._getLegendData(this.props.theme!.palette, this.props.data.lineChartData!);

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
        points={this.props.data.lineChartData!}
        chartType={ChartTypes.AreaChart}
        calloutProps={calloutProps}
        legendBars={legends}
        isCalloutForStack
        xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
        tickParams={tickParams}
        maxOfYVal={stackedInfo.maxOfYVal}
        getGraphData={this._getGraphData}
        getmargins={this._getMargins}
        customizedCallout={this._getCustomizedCallout()}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this._xAxisRectScale = props.xScale;
          const ticks = this._xAxisRectScale.ticks();
          const width1 = this._xAxisRectScale(ticks[ticks.length - 1]);
          const rectHeight = props.containerHeight! - this.margins.top!;
          return (
            <>
              <g>
                <rect
                  id={this._rectId}
                  width={width1}
                  height={rectHeight}
                  fill={'transparent'}
                  onMouseMove={this._onRectMouseMove}
                  onMouseOut={this._onRectMouseOut}
                  onMouseOver={this._onRectMouseMove}
                />
              </g>
              <g>{this._chart}</g>
            </>
          );
        }}
      />
    );
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _onRectMouseMove = (mouseEvent: React.MouseEvent<SVGRectElement | SVGPathElement | SVGCircleElement>) => {
    mouseEvent.persist();
    const { data } = this.props;
    const { lineChartData } = data;
    // This will get the value of the X when mouse is on the chart
    const xOffset = this._xAxisRectScale.invert(clientPoint(document.getElementById(this._rectId)!, mouseEvent)[0]);
    const i = bisect(lineChartData![0].data, xOffset);
    const d0 = lineChartData![0].data[i - 1] as ILineChartDataPoint;
    const d1 = lineChartData![0].data[i] as ILineChartDataPoint;
    let axisType: XAxisTypes | null = null;
    let pointToHighlight: string | Date | number | null = null;
    let index: null | number = null;
    if (d0 === undefined && d1 !== undefined) {
      pointToHighlight = d1.x;
      index = i;
    } else if (d0 !== undefined && d1 === undefined) {
      pointToHighlight = d0.x;
      index = i - 1;
    } else {
      axisType = getTypeOfAxis(lineChartData![0].data[0].x, true) as XAxisTypes;
      let x0;
      let point0;
      let point1;
      switch (axisType) {
        case XAxisTypes.DateAxis:
          x0 = new Date(xOffset).getTime();
          point0 = (d0.x as Date).getTime();
          point1 = (d1.x as Date).getTime();
          pointToHighlight = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? d1.x : d0.x;
          index = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? i : i - 1;
          break;
        case XAxisTypes.NumericAxis:
          x0 = xOffset as number;
          point0 = d0.x as number;
          point1 = d1.x as number;
          pointToHighlight = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? d1.x : d0.x;
          index = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? i : i - 1;
          break;
        default:
          break;
      }
    }
    const xAxisCalloutData = lineChartData![0].data[index as number].xAxisCalloutData;
    const formattedDate = pointToHighlight instanceof Date ? pointToHighlight.toLocaleDateString() : pointToHighlight;
    const modifiedXVal = pointToHighlight instanceof Date ? pointToHighlight.getTime() : pointToHighlight;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => {
      return element.x === modifiedXVal;
    });
    this.setState({
      refSelected: mouseEvent,
      isCalloutVisible: true,
      nearestCircleToHighlight:
        axisType === XAxisTypes.DateAxis ? (pointToHighlight as Date).getTime() : pointToHighlight,
      lineXValue: this._xAxisRectScale(pointToHighlight),
      displayOfLine: InterceptVisibility.show,
      isCircleClicked: false,
      stackCalloutProps: found!,
      YValueHover: found.values,
      dataPointCalloutProps: found!,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
    });
  };
  /**
   * just cleaning up the state which we have set in the mouse move event
   */
  private _onRectMouseOut = () => {
    this.setState({
      refSelected: null,
      isCalloutVisible: false,
      nearestCircleToHighlight: null,
      lineXValue: 0,
      displayOfLine: InterceptVisibility.hide,
      isCircleClicked: false,
      stackCalloutProps: undefined,
      dataPointCalloutProps: undefined,
      hoverXValue: undefined,
      YValueHover: [],
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getStackedData = (keys: string[], dataSet: any) => {
    const stackedValues = d3Stack().keys(keys)(dataSet);
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
    this._isMultiStackChart = stackedData && stackedData.length > 1 ? true : false;
    return {
      stackedData,
      maxOfYVal,
    };
  };

  private _createDataSet = (points: ILineChartPoints[]) => {
    const allChartPoints: ILineChartDataPoint[] = [];
    const dataSet: IAreaChartDataSetPoint[] = [];
    const colors: string[] = [];
    const calloutPoints = calloutData(points!);

    points &&
      points.length &&
      points.forEach((singleChartPoint: ILineChartPoints) => {
        colors.push(singleChartPoint.color);
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

    // get keys from dataset, used to create stacked data
    const keysLength: number = dataSet && Object.keys(dataSet[0])!.length;
    const keys: string[] = [];
    for (let i = 0; i < keysLength - 1; i++) {
      const keyVal = `chart${i}`;
      keys.push(keyVal);
    }

    // Stacked Info used to draw graph
    const stackedInfo = this._getStackedData(keys, dataSet);

    return {
      colors,
      keys,
      stackedInfo,
      calloutPoints,
    };
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerStack
      ? this.props.onRenderCalloutPerStack(this.state.stackCalloutProps)
      : this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
      : null;
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

  private _getLegendData = (palette: IPalette, points: ILineChartPoints[]): JSX.Element => {
    const data = points;
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

  private _onDataPointClick = (func: (() => void) | undefined) => {
    if (func) {
      func();
    }
    this.setState({ isCircleClicked: true });
  };

  private _getOpacity = (selectedArea: string): number => {
    if (!this._isMultiStackChart) {
      return 0.7;
    } else {
      let opacity = 0.7;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        opacity = this.state.activeLegend === selectedArea ? 0.7 : 0.1;
      }
      return opacity;
    }
  };

  private _getLineOpacity = (legend: string): number => {
    if (!this._isMultiStackChart) {
      return 1;
    } else {
      let opacity = 0.3;
      if (this.state.isCalloutVisible) {
        opacity = 1;
      }
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        opacity = this.state.activeLegend === legend ? 0 : 0.1;
      }
      return opacity;
    }
  };

  private _updateCircleFillColor = (xDataPoint: number | Date, lineColor: string): string => {
    if (this.state.isCircleClicked && this.state.nearestCircleToHighlight === xDataPoint) {
      return lineColor;
    } else {
      return this.state.nearestCircleToHighlight === xDataPoint ? this.props.theme!.palette.white : lineColor;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _drawGraph = (containerHeight: number, xScale: any, yScale: any): JSX.Element[] => {
    const points = this.props.data.lineChartData!;
    const area = d3Area()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((d: any) => xScale(d.xVal))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y0((d: any) => yScale(d.values[0]))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y1((d: any) => yScale(d.values[1]))
      .curve(d3CurveBasis);
    const line = d3Line()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((d: any) => xScale(d.xVal))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y((d: any) => yScale(d.values[1]))
      .curve(d3CurveBasis);

    const graph: JSX.Element[] = [];
    let lineColor: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._stackedData.forEach((singleStackedData: Array<any>, index: number) => {
      graph.push(
        <React.Fragment key={`${index}-graph-${this._uniqueIdForGraph}`}>
          <path
            id={`${index}-line-${this._uniqueIdForGraph}`}
            d={line(singleStackedData)!}
            fill={'transparent'}
            strokeWidth={3}
            stroke={this._colors[index]}
            opacity={this._getLineOpacity(points[index]!.legend)}
            onMouseMove={this._onRectMouseMove}
            onMouseOut={this._onRectMouseOut}
            onMouseOver={this._onRectMouseMove}
          />
          <path
            id={`${index}-graph-${this._uniqueIdForGraph}`}
            d={area(singleStackedData)!}
            fill={this._colors[index]}
            fillOpacity={this._getOpacity(points[index]!.legend)}
            onMouseMove={this._onRectMouseMove}
            onMouseOut={this._onRectMouseOut}
            onMouseOver={this._onRectMouseMove}
          />
        </React.Fragment>,
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._stackedData.forEach((singleStackedData: Array<any>, index: number) => {
      if (points.length === index) {
        return;
      }
      graph.push(
        <g key={`${index}-dots-${this._uniqueIdForGraph}`} d={area(singleStackedData)!} clipPath="url(#clip)">
          {singleStackedData.map((singlePoint: IDPointType, pointIndex: number) => {
            const circleId = `${this._circleId}_${index * this._stackedData[0].length + pointIndex}`;
            const xDataPoint = singlePoint.xVal instanceof Date ? singlePoint.xVal.getTime() : singlePoint.xVal;
            lineColor = points[index]!.color;
            return (
              <circle
                key={circleId}
                id={circleId}
                data-is-focusable={true}
                cx={xScale(singlePoint.xVal)}
                cy={yScale(singlePoint.values[1])}
                r={this._getCircleRadius(xDataPoint)}
                stroke={lineColor}
                strokeWidth={3}
                visibility={this.state.isCalloutVisible ? 'visibility' : 'hidden'}
                fill={this._updateCircleFillColor(xDataPoint, lineColor)}
                onMouseOut={this._onRectMouseOut}
                onMouseOver={this._onRectMouseMove}
                onClick={this._onDataPointClick.bind(this, points[index]!.data[pointIndex].onDataPointClick!)}
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
  private _getCircleRadius = (xDataPoint: number): number => {
    const { isCircleClicked, nearestCircleToHighlight } = this.state;
    if (isCircleClicked && nearestCircleToHighlight === xDataPoint) {
      return 1;
    } else if (nearestCircleToHighlight === xDataPoint) {
      return 8;
    } else {
      return 0;
    }
  };
}
