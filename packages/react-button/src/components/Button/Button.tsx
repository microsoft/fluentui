import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps, ButtonStyleSelectors } from './Button.types';
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles';

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button: React.FunctionComponent<ButtonProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  ButtonProps
>((props, ref) => {
  const state = useButton(props, ref);

  const receivedChildren = !!state.children?.children;
  const receivedIcon = !!state.icon?.children;

  const styleSelectors: ButtonStyleSelectors = {
    disabled: state.disabled,
    iconOnly: receivedIcon && !receivedChildren,
    primary: state.primary,
    size: state.size,
    subtle: state.subtle,
    transparent: state.transparent,
  };

  useButtonStyles(state, styleSelectors);

  return renderButton(state);
});

Button.displayName = 'Button';
