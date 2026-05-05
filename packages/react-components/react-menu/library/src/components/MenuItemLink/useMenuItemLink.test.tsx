import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactSharedContexts from '@fluentui/react-shared-contexts';
import { useMenuItemLink_unstable } from './useMenuItemLink';
import { MenuListProvider } from '../../contexts/menuListContext';
import { MenuProvider } from '../../contexts/menuContext';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { MenuItemState } from '../MenuItem/MenuItem.types';

jest.mock('@fluentui/react-shared-contexts', () => ({
  ...jest.requireActual('@fluentui/react-shared-contexts'),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useFluent_unstable: jest.fn(() => ({ dir: 'ltr', targetDocument: document })),
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

const defaultMenuContextValue: MenuContextValue = {
  open: false,
  setOpen: () => false,
  checkedValues: {},
  onCheckedValueChange: () => null,
  isSubmenu: false,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  triggerRef: { current: null } as unknown as React.MutableRefObject<HTMLElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  menuPopoverRef: { current: null } as unknown as React.MutableRefObject<HTMLElement | null>,
  mountNode: null,
  triggerId: '',
  openOnContext: false,
  openOnHover: false,
  hasIcons: false,
  hasCheckmarks: false,
  inline: false,
  persistOnItemClick: false,
};

function makeWrapper(
  options: {
    menuList?: Partial<MenuListContextValue>;
    menu?: Partial<MenuContextValue>;
    isSubmenuTrigger?: boolean;
  } = {},
) {
  const menuListValue: MenuListContextValue = { ...defaultMenuListContextValue, ...options.menuList };
  const menuValue: MenuContextValue = { ...defaultMenuContextValue, ...options.menu };

  return ({ children }: { children: React.ReactNode }) => (
    <MenuProvider value={menuValue}>
      <MenuListProvider value={menuListValue}>
        <MenuTriggerContextProvider value={options.isSubmenuTrigger ?? false}>{children}</MenuTriggerContextProvider>
      </MenuListProvider>
    </MenuProvider>
  );
}

describe('useMenuItemLink_unstable', () => {
  beforeEach(() => {
    mockedUseFluent.mockReturnValue({ dir: 'ltr', targetDocument: document });
  });

  describe('components and slots', () => {
    it('overrides root component to "a" while inheriting other MenuItem slots', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo' }, ref), {
        wrapper: makeWrapper(),
      });

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.root).toBe('a');
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.icon).toBe('span');
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.checkmark).toBe('span');
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.content).toBe('span');
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.secondaryContent).toBe('span');
    });

    it('always returns a root slot', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root).toBeDefined();
    });
  });

  describe('root slot', () => {
    it('sets root.role to "menuitem"', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root.role).toBe('menuitem');
    });

    it('spreads href onto root', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/destination' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root.href).toBe('/destination');
    });

    it('spreads className and aria-label onto root', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(
        () => useMenuItemLink_unstable({ href: '/foo', className: 'custom-class', 'aria-label': 'link' }, ref),
        { wrapper: makeWrapper() },
      );

      expect(result.current.root.className).toBe('custom-class');
      expect(result.current.root['aria-label']).toBe('link');
    });

    it('preserves tabIndex from props', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo', tabIndex: -1 }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root.tabIndex).toBe(-1);
    });
  });

  describe('composition with useMenuItem', () => {
    // useMenuItemLink_unstable spreads ...baseState from useMenuItem_unstable, so MenuItem
    // state fields are present at runtime. They aren't declared on the narrower
    // MenuItemLinkState public type, so reads go through MenuItemState.
    it('inherits persistOnClick from MenuContext.persistOnItemClick when prop omitted', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo' }, ref), {
        wrapper: makeWrapper({ menu: { persistOnItemClick: true } }),
      });

      const state = result.current as unknown as MenuItemState;
      expect(state.persistOnClick).toBe(true);
    });

    it('inherits hasSubmenu=true when MenuTriggerContext is true', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo' }, ref), {
        wrapper: makeWrapper({ isSubmenuTrigger: true }),
      });

      const state = result.current as unknown as MenuItemState;
      expect(state.hasSubmenu).toBe(true);
    });

    it('inherits disabled prop into state', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      const { result } = renderHook(() => useMenuItemLink_unstable({ href: '/foo', disabled: true }, ref), {
        wrapper: makeWrapper(),
      });

      const state = result.current as unknown as MenuItemState;
      expect(state.disabled).toBe(true);
    });
  });
});
