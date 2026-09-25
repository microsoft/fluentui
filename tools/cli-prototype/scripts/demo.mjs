import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  applyLocalPackagePins,
  applyProducerBaseline,
  assertProducerBaseline,
  producerBaselineName,
  verifyInstalledTarballs,
} from './consumer-packages.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(projectRoot, '../..');
const configuredRoot = process.env.FLUENTUI_DEMO_ROOT;
const ownerFile = '.fluentui-todo-demo.json';

try {
  if (!configuredRoot) {
    throw new Error('Set FLUENTUI_DEMO_ROOT to a new demo directory outside the workspace.');
  }
  const requested = resolve(configuredRoot);
  const root = join(realpathSync(dirname(requested)), basename(requested));
  if (root === workspaceRoot || root.startsWith(`${workspaceRoot}${sep}`)) {
    throw new Error('The demo must live outside the producer workspace.');
  }
  switch (process.argv[2]) {
    case 'prepare':
      prepare(root);
      break;
    case 'verify':
      verify(root);
      break;
    case 'start':
      start(root);
      break;
    default:
      throw new Error('Expected prepare, verify, or start.');
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

function prepare(root) {
  if (existsSync(root)) {
    throw new Error(`Refusing to overwrite ${root}. Choose a new destination for each rehearsal.`);
  }
  const manifestPath = resolve(
    process.env.FLUENTUI_DEMO_PACK_MANIFEST ?? join(projectRoot, '.artifacts/pack-manifest.json'),
  );
  const manifest = readJson(manifestPath);
  verifyPack(manifest);
  const templatePackage = readJson(join(projectRoot, 'template/package.json'));
  mkdirSync(root);
  mkdirSync(join(root, 'evidence'));
  cpSync(manifestPath, join(root, 'pack-manifest.json'));
  for (const variant of ['starter', 'reference']) {
    const consumer = join(root, variant);
    cpSync(join(projectRoot, 'demo/common'), consumer, { recursive: true });
    cpSync(join(projectRoot, 'demo', variant), consumer, { recursive: true });
    cpSync(join(projectRoot, 'template/vite.config.ts'), join(consumer, 'vite.config.ts'));
    const packageJson = {
      name: `fluentui-todo-${variant}`,
      version: '0.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc --noEmit && vite build',
        ...(variant === 'reference' ? { test: 'playwright test' } : {}),
      },
      dependencies: { ...templatePackage.dependencies },
      devDependencies: { ...templatePackage.devDependencies },
    };
    writeJson(join(consumer, 'package.json'), packageJson);
    const baseline = applyProducerBaseline(consumer, workspaceRoot);
    const pinned = readJson(join(consumer, 'package.json'));
    applyLocalPackagePins(pinned, manifest);
    assertProducerBaseline(pinned, baseline);
    writeJson(join(consumer, 'package.json'), pinned);
    run('git', ['init', '--quiet'], consumer);
    run('npm', ['install', '--package-lock-only', '--ignore-scripts', '--no-audit', '--no-fund'], consumer);
    run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], consumer);
    verifyInstalledTarballs(consumer, manifest.packages);
  }
  const reference = join(root, 'reference');
  cli(root, reference, 'reference-init', ['init', '--json']);
  const configPath = join(reference, 'fluentui.config.json');
  const config = readJson(configPath);
  config.preferences = { ...config.preferences, headlessStyling: 'css-modules' };
  config.extensions = [];
  writeJson(configPath, config);
  const runbook = readFileSync(join(projectRoot, 'demo/RUNBOOK.md'), 'utf8')
    .replaceAll('__DEMO_ROOT__', root)
    .replaceAll('__WORKSPACE_ROOT__', workspaceRoot);
  writeFileSync(join(root, 'RUNBOOK.md'), runbook);
  assertBlankStarter(join(root, 'starter'));
  writeJson(join(root, ownerFile), {
    schemaVersion: 1,
    owner: 'fluentui-todo-demo',
    root,
    packSha256: digest(join(root, 'pack-manifest.json')),
    starterSnapshot: snapshot(join(root, 'starter')),
  });
  console.log(`Prepared clean starter: ${join(root, 'starter')}`);
  console.log(`Prepared initialized reference: ${reference}`);
  console.log(`Presenter runbook: ${join(root, 'RUNBOOK.md')}`);
}

function verify(root) {
  const owner = assertOwned(root);
  const starter = join(root, 'starter');
  const reference = join(root, 'reference');
  const manifest = readJson(join(root, 'pack-manifest.json'));
  rmSync(join(root, 'evidence/summary.json'), { force: true });
  verifyPack(manifest);
  assertBlankStarter(starter);
  assertSnapshot(starter, owner.starterSnapshot);
  for (const consumer of [starter, reference]) {
    const packageJson = readJson(join(consumer, 'package.json'));
    assertProducerBaseline(packageJson, readJson(join(consumer, producerBaselineName)));
    verifyInstalledTarballs(consumer, manifest.packages);
    if (packageJson.dependencies['fluent-forum-styled'] || packageJson.overrides['fluent-forum-styled']) {
      throw new Error('The forum alias fixture must not appear in the Todo demo.');
    }
    for (const [name, version] of Object.entries(manifest.declarationDependencies)) {
      if (readJson(join(consumer, 'node_modules', name, 'package.json')).version !== version) {
        throw new Error(`Installed declaration dependency ${name} differs from the producer.`);
      }
    }
    run('npm', ['run', 'build'], consumer);
  }
  const dryRun = cli(root, starter, 'starter-init-dry-run', ['init', '--dry-run', '--json']);
  if (!dryRun.data.systems.includes('fluent-v9') || !dryRun.data.systems.includes('headless')) {
    throw new Error('Init did not discover both canonical installed facades.');
  }
  const beforeInit = snapshot(reference);
  cli(root, reference, 'reference-init-repeat', ['init', '--json']);
  assertSnapshot(reference, beforeInit);
  const doctor = cli(root, reference, 'reference-doctor', [
    'doctor',
    '--deep',
    '--metadata-mode',
    'required',
    '--json',
  ]);
  if (
    doctor.status !== 'complete' ||
    doctor.coverage.declarationFallbackRoots !== 0 ||
    doctor.coverage.unavailableRoots !== 0 ||
    doctor.data.roots.some(item => item.authority !== 'metadata' || item.status !== 'complete')
  ) {
    throw new Error('Demo catalogs are not healthy metadata-backed packages.');
  }
  const imports = [];
  for (const [system, symbol] of [
    ['fluent-v9', 'Button'],
    ['fluent-v9', 'Input'],
    ['fluent-v9', 'Field'],
    ['fluent-v9', 'Tab'],
    ['fluent-v9', 'TabList'],
    ['fluent-v9', 'Badge'],
    ['fluent-v9', 'FluentProvider'],
    ['headless', 'Button'],
    ['headless', 'Checkbox'],
  ]) {
    const result = cli(root, reference, `api-${system}-${symbol}`, [
      'api',
      symbol,
      '--system',
      system,
      '--metadata-mode',
      'required',
      '--json',
      '--dense',
    ]);
    const detail = result.data.result;
    const expected =
      system === 'headless'
        ? `@fluentui/react-headless-components-preview/${symbol.toLowerCase()}`
        : '@fluentui/react-components';
    if (
      result.type !== 'fluentui.api-detail.dense' ||
      detail.recommendedImport?.moduleSpecifier !== expected ||
      detail.importStatus !== 'selected' ||
      result.diagnostics.some(item => item.severity === 'error')
    ) {
      throw new Error(`The demo cannot recommend the expected public import for ${system}/${symbol}.`);
    }
    imports.push(detail.recommendedImport.statement);
  }
  run('npm', ['test'], reference);
  assertBlankStarter(starter);
  assertSnapshot(starter, owner.starterSnapshot);
  writeJson(join(root, 'evidence/summary.json'), {
    status: 'complete',
    completedAt: new Date().toISOString(),
    packageCount: manifest.packages.length,
    metadataRoots: doctor.coverage.metadataRoots,
    starterUninitialized: true,
    packageImports: imports,
    parserFree: true,
    starterBuild: true,
    referenceBuild: true,
    referenceBrowserTests: true,
    packSha256: owner.packSha256,
  });
  console.log(`Todo demo acceptance passed: ${join(root, 'evidence/summary.json')}`);
}

function start(root) {
  assertOwned(root);
  const variant = process.env.FLUENTUI_DEMO_APP ?? 'starter';
  if (!['starter', 'reference'].includes(variant)) {
    throw new Error('FLUENTUI_DEMO_APP must be starter or reference.');
  }
  const port = Number(process.env.FLUENTUI_DEMO_PORT ?? (variant === 'starter' ? 5180 : 5181));
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error('FLUENTUI_DEMO_PORT must be an integer between 1024 and 65535.');
  }
  run(
    'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
    join(root, variant),
    process.env,
    true,
  );
}

function assertOwned(root) {
  if (lstatSync(root).isSymbolicLink()) {
    throw new Error('The demo root must not be a symlink.');
  }
  const owner = readJson(join(root, ownerFile));
  if (
    owner.schemaVersion !== 1 ||
    owner.owner !== 'fluentui-todo-demo' ||
    owner.root !== root ||
    digest(join(root, 'pack-manifest.json')) !== owner.packSha256
  ) {
    throw new Error('The demo ownership marker or frozen pack manifest is invalid.');
  }
  for (const variant of ['starter', 'reference']) {
    const consumer = join(root, variant);
    const pkg = readJson(join(consumer, 'package.json'));
    if (lstatSync(consumer).isSymbolicLink() || pkg.name !== `fluentui-todo-${variant}` || pkg.private !== true) {
      throw new Error(`Unexpected ${variant} package identity.`);
    }
  }
  return owner;
}

function verifyPack(manifest) {
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.packages) || !manifest.packages.length) {
    throw new Error('A completed cli-prototype pack manifest is required.');
  }
  for (const name of [
    '@fluentui/cli',
    '@fluentui/api-metadata',
    '@fluentui/react-components',
    '@fluentui/react-headless-components-preview',
  ]) {
    if (!manifest.packages.some(item => item.packageName === name)) {
      throw new Error(`The selected pack manifest is missing ${name}.`);
    }
  }
  for (const item of manifest.packages) {
    if (digest(item.tarball) !== item.sha256) {
      throw new Error(`Packed bytes do not match the manifest for ${item.packageName}.`);
    }
  }
}

function assertBlankStarter(starter) {
  for (const file of ['fluentui.config.json', 'AGENTS.md', '.agents']) {
    if (existsSync(join(starter, file))) {
      throw new Error(`Starter already contains ${file}; use a new rehearsal directory.`);
    }
  }
}

function snapshot(root) {
  const excluded = new Set(['node_modules', '.git', 'dist', 'test-results', 'playwright-report']);
  const files = [];
  const visit = directory => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (excluded.has(entry.name) || entry.name.endsWith('.tsbuildinfo')) {
        continue;
      }
      const file = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(file);
      } else if (entry.isFile()) {
        files.push([relative(root, file), digest(file)]);
      } else {
        throw new Error(`Unexpected non-regular demo source: ${file}`);
      }
    }
  };
  visit(root);
  return Object.fromEntries(files.sort(([left], [right]) => left.localeCompare(right)));
}

function assertSnapshot(root, expected) {
  if (JSON.stringify(snapshot(root)) !== JSON.stringify(expected)) {
    throw new Error(`Unexpected source/configuration changes in ${root}.`);
  }
}

function cli(root, consumer, label, args) {
  const evidence = join(root, 'evidence');
  const probePath = join(evidence, `${label}.probe.json`);
  const result = run('node', [join(consumer, 'node_modules/@fluentui/cli/bin/fluentui-cli.js'), ...args], consumer, {
    ...process.env,
    FLUENTUI_CLI_PROBE_OUTPUT: probePath,
    NODE_OPTIONS: [process.env.NODE_OPTIONS, `--require=${join(projectRoot, 'template/scripts/module-probe.cjs')}`]
      .filter(Boolean)
      .join(' '),
  });
  const response = JSON.parse(result.stdout);
  writeJson(join(evidence, `${label}.json`), response);
  const probe = readJson(probePath);
  if (probe.typeScriptModules.length || probe.generatorModules.length) {
    throw new Error(`${label} loaded a compiler or generator in the consumer CLI.`);
  }
  return response;
}

function run(command, args, cwd, env = process.env, inheritOutput = false) {
  const result = spawnSync(command, args, {
    cwd,
    env,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    stdio: inheritOutput ? 'inherit' : 'pipe',
  });
  if (result.error || result.status !== 0) {
    throw new Error(
      `${command} ${args.join(' ')} failed in ${cwd}\n${result.error?.message ?? ''}\n${result.stdout}\n${
        result.stderr
      }`,
    );
  }
  if (command !== 'node' && !inheritOutput) {
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
  }
  return result;
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function digest(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}
