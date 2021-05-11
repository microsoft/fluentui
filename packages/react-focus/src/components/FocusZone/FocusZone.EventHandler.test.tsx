import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FocusZone } from './FocusZone';

type EventHandler = {
  listener: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
};

function optionsEqual(
  a: boolean | AddEventListenerOptions | undefined,
  b: boolean | AddEventListenerOptions | undefined,
) {
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }

  return a.once === b.once && a.passive === b.passive && a.capture === b.capture;
}

function handlersEqual(a: EventHandler, b: EventHandler) {
  return a.listener === b.listener && optionsEqual(a.options, b.options);
}

// HEADS UP: this test is intentionally in a separate file aside from the rest of FocusZone tests
// As it is testing ref counting on a global `window` object it would interfere with other FocusZone tests
// which use ReactTestUtils.renderIntoDocument() which renders FocusZone into a detached DOM node and never unmounts.
describe('FocusZone keydown event handler', () => {
  let host: HTMLElement;
  let keydownEventHandlers: EventHandler[];

  beforeEach(() => {
    host = document.createElement('div');
    keydownEventHandlers = [];

    window.addEventListener = jest.fn((type, listener, options) => {
      if (type === 'keydown') {
        const eventListener = { listener, options };
        if (!keydownEventHandlers.some(item => handlersEqual(item, eventListener))) {
          keydownEventHandlers.push(eventListener);
        }
      }
    });

    window.removeEventListener = jest.fn((type, listener, options) => {
      if (type === 'keydown') {
        const eventListener = { listener, options };
        const index = keydownEventHandlers.findIndex(item => handlersEqual(item, eventListener));
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
