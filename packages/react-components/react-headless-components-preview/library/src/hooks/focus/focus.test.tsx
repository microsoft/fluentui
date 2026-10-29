import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useFocusableGroup, useIsNavigatingWithKeyboard, useModalAttributes } from './index';
import type { UseFocusableGroupOptions } from './index';

// jsdom has no layout, so every element would be considered invisible by the focus finders.
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'checkVisibility', { configurable: true, value: () => true });
});

afterAll(() => {
  delete (HTMLElement.prototype as Partial<HTMLElement>).checkVisibility;
});

const pressTab = (shiftKey = false) => fireEvent.keyDown(document.activeElement!, { key: 'Tab', shiftKey });

describe('useModalAttributes', () => {
  const Modal = ({ trapFocus = true, legacyTrapFocus = true }) => {
    const { modalAttributes } = useModalAttributes({ trapFocus, legacyTrapFocus });
    return (
      <>
        <button>Outside</button>
        <div {...modalAttributes} data-testid="modal">
          <button>First</button>
          <button>Last</button>
        </div>
      </>
    );
  };

  it('cycles Tab and Shift+Tab inside the trap', () => {
    const { getByText } = render(<Modal />);

    getByText('Last').focus();
    pressTab();
    expect(getByText('First')).toHaveFocus();

    pressTab(true);
    expect(getByText('Last')).toHaveFocus();
  });

  it('leaves Tab to the browser inside the trap', () => {
    const { getByText } = render(<Modal />);

    getByText('First').focus();
    expect(pressTab()).toBe(true);
    expect(getByText('First')).toHaveFocus();
  });

  it('does not trap without legacyTrapFocus', () => {
    const { getByTestId } = render(<Modal legacyTrapFocus={false} />);

    expect(getByTestId('modal')).not.toHaveAttribute('data-fui-focus-trap');
  });
});

describe('useFocusableGroup', () => {
  const Group = (props: UseFocusableGroupOptions) => {
    const attributes = useFocusableGroup(props);
    return (
      <>
        <div {...attributes} tabIndex={0} data-testid="group">
          <button>First</button>
          <button>Last</button>
        </div>
        <button>After</button>
      </>
    );
  };

  it('returns the group attributes', () => {
    const { result } = renderHook(() =>
      useFocusableGroup({ tabBehavior: 'limited', ignoreDefaultKeydown: { Escape: true } }),
    );

    expect(result.current).toEqual({
      'data-fui-focusable-group': 'limited',
      'data-fui-focusable-group-ignore': 'Escape',
    });
  });

  it('moves focus inside on Enter and back to the group on Escape', () => {
    const { getByText, getByTestId } = render(<Group tabBehavior="limited-trap-focus" />);

    getByTestId('group').focus();
    fireEvent.keyDown(getByTestId('group'), { key: 'Enter' });
    expect(getByText('First')).toHaveFocus();

    fireEvent.keyDown(getByText('First'), { key: 'Escape' });
    expect(getByTestId('group')).toHaveFocus();
  });

  it('skips the content of a limited group with Tab', () => {
    const { getByText, getByTestId } = render(<Group tabBehavior="limited" />);

    getByTestId('group').focus();
    pressTab();
    expect(getByText('After')).toHaveFocus();
  });

  it('cycles Tab inside an entered limited-trap-focus group', () => {
    const { getByText } = render(<Group tabBehavior="limited-trap-focus" />);

    getByText('Last').focus();
    pressTab();
    expect(getByText('First')).toHaveFocus();

    pressTab(true);
    expect(getByText('Last')).toHaveFocus();
  });

  it('respects ignored keys', () => {
    const { getByText } = render(<Group tabBehavior="limited" ignoreDefaultKeydown={{ Escape: true }} />);

    getByText('First').focus();
    fireEvent.keyDown(getByText('First'), { key: 'Escape' });
    expect(getByText('First')).toHaveFocus();
  });
});

describe('useIsNavigatingWithKeyboard', () => {
  it('tracks keyboard and pointer interaction', () => {
    const { result } = renderHook(() => useIsNavigatingWithKeyboard());
    expect(result.current()).toBe(false);

    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(result.current()).toBe(true);

    fireEvent.mouseDown(document.body, { buttons: 1, clientX: 10, clientY: 10 });
    expect(result.current()).toBe(false);
  });
});
