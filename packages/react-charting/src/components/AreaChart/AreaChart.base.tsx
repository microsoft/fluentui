import * as React from 'react';
import { max as d3Max, bisector } from 'd3-array';
import { pointer } from 'd3-selection';
import { select as d3Select } from 'd3-selection';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis, line as d3Line } from 'd3-shape';
import { classNamesFunction, find, getId, memoizeFunction } from '@fluentui/react/lib/Utilities';
import {
  IAccessibilityProps,
  CartesianChart,
  ICustomizedCalloutData,
  IAreaChartProps,
  IBasestate,
  ILineChartDataPoint,
  ILineChartPoints,
  IChildProps,
  IMargins,
  IAreaChartStyleProps,
  IAreaChartStyles,
} from '../../index';
import { warnDeprecations } from '@fluentui/react/lib/Utilities';
import {
  calloutData,
  getXAxisType,
  ChartTypes,
  XAxisTypes,
  getTypeOfAxis,
  tooltipOfXAxislabels,
  getNextColor,
  getColorFromToken,
  findNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfNumericForAreaChart,
  domainRangeOfDateForAreaLineVerticalBarChart,
  createStringYAxis,
  formatDate,
} from '../../utilities/index';
import { ILegend, Legends } from '../Legends/index';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

const getClassNames = classNamesFunction<IAreaChartStyleProps, IAreaChartStyles>();

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
export interface IMapXToDataSet {
  [key: string]: ILineChartDataPoint[];
  [key: number]: ILineChartDataPoint[];
}

//by default d3-shape 3.2.0 limits the< path> data point precision to 3 digits(d3/d3-path#10)

export interface IAreaChartState extends IBasestate {
  lineXValue: number;
  displayOfLine: InterceptVisibility;
  isCircleClicked: boolean;
  dataPointCalloutProps?: ICustomizedCalloutData;
  stackCalloutProps?: ICustomizedCalloutData;
  nearestCircleToHighlight: number | string | Date | null;
  xAxisCalloutAccessibilityData?: IAccessibilityProps;
  isShowCalloutPending: boolean;
  /** focused point */
  activePoint: string;
}

export class AreaChartBase extends React.Component<IAreaChartProps, IAreaChartState> {
  public static defaultProps: Partial<IAreaChartProps> = {
    useUTC: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any;
  private _createSet: (data: ILineChartPoints[]) => {
    colors: string[];
    opacity: number[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stackedInfo: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calloutPoints: any;
  };
  private _colors: string[];
  private _opacity: number[];
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
  private _tooltipId: string;
  private _highlightedCircleId: string;
  //enableComputationOptimization is used for optimized code to group data points by x value
  //from O(n^2) to O(n) using a map.
  private _enableComputationOptimization: boolean;
  private _firstRenderOptimization: boolean;
  private _emptyChartId: string;

  public constructor(props: IAreaChartProps) {
    super(props);
    this._createSet = memoizeFunction(this._createDataSet);
    this.state = {
      selectedLegend: '',
      activeLegend: '',
      hoverXValue: '',
      isCalloutVisible: false,
      refSelected: null,
      YValueHover: [],
      lineXValue: 0,
      displayOfLine: InterceptVisibility.hide,
      isCircleClicked: false,
      nearestCircleToHighlight: null,
      isShowCalloutPending: false,
      activePoint: '',
    };
    warnDeprecations(COMPONENT_NAME, props, {
      showYAxisGridLines: 'Dont use this property. Lines are drawn by default',
    });
    this._uniqueIdForGraph = getId('areaChart_');
    this._verticalLineId = getId('verticalLine_');
    this._circleId = getId('circle');
    this._rectId = getId('rectangle');
    this._tooltipId = getId('AreaChartTooltipID');
    this._enableComputationOptimization = true;
    this._firstRenderOptimization = true;
    this._emptyChartId = getId('_AreaChart_empty');
  }

  public componentDidUpdate() {
    if (this.state.isShowCalloutPending) {
      this.setState({
        refSelected: `#${this._highlightedCircleId}`,
        isCalloutVisible: true,
        isShowCalloutPending: false,
      });
    }
  }

  public render(): JSX.Element {
    if (!this._isChartEmpty()) {
      const { lineChartData } = this.props.data;
      const points = this._addDefaultColors(lineChartData);
      const { colors, opacity, stackedInfo, calloutPoints } = this._createSet(points);
      this._calloutPoints = calloutPoints;
      const isXAxisDateType = getXAxisType(points);
      this._colors = colors;
      this._opacity = opacity;
      this._stackedData = stackedInfo.stackedData;
      const legends: JSX.Element = this._getLegendData(points);

      const tickParams = {
        tickValues: this.props.tickValues,
        tickFormat: this.props.tickFormat,
      };

      const calloutProps = {
        target: this.state.refSelected,
        isCalloutVisible: this.state.isCalloutVisible,
        directionalHint: DirectionalHint.topAutoEdge,
        YValueHover: this.state.YValueHover,
        hoverXValue: this.state.hoverXValue,
        id: `toolTip${this._uniqueCallOutID}`,
        gapSpace: 15,
        isBeakVisible: false,
        onDismiss: this._closeCallout,
        'data-is-focusable': true,
        xAxisCalloutAccessibilityData: this.state.xAxisCalloutAccessibilityData,
        ...this.props.calloutProps,
      };
      return (
        <CartesianChart
          {...this.props}
          chartTitle={this._getChartTitle()}
          points={points}
          chartType={ChartTypes.AreaChart}
          calloutProps={calloutProps}
          legendBars={legends}
          createYAxis={createNumericYAxis}
          isCalloutForStack
          xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
          tickParams={tickParams}
          maxOfYVal={stackedInfo.maxOfYVal}
          getGraphData={this._getGraphData}
          getDomainNRangeValues={this._getDomainNRangeValues}
          createStringYAxis={createStringYAxis}
          getmargins={this._getMargins}
          getMinMaxOfYAxis={findNumericMinMaxOfY}
          customizedCallout={this._getCustomizedCallout()}
          onChartMouseLeave={this._handleChartMouseLeave}
          enableFirstRenderOptimization={this.props.enablePerfOptimization && this._firstRenderOptimization}
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
    return (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  private _getDomainNRangeValues = (
    points: ILineChartPoints[],
    margins: IMargins,
    width: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | undefined,
  ) => {
    let domainNRangeValue: IDomainNRange;
    if (xAxisType === XAxisTypes.NumericAxis) {
      domainNRangeValue = domainRangeOfNumericForAreaChart(points, margins, width, isRTL);
    } else if (xAxisType === XAxisTypes.DateAxis) {
      domainNRangeValue = domainRangeOfDateForAreaLineVerticalBarChart(
        points,
        margins,
        width,
        isRTL,
        tickValues! as Date[],
        chartType,
        barWidth,
      );
    } else {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
    return domainNRangeValue;
  };

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _onRectMouseMove = (mouseEvent: React.MouseEvent<SVGRectElement | SVGPathElement | SVGCircleElement>) => {
    mouseEvent.persist();
    const { data } = this.props;
    const { lineChartData } = data;
    // This will get the value of the X when mouse is on the chart
    const xOffset = this._xAxisRectScale.invert(pointer(mouseEvent)[0], document.getElementById(this._rectId)!);
    const i = bisect(lineChartData![0].data, xOffset);
    const d0 = lineChartData![0].data[i - 1] as ILineChartDataPoint;
    const d1 = lineChartData![0].data[i] as ILineChartDataPoint;
    let pointToHighlight: string | Date | number | null = null;
    let index: null | number = null;
    const axisType =
      lineChartData![0].data.length > 0 ? (getTypeOfAxis(lineChartData![0].data[0].x, true) as XAxisTypes) : null;
    if (d0 === undefined && d1 !== undefined) {
      pointToHighlight = d1.x;
      index = i;
    } else if (d0 !== undefined && d1 === undefined) {
      pointToHighlight = d0.x;
      index = i - 1;
    } else {
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

    const { xAxisCalloutData, xAxisCalloutAccessibilityData } = lineChartData![0].data[index as number];
    const formattedDate =
      pointToHighlight instanceof Date ? formatDate(pointToHighlight, this.props.useUTC) : pointToHighlight;
    const modifiedXVal = pointToHighlight instanceof Date ? pointToHighlight.getTime() : pointToHighlight;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => {
      return element.x === modifiedXVal;
    });
    const nearestCircleToHighlight =
      axisType === XAxisTypes.DateAxis ? (pointToHighlight as Date).getTime() : pointToHighlight;
    const pointToHighlightUpdated = this.state.nearestCircleToHighlight !== nearestCircleToHighlight;
    // if no points need to be called out then don't show vertical line and callout card
    if (found && pointToHighlightUpdated && !this.state.isShowCalloutPending) {
      this.setState({
        nearestCircleToHighlight: nearestCircleToHighlight,
        isCalloutVisible: false,
        isShowCalloutPending: true,
        lineXValue: this._xAxisRectScale(pointToHighlight),
        displayOfLine: InterceptVisibility.show,
        isCircleClicked: false,
        stackCalloutProps: found!,
        YValueHover: found.values,
        dataPointCalloutProps: found!,
        hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
        xAxisCalloutAccessibilityData,
        activePoint: '',
      });
    } else {
      /*
      When above if condition is false but found=true, it means either

      1). pointToHighlightUpdated is false.
      For this case we dont need to do anything.

      2). isShowCalloutPending is true.
      For this case there will be no callout updation for the event.
      This condition has been added to prevent repeated callout flashing.
      Currently there is a fraction of second delay between hover event and subsequent callout refresh.
      In the meantime if another event is received, the callout continues to flash for the set of
      intermediate hover events.

      This does not cause any issue as the user interaction takes atleast a fraction of second and the final
      callout state is ultimately achieved.
      If a user performs very swift mouse maneuver, the intermediate events will be lost but the callout experience
      remains smooth.
      */
    }
    if (!found) {
      this.setState({
        isCalloutVisible: false,
        nearestCircleToHighlight: nearestCircleToHighlight,
        displayOfLine: InterceptVisibility.hide,
        isCircleClicked: false,
      });
    }
  };
  /**
   * just cleaning up the state which we have set in the mouse move event
   */
  private _onRectMouseOut = () => {
    /**/
  };

  private _handleChartMouseLeave = () => {
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
    if (this.props.enablePerfOptimization && this._enableComputationOptimization) {
      const allChartPoints: ILineChartDataPoint[] = [];
      const dataSet: IAreaChartDataSetPoint[] = [];
      const colors: string[] = [];
      const opacity: number[] = [];
      const calloutPoints = calloutData(points!);

      points &&
        points.length &&
        points.forEach((singleChartPoint: ILineChartPoints) => {
          colors.push(singleChartPoint.color!);
          opacity.push(singleChartPoint.opacity || 1);
          allChartPoints.push(...singleChartPoint.data);
        });

      const mapOfXvalToListOfDataPoints: IMapXToDataSet = {};
      allChartPoints.forEach((dataPoint: ILineChartDataPoint) => {
        const xValue = dataPoint.x instanceof Date ? dataPoint.x.toLocaleString() : dataPoint.x;
        // map of x value to the list of data points which share the same x value .
        if (mapOfXvalToListOfDataPoints[xValue]) {
          mapOfXvalToListOfDataPoints[xValue].push(dataPoint);
        } else {
          mapOfXvalToListOfDataPoints[xValue] = [dataPoint];
        }
      });

      Object.keys(mapOfXvalToListOfDataPoints).forEach((key: number | string) => {
        const value: ILineChartDataPoint[] = mapOfXvalToListOfDataPoints[key];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const singleDataset: any = {};
        value.forEach((singleDataPoint: ILineChartDataPoint, index: number) => {
          singleDataset.xVal = singleDataPoint.x;
          singleDataset[`chart${index}`] = singleDataPoint.y;
        });
        dataSet.push(singleDataset);
      });

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
        opacity,
        keys,
        stackedInfo,
        calloutPoints,
      };
    } else {
      const allChartPoints: ILineChartDataPoint[] = [];
      const dataSet: IAreaChartDataSetPoint[] = [];
      const colors: string[] = [];
      const opacity: number[] = [];
      const calloutPoints = calloutData(points!);

      points &&
        points.length &&
        points.forEach((singleChartPoint: ILineChartPoints) => {
          colors.push(singleChartPoint.color!);
          opacity.push(singleChartPoint.opacity || 1);
          allChartPoints.push(...singleChartPoint.data);
        });

      let tempArr = allChartPoints;
      while (tempArr.length) {
        const valToCheck = tempArr[0].x instanceof Date ? tempArr[0].x.toLocaleString() : tempArr[0].x;
        const filteredChartPoints: ILineChartDataPoint[] = tempArr.filter(
          (point: ILineChartDataPoint) => (point.x instanceof Date ? point.x.toLocaleString() : point.x) === valToCheck,
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const singleDataset: any = {};
        filteredChartPoints.forEach((singleDataPoint: ILineChartDataPoint, index: number) => {
          singleDataset.xVal = singleDataPoint.x;
          singleDataset[`chart${index}`] = singleDataPoint.y;
        });
        dataSet.push(singleDataset);
        // removing compared objects from array
        const val = tempArr[0].x instanceof Date ? tempArr[0].x.toLocaleString() : tempArr[0].x;
        tempArr = tempArr.filter(
          (point: ILineChartDataPoint) => (point.x instanceof Date ? point.x.toLocaleString() : point.x) !== val,
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
        opacity,
        keys,
        stackedInfo,
        calloutPoints,
      };
    }
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerStack
      ? this.props.onRenderCalloutPerStack(this.state.stackCalloutProps)
      : this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
      : null;
  };

  private _getGraphData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xAxis: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yAxis: any,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ) => {
    this._chart = this._drawGraph(containerHeight, xAxis, yAxis, xElement!);
  };

  private _onLegendClick(legend: string): void {
    if (this.state.selectedLegend === legend) {
      this.setState({
        selectedLegend: '',
      });
    } else {
      this.setState({
        selectedLegend: legend,
      });
    }
  }

  private _onLegendHover(legend: string): void {
    this.setState({
      activeLegend: legend,
    });
  }

  private _onLegendLeave(): void {
    this.setState({
      activeLegend: '',
    });
  }

  private _getLegendData = (points: ILineChartPoints[]): JSX.Element => {
    const data = points;
    const actions: ILegend[] = [];

    data.forEach((singleChartData: ILineChartPoints) => {
      const color: string = singleChartData.color!;
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
          this._handleChartMouseLeave();
          this._onLegendHover(singleChartData.legend);
        },
        onMouseOutAction: () => {
          this._onLegendLeave();
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

  private _getOpacity = (legend: string): number => {
    if (!this._isMultiStackChart) {
      return 0.7;
    } else {
      const opacity = this._legendHighlighted(legend) || this._noLegendHighlighted() ? 0.7 : 0.1;
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
      if (!this._noLegendHighlighted()) {
        opacity = this._legendHighlighted(legend) ? 0 : 0.1;
      }
      return opacity;
    }
  };

  private _updateCircleFillColor = (xDataPoint: number | Date, lineColor: string, circleId: string): string => {
    let fillColor = lineColor;
    if (this.state.nearestCircleToHighlight === xDataPoint || this.state.activePoint === circleId) {
      this._highlightedCircleId = circleId;
      if (!this.state.isCircleClicked) {
        fillColor = this.props.theme!.semanticColors.bodyBackground;
      }
    }

    return fillColor;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _drawGraph = (containerHeight: number, xScale: any, yScale: any, xElement: SVGElement): JSX.Element[] => {
    const points = this._addDefaultColors(this.props.data.lineChartData);
    const { pointOptions, pointLineOptions } = this.props.data;
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
          {this.props.enableGradient && (
            <defs>
              <linearGradient id={`gradient_${index}`} x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0" stopColor={this._colors[index]} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
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
            {...points[index]!.lineOptions}
          />
          {singleStackedData.length === 1 ? (
            <circle
              id={`${index}-graph-${this._uniqueIdForGraph}`}
              cx={xScale(singleStackedData[0].xVal)}
              cy={yScale(singleStackedData[0].values[1])}
              r={6}
              stroke={this._colors[index]}
              strokeWidth={3}
              fill={this._colors[index]}
              opacity={this._opacity[index]}
              fillOpacity={this._getOpacity(points[index]!.legend)}
              onMouseMove={this._onRectMouseMove}
              onMouseOut={this._onRectMouseOut}
              onMouseOver={this._onRectMouseMove}
            />
          ) : (
            <path
              id={`${index}-graph-${this._uniqueIdForGraph}`}
              d={area(singleStackedData)!}
              fill={this.props.enableGradient ? `url(#gradient_${index})` : this._colors[index]}
              opacity={this._opacity[index]}
              fillOpacity={this._getOpacity(points[index]!.legend)}
              onMouseMove={this._onRectMouseMove}
              onMouseOut={this._onRectMouseOut}
              onMouseOver={this._onRectMouseMove}
              {...(this.props.optimizeLargeData && {
                'data-is-focusable': this._legendHighlighted(points[index]!.legend) || this._noLegendHighlighted(),
                role: 'img',
                'aria-label': `${points[index].legend}, series ${index + 1} of ${points.length} with ${
                  points[index].data.length
                } data points.`,
              })}
            />
          )}
        </React.Fragment>,
      );
    });

    const circleRadius = pointOptions && pointOptions.r ? Number(pointOptions.r) : 8;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._stackedData.forEach((singleStackedData: Array<any>, index: number) => {
      if (points.length === index) {
        return;
      }

      if (!this.props.optimizeLargeData || singleStackedData.length === 1) {
        // Render circles for all data points
        graph.push(
          <g
            key={`${index}-dots-${this._uniqueIdForGraph}`}
            d={area(singleStackedData)!}
            clipPath="url(#clip)"
            role="region"
            aria-label={`${points[index].legend}, series ${index + 1} of ${points.length} with ${
              points[index].data.length
            } data points.`}
          >
            {singleStackedData.map((singlePoint: IDPointType, pointIndex: number) => {
              const circleId = `${this._circleId}_${index * this._stackedData[0].length + pointIndex}`;
              const xDataPoint = singlePoint.xVal instanceof Date ? singlePoint.xVal.getTime() : singlePoint.xVal;
              lineColor = points[index]!.color!;
              return (
                <circle
                  key={circleId}
                  id={circleId}
                  data-is-focusable={this._legendHighlighted(points[index]!.legend) || this._noLegendHighlighted()}
                  cx={xScale(singlePoint.xVal)}
                  cy={yScale(singlePoint.values[1])}
                  stroke={lineColor}
                  strokeWidth={3}
                  fill={this._updateCircleFillColor(xDataPoint, lineColor, circleId)}
                  onMouseOut={this._onRectMouseOut}
                  onMouseOver={this._onRectMouseMove}
                  onClick={this._onDataPointClick.bind(this, points[index]!.data[pointIndex].onDataPointClick!)}
                  onFocus={() => this._handleFocus(index, pointIndex, circleId)}
                  onBlur={this._handleBlur}
                  {...pointOptions}
                  r={this._getCircleRadius(xDataPoint, circleRadius, circleId)}
                  role="img"
                  aria-label={this._getAriaLabel(index, pointIndex)}
                />
              );
            })}
          </g>,
        );
      } else {
        // Render circles for data points close to the mouse pointer only
        singleStackedData.forEach((singlePoint: IDPointType, pointIndex: number) => {
          const xDataPoint = singlePoint.xVal instanceof Date ? singlePoint.xVal.getTime() : singlePoint.xVal;
          if (this.state.nearestCircleToHighlight === xDataPoint) {
            const circleId = `${this._circleId}_${index * this._stackedData[0].length + pointIndex}`;
            lineColor = points[index]!.color!;
            graph.push(
              <circle
                key={circleId}
                id={circleId}
                cx={xScale(singlePoint.xVal)}
                cy={yScale(singlePoint.values[1])}
                stroke={lineColor}
                strokeWidth={3}
                fill={this._updateCircleFillColor(xDataPoint, lineColor, circleId)}
                onMouseOut={this._onRectMouseOut}
                onMouseOver={this._onRectMouseMove}
                onClick={this._onDataPointClick.bind(this, points[index]!.data[pointIndex].onDataPointClick!)}
                {...pointOptions}
                r={this._getCircleRadius(xDataPoint, circleRadius, circleId)}
              />,
            );
          }
        });
      }
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
        {...pointLineOptions}
      />,
    );
    const classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
    });
    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!this.props.showXAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xScale);
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: classNames.tooltip!,
        id: this._tooltipId,
        xAxis: xAxisElement,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return graph;
  };

  private _getCircleRadius = (xDataPoint: number, circleRadius: number, circleId: string): number => {
    const { isCircleClicked, nearestCircleToHighlight, activePoint } = this.state;
    if (isCircleClicked && nearestCircleToHighlight === xDataPoint) {
      return 1;
    } else if (nearestCircleToHighlight === xDataPoint || activePoint === circleId) {
      return circleRadius;
    } else {
      return 0;
    }
  };

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legend: string) => {
    return (
      this.state.selectedLegend === legend || (this.state.selectedLegend === '' && this.state.activeLegend === legend)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.activeLegend === '';
  };

  private _addDefaultColors = (lineChartData?: ILineChartPoints[]): ILineChartPoints[] => {
    return lineChartData
      ? lineChartData.map((item, index) => {
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

  private _handleFocus = (lineIndex: number, pointIndex: number, circleId: string) => {
    const { x, y, xAxisCalloutData } = this.props.data.lineChartData![lineIndex].data[pointIndex];
    const formattedDate = x instanceof Date ? formatDate(x, this.props.useUTC) : x;
    const modifiedXVal = x instanceof Date ? x.getTime() : x;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = this._calloutPoints.find((e: { x: string | number }) => e.x === modifiedXVal);
    // Show details in the callout for the focused point only
    found.values = found.values.filter((e: { y: number }) => e.y === y);

    this.setState({
      refSelected: `#${circleId}`,
      isCalloutVisible: true,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
      YValueHover: found.values,
      stackCalloutProps: found,
      dataPointCalloutProps: found,
      activePoint: circleId,
    });
  };

  private _handleBlur = () => {
    this.setState({
      refSelected: null,
      isCalloutVisible: false,
      hoverXValue: undefined,
      YValueHover: [],
      stackCalloutProps: undefined,
      dataPointCalloutProps: undefined,
      activePoint: '',
    });
  };

  private _getAriaLabel(lineIndex: number, pointIndex: number): string {
    const line = this.props.data.lineChartData![lineIndex];
    const point = line.data[pointIndex];
    const formattedDate = point.x instanceof Date ? formatDate(point.x, this.props.useUTC) : point.x;
    const xValue = point.xAxisCalloutData || formattedDate;
    const legend = line.legend;
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
  }

  private _isChartEmpty(): boolean {
    return !(
      (
        this.props.data &&
        this.props.data.lineChartData &&
        this.props.data.lineChartData.length > 0 &&
        this.props.data.lineChartData.filter(item => item.data.length === 0).length === 0
      )
      // if all the data sets have no data
      // filtering all items which have no data and checking if the length of the filtered array is 0
      // which means chart is not empty
    );
  }

  private _getChartTitle = (): string => {
    const { chartTitle, lineChartData } = this.props.data;
    return (chartTitle ? `${chartTitle}. ` : '') + `Area chart with ${lineChartData?.length || 0} data series. `;
  };
}
