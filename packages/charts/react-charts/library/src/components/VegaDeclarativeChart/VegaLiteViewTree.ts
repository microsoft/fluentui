import type { VegaLiteData, VegaLiteSpec } from './VegaLiteTypes';
import { aggregateVegaValues, applyVegaTransforms, prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import { readVegaField } from './VegaLiteField';
import { parseVegaDataValues } from './VegaLiteResourceLoader';
import type { VegaDataParseOptions } from './VegaLiteResourceLoader';

/** A layered chart remains one unit; composition, not renderer selection, determines the tree. */
export type VegaViewNode =
  | { type: 'unit'; spec: VegaLiteSpec; path: string }
  | {
      type: 'concat';
      direction: 'horizontal' | 'vertical' | 'grid';
      columns?: number;
      children: VegaViewNode[];
      path: string;
      title?: string;
    };

type RecordValue = Record<string, unknown>;
type Channel = 'x' | 'y' | 'color';
type ModeOptions = VegaDataParseOptions & { mode?: 'legacy' | 'strict'; maxViews?: number; maxDepth?: number };
type RepeatFields = Partial<Record<'row' | 'column' | 'repeat', string>>;
interface Scope {
  rows: RecordValue[];
  encoding: RecordValue;
  globals: RecordValue;
  datasets: Map<string, unknown>;
}
interface ScaleField {
  definition: RecordValue;
  unit: RecordValue;
  secondary?: RecordValue;
  rows: RecordValue[];
  channel: Channel;
  /** Captured before any inferred/shared domain is written onto the definition. */
  explicit: boolean;
}

const channels: Channel[] = ['x', 'y', 'color'];
const compositions = ['hconcat', 'vconcat', 'concat', 'facet', 'repeat', 'spec', 'columns', 'datasets'];
const sourceSpecs = new WeakMap<VegaLiteSpec, VegaLiteSpec>();

/**
 * Read a unit's semantic provenance without preparing or modifying it. The source has inherited
 * data/encoding/config and consumed view transforms, but retains original encoding fields and operations.
 * Unrecognized specs pass through unchanged. Provenance is private, not serialized onto public view nodes.
 */
export function getVegaViewSourceSpec(spec: VegaLiteSpec): VegaLiteSpec {
  return sourceSpecs.get(spec) ?? spec;
}

/** Copy final shared domains by channel/layer location, never by a generated field alias. */
function bindSourceSpec(prepared: VegaLiteSpec, source: VegaLiteSpec, charge?: (work: number) => void): void {
  sourceSpecs.set(prepared, source);
  for (const channel of channels) {
    const domain = prepared.encoding?.[channel]?.scale?.domain;
    const definition = source.encoding?.[channel];
    if (Array.isArray(domain) && definition && definition.scale !== null) {
      definition.scale = { ...definition.scale, domain: clone(domain, charge) };
    }
  }
  prepared.layer?.forEach((layer, index) => {
    const original = source.layer?.[index];
    if (original) {
      bindSourceSpec(layer, original, charge);
    }
  });
}

function own(value: unknown, key: string): unknown {
  return value && typeof value === 'object' ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}

function record(value: unknown): RecordValue {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as RecordValue) : {};
}

function set(value: RecordValue, key: string, item: unknown): void {
  Object.defineProperty(value, key, { value: item, enumerable: true, configurable: true, writable: true });
}

function clone<T>(
  value: T,
  charge: (work: number) => void = (() => {
    let work = 0;
    return (amount: number) => {
      if ((work += amount) > 2000000) {
        throw new Error('Vega spec work limit exceeded');
      }
    };
  })(),
  ancestors = new Set<object>(),
  depth = 0,
  maxTextLength = 10000000,
  maxRows = 100000,
): T {
  charge(1 + (typeof value === 'string' ? value.length : 0));
  if (typeof value === 'string' && value.length > maxTextLength) {
    throw new Error('Vega view text limit exceeded');
  }
  if (depth > 128) {
    throw new Error('Vega spec depth exceeds 128');
  }
  if (typeof value === 'function' || typeof value === 'symbol') {
    return undefined as T;
  }
  if (value instanceof Date) {
    return new Date(Date.prototype.getTime.call(value)) as T;
  }
  if (!value || typeof value !== 'object') {
    return value;
  }
  if (ancestors.has(value)) {
    throw new Error('Cyclic Vega spec');
  }
  ancestors.add(value);
  let result: unknown;
  if (Array.isArray(value)) {
    charge(value.length);
    const copy: unknown[] = [];
    for (let index = 0; index < value.length; index++) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (descriptor && 'value' in descriptor) {
        copy.push(clone(descriptor.value, charge, ancestors, depth + 1, maxTextLength, maxRows));
      }
    }
    result = copy;
  } else {
    const copy: RecordValue = {};
    for (const key of Object.keys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (
        descriptor &&
        'value' in descriptor &&
        typeof descriptor.value !== 'function' &&
        typeof descriptor.value !== 'symbol'
      ) {
        if (key === 'values' && Array.isArray(descriptor.value) && descriptor.value.length > maxRows) {
          throw new Error('Vega view row limit exceeded');
        }
        charge(key.length);
        set(copy, key, clone(descriptor.value, charge, ancestors, depth + 1, maxTextLength, maxRows));
      }
    }
    result = copy;
  }
  ancestors.delete(value);
  return result as T;
}

function titleText(value: unknown): string | undefined {
  return typeof value === 'string'
    ? value
    : typeof own(value, 'text') === 'string'
    ? (own(value, 'text') as string)
    : undefined;
}

function valueKey(value: unknown): string {
  if (value instanceof Date) {
    return `date:${value.getTime()}`;
  }
  return `${typeof value}:${JSON.stringify(value)}`;
}

function compare(a: unknown, b: unknown): number {
  if (a === b) {
    return 0;
  }
  if (a === null || a === undefined) {
    return -1;
  }
  if (b === null || b === undefined) {
    return 1;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  // Facet fields are scalar data, never invoke object coercion hooks.
  const left = typeof a === 'object' ? valueKey(a) : String(a);
  const right = typeof b === 'object' ? valueKey(b) : String(b);
  return left < right ? -1 : left > right ? 1 : 0;
}

function definitions(spec: RecordValue, channel: Channel): ScaleField[] {
  const layers = own(spec, 'layer');
  if (Array.isArray(layers)) {
    return layers.flatMap(layer => definitions(record(layer), channel));
  }
  const encoding = own(spec, 'encoding');
  const definition = record(own(encoding, channel));
  if (typeof own(definition, 'field') !== 'string' || own(definition, 'scale') === null) {
    return [];
  }
  const secondary = channel === 'color' ? undefined : record(own(encoding, `${channel}2`));
  const rows = own(own(spec, 'data'), 'values');
  return [
    {
      definition,
      channel,
      unit: spec,
      secondary:
        secondary && (typeof own(secondary, 'field') === 'string' || own(secondary, 'datum') !== undefined)
          ? secondary
          : undefined,
      rows: Array.isArray(rows) ? (rows as RecordValue[]) : [],
      explicit: Array.isArray(own(own(definition, 'scale'), 'domain')),
    },
  ];
}

/** Extrema are independent of color/order sorting: accumulate the same valid prepared tuples, not raw rows. */
function stackExtent(field: ScaleField, charge?: (work: number) => void): number[] | undefined {
  if (field.channel === 'color' || field.secondary || own(field.definition, 'type') !== 'quantitative') {
    return undefined;
  }
  const mark = own(field.unit, 'mark');
  const markType = typeof mark === 'string' ? mark : own(mark, 'type');
  if (markType !== 'bar' && markType !== 'area') {
    return undefined;
  }
  const stack = own(field.definition, 'stack');
  const explicitStack = stack === 'zero' || stack === 'center' || stack === 'normalize';
  const encoding = own(field.unit, 'encoding');
  const colorField = own(own(encoding, 'color'), 'field');
  const opposite = own(encoding, field.channel === 'x' ? 'y' : 'x');
  if (!explicitStack) {
    if (
      stack !== undefined ||
      typeof colorField !== 'string' ||
      own(encoding, 'xOffset') !== undefined ||
      own(encoding, 'yOffset') !== undefined ||
      ['zero', 'center', 'normalize'].includes(own(opposite, 'stack') as string)
    ) {
      return undefined;
    }
    // With two numeric positions, the mark orientation selects the value axis (vertical by default).
    if (
      own(opposite, 'type') === 'quantitative' &&
      field.channel !== (own(mark, 'orient') === 'horizontal' ? 'x' : 'y')
    ) {
      return undefined;
    }
  }
  const groupField = own(opposite, 'field');
  const groupType = own(opposite, 'type');
  const valueField = own(field.definition, 'field') as string;
  charge?.(
    field.rows.length *
      (valueField.length +
        (typeof groupField === 'string' ? groupField.length : 0) +
        (typeof colorField === 'string' ? colorField.length : 0) +
        1),
  );
  const scalar = (value: unknown): boolean =>
    typeof value === 'string' || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value));
  const numeric = (value: unknown): number =>
    typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN;
  const groups = new Map<string, { positive: number; negative: number; absolute: number }>();
  for (const row of field.rows) {
    let group = typeof groupField === 'string' ? readVegaField(row, groupField) : '';
    if (groupType === 'temporal') {
      const date = temporalDate(group, own(own(opposite, 'scale'), 'type') === 'utc');
      group = date ? Date.prototype.getTime.call(date) : undefined;
    } else if (groupType === 'quantitative') {
      group = numeric(group);
    }
    if (!scalar(group) || (typeof colorField === 'string' && !scalar(readVegaField(row, colorField)))) {
      continue;
    }
    const value = numeric(readVegaField(row, valueField));
    if (!Number.isFinite(value)) {
      continue;
    }
    const key = valueKey(group);
    let totals = groups.get(key);
    if (!totals) {
      totals = { positive: 0, negative: 0, absolute: 0 };
      groups.set(key, totals);
    }
    totals.positive += Math.max(0, value);
    totals.negative += Math.min(0, value);
    totals.absolute += Math.abs(value);
  }
  let minimum = 0;
  let maximum = 0;
  let valid = false;
  for (const totals of groups.values()) {
    if (![totals.positive, totals.negative, totals.absolute].every(Number.isFinite)) {
      continue;
    }
    valid = true;
    if (stack === 'center') {
      maximum = Math.max(maximum, totals.absolute);
    } else if (stack === 'normalize') {
      minimum = totals.negative < 0 ? -1 : minimum;
      maximum = totals.positive > 0 ? 1 : maximum;
    } else {
      minimum = Math.min(minimum, totals.negative);
      maximum = Math.max(maximum, totals.positive);
    }
  }
  // Vega center starts each group at (maximum absolute total - own total) / 2, not -own total / 2.
  return valid ? [minimum, maximum] : [];
}

function domainValues(field: ScaleField, charge?: (work: number) => void): unknown[] {
  const explicit = own(own(field.definition, 'scale'), 'domain');
  if (field.explicit && Array.isArray(explicit)) {
    charge?.(explicit.length);
    return explicit;
  }
  const stacked = stackExtent(field, charge);
  if (stacked !== undefined) {
    return stacked;
  }
  const name = own(field.definition, 'field') as string;
  const secondaryName = own(field.secondary, 'field');
  const datum = own(field.secondary, 'datum');
  charge?.(field.rows.length * (name.length + (typeof secondaryName === 'string' ? secondaryName.length : 0) + 1));
  const values = field.rows.flatMap(row => {
    const primary = readVegaField(row, name);
    return typeof secondaryName === 'string' ? [primary, readVegaField(row, secondaryName)] : [primary];
  });
  if (datum !== undefined) {
    values.push(datum);
  }
  return values.filter(value => value !== null && value !== undefined);
}

/** Vega datetime objects are declarations, never objects to coerce through valueOf/toString. */
function temporalDate(value: unknown, utc: boolean): Date | undefined {
  if (value instanceof Date) {
    const time = Date.prototype.getTime.call(value);
    return Number.isFinite(time) ? new Date(time) : undefined;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? date : undefined;
  }
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const parts = ['year', 'quarter', 'month', 'date', 'day', 'hours', 'minutes', 'seconds', 'milliseconds'];
  if (!parts.some(part => own(value, part) !== undefined)) {
    return undefined;
  }
  const month = own(value, 'month');
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  const monthIndex =
    typeof month === 'string'
      ? months.findIndex(name => name === month.toLowerCase() || name.slice(0, 3) === month.toLowerCase())
      : typeof month === 'number'
      ? month - 1
      : undefined;
  if (month !== undefined && (monthIndex === undefined || monthIndex < 0 || monthIndex > 11)) {
    return undefined;
  }
  const partNumber = (part: string, fallback: number): number => {
    const item = own(value, part);
    return item === undefined ? fallback : typeof item === 'number' && Number.isFinite(item) ? item : NaN;
  };
  const day = own(value, 'day');
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weekday =
    typeof day === 'string'
      ? days.findIndex(name => name === day.toLowerCase() || name.slice(0, 3) === day.toLowerCase())
      : day;
  if (day !== undefined && (typeof weekday !== 'number' || weekday < 0 || weekday > 6)) {
    return undefined;
  }
  const date = new Date(0);
  const year = partNumber('year', day !== undefined ? 2006 : 2012);
  const monthValue = monthIndex ?? (partNumber('quarter', 1) - 1) * 3;
  const dateValue = partNumber('date', typeof weekday === 'number' ? weekday + 1 : 1);
  if (utc || own(value, 'utc') === true) {
    date.setUTCFullYear(year, monthValue, dateValue);
    date.setUTCHours(
      partNumber('hours', 0),
      partNumber('minutes', 0),
      partNumber('seconds', 0),
      partNumber('milliseconds', 0),
    );
  } else {
    date.setFullYear(year, monthValue, dateValue);
    date.setHours(
      partNumber('hours', 0),
      partNumber('minutes', 0),
      partNumber('seconds', 0),
      partNumber('milliseconds', 0),
    );
  }
  return Number.isFinite(date.getTime()) ? date : undefined;
}

function shareDomain(fields: ScaleField[], charge?: (work: number) => void): void {
  if (!fields.length) {
    return;
  }
  const numeric = fields.every(field => own(field.definition, 'type') === 'quantitative');
  const temporal = fields.every(field => own(field.definition, 'type') === 'temporal');
  const categorical = fields.every(field => ['nominal', 'ordinal'].includes(own(field.definition, 'type') as string));
  if (!numeric && !temporal && !categorical) {
    return;
  }
  charge?.(fields.length);
  let domain: unknown[];
  if (numeric) {
    const values = fields
      .flatMap(field => domainValues(field, charge))
      .filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
    if (!values.length) {
      return;
    }
    let min = values.reduce((a, b) => Math.min(a, b), Infinity);
    let max = values.reduce((a, b) => Math.max(a, b), -Infinity);
    if (
      fields.some(field => {
        const scale = own(field.definition, 'scale');
        const type = own(scale, 'type');
        return (
          field.channel !== 'color' &&
          own(scale, 'zero') !== false &&
          type !== 'log' &&
          type !== 'time' &&
          type !== 'utc' &&
          !field.explicit
        );
      })
    ) {
      min = Math.min(0, min);
      max = Math.max(0, max);
    }
    domain = [min, max];
  } else if (temporal) {
    const dates = fields
      .flatMap(field =>
        domainValues(field, charge).map(value =>
          temporalDate(value, own(own(field.definition, 'scale'), 'type') === 'utc'),
        ),
      )
      .filter((date): date is Date => date !== undefined);
    if (!dates.length) {
      return;
    }
    const times = dates.map(date => Date.prototype.getTime.call(date));
    domain = [
      new Date(times.reduce((a, b) => Math.min(a, b), Infinity)),
      new Date(times.reduce((a, b) => Math.max(a, b), -Infinity)),
    ];
  } else {
    const distinct = new Map<string, unknown>();
    fields
      .flatMap(field => domainValues(field, charge))
      .filter(
        value =>
          typeof value === 'string' ||
          typeof value === 'boolean' ||
          (typeof value === 'number' && Number.isFinite(value)),
      )
      .forEach(value => distinct.set(valueKey(value), value));
    domain = Array.from(distinct.values());
    if (!fields.some(field => field.explicit)) {
      domain.sort(compare);
    }
    if (!domain.length) {
      return;
    }
  }
  fields.forEach(field =>
    set(field.definition, 'scale', { ...record(own(field.definition, 'scale')), domain: clone(domain, charge) }),
  );
}

/** Normalize shared/independent layer domains locally before exposing the layer to a parent composition. */
function layerFields(spec: RecordValue, channel: Channel, charge?: (work: number) => void): ScaleField[] {
  const layers = own(spec, 'layer');
  if (!Array.isArray(layers)) {
    const fields = definitions(spec, channel);
    fields.forEach(field => shareDomain([field], charge));
    return fields;
  }
  const fields = layers.flatMap(layer => layerFields(record(layer), channel, charge));
  if (own(own(own(spec, 'resolve'), 'scale'), channel) === 'independent') {
    return [];
  }
  shareDomain(fields, charge);
  return fields;
}

/**
 * Expand composition before semantic unit preparation. Parent transforms are materialized once, not copied
 * into every child pipeline. prepareVegaLiteSpec is called ONLY for units/layers: it must never call this
 * builder (no data-preparation/view-expansion cycle). Paths are stable renderer/scale/interaction namespaces.
 * Facet headers are represented in each cell's spec.title because the public node contract has no header slot.
 */
export function buildVegaViewTree(spec: VegaLiteSpec, options: ModeOptions = {}): VegaViewNode {
  const maxViews = options.maxViews ?? 10000;
  const maxDepth = options.maxDepth ?? 64;
  const maxRows = options.maxRows ?? 100000;
  const maxTextLength = options.maxTextLength ?? 10000000;
  let remaining = options.maxWork ?? 2000000;
  if (
    [maxViews, maxDepth, maxRows, maxTextLength, remaining].some(limit => !Number.isSafeInteger(limit) || limit < 0)
  ) {
    throw new Error('Invalid Vega view budget limit');
  }
  const spend = (work: number): void => {
    if (!Number.isSafeInteger(work) || work < 0 || (remaining -= work) < 0) {
      throw new Error('Vega view work limit exceeded');
    }
  };
  const copy = <T>(value: T): T => clone(value, spend, new Set(), 0, maxTextLength, maxRows);
  const checkRows = (length: number): void => {
    if (length > maxRows) {
      throw new Error('Vega view row limit exceeded');
    }
  };
  const input = record(copy(spec));
  let viewCount = 0;
  const exposed = new WeakMap<VegaViewNode, Partial<Record<Channel, ScaleField[]>>>();
  const sources: Array<{ prepared: VegaLiteSpec; source: VegaLiteSpec }> = [];

  const parseData = (data: VegaLiteData): RecordValue[] => {
    const rows = parseVegaDataValues(data, { maxRows, maxTextLength, maxWork: remaining });
    return copy(rows);
  };
  const readData = (
    value: unknown,
    inherited: RecordValue[],
    datasets: Map<string, unknown>,
    names = new Set<string>(),
  ): RecordValue[] => {
    if (value === undefined) {
      checkRows(inherited.length);
      return copy(inherited);
    }
    const values = own(value, 'values');
    if (values !== undefined) {
      return parseData(value as VegaLiteData);
    }
    const name = own(value, 'name');
    if (typeof name === 'string' && datasets.has(name)) {
      if (names.has(name)) {
        throw new Error(`Cyclic Vega dataset: ${name}`);
      }
      if (names.size > maxDepth) {
        throw new Error('Vega dataset depth limit exceeded');
      }
      const next = new Set(names).add(name);
      const named = datasets.get(name);
      const rows = readData(Array.isArray(named) ? { values: named } : named, [], datasets, next);
      const format = own(value, 'format');
      return format === undefined ? rows : parseData({ values: rows, format: format as VegaLiteData['format'] });
    }
    if (options.mode === 'strict') {
      throw new Error(
        typeof name === 'string'
          ? `Unresolved Vega dataset: ${name}`
          : 'Unresolved Vega data; resolve data.url before view expansion',
      );
    }
    return [];
  };

  const inherit = (view: RecordValue, parent: Scope): Scope => {
    const datasets = new Map(parent.datasets);
    const localDatasets = record(own(view, 'datasets'));
    Object.keys(localDatasets).forEach(name => datasets.set(name, own(localDatasets, name)));
    let rows = readData(own(view, 'data'), parent.rows, datasets);
    const transforms = own(view, 'transform');
    if (Array.isArray(transforms)) {
      const resolvedTransforms = copy(transforms) as RecordValue[];
      resolvedTransforms.forEach(transform => {
        const from = record(own(transform, 'from'));
        if (own(transform, 'lookup') !== undefined && own(from, 'data') !== undefined) {
          set(from, 'data', { values: readData(own(from, 'data'), [], datasets) });
        }
      });
      // Preflight Cartesian transforms before the semantic kernel allocates their output. Its own
      // operation budget remains an additional bound for sorting, windows and statistics.
      let projected = rows.length;
      resolvedTransforms.forEach(transform => {
        const fold = own(transform, 'fold');
        const flatten = own(transform, 'flatten');
        const fromRows = own(own(own(transform, 'from'), 'data'), 'values');
        spend(projected * (1 + JSON.stringify(transform).length + (Array.isArray(fromRows) ? fromRows.length : 0)));
        if (Array.isArray(fold)) {
          projected *= fold.length;
        }
        if (Array.isArray(flatten)) {
          projected = rows.reduce(
            (total, row) =>
              total +
              Math.max(
                0,
                ...flatten.map(field => {
                  const items = typeof field === 'string' ? readVegaField(row, field) : undefined;
                  return Array.isArray(items) ? items.length : 0;
                }),
              ),
            0,
          );
        }
        checkRows(projected);
      });
      rows = applyVegaTransforms(rows, resolvedTransforms, options);
      checkRows(rows.length);
      spend(rows.length);
    }
    const mergeConfig = (defaults: unknown, local: unknown): unknown => {
      if (!local || typeof local !== 'object' || Array.isArray(local) || local instanceof Date) {
        return copy(local);
      }
      const merged = record(copy(defaults));
      Object.keys(local).forEach(key => set(merged, key, mergeConfig(own(merged, key), own(local, key))));
      return merged;
    };
    const globals = copy(parent.globals);
    for (const property of [
      '$schema',
      'description',
      'width',
      'height',
      'background',
      'padding',
      'autosize',
      'config',
      'params',
    ]) {
      const value = own(view, property);
      if (value !== undefined) {
        set(globals, property, property === 'config' ? mergeConfig(own(globals, property), value) : copy(value));
      }
    }
    return {
      rows,
      encoding: { ...copy(parent.encoding), ...copy(record(own(view, 'encoding'))) },
      globals,
      datasets,
    };
  };

  const materializeLayer = (view: RecordValue, parent: Scope, scope?: Scope): RecordValue => {
    const current = scope ?? inherit(view, parent);
    // Inherited globals already include local overrides and merged config; do not replace that merge
    // with the unmerged child config when copying the remaining unit properties.
    const result = { ...copy(view), ...copy(current.globals) };
    compositions.forEach(property => delete result[property]);
    delete result.transform;
    set(result, 'data', { values: copy(current.rows) });
    set(result, 'encoding', copy(current.encoding));
    const layers = own(view, 'layer');
    if (Array.isArray(layers)) {
      set(
        result,
        'layer',
        layers.map(layer => materializeLayer(record(layer), current)),
      );
    }
    return result;
  };

  const concat = (
    children: VegaViewNode[],
    direction: 'horizontal' | 'vertical' | 'grid',
    path: string,
    source: RecordValue,
    defaultShared: boolean,
    columns?: number,
  ): VegaViewNode => {
    const node: VegaViewNode = { type: 'concat', direction, children, path };
    if (columns !== undefined) {
      if (!Number.isInteger(columns) || columns < 1) {
        throw new Error(`Invalid Vega columns at ${path}`);
      }
      node.columns = columns;
    }
    const title = titleText(own(source, 'title'));
    if (title !== undefined) {
      node.title = title;
    }
    const fields: Partial<Record<Channel, ScaleField[]>> = {};
    channels.forEach(channel => {
      const resolve = own(own(own(source, 'resolve'), 'scale'), channel);
      const shared = resolve === 'shared' || (resolve !== 'independent' && (defaultShared || channel === 'color'));
      const candidates = children.flatMap(child => exposed.get(child)?.[channel] ?? []);
      if (shared) {
        shareDomain(candidates, spend);
        fields[channel] = candidates;
      } else {
        fields[channel] = [];
      }
    });
    exposed.set(node, fields);
    return node;
  };

  const sortedFacetValues = (definition: RecordValue, rows: RecordValue[]): unknown[] => {
    const field = own(definition, 'field');
    if (typeof field !== 'string') {
      throw new Error('Facet definition requires a field');
    }
    const groups = new Map<string, { value: unknown; rows: RecordValue[] }>();
    rows.forEach(row => {
      const value = readVegaField(row, field);
      const identity = valueKey(value);
      if (!groups.has(identity)) {
        groups.set(identity, { value, rows: [] });
      }
      groups.get(identity)!.rows.push(row);
    });
    const values = Array.from(groups.values());
    const sort = own(definition, 'sort');
    if (sort === null) {
      return values.map(group => group.value);
    }
    if (Array.isArray(sort)) {
      const positions = new Map(sort.map((value, index) => [valueKey(value), index]));
      values.sort(
        (a, b) => (positions.get(valueKey(a.value)) ?? Infinity) - (positions.get(valueKey(b.value)) ?? Infinity),
      );
    } else if (sort && typeof sort === 'object') {
      const sortField = own(sort, 'field');
      const op = own(sort, 'op') ?? 'sum';
      const sorted = values.map(group => ({
        ...group,
        sortValue: aggregateVegaValues(
          group.rows,
          typeof sortField === 'string' ? sortField : undefined,
          op as string,
          options,
        ),
      }));
      const direction = own(sort, 'order') === 'descending' ? -1 : 1;
      sorted.sort((a, b) => direction * compare(a.sortValue, b.sortValue) || compare(a.value, b.value));
      return sorted.map(group => group.value);
    } else {
      const direction = sort === 'descending' ? -1 : 1;
      values.sort((a, b) => direction * compare(a.value, b.value));
    }
    return values.map(group => group.value);
  };

  const header = (definition: RecordValue, value: unknown): string => {
    const settings = record(own(definition, 'header'));
    if (own(settings, 'labels') === false) {
      return '';
    }
    const title =
      own(settings, 'title') === null
        ? ''
        : titleText(own(settings, 'title')) ??
          titleText(own(definition, 'title')) ??
          (own(definition, 'field') as string);
    const label =
      value === undefined
        ? '(missing)'
        : value instanceof Date
        ? value.toISOString()
        : value && typeof value === 'object'
        ? valueKey(value)
        : String(value);
    return title ? `${title}: ${label}` : label;
  };

  // Replace field references only, never similarly shaped objects inside data records.
  const repeatFields = (view: RecordValue, fields: RepeatFields): RecordValue => {
    const result = copy(view);
    const replace = (value: unknown): void => {
      if (Array.isArray(value)) {
        value.forEach(replace);
      } else if (value && typeof value === 'object') {
        const reference = own(own(value, 'field'), 'repeat');
        if (reference !== undefined) {
          const resolved = typeof reference === 'string' ? own(fields, reference) : undefined;
          if (typeof resolved !== 'string') {
            throw new Error('Unresolved Vega repeat field');
          }
          set(value as RecordValue, 'field', resolved);
        }
        Object.keys(value)
          .filter(property => property !== 'data' && property !== 'datasets')
          .forEach(property => replace(own(value, property)));
      }
    };
    replace(result);
    return result;
  };

  const visit = (view: RecordValue, parent: Scope, path: string, depth: number): VegaViewNode => {
    if (depth > maxDepth || ++viewCount > maxViews) {
      throw new Error(`Vega view depth or expansion budget exceeded at ${path}`);
    }
    const scope = inherit(view, parent);
    for (const property of ['hconcat', 'vconcat', 'concat']) {
      const children = own(view, property);
      if (Array.isArray(children)) {
        if (children.length > maxViews - viewCount) {
          throw new Error(`Vega expansion budget exceeded at ${path}`);
        }
        const direction = property === 'hconcat' ? 'horizontal' : property === 'vconcat' ? 'vertical' : 'grid';
        return concat(
          children.map((child, index) => visit(record(child), scope, `${path}/${property}/${index}`, depth + 1)),
          direction,
          path,
          view,
          false,
          property === 'concat' ? (own(view, 'columns') as number | undefined) : undefined,
        );
      }
    }
    const facet = own(view, 'facet');
    if (facet !== undefined) {
      const definition = record(facet);
      const row = record(own(definition, 'row'));
      const column = record(own(definition, 'column'));
      const shorthand = typeof own(definition, 'field') === 'string';
      const rows = own(row, 'field') ? sortedFacetValues(row, scope.rows) : [undefined];
      const columnDefinition = shorthand ? definition : column;
      const columns = own(columnDefinition, 'field') ? sortedFacetValues(columnDefinition, scope.rows) : [undefined];
      if (!own(row, 'field') && !own(columnDefinition, 'field')) {
        throw new Error(`Invalid Vega facet at ${path}`);
      }
      const childSpec = record(own(view, 'spec'));
      const children: VegaViewNode[] = [];
      if (rows.length * columns.length > maxViews - viewCount) {
        throw new Error(`Vega expansion budget exceeded at ${path}`);
      }
      spend(rows.length * columns.length * (scope.rows.length + 1));
      rows.forEach((rowValue, rowIndex) =>
        columns.forEach((columnValue, columnIndex) => {
          const data = scope.rows.filter(
            item =>
              (!own(row, 'field') ||
                valueKey(readVegaField(item, own(row, 'field') as string)) === valueKey(rowValue)) &&
              (!own(columnDefinition, 'field') ||
                valueKey(readVegaField(item, own(columnDefinition, 'field') as string)) === valueKey(columnValue)),
          );
          const labels = [
            own(row, 'field') ? header(row, rowValue) : '',
            own(columnDefinition, 'field') ? header(columnDefinition, columnValue) : '',
            titleText(own(childSpec, 'title')) ?? '',
          ].filter(Boolean);
          const cell = copy(childSpec);
          if (labels.length) {
            set(cell, 'title', labels.join(' · '));
          }
          children.push(visit(cell, { ...scope, rows: data }, `${path}/facet/${rowIndex}/${columnIndex}`, depth + 1));
        }),
      );
      return concat(
        children,
        'grid',
        path,
        view,
        true,
        shorthand ? (own(view, 'columns') as number | undefined) : own(column, 'field') ? columns.length || 1 : 1,
      );
    }
    const repeat = own(view, 'repeat');
    if (repeat !== undefined) {
      const matrix = record(repeat);
      const row = own(matrix, 'row');
      const column = own(matrix, 'column');
      const array = Array.isArray(repeat) ? repeat : own(matrix, 'repeat');
      const rowFields = Array.isArray(row) ? row : [undefined];
      const columnFields = Array.isArray(array) ? array : Array.isArray(column) ? column : [undefined];
      if (
        ![...rowFields, ...columnFields].every(field => field === undefined || typeof field === 'string') ||
        (!Array.isArray(array) && !Array.isArray(row) && !Array.isArray(column))
      ) {
        throw new Error(`Invalid Vega repeat at ${path}`);
      }
      const children: VegaViewNode[] = [];
      if (rowFields.length * columnFields.length > maxViews - viewCount) {
        throw new Error(`Vega expansion budget exceeded at ${path}`);
      }
      spend(rowFields.length * columnFields.length * (scope.rows.length + 1));
      rowFields.forEach((rowField, rowIndex) =>
        columnFields.forEach((columnField, columnIndex) => {
          const fields: RepeatFields = {
            row: rowField as string | undefined,
            column: Array.isArray(array) ? undefined : (columnField as string | undefined),
            repeat: Array.isArray(array) ? (columnField as string | undefined) : undefined,
          };
          const child = repeatFields(record(own(view, 'spec')), fields);
          children.push(visit(child, scope, `${path}/repeat/${rowIndex}/${columnIndex}`, depth + 1));
        }),
      );
      return concat(
        children,
        'grid',
        path,
        view,
        false,
        (own(view, 'columns') as number | undefined) ?? (Array.isArray(column) ? columnFields.length || 1 : undefined),
      );
    }
    const unit = materializeLayer(view, parent, scope);
    // The transforms above are gone; preparation evaluates only derived fields/encoding aggregates/layers.
    const prepared = prepareVegaLiteSpec(unit as VegaLiteSpec, options);
    sources.push({ prepared, source: unit as VegaLiteSpec });
    const node: VegaViewNode = { type: 'unit', spec: prepared, path };
    const fields: Partial<Record<Channel, ScaleField[]>> = {};
    channels.forEach(channel => {
      fields[channel] = layerFields(record(prepared), channel, spend);
    });
    exposed.set(node, fields);
    return node;
  };

  const tree = visit(input, { rows: [], encoding: {}, globals: {}, datasets: new Map() }, 'root', 0);
  // Ancestors may widen domains after visiting a unit. Bind only after every scale scope is resolved.
  sources.forEach(({ prepared, source }) => bindSourceSpec(prepared, source, spend));
  return tree;
}
