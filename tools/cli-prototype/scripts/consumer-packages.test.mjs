import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  applyLocalPackagePins,
  applyProducerBaseline,
  assertProducerBaseline,
  verifyInstalledTarballs,
} from './consumer-packages.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'fluentui-consumer-pins-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const tarball = join(root, 'example.tgz');
  writeFileSync(tarball, 'fixture');
  const packed = { packageName: '@fluentui/example', version: '1.0.0', tarball };
  return {
    root,
    packed,
    manifest: { packages: [packed], declarationDependencies: { typescript: '5.7.3', csstype: '3.1.3' } },
  };
}

test('uses exact local tarballs and matching transitive overrides without injecting the forum alias', t => {
  const { packed, manifest } = fixture(t);
  const packageJson = { dependencies: { react: '19.2.0' }, devDependencies: { typescript: '^5' } };
  applyLocalPackagePins(packageJson, manifest);
  assert.equal(packageJson.dependencies[packed.packageName], `file:${packed.tarball}`);
  assert.equal(packageJson.overrides[packed.packageName], `$${packed.packageName}`);
  assert.equal(packageJson.devDependencies.typescript, '5.7.3');
  assert.equal(packageJson.overrides.typescript, '$typescript');
  assert.equal(packageJson.overrides.csstype, '3.1.3');
  assert.equal(packageJson.dependencies.react, '19.2.0');
  assert.equal(packageJson.dependencies['fluent-forum-styled'], undefined);
  assert.throws(
    () =>
      applyLocalPackagePins(
        {},
        {
          ...manifest,
          packages: [{ ...packed, tarball: `${packed.tarball}.missing` }],
        },
      ),
    /Missing tarball/,
  );
});

test('pins producer runtime/compiler versions and rejects mismatching baseline changes', t => {
  const { root } = fixture(t);
  const packages = {
    react: '19.2.0',
    'react-dom': '19.2.0',
    '@types/react': '19.2.2',
    '@types/react-dom': '19.2.2',
    typescript: '5.7.3',
  };
  for (const [name, version] of Object.entries(packages)) {
    const dir = join(root, 'node_modules', name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ version }));
  }
  writeFileSync(join(root, 'package.json'), JSON.stringify({ dependencies: {}, devDependencies: {} }));
  const baseline = applyProducerBaseline(root, root);
  assert.deepEqual(baseline.packages, packages);
  const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert.doesNotThrow(() => assertProducerBaseline(packageJson, baseline));
  packageJson.devDependencies['@types/react'] = '18.0.0';
  assert.throws(() => assertProducerBaseline(packageJson, baseline), /no longer match/);
});

test('verifies the selected tarball and rejects registry, nested, wrong-identity, and symlink copies', t => {
  const { root, packed } = fixture(t);
  const key = `node_modules/${packed.packageName}`;
  const installed = join(root, key);
  mkdirSync(installed, { recursive: true });
  const identity = { name: packed.packageName, version: packed.version };
  writeFileSync(join(installed, 'package.json'), JSON.stringify(identity));
  const lock = { packages: { [key]: { resolved: `file:${packed.tarball}` } } };
  const save = () => writeFileSync(join(root, 'package-lock.json'), JSON.stringify(lock));
  save();
  assert.doesNotThrow(() => verifyInstalledTarballs(root, [packed]));
  for (const resolved of ['https://example.invalid/package.tgz', 'file:wrong.tgz']) {
    lock.packages[key].resolved = resolved;
    save();
    assert.throws(() => verifyInstalledTarballs(root, [packed]), /selected local tarball/);
  }
  lock.packages[key].resolved = 'file:example.tgz';
  save();
  assert.doesNotThrow(() => verifyInstalledTarballs(root, [packed]));
  const nested = `node_modules/other/${key}`;
  lock.packages[nested] = { resolved: `file:${packed.tarball}` };
  save();
  assert.throws(() => verifyInstalledTarballs(root, [packed]), /nested copies/);
  delete lock.packages[nested];
  save();
  writeFileSync(join(installed, 'package.json'), JSON.stringify({ ...identity, version: '2.0.0' }));
  assert.throws(() => verifyInstalledTarballs(root, [packed]), /identity mismatch/);
  rmSync(installed, { recursive: true });
  symlinkSync(root, installed, 'dir');
  assert.throws(() => verifyInstalledTarballs(root, [packed]), /not a workspace symlink/);
});

test('demo preparation refuses existing destinations before modifying files', t => {
  const { root } = fixture(t);
  const sentinel = join(root, 'keep.txt');
  writeFileSync(sentinel, 'unchanged');
  const command = join(dirname(fileURLToPath(import.meta.url)), 'demo.mjs');
  const result = spawnSync(process.execPath, [command, 'prepare'], {
    env: { ...process.env, FLUENTUI_DEMO_ROOT: root },
    encoding: 'utf8',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Refusing to overwrite/);
  assert.equal(readFileSync(sentinel, 'utf8'), 'unchanged');
});

test('demo preparation rejects a destination inside the producer workspace', () => {
  const command = join(dirname(fileURLToPath(import.meta.url)), 'demo.mjs');
  const project = resolve(dirname(command), '..');
  const result = spawnSync(process.execPath, [command, 'prepare'], {
    env: { ...process.env, FLUENTUI_DEMO_ROOT: join(project, 'must-not-create-demo') },
    encoding: 'utf8',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /outside the producer workspace/);
});
