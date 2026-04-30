import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { useMenuItemCheckbox_unstable } from './useMenuItemCheckbox';
import { MenuListProvider } from '../../contexts/menuListContext';
import { MenuProvider } from '../../contexts/menuContext';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { ARIAButtonElement } from '@fluentui/react-aria';

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

describe('useMenuItemCheckbox_unstable', () => {
  describe('components and slots', () => {
    it('returns components shape with all MenuItem slots', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components).toEqual({
        root: 'div',
        icon: 'span',
        checkmark: 'span',
        submenuIndicator: 'span',
        content: 'span',
        secondaryContent: 'span',
        subText: 'span',
      });
    });

    it('always returns a root slot', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root).toBeDefined();
    });

    it('always returns a checkmark slot (renderByDefault: true)', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.checkmark).toBeDefined();
    });
  });

  describe('root slot — aria/role wiring', () => {
    it('sets root.role to "menuitemcheckbox"', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.root.role).toBe('menuitemcheckbox');
    });

    it('sets root["aria-checked"] to false when value is not in checkedValues[name]', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menuList: { checkedValues: { foo: ['2'] } } }),
      });

      expect(result.current.root['aria-checked']).toBe(false);
    });

    it('sets root["aria-checked"] to true when value is in checkedValues[name]', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menuList: { checkedValues: { foo: ['1', '2'] } } }),
      });

      expect(result.current.root['aria-checked']).toBe(true);
    });

    it('sets persistOnClick to true (overriding MenuContext.persistOnItemClick)', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menu: { persistOnItemClick: false } }),
      });

      expect(result.current.persistOnClick).toBe(true);
    });
  });

  describe('returned state shape', () => {
    it('exposes name from props', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.name).toBe('foo');
    });

    it('exposes value from props', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.value).toBe('1');
    });

    it.each([
      ['unchecked', { foo: ['2'] }, false],
      ['checked', { foo: ['1'] }, true],
      ['checked among others', { foo: ['1', '2', '3'] }, true],
      ['no entry for name', {}, false],
    ])('reflects checked=%s from MenuListContext.checkedValues', (_, checkedValues, expectedChecked) => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper({ menuList: { checkedValues } }),
      });

      expect(result.current.checked).toBe(expectedChecked);
    });
  });

  describe('checkmark slot — default icon injection', () => {
    it('injects Checkmark16Filled when no checkmark.children provided', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItemCheckbox_unstable({ name: 'foo', value: '1' }, ref), {
        wrapper: makeWrapper(),
      });

      const children = result.current.checkmark?.children as React.ReactElement;
      expect(children).toBeDefined();
      expect(children.type).toBe(Checkmark16Filled);
    });

    it('preserves user-provided checkmark children over default Checkmark16Filled', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();
      const customIcon = React.createElement('span', { 'data-testid': 'custom-checkmark' });

      const { result } = renderHook(
        () => useMenuItemCheckbox_unstable({ name: 'foo', value: '1', checkmark: { children: customIcon } }, ref),
        { wrapper: makeWrapper() },
      );

      expect(result.current.checkmark?.children).toBe(customIcon);
    });
  });
});
