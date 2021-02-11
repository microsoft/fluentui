import * as React from 'react';
import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';
import { useMenuListContext } from '../menuListContext';
import { MenuItemSelectableState } from './types';

/**
 * Hook used to mutate state to handle selection logic for selectable menu items
 *
 * @param state Selectable menu item state
 * @param getNewCheckedItems Callback that returns the new checked values for given menu item
 */
export const useMenuItemSelectable = (state: MenuItemSelectableState, getNewCheckedItems: () => string[]) => {
  const { onClick: onClickCallback, onKeyDown: onKeyDownCallback } = state;
  const { checkedValues: { [state.name]: checkedItems = [] } = {}, onCheckedValueChange } = useMenuListContext();

  state.checkedItems = checkedItems;
  state.onCheckedValueChange = onCheckedValueChange || (() => null);
  state.checked = checkedItems.indexOf(state.value) !== -1;
  state['aria-checked'] = state.checked;

  const onSelectionChange = (e: React.MouseEvent | React.KeyboardEvent) => {
    const newCheckedItems = getNewCheckedItems();

    if (
      newCheckedItems.length === state.checkedItems.length &&
      state.checkedItems.every((el, i) => el === newCheckedItems[i])
    ) {
      return;
    }

    state.onCheckedValueChange(e, state.name, newCheckedItems);
  };

  state.onClick = e => {
    if (onClickCallback) {
      onClickCallback(e);
    }

    onSelectionChange(e);
  };

  state.onKeyDown = e => {
    if (onKeyDownCallback) {
      onKeyDownCallback(e);
    }

    const keyCode = getCode(e);
    if (!e.defaultPrevented && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      onSelectionChange(e);
    }
  };
};
