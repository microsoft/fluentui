import { FocusZone, AutoFocusZone } from '@fluentui/react-bindings';
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';

const animationFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));
const originalRAF = window.requestAnimationFrame;

describe('AutoFocusZone', () => {
  let lastFocusedElement: HTMLElement | undefined;

  const _onFocus = (ev: any): void => (lastFocusedElement = ev.target);

  const setupElement = (
    element: HTMLElement,
    {
      clientRect,
      isVisible = true,
    }: {
      clientRect: {
        top: number;
        left: number;
        bottom: number;
        right: number;
      };
      isVisible?: boolean;
    },
  ): void => {
    // @ts-ignore
    element.getBoundingClientRect = () => ({
      top: clientRect.top,
      left: clientRect.left,
      bottom: clientRect.bottom,
      right: clientRect.right,
      width: clientRect.right - clientRect.left,
      height: clientRect.bottom - clientRect.top,
    });

    element.setAttribute('data-is-visible', String(isVisible));
    element.focus = () => ReactTestUtils.Simulate.focus(element);
  };

  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'requestAnimationFrame', {
      writable: true,
      value: (callback: FrameRequestCallback) => callback(0),
    });
    lastFocusedElement = undefined;
  });
  afterEach(() => {
    jest.useRealTimers();
    window.requestAnimationFrame = originalRAF;
  });

  describe('Focusing the ATZ', () => {
    function setupTest(firstFocusableSelector?: string) {
      let autoFocusZoneRef: AutoFocusZone | null = null;
      const topLevelDiv = ReactTestUtils.renderIntoDocument<{}>(
        <div onFocusCapture={_onFocus}>
          <AutoFocusZone
            data-is-focusable={true}
            firstFocusableSelector={firstFocusableSelector}
            ref={ftz => {
              autoFocusZoneRef = ftz;
            }}
          >
            <button className={'f'}>f</button>
            <FocusZone>
              <button className={'a'}>a</button>
              <button className={'b'}>b</button>
            </FocusZone>
          </AutoFocusZone>
          <button className={'z'}>z</button>
        </div>,
      ) as HTMLElement;

      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonZ = topLevelDiv.querySelector('.z') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonF, { clientRect: { top: 0, bottom: 10, left: 0, right: 10 } });
      setupElement(buttonA, { clientRect: { top: 10, bottom: 20, left: 0, right: 10 } });
      setupElement(buttonB, { clientRect: { top: 20, bottom: 30, left: 0, right: 10 } });
      setupElement(buttonZ, { clientRect: { top: 30, bottom: 40, left: 0, right: 10 } });

      return { autoFocusZone: autoFocusZoneRef, buttonF, buttonA, buttonB, buttonZ };
    }

    it('goes to first focusable element when focusing the ATZ', async () => {
      expect.assertions(1);

      const { autoFocusZone, buttonF } = setupTest();

      // By calling `componentDidMount`, AFZ will behave as just initialized and focus needed element
      // Focus within should go to 1st focusable inner element.
      // @ts-ignore
      autoFocusZone.componentDidMount();
      await animationFrame();

      expect(lastFocusedElement).toBe(buttonF);
    });

    it('goes to the element with containing the firstFocusableSelector if provided when focusing the ATZ', async () => {
      expect.assertions(1);
      const { autoFocusZone, buttonB } = setupTest('.b');

      // By calling `componentDidMount`, AFZ will behave as just initialized and focus needed element
      // Focus within should go to the element containing the selector.
      // @ts-ignore
      autoFocusZone.componentDidMount();
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });
  });
});
