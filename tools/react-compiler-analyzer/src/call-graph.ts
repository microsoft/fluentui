import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

import { parseSync, traverse } from '@babel/core';
import type { File, Node, CallExpression, Function as BabelFunction } from '@babel/types';

import type { ModuleResolver } from './module-resolver';
import { buildLeafConfig, hasAnyLeafRule, matchRiskyCall, type LeafMatch, type LeafRiskConfig } from './risk-patterns';
import type { RiskConfig } from './types';

/** A user-defined function within a module, plus the calls lexically inside it. */
interface FnInfo {
  key: string;
  node: BabelFunction;
  calls: { node: CallExpression; parent: Node | null }[];
}

/** What a top-level export name resolves to within (or beyond) a module. */
type ExportTarget = { kind: 'local'; localName: string } | { kind: 'reexport'; source: string; importedName: string };

/** A parsed, indexed module: its functions, imports, exports — built once per file. */
interface ModuleModel {
  filePath: string;
  fnByKey: Map<string, FnInfo>;
  /** Local user-function declarations by name (function decls + `const f = () => …`). */
  localFns: Map<string, FnInfo>;
  /** Imported identifier → where it came from. */
  imports: Map<string, { source: string; importedName: string }>;
  /** Exported name → target (local binding or re-export). */
  exports: Map<string, ExportTarget>;
  /** `export * from './x'` sources, for wildcard export fallback. */
  exportStars: string[];
}

/** A risky leaf reached through a chain of first-party function calls. */
export interface IndirectRisk {
  /** The leaf rule that fired at the bottom of the chain. */
  leaf: LeafMatch;
  /** Wrapper call names from the entry function down to the leaf, e.g. `["useFoo", "readBar"]`. */
  chain: string[];
}

/** An indirect risk located in source: which enclosing function, and the offending call site. */
export interface IndirectFinding {
  /** `line:column` key of the enclosing function start (matches the compiler-event key). */
  fnKey: string;
  /** 1-based line of the wrapper call site. */
  line: number;
  /** 0-based column of the wrapper call site. */
  column: number;
  risk: IndirectRisk;
}

const MAX_DEPTH = 12;

function fnKey(loc: { line: number; column: number }): string {
  return `${loc.line}:${loc.column}`;
}

function isUserFunction(node: Node): node is BabelFunction {
  return (
    node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression'
  );
}

/**
 * A cross-file call-graph analyzer that answers: *does this function transitively reach a
 * risky leaf* (a `.getState()` / `getXStore()` read or a hidden `.use.field()` selector hook),
 * including through first-party wrapper functions and re-export barrels?
 *
 * It is **demand-driven and lazy** — files are parsed only when a call path actually reaches
 * them, and every result is memoized — so it stays cheap relative to building a whole-program
 * TypeScript `Program`. Resolution is purely syntactic (imports, bindings, exports): it crosses
 * the first-party source boundary but deliberately stops at packages (`node_modules`), dynamic
 * dispatch, and method calls on inferred receivers, which a syntactic pass cannot follow.
 */
export function createCallGraphAnalyzer(resolver: ModuleResolver, config: RiskConfig) {
  const leafConfig = buildLeafConfig(config);
  const moduleCache = new Map<string, ModuleModel | null>();
  // Memoized reachesRisk result per `${filePath}::${fnKey}`.
  const reachCache = new Map<string, IndirectRisk | null>();

  function parseModule(filePath: string): ModuleModel | null {
    if (moduleCache.has(filePath)) {
      return moduleCache.get(filePath)!;
    }
    let model: ModuleModel | null = null;
    try {
      const source = readFileSync(filePath, 'utf-8');
      const ext = extname(filePath);
      const ast = parseSync(source, {
        filename: filePath,
        babelrc: false,
        configFile: false,
        presets: [
          [
            require.resolve('@babel/preset-typescript'),
            { isTSX: ext === '.tsx' || ext === '.ts', allExtensions: true },
          ],
        ],
      }) as File | null;
      if (ast) {
        model = buildModuleModel(filePath, ast);
      }
    } catch {
      model = null; // unparseable / unreadable → treat as opaque boundary
    }
    moduleCache.set(filePath, model);
    return model;
  }

  /** Resolve a call's callee to a first-party user function, following imports + re-exports. */
  function resolveCallee(
    call: CallExpression,
    model: ModuleModel,
    depth: number,
  ): { model: ModuleModel; fn: FnInfo } | null {
    const callee = call.callee;
    if (callee.type !== 'Identifier') {
      return null; // member calls / dynamic dispatch — out of syntactic reach
    }
    // A `useXxx()`-named callee is a hook the compiler *recognizes*: it does not memoize around
    // it, and any risky leaf inside it is reported at the hook's own definition. Following it
    // would double-report and produce false positives at the caller.
    if (/^use[A-Z]/.test(callee.name)) {
      return null;
    }
    return resolveName(callee.name, model, depth);
  }

  /** Resolve a name within a module to a user function, crossing imports/exports as needed. */
  function resolveName(name: string, model: ModuleModel, depth: number): { model: ModuleModel; fn: FnInfo } | null {
    if (depth > MAX_DEPTH) {
      return null;
    }
    const local = model.localFns.get(name);
    if (local) {
      return { model, fn: local };
    }
    const imported = model.imports.get(name);
    if (imported) {
      const targetPath = resolver(imported.source, model.filePath);
      if (!targetPath) {
        return null; // package boundary / unresolved
      }
      const targetModel = parseModule(targetPath);
      if (!targetModel) {
        return null;
      }
      return resolveExport(targetModel, imported.importedName, depth + 1);
    }
    return null;
  }

  /** Resolve an export name in a module to a user function, following re-export chains. */
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
        const fn = model.localFns.get(target.localName);
        return fn ? { model, fn } : null;
      }
      const targetPath = resolver(target.source, model.filePath);
      if (!targetPath) {
        return null;
      }
      const targetModel = parseModule(targetPath);
      return targetModel ? resolveExport(targetModel, target.importedName, depth + 1) : null;
    }
    // Fall back to `export * from …` barrels.
    for (const source of model.exportStars) {
      const targetPath = resolver(source, model.filePath);
      if (!targetPath) {
        continue;
      }
      const targetModel = parseModule(targetPath);
      const hit = targetModel ? resolveExport(targetModel, exportName, depth + 1) : null;
      if (hit) {
        return hit;
      }
    }
    return null;
  }

  /** Does `fn` (in `model`) transitively reach a risky leaf? Memoized; cycle-safe. */
  function reachesRisk(model: ModuleModel, fn: FnInfo, depth: number, stack: Set<string>): IndirectRisk | null {
    const cacheKey = `${model.filePath}::${fn.key}`;
    if (reachCache.has(cacheKey)) {
      return reachCache.get(cacheKey)!;
    }
    if (depth > MAX_DEPTH || stack.has(cacheKey)) {
      return null; // recursion / too deep → treat as not-reaching (avoid infinite loop)
    }
    stack.add(cacheKey);

    let result: IndirectRisk | null = null;
    for (const { node, parent } of fn.calls) {
      // Direct leaf inside this function.
      const leaf = matchRiskyCall(node, parent, leafConfig);
      if (leaf) {
        result = { leaf, chain: [] };
        break;
      }
      // Otherwise follow a first-party callee.
      const resolved = resolveCallee(node, model, depth);
      if (!resolved) {
        continue;
      }
      const inner = reachesRisk(resolved.model, resolved.fn, depth + 1, stack);
      if (inner) {
        const calleeName = node.callee.type === 'Identifier' ? node.callee.name : '?';
        result = { leaf: inner.leaf, chain: [calleeName, ...inner.chain] };
        break;
      }
    }

    stack.delete(cacheKey);
    reachCache.set(cacheKey, result);
    return result;
  }

  /**
   * For the function starting at `entryFn` in `entryModel`, return every indirect risk reachable
   * through a first-party wrapper call (the direct-leaf cases are already handled by the in-file
   * plugin, so those are skipped here). Each finding carries the resolution chain for the message.
   */
  function analyzeFunctionCalls(
    entryModel: ModuleModel,
    entryFn: FnInfo,
  ): { call: CallExpression; risk: IndirectRisk }[] {
    const out: { call: CallExpression; risk: IndirectRisk }[] = [];
    for (const { node } of entryFn.calls) {
      // Skip calls that are themselves a direct leaf — the plugin reports those already.
      if (matchRiskyCall(node, null, leafConfig)) {
        continue;
      }
      const resolved = resolveCallee(node, entryModel, 0);
      if (!resolved) {
        continue;
      }
      const inner = reachesRisk(resolved.model, resolved.fn, 1, new Set());
      if (inner) {
        const calleeName = node.callee.type === 'Identifier' ? node.callee.name : '?';
        out.push({ call: node, risk: { leaf: inner.leaf, chain: [calleeName, ...inner.chain] } });
      }
    }
    return out;
  }

  return {
    /** Whether any leaf rule is enabled — callers can skip the whole pass when not. */
    enabled: hasAnyLeafRule(leafConfig),
    /**
     * Analyze a first-party file: for every function in it, report risks reachable through a
     * first-party wrapper call. Direct-leaf cases are skipped (the in-file plugin reports those).
     * Returns findings keyed by enclosing-function start location.
     */
    analyzeFile(filePath: string): IndirectFinding[] {
      const model = parseModule(filePath);
      if (!model) {
        return [];
      }
      const findings: IndirectFinding[] = [];
      for (const fn of model.fnByKey.values()) {
        for (const { call, risk } of analyzeFunctionCalls(model, fn)) {
          const loc = call.loc?.start ?? fn.node.loc?.start;
          if (!loc) {
            continue;
          }
          findings.push({ fnKey: fn.key, line: loc.line, column: loc.column, risk });
        }
      }
      return findings;
    },
  };
}

export type CallGraphAnalyzer = ReturnType<typeof createCallGraphAnalyzer>;

/** Build the indexed model for one module from its parsed AST. */
function buildModuleModel(filePath: string, ast: File): ModuleModel {
  const fnByKey = new Map<string, FnInfo>();
  const localFns = new Map<string, FnInfo>();
  const imports = new Map<string, { source: string; importedName: string }>();
  const exports = new Map<string, ExportTarget>();
  const exportStars: string[] = [];

  const fnStack: FnInfo[] = [];

  function infoFor(node: BabelFunction): FnInfo {
    const key = node.loc ? fnKey(node.loc.start) : `anon-${fnByKey.size}`;
    let info = fnByKey.get(key);
    if (!info) {
      info = { key, node, calls: [] };
      fnByKey.set(key, info);
    }
    return info;
  }

  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Function: {
      enter(path) {
        fnStack.push(infoFor(path.node as BabelFunction));
      },
      exit() {
        fnStack.pop();
      },
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CallExpression(path) {
      const top = fnStack[fnStack.length - 1];
      if (top) {
        top.calls.push({ node: path.node, parent: path.parent });
      }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ImportDeclaration(path) {
      const source = path.node.source.value;
      for (const spec of path.node.specifiers) {
        if (spec.type === 'ImportSpecifier') {
          const importedName = spec.imported.type === 'Identifier' ? spec.imported.name : spec.imported.value;
          imports.set(spec.local.name, { source, importedName });
        } else if (spec.type === 'ImportDefaultSpecifier') {
          imports.set(spec.local.name, { source, importedName: 'default' });
        }
        // ImportNamespaceSpecifier (`* as ns`) → namespace member access, not syntactically resolvable.
      }
    },
  });

  // Second pass (top-level only) for local function names + exports. Kept separate so the
  // function/call traversal above stays simple.
  for (const stmt of ast.program.body) {
    indexTopLevel(stmt, fnByKey, localFns, exports, exportStars);
  }

  return { filePath, fnByKey, localFns, imports, exports, exportStars };
}

/** Index a single top-level statement: local function bindings and export targets. */
function indexTopLevel(
  stmt: Node,
  fnByKey: Map<string, FnInfo>,
  localFns: Map<string, FnInfo>,
  exports: Map<string, ExportTarget>,
  exportStars: string[],
): void {
  const registerLocalFn = (name: string, fnNode: Node): void => {
    if (!isUserFunction(fnNode) || !fnNode.loc) {
      return;
    }
    const info = fnByKey.get(fnKey(fnNode.loc.start));
    if (info) {
      localFns.set(name, info);
    }
  };

  const registerDeclaration = (decl: Node, exported: boolean): void => {
    if (decl.type === 'FunctionDeclaration' && decl.id) {
      registerLocalFn(decl.id.name, decl);
      if (exported) {
        exports.set(decl.id.name, { kind: 'local', localName: decl.id.name });
      }
    } else if (decl.type === 'VariableDeclaration') {
      for (const d of decl.declarations) {
        if (d.id.type === 'Identifier' && d.init) {
          registerLocalFn(d.id.name, d.init);
          if (exported) {
            exports.set(d.id.name, { kind: 'local', localName: d.id.name });
          }
        }
      }
    }
  };

  if (stmt.type === 'FunctionDeclaration' || stmt.type === 'VariableDeclaration') {
    registerDeclaration(stmt, false);
    return;
  }

  if (stmt.type === 'ExportNamedDeclaration') {
    if (stmt.declaration) {
      registerDeclaration(stmt.declaration, true);
      return;
    }
    const source = stmt.source?.value;
    for (const spec of stmt.specifiers) {
      if (spec.type !== 'ExportSpecifier') {
        continue;
      }
      const exportedName = spec.exported.type === 'Identifier' ? spec.exported.name : spec.exported.value;
      if (source) {
        exports.set(exportedName, { kind: 'reexport', source, importedName: spec.local.name });
      } else {
        exports.set(exportedName, { kind: 'local', localName: spec.local.name });
      }
    }
    return;
  }

  if (stmt.type === 'ExportAllDeclaration') {
    exportStars.push(stmt.source.value);
  }
}
