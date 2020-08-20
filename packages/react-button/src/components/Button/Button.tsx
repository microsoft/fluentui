import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { useFocusRects } from '@uifabric/utilities';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { makeVariants, useInlineTokens } from '@fluentui/react-theme-provider';
import * as classes from './Button.scss';
import { buttonVariants } from './Button.variants';

// Create a hook to resolve classnames.
export const useButtonClasses = makeClasses(classes);

export const useButtonVariants = makeVariants('Button', '--button', buttonVariants);

/**
 * Define a styled Button, using the `useButton` hook.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { render, state } = useButton(props, ref);

  // Apply styling.
  useButtonClasses(state);
  useFocusRects(state.ref);
  useButtonVariants(state);
  useInlineTokens(state, '--button');

  // Render component.
  return render(state);
});

Button.displayName = 'Button';
