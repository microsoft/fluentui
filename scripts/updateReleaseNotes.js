// @ts-check

'use strict';

/**
 * This script sends release notes to github. The release notes are pulled from
 * CHANGELOG.json entries and are only sent if there aren't already notes for a
 * given tag.
 *
 * @typedef {{
 *   comment: string;
 *   commit?: string;
 * }} ChangelogComment
 *
 * @typedef {{
 *   comments: { major: ChangelogComment[]; minor: ChangelogComment[]; patch: ChangelogComment[]; };
 *   name?: string;
 *   date?: string;
 *   tag?: string;
 *   version: string;
 *   body?: string;
 * }} ChangelogEntry
 *
 * @typedef {{
 *   number: number;
 *   url: string;
 *   author: string;
 *   authorUrl: string;
 * }} PullRequest
 */

const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const execSync = require('child_process').execSync;
const GitHubApi = require('@octokit/rest');

const argv = yargs
  .option('token', {
    describe: 'GitHub personal access token',
    type: 'string',
    required:
      'A GitHub personal access token is required even for dry runs due to the potential high rate of requests.\n' +
      'Generate one here: https://github.com/settings/tokens\n'
  })
  .option('apply', { describe: 'Actually apply changes (without this option, do a dry run)', type: 'boolean', default: false })
  .option('patch', { describe: 'Patch existing release notes for releases less than `age` days old', type: 'boolean', default: false })
  .option('patch-all', { describe: 'Patch ALL existing release notes (will likely hit rate limits)', type: 'boolean', default: false })
  .option('debug', { describe: 'Use debug mode for the GitHub API', type: 'boolean', default: false })
  // Default to checking the past 5 days in case there were any missed days or other issues
  .option('age', { describe: 'Get tags/releases up to this many days old', type: 'number', default: 5 })
  .option('owner', { describe: 'Owner of the repo to work against', type: 'string', default: 'OfficeDev' })
  .option('repo', { describe: 'Repo to work against', type: 'string', default: 'office-ui-fabric-react' })
  .version(false)
  .help().argv;

const EOL = '\n';
const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

const REPO_DETAILS = {
  owner: argv.owner,
  repo: argv.repo
};

if (!argv.apply) {
  console.log('NOTE: This is a test run only. To actually update release notes on GitHub, use the "--apply" flag.');
}

// Authenticate with github and set up logging if debug arg is provided
const github = new GitHubApi({ ...(argv.debug ? { log: console } : {}), auth: 'token ' + argv.token });

// Call the primary entry point.
updateReleaseNotes();

/**
 * For each file within the folder tree that matches the filename, call the callback
 * with an object containing path/content.
 * @param {string} folder
 * @param {string} fileName
 * @param {(result: { path: string; content: string; }) => void} cb
 */
function forEachFileRecursive(folder, fileName, cb) {
  folder = folder || process.cwd();

  let folderContent = fs.readdirSync(folder).filter(name => !['node_modules', '.git'].includes(name));

  folderContent
    .filter(itemName => itemName === fileName)
    .forEach(matchedFileName =>
      cb({
        path: path.resolve(folder, matchedFileName),
        content: fs.readFileSync(path.resolve(folder, matchedFileName), 'utf8')
      })
    );

  folderContent.forEach(itemName => {
    let itemPath = path.resolve(folder, itemName);

    if (fs.lstatSync(itemPath).isDirectory()) {
      forEachFileRecursive(itemPath, fileName, cb);
    }
  });
}

/**
 * Build up the markdown from the entry description.
 * @param {ChangelogEntry} entry
 */
async function getMarkdownForEntry(entry) {
  const comments =
    (await getChangeComments('Breaking changes', entry.comments.major)) +
    (await getChangeComments('Minor changes', entry.comments.minor)) +
    (await getChangeComments('Patches', entry.comments.patch));

  return comments || '*Changes not tracked*' + EOL + EOL;
}

/**
 * Gets the release notes markdown corresponding to the comment array.
 * @param {string} title Section title (probably change type, major/minor/patch)
 * @param {ChangelogComment[]} comments Changelog comments for a version
 */
async function getChangeComments(title, comments) {
  if (comments) {
    const lines = ['## ' + title, ''];
    for (const comment of comments) {
      let line = `- ${comment.comment}`;
      if (comment.commit) {
        line += ` ([commit](https://github.com/${REPO_DETAILS.owner}/${REPO_DETAILS.repo}/commit/${comment.commit})`;

        const pr = await getPullRequest(comment.commit);
        if (pr) {
          line += ` by [${pr.author}](${pr.authorUrl}), PR [#${pr.number}](${pr.url})`;
        }

        line += `)`;
      }
      lines.push(line);
    }
    lines.push('');
    return lines.join(EOL);
  }
  return '';
}

/**
 * Get the single pull request associated with the given commit.
 * @param {string} commitHash
 * @returns {Promise<PullRequest>}
 */
async function getPullRequest(commitHash) {
  try {
    const result = await github.repos.listPullRequestsAssociatedWithCommit({ commit_sha: commitHash, ...REPO_DETAILS });
    // In case the commit has been in multiple PRs at some point but only one got merged
    const prs = result.data.filter(result => !!result.merged_at);
    if (prs.length > 1) {
      // In case the commit was in PRs to multiple branches or something?
      console.warn(`Multiple PRs found for ${commitHash}: ${prs.map(pr => '#' + pr.number).join(', ')}`);
    }
    if (prs[0]) {
      return {
        number: prs[0].number,
        url: prs[0].html_url,
        author: prs[0].user.login,
        authorUrl: prs[0].user.html_url
      };
    } else {
      console.warn('No PRs found for ' + commitHash);
    }
  } catch (ex) {
    console.warn(`Error finding PR for ${commitHash}: ${ex}`);
  }
  return null;
}

/**
 * Builds a map of changelog tags to entries defined in CHANGELOG.json files.
 * @param {number} [maxAgeDays] If provided, only include entries less than this many days old.
 * Otherwise get all entries.
 */
function getChangelogTagMap(maxAgeDays) {
  /** @type {Map<string, ChangelogEntry>} */
  let map = new Map();

  forEachFileRecursive(undefined, 'CHANGELOG.json', result => {
    /** @type {{ entries: ChangelogEntry[]; name: string; }} */
    let changelog = JSON.parse(result.content);
    for (const entry of changelog.entries) {
      if (isNewEnough(entry.date, maxAgeDays)) {
        entry.name = changelog.name;
        map.set(entry.tag, entry);
      } else {
        // changelog entries should be in reverse chronological order, so stop after the first one
        // that's too old
        break;
      }
    }
  });

  return map;
}

/**
 * Gets all the tags in a repo using 'git tag'.
 * @param {number} [maxAgeDays] If provided, only include entries less than this many days old.
 * Otherwise get all entries.
 */
function getTags(maxAgeDays) {
  const cmd = [
    'git',
    'for-each-ref',
    '--sort=-committerdate', // commit date descending
    "--format='%(refname:short) -- %(committerdate)'",
    'refs/tags'
  ].join(' ');

  let tagsAndDates = execSync(cmd, { cwd: process.cwd() })
    .toString()
    .split('\n')
    .map(tag => tag.split(' -- '))
    .filter(arr => arr.length === 2);

  if (maxAgeDays) {
    const endIndex = tagsAndDates.findIndex(([, date]) => !isNewEnough(date, maxAgeDays));
    if (endIndex !== -1) {
      tagsAndDates = tagsAndDates.slice(0, endIndex);
    }
  }

  const tags = tagsAndDates.map(([tag]) => tag);

  console.log(`Found ${tags.length} tag(s).`);

  return tags;
}

/**
 * @param {string} dateStr String of a date
 * @param {number} [maxAgeDays] If provided, only return true if entry is less than this many days old.
 * If not provided, always return true.
 */
function isNewEnough(dateStr, maxAgeDays) {
  return !maxAgeDays || Date.now() - new Date(dateStr).getTime() < maxAgeDays * MILLIS_PER_DAY;
}

/**
 * Gets all releases from github.
 * @param {string[]} [tags] If provided, only get the releases for these tags (it's okay if a tag
 * doesn't have a release yet). Otherwise get all the releases.
 */
async function getReleases(tags) {
  /** @type {Map<string, GitHubApi.ReposListReleasesResponseItem>} */
  let releases = new Map();

  if (tags) {
    // Only get a subset of releases
    for (const tag of tags) {
      try {
        const release = await github.repos.getReleaseByTag({ ...REPO_DETAILS, tag });
        releases.set(release.data.tag_name, release.data);
      } catch (err) {
        if (err.status === 404) {
          // This tag probably isn't released yet, which is fine in this context
        } else {
          throw new Error(`Could not get release for tag ${tag} from github.\n${err}`);
        }
      }
    }
  } else {
    // Get all the releases
    try {
      /** @type {GitHubApi.ReposListReleasesResponseItem[]} */
      const res = await github.paginate(github.repos.listReleases.endpoint.merge(REPO_DETAILS));

      res.forEach(release => {
        releases.set(release.tag_name, release);
      });
    } catch (err) {
      throw new Error('Could not get releases from github.\n' + err);
    }
  }

  console.log(`Found ${releases.size}${tags ? ' recent' : ''} releases on github.`);

  return releases;
}

/**
 * Adds new release notes, and if argv.patch is true, will patch existing ones in the case
 * that they need to be regenerated.
 */
async function updateReleaseNotes() {
  // If we're patching all release notes, get all the changelog entries/tags and all the releases
  // (expensive operations). Otherwise only get changelog entries/tags from the past argv.age days,
  // and corresponding releases (if they exist yet).
  const changelogEntries = getChangelogTagMap(argv.patchAll ? undefined : argv.age);
  const tagsToFetch = argv.patchAll ? undefined : Array.from(changelogEntries.keys());
  const releasesByTag = await getReleases(tagsToFetch);
  let count = 0;

  const tags = getTags().filter(tag => changelogEntries.has(tag));
  // do NOT use forEach here, since it doesn't handle async properly
  for (const tag of tags) {
    let entry = changelogEntries.get(tag);
    let hasBeenReleased = releasesByTag.has(tag);

    if (hasBeenReleased && !(argv.patch || argv.patchAll)) {
      return; // nothing to do
    }

    const entryInfo = `${entry.name} ${entry.version}`;
    console.log(`${hasBeenReleased ? 'Patching' : 'Creating'} release notes for ${entryInfo}`);
    count++;

    /** @type {Partial<GitHubApi.ReposUpdateReleaseParams>} */
    const releaseDetails = {
      ...REPO_DETAILS,
      tag_name: entry.tag,
      name: `${entry.name} v${entry.version}`,
      draft: false,
      prerelease: false,
      body: await getMarkdownForEntry(entry)
    };
    if (hasBeenReleased) {
      releaseDetails.release_id = releasesByTag.get(tag).id;
    }

    if (argv.apply) {
      try {
        if (hasBeenReleased) {
          await github.repos.updateRelease(/** @type {GitHubApi.ReposUpdateReleaseParams} */ (releaseDetails));
        } else {
          await github.repos.createRelease(/** @type {GitHubApi.ReposCreateReleaseParams} */ (releaseDetails));
        }
        console.log(`Successfully ${hasBeenReleased ? 'updated' : 'created'} release notes for ${entryInfo}`);
      } catch (err) {
        throw new Error(`Failed to commit release notes for ${entryInfo}.${EOL}${err}`);
      }
    } else {
      // Log the expected output (with the body separate to get it nicely formatted, not as JSON)
      const { body, ...rest } = releaseDetails;
      console.log('\nRelease details: ' + JSON.stringify(rest, null, 2));
      console.log('\n' + body);
    }
  }

  if (!count) {
    console.log('No changes were applied.');
  }
}
