import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { classifyChecks, createCli, formatInspection, parseArguments, remoteMatches } from './dependabot.mjs';

const head = 'a'.repeat(40);
const base = 'b'.repeat(40);
const pass = [{ name: 'main', bucket: 'pass', state: 'SUCCESS', link: 'https://example.test/check' }];
const result = value => ({ status: 0, stdout: JSON.stringify(value), stderr: '' });
const ok = stdout => ({ status: 0, stdout, stderr: '' });
function fixture(overrides = {}) {
  const pull = {
    number: 123,
    state: 'open',
    draft: false,
    title: 'Dependency update',
    html_url: 'https://github.com/microsoft/fluentui/pull/123',
    user: { login: 'dependabot[bot]' },
    head: { sha: head, ref: 'dependabot/npm_and_yarn/update', repo: { full_name: 'microsoft/fluentui' } },
    base: { sha: base, ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    mergeable: true,
    mergeable_state: 'clean',
  };
  const state = {
    pull,
    required: pass,
    all: pass,
    account: 'maintainer',
    push: true,
    reviews: [],
    decision: 'REVIEW_REQUIRED',
    calls: [],
    ...overrides,
  };
  function gh(args) {
    state.calls.push(args);
    if (args[0] === 'pr' && args[1] === 'checks') {
      const checks = args.includes('--required') ? state.required : state.all;
      if (state.checkError) {
        return { status: 1, stdout: '', stderr: 'HTTP 403: Forbidden' };
      }
      if (state.noCheckMessage) {
        return { status: 1, stdout: '', stderr: 'no checks reported on the branch' };
      }
      return {
        ...result(checks),
        status: checks.some(check => check.bucket === 'fail')
          ? 1
          : checks.some(check => check.bucket === 'pending')
          ? 8
          : 0,
      };
    }
    if (args[0] === 'pr' && args[1] === 'view') {
      return result({
        reviewDecision: state.decision,
        autoMergeRequest: state.pull.auto_merge
          ? { mergeMethod: state.pull.auto_merge.merge_method.toUpperCase() }
          : null,
      });
    }
    if (args[0] === 'pr' && args[1] === 'merge') {
      if (state.mergeError) {
        return { status: 1, stdout: '', stderr: 'merge denied' };
      }
      state.pull.auto_merge = { merge_method: 'squash' };
      if (state.mergeImmediately) {
        state.pull.merged = true;
        state.pull.state = 'closed';
        state.pull.auto_merge = null;
      }
      return ok('');
    }
    assert.equal(args[0], 'api');
    const endpoint = args[1];
    if (endpoint === 'user') {
      return result({ login: state.account });
    }
    if (endpoint === 'repos/microsoft/fluentui') {
      return result({ permissions: { push: state.push } });
    }
    if (endpoint.includes('/rules/branches/')) {
      return result([
        { type: 'required_status_checks', parameters: { required_status_checks: [{ context: 'main' }] } },
      ]);
    }
    if (endpoint.includes('/pulls?')) {
      assert.ok(args.includes('--paginate'));
      assert.ok(!endpoint.includes('base='));
      return result(state.discoveredPages || [[state.pull], []]);
    }
    if (endpoint.includes('/reviews?')) {
      return result([state.reviews]);
    }
    if (endpoint.endsWith('/reviews')) {
      if (state.reviewError) {
        return { status: 1, stdout: '', stderr: 'approval denied' };
      }
      state.reviews.push({ state: 'APPROVED', commit_id: state.pull.head.sha, user: { login: state.account } });
      return result(state.reviews.at(-1));
    }
    if (/repos\/microsoft\/fluentui\/pulls\/\d+$/.test(endpoint)) {
      if (state.failedPr === Number(endpoint.split('/').at(-1))) {
        return { status: 1, stdout: '', stderr: 'HTTP 403: inspection denied' };
      }
      if (state.pulls) return result(state.pulls[Number(endpoint.split('/').at(-1))]);
      if (state.readPull) {
        state.readPull(state);
      }
      return result(state.pull);
    }
    throw new Error(`Unexpected gh command: ${args.join(' ')}`);
  }
  const run = (program, args) => {
    if (program === 'gh') {
      return gh(args);
    }
    assert.equal(program, 'git');
    assert.equal(args[0], 'check-ref-format');
    return ok('');
  };
  return { state, run, gh };
}
const finalize = (extra = []) =>
  parseArguments(['finalize', '--pr', '123', '--expect-head', head, '--reviewed', ...extra]);
const mutations = calls => calls.filter(args => args.includes('POST') || (args[0] === 'pr' && args[1] === 'merge'));

test('strict arguments support repeatable PRs and reject unsafe/irrelevant options', () => {
  assert.deepEqual(parseArguments(['inspect', '--pr=123', '--pr', '456', '--pr=123']).prs, [123, 456]);
  for (const args of [
    ['inspect', '--pr', '-1'],
    ['inspect', '--pr', '9007199254740992'],
    ['inspect', '--unknown'],
    ['inspect', '--account='],
    ['inspect', '--expect-head', 'short'],
    ['inspect', '--wait', '60'],
    ['inspect', '--pr', '123', '--expect-head', head, '--wait', '3601'],
    ['checkout', '--pr', '123'],
    ['push', '--pr', '123', '--expect-head', head],
    ['finalize', '--pr', '123', '--expect-head', head],
    ['inspect', '--format', 'html'],
    ['checkout', '--pr', '123', '--expect-head', head, '--format', 'markdown'],
  ]) {
    assert.throws(() => parseArguments(args));
  }
});

test('inspection output defaults to JSON and accepts explicit Markdown reports', () => {
  assert.equal(parseArguments(['inspect']).format, 'json');
  assert.equal(parseArguments(['inspect', '--format=markdown']).format, 'markdown');
});

test('candidate report lists PRs, inspected heads, CI, proposed evaluation, and pending user approval', async () => {
  const { run, state } = fixture();
  const inspected = await createCli({ run })(parseArguments(['inspect', '--format', 'markdown']));
  const report = formatInspection(inspected);
  assert.match(report, /awaiting user approval/);
  assert.match(report, /Account: \*\*maintainer\*\*/);
  assert.match(report, /PRs: \*\*1\*\*/);
  assert.match(report, /\[#123\]\(https:\/\/github.com\/microsoft\/fluentui\/pull\/123\)/);
  assert.match(report, /Dependency update/);
  assert.match(report, /aaaaaaa/);
  assert.match(report, /passing/);
  assert.match(report, /Review diff; no repair indicated/);
  assert.match(report, /get explicit approval of PRs and actions/);
  assert.equal(mutations(state.calls).length, 0);
});

test('blocked candidate reports remain visible and do not present blocked/pending PRs as repair-ready', async () => {
  const { run } = fixture({ required: [{ name: 'main', bucket: 'fail' }] });
  const inspected = await createCli({ run })(parseArguments(['inspect']));
  assert.equal(inspected.status, 'blocked');
  assert.match(formatInspection(inspected), /Inspect failure and evaluate a scoped repair/);
  assert.match(
    formatInspection({ ...inspected, pulls: [{ ...inspected.pulls[0], mergeable: false }] }),
    /Report blocker; no changes/,
  );
  assert.match(
    formatInspection({ ...inspected, pulls: [{ ...inspected.pulls[0], checkState: 'pending' }] }),
    /Observe\/report checks; no changes/,
  );
});

test('candidate reports escape untrusted titles and do not interpret their markup or table delimiters', () => {
  const report = formatInspection({
    account: 'maintainer',
    pulls: [
      {
        pr: 123,
        head,
        title: '<script> | [click](bad)\nnext',
        checkState: 'passing',
        reviewDecision: 'REVIEW_REQUIRED',
        mergeState: 'clean',
        mergeable: true,
      },
    ],
  });
  assert.ok(report.includes('&lt;script&gt; \\| \\[click\\](bad) next'));
  assert.ok(!report.includes('<script>'));
});

test('empty candidate reports explicitly stop without proposing mutations', () => {
  const report = formatInspection({ account: 'maintainer', pulls: [] });
  assert.match(report, /PRs: \*\*0\*\*/);
  assert.match(report, /No matching open Dependabot PRs. Nothing will be changed./);
  assert.ok(!report.includes('| PR |'));
});

test('skill requires a chat-visible report and explicit approval before mutation steps', () => {
  const skill = readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8');
  assert.match(skill, /Invocation authorizes \*\*read-only discovery only\*\*/);
  assert.match(skill, /Render the candidate table in the chat response/);
  assert.match(skill, /Then use `ask_user`/);
  assert.match(skill, /Unavailable\/declined\/ambiguous approval means \*\*no mutations\*\*/);
  assert.match(skill, /Repair-only approval never authorizes review\/auto-merge or closing PRs/);
  assert.ok(
    skill.indexOf('Mandatory visible report and approval checkpoint') < skill.indexOf('## 2. Repair and validate'),
  );
  assert.ok(!skill.includes('Invocation authorizes eligible PR repairs'));
});

test('skill proposes approved closure for updates fully present on master, not a silent skip', () => {
  const skill = readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8');
  assert.match(skill, /Already present on master -> propose "Close superseded PR"/);
  assert.match(skill, /no GitHub PR review approval is needed/);
  assert.match(skill, /For groups, all members must be superseded/);
  assert.match(skill, /root lockfile\/transitive remediation/);
  assert.match(skill, /Only execute closure when the user-confirmed table action is \*\*Close superseded PR\*\*/);
  assert.match(skill, /do not request a GitHub PR approval or a second closure confirmation/);
  assert.match(
    skill,
    /If the head or master changed, refresh the supersession proof\/report and obtain approval again/,
  );
  assert.match(skill, /gh pr close "\$PR" --repo microsoft\/fluentui/);
  assert.match(skill, /without deleting the branch/);
  assert.ok(!skill.includes('Skip drafts/closed/obsolete/excluded'));
});

test('skill supplies concrete All/List choices and a structured per-PR radio picker', () => {
  const skill = readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8');
  const schemas = [...skill.matchAll(/```json\n([\s\S]*?)\n```/g)].map(match => JSON.parse(match[1]));
  assert.equal(schemas.length, 2);
  const decision = schemas[0].properties.action;
  assert.equal(decision.type, 'string');
  assert.deepEqual(
    decision.oneOf.map(option => option.const),
    ['all', 'list', 'inspect', 'cancel'],
  );
  assert.equal(decision.default, 'inspect');
  const selection = schemas[1].properties.pr_123;
  assert.equal(selection.type, 'string');
  assert.deepEqual(
    selection.oneOf.map(option => option.const),
    ['run', 'skip'],
  );
  assert.equal(selection.default, 'skip');
  assert.match(selection.title, /microsoft\/fluentui#123.*Close superseded PR/);
  assert.match(skill, /Generate `pr_<number>` fields from the displayed candidates/);
  assert.match(skill, /Submit all PR groups in one question/);
});

test('skill continues the approved queue instead of asking for PR numbers or a redundant confirmation', () => {
  const skill = readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8');
  assert.match(skill, /\*\*`all`:\*\* Immediately execute the listed actions for every actionable row/);
  assert.match(skill, /Do not ask the user to provide PR numbers, reconfirm the same plan, run commands/);
  assert.match(skill, /Never ask for a comma-separated or free-text PR list/);
  assert.match(skill, /execute exactly the rows selected `run`/);
  assert.match(skill, /do not ask for another approval/);
  assert.match(skill, /If none are selected, report no changes and stop/);
  assert.match(skill, /must not fall back to an instruction-only\/manual handoff/);
});

test('check classification never equates missing, cancelled, or unfinished checks with passing', () => {
  assert.equal(classifyChecks([], []), 'missing');
  assert.equal(classifyChecks(pass, pass), 'passing');
  assert.equal(classifyChecks([{ bucket: 'skipping' }], []), 'pending');
  assert.equal(classifyChecks(pass, [{ bucket: 'pending' }]), 'pending');
  assert.equal(classifyChecks(pass, [{ bucket: 'cancel' }]), 'failing');
  assert.equal(classifyChecks(pass, [{ bucket: 'skipping' }]), 'passing');
});

test('remote resolution accepts only exact upstream fetch and push URLs', () => {
  assert.equal(remoteMatches('git@github.com:microsoft/fluentui.git\ngit@github.com:someone/fluentui.git'), false);
  for (const url of [
    'git@github.com:microsoft/fluentui.git',
    'https://github.com/microsoft/fluentui',
    'ssh://git@github.com/microsoft/fluentui.git',
  ]) {
    assert.equal(remoteMatches(url), true);
  }
  for (const url of [
    'git@github.com:Hotell/fluentui.git',
    'https://github.com/microsoft/fluentui-other',
    'https://github.com.evil/microsoft/fluentui',
    'https://user@github.com/microsoft/fluentui',
  ]) {
    assert.equal(remoteMatches(url), false);
  }
});

test('inspect paginates and returns head-bound normalized check state without mutations', async () => {
  const { state, run } = fixture();
  const output = await createCli({ run })(parseArguments(['inspect']));
  assert.equal(output.status, 'ok');
  assert.equal(output.pulls[0].head, head);
  assert.equal(output.pulls[0].checkState, 'passing');
  assert.equal(output.pulls[0].eligibility, 'review-update-members');
  assert.equal(mutations(state.calls).length, 0);
});

test('inspect catches a required context that has not reported at all', async () => {
  const { run } = fixture({ required: [{ name: 'other', bucket: 'pass' }] });
  const output = await createCli({ run })(parseArguments(['inspect', '--pr', '123']));
  assert.equal(output.status, 'blocked');
  assert.deepEqual(output.pulls[0].missingChecks, ['main']);
});

test('inspect distinguishes no checks from authentication/transport failures', async () => {
  const absent = fixture({ noCheckMessage: true });
  assert.equal((await createCli({ run: absent.run })(parseArguments(['inspect']))).pulls[0].checkState, 'missing');
  const denied = fixture({ checkError: true });
  const output = await createCli({ run: denied.run })(parseArguments(['inspect']));
  assert.equal(output.status, 'blocked');
  assert.match(output.pulls[0].inspectionError, /403/);
  assert.equal(output.coverage.errors, 1);
});

test('bounded observation exits pending without mutation when the deadline expires', async () => {
  let time = 0;
  const { state, run } = fixture({ required: [{ name: 'main', bucket: 'pending' }] });
  const cli = createCli({
    run,
    now: () => time,
    sleep: async ms => {
      time += ms;
    },
  });
  const output = await cli(parseArguments(['inspect', '--pr', '123', '--expect-head', head, '--wait', '2']));
  assert.equal(output.status, 'blocked');
  assert.equal(time, 2000);
  assert.equal(mutations(state.calls).length, 0);
});

test('head movement during inspection is an error rather than a passing stale snapshot', async () => {
  let reads = 0;
  const { run } = fixture({
    readPull: state => {
      if (++reads === 2) state.pull.head.sha = 'c'.repeat(40);
    },
  });
  await assert.rejects(
    createCli({ run })(parseArguments(['inspect', '--pr', '123', '--expect-head', head])),
    /changed head/,
  );
});

test('discovery reports every bot PR across pages, including exclusions and inspection failures', async () => {
  const sample = fixture().state.pull;
  const copy = number => ({ ...structuredClone(sample), number });
  const normal = copy(123);
  const draft = { ...copy(124), draft: true };
  const otherBase = copy(125);
  otherBase.base.ref = 'maintenance';
  const fork = copy(126);
  fork.head.repo.full_name = 'someone/fluentui';
  const error = copy(127);
  const laterPage = copy(128);
  const otherAuthor = copy(129);
  otherAuthor.user.login = 'human';
  const { run, state } = fixture({
    discoveredPages: [
      [normal, draft, otherAuthor],
      [otherBase, fork],
      [error, laterPage, normal],
    ],
    pulls: Object.fromEntries([normal, draft, otherBase, fork, error, laterPage].map(pull => [pull.number, pull])),
    failedPr: 127,
  });
  const output = await createCli({ run })(parseArguments(['inspect']));
  assert.deepEqual(
    output.pulls.map(pull => pull.pr),
    [123, 124, 125, 126, 127, 128],
  );
  assert.deepEqual(output.coverage, {
    scope: 'all-open-dependabot-prs',
    discovered: 6,
    reported: 6,
    inspected: 2,
    excluded: 3,
    errors: 1,
  });
  assert.deepEqual(output.pulls[1].exclusionReasons, ['draft']);
  assert.deepEqual(output.pulls[2].exclusionReasons, ['unsupported-base']);
  assert.deepEqual(output.pulls[3].exclusionReasons, ['fork-or-missing-head-repository']);
  assert.match(output.pulls[4].inspectionError, /403/);
  const report = formatInspection(output);
  assert.match(report, /6 discovered \/ 6 reported/);
  for (const number of [123, 124, 125, 126, 127, 128]) assert.ok(report.includes(`[#${number}]`));
  assert.match(report, /Excluded: draft/);
  assert.match(report, /Inspection failed:/);
  assert.equal(mutations(state.calls).length, 0);
});

test('explicit PR selection is labeled as a subset, never as full queue coverage', async () => {
  const { run } = fixture();
  const output = await createCli({ run })(parseArguments(['inspect', '--pr', '123']));
  assert.equal(output.coverage.scope, 'selected-prs');
  assert.equal(output.coverage.reported, 1);
});

test('Dependabot configuration keeps Nx manual-only and every non-major npm update in a group', () => {
  // Use the YAML parser already supplied by Nx, without adding a dependency.
  const yaml = createRequire(import.meta.resolve('nx/package.json'))('yaml');
  const config = yaml.parse(readFileSync(new URL('../../../../.github/dependabot.yml', import.meta.url), 'utf8'));
  const npm = config.updates.find(update => update['package-ecosystem'] === 'npm');
  const ignored = name =>
    npm.ignore.some(rule => {
      const pattern = new RegExp(
        `^${rule['dependency-name'].replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`,
      );
      return pattern.test(name) && !rule['update-types'] && !rule.versions;
    });
  for (const name of [
    'nx',
    '@nx/devkit',
    '@nx/workspace',
    '@nrwl/cli',
    '@nrwl/workspace',
    'nx-cloud',
    '@nx-cloud/client',
  ]) {
    assert.equal(ignored(name), true, `${name} must be ignored for all update types`);
  }
  const groupFor = (name, stream, level) =>
    Object.entries(npm.groups).find(
      ([, group]) =>
        (group['applies-to'] || 'version-updates') === stream &&
        group['update-types'].includes(level) &&
        group.patterns.some(pattern => new RegExp(`^${pattern.replace(/\*/g, '.*')}$`).test(name)),
    )?.[0];
  for (const name of [
    'vite',
    'undici',
    'fast-uri',
    '@vitest/mocker',
    'webpack-dev-middleware',
    'storybook',
    'arbitrary-future-tooling',
    '@new-scope/transitive',
  ]) {
    assert.equal(ignored(name), false);
    for (const level of ['minor', 'patch']) {
      assert.equal(groupFor(name, 'security-updates', level), 'security-dependencies');
      assert.equal(groupFor(name, 'version-updates', level), 'development-dependencies');
    }
    assert.equal(groupFor(name, 'security-updates', 'major'), undefined);
  }
  assert.equal(groupFor('some-other-package', 'security-updates', 'patch'), 'security-dependencies');
  assert.deepEqual(
    Object.keys(npm.groups).filter(name => npm.groups[name]['applies-to'] === 'security-updates'),
    ['security-dependencies'],
  );
  assert.deepEqual(npm.groups['security-dependencies'].patterns, ['*']);
  assert.equal(
    npm.allow.find(rule => rule['dependency-type'] === 'production')['update-types'][0],
    'version-update:semver-major',
  );
  assert.deepEqual(
    config.updates.find(update => update['package-ecosystem'] === 'github-actions').groups['github-actions-major'][
      'update-types'
    ],
    ['major'],
  );
});

test('dry-run finalize does not approve, merge, or write files', async () => {
  const { run, state } = fixture();
  const output = await createCli({ run })(
    parseArguments(['finalize', '--pr', '123', '--expect-head', head, '--dry-run']),
  );
  assert.equal(output.status, 'dry-run');
  assert.equal(mutations(state.calls).length, 0);
});

test('finalize submits a commit-bound review and head-guarded squash request', async () => {
  const { run, state } = fixture();
  const output = await createCli({ run })(finalize());
  assert.equal(output.status, 'auto-merge-enabled');
  assert.equal(output.approval, 'submitted');
  assert.ok(mutations(state.calls)[0].includes(`commit_id=${head}`));
  assert.deepEqual(mutations(state.calls)[1].slice(-4), ['--auto', '--squash', '--match-head-commit', head]);
});

test('finalize is idempotent for approval and squash auto-merge already on this head', async () => {
  const { run, state } = fixture({ reviews: [{ state: 'APPROVED', commit_id: head, user: { login: 'maintainer' } }] });
  state.pull.auto_merge = { merge_method: 'squash' };
  const output = await createCli({ run })(finalize());
  assert.equal(output.status, 'auto-merge-enabled');
  assert.equal(mutations(state.calls).length, 0);
});

test('finalize confirms an immediate merge instead of requiring an auto-merge request to remain', async () => {
  const { run } = fixture({ mergeImmediately: true });
  assert.equal((await createCli({ run })(finalize())).status, 'merged');
});

for (const [name, overrides] of [
  ['failed check', { required: [{ name: 'main', bucket: 'fail' }] }],
  ['missing required check', { required: [] }],
  ['changes requested', { decision: 'CHANGES_REQUESTED' }],
]) {
  test(`finalize blocks ${name} before review/merge mutations`, async () => {
    const { run, state } = fixture(overrides);
    assert.equal((await createCli({ run })(finalize())).status, 'blocked');
    assert.equal(mutations(state.calls).length, 0);
  });
}

test('finalize reports partial success when approval succeeds but auto-merge fails', async () => {
  const { run } = fixture({ mergeError: true });
  const output = await createCli({ run })(finalize());
  assert.equal(output.status, 'error');
  assert.equal(output.approval, 'submitted');
  assert.equal(output.autoMerge, 'not-requested');
  assert.match(output.error, /merge denied/);
});

test('approval failure is explicit and never followed by a merge request', async () => {
  const { run, state } = fixture({ reviewError: true });
  const output = await createCli({ run })(finalize());
  assert.equal(output.status, 'error');
  assert.equal(output.approval, 'not-submitted');
  assert.equal(mutations(state.calls).length, 1);
});

test('a changed head after approval prevents auto-merge and reports the submitted approval', async () => {
  const { run, state } = fixture({
    readPull: value => {
      if (value.reviews.length) value.pull.head.sha = 'c'.repeat(40);
    },
  });
  const output = await createCli({ run })(finalize());
  assert.equal(output.status, 'error');
  assert.equal(output.approval, 'submitted');
  assert.equal(mutations(state.calls).length, 1);
});

test('a dismissed or changes-requested review is not reused as approval', async () => {
  const { run, state } = fixture({
    reviews: [
      { state: 'APPROVED', commit_id: head, user: { login: 'maintainer' } },
      { state: 'DISMISSED', commit_id: head, user: { login: 'maintainer' } },
    ],
  });
  const output = await createCli({ run })(finalize());
  assert.equal(output.approval, 'submitted');
  assert.equal(mutations(state.calls).length, 2);
});

test('an existing non-squash auto-merge request is reported rather than overwritten', async () => {
  const { run, state } = fixture();
  state.pull.auto_merge = { merge_method: 'rebase' };
  const output = await createCli({ run })(finalize());
  assert.equal(output.status, 'blocked');
  assert.deepEqual(output.reasons, ['existing-auto-merge-method-is-not-squash']);
  assert.equal(
    state.calls.some(args => args[0] === 'pr' && args[1] === 'merge'),
    false,
  );
});

test('wrong account and insufficient repository permissions fail before mutations', async () => {
  const wrong = fixture();
  await assert.rejects(createCli({ run: wrong.run })(finalize(['--account', 'someone-else'])), /does not match/);
  const denied = fixture({ push: false });
  await assert.rejects(createCli({ run: denied.run })(finalize()), /push permission/);
  assert.equal(mutations(denied.state.calls).length, 0);
});

test('fork and non-Dependabot PRs cannot be finalized', async () => {
  for (const alter of [
    pull => {
      pull.user.login = 'other';
    },
    pull => {
      pull.head.repo.full_name = 'someone/fluentui';
    },
    pull => {
      pull.draft = true;
    },
    pull => {
      pull.state = 'closed';
    },
  ]) {
    const { run, state } = fixture();
    alter(state.pull);
    await assert.rejects(createCli({ run })(finalize()), /identity/);
    assert.equal(mutations(state.calls).length, 0);
  }
});

test('checkout and push operate on an isolated real Git worktree without touching upstream', async () => {
  const temporary = mkdtempSync(join(tmpdir(), 'dependabot-cli-test-'));
  const source = join(temporary, 'source');
  const bare = join(temporary, 'remote.git');
  const shell = (args, cwd = temporary) => {
    const value = spawnSync('git', args, { cwd, encoding: 'utf8', env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1' } });
    assert.equal(value.status, 0, value.stderr || value.stdout);
    return value.stdout.trim();
  };
  try {
    shell(['init', '--bare', bare]);
    shell(['clone', bare, source]);
    shell(['config', 'user.name', 'Fixture'], source);
    shell(['config', 'user.email', 'test@example.test'], source);
    shell(['config', 'commit.gpgsign', 'false'], source);
    shell(['switch', '-c', 'master'], source);
    writeFileSync(join(source, 'file.txt'), 'base\n');
    shell(['add', 'file.txt'], source);
    shell(['commit', '-m', 'base'], source);
    shell(['push', 'origin', 'master'], source);
    const original = shell(['rev-parse', 'HEAD'], source);
    shell(['push', 'origin', 'HEAD:refs/heads/dependabot/npm_and_yarn/update'], source);
    const { state, gh } = fixture();
    state.pull.head.sha = original;
    state.pull.base.sha = original;
    const run = (program, args, cwd) => {
      if (program === 'gh') return gh(args);
      if (args[0] === 'remote' && args[1] === 'get-url') return ok('git@github.com:microsoft/fluentui.git');
      const value = spawnSync('git', args, { cwd, encoding: 'utf8' });
      if (value.status === 0 && args[0] === 'push') {
        state.pull.head.sha = shell(['rev-parse', 'HEAD'], cwd);
      }
      return { status: value.status, stdout: value.stdout, stderr: value.stderr };
    };
    const cli = createCli({ cwd: source, run, temporaryDirectory: temporary });
    writeFileSync(join(source, 'user-untracked.txt'), 'preserve\n');
    const checkout = await cli(parseArguments(['checkout', '--pr', '123', '--expect-head', original]));
    assert.equal(readFileSync(join(checkout.worktree, 'file.txt'), 'utf8'), 'base\n');
    const pushOptions = parseArguments([
      'push',
      '--pr',
      '123',
      '--expect-head',
      original,
      '--worktree',
      checkout.worktree,
    ]);
    assert.equal((await cli(pushOptions)).status, 'no-changes');
    writeFileSync(join(checkout.worktree, 'file.txt'), 'repair\n');
    await assert.rejects(cli(pushOptions), /dirty/);
    shell(['add', 'file.txt'], checkout.worktree);
    shell(['commit', '-m', 'repair'], checkout.worktree);
    state.pull.head.sha = 'c'.repeat(40);
    await assert.rejects(cli(pushOptions), /changed head/);
    state.pull.head.sha = original;
    const stateFile = join(dirname(checkout.worktree), 'state.json');
    const provenance = readFileSync(stateFile, 'utf8');
    writeFileSync(stateFile, provenance.replace(original, 'c'.repeat(40)));
    await assert.rejects(cli(pushOptions), /provenance/);
    writeFileSync(stateFile, provenance);
    const tree = shell(['rev-parse', `${original}^{tree}`], source);
    const concurrent = shell(['commit-tree', tree, '-p', original, '-m', 'Concurrent remote update'], source);
    shell(['push', 'origin', `${concurrent}:refs/heads/dependabot/npm_and_yarn/update`], source);
    await assert.rejects(cli(pushOptions), /git push.*failed/);
    assert.equal(shell(['--git-dir', bare, 'rev-parse', 'refs/heads/dependabot/npm_and_yarn/update']), concurrent);
    shell(['--git-dir', bare, 'update-ref', 'refs/heads/dependabot/npm_and_yarn/update', original]);
    const pushed = await cli(pushOptions);
    assert.equal(pushed.status, 'pushed');
    assert.equal(shell(['--git-dir', bare, 'rev-parse', 'refs/heads/dependabot/npm_and_yarn/update']), pushed.head);
    assert.equal(shell(['rev-parse', 'HEAD'], source), original);
    assert.equal(readFileSync(join(source, 'user-untracked.txt'), 'utf8'), 'preserve\n');
    assert.ok(existsSync(join(dirname(checkout.worktree), 'state.json')));
    shell(['worktree', 'remove', checkout.worktree], source);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('entry point help runs without GitHub or repository mutation', () => {
  const cli = fileURLToPath(new URL('./dependabot.mjs', import.meta.url));
  const output = spawnSync(process.execPath, [cli, '--help'], { encoding: 'utf8' });
  assert.equal(output.status, 0, output.stderr);
  assert.match(JSON.parse(output.stdout).help, /--reviewed/);
});
