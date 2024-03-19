/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';

/**
 * Renders a MenuButton component by passing the state defined props to the appropriate slots.
 */
export const renderMenuButton_unstable = (state: MenuButtonState) => {
  assertSlots<MenuButtonSlots>(state);
  const { icon, iconOnly } = state;

  return (
    <state.root>
      {state.icon && <state.icon />}
      {!iconOnly && state.root.children}
      {(!iconOnly || !icon?.children) && state.menuIcon && <state.menuIcon />}
    </state.root>
  );
};
