import { Tree, formatFiles, getProjects, joinPathFragments, logger, readJson, updateJson } from '@nx/devkit';
import chalk from 'chalk';
import semver from 'semver';

import type { PackageJson } from '../../types';
import { PeerDependencyCheck, VerifyPeerDependenciesGeneratorSchema } from './schema';

type ViolationKind = PeerDependencyCheck;

const ALL_CHECKS: ViolationKind[] = [
  'missing-peer-forward',
  'incompatible-peer-range',
  'invalid-peer-range',
  'orphaned-peer-meta',
  'unverified-peer-range',
];

/**
 * `missing-peer-forward` is opt-in. Hoisted (npm/yarn classic) and isolated-mode installers
 * (pnpm, midgard-yarn-strict) resolve a peer from the nearest ancestor that provides it, and
 * isolated mode additionally propagates peer metadata up the graph on its own, so re-declaring a
 * dependency's peer is a no-op there. It is only required under Yarn PnP strict resolution, and
 * declaring peers a package never imports actively costs something: the peer set is part of a
 * package's virtual instance key, and consumers are asked to satisfy a module that is never loaded.
 */
/**
 * `unverified-peer-range` is opt-in for a different reason: it reports a gap in what we are able
 * to verify offline rather than a defect, and closing it means either raising a dependency floor
 * or accepting the risk - both judgement calls rather than mechanical fixes.
 */
const OPT_IN_CHECKS: ViolationKind[] = ['missing-peer-forward', 'unverified-peer-range'];

const DEFAULT_CHECKS: ViolationKind[] = ALL_CHECKS.filter(check => !OPT_IN_CHECKS.includes(check));

interface Violation {
  kind: ViolationKind;
  /** package that owns the problem */
  packageName: string;
  packageJsonPath: string;
  /** the peer dependency name */
  peer: string;
  /** dependency that requires the peer (missing-peer-forward / incompatible-peer-range only) */
  requiredBy?: string;
  /** range required by `requiredBy` */
  requiredRange?: string;
  /** range currently declared by `packageName` */
  declaredRange?: string;
  /** version of `requiredBy` whose manifest was actually consulted */
  inspectedVersion?: string;
  /** lowest version the dependency range permits, when it differs from `inspectedVersion` */
  lowestPermittedVersion?: string;
}

/**
 * Records what the run actually looked at. Without it a clean result is ambiguous: nothing to
 * report and nothing verified look identical.
 */
interface Trace {
  skipped: Array<{ packageName: string; reason: string }>;
  verified: Array<{
    packageName: string;
    packageJsonPath: string;
    declared: string[];
    requirements: Array<{ peer: string; requiredBy: string; requiredRange: string; verdict: string }>;
  }>;
  /** dependency name -> packages that depend on it */
  unresolved: Map<string, Set<string>>;
  skippedRequirements: { optional: number; filtered: number; ownDependency: number };
}

function createTrace(): Trace {
  return {
    skipped: [],
    verified: [],
    unresolved: new Map(),
    skippedRequirements: { optional: 0, filtered: 0, ownDependency: 0 },
  };
}

interface PackageEntry {
  packageJson: PackageJson;
  packageJsonPath: string;
  /** nx project name, absent for the workspace root package.json */
  projectName?: string;
  /** nx project tags, e.g. `vNext` / `v8` */
  tags: string[];
  /** published to npm - only publishable packages carry a peer contract worth verifying */
  publishable: boolean;
}

/**
 * Ranges that carry no semver meaning for a published consumer, so they are skipped
 * during compatibility math.
 */
/**
 * Protocol ranges carry no semver meaning, so version math cannot say anything about them.
 * `*` is deliberately not listed: it is a valid semver range, and as a peer range it is a real
 * (maximally broad) claim that should be validated like any other.
 */
const NON_SEMVER_RANGE = /^(workspace:|portal:|link:|file:|npm:|patch:)/;

/**
 * Forwarding cascades - adding a peer to a package creates the same requirement for its
 * dependents - so `--fix` runs to a fixpoint. The bound only guards against a pathological
 * graph; in practice this settles in a handful of passes.
 */
const MAX_FIX_PASSES = 20;

/**
 * `--verbose` is an nx global flag: nx strips it from the generator schema but sets
 * `NX_VERBOSE_LOGGING`, which is exactly what `logger.verbose` is gated on. Tracing is therefore
 * built whenever that env var is set, and `logger.verbose` decides whether it is printed.
 */
function isVerbose() {
  return process.env.NX_VERBOSE_LOGGING === 'true';
}

export default async function (tree: Tree, schema: VerifyPeerDependenciesGeneratorSchema = {}) {
  const verbose = isVerbose();
  const peerFilter = toFilter(schema.peers);
  const projectFilter = toFilter(schema.project);
  const tagFilter = toFilter(schema.tag);
  // `--fix` can only repair missing-peer-forward, which is not a default check, so a bare
  // `--fix` would otherwise collect nothing and silently change nothing.
  const checks = resolveChecks(schema.checks, { fix: Boolean(schema.fix) });

  if (projectFilter || tagFilter) {
    assertFiltersMatch({ packages: readWorkspacePackages(tree), projectFilter, tagFilter });
  }

  const verify = (trace: Trace | null = null) => {
    const packages = readWorkspacePackages(tree);

    return {
      packages,
      violations: collectViolations(tree, { packages, peerFilter, projectFilter, tagFilter, checks, trace }),
    };
  };

  if (schema.fix) {
    let fixedCount = 0;

    for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
      const { packages, violations } = verify();
      const fixed = applyFixes(tree, { packages, violations });

      if (fixed.size === 0) {
        break;
      }

      fixedCount += fixed.size;
    }

    await formatFiles(tree);

    const trace = verbose ? createTrace() : null;
    const { violations } = verify(trace);

    if (trace) {
      reportTrace(trace, checks);
    }

    report(violations, { fixedCount, throwOnViolations: false });

    return;
  }

  const trace = verbose ? createTrace() : null;
  const { violations } = verify(trace);

  if (trace) {
    reportTrace(trace, checks);
  }

  report(violations, { fixedCount: 0, throwOnViolations: true });
}

const FIXABLE_CHECKS: ViolationKind[] = ['missing-peer-forward'];

function resolveChecks(value: string | undefined, options: { fix: boolean } = { fix: false }): Set<ViolationKind> {
  if (!value) {
    return new Set(options.fix ? [...DEFAULT_CHECKS, ...FIXABLE_CHECKS] : DEFAULT_CHECKS);
  }

  const requested = value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

  if (requested.includes('all')) {
    return new Set(ALL_CHECKS);
  }

  const unknown = requested.filter(check => !ALL_CHECKS.includes(check as ViolationKind));

  if (unknown.length > 0) {
    throw new Error(`Unknown check(s): ${unknown.join(', ')}. Known checks: ${ALL_CHECKS.join(', ')}, all`);
  }

  const resolved = new Set(requested as ViolationKind[]);

  if (options.fix) {
    FIXABLE_CHECKS.forEach(check => resolved.add(check));
  }

  return resolved;
}

function toFilter(value: string | undefined) {
  if (!value) {
    return null;
  }

  const values = value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

  return values.length > 0 ? new Set(values) : null;
}

/**
 * A project name that matches nothing would silently verify nothing, which reads as a pass.
 */
function assertFiltersMatch(options: {
  packages: Map<string, PackageEntry>;
  projectFilter: Set<string> | null;
  tagFilter: Set<string> | null;
}) {
  const { packages, projectFilter, tagFilter } = options;
  const knownProjects = new Set<string>();
  const knownTags = new Set<string>();

  for (const [packageName, entry] of packages) {
    knownProjects.add(packageName);

    if (entry.projectName) {
      knownProjects.add(entry.projectName);
    }

    entry.tags.forEach(tag => knownTags.add(tag));
  }

  const unknownProjects = [...(projectFilter ?? [])].filter(name => !knownProjects.has(name));

  if (unknownProjects.length > 0) {
    throw new Error(`Unknown project(s): ${unknownProjects.join(', ')}`);
  }

  const unknownTags = [...(tagFilter ?? [])].filter(tag => !knownTags.has(tag));

  if (unknownTags.length > 0) {
    throw new Error(`Unknown tag(s): ${unknownTags.join(', ')}`);
  }
}

function readWorkspacePackages(tree: Tree) {
  const packages = new Map<string, PackageEntry>();

  const register = (packageJsonPath: string, options: { projectName?: string; tags?: string[] } = {}) => {
    if (!tree.exists(packageJsonPath)) {
      return;
    }

    const packageJson = readJson<PackageJson>(tree, packageJsonPath);

    if (!packageJson.name) {
      return;
    }

    packages.set(packageJson.name, {
      packageJson,
      packageJsonPath,
      projectName: options.projectName,
      tags: options.tags ?? [],
      publishable: !packageJson.private,
    });
  };

  getProjects(tree).forEach((project, projectName) =>
    register(joinPathFragments(project.root, 'package.json'), { projectName, tags: project.tags ?? [] }),
  );
  register('package.json');

  return packages;
}

/**
 * Peers of a dependency. Workspace packages are read from the tree, everything else from
 * the installed node_modules copy. A dependency that cannot be resolved is skipped rather
 * than reported, so the generator stays usable before `yarn install`.
 */
function getDependencyManifest(
  tree: Tree,
  options: { packages: Map<string, PackageEntry>; dependencyName: string },
): { manifest: PackageJson; isWorkspace: boolean } | null {
  const { packages, dependencyName } = options;
  const workspacePackage = packages.get(dependencyName);

  if (workspacePackage) {
    return { manifest: workspacePackage.packageJson, isWorkspace: true };
  }

  const externalPackageJsonPath = `node_modules/${dependencyName}/package.json`;

  return tree.exists(externalPackageJsonPath)
    ? { manifest: readJson<PackageJson>(tree, externalPackageJsonPath), isWorkspace: false }
    : null;
}

/**
 * The manifest we can read offline is whichever version this workspace happens to have installed.
 * A consumer resolving the same declared range may legally get an older version with a narrower
 * peer range, so a range check against the installed copy is only as strong as the gap between
 * the two.
 */
function getUnverifiedFloor(options: { declaredDependencyRange: string; inspectedVersion: string }) {
  const { declaredDependencyRange, inspectedVersion } = options;

  if (NON_SEMVER_RANGE.test(declaredDependencyRange) || semver.validRange(declaredDependencyRange) === null) {
    return null;
  }

  const lowest = semver.minVersion(declaredDependencyRange);

  if (!lowest || !semver.valid(inspectedVersion) || lowest.version === inspectedVersion) {
    return null;
  }

  return lowest.version;
}

function collectViolations(
  tree: Tree,
  options: {
    packages: Map<string, PackageEntry>;
    peerFilter: Set<string> | null;
    projectFilter: Set<string> | null;
    tagFilter: Set<string> | null;
    checks: Set<ViolationKind>;
    trace: Trace | null;
  },
) {
  const { packages, peerFilter, projectFilter, tagFilter, checks, trace } = options;
  const violations: Violation[] = [];
  const isChecked = (peer: string) => !peerFilter || peerFilter.has(peer);

  for (const [packageName, entry] of packages) {
    const skipReason = getSkipReason({ packageName, entry, projectFilter, tagFilter });

    if (skipReason) {
      trace?.skipped.push({ packageName, reason: skipReason });
      continue;
    }

    const { packageJson, packageJsonPath } = entry;
    const traced: Trace['verified'][number] = {
      packageName,
      packageJsonPath,
      declared: Object.keys(packageJson.peerDependencies ?? {}),
      requirements: [],
    };
    trace?.verified.push(traced);

    violations.push(...getManifestViolations({ packageName, packageJsonPath, packageJson, isChecked, checks }));

    for (const [dependencyName, declaredDependencyRange] of Object.entries(packageJson.dependencies ?? {})) {
      const resolvedDependency = getDependencyManifest(tree, { packages, dependencyName });

      if (!resolvedDependency) {
        if (trace) {
          const dependents = trace.unresolved.get(dependencyName) ?? new Set<string>();
          dependents.add(packageName);
          trace.unresolved.set(dependencyName, dependents);
        }

        continue;
      }

      const dependencyManifest = resolvedDependency.manifest;
      const unverifiedFloor = resolvedDependency.isWorkspace
        ? null
        : getUnverifiedFloor({ declaredDependencyRange, inspectedVersion: dependencyManifest.version });

      for (const [peer, requiredRange] of Object.entries(dependencyManifest.peerDependencies ?? {})) {
        if (!isChecked(peer)) {
          if (trace) {
            trace.skippedRequirements.filtered++;
          }

          continue;
        }

        // `optional` means the peer may be absent, not that its version constraint disappears.
        // When this package does declare the peer, the range still has to be compatible.
        const isOptional = Boolean(dependencyManifest.peerDependenciesMeta?.[peer]?.optional);
        const declaredRange = packageJson.peerDependencies?.[peer];

        if (isOptional && !declaredRange) {
          if (trace) {
            trace.skippedRequirements.optional++;
          }

          continue;
        }

        // `dependencies` terminates the chain, `peerDependencies` forwards it. `devDependencies`
        // are never installed for consumers, so they cannot satisfy a published contract.
        if (packageJson.dependencies?.[peer]) {
          if (trace) {
            trace.skippedRequirements.ownDependency++;
          }

          continue;
        }

        traced.requirements.push({
          peer,
          requiredBy: dependencyName,
          requiredRange,
          verdict: !declaredRange
            ? 'not declared'
            : isRangeCompatible(declaredRange, requiredRange)
            ? `satisfied by peer '${declaredRange}'`
            : `INCOMPATIBLE with peer '${declaredRange}'`,
        });

        if (!declaredRange) {
          if (checks.has('missing-peer-forward')) {
            violations.push({
              kind: 'missing-peer-forward',
              packageName,
              packageJsonPath,
              peer,
              requiredBy: dependencyName,
              requiredRange,
            });
          }

          continue;
        }

        if (checks.has('incompatible-peer-range') && !isRangeCompatible(declaredRange, requiredRange)) {
          violations.push({
            kind: 'incompatible-peer-range',
            packageName,
            packageJsonPath,
            peer,
            requiredBy: dependencyName,
            requiredRange,
            declaredRange,
            inspectedVersion: dependencyManifest.version,
          });

          continue;
        }

        // The range check above only proves compatibility with the installed copy.
        if (checks.has('unverified-peer-range') && unverifiedFloor) {
          violations.push({
            kind: 'unverified-peer-range',
            packageName,
            packageJsonPath,
            peer,
            requiredBy: dependencyName,
            requiredRange,
            declaredRange,
            inspectedVersion: dependencyManifest.version,
            lowestPermittedVersion: unverifiedFloor,
          });
        }
      }
    }
  }

  return violations;
}

/**
 * Only publishable packages are verified: a private package is never installed by a consumer,
 * so it has no peer contract to honour and satisfies its own dependencies' peers from
 * devDependencies at install time.
 */
function getSkipReason(options: {
  packageName: string;
  entry: PackageEntry;
  projectFilter: Set<string> | null;
  tagFilter: Set<string> | null;
}): string | null {
  const { packageName, entry, projectFilter, tagFilter } = options;

  if (!entry.publishable) {
    return 'private';
  }

  if (tagFilter && !entry.tags.some(tag => tagFilter.has(tag))) {
    return 'outside --tag';
  }

  if (
    projectFilter &&
    !(projectFilter.has(packageName) || (entry.projectName && projectFilter.has(entry.projectName)))
  ) {
    return 'outside --project';
  }

  return null;
}

function getManifestViolations(options: {
  packageName: string;
  packageJsonPath: string;
  packageJson: PackageJson;
  isChecked: (peer: string) => boolean;
  checks: Set<ViolationKind>;
}) {
  const { packageName, packageJsonPath, packageJson, isChecked, checks } = options;
  const violations: Violation[] = [];
  const peerDependencies = packageJson.peerDependencies ?? {};

  for (const [peer, range] of Object.entries(peerDependencies)) {
    if (!isChecked(peer) || NON_SEMVER_RANGE.test(range)) {
      continue;
    }

    if (checks.has('invalid-peer-range') && semver.validRange(range) === null) {
      violations.push({ kind: 'invalid-peer-range', packageName, packageJsonPath, peer, declaredRange: range });
    }
  }

  for (const peer of Object.keys(packageJson.peerDependenciesMeta ?? {})) {
    if (checks.has('orphaned-peer-meta') && isChecked(peer) && !peerDependencies[peer]) {
      violations.push({ kind: 'orphaned-peer-meta', packageName, packageJsonPath, peer });
    }
  }

  return violations;
}

/**
 * Boundary versions of every comparator in a range, i.e. the points where membership can flip.
 */
function getRangeBoundaries(range: string) {
  const boundaries = new Set<string>();

  try {
    for (const comparators of new semver.Range(range).set) {
      for (const comparator of comparators) {
        const version = comparator.semver?.version;

        if (version) {
          boundaries.add(version);
        }
      }
    }
  } catch {
    return [];
  }

  return [...boundaries];
}

/**
 * `semver.subset` reports a false negative when the dominant range is a union of carets such
 * as `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`: it tests containment against each comparator
 * set individually rather than against their union, so a range spanning several carets looks
 * unsupported even though the union covers it.
 *
 * Probing boundaries is union-safe and deterministic. Both ranges are unions of intervals whose
 * endpoints are comparator versions, so whenever `sub` is not contained in `dom` a witness
 * version exists at - or immediately above - one of those endpoints.
 */
function isSubset(sub: string, dom: string) {
  const probes = new Set<string>();

  // Comparator versions alone miss ranges that are unbounded below - `*` and `<20.0.0` contribute
  // no lower boundary, so nothing would probe beneath the dominant range's floor.
  const lowest = semver.minVersion(sub);

  if (lowest) {
    probes.add(lowest.version);
  }

  for (const range of [sub, dom]) {
    for (const boundary of getRangeBoundaries(range)) {
      probes.add(boundary);

      const justAbove = semver.inc(boundary, 'patch');

      if (justAbove) {
        probes.add(justAbove);
      }
    }
  }

  for (const probe of probes) {
    if (semver.satisfies(probe, sub) && !semver.satisfies(probe, dom)) {
      return false;
    }
  }

  return true;
}

/**
 * A peer range is a promise to consumers: "install any version in here and I work". It is only
 * honest when every version it accepts is also accepted by our own dependencies, otherwise a
 * consumer can follow the contract exactly and still end up with a version one of our
 * dependencies rejects.
 *
 * Unlike `missing-peer-forward` this is installer-independent - it is version math, not
 * resolution mechanics.
 */
function isRangeCompatible(declaredRange: string, requiredRange: string) {
  if (NON_SEMVER_RANGE.test(declaredRange) || NON_SEMVER_RANGE.test(requiredRange)) {
    return true;
  }

  if (semver.validRange(declaredRange) === null || semver.validRange(requiredRange) === null) {
    return true;
  }

  return isSubset(declaredRange, requiredRange);
}

function applyFixes(tree: Tree, options: { packages: Map<string, PackageEntry>; violations: Violation[] }) {
  const { packages, violations } = options;
  const fixed = new Set<Violation>();
  const fixable = violations.filter(violation => violation.kind === 'missing-peer-forward');
  const byPackage = new Map<string, Violation[]>();

  for (const violation of fixable) {
    byPackage.set(violation.packageName, (byPackage.get(violation.packageName) ?? []).concat(violation));
  }

  for (const [packageName, packageViolations] of byPackage) {
    const entry = packages.get(packageName);

    if (!entry) {
      continue;
    }

    const resolved = new Map<string, string>();

    for (const [peer, peerViolations] of groupBy(packageViolations, violation => violation.peer)) {
      const range = getNarrowestRange(peerViolations.map(violation => violation.requiredRange!));

      if (range === null) {
        logger.warn(
          `[${packageName}] cannot auto-fix '${peer}': dependencies require mutually exclusive ranges ` +
            `(${peerViolations.map(violation => violation.requiredRange).join(', ')}). Resolve manually.`,
        );
        continue;
      }

      resolved.set(peer, range);
      peerViolations.forEach(violation => fixed.add(violation));
    }

    if (resolved.size === 0) {
      continue;
    }

    updateJson<PackageJson>(tree, entry.packageJsonPath, json => {
      const peerDependencies = { ...(json.peerDependencies ?? {}) };

      for (const [peer, range] of resolved) {
        peerDependencies[peer] = range;
      }

      json.peerDependencies = sortKeys(peerDependencies);

      return json;
    });
  }

  return fixed;
}

/**
 * Picks the range that every other candidate contains, so the forwarded range never
 * promises more than the strictest dependency allows. Returns `null` when no candidate
 * dominates - that needs a human.
 */
function getNarrowestRange(ranges: string[]) {
  const unique = [...new Set(ranges)];

  if (unique.length === 1) {
    return unique[0];
  }

  return (
    unique.find(candidate =>
      unique.every(other =>
        semver.validRange(candidate) && semver.validRange(other) ? isSubset(candidate, other) : candidate === other,
      ),
    ) ?? null
  );
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const result = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    result.set(key, (result.get(key) ?? []).concat(item));
  }

  return result;
}

function sortKeys(record: Record<string, string>) {
  return Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
}

function reportTrace(trace: Trace, checks: Set<ViolationKind>) {
  const requirementCount = trace.verified.reduce((total, entry) => total + entry.requirements.length, 0);
  const skippedByReason = groupBy(trace.skipped, item => item.reason);

  logger.verbose(chalk.bold('\nscope'));
  logger.verbose(`  checks   ${[...checks].join(', ')}`);
  logger.verbose(
    `  packages ${trace.verified.length} verified, ${trace.skipped.length} skipped` +
      (trace.skipped.length
        ? chalk.grey(` (${[...skippedByReason].map(([reason, items]) => `${items.length} ${reason}`).join(', ')})`)
        : ''),
  );

  for (const entry of trace.verified) {
    logger.verbose('');
    logger.verbose(chalk.bold(entry.packageName) + chalk.grey(` ${entry.packageJsonPath}`));
    logger.verbose(
      `  declares ${entry.declared.length ? entry.declared.join(', ') : chalk.grey('(no peer dependencies)')}`,
    );

    if (entry.requirements.length === 0) {
      logger.verbose(chalk.grey('  no peer requirements from dependencies'));
      continue;
    }

    for (const requirement of entry.requirements) {
      const verdict = requirement.verdict.startsWith('INCOMPATIBLE')
        ? chalk.red(requirement.verdict)
        : requirement.verdict === 'not declared'
        ? chalk.yellow(requirement.verdict)
        : chalk.green(requirement.verdict);

      logger.verbose(
        `  ${requirement.peer} ${chalk.grey(
          `'${requirement.requiredRange}' required by ${requirement.requiredBy}`,
        )} -> ${verdict}`,
      );
    }
  }

  if (trace.unresolved.size > 0) {
    logger.verbose(chalk.bold('\nunresolved dependencies') + chalk.grey(' (not installed, peers unknown - skipped)'));

    for (const [dependencyName, dependents] of [...trace.unresolved].sort()) {
      logger.verbose(chalk.grey(`  ${dependencyName} (required by ${dependents.size} package(s))`));
    }
  }

  const { optional, filtered, ownDependency } = trace.skippedRequirements;

  logger.verbose(chalk.bold('\ntotals'));
  logger.verbose(`  ${requirementCount} peer requirement(s) checked across ${trace.verified.length} package(s)`);
  logger.verbose(
    chalk.grey(
      `  skipped: ${optional} optional, ${ownDependency} provided as own dependency, ${filtered} outside --peers`,
    ),
  );
}

const VIOLATION_DESCRIPTIONS: Record<ViolationKind, string> = {
  'missing-peer-forward':
    'under Yarn PnP strict a package must re-declare every non-optional peer its dependencies require',
  'incompatible-peer-range': 'the range we advertise to consumers accepts versions one of our own dependencies rejects',
  'invalid-peer-range': 'peer dependency range is not a valid semver range',
  'orphaned-peer-meta': 'peerDependenciesMeta entry has no matching peerDependencies entry',
  'unverified-peer-range':
    'the range was only checked against the installed copy; the declared dependency range permits older versions that were not inspected',
};

function report(violations: Violation[], options: { fixedCount: number; throwOnViolations: boolean }) {
  if (options.fixedCount > 0) {
    logger.info(chalk.green(`✔ fixed ${options.fixedCount} missing peer dependency forward(s)`));
  }

  if (violations.length === 0) {
    logger.info(chalk.green('✔ no peer dependency violations found'));
    return;
  }

  for (const [kind, kindViolations] of groupBy(violations, violation => violation.kind)) {
    logger.log('');
    logger.log(chalk.red.bold(`${kind} (${kindViolations.length})`));
    logger.log(chalk.grey(`  ${VIOLATION_DESCRIPTIONS[kind as ViolationKind]}`));

    for (const violation of [...kindViolations].sort((a, b) => a.packageName.localeCompare(b.packageName))) {
      logger.log(chalk.red(`  ✘ ${violation.packageName}`) + chalk.grey(` (${violation.packageJsonPath})`));

      switch (violation.kind) {
        case 'missing-peer-forward':
          logger.log(
            `      must declare peerDependencies['${violation.peer}'] ` +
              chalk.grey(`- required by ${violation.requiredBy} as '${violation.requiredRange}'`),
          );
          break;
        case 'incompatible-peer-range':
          logger.log(
            `      declares '${violation.peer}': '${violation.declaredRange}' ` +
              chalk.grey(
                `but ${violation.requiredBy}@${violation.inspectedVersion ?? 'workspace'} requires '${
                  violation.requiredRange
                }'`,
              ),
          );
          break;
        case 'invalid-peer-range':
          logger.log(`      '${violation.peer}': '${violation.declaredRange}' is not a valid semver range`);
          break;
        case 'unverified-peer-range':
          logger.log(
            `      '${violation.peer}': '${violation.declaredRange}' checked against ${violation.requiredBy}@${violation.inspectedVersion} ` +
              chalk.grey(
                `but the declared range also permits ${violation.requiredBy}@${violation.lowestPermittedVersion}`,
              ),
          );
          break;
        case 'orphaned-peer-meta':
          logger.log(`      peerDependenciesMeta['${violation.peer}'] has no peerDependencies['${violation.peer}']`);
          break;
      }
    }
  }

  logger.log('');

  // Only missing-peer-forward is auto-fixable; promising `--fix` for anything else sends people
  // to a command that cannot help them.
  if (violations.some(violation => FIXABLE_CHECKS.includes(violation.kind))) {
    logger.info(`🛠️ FIX: run 'nx g @fluentui/workspace-plugin:verify-peer-dependencies --fix'`);
  } else {
    logger.info(`🛠️ These violations need a manual decision - '--fix' cannot resolve them.`);
  }

  // Throwing from a generator makes nx discard the whole tree, so in --fix mode the applied
  // fixes must be allowed to flush. Re-run in verify mode to get a failing exit code.
  if (!options.throwOnViolations) {
    logger.warn(
      chalk.yellow(`${violations.length} violation(s) could not be fixed automatically and need manual attention`),
    );

    return;
  }

  throw new Error(`peer dependency violations found (${violations.length})`);
}
