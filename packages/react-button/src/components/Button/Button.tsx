import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles';

/**
 * Buttons give people a way to trigger an action.
 */
export const Button: React.FunctionComponent<ButtonProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  ButtonProps
>((props, ref) => {
  const state = useButton(props, ref);

  useButtonStyles(state);

  return renderButton(state);
});
