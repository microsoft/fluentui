import { ExecFileException, execSync } from 'child_process';
import * as path from 'path';

import { getWorkspaceProjects } from '@fluentui/scripts-monorepo';
import { ChangelogJson } from 'beachball';
import * as fs from 'fs-extra';

import { IChangelogEntry } from './types';

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Builds a map of changelog tags to entries defined in all CHANGELOG.json files.
 * @param maxAgeDays - If provided, only include entries less than this many days old.
 * Otherwise get all entries.
 */
export function getTagToChangelogMap(maxAgeDays?: number): Map<string, IChangelogEntry> {
  console.log(`Getting changelog entries${maxAgeDays ? ` up to ${maxAgeDays} days old` : ''}...`);

  const map = new Map<string, IChangelogEntry>();

  const workspaceProjects = getWorkspaceProjects();

  for (const [, projectConfig] of workspaceProjects) {
    const changelogPath = path.join(projectConfig.root, 'CHANGELOG.json');
    if (fs.existsSync(changelogPath)) {
      const changelog: ChangelogJson = fs.readJSONSync(changelogPath);
      for (const entry of changelog.entries) {
        if (_isNewEnough(entry.date, maxAgeDays)) {
          map.set(entry.tag, { ...entry, name: changelog.name });
        } else {
          // changelog entries should be in reverse chronological order, so stop after the first one
          // that's too old
          break;
        }
      }
    }
  }

  console.log(`Found changelog entries for ${map.size} tags.\n`);

  return map;
}

/**
 * Gets all the tags in a repo using 'git tag'.
 * @param maxAgeDays - If provided, only include entries less than this many days old.
 * Otherwise get all entries.
 * @returns List of tags
 */
export function getTags(maxAgeDays?: number): string[] {
  const ONE_MEGABYTE = 1024 * 1000;
  const TEN_MEGABYTES = ONE_MEGABYTE * 10;
  console.log(`Getting tags${maxAgeDays ? ` up to ${maxAgeDays} days old` : ''}...`);

  try {
    const cmd = 'git for-each-ref --sort=-creatordate --format="%(refname:short) -- %(creatordate)" refs/tags';
    const gitForEachRefBuffer = execSync(cmd, {
      // execSync buffer is by default 1MB (node 16). Our git refs tog is much bigger than that, thus setting for 10MB
      maxBuffer: TEN_MEGABYTES,
    });
    const currentBufferSize = (gitForEachRefBuffer.byteLength / ONE_MEGABYTE).toFixed(2);

    console.warn(`
  📣 NOTE: "git for-each-ref" current buffer size is ${currentBufferSize}MB.
  If this will be more than maxBuffer ${TEN_MEGABYTES}MB this command will fail and you'll have to increase maxBuffer!
  `);

    let tagsAndDates = gitForEachRefBuffer
      .toString()
      .split(/\r?\n/g)
      .map(tag => tag.split(' -- '))
      .filter(arr => arr.length === 2);

    if (maxAgeDays) {
      const endIndex = tagsAndDates.findIndex(([, date]) => !_isNewEnough(date, maxAgeDays));
      if (endIndex !== -1) {
        tagsAndDates = tagsAndDates.slice(0, endIndex);
      }
    }

    const tags = tagsAndDates.map(([tag]) => tag);

    console.log(`Found ${tags.length} tag(s).\n`);

    return tags;
  } catch (err) {
    if (err instanceof Error && (err as ExecFileException).code === 'ENOBUFS') {
      throw new Error(`maxBuffer ${TEN_MEGABYTES}MB was reached. Increase its size in the codebase`);
    }

    throw err;
  }
}

/**
 * @param dateStr - String of a date
 * @param maxAgeDays - If provided, only return true if entry is less than this many days old.
 * If not provided, always return true.
 */
function _isNewEnough(dateStr: string, maxAgeDays?: number): boolean {
  return !maxAgeDays || Date.now() - new Date(dateStr).getTime() < maxAgeDays * MILLIS_PER_DAY;
}
