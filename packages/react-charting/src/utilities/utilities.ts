import { axisRight as d3AxisRight, axisBottom as d3AxisBottom, axisLeft as d3AxisLeft, Axis as D3Axis } from 'd3-axis';
import { max as d3Max, min as d3Min } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleBand as d3ScaleBand,
  scaleUtc as d3ScaleUtc,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { select as d3Select, selectAll as d3SelectAll } from 'd3-selection';
import { format as d3Format } from 'd3-format';
import {
  TimeLocaleObject as d3TimeLocaleObject,
  timeFormat as d3TimeFormat,
  timeFormatLocale as d3TimeFormatLocale,
  TimeLocaleDefinition as d3TimeLocaleDefinition,
  utcFormat as d3UtcFormat,
} from 'd3-time-format';
import {
  timeSecond as d3TimeSecond,
  timeMinute as d3TimeMinute,
  timeHour as d3TimeHour,
  timeDay as d3TimeDay,
  timeMonth as d3TimeMonth,
  timeWeek as d3TimeWeek,
  timeYear as d3TimeYear,
  utcSecond as d3UtcSecond,
  utcMinute as d3UtcMinute,
  utcHour as d3UtcHour,
  utcDay as d3UtcDay,
  utcMonth as d3UtcMonth,
  utcWeek as d3UtcWeek,
  utcYear as d3UtcYear,
} from 'd3-time';
import {
  IAccessibilityProps,
  IEventsAnnotationProps,
  ILineChartPoints,
  ILineChartDataPoint,
  IDataPoint,
  IVerticalStackedBarDataPoint,
  IVerticalBarChartDataPoint,
  IHorizontalBarChartWithAxisDataPoint,
} from '../index';
import { formatPrefix as d3FormatPrefix } from 'd3-format';

export type NumericAxis = D3Axis<number | { valueOf(): number }>;
export type StringAxis = D3Axis<string>;

export enum ChartTypes {
  AreaChart,
  LineChart,
  VerticalBarChart,
  VerticalStackedBarChart,
  GroupedVerticalBarChart,
  HeatMapChart,
  HorizontalBarChartWithAxis,
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

export interface IRotateLabelProps {
  node: SVGElement | null;
  xAxis: NumericAxis | StringAxis;
}

export interface IAxisData {
  yAxisDomainValues: number[];
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
  xAxisInnerPadding?: number;
  xAxisOuterPadding?: number;
  margins: IMargins;
  containerHeight: number;
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
export function createNumericXAxis(xAxisParams: IXAxisParams, chartType: ChartTypes, culture?: string) {
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
    .tickFormat((domainValue, index) => {
      const xAxisValue = typeof domainValue === 'number' ? domainValue : domainValue.valueOf();
      return convertToLocaleString(xAxisValue, culture) as string;
    });
  if (chartType === ChartTypes.HorizontalBarChartWithAxis) {
    xAxis.tickSizeInner(-(xAxisParams.containerHeight - xAxisParams.margins.top!));
  }
  if (xAxisElement) {
    d3Select(xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  const tickValues = xAxisScale.ticks(xAxisCount).map(xAxis.tickFormat()!);
  return { xScale: xAxisScale, tickValues };
}

function multiFormat(date: Date, locale?: d3TimeLocaleObject, useUTC?: boolean) {
  const timeFormat = locale ? (useUTC ? locale.utcFormat : locale.format) : useUTC ? d3UtcFormat : d3TimeFormat;

  const formatMillisecond = timeFormat('.%L');
  const formatSecond = timeFormat(':%S');
  const formatMinute = timeFormat('%I:%M');
  const formatHour = timeFormat('%I %p');
  const formatDay = timeFormat('%a %d');
  const formatWeek = timeFormat('%b %d');
  const formatMonth = timeFormat('%B');
  const formatYear = timeFormat('%Y');

  const timeSecond = useUTC ? d3UtcSecond : d3TimeSecond;
  const timeMinute = useUTC ? d3UtcMinute : d3TimeMinute;
  const timeHour = useUTC ? d3UtcHour : d3TimeHour;
  const timeDay = useUTC ? d3UtcDay : d3TimeDay;
  const timeMonth = useUTC ? d3UtcMonth : d3TimeMonth;
  const timeWeek = useUTC ? d3UtcWeek : d3TimeWeek;
  const timeYear = useUTC ? d3UtcYear : d3TimeYear;

  return (
    timeSecond(date) < date
      ? formatMillisecond
      : timeMinute(date) < date
      ? formatSecond
      : timeHour(date) < date
      ? formatMinute
      : timeDay(date) < date
      ? formatHour
      : timeMonth(date) < date
      ? timeWeek(date) < date
        ? formatDay
        : formatWeek
      : timeYear(date) < date
      ? formatMonth
      : formatYear
  )(date);
}

/**
 * Creating Date x axis of the Chart
 * @export
 * @param {IXAxisParams} xAxisParams
 * @param {ITickParams} tickParams
 */
export function createDateXAxis(
  xAxisParams: IXAxisParams,
  tickParams: ITickParams,
  culture?: string,
  options?: Intl.DateTimeFormatOptions,
  timeFormatLocale?: d3TimeLocaleDefinition,
  customDateTimeFormatter?: (dateTime: Date) => string,
  useUTC?: boolean,
) {
  const { domainNRangeValues, xAxisElement, tickPadding = 6, xAxistickSize = 6, xAxisCount = 6 } = xAxisParams;
  const xAxisScale = useUTC ? d3ScaleUtc() : d3ScaleTime();
  xAxisScale
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue]);
  const xAxis = d3AxisBottom(xAxisScale).tickSize(xAxistickSize).tickPadding(tickPadding).ticks(xAxisCount);
  if (customDateTimeFormatter) {
    xAxis.tickFormat((domainValue: Date, _index: number) => {
      return customDateTimeFormatter(domainValue);
    });
  } else if (culture && options) {
    xAxis.tickFormat((domainValue: Date, _index: number) => {
      return domainValue.toLocaleString(culture, options);
    });
  } else if (timeFormatLocale) {
    const locale: d3TimeLocaleObject = d3TimeFormatLocale(timeFormatLocale!);

    xAxis.tickFormat((domainValue: Date, _index: number) => {
      return multiFormat(domainValue, locale, useUTC);
    });
  }

  tickParams.tickValues ? xAxis.tickValues(tickParams.tickValues) : '';
  if (culture === undefined) {
    tickParams.tickFormat
      ? xAxis.tickFormat(useUTC ? d3UtcFormat(tickParams.tickFormat) : d3TimeFormat(tickParams.tickFormat))
      : '';
  }
  if (xAxisElement) {
    d3Select(xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  const tickValues = (tickParams.tickValues ?? xAxisScale.ticks(xAxisCount)).map((val, idx) => {
    const tickFormat = xAxis.tickFormat();
    // val is a Date object. So when the tick format is not set, format val as a string to calculate its width
    return tickFormat ? tickFormat(val, idx) : multiFormat(val as Date, undefined, useUTC);
  });
  return { xScale: xAxisScale, tickValues };
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
export function createStringXAxis(
  xAxisParams: IXAxisParams,
  tickParams: ITickParams,
  dataset: string[],
  culture?: string,
) {
  const {
    domainNRangeValues,
    xAxisCount = 6,
    xAxistickSize = 6,
    tickPadding = 10,
    xAxisPadding = 0.1,
    xAxisInnerPadding,
    xAxisOuterPadding,
  } = xAxisParams;
  const xAxisScale = d3ScaleBand()
    .domain(dataset!)
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue])
    .paddingInner(typeof xAxisInnerPadding !== 'undefined' ? xAxisInnerPadding : xAxisPadding)
    .paddingOuter(typeof xAxisOuterPadding !== 'undefined' ? xAxisOuterPadding : xAxisPadding);
  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxistickSize)
    .tickPadding(tickPadding)
    .ticks(xAxisCount)
    .tickFormat((x: string, index: number) => {
      return convertToLocaleString(dataset[index], culture) as string;
    });

  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  const tickValues = dataset.map(xAxis.tickFormat()!);
  return { xScale: xAxisScale, tickValues };
}

/**
 * This method used for creating data points for the y axis.
 * @export
 * @param {number} maxVal
 * @param {number} minVal
 * @param {number} splitInto
 * @param {boolean} isIntegralDataset
 * @returns {number[]}
 */
export function prepareDatapoints(
  maxVal: number,
  minVal: number,
  splitInto: number,
  isIntegralDataset: boolean,
): number[] {
  const val = isIntegralDataset
    ? Math.ceil((maxVal - minVal) / splitInto)
    : (maxVal - minVal) / splitInto >= 1
    ? Math.ceil((maxVal - minVal) / splitInto)
    : (maxVal - minVal) / splitInto;
  const dataPointsArray: number[] = [minVal, minVal + val];
  while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
    dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
  }
  return dataPointsArray;
}

export function createYAxisForHorizontalBarChartWithAxis(yAxisParams: IYAxisParams, isRtl: boolean) {
  const {
    yMinMaxValues = { startValue: 0, endValue: 0 },
    yAxisElement = null,
    yMaxValue = 0,
    yMinValue = 0,
    containerHeight,
    margins,
    tickPadding = 12,
    maxOfYVal = 0,
    yAxisTickFormat,
    yAxisTickCount = 4,
  } = yAxisParams;

  // maxOfYVal coming from only area chart and Grouped vertical bar chart(Calculation done at base file)
  const tempVal = maxOfYVal || yMinMaxValues.endValue;
  const finalYmax = tempVal > yMaxValue ? tempVal : yMaxValue!;
  const finalYmin = yMinMaxValues.startValue < yMinValue ? 0 : yMinValue!;
  const yAxisScale = d3ScaleLinear()
    .domain([finalYmin, finalYmax])
    .range([containerHeight - margins.bottom!, margins.top!]);
  const axis = isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis.tickPadding(tickPadding).ticks(yAxisTickCount);
  yAxisTickFormat ? yAxis.tickFormat(yAxisTickFormat) : yAxis.tickFormat(d3Format('.2~s'));
  yAxisElement ? d3Select(yAxisElement).call(yAxis).selectAll('text').attr('aria-hidden', 'true') : '';
  return yAxisScale;
}

export function createNumericYAxis(
  yAxisParams: IYAxisParams,
  isRtl: boolean,
  axisData: IAxisData,
  isIntegralDataset: boolean,
  useSecondaryYScale: boolean = false,
) {
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
  const domainValues = prepareDatapoints(finalYmax, finalYmin, yAxisTickCount, isIntegralDataset);
  const yAxisScale = d3ScaleLinear()
    .domain([finalYmin, domainValues[domainValues.length - 1]])
    .range([containerHeight - margins.bottom!, margins.top! + (eventAnnotationProps! ? eventLabelHeight! : 0)]);
  const axis =
    (!isRtl && useSecondaryYScale) || (isRtl && !useSecondaryYScale) ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis
    .tickPadding(tickPadding)
    .tickValues(domainValues)
    .tickSizeInner(-(containerWidth - margins.left! - margins.right!));

  yAxisTickFormat ? yAxis.tickFormat(yAxisTickFormat) : yAxis.tickFormat(d3Format('.2~s'));
  yAxisElement ? d3Select(yAxisElement).call(yAxis).selectAll('text').attr('aria-hidden', 'true') : '';
  axisData.yAxisDomainValues = domainValues;
  return yAxisScale;
}

/**
 * Creating String Y axis of the chart for Horizontal Bar Chart With Axis
 * @param yAxisParams
 * @param dataPoints
 * @param isRtl
 */
export const createStringYAxisForHorizontalBarChartWithAxis = (
  yAxisParams: IYAxisParams,
  dataPoints: string[],
  isRtl: boolean,
  barWidth: number,
) => {
  const { containerHeight, tickPadding = 12, margins, yAxisTickFormat, yAxisElement } = yAxisParams;

  const yAxisScale = d3ScaleBand()
    .domain(dataPoints)
    .range([containerHeight - margins.bottom! - barWidth / 2, margins.top! + barWidth / 2]);
  const axis = isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis.tickPadding(tickPadding).ticks(dataPoints);
  if (yAxisTickFormat) {
    yAxis.tickFormat(yAxisTickFormat);
  }
  yAxisElement ? d3Select(yAxisElement).call(yAxis).selectAll('text') : '';
  return yAxisScale;
};

/**
 * Creating String Y axis of the chart for other chart except Horizontal Bar Chart With Axis
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

export function calloutData(values: (ILineChartPoints & { index?: number })[]) {
  let combinedResult: (ILineChartDataPoint & {
    legend: string;
    color?: string;
    index?: number;
  })[] = [];

  values.forEach((line: ILineChartPoints & { index?: number }) => {
    const elements = line.data
      .filter((point: ILineChartDataPoint) => !point.hideCallout)
      .map((point: ILineChartDataPoint) => {
        return { ...point, legend: line.legend, color: line.color, index: line.index };
      });
    combinedResult = combinedResult.concat(elements);
  });

  const xValToDataPoints: {
    [key: number]: {
      legend: string;
      y: number;
      color: string;
      xAxisCalloutData?: string;
      yAxisCalloutData?: string | { [id: string]: number };
      callOutAccessibilityData?: IAccessibilityProps;
      index?: number;
    }[];
    [key: string]: {
      legend: string;
      y: number;
      color: string;
      xAxisCalloutData?: string;
      yAxisCalloutData?: string | { [id: string]: number };
      callOutAccessibilityData?: IAccessibilityProps;
      index?: number;
    }[];
  } = {};
  combinedResult.forEach(ele => {
    const xValue = ele.x instanceof Date ? ele.x.getTime() : ele.x;
    if (xValue in xValToDataPoints) {
      xValToDataPoints[xValue].push({
        legend: ele.legend,
        y: ele.y,
        color: ele.color!,
        xAxisCalloutData: ele.xAxisCalloutData,
        yAxisCalloutData: ele.yAxisCalloutData,
        callOutAccessibilityData: ele.callOutAccessibilityData,
        index: ele.index,
      });
    } else {
      xValToDataPoints[xValue] = [
        {
          legend: ele.legend,
          y: ele.y,
          color: ele.color!,
          xAxisCalloutData: ele.xAxisCalloutData,
          yAxisCalloutData: ele.yAxisCalloutData,
          callOutAccessibilityData: ele.callOutAccessibilityData,
          index: ele.index,
        },
      ];
    }
  });

  const result = Object.keys(xValToDataPoints).map(xValue => {
    return { x: Number(xValue), values: xValToDataPoints[xValue] };
  });
  return result;
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
 * This method used for wrapping of y axis labels (tick values).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createYAxisLabels(
  node: SVGElement | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxis: any,
  noOfCharsToTruncate: number,
  truncateLabel: boolean,
  isRtl: boolean,
) {
  if (node === null) {
    return;
  }
  const axisNode = d3Select(node).call(yAxis);
  axisNode.selectAll('.tick text').each(function () {
    const text = d3Select(this);
    const totalWord = text.text();
    const truncatedWord = isRtl
      ? `...${text.text().slice(0, noOfCharsToTruncate)}`
      : `${text.text().slice(0, noOfCharsToTruncate)}...`;
    const totalWordLength = text.text().length;
    const padding = truncateLabel ? 1.5 : 1; // ems
    const y = text.attr('y');
    const x = text.attr('x');
    const dy = parseFloat(text.attr('dy'));
    const dx = 0;
    text
      .text(null)
      .append('tspan')
      .attr('x', x)
      .attr('y', y)
      .attr('id', 'BaseSpan')
      .attr('dy', dy + 'em')
      .attr('data-', totalWord);

    if (truncateLabel && totalWordLength > noOfCharsToTruncate) {
      text
        .append('tspan')
        .attr('id', 'showDots')
        .attr('x', isRtl ? 0 : x)
        .attr('y', y)
        .attr('dy', dy)
        .attr('dx', padding + dx + 'em')
        .text(truncatedWord);
    } else {
      text
        .attr('text-align', 'start')
        .append('tspan')
        .attr('id', 'LessLength')
        .attr('x', isRtl ? 0 : x)
        .attr('y', y)
        .attr('dx', padding + dx + 'em')
        .text(totalWord);
    }
  });
}

export const wrapContent = (content: string, id: string, maxWidth: number) => {
  const textElement = d3Select<SVGTextElement, {}>(`#${id}`);
  textElement.text(content);
  if (!textElement.node()) {
    return false;
  }

  let isOverflowing = false;
  let textLength = textElement.node()!.getComputedTextLength();
  while (textLength > maxWidth && content.length > 0) {
    content = content.slice(0, -1);
    textElement.text(content + '...');
    isOverflowing = true;
    textLength = textElement.node()!.getComputedTextLength();
  }
  return isOverflowing;
};

/**
 * Calculates the width of the longest axis label in pixels
 */
export const calculateLongestLabelWidth = (labels: (string | number)[], query: string = 'none'): number => {
  let maxLabelWidth = 0;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const axisText = document.querySelector(query);
    if (axisText) {
      const styles = window.getComputedStyle(axisText, null);
      const fontWeight = styles.getPropertyValue('font-weight');
      const fontSize = styles.getPropertyValue('font-size');
      const fontFamily = styles.getPropertyValue('font-family');
      ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    } else {
      ctx.font = '600 10px "Segoe UI"';
    }

    labels.forEach(label => {
      maxLabelWidth = Math.max(ctx.measureText(label.toString()).width, maxLabelWidth);
    });
  }

  return maxLabelWidth;
};

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on('mouseover', (event: any, d) => {
        div.style('opacity', 0.9);
        div
          .html(originalDataArray[i])
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
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
 * Calculates Domain and range values for Numeric X axis.
 * This method calculates Horizontal Chart with Axis
 * @export
 * @param {ILineChartPoints[]} points
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @returns {IDomainNRange}
 */
export function domainRangeOfNumericForHorizontalBarChartWithAxis(
  points: IHorizontalBarChartWithAxisDataPoint[],
  margins: IMargins,
  containerWidth: number,
  isRTL: boolean,
  shiftX: number,
): IDomainNRange {
  const xMax = d3Max(points, (point: IHorizontalBarChartWithAxisDataPoint) => point.x as number)!;
  const rMin = isRTL ? margins.left! : margins.left! + shiftX;
  const rMax = isRTL ? containerWidth - margins.right! - shiftX : containerWidth - margins.right!;

  return isRTL
    ? { dStartValue: xMax, dEndValue: 0, rStartValue: rMin, rEndValue: rMax }
    : { dStartValue: 0, dEndValue: xMax, rStartValue: rMin, rEndValue: rMax };
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
  const rMax = margins.left!;
  const rMin = width - margins.right!;
  return isRTL
    ? { dStartValue: xMax, dEndValue: xMin, rStartValue: rMax, rEndValue: rMin }
    : { dStartValue: xMin, dEndValue: xMax, rStartValue: rMax, rEndValue: rMin };
}

/**
 * Calculates Domain and range values for Date X axis.
 * This method calculates Bar chart.
 * @export
 * @param {IVerticalBarChartDataPoint[]} points
 * @param {IMargins} margins
 * @param {number} width
 * @param {boolean} isRTL
 * @param {Date[] | number[]} tickValues
 * @returns {IDomainNRange}
 */
export function domainRangeOfDateForAreaLineVerticalBarChart(
  points: ILineChartPoints[] | IVerticalBarChartDataPoint[] | IVerticalStackedBarDataPoint[],
  margins: IMargins,
  width: number,
  isRTL: boolean,
  tickValues: Date[] = [],
  chartType: ChartTypes,
  barWidth?: number,
): IDomainNRange {
  let sDate: Date;
  let lDate: Date;
  if (chartType === ChartTypes.AreaChart || chartType === ChartTypes.LineChart) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sDate = d3Min(points, (point: any) => {
      return d3Min(point.data, (item: ILineChartDataPoint) => {
        return item.x as Date;
      });
    })!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lDate = d3Max(points, (point: any) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => {
        return item.x as Date;
      });
    })!;
    // Need to draw graph with given small and large date
    // (Which Involves customization of date axis tick values)
    // That may be Either from given graph data or from prop 'tickValues' date values.
    // So, Finding smallest and largest dates
    sDate = d3Min([...tickValues, sDate])!;
    lDate = d3Max([...tickValues, lDate])!;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sDate = d3Min(points as any[], point => point.x as Date)!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lDate = d3Max(points as any[], point => point.x as Date)!;
  }

  const rStartValue = margins.left!;
  const rEndValue = width - margins.right!;

  return isRTL
    ? { dStartValue: lDate, dEndValue: sDate, rStartValue, rEndValue }
    : { dStartValue: sDate, dEndValue: lDate, rStartValue, rEndValue };
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
  const rMin = margins.left!;
  const rMax = containerWidth - margins.right!;

  return isRTL
    ? { dStartValue: xMax, dEndValue: xMin, rStartValue: rMin, rEndValue: rMax }
    : { dStartValue: xMin, dEndValue: xMax, rStartValue: rMin, rEndValue: rMax };
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
export function findVerticalNumericMinMaxOfY(points: IVerticalBarChartDataPoint[]): {
  startValue: number;
  endValue: number;
} {
  const yMax = d3Max(points, (point: IVerticalBarChartDataPoint) => {
    if (point.lineData !== undefined) {
      if (point.y > point.lineData!.y) {
        return point.y;
      } else {
        return point.lineData!.y;
      }
    } else {
      return point.y;
    }
  })!;
  const yMin = d3Min(points, (point: IVerticalBarChartDataPoint) => {
    if (point.lineData !== undefined) {
      if (point.y < point.lineData!.y) {
        return point.y;
      } else {
        return point.lineData!.y;
      }
    } else {
      return point.y;
    }
  })!;

  return { startValue: yMin, endValue: yMax };
}
/**
 * Fins the min and max values of the vertical bar chart y axis data point.
 * @export
 * @param {IVerticalBarChartDataPoint[]} points
 * @returns {{ startValue: number; endValue: number }}
 */
export function findHBCWANumericMinMaxOfY(
  points: IHorizontalBarChartWithAxisDataPoint[],
  yAxisType: YAxisType | undefined,
): { startValue: number; endValue: number } {
  if (yAxisType !== undefined && yAxisType === YAxisType.NumericAxis) {
    const yMax = d3Max(points, (point: IHorizontalBarChartWithAxisDataPoint) => point.y as number)!;
    const yMin = d3Min(points, (point: IHorizontalBarChartWithAxisDataPoint) => point.y as number)!;

    return { startValue: yMin, endValue: yMax };
  }
  return { startValue: 0, endValue: 0 };
}

/**
 * @param p string or number or Date
 *
 * This function takes the single data point of the x-aixs
 * and decides what is the x-axis
 */
export const getTypeOfAxis = (p: string | number | Date, isXAxis: boolean): XAxisTypes | YAxisType => {
  if (isXAxis) {
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

export enum CustomPoints {
  dottedLine,
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

/**
 * @param accessibleData accessible data
 * @param role string to define role of tag
 * @param isDataFocusable boolean
 * function returns the accessibility data object
 */
export const getAccessibleDataObject = (
  accessibleData?: IAccessibilityProps,
  role: string = 'text',
  isDataFocusable: boolean = true,
) => {
  accessibleData = accessibleData ?? {};
  return {
    role,
    'data-is-focusable': isDataFocusable,
    'aria-label': accessibleData!.ariaLabel,
    'aria-labelledby': accessibleData!.ariaLabelledBy,
    'aria-describedby': accessibleData!.ariaDescribedBy,
  };
};

type LocaleStringDataProps = number | string | Date | undefined;
export const convertToLocaleString = (data: LocaleStringDataProps, culture?: string): LocaleStringDataProps => {
  if (data === undefined || data === null || Number.isNaN(data)) {
    return data;
  }
  culture = culture || undefined;
  if (typeof data === 'number') {
    return data.toLocaleString(culture);
  } else if (typeof data === 'string' && !window.isNaN(Number(data))) {
    const num = Number(data);
    return num.toLocaleString(culture);
  } else if (data instanceof Date) {
    return data.toLocaleDateString(culture);
  }
  return data;
};

export function rotateXAxisLabels(rotateLabelProps: IRotateLabelProps) {
  const { node, xAxis } = rotateLabelProps;
  if (node === null || xAxis === null) {
    return;
  }

  let maxHeight: number = 0;
  const xAxisTranslations: string[] = [];
  d3Select(node)
    .call(xAxis)
    .selectAll('.tick')
    .each(function () {
      const translateValue = (this as SVGElement).getAttribute('transform');
      if (translateValue?.indexOf('rotate') === -1) {
        const translatePair = translateValue
          .substring(translateValue.indexOf('(') + 1, translateValue.indexOf(')'))
          .split(',');
        if (translatePair.length === 2) {
          xAxisTranslations.push(translatePair[0]);
          (this as SVGElement).setAttribute('transform', `translate(${translatePair[0]},0)rotate(-45)`);
        }
      }

      const BoxCordinates = (this as HTMLElement).getBoundingClientRect();
      const boxHeight = BoxCordinates && BoxCordinates.height;
      if (boxHeight > maxHeight) {
        maxHeight = boxHeight;
      }
    });

  let idx = 0;
  d3Select(node)
    .call(xAxis)
    .selectAll('.tick')
    .each(function () {
      if (xAxisTranslations.length > idx) {
        (this as SVGElement).setAttribute(
          'transform',
          `translate(${xAxisTranslations[idx]},${maxHeight / 2})rotate(-45)`,
        ); // Translate y by max height/2
        idx += 1;
      }
    });

  return Math.floor(maxHeight / 1.414); // Compute maxHeight/tanInverse(45) to get the vertical height of labels.
}

export function wrapTextInsideDonut(selectorClass: string, maxWidth: number) {
  let idx: number = 0;
  d3SelectAll(`.${selectorClass}`).each(function () {
    const text = d3Select(this);
    const words = text.text().split(/\s+/).reverse();
    let word: string = '';
    let line: string[] = [];
    let lineNumber: number = 0;
    const lineHeight = 1.1; // ems
    const y = text.attr('y');

    let tspan = text
      .text(null)
      .append('tspan')
      .attr('id', `WordBreakId-${idx}-${lineNumber}`)
      .attr('x', 0)
      .attr('y', y)
      .attr('dy', lineNumber++ * lineHeight + 'em');

    while ((word = words.pop()!)) {
      line.push(word);
      tspan.text(line.join(' ') + ' ');
      if (tspan.node()!.getComputedTextLength() > maxWidth && line.length > 1) {
        line.pop();
        tspan.text(line.join(' ') + ' ');
        line = [word];
        tspan = text
          .append('tspan')
          .attr('id', `WordBreakId-${idx}-${lineNumber}`)
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', lineNumber++ * lineHeight + 'em')
          .text(word);
      }
    }
    idx += 1;
  });
}

export function formatValueWithSIPrefix(value: number) {
  let specifier: string;
  if (value < 1000) {
    specifier = '.2~'; // upto 2 decimal places without insignificant trailing zeros
  } else {
    specifier = '.1'; // upto 1 decimal place
  }

  return d3FormatPrefix(specifier, value)(value);
}

const DEFAULT_BAR_WIDTH = 16;
const MIN_BAR_WIDTH = 1;

export const getBarWidth = (
  barWidthProp: number | 'default' | 'auto' | undefined,
  maxBarWidthProp: number | undefined,
  adjustedValue = DEFAULT_BAR_WIDTH,
): number => {
  let barWidth: number;
  if (typeof barWidthProp === 'number') {
    barWidth = barWidthProp;
  } else if (barWidthProp === 'default' || typeof barWidthProp === 'undefined') {
    barWidth = Math.min(adjustedValue, DEFAULT_BAR_WIDTH);
  } else {
    barWidth = adjustedValue;
  }
  if (typeof maxBarWidthProp === 'number') {
    barWidth = Math.min(barWidth, maxBarWidthProp);
  }
  barWidth = Math.max(barWidth, MIN_BAR_WIDTH);
  return barWidth;
};

export const getScalePadding = (prop: number | undefined, shorthandProp?: number, defaultValue = 0): number => {
  let padding = typeof prop === 'number' ? prop : typeof shorthandProp === 'number' ? shorthandProp : defaultValue;
  padding = Math.max(0, Math.min(padding, 1));
  return padding;
};

export const isScalePaddingDefined = (prop: number | undefined, shorthandProp?: number): boolean => {
  return typeof prop === 'number' || typeof shorthandProp === 'number';
};

export const formatDate = (date: Date, useUTC?: boolean) => {
  const timeFormat = useUTC ? d3UtcFormat : d3TimeFormat;
  return timeFormat('%-e %b %Y, %H:%M')(date) + (useUTC ? ' GMT' : '');
};
