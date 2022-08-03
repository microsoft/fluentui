export type PartitionAvatarGroupItemsOptions<T> = {
  items: readonly T[];
  layout?: 'spread' | 'stack' | 'pie';
  maxInlineItems?: number;
};

/**
 * Get the inline items and overflowing items based on the array of AvatarGroupItems needed for AvatarGroup.
 *
 * @param options - Configure the partition options
 *
 * @returns Two arrays of AvatarGroupItems splitted between the inline items and the overflowing items
 * based on maxItems.
 *
 * NOTE: Each item in the array must be a single AvatarGroupItem. If an item in the array contains a fragment with
 * two avatars, the items will not be partitioned correctly.
 */
export const partitionAvatarGroupItems = <T>(options: PartitionAvatarGroupItemsOptions<T>) => {
  const { items } = options;
  const isPie = options.layout === 'pie';

  if (isPie) {
    return {
      inlineItems: items.slice(0, 3),
      overflowItems: items,
    };
  }

  const maxInlineItems = options.maxInlineItems ?? 5;
  const inlineCount = -(maxInlineItems - (items.length > maxInlineItems ? 1 : 0));

  return {
    inlineItems: items.slice(inlineCount),
    overflowItems: items.slice(0, inlineCount),
  };
};
