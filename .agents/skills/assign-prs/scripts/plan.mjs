import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import Ajv2020 from 'ajv/dist/2020.js';
import { dedupeQueue, planAssignments, validateProfiles } from './planner.mjs';

const directory = dirname(dirname(fileURLToPath(import.meta.url)));

function gh(args) {
  return execFileSync('gh', args, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, GH_PAGER: 'cat', NO_COLOR: '1' },
  }).trim();
}

function api(endpoint, fields = [], paginate = false) {
  const args = ['api', '--method', 'GET', endpoint, ...fields.flatMap(([key, value]) => ['-f', `${key}=${value}`])];
  if (paginate) {
    args.push('--paginate', '--slurp');
  }
  const result = JSON.parse(gh(args));
  return paginate ? result.flat() : result;
}

export function parseArguments(args) {
  const { values } = parseArgs({
    args,
    options: {
      repo: { type: 'string', multiple: true },
      team: { type: 'string', multiple: true },
      account: { type: 'string' },
      reviewers: { type: 'string' },
      'stale-days': { type: 'string' },
    },
    strict: true,
  });
  const repos = values.repo ?? [];
  const teams = values.team ?? [];
  for (const [flag, entries] of [
    ['repo', repos],
    ['team', teams],
  ]) {
    for (const value of entries) {
      if (!/^[\w.-]+\/[\w.-]+$/.test(value)) {
        throw new Error(`Invalid --${flag}: ${value}`);
      }
    }
  }
  if (values.account === '') {
    throw new Error('Invalid --account: empty login');
  }
  for (const flag of ['reviewers', 'stale-days']) {
    const value = values[flag];
    if (
      value !== undefined &&
      (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || (flag === 'reviewers' && Number(value) < 1))
    ) {
      throw new Error(`Invalid --${flag}: ${value}`);
    }
  }
  return {
    repos,
    teams,
    account: values.account,
    reviewers: values.reviewers === undefined ? undefined : Number(values.reviewers),
    staleDays: values['stale-days'] === undefined ? undefined : Number(values['stale-days']),
  };
}

export async function loadProfiles() {
  const schema = JSON.parse(await readFile(join(directory, 'reviewers.schema.json'), 'utf8'));
  const validator = new Ajv2020({ allErrors: true }).compile(schema);
  const files = [
    join(directory, 'reviewers.json'),
    ...(await readdir(join(directory, 'profiles')))
      .filter(file => file.endsWith('.json'))
      .map(file => join(directory, 'profiles', file)),
  ];
  const profiles = [];
  for (const file of files) {
    const profile = JSON.parse(await readFile(file, 'utf8'));
    if (!validator(profile)) {
      throw new Error(`Invalid profile ${file}: ${new Ajv2020().errorsText(validator.errors)}`);
    }
    profiles.push(profile);
  }
  validateProfiles(profiles);
  return profiles;
}

function searchQueue(repo, queue) {
  const query = `is:open is:pr repo:${repo} team-review-requested:${queue} draft:false`;
  const results = [];
  let total = 0;
  for (let page = 1; ; page++) {
    const response = api('search/issues', [
      ['q', query],
      ['per_page', '100'],
      ['page', String(page)],
    ]);
    if (response.incomplete_results || response.total_count > 1000) {
      throw new Error(`Incomplete GitHub search for ${repo} ${queue}`);
    }
    total = response.total_count;
    results.push(...response.items.map(item => ({ repo, number: item.number, queue })));
    if (results.length >= total || response.items.length === 0) {
      break;
    }
  }
  return { total, results };
}

function readIssue({ repo, number, queues }) {
  const pr = api(`repos/${repo}/pulls/${number}`);
  if (
    pr.state !== 'open' ||
    pr.draft ||
    !queues.some(queue => pr.requested_teams.some(team => queue === `${repo.split('/')[0]}/${team.slug}`))
  ) {
    throw new Error(`Queue changed while reading ${repo}#${number}; rerun the plan`);
  }
  const files = api(`repos/${repo}/pulls/${number}/files`, [], true).map(file => file.filename);
  const reviews = api(`repos/${repo}/pulls/${number}/reviews`, [], true);
  const reviewedBy = [
    ...new Set(
      reviews
        .filter(review => ['APPROVED', 'CHANGES_REQUESTED', 'COMMENTED'].includes(review.state))
        .map(review => review.user.login),
    ),
  ];
  return {
    repo,
    number,
    queues,
    title: pr.title,
    author: pr.user.login,
    updatedAt: pr.updated_at,
    files,
    requestedReviewers: pr.requested_reviewers.map(user => user.login),
    reviewedBy,
  };
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  const loaded = await loadProfiles();
  const profiles = loaded.filter(profile => !args.repos.length || args.repos.includes(profile.repo));
  if (!profiles.length || args.repos.some(repo => !profiles.some(profile => profile.repo === repo))) {
    throw new Error(`Unknown repository: ${args.repos.join(', ')}`);
  }
  if (args.teams.length && profiles.length !== 1) {
    throw new Error('--team requires exactly one selected --repo');
  }
  if (args.teams.length) {
    if (args.teams.some(team => !profiles[0].queues.includes(team))) {
      throw new Error(`--team must be a configured queue for ${profiles[0].repo}`);
    }
    profiles[0] = { ...profiles[0], queues: [...new Set(args.teams)] };
  }
  gh(['auth', 'status', '--active']);
  const account = api('user').login;
  if (args.account && args.account.toLowerCase() !== account.toLowerCase()) {
    throw new Error(`Active gh account ${account} does not match --account ${args.account}`);
  }
  const rosters = {};
  const queues = [];
  const repositories = [];
  const entries = [];
  for (const profile of profiles) {
    const permissions = api(`repos/${profile.repo}`).permissions;
    if (!permissions?.push && !permissions?.triage) {
      throw new Error(`${account} needs push or triage permission on ${profile.repo}`);
    }
    const team = `${profile.team.org}/${profile.team.slug}`;
    if (!rosters[team]) {
      rosters[team] = api(`orgs/${profile.team.org}/teams/${profile.team.slug}/members`, [], true).map(
        member => member.login,
      );
    }
    if (
      !rosters[team].length ||
      !profile.reviewers.some(
        reviewer =>
          reviewer.eligible && rosters[team].some(login => login.toLowerCase() === reviewer.login.toLowerCase()),
      )
    ) {
      throw new Error(`No live eligible reviewers for ${profile.repo}`);
    }
    const total = api('search/issues', [
      ['q', `is:open is:pr repo:${profile.repo} draft:false`],
      ['per_page', '1'],
    ]);
    if (total.incomplete_results) {
      throw new Error(`Incomplete total PR count for ${profile.repo}`);
    }
    repositories.push({
      repo: profile.repo,
      openNonDraft: total.total_count,
      eligible: profile.reviewers.filter(
        reviewer =>
          reviewer.eligible && rosters[team].some(login => login.toLowerCase() === reviewer.login.toLowerCase()),
      ).length,
    });
    for (const queue of profile.queues) {
      const result = searchQueue(profile.repo, queue);
      queues.push({ repo: profile.repo, queue, count: result.total });
      entries.push(...result.results);
    }
  }
  const issues = dedupeQueue(entries)
    .map(readIssue)
    .sort((left, right) => left.repo.localeCompare(right.repo) || left.number - right.number);
  const assignments = planAssignments(profiles, issues, rosters, {
    now: new Date(),
    staleDays: args.staleDays,
    reviewers: args.reviewers,
  });
  const drift = profiles.map(profile => {
    const live = rosters[`${profile.team.org}/${profile.team.slug}`];
    const configured = profile.reviewers.map(reviewer => reviewer.login);
    return {
      repo: profile.repo,
      unconfigured: live.filter(login => !configured.some(entry => entry.toLowerCase() === login.toLowerCase())),
      stale: configured.filter(login => !live.some(entry => entry.toLowerCase() === login.toLowerCase())),
    };
  });
  const snapshot = { account, profiles, rosters, repositories, queues, drift, issues, assignments };
  const fingerprint = createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
  const load = {};
  for (const issue of issues) {
    for (const login of new Set(issue.requestedReviewers.map(login => login.toLowerCase()))) {
      load[login] = (load[login] ?? 0) + 1;
    }
  }
  for (const assignment of assignments) {
    for (const reviewer of assignment.selected) {
      const login = reviewer.login.toLowerCase();
      load[login] = (load[login] ?? 0) + 1;
    }
  }
  const excluded = profiles.map(profile => ({
    repo: profile.repo,
    dependabot: assignments.filter(item => item.repo === profile.repo && item.bucket === 'dependabot').length,
    stale: assignments.filter(item => item.repo === profile.repo && item.bucket === 'stale').length,
  }));
  const actionable = assignments
    .filter(item => item.bucket === 'assignable')
    .map(item => {
      const issue = issues.find(entry => entry.repo === item.repo && entry.number === item.number);
      return { ...item, author: issue.author, title: issue.title, requestedReviewers: issue.requestedReviewers };
    });
  console.log(
    JSON.stringify(
      {
        account,
        snapshotAt: new Date().toISOString(),
        fingerprint,
        repositories,
        queues,
        drift,
        load,
        excluded,
        assignments: actionable,
      },
      null,
      2,
    ),
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
