import { lorem } from './lorem';

const DATA = {
  color: ['red', 'blue', 'green', 'yellow'],
  shape: ['circle', 'square', 'triangle'],
  location: ['Seattle', 'New York', 'Chicago', 'Los Angeles', 'Portland'],
};

/** @internal */
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

/** @internal */
export function createListItems(count: number, startIndex: number = 0): IExampleItem[] {
  return [...Array(count)].map((item: number, index: number) => {
    const size = 150 + Math.round(Math.random() * 100);

    return {
      thumbnail: `//via.placeholder.com/${size}x${size}`,
      key: 'item-' + (index + startIndex) + ' ' + lorem(4),
      name: lorem(5),
      description: lorem(10 + Math.round(Math.random() * 50)),
      color: _randWord(DATA.color),
      shape: _randWord(DATA.shape),
      location: _randWord(DATA.location),
      width: size,
      height: size,
    };
  });
}

/**
 * For use in this package only.
 * Partial mirror of IGroup from DetailsList avoid a circular dependency.
 * If the real interface changes and this one starts causing compiler errors, update it.
 * @internal
 */
export interface IExampleGroup {
  count: number;
  key: string;
  name: string;
  startIndex: number;
  level?: number;
  isCollapsed?: boolean;
  children?: IExampleGroup[];
}

/** @internal */
export function createGroups(
  groupCount: number,
  groupDepth: number,
  startIndex: number,
  itemsPerGroup: number,
  level: number = 0,
  key: string = '',
  isCollapsed?: boolean,
): IExampleGroup[] {
  if (key !== '') {
    key = key + '-';
  }
  const count = Math.pow(itemsPerGroup, groupDepth);
  return [...Array(groupCount)].map((value: number, index: number) => {
    return {
      count: count,
      key: 'group' + key + index,
      name: 'group ' + key + index,
      startIndex: index * count + startIndex,
      level: level,
      isCollapsed: isCollapsed,
      children:
        groupDepth > 1
          ? createGroups(groupCount, groupDepth - 1, index * count + startIndex, itemsPerGroup, level + 1, key + index)
          : [],
    };
  });
}

/** @internal */
export function isGroupable(key: string): boolean {
  return key === 'color' || key === 'shape' || key === 'location';
}

function _randWord(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
