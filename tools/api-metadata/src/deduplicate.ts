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
  for (const { record } of retained) {
    record.symbols = record.symbols.map(symbol => {
      const remapped = remapReferences(symbol, replacements);
      const { fingerprint, ...value } = remapped;
      return { ...value, fingerprint: fingerprintValue(value) };
    });
  }
  return {
    records: retained.sort((left, right) => left.record.recordId.localeCompare(right.record.recordId)),
    routes: routes.map(route =>
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
      if (typeof object.file === 'string' && paths.has(object.file)) {
        object.file = paths.get(object.file)!;
      }
      if (object.kind === 'local' && object.record === record.recordId) {
        delete object.record;
      }
      return object;
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
      object.record = replacements.get(object.record)!;
    }
    return object;
  });
}

function mapObjects<T>(value: T, map: (object: Record<string, unknown>) => Record<string, unknown>): T {
  return JSON.parse(JSON.stringify(value), (_key, item: unknown) =>
    item && typeof item === 'object' && !Array.isArray(item) ? map(item as Record<string, unknown>) : item,
  );
}

function fingerprintValue(value: unknown): ApiRecord['symbols'][number]['fingerprint'] {
  return fingerprintSerializedMetadata(JSON.stringify(toCanonicalJsonValue(value)));
}
