import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import { getCode, EnterKey } from '@fluentui/keyboard-key';
import { setRTL, KeyCodes, resetIds } from '@fluentui/utilities';
import { createTestContainer } from '@fluentui/test-utilities';

import { FocusZone } from './FocusZone';
import { FocusZoneDirection, FocusZoneTabbableElements } from './FocusZone.types';
import { isConformant } from '../../common/isConformant';
import type { IFocusZone } from './FocusZone.types';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('FocusZone', () => {
  let lastFocusedElement: HTMLElement | undefined;
  let testContainer: HTMLElement | undefined;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    lastFocusedElement = undefined;
    if (testContainer) {
      ReactDOM.unmountComponentAtNode(testContainer);
      testContainer.remove();
      testContainer = undefined;
    }
  });

  function _onFocus(ev: any): void {
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
    element.getBoundingClientRect = () => ({
      x: clientRect.left,
      y: clientRect.top,
      top: clientRect.top,
      left: clientRect.left,
      bottom: clientRect.bottom,
      right: clientRect.right,
      width: clientRect.right - clientRect.left,
      height: clientRect.bottom - clientRect.top,
      toJSON: () => clientRect,
    });

    element.setAttribute('data-is-visible', String(isVisible));

    element.focus = () => ReactTestUtils.Simulate.focus(element);
  }

  it('renders FocusZone correctly with no props', () => {
    const component = renderer.create(<FocusZone />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FocusZone correctly with aria-describedby and aria-labelledby', () => {
    const component = renderer.create(
      <FocusZone aria-describedby="customDescribedBy" aria-labelledby="customLabelledBy" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: FocusZone,
    displayName: 'FocusZone',
    disabledTests: [
      // There is no top level FocusZone.ts file.
      'has-top-level-file',
      'component-has-static-classnames-object',
    ],
    elementRefName: 'elementRef',
    testOptions: {
      'consistent-callback-names': { ignoreProps: ['onActiveElementChanged'] },
    },
  });

  it('can use arrows vertically', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

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

  it('can restore focus to the following item when item removed', () => {
    testContainer = createTestContainer();

    // Render component.
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

    // Render component without button A.
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
  });

  it('does not hold on to first element after it is removed', () => {
    testContainer = createTestContainer();

    let focusZone: FocusZone | null = null;
    // Render component.
    ReactDOM.render(
      <div key="-1">
        <button key="0" id="outer" data-is-visible="true">
          outer
        </button>
        <FocusZone key="fz" ref={focus => (focusZone = focus)}>
          <button key="a" id="a" data-is-visible="true">
            button a
          </button>
          <button key="b" id="b" data-is-visible="true">
            button b
          </button>
          <button key="c" id="c" data-is-visible="true">
            button c
          </button>
        </FocusZone>
      </div>,
      testContainer,
    );

    const buttonOuter = testContainer.querySelector('#outer') as HTMLElement;
    const buttonA = testContainer.querySelector('#a') as HTMLElement;
    buttonOuter.focus();

    // Render component without button A.
    ReactDOM.render(
      <div key="-1">
        <button key="0" id="outer" data-is-visible="true">
          outer
        </button>
        <FocusZone key="fz" ref={focus => (focusZone = focus)}>
          <button key="b" id="b" data-is-visible="true">
            button b
          </button>
          <button key="c" id="c" data-is-visible="true">
            button c
          </button>
        </FocusZone>
      </div>,
      testContainer,
    );

    expect(document.activeElement).toBe(testContainer.querySelector('#outer'));
    expect(focusZone!.activeElement).not.toBe(buttonA);
    expect(focusZone!.defaultFocusElement).not.toBe(buttonA);
  });

  it('does not hold on to focused element after it is removed', () => {
    testContainer = createTestContainer();

    let focusZone: FocusZone | null = null;
    // Render component.
    ReactDOM.render(
      <FocusZone key="fz" ref={focus => (focusZone = focus)}>
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

    const buttonA = testContainer.querySelector('#a') as HTMLElement;
    buttonA.focus();

    // Render component without button A.
    ReactDOM.render(
      <FocusZone key="fz" ref={focus => (focusZone = focus)}>
        <button key="b" id="b" data-is-visible="true">
          button b
        </button>
        <button key="c" id="c" data-is-visible="true">
          button c
        </button>
      </FocusZone>,
      testContainer,
    );

    expect(document.activeElement).toBe(testContainer.querySelector('#b'));
    expect(focusZone!.activeElement).not.toBe(buttonA);
    expect(focusZone!.defaultFocusElement).not.toBe(buttonA);
  });

  it('can restore focus to the previous item when end item removed', () => {
    testContainer = createTestContainer();

    // Render component.
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

    // Render component without button A.
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
  });

  it('only adds outerzones to be updated for tab changes', () => {
    const activeZones = FocusZone.getOuterZones();

    testContainer = createTestContainer();

    // Render component without button A.
    ReactDOM.render(
      <FocusZone>
        <FocusZone>
          <button>ok</button>
        </FocusZone>
      </FocusZone>,
      testContainer,
    );

    expect(FocusZone.getOuterZones()).toEqual(activeZones + 1);

    ReactDOM.unmountComponentAtNode(testContainer);

    expect(FocusZone.getOuterZones()).toEqual(activeZones);
  });

  it('can call onActiveItemChanged when the active item is changed', () => {
    let called = false;
    const component = ReactTestUtils.renderIntoDocument(
      <FocusZone onActiveElementChanged={() => (called = true)}>
        <button key="a" id="a" data-is-visible="true">
          button a
        </button>
        <button key="b" id="b" data-is-visible="true">
          button b
        </button>
      </FocusZone>,
    );
    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!!.firstChild as Element;
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

  describe('parking and unparking', () => {
    function setup() {
      testContainer = createTestContainer();

      // Render component.
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
      const buttonA = testContainer.querySelector('#a') as HTMLElement;
      buttonA.focus();

      // Render component without button A.
      ReactDOM.render(
        <div>
          <button key="z" id="z" data-is-visible="true" />
          <FocusZone id="fz" />
        </div>,
        testContainer,
      );

      return testContainer;
    }

    it('can move focus to container when last item removed', () => {
      testContainer = setup();

      expect(document.activeElement).toBe(testContainer.querySelector('#fz'));
    });

    it('can move focus from container to first item when added', () => {
      testContainer = setup();

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
    });

    it('removes focusability when moving from focused container', () => {
      testContainer = setup();

      expect(testContainer.querySelector('#fz')!.getAttribute('tabindex')).toEqual('-1');

      (testContainer.querySelector('#z') as HTMLElement).focus();

      expect(testContainer.querySelector('#fz')!.getAttribute('tabindex')).toBeNull();
    });

    it('does not move focus when items added without container focus', () => {
      testContainer = setup();

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
    });
  });

  it('can ignore arrowing if default is prevented', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <button className="a">a</button>
          <button className="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;

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
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down, isDefaultPrevented: () => true } as any);
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('can use arrows horizontally', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
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
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="hidden">hidden</button>
          <button className="d">d</button>
          <button className="e">e</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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
    // down again to E, left to D, up to C, then back up to A.
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

  it('can use arrows bidirectionally in RTL', () => {
    setRTL(true);
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="hidden">hidden</button>
          <button className="d">d</button>
          <button className="e">e</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should go to e.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonE);

    // Pressing right should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonD);

    // Pressing up should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);

    setRTL(false);
  });

  it('can focus correctly when receiving initial focus, bidirectionally', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="d">d</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;
    const buttonD = focusZone.querySelector('.d') as HTMLElement;

    // Set up a grid like so:
    // A B
    // C D
    //
    // We will focus B, and then down arrow, expecting D to be focused.

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

    setupElement(buttonD, {
      clientRect: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 40,
      },
    });

    // Focus the first button.
    ReactTestUtils.Simulate.focus(buttonB);
    expect(buttonA.getAttribute('tabindex')).toBe('-1');
    expect(buttonB.getAttribute('tabindex')).toBe('0');
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing down should go to d.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonD);
  });

  it('can use arrows bidirectionally with data-no-vertical-wrap', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone checkForNoWrap={true} data-no-vertical-wrap={true}>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="d">d</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone checkForNoWrap={true} data-no-horizontal-wrap={true}>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="d">d</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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

  it('can reset alignment on mouse down', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="d">d</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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

    // Mousing down on a should reset alignment to a.
    ReactTestUtils.Simulate.mouseDown(focusZone, { target: buttonA });

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('can use arrows bidirectionally with data-no-horizontal-wrap and data-no-vertical-wrap', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone checkForNoWrap={true} data-no-horizontal-wrap={true} data-no-vertical-wrap={true}>
          <button className="a">a</button>
          <button className="b">b</button>
          <button className="c">c</button>
          <button className="d">d</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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

  it('can use all arrows to move focus by following DOM order', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone direction={FocusZoneDirection.domOrder}>
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
    ReactTestUtils.Simulate.focus(buttonA);
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing down should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should stay on c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing up should go to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
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

    // Pressing up should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonB);

    // Pressing left should move to a.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(buttonA);

    // Pressing right should move to b.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(buttonB);

    // Press home should go to the first target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.home });
    expect(lastFocusedElement).toBe(buttonA);

    // Press end should go to the last target.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.end });
    expect(lastFocusedElement).toBe(buttonC);
  });

  it('correctly skips data-not-focusable elements', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone>
          <button className="a">a</button>
          <button className="b" data-not-focusable={false}>
            b
          </button>
          <button className="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonC);

    // Pressing down should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.up });
    expect(lastFocusedElement).toBe(buttonA);
  });

  it('skips subzone elements until manually entered', () => {
    const shouldEnterInnerZone = (e: React.KeyboardEvent<HTMLElement>): boolean => getCode(e) === EnterKey;

    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal} shouldEnterInnerZone={shouldEnterInnerZone}>
          <button className="a">a</button>
          <div className="b" data-is-focusable={true} data-is-sub-focuszone={true}>
            <button className="bsub">bsub</button>
          </div>
          <button className="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const divB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    const buttonB = focusZone.querySelector('.bsub') as HTMLElement;

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
    const shouldEnterInnerZone = (e: React.KeyboardEvent<HTMLElement>): boolean => getCode(e) === EnterKey;

    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone direction={FocusZoneDirection.horizontal} shouldEnterInnerZone={shouldEnterInnerZone}>
          <button className="a">a</button>
          <FocusZone direction={FocusZoneDirection.horizontal} className="b" data-is-focusable={true}>
            <button className="bsub">bsub</button>
          </FocusZone>
          <button className="c">c</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;
    const divB = focusZone.querySelector('.b') as HTMLElement;
    const buttonC = focusZone.querySelector('.c') as HTMLElement;

    const buttonB = focusZone.querySelector('.bsub') as HTMLElement;

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
      <div {...{ onFocusCapture: _onFocus }}>
        <textarea className="t" />
        <FocusZone
          ref={focus => {
            focusZone = focus;
          }}
        >
          <button
            className="a"
            ref={button => {
              buttonA = button;
            }}
          >
            a
          </button>
          <button
            className="b"
            ref={button => {
              buttonB = button;
            }}
          >
            b
          </button>
        </FocusZone>
      </div>,
    );

    const rootNode = ReactDOM.findDOMNode(component as unknown as React.ReactInstance) as Element;
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

  it('Focus is not affected by readOnly inputs with values', () => {
    const shouldEnterInnerZone = (e: React.KeyboardEvent<HTMLElement>): boolean => getCode(e) === EnterKey;

    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone shouldEnterInnerZone={shouldEnterInnerZone}>
          <input className="a" />
          <input readOnly defaultValue="foo" className="b" />
          <input className="c" />
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const inputA = focusZone.querySelector('.a') as HTMLElement;
    const inputB = focusZone.querySelector('.b') as HTMLElement;
    const inputC = focusZone.querySelector('.c') as HTMLElement;

    setupElement(inputA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 20,
      },
    });

    setupElement(inputB, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(inputC, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 40,
        right: 60,
      },
    });

    ReactTestUtils.Simulate.focus(inputB);
    // Pressing right should go to c.
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.right });
    expect(lastFocusedElement).toBe(inputC);

    ReactTestUtils.Simulate.focus(inputB);
    // Pressing left from b should go back to a
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.left });
    expect(lastFocusedElement).toBe(inputA);
  });

  it('removes tab-index of previous element when another one is selected (mouse & keyboard)', () => {
    let focusZone: FocusZone | null = null;
    let buttonA: HTMLButtonElement | null = null;
    let buttonB: HTMLButtonElement | null = null;
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone
          ref={focus => {
            focusZone = focus;
          }}
        >
          <button
            className="a"
            ref={button => {
              buttonA = button;
            }}
          >
            a
          </button>
          <button
            className="b"
            ref={button => {
              buttonB = button;
            }}
          >
            b
          </button>
        </FocusZone>
      </div>,
    );

    const focusZoneElement = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;
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
      <div {...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener }}>
        <FocusZone {...{ handleTabKey: FocusZoneTabbableElements.all, isCircularNavigation: true }}>
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
      <div {...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener }}>
        <FocusZone>
          <button className="a">a</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const buttonA = focusZone.querySelector('.a') as HTMLElement;

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

    // Pressing tab when our focus zone doesn't allow tabbing should propagate our tab to our key down event handler
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.tab });
    expect(tabDownListener.mock.calls.length).toBe(1);
    const onKeyDownEvent = tabDownListener.mock.calls[0][0];
    expect(onKeyDownEvent.which).toBe(KeyCodes.tab);
  });

  it('should stay in input box with arrow keys and exit with tab', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener }}>
        <FocusZone {...{ handleTabKey: FocusZoneTabbableElements.inputOnly, isCircularNavigation: false }}>
          <input type="text" className="a" />
          <button className="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const inputA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;

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

  it(`focus should leave input box when arrow keys are pressed when tabbing is supported but
    shouldInputLoseFocusOnArrowKey callback method return true`, () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener }}>
        <FocusZone
          {...{
            handleTabKey: FocusZoneTabbableElements.all,
            isCircularNavigation: false,
            shouldInputLoseFocusOnArrowKey: element => {
              return true;
            },
          }}
        >
          <input type="text" className="a" />
          <button className="b">b</button>
        </FocusZone>
      </div>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)!.firstChild as Element;

    const inputA = focusZone.querySelector('.a') as HTMLElement;
    const buttonB = focusZone.querySelector('.b') as HTMLElement;

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
    ReactTestUtils.Simulate.keyDown(focusZone, { which: KeyCodes.down });
    expect(lastFocusedElement).toBe(buttonB);
    expect(inputA.tabIndex).toBe(-1);
    expect(buttonB.tabIndex).toBe(0);
  });

  it('should call onKeyDown handler even within another FocusZone', () => {
    const keyDownHandler = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <FocusZone>
        <FocusZone className="innerFocusZone" onKeyDown={keyDownHandler} data-is-focusable={true}>
          Inner Focus Zone
        </FocusZone>
      </FocusZone>,
    );

    const focusZone = ReactDOM.findDOMNode(component as unknown as React.ReactInstance) as Element;
    const innerFocusZone = focusZone.querySelector('.innerFocusZone') as HTMLElement;
    ReactTestUtils.Simulate.keyDown(innerFocusZone, { which: KeyCodes.del });

    expect(keyDownHandler).toBeCalled();
  });

  it('should not set an element outside its DOM as its active element', () => {
    const focusZoneRef = React.createRef<IFocusZone>();
    const component = ReactTestUtils.renderIntoDocument(
      <div>
        <FocusZone componentRef={focusZoneRef}>
          <button id="a">a</button>
          <button id="b">b</button>
          {ReactDOM.createPortal(<div id="externalElement" tabIndex={0} />, window.document.body)}
        </FocusZone>
      </div>,
    );

    const parent = ReactDOM.findDOMNode(component as unknown as React.ReactInstance)! as Element;
    const externalElement = document.querySelector('#externalElement') as HTMLElement;
    const buttonA = parent.querySelector('#a') as HTMLElement;

    setupElement(externalElement, {
      clientRect: {
        top: 100,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    setupElement(buttonA, {
      clientRect: {
        top: 0,
        bottom: 20,
        left: 20,
        right: 40,
      },
    });

    ReactTestUtils.Simulate.focus(buttonA);
    // No public API to test active element. Therefore, we need to do an explicit cast.
    expect((focusZoneRef.current! as any)._activeElement.id).toBe('a');
    ReactTestUtils.Simulate.focus(externalElement);
    expect((focusZoneRef.current! as any)._activeElement.id).not.toBe('externalElement');
    expect((focusZoneRef.current! as any)._activeElement.id).toBe('a');
  });

  it('Handles focus moving to different targets in focus zone following DOM order and allowing tabbing', () => {
    const tabDownListener = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus, onKeyDown: tabDownListener }}>
        <FocusZone direction={FocusZoneDirection.domOrder} handleTabKey={FocusZoneTabbableElements.all}>
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

    // FocusZone stops propagation of our tab when we enable tab handling
    expect(tabDownListener.mock.calls.length).toBe(0);
  });

  it('Focuses the last element in the FocusZone when the imperative focusLast method is used', () => {
    const focusZoneRef = React.createRef<IFocusZone>();
    const component = ReactTestUtils.renderIntoDocument(
      <div {...{ onFocusCapture: _onFocus }}>
        <FocusZone
          componentRef={focusZoneRef}
          direction={FocusZoneDirection.domOrder}
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
