import type { VegaLiteData, VegaLiteSemanticMode, VegaLiteSpec } from './VegaLiteTypes';
import { canRenderVegaRangedSpec } from './VegaLiteRangedGeometry';
import { canRenderVegaCenteredAreaSpec } from './VegaLiteCenteredArea';
import { parseVegaDataValues } from './VegaLiteResourceLoader';
import { readVegaField } from './VegaLiteField';

export type VegaLiteDiagnostic = {
  code: string;
  path: string;
  severity: 'warning' | 'error';
  message: string;
  remedy: string;
};

export type VegaLiteDiagnosticOptions = {
  mode?: VegaLiteSemanticMode;
  /** The host will resolve declared resources before rendering. This does not authorize I/O. */
  allowExternalData?: boolean;
};

type Dictionary = Record<string, unknown>;
type Scope = {
  datasets: Map<string, unknown>;
  encoding: Dictionary;
  encodingPaths: Map<string, string>;
  rows: unknown[];
  transformed: boolean;
  repeats: Set<string>;
  inLayer: boolean;
  rangedLayer: boolean;
  centeredAreaLayer: boolean;
};

// Capability declarations describe the semantic pipeline plus renderer, NOT the entire Vega-Lite schema.
// In particular, a native fallback to a line/scatter chart is not implementation of the requested mark.
const aggregateOps = new Set([
  'count',
  'sum',
  'mean',
  'average',
  'median',
  'min',
  'max',
  'valid',
  'missing',
  'distinct',
  'values',
  'product',
  'q1',
  'q3',
  'variance',
  'variancep',
  'stdev',
  'stdevp',
  'stderr',
  'argmin',
  'argmax',
]);
const windowOps = new Set([
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
]);
const fieldTypes = new Set(['quantitative', 'temporal', 'ordinal', 'nominal']);
const positions = new Set(['x', 'y', 'x2', 'y2', 'xOffset', 'yOffset']);
const compositions = ['layer', 'hconcat', 'vconcat', 'concat', 'facet', 'repeat'];
const rangedTypes = new Set(['bar', 'rect', 'tick']);
const rangedScales = new Set(['linear', 'band', 'ordinal', 'time', 'utc']);
const tooltipConfigMarks = ['mark', 'line', 'point', 'circle', 'square', 'bar', 'area', 'rect', 'arc', 'tick'];
const nativeChannels: Record<string, readonly string[]> = {
  line: ['x', 'y', 'color', 'size', 'tooltip'],
  point: ['x', 'y', 'color', 'size', 'tooltip'],
  circle: ['x', 'y', 'color', 'size', 'tooltip'],
  square: ['x', 'y', 'color', 'size', 'tooltip'],
  bar: ['x', 'y', 'color', 'tooltip'],
  area: ['x', 'y', 'color', 'tooltip'],
  rect: ['x', 'y', 'color', 'tooltip'],
  rule: ['x', 'y'],
  text: ['x', 'y', 'text'],
  arc: ['theta', 'radius', 'color', 'tooltip'],
  tick: ['x', 'y', 'x2', 'y2', 'xOffset', 'yOffset', 'color', 'tooltip'],
};
const channelProperties: Record<string, readonly string[]> = {
  position: [
    'field',
    'type',
    'axis',
    'value',
    'datum',
    'scale',
    'sort',
    'bin',
    'stack',
    'aggregate',
    'title',
    'timeUnit',
    'tooltip',
  ],
  color: ['field', 'type', 'legend', 'scale', 'value', 'condition', 'aggregate', 'timeUnit', 'title', 'tooltip'],
  size: ['field', 'type', 'value', 'aggregate', 'title', 'tooltip'],
  shape: ['field', 'type', 'value', 'aggregate', 'title', 'tooltip'],
  theta: ['field', 'type', 'aggregate', 'axis', 'scale', 'title', 'tooltip'],
  radius: ['field', 'type', 'aggregate', 'axis', 'scale', 'title', 'tooltip'],
  text: ['field', 'type', 'value', 'datum', 'aggregate', 'format', 'formatType', 'title', 'tooltip'],
  tooltip: ['field', 'type', 'value', 'datum', 'aggregate', 'title', 'timeUnit', 'format', 'formatType', 'tooltip'],
  order: ['field', 'type', 'sort'],
};
const transformProperties: Record<string, readonly string[]> = {
  filter: ['filter'],
  calculate: ['calculate', 'as'],
  aggregate: ['aggregate', 'groupby'],
  joinaggregate: ['joinaggregate', 'groupby'],
  window: ['window', 'groupby', 'sort', 'frame', 'ignorePeers'],
  timeUnit: ['timeUnit', 'field', 'as'],
  fold: ['fold', 'as'],
  lookup: ['lookup', 'from', 'as', 'default'],
  impute: ['impute', 'key', 'keyvals', 'method', 'groupby', 'value', 'frame'],
  quantile: ['quantile', 'groupby', 'probs', 'step', 'as'],
  regression: ['regression', 'on', 'method', 'groupby', 'extent', 'params', 'as'],
  loess: ['loess', 'on', 'bandwidth', 'groupby', 'as'],
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
const topProperties = [
  '$schema',
  'title',
  'description',
  'width',
  'height',
  'data',
  'datasets',
  'mark',
  'encoding',
  ...compositions,
  'columns',
  'spec',
  'transform',
  'background',
  'padding',
  'autosize',
  'config',
  'selection',
  'params',
  'resolve',
];

const isRecord = (value: unknown): value is Dictionary =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date);
const record = (value: unknown): Dictionary => (isRecord(value) ? value : Object.create(null));
const own = (value: unknown, key: string): unknown =>
  value !== null && typeof value === 'object' ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
const has = (value: unknown, key: string): boolean =>
  value !== null && typeof value === 'object' && Object.getOwnPropertyDescriptor(value, key) !== undefined;
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const nonempty = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
const childPath = (path: string, key: string): string =>
  /^[A-Za-z_$][\w$]*$/.test(key)
    ? `${path}.${key}`
    : /^(0|[1-9]\d*)$/.test(key)
    ? `${path}[${key}]`
    : `${path}[${JSON.stringify(key)}]`;

/**
 * Pure, bounded preflight of the supported Fluent Vega-Lite subset. No expression evaluation, resource
 * fetching, logging or rendering takes place. Own data descriptors are copied before semantic inspection,
 * so getters, prototype properties and coercion hooks cannot become specification instructions.
 * All strict-mode diagnostics have error severity; malformed/unsafe input is an error in either mode.
 */
export function validateVegaLiteSpec(spec: unknown, options: VegaLiteDiagnosticOptions = {}): VegaLiteDiagnostic[] {
  const diagnostics: VegaLiteDiagnostic[] = [];
  const reported = new Set<string>();
  const strict = own(options, 'mode') === 'strict';
  const externalData = own(options, 'allowExternalData') === true;
  const report = (code: string, path: string, message: string, remedy: string, invalid = false): void => {
    const identity = JSON.stringify([code, path]);
    if (reported.has(identity)) {
      return;
    }
    reported.add(identity);
    diagnostics.push({ code, path, severity: strict || invalid ? 'error' : 'warning', message, remedy });
  };
  const unsupported = (path: string, message: string): void =>
    report('unsupported-property', path, message, 'Remove this property or implement its semantics before rendering.');
  const invalid = (code: string, path: string, message: string, remedy = 'Use a valid Vega-Lite declaration.'): void =>
    report(code, path, message, remedy, true);

  // Bounded DFS: shared objects are permitted, ancestor cycles are not. Even data rows are inspected;
  // an accessor in an array element must not be invoked by Array#map or a later native adapter.
  let work = 0;
  let semanticWork = 0;
  let stopped = false;
  const spend = (amount: number, path: string): boolean => {
    if (stopped) {
      return false;
    }
    semanticWork += amount;
    if (semanticWork > 100000) {
      invalid(
        'work-limit',
        path,
        'Semantic inspection exceeds 100000 operations.',
        'Reduce the data/view count or precompute compatible fields.',
      );
      stopped = true;
      return false;
    }
    return true;
  };
  const ancestors = new Set<object>();
  const snapshot = (value: unknown, path: string, depth: number): unknown => {
    if (stopped) {
      return undefined;
    }
    if (++work > 100000) {
      invalid(
        'work-limit',
        path,
        'Specification inspection exceeds 100000 values.',
        'Reduce the data or specification size.',
      );
      stopped = true;
      return undefined;
    }
    if (depth > 64) {
      invalid('depth-limit', path, 'Specification nesting exceeds 64 levels.', 'Reduce nested views or data objects.');
      stopped = true;
      return undefined;
    }
    if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
      invalid('unsafe-value', path, 'Specifications must contain data, not callable or non-JSON values.');
      return undefined;
    }
    if (value === null || typeof value !== 'object') {
      return value;
    }
    let date: boolean;
    let array: boolean;
    try {
      date = value instanceof Date;
      array = Array.isArray(value);
    } catch {
      invalid(
        'invalid-spec',
        path,
        'Object type could not be inspected safely.',
        'Pass plain JSON data instead of exotic objects.',
      );
      stopped = true;
      return undefined;
    }
    if (date) {
      // Do not call an overridden getTime or toJSON method.
      try {
        return new Date(Date.prototype.getTime.call(value));
      } catch {
        invalid('invalid-data', path, 'Invalid date object.');
        return undefined;
      }
    }
    if (ancestors.has(value)) {
      invalid(
        'cycle',
        path,
        'Cyclic specifications cannot be rendered.',
        'Replace the cycle with an acyclic JSON specification.',
      );
      stopped = true;
      return undefined;
    }
    ancestors.add(value);
    const result = array ? [] : Object.create(null);
    try {
      const keys = Object.getOwnPropertyNames(value);
      if (array) {
        const length = own(value, 'length');
        if (typeof length !== 'number' || length > 100000 - work) {
          invalid(
            'work-limit',
            path,
            'Array length exceeds the remaining inspection budget.',
            'Reduce large or sparse arrays before validation.',
          );
          stopped = true;
        } else {
          Object.defineProperty(result, 'length', { value: length });
        }
      }
      if (keys.length > 100000 - work) {
        invalid(
          'work-limit',
          path,
          'Specification inspection exceeds 100000 properties.',
          'Reduce the data or specification size.',
        );
        stopped = true;
      }
      for (const key of keys) {
        if (stopped) {
          break;
        }
        if (array && key === 'length') {
          continue;
        }
        const target = childPath(path, key);
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || !('value' in descriptor)) {
          invalid(
            'unsafe-accessor',
            target,
            'Accessor properties are not specification data.',
            'Replace the getter/setter with an own data property.',
          );
          continue;
        }
        if (array && !/^(0|[1-9]\d*)$/.test(key)) {
          invalid(
            'invalid-spec',
            target,
            'Array-owned named properties are not JSON specification data.',
            'Use plain arrays without custom methods or named properties.',
          );
          continue;
        }
        Object.defineProperty(result, key, {
          value: snapshot(descriptor.value, target, depth + 1),
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
    } catch {
      invalid(
        'invalid-spec',
        path,
        'Object properties could not be inspected safely.',
        'Pass plain JSON data instead of exotic objects.',
      );
      stopped = true;
    }
    ancestors.delete(value);
    return result;
  };
  const input = snapshot(spec, '$', 0);
  if (stopped) {
    return diagnostics;
  }
  if (!isRecord(input)) {
    invalid('invalid-spec', '$', 'A Vega-Lite specification must be an object.');
    return diagnostics;
  }
  const schema = own(input, '$schema');
  if ((typeof schema === 'string' && /\/vega\//i.test(schema)) || has(input, 'marks') || has(input, 'signals')) {
    invalid(
      'raw-vega',
      '$',
      'Raw Vega specifications are not supported by the Vega-Lite adapter.',
      'Convert the specification to Vega-Lite or use a Vega runtime.',
    );
    return diagnostics;
  }

  const properties = (value: Dictionary, path: string, allowed: readonly string[]): void => {
    Object.keys(value).forEach(key => {
      if (!allowed.includes(key)) {
        unsupported(childPath(path, key), 'This property has no implemented semantics in this context.');
      }
    });
  };
  // buildVegaTooltip reads these values at mark > config[type] > config.mark precedence.
  // This is deliberately not general mark/config normalization.
  const tooltipSetting = (value: unknown, path: string): void => {
    if (value === null || typeof value === 'boolean' || typeof value === 'string') {
      return;
    }
    if (!isRecord(value)) {
      invalid('invalid-field', path, 'Tooltip must be boolean, null, text or a content declaration.');
      return;
    }
    properties(value, path, ['content']);
    if (!['encoding', 'data'].includes(own(value, 'content') as string)) {
      unsupported(`${path}.content`, 'Tooltip content must be encoding or data.');
    }
  };
  const configuration = (value: unknown, path: string): void => {
    if (!isRecord(value)) {
      invalid('invalid-spec', path, 'Configuration must be a record.');
      return;
    }
    properties(value, path, [...tooltipConfigMarks, 'numberFormat', 'timeFormat']);
    for (const key of ['numberFormat', 'timeFormat']) {
      if (has(value, key) && typeof own(value, key) !== 'string') {
        invalid('invalid-field', `${path}.${key}`, 'Tooltip format defaults must be strings.');
      }
    }
    for (const key of Object.keys(value).filter(name => tooltipConfigMarks.includes(name))) {
      const setting = own(value, key);
      if (!isRecord(setting)) {
        invalid('invalid-spec', `${path}.${key}`, 'Mark configuration must be a record.');
        continue;
      }
      properties(setting, `${path}.${key}`, ['tooltip']);
      if (has(setting, 'tooltip')) {
        tooltipSetting(own(setting, 'tooltip'), `${path}.${key}.tooltip`);
      }
    }
  };
  const stringFields = (value: unknown, path: string): void => {
    if (!Array.isArray(value)) {
      invalid('invalid-transform', path, 'Expected an array of field names.');
      return;
    }
    value.forEach((field, index) => {
      if (!nonempty(field)) {
        invalid('invalid-field', `${path}[${index}]`, 'Field names must be nonempty strings.');
      }
    });
  };
  const aggregate = (op: unknown, path: string, windowMeasure = false): void => {
    if (typeof op === 'string') {
      if (aggregateOps.has(op) || (windowMeasure && windowOps.has(op))) {
        return;
      }
      if (op === 'exponential' || op === 'exponentialb') {
        invalid(
          'invalid-aggregate',
          path,
          'Exponential operations require a retention parameter.',
          'Use { exponential: b } or { exponentialb: b } with 0 <= b <= 1.',
        );
      } else {
        report(
          windowMeasure ? 'unsupported-window-op' : 'unsupported-aggregate',
          path,
          'This statistical operation is not implemented.',
          'Use an implemented operation or precompute this statistic.',
        );
      }
      return;
    }
    const keys = Object.keys(record(op));
    if (keys.length === 1 && (keys[0] === 'exponential' || keys[0] === 'exponentialb')) {
      const parameter = own(op, keys[0]);
      if (finite(parameter) && parameter >= 0 && parameter <= 1) {
        return;
      }
      invalid('invalid-aggregate', path, 'Exponential retention must be finite and between zero and one, inclusive.');
    } else if (keys.length === 1 && (keys[0] === 'argmin' || keys[0] === 'argmax') && nonempty(own(op, keys[0]))) {
      report(
        'unsupported-aggregate',
        path,
        'Object argmin/argmax projection syntax is not implemented.',
        'Precompute the selected record, or use the scalar argmin/argmax operation in a transform.',
      );
    } else {
      invalid(
        'invalid-aggregate',
        path,
        'Aggregate must be an implemented operation or a single parameterized operation.',
      );
    }
  };
  const frame = (value: unknown, path: string): void => {
    if (
      !Array.isArray(value) ||
      value.length !== 2 ||
      value.some(v => v !== null && (!finite(v) || !Number.isInteger(v))) ||
      (value[0] !== null && value[1] !== null && (value[0] as number) > (value[1] as number))
    ) {
      invalid('invalid-transform', path, 'Frame must contain two ordered integer/null bounds.');
    }
  };
  const timeUnit = (value: unknown, path: string): void => {
    const rawUnit = typeof value === 'string' ? value : own(value, 'unit');
    if (isRecord(value)) {
      properties(value, path, ['unit', 'utc', 'step', 'binned']);
      const step = own(value, 'step');
      if (step !== undefined && (!finite(step) || !Number.isSafeInteger(step) || step < 1)) {
        invalid('invalid-transform', `${path}.step`, 'Time-unit step must be a positive integer.');
      }
      for (const key of ['utc', 'binned']) {
        if (has(value, key) && typeof own(value, key) !== 'boolean') {
          invalid('invalid-transform', `${path}.${key}`, 'Time-unit flags must be boolean.');
        }
      }
    }
    if (typeof rawUnit !== 'string') {
      invalid('invalid-transform', path, 'Time-unit name is required.');
      return;
    }
    const unit = rawUnit.replace(/^binned/, '').replace(/^utc/, '');
    const parts: string[] =
      unit.match(/dayofyear|isoweek|year|quarter|month|week|date|day|hours|minutes|seconds|milliseconds/g) ?? [];
    if (
      !parts.length ||
      parts.join('') !== unit ||
      ((parts.includes('week') || parts.includes('isoweek') || parts.includes('day')) &&
        parts.some(p => ['month', 'quarter', 'date'].includes(p))) ||
      (parts.includes('week') && parts.includes('isoweek')) ||
      (parts.includes('dayofyear') &&
        parts.some(p => ['week', 'isoweek', 'day', 'month', 'quarter', 'date'].includes(p)))
    ) {
      unsupported(path, 'This calendar time-unit combination is not implemented.');
    }
  };
  const sort = (value: unknown, path: string): void => {
    if (value === null || value === 'ascending' || value === 'descending') {
      return;
    }
    if (Array.isArray(value)) {
      if (value.some(v => typeof v !== 'string' && !finite(v))) {
        invalid('invalid-field', path, 'Sort values must be scalar strings/numbers.');
      }
    } else if (isRecord(value)) {
      properties(value, path, ['field', 'op', 'order']);
      if (has(value, 'field') && !nonempty(own(value, 'field'))) {
        invalid('invalid-field', `${path}.field`, 'Sort field must be a string.');
      }
      if (has(value, 'op')) {
        aggregate(own(value, 'op'), `${path}.op`);
      }
      if (has(value, 'order') && !['ascending', 'descending'].includes(own(value, 'order') as string)) {
        invalid('invalid-field', `${path}.order`, 'Sort order must be ascending or descending.');
      }
    } else {
      invalid('invalid-field', path, 'Invalid sort declaration.');
    }
  };
  const predicate = (value: unknown, path: string): void => {
    if (typeof value === 'string') {
      if (!value.trim()) {
        invalid('invalid-transform', path, 'Filter expression cannot be empty.');
      }
      return; // Expressions are never evaluated during structural preflight.
    }
    if (!isRecord(value) || has(value, 'param') || has(value, 'selection')) {
      report(
        'unsupported-condition',
        path,
        'Selection/parameter predicates are not implemented.',
        'Use a supported field predicate or test expression.',
      );
      return;
    }
    const logical = ['and', 'or', 'not'].filter(key => has(value, key));
    if (logical.length) {
      properties(value, path, [logical[0]]);
      const key = logical[0];
      const nested = own(value, key);
      if (key === 'not') {
        predicate(nested, `${path}.not`);
      } else if (!Array.isArray(nested)) {
        invalid('invalid-transform', `${path}.${key}`, 'Logical predicates require an array.');
      } else {
        nested.forEach((p, index) => predicate(p, `${path}.${key}[${index}]`));
      }
      return;
    }
    properties(value, path, ['field', 'timeUnit', 'equal', 'oneOf', 'range', 'valid', 'lt', 'lte', 'gt', 'gte']);
    if (!nonempty(own(value, 'field'))) {
      invalid('invalid-field', `${path}.field`, 'Predicate field must be a nonempty string.');
    }
    const ops = ['equal', 'oneOf', 'range', 'valid', 'lt', 'lte', 'gt', 'gte'].filter(key => has(value, key));
    if (ops.length !== 1) {
      invalid('invalid-transform', path, 'Field predicates require exactly one comparison.');
    }
    if (has(value, 'oneOf') && !Array.isArray(own(value, 'oneOf'))) {
      invalid('invalid-transform', `${path}.oneOf`, 'oneOf must be an array.');
    }
    if (has(value, 'range') && list(own(value, 'range')).length !== 2) {
      invalid('invalid-transform', `${path}.range`, 'Range predicates require two bounds.');
    }
    if (has(value, 'valid') && typeof own(value, 'valid') !== 'boolean') {
      invalid('invalid-transform', `${path}.valid`, 'valid must be boolean.');
    }
    if (has(value, 'timeUnit')) {
      timeUnit(own(value, 'timeUnit'), `${path}.timeUnit`);
    }
  };

  // Vega-Lite 6.5 TooltipFieldFilter is NOT a row filter: field/timeUnit belong to the
  // enclosing array field definition. Validate structure only, including every logical branch;
  // buildVegaTooltip would evaluate/aggregate source tuples and is not a preflight operation.
  const tooltipBound = (value: unknown, path: string, kind: string): string | undefined => {
    if (finite(value)) {
      return 'number';
    }
    if (kind !== 'range' && typeof value === 'string') {
      return 'string';
    }
    if (['equal', 'oneOf'].includes(kind) && typeof value === 'boolean') {
      return 'boolean';
    }
    if (kind === 'range' && value === null) {
      return 'null';
    }
    if (!isRecord(value)) {
      invalid(
        'invalid-tooltip-filter',
        path,
        'Predicate bounds must be supported finite scalars or DateTime literals.',
      );
      return undefined;
    }
    const dateKeys = ['year', 'quarter', 'month', 'date', 'day', 'hours', 'minutes', 'seconds', 'milliseconds', 'utc'];
    properties(value, path, dateKeys);
    if (!Object.keys(value).some(key => key !== 'utc' && dateKeys.includes(key))) {
      invalid('invalid-tooltip-filter', path, 'DateTime bounds require at least one calendar component.');
    }
    for (const key of Object.keys(value).filter(name => dateKeys.includes(name))) {
      const component = own(value, key);
      const target = childPath(path, key);
      if (key === 'utc') {
        if (typeof component !== 'boolean') {
          invalid('invalid-tooltip-filter', target, 'DateTime utc must be boolean.');
        }
        continue;
      }
      const names =
        key === 'month'
          ? [
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
            ]
          : key === 'day'
          ? ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          : [];
      if (
        typeof component === 'string' &&
        names.some(name => name === component.toLowerCase() || name.slice(0, 3) === component.toLowerCase())
      ) {
        continue;
      }
      const bounds: Record<string, [number, number]> = {
        quarter: [1, 4],
        month: [1, 12],
        date: [1, 31],
        day: [0, 6],
        hours: [0, 23],
        minutes: [0, 59],
        seconds: [0, 59],
        milliseconds: [0, 999],
      };
      const limits = own(bounds, key) as [number, number] | undefined;
      if (
        !finite(component) ||
        !Number.isInteger(component) ||
        (limits && (component < limits[0] || component > limits[1]))
      ) {
        invalid('invalid-tooltip-filter', target, 'DateTime components must be valid finite calendar values.');
      }
    }
    return 'datetime';
  };
  const tooltipFilter = (value: unknown, path: string): void => {
    if (!spend(1, path)) {
      return;
    }
    if (!isRecord(value)) {
      invalid(
        'invalid-tooltip-filter',
        path,
        'Tooltip filters require field-bound predicate objects, not expressions.',
      );
      return;
    }
    const operations = ['and', 'or', 'not', 'equal', 'oneOf', 'range', 'valid', 'lt', 'lte', 'gt', 'gte'];
    properties(value, path, operations);
    const keys = Object.keys(value).filter(key => operations.includes(key));
    if (keys.length !== 1 || Object.keys(value).length !== 1) {
      invalid(
        'invalid-tooltip-filter',
        path,
        'Each tooltip predicate must contain exactly one logical or comparison operation.',
      );
    }
    for (const key of keys) {
      const argument = own(value, key);
      const target = childPath(path, key);
      if (key === 'not') {
        tooltipFilter(argument, target);
      } else if (key === 'and' || key === 'or') {
        if (!Array.isArray(argument) || !argument.length) {
          invalid('invalid-tooltip-filter', target, 'Logical tooltip predicates require a nonempty array.');
        } else {
          for (let index = 0; index < argument.length; index++) {
            tooltipFilter(own(argument, String(index)), `${target}[${index}]`);
          }
        }
      } else if (key === 'valid') {
        if (typeof argument !== 'boolean') {
          invalid('invalid-tooltip-filter', target, 'valid must be boolean.');
        }
      } else if (key === 'oneOf' || key === 'range') {
        if (!Array.isArray(argument) || (key === 'range' && argument.length !== 2)) {
          invalid('invalid-tooltip-filter', target, 'oneOf requires an array; range requires exactly two bounds.');
        } else {
          const families = new Set<string>();
          for (let index = 0; index < argument.length; index++) {
            const family = tooltipBound(own(argument, String(index)), `${target}[${index}]`, key);
            if (family) {
              families.add(family);
            }
          }
          if (key === 'oneOf' && families.size > 1) {
            invalid('invalid-tooltip-filter', target, 'oneOf must contain a homogeneous array of supported values.');
          }
        }
      } else {
        tooltipBound(argument, target, key);
      }
    }
  };

  const validateRows = (rows: unknown, path: string): void => {
    if (!Array.isArray(rows)) {
      invalid('invalid-data', path, 'Inline data must be an array of records.');
    } else {
      for (let index = 0; index < rows.length; index++) {
        if (!isRecord(rows[index])) {
          invalid('invalid-data', `${path}[${index}]`, 'Each data row must be a record.');
        }
      }
    }
  };
  const parsedSources = new WeakMap<Dictionary, unknown[]>();
  const data = (value: unknown, path: string, datasets: Map<string, unknown>): void => {
    if (!isRecord(value)) {
      invalid('invalid-data', path, 'Data sources must be objects.');
      return;
    }
    properties(value, path, ['values', 'name', 'url', 'format']);
    const sources = ['values', 'name', 'url'].filter(key => has(value, key));
    if (sources.length !== 1) {
      invalid('invalid-data', path, 'Declare exactly one of data.values, data.name or data.url.');
    }
    if (has(value, 'values')) {
      if (typeof own(value, 'values') !== 'string') {
        validateRows(own(value, 'values'), `${path}.values`);
      }
    }
    if (has(value, 'name')) {
      const name = own(value, 'name');
      if (!nonempty(name)) {
        invalid('invalid-data', `${path}.name`, 'Dataset names must be nonempty strings.');
      } else if (!datasets.has(name)) {
        report(
          'unresolved-data',
          `${path}.name`,
          'No own local or ancestor dataset has this name.',
          'Declare the dataset in this view or an ancestor datasets object.',
        );
      }
    }
    if (has(value, 'url')) {
      const url = own(value, 'url');
      if (!nonempty(url)) {
        invalid('invalid-data', `${path}.url`, 'Data URLs must be nonempty strings.');
      } else if (
        /^[\s]|[\s]$|[\u0000-\u001f\u007f\\]/.test(url) ||
        (/^[a-z][a-z\d+.-]*:/i.test(url) && !/^https?:\/\//i.test(url)) ||
        /^https?:\/\/[^/]*@/i.test(url)
      ) {
        invalid(
          'invalid-data',
          `${path}.url`,
          'Resource URLs must be HTTP/S or relative references without credentials.',
          'Use a safe URL and have the host enforce origin/redirect allowlists.',
        );
      } else if (!externalData) {
        report(
          'external-data-resolver',
          `${path}.url`,
          'External data requires an explicitly supplied host resolver.',
          'Resolve resources first, or supply a host resolver and validate with allowExternalData: true.',
        );
      }
    }
    let validFormat = true;
    if (has(value, 'format')) {
      const format = own(value, 'format');
      if (!isRecord(format)) {
        invalid('invalid-data', `${path}.format`, 'Data format must be an object.');
        return;
      }
      properties(format, `${path}.format`, ['type', 'property', 'parse']);
      const type = own(format, 'type');
      if (type !== undefined && !['json', 'csv', 'tsv'].includes(type as string)) {
        report(
          'unsupported-format',
          `${path}.format.type`,
          'Only JSON, CSV and TSV resources are implemented.',
          'Use a supported format or supply parsed inline records.',
        );
        validFormat = false;
      }
      if (has(format, 'property') && !nonempty(own(format, 'property'))) {
        invalid('invalid-data', `${path}.format.property`, 'Format property must be a nonempty own-property path.');
      }
      if (has(format, 'parse')) {
        const parse = own(format, 'parse');
        if (!isRecord(parse)) {
          invalid('invalid-data', `${path}.format.parse`, 'Parse declarations must be a record.');
          validFormat = false;
        } else {
          Object.keys(parse).forEach(key => {
            const target = childPath(`${path}.format.parse`, key);
            const declaration = own(parse, key);
            if (!spend(key.length + (typeof declaration === 'string' ? declaration.length : 1), target)) {
              validFormat = false;
              return;
            }
            try {
              // Ask the pure loader to compile declarations, not parse source rows or perform I/O.
              // Its regex/directive validation is authoritative, including invalid patterns on no data.
              parseVegaDataValues({ values: [], format: { parse: { [key]: declaration } } } as VegaLiteData, {
                maxRows: 0,
                maxTextLength: 100000,
                maxWork: 100000,
              });
            } catch {
              report(
                'unsupported-format',
                target,
                'This scalar parse declaration is invalid or unimplemented.',
                'Use number, boolean, date, string, or a valid date:/utc: D3 parse pattern.',
                true,
              );
              validFormat = false;
            }
          });
        }
      }
    }
    const name = own(value, 'name');
    const values = has(value, 'values')
      ? own(value, 'values')
      : typeof name === 'string'
      ? datasets.get(name)
      : undefined;
    if (validFormat && values !== undefined && (has(value, 'format') || typeof values === 'string')) {
      // Charge text/copy/parse work across all sources and inherited views. All values here came
      // from the descriptor-only snapshot; no source getters/coercion methods reach the parser.
      let cost = 0;
      const measure = (item: unknown): void => {
        cost += typeof item === 'string' ? item.length + 1 : 1;
        if (cost > 100000) {
          return;
        }
        if (Array.isArray(item)) {
          item.forEach(measure);
        } else if (isRecord(item)) {
          Object.keys(item).forEach(key => {
            cost += key.length;
            measure(own(item, key));
          });
        }
      };
      measure(values);
      if (!spend(cost, `${path}.values`)) {
        return;
      }
      try {
        const rows = parseVegaDataValues({ values, format: own(value, 'format') } as VegaLiteData, {
          maxRows: 100000,
          maxTextLength: 100000,
          maxWork: 100000 - semanticWork,
        });
        const parseFields = Object.keys(record(own(own(value, 'format'), 'parse')));
        if (spend(rows.length * (1 + parseFields.reduce((sum, key) => sum + key.length + 1, 0)), path)) {
          parsedSources.set(value, rows);
        }
      } catch (error) {
        const limit = error instanceof Error && /limit|budget/i.test(error.message);
        invalid(
          limit ? 'work-limit' : 'invalid-data',
          has(value, 'values') ? `${path}.values` : `${path}.format`,
          limit
            ? 'Data parsing exceeds the bounded inspection budget.'
            : 'Inline/named data cannot be parsed with this format.',
        );
      }
    }
  };

  const aliases = (value: unknown, path: string, defaults: string[], prefix = false): string[] => {
    if (value === undefined) {
      return defaults;
    }
    if (prefix && nonempty(value)) {
      return [value, `${value}_end`];
    }
    if (
      !Array.isArray(value) ||
      value.length > defaults.length ||
      value.some(name => name != null && !nonempty(name))
    ) {
      invalid(
        'invalid-transform',
        path,
        'Aliases must be an array of at most the output count, with nonempty strings/null defaults.',
      );
      return defaults;
    }
    const names = defaults.map((name, index) => value[index] ?? name) as string[];
    if (new Set(names).size !== names.length) {
      invalid('invalid-transform', path, 'Effective output aliases must be distinct.');
    }
    return names;
  };
  const transformSort = (value: unknown, path: string): void => {
    if (!Array.isArray(value)) {
      invalid('invalid-transform', path, 'Transform sort must be an array.');
      return;
    }
    value.forEach((definition, index) => {
      const target = `${path}[${index}]`;
      if (!isRecord(definition)) {
        invalid('invalid-transform', target, 'Transform sort definitions must be records.');
        return;
      }
      properties(definition, target, ['field', 'order']);
      if (!nonempty(own(definition, 'field'))) {
        invalid('invalid-field', `${target}.field`, 'Sort requires a field string.');
      }
      if (has(definition, 'order') && !['ascending', 'descending'].includes(own(definition, 'order') as string)) {
        invalid('invalid-transform', `${target}.order`, 'Sort order must be ascending or descending.');
      }
    });
  };

  const transforms = (value: unknown, path: string, scope: Scope): void => {
    if (!Array.isArray(value)) {
      invalid('invalid-transform', path, 'Transforms must be an array.');
      return;
    }
    if (value.length > 1000) {
      invalid('work-limit', path, 'Transform count exceeds 1000.', 'Reduce the transform pipeline.');
      return;
    }
    value.forEach((item, index) => {
      const target = `${path}[${index}]`;
      if (!isRecord(item)) {
        invalid('invalid-transform', target, 'Transform declarations must be objects.');
        return;
      }
      const kinds = Object.keys(transformProperties).filter(key => has(item, key));
      if (!kinds.length) {
        report(
          'unsupported-transform',
          target,
          'This transform has no implemented operation.',
          'Use a supported transform or precompute the data.',
        );
        return;
      }
      if (kinds.length !== 1) {
        invalid('invalid-transform', target, 'Transforms cannot contain conflicting operations.');
        return;
      }
      const kind = kinds[0];
      properties(item, target, transformProperties[kind]);
      if (has(item, 'groupby')) {
        stringFields(own(item, 'groupby'), `${target}.groupby`);
      }
      if (has(item, 'sort') && ['window', 'stack'].includes(kind)) {
        transformSort(own(item, 'sort'), `${target}.sort`);
      }
      if (kind === 'filter') {
        predicate(own(item, 'filter'), `${target}.filter`);
      }
      if (kind === 'calculate') {
        if (!nonempty(own(item, 'calculate'))) {
          invalid('invalid-transform', `${target}.calculate`, 'Calculate requires an expression string.');
        }
        if (!nonempty(own(item, 'as'))) {
          invalid('invalid-transform', `${target}.as`, 'Calculate requires an output field.');
        }
      }
      if (['aggregate', 'joinaggregate', 'window'].includes(kind)) {
        const measures = own(item, kind);
        if (!Array.isArray(measures)) {
          invalid('invalid-transform', `${target}.${kind}`, 'Statistical measures must be an array.');
        } else {
          measures.forEach((measure, i) => {
            const measurePath = `${target}.${kind}[${i}]`;
            if (!isRecord(measure)) {
              invalid('invalid-transform', measurePath, 'Measures must be objects.');
              return;
            }
            properties(
              measure,
              measurePath,
              kind === 'window' ? ['op', 'field', 'as', 'param'] : ['op', 'field', 'as'],
            );
            const op = own(measure, 'op');
            aggregate(op, `${measurePath}.op`, kind === 'window');
            if (has(measure, 'field') && !nonempty(own(measure, 'field'))) {
              invalid('invalid-field', `${measurePath}.field`, 'Measure field must be a string.');
            }
            if (has(measure, 'as') && !nonempty(own(measure, 'as'))) {
              invalid('invalid-field', `${measurePath}.as`, 'Output field must be a string.');
            }
            if (has(measure, 'param')) {
              const param = own(measure, 'param');
              const minimum = op === 'lag' || op === 'lead' ? 0 : 1;
              if (
                !['lag', 'lead', 'ntile', 'nth_value'].includes(op as string) ||
                !finite(param) ||
                !Number.isInteger(param) ||
                param < minimum
              ) {
                invalid(
                  'invalid-window-param',
                  `${measurePath}.param`,
                  'This operation requires an appropriate nonnegative/positive integer parameter, or takes no parameter.',
                );
              }
            }
          });
        }
        if (has(item, 'frame')) {
          frame(own(item, 'frame'), `${target}.frame`);
        }
        if (has(item, 'ignorePeers') && typeof own(item, 'ignorePeers') !== 'boolean') {
          invalid('invalid-transform', `${target}.ignorePeers`, 'ignorePeers must be boolean.');
        }
      }
      if (kind === 'fold' || kind === 'flatten') {
        const fields = own(item, kind);
        stringFields(fields, `${target}.${kind}`);
        if (Array.isArray(fields) && !fields.length) {
          invalid('invalid-transform', `${target}.${kind}`, 'At least one field is required.');
        }
        const names = aliases(
          own(item, 'as'),
          `${target}.as`,
          kind === 'fold'
            ? ['key', 'value']
            : list(fields).map((field, i) => (typeof field === 'string' ? field : `__invalid_${i}`)),
        );
        if (kind === 'fold' && list(own(item, 'as')).some(name => name == null)) {
          unsupported(
            `${target}.as`,
            'The fold kernel compacts null aliases rather than preserving their output position.',
          );
        }
        if (
          kind === 'flatten' &&
          has(item, 'index') &&
          (!nonempty(own(item, 'index')) || names.includes(own(item, 'index') as string))
        ) {
          invalid(
            'invalid-transform',
            `${target}.index`,
            'Flatten index must be a nonempty field distinct from output aliases.',
          );
        }
      }
      if (kind === 'bin') {
        if (!nonempty(own(item, 'field'))) {
          invalid('invalid-field', `${target}.field`, 'Bin requires a field string.');
        }
        const bin = own(item, 'bin');
        if (bin !== true && !isRecord(bin)) {
          invalid('invalid-transform', `${target}.bin`, 'Bin requires true or a parameter record.');
        }
        if (isRecord(bin)) {
          const binPath = `${target}.bin`;
          properties(bin, binPath, [
            'extent',
            'step',
            'steps',
            'maxbins',
            'base',
            'divide',
            'minstep',
            'nice',
            'anchor',
            'span',
          ]);
          for (const key of ['step', 'maxbins', 'base', 'minstep', 'span', 'anchor']) {
            const parameter = own(bin, key);
            const minimum = key === 'base' ? 1 : 0;
            if (
              has(bin, key) &&
              (!finite(parameter) ||
                (key !== 'anchor' && (key === 'minstep' ? parameter < minimum : parameter <= minimum)))
            ) {
              invalid(
                'invalid-transform',
                `${binPath}.${key}`,
                'Bin numeric parameters must be finite and within their implemented bounds.',
              );
            }
          }
          for (const key of ['steps', 'divide']) {
            const candidates = own(bin, key);
            if (
              has(bin, key) &&
              (!Array.isArray(candidates) ||
                !candidates.length ||
                candidates.some((n, i) => !finite(n) || n <= 0 || (key === 'steps' && i > 0 && n <= candidates[i - 1])))
            ) {
              invalid(
                'invalid-transform',
                `${binPath}.${key}`,
                'Bin candidates must be nonempty positive finite numbers; steps must strictly increase.',
              );
            }
          }
          if (has(bin, 'nice') && typeof own(bin, 'nice') !== 'boolean') {
            invalid('invalid-transform', `${binPath}.nice`, 'Bin nice must be boolean.');
          }
          const extent = own(bin, 'extent');
          if (
            has(bin, 'extent') &&
            (!Array.isArray(extent) || extent.length !== 2 || !extent.every(finite) || extent[0] > extent[1])
          ) {
            invalid('invalid-transform', `${binPath}.extent`, 'Bin extent must contain two ordered finite numbers.');
          }
        }
        aliases(own(item, 'as'), `${target}.as`, ['bin0', 'bin1'], true);
      }
      if (kind === 'pivot' || kind === 'stack') {
        for (const key of kind === 'pivot' ? ['pivot', 'value'] : ['stack']) {
          if (!nonempty(own(item, key))) {
            invalid('invalid-field', `${target}.${key}`, 'Transform requires nonempty field strings.');
          }
        }
        if (kind === 'pivot') {
          const op = own(item, 'op');
          if (has(item, 'op')) {
            if (typeof op !== 'string') {
              invalid('invalid-transform', `${target}.op`, 'Pivot operation must be a scalar aggregate name.');
            } else if (['values', 'argmin', 'argmax'].includes(op)) {
              unsupported(`${target}.op`, 'Pivot requires scalar aggregate output.');
            } else {
              aggregate(op, `${target}.op`);
            }
          }
          const limit = own(item, 'limit');
          if (has(item, 'limit') && (!finite(limit) || !Number.isSafeInteger(limit) || limit < 0)) {
            invalid('invalid-transform', `${target}.limit`, 'Pivot limit must be a nonnegative safe integer.');
          }
        } else {
          if (has(item, 'offset') && !['zero', 'normalize', 'center'].includes(own(item, 'offset') as string)) {
            unsupported(`${target}.offset`, 'This stack offset is not implemented.');
          }
          aliases(own(item, 'as'), `${target}.as`, ['y0', 'y1']);
        }
      }
      if (kind === 'sample') {
        const size = own(item, 'sample');
        if (!finite(size) || !Number.isSafeInteger(size) || size < 0) {
          invalid('invalid-transform', `${target}.sample`, 'Sample size must be a nonnegative safe integer.');
        }
      }
      if (kind === 'timeUnit') {
        timeUnit(own(item, 'timeUnit'), `${target}.timeUnit`);
        for (const key of ['field', 'as']) {
          if (!nonempty(own(item, key))) {
            invalid('invalid-field', `${target}.${key}`, 'Time-unit transforms require field/as strings.');
          }
        }
      }
      if (kind === 'lookup') {
        if (!nonempty(own(item, 'lookup'))) {
          invalid('invalid-field', `${target}.lookup`, 'Lookup requires a field.');
        }
        const from = own(item, 'from');
        if (!isRecord(from)) {
          invalid('invalid-transform', `${target}.from`, 'Lookup requires a data source and key.');
        } else {
          properties(from, `${target}.from`, ['data', 'key', 'fields']);
          data(own(from, 'data'), `${target}.from.data`, scope.datasets);
          if (!nonempty(own(from, 'key'))) {
            invalid('invalid-field', `${target}.from.key`, 'Lookup key must be a field string.');
          }
          if (has(from, 'fields')) {
            stringFields(own(from, 'fields'), `${target}.from.fields`);
          }
          if (!list(own(from, 'fields')).length && !nonempty(own(item, 'as')) && !list(own(item, 'as')).length) {
            invalid('invalid-transform', `${target}.as`, 'Whole-record lookups require an output field.');
          }
        }
      }
      if (kind === 'impute') {
        for (const key of ['impute', 'key']) {
          if (!nonempty(own(item, key))) {
            invalid('invalid-field', `${target}.${key}`, 'Impute requires field/key strings.');
          }
        }
        if (has(item, 'method') && !['value', 'mean', 'median', 'min', 'max'].includes(own(item, 'method') as string)) {
          unsupported(`${target}.method`, 'This imputation method is not implemented.');
        }
        if (has(item, 'frame')) {
          frame(own(item, 'frame'), `${target}.frame`);
        }
        const keyvals = own(item, 'keyvals');
        if (isRecord(keyvals)) {
          properties(keyvals, `${target}.keyvals`, ['start', 'stop', 'step']);
          const start = own(keyvals, 'start') ?? 0;
          const stop = own(keyvals, 'stop');
          const step = own(keyvals, 'step') ?? 1;
          if (
            !finite(start) ||
            !finite(stop) ||
            !finite(step) ||
            step === 0 ||
            (stop - start) / step < 0 ||
            (stop - start) / step > 10000
          ) {
            invalid(
              'invalid-transform',
              `${target}.keyvals`,
              'Impute sequence must be finite, ordered and bounded to 10000 keys.',
            );
          }
        } else if (keyvals !== undefined && !Array.isArray(keyvals)) {
          invalid('invalid-transform', `${target}.keyvals`, 'Impute keyvals must be an array or sequence.');
        }
      }
      if (kind === 'quantile') {
        if (!nonempty(own(item, 'quantile'))) {
          invalid('invalid-field', `${target}.quantile`, 'Quantile requires a field.');
        }
        const step = own(item, 'step');
        if (step !== undefined && (!finite(step) || step <= 0 || step > 1 || 1 / step > 10000)) {
          invalid(
            'invalid-transform',
            `${target}.step`,
            'Quantile step must be positive, at most one and bounded to 10000 samples.',
          );
        }
        if (has(item, 'probs')) {
          const probs = own(item, 'probs');
          if (!Array.isArray(probs) || probs.length > 10000 || probs.some(p => !finite(p) || p < 0 || p > 1)) {
            invalid(
              'invalid-transform',
              `${target}.probs`,
              'Quantile probabilities must be finite values between zero and one.',
            );
          }
        }
      }
      if (kind === 'regression') {
        for (const key of ['regression', 'on']) {
          if (!nonempty(own(item, key))) {
            invalid('invalid-field', `${target}.${key}`, 'Regression requires field strings.');
          }
        }
        if (has(item, 'method') && own(item, 'method') !== 'linear') {
          unsupported(`${target}.method`, 'Only linear regression is implemented.');
        }
        if (has(item, 'params') && typeof own(item, 'params') !== 'boolean') {
          invalid('invalid-transform', `${target}.params`, 'Regression params must be boolean.');
        }
      }
      if (kind === 'loess' || kind === 'density') {
        for (const key of kind === 'loess' ? ['loess', 'on'] : ['density']) {
          if (!nonempty(own(item, key))) {
            invalid('invalid-field', `${target}.${key}`, 'Statistics transforms require nonempty field strings.');
          }
        }
        const bandwidth = own(item, 'bandwidth');
        if (bandwidth !== undefined && (!finite(bandwidth) || bandwidth < 0 || (kind === 'loess' && bandwidth > 1))) {
          invalid(
            'invalid-transform',
            `${target}.bandwidth`,
            'Bandwidth must be finite and nonnegative; LOESS bandwidth is at most one. Zero selects the implemented default.',
          );
        }
        if (kind === 'density') {
          for (const key of ['counts', 'cumulative']) {
            if (has(item, key) && typeof own(item, key) !== 'boolean') {
              invalid('invalid-transform', `${target}.${key}`, 'Density flags must be boolean.');
            }
          }
          for (const key of ['steps', 'minsteps', 'maxsteps']) {
            const steps = own(item, key);
            if (steps !== undefined && (!finite(steps) || !Number.isInteger(steps) || steps < 0 || steps > 10000)) {
              invalid(
                'invalid-transform',
                `${target}.${key}`,
                'Density sampling must be an integer from zero to 10000. Zero selects the implemented default.',
              );
            }
          }
          if (has(item, 'resolve') && !['shared', 'independent'].includes(own(item, 'resolve') as string)) {
            invalid('invalid-transform', `${target}.resolve`, 'Density resolution must be shared or independent.');
          }
        }
      }
      if (kind === 'regression' || kind === 'density') {
        if (has(item, 'extent')) {
          const extent = own(item, 'extent');
          if (!Array.isArray(extent) || extent.length !== 2 || !extent.every(finite) || extent[0] > extent[1]) {
            invalid(
              'invalid-transform',
              `${target}.extent`,
              'Statistics extent must contain two ordered finite numbers.',
            );
          }
        }
      }
      if (['quantile', 'regression', 'loess', 'density'].includes(kind)) {
        const defaults =
          kind === 'quantile'
            ? ['prob', 'value']
            : kind === 'density'
            ? ['value', 'density']
            : [own(item, 'on') as string, own(item, kind) as string];
        aliases(own(item, 'as'), `${target}.as`, defaults);
        if (['quantile', 'regression'].includes(kind) && list(own(item, 'as')).some(name => name == null)) {
          unsupported(
            `${target}.as`,
            'This kernel compacts null aliases rather than preserving their output position.',
          );
        }
      }
      if (kind === 'lookup' && has(item, 'as')) {
        const as = own(item, 'as');
        if (typeof as !== 'string') {
          stringFields(as, `${target}.as`);
        } else if (!nonempty(as)) {
          invalid('invalid-transform', `${target}.as`, 'Lookup output must be a nonempty field.');
        }
      }
    });
  };

  const field = (value: unknown, path: string, scope: Scope): void => {
    if (nonempty(value)) {
      return;
    }
    const reference = own(value, 'repeat');
    if (
      isRecord(value) &&
      Object.keys(value).length === 1 &&
      typeof reference === 'string' &&
      scope.repeats.has(reference)
    ) {
      return;
    }
    invalid(
      'invalid-field',
      path,
      'Fields must be strings, or declared repeat references inside repeat templates.',
      'Use a field name or a reference to an active row/column/repeat declaration.',
    );
  };
  // Only inspect scalar data; never evaluate a field expression or invoke object coercion hooks.
  const readField = readVegaField;
  const fieldData = (definition: Dictionary, path: string, scope: Scope): void => {
    const name = own(definition, 'field');
    const type = own(definition, 'type');
    if (
      typeof name !== 'string' ||
      scope.transformed ||
      has(definition, 'aggregate') ||
      has(definition, 'timeUnit') ||
      has(definition, 'bin')
    ) {
      return;
    }
    if (!spend(scope.rows.length * (1 + Math.ceil(name.length / 16)), path)) {
      return;
    }
    const incompatible = scope.rows.some(row => {
      const value = readField(row, name);
      if (value === null || value === undefined || value === '') {
        return false;
      }
      if (type === 'quantitative') {
        return !finite(value) && !(typeof value === 'string' && value.trim() && Number.isFinite(Number(value)));
      }
      if (type === 'temporal') {
        return (
          !(value instanceof Date || typeof value === 'string' || finite(value)) ||
          Number.isNaN(
            value instanceof Date ? Date.prototype.getTime.call(value) : new Date(value as string | number).getTime(),
          )
        );
      }
      return (type === 'nominal' || type === 'ordinal') && typeof value === 'object';
    });
    if (incompatible) {
      invalid(
        'invalid-field-type',
        `${path}.type`,
        'Source values are incompatible with the declared field type.',
        'Correct the field type or explicitly parse/precompute compatible scalar values.',
      );
    }
  };
  const scale = (
    value: unknown,
    path: string,
    channel: string,
    mark: string,
    ranged: boolean,
    centeredArea: boolean,
    definition: Dictionary,
  ): void => {
    if (value === null) {
      return;
    }
    if (!isRecord(value)) {
      invalid('invalid-field', path, 'Scale must be an object or null.');
      return;
    }
    const geometry = ranged || centeredArea;
    properties(value, path, [
      'type',
      'domain',
      'range',
      'scheme',
      'zero',
      'reverse',
      ...(ranged ? ['paddingInner', 'paddingOuter'] : []),
      ...(geometry ? ['clamp'] : []),
    ]);
    const type = own(value, 'type');
    const discrete = ['nominal', 'ordinal'].includes(own(definition, 'type') as string);
    const color = channel === 'color';
    const rangedDiscrete =
      discrete ||
      ['band', 'ordinal'].includes(type as string) ||
      (has(definition, 'field') && own(definition, 'type') === undefined);
    if (geometry && has(value, 'clamp') && (color || rangedDiscrete)) {
      unsupported(`${path}.clamp`, 'Clamping is implemented only for continuous geometry position/offset scales.');
    }
    const supported =
      type === undefined ||
      (color
        ? ['ordinal', 'linear'].includes(type as string)
        : ranged
        ? rangedScales.has(type as string)
        : type === 'linear' ||
          (channel === 'y' && type === 'log' && ['line', 'point', 'circle', 'square', 'bar', 'area'].includes(mark)) ||
          (channel === 'x' && own(definition, 'type') === 'temporal' && ['time', 'utc'].includes(type as string)) ||
          (discrete && ['ordinal', 'band', 'point'].includes(type as string)));
    if (!supported) {
      report(
        'unsupported-scale',
        `${path}.type`,
        'This scale is not implemented for this mark/channel combination.',
        'Use a supported linear, categorical or native y-log scale, or precompute coordinates.',
      );
    }
    for (const key of ['zero', 'reverse', 'clamp']) {
      if (has(value, key) && typeof own(value, key) !== 'boolean') {
        invalid('invalid-field', `${path}.${key}`, 'Scale flags must be boolean.');
      }
    }
    if (own(value, 'reverse') === true && !geometry && !(color && mark === 'rect')) {
      unsupported(`${path}.reverse`, 'Scale reversal is ignored by this native renderer.');
    }
    for (const key of ['domain', 'range']) {
      const values = own(value, key);
      const temporalDomain =
        geometry &&
        !color &&
        key === 'domain' &&
        (own(definition, 'type') === 'temporal' || type === 'time' || type === 'utc');
      if (
        values !== undefined &&
        (!Array.isArray(values) ||
          values.some(
            v =>
              !(temporalDomain && v instanceof Date && Number.isFinite(Date.prototype.getTime.call(v))) &&
              typeof v !== 'string' &&
              !finite(v),
          ))
      ) {
        invalid(
          'invalid-field',
          `${path}.${key}`,
          'Scale domain/range must contain finite numbers or strings; ranged temporal domains also accept valid Dates.',
        );
      }
    }
    for (const key of ['paddingInner', 'paddingOuter']) {
      const padding = own(value, key);
      if (padding !== undefined && (!finite(padding) || padding < 0 || padding > 1)) {
        invalid('invalid-field', `${path}.${key}`, 'Band padding must be between zero and one.');
      }
    }
    if (has(value, 'scheme') && typeof own(value, 'scheme') !== 'string') {
      invalid('invalid-field', `${path}.scheme`, 'Scheme must be a string.');
    }
    if (!color && has(value, 'scheme')) {
      unsupported(`${path}.scheme`, 'Position scales do not implement color schemes.');
    }
    if (!geometry && !color && has(value, 'range')) {
      unsupported(`${path}.range`, 'Native position scale ranges are not configurable.');
    }
  };
  const encoding = (
    value: unknown,
    path: string,
    scope: Scope,
    mark: string,
    ranged: boolean,
    centerBar: boolean,
    centeredArea: boolean,
    geometry: boolean,
  ): void => {
    if (!isRecord(value)) {
      invalid('invalid-field', path, 'Encoding must be an object.');
      return;
    }
    // Native order is consumed only by vertical stacked bars/areas, not by ordinary bars, offsets,
    // ranged overlays, polar charts or nonstacked areas. Center geometry has its own proven contract.
    const x = record(own(value, 'x'));
    const y = record(own(value, 'y'));
    const nativeStack =
      !ranged &&
      !['x2', 'y2', 'xOffset', 'yOffset', 'theta', 'radius'].some(channel => has(value, channel)) &&
      ['bar', 'area'].includes(mark) &&
      nonempty(own(own(value, 'color'), 'field')) &&
      nonempty(own(x, 'field')) &&
      nonempty(own(y, 'field')) &&
      own(y, 'type') === 'quantitative' &&
      own(y, 'stack') !== null &&
      own(y, 'stack') !== 'center' &&
      (mark === 'area' || ['nominal', 'ordinal'].includes(own(x, 'type') as string));
    Object.keys(value).forEach(channel => {
      const target = scope.encodingPaths.get(channel) ?? childPath(path, channel);
      const allowed =
        channel === 'y' && centeredArea
          ? [...channelProperties.position, 'impute']
          : positions.has(channel)
          ? channelProperties.position
          : (own(channelProperties, channel) as readonly string[] | undefined);
      if (!allowed) {
        report(
          'unsupported-channel',
          target,
          'This encoding channel is not implemented.',
          'Remove the channel or precompute its effect.',
        );
        return;
      }
      const supported =
        channel === 'order'
          ? centerBar || centeredArea || nativeStack
          : ranged
          ? ['x', 'y', 'x2', 'y2', 'xOffset', 'yOffset', 'color', 'tooltip'].includes(channel)
          : list(own(nativeChannels, mark)).includes(channel) ||
            (['line', 'area', 'point'].includes(mark) &&
              has(value, 'theta') &&
              has(value, 'radius') &&
              ['theta', 'radius'].includes(channel));
      if (!supported) {
        report(
          'unsupported-combination',
          target,
          'This channel has no semantics for the selected renderer.',
          'Choose a compatible mark/channel combination.',
        );
      }
      const rawDefinition = own(value, channel);
      if (channel === 'tooltip' && rawDefinition === null) {
        return;
      }
      const definitions =
        ['tooltip', 'order'].includes(channel) && Array.isArray(rawDefinition) ? rawDefinition : [rawDefinition];
      definitions.forEach((definition, index) => {
        const definitionPath = definitions === rawDefinition ? `${target}[${index}]` : target;
        if (!isRecord(definition)) {
          invalid(
            'invalid-field',
            definitionPath,
            'Channel definitions must be objects (tooltip also accepts an array or null).',
          );
          return;
        }
        const filterable = channel === 'tooltip' && Array.isArray(rawDefinition);
        properties(definition, definitionPath, filterable ? [...allowed, 'filter'] : allowed);
        if (filterable && has(definition, 'filter')) {
          if (
            (!has(definition, 'field') && own(definition, 'aggregate') !== 'count') ||
            has(definition, 'value') ||
            has(definition, 'datum')
          ) {
            invalid(
              'invalid-field',
              `${definitionPath}.field`,
              'Tooltip filters belong to array field definitions or count aggregates.',
            );
          }
          tooltipFilter(own(definition, 'filter'), `${definitionPath}.filter`);
        }
        if (has(definition, 'tooltip') && typeof own(definition, 'tooltip') !== 'boolean') {
          invalid('invalid-field', `${definitionPath}.tooltip`, 'Field tooltip inclusion must be boolean.');
        }
        if (channel === 'order' && !has(definition, 'field')) {
          invalid('invalid-field', `${definitionPath}.field`, 'Stack order requires a field.');
        }
        if (has(definition, 'field')) {
          field(own(definition, 'field'), `${definitionPath}.field`, scope);
        }
        const type = own(definition, 'type');
        if (type !== undefined && !fieldTypes.has(type as string)) {
          invalid(
            'invalid-type',
            `${definitionPath}.type`,
            'This encoding field type is invalid or unsupported.',
            'Use quantitative, temporal, nominal or ordinal.',
          );
        }
        if (has(definition, 'datum') && positions.has(channel)) {
          const datum = own(definition, 'datum');
          const temporal = type === 'temporal';
          const valid = temporal
            ? (datum instanceof Date || typeof datum === 'string' || finite(datum)) &&
              Number.isFinite(
                datum instanceof Date
                  ? Date.prototype.getTime.call(datum)
                  : new Date(datum as string | number).getTime(),
              )
            : typeof datum === 'string' || finite(datum);
          if (!valid) {
            invalid(
              'invalid-field-type',
              `${definitionPath}.datum`,
              'Position datum must be a scalar compatible with its type; temporal anchors must be valid dates.',
            );
          }
        }
        fieldData(definition, definitionPath, scope);
        if (has(definition, 'aggregate')) {
          aggregate(own(definition, 'aggregate'), `${definitionPath}.aggregate`);
        }
        if (has(definition, 'timeUnit')) {
          timeUnit(own(definition, 'timeUnit'), `${definitionPath}.timeUnit`);
        }
        if (has(definition, 'condition')) {
          const condition = own(definition, 'condition');
          if (
            channel !== 'color' ||
            !isRecord(condition) ||
            typeof own(condition, 'test') !== 'string' ||
            typeof own(condition, 'value') !== 'string' ||
            Object.keys(condition).some(key => !['test', 'value'].includes(key))
          ) {
            report(
              'unsupported-condition',
              `${definitionPath}.condition`,
              'Only a single color test/value condition is implemented.',
              'Use a single test/value color condition or precompute a field.',
            );
          } else if (ranged) {
            report(
              'unsupported-condition',
              `${definitionPath}.condition`,
              'The ranged renderer does not evaluate color conditions.',
              'Precompute conditional colors before ranged rendering.',
            );
          }
        }
        if (has(definition, 'scale')) {
          if (channel === 'x2' || channel === 'y2') {
            unsupported(
              `${definitionPath}.scale`,
              'Secondary endpoints use the primary position scale; independent endpoint scales are ignored.',
            );
          }
          scale(own(definition, 'scale'), `${definitionPath}.scale`, channel, mark, ranged, centeredArea, definition);
        }
        if (has(definition, 'sort')) {
          if (channel === 'order' && !['ascending', 'descending'].includes(own(definition, 'sort') as string)) {
            invalid('invalid-field', `${definitionPath}.sort`, 'Stack order sort must be ascending or descending.');
          } else {
            sort(own(definition, 'sort'), `${definitionPath}.sort`);
          }
        }
        if (has(definition, 'axis')) {
          const axis = own(definition, 'axis');
          if (axis === null && !geometry) {
            report(
              'unsupported-property',
              `${definitionPath}.axis`,
              'Axis suppression is not implemented by the selected native renderer.',
              'Remove axis: null or use a supported ranged or centered-area renderer.',
            );
          } else if (axis !== null && !isRecord(axis)) {
            invalid('invalid-field', `${definitionPath}.axis`, 'Axis must be an object or null.');
          } else if (isRecord(axis)) {
            properties(axis, `${definitionPath}.axis`, ['title', 'format', 'values', 'tickCount', 'grid']);
            if (has(axis, 'format') && typeof own(axis, 'format') !== 'string') {
              invalid('invalid-field', `${definitionPath}.axis.format`, 'Axis format must be a string.');
            }
            if (has(axis, 'grid')) {
              unsupported(`${definitionPath}.axis.grid`, 'Grid visibility is not implemented.');
            }
            if (
              has(axis, 'tickCount') &&
              (!finite(own(axis, 'tickCount')) || (own(axis, 'tickCount') as number) <= 0)
            ) {
              invalid('invalid-field', `${definitionPath}.axis.tickCount`, 'Tick count must be a positive number.');
            }
          }
        }
        if (has(definition, 'legend')) {
          const legend = own(definition, 'legend');
          if (legend !== null && !isRecord(legend)) {
            invalid('invalid-field', `${definitionPath}.legend`, 'Legend must be an object or null.');
          } else if (isRecord(legend)) {
            properties(legend, `${definitionPath}.legend`, ['title', 'disable']);
            if (has(legend, 'title')) {
              unsupported(`${definitionPath}.legend.title`, 'Native legend titles are not implemented.');
            }
          }
        }
        if (has(definition, 'bin')) {
          const bin = own(definition, 'bin');
          const binnedEndpoint =
            bin === 'binned' &&
            channel === 'x' &&
            ranged &&
            rangedTypes.has(mark) &&
            nonempty(own(own(value, 'x2'), 'field'));
          if (
            bin !== false &&
            !(binnedEndpoint || (bin !== 'binned' && mark === 'bar' && channel === 'x' && !ranged))
          ) {
            unsupported(
              `${definitionPath}.bin`,
              'Binning requires a native x histogram, or a pre-binned ranged x position with an x2 field endpoint.',
            );
          }
          if (isRecord(bin)) {
            properties(bin, `${definitionPath}.bin`, ['maxbins', 'step', 'extent', 'base', 'anchor']);
            for (const key of ['maxbins', 'step', 'base']) {
              if (has(bin, key) && (!finite(own(bin, key)) || (own(bin, key) as number) <= 0)) {
                invalid(
                  'invalid-field',
                  `${definitionPath}.bin.${key}`,
                  'Bin parameters must be positive finite numbers.',
                );
              }
            }
            if (has(bin, 'anchor') && !finite(own(bin, 'anchor'))) {
              invalid('invalid-field', `${definitionPath}.bin.anchor`, 'Bin anchor must be a finite number.');
            }
          } else if (typeof bin !== 'boolean' && bin !== 'binned') {
            invalid('invalid-field', `${definitionPath}.bin`, 'Bin must be boolean, binned or a bin parameter object.');
          }
        }
        if (has(definition, 'stack')) {
          const stack = own(definition, 'stack');
          if (stack !== null && !['zero', 'center', 'normalize'].includes(stack as string)) {
            invalid('invalid-field', `${definitionPath}.stack`, 'Invalid stack offset.');
          } else if (stack === 'center' && centerBar && mark === 'bar' && ['x', 'y'].includes(channel)) {
            /* Predicate-proven linear center bar geometry. */
          } else if (stack === 'center' && centeredArea && mark === 'area' && channel === 'y') {
            /* Predicate-proven filled center area geometry. */
          } else if (stack === null && ranged && mark === 'bar' && ['x', 'y'].includes(channel)) {
            /* Explicit nonstacked ranged bar. */
          } else if (ranged || !['area', 'bar'].includes(mark) || channel !== 'y') {
            unsupported(`${definitionPath}.stack`, 'This renderer does not implement the declared stack offset.');
          } else if (stack === 'center') {
            unsupported(
              `${definitionPath}.stack`,
              'Native zero-baseline stacking does not implement centered stack geometry.',
            );
          }
        }
        for (const key of ['format', 'formatType']) {
          if (has(definition, key) && typeof own(definition, key) !== 'string') {
            invalid('invalid-field', `${definitionPath}.${key}`, 'Formats must be strings.');
          }
        }
        if (
          channel === 'tooltip' &&
          typeof own(definition, 'formatType') === 'string' &&
          !['number', 'time', 'utc'].includes(own(definition, 'formatType') as string)
        ) {
          unsupported(
            `${definitionPath}.formatType`,
            'Tooltip formatting implements number, time and utc, not registered custom formatters.',
          );
        }
      });
    });
  };

  const supportsRanged = (view: Dictionary, inheritedEncoding: Dictionary): boolean => {
    try {
      return canRenderVegaRangedSpec({ ...view, encoding: inheritedEncoding } as unknown as VegaLiteSpec);
    } catch {
      return false;
    } // Malformed declarations are diagnosed separately; never consult original objects.
  };
  const supportsCenteredArea = (view: Dictionary, inheritedEncoding: Dictionary): boolean => {
    try {
      return canRenderVegaCenteredAreaSpec({ ...view, encoding: inheritedEncoding } as unknown as VegaLiteSpec);
    } catch {
      return false;
    } // The renderer predicate sees only the descriptor-safe snapshot.
  };
  type SharedField = { family: string; scale: string; path: string };
  const exposed = new WeakMap<Dictionary, Partial<Record<string, SharedField[]>>>();
  const sharedField = (definition: unknown, path: string, scope: Scope): SharedField | undefined => {
    if (!isRecord(definition) || own(definition, 'scale') === null) {
      return undefined;
    }
    const name = own(definition, 'field');
    if (typeof name !== 'string' && !has(definition, 'datum') && !has(definition, 'aggregate')) {
      return undefined;
    }
    let type = own(definition, 'type');
    const scaleType = own(own(definition, 'scale'), 'type');
    if (type === undefined) {
      if (has(definition, 'timeUnit') || scaleType === 'time' || scaleType === 'utc') {
        type = 'temporal';
      } else if (
        has(definition, 'aggregate') ||
        own(definition, 'bin') === true ||
        ['linear', 'log', 'pow', 'sqrt', 'symlog'].includes(scaleType as string)
      ) {
        type = 'quantitative';
      } else if (['ordinal', 'band', 'point'].includes(scaleType as string)) {
        type = 'nominal';
      } else if (!scope.transformed) {
        if (!spend(scope.rows.length * (1 + (typeof name === 'string' ? name.length : 0)), path)) {
          return undefined;
        }
        const sample = has(definition, 'datum')
          ? own(definition, 'datum')
          : scope.rows
              .map(row => (typeof name === 'string' ? readField(row, name) : undefined))
              .find(value => value !== null && value !== undefined);
        type = finite(sample)
          ? 'quantitative'
          : sample instanceof Date
          ? 'temporal'
          : typeof sample === 'string' || typeof sample === 'boolean'
          ? 'nominal'
          : undefined;
      }
    }
    const family =
      type === 'quantitative'
        ? 'quantitative'
        : type === 'temporal'
        ? 'temporal'
        : type === 'nominal' || type === 'ordinal'
        ? 'categorical'
        : undefined;
    return family
      ? {
          family,
          scale:
            typeof scaleType === 'string'
              ? scaleType
              : family === 'quantitative'
              ? 'linear'
              : family === 'temporal'
              ? 'time'
              : 'categorical',
          path,
        }
      : undefined;
  };
  const visit = (view: unknown, path: string, parent: Scope): void => {
    if (!spend(1, path)) {
      return;
    }
    if (!isRecord(view)) {
      invalid('invalid-spec', path, 'Views must be specification objects.');
      return;
    }
    properties(view, path, topProperties);
    const localEncoding = record(own(view, 'encoding'));
    const scope: Scope = {
      datasets: new Map(parent.datasets),
      encoding: { ...parent.encoding, ...localEncoding },
      encodingPaths: new Map(parent.encodingPaths),
      rows: parent.rows,
      transformed: parent.transformed || list(own(view, 'transform')).length > 0,
      repeats: new Set(parent.repeats),
      inLayer: parent.inLayer,
      rangedLayer: parent.rangedLayer,
      centeredAreaLayer: parent.centeredAreaLayer,
    };
    Object.keys(localEncoding).forEach(channel => {
      scope.encodingPaths.set(channel, childPath(`${path}.encoding`, channel));
      if (!positions.has(channel) && !has(channelProperties, channel)) {
        report(
          'unsupported-channel',
          childPath(`${path}.encoding`, channel),
          'This encoding channel is not implemented.',
          'Remove the channel or precompute its effect.',
        );
      }
    });
    if (has(view, 'datasets')) {
      const datasets = own(view, 'datasets');
      if (!isRecord(datasets)) {
        invalid('invalid-data', `${path}.datasets`, 'Datasets must be a record of inline record arrays.');
      } else {
        Object.keys(datasets).forEach(name => {
          const values = own(datasets, name);
          scope.datasets.set(name, values);
          validateRows(values, childPath(`${path}.datasets`, name));
        });
      }
    }
    if (has(view, 'data')) {
      const source = own(view, 'data');
      data(source, `${path}.data`, scope.datasets);
      const name = own(source, 'name');
      scope.rows =
        isRecord(source) && parsedSources.has(source)
          ? parsedSources.get(source)!
          : list(
              has(source, 'values')
                ? own(source, 'values')
                : typeof name === 'string'
                ? scope.datasets.get(name)
                : undefined,
            );
      scope.transformed = list(own(view, 'transform')).length > 0;
    }
    for (const property of ['params', 'selection']) {
      if (has(view, property)) {
        unsupported(`${path}.${property}`, 'Parameter/selection interactions are not implemented.');
      }
    }
    if (has(view, 'config')) {
      configuration(own(view, 'config'), `${path}.config`);
    }
    for (const property of ['background', 'padding', 'autosize']) {
      if (has(view, property)) {
        unsupported(`${path}.${property}`, 'This layout/style declaration is not fully implemented.');
      }
    }
    for (const property of ['width', 'height']) {
      const size = own(view, property);
      if (size !== undefined && size !== 'container' && (!finite(size) || size <= 0)) {
        invalid('invalid-spec', `${path}.${property}`, 'View dimensions must be positive numbers or container.');
      }
    }
    if (isRecord(own(view, 'title'))) {
      const title = record(own(view, 'title'));
      properties(title, `${path}.title`, [
        'text',
        'subtitle',
        'font',
        'fontSize',
        'fontStyle',
        'fontWeight',
        'color',
        'anchor',
        'offset',
        'subtitlePadding',
      ]);
      if (!nonempty(own(title, 'text'))) {
        invalid('invalid-spec', `${path}.title.text`, 'Title text must be a string.');
      }
      Object.keys(title)
        .filter(key => key !== 'text')
        .forEach(key =>
          unsupported(childPath(`${path}.title`, key), 'Styled title parameters are not normalized by the renderer.'),
        );
    }
    if (has(view, 'transform')) {
      transforms(own(view, 'transform'), `${path}.transform`, scope);
    }
    const declared = compositions.filter(key => has(view, key));
    if (declared.length > 1 || (declared.length > 0 && has(view, 'mark'))) {
      invalid('invalid-composition', path, 'A view must declare exactly one unit or composition kind.');
    }
    if (!declared.length && !has(view, 'mark')) {
      invalid('invalid-spec', path, 'A view needs a mark or a supported composition.');
    }
    const composition = declared[0];
    if (parent.inLayer && composition && composition !== 'layer') {
      report(
        'unsupported-combination',
        path,
        'Concatenation/facet/repeat cannot be materialized inside a layer.',
        'Move composition outside the layered view.',
      );
    }
    const columns = own(view, 'columns');
    if (has(view, 'columns') && (!finite(columns) || !Number.isInteger(columns) || columns < 1)) {
      invalid('invalid-composition', `${path}.columns`, 'Columns must be a positive integer.');
    } else if (has(view, 'columns') && !['concat', 'facet', 'repeat'].includes(composition)) {
      unsupported(`${path}.columns`, 'Columns apply only to grid concatenation, shorthand facets or repeats.');
    }
    if (has(view, 'spec') && !['facet', 'repeat'].includes(composition)) {
      unsupported(`${path}.spec`, 'A child spec is only consumed by facet or repeat.');
    }
    if (has(view, 'resolve')) {
      const resolve = own(view, 'resolve');
      if (!isRecord(resolve)) {
        invalid('invalid-composition', `${path}.resolve`, 'Resolve must be an object.');
      } else {
        properties(resolve, `${path}.resolve`, ['scale', 'axis', 'legend']);
        for (const kind of ['scale', 'axis', 'legend']) {
          if (!has(resolve, kind)) {
            continue;
          }
          const settings = own(resolve, kind);
          if (!isRecord(settings)) {
            invalid('invalid-composition', `${path}.resolve.${kind}`, 'Resolution settings must be a record.');
            continue;
          }
          Object.keys(settings).forEach(channel => {
            const target = childPath(`${path}.resolve.${kind}`, channel);
            if (!['shared', 'independent'].includes(own(settings, channel) as string)) {
              invalid('invalid-composition', target, 'Resolution must be shared or independent.');
            } else if (
              (kind !== 'scale' || !['x', 'y', 'color'].includes(channel)) &&
              !(
                own(settings, channel) === 'shared' &&
                composition === 'layer' &&
                ((kind === 'axis' && ['x', 'y'].includes(channel)) || (kind === 'legend' && channel === 'color')) &&
                (supportsRanged(view, scope.encoding) || supportsCenteredArea(view, scope.encoding))
              )
            ) {
              unsupported(
                target,
                'Only x/y/color scale resolution and shared axes/legends of compatible geometry layers are implemented.',
              );
            }
          });
        }
      }
    }
    if (composition === 'facet') {
      const facet = own(view, 'facet');
      if (!isRecord(facet)) {
        invalid('invalid-composition', `${path}.facet`, 'Facet must be a field definition or row/column definitions.');
      } else {
        const shorthand = has(facet, 'field');
        const definitions = shorthand
          ? [{ value: facet, path: `${path}.facet` }]
          : ['row', 'column']
              .filter(key => has(facet, key))
              .map(key => ({ value: own(facet, key), path: `${path}.facet.${key}` }));
        if (!definitions.length) {
          invalid('invalid-composition', `${path}.facet`, 'Facet needs a field, row or column.');
        }
        if (!shorthand) {
          properties(facet, `${path}.facet`, ['row', 'column']);
        }
        definitions.forEach(def => {
          if (!isRecord(def.value)) {
            invalid('invalid-composition', def.path, 'Facet field definitions must be objects.');
            return;
          }
          properties(def.value, def.path, ['field', 'type', 'sort', 'title', 'header']);
          field(own(def.value, 'field'), `${def.path}.field`, { ...scope, repeats: new Set() });
          if (has(def.value, 'type') && !fieldTypes.has(own(def.value, 'type') as string)) {
            invalid('invalid-type', `${def.path}.type`, 'Invalid facet field type.');
          }
          if (has(def.value, 'sort')) {
            sort(own(def.value, 'sort'), `${def.path}.sort`);
          }
          if (has(def.value, 'header')) {
            const header = own(def.value, 'header');
            if (!isRecord(header)) {
              invalid('invalid-composition', `${def.path}.header`, 'Facet header must be an object.');
            } else {
              properties(header, `${def.path}.header`, ['title', 'labels']);
            }
          }
        });
      }
    }
    if (composition === 'repeat') {
      const repeat = own(view, 'repeat');
      if (Array.isArray(repeat)) {
        stringFields(repeat, `${path}.repeat`);
        scope.repeats.add('repeat');
      } else if (isRecord(repeat)) {
        properties(repeat, `${path}.repeat`, ['row', 'column', 'repeat']);
        const keys = ['row', 'column', 'repeat'].filter(key => has(repeat, key));
        if (!keys.length) {
          invalid('invalid-composition', `${path}.repeat`, 'Repeat needs a field array or row/column field arrays.');
        }
        keys.forEach(key => {
          stringFields(own(repeat, key), `${path}.repeat.${key}`);
          scope.repeats.add(key);
        });
        if (has(repeat, 'repeat') && has(repeat, 'column')) {
          invalid('invalid-composition', `${path}.repeat`, 'Repeat and column declarations conflict.');
        }
      } else {
        invalid('invalid-composition', `${path}.repeat`, 'Repeat must be an array or row/column record.');
      }
    }
    if (composition === 'facet' || composition === 'repeat') {
      if (!isRecord(own(view, 'spec'))) {
        invalid('invalid-composition', `${path}.spec`, 'Facet/repeat requires a child specification.');
      } else {
        visit(own(view, 'spec'), `${path}.spec`, scope);
      }
    }
    if (['layer', 'concat', 'hconcat', 'vconcat'].includes(composition)) {
      const children = own(view, composition);
      if (!Array.isArray(children) || !children.length) {
        invalid('invalid-composition', `${path}.${composition}`, 'Composition requires a nonempty view array.');
      } else {
        const rangedLayer = composition === 'layer' && !parent.inLayer && supportsRanged(view, scope.encoding);
        const centeredAreaLayer =
          composition === 'layer' && !parent.inLayer && supportsCenteredArea(view, scope.encoding);
        children.forEach((child, index) =>
          visit(child, `${path}.${composition}[${index}]`, {
            ...scope,
            inLayer: parent.inLayer || composition === 'layer',
            rangedLayer,
            centeredAreaLayer,
          }),
        );
      }
      if (composition === 'layer') {
        const marks: string[] = [];
        const collectMarks = (child: unknown): void => {
          const mark = own(child, 'mark');
          const type = typeof mark === 'string' ? mark : own(mark, 'type');
          if (typeof type === 'string') {
            marks.push(type);
          }
          list(own(child, 'layer')).forEach(collectMarks);
        };
        list(children).forEach(collectMarks);
        if (marks.some(mark => mark === 'arc') && marks.some(mark => mark !== 'arc')) {
          report(
            'unsupported-combination',
            `${path}.layer`,
            'Polar/donut and Cartesian layers do not share a compatible native renderer.',
            'Separate the views using concatenation.',
          );
        }
      }
    }
    if (has(view, 'mark')) {
      const definition = own(view, 'mark');
      const mark = typeof definition === 'string' ? definition : own(definition, 'type');
      const target = typeof definition === 'string' ? `${path}.mark` : `${path}.mark.type`;
      if (typeof mark !== 'string' || !has(nativeChannels, mark)) {
        report(
          'unsupported-mark',
          target,
          'The requested mark has no faithful renderer; native fallback is not semantic support.',
          'Use an implemented mark or render this specification with a full Vega-Lite runtime.',
        );
      }
      const markName = typeof mark === 'string' ? mark : '';
      const centerIntent = ['x', 'y'].some(channel => own(own(scope.encoding, channel), 'stack') === 'center');
      const centerBar =
        centerIntent &&
        markName === 'bar' &&
        supportsRanged(view, scope.encoding) &&
        (!parent.inLayer || parent.rangedLayer);
      const centeredArea =
        centerIntent &&
        markName === 'area' &&
        supportsCenteredArea(view, scope.encoding) &&
        (!parent.inLayer || parent.centeredAreaLayer);
      // Mirror canRenderVegaRangedSpec's structural routing on the safe snapshot, including plain
      // ticks and rounded bars. Keep scale checking separate: an unsupported nonlinear scale must
      // still be diagnosed as ranged intent rather than accidentally accepted by native y-log fallback.
      const ranged =
        rangedTypes.has(markName) &&
        ['x', 'y'].some(channel => has(scope.encoding, channel)) &&
        (parent.rangedLayer ||
          centerIntent ||
          markName === 'tick' ||
          (markName === 'bar' && has(definition, 'cornerRadiusEnd')) ||
          ['x2', 'y2', 'xOffset', 'yOffset'].some(channel => has(scope.encoding, channel)));
      // Ranged intent alone is not proof of rendering. Flat layers use their parent's predicate,
      // including ordinary bars admitted only as siblings of supported ranged units.
      const geometry = parent.inLayer
        ? parent.rangedLayer || parent.centeredAreaLayer
        : supportsRanged(view, scope.encoding) || centeredArea;
      const polar = has(scope.encoding, 'theta') && has(scope.encoding, 'radius');
      const cartesian = ['line', 'point', 'circle', 'square', 'bar', 'area'].includes(markName);
      const heatmap = ['x', 'y', 'color'].every(
        channel => typeof own(own(scope.encoding, channel), 'field') === 'string',
      );
      if (
        (cartesian && !polar && (!has(scope.encoding, 'x') || !has(scope.encoding, 'y'))) ||
        (markName === 'arc' && !has(scope.encoding, 'theta')) ||
        (markName === 'rect' && !ranged && !heatmap)
      ) {
        report(
          'unsupported-combination',
          `${path}.mark`,
          'The recognized mark lacks a supported geometry/channel combination.',
          'Provide the required Cartesian, polar, heatmap or ranged position encodings.',
        );
      }
      if (ranged && parent.inLayer && !parent.rangedLayer) {
        report(
          'unsupported-combination',
          `${path}.mark`,
          'This ranged layer does not satisfy the flat shared-scale geometry predicate.',
          'Use compatible flat bar/rect/tick layers with shared scales, or separate the views.',
        );
      }
      if (markName === 'tick' && !ranged) {
        report(
          'unsupported-combination',
          `${path}.mark`,
          'Tick requires position geometry; a scatter fallback is not a tick.',
          'Supply an x or y position and route to the ranged renderer.',
        );
      }
      if (isRecord(definition)) {
        properties(definition, `${path}.mark`, [
          'type',
          'color',
          'tooltip',
          'interpolate',
          'point',
          'strokeWidth',
          'strokeDash',
          'fillOpacity',
          'strokeOpacity',
          'opacity',
          'innerRadius',
          'outerRadius',
          'orient',
          'cornerRadiusEnd',
          'width',
          'height',
          'size',
          'thickness',
        ]);
        Object.keys(definition)
          .filter(key => key !== 'type')
          .forEach(key => {
            const supported =
              (key === 'tooltip' && tooltipConfigMarks.includes(markName)) ||
              (centeredArea
                ? ['color', 'opacity', 'fillOpacity', 'interpolate', 'orient'].includes(key)
                : ranged
                ? ['color', 'opacity', 'orient', 'width', 'height'].includes(key) ||
                  (markName !== 'tick' && key === 'cornerRadiusEnd') ||
                  (markName === 'tick' && ['size', 'thickness'].includes(key))
                : key === 'color' ||
                  (['line', 'area'].includes(markName) &&
                    ['interpolate', 'point', 'strokeWidth', 'strokeDash'].includes(key)) ||
                  (markName === 'arc' && key === 'innerRadius'));
            if (!supported) {
              unsupported(`${path}.mark.${key}`, 'This mark property is ignored by the selected renderer.');
            }
            if (key === 'tooltip') {
              tooltipSetting(own(definition, key), `${path}.mark.tooltip`);
            }
            if (
              ['opacity', 'fillOpacity', 'strokeOpacity'].includes(key) &&
              (!finite(own(definition, key)) ||
                (own(definition, key) as number) < 0 ||
                (own(definition, key) as number) > 1)
            ) {
              invalid('invalid-field', `${path}.mark.${key}`, 'Opacity must be finite and between zero and one.');
            }
          });
        const interpolate = own(definition, 'interpolate');
        const interpolations = centeredArea
          ? ['linear', 'step', 'step-before', 'step-after', 'natural', 'monotone', 'basis', 'cardinal']
          : ['linear', 'linear-closed', 'step', 'step-before', 'step-after', 'natural', 'monotone'];
        if (interpolate !== undefined && !interpolations.includes(interpolate as string)) {
          unsupported(`${path}.mark.interpolate`, 'This interpolation method falls back to linear.');
        }
      }
      encoding(scope.encoding, `${path}.encoding`, scope, markName, ranged, centerBar, centeredArea, geometry);
      if (['rule', 'text'].includes(markName) && !parent.inLayer) {
        report(
          'unsupported-combination',
          `${path}.mark`,
          'Standalone rule/text marks are not faithfully rendered by the native line fallback.',
          'Use a supported layered annotation or a full Vega-Lite runtime.',
        );
      }
    } else if (has(view, 'encoding') && !isRecord(own(view, 'encoding'))) {
      invalid('invalid-field', `${path}.encoding`, 'Shared encoding must be an object.');
    }
    // Inspect child scopes, not only the parent's raw encoding. An independent nested boundary
    // is deliberately not exposed upward: heterogeneous child domains cannot be silently shared.
    const fields: Partial<Record<string, SharedField[]>> = {};
    for (const channel of ['x', 'y', 'color']) {
      if (has(view, 'mark')) {
        const candidate = sharedField(
          own(scope.encoding, channel),
          scope.encodingPaths.get(channel) ?? `${path}.encoding.${channel}`,
          scope,
        );
        fields[channel] = candidate ? [candidate] : [];
        continue;
      }
      const resolution = own(own(own(view, 'resolve'), 'scale'), channel);
      const shared =
        resolution === 'shared' ||
        (resolution !== 'independent' && (['layer', 'facet'].includes(composition) || channel === 'color'));
      const children =
        composition === 'facet' || composition === 'repeat' ? [own(view, 'spec')] : list(own(view, composition));
      const candidates = children.flatMap(child => (isRecord(child) ? exposed.get(child)?.[channel] ?? [] : []));
      if (!spend(candidates.length, path)) {
        return;
      }
      if (shared && candidates.length > 1) {
        const first = candidates[0];
        const conflict = candidates.find(
          candidate =>
            candidate.family !== first.family || (first.family !== 'categorical' && candidate.scale !== first.scale),
        );
        if (conflict) {
          report(
            'incompatible-shared-scale',
            resolution === 'shared' ? `${path}.resolve.scale.${channel}` : conflict.path,
            'Shared scales require compatible field type families and scale types.',
            `Use compatible ${channel} field/scale types or set resolve.scale.${channel} to independent.`,
          );
        }
      }
      fields[channel] = shared ? candidates : [];
    }
    exposed.set(view, fields);
  };
  visit(input, '$', {
    datasets: new Map(),
    encoding: Object.create(null),
    encodingPaths: new Map(),
    rows: [],
    transformed: false,
    repeats: new Set(),
    inLayer: false,
    rangedLayer: false,
    centeredAreaLayer: false,
  });
  return diagnostics;
}
