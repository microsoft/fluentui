const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } = require('node:fs');
const { join, resolve } = require('node:path');

if (process.env.RCA_CLI_TEST_PRELOAD === '1') {
  // Babel and SWC are test-only oracles; the shipped CLI must use Oxc only.
  const Module = require('node:module');
  const originalLoad = Module._load;
  Module._load = function (request, ...args) {
    if (
      request.startsWith('@swc/') ||
      request.startsWith('@babel/') ||
      request === 'babel-plugin-react-compiler' ||
      /[/\\]@swc[/\\]|[/\\]@babel[/\\]|[/\\]babel-plugin-react-compiler(?:[/\\]|$)/.test(request)
    ) {
      throw new Error(`The Oxc-only CLI attempted to load a test-only Babel/SWC oracle: ${request}`);
    }
    return originalLoad.call(this, request, ...args);
  };
} else {
  runCliChecks();
}

function runCliChecks() {
  const Ajv = require('ajv');
  const root = resolve(__dirname, '../../..');
  const analyzeSchema = JSON.parse(readFileSync(join(root, 'rca.analyze.schema.json'), 'utf8'));
  const lintSchema = JSON.parse(readFileSync(join(root, 'rca.lint.schema.json'), 'utf8'));
  const configSchema = JSON.parse(readFileSync(join(root, 'rca.config.schema.json'), 'utf8'));
  const ajv = new Ajv({ allErrors: true });
  ajv.addSchema(analyzeSchema);
  const validateAnalyze = ajv.getSchema(analyzeSchema.$id);
  const validateLint = ajv.compile(lintSchema);
  const validateConfig = ajv.compile(configSchema);
  const directory = mkdtempSync(join(__dirname, '.cli-test-'));
  const originals = new Map([
    [
      'Positive.tsx',
      `import { useState } from 'react';
export function Example({ initial }: { initial: number }) {
  const [value] = useState(initial);
  return <output>{value + 1}</output>;
}
`,
    ],
    [
      'Guarded.tsx',
      `import { useState } from 'react';
export function Guarded({ initial }: { initial: number }) {
  'use no memo'; // justified: retain this application-reviewed guard
  const [value] = useState(initial);
  return <output>{value + 1}</output>;
}
`,
    ],
    ['rca.config.json', '{}\n'],
  ]);
  try {
    for (const [name, source] of originals) {
      writeFileSync(join(directory, name), source);
    }
    const analyze = invoke(['analyze', join(directory, 'Positive.tsx')], validateAnalyze);
    assert.equal(analyze.summary.functions, 1);
    assert.equal(analyze.summary.compiled, 1);
    assert.equal(analyze.summary.reportedMemoCachePositive, 1);
    assert.equal(analyze.summary.reportedMemoCacheZero, 0);
    assert.equal(analyze.summary.reportedMemoCacheUnavailable, 0);
    assert.equal(analyze.functions[0].compilerEvent, 'CompileSuccess');

    const preview = invoke(
      ['analyze', join(directory, 'Positive.tsx'), '--annotate', 'all', '--dry-run'],
      validateAnalyze,
    );
    assert.equal(preview.annotate.dryRun, true);
    assert.equal(preview.annotate.filesModified, 0);
    assert.equal(preview.annotate.functionsAnnotated, 0);
    assert.deepEqual(preview.annotate.planned, {
      filesModified: 1,
      functionsAnnotated: 1,
      functionsBailedOut: 0,
    });
    assert.equal(preview.annotate.targets.length, 1);
    const target = preview.annotate.targets[0];
    assert.ok(target.file.endsWith('Positive.tsx'));
    assert.equal(target.functionName, 'Example');
    assert.equal(target.directive, 'use memo');
    assert.equal(target.rationale, 'compiler-accepted-opt-in');
    assert.equal(target.reportedMemoCache, 'positive');
    assert.equal(target.emittedCaching, 'unverified');
    assert.deepEqual(target.riskRules, []);

    const lint = invoke(['lint', join(directory, 'Guarded.tsx'), '--fix', '--revalidate-justified'], validateLint);
    assert.equal(lint.summary.directives, 1);
    assert.equal(lint.directives.length, 1);
    assert.equal(lint.directives[0].justified, true);
    assert.equal(lint.directives[0].revalidated, true);
    assert.equal(lint.directives[0].evidence.emittedOptimization, 'not-measured');

    assert.equal(validateAnalyze({ ...analyze, schemaVersion: 3 }), false, 'v4 schema rejects v3 documents');
    assert.equal(validateLint({ ...lint, schemaVersion: 3 }), false, 'v4 lint schema rejects v3 documents');
    assert.equal(
      validateAnalyze({
        ...analyze,
        functions: [{ ...analyze.functions[0], memoStats: { memoSlots: 2, memoBlocks: null } }],
      }),
      false,
      'v4 schema rejects removed Babel-only counters',
    );

    checkInit(root, directory, validateConfig);
    checkLintFixes(root, validateLint);
    checkWorkspaceResolution(root, validateAnalyze);

    console.log(
      'CLI integration passed: strict schema-v4 analyze/lint JSON, Oxc profile, init, lint fixes, workspace resolution, no Babel/SWC loads.',
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }

  function invoke(args, validate) {
    const env = { ...process.env, RCA_CLI_TEST_PRELOAD: '1', NO_COLOR: '1' };
    delete env.FORCE_COLOR;
    const result = spawnSync(
      process.execPath,
      [
        '--require',
        __filename,
        join(root, 'bin/react-compiler-analyzer.js'),
        ...args,
        '--format',
        'json',
        '--config',
        join(directory, 'rca.config.json'),
      ],
      { cwd: directory, env, encoding: 'utf8', timeout: 30000, maxBuffer: 2 * 1024 * 1024 },
    );
    assert.ifError(result.error);
    assert.equal(result.status, 0, `${args.join(' ')}\n${result.stderr}\n${result.stdout}`);
    assert.notEqual(result.stdout.trim(), '', 'The CLI must emit JSON, not merely load its exported cli() function');
    assert.equal(result.stdout.trimStart()[0], '{', 'stdout must contain only one JSON document');
    const document = JSON.parse(result.stdout);
    assert.equal(validate(document), true, JSON.stringify(validate.errors, null, 2));
    assert.equal(document.schemaVersion, 4);
    assert.equal(document.emittedCaching, 'unverified');
    assert.equal(document.profile.backend, 'oxc');
    assert.equal(document.profile.mode, 'infer');
    assert.equal(document.profile.jsx, 'preserve');
    assert.equal(document.profile.outputMode, 'client');
    assert.equal(document.profile.sourcemap, true);
    assert.equal(document.profile.noEmit, false);
    assert.equal(document.profile.panicThreshold, 'none');
    assert.equal(document.profile.reportDiagnostics, true);
    assert.equal(document.profile.target, '19');
    assert.equal(document.profile.compilerVersion, require('oxc-transform-react/package.json').version);
    assert.equal(document.profile.parserVersion, require('oxc-parser/package.json').version);
    assert.deepEqual(document.profile.gating, {
      source: '__rca_gate__',
      importSpecifierName: '__rcaGate',
    });
    assert.deepEqual(readdirSync(directory).sort(), [...originals.keys()].sort());
    for (const [name, source] of originals) {
      assert.deepEqual(readFileSync(join(directory, name)), Buffer.from(source), `${name} was modified`);
    }
    return document;
  }
}

function runCli(root, args, cwd) {
  const env = { ...process.env, RCA_CLI_TEST_PRELOAD: '1', NO_COLOR: '1' };
  delete env.FORCE_COLOR;
  return spawnSync(process.execPath, ['--require', __filename, join(root, 'bin/react-compiler-analyzer.js'), ...args], {
    cwd,
    env,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 2 * 1024 * 1024,
  });
}

function invokeJson(root, args, cwd, configPath, validate) {
  const result = runCli(root, [...args, '--format', 'json', '--config', configPath], cwd);
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${args.join(' ')}\n${result.stderr}\n${result.stdout}`);
  assert.equal(result.stdout.trimStart()[0], '{', 'stdout must contain only one JSON document');
  const document = JSON.parse(result.stdout);
  assert.equal(validate(document), true, JSON.stringify(validate.errors, null, 2));
  assert.equal(document.schemaVersion, 4);
  assert.equal(document.profile.backend, 'oxc');
  return document;
}

function checkInit(root, parentDirectory, validateConfig) {
  const directory = join(parentDirectory, 'init-repo');
  mkdirSync(directory, { recursive: true });
  const configPath = join(directory, 'rca.config.json');
  const initial = runCli(root, ['init', '--yes', '--no-skill', '--config', configPath], directory);
  assert.ifError(initial.error);
  assert.equal(initial.status, 0, `${initial.stderr}\n${initial.stdout}`);
  let config = JSON.parse(readFileSync(configPath, 'utf8'));
  assert.equal(validateConfig(config), true, JSON.stringify(validateConfig.errors, null, 2));
  assert.equal(config.mode, 'infer');
  assert.equal(config.analyze, undefined, 'init must not enable risk analysis by default');
  assert.equal(config.parserPlugins, undefined);

  config = {
    ...config,
    analyze: { risks: { detectGetStateReads: true, resolveWrappers: false } },
  };
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
  const rerun = runCli(root, ['init', '--yes', '--no-skill', '--config', configPath], directory);
  assert.ifError(rerun.error);
  assert.equal(rerun.status, 0, `${rerun.stderr}\n${rerun.stdout}`);
  config = JSON.parse(readFileSync(configPath, 'utf8'));
  assert.equal(validateConfig(config), true, JSON.stringify(validateConfig.errors, null, 2));
  assert.equal(config.analyze.risks.resolveWrappers, false, 'init must preserve explicit wrapper opt-out');

  writeFileSync(configPath, '{"parserPlugins":["decorators-legacy"]}\n');
  const invalidConfig = runCli(root, ['analyze', 'missing.tsx', '--config', configPath], directory);
  assert.ifError(invalidConfig.error);
  assert.notEqual(invalidConfig.status, 0);
  assert.match(invalidConfig.stderr, /parserPlugins|parser plugin/i);

  const removedFlag = runCli(root, ['lint', 'missing.tsx', '--parser-plugin', 'decorators-legacy'], directory);
  assert.ifError(removedFlag.error);
  assert.notEqual(removedFlag.status, 0);
  assert.match(removedFlag.stderr, /parserPlugins|parser-plugin/i);
}

function checkLintFixes(root, validateLint) {
  const directory = mkdtempSync(join(__dirname, '.cli-lint-fix-'));
  const configPath = join(directory, 'rca.config.json');
  const redundantPath = join(directory, 'Redundant.tsx');
  const activePath = join(directory, 'Active.tsx');
  const config = '{}\n';
  const redundant = `import { useRef } from 'react';
export function useUncompilable() {
  'use no memo';
  const ref = useRef<number>(null);
  ref.current = 42;
  return ref;
}
`;
  const active = `import { useState } from 'react';
export function MyComponent() {
  'use no memo';
  const [count] = useState(0);
  return <div>{count}</div>;
}
`;
  try {
    writeFileSync(configPath, config);
    writeFileSync(redundantPath, redundant);
    writeFileSync(activePath, active);
    const redundantResult = invokeJson(root, ['lint', redundantPath, '--fix'], directory, configPath, validateLint);
    assert.equal(redundantResult.summary.redundant, 0);
    assert.doesNotMatch(readFileSync(redundantPath, 'utf8'), /use no memo/);

    const activeResult = invokeJson(root, ['lint', activePath, '--fix'], directory, configPath, validateLint);
    assert.equal(activeResult.summary.directives, 1);
    const justified = readFileSync(activePath, 'utf8');
    assert.match(justified, /\/\/ justified:/);
    const secondRun = invokeJson(root, ['lint', activePath, '--fix'], directory, configPath, validateLint);
    assert.equal(secondRun.summary.directives, 1);
    assert.equal(readFileSync(activePath, 'utf8'), justified, 'ordinary lint fixes must be idempotent');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

function checkWorkspaceResolution(root, validateAnalyze) {
  const directory = mkdtempSync(join(__dirname, '.cli-workspace-'));
  const workspace = join(directory, 'workspace');
  const tool = join(workspace, 'packages', 'tool');
  const app = join(workspace, 'packages', 'app');
  const store = join(workspace, 'packages', 'store');
  const feature = join(workspace, 'packages', 'feature');
  const configPath = join(tool, 'rca.config.json');
  const appSource = join(app, 'src', 'App.tsx');
  const featureSource = join(feature, 'src', 'index.ts');
  const storeSource = join(store, 'src', 'index.ts');
  try {
    for (const path of [
      tool,
      join(app, 'src'),
      join(feature, 'src'),
      join(store, 'src'),
      join(workspace, 'node_modules', '@ws'),
    ]) {
      mkdirSync(path, { recursive: true });
    }
    writeFileSync(
      join(workspace, 'tsconfig.base.json'),
      JSON.stringify({
        compilerOptions: { baseUrl: '.', paths: { '@ws/store': ['packages/store/src/index.ts'] } },
      }),
    );
    for (const packagePath of [app, feature]) {
      writeFileSync(join(packagePath, 'tsconfig.json'), '{"extends":"../../tsconfig.base.json"}\n');
    }
    writeFileSync(join(store, 'package.json'), '{"name":"@ws/store","type":"module"}\n');
    writeFileSync(
      join(feature, 'package.json'),
      JSON.stringify({ name: '@ws/feature', type: 'module', exports: { '.': './src/index.ts' } }),
    );
    writeFileSync(configPath, JSON.stringify({ analyze: { risks: { detectGetStateReads: true } } }, null, 2) + '\n');
    writeFileSync(
      storeSource,
      `function getStore() { return { getState: () => ({ active: true }) }; }
export function readSnapshot() { return getStore().getState().active; }
`,
    );
    writeFileSync(
      featureSource,
      `import { readSnapshot } from '@ws/store';
export function readFeature() { return readSnapshot(); }
`,
    );
    writeFileSync(
      appSource,
      `import { readFeature } from '@ws/feature';
export function Widget() { return <output>{readFeature()}</output>; }
`,
    );
    symlinkSync('../../packages/feature', join(workspace, 'node_modules', '@ws', 'feature'), 'dir');

    const result = invokeJson(root, ['analyze', '../app', '../feature'], tool, configPath, validateAnalyze);
    assert.ok(
      result.findings.some(finding => finding.function === 'Widget' && finding.ruleId === 'nonreactive-store-read'),
      'default wrapper resolution should follow package exports and per-importer tsconfig paths',
    );
    assert.deepEqual(
      readFileSync(appSource),
      Buffer.from(`import { readFeature } from '@ws/feature';
export function Widget() { return <output>{readFeature()}</output>; }
`),
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
