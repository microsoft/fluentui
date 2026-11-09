import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { findAllTabbable, useFocusableGroup, useModalAttributes } from './index';
import type { UseFocusableGroupOptions } from './index';

const pressTab = (shiftKey = false) => fireEvent.keyDown(document.activeElement!, { key: 'Tab', shiftKey });

const Trap = ({ children }: { children: React.ReactNode }) => {
  const { modalAttributes } = useModalAttributes({ trapFocus: true, legacyTrapFocus: true });
  return <div {...modalAttributes}>{children}</div>;
};

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

  it('wraps at the native radio group boundary', () => {
    const { getByText, getByLabelText } = render(
      <Trap>
        <button>First</button>
        <label>
          <input type="radio" name="choice" defaultChecked /> Checked
        </label>
        <label>
          <input type="radio" name="choice" /> Unchecked
        </label>
      </Trap>,
    );

    getByLabelText('Checked').focus();
    pressTab();
    expect(getByText('First')).toHaveFocus();
  });

  it('wraps at the last stop of the native Tab order when positive tabindex values are used', () => {
    const { getByText } = render(
      <Trap>
        {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive -- covers native Tab order */}
        <button tabIndex={2}>A</button>
        {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive -- covers native Tab order */}
        <button tabIndex={1}>B</button>
      </Trap>,
    );

    getByText('A').focus();
    pressTab();
    expect(getByText('B')).toHaveFocus();
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

describe('findAllTabbable', () => {
  it('skips controls disabled through a fieldset', () => {
    const { getByText, container } = render(
      <div>
        <fieldset disabled>
          <button>Disabled</button>
        </fieldset>
        <button>Enabled</button>
      </div>,
    );

    expect(findAllTabbable(container)).toEqual([getByText('Enabled')]);
  });

  it('keeps a single Tab stop per radio group', () => {
    const { getByLabelText, container } = render(
      <div>
        <label>
          <input type="radio" name="a" /> A1
        </label>
        <label>
          <input type="radio" name="a" /> A2
        </label>
        <label>
          <input type="radio" name="b" /> B1
        </label>
        <label>
          <input type="radio" name="b" defaultChecked /> B2
        </label>
      </div>,
    );

    expect(findAllTabbable(container)).toEqual([getByLabelText('A1'), getByLabelText('B2')]);
  });

  it('returns positive tabindex values first, in ascending order', () => {
    const { getByText, container } = render(
      <div>
        <button>Zero</button>
        {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive -- covers native Tab order */}
        <button tabIndex={2}>Two</button>
        {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive -- covers native Tab order */}
        <button tabIndex={1}>One</button>
      </div>,
    );

    expect(findAllTabbable(container)).toEqual([getByText('One'), getByText('Two'), getByText('Zero')]);
  });
});
