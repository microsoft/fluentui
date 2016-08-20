/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { assert } = chai;

import { SelectionZone, Selection, SelectionMode } from './index';

let _selection: Selection;
let _selectionZone;
let _componentElement: Element;
let _surface0: Element;
let _invoke0: Element;
let _toggle0: Element;
let _surface1: Element;
let _invoke1: Element;
let _toggle1: Element;
let _onItemInvokeCalled: number;
let _lastItemInvoked: any;

describe('SelectionZone', () => {
  beforeEach(() => {
    _selection = new Selection();
    _selection.setItems([ { key: 'a', }, { key: 'b' } ]);
    _selectionZone = ReactTestUtils.renderIntoDocument(
      <SelectionZone
        selection={ _selection }
        selectionMode={ SelectionMode.multiple }
        onItemInvoked={ (item) => { _onItemInvokeCalled++; _lastItemInvoked = item; }}>

        <div id='surface0' data-selection-index="0">
          <button id='toggle0' data-selection-toggle={ true }>Toggle</button>
          <button id='invoke0' data-selection-invoke={ true }>Invoke</button>
        </div>

        <div id='surface1' data-selection-index="1">
          <button id='toggle1' data-selection-toggle={ true }>Toggle</button>
          <button id='invoke1' data-selection-invoke={ true }>Invoke</button>
        </div>

      </SelectionZone>
    );
    _componentElement = ReactDOM.findDOMNode(_selectionZone);
    _surface0 = _componentElement.querySelector('#surface0');
    _invoke0 = _componentElement.querySelector('#invoke0');
    _toggle0 = _componentElement.querySelector('#toggle0');
    _surface1 = _componentElement.querySelector('#surface1');
    _invoke1 = _componentElement.querySelector('#invoke1');
    _toggle1 = _componentElement.querySelector('#toggle1');
    _onItemInvokeCalled = 0;
  });

  it('toggles an item on click of toggle element', () => {
    ReactTestUtils.Simulate.click(_toggle0);
    assert(_selection.isIndexSelected(0) === true, 'Index 0 not selected');
    ReactTestUtils.Simulate.click(_toggle0);
    assert(_selection.isIndexSelected(0) === false, 'Index 0 selected');
    assert(_onItemInvokeCalled === 0, 'onItemInvoked was called');
  });

  it('toggles an item on dblclick of toggle element', () => {
    ReactTestUtils.Simulate.doubleClick(_toggle0);
    assert(_selection.isIndexSelected(0) === false, 'Index 0 selected');
    assert(_onItemInvokeCalled === 0, 'onItemInvoked was called');
  });

  it('does not toggle an item on mousedown of toggle element', () => {
    ReactTestUtils.Simulate.mouseDown(_toggle0);
    assert(_selection.isIndexSelected(0) === false, 'Index 0 selected');
    assert(_onItemInvokeCalled === 0, 'onItemInvoked was called');
  });

  it('selects an item on mousedown of invoke element', () => {
    ReactTestUtils.Simulate.mouseDown(_invoke0);
    assert(_selection.isIndexSelected(0) === true, 'Index 0 not selected');
  });

  it('selects an item on mousedown of invoke element', () => {
    ReactTestUtils.Simulate.mouseDown(_invoke0);
    assert(_selection.isIndexSelected(0) === true, 'Index 0 not selected');
  });

  it('does not change selection for an item on click of invoke element', () => {
    ReactTestUtils.Simulate.click(_invoke0);
    assert(_selection.isIndexSelected(0) === false, 'Index 0 selected');
    assert(_onItemInvokeCalled === 1, 'onItemInvoked was not called 1 time');
  });

  it('selects an unselected item on click of item surface element', () => {
    ReactTestUtils.Simulate.click(_surface0);
    assert(_selection.isIndexSelected(0) === true, 'Index 0 not selected');
    assert(_onItemInvokeCalled === 0, 'onItemInvoked was called');
  });

  it('does not unselect a selected item on click of item surface element', () => {
    _selection.setIndexSelected(0, true, true);
    ReactTestUtils.Simulate.click(_surface0);
    assert(_selection.isIndexSelected(0) === true, 'Index 0 not selected');
    assert(_onItemInvokeCalled === 0, 'onItemInvoked was called');
  });

  it('does not select an unselected item on mousedown of item surface element', () => {
    ReactTestUtils.Simulate.mouseDown(_surface0);
    assert(_selection.isIndexSelected(0) === false, 'Index 0 selected ');
  });

  it('invokes an item on double clicking the surface element', () => {
    ReactTestUtils.Simulate.doubleClick(_surface0);
    assert(_onItemInvokeCalled === 1, 'Item was invoked');
    assert(_lastItemInvoked.key === 'a', 'Item invoked was not expected item');
  });

});
