import { Selection } from './Selection';
import { SelectionMode } from './Selection.types';
import type { IObjectWithKey } from './Selection.types';

const setA = [{ key: 'a' }, { key: 'b' }, { key: 'c' }];
const setB = [{ key: 'a' }, { key: 'd' }, { key: 'b' }];

describe('Selection', () => {
  const onSelectionChanged = jest.fn();

  afterEach(() => {
    onSelectionChanged.mockClear();
  });

  it('initializes selected count', () => {
    const selection = new Selection();
    expect(selection.count).toBe(0);
  });

  it('can receive items', () => {
    const selection = new Selection({ onSelectionChanged, items: setA });

    expect(onSelectionChanged).toHaveBeenCalledTimes(0);

    selection.setKeySelected('a', true, true);
    selection.setKeySelected('a', true, true);
    selection.setIndexSelected(0, true, true);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);
  });

  it('fires change events only when selection changes occur', () => {
    const selection = new Selection({ onSelectionChanged });

    selection.setItems(setA, false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(0);

    selection.setKeySelected('a', true, true);
    selection.setKeySelected('a', true, true);
    selection.setIndexSelected(0, true, true);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    // Switch to set b, which also contains item a, in the same position. No change event should occur.
    selection.setItems(setB, false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    // Select b
    selection.setKeySelected('b', true, true);
    expect(onSelectionChanged).toHaveBeenCalledTimes(2);

    // Change back to set a, which has item b in a different index.
    selection.setItems(setA, false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(3);

    // Change to set b, but clear it.
    selection.setItems(setB, true);
    expect(onSelectionChanged).toHaveBeenCalledTimes(4);

    // Select an item in set b that doesn't exist in set a, then switch to set a.
    selection.setKeySelected('d', true, true);
    selection.setItems(setA, false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(6);

    // Select an item, clear, clear again.
    selection.setAllSelected(true);
    selection.setAllSelected(true);
    selection.setAllSelected(false);
    selection.setAllSelected(false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(8);

    selection.setIndexSelected(0, true, true);
    selection.selectToIndex(2, true);
    expect(onSelectionChanged).toHaveBeenCalledTimes(10);
  });

  it('returns false on isAllSelected when no items are selectable', () => {
    const selection = new Selection({
      canSelectItem: () => false,
      onSelectionChanged,
      items: setA,
    });

    expect(selection.isAllSelected()).toEqual(false);

    selection.setAllSelected(true);

    expect(selection.isAllSelected()).toEqual(false);

    expect(onSelectionChanged).toHaveBeenCalledTimes(0);
  });

  it('resets unselectable count on setting new items', () => {
    let canSelect = false;
    const selection = new Selection({
      canSelectItem: () => canSelect,
      items: setA,
    });

    expect(selection.isAllSelected()).toEqual(false);
    selection.setAllSelected(true);
    expect(selection.isAllSelected()).toEqual(false);

    canSelect = true;
    selection.setItems(setA);
    selection.setAllSelected(true);
    expect(selection.isAllSelected()).toEqual(true);
  });

  it('notifies consumers when all items are selected and some are removed', () => {
    const selection = new Selection({
      onSelectionChanged,
      items: setA,
    });

    selection.setAllSelected(true);

    expect(onSelectionChanged).toHaveBeenCalledTimes(1);
    expect(selection.getSelectedCount()).toEqual(3);

    selection.setItems([{ key: 'a' }, { key: 'b' }], false);

    expect(onSelectionChanged).toHaveBeenCalledTimes(2);
    expect(selection.getSelectedCount()).toEqual(2);

    selection.setItems([], false);

    expect(onSelectionChanged).toHaveBeenCalledTimes(3);
    expect(selection.getSelectedCount()).toEqual(0);
  });

  it('notifies consumers when some items are selected and some are removed', () => {
    const selection = new Selection({
      onSelectionChanged,
      items: setA,
    });

    selection.setIndexSelected(2, true, false);

    expect(onSelectionChanged).toHaveBeenCalledTimes(1);
    expect(selection.count).toEqual(1);

    selection.setItems([{ key: 'a' }, { key: 'b' }], false);

    expect(onSelectionChanged).toHaveBeenCalledTimes(2);
    expect(selection.count).toEqual(0);
  });

  it('allows custom item type', () => {
    interface ICustomItem {
      id: string;
    }
    const items: ICustomItem[] = [{ id: 'a' }, { id: 'b' }];
    const selection = new Selection<ICustomItem>({
      onSelectionChanged,
      getKey: (item: ICustomItem) => item.id,
      items,
    });

    selection.setKeySelected('a', true, true);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);
  });

  it('respects 0 as selected key', () => {
    const items: IObjectWithKey[] = [{ key: 1 }, { key: 0 }];
    const selection = new Selection({ items, selectionMode: SelectionMode.multiple });

    expect(selection.isKeySelected('0')).toBe(false);

    selection.setKeySelected('0', true, false);
    expect(selection.getSelectedIndices()).toEqual([1]);
    expect(selection.getSelection()).toEqual([{ key: 0 }]);
    expect(selection.isKeySelected('0')).toBe(true);
    expect(selection.isIndexSelected(1)).toBe(true);

    selection.toggleKeySelected('0');
    expect(selection.isKeySelected('0')).toBe(false);
    expect(selection.getSelection()).toEqual([]);

    selection.setIndexSelected(0, false, true); // hack to reset anchor
    selection.selectToKey('0');
    expect(selection.getSelectedIndices()).toEqual([0, 1]);
  });

  it('allows selection to be pre-initialized', () => {
    const items1: IObjectWithKey[] = [{ key: 'a' }, { key: 'b' }];

    // Add a callback to make sure an item always shows as selected if present.
    // The expectation is that the change to selection is merged with the existing update.
    const onItemsChanged = jest.fn(() => {
      selection.setKeySelected('b', true, false);
    });

    const selection = new Selection({
      items: [] as IObjectWithKey[],
      selectionMode: SelectionMode.multiple,
      onItemsChanged,
      onSelectionChanged,
    });

    expect(onSelectionChanged).toHaveBeenCalledTimes(0);
    expect(onItemsChanged).toHaveBeenCalledTimes(0);

    expect(selection.getSelection()).toEqual([]);

    selection.setItems(items1);

    expect(onItemsChanged).toHaveBeenCalledTimes(1);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    expect(selection.getSelection()).toEqual([{ key: 'b' }]);

    selection.setKeySelected('a', true, false);

    expect(onItemsChanged).toHaveBeenCalledTimes(1);
    expect(onSelectionChanged).toHaveBeenCalledTimes(2);

    expect(selection.getSelection()).toEqual([{ key: 'a' }, { key: 'b' }]);

    const items2: IObjectWithKey[] = [{ key: 'c' }, { key: 'd' }];

    // Change the set of items such that the 'selected' item is no longer present.
    selection.setItems(items2);

    expect(onItemsChanged).toHaveBeenCalledTimes(2);
    expect(onSelectionChanged).toHaveBeenCalledTimes(3);

    expect(selection.getSelection()).toEqual([]);

    selection.setItems(items1);

    expect(onItemsChanged).toHaveBeenCalledTimes(3);
    expect(onSelectionChanged).toHaveBeenCalledTimes(4);

    expect(selection.getSelection()).toEqual([{ key: 'b' }]);

    // Set an item as selected, then flip their order, within the same change event.
    selection.setChangeEvents(false);
    selection.setKeySelected('a', true, false);
    selection.setItems([{ key: 'b' }, { key: 'a' }], false);
    selection.setChangeEvents(true);

    expect(onItemsChanged).toHaveBeenCalledTimes(4);
    expect(onSelectionChanged).toHaveBeenCalledTimes(5);

    expect(selection.getSelection()).toEqual([{ key: 'b' }, { key: 'a' }]);
  });

  it('toggles range selection correctly when all items are selectable', () => {
    const items: IObjectWithKey[] = [{ key: 'a' }, { key: 'b' }, { key: 'c' }];
    const selection = new Selection({
      items,
      selectionMode: SelectionMode.multiple,
      onSelectionChanged,
    });

    // First toggle should select all items in range
    selection.toggleRangeSelected(0, 3);
    expect(selection.getSelectedIndices()).toEqual([0, 1, 2]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    // Second toggle should deselect all items in range
    selection.toggleRangeSelected(0, 3);
    expect(selection.getSelectedIndices()).toEqual([]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(2);
  });

  it('toggles range selection correctly when some items are not selectable', () => {
    const items: IObjectWithKey[] = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }];
    const selection = new Selection({
      items,
      selectionMode: SelectionMode.multiple,
      canSelectItem: item => item.key !== 'b', // Make 'b' unselectable
      onSelectionChanged,
    });

    // First toggle should select only selectable items (a, c, d)
    selection.toggleRangeSelected(0, 4);
    expect(selection.getSelectedIndices()).toEqual([0, 2, 3]);
    expect(selection.isIndexSelected(0)).toBe(true); // a - selected
    expect(selection.isIndexSelected(1)).toBe(false); // b - not selectable
    expect(selection.isIndexSelected(2)).toBe(true); // c - selected
    expect(selection.isIndexSelected(3)).toBe(true); // d - selected
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    // Second toggle should deselect all selectable items
    // This is the fix: it should work even with unselectable items in the range
    selection.toggleRangeSelected(0, 4);
    expect(selection.getSelectedIndices()).toEqual([]);
    expect(selection.isIndexSelected(0)).toBe(false);
    expect(selection.isIndexSelected(1)).toBe(false);
    expect(selection.isIndexSelected(2)).toBe(false);
    expect(selection.isIndexSelected(3)).toBe(false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(2);
  });

  it('toggles partial range selection correctly with unselectable items', () => {
    const items: IObjectWithKey[] = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }];
    const selection = new Selection({
      items,
      selectionMode: SelectionMode.multiple,
      canSelectItem: item => item.key !== 'c', // Make 'c' unselectable
      onSelectionChanged,
    });

    // Manually select only item 'a'
    selection.setKeySelected('a', true, false);
    expect(selection.getSelectedIndices()).toEqual([0]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    // Toggle range: since not all selectable items (a, b, d) are selected, it should select them
    selection.toggleRangeSelected(0, 4);
    expect(selection.getSelectedIndices()).toEqual([0, 1, 3]);
    expect(selection.isIndexSelected(2)).toBe(false); // c is not selectable
    expect(onSelectionChanged).toHaveBeenCalledTimes(2);

    // Toggle range again: all selectable items are selected, so deselect them
    selection.toggleRangeSelected(0, 4);
    expect(selection.getSelectedIndices()).toEqual([]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(3);
  });

  it('handles toggleRangeSelected with only unselectable items in range', () => {
    const items: IObjectWithKey[] = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }];
    const selection = new Selection({
      items,
      selectionMode: SelectionMode.multiple,
      canSelectItem: item => item.key !== 'b' && item.key !== 'c',
      onSelectionChanged,
    });

    // Toggle a range containing only unselectable items (b, c)
    selection.toggleRangeSelected(1, 2);
    expect(selection.getSelectedIndices()).toEqual([]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(0);

    // Toggle again - should still have no effect
    selection.toggleRangeSelected(1, 2);
    expect(selection.getSelectedIndices()).toEqual([]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(0);
  });

  it('handles grouped DetailsList scenario with unselectable item', () => {
    // This test simulates the exact bug scenario from the issue
    const items: IObjectWithKey[] = [
      { key: 'a1' }, // Group A - selectable
      { key: 'a2' }, // Group A - NOT selectable
      { key: 'b1' }, // Group B - selectable
      { key: 'b2' }, // Group B - selectable
    ];

    const selection = new Selection({
      items,
      selectionMode: SelectionMode.multiple,
      canSelectItem: item => item.key !== 'a2',
      onSelectionChanged,
    });

    // Simulate clicking Group A header checkbox (first time - select)
    selection.toggleRangeSelected(0, 2); // Group A has items at index 0-1
    expect(selection.getSelectedIndices()).toEqual([0]); // Only a1 selected
    expect(selection.isIndexSelected(0)).toBe(true); // a1
    expect(selection.isIndexSelected(1)).toBe(false); // a2 (unselectable)
    expect(onSelectionChanged).toHaveBeenCalledTimes(1);

    // Simulate clicking Group A header checkbox (second time - deselect)
    // THIS IS THE BUG FIX: this should now work correctly
    selection.toggleRangeSelected(0, 2);
    expect(selection.getSelectedIndices()).toEqual([]); // All deselected
    expect(selection.isIndexSelected(0)).toBe(false);
    expect(selection.isIndexSelected(1)).toBe(false);
    expect(onSelectionChanged).toHaveBeenCalledTimes(2);

    // Verify Group B works correctly (all items selectable)
    selection.toggleRangeSelected(2, 2);
    expect(selection.getSelectedIndices()).toEqual([2, 3]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(3);

    selection.toggleRangeSelected(2, 2);
    expect(selection.getSelectedIndices()).toEqual([]);
    expect(onSelectionChanged).toHaveBeenCalledTimes(4);
  });
});
