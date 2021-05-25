import { axisRight as d3AxisRight, axisBottom as d3AxisBottom, axisLeft as d3AxisLeft, Axis as D3Axis } from 'd3-axis';
import { max as d3Max, min as d3Min } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime, scaleBand as d3ScaleBand } from 'd3-scale';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { format as d3Format } from 'd3-format';
import * as d3TimeFormat from 'd3-time-format';
import {
  IEventsAnnotationProps,
  ILineChartPoints,
  ILineChartDataPoint,
  IDataPoint,
  IVerticalBarChartDataPoint,
} from '../index';

export type NumericAxis = D3Axis<number | { valueOf(): number }>;
export type StringAxis = D3Axis<string>;

export enum ChartTypes {
  AreaChart,
  LineChart,
  VerticalBarChart,
  VerticalStackedBarChart,
  GroupedVerticalBarChart,
  HeatMapChart,
}

export enum XAxisTypes {
  NumericAxis,
  DateAxis,
  StringAxis,
}

export enum YAxisType {
  NumericAxis,
  DateAxis,
  StringAxis,
}

export interface IWrapLabelProps {
  node: SVGElement | null;
  xAxis: NumericAxis | StringAxis;
  noOfCharsToTruncate: number;
  showXAxisLablesTooltip: boolean;
}

export interface IMargins {
  /**
   * left margin for the chart.
   * @default 40
   */
  left?: number;
  /**
   * Right margin for the chart.
   * @default 20
   */
  right?: number;
  /**
   * Top margin for the chart.
   * @default 20
   */
  top?: number;
  /**
   * Bottom margin for the chart.
   * @default 35
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
  xAxistickSize?: number;
  tickPadding?: number;
  xAxisPadding?: number;
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
  yAxisPadding?: number;
}

/**
 * Create Numeric X axis
 * @export
 * @param {IXAxisParams} xAxisParams
 */
export function createNumericXAxis(xAxisParams: IXAxisParams) {
  const {
    domainNRangeValues,
    showRoundOffXTickValues = false,
    xAxistickSize = 6,
    tickPadding = 10,
    xAxisCount = 6,
    xAxisElement,
  } = xAxisParams;
  const xAxisScale = d3ScaleLinear()
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue]);
  showRoundOffXTickValues && xAxisScale.nice();

  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxistickSize)
    .tickPadding(tickPadding)
    .ticks(xAxisCount)
    .tickSizeOuter(0);
  if (xAxisElement) {
    d3Select(xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  return xAxisScale;
}

/**
 * Creating Date x axis of the Chart
 * @export
 * @param {IXAxisParams} xAxisParams
 * @param {ITickParams} tickParams
 */
export function createDateXAxis(xAxisParams: IXAxisParams, tickParams: ITickParams) {
  const { domainNRangeValues, xAxisElement, tickPadding = 6, xAxistickSize = 6, xAxisCount = 6 } = xAxisParams;
  const xAxisScale = d3ScaleTime()
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue]);
  const xAxis = d3AxisBottom(xAxisScale).tickSize(xAxistickSize).tickPadding(tickPadding).ticks(xAxisCount);
  tickParams.tickValues ? xAxis.tickValues(tickParams.tickValues) : '';
  tickParams.tickFormat ? xAxis.tickFormat(d3TimeFormat.timeFormat(tickParams.tickFormat)) : '';
  if (xAxisElement) {
    d3Select(xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  return xAxisScale;
}

/**
 * Create String X axis
 * Currently using for only Vetical stacked bar chart and grouped vertical bar chart
 * @export
 * @param {IXAxisParams} xAxisParams
 * @param {ITickParams} tickParams
 * @param {string[]} dataset
 * @returns
 */
export function createStringXAxis(xAxisParams: IXAxisParams, tickParams: ITickParams, dataset: string[]) {
  const { domainNRangeValues, xAxisCount = 6, xAxistickSize = 6, tickPadding = 10, xAxisPadding = 0.1 } = xAxisParams;
  const xAxisScale = d3ScaleBand()
    .domain(dataset!)
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue])
    .padding(xAxisPadding);
  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxistickSize)
    .tickPadding(tickPadding)
    .ticks(xAxisCount)
    .tickFormat((x: string, index: number) => dataset[index] as string);

  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  return xAxisScale;
}

/**
 * This method used for creating data points for the y axis.
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
 * Creating Numeric Y axis of the chart
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

  // maxOfYVal coming from only area chart and Grouped vertical bar chart(Calculation done at base file)
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
  yAxisElement ? d3Select(yAxisElement).call(yAxis).selectAll('text').attr('aria-hidden', 'true') : '';
  return yAxisScale;
}

/**
 * Creating String Y axis of the chart
 * @param yAxisParams
 * @param dataPoints
 * @param isRtl
 */
export const createStringYAxis = (yAxisParams: IYAxisParams, dataPoints: string[], isRtl: boolean) => {
  const { containerHeight, tickPadding = 12, margins, yAxisTickFormat, yAxisElement, yAxisPadding = 0 } = yAxisParams;
  const yAxisScale = d3ScaleBand()
    .domain(dataPoints)
    .range([containerHeight - margins.bottom!, margins.top!])
    .padding(yAxisPadding);
  const axis = isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis.tickPadding(tickPadding).tickValues(dataPoints).tickSize(0);
  if (yAxisTickFormat) {
    yAxis.tickFormat(yAxisTickFormat);
  }
  yAxisElement ? d3Select(yAxisElement).call(yAxis).selectAll('text') : '';
  return yAxisScale;
};

/**
 * For area chart and line chart, while displaying stackCallout, Need to form a callout data object.
 * This methos creates an object for those 2 charts.
 * @param values
 */

type DataPoint = {
  legend: string;
  y: number;
  x: number | Date | string;
  color: string;
  yAxisCalloutData: string;
  index?: number;
};

export function calloutData(values: (ILineChartPoints & { index?: number })[]) {
  let combinedResult: {
    legend: string;
    y: number;
    x: number | Date | string;
    color: string;
    yAxisCalloutData?: string | { [id: string]: number };
  }[] = [];

  values.forEach((element: { data: ILineChartDataPoint[]; legend: string; color: string; index?: number }) => {
    const elements = element.data.map((ele: ILineChartDataPoint) => {
      return { legend: element.legend, ...ele, color: element.color, index: element.index };
    });
    combinedResult = combinedResult.concat(elements);
  });

  const result: { x: number | Date | string; values: { legend: string; y: number }[] }[] = [];
  combinedResult.forEach((e1: DataPoint, index: number) => {
    e1.x = e1.x instanceof Date ? e1.x.getTime() : e1.x;
    const filteredValues = [
      { legend: e1.legend, y: e1.y, color: e1.color, yAxisCalloutData: e1.yAxisCalloutData, index: e1.index },
    ];
    combinedResult.slice(index + 1).forEach((e2: DataPoint) => {
      e2.x = e2.x instanceof Date ? e2.x.getTime() : e2.x;
      if (e1.x === e2.x) {
        filteredValues.push({
          legend: e2.legend,
          y: e2.y,
          color: e2.color,
          yAxisCalloutData: e2.yAxisCalloutData,
          index: e2.index,
        });
      }
    });
    result.push({ x: e1.x, values: filteredValues });
  });
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

/**
 * This method used for wrapping of x axis labels (tick values).
 * It breaks down given text value by space separated and calculates the total height needed to display all the words.
 * That value = removal value. This value needs to be remove from total svg height, svg will shrink and
 * total text will be displayed.
 * @export
 * @param {IWrapLabelProps} wrapLabelProps
 * @returns
 */
export function createWrapOfXLabels(wrapLabelProps: IWrapLabelProps) {
  const { node, xAxis, noOfCharsToTruncate, showXAxisLablesTooltip } = wrapLabelProps;
  if (node === null) {
    return;
  }
  const axisNode = d3Select(node).call(xAxis);
  let removeVal = 0;
  const width = 10;
  const arr: number[] = [];
  axisNode.selectAll('.tick text').each(function () {
    const text = d3Select(this);
    const totalWord = text.text();
    const truncatedWord = `${text.text().slice(0, noOfCharsToTruncate)}...`;
    const totalWordLength = text.text().length;
    const words = text.text().split(/\s+/).reverse();
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
      .attr('dy', dy + 'em')
      .attr('data-', totalWord);

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
      // If we take directly maxDigit * maxheight, then it will show more height between x axis tick values and bottom.
      // To avoid this, reducing maxDigit value by removing some digit based on legth of word.
      let removeDigit: number = 4;
      if (maxDigit <= 2) {
        removeDigit = 1;
      } else if (maxDigit > 2 && maxDigit <= 6) {
        removeDigit = 2;
      } else if (maxDigit > 6 && maxDigit <= 9) {
        removeDigit = 3;
      }
      removeVal = (maxDigit - removeDigit) * maxHeight;
    }
  });
  return removeVal > 0 ? removeVal : 0;
}

/**
 * This method displays a tooltip to the x axis lables(tick values)
 * when prop 'showXAxisLablesTooltip' enables to the respected chart.
 * On hover of the truncated word(at x axis labels tick), a tooltip will be appeared.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tooltipOfXAxislabels(xAxistooltipProps: any) {
  const { tooltipCls, xAxis, id } = xAxistooltipProps;
  if (xAxis === null) {
    return null;
  }
  const div = d3Select('body').append('div').attr('id', id).attr('class', tooltipCls).style('opacity', 0);
  const aa = xAxis!.selectAll('#BaseSpan')._groups[0];
  const baseSpanLength = aa && Object.keys(aa)!.length;
  const originalDataArray: string[] = [];
  for (let i = 0; i < baseSpanLength; i++) {
    const originalData = aa[i].dataset && (Object.values(aa[i].dataset)[0] as string);
    originalDataArray.push(originalData);
  }
  const tickObject = xAxis!.selectAll('.tick')._groups[0];
  const tickObjectLength = tickObject && Object.keys(tickObject)!.length;
  for (let i = 0; i < tickObjectLength; i++) {
    const d1 = tickObject[i];
    d3Select(d1)
      .on('mouseover', d => {
        div.style('opacity', 0.9);
        div
          .html(originalDataArray[i])
          .style('left', d3Event.pageX + 'px')
          .style('top', d3Event.pageY - 28 + 'px');
      })
      .on('mouseout', d => {
        div.style('opacity', 0);
      });
  }
}

/**
 * Find the axis type of line chart and area chart from given data
 * @param points
 */
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
 * @param {Date[] | number[]} tickValues
 * @returns {IDomainNRange}
 */
export function domainRangeOfDateForAreaChart(
  points: ILineChartPoints[],
  margins: IMargins,
  width: number,
  isRTL: boolean,
  tickValues: Date[] = [],
): IDomainNRange {
  const sDate = d3Min(points, (point: ILineChartPoints) => {
    return d3Min(point.data, (item: ILineChartDataPoint) => {
      return item.x as Date;
    });
  })!;
  const lDate = d3Max(points, (point: ILineChartPoints) => {
    return d3Max(point.data, (item: ILineChartDataPoint) => {
      return item.x as Date;
    });
  })!;

  // Need to draw graph with given small and large date (Which Involves customization of date axis tick values)
  // That may be Either from given graph data or from prop 'tickValues' date values.
  // So, Finding smallest and largest dates
  const smallestDate = d3Min([...tickValues, sDate])!;
  const largestDate = d3Max([...tickValues, lDate])!;

  const rStartValue = margins.left!;
  const rEndValue = width - margins.right!;

  return isRTL
    ? { dStartValue: largestDate, dEndValue: smallestDate, rStartValue, rEndValue }
    : { dStartValue: smallestDate, dEndValue: largestDate, rStartValue, rEndValue };
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
  const rEndValue = width - margins.right!;

  return isRTL
    ? { dStartValue: xMax, dEndValue: xMin, rStartValue, rEndValue }
    : { dStartValue: xMin, dEndValue: xMax, rStartValue, rEndValue };
}

/**
 * Calculates Range values of x Axis string axis
 * For String axis, we need to give domain values (Not start and end array values)
 * So sending 0 as domain values. Domain will be handled at creation of string axis
 * For charts stacked bar chart, grouped vertical bar chart, HeatMapChart and Vertical bar chart
 * @export
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @returns {IDomainNRange}
 */
export function domainRangeOfXStringAxis(margins: IMargins, width: number, isRTL: boolean): IDomainNRange {
  const rMin = margins.left!;
  const rMax = width - margins.right!;
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
  const rMin = width - margins.right! - barWidth / 2;
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
  barWidth: number,
  tickValues: Date[] | number[] | undefined,
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
        domainNRangeValue = domainRangeOfDateForAreaChart(points, margins, width, isRTL, tickValues! as Date[]);
        break;
      default:
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
  } else {
    // String Axis type
    switch (chartType) {
      case ChartTypes.VerticalStackedBarChart:
      case ChartTypes.GroupedVerticalBarChart:
      case ChartTypes.VerticalBarChart:
      case ChartTypes.HeatMapChart:
        domainNRangeValue = domainRangeOfXStringAxis(margins, width, isRTL);
        break;
      default:
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
  }
  return domainNRangeValue;
}

/**
 * Calculating start and ending values of the Area chart and LineChart
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

/**
 * Fins the min and max values of the vertical bar chart y axis data point.
 * @export
 * @param {IVerticalBarChartDataPoint[]} points
 * @returns {{ startValue: number; endValue: number }}
 */
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
 * For grouped vertical bar chart, Calculating yMax value in the base file and sending as MaxOfYVal to cartesian.
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

/**
 * @param p string or number or Date
 *
 * This function takes the single data point of the x-aixs
 * and decides what is the x-axis
 */
export const getTypeOfAxis = (p: string | number | Date, isXAsix: boolean): XAxisTypes | YAxisType => {
  if (isXAsix) {
    switch (typeof p) {
      case 'string':
        return XAxisTypes.StringAxis;
      case 'number':
        return XAxisTypes.NumericAxis;
      default:
        return XAxisTypes.DateAxis;
    }
  } else {
    switch (typeof p) {
      case 'string':
        return YAxisType.StringAxis;
      case 'number':
        return YAxisType.NumericAxis;
      default:
        return YAxisType.DateAxis;
    }
  }
};

/**
 * we need to make sure that if we add any property to this, then
 * we need to also add that in  pointTypes below and vise-versa
 */

export enum Points {
  circle,
  square,
  triangle,
  diamond,
  pyramid,
  hexagon,
  pentagon,
  octagon,
}

export type PointTypes = {
  [key in number]: {
    /**
     * For certian shapes like pentagon, hexagon and octagon.
     * the width of the bouding box increase by the time of the
     * length of the side, so when we want to render a pentagon
     * having each side of length 7 units we need to decrease it's
     * units by width ratio so that the bounding box width of the pentagon
     * stays as 7
     */
    widthRatio: number;
  };
};

/**
 * we need to make sure that if we add any property to this, then
 * we need to also add that in enum Point and vise-versa
 */

export const pointTypes: PointTypes = {
  [Points.circle]: {
    widthRatio: 1,
  },
  [Points.square]: {
    widthRatio: 1,
  },
  [Points.triangle]: {
    widthRatio: 1,
  },
  [Points.diamond]: {
    widthRatio: 1,
  },
  [Points.pyramid]: {
    widthRatio: 1,
  },
  [Points.hexagon]: {
    widthRatio: 2,
  },
  [Points.pentagon]: {
    widthRatio: 1.168,
  },
  [Points.octagon]: {
    widthRatio: 2.414,
  },
};
