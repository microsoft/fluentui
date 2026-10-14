'use client';

import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { format as numberFormat } from 'd3-format';
import { timeFormat, timeParse, utcFormat, utcParse } from 'd3-time-format';
import { aggregateVegaValues, evaluateVegaPredicate } from './VegaLiteDataTransforms';
import { readVegaField } from './VegaLiteField';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { useVegaLiteTooltipStyles } from './useVegaLiteTooltipStyles.styles';

export interface VegaTooltip {
  fields: Array<{ title: string; value: string }>;
  ariaLabel: string;
  disabled: boolean;
}

type Row = Record<string, unknown>;
type Datum = { value: unknown; present: boolean };
const strict = { mode: 'strict' as const };
const channels = ['x', 'x2', 'y', 'y2', 'color', 'theta', 'radius', 'size', 'shape', 'text', 'xOffset', 'yOffset'];
const isRecord = (value: unknown): value is Row => value !== null && typeof value === 'object' && !Array.isArray(value);
const descriptor = (value: unknown, key: string): PropertyDescriptor | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const property = Object.getOwnPropertyDescriptor(value, key);
  return property && 'value' in property && typeof property.value !== 'function' ? property : undefined;
};
const own = (value: unknown, key: string): unknown => descriptor(value, key)?.value;
const string = (value: unknown): string | undefined => (typeof value === 'string' ? value : undefined);
// Do not use array iterators: accessor entries and inherited entries must not execute code.
const array = (value: unknown): unknown[] =>
  Array.isArray(value)
    ? Object.keys(value)
        .filter(key => /^(0|[1-9]\d*)$/.test(key))
        .flatMap(key => {
          const property = descriptor(value, key);
          return property ? [property.value] : [];
        })
    : [];
const error = (message: string): never => {
  throw new Error(`Vega tooltip: ${message}`);
};
const dateCopy = (value: unknown): Date | undefined =>
  value instanceof Date ? new Date(Date.prototype.getTime.call(value)) : undefined;

/** Only scalars/arrays of scalars become text. No JSON serialization or user coercion hooks. */
function text(value: unknown, depth = 0): string {
  if (depth > 30) {
    return '[Array]';
  }
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  const date = dateCopy(value);
  if (date) {
    return Number.isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString();
  }
  if (Array.isArray(value)) {
    return array(value)
      .map(entry => text(entry, depth + 1))
      .join('\n');
  }
  return '[Object]';
}

function temporalDate(spec: VegaLiteSpec, field: string | undefined, value: unknown): Date {
  const copy = dateCopy(value);
  if (copy) {
    return copy;
  }
  if (typeof value === 'number') {
    return new Date(value);
  }
  if (typeof value !== 'string') {
    return new Date(NaN);
  }
  const parse = own(own(own(own(spec, 'data'), 'format'), 'parse'), field ?? '');
  if (typeof parse === 'string') {
    const match = /^(date|utc):(?:'([^']*)'|"([^"]*)"|(.+))$/.exec(parse);
    if (match) {
      const parser = match[1] === 'utc' ? utcParse : timeParse;
      return parser(match[2] ?? match[3] ?? match[4])(value) ?? new Date(NaN);
    }
  }
  return new Date(value);
}

function formatValue(spec: VegaLiteSpec, definition: Row, value: unknown): string {
  const type = own(definition, 'type');
  const formatType = own(definition, 'formatType');
  if (formatType !== undefined && !['number', 'time', 'utc'].includes(formatType as string)) {
    return error('unsupported formatType');
  }
  const pattern = own(definition, 'format');
  if (pattern !== undefined && typeof pattern !== 'string') {
    return error('format must be a string');
  }
  const config = own(spec, 'config');
  const quantitative =
    formatType === 'number' ||
    (formatType === undefined &&
      (type === 'quantitative' || (type !== 'temporal' && pattern !== undefined && typeof value === 'number')));
  let numericFormatter: ReturnType<typeof numberFormat> | undefined;
  if (quantitative) {
    try {
      numericFormatter = numberFormat(string(pattern) ?? string(own(config, 'numberFormat')) ?? '');
    } catch {
      return error('invalid numeric format');
    }
  }
  // Preserve missing/invalid scalars, rather than letting d3 coerce null to zero or epoch.
  if (value == null || (typeof value === 'number' && Number.isNaN(value))) {
    return text(value);
  }
  const temporal = formatType === 'time' || formatType === 'utc' || (formatType === undefined && type === 'temporal');
  if (temporal) {
    const date = temporalDate(spec, string(own(definition, 'field')), value);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const unit = own(definition, 'timeUnit');
    const unitName = string(unit) ?? string(own(unit, 'unit'));
    const utc =
      formatType === 'utc' ||
      (formatType !== 'time' &&
        (own(own(definition, 'scale'), 'type') === 'utc' || unitName?.startsWith('utc') || own(unit, 'utc') === true));
    const formatter = utc ? utcFormat : timeFormat;
    const defaultFormat =
      unitName?.replace(/^utc/, '') === 'month' ? '%B' : unitName?.replace(/^utc/, '') === 'year' ? '%Y' : '%b %d, %Y';
    return formatter(string(pattern) ?? string(own(config, 'timeFormat')) ?? defaultFormat)(date);
  }
  if (numericFormatter) {
    // These are the only types d3 may safely coerce. Never pass arbitrary objects to it.
    if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'boolean') {
      return text(value);
    }
    return numericFormatter(Number(value));
  }
  return text(value);
}

/** Capture predicate data before handing it to the shared evaluator's array iteration. */
function safePredicate(value: unknown, depth = 0): unknown {
  if (depth > 100) {
    return error('predicate depth exceeded');
  }
  if (typeof value === 'function' || typeof value === 'symbol') {
    return error('unsupported predicate value');
  }
  const date = dateCopy(value);
  if (date) {
    return date;
  }
  if (Array.isArray(value)) {
    return Object.keys(value)
      .filter(key => /^(0|[1-9]\d*)$/.test(key))
      .map(key => {
        const property = descriptor(value, key);
        return property ? safePredicate(property.value, depth + 1) : error('predicate accessor is not supported');
      });
  }
  if (isRecord(value)) {
    const result: Row = Object.create(null);
    for (const key of Object.keys(value)) {
      const property = descriptor(value, key);
      if (!property) {
        return error('predicate accessor is not supported');
      }
      Object.defineProperty(result, key, { value: safePredicate(property.value, depth + 1), enumerable: true });
    }
    return result;
  }
  return value;
}

function selectedDefinition(definition: unknown, row: Row): Row | undefined {
  if (!isRecord(definition)) {
    return undefined;
  }
  const condition = own(definition, 'condition');
  if (condition !== undefined) {
    const conditions = Array.isArray(condition) ? array(condition) : [condition];
    for (const entry of conditions) {
      if (!isRecord(entry) || own(entry, 'test') === undefined) {
        return error('conditional tooltip requires a supported test predicate');
      }
      if (evaluateVegaPredicate(safePredicate(own(entry, 'test')), row, strict)) {
        return entry;
      }
    }
  }
  return definition;
}

function definitionsForEncoding(spec: VegaLiteSpec, row: Row): Row[] {
  const encoding = own(spec, 'encoding');
  return [...channels, 'tooltip'].flatMap(channel => {
    const definition = own(encoding, channel);
    return (Array.isArray(definition) ? array(definition) : [definition])
      .map(entry => selectedDefinition(entry, row))
      .filter((entry): entry is Row => !!entry);
  });
}

const same = (a: unknown, b: unknown): boolean =>
  a instanceof Date && b instanceof Date
    ? Date.prototype.getTime.call(a) === Date.prototype.getTime.call(b)
    : a === b || Object.is(a, b);

/** Read prepared aliases first; only raw specs with source tuples may aggregate. */
function datumForDefinition(spec: VegaLiteSpec, definition: Row, row: Row): Datum {
  for (const key of ['value', 'datum']) {
    const property = descriptor(definition, key);
    if (property) {
      return { value: property.value, present: true };
    }
  }
  const field = own(definition, 'field');
  const op = own(definition, 'aggregate');
  if (field !== undefined && typeof field !== 'string') {
    return error('field must be a string');
  }
  if (op !== undefined) {
    aggregateVegaValues([], string(field), op, strict); // Validate even if a prepared alias exists.
    const name = string(op) ?? (isRecord(op) ? Object.keys(op)[0] : undefined);
    const alias = name === 'count' ? '__count' : `${name}_${field}`;
    const prepared = descriptor(row, alias);
    if (prepared) {
      return { value: prepared.value, present: true };
    }
    const values = own(own(spec, 'data'), 'values');
    if (!Array.isArray(values)) {
      return error('aggregate requires a prepared datum alias or full source data');
    }
    const groupFields = definitionsForEncoding(spec, row)
      .filter(entry => own(entry, 'aggregate') === undefined)
      .map(entry => string(own(entry, 'field')))
      .filter((entry): entry is string => entry !== undefined);
    const rows = array(values)
      .filter(isRecord)
      .filter(source => groupFields.every(key => same(readVegaField(source, key), readVegaField(row, key))));
    const result = aggregateVegaValues(rows, string(field), op, strict);
    return { value: result, present: result !== undefined };
  }
  if (typeof field !== 'string') {
    // An unmatched conditional-only definition contributes nothing, not a data fallback.
    if (own(definition, 'condition') !== undefined) {
      return { value: undefined, present: false };
    }
    return error('field, datum or value is required');
  }
  const unit = own(definition, 'timeUnit');
  const unitName = string(unit) ?? string(own(unit, 'unit'));
  if (unitName) {
    const prefix = own(unit, 'utc') === true && !unitName.startsWith('utc') ? `utc${unitName}` : unitName;
    const prepared = descriptor(row, `${prefix}_${field}`);
    if (prepared) {
      return { value: prepared.value, present: true };
    }
  }
  const value = readVegaField(row, field);
  return { value, present: value !== undefined || !!descriptor(row, field) };
}

function fieldTitle(definition: Row): string {
  const title = own(definition, 'title');
  if (typeof title === 'string') {
    return title;
  }
  if (Array.isArray(title)) {
    return array(title)
      .map(value => text(value))
      .join(', ');
  }
  const field = string(own(definition, 'field')) ?? '';
  const op = own(definition, 'aggregate');
  if (op === 'count') {
    return 'Count of Records';
  }
  if (typeof op === 'string') {
    return `${op[0].toUpperCase()}${op.slice(1)} of ${field}`;
  }
  return field;
}

/** Safe Vega datetime literals. Calendar components are data, never expression/signal references. */
function filterBound(value: unknown, definition: Row): unknown {
  const date = dateCopy(value);
  if (date) {
    return date.getTime();
  }
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (!isRecord(value)) {
    return error('unsupported tooltip filter bound');
  }
  const keys = Object.keys(value);
  const dateKeys = ['year', 'quarter', 'month', 'date', 'day', 'hours', 'minutes', 'seconds', 'milliseconds', 'utc'];
  if (!keys.length || keys.some(key => !dateKeys.includes(key) || !descriptor(value, key))) {
    return error('unsupported tooltip filter datetime bound');
  }
  const part = (key: string, fallback: number): number => {
    const component = own(value, key);
    return component === undefined
      ? fallback
      : typeof component === 'number' && Number.isFinite(component)
      ? component
      : error('invalid tooltip filter datetime component');
  };
  const month = own(value, 'month');
  const monthNames = [
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
      ? monthNames.findIndex(name => name === month.toLowerCase() || name.slice(0, 3) === month.toLowerCase())
      : part('month', 1) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    return error('invalid tooltip filter datetime month');
  }
  const unit = own(definition, 'timeUnit');
  const unitName = string(unit) ?? string(own(unit, 'unit'));
  const utc =
    own(value, 'utc') === true ||
    own(definition, 'formatType') === 'utc' ||
    own(own(definition, 'scale'), 'type') === 'utc' ||
    unitName?.startsWith('utc') ||
    own(unit, 'utc') === true;
  const result = new Date(0);
  const year = part('year', 1972);
  const resolvedMonth =
    month === undefined && own(value, 'quarter') !== undefined ? 3 * (part('quarter', 1) - 1) : monthIndex;
  const day = own(value, 'day');
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayIndex =
    typeof day === 'string'
      ? dayNames.findIndex(name => name === day.toLowerCase() || name.slice(0, 3) === day.toLowerCase())
      : part('day', 0);
  const resolvedDate = day !== undefined && own(value, 'date') === undefined ? 2 + dayIndex : part('date', 1);
  if (utc) {
    result.setUTCFullYear(year, resolvedMonth, resolvedDate);
    result.setUTCHours(part('hours', 0), part('minutes', 0), part('seconds', 0), part('milliseconds', 0));
  } else {
    result.setFullYear(year, resolvedMonth, resolvedDate);
    result.setHours(part('hours', 0), part('minutes', 0), part('seconds', 0), part('milliseconds', 0));
  }
  return result.getTime();
}

/** Tooltip predicates deliberately omit field/timeUnit; every leaf binds to the displayed datum. */
function passesFilter(spec: VegaLiteSpec, definition: Row, filter: unknown, rawValue: unknown): boolean {
  const temporal = own(definition, 'type') === 'temporal' || own(definition, 'timeUnit') !== undefined;
  const date =
    temporal && rawValue != null ? temporalDate(spec, string(own(definition, 'field')), rawValue) : dateCopy(rawValue);
  const value = date ? date.getTime() : rawValue;
  let leaves = 0;
  const bind = (predicate: unknown, depth: number): unknown => {
    if (!isRecord(predicate) || depth > 100) {
      return error('invalid tooltip filter');
    }
    const keys = Object.keys(predicate);
    if (keys.length !== 1 || keys.some(key => !descriptor(predicate, key))) {
      return error('invalid tooltip filter: field/timeUnit and unknown properties are not allowed');
    }
    const key = keys[0];
    const argument = own(predicate, key);
    if (key === 'and' || key === 'or') {
      const children = array(argument);
      if (!Array.isArray(argument) || !children.length) {
        return error('invalid logical tooltip filter');
      }
      return { [key]: children.map(child => bind(child, depth + 1)) };
    }
    if (key === 'not') {
      return { not: bind(argument, depth + 1) };
    }
    leaves++;
    if (!['equal', 'oneOf', 'range', 'lt', 'lte', 'gt', 'gte', 'valid'].includes(key)) {
      return error('unsupported tooltip filter');
    }
    if (key === 'valid') {
      if (typeof argument !== 'boolean') {
        return error('invalid tooltip filter valid value');
      }
      // Vega-Lite emits isValid(v) && isFinite(+v). Blank strings are valid; objects are not coerced.
      const scalar =
        dateCopy(value)?.getTime() ??
        (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean' ? Number(value) : NaN);
      const valid = value != null && Number.isFinite(scalar);
      return { field: 'valid', equal: valid === argument };
    }
    if (key === 'oneOf' || key === 'range') {
      if (!Array.isArray(argument) || (key === 'range' && array(argument).length !== 2)) {
        return error('invalid tooltip filter bounds');
      }
      return { field: 'value', [key]: array(argument).map(entry => filterBound(entry, definition)) };
    }
    return { field: 'value', [key]: filterBound(argument, definition) };
  };
  // Bind/validate every leaf before evaluation, so short-circuiting cannot hide invalid predicates.
  const predicate = bind(filter, 0);
  if (!leaves) {
    return error('empty tooltip filter');
  }
  return evaluateVegaPredicate(predicate, { value: dateCopy(value) ?? value, valid: true }, strict);
}

function buildFields(spec: VegaLiteSpec, definitions: unknown[], row: Row, filterable: boolean): VegaTooltip['fields'] {
  const result: VegaTooltip['fields'] = [];
  for (const input of definitions) {
    const definition = selectedDefinition(input, row);
    if (!definition) {
      return error('invalid tooltip field definition');
    }
    if (own(definition, 'tooltip') === false) {
      continue;
    }
    const datum = datumForDefinition(spec, definition, row);
    const filter = own(definition, 'filter');
    if (filterable && filter !== undefined && !passesFilter(spec, definition, filter, datum.value)) {
      continue;
    }
    if (datum.present) {
      result.push({ title: fieldTitle(definition), value: formatValue(spec, definition, datum.value) });
    }
  }
  return result;
}

const labelFor = (fields: VegaTooltip['fields']): string =>
  fields.map(field => (field.title ? `${field.title}: ${field.value}` : field.value)).join('; ');

function projectedFields(spec: VegaLiteSpec, row: Row, coordinateOnly = false): VegaTooltip['fields'] {
  const encoding = own(spec, 'encoding');
  const definitions = (coordinateOnly ? ['x', 'y'] : channels).flatMap(channel => {
    const definition = selectedDefinition(own(encoding, channel), row);
    // Constant visual encodings (e.g. pixel size or fixed color) are not datum fields.
    return definition && (own(definition, 'field') !== undefined || own(definition, 'aggregate') !== undefined)
      ? [definition]
      : [];
  });
  const fields = buildFields(spec, definitions, row, false);
  // Vega's generated object projection retains the first duplicate title.
  const seen = new Set<string>();
  return fields.filter(field => !seen.has(field.title) && !!seen.add(field.title));
}

/** Build visual content and accessible text without opening a callout, loading resources or mutating data. */
export function buildVegaTooltip(spec: VegaLiteSpec, row: Record<string, unknown>): VegaTooltip {
  const encodingTooltip = own(own(spec, 'encoding'), 'tooltip');
  if (encodingTooltip === null) {
    return { fields: [], ariaLabel: labelFor(projectedFields(spec, row, true)), disabled: true };
  }
  if (encodingTooltip !== undefined) {
    const fields = buildFields(
      spec,
      Array.isArray(encodingTooltip) ? array(encodingTooltip) : [encodingTooltip],
      row,
      true,
    );
    return { fields, ariaLabel: labelFor(fields), disabled: false };
  }
  const mark = own(spec, 'mark');
  const config = own(spec, 'config');
  const markType = typeof mark === 'string' ? mark : string(own(mark, 'type'));
  // Null is meaningful at every precedence level; only undefined falls through.
  const candidates = [
    own(mark, 'tooltip'),
    own(own(config, markType ?? ''), 'tooltip'),
    own(own(config, 'mark'), 'tooltip'),
  ];
  const tooltip = candidates.find(candidate => candidate !== undefined);
  if (tooltip === null || tooltip === false) {
    return { fields: [], ariaLabel: labelFor(projectedFields(spec, row, true)), disabled: true };
  }
  let fields: VegaTooltip['fields'];
  if (typeof tooltip === 'string') {
    fields = [{ title: '', value: tooltip }];
  } else if (own(tooltip, 'content') === 'data') {
    fields = Object.keys(row).flatMap(key => {
      const property = descriptor(row, key);
      return property ? [{ title: key, value: text(property.value) }] : [];
    });
  } else {
    if (tooltip !== undefined && tooltip !== true && own(tooltip, 'content') !== 'encoding') {
      return error('unsupported mark tooltip (expected true, null, text, or content:encoding/data)');
    }
    // Native chart defaults need a projection even when mark/config tooltip is undefined.
    fields = projectedFields(spec, row);
  }
  return { fields, ariaLabel: labelFor(fields), disabled: false };
}

type TooltipProps = React.ComponentProps<'dl'> & { tooltip: VegaTooltip };

const VegaLiteTooltip: ForwardRefComponent<TooltipProps> = React.forwardRef((props, ref) => {
  const { tooltip, className, ...rest } = props;
  const classes = useVegaLiteTooltipStyles();
  return (
    <dl
      {...rest}
      ref={ref}
      role="tooltip"
      aria-label={tooltip.ariaLabel}
      className={mergeClasses(classes.root, className)}
    >
      {tooltip.fields.map((field, index) => (
        <React.Fragment key={index}>
          <dt className={classes.title}>{field.title}</dt>
          <dd className={classes.value}>{field.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
});
VegaLiteTooltip.displayName = 'VegaLiteTooltip';

/** Content-only boundary. The main adapter owns native callout activation, focus and keyboard interaction. */
export function renderVegaTooltip(spec: VegaLiteSpec, row: Record<string, unknown>): React.ReactElement | null {
  const tooltip = buildVegaTooltip(spec, row);
  return tooltip.disabled || !tooltip.fields.length ? null : <VegaLiteTooltip tooltip={tooltip} />;
}
