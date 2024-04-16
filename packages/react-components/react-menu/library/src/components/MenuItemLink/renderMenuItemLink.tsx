/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { MenuItemLinkState, MenuItemLinkSlots } from './MenuItemLink.types';

/**
 * Render the final JSX of MenuItemLink
 */
export const renderMenuItemLink_unstable = (state: MenuItemLinkState) => {
  assertSlots<MenuItemLinkSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      {state.checkmark && <state.checkmark />}
      {state.icon && <state.icon />}
      {state.content && <state.content />}
      {state.secondaryContent && <state.secondaryContent />}
    </state.root>
  );
};
