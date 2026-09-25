import type { ApiRecord, PackageIndex, SlotPresentation } from './types';
import { validateApiRecord, validateCatalog, validatePackageIndex, validateSerializedMetadata } from './validate';

const fingerprint = { algorithm: 'sha256' as const, value: 'a'.repeat(64) };
const slotPresentation: SlotPresentation = {
  kind: 'slot',
  summary: "Slot<'span'>",
  basis: 'declaration',
  slotType: {
    kind: 'dependency',
    package: '@fluentui/react-utilities',
    entrypoint: '.',
    export: 'Slot',
    namespace: 'type',
  },
  targets: [{ kind: 'intrinsic', name: 'span', role: 'default' }],
  nullable: true,
};

describe('metadata validation', () => {
  it('validates slot facts and traverses their symbol references', () => {
    const record = createRecord();
    const prop = record.symbols[0].effectiveType!.members[0];
    prop.presentation = { ...slotPresentation };
    expect(validateApiRecord(record).valid).toBe(true);
    prop.presentation.slotType = { kind: 'local', symbol: 'missing-slot' };
    expect(codes(validateApiRecord(record))).toContain('reference.symbol');
    prop.presentation.slotType = slotPresentation.slotType;
    prop.presentation.targets = [
      {
        kind: 'component',
        name: 'Missing',
        role: 'default',
        reference: { kind: 'local', symbol: 'missing-component' },
      },
    ];
    expect(codes(validateApiRecord(record))).toContain('reference.symbol');
  });

  it.each([
    null,
    { ...slotPresentation, kind: 'unknown' },
    { ...slotPresentation, summary: '' },
    { ...slotPresentation, nullable: 'true' },
    { ...slotPresentation, slotType: null },
    { ...slotPresentation, targets: {} },
    { ...slotPresentation, targets: [null] },
    { ...slotPresentation, targets: [{ kind: 'component', name: 'Button', role: 'default' }] },
    { ...slotPresentation, targets: [...slotPresentation.targets, ...slotPresentation.targets] },
  ])('rejects malformed slot presentations without throwing (%j)', presentation => {
    const record = createRecord();
    const view = record.symbols[0].effectiveType!;
    expect(
      validateApiRecord({
        ...record,
        symbols: [
          {
            ...record.symbols[0],
            effectiveType: {
              ...view,
              members: [{ ...view.members[0], presentation }],
            },
          },
        ],
      }).valid,
    ).toBe(false);
  });

  it('accepts a canonical index and API shard with semantic references', () => {
    const result = validateCatalog(createIndex(), [createRecord()]);

    expect(result).toEqual({
      valid: true,
      value: { index: createIndex(), records: [createRecord()] },
      diagnostics: [],
    });
  });

  it('validates bundled records without assigning their definitions to the container package', () => {
    const index = createIndex();
    const record = createRecord();
    const source = {
      kind: 'dependency' as const,
      packages: [
        {
          requested: '@third/bridge',
          package: { name: '@third/owner', version: '2.0.0' },
          declarationInputs: [
            {
              path: 'index.d.ts',
              conditions: ['types', 'import'],
              fingerprint,
            },
          ],
        },
      ],
    };
    index.records[0].source = source;
    index.exports[0].target = { kind: 'bundled', record: record.recordId, symbol: record.symbols[0].id };
    record.package = source.packages[0].package;

    expect(validateCatalog(index, [record]).valid).toBe(true);

    index.exports[0].target = { kind: 'local', record: record.recordId, symbol: record.symbols[0].id };
    expect(codes(validateCatalog(index, [record]))).toContain('reference.recordSource');
    index.exports[0].target = { kind: 'bundled', record: record.recordId, symbol: record.symbols[0].id };
    source.packages[0].declarationInputs[0].path = '../outside.d.ts';
    expect(codes(validateCatalog(index, [record]))).toContain('path.containment');
  });

  it('models renamed, default, and dependency re-exports independently from definitions', () => {
    const index = createIndex();
    index.exports.push(
      {
        id: 'route.PrimaryButton.value',
        entrypoint: '.',
        export: 'PrimaryButton',
        namespace: 'value',
        conditions: ['types', 'import'],
        exportKind: 'named',
        importedName: 'Button',
        typeOnly: false,
        target: {
          kind: 'dependency',
          package: '@fluentui/react-button',
          entrypoint: '.',
          export: 'Button',
          namespace: 'value',
          requested: '@fluentui/react-button',
          range: '^9.0.0',
          dependencyRole: 'dependency',
        },
        classifications: [{ facet: 'component', confidence: 'authored', evidence: ['pilot input'] }],
      },
      {
        id: 'route.default.value',
        entrypoint: './default',
        export: 'default',
        namespace: 'value',
        conditions: ['types', 'default'],
        exportKind: 'default',
        importedName: 'Button',
        typeOnly: false,
        target: {
          kind: 'dependency',
          package: '@fluentui/react-button',
          entrypoint: '.',
          export: 'Button',
          namespace: 'value',
        },
        classifications: [],
      },
    );

    expect(validatePackageIndex(index).valid).toBe(true);
  });

  it('rejects duplicate public routes even when their IDs differ', () => {
    const index = createIndex();
    index.exports.push({ ...index.exports[0], id: 'route.ButtonProps.duplicate' });

    expect(codes(validatePackageIndex(index))).toContain('identity.duplicate');
  });

  it('rejects unsafe links and malformed or duplicate declaration conditions', () => {
    const index = createIndex();
    index.records[0].path = '../outside.json';
    index.declarationInputs[0].conditions = ['types', 'types', '../import'];
    index.exports[0].declarationInputs = ['missing.d.ts'];

    expect(codes(validatePackageIndex(index))).toEqual(
      expect.arrayContaining(['path.containment', 'identity.duplicate', 'string.format', 'reference.declarationInput']),
    );
  });

  it('rejects invalid namespaces and duplicate symbol or declaration IDs', () => {
    const record = createRecord();
    record.symbols.push({ ...record.symbols[0] });
    record.symbols[0].namespaces = ['type', 'type'];
    record.symbols[0].declarations.push({ ...record.symbols[0].declarations[0] });

    const result = validateApiRecord(record);
    expect(codes(result)).toEqual(expect.arrayContaining(['identity.duplicate', 'identity.duplicate']));
  });

  it('rejects unsafe dependency declaration verification paths', () => {
    const record = createRecord();
    record.dependencyInputs[0].declarationPath = '../outside.d.ts';

    expect(codes(validateApiRecord(record))).toContain('path.containment');
  });

  it('validates props views, signature links, bounds and nested symbol references', () => {
    const record = createRecord();
    record.symbols[0].effectiveType = {
      status: { status: 'complete' },
      members: [],
      signatures: [
        {
          id: 'signature:call:0',
          kind: 'call',
          overload: 0,
          typeParameters: [],
          parameters: [],
          returnType: { text: 'void', references: [] },
        },
      ],
    };
    record.symbols[0].props = [
      {
        signature: 'signature:call:0',
        type: {
          status: { status: 'complete' },
          signatures: [],
          members: [
            {
              name: 'disabled',
              kind: 'property',
              optional: true,
              readonly: false,
              status: { status: 'complete' },
              type: { text: 'boolean', references: [] },
              sources: [{ kind: 'local', symbol: record.symbols[0].id }],
            },
          ],
        },
      },
    ];
    expect(validateApiRecord(record).valid).toBe(true);
    const prop = record.symbols[0].props[0].type.members[0];
    prop.declarationPackages = ['@types/react', '@scope/control'];
    expect(validateApiRecord(record).valid).toBe(true);
    prop.declarationPackages = [];
    expect(codes(validateApiRecord(record))).toContain('member.declarationPackages');
    prop.declarationPackages = ['@types/react', '@types/react'];
    expect(codes(validateApiRecord(record))).toContain('identity.duplicate');
    prop.declarationPackages = ['/absolute/path'];
    expect(codes(validateApiRecord(record))).toContain('string.format');
    prop.declarationPackages = undefined;
    prop.defaultValue = 'false';
    expect(validateApiRecord(record).valid).toBe(true);
    expect(
      validateApiRecord({
        ...record,
        symbols: [
          {
            ...record.symbols[0],
            props: [
              {
                ...record.symbols[0].props[0],
                type: { ...record.symbols[0].props[0].type, members: [{ ...prop, defaultValue: false }] },
              },
            ],
          },
        ],
      }).valid,
    ).toBe(false);
    record.symbols[0].props[0].signature = 'missing';
    expect(codes(validateApiRecord(record))).toContain('reference.signature');
    record.symbols[0].props[0].signature = 'signature:call:0';
    record.symbols[0].props[0].type.members[0].sources.push({ kind: 'local', symbol: 'missing' });
    expect(codes(validateApiRecord(record))).toContain('reference.symbol');
    expect(codes(validateApiRecord(record, { bounds: { maxDepth: 3 } }))).toContain('bounds.depth');
  });

  it('rejects invalid spans and missing local reference targets', () => {
    const record = createRecord();
    record.symbols[0].type = {
      text: 'Missing',
      references: [
        {
          start: 0,
          end: 20,
          status: 'resolved',
          target: { kind: 'local', symbol: 'missing.symbol' },
        },
      ],
    };

    expect(codes(validateApiRecord(record))).toContain('reference.range');

    record.symbols[0].type = {
      text: 'Missing',
      references: [
        {
          start: 0,
          end: 7,
          status: 'resolved',
          target: { kind: 'local', symbol: 'missing.symbol' },
        },
      ],
    };
    expect(codes(validateApiRecord(record))).toContain('reference.symbol');
  });

  it.each([{ signatures: null }, { signatures: {} }, { signatures: 'invalid' }, { signatures: [null] }])(
    'rejects malformed props with invalid signatures $signatures without throwing',
    ({ signatures }) => {
      const record = createRecord();
      const malformed = {
        ...record,
        symbols: [
          {
            ...record.symbols[0],
            effectiveType: { status: { status: 'complete' }, members: [], signatures },
            props: [{ signature: 'signature:call:0', type: { status: null, members: [], signatures: [] } }],
          },
        ],
      };
      expect(() => validateApiRecord(malformed)).not.toThrow();
      expect(validateApiRecord(malformed).valid).toBe(false);
      expect(validateApiRecord(malformed).diagnostics.length).toBeGreaterThan(0);
    },
  );

  it('checks route namespaces against the target declaration', () => {
    const index = createIndex();
    index.exports[0].namespace = 'value';
    index.exports[0].typeOnly = false;

    expect(codes(validateCatalog(index, [createRecord()]))).toContain('reference.namespace');
  });

  it('rejects unsupported statuses that omit an explanation', () => {
    const record = createRecord();
    record.completeness = { status: 'partial' };

    expect(codes(validateApiRecord(record))).toContain('status.reason');
  });

  it('enforces configured structural bounds before semantic validation', () => {
    const result = validateApiRecord(createRecord(), { bounds: { maxDepth: 2 } });

    expect(codes(result)).toContain('bounds.depth');
  });

  it('bounds serialized bytes and reports malformed JSON without evaluating code', () => {
    expect(codes(validateSerializedMetadata('{"kind":"package-index"}', { bounds: { maxBytes: 5 } }))).toContain(
      'bounds.bytes',
    );
    expect(codes(validateSerializedMetadata('module.exports = {}'))).toContain('document.json');
  });

  it('returns invalid instead of throwing for malformed nested routes and cyclic objects', () => {
    const malformed = createIndex() as unknown as {
      exports: Array<{ conditions: unknown; target: unknown }>;
    };
    malformed.exports[0].conditions = null;
    malformed.exports[0].target = null;

    expect(() => validatePackageIndex(malformed)).not.toThrow();
    expect(validatePackageIndex(malformed).valid).toBe(false);

    const cyclic = createIndex() as PackageIndex & { cycle?: unknown };
    cyclic.cycle = cyclic;
    const result = validatePackageIndex(cyclic);
    expect(result.valid).toBe(false);
    expect(codes(result)).toContain('structure.cycle');
  });

  it('rejects invalid bounds even when diagnostic storage would otherwise be disabled', () => {
    for (const bounds of [
      { maxDiagnostics: 0 },
      { maxDepth: -1 },
      { maxRoutes: Number.NaN },
      { maxBytes: 1.5 },
      { unknownBound: 1 } as never,
    ]) {
      const result = validatePackageIndex(createIndex(), { bounds });
      expect(result.valid).toBe(false);
      expect(result.diagnostics.length).toBeGreaterThan(0);
      expect(codes(result)).toContain('bounds.option');
    }
  });

  it('supports lazy catalog validation without requiring unrelated advertised records', () => {
    const index = createIndex();
    index.records.push({
      id: 'unrelated-api',
      kind: 'api',
      path: 'api/unrelated.json',
      fingerprint,
      symbols: ['Unrelated:value'],
    });
    index.exports.push({
      id: 'route.Unrelated.value',
      entrypoint: '.',
      export: 'Unrelated',
      namespace: 'value',
      conditions: ['types', 'import'],
      exportKind: 'named',
      typeOnly: false,
      target: { kind: 'local', record: 'unrelated-api', symbol: 'Unrelated:value' },
      classifications: [],
    });

    expect(validateCatalog(index, [createRecord()], { requireAllApiRecords: false }).valid).toBe(true);
    expect(
      codes(
        validateCatalog(index, [createRecord()], {
          requireAllApiRecords: false,
          selectedRecordIds: ['unrelated-api'],
        }),
      ),
    ).toContain('reference.record');
  });
});

function createIndex(): PackageIndex {
  return {
    kind: 'package-index',
    schema: { major: 1, revision: 0 },
    generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
    package: { name: '@fluentui/example', version: '1.0.0' },
    system: 'fluent-v9',
    capabilities: {
      api: { status: 'supported' },
      effectiveTypes: { status: 'partial', reasons: ['bounded checker views'] },
      guidance: { status: 'unsupported', reasons: ['not generated'] },
      search: { status: 'unsupported', reasons: ['not generated'] },
    },
    completeness: {
      api: { status: 'complete' },
      guidance: { status: 'unavailable', reasons: ['not generated'] },
      search: { status: 'unavailable', reasons: ['not generated'] },
    },
    declarationInputs: [
      {
        path: 'dist/index.d.ts',
        conditions: ['types', 'import'],
        fingerprint,
      },
    ],
    records: [
      {
        id: 'button-api',
        kind: 'api',
        path: 'api/button.json',
        fingerprint,
        symbols: ['ButtonProps:type'],
      },
    ],
    exports: [
      {
        id: 'route.ButtonProps.type',
        entrypoint: '.',
        export: 'ButtonProps',
        namespace: 'type',
        conditions: ['types', 'import'],
        exportKind: 'named',
        typeOnly: true,
        target: { kind: 'local', record: 'button-api', symbol: 'ButtonProps:type' },
        classifications: [{ facet: 'props', confidence: 'heuristic', evidence: ['name suffix Props'] }],
      },
    ],
    diagnostics: [],
  };
}

function createRecord(): ApiRecord {
  return {
    kind: 'api-record',
    schema: { major: 1, revision: 0 },
    generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
    package: { name: '@fluentui/example', version: '1.0.0' },
    recordId: 'button-api',
    declarationInputs: [
      {
        path: 'dist/index.d.ts',
        conditions: ['types', 'import'],
        fingerprint,
      },
    ],
    dependencyInputs: [
      {
        requested: '@fluentui/react-utilities',
        package: { name: '@fluentui/react-utilities', version: '9.0.0' },
        entrypoint: '.',
        conditions: ['types', 'import'],
        declarationFingerprint: fingerprint,
      },
    ],
    completeness: { status: 'complete' },
    symbols: [
      {
        id: 'ButtonProps:type',
        name: 'ButtonProps',
        namespaces: ['type'],
        declarations: [
          {
            id: 'ButtonProps:type#0',
            kind: 'type-alias',
            namespaces: ['type'],
            source: { file: 'dist/index.d.ts', start: 0, end: 42 },
            type: {
              text: 'BaseProps & { disabled?: boolean }',
              references: [
                {
                  start: 0,
                  end: 9,
                  status: 'resolved',
                  target: {
                    kind: 'dependency',
                    package: '@fluentui/react-utilities',
                    entrypoint: '.',
                    export: 'BaseProps',
                    namespace: 'type',
                  },
                },
              ],
            },
            relationships: [
              {
                kind: 'intersection',
                type: {
                  text: 'BaseProps',
                  references: [
                    {
                      start: 0,
                      end: 9,
                      status: 'resolved',
                      target: {
                        kind: 'dependency',
                        package: '@fluentui/react-utilities',
                        entrypoint: '.',
                        export: 'BaseProps',
                        namespace: 'type',
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
        type: {
          text: 'BaseProps & { disabled?: boolean }',
          references: [
            {
              start: 0,
              end: 9,
              status: 'resolved',
              target: {
                kind: 'dependency',
                package: '@fluentui/react-utilities',
                entrypoint: '.',
                export: 'BaseProps',
                namespace: 'type',
              },
            },
          ],
        },
        relationships: [],
        effectiveType: {
          status: { status: 'partial', reasons: ['external base members remain symbolic'] },
          members: [
            {
              name: 'disabled',
              kind: 'property',
              optional: true,
              readonly: false,
              type: { text: 'boolean', references: [] },
              sources: [{ kind: 'local', symbol: 'ButtonProps:type' }],
              status: { status: 'complete' },
            },
          ],
          signatures: [],
        },
        classifications: [{ facet: 'props', confidence: 'heuristic', evidence: ['name suffix Props'] }],
        fingerprint,
      },
    ],
    diagnostics: [],
  };
}

function codes(result: { valid: boolean; diagnostics: { code: string }[] }): string[] {
  return result.diagnostics.map(diagnostic => diagnostic.code);
}
