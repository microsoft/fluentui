import * as fs from 'node:fs';
import * as path from 'node:path';

import { CatalogConfigError, loadCatalogConfig, validateCatalogConfig } from './config';

const testRoot = path.join(process.cwd(), '.catalog-test-data', 'config');

describe('catalog config', () => {
  beforeEach(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
    fs.mkdirSync(path.join(testRoot, 'packages/app/src'), { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('validates JSON-only package and local-path catalogs', () => {
    expect(
      validateCatalogConfig({
        schemaVersion: 1,
        systems: {
          headless: { catalogs: [{ package: '@fluentui/react-headless-components-preview' }] },
          product: {
            catalogs: [{ path: './catalog' }],
            packages: ['@company/ui-*'],
            exclusions: ['@company/ui-private'],
          },
          'fluent-v9': { disabled: true },
        },
      }),
    ).toEqual({
      schemaVersion: 1,
      systems: {
        headless: { catalogs: [{ package: '@fluentui/react-headless-components-preview' }] },
        product: {
          catalogs: [{ path: './catalog' }],
          packages: ['@company/ui-*'],
          exclusions: ['@company/ui-private'],
        },
        'fluent-v9': { disabled: true },
      },
    });
  });

  it.each([
    [{ schemaVersion: 2, systems: {} }, 'catalog.configVersion'],
    [
      { schemaVersion: 1, systems: { product: { catalogs: [{ package: 'x', path: './x' }] } } },
      'catalog.configInvalid',
    ],
    [{ schemaVersion: 1, systems: { product: { disabled: true, packages: ['x'] } } }, 'catalog.configInvalid'],
    [
      { schemaVersion: 1, systems: { product: { catalogs: [{ package: 'x' }, { package: 'x' }] } } },
      'catalog.configConflict',
    ],
  ])('rejects invalid config with stable code', (config, code) => {
    expect(() => validateCatalogConfig(config)).toThrow(expect.objectContaining({ code }));
  });

  it('finds the nearest config within the workspace boundary and resolves an explicit missing path', () => {
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'workspace' }));
    const configPath = path.join(testRoot, 'packages/app/fluentui.config.json');
    fs.writeFileSync(
      configPath,
      JSON.stringify({ schemaVersion: 1, systems: { product: { packages: ['@company/ui'] } } }),
    );

    expect(loadCatalogConfig({ cwd: path.join(testRoot, 'packages/app/src'), workspaceRoot: testRoot })?.path).toBe(
      configPath,
    );
    expect(() => loadCatalogConfig({ cwd: testRoot, workspaceRoot: testRoot, config: './missing.json' })).toThrow(
      CatalogConfigError,
    );
  });
});
