import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { SelectionZone } from './SelectionZone';
import { Selection } from './Selection';
import { SelectionMode } from './interfaces';
import { isConformant } from '../../common/isConformant';

import { KeyCodes, EventGroup } from '../../Utilities';
import type { IObjectWithKey } from './interfaces';

const SELECTABLE_ITEMS = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }];

let _selection: Selection;
let _selectionZone: any;
let _componentElement: HTMLElement;
let _toggleAll: HTMLElement;
let _surface0: HTMLElement;
let _invoke0: HTMLElement;
let _toggle0: HTMLElement;
let _surface1: HTMLElement;
let _toggle1: HTMLElement;
let _noSelect1: HTMLElement;
let _select1: HTMLElement;
let _toggle2: HTMLElement;
let _surface3: HTMLElement;
let _invoke4: HTMLElement;

let _onItemInvokeCalled: number;
let _lastItemInvoked: any;

function _initializeSelection(props?: {
  selectionMode?: SelectionMode;
  enableTouchInvocationTarget?: boolean;
  selectionClearedOnEscapePress?: boolean;
  toggleWithoutModifierPressed?: boolean;
}): void {
  const {
    selectionMode = SelectionMode.multiple,
    enableTouchInvocationTarget = false,
    selectionClearedOnEscapePress = true,
    toggleWithoutModifierPressed = false,
  } = props || {};

  _selection = new Selection();
  _selection.setItems(SELECTABLE_ITEMS);
  _onItemInvokeCalled = 0;
  _lastItemInvoked = undefined;

  const { container } = render(
    <SelectionZone
      selection={_selection}
      selectionMode={selectionMode}
      selectionClearedOnEscapePress={selectionClearedOnEscapePress}
      toggleWithoutModifierPressed={toggleWithoutModifierPressed}
      disableAutoSelectOnInputElements={true}
      enterModalOnTouch={true}
      enableTouchInvocationTarget={enableTouchInvocationTarget}
      onItemInvoked={(item: IObjectWithKey) => {
        _onItemInvokeCalled++;
        _lastItemInvoked = item;
      }}
      // @ts-expect-error - wrong componentRef type definition
      componentRef={ref => {
        _selectionZone = ref;
        return;
      }}
    >
      <button id="toggleAll" data-selection-all-toggle={true}>
        Toggle all selected
      </button>

      <div id="surface0" data-selection-index="0">
        <button id="toggle0" data-selection-toggle={true}>
          Toggle
        </button>
        <button id="invoke0" data-selection-invoke={true}>
          Invoke
        </button>
      </div>

      <div id="surface1" data-selection-index="1" data-selection-touch-invoke={true}>
        <button id="toggle1" data-selection-toggle={true}>
          Toggle
        </button>
        <button id="invoke1" data-selection-invoke={true}>
          Invoke
        </button>
        <button id="noSelect1">No Select</button>
        <button id="select1" data-selection-select={true}>
          Select First
        </button>
      </div>

      <div id="invoke2" data-selection-index="2" data-selection-invoke={true}>
        <button id="toggle2" data-selection-toggle={true}>
          Toggle
        </button>
      </div>

      <div id="surface3" data-selection-index="3" />

      <div id="invoke4" data-selection-index="4" data-selection-touch-invoke={true}>
        Touch Invoke
      </div>
    </SelectionZone>,
  );

  _componentElement = container.firstChild as HTMLElement;
  _toggleAll = container.querySelector('#toggleAll') as HTMLElement;
  _surface0 = container.querySelector('#surface0') as HTMLElement;
  _invoke0 = container.querySelector('#invoke0') as HTMLElement;
  _toggle0 = container.querySelector('#toggle0') as HTMLElement;
  _surface1 = container.querySelector('#surface1') as HTMLElement;
  _toggle1 = container.querySelector('#toggle1') as HTMLElement;
  _noSelect1 = container.querySelector('#noSelect1') as HTMLElement;
  _select1 = container.querySelector('#select1') as HTMLElement;
  _toggle2 = container.querySelector('#toggle2') as HTMLElement;
  _surface3 = container.querySelector('#surface3') as HTMLElement;
  _invoke4 = container.querySelector('#invoke4') as HTMLElement;
}

// Helper function to simulate click events
function _simulateClick(el: HTMLElement, eventData?: Record<string, boolean>): void {
  fireEvent.mouseDown(el, eventData);
  fireEvent.focus(el, eventData);
  fireEvent.click(el, eventData);
}

describe('SelectionZone - disabled touch targets', () => {
  beforeEach(() => _initializeSelection());

  isConformant({
    Component: SelectionZone,
    displayName: 'SelectionZone',
    requiredProps: { selection: new Selection() },
    // Problem: Doesn't pass ref to the root element.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: [
      'component-has-root-ref',
      'component-handles-ref',
      'has-top-level-file',
      'component-handles-classname',
    ],
  });

  it('toggles an item on click of toggle element', () => {
    _simulateClick(_toggle0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    _simulateClick(_toggle0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('toggles an item on dblclick of toggle element', () => {
    fireEvent.doubleClick(_toggle0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('does not toggle an item on mousedown of toggle element', () => {
    fireEvent.mouseDown(_toggle0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('selects an unselected item on mousedown of surface without modifiers pressed', () => {
    act(() => {
      _selection.setAllSelected(true);
      _selection.setIndexSelected(0, false, true);
    });

    // Mousedown on the only unselected item's invoke surface should deselect all and select that one.
    fireEvent.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_selection.getSelectedCount()).toEqual(1);
  });

  it('does nothing with mousedown of invoke when item is selected already', () => {
    act(() => {
      // Mousedown on an item that's already selected should do nothing.
      _selection.setAllSelected(true);
    });

    fireEvent.mouseDown(_invoke0);
    expect(_selection.isAllSelected()).toEqual(true);
  });

  it('calls the invoke callback on click of invoke area', () => {
    _simulateClick(_invoke0);
    expect(_onItemInvokeCalled).toEqual(1);
  });

  it('selects an unselected item on click of item surface element', () => {
    _simulateClick(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('does not unselect a selected item on click of item surface element', () => {
    act(() => {
      _selection.setIndexSelected(0, true, true);
    });
    _simulateClick(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('selects an unselected item on mousedown of item surface element', () => {
    fireEvent.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
  });

  it('invokes an item on double clicking the surface element', () => {
    fireEvent.doubleClick(_surface0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });

  it('toggles all on toggle-all clicks', () => {
    const selectableItemsCount = SELECTABLE_ITEMS.length;

    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).toEqual(selectableItemsCount);

    _simulateClick(_toggle1);
    expect(_selection.getSelectedCount()).toEqual(selectableItemsCount - 1);

    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).toEqual(selectableItemsCount);

    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('supports mouse shift click range select scenarios', () => {
    _simulateClick(_surface1);
    expect(_selection.getSelectedCount()).toEqual(1);

    _simulateClick(_surface3, { shiftKey: true });
    expect(_selection.getSelectedCount()).toEqual(3);

    _simulateClick(_surface0, { shiftKey: true });
    expect(_selection.getSelectedCount()).toEqual(2);
  });

  it('toggles by ctrl clicking a surface', () => {
    const selectableItemsCount = SELECTABLE_ITEMS.length;

    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).toEqual(selectableItemsCount);

    _simulateClick(_surface1, {
      ctrlKey: true,
    });
    expect(_selection.getSelectedCount()).toEqual(selectableItemsCount - 1);
  });

  it('selects all on ctrl-a', () => {
    // Use both which and key for better compatibility
    fireEvent.keyDown(_componentElement, { ctrlKey: true, which: KeyCodes.a, key: 'a', keyCode: KeyCodes.a });
    expect(_selection.isAllSelected()).toEqual(true);
  });

  it('unselects all on escape', () => {
    act(() => {
      _selection.setAllSelected(true);
    });
    // Use both which and key for better compatibility
    fireEvent.keyDown(_componentElement, { which: KeyCodes.escape, key: 'Escape', keyCode: KeyCodes.escape });
    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('does not select item on focus', () => {
    fireEvent.focus(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('does not select an item on focus if ctrl/meta is pressed', () => {
    fireEvent.keyDown(_componentElement, { ctrlKey: true });
    fireEvent.focus(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('does not select an item on focus when ignoreNextFocus is called', () => {
    _selectionZone.ignoreNextFocus();
    fireEvent.focus(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('toggles an item when pressing space', () => {
    // Use both which and key for better compatibility
    fireEvent.keyDown(_surface0, { which: KeyCodes.space, key: ' ', keyCode: KeyCodes.space });
    expect(_selection.isIndexSelected(0)).toEqual(true);
    fireEvent.keyDown(_surface0, { which: KeyCodes.space, key: ' ', keyCode: KeyCodes.space });
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('does not select the row when clicking on a toggle within an invoke element', () => {
    fireEvent.mouseDown(_toggle2);
    expect(_selection.isIndexSelected(2)).toEqual(false);
  });

  it('can remove selection if you click on dead space', () => {
    act(() => {
      _selection.setAllSelected(true);
    });

    // Raise real browser event.
    act(() => {
      document.documentElement.click();
    });

    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('can remove selection after the first click event rebinding', () => {
    act(() => {
      _selection.setAllSelected(true);
    });

    _simulateClick(_toggle0);
    // Raise real browser event.
    act(() => {
      document.documentElement.click();
    });

    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('does not select an item on mousedown of the surface with no modifiers', () => {
    fireEvent.mouseDown(_invoke0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('does not select an item when a button is clicked', () => {
    fireEvent.mouseDown(_noSelect1);
    expect(_selection.isIndexSelected(1)).toEqual(false);
  });

  it('selects an item when a button is clicked that has data-selection-select', () => {
    fireEvent.mouseDown(_select1);
    expect(_selection.isIndexSelected(1)).toEqual(true);
  });

  it('selects an item when a button is clicked that has data-selection-select', () => {
    fireEvent.keyDown(_select1, { which: KeyCodes.enter });
    expect(_selection.isIndexSelected(1)).toEqual(true);
  });

  it('enters modal selection state when commanded', () => {
    act(() => {
      _selection.setModal(true);
    });
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');
    act(() => {
      _selection.setModal(false);
    });
    expect(_componentElement.getAttribute('data-selection-is-modal')).toBeNull();
  });

  it('exits modal selection state when the last item is deselected', () => {
    act(() => {
      _selection.setModal(true);
    });
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');

    act(() => {
      _selection.setIndexSelected(1, true, false);
    });
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');
    act(() => {
      _selection.setIndexSelected(1, false, false);
    });
    expect(_componentElement.getAttribute('data-selection-is-modal')).toBeNull();
  });

  it('preserves modal state when switching selection', () => {
    act(() => {
      _selection.setModal(true);
    });
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');

    _simulateClick(_surface0);
    expect(_selection.getSelectedIndices()).toEqual([0]);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');

    _simulateClick(_surface1);
    expect(_selection.getSelectedIndices()).toEqual([1]);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');
  });

  it('enters modal selection state on a touch event', () => {
    EventGroup.raise(document.body, 'touchstart', {}, true);

    fireEvent.focus(_surface0);
    fireEvent.click(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');
  });

  describe('does not invoke touch targets', () => {
    it('when touch target wraps generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      fireEvent.click(_surface1);
      expect(_onItemInvokeCalled).toEqual(0);
    });

    it('when touch target does not wrap generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      fireEvent.click(_invoke4);
      expect(_onItemInvokeCalled).toEqual(0);
    });
  });
});

describe('SelectionZone - override default keyboard behavior', () => {
  describe('escape key', () => {
    beforeEach(() => {
      _initializeSelection({
        selectionClearedOnEscapePress: false,
      });
    });

    it('does not unselect all on escape when selectionClearedOnEscapePress is false', () => {
      act(() => {
        _selection.setAllSelected(true);
      });
      fireEvent.keyDown(_componentElement, { which: KeyCodes.escape });
      expect(_selection.getSelectedCount()).toEqual(5);
    });
  });

  describe('toggle modifier', () => {
    beforeEach(() => {
      _initializeSelection({
        toggleWithoutModifierPressed: true,
      });
    });

    it('toggles value when pressing space key without a modifier key', () => {
      // Using a more complete keyboard event simulation
      fireEvent.keyDown(_surface0, { which: KeyCodes.space, key: ' ', keyCode: KeyCodes.space });
      expect(_selection.isIndexSelected(0)).toEqual(true);
      fireEvent.keyDown(_surface0, { which: KeyCodes.space, key: ' ', keyCode: KeyCodes.space });
      expect(_selection.isIndexSelected(0)).toEqual(false);
    });
  });
});

describe('SelectionZone - SelectionMode.none', () => {
  beforeEach(() =>
    _initializeSelection({
      selectionMode: SelectionMode.none,
    }),
  );

  it('does not select an item when selection mode is SelectionMode.none', () => {
    fireEvent.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('still invokes on click', () => {
    _simulateClick(_invoke0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });

  it('still invokes on double-click', () => {
    fireEvent.doubleClick(_surface0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });
});

describe('SelectionZone - enabled touch targets', () => {
  beforeEach(() =>
    _initializeSelection({
      enableTouchInvocationTarget: true,
    }),
  );

  it('still invokes generic targets on non-touch click', () => {
    _simulateClick(_invoke0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });

  it('invokes generic targets on touch click', () => {
    EventGroup.raise(document.body, 'touchstart', {}, true);

    fireEvent.click(_invoke0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });

  describe('does not invoke touch targets when not using touch', () => {
    it('when touch target wraps generic target', () => {
      fireEvent.click(_surface1);
      expect(_onItemInvokeCalled).toEqual(0);
    });

    it('when touch target does not wrap generic target', () => {
      fireEvent.click(_invoke4);
      expect(_onItemInvokeCalled).toEqual(0);
    });
  });

  describe('does invoke touch targets', () => {
    it('when touch target wraps generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      fireEvent.click(_surface1);
      expect(_onItemInvokeCalled).toEqual(1);
      expect(_lastItemInvoked.key).toEqual('b');
    });

    it('when touch target does not wrap generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      fireEvent.click(_invoke4);
      expect(_onItemInvokeCalled).toEqual(1);
      expect(_lastItemInvoked.key).toEqual('e');
    });
  });
});
