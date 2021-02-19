import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';
import { useMenuListContext } from '../menuListContext';
import { MenuItemSelectableState, SelectableHandler } from './types';

/**
 * Hook used to mutate state to handle selection logic for selectable menu items
 *
 * @param state Selectable menu item state
 * @param getNewCheckedItems Callback that returns the new checked values for given menu item
 */
export const useMenuItemSelectable = (
  state: MenuItemSelectableState,
  handleSelection: SelectableHandler = () => null,
) => {
  const { onClick: onClickCallback, onKeyDown: onKeyDownCallback } = state;

  const checked = useMenuListContext(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state['aria-checked'] = state.checked;

  state.onClick = e => {
    if (onClickCallback) {
      onClickCallback(e);
    }

    handleSelection(e, state.name, state.value, state.checked);
  };

  state.onKeyDown = e => {
    if (onKeyDownCallback) {
      onKeyDownCallback(e);
    }

    const keyCode = getCode(e);
    if (!e.defaultPrevented && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      handleSelection(e, state.name, state.value, state.checked);
    }
  };
};
