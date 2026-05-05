import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactSharedContexts from '@fluentui/react-shared-contexts';
import { useMenuPopover_unstable } from './useMenuPopover';
import { MenuProvider } from '../../contexts/menuContext';
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuPopoverProps } from './MenuPopover.types';

type MutableRef<T> = { current: T | null };

function makeRef<T>(value: T | null = null): MutableRef<T> {
  return { current: value };
}

jest.mock('@fluentui/react-shared-contexts', () => ({
  ...jest.requireActual('@fluentui/react-shared-contexts'),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useFluent_unstable: jest.fn(() => ({ dir: 'ltr', targetDocument: document })),
}));

jest.mock('@fluentui/react-tabster', () => ({
  ...jest.requireActual('@fluentui/react-tabster'),
  useRestoreFocusSource: jest.fn(() => ({ 'data-tabster': '{"restorer":{"type":1}}' })),
}));

const mockedUseFluent = ReactSharedContexts.useFluent_unstable as jest.Mock;

const defaultMenuListContextValue: MenuListContextValue = {
  checkedValues: {},
  setFocusByFirstCharacter: () => null,
  toggleCheckbox: () => null,
  selectRadio: () => null,
  hasIcons: false,
  hasCheckmarks: false,
};

function makeMenuContextValue(overrides: Partial<MenuContextValue> = {}): MenuContextValue {
  return {
    open: false,
    setOpen: jest.fn(),
    checkedValues: {},
    onCheckedValueChange: () => null,
    isSubmenu: false,
    triggerRef: makeRef<HTMLElement>() as MenuContextValue['triggerRef'],
    menuPopoverRef: makeRef<HTMLElement>() as MenuContextValue['menuPopoverRef'],
    mountNode: null,
    triggerId: 'trigger-id',
    openOnContext: false,
    openOnHover: false,
    hasIcons: false,
    hasCheckmarks: false,
    inline: false,
    persistOnItemClick: false,
    ...overrides,
  };
}

function makeWrapper(
  options: {
    menu?: Partial<MenuContextValue>;
    menuList?: Partial<MenuListContextValue>;
    /** When true, also render MenuListProvider so `useIsSubmenu` returns true via parent context. */
    insideMenuList?: boolean;
  } = {},
) {
  const menuValue = makeMenuContextValue(options.menu);
  const menuListValue: MenuListContextValue = { ...defaultMenuListContextValue, ...options.menuList };

  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <MenuProvider value={menuValue}>
      {options.insideMenuList ? <MenuListProvider value={menuListValue}>{children}</MenuListProvider> : children}
    </MenuProvider>
  );

  return { wrapper: Wrapper, menuValue, menuListValue };
}

beforeEach(() => {
  mockedUseFluent.mockReturnValue({ dir: 'ltr', targetDocument: document });
});

describe('useMenuPopover_unstable', () => {
  describe('components and slots', () => {
    it('returns components shape with a div root', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components).toEqual({ root: 'div' });
    });

    it('always returns a root slot with role="presentation"', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });

      expect(result.current.root).toBeDefined();
      expect(result.current.root.role).toBe('presentation');
    });
  });

  describe('context-derived state', () => {
    it('defaults inline to false and mountNode to null when MenuContext provides no values', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });

      expect(result.current.inline).toBe(false);
      expect(result.current.mountNode).toBeNull();
      expect(result.current.safeZone).toBeUndefined();
    });

    it('forwards inline, mountNode, and safeZone from MenuContext', () => {
      const mountNode = document.createElement('div');
      const safeZone = <div key="safe-zone" />;
      const { wrapper } = makeWrapper({ menu: { inline: true, mountNode, safeZone } });

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });

      expect(result.current.inline).toBe(true);
      expect(result.current.mountNode).toBe(mountNode);
      expect(result.current.safeZone).toBe(safeZone);
    });
  });

  describe('root slot wiring', () => {
    it('passes className and arbitrary props through to root', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () =>
          useMenuPopover_unstable({ className: 'custom-class', 'data-testid': 'popover' } as MenuPopoverProps, null),
        { wrapper },
      );

      expect(result.current.root.className).toBe('custom-class');
      expect((result.current.root as Record<string, unknown>)['data-testid']).toBe('popover');
    });

    it('spreads restoreFocusSource attributes onto root', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });

      expect((result.current.root as Record<string, unknown>)['data-tabster']).toBe('{"restorer":{"type":1}}');
    });
  });

  describe('onMouseEnter', () => {
    it('calls the original onMouseEnter prop', () => {
      const onMouseEnter = jest.fn();
      const { wrapper } = makeWrapper();

      const { result } = renderHook(() => useMenuPopover_unstable({ onMouseEnter }, null), { wrapper });
      result.current.root.onMouseEnter?.({} as React.MouseEvent<HTMLDivElement>);

      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('opens the menu when openOnHover is true in context', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onMouseEnter?.({} as React.MouseEvent<HTMLDivElement>);

      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, type: 'menuPopoverMouseEnter' }),
      );
    });

    it('opens the menu when rendered as a submenu, even if openOnHover is false', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { isSubmenu: true, openOnHover: false, setOpen } });

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onMouseEnter?.({} as React.MouseEvent<HTMLDivElement>);

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, type: 'menuPopoverMouseEnter' }),
      );
    });

    it('does not open the menu when openOnHover is false and not a submenu', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: false, setOpen } });

      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onMouseEnter?.({} as React.MouseEvent<HTMLDivElement>);

      expect(setOpen).not.toHaveBeenCalled();
    });
  });

  describe('onKeyDown', () => {
    function buildKeyEvent(
      overrides: Partial<React.KeyboardEvent<HTMLDivElement>> = {},
    ): React.KeyboardEvent<HTMLDivElement> {
      const target = document.createElement('div');
      return {
        key: 'Escape',
        target,
        preventDefault: jest.fn(),
        isDefaultPrevented: () => false,
        ...overrides,
      } as unknown as React.KeyboardEvent<HTMLDivElement>;
    }

    it('calls the original onKeyDown prop', () => {
      const onKeyDown = jest.fn();
      const { wrapper } = makeWrapper();

      const { result } = renderHook(() => useMenuPopover_unstable({ onKeyDown }, null), { wrapper });
      result.current.root.onKeyDown?.(buildKeyEvent({ key: 'a' }));

      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('closes the menu on Escape when open and target is inside the popover', () => {
      const setOpen = jest.fn();
      const popoverNode = document.createElement('div');
      const target = document.createElement('span');
      popoverNode.appendChild(target);
      const popoverRef = makeRef<HTMLElement>(popoverNode) as MenuContextValue['menuPopoverRef'];
      const { wrapper } = makeWrapper({ menu: { open: true, setOpen, menuPopoverRef: popoverRef } });

      const event = buildKeyEvent({ key: 'Escape', target });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, keyboard: true, type: 'menuPopoverKeyDown' }),
      );
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('does nothing on Escape when the menu is closed', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { open: false, setOpen } });

      const event = buildKeyEvent({ key: 'Escape' });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('does nothing on Escape when defaultPrevented is true', () => {
      const setOpen = jest.fn();
      const popoverNode = document.createElement('div');
      const target = document.createElement('span');
      popoverNode.appendChild(target);
      const popoverRef = makeRef<HTMLElement>(popoverNode) as MenuContextValue['menuPopoverRef'];
      const { wrapper } = makeWrapper({ menu: { open: true, setOpen, menuPopoverRef: popoverRef } });

      const event = buildKeyEvent({ key: 'Escape', target, isDefaultPrevented: () => true });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('closes a submenu on ArrowLeft in ltr', () => {
      const setOpen = jest.fn();
      const popoverNode = document.createElement('div');
      const target = document.createElement('span');
      popoverNode.appendChild(target);
      const popoverRef = makeRef<HTMLElement>(popoverNode) as MenuContextValue['menuPopoverRef'];
      const { wrapper } = makeWrapper({ menu: { open: true, isSubmenu: true, setOpen, menuPopoverRef: popoverRef } });

      const event = buildKeyEvent({ key: 'ArrowLeft', target });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, keyboard: true, type: 'menuPopoverKeyDown' }),
      );
    });

    it('does not close on ArrowLeft when MenuListContext sets shouldCloseOnArrowLeft=false', () => {
      const setOpen = jest.fn();
      const popoverNode = document.createElement('div');
      const target = document.createElement('span');
      popoverNode.appendChild(target);
      const popoverRef = makeRef<HTMLElement>(popoverNode) as MenuContextValue['menuPopoverRef'];
      const { wrapper } = makeWrapper({
        menu: { open: true, isSubmenu: true, setOpen, menuPopoverRef: popoverRef },
        menuList: { shouldCloseOnArrowLeft: false },
        insideMenuList: true,
      });

      const event = buildKeyEvent({ key: 'ArrowLeft', target });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('closes a submenu on ArrowRight in rtl', () => {
      mockedUseFluent.mockReturnValue({ dir: 'rtl', targetDocument: document });
      const setOpen = jest.fn();
      const popoverNode = document.createElement('div');
      const target = document.createElement('span');
      popoverNode.appendChild(target);
      const popoverRef = makeRef<HTMLElement>(popoverNode) as MenuContextValue['menuPopoverRef'];
      const { wrapper } = makeWrapper({ menu: { open: true, isSubmenu: true, setOpen, menuPopoverRef: popoverRef } });

      const event = buildKeyEvent({ key: 'ArrowRight', target });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, keyboard: true, type: 'menuPopoverKeyDown' }),
      );
    });

    it('closes the menu and focuses the trigger on Tab when not a submenu', () => {
      const setOpen = jest.fn();
      const triggerEl = document.createElement('button');
      const focusSpy = jest.spyOn(triggerEl, 'focus');
      const triggerRef = makeRef<HTMLElement>(triggerEl) as MenuContextValue['triggerRef'];
      const { wrapper } = makeWrapper({ menu: { setOpen, triggerRef, isSubmenu: false } });

      const event = buildKeyEvent({ key: 'Tab' });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, keyboard: true, type: 'menuPopoverKeyDown' }),
      );
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('closes the menu but does not focus the trigger on Tab when a submenu', () => {
      const setOpen = jest.fn();
      const triggerEl = document.createElement('button');
      const focusSpy = jest.spyOn(triggerEl, 'focus');
      const triggerRef = makeRef<HTMLElement>(triggerEl) as MenuContextValue['triggerRef'];
      const { wrapper } = makeWrapper({ menu: { setOpen, triggerRef, isSubmenu: true } });

      const event = buildKeyEvent({ key: 'Tab' });
      const { result } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });
      result.current.root.onKeyDown?.(event);

      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('does not throw when unmounted', () => {
      const { wrapper } = makeWrapper();

      const { unmount } = renderHook(() => useMenuPopover_unstable({}, null), { wrapper });

      expect(() => unmount()).not.toThrow();
    });
  });
});
