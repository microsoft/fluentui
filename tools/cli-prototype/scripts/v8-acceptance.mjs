import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    local: { type: 'boolean', default: false },
    'setup-only': { type: 'boolean', default: false },
    root: { type: 'string' },
  },
});
assert.ok(values.local || (!values['setup-only'] && !values.root), '--root and --setup-only require --local');
const configuredRoot = values.local
  ? await (await import('./v8-acceptance-local.mjs')).prepareLocalV8Acceptance(values.root)
  : process.env.FLUENTUI_DEMO_ROOT;
assert.ok(configuredRoot, 'FLUENTUI_DEMO_ROOT must identify an existing installed Todo demo');
const demoRoot = fs.realpathSync(path.resolve(configuredRoot));
if (values['setup-only']) {
  console.log(`Local v8 acceptance fixtures prepared: ${demoRoot}`);
  process.exit(0);
}
const setupReceipt = path.join(demoRoot, 'local-setup.json');
const localFixture =
  values.local ||
  (fs.existsSync(setupReceipt) && JSON.parse(fs.readFileSync(setupReceipt, 'utf8')).mode === 'local-fixture');
const v8Root = path.join(demoRoot, 'reference-v8');
const modernRoot = path.join(demoRoot, 'reference');
const evidenceRoot = path.join(demoRoot, 'evidence', 'v8-cli');
const started = performance.now();
const budget = Number(process.env.FLUENTUI_V8_ACCEPTANCE_BUDGET_MS ?? Infinity);
assert.ok(budget > 0, 'FLUENTUI_V8_ACCEPTANCE_BUDGET_MS must be positive');
const summary = {
  schemaVersion: 1,
  status: 'running',
  mode: localFixture ? 'local-fixture' : 'installed-consumer',
  demoRoot,
  startedAt: new Date().toISOString(),
  commands: [],
};
let protectedBefore;

const preloadSource = String.raw`
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const read = fs.readFileSync;
const write = fs.writeFileSync;
const rename = fs.renameSync;
const load = Module._load;
const cacheRoot = process.env.FLUENTUI_ACCEPTANCE_CACHE_ROOT;
const mode = process.env.FLUENTUI_ACCEPTANCE_PROBE_MODE;
const evidence = { active: true, cwd: process.cwd(), mode, cacheRoot, reads: [], misses: [], writes: [], loaded: [], blocked: [] };
const cachePath = value => typeof value === 'string' && value.startsWith(cacheRoot + path.sep);
fs.readFileSync = function (filename, ...args) {
  if (cachePath(filename) && mode === 'cold') {
    evidence.misses.push(filename);
    throw Object.assign(new Error('Acceptance cold cache miss'), { code: 'ENOENT' });
  }
  const value = read.call(this, filename, ...args);
  if (cachePath(filename)) evidence.reads.push(filename);
  return value;
};
fs.writeFileSync = function (filename, ...args) {
  const result = write.call(this, filename, ...args);
  if (cachePath(filename)) evidence.writes.push(filename);
  return result;
};
fs.renameSync = function (source, destination) {
  const result = rename.call(this, source, destination);
  if (cachePath(destination)) evidence.writes.push(destination);
  return result;
};
Module._load = function (request, parent, isMain) {
  const resolved = Module._resolveFilename(request, parent, isMain);
  const normalized = String(resolved).replaceAll('\\', '/');
  const compiler = /(?:^|\/)(?:typescript|ts-morph)(?:\/|$)/.test(request) ||
    /\/node_modules\/(?:typescript|ts-morph)\//.test(normalized);
  const generator = request === '@fluentui/api-metadata/generator' ||
    resolved === process.env.FLUENTUI_ACCEPTANCE_GENERATOR_ENTRY;
  if (mode === 'metadata' && (compiler || generator)) {
    evidence.blocked.push({ request, resolved });
    throw Object.assign(new Error('Acceptance blocked compiler/generator: ' + request), { code: 'ACCEPTANCE_RUNTIME_BLOCKED' });
  }
  if (/\/node_modules\/@fluentui\/(?:cli|api-metadata)\//.test(normalized)) {
    if (!resolved.startsWith(process.env.FLUENTUI_ACCEPTANCE_MODULES_ROOT + path.sep) || fs.realpathSync(resolved) !== resolved) {
      evidence.blocked.push({ request, resolved });
      throw new Error('Acceptance rejected non-extracted runtime: ' + resolved);
    }
    if (!evidence.loaded.includes(resolved)) evidence.loaded.push(resolved);
  }
  return load.call(this, request, parent, isMain);
};
process.on('exit', () => write(process.env.FLUENTUI_ACCEPTANCE_PROBE_OUTPUT, JSON.stringify(evidence, null, 2) + '\n'));
`;

function writeEvidence(name, value) {
  const destination = path.join(evidenceRoot, name);
  if (fs.existsSync(destination)) {
    assert.equal(fs.realpathSync(destination), destination, `Evidence must not follow symlinks: ${destination}`);
  }
  fs.writeFileSync(destination, typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`);
}

function hashFile(filename) {
  return createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
}

function protectedFiles() {
  const files = {};
  const visit = directory => {
    for (const entry of fs
      .readdirSync(directory, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name))) {
      if (['node_modules', '.cache', 'dist', 'test-results', 'playwright-report', 'evidence'].includes(entry.name))
        continue;
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(filename);
      else
        files[path.relative(demoRoot, filename)] = entry.isSymbolicLink()
          ? fs.readlinkSync(filename)
          : hashFile(filename);
    }
  };
  for (const appRoot of [v8Root, modernRoot]) visit(appRoot);
  for (const entry of fs.readdirSync(demoRoot, { withFileTypes: true })) {
    const filename = path.join(demoRoot, entry.name);
    if (entry.isFile()) files[entry.name] = hashFile(filename);
    else if (entry.name === '.git' && entry.isDirectory()) visit(filename);
  }
  return files;
}

function installedPackage(appRoot, name, importer = path.join(appRoot, 'package.json')) {
  const requireInstalled = createRequire(importer);
  let entry;
  try {
    entry = requireInstalled.resolve(`${name}/package.json`);
  } catch {
    entry = requireInstalled.resolve(name);
  }
  let root = path.dirname(entry);
  while (!fs.existsSync(path.join(root, 'package.json'))) {
    const parent = path.dirname(root);
    assert.notEqual(parent, root, `Cannot locate installed manifest: ${name}`);
    root = parent;
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(manifest.name, name);
  assert.ok(root.startsWith(path.join(appRoot, 'node_modules') + path.sep), `${name} is not installed in ${appRoot}`);
  assert.equal(fs.realpathSync(root), root, `${name} must be extracted, not linked`);
  const main = requireInstalled.resolve(name);
  assert.ok(main.startsWith(root + path.sep), `${name} main escaped its installed root`);
  assert.equal(fs.realpathSync(main), main);
  return { root, version: manifest.version, manifest, main, mainHash: hashFile(main) };
}

function installedCli(appRoot) {
  assert.equal(fs.realpathSync(appRoot), appRoot, 'App roots must not be symlinks');
  assert.ok(fs.statSync(path.join(appRoot, 'src')).isDirectory(), `Missing source directory: ${appRoot}`);
  const cli = installedPackage(appRoot, '@fluentui/cli');
  const metadata = installedPackage(appRoot, '@fluentui/api-metadata', cli.main);
  const bin = path.resolve(cli.root, cli.manifest.bin['fluentui-cli']);
  assert.ok(bin.startsWith(cli.root + path.sep));
  assert.equal(fs.realpathSync(bin), bin);
  const generator = createRequire(cli.main).resolve('@fluentui/api-metadata/generator');
  assert.ok(generator.startsWith(metadata.root + path.sep));
  assert.equal(fs.realpathSync(generator), generator);
  const cache = createRequire(cli.main)(path.join(cli.root, 'dist/src/utils/catalog-cache.js'));
  const cacheRoot = path.join(cache.findRepoRoot(appRoot), '.cache/fluentui-cli');
  return { appRoot, cli, metadata, bin, binHash: hashFile(bin), generator, cacheRoot };
}

function runCommand(name, installation, args, verify, options = {}) {
  const timeout = Math.min(options.timeout ?? 180_000, budget - (performance.now() - started));
  assert.ok(timeout > 0, `Acceptance budget exhausted before ${name}; remaining checks did not run`);
  const probePath = path.join(evidenceRoot, `${name}.probe.json`);
  writeEvidence(`${name}.probe.json`, { active: false });
  const nodeArgs = [
    '--require',
    path.join(evidenceRoot, 'preload.cjs'),
    ...(options.nodeArgs ?? [installation.bin, ...args]),
  ];
  const begin = performance.now();
  const result = spawnSync(process.execPath, nodeArgs, {
    cwd: options.cwd ?? installation.appRoot,
    env: {
      ...process.env,
      NODE_OPTIONS: '',
      NODE_PATH: '',
      NO_COLOR: undefined,
      FORCE_COLOR: '0',
      FLUENTUI_ACCEPTANCE_PROBE_MODE: options.probeMode ?? 'observe',
      FLUENTUI_ACCEPTANCE_PROBE_OUTPUT: probePath,
      FLUENTUI_ACCEPTANCE_GENERATOR_ENTRY: installation.generator,
      FLUENTUI_ACCEPTANCE_MODULES_ROOT: path.join(installation.appRoot, 'node_modules'),
      FLUENTUI_ACCEPTANCE_CACHE_ROOT: installation.cacheRoot,
    },
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    timeout: Math.ceil(timeout),
    killSignal: 'SIGKILL',
  });
  const record = {
    name,
    command: [process.execPath, ...nodeArgs],
    cwd: options.cwd ?? installation.appRoot,
    durationMs: performance.now() - begin,
    timeoutMs: timeout,
    exitCode: result.status,
    signal: result.signal,
    processError: result.error?.message,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    status: 'failed',
  };
  const item = { name, artifact: `${name}.json`, durationMs: record.durationMs, status: 'failed' };
  summary.commands.push(item);
  try {
    record.probe = JSON.parse(fs.readFileSync(probePath, 'utf8'));
    if (!options.nodeArgs) {
      try {
        record.output = JSON.parse(record.stdout);
      } catch (error) {
        record.outputParseError = error.message;
      }
    }
    assert.ok(!result.error, `${name}: ${result.error?.message}`);
    assert.equal(result.signal, null, `${name} terminated by ${result.signal}`);
    assert.equal(result.status, options.exitCode ?? 0, `${name}: ${record.stdout}\n${record.stderr}`);
    assert.equal(record.probe.active, true, `${name}: preload did not complete`);
    if (!options.nodeArgs) {
      assert.deepEqual(record.probe.blocked, [], `${name}: runtime escaped or loaded a blocked dependency`);
      assert.ok(record.probe.loaded.some(filename => filename.startsWith(installation.cli.root + path.sep)));
      assert.ok(!record.outputParseError, `${name}: invalid JSON output: ${record.outputParseError}`);
      assert.ok(
        !`${record.stdout}\n${record.stderr}`.includes('catalog.packageNotFound'),
        `${name}: unrelated absent catalog warning`,
      );
      assert.ok(!record.output.diagnostics?.some(diagnostic => /packageNotFound/.test(diagnostic.code)));
    }
    verify(record);
    record.status = item.status = 'passed';
  } catch (error) {
    record.assertion = error.stack ?? String(error);
    throw error;
  } finally {
    writeEvidence(`${name}.json`, record);
    writeEvidence('summary.json', summary);
    console.log(`${name}: ${record.status} (${Math.round(record.durationMs)} ms)`);
  }
  return record;
}

function envelope(record, type) {
  assert.equal(record.output.apiVersion, '1');
  assert.equal(record.output.type, type);
  assert.ok(Array.isArray(record.output.diagnostics));
  if (type !== 'fluentui.error') assert.notEqual(record.output.status, 'unavailable');
  return record.output.data;
}

function detail(record, name, from, typeOnly = false) {
  const result = envelope(record, 'fluentui.api-detail.dense').result;
  assert.equal(result.name, name);
  assert.equal(result.detailStatus, 'available');
  assert.equal(result.importStatus, 'selected');
  assert.equal(result.recommendedImport.exportName, name);
  assert.equal(result.recommendedImport.typeOnly, typeOnly);
  if (from) assert.equal(result.recommendedImport.moduleSpecifier, from);
  assert.ok(result.recommendedImport.statement.startsWith(typeOnly ? 'import type ' : 'import '));
  assert.ok(result.provenance.routes.length > 0);
  if (from) assert.ok(result.provenance.routes.every(route => route.importPath === from));
  for (const view of [...(result.props ?? []), ...(result.members ? [result.members] : [])]) {
    assert.ok(view.total > 0 && view.members.length > 0);
    assert.notEqual(view.status.status, 'unsupported');
    assert.equal(view.total, view.members.length + view.omittedInherited);
    for (const member of view.members) {
      assert.equal(typeof member.required, 'boolean');
      assert.ok(member.readonly === undefined || member.readonly === true);
      assert.ok(['control', 'unclassified', 'inherited'].includes(member.origin));
    }
  }
  return result;
}

function button(record, name, from) {
  const result = detail(record, name, from);
  assert.ok(result.facets.includes('component'), `${name} must retain its component facet`);
  assert.ok(
    result.props?.some(view => view.members.length > 0),
    `${name} must expose actual props`,
  );
  if (result.provenance.package === '@fluentui/react') {
    assert.equal(result.provenance.version, '8.125.8');
    const members = result.props.flatMap(view => view.members);
    for (const prop of ['text', 'disabled']) {
      assert.ok(
        members.some(member => member.name === prop && typeof member.type === 'string'),
        `Missing ${name}.${prop}`,
      );
    }
  }
  return result;
}

function observeSource(appRoot) {
  const compiler = createRequire(path.join(appRoot, 'package.json'))('typescript');
  const observations = { files: [], packages: {} };
  const visitDirectory = directory => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) visitDirectory(filename);
      else if (/\.[cm]?[jt]sx?$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
        observations.files.push(path.relative(appRoot, filename));
        const source = compiler.createSourceFile(
          filename,
          fs.readFileSync(filename, 'utf8'),
          compiler.ScriptTarget.Latest,
          true,
        );
        const bindings = new Map();
        for (const statement of source.statements) {
          if (!compiler.isImportDeclaration(statement) || !compiler.isStringLiteral(statement.moduleSpecifier))
            continue;
          const moduleSpec = statement.moduleSpecifier.text;
          const imports = statement.importClause?.namedBindings;
          if (!imports || !compiler.isNamedImports(imports)) continue;
          const symbols = (observations.packages[moduleSpec] ??= {});
          for (const imported of imports.elements) {
            const name = (imported.propertyName ?? imported.name).text;
            const symbol = (symbols[name] ??= { imports: 0, typeOnly: false, jsx: 0, props: {}, calls: 0 });
            symbol.imports++;
            symbol.typeOnly ||= Boolean(statement.importClause.isTypeOnly || imported.isTypeOnly);
            bindings.set(imported.name.text, symbol);
          }
        }
        const visitNode = node => {
          if (compiler.isJsxOpeningElement(node) || compiler.isJsxSelfClosingElement(node)) {
            const symbol = bindings.get(node.tagName.getText(source));
            if (symbol) {
              symbol.jsx++;
              for (const attribute of node.attributes.properties) {
                if (compiler.isJsxAttribute(attribute)) {
                  const name = attribute.name.getText(source);
                  symbol.props[name] = (symbol.props[name] ?? 0) + 1;
                }
              }
            }
          } else if (compiler.isCallExpression(node)) {
            const symbol = bindings.get(node.expression.getText(source));
            if (symbol) symbol.calls++;
          }
          compiler.forEachChild(node, visitNode);
        };
        visitNode(source);
      }
    }
  };
  visitDirectory(path.join(appRoot, 'src'));
  observations.files.sort();
  return observations;
}

function usage(record, observed, packageName, prefix = '') {
  const report = record.output;
  assert.ok(report.fileMap.length > 0, 'Usage fileMap must not be empty');
  assert.deepEqual([...report.fileMap].sort(), observed.files.map(filename => `${prefix}${filename}`).sort());
  assert.ok(report.fileMap.every(filename => filename.startsWith(`${prefix}src/`) && !filename.includes('..')));
  const selected = Object.entries(observed.packages).filter(
    ([moduleSpec]) => moduleSpec === packageName || moduleSpec.startsWith(`${packageName}/`),
  );
  assert.ok(selected.length > 0, `No actual ${packageName} imports observed`);
  assert.deepEqual(Object.keys(report.packages).sort(), selected.map(([moduleSpec]) => moduleSpec).sort());
  for (const [moduleSpec, symbols] of selected) {
    const actual = report.packages[moduleSpec];
    assert.equal(
      actual.count,
      Object.values(symbols).reduce((total, symbol) => total + symbol.imports, 0),
    );
    assert.deepEqual(actual.unknowns, {}, `Known imports must not be unknown: ${moduleSpec}`);
    for (const [name, observedSymbol] of Object.entries(symbols)) {
      if (observedSymbol.jsx > 0) {
        const component = actual.components[name];
        assert.ok(component, `Missing component ${moduleSpec}:${name}`);
        assert.equal(component.count, observedSymbol.jsx, `Incorrect JSX count for ${name}`);
        for (const [prop, count] of Object.entries(observedSymbol.props)) {
          assert.equal(component.props[prop]?.count, count, `Incorrect ${name}.${prop} count`);
          assert.ok(Array.isArray(component.props[prop].values) && component.props[prop].values.length > 0);
        }
      } else if (observedSymbol.typeOnly) {
        assert.ok(actual.types[name]?.count >= observedSymbol.imports, `Missing type usage ${name}`);
      } else {
        const value = actual.others[name] ?? actual.hooks[name] ?? actual.types[name];
        assert.ok(
          value?.count >= Math.max(observedSymbol.imports, observedSymbol.calls),
          `Missing value usage ${name}`,
        );
      }
    }
  }
  return report;
}

function verifyAcceptance() {
  protectedBefore = protectedFiles();
  const legacy = installedCli(v8Root);
  const modern = installedCli(modernRoot);
  const v8 = installedPackage(v8Root, '@fluentui/react');
  assert.equal(v8.version, '8.125.8');
  assert.equal(installedPackage(v8Root, 'react').version.split('.')[0], '18');
  assert.equal(installedPackage(modernRoot, 'react').version.split('.')[0], '19');
  for (const packageName of ['@fluentui/react-components', '@fluentui/react-headless-components-preview']) {
    installedPackage(modernRoot, packageName);
  }
  const config = JSON.parse(fs.readFileSync(path.join(v8Root, 'fluentui.config.json'), 'utf8'));
  assert.equal(config.schemaVersion, 1);
  assert.ok(config.systems && typeof config.systems === 'object');
  summary.installations = [legacy, modern];
  summary.v8Config = config;
  const apiArgs = (name, selector, mode = 'prefer') => [
    'api',
    ...(name ? [name] : []),
    ...selector,
    '--metadata-mode',
    mode,
    '--json',
    '--dense',
    '--verbose',
  ];
  const rootSelector = ['--from', '@fluentui/react'];
  const subpath = '@fluentui/react/lib/Button';
  runCommand(
    'catalog-cache-build',
    legacy,
    ['cache', 'build', '--package', '@fluentui/react', '--json'],
    record => assert.ok(record.output.data.packages.every(entry => entry.state === 'ready')),
    { timeout: 900_000 },
  );
  const requireLegacy = createRequire(legacy.cli.main);
  const store = requireLegacy(path.join(legacy.cli.root, 'dist/src/utils/catalog-cache.js'));
  const inventory = requireLegacy(path.join(legacy.cli.root, 'dist/src/utils/catalog-inventory.js'));
  const cacheOptions = { cwd: v8Root, package: '@fluentui/react' };
  const root = inventory.getCatalogInventory(cacheOptions).roots[0];
  const cached = store.getCachedPackageCatalog(root, cacheOptions);
  assert.ok(cached && cached.source === 'declarations');
  const cold = runCommand(
    'root-button-cached-first',
    legacy,
    apiArgs('Button', rootSelector),
    record => button(record, 'Button', '@fluentui/react'),
    { probeMode: 'metadata' },
  );
  const route = cached.index.exports.find(
    entry => entry.entrypoint === '.' && entry.export === 'Button' && entry.namespace === 'value',
  );
  assert.equal(route.target.kind, 'local');
  const descriptor = cached.index.records.find(entry => entry.id === route.target.record);
  const cacheEntries = [
    cached.metadataFile,
    path.join(cached.metadataRoot, 'state.json'),
    path.join(cached.metadataRoot, descriptor.path),
  ].map(filename => ({ path: filename, sha256: hashFile(filename), bytes: fs.statSync(filename).size }));
  assert.deepEqual(cold.probe.writes, [], 'Ready lookup rewrote canonical cache entries');
  const warm = runCommand(
    'root-button-warm',
    legacy,
    apiArgs('Button', rootSelector),
    record => {
      button(record, 'Button', '@fluentui/react');
      assert.deepEqual(record.output, cold.output);
      assert.ok(
        cacheEntries.every(entry => record.probe.reads.includes(entry.path)),
        'Warm query did not read the produced cache',
      );
      assert.deepEqual(record.probe.writes, [], 'Warm query regenerated or rewrote cache entries');
      for (const entry of cacheEntries) assert.equal(hashFile(entry.path), entry.sha256);
    },
    { probeMode: 'metadata' },
  );
  summary.cache = {
    cwd: v8Root,
    entries: cacheEntries,
    firstCachedMs: cold.durationMs,
    warmMs: warm.durationMs,
    speedup: cold.durationMs / warm.durationMs,
    timingIsInformational: true,
  };
  writeEvidence('timings.json', summary.cache);
  runCommand('root-button-off', legacy, apiArgs('Button', rootSelector, 'off'), record =>
    button(record, 'Button', '@fluentui/react'),
  );
  for (const mode of ['prefer', 'off']) {
    for (const name of ['Button', 'PrimaryButton']) {
      runCommand(`subpath-${name}-${mode}`, legacy, apiArgs(name, ['--from', subpath], mode), record =>
        button(record, name, subpath),
      );
    }
    for (const from of ['@fluentui/react', subpath]) {
      const listing = runCommand(
        `listing-${from === subpath ? 'subpath' : 'root'}-${mode}`,
        legacy,
        apiArgs(undefined, ['--from', from], mode),
        record => {
          const routes = envelope(record, 'fluentui.api-index.dense').result;
          assert.ok(routes.length > 0);
          assert.ok(routes.every(route => route.importPath === from && route.authority === 'declarations'));
          for (const name of ['Button', 'PrimaryButton', 'IButtonProps'])
            assert.ok(
              routes.some(route => route.name === name),
              `Listing missing ${name}`,
            );
          assert.equal(
            routes.some(route => route.name === 'Checkbox'),
            from === '@fluentui/react',
          );
        },
      );
      assert.ok(listing.output.data.result.some(route => route.name === 'IButtonProps' && route.typeOnly));
    }
    const props = runCommand(`button-props-${mode}`, legacy, apiArgs('IButtonProps', rootSelector, mode), record => {
      const result = detail(record, 'IButtonProps', '@fluentui/react', true);
      assert.ok(result.members.members.some(member => member.name === 'text' && member.required === false));
    });
    runCommand(
      `button-props-full-${mode}`,
      legacy,
      ['api', 'IButtonProps', ...rootSelector, '--metadata-mode', mode, '--json'],
      record => {
        const full = envelope(record, 'fluentui.api-detail').result;
        const members = full.symbol.effectiveType.members;
        assert.ok(members.length > 0);
        for (const member of props.output.data.result.members.members) {
          const original = members.find(candidate => candidate.name === member.name);
          assert.ok(original, `Dense member missing from full JSON: ${member.name}`);
          assert.equal(member.required, !original.optional);
          assert.equal(Boolean(member.readonly), Boolean(original.readonly));
        }
        assert.equal(props.output.data.result.provenance.package, full.package);
        assert.equal(props.output.data.result.provenance.version, full.version);
      },
    );
  }
  const system = runCommand('system-button', legacy, apiArgs('Button', ['--system', 'fluent-v8']), record => {
    const result = button(record, 'Button');
    assert.ok(result.provenance.routes.some(route => route.importPath === '@fluentui/react'));
    assert.ok(result.provenance.routes.some(route => route.importPath === subpath));
  });
  summary.systemSelection = {
    publicPaths: Object.keys(v8.manifest.exports).filter(key => key !== './package.json').length,
    durationMs: system.durationMs,
  };
  runCommand(
    'unknown-system-symbol',
    legacy,
    apiArgs('__FluentuiAcceptanceMissingSymbol__', ['--system', 'fluent-v8']),
    record => {
      assert.equal(envelope(record, 'fluentui.error').code, 'CLI_API_NOT_FOUND');
    },
    { exitCode: 2 },
  );
  runCommand(
    'v8-metadata-required',
    legacy,
    apiArgs('Button', rootSelector, 'required'),
    record => {
      assert.equal(envelope(record, 'fluentui.error').code, 'CLI_METADATA_REQUIRED');
    },
    { exitCode: 1, timeout: 15_000, probeMode: 'metadata' },
  );

  const observedV8 = observeSource(v8Root);
  const observedModern = observeSource(modernRoot);
  writeEvidence('source-observations.json', { v8: observedV8, modern: observedModern });
  for (const [moduleSpec, category, names] of [
    ['@fluentui/react/lib/Button', 'jsx', ['DefaultButton', 'PrimaryButton']],
    ['@fluentui/react/lib/Checkbox', 'jsx', ['Checkbox']],
    ['@fluentui/react/lib/Pivot', 'jsx', ['Pivot', 'PivotItem']],
    ['@fluentui/react/lib/TextField', 'jsx', ['TextField']],
    ['@fluentui/react/lib/TextField', 'typeOnly', ['ITextField']],
    ['@fluentui/react/lib/Styling', 'calls', ['getTheme', 'mergeStyleSets']],
  ]) {
    for (const name of names)
      assert.ok(observedV8.packages[moduleSpec]?.[name]?.[category], `Demo fixture missing ${moduleSpec}:${name}`);
  }
  const usageArgs = (root, include, selector) => [
    'report',
    'usage',
    '--path',
    root,
    '--include',
    include,
    ...selector,
    '--reporter',
    'json',
  ];
  const v8Usage = runCommand(
    'usage-v8-system',
    legacy,
    usageArgs(v8Root, 'src/**', ['--system', 'fluent-v8']),
    record => usage(record, observedV8, '@fluentui/react'),
  );
  for (const name of ['getTheme', 'mergeStyleSets']) {
    assert.ok(v8Usage.output.packages['@fluentui/react/lib/Styling'].others[name]?.count > 0);
  }
  runCommand('usage-v8-package', legacy, usageArgs(v8Root, 'src/**', ['--package', '@fluentui/react']), record => {
    usage(record, observedV8, '@fluentui/react');
    assert.deepEqual(record.output.packages, v8Usage.output.packages);
  });
  runCommand(
    'usage-shared-root',
    legacy,
    usageArgs(demoRoot, 'reference-v8/src/**', ['--package', '@fluentui/react']),
    record => {
      usage(record, observedV8, '@fluentui/react', 'reference-v8/');
      assert.deepEqual(record.output.packages, v8Usage.output.packages);
    },
    { cwd: demoRoot },
  );
  for (const packageName of ['@fluentui/react-components', '@fluentui/react-headless-components-preview']) {
    runCommand(
      `usage-${packageName.endsWith('preview') ? 'headless' : 'styled'}`,
      modern,
      usageArgs(modernRoot, 'src/**', ['--package', packageName]),
      record => usage(record, observedModern, packageName),
    );
  }
  for (const dependency of ['typescript', 'ts-morph', '@fluentui/api-metadata/generator']) {
    const entry = createRequire(modern.cli.main).resolve(dependency);
    runCommand(
      `probe-block-${dependency.split('/').at(-1)}`,
      modern,
      [],
      record => {
        assert.equal(record.probe.blocked.length, 1);
        assert.ok(record.stderr.includes('ACCEPTANCE_RUNTIME_BLOCKED'));
      },
      { exitCode: 1, probeMode: 'metadata', nodeArgs: ['-e', 'require(process.argv[1])', entry] },
    );
  }
  for (const from of ['@fluentui/react-components', '@fluentui/react-headless-components-preview/button']) {
    runCommand(
      `metadata-${from.endsWith('/button') ? 'headless' : 'styled'}-button`,
      modern,
      apiArgs('Button', ['--from', from], 'required'),
      record => {
        const result = button(record, 'Button', from);
        assert.ok(result.provenance.routes.every(route => route.authority === 'metadata'));
        assert.ok(record.probe.loaded.some(filename => filename.startsWith(modern.metadata.root + path.sep)));
      },
      { probeMode: 'metadata' },
    );
  }
  for (const installation of [legacy, modern]) {
    assert.equal(hashFile(installation.bin), installation.binHash, 'CLI was replaced during acceptance');
    for (const installed of [installation.cli, installation.metadata]) {
      assert.equal(hashFile(installed.main), installed.mainHash, 'Installed runtime was replaced during acceptance');
    }
  }
}

try {
  for (const directory of [path.join(demoRoot, 'evidence'), evidenceRoot]) {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
    assert.equal(fs.realpathSync(directory), directory, 'Evidence directories must not be symlinks');
  }
  writeEvidence('summary.json', summary);
  writeEvidence('preload.cjs', preloadSource);
  verifyAcceptance();
  summary.status = 'passed';
} catch (error) {
  summary.status = 'failed';
  summary.failure = error.stack ?? String(error);
  console.error(summary.failure);
  process.exitCode = 1;
} finally {
  if (protectedBefore) {
    try {
      assert.deepEqual(protectedFiles(), protectedBefore, 'Consumer source, config, manifests, or Git files changed');
      summary.preservation = { status: 'passed', files: Object.keys(protectedBefore).length };
    } catch (error) {
      summary.status = 'failed';
      summary.preservation = { status: 'failed', failure: error.stack ?? String(error) };
      process.exitCode = 1;
    }
  }
  summary.finishedAt = new Date().toISOString();
  summary.durationMs = performance.now() - started;
  if (fs.existsSync(evidenceRoot) && fs.realpathSync(evidenceRoot) === evidenceRoot)
    writeEvidence('summary.json', summary);
  console.log(`v8 acceptance: ${summary.status}; evidence: ${evidenceRoot}`);
}
