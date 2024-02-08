import {
  FocusZoneDirection,
  FocusZoneTabbableElements,
  IS_FOCUSABLE_ATTRIBUTE,
  getCode,
  keyboardKey,
} from '@fluentui/accessibility';
import { FocusZone } from '@fluentui/react-bindings';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import { createTestContainer } from './test-utils';

describe('FocusZone', () => {
  let lastFocusedElement: HTMLElement | undefined;
  let host: HTMLElement;

  function onFocus(ev: any): void {
    lastFocusedElement = ev.target;
  }

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
  }

  beforeEach(() => {
    lastFocusedElement = undefined;
  });

  afterEach(() => {
    if (host) {
      ReactDOM.unmountComponentAtNode(host);
      (host as any) = undefined;
    }
  });

  it('can use arrows vertically', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <button id="a">a</button>
          <button id="b">b</button>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 100,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 0,
        right: 100,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 60,
        bottom: 90,
        left: 0,
        right: 100,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonA);

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonB);

    // Test that pressing horizontal buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonB);

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Home });
    expect(lastFocusedElement).toBe(buttonA);

    // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.End });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('can ignore arrowing if default is prevented', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <button id="a">a</button>
          <button id="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 100,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 0,
        right: 100,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, {
      which: keyboardKey.ArrowDown,
      isDefaultPrevented: () => true,
    } as any);
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('can use arrows horizontally', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <button id="a">a</button>
          <button id="b">b</button>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 100,
        left: 0,
        right: 30,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 100,
        left: 30,
        right: 60,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 100,
        left: 60,
        right: 90,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing right should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing left should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonA);

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonB);

    // Test that pressing vertical buttons don't move focus.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonB);

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Home });
    expect(lastFocusedElement).toBe(buttonA);

    // // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.End });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('can use arrows bidirectionally', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone>
          <button id="a">a</button>
          <button id="b">b</button>
          <button id="c">c</button>
          <button id="hidden">hidden</button>
          <button id="d">d</button>
          <button id="e">e</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;
    const hiddenButton = focusZone.querySelector('#hidden') as HTMLElement;
    const buttonD = focusZone.querySelector('#d') as HTMLElement;
    const buttonE = focusZone.querySelector('#e') as HTMLElement;

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
        right: 30,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 0,
        right: 20,
      },
    });

    // hidden button should be ignored.
    setupElement(hiddenButton, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 2,
        right: 40,
      },
      isVisible: false,
    });

    setupElement(buttonD, {
      clientRect: {
        top: 40,
        bottom: 60,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonE, {
      clientRect: {
        top: 40,
        bottom: 60,
        left: 20,
        right: 40,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing left should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing down should go to e.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonE);

    // Pressing up should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('can use arrows bidirectionally by following DOM order', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.bidirectionalDomOrder}>
          <button id="a">a</button>
          <button id="b">b</button>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

    // Assign bounding locations to buttons.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 30,
        left: 0,
        right: 100,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 30,
        bottom: 60,
        left: 0,
        right: 100,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 60,
        bottom: 90,
        left: 0,
        right: 100,
      },
    });

    // Pressing down/right arrow keys moves focus to the next focusable item.
    // Pressing up/left arrow keys moves focus to the previous focusable item.

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing left should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonA);

    // Click on c to focus it.
    ReactTestUtils.Simulate.focus(buttonC);
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing left should move to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonB);

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Home });
    expect(lastFocusedElement).toBe(buttonA);

    // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.End });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('can reset alignment on mouse down', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone>
          <button id="a">a</button>
          <button id="b">b</button>
          <button id="c">c</button>
          <button id="d">d</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;
    const buttonD = focusZone.querySelector('#d') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C D
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonD, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 40,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing up should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should stay on a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonD);

    // Mousing down on a should reset alignment to a.
    ReactTestUtils.Simulate.mouseDown(focusZone, { target: buttonA });

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('correctly skips data-not-focusable elements', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone>
          <button id="a">a</button>
          <button id="b" data-not-focusable={false}>
            b
          </button>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

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
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 0,
        right: 20,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('skips subzone elements until manually entered', () => {
    const shouldEnterInnerZone = (e: React.KeyboardEvent<HTMLElement>): boolean => getCode(e) === keyboardKey.Enter;
    const isFocusableProperty = { [IS_FOCUSABLE_ATTRIBUTE]: true };

    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal} shouldEnterInnerZone={shouldEnterInnerZone}>
          <button id="a">a</button>
          <div id="b" data-is-sub-focuszone={true} {...isFocusableProperty}>
            <button id="bsub">bsub</button>
          </div>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const divB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

    const buttonB = focusZone.querySelector('#bsub') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(divB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 5,
        bottom: 15,
        left: 25,
        right: 35,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(divB, { which: keyboardKey.Enter });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(divB);
  });

  it('skips child focusZone elements until manually entered', () => {
    const shouldEnterInnerZone = (e: React.KeyboardEvent<HTMLElement>): boolean => getCode(e) === keyboardKey.Enter;
    const isFocusableProperty = { [IS_FOCUSABLE_ATTRIBUTE]: true };

    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal} shouldEnterInnerZone={shouldEnterInnerZone}>
          <button id="a">a</button>
          <FocusZone direction={FocusZoneDirection.horizontal} id="b" {...isFocusableProperty}>
            <button id="bsub">bsub</button>
          </FocusZone>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const divB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

    const buttonB = focusZone.querySelector('#bsub') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(divB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 5,
        bottom: 15,
        left: 25,
        right: 35,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(divB);

    ReactTestUtils.Simulate.keyDown(divB, { which: keyboardKey.Enter });
    expect(lastFocusedElement).toBe(buttonB);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(buttonC);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(divB);
  });

  it('Focus first tabbable element, when active element is dynamically disabled', () => {
    let focusZone: FocusZone | null = null;
    let buttonA: any;
    let buttonB: any;
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <textarea id="t" />
        <FocusZone
          ref={focus => {
            focusZone = focus;
          }}
        >
          <button
            id="a"
            ref={button => {
              buttonA = button;
            }}
          >
            a
          </button>
          <button
            id="b"
            ref={button => {
              buttonB = button;
            }}
          >
            b
          </button>
        </FocusZone>
      </div>,
    );

    const rootNode = ReactDOM.findDOMNode(component) as Element;
    const textArea = rootNode.children[0];

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
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
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone
          ref={focus => {
            focusZone = focus;
          }}
        >
          <button
            id="a"
            ref={button => {
              buttonA = button;
            }}
          >
            a
          </button>
          <button
            id="b"
            ref={button => {
              buttonB = button;
            }}
          >
            b
          </button>
        </FocusZone>
      </div>,
    );

    const focusZoneElement = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonAElement = focusZoneElement.querySelector('#a') as HTMLElement;

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
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    // ButtonA should be focussed.
    focusZone.focus();
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);

    // Pressing right should go to b.
    ReactTestUtils.Simulate.keyDown(focusZoneElement, { which: keyboardKey.ArrowRight });
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
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus, onKeyDown: tabDownListener }}>
        <FocusZone {...{ handleTabKey: FocusZoneTabbableElements.all, isCircularNavigation: true }}>
          <button id="a">a</button>
          <button id="b">b</button>
          <button id="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;
    const buttonC = focusZone.querySelector('#c') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60,
      },
    });

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(-1);

    // Pressing tab will shift focus to button B
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Tab });
    expect(lastFocusedElement).toBe(buttonB);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
    expect(buttonC.tabIndex).toBe(-1);

    // Pressing tab will shift focus to button C
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Tab });
    expect(lastFocusedElement).toBe(buttonC);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(0);

    // Pressing tab on our final element will shift focus back to our first element A
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Tab });
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(-1);

    // FocusZone stops propagation of our tab when we enable tab handling
    expect(tabDownListener.mock.calls.length).toBe(0);
  });

  it('detects tab when our focus zone does not allow tabbing', () => {
    const tabDownListener = jest.fn();

    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus, onKeyDown: tabDownListener }}>
        <FocusZone>
          <button id="a">a</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);
    expect(buttonA.tabIndex).toBe(0);

    // Pressing tab when our focus zone doesn't allow tabbing will allow us to propagate our tab to our key down event handler
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Tab });
    expect(tabDownListener.mock.calls.length).toBe(1);
    const onKeyDownEvent = tabDownListener.mock.calls[0][0];
    expect(getCode(onKeyDownEvent)).toBe(keyboardKey.Tab);
  });

  it('should stay in input box with arrow keys and exit with tab', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus, onKeyDown: tabDownListener }}>
        <FocusZone {...{ handleTabKey: FocusZoneTabbableElements.inputOnly, isCircularNavigation: false }}>
          <input type="text" id="a" />
          <button id="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const inputA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;

    setupElement(inputA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    // InputA should be focused.
    inputA.focus();
    expect(lastFocusedElement).toBe(inputA);

    // When we hit right/left on the arrow key, we don't want to be able to leave focus on an input
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    expect(lastFocusedElement).toBe(inputA);

    expect(inputA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);

    // Pressing tab will be the only way for us to exit the focus zone
    ReactTestUtils.Simulate.keyDown(inputA, { which: keyboardKey.Tab });
    expect(lastFocusedElement).toBe(buttonB);
    expect(inputA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
  });

  it('focus should leave input box when arrow keys are pressed when tabbing is supported but shouldInputLoseFocusOnArrowKey callback method return true', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus, onKeyDown: tabDownListener }}>
        <FocusZone
          {...{
            handleTabKey: FocusZoneTabbableElements.all,
            isCircularNavigation: false,
            shouldInputLoseFocusOnArrowKey: () => {
              return true;
            },
          }}
        >
          <input type="text" id="a" />
          <button id="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const inputA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;

    setupElement(inputA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    // InputA should be focused.
    inputA.focus();
    expect(lastFocusedElement).toBe(inputA);

    // Pressing arrow down, input should loose the focus and the button should get the focus
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonB);
    expect(inputA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
  });

  it('should force focus to first focusable element when FocusZone container receives focus and shouldFocusInnerElementWhenReceivedFocus is set to "true"', () => {
    const shouldEnterInnerZone = (e: React.KeyboardEvent<HTMLElement>): boolean => getCode(e) === keyboardKey.Enter;
    const isFocusableProperty = { [IS_FOCUSABLE_ATTRIBUTE]: true };

    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal} shouldEnterInnerZone={shouldEnterInnerZone}>
          <button id="a">a</button>
          <FocusZone
            direction={FocusZoneDirection.horizontal}
            id="b"
            shouldFocusInnerElementWhenReceivedFocus={true}
            {...isFocusableProperty}
          >
            <button id="bsub">bsub</button>
          </FocusZone>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const divB = focusZone.querySelector('#b') as HTMLElement;

    const buttonB = focusZone.querySelector('#bsub') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(divB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 5,
        bottom: 15,
        left: 25,
        right: 35,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowRight });
    // Focus goes to FocusZone container, which forces focus to first focusable element - buttonB
    expect(lastFocusedElement).toBe(buttonB);
  });

  it('can use arrows bidirectionally in RTL', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone isRtl={true}>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="hidden">hidden</button>
          <button className="d">d</button>
          <button className="e">e</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;
    const hiddenButton = focusZone.querySelector('.hidden') as HTMLElement;
    const buttonD = focusZone.querySelector('.d') as HTMLElement;
    const buttonE = focusZone.querySelector('.e') as HTMLElement;

    // Set up a grid like so:
    // B A
    // hiddenButton C
    // E D
    //
    // We will iterate from A to B, press down to skip hidden and go to C,
    // down again to E, right to D, up to C, then back up to A.
    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 30,
        right: 0,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 60,
        right: 30,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 0,
      },
    });

    // hidden button should be ignored.
    setupElement(hiddenButton, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 30,
        right: 20,
      },
      isVisible: false,
    });

    setupElement(buttonD, {
      clientRect: {
        top: 40,
        bottom: 60,
        left: 25,
        right: 0,
      },
    });

    setupElement(buttonE, {
      clientRect: {
        top: 40,
        bottom: 60,
        left: 40,
        right: 25,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing left should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing right should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowDown });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing down should go to e.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowLeft });
    expect(lastFocusedElement).toBe(buttonE);

    // Pressing up should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.ArrowUp });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('updates tabindexes when element is focused programaticaly', () => {
    const tabDownListener = jest.fn();

    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus, onKeyDown: tabDownListener }}>
        <FocusZone>
          <button id="a">a</button>
          <button id="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);
    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);

    // ButtonB should be focussed and tabindex=0
    ReactTestUtils.Simulate.focus(buttonB);
    expect(lastFocusedElement).toBe(buttonB);
    expect(buttonB.tabIndex).toBe(0);
    expect(buttonA.tabIndex).toBe(-1);
  });

  it('remains focus in element with "contenteditable=true" attribute on Home/End keys', () => {
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone>
          <div contentEditable={true} id="a" />
          <button id="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;

    const contentEditableA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;

    setupElement(contentEditableA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    // contentEditableA should be focused.
    contentEditableA.focus();
    expect(lastFocusedElement).toBe(contentEditableA);

    ReactTestUtils.Simulate.keyDown(contentEditableA, { which: keyboardKey.Home });
    expect(lastFocusedElement).toBe(contentEditableA);
    ReactTestUtils.Simulate.keyDown(contentEditableA, { which: keyboardKey.End });
    expect(lastFocusedElement).toBe(contentEditableA);

    // change focus to buttonB
    buttonB.focus();
    expect(lastFocusedElement).toBe(buttonB);
  });

  it('should call onKeyDown handler even within another FocusZone', () => {
    const keyDownHandler = jest.fn();

    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone>
          <FocusZone className="innerFocusZone" onKeyDown={keyDownHandler} data-is-focusable={true}>
            Inner Focus Zone
          </FocusZone>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const innerFocusZone = focusZone.querySelector('.innerFocusZone') as HTMLElement;
    ReactTestUtils.Simulate.keyDown(innerFocusZone, { which: keyboardKey.Enter });

    expect(keyDownHandler).toBeCalled();
  });

  it('can call onActiveItemChanged when the active item is changed', () => {
    let called = false;
    const component = ReactTestUtils.renderIntoDocument<{}, React.Component>(
      <FocusZone onActiveElementChanged={() => (called = true)}>
        <button key="a" id="a" data-is-visible="true">
          button a
        </button>
        <button key="b" id="b" data-is-visible="true">
          button b
        </button>
      </FocusZone>,
    );
    const focusZone = ReactDOM.findDOMNode(component)!.firstChild as Element;
    const buttonA = focusZone.querySelector('#a') as HTMLElement;
    const buttonB = focusZone.querySelector('#b') as HTMLElement;

    ReactTestUtils.Simulate.mouseDown(focusZone, { target: buttonA });
    ReactTestUtils.Simulate.focus(focusZone, { target: buttonA });

    expect(called).toEqual(true);
    called = false;

    ReactTestUtils.Simulate.mouseDown(focusZone, { target: buttonB });
    ReactTestUtils.Simulate.focus(focusZone, { target: buttonB });

    expect(called).toEqual(true);
    called = false;
  });

  it('only adds outerzones to be updated for tab changes', () => {
    const activeZones = FocusZone.outerZones.getOutZone(window)?.size || 0;

    host = document.createElement('div');

    // Render component without button A.
    ReactDOM.render(
      <FocusZone>
        <FocusZone>
          <button>ok</button>
        </FocusZone>
      </FocusZone>,
      host,
    );

    expect(FocusZone.outerZones.getOutZone(window)?.size).toEqual(activeZones + 1);

    ReactDOM.unmountComponentAtNode(host);

    expect(FocusZone.outerZones.getOutZone(window)?.size).toEqual(activeZones);
  });

  describe('restores focus', () => {
    it('to the following item when item removed', () => {
      const { testContainer, removeTestContainer } = createTestContainer();

      ReactDOM.render(
        <FocusZone>
          <button key="a" id="a" data-is-visible="true">
            button a
          </button>
          <button key="b" id="b" data-is-visible="true">
            button b
          </button>
          <button key="c" id="c" data-is-visible="true">
            button c
          </button>
        </FocusZone>,
        testContainer,
      );

      const buttonB = testContainer.querySelector('#b') as HTMLElement;

      buttonB.focus();

      // Render component without button B.
      ReactDOM.render(
        <FocusZone>
          <button key="a" id="a" data-is-visible="true">
            button a
          </button>
          <button key="c" id="c" data-is-visible="true">
            button c
          </button>
        </FocusZone>,
        testContainer,
      );

      expect(document.activeElement).toBe(testContainer.querySelector('#c'));

      removeTestContainer();
    });

    it('can restore focus to the previous item when end item removed', () => {
      const { testContainer, removeTestContainer } = createTestContainer();

      ReactDOM.render(
        <FocusZone>
          <button key="a" id="a" data-is-visible="true">
            button a
          </button>
          <button key="b" id="b" data-is-visible="true">
            button b
          </button>
          <button key="c" id="c" data-is-visible="true">
            button c
          </button>
        </FocusZone>,
        testContainer,
      );

      const buttonC = testContainer.querySelector('#c') as HTMLElement;

      buttonC.focus();

      // Render component without button C.
      ReactDOM.render(
        <FocusZone>
          <button key="a" id="a" data-is-visible="true">
            button a
          </button>
          <button key="b" id="b" data-is-visible="true">
            button b
          </button>
        </FocusZone>,
        testContainer,
      );

      expect(document.activeElement).toBe(testContainer.querySelector('#b'));

      removeTestContainer();
    });
  });

  describe('parking and unparking', () => {
    let buttonA: HTMLElement;

    function setup() {
      const { testContainer, removeTestContainer } = createTestContainer();

      ReactDOM.render(
        <div>
          <button key="z" id="z" data-is-visible="true" />
          <FocusZone id="fz">
            <button key="a" id="a" data-is-visible="true">
              button a
            </button>
          </FocusZone>
        </div>,
        testContainer,
      );
      buttonA = testContainer.querySelector('#a') as HTMLElement;
      buttonA.focus();

      // Render component without button A.
      ReactDOM.render(
        <div>
          <button key="z" id="z" data-is-visible="true" />
          <FocusZone id="fz" />
        </div>,
        testContainer,
      );

      return { testContainer, removeTestContainer };
    }

    // beforeEach(() => {
    //   host = document.createElement('div');
    // });

    it('can move focus to container when last item removed', () => {
      const { removeTestContainer, testContainer } = setup();

      expect(document.activeElement).toBe(testContainer.querySelector('#fz'));

      removeTestContainer();
    });

    it('can move focus from container to first item when added', () => {
      const { removeTestContainer, testContainer } = setup();

      ReactDOM.render(
        <div>
          <button key="z" id="z" />
          <FocusZone id="fz">
            <button key="a" id="a" data-is-visible="true">
              button a
            </button>
          </FocusZone>
        </div>,
        testContainer,
      );
      expect(document.activeElement).toBe(testContainer.querySelector('#a'));

      removeTestContainer();
    });

    it('removes focusability when moving from focused container', () => {
      const { removeTestContainer, testContainer } = setup();

      expect(testContainer.querySelector('#fz')!.getAttribute('tabindex')).toEqual('-1');
      (testContainer.querySelector('#z') as HTMLElement).focus();
      expect(testContainer.querySelector('#fz')!.getAttribute('tabindex')).toBeNull();

      removeTestContainer();
    });

    it('does not move focus when items added without container focus', () => {
      const { removeTestContainer, testContainer } = setup();

      expect(testContainer.querySelector('#fz')!.getAttribute('tabindex')).toEqual('-1');
      (testContainer.querySelector('#z') as HTMLElement).focus();

      ReactDOM.render(
        <div>
          <button key="z" id="z" />
          <FocusZone id="fz">
            <button key="a" id="a" data-is-visible="true">
              button a
            </button>
          </FocusZone>
        </div>,
        testContainer,
      );
      expect(document.activeElement).toBe(testContainer.querySelector('#z'));

      removeTestContainer();
    });
  });

  it('Handles focus moving to different targets in focus zone following DOM order and allowing tabbing', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: onFocus, onKeyDown: tabDownListener }}>
        <FocusZone direction={FocusZoneDirection.bidirectionalDomOrder} handleTabKey={FocusZoneTabbableElements.all}>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60,
      },
    });

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(-1);

    // Pressing tab will shift focus to button B
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Tab });
    expect(lastFocusedElement).toBe(buttonB);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
    expect(buttonC.tabIndex).toBe(-1);

    // Pressing tab will shift focus to button C
    ReactTestUtils.Simulate.keyDown(focusZone, { which: keyboardKey.Tab });
    expect(lastFocusedElement).toBe(buttonC);

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(0);

    // FocusZone stops propagation of our tab when we enable tab handling
    expect(tabDownListener.mock.calls.length).toBe(0);
  });

  it('Focuses the last element in the FocusZone when the imperative focusLast method is used', () => {
    const focusZoneRef = React.createRef<FocusZone>();
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: onFocus }}>
        <FocusZone
          ref={focusZoneRef}
          direction={FocusZoneDirection.bidirectionalDomOrder}
          handleTabKey={FocusZoneTabbableElements.all}
        >
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(buttonB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60,
      },
    });

    // ButtonA should be focussed.
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    expect(buttonA.tabIndex).toBe(0);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(-1);

    // ButtonC should be focused
    expect(focusZoneRef).not.toBeUndefined();
    focusZoneRef.current!.focusLast();

    expect(buttonA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(-1);
    expect(buttonC.tabIndex).toBe(0);
  });

  it('Update tabIndex when FocusZone is changed before focused', () => {
    const { testContainer, removeTestContainer } = createTestContainer();

    // Prepare test component
    // The test component is a 'Add' button + FocusZone.
    // Initially there're 2 buttons in FocusZone. Click on the 'Add' button adds a 3rd button in focusZone.
    // context and memo is used to make sure FocusZone component does not re-render during the process.
    const ShowButton3Context = React.createContext(false);

    const Button3 = () => {
      const showButton3 = React.useContext(ShowButton3Context);
      return showButton3 ? (
        <button className="button-in-zone" id="button-3">
          added button 3
        </button>
      ) : null;
    };

    const getDefaultTabbableElement = () => {
      const buttons = document.body.getElementsByClassName('button-in-zone');
      return buttons[buttons.length - 1] as HTMLElement;
    };
    const FocusZoneMemo = React.memo(() => (
      <FocusZone shouldResetActiveElementWhenTabFromZone defaultTabbableElement={getDefaultTabbableElement}>
        <button className="button-in-zone">button 1</button>
        <button className="button-in-zone">button 2</button>
        <Button3 />
      </FocusZone>
    ));

    const TestComponent = () => {
      const [showButton3, setShowButton3] = React.useState(false);

      return (
        <ShowButton3Context.Provider value={showButton3}>
          <button id="add-button" onClick={() => setShowButton3(true)}>
            Add
          </button>
          <FocusZoneMemo />
        </ShowButton3Context.Provider>
      );
    };
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestComponent />, testContainer);
    });

    // Start test
    const addButton = document.getElementById('add-button') as HTMLElement;
    expect(addButton).toBeTruthy();

    ReactTestUtils.Simulate.click(addButton);
    const button3 = document.getElementById('button-3') as HTMLElement;
    expect(button3).toBeTruthy();

    // expect tabIndex is recalculated on keydown, button3 now is the default focusable item in FocusZone
    // (I used dispatchEvent instead of ReactTestUtils.Simulate.keydown because ReactTestUtils doesn't trigger _onKeyDownCapture in focusZone)
    addButton.dispatchEvent(new KeyboardEvent('keydown', { which: keyboardKey.Tab } as KeyboardEventInit));
    expect(button3.getAttribute('tabindex')).toBe('0');

    removeTestContainer();
  });

  it('has data-tabster=uncontrolled', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <FocusZone>
        <button>Button</button>
      </FocusZone>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance) as Element;

    expect(focusZone.getAttribute('data-tabster')).toBe('{"uncontrolled": {}}');
  });
});
