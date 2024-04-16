/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { MenuItemSwitchSlots, MenuItemSwitchState } from './MenuItemSwitch.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuItemSwitch_unstable = (state: MenuItemSwitchState) => {
  assertSlots<MenuItemSwitchSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.content && <state.content />}
      {state.secondaryContent && <state.secondaryContent />}
      {state.switchIndicator && <state.switchIndicator />}
    </state.root>
  );
};
