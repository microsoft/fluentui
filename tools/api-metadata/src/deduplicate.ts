import { fingerprintSerializedMetadata, toCanonicalJsonValue } from './serialize';
import type { ApiRecord, BundledRecordSource, DeclarationInput, ExportRoute } from './types';

export interface GeneratedRecord {
  record: ApiRecord;
  source?: BundledRecordSource;
}

/**
 * Condition variants may share a payload only when their source-backed symbols and
 * all recorded semantic inputs agree. Checker-rendered views are not identity:
 * TypeScript can order equivalent unions differently between declaration modules.
 */
export function deduplicateRecords(
  records: GeneratedRecord[],
  routes: ExportRoute[],
): { records: GeneratedRecord[]; routes: ExportRoute[] } {
  const groups = new Map<string, GeneratedRecord[]>();
  for (const value of records) {
    const entrypoints = [
      ...new Set(
        routes
          .filter(route => route.target.kind !== 'dependency' && route.target.record === value.record.recordId)
          .map(route => route.entrypoint),
      ),
    ].sort();
    const identity = fingerprintValue({
      entrypoints,
      record: recordIdentity(value.record),
      ...(value.source
        ? {
            source: {
              ...value.source,
              packages: value.source.packages.map(source => ({
                ...source,
                declarationInputs: declarationIdentity(source.declarationInputs),
              })),
            },
          }
        : {}),
    }).value;
    const group = groups.get(identity) ?? [];
    group.push(value);
    groups.set(identity, group);
  }

  const replacements = new Map<string, string>();
  const retained: GeneratedRecord[] = [];
  const ids = new Set(records.map(value => value.record.recordId));
  for (const [identity, group] of groups) {
    const first = group[0];
    if (group.length === 1) {
      retained.push(first);
      continue;
    }
    const base = first.source
      ? `bundled:${identity.slice(0, 16)}`
      : first.record.recordId.replace(/:types(?:-.*)?$/, '');
    const recordId = ids.has(base) ? `${base}:${identity.slice(0, 16)}` : base;
    ids.add(recordId);
    for (const value of group) {
      replacements.set(value.record.recordId, recordId);
    }
    retained.push({
      record: {
        ...first.record,
        recordId,
        declarationInputs: uniqueInputs(group.flatMap(value => value.record.declarationInputs)),
        dependencyInputs: uniqueInputs(group.flatMap(value => value.record.dependencyInputs)),
      },
      ...(first.source
        ? {
            source: {
              ...first.source,
              packages: first.source.packages.map((source, index) => ({
                ...source,
                declarationInputs: uniqueInputs(
                  group.flatMap(value => value.source!.packages[index].declarationInputs),
                ),
              })),
            },
          }
        : {}),
    });
  }
  if (replacements.size === 0 && !retained.some(value => value.source)) {
    return {
      records: retained.sort((left, right) => left.record.recordId.localeCompare(right.record.recordId)),
      routes,
    };
  }
  for (let index = 0; index < retained.length; index++) {
    const { record } = retained[index];
    const source = retained[index].source;
    if (replacements.size === 0 && !source) {
      continue;
    }
    const symbols = record.symbols.map(symbol => {
      const remapped = replacements.size > 0 ? remapReferences(symbol, replacements) : symbol;
      if (remapped === symbol && !(source && hasSelfReference(symbol, record.recordId))) {
        return symbol;
      }
      const { fingerprint, ...value } = remapped;
      const updated = fingerprintValue(value);
      return remapped === symbol && updated.value === fingerprint.value ? symbol : { ...value, fingerprint: updated };
    });
    if (symbols.some((symbol, symbolIndex) => symbol !== record.symbols[symbolIndex])) {
      retained[index] = { ...retained[index], record: { ...record, symbols } };
    }
  }
  return {
    records: retained.sort((left, right) => left.record.recordId.localeCompare(right.record.recordId)),
    routes:
      replacements.size === 0
        ? routes
        : routes.map(route =>
            route.target.kind !== 'dependency' && replacements.has(route.target.record)
              ? { ...route, target: { ...route.target, record: replacements.get(route.target.record)! } }
              : route,
          ),
  };
}

function recordIdentity(record: ApiRecord): unknown {
  const { recordId, ...metadata } = record;
  const paths = new Map(record.declarationInputs.map(input => [input.path, canonicalDeclarationPath(input.path)]));
  const symbols = record.symbols.map(symbol => {
    const { fingerprint, effectiveType, props, ...authored } = symbol;
    return mapObjects(authored, object => {
      let mapped = object;
      if (typeof mapped.file === 'string' && paths.has(mapped.file)) {
        const file = paths.get(mapped.file)!;
        if (file !== mapped.file) {
          mapped = { ...mapped, file };
        }
      }
      if (mapped.kind === 'local' && mapped.record === record.recordId) {
        const withoutRecord = { ...mapped };
        delete withoutRecord.record;
        mapped = withoutRecord;
      }
      return mapped;
    });
  });
  return {
    ...metadata,
    declarationInputs: declarationIdentity(record.declarationInputs),
    dependencyInputs: uniqueInputs(
      record.dependencyInputs.map(({ conditions, declarationPath: inputPath, ...input }) => ({
        ...input,
        ...(inputPath ? { declarationPath: canonicalDeclarationPath(inputPath) } : {}),
      })),
    ),
    symbols,
  };
}

function declarationIdentity(inputs: DeclarationInput[]): unknown {
  return uniqueInputs(
    inputs.map(input => ({ path: canonicalDeclarationPath(input.path), fingerprint: input.fingerprint })),
  );
}

export function canonicalDeclarationPath(file: string): string {
  return file.replace(/\.d\.(?:cts|mts)$/, '.d.ts');
}

function uniqueInputs<T>(inputs: T[]): T[] {
  const unique = new Map(inputs.map(input => [JSON.stringify(toCanonicalJsonValue(input)), input]));
  return [...unique].sort(([left], [right]) => left.localeCompare(right)).map(([, input]) => input);
}

function remapReferences<T>(value: T, replacements: ReadonlyMap<string, string>): T {
  return mapObjects(value, object => {
    if (object.kind === 'local' && typeof object.record === 'string' && replacements.has(object.record)) {
      return { ...object, record: replacements.get(object.record)! };
    }
    return object;
  });
}

function hasSelfReference(symbol: ApiRecord['symbols'][number], recordId: string): boolean {
  let found = false;
  mapObjects(symbol, object => {
    if (object.kind === 'local' && object.record === recordId) {
      found = true;
    }
    return object;
  });
  return found;
}

export function mapMetadataObjects<T>(value: T, map: (object: Record<string, unknown>) => Record<string, unknown>): T {
  if (Array.isArray(value)) {
    let result: unknown[] | undefined;
    value.forEach((item, index) => {
      const mapped = mapMetadataObjects(item, map);
      if (mapped !== item) {
        result ??= value.slice();
        result[index] = mapped;
      }
    });
    return (result ?? value) as T;
  }
  if (value && typeof value === 'object') {
    let result: Record<string, unknown> | undefined;
    for (const [key, item] of Object.entries(value)) {
      const mapped = mapMetadataObjects(item, map);
      if (mapped !== item) {
        result ??= { ...(value as Record<string, unknown>) };
        Object.defineProperty(result, key, { value: mapped, enumerable: true, configurable: true, writable: true });
      }
    }
    return map(result ?? (value as Record<string, unknown>)) as T;
  }
  return value;
}

const mapObjects = mapMetadataObjects;

function fingerprintValue(value: unknown): ApiRecord['symbols'][number]['fingerprint'] {
  return fingerprintSerializedMetadata(JSON.stringify(toCanonicalJsonValue(value)));
}
