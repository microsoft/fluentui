import { fingerprintMetadata, serializeMetadata, toCanonicalJsonValue } from './serialize';
import type { ApiRecord } from './types';

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
