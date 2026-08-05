// @ts-check
const { classify, count, createReport, createSummary, formatReport, matchesPackagePattern } = require('./report');

/** @typedef {import('./report').FixtureResult} FixtureResult */
/** @typedef {import('./report').RuntimeOptions} RuntimeOptions */

const workspaceRoot = '/ws';
const packageRoot = '/ws/packages/thing';

describe('classify', () => {
  it('reports a fixture with no leaks as clean', () => {
    expect(classify(fixtureResult(), []).status).toBe('clean');
  });

  it('separates tolerated leaks from regressions', () => {
    const outcome = classify(fixtureResult({ found: ['allowed-pkg', 'new-pkg'] }), ['allowed-pkg']);

    expect(outcome).toMatchObject({ status: 'regression', tolerated: ['allowed-pkg'], regressions: ['new-pkg'] });
  });

  it('flags an allowlist entry that no longer leaks as stale', () => {
    const outcome = classify(fixtureResult(), ['fixed-pkg']);

    expect(outcome).toMatchObject({ status: 'stale', stale: ['fixed-pkg'], tolerated: [] });
  });

  it('reports regressions and stale entries from the same fixture', () => {
    const outcome = classify(fixtureResult({ found: ['new-pkg'] }), ['fixed-pkg']);

    expect(outcome).toMatchObject({ regressions: ['new-pkg'], stale: ['fixed-pkg'] });
  });

  it('treats a build failure as an error regardless of the allowlist', () => {
    expect(classify(fixtureResult({ error: 'boom' }), []).status).toBe('error');
  });

  it('treats resolving to package sources as an error, since the verdict would be meaningless', () => {
    const outcome = classify(fixtureResult({ sourceResolved: ['/ws/packages/thing/library/src/index.ts'] }), []);

    expect(outcome.status).toBe('error');
  });
});

describe('createReport', () => {
  it('passes when nothing leaked', () => {
    const report = createReport(input({ results: [fixtureResult()] }));

    expect(report).toMatchObject({ failed: false, status: 'passed' });
  });

  it('passes with debt when every leak is allowlisted', () => {
    const report = createReport(
      input({
        results: [fixtureResult({ found: ['allowed-pkg'] })],
        allowedViolations: { 'A.fixture.js': ['allowed-pkg'] },
      }),
    );

    expect(report).toMatchObject({ failed: false, status: 'passed-with-debt' });
  });

  it('fails allowlisted leaks under --strict', () => {
    const report = createReport(
      input({
        results: [fixtureResult({ found: ['allowed-pkg'] })],
        allowedViolations: { 'A.fixture.js': ['allowed-pkg'] },
        strict: true,
      }),
    );

    expect(report).toMatchObject({ failed: true, status: 'failed' });
  });

  it('fails on an allowlist entry for a fixture that does not exist', () => {
    const report = createReport(input({ results: [fixtureResult()], allowedViolations: { 'Gone.fixture.js': ['x'] } }));

    expect(report.orphans).toEqual([{ fixture: 'Gone.fixture.js', packages: ['x'] }]);
    expect(report.failed).toBe(true);
  });

  it('totals findings across fixtures', () => {
    const report = createReport(
      input({
        results: [fixtureResult({ found: ['a-pkg'] }), fixtureResult({ fixture: 'B.fixture.js', found: ['b-pkg'] })],
        fixtures: ['A.fixture.js', 'B.fixture.js'],
      }),
    );

    expect(report.totals).toEqual({ errors: 0, regressions: 2, stale: 0, tolerated: 0 });
  });
});

describe('formatReport', () => {
  it('claims a bundle is free of forbidden packages only when nothing leaked', () => {
    const report = createReport(input({ results: [fixtureResult()] }));

    expect(formatReport(report, '/ws/summary.json')).toContain('PASS - 1 fixture free of forbidden-pkg, @scope/*');
  });

  it('never claims a bundle is free of a package that is merely allowlisted', () => {
    const text = formatReport(
      createReport(
        input({
          results: [fixtureResult({ found: ['forbidden-pkg'], leaks: { 'forbidden-pkg': leak() } })],
          allowedViolations: { 'A.fixture.js': ['forbidden-pkg'] },
        }),
      ),
      '/ws/summary.json',
    );

    expect(text).not.toContain('free of');
    expect(text).toContain('PASS WITH DEBT - 1 fixture, 0 regressions, 1 allowed violation');
  });

  it('lists allowlisted leaks with their size and entry points, ordered by cost', () => {
    const text = formatReport(
      createReport(
        input({
          results: [
            fixtureResult({
              found: ['forbidden-pkg', '@scope/styles'],
              leaks: {
                'forbidden-pkg': leak({ modules: 3 }),
                '@scope/styles': leak({ modules: 9, via: 'lib/entry.js' }),
              },
            }),
          ],
          allowedViolations: { 'A.fixture.js': ['forbidden-pkg', '@scope/styles'] },
        }),
      ),
      '/ws/summary.json',
    );

    expect(text).toContain('  ALLOWED     A.fixture.js - 2 forbidden packages, 12 modules');
    expect(text).toContain('      via lib/entry.js');

    const rows = text.split('\n').filter(line => /^ {4}(@scope\/styles|forbidden-pkg)\b/.test(line));
    expect(rows).toEqual(['    @scope/styles  9 modules  1 export', '    forbidden-pkg  3 modules  1 export']);
  });

  it('names the packages still kept out, so the allowlist is not read as total defeat', () => {
    const text = formatReport(
      createReport(
        input({
          results: [fixtureResult({ found: ['@scope/styles'], leaks: { '@scope/styles': leak() } })],
          allowedViolations: { 'A.fixture.js': ['@scope/styles'] },
        }),
      ),
      '/ws/summary.json',
    );

    expect(text).toContain('  kept out:  forbidden-pkg');
    expect(text).toContain('  allowlist: @scope/styles');
  });

  it('traces a regression to the importing module and the entry point that pulled it in', () => {
    const text = formatReport(
      createReport(
        input({
          results: [
            fixtureResult({ found: ['forbidden-pkg'], leaks: { 'forbidden-pkg': leak({ via: 'lib/entry.js' }) } }),
          ],
        }),
      ),
      '/ws/summary.json',
    );

    expect(text).toContain('  REGRESSION  A.fixture.js - 1 forbidden package not on the allowlist');
    expect(text).toContain('    forbidden-pkg - 2 modules retained');
    expect(text).toContain('        <- packages/other/lib/importer.js (via lib/entry.js)');
    expect(text).toContain('FAIL - 1 fixture: 1 regression');
  });

  it('tells the reader how to lock in a fix rather than reporting it as a plain failure', () => {
    const text = formatReport(
      createReport(input({ results: [fixtureResult()], allowedViolations: { 'A.fixture.js': ['fixed-pkg'] } })),
      '/ws/summary.json',
    );

    expect(text).toContain('  STALE       A.fixture.js - no longer pulls in fixed-pkg');
    expect(text).toContain('remove it from allowedViolations in packages/thing/config.json to lock the fix in');
  });

  it('attributes a --strict failure to the flag rather than to a regression', () => {
    const text = formatReport(
      createReport(
        input({
          results: [fixtureResult({ found: ['forbidden-pkg'], leaks: { 'forbidden-pkg': leak() } })],
          allowedViolations: { 'A.fixture.js': ['forbidden-pkg'] },
          strict: true,
        }),
      ),
      '/ws/summary.json',
    );

    expect(text).toContain('FAIL - 1 fixture: 1 allowed violation rejected by --strict');
  });

  it('points at the analyzer artifacts only when they were produced', () => {
    const withoutAnalyze = formatReport(createReport(input({ results: [fixtureResult()] })), '/ws/summary.json');
    const withAnalyze = formatReport(
      createReport(input({ results: [fixtureResult()], analyze: true })),
      '/ws/summary.json',
    );

    expect(withoutAnalyze).toContain('analyzer: rerun with --analyze');
    expect(withAnalyze).toContain('packages/thing/dist/bundle-isolation/<fixture>/report.html + report.json');
  });
});

describe('createSummary', () => {
  it('mirrors the console verdict', () => {
    const summary = createSummary(
      createReport(
        input({
          results: [
            fixtureResult({ found: ['forbidden-pkg'], leaks: { 'forbidden-pkg': leak({ via: 'lib/entry.js' }) } }),
          ],
          allowedViolations: { 'A.fixture.js': ['forbidden-pkg'] },
        }),
      ),
    );

    expect(summary).toMatchObject({
      package: '@fluentui/thing',
      status: 'passed-with-debt',
      strict: false,
      fixtures: [
        {
          fixture: 'A.fixture.js',
          status: 'allowed',
          tolerated: ['forbidden-pkg'],
          regressions: [],
          leaks: {
            'forbidden-pkg': {
              modules: 2,
              exports: [
                { name: 'used', importers: [{ module: 'packages/other/lib/importer.js', via: 'lib/entry.js' }] },
              ],
            },
          },
        },
      ],
    });
  });

  it('does not point at an analyzer report that was never written', () => {
    const summary = createSummary(createReport(input({ results: [fixtureResult()] })));

    expect(summary.fixtures[0].analyzerReport).toBeNull();
  });

  it('points at the analyzer report when one was written', () => {
    const summary = createSummary(createReport(input({ results: [fixtureResult()], analyze: true })));

    expect(summary.fixtures[0].analyzerReport).toBe('packages/thing/dist/bundle-isolation/A/report.json');
  });
});

describe('count', () => {
  it.each([
    [1, '1 module'],
    [0, '0 modules'],
    [2, '2 modules'],
  ])('pluralises %i', (value, expected) => {
    expect(count(value, 'module')).toBe(expected);
  });

  it('uses an explicit plural when appending an s would be wrong', () => {
    expect(count(2, 'stale allowlist entry', 'stale allowlist entries')).toBe('2 stale allowlist entries');
  });
});

describe('matchesPackagePattern', () => {
  it.each([
    ['@scope/*', '@scope/styles', true],
    ['@scope/*', '@other/styles', false],
    ['forbidden-pkg', 'forbidden-pkg', true],
    ['forbidden-pkg', 'forbidden-pkg-extra', false],
  ])('%s vs %s', (pattern, name, expected) => {
    expect(matchesPackagePattern(pattern, name)).toBe(expected);
  });
});

/** @returns {FixtureResult} */
function fixtureResult({ fixture = 'A.fixture.js', found = [], leaks = {}, sourceResolved = [], error } = {}) {
  return { fixture, found, leaks, sourceResolved, ...(error ? { error } : {}) };
}

function leak({ modules = 2, via = null } = {}) {
  return { modules, exports: [{ name: 'used', importers: [{ module: '/ws/packages/other/lib/importer.js', via }] }] };
}

function input({ results, fixtures = ['A.fixture.js'], allowedViolations = {}, strict = false, analyze = false }) {
  /** @type {RuntimeOptions} */
  const options = {
    configPath: '/ws/packages/thing/config.json',
    analyze,
    strict,
    fixturesRoot: '/ws/packages/thing/bundle-size',
    packageRoot,
    workspaceRoot,
    config: {
      fixturesRoot: './bundle-size',
      externals: [],
      forbiddenPackages: ['forbidden-pkg', '@scope/*'],
      allowedViolations,
    },
  };

  return { packageName: '@fluentui/thing', results, fixtures, options };
}
