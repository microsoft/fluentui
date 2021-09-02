/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes } from '../../Utilities';

import { FocusZone } from './FocusZone';
import { FocusZoneDirection, FocusZoneTabbableElements } from './FocusZone.types';

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

    element.setAttribute('data-is-visible', String(isVisible));

    element.focus = () => ReactTestUtils.Simulate.focus(element);
  }

  beforeEach(() => {
    lastFocusedElement = undefined;
  });

  it('renders FocusZone correctly with no props', () => {
    const component = renderer.create(<FocusZone />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FocusZone correctly with aria-describedby and aria-labelledby', () => {
    const component = renderer.create(<FocusZone aria-describedby='customDescribedBy' aria-labelledby='customLabelledBy' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonB);

    // Test that pressing horizontal buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    expect(lastFocusedElement).toBe(buttonA);

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('can ignore arrowing if default is prevented', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone direction={ FocusZoneDirection.vertical }>
          <button className='a'>a</button>
          <button className='b'>b</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;

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

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down, isDefaultPrevented: () => true } as any);
    expect(lastFocusedElement).toBe(buttonA);
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
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing right should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing left should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonA);

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonB);

    // Test that pressing vertical buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonB);

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    expect(lastFocusedElement).toBe(buttonA);

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    expect(lastFocusedElement).toBe(buttonC);
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
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should go to e.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonE);

    // Pressing left should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing up should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('can use arrows bidirectionally with data-no-vertical-wrap', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone checkForNoWrap={ true } data-no-vertical-wrap={ true }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
          <button className='d'>d</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;
    const buttonD = focusZone.querySelector('.d') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C D
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

    setupElement(buttonD, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 40
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing down stay on d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing right stay on d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing left should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing up should stay on b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('can use arrows bidirectionally with data-no-horizontal-wrap', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone checkForNoWrap={ true } data-no-horizontal-wrap={ true }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
          <button className='d'>d</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;
    const buttonD = focusZone.querySelector('.d') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C D
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

    setupElement(buttonD, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 40
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should stay on b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing down stay on d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing right stay on d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing left should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing left should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('can use arrows bidirectionally with data-no-horizontal-wrap and data-no-vertical-wrap', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone checkForNoWrap={ true } data-no-horizontal-wrap={ true } data-no-vertical-wrap={ true }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
          <button className='d'>d</button>
        </FocusZone>
      </div>
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;
    const buttonD = focusZone.querySelector('.d') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C D
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

    setupElement(buttonD, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 40
      }
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should stay on b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing up should stay on b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing down stay on d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing right stay on d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing left should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);
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
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('skips subzone elements until manually entered', () => {
    const isInnerZoneKeystroke = (e: React.KeyboardEvent<HTMLElement>): boolean =>
      e.which === KeyCodes.enter;

    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone
          direction={ FocusZoneDirection.horizontal }
          isInnerZoneKeystroke={ isInnerZoneKeystroke }
        >
          <button className='a'>a</button>
          <div
            className='b'
            data-is-focusable={ true }
            data-is-sub-focuszone={ true }
          >
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
    expect(lastFocusedElement).toBe(buttonA);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(divB, { which: KeyCodes.enter });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(divB);
  });

  it('skips child focusZone elements until manually entered', () => {
    const isInnerZoneKeystroke = (e: React.KeyboardEvent<HTMLElement>): boolean =>
      e.which === KeyCodes.enter;

    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <FocusZone
          direction={ FocusZoneDirection.horizontal }
          isInnerZoneKeystroke={ isInnerZoneKeystroke }
        >
          <button className='a'>a</button>
          <FocusZone
            direction={ FocusZoneDirection.horizontal }
            className='b'
            data-is-focusable={ true }
          >
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
    expect(lastFocusedElement).toBe(buttonA);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(divB, { which: KeyCodes.enter });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(divB);
  });

  it('Focus first tabbable element, when active element is dynamically disabled', () => {
    let focusZone: FocusZone | null = null;
    let buttonA: any;
    let buttonB: any;
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus } }>
        <textarea className='t' />
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
    expect(lastFocusedElement).toBe(buttonA);

    buttonA.disabled = true;

    // Focus the text area, outside focus zone.
    ReactTestUtils.Simulate.focus(textArea);
    expect(lastFocusedElement).toBe(textArea);

    // ButtonB should be focussed.
    focusZone!.focus();
    expect(lastFocusedElement).toBe(buttonB);
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
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZoneElement, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);

    // Clicking on A should enable its tab-index and disable others.
    // But it doesn't set focus (browser will do it in the default event handler)
    ReactTestUtils.Simulate.mouseDown(buttonAElement);
    expect(lastFocusedElement).toBe(buttonB);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
  });

  it('Changes our focus to the next button when we hit tab when focus zone allow tabbing', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener } }>
        <FocusZone { ...{ handleTabKey: FocusZoneTabbableElements.all, isCircularNavigation: true } }>
          <button className='a'>a</button>
          <button className='b'>b</button>
          <button className='c'>c</button>
        </FocusZone>
      </div >
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

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
        top: 0,
        bottom: 20,
        left: 40,
        right: 60
      }
    });

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(-1);

    // Pressing tab will shift focus to button B
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.tab });
    expect(lastFocusedElement).toBe(buttonB);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
    expect(buttonC.tabIndex).toBe(-1);

    // Pressing tab will shift focus to button C
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.tab });
    expect(lastFocusedElement).toBe(buttonC);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(0);

    // Pressing tab on our final element will shift focus back to our first element A
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.tab });
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(-1);

    // FocusZone stops propagation of our tab when we enable tab handling
    expect(tabDownListener.mock.calls.length).toBe(0);
  });

  it('detects tab when our focus zone does not allow tabbing', () => {
    const tabDownListener = jest.fn();

    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener } }>
        <FocusZone>
          <button className='a'>a</button>
        </FocusZone>
      </div >
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20
      }
    });

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);
    expect(buttonA.tabIndex).toBe(0);

    // Pressing tab when our focus zone doesn't allow tabbing will allow us to propagate our tab to our key down event handler
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.tab });
    expect(tabDownListener.mock.calls.length).toBe(1);
    const onKeyDownEvent = tabDownListener.mock.calls[0][0];
    expect(onKeyDownEvent.which).toBe(KeyCodes.tab);
  });

  it('should stay in input box with arrow keys and exit with tab', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener } }>
        <FocusZone { ...{ handleTabKey: FocusZoneTabbableElements.inputOnly, isCircularNavigation: false } }>
          <input type='text' className='a' />
          <button className='b'>b</button>
        </FocusZone>
      </div >
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const inputA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;

    setupElement(inputA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
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

    // InputA should be focused.
    inputA.focus();
    expect(lastFocusedElement).toBe(inputA);

    // When we hit right/left on the arrow key, we don't want to be able to leave focus on an input
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(inputA);

    expect(inputA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);

    // Pressing tab will be the only way for us to exit the focus zone
    ReactTestUtils.Simulate.keyDown(inputA, { which: KeyCodes.tab });
    expect(lastFocusedElement).toBe(buttonB);
    expect(inputA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
  });

  it('focus should leave input box when arrow keys are pressed when tabbing is supported but shouldInputLoseFocusOnArrowKey callback method return true', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div { ...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener } }>
        <FocusZone { ...{ handleTabKey: FocusZoneTabbableElements.all, isCircularNavigation: false, shouldInputLoseFocusOnArrowKey: (element) => { return true; } } }>
          <input type='text' className='a' />
          <button className='b'>b</button>
        </FocusZone>
      </div >
    );

    const focusZone = ReactDOM.findDOMNode(component as React.ReactInstance).firstChild as Element;

    const inputA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;

    setupElement(inputA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40
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

    // InputA should be focused.
    inputA.focus();
    expect(lastFocusedElement).toBe(inputA);

    // Pressing arrow down, input should loose the focus and the button should get the focus
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonB);
    expect(inputA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
  });
});