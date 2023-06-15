const DEFAULT_OVERFLOW_INDEX = 1;
const DEFAULT_MAX_DISPLAYED_ITEMS = 6;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;
type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
type PusitiveNumbers = NumberRange<0, 100>;

export type PartitionBreadcrumbItemsOptions<T> = {
  items: readonly T[];
  maxDisplayedItems?: PusitiveNumbers;
  overflowIndex?: PusitiveNumbers;
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
    overflowIndex =
      overflowIndex === maxDisplayedItems
        ? ((overflowIndex - 1) as PusitiveNumbers)
        : (overflowIndex as PusitiveNumbers);
    const menuLastItemIdx = overflowIndex + numberItemsToHide;

    startDisplayedItems = startDisplayedItems.slice(0, overflowIndex);
    overflowItems = items.slice(overflowIndex, menuLastItemIdx);
    endDisplayedItems = items.slice(menuLastItemIdx, itemsCount);
  }

  return {
    startDisplayedItems,
    overflowItems,
    endDisplayedItems,
  };
};

function getMaxDisplayedItems(maxDisplayedItems: PusitiveNumbers | undefined) {
  return maxDisplayedItems && maxDisplayedItems >= 0 ? maxDisplayedItems : DEFAULT_MAX_DISPLAYED_ITEMS;
}
