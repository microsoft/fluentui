// @ts-check

const fs = require('fs');

const { classify } = require('./classify');

const API_ROOT = 'https://api.github.com';
const DEFAULT_REPO = 'microsoft/fluentui';
const PAGE_SIZE = 100;

const USAGE = `Usage:
  classify-pr <number> [--repo owner/name]   Fetch the pull request from GitHub (uses GITHUB_TOKEN or GH_TOKEN if set)
  classify-pr --files <path>                 Classify a saved file list (a JSON array of files from the GitHub API)

Prints the tier and the reasons as JSON.`;

/**
 * @typedef {{ pullNumber?: number, repo: string, filesPath?: string }} CliOptions
 */

/**
 * @param {string[]} argv Arguments after the script name.
 * @returns {CliOptions}
 */
function parseArgs(argv) {
  /** @type {CliOptions} */
  const options = { repo: DEFAULT_REPO };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--repo' || arg === '--files') {
      const value = argv[++i];
      if (!value) {
        throw new Error(`${arg} needs a value`);
      }
      if (arg === '--repo') {
        options.repo = value;
      } else {
        options.filesPath = value;
      }
    } else if (/^\d+$/.test(arg)) {
      options.pullNumber = Number(arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.pullNumber === undefined && options.filesPath === undefined) {
    throw new Error('Give a pull request number or --files <path>');
  }
  if (options.pullNumber !== undefined && options.filesPath !== undefined) {
    throw new Error('Give either a pull request number or --files, not both');
  }
  if (!/^[\w.-]+\/[\w.-]+$/.test(options.repo)) {
    throw new Error(`Invalid repository: ${options.repo}`);
  }
  return options;
}

/**
 * Fetches the file list of a pull request through the paginated GitHub API. Never reads the title or body.
 *
 * @param {{ repo: string, pullNumber: number, token?: string, fetchImpl?: typeof fetch }} params
 * @returns {Promise<import('./types').ClassifyInput>}
 */
async function fetchPullRequest({ repo, pullNumber, token, fetchImpl = fetch }) {
  /**
   * @param {string} url
   * @returns {Promise<any>}
   */
  async function get(url) {
    const response = await fetchImpl(url, {
      headers: {
        accept: 'application/vnd.github+json',
        'x-github-api-version': '2022-11-28',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed (${response.status}): ${url}`);
    }
    return response.json();
  }

  const pullRequest = await get(`${API_ROOT}/repos/${repo}/pulls/${pullNumber}`);
  const maxPages = Math.ceil(require('./tier-rules').maxListedFiles / PAGE_SIZE);

  /** @type {import('./types').PullRequestFile[]} */
  const files = [];
  for (let page = 1; page <= maxPages; page++) {
    const batch = await get(`${API_ROOT}/repos/${repo}/pulls/${pullNumber}/files?per_page=${PAGE_SIZE}&page=${page}`);
    files.push(...batch);
    if (batch.length < PAGE_SIZE) {
      break;
    }
  }

  const { changed_files: changedFiles } = pullRequest;

  return { files, changedFiles };
}

/**
 * @param {string} path A JSON file holding an array of files, or an object with `files` and `changedFiles`.
 * @returns {import('./types').ClassifyInput}
 */
function readSavedFiles(path) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  return Array.isArray(data) ? { files: data, changedFiles: data.length } : data;
}

/**
 * @param {string[]} argv
 * @param {{ env?: Record<string, string | undefined>, fetchImpl?: typeof fetch }} [context]
 * @returns {Promise<string>} The classification as formatted JSON.
 */
async function run(argv, context = {}) {
  const { env = process.env, fetchImpl } = context;
  const options = parseArgs(argv);
  const input =
    options.filesPath !== undefined
      ? readSavedFiles(options.filesPath)
      : await fetchPullRequest({
          repo: options.repo,
          pullNumber: /** @type {number} */ (options.pullNumber),
          token: env.GITHUB_TOKEN || env.GH_TOKEN,
          fetchImpl,
        });

  return JSON.stringify(classify(input), null, 2);
}

/** Entry point when run from the command line. */
async function main() {
  try {
    console.log(await run(process.argv.slice(2)));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    console.error(USAGE);
    process.exitCode = 1;
  }
}

module.exports = { parseArgs, fetchPullRequest, run, main, USAGE };

if (require.main === module) {
  main();
}
