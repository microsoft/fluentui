import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactSharedContexts from '@fluentui/react-shared-contexts';
import { useMenuItem_unstable } from './useMenuItem';
import { useMenuItemBase_unstable } from './useMenuItemBase';
import { useMenuItemCheckbox_unstable } from '../MenuItemCheckbox/useMenuItemCheckbox';
import { useMenuItemRadio_unstable } from '../MenuItemRadio/useMenuItemRadio';
import { useMenuItemSwitch_unstable } from '../MenuItemSwitch/useMenuItemSwitch';
import { MenuListProvider } from '../../contexts/menuListContext';
import { MenuProvider } from '../../contexts/menuContext';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import { MenuSplitGroupContextProvider } from '../../contexts/menuSplitGroupContext';
import * as nestingValidation from '../../utils/useValidateNesting';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { ARIAButtonElement } from '@fluentui/react-aria';

jest.mock('@fluentui/react-shared-contexts', () => ({
  ...jest.requireActual('@fluentui/react-shared-contexts'),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useFluent_unstable: jest.fn(() => ({ dir: 'ltr', targetDocument: document })),
}));

jest.mock('../../utils/useValidateNesting', () => ({
  useValidateNesting: jest.fn(() => jest.fn()),
}));

const mockedUseFluent = ReactSharedContexts.useFluent_unstable as jest.Mock;
const mockedUseValidateNesting = nestingValidation.useValidateNesting as jest.Mock;

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
    inMenuSplitGroup?: boolean;
    setMultiline?: jest.Mock;
  } = {},
) {
  const menuListValue: MenuListContextValue = { ...defaultMenuListContextValue, ...options.menuList };
  const menuValue: MenuContextValue = { ...defaultMenuContextValue, ...options.menu };

  const splitGroupContextValue = {
    setMultiline: options.setMultiline ?? (() => null),
  };

  return ({ children }: { children: React.ReactNode }) => (
    <MenuProvider value={menuValue}>
      <MenuListProvider value={menuListValue}>
        {options.inMenuSplitGroup ? (
          <MenuSplitGroupContextProvider value={splitGroupContextValue}>
            <MenuTriggerContextProvider value={options.isSubmenuTrigger ?? false}>
              {children}
            </MenuTriggerContextProvider>
          </MenuSplitGroupContextProvider>
        ) : (
          <MenuTriggerContextProvider value={options.isSubmenuTrigger ?? false}>{children}</MenuTriggerContextProvider>
        )}
      </MenuListProvider>
    </MenuProvider>
  );
}

describe('useMenuItem_unstable', () => {
  beforeEach(() => {
    mockedUseFluent.mockReturnValue({ dir: 'ltr', targetDocument: document });
    mockedUseValidateNesting.mockClear();
  });

  describe('components and slots', () => {
    it.each([
      [
        'MenuItem',
        (props: { subText?: string }) => useMenuItem_unstable(props, React.createRef<ARIAButtonElement<'div'>>()),
      ],
      [
        'MenuItemCheckbox',
        (props: { subText?: string }) =>
          useMenuItemCheckbox_unstable(
            { ...props, name: 'test', value: '1' },
            React.createRef<ARIAButtonElement<'div'>>(),
          ),
      ],
      [
        'MenuItemRadio',
        (props: { subText?: string }) =>
          useMenuItemRadio_unstable(
            { ...props, name: 'test', value: '1' },
            React.createRef<ARIAButtonElement<'div'>>(),
          ),
      ],
      [
        'MenuItemSwitch',
        (props: { subText?: string }) =>
          useMenuItemSwitch_unstable({ ...props, name: 'test', value: '1' }, React.createRef<HTMLDivElement>()),
      ],
    ])('notifies MenuSplitGroup for multiline %s', (_name, useItem) => {
      const setMultiline = jest.fn();
      renderHook(() => useItem({ subText: 'Secondary text' }), {
        wrapper: makeWrapper({ inMenuSplitGroup: true, setMultiline }),
      });

      expect(setMultiline).toHaveBeenCalledWith(true);
    });

    it('does not install MenuItem styled behaviors in the base hook', () => {
      const setMultiline = jest.fn();
      renderHook(
        () => useMenuItemBase_unstable({ subText: 'Secondary text' }, React.createRef<ARIAButtonElement<'div'>>()),
        {
          wrapper: makeWrapper({ isSubmenuTrigger: true, inMenuSplitGroup: true, setMultiline }),
        },
      );

      expect(setMultiline).not.toHaveBeenCalled();
      expect(mockedUseValidateNesting).not.toHaveBeenCalled();
    });

    it('installs the MenuItem nesting validator in the styled hook', () => {
      renderHook(() => useMenuItem_unstable({}, React.createRef<ARIAButtonElement<'div'>>()), {
        wrapper: makeWrapper(),
      });

      expect(mockedUseValidateNesting).toHaveBeenCalledWith('MenuItem');
    });

    it('returns components shape with all MenuItem slots', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), { wrapper: makeWrapper() });

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

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), { wrapper: makeWrapper() });

      expect(result.current.root).toBeDefined();
    });

    it('returns disabled=false by default', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), { wrapper: makeWrapper() });

      expect(result.current.disabled).toBe(false);
    });

    it('reads persistOnClick from MenuContext.persistOnItemClick when prop omitted', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menu: { persistOnItemClick: true } }),
      });

      expect(result.current.persistOnClick).toBe(true);
    });
  });

  describe('root slot', () => {
    it('sets root.role to "menuitem" by default', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), { wrapper: makeWrapper() });

      expect(result.current.root.role).toBe('menuitem');
    });

    it('spreads className and aria-label onto root', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(
        () => useMenuItem_unstable({ className: 'custom-class', 'aria-label': 'item' }, ref),
        { wrapper: makeWrapper() },
      );

      expect(result.current.root.className).toBe('custom-class');
      expect(result.current.root['aria-label']).toBe('item');
    });
  });

  describe('hasSubmenu derivation', () => {
    it('hasSubmenu=true when MenuTriggerContext is true', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ isSubmenuTrigger: true }),
      });

      expect(result.current.hasSubmenu).toBe(true);
    });

    it('hasSubmenu=false when MenuTriggerContext is false (no override)', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ isSubmenuTrigger: false }),
      });

      expect(result.current.hasSubmenu).toBe(false);
    });

    it('explicit hasSubmenu prop wins over MenuTriggerContext', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({ hasSubmenu: true }, ref), {
        wrapper: makeWrapper({ isSubmenuTrigger: false }),
      });

      expect(result.current.hasSubmenu).toBe(true);
    });
  });

  describe('submenuIndicator slot — default chevron icon injection', () => {
    it('submenuIndicator is undefined when hasSubmenu=false (renderByDefault: hasSubmenu)', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ isSubmenuTrigger: false }),
      });

      expect(result.current.submenuIndicator).toBeUndefined();
    });

    it('submenuIndicator is defined when hasSubmenu=true', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({ hasSubmenu: true }, ref), {
        wrapper: makeWrapper(),
      });

      expect(result.current.submenuIndicator).toBeDefined();
    });

    it('injects a chevron icon as children when hasSubmenu=true and dir="ltr"', () => {
      mockedUseFluent.mockReturnValue({ dir: 'ltr', targetDocument: document });
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({ hasSubmenu: true }, ref), {
        wrapper: makeWrapper(),
      });

      const children = result.current.submenuIndicator?.children as React.ReactElement;
      expect(children).toBeDefined();
      expect(typeof children.type).toBe('function');
    });

    it('injects a different chevron icon for dir="rtl" than for dir="ltr"', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      mockedUseFluent.mockReturnValue({ dir: 'ltr', targetDocument: document });
      const { result: ltrResult } = renderHook(() => useMenuItem_unstable({ hasSubmenu: true }, ref), {
        wrapper: makeWrapper(),
      });
      mockedUseFluent.mockReturnValue({ dir: 'rtl', targetDocument: document });
      const { result: rtlResult } = renderHook(() => useMenuItem_unstable({ hasSubmenu: true }, ref), {
        wrapper: makeWrapper(),
      });

      const ltrChildren = ltrResult.current.submenuIndicator?.children as React.ReactElement;
      const rtlChildren = rtlResult.current.submenuIndicator?.children as React.ReactElement;
      expect(ltrChildren.type).not.toBe(rtlChildren.type);
    });

    it('preserves user-provided submenuIndicator children over default chevron', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();
      const customIcon = React.createElement('span', { 'data-testid': 'custom-chevron' });

      const { result } = renderHook(
        () => useMenuItem_unstable({ hasSubmenu: true, submenuIndicator: { children: customIcon } }, ref),
        { wrapper: makeWrapper() },
      );

      expect(result.current.submenuIndicator?.children).toBe(customIcon);
    });
  });

  describe('icon / checkmark renderByDefault from MenuListContext', () => {
    it('icon is undefined when hasIcons=false and no icon prop', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menuList: { hasIcons: false } }),
      });

      expect(result.current.icon).toBeUndefined();
    });

    it('icon is defined when hasIcons=true (renderByDefault)', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menuList: { hasIcons: true } }),
      });

      expect(result.current.icon).toBeDefined();
    });

    it('icon is undefined for a split-group submenu trigger even when hasIcons=true', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menuList: { hasIcons: true }, isSubmenuTrigger: true, inMenuSplitGroup: true }),
      });

      expect(result.current.hasSubmenu).toBe(true);
      expect(result.current.icon).toBeUndefined();
    });

    it('checkmark is undefined when hasCheckmarks=false and no checkmark prop', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menuList: { hasCheckmarks: false } }),
      });

      expect(result.current.checkmark).toBeUndefined();
    });

    it('checkmark is defined when hasCheckmarks=true (renderByDefault)', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menuList: { hasCheckmarks: true } }),
      });

      expect(result.current.checkmark).toBeDefined();
    });

    it('checkmark is undefined for a split-group submenu trigger even when hasCheckmarks=true', () => {
      const ref = React.createRef<ARIAButtonElement<'div'>>();

      const { result } = renderHook(() => useMenuItem_unstable({}, ref), {
        wrapper: makeWrapper({ menuList: { hasCheckmarks: true }, isSubmenuTrigger: true, inMenuSplitGroup: true }),
      });

      expect(result.current.hasSubmenu).toBe(true);
      expect(result.current.checkmark).toBeUndefined();
    });
  });
});
