import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Callout } from './Callout';
import { CalloutContent } from './CalloutContent';
import { DirectionalHint } from '../../common/DirectionalHint';
import * as Utilities from '../../Utilities';
import * as positioning from 'office-ui-fabric-react/lib/utilities/positioning';
import { safeCreate } from '@uifabric/test-utilities';
import { isConformant } from '../../common/isConformant';

describe('Callout', () => {
  let realDom: HTMLDivElement;
  beforeEach(() => {
    realDom = document.createElement('div');
    document.body.appendChild(realDom);
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(realDom);
    document.body.removeChild(realDom);
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('renders Callout correctly', () => {
    spyOn(Utilities, 'getWindow').and.returnValue({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      document: {
        documentElement: {
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        },
      },
    });
    spyOn(positioning, 'getBoundsFromTargetWindow').and.returnValue({
      top: 0,
      left: 0,
      right: 100,
      bottom: 768,
      width: 100,
      height: 768,
    });
    safeCreate(<CalloutContent>Content</CalloutContent>, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  isConformant({
    Component: Callout,
    displayName: 'Callout',
  });

  it('target id strings does not throw exception', () => {
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            {' '}
            target{' '}
          </button>
          <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('target MouseEvents does not throw exception', () => {
    const mouseEvent = document.createEvent('MouseEvent');
    const eventTarget = document.createElement('div');
    mouseEvent.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 1, eventTarget);
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout target={eventTarget} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('target Elements does not throw exception', () => {
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout target={targetElement} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('without target does not throw exception', () => {
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);
  });

  it('passes event to onDismiss prop', () => {
    jest.useFakeTimers();
    let threwException = false;
    let gotEvent = false;
    const onDismiss = (ev?: unknown) => {
      if (ev) {
        gotEvent = true;
      }
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.

    try {
      ReactTestUtils.act(() => {
        ReactDOM.render<HTMLDivElement>(
          <div>
            <button id="focustarget"> button </button>
            <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
              {' '}
              target{' '}
            </button>
            <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onDismiss={onDismiss}>
              <div>Content</div>
            </Callout>
          </div>,
          realDom,
        );
      });
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    ReactTestUtils.act(() => {
      const focusTarget = document.querySelector('#focustarget') as HTMLButtonElement;

      // Move focus
      jest.runAllTimers();

      focusTarget.focus();

      expect(gotEvent).toEqual(true);
    });
  });

  it('It will correctly return focus to element that spawned it', () => {
    jest.useFakeTimers();

    const focusedElement = document.createElement('button');
    focusedElement.innerHTML = 'Inner HTML so we can be sure it is right';
    // Callout/popup checks active element to get what currently has focus
    // to know what to return focus to. By mocking the return value we can be sure
    // that it will have something "focused" when mounted
    const b = jest.spyOn(window.document, 'activeElement', 'get');
    b.mockReturnValue(focusedElement as Element);

    let threwException = false;
    let previousFocusElement;
    let isFocused;
    let restoreCalled = false;
    const onRestoreFocus = (options: {
      originalElement: HTMLElement | Window | undefined;
      containsFocus: boolean;
      documentContainsFocus: boolean;
    }) => {
      previousFocusElement = options.originalElement;
      isFocused = options.containsFocus;
      restoreCalled = true;
    };
    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.
    try {
      ReactTestUtils.act(() => {
        ReactDOM.render<HTMLDivElement>(
          <div>
            <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
              target
            </button>
            <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onRestoreFocus={onRestoreFocus}>
              {/* must be a button to be focusable for the test*/}
              <button id={'inner'}>Content</button>
            </Callout>
          </div>,
          realDom,
        );
      });
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    ReactTestUtils.act(() => {
      const focusTarget = document.querySelector('#inner') as HTMLDivElement;

      jest.runAllTimers();
      // Make sure that focus is in the callout
      focusTarget.focus();
    });

    // Unmounting everything is the same as dismissing the Callout. As
    // the tree is unmounted, popup will get unmounted first and the
    // onRestoreFocus method will get called
    ReactDOM.unmountComponentAtNode(realDom);

    expect(restoreCalled).toEqual(true);
    expect(isFocused).toEqual(true);

    // Just to make sure that both elements are not undefined
    expect(previousFocusElement).not.toBeFalsy();
    expect(previousFocusElement).toEqual(focusedElement);
  });
});
