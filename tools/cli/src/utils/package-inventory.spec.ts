import * as fs from 'node:fs';
import * as path from 'node:path';

import {
  getWorkspacePackageInventory,
  matchesPackagePattern,
  parsePackageSpecifier,
  resolveInstalledPackage,
} from './package-inventory';

const testRoot = path.join(process.cwd(), '.catalog-test-data', 'package-inventory');

describe('package inventory', () => {
  beforeEach(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
    fs.mkdirSync(testRoot, { recursive: true });
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({ name: 'app', dependencies: { '@scope/suite': '1.0.0' } }),
    );
  });

  afterAll(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('parses npm package names separately from public subpaths', () => {
    expect(parsePackageSpecifier('@fluentui/react-components/unstable')).toEqual({
      packageName: '@fluentui/react-components',
      entrypoint: './unstable',
    });
    expect(parsePackageSpecifier('tabster/core')).toEqual({ packageName: 'tabster', entrypoint: './core' });
    expect(parsePackageSpecifier('./local')).toBeUndefined();
    expect(matchesPackagePattern('@company/ui-button', '@company/ui-*')).toBe(true);
  });

  it('preserves requested aliases and resolves the installed physical package', () => {
    writePackage(path.join(testRoot, 'node_modules/@scope/suite'), {
      name: '@scope/actual-suite',
      version: '1.0.0',
      fluentuiCatalog: './metadata.json',
    });

    const installed = resolveInstalledPackage('@scope/suite', testRoot);
    expect(installed).toMatchObject({
      requestedPackage: '@scope/suite',
      packageName: '@scope/actual-suite',
      hasCatalogMarker: true,
    });
  });

  it('discovers only declared packages plus installed catalog peers', () => {
    writePackage(path.join(testRoot, 'node_modules/@scope/suite'), {
      name: '@scope/suite',
      version: '1.0.0',
      peerDependencies: { '@scope/peer': '*' },
    });
    writePackage(path.join(testRoot, 'node_modules/@scope/peer'), {
      name: '@scope/peer',
      version: '2.0.0',
      fluentuiCatalog: './metadata.json',
    });
    writePackage(path.join(testRoot, 'node_modules/@scope/transitive'), {
      name: '@scope/transitive',
      version: '3.0.0',
      fluentuiCatalog: './metadata.json',
    });

    const inventory = getWorkspacePackageInventory(testRoot);
    expect(inventory.packages.map(pkg => pkg.requestedPackage)).toEqual(['@scope/peer', '@scope/suite']);
  });

  it('resolves the package instance installed for a nested selected workspace', () => {
    fs.writeFileSync(path.join(testRoot, 'yarn.lock'), '');
    writePackage(path.join(testRoot, 'node_modules/@scope/suite'), {
      name: '@scope/suite',
      version: '1.0.0',
    });
    const appRoot = path.join(testRoot, 'packages/app');
    fs.mkdirSync(appRoot, { recursive: true });
    fs.writeFileSync(
      path.join(appRoot, 'package.json'),
      JSON.stringify({ name: 'nested-app', dependencies: { '@scope/suite': '2.0.0' } }),
    );
    writePackage(path.join(appRoot, 'node_modules/@scope/suite'), {
      name: '@scope/suite',
      version: '2.0.0',
      fluentuiCatalog: './metadata.json',
    });

    const inventory = getWorkspacePackageInventory(appRoot);
    expect(inventory.selectedPackageRoot).toBe(appRoot);
    expect(inventory.packages[0]).toMatchObject({
      requestedPackage: '@scope/suite',
      version: '2.0.0',
      importer: appRoot,
    });
    expect(inventory.packages[0].packageRoot).toContain('/packages/app/node_modules/');
  });
});

function writePackage(root: string, manifest: Record<string, unknown>): void {
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(manifest));
  fs.writeFileSync(path.join(root, 'index.js'), '');
}
