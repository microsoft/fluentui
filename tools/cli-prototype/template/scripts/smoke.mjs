import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import './verify.mjs';

const root = process.cwd();
const localPackageManifest = JSON.parse(readFileSync(join(root, '.fluentui-local-packages.json'), 'utf8'));
const producerBaseline = JSON.parse(readFileSync(join(root, '.fluentui-producer-baseline.json'), 'utf8'));
const requiredPackages = localPackageManifest.packages.map(packageDefinition => packageDefinition.packageName);
const catalogPackages = localPackageManifest.packages
  .filter(packageDefinition => packageDefinition.catalog)
  .map(packageDefinition => packageDefinition.packageName);
const require = createRequire(import.meta.url);

for (const [packageName, expectedVersion] of Object.entries(producerBaseline.packages)) {
  const installedPackage = JSON.parse(readFileSync(join(root, 'node_modules', packageName, 'package.json'), 'utf8'));
  assert(
    installedPackage.version === expectedVersion,
    `${packageName} ${installedPackage.version} does not match producer ${expectedVersion}`,
  );
}

const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
for (const packageName of requiredPackages) {
  const lockKey = `node_modules/${packageName}`;
  const lockEntry = lock.packages?.[lockKey];
  assert(lockEntry?.resolved?.startsWith('file:'), `${packageName} must resolve from a packed local tarball`);

  const packageRoot = join(root, lockKey);
  assert(existsSync(packageRoot), `${packageName} must be installed`);
  assert(!lstatSync(packageRoot).isSymbolicLink(), `${packageName} must not be a workspace symlink`);
}

for (const packageName of catalogPackages) {
  const specifier = `${packageName}/metadata.json`;
  const importPath = fileURLToPath(import.meta.resolve(specifier));
  const requirePath = require.resolve(specifier);
  const packageRoot = join(root, `node_modules/${packageName}`);
  const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const expectedMetadataPath = resolve(packageRoot, 'dist/metadata/index.json');
  assert(
    packageJson.exports?.['./metadata.json'] === './dist/metadata/index.json',
    `${specifier} must use the shipped string export`,
  );
  assert(packageJson.files?.includes('dist/metadata'), `${packageName} files must include dist/metadata`);
  assert(isContained(packageRoot, importPath), `${specifier} import target must remain in its package`);
  assert(isContained(packageRoot, requirePath), `${specifier} require target must remain in its package`);
  assert(importPath === expectedMetadataPath, `${specifier} import target must resolve to dist/metadata/index.json`);
  assert(requirePath === expectedMetadataPath, `${specifier} require target must resolve to dist/metadata/index.json`);
}

const builtHtml = readFileSync(join(root, 'dist/index.html'), 'utf8');
assert(/<script[^>]+src="\/assets\/[^"]+\.js"/.test(builtHtml), 'Vite output must contain a bundled script');

console.log('Playground smoke checks passed');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isContained(packageRoot, targetPath) {
  return targetPath.startsWith(`${packageRoot}/`);
}
