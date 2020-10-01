import {
  IEventsAnnotationProps,
  ILineChartPoints,
  ILineChartDataPoint,
  IDataPoint,
  IVerticalBarChartDataPoint,
} from '../index';
import { axisRight as d3AxisRight, axisBottom as d3AxisBottom, axisLeft as d3AxisLeft, Axis as D3Axis } from 'd3-axis';
import { max as d3Max, min as d3Min } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime, scaleBand as d3ScaleBand } from 'd3-scale';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { format as d3Format } from 'd3-format';
import * as d3TimeFormat from 'd3-time-format';

export type NumericAxis = D3Axis<number | { valueOf(): number }>;
export type StringAxis = D3Axis<string>;

export enum ChartTypes {
  AreaChart,
  LineChart,
  VerticalBarChart,
  VerticalStackedBarChart,
  GroupedVerticalBarChart,
}

export enum XAxisTypes {
  NumericAxis,
  DateAxis,
  StringAxis,
}

export interface IWrapLabelProps {
  node: SVGGElement | null;
  xAxis: NumericAxis | StringAxis;
  noOfCharsToTruncate: number;
  showXAxisLablesTooltip: boolean;
}

export interface IMargins {
  /**
   * left margin for the chart.
   */
  left?: number;
  /**
   * Right margin for the chart.
   */
  right?: number;
  /**
   * Top margin for the chart.
   */
  top?: number;
  /**
   * Bottom margin for the chart.
   */
  bottom?: number;
}

export interface IDomainNRange {
  dStartValue: number | Date;
  dEndValue: number | Date;
  rStartValue: number;
  rEndValue: number;
}

export interface IXAxisParams {
  domainNRangeValues: IDomainNRange;
  xAxisElement?: SVGElement | null;
  xAxisCount?: number;
  showRoundOffXTickValues?: boolean;
  tickSize?: number;
  tickPadding?: number;
}
export interface ITickParams {
  tickValues?: Date[] | number[];
  tickFormat?: string;
}

export interface IYAxisParams {
  yMinMaxValues?: {
    startValue: number;
    endValue: number;
  };
  maxOfYVal?: number;
  margins: IMargins;
  containerWidth: number;
  containerHeight: number;
  yAxisElement?: SVGElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxisTickFormat?: any;
  yAxisTickCount: number;
  yMaxValue?: number;
  yMinValue?: number;
  tickPadding?: number;
  eventAnnotationProps?: IEventsAnnotationProps;
  eventLabelHeight?: number;
}

export interface IContainerValues {
  width: number;
  height: number;
  shouldResize: boolean;
  reqID: number;
}

export interface IFitContainerParams {
  containerWidth: number;
  containerHeight: number;
  hideLegend: boolean;
  legendContainer: HTMLDivElement;
  container: HTMLDivElement | null | HTMLElement;
}
export const additionalMarginRight: number = 20;

/**
 * Create Numeric X axis
 * @export
 * @param {IXAxisParams} xAxisParams
 * @param {boolean} isRtl
 */
export function createNumericXAxis(xAxisParams: IXAxisParams, isRtl: boolean) {
  const {
    domainNRangeValues,
    showRoundOffXTickValues = false,
    tickSize = 10,
    tickPadding = 10,
    xAxisCount = 10,
    xAxisElement,
  } = xAxisParams;
  const xAxisScale = d3ScaleLinear()
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue]);
  showRoundOffXTickValues && xAxisScale.nice();

  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(tickSize)
    .tickPadding(tickPadding)
    .ticks(xAxisCount)
    .tickSizeOuter(0);
  if (xAxisElement) {
    d3Select(xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

/**
 * Creating Date x axis of the Chart
 * @export
 * @param {IXAxisParams} xAxisParams
 * @param {ITickParams} tickParams
 * @param {boolean} isRtl
 */
export function createDateXAxis(xAxisParams: IXAxisParams, tickParams: ITickParams, isRtl: boolean) {
  const { domainNRangeValues, xAxisElement } = xAxisParams;
  const xAxisScale = d3ScaleTime()
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue]);
  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(10)
    .tickPadding(10);
  tickParams.tickValues ? xAxis.tickValues(tickParams.tickValues) : '';
  tickParams.tickFormat ? xAxis.tickFormat(d3TimeFormat.timeFormat(tickParams.tickFormat)) : '';
  if (xAxisElement) {
    d3Select(xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

/**
 * Create String X axis
 * Currently using for only Vetical stacked bar chart and grouped vertical bar chart
 *
 * @export
 * @param {IXAxisParams} xAxisParams
 * @param {ITickParams} tickParams
 * @param {string[]} dataset
 * @returns
 */
export function createStringXAxis(xAxisParams: IXAxisParams, tickParams: ITickParams, dataset: string[]) {
  const { domainNRangeValues } = xAxisParams;
  const xAxisScale = d3ScaleBand()
    .domain(dataset!)
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue])
    .padding(0.1);
  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxisParams.tickSize || 10)
    .tickPadding(xAxisParams.tickPadding || 10)
    .tickFormat((x: string, index: number) => dataset[index] as string);

  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

/**
 * This method uses for creating data points for the y axis.
 * @export
 * @param {number} maxVal
 * @param {number} minVal
 * @param {number} splitInto
 * @returns {number[]}
 */
export function prepareDatapoints(maxVal: number, minVal: number, splitInto: number): number[] {
  const val = Math.ceil((maxVal - minVal) / splitInto);
  const dataPointsArray: number[] = [minVal, minVal + val];
  while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
    dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
  }
  return dataPointsArray;
}

/**
 * Creating Y axis of the chart
 * @export
 * @param {IYAxisParams} yAxisParams
 * @param {boolean} isRtl
 */
export function createYAxis(yAxisParams: IYAxisParams, isRtl: boolean) {
  const {
    yMinMaxValues = { startValue: 0, endValue: 0 },
    yAxisElement = null,
    yMaxValue = 0,
    yMinValue = 0,
    containerHeight,
    containerWidth,
    margins,
    tickPadding = 12,
    maxOfYVal = 0,
    yAxisTickFormat,
    yAxisTickCount = 4,
    eventAnnotationProps,
    eventLabelHeight,
  } = yAxisParams;

  // maxOFYVal coming from only area chart (If shoule calculate from processed data)
  const tempVal = maxOfYVal || yMinMaxValues.endValue;
  const finalYmax = tempVal > yMaxValue ? tempVal : yMaxValue!;
  const finalYmin = yMinMaxValues.startValue < yMinValue ? 0 : yMinValue!;
  const domainValues = prepareDatapoints(finalYmax, finalYmin, yAxisTickCount);
  const yAxisScale = d3ScaleLinear()
    .domain([finalYmin, domainValues[domainValues.length - 1]])
    .range([containerHeight - margins.bottom!, margins.top! + (eventAnnotationProps! ? eventLabelHeight! : 0)]);
  const axis = isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis
    .tickPadding(tickPadding)
    .tickValues(domainValues)
    .tickSizeInner(-(containerWidth - margins.left! - margins.right!));
  yAxisTickFormat ? yAxis.tickFormat(yAxisTickFormat) : yAxis.tickFormat(d3Format('.2~s'));
  yAxisElement
    ? d3Select(yAxisElement)
        .call(yAxis)
        .selectAll('text')
    : '';
  return yAxisScale;
}

export function calloutData(values: ILineChartPoints[]) {
  let combinedResult: {
    legend: string;
    y: number;
    x: number | Date | string;
    color: string;
    yAxisCalloutData?: string | { [id: string]: number };
  }[] = [];

  values.forEach((element: { data: ILineChartDataPoint[]; legend: string; color: string }) => {
    const elements = element.data.map((ele: ILineChartDataPoint) => {
      return { legend: element.legend, ...ele, color: element.color };
    });
    combinedResult = combinedResult.concat(elements);
  });

  const result: { x: number | Date | string; values: { legend: string; y: number }[] }[] = [];
  combinedResult.forEach(
    (
      e1: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string },
      index: number,
    ) => {
      e1.x = e1.x instanceof Date ? e1.x.getTime() : e1.x;
      const filteredValues = [{ legend: e1.legend, y: e1.y, color: e1.color, yAxisCalloutData: e1.yAxisCalloutData }];
      combinedResult
        .slice(index + 1)
        .forEach(
          (e2: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string }) => {
            e2.x = e2.x instanceof Date ? e2.x.getTime() : e2.x;
            if (e1.x === e2.x) {
              filteredValues.push({
                legend: e2.legend,
                y: e2.y,
                color: e2.color,
                yAxisCalloutData: e2.yAxisCalloutData,
              });
            }
          },
        );
      result.push({ x: e1.x, values: filteredValues });
    },
  );
  return getUnique(result, 'x');
}

export function getUnique(
  arr: { x: number | Date | string; values: { legend: string; y: number }[] }[],
  comp: string | number,
) {
  const unique = arr
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((e: { [x: string]: any }) => e[comp])
    // store the keys of the unique objects
    .map((e: string, i: number, final: string[]) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter((e: number) => arr[e])
    .map((e: number) => arr[e]);
  return unique;
}

/**
 * This function takes two paramerter
 * 1. an array of strings
 * 2. a string value
 * if the value is not present in the given array then it will return the new
 * array by appending the value to the present arrray.
 *
 * if the value is already present in  the given array then it will return the new
 * array by deleteing the value from the the array
 * @param array
 * @param value
 */
export function silceOrAppendToArray(array: string[], value: string): string[] {
  const pos = array.indexOf(value);
  if (pos === -1) {
    return [...array, value];
  } else {
    return array.slice(0, pos).concat(array.slice(pos + 1));
  }
}

export function createWrapOfXLabels(wrapLabelProps: IWrapLabelProps) {
  const { node, xAxis, noOfCharsToTruncate, showXAxisLablesTooltip } = wrapLabelProps;
  if (node === null) {
    return;
  }
  const axisNode = d3Select(node).call(xAxis);
  let removeVal = 0;
  const width = 10;
  const arr: number[] = [];
  axisNode.selectAll('.tick text').each(function() {
    const text = d3Select(this);
    const totalWord = text.text();
    const truncatedWord = `${text.text().slice(0, noOfCharsToTruncate)}...`;
    const totalWordLength = text.text().length;
    const words = text
      .text()
      .split(/\s+/)
      .reverse();
    arr.push(words.length);
    let word: string = '';
    let line: string[] = [];
    let lineNumber: number = 0;
    const lineHeight = 1.1; // ems
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy'));
    let tspan = text
      .text(null)
      .append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('id', 'BaseSpan')
      .attr('dy', dy + 'em');

    if (showXAxisLablesTooltip && totalWordLength > noOfCharsToTruncate) {
      tspan = text
        .append('tspan')
        .attr('id', 'showDots')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
        .text(truncatedWord);
    } else if (showXAxisLablesTooltip && totalWordLength <= noOfCharsToTruncate) {
      tspan = text
        .append('tspan')
        .attr('id', 'LessLength')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
        .text(totalWord);
    } else {
      while ((word = words.pop()!)) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node()!.getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('id', 'WordBreakId')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);
        }
      }
      const maxDigit = Math.max(...arr);
      let maxHeight: number = 12; // intial value to render corretly first time
      axisNode.selectAll('text').each(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const outerHTMLElement = document.getElementById('WordBreakId') as any;
        const BoxCordinates = outerHTMLElement && outerHTMLElement.getBoundingClientRect();
        const boxHeight = BoxCordinates && BoxCordinates.height;
        if (boxHeight > maxHeight) {
          maxHeight = boxHeight;
        }
      });
      removeVal = (maxDigit - 3) * maxHeight; // we are getting more height if take direclty
    }
  });
  return removeVal > 0 ? removeVal : 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tooltipOfXAxislabels(xAxistooltipProps: any) {
  const { tooltipCls, xAxis, id } = xAxistooltipProps;
  const div = d3Select('body')
    .append('div')
    .attr('id', id)
    .attr('class', tooltipCls)
    .style('opacity', 0);
  const tickObject = xAxis!.selectAll('.tick')._groups[0];
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

export function getXAxisType(points: ILineChartPoints[]): boolean {
  let isXAxisDateType: boolean = false;
  if (points && points.length > 0) {
    points.forEach((chartData: ILineChartPoints) => {
      if (chartData.data.length > 0) {
        isXAxisDateType = chartData.data[0].x instanceof Date;
        return;
      }
    });
  }
  return isXAxisDateType;
}

/**
 * Calculates Domain and range values for Date X axis.
 * This method calculates Area chart and line chart.
 * @export
 * @param {ILineChartPoints[]} points
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @returns {IDomainNRange}
 */
export function domainRangeOfDateForAreaChart(
  points: ILineChartPoints[],
  margins: IMargins,
  width: number,
  isRTL: boolean,
): IDomainNRange {
  let sDate = new Date();
  // selecting least date and comparing it with data passed to get farthest Date for the range on X-axis
  let lDate = new Date(-8640000000000000);
  const xAxisData: Date[] = [];
  points.forEach((singleLineChartData: ILineChartPoints) => {
    singleLineChartData.data.forEach((point: ILineChartDataPoint) => {
      xAxisData.push(point.x as Date);
      if (point.x < sDate) {
        sDate = point.x as Date;
      }
      if (point.x > lDate) {
        lDate = point.x as Date;
      }
    });
  });

  const rStartValue = margins.left!;
  const rEndValue = width - margins.right! - (isRTL ? additionalMarginRight : 0);

  return isRTL
    ? { dStartValue: lDate, dEndValue: sDate, rStartValue, rEndValue }
    : { dStartValue: sDate, dEndValue: lDate, rStartValue, rEndValue };
}

/**
 * Calculates Domain and range values for Numeric X axis.
 * This method calculates Area cart and line chart.
 * @export
 * @param {ILineChartPoints[]} points
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @returns {IDomainNRange}
 */
export function domainRangeOfNumericForAreaChart(
  points: ILineChartPoints[],
  margins: IMargins,
  width: number,
  isRTL: boolean,
): IDomainNRange {
  const xMin = d3Min(points, (point: ILineChartPoints) => {
    return d3Min(point.data, (item: ILineChartDataPoint) => item.x as number)!;
  })!;

  const xMax = d3Max(points, (point: ILineChartPoints) => {
    return d3Max(point.data, (item: ILineChartDataPoint) => {
      return item.x as number;
    });
  })!;

  const rStartValue = margins.left!;
  const rEndValue = width - margins.right! - (isRTL ? additionalMarginRight : 0);

  return isRTL
    ? { dStartValue: xMax, dEndValue: xMin, rStartValue, rEndValue }
    : { dStartValue: xMin, dEndValue: xMax, rStartValue, rEndValue };
}

/**
 * Calculates Range values to the Vertical stacked bar chart for string axis
 * For String axis, we need to give domain values (Not start and end array values)
 * So sending 0 as domain values. Domain will be handled at creation of string axis
 *
 * @export
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @returns {IDomainNRange}
 */
export function domainRangeOfStrForVSBC(margins: IMargins, width: number, isRTL: boolean): IDomainNRange {
  const rMin = margins.left!;
  const rMax = width - margins.right! - (isRTL ? additionalMarginRight : 0);

  return isRTL
    ? { dStartValue: 0, dEndValue: 0, rStartValue: rMax, rEndValue: rMin }
    : { dStartValue: 0, dEndValue: 0, rStartValue: rMin, rEndValue: rMax };
}

/**
 * Calculate domain and range values to the Vertical stacked bar chart - For Numeric axis
 * @export
 * @param {IDataPoint[]} points
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @param {number} barWidth
 * @returns {IDomainNRange}
 */
export function domainRangeOfVSBCNumeric(
  points: IDataPoint[],
  margins: IMargins,
  width: number,
  isRTL: boolean,
  barWidth: number,
): IDomainNRange {
  const xMin = d3Min(points, (point: IDataPoint) => point.x as number)!;
  const xMax = d3Max(points, (point: IDataPoint) => point.x as number)!;
  // barWidth / 2 - for to get tick middle of the bar
  const rMax = margins.left! + barWidth / 2;
  const rMin = width - margins.right! - barWidth / 2 - (isRTL ? additionalMarginRight : 0);
  return isRTL
    ? { dStartValue: xMax, dEndValue: xMin, rStartValue: rMax, rEndValue: rMin }
    : { dStartValue: xMin, dEndValue: xMax, rStartValue: rMax, rEndValue: rMin };
}

/**
 * Calculate domain and range values to the Vertical bar chart - For Numeric axis
 * @export
 * @param {IDataPoint[]} points
 * @param {IMargins} margins
 * @param {number} containerWidth
 * @param {boolean} isRTL
 * @param {number} barWidth
 * @returns {IDomainNRange}
 */
export function domainRageOfVerticalNumeric(
  points: IDataPoint[],
  margins: IMargins,
  containerWidth: number,
  isRTL: boolean,
  barWidth: number,
): IDomainNRange {
  const xMax = d3Max(points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
  const xMin = d3Min(points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
  const rMin = margins.left! + barWidth;
  const rMax = containerWidth - margins.right! - barWidth;

  return isRTL
    ? { dStartValue: xMax, dEndValue: xMin, rStartValue: rMin, rEndValue: rMax }
    : { dStartValue: xMin, dEndValue: xMax, rStartValue: rMin, rEndValue: rMax };
}

/**
 * Calculates Range values to the Vertical bar chart for string axis
 * For String axis, we need to give domain values (Not start and end array values)
 * So sending 0 as domain values. Domain will be handled at creation of string axis
 * @export
 * @param {IMargins} margins
 * @param {number} containerWidth
 * @param {boolean} isRTL
 * @returns {IDomainNRange}
 */
export function domainRangeOfStrVertical(margins: IMargins, containerWidth: number, isRTL: boolean): IDomainNRange {
  const rMin = margins.left!;
  const rMax = containerWidth - margins.right!;

  return isRTL
    ? { dStartValue: 0, dEndValue: 0, rStartValue: rMax, rEndValue: rMin }
    : { dStartValue: 0, dEndValue: 0, rStartValue: rMin, rEndValue: rMax };
}

/**
 * For creating X axis, need to calculate x axis domain and range values from given points.
 * This may vary based on chart type and type of x axis
 * So, this method will define which method need to call based on chart type and axis type.
 * @export
 * @param {*} points
 * @param {IMargins} margins
 * @param {number} width
 * @param {ChartTypes} chartType
 * @param {boolean} isRTL
 * @param {XAxisTypes} xAxisType
 * @param {number} [barWidth]
 * @returns {IDomainNRange}
 */
export function getDomainNRangeValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points: any,
  margins: IMargins,
  width: number,
  chartType: ChartTypes,
  isRTL: boolean,
  xAxisType: XAxisTypes,
  barWidth?: number,
): IDomainNRange {
  let domainNRangeValue: IDomainNRange;
  if (xAxisType === XAxisTypes.NumericAxis) {
    switch (chartType) {
      case ChartTypes.AreaChart:
      case ChartTypes.LineChart:
        domainNRangeValue = domainRangeOfNumericForAreaChart(points, margins, width, isRTL);
        break;
      case ChartTypes.VerticalStackedBarChart:
        domainNRangeValue = domainRangeOfVSBCNumeric(points, margins, width, isRTL, barWidth!);
        break;
      case ChartTypes.VerticalBarChart:
        domainNRangeValue = domainRageOfVerticalNumeric(points, margins, width, isRTL, barWidth!);
        break;
      default:
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
  } else if (xAxisType === XAxisTypes.DateAxis) {
    switch (chartType) {
      case ChartTypes.AreaChart:
      case ChartTypes.LineChart:
        domainNRangeValue = domainRangeOfDateForAreaChart(points, margins, width, isRTL);
        break;
      default:
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
  } else {
    switch (chartType) {
      case ChartTypes.VerticalStackedBarChart:
        domainNRangeValue = domainRangeOfStrForVSBC(margins, width, isRTL);
        break;
      case ChartTypes.VerticalBarChart:
        domainNRangeValue = domainRangeOfStrVertical(margins, width, isRTL);
        break;
      default:
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
  }
  return domainNRangeValue;
}

/**
 * Calculating start and ending values of the Area chart and LineChart
 *
 * @export
 * @param {ILineChartPoints[]} points
 * @returns {{ startValue: number; endValue: number }}
 */
export function findNumericMinMaxOfY(points: ILineChartPoints[]): { startValue: number; endValue: number } {
  const yMax = d3Max(points, (point: ILineChartPoints) => {
    return d3Max(point.data, (item: ILineChartDataPoint) => item.y)!;
  })!;
  const yMin = d3Min(points, (point: ILineChartPoints) => {
    return d3Min(point.data, (item: ILineChartDataPoint) => item.y)!;
  })!;

  return {
    startValue: yMin,
    endValue: yMax,
  };
}

/**
 * Find the minimum and maximum values of the vertical stacked bar chart y axis data point. Used for create y axis.
 * @export
 * @param {IDataPoint[]} dataset
 * @returns {{ startValue: number; endValue: number }}
 */
export function findVSBCNumericMinMaxOfY(dataset: IDataPoint[]): { startValue: number; endValue: number } {
  const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;
  const yMin = d3Min(dataset, (point: IDataPoint) => point.y)!;

  return { startValue: yMin, endValue: yMax };
}

export function findVerticalNumericMinMaxOfY(
  points: IVerticalBarChartDataPoint[],
): { startValue: number; endValue: number } {
  const yMax = d3Max(points, (point: IVerticalBarChartDataPoint) => point.y)!;
  const yMin = d3Min(points, (point: IVerticalBarChartDataPoint) => point.y)!;

  return { startValue: yMin, endValue: yMax };
}

/**
 * For creating Y axis, need to calculate y axis domain values from given points. This may vary based on chart type.
 * So, this method will define which method need to call based on chart type to find out min and max values(For Domain).
 * @export
 * @param {*} points
 * @param {ChartTypes} chartType
 * @returns {{ startValue: number; endValue: number }}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMinMaxOfYAxis(points: any, chartType: ChartTypes): { startValue: number; endValue: number } {
  let minMaxValues: { startValue: number; endValue: number };

  switch (chartType) {
    case ChartTypes.AreaChart:
    case ChartTypes.LineChart:
      minMaxValues = findNumericMinMaxOfY(points);
      break;
    case ChartTypes.VerticalStackedBarChart:
      minMaxValues = findVSBCNumericMinMaxOfY(points);
      break;
    case ChartTypes.VerticalBarChart:
      minMaxValues = findVerticalNumericMinMaxOfY(points);
      break;
    default:
      minMaxValues = { startValue: 0, endValue: 0 };
  }

  return minMaxValues;
}
