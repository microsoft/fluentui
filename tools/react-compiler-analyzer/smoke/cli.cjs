const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } = require('node:fs');
const { join, resolve } = require('node:path');

if (process.env.RCA_CLI_SMOKE_PRELOAD === '1') {
  // The built CLI must work without loading either workspace or comparison SWC.
  const Module = require('node:module');
  const originalLoad = Module._load;
  Module._load = function (request, ...args) {
    if (request.startsWith('@swc/') || /[/\\]@swc[/\\]/.test(request)) {
      throw new Error(`The Babel-only CLI attempted to load native SWC: ${request}`);
    }
    return originalLoad.call(this, request, ...args);
  };
} else {
  runSmoke();
}

function runSmoke() {
  const Ajv = require('ajv');
  const root = resolve(__dirname, '..');
  const analyzeSchema = JSON.parse(readFileSync(join(root, 'rca.analyze.schema.json'), 'utf8'));
  const lintSchema = JSON.parse(readFileSync(join(root, 'rca.lint.schema.json'), 'utf8'));
  const ajv = new Ajv({ allErrors: true });
  ajv.addSchema(analyzeSchema);
  const validateAnalyze = ajv.getSchema(analyzeSchema.$id);
  const validateLint = ajv.compile(lintSchema);
  const directory = mkdtempSync(join(__dirname, '.cli-smoke-'));
  const originals = new Map([
    [
      'Positive.tsx',
      `import { useState } from 'react';
export function Smoke({ initial }: { initial: number }) {
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
    assert.equal(target.functionName, 'Smoke');
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

    console.log(
      'Built CLI smoke passed: strict schema-v3 analyze/lint JSON, profile, counters, dry-run, no writes, no SWC.',
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }

  function invoke(args, validate) {
    const env = { ...process.env, RCA_CLI_SMOKE_PRELOAD: '1', NO_COLOR: '1' };
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
    const document = JSON.parse(result.stdout);
    assert.equal(validate(document), true, JSON.stringify(validate.errors, null, 2));
    assert.equal(document.schemaVersion, 3);
    assert.equal(document.emittedCaching, 'unverified');
    assert.equal(document.profile.backend, 'babel');
    assert.equal(document.profile.mode, 'infer');
    assert.equal(document.profile.noEmit, true);
    assert.equal(document.profile.panicThreshold, 'none');
    assert.equal(document.profile.babelVersion, require('@babel/core/package.json').version);
    assert.equal(document.profile.compilerVersion, require('babel-plugin-react-compiler/package.json').version);
    assert.deepEqual(readdirSync(directory).sort(), [...originals.keys()].sort());
    for (const [name, source] of originals) {
      assert.deepEqual(readFileSync(join(directory, name)), Buffer.from(source), `${name} was modified`);
    }
    return document;
  }
}
