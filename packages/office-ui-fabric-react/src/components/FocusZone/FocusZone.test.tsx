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
  let lastFocusedElement: HTMLElement;

  function _onFocus(ev) {
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

});
