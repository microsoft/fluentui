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
    const handleSelection = jest.fn();
    mockContext({
      checkedValues: { [state.name]: [...checkedItems] },
    });

    const event = {
      defaultPrevented: false,
      keyCode,
      persist: jest.fn(),
    };

    // Act
    renderHook(() => useMenuItemSelectable(state, handleSelection));
    if (state.onKeyDown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.onKeyDown(event);
    }

    // Assert
    expect(handleSelection).toHaveBeenCalledTimes(1);
    expect(handleSelection).toHaveBeenCalledWith(expect.anything(), state.name, state.value, false);
  });

  it('should toggle selection on click', () => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    const handleSelection = jest.fn();
    mockContext({
      checkedValues: { [state.name]: [...checkedItems] },
    });

    const event = {
      defaultPrevented: false,
      persist: jest.fn(),
    };

    // Act
    renderHook(() => useMenuItemSelectable(state, handleSelection));
    if (state.onKeyDown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.onClick(event);
    }

    // Assert
    expect(handleSelection).toHaveBeenCalledTimes(1);
    expect(handleSelection).toHaveBeenCalledWith(expect.anything(), state.name, state.value, false);
  });
});
