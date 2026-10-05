/**
 * Configuration loading, fixture discovery and the path conventions shared by the CLI and the
 * report.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, isAbsolute, join, sep } from 'node:path';

import Ajv, { type ErrorObject } from 'ajv';

export interface FixtureConfig {
  forbiddenPackages?: string[];
  allowedViolations?: string[];
}

export interface Config {
  fixturesRoot: string;
  externals: string[];
  forbiddenPackages: string[];
  fixtures: Record<string, FixtureConfig>;
}

/** Discovered fixtures split against the ones the configuration opted in to. */
export interface FixtureSelection {
  verified: string[];
  skipped: string[];
  orphans: string[];
}

const schemaPath = join(__dirname, '..', 'schema.json');
const FIXTURE_SUFFIX = '.fixture.js';

export function loadConfig(configPath: string, workspaceRoot: string): Config {
  const config = readJson(configPath);
  const validate = new Ajv({ allErrors: true }).compile(readJson(schemaPath));

  if (!validate(config)) {
    const errors = (validate.errors ?? [])
      .map((error: ErrorObject) => `${error.instancePath || '/'} ${error.message}`)
      .join('\n    ');

    throw new Error(
      `Invalid bundle isolation configuration at ${relativeToWorkspace(configPath, workspaceRoot)}:\n    ${errors}`,
    );
  }

  return config as Config;
}

export function findFixtures(fixturesRoot: string): string[] {
  if (!existsSync(fixturesRoot)) {
    return [];
  }

  return (
    readdirSync(fixturesRoot, { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith(FIXTURE_SUFFIX))
      // Fixture paths become config keys, so they stay POSIX rather than following the host separator.
      .map(entry =>
        join(entry.parentPath, entry.name)
          .slice(fixturesRoot.length + 1)
          .split(sep)
          .join('/'),
      )
      .sort()
  );
}

/**
 * Fixture directories are shared with monosize, so discovery alone would drag in fixtures that were
 * never meant to carry an isolation guarantee. Only what the configuration names is verified.
 */
export function selectFixtures(discovered: string[], config: Config): FixtureSelection {
  const listed = Object.keys(config.fixtures);

  return {
    verified: discovered.filter(fixture => listed.includes(fixture)),
    skipped: discovered.filter(fixture => !listed.includes(fixture)),
    orphans: listed.filter(fixture => !discovered.includes(fixture)).sort(),
  };
}

/** Overrides rather than extends, so a fixture can narrow the forbidden set and not only widen it. */
export function forbiddenFor(fixture: string, config: Config): string[] {
  return config.fixtures[fixture]?.forbiddenPackages ?? config.forbiddenPackages;
}

export function allowedFor(fixture: string, config: Config): string[] {
  return config.fixtures[fixture]?.allowedViolations ?? [];
}

export function findWorkspaceRoot(startDir: string): string {
  let dir = startDir;

  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, 'nx.json'))) {
      return dir;
    }
    dir = dirname(dir);
  }

  throw new Error(`Could not locate the workspace root above ${startDir}`);
}

export function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function relativeToWorkspace(modulePath: string, workspaceRoot: string): string {
  const absolute = isAbsolute(modulePath) ? modulePath : join(workspaceRoot, modulePath);
  return absolute.startsWith(workspaceRoot + sep) ? absolute.slice(workspaceRoot.length + 1) : modulePath;
}

export function outputRoot(packageRoot: string): string {
  return join(packageRoot, 'dist', 'bundle-isolation');
}

export function fixtureOutputPath(fixture: string, packageRoot: string): string {
  return join(outputRoot(packageRoot), fixture.slice(0, -FIXTURE_SUFFIX.length));
}
