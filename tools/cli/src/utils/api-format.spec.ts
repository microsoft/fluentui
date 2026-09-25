import type { ApiSymbol, EffectiveTypeView } from '@fluentui/api-metadata';
import { formatApiDetail, formatApiIndex } from './api-format';
import { createDenseApiDetail, createDenseApiIndex } from './api-dense';
import type { ApiRouteSummary, ApiSymbolDetail } from './api-query';
import type { CliDiagnostic } from './diagnostics';

const route: ApiRouteSummary = {
  package: '@fluentui/react-button',
  requestedPackage: '@fluentui/react-button',
  version: '9.11.0',
  entrypoint: '.',
  export: 'Button',
  namespace: 'value',
  exportKind: 'named',
  typeOnly: false,
  conditions: ['types', 'import'],
  systems: ['fluent-v9'],
  source: 'dependency',
  metadata: true,
  command: 'fluentui-cli api Button --from @fluentui/react-button',
};
const props: EffectiveTypeView = {
  status: { status: 'complete' },
  type: { text: 'ButtonProps', references: [] },
  members: [
    {
      name: 'appearance',
      kind: 'property',
      optional: true,
      readonly: false,
      type: { text: '"primary" | "secondary"', references: [] },
      documentation: 'Visual emphasis of the button.',
      defaultValue: "'secondary'",
      sources: [],
      declarationPackages: ['@fluentui/react-button'],
      status: { status: 'complete' },
    },
    {
      name: 'disabled',
      kind: 'property',
      optional: true,
      readonly: false,
      type: { text: 'boolean', references: [] },
      sources: [],
      declarationPackages: ['@fluentui/react-button'],
      status: { status: 'complete' },
    },
    {
      name: 'value',
      kind: 'property',
      optional: false,
      readonly: false,
      type: { text: 'number', references: [] },
      sources: [],
      declarationPackages: ['@fluentui/react-button'],
      status: { status: 'complete' },
    },
  ],
  signatures: [],
};
const symbol: ApiSymbol = {
  id: 'Button',
  name: 'Button',
  namespaces: ['value'],
  declarations: [
    {
      id: 'Button:declaration',
      kind: 'variable',
      namespaces: ['value'],
      source: { file: 'dist/index.d.ts' },
      documentation: 'Triggers an action.',
    },
  ],
  type: { text: 'ForwardRefComponent<ButtonProps>', references: [] },
  relationships: [],
  effectiveType: {
    status: { status: 'complete' },
    members: [],
    signatures: [
      {
        id: 'signature:call:0',
        kind: 'call',
        overload: 0,
        typeParameters: [],
        parameters: [{ name: 'props', type: { text: 'ButtonProps', references: [] }, optional: false, rest: false }],
        returnType: { text: 'ReactElement', references: [] },
      },
    ],
  },
  props: [{ signature: 'signature:call:0', type: props }],
  classifications: [{ facet: 'component', confidence: 'authored', evidence: ['fixture'] }],
  fingerprint: { algorithm: 'sha256', value: 'a'.repeat(64) },
};
const detail: ApiSymbolDetail = {
  recommendedImport: {
    moduleSpecifier: '@fluentui/react-components',
    exportName: 'Button',
    localName: 'Button',
    kind: 'named',
    typeOnly: false,
    statement: 'import { Button } from "@fluentui/react-components";',
    reason: 'configured-catalog',
  },
  importStatus: 'selected',
  importCandidates: [],
  name: 'Button',
  package: route.package,
  version: route.version,
  symbol,
  recordId: 'api:root:types-import',
  routes: [route, { ...route, conditions: ['types', 'require'] }],
  resolvedPackages: [],
};
const diagnostics: CliDiagnostic[] = [
  {
    code: 'reader.effectiveTypePartial',
    severity: 'warning',
    message: 'checker-rendered effective type expressions do not include semantic reference spans',
  },
  { code: 'reader.indexPartial', severity: 'warning', message: 'Suite routes to pilot leaves' },
];

describe('dense API projection', () => {
  it('retains useful API data without raw declarations, routes, or redundant import candidates', () => {
    const before = JSON.stringify(detail);
    const dense = createDenseApiDetail(detail);
    expect(dense).toMatchObject({
      name: 'Button',
      detailStatus: 'available',
      recommendedImport: detail.recommendedImport,
      importStatus: 'selected',
      description: 'Triggers an action.',
      signatures: ['(props: ButtonProps) => ReactElement'],
      props: [
        {
          total: 3,
          omittedInherited: 0,
          members: [
            expect.objectContaining({
              name: 'appearance',
              type: '"primary" | "secondary"',
              default: "'secondary'",
              required: false,
            }),
            expect.objectContaining({ name: 'disabled', required: false }),
            expect.objectContaining({ name: 'value', required: true }),
          ],
        },
      ],
    });
    for (const key of ['symbol', 'routes', 'resolvedPackages', 'recordId', 'importCandidates', 'provenance']) {
      expect(dense).not.toHaveProperty(key);
    }
    expect(JSON.stringify(dense)).not.toMatch(/"fingerprint"|"references"|"sources"|"declarations"/);
    expect(JSON.stringify(detail)).toBe(before);
  });

  it('shares Markdown member selection and slot types, with independent expansion flags', () => {
    const slot = {
      ...props.members[0],
      name: 'icon',
      declarationPackages: ['@types/react', '@fluentui/react-button'],
      type: { text: 'WithSlotShorthandValue<NativeSpanProps>', references: [] },
      presentation: {
        kind: 'slot' as const,
        summary: "Slot<'span'>",
        basis: 'declaration' as const,
        slotType: { kind: 'local' as const, symbol: 'Slot' },
        targets: [{ kind: 'intrinsic' as const, name: 'span', role: 'default' as const }],
      },
    };
    const view = {
      ...props,
      members: [
        {
          ...props.members[0],
          name: 'onClick',
          declarationPackages: ['@types/react'],
          status: { status: 'partial' as const, reasons: ['Type truncated'] },
        },
        slot,
        { ...props.members[2], readonly: true, deprecated: 'Use another prop.', declarationPackages: undefined },
      ],
    };
    const input = { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } };
    const dense = createDenseApiDetail(input);
    expect(dense.props?.[0].members.map(member => member.name)).toEqual(['icon', 'value']);
    expect(dense.props?.[0].members[0]).toMatchObject({ type: "Slot<'span'>", typeSummary: 'slot', origin: 'control' });
    expect(dense.props?.[0].members[1]).toMatchObject({
      origin: 'unclassified',
      readonly: true,
      deprecated: 'Use another prop.',
    });
    expect(dense.props?.[0].omittedInherited).toBe(1);
    expect(dense.props?.[0].omittedIssues).toEqual([{ name: 'onClick', status: view.members[0].status }]);
    expect(dense.notes?.join(' ')).toContain('--expand-types');
    const markdown = formatApiDetail(input, []);
    for (const member of dense.props?.[0].members ?? []) {
      expect(markdown).toContain(`| \`${member.name}\` |`);
    }
    for (const options of [{ verbose: true }, { includeInherited: true }]) {
      const expanded = createDenseApiDetail(input, options);
      expect(expanded.props?.[0].members[0].type).toBe("Slot<'span'>");
      expect(expanded.props?.[0].members.length).toBe('includeInherited' in options ? 3 : 2);
    }
    const expanded = createDenseApiDetail(input, { expandTypes: true });
    expect(expanded.props?.[0].members[0]).toMatchObject({ type: 'WithSlotShorthandValue<NativeSpanProps>' });
    expect(expanded.props?.[0].members[0].typeSummary).toBeUndefined();
    expect(expanded.props?.[0].omittedInherited).toBe(1);
  });

  it('keeps ambiguity, missing detail, missing props, and unsupported views explicit', () => {
    const missing = createDenseApiDetail({
      ...detail,
      symbol: undefined,
      recommendedImport: null,
      importStatus: 'ambiguous',
      importCandidates: [detail.recommendedImport!],
    });
    expect(missing).toMatchObject({
      detailStatus: 'unavailable',
      recommendedImport: null,
      importStatus: 'ambiguous',
      importCandidates: [detail.recommendedImport],
    });
    const noMetadata = createDenseApiDetail({ ...detail, symbol: { ...symbol, props: undefined } });
    expect(noMetadata.props).toBeNull();
    expect(noMetadata.notes?.join(' ')).toContain('Props unavailable');
    expect(createDenseApiDetail({ ...detail, symbol: { ...symbol, props: [] } }).props).toEqual([]);
    const unsupported: EffectiveTypeView = {
      status: { status: 'unsupported', reasons: ['Dependency drift'] },
      members: [],
      signatures: [],
    };
    const stale = createDenseApiDetail({
      ...detail,
      symbol: {
        ...symbol,
        declarations: [{ ...symbol.declarations[0], signatures: symbol.effectiveType!.signatures }],
        effectiveType: unsupported,
        props: [{ signature: 'signature:call:0', type: unsupported }],
      },
    });
    expect(stale.signatures).toBeUndefined();
    expect(stale.effectiveTypeStatus).toEqual(unsupported.status);
    expect(stale.props?.[0]).toMatchObject({ status: unsupported.status, members: [] });
    expect(
      createDenseApiDetail({
        ...detail,
        symbol: {
          ...symbol,
          effectiveType: undefined,
          declarations: [{ ...symbol.declarations[0], signatures: symbol.effectiveType!.signatures }],
        },
      }).signatures,
    ).toEqual(['(props: ButtonProps) => ReactElement']);
  });

  it('preserves callable members and distinguishes unavailable member types from empty values', () => {
    const input = {
      ...detail,
      symbol: {
        ...symbol,
        props: [
          {
            signature: 'signature:call:0',
            type: {
              ...props,
              members: [
                {
                  ...props.members[0],
                  name: 'method',
                  type: undefined,
                  signatures: symbol.effectiveType!.signatures,
                  defaultValue: '',
                  documentation: 'Line one.\nLine two.',
                },
                {
                  ...props.members[1],
                  type: undefined,
                  status: { status: 'unsupported' as const, reasons: ['Type unavailable'] },
                },
              ],
            },
          },
        ],
      },
    };
    const members = createDenseApiDetail(input).props?.[0].members;
    expect(members?.[0]).toMatchObject({
      type: '(props: ButtonProps) => ReactElement',
      default: '',
      description: 'Line one. Line two.',
    });
    expect(members?.[1]).toMatchObject({
      type: null,
      status: { status: 'unsupported', reasons: ['Type unavailable'] },
    });
  });

  it('preserves overloads, generic signatures, direct type members, defaults, and union limitations', () => {
    const first = symbol.effectiveType!.signatures[0];
    const generic = {
      ...first,
      id: 'generic',
      overload: 1,
      typeParameters: [{ name: 'T', constraint: { text: 'string', references: [] } }],
    };
    const overloaded = createDenseApiDetail({
      ...detail,
      symbol: {
        ...symbol,
        effectiveType: { ...symbol.effectiveType!, signatures: [first, generic] },
        props: [
          { signature: first.id, type: props },
          { signature: generic.id, type: props },
        ],
      },
    });
    expect(overloaded.signatures).toEqual([
      '(props: ButtonProps) => ReactElement',
      '<T extends string>(props: ButtonProps) => ReactElement',
    ]);
    expect(overloaded.props?.map(view => view.signature)).toEqual(overloaded.signatures);
    const view = {
      ...props,
      members: [props.members[0], { ...props.members[1], declarationPackages: ['@types/react'] }],
      unionBranches: [
        { text: 'LeftVariant', references: [] },
        { text: 'RightVariant', references: [] },
      ],
    };
    for (const facet of ['props', 'hook'] as const) {
      const input = {
        ...detail,
        symbol: {
          ...symbol,
          props: undefined,
          classifications: [{ facet, confidence: 'authored' as const, evidence: [] }],
          effectiveType: view,
        },
      };
      const dense = createDenseApiDetail(input);
      expect(dense.props).toBeUndefined();
      expect(dense.members?.members[0].default).toBe("'secondary'");
      expect(dense.members?.unionVariants).toEqual({ count: 2 });
      expect(createDenseApiDetail(input, { includeInherited: true }).members?.unionVariants?.expressions).toEqual([
        'LeftVariant',
        'RightVariant',
      ]);
    }
  });

  it('deduplicates condition variants without collapsing aliases, versions, namespaces, or type-only bindings', () => {
    const routes = [
      ...detail.routes,
      { ...route, requestedPackage: 'alias' },
      { ...route, version: '10.0.0' },
      { ...route, namespace: 'type' as const },
      { ...route, typeOnly: true },
      { ...route, entrypoint: './button' },
    ];
    const dense = createDenseApiIndex(routes);
    expect(dense).toHaveLength(6);
    expect(dense[0]).toMatchObject({ name: 'Button', importPath: '@fluentui/react-button', typeOnly: false });
    expect(dense[0].conditions).toBeUndefined();
    expect(createDenseApiIndex(routes, { verbose: true })[0].conditions).toEqual([
      ['types', 'import'],
      ['types', 'require'],
    ]);
    expect(createDenseApiDetail(detail, { verbose: true }).provenance).toMatchObject({
      package: detail.package,
      recordId: detail.recordId,
      routes: [
        expect.objectContaining({
          conditions: [
            ['types', 'import'],
            ['types', 'require'],
          ],
        }),
      ],
    });
  });
});

describe('human API output', () => {
  it('lists each public export once across import/require conditions', () => {
    const output = formatApiIndex(detail.routes, []);
    expect(output).toContain('Fluent UI APIs (1)');
    expect(output.match(/\| `Button` \| value \|/g)).toHaveLength(1);
    expect(output).not.toContain('Conditions');
    const verbose = formatApiIndex(detail.routes, [], true);
    expect(verbose).toContain('| Conditions |');
    expect(verbose).toContain('`types, import`; `types, require`');
  });

  it('retains distinct subpaths, namespaces, aliases and installed versions', () => {
    const output = formatApiIndex(
      [
        route,
        { ...route, entrypoint: './button' },
        { ...route, namespace: 'type' },
        { ...route, requestedPackage: '@private/button' },
        { ...route, version: '10.0.0' },
      ],
      [],
    );
    expect(output).toContain('Fluent UI APIs (5)');
    expect(output).toContain('@fluentui/react-button/button');
    expect(output).toContain('@private/button');
    expect(output).toContain('10.0.0');
    expect(output).toContain('| `Button` | type |');
  });

  it('shows qualified imports, full signatures, props, literal types, optionality and documentation', () => {
    const output = formatApiDetail(
      {
        ...detail,
        routes: [
          ...detail.routes,
          { ...route, package: '@fluentui/react-components', requestedPackage: '@fluentui/react-components' },
        ],
      },
      [],
    );
    expect(output).toContain('Triggers an action.');
    expect(output).toContain('import { Button } from "@fluentui/react-components";');
    expect(output).toContain('Selected from your configured public catalogs.');
    expect(output).not.toContain('@fluentui/react-button');
    expect(output).not.toContain('## All export routes');
    expect(output).not.toContain('**Package:**');
    expect(output).toContain('(props: ButtonProps) => ReactElement');
    expect(output).toContain('## Props');
    expect(output).toContain('**Type:** `ButtonProps`');
    expect(output).toContain('3 members.');
    expect(output).toContain('| Prop | Type | Default | Description |');
    expect(output).toContain('| `appearance` | `"primary" \\| "secondary"` | `\'secondary\'` |');
    expect(output).toContain('Visual emphasis of the button.');
    expect(output).toContain('| `disabled` | `boolean` | — |');
    expect(output).toContain('| `value` | `number` | — | **(required)** |');
    expect(output).not.toContain('**Record:**');
  });

  it('keeps internal capability diagnostics in verbose output, with a concise coverage note by default', () => {
    const output = formatApiDetail(detail, diagnostics);
    expect(output).not.toContain('reader.effectiveTypePartial');
    expect(output).not.toContain('semantic reference spans');
    expect(output).not.toContain('reader.indexPartial');
    expect(output).toContain('Catalog coverage is partial');
    const verbose = formatApiDetail(detail, diagnostics, true);
    expect(verbose).toContain('reader.effectiveTypePartial');
    expect(verbose).toContain('reader.indexPartial');
    expect(verbose).toContain('**Record:** `api:root:types-import`');
    expect(verbose).toContain('**Defined in:** `@fluentui/react-button@9.11.0`');
    expect(verbose).toContain('## All export routes');
  });

  it('does not manufacture an import when the selector reports ambiguity or unavailable detail', () => {
    const output = formatApiDetail(
      {
        ...detail,
        recommendedImport: null,
        importStatus: 'ambiguous',
        importCandidates: [detail.recommendedImport!],
      },
      [{ code: 'CLI_API_IMPORT_AMBIGUOUS', severity: 'warning', message: 'Select a public path.' }],
    );
    expect(output).toContain('No import recommended (ambiguous)');
    expect(output).toContain('`--from @fluentui/react-components`');
    expect(output).not.toContain('import { Button }');
    expect(output).toContain('Select a public path.');
  });

  it('preserves documented defaults, Markdown descriptions and member annotations without changing metadata', () => {
    const view: EffectiveTypeView = {
      ...props,
      members: [
        {
          ...props.members[2],
          type: { text: '`id-${string}` | Array<T>', references: [] },
          defaultValue: '0',
          readonly: true,
          documentation: 'Choose **carefully**: `a` | `b`.\nSecond line.',
          deprecated: 'Use the replacement.',
          status: { status: 'partial', reasons: ['Some detail is unavailable'] },
        },
      ],
    };
    const value = { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } };
    const before = JSON.stringify(value);
    const output = formatApiDetail(value, []);
    expect(output).toContain('| `value` | `` `id-${string}` \\| Array<T> `` | `0` |');
    expect(output).toContain('Choose **carefully**: `a` \\| `b`. Second line.');
    expect(output).toContain('**(required)** **(readonly)** **Deprecated:** Use the replacement.');
    expect(output).toContain('**partial:** Some detail is unavailable');
    expect(JSON.stringify(value)).toBe(before);
  });

  it('never hides dependency drift, truncation, missing props, or errors', () => {
    const issues: CliDiagnostic[] = [
      { code: 'reader.dependencyDeclarationDrift', severity: 'warning', message: 'Dependency declarations changed.' },
      { code: 'reader.effectiveTypePartial', severity: 'warning', message: 'member count exceeds 2000' },
      { code: 'reader.indexPartial', severity: 'error', message: 'Broken index' },
    ];
    const output = formatApiDetail({ ...detail, symbol: { ...symbol, props: undefined } }, issues);
    expect(output).toContain('Props unavailable: regenerate');
    expect(output).toContain('Dependency declarations changed.');
    expect(output).toContain('member count exceeds 2000');
    expect(output).toContain('[error] reader.indexPartial');
  });

  it('renders props types queried directly and does not confuse component object members with props', () => {
    const output = formatApiDetail(
      {
        ...detail,
        name: 'ButtonProps',
        symbol: {
          ...symbol,
          props: undefined,
          classifications: [{ facet: 'props', confidence: 'authored', evidence: [] }],
          effectiveType: props,
        },
      },
      [],
    );
    expect(output).toContain('## Props');
    expect(output).toContain('**Type:** `ButtonProps`');
    expect(output).toContain('| `appearance` |');
    expect(output).not.toContain('Props unavailable');
  });

  it('does not show stale expanded signatures or props after dependency invalidation', () => {
    const unsupported: EffectiveTypeView = {
      status: { status: 'unsupported', reasons: ['Dependency declarations changed'] },
      members: [],
      signatures: [],
    };
    const output = formatApiDetail(
      {
        ...detail,
        symbol: {
          ...symbol,
          effectiveType: unsupported,
          props: [{ signature: 'signature:call:0', type: unsupported }],
        },
      },
      [],
    );
    expect(output).toContain('Unavailable: Dependency declarations changed');
    expect(output).not.toContain('| `appearance` |');
    expect(output).not.toContain('(props: ButtonProps)');
  });

  it('distinguishes components with no props from catalogs without props metadata', () => {
    const output = formatApiDetail({ ...detail, symbol: { ...symbol, props: [] } }, []);
    expect(output).toContain('Props: none.');
    expect(output).not.toContain('Props unavailable');
  });

  it('prioritizes declaration-owned control APIs without guessing from names or React type references', () => {
    const view: EffectiveTypeView = {
      ...props,
      members: [
        {
          ...props.members[0],
          name: 'aria-label',
          declarationPackages: ['@types/react'],
          documentation: 'Generic ARIA documentation.',
        },
        {
          ...props.members[0],
          name: 'onClick',
          declarationPackages: ['react'],
          documentation: 'Generic React documentation.',
        },
        { ...props.members[0], name: 'nodeType', declarationPackages: ['typescript'] },
        {
          ...props.members[0],
          name: 'onChange',
          type: { text: 'React_2.ChangeEventHandler<HTMLInputElement>', references: [] },
          declarationPackages: ['@private/control'],
        },
        { ...props.members[1], declarationPackages: ['@types/react', '@fluentui/react-button'] },
      ],
    };
    const value = { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } };
    const output = formatApiDetail(value, []);
    expect(output).toContain('### Control-defined (2)');
    expect(output).toContain('| `onChange` | `React_2.ChangeEventHandler<HTMLInputElement>` |');
    expect(output).toContain('| `disabled` | `boolean` |');
    expect(output).toContain('### Inherited React/DOM (3)');
    expect(output).toContain('--include-inherited');
    expect(output).not.toContain('| `aria-label` |');
    expect(output).not.toContain('| `onClick` |');
    expect(output).not.toContain('Generic ARIA documentation.');
    expect(formatApiDetail(value, [], true)).not.toContain('| `aria-label` |');
    const expanded = formatApiDetail(value, [], false, true);
    expect(expanded).toContain('| `aria-label` |');
    expect(expanded).toContain('| `onClick` |');
    expect(expanded).toContain('Generic ARIA documentation.');
    expect(expanded.indexOf('| `disabled` |')).toBeLessThan(expanded.indexOf('| `aria-label` |'));
    expect(expanded.indexOf('| `onChange` |')).toBeLessThan(expanded.indexOf('| `aria-label` |'));
    expect(view.members[0].name).toBe('aria-label');
  });

  it('keeps missing provenance visible rather than guessing platform ownership', () => {
    const view = { ...props, members: [{ ...props.members[0], name: 'aria-custom', declarationPackages: undefined }] };
    const output = formatApiDetail(
      { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } },
      [],
    );
    expect(output).toContain('Unclassified (1; declaration provenance unavailable)');
    expect(output).toContain('| `aria-custom` |');
    expect(output).not.toContain('Inherited React/DOM');
  });

  it('uses verified slot summaries independently of verbose and inherited-member options', () => {
    const slot = {
      ...props.members[0],
      name: 'icon',
      type: { text: 'WithSlotShorthandValue<{ as?: "span" } & React.HTMLAttributes<HTMLSpanElement>>', references: [] },
      presentation: {
        kind: 'slot' as const,
        summary: "Slot<'span'>",
        basis: 'declaration' as const,
        slotType: {
          kind: 'dependency' as const,
          package: '@fluentui/react-utilities',
          entrypoint: '.',
          export: 'Slot',
          namespace: 'type' as const,
        },
        targets: [{ kind: 'intrinsic' as const, name: 'span', role: 'default' as const }],
      },
    };
    const view = {
      ...props,
      members: [slot, { ...props.members[0], name: 'onClick', declarationPackages: ['@types/react'] }],
    };
    const value = { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } };
    const before = JSON.stringify(value);
    for (const verbose of [false, true]) {
      const output = formatApiDetail(value, [], verbose);
      expect(output).toContain("| `icon` | `Slot<'span'>` |");
      expect(output).not.toContain('WithSlotShorthandValue');
      expect(output).not.toContain('| `onClick` |');
      expect(output).toContain('`--expand-types`');
      expect(output.match(/\*\*Slots:\*\*/g)).toHaveLength(1);
    }
    const inherited = formatApiDetail(value, [], false, true);
    expect(inherited).toContain("| `icon` | `Slot<'span'>` |");
    expect(inherited).toContain('| `onClick` |');
    const expanded = formatApiDetail(value, [], false, false, true);
    expect(expanded).toContain('WithSlotShorthandValue');
    expect(expanded).not.toContain('| `onClick` |');
    const direct = formatApiDetail(
      {
        ...detail,
        symbol: {
          ...symbol,
          props: undefined,
          effectiveType: view,
          classifications: [{ facet: 'slots', confidence: 'authored', evidence: [] }],
        },
      },
      [],
    );
    expect(direct).toContain("| `icon` | `Slot<'span'>` |");
    expect(JSON.stringify(value)).toBe(before);
  });

  it('summarizes union variants by default and preserves full expressions in expanded output', () => {
    const view: EffectiveTypeView = {
      ...props,
      members: [{ ...props.members[0], name: 'onClick', declarationPackages: ['@types/react'] }],
      unionBranches: [
        { text: 'React.ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" }', references: [] },
        { text: 'React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" }', references: [] },
      ],
    };
    const value = { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } };
    const output = formatApiDetail(value, []);
    expect(output).toContain('**Union variants:** 2 (members above are shared between variants).');
    expect(output).toContain('`--include-inherited` or `--json` for full variant expressions');
    expect(output).not.toContain('React.ButtonHTMLAttributes');
    const expanded = formatApiDetail(value, [], false, true);
    for (const branch of view.unionBranches ?? []) {
      expect(expanded).toContain(branch.text);
    }
  });

  it('summarizes inherited failures even when their full details are collapsed', () => {
    const view: EffectiveTypeView = {
      ...props,
      members: [
        {
          ...props.members[0],
          name: 'onClick',
          declarationPackages: ['@types/react'],
          status: { status: 'partial', reasons: ['Type was truncated'] },
        },
      ],
    };
    const output = formatApiDetail(
      { ...detail, symbol: { ...symbol, props: [{ signature: 'signature:call:0', type: view }] } },
      [],
    );
    expect(output).toContain('`onClick`: partial - Type was truncated');
  });

  it('groups inherited members consistently for direct props and other API type queries', () => {
    const view = {
      ...props,
      members: [{ ...props.members[0], name: 'onClick', declarationPackages: ['@types/react'] }, props.members[1]],
    };
    for (const facet of ['props', 'state'] as const) {
      const output = formatApiDetail(
        {
          ...detail,
          symbol: {
            ...symbol,
            props: undefined,
            effectiveType: view,
            classifications: [{ facet, confidence: 'authored', evidence: [] }],
          },
        },
        [],
      );
      expect(output).toContain('### Control-defined (1)');
      expect(output).toContain('| `disabled` |');
      expect(output).not.toContain('| `onClick` |');
    }
  });
});
