import { deviation, median, quantileSorted } from 'd3-array';
import type { VegaDataRow } from './VegaLiteData.types';

type Point = [number, number];
type Group = { rows: VegaDataRow[]; keys: unknown[] };

/** Reuse the data engine's safe accessors, group keys, cloning and shared work budget. */
export interface VegaStatisticsContext {
  readField: (row: unknown, field: string) => unknown;
  groups: (rows: VegaDataRow[], groupby: string[]) => Group[];
  groupRow: (group: Group, groupby: string[]) => VegaDataRow;
  spend: (amount: number) => void;
}

const own = (row: VegaDataRow, field: string): unknown => {
  const descriptor = Object.getOwnPropertyDescriptor(row, field);
  return descriptor && 'value' in descriptor ? descriptor.value : undefined;
};
const put = (row: VegaDataRow, field: string, value: unknown): void => {
  Object.defineProperty(row, field, { value, enumerable: true, configurable: true, writable: true });
};
const invalid = (name: string): never => {
  throw new Error(`Vega semantics: invalid ${name}`);
};

/** Scalar-only coercion: never invoke data-supplied valueOf/toString functions. */
function number(value: unknown): number {
  if (value instanceof Date) {
    return Date.prototype.getTime.call(value);
  }
  if (value === null) {
    return 0;
  }
  return typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean' ? Number(value) : NaN;
}

function groupFields(transform: VegaDataRow): string[] {
  const value = own(transform, 'groupby');
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value) || value.some(v => typeof v !== 'string')) {
    return invalid('statistics groupby');
  }
  return value as string[];
}

function aliases(transform: VegaDataRow, defaults: [string, string]): [string, string] {
  const value = own(transform, 'as');
  if (value === undefined) {
    return defaults;
  }
  if (!Array.isArray(value) || value.length > 2 || value.some(v => v != null && typeof v !== 'string')) {
    return invalid('statistics as');
  }
  return [value[0] ?? defaults[0], value[1] ?? defaults[1]];
}

function bandwidthParameter(transform: VegaDataRow, loess: boolean): number {
  const value = own(transform, 'bandwidth') ?? (loess ? 0.3 : 0);
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || (loess && value > 1)) {
    return invalid('bandwidth');
  }
  return loess ? value || 0.3 : value;
}

/** Vega v6.4.0 regression/loess.js, points.js and ols.js numerical semantics. */
function loess(points: Point[], bandwidth: number, spend: (amount: number) => void): Point[] {
  const n = points.length;
  if (!n) {
    return [];
  }
  const neighbors = Math.max(2, Math.floor(bandwidth * n));
  spend(3 * n * neighbors + n * (Math.ceil(Math.log2(n)) + 6));
  points.sort((a, b) => a[0] - b[0]);
  // The tagged kernel's two-neighbor minimum yields NaN on a singleton.
  if (n === 1) {
    return [[points[0][0], NaN]];
  }
  let meanX = 0;
  let meanY = 0;
  points.forEach(([x, y], i) => {
    meanX += (x - meanX) / (i + 1);
    meanY += (y - meanY) / (i + 1);
  });
  const xs = points.map(p => p[0] - meanX);
  const ys = points.map(p => p[1] - meanY);
  const fitted = new Float64Array(n);
  const residuals = new Float64Array(n);
  const robust = new Float64Array(n).fill(1);
  for (let iteration = 0; iteration <= 2; iteration++) {
    let left = 0;
    let right = neighbors - 1;
    for (let i = 0; i < n; i++) {
      const x = xs[i];
      const edge = x - xs[left] > xs[right] - x ? left : right;
      const inverseDistance = 1 / Math.abs(xs[edge] - x || 1);
      let weight = 0;
      let sumX = 0;
      let sumY = 0;
      let sumXY = 0;
      let sumX2 = 0;
      for (let k = left; k <= right; k++) {
        const distance = Math.abs(x - xs[k]) * inverseDistance;
        const cube = 1 - distance * distance * distance;
        const w = cube * cube * cube * robust[k];
        const xw = xs[k] * w;
        weight += w;
        sumX += xw;
        sumY += ys[k] * w;
        sumXY += ys[k] * xw;
        sumX2 += xs[k] * xw;
      }
      const ux = sumX / weight;
      const uy = sumY / weight;
      const delta = sumX2 / weight - ux * ux;
      const slope = Math.abs(delta) < 1e-24 ? 0 : (sumXY / weight - ux * uy) / delta;
      fitted[i] = uy - slope * ux + slope * x;
      residuals[i] = Math.abs(ys[i] - fitted[i]);
      // Equal distances must advance the interval to move across repeated x values.
      const next = i + 1;
      while (right + 1 < n && next > left && xs[right + 1] - xs[next] <= xs[next] - xs[left]) {
        left++;
        right++;
      }
    }
    if (iteration === 2) {
      break;
    }
    const medianResidual = median(residuals)!;
    if (Math.abs(medianResidual) < 1e-12) {
      break;
    }
    for (let i = 0; i < n; i++) {
      const ratio = residuals[i] / (6 * medianResidual);
      const w = 1 - ratio * ratio;
      // Upstream keeps outliers tiny but nonzero to avoid singular local fits.
      robust[i] = ratio >= 1 ? 1e-12 : w * w;
    }
  }
  const result: Point[] = [];
  let previous: Point | undefined;
  let duplicates = 0;
  for (let i = 0; i < n; i++) {
    const x = xs[i] + meanX;
    if (previous && previous[0] === x) {
      // Preserve the tagged output kernel's repeated-x online update order.
      previous[1] += (fitted[i] - previous[1]) / ++duplicates;
    } else {
      if (previous) {
        previous[1] += meanY;
      }
      duplicates = 0;
      previous = [x, fitted[i]];
      result.push(previous);
    }
  }
  if (previous) {
    previous[1] += meanY;
  }
  return result;
}

export function loessVegaRows(rows: VegaDataRow[], transform: VegaDataRow, ctx: VegaStatisticsContext): VegaDataRow[] {
  const x = own(transform, 'on');
  const y = own(transform, 'loess');
  if (typeof x !== 'string' || !x || typeof y !== 'string' || !y) {
    throw new Error('Vega semantics: loess requires fields');
  }
  const bandwidth = bandwidthParameter(transform, true);
  const groupby = groupFields(transform);
  const as = aliases(transform, [x, y]);
  const out: VegaDataRow[] = [];
  for (const group of ctx.groups(rows, groupby)) {
    const points: Point[] = [];
    ctx.spend(group.rows.length * (x.length + y.length + 2));
    for (const row of group.rows) {
      const u = ctx.readField(row, x);
      const v = ctx.readField(row, y);
      const nx = number(u);
      const ny = number(v);
      // Unlike scalar aggregates, upstream regression points accept empty strings.
      if (u != null && v != null && !Number.isNaN(nx) && !Number.isNaN(ny)) {
        points.push([nx, ny]);
      }
    }
    for (const [u, v] of loess(points, bandwidth, ctx.spend)) {
      const row = ctx.groupRow(group, groupby);
      put(row, as[0], u);
      put(row, as[1], v);
      out.push(row);
    }
  }
  return out;
}

/** Vega bandwidth.js: 1.06 * min(sample stdev, IQR/1.34), with upstream fallbacks. */
function estimateBandwidth(values: unknown[]): number {
  const sorted = values
    .filter(v => v != null && v !== '')
    .map(number)
    .filter(v => !Number.isNaN(v))
    .sort((a, b) => a - b);
  const q1 = quantileSorted(sorted, 0.25);
  const q3 = quantileSorted(sorted, 0.75);
  // d3 deviation excludes null, but includes the empty string as zero.
  const d = deviation(values, v => (v == null ? NaN : number(v)));
  const h = ((q3 as number) - (q1 as number)) / 1.34;
  const scale = Math.min(d as number, h) || d || Math.abs(q1 as number) || 1;
  return 1.06 * scale * Math.pow(values.length, -0.2);
}

/** West normal-CDF approximation, using the exact Vega v6.4.0 coefficients and branches. */
function cumulativeNormal(z: number): number {
  const a = Math.abs(z);
  if (a > 37) {
    return z > 0 ? 1 : 0;
  }
  const exponential = Math.exp((-a * a) / 2);
  let tail: number;
  if (a < 7.07106781186547) {
    const numerator = [
      0.0352624965998911, 0.700383064443688, 6.37396220353165, 33.912866078383, 112.079291497871, 221.213596169931,
      220.206867912376,
    ].reduce((sum, coefficient) => sum * a + coefficient);
    const denominator = [
      0.0883883476483184, 1.75566716318264, 16.064177579207, 86.7807322029461, 296.564248779674, 637.333633378831,
      793.826512519948, 440.413735824752,
    ].reduce((sum, coefficient) => sum * a + coefficient);
    tail = (exponential * numerator) / denominator;
  } else {
    let sum = a + 0.65;
    for (let k = 4; k >= 1; k--) {
      sum = a + k / sum;
    }
    tail = exponential / sum / 2.506628274631;
  }
  return z > 0 ? 1 - tail : tail;
}

/** sampleCurve.js: endpoint-inclusive uniform sampling or normalized 0.5-degree refinement. */
function sampleCurve(f: (x: number) => number, extent: Point, minsteps: number, maxsteps: number): Point[] {
  maxsteps = Math.max(minsteps, maxsteps);
  const span = extent[1] - extent[0];
  const point = (x: number): Point => [x, f(x)];
  const out: Point[] = [point(extent[0])];
  if (minsteps === maxsteps) {
    for (let i = 1; i < maxsteps; i++) {
      out.push(point(extent[0] + (i / minsteps) * span));
    }
    out.push(point(extent[1]));
    return out;
  }
  const stack: Point[] = [point(extent[1])];
  for (let i = minsteps - 1; i > 0; i--) {
    stack.push(point(extent[0] + (i / minsteps) * span));
  }
  let lo = out[0];
  let ymin = lo[1];
  let ymax = lo[1];
  stack.forEach(p => {
    if (p[1] < ymin) {
      ymin = p[1];
    }
    if (p[1] > ymax) {
      ymax = p[1];
    }
  });
  const sx = 1 / span;
  const sy = 1 / (ymax - ymin);
  while (stack.length) {
    const hi = stack[stack.length - 1];
    const mid = point((lo[0] + hi[0]) / 2);
    const angle = Math.abs(
      Math.atan2(sy * (hi[1] - lo[1]), sx * (hi[0] - lo[0])) - Math.atan2(sy * (mid[1] - lo[1]), sx * (mid[0] - lo[0])),
    );
    if (mid[0] > lo[0] && mid[0] < hi[0] && mid[0] - lo[0] >= span / maxsteps && angle > (0.5 * Math.PI) / 180) {
      stack.push(mid);
    } else {
      out.push(hi);
      lo = hi;
      stack.pop();
    }
  }
  return out;
}

function stepsParameter(transform: VegaDataRow, key: string, fallback: number): number {
  const value = own(transform, key);
  if (value === undefined || value === 0) {
    return fallback;
  }
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    return invalid(`density ${key}`);
  }
  if (value > 10000) {
    throw new Error('Vega semantics: density steps work limit exceeded');
  }
  return value;
}

export function densityVegaRows(
  rows: VegaDataRow[],
  transform: VegaDataRow,
  ctx: VegaStatisticsContext,
): VegaDataRow[] {
  const field = own(transform, 'density');
  if (typeof field !== 'string' || !field) {
    throw new Error('Vega semantics: density requires a field');
  }
  const bandwidth = bandwidthParameter(transform, false);
  const groupby = groupFields(transform);
  const as = aliases(transform, ['value', 'density']);
  const resolve = own(transform, 'resolve') ?? 'shared';
  if (resolve !== 'shared' && resolve !== 'independent') {
    return invalid('density resolve');
  }
  const cumulative = own(transform, 'cumulative') ?? false;
  const counts = own(transform, 'counts') ?? false;
  if (typeof cumulative !== 'boolean' || typeof counts !== 'boolean') {
    return invalid('density counts/cumulative');
  }
  const steps = stepsParameter(transform, 'steps', 0);
  let minsteps = steps || stepsParameter(transform, 'minsteps', 25);
  let maxsteps = steps || stepsParameter(transform, 'maxsteps', 200);
  if (resolve === 'shared') {
    minsteps = maxsteps;
  }
  const requested = own(transform, 'extent');
  if (
    requested !== undefined &&
    (!Array.isArray(requested) ||
      requested.length !== 2 ||
      requested.some(v => typeof v !== 'number' || !Number.isFinite(v)) ||
      requested[0] > requested[1])
  ) {
    return invalid('density extent');
  }
  const domain = (values: unknown[]): Point | undefined => {
    let lo: number | undefined;
    let hi: number | undefined;
    for (const value of values) {
      if (value == null) {
        continue;
      }
      const n = number(value);
      if (!Number.isNaN(n)) {
        lo = lo === undefined ? n : Math.min(lo, n);
        hi = hi === undefined ? n : Math.max(hi, n);
      }
    }
    return lo === undefined ? undefined : [lo, hi!];
  };
  ctx.spend(rows.length * (field.length + 1));
  const shared =
    (requested as Point | undefined) ??
    (resolve === 'shared' ? domain(rows.map(row => ctx.readField(row, field))) : undefined);
  const out: VegaDataRow[] = [];
  for (const group of ctx.groups(rows, groupby)) {
    if (!group.rows.length) {
      continue;
    }
    const values = group.rows.map(row => ctx.readField(row, field));
    const extent = shared ?? domain(values);
    if (!extent) {
      continue;
    }
    if (!extent.every(Number.isFinite) || !Number.isFinite(extent[1] - extent[0])) {
      return invalid('density data extent');
    }
    const n = values.length;
    const h = bandwidth || estimateBandwidth(values);
    const support = values.map(number);
    ctx.spend(n * (Math.ceil(Math.log2(n)) + 4));
    const density = (x: number): number => {
      ctx.spend(n + 1);
      let sum = 0;
      for (const v of support) {
        const z = (x - v) / h;
        sum += cumulative ? cumulativeNormal(z) : Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
      }
      return cumulative ? sum / n : sum / h / n;
    };
    for (const [x, y] of sampleCurve(density, extent, minsteps, maxsteps)) {
      const row = ctx.groupRow(group, groupby);
      put(row, as[0], x);
      put(row, as[1], y * (counts ? n : 1));
      out.push(row);
    }
  }
  return out;
}

/** Scalar AggregateOps use raw validity counts even when a valid string coerces to NaN. */
export function aggregateVegaStatistic(values: unknown[], name: string, retention?: number): number | undefined {
  const good = values.filter(v => v != null && v !== '' && !(typeof v === 'number' && Number.isNaN(v)));
  const n = good.length;
  if (!n) {
    return undefined;
  }
  if (name === 'sum') {
    return good.reduce<number>((sum, v) => sum + number(v), 0);
  }
  if (name === 'product') {
    return good.reduce<number>((product, v) => product * number(v), 1);
  }
  if (name === 'exponential' || name === 'exponentialb') {
    let weighted: number | string = 0;
    for (const v of good) {
      const previous: number = retention! * Number(weighted);
      weighted =
        typeof v === 'string'
          ? `${previous}${v}`
          : v instanceof Date
          ? `${previous}${Date.prototype.toString.call(v)}`
          : previous + number(v);
    }
    const result = Number(weighted) * (1 - retention!);
    return name === 'exponential' ? result / (1 - retention! ** n) : result;
  }
  let mean = 0;
  let dev = 0;
  good.forEach((v, i) => {
    const value = number(v);
    const delta = value - mean;
    mean += delta / (i + 1);
    dev += delta * (value - mean);
  });
  if (name === 'mean' || name === 'average') {
    return mean;
  }
  const population = name.endsWith('p');
  if (!population && n < 2) {
    return undefined;
  }
  const variance = Math.max(0, dev) / (population ? n : n - 1);
  return name.startsWith('stdev') ? Math.sqrt(variance) : name === 'stderr' ? Math.sqrt(variance / n) : variance;
}
