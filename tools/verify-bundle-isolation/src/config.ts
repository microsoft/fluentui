/**
 * Configuration loading, fixture discovery and the path conventions shared by the CLI and the
 * report.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, isAbsolute, join, sep } from 'node:path';

import Ajv, { type ErrorObject } from 'ajv';

export interface Config {
  fixturesRoot: string;
  externals: string[];
  forbiddenPackages: string[];
  allowedViolations: Record<string, string[]>;
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

  return readdirSync(fixturesRoot, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(FIXTURE_SUFFIX))
    .map(entry => join(entry.parentPath, entry.name).slice(fixturesRoot.length + 1))
    .sort();
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
