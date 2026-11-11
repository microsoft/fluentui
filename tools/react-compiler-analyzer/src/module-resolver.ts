import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, resolve, sep } from 'node:path';
import { parseSync } from 'oxc-parser';
import { ResolverFactory, type NapiResolveOptions } from 'oxc-resolver';

export interface ResolverDiagnostic {
  kind: 'resolved' | 'boundary' | 'unsupported-target' | 'unresolved' | 'tsconfig-fallback' | 'error';
  specifier: string;
  fromFile: string;
  message: string;
  target?: string;
  tsconfig?: string;
}

export interface ResolverOptions {
  additionalConditionNames?: string[];
  /** Ordered replacement, not additions to the default `module`, `main` fields. */
  mainFields?: string[];
  stats?: ResolverStats;
  onDiagnostic?: (diagnostic: ResolverDiagnostic) => void;
}

export interface ResolverStats {
  resolved: number;
  /** Compatibility counters; use `unresolved` and `packageBoundaries` in new reports. */
  unresolvedRelative: number;
  unresolvedBare: number;
  /** Retained temporarily for callers migrating off the removed pathAliases reporting. */
  aliasHits: Map<string, number>;
  tsconfigsUsed: Set<string>;
  packageBoundaries: number;
  unsupportedTargets: number;
  unresolved: Map<string, number>;
  diagnostics: ResolverDiagnostic[];
  conditionNames: string[];
  mainFields: string[];
}

export function createResolverStats(): ResolverStats {
  return {
    resolved: 0,
    unresolvedRelative: 0,
    unresolvedBare: 0,
    aliasHits: new Map(),
    tsconfigsUsed: new Set(),
    packageBoundaries: 0,
    unsupportedTargets: 0,
    unresolved: new Map(),
    diagnostics: [],
    conditionNames: ['import', 'node', 'default'],
    mainFields: ['module', 'main'],
  };
}

const EXECUTABLE_EXTENSIONS = ['.ts', '.tsx', '.mts', '.js', '.mjs'];
const inNodeModules = (file: string) => file.split(sep).includes('node_modules');

/** Per-importer tsconfig resolution; never constructs a TypeScript Program or redirects dist to source. */
export function createModuleResolver(options: ResolverOptions = {}) {
  const conditionNames = [...new Set(['import', 'node', 'default', ...(options.additionalConditionNames ?? [])])];
  const mainFields = options.mainFields ?? ['module', 'main'];
  const settings: NapiResolveOptions = {
    extensions: EXECUTABLE_EXTENSIONS,
    extensionAlias: { '.js': ['.ts', '.tsx', '.js'], '.mjs': ['.mts', '.mjs'] },
    conditionNames,
    mainFields,
    symlinks: true,
    moduleType: true,
    builtinModules: true,
    nodePath: false,
  };
  const resolver = new ResolverFactory({ ...settings, tsconfig: 'auto' });
  // Omitting tsconfig disables it; the pinned JS API does not accept `false`.
  const fallback = resolver.cloneWithOptions(settings);
  const fallbackConfigs = new Set<string>();
  const nearestConfigs = new Map<string, string | undefined>();
  const stats = options.stats;
  if (stats) {
    stats.conditionNames = conditionNames;
    stats.mainFields = [...mainFields];
  }

  function report(diagnostic: ResolverDiagnostic) {
    stats?.diagnostics.push(diagnostic);
    options.onDiagnostic?.(diagnostic);
  }

  function nearestConfig(fromFile: string) {
    const directory = dirname(fromFile);
    if (!nearestConfigs.has(directory)) {
      nearestConfigs.set(directory, findUp(directory, 'tsconfig.json'));
    }
    return nearestConfigs.get(directory);
  }

  return function resolveModule(specifier: string, fromFile: string): string | null {
    const tsconfig = nearestConfig(fromFile);
    if (tsconfig) {
      stats?.tsconfigsUsed.add(tsconfig);
    }
    const detail = { specifier, fromFile, ...(tsconfig ? { tsconfig } : {}) };
    try {
      let result = (tsconfig && fallbackConfigs.has(tsconfig) ? fallback : resolver).resolveFileSync(
        fromFile,
        specifier,
      );
      if (tsconfig && result.error && isMissingReference(result.error, tsconfig)) {
        if (!fallbackConfigs.has(tsconfig)) {
          fallbackConfigs.add(tsconfig);
          report({
            ...detail,
            kind: 'tsconfig-fallback',
            message: `${result.error}; retrying this project's imports without tsconfig (paths aliases are unavailable)`,
          });
        }
        result = fallback.resolveFileSync(fromFile, specifier);
      }

      const packageJson = result.packageJsonPath ?? findPackageJson(specifier, fromFile);
      const packageRoot = packageJson ? realpathSync(dirname(packageJson)) : undefined;
      if (result.builtin || (packageRoot && inNodeModules(packageRoot))) {
        if (stats) {
          stats.packageBoundaries++;
          stats.unresolvedBare++;
        }
        report({
          ...detail,
          kind: 'boundary',
          target: result.path,
          message: 'External package or Node builtin boundary',
        });
        return null;
      }

      const unsupportedField =
        packageJson &&
        invalidMainField(packageJson, mainFields, value =>
          Boolean(fallback.resolveFileSync(packageJson, resolve(dirname(packageJson), value)).path),
        );
      if (unsupportedField) {
        if (stats) {
          stats.unsupportedTargets++;
        }
        report({ ...detail, kind: 'unsupported-target', message: unsupportedField });
        return null;
      }
      if (!result.path) {
        if (stats) {
          specifier.startsWith('.') || isAbsolute(specifier) ? stats.unresolvedRelative++ : stats.unresolvedBare++;
          stats.unresolved.set(specifier, (stats.unresolved.get(specifier) ?? 0) + 1);
        }
        report({ ...detail, kind: 'unresolved', message: result.error ?? 'Resolver returned no executable target' });
        return null;
      }

      const target = realpathSync(result.path);
      if (inNodeModules(target)) {
        if (stats) {
          stats.packageBoundaries++;
        }
        report({ ...detail, target, kind: 'boundary', message: 'Resolved realpath is inside node_modules' });
        return null;
      }
      if (
        /\.d\.(?:ts|mts|cts)$/.test(target) ||
        !EXECUTABLE_EXTENSIONS.includes(extname(target)) ||
        (extname(target) === '.js' && result.moduleType !== 'module' && !hasEsmSyntax(target))
      ) {
        if (stats) {
          stats.unsupportedTargets++;
        }
        report({
          ...detail,
          target,
          kind: 'unsupported-target',
          message:
            'Only executable first-party TypeScript and ESM JavaScript are followed (no declarations or CommonJS)',
        });
        return null;
      }
      if (stats) {
        stats.resolved++;
      }
      report({
        ...detail,
        target,
        kind: 'resolved',
        message: `Resolved with conditions [${conditionNames.join(', ')}] and mainFields [${mainFields.join(', ')}]`,
      });
      return target;
    } catch (error) {
      if (stats) {
        stats.unresolved.set(specifier, (stats.unresolved.get(specifier) ?? 0) + 1);
      }
      report({ ...detail, kind: 'error', message: error instanceof Error ? error.message : String(error) });
      return null;
    }
  };
}

export type ModuleResolver = ReturnType<typeof createModuleResolver>;

function findUp(start: string, name: string): string | undefined {
  for (let directory = start; ; directory = dirname(directory)) {
    const candidate = join(directory, name);
    if (existsSync(candidate)) {
      return candidate;
    }
    if (dirname(directory) === directory) {
      return undefined;
    }
  }
}

function findPackageJson(specifier: string, fromFile: string): string | undefined {
  if (specifier.startsWith('.') || specifier.startsWith('#') || isAbsolute(specifier)) {
    return undefined;
  }
  const name = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
  return findUp(dirname(fromFile), join('node_modules', name, 'package.json'));
}

function invalidMainField(
  packageJson: string,
  fields: string[],
  resolves: (value: string) => boolean,
): string | undefined {
  const json = JSON.parse(readFileSync(packageJson, 'utf8'));
  if (json.exports !== undefined) {
    return undefined;
  }
  for (const field of fields) {
    if (json[field] !== undefined) {
      if (typeof json[field] !== 'string') {
        return `Unsupported non-string package entry field "${field}" in ${packageJson}`;
      }
      if (resolves(json[field])) {
        return undefined;
      }
    }
  }
  return undefined;
}

function hasEsmSyntax(file: string): boolean {
  const parsed = parseSync(file, readFileSync(file, 'utf8'));
  return (
    !parsed.errors.length &&
    parsed.program.body.some(node => node.type.startsWith('Export') || node.type === 'ImportDeclaration')
  );
}

/** Parse JSONC as a parenthesized expression, without evaluating it or depending on TypeScript. */
function isMissingReference(error: string, tsconfig: string): boolean {
  const match = /^Tsconfig not found (.+)$/.exec(error);
  if (!match) {
    return false;
  }
  return containsReference(tsconfig, match[1], new Set());
}

function containsReference(tsconfig: string, missing: string, visited: Set<string>): boolean {
  if (visited.has(tsconfig)) {
    return false;
  }
  visited.add(tsconfig);
  const parsed = parseSync('tsconfig.js', `(${readFileSync(tsconfig, 'utf8')})`, { preserveParens: false });
  const statement = parsed.program.body[0];
  if (
    parsed.errors.length ||
    statement?.type !== 'ExpressionStatement' ||
    statement.expression.type !== 'ObjectExpression'
  ) {
    return false;
  }
  const references = statement.expression.properties.find(
    property => property.type === 'Property' && property.key.type === 'Literal' && property.key.value === 'references',
  );
  if (references?.type !== 'Property' || references.value.type !== 'ArrayExpression') {
    return false;
  }
  return references.value.elements.some(element => {
    if (element?.type !== 'ObjectExpression') {
      return false;
    }
    return element.properties.some(property => {
      if (
        property.type !== 'Property' ||
        property.key.type !== 'Literal' ||
        property.key.value !== 'path' ||
        property.value.type !== 'Literal' ||
        typeof property.value.value !== 'string'
      ) {
        return false;
      }
      const reference = resolve(dirname(tsconfig), property.value.value);
      if (missing === reference || missing === join(reference, 'tsconfig.json')) {
        return true;
      }
      const nested = reference.endsWith('.json') ? reference : join(reference, 'tsconfig.json');
      return existsSync(nested) && containsReference(nested, missing, visited);
    });
  });
}
