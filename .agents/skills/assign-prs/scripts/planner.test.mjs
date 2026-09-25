import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fingerprintPlan, loadProfiles, parseArguments } from './plan.mjs';
import { dedupeQueue, detectArea, planAssignments, validateProfiles } from './planner.mjs';

test('approval fingerprint includes effective reviewer target and stale threshold', () => {
  const snapshot = { profiles: [{ repo: 'microsoft/fluentui', settings: { reviewers: 1 } }], assignments: [] };
  const initial = fingerprintPlan(snapshot, {});

  assert.equal(initial, fingerprintPlan(snapshot, { reviewers: 1, staleDays: 90 }));
  assert.notEqual(initial, fingerprintPlan(snapshot, { reviewers: 2 }));
  assert.notEqual(initial, fingerprintPlan(snapshot, { staleDays: 30 }));
});

test('validates all repository profiles against the shared schema', async () => {
  const profiles = await loadProfiles();
  assert.deepEqual(profiles.map(profile => profile.repo).sort(), [
    'microsoft/fluentui',
    'microsoft/fluentui-contrib',
    'microsoft/fluentui-system-icons',
    'microsoft/monosize',
  ]);
});

test('parses repeatable and equals-form options using Node argument parsing', () => {
  assert.deepEqual(
    parseArguments([
      '--repo=microsoft/fluentui',
      '--repo',
      'microsoft/monosize',
      '--team=microsoft/cxe-prg',
      '--reviewers=2',
      '--stale-days',
      '0',
    ]),
    {
      repos: ['microsoft/fluentui', 'microsoft/monosize'],
      teams: ['microsoft/cxe-prg'],
      account: undefined,
      reviewers: 2,
      staleDays: 0,
    },
  );
  assert.throws(() => parseArguments(['--reviewers=0']), /Invalid --reviewers/);
  assert.throws(() => parseArguments(['--unknown=value']), /Unknown option/);
});

test('deduplicates overlapping queues within a repository, not across repositories', () => {
  const issues = [
    { repo: 'microsoft/fluentui', number: 42, queue: 'microsoft/cxe-prg' },
    { repo: 'microsoft/fluentui', number: 42, queue: 'microsoft/fluentui-react-build' },
    { repo: 'microsoft/monosize', number: 42, queue: 'microsoft/fluentui-react-build' },
  ];

  assert.deepEqual(dedupeQueue(issues), [
    { repo: 'microsoft/fluentui', number: 42, queues: ['microsoft/cxe-prg', 'microsoft/fluentui-react-build'] },
    { repo: 'microsoft/monosize', number: 42, queues: ['microsoft/fluentui-react-build'] },
  ]);
});

const profile = {
  repo: 'microsoft/fluentui',
  queues: ['microsoft/cxe-prg'],
  team: { org: 'microsoft', slug: 'cxe-prg' },
  settings: { reviewers: 1, areaMatch: 'preference' },
  areas: {
    components: { paths: ['packages/react-components/**'], scopes: ['react-*'] },
    motion: { paths: ['packages/react-components/react-motion*/**'], scopes: ['react-motion*'] },
  },
  reviewers: [
    { login: 'alice', eligible: true, primary: ['components'], secondary: [], fallbackEligible: false },
    { login: 'bob', eligible: true, primary: ['motion'], secondary: [], fallbackEligible: false },
    { login: 'carol', eligible: true, primary: [], secondary: [] },
  ],
};
const issue = (overrides = {}) => ({
  repo: profile.repo,
  number: 1,
  queues: profile.queues,
  author: 'writer',
  title: 'feat(react-motion): hi',
  updatedAt: '2026-09-22T00:00:00Z',
  files: ['packages/react-components/react-motion-preview/src/a.ts'],
  requestedReviewers: [],
  reviewedBy: [],
  ...overrides,
});
const options = { now: '2026-09-23T00:00:00Z' };

test('routes nested paths ahead of broad patterns and falls back to scope', () => {
  assert.equal(detectArea(profile, issue()), 'motion');
  assert.equal(detectArea(profile, issue({ files: ['change/a.json'] })), 'motion');
  assert.equal(detectArea(profile, issue({ title: 'chore: misc', files: ['unknown/file'] })), null);
});

test('counts existing coverage only in the matched area and requests the shortfall', () => {
  const rosters = { 'microsoft/cxe-prg': ['alice', 'bob', 'carol'] };
  const results = planAssignments(
    [profile],
    [issue({ requestedReviewers: ['alice'] }), issue({ number: 2, requestedReviewers: ['bob'] })],
    rosters,
    options,
  );
  assert.deepEqual(results[0].selected, [{ login: 'bob', match: 'primary' }]);
  assert.equal(results[0].existing, 0);
  assert.equal(results[1].existing, 1);
  assert.deepEqual(results[1].selected, []);
});

test('honors author exclusion and fallback opt-out; reports exhausted hard pools', () => {
  const rosters = { 'microsoft/cxe-prg': ['alice', 'bob', 'carol'] };
  const unknown = issue({ author: 'carol', title: 'chore: misc', files: ['other/file'] });
  assert.deepEqual(planAssignments([profile], [unknown], rosters, options)[0].selected, []);
  const hard = { ...profile, settings: { reviewers: 1, areaMatch: 'hard' } };
  assert.equal(planAssignments([hard], [issue({ author: 'bob' })], rosters, options)[0].coverage, 0);
  assert.equal(planAssignments([profile], [issue({ author: 'bob' })], rosters, options)[0].coverage, 0);
});

test('balances shared logins across repos while respecting each roster', () => {
  const other = {
    ...profile,
    repo: 'microsoft/monosize',
    queues: ['microsoft/fluentui-react-build'],
    team: { org: 'microsoft', slug: 'build' },
    reviewers: [
      { login: 'alice', eligible: true, primary: ['components'], secondary: [] },
      { login: 'bob', eligible: true, primary: ['components'], secondary: [] },
    ],
  };
  const rosters = { 'microsoft/cxe-prg': ['alice', 'bob', 'carol'], 'microsoft/build': ['alice', 'bob'] };
  const work = issue({ number: 4, title: 'feat(react-button): hi', files: ['packages/react-components/a.ts'] });
  const results = planAssignments(
    [profile, other],
    [work, { ...work, repo: other.repo, number: 4, queues: other.queues }],
    rosters,
    options,
  );
  assert.equal(results[0].selected[0].login, 'alice');
  assert.equal(results[1].selected[0].login, 'bob');
});

test('excludes stale and Dependabot PRs and rejects invalid profiles', () => {
  const rosters = { 'microsoft/cxe-prg': ['alice', 'bob'] };
  assert.deepEqual(
    planAssignments(
      [profile],
      [issue({ author: 'dependabot[bot]' }), issue({ number: 2, updatedAt: '2025-01-01T00:00:00Z' })],
      rosters,
      options,
    ).map(result => [result.bucket, result.selected.length]),
    [
      ['dependabot', 0],
      ['stale', 0],
    ],
  );
  assert.throws(() => validateProfiles([profile, profile]), /duplicate repository/);
  assert.throws(
    () =>
      validateProfiles([
        { ...profile, reviewers: [{ login: 'alice', eligible: true, primary: ['typo'], secondary: [] }] },
      ]),
    /undeclared area/,
  );
});

test('rejects unconfigured queues and unknown repos before contacting GitHub', () => {
  const command = new URL('./plan.mjs', import.meta.url).pathname;
  const unconfigured = spawnSync(
    process.execPath,
    [command, '--repo', 'microsoft/monosize', '--team', 'microsoft/teams-prg'],
    { encoding: 'utf8' },
  );
  assert.equal(unconfigured.status, 1);
  assert.match(unconfigured.stderr, /must be a configured queue/);

  const unknown = spawnSync(process.execPath, [command, '--repo', 'microsoft/not-configured'], { encoding: 'utf8' });
  assert.equal(unknown.status, 1);
  assert.match(unknown.stderr, /Unknown repository/);
});
