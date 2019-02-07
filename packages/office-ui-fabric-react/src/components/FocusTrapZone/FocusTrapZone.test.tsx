import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { FocusTrapZone } from './FocusTrapZone';

// rAF does not exist in node - let's mock it
window.requestAnimationFrame = (callback: FrameRequestCallback) => {
  const r = window.setTimeout(callback, 0);
  jest.runAllTimers();
  return r;
};
const animationFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));
jest.useFakeTimers();

class FocusTrapZoneTestComponent extends React.Component<{}, { isShowingFirst: boolean; isShowingSecond: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { isShowingFirst: true, isShowingSecond: false };
  }

  public render() {
    return (
      <div>
        <FocusTrapZone forceFocusInsideTrap={true} isClickableOutsideFocusTrap={false}>
          <button className={'a'} onClick={this._toggleFirst}>
            a
          </button>
          <button className={'b'} onClick={this._toggleSecond}>
            b
          </button>
        </FocusTrapZone>

        {this.state.isShowingFirst && (
          <FocusTrapZone forceFocusInsideTrap={false} isClickableOutsideFocusTrap={false}>
            <FocusZone data-is-visible={true}>First</FocusZone>
          </FocusTrapZone>
        )}
        {this.state.isShowingSecond && (
          <FocusTrapZone forceFocusInsideTrap={false} isClickableOutsideFocusTrap={true}>
            <FocusZone data-is-visible={true}>First</FocusZone>
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
}

describe('FocusTrapZone', () => {
  let lastFocusedElement: HTMLElement | undefined;
  function _onFocus(ev: any): void {
    lastFocusedElement = ev.target;
  }

  function setupElement(
    element: HTMLElement,
    {
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
    }
  ): void {
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
  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    it('can tab across FocusZones with different button structures', async () => {
      expect.assertions(3);

      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <FocusTrapZone forceFocusInsideTrap={false}>
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
        </div>
      ) as HTMLElement;

      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonD = topLevelDiv.querySelector('.d') as HTMLElement;
      const buttonE = topLevelDiv.querySelector('.e') as HTMLElement;
      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonA, { clientRect: { top: 0, bottom: 30, left: 0, right: 30 } });
      setupElement(buttonB, { clientRect: { top: 0, bottom: 30, left: 30, right: 60 } });
      setupElement(buttonC, { clientRect: { top: 0, bottom: 30, left: 60, right: 90 } });
      setupElement(buttonD, { clientRect: { top: 30, bottom: 60, left: 0, right: 30 } });
      setupElement(buttonE, { clientRect: { top: 30, bottom: 60, left: 30, right: 60 } });
      setupElement(buttonF, { clientRect: { top: 30, bottom: 60, left: 60, right: 90 } });

      // Focus the first button.
      ReactTestUtils.Simulate.focus(buttonA);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonA);

      // Pressing shift + tab should go to d.
      ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.tab, shiftKey: true });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonD);

      // Pressing tab should go to a.
      ReactTestUtils.Simulate.keyDown(buttonD, { which: KeyCodes.tab });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonA);
    });

    it('can tab across a FocusZone with different button structures', async () => {
      expect.assertions(3);

      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <FocusTrapZone forceFocusInsideTrap={false}>
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
        </div>
      ) as HTMLElement;

      const buttonX = topLevelDiv.querySelector('.x') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonD = topLevelDiv.querySelector('.d') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonX, { clientRect: { top: 0, bottom: 30, left: 0, right: 30 } });
      setupElement(buttonA, { clientRect: { top: 0, bottom: 30, left: 0, right: 30 } });
      setupElement(buttonB, { clientRect: { top: 0, bottom: 30, left: 30, right: 60 } });
      setupElement(buttonC, { clientRect: { top: 0, bottom: 30, left: 60, right: 90 } });
      setupElement(buttonD, { clientRect: { top: 30, bottom: 60, left: 0, right: 30 } });

      // Focus the first button.
      ReactTestUtils.Simulate.focus(buttonX);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonX);

      // Pressing shift + tab should go to a.
      ReactTestUtils.Simulate.keyDown(buttonX, { which: KeyCodes.tab, shiftKey: true });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonA);

      // Pressing tab should go to x.
      ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.tab });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonX);
    });

    it(`can trap focus when FTZ bookmark elements are FocusZones, and those elements have inner elements focused that
      are not the first inner element`, async () => {
      expect.assertions(4);

      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <button className={'z1'}>z1</button>
          <FocusTrapZone forceFocusInsideTrap={false}>
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
        </div>
      ) as HTMLElement;

      const buttonZ1 = topLevelDiv.querySelector('.z1') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonD = topLevelDiv.querySelector('.d') as HTMLElement;
      const buttonE = topLevelDiv.querySelector('.e') as HTMLElement;
      const buttonF = topLevelDiv.querySelector('.f') as HTMLElement;
      const buttonG = topLevelDiv.querySelector('.g') as HTMLElement;
      const buttonZ2 = topLevelDiv.querySelector('.z2') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonZ1, { clientRect: { top: 0, bottom: 10, left: 0, right: 10 } });
      setupElement(buttonA, { clientRect: { top: 10, bottom: 30, left: 0, right: 10 } });
      setupElement(buttonB, { clientRect: { top: 10, bottom: 30, left: 10, right: 20 } });
      setupElement(buttonC, { clientRect: { top: 10, bottom: 30, left: 20, right: 30 } });
      setupElement(buttonD, { clientRect: { top: 30, bottom: 40, left: 0, right: 10 } });
      setupElement(buttonE, { clientRect: { top: 40, bottom: 60, left: 0, right: 10 } });
      setupElement(buttonF, { clientRect: { top: 40, bottom: 60, left: 10, right: 20 } });
      setupElement(buttonG, { clientRect: { top: 40, bottom: 60, left: 20, right: 30 } });
      setupElement(buttonZ2, { clientRect: { top: 60, bottom: 70, left: 0, right: 10 } });

      // Focus the middle button in the first FZ.
      ReactTestUtils.Simulate.focus(buttonA);
      await animationFrame();
      ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.right });
      expect(lastFocusedElement).toBe(buttonB);

      // Focus the middle button in the second FZ.
      ReactTestUtils.Simulate.focus(buttonE);
      await animationFrame();
      ReactTestUtils.Simulate.keyDown(buttonE, { which: KeyCodes.right });
      expect(lastFocusedElement).toBe(buttonF);

      // Pressing tab should go to B; the last focused element in FZ1.
      ReactTestUtils.Simulate.keyDown(buttonF, { which: KeyCodes.tab });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);

      // Pressing shift-tab should go to F; the last focused element in FZ2.
      ReactTestUtils.Simulate.keyDown(buttonB, { which: KeyCodes.tab, shiftKey: true });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonF);
    });
  });

  describe('Tab and shift-tab do nothing (keep focus where it is) when the FTZ contains 0 tabbable items', () => {
    function setupTest() {
      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <button className={'z1'}>z1</button>
          <FocusTrapZone forceFocusInsideTrap={false}>
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
        </div>
      ) as HTMLElement;

      const buttonZ1 = topLevelDiv.querySelector('.z1') as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;
      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;
      const buttonC = topLevelDiv.querySelector('.c') as HTMLElement;
      const buttonZ2 = topLevelDiv.querySelector('.z2') as HTMLElement;

      // Assign bounding locations to buttons.
      setupElement(buttonZ1, { clientRect: { top: 0, bottom: 10, left: 0, right: 10 } });
      setupElement(buttonA, { clientRect: { top: 10, bottom: 20, left: 0, right: 10 } });
      setupElement(buttonB, { clientRect: { top: 20, bottom: 30, left: 0, right: 10 } });
      setupElement(buttonC, { clientRect: { top: 30, bottom: 40, left: 0, right: 10 } });
      setupElement(buttonZ2, { clientRect: { top: 40, bottom: 50, left: 0, right: 10 } });

      return { buttonZ1, buttonA, buttonB, buttonC, buttonZ2 };
    }

    it('does not move when pressing tab', async () => {
      expect.assertions(2);

      const { buttonB } = setupTest();

      // Focus the middle button in the FTZ, even though it has tabIndex=-1
      ReactTestUtils.Simulate.focus(buttonB);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);

      // Pressing tab should stay where you are.
      ReactTestUtils.Simulate.keyDown(buttonB, { which: KeyCodes.tab });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });

    it('does not move when pressing shift-tab', async () => {
      expect.assertions(2);

      const { buttonB } = setupTest();

      // Focus the middle button in the FTZ, even though it has tabIndex=-1
      ReactTestUtils.Simulate.focus(buttonB);
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);

      // Pressing shift-tab should stay where you are.
      ReactTestUtils.Simulate.keyDown(buttonB, { which: KeyCodes.tab, shiftKey: true });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });
  });

  describe('Focusing the FTZ', () => {
    function setupTest(focusPreviouslyFocusedInnerElement: boolean) {
      const focusTrapZoneRef = React.createRef<FocusTrapZone>();
      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={_onFocus}>
          <FocusTrapZone
            forceFocusInsideTrap={false}
            focusPreviouslyFocusedInnerElement={focusPreviouslyFocusedInnerElement}
            data-is-focusable={true}
            ref={focusTrapZoneRef}
          >
            <button className={'f'}>f</button>
            <FocusZone>
              <button className={'a'}>a</button>
              <button className={'b'}>b</button>
            </FocusZone>
          </FocusTrapZone>
          <button className={'z'}>z</button>
        </div>
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

      return { focusTrapZone: focusTrapZoneRef.current!, buttonF, buttonA, buttonB, buttonZ };
    }

    it('goes to previously focused element when focusing the FTZ', async () => {
      expect.assertions(4);

      const { focusTrapZone, buttonF, buttonB, buttonZ } = setupTest(true /*focusPreviouslyFocusedInnerElement*/);

      // Manually focusing FTZ when FTZ has never
      // had focus within should go to 1st focusable inner element.
      focusTrapZone.focus();
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
      focusTrapZone.focus();
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });

    it('goes to first focusable element when focusing the FTZ', async () => {
      expect.assertions(4);

      const { focusTrapZone, buttonF, buttonB, buttonZ } = setupTest(false /*focusPreviouslyFocusedInnerElement*/);

      // Manually focusing FTZ when FTZ has never
      // had focus within should go to 1st focusable inner element.
      focusTrapZone.focus();
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
      focusTrapZone.focus();
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonF);
    });
  });

  describe('Nested FocusTrapZones Stack Behavior', () => {
    function getFocusStack(): FocusTrapZone[] {
      return (FocusTrapZone as any)._focusStack;
    }

    beforeAll(() => {
      getFocusStack().length = 0;
    });

    it('FocusTrapZone maintains a proper stack of FocusTrapZones as more are mounted/unmounted.', async () => {
      let focusTrapZoneFocusStack: FocusTrapZone[] = getFocusStack();
      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div>
          <FocusTrapZoneTestComponent />
        </div>
      ) as HTMLElement;
      const buttonA = topLevelDiv.querySelector('.a') as HTMLElement;

      const buttonB = topLevelDiv.querySelector('.b') as HTMLElement;

      expect(focusTrapZoneFocusStack.length).toBe(2);
      const baseFocusTrapZone = focusTrapZoneFocusStack[0];
      expect(baseFocusTrapZone.props.forceFocusInsideTrap).toBe(true);
      expect(baseFocusTrapZone.props.isClickableOutsideFocusTrap).toBe(false);

      const firstFocusTrapZone = focusTrapZoneFocusStack[1];
      expect(firstFocusTrapZone.props.forceFocusInsideTrap).toBe(false);
      expect(firstFocusTrapZone.props.isClickableOutsideFocusTrap).toBe(false);

      // There should be now 3 focus trap zones (base/first/second)
      ReactTestUtils.Simulate.click(buttonB);
      expect(focusTrapZoneFocusStack.length).toBe(3);
      expect(focusTrapZoneFocusStack[0]).toBe(baseFocusTrapZone);
      expect(focusTrapZoneFocusStack[1]).toBe(firstFocusTrapZone);
      const secondFocusTrapZone = focusTrapZoneFocusStack[2];
      expect(secondFocusTrapZone.props.forceFocusInsideTrap).toBe(false);
      expect(secondFocusTrapZone.props.isClickableOutsideFocusTrap).toBe(true);

      // we remove the middle one
      // unmounting a focus trap zone should remove it from the focus stack.
      // but we also check that it removes the right focustrapzone (the middle one)
      ReactTestUtils.Simulate.click(buttonA);
      focusTrapZoneFocusStack = getFocusStack();

      expect(focusTrapZoneFocusStack.length).toBe(2);
      expect(focusTrapZoneFocusStack[0]).toBe(baseFocusTrapZone);
      expect(focusTrapZoneFocusStack[1]).toBe(secondFocusTrapZone);

      // finally remove the last focus trap zone.
      ReactTestUtils.Simulate.click(buttonB);
      focusTrapZoneFocusStack = getFocusStack();

      expect(focusTrapZoneFocusStack.length).toBe(1);
      expect(focusTrapZoneFocusStack[0]).toBe(baseFocusTrapZone);
    });
  });
});
