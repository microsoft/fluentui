import { deduplicateRecords } from './deduplicate';
import {
  fingerprintMetadata,
  fingerprintSerializedMetadata,
  serializeMetadata,
  toCanonicalJsonValue,
} from './serialize';
import type { ApiRecord, ApiSymbol, ExportRoute } from './types';

describe('canonical metadata serialization', () => {
  it('sorts object keys while preserving semantic array order', () => {
    const value = {
      z: 1,
      declarations: [{ id: 'second' }, { id: 'first' }],
      nested: { y: true, a: false },
    };

    expect(toCanonicalJsonValue(value)).toEqual({
      declarations: [{ id: 'second' }, { id: 'first' }],
      nested: { a: false, y: true },
      z: 1,
    });
    expect(JSON.stringify(toCanonicalJsonValue(value))).toBe(
      '{"declarations":[{"id":"second"},{"id":"first"}],"nested":{"a":false,"y":true},"z":1}',
    );
  });

  it('emits stable bytes and hashes those exact bytes', () => {
    const record = createRecord();
    const reordered = {
      ...record,
      generator: { version: record.generator.version, name: record.generator.name },
    };

    expect(serializeMetadata(reordered)).toBe(serializeMetadata(record));
    expect(serializeMetadata(record).endsWith('\n')).toBe(true);
    expect(fingerprintMetadata(reordered)).toEqual(fingerprintMetadata(record));
  });

  it('rejects non-JSON and cyclic values', () => {
    expect(() => toCanonicalJsonValue({ missing: undefined })).toThrow('Cannot serialize undefined');
    expect(() => toCanonicalJsonValue({ invalid: Number.NaN })).toThrow('Cannot serialize non-finite number');

    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;
    expect(() => toCanonicalJsonValue(cyclic)).toThrow('Cannot serialize cyclic value');
  });

  it('preserves an own __proto__ JSON key without mutating the canonical object prototype', () => {
    const value = JSON.parse('{"a":1,"__proto__":{"polluted":true}}') as Record<string, unknown>;
    const canonical = toCanonicalJsonValue(value);

    expect(Object.getPrototypeOf(canonical)).toBeNull();
    expect(Object.prototype.hasOwnProperty.call(canonical, '__proto__')).toBe(true);
    expect(JSON.stringify(canonical)).toBe('{"__proto__":{"polluted":true},"a":1}');
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
  });
});

describe('deduplicateRecords', () => {
  it('reuses unchanged records and symbols when no record ids can be replaced', () => {
    const record = createRecord();
    record.symbols = [createSymbol('Widget', record.recordId), createSymbol('Stable')];
    const originalSymbols = record.symbols;
    const originalBytes = serializeMetadata(record);

    const result = deduplicateRecords([{ record }], []);

    expect(result.records[0].record).toBe(record);
    expect(result.records[0].record.symbols[0]).toBe(originalSymbols[0]);
    expect(result.records[0].record.symbols[1]).toBe(originalSymbols[1]);
    expect(serializeMetadata(result.records[0].record)).toBe(originalBytes);
  });

  it('refreshes bundled symbols whose local references were renamed before deduplication', () => {
    const record = { ...createRecord(), recordId: 'bundled:renamed' };
    const previous = createSymbol('Widget', 'api');
    record.symbols = [
      {
        ...previous,
        type: {
          ...previous.type!,
          references: [
            {
              start: 0,
              end: 6,
              status: 'resolved',
              target: { kind: 'local', symbol: 'Widget', record: record.recordId },
            },
          ],
        },
      },
      createSymbol('Stable'),
    ];
    const source = { kind: 'dependency' as const, packages: [] };

    const result = deduplicateRecords([{ record, source }], []);

    expect(result.records[0].record.symbols[0].fingerprint).toEqual(
      createSymbol('Widget', record.recordId).fingerprint,
    );
    expect(result.records[0].record.symbols[0]).not.toBe(record.symbols[0]);
    expect(result.records[0].record.symbols[1]).toBe(record.symbols[1]);
    const canonicalRecord = { ...record, symbols: [createSymbol('Widget', record.recordId), record.symbols[1]] };
    expect(serializeMetadata(result.records[0].record)).toBe(serializeMetadata(canonicalRecord));
    expect(record.symbols[0].fingerprint).toEqual(previous.fingerprint);
    expect(deduplicateRecords([{ record: canonicalRecord, source }], []).records[0].record).toBe(canonicalRecord);
  });

  it('copies only changed symbol branches and preserves original records and canonical bytes', () => {
    const imported = { ...createRecord(), recordId: 'api:types-import' };
    const required = { ...createRecord(), recordId: 'api:types-require' };
    imported.symbols = [createSymbol('Widget', imported.recordId), createSymbol('Stable')];
    required.symbols = [createSymbol('Widget', required.recordId), createSymbol('Stable')];
    const routes: ExportRoute[] = [imported, required].map((record, index) => ({
      id: `route-${index}`,
      entrypoint: '.',
      export: 'Widget',
      namespace: 'type',
      conditions: index ? ['types', 'require'] : ['types', 'import'],
      exportKind: 'named',
      typeOnly: true,
      target: { kind: 'local', record: record.recordId, symbol: 'Widget' },
      classifications: [],
    }));
    const originalBytes = [serializeMetadata(imported), serializeMetadata(required)];

    const result = deduplicateRecords([{ record: imported }, { record: required }], routes);

    expect(result.records).toHaveLength(1);
    const merged = result.records[0].record;
    expect(merged.recordId).toBe('api');
    expect(merged.symbols[0]).not.toBe(imported.symbols[0]);
    expect(merged.symbols[1]).toBe(imported.symbols[1]);
    expect(merged.symbols[0].type?.references[0].target).toEqual({ kind: 'local', symbol: 'Widget', record: 'api' });
    expect(merged.symbols[0].type?.text).toBe('Widget | readonly string[]');
    const expectedSymbol = createSymbol('Widget', 'api');
    expect(serializeMetadata(merged)).toBe(
      serializeMetadata({ ...imported, recordId: 'api', symbols: [expectedSymbol, imported.symbols[1]] }),
    );
    expect(merged.symbols[0].fingerprint).toEqual(expectedSymbol.fingerprint);
    expect(result.routes.map(route => route.target)).toEqual([
      { kind: 'local', record: 'api', symbol: 'Widget' },
      { kind: 'local', record: 'api', symbol: 'Widget' },
    ]);
    expect([serializeMetadata(imported), serializeMetadata(required)]).toEqual(originalBytes);
  });
});

function createSymbol(name: string, record?: string): ApiSymbol {
  const authored: Omit<ApiSymbol, 'fingerprint'> = {
    id: name,
    name,
    namespaces: ['type'],
    declarations: [],
    relationships: [],
    type: {
      text: 'Widget | readonly string[]',
      references: record
        ? [{ start: 0, end: 6, status: 'resolved', target: { kind: 'local', symbol: 'Widget', record } }]
        : [],
    },
    classifications: [],
  };
  return { ...authored, fingerprint: fingerprintSerializedMetadata(JSON.stringify(toCanonicalJsonValue(authored))) };
}

function createRecord(): ApiRecord {
  return {
    kind: 'api-record',
    schema: { major: 1, revision: 0 },
    generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
    package: { name: '@fluentui/example', version: '1.0.0' },
    recordId: 'api',
    declarationInputs: [],
    dependencyInputs: [],
    completeness: { status: 'complete' },
    symbols: [],
    diagnostics: [],
  };
}
