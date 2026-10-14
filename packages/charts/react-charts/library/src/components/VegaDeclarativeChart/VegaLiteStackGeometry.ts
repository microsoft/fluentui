import { readVegaField } from './VegaLiteField';

type Row = Record<string, unknown>;
export type VegaCenterStackSegment = { row: Row; index: number; start: number; end: number };
export type VegaCenterStackOptions = {
  groupField: string;
  valueField: string;
  seriesField: string;
  /** Vega-Lite defaults to descending series for vertical stacks, ascending for horizontal stacks. */
  sort: { field: string; descending: boolean }[];
};

const scalar = (value: unknown): string | number | boolean | undefined => {
  if (value instanceof Date) {
    const time = Date.prototype.getTime.call(value);
    return Number.isFinite(time) ? time : undefined;
  }
  return typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
    ? value
    : undefined;
};
const numericValue = (value: unknown): number =>
  typeof value === 'number' || (typeof value === 'string' && value.trim()) ? Number(value) : NaN;
const compare = (a: unknown, b: unknown): number => {
  const left = scalar(a);
  const right = scalar(b);
  if (left === right) {
    return 0;
  }
  if (left === undefined) {
    return -1;
  }
  if (right === undefined) {
    return 1;
  }
  return left < right ? -1 : left > right ? 1 : 0;
};

/**
 * Vega 5 stackCenter, not D3 stackOffsetSilhouette: each segment uses abs(value), and
 * each group starts at (maximum group total - group total) / 2. Negative values are
 * NOT diverged in center mode. Rows are already aggregated by the engine; never sum
 * duplicate series into new rows or write synthetic fields onto source records.
 */
export function getVegaCenterStack(rows: readonly Row[], options: VegaCenterStackOptions): VegaCenterStackSegment[] {
  const groups = new Map<string, { total: number; segments: (VegaCenterStackSegment & { value: number })[] }>();
  rows.forEach((row, index) => {
    const category = scalar(readVegaField(row, options.groupField));
    const series = scalar(readVegaField(row, options.seriesField));
    const value = numericValue(readVegaField(row, options.valueField));
    if (category === undefined || series === undefined || !Number.isFinite(value)) {
      return;
    }
    const key = `${typeof category}:${category}`;
    let group = groups.get(key);
    if (!group) {
      group = { total: 0, segments: [] };
      groups.set(key, group);
    }
    group.total += Math.abs(value);
    group.segments.push({ row, index, value: Math.abs(value), start: 0, end: 0 });
  });
  const valid = Array.from(groups.values()).filter(group => Number.isFinite(group.total));
  const maximum = valid.reduce((max, group) => Math.max(max, group.total), 0);
  const result: VegaCenterStackSegment[] = [];
  for (const group of valid) {
    group.segments.sort((a, b) => {
      for (const sort of options.sort) {
        const order = compare(readVegaField(a.row, sort.field), readVegaField(b.row, sort.field));
        if (order) {
          return sort.descending ? -order : order;
        }
      }
      return a.index - b.index;
    });
    let start = (maximum - group.total) / 2;
    for (const segment of group.segments) {
      const end = start + segment.value;
      result.push({ row: segment.row, index: segment.index, start, end });
      start = end;
    }
  }
  return result.sort((a, b) => a.index - b.index);
}
