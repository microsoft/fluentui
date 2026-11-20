import type { Node } from 'oxc-parser';

import { locationKey } from './identity';
import { walkAst } from './ast/traverse';
import type { ParsedSource } from './ast/parse';
import { getReactCallName, ScopeResolver } from './ast/scope';
import { SourceFunctionIndex } from './source-functions';

export interface ManualMemoEntry {
  useMemo: number;
  useCallback: number;
  reactMemo: boolean;
  reactMemoHasComparator: boolean;
  bodyInsertionLine: number;
}

export interface ExistingDirectives {
  useMemo: boolean;
  useNoMemo: boolean;
}

export interface ManualMemoAnalysis {
  results: Map<string, ManualMemoEntry>;
  bodyInsertionLines: Map<string, number>;
  existingDirectives: Map<string, ExistingDirectives>;
  keyAliases: Map<string, string>;
}

export interface ManualMemoAnalysisOptions {
  sourceFunctions: SourceFunctionIndex;
  scopes?: ScopeResolver;
  results?: Map<string, ManualMemoEntry>;
  bodyInsertionLines?: Map<string, number>;
  existingDirectives?: Map<string, ExistingDirectives>;
  keyAliases?: Map<string, string>;
}

function functionNode(node: Node): boolean {
  return (
    node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression'
  );
}

function addMemoEntry(results: Map<string, ManualMemoEntry>, key: string, line: number): ManualMemoEntry {
  let entry = results.get(key);
  if (!entry) {
    entry = {
      useMemo: 0,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
      bodyInsertionLine: line,
    };
    results.set(key, entry);
  }
  return entry;
}

function bodyInsertionLine(body: Node, parsed: ParsedSource): number {
  return body.type === 'BlockStatement' ? parsed.locations.positionAt(body.start).line + 1 : 0;
}

function readDirectives(body: Node): ExistingDirectives {
  const found: ExistingDirectives = { useMemo: false, useNoMemo: false };
  if (body.type !== 'BlockStatement') {
    return found;
  }
  for (const statement of (body as Node & { body: Node[] }).body) {
    const directive = (statement as Node & { directive?: string }).directive;
    if (directive === 'use memo') {
      found.useMemo = true;
    } else if (directive === 'use no memo') {
      found.useNoMemo = true;
    }
  }
  return found;
}

function unwrapExpression(node: Node): Node {
  let current = node;
  while (
    current.type === 'ChainExpression' ||
    current.type === 'ParenthesizedExpression' ||
    current.type === 'TSAsExpression' ||
    current.type === 'TSTypeAssertion' ||
    current.type === 'TSNonNullExpression' ||
    current.type === 'TSInstantiationExpression'
  ) {
    current = (current as Node & { expression: Node }).expression;
  }
  return current;
}

function resolveReactMemoTarget(initial: Node | undefined, scopes: ScopeResolver): Node | null {
  let target = initial ? unwrapExpression(initial) : null;
  const visited = new Set<Node>();
  while (target && !visited.has(target)) {
    visited.add(target);
    if (functionNode(target)) {
      return target;
    }
    if (target.type === 'Identifier') {
      const binding = scopes.resolve((target as Node & { name: string }).name, target);
      if (!scopes.isConstant(binding) || !binding) {
        return null;
      }
      const declaration = binding.declaration;
      if (binding.kind === 'function' && declaration.type === 'FunctionDeclaration') {
        return declaration;
      }
      if (
        (binding.kind === 'const' || binding.kind === 'let' || binding.kind === 'var') &&
        declaration.type === 'VariableDeclarator'
      ) {
        const init = (declaration as Node & { init: Node | null }).init;
        if (init) {
          target = unwrapExpression(init);
          continue;
        }
      }
    } else if (target.type === 'CallExpression') {
      const wrapperName = getReactCallName(target, scopes);
      if (wrapperName === 'memo' || wrapperName === 'forwardRef') {
        target = unwrapExpression((target as Node & { arguments: Node[] }).arguments[0]);
        continue;
      }
    }
    break;
  }
  return null;
}

function enclosingFunction(node: Node, parsed: ParsedSource): Node | null {
  let parent = parsed.parents.get(node);
  while (parent) {
    if (functionNode(parent)) {
      return parent;
    }
    parent = parsed.parents.get(parent);
  }
  return null;
}

export function analyzeManualMemoization(
  parsed: ParsedSource,
  sourceFunctions: SourceFunctionIndex,
  scopes: ScopeResolver,
  output?: Omit<ManualMemoAnalysisOptions, 'sourceFunctions' | 'scopes'>,
): ManualMemoAnalysis {
  const results = output?.results ?? new Map<string, ManualMemoEntry>();
  const bodyInsertionLines = output?.bodyInsertionLines ?? new Map<string, number>();
  const existingDirectives = output?.existingDirectives ?? new Map<string, ExistingDirectives>();
  const keyAliases = output?.keyAliases ?? new Map<string, string>();

  walkAst(
    parsed.program,
    {
      enter(node) {
        if (functionNode(node)) {
          const sourceFunction = sourceFunctions.findByNode(node);
          const span = sourceFunctions.spanFromNode(node);
          if (!span) {
            return;
          }
          const key = locationKey(span.start);
          const body = (node as Node & { body: Node }).body;
          const insertionLine = bodyInsertionLine(body, parsed);
          if (insertionLine > 0) {
            bodyInsertionLines.set(key, insertionLine);
          }
          existingDirectives.set(key, readDirectives(body));
          if (body.type === 'BlockStatement') {
            keyAliases.set(locationKey(parsed.locations.positionAt(body.start)), key);
          }
          if (!sourceFunction) {
            return;
          }
        }
        if (node.type !== 'CallExpression') {
          return;
        }
        const name = getReactCallName(node, scopes);
        if (name !== 'memo' && name !== 'useMemo' && name !== 'useCallback') {
          return;
        }
        const args = (node as Node & { arguments: Node[] }).arguments;
        if (name === 'memo') {
          const target = resolveReactMemoTarget(args[0], scopes);
          if (!target) {
            return;
          }
          const sourceFunction = sourceFunctions.findByNode(target);
          const targetSpan = sourceFunctions.spanFromNode(target);
          if (!sourceFunction || !targetSpan) {
            return;
          }
          const key = locationKey(targetSpan.start);
          const entry = addMemoEntry(results, key, sourceFunction.bodyInsertionLine ?? 0);
          entry.reactMemo = true;
          entry.reactMemoHasComparator ||= args.length > 1;
          sourceFunctions.recordManualMemo(sourceFunction.id, 'react-memo', args.length > 1);
          return;
        }
        const owner = enclosingFunction(node, parsed);
        const sourceFunction = owner ? sourceFunctions.findByNode(owner) : null;
        const ownerSpan = owner ? sourceFunctions.spanFromNode(owner) : null;
        if (!owner || !ownerSpan || !sourceFunction) {
          return;
        }
        const key = locationKey(ownerSpan.start);
        const entry = addMemoEntry(results, key, sourceFunction.bodyInsertionLine ?? 0);
        if (name === 'useMemo') {
          entry.useMemo++;
          sourceFunctions.recordManualMemo(sourceFunction.id, 'use-memo');
        } else {
          entry.useCallback++;
          sourceFunctions.recordManualMemo(sourceFunction.id, 'use-callback');
        }
      },
    },
    parsed.parents,
  );

  return { results, bodyInsertionLines, existingDirectives, keyAliases };
}

export function analyzeManualMemo(parsed: ParsedSource, options: ManualMemoAnalysisOptions): ManualMemoAnalysis {
  const scopes = options.scopes ?? new ScopeResolver(parsed.program);
  return analyzeManualMemoization(parsed, options.sourceFunctions, scopes, options);
}
