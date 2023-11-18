/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */
export const renderButton_unstable = (state: ButtonState) => {
  assertSlots<ButtonSlots>(state);
  const { iconOnly, iconPosition } = state;

  return (
    <state.root>
      {iconPosition !== 'after' && state.icon && <state.icon />}
      {!iconOnly && state.root.children}
      {iconPosition === 'after' && state.icon && <state.icon />}
    </state.root>
  );
};
