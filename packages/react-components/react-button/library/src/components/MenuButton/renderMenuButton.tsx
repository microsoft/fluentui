/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { MenuButtonSlots, MenuButtonBaseState } from './MenuButton.types';

/**
 * Renders a MenuButton component by passing the state defined props to the appropriate slots.
 */
export const renderMenuButton_unstable = (state: MenuButtonBaseState): JSXElement => {
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
