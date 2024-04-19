import { partitionAvatarGroupItems } from './partitionAvatarGroupItems';

describe('partitionAvatarGroupItems', () => {
  it('makes space for the overflow indicator when there is overflow when using the spread and stack layout', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items });

    expect(inlineItems).toEqual([6, 7, 8, 9]);
    expect(overflowItems).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('provides all the items to the overflow array when using the pie layout', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items, layout: 'pie' });

    expect(inlineItems).toEqual([0, 1, 2]);
    expect(overflowItems).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('partitions the items in the correct order for the spread and stack layout', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items });

    expect(inlineItems).toEqual([6, 7, 8, 9]);
    expect(overflowItems).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('partitions the items in the correct order for the pie layout', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items, layout: 'pie' });

    expect(inlineItems).toEqual([0, 1, 2]);
    expect(overflowItems).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('partitions the items correctly when there is no overflow when using the spread and stack layout', () => {
    const items = [0, 1, 2];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items });

    expect(inlineItems).toEqual([0, 1, 2]);
    expect(overflowItems).toBeUndefined();
  });

  it('partitions the items correctly when there is no overflow when using the pie layout', () => {
    const items = [0, 1];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items, layout: 'pie' });

    expect(inlineItems).toEqual([0, 1]);
    expect(overflowItems).toEqual([0, 1]);
  });

  it('ignores maxInlineItems when using the pie layout', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items, layout: 'pie', maxInlineItems: 10 });

    expect(inlineItems).toEqual([0, 1, 2]);
    expect(overflowItems).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('respects maxInlineItems when using the spread and stack layout', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items, maxInlineItems: 8 });

    expect(inlineItems).toEqual([3, 4, 5, 6, 7, 8, 9]);
    expect(overflowItems).toEqual([0, 1, 2]);
  });
});
