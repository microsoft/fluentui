import {
  scaleBand as d3ScaleBand,
  scaleLinear as d3ScaleLinear,
  scaleLog as d3ScaleLog,
  scaleTime as d3ScaleTime,
  scaleUtc as d3ScaleUtc,
  ScaleContinuousNumeric,
  ScaleTime,
} from 'd3-scale';
import { extent as d3Extent } from 'd3-array';
import { AxisScaleType } from '../../types/DataPoint';

export const createScale = (
  scaleType: string,
  domain: (string | number | Date)[],
  range: number[],
  opts: {
    useUTC?: boolean;
    niceBounds?: boolean;
    innerPadding?: number;
  } = {},
) => {
  if (scaleType === 'category') {
    return d3ScaleBand()
      .domain(domain as string[])
      .range(range)
      .paddingInner(opts.innerPadding || 0);
  }

  let scale: ScaleContinuousNumeric<number, number, undefined> | ScaleTime<number, number>;
  switch (scaleType) {
    case 'log':
      scale = d3ScaleLog();
      break;
    case 'date':
      scale = opts.useUTC ? d3ScaleUtc() : d3ScaleTime();
      break;
    default:
      scale = d3ScaleLinear();
  }

  scale.domain(domain as (number | Date)[]);
  scale.range(range);
  if (opts.niceBounds) {
    scale.nice();
  }

  return scale;
};

export const getScaleType = (
  values: (string | number | Date)[],
  opts: {
    scaleType?: AxisScaleType;
    supportsLog?: boolean;
  } = {},
) => {
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

export const getDomain = (scaleType: string, values: (string | number | Date)[], opts: {} = {}) => {
  if (scaleType === 'category') {
    return Array.from(new Set(values));
  }

  const extent = d3Extent(values as (number | Date)[]);
  if (typeof extent[0] !== 'undefined' && typeof extent[1] !== 'undefined') {
    return extent;
  }
  return [];
};
