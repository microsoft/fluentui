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
  const { items } = options;
  const overflowIndex = options.overflowIndex || DEFAULT_OVERFLOW_INDEX;
  const maxDisplayedItems = options.maxDisplayedItems ?? DEFAULT_MAX_DISPLAYED_ITEMS;
  const itemsCount = items.length;

  const numberItemsToHide = itemsCount - maxDisplayedItems;
  const startDisplayedItems = numberItemsToHide > 0 ? items.slice(0, overflowIndex) : items;
  let overflowItems;
  let endDisplayedItems;

  if (numberItemsToHide > 0) {
    const menuLastItemIdx = overflowIndex + numberItemsToHide;
    overflowItems = items.slice(overflowIndex, menuLastItemIdx);
    endDisplayedItems = items.slice(menuLastItemIdx, itemsCount);
  }

  return {
    startDisplayedItems,
    overflowItems,
    endDisplayedItems,
  };
};
