import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';
import { MenuItemSelectableState } from './types';

/**
 * Hook used to mutate state to handle selection logic for selectable menu items
 *
 * @param state Selectable menu item state
 * @param getNewCheckedItems Callback that returns the new checked values for given menu item
 */
export const useMenuItemSelectable = (state: MenuItemSelectableState, getNewCheckedItems: () => string[]) => {
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
    if (!e.defaultPrevented && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      // Translate the keydown enter/space to a click.
      e.preventDefault();
      e.stopPropagation();

      (e.target as HTMLElement).click();
    }
  };

  state['aria-checked'] = state.checked;
};
