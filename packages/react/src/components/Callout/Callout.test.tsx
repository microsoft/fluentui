import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { safeCreate } from '@fluentui/test-utilities';
import { isConformant } from '../../common/isConformant';
import { DirectionalHint } from '../../common/DirectionalHint';
import { resetIds } from '../../Utilities';
import { Callout } from './Callout';
import { CalloutContent } from './CalloutContent';
import type { IPopupRestoreFocusParams } from '../../Popup';
import { expectNoHiddenParents } from '../../common/testUtilities';

describe('Callout', () => {
  beforeEach(() => {
    realDom = document.createElement('div');
    document.body.appendChild(realDom);
    resetIds();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(realDom);
    document.body.removeChild(realDom);
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  afterAll(() => {
    resetIds();
  });

  let realDom: HTMLDivElement;

  isConformant({
    Component: Callout,
    displayName: 'Callout',
    targetComponent: CalloutContent,
    requiredProps: { doNotLayer: true },
    disabledTests: ['component-handles-classname'],
  });

  it('renders Callout correctly', () => {
    safeCreate(<CalloutContent>Content</CalloutContent>, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
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

  it('prevents dismiss when preventDismissOnEvent is passed', () => {
    jest.useFakeTimers();
    let threwException = false;
    const onDismiss = jest.fn();
    const preventAllDismiss = () => true;

    try {
      ReactTestUtils.act(() => {
        ReactDOM.render<HTMLDivElement>(
          <div>
            <button id="focustarget"> button </button>
            <Callout target="#target" preventDismissOnEvent={preventAllDismiss} onDismiss={onDismiss}>
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

      expect(onDismiss.mock.calls.length).toEqual(0);
    });
  });

  it('will correctly return focus to element that spawned it', () => {
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
    const onRestoreFocus = (options: IPopupRestoreFocusParams) => {
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

  // This behavior could be changed in the future
  it('does not hide siblings (currently)', () => {
    const { getByText, getByTestId } = render(
      <div data-testid="root">
        <div>sibling</div>
        {/* Use doNotLayer so the content isn't rendered in a portal (easier to test this way) */}
        <Callout doNotLayer>content</Callout>
      </div>,
    );

    const content = getByText('content');
    // the sibling test becomes invalid if the doNotLayer prop is removed and the content is in a portal
    expect(getByTestId('root').contains(content)).toBeTruthy();
    // verify content itself isn't hidden (unlikely)
    expectNoHiddenParents(content);

    // verify sibling isn't hidden
    expectNoHiddenParents(getByText('sibling'));
  });
});
