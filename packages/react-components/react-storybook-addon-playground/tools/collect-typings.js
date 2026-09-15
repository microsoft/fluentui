// @ts-check

const fs = require('fs');
const path = require('path');
const semver = require('semver');

/**
 * @typedef {{ kind: 'module' | 'path' | 'types', value: string }} Specifier
 * @typedef {{ files: Record<string, string>, sources: string[], missing: string[] }} CollectResult
 */

const VIRTUAL_ROOT = 'file:///node_modules';

// `import x from '…'`, `export … from '…'`, `import('…')`, `import x = require('…')`, `/// <reference path|types="…" />`
const SPECIFIER_REGEX =
  /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)["']([^"'\n]+)["']|\/\/\/\s*<reference\s+(path|types)\s*=\s*["']([^"'\n]+)["']/g;

// bare package specifier, optionally scoped and with a sub path
const PACKAGE_SPECIFIER_REGEX = /^(@[\w.-]+\/)?[\w.-]+(\/[\w.-]+)*$/;

/**
 * Extracts module specifiers and triple-slash references from a `.d.ts` file.
 *
 * @param {string} content
 * @returns {Specifier[]}
 */
function getSpecifiers(content) {
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
 * @returns {string | null}
 */
function getTypesFromExportEntry(entry) {
  if (typeof entry === 'string') {
    return entry;
  }

  if (Array.isArray(entry)) {
    for (const candidate of entry) {
      const resolved = getTypesFromExportEntry(candidate);
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
  for (const condition of ['types', 'import', 'require', 'default']) {
    const resolved = getTypesFromExportEntry(conditions[condition]);
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
  const typesPath = getTypesFromExportEntry(exportsField[key]);
  return typesPath ? typesPath.replace(/^\.\//, '') : null;
}

/**
 * Turns an exports target (often a `.js` file) into an existing `.d.ts` / `.d.cts` file.
 *
 * @param {string} packageDir
 * @param {string} typesPath
 * @returns {string | null}
 */
function resolveTypesFile(packageDir, typesPath) {
  const absolute = path.join(packageDir, typesPath);
  const withoutExt = typesPath.replace(/\.(d\.)?[cm]?[jt]sx?$/, '');

  return (
    existingFile(absolute) ||
    existingFile(path.join(packageDir, `${withoutExt}.d.ts`)) ||
    existingFile(path.join(packageDir, `${withoutExt}.d.cts`)) ||
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
      return targets[0].replace('*', matched);
    }
  }

  return relativePath;
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
 * Collects the transitive closure of type declaration files needed to type-check code importing `entries`.
 *
 * Every file gets a virtual path `file:///node_modules/<package>/<relative path>` so that TypeScript's node module
 * resolution works when the files are registered as Monaco extra libs.
 *
 * @param {{ packageRoot: string, entries: string[], typescriptVersion: string }} options
 * @returns {CollectResult}
 */
function collectTypings(options) {
  const { entries, typescriptVersion } = options;
  const packageRoot = path.resolve(options.packageRoot);

  /** @type {Record<string, string>} */
  const files = {};
  /** @type {Set<string>} */
  const sources = new Set();
  /** @type {Set<string>} */
  const missing = new Set();
  /** @type {Map<string, { dir: string, name: string, packageJson: Record<string, any> } | null>} */
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
   * Resolves the package providing types for `name`: the package itself when it ships types, `@types/*` otherwise.
   *
   * @param {string} name
   * @param {string} fromDir
   */
  function getPackage(name, fromDir) {
    const cached = packages.get(name);
    if (cached !== undefined) {
      return cached;
    }

    /** @param {string} dir */
    const load = dir => {
      const packageJson = readJson(path.join(dir, 'package.json'));
      return { dir, name: packageJson.name, packageJson };
    };

    const ownDir = findPackageDir(name, fromDir);
    const own = ownDir ? load(ownDir) : null;
    const hasOwnTypes =
      own && (own.packageJson.types || own.packageJson.typings || existingFile(path.join(own.dir, 'index.d.ts')));

    let result = hasOwnTypes ? own : null;
    if (!result && !name.startsWith('@types/')) {
      const typesDir = findPackageDir(getTypesPackageName(name), fromDir);
      result = typesDir ? load(typesDir) : null;
    }

    packages.set(name, result);
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
        return existingFile(path.join(pkg.dir, mapped, entry));
      }
    }

    return null;
  }

  /**
   * Monaco's TypeScript uses classic node resolution (`pkg/button` -> `pkg/button.d.ts`).
   * When types actually live at an `exports` path like `dist/button.d.ts`, add a shim at the classic location.
   *
   * @param {{ dir: string, name: string }} pkg
   * @param {string} subpath
   * @param {string} entryFile
   */
  function addSubpathShim(pkg, subpath, entryFile) {
    const relativeEntry = path.relative(pkg.dir, entryFile).split(path.sep).join('/');
    const shimRelativePath = `${subpath}.d.ts`;
    if (relativeEntry === shimRelativePath || relativeEntry === `${subpath}/index.d.ts`) {
      return;
    }

    const virtualPath = `${VIRTUAL_ROOT}/${pkg.name}/${shimRelativePath}`;
    if (files[virtualPath]) {
      return;
    }

    const importPath = relativeEntry.replace(/\.d\.cts$/, '').replace(/\.d\.ts$/, '');
    const fromDir = path.posix.dirname(shimRelativePath);
    let relImport = path.posix.relative(fromDir, importPath);
    if (!relImport.startsWith('.')) {
      relImport = `./${relImport}`;
    }

    files[virtualPath] = `export * from ${JSON.stringify(relImport)};\n`;
  }

  /**
   * @param {string} specifier
   * @param {string} fromDir
   */
  function addModule(specifier, fromDir) {
    if (!PACKAGE_SPECIFIER_REGEX.test(specifier)) {
      // regex false positive (e.g. `from '…'` inside a doc comment)
      return;
    }

    const { name, subpath } = parseSpecifier(specifier);
    const pkg = getPackage(name, fromDir);
    if (!pkg) {
      missing.add(specifier);
      return;
    }

    addPackageJson(pkg, path.join(pkg.dir, 'package.json'));

    const entryFile = resolveEntryFile(pkg, subpath);
    if (entryFile) {
      addFile(pkg, entryFile);
      if (subpath) {
        addSubpathShim(pkg, subpath, entryFile);
      }
    } else {
      missing.add(specifier);
    }
  }

  /**
   * @param {{ dir: string, name: string, packageJson: Record<string, any> }} pkg
   * @param {string} realFile
   */
  function addFile(pkg, realFile) {
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
        addModule(specifier.value, dir);
      } else if (specifier.kind === 'path' || specifier.value.startsWith('.')) {
        const target =
          existingFile(path.join(dir, specifier.value)) ||
          existingFile(path.join(dir, `${specifier.value}.d.ts`)) ||
          existingFile(path.join(dir, specifier.value.replace(/\.js$/, '.d.ts'))) ||
          existingFile(path.join(dir, specifier.value, 'index.d.ts'));

        if (target) {
          addFile(pkg, target);
        }
        // unresolved relative specifiers are almost always regex false positives inside doc comments
      } else {
        addModule(specifier.value, dir);
      }
    }
  }

  entries.forEach(entry => addModule(entry, packageRoot));

  return { files, sources: Array.from(sources), missing: Array.from(missing) };
}

module.exports = {
  collectTypings,
  getSpecifiers,
  parseSpecifier,
  applyTypesVersions,
  getExportTypesPath,
  VIRTUAL_ROOT,
};
