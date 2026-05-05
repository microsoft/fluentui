import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactSharedContexts from '@fluentui/react-shared-contexts';
import { useMenuTrigger_unstable } from './useMenuTrigger';
import { MenuProvider } from '../../contexts/menuContext';
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';

type MutableRef<T> = { current: T | null };

function makeRef<T>(value: T | null = null): MutableRef<T> {
  return { current: value };
}

jest.mock('@fluentui/react-shared-contexts', () => ({
  ...jest.requireActual('@fluentui/react-shared-contexts'),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useFluent_unstable: jest.fn(() => ({ dir: 'ltr', targetDocument: document })),
}));

const findFirstFocusableMock = jest.fn();
jest.mock('@fluentui/react-tabster', () => ({
  ...jest.requireActual('@fluentui/react-tabster'),
  useFocusFinders: jest.fn(() => ({ findFirstFocusable: findFirstFocusableMock })),
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
    /** When true, render a MenuListProvider as parent so `useIsSubmenu` is true via context. */
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

function getChildProps<T extends Record<string, unknown> = Record<string, unknown>>(state: MenuTriggerState): T {
  return (state.children as React.ReactElement).props as T;
}

function buildMouseEvent<T = HTMLElement>(overrides: Partial<React.MouseEvent<T>> = {}): React.MouseEvent<T> {
  const target = document.createElement('button');
  return {
    target,
    currentTarget: target,
    preventDefault: jest.fn(),
    isDefaultPrevented: () => false,
    ...overrides,
  } as unknown as React.MouseEvent<T>;
}

function buildKeyEvent<T = HTMLElement>(overrides: Partial<React.KeyboardEvent<T>> = {}): React.KeyboardEvent<T> {
  const target = document.createElement('button');
  return {
    key: 'a',
    target,
    currentTarget: target,
    preventDefault: jest.fn(),
    isDefaultPrevented: () => false,
    ...overrides,
  } as unknown as React.KeyboardEvent<T>;
}

beforeEach(() => {
  mockedUseFluent.mockReturnValue({ dir: 'ltr', targetDocument: document });
  findFirstFocusableMock.mockReset();
});

describe('useMenuTrigger_unstable', () => {
  describe('state shape', () => {
    it('returns isSubmenu and a cloned children element', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(typeof result.current.isSubmenu).toBe('boolean');
      expect(React.isValidElement(result.current.children)).toBe(true);
    });
  });

  describe('isSubmenu detection', () => {
    it('isSubmenu is false at the root menu level', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(result.current.isSubmenu).toBe(false);
    });

    it('isSubmenu is true when MenuContext.isSubmenu is true', () => {
      const { wrapper } = makeWrapper({ menu: { isSubmenu: true } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(result.current.isSubmenu).toBe(true);
    });

    it('isSubmenu is true when wrapped in a parent MenuList context', () => {
      const { wrapper } = makeWrapper({ insideMenuList: true });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(result.current.isSubmenu).toBe(true);
    });
  });

  describe('trigger child props', () => {
    it('sets aria-haspopup="menu" and forwards triggerId to id', () => {
      const { wrapper } = makeWrapper({ menu: { triggerId: 'my-trigger' } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps(result.current);

      expect(props['aria-haspopup']).toBe('menu');
      expect(props.id).toBe('my-trigger');
    });

    it('omits aria-expanded when closed and not a submenu', () => {
      const { wrapper } = makeWrapper({ menu: { open: false, isSubmenu: false } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(getChildProps(result.current)['aria-expanded']).toBeUndefined();
    });

    it('sets aria-expanded=false when closed and is a submenu', () => {
      const { wrapper } = makeWrapper({ menu: { open: false, isSubmenu: true } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(getChildProps(result.current)['aria-expanded']).toBe(false);
    });

    it('sets aria-expanded=true when open', () => {
      const { wrapper } = makeWrapper({ menu: { open: true } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(getChildProps(result.current)['aria-expanded']).toBe(true);
    });

    it('preserves the triggerRef in the child ref forwarding', () => {
      const triggerEl = document.createElement('button');
      const triggerRef = makeRef<HTMLElement>() as MenuContextValue['triggerRef'];
      const { wrapper } = makeWrapper({ menu: { triggerRef } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ ref: (el: HTMLElement | null) => void }>(result.current);
      props.ref(triggerEl);

      expect(triggerRef.current).toBe(triggerEl);
    });
  });

  describe('disableButtonEnhancement', () => {
    it('applies useARIAButtonProps for non-button children by default (adds role="button")', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () =>
          useMenuTrigger_unstable({
            children: <div>trigger</div>,
          } as unknown as MenuTriggerProps),
        { wrapper },
      );

      expect(getChildProps(result.current).role).toBe('button');
    });

    it('skips ARIA button enhancement when disableButtonEnhancement is true', () => {
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () =>
          useMenuTrigger_unstable({
            disableButtonEnhancement: true,
            children: <div>trigger</div>,
          } as unknown as MenuTriggerProps),
        { wrapper },
      );

      expect(getChildProps(result.current).role).toBeUndefined();
    });
  });

  describe('openOnContext mode', () => {
    it('does not attach onClick or onKeyDown to the child when openOnContext is true', () => {
      const { wrapper } = makeWrapper({ menu: { openOnContext: true } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps(result.current);

      expect(props.onClick).toBeUndefined();
      expect(props.onKeyDown).toBeUndefined();
    });

    it('attaches onContextMenu in openOnContext mode', () => {
      const { wrapper } = makeWrapper({ menu: { openOnContext: true } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(typeof getChildProps(result.current).onContextMenu).toBe('function');
    });
  });

  describe('onClick', () => {
    it('calls the original child onClick', () => {
      const onClick = jest.fn();
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button onClick={onClick}>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onClick: (e: React.MouseEvent) => void }>(result.current);
      props.onClick(buildMouseEvent());

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('toggles open via setOpen with type "menuTriggerClick" when openOnContext is false', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { open: false, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onClick: (e: React.MouseEvent) => void }>(result.current);
      props.onClick(buildMouseEvent());

      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, type: 'menuTriggerClick' }),
      );
    });

    it('passes !open as the next open value when already open', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { open: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onClick: (e: React.MouseEvent) => void }>(result.current);
      props.onClick(buildMouseEvent());

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, type: 'menuTriggerClick' }),
      );
    });

    it('does not call setOpen when target has aria-disabled="true"', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { setOpen } });
      const target = document.createElement('button');
      target.setAttribute('aria-disabled', 'true');

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onClick: (e: React.MouseEvent) => void }>(result.current);
      props.onClick(buildMouseEvent({ target, currentTarget: target } as Partial<React.MouseEvent>));

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('does not call setOpen when target is disabled', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { setOpen } });
      const target = document.createElement('button');
      target.setAttribute('disabled', '');

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onClick: (e: React.MouseEvent) => void }>(result.current);
      props.onClick(buildMouseEvent({ target, currentTarget: target } as Partial<React.MouseEvent>));

      expect(setOpen).not.toHaveBeenCalled();
    });
  });

  describe('onKeyDown', () => {
    it('calls the original child onKeyDown', () => {
      const onKeyDown = jest.fn();
      const { wrapper } = makeWrapper();

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button onKeyDown={onKeyDown}>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'x' }));

      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('opens the menu on ArrowDown when not a submenu', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'ArrowDown' }));

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, keyboard: true, type: 'menuTriggerKeyDown' }),
      );
    });

    it('opens a submenu on ArrowRight in ltr', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { isSubmenu: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'ArrowRight' }));

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, keyboard: true, type: 'menuTriggerKeyDown' }),
      );
    });

    it('opens a submenu on ArrowLeft in rtl', () => {
      mockedUseFluent.mockReturnValue({ dir: 'rtl', targetDocument: document });
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { isSubmenu: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'ArrowLeft' }));

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, keyboard: true, type: 'menuTriggerKeyDown' }),
      );
    });

    it('does not open a submenu on ArrowRight when shouldOpenOnArrowRight is false', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({
        menu: { isSubmenu: true, setOpen },
        menuList: { shouldOpenOnArrowRight: false },
        insideMenuList: true,
      });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'ArrowRight' }));

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('does not open the menu on ArrowDown when openOnContext is true', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnContext: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      // openOnContext mode does not attach onKeyDown — confirm the child's existing onKeyDown is preserved
      const props = getChildProps(result.current);
      expect(props.onKeyDown).toBeUndefined();
      expect(setOpen).not.toHaveBeenCalled();
    });

    it('closes the menu on Escape when not a submenu', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { open: true, setOpen, isSubmenu: false } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'Escape' }));

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, keyboard: true, type: 'menuTriggerKeyDown' }),
      );
    });

    it('does not close on Escape when rendered as a submenu', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { open: true, setOpen, isSubmenu: true } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'Escape' }));

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('does nothing when defaultPrevented is true', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'ArrowDown', isDefaultPrevented: () => true }));

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('focuses the first focusable inside the popover on ArrowRight when submenu is already open', () => {
      const popoverEl = document.createElement('div');
      const popoverRef = makeRef<HTMLElement>(popoverEl) as MenuContextValue['menuPopoverRef'];
      const focusableEl = document.createElement('button');
      const focusSpy = jest.spyOn(focusableEl, 'focus');
      findFirstFocusableMock.mockReturnValue(focusableEl);

      const { wrapper } = makeWrapper({ menu: { open: true, isSubmenu: true, menuPopoverRef: popoverRef } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onKeyDown: (e: React.KeyboardEvent) => void }>(result.current);
      props.onKeyDown(buildKeyEvent({ key: 'ArrowRight' }));

      expect(findFirstFocusableMock).toHaveBeenCalledWith(popoverEl);
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onContextMenu', () => {
    it('opens the menu and prevents default when openOnContext is true', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnContext: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onContextMenu: (e: React.MouseEvent) => void }>(result.current);
      const event = buildMouseEvent();
      props.onContextMenu(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, keyboard: false, type: 'menuTriggerContextMenu' }),
      );
    });

    it('does not open the menu when openOnContext is false', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnContext: false, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onContextMenu: (e: React.MouseEvent) => void }>(result.current);
      props.onContextMenu(buildMouseEvent());

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('does nothing when defaultPrevented is true', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnContext: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onContextMenu: (e: React.MouseEvent) => void }>(result.current);
      props.onContextMenu(buildMouseEvent({ isDefaultPrevented: () => true }));

      expect(setOpen).not.toHaveBeenCalled();
    });
  });

  describe('hover handlers', () => {
    it('onMouseMove opens the menu on first move when openOnHover is true', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onMouseMove: (e: React.MouseEvent) => void }>(result.current);
      props.onMouseMove(buildMouseEvent());

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, type: 'menuTriggerMouseMove' }),
      );
    });

    it('onMouseMove only opens the menu on the first move', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onMouseMove: (e: React.MouseEvent) => void }>(result.current);
      props.onMouseMove(buildMouseEvent());
      props.onMouseMove(buildMouseEvent());

      expect(setOpen).toHaveBeenCalledTimes(1);
    });

    it('onMouseMove does nothing when openOnHover is false', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: false, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onMouseMove: (e: React.MouseEvent) => void }>(result.current);
      props.onMouseMove(buildMouseEvent());

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('onMouseOver opens the menu when openOnHover and the mouse has already moved', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{
        onMouseMove: (e: React.MouseEvent) => void;
        onMouseOver: (e: React.MouseEvent) => void;
      }>(result.current);
      // Prime the hasMouseMoved ref via onMouseMove first
      props.onMouseMove(buildMouseEvent());
      setOpen.mockClear();
      props.onMouseOver(buildMouseEvent());

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, type: 'menuTriggerMouseEnter' }),
      );
    });

    it('onMouseOver does nothing when the mouse has not moved yet', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onMouseOver: (e: React.MouseEvent) => void }>(result.current);
      props.onMouseOver(buildMouseEvent());

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('onMouseLeave closes the menu when openOnHover is true', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onMouseLeave: (e: React.MouseEvent) => void }>(result.current);
      props.onMouseLeave(buildMouseEvent());

      expect(setOpen).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ open: false, type: 'menuTriggerMouseLeave' }),
      );
    });

    it('onMouseLeave does nothing when openOnHover is false', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: false, setOpen } });

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{ onMouseLeave: (e: React.MouseEvent) => void }>(result.current);
      props.onMouseLeave(buildMouseEvent());

      expect(setOpen).not.toHaveBeenCalled();
    });

    it('mouse handlers no-op when target is aria-disabled', () => {
      const setOpen = jest.fn();
      const { wrapper } = makeWrapper({ menu: { openOnHover: true, setOpen } });
      const disabledTarget = document.createElement('button');
      disabledTarget.setAttribute('aria-disabled', 'true');

      const { result } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );
      const props = getChildProps<{
        onMouseMove: (e: React.MouseEvent) => void;
        onMouseLeave: (e: React.MouseEvent) => void;
      }>(result.current);
      const event = buildMouseEvent({
        target: disabledTarget,
        currentTarget: disabledTarget,
      } as Partial<React.MouseEvent>);
      props.onMouseMove(event);
      props.onMouseLeave(event);

      expect(setOpen).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('does not throw when unmounted', () => {
      const { wrapper } = makeWrapper();

      const { unmount } = renderHook(
        () => useMenuTrigger_unstable({ children: <button>trigger</button> } as MenuTriggerProps),
        { wrapper },
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
