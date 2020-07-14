import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FocusZone } from './FocusZone';

/* eslint-disable @typescript-eslint/no-explicit-any */
function _deepEquals(a: any, b: any) {
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    // NO SUPPORT FOR ARRAYS
    return false;
  }
  for (const key in a) {
    if (!_deepEquals(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

// HEADS UP: this test is intentionally in a separate file aside from the rest of FocusZone tests
// As it is testing ref counting on a global `window` object it would interfere with other FocusZone tests
// which use ReactTestUtils.renderIntoDocument() which renders FocusZone into a detached DOM node and never unmounts.
describe('FocusZone keydown event handler', () => {
  let host: HTMLElement;
  let keydownEventHandlers: {
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
  }[];

  beforeEach(() => {
    host = document.createElement('div');
    keydownEventHandlers = [];

    window.addEventListener = jest.fn((type, listener, options) => {
      if (type === 'keydown') {
        const eventListener = { listener, options };
        if (!keydownEventHandlers.some(item => _deepEquals(item, eventListener))) {
          keydownEventHandlers.push(eventListener);
        }
      }
    });

    window.removeEventListener = jest.fn((type, listener, options) => {
      if (type === 'keydown') {
        const eventListener = { listener, options };
        const index = keydownEventHandlers.findIndex(item => _deepEquals(item, eventListener));
        if (index >= 0) {
          keydownEventHandlers.splice(index, 1);
        }
      }
    });
  });

  it('is added on mount/removed on unmount', () => {
    ReactDOM.render(<FocusZone />, host);
    expect(keydownEventHandlers.length).toBe(1);

    ReactDOM.unmountComponentAtNode(host);
    expect(keydownEventHandlers.length).toBe(0);
  });

  it('is added only once for nested focus zones', () => {
    ReactDOM.render(
      <div>
        <FocusZone>
          <FocusZone />
        </FocusZone>
      </div>,
      host,
    );
    expect(keydownEventHandlers.length).toBe(1);

    ReactDOM.unmountComponentAtNode(host);
    expect(keydownEventHandlers.length).toBe(0);
  });

  it('is added only once for sibling focus zones', () => {
    ReactDOM.render(
      <div>
        <FocusZone />
        <FocusZone />
      </div>,
      host,
    );
    expect(keydownEventHandlers.length).toBe(1);

    ReactDOM.unmountComponentAtNode(host);
    expect(keydownEventHandlers.length).toBe(0);
  });
});
