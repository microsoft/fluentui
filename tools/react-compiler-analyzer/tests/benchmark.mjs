import { createHash } from 'node:crypto';
import {
  copyFileSync,
  existsSync,
  globSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    baseline: { type: 'string' },
    root: { type: 'string', default: resolve(here, '../../..') },
    output: { type: 'string' },
    runs: { type: 'string', default: '3' },
    'audit-only': { type: 'boolean', default: false },
  },
});
if (!values.baseline || !existsSync(resolve(values.baseline))) {
  throw new Error('--baseline must identify a built pre-migration CLI entry point');
}
const runs = Number(values.runs);
if (!Number.isInteger(runs) || runs < 1) {
  throw new Error('--runs must be a positive integer');
}
const root = resolve(values.root);
const output = resolve(values.output ?? join(root, 'dist/react-compiler-analyzer-benchmark'));
mkdirSync(output, { recursive: true });
const excluded = [
  '**/node_modules/**',
  '**/*.d.ts',
  '**/__tests__/**',
  '**/testing/**',
  '**/__mocks__/**',
  '**/*.spec.*',
  '**/*.test.*',
  '**/*.stories.*',
  '**/*.cy.*',
  '**/*.e2e.*',
  '**/e2e/**',
];
const packages = join(root, 'packages/react-components');
const paths = readdirSync(packages)
  .map(name => join(packages, name, 'library/src'))
  .filter(path => existsSync(path))
  .sort();
const manifest = paths
  .flatMap(path =>
    globSync('**/*.{ts,tsx}', { cwd: path, exclude: excluded }).map(file => {
      const absolute = join(path, file);
      return {
        file: relative(root, absolute).replaceAll('\\', '/'),
        sha256: createHash('sha256').update(readFileSync(absolute)).digest('hex'),
      };
    }),
  )
  .sort((a, b) => a.file.localeCompare(b.file, 'en'));
const manifestJSON = JSON.stringify(manifest);
const manifestHash = createHash('sha256').update(manifestJSON).digest('hex');
const previous = values['audit-only'] ? JSON.parse(readFileSync(join(output, 'report.json'), 'utf8')) : undefined;
if (previous && previous.manifestHash !== manifestHash) {
  throw new Error('Cannot audit results from a different frozen input manifest');
}
writeFileSync(join(output, 'manifest.json'), manifestJSON);

function configuration(name, risks) {
  const filename = join(output, `${name}.config.json`);
  writeFileSync(
    filename,
    JSON.stringify({
      exclude: excluded,
      concurrency: 1,
      ...(risks ? { analyze: { risks } } : {}),
    }),
  );
  return filename;
}

const plain = configuration('plain');
const risks = configuration('risks', {
  detectGetStateReads: true,
  storeAccessorPattern: 'Store$',
  selectorHookProperties: ['use'],
  resolveWrappers: true,
});
const workloads = [
  { name: 'analyze', command: 'analyze', config: plain, flags: [] },
  { name: 'analyze-risks', command: 'analyze', config: risks, flags: [] },
  { name: 'lint', command: 'lint', config: plain, flags: [] },
  { name: 'lint-fix', command: 'lint', config: plain, flags: ['--fix'], clone: true },
  { name: 'lint-revalidate', command: 'lint', config: plain, flags: ['--revalidate-justified'] },
];
const backends = [
  { name: 'babel', binary: resolve(values.baseline) },
  { name: 'oxc', binary: resolve(here, '../bin/react-compiler-analyzer.js') },
];
const results = previous?.results ?? [];
function cloneInputs(label) {
  const directory = mkdtempSync(join(output, `${label}-`));
  for (const item of manifest) {
    const target = join(directory, item.file);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(root, item.file), target);
  }
  for (const path of paths) {
    let parent = dirname(path);
    while (parent === root || parent.startsWith(`${root}/`)) {
      const source = join(parent, 'package.json');
      if (existsSync(source)) {
        const target = join(directory, relative(root, source));
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(source, target);
      }
      if (parent === root) {
        break;
      }
      parent = dirname(parent);
    }
  }
  return directory;
}
for (const workload of values['audit-only'] ? [] : workloads) {
  for (const backend of backends) {
    for (let run = 0; run < runs; run++) {
      const label = `${workload.name}.${backend.name}.${run + 1}`;
      const metricsFile = join(output, `${label}.metrics.json`);
      const cwd = workload.clone ? cloneInputs(label) : root;
      const scanPaths = paths.map(path => join(cwd, relative(root, path)));
      const start = performance.now();
      const child = spawnSync(
        process.execPath,
        [
          '--require',
          join(here, 'benchmark-preload.cjs'),
          backend.binary,
          workload.command,
          ...scanPaths,
          '--config',
          workload.config,
          '--format',
          'json',
          ...workload.flags,
        ],
        {
          cwd,
          encoding: 'utf8',
          env: { ...process.env, RCA_BENCHMARK_METRICS: metricsFile },
          maxBuffer: 128 * 1024 * 1024,
          timeout: 300_000,
        },
      );
      const elapsedMs = performance.now() - start;
      writeFileSync(join(output, `${label}.stderr.txt`), child.stderr ?? '');
      if (child.error) {
        throw child.error;
      }
      if (child.status !== 0 && child.status !== 1) {
        throw new Error(`${label} exited ${child.status}: ${child.stderr}`);
      }
      let document;
      try {
        document = JSON.parse(child.stdout);
      } catch (error) {
        throw new Error(`${label} did not emit JSON: ${child.stderr}`, { cause: error });
      }
      writeFileSync(join(output, `${label}.json`), child.stdout);
      const metrics = JSON.parse(readFileSync(metricsFile, 'utf8'));
      const row = {
        workload: workload.name,
        backend: backend.name,
        run: run + 1,
        elapsedMs,
        exitCode: child.status,
        ...metrics,
        summary: document.summary,
        ...(workload.clone
          ? {
              edits: manifest.flatMap(item => {
                const after = readFileSync(join(cwd, item.file));
                const hash = createHash('sha256').update(after).digest('hex');
                return hash === item.sha256 ? [] : [{ file: item.file, sha256: hash, source: after.toString('utf8') }];
              }),
            }
          : {}),
      };
      results.push(row);
      console.log(JSON.stringify({ ...row, ...(row.edits ? { edits: row.edits.map(edit => edit.file) } : {}) }));
      if (workload.clone) {
        rmSync(cwd, { recursive: true, force: true });
      }
    }
  }
}

const differences = [];
const nativeEvidence = new Map();
async function diagnosticsFor(row) {
  if (!nativeEvidence.has(row.file)) {
    const [{ transformSync }, { parseSync, Visitor }] = await Promise.all([
      import('oxc-transform-react'),
      import('oxc-parser'),
    ]);
    const source = readFileSync(join(root, row.file), 'utf8');
    const parsed = parseSync(row.file, source, { showSemanticErrors: true });
    assertNoErrors(parsed.errors);
    const functions = [];
    new Visitor({
      FunctionDeclaration(node) {
        functions.push(node);
      },
      FunctionExpression(node) {
        functions.push(node);
      },
      ArrowFunctionExpression(node) {
        functions.push(node);
      },
    }).visit(parsed.program);
    const transformed = transformSync(row.file, source, {
      jsx: 'preserve',
      sourcemap: true,
      reactCompiler: {
        compilationMode: 'infer',
        target: '19',
        panicThreshold: 'none',
        reportDiagnostics: true,
        gating: { source: '__rca_gate__', importSpecifierName: '__rcaGate' },
      },
    });
    if (transformed.fatal) {
      throw new Error(`Native parity evidence failed for ${row.file}`);
    }
    nativeEvidence.set(row.file, { source, functions, errors: transformed.errors });
  }
  const { source, functions, errors } = nativeEvidence.get(row.file);
  const lines = source.split('\n');
  const offset = lines.slice(0, row.line - 1).reduce((sum, line) => sum + line.length + 1, 0) + row.column;
  const fn = functions.find(node => node.start === offset);
  if (!fn) {
    throw new Error(`Cannot locate original parity candidate ${row.file}:${row.line}:${row.column}`);
  }
  return errors
    .filter(error =>
      error.labels.some(label => {
        const location = Buffer.from(source).subarray(0, label.start).toString('utf8').length;
        return fn.start <= location && location < fn.end;
      }),
    )
    .map(error => ({
      severity: error.severity,
      message: error.message,
      category: /react-compiler\(([^)]+)\)/.exec(error.codeframe ?? '')?.[1],
      labels: error.labels,
    }));
}
function assertNoErrors(errors) {
  if (errors.length) {
    throw new Error(`Parity evidence input did not parse: ${errors.map(error => error.message).join('; ')}`);
  }
}
for (const workload of workloads) {
  const documents = backends.map(backend =>
    JSON.parse(readFileSync(join(output, `${workload.name}.${backend.name}.1.json`), 'utf8')),
  );
  const field = workload.command === 'analyze' ? 'functions' : 'directives';
  const rows = documents.map(
    document =>
      new Map(
        document[field].map(row => [
          `${row.file}:${row.line}:${row.column}:${row.function ?? row.directive}`,
          {
            status: row.status,
            ...(row.memoStats !== undefined ? { memoSlots: row.memoStats?.memoSlots ?? null } : {}),
          },
        ]),
      ),
  );
  const originals = new Map(
    documents[0][field].map(row => [`${row.file}:${row.line}:${row.column}:${row.function ?? row.directive}`, row]),
  );
  for (const key of new Set([...rows[0].keys(), ...rows[1].keys()])) {
    const before = rows[0].get(key);
    const after = rows[1].get(key);
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      const original = originals.get(key);
      const diagnostics =
        workload.command === 'analyze' && before?.status === 'error' && !after
          ? await diagnosticsFor(original)
          : undefined;
      if (
        diagnostics &&
        (diagnostics.length === 0 || diagnostics.some(diagnostic => diagnostic.severity === 'Error'))
      ) {
        throw new Error(`Unexplained missing rejection in native compiler results: ${key}`);
      }
      differences.push({
        workload: workload.name,
        key,
        before,
        after,
        ...(original?.reason ? { baselineReason: original.reason } : {}),
        ...(diagnostics
          ? { category: 'native-advice-only', nativeDiagnostics: diagnostics }
          : {
              category: before?.status === after?.status ? 'compiler-statistics' : 'compiler-outcome',
            }),
      });
    }
  }
}
const changed = manifest.filter(
  item =>
    createHash('sha256')
      .update(readFileSync(join(root, item.file)))
      .digest('hex') !== item.sha256,
);
if (changed.length) {
  throw new Error(`Benchmark changed frozen source inputs: ${changed.map(item => item.file).join(', ')}`);
}
const fixes = results.filter(result => result.workload === 'lint-fix');
if (!fixes.length || fixes.some(result => JSON.stringify(result.edits) !== JSON.stringify(fixes[0].edits))) {
  throw new Error('Babel/Oxc isolated fixes did not produce byte-identical source edits');
}
const report = {
  node: process.version,
  manifestHash,
  files: manifest.length,
  runs: previous?.runs ?? runs,
  backends: backends.map(backend => ({
    ...backend,
    profile: JSON.parse(readFileSync(join(output, `analyze.${backend.name}.1.json`), 'utf8')).profile,
  })),
  fixEditsIdentical: true,
  results,
  differences,
};
writeFileSync(join(output, 'report.json'), JSON.stringify(report, null, 2));
console.log(`Saved frozen-input benchmark to ${output}`);
