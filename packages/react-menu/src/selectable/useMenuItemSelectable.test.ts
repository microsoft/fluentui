import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { renderHook } from '@testing-library/react-hooks';
import { MenuItemSelectableState } from './types';
import { useMenuItemSelectable } from './useMenuItemSelectable';
import { useMenuListContext, MenuListContextValue } from '../menuListContext';

jest.mock('../menuListContext');

describe('useMenuItemSelectable', () => {
  const createTestState = (options: Partial<MenuItemSelectableState> = {}): MenuItemSelectableState => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    checkmark: {},
    name: 'name',
    value: 'value',
    onCheckedValueChange: jest.fn(),
    ...options,
  });

  let context: MenuListContextValue;
  const mockContext = (options: Partial<MenuListContextValue> = {}) => {
    context = {
      checkedValues: {},
      onCheckedValueChange: jest.fn(),
      toggleCheckbox: jest.fn(),
      selectRadio: jest.fn(),
      ...options,
    };
  };

  const checkedItems = ['1', '2', '3'];

  beforeEach(() => {
    mockContext();
    (useMenuListContext as jest.Mock).mockImplementation(selector => {
      return selector(context);
    });
  });

  it.each([
    [['1'], true],
    [['2'], false],
    [undefined, false],
    [[], false],
    [['3', '1', '2'], true],
  ])('should set checked and aria-checked', (values, expected) => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ value: '1', name: 'test' });
    mockContext({ checkedValues: { test: values! } });

    // Act
    renderHook(() => useMenuItemSelectable(state, jest.fn()));

    // Assert
    expect(state.checked).toBe(expected);
    expect(state['aria-checked']).toBe(expected);
  });

  it('should call onCheckedValueChange if values changed', () => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    mockContext({
      onCheckedValueChange: jest.fn(),
      checkedValues: { [state.name]: [...checkedItems] },
    });

    const newValues = [...checkedItems, 'x'];

    // Act
    renderHook(() => useMenuItemSelectable(state, () => newValues));
    if (state.onClick) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.onClick({ persist: jest.fn() });
    }

    // Assert
    expect(state.onCheckedValueChange).toHaveBeenCalledTimes(1);
    expect(state.onCheckedValueChange).toHaveBeenCalledWith(expect.anything(), state.name, newValues);
  });

  it.each(['onClick', 'onKeyDown'])('should set %s handler', action => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ onKeyDown: undefined, onClick: undefined });

    // Act
    renderHook(() => useMenuItemSelectable(state, jest.fn()));

    // Assert
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const callback = state[action];
    expect(callback).toBeDefined();
    expect(typeof callback).toBe('function');
  });

  it.each([EnterKey, SpacebarKey])('should toggle selection on %s keydown', keyCode => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    (useMenuListContext as jest.Mock).mockReturnValue({
      onCheckedValueChange: jest.fn(),
      checkedValues: { [state.name]: [...checkedItems] },
    });
    const event = {
      defaultPrevented: false,
      keyCode,
      persist: jest.fn(),
    };

    // Act
    renderHook(() => useMenuItemSelectable(state, () => []));
    if (state.onKeyDown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.onKeyDown(event);
    }

    // Assert
    expect(state.onCheckedValueChange).toHaveBeenCalledTimes(1);
    expect(state.onCheckedValueChange).toHaveBeenCalledWith(expect.anything(), state.name, []);
  });
});
