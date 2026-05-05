import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useFocusTrap } from './useFocusTrap';

type TestTrapProps = {
  active?: boolean;
  children?: React.ReactNode;
  trapAttrs?: React.HTMLAttributes<HTMLDivElement>;
};

const TestTrap = ({ active = true, children, trapAttrs }: TestTrapProps) => {
  const setRef = useFocusTrap(active);
  return (
    <div ref={setRef} data-testid="trap" {...trapAttrs}>
      {children}
    </div>
  );
};

function flushAutoFocus() {
  act(() => {
    jest.runAllTimers();
  });
}

describe('useFocusTrap', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a ref callback', () => {
    const captured: { current: React.RefCallback<HTMLElement | null> | null } = { current: null };
    const Capture = () => {
      captured.current = useFocusTrap();
      return null;
    };
    render(<Capture />);

    expect(typeof captured.current).toBe('function');
  });

  it('focuses the element marked with [data-autofocus]', () => {
    render(
      <TestTrap>
        <button>first</button>
        <button data-autofocus>auto</button>
      </TestTrap>,
    );
    flushAutoFocus();

    expect(screen.getByRole('button', { name: 'auto' })).toHaveFocus();
  });

  it('falls back to the first tabbable descendant when no [data-autofocus] is present', () => {
    render(
      <TestTrap>
        <button>one</button>
        <button>two</button>
      </TestTrap>,
    );
    flushAutoFocus();

    expect(screen.getByRole('button', { name: 'one' })).toHaveFocus();
  });

  it('focuses a focusable-but-not-tabbable descendant when no tabbable is present', () => {
    render(
      <TestTrap>
        <a href="#" tabIndex={-1}>
          link
        </a>
      </TestTrap>,
    );
    flushAutoFocus();

    expect(screen.getByRole('link', { name: 'link' })).toHaveFocus();
  });

  it('focuses the trap node itself when it is the only focusable element', () => {
    render(<TestTrap trapAttrs={{ tabIndex: 0 }} />);
    flushAutoFocus();

    expect(screen.getByTestId('trap')).toHaveFocus();
  });

  it('does nothing when active=false', () => {
    render(
      <TestTrap active={false}>
        <button data-autofocus>auto</button>
      </TestTrap>,
    );

    flushAutoFocus();

    expect(document.body).toHaveFocus();
  });

  it('cycles focus from the last tabbable to the first when Tab is pressed', () => {
    render(
      <TestTrap>
        <button>one</button>
        <button>two</button>
      </TestTrap>,
    );

    flushAutoFocus();

    const [first] = screen.getAllByRole('button');

    userEvent.tab();
    userEvent.tab();

    expect(first).toHaveFocus();
  });

  it('cycles focus from the first tabbable to the last when Shift+Tab is pressed', () => {
    render(
      <TestTrap>
        <button>one</button>
        <button>two</button>
      </TestTrap>,
    );
    flushAutoFocus();

    const [, last] = screen.getAllByRole('button');

    userEvent.tab({ shift: true });

    expect(last).toHaveFocus();
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(
      <TestTrap>
        <button>one</button>
        <button>two</button>
      </TestTrap>,
    );

    flushAutoFocus();

    expect(() => unmount()).not.toThrow();

    render(
      <TestTrap>
        <button>three</button>
        <button>four</button>
      </TestTrap>,
    );

    flushAutoFocus();

    expect(screen.getByRole('button', { name: 'three' })).toHaveFocus();
  });
});
