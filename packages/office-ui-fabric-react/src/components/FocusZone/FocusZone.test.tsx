/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { KeyCodes } from '../../Utilities';

import { FocusZone } from './FocusZone';
import { FocusZoneDirection } from './FocusZone.Props';

import { assert } from 'chai';

describe('FocusZone', () => {
  let lastFocusedElement: HTMLElement | undefined;

  function _onFocus(ev: any) {
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
    if (isVisible) {
      (element as any).isVisible = isVisible;
    } else {
      (element as any).hidden = !isVisible;
    }
    element.focus = () => ReactTestUtils.Simulate.focus(element);
  }

  beforeEach(() => {
    lastFocusedElement = undefined;
  });

  it('can use arrows vertically', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone direction={ FocusZoneDirection.vertical }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 100
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 0,
        right: 100
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 60,
        bottom: 90,
        left: 0,
        right: 100
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonB, 'pressing down did not focus b');

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonC, 'pressing down did not focus c');

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonC, 'pressing down again did not stay on c');

    // Pressing up should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonB, 'pressing up did not focus b');

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonA, 'pressing up did not focus a');

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonA, 'pressing up again did not stay on a');

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    assert(lastFocusedElement === buttonC, 'buttonC was not focused');

    // Pressing up should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonB, 'pressing up after clicking on c did not focus b');

    // Test that pressing horizontal buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === buttonB, 'pressing left did not keep focus on b');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonB, 'pressing right did not keep focus on b');

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    assert(lastFocusedElement === buttonA, 'pressing home did not move focus to a');

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    assert(lastFocusedElement === buttonC, 'pressing end did not move focus to c');
  });

  it('can use arrows horizontally', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 100,
        left: 0,
        right: 30
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 100,
        left: 30,
        right: 60
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 100,
        left: 60,
        right: 90
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonB, 'pressing right did not focus b');

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonC, 'pressing right did not focus c');

    // Pressing right should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonC, 'pressing right again did not stay on c');

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === buttonB, 'pressing left did not focus b');

    // Pressing left should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === buttonA, 'pressing left did not focus a');

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === buttonA, 'pressing left again did not stay on a');

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    assert(lastFocusedElement === buttonC, 'buttonC was not focused');

    // Pressing left should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === buttonB, 'pressing left after clicking on c did not focus b');

    // Test that pressing vertical buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonB, 'pressing up did not keep focus on b');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonB, 'pressing down did not keep focus on b');

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    assert(lastFocusedElement === buttonA, 'pressing home did not move focus to a');

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    assert(lastFocusedElement === buttonC, 'pressing end did not move focus to c');
  });

  it('can use arrows bidirectionally', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
          <button className='hidden'>hidden</button>
          <button className='d'>d</button>
          <button className='e'>e</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;
    const hiddenButton = focusZone.querySelector('.hidden') as HTMLElement;
    const buttonD = focusZone.querySelector('.d') as HTMLElement;
    const buttonE = focusZone.querySelector('.e') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C hiddenButton
    // D E
    //
    // We will iterate from A to B, press down to skip hidden and go to C,
    // down again to E, left to D, then back up to A.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 30
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 0,
        right: 20
      }
    });

    // hidden button should be ignored.
    setupElement(hiddenButton, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 2,
        right: 40
      },
      isVisible: false
    });

    setupElement(buttonD, {
      clientRect: {
        top: 40,
        bottom: 60,
        left: 0,
        right: 20
      }
    });

    setupElement(buttonE, {
      clientRect: {
        top: 40,
        bottom: 60,
        left: 20,
        right: 40
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonB, 'pressing right did not focus b');

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonC, 'pressing down did not focus c');

    // Pressing down should go to e.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonE, 'pressing down did not focus e');

    // Pressing left should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === buttonD, 'pressing left did not focus d');

    // Pressing up should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonC, 'pressing up did not focus c');

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonA, 'pressing up did not focus a');
  });

  it('correctly skips data-not-focusable elements', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone>
          <button className='a'>a</button>
          <button className='b' data-not-focusable={ false }>b</button>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C hiddenButton
    // D E
    //
    // We will iterate from A to B, press down to skip hidden and go to C,
    // down again to E, left to D, then back up to A.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 0,
        right: 20
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(lastFocusedElement === buttonC, 'pressing down did not focus c');

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(lastFocusedElement === buttonA, 'pressing down did not focus a');
  });

  it('skips subzone elements until manually entered', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone
          direction={ FocusZoneDirection.horizontal }
          isInnerZoneKeystroke={ (e: React.KeyboardEvent<HTMLElement>) => e.which === KeyCodes.enter }>
          <button className='a'>a</button>
          <div
            className='b'
            data-is-focusable={ true }
            data-is-sub-focuszone={ true }>
            <button className='bsub'>bsub</button>
          </div>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const divB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    const buttonB = focusZone.querySelector('.bsub') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20
      }
    });

    setupElement(divB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 5,
        bottom: 15,
        left: 25,
        right: 35
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === divB, 'pressing right did not focus divB');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonC, 'pressing right did not skip to buttonC');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === divB, 'pressing left did not skip back to divB');

    ReactTestUtils.Simulate.keyDown(divB, { which: KeyCodes.enter });
    assert(lastFocusedElement === buttonB, 'pressing enter did not jump in to buttonB');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonC, 'pressing enter did not move to buttonC');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === divB, 'pressing left did not skip back to divB');
  });

  it('skips child focusZone elements until manually entered', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone
          direction={ FocusZoneDirection.horizontal }
          isInnerZoneKeystroke={ (e: React.KeyboardEvent<HTMLElement>) => e.which === KeyCodes.enter }>
          <button className='a'>a</button>
          <FocusZone
            direction={ FocusZoneDirection.horizontal }
            className='b'
            data-is-focusable={ true }>
            <button className='bsub'>bsub</button>
          </FocusZone>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const divB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    const buttonB = focusZone.querySelector('.bsub') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20
      }
    });

    setupElement(divB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 5,
        bottom: 15,
        left: 25,
        right: 35
      }
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === divB, 'pressing right did not focus divB');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonC, 'pressing right did not skip to buttonC');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === divB, 'pressing left did not skip back to divB');

    ReactTestUtils.Simulate.keyDown(divB, { which: KeyCodes.enter });
    assert(lastFocusedElement === buttonB, 'pressing enter did not jump in to buttonB');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonC, 'pressing enter did not move to buttonC');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(lastFocusedElement === divB, 'pressing left did not skip back to divB');
  });

  it('Focus first tabbable element, when active element is dynamically disabled', () => {
    let focusZone: FocusZone | null = null;
    let buttonA: any;
    let buttonB: any;
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <textarea className='t'></textarea>
        <FocusZone ref={ (focus) => { focusZone = focus; } }>
          <button className='a' ref={ (button) => { buttonA = button; } }>a</button>
          <button className='b' ref={ (button) => { buttonB = button; } }>b</button>
        </FocusZone>
      </div>
    );

    const rootNode = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const textArea = rootNode.children[0];

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
      }
    });

    // ButtonA should be focussed.
    focusZone!.focus();
    assert(lastFocusedElement === buttonA, 'buttonA was not focused');

    buttonA.disabled = true;

    // Focus the text area, outside focus zone.
    ReactTestUtils.Simulate.focus(textArea);
    assert(lastFocusedElement === textArea, 'textArea was not focused');

    // ButtonB should be focussed.
    focusZone!.focus();
    assert(lastFocusedElement === buttonB, 'buttonB was not focused ');
  });

  it('removes tab-index of previous element when another one is selected (mouse & keyboard)', () => {
    let focusZone: FocusZone | null = null;
    let buttonA: HTMLButtonElement | null = null;
    let buttonB: HTMLButtonElement | null = null;
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone ref={ (focus) => { focusZone = focus; } }>
          <button className='a' ref={ (button) => { buttonA = button; } }>a</button>
          <button className='b' ref={ (button) => { buttonB = button; } }>b</button>
        </FocusZone>
      </div>
    );

    const focusZoneElement = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonAElement = focusZoneElement.querySelector('.a') as HTMLElement;

    // HACK declare that elements are not null at this point.
    // Type narrowing doesn't work because TypeScript is not considering the assignments inside `ref` lambdas.
    focusZone = focusZone!;
    buttonA = buttonA!;
    buttonB = buttonB!;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20
      }
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
      }
    });

    // ButtonA should be focussed.
    focusZone.focus();
    assert(lastFocusedElement === buttonA, 'buttonA was not focused after initial focus');

    assert(buttonA.tabIndex === 0, 'buttonA tab-index was not on after initial focus');
    assert(buttonB.tabIndex === -1, 'buttonB tab-index was not off after initial focus');

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZoneElement, { which: KeyCodes.right });
    assert(lastFocusedElement === buttonB, 'buttonB was not focused after key down');

    assert(buttonA.tabIndex === -1, 'buttonA tab-index was not off after key down');
    assert(buttonB.tabIndex === 0, 'buttonB tab-index was not on after key down');

    // Clicking on A should enable its tab-index and disable others.
    ReactTestUtils.Simulate.mouseDown(buttonAElement);
    assert(lastFocusedElement === buttonA, 'buttonA was not focused after mouse down');

    assert(buttonA.tabIndex === 0, 'buttonA tab-index was not on after mouse down');
    assert(buttonB.tabIndex === -1, 'buttonB tab-index was not off after mouse down');
  });
});
