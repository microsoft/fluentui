import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { useTeachingPopoverTitleBase_unstable } from './useTeachingPopoverTitleBase';

const defaultPopoverContext: PopoverContextValue = {
  open: true,
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  size: 'medium',
  inline: false,
};

function makeWrapper(contextValue: Partial<PopoverContextValue> = {}) {
  const value = { ...defaultPopoverContext, ...contextValue };
  return ({ children }: { children: React.ReactNode }) => React.createElement(PopoverProvider, { value }, children);
}

describe('useTeachingPopoverTitleBase_unstable', () => {
  it('returns structural state without styled defaults', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { result } = renderHook(() => useTeachingPopoverTitleBase_unstable({ dismissButton: {} }, ref), {
      wrapper: makeWrapper(),
    });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'h2', dismissButton: 'button' });
    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current.dismissButton?.children).toBeUndefined();
  });

  it('dismisses the popover and restores focus', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const setOpen = jest.fn();
    const focus = jest.fn();
    const triggerRef = { current: { focus } as unknown as HTMLElement };
    const { result } = renderHook(() => useTeachingPopoverTitleBase_unstable({ dismissButton: {} }, ref), {
      wrapper: makeWrapper({ setOpen, triggerRef }),
    });
    const event = { defaultPrevented: false } as React.MouseEvent<HTMLButtonElement>;

    result.current.dismissButton?.onClick?.(event);

    expect(setOpen).toHaveBeenCalledWith(event, false);
    expect(focus).toHaveBeenCalledTimes(1);
  });
});
