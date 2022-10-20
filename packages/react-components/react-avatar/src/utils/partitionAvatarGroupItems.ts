export type PartitionAvatarGroupItemsOptions<T> = {
  items: readonly T[];
  layout?: 'spread' | 'stack' | 'pie';
  maxInlineItems?: number;
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
 * @returns Two arrays split into inline items and overflow items based on maxInlineItems.
 */
export const partitionAvatarGroupItems = <T>(
  options: PartitionAvatarGroupItemsOptions<T>,
): PartitionAvatarGroupItems<T> => {
  const { items } = options;
  const isPie = options.layout === 'pie';

  if (isPie) {
    return {
      inlineItems: items.slice(0, 3),
      overflowItems: items.length > 0 ? items : undefined,
    };
  }

  const maxInlineItems = options.maxInlineItems ?? 5;
  const inlineCount = -(maxInlineItems - (items.length > maxInlineItems ? 1 : 0));
  const overflowItems = items.slice(0, inlineCount);

  return {
    inlineItems: items.slice(inlineCount),
    overflowItems: overflowItems.length > 0 ? overflowItems : undefined,
  };
};
