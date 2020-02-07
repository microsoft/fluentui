import * as fs from 'fs';

import config from '../config';
import { DangerJS } from './types';

const CHANGELOG_FILE = 'CHANGELOG.md';

/**
 * This function asserts that added entries into the changelog file are placed in the right section.
 */
const hasAddedLinesAfterVersionInChangelog = async (danger): Promise<boolean> => {
  const changelogContent = fs.readFileSync(config.paths.base(CHANGELOG_FILE)).toString();
  const versionLineNumber = changelogContent.split('\n').findIndex(line => line.startsWith('<!--') && line.endsWith('-->'));

  const addedLines = await getAddedLinesFromChangelog(danger);

  return addedLines.some(line => line.ln > versionLineNumber);
};

const getMalformedChangelogEntries = async (danger): Promise<string[]> => {
  // +- description @githubname ([#DDDD](https://github.com/microsoft/fluent-ui-react/pull/DDDD))
  const validEntry = /^\+- .*@\S+ \(\[#(\d+)]\(https:\/\/github\.com\/microsoft\/fluent-ui-react\/pull\/\1\)\)$/;

  const addedLines = await getAddedLinesFromChangelog(danger);

  return addedLines.map(line => line.content).filter(content => content.startsWith('+-') && !validEntry.test(content));
};

const getAddedLinesFromChangelog = async (danger): Promise<{ content: string; ln: number }[]> => {
  return danger.git.structuredDiffForFile(CHANGELOG_FILE).then(changelogDiff => {
    return changelogDiff.chunks.reduce((acc, chunk) => {
      const filteredLines = chunk.changes.filter(change => change.type === 'add');
      return acc.concat(filteredLines);
    }, []);
  });
};

export default async ({ danger, fail, warn }: DangerJS) => {
  // Check for a CHANGELOG entry
  const hasChangelog = danger.git.modified_files.some(f => f === CHANGELOG_FILE);

  if (!hasChangelog) {
    warn('There are no updates provided to CHANGELOG. Ensure there are no publicly visible changes introduced by this PR.');
  } else {
    const malformedChangelogEntries = await getMalformedChangelogEntries(danger);
    malformedChangelogEntries.forEach(entry => {
      fail(`Invalid entry format in ${CHANGELOG_FILE}: >${entry}<

The correct format is: \`- description @githubname ([#DDDD](https://github.com/microsoft/fluent-ui-react/pull/DDDD)\``);
    });

    const hasLine = await hasAddedLinesAfterVersionInChangelog(danger);
    if (hasLine) {
      fail(`All of your entries in ${CHANGELOG_FILE} should be in the **Unreleased** section!`);
    }
  }
};
