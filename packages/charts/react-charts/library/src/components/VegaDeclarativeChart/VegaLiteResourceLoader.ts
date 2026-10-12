import type { VegaLiteData, VegaLiteSpec } from './VegaLiteTypes';
import type { VegaDataParseOptions, VegaLiteResourceOptions } from './VegaLiteResourceLoader.types';
import { timeParse, utcParse } from 'd3-time-format';
import { readVegaField } from './VegaLiteField';

export type { VegaDataResolver, VegaDataParseOptions, VegaLiteResourceOptions } from './VegaLiteResourceLoader.types';

type Budget = { maxRows: number; maxTextLength: number; remaining: number };
function budget(options: VegaDataParseOptions = {}): Budget {
  const limits = {
    maxRows: options.maxRows ?? 100000,
    maxTextLength: options.maxTextLength ?? 10000000,
    remaining: options.maxWork ?? 2000000,
  };
  if (Object.values(limits).some(value => !Number.isSafeInteger(value) || value < 0)) {
    throw new Error('Invalid Vega resource budget limit');
  }
  return limits;
}

function spend(limits: Budget, work: number): void {
  if (!Number.isSafeInteger(work) || work < 0 || (limits.remaining -= work) < 0) {
    throw new Error('Vega resource work limit exceeded');
  }
}

function rowLimit(length: number, limits: Budget): void {
  if (length > limits.maxRows) {
    throw new Error('Vega resource row limit exceeded');
  }
}

type RecordValue = Record<string, unknown>;
type DataFormat = NonNullable<VegaLiteData['format']> & { property?: string };

function own(value: unknown, key: string): unknown {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  return Object.getOwnPropertyDescriptor(value, key)?.value;
}

function record(value: unknown): RecordValue {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as RecordValue) : {};
}

function set(value: RecordValue, key: string, item: unknown): void {
  Object.defineProperty(value, key, { value: item, enumerable: true, configurable: true, writable: true });
}

function clone<T>(value: T, limits: Budget, ancestors = new Set<object>(), depth = 0): T {
  spend(limits, 1);
  if (depth > 128) {
    throw new Error('Vega resource depth exceeds 128');
  }
  if (typeof value === 'string') {
    if (value.length > limits.maxTextLength) {
      throw new Error('Vega resource text limit exceeded');
    }
    spend(limits, value.length);
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
    throw new Error('Cyclic Vega resource');
  }
  ancestors.add(value);
  let result: unknown;
  if (Array.isArray(value)) {
    spend(limits, value.length);
    const copy: unknown[] = [];
    for (let index = 0; index < value.length; index++) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (descriptor && 'value' in descriptor) {
        copy.push(clone(descriptor.value, limits, ancestors, depth + 1));
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
        if (key === 'values' && Array.isArray(descriptor.value)) {
          rowLimit(descriptor.value.length, limits);
        }
        spend(limits, key.length);
        set(copy, key, clone(descriptor.value, limits, ancestors, depth + 1));
      }
    }
    result = copy;
  }
  ancestors.delete(value);
  return result as T;
}

function abortError(): Error {
  const error = new Error('Vega data resolution aborted');
  error.name = 'AbortError';
  return error;
}

function checkAbort(signal: AbortSignal): void {
  if (signal.aborted) {
    throw abortError();
  }
}

function checkedHttpUrl(value: string, base?: string): URL {
  // Reject URL-parser whitespace/backslash normalization rather than silently repairing hostile input.
  if (value !== value.trim() || /[\u0000-\u001f\u007f\\]/.test(value)) {
    throw new Error('Unsafe Vega data URL');
  }
  let url: URL;
  try {
    url = base ? new URL(value, base) : new URL(value);
  } catch {
    throw new Error('Invalid Vega data URL');
  }
  if ((url.protocol !== 'http:' && url.protocol !== 'https:') || url.username || url.password) {
    throw new Error('Vega data URL must use HTTP/S without credentials');
  }
  return url;
}

/** Strict RFC-style delimited records, including quoted separators, escaped quotes, CRLF and newlines. */
function delimited(text: string, separator: string, limits: Budget): RecordValue[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  let closed = false;
  let started = false;
  const source = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === separator || char === '\r' || char === '\n') {
      row.push(field);
      field = '';
      closed = false;
      if (char === separator) {
        started = true;
      } else {
        if (started || row.length > 1 || row[0] !== '') {
          rows.push(row);
          rowLimit(rows.length - 1, limits);
        }
        row = [];
        started = false;
        if (char === '\r' && source[i + 1] === '\n') {
          i++;
        }
      }
    } else if (char === '"' && !field && !closed) {
      quoted = true;
      started = true;
    } else {
      if (closed || char === '"') {
        throw new Error('Malformed delimited CSV/TSV quoted field');
      }
      field += char;
      started = true;
    }
  }
  if (quoted) {
    throw new Error('Unterminated delimited CSV/TSV quoted field');
  }
  if (started || field || row.length) {
    row.push(field);
    rows.push(row);
    rowLimit(rows.length - 1, limits);
  }
  if (!rows.length) {
    return [];
  }
  const headers = rows.shift()!;
  if (headers.some(header => !header) || new Set(headers).size !== headers.length) {
    throw new Error('Invalid or duplicate CSV/TSV column header');
  }
  return rows.map(cells => {
    if (cells.length > headers.length) {
      throw new Error('Too many delimited CSV/TSV columns');
    }
    const item: RecordValue = {};
    headers.forEach((header, index) => set(item, header, cells[index] ?? ''));
    return item;
  });
}

type ScalarParser = (value: unknown) => unknown;
function scalarParser(type: string): ScalarParser {
  if (['number', 'boolean', 'date', 'string'].includes(type)) {
    return value => parseScalar(value, type);
  }
  const match = /^(date|utc):(?:'([^']+)'|"([^"]+)"|([^'"].*))$/.exec(type);
  const pattern = match && (match[2] ?? match[3] ?? match[4]);
  // d3 accepts unknown directives as literals; reject invalid declarations even for empty data.
  if (!pattern || /%(?![-_0]?[aAbBcdefgGHIjLmMpqQsSuUVwWxXyYZ%])/.test(pattern)) {
    throw new Error(`Unsupported or invalid Vega data parse format: ${type}`);
  }
  const parser = (match![1] === 'utc' ? utcParse : timeParse)(pattern);
  return value => {
    const date =
      typeof value === 'string' && value !== ''
        ? parser(value)
        : value instanceof Date
        ? (parseScalar(value, 'date') as Date | null)
        : null;
    return date && Number.isFinite(Date.prototype.getTime.call(date)) ? date : null;
  };
}

function parseScalar(value: unknown, type: string): unknown {
  if (value === '' || value === null || value === undefined) {
    return null;
  }
  if (type === 'number') {
    if (typeof value !== 'number' && typeof value !== 'string') {
      return null;
    }
    const parsedNumber = typeof value === 'string' && !value.trim() ? NaN : Number(value);
    return Number.isFinite(parsedNumber) ? parsedNumber : null;
  }
  if (type === 'boolean') {
    if (value === true || value === 'true' || value === 1 || value === '1') {
      return true;
    }
    if (value === false || value === 'false' || value === 0 || value === '0') {
      return false;
    }
    return null;
  }
  if (type === 'date') {
    if (!(value instanceof Date) && typeof value !== 'string' && typeof value !== 'number') {
      return null;
    }
    const date = value instanceof Date ? new Date(Date.prototype.getTime.call(value)) : new Date(value);
    return Number.isNaN(Date.prototype.getTime.call(date)) ? null : date;
  }
  if (type === 'string') {
    return typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol' ? null : String(value);
  }
  throw new Error(`Unsupported Vega data parse type: ${type}`);
}

function declarations(format: DataFormat | undefined): Array<[string, ScalarParser]> {
  const parse = record(own(format, 'parse'));
  const result: Array<[string, ScalarParser]> = [];
  for (const key of Object.keys(parse)) {
    const descriptor = Object.getOwnPropertyDescriptor(parse, key);
    if (!descriptor || !('value' in descriptor)) {
      continue;
    }
    const type = descriptor.value;
    if (typeof type !== 'string') {
      throw new Error(`Invalid Vega data parse type for ${key}`);
    }
    result.push([key, scalarParser(type)]);
  }
  return result;
}

/** Set only the addressed own-data field; readVegaField remains the authority for path traversal. */
function parsedField(row: RecordValue, field: string, value: unknown): void {
  // Locate the final path token without treating escaped dots or quoted brackets as separators.
  let start = 0;
  let quote = '';
  let bracket = false;
  for (let i = 0; i < field.length; i++) {
    const char = field[i];
    if (char === '\\') {
      i++;
      continue;
    }
    if (quote) {
      if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (bracket && (char === '"' || char === "'")) {
      quote = char;
      continue;
    }
    if (char === '[') {
      start = i;
      bracket = true;
    } else if (char === ']') {
      bracket = false;
    } else if (char === '.' && !bracket) {
      start = i;
    }
  }
  const prefix = start ? field.slice(0, start) : '';
  const tail = field.slice(start);
  const raw = tail.startsWith('[') ? tail.slice(1, -1).trim() : tail.startsWith('.') ? tail.slice(1) : tail;
  const key =
    raw.startsWith('"') || raw.startsWith("'") ? raw.slice(1, -1).replace(/\\(.)/g, '$1') : raw.replace(/\\(.)/g, '$1');
  const parent = prefix ? readVegaField(row, prefix) : row;
  if (parent && typeof parent === 'object' && key) {
    set(parent as RecordValue, key, value);
  }
}

function parseResource(
  payload: unknown,
  format: DataFormat | undefined,
  limits: Budget,
  inferredType = 'json',
): RecordValue[] {
  const type = own(format, 'type') ?? inferredType;
  if (type !== 'json' && type !== 'csv' && type !== 'tsv') {
    throw new Error('Unsupported Vega data format');
  }
  const parsers = declarations(format);
  let values = payload;
  if (typeof values === 'string') {
    if (values.length > limits.maxTextLength) {
      throw new Error('Vega resource text limit exceeded');
    }
    spend(limits, values.length);
    values =
      type === 'json'
        ? JSON.parse(values.replace(/^\uFEFF/, ''))
        : delimited(values, type === 'csv' ? ',' : '\t', limits);
  }
  const property = own(format, 'property');
  if (property !== undefined) {
    if (typeof property !== 'string' || !property) {
      throw new Error('Invalid Vega data format.property');
    }
    spend(limits, property.length);
    values = readVegaField(values, property);
  }
  if (!Array.isArray(values)) {
    throw new Error('Vega data resource must contain an array of records');
  }
  rowLimit(values.length, limits);
  const rows = clone(values as RecordValue[], limits);
  if (rows.some(value => !value || typeof value !== 'object' || Array.isArray(value) || value instanceof Date)) {
    throw new Error('Vega data resource must contain an array of records');
  }
  for (const [key, parser] of parsers) {
    spend(limits, rows.length * (key.length + 1));
    rows.forEach(row => parsedField(row, key, parser(readVegaField(row, key))));
  }
  return rows;
}

/** Pure inline/text data parsing. Never fetches or resolves names; declarations never invoke user accessors. */
export function parseVegaDataValues(data: VegaLiteData, options: VegaDataParseOptions = {}): RecordValue[] {
  const values = own(data, 'values');
  if (values === undefined) {
    throw new Error('Unresolved Vega data; inline values are required');
  }
  return parseResource(values, own(data, 'format') as DataFormat | undefined, budget(options));
}

/**
 * Resolve only declared data resources via a host callback. Named datasets remain the view builder's responsibility.
 * A callback may return records, JSON/CSV/TSV text, or an own-property `{ values, url }` envelope. In an envelope,
 * `url` is the final response URL and is revalidated against the allowlist. Hosts must enforce redirect policy
 * during I/O: validating metadata after I/O cannot prevent an already-performed request to an unsafe redirect.
 * A relative reference requires an HTTP/S baseUrl; same-origin relative paths need no additional allowlist.
 */
export async function resolveVegaLiteResources(
  spec: VegaLiteSpec,
  options: VegaLiteResourceOptions,
): Promise<VegaLiteSpec> {
  const { resolveData, signal } = options;
  checkAbort(signal);
  const limits = budget(options);
  const base = options.baseUrl ? checkedHttpUrl(options.baseUrl) : undefined;
  const origins = new Set((options.allowedOrigins ?? []).map(origin => checkedHttpUrl(origin).origin));
  const validate = (value: string): string => {
    const absolute = /^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//');
    if (!absolute && !base) {
      throw new Error('Relative Vega data URL requires baseUrl');
    }
    const url = checkedHttpUrl(value, base?.href);
    if ((absolute || url.origin !== base?.origin) && !origins.has(url.origin)) {
      throw new Error(`Vega data URL origin is not allowlisted: ${url.origin}`);
    }
    // Fragments are not part of a resource request or its cache identity.
    url.hash = '';
    return url.href;
  };
  const cache = new Map<string, Promise<RecordValue[]>>();
  const result = clone(spec, limits);

  const callHost = (url: string, format: DataFormat | undefined): Promise<unknown> =>
    new Promise((resolve, reject) => {
      checkAbort(signal);
      const onAbort = () => reject(abortError());
      signal.addEventListener('abort', onAbort, { once: true });
      // Defer invocation until the cancellation listener is in place, including synchronously aborting hosts.
      Promise.resolve()
        .then(() => {
          checkAbort(signal);
          return resolveData({ url, signal, format: clone(format, limits) });
        })
        .then(resolve, reject)
        .finally(() => signal.removeEventListener('abort', onAbort));
    });

  const resolveSource = async (value: unknown): Promise<void> => {
    const data = record(value);
    const rawUrl = own(data, 'url');
    if (rawUrl === undefined) {
      return;
    }
    if (typeof rawUrl !== 'string') {
      throw new Error('Vega data URL must be a string');
    }
    checkAbort(signal);
    const url = validate(rawUrl);
    const format = own(data, 'format') as DataFormat | undefined;
    declarations(format);
    const declaredType = own(format, 'type');
    if (declaredType !== undefined && !['json', 'csv', 'tsv'].includes(declaredType as string)) {
      throw new Error('Unsupported Vega data format');
    }
    // Canonicalize parse keys to deduplicate equivalent declarations independent of insertion order.
    const parse = record(format?.parse);
    const key = JSON.stringify([
      url,
      format?.type,
      format?.property,
      Object.keys(parse)
        .sort()
        .map(field => [field, own(parse, field)]),
    ]);
    let loaded = cache.get(key);
    if (!loaded) {
      loaded = callHost(url, format).then(payload => {
        checkAbort(signal);
        let values = payload;
        if (!Array.isArray(payload) && own(payload, 'values') !== undefined) {
          const finalUrl = own(payload, 'url');
          if (finalUrl !== undefined) {
            if (typeof finalUrl !== 'string') {
              throw new Error('Invalid Vega redirect URL metadata');
            }
            validate(finalUrl);
          }
          values = own(payload, 'values');
        }
        const pathname = new URL(url).pathname;
        return parseResource(
          values,
          format,
          limits,
          /\.csv$/i.test(pathname) ? 'csv' : /\.tsv$/i.test(pathname) ? 'tsv' : 'json',
        );
      });
      cache.set(key, loaded);
    }
    const rows = await loaded;
    checkAbort(signal);
    delete data.url;
    delete data.format;
    delete data.name;
    set(data, 'values', clone(rows, limits));
  };

  const visit = async (value: unknown): Promise<void> => {
    const view = record(value);
    checkAbort(signal);
    await resolveSource(own(view, 'data'));
    const transforms = own(view, 'transform');
    if (Array.isArray(transforms)) {
      for (const transform of transforms) {
        if (own(transform, 'lookup') !== undefined) {
          await resolveSource(own(own(transform, 'from'), 'data'));
        }
      }
    }
    for (const key of ['hconcat', 'vconcat', 'concat', 'layer']) {
      const children = own(view, key);
      if (Array.isArray(children)) {
        for (const child of children) {
          await visit(child);
        }
      }
    }
    if (own(view, 'spec')) {
      await visit(own(view, 'spec'));
    }
  };
  await visit(result);
  checkAbort(signal);
  return result;
}
