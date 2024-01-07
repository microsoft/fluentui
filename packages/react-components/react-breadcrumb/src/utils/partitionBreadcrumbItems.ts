const DEFAULT_OVERFLOW_INDEX = 1;
const DEFAULT_MAX_DISPLAYED_ITEMS = 6;

export type PartitionBreadcrumbItemsOptions<T> = {
  items: readonly T[];
  maxDisplayedItems?: number;
  overflowIndex?: number;
};

export type PartitionBreadcrumbItems<T> = {
  startDisplayedItems: readonly T[];
  overflowItems?: readonly T[];
  endDisplayedItems?: readonly T[];
};

/**
 * Get the displayed items and overflowing items based on the array of BreadcrumbItems needed for Breadcrumb.
 *
 * @param options - Configure the partition options
 *
 * @returns Three arrays split into displayed items and overflow items based on maxDisplayedItems.
 */
export const partitionBreadcrumbItems = <T>(
  options: PartitionBreadcrumbItemsOptions<T>,
): PartitionBreadcrumbItems<T> => {
  let startDisplayedItems;
  let overflowItems;
  let endDisplayedItems;

  const { items = [] } = options;
  const itemsCount = items.length;
  const maxDisplayedItems = getMaxDisplayedItems(options.maxDisplayedItems);
  let overflowIndex = options.overflowIndex ?? DEFAULT_OVERFLOW_INDEX;
  startDisplayedItems = items.slice(0, overflowIndex);

  const numberItemsToHide = itemsCount - maxDisplayedItems;

  if (numberItemsToHide > 0) {
    overflowIndex = overflowIndex >= maxDisplayedItems ? maxDisplayedItems - 1 : overflowIndex;
    const menuLastItemIdx = overflowIndex + numberItemsToHide;

    startDisplayedItems = startDisplayedItems.slice(0, overflowIndex);
    overflowItems = items.slice(overflowIndex, menuLastItemIdx);
    if (menuLastItemIdx < itemsCount) {
      endDisplayedItems = items.slice(menuLastItemIdx, itemsCount);
    }
  } else if (overflowIndex < itemsCount) {
    endDisplayedItems = items.slice(overflowIndex, itemsCount);
  }

  return {
    startDisplayedItems,
    overflowItems,
    endDisplayedItems,
  };
};

function getMaxDisplayedItems(maxDisplayedItems: number | undefined) {
  return maxDisplayedItems && maxDisplayedItems >= 0 ? maxDisplayedItems : DEFAULT_MAX_DISPLAYED_ITEMS;
}
