/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { KeyCodes } from '../../utilities/KeyCodes';
import { FocusZone, FocusZoneDirection } from './index';

let { assert } = chai;
let _lastFocusedElement;

function _onFocus(ev) {
  _lastFocusedElement = ev.target;
}

describe('FocusZone', () => {

  it('can use arrows vertically', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone direction={ FocusZoneDirection.vertical }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );
    let focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    let buttonA = focusZone.querySelector('.a') as HTMLElement;
    let buttonB = focusZone.querySelector('.b') as HTMLElement;
    let buttonC = focusZone.querySelector('.c') as HTMLElement;

    // Assign bounding locations to buttons.
    buttonA.getBoundingClientRect = () => ({
      top: 0, bottom: 30,
      left: 0, right: 100,
      width: 100,
      height: 30
    } as ClientRect);
    (buttonA as any).isVisible = true;
    buttonA.focus = () => ReactTestUtils.Simulate.focus(buttonA);

    buttonB.getBoundingClientRect = () => ({
      top: 30, bottom: 60,
      left: 0, right: 100,
      width: 100,
      height: 30
    } as ClientRect);
    (buttonB as any).isVisible = true;
    buttonB.focus = () => ReactTestUtils.Simulate.focus(buttonB);

    buttonC.getBoundingClientRect = () => ({
      top: 60, bottom: 90,
      left: 0, right: 100,
      width: 100,
      height: 30
    } as ClientRect);
    (buttonC as any).isVisible = true;
    buttonC.focus = () => ReactTestUtils.Simulate.focus(buttonC);

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(_lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(_lastFocusedElement === buttonB, 'pressing down did not focus b');

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(_lastFocusedElement === buttonC, 'pressing down did not focus c');

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(_lastFocusedElement === buttonC, 'pressing down again did not stay on c');

    // Pressing up should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonB, 'pressing up did not focus b');

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonA, 'pressing up did not focus a');

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonA, 'pressing up again did not stay on a');

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    assert(_lastFocusedElement === buttonC, 'buttonC was not focused');

    // Pressing up should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonB, 'pressing up after clicking on c did not focus b');

    // Test that pressing horizontal buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(_lastFocusedElement === buttonB, 'pressing left did not keep focus on b');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(_lastFocusedElement === buttonB, 'pressing right did not keep focus on b');

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    assert(_lastFocusedElement === buttonA, 'pressing home did not move focus to a');

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    assert(_lastFocusedElement === buttonC, 'pressing end did not move focus to c');
  });

  it('can use arrows horizontally', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
        </FocusZone>
      </div>
    );
    let focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    let buttonA = focusZone.querySelector('.a') as HTMLElement;
    let buttonB = focusZone.querySelector('.b') as HTMLElement;
    let buttonC = focusZone.querySelector('.c') as HTMLElement;

    // Assign bounding locations to buttons.
    buttonA.getBoundingClientRect = () => ({
      left: 0, right: 30,
      top: 0, bottom: 100,
      width: 30,
      height: 100
    } as ClientRect);
    (buttonA as any).isVisible = true;
    buttonA.focus = () => ReactTestUtils.Simulate.focus(buttonA);

    buttonB.getBoundingClientRect = () => ({
      left: 30, right: 60,
      top: 0, bottom: 100,
      width: 30,
      height: 100
    } as ClientRect);
    (buttonB as any).isVisible = true;
    buttonB.focus = () => ReactTestUtils.Simulate.focus(buttonB);

    buttonC.getBoundingClientRect = () => ({
      left: 60, right: 90,
      top: 0, bottom: 100,
      width: 30,
      height: 100
    } as ClientRect);
    (buttonC as any).isVisible = true;
    buttonC.focus = () => ReactTestUtils.Simulate.focus(buttonC);

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(_lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(_lastFocusedElement === buttonB, 'pressing right did not focus b');

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(_lastFocusedElement === buttonC, 'pressing right did not focus c');

    // Pressing right should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(_lastFocusedElement === buttonC, 'pressing right again did not stay on c');

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(_lastFocusedElement === buttonB, 'pressing left did not focus b');

    // Pressing left should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(_lastFocusedElement === buttonA, 'pressing left did not focus a');

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(_lastFocusedElement === buttonA, 'pressing left again did not stay on a');

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    assert(_lastFocusedElement === buttonC, 'buttonC was not focused');

    // Pressing left should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(_lastFocusedElement === buttonB, 'pressing left after clicking on c did not focus b');

    // Test that pressing vertical buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonB, 'pressing up did not keep focus on b');

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(_lastFocusedElement === buttonB, 'pressing down did not keep focus on b');

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    assert(_lastFocusedElement === buttonA, 'pressing home did not move focus to a');

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    assert(_lastFocusedElement === buttonC, 'pressing end did not move focus to c');
  });

  it('can use arrows bidirectionally', () => {
    let component = ReactTestUtils.renderIntoDocument(
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
    let focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    let buttonA = focusZone.querySelector('.a') as HTMLElement;
    let buttonB = focusZone.querySelector('.b') as HTMLElement;
    let buttonC = focusZone.querySelector('.c') as HTMLElement;
    let hiddenButton = focusZone.querySelector('.hidden') as HTMLElement;
    let buttonD = focusZone.querySelector('.d') as HTMLElement;
    let buttonE = focusZone.querySelector('.e') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C hiddenButton
    // D E
    //
    // We will iterate from A to B, press down to skip hidden and go to C,
    // down again to E, left to D, then back up to A.
    buttonA.getBoundingClientRect = () => ({
      left: 0, right: 20,
      top: 0, bottom: 20,
      width: 20,
      height: 20
    } as ClientRect);
    (buttonA as any).isVisible = true;
    buttonA.focus = () => ReactTestUtils.Simulate.focus(buttonA);

    buttonB.getBoundingClientRect = () => ({
      left: 20, right: 40,
      top: 0, bottom: 20,
      width: 20,
      height: 20
    } as ClientRect);
    (buttonB as any).isVisible = true;
    buttonB.focus = () => ReactTestUtils.Simulate.focus(buttonB);

    buttonC.getBoundingClientRect = () => ({
      left: 0, right: 20,
      top: 20, bottom: 40,
      width: 20,
      height: 20
    } as ClientRect);
    (buttonC as any).isVisible = true;
    buttonC.focus = () => ReactTestUtils.Simulate.focus(buttonC);

    // hidden button should be ignored.
    hiddenButton.getBoundingClientRect = () => ({
      left: 2, right: 40,
      top: 20, bottom: 40,
      width: 20,
      height: 20
    } as ClientRect);
    hiddenButton.hidden = true;
    hiddenButton.focus = () => ReactTestUtils.Simulate.focus(hiddenButton);

    buttonD.getBoundingClientRect = () => ({
      left: 0, right: 20,
      top: 40, bottom: 60,
      width: 20,
      height: 20
    } as ClientRect);
    (buttonD as any).isVisible = true;
    buttonD.focus = () => ReactTestUtils.Simulate.focus(buttonD);

    buttonE.getBoundingClientRect = () => ({
      left: 20, right: 40,
      top: 40, bottom: 60,
      width: 20,
      height: 20
    } as ClientRect);
    (buttonE as any).isVisible = true;
    buttonE.focus = () => ReactTestUtils.Simulate.focus(buttonE);

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    assert(_lastFocusedElement === buttonA, 'buttonA was not focused');

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    assert(_lastFocusedElement === buttonB, 'pressing right did not focus b');

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(_lastFocusedElement === buttonC, 'pressing down did not focus c');

    // Pressing down should go to e.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    assert(_lastFocusedElement === buttonE, 'pressing down did not focus e');

    // Pressing left should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    assert(_lastFocusedElement === buttonD, 'pressing left did not focus d');

    // Pressing up should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonC, 'pressing up did not focus c');

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    assert(_lastFocusedElement === buttonA, 'pressing up did not focus a');
  });
});
