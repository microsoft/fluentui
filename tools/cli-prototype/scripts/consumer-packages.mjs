import { existsSync, lstatSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const producerBaselineName = '.fluentui-producer-baseline.json';

export function applyLocalPackagePins(packageJson, manifest) {
  packageJson.dependencies ??= {};
  packageJson.overrides ??= {};
  for (const packedPackage of manifest.packages) {
    if (!existsSync(packedPackage.tarball)) {
      throw new Error(`Missing tarball for ${packedPackage.packageName}: ${packedPackage.tarball}`);
    }
    packageJson.dependencies[packedPackage.packageName] = `file:${packedPackage.tarball}`;
    packageJson.overrides[packedPackage.packageName] = `$${packedPackage.packageName}`;
  }
  for (const [packageName, version] of Object.entries(manifest.declarationDependencies)) {
    const section = Object.hasOwn(packageJson.dependencies, packageName)
      ? packageJson.dependencies
      : Object.hasOwn(packageJson.devDependencies ?? {}, packageName)
      ? packageJson.devDependencies
      : undefined;
    if (section) {
      section[packageName] = version;
    }
    packageJson.overrides[packageName] = section ? `$${packageName}` : version;
  }
}

export function applyProducerBaseline(consumerRoot, workspaceRoot) {
  const packageJsonPath = join(consumerRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const baseline = {
    schemaVersion: 1,
    source: 'producer-node-modules',
    packages: Object.fromEntries(
      ['react', 'react-dom', '@types/react', '@types/react-dom', 'typescript'].map(name => {
        const manifest = JSON.parse(readFileSync(join(workspaceRoot, 'node_modules', name, 'package.json'), 'utf8'));
        if (typeof manifest.version !== 'string') {
          throw new Error(`Producer package ${name} does not declare a version`);
        }
        return [name, manifest.version];
      }),
    ),
  };
  for (const name of ['react', 'react-dom']) {
    packageJson.dependencies[name] = baseline.packages[name];
  }
  for (const name of ['@types/react', '@types/react-dom', 'typescript']) {
    packageJson.devDependencies[name] = baseline.packages[name];
  }
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  writeFileSync(join(consumerRoot, producerBaselineName), `${JSON.stringify(baseline, null, 2)}\n`);
  return baseline;
}

export function assertProducerBaseline(packageJson, baseline) {
  const expected = baseline?.packages;
  if (
    baseline?.schemaVersion !== 1 ||
    baseline.source !== 'producer-node-modules' ||
    !expected ||
    packageJson.dependencies?.react !== expected.react ||
    packageJson.dependencies?.['react-dom'] !== expected['react-dom'] ||
    packageJson.devDependencies?.['@types/react'] !== expected['@types/react'] ||
    packageJson.devDependencies?.['@types/react-dom'] !== expected['@types/react-dom'] ||
    packageJson.devDependencies?.typescript !== expected.typescript
  ) {
    throw new Error('Generated consumer dependencies no longer match the recorded producer baseline');
  }
}

export function verifyInstalledTarballs(consumerRoot, packages) {
  const lock = JSON.parse(readFileSync(join(consumerRoot, 'package-lock.json'), 'utf8'));
  for (const packedPackage of packages) {
    const lockKey = `node_modules/${packedPackage.packageName}`;
    const lockEntry = lock.packages?.[lockKey];
    if (
      !lockEntry?.resolved?.startsWith('file:') ||
      resolve(consumerRoot, lockEntry.resolved.slice(5)) !== resolve(packedPackage.tarball)
    ) {
      throw new Error(`${packedPackage.packageName} did not resolve from the selected local tarball`);
    }
    const installedRoot = join(consumerRoot, lockKey);
    if (!existsSync(installedRoot) || lstatSync(installedRoot).isSymbolicLink()) {
      throw new Error(`${packedPackage.packageName} must be an extracted package, not a workspace symlink`);
    }
    const installed = JSON.parse(readFileSync(join(installedRoot, 'package.json'), 'utf8'));
    if (installed.name !== packedPackage.packageName || installed.version !== packedPackage.version) {
      throw new Error(`Installed identity mismatch for ${packedPackage.packageName}`);
    }
    const duplicates = Object.keys(lock.packages).filter(
      key => key !== lockKey && key.endsWith(`/node_modules/${packedPackage.packageName}`),
    );
    if (duplicates.length) {
      throw new Error(`${packedPackage.packageName} also resolved from nested copies: ${duplicates.join(', ')}`);
    }
  }
}
