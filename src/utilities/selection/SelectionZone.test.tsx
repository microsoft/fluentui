/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
let { expect } = chai;

import { SelectionZone, Selection, SelectionMode } from './index';
import { KeyCodes } from '../KeyCodes';

let _selection: Selection;
let _selectionZone: any;
let _componentElement: Element;
let _toggleAll: Element;
let _surface0: Element;
let _invoke0: Element;
let _toggle0: Element;
let _surface1: Element;
let _invoke1: Element;
let _toggle1: Element;
let _invoke2: Element;
let _toggle2: Element;
let _surface3: Element;

let _onItemInvokeCalled: number;
let _lastItemInvoked: any;

function _initializeSelection(selectionMode = SelectionMode.multiple) {
  _selection = new Selection();
  _selection.setItems([{ key: 'a', }, { key: 'b' }, { key: 'c' }, { key: 'd' }]);
  _selectionZone = ReactTestUtils.renderIntoDocument(
    <SelectionZone
      selection={ _selection }
      selectionMode={ selectionMode }
      onItemInvoked={ (item) => { _onItemInvokeCalled++; _lastItemInvoked = item; } }>

      <button id='toggleAll' data-selection-all-toggle={ true }>Toggle all selected</button>

      <div id='surface0' data-selection-index='0'>
        <button id='toggle0' data-selection-toggle={ true }>Toggle</button>
        <button id='invoke0' data-selection-invoke={ true }>Invoke</button>
      </div>

      <div id='surface1' data-selection-index='1'>
        <button id='toggle1' data-selection-toggle={ true }>Toggle</button>
        <button id='invoke1' data-selection-invoke={ true }>Invoke</button>
      </div>

      <div id='invoke2' data-selection-index='2' data-selection-invoke={ true }>
        <button id='toggle2' data-selection-toggle={ true }>Toggle</button>
      </div>

      <div id='surface3' data-selection-index='3'></div>

    </SelectionZone>
  );

  _componentElement = ReactDOM.findDOMNode(_selectionZone);
  _toggleAll = _componentElement.querySelector('#toggleAll');
  _surface0 = _componentElement.querySelector('#surface0');
  _invoke0 = _componentElement.querySelector('#invoke0');
  _toggle0 = _componentElement.querySelector('#toggle0');
  _surface1 = _componentElement.querySelector('#surface1');
  _invoke1 = _componentElement.querySelector('#invoke1');
  _toggle1 = _componentElement.querySelector('#toggle1');
  _invoke2 = _componentElement.querySelector('#invoke2');
  _toggle2 = _componentElement.querySelector('#toggle2');
  _surface3 =  _componentElement.querySelector('#surface3');

  _onItemInvokeCalled = 0;
  _lastItemInvoked = undefined;
}

describe('SelectionZone', () => {
  beforeEach(() => _initializeSelection());

  it('toggles an item on click of toggle element', () => {
    _simulateClick(_toggle0);
    expect(_selection.isIndexSelected(0)).equals(true, 'Index 0 not selected');
    _simulateClick(_toggle0);
    expect(_selection.isIndexSelected(0)).equals(false, 'Index 0 selected');
    expect(_onItemInvokeCalled).equals(0, 'onItemInvoked was called');
  });

  it('toggles an item on dblclick of toggle element', () => {
    ReactTestUtils.Simulate.doubleClick(_toggle0);
    expect(_selection.isIndexSelected(0)).equals(false, 'Index 0 selected');
    expect(_onItemInvokeCalled).equals(0, 'onItemInvoked was called');
  });

  it('does not toggle an item on mousedown of toggle element', () => {
    ReactTestUtils.Simulate.mouseDown(_toggle0);
    expect(_selection.isIndexSelected(0) === false, 'Index 0 selected');
    expect(_onItemInvokeCalled === 0, 'onItemInvoked was called');
  });

  it('selects an unselected item on mousedown of invoke without modifiers pressed', () => {
    _selection.setAllSelected(true);
    _selection.setIndexSelected(0, false, true);

    // Mousedown on the only unselected item's invoke surface should deselect all and select that one.
    ReactTestUtils.Simulate.mouseDown(_invoke0);
    expect(_selection.isIndexSelected(0)).equals(true, 'Index 0 not selected after mousedown');
    expect(_selection.getSelectedCount()).equals(1, 'Only 1 item should be selected');
  });

  it('does nothing with mousedown of invoke when item is selected already', () => {
    // Mousedown on an item that's already selected should do nothing.
    _selection.setAllSelected(true);
    ReactTestUtils.Simulate.mouseDown(_invoke0);
    expect(_selection.isAllSelected()).equals(true, 'Expecting all items to be selected');
  });

  it('calls the invoke callback on click of invoke area', () => {
    _simulateClick(_invoke0);
    expect(_onItemInvokeCalled === 1, 'onItemInvoked was not called 1 time after normal click');
  });

  it('selects an unselected item on click of item surface element', () => {
    _simulateClick(_surface0);
    expect(_selection.isIndexSelected(0)).equals(true, 'Index 0 not selected');
    expect(_onItemInvokeCalled).equals(0, 'onItemInvoked was called');
  });

  it('does not unselect a selected item on click of item surface element', () => {
    _selection.setIndexSelected(0, true, true);
    _simulateClick(_surface0);
    expect(_selection.isIndexSelected(0)).equals(true, 'Index 0 not selected');
    expect(_onItemInvokeCalled).equals(0, 'onItemInvoked was called');
  });

  it('does not select an unselected item on mousedown of item surface element', () => {
    ReactTestUtils.Simulate.mouseDown(_surface0);
    expect(_selection.isIndexSelected(0)).equals(false, 'Index 0 selected');
  });

  it('invokes an item on double clicking the surface element', () => {
    ReactTestUtils.Simulate.doubleClick(_surface0);
    expect(_onItemInvokeCalled).equals(1, 'Item was invoked');
    expect(_lastItemInvoked.key).equals('a', 'Item invoked was not expected item');
  });

  it('toggles all on toggle-all clicks', () => {
    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).equals(4, 'There were not 4 selected items');

    _simulateClick(_toggle1);
    expect(_selection.getSelectedCount()).equals(3, 'There were not 3 selected items after toggling index 1');

    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).equals(4, 'There were not 4 selected items after selecting all again');

    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).equals(0, 'There were not 0 selected items');
  });

  it('suports mouse shift click range select scenarios', () => {
    _simulateClick(_surface1);
    expect(_selection.getSelectedCount()).equals(1, 'Clicked surface 1');

    _simulateClick(_surface3, { shiftKey: true });
    expect(_selection.getSelectedCount()).equals(3, 'After clicking surface 1 and then shift clicking to surface 3');

    _simulateClick(_surface0, { shiftKey: true });
    expect(_selection.getSelectedCount()).equals(2, 'After shift clicking surface 0');
  });

  it('toggles by ctrl clicking a surface', () => {
    _simulateClick(_toggleAll);
    expect(_selection.getSelectedCount()).equals(4, 'There were not 4 selected items');

    _simulateClick(_surface1, {
      ctrlKey: true
    });
    expect(_selection.getSelectedCount()).equals(3, 'There were not 3 selected items');
  });

  it ('selects all on ctrl-a', () => {
    ReactTestUtils.Simulate.keyDown(_componentElement, { ctrlKey: true, which: KeyCodes.a });
    expect(_selection.isAllSelected()).equals(true, 'Expecting that all is selected aftr ctrl-a');
  });

  it('unselects all on escape', () => {
    _selection.setAllSelected(true);
    ReactTestUtils.Simulate.keyDown(_componentElement, { which: KeyCodes.escape });
    expect(_selection.getSelectedCount()).equals(0, 'Expecting that none is selected aftr escape');
  });

  it('selects item on focus', () => {
    ReactTestUtils.Simulate.focus(_surface0);
    expect(_selection.isIndexSelected(0)).equals(true, 'Item 0 was not selected');
  });

  it('does not select an item on focus if ctrl/meta is pressed', () => {
    ReactTestUtils.Simulate.keyDown(_componentElement, { ctrlKey: true });
    ReactTestUtils.Simulate.focus(_surface0);
    expect(_selection.isIndexSelected(0)).equals(false, 'Item 0 was selected on focus with modifier');
  });

  it('does not select an item on focus when ignoreNextFocus is called', () => {
    _selectionZone.ignoreNextFocus();
    ReactTestUtils.Simulate.focus(_surface0);
    expect(_selection.isIndexSelected(0)).equals(false, 'Item 0 was selected on ignored focus');
  });

  it('toggles an item when pressing space', () => {
    ReactTestUtils.Simulate.keyDown(_surface0, { which: KeyCodes.space });
    expect(_selection.isIndexSelected(0)).equals(true, 'Expecting index 0 to become selected');
    ReactTestUtils.Simulate.keyDown(_surface0, { which: KeyCodes.space });
    expect(_selection.isIndexSelected(0)).equals(false, 'Expecting index 0 to become unselected');
  });

  it('does not select the row when clicking on a toggle within an invoke element', () => {
    ReactTestUtils.Simulate.mouseDown(_toggle2);
    expect(_selection.isIndexSelected(2)).equals(false, 'Item 2 should have been unselected');
  });
});

function _simulateClick(el, eventData?: ReactTestUtils.SyntheticEventData) {
  ReactTestUtils.Simulate.mouseDown(el, eventData);
  ReactTestUtils.Simulate.focus(el, eventData);
  ReactTestUtils.Simulate.click(el, eventData);
}
