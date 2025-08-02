/**
 * Maps items from a previous list to a current list, tracking their indexes
 * for animation purposes. For items that exist in both lists, it includes
 * the previous and current index. For new items, it includes a previousIndex
 * of -1 or the index of the closest item in the previous list.
 *
 * @param previousItems - Array of items from previous render
 * @param currentItems - Array of items for current render
 * @returns Array of mapped items with index tracking information
 */
export function mapItemsWithIndexes<T extends { key: string }>(
  previousItems: T[],
  currentItems: T[],
): Array<T & { prevIndex?: number; index?: number }> {
  // If no previous items, all items are new
  if (previousItems.length === 0) {
    return currentItems.map((item, index) => ({
      ...item,
      prevIndex: -1,
      index,
    }));
  }

  // Create a mapping of keys to indexes for previous items
  const prevKeysMap = new Map<string, number>();
  previousItems.forEach((item, index) => {
    prevKeysMap.set(item.key, index);
  });

  // For each current item, determine its position in the previous list
  const result: Array<T & { prevIndex?: number; index?: number }> = [];
  let lastMatchedPrevIndex = -1;

  for (let i = 0; i < currentItems.length; i++) {
    const currentItem = currentItems[i];
    const prevIndex = prevKeysMap.has(currentItem.key) ? prevKeysMap.get(currentItem.key)! : -1;

    if (prevIndex !== -1) {
      // Item exists in both lists
      lastMatchedPrevIndex = prevIndex;
      result.push({
        ...currentItem,
        prevIndex,
        index: i,
      });
    } else {
      // Item is new. Use the lastMatchedPrevIndex as reference point
      // or -1 if it's before any matched item
      result.push({
        ...currentItem,
        prevIndex: lastMatchedPrevIndex,
        index: i,
      });
    }
  }

  return result;
}
