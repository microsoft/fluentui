const { execFileSync } = require('child_process');
const fs = require('fs');

const repo = process.env.GITHUB_REPOSITORY;
const baseBranch = process.env.BASE_BRANCH || 'master';
const dryRun = process.env.DRY_RUN === 'true';
const maxPrs = Number.parseInt(process.env.MAX_PRS || '11', 10);
const githubToken = process.env.GITHUB_TOKEN;

if (!repo) {
  throw new Error('GITHUB_REPOSITORY is required');
}

if (!githubToken) {
  throw new Error('GITHUB_TOKEN is required');
}

const stepSummary = process.env.GITHUB_STEP_SUMMARY;

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  });
}

function runInherit(command, args, options = {}) {
  execFileSync(command, args, {
    stdio: 'inherit',
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  });
}

function writeSummary(text) {
  if (stepSummary) {
    fs.appendFileSync(stepSummary, `${text}\n`);
  }
}

function toListLine(pr) {
  return `- #${pr.number} ${pr.title} (${pr.url})`;
}

function createIssue(title, body) {
  runInherit('gh', ['issue', 'create', '--repo', repo, '--title', title, '--body', body]);
}

function createPr(title, body, bundleBranch) {
  runInherit('gh', [
    'pr',
    'create',
    '--repo',
    repo,
    '--base',
    baseBranch,
    '--head',
    bundleBranch,
    '--draft',
    '--title',
    title,
    '--body',
    body,
  ]);
}

const openPrs = JSON.parse(
  run('gh', [
    'pr',
    'list',
    '--repo',
    repo,
    '--state',
    'open',
    '--app',
    'dependabot',
    '--json',
    'number,title,url,updatedAt,baseRefName',
  ]),
).filter(pr => pr.baseRefName === baseBranch);

const selectedPrs = openPrs
  .sort((left, right) => new Date(left.updatedAt) - new Date(right.updatedAt))
  .slice(0, maxPrs);

writeSummary('## Dependabot PR Bundler');
writeSummary('');
writeSummary(`- Base branch: \`${baseBranch}\``);
writeSummary(`- Max PRs: \`${maxPrs}\``);
writeSummary(`- Dry run: \`${dryRun}\``);
writeSummary(`- Selected PRs: \`${selectedPrs.length}\``);
writeSummary('');

if (selectedPrs.length === 0) {
  writeSummary('No open Dependabot PRs were found for the selected base branch.');
  process.exit(0);
}

for (const pr of selectedPrs) {
  writeSummary(toListLine(pr));
}

if (dryRun) {
  writeSummary('');
  writeSummary('Dry run only. No branch, validation, or PR was created.');
  process.exit(0);
}

const bundleBranch = `dependabot-pr-bundler/${process.env.GITHUB_RUN_ID}`;
const mergedPrs = [];
const skippedPrs = [];

runInherit('git', ['fetch', 'origin', baseBranch]);
runInherit('git', ['checkout', '-B', bundleBranch, `origin/${baseBranch}`]);

for (const pr of selectedPrs) {
  const branchName = `dependabot-pr-${pr.number}`;

  try {
    runInherit('git', ['fetch', 'origin', `pull/${pr.number}/head:${branchName}`]);
  } catch (error) {
    skippedPrs.push({ pr, reason: 'fetch failed' });
    continue;
  }

  try {
    runInherit('git', ['merge', '--no-ff', '--no-edit', branchName]);
    mergedPrs.push(pr);
  } catch (error) {
    try {
      runInherit('git', ['merge', '--abort']);
    } catch (abortError) {
      // Ignore abort failures and keep moving.
    }

    skippedPrs.push({ pr, reason: 'merge conflict' });
  }

  try {
    runInherit('git', ['branch', '-D', branchName]);
  } catch (cleanupError) {
    // Ignore cleanup failures; the temporary branch is only local.
  }
}

writeSummary('');
writeSummary(`- Merged PRs: \`${mergedPrs.length}\``);
writeSummary(`- Skipped PRs: \`${skippedPrs.length}\``);

if (mergedPrs.length === 0) {
  const issueBody = [
    `No Dependabot PRs could be bundled for base branch \`${baseBranch}\`.`,
    '',
    'Selected PRs:',
    ...selectedPrs.map(toListLine),
    '',
    'Every candidate either failed to fetch or conflicted during merge.',
  ].join('\n');

  createIssue(`dependabot bundle blocked for ${baseBranch}`, issueBody);
  process.exit(1);
}

runInherit('yarn', ['install', '--frozen-lockfile']);

try {
  runInherit('yarn', [
    'nx',
    'affected',
    '-t',
    'build',
    '-t',
    'test',
    '-t',
    'lint',
    '-t',
    'type-check',
    '--nxBail',
    `--base=origin/${baseBranch}`,
    '--head=HEAD',
  ]);
} catch (error) {
  const issueBody = [
    `Dependabot bundle validation failed for base branch \`${baseBranch}\`.`,
    '',
    'Merged PRs:',
    ...mergedPrs.map(toListLine),
    '',
    'Skipped PRs:',
    ...(skippedPrs.length > 0
      ? skippedPrs.map(({ pr, reason }) => `- #${pr.number} ${pr.title} (${reason})`)
      : ['- none']),
    '',
    'The bundle branch was created locally but the draft PR was not opened because validation failed.',
  ].join('\n');

  createIssue(`dependabot bundle validation failed for ${baseBranch}`, issueBody);
  throw error;
}

const bodyLines = [
  `This draft bundles the following Dependabot PRs against \`${baseBranch}\`:`,
  '',
  ...mergedPrs.map(toListLine),
  '',
  'Validation:',
  `- \`yarn install --frozen-lockfile\``,
  `- \`yarn nx affected -t build -t test -t lint -t type-check --nxBail --base=origin/${baseBranch} --head=HEAD\``,
];

if (skippedPrs.length > 0) {
  bodyLines.push('', 'Skipped PRs:', ...skippedPrs.map(({ pr, reason }) => `- #${pr.number} ${pr.title} (${reason})`));
}

createPr(`chore(deps): bundle ${mergedPrs.length} Dependabot PRs`, bodyLines.join('\n'), bundleBranch);

writeSummary('');
writeSummary(`Created draft PR from branch \`${bundleBranch}\`.`);
