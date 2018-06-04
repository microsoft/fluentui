import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes } from '../../Utilities';

import { FocusZone, FocusZoneDirection } from '../FocusZone';
import { FocusTrapZone } from './FocusTrapZone';

// rAF does not exist in node - let's mock it
window.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return window.setTimeout(callback, 16);
};

jest.useFakeTimers();

describe('FocusTrapZone', () => {
  let lastFocusedElement: HTMLElement | undefined;
  function _onFocus(ev: any): void {
    lastFocusedElement = ev.target;
  }

  function setupElement(element: HTMLElement, {
    clientRect,
    isVisible = true
  }: {
      clientRect: {
        top: number;
        left: number;
        bottom: number;
        right: number;
      };
      isVisible?: boolean;
    }): void {
    element.getBoundingClientRect = () => ({
      top: clientRect.top,
      left: clientRect.left,
      bottom: clientRect.bottom,
      right: clientRect.right,
      width: clientRect.right - clientRect.left,
      height: clientRect.bottom - clientRect.top
    });

    element.setAttribute('data-is-visible', String(isVisible));

    element.focus = () => ReactTestUtils.Simulate.focus(element);
  }

  beforeEach(() => {
    lastFocusedElement = undefined;
  });

  it('can tab across FocusZones with different button structures', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusTrapZone forceFocusInsideTrap={ false }>
          <FocusZone direction={ FocusZoneDirection.horizontal } data-is-visible={ true }>
            <div data-is-visible={ true }>
              <button className='a'>a</button>
            </div>
            <div data-is-visible={ true }>
              <button className='b'>b</button>
            </div>
            <div data-is-visible={ true }>
              <button className='c'>c</button>
            </div>
          </FocusZone>
          <FocusZone direction={ FocusZoneDirection.horizontal } data-is-visible={ true }>
            <div data-is-visible={ true }>
              <div data-is-visible={ true }>
                <button className='d'>d</button>
                <button className='e'>e</button>
                <button className='f'>f</button>
              </div>
            </div>
          </FocusZone>
        </FocusTrapZone>
      </div>
    );

    const focusTrapZone = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;

    const buttonA = focusTrapZone.querySelector('.a') as HTMLElement;
    const buttonB = focusTrapZone.querySelector('.b') as HTMLElement;
    const buttonC = focusTrapZone.querySelector('.c') as HTMLElement;
    const buttonD = focusTrapZone.querySelector('.d') as HTMLElement;
    const buttonE = focusTrapZone.querySelector('.e') as HTMLElement;
    const buttonF = focusTrapZone.querySelector('.f') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 30
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 30,
        right: 60
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 60,
        right: 90
      }
    });

    setupElement(buttonD, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 0,
        right: 30
      }
    });

    setupElement(buttonE, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 30,
        right: 60
      }
    });

    setupElement(buttonF, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 60,
        right: 90
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    window.requestAnimationFrame(() => {
      expect(lastFocusedElement).toBe(buttonA);

      // Pressing shift + tab should go to d.
      ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.tab, shiftKey: true });
      window.requestAnimationFrame(() => {
        expect(lastFocusedElement).toBe(buttonD);

        // Pressing tab should go to a.
        ReactTestUtils.Simulate.keyDown(buttonD, { which: KeyCodes.tab });
        window.requestAnimationFrame(() => {
          expect(lastFocusedElement).toBe(buttonA);
        });
      });
    });

    jest.runAllTimers();
  });

  it('can tab across a FocusZone with different button structures', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusTrapZone forceFocusInsideTrap={ false }>
          <div data-is-visible={ true }>
            <button className='x'>x</button>
          </div>
          <FocusZone direction={ FocusZoneDirection.horizontal } data-is-visible={ true }>
            <div data-is-visible={ true }>
              <button className='a'>a</button>
            </div>
            <div data-is-visible={ true }>
              <div data-is-visible={ true }>
                <button className='b'>b</button>
                <button className='c'>c</button>
                <button className='d'>d</button>
              </div>
            </div>
          </FocusZone>
        </FocusTrapZone>
      </div>
    );

    const focusTrapZone = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;

    const buttonX = focusTrapZone.querySelector('.x') as HTMLElement;
    const buttonA = focusTrapZone.querySelector('.a') as HTMLElement;
    const buttonB = focusTrapZone.querySelector('.b') as HTMLElement;
    const buttonC = focusTrapZone.querySelector('.c') as HTMLElement;
    const buttonD = focusTrapZone.querySelector('.d') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonX, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 30
      }
    });

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 30
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 30,
        right: 60
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 60,
        right: 90
      }
    });

    setupElement(buttonD, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 0,
        right: 30
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonX);
    window.requestAnimationFrame(() => {
      expect(lastFocusedElement).toBe(buttonX);

      // Pressing shift + tab should go to a.
      ReactTestUtils.Simulate.keyDown(buttonX, { which: KeyCodes.tab, shiftKey: true });
      window.requestAnimationFrame(() => {
        expect(lastFocusedElement).toBe(buttonA);

        // Pressing tab should go to x.
        ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.tab });
        window.requestAnimationFrame(() => {
          expect(lastFocusedElement).toBe(buttonX);
        });
      });
    });

    jest.runAllTimers();
  });
});
