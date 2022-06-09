import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import { SelectionZone } from './SelectionZone';
import { Selection } from './Selection';
import { SelectionMode } from './interfaces';
import { isConformant } from '../../common/isConformant';

import { KeyCodes, EventGroup } from '../../Utilities';
import type { IObjectWithKey } from './interfaces';

const SELECTABLE_ITEMS = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }];

let _selection: Selection;
let _selectionZone: any;
let _componentElement: Element;
let _toggleAll: Element;
let _surface0: Element;
let _invoke0: Element;
let _toggle0: Element;
let _surface1: Element;
let _toggle1: Element;
let _noSelect1: Element;
let _select1: Element;
let _toggle2: Element;
let _surface3: Element;
let _invoke4: Element;

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
  _selectionZone = ReactTestUtils.renderIntoDocument(
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

  _componentElement = ReactDOM.findDOMNode(_selectionZone) as Element;
  _toggleAll = _componentElement.querySelector('#toggleAll')!;
  _surface0 = _componentElement.querySelector('#surface0')!;
  _invoke0 = _componentElement.querySelector('#invoke0')!;
  _toggle0 = _componentElement.querySelector('#toggle0')!;
  _surface1 = _componentElement.querySelector('#surface1')!;
  _toggle1 = _componentElement.querySelector('#toggle1')!;
  _noSelect1 = _componentElement.querySelector('#noSelect1')!;
  _select1 = _componentElement.querySelector('#select1')!;
  _toggle2 = _componentElement.querySelector('#toggle2')!;
  _surface3 = _componentElement.querySelector('#surface3')!;
  _invoke4 = _componentElement.querySelector('#invoke4')!;

  _onItemInvokeCalled = 0;
  _lastItemInvoked = undefined;
}

describe('SelectionZone - disabled touch targets', () => {
  beforeEach(() => _initializeSelection());

  isConformant({
    Component: SelectionZone,
    displayName: 'SelectionZone',
    requiredProps: { selection: new Selection() },
    // Problem: Doesn’t pass ref to the root element.
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
    ReactTestUtils.Simulate.doubleClick(_toggle0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('does not toggle an item on mousedown of toggle element', () => {
    ReactTestUtils.Simulate.mouseDown(_toggle0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('selects an unselected item on mousedown of surface without modifiers pressed', () => {
    _selection.setAllSelected(true);
    _selection.setIndexSelected(0, false, true);

    // Mousedown on the only unselected item's invoke surface should deselect all and select that one.
    ReactTestUtils.Simulate.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_selection.getSelectedCount()).toEqual(1);
  });

  it('does nothing with mousedown of invoke when item is selected already', () => {
    // Mousedown on an item that's already selected should do nothing.
    _selection.setAllSelected(true);

    ReactTestUtils.Simulate.mouseDown(_invoke0);
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
    _selection.setIndexSelected(0, true, true);
    _simulateClick(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('selects an unselected item on mousedown of item surface element', () => {
    ReactTestUtils.Simulate.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
  });

  it('invokes an item on double clicking the surface element', () => {
    ReactTestUtils.Simulate.doubleClick(_surface0);
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
    ReactTestUtils.Simulate.keyDown(_componentElement, { ctrlKey: true, which: KeyCodes.a });
    expect(_selection.isAllSelected()).toEqual(true);
  });

  it('unselects all on escape', () => {
    _selection.setAllSelected(true);
    ReactTestUtils.Simulate.keyDown(_componentElement, { which: KeyCodes.escape });
    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('does not select item on focus', () => {
    ReactTestUtils.Simulate.focus(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('does not select an item on focus if ctrl/meta is pressed', () => {
    ReactTestUtils.Simulate.keyDown(_componentElement, { ctrlKey: true });
    ReactTestUtils.Simulate.focus(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('does not select an item on focus when ignoreNextFocus is called', () => {
    _selectionZone.ignoreNextFocus();
    ReactTestUtils.Simulate.focus(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('toggles an item when pressing space', () => {
    ReactTestUtils.Simulate.keyDown(_surface0, { which: KeyCodes.space });
    expect(_selection.isIndexSelected(0)).toEqual(true);
    ReactTestUtils.Simulate.keyDown(_surface0, { which: KeyCodes.space });
    expect(_selection.isIndexSelected(0)).toEqual(false);
  });

  it('does not select the row when clicking on a toggle within an invoke element', () => {
    ReactTestUtils.Simulate.mouseDown(_toggle2);
    expect(_selection.isIndexSelected(2)).toEqual(false);
  });

  it('can remove selection if you click on dead space', () => {
    _selection.setAllSelected(true);

    // Raise real browser event.
    document.documentElement.click();

    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('can remove selection after the first click event rebinding', () => {
    _selection.setAllSelected(true);

    _simulateClick(_toggle0);
    // Raise real browser event.
    document.documentElement.click();

    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('does not select an item on mousedown of the surface with no modifiers', () => {
    ReactTestUtils.Simulate.mouseDown(_invoke0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_onItemInvokeCalled).toEqual(0);
  });

  it('does not select an item when a button is clicked', () => {
    ReactTestUtils.Simulate.mouseDown(_noSelect1);
    expect(_selection.isIndexSelected(1)).toEqual(false);
  });

  it('selects an item when a button is clicked that has data-selection-select', () => {
    ReactTestUtils.Simulate.mouseDown(_select1);
    expect(_selection.isIndexSelected(1)).toEqual(true);
  });

  it('selects an item when a button is clicked that has data-selection-select', () => {
    ReactTestUtils.Simulate.keyDown(_select1, { which: KeyCodes.enter });
    expect(_selection.isIndexSelected(1)).toEqual(true);
  });

  it('enters modal selection state when commanded', () => {
    _selection.setModal(true);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');

    _selection.setModal(false);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toBeNull();
  });

  it('exits modal selection state when the last item is deselected', () => {
    _selection.setModal(true);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');

    _selection.setIndexSelected(1, true, false);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');

    _selection.setIndexSelected(1, false, false);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toBeNull();
  });

  it('preserves modal state when switching selection', () => {
    _selection.setModal(true);
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

    ReactTestUtils.Simulate.focus(_surface0);
    ReactTestUtils.Simulate.click(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(true);
    expect(_componentElement.getAttribute('data-selection-is-modal')).toEqual('true');
  });

  describe('does not invoke touch targets', () => {
    it('when touch target wraps generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      ReactTestUtils.Simulate.click(_surface1);
      expect(_onItemInvokeCalled).toEqual(0);
    });

    it('when touch target does not wrap generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      ReactTestUtils.Simulate.click(_invoke4);
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
      _selection.setAllSelected(true);
      ReactTestUtils.Simulate.keyDown(_componentElement, { which: KeyCodes.escape });
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
      ReactTestUtils.Simulate.keyDown(_surface0, { which: KeyCodes.space });
      expect(_selection.isIndexSelected(0)).toEqual(true);
      ReactTestUtils.Simulate.keyDown(_surface0, { which: KeyCodes.space });
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
    ReactTestUtils.Simulate.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).toEqual(false);
    expect(_selection.getSelectedCount()).toEqual(0);
  });

  it('still invokes on click', () => {
    _simulateClick(_invoke0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });

  it('still invokes on double-click', () => {
    ReactTestUtils.Simulate.doubleClick(_surface0);
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

    ReactTestUtils.Simulate.click(_invoke0);
    expect(_onItemInvokeCalled).toEqual(1);
    expect(_lastItemInvoked.key).toEqual('a');
  });

  describe('does not invoke touch targets when not using touch', () => {
    it('when touch target wraps generic target', () => {
      ReactTestUtils.Simulate.click(_surface1);
      expect(_onItemInvokeCalled).toEqual(0);
    });

    it('when touch target does not wrap generic target', () => {
      ReactTestUtils.Simulate.click(_invoke4);
      expect(_onItemInvokeCalled).toEqual(0);
    });
  });

  describe('does invoke touch targets', () => {
    it('when touch target wraps generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      ReactTestUtils.Simulate.click(_surface1);
      expect(_onItemInvokeCalled).toEqual(1);
      expect(_lastItemInvoked.key).toEqual('b');
    });

    it('when touch target does not wrap generic target', () => {
      EventGroup.raise(document.body, 'touchstart', {}, true);

      ReactTestUtils.Simulate.click(_invoke4);
      expect(_onItemInvokeCalled).toEqual(1);
      expect(_lastItemInvoked.key).toEqual('e');
    });
  });
});

function _simulateClick(el: Element, eventData?: ReactTestUtils.SyntheticEventData): void {
  ReactTestUtils.Simulate.mouseDown(el, eventData);
  ReactTestUtils.Simulate.focus(el, eventData);
  ReactTestUtils.Simulate.click(el, eventData);
}
