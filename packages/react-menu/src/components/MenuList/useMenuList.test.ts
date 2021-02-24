import { renderHook } from '@testing-library/react-hooks';
import { useMenuList } from './useMenuList';

describe('useMenuList', () => {
  describe('toggleCheckbox', () => {
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
