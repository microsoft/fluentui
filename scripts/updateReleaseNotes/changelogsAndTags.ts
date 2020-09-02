import * as path from 'path';
import * as fs from 'fs-extra';
import { execSync } from 'child_process';
import { ChangelogJson } from 'beachball';
import { rollup as lernaAliases } from 'lerna-alias';
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

  // Get all package directories so we can check if they have a CHANGELOG.json
  // (sourceDirectory: false means don't append src/index)
  const packagePaths = Object.values(lernaAliases({ sourceDirectory: false }));

  for (const packagePath of packagePaths) {
    const changelogPath = path.join(packagePath, 'CHANGELOG.json');
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
  console.log(`Getting tags${maxAgeDays ? ` up to ${maxAgeDays} days old` : ''}...`);

  const cmd = 'git for-each-ref --sort=-creatordate --format="%(refname:short) -- %(creatordate)" refs/tags';

  let tagsAndDates = execSync(cmd, { cwd: process.cwd() })
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
}

/**
 * @param dateStr - String of a date
 * @param maxAgeDays - If provided, only return true if entry is less than this many days old.
 * If not provided, always return true.
 */
function _isNewEnough(dateStr: string, maxAgeDays?: number): boolean {
  return !maxAgeDays || Date.now() - new Date(dateStr).getTime() < maxAgeDays * MILLIS_PER_DAY;
}
