import { Selection } from './Selection';
import { IObjectWithKey, SelectionMode } from './Selection.types';

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
      onSelectionChanged: onSelectionChanged,
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
});
