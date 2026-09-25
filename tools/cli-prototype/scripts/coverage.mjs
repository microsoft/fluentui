import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const configuredRoot = process.env.FLUENTUI_PLAYGROUND_ROOT;
if (!configuredRoot) {
  throw new Error('FLUENTUI_PLAYGROUND_ROOT is required');
}
const root = resolve(configuredRoot);
const output = join(root, 'artifacts/api-coverage');
const manifestPath = resolve(dirname(scriptPath), '../.artifacts/pack-manifest.json');
const manifestText = readFileSync(manifestPath, 'utf8');
const manifest = JSON.parse(manifestText);
const packFingerprint = createHash('sha256').update(manifestText).digest('hex');
const requireConsumer = createRequire(join(root, 'package.json'));
const catalogs = manifest.packages.filter(definition => definition.catalog);
mkdirSync(output, { recursive: true });

const stage = process.argv[2] ?? 'all';
if (stage === 'all') {
  runStage('bindings');
  runStage('resolve', true);
  for (const packageName of [
    '@fluentui/react-components',
    '@fluentui/react-headless-components-preview',
    '@fluentui/keyboard-keys',
  ]) {
    runStage('profile', false, packageName);
  }
  console.log(`Exhaustive installed API coverage passed; evidence: ${output}`);
} else if (stage === 'bindings') {
  collectBindings();
} else if (stage === 'resolve') {
  resolveBindings();
} else if (stage === 'profile') {
  await profileGeneration(process.argv[3]);
} else {
  throw new Error(`Unknown coverage stage: ${stage}`);
}

function runStage(name, parserFree = false, packageName) {
  const label = packageName ? `${name}-${packageName.replace(/^@/, '').replaceAll('/', '-')}` : name;
  const probePath = join(output, `${label}.probe.json`);
  const env = { ...process.env };
  if (parserFree) {
    env.FLUENTUI_CLI_PROBE_OUTPUT = probePath;
    env.NODE_OPTIONS = [env.NODE_OPTIONS, `--require=${join(root, 'scripts/module-probe.cjs')}`]
      .filter(Boolean)
      .join(' ');
  }
  const result = spawnSync(process.execPath, [scriptPath, name, ...(packageName ? [packageName] : [])], {
    cwd: root,
    encoding: 'utf8',
    env,
    maxBuffer: 16 * 1024 * 1024,
  });
  writeFileSync(join(output, `${label}.stdout.log`), result.stdout ?? '');
  writeFileSync(join(output, `${label}.stderr.log`), result.stderr ?? '');
  if (result.error || result.status !== 0) {
    throw new Error(`${name} failed: ${result.error?.message ?? result.stderr ?? result.stdout}`);
  }
  if (parserFree) {
    const probe = JSON.parse(readFileSync(probePath, 'utf8'));
    if (probe.typeScriptModules.length || probe.generatorModules.length) {
      throw new Error(`Required-mode matrix loaded compiler/generator modules: ${JSON.stringify(probe)}`);
    }
  }
}

async function profileGeneration(packageName) {
  const definition = catalogs.find(pkg => pkg.packageName === packageName);
  if (!definition) {
    throw new Error(`Cannot profile unselected catalog ${packageName}`);
  }
  const packageRoot = join(root, 'node_modules', packageName);
  const installed = JSON.parse(readFileSync(join(packageRoot, 'dist/metadata/index.json'), 'utf8'));
  const { generateApiMetadata } = requireConsumer('@fluentui/api-metadata/generator');
  const { serializeMetadata } = requireConsumer('@fluentui/api-metadata');
  const start = performance.now();
  const generated = await generateApiMetadata({ packageRoot, system: installed.system });
  const generationMs = elapsed(start);
  if (
    generated.index.completeness.api.status !== 'complete' ||
    generated.index.exports.length !== installed.exports.length
  ) {
    throw new Error(`Regeneration did not retain complete installed coverage for ${packageName}`);
  }
  const serializationStart = performance.now();
  const sizes = generated.records.map(record => Buffer.byteLength(serializeMetadata(record)));
  writeJson(`profile-${packageName.replace(/^@/, '').replaceAll('/', '-')}.json`, {
    schemaVersion: 1,
    package: packageName,
    packFingerprint,
    generationMs,
    serializationMs: elapsed(serializationStart),
    routes: generated.index.exports.length,
    records: generated.records.length,
    totalRecordBytes: sizes.reduce((total, bytes) => total + bytes, 0),
    largestRecordBytes: Math.max(0, ...sizes),
    maximumResidentSetKilobytes: process.resourceUsage().maxRSS,
    memory: process.memoryUsage(),
  });
}

function collectBindings() {
  const started = performance.now();
  const ts = requireConsumer('typescript');
  const packages = catalogs.map(definition => {
    const packageRoot = join(root, 'node_modules', definition.packageName);
    const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
    return {
      package: packageJson.name,
      version: packageJson.version,
      entrypoints: declarationEntrypoints(packageJson, packageRoot),
    };
  });
  const program = ts.createProgram(
    packages.flatMap(pkg => pkg.entrypoints.map(entry => join(root, 'node_modules', pkg.package, entry.path))),
    {
      noEmit: true,
      strict: true,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      types: [],
    },
  );
  const checker = program.getTypeChecker();
  for (const pkg of packages) {
    for (const entry of pkg.entrypoints) {
      const filePath = join(root, 'node_modules', pkg.package, entry.path);
      const source = program.getSourceFile(filePath);
      const module = source && checker.getSymbolAtLocation(source);
      if (!module) {
        throw new Error(`Published declaration is not a readable module: ${pkg.package}/${entry.path}`);
      }
      entry.bindings = checker.getExportsOfModule(module).flatMap(symbol => {
        const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
        if (!target.declarations?.length) {
          throw new Error(`Unresolved public declaration: ${pkg.package}${entry.entrypoint} ${symbol.name}`);
        }
        const namespaces = [];
        if (symbol.declarations?.some(declaration => ts.isNamespaceExport(declaration))) {
          namespaces.push('value');
        } else {
          if (target.flags & ts.SymbolFlags.Type) {
            namespaces.push('type');
          }
          if (target.flags & ts.SymbolFlags.Value) {
            namespaces.push('value');
          }
          if (!namespaces.length && target.flags & ts.SymbolFlags.NamespaceModule) {
            namespaces.push('type');
          }
        }
        if (!namespaces.length) {
          throw new Error(`Unclassified public binding: ${pkg.package} ${symbol.name} (${target.flags})`);
        }
        return namespaces.map(namespace => ({ export: symbol.name, namespace }));
      });
      entry.bindings.sort((left, right) => bindingKey(left).localeCompare(bindingKey(right)));
    }
  }
  writeJson('bindings.json', {
    schemaVersion: 1,
    packFingerprint,
    source: 'installed-export-maps-and-typescript-checker',
    compilerVersion: ts.version,
    durationMs: elapsed(started),
    packages,
    exclusions: manifest.exclusions,
  });
}

function declarationEntrypoints(packageJson, packageRoot) {
  const entries = [];
  const exports = packageJson.exports;
  const publicExports =
    exports === undefined
      ? { '.': { types: packageJson.types ?? packageJson.typings } }
      : exports &&
        typeof exports === 'object' &&
        !Array.isArray(exports) &&
        Object.keys(exports).some(key => key.startsWith('.'))
      ? exports
      : { '.': exports };
  for (const [entrypoint, value] of Object.entries(publicExports)) {
    if (entrypoint.endsWith('.json') || entrypoint.endsWith('.css') || value === null) {
      continue;
    }
    visit(value, []);

    function visit(target, conditions) {
      if (typeof target === 'string' && /\.d\.(?:c|m)?ts$/.test(target)) {
        if (target.includes('*') || entrypoint.includes('*')) {
          const pieces = target.split('*');
          const pattern = new RegExp(
            `^${pieces.map(piece => piece.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('(.*)')}$`,
          );
          for (const path of packageFiles(packageRoot)) {
            const match = pattern.exec(`./${path}`);
            if (match) {
              entries.push({
                entrypoint: entrypoint.replaceAll('*', match[1]),
                path,
                conditions,
              });
            }
          }
        } else {
          containedPath(packageRoot, target);
          entries.push({ entrypoint, path: target, conditions });
        }
      } else if (Array.isArray(target)) {
        throw new Error(`${packageJson.name} ${entrypoint} requires explicit export-array fallback verification`);
      } else if (target && typeof target === 'object') {
        for (const [condition, child] of Object.entries(target)) {
          visit(child, [...conditions, condition]);
        }
      }
    }
  }
  if (!entries.length) {
    throw new Error(`${packageJson.name} has no independently discoverable public declaration targets`);
  }
  const unique = new Map(
    entries.map(entry => [JSON.stringify([entry.entrypoint, entry.path, entry.conditions]), entry]),
  );
  return [...unique.values()];
}

function resolveBindings() {
  const started = performance.now();
  const expected = JSON.parse(readFileSync(join(output, 'bindings.json'), 'utf8'));
  if (expected.packFingerprint !== packFingerprint || expected.packages.length !== catalogs.length) {
    throw new Error('Expected binding inventory does not match the current packed packages');
  }
  const { createMetadataReader } = requireConsumer('@fluentui/api-metadata');
  const rows = [];
  const packages = [];
  const failures = [];
  const importer = join(root, 'package.json');
  const forbiddenDiagnostics = new Set([
    'reader.dependencyInputUnavailable',
    'reader.indexPartial',
    'reader.recordPartial',
  ]);
  for (const pkg of expected.packages) {
    const packageStarted = performance.now();
    let reader = createMetadataReader();
    let catalog = reader.loadPackageIndex(pkg.package, importer);
    const routes = catalog.index.exports;
    const actualKeys = new Set(routes.map(bindingKey));
    const expectedKeys = new Set();
    const entrypoints = [];
    for (const entry of pkg.entrypoints) {
      entrypoints.push({
        entrypoint: entry.entrypoint,
        conditions: entry.conditions,
        declaration: entry.path,
        bindings: entry.bindings.length,
      });
      for (const binding of entry.bindings) {
        const key = bindingKey({ ...binding, entrypoint: entry.entrypoint, conditions: entry.conditions });
        expectedKeys.add(key);
        if (!actualKeys.has(key)) {
          failures.push(`${pkg.package}: missing public binding ${key}`);
        }
      }
    }
    for (const key of actualKeys) {
      if (!expectedKeys.has(key)) {
        failures.push(`${pkg.package}: metadata advertises a nonpublic or wrong-namespace binding ${key}`);
      }
    }
    if (actualKeys.size !== routes.length) {
      failures.push(`${pkg.package}: duplicate condition-specific export routes`);
    }
    if (catalog.index.completeness.api.status !== 'complete') {
      failures.push(`${pkg.package}: incomplete API index`);
    }
    if (['@fluentui/react-button', '@fluentui/react-headless-components-preview'].includes(pkg.package)) {
      for (const imported of routes.filter(route => route.conditions.includes('import'))) {
        const required = routes.find(
          route =>
            route.entrypoint === imported.entrypoint &&
            route.export === imported.export &&
            route.namespace === imported.namespace &&
            route.conditions.includes('require'),
        );
        if (!required || JSON.stringify(imported.target) !== JSON.stringify(required.target)) {
          failures.push(
            `${pkg.package}: equivalent module conditions do not share ${imported.entrypoint}:${imported.export}`,
          );
        }
      }
    }
    const records = catalog.index.records
      .filter(record => record.kind === 'api')
      .map(record => ({
        id: record.id,
        path: record.path,
        bytes: statSync(containedPath(catalog.metadataDirectory, record.path)).size,
      }));
    const effectiveTypes = {};
    const diagnostics = {};
    const durations = [];
    for (let index = 0; index < routes.length; index += 1) {
      if (index > 0 && index % 100 === 0) {
        reader = createMetadataReader();
        catalog = reader.loadPackageIndex(pkg.package, importer);
      }
      const route = routes[index];
      const row = {
        package: pkg.package,
        entrypoint: route.entrypoint,
        export: route.export,
        namespace: route.namespace,
        conditions: route.conditions,
      };
      const lookupStarted = performance.now();
      try {
        const result = reader.resolveExport({ ...row, importer });
        const definition = result.definition;
        if (!definition?.symbol.declarations.length) {
          throw new Error(`No declaration-backed API definition (${JSON.stringify(result.diagnostics)})`);
        }
        for (const diagnostic of result.diagnostics) {
          diagnostics[diagnostic.code] = (diagnostics[diagnostic.code] ?? 0) + 1;
          if (forbiddenDiagnostics.has(diagnostic.code)) {
            throw new Error(`${diagnostic.code}: ${diagnostic.message}`);
          }
        }
        const expansion = definition.symbol.effectiveType?.status.status ?? 'unavailable';
        effectiveTypes[expansion] = (effectiveTypes[expansion] ?? 0) + 1;
        Object.assign(row, {
          status: 'resolved',
          definitionPackage: definition.owner.package.name,
          definitionVersion: definition.owner.package.version,
          metadataPackage: definition.catalog.instance.package.name,
          record: definition.record.recordId,
          symbol: definition.symbol.id,
          effectiveType: expansion,
        });
      } catch (error) {
        row.status = 'failed';
        row.error = error instanceof Error ? error.message : String(error);
        failures.push(`${pkg.package} ${bindingKey(route)}: ${row.error}`);
      }
      row.durationMs = elapsed(lookupStarted);
      durations.push(row.durationMs);
      rows.push(row);
    }
    durations.sort((left, right) => left - right);
    packages.push({
      package: pkg.package,
      version: pkg.version,
      entrypoints,
      expectedBindings: expectedKeys.size,
      publishedBindings: routes.length,
      records,
      effectiveTypes,
      diagnostics,
      durationMs: elapsed(packageStarted),
      lookup: {
        medianMs: durations[Math.floor(durations.length / 2)] ?? 0,
        p95Ms: durations[Math.floor(durations.length * 0.95)] ?? 0,
        maximumMs: durations.at(-1) ?? 0,
      },
    });
  }
  writeJson('matrix.json', { schemaVersion: 1, packFingerprint, rows });
  writeJson('summary.json', {
    schemaVersion: 1,
    completedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'complete',
    packFingerprint,
    packageCount: packages.length,
    bindingCount: rows.length,
    durationMs: elapsed(started),
    packages,
    exclusions: expected.exclusions,
    failures,
  });
  if (failures.length) {
    throw new Error(`${failures.length} API coverage failures:\n${failures.slice(0, 20).join('\n')}`);
  }
}

function bindingKey(binding) {
  return JSON.stringify([
    binding.entrypoint,
    binding.export,
    binding.namespace,
    [...(binding.conditions ?? [])].sort(),
  ]);
}

function containedPath(base, path) {
  const target = resolve(base, path);
  const local = relative(base, target);
  if (isAbsolute(local) || local === '..' || local.startsWith('../') || !existsSync(target)) {
    throw new Error(`Missing or escaping published artifact: ${base} -> ${path}`);
  }
  return target;
}

function packageFiles(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(prefix, entry.name);
    return entry.isDirectory() ? packageFiles(join(directory, entry.name), path) : [path];
  });
}

function writeJson(name, value) {
  writeFileSync(join(output, name), `${JSON.stringify(value, null, 2)}\n`);
}

function elapsed(start) {
  return Math.round((performance.now() - start) * 100) / 100;
}
