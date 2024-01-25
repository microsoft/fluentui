/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';
import { InProgress, Success } from '../common';

/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */
export const renderButton_unstable = (state: ButtonState) => {
  assertSlots<ButtonSlots>(state);
  const { iconOnly, iconPosition, actionState } = state;

  return (
    <state.root>
      {actionState === 'inprogress' && (iconOnly || !state.icon) && <InProgress state={state} />}
      {actionState === 'completed' && (iconOnly || !state.icon) && <Success state={state} />}
      {actionState === 'none' && iconOnly && state.icon && <state.icon />}
      {!iconOnly && iconPosition !== 'after' && state.icon && <state.icon />}
      {!iconOnly && state.root.children}
      {!iconOnly && iconPosition === 'after' && state.icon && <state.icon />}
    </state.root>
  );
};
