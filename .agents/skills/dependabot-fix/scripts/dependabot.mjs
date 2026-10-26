import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const repository = 'microsoft/fluentui';
const shaPattern = /^[a-f0-9]{40}$/;
const help = `Local Dependabot coordination (no automatic repairs).
  inspect [--pr N ...] [--account LOGIN] [--expect-head SHA --wait SECONDS] [--format json|markdown]
  checkout --pr N --expect-head SHA [--account LOGIN]
  push --pr N --expect-head SHA --worktree PATH [--account LOGIN]
  finalize --pr N --expect-head SHA --reviewed [--account LOGIN]
All commands accept --dry-run. finalize can merge immediately when protections pass.
Output defaults to JSON; inspect --format markdown shows a candidate report.
Blocked results exit 2; command errors exit 1.`;

export function parseArguments(args) {
  const [command, ...options] = args;
  if (command === '--help' || command === 'help') {
    return { command: 'help' };
  }
  if (!['inspect', 'checkout', 'push', 'finalize'].includes(command)) {
    throw new Error('Expected inspect, checkout, push, or finalize; use --help');
  }
  const { values } = parseArgs({
    args: options,
    strict: true,
    options: {
      pr: { type: 'string', multiple: true },
      account: { type: 'string' },
      'expect-head': { type: 'string' },
      worktree: { type: 'string' },
      wait: { type: 'string' },
      reviewed: { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
      format: { type: 'string' },
    },
  });
  const prs = [...new Set(values.pr || [])].map(value => {
    if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
      throw new Error(`Invalid PR number: ${value}`);
    }
    return Number(value);
  });
  if (values.account !== undefined && !/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(values.account)) {
    throw new Error('Invalid account login');
  }
  if (values['expect-head'] !== undefined && !shaPattern.test(values['expect-head'])) {
    throw new Error('Expected a full lowercase commit SHA');
  }
  if (values.wait !== undefined && (!/^\d+$/.test(values.wait) || Number(values.wait) > 3600)) {
    throw new Error('--wait must be seconds between 0 and 3600');
  }
  if (command !== 'inspect' && (prs.length !== 1 || !values['expect-head'])) {
    throw new Error(`${command} requires one --pr and --expect-head`);
  }
  if (values['expect-head'] && prs.length !== 1) {
    throw new Error('--expect-head requires one --pr');
  }
  if (values.worktree !== undefined && (command !== 'push' || !values.worktree)) {
    throw new Error('--worktree is only valid for push');
  }
  if (command === 'push' && !values.worktree) {
    throw new Error('push requires --worktree');
  }
  if (values.wait !== undefined && (command !== 'inspect' || !values['expect-head'])) {
    throw new Error('--wait requires inspect with one --pr and --expect-head');
  }
  if (values.reviewed && command !== 'finalize') {
    throw new Error('--reviewed is only valid for finalize');
  }
  if (values.format !== undefined && (command !== 'inspect' || !['json', 'markdown'].includes(values.format))) {
    throw new Error('--format json|markdown is only valid for inspect');
  }
  if (command === 'finalize' && !values.reviewed && !values['dry-run']) {
    throw new Error('finalize requires --reviewed after reviewing the final diff and validation');
  }
  return {
    command,
    prs,
    account: values.account,
    expectedHead: values['expect-head'],
    worktree: values.worktree,
    wait: Number(values.wait || 0),
    reviewed: values.reviewed,
    dryRun: values['dry-run'],
    format: values.format || 'json',
  };
}

export function formatInspection(result) {
  const cell = value =>
    String(value ?? 'unknown')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/[\r\n]+/g, ' ')
      .replace(/[\\|`*_[\]]/g, '\\$&');
  const lines = [
    '## Dependabot candidates - awaiting user approval',
    '',
    `Account: **${cell(result.account)}** / Repository: **${repository}** / PRs: **${result.pulls.length}**`,
    '',
  ];
  if (!result.pulls.length) {
    return [...lines, 'No matching open Dependabot PRs. Nothing will be changed.'].join('\n');
  }
  lines.push(
    '| PR | Title | Head | CI | Review / merge | Proposed evaluation |',
    '| --- | --- | --- | --- | --- | --- |',
  );
  for (const pull of result.pulls) {
    const action =
      pull.mergeable !== true || pull.reviewDecision === 'CHANGES_REQUESTED'
        ? 'Report blocker; no changes'
        : pull.checkState === 'failing'
        ? 'Inspect failure and evaluate a scoped repair'
        : pull.checkState === 'passing'
        ? 'Review diff; no repair indicated'
        : 'Observe/report checks; no changes';
    lines.push(
      `| [#${pull.pr}](https://github.com/${repository}/pull/${pull.pr}) | ${cell(pull.title)} | ${cell(
        pull.head.slice(0, 7),
      )} | ${cell(pull.checkState)} | ${cell(pull.reviewDecision)} / ${cell(pull.mergeState)} | ${action} |`,
    );
  }
  return [
    ...lines,
    '',
    'Update risk is not classified yet: review every update member; majors require explicit selection.',
    'No PRs have been changed. Show this report to the user and get explicit approval of PRs and actions before checkout, repairs, pushes, GitHub reviews, or auto-merge.',
  ].join('\n');
}

function execute(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, GH_PAGER: 'cat', GIT_PAGER: 'cat', GH_PROMPT_DISABLED: '1' },
  });
  if (result.error) {
    throw result.error;
  }
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

export function classifyChecks(required, all) {
  if (!required.length) {
    return 'missing';
  }
  if ([...required, ...all].some(check => ['fail', 'cancel'].includes(check.bucket))) {
    return 'failing';
  }
  if (required.some(check => check.bucket !== 'pass')) {
    return 'pending';
  }
  // Optional jobs may be intentionally skipped, but unfinished jobs still need observation.
  return all.some(check => !['pass', 'skipping'].includes(check.bucket)) ? 'pending' : 'passing';
}

export function remoteMatches(url) {
  return /^(?:git@github\.com:|ssh:\/\/git@github\.com\/|https:\/\/github\.com\/)microsoft\/fluentui(?:\.git)?\/?$/.test(
    url,
  );
}

export function createCli({
  cwd = process.cwd(),
  run = execute,
  temporaryDirectory = tmpdir(),
  sleep = ms => new Promise(done => setTimeout(done, ms)),
  now = Date.now,
} = {}) {
  function command(program, args, directory = cwd) {
    const result = run(program, args, directory);
    if (result.status !== 0) {
      throw new Error(`${program} ${args.join(' ')} failed (${result.status}): ${result.stderr || result.stdout}`);
    }
    return result.stdout.trim();
  }
  const git = (args, directory = cwd) => command('git', args, directory);
  const gh = args => command('gh', args);
  const api = (endpoint, args = []) => JSON.parse(gh(['api', endpoint, ...args]));
  const pages = endpoint => api(endpoint, ['--paginate', '--slurp']).flat();
  const pr = number => api(`repos/${repository}/pulls/${number}`);
  function identity(pull, expectedHead) {
    if (
      pull.state !== 'open' ||
      pull.draft ||
      pull.user?.login !== 'dependabot[bot]' ||
      pull.head?.repo?.full_name !== repository ||
      pull.base?.repo?.full_name !== repository ||
      pull.base.ref !== 'master' ||
      !shaPattern.test(pull.head.sha) ||
      !pull.head.ref.startsWith('dependabot/') ||
      (expectedHead && pull.head.sha !== expectedHead)
    ) {
      throw new Error(`PR #${pull.number}: untrusted identity, closed/draft PR, or changed head`);
    }
    git(['check-ref-format', `refs/heads/${pull.head.ref}`]);
  }
  function account(expected, write = false) {
    const user = api('user').login;
    if (!user || (expected && user !== expected)) {
      throw new Error(`Active GitHub account ${user} does not match ${expected}`);
    }
    if (write && !api(`repos/${repository}`).permissions?.push) {
      throw new Error(`${user} does not have push permission to ${repository}`);
    }
    return user;
  }
  function remote(directory = cwd) {
    const names = git(['remote'], directory).split('\n').filter(Boolean);
    const matches = names.filter(
      name =>
        remoteMatches(git(['remote', 'get-url', '--all', name], directory)) &&
        remoteMatches(git(['remote', 'get-url', '--push', '--all', name], directory)),
    );
    if (!matches.length) {
      throw new Error(`No fetch/push remote points to ${repository}`);
    }
    return matches[0];
  }
  function checks(number, required) {
    const args = ['pr', 'checks', String(number), '--repo', repository, '--json', 'name,bucket,link,state'];
    if (required) {
      args.push('--required');
    }
    const result = run('gh', args, cwd);
    if (result.status !== 0 && ![1, 8].includes(result.status)) {
      throw new Error(`Cannot read checks: ${result.stderr || result.stdout}`);
    }
    if (!result.stdout.trim() && /no (?:required )?checks reported/i.test(result.stderr)) {
      return [];
    }
    let data;
    try {
      data = JSON.parse(result.stdout);
    } catch (cause) {
      throw new Error(`Cannot read checks: ${result.stderr || result.stdout}`, { cause });
    }
    if (
      !Array.isArray(data) ||
      data.some(check => !['pass', 'fail', 'pending', 'skipping', 'cancel'].includes(check.bucket))
    ) {
      throw new Error('Invalid check response');
    }
    if (result.status === 1 && !data.some(check => ['fail', 'cancel'].includes(check.bucket))) {
      throw new Error(`Check lookup failed: ${result.stderr || result.stdout}`);
    }
    return data;
  }
  function snapshot(number, expectedHead) {
    const pull = pr(number);
    identity(pull, expectedHead);
    const all = checks(number, false);
    const required = checks(number, true);
    const rules = api(`repos/${repository}/rules/branches/master`);
    const expectedChecks = rules.flatMap(rule =>
      rule.type === 'required_status_checks' ? rule.parameters.required_status_checks : [],
    );
    const missing = expectedChecks
      .filter(check => !required.some(item => item.name === check.context))
      .map(check => check.context);
    const metadata = JSON.parse(
      gh(['pr', 'view', String(number), '--repo', repository, '--json', 'reviewDecision,autoMergeRequest']),
    );
    const current = pr(number);
    identity(current, pull.head.sha);
    if (current.base.sha !== pull.base.sha) {
      throw new Error(`PR #${number}: base changed during inspection`);
    }
    return {
      pr: number,
      url: pull.html_url,
      title: pull.title,
      head: pull.head.sha,
      base: pull.base.sha,
      branch: pull.head.ref,
      checkState: missing.length ? 'missing' : classifyChecks(required, all),
      missingChecks: missing,
      checks: all,
      reviewDecision: metadata.reviewDecision,
      autoMerge: metadata.autoMergeRequest,
      mergeable: current.mergeable,
      mergeState: current.mergeable_state,
      // Semver classification requires reviewing every update, especially lockfile-only groups.
      eligibility: 'review-update-members',
    };
  }
  function blocked(snapshot) {
    const reasons = [];
    if (snapshot.checkState !== 'passing') {
      reasons.push(`checks:${snapshot.checkState}`);
    }
    if (snapshot.mergeable !== true) {
      reasons.push('mergeability-conflicting-or-unknown');
    }
    if (snapshot.reviewDecision === 'CHANGES_REQUESTED') {
      reasons.push('changes-requested');
    }
    return reasons;
  }
  function worktreeState(directory, number, expectedHead) {
    const absolute = realpathSync(directory);
    const container = dirname(absolute);
    if (basename(absolute) !== 'worktree' || !basename(container).startsWith(`fluentui-dependabot-${number}-`)) {
      throw new Error('Not a CLI-created worktree');
    }
    const state = JSON.parse(readFileSync(join(container, 'state.json'), 'utf8'));
    const common = directory => realpathSync(resolve(directory, git(['rev-parse', '--git-common-dir'], directory)));
    if (
      state.pr !== number ||
      state.head !== expectedHead ||
      state.repository !== repository ||
      state.common !== common(cwd) ||
      common(absolute) !== state.common
    ) {
      throw new Error('Worktree provenance does not match the repository/PR/head');
    }
    return { ...state, worktree: absolute };
  }
  return async function main(options) {
    if (options.command === 'help') {
      return { status: 'ok', help };
    }
    const user = account(options.account, options.command !== 'inspect' && !options.dryRun);
    if (options.command === 'inspect') {
      const numbers = options.prs.length
        ? options.prs
        : pages(`repos/${repository}/pulls?state=open&base=master&per_page=100`)
            .filter(
              pull =>
                pull.user?.login === 'dependabot[bot]' && !pull.draft && pull.head?.repo?.full_name === repository,
            )
            .map(pull => pull.number);
      const deadline = now() + options.wait * 1000;
      let pulls;
      do {
        pulls = numbers.map(number => snapshot(number, options.expectedHead));
        if (
          !options.wait ||
          pulls.every(pull => pull.checkState !== 'pending' && pull.checkState !== 'missing') ||
          now() >= deadline
        ) {
          break;
        }
        await sleep(Math.min(10000, Math.max(0, deadline - now())));
      } while (true);
      return { status: pulls.some(pull => blocked(pull).length) ? 'blocked' : 'ok', account: user, pulls };
    }
    const number = options.prs[0];
    let pull = pr(number);
    identity(pull, options.expectedHead);
    if (options.dryRun) {
      return { status: 'dry-run', account: user, command: options.command, pr: number, head: pull.head.sha };
    }
    if (options.command === 'checkout') {
      const root = git(['rev-parse', '--show-toplevel']);
      const target = remote();
      git(['fetch', target, 'master']);
      const base = git(['rev-parse', 'FETCH_HEAD']);
      git(['fetch', target, `refs/heads/${pull.head.ref}`]);
      if (git(['rev-parse', 'FETCH_HEAD']) !== options.expectedHead) {
        throw new Error('Fetched head changed; inspect again');
      }
      const common = realpathSync(resolve(root, git(['rev-parse', '--git-common-dir'], root)));
      const container = mkdtempSync(join(temporaryDirectory, `fluentui-dependabot-${number}-`));
      const worktree = join(container, 'worktree');
      git(['worktree', 'add', '--detach', worktree, options.expectedHead]);
      const state = {
        repository,
        pr: number,
        head: options.expectedHead,
        base,
        branch: pull.head.ref,
        common,
        worktree,
      };
      writeFileSync(join(container, 'state.json'), JSON.stringify(state));
      return { status: 'ok', account: user, ...state };
    }
    if (options.command === 'push') {
      const state = worktreeState(options.worktree, number, options.expectedHead);
      if (state.branch !== pull.head.ref || git(['status', '--porcelain'], state.worktree)) {
        throw new Error('Worktree is dirty or its branch identity changed; commit reviewed repairs first');
      }
      const head = git(['rev-parse', 'HEAD'], state.worktree);
      git(['merge-base', '--is-ancestor', options.expectedHead, head], state.worktree);
      if (head === options.expectedHead) {
        return { status: 'no-changes', account: user, pr: number, head };
      }
      const target = remote(state.worktree);
      pull = pr(number);
      identity(pull, options.expectedHead);
      if (pull.head.ref !== state.branch) {
        throw new Error('PR branch changed before push');
      }
      account(user, true);
      git(['push', target, `HEAD:refs/heads/${state.branch}`], state.worktree);
      try {
        identity(pr(number), head);
      } catch (error) {
        return {
          status: 'error',
          account: user,
          pr: number,
          head,
          worktree: state.worktree,
          push: 'submitted',
          error: error.message,
        };
      }
      return { status: 'pushed', account: user, pr: number, head, worktree: state.worktree };
    }
    const current = snapshot(number, options.expectedHead);
    const reasons = blocked(current);
    if (reasons.length) {
      return { status: 'blocked', account: user, ...current, reasons };
    }
    const reviews = pages(`repos/${repository}/pulls/${number}/reviews?per_page=100`).filter(
      review => review.user?.login === user && ['APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'].includes(review.state),
    );
    const latest = reviews.at(-1);
    const result = {
      status: 'ok',
      account: user,
      pr: number,
      head: current.head,
      approval: latest?.state === 'APPROVED' && latest.commit_id === current.head ? 'existing' : 'not-submitted',
      autoMerge: current.autoMerge ? 'existing' : 'not-requested',
    };
    try {
      if (latest?.state !== 'APPROVED' || latest.commit_id !== current.head) {
        account(user, true);
        identity(pr(number), current.head);
        const review = api(`repos/${repository}/pulls/${number}/reviews`, [
          '--method',
          'POST',
          '-f',
          'event=APPROVE',
          '-f',
          `commit_id=${current.head}`,
          '-f',
          `body=Reviewed the dependency update and verified CI for ${current.head}.`,
        ]);
        if (review.state !== 'APPROVED' || review.commit_id !== current.head) {
          throw new Error('Approval response does not match the validated head');
        }
        result.approval = 'submitted';
      }
      const fresh = snapshot(number, current.head);
      if (blocked(fresh).length) {
        return { ...result, status: 'blocked', reasons: blocked(fresh) };
      }
      if (fresh.autoMerge?.mergeMethod !== 'SQUASH') {
        if (fresh.autoMerge) {
          return { ...result, status: 'blocked', reasons: ['existing-auto-merge-method-is-not-squash'] };
        }
        account(user, true);
        identity(pr(number), current.head);
        gh([
          'pr',
          'merge',
          String(number),
          '--repo',
          repository,
          '--auto',
          '--squash',
          '--match-head-commit',
          current.head,
        ]);
        result.autoMerge = 'requested';
      }
      const final = pr(number);
      if (final.head.sha !== current.head || (!final.merged && final.auto_merge?.merge_method !== 'squash')) {
        throw new Error('Final PR head/auto-merge state was not confirmed');
      }
      return { ...result, status: final.merged ? 'merged' : 'auto-merge-enabled' };
    } catch (error) {
      return { ...result, status: 'error', error: error.message };
    }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const result = await createCli()(options);
    console.log(options.format === 'markdown' ? formatInspection(result) : JSON.stringify(result, null, 2));
    process.exitCode = result.status === 'error' ? 1 : result.status === 'blocked' ? 2 : 0;
  } catch (error) {
    console.error(JSON.stringify({ status: 'error', error: error.message }));
    process.exitCode = 1;
  }
}
