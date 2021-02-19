import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButtonClasses } from './useButtonClasses'

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  // TODO: fix children check for "empty" slots once useButton() updated
  const hasContent = !!state.content.children;
  const hasIcon = !!state.icon.children;

  const iconOnly = hasIcon && !hasContent;
  const styleSelectors = {
    primary: props.primary,
    iconOnly: iconOnly,
    textOnly: hasContent && !hasIcon,
    textWithIcon: hasIcon && hasContent,
    size: props.size,
  };

  useButtonClasses(state, styleSelectors);

  return renderButton(state);
});

Button.displayName = 'Button';
