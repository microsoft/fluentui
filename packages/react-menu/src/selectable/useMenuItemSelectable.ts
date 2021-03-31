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
  const { onClick: onClickOriginal } = state;
  const checked = useMenuListContext(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state['aria-checked'] = state.checked;

  state.onClick = e => {
    if (state.disabled) {
      return;
    }

    handleSelection(e, state.name, state.value, state.checked);
    onClickOriginal?.(e);
  };
};
