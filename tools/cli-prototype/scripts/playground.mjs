import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { createServer } from 'node:net';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { catalogExclusions, localPackages, suiteAlias } from '../packages.mjs';
import {
  applyLocalPackagePins,
  applyProducerBaseline,
  assertProducerBaseline,
  producerBaselineName,
  verifyInstalledTarballs,
} from './consumer-packages.mjs';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const workspaceRoot = resolve(projectRoot, '../..');
const templateRoot = join(projectRoot, 'template');
const consumerPackageName = JSON.parse(readFileSync(join(templateRoot, 'package.json'), 'utf8')).name;
const artifactsRoot = join(projectRoot, '.artifacts');
const tarballRoot = join(artifactsRoot, 'tarballs');
const packageClosurePath = join(artifactsRoot, 'package-closure.json');
const packManifestPath = join(artifactsRoot, 'pack-manifest.json');
const playgroundIdentity = 'fluentui-cli-playground';
const ownerMarkerName = '.fluentui-cli-playground-owner.json';
const metadataExportTarget = './dist/metadata/index.json';
const configuredPlaygroundRoot = process.env.FLUENTUI_PLAYGROUND_ROOT;
const playgroundRoot = configuredPlaygroundRoot ? resolve(configuredPlaygroundRoot) : '';
const port = Number(process.env.FLUENTUI_PLAYGROUND_PORT ?? 5179);

const actions = {
  prepare,
  inventory: writeInventory,
  'build-catalogs': buildCatalogs,
  'refresh-metadata': refreshMetadata,
  pack,
  install,
  build: () => runConsumerScript('build'),
  test: () => runConsumerScript('test'),
  'inspect-cli': inspectCli,
  start,
};

const action = process.argv[2];
if (!action || !(action in actions)) {
  fail(`Expected one of: ${Object.keys(actions).join(', ')}`);
}

try {
  if (!configuredPlaygroundRoot && !['pack', 'build-catalogs', 'refresh-metadata', 'inventory'].includes(action)) {
    fail('FLUENTUI_PLAYGROUND_ROOT must point to a caller-owned playground directory');
  }
  await actions[action]();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

async function prepare() {
  assertSafeLocations();
  await assertPortAvailable();

  if (existsSync(playgroundRoot)) {
    fail(`Preparation only creates a new consumer. Preserve ${playgroundRoot} and select an absent directory.`);
  }
  mkdirSync(playgroundRoot, { recursive: true });
  cpSync(templateRoot, playgroundRoot, { recursive: true });
  const producerBaseline = applyProducerBaseline(playgroundRoot, workspaceRoot);
  run('git', ['init', '--quiet'], playgroundRoot);
  writeOwnerMarker();
  writeFileSync(
    join(playgroundRoot, '.playground-state.json'),
    `${JSON.stringify(
      {
        state: 'prepared',
        workspaceRoot,
        playgroundRoot,
        port,
        producerBaseline,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Prepared ${playgroundRoot}`);
  console.log(`Reserved development port: ${port}`);
}

async function start() {
  assertPrepared();
  if (!existsSync(join(playgroundRoot, 'node_modules', 'vite', 'package.json'))) {
    fail('Playground dependencies are not installed. Run the cli-prototype:install Nx target first.');
  }
  await assertPortAvailable();
  run('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port)], playgroundRoot);
}

async function pack() {
  assertSafeLocations();
  mkdirSync(tarballRoot, { recursive: true });

  const inventory = resolvePublicationInventory();
  const packageClosure = inventory.packages;
  writeFileSync(packageClosurePath, `${JSON.stringify(inventory, null, 2)}\n`);
  console.log(`Resolved ${packageClosure.length} workspace packages in the runtime closure`);
  packageClosure.forEach(validateLocalPackage);
  const packed = packageClosure.map(definition => packLocalPackage(definition));
  const workspaceNames = new Set(packageClosure.map(definition => definition.packageName));
  const declarationDependencies = {};
  for (const definition of packed) {
    for (const dependency of definition.declarationDependencies) {
      if (workspaceNames.has(dependency.name)) {
        continue;
      }
      if (declarationDependencies[dependency.name] && declarationDependencies[dependency.name] !== dependency.version) {
        fail(
          `Declaration inputs require multiple ${dependency.name} versions; use importer-scoped consumer overrides instead of silently choosing one`,
        );
      }
      declarationDependencies[dependency.name] = dependency.version;
    }
  }
  writeFileSync(
    packManifestPath,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        exclusions: inventory.exclusions,
        declarationDependencies,
        publicationAssertions: packageClosure
          .filter(definition => definition.catalog)
          .map(definition => definition.packageName),
        runtimeClosure: packed.filter(definition => !definition.explicit).map(definition => definition.packageName),
        totals: {
          compressedBytes: packed.reduce((total, definition) => total + definition.size, 0),
          unpackedBytes: packed.reduce((total, definition) => total + definition.unpackedSize, 0),
          metadataBytes: packed.reduce((total, definition) => total + definition.metadataBytes, 0),
        },
        packages: packed,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Packed ${packed.length} local packages`);
  console.log(`Manifest: ${packManifestPath}`);
}

function buildCatalogs() {
  assertSafeLocations();
  const { packages } = resolvePublicationInventory();
  const projects = [
    ...new Set(packages.filter(definition => definition.explicit).map(definition => definition.project)),
  ];
  if (projects.some(project => typeof project !== 'string' || !project)) {
    fail('Every publication root must declare an Nx project');
  }
  run(
    'yarn',
    ['nx', 'run-many', '-t', 'build', '-p', projects.join(','), '--parallel=2', '--outputStyle=static'],
    workspaceRoot,
  );
}

function refreshMetadata() {
  assertSafeLocations();
  const catalogs = resolvePublicationInventory().packages.filter(definition => definition.catalog);
  for (const definition of catalogs) {
    run(
      'node',
      [
        '-e',
        `require('@fluentui/api-metadata/generator').refreshGeneratedApiMetadata(process.argv[1])
          .then(updated => { if (!updated) throw new Error('Package has no enabled metadata'); })
          .catch(error => { console.error(error); process.exitCode = 1; });`,
        join(workspaceRoot, definition.packageRoot),
      ],
      workspaceRoot,
    );
    console.log(`Refreshed ${definition.packageName}`);
  }
}

function writeInventory() {
  assertSafeLocations();
  mkdirSync(artifactsRoot, { recursive: true });
  const inventory = resolvePublicationInventory();
  writeFileSync(packageClosurePath, `${JSON.stringify(inventory, null, 2)}\n`);
  console.log(`${inventory.packages.filter(definition => definition.catalog).length} catalogs; ${packageClosurePath}`);
}

function runConsumerScript(script) {
  assertPrepared();
  run('npm', ['run', script], playgroundRoot);
}

function install() {
  assertPrepared();
  if (!existsSync(packManifestPath)) {
    fail(`Missing ${packManifestPath}. Run the cli-prototype:pack Nx target first.`);
  }

  const manifest = JSON.parse(readFileSync(packManifestPath, 'utf8'));
  const packageJsonPath = join(playgroundRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const producerBaseline = JSON.parse(readFileSync(join(playgroundRoot, producerBaselineName), 'utf8'));
  assertProducerBaseline(packageJson, producerBaseline);

  applyLocalPackagePins(packageJson, manifest);
  const aliased = manifest.packages.find(pkg => pkg.packageName === suiteAlias.package);
  if (!aliased) {
    fail(`Missing packed public facade for npm alias acceptance: ${suiteAlias.package}`);
  }
  packageJson.dependencies[suiteAlias.name] = `file:${aliased.tarball}`;
  packageJson.overrides[suiteAlias.name] = `$${suiteAlias.name}`;

  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  rmSync(join(playgroundRoot, 'node_modules'), { recursive: true, force: true });
  rmSync(join(playgroundRoot, 'package-lock.json'), { force: true });

  run('npm', ['install', '--package-lock-only', '--ignore-scripts', '--no-audit', '--no-fund'], playgroundRoot);
  run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], playgroundRoot);
  verifyInstalledTarballs(playgroundRoot, manifest.packages);
  const aliasRoot = join(playgroundRoot, 'node_modules', suiteAlias.name);
  const aliasManifest = JSON.parse(readFileSync(join(aliasRoot, 'package.json'), 'utf8'));
  if (
    lstatSync(aliasRoot).isSymbolicLink() ||
    aliasManifest.name !== suiteAlias.package ||
    aliasManifest.version !== aliased.version
  ) {
    fail('The npm alias must resolve to the independently extracted public facade tarball');
  }
  for (const [packageName, version] of Object.entries(manifest.declarationDependencies)) {
    const installed = JSON.parse(
      readFileSync(join(playgroundRoot, 'node_modules', packageName, 'package.json'), 'utf8'),
    );
    if (installed.version !== version) {
      fail(`Installed declaration dependency ${packageName}@${installed.version} differs from producer ${version}`);
    }
  }
  writeFileSync(
    join(playgroundRoot, '.fluentui-local-packages.json'),
    `${JSON.stringify({ schemaVersion: 1, packages: manifest.packages }, null, 2)}\n`,
  );

  writeFileSync(
    join(playgroundRoot, '.playground-state.json'),
    `${JSON.stringify(
      {
        state: 'installed',
        workspaceRoot,
        playgroundRoot,
        port,
        packManifestPath,
        producerBaseline,
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Installed clean consumer dependencies in ${playgroundRoot}`);
}

function inspectCli() {
  assertPrepared();
  const cliBin = join(playgroundRoot, 'node_modules/@fluentui/cli/bin/fluentui-cli.js');
  for (const args of [
    ['--help'],
    ['api', '--help'],
    ['doctor', '--help'],
    ['init', '--help'],
    ['metadata', 'validate', '--help'],
    ['report', 'usage', '--help'],
  ]) {
    console.log(`\n$ fluentui-cli ${args.join(' ')}`);
    run('node', [cliBin, ...args], playgroundRoot);
  }
}

function packLocalPackage(definition) {
  const packageRoot = join(workspaceRoot, definition.packageRoot);
  const packageJsonPath = join(packageRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  const staging = mkdtempSync(join(tarballRoot, '.pack-'));
  let packed;
  let tarball;
  let hash;
  try {
    const result = run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', staging], packageRoot, true);
    [packed] = JSON.parse(result.stdout);
    if (!packed?.filename) {
      fail(`npm pack did not return a filename for ${definition.packageName}`);
    }
    const stagedTarball = join(staging, packed.filename);
    hash = sha256(stagedTarball);
    tarball = join(tarballRoot, `${basename(packed.filename, '.tgz')}-${hash}.tgz`);
    if (existsSync(tarball)) {
      if (sha256(tarball) !== hash) {
        fail(`Content-addressed tarball was modified: ${tarball}`);
      }
    } else {
      renameSync(stagedTarball, tarball);
    }
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
  if (definition.catalog) {
    const metadataPaths = metadataExportPaths(packageJson).map(path => path.replace(/^\.\//, ''));
    const packedPaths = new Set(packed.files.map(file => file.path));
    for (const metadataPath of metadataPaths) {
      if (!packedPaths.has(metadataPath)) {
        fail(`${definition.packageName} packed tarball omits advertised metadata artifact ${metadataPath}`);
      }
    }
    assertPackedCatalogRecords(packageJson, packageRoot, packed.files);
  }

  const metadataFiles = definition.catalog ? catalogFilePaths(packageJson, packageRoot) : [];
  return {
    ...definition,
    version: packageJson.version,
    tarball,
    sha256: hash,
    size: packed.size,
    unpackedSize: packed.unpackedSize,
    metadataFiles,
    metadataBytes: metadataFiles.reduce((total, path) => total + statSync(join(packageRoot, path)).size, 0),
    declarationDependencies: catalogDeclarationDependencies(metadataFiles, packageRoot),
  };
}

function validateLocalPackage(definition) {
  const packageRoot = join(workspaceRoot, definition.packageRoot);
  const packageJsonPath = join(packageRoot, 'package.json');
  if (!existsSync(packageJsonPath)) {
    fail(`Missing package manifest for ${definition.packageName}: ${packageJsonPath}`);
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.name !== definition.packageName) {
    fail(`Expected ${definition.packageName} at ${definition.packageRoot}, found ${String(packageJson.name)}`);
  }
  assertRuntimeArtifacts(packageJson, packageRoot);
  for (const entrypoint of definition.runtimeEntrypoints) {
    if (!(entrypoint in (packageJson.exports ?? {}))) {
      fail(`${packageJson.name} lost required runtime export ${entrypoint}`);
    }
  }
  if (definition.catalog) {
    assertCatalogContract(packageJson, packageRoot, definition.expectedApiCompleteness);
  }
}

function resolvePublicationInventory() {
  const inventory = new Map();
  const exclusions = [];
  const workspaceList = run('yarn', ['workspaces', 'list', '--json'], workspaceRoot, true);

  for (const line of workspaceList.stdout.split('\n').filter(Boolean)) {
    const workspace = JSON.parse(line);
    const packageRoot = workspace.location;
    const packageJsonPath = join(workspaceRoot, packageRoot, 'package.json');
    if (!existsSync(packageJsonPath)) {
      continue;
    }
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    if (typeof packageJson.name === 'string') {
      const projectJsonPath = join(workspaceRoot, packageRoot, 'project.json');
      const project = existsSync(projectJsonPath) ? JSON.parse(readFileSync(projectJsonPath, 'utf8')) : undefined;
      const catalog = packageJson.fluentuiCatalog !== undefined;
      const exclusion = catalogExclusions[packageJson.name];
      if (exclusion) {
        if (catalog) {
          fail(`${packageJson.name} is both catalog-enabled and excluded; update the coverage classification`);
        }
        exclusions.push({ packageName: packageJson.name, packageRoot, project: project?.name, reason: exclusion });
      }
      const publicV9Runtime =
        packageRoot.startsWith('packages/react-components/') &&
        packageJson.private !== true &&
        (typeof packageJson.types === 'string' ||
          typeof packageJson.typings === 'string' ||
          hasDeclarationTarget(packageJson.exports));
      if (publicV9Runtime && !catalog && !exclusion) {
        fail(`${packageJson.name} is a public v9 runtime library without API metadata publication`);
      }
      inventory.set(packageJson.name, {
        packageName: packageJson.name,
        workspaceName: workspace.name,
        project: project?.name,
        system: project?.metadata?.apiMetadata?.system,
        packageRoot,
        catalog,
        expectedApiCompleteness: catalog ? 'complete' : undefined,
        runtimeEntrypoints: catalog
          ? Object.keys(packageJson.exports ?? {}).filter(path => path.startsWith('.') && !path.endsWith('.json'))
          : [],
        explicit: false,
      });
    }
  }

  const roots = [...inventory.values()].filter(definition => definition.catalog);
  const closure = new Map(
    [...roots, ...localPackages].map(definition => [definition.packageName, { ...definition, explicit: true }]),
  );
  const queue = [...closure.values()];

  while (queue.length > 0) {
    const definition = queue.shift();
    const packageJson = JSON.parse(readFileSync(join(workspaceRoot, definition.packageRoot, 'package.json'), 'utf8'));
    const runtimeDependencies = [
      ...Object.keys(packageJson.dependencies ?? {}),
      ...Object.keys(packageJson.optionalDependencies ?? {}),
    ].sort();

    for (const dependency of runtimeDependencies) {
      if (closure.has(dependency)) {
        continue;
      }
      const workspaceDependency = inventory.get(dependency);
      if (workspaceDependency) {
        closure.set(dependency, workspaceDependency);
        queue.push(workspaceDependency);
      }
    }
  }

  return {
    schemaVersion: 1,
    packages: [...closure.values()].sort((left, right) => left.packageName.localeCompare(right.packageName)),
    exclusions: exclusions.sort((left, right) => left.packageName.localeCompare(right.packageName)),
  };
}

function hasDeclarationTarget(value) {
  if (typeof value === 'string') {
    return /\.d\.(?:c|m)?ts$/.test(value);
  }
  return Boolean(value && typeof value === 'object' && Object.values(value).some(hasDeclarationTarget));
}

function assertRuntimeArtifacts(packageJson, packageRoot) {
  for (const artifact of runtimeArtifactPaths(packageJson)) {
    const artifactPath = resolvePackageExport(packageRoot, artifact, packageJson.name);
    if (!existsSync(artifactPath)) {
      fail(`${packageJson.name} is missing built runtime artifact ${artifact}`);
    }
  }
}

function runtimeArtifactPaths(packageJson) {
  const paths = new Set();
  for (const field of ['main', 'module', 'types', 'typings']) {
    if (typeof packageJson[field] === 'string') {
      paths.add(packageJson[field]);
    }
  }
  collectExportTargets(packageJson.exports, paths);
  collectExportTargets(packageJson.bin, paths);
  return [...paths]
    .filter(path => path !== './package.json' && !path.includes('*'))
    .map(path => (path.startsWith('./') ? path : `./${path}`));
}

function collectExportTargets(value, paths) {
  if (typeof value === 'string') {
    paths.add(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(item => collectExportTargets(item, paths));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach(item => collectExportTargets(item, paths));
  }
}

function assertCatalogContract(packageJson, packageRoot, expectedApiCompleteness) {
  if (packageJson.fluentuiCatalog !== './metadata.json') {
    fail(
      `${packageJson.name} is not ready for the packed playground: package.json must declare ` +
        `"fluentuiCatalog": "./metadata.json"`,
    );
  }

  if (packageJson.exports?.['./metadata.json'] !== metadataExportTarget) {
    fail(`${packageJson.name} must publicly export "./metadata.json" as the string ` + `"${metadataExportTarget}"`);
  }
  if (!Array.isArray(packageJson.files) || !packageJson.files.includes('dist/metadata')) {
    fail(`${packageJson.name} package.json files must include "dist/metadata"`);
  }

  for (const metadataExport of metadataExportPaths(packageJson)) {
    const metadataPath = resolvePackageExport(packageRoot, metadataExport, packageJson.name);
    if (!existsSync(metadataPath)) {
      fail(`${packageJson.name} advertises missing metadata artifact ${relative(packageRoot, metadataPath)}`);
    }

    if (expectedApiCompleteness) {
      const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
      if (metadata.completeness?.api?.status !== expectedApiCompleteness) {
        fail(
          `${packageJson.name} must advertise API completeness ${expectedApiCompleteness}, found ` +
            `${String(metadata.completeness?.api?.status)}`,
        );
      }
    }
  }
}

function metadataExportPaths(packageJson) {
  const metadataExport = packageJson.exports?.['./metadata.json'];
  if (metadataExport === metadataExportTarget) {
    return [metadataExportTarget];
  }
  fail(`${packageJson.name} must publicly export "./metadata.json" as the string ` + `"${metadataExportTarget}"`);
}

function assertPackedCatalogRecords(packageJson, packageRoot, packedFiles) {
  const packedPaths = new Set(packedFiles.map(file => file.path));
  const advertisedPaths = new Set();

  for (const metadataExport of metadataExportPaths(packageJson)) {
    const metadataPath = resolvePackageExport(packageRoot, metadataExport, packageJson.name);
    const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
    for (const record of metadata.records ?? []) {
      if (typeof record.path !== 'string') {
        continue;
      }
      const recordRelativePath = relative(dirname(metadataPath), resolve(dirname(metadataPath), record.path));
      if (!recordRelativePath.startsWith(`api${sep}`)) {
        fail(`${packageJson.name} metadata record must remain beneath dist/metadata/api/: ${record.path}`);
      }
      const recordPath = relative(packageRoot, resolve(dirname(metadataPath), record.path));
      advertisedPaths.add(recordPath);
      if (recordPath.startsWith('..') || !packedPaths.has(recordPath)) {
        fail(`${packageJson.name} packed tarball omits referenced metadata record ${record.path}`);
      }
    }
    for (const packedPath of packedPaths) {
      if (
        packedPath.startsWith('dist/metadata/api/') &&
        packedPath.endsWith('.json') &&
        !advertisedPaths.has(packedPath)
      ) {
        fail(`${packageJson.name} packed tarball includes an obsolete or unadvertised API record ${packedPath}`);
      }
    }
  }
}

function catalogFilePaths(packageJson, packageRoot) {
  const files = new Set();
  for (const metadataExport of metadataExportPaths(packageJson)) {
    const metadataPath = resolvePackageExport(packageRoot, metadataExport, packageJson.name);
    files.add(relative(packageRoot, metadataPath));
    const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
    for (const record of metadata.records ?? []) {
      if (typeof record.path === 'string') {
        files.add(relative(packageRoot, resolve(dirname(metadataPath), record.path)));
      }
    }
  }
  return [...files].sort();
}

function catalogDeclarationDependencies(metadataFiles, packageRoot) {
  const dependencies = new Map();
  for (const metadataFile of metadataFiles) {
    const document = JSON.parse(readFileSync(join(packageRoot, metadataFile), 'utf8'));
    for (const input of document.dependencyInputs ?? []) {
      dependencies.set(`${input.package.name}@${input.package.version}`, input.package);
    }
  }
  return [...dependencies.values()];
}

function resolvePackageExport(packageRoot, exportedPath, packageName) {
  if (!exportedPath.startsWith('./')) {
    fail(`${packageName} metadata export must be package-relative, found ${exportedPath}`);
  }
  const resolvedPath = resolve(packageRoot, exportedPath);
  if (resolvedPath !== packageRoot && !resolvedPath.startsWith(`${packageRoot}/`)) {
    fail(`${packageName} metadata export escapes its package root: ${exportedPath}`);
  }
  return resolvedPath;
}

function assertSafeLocations() {
  const gitWorktreeMarker = join(workspaceRoot, '.git');
  if (!existsSync(gitWorktreeMarker) || !lstatSync(gitWorktreeMarker).isFile()) {
    fail(`Repository commands must run from a dedicated Git worktree: ${workspaceRoot}`);
  }
}

function assertPrepared() {
  assertSafeLocations();
  if (!existsSync(playgroundRoot)) {
    fail(`Playground is not prepared at ${playgroundRoot}. Run the cli-prototype:prepare Nx target first.`);
  }
  assertOwnedDirectory();
}

function assertOwnedDirectory() {
  const packageJsonPath = join(playgroundRoot, 'package.json');
  if (!existsSync(packageJsonPath)) {
    fail(`Refusing to overwrite unrelated directory without ${playgroundIdentity} package identity: ${playgroundRoot}`);
  }
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.name !== consumerPackageName || packageJson.private !== true) {
    fail(`Refusing to overwrite directory with unexpected package identity: ${playgroundRoot}`);
  }

  const ownerMarkerPath = join(playgroundRoot, ownerMarkerName);
  if (existsSync(ownerMarkerPath)) {
    const marker = JSON.parse(readFileSync(ownerMarkerPath, 'utf8'));
    if (
      marker.schemaVersion !== 1 ||
      marker.owner !== playgroundIdentity ||
      resolve(marker.playgroundRoot) !== playgroundRoot
    ) {
      fail(`Refusing to overwrite directory with invalid ownership marker: ${playgroundRoot}`);
    }
    return;
  }

  fail(`Refusing to overwrite directory without valid ${ownerMarkerName}: ${playgroundRoot}`);
}

function writeOwnerMarker() {
  writeFileSync(
    join(playgroundRoot, ownerMarkerName),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        owner: playgroundIdentity,
        playgroundRoot,
      },
      null,
      2,
    )}\n`,
  );
}

async function assertPortAvailable() {
  await new Promise((resolvePromise, reject) => {
    const server = createServer();
    server.once('error', error => reject(new Error(`Port ${port} is unavailable: ${error.message}`)));
    server.listen(port, '127.0.0.1', () => server.close(resolvePromise));
  });
}

function run(command, args, cwd, capture = false) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });
  if (result.status !== 0) {
    if (capture && result.stderr) {
      process.stderr.write(result.stderr);
    }
    fail(`${command} ${args.join(' ')} failed in ${cwd}`);
  }
  return result;
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function fail(message) {
  throw new Error(`[cli-prototype] ${message}`);
}
