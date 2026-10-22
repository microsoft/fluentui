import { join } from 'path';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

import { createCallGraphAnalyzer } from '../call-graph';
import { createModuleResolver } from '../module-resolver';
import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import type { FileEntry, RiskConfig } from '../types';

const FIXTURES = join(__dirname, '__fixtures__', 'risk', 'wrappers');
const COMPONENT = join(FIXTURES, 'component.tsx');

function analyzer(config: RiskConfig) {
  return createCallGraphAnalyzer(createModuleResolver(), config);
}

describe('call-graph wrapper analysis', () => {
  const roots: string[] = [];

  afterEach(() => {
    for (const root of roots.splice(0)) {
      rmSync(root, { recursive: true, force: true });
    }
  });

  function modules(files: Record<string, string>): string {
    const root = mkdtempSync(join(tmpdir(), 'rca-call-graph-'));
    roots.push(root);
    for (const [name, source] of Object.entries(files)) {
      writeFileSync(join(root, name), source);
    }

    return join(root, 'component.tsx');
  }

  it('follows a wrapper in a module with a mutable TypeScript namespace', () => {
    const filePath = modules({
      'reader.ts': `namespace Values { export let value = 1; }
export function readValue() { return store.getState().value + Values.value; }`,
      'component.tsx': "import { readValue } from './reader'; function Widget() { return <div>{readValue()}</div>; }",
    });
    expect(analyzer({ detectGetStateReads: true }).analyzeFile(filePath)).toEqual([
      expect.objectContaining({ risk: expect.objectContaining({ chain: ['readValue'] }) }),
    ]);
  });

  it.each([
    'export default function readValue() { return store.getState().value; }',
    'export default function () { return store.getState().value; }',
    'export default () => store.getState().value;',
    'export default (function readValue() { return store.getState().value; });',
    'const readValue = () => store.getState().value; export default readValue;',
  ])('follows a default-exported wrapper: %s', async source => {
    const filePath = modules({
      'reader.ts': source,
      'component.tsx':
        "import readValue from './reader'; export function Widget() { return <div>{readValue()}</div>; }",
    });
    const callGraph = analyzer({ detectGetStateReads: true });
    expect(callGraph.analyzeFile(filePath)).toEqual([
      expect.objectContaining({ risk: expect.objectContaining({ chain: ['readValue'] }) }),
    ]);
    const compiled = await compileFile({ filePath, packageName: 'test-pkg' }, 'infer', false, {}, callGraph);
    expect(deriveCoverage(compiled)).toContainEqual(
      expect.objectContaining({ functionName: 'Widget', status: 'compiled', risks: [expect.anything()] }),
    );
  });

  it.each([
    "export { readValue } from './reader';",
    "import { readValue } from './reader'; export { readValue };",
    "import { readValue as read } from './reader'; export { read as readValue };",
    "import { readValue } from './reader'; export default readValue;",
  ])('follows an exported imported binding: %s', barrel => {
    const imported = barrel.includes('export default') ? 'readValue' : '{ readValue }';
    const filePath = modules({
      'reader.ts': 'export function readValue() { return store.getState().value; }',
      'barrel.ts': barrel,
      'component.tsx': `import ${imported} from './barrel'; function Widget() { return readValue(); }`,
    });
    expect(analyzer({ detectGetStateReads: true }).analyzeFile(filePath)).toHaveLength(1);
  });

  it.each([
    'function Widget({ readValue }) { return readValue(); }',
    'function Widget(readValue) { return readValue(); }',
    'function Widget() { const readValue = () => 1; return readValue(); }',
  ])('does not attribute a shadowed helper risk: %s', widget => {
    const filePath = modules({
      'component.tsx': `function readValue() { return store.getState().value; } ${widget}`,
    });
    expect(analyzer({ detectGetStateReads: true }).analyzeFile(filePath)).toEqual([]);
  });

  it('does not follow a shadowed import binding', () => {
    const filePath = modules({
      'reader.ts': 'export function readValue() { return store.getState().value; }',
      'component.tsx': "import { readValue } from './reader'; function Widget({ readValue }) { return readValue(); }",
    });
    expect(analyzer({ detectGetStateReads: true }).analyzeFile(filePath)).toEqual([]);
  });

  it('is disabled when no leaf rule is configured', () => {
    expect(analyzer({}).enabled).toBe(false);
    expect(analyzer({ detectGetStateReads: true }).enabled).toBe(true);
  });

  it('flags a risk reached through a plain first-party wrapper chain', () => {
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    const indirect = findings.filter(f => f.risk.leaf.ruleId === 'nonreactive-store-read');
    expect(indirect.length).toBeGreaterThan(0);

    // The chain runs through both wrapper hops, ending at the getState leaf.
    const chains = indirect.map(f => f.risk.chain.join(' → '));
    expect(chains).toContain('readActiveIdIndirect → readActiveId');
  });

  it('resolves through a re-export barrel (index.ts)', () => {
    // component.tsx imports from './index', which re-exports from './store'.
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    expect(findings.some(f => f.risk.chain[0] === 'readActiveIdIndirect')).toBe(true);
  });

  it('does NOT follow a useXxx-named callee (recognized hook, handled at its own definition)', () => {
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    // WidgetViaHook calls useActiveId() — must not produce an indirect finding.
    expect(findings.some(f => f.risk.chain.includes('useActiveId'))).toBe(false);
  });

  it('finds nothing when the leaf rule that would fire is disabled', () => {
    // Only the hidden-selector-hook rule on, but the wrappers do getState reads.
    const findings = analyzer({ selectorHookProperties: ['use'] }).analyzeFile(COMPONENT);
    expect(findings).toHaveLength(0);
  });

  it('follows a wrapper whose risky read goes through a local binding', () => {
    const findings = analyzer({ storeAccessorPattern: 'Store$' }).analyzeFile(COMPONENT);
    const viaBinding = findings.filter(f => f.risk.chain.includes('readCurrentIdViaBinding'));
    expect(viaBinding).toHaveLength(1);
    expect(viaBinding[0].risk.leaf.symbol).toBe('getAppStore');
    expect(viaBinding[0].risk.leaf.message).toContain('local binding');
  });

  it('follows a wrapper in a .ts file that uses an angle-bracket type assertion', () => {
    // Parsing that module with JSX enabled would fail, silently making it an opaque boundary.
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    const viaCast = findings.filter(f => f.risk.chain.includes('readCastActiveId'));
    expect(viaCast).toHaveLength(1);
    expect(viaCast[0].risk.leaf.symbol).toBe('getCastStore().getState');
  });

  it.each(['reader.ts', 'reader.tsx'])('follows a wrapper alongside declared class fields in %s', async fileName => {
    const filePath = modules({
      [fileName]: readFileSync(join(__dirname, '__fixtures__', 'declare-fields', fileName), 'utf-8'),
      'component.tsx':
        "import { readValue } from './reader'; export function Widget() { return <span>{readValue()}</span>; }",
    });
    const riskConfig: RiskConfig = { detectGetStateReads: true, resolveWrappers: true };
    const callGraph = analyzer(riskConfig);

    expect(callGraph.analyzeFile(filePath)).toEqual([
      expect.objectContaining({
        risk: expect.objectContaining({
          chain: ['readValue'],
          leaf: expect.objectContaining({ ruleId: 'nonreactive-store-read', symbol: 'store.getState' }),
        }),
      }),
    ]);

    const compiled = await compileFile({ filePath, packageName: 'test-pkg' }, 'infer', false, riskConfig, callGraph);

    expect(compiled.error).toBeUndefined();
    expect(deriveCoverage(compiled)).toEqual([
      expect.objectContaining({
        functionName: 'Widget',
        status: 'compiled',
        risks: [
          expect.objectContaining({
            ruleId: 'nonreactive-store-read',
            symbol: 'store.getState',
            message: expect.stringContaining('reached via `readValue`'),
          }),
        ],
      }),
    ]);
  });
});

describe('wrapper analysis integration — compileFile + deriveCoverage', () => {
  async function coverageFor(filePath: string, riskConfig: RiskConfig) {
    const entry: FileEntry = { filePath, packageName: 'test-pkg' };
    const callGraph = createCallGraphAnalyzer(createModuleResolver(), riskConfig);
    const compiled = await compileFile(entry, 'infer', false, riskConfig, callGraph);
    return deriveCoverage(compiled);
  }

  it('attaches indirect wrapper risks to the compiled component', async () => {
    const results = await coverageFor(COMPONENT, { detectGetStateReads: true, resolveWrappers: true });
    const risky = results.filter(r => r.status === 'compiled' && r.risks?.some(f => f.message.includes('reached via')));
    expect(risky.length).toBeGreaterThan(0);
    const messages = risky.flatMap(r => r.risks!.map(f => f.message));
    expect(messages.some(m => m.includes('readActiveIdIndirect → readActiveId'))).toBe(true);
  });

  it('does not attach wrapper risks for the useXxx-named hook caller', async () => {
    const results = await coverageFor(COMPONENT, { detectGetStateReads: true, resolveWrappers: true });
    // WidgetViaHook should carry no "reached via" finding.
    const viaHook = results.filter(r => r.risks?.some(f => f.message.includes('useActiveId')));
    expect(viaHook).toHaveLength(0);
  });
});
