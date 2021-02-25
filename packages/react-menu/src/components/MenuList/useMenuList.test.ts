import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusFinders } from '@fluentui/react-focus-management';
import { useMenuList } from './useMenuList';

jest.mock('@fluentui/react-focus-management');

describe('useMenuList', () => {
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
      // Arrange
      const current = menuitems[3];

      // Act
      const { result } = renderHook(() => useMenuList({}, null));
      result.current.setFocusByFirstCharacter?.(createEvent(current.textContent), current);

      // Assert
      expect(menuitems[0].focus).toHaveBeenCalledTimes(1);
    });

    it('should ignore case of textContent', () => {
      // Arrange
      menuitems.forEach((item, i, arr) => {
        menuitems[i].textContent = item.textContent.toUpperCase();
      });
      const current = menuitems[1];

      // Act
      const { result } = renderHook(() => useMenuList({}, null));
      result.current.setFocusByFirstCharacter?.(createEvent('d'), current);

      // Assert
      expect(menuitems[4].focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggleCheckbox', () => {
    it('can be uncontrolled', () => {
      // Arrange
      const name = 'test';
      const value = '1';

      // Act
      const { result } = renderHook(() =>
        useMenuList({ onCheckedValueChange: jest.fn(), checkedValues: undefined }, null),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      act(() => result.current.toggleCheckbox({} as any, name, value, false));

      // Assert
      expect(result.current.checkedValues).toEqual({ [name]: [value] });
    });

    it.each([
      ['check', [], false, ['1']],
      ['check', ['2'], false, ['2', '1']],
      ['uncheck', ['1'], true, []],
      ['uncheck', ['2', '1'], true, ['2']],
    ])('should %s item', (_, checkedItems, checked, expectedResult) => {
      // Arrange
      const name = 'test';
      const value = '1';

      // Act
      const { result } = renderHook(() =>
        useMenuList({ onCheckedValueChange: jest.fn(), checkedValues: { [name]: checkedItems } }, null),
      );
      const state = result.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.toggleCheckbox({} as any, name, value, checked);

      // Assert
      expect(state.onCheckedValueChange).toHaveBeenCalledTimes(1);
      expect(state.onCheckedValueChange).toHaveBeenCalledWith(expect.anything(), name, expectedResult);
    });
  });

  describe('selectRadio', () => {
    it('can be uncontrolled', () => {
      // Arrange
      const name = 'test';
      const value = '1';

      // Act
      const { result } = renderHook(() =>
        useMenuList({ onCheckedValueChange: jest.fn(), checkedValues: undefined }, null),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      act(() => result.current.selectRadio({} as any, name, value, false));

      // Assert
      expect(result.current.checkedValues).toEqual({ [name]: [value] });
    });

    it.each([
      ['', [], ['1']],
      ['and keep current item selected', ['1'], ['1']],
      ['and deselect other item', ['2'], ['1']],
    ])('should select radio item %s', (_, checkedItems, expectedResult) => {
      // Arrange
      const name = 'test';
      const value = '1';
      // Act
      const { result } = renderHook(() =>
        useMenuList({ onCheckedValueChange: jest.fn(), checkedValues: { [name]: checkedItems } }, null),
      );
      const state = result.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.selectRadio({} as any, name, value, true);

      // Assert
      expect(state.onCheckedValueChange).toHaveBeenCalledTimes(1);
      expect(state.onCheckedValueChange).toHaveBeenCalledWith(expect.anything(), name, expectedResult);
    });
  });
});
