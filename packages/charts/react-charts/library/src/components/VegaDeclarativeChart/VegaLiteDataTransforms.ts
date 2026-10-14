import type { VegaLiteSpec } from './VegaLiteTypes';
import { safeEvaluateExpression } from './VegaLiteExpressionEvaluator';
import { aggregateVegaStatistic, densityVegaRows, loessVegaRows } from './VegaLiteStatistics';
import { extent as dataExtent } from 'd3-array';
import type { VegaDataRow, VegaSemanticOptions } from './VegaLiteData.types';
import { readVegaField } from './VegaLiteField';

export type { VegaDataRow, VegaSemanticOptions } from './VegaLiteData.types';
export { readVegaField } from './VegaLiteField';

const WORKBUDGET = 2000000;
const workBudget = Symbol('Vega semantic work budget');
type SemanticContext = VegaSemanticOptions & { [workBudget]?: { remaining: number } };
class SemanticError extends Error {
  public readonly code: 'WORKBUDGET' | 'UNSUPPORTED' | 'INVALID';

  public constructor(message: string) {
    super(`Vega semantics: ${message}`);
    this.code = /limit|work budget/i.test(message)
      ? 'WORKBUDGET'
      : /unknown|unsupported|unresolved/i.test(message)
      ? 'UNSUPPORTED'
      : 'INVALID';
  }
}
const context = (options?: VegaSemanticOptions): SemanticContext => {
  const current = options as SemanticContext | undefined;
  return current?.[workBudget] ? current : { ...options, [workBudget]: { remaining: WORKBUDGET } };
};
const spend = (options: VegaSemanticOptions | undefined, amount: number): void => {
  const budget = (options as SemanticContext | undefined)?.[workBudget];
  if (amount > WORKBUDGET || (budget && (budget.remaining -= amount) < 0)) {
    throw new SemanticError('work budget limit exceeded');
  }
};
const record = (value: unknown): value is VegaDataRow =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const own = (value: unknown, key: string): unknown => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && 'value' in descriptor && typeof descriptor.value !== 'function' ? descriptor.value : undefined;
};
const put = (row: VegaDataRow, key: string, value: unknown): void => {
  Object.defineProperty(row, key, { value, enumerable: true, configurable: true, writable: true });
};
const text = (value: unknown): string | undefined => (typeof value === 'string' ? value : undefined);
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const fields = (value: unknown): string[] => list(value).filter((v): v is string => typeof v === 'string');
const fail = (options: VegaSemanticOptions | undefined, message: string): void => {
  const error = new SemanticError(message.replace(/^Vega semantics: /, ''));
  if (options?.mode === 'strict' || error.code === 'WORKBUDGET') {
    throw error;
  }
};

/** Descriptor-based clone: preserves Dates, cycles and own keys, never executes user code. */
function clone<T>(input: T, expression = false, options?: VegaSemanticOptions): T {
  const seen = new WeakMap<object, unknown>();
  let nodes = 0;
  let work = 0;
  const visit = (value: unknown, depth: number): unknown => {
    spend(options, 1);
    if (++work > WORKBUDGET) {
      throw new SemanticError('clone work limit exceeded');
    }
    if (typeof value === 'function' || typeof value === 'symbol') {
      return undefined;
    }
    if (!value || typeof value !== 'object') {
      return value;
    }
    if (depth > 100 || ++nodes > 100000) {
      throw new SemanticError('clone depth/work limit exceeded');
    }
    if (seen.has(value)) {
      return seen.get(value);
    }
    if (value instanceof Date) {
      return new Date(Date.prototype.getTime.call(value));
    }
    if (Array.isArray(value)) {
      spend(options, own(value, 'length') as number);
    }
    // Preserve sparse trailing slots without reading inherited indices or array getters.
    const result: VegaDataRow | unknown[] = Array.isArray(value)
      ? new Array(own(value, 'length') as number)
      : expression
      ? Object.create(null)
      : {};
    seen.set(value, result);
    for (const key of Object.keys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor && 'value' in descriptor && typeof descriptor.value !== 'function') {
        put(result as VegaDataRow, key, visit(descriptor.value, depth + 1));
      }
    }
    return result;
  };
  return visit(input, 0) as T;
}

const missing = (value: unknown): boolean => value == null || value === '';
const valid = (value: unknown): boolean => !missing(value) && !(typeof value === 'number' && Number.isNaN(value));
function numeric(value: unknown): number | undefined {
  if (!valid(value)) {
    return undefined;
  }
  const n =
    value instanceof Date
      ? Date.prototype.getTime.call(value)
      : typeof value === 'number'
      ? value
      : typeof value === 'string' || typeof value === 'boolean'
      ? Number(value)
      : NaN;
  return Number.isNaN(n) ? undefined : n;
}

function quantile(values: number[], p: number): number | undefined {
  if (!values.length) {
    return undefined;
  }
  const sorted = values.slice().sort((a, b) => a - b);
  const index = (sorted.length - 1) * p;
  const lo = Math.floor(index);
  return sorted[lo] + (sorted[Math.ceil(index)] - sorted[lo]) * (index - lo);
}

/** Own-data only operation parsing. The exponential parameter is retention, not alpha. */
function operation(op: unknown): { name: string; parameter?: number } | undefined {
  if (typeof op === 'string') {
    return { name: op };
  }
  if (record(op)) {
    const keys = Object.keys(op);
    if (keys.length === 1 && (keys[0] === 'exponential' || keys[0] === 'exponentialb')) {
      const parameter = own(op, keys[0]);
      if (typeof parameter === 'number' && Number.isFinite(parameter) && parameter >= 0 && parameter <= 1) {
        return { name: keys[0], parameter };
      }
    }
  }
  return undefined;
}

/** Shared scalar kernel for transforms, window frames and encoding aggregates. */
export function aggregateVegaValues(
  rows: VegaDataRow[],
  field: string | undefined,
  op: unknown,
  options?: VegaSemanticOptions,
): unknown {
  options = context(options);
  spend(options, rows.length * (1 + (field?.length ?? 0)));
  const parsed = operation(op);
  if (!parsed) {
    fail(options, 'invalid aggregate operation or parameter');
    return rows.length;
  }
  const { name, parameter } = parsed;
  if (options.mode === 'strict' && !['count', 'values'].includes(name) && !field) {
    throw new Error(`Vega semantics: aggregate ${name} requires field`);
  }
  const values = rows.map(row => (field === undefined ? undefined : readVegaField(row, field)));
  const good = values.filter(valid);
  const numbers = good.map(numeric).filter((v): v is number => v !== undefined);
  switch (name) {
    case 'count':
      return rows.length;
    case 'valid':
      return good.length;
    case 'missing':
      return values.filter(missing).length;
    case 'distinct':
      return new Set(
        values.map(v => {
          if (v && typeof v === 'object' && !(v instanceof Date)) {
            throw new Error('Vega semantics: distinct requires safely stringifiable scalar fields');
          }
          return v instanceof Date ? Date.prototype.toString.call(v) : String(v);
        }),
      ).size;
    case 'values':
      return clone(rows);
    case 'min':
    case 'max':
    case 'argmin':
    case 'argmax': {
      let best: unknown;
      let index = -1;
      values.forEach((value, i) => {
        if (!valid(value) || (typeof value !== 'string' && numeric(value) === undefined)) {
          return;
        }
        if (index < 0 || (name === 'min' || name === 'argmin' ? compare(value, best) < 0 : compare(value, best) > 0)) {
          best = value;
          index = i;
        }
      });
      return name.startsWith('arg') ? (index < 0 ? undefined : clone(rows[index])) : clone(best);
    }
    case 'sum':
    case 'product':
      return aggregateVegaStatistic(values, name);
    case 'median':
      return quantile(numbers, 0.5);
    case 'q1':
      return quantile(numbers, 0.25);
    case 'q3':
      return quantile(numbers, 0.75);
    case 'exponential':
    case 'exponentialb': {
      if (parameter === undefined) {
        fail(options, `aggregate ${name} requires an object parameter`);
        return rows.length;
      }
      return aggregateVegaStatistic(values, name, parameter);
    }
    case 'mean':
    case 'average':
    case 'variance':
    case 'variancep':
    case 'stdev':
    case 'stdevp':
    case 'stderr': {
      return aggregateVegaStatistic(values, name);
    }
    default:
      fail(options, `unknown aggregate operation ${name}`);
      return rows.length;
  }
}

function compare(a: unknown, b: unknown): number {
  const left = a instanceof Date ? Date.prototype.getTime.call(a) : a;
  const right = b instanceof Date ? Date.prototype.getTime.call(b) : b;
  if (Object.is(left, right) || left === right) {
    return 0;
  }
  if (!valid(left)) {
    return valid(right) ? -1 : 0;
  }
  if (!valid(right)) {
    return 1;
  }
  if (typeof left === 'string' && typeof right === 'string') {
    return left < right ? -1 : 1;
  }
  const ln = numeric(left);
  const rn = numeric(right);
  if (ln !== undefined && rn !== undefined) {
    return ln < rn ? -1 : ln > rn ? 1 : 0;
  }
  // Do not call arbitrary toString/valueOf hooks to compare object-valued data.
  return typeof left < typeof right ? -1 : typeof left > typeof right ? 1 : 0;
}

type Group = { rows: VegaDataRow[]; keys: unknown[] };
function groups(rows: VegaDataRow[], groupby: string[]): Group[] {
  const objects = new WeakMap<object, number>();
  let id = 0;
  const key = (value: unknown): string => {
    if (value instanceof Date) {
      return `date:${Date.prototype.getTime.call(value)}`;
    }
    if (value && typeof value === 'object') {
      if (!objects.has(value)) {
        objects.set(value, ++id);
      }
      return `object:${objects.get(value)}`;
    }
    return `${typeof value}:${String(value)}`;
  };
  const result: Group[] = [];
  const root = new Map<string, unknown>();
  for (const row of rows) {
    const keys = groupby.map(field => readVegaField(row, field));
    let map = root;
    for (const value of keys) {
      const k = key(value);
      if (!map.has(k)) {
        map.set(k, new Map<string, unknown>());
      }
      map = map.get(k) as Map<string, unknown>;
    }
    if (!map.has('group')) {
      const group = { rows: [], keys };
      map.set('group', group);
      result.push(group);
    }
    (map.get('group') as Group).rows.push(row);
  }
  if (!rows.length && !groupby.length) {
    result.push({ rows: [], keys: [] });
  }
  return result;
}
function groupRow(group: Group, groupby: string[]): VegaDataRow {
  const row: VegaDataRow = {};
  groupby.forEach((field, i) => put(row, field, clone(group.keys[i])));
  return row;
}

function expression(expr: string, row: VegaDataRow): unknown {
  if (expr.length > 10000) {
    throw new SemanticError('expression work limit exceeded');
  }
  let depth = 0;
  let quote = '';
  const functions = new Set([
    'isValid',
    'isDate',
    'isNumber',
    'isString',
    'isBoolean',
    'isArray',
    'isNaN',
    'isFinite',
    'abs',
    'ceil',
    'floor',
    'round',
    'sqrt',
    'log',
    'exp',
    'pow',
    'min',
    'max',
    'length',
    'toNumber',
    'toString',
    'toBoolean',
  ]);
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (quote) {
      if (c === '\\') {
        i++;
      } else if (c === quote) {
        quote = '';
      }
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (/[a-zA-Z_$]/.test(c)) {
      const start = i;
      while (i + 1 < expr.length && /[a-zA-Z0-9_$]/.test(expr[i + 1])) {
        i++;
      }
      const identifier = expr.slice(start, i + 1);
      const before = expr.slice(0, start).trimEnd();
      if (
        functions.has(identifier) &&
        !before.endsWith('.') &&
        !expr
          .slice(i + 1)
          .trimStart()
          .startsWith('(')
      ) {
        throw new SemanticError(`unsupported function value ${identifier}; built-ins must be called directly`);
      }
    } else if (c === '(' || c === '[' || c === '?' || c === '!' || c === '+' || c === '-') {
      if (++depth > 100) {
        throw new SemanticError('expression depth limit exceeded');
      }
    } else if (c === ')' || c === ']') {
      depth--;
    }
  }
  // Null-prototype expression objects cannot invoke user-supplied coercion hooks.
  return safeEvaluateExpression(expr, clone(row, true));
}

/** The safe expression subset plus field/logical predicates. Selection predicates are unsupported. */
export function evaluateVegaPredicate(predicate: unknown, row: VegaDataRow, options?: VegaSemanticOptions): boolean {
  options = context(options);
  try {
    if (typeof predicate === 'string') {
      spend(options, predicate.length);
      return Boolean(expression(predicate, row));
    }
    const visit = (p: unknown, depth: number): boolean => {
      spend(options, 1);
      if (depth > 100) {
        throw new SemanticError('predicate depth limit exceeded');
      }
      if (!record(p)) {
        throw new Error('invalid predicate');
      }
      if (
        options?.mode === 'strict' &&
        Object.keys(p).some(
          key =>
            ![
              'and',
              'or',
              'not',
              'field',
              'timeUnit',
              'valid',
              'equal',
              'oneOf',
              'range',
              'lt',
              'lte',
              'gt',
              'gte',
            ].includes(key),
        )
      ) {
        throw new Error('unsupported predicate property');
      }
      if (own(p, 'and') !== undefined) {
        if (!Array.isArray(own(p, 'and'))) {
          throw new Error('invalid logical predicate');
        }
        return list(own(p, 'and'))
          .map(v => visit(v, depth + 1))
          .every(Boolean);
      }
      if (own(p, 'or') !== undefined) {
        if (!Array.isArray(own(p, 'or'))) {
          throw new Error('invalid logical predicate');
        }
        return list(own(p, 'or'))
          .map(v => visit(v, depth + 1))
          .some(Boolean);
      }
      if (own(p, 'not') !== undefined) {
        return !visit(own(p, 'not'), depth + 1);
      }
      const field = text(own(p, 'field'));
      if (field === undefined) {
        throw new Error('unsupported predicate: expected field');
      }
      let value = readVegaField(row, field);
      if (own(p, 'timeUnit') !== undefined) {
        value = timeUnit(value, own(p, 'timeUnit'));
      }
      if (own(p, 'valid') !== undefined) {
        return valid(value) === own(p, 'valid');
      }
      if (Object.prototype.hasOwnProperty.call(p, 'equal')) {
        return sameValue(value, own(p, 'equal'));
      }
      if (own(p, 'oneOf') !== undefined) {
        if (!Array.isArray(own(p, 'oneOf'))) {
          throw new Error('invalid oneOf predicate');
        }
        return list(own(p, 'oneOf')).some(v => sameValue(value, v));
      }
      if (own(p, 'range') !== undefined) {
        const range = list(own(p, 'range'));
        if (range.length !== 2) {
          throw new Error('invalid range predicate');
        }
        return (
          valid(value) &&
          (range[0] == null || compare(value, range[0]) >= 0) &&
          (range[1] == null || compare(value, range[1]) <= 0)
        );
      }
      for (const op of ['lt', 'lte', 'gt', 'gte']) {
        if (own(p, op) !== undefined) {
          const c = compare(value, own(p, op));
          return valid(value) && (op === 'lt' ? c < 0 : op === 'lte' ? c <= 0 : op === 'gt' ? c > 0 : c >= 0);
        }
      }
      throw new Error('unsupported predicate operation');
    };
    return visit(predicate, 0);
  } catch (error) {
    fail(options, `filter predicate failed: ${error instanceof Error ? error.message : 'invalid expression'}`);
    return true;
  }
}
const sameValue = (a: unknown, b: unknown): boolean =>
  a instanceof Date && b instanceof Date
    ? Date.prototype.getTime.call(a) === Date.prototype.getTime.call(b)
    : Object.is(a, b) || a === b;

/** Vega v6.4.0 vega-time/src/floor.js: 2012 is a leap year beginning Sunday Jan 1. */
function timeUnit(value: unknown, definition: unknown): Date | null {
  let unit = typeof definition === 'string' ? definition : text(own(definition, 'unit'));
  if (!unit) {
    throw new Error('unsupported timeUnit: explicit unit required');
  }
  if (record(definition) && Object.keys(definition).some(key => !['unit', 'step', 'utc', 'binned'].includes(key))) {
    throw new Error('unsupported timeUnit option');
  }
  for (const key of ['utc', 'binned']) {
    if (own(definition, key) !== undefined && typeof own(definition, key) !== 'boolean') {
      throw new Error(`invalid timeUnit ${key}`);
    }
  }
  const binned = unit.startsWith('binned') || own(definition, 'binned') === true;
  if (unit.startsWith('binned')) {
    unit = unit.slice(6);
  }
  const utc = unit.startsWith('utc') || own(definition, 'utc') === true;
  if (unit.startsWith('utc')) {
    unit = unit.slice(3);
  }
  const parts: string[] =
    unit.match(/dayofyear|isoweek|year|quarter|month|week|date|day|hours|minutes|seconds|milliseconds/g) || [];
  if (
    parts.join('') !== unit ||
    !parts.length ||
    ((parts.includes('week') || parts.includes('isoweek') || parts.includes('day')) &&
      (parts.includes('month') || parts.includes('quarter') || parts.includes('date'))) ||
    (parts.includes('week') && parts.includes('isoweek')) ||
    (parts.includes('dayofyear') && parts.some(p => ['week', 'isoweek', 'day', 'month', 'quarter', 'date'].includes(p)))
  ) {
    throw new Error(`unsupported timeUnit ${unit}`);
  }
  const step = own(definition, 'step') ?? 1;
  if (typeof step !== 'number' || !Number.isSafeInteger(step) || step <= 0) {
    throw new Error('invalid timeUnit step');
  }
  if (!valid(value)) {
    return null;
  }
  const d =
    value instanceof Date
      ? new Date(Date.prototype.getTime.call(value))
      : typeof value === 'string' || typeof value === 'number'
      ? new Date(value)
      : new Date(NaN);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  if (binned) {
    return d;
  }
  const has = (part: string): boolean => parts.includes(part);
  const order = [
    'year',
    'quarter',
    'month',
    'week',
    'isoweek',
    'date',
    'day',
    'dayofyear',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
  ];
  const last = order.filter(part => has(part)).pop();
  const floor = (part: string, n: number, phase = 0): number =>
    part === last ? phase + Math.floor((n - phase) / step) * step : n;
  const sourceYear = utc ? d.getUTCFullYear() : d.getFullYear();
  const sourceMonth = utc ? d.getUTCMonth() : d.getMonth();
  const sourceDate = utc ? d.getUTCDate() : d.getDate();
  const sourceDay = utc ? d.getUTCDay() : d.getDay();
  const isoDay = (sourceDay + 6) % 7;
  // The Thursday in this Monday-based week determines its ISO week-numbering year.
  const thursday = new Date(d.getTime());
  if (utc) {
    thursday.setUTCDate(sourceDate + 3 - isoDay);
  } else {
    thursday.setDate(sourceDate + 3 - isoDay);
  }
  const isoYear = utc ? thursday.getUTCFullYear() : thursday.getFullYear();
  const year = has('year') ? floor('year', has('isoweek') ? isoYear : sourceYear) : has('isoweek') ? 2015 : 2012;
  const month = has('month')
    ? floor('month', sourceMonth)
    : has('quarter')
    ? 3 * floor('quarter', Math.floor(sourceMonth / 3))
    : 0;
  let date = has('date') ? floor('date', sourceDate, 1) : 1;
  const make = (y: number, m: number, day: number, h = 0, min = 0, sec = 0, ms = 0): Date => {
    const result = new Date(0);
    if (utc) {
      result.setUTCFullYear(y, m, day);
      result.setUTCHours(h, min, sec, ms);
    } else {
      result.setFullYear(y, m, day);
      result.setHours(h, min, sec, ms);
    }
    return result;
  };
  // Calendar arithmetic avoids local DST-length assumptions.
  const calendar = (y: number, m: number, day: number): number => {
    const result = new Date(0);
    result.setUTCFullYear(y, m, day);
    result.setUTCHours(0, 0, 0, 0);
    return result.getTime();
  };
  const ordinal = Math.round((calendar(sourceYear, sourceMonth, sourceDate) - calendar(sourceYear, 0, 1)) / 86400000);
  const first = utc ? make(year, 0, 1).getUTCDay() : make(year, 0, 1).getDay();
  const isoWeekOne = (y: number): number => {
    const jan4 = make(y, 0, 4);
    return 4 - (((utc ? jan4.getUTCDay() : jan4.getDay()) + 6) % 7);
  };
  if (has('dayofyear')) {
    date = floor('dayofyear', ordinal + 1, 1);
  }
  if (has('isoweek')) {
    const week =
      1 +
      Math.floor(
        (calendar(sourceYear, sourceMonth, sourceDate) - calendar(isoYear, 0, isoWeekOne(isoYear))) / (7 * 86400000),
      );
    date = has('day')
      ? floor('day', isoWeekOne(year) + (week - 1) * 7 + isoDay, 1)
      : isoWeekOne(year) + (floor('isoweek', week, 1) - 1) * 7;
  } else if (has('week')) {
    const week = Math.floor((ordinal + 7 - sourceDay) / 7);
    date = has('day')
      ? floor('day', sourceDay + week * 7 - ((first + 6) % 7), 1)
      : floor('week', week, 1) * 7 - ((first + 6) % 7);
  } else if (has('day')) {
    date = floor('day', sourceDay + 7 - ((first + 6) % 7), 1);
  }
  return make(
    year,
    month,
    date,
    has('hours') ? floor('hours', utc ? d.getUTCHours() : d.getHours()) : 0,
    has('minutes') ? floor('minutes', utc ? d.getUTCMinutes() : d.getMinutes()) : 0,
    has('seconds') ? floor('seconds', utc ? d.getUTCSeconds() : d.getSeconds()) : 0,
    has('milliseconds') ? floor('milliseconds', utc ? d.getUTCMilliseconds() : d.getMilliseconds()) : 0,
  );
}

function aggregateRows(
  rows: VegaDataRow[],
  transform: VegaDataRow,
  join: boolean,
  options?: VegaSemanticOptions,
): VegaDataRow[] {
  const groupby = fields(own(transform, 'groupby'));
  const measures = list(own(transform, join ? 'joinaggregate' : 'aggregate'));
  measures.forEach(measure => aggregateVegaValues([], text(own(measure, 'field')), own(measure, 'op'), options));
  spend(options, rows.length * (groupby.length + measures.length + 1));
  const output: VegaDataRow[] = [];
  const joins = new Map<VegaDataRow, VegaDataRow>();
  for (const group of groups(rows, groupby)) {
    const row = groupRow(group, groupby);
    for (const measure of measures) {
      const field = text(own(measure, 'field'));
      const op = own(measure, 'op');
      const name = text(own(measure, 'as')) ?? `${operation(op)?.name ?? 'count'}${field ? `_${field}` : ''}`;
      put(row, name, aggregateVegaValues(group.rows, field, op, options));
    }
    if (join) {
      for (const source of group.rows) {
        const joined = clone(source);
        for (const measure of measures) {
          const field = text(own(measure, 'field'));
          const name =
            text(own(measure, 'as')) ?? `${operation(own(measure, 'op'))?.name ?? 'count'}${field ? `_${field}` : ''}`;
          put(joined, name, clone(own(row, name)));
        }
        joins.set(source, joined);
      }
    } else {
      output.push(row);
    }
  }
  return join ? rows.map(row => joins.get(row)!) : output;
}

function windowRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const measures = list(own(transform, 'window'));
  const sort = list(own(transform, 'sort'));
  const navigation = [
    'row_number',
    'rank',
    'dense_rank',
    'percent_rank',
    'cume_dist',
    'ntile',
    'lag',
    'lead',
    'first_value',
    'last_value',
    'nth_value',
  ];
  // Preflight on empty input too; never silently accept an unknown window operation.
  measures.forEach(measure => {
    const op = own(measure, 'op');
    const name = operation(op)?.name;
    const parameter = own(measure, 'param');
    if (
      ['ntile', 'nth_value', 'lag', 'lead'].includes(name ?? '') &&
      parameter !== undefined &&
      (typeof parameter !== 'number' ||
        !Number.isInteger(parameter) ||
        parameter < (name === 'lag' || name === 'lead' ? 0 : 1))
    ) {
      throw new Error(`Vega semantics: invalid window ${name} parameter`);
    }
    if (!navigation.includes(operation(op)?.name ?? '')) {
      try {
        aggregateVegaValues([], text(own(measure, 'field')), op, { mode: 'strict' });
      } catch (error) {
        fail(options, error instanceof Error ? error.message : 'unknown window operation');
      }
    }
  });
  const cmp = (a: VegaDataRow, b: VegaDataRow): number => {
    for (const def of sort) {
      const field = text(own(def, 'field'));
      if (!field) {
        continue;
      }
      const c = compare(readVegaField(a, field), readVegaField(b, field));
      if (c) {
        return own(def, 'order') === 'descending' ? -c : c;
      }
    }
    return 0;
  };
  const rawFrame = own(transform, 'frame') ?? [null, 0];
  const frame = list(rawFrame);
  if (frame.length !== 2 || frame.some(v => v !== null && (typeof v !== 'number' || !Number.isInteger(v)))) {
    throw new Error('Vega semantics: invalid window frame');
  }
  const [lower, upper] = frame as [number | null, number | null];
  if (lower !== null && upper !== null && lower > upper) {
    throw new Error('Vega semantics: reversed window frame');
  }
  const result: VegaDataRow[] = [];
  const needsFrame = measures.some(
    measure =>
      !navigation.includes(operation(own(measure, 'op'))?.name ?? '') ||
      ['first_value', 'last_value', 'nth_value'].includes(operation(own(measure, 'op'))?.name ?? ''),
  );
  spend(options, rows.length * (measures.length + sort.length + 1));
  for (const group of groups(rows, fields(own(transform, 'groupby')))) {
    const ordered = group.rows
      .map((row, index) => ({ row, index }))
      .sort((a, b) => cmp(a.row, b.row) || a.index - b.index)
      .map(v => v.row);
    const size = ordered.length;
    const starts: number[] = [];
    const ends: number[] = [];
    const dense: number[] = [];
    let rank = 0;
    for (let start = 0; start < size; ) {
      let end = start + 1;
      while (sort.length && end < size && cmp(ordered[start], ordered[end]) === 0) {
        end++;
      }
      rank++;
      for (let i = start; i < end; i++) {
        starts[i] = start;
        ends[i] = end;
        dense[i] = rank;
      }
      start = end;
    }
    ordered.forEach((source, index) => {
      let start = lower === null ? 0 : Math.max(0, Math.min(size, index + lower));
      let end = upper === null ? size : Math.max(0, Math.min(size, index + upper + 1));
      if (own(transform, 'ignorePeers') !== true && sort.length && start < end) {
        start = starts[start];
        end = ends[end - 1];
      }
      if (needsFrame) {
        spend(options, Math.max(0, end - start) * measures.length);
      }
      const frameRows = needsFrame ? ordered.slice(start, Math.max(start, end)) : [];
      const row = clone(source);
      for (const measure of measures) {
        const op = own(measure, 'op');
        const name = operation(op)?.name;
        const field = text(own(measure, 'field'));
        const as = text(own(measure, 'as')) ?? `${name ?? 'row_number'}${field ? `_${field}` : ''}`;
        const parameter = own(measure, 'param');
        const at = (values: VegaDataRow[], i: number): unknown =>
          i >= 0 && i < values.length && field ? readVegaField(values[i], field) : null;
        const integer = (fallback: number, minimum: number): number => {
          const v = parameter ?? fallback;
          if (typeof v !== 'number' || !Number.isInteger(v) || v < minimum) {
            throw new Error(`Vega semantics: invalid window ${name} parameter`);
          }
          return v;
        };
        let value: unknown;
        switch (name) {
          case 'row_number':
            value = index + 1;
            break;
          case 'rank':
            value = starts[index] + 1;
            break;
          case 'dense_rank':
            value = dense[index];
            break;
          case 'percent_rank':
            value = starts[index] / (size - 1);
            break;
          case 'cume_dist':
            value = ends[index] / size;
            break;
          case 'ntile':
            value = Math.ceil(integer(1, 1) * (ends[index] / size));
            break;
          case 'lag':
            value = at(ordered, index - (integer(1, 0) || 1));
            break;
          case 'lead':
            value = at(ordered, index + (integer(1, 0) || 1));
            break;
          case 'first_value':
            value = at(frameRows, 0);
            break;
          case 'last_value':
            value = at(frameRows, frameRows.length - 1);
            break;
          case 'nth_value':
            value = at(frameRows, integer(1, 1) - 1);
            break;
          default:
            try {
              value = aggregateVegaValues(frameRows, field, op, { mode: 'strict' });
            } catch (error) {
              fail(options, error instanceof Error ? error.message : `unknown window operation ${name}`);
              value = index + 1;
            }
        }
        put(row, as, value);
      }
      result.push(row);
    });
  }
  return result;
}

function quantileRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const field = text(own(transform, 'quantile'))!;
  const step = own(transform, 'step') ?? 0.01;
  if (typeof step !== 'number' || !Number.isFinite(step) || step <= 0 || step > 1) {
    throw new Error('Vega semantics: invalid quantile step');
  }
  if (own(transform, 'probs') === undefined && 1 / step > 10000) {
    throw new Error('Vega semantics: quantile work limit exceeded');
  }
  const probs =
    own(transform, 'probs') === undefined
      ? Array.from({ length: Math.floor(1 / step + 0.5) }, (_, i) => (i + 0.5) * step).filter(p => p < 1)
      : list(own(transform, 'probs'));
  if (probs.length > 10000 || probs.some(p => typeof p !== 'number' || !Number.isFinite(p) || p < 0 || p > 1)) {
    throw new Error('Vega semantics: invalid quantile probabilities/work limit');
  }
  const as = fields(own(transform, 'as'));
  const groupby = fields(own(transform, 'groupby'));
  const result: VegaDataRow[] = [];
  for (const group of groups(rows, groupby)) {
    const values = group.rows
      .map(row => numeric(readVegaField(row, field)))
      .filter((v): v is number => v !== undefined && Number.isFinite(v));
    if (!values.length) {
      continue;
    }
    spend(options, values.length * probs.length);
    for (const p of probs as number[]) {
      const row = groupRow(group, groupby);
      put(row, as[0] ?? 'prob', p);
      put(row, as[1] ?? 'value', quantile(values, p));
      result.push(row);
    }
  }
  return result;
}

function regressionRows(rows: VegaDataRow[], transform: VegaDataRow): VegaDataRow[] {
  if (own(transform, 'method') !== undefined && own(transform, 'method') !== 'linear') {
    throw new Error('Vega semantics: unsupported regression method');
  }
  const x = text(own(transform, 'on'));
  const y = text(own(transform, 'regression'));
  if (!x || !y) {
    throw new Error('Vega semantics: regression requires fields');
  }
  const groupby = fields(own(transform, 'groupby'));
  const as = fields(own(transform, 'as'));
  const result: VegaDataRow[] = [];
  for (const group of groups(rows, groupby)) {
    const points = group.rows
      .map(row => [numeric(readVegaField(row, x)), numeric(readVegaField(row, y))])
      .filter((p): p is [number, number] => p.every(v => v !== undefined && Number.isFinite(v)));
    const n = points.length;
    const mx = points.reduce((s, p) => s + p[0], 0) / n;
    const my = points.reduce((s, p) => s + p[1], 0) / n;
    const xx = points.reduce((s, p) => s + (p[0] - mx) ** 2, 0);
    const yy = points.reduce((s, p) => s + (p[1] - my) ** 2, 0);
    const xy = points.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0);
    if (n < 2 || xx === 0) {
      throw new Error('Vega semantics: degenerate linear regression sample');
    }
    const slope = xy / xx;
    const intercept = my - slope * mx;
    if (own(transform, 'params') === true) {
      const row = groupRow(group, groupby);
      put(row, 'keys', clone(group.keys));
      put(row, 'coef', [intercept, slope]);
      put(row, 'rSquared', yy ? Math.min(1, (xy * xy) / (xx * yy)) : 1);
      result.push(row);
    } else {
      const extent =
        own(transform, 'extent') === undefined
          ? points.reduce(([lo, hi], p) => [Math.min(lo, p[0]), Math.max(hi, p[0])], [Infinity, -Infinity])
          : list(own(transform, 'extent'));
      if (
        extent.length !== 2 ||
        extent.some(v => typeof v !== 'number' || !Number.isFinite(v)) ||
        (extent[0] as number) > (extent[1] as number)
      ) {
        throw new Error('Vega semantics: invalid regression extent');
      }
      for (const value of extent as number[]) {
        const row = groupRow(group, groupby);
        put(row, as[0] ?? x, value);
        put(row, as[1] ?? y, intercept + slope * value);
        result.push(row);
      }
    }
  }
  return result;
}

function lookupRows(rows: VegaDataRow[], transform: VegaDataRow): VegaDataRow[] {
  const from = own(transform, 'from');
  const data = list(own(own(from, 'data'), 'values'));
  const key = text(own(from, 'key'));
  const field = text(own(transform, 'lookup'));
  if (!key || !field || !Array.isArray(own(own(from, 'data'), 'values'))) {
    throw new Error('Vega semantics: lookup requires inline values and key fields');
  }
  const selected = fields(own(from, 'fields'));
  const as = typeof own(transform, 'as') === 'string' ? [own(transform, 'as') as string] : fields(own(transform, 'as'));
  if (!selected.length && !as.length) {
    throw new Error('Vega semantics: whole-record lookup requires as');
  }
  const index = new Map<unknown, unknown>();
  data.forEach(row => {
    const value = readVegaField(row, key);
    if (!index.has(value)) {
      index.set(value, row);
    }
  });
  return rows.map(source => {
    const row = clone(source);
    const match = index.get(readVegaField(source, field));
    if (selected.length) {
      selected.forEach((f, i) =>
        put(row, as[i] ?? f, clone(match === undefined ? own(transform, 'default') ?? null : readVegaField(match, f))),
      );
    } else {
      put(row, as[0], clone(match ?? own(transform, 'default') ?? null));
    }
    return row;
  });
}

function imputeRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const field = text(own(transform, 'impute'));
  const key = text(own(transform, 'key'));
  if (!field || !key) {
    throw new Error('Vega semantics: impute requires field/key');
  }
  const groupby = fields(own(transform, 'groupby'));
  const keyvals = own(transform, 'keyvals');
  let keys: unknown[] = Array.isArray(keyvals) ? clone(keyvals) : rows.map(row => readVegaField(row, key));
  if (record(keyvals)) {
    const start = own(keyvals, 'start') ?? 0;
    const stop = own(keyvals, 'stop');
    const step = own(keyvals, 'step') ?? 1;
    if (
      typeof start !== 'number' ||
      typeof stop !== 'number' ||
      typeof step !== 'number' ||
      !Number.isFinite(start) ||
      !Number.isFinite(stop) ||
      !Number.isFinite(step) ||
      step === 0 ||
      (stop - start) / step < 0 ||
      (stop - start) / step > 10000
    ) {
      throw new Error('Vega semantics: invalid impute keyvals/work limit');
    }
    keys = Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);
  }
  spend(options, keys.length * keys.length);
  keys = keys.filter((keyValue, i) => keys.findIndex(v => sameValue(v, keyValue)) === i);
  const method = own(transform, 'method') ?? 'value';
  if (!['value', 'mean', 'median', 'min', 'max'].includes(method as string)) {
    throw new Error('Vega semantics: unsupported impute method');
  }
  const result: VegaDataRow[] = [];
  for (const group of groups(rows, groupby)) {
    spend(options, keys.length * (group.rows.length + keys.length));
    const values = group.rows.slice();
    for (const keyValue of keys) {
      if (!values.some(row => sameValue(readVegaField(row, key), keyValue))) {
        const row = groupRow(group, groupby);
        put(row, key, keyValue);
        put(row, field, null);
        values.push(row);
      }
    }
    const frame = own(transform, 'frame');
    const ordered = values.slice().sort((a, b) => compare(readVegaField(a, key), readVegaField(b, key)));
    for (const source of values) {
      const row = clone(source);
      if (!valid(readVegaField(source, field))) {
        let sample = group.rows;
        if (frame !== undefined) {
          const bounds = list(frame);
          if (bounds.length !== 2 || bounds.some(v => v !== null && (typeof v !== 'number' || !Number.isInteger(v)))) {
            throw new Error('Vega semantics: invalid impute frame');
          }
          const index = ordered.indexOf(source);
          const lo = bounds[0] === null ? 0 : Math.max(0, index + (bounds[0] as number));
          const hi = bounds[1] === null ? ordered.length : index + (bounds[1] as number) + 1;
          sample = ordered.slice(lo, Math.max(lo, hi));
        }
        put(
          row,
          field,
          method === 'value'
            ? clone(own(transform, 'value') ?? null)
            : aggregateVegaValues(sample, field, method, options),
        );
      }
      result.push(row);
    }
  }
  return result;
}

function transformFields(value: unknown, name: string, required = false): string[] {
  if (value === undefined && !required) {
    return [];
  }
  if (!Array.isArray(value) || (required && !value.length) || value.some(v => typeof v !== 'string' || !v)) {
    throw new Error(`invalid ${name} fields`);
  }
  return value as string[];
}

function transformAliases(value: unknown, defaults: string[], prefix = false): string[] {
  if (value === undefined) {
    return defaults;
  }
  if (prefix && typeof value === 'string' && value) {
    return [value, `${value}_end`];
  }
  if (
    !Array.isArray(value) ||
    value.length > defaults.length ||
    value.some(v => v != null && (typeof v !== 'string' || !v))
  ) {
    throw new Error('invalid transform as aliases');
  }
  const result = defaults.map((name, i) => (own(value, String(i)) as string | undefined) ?? name);
  if (new Set(result).size !== result.length) {
    throw new Error('invalid duplicate transform as aliases');
  }
  return result;
}

/** Shared strict preflight is independent of input cardinality. Legacy fallback stays explicit. */
function validateTransform(transform: VegaDataRow, kind: string): void {
  if (own(transform, 'groupby') !== undefined) {
    transformFields(own(transform, 'groupby'), 'groupby');
  }
  if (own(transform, 'sort') !== undefined) {
    const sort = own(transform, 'sort');
    if (!Array.isArray(sort)) {
      throw new Error('invalid transform sort');
    }
    for (const def of sort) {
      if (
        !record(def) ||
        !text(own(def, 'field')) ||
        Object.keys(def).some(key => !['field', 'order'].includes(key)) ||
        (own(def, 'order') !== undefined && !['ascending', 'descending'].includes(own(def, 'order') as string))
      ) {
        throw new Error('invalid transform sort field/order');
      }
    }
  }
  if (['aggregate', 'joinaggregate', 'window'].includes(kind)) {
    const measures = own(transform, kind);
    if (!Array.isArray(measures)) {
      throw new Error(`invalid ${kind} measures`);
    }
    const fieldless = ['count', 'values', 'row_number', 'rank', 'dense_rank', 'percent_rank', 'cume_dist', 'ntile'];
    const parameterized = ['ntile', 'nth_value', 'lag', 'lead'];
    for (const measure of measures) {
      const op = operation(own(measure, 'op'))?.name;
      if (!record(measure) || !op) {
        throw new Error(`invalid ${kind} operation`);
      }
      if (
        Object.keys(measure).some(key => !['field', 'op', 'as', ...(kind === 'window' ? ['param'] : [])].includes(key))
      ) {
        throw new Error(`unsupported ${kind} operation property`);
      }
      if (
        (!fieldless.includes(op) && !text(own(measure, 'field'))) ||
        (own(measure, 'field') !== undefined && !text(own(measure, 'field')))
      ) {
        throw new Error(`${kind} ${op} requires field`);
      }
      if (own(measure, 'as') !== undefined && !text(own(measure, 'as'))) {
        throw new Error(`invalid ${kind} as`);
      }
      if (own(measure, 'param') !== undefined && !parameterized.includes(op)) {
        throw new Error(`unsupported window ${op} param`);
      }
    }
    if (own(transform, 'ignorePeers') !== undefined && typeof own(transform, 'ignorePeers') !== 'boolean') {
      throw new Error('invalid window ignorePeers');
    }
  }
  if (['fold', 'quantile', 'regression', 'loess', 'density'].includes(kind)) {
    transformAliases(own(transform, 'as'), ['first', 'second']);
  }
  for (const key of ['quantile', 'regression', 'loess', 'density']) {
    if (kind === key && !text(own(transform, key))) {
      throw new Error(`${key} requires field`);
    }
  }
}

/** Vega-statistics bin planning, with D3 extent over safely coerced finite input values. */
function binRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const field = text(own(transform, 'field'));
  const definition = own(transform, 'bin');
  if (!field || (definition !== true && !record(definition))) {
    throw new Error('invalid bin field/options');
  }
  const allowed = ['extent', 'step', 'steps', 'maxbins', 'base', 'divide', 'minstep', 'nice', 'anchor', 'span'];
  if (record(definition) && Object.keys(definition).some(key => !allowed.includes(key))) {
    throw new Error('unsupported bin option');
  }
  const parameter = (key: string, fallback: number, minimum: number, inclusive = false): number => {
    const v = own(definition, key) ?? fallback;
    if (typeof v !== 'number' || !Number.isFinite(v) || (inclusive ? v < minimum : v <= minimum)) {
      throw new Error(`invalid bin ${key}`);
    }
    return v;
  };
  const base = parameter('base', 10, 1);
  const maxbins = parameter('maxbins', 20, 0);
  const minstep = parameter('minstep', 0, 0, true);
  const nice = own(definition, 'nice');
  if (nice !== undefined && typeof nice !== 'boolean') {
    throw new Error('invalid bin nice');
  }
  const candidates = (key: string, fallback: number[]): number[] => {
    const v = own(definition, key) ?? fallback;
    if (!Array.isArray(v) || !v.length || v.some(n => typeof n !== 'number' || !Number.isFinite(n) || n <= 0)) {
      throw new Error(`invalid bin ${key}`);
    }
    spend(options, v.length);
    return v as number[];
  };
  const divide = candidates('divide', [5, 2]);
  const steps = own(definition, 'steps') === undefined ? undefined : candidates('steps', []);
  if (steps?.some((v, i) => i > 0 && v <= steps[i - 1])) {
    throw new Error('invalid bin steps order');
  }
  spend(options, rows.length * (field.length + 1));
  const values = rows
    .map(row => numeric(readVegaField(row, field)))
    .filter((v): v is number => v !== undefined && Number.isFinite(v));
  const inferred = dataExtent(values);
  const extent = own(definition, 'extent') ?? [inferred[0] ?? 0, inferred[1] ?? 0];
  if (
    !Array.isArray(extent) ||
    extent.length !== 2 ||
    extent.some(v => typeof v !== 'number' || !Number.isFinite(v)) ||
    extent[0] > extent[1]
  ) {
    throw new Error('invalid bin extent');
  }
  let [start, stop] = extent as number[];
  const inferredSpan = stop - start || Math.abs(start) || 1;
  if (own(definition, 'span') === undefined && !Number.isFinite(inferredSpan)) {
    throw new SemanticError('bin numerical work limit exceeded');
  }
  const span = parameter('span', inferredSpan, 0);
  let step: number;
  if (own(definition, 'step') !== undefined) {
    step = parameter('step', 1, 0);
  } else if (steps) {
    let i = 0;
    while (i < steps.length && steps[i] < span / maxbins) {
      spend(options, 1);
      i++;
    }
    step = steps[Math.max(0, i - 1)];
  } else {
    step = Math.max(
      minstep,
      base ** (Math.round(Math.log(span) / Math.log(base)) - Math.ceil(Math.log(maxbins) / Math.log(base))),
    );
    if (!(step > 0) || !Number.isFinite(step)) {
      throw new SemanticError('bin numerical work limit exceeded');
    }
    while (Math.ceil(span / step) > maxbins) {
      spend(options, 1);
      step *= base;
      if (!Number.isFinite(step)) {
        throw new SemanticError('bin numerical work limit exceeded');
      }
    }
    for (const divisor of divide) {
      const next = step / divisor;
      if (next >= minstep && span / next <= maxbins) {
        step = next;
      }
    }
  }
  if (!Number.isFinite(span / step) || span / step > Number.MAX_SAFE_INTEGER) {
    throw new SemanticError('bin numerical work limit exceeded');
  }
  const precision = Math.log(step) >= 0 ? 0 : Math.floor(-Math.log(step) / Math.log(base)) + 1;
  if (nice !== false) {
    const lo = Math.floor(start / step + base ** (-precision - 1)) * step;
    start = start < lo ? lo - step : lo;
    stop = Math.ceil(stop / step) * step;
  }
  if (start === stop) {
    stop = start + step;
  }
  stop = start + Math.ceil((stop - start) / step) * step;
  if (own(definition, 'anchor') !== undefined) {
    const anchor = parameter('anchor', 0, -Infinity, true);
    const shift = anchor - (start + step * Math.floor((anchor - start) / step));
    start += shift;
    stop += shift;
  }
  if (!Number.isFinite(start) || !Number.isFinite(stop) || !(stop > start) || start + step === start) {
    throw new SemanticError('bin numerical work limit exceeded');
  }
  const as = transformAliases(own(transform, 'as'), ['bin0', 'bin1'], true);
  return rows.map(source => {
    const value = readVegaField(source, field);
    const n = missing(value) ? null : numeric(value) ?? NaN;
    const lo =
      n === null
        ? null
        : n < start
        ? -Infinity
        : n > stop
        ? Infinity
        : start + step * Math.floor(1e-14 + (Math.max(start, Math.min(n, stop - step)) - start) / step);
    const row = clone(source, false, options);
    put(row, as[0], lo);
    put(row, as[1], lo === null ? null : start + step * (1 + (lo - start) / step));
    return row;
  });
}

function flattenRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const selected = transformFields(own(transform, 'flatten'), 'flatten', true);
  const as = transformAliases(own(transform, 'as'), selected);
  const index = own(transform, 'index');
  if (index !== undefined && (!text(index) || as.includes(index as string))) {
    throw new Error('invalid flatten index');
  }
  let count = 0;
  const plans = rows.map(source => {
    const arrays = selected.map(field => readVegaField(source, field));
    if (arrays.some(value => value != null && !Array.isArray(value))) {
      throw new Error('invalid flatten array field');
    }
    const size = arrays.reduce<number>(
      (max, value) => Math.max(max, Array.isArray(value) ? (own(value, 'length') as number) : 0),
      0,
    );
    count += size;
    if (count > 100000) {
      throw new SemanticError('flatten row work limit exceeded');
    }
    spend(options, selected.length * (1 + size));
    return { source, arrays, size };
  });
  const result: VegaDataRow[] = [];
  for (const { source, arrays, size } of plans) {
    for (let i = 0; i < size; i++) {
      const row = clone(source, false, options);
      as.forEach((name, j) => put(row, name, clone(own(arrays[j], String(i)) ?? null, false, options)));
      if (typeof index === 'string') {
        put(row, index, i);
      }
      result.push(row);
    }
  }
  return result;
}

function pivotRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const field = text(own(transform, 'pivot'));
  const value = text(own(transform, 'value'));
  if (!field || !value) {
    throw new Error('pivot requires field/value');
  }
  const groupby = transformFields(own(transform, 'groupby'), 'pivot groupby');
  const op = own(transform, 'op') ?? 'sum';
  if (typeof op !== 'string') {
    throw new Error('invalid pivot operation');
  }
  if (['values', 'argmin', 'argmax'].includes(op)) {
    throw new Error('unsupported pivot operation: scalar aggregate required');
  }
  aggregateVegaValues([], value, op, { ...options, mode: 'strict' });
  const limit = own(transform, 'limit') ?? 0;
  if (typeof limit !== 'number' || !Number.isSafeInteger(limit) || limit < 0) {
    throw new Error('invalid pivot limit');
  }
  const keys = new Map<string, unknown>();
  for (const row of rows) {
    const key = readVegaField(row, field);
    if (key && typeof key === 'object') {
      throw new Error('unsupported pivot key: scalar required');
    }
    const name = String(key);
    if (keys.has(name) && !sameValue(keys.get(name), key)) {
      throw new Error('unsupported pivot column name collision');
    }
    keys.set(name, key);
  }
  const columns = Array.from(keys, ([name, key]) => ({ name, key })).sort((a, b) => compare(a.key, b.key));
  if (limit) {
    columns.length = Math.min(columns.length, limit);
  }
  spend(options, rows.length * (groupby.length + columns.length + 1));
  const partitioned = groups(rows, groupby);
  spend(options, partitioned.length * columns.length);
  return partitioned.map(group => {
    const row = groupRow(group, groupby);
    for (const column of columns) {
      // Vega Pivot uses NaN sentinels for non-matching cells, including for distinct.
      const sample = group.rows.map(source => ({
        value: readVegaField(source, field) === column.key ? readVegaField(source, value) : NaN,
      }));
      put(
        row,
        column.name,
        op === 'count'
          ? sample.filter(cell => !Number.isNaN(cell.value)).length
          : aggregateVegaValues(sample, 'value', op, options),
      );
    }
    return row;
  });
}

/** Safe equivalent of Vega Stack's unary numeric coercion (null/empty string are zero). */
function stackNumber(value: unknown): number {
  return value === null || value === '' ? 0 : numeric(value) ?? NaN;
}

function stackRows(rows: VegaDataRow[], transform: VegaDataRow, options?: VegaSemanticOptions): VegaDataRow[] {
  const field = text(own(transform, 'stack'));
  if (!field) {
    throw new Error('stack requires field');
  }
  const offset = own(transform, 'offset') ?? 'zero';
  if (!['zero', 'normalize', 'center'].includes(offset as string)) {
    throw new Error('unsupported stack offset');
  }
  const groupby = transformFields(own(transform, 'groupby'), 'stack groupby');
  const as = transformAliases(own(transform, 'as'), ['y0', 'y1']);
  const sort = list(own(transform, 'sort'));
  spend(
    options,
    rows.length * (field.length + groupby.length + sort.length * (1 + Math.ceil(Math.log2(rows.length || 1))) + 1),
  );
  const partitioned = groups(rows, groupby);
  // Cache source values before writing aliases, including when aliases overwrite the input field.
  const values = new Map(rows.map(row => [row, stackNumber(readVegaField(row, field))]));
  const totals = partitioned.map(group => group.rows.reduce((sum, row) => sum + Math.abs(values.get(row)!), 0));
  const max = totals.reduce((best, sum) => (sum > best ? sum : best), 0);
  partitioned.forEach((group, i) => {
    const ordered = group.rows.slice().sort((a, b) => {
      for (const def of sort) {
        const fieldName = text(own(def, 'field'));
        if (!fieldName) {
          continue;
        }
        const c = compare(readVegaField(a, fieldName), readVegaField(b, fieldName));
        if (c) {
          return own(def, 'order') === 'descending' ? -c : c;
        }
      }
      return 0;
    });
    let positive = 0;
    let negative = 0;
    let last = offset === 'center' ? (max - totals[i]) / 2 : 0;
    let cumulative = 0;
    for (const row of ordered) {
      const v = values.get(row)!;
      let lo: number;
      let hi: number;
      if (offset === 'zero') {
        lo = v < 0 ? negative : positive;
        hi = lo + v;
        if (v < 0) {
          negative = hi;
        } else {
          positive = hi;
        }
      } else {
        lo = last;
        hi = offset === 'center' ? last + Math.abs(v) : (1 / totals[i]) * (cumulative += Math.abs(v));
        last = hi;
      }
      put(row, as[0], lo);
      put(row, as[1], hi);
    }
  });
  return rows;
}

function sampleRows(rows: VegaDataRow[], size: unknown, options?: VegaSemanticOptions): VegaDataRow[] {
  if (typeof size !== 'number' || !Number.isSafeInteger(size) || size < 0) {
    throw new Error('invalid sample size');
  }
  if (!size) {
    return [];
  }
  spend(options, rows.length);
  const result = rows.slice(0, size);
  for (let i = size; i < rows.length; i++) {
    const index = Math.floor((i + 1) * Math.random());
    if (index < size) {
      result[index] = rows[i];
    }
  }
  return result;
}

/** Pure transform pipeline. Strict mode rejects unknown/approximated transforms. No resource loading. */
export function applyVegaTransforms(
  data: VegaDataRow[],
  transforms: Record<string, unknown>[] | undefined,
  options?: VegaSemanticOptions,
): VegaDataRow[] {
  options = context(options);
  spend(options, data.length);
  if (data.length > 100000 || (transforms?.length ?? 0) > 1000) {
    throw new SemanticError('transform/row work limit exceeded');
  }
  if (transforms !== undefined && !Array.isArray(transforms)) {
    fail(options, 'invalid transform array');
    return clone(data);
  }
  let rows = clone(data, false, options);
  for (const raw of transforms ?? []) {
    spend(options, rows.length + 1);
    const transform = clone(raw, false, options);
    try {
      if (!record(transform)) {
        throw new Error('invalid transform record');
      }
      const kinds = [
        'filter',
        'calculate',
        'aggregate',
        'joinaggregate',
        'window',
        'timeUnit',
        'fold',
        'lookup',
        'impute',
        'quantile',
        'regression',
        'loess',
        'density',
        'bin',
        'flatten',
        'pivot',
        'stack',
        'sample',
      ];
      if (kinds.filter(key => Object.prototype.hasOwnProperty.call(transform, key)).length > 1) {
        throw new Error('conflicting transform operations');
      }
      const allowed: Record<string, string[]> = {
        filter: ['filter'],
        calculate: ['calculate', 'as'],
        aggregate: ['aggregate', 'groupby'],
        joinaggregate: ['joinaggregate', 'groupby'],
        window: ['window', 'sort', 'groupby', 'frame', 'ignorePeers'],
        timeUnit: ['timeUnit', 'field', 'as'],
        fold: ['fold', 'as'],
        lookup: ['lookup', 'from', 'as', 'default'],
        impute: ['impute', 'key', 'groupby', 'keyvals', 'method', 'frame', 'value'],
        quantile: ['quantile', 'groupby', 'probs', 'step', 'as'],
        regression: ['regression', 'on', 'groupby', 'method', 'params', 'extent', 'as'],
        loess: ['loess', 'on', 'groupby', 'bandwidth', 'as'],
        density: [
          'density',
          'groupby',
          'bandwidth',
          'counts',
          'cumulative',
          'extent',
          'steps',
          'minsteps',
          'maxsteps',
          'resolve',
          'as',
        ],
        bin: ['bin', 'field', 'as'],
        flatten: ['flatten', 'as', 'index'],
        pivot: ['pivot', 'value', 'groupby', 'limit', 'op'],
        stack: ['stack', 'groupby', 'sort', 'offset', 'as'],
        sample: ['sample'],
      };
      const kind = kinds.find(key => Object.prototype.hasOwnProperty.call(transform, key));
      if (
        options?.mode === 'strict' &&
        kind &&
        allowed[kind] &&
        Object.keys(transform).some(key => !allowed[kind].includes(key))
      ) {
        throw new Error(`unsupported ${kind} transform option`);
      }
      if (options?.mode === 'strict' && kind) {
        validateTransform(transform, kind);
      }
      if (own(transform, 'filter') !== undefined) {
        if (!rows.length && options?.mode === 'strict') {
          evaluateVegaPredicate(own(transform, 'filter'), {}, options);
        }
        rows = rows.filter(row => evaluateVegaPredicate(own(transform, 'filter'), row, options));
      } else if (typeof own(transform, 'calculate') === 'string') {
        const as = text(own(transform, 'as'));
        if (!as) {
          throw new Error('calculate requires as');
        }
        const expr = own(transform, 'calculate') as string;
        spend(options, Math.max(1, rows.length) * expr.length);
        if (!rows.length && options?.mode === 'strict') {
          expression(expr, {});
        }
        rows = rows.map(source => {
          const row = clone(source);
          try {
            put(row, as, expression(own(transform, 'calculate') as string, source));
          } catch (error) {
            fail(options, `calculate failed: ${error instanceof Error ? error.message : 'invalid expression'}`);
          }
          return row;
        });
      } else if (own(transform, 'aggregate') !== undefined) {
        rows = aggregateRows(rows, transform, false, options);
      } else if (own(transform, 'joinaggregate') !== undefined) {
        rows = aggregateRows(rows, transform, true, options);
      } else if (own(transform, 'window') !== undefined) {
        rows = windowRows(rows, transform, options);
      } else if (own(transform, 'bin') !== undefined) {
        rows = binRows(rows, transform, options);
      } else if (own(transform, 'flatten') !== undefined) {
        rows = flattenRows(rows, transform, options);
      } else if (own(transform, 'pivot') !== undefined) {
        rows = pivotRows(rows, transform, options);
      } else if (own(transform, 'stack') !== undefined) {
        rows = stackRows(rows, transform, options);
      } else if (own(transform, 'sample') !== undefined) {
        rows = sampleRows(rows, own(transform, 'sample'), options);
      } else if (
        own(transform, 'extent') !== undefined &&
        own(transform, 'regression') === undefined &&
        own(transform, 'density') === undefined
      ) {
        throw new Error('unsupported extent transform: signal/parameter output requires a reactive runtime');
      } else if (own(transform, 'timeUnit') !== undefined) {
        const field = text(own(transform, 'field'));
        const as = text(own(transform, 'as'));
        if (!field || !as) {
          throw new Error('timeUnit requires field/as');
        }
        timeUnit(null, own(transform, 'timeUnit'));
        rows = rows.map(source => {
          const row = clone(source);
          put(row, as, timeUnit(readVegaField(source, field), own(transform, 'timeUnit')));
          return row;
        });
      } else if (own(transform, 'fold') !== undefined) {
        const fold = fields(own(transform, 'fold'));
        const as = fields(own(transform, 'as'));
        if (
          !Array.isArray(own(transform, 'fold')) ||
          !fold.length ||
          fold.length !== list(own(transform, 'fold')).length
        ) {
          throw new Error('invalid fold fields');
        }
        spend(options, rows.length * fold.length);
        rows = rows.flatMap(source =>
          fold.map(field => {
            const row = clone(source);
            put(row, as[0] ?? 'key', field);
            put(row, as[1] ?? 'value', clone(readVegaField(source, field)));
            return row;
          }),
        );
      } else if (own(transform, 'lookup') !== undefined) {
        rows = lookupRows(rows, transform);
      } else if (own(transform, 'impute') !== undefined) {
        rows = imputeRows(rows, transform, options);
      } else if (own(transform, 'quantile') !== undefined) {
        rows = quantileRows(rows, transform, options);
      } else if (own(transform, 'regression') !== undefined) {
        rows = regressionRows(rows, transform);
      } else if (own(transform, 'loess') !== undefined || own(transform, 'density') !== undefined) {
        const statisticsContext = {
          readField: readVegaField,
          groups,
          groupRow,
          spend: (amount: number) => spend(options, amount),
        };
        rows =
          own(transform, 'loess') !== undefined
            ? loessVegaRows(rows, transform, statisticsContext)
            : densityVegaRows(rows, transform, statisticsContext);
      } else {
        throw new Error(`unsupported transform ${Object.keys(transform).join(', ')}`);
      }
      if (rows.length > 100000) {
        throw new SemanticError('row work limit exceeded');
      }
    } catch (error) {
      fail(options, error instanceof Error ? error.message : 'transform failed');
    }
  }
  return rows;
}

/** Normalize data semantics only; rendering, formatting, stack geometry and interactions remain separate. */
export function prepareVegaLiteSpec(spec: VegaLiteSpec, options?: VegaSemanticOptions): VegaLiteSpec {
  options = context(options);
  const copy = clone(spec) as unknown as VegaDataRow;
  const datasets = own(copy, 'datasets');
  let aliasId = 0;
  const prepare = (
    node: VegaDataRow,
    inheritedData: VegaDataRow[] | undefined,
    inheritedEncoding: VegaDataRow,
    depth: number,
  ): VegaDataRow => {
    spend(options, 1);
    if (depth > 100) {
      throw new SemanticError('composition depth limit exceeded');
    }
    const source = own(node, 'data');
    let rows: VegaDataRow[];
    if (source !== undefined) {
      let values = own(source, 'values');
      const name = text(own(source, 'name'));
      if (values === undefined && name) {
        values = own(datasets, name);
      }
      if (!Array.isArray(values)) {
        fail(
          options,
          `unresolved data ${
            name ?? (own(source, 'url') !== undefined ? 'url (external loading is disabled)' : 'source')
          }`,
        );
        rows = [];
      } else {
        rows = clone(values.filter(record));
      }
    } else {
      rows = clone(inheritedData ?? []);
    }
    rows = applyVegaTransforms(rows, own(node, 'transform') as VegaDataRow[] | undefined, options);
    delete node.transform;
    const encoding = clone(inheritedEncoding);
    const localEncoding = own(node, 'encoding');
    if (record(localEncoding)) {
      for (const channel of Object.keys(localEncoding)) {
        put(encoding, channel, clone(own(localEncoding, channel)));
      }
    }
    const composition = ['layer', 'hconcat', 'vconcat', 'concat'].filter(key => Array.isArray(own(node, key)));
    if (composition.length) {
      put(node, 'data', { values: clone(rows) });
      // Parent encodings are moved into each child, so a second preparation is idempotent.
      delete node.encoding;
      for (const channel of composition) {
        put(
          node,
          channel,
          list(own(node, channel)).map(child => {
            if (!record(child)) {
              throw new Error('Vega semantics: invalid composition child');
            }
            return prepare(child, rows, encoding, depth + 1);
          }),
        );
      }
      return node;
    }
    const definitions: VegaDataRow[] = [];
    const visited = new Set<object>();
    const collect = (def: unknown, level = 0): void => {
      spend(options, 1);
      if (level > 100) {
        throw new SemanticError('encoding depth limit exceeded');
      }
      if (def && typeof def === 'object') {
        if (visited.has(def)) {
          return;
        }
        visited.add(def);
      }
      if (Array.isArray(def)) {
        def.forEach(item => collect(item, level + 1));
      } else if (record(def)) {
        // Constant/datum definitions are not data fields, even if they carry annotations.
        if (
          !Object.prototype.hasOwnProperty.call(def, 'value') &&
          !Object.prototype.hasOwnProperty.call(def, 'datum') &&
          (own(def, 'field') !== undefined || own(def, 'aggregate') !== undefined)
        ) {
          definitions.push(def);
        }
        const condition = own(def, 'condition');
        if (condition !== undefined) {
          collect(condition, level + 1);
        }
      }
    };
    Object.keys(encoding).forEach(channel => collect(own(encoding, channel)));
    const used = new Set<string>();
    rows.forEach(row => Object.keys(row).forEach(key => used.add(key)));
    definitions.forEach(def => {
      const f = text(own(def, 'field'));
      if (f) {
        used.add(f);
      }
    });
    const alias = (): string => {
      let field: string;
      do {
        field = `__vega_${aliasId++}`;
      } while (used.has(field));
      used.add(field);
      return field;
    };
    const materialized = new Map<string, string>();
    const aggregated = new Map<string, string>();
    const groupby: string[] = [];
    const aggregates: VegaDataRow[] = [];
    for (const def of definitions) {
      const original = text(own(def, 'field'));
      let field = original;
      const temporal = own(def, 'timeUnit');
      if (original !== undefined && (temporal !== undefined || /[.\[\]\\]/.test(original))) {
        if (temporal !== undefined) {
          try {
            timeUnit(null, temporal);
          } catch (error) {
            fail(options, error instanceof Error ? error.message : 'invalid timeUnit');
          }
        }
        // Serialize only known primitive options, never arbitrary toJSON/coercion hooks.
        const key = JSON.stringify([
          original,
          typeof temporal === 'string' ? temporal : text(own(temporal, 'unit')),
          own(temporal, 'utc') === true,
          own(temporal, 'binned') === true,
          numeric(own(temporal, 'step')),
        ]);
        field = materialized.get(key);
        if (!field) {
          field = alias();
          const target = field;
          spend(options, rows.length * (original.length + 1));
          rows = rows.map(sourceRow => {
            const row = clone(sourceRow);
            const value = readVegaField(sourceRow, original);
            try {
              put(row, target, temporal === undefined ? clone(value) : timeUnit(value, temporal));
            } catch (error) {
              fail(options, error instanceof Error ? error.message : 'invalid timeUnit');
              put(row, target, null);
            }
            return row;
          });
          materialized.set(key, field);
        }
        put(def, 'field', field);
      }
      delete def.timeUnit;
      const op = own(def, 'aggregate');
      if (op !== undefined) {
        const parsed = operation(op);
        const key = parsed ? JSON.stringify([field, parsed.name, parsed.parameter]) : undefined;
        let target = key === undefined ? undefined : aggregated.get(key);
        if (target === undefined) {
          target = alias();
          aggregates.push({ op, field, as: target });
          if (key !== undefined) {
            aggregated.set(key, target);
          }
        }
        put(def, 'field', target);
        delete def.aggregate;
      } else if (field !== undefined && !groupby.includes(field)) {
        groupby.push(field);
      }
    }
    if (aggregates.length) {
      rows = aggregateRows(rows, { aggregate: aggregates, groupby }, false, options);
    }
    put(node, 'data', { values: rows });
    if (Object.keys(encoding).length) {
      put(node, 'encoding', encoding);
    }
    return node;
  };
  return prepare(copy, undefined, {}, 0) as unknown as VegaLiteSpec;
}
