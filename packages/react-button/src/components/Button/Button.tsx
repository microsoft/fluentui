import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { useFocusRects } from '@uifabric/utilities';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useButtonClasses } from './Button.styles';

/**
 * Define a styled Button, using the `useButton` hook.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { render, state } = useButton(props, ref);

  // Apply styling.
  useButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--button');

  // Render component.
  return render(state);
});

Button.displayName = 'Button';
