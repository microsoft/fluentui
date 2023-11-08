/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { MenuItemRadioState } from './MenuItemRadio.types';
import type { MenuItemSlots } from '../MenuItem/MenuItem.types';

/**
 * Redefine the render function to add slots. Reuse the menuitemradio structure but add
 * slots to children.
 */
export const renderMenuItemRadio_unstable = (state: MenuItemRadioState) => {
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
