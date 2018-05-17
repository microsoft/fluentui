import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes, createRef } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../FocusZone';
import { FocusTrapZone } from './FocusTrapZone';

// rAF does not exist in node - let's mock it
window.requestAnimationFrame = (callback: FrameRequestCallback) => {
  const r = window.setTimeout(callback, 16);
  jest.runAllTimers();
  return r;
};
const animationFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));
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

  describe('Focusing the FTZ', () => {
    function setupTest(focusPreviouslyFocusedInnerElement: boolean) {
      const focusTrapZoneRef = createRef<FocusTrapZone>();
      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={ _onFocus }>
          <FocusTrapZone
            forceFocusInsideTrap={ false }
            focusPreviouslyFocusedInnerElement={ focusPreviouslyFocusedInnerElement }
            data-is-focusable={ true }
            ref={ focusTrapZoneRef }
          >
            <button className={ 'f' }>f</button>
            <FocusZone>
              <button className={ 'a' }>a</button>
              <button className={ 'b' }>b</button>
            </FocusZone>
          </FocusTrapZone>
          <button className={ 'z' }>z</button>
        </div>
      ) as HTMLElement;

      const focusTrapZone = ReactDOM.findDOMNode(focusTrapZoneRef.current!) as Element;
      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonZ = topLevelDiv.querySelector('.z') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonF, { clientRect: { top: 0, bottom: 10, left: 0, right: 10 } });
      setupElement(buttonA, { clientRect: { top: 10, bottom: 20, left: 0, right: 10 } });
      setupElement(buttonB, { clientRect: { top: 20, bottom: 30, left: 0, right: 10 } });
      setupElement(buttonZ, { clientRect: { top: 30, bottom: 40, left: 0, right: 10 } });

      return { focusTrapZone, buttonF, buttonA, buttonB, buttonZ };
    }

    it('goes to previously focused element when focusing the FTZ', async () => {
      expect.assertions(4);

      const { focusTrapZone, buttonF, buttonB, buttonZ } = setupTest(true /*focusPreviouslyFocusedInnerElement*/);

      // Manually focusing FTZ when FTZ has never
      // had focus within should go to 1st focusable inner element.
      ReactTestUtils.Simulate.focus(focusTrapZone);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonF);

      // Focus inside the trap zone, not the first element.
      ReactTestUtils.Simulate.focus(buttonB);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);

      // Focus outside the trap zone
      ReactTestUtils.Simulate.focus(buttonZ);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonZ);

      // Manually focusing FTZ should return to originally focused inner element.
      ReactTestUtils.Simulate.focus(focusTrapZone);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });

    it('goes to first focusable element when focusing the FTZ', async () => {
      expect.assertions(4);

      const { focusTrapZone, buttonF, buttonB, buttonZ } = setupTest(false /*focusPreviouslyFocusedInnerElement*/);

      // Manually focusing FTZ when FTZ has never
      // had focus within should go to 1st focusable inner element.
      ReactTestUtils.Simulate.focus(focusTrapZone);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonF);

      // Focus inside the trap zone, not the first element.
      ReactTestUtils.Simulate.focus(buttonB);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);

      // Focus outside the trap zone
      ReactTestUtils.Simulate.focus(buttonZ);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonZ);

      // Manually focusing FTZ should go to the first focusable element.
      ReactTestUtils.Simulate.focus(focusTrapZone);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonF);
    });
  });
});
