import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes } from '../../Utilities';

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

  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    it('can tab across FocusZones with different button structures', async () => {
      expect.assertions(3);

      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={ _onFocus }>
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
        <div onFocusCapture={ _onFocus }>
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

    it('can trap focus when FTZ bookmark elements are FocusZones, and those elements have inner elements focused that are not the first inner element', async () => {

      expect.assertions(4);

      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={ _onFocus }>
          <button id={ 'z1' } className={ 'z1' }>z1</button>
          <FocusTrapZone forceFocusInsideTrap={ false }>
            <FocusZone direction={ FocusZoneDirection.horizontal } data-is-visible={ true }>
              <button id={ 'a' } className={ 'a' }>a</button>
              <button id={ 'b' } className={ 'b' }>b</button>
              <button id={ 'c' } className={ 'c' }>c</button>
            </FocusZone>
            <button id={ 'd' } className={ 'd' }>d</button>
            <FocusZone direction={ FocusZoneDirection.horizontal } data-is-visible={ true }>
              <button id={ 'e' } className={ 'e' }>e</button>
              <button id={ 'f' } className={ 'f' }>f</button>
              <button id={ 'g' } className={ 'g' }>g</button>
            </FocusZone>
          </FocusTrapZone>
          <button id={ 'z2' } className={ 'z2' }>z2</button>
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
        <div onFocusCapture={ _onFocus }>
          <button id={ 'z1' } className={ 'z1' }>z1</button>
          <FocusTrapZone forceFocusInsideTrap={ false }>
            <button id={ 'a' } className={ 'a' } tabIndex={ -1 }>a</button>
            <button id={ 'b' } className={ 'b' } tabIndex={ -1 }>b</button>
            <button id={ 'c' } className={ 'c' } tabIndex={ -1 }>c</button>
          </FocusTrapZone>
          <button id={ 'z2' } className={ 'z2' }>z2</button>
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

  describe('Tab and shift-tab do nothing (keep focus where it is) when the FTZ contains 1 focused tabbable item', () => {
    function setupTest() {
      const topLevelDiv = ReactTestUtils.renderIntoDocument(
        <div onFocusCapture={ _onFocus }>
          <button id={ 'z1' } className={ 'z1' }>z1</button>
          <FocusTrapZone forceFocusInsideTrap={ false }>
            <FocusZone data-is-visible={ true }>
              <button id={ 'a' } className={ 'a' }>a</button>
              <button id={ 'b' } className={ 'b' }>b</button>
              <button id={ 'c' } className={ 'c' }>c</button>
            </FocusZone>
          </FocusTrapZone>
          <button id={ 'z2' } className={ 'z2' }>z2</button>
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

      const { buttonA, buttonB } = setupTest();

      // Focus the middle button in the FTZ
      ReactTestUtils.Simulate.focus(buttonA);
      await animationFrame();
      ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.down });
      expect(lastFocusedElement).toBe(buttonB);

      // Pressing tab should stay where you are.
      ReactTestUtils.Simulate.keyDown(buttonB, { which: KeyCodes.tab });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });

    it('does not move when pressing shift-tab', async () => {

      expect.assertions(2);

      const { buttonA, buttonB } = setupTest();

      // Focus the middle button in the FTZ
      ReactTestUtils.Simulate.focus(buttonA);
      await animationFrame();
      ReactTestUtils.Simulate.keyDown(buttonA, { which: KeyCodes.down });
      expect(lastFocusedElement).toBe(buttonB);

      // Pressing shift-tab should stay where you are.
      ReactTestUtils.Simulate.keyDown(buttonB, { which: KeyCodes.tab, shiftKey: true });
      await animationFrame();
      expect(lastFocusedElement).toBe(buttonB);
    });
  });
});
