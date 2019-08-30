// @ts-check
/// <reference path="./index.d.ts" />

const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Builds a map of changelog tags to entries defined in all CHANGELOG.json files.
 * @param {number} [maxAgeDays] - If provided, only include entries less than this many days old.
 * Otherwise get all entries.
 * @returns {Map<string, IChangelogEntry>}
 */
function getTagToChangelogMap(maxAgeDays) {
  console.log(`Getting changelog entries${maxAgeDays ? ` up to ${maxAgeDays} days old` : ''}...`);

  /** @type {Map<string, IChangelogEntry>} */
  const map = new Map();

  forEachFileRecursive(undefined, 'CHANGELOG.json', result => {
    /** @type {IChangelog} */
    const changelog = JSON.parse(result.content);
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

  console.log(`Found changelog entries for ${map.size} tags.\n`);

  return map;
}

/**
 * Gets all the tags in a repo using 'git tag'.
 * @param {number} [maxAgeDays] - If provided, only include entries less than this many days old.
 * Otherwise get all entries.
 * @returns {string[]} List of tags
 */
function getTags(maxAgeDays) {
  console.log(`Getting tags${maxAgeDays ? ` up to ${maxAgeDays} days old` : ''}...`);

  const cmd = 'git for-each-ref --sort=-creatordate --format="%(refname:short) -- %(creatordate)" refs/tags';

  let tagsAndDates = execSync(cmd, { cwd: process.cwd() })
    .toString()
    .split(/\r?\n/g)
    .map(tag => tag.split(' -- '))
    .filter(arr => arr.length === 2);

  if (maxAgeDays) {
    const endIndex = tagsAndDates.findIndex(([, date]) => !isNewEnough(date, maxAgeDays));
    if (endIndex !== -1) {
      tagsAndDates = tagsAndDates.slice(0, endIndex);
    }
  }

  const tags = tagsAndDates.map(([tag]) => tag);

  console.log(`Found ${tags.length} tag(s).\n`);

  return tags;
}

/**
 * For each file within the folder tree that matches the filename, call the callback
 * with an object containing path/content.
 *
 * @param {string} folder
 * @param {string} fileName
 * @param {(result: { path: string; content: string; }) => void} cb
 * @returns {void}
 */
function forEachFileRecursive(folder, fileName, cb) {
  folder = folder || process.cwd();

  const folderContent = fs.readdirSync(folder).filter(name => !['node_modules', '.git'].includes(name));

  folderContent
    .filter(itemName => itemName === fileName)
    .forEach(matchedFileName =>
      cb({
        path: path.resolve(folder, matchedFileName),
        content: fs.readFileSync(path.resolve(folder, matchedFileName), 'utf8')
      })
    );

  folderContent.forEach(itemName => {
    const itemPath = path.resolve(folder, itemName);

    if (fs.lstatSync(itemPath).isDirectory()) {
      forEachFileRecursive(itemPath, fileName, cb);
    }
  });
}

/**
 * @param {string} dateStr - String of a date
 * @param {number} [maxAgeDays] - If provided, only return true if entry is less than this many days old.
 * If not provided, always return true.
 * @returns {boolean}
 */
function isNewEnough(dateStr, maxAgeDays) {
  return !maxAgeDays || Date.now() - new Date(dateStr).getTime() < maxAgeDays * MILLIS_PER_DAY;
}

module.exports = { getTags, getTagToChangelogMap };
