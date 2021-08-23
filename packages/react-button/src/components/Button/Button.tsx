import * as React from 'react';
import { useButton } from './useButton';
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles';
import type { ButtonProps } from './Button.types';

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button: React.FunctionComponent<ButtonProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  ButtonProps
>((props, ref) => {
  const state = useButton(props, ref);

  useButtonStyles(state);

  return renderButton(state);
});

Button.displayName = 'Button';
