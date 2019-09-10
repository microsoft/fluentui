// Shared code for creating example data.
// This file is not included in the main office-ui-fabric-react bundle.
// If this file is moved or split, the scripts for building codepen examples will likely need to be updated.

import { IGroup } from 'office-ui-fabric-react/lib/DetailsList';

const LOREM_IPSUM = (
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum'
).split(' ');

const DATA = {
  color: ['red', 'blue', 'green', 'yellow'],
  shape: ['circle', 'square', 'triangle'],
  location: ['Seattle', 'New York', 'Chicago', 'Los Angeles', 'Portland']
};

/** @deprecated Use the version from `@uifabric/example-data` instead. */
export interface IExampleItem {
  thumbnail: string;
  key: string;
  name: string;
  description: string;
  color: string;
  shape: string;
  location: string;
  width: number;
  height: number;
}

/** @deprecated Use the version from `@uifabric/example-data` instead. */
export function createListItems(count: number, startIndex: number = 0): IExampleItem[] {
  return Array.apply(null, Array(count)).map((item: number, index: number) => {
    const size = 150 + Math.round(Math.random() * 100);

    return {
      thumbnail: `//placehold.it/${size}x${size}`,
      key: 'item-' + (index + startIndex) + ' ' + lorem(4),
      name: lorem(5),
      description: lorem(10 + Math.round(Math.random() * 50)),
      color: _randWord(DATA.color),
      shape: _randWord(DATA.shape),
      location: _randWord(DATA.location),
      width: size,
      height: size
    };
  });
}

/** @deprecated Use the version from `@uifabric/example-data` instead. */
export function createGroups(
  groupCount: number,
  groupDepth: number,
  startIndex: number,
  itemsPerGroup: number,
  level: number = 0,
  key: string = '',
  isCollapsed?: boolean
): IGroup[] {
  if (key !== '') {
    key = key + '-';
  }
  const count = Math.pow(itemsPerGroup, groupDepth);
  return Array.apply(null, Array(groupCount)).map((value: number, index: number) => {
    return {
      count: count,
      key: 'group' + key + index,
      name: 'group ' + key + index,
      startIndex: index * count + startIndex,
      level: level,
      isCollapsed: isCollapsed,
      children:
        groupDepth > 1 ? createGroups(groupCount, groupDepth - 1, index * count + startIndex, itemsPerGroup, level + 1, key + index) : []
    };
  });
}

/** @deprecated Use the version from `@uifabric/example-data` instead. */
export function lorem(wordCount: number): string {
  return Array.apply(null, Array(wordCount))
    .map((item: number, idx: number) => {
      return LOREM_IPSUM[idx % LOREM_IPSUM.length];
    })
    .join(' ');
}

export function isGroupable(key: string): boolean {
  return key === 'color' || key === 'shape' || key === 'location';
}

function _randWord(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
