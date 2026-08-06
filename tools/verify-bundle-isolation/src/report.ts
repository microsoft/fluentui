/**
 * Turns raw per-fixture bundling results into a verdict, and renders that verdict for the console
 * and for `summary.json`. Kept free of webpack and of the file system so it can be tested directly.
 */
import { join } from 'node:path';

import type { Leak } from './bundle-isolation-plugin';
import { type Config, fixtureOutputPath, relativeToWorkspace } from './config';

export interface RuntimeOptions {
  configPath: string;
  analyze: boolean;
  strict: boolean;
  config: Config;
  fixturesRoot: string;
  packageRoot: string;
  workspaceRoot: string;
}

export interface FixtureResult {
  fixture: string;
  found: string[];
  leaks: Record<string, Leak>;
  sourceResolved: string[];
  error?: string;
}

export type FixtureStatus = 'error' | 'regression' | 'stale' | 'allowed' | 'clean';

export interface Outcome extends FixtureResult {
  status: FixtureStatus;
  allowed: string[];
  tolerated: string[];
  regressions: string[];
  stale: string[];
}

export interface Orphan {
  fixture: string;
  packages: string[];
}

export interface Totals {
  errors: number;
  regressions: number;
  stale: number;
  tolerated: number;
}

export interface Report {
  packageName: string;
  options: RuntimeOptions;
  outcomes: Outcome[];
  orphans: Orphan[];
  totals: Totals;
  failed: boolean;
  status: 'passed' | 'passed-with-debt' | 'failed';
}

/** Widest badge plus its trailing gap, so every fixture line starts at the same column. */
const BADGE_WIDTH = 'REGRESSION'.length + 2;
const MAX_ORIGINS = 3;
const MAX_EXPORTS = 5;
const MAX_IMPORTERS = 2;

export function createReport({
  packageName,
  results,
  fixtures,
  options,
}: {
  packageName: string;
  results: FixtureResult[];
  fixtures: string[];
  options: RuntimeOptions;
}): Report {
  const outcomes = results.map(result => classify(result, options.config.allowedViolations[result.fixture] ?? []));
  const orphans = orphanedAllowlistEntries(fixtures, options.config.allowedViolations);
  const totals: Totals = {
    errors: outcomes.filter(outcome => outcome.status === 'error').length,
    regressions: sumBy(outcomes, outcome => outcome.regressions.length),
    stale: sumBy(outcomes, outcome => outcome.stale.length),
    tolerated: sumBy(outcomes, outcome => outcome.tolerated.length),
  };

  const failed =
    orphans.length > 0 ||
    totals.errors > 0 ||
    totals.regressions > 0 ||
    totals.stale > 0 ||
    (options.strict && totals.tolerated > 0);

  return {
    packageName,
    options,
    outcomes,
    orphans,
    totals,
    failed,
    status: failed ? 'failed' : totals.tolerated > 0 ? 'passed-with-debt' : 'passed',
  };
}

export function classify(result: FixtureResult, allowed: string[]): Outcome {
  const regressions = result.found.filter(name => !allowed.includes(name));
  const stale = allowed.filter(name => !result.found.includes(name));
  const tolerated = allowed.filter(name => result.found.includes(name));

  let status: FixtureStatus = 'clean';
  if (result.error || result.sourceResolved.length > 0) {
    status = 'error';
  } else if (regressions.length > 0) {
    status = 'regression';
  } else if (stale.length > 0) {
    status = 'stale';
  } else if (tolerated.length > 0) {
    status = 'allowed';
  }

  return { ...result, status, allowed, tolerated, regressions, stale };
}

export function orphanedAllowlistEntries(fixtures: string[], allowedViolations: Record<string, string[]>): Orphan[] {
  return Object.entries(allowedViolations)
    .filter(([fixture]) => !fixtures.includes(fixture))
    .map(([fixture, packages]) => ({ fixture, packages }));
}

export function formatReport(report: Report, summaryPath: string): string {
  const { options } = report;
  const lines = [
    `Bundle isolation · ${report.packageName}`,
    `forbidden: ${options.config.forbiddenPackages.join(', ')}`,
    '',
  ];

  for (const outcome of report.outcomes) {
    lines.push(...formatFixture(outcome, options), '');
  }

  for (const orphan of report.orphans) {
    lines.push(
      `${badge('ORPHAN')}${orphan.fixture} - allowlisted (${orphan.packages.join(', ')}) but not a bundle-size fixture`,
      `    remove the entry from allowedViolations in ${configLabel(options)}`,
      '',
    );
  }

  lines.push(...formatVerdict(report), '', ...formatArtifacts(options, summaryPath));

  return lines.join('\n');
}

function formatFixture(outcome: Outcome, options: RuntimeOptions): string[] {
  if (outcome.status === 'error') {
    return [`${badge('ERROR')}${outcome.fixture}`, ...formatError(outcome, options.workspaceRoot)];
  }

  if (outcome.status === 'clean') {
    return [`${badge('CLEAN')}${outcome.fixture}`];
  }

  const lines: string[] = [];

  if (outcome.regressions.length > 0) {
    lines.push(
      `${badge('REGRESSION')}${outcome.fixture} - ${count(
        outcome.regressions.length,
        'forbidden package',
      )} not on the allowlist`,
      ...outcome.regressions.flatMap(name => describeLeak(name, outcome.leaks[name], options.workspaceRoot)),
    );
  }

  if (outcome.stale.length > 0) {
    lines.push(
      `${badge('STALE')}${outcome.fixture} - no longer pulls in ${outcome.stale.join(', ')}`,
      `    remove it from allowedViolations in ${configLabel(options)} to lock the fix in`,
    );
  }

  if (outcome.tolerated.length > 0) {
    const modules = sumBy(outcome.tolerated, name => outcome.leaks[name].modules);
    lines.push(
      `${badge('ALLOWED')}${outcome.fixture} - ${count(outcome.tolerated.length, 'forbidden package')}, ${count(
        modules,
        'module',
      )}`,
      ...formatTolerated(outcome, options.workspaceRoot),
    );
  }

  return lines;
}

function formatError(outcome: Outcome, workspaceRoot: string): string[] {
  if (outcome.error) {
    return [
      '    could not be bundled - is the package built?',
      ...outcome.error.split('\n').map(line => `      ${line.trim()}`),
    ];
  }

  return [
    '    resolved to package sources instead of built output, so the result is meaningless',
    `      e.g. ${relativeToWorkspace(outcome.sourceResolved[0], workspaceRoot)}`,
  ];
}

/** Ordered by module count so the most expensive debt to pay down is listed first. */
function formatTolerated(outcome: Outcome, workspaceRoot: string): string[] {
  const rows = outcome.tolerated
    .map(name => ({ name, leak: outcome.leaks[name] }))
    .sort((left, right) => right.leak.modules - left.leak.modules || left.name.localeCompare(right.name));

  const nameWidth = Math.max(...rows.map(row => row.name.length));
  const moduleWidth = Math.max(...rows.map(row => count(row.leak.modules, 'module').length));

  return rows.flatMap(({ name, leak }) => [
    `    ${name.padEnd(nameWidth)}  ${count(leak.modules, 'module').padStart(moduleWidth)}  ${count(
      leak.exports.length,
      'export',
    )}`,
    ...originsOf(leak, workspaceRoot).map(origin => `      via ${origin}`),
  ]);
}

function describeLeak(name: string, leak: Leak, workspaceRoot: string): string[] {
  const lines = [`    ${name} - ${count(leak.modules, 'module')} retained`];

  if (leak.exports.length === 0) {
    lines.push('      no importing symbol identified - rerun with --analyze to inspect the bundle');
    return lines;
  }

  for (const { name: exportName, importers } of leak.exports.slice(0, MAX_EXPORTS)) {
    lines.push(`      ${exportName}`);

    for (const importer of importers.slice(0, MAX_IMPORTERS)) {
      const module = relativeToWorkspace(importer.module, workspaceRoot);
      lines.push(`        <- ${module}${importer.via ? ` (via ${importer.via})` : ''}`);
    }

    const hiddenImporters = importers.length - MAX_IMPORTERS;
    if (hiddenImporters > 0) {
      lines.push(`        <- +${hiddenImporters} more`);
    }
  }

  const hiddenExports = leak.exports.length - MAX_EXPORTS;
  if (hiddenExports > 0) {
    lines.push(`      ...and ${count(hiddenExports, 'more export')}`);
  }

  return lines;
}

function originsOf(leak: Leak, workspaceRoot: string): string[] {
  const origins = new Set(
    leak.exports.flatMap(({ importers }) =>
      importers.map(importer => importer.via ?? relativeToWorkspace(importer.module, workspaceRoot)),
    ),
  );

  const listed = [...origins].sort().slice(0, MAX_ORIGINS);
  const hidden = origins.size - listed.length;

  return hidden > 0 ? [...listed, `+${count(hidden, 'more entry point')}`] : listed;
}

function formatVerdict(report: Report): string[] {
  const { options, totals, orphans } = report;
  const fixtures = count(report.outcomes.length, 'fixture');

  if (report.failed) {
    const parts = [
      totals.errors > 0 && `${count(totals.errors, 'fixture')} failed to bundle`,
      totals.regressions > 0 && count(totals.regressions, 'regression'),
      totals.stale > 0 && count(totals.stale, 'stale allowlist entry', 'stale allowlist entries'),
      orphans.length > 0 && count(orphans.length, 'orphaned allowlist entry', 'orphaned allowlist entries'),
      options.strict && totals.tolerated > 0 && `${count(totals.tolerated, 'allowed violation')} rejected by --strict`,
    ].filter(Boolean);

    return [`FAIL - ${fixtures}: ${parts.join(', ')}`];
  }

  if (totals.tolerated === 0) {
    return [`PASS - ${fixtures} free of ${options.config.forbiddenPackages.join(', ')}`];
  }

  const leaked = [...new Set(report.outcomes.flatMap(outcome => outcome.tolerated))].sort();
  const keptOut = options.config.forbiddenPackages.filter(
    pattern => !leaked.some(name => matchesPackagePattern(pattern, name)),
  );

  return [
    `PASS WITH DEBT - ${fixtures}, 0 regressions, ${count(totals.tolerated, 'allowed violation')}`,
    ...(keptOut.length > 0 ? [`  kept out:  ${keptOut.join(', ')}`] : []),
    `  allowlist: ${leaked.join(', ')}`,
    `             tracked in ${configLabel(options)} - deleting an entry is the goal, adding one is a regression`,
  ];
}

function formatArtifacts(options: RuntimeOptions, summaryPath: string): string[] {
  const analyzer = options.analyze
    ? `${relativeToWorkspace(fixtureOutputPath('<fixture>.fixture.js', options.packageRoot), options.workspaceRoot)}/` +
      'report.html + report.json'
    : 'rerun with --analyze for per-fixture treemaps';

  return [`summary:  ${relativeToWorkspace(summaryPath, options.workspaceRoot)}`, `analyzer: ${analyzer}`];
}

/**
 * Companion to the analyzer treemap: the same verdict, structured so it can be diffed between runs
 * or handed to another tool.
 */
export function createSummary(report: Report) {
  const { options } = report;
  const toWorkspacePath = (path: string) => relativeToWorkspace(path, options.workspaceRoot);

  return {
    package: report.packageName,
    config: toWorkspacePath(options.configPath),
    strict: options.strict,
    status: report.status,
    forbiddenPackages: options.config.forbiddenPackages,
    orphanedAllowlistEntries: report.orphans,
    fixtures: report.outcomes.map(outcome => ({
      fixture: outcome.fixture,
      status: outcome.status,
      analyzerReport: options.analyze
        ? toWorkspacePath(join(fixtureOutputPath(outcome.fixture, options.packageRoot), 'report.json'))
        : null,
      error: outcome.error ?? null,
      sourceResolved: outcome.sourceResolved.map(toWorkspacePath),
      allowedViolations: outcome.allowed,
      tolerated: outcome.tolerated,
      regressions: outcome.regressions,
      stale: outcome.stale,
      leaks: Object.fromEntries(
        Object.entries(outcome.leaks).map(([name, leak]) => [
          name,
          {
            modules: leak.modules,
            exports: leak.exports.map(({ name: exportName, importers }) => ({
              name: exportName,
              importers: importers.map(importer => ({ module: toWorkspacePath(importer.module), via: importer.via })),
            })),
          },
        ]),
      ),
    })),
  };
}

export function matchesPackagePattern(pattern: string, name: string): boolean {
  return pattern.endsWith('/*') ? name.startsWith(pattern.slice(0, -1)) : name === pattern;
}

export function count(value: number, singular: string, plural?: string): string {
  return `${value} ${value === 1 ? singular : plural ?? `${singular}s`}`;
}

function badge(label: string): string {
  return `  ${label.padEnd(BADGE_WIDTH)}`;
}

function configLabel(options: RuntimeOptions): string {
  return relativeToWorkspace(options.configPath, options.workspaceRoot);
}

function sumBy<TItem>(items: TItem[], valueOf: (item: TItem) => number): number {
  return items.reduce((total, item) => total + valueOf(item), 0);
}
