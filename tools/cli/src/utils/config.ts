import * as fs from 'node:fs';
import * as path from 'node:path';

export const CATALOG_CONFIG_FILE = 'fluentui.config.json';

export interface CatalogConfigCatalog {
  package?: string;
  path?: string;
}

export interface CatalogSystemConfig {
  disabled?: boolean;
  catalogs?: CatalogConfigCatalog[];
  packages?: string[];
  exclusions?: string[];
}

export interface CatalogConfig {
  $schema?: string;
  schemaVersion: 1;
  systems: Record<string, CatalogSystemConfig>;
  extensions?: string[];
  preferences?: {
    headlessStyling?: 'css-modules' | 'tailwind';
  };
}

export interface LoadedCatalogConfig {
  config: CatalogConfig;
  path: string;
  directory: string;
}

export class CatalogConfigError extends Error {
  public readonly path?: string;

  public constructor(public readonly code: string, message: string, pathValue?: string) {
    super(message);
    this.name = 'CatalogConfigError';
    this.path = pathValue;
  }
}

export function loadCatalogConfig(options: {
  cwd: string;
  workspaceRoot: string;
  config?: string;
}): LoadedCatalogConfig | undefined {
  const configPath = options.config
    ? path.resolve(options.cwd, options.config)
    : findNearestConfig(options.cwd, options.workspaceRoot);
  if (!configPath) {
    return undefined;
  }
  if (!fs.existsSync(configPath)) {
    throw new CatalogConfigError('catalog.configNotFound', `Catalog config does not exist: ${configPath}`, configPath);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    const code = error instanceof SyntaxError ? 'catalog.configInvalidJson' : 'catalog.configRead';
    throw new CatalogConfigError(code, `Unable to read catalog config: ${configPath}`, configPath);
  }

  return {
    config: validateCatalogConfig(parsed, configPath),
    path: configPath,
    directory: path.dirname(configPath),
  };
}

export function validateCatalogConfig(value: unknown, configPath = CATALOG_CONFIG_FILE): CatalogConfig {
  const root = expectObject(value, configPath, '$');
  rejectUnknownKeys(root, ['$schema', 'schemaVersion', 'systems', 'extensions', 'preferences'], configPath, '$');
  const schema = readOptionalString(root.$schema, configPath, '$.$schema');
  if (root.schemaVersion !== 1) {
    throw invalid(configPath, '$.schemaVersion', 'must equal 1', 'catalog.configVersion');
  }
  const systemsValue = expectObject(root.systems, configPath, '$.systems');
  const systems: Record<string, CatalogSystemConfig> = {};

  for (const [systemName, rawSystem] of Object.entries(systemsValue)) {
    if (!/^[a-z0-9][a-z0-9._-]*$/.test(systemName)) {
      throw invalid(configPath, `$.systems.${systemName}`, 'has an invalid system name');
    }
    const systemPath = `$.systems.${systemName}`;
    const system = expectObject(rawSystem, configPath, systemPath);
    rejectUnknownKeys(system, ['disabled', 'catalogs', 'packages', 'exclusions'], configPath, systemPath);
    const disabled = readOptionalBoolean(system.disabled, configPath, `${systemPath}.disabled`);
    const catalogs = readCatalogs(system.catalogs, configPath, `${systemPath}.catalogs`);
    const packages = readPatterns(system.packages, configPath, `${systemPath}.packages`);
    const exclusions = readPatterns(system.exclusions, configPath, `${systemPath}.exclusions`);

    if (disabled && (catalogs.length > 0 || packages.length > 0 || exclusions.length > 0)) {
      throw invalid(configPath, systemPath, 'cannot combine disabled with catalogs, packages, or exclusions');
    }
    if (!disabled && catalogs.length === 0 && packages.length === 0) {
      throw invalid(configPath, systemPath, 'must declare catalogs, packages, or disabled');
    }

    systems[systemName] = {
      ...(disabled === undefined ? {} : { disabled }),
      ...(catalogs.length === 0 ? {} : { catalogs }),
      ...(packages.length === 0 ? {} : { packages }),
      ...(exclusions.length === 0 ? {} : { exclusions }),
    };
  }

  let extensions: string[] | undefined;
  if (root.extensions !== undefined) {
    if (!Array.isArray(root.extensions) || root.extensions.length > 16) {
      throw invalid(configPath, '$.extensions', 'must be an array of at most 16 package names');
    }
    extensions = root.extensions.map((item, index) => {
      if (typeof item !== 'string' || !isPackageName(item)) {
        throw invalid(configPath, `$.extensions[${index}]`, 'must be a bare npm package name');
      }
      return item;
    });
    if (new Set(extensions).size !== extensions.length) {
      throw invalid(configPath, '$.extensions', 'contains duplicate packages', 'catalog.configConflict');
    }
  }
  let preferences: CatalogConfig['preferences'];
  if (root.preferences !== undefined) {
    const options = expectObject(root.preferences, configPath, '$.preferences');
    rejectUnknownKeys(options, ['headlessStyling'], configPath, '$.preferences');
    if (
      options.headlessStyling !== undefined &&
      options.headlessStyling !== 'css-modules' &&
      options.headlessStyling !== 'tailwind'
    ) {
      throw invalid(configPath, '$.preferences.headlessStyling', 'must be css-modules or tailwind');
    }
    preferences = options.headlessStyling === undefined ? {} : { headlessStyling: options.headlessStyling };
  }
  return {
    ...(schema === undefined ? {} : { $schema: schema }),
    schemaVersion: 1,
    systems,
    ...(extensions === undefined ? {} : { extensions }),
    ...(preferences === undefined ? {} : { preferences }),
  };
}

function findNearestConfig(cwd: string, workspaceRoot: string): string | undefined {
  const boundary = path.resolve(workspaceRoot);
  let current = path.resolve(cwd);
  if (!isWithin(boundary, current)) {
    current = boundary;
  }
  if (fs.existsSync(current) && !fs.statSync(current).isDirectory()) {
    current = path.dirname(current);
  }

  while (isWithin(boundary, current)) {
    const candidate = path.join(current, CATALOG_CONFIG_FILE);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    if (current === boundary) {
      break;
    }
    current = path.dirname(current);
  }
  return undefined;
}

function readCatalogs(value: unknown, configPath: string, valuePath: string): CatalogConfigCatalog[] {
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value)) {
    throw invalid(configPath, valuePath, 'must be an array');
  }
  const seen = new Set<string>();
  return value.map((rawCatalog, index) => {
    const catalogPath = `${valuePath}[${index}]`;
    const catalog = expectObject(rawCatalog, configPath, catalogPath);
    rejectUnknownKeys(catalog, ['package', 'path'], configPath, catalogPath);
    const packageName = readOptionalString(catalog.package, configPath, `${catalogPath}.package`);
    const localPath = readOptionalString(catalog.path, configPath, `${catalogPath}.path`);
    if ((packageName ? 1 : 0) + (localPath ? 1 : 0) !== 1) {
      throw invalid(configPath, catalogPath, 'must declare exactly one of package or path');
    }
    if (packageName && !isPackageName(packageName)) {
      throw invalid(configPath, `${catalogPath}.package`, 'must be a bare npm package name');
    }
    const key = packageName ? `package:${packageName}` : `path:${localPath}`;
    if (seen.has(key)) {
      throw new CatalogConfigError('catalog.configConflict', `Duplicate catalog ${key} at ${catalogPath}`, configPath);
    }
    seen.add(key);
    return packageName ? { package: packageName } : { path: localPath };
  });
}

function readPatterns(value: unknown, configPath: string, valuePath: string): string[] {
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value)) {
    throw invalid(configPath, valuePath, 'must be an array');
  }
  const patterns = value.map((item, index) => {
    if (typeof item !== 'string' || item.length === 0 || !isPackagePattern(item)) {
      throw invalid(configPath, `${valuePath}[${index}]`, 'must be an npm package name or package glob');
    }
    return item;
  });
  if (new Set(patterns).size !== patterns.length) {
    throw new CatalogConfigError('catalog.configConflict', `Duplicate package pattern at ${valuePath}`, configPath);
  }
  return patterns;
}

function readOptionalBoolean(value: unknown, configPath: string, valuePath: string): boolean | undefined {
  if (value === undefined || typeof value === 'boolean') {
    return value;
  }
  throw invalid(configPath, valuePath, 'must be a boolean');
}

function readOptionalString(value: unknown, configPath: string, valuePath: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== 'string' || value.length === 0) {
    throw invalid(configPath, valuePath, 'must be a non-empty string');
  }
  return value;
}

function expectObject(value: unknown, configPath: string, valuePath: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw invalid(configPath, valuePath, 'must be an object');
  }
  return value as Record<string, unknown>;
}

function rejectUnknownKeys(
  object: Record<string, unknown>,
  allowed: string[],
  configPath: string,
  valuePath: string,
): void {
  const unknown = Object.keys(object).filter(key => !allowed.includes(key));
  if (unknown.length > 0) {
    throw invalid(configPath, valuePath, `contains unsupported properties: ${unknown.join(', ')}`);
  }
}

function invalid(
  configPath: string,
  valuePath: string,
  message: string,
  code = 'catalog.configInvalid',
): CatalogConfigError {
  return new CatalogConfigError(code, `Invalid catalog config at ${valuePath}: ${message}`, configPath);
}

function isPackageName(value: string): boolean {
  return /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i.test(value);
}

function isPackagePattern(value: string): boolean {
  if (!value.includes('*')) {
    return isPackageName(value);
  }
  return /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9*][a-z0-9._*-]*$/i.test(value);
}

function isWithin(parent: string, child: string): boolean {
  const relation = path.relative(parent, child);
  return relation === '' || (!relation.startsWith('..') && !path.isAbsolute(relation));
}
