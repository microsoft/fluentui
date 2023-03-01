import * as React from 'react';
import { render, act } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { DirectionalHint } from '../../common/DirectionalHint';
import { resetIds } from '../../Utilities';
import { Callout } from './Callout';
import { CalloutContent } from './CalloutContent';
import type { IPopupRestoreFocusParams } from '../../Popup';
import { expectNoHiddenParents } from '../../common/testUtilities';

describe('Callout', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  afterAll(() => {
    resetIds();
  });

  isConformant({
    Component: Callout,
    displayName: 'Callout',
    requiredProps: { doNotLayer: true },
    disabledTests: ['component-handles-classname'],
  });

  it('renders Callout correctly', () => {
    const { container } = render(<CalloutContent>Content</CalloutContent>);
    expect(container).toMatchSnapshot();
  });

  it('does not throw with target id string', () => {
    expect(() => {
      render(
        <div>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            target
          </button>
          <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    }).not.toThrow();
  });

  it('does not throw with target MouseEvent', () => {
    const eventTarget = document.createElement('div');
    const mouseEvent = new MouseEvent('click', { relatedTarget: eventTarget });

    expect(() => {
      render(
        <div>
          <Callout target={mouseEvent} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    }).not.toThrow();
  });

  it('does not throw with target Element', () => {
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);

    expect(() => {
      render(
        <div>
          <Callout target={targetElement} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    }).not.toThrow();
  });

  it('does not throw without target', () => {
    expect(() => {
      render(
        <div>
          <Callout directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    }).not.toThrow();
  });

  it('passes event to onDismiss prop', () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();

    const { getByText } = render(
      <div>
        <button>button</button>
        <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
          target
        </button>
        <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onDismiss={onDismiss}>
          <div>Content</div>
        </Callout>
      </div>,
    );

    act(() => {
      // Move focus
      jest.runAllTimers();
    });

    getByText('button').focus();

    // ensure event is passed to callback
    expect(onDismiss).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus' }));
  });

  it('prevents dismiss when preventDismissOnEvent is passed', () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    const preventAllDismiss = () => true;

    const { getByText, queryByText } = render(
      <div>
        <button>button</button>
        <Callout target="#target" preventDismissOnEvent={preventAllDismiss} onDismiss={onDismiss}>
          <div>Content</div>
        </Callout>
      </div>,
    );

    act(() => {
      // Move focus
      jest.runAllTimers();
    });
    getByText('button').focus();

    expect(queryByText('Content')).toBeTruthy();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('will correctly return focus to element that spawned it', () => {
    jest.useFakeTimers();

    const focusedElement = document.createElement('button');
    focusedElement.innerHTML = 'Inner HTML so we can be sure it is right';
    // Callout/popup checks active element to get what currently has focus
    // to know what to return focus to. By mocking the return value we can be sure
    // that it will have something "focused" when mounted
    jest.spyOn(window.document, 'activeElement', 'get').mockReturnValue(focusedElement as Element);

    const onRestoreFocus = jest.fn();

    const { getByText, unmount } = render(
      <div>
        <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
          target
        </button>
        <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onRestoreFocus={onRestoreFocus}>
          {/* must be a button to be focusable for the test*/}
          <button id="inner">Content</button>
        </Callout>
      </div>,
    );

    act(() => {
      jest.runAllTimers();
    });

    // Make sure that focus is in the callout
    getByText('Content').focus();

    // Unmounting everything is the same as dismissing the Callout.
    // As the tree is unmounted, popup will get unmounted first and onRestoreFocus will get called.
    unmount();

    expect(onRestoreFocus).toHaveBeenCalledTimes(1);
    expect(onRestoreFocus).toHaveBeenLastCalledWith(
      expect.objectContaining<Partial<IPopupRestoreFocusParams>>({
        originalElement: focusedElement,
        containsFocus: true,
      }),
    );
  });

  it('passes popupProps through to Popup', () => {
    const { getByRole } = render(
      <div>
        <Callout doNotLayer role="dialog" popupProps={{ 'aria-modal': 'true' }}>
          content
        </Callout>
      </div>,
    );

    const popup = getByRole('dialog');
    expect(popup.getAttribute('aria-modal')).toEqual('true');
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
