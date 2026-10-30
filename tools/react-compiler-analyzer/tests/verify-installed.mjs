import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: { 'package-root': { type: 'string' } } });
if (!values['package-root']) {
  throw new Error('--package-root must identify a clean production-only installation');
}
const packageRoot = resolve(values['package-root']);
const manifestPath = join(packageRoot, 'package.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.name, '@fluentui/react-compiler-analyzer');
const requireInstalled = createRequire(manifestPath);
for (const name of ['@babel/core', '@babel/types', 'babel-plugin-react-compiler', '@swc/core']) {
  assert.throws(() => requireInstalled.resolve(name), { code: 'MODULE_NOT_FOUND' });
}
for (const name of ['oxc-parser', 'oxc-transform-react', 'oxc-resolver']) {
  assert.ok(requireInstalled(name), `Native runtime dependency ${name} must load`);
}

const directory = mkdtempSync(join(tmpdir(), 'rca-installed-'));
const binary = join(packageRoot, manifest.bin);
function run(args, allowed = [0]) {
  const child = spawnSync(process.execPath, [binary, ...args], { cwd: directory, encoding: 'utf8' });
  if (child.error) {
    throw child.error;
  }
  assert.ok(allowed.includes(child.status), `${args.join(' ')} exited ${child.status}: ${child.stderr}`);
  return child.stdout;
}
try {
  for (const command of ['analyze', 'lint', 'init']) {
    assert.match(run([command, '--help']), /Options:/);
  }
  writeFileSync(join(directory, 'package.json'), '{"name":"installed-consumer","private":true}');
  writeFileSync(join(directory, '.rca.config.json'), '{}');
  writeFileSync(
    join(directory, 'Example.tsx'),
    'export function Example(props) { return <div>{props.value}</div>; }\n',
  );
  const analyzed = JSON.parse(run(['analyze', 'Example.tsx', '--format', 'json']));
  assert.equal(analyzed.schemaVersion, 4);
  assert.equal(analyzed.summary.compiled, 1);
  assert.equal(analyzed.emittedCaching, 'unverified');

  const source = 'export function Example() { "use no memo"; return <div />; }\n';
  writeFileSync(join(directory, 'Example.tsx'), source);
  const linted = JSON.parse(run(['lint', 'Example.tsx', '--format', 'json'], [0, 1]));
  assert.equal(linted.schemaVersion, 4);
  assert.equal(linted.directives.length, 1);
  run(['lint', 'Example.tsx', '--fix', '--dry-run', '--format', 'json'], [0, 1]);
  assert.equal(readFileSync(join(directory, 'Example.tsx'), 'utf8'), source);
  console.log('Production-only packed CLI verified: native loaders, analyze, lint/fix preview, and all command help.');
} finally {
  rmSync(directory, { recursive: true, force: true });
}
