import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { MenuItemSelectableState } from './types';
import { useMenuItemSelectable } from './useMenuItemSelectable';

describe('useMenuItemSelectable', () => {
  const createTestState = (options: Partial<MenuItemSelectableState> = {}): MenuItemSelectableState => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    checkmark: {},
    name: 'name',
    value: 'value',
    checkedItems: ['1', '2', '3'],
    onCheckedValuesChange: jest.fn(),
    checked: false,
    ...options,
  });

  it.each([
    [false, true],
    [true, false],
    [undefined, false],
    [undefined, true],
  ])('should set aria-checked to checked state', (ariaChecked, checked) => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ 'aria-checked': ariaChecked, checked });

    // Act
    useMenuItemSelectable(state, jest.fn());

    // Assert
    expect(state['aria-checked']).toBe(checked);
  });

  it('should not call onCheckedValuesChange if values did not change', () => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();

    // Act
    useMenuItemSelectable(state, () => [...state.checkedItems]);

    // Assert
    expect(state.onCheckedValuesChange).not.toHaveBeenCalled();
  });

  it.each(['onClick', 'onKeyDown'])('should set %s handler', action => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ onKeyDown: undefined, onClick: undefined });

    // Act
    useMenuItemSelectable(state, jest.fn());

    // Assert
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const callback = state[action];
    expect(callback).toBeDefined();
    expect(typeof callback).toBe('function');
  });

  it('should call onCheckedValuesChange if values changed', () => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    const newValues = [...state.checkedItems, 'x'];

    // Act
    useMenuItemSelectable(state, () => newValues);
    if (state.onClick) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.onClick(null);
    }

    // Assert
    expect(state.onCheckedValuesChange).toHaveBeenCalledTimes(1);
    expect(state.onCheckedValuesChange).toHaveBeenCalledWith(state.name, newValues);
  });

  it.each([EnterKey, SpacebarKey])('should transform %s keydown to click', keyCode => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    const event = {
      defaultPrevented: false,
      target: { click: jest.fn() },
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      keyCode,
    };

    // Act
    useMenuItemSelectable(state, jest.fn());
    if (state.onKeyDown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.onKeyDown(event);
    }

    // Assert
    expect(event.target.click).toHaveBeenCalledTimes(1);
  });
});
