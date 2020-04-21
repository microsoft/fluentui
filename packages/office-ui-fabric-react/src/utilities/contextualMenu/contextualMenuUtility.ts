import { IContextualMenuItem } from '../../index';

/**
 * Determines the effective checked state of a menu item.
 *
 * @param item {IContextualMenuItem} to get the check state of.
 * @returns {true} if the item is checked.
 * @returns {false} if the item is unchecked.
 * @returns {null} if the item is not checkable.
 */
export function getIsChecked(item: IContextualMenuItem): boolean | null {
  if (item.canCheck) {
    return !!(item.isChecked || item.checked);
  }

  if (typeof item.isChecked === 'boolean') {
    return item.isChecked;
  }

  if (typeof item.checked === 'boolean') {
    return item.checked;
  }

  // Item is not checkable.
  return null;
}

export function hasSubmenu(item: IContextualMenuItem): boolean {
  return !!(item.subMenuProps || item.items);
}

export function isItemDisabled(item: IContextualMenuItem): boolean {
  return !!(item.isDisabled || item.disabled);
}

export function getMenuItemAriaRole(item: IContextualMenuItem): string {
  const isChecked = getIsChecked(item);
  const canCheck: boolean = isChecked !== null;
  return canCheck ? 'menuitemcheckbox' : 'menuitem';
}

/**
 * Memoizes a function; Instead of returning a cached result when passing the same argument references, it returns
 * a cached result when the last and new result share the same hash. The cache only saves the previous result per id.
 *
 * This memoize function is intended to use when the same function is called several times (e.g. distinct ids) during an store update
 * and calculating the result is cheap. The idea behind this is that we want to return the previous reference to avoid
 * React's reconciliation algorithm and rendering in Pure Components which are typically orders of magnitude more expensive.
 *
 * @param func The function to be memoize
 */
export function memoizeLastResultPerId<T extends (id: string, ...args: any[]) => RET_TYPE, RET_TYPE>(func: T): T {
  let dictionary: { [id: string]: { prevResult: RET_TYPE; resultHash: string } } = {};
  return function memoizedFunction(id: string, ...args: any[]): RET_TYPE {
    const result = func(id, ...args);
    // Use murmur3 to reduce the bytes needed to be stored in memory.
    const resultHash = hashCode(JSON.stringify(result)).toString(36);

    // return if we have a previous calculated result and they share the same hash
    if (dictionary[id] && dictionary[id].resultHash === resultHash) {
      return dictionary[id].prevResult;
    }
    dictionary[id] = { prevResult: result, resultHash };

    return result;
  } as T;
}

function hashCode(str: string) {
  // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}
