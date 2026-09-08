import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Dismiss12Regular, Lightbulb16Regular } from '@fluentui/react-icons';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { useTeachingPopoverHeader_unstable } from './useTeachingPopoverHeader';

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

describe('useTeachingPopoverHeader_unstable', () => {
  it('returns components shape { root: div, dismissButton: button, icon: div }', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), { wrapper: makeWrapper() });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'div', dismissButton: 'button', icon: 'div' });
  });

  it('always returns a root slot', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.root).toBeDefined();
  });

  it('icon is rendered by default with Lightbulb icon and aria-hidden', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.icon).toBeDefined();
    const iconChildren = result.current.icon?.children as React.ReactElement | undefined;
    expect(iconChildren).toBeDefined();
    expect((iconChildren as React.ReactElement).type).toBe(Lightbulb16Regular);
    expect(result.current.icon?.['aria-hidden']).toBe(true);
  });

  it('honors user-provided icon slot', () => {
    const ref = React.createRef<HTMLDivElement>();
    const customIcon = React.createElement('span', { 'data-testid': 'custom-icon' });
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({ icon: { children: customIcon } }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.icon).toBeDefined();
    expect(result.current.icon?.children).toBe(customIcon);
  });

  it('dismissButton is rendered by default with Dismiss icon, role and aria-label', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), { wrapper: makeWrapper() });
    expect(result.current.dismissButton).toBeDefined();
    const btnChildren = result.current.dismissButton?.children as React.ReactElement | undefined;
    expect((btnChildren as React.ReactElement).type).toBe(Dismiss12Regular);
    expect(result.current.dismissButton?.role).toBe('button');
    expect(result.current.dismissButton?.['aria-label']).toBe('dismiss');
    expect(typeof result.current.dismissButton?.onClick).toBe('function');
  });

  it('honors user-provided dismissButton slot', () => {
    const ref = React.createRef<HTMLDivElement>();
    const customChild = React.createElement('span', { 'data-testid': 'custom-dismiss' });
    const { result } = renderHook(
      () => useTeachingPopoverHeader_unstable({ dismissButton: { children: customChild } }, ref),
      { wrapper: makeWrapper() },
    );
    expect(result.current.dismissButton?.children).toBe(customChild);
  });

  it('dismissButton.onClick calls setOpen(ev, false) and focuses triggerRef', () => {
    const ref = React.createRef<HTMLDivElement>();
    const setOpen = jest.fn();
    const focus = jest.fn();
    const triggerEl = { focus } as unknown as HTMLElement;
    const triggerRef = { current: triggerEl } as React.RefObject<HTMLElement>;
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), {
      wrapper: makeWrapper({ setOpen, triggerRef }),
    });
    const ev = { defaultPrevented: false } as unknown as React.MouseEvent<HTMLButtonElement>;
    result.current.dismissButton?.onClick?.(ev);
    expect(setOpen).toHaveBeenCalledWith(ev, false);
    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('dismissButton.onClick skips setOpen when ev.defaultPrevented is true (but still focuses triggerRef)', () => {
    const ref = React.createRef<HTMLDivElement>();
    const setOpen = jest.fn();
    const focus = jest.fn();
    const triggerEl = { focus } as unknown as HTMLElement;
    const triggerRef = { current: triggerEl } as React.RefObject<HTMLElement>;
    const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), {
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
      const ref = React.createRef<HTMLDivElement>();
      const { result } = renderHook(() => useTeachingPopoverHeader_unstable({}, ref), {
        wrapper: makeWrapper({ appearance }),
      });
      expect(result.current.appearance).toBe(appearance);
    },
  );

  it('spreads extra props onto root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(
      () => useTeachingPopoverHeader_unstable({ className: 'custom-class', 'aria-label': 'header' }, ref),
      { wrapper: makeWrapper() },
    );
    expect(result.current.root.className).toBe('custom-class');
    expect(result.current.root['aria-label']).toBe('header');
  });
});
