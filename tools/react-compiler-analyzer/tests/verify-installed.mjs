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
const Ajv = requireInstalled('ajv');
const ajv = new Ajv({ strict: true, allErrors: true });
const analyzeSchema = JSON.parse(readFileSync(join(packageRoot, 'rca.analyze.schema.json'), 'utf8'));
const lintSchema = JSON.parse(readFileSync(join(packageRoot, 'rca.lint.schema.json'), 'utf8'));
ajv.addSchema(analyzeSchema);
const validators = { analyze: ajv.compile(analyzeSchema), lint: ajv.compile(lintSchema) };
const documented = [
  ...readFileSync(join(packageRoot, 'README.md'), 'utf8').matchAll(/```jsonc\n([\s\S]*?)\n```/g),
].find(match => match[1].includes('"schemaVersion": 5'));
assert.ok(documented, 'The packed README must include a current JSON report example');
assert.ok(validators.analyze(JSON.parse(documented[1])), JSON.stringify(validators.analyze.errors));
function report(args, allowed = [0]) {
  const document = JSON.parse(run([...args, '--format', 'json'], allowed));
  const validate = validators[document.command];
  assert.ok(validate && validate(document), JSON.stringify(validate?.errors));
  return document;
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
  const analyzed = report(['analyze', 'Example.tsx']);
  assert.equal(analyzed.schemaVersion, 5);
  assert.equal(analyzed.summary.compiled, 1);
  assert.equal(analyzed.emittedCaching, 'unverified');

  const source = 'export function Example() { "use no memo"; return <div />; }\n';
  writeFileSync(join(directory, 'Example.tsx'), source);
  const linted = report(['lint', 'Example.tsx'], [0, 1]);
  assert.equal(linted.schemaVersion, 5);
  assert.equal(linted.directives.length, 1);
  run(['lint', 'Example.tsx', '--fix', '--dry-run', '--format', 'json'], [0, 1]);
  assert.equal(readFileSync(join(directory, 'Example.tsx'), 'utf8'), source);
  const suppression = `/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
export function First(props) { return <div>{props.value}</div>; }
export function Second(props) { return <span>{props.value}</span>; }
`;
  writeFileSync(join(directory, 'Suppressed.tsx'), suppression);
  const partial = report(['analyze', 'Example.tsx', 'Suppressed.tsx'], [1]);
  assert.equal(partial.completeness, 'incomplete');
  assert.equal(partial.summary.unparseableFiles, 0);
  assert.ok(partial.fileDiagnostics.some(diagnostic => diagnostic.category === 'suppression'));
  const preview = report(['analyze', 'Suppressed.tsx', '--protect-suppressions', '--dry-run'], [1]);
  assert.equal(preview.suppressionProtection.filesPlanned, 1);
  assert.equal(preview.suppressionProtection.filesModified, 0);
  assert.equal(readFileSync(join(directory, 'Suppressed.tsx'), 'utf8'), suppression);
  const protectedReport = report(['analyze', 'Suppressed.tsx', '--protect-suppressions'], [1]);
  assert.equal(protectedReport.suppressionProtection.filesModified, 1);
  const guarded = readFileSync(join(directory, 'Suppressed.tsx'), 'utf8');
  assert.match(guarded, /['"]use no memo['"]/);
  report(['lint', 'Suppressed.tsx', '--fix', '--revalidate-justified'], [0, 1]);
  assert.equal(readFileSync(join(directory, 'Suppressed.tsx'), 'utf8'), guarded);
  console.log(
    'Production-only packed CLI verified: native loaders, strict v5 partial reports, protection preview/write, guard-preserving lint, and command help.',
  );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
