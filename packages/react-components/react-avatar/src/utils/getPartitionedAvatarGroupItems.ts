/**
 * Get the inline items and overflowing items based on the array of AvatarGroupItems needed for AvatarGroup.
 *
 * @param items - Array of AvatarGroupItems
 * @param maxItems - Maximum number of items to show inline
 *
 * @returns Two arrays of AvatarGroupItems splitted between the inline items and the overflowing items
 * based on maxItems.
 *
 * NOTE: Each item in the array must be a single AvatarGroupItem. If an item in the array contains a fragment with
 * two avatars, the items will not be partitioned correctly.
 */
export const getPartitionedAvatarGroupItems = (items: JSX.Element[], maxItems = 5) => {
  // When there are more items than maxItems, we need to subtract one to make space for the overflow indicator.
  const numOfInlineItems = items.length > maxItems ? maxItems - 1 : maxItems;

  const inlineItems = items.slice(-numOfInlineItems);
  const overflowItems = items.slice(0, -numOfInlineItems);

  return { inlineItems, overflowItems };
};
