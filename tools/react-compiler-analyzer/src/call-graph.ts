import { readFileSync } from 'node:fs';

import type { Node } from 'oxc-parser';

import type { ModuleResolver, ResolverStats } from './module-resolver';
import { locationKey } from './identity';
import { walkAst } from './ast/traverse';
import { parseSource, type ParsedSource } from './ast/parse';
import { ScopeResolver, type ScopeBinding } from './ast/scope';
import {
  buildLeafConfig,
  hasAnyLeafRule,
  isHookName,
  isSnapshotRead,
  matchAccessorInit,
  matchRiskyCall,
  type AnyCall,
  type LeafMatch,
  type LeafRiskConfig,
} from './risk-patterns';
import type { RiskConfig } from './types';

interface BindingRead {
  node: Node;
  match: LeafMatch;
}

function unwrapExpression(node: Node | null | undefined): Node | null {
  let current = node ?? null;
  while (
    current &&
    (current.type === 'ParenthesizedExpression' ||
      current.type === 'TSAsExpression' ||
      current.type === 'TSTypeAssertion' ||
      current.type === 'TSNonNullExpression' ||
      current.type === 'TSInstantiationExpression')
  ) {
    current = (current as Node & { expression: Node }).expression;
  }
  return current;
}

interface FnInfo {
  key: string;
  node: Node;
  calls: { node: AnyCall; parent: Node | null; binding: ScopeBinding | null }[];
  bindingReads: BindingRead[];
}

type ExportTarget = { kind: 'local'; localName: string } | { kind: 'reexport'; source: string; importedName: string };

interface ModuleModel {
  filePath: string;
  parsed: ParsedSource;
  scopes: ScopeResolver;
  fnByKey: Map<string, FnInfo>;
  localFns: Map<string, FnInfo>;
  imports: Map<string, { source: string; importedName: string }>;
  exports: Map<string, ExportTarget>;
  exportStars: string[];
}

export interface IndirectRisk {
  leaf: LeafMatch;
  chain: string[];
}

export interface IndirectFinding {
  fnKey: string;
  declarationStart: { line: number; column: number };
  line: number;
  column: number;
  risk: IndirectRisk;
}

const MAX_DEPTH = 12;
const MAX_CACHED_MODULES = 2000;

function isUserFunction(node: Node | null | undefined): boolean {
  return Boolean(
    node &&
      (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression'),
  );
}

function calleeIdentifier(call: AnyCall): Node | null {
  const normalized = call.type === 'ChainExpression' ? (call as Node & { expression: Node }).expression : call;
  if (normalized.type !== 'CallExpression') {
    return null;
  }
  const callee = (normalized as Node & { callee: Node }).callee;
  return callee.type === 'Identifier' ? callee : null;
}

function nodeName(node: Node): string {
  return (node as Node & { name: string }).name;
}

function isTypeOnly(node: Node): boolean {
  return Boolean((node as Node & { importKind?: string; exportKind?: string }).importKind === 'type');
}

function staticImportName(kind: string, name: string | null): string | null {
  if (kind === 'Default') {
    return 'default';
  }
  return kind === 'Name' ? name : null;
}

export function createCallGraphAnalyzer(resolver: ModuleResolver, config: RiskConfig, stats?: ResolverStats) {
  const leafConfig = buildLeafConfig(config);
  const moduleCache = new Map<string, ModuleModel>();
  const reachCache = new Map<string, IndirectRisk | null>();

  function parseModule(filePath: string): ModuleModel {
    const cached = moduleCache.get(filePath);
    if (cached) {
      return cached;
    }

    const source = readFileSync(filePath, 'utf-8');
    const parsed = parseSource(source, filePath);
    const model = buildModuleModel(filePath, parsed, leafConfig);
    if (moduleCache.size >= MAX_CACHED_MODULES) {
      let toDrop = Math.floor(MAX_CACHED_MODULES / 4);
      for (const key of moduleCache.keys()) {
        if (toDrop-- <= 0) {
          break;
        }
        moduleCache.delete(key);
      }
    }
    moduleCache.set(filePath, model);
    return model;
  }

  function resolveCallee(
    call: AnyCall,
    binding: ScopeBinding | null,
    model: ModuleModel,
    depth: number,
  ): { model: ModuleModel; fn: FnInfo } | null {
    const callee = calleeIdentifier(call);
    if (!callee) {
      return null;
    }
    const name = nodeName(callee);
    if (isHookName(name)) {
      return null;
    }
    const declaration = binding?.declaration;
    const fnNode =
      binding?.kind === 'function' && isUserFunction(declaration)
        ? declaration
        : (binding?.kind === 'const' || binding?.kind === 'let' || binding?.kind === 'var') &&
          declaration &&
          declaration.type === 'VariableDeclarator' &&
          isUserFunction(unwrapExpression((declaration as Node & { init: Node | null }).init))
        ? unwrapExpression((declaration as Node & { init: Node | null }).init)!
        : null;
    if (fnNode) {
      const position = model.parsed.locations.positionAt(fnNode.start);
      const fn = model.fnByKey.get(locationKey(position));
      return fn ? { model, fn } : null;
    }
    if (binding?.importBinding) {
      return resolveName(name, model, depth);
    }
    return null;
  }

  function resolveName(name: string, model: ModuleModel, depth: number): { model: ModuleModel; fn: FnInfo } | null {
    if (depth > MAX_DEPTH) {
      return null;
    }
    const local = model.localFns.get(name);
    if (local) {
      return { model, fn: local };
    }
    const imported = model.imports.get(name);
    if (!imported) {
      return null;
    }
    const targetPath = resolver(imported.source, model.filePath);
    if (!targetPath) {
      return null;
    }
    const targetModel = parseModule(targetPath);
    return resolveExport(targetModel, imported.importedName, depth + 1);
  }

  function resolveExport(
    model: ModuleModel,
    exportName: string,
    depth: number,
  ): { model: ModuleModel; fn: FnInfo } | null {
    if (depth > MAX_DEPTH) {
      return null;
    }
    const target = model.exports.get(exportName);
    if (target) {
      if (target.kind === 'local') {
        return resolveName(target.localName, model, depth + 1);
      }
      const targetPath = resolver(target.source, model.filePath);
      if (!targetPath) {
        return null;
      }
      return resolveExport(parseModule(targetPath), target.importedName, depth + 1);
    }
    for (const source of model.exportStars) {
      const targetPath = resolver(source, model.filePath);
      if (!targetPath) {
        continue;
      }
      const hit = resolveExport(parseModule(targetPath), exportName, depth + 1);
      if (hit) {
        return hit;
      }
    }
    return null;
  }

  function reachesRisk(model: ModuleModel, fn: FnInfo, depth: number, stack: Set<string>): IndirectRisk | null {
    const cacheKey = `${model.filePath}::${fn.key}`;
    if (reachCache.has(cacheKey)) {
      return reachCache.get(cacheKey)!;
    }
    if (depth > MAX_DEPTH || stack.has(cacheKey)) {
      return null;
    }
    stack.add(cacheKey);
    let result: IndirectRisk | null = fn.bindingReads[0] ? { leaf: fn.bindingReads[0].match, chain: [] } : null;

    for (const { node, parent, binding } of result ? [] : fn.calls) {
      const leaf = matchRiskyCall(node, parent, leafConfig);
      if (leaf) {
        result = { leaf, chain: [] };
        break;
      }
      const resolved = resolveCallee(node, binding, model, depth);
      if (!resolved) {
        continue;
      }
      const inner = reachesRisk(resolved.model, resolved.fn, depth + 1, stack);
      if (inner) {
        const callee = calleeIdentifier(node);
        result = { leaf: inner.leaf, chain: [callee ? nodeName(callee) : '?', ...inner.chain] };
        break;
      }
    }
    stack.delete(cacheKey);
    reachCache.set(cacheKey, result);
    return result;
  }

  function analyzeFunctionCalls(entryModel: ModuleModel, entryFn: FnInfo): { call: AnyCall; risk: IndirectRisk }[] {
    const out: { call: AnyCall; risk: IndirectRisk }[] = [];
    for (const { node, binding } of entryFn.calls) {
      if (matchRiskyCall(node, null, leafConfig)) {
        continue;
      }
      const resolved = resolveCallee(node, binding, entryModel, 0);
      if (!resolved) {
        continue;
      }
      const inner = reachesRisk(resolved.model, resolved.fn, 1, new Set());
      if (inner) {
        const callee = calleeIdentifier(node);
        out.push({ call: node, risk: { leaf: inner.leaf, chain: [callee ? nodeName(callee) : '?', ...inner.chain] } });
      }
    }
    return out;
  }

  return {
    enabled: hasAnyLeafRule(leafConfig),
    stats,
    analyzeFile(filePath: string): IndirectFinding[] {
      const model = parseModule(filePath);
      const findings: IndirectFinding[] = [];
      for (const fn of model.fnByKey.values()) {
        for (const { call, risk } of analyzeFunctionCalls(model, fn)) {
          const location = model.parsed.locations.positionAt(call.start);
          const declarationStart = model.parsed.locations.positionAt(fn.node.start);
          findings.push({
            fnKey: fn.key,
            declarationStart: { line: declarationStart.line, column: declarationStart.column },
            line: location.line,
            column: location.column,
            risk,
          });
        }
      }
      return findings;
    },
  };
}

export type CallGraphAnalyzer = ReturnType<typeof createCallGraphAnalyzer>;

function buildModuleModel(filePath: string, parsed: ParsedSource, leafConfig: LeafRiskConfig): ModuleModel {
  const fnByKey = new Map<string, FnInfo>();
  const localFns = new Map<string, FnInfo>();
  const imports = new Map<string, { source: string; importedName: string }>();
  const exports = new Map<string, ExportTarget>();
  const exportStars: string[] = [];
  const scopes = new ScopeResolver(parsed.program);
  const fnStack: FnInfo[] = [];

  function infoFor(node: Node): FnInfo {
    const key = locationKey(parsed.locations.positionAt(node.start));
    let info = fnByKey.get(key);
    if (!info) {
      info = { key, node, calls: [], bindingReads: [] };
      fnByKey.set(key, info);
    }
    return info;
  }

  walkAst(
    parsed.program,
    {
      enter(node, parent) {
        if (isUserFunction(node)) {
          fnStack.push(infoFor(node));
        }
        const top = fnStack[fnStack.length - 1];
        if (node.type === 'CallExpression' && top) {
          const callee = (node as Node & { callee: Node }).callee;
          const binding = callee.type === 'Identifier' ? scopes.bindingOf(callee) : null;
          top.calls.push({ node, parent, binding });
        }
        if (node.type === 'VariableDeclarator') {
          const declaration = node as Node & { id: Node; init: Node | null };
          if (!declaration.init || declaration.id.type !== 'Identifier') {
            return;
          }
          const match = matchAccessorInit(
            declaration.init,
            leafConfig,
            (declaration.id as Node & { name: string }).name,
          );
          if (!match) {
            return;
          }
          const binding = scopes.bindingOf(declaration.id);
          for (const reference of binding ? scopes.readsOf(binding) : []) {
            if (!isSnapshotRead(reference, parsed.parents.get(reference))) {
              continue;
            }
            const owner = nearestFunction(reference, parsed);
            if (owner) {
              infoFor(owner).bindingReads.push({ node: reference, match });
            }
          }
        }
      },
      exit(node) {
        if (isUserFunction(node)) {
          fnStack.pop();
        }
      },
    },
    parsed.parents,
  );

  for (const statement of parsed.program.body) {
    indexTopLevel(statement, fnByKey, localFns, exports);
  }
  for (const request of parsed.module.staticImports) {
    const source = request.moduleRequest.value;
    for (const entry of request.entries) {
      if (entry.isType) {
        continue;
      }
      const importedName = staticImportName(entry.importName.kind, entry.importName.name);
      if (importedName && entry.localName.value) {
        imports.set(entry.localName.value, { source, importedName });
      }
    }
  }
  for (const request of parsed.module.staticExports) {
    for (const entry of request.entries) {
      if (entry.isType) {
        continue;
      }
      const source = entry.moduleRequest?.value;
      if (source) {
        if (entry.importName.kind === 'AllButDefault') {
          exportStars.push(source);
        } else if (entry.importName.name && entry.exportName.name) {
          exports.set(entry.exportName.name, { kind: 'reexport', source, importedName: entry.importName.name });
        }
      } else if (entry.localName.name && entry.exportName.name) {
        exports.set(entry.exportName.name, { kind: 'local', localName: entry.localName.name });
      }
    }
  }

  return { filePath, parsed, scopes, fnByKey, localFns, imports, exports, exportStars };
}

function nearestFunction(node: Node, parsed: ParsedSource): Node | null {
  let current = parsed.parents.get(node);
  while (current) {
    if (isUserFunction(current)) {
      return current;
    }
    current = parsed.parents.get(current);
  }
  return null;
}

function indexTopLevel(
  statement: Node,
  fnByKey: Map<string, FnInfo>,
  localFns: Map<string, FnInfo>,
  exports: Map<string, ExportTarget>,
): void {
  const registerLocalFn = (name: string, fnNode: Node): void => {
    const functionExpression = unwrapExpression(fnNode);
    if (!functionExpression || !isUserFunction(functionExpression)) {
      return;
    }
    const info = [...fnByKey.values()].find(candidate => candidate.node === functionExpression);
    if (info) {
      localFns.set(name, info);
    }
  };
  const registerDeclaration = (declaration: Node, exported: boolean): void => {
    if (declaration.type === 'FunctionDeclaration') {
      const id = (declaration as Node & { id: Node | null }).id;
      if (id?.type === 'Identifier') {
        const name = (id as Node & { name: string }).name;
        registerLocalFn(name, declaration);
        if (exported) {
          exports.set(name, { kind: 'local', localName: name });
        }
      }
    } else if (declaration.type === 'VariableDeclaration') {
      for (const variable of (declaration as Node & { declarations: Node[] }).declarations) {
        const item = variable as Node & { id: Node; init: Node | null };
        if (item.id.type === 'Identifier' && item.init) {
          const name = (item.id as Node & { name: string }).name;
          registerLocalFn(name, item.init);
          if (exported) {
            exports.set(name, { kind: 'local', localName: name });
          }
        }
      }
    }
  };

  if (statement.type === 'FunctionDeclaration' || statement.type === 'VariableDeclaration') {
    registerDeclaration(statement, false);
    return;
  }
  if (statement.type === 'ExportDefaultDeclaration') {
    const declaration = unwrapExpression((statement as Node & { declaration: Node }).declaration)!;
    if (declaration.type === 'Identifier') {
      const name = (declaration as Node & { name: string }).name;
      exports.set('default', { kind: 'local', localName: name });
    } else if (isUserFunction(declaration)) {
      registerDeclaration(declaration, false);
      registerLocalFn('default', declaration);
      exports.set('default', { kind: 'local', localName: 'default' });
    }
    return;
  }
  if (statement.type === 'ExportNamedDeclaration') {
    const exportNode = statement as Node & {
      declaration: Node | null;
      source: { value: string } | null;
      specifiers: Node[];
    };
    if (exportNode.declaration) {
      registerDeclaration(exportNode.declaration, true);
      return;
    }
    for (const specifier of exportNode.specifiers) {
      if (specifier.type !== 'ExportSpecifier') {
        continue;
      }
      const spec = specifier as Node & { local: Node; exported: Node };
      const exportedName = exportedIdentifierName(spec.exported);
      const localName = exportedIdentifierName(spec.local);
      if (exportNode.source) {
        exports.set(exportedName, { kind: 'reexport', source: exportNode.source.value, importedName: localName });
      } else {
        exports.set(exportedName, { kind: 'local', localName });
      }
    }
  }
}

function exportedIdentifierName(node: Node): string {
  const item = node as Node & { name?: string; value?: string };
  return item.name ?? item.value ?? '';
}
