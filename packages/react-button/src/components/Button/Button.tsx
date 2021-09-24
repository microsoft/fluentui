import * as React from 'react';
import { renderButton } from './renderButton';
import { useButton } from './useButton';
import { useButtonStyles } from './useButtonStyles';
import type { ButtonProps } from './Button.types';

/**
 * Buttons give people a way to trigger an action.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  useButtonStyles(state);

  return renderButton(state);
});

Button.displayName = 'Button';
