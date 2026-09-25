import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

if (!process.env.FLUENTUI_PLAYGROUND_ROOT) {
  throw new Error('FLUENTUI_PLAYGROUND_ROOT is required');
}
const root = resolve(process.env.FLUENTUI_PLAYGROUND_ROOT);
const output = join(root, 'artifacts/extension-acceptance');
mkdirSync(output, { recursive: true });
const fixture = mkdtempSync(join(output, 'fixture-'));
const source = join(fixture, 'package');
const consumer = join(fixture, 'consumer');
const tarballs = join(fixture, 'tarballs');
for (const directory of [source, consumer, tarballs]) {
  mkdirSync(directory, { recursive: true });
}
const cli = join(root, 'node_modules/@fluentui/cli/bin/fluentui-cli.js');
const packageName = '@fixture/private-ui';
const records = [];
const packageJson = {
  name: packageName,
  version: '1.0.0',
  fluentuiCatalog: './metadata.json',
  fluentuiExtension: './fluentui-extension.json',
  files: ['index.js', 'index.d.ts', 'dist/metadata', 'fluentui-extension.json', 'guidance'],
  exports: {
    '.': { types: './index.d.ts', default: './index.js' },
    './metadata.json': './dist/metadata/index.json',
    './fluentui-extension.json': './fluentui-extension.json',
  },
};
writeFileSync(join(source, 'index.js'), 'throw new Error("Init and API lookup must not execute package code");\n');
writeFileSync(join(source, 'index.d.ts'), 'export declare function AcmeButton(props: { label: string }): null;\n');
mkdirSync(join(source, 'guidance/references'), { recursive: true });
writeFileSync(join(source, 'guidance/SKILL.md'), '# Private UI\n\n[Buttons](references/buttons.md)\n');
writeFileSync(join(source, 'guidance/references/buttons.md'), '# AcmeButton\n\nRequire an accessible label.\n');
writeJson(join(source, 'fluentui-extension.json'), {
  schemaVersion: 1,
  system: 'acme',
  skill: './guidance/SKILL.md',
  references: ['./guidance/references/buttons.md'],
});
const config = {
  schemaVersion: 1,
  systems: {
    'fluent-v9': { disabled: true },
    headless: { disabled: true },
    acme: { catalogs: [{ package: packageName }] },
  },
};
const configPath = join(consumer, 'fluentui.config.json');
writeJson(configPath, config);
installVersion('1.0.0');
const unapproved = command('unapproved-init', ['init', '--cwd', consumer, '--json']);
const guide = join(consumer, '.agents/skills/fluentui/extensions', packageName, 'guidance/SKILL.md');
if (unapproved.data.extensions.length || existsSync(guide)) {
  throw new Error('Catalogue registration unexpectedly approved package guidance');
}
const available = command('available-guidance', ['doctor', '--cwd', consumer, '--metadata-mode', 'required', '--json']);
if (
  available.data.setup.extensions.approved.length ||
  available.data.setup.extensions.available[0]?.package !== packageName
) {
  throw new Error('Doctor failed to distinguish available guidance from approved guidance');
}
writeJson(configPath, { ...config, extensions: [packageName], preferences: { headlessStyling: 'css-modules' } });
const before = readFileSync(configPath, 'utf8');
const ownershipPath = join(consumer, '.agents/skills/fluentui/.fluentui-cli.json');
const beforeDryRun = readFileSync(ownershipPath, 'utf8');
const dryRun = command('approved-dry-run', ['init', '--cwd', consumer, '--dry-run', '--json']);
if (dryRun.data.applied || existsSync(guide) || readFileSync(ownershipPath, 'utf8') !== beforeDryRun) {
  throw new Error('Extension dry-run modified managed guidance');
}
const receipt = command('approved-init', ['init', '--cwd', consumer, '--json']);
if (receipt.data.extensions[0]?.package !== packageName || readFileSync(configPath, 'utf8') !== before) {
  throw new Error('Approved extension receipt or configuration preservation failed');
}
if (!readFileSync(guide, 'utf8').includes('[Buttons](references/buttons.md)')) {
  throw new Error('Packed guide reference structure was not preserved');
}
const api = command('private-api', [
  'api',
  'AcmeButton',
  '--cwd',
  consumer,
  '--system',
  'acme',
  '--metadata-mode',
  'required',
  '--json',
]);
if (api.data.result.recommendedImport?.moduleSpecifier !== packageName) {
  throw new Error('Custom catalogue did not produce its own verified public import');
}
assertDoctor('current');
writeFileSync(join(source, 'guidance/SKILL.md'), '# Private UI version two\n');
installVersion('2.0.0');
assertDoctor('outdated');
const upgraded = command('upgrade', ['init', '--cwd', consumer, '--json']);
if (upgraded.data.extensions[0]?.version !== '2.0.0' || readFileSync(guide, 'utf8') !== '# Private UI version two\n') {
  throw new Error('Packed extension version upgrade failed');
}
const repeat = command('repeat', ['init', '--cwd', consumer, '--json']);
if (repeat.data.files.created.length || repeat.data.files.updated.length) {
  throw new Error('Extension initialization was not idempotent');
}
const original = readFileSync(guide);
writeFileSync(guide, 'Local edits must survive\n');
const conflict = command('edited-conflict', ['init', '--cwd', consumer, '--json'], true);
if (
  !conflict.data.files.conflicting.length ||
  conflict.data.applied ||
  readFileSync(guide, 'utf8') !== 'Local edits must survive\n'
) {
  throw new Error('Edited package guidance was overwritten');
}
writeFileSync(guide, original);
writeJson(configPath, { ...config, extensions: [] });
command('revoke', ['init', '--cwd', consumer, '--json']);
if (existsSync(guide)) {
  throw new Error('Revoked unedited package guidance was retained');
}
writeJson(configPath, { ...config, extensions: [packageName] });
command('restore-example', ['init', '--cwd', consumer, '--json']);
assertDoctor('current');
writeJson(join(output, 'summary.json'), {
  completedAt: new Date().toISOString(),
  fixture,
  customOnlyCatalogue: true,
  explicitApproval: true,
  writeFreeDryRun: true,
  publicImportVerified: true,
  packedAssets: true,
  versionedUpgrade: true,
  editedGuidanceProtected: true,
  revocation: true,
  parserFreeConsumption: true,
  commands: records,
});
console.log(`Packed declarative extension checks passed; evidence: ${output}`);

function installVersion(version) {
  writeJson(join(source, 'package.json'), { ...packageJson, version });
  command(
    `generate-${version}`,
    ['metadata', 'generate', '--package-root', source, '--output', join(source, 'dist/metadata'), '--json'],
    false,
    false,
  );
  const packed = JSON.parse(
    run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', tarballs], source).stdout,
  )[0];
  writeJson(join(consumer, 'package.json'), {
    name: 'fluentui-extension-consumer',
    private: true,
    dependencies: { [packageName]: `file:${join(tarballs, packed.filename)}` },
  });
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], consumer);
}

function assertDoctor(skillStatus) {
  const report = command(`doctor-${records.length}`, [
    'doctor',
    '--cwd',
    consumer,
    '--system',
    'acme',
    '--metadata-mode',
    'required',
    '--deep',
    '--json',
  ]);
  if (report.status !== 'complete' || report.data.setup.skill.status !== skillStatus) {
    throw new Error(`Unexpected extension doctor health: ${JSON.stringify(report)}`);
  }
}

function command(name, args, failure = false, parserFree = true) {
  const probe = join(output, `${name}.probe.json`);
  const env = { ...process.env };
  if (parserFree) {
    env.FLUENTUI_CLI_PROBE_OUTPUT = probe;
    env.NODE_OPTIONS = [env.NODE_OPTIONS, `--require=${join(root, 'scripts/module-probe.cjs')}`]
      .filter(Boolean)
      .join(' ');
  }
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: consumer,
    env,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  records.push({ name, args, status: result.status, stdout: result.stdout, stderr: result.stderr });
  writeJson(join(output, `${name}.json`), records.at(-1));
  if (result.error || (failure ? result.status === 0 : result.status !== 0)) {
    throw new Error(`${name}: ${result.error?.message ?? (result.stderr || result.stdout)}`);
  }
  if (parserFree) {
    const loaded = JSON.parse(readFileSync(probe, 'utf8'));
    if (loaded.typeScriptModules.length || loaded.generatorModules.length) {
      throw new Error(`${name} loaded compiler or generator modules`);
    }
  }
  const response = JSON.parse(result.stdout);
  if (response.apiVersion !== '1') {
    throw new Error(`${name} did not emit the versioned JSON contract`);
  }
  return response;
}

function run(executable, args, cwd) {
  const result = spawnSync(executable, args, { cwd, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    throw new Error(`${executable}: ${result.error?.message ?? (result.stderr || result.stdout)}`);
  }
  return result;
}

function writeJson(file, value) {
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}
