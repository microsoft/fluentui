export type PartitionAvatarGroupItemsOptions<T> = {
  /**
   * Items to partition for the AvatarGroup.
   */
  items: readonly T[];

  /**
   * Layout to base the partitioning on.
   *
   * @default 'spread'
   */
  layout?: 'spread' | 'stack' | 'pie';

  /**
   * Maximum number of inline items to show.
   */
  maxInlineItems?: number;

  /**
   * When the layout is `spread` or `stack`, partitionAvatarGroupItems makes space for AvatarGroupPopover in the
   * inlineItems.
   *
   * @default 'true'
   */
  addOverflowIndicatorSpace?: boolean;
};

export type PartitionAvatarGroupItems<T> = {
  inlineItems: readonly T[];
  overflowItems?: readonly T[];
};

/**
 * Get the inline items and overflowing items based on the array of AvatarGroupItems needed for AvatarGroup.
 *
 * @param options - Configure the partition options
 *
 * @returns Two arrays partitioned into inline items and overflow items based on maxInlineItems.
 */
export const partitionAvatarGroupItems = <T>(
  options: PartitionAvatarGroupItemsOptions<T>,
): PartitionAvatarGroupItems<T> => {
  const { items, addOverflowIndicatorSpace = true } = options;
  const isPie = options.layout === 'pie';

  if (isPie) {
    return {
      inlineItems: items.slice(0, 3),
      overflowItems: items.length > 0 ? items : undefined,
    };
  }

  const maxInlineItems = options.maxInlineItems ?? 5;
  const inlineCount = -(maxInlineItems - (addOverflowIndicatorSpace && items.length > maxInlineItems ? 1 : 0));
  const overflowItems = items.slice(0, inlineCount);

  return {
    inlineItems: items.slice(inlineCount),
    overflowItems: overflowItems.length > 0 ? overflowItems : undefined,
  };
};
