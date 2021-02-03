import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';
import { MenuItemCheckboxState } from '../MenuItemCheckbox/MenuItemCheckbox.types';

export const useMenuItemSelectable = (
  state: MenuItemCheckboxState,
  getNewCheckedItems: () => string[],
): MenuItemCheckboxState => {
  const { onClick: onClickCallback, onKeyDown: onKeyDownCallback } = state;

  const onSelectionChange = () => {
    const newCheckedItems = getNewCheckedItems();

    if (
      newCheckedItems.length === state.checkedItems.length &&
      state.checkedItems.every((el, i) => el === newCheckedItems[i])
    ) {
      return;
    }

    state.onCheckedValuesChange(state.name, newCheckedItems);
  };

  state.onClick = e => {
    if (onClickCallback) {
      onClickCallback(e);
    }

    onSelectionChange();
  };

  state.onKeyDown = e => {
    if (onKeyDownCallback) {
      onKeyDownCallback(e);
    }

    const keyCode = getCode(e);
    if (!e.defaultPrevented && onClickCallback && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      // Translate the keydown enter/space to a click.
      e.preventDefault();
      e.stopPropagation();

      (e.target as HTMLElement).click();
    }
  };

  return state;
};
