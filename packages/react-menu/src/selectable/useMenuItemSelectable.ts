import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';
import { useMenuListContext } from '../menuListContext';
import { MenuItemSelectableState, SelectableHandler } from './types';

/**
 * Hook used to perform the shared operations that any selectable menu item will need
 *
 * @param state - Selectable menu item state
 * @param handleSelection - Each kind of selecatable will have its own way of handling selection
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
