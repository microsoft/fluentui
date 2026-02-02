import {
  scaleBand as d3ScaleBand,
  scaleLinear as d3ScaleLinear,
  scaleLog as d3ScaleLog,
  scaleTime as d3ScaleTime,
  scaleUtc as d3ScaleUtc,
  NumberValue,
  ScaleBand,
  ScaleContinuousNumeric,
  ScaleTime,
} from 'd3-scale';
import { extent as d3Extent, range as d3Range } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { AxisScaleType } from '../../types/DataPoint';
import {
  generateDateTicks,
  generateNumericTicks,
  getDateFormatLevel,
  isValidDomainValue,
  precisionRound,
} from '../../utilities/utilities';
import {
  isInvalidValue,
  formatToLocaleString,
  getMultiLevelDateTimeFormatOptions,
  formatDateToLocaleString,
} from '@fluentui/chart-utilities';
import { timeFormat as d3TimeFormat, utcFormat as d3UtcFormat } from 'd3-time-format';
import { PolarChartProps } from './PolarChart.types';

export const EPSILON = 1e-6;

export const createRadialScale = (
  scaleType: string,
  domain: (string | number | Date)[],
  range: number[],
  opts: {
    useUTC?: boolean;
    tickCount?: number;
    tickValues?: (string | number | Date)[];
    tickText?: string[];
    tickFormat?: string;
    culture?: string;
    tickStep?: number | string;
    tick0?: number | Date;
    dateLocalizeOptions?: Intl.DateTimeFormatOptions;
  } = {},
): {
  scale: ScaleBand<string> | ScaleContinuousNumeric<number, number, undefined> | ScaleTime<number, number>;
  tickValues: (string | number | Date)[];
  tickLabels: string[];
} => {
  if (scaleType === 'category') {
    const scale = d3ScaleBand()
      .domain(domain as string[])
      .range(range)
      .paddingInner(1);
    const tickValues = Array.isArray(opts.tickValues) ? (opts.tickValues as string[]) : (domain as string[]);
    const tickFormat = (domainValue: string, index: number) => {
      if (Array.isArray(opts.tickValues) && Array.isArray(opts.tickText) && !isInvalidValue(opts.tickText[index])) {
        return opts.tickText[index];
      }
      return domainValue;
    };
    return { scale, tickValues, tickLabels: tickValues.map(tickFormat) };
  }

  let scale: ScaleContinuousNumeric<number, number, undefined> | ScaleTime<number, number>;
  if (scaleType === 'date') {
    scale = opts.useUTC ? d3ScaleUtc() : d3ScaleTime();
  } else {
    scale = scaleType === 'log' ? d3ScaleLog() : d3ScaleLinear();
  }

  scale.domain(domain as (number | Date)[]);
  scale.range(range);
  scale.nice();

  const tickCount = opts.tickCount ?? 4;
  let tickFormat;
  let customTickValues = Array.isArray(opts.tickValues) ? (opts.tickValues as (number | Date)[]) : undefined;
  if (scaleType === 'date') {
    let lowestFormatLevel = 100;
    let highestFormatLevel = -1;

    (scale as ScaleTime<number, number>).ticks().forEach((domainValue: Date) => {
      const formatLevel = getDateFormatLevel(domainValue, opts.useUTC);
      if (formatLevel > highestFormatLevel) {
        highestFormatLevel = formatLevel;
      }
      if (formatLevel < lowestFormatLevel) {
        lowestFormatLevel = formatLevel;
      }
    });
    const formatOptions =
      opts.dateLocalizeOptions ?? getMultiLevelDateTimeFormatOptions(lowestFormatLevel, highestFormatLevel);
    tickFormat = (domainValue: Date, index: number) => {
      if (Array.isArray(opts.tickValues) && Array.isArray(opts.tickText) && !isInvalidValue(opts.tickText[index])) {
        return opts.tickText[index];
      }
      if (isInvalidValue(opts.culture) && typeof opts.tickFormat === 'string') {
        if (opts.useUTC) {
          return d3UtcFormat(opts.tickFormat)(domainValue);
        } else {
          return d3TimeFormat(opts.tickFormat)(domainValue);
        }
      }
      return formatDateToLocaleString(domainValue, opts.culture, opts.useUTC, false, formatOptions);
    };
    if (opts.tickStep) {
      customTickValues = generateDateTicks(opts.tickStep, opts.tick0, scale.domain() as Date[], opts.useUTC);
    }
  } else {
    const defaultTickFormat = (scale as ScaleContinuousNumeric<number, number>).tickFormat(tickCount);
    tickFormat = (domainValue: NumberValue, index: number) => {
      if (Array.isArray(opts.tickValues) && Array.isArray(opts.tickText) && !isInvalidValue(opts.tickText[index])) {
        return opts.tickText[index];
      }
      if (typeof opts.tickFormat === 'string') {
        return d3Format(opts.tickFormat)(domainValue);
      }
      const value = typeof domainValue === 'number' ? domainValue : domainValue.valueOf();
      return defaultTickFormat(value) === '' ? '' : (formatToLocaleString(value, opts.culture) as string);
    };
    if (opts.tickStep) {
      customTickValues = generateNumericTicks(
        scaleType as AxisScaleType,
        opts.tickStep,
        opts.tick0,
        scale.domain() as number[],
      );
    }
  }
  const tickValues = customTickValues ?? scale.ticks(tickCount);

  return { scale, tickValues, tickLabels: tickValues.map(tickFormat) };
};

export const getScaleType = (
  values: (string | number | Date)[],
  opts: {
    scaleType?: AxisScaleType;
    supportsLog?: boolean;
  } = {},
): string => {
  let scaleType = 'category';
  if (typeof values[0] === 'number') {
    if (opts.supportsLog && opts.scaleType === 'log') {
      scaleType = 'log';
    } else {
      scaleType = 'linear';
    }
  } else if (values[0] instanceof Date) {
    scaleType = 'date';
  }
  return scaleType;
};

export const getContinuousScaleDomain = (
  scaleType: string,
  values: (number | Date)[],
  opts: {
    rangeStart?: number | Date;
    rangeEnd?: number | Date;
  } = {},
): (number | Date)[] => {
  let [min, max] = d3Extent(values.filter(v => isValidDomainValue(v, scaleType as AxisScaleType)) as (number | Date)[]);
  if (scaleType === 'linear') {
    [min, max] = d3Extent([min, max, 0] as number[]);
  }
  if (!isInvalidValue(opts.rangeStart)) {
    min = opts.rangeStart;
  }
  if (!isInvalidValue(opts.rangeEnd)) {
    max = opts.rangeEnd;
  }

  if (isInvalidValue(min) || isInvalidValue(max)) {
    return [];
  }
  return [min!, max!];
};

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const radToDeg = (rad: number) => (rad * 180) / Math.PI;

const normalizeAngle = (deg: number, direction: PolarChartProps['direction']) =>
  (((direction === 'clockwise' ? deg : 450 - deg) % 360) + 360) % 360;

export const createAngularScale = (
  scaleType: string,
  domain: (string | number | Date)[],
  opts: {
    tickCount?: number;
    tickValues?: (string | number | Date)[];
    tickText?: string[];
    tickFormat?: string;
    culture?: string;
    tickStep?: number | string;
    tick0?: number | Date;
    direction?: PolarChartProps['direction'];
    unit?: NonNullable<PolarChartProps['angularAxis']>['unit'];
  } = {},
): { scale: (v: string | number) => number; tickValues: (string | number)[]; tickLabels: string[] } => {
  if (scaleType === 'category') {
    const categoryIndexMap: Record<string, number> = {};
    (domain as string[]).forEach((d, i) => {
      categoryIndexMap[d] = i;
    });
    const period = 360 / domain.length;
    const tickValues = Array.isArray(opts.tickValues) ? (opts.tickValues as string[]) : (domain as string[]);
    const tickFormat = (domainValue: string, index: number) => {
      if (Array.isArray(opts.tickValues) && Array.isArray(opts.tickText) && !isInvalidValue(opts.tickText[index])) {
        return opts.tickText[index];
      }
      return domainValue;
    };
    return {
      scale: (v: string) => degToRad(normalizeAngle(categoryIndexMap[v] * period, opts.direction)),
      tickValues,
      tickLabels: tickValues.map(tickFormat),
    };
  }

  let customTickValues = Array.isArray(opts.tickValues) ? (opts.tickValues as number[]) : undefined;
  const tickFormat = (domainValue: number, index: number) => {
    if (Array.isArray(opts.tickValues) && Array.isArray(opts.tickText) && !isInvalidValue(opts.tickText[index])) {
      return opts.tickText[index];
    }
    if (typeof opts.tickFormat === 'string') {
      return d3Format(opts.tickFormat)(domainValue);
    }
    return formatAngle(domainValue, opts.unit);
  };
  if (opts.tickStep) {
    customTickValues = generateNumericTicks(scaleType as AxisScaleType, opts.tickStep, opts.tick0, [
      0,
      (opts.unit === 'radians' ? 2 * Math.PI : 360) - EPSILON,
    ])?.map(v => (opts.unit === 'radians' ? radToDeg(v) : v));
  }
  const tickValues = customTickValues ?? d3Range(0, 360, 360 / (opts.tickCount ?? 8));

  return {
    scale: (v: number) => degToRad(normalizeAngle(v, opts.direction)),
    tickValues,
    tickLabels: tickValues.map(tickFormat),
  };
};

export const formatAngle = (
  value: string | number,
  unit: NonNullable<PolarChartProps['angularAxis']>['unit'],
): string =>
  typeof value === 'string'
    ? value
    : unit === 'radians'
    ? `${precisionRound(value / 180, 6)}π`
    : `${precisionRound(value, 6)}°`;
