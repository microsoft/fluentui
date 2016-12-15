let { expect } = chai;

import { Selection, IObjectWithKey } from './index';

let setA = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ];
let setB = [ { key: 'a' }, { key: 'd' }, { key: 'b' } ];

describe('Selection', () => {

  it('fires change events only when selection changes occur', () => {
    let changeCount = 0;
    let selection = new Selection({ onSelectionChanged: () => changeCount++ });

    selection.setItems(setA, false);
    expect(changeCount).equals(0, 'after setting set a');

    selection.setKeySelected('a', true, true);
    selection.setKeySelected('a', true, true);
    selection.setIndexSelected(0, true, true);
    expect(changeCount).equals(1, 'after selecting item a');

    // Switch to set b, which also contains item a, in the same position. No change event should occur.
    selection.setItems(setB, false);
    expect(changeCount).equals(1, 'after switching to set b');

    // Select b
    selection.setKeySelected('b', true, true);
    expect(changeCount).equals(2, 'after selecting b');

    // Change back to set a, which has item b in a different index.
    selection.setItems(setA, false);
    expect(changeCount).equals(3, 'after changing back to set a');

    // Change to set b, but clear it.
    selection.setItems(setB, true);
    expect(changeCount).equals(4, 'after switching to set b and clearing');

    // Select an item in set b that doesn't exist in set a, then switch to set a.
    selection.setKeySelected('d', true, true);
    selection.setItems(setA, false);
    expect(changeCount).equals(6, 'after selecting c and switching to set a');

    // Select an item, clear, clear again.
    selection.setAllSelected(true);
    selection.setAllSelected(true);
    selection.setAllSelected(false);
    selection.setAllSelected(false);
    expect(changeCount).equals(8, 'after selecting all 2 times and clearing 2 times');

    selection.setIndexSelected(0, true, true);
    selection.selectToIndex(2, true);
    expect(changeCount).equals(10, 'after range selecting from 0 to 2');
  });

  it('returns false on isAllSelected when no items are selectable', () => {
    let changeEvents = 0;
    let selection = new Selection({
      canSelectItem: (item: IObjectWithKey) => false,
      onSelectionChanged: () => changeEvents++
    });

    selection.setItems(setA);

    expect(selection.isAllSelected()).to.equal(false, 'isAllSelected was not false after initialization');

    selection.setAllSelected(true);

    expect(selection.isAllSelected()).to.equal(false, 'isAllSelected was not false after trying to select all the unselectables');

    expect(changeEvents).to.equal(0, 'changeEvents were not 0');
  });

  it ('resets unselectable count on setting new items', () => {
    let canSelect = false;
    let selection = new Selection({
      canSelectItem: (item: IObjectWithKey) => canSelect
    });

    selection.setItems(setA);
    expect(selection.isAllSelected()).to.equal(false, 'isAllSelected was not false after initialization');
    selection.setAllSelected(true);
    expect(selection.isAllSelected()).to.equal(false, 'isAllSelected was not false after trying to select all the unselectables');

    canSelect = true;
    selection.setItems(setA);
    selection.setAllSelected(true);
    expect(selection.isAllSelected()).to.equal(true, 'isAllSelected was not false after trying to select all the unselectables');
  });

});