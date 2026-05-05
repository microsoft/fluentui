import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useMenuList_unstable } from './useMenuList';
import { MenuProvider } from '../../contexts/menuContext';
import type { MenuContextValue } from '../../contexts/menuContext';

jest.mock('@fluentui/react-tabster', () => ({
  useArrowNavigationGroup: jest.fn(),
  useFocusFinders: jest.fn(),
  TabsterMoveFocusEventName: 'tabster:movefocus',
}));

jest.mock('@fluentui/react-shared-contexts', () => ({
  ...jest.requireActual('@fluentui/react-shared-contexts'),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useFluent_unstable: jest.fn(() => ({ dir: 'ltr', targetDocument: document })),
}));

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
  triggerId: 'trigger-id',
  openOnContext: false,
  openOnHover: false,
  hasIcons: false,
  hasCheckmarks: false,
  inline: false,
  persistOnItemClick: false,
};

function makeMenuWrapper(overrides: Partial<MenuContextValue> = {}) {
  const value: MenuContextValue = { ...defaultMenuContextValue, ...overrides };
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <MenuProvider value={value}>{children}</MenuProvider>
  );
  return Wrapper;
}

beforeEach(() => {
  (useFocusFinders as jest.Mock).mockReturnValue({ findAllFocusable: jest.fn() });
});

describe('useMenuList_unstable', () => {
  describe('components and slots', () => {
    it('returns components shape with a div root', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null));

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components).toEqual({ root: 'div' });
    });

    it('always returns a root slot', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null));

      expect(result.current.root).toBeDefined();
    });
  });

  describe('root slot', () => {
    it('sets root.role to "menu"', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null));

      expect(result.current.root.role).toBe('menu');
    });

    it('passes aria-labelledby from MenuContext.triggerId', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null), {
        wrapper: makeMenuWrapper({ triggerId: 'my-trigger' }),
      });

      expect(result.current.root['aria-labelledby']).toBe('my-trigger');
    });

    it('spreads className and aria-label from props onto root', () => {
      const { result } = renderHook(
        () => useMenuList_unstable({ className: 'custom-class', 'aria-label': 'my menu' }, null),
        {},
      );

      expect(result.current.root.className).toBe('custom-class');
      expect(result.current.root['aria-label']).toBe('my menu');
    });
  });

  describe('hasIcons / hasCheckmarks', () => {
    it('default to false when no prop and no MenuContext', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null));

      expect(result.current.hasIcons).toBe(false);
      expect(result.current.hasCheckmarks).toBe(false);
    });

    it('inherit hasIcons / hasCheckmarks from MenuContext when not passed as props', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null), {
        wrapper: makeMenuWrapper({ hasIcons: true, hasCheckmarks: true }),
      });

      expect(result.current.hasIcons).toBe(true);
      expect(result.current.hasCheckmarks).toBe(true);
    });
  });

  describe('hasMenuContext flag', () => {
    it('is false when rendered without a MenuContext', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null));

      expect(result.current.hasMenuContext).toBe(false);
    });

    it('is true when rendered inside a MenuContext', () => {
      const { result } = renderHook(() => useMenuList_unstable({}, null), {
        wrapper: makeMenuWrapper(),
      });

      expect(result.current.hasMenuContext).toBe(true);
    });
  });

  describe('checkedValues', () => {
    it('should respect defaultCheckedValues on initial render', () => {
      const defaultCheckedValues = { foo: ['1'] };

      const { result } = renderHook(() => useMenuList_unstable({ defaultCheckedValues }, null));

      expect(result.current.checkedValues).toEqual(defaultCheckedValues);
    });

    it('should use checkedValues if provided with defaultCheckedValues', () => {
      const defaultCheckedValues = { foo: ['1'] };
      const checkedValues = { bar: ['2'] };

      // Passing both is an anti-pattern that useControllableState warns about; silence
      // the expected console.error so the test output stays clean.
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      try {
        const { result } = renderHook(() => useMenuList_unstable({ checkedValues, defaultCheckedValues }, null));

        expect(result.current.checkedValues).toEqual(checkedValues);
      } finally {
        consoleErrorSpy.mockRestore();
      }
    });

    it('should ignore defaultCheckedValues after first render', () => {
      const defaultCheckedValues = { foo: ['1'] };
      const expectedCheckedValues = { foo: ['2'] };

      const { result } = renderHook(() => useMenuList_unstable({ defaultCheckedValues }, null));
      act(() => result.current.selectRadio({} as unknown as React.MouseEvent, 'foo', '2', false));

      expect(result.current.checkedValues).toEqual(expectedCheckedValues);
    });
  });

  describe('setFocusByFirstCharacter', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let menuitems: any[];

    beforeEach(() => {
      menuitems = [
        { textContent: 'a', focus: jest.fn() },
        { textContent: 'b', focus: jest.fn() },
        { textContent: 'c', focus: jest.fn() },
        { textContent: 'a', focus: jest.fn() },
        { textContent: 'd', focus: jest.fn() },
      ];

      (useFocusFinders as jest.Mock).mockReturnValue({
        findAllFocusable: jest.fn().mockReturnValue(menuitems),
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createEvent = (key: string): any => ({ key });

    it('should find the next item in a circular way', () => {
      const current = menuitems[3];

      const { result } = renderHook(() => useMenuList_unstable({}, null));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter(createEvent(current.textContent), current);

      expect(menuitems[0].focus).toHaveBeenCalledTimes(1);
    });

    it('should ignore case of textContent', () => {
      menuitems.forEach((item, i) => {
        menuitems[i].textContent = item.textContent.toUpperCase();
      });
      const current = menuitems[1];

      const { result } = renderHook(() => useMenuList_unstable({}, null));
      (result.current.root.ref as React.RefCallback<HTMLElement>)?.(document.createElement('div'));
      result.current.setFocusByFirstCharacter(createEvent('d'), current);

      expect(menuitems[4].focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggleCheckbox', () => {
    it('can be uncontrolled', () => {
      const name = 'test';
      const value = '1';

      const { result } = renderHook(() =>
        useMenuList_unstable({ onCheckedValueChange: jest.fn(), checkedValues: undefined }, null),
      );
      act(() => result.current.toggleCheckbox({} as unknown as React.MouseEvent, name, value, false));

      expect(result.current.checkedValues).toEqual({ [name]: [value] });
    });

    it.each([
      ['check', [], false, ['1']],
      ['check', ['2'], false, ['2', '1']],
      ['uncheck', ['1'], true, []],
      ['uncheck', ['2', '1'], true, ['2']],
    ])('should %s item', (_, checkedItems, checked, expectedResult) => {
      const name = 'test';
      const value = '1';

      const handleCheckedValueChange = jest.fn();

      const { result } = renderHook(() =>
        useMenuList_unstable(
          { onCheckedValueChange: handleCheckedValueChange, checkedValues: { [name]: checkedItems } },
          null,
        ),
      );
      const state = result.current;
      act(() => state.toggleCheckbox({} as unknown as React.MouseEvent, name, value, checked));

      expect(handleCheckedValueChange).toHaveBeenCalledTimes(1);
      expect(handleCheckedValueChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ name, checkedItems: expectedResult }),
      );
    });
  });

  describe('selectRadio', () => {
    it('can be uncontrolled', () => {
      const name = 'test';
      const value = '1';

      const { result } = renderHook(() =>
        useMenuList_unstable({ onCheckedValueChange: jest.fn(), checkedValues: undefined }, null),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      act(() => result.current.selectRadio({} as any, name, value, false));

      expect(result.current.checkedValues).toEqual({ [name]: [value] });
    });

    it.each([
      ['', [], ['1']],
      ['and keep current item selected', ['1'], ['1']],
      ['and deselect other item', ['2'], ['1']],
    ])('should select radio item %s', (_, checkedItems, expectedResult) => {
      const name = 'test';
      const value = '1';

      const handleCheckedValueChange = jest.fn();

      const { result } = renderHook(() =>
        useMenuList_unstable(
          { onCheckedValueChange: handleCheckedValueChange, checkedValues: { [name]: checkedItems } },
          null,
        ),
      );
      const state = result.current;
      act(() => state.selectRadio({} as unknown as React.MouseEvent, name, value, true));

      expect(handleCheckedValueChange).toHaveBeenCalledTimes(1);
      expect(handleCheckedValueChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ name, checkedItems: expectedResult }),
      );
    });
  });
});
