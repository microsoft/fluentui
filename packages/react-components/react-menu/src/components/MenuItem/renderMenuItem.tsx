/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuItem_unstable = (state: MenuItemState) => {
  assertSlots<MenuItemSlots>(state);

  return (
    <state.root>
      {state.checkmark && <state.checkmark />}
      {state.icon && <state.icon />}
      {state.content && <state.content />}
      {state.secondaryContent && <state.secondaryContent />}
      {state.submenuIndicator && <state.submenuIndicator />}
    </state.root>
  );
};
