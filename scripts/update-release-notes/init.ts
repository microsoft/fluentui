import { Octokit } from '@octokit/rest';
import * as yargs from 'yargs';
import { fluentRepoDetails } from '@fluentui/scripts-github';

const tokenMsg =
  '\nA GitHub personal access token is required even for dry runs due to the potential high rate of requests.\n' +
  'Generate one here: https://github.com/settings/tokens\n';

export const argv = yargs
  .option('token', { describe: 'GitHub personal access token', type: 'string', required: tokenMsg })
  .option('apply', {
    describe: 'Actually apply changes (without this option, do a dry run)',
    type: 'boolean',
    default: false,
  })
  .option('patch', {
    describe: 'Patch existing release notes for releases less than `age` days old',
    type: 'boolean',
    default: false,
  })
  .option('patch-all', {
    describe: 'Patch ALL existing release notes (will likely hit rate limits)',
    type: 'boolean',
    default: false,
  })
  .option('debug', { describe: 'Use debug mode for the GitHub API', type: 'boolean', default: false })
  // Default to checking the past 5 days in case there were any missed days or other issues
  .option('age', { describe: 'Get tags/releases up to this many days old', type: 'number', default: 5 })
  .option('owner', { describe: 'Owner of the repo to work against', type: 'string', default: fluentRepoDetails.owner })
  .option('repo', { describe: 'Repo to work against', type: 'string', default: fluentRepoDetails.repo })
  .version(false)
  .help().argv;

if (!argv.token) {
  console.error(tokenMsg);
  process.exit(1);
}
// check for placeholder token from launch.json
if (argv.token === 'your token here') {
  console.error(tokenMsg);
  console.error('To test this script, temporarily update launch.json with your token. DO NOT COMMIT YOUR TOKEN!\n');
  process.exit(1);
}

export const repoDetails = {
  owner: argv.owner,
  repo: argv.repo,
};

// Authenticate with github and set up logging if debug arg is provided
export const github = new Octokit({
  ...(argv.debug && { log: console }),
  auth: 'token ' + argv.token,
});
