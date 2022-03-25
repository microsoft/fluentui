/**
 * This script sends release notes to github. The release notes are pulled from
 * CHANGELOG.json entries and are only sent if there aren't already notes for a
 * given tag.
 */

import { Octokit } from '@octokit/rest';
import { argv, repoDetails, github } from './init';
import reactComponentsPackageJson from '../../packages/react-components/package.json';

if (!argv.apply) {
  console.error('\nERROR: createReleaseWithoutNotes does not support a dry run. Use the "--apply" flag.\n');
  process.exit(1);
}

const releaseDetails: Partial<Octokit.ReposUpdateReleaseParams> = {
  ...repoDetails,
  tag_name: reactComponentsPackageJson.version,
  name: `react-components v${reactComponentsPackageJson.version}`,
  draft: false,
  prerelease: true,
  body: `v${reactComponentsPackageJson.version} release`,
  // target_commitish: 'pipeline', // branch name, creates release from master by default
};
github.repos.createRelease(releaseDetails as Octokit.ReposCreateReleaseParams);
