// @ts-check
const { mkdirSync, mkdtempSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const { findFixtures, loadConfig, outputRoot, fixtureOutputPath, relativeToWorkspace } = require('./config');

describe('loadConfig', () => {
  /** @type {string} */
  let root;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'bundle-isolation-config-'));
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  const valid = {
    fixturesRoot: './bundle-size',
    externals: ['react'],
    forbiddenPackages: ['tabster'],
    allowedViolations: {},
  };

  /** @param {object} config */
  const load = config => {
    const configPath = join(root, 'bundle-isolation.config.json');
    writeFileSync(configPath, JSON.stringify(config));
    return loadConfig(configPath, root);
  };

  it('returns a valid configuration', () => {
    expect(load(valid)).toEqual(valid);
  });

  it('rejects a missing required field rather than silently checking nothing', () => {
    expect(() => load({ ...valid, forbiddenPackages: undefined })).toThrow(/must have required property/);
  });

  it('rejects an empty forbidden list, which would make the check meaningless', () => {
    expect(() => load({ ...valid, forbiddenPackages: [] })).toThrow(/must NOT have fewer than 1 items/);
  });

  it('rejects unknown fields, so a typo cannot be mistaken for configuration', () => {
    expect(() => load({ ...valid, knownViolations: {} })).toThrow(/must NOT have additional properties/);
  });

  it('reports the offending path relative to the workspace', () => {
    expect(() => load({ ...valid, externals: 'react' })).toThrow(/bundle-isolation\.config\.json/);
  });
});

describe('findFixtures', () => {
  /** @type {string} */
  let root;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'bundle-isolation-fixtures-'));
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('returns an empty list when the directory does not exist', () => {
    expect(findFixtures(join(root, 'missing'))).toEqual([]);
  });

  it('finds fixtures recursively and ignores everything else', () => {
    mkdirSync(join(root, 'nested'), { recursive: true });
    writeFileSync(join(root, 'B.fixture.js'), '');
    writeFileSync(join(root, 'A.fixture.js'), '');
    writeFileSync(join(root, 'readme.md'), '');
    writeFileSync(join(root, 'nested', 'C.fixture.js'), '');

    expect(findFixtures(root)).toEqual(['A.fixture.js', 'B.fixture.js', join('nested', 'C.fixture.js')]);
  });
});

describe('paths', () => {
  it('derives the output directory from the package root', () => {
    expect(outputRoot('/ws/packages/thing')).toBe('/ws/packages/thing/dist/bundle-isolation');
  });

  it('gives each fixture its own output directory', () => {
    expect(fixtureOutputPath('A.fixture.js', '/ws/packages/thing')).toBe('/ws/packages/thing/dist/bundle-isolation/A');
  });

  it('shortens workspace paths for display', () => {
    expect(relativeToWorkspace('/ws/packages/thing/index.js', '/ws')).toBe('packages/thing/index.js');
  });

  it('leaves paths outside the workspace alone', () => {
    expect(relativeToWorkspace('/elsewhere/index.js', '/ws')).toBe('/elsewhere/index.js');
  });
});
