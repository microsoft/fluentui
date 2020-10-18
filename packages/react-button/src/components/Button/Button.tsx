import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useButtonClasses } from './useButtonClasses';
import { renderButton } from './renderButton';

/**
 * Define a styled Button, using the `useButton` hook.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  useButtonClasses(state);
  useInlineTokens(state, '--button');

  return renderButton(state);
});

Button.displayName = 'Button';
