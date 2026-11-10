import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  allowedFor,
  findFixtures,
  fixtureOutputPath,
  forbiddenFor,
  loadConfig,
  outputRoot,
  relativeToWorkspace,
  selectFixtures,
} from './config';

describe('loadConfig', () => {
  let root: string;

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
    fixtures: { 'A.fixture.js': {} },
  };

  const load = (config: object) => {
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

  it('rejects an empty fixture list, which would leave nothing to verify', () => {
    expect(() => load({ ...valid, fixtures: {} })).toThrow(/must NOT have fewer than 1 properties/);
  });

  it('rejects unknown fields, so a typo cannot be mistaken for configuration', () => {
    expect(() => load({ ...valid, knownViolations: {} })).toThrow(/must NOT have additional properties/);
  });

  it('rejects an unknown field inside a fixture entry', () => {
    expect(() => load({ ...valid, fixtures: { 'A.fixture.js': { allowed: [] } } })).toThrow(
      /must NOT have additional properties/,
    );
  });

  it('rejects a glob in allowedViolations, which would silently absorb an unrelated leak', () => {
    expect(() => load({ ...valid, fixtures: { 'A.fixture.js': { allowedViolations: ['@griffel/*'] } } })).toThrow(
      /must match pattern/,
    );
  });

  it('accepts an exact package name in allowedViolations', () => {
    const config = load({ ...valid, fixtures: { 'A.fixture.js': { allowedViolations: ['@griffel/core'] } } });

    expect(config.fixtures).toEqual({ 'A.fixture.js': { allowedViolations: ['@griffel/core'] } });
  });

  it('accepts a per-fixture forbidden list, so a fixture can narrow the package-level intent', () => {
    const config = load({ ...valid, fixtures: { 'A.fixture.js': { forbiddenPackages: ['@griffel/*'] } } });

    expect(config.fixtures['A.fixture.js'].forbiddenPackages).toEqual(['@griffel/*']);
  });

  it('reports the offending path relative to the workspace', () => {
    expect(() => load({ ...valid, externals: 'react' })).toThrow(/bundle-isolation\.config\.json/);
  });
});

describe('findFixtures', () => {
  let root: string;

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

    // Asserted as a literal rather than via join(), because these become config keys on every platform.
    expect(findFixtures(root)).toEqual(['A.fixture.js', 'B.fixture.js', 'nested/C.fixture.js']);
  });
});

describe('selectFixtures', () => {
  const config = {
    fixturesRoot: './bundle-size',
    externals: [],
    forbiddenPackages: ['tabster'],
    fixtures: { 'A.fixture.js': {}, 'nested/C.fixture.js': {}, 'Gone.fixture.js': {} },
  };

  it('verifies only what the configuration opted in to', () => {
    const selection = selectFixtures(['A.fixture.js', 'B.fixture.js', 'nested/C.fixture.js'], config);

    expect(selection.verified).toEqual(['A.fixture.js', 'nested/C.fixture.js']);
  });

  it('reports a discovered but unlisted fixture as skipped rather than dropping it silently', () => {
    const selection = selectFixtures(['A.fixture.js', 'B.fixture.js', 'nested/C.fixture.js'], config);

    expect(selection.skipped).toEqual(['B.fixture.js']);
  });

  it('reports a listed fixture that no longer exists as an orphan', () => {
    const selection = selectFixtures(['A.fixture.js', 'B.fixture.js', 'nested/C.fixture.js'], config);

    expect(selection.orphans).toEqual(['Gone.fixture.js']);
  });
});

describe('forbiddenFor', () => {
  const config = {
    fixturesRoot: './bundle-size',
    externals: [],
    forbiddenPackages: ['tabster', '@griffel/*'],
    fixtures: { 'A.fixture.js': {}, 'B.fixture.js': { forbiddenPackages: ['@griffel/*'] } },
  };

  it('falls back to the package-level list', () => {
    expect(forbiddenFor('A.fixture.js', config)).toEqual(['tabster', '@griffel/*']);
  });

  it('replaces rather than extends, so a fixture can narrow the list', () => {
    expect(forbiddenFor('B.fixture.js', config)).toEqual(['@griffel/*']);
  });

  it('treats a fixture with no allowlist as carrying no debt', () => {
    expect(allowedFor('A.fixture.js', config)).toEqual([]);
  });
});

describe('paths', () => {
  it('derives the output directory from the package root', () => {
    expect(outputRoot('/ws/packages/thing')).toBe('/ws/packages/thing/dist/bundle-isolation');
  });

  it('gives each fixture its own output directory', () => {
    expect(fixtureOutputPath('A.fixture.js', '/ws/packages/thing')).toBe('/ws/packages/thing/dist/bundle-isolation/A');
  });

  it('keeps a nested fixture under its own directory', () => {
    expect(fixtureOutputPath('nested/C.fixture.js', '/ws/packages/thing')).toBe(
      join('/ws/packages/thing/dist/bundle-isolation/nested/C'),
    );
  });

  it('shortens workspace paths for display', () => {
    expect(relativeToWorkspace('/ws/packages/thing/index.js', '/ws')).toBe('packages/thing/index.js');
  });

  it('leaves paths outside the workspace alone', () => {
    expect(relativeToWorkspace('/elsewhere/index.js', '/ws')).toBe('/elsewhere/index.js');
  });
});
