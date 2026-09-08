import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { CircleFilled } from '@fluentui/react-icons';
import { useMenuItemSwitch_unstable } from './useMenuItemSwitch';
import { circleFilledClassName } from './useMenuItemSwitchStyles.styles';
import { MenuListProvider } from '../../contexts/menuListContext';
import { MenuProvider } from '../../contexts/menuContext';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuContextValue } from '../../contexts/menuContext';

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

describe('useMenuItemSwitch_unstable', () => {
  describe('components and slots', () => {
    it('returns components shape including switchIndicator: "span"', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.switchIndicator).toBe('span');
    });

    it('always returns a root slot', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root).toBeDefined();
    });

    it('runtime state leaks a checkmark slot from the MenuItemCheckboxBase composition (not exposed in the type)', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      const state = result.current as unknown as { checkmark?: unknown };
      expect(state.checkmark).toBeDefined();
    });

    it('always returns a switchIndicator slot (renderByDefault: true)', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.switchIndicator).toBeDefined();
    });
  });

  describe('root slot — aria/role wiring (inherited from MenuItemCheckbox)', () => {
    it('sets root.role to "menuitemcheckbox" (Switch reuses checkbox semantics)', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root.role).toBe('menuitemcheckbox');
    });

    it('sets root["aria-checked"] to false when value is not in checkedValues[name]', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menuList: { checkedValues: { foo: ['2'] } } }),
      });

      expect(result.current.root['aria-checked']).toBe(false);
    });

    it('sets root["aria-checked"] to true when value is in checkedValues[name]', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menuList: { checkedValues: { foo: ['1'] } } }),
      });

      expect(result.current.root['aria-checked']).toBe(true);
    });
  });

  describe('returned state shape', () => {
    it('exposes name from props', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.name).toBe('foo');
    });

    it('exposes value from props', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.value).toBe('1');
    });

    it.each([
      ['unchecked', { foo: ['2'] }, false],
      ['checked', { foo: ['1'] }, true],
      ['no entry for name', {}, false],
    ])('reflects checked=%s from MenuListContext.checkedValues', (_, checkedValues, expectedChecked) => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menuList: { checkedValues } }),
      });

      expect(result.current.checked).toBe(expectedChecked);
    });
  });

  describe('switchIndicator slot — default icon injection', () => {
    it('injects CircleFilled when no switchIndicator.children provided', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      const children = result.current.switchIndicator?.children as React.ReactElement<{ className?: string }>;
      expect(children).toBeDefined();
      expect(children.type).toBe(CircleFilled);
      expect(children.props.className).toBe(circleFilledClassName);
    });

    it('preserves user-provided switchIndicator children over default CircleFilled', () => {
      const ref = React.createRef<HTMLDivElement>();
      const customIcon = React.createElement('span', { 'data-testid': 'custom-switch' });

      const { result } = renderHook(
        () => useMenuItemSwitch_unstable({ name: 'foo', value: '1', switchIndicator: { children: customIcon } }, ref),
        { wrapper: makeWrapper() },
      );

      expect(result.current.switchIndicator?.children).toBe(customIcon);
    });
  });

  describe('checkmark slot — no default icon overlay', () => {
    it('leaked checkmark slot has no default children (Switch wraps base, not styled, MenuItemCheckbox)', () => {
      const ref = React.createRef<HTMLDivElement>();

      const { result } = renderHook(() => useMenuItemSwitch_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      const state = result.current as unknown as { checkmark?: { children?: unknown } };
      expect(state.checkmark?.children).toBeUndefined();
    });
  });
});
