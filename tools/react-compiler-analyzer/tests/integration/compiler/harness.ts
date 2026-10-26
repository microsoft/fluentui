import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

import * as babelTypes from '@babel/types';
import * as babel from '@babel/core';
import * as swc from '@swc/core';
import * as ts from 'typescript';
import type { TransformOptions } from '@babel/core';

import { compileSource, extractDetailReason, extractFullDiagnostic, type CompilerEvent } from '../../../src/compiler';
import { riskPlugin } from '../../../src/risk-plugin';
import type { RiskFinding } from '../../../src/types';
import type { Fixture } from './fixtures';

const compiler = require.resolve('babel-plugin-react-compiler');

export const versions = {
  babel: require('@babel/core/package.json').version as string,
  compiler: require('babel-plugin-react-compiler/package.json').version as string,
  swc: require('@swc/core/package.json').version as string,
  typescript: ts.version,
};
export const nativeBinary = swc.getBinaryMetadata();

interface FunctionEvidence {
  name: string | null;
  cacheSlots: Array<number | null>;
  selectorCalls: Array<{ name: string; cacheGuarded: boolean }>;
}

function functionName(path: import('@babel/core').NodePath): string | null {
  const node = path.node;
  if ((babelTypes.isFunctionDeclaration(node) || babelTypes.isFunctionExpression(node)) && node.id) {
    return node.id.name;
  }
  const parent = path.parentPath?.node;
  return babelTypes.isVariableDeclarator(parent) && babelTypes.isIdentifier(parent.id) ? parent.id.name : null;
}

export function inspectOutput(code: string): FunctionEvidence[] {
  const ast = babel.parseSync(code, {
    babelrc: false,
    configFile: false,
    parserOpts: { plugins: ['typescript', 'jsx'] },
  });
  if (!ast) {
    throw new Error('Output AST unavailable');
  }
  const functions = new Map<babelTypes.Node, FunctionEvidence>();
  const cacheBindings = new Set<unknown>();
  const runtimeBindings = new Set<unknown>();
  babel.traverse(ast, {
    ImportSpecifier(path) {
      const imported = path.node.imported;
      const declaration = path.parentPath.node;
      if (
        babelTypes.isImportDeclaration(declaration) &&
        ['react/compiler-runtime', 'react-compiler-runtime'].includes(declaration.source.value) &&
        (babelTypes.isIdentifier(imported) ? imported.name : imported.value) === 'c'
      ) {
        const binding = path.scope.getBinding(path.node.local.name);
        if (!binding) {
          throw new Error('Runtime cache import binding could not be resolved');
        }
        runtimeBindings.add(binding);
      }
    },
    Function(path) {
      functions.set(path.node, { name: functionName(path), cacheSlots: [], selectorCalls: [] });
    },
  });
  babel.traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;
      if (babelTypes.isIdentifier(callee) && runtimeBindings.has(path.scope.getBinding(callee.name))) {
        const owner = path.getFunctionParent();
        const record = owner && functions.get(owner.node);
        if (!record) {
          throw new Error('Cache binding has unknown function ownership');
        }
        const count = path.node.arguments[0];
        record.cacheSlots.push(babelTypes.isNumericLiteral(count) ? count.value : null);
        const declaration = path.parentPath.node;
        if (babelTypes.isVariableDeclarator(declaration) && babelTypes.isIdentifier(declaration.id)) {
          const binding = path.scope.getBinding(declaration.id.name);
          if (!binding) {
            throw new Error('Runtime cache variable binding could not be resolved');
          }
          cacheBindings.add(binding);
        }
      }
    },
  });
  babel.traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;
      const hidden =
        babelTypes.isMemberExpression(callee) && babelTypes.isIdentifier(callee.property, { name: 'selected' });
      const recognized = babelTypes.isIdentifier(callee, { name: 'useSelected' });
      if (!hidden && !recognized) {
        return;
      }
      const owner = path.getFunctionParent();
      const record = owner && functions.get(owner.node);
      if (!record) {
        throw new Error('Selector call has unknown function ownership');
      }
      const cacheGuarded = path.getAncestry().some(ancestor => {
        if (!ancestor.isIfStatement()) {
          return false;
        }
        let referencesCache = false;
        babelTypes.traverseFast(ancestor.node.test, node => {
          if (babelTypes.isIdentifier(node) && cacheBindings.has(ancestor.scope.getBinding(node.name))) {
            referencesCache = true;
          }
        });
        return referencesCache;
      });
      record.selectorCalls.push({ name: hidden ? 'store.use.selected' : 'useSelected', cacheGuarded });
    },
  });
  return [...functions.values()];
}

function eventSummary(events: CompilerEvent[]) {
  return events.map(event => ({
    kind: event.kind,
    name: event.fnName ?? null,
    reason: event.reason ?? null,
  }));
}

function inspectSafely(code: string, transformError: string | null) {
  if (transformError) {
    return { functions: null, inspectionError: null };
  }
  try {
    return { functions: inspectOutput(code), inspectionError: null };
  } catch (error) {
    return { functions: null, inspectionError: String(error) };
  }
}

export async function runFixture(fixture: Fixture) {
  const filename = `${fixture.id}.tsx`;
  const compilerOptions = {
    compilationMode: 'infer' as const,
    target: '19' as const,
    panicThreshold: 'none' as const,
    noEmit: false,
    ...(fixture.gated ? { gating: { source: 'fixture-gate', importSpecifierName: 'isEnabled' } } : {}),
  };
  const events: CompilerEvent[] = [];
  const babelOptions: TransformOptions = {
    filename,
    babelrc: false,
    configFile: false,
    ast: false,
    code: true,
    parserOpts: { plugins: ['typescript', 'jsx', 'decoratorAutoAccessors'] },
    plugins: [
      [
        compiler,
        {
          ...compilerOptions,
          logger: {
            logEvent: (_filename: string | null, event: CompilerEvent) => events.push(event),
          },
        },
      ],
    ],
  };
  // The native API accepts the same compiler settings but does not expose
  // function-level success/skip telemetry. Transform success is not acceptance.
  const swcOptions = {
    filename,
    swcrc: false,
    configFile: false,
    jsc: {
      target: 'esnext' as const,
      parser: { syntax: 'typescript' as const, tsx: true },
      transform: { react: { runtime: 'preserve' as const }, reactCompiler: compilerOptions },
    },
  };
  let babelCode = '';
  let babelError: string | null = null;
  try {
    babelCode = babel.transformSync(fixture.source, babelOptions)?.code ?? '';
  } catch (error) {
    babelError = String(error);
  }
  let swcCode = '';
  let swcError: string | null = null;
  let swcDiagnostics: unknown[] = [];
  try {
    const result = swc.transformSync(fixture.source, swcOptions);
    swcCode = result.code;
    swcDiagnostics = (result as typeof result & { diagnostics?: unknown[] }).diagnostics ?? [];
  } catch (error) {
    swcError = String(error);
  }
  const analyzer = await compileSource(fixture.source, filename, { compilationMode: 'infer' });
  const risks = new Map<string, RiskFinding[]>();
  await babel.transformAsync(fixture.source, {
    filename,
    babelrc: false,
    configFile: false,
    code: false,
    parserOpts: { plugins: ['typescript', 'jsx'] },
    plugins: [[riskPlugin, { selectorHookProperties: ['use'], results: risks }]],
  });
  const babelInspection = inspectSafely(babelCode, babelError);
  const swcInspection = inspectSafely(swcCode, swcError);
  const runtime = fixture.id.startsWith('exported-overload')
    ? [
        ...[false, true].map(enabled => ({ backend: 'babel', enabled, ...evaluateOverload(babelCode, enabled) })),
        ...[false, true].map(enabled => ({ backend: 'swc', enabled, ...evaluateOverload(swcCode, enabled) })),
      ]
    : [];
  return {
    fixture,
    metadata: {
      sourceHash: createHash('sha256').update(fixture.source).digest('hex'),
      versions,
      node: process.version,
      platform: `${process.platform}/${process.arch}`,
      nativeBinary,
      babelOptions,
      swcOptions,
      analyzerOptions: { filename, compilationMode: 'infer', noEmit: true },
      runtimeOptions: {
        module: 'CommonJS',
        target: 'ES2020',
        jsx: 'React',
        stubs: ['react.useState', 'react/compiler-runtime.c', 'fixture-gate.isEnabled'],
      },
      differences: [
        'RCA is a separate noEmit analysis using the same Babel/compiler dependencies as the emission tests.',
        'Babel preserves TypeScript; native SWC lowers TypeScript. Both preserve JSX.',
        'Native SWC has no per-function acceptance telemetry.',
        'Runtime checks use TypeScript CommonJS/JSX lowering and stub hooks/cache/gate; not application safety.',
      ],
    },
    analyzer: {
      error: analyzer.error?.message ?? null,
      events: eventSummary(analyzer.events),
      diagnostics: analyzer.events.map(event => ({
        kind: event.kind,
        reason: extractDetailReason(event.detail),
        diagnostic: extractFullDiagnostic(event.detail, fixture.source),
      })),
      risks: [...risks.values()].flat().map(risk => risk.ruleId),
    },
    babel: {
      code: babelCode,
      error: babelError,
      events: events.map(event => ({
        kind: event.kind,
        fnName: event.fnName,
        fnLoc: event.fnLoc,
        loc: event.loc,
        reason: event.reason,
        detail: extractDetailReason(event.detail),
        data: event.data,
        memoSlots: event.memoSlots,
        memoBlocks: event.memoBlocks,
        memoValues: event.memoValues,
      })),
      diagnostics: events.map(event => ({
        kind: event.kind,
        reason: extractDetailReason(event.detail),
        diagnostic: extractFullDiagnostic(event.detail, fixture.source),
      })),
      ...babelInspection,
    },
    swc: {
      code: swcCode,
      error: swcError,
      diagnostics: swcDiagnostics,
      acceptance: 'unavailable' as const,
      ...swcInspection,
    },
    runtime,
  };
}

export type Evidence = Awaited<ReturnType<typeof runFixture>>;

export function targetCacheEvidence(
  functions: FunctionEvidence[] | null,
  target: string,
): 'positive' | 'zero' | 'unknown' {
  const matches = functions?.filter(fn => fn.name === target);
  if (matches?.length !== 1 || matches[0].cacheSlots.some(slots => slots === null)) {
    return 'unknown';
  }
  return matches[0].cacheSlots.some(slots => slots !== null && slots > 0) ? 'positive' : 'zero';
}

export function summarize(evidence: Evidence) {
  return {
    hookValidity: evidence.fixture.hookValidity,
    suppression: evidence.fixture.suppression,
    analyzer: {
      error: evidence.analyzer.error,
      events: evidence.analyzer.events,
      risks: evidence.analyzer.risks,
    },
    babel: {
      error: evidence.babel.error,
      events: eventSummary(evidence.babel.events),
      targetCacheEvidence: targetCacheEvidence(evidence.babel.functions, evidence.fixture.target),
      outputFunctions: evidence.babel.functions,
    },
    swc: {
      error: evidence.swc.error,
      diagnostics: evidence.swc.diagnostics,
      acceptance: evidence.swc.acceptance,
      targetCacheEvidence: targetCacheEvidence(evidence.swc.functions, evidence.fixture.target),
      outputFunctions: evidence.swc.functions,
    },
    runtime: evidence.runtime,
  };
}

export function writeEvidence(evidence: Evidence): string {
  const directory = resolve(__dirname, '../../../../../dist/react-compiler-analyzer-integration');
  mkdirSync(directory, { recursive: true });
  const path = join(directory, `${evidence.fixture.id}.json`);
  writeFileSync(path, JSON.stringify(evidence, null, 2));
  return path;
}

export function evaluateOverload(code: string, enabled: boolean) {
  const gateCalls: boolean[] = [];
  const cacheCalls: number[] = [];
  const lowered = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.React,
    },
  }).outputText;
  const exports: Record<string, unknown> = {};
  let error: string | null = null;
  let results: unknown[] = [];
  const implementations: Array<{ name: string; results: unknown[] }> = [];
  let exportNames: string[] = [];
  let callable = false;
  try {
    runInNewContext(
      lowered,
      {
        exports,
        require: (name: string) => {
          if (name === 'react') {
            return { useState: (value: unknown) => [value, () => undefined] };
          }
          if (name === 'react/compiler-runtime' || name === 'react-compiler-runtime') {
            return {
              c: (slots: number) => {
                cacheCalls.push(slots);
                return Array(slots).fill(Symbol.for('react.memo_cache_sentinel'));
              },
            };
          }
          if (name === 'fixture-gate') {
            return {
              isEnabled: () => {
                gateCalls.push(enabled);
                return enabled;
              },
            };
          }
          throw new Error(`Unexpected runtime import: ${name}`);
        },
      },
      { timeout: 1000 },
    );
    exportNames = Object.keys(exports).sort();
    callable = typeof exports['useSample'] === 'function';
    for (const name of exportNames) {
      if (typeof exports[name] === 'function') {
        const implementation = exports[name] as (value?: number) => unknown;
        implementations.push({ name, results: [implementation(), implementation(9)] });
      }
    }
    results = implementations.find(implementation => implementation.name === 'useSample')?.results ?? [];
  } catch (caught) {
    error = String(caught);
  }
  return { exportNames, callable, results, implementations, gateCalls, cacheCalls, error };
}
