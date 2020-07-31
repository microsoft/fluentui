import * as React from 'react';
import { createButton } from './createButton';
import { ButtonProps } from './Button.types';
import { useFocusRects } from '@uifabric/utilities';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import * as classes from './Button.scss';

// Create a hook to resolve classnames.
export const useButtonClasses = makeClasses(classes);

/**
 * Define a styled Button, using the `createButton` factory.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { render, state } = createButton(props, ref);

  // Apply styling.
  useButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state);

  // Render component.
  return render(state);
});

Button.displayName = 'Button';
