/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';
import type { MenuItemSlots } from '../MenuItem/MenuItem.types';

/** Function that renders the final JSX of the component  */
export const renderMenuItemCheckbox_unstable = (state: MenuItemCheckboxState) => {
  assertSlots<MenuItemSlots>(state);

  return (
    <state.root>
      {state.checkmark && <state.checkmark />}
      {state.icon && <state.icon />}
      {state.content && <state.content />}
      {state.secondaryContent && <state.secondaryContent />}
    </state.root>
  );
};
