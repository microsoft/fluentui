import * as React from 'react';
import { useAreaChartStyles } from './useAreaChartStyles.styles';
import { max as d3Max, bisector } from 'd3-array';
import { pointer } from 'd3-selection';
import { select as d3Select } from 'd3-selection';
import { tokens } from '@fluentui/react-theme';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis, line as d3Line } from 'd3-shape';
import {
  AccessibilityProps,
  CartesianChart,
  CustomizedCalloutData,
  AreaChartProps,
  LineChartDataPoint,
  LineChartPoints,
  ChildProps,
  Margins,
  YValueHover,
  ChartPopoverProps,
  Chart,
  ImageExportOptions,
} from '../../index';
import {
  calloutData,
  getXAxisType,
  ChartTypes,
  XAxisTypes,
  getTypeOfAxis,
  tooltipOfAxislabels,
  getNextColor,
  getColorFromToken,
  getSecureProps,
  areArraysEqual,
  getCurveFactory,
  find,
  findNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfNumericForAreaLineScatterCharts,
  domainRangeOfDateForAreaLineScatterVerticalBarCharts,
  createStringYAxis,
  useRtl,
  YAxisType,
} from '../../utilities/index';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { Legend, LegendContainer, Legends } from '../Legends/index';
import { ScaleLinear } from 'd3-scale';
import { toImage } from '../../utilities/image-export-utils';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bisect = bisector((d: any) => d.x).left;

enum InterceptVisibility {
  show = 'visibility',
  hide = 'hidden',
}

export interface AreaChartAreaPoint {
  xVal: string | number;
  values: AreaChartDataSetPoint;
}
export interface AreaChartDataSetPoint {
  [key: string]: number | string | number[];
}
export interface DPointType {
  values: { 0: number; 1: number; data: {} };
  xVal: number | Date;
}
export interface MapXToDataSet {
  [key: string]: LineChartDataPoint[];
  [key: number]: LineChartDataPoint[];
}

//by default d3-shape 3.2.0 limits the< path> data point precision to 3 digits(d3/d3-path#10)

export const AreaChart: React.FunctionComponent<AreaChartProps> = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (props, forwardedRef) => {
    const _uniqueIdForGraph: string = useId('areaChart_');
    const _verticalLineId: string = useId('verticalLine_');
    const _circleId: string = useId('circle');
    const _rectId: string = useId('rectangle');
    const _tooltipId: string = useId('AreaChartTooltipID');
    //enableComputationOptimization is used for optimized code to group data points by x value
    //from O(n^2) to O(n) using a map.
    const _enableComputationOptimization: boolean = true;
    const _firstRenderOptimization: boolean = true;
    const _emptyChartId: string = useId('_AreaChart_empty');
    let _containsSecondaryYAxis = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _calloutPoints: any;
    let _createSet: (data: LineChartPoints[]) => {
      colors: string[];
      opacity: number[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      calloutPoints: any;
    };
    let _colors: string[];
    let _opacity: number[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _data: any;
    let _chart: JSXElement[];
    let _margins: Margins;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _xAxisRectScale: any;
    // determines if the given area chart has multiple stacked bar charts
    let _isMultiStackChart: boolean;
    const cartesianChartRef = React.useRef<Chart>(null);
    const _legendsRef = React.useRef<LegendContainer>(null);
    const _isRTL: boolean = useRtl();

    const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
    const [activeLegend, setActiveLegend] = React.useState<string | undefined>(undefined);
    const [hoverXValue, setHoverXValue] = React.useState<string | number | undefined | null>('');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [YValueHover, setYValueHover] = React.useState<YValueHover[]>([]);
    const [lineXValue, setLineXValue] = React.useState<number>(0);
    const [displayOfLine, setDisplayOfLine] = React.useState<InterceptVisibility>(InterceptVisibility.hide);
    const [isCircleClicked, setIsCircleClicked] = React.useState<boolean>(false);
    const [nearestCircleToHighlight, setNearestCircleToHighlight] = React.useState<number | string | Date | null>(null);
    const [activePoint, setActivePoint] = React.useState<string>('');
    const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<CustomizedCalloutData>();
    const [stackCalloutProps, setStackCalloutProps] = React.useState<CustomizedCalloutData>();
    const [xAxisCalloutAccessibilityData, setXAxisCalloutAccessibilityData] = React.useState<AccessibilityProps>();
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);
    const prevPropsRef = React.useRef<AreaChartProps | null>(null);

    React.useEffect(() => {
      if (prevPropsRef.current) {
        const prevProps = prevPropsRef.current;
        if (!areArraysEqual(prevProps.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
          setSelectedLegends(props.legendProps?.selectedLegends || []);
        }
      }
      prevPropsRef.current = props;
    }, [props]);

    React.useImperativeHandle(
      props.componentRef,
      () => ({
        chartContainer: cartesianChartRef.current?.chartContainer ?? null,
        toImage: (opts?: ImageExportOptions): Promise<string> => {
          return toImage(cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, _isRTL, opts);
        },
      }),
      [],
    );

    const classes = useAreaChartStyles(props);

    function _getMinMaxOfYAxis(points: LineChartPoints[], yAxisType: YAxisType, useSecondaryYScale: boolean) {
      return findNumericMinMaxOfY(points, yAxisType, useSecondaryYScale);
    }

    function _getDomainNRangeValues(
      points: LineChartPoints[],
      margins: Margins,
      width: number,
      chartType: ChartTypes,
      isRTL: boolean,
      xAxisType: XAxisTypes,
      barWidth: number,
      tickValues: Date[] | number[] | undefined,
    ) {
      let domainNRangeValue: IDomainNRange;
      if (xAxisType === XAxisTypes.NumericAxis) {
        domainNRangeValue = domainRangeOfNumericForAreaLineScatterCharts(points, margins, width, isRTL);
      } else if (xAxisType === XAxisTypes.DateAxis) {
        domainNRangeValue = domainRangeOfDateForAreaLineScatterVerticalBarCharts(
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
    }

    function _getMargins(margins: Margins) {
      _margins = margins;
    }

    function _onRectMouseMove(mouseEvent: React.MouseEvent<SVGRectElement | SVGPathElement | SVGCircleElement>) {
      mouseEvent.persist();
      const { data } = props;
      const { lineChartData } = data;
      _updatePosition(mouseEvent.clientX, mouseEvent.clientY);
      // This will get the value of the X when mouse is on the chart
      // eslint-disable-next-line @nx/workspace-no-restricted-globals
      const xOffset = _xAxisRectScale.invert(pointer(mouseEvent)[0], document.getElementById(_rectId)!);
      const i = bisect(lineChartData![0].data, xOffset);
      const d0 = lineChartData![0].data[i - 1] as LineChartDataPoint;
      const d1 = lineChartData![0].data[i] as LineChartDataPoint;
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

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { xAxisCalloutData, xAxisCalloutAccessibilityData } = lineChartData![0].data[index as number];
      const formattedDate =
        pointToHighlight instanceof Date
          ? formatDateToLocaleString(pointToHighlight, props.culture, props.useUTC as boolean)
          : pointToHighlight;
      const modifiedXVal = pointToHighlight instanceof Date ? pointToHighlight.getTime() : pointToHighlight;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const found: any = find(_calloutPoints, (element: { x: string | number }) => {
        return element.x === modifiedXVal;
      });
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const _nearestCircleToHighlight =
        axisType === XAxisTypes.DateAxis ? (pointToHighlight as Date).getTime() : pointToHighlight;
      // if no points need to be called out then don't show vertical line and callout card
      if (found) {
        const filteredValues = _getFilteredLegendValues(found.values);
        setNearestCircleToHighlight(_nearestCircleToHighlight);
        setLineXValue(_xAxisRectScale(pointToHighlight));
        setDisplayOfLine(InterceptVisibility.show);
        setIsCircleClicked(false);
        setStackCalloutProps({ ...found, values: filteredValues });
        setYValueHover(filteredValues);
        setDataPointCalloutProps({ ...found, values: filteredValues });
        setHoverXValue(xAxisCalloutData ? xAxisCalloutData : formattedDate);
        setXAxisCalloutAccessibilityData(xAxisCalloutAccessibilityData);
        setActivePoint('');
      } else {
        setPopoverOpen(false);
        setNearestCircleToHighlight(nearestCircleToHighlight);
        setDisplayOfLine(InterceptVisibility.hide);
        setIsCircleClicked(false);
      }
    }
    /**
     * just cleaning up the state which we have set in the mouse move event
     */
    function _onRectMouseOut() {
      /**/
    }

    function _updatePosition(newX: number, newY: number) {
      const threshold = 1; // Set a threshold for movement
      const { x, y } = clickPosition;
      // Calculate the distance moved
      const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
      // Update the position only if the distance moved is greater than the threshold
      if (distance > threshold) {
        setClickPosition({ x: newX, y: newY });
        setPopoverOpen(true);
      }
    }

    function _handleChartMouseLeave() {
      setPopoverOpen(false);
      setNearestCircleToHighlight(null);
      setLineXValue(0);
      setDisplayOfLine(InterceptVisibility.hide);
      setIsCircleClicked(false);
      setStackCalloutProps(undefined);
      setDataPointCalloutProps(undefined);
      setHoverXValue(undefined);
      setYValueHover([]);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _getDataPoints(keys: string[], dataSet: any) {
      const renderPoints: Array<AreaChartDataSetPoint[]> = [];
      let maxOfYVal = 0;

      if (_shouldFillToZeroY()) {
        keys.forEach((key, index) => {
          const currentLayer: AreaChartDataSetPoint[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataSet.forEach((d: any) => {
            currentLayer.push({
              values: [0, d[key]], // Start from zero for "tozeroy" mode
              xVal: d.xVal,
            });
            if (d[key] > maxOfYVal) {
              maxOfYVal = d[key];
            }
          });
          renderPoints.push(currentLayer);
        });
      } else {
        const dataValues = d3Stack().keys(keys)(dataSet);
        maxOfYVal = d3Max(dataValues[dataValues.length - 1], dp => dp[1])!;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataValues.forEach((layer: any) => {
          const currentLayer: AreaChartDataSetPoint[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          layer.forEach((d: any) => {
            currentLayer.push({
              values: d,
              xVal: d.data.xVal,
            });
          });
          renderPoints.push(currentLayer);
        });
      }

      _isMultiStackChart = !!(props.legendProps?.selectedLegends
        ? renderPoints?.length >= 1
        : renderPoints?.length > 1);
      return {
        renderData: renderPoints,
        // The maxOfYVal prop is only required for the primary y-axis. When the data includes
        // a secondary y-axis, the mode defaults to tozeroy, so maxOfYVal should be calculated using
        // only the data points associated with the primary y-axis.
        maxOfYVal: _containsSecondaryYAxis ? findNumericMinMaxOfY(props.data.lineChartData!).endValue : maxOfYVal,
      };
    }

    function _createDataSet(points: LineChartPoints[]) {
      if (props.enablePerfOptimization && _enableComputationOptimization) {
        const allChartPoints: LineChartDataPoint[] = [];
        const dataSet: AreaChartDataSetPoint[] = [];
        const colors: string[] = [];
        const opacity: number[] = [];
        const calloutPoints = calloutData(points!);

        points &&
          points.length &&
          points.forEach((singleChartPoint: LineChartPoints) => {
            colors.push(singleChartPoint.color!);
            opacity.push(singleChartPoint.opacity || 1);
            allChartPoints.push(...(singleChartPoint.data as LineChartDataPoint[]));
          });

        const mapOfXvalToListOfDataPoints: MapXToDataSet = {};
        allChartPoints.forEach((dataPoint: LineChartDataPoint) => {
          const xValue = dataPoint.x instanceof Date ? dataPoint.x.toLocaleString() : dataPoint.x;
          // map of x value to the list of data points which share the same x value .
          if (mapOfXvalToListOfDataPoints[xValue]) {
            mapOfXvalToListOfDataPoints[xValue].push(dataPoint);
          } else {
            mapOfXvalToListOfDataPoints[xValue] = [dataPoint];
          }
        });

        Object.keys(mapOfXvalToListOfDataPoints).forEach((key: number | string) => {
          const value: LineChartDataPoint[] = mapOfXvalToListOfDataPoints[key];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const singleDataset: any = {};
          value.forEach((singleDataPoint: LineChartDataPoint, index: number) => {
            singleDataset.xVal = singleDataPoint.x;
            singleDataset[`chart${index}`] = singleDataPoint.y;
          });
          dataSet.push(singleDataset);
        });

        // get keys from dataset, used to render data
        const keysLength: number = dataSet && Object.keys(dataSet[0])!.length;
        const keys: string[] = [];
        for (let i = 0; i < keysLength - 1; i++) {
          const keyVal = `chart${i}`;
          keys.push(keyVal);
        }

        // Data used to draw graph
        const data = _getDataPoints(keys, dataSet);

        return {
          colors,
          opacity,
          keys,
          data,
          calloutPoints,
        };
      } else {
        const allChartPoints: LineChartDataPoint[] = [];
        const dataSet: AreaChartDataSetPoint[] = [];
        const colors: string[] = [];
        const opacity: number[] = [];
        const calloutPoints = calloutData(points!);

        points &&
          points.length &&
          points.forEach((singleChartPoint: LineChartPoints) => {
            colors.push(singleChartPoint.color!);
            opacity.push(singleChartPoint.opacity || 1);
            allChartPoints.push(...(singleChartPoint.data as LineChartDataPoint[]));
          });

        let tempArr = allChartPoints;
        while (tempArr.length) {
          const valToCheck = tempArr[0].x instanceof Date ? tempArr[0].x.toLocaleString() : tempArr[0].x;
          const filteredChartPoints: LineChartDataPoint[] = tempArr.filter(
            (point: LineChartDataPoint) =>
              (point.x instanceof Date ? point.x.toLocaleString() : point.x) === valToCheck,
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const singleDataset: any = {};
          filteredChartPoints.forEach((singleDataPoint: LineChartDataPoint, index: number) => {
            singleDataset.xVal = singleDataPoint.x;
            singleDataset[`chart${index}`] = singleDataPoint.y;
          });
          dataSet.push(singleDataset);
          // removing compared objects from array
          const val = tempArr[0].x instanceof Date ? tempArr[0].x.toLocaleString() : tempArr[0].x;
          tempArr = tempArr.filter(
            (point: LineChartDataPoint) => (point.x instanceof Date ? point.x.toLocaleString() : point.x) !== val,
          );
        }

        // get keys from dataset, used to create stacked data
        const keysLength: number = dataSet && Object.keys(dataSet[0])!.length;
        const keys: string[] = [];
        for (let i = 0; i < keysLength - 1; i++) {
          const keyVal = `chart${i}`;
          keys.push(keyVal);
        }

        // Data used to draw graph
        const data = _getDataPoints(keys, dataSet);

        return {
          colors,
          opacity,
          keys,
          data,
          calloutPoints,
        };
      }
    }

    function _getCustomizedCallout() {
      return props.onRenderCalloutPerStack
        ? props.onRenderCalloutPerStack(stackCalloutProps)
        : props.onRenderCalloutPerDataPoint
        ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps)
        : null;
    }

    function _getGraphData(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xAxis: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yAxis: any,
      containerHeight: number,
      containerWidth: number,
      xElement: SVGElement | null,
      yAxisElement?: SVGElement | null,
      yScaleSecondary?: ScaleLinear<number, number>,
    ) {
      _chart = _drawGraph(containerHeight, xAxis, yAxis, yScaleSecondary, xElement!);
    }

    function _onLegendHover(legend: string): void {
      setActiveLegend(legend);
    }

    function _onLegendLeave(): void {
      setActiveLegend(undefined);
    }

    function _getLegendData(points: LineChartPoints[]): JSXElement {
      const data = points;
      const actions: Legend[] = [];

      data.forEach((singleChartData: LineChartPoints) => {
        const color: string = singleChartData.color!;
        const checkSimilarLegends = actions.filter(
          (leg: Legend) => leg.title === singleChartData.legend && leg.color === color,
        );
        if (checkSimilarLegends!.length > 0) {
          return;
        }

        const legend: Legend = {
          title: singleChartData.legend,
          color,
          hoverAction: () => {
            _handleChartMouseLeave();
            _onLegendHover(singleChartData.legend);
          },
          onMouseOutAction: () => {
            _onLegendLeave();
          },
        };

        actions.push(legend);
      });
      return (
        <Legends
          legends={actions}
          enabledWrapLines={props.enabledLegendsWrapLines}
          {...props.legendProps}
          onChange={_onLegendSelectionChange}
          legendRef={_legendsRef}
        />
      );
    }

    function _onLegendSelectionChange(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      selectedLegends: string[],
      event: React.MouseEvent<HTMLButtonElement>,
      currentLegend?: Legend,
    ): void {
      if (props.legendProps?.canSelectMultipleLegends) {
        setSelectedLegends(selectedLegends);
      } else {
        setSelectedLegends(selectedLegends.slice(-1));
      }
      if (props.legendProps?.onChange) {
        props.legendProps.onChange(selectedLegends, event, currentLegend);
      }
    }

    function _onDataPointClick(func: (() => void) | undefined) {
      if (func) {
        func();
      }
      setIsCircleClicked(true);
    }

    function _getOpacity(legend: string): number {
      if (!_isMultiStackChart) {
        return 0.7;
      } else {
        const opacity = _legendHighlighted(legend) || _noLegendHighlighted() ? 0.7 : 0.1;
        return opacity;
      }
    }

    function _getLineOpacity(legend: string): number {
      if (!_isMultiStackChart) {
        return 1;
      } else {
        let opacity = 0.3;
        if (isPopoverOpen) {
          opacity = 1;
        }
        if (!_noLegendHighlighted()) {
          opacity = _legendHighlighted(legend) ? 0 : 0.1;
        }
        return opacity;
      }
    }

    function _updateCircleFillColor(xDataPoint: number | Date, lineColor: string, circleId: string): string {
      let fillColor = lineColor;
      if (nearestCircleToHighlight === xDataPoint || activePoint === circleId) {
        if (!isCircleClicked) {
          fillColor = tokens.colorNeutralBackground1;
        }
      }

      return fillColor;
    }

    function _drawGraph(
      containerHeight: number,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xScale: any,
      yScalePrimary: ScaleLinear<number, number>,
      yScaleSecondary: ScaleLinear<number, number> | undefined,
      xElement: SVGElement,
    ): JSXElement[] {
      const points = _addDefaultColors(props.data.lineChartData);
      const { pointOptions, pointLineOptions } = props.data;

      const graph: JSXElement[] = [];
      let lineColor: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _data.forEach((singleStackedData: Array<any>, index: number) => {
        const yScale = points[index].useSecondaryYScale && yScaleSecondary ? yScaleSecondary : yScalePrimary;
        const curveFactory = getCurveFactory(points[index].lineOptions?.curve, d3CurveBasis);
        const area = d3Area()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .x((d: any) => xScale(d.xVal))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .y0((d: any) => yScale(d.values[0]))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .y1((d: any) => yScale(d.values[1]))
          .curve(curveFactory);
        const line = d3Line()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .x((d: any) => xScale(d.xVal))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .y((d: any) => yScale(d.values[1]))
          .curve(curveFactory);
        const layerOpacity = _shouldFillToZeroY() ? 0.8 : _opacity[index];
        graph.push(
          <React.Fragment key={`${index}-graph-${_uniqueIdForGraph}`}>
            {props.enableGradient && (
              <defs>
                <linearGradient id={`gradient_${index}`} x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0" stopColor={_colors[index]} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <path
              id={`${index}-line-${_uniqueIdForGraph}`}
              d={line(singleStackedData)!}
              fill={'transparent'}
              strokeWidth={points[index].lineOptions?.strokeWidth ?? 3}
              stroke={_colors[index]}
              opacity={_getLineOpacity(points[index]!.legend)}
              onMouseMove={event => _onRectMouseMove(event)}
              onMouseOut={_onRectMouseOut}
              onMouseOver={event => _onRectMouseMove(event)}
              strokeDasharray={points[index].lineOptions?.strokeDasharray}
              strokeDashoffset={points[index].lineOptions?.strokeDashoffset}
              strokeLinecap={points[index].lineOptions?.strokeLinecap}
            />
            {singleStackedData.length === 1 ? (
              <circle
                id={`${index}-graph-${_uniqueIdForGraph}`}
                cx={xScale(singleStackedData[0].xVal)}
                cy={yScale(singleStackedData[0].values[1])}
                r={6}
                stroke={_colors[index]}
                strokeWidth={3}
                fill={_colors[index]}
                opacity={layerOpacity}
                fillOpacity={_getOpacity(points[index]!.legend)}
                onMouseMove={event => _onRectMouseMove(event)}
                onFocus={event => _handleFocus(event, index, 0, `${_circleId}_${index}`)}
                onMouseOut={_onRectMouseOut}
                onMouseOver={event => _onRectMouseMove(event)}
              />
            ) : (
              <path
                id={`${index}-graph-${_uniqueIdForGraph}`}
                d={area(singleStackedData)!}
                fill={props.enableGradient ? `url(#gradient_${index})` : _colors[index]}
                opacity={layerOpacity}
                fillOpacity={_getOpacity(points[index]!.legend)}
                onMouseMove={event => _onRectMouseMove(event)}
                onMouseOut={_onRectMouseOut}
                onMouseOver={event => _onRectMouseMove(event)}
                {...(props.optimizeLargeData && {
                  tabIndex: _legendHighlighted(points[index]!.legend) || _noLegendHighlighted() ? 0 : undefined,
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
      _data.forEach((singleStackedData: Array<any>, index: number) => {
        if (points.length === index) {
          return;
        }
        const yScale = points[index].useSecondaryYScale && yScaleSecondary ? yScaleSecondary : yScalePrimary;

        if (!props.optimizeLargeData || singleStackedData.length === 1) {
          // Render circles for all data points
          graph.push(
            <g
              key={`${index}-dots-${_uniqueIdForGraph}`}
              clipPath="url(#clip)"
              role="region"
              aria-label={`${points[index].legend}, series ${index + 1} of ${points.length} with ${
                points[index].data.length
              } data points.`}
            >
              {singleStackedData.map((singlePoint: DPointType, pointIndex: number) => {
                const circleId = `${_circleId}_${index * _data[0].length + pointIndex}`;
                const xDataPoint = singlePoint.xVal instanceof Date ? singlePoint.xVal.getTime() : singlePoint.xVal;
                lineColor = points[index]!.color!;
                const legend = points[index]!.legend;
                return (
                  <circle
                    key={circleId}
                    id={circleId}
                    tabIndex={_legendHighlighted(points[index]!.legend) || _noLegendHighlighted() ? 0 : undefined}
                    cx={xScale(singlePoint.xVal)}
                    cy={yScale(singlePoint.values[1])}
                    stroke={lineColor}
                    strokeWidth={3}
                    fill={_updateCircleFillColor(xDataPoint, lineColor, circleId)}
                    onMouseOut={_onRectMouseOut}
                    onMouseOver={event => _onRectMouseMove(event)}
                    onClick={() => _onDataPointClick(points[index]!.data[pointIndex].onDataPointClick!)}
                    onFocus={event => _handleFocus(event, index, pointIndex, circleId)}
                    onBlur={_handleBlur}
                    {...getSecureProps(pointOptions)}
                    r={_getCircleRadius(xDataPoint, circleRadius, circleId, legend)}
                    role="img"
                    aria-label={_getAriaLabel(index, pointIndex)}
                  />
                );
              })}
            </g>,
          );
        } else {
          // Render circles for data points close to the mouse pointer only
          singleStackedData.forEach((singlePoint: DPointType, pointIndex: number) => {
            const xDataPoint = singlePoint.xVal instanceof Date ? singlePoint.xVal.getTime() : singlePoint.xVal;
            if (nearestCircleToHighlight === xDataPoint) {
              const circleId = `${_circleId}_${index * _data[0].length + pointIndex}`;
              lineColor = points[index]!.color!;
              const legend = points[index]!.legend;
              graph.push(
                <circle
                  key={circleId}
                  id={circleId}
                  cx={xScale(singlePoint.xVal)}
                  cy={yScale(singlePoint.values[1])}
                  stroke={lineColor}
                  strokeWidth={3}
                  fill={_updateCircleFillColor(xDataPoint, lineColor, circleId)}
                  onMouseOut={_onRectMouseOut}
                  onMouseOver={event => _onRectMouseMove(event)}
                  onFocus={event => _handleFocus(event, index, pointIndex, circleId)}
                  onClick={() => _onDataPointClick(points[index]!.data[pointIndex].onDataPointClick!)}
                  {...getSecureProps(pointOptions)}
                  r={_getCircleRadius(xDataPoint, circleRadius, circleId, legend)}
                />,
              );
            }
          });
        }
      });
      graph.push(
        <line
          id={_verticalLineId}
          key={_verticalLineId}
          x1={lineXValue}
          y1={0}
          x2={lineXValue}
          y2={containerHeight}
          strokeWidth={1}
          strokeDasharray={5.5}
          stroke={lineColor!}
          opacity={0.5}
          visibility={displayOfLine}
          {...getSecureProps(pointLineOptions)}
        />,
      );
      // Removing un wanted tooltip div from DOM, when prop not provided.
      if (!props.showXAxisLablesTooltip) {
        try {
          // eslint-disable-next-line @nx/workspace-no-restricted-globals
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      // Used to display tooltip at x axis labels.
      if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
        const xAxisElement = d3Select(xElement).call(xScale);
        try {
          // eslint-disable-next-line @nx/workspace-no-restricted-globals
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          // eslint-disable-next-line no-empty
        } catch (e) {}
        const tooltipProps = {
          tooltipCls: classes.tooltip!,
          id: _tooltipId,
          axis: xAxisElement,
        };
        xAxisElement && tooltipOfAxislabels(tooltipProps);
      }
      return graph;
    }

    function _getCircleRadius(xDataPoint: number, circleRadius: number, circleId: string, legend: string): number {
      // Show the circle if no legends are selected or if the point's legend is in the selected legends
      if (!_noLegendHighlighted() && !_legendHighlighted(legend)) {
        return 0;
      }

      if (isCircleClicked && nearestCircleToHighlight === xDataPoint) {
        return 1;
      } else if (nearestCircleToHighlight === xDataPoint || activePoint === circleId) {
        return circleRadius;
      } else {
        return 0;
      }
    }

    /**
     * This function checks if the given legend is highlighted or not.
     * A legend can be highlighted in 2 ways:
     * 1. selection: if the user clicks on it
     * 2. hovering: if there is no selected legend and the user hovers over it
     */
    function _legendHighlighted(legend: string) {
      return _getHighlightedLegend().includes(legend!);
    }

    /**
     * This function checks if none of the legends is selected or hovered.
     */
    function _noLegendHighlighted() {
      return _getHighlightedLegend().length === 0;
    }

    function _getHighlightedLegend() {
      return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
    }

    function _addDefaultColors(lineChartData?: LineChartPoints[]): LineChartPoints[] {
      return lineChartData
        ? lineChartData.map((item, index) => {
            let color: string;
            // isInverted property is applicable to v8 themes only
            if (typeof item.color === 'undefined') {
              color = getNextColor(index, 0);
            } else {
              color = getColorFromToken(item.color);
            }

            return { ...item, color };
          })
        : [];
    }

    function _handleFocus(
      event: React.FocusEvent<SVGCircleElement, Element>,
      lineIndex: number,
      pointIndex: number,
      circleId: string,
    ) {
      let cx = 0;
      let cy = 0;

      const targetRect = (event.target as SVGCircleElement).getBoundingClientRect();
      cx = targetRect.left + targetRect.width / 2;
      cy = targetRect.top + targetRect.height / 2;
      _updatePosition(cx, cy);

      const { x, y, xAxisCalloutData } = props.data.lineChartData![lineIndex].data[pointIndex];
      const formattedDate = x instanceof Date ? formatDateToLocaleString(x, props.culture, props.useUTC as boolean) : x;
      const modifiedXVal = x instanceof Date ? x.getTime() : x;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const found: any = _calloutPoints.find((e: { x: string | number }) => e.x === modifiedXVal);
      // Show details in the callout for the focused point only
      found.values = found.values.filter((e: { y: number }) => e.y === y);
      const filteredValues = _getFilteredLegendValues(found.values);

      setPopoverOpen(true);
      setHoverXValue(xAxisCalloutData ? xAxisCalloutData : formattedDate);
      setYValueHover(filteredValues!);
      setStackCalloutProps({ ...found, values: filteredValues });
      setDataPointCalloutProps({ ...found, values: filteredValues });
      setActivePoint(circleId);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _getFilteredLegendValues(values: any) {
      return !_noLegendHighlighted()
        ? values.filter((value: { legend: string }) => _legendHighlighted(value.legend))
        : values;
    }

    function _handleBlur() {
      setPopoverOpen(false);
      setHoverXValue(undefined);
      setYValueHover([]);
      setStackCalloutProps(undefined);
      setDataPointCalloutProps(undefined);
      setActivePoint('');
    }

    function _getAriaLabel(lineIndex: number, pointIndex: number): string {
      const line = props.data.lineChartData![lineIndex];
      const point = line.data[pointIndex];
      const formattedDate =
        point.x instanceof Date ? formatDateToLocaleString(point.x, props.culture, props.useUTC as boolean) : point.x;
      const xValue = point.xAxisCalloutData || formattedDate;
      const legend = line.legend;
      const yValue = point.yAxisCalloutData || point.y;
      return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
    }

    function _isChartEmpty(): boolean {
      return !(
        (
          props.data &&
          props.data.lineChartData &&
          props.data.lineChartData.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props.data.lineChartData.filter((item: { data: string | any[] }) => item.data.length === 0).length === 0
        )
        // if all the data sets have no data
        // filtering all items which have no data and checking if the length of the filtered array is 0
        // which means chart is not empty
      );
    }

    function _getChartTitle(): string {
      const { chartTitle, lineChartData } = props.data;
      return (chartTitle ? `${chartTitle}. ` : '') + `Area chart with ${lineChartData?.length || 0} data series. `;
    }

    function _shouldFillToZeroY() {
      return props.mode === 'tozeroy' || _containsSecondaryYAxis;
    }

    if (!_isChartEmpty()) {
      const { lineChartData } = props.data;
      const points = _addDefaultColors(lineChartData);
      _containsSecondaryYAxis = !!props.secondaryYScaleOptions && points.some(point => point.useSecondaryYScale);
      _createSet = _createDataSet;
      const { colors, opacity, data, calloutPoints } = _createSet(points);
      _calloutPoints = calloutPoints;
      const isXAxisDateType = getXAxisType(points);
      _colors = colors;
      _opacity = opacity;
      _data = data.renderData;
      const legends: JSXElement = _getLegendData(points);

      const tickParams = {
        tickValues: props.tickValues,
        tickFormat: props.tickFormat,
      };

      const calloutProps: ChartPopoverProps = {
        YValueHover: YValueHover!,
        hoverXValue: hoverXValue!,
        xAxisCalloutAccessibilityData,
        ...props.calloutProps,
        clickPosition,
        isPopoverOpen,
        isCartesian: true,
        customCallout: {
          customizedCallout: _getCustomizedCallout() !== null ? _getCustomizedCallout()! : undefined,
          customCalloutProps: props.calloutPropsPerDataPoint
            ? props.calloutPropsPerDataPoint(dataPointCalloutProps!)
            : undefined,
        },
        isCalloutForStack: true,
      };
      return (
        <CartesianChart
          {...props}
          chartTitle={_getChartTitle()}
          points={points}
          chartType={ChartTypes.AreaChart}
          calloutProps={calloutProps}
          legendBars={legends}
          createYAxis={createNumericYAxis}
          xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
          tickParams={tickParams}
          maxOfYVal={data.maxOfYVal}
          getGraphData={_getGraphData}
          getDomainNRangeValues={_getDomainNRangeValues}
          createStringYAxis={createStringYAxis}
          getmargins={_getMargins}
          onChartMouseLeave={_handleChartMouseLeave}
          getMinMaxOfYAxis={_getMinMaxOfYAxis}
          enableFirstRenderOptimization={props.enablePerfOptimization && _firstRenderOptimization}
          componentRef={cartesianChartRef}
          /* eslint-disable react/jsx-no-bind */
          // eslint-disable-next-line react/no-children-prop, @typescript-eslint/no-shadow
          children={(props: ChildProps) => {
            _xAxisRectScale = props.xScale;
            const ticks = _xAxisRectScale.ticks();
            const width1 = _xAxisRectScale(ticks[ticks.length - 1]);
            const rectHeight = props.containerHeight! - _margins.top!;
            return (
              <>
                <g>
                  <rect
                    id={_rectId}
                    width={width1}
                    height={rectHeight}
                    fill={'transparent'}
                    onMouseMove={event => _onRectMouseMove(event)}
                    onMouseOut={_onRectMouseOut}
                    onMouseOver={event => _onRectMouseMove(event)}
                  />
                </g>
                <g>{_chart}</g>
              </>
            );
          }}
        />
      );
    }
    return (
      <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);
AreaChart.displayName = 'AreaChart';
