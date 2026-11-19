import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, posix, relative, sep } from 'node:path';

import { logger } from '@nx/devkit';
import { init as initEsLexer, parse as parseEsm } from 'es-module-lexer';
import { globSync } from 'fast-glob';

import { CSS_MODULES_DIR, CSS_MODULES_SUBPATH, hasCssModulesEntry } from '../../../css-modules';
import { type PackageJson } from '../../../types';
import { type NormalizedOptions } from './shared';

const GRIFFEL_HOOK = /\.styles\.js$/;
const RAW_STYLES = /\.styles\.raw\.(css\.)?js$/;
const CJS_REQUIRE = /(\brequire\(\s*)(["'])([^"'\n]+)\2(\s*\))/g;
const CREATE_CONTEXT = /\bcreateContext\b/;

interface ModuleInfo {
  /** posix path relative to the ESM output root, eg. `components/Button/Button.js` */
  file: string;
  code: string;
  /** every import/re-export specifier, in source order */
  specifiers: Array<{ start: number; end: number; value: string }>;
  /** what each static import/re-export statement pulls from its target */
  dependencies: Array<{ value: string; names: string[] | 'all' }>;
  /** names exported by declarations of this module (not re-exported from another module) */
  localExports: Set<string>;
  /** `export { orig as name } from "value"` */
  reExports: Map<string, { value: string; orig: string }>;
  /** `export * from "value"` */
  starExports: string[];
}

export interface CssModulesGraph {
  /** Griffel style hooks that have a CSS Modules twin (`X.styles.js` + `X.styles.css.js`). */
  griffelHooks: Set<string>;
  /** Modules re-emitted into the css-modules tree. Every other module is shared with the main entry. */
  reEmitted: Set<string>;
}

/**
 * Generates the `./css-modules` entry for packages that declare it in their export map.
 *
 * The entry exposes the same API as the root entry, but every component is wired to its CSS Modules style hook
 * (`X.styles.css.js`) instead of the Griffel one (`X.styles.js`). Only modules whose behaviour depends on a style hook
 * are re-emitted into `<output>/css-modules/**`, every other module (hooks, contexts, utilities) is imported from the
 * main output, so React contexts and module state stay single-instance across both entries.
 *
 * @example
 * `lib/components/Button/Button.js`             -> `import { useButtonStyles_unstable } from "./useButtonStyles.styles.js"`
 * `lib/css-modules/components/Button/Button.js` -> `import { useButtonStyles_unstable } from "../../../components/Button/useButtonStyles.styles.css.js"`
 */
export async function emitCssModulesEntry(options: NormalizedOptions): Promise<boolean> {
  const packageJson = readPackageJson(options.absoluteProjectRoot);

  if (!hasCssModulesEntry(packageJson)) {
    return true;
  }

  const esmOutput = options.moduleOutput.find(output => output.module === 'es6');
  if (!esmOutput) {
    logger.error(`"${CSS_MODULES_SUBPATH}" entry requires an es6 module output.`);
    return false;
  }

  const esmRoot = join(options.absoluteProjectRoot, esmOutput.outputPath);
  const modules = await readEsmModules(esmRoot);
  const isCssModulesPackage = createCssModulesPackageResolver(options.absoluteProjectRoot);
  const graph = buildCssModulesGraph(modules, isCssModulesPackage);

  const duplicatedContexts = [...graph.reEmitted].filter(file => CREATE_CONTEXT.test(modules.get(file)!.code));
  if (duplicatedContexts.length > 0) {
    logger.error(
      [
        `"${CSS_MODULES_SUBPATH}" entry would duplicate React contexts, because these modules depend on style hooks:`,
        ...duplicatedContexts.map(file => `  - ${file}`),
        'Move the context into a module that does not import styles.',
      ].join('\n'),
    );
    return false;
  }

  for (const file of graph.reEmitted) {
    const info = modules.get(file)!;
    const outFile = join(esmRoot, CSS_MODULES_DIR, file);
    const code = replaceSpecifiers(info.code, info.specifiers, value =>
      rewriteSpecifier(value, file, graph, isCssModulesPackage, '.js'),
    );
    await writeModule(join(esmRoot, file), outFile, code);
  }

  for (const output of options.moduleOutput) {
    if (output.module !== 'commonjs') {
      continue;
    }

    const cjsRoot = join(options.absoluteProjectRoot, output.outputPath);
    const ext = options.isEsmPackage ? '.cjs' : '.js';

    for (const file of graph.reEmitted) {
      const cjsFile = file.replace(/\.js$/, ext);
      const srcFile = join(cjsRoot, cjsFile);
      const code = (await readFile(srcFile, 'utf-8')).replace(
        CJS_REQUIRE,
        (_match, open: string, quote: string, value: string, close: string) =>
          `${open}${quote}${rewriteSpecifier(value, cjsFile, graph, isCssModulesPackage, ext)}${quote}${close}`,
      );
      await writeModule(srcFile, join(cjsRoot, CSS_MODULES_DIR, cjsFile), code);
    }
  }

  logger.log(
    `🎨 "${CSS_MODULES_SUBPATH}" entry: ${graph.reEmitted.size} modules re-emitted, ${graph.griffelHooks.size} Griffel style hooks replaced`,
  );

  return true;
}

/**
 * Emits `dist/css-modules.d.ts` (+ `.d.cts`), re-exporting the root rolled declarations: CSS Modules style hooks have
 * the same signatures and class names as the Griffel ones, so the public API of both entries is identical.
 */
export async function emitCssModulesTypes(options: NormalizedOptions): Promise<boolean> {
  const packageJson = readPackageJson(options.absoluteProjectRoot);
  const distDir = join(options.absoluteProjectRoot, 'dist');

  if (!hasCssModulesEntry(packageJson) || !existsSync(join(distDir, 'index.d.ts'))) {
    return true;
  }

  const header = `// Generated by the build: "${CSS_MODULES_SUBPATH}" has the same API as the root entry.\n`;

  if (options.isEsmPackage) {
    await writeFile(join(distDir, 'css-modules.d.ts'), `${header}export * from './index.js';\n`);
    await writeFile(join(distDir, 'css-modules.d.cts'), `${header}export * from './index.cjs';\n`);
  } else {
    await writeFile(join(distDir, 'css-modules.d.ts'), `${header}export * from './index';\n`);
  }

  return true;
}

// ===========

/**
 * A module is style dependent when it pulls (directly, or through other style dependent modules) a Griffel style hook
 * that has a CSS Modules twin, or anything from a dependency shipping `./css-modules`. Named imports are resolved
 * through barrel re-exports to the module defining them, so importing a hook from a barrel that also re-exports a
 * styled component doesn't make the importer (eg. a context) style dependent.
 */
export function buildCssModulesGraph(
  modules: Map<string, ModuleInfo>,
  isCssModulesPackage: (specifier: string) => boolean,
): CssModulesGraph {
  const griffelHooks = new Set(
    [...modules.keys()].filter(file => GRIFFEL_HOOK.test(file) && modules.has(toCssHook(file))),
  );

  const importedBy = new Map<string, Set<string>>();
  const styleDependent = new Set<string>(griffelHooks);
  const addEdge = (from: string, to: string) => {
    const importers = importedBy.get(to) ?? new Set<string>();
    importers.add(from);
    importedBy.set(to, importers);
  };

  for (const { file, dependencies } of modules.values()) {
    for (const { value, names } of dependencies) {
      if (!isRelative(value)) {
        if (isCssModulesPackage(value)) {
          styleDependent.add(file);
        }
        continue;
      }

      const target = resolveRelative(file, value);
      if (!modules.has(target)) {
        continue;
      }

      if (names === 'all') {
        addEdge(file, target);
        continue;
      }

      for (const name of names) {
        for (const definition of resolveDefinitions(modules, target, name)) {
          addEdge(file, definition);
        }
      }
    }
  }

  const queue = [...styleDependent];
  while (queue.length > 0) {
    for (const importer of importedBy.get(queue.pop()!) ?? []) {
      if (!styleDependent.has(importer)) {
        styleDependent.add(importer);
        queue.push(importer);
      }
    }
  }

  return {
    griffelHooks,
    reEmitted: new Set([...styleDependent].filter(file => !griffelHooks.has(file)).sort()),
  };
}

/**
 * @returns modules defining `name` exported from `file`, following re-exports. Falls back to `file` itself (the
 * conservative answer) when the definition can't be found.
 */
function resolveDefinitions(
  modules: Map<string, ModuleInfo>,
  file: string,
  name: string,
  seen = new Set<string>(),
): string[] {
  const info = modules.get(file);
  if (!info || seen.has(file)) {
    return [file];
  }
  seen.add(file);

  if (info.localExports.has(name)) {
    return [file];
  }

  const reExport = info.reExports.get(name);
  if (reExport) {
    return isRelative(reExport.value)
      ? // the barrel itself has no behaviour, only the module defining the binding matters
        resolveDefinitions(modules, resolveRelative(file, reExport.value), reExport.orig, seen)
      : [file];
  }

  for (const star of info.starExports) {
    if (!isRelative(star)) {
      return [file];
    }
    const target = resolveRelative(file, star);
    if (exportsName(modules, target, name)) {
      return resolveDefinitions(modules, target, name, seen);
    }
  }

  return [file];
}

function exportsName(modules: Map<string, ModuleInfo>, file: string, name: string, seen = new Set<string>()): boolean {
  const info = modules.get(file);
  if (!info || seen.has(file)) {
    return false;
  }
  seen.add(file);

  return (
    info.localExports.has(name) ||
    info.reExports.has(name) ||
    info.starExports.some(star => isRelative(star) && exportsName(modules, resolveRelative(file, star), name, seen))
  );
}

/**
 * @param file - path of the importing module relative to the output root (`.js` or `.cjs`)
 * @param ext - extension of JS modules in this output
 */
export function rewriteSpecifier(
  value: string,
  file: string,
  graph: CssModulesGraph,
  isCssModulesPackage: (specifier: string) => boolean,
  ext: string,
): string {
  if (!isRelative(value)) {
    return isCssModulesPackage(value) ? `${value}/${CSS_MODULES_DIR}` : value;
  }

  // graph keys use the ESM `.js` extension
  const toKey = (path: string) => (ext === '.js' ? path : path.replace(new RegExp(`\\${ext}$`), '.js'));
  const fromKey = (path: string) => (ext === '.js' ? path : path.replace(/\.js$/, ext));

  let target = toKey(resolveRelative(file, value));
  if (graph.griffelHooks.has(target)) {
    target = toCssHook(target);
  }

  const importer = posix.join(CSS_MODULES_DIR, file);
  const resolved = graph.reEmitted.has(target) ? posix.join(CSS_MODULES_DIR, target) : target;

  return toRelativeSpecifier(posix.relative(posix.dirname(importer), fromKey(resolved)));
}

function toCssHook(griffelHook: string) {
  return griffelHook.replace(GRIFFEL_HOOK, '.styles.css.js');
}

function isRelative(specifier: string) {
  return specifier.startsWith('./') || specifier.startsWith('../');
}

function resolveRelative(file: string, specifier: string) {
  return posix.normalize(posix.join(posix.dirname(file), specifier));
}

function toRelativeSpecifier(path: string) {
  return path.startsWith('.') ? path : `./${path}`;
}

function replaceSpecifiers(code: string, specifiers: ModuleInfo['specifiers'], rewrite: (value: string) => string) {
  let result = '';
  let lastIndex = 0;

  for (const { start, end, value } of specifiers) {
    result += code.slice(lastIndex, start) + rewrite(value);
    lastIndex = end;
  }

  return result + code.slice(lastIndex);
}

async function readEsmModules(esmRoot: string): Promise<Map<string, ModuleInfo>> {
  await initEsLexer;

  const files = globSync('**/*.js', { cwd: esmRoot, ignore: [`${CSS_MODULES_DIR}/**`] }).filter(
    file => !RAW_STYLES.test(file),
  );
  const modules = new Map<string, ModuleInfo>();

  for (const file of files.sort()) {
    modules.set(file, parseModule(file, await readFile(join(esmRoot, file), 'utf-8')));
  }

  return modules;
}

const NAMED_CLAUSE = /^(import|export)\s*\{([^}]*)\}\s*from\b/;
const STAR_EXPORT = /^export\s*\*\s*from\b/;

export function parseModule(file: string, code: string): ModuleInfo {
  const [imports, exports] = parseEsm(code, file);
  const info: ModuleInfo = {
    file,
    code,
    specifiers: [],
    dependencies: [],
    localExports: new Set(),
    reExports: new Map(),
    starExports: [],
  };

  for (const entry of imports) {
    // `n` is undefined for `import.meta` and dynamic imports of non-literal expressions
    if (entry.n === undefined || entry.s < 0) {
      continue;
    }

    const value = entry.n;
    const isDynamic = entry.d > -1;
    // dynamic imports include the quotes in the [s, e] range
    info.specifiers.push({ start: isDynamic ? entry.s + 1 : entry.s, end: isDynamic ? entry.e - 1 : entry.e, value });

    if (isDynamic) {
      info.dependencies.push({ value, names: 'all' });
      continue;
    }

    const statement = code.slice(entry.ss, entry.se);
    const named = NAMED_CLAUSE.exec(statement);

    if (STAR_EXPORT.test(statement)) {
      info.starExports.push(value);
      info.dependencies.push({ value, names: 'all' });
    } else if (named) {
      const bindings = parseBindings(named[2]);
      if (named[1] === 'export') {
        for (const { orig, local } of bindings) {
          info.reExports.set(local, { value, orig });
        }
      }
      info.dependencies.push({ value, names: bindings.map(binding => binding.orig) });
    } else {
      // side effect, default and namespace imports, `export * as ns from`
      info.dependencies.push({ value, names: 'all' });
    }
  }

  for (const entry of exports) {
    // `ln` is undefined for re-exports
    if (entry.ln !== undefined) {
      info.localExports.add(entry.n);
    }
  }

  return info;
}

/** `a, b as c, type d` -> `[{ orig: 'a', local: 'a' }, { orig: 'b', local: 'c' }]` */
function parseBindings(clause: string) {
  return clause
    .split(',')
    .map(part => part.trim())
    .filter(part => part.length > 0 && !part.startsWith('type '))
    .map(part => {
      const [orig, local = orig] = part.split(/\s+as\s+/).map(name => name.trim());
      return { orig, local };
    });
}

/**
 * @returns predicate telling whether a bare specifier is the root entry of a dependency that ships a `./css-modules`
 * entry, eg. `@fluentui/react-button`. Sub-path specifiers (`@fluentui/react-jsx-runtime/jsx-runtime`) never match.
 */
function createCssModulesPackageResolver(projectRoot: string): (specifier: string) => boolean {
  const ownName = readPackageJson(projectRoot).name;
  const cache = new Map<string, boolean>();

  return specifier => {
    if (!/^@fluentui\/[^/]+$/.test(specifier) || specifier === ownName) {
      return false;
    }

    if (!cache.has(specifier)) {
      let result = false;
      try {
        const packageJsonPath = require.resolve(`${specifier}/package.json`, { paths: [projectRoot] });
        result = hasCssModulesEntry(JSON.parse(readFileSync(packageJsonPath, 'utf-8')));
      } catch {
        result = false;
      }
      cache.set(specifier, result);
    }

    return cache.get(specifier)!;
  };
}

async function writeModule(srcFile: string, outFile: string, code: string) {
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, code);

  const srcMap = `${srcFile}.map`;
  if (!existsSync(srcMap)) {
    return;
  }

  // keep `sources` pointing at the original files from the new, deeper location
  const map = JSON.parse(await readFile(srcMap, 'utf-8'));
  if (Array.isArray(map.sources)) {
    map.sources = map.sources.map((source: string) =>
      relative(dirname(outFile), join(dirname(srcFile), source))
        .split(sep)
        .join('/'),
    );
  }
  await writeFile(`${outFile}.map`, JSON.stringify(map));
}

function readPackageJson(projectRoot: string): PackageJson {
  return JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf-8'));
}
