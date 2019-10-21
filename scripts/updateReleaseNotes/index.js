// @ts-check
/// <reference path="./index.d.ts" />

/**
 * This script sends release notes to github. The release notes are pulled from
 * CHANGELOG.json entries and are only sent if there aren't already notes for a
 * given tag.
 */

const GitHubApi = require('@octokit/rest');
const { argv, repoDetails, github } = require('./init');
const { getTagToChangelogMap, getTags } = require('./changelogsAndTags');
const { getReleases } = require('./releases');
const { getMarkdownForEntry } = require('./markdown');

if (!argv.apply) {
  console.warn('\nNOTE: This is a test run only. To actually update release notes on GitHub, use the "--apply" flag.\n');
}

// Call the primary entry point.
updateReleaseNotes();

/**
 * Adds new release notes, and if argv.patch is true, will patch existing ones in the case
 * that they need to be regenerated.
 */
async function updateReleaseNotes() {
  // If we're patching all release notes, get all the changelog entries/tags and all the releases
  // (expensive operations). Otherwise only get changelog entries/tags from the past argv.age days,
  // and corresponding releases (if they exist yet).
  const changelogEntries = getTagToChangelogMap(argv.patchAll ? undefined : argv.age);
  const tagsToFetch = argv.patchAll ? undefined : Array.from(changelogEntries.keys());
  const releasesByTag = await getReleases(tagsToFetch);
  let count = 0;

  const tags = getTags().filter(tag => changelogEntries.has(tag));
  // do NOT use forEach here, since it doesn't handle async properly
  for (const tag of tags) {
    const entry = changelogEntries.get(tag);
    const hasBeenReleased = releasesByTag.has(tag);

    if (hasBeenReleased && !(argv.patch || argv.patchAll)) {
      continue; // nothing to do
    }

    const entryInfo = `${entry.name} ${entry.version}`;
    console.log('--------------------------------------------------------------------------------------------------------\n');
    console.log(`${hasBeenReleased ? 'Patching' : 'Creating'} release notes for ${entryInfo}...\n`);
    count++;

    /** @type {Partial<GitHubApi.ReposUpdateReleaseParams>} */
    const releaseDetails = {
      ...repoDetails,
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
        throw new Error(`Failed to commit release notes for ${entryInfo}.\n${err}`);
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
