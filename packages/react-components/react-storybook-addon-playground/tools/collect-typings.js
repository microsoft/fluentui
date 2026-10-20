// @ts-check

const fs = require('fs');
const path = require('path');
const semver = require('semver');

/**
 * @typedef {{ kind: 'module' | 'path' | 'types', value: string }} Specifier
 * @typedef {{ files: Record<string, string>, sources: string[], missing: string[] }} CollectResult
 * @typedef {{ dir: string, name: string, packageJson: Record<string, any> }} PackageInfo
 * @typedef {{ path: string, conditionNames: readonly string[] } | false | null} ModuleResolution
 * @typedef {(request: string, fromDir: string) => Promise<ModuleResolution>} PackageResolver
 */

const VIRTUAL_ROOT = 'file:///node_modules';

// `import x from '…'`, `export … from '…'`, `import('…')`, `import x = require('…')`, `/// <reference path|types="…" />`
const SPECIFIER_REGEX =
  /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)["']([^"'\n]+)["']|\/\/\/\s*<reference\s+(path|types)\s*=\s*["']([^"'\n]+)["']/g;

// bare package specifier, optionally scoped and with a sub path
const PACKAGE_SPECIFIER_REGEX = /^(@[\w.-]+\/)?[\w.-]+(\/[\w.-]+)*$/;

/** @type {typeof import('typescript') | null | undefined} */
let typescriptModule;

/**
 * TypeScript is an optional peer: Storybook projects almost always have it, but typings collection must not fail
 * without it.
 *
 * @returns {typeof import('typescript') | null}
 */
function getTypeScript() {
  if (typescriptModule === undefined) {
    try {
      typescriptModule = require('typescript');
    } catch {
      typescriptModule = null;
    }
  }

  return typescriptModule ?? null;
}

/**
 * Extracts module specifiers and triple-slash references from a `.d.ts` file. Uses the TypeScript scanner when it
 * is available (it ignores specifier-like text in comments and strings, such as JSDoc examples) and falls back to a
 * regular expression.
 *
 * @param {string} content
 * @param {typeof import('typescript') | null} [ts]
 * @returns {Specifier[]}
 */
function getSpecifiers(content, ts = getTypeScript()) {
  if (ts) {
    const info = ts.preProcessFile(content, true, true);
    return [
      ...info.importedFiles.map(file => ({ kind: /** @type {const} */ ('module'), value: file.fileName })),
      ...info.referencedFiles.map(file => ({ kind: /** @type {const} */ ('path'), value: file.fileName })),
      ...info.typeReferenceDirectives.map(file => ({ kind: /** @type {const} */ ('types'), value: file.fileName })),
    ];
  }

  return getSpecifiersWithRegex(content);
}

/**
 * @param {string} content
 * @returns {Specifier[]}
 */
function getSpecifiersWithRegex(content) {
  /** @type {Specifier[]} */
  const result = [];

  for (const match of content.matchAll(SPECIFIER_REGEX)) {
    if (match[1] !== undefined) {
      result.push({ kind: 'module', value: match[1] });
    } else {
      result.push({ kind: /** @type {'path' | 'types'} */ (match[2]), value: match[3] });
    }
  }

  return result;
}

/**
 * Detects how a declaration file exposes a default export, so classic-resolution shims can forward it:
 * `'equals'` for `export =`, `'default'` for ES default exports, `null` when there is none.
 *
 * @param {string} content
 * @param {typeof import('typescript') | null} [ts]
 * @returns {'equals' | 'default' | null}
 */
function getDefaultExportKind(content, ts = getTypeScript()) {
  if (ts) {
    const sourceFile = ts.createSourceFile('entry.d.ts', content, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
    /** @type {'equals' | 'default' | null} */
    let kind = null;
    for (const statement of sourceFile.statements) {
      if (ts.isExportAssignment(statement)) {
        if (statement.isExportEquals) {
          return 'equals';
        }
        kind = 'default';
      } else if (ts.isExportDeclaration(statement)) {
        const clause = statement.exportClause;
        if (clause && ts.isNamedExports(clause) && clause.elements.some(element => element.name.text === 'default')) {
          kind = 'default';
        }
      } else {
        // `getModifiers` was added in TypeScript 4.8, older versions expose `modifiers` directly.
        /** @type {readonly import('typescript').ModifierLike[] | undefined} */
        const modifiers = ts.getModifiers
          ? ts.canHaveModifiers(statement)
            ? ts.getModifiers(statement)
            : undefined
          : /** @type {any} */ (statement).modifiers;
        const kinds = (modifiers ?? []).map(modifier => modifier.kind);
        if (kinds.includes(ts.SyntaxKind.ExportKeyword) && kinds.includes(ts.SyntaxKind.DefaultKeyword)) {
          kind = 'default';
        }
      }
    }
    return kind;
  }

  const code = content.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, '');
  if (/\bexport\s*=/.test(code)) {
    return 'equals';
  }
  if (/\bexport\s+default\b/.test(code)) {
    return 'default';
  }
  for (const [, clause] of code.matchAll(/\bexport\s*\{([^}]*)\}/g)) {
    // `default` or `local as default`; the exported name is the last word
    if (clause.split(',').some(element => element.trim().split(/\s+/).pop() === 'default')) {
      return 'default';
    }
  }
  return null;
}

/**
 * Splits a module specifier into package name and sub path.
 *
 * @param {string} specifier
 */
function parseSpecifier(specifier) {
  const segments = specifier.split('/');
  const name = specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];

  return { name, subpath: specifier.slice(name.length + 1) };
}

/**
 * `@scope/name` -> `@types/scope__name`
 *
 * @param {string} name
 */
function getTypesPackageName(name) {
  return `@types/${name.replace(/^@/, '').replace('/', '__')}`;
}

/**
 * Picks a types path from a package.json `exports` entry (string, conditions, or fallback list).
 *
 * @param {unknown} entry
 * @param {ReadonlySet<string>} [conditionNames]
 * @returns {string | null}
 */
function getTypesFromExportEntry(entry, conditionNames) {
  if (typeof entry === 'string') {
    return entry;
  }

  if (Array.isArray(entry)) {
    for (const candidate of entry) {
      const resolved = getTypesFromExportEntry(candidate, conditionNames);
      if (resolved) {
        return resolved;
      }
    }
    return null;
  }

  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const conditions = /** @type {Record<string, unknown>} */ (entry);
  const keys = conditionNames
    ? Object.keys(conditions).filter(key => key === 'types' || key === 'default' || conditionNames.has(key))
    : ['types', 'import', 'require', 'default'];
  for (const condition of keys) {
    const resolved = getTypesFromExportEntry(conditions[condition], conditionNames);
    if (resolved) {
      return resolved;
    }
  }

  return null;
}

/**
 * Resolves a types path from `package.json#exports` for `subpath` (`''` is `'.'`).
 *
 * @param {Record<string, any>} packageJson
 * @param {string} subpath
 * @returns {string | null}
 */
function getExportTypesPath(packageJson, subpath) {
  const exportsField = packageJson.exports;
  if (!exportsField) {
    return null;
  }

  if (typeof exportsField === 'string') {
    return subpath ? null : exportsField;
  }

  const key = subpath ? `./${subpath}` : '.';
  const typesPath = getTypesFromExportEntry(
    exportsField[key] ??
      (!subpath && !Object.keys(exportsField).some(exportKey => exportKey.startsWith('.')) ? exportsField : null),
  );
  return typesPath ? typesPath.replace(/^\.\//, '') : null;
}

/**
 * Resolves declarations only, never JavaScript implementations from runtime exports.
 *
 * @param {string} packageDir
 * @param {string} typesPath
 * @returns {string | null}
 */
function resolveTypesFile(packageDir, typesPath) {
  if (/\.d\.[cm]?ts$/.test(typesPath)) {
    return existingFile(path.join(packageDir, typesPath));
  }

  const withoutExt = typesPath.replace(/\.(d\.)?[cm]?[jt]sx?$/, '');

  return (
    existingFile(path.join(packageDir, getDeclarationPath(typesPath))) ||
    existingFile(path.join(packageDir, `${withoutExt}.d.ts`)) ||
    existingFile(path.join(packageDir, `${withoutExt}.d.cts`)) ||
    existingFile(path.join(packageDir, `${withoutExt}.d.mts`)) ||
    existingFile(path.join(packageDir, withoutExt, 'index.d.ts'))
  );
}

/**
 * Applies `typesVersions` from package.json the same way TypeScript does (only `*` wildcards are supported).
 *
 * @param {{ typesVersions?: Record<string, Record<string, string[]>> }} packageJson
 * @param {string} relativePath
 * @param {string} typescriptVersion
 */
function applyTypesVersions(packageJson, relativePath, typescriptVersion) {
  const typesVersions = packageJson.typesVersions;
  if (!typesVersions) {
    return relativePath;
  }

  const matchingRange = Object.keys(typesVersions).find(range => semver.satisfies(typescriptVersion, range));
  if (!matchingRange) {
    return relativePath;
  }

  for (const [pattern, targets] of Object.entries(typesVersions[matchingRange])) {
    const star = pattern.indexOf('*');
    if (star === -1) {
      if (pattern === relativePath) {
        return targets[0];
      }
      continue;
    }

    const prefix = pattern.slice(0, star);
    const suffix = pattern.slice(star + 1);
    if (relativePath.startsWith(prefix) && relativePath.endsWith(suffix)) {
      const matched = relativePath.slice(prefix.length, relativePath.length - suffix.length);
      return targets[0].replaceAll('*', matched);
    }
  }

  return relativePath;
}

/** @param {string} filePath */
function getDeclarationPath(filePath) {
  if (/\.d\.[cm]?ts$/.test(filePath)) {
    return filePath;
  }
  const extension = filePath.endsWith('.mjs') ? '.d.mts' : filePath.endsWith('.cjs') ? '.d.cts' : '.d.ts';
  return `${filePath.replace(/\.(d\.)?[cm]?[jt]sx?$/, '')}${extension}`;
}

/**
 * @param {string} filePath
 * @returns {string | null}
 */
function existingFile(filePath) {
  try {
    return fs.statSync(filePath).isFile() ? filePath : null;
  } catch {
    return null;
  }
}

/**
 * @param {string} filePath
 * @returns {Record<string, any>}
 */
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Finds the named package owning a resolved entry, including aliases into built output with a nested package.json.
 *
 * @param {string} entryPath
 * @param {Set<string>} sources
 * @returns {string | null}
 */
function findResolvedPackageDir(entryPath, sources) {
  for (let dir = path.dirname(entryPath); ; dir = path.dirname(dir)) {
    const metadataPath = path.join(dir, 'package.json');
    if (existingFile(metadataPath)) {
      sources.add(fs.realpathSync(metadataPath));
      if (typeof readJson(metadataPath).name === 'string') {
        return fs.realpathSync(dir);
      }
    }
    if (path.dirname(dir) === dir) {
      return null;
    }
  }
}

/**
 * Prefers the requested export when it matches the runtime target, then reverse-matches remapped aliases.
 *
 * @param {PackageInfo} pkg
 * @param {string} entryPath
 * @param {string} requestedSubpath
 * @param {readonly string[]} conditionNames
 * @returns {{ subpath: string, typesPath: string | null, runtimePath?: string } | null}
 */
function getRuntimeExport(pkg, entryPath, requestedSubpath, conditionNames) {
  const realEntryPath = existingFile(entryPath) ? fs.realpathSync(entryPath) : path.resolve(entryPath);
  const relativePath = path.relative(pkg.dir, realEntryPath).split(path.sep).join('/');
  const activeConditions = new Set(conditionNames);
  /**
   * @param {unknown} entry
   * @param {string} [requestedCapture]
   * @returns {{ typesPath: string | null, capture?: string } | null | undefined}
   */
  const matchExport = (entry, requestedCapture) => {
    if (entry === null) {
      return null;
    }
    if (typeof entry === 'string') {
      if (/\.d\.[cm]?ts$/.test(entry)) {
        return null;
      }
      const target = path.posix.normalize(entry.replace(/^\.\//, ''));
      if (requestedCapture !== undefined) {
        return target.replaceAll('*', requestedCapture) === relativePath
          ? { typesPath: null, capture: requestedCapture }
          : null;
      }
      const star = target.indexOf('*');
      if (star === -1) {
        return target === relativePath ? { typesPath: null } : null;
      }
      const prefix = target.slice(0, star);
      const suffix = target.slice(star + 1);
      return relativePath.startsWith(prefix) && relativePath.endsWith(suffix)
        ? { typesPath: null, capture: relativePath.slice(prefix.length, relativePath.length - suffix.length) }
        : null;
    }
    if (Array.isArray(entry)) {
      for (const candidate of entry) {
        const match = matchExport(candidate, requestedCapture);
        if (match) {
          return match;
        }
      }
      return null;
    }
    if (entry && typeof entry === 'object') {
      const conditions = /** @type {Record<string, unknown>} */ (entry);
      for (const [key, value] of Object.entries(conditions)) {
        if (key === 'types' || key.startsWith('types@') || (key !== 'default' && !activeConditions.has(key))) {
          continue;
        }
        const match = matchExport(value, requestedCapture);
        // Only a nested object with no enabled condition can fall through to the next condition.
        if (match === undefined) {
          continue;
        }
        if (!match) {
          return null;
        }
        const typesPath = match.typesPath ?? getTypesFromExportEntry(conditions.types, activeConditions);
        return {
          ...match,
          typesPath: typesPath && match.capture !== undefined ? typesPath.replaceAll('*', match.capture) : typesPath,
        };
      }
    }
    return undefined;
  };
  const exportsField = pkg.packageJson.exports;
  if (exportsField && typeof exportsField === 'object' && !Array.isArray(exportsField)) {
    const entries = Object.entries(exportsField).filter(([key]) => key.startsWith('.'));
    const requestedKey = requestedSubpath ? `./${requestedSubpath}` : '.';
    const requestedEntry =
      entries.find(([key]) => key === requestedKey) ??
      entries
        .filter(([key]) => {
          const star = key.indexOf('*');
          return (
            star !== -1 &&
            star === key.lastIndexOf('*') &&
            requestedKey.length >= key.length &&
            requestedKey.startsWith(key.slice(0, star)) &&
            requestedKey.endsWith(key.slice(star + 1))
          );
        })
        .sort(([left], [right]) => right.indexOf('*') - left.indexOf('*') || right.length - left.length)[0];
    if (requestedEntry) {
      const [key, entry] = requestedEntry;
      const star = key.indexOf('*');
      const capture = star === -1 ? undefined : requestedKey.slice(star, requestedKey.length - key.length + star + 1);
      const match = matchExport(entry, capture);
      if (match) {
        return { subpath: requestedSubpath, typesPath: match.typesPath, runtimePath: relativePath };
      }
    }
    /** @type {{ subpath: string, typesPath: string | null, runtimePath?: string } | null} */
    let firstMatch = null;
    for (const [key, entry] of entries) {
      const match = matchExport(entry);
      if (match) {
        const resolved = {
          subpath: key === '.' ? '' : key.slice(2).replaceAll('*', match.capture ?? ''),
          typesPath: match.typesPath,
          runtimePath: relativePath,
        };
        if (resolved.subpath === requestedSubpath) {
          return resolved;
        }
        firstMatch ??= resolved;
      }
    }
    if (firstMatch) {
      return firstMatch;
    }
  }
  const rootExport = matchExport(exportsField);
  if (rootExport) {
    return { subpath: '', typesPath: rootExport.typesPath, runtimePath: relativePath };
  }
  if ([pkg.packageJson.module, pkg.packageJson.main, pkg.packageJson.browser].some(entry => matchExport(entry))) {
    return { subpath: '', typesPath: null };
  }
  return null;
}

/**
 * Collects the transitive closure of type declaration files needed to type-check code importing `entries`.
 *
 * Package declarations keep their paths under `file:///node_modules/<package>/`. Separate virtual entries and
 * package metadata route Monaco's node module resolution to the selected public exports without changing those files.
 *
 * @param {{
 *   packageRoot: string,
 *   entries: string[],
 *   typescriptVersion: string,
 *   moduleRequests?: Record<string, string>,
 *   typingsRoots?: Record<string, string>,
 *   resolvePackage?: PackageResolver
 * }} options
 * @returns {Promise<CollectResult>}
 */
async function collectTypings(options) {
  const { entries, typescriptVersion } = options;
  const packageRoot = path.resolve(options.packageRoot);

  /** @type {Record<string, string>} */
  const files = {};
  /** @type {Set<string>} */
  const sources = new Set();
  /** @type {Set<string>} */
  const missing = new Set();
  /** @type {Map<string, (PackageInfo & { subpath: string, entryFile: string | null }) | null>} */
  const packages = new Map();

  /**
   * @param {string} name
   * @param {string} fromDir
   */
  function findPackageDir(name, fromDir) {
    let dir = fromDir;
    while (true) {
      const candidate = path.join(dir, 'node_modules', name);
      if (existingFile(path.join(candidate, 'package.json'))) {
        return fs.realpathSync(candidate);
      }
      const parent = path.dirname(dir);
      if (parent === dir) {
        return null;
      }
      dir = parent;
    }
  }

  /**
   * Resolves the package providing types for `name` (and `subpath`): the package itself when it ships types for the
   * root or the requested subpath, `@types/*` otherwise.
   *
   * @param {string} specifier
   * @param {string} fromDir
   */
  async function getPackage(specifier, fromDir) {
    const { name, subpath } = parseSpecifier(specifier);
    const request = options.moduleRequests?.[specifier] ?? specifier;
    const requestSpecifier = PACKAGE_SPECIFIER_REGEX.test(request) ? parseSpecifier(request) : null;
    const requestSubpath = requestSpecifier?.subpath ?? subpath;
    const cacheKey = `${specifier}\0${fromDir}`;
    const cached = packages.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    /**
     * @param {string} dir
     * @param {string} [fallbackName]
     */
    const load = (dir, fallbackName = name) => {
      const realDir = fs.realpathSync(dir);
      const packageJson = readJson(path.join(realDir, 'package.json'));
      return {
        dir: realDir,
        name: typeof packageJson.name === 'string' ? packageJson.name : fallbackName,
        packageJson,
      };
    };

    const explicitRoot = options.typingsRoots?.[specifier] ?? options.typingsRoots?.[name];
    if (explicitRoot && !existingFile(path.join(explicitRoot, 'package.json'))) {
      throw new Error(
        `Playground typingsRoots[${JSON.stringify(specifier)}] must contain a package.json: ${explicitRoot}`,
      );
    }
    const resolution = !explicitRoot && options.resolvePackage ? await options.resolvePackage(request, fromDir) : null;
    if (resolution === false) {
      packages.set(cacheKey, null);
      return null;
    }
    const ownDir =
      explicitRoot ||
      (resolution
        ? findResolvedPackageDir(resolution.path, sources)
        : requestSpecifier && findPackageDir(requestSpecifier.name, fromDir));
    const own = ownDir ? load(ownDir) : null;
    const resolvedExport =
      own && resolution ? getRuntimeExport(own, resolution.path, requestSubpath, resolution.conditionNames) : null;
    const ownSubpath = resolvedExport?.subpath ?? requestSubpath;
    /** @type {string | null} */
    let ownEntry = null;
    if (own) {
      if (resolution && /\.d\.[cm]?ts$/.test(resolution.path)) {
        const realEntryPath = existingFile(resolution.path) ? fs.realpathSync(resolution.path) : resolution.path;
        ownEntry = resolveVersionedTypesFile(own, path.relative(own.dir, realEntryPath));
      } else if (resolvedExport?.typesPath) {
        ownEntry = resolveVersionedTypesFile(own, resolvedExport.typesPath);
      } else if (resolvedExport?.runtimePath) {
        ownEntry =
          resolveVersionedTypesFile(own, getDeclarationPath(resolvedExport.runtimePath)) ||
          resolveVersionedTypesFile(own, resolvedExport.runtimePath) ||
          resolveEntryFile(own, ownSubpath);
      } else if (resolvedExport || explicitRoot || !resolution) {
        ownEntry = resolveEntryFile(own, ownSubpath);
      } else {
        ownEntry =
          resolveTypesFile(path.dirname(resolution.path), path.basename(resolution.path)) ||
          resolveEntryFile(own, ownSubpath);
      }
    }
    const hasOwnTypes =
      own &&
      (own.packageJson.types || own.packageJson.typings || existingFile(path.join(own.dir, 'index.d.ts')) || ownEntry);

    let result = hasOwnTypes && own ? { ...own, subpath: ownSubpath, entryFile: ownEntry || null } : null;
    if (!result && !name.startsWith('@types/')) {
      const typesName = getTypesPackageName(own?.name ?? requestSpecifier?.name ?? name);
      const typesResolution = options.resolvePackage ? await options.resolvePackage(typesName, fromDir) : null;
      const typesDir =
        typesResolution === false
          ? null
          : typesResolution
          ? findResolvedPackageDir(typesResolution.path, sources)
          : findPackageDir(typesName, own?.dir ?? fromDir);
      if (typesDir) {
        const typesPackage = load(typesDir, typesName);
        result = {
          ...typesPackage,
          subpath: ownSubpath,
          entryFile: resolveEntryFile(typesPackage, ownSubpath),
        };
      }
    }

    packages.set(cacheKey, result);
    return result;
  }

  /**
   * @param {{ dir: string, name: string }} pkg
   * @param {string} realFile
   */
  function toVirtualPath(pkg, realFile) {
    return `${VIRTUAL_ROOT}/${pkg.name}/${path.relative(pkg.dir, realFile).split(path.sep).join('/')}`;
  }

  /**
   * Registers a trimmed package.json so TypeScript can read `types`/`typesVersions`.
   *
   * @param {{ dir: string, name: string, packageJson: Record<string, any> }} pkg
   * @param {string} packageJsonPath
   */
  function addPackageJson(pkg, packageJsonPath) {
    const virtualPath = toVirtualPath(pkg, packageJsonPath);
    if (files[virtualPath]) {
      return;
    }

    const json = packageJsonPath === path.join(pkg.dir, 'package.json') ? pkg.packageJson : readJson(packageJsonPath);
    files[virtualPath] = JSON.stringify({
      name: json.name,
      types: json.types || json.typings,
      typesVersions: json.typesVersions,
    });
    sources.add(packageJsonPath);
  }

  /**
   * Resolves a types path, preferring the `typesVersions` mapping for Monaco's bundled TypeScript
   * (`@types/react` 19 ships current types plus a `ts5.0/` tree for TS <= 5.0).
   *
   * @param {{ dir: string, packageJson: Record<string, any> }} pkg
   * @param {string} relativePath
   * @returns {string | null}
   */
  function resolveVersionedTypesFile(pkg, relativePath) {
    const normalized = relativePath.replace(/^\.\//, '');
    const mapped = applyTypesVersions(pkg.packageJson, normalized, typescriptVersion);

    return resolveTypesFile(pkg.dir, mapped) || (mapped !== normalized ? resolveTypesFile(pkg.dir, normalized) : null);
  }

  /**
   * @param {{ dir: string, name: string, packageJson: Record<string, any> }} pkg
   * @param {string} subpath
   */
  function resolveEntryFile(pkg, subpath) {
    const exportTypesPath = getExportTypesPath(pkg.packageJson, subpath);
    if (exportTypesPath) {
      const fromExports = resolveVersionedTypesFile(pkg, exportTypesPath);
      if (fromExports) {
        return fromExports;
      }
    }

    if (!subpath) {
      const entry = (pkg.packageJson.types || pkg.packageJson.typings || 'index.d.ts').replace(/^\.\//, '');
      return resolveVersionedTypesFile(pkg, entry);
    }

    const mapped = applyTypesVersions(pkg.packageJson, subpath, typescriptVersion);
    const direct = resolveVersionedTypesFile(pkg, subpath);
    if (direct) {
      return direct;
    }

    // sub path package (e.g. `@fluentui/react-components/unstable/package.json`)
    const subPackageJsonPath = path.join(pkg.dir, mapped, 'package.json');
    if (existingFile(subPackageJsonPath)) {
      const subPackageJson = readJson(subPackageJsonPath);
      const entry = subPackageJson.types || subPackageJson.typings;
      if (entry) {
        addPackageJson(pkg, subPackageJsonPath);
        return resolveTypesFile(path.join(pkg.dir, mapped), entry);
      }
    }

    return null;
  }

  /**
   * @param {string} importPath
   * @param {string} content
   */
  function createDeclarationReexport(importPath, content) {
    const ts = getTypeScript();
    const isModule = ts
      ? ts.isExternalModule(ts.createSourceFile(importPath, content, ts.ScriptTarget.Latest, false))
      : /\b(?:export|import)\s/.test(content.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ''));
    if (!isModule) {
      return `/// <reference path=${JSON.stringify(importPath)} />\n`;
    }
    const target = JSON.stringify(importPath.replace(/\.d\.([cm]?)ts$/, (_, kind) => (kind ? `.${kind}js` : '')));
    // `export *` never re-exports a default export, forward it explicitly.
    switch (getDefaultExportKind(content)) {
      case 'equals':
        return `import entry = require(${target});\nexport = entry;\n`;
      case 'default':
        return `export * from ${target};\nexport { default } from ${target};\n`;
      default:
        return `export * from ${target};\n`;
    }
  }

  /**
   * Routes public imports through separate virtual entries, without overwriting physical declarations.
   * Metadata is identical for every subpath so separately loaded module typings can share it safely.
   *
   * @param {string} specifier
   * @param {PackageInfo} pkg
   * @param {string} entryFile
   */
  function addImportAlias(specifier, pkg, entryFile) {
    const { name, subpath } = parseSpecifier(specifier);
    const entryRoot = `/playground-typings/${name}`;
    const aliasPath = `${entryRoot}/${subpath ? `subpaths/${subpath}` : 'root'}.d.ts`;
    const targetPath = toVirtualPath(pkg, entryFile).replace(/^file:\/\//, '');
    let importPath = path.posix.relative(path.posix.dirname(aliasPath), targetPath);
    if (!importPath.startsWith('.')) {
      importPath = `./${importPath}`;
    }
    files[`file://${aliasPath}`] = createDeclarationReexport(importPath, files[toVirtualPath(pkg, entryFile)]);

    const relativeRoot = path.posix.relative(`/node_modules/${name}`, entryRoot);
    const types = `${relativeRoot}/root.d.ts`;
    files[`${VIRTUAL_ROOT}/${name}/package.json`] = JSON.stringify({
      name,
      types,
      typesVersions: {
        '*': {
          [types]: [types],
          '*': [`${relativeRoot}/subpaths/*`],
        },
      },
    });
  }

  /**
   * @param {string} specifier
   * @param {string} fromDir
   */
  async function addModule(specifier, fromDir) {
    if (!PACKAGE_SPECIFIER_REGEX.test(specifier)) {
      // regex false positive (e.g. `from '…'` inside a doc comment)
      return;
    }

    const { name, subpath } = parseSpecifier(specifier);
    const pkg = await getPackage(specifier, fromDir);
    if (!pkg) {
      missing.add(specifier);
      return;
    }

    addPackageJson(pkg, path.join(pkg.dir, 'package.json'));

    const { entryFile } = pkg;
    if (entryFile) {
      await addFile(pkg, entryFile);
      addImportAlias(`${pkg.name}${pkg.subpath ? `/${pkg.subpath}` : ''}`, pkg, entryFile);
      if (
        (name !== pkg.name && getTypesPackageName(name) !== pkg.name) ||
        subpath !== pkg.subpath ||
        (name === pkg.name && entryFile !== resolveEntryFile(pkg, subpath))
      ) {
        addImportAlias(specifier, pkg, entryFile);
      }
    } else {
      missing.add(specifier);
    }
  }

  /**
   * @param {{ dir: string, name: string, packageJson: Record<string, any> }} pkg
   * @param {string} realFile
   */
  async function addFile(pkg, realFile) {
    const virtualPath = toVirtualPath(pkg, realFile);
    if (files[virtualPath] !== undefined) {
      return;
    }

    const content = fs.readFileSync(realFile, 'utf8');
    files[virtualPath] = content;
    sources.add(realFile);

    const dir = path.dirname(realFile);
    for (const specifier of getSpecifiers(content)) {
      if (specifier.kind === 'types') {
        await addModule(specifier.value, dir);
      } else if (specifier.kind === 'path' || specifier.value.startsWith('.')) {
        const target = resolveTypesFile(dir, specifier.value);

        if (target) {
          await addFile(pkg, target);
        }
        // unresolved relative specifiers are almost always regex false positives inside doc comments
      } else {
        await addModule(specifier.value, dir);
      }
    }
  }

  for (const entry of entries) {
    await addModule(entry, packageRoot);
  }

  return { files, sources: Array.from(sources), missing: Array.from(missing) };
}

/**
 * Reads the TypeScript version bundled with `monaco-editor`, which decides the `typesVersions` branch to collect.
 *
 * @param {string} [contributionPath]
 * @returns {string}
 */
function getMonacoTypeScriptVersion(
  contributionPath = require.resolve('monaco-editor/esm/vs/language/typescript/monaco.contribution.js'),
) {
  const match = fs.readFileSync(contributionPath, 'utf8').match(/typescriptVersion\s*=\s*["'](\d+\.\d+\.\d+)["']/);
  if (!match) {
    throw new Error('Unable to detect the TypeScript version bundled with monaco-editor');
  }

  return match[1];
}

module.exports = {
  collectTypings,
  getMonacoTypeScriptVersion,
  getSpecifiers,
  getSpecifiersWithRegex,
  getDefaultExportKind,
  parseSpecifier,
  applyTypesVersions,
  getExportTypesPath,
  VIRTUAL_ROOT,
};
