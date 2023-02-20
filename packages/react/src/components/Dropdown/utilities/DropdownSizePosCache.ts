import { DropdownMenuItemType } from '../Dropdown.types';
import type { IDropdownOption } from '../Dropdown.types';

/**
 * A utility class to cache size and position in cache.
 *
 * Dropdown options has non-selectable display types. It is therefore not cheap to determine
 * the total number of actual selectable options as well as the position an option is in the
 * list of options - O(n) cost for each lookup.
 *
 * Given that we potentially have to make this determination on every single render pass, this
 * cache should provide a little bit of relief.
 */
export class DropdownSizePosCache {
  private _cachedOptions: IDropdownOption[];
  private _displayOnlyOptionsCache: number[];
  private _notSelectableOptionsCache: number[];
  private _size = 0;

  /**
   * Invalidates the cache and recalculate the size of selectable options.
   */
  public updateOptions(options: IDropdownOption[]) {
    const displayOnlyOptionsCache = [];
    const notSelectableOptionsCache = [];
    let size = 0;
    for (let i = 0; i < options.length; i++) {
      const { itemType, hidden } = options[i];

      if (itemType === DropdownMenuItemType.Divider || itemType === DropdownMenuItemType.Header) {
        displayOnlyOptionsCache.push(i);
        notSelectableOptionsCache.push(i);
      } else if (hidden) {
        notSelectableOptionsCache.push(i);
      } else {
        size++;
      }
    }

    this._size = size;
    this._displayOnlyOptionsCache = displayOnlyOptionsCache;
    this._notSelectableOptionsCache = notSelectableOptionsCache;
    this._cachedOptions = [...options];
  }

  /**
   * The size of all the selectable options.
   */
  public get optionSetSize(): number {
    return this._size;
  }

  /**
   * The chached options array.
   */
  public get cachedOptions(): IDropdownOption[] {
    return this._cachedOptions;
  }

  /**
   * Returns the position of this option element relative to the full set of selectable option elements.
   * Note: the first selectable element is position 1 in the set.
   * @param index The raw index of the option element.
   */
  public positionInSet(index: number | undefined): number | undefined {
    if (index === undefined) {
      return undefined;
    }

    // we could possibly memoize this too but this should be good enough, most of the time (the expectation is that
    // when you have a lot of options, the selectable options will heavily dominate over the non-selectable options.
    let offset = 0;
    while (index > this._notSelectableOptionsCache[offset]) {
      offset++;
    }

    if (this._displayOnlyOptionsCache[offset] === index) {
      throw new Error(`Unexpected: Option at index ${index} is not a selectable element.`);
    }

    if (this._notSelectableOptionsCache[offset] === index) {
      return undefined;
    }

    return index - offset + 1;
  }
}
