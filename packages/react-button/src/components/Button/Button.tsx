import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButtonClasses } from './useButtonClasses';

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  const receivedChildren = !!state.children?.children;
  const receivedIcon = !!state.icon?.children;

  const iconOnly = receivedIcon && !receivedChildren;
  const styleSelectors = {
    primary: state.primary,
    iconOnly: iconOnly,
    textOnly: receivedChildren && !receivedIcon,
    textWithIcon: receivedIcon && receivedChildren,
    size: state.size,
  };

  useButtonClasses(state, styleSelectors);

  return renderButton(state);
});

Button.displayName = 'Button';
