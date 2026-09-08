import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { useTeachingPopoverTitle_unstable } from './useTeachingPopoverTitle';

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

describe('useTeachingPopoverTitle_unstable', () => {
  it('returns components shape { root: h2, dismissButton: button }', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { result } = renderHook(() => useTeachingPopoverTitle_unstable({}, ref), { wrapper: makeWrapper() });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'h2', dismissButton: 'button' });
  });

  it('always returns a root slot', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { result } = renderHook(() => useTeachingPopoverTitle_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.root).toBeDefined();
  });

  it('dismissButton is undefined when prop omitted (renderByDefault: false)', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { result } = renderHook(() => useTeachingPopoverTitle_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.dismissButton).toBeUndefined();
  });

  it('dismissButton is defined with default props when prop is provided', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { result } = renderHook(() => useTeachingPopoverTitle_unstable({ dismissButton: {} }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.dismissButton).toBeDefined();
    expect(result.current.dismissButton?.['aria-label']).toBe('dismiss');
    expect(result.current.dismissButton?.['aria-hidden']).toBe(true);
    expect(typeof result.current.dismissButton?.onClick).toBe('function');
    expect(result.current.dismissButton?.children).toBeDefined();
  });

  it('dismissButton.onClick calls setOpen(ev, false) and focuses triggerRef', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const setOpen = jest.fn();
    const focus = jest.fn();
    const triggerEl = { focus } as unknown as HTMLElement;
    const triggerRef = { current: triggerEl } as React.RefObject<HTMLElement>;
    const { result } = renderHook(() => useTeachingPopoverTitle_unstable({ dismissButton: {} }, ref), {
      wrapper: makeWrapper({ setOpen, triggerRef }),
    });
    const ev = { defaultPrevented: false } as unknown as React.MouseEvent<HTMLButtonElement>;
    result.current.dismissButton?.onClick?.(ev);
    expect(setOpen).toHaveBeenCalledWith(ev, false);
    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('dismissButton.onClick skips setOpen when ev.defaultPrevented is true', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const setOpen = jest.fn();
    const focus = jest.fn();
    const triggerEl = { focus } as unknown as HTMLElement;
    const triggerRef = { current: triggerEl } as React.RefObject<HTMLElement>;
    const { result } = renderHook(() => useTeachingPopoverTitle_unstable({ dismissButton: {} }, ref), {
      wrapper: makeWrapper({ setOpen, triggerRef }),
    });
    const ev = { defaultPrevented: true } as unknown as React.MouseEvent<HTMLButtonElement>;
    result.current.dismissButton?.onClick?.(ev);
    expect(setOpen).not.toHaveBeenCalled();
    expect(focus).toHaveBeenCalledTimes(1);
  });

  it.each([undefined, 'brand', 'inverted'] as const)(
    'state.appearance reflects popover-context appearance=%p',
    appearance => {
      const ref = React.createRef<HTMLHeadingElement>();
      const { result } = renderHook(() => useTeachingPopoverTitle_unstable({}, ref), {
        wrapper: makeWrapper({ appearance }),
      });
      expect(result.current.appearance).toBe(appearance);
    },
  );

  it('spreads extra props onto root', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { result } = renderHook(
      () => useTeachingPopoverTitle_unstable({ className: 'custom-class', 'aria-label': 'title' }, ref),
      { wrapper: makeWrapper() },
    );
    expect(result.current.root.className).toBe('custom-class');
    expect(result.current.root['aria-label']).toBe('title');
  });
});
