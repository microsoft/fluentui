// @ts-check
/**
 * Configuration loading, fixture discovery and the path conventions shared by the CLI and the
 * report.
 */
const { existsSync, readdirSync, readFileSync } = require('node:fs');
const { dirname, isAbsolute, join, sep } = require('node:path');

const Ajv = /** @type {typeof import('ajv').default} */ (/** @type {unknown} */ (require('ajv')));

/** @typedef {{fixturesRoot: string, externals: string[], forbiddenPackages: string[], allowedViolations: Record<string, string[]>}} Config */

const schemaPath = join(__dirname, 'schema.json');
const FIXTURE_SUFFIX = '.fixture.js';

/**
 * @param {string} configPath
 * @param {string} workspaceRoot
 * @returns {Config}
 */
function loadConfig(configPath, workspaceRoot) {
  const config = readJson(configPath);
  const schema = /** @type {object} */ (readJson(schemaPath));
  const validate = new Ajv({ allErrors: true }).compile(schema);

  if (!validate(config)) {
    const errors = (validate.errors ?? [])
      .map(/** @param {import('ajv').ErrorObject} error */ error => `${error.instancePath || '/'} ${error.message}`)
      .join('\n    ');

    throw new Error(
      `Invalid bundle isolation configuration at ${relativeToWorkspace(configPath, workspaceRoot)}:\n    ${errors}`,
    );
  }

  return /** @type {Config} */ (config);
}

/** @param {string} fixturesRoot */
function findFixtures(fixturesRoot) {
  if (!existsSync(fixturesRoot)) {
    return [];
  }

  return readdirSync(fixturesRoot, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(FIXTURE_SUFFIX))
    .map(entry => join(entry.parentPath, entry.name).slice(fixturesRoot.length + 1))
    .sort();
}

/** @param {string} startDir */
function findWorkspaceRoot(startDir) {
  let dir = startDir;

  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, 'nx.json'))) {
      return dir;
    }
    dir = dirname(dir);
  }

  throw new Error(`Could not locate the workspace root above ${startDir}`);
}

/** @param {string} filePath */
function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

/**
 * @param {string} modulePath
 * @param {string} workspaceRoot
 */
function relativeToWorkspace(modulePath, workspaceRoot) {
  const absolute = isAbsolute(modulePath) ? modulePath : join(workspaceRoot, modulePath);
  return absolute.startsWith(workspaceRoot + sep) ? absolute.slice(workspaceRoot.length + 1) : modulePath;
}

/** @param {string} packageRoot */
function outputRoot(packageRoot) {
  return join(packageRoot, 'dist', 'bundle-isolation');
}

/**
 * @param {string} fixture
 * @param {string} packageRoot
 */
function fixtureOutputPath(fixture, packageRoot) {
  return join(outputRoot(packageRoot), fixture.slice(0, -FIXTURE_SUFFIX.length));
}

module.exports = {
  findFixtures,
  findWorkspaceRoot,
  fixtureOutputPath,
  loadConfig,
  outputRoot,
  readJson,
  relativeToWorkspace,
};
