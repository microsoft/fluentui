import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { FocusTrapZone } from './FocusTrapZone';
import { IFocusTrapZoneProps } from './FocusTrapZone.types';
import { safeMount } from '@fluentui/test-utilities';
import { isConformant } from '../../common/isConformant';

// rAF does not exist in node - let's mock it
window.requestAnimationFrame = (callback: FrameRequestCallback) => {
  const r = window.setTimeout(callback, 0);
  ReactTestUtils.act(() => {
    jest.runAllTimers();
  });
  return r;
};

ReactTestUtils.act(() => {
  jest.useFakeTimers();
});

class FocusTrapZoneTestComponent extends React.Component<
  {},
  {
    isShowingFirst: boolean;
    isShowingSecond: boolean;
    isShowingThird: boolean;
    isShowingFourth: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isShowingFirst: false,
      isShowingSecond: false,
      isShowingThird: false,
      isShowingFourth: false,
    };
  }

  public render() {
    return (
      <div>
        <FocusTrapZone id="fz1" forceFocusInsideTrap={true} isClickableOutsideFocusTrap={false}>
          <button className="a" onClick={this._toggleFirst}>
            a
          </button>
          <button className="b" onClick={this._toggleSecond}>
            b
          </button>
          <button className="c" onClick={this._toggleThird}>
            c
          </button>
          <button className="d" onClick={this._toggleFourth}>
            d
          </button>
        </FocusTrapZone>

        {this.state.isShowingFirst && (
          <FocusTrapZone id="fz2" forceFocusInsideTrap={true} isClickableOutsideFocusTrap={false}>
            <FocusZone data-is-visible={true}>First</FocusZone>
          </FocusTrapZone>
        )}
        {this.state.isShowingSecond && (
          <FocusTrapZone id="fz3" forceFocusInsideTrap={true} isClickableOutsideFocusTrap={false}>
            <FocusZone data-is-visible={true}>Second</FocusZone>
          </FocusTrapZone>
        )}
        {this.state.isShowingThird && (
          <FocusTrapZone id="fz4" forceFocusInsideTrap={false} isClickableOutsideFocusTrap={false}>
            <FocusZone data-is-visible={true}>Third</FocusZone>
          </FocusTrapZone>
        )}
        {this.state.isShowingFourth && (
          <FocusTrapZone id="fz5" forceFocusInsideTrap={true} isClickableOutsideFocusTrap={false} disabled={true}>
            <FocusZone data-is-visible={true}>Fourth</FocusZone>
          </FocusTrapZone>
        )}
      </div>
    );
  }

  private _toggleFirst = () => {
    this.setState({ isShowingFirst: !this.state.isShowingFirst });
  };

  private _toggleSecond = () => {
    this.setState({ isShowingSecond: !this.state.isShowingSecond });
  };

  private _toggleThird = () => {
    this.setState({ isShowingThird: !this.state.isShowingThird });
  };

  private _toggleFourth = () => {
    this.setState({ isShowingFourth: !this.state.isShowingFourth });
  };
}

describe('FocusTrapZone', () => {
  // document.activeElement can be used to detect activeElement after component mount, but it does not
  // update based on focus events due to limitations of ReactDOM. Use lastFocusedElement to detect focus
  // change events.
  let lastFocusedElement: HTMLElement | undefined;
  let addEventListener: any;
  let componentEventListeners: any = {};
  const ftzClassname = 'ftzTestClassname';

  function _onFocus(ev: any): void {
    lastFocusedElement = ev.target;
  }

  isConformant({
    Component: FocusTrapZone,
    displayName: 'FocusTrapZone',
  });

  function setupElement(
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
  ): void {
    ReactTestUtils.act(() => {
      element.getBoundingClientRect = () =>
        ({
          top: clientRect.top,
          left: clientRect.left,
          bottom: clientRect.bottom,
          right: clientRect.right,
          width: clientRect.right - clientRect.left,
          height: clientRect.bottom - clientRect.top,
        } as DOMRect);

      element.setAttribute('data-is-visible', String(isVisible));

      element.focus = () => ReactTestUtils.Simulate.focus(element);
    });
  }

  /**
   * Helper to get FocusTrapZone bumpers. Requires classname attribute of
   * 'ftzClassname' on FTZ.
   */
  function getFtzBumpers(
    element: HTMLElement,
  ): {
    firstBumper: Element;
    lastBumper: Element;
  } {
    const ftz = element.querySelector('.' + ftzClassname) as HTMLElement;
    const ftzNodes = ftz.children;
    const firstBumper = ftzNodes[0];
    const lastBumper = ftzNodes[ftzNodes.length - 1];

    return { firstBumper, lastBumper };
  }

  beforeAll(() => {
    // Test DOM won't bubble up events to window listeners, so instead we call the window listeners directly.
    // By mocking window.addEventListener we can store callbacks that the component under test registers.
    // Then we can call them directly to simulate window events.
    addEventListener = window.addEventListener;
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      componentEventListeners[event] = cb;
    });
  });

  beforeEach(() => {
    lastFocusedElement = undefined;
  });

  afterEach(() => {
    // Make sure registered listeners are cleared between tests.
    componentEventListeners = {};
  });

  afterAll(() => {
    window.addEventListener = addEventListener;
  });

  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    it('can tab across FocusZones with different button structures', async () => {
      expect.assertions(3);

      const topLevelDiv = (ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <FocusTrapZone forceFocusInsideTrap={false} className={ftzClassname}>
            <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
              <div data-is-visible={true}>
                <button className="a">a</button>
              </div>
              <div data-is-visible={true}>
                <button className="b">b</button>
              </div>
              <div data-is-visible={true}>
                <button className="c">c</button>
              </div>
            </FocusZone>
            <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
              <div data-is-visible={true}>
                <div data-is-visible={true}>
                  <button className="d">d</button>
                  <button className="e">e</button>
                  <button className="f">f</button>
                </div>
              </div>
            </FocusZone>
          </FocusTrapZone>
        </div>,
      ) as unknown) as HTMLElement;

      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonD = topLevelDiv.querySelector('.d') as HTMLElement;
      const buttonE = topLevelDiv.querySelector('.e') as HTMLElement;
      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;

      const { firstBumper, lastBumper } = getFtzBumpers(topLevelDiv);

      // Assign bounding locations to buttons.
      setupElement(buttonA, {
        clientRect: { top: 0, bottom: 30, left: 0, right: 30 },
      });
      setupElement(buttonB, {
        clientRect: { top: 0, bottom: 30, left: 30, right: 60 },
      });
      setupElement(buttonC, {
        clientRect: { top: 0, bottom: 30, left: 60, right: 90 },
      });
      setupElement(buttonD, {
        clientRect: { top: 30, bottom: 60, left: 0, right: 30 },
      });
      setupElement(buttonE, {
        clientRect: { top: 30, bottom: 60, left: 30, right: 60 },
      });
      setupElement(buttonF, {
        clientRect: { top: 30, bottom: 60, left: 60, right: 90 },
      });

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonA);
        expect(lastFocusedElement).toBe(buttonA);
      });

      // Simulate shift+tab event which would focus first bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(firstBumper);
        expect(lastFocusedElement).toBe(buttonD);
      });

      // Simulate tab event which would focus last bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(lastBumper);
        expect(lastFocusedElement).toBe(buttonA);
      });
    });

    it('can tab across a FocusZone with different button structures', async () => {
      expect.assertions(3);

      const topLevelDiv = (ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <FocusTrapZone forceFocusInsideTrap={false} className={ftzClassname}>
            <div data-is-visible={true}>
              <button className="x">x</button>
            </div>
            <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
              <div data-is-visible={true}>
                <button className="a">a</button>
              </div>
              <div data-is-visible={true}>
                <div data-is-visible={true}>
                  <button className="b">b</button>
                  <button className="c">c</button>
                  <button className="d">d</button>
                </div>
              </div>
            </FocusZone>
          </FocusTrapZone>
        </div>,
      ) as unknown) as HTMLElement;

      const buttonX = topLevelDiv.querySelector('.x') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonD = topLevelDiv.querySelector('.d') as HTMLElement;

      const { firstBumper, lastBumper } = getFtzBumpers(topLevelDiv);

      // Assign bounding locations to buttons.
      setupElement(buttonX, {
        clientRect: { top: 0, bottom: 30, left: 0, right: 30 },
      });
      setupElement(buttonA, {
        clientRect: { top: 0, bottom: 30, left: 0, right: 30 },
      });
      setupElement(buttonB, {
        clientRect: { top: 0, bottom: 30, left: 30, right: 60 },
      });
      setupElement(buttonC, {
        clientRect: { top: 0, bottom: 30, left: 60, right: 90 },
      });
      setupElement(buttonD, {
        clientRect: { top: 30, bottom: 60, left: 0, right: 30 },
      });

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonX);
      });
      expect(lastFocusedElement).toBe(buttonX);

      // Simulate shift+tab event which would focus first bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(firstBumper);
      });
      expect(lastFocusedElement).toBe(buttonA);

      // Simulate tab event which would focus last bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(lastBumper);
      });
      expect(lastFocusedElement).toBe(buttonX);
    });

    it(`can trap focus when FTZ bookmark elements are FocusZones, and those elements have inner elements focused that
      are not the first inner element`, async () => {
      expect.assertions(4);

      const topLevelDiv = (ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <button className={'z1'}>z1</button>
          <FocusTrapZone forceFocusInsideTrap={false} className={ftzClassname}>
            <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
              <button className={'a'}>a</button>
              <button className={'b'}>b</button>
              <button className={'c'}>c</button>
            </FocusZone>
            <button className={'d'}>d</button>
            <FocusZone direction={FocusZoneDirection.horizontal} data-is-visible={true}>
              <button className={'e'}>e</button>
              <button className={'f'}>f</button>
              <button className={'g'}>g</button>
            </FocusZone>
          </FocusTrapZone>
          <button className={'z2'}>z2</button>
        </div>,
      ) as unknown) as HTMLElement;

      const buttonZ1 = topLevelDiv.querySelector('.z1') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonD = topLevelDiv.querySelector('.d') as HTMLElement;
      const buttonE = topLevelDiv.querySelector('.e') as HTMLElement;
      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;
      const buttonG = topLevelDiv.querySelector('.g') as HTMLElement;
      const buttonZ2 = topLevelDiv.querySelector('.z2') as HTMLElement;

      const { firstBumper, lastBumper } = getFtzBumpers(topLevelDiv);

      // Assign bounding locations to buttons.
      setupElement(buttonZ1, {
        clientRect: { top: 0, bottom: 10, left: 0, right: 10 },
      });
      setupElement(buttonA, {
        clientRect: { top: 10, bottom: 30, left: 0, right: 10 },
      });
      setupElement(buttonB, {
        clientRect: { top: 10, bottom: 30, left: 10, right: 20 },
      });
      setupElement(buttonC, {
        clientRect: { top: 10, bottom: 30, left: 20, right: 30 },
      });
      setupElement(buttonD, {
        clientRect: { top: 30, bottom: 40, left: 0, right: 10 },
      });
      setupElement(buttonE, {
        clientRect: { top: 40, bottom: 60, left: 0, right: 10 },
      });
      setupElement(buttonF, {
        clientRect: { top: 40, bottom: 60, left: 10, right: 20 },
      });
      setupElement(buttonG, {
        clientRect: { top: 40, bottom: 60, left: 20, right: 30 },
      });
      setupElement(buttonZ2, {
        clientRect: { top: 60, bottom: 70, left: 0, right: 10 },
      });

      // Focus the middle button in the first FZ.
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonA);
        ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.right });
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Focus the middle button in the second FZ.
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonE);
        ReactTestUtils.Simulate.keyDown(buttonE, { which: KeyCodes.right });
      });
      expect(lastFocusedElement).toBe(buttonF);

      // Simulate tab event which would focus last bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(lastBumper);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Simulate shift+tab event which would focus first bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(firstBumper);
      });
      expect(lastFocusedElement).toBe(buttonF);
    });
  });

  describe('Tab and shift-tab do nothing (keep focus where it is) when the FTZ contains 0 tabbable items', () => {
    function setupTest(props: IFocusTrapZoneProps) {
      const topLevelDiv = (ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <button className={'z1'}>z1</button>
          <FocusTrapZone className={ftzClassname} forceFocusInsideTrap={true} {...props}>
            <button className={'a'} tabIndex={-1}>
              a
            </button>
            <button className={'b'} tabIndex={-1}>
              b
            </button>
            <button className={'c'} tabIndex={-1}>
              c
            </button>
          </FocusTrapZone>
          <button className={'z2'}>z2</button>
        </div>,
      ) as unknown) as HTMLElement;

      const buttonZ1 = topLevelDiv.querySelector('.z1') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonZ2 = topLevelDiv.querySelector('.z2') as HTMLElement;

      const { firstBumper, lastBumper } = getFtzBumpers(topLevelDiv);

      // Have to set bumpers as "visible" for focus utilities to find them.
      // This is needed for 0 tabbable element tests to make sure that next tabbable element
      // from one bumper is the other bumper.
      ReactTestUtils.act(() => {
        firstBumper.setAttribute('data-is-visible', String(true));
        lastBumper.setAttribute('data-is-visible', String(true));
      });

      // Assign bounding locations to buttons.
      setupElement(buttonZ1, {
        clientRect: { top: 0, bottom: 10, left: 0, right: 10 },
      });
      setupElement(buttonA, {
        clientRect: { top: 10, bottom: 20, left: 0, right: 10 },
      });
      setupElement(buttonB, {
        clientRect: { top: 20, bottom: 30, left: 0, right: 10 },
      });
      setupElement(buttonC, {
        clientRect: { top: 30, bottom: 40, left: 0, right: 10 },
      });
      setupElement(buttonZ2, {
        clientRect: { top: 40, bottom: 50, left: 0, right: 10 },
      });

      return {
        buttonZ1,
        buttonA,
        buttonB,
        buttonC,
        buttonZ2,
        firstBumper,
        lastBumper,
      };
    }

    it('focuses first focusable element when focusing first bumper', async () => {
      expect.assertions(2);

      const { buttonA, buttonB, firstBumper } = setupTest({});

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Simulate shift+tab event which would focus first bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(firstBumper);
      });
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('focuses first focusable element when focusing last bumper', async () => {
      expect.assertions(2);

      const { buttonA, buttonB, lastBumper } = setupTest({});

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Simulate tab event which would focus first bumper
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(lastBumper);
      });
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('focuses first focusable element when focusing outside of FTZ with 0 tabbable items', async () => {
      expect.assertions(2);

      const { buttonA, buttonB, buttonZ2 } = setupTest({});

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Directly call window listener to simulate focus leaving FTZ.
      componentEventListeners.focus({
        target: buttonZ2,
        preventDefault: () => {
          /*noop*/
        },
        stopPropagation: () => {
          /*noop*/
        },
      });
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('focuses previously focused element when focusing outside of FTZ with 0 tabbable items', async () => {
      expect.assertions(2);

      const { buttonB, buttonZ2 } = setupTest({
        focusPreviouslyFocusedInnerElement: true,
      });

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Directly call window listener to simulate focus leaving FTZ.
      componentEventListeners.focus({
        target: buttonZ2,
        preventDefault: () => {
          /*noop*/
        },
        stopPropagation: () => {
          /*noop*/
        },
      });
      expect(lastFocusedElement).toBe(buttonB);
    });
  });

  describe('Focus behavior based on default and explicit prop values', () => {
    function setupTest(props: IFocusTrapZoneProps) {
      // data-is-visible is embedded in buttons here for testing focus behavior on initial render.
      // Components have to be marked visible before setupElement has a chance to apply the data-is-visible attribute.
      const topLevelDiv = (ReactTestUtils.renderIntoDocument(
        <div>
          <div onFocusCapture={_onFocus}>
            <button className={'z1'}>z1</button>
            <FocusTrapZone data-is-visible={true} {...props} className={ftzClassname}>
              <button className={'a'} data-is-visible={true}>
                a
              </button>
              <button className={'b'} data-is-visible={true}>
                b
              </button>
              <button className={'c'} data-is-visible={true}>
                c
              </button>
            </FocusTrapZone>
            <button className={'z2'}>z2</button>
          </div>
        </div>,
      ) as unknown) as HTMLElement;

      const buttonZ1 = topLevelDiv.querySelector('.z1') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonZ2 = topLevelDiv.querySelector('.z2') as HTMLElement;

      const { firstBumper, lastBumper } = getFtzBumpers(topLevelDiv);

      // Assign bounding locations to buttons.
      setupElement(buttonZ1, {
        clientRect: { top: 0, bottom: 10, left: 0, right: 10 },
      });
      setupElement(buttonA, {
        clientRect: { top: 10, bottom: 20, left: 0, right: 10 },
      });
      setupElement(buttonB, {
        clientRect: { top: 20, bottom: 30, left: 0, right: 10 },
      });
      setupElement(buttonC, {
        clientRect: { top: 30, bottom: 40, left: 0, right: 10 },
      });
      setupElement(buttonZ2, {
        clientRect: { top: 40, bottom: 50, left: 0, right: 10 },
      });

      return {
        buttonZ1,
        buttonA,
        buttonB,
        buttonC,
        buttonZ2,
        firstBumper,
        lastBumper,
      };
    }

    it('Restores focus to FTZ when clicking outside FTZ', async () => {
      expect.assertions(2);

      const { buttonA, buttonB, buttonZ2 } = setupTest({});

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Directly call window listener to simulate focus leaving FTZ.
      componentEventListeners.click({
        target: buttonZ2,
        preventDefault: () => {
          /*noop*/
        },
        stopPropagation: () => {
          /*noop*/
        },
      });
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('Does not restore focus to FTZ when clicking outside FTZ with isClickableOutsideFocusTrap', async () => {
      expect.assertions(1);

      setupTest({ isClickableOutsideFocusTrap: true });

      // FTZ doesn't register a window click listener when isClickableOutsideFocusTrap is true, so we can't simulate
      // clicks directly. Therefore we test indirectly by making sure FTZ doesn't register a window click listener.
      expect(componentEventListeners.click).toBeUndefined();
    });

    it('Focuses first element when FTZ does not have focus and first bumper receives focus', async () => {
      expect.assertions(2);

      const { buttonA, buttonZ1, firstBumper } = setupTest({
        isClickableOutsideFocusTrap: true,
      });

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonZ1);
      });
      expect(lastFocusedElement).toBe(buttonZ1);

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(firstBumper);
      });
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('Focuses last element when FTZ does not have focus and last bumper receives focus', async () => {
      expect.assertions(2);

      const { buttonC, buttonZ2, lastBumper } = setupTest({
        isClickableOutsideFocusTrap: true,
      });

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonZ2);
      });
      expect(lastFocusedElement).toBe(buttonZ2);

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(lastBumper);
      });
      expect(lastFocusedElement).toBe(buttonC);
    });

    it('Restores focus to FTZ when focusing outside FTZ', async () => {
      expect.assertions(2);

      const { buttonA, buttonB, buttonZ2 } = setupTest({});

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Directly call window listener to simulate focus leaving FTZ.
      componentEventListeners.focus({
        target: buttonZ2,
        preventDefault: () => {
          /*noop*/
        },
        stopPropagation: () => {
          /*noop*/
        },
      });
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('Does not restore focus to FTZ when forceFocusInsideTrap is false', async () => {
      expect.assertions(1);

      setupTest({ forceFocusInsideTrap: false });

      // FTZ doesn't register a window focus listener when isClickableOutsideFocusTrap is true, so we can't simulate
      // focus directly. Therefore we test indirectly by making sure FTZ doesn't register a window focus listener.
      expect(componentEventListeners.focus).toBeUndefined();
    });

    it('Focuses first on mount', async () => {
      expect.assertions(1);

      const { buttonA } = setupTest({});

      expect(document.activeElement).toBe(buttonA);
    });

    it('Does not focus first on mount with disableFirstFocus', async () => {
      expect.assertions(1);

      const activeElement = document.activeElement;

      setupTest({ disableFirstFocus: true });

      // document.activeElement can be used to detect activeElement after component mount, but it does not
      // update based on focus events due to limitations of ReactDOM.
      // Make sure activeElement didn't change.
      expect(document.activeElement).toBe(activeElement);
    });

    it('Does not focus first on mount while disabled', async () => {
      expect.assertions(1);

      const activeElement = document.activeElement;

      setupTest({ disabled: true });

      // document.activeElement can be used to detect activeElement after component mount, but it does not
      // update based on focus events due to limitations of ReactDOM.
      // Make sure activeElement didn't change.
      expect(document.activeElement).toBe(activeElement);
    });

    it('Focuses on firstFocusableSelector on mount', async () => {
      expect.assertions(1);

      const { buttonC } = setupTest({ firstFocusableSelector: 'c' });

      expect(document.activeElement).toBe(buttonC);
    });

    it('Does not focus on firstFocusableSelector on mount while disabled', async () => {
      expect.assertions(1);

      const activeElement = document.activeElement;

      setupTest({ firstFocusableSelector: 'c', disabled: true });

      expect(document.activeElement).toBe(activeElement);
    });

    it('Falls back to first focusable element with invalid firstFocusableSelector', async () => {
      const { buttonA } = setupTest({
        firstFocusableSelector: 'invalidSelector',
      });

      expect(document.activeElement).toBe(buttonA);
    });
  });

  describe('Focusing the FTZ', () => {
    function setupTest(focusPreviouslyFocusedInnerElement: boolean) {
      const focusTrapZoneRef = React.createRef<HTMLElement>();
      const topLevelDiv = (ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <FocusTrapZone
            forceFocusInsideTrap={true}
            focusPreviouslyFocusedInnerElement={focusPreviouslyFocusedInnerElement}
            data-is-focusable={true}
            componentRef={focusTrapZoneRef}
          >
            <button className={'f'}>f</button>
            <FocusZone>
              <button className={'a'}>a</button>
              <button className={'b'}>b</button>
            </FocusZone>
          </FocusTrapZone>
          <button className={'z'}>z</button>
        </div>,
      ) as unknown) as HTMLElement;

      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonZ = topLevelDiv.querySelector('.z') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonF, {
        clientRect: { top: 0, bottom: 10, left: 0, right: 10 },
      });
      setupElement(buttonA, {
        clientRect: { top: 10, bottom: 20, left: 0, right: 10 },
      });
      setupElement(buttonB, {
        clientRect: { top: 20, bottom: 30, left: 0, right: 10 },
      });
      setupElement(buttonZ, {
        clientRect: { top: 30, bottom: 40, left: 0, right: 10 },
      });

      return {
        focusTrapZone: focusTrapZoneRef.current!,
        buttonF,
        buttonA,
        buttonB,
        buttonZ,
      };
    }

    it('goes to previously focused element when focusing the FTZ', async () => {
      expect.assertions(4);

      const { focusTrapZone, buttonF, buttonB, buttonZ } = setupTest(true /*focusPreviouslyFocusedInnerElement*/);

      // Manually focusing FTZ when FTZ has never
      // had focus within should go to 1st focusable inner element.
      ReactTestUtils.act(() => {
        focusTrapZone.focus();
      });
      expect(lastFocusedElement).toBe(buttonF);

      // Focus inside the trap zone, not the first element.
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Focus outside the trap zone
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonZ);
      });
      expect(lastFocusedElement).toBe(buttonZ);

      // Manually focusing FTZ should return to originally focused inner element.
      ReactTestUtils.act(() => {
        focusTrapZone.focus();
      });

      expect(lastFocusedElement).toBe(buttonB);
    });

    it('goes to first focusable element when focusing the FTZ', async () => {
      expect.assertions(4);

      const { focusTrapZone, buttonF, buttonB, buttonZ } = setupTest(false /*focusPreviouslyFocusedInnerElement*/);

      // Manually focusing FTZ when FTZ has never
      // had focus within should go to 1st focusable inner element.
      ReactTestUtils.act(() => {
        focusTrapZone.focus();
      });
      expect(lastFocusedElement).toBe(buttonF);

      // Focus inside the trap zone, not the first element.
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonB);
      });
      expect(lastFocusedElement).toBe(buttonB);

      // Focus outside the trap zone
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(buttonZ);
      });
      expect(lastFocusedElement).toBe(buttonZ);

      // Manually focusing FTZ should go to the first focusable element.
      ReactTestUtils.act(() => {
        focusTrapZone?.focus();
      });
      expect(lastFocusedElement).toBe(buttonF);
    });
  });

  describe('Nested FocusTrapZones Stack Behavior', () => {
    beforeAll(() => {
      FocusTrapZone.focusStack = [];
    });

    it('FocusTrapZone maintains a proper stack of FocusTrapZones as more are mounted/unmounted.', async () => {
      safeMount(<FocusTrapZoneTestComponent />, wrapper => {
        const buttonA = wrapper.find('.a');
        const buttonB = wrapper.find('.b');
        const buttonC = wrapper.find('.c');
        const buttonD = wrapper.find('.d');

        // There should now be one focus trap zone.
        expect(FocusTrapZone.focusStack.length).toBe(1);

        ReactTestUtils.act(() => {
          buttonA.simulate('click');
        });

        // There should now be two focus trap zones.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1', 'fz2']);

        ReactTestUtils.act(() => {
          buttonB.simulate('click');
        });

        // There should now be three focus trap zones.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1', 'fz2', 'fz3']);

        ReactTestUtils.act(() => {
          buttonA.simulate('click');
        });

        // There should now be two focus trap zones after removing second focusTrapZone.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1', 'fz3']);

        ReactTestUtils.act(() => {
          buttonB.simulate('click');
        });

        // There should now be one focus trap zone after removing third focusTrapZone.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1']);

        ReactTestUtils.act(() => {
          buttonC.simulate('click');
        });

        // There should now be two focus trap zone. The FocusStack should correctly handle forceFocusInsideTrap prop.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1', 'fz4']);

        ReactTestUtils.act(() => {
          buttonC.simulate('click');
        });

        // There should now be two focus trap zones after removing third focusTrapZone.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1']);

        ReactTestUtils.act(() => {
          buttonD.simulate('click');
        });

        // There should only be one focus trap zone (base) since fz5 disabled prop is equal to true.
        expect(FocusTrapZone.focusStack).toStrictEqual(['fz1']);
      });
    });
  });
});
