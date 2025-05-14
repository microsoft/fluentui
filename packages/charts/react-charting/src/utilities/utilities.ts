import { axisRight as d3AxisRight, axisBottom as d3AxisBottom, axisLeft as d3AxisLeft, Axis as D3Axis } from 'd3-axis';
import { max as d3Max, min as d3Min, ticks as d3Ticks, nice as d3nice } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleBand as d3ScaleBand,
  scaleUtc as d3ScaleUtc,
  scaleTime as d3ScaleTime,
  NumberValue,
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
  ILineChartLineOptions,
} from '../index';
import { formatPrefix as d3FormatPrefix } from 'd3-format';
import { getId } from '@fluentui/react';
import {
  CurveFactory,
  curveLinear as d3CurveLinear,
  curveNatural as d3CurveNatural,
  curveStep as d3CurveStep,
  curveStepAfter as d3CurveStepAfter,
  curveStepBefore as d3CurveStepBefore,
} from 'd3-shape';

export const MIN_DOMAIN_MARGIN = 8;

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
  node: SVGSVGElement | null;
  xAxis: NumericAxis | StringAxis;
  noOfCharsToTruncate: number;
  showXAxisLablesTooltip: boolean;
}

export interface IRotateLabelProps {
  node: SVGSVGElement | null;
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
  xAxisElement?: SVGSVGElement | null;
  xAxisCount?: number;
  showRoundOffXTickValues?: boolean;
  xAxistickSize?: number;
  tickPadding?: number;
  xAxisPadding?: number;
  xAxisInnerPadding?: number;
  xAxisOuterPadding?: number;
  margins: IMargins;
  containerHeight: number;
  containerWidth: number;
  hideTickOverlap?: boolean;
}
export interface ITickParams {
  tickValues?: Date[] | number[] | string[];
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
  yAxisElement?: SVGSVGElement | null;
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

function yAxisTickFormatterInternal(value: number, limitWidth: boolean = false): string {
  // Use SI format prefix with 2 decimal places without insignificant trailing zeros
  let formatter = d3FormatPrefix('.2~', value);

  if (Math.abs(value) < 1) {
    // Don't use SI notation for small numbers as it is less readable
    formatter = d3Format('.2~g');
  } else if (limitWidth && Math.abs(value) >= 1000) {
    // If width is limited, use SI format prefix with 1 point precision
    formatter = d3FormatPrefix('.1~', value);
  }
  const formattedValue = formatter(value);

  // Replace 'G' with 'B' if the value is greater than 10^9 as it is a more common convention
  if (Math.abs(value) >= 1e9) {
    return formattedValue.replace('G', 'B');
  }

  return formattedValue;
}
/**
 * Formatter for y axis ticks.
 * @param value - The number to format.
 * @returns The formatted string .
 */
export function defaultYAxisTickFormatter(value: number): string {
  return yAxisTickFormatterInternal(value);
}

/**
 * Create Numeric X axis
 * @export
 * @param {IXAxisParams} xAxisParams
 */
export function createNumericXAxis(
  xAxisParams: IXAxisParams,
  tickParams: ITickParams,
  chartType: ChartTypes,
  culture?: string,
) {
  const {
    domainNRangeValues,
    showRoundOffXTickValues = true,
    xAxistickSize = 6,
    tickPadding = 10,
    xAxisCount,
    xAxisElement,
    hideTickOverlap,
  } = xAxisParams;
  const xAxisScale = d3ScaleLinear()
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue]);
  showRoundOffXTickValues && xAxisScale.nice();

  let tickCount = xAxisCount ?? 6;
  const tickFormat = (domainValue: NumberValue, _index: number) => {
    if (tickParams.tickFormat) {
      return d3Format(tickParams.tickFormat)(domainValue);
    }
    const xAxisValue = typeof domainValue === 'number' ? domainValue : domainValue.valueOf();
    return convertToLocaleString(xAxisValue, culture) as string;
  };
  if (hideTickOverlap && typeof xAxisCount === 'undefined') {
    const longestLabelWidth =
      calculateLongestLabelWidth(xAxisScale.ticks().map(tickFormat), '[class^="xAxis-"] text') + 20;
    const [start, end] = xAxisScale.range();
    tickCount = Math.min(Math.max(1, Math.floor(Math.abs(end - start) / longestLabelWidth)), 10);
  }

  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxistickSize)
    .tickPadding(tickPadding)
    .ticks(tickCount)
    .tickFormat(tickFormat);
  if (chartType === ChartTypes.HorizontalBarChartWithAxis) {
    xAxis.tickSizeInner(-(xAxisParams.containerHeight - xAxisParams.margins.top!));
  }
  if (tickParams.tickValues) {
    xAxis.tickValues(tickParams.tickValues as number[]);
  }

  if (xAxisElement) {
    d3Select(xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  const tickValues = ((tickParams.tickValues as number[] | undefined) ?? xAxisScale.ticks(tickCount)).map(
    xAxis.tickFormat()!,
  );
  return { xScale: xAxisScale, tickValues };
}

/**
 * This function returns a multilevel formatter for a given date range.
 * It determines the appropriate date format to accommodate each tick value.
 * The goal is to represent the date label in the smallest possible format without loss of information.
 * The challenge here is to adhere to locale specific formats while ensuring the complete label is shown.
 * There is an exhaustive map of all possible date/time units and their respective formats.
 * Based on the range of formatting granularity levels, a format spanning the range is returned.
 * @param startLevel - The starting level of the date format.
 * @param endLevel - The ending level of the date format.
 * @param locale - The locale object for formatting.
 * @param useUTC
 * @returns
 */
function getMultiLevelDateFormatter(
  startLevel: number,
  endLevel: number,
  locale?: d3TimeLocaleObject,
  useUTC?: boolean,
) {
  const timeFormat = locale ? (useUTC ? locale.utcFormat : locale.format) : useUTC ? d3UtcFormat : d3TimeFormat;

  // Refer to https://d3js.org/d3-time-format#locale_format to see explanation about each format specifier
  const DEFAULT = '%c';
  const MS = '.%L';
  const MS_S = ':%S.%L';
  const MS_S_MIN = '%M:%S.%L';
  const MS_S_MIN_H = '%-I:%M:%S.%L %p';
  const MS_S_MIN_H_D = '%a %d, %X';
  const MS_S_MIN_H_D_W = '%b %d, %X';
  const MS_S_MIN_H_D_W_M = MS_S_MIN_H_D_W;
  const MS_S_MIN_H_D_W_M_Y = DEFAULT;
  const S = ':%S';
  const S_MIN = '%-I:%M:%S';
  const S_MIN_H = '%X';
  const S_MIN_H_D = MS_S_MIN_H_D;
  const S_MIN_H_D_W = MS_S_MIN_H_D_W;
  const S_MIN_H_D_W_M = MS_S_MIN_H_D_W_M;
  const S_MIN_H_D_W_M_Y = DEFAULT;
  const MIN = '%-I:%M %p';
  const MIN_H = MIN;
  const MIN_H_D = '%a %d, %-I:%M %p';
  const MIN_H_D_W = '%b %d, %-I:%M %p';
  const MIN_H_D_W_M = MIN_H_D_W;
  const MIN_H_D_W_M_Y = '%x, %-I:%M %p';
  const H = '%-I %p';
  const H_D = '%a %d, %-I %p';
  const H_D_W = '%b %d, %-I %p';
  const H_D_W_M = H_D_W;
  const H_D_W_M_Y = '%x, %-I %p';
  const D = '%a %d';
  const D_W = '%b %d';
  const D_W_M = D_W;
  const D_W_M_Y = '%x';
  const W = D_W;
  const W_M = W;
  const W_M_Y = D_W_M_Y;
  const M = '%B';
  const M_Y = '%b %Y';
  const Y = '%Y';

  const MULTI_LEVEL_DATE_TIME_FORMATS = [
    // ms, s, min, h, d, w, m, y
    [MS, MS_S, MS_S_MIN, MS_S_MIN_H, MS_S_MIN_H_D, MS_S_MIN_H_D_W, MS_S_MIN_H_D_W_M, MS_S_MIN_H_D_W_M_Y], // ms
    [DEFAULT, S, S_MIN, S_MIN_H, S_MIN_H_D, S_MIN_H_D_W, S_MIN_H_D_W_M, S_MIN_H_D_W_M_Y], // s
    [DEFAULT, DEFAULT, MIN, MIN_H, MIN_H_D, MIN_H_D_W, MIN_H_D_W_M, MIN_H_D_W_M_Y], // min
    [DEFAULT, DEFAULT, DEFAULT, H, H_D, H_D_W, H_D_W_M, H_D_W_M_Y], // h
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, D, D_W, D_W_M, D_W_M_Y], // d
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, W, W_M, W_M_Y], // w
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, M, M_Y], // m
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, Y], // y
  ];

  const formatter = timeFormat(MULTI_LEVEL_DATE_TIME_FORMATS[startLevel][endLevel]);
  return formatter;
}

function getDateFormatLevel(date: Date, useUTC?: boolean) {
  const timeSecond = useUTC ? d3UtcSecond : d3TimeSecond;
  const timeMinute = useUTC ? d3UtcMinute : d3TimeMinute;
  const timeHour = useUTC ? d3UtcHour : d3TimeHour;
  const timeDay = useUTC ? d3UtcDay : d3TimeDay;
  const timeMonth = useUTC ? d3UtcMonth : d3TimeMonth;
  const timeWeek = useUTC ? d3UtcWeek : d3TimeWeek;
  const timeYear = useUTC ? d3UtcYear : d3TimeYear;

  const formats = [
    { formatLevel: 0, condition: (d: Date) => timeSecond(d) < d }, // Milliseconds
    { formatLevel: 1, condition: (d: Date) => timeMinute(d) < d }, // Seconds
    { formatLevel: 2, condition: (d: Date) => timeHour(d) < d }, // Minutes
    { formatLevel: 3, condition: (d: Date) => timeDay(d) < d }, // Hours
    { formatLevel: 4, condition: (d: Date) => timeMonth(d) < d && timeWeek(d) < d }, // Days
    { formatLevel: 5, condition: (d: Date) => timeMonth(d) < d }, // Weeks
    { formatLevel: 6, condition: (d: Date) => timeYear(d) < d }, // Months
    { formatLevel: 7, condition: () => true }, // Years (default)
  ];

  const matchedFormat = formats.find(({ condition }) => condition(date));

  return matchedFormat?.formatLevel ?? 7;
}

function isPowerOf10(num: number): boolean {
  const roundedfinalYMax = handleFloatingPointPrecisionError(num);
  return Math.log10(roundedfinalYMax) % 1 === 0;
}

//for reference, go through this 'https://docs.python.org/release/2.5.1/tut/node16.html'
function handleFloatingPointPrecisionError(num: number): number {
  const rounded = Math.round(num);
  return Math.abs(num - rounded) < 1e-6 ? rounded : num;
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
  const { domainNRangeValues, xAxisElement, tickPadding = 6, xAxistickSize = 6, xAxisCount } = xAxisParams;
  const xAxisScale = useUTC ? d3ScaleUtc() : d3ScaleTime();
  xAxisScale
    .domain([domainNRangeValues.dStartValue, domainNRangeValues.dEndValue])
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue])
    .nice();

  let tickCount = xAxisCount ?? 6;

  let lowestFormatLevel = 100;
  let highestFormatLevel = -1;

  const locale = timeFormatLocale ? d3TimeFormatLocale(timeFormatLocale) : undefined;

  xAxisScale.ticks().forEach((domainValue: Date) => {
    const formatLevel = getDateFormatLevel(domainValue, useUTC);

    if (formatLevel > highestFormatLevel) {
      highestFormatLevel = formatLevel;
    }
    if (formatLevel < lowestFormatLevel) {
      lowestFormatLevel = formatLevel;
    }
  });

  const formatFn: (date: Date) => string = getMultiLevelDateFormatter(
    lowestFormatLevel,
    highestFormatLevel,
    locale,
    useUTC,
  );

  const tickFormat = (domainValue: Date, _index: number) => {
    if (customDateTimeFormatter) {
      return customDateTimeFormatter(domainValue);
    }
    if (culture && options) {
      return domainValue.toLocaleString(culture, options);
    }
    if (timeFormatLocale) {
      return formatFn(domainValue);
    }
    if (culture === undefined && tickParams.tickFormat) {
      if (useUTC) {
        return d3UtcFormat(tickParams.tickFormat)(domainValue);
      } else {
        return d3TimeFormat(tickParams.tickFormat)(domainValue);
      }
    }
    return formatFn(domainValue);
  };

  const longestLabelWidth =
    calculateLongestLabelWidth(xAxisScale.ticks().map(tickFormat), '[class^="xAxis-"] text') + 40;
  const [start, end] = xAxisScale.range();
  tickCount = Math.min(Math.max(1, Math.floor(Math.abs(end - start) / longestLabelWidth)), 10);
  tickCount = Math.min(tickCount, xAxisCount ?? tickCount);

  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxistickSize)
    .tickPadding(tickPadding)
    .ticks(tickCount)
    .tickFormat(tickFormat);

  tickParams.tickValues ? xAxis.tickValues(tickParams.tickValues as Date[]) : '';
  if (xAxisElement) {
    d3Select(xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  const tickValues = ((tickParams.tickValues as Date[] | undefined) ?? xAxisScale.ticks(tickCount)).map(
    xAxis.tickFormat()!,
  );
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
    xAxistickSize = 6,
    tickPadding = 10,
    xAxisPadding = 0.1,
    xAxisInnerPadding,
    xAxisOuterPadding,
    containerWidth,
    hideTickOverlap,
  } = xAxisParams;
  const xAxisScale = d3ScaleBand()
    .domain(dataset!)
    .range([domainNRangeValues.rStartValue, domainNRangeValues.rEndValue])
    .paddingInner(typeof xAxisInnerPadding !== 'undefined' ? xAxisInnerPadding : xAxisPadding)
    .paddingOuter(typeof xAxisOuterPadding !== 'undefined' ? xAxisOuterPadding : xAxisPadding);

  let tickValues = (tickParams.tickValues as string[] | undefined) ?? dataset;
  if (hideTickOverlap) {
    let nonOverlappingTickValues = [];
    // Here, we need the width of each individual label to detect overlaps,
    // but calculateLongestLabelWidth returns the maximum pixel width from an array of labels.
    // So call this function separately for each label, instead of the entire array.
    const tickSizes = tickValues.map(value => calculateLongestLabelWidth([value], '[class^="xAxis-"] text'));
    // for LTR
    let start = 0;
    let end = containerWidth;
    let sign = 1;
    const range = xAxisScale.range();
    if (range[1] - range[0] < 0) {
      // for RTL
      start = containerWidth;
      end = 0;
      sign = -1;
    }
    for (let i = tickValues.length - 1; i >= 0; i--) {
      const tickPosition = xAxisScale(tickValues[i])!;
      if (
        sign * (tickPosition - (sign * tickSizes[i]) / 2 - start) >= 0 &&
        sign * (tickPosition + (sign * tickSizes[i]) / 2 - end) <= 0
      ) {
        nonOverlappingTickValues.push(tickValues[i]);
        end = tickPosition - sign * (tickSizes[i] / 2 + 10);
      }
    }
    nonOverlappingTickValues = nonOverlappingTickValues.reverse();
    tickValues = nonOverlappingTickValues;
  }

  const xAxis = d3AxisBottom(xAxisScale).tickSize(xAxistickSize).tickPadding(tickPadding).tickValues(tickValues);

  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement).call(xAxis).selectAll('text').attr('aria-hidden', 'true');
  }
  return { xScale: xAxisScale, tickValues };
}

/**
 * This method is used to calculate the rounded tick values for the y-axis
 * @param {number} minVal
 * @param {number} maxVal
 * @param {number} splitInto
 * @returns {number[]}
 */
function calculateRoundedTicks(minVal: number, maxVal: number, splitInto: number) {
  const finalYmin = minVal >= 0 && minVal === maxVal ? 0 : minVal;
  const finalYmax = minVal < 0 && minVal === maxVal ? 0 : maxVal;
  const ticksInterval = d3nice(finalYmin, finalYmax, splitInto);
  const ticks = d3Ticks(ticksInterval[0], ticksInterval[ticksInterval.length - 1], splitInto);
  if (ticks[ticks.length - 1] > finalYmax && isPowerOf10(finalYmax)) {
    ticks.pop();
  }
  return ticks;
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
  roundedTicks?: boolean,
): number[] {
  if (roundedTicks) {
    return calculateRoundedTicks(minVal, maxVal, splitInto);
  }
  const val = isIntegralDataset
    ? Math.ceil((maxVal - minVal) / splitInto)
    : (maxVal - minVal) / splitInto >= 1
    ? Math.ceil((maxVal - minVal) / splitInto)
    : (maxVal - minVal) / splitInto;
  /*
    For cases where we have negative and positive values
    The dataPointsArray is filled from 0 to minVal by val difference
    Then the array is reversed and values from 0(excluding 0) to maxVal are appended
    This ensures presence of 0 to act as an anchor reference.
    For simple cases where the scale may not encounter such a need for 0,
    We simply fill from minVal to maxVal
  */
  const dataPointsArray: number[] = [minVal < 0 && maxVal >= 0 ? 0 : minVal];
  /*For the case of all positive or all negative, we need to add another value
   in array for atleast one interval, but in case of mix of positive and negative,
   there will always be one more entry that will be added by the logic we have*/
  if (dataPointsArray[0] === minVal) {
    dataPointsArray.push(minVal + val);
  }
  if (minVal < 0 && maxVal >= 0) {
    while (dataPointsArray[dataPointsArray.length - 1] > minVal) {
      dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] - val);
    }
    dataPointsArray.reverse();
  }
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

  // maxOfYVal coming from horizontal bar chart with axis (Calculation done at base file)
  const tempVal = maxOfYVal || yMinMaxValues.endValue;
  const finalYmax = tempVal > yMaxValue ? tempVal : yMaxValue!;
  const finalYmin = yMinMaxValues.startValue < yMinValue ? Math.min(0, yMinMaxValues.startValue) : yMinValue!;
  const yAxisScale = d3ScaleLinear()
    .domain([finalYmin, finalYmax])
    .range([containerHeight - margins.bottom!, margins.top!]);
  const axis = isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis.tickPadding(tickPadding).ticks(yAxisTickCount);
  yAxisTickFormat ? yAxis.tickFormat(yAxisTickFormat) : yAxis.tickFormat(defaultYAxisTickFormatter);
  yAxisElement ? d3Select(yAxisElement).call(yAxis).selectAll('text').attr('aria-hidden', 'true') : '';
  return yAxisScale;
}

export function createNumericYAxis(
  yAxisParams: IYAxisParams,
  isRtl: boolean,
  axisData: IAxisData,
  isIntegralDataset: boolean,
  useSecondaryYScale: boolean = false,
  supportNegativeData: boolean = false,
  roundedTicks: boolean = false,
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
  const finalYmin = supportNegativeData
    ? Math.min(yMinMaxValues.startValue, yMinValue || 0)
    : yMinMaxValues.startValue < yMinValue
    ? 0
    : yMinValue!;
  const domainValues = prepareDatapoints(finalYmax, finalYmin, yAxisTickCount, isIntegralDataset, roundedTicks);
  const yAxisScale = d3ScaleLinear()
    .domain([supportNegativeData ? domainValues[0] : finalYmin, domainValues[domainValues.length - 1]])
    .range([containerHeight - margins.bottom!, margins.top! + (eventAnnotationProps! ? eventLabelHeight! : 0)]);
  const axis =
    (!isRtl && useSecondaryYScale) || (isRtl && !useSecondaryYScale) ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
  const yAxis = axis
    .tickPadding(tickPadding)
    .tickValues(domainValues)
    .tickSizeInner(-(containerWidth - margins.left! - margins.right!));

  yAxisTickFormat ? yAxis.tickFormat(yAxisTickFormat) : yAxis.tickFormat(defaultYAxisTickFormatter);
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
  const { containerHeight, tickPadding = 12, margins, yAxisTickFormat, yAxisElement, yAxisPadding } = yAxisParams;

  let yAxisPaddingValue = yAxisPadding ?? 0.5;
  yAxisPaddingValue = yAxisPaddingValue === 1 ? 0.99 : yAxisPaddingValue;
  const yAxisScale = d3ScaleBand()
    .domain(dataPoints)
    .range([containerHeight - margins.bottom!, margins.top!])
    .padding(yAxisPaddingValue);
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
          .text(originalDataArray[i])
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
 * Groups HorizontalBarChart With Axis data based on YValue
 * Used for stacked case
 * @param {IHorizontalBarChartWithAxisDataPoint[]} chartData
 * @returns {IHorizontalBarChartWithAxisDataPoint[][]}
 */
export function groupChartDataByYValue(
  chartData: IHorizontalBarChartWithAxisDataPoint[],
): IHorizontalBarChartWithAxisDataPoint[][] {
  const map: Record<string, IHorizontalBarChartWithAxisDataPoint[]> = {};
  chartData.forEach(dataPoint => {
    const key = dataPoint.y;
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(dataPoint);
  });

  return Object.values(map);
}

/**
 * Calculates maximum domain values for Numeric x axis for both positive and negative values
 * works for Horizontal Bar Chart With axis
 * @param {IHorizontalBarChartWithAxisDataPoint[][]} stackedChartData
 * @returns {number}
 */
export function computeLongestBars(
  stackedChartData: IHorizontalBarChartWithAxisDataPoint[][],
  X_ORIGIN: number,
): {
  longestPositiveBar: number;
  longestNegativeBar: number;
} {
  let longestPositiveBar = 0;
  let longestNegativeBar = 0;

  stackedChartData.forEach((group: IHorizontalBarChartWithAxisDataPoint[]) => {
    const positiveBarTotal = group.reduce(
      (acc: number, point: IHorizontalBarChartWithAxisDataPoint) => acc + (point.x > 0 ? point.x : 0),
      X_ORIGIN,
    );

    const negativeBarTotal = group.reduce(
      (acc: number, point: IHorizontalBarChartWithAxisDataPoint) => acc + (point.x < 0 ? point.x : 0),
      X_ORIGIN,
    );

    longestPositiveBar = Math.max(longestPositiveBar, positiveBarTotal);
    longestNegativeBar = Math.min(longestNegativeBar, negativeBarTotal);
  });

  return { longestPositiveBar, longestNegativeBar };
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
  X_ORIGIN: number,
): IDomainNRange {
  const longestBars = computeLongestBars(groupChartDataByYValue(points), X_ORIGIN);
  const xMax = longestBars.longestPositiveBar;
  const xMin = longestBars.longestNegativeBar;
  const rMin = isRTL ? margins.left! : margins.left! + shiftX;
  const rMax = isRTL ? containerWidth - margins.right! - shiftX : containerWidth - margins.right!;

  return isRTL
    ? { dStartValue: xMax, dEndValue: Math.min(xMin, X_ORIGIN), rStartValue: rMin, rEndValue: rMax }
    : { dStartValue: Math.min(xMin, X_ORIGIN), dEndValue: xMax, rStartValue: rMin, rEndValue: rMax };
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
export function findNumericMinMaxOfY(
  points: ILineChartPoints[],
  yAxisType?: YAxisType,
  useSecondaryYScale?: boolean,
): { startValue: number; endValue: number } {
  const values: number[] = [];
  points.forEach(point => {
    if (!useSecondaryYScale === !point.useSecondaryYScale) {
      point.data.forEach(data => {
        values.push(data.y);
      });
    }
  });

  return {
    startValue: d3Min(values)!,
    endValue: d3Max(values)!,
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
  yAxisType?: YAxisType,
  useSecondaryYScale?: boolean,
): {
  startValue: number;
  endValue: number;
} {
  const values: number[] = [];
  points.forEach(point => {
    if (!useSecondaryYScale) {
      values.push(point.y);
    }
    if (typeof point.lineData !== 'undefined') {
      if (!useSecondaryYScale === !point.lineData.useSecondaryYScale) {
        values.push(point.lineData.y);
      }
    }
  });

  return { startValue: d3Min(values)!, endValue: d3Max(values)! };
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
    if (Math.abs(data) < 10000) {
      return data.toString();
    }
    return data.toLocaleString(culture);
  } else if (typeof data === 'string' && !window.isNaN(Number(data))) {
    const num = Number(data);
    if (Math.abs(num) < 10000) {
      return num.toString();
    }
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

export function formatValueLimitWidth(value: number) {
  return yAxisTickFormatterInternal(value, true);
}

const DEFAULT_BAR_WIDTH = 16;
const MIN_BAR_WIDTH = 1;

export const getBarWidth = (
  barWidthProp: number | 'default' | 'auto' | undefined,
  maxBarWidthProp: number | undefined,
  adjustedValue = DEFAULT_BAR_WIDTH,
  modeProp?: string,
): number => {
  let barWidth: number;
  if (barWidthProp === 'auto' || modeProp === 'histogram') {
    barWidth = adjustedValue;
  } else if (typeof barWidthProp === 'number') {
    barWidth = barWidthProp;
  } else {
    barWidth = Math.min(adjustedValue, DEFAULT_BAR_WIDTH);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSecureProps(props: Record<string, any> = {}): Record<string, any> {
  const { dangerouslySetInnerHTML, ...result } = props;
  return result;
}

export function areArraysEqual(arr1?: string[], arr2?: string[]): boolean {
  if (arr1 === arr2) {
    return true;
  }
  if (!arr1 && !arr2) {
    return true;
  }
  if (!arr1 || !arr2 || arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

const cssVarRegExp = /var\((--[a-zA-Z0-9\-]+)\)/g;

export function resolveCSSVariables(chartContainer: HTMLElement, styleRules: string) {
  const containerStyles = getComputedStyle(chartContainer);
  return styleRules.replace(cssVarRegExp, (match, group1) => {
    return containerStyles.getPropertyValue(group1);
  });
}

export function copyStyle(properties: string[] | Record<string, string>, fromEl: Element, toEl: Element) {
  const styles = getComputedStyle(fromEl);
  if (Array.isArray(properties)) {
    properties.forEach(prop => {
      d3Select(toEl).style(prop, styles.getPropertyValue(prop));
    });
  } else {
    Object.entries(properties).forEach(([fromProp, toProp]) => {
      d3Select(toEl).style(toProp, styles.getPropertyValue(fromProp));
    });
  }
}

const MEASUREMENT_SPAN_STYLE = {
  position: 'absolute',
  visibility: 'hidden',
  top: '-20000px',
  left: 0,
  padding: 0,
  margin: 0,
  border: 'none',
  whiteSpace: 'pre',
};
const MEASUREMENT_SPAN_ID = getId('measurement_span_');

export const createMeasurementSpan = (text: string | number, className: string, parentElement?: HTMLElement | null) => {
  let measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
  if (!measurementSpan) {
    measurementSpan = document.createElement('span');
    measurementSpan.setAttribute('id', MEASUREMENT_SPAN_ID);
    measurementSpan.setAttribute('aria-hidden', 'true');

    if (parentElement) {
      parentElement.appendChild(measurementSpan);
    } else {
      document.body.appendChild(measurementSpan);
    }
  }

  measurementSpan.setAttribute('class', className);
  Object.assign(measurementSpan.style, MEASUREMENT_SPAN_STYLE);
  measurementSpan.textContent = `${text}`;

  return measurementSpan;
};

export function getCurveFactory(
  curve: ILineChartLineOptions['curve'],
  defaultFactory: CurveFactory = d3CurveLinear,
): CurveFactory {
  if (typeof curve === 'function') {
    return curve;
  }

  switch (curve) {
    case 'linear':
      return d3CurveLinear;
    case 'natural':
      return d3CurveNatural;
    case 'step':
      return d3CurveStep;
    case 'stepAfter':
      return d3CurveStepAfter;
    case 'stepBefore':
      return d3CurveStepBefore;
    default:
      return defaultFactory;
  }
}
