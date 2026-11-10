import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Button } from '@fluentui/react-button';
import { PopoverProvider } from '@fluentui/react-popover';
import type { PopoverContextValue } from '@fluentui/react-popover';
import { useTeachingPopoverFooter_unstable } from './useTeachingPopoverFooter';

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

function makeMouseEvent(
  defaultPrevented = false,
): React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement> {
  return {
    isDefaultPrevented: () => defaultPrevented,
  } as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
}

describe('useTeachingPopoverFooter_unstable', () => {
  it('returns components shape { root: div, primary: Button, secondary: Button }', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper(),
    });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'div', primary: Button, secondary: Button });
  });

  it('always returns a root slot', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.root).toBeDefined();
  });

  it('footerLayout defaults to "horizontal"', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.footerLayout).toBe('horizontal');
  });

  it('footerLayout honors "vertical" override', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(
      () => useTeachingPopoverFooter_unstable({ primary: 'OK', footerLayout: 'vertical' }, ref),
      { wrapper: makeWrapper() },
    );
    expect(result.current.footerLayout).toBe('vertical');
  });

  it('primary slot is always defined', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.primary).toBeDefined();
  });

  it('secondary is undefined when prop omitted', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper(),
    });
    expect(result.current.secondary).toBeUndefined();
  });

  it('secondary is defined when prop provided', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(
      () => useTeachingPopoverFooter_unstable({ primary: 'OK', secondary: 'Cancel' }, ref),
      { wrapper: makeWrapper() },
    );
    expect(result.current.secondary).toBeDefined();
  });

  it('primary.appearance is undefined when popover appearance="brand"', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper({ appearance: 'brand' }),
    });
    expect(result.current.primary.appearance).toBeUndefined();
  });

  it('primary.appearance is "primary" when popover appearance is not "brand"', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper({ appearance: 'inverted' }),
    });
    expect(result.current.primary.appearance).toBe('primary');
  });

  it('secondary.appearance is "primary" when popover appearance="brand"', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(
      () => useTeachingPopoverFooter_unstable({ primary: 'OK', secondary: 'Cancel' }, ref),
      { wrapper: makeWrapper({ appearance: 'brand' }) },
    );
    expect(result.current.secondary?.appearance).toBe('primary');
  });

  it('secondary.appearance is undefined when popover appearance is not "brand"', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(
      () => useTeachingPopoverFooter_unstable({ primary: 'OK', secondary: 'Cancel' }, ref),
      { wrapper: makeWrapper({ appearance: 'inverted' }) },
    );
    expect(result.current.secondary?.appearance).toBeUndefined();
  });

  it('when no secondary, primary.onClick calls toggleOpen', () => {
    const ref = React.createRef<HTMLDivElement>();
    const toggleOpen = jest.fn();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper({ toggleOpen }),
    });
    const ev = makeMouseEvent();
    result.current.primary.onClick?.(ev);
    expect(toggleOpen).toHaveBeenCalledWith(ev);
  });

  it('when secondary is present, secondary.onClick calls toggleOpen and primary does not', () => {
    const ref = React.createRef<HTMLDivElement>();
    const toggleOpen = jest.fn();
    const { result } = renderHook(
      () => useTeachingPopoverFooter_unstable({ primary: 'OK', secondary: 'Cancel' }, ref),
      { wrapper: makeWrapper({ toggleOpen }) },
    );
    const evPrimary = makeMouseEvent();
    result.current.primary.onClick?.(evPrimary);
    expect(toggleOpen).not.toHaveBeenCalled();

    const evSecondary = makeMouseEvent();
    result.current.secondary?.onClick?.(evSecondary);
    expect(toggleOpen).toHaveBeenCalledWith(evSecondary);
  });

  it('onClick short-circuits when ev.isDefaultPrevented() is true', () => {
    const ref = React.createRef<HTMLDivElement>();
    const toggleOpen = jest.fn();
    const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
      wrapper: makeWrapper({ toggleOpen }),
    });
    const ev = makeMouseEvent(true);
    result.current.primary.onClick?.(ev);
    expect(toggleOpen).not.toHaveBeenCalled();
  });

  it('merges user-provided primary.onClick with internal handler', () => {
    const ref = React.createRef<HTMLDivElement>();
    const toggleOpen = jest.fn();
    const userOnClick = jest.fn();
    const { result } = renderHook(
      () => useTeachingPopoverFooter_unstable({ primary: { children: 'OK', onClick: userOnClick } }, ref),
      { wrapper: makeWrapper({ toggleOpen }) },
    );
    const ev = makeMouseEvent();
    result.current.primary.onClick?.(ev);
    expect(toggleOpen).toHaveBeenCalledWith(ev);
    expect(userOnClick).toHaveBeenCalledWith(ev);
  });

  it.each([undefined, 'brand', 'inverted'] as const)(
    'state.appearance reflects popover-context appearance=%p',
    appearance => {
      const ref = React.createRef<HTMLDivElement>();
      const { result } = renderHook(() => useTeachingPopoverFooter_unstable({ primary: 'OK' }, ref), {
        wrapper: makeWrapper({ appearance }),
      });
      expect(result.current.appearance).toBe(appearance);
    },
  );
});
