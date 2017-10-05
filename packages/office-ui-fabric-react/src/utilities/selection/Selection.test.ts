import { Selection } from './Selection';
import { IObjectWithKey } from './interfaces';

let setA = [{ key: 'a' }, { key: 'b' }, { key: 'c' }];
let setB = [{ key: 'a' }, { key: 'd' }, { key: 'b' }];

describe('Selection', () => {

  it('fires change events only when selection changes occur', () => {
    let changeCount = 0;
    let selection = new Selection({ onSelectionChanged: () => changeCount++ });

    selection.setItems(setA, false);
    expect(changeCount).toEqual(0);

    selection.setKeySelected('a', true, true);
    selection.setKeySelected('a', true, true);
    selection.setIndexSelected(0, true, true);
    expect(changeCount).toEqual(1);

    // Switch to set b, which also contains item a, in the same position. No change event should occur.
    selection.setItems(setB, false);
    expect(changeCount).toEqual(1);

    // Select b
    selection.setKeySelected('b', true, true);
    expect(changeCount).toEqual(2);

    // Change back to set a, which has item b in a different index.
    selection.setItems(setA, false);
    expect(changeCount).toEqual(3);

    // Change to set b, but clear it.
    selection.setItems(setB, true);
    expect(changeCount).toEqual(4);

    // Select an item in set b that doesn't exist in set a, then switch to set a.
    selection.setKeySelected('d', true, true);
    selection.setItems(setA, false);
    expect(changeCount).toEqual(6);

    // Select an item, clear, clear again.
    selection.setAllSelected(true);
    selection.setAllSelected(true);
    selection.setAllSelected(false);
    selection.setAllSelected(false);
    expect(changeCount).toEqual(8);

    selection.setIndexSelected(0, true, true);
    selection.selectToIndex(2, true);
    expect(changeCount).toEqual(10);
  });

  it('returns false on isAllSelected when no items are selectable', () => {
    let changeEvents = 0;
    let selection = new Selection({
      canSelectItem: (item: IObjectWithKey) => false,
      onSelectionChanged: () => changeEvents++
    });

    selection.setItems(setA);

    expect(selection.isAllSelected()).toEqual(false);

    selection.setAllSelected(true);

    expect(selection.isAllSelected()).toEqual(false);

    expect(changeEvents).toEqual(0);
  });

  it('resets unselectable count on setting new items', () => {
    let canSelect = false;
    let selection = new Selection({
      canSelectItem: (item: IObjectWithKey) => canSelect
    });

    selection.setItems(setA);
    expect(selection.isAllSelected()).toEqual(false);
    selection.setAllSelected(true);
    expect(selection.isAllSelected()).toEqual(false);

    canSelect = true;
    selection.setItems(setA);
    selection.setAllSelected(true);
    expect(selection.isAllSelected()).toEqual(true);
  });

});